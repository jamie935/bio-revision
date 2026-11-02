export const TOPICS = {
  motion: { name: 'Motion', description: 'Speed, acceleration and the story a graph tells.', icon: 'motion', color: '#487df5', tint: '#eaf0ff' },
  forces: { name: 'Forces & momentum', description: 'Why objects move, stop and change direction.', icon: 'forces', color: '#9360c5', tint: '#f3edfb' },
  energy: { name: 'Energy', description: 'Follow the energy. Make every joule count.', icon: 'energy', color: '#ca850d', tint: '#fff5dc' },
  waves: { name: 'Waves & sound', description: 'Frequency, wavelength and how waves travel.', icon: 'waves', color: '#16988c', tint: '#e2f6ef' },
  light: { name: 'Light & lenses', description: 'Reflection, refraction and forming images.', icon: 'light', color: '#d66e56', tint: '#ffede6' },
  electromagnetic: { name: 'The EM spectrum', description: 'From radio waves to gamma rays.', icon: 'spectrum', color: '#5981bb', tint: '#eaf3fc' },
  radioactivity: { name: 'Radioactivity', description: 'Inside the atom, decay and half-life.', icon: 'atom', color: '#bc63a6', tint: '#fbeaf5' },
  astronomy: { name: 'Space', description: 'Stars, orbits and the expanding Universe.', icon: 'planet', color: '#7365cf', tint: '#efedff' },
  skills: { name: 'Working scientifically', description: 'Units, measurements and better experiments.', icon: 'flask', color: '#50937e', tint: '#e8f5ed' }
};

export function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

export function dayKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', year:'numeric', month:'2-digit', day:'2-digit' }).formatToParts(date);
  const get = type => parts.find(p=>p.type===type).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

export function emptyProgress() { return { version:1, cards:{}, attempts:[], savedCards:[], savedAt:null }; }

export function validateProgress(input) {
  if (!input || input.version!==1 || !Array.isArray(input.attempts) || typeof input.cards!=='object' || !input.cards || Array.isArray(input.cards)) throw new Error('Choose an Avi Physics progress export.');
  const progress=emptyProgress();
  for(const [id, c] of Object.entries(input.cards)) {
    if (!/^[a-zA-Z0-9_().-]{1,100}$/.test(id) || !c || typeof c!=='object') continue;
    progress.cards[id]={ attempts:Math.max(0,Math.min(100000,Number(c.attempts)||0)), earned:Math.max(0,Number(c.earned)||0), possible:Math.max(0,Number(c.possible)||0), streak:Math.max(0,Math.min(20,Number(c.streak)||0)), due:Math.max(0,Number(c.due)||0), lastSeen:Math.max(0,Number(c.lastSeen)||0) };
  }
  progress.attempts=input.attempts.slice(-10000).filter(a=>a && typeof a.id==='string' && typeof a.topic==='string' && Number.isFinite(a.at) && Number.isFinite(a.earned) && Number.isFinite(a.possible) && a.possible>0 && a.earned>=0 && a.earned<=a.possible).map(a=>({id:a.id.slice(0,100),topic:a.topic.slice(0,40),at:a.at,earned:a.earned,possible:a.possible,selfReviewed:!!a.selfReviewed,...(a.response?{response:cleanResponse(a.response)}:{})}));
  progress.savedAt=input.savedAt;
  progress.savedCards=Array.isArray(input.savedCards)?[...new Set(input.savedCards.filter(id=>typeof id==='string'&&/^[a-zA-Z0-9_().-]{1,100}$/.test(id)))]:[];
  return progress;
}

export function recordAttempt(progress, card, result, now=Date.now()) {
  const p=structuredClone(progress);
  const old=p.cards[card.id]||{ attempts:0, earned:0, possible:0, streak:0 };
  const full=result.earned===card.marks;
  const streak=full ? old.streak+1 : 0;
  const days=full ? [1,3,7,14,30][Math.min(streak-1,4)] : 0;
  p.cards[card.id]={ attempts:old.attempts+1, earned:old.earned+result.earned, possible:old.possible+card.marks, streak, lastSeen:now, due:now+(days ? days*86400000 : 5*60000) };
  p.attempts.push({id:card.id,topic:card.topic,at:now,earned:result.earned,possible:card.marks,selfReviewed:!!result.selfReviewed,...(result.response?{response:cleanResponse(result.response)}:{})});
  p.attempts=p.attempts.slice(-10000); p.savedAt=new Date(now).toISOString();
  return p;
}

function cleanResponse(response) { return Object.fromEntries(['value','unit','text','choice','working'].filter(k=>response[k]!==undefined).map(k=>[k,String(response[k]).slice(0,k==='text'||k==='working'?3000:100)])); }

export function reviseAttempt(progress, card, result, at) {
  const p=structuredClone(progress);
  const index=p.attempts.findIndex(a=>a.id===card.id&&a.at===at);
  if(index<0) return p;
  const old=p.attempts[index];
  p.attempts[index]={...old,earned:result.earned,selfReviewed:true};
  const history=p.cards[card.id];
  history.earned=Math.max(0,history.earned+result.earned-old.earned);
  if(history.lastSeen===at) {
    const attempts=p.attempts.filter(a=>a.id===card.id).reverse();let streak=0;
    for(const a of attempts){if(a.earned!==a.possible)break;streak++;}
    history.streak=streak;history.due=at+(streak?[1,3,7,14,30][Math.min(streak-1,4)]*86400000:300000);
  }
  p.savedAt=new Date().toISOString();
  return p;
}

export function weightedPick(items, weight, rng=Math.random) {
  const weights=items.map(i=>Math.max(0,weight(i)));
  const total=weights.reduce((a,b)=>a+b,0);
  if (!items.length || !total) return null;
  let cursor=Math.min(0.999999999,Math.max(0,rng()))*total;
  for(let i=0;i<items.length;i++) { cursor-=weights[i]; if(cursor<0) return items[i]; }
  return items.at(-1);
}

export function pickCard(cards, progress, {topic='all', mode='smart', recent=[], now=Date.now(), rng=Math.random}={}) {
  let pool=cards.filter(c=>topic==='all'||c.topic===topic);
  if(mode==='review') pool=pool.filter(c=>progress.cards[c.id] && progress.cards[c.id].due<=now);
  const fresh=pool.filter(c=>!recent.includes(c.id));
  if(fresh.length) pool=fresh;
  return weightedPick(pool,c=>{
    const history=progress.cards[c.id];
    let factor=1;
    if(mode==='smart') factor=!history ? 1.25 : (history.due<=now ? 1.8 : 0.7)*(1+2*(1-history.earned/Math.max(1,history.possible)));
    return c.sourceMarks*factor;
  },rng);
}

export function instantiate(card, rng=Math.random) {
  if (!card.variants?.length) return {...card};
  const variants=[{prompt:card.prompt,answer:card.answer,modelAnswer:card.modelAnswer},...card.variants];
  const index=Math.min(variants.length-1,Math.floor(rng()*variants.length));
  return {...card,...variants[index],variant:index};
}

export function parseNumber(raw) {
  let s=String(raw).trim().replace(/,/g,'').replace(/[−–]/g,'-').replace(/\s+/g,' ');
  s=s.replace(/[×xX·]\s*10\s*\^?\s*([+-]?\d+)/,'e$1');
  const fraction=s.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*\/\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))(?:\s+([^\d].*))?$/);
  if(fraction && Number(fraction[2])!==0) return {value:Number(fraction[1])/Number(fraction[2]),unit:(fraction[3]||'').trim()};
  const match=s.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:\s*e\s*[+-]?\d+)?)\s*([^\d]*)$/i);
  if(!match) return {value:NaN,unit:''};
  return {value:Number(match[1].replace(/\s/g,'')),unit:match[2].trim()};
}

export function normaliseUnit(raw) {
  const s=String(raw||'').trim().replace(/²/g,'2').replace(/³/g,'3').replace(/⁻/g,'-').replace(/¹/g,'1').replace(/\^/g,'').replace(/\s/g,'').replace(/·/g,'');
  const aliases={ 'ms-1':'m/s','metrespersecond':'m/s','meterspersecond':'m/s', 'm/s/s':'m/s2','ms-2':'m/s2','m/s²':'m/s2', 's':'s','seconds':'s','second':'s','sec':'s', 'minutes':'min','minute':'min','hours':'h','hour':'h', 'metres':'m','metre':'m','meters':'m','meter':'m','joules':'J','joule':'J','j':'J','newtons':'N','newton':'N','n':'N','watts':'W','watt':'W','w':'W','hertz':'Hz','hz':'Hz', 'kilograms':'kg','kilogram':'kg','degrees':'°','degree':'°','deg':'°','degreesC':'°C','%':'%','percent':'%', 'kgms-1':'kgm/s','kgm/s':'kgm/s','Nsm':'Nsm','Ns':'kgm/s','Bq':'Bq','becquerels':'Bq','becquerel':'Bq' };
  const extra={'year':'years','yr':'years','hrs':'h','°C/s':'°C/s','°Cs-1':'°C/s','count/s':'counts/s','count/min':'counts/min','cps':'counts/s','cpm':'counts/min','Wm-2':'W/m2','persecond':'1/s','s-1':'1/s','millionkilometres':'millionkm','millionkilometers':'millionkm'};
  return aliases[s]||extra[s]||s;
}

export function requiresUnit(unit) { return !['','dimensionless','times','×','atoms','nuclei'].includes(unit); }

export function criterionMatches(raw, criterion) {
  const text=String(raw).normalize('NFKC').toLowerCase().replace(/[’']/g,"'").replace(/\b(can't|cannot|doesn't|isn't|don't|won't)\b/g,'not').replace(/[−–]/g,'-');
  return criterion.patterns.some(pattern=>{
    // Criteria must be supported by a coherent statement. A wildcard must not
    // join the subject in one sentence to an unrelated fact in another.
    const statements=text.split(/(?<=[.;!?])\s+|\n+/);
    for(const statement of statements) {
      const regex=new RegExp(pattern,'gi');
      for(const match of statement.matchAll(regex)) {
        const before=statement.slice(Math.max(0,match.index-45),match.index).split(/[,;]|\b(?:but|although|whereas)\b/).at(-1);
        const negation=/\b(not|never|no|without)\b/;
        const negatedBefore=negation.test(before), negatedInside=negation.test(match[0]);
        // Only a pattern that explicitly asks for a negative proposition can
        // credit one. A criterion's label can mention "no external force" while
        // another alternative checks positive momentum conservation.
        const expectsNegative=/(?:^|[^a-z])(not|never|no|without|cannot|can\.t)(?:[^a-z]|$)/i.test(pattern);
        if(!negatedBefore&&!negatedInside) return true;
        if(negatedBefore&&!negatedInside) continue;
        if(expectsNegative&&negatedInside) {
          // An alternative such as (absorbed|not transmitted) must not turn
          // "not absorbed" into credit: the negative must be REQUIRED by the
          // particular matched proposition, not merely present in the regex.
          const stripped=match[0].replace(/\b(not|never|no|without)\b/g,'');
          if(!new RegExp(`^(?:${pattern})$`,'i').test(stripped)) return true;
        }
      }
    }
    return false;
  });
}

export function markAnswer(card, response={}) {
  if(card.kind==='choice') {
    const correct=String(response.choice)===String(card.correctIndex);
    return {earned:correct?card.marks:0,possible:card.marks,checks:[{point:'Choose the correct physical statement.',met:correct}],estimated:false};
  }
  if(card.kind==='number') {
    const parsed=parseNumber(response.value||'');
    const correct=Number.isFinite(parsed.value)&&Math.abs(parsed.value-card.answer)<=Math.max(card.tolerance??0.01,Math.abs(card.answer)*1e-9);
    const unit=normaliseUnit(response.unit||parsed.unit);
    const needsUnit=requiresUnit(card.unit);
    const correctUnit=!needsUnit || normaliseUnit(card.unit)===unit;
    const valueMarks=needsUnit&&card.marks>1?card.marks-1:card.marks;
    return {earned:correct?(correctUnit?card.marks:valueMarks):0,possible:card.marks,estimated:false,checks:[{point:`Numerical answer: ${card.answer}${card.unit?' '+card.unit:''}`,met:correct},...(needsUnit?[{point:`Use the unit ${card.unit}.`,met:correctUnit}]:[])]};
  }
  const checks=(card.rubric||[]).map(c=>({point:c.point,met:criterionMatches(response.text||'',c)}));
  return {earned:Math.min(card.marks,checks.filter(c=>c.met).length),possible:card.marks,checks,estimated:true};
}

export function createPaper(cards, target=100, rng=Math.random) {
  if(![25,50,100].includes(target)) throw new Error('Choose 25, 50 or 100 marks.');
  const pool=[...cards]; const result=[]; let remaining=target;
  const topics=Object.keys(TOPICS);
  const totals=Object.fromEntries(topics.map(t=>[t,cards.filter(c=>c.topic===t).reduce((s,c)=>s+c.sourceMarks,0)]));
  const corpusTotal=Object.values(totals).reduce((a,b)=>a+b,0);
  const allocated=Object.fromEntries(topics.map(t=>[t,0]));
  while(remaining>0) {
    const candidates=pool.filter(c=>c.marks<=remaining);
    if(!candidates.length) throw new Error('Question bank cannot fill this paper without repetition.');
    const card=weightedPick(candidates,c=>{
      const deficit=target*totals[c.topic]/corpusTotal-allocated[c.topic];
      return c.sourceMarks*Math.max(0.05,deficit+1);
    },rng);
    result.push(instantiate(card,rng)); remaining-=card.marks; allocated[card.topic]+=card.marks;
    pool.splice(pool.findIndex(c=>c.id===card.id),1);
  }
  return {id:`paper-${Date.now()}-${Math.floor(rng()*1e9)}`,target,durationSeconds:target*63,cards:result,answers:{},flags:[],index:0,deadline:Date.now()+target*63000,submitted:false};
}

export function secondsRemaining(paper, now=Date.now()) { return Math.max(0,Math.ceil((paper.deadline-now)/1000)); }
export function formatTime(seconds) { const s=Math.max(0,Math.floor(seconds)); return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; }
export function hasAnswer(card, answer={}) { return card.kind==='choice'?answer.choice!==undefined:card.kind==='number'?!!String(answer.value||'').trim():!!String(answer.text||'').trim(); }

export function getStats(progress, cards, now=Date.now()) {
  const today=dayKey(new Date(now));
  const attempts=progress.attempts;
  const todayCount=attempts.filter(a=>dayKey(new Date(a.at))===today).length;
  const possible=attempts.reduce((s,a)=>s+a.possible,0);
  const earned=attempts.reduce((s,a)=>s+a.earned,0);
  const due=cards.filter(c=>progress.cards[c.id]&&progress.cards[c.id].due<=now).length;
  const byTopic=Object.fromEntries(Object.keys(TOPICS).map(topic=>{
    const rows=attempts.filter(a=>a.topic===topic); const total=rows.reduce((s,a)=>s+a.possible,0);
    return [topic,{attempts:rows.length,earned:rows.reduce((s,a)=>s+a.earned,0),possible:total,seen:cards.filter(c=>c.topic===topic&&progress.cards[c.id]).length,total:cards.filter(c=>c.topic===topic).length}];
  }));
  return {todayCount,answered:attempts.length,accuracy:possible?Math.round(100*earned/possible):null,due,seen:Object.keys(progress.cards).length,byTopic};
}
