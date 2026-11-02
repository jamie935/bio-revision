import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {loadCorpus} from '../scripts/validate.mjs';
import {emptyProgress,validateProgress,recordAttempt,reviseAttempt,requiresUnit,parseNumber,normaliseUnit,markAnswer,criterionMatches,pickCard,createPaper,secondsRemaining,formatTime,dayKey,getStats} from '../lib/learning.js';

const corpus=await loadCorpus();
const cards=corpus.cards;
function seeded(seed=42){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}

test('all nine complete Higher papers reconcile to 900 marks and source hashes',()=>{
 assert.equal(corpus.papers.length,9);assert.equal(corpus.totalSourceMarks,900);
 assert.equal(corpus.papers.reduce((s,p)=>s+p.parts,0),cards.length);
 assert.equal(new Set(cards.map(c=>c.id)).size,cards.length);
 for(const source of corpus.sources.sources)assert.match(source.sha256,/^[0-9a-f]{64}$/);
});
test('every original correct response and numerical variant earns full marks; blanks earn zero',()=>{
 for(const c of cards){
   const response=c.kind==='number'?{value:String(c.answer),unit:c.unit}:c.kind==='choice'?{choice:c.correctIndex}:{text:c.modelAnswer};
   assert.equal(markAnswer(c,response).earned,c.marks,`correct response ${c.id}`);
   assert.equal(markAnswer(c,{}).earned,0,`blank response ${c.id}`);
   for(const v of c.variants||[])assert.equal(markAnswer({...c,...v},{value:String(v.answer),unit:c.unit}).earned,c.marks,`variant ${c.id}`);
   if(c.kind==='choice')for(let i=0;i<4;i++)if(i!==c.correctIndex)assert.equal(markAnswer(c,{choice:i}).earned,0,`distractor ${c.id}`);
 }
});
test('numerical answers handle standard form, fractions, signs and attached units',()=>{
 assert.equal(parseNumber('3.5 × 10^-8 m').value,3.5e-8);
 assert.equal(parseNumber('2.4e3').value,2400);
 assert.equal(parseNumber('1/4').value,.25);
 assert.equal(parseNumber('−12.5 m/s').value,-12.5);
 assert.equal(parseNumber('1,200 J').value,1200);
 assert(Number.isNaN(parseNumber('5 or 10').value));
 assert(Number.isNaN(parseNumber('1/0').value));
 assert.equal(normaliseUnit('m s^-2'),'m/s2');
 assert.notEqual(normaliseUnit('mW'),normaliseUnit('MW'));
});
test('tiny values use their explicit tolerance, with no broad absolute floor',()=>{
 const c={kind:'number',answer:3e-27,tolerance:1e-29,unit:'kg',marks:3};
 assert.equal(markAnswer(c,{value:'0',unit:'kg'}).earned,0);
 assert.equal(markAnswer(c,{value:'3e-27',unit:'kg'}).earned,3);
 assert.equal(markAnswer(c,{value:'3e-27',unit:'g'}).earned,2);
});
test('dimensionless factors and particle counts do not lose a mark for omitting a non-unit',()=>{
 for(const unit of ['','dimensionless','times','×','atoms','nuclei']){
  assert(!requiresUnit(unit));assert.equal(markAnswer({kind:'number',answer:4,tolerance:0,unit,marks:2},{value:'4'}).earned,2);
 }
});
test('rubric scoring recognises ideas and does not credit their simple negation',()=>{
 const rubric={point:'Frequency increases.',patterns:['frequency increases','higher frequency']};
 assert(criterionMatches('A higher frequency produces a higher pitch.',rubric));
 assert(!criterionMatches('It does not have a higher frequency.',rubric));
 assert(!criterionMatches('It never has a higher frequency.',rubric));
 assert(!criterionMatches('Frequency is a word I remember.',rubric));
 const mixed={point:'Short waves are absorbed or not transmitted.',patterns:['short.{0,60}(absorbed|not transmitted)']};
 assert(!criterionMatches('Short waves are not absorbed.',mixed));
 assert(criterionMatches('Short waves are not transmitted.',mixed));
});
test('negated source-aligned extended explanations do not earn positive-concept marks',()=>{
 const cases={
  '2018-9b':'Momentum is not mass times velocity. The forces are not equal and opposite. The contact time is not the same. Momentum does not equal force times time. Momentum changes do not cancel. Total momentum is not conserved.',
  '2024-9c':'Momentum is not mass times velocity. The initial momenta are not equal and opposite. Total initial momentum is not zero. Final momentum is not zero. Kinetic energy is not transferred to thermal energy. Total energy is not conserved.',
  '2018-10b':'Fission does not release neutrons. The moderator does not slow neutrons. Slower neutrons do not make fission more likely. Control rods do not absorb neutrons. Lowering the rods does not reduce the rate. Raising the rods does not increase power.'
 };
 for(const [id,text] of Object.entries(cases))assert.equal(markAnswer(cards.find(c=>c.id===id),{text}).earned,0,`negation falsely credited on ${id}`);
});
test('past-paper practice samples by marks, with observed topic proportions',()=>{
 const rng=seeded();const counts={};const n=30000;
 for(let i=0;i<n;i++){const c=pickCard(cards,emptyProgress(),{mode:'exam',rng});counts[c.topic]=(counts[c.topic]||0)+1;}
 for(const [t,marks] of Object.entries(corpus.topicWeights))assert(Math.abs((counts[t]||0)/n-marks/900)<.018,`${t} distribution drift`);
});
test('smart practice favours due mistakes; review excludes unseen and not-yet-due cards',()=>{
 const sample=cards.slice(0,3).map((c,i)=>({...c,id:`test${i}`,sourceMarks:1}));
 const p=emptyProgress();p.cards.test0={attempts:2,earned:0,possible:4,due:0};p.cards.test1={attempts:2,earned:4,possible:4,due:Date.now()+999999};
 assert.equal(pickCard(sample,p,{mode:'review'}).id,'test0');
 const rng=seeded();const counts=[0,0,0];for(let i=0;i<10000;i++)counts[Number(pickCard(sample,p,{rng}).id.at(-1))]++;
 assert(counts[0]>counts[1]*3);
 const c=pickCard(sample,p,{recent:['test0','test1']});assert.equal(c.id,'test2');
});
test('timed papers total the requested marks, never repeat a card and use actual exam pace',()=>{
 const rng=seeded(75);
 for(const target of [25,50,100])for(let j=0;j<50;j++){
   const p=createPaper(cards,target,rng);
   assert.equal(p.cards.reduce((s,c)=>s+c.marks,0),target);
   assert.equal(new Set(p.cards.map(c=>c.id)).size,p.cards.length);
   assert.equal(p.durationSeconds,target*63);
   assert.equal(p.target,target);
 }
 assert.throws(()=>createPaper(cards,80));
});
test('timer survives reloads and expires without negative time',()=>{
 assert.equal(secondsRemaining({deadline:10000},8001),2);
 assert.equal(secondsRemaining({deadline:10000},11000),0);
 assert.equal(formatTime(6300),'105:00');assert.equal(formatTime(1575),'26:15');
});
test('spaced review, progress export/import and date boundaries retain actual performance',()=>{
 const c=cards[0],at=Date.UTC(2026,6,1,23,30);
 let p=recordAttempt(emptyProgress(),c,{earned:0},at);
 assert.equal(p.cards[c.id].due,at+300000);
 p=recordAttempt(p,c,{earned:c.marks},at+1);
 assert.equal(p.cards[c.id].due,at+1+86400000);
 const restored=validateProgress(JSON.parse(JSON.stringify(p)));
 assert.deepEqual(restored.attempts,p.attempts);
 assert.equal(dayKey(new Date(at)),'2026-07-02');
 assert.equal(getStats(p,cards,at).answered,2);
 assert.throws(()=>validateProgress({hello:'not a progress file'}));
});
test('reviewing an earlier score preserves later practice, saved principles and answer history',()=>{
 const [a,b]=cards;let p=recordAttempt(emptyProgress(),a,{earned:0,response:{text:'My first explanation.'}},1000);
 p.savedCards=[a.id];p=recordAttempt(p,b,{earned:b.marks},2000);
 p=reviseAttempt(p,a,{earned:a.marks},1000);
 assert.equal(p.attempts.length,2);assert.equal(p.cards[b.id].attempts,1);assert.deepEqual(p.savedCards,[a.id]);
 assert.equal(p.attempts[0].response.text,'My first explanation.');assert(p.attempts[0].selfReviewed);
 assert.equal(p.cards[a.id].earned,a.marks);
 assert.deepEqual(validateProgress(JSON.parse(JSON.stringify(p))).attempts,p.attempts);
});
test('the generated public website contains no source PDFs, cache or environment files',async()=>{
 const {readdir}=await import('node:fs/promises');
 const files=await readdir(new URL('../dist/',import.meta.url),{recursive:true});
 assert(files.includes('data/corpus.json'));assert(files.includes('app.js'));
 for(const file of files)assert(!/\.pdf$|\.source-cache|\.env|node_modules|^src\//.test(file),`Unexpected public file ${file}`);
 const built=JSON.parse(await readFile(new URL('../dist/data/corpus.json',import.meta.url)));
 assert.equal(built.cards.length,cards.length);assert.equal(built.totalSourceMarks,900);
});
