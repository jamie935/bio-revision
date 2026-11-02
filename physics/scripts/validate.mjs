import {readFile,readdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {TOPICS,markAnswer} from '../lib/learning.js';
export const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
export async function loadCorpus() {
  const expected=['2018','2019','2020','2021','2022','2023','2024','2025','specimen'];
  const files=await readdir(resolve(root,'data/papers'));
  const ids=new Set(); const papers=[];
  for(const year of expected) {
    assert(files.includes(`${year}.json`),`Missing ${year} question analysis`);
    const p=JSON.parse(await readFile(resolve(root,`data/papers/${year}.json`),'utf8'));
    assert.equal(p.paper,year); assert.equal(p.reviewStatus,'question-and-mark-scheme-reviewed');
    assert.equal(p.totalMarks,100); assert.equal(p.rows.reduce((s,r)=>s+r.marks,0),100,`${year}: source marks must total 100`);
    assert(p.rows.length>=30,`${year}: unexpectedly few question parts`);
    for(const row of p.rows) {
      const context=`${year} ${row.question}`;
      assert(!ids.has(row.id),`${context}: duplicate id`); ids.add(row.id);
      assert(TOPICS[row.topic],`${context}: invalid topic`);
      assert(Number.isInteger(row.marks)&&row.marks>=1&&row.marks<=6,`${context}: invalid marks`);
      for(const key of ['answer','learning','skill','question']) assert(typeof row[key]==='string'&&row[key].length>0,`${context}: missing ${key}`);
      for(const key of ['questionPage','markSchemePage']) assert(Number.isInteger(row[key])&&row[key]>0,`${context}: missing ${key}`);
      const c=row.card; assert(c,`${context}: missing original practice card`);
      assert.equal(c.id,row.id,`${context}: card id mismatch`);
      for(const key of ['title','prompt','modelAnswer','explanation','hint','misconception']) assert(typeof c[key]==='string'&&c[key].length>2,`${context}: missing ${key}`);
      assert(Array.isArray(c.steps)&&c.steps.length>=2,`${context}: missing worked steps`);
      assert(Number.isInteger(c.marks)&&c.marks>=1&&c.marks<=6,`${context}: invalid practice marks`);
      if(c.kind==='number') { assert(Number.isFinite(c.answer),`${context}: invalid number`); assert(c.unit!==undefined,`${context}: missing unit`); assert(c.tolerance>=0,`${context}: invalid tolerance`); }
      else if(c.kind==='choice') { assert.equal(c.options?.length,4,`${context}: need 4 options`); assert.equal(new Set(c.options).size,4,`${context}: duplicate options`); assert(Number.isInteger(c.correctIndex)&&c.correctIndex>=0&&c.correctIndex<4,`${context}: bad correct index`); }
      else { assert.equal(c.kind,'text',`${context}: invalid kind`); assert.equal(c.rubric?.length,c.marks,`${context}: rubric must match marks`); for(const point of c.rubric) { assert(point.point&&point.patterns?.length,`${context}: missing rubric`); for(const pattern of point.patterns) new RegExp(pattern,'i'); }
        const result=markAnswer(c,{text:c.modelAnswer});
        assert.equal(result.earned,c.marks,`${context}: model answer only matches ${result.earned}/${c.marks} rubric points: ${result.checks.filter(c=>!c.met).map(c=>c.point).join('; ')}`);
      }
      for(const v of c.variants||[]) assert(v.prompt&&Number.isFinite(v.answer)&&v.modelAnswer,`${context}: invalid variant`);
    }
    papers.push(p);
  }
  const sources=JSON.parse(await readFile(resolve(root,'data/sources.json'),'utf8'));
  assert.equal(sources.sources.length,18);
  for(const p of papers) for(const row of p.rows) for(const [kind,key] of [['questions','questionPage'],['mark-scheme','markSchemePage']]) assert(row[key]<=sources.sources.find(s=>s.paper===p.paper&&s.kind===kind).pages,`${p.paper} ${row.question}: source page out of range`);
  const cards=papers.flatMap(p=>p.rows.map(r=>({...r.card,topic:r.topic,skill:r.skill,sourceMarks:r.marks,sourcePaper:p.paper,sourceQuestion:r.question,questionPage:r.questionPage,markSchemePage:r.markSchemePage,sourceAnswer:r.answer,learning:r.learning})));
  const topicWeights=Object.fromEntries(Object.keys(TOPICS).map(t=>[t,papers.flatMap(p=>p.rows).filter(r=>r.topic===t).reduce((s,r)=>s+r.marks,0)]));
  assert.equal(Object.values(topicWeights).reduce((a,b)=>a+b,0),900);
  return {version:1,builtAt:new Date().toISOString(),totalSourceMarks:900,topicWeights,papers:papers.map(p=>({paper:p.paper,parts:p.rows.length,totalMarks:p.totalMarks,notes:p.notes||[]})),sources,cards};
}
if(process.argv[1]===fileURLToPath(import.meta.url)) {
  const corpus=await loadCorpus(); console.log(`Validated ${corpus.papers.length} papers, ${corpus.cards.length} original cards, 900 source marks, all model answers and source pages.`);
}
