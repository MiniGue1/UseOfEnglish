/* Use of English (Reading & Use of English Parts 1–4)
   Landing with part cards + recommended next step, lessons (DATA.uoeLessons), drills with spaced repetition,
   exam-format tasks with an answer-sheet runner, full timed Part 1–4, stats, cheat sheet, mock.run. */
(function(){
"use strict";
const P = window.Portal, U = P.util;
const {esc, norm, plural, shuffle, DAY, todayStr} = U;
const D = () => window.DATA.uoe || {cats:{}, parts:{}, bank:[], tasks:{p1:[],p2:[],p3:[],p4:[]}, cheat:[], wfTables:[], kwtPatterns:[]};
const LZ = () => window.DATA.uoeLessons || {parts:{}, topics:[], catRules:{}, catTopic:{}};
const NS = "uoe:state", OLD_KEY = "uoe-c1-v1";
const INTERVALS = [0, DAY, 3*DAY, 7*DAY, 21*DAY];
const SEED_WEAK = ["inv","ded","wfc","link"];
const OFFSET = {1:1, 2:9, 3:17, 4:25};
const PART_NAMES = {1:"Multiple-choice cloze", 2:"Open cloze", 3:"Word formation", 4:"Key word transformation"};
const PART_MIN = {1:10, 2:10, 3:10, 4:15};
const PART_FALLBACK = {
  1:"Vybíráš ze 4 slov to, které tvoří správnou kolokaci, frázi nebo vazbu.",
  2:"Doplňuješ jedno slovo – většinou předložku, spojku, zájmeno nebo pomocné sloveso.",
  3:"Ze slova velkými písmeny tvoříš správný slovní druh pomocí předpon a přípon.",
  4:"Přeformuluješ větu 3–6 slovy se zadaným klíčovým slovem; až 2 body za větu."
};
const INSTR = {
  1:"For questions 1–8, read the text below and decide which answer (A, B, C or D) best fits each gap. There is an example at the beginning (0).",
  2:"For questions 9–16, read the text below and think of the word which best fits each gap. Use only one word in each gap. There is an example at the beginning (0).",
  3:"For questions 17–24, read the text below. Use the word given in capitals to form a word that fits in the gap. There is an example at the beginning (0).",
  4:"For questions 25–30, complete the second sentence so that it has a similar meaning to the first sentence, using the word given. Do not change the word given. You must use between three and six words, including the word given."
};

/* ---------- scoped styles ---------- */
(function injectCSS(){
  if(document.getElementById("uoe-css")) return;
  const s = document.createElement("style"); s.id = "uoe-css";
  s.textContent = `
.uoe-instr{font-size:14.5px;color:var(--muted);margin:0 0 14px;font-style:italic}
.uoe-passage{font-family:var(--serif);font-size:18.5px;line-height:2.15;margin:0 0 18px}
.uoe-n{display:inline-block;min-width:1.7em;font-family:var(--sans);font-size:12.5px;font-weight:600;text-align:center;background:var(--ink);color:var(--paper);border-radius:3px;padding:0 4px;margin-right:4px;vertical-align:2px;line-height:1.6}
.uoe-gap{appearance:none;border:0;border-bottom:2px solid var(--ink);border-radius:3px 3px 0 0;background:color-mix(in srgb,var(--hl) 55%,transparent);font:inherit;color:var(--ink);padding:0 5px;cursor:pointer;min-width:6ch;line-height:1.5}
.uoe-gap.is-set .uoe-fill{font-weight:600}
.uoe-gap.uoe-act{background:var(--hl);outline:2px solid var(--ink);outline-offset:1px}
.uoe-passage .gap-in{font-size:inherit;line-height:1.3;background:color-mix(in srgb,var(--hl) 40%,transparent);border-radius:3px 3px 0 0}
.uoe-passage .gap-in:focus,.uoe-kt .gap-in:focus{background:var(--hl);outline:2px solid var(--ink);outline-offset:1px}
.uoe-gapdone{white-space:nowrap}
.uoe-ex{color:var(--muted)}
.uoe-mcrow{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:8px 4px;border-top:1px solid var(--rule);border-radius:4px}
.uoe-mcrow.uoe-act{background:var(--soft)}
.uoe-o{appearance:none;min-height:42px;padding:4px 12px;border:1.5px solid var(--rule);border-radius:6px;background:transparent;color:var(--ink);font-family:var(--serif);font-size:17px;cursor:pointer}
.uoe-o i{font-family:var(--sans);font-style:normal;font-size:12.5px;color:var(--muted);margin-right:6px}
.uoe-o[aria-pressed="true"]{border-color:var(--ink);background:var(--soft);font-weight:600}
.uoe-o.right{border-color:var(--green);background:color-mix(in srgb,var(--green) 12%,transparent)}
.uoe-o.wrong{border-color:var(--red);text-decoration:line-through}
.uoe-kt{border-top:1px solid var(--rule);padding:12px 0 4px}
.uoe-kt .text{font-size:19px;line-height:2}
.uoe-kt .gap-in{min-width:14ch;width:26ch;background:color-mix(in srgb,var(--hl) 40%,transparent)}
.uoe-rev{list-style:none;padding:0;margin:14px 0 18px;display:grid;gap:10px}
.uoe-rev li{border-top:1px solid var(--rule);padding-top:10px;font-size:15.5px}
.uoe-rev .ok{color:var(--green);font-weight:600}.uoe-rev .bad{color:var(--red);font-weight:600}.uoe-rev .half{color:var(--ink);font-weight:600;background:var(--hl);padding:0 5px;border-radius:3px}
.uoe-tbl{width:100%;border-collapse:collapse;font-size:14.5px;margin:0 0 12px}
.uoe-tbl td,.uoe-tbl th{border-top:1px solid var(--rule);padding:6px 6px;vertical-align:top;text-align:left}
.uoe-tbl th{font-size:13px;color:var(--muted);font-weight:600}
.uoe-tbl td:first-child{font-weight:600}
.uoe-tbl td.num,.uoe-tbl th.num{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
.uoe-tbl tr.tot td{font-weight:700;border-top:2px solid var(--ink)}
.uoe-list .card b{font-size:18px}
/* drill */
.uoe-stick{position:sticky;top:0;z-index:6;background:var(--sheet);margin:-6px 0 12px;padding:6px 0 8px}
.uoe-stick .meta>span:last-child{white-space:nowrap}
.uoe-sheetbar.is-done{position:static}
.uoe-stick .bar{margin:0}
.uoe-train .gap-blank{background:var(--hl);border-radius:3px 3px 0 0;width:6ch;height:1.15em;vertical-align:-3px}
.uoe-train .gap-in{background:color-mix(in srgb,var(--hl) 45%,transparent);border-radius:3px 3px 0 0}
.uoe-kbd{font-size:12.5px;color:var(--muted);margin:10px 0 0}
.uoe-kbd kbd{font-family:var(--sans);border:1px solid var(--rule);border-bottom-width:2px;border-radius:3px;padding:0 4px;font-size:11.5px}
.uoe-more{margin-top:10px;padding-top:10px;border-top:1px dashed var(--rule);font-size:14.5px}
.uoe-more p{margin:0 0 7px}
.uoe-simex{font-family:var(--serif);font-size:16.5px}
.uoe-simex b{color:var(--green);font-weight:600}
.uoe-addweak[aria-pressed="true"]{border-color:var(--green);color:var(--green)}
.uoe-morph{display:flex;flex-wrap:wrap;gap:5px;align-items:center;font-size:14px;margin:8px 0 0}
.uoe-morph b{font-family:var(--serif);font-size:16px;font-weight:500;border:1px solid var(--rule);border-radius:4px;padding:0 7px;background:var(--sheet)}
.uoe-morph b.af{background:var(--hl);border-color:var(--ink)}
.uoe-morph .note{margin-left:4px}
.uoe-ktp{list-style:none;padding:0;margin:8px 0 0;display:grid;gap:3px;font-size:14.5px}
.uoe-ktp .y{color:var(--green);font-weight:600}.uoe-ktp .n{color:var(--red);font-weight:600}
.uoe-ktp em{font-family:var(--serif);font-size:16px}
/* landing */
.uoe-hero p{margin:0 0 12px}
.uoe-next{border-left:3px solid var(--ink);background:var(--soft);border-radius:0 6px 6px 0;padding:10px 14px;margin:0 0 14px}
.uoe-next .lbl{font-size:12.5px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin:0 0 2px}
.uoe-next p{margin:0 0 8px}
.uoe-big{width:100%;min-height:52px;font-size:17px}
.uoe-parts{display:grid;grid-template-columns:1fr;gap:12px;margin:16px 0 22px}
@media (min-width:640px){.uoe-parts{grid-template-columns:1fr 1fr}}
.uoe-pcard{cursor:default;display:flex;flex-direction:column;gap:8px}
.uoe-pcard:hover{border-color:var(--rule)}
.uoe-ptop{display:flex;gap:10px;align-items:center}
.uoe-pcard .uoe-pnum{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--ink);color:var(--paper);font-weight:600;font-size:16px;flex:none}
.sub-tabs.uoe-subtabs{row-gap:0;column-gap:16px}
.uoe-pcard .uoe-ptop b{margin:0;font-size:19px;line-height:1.2}
.uoe-pmeta{font-size:13px;color:var(--muted);margin:0;display:flex;gap:6px;flex-wrap:wrap}
.uoe-pcard p{margin:0;font-size:15px}
.uoe-acc{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--muted)}
.uoe-acc .track{flex:1;height:6px;background:var(--soft);border-radius:3px;overflow:hidden}
.uoe-acc .track i{display:block;height:100%;background:var(--ink)}
.uoe-acc .track i.low{background:var(--red)}
.uoe-pbtns{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:2px}
.uoe-pbtns .btn{padding:0 6px;font-size:15px;min-height:42px}
/* lessons */
.uoe-lesson h2{font-size:22px;margin:22px 0 8px}
.uoe-lesson h2:first-child{margin-top:0}
.uoe-steps{padding-left:22px;margin:0 0 8px}.uoe-steps li{margin:0 0 6px}
.uoe-traps{list-style:none;counter-reset:t;padding:0;margin:0;display:grid;gap:10px}
.uoe-traps li{counter-increment:t;border-top:1px solid var(--rule);padding:10px 0 0 36px;position:relative;font-size:15px}
.uoe-traps li::before{content:counter(t);position:absolute;left:0;top:10px;width:26px;height:26px;border-radius:50%;background:var(--soft);display:grid;place-items:center;font-weight:600;font-size:13px}
.uoe-traps .ex{display:block;font-family:var(--serif);font-style:italic;font-size:16px;margin-top:3px}
.uoe-worked{border:1px solid var(--rule);border-radius:6px;padding:12px 14px;margin:0 0 12px;background:var(--paper)}
.uoe-worked .q{font-family:var(--serif);font-size:18px;line-height:1.75;margin:0 0 6px}
.uoe-worked .gapm{background:var(--hl);padding:0 .9em;border-bottom:2px solid var(--ink)}
.uoe-worked summary{cursor:pointer;font-weight:500;padding:6px 0;min-height:32px}
.uoe-worked ol{padding-left:22px;margin:4px 0 6px;font-size:15px}.uoe-worked li{margin:0 0 5px}
.uoe-worked .ansl{font-family:var(--serif);font-size:17px;color:var(--green);font-weight:600}
.uoe-rtbl{width:100%;border-collapse:collapse;font-size:14.5px;margin:0 0 12px}
.uoe-rtbl th{text-align:left;font-size:12.5px;color:var(--muted);padding:4px 6px}
.uoe-rtbl td{border-top:1px solid var(--rule);padding:7px 6px;vertical-align:top}
.uoe-rtbl td:first-child{font-weight:600}
.uoe-rtbl td:last-child{font-family:var(--serif);font-style:italic;font-size:15.5px}
@media (max-width:560px){.uoe-rtbl thead{display:none}.uoe-rtbl tr{display:block;border-top:1px solid var(--rule);padding:6px 0}.uoe-rtbl td{display:block;border:0;padding:1px 0}}
.badge.uoe-done{background:color-mix(in srgb,var(--green) 16%,transparent);color:var(--green)}
.uoe-lcards .card b{font-size:18px}
.uoe-lcards .card .badge{margin-top:6px}
/* exam runner */
.uoe-sheetbar{position:sticky;top:0;z-index:8;background:var(--paper);padding:8px 0 8px;margin:0 0 12px;border-bottom:1px solid var(--rule)}
.uoe-sb-top{display:flex;align-items:center;gap:8px 10px;flex-wrap:wrap}
.uoe-sb-title{font-weight:600;flex:1 1 140px;min-width:0;font-size:15px}
.uoe-sb-count{font-size:14px;color:var(--muted);font-variant-numeric:tabular-nums;white-space:nowrap}
.uoe-sheetbar .bar{margin:8px 0 0}
.uoe-sheetbar .chip{min-height:34px;padding:0 12px;font-size:14px}
.uoe-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(38px,1fr));gap:6px;margin:10px 0 2px}
.uoe-cell{appearance:none;min-height:38px;border:1.5px dashed var(--rule);border-radius:5px;background:var(--sheet);color:var(--muted);font:600 13px var(--sans);cursor:pointer;padding:0}
.uoe-cell.is-filled{border-style:solid;border-color:var(--ink);color:var(--ink);background:var(--soft)}
.uoe-cell.c-ok{border-style:solid;border-color:var(--green);color:var(--green);background:color-mix(in srgb,var(--green) 14%,transparent)}
.uoe-cell.c-half{border-style:solid;border-color:var(--ink);color:var(--ink);background:var(--hl)}
.uoe-cell.c-bad{border-style:solid;border-color:var(--red);color:var(--red);background:color-mix(in srgb,var(--red) 10%,transparent)}
.uoe-legend{display:flex;gap:12px;flex-wrap:wrap;font-size:12.5px;color:var(--muted);margin:6px 0 0}
.uoe-exsec{margin:0 0 16px}
.uoe-submitbox{margin:0 0 16px}
.uoe-unans{margin:0 0 10px;font-size:14.5px;color:var(--muted);min-height:1.2em}
.uoe-unans.warn{color:var(--red)}
.uoe-result:empty{display:none}
.uoe-result{margin:0 0 16px}
.uoe-chooser{position:fixed;left:0;right:0;bottom:0;z-index:30;background:var(--sheet);border-top:1px solid var(--rule);box-shadow:0 -8px 24px rgba(0,0,0,.14);padding:10px 14px calc(12px + env(safe-area-inset-bottom,0px))}
.uoe-chooser .in{max-width:760px;margin:0 auto}
.uoe-chooser .top{display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:14px;color:var(--muted)}
.uoe-chooser .opts{grid-template-columns:1fr 1fr;margin:8px 0 0;gap:6px}
.uoe-chooser .opt{font-size:17px;min-height:46px;padding:8px 10px}
.uoe-chooser .opt[aria-pressed="true"]{border-color:var(--ink);background:var(--soft);font-weight:600}
.uoe-spacer{height:0}
.uoe-exam.has-chooser .uoe-spacer{height:170px}
.uoe-only-wrong .is-ok{display:none!important}
@media (max-width:420px){.uoe-passage{font-size:17.5px}.uoe-o{font-size:16px;padding:4px 9px}.uoe-kt .gap-in{width:100%;min-width:0}}`;
  document.head.appendChild(s);
})();

/* ---------- storage (+ one-time migration from the standalone trainer) ---------- */
function blank(){ return {items:{}, cats:{}, log:[], days:[], tasks:{}, lessons:{}, mine:[], parts:{}, exams:[]}; }
function fill(s){ const b = blank(); Object.keys(b).forEach(k => { if(s[k] == null) s[k] = b[k]; }); return s; }
function load(){
  let s = P.store.get(NS, null);
  if(s && s.items) return fill(s);
  try{
    const old = JSON.parse(localStorage.getItem(OLD_KEY));
    if(old && old.items){ s = fill(Object.assign(blank(), old, {tasks:{}, migrated:Date.now()})); P.store.set(NS, s); return s; }
  }catch(e){}
  return blank();
}
let st = null;
const S = () => st || (st = load());
function save(){ P.store.set(NS, st); }
function touchDay(){ const t = todayStr(); if(!st.days.includes(t)){ st.days.push(t); if(st.days.length > 400) st.days = st.days.slice(-400); } }

/* bank + lesson quiz items share one lookup */
let BY_ID = null, BANK_ID = null, BY_CAT = null;
function bank(){
  const b = D().bank;
  if(!BY_ID){
    BY_ID = {}; BANK_ID = {}; BY_CAT = {};
    b.forEach(it => { BY_ID[it.id] = it; BANK_ID[it.id] = true; (BY_CAT[it.cat] = BY_CAT[it.cat] || []).push(it); });
    lessonQuizzes().forEach(it => { if(!BY_ID[it.id]) BY_ID[it.id] = it; });
  }
  return b;
}
function lessonQuizzes(){ const L = LZ(); return [1,2,3,4].flatMap(p => (L.parts[p] && L.parts[p].quiz) || []).concat(L.topics.flatMap(t => t.quiz || [])); }
const catName = c => D().cats[c] || c;

/* ---------- answer checking ---------- */
const CONTR = [[/\bcan't\b/g,"can not"],[/\bcannot\b/g,"can not"],[/\bwon't\b/g,"will not"],[/\bshan't\b/g,"shall not"],[/n't\b/g," not"],[/'re\b/g," are"],[/'ve\b/g," have"],[/'m\b/g," am"],[/'ll\b/g," will"],[/'d\b/g," 'd"],[/'s\b/g," 's"]];
function toks(s){ let t = norm(s); CONTR.forEach(([r,v]) => { t = t.replace(r, v); }); return t.split(" ").filter(Boolean); }
const tokEq = (a,b) => a === b || (a==="'d" && (b==="had"||b==="would")) || (b==="'d" && (a==="had"||a==="would")) || (a==="'s" && (b==="is"||b==="has")) || (b==="'s" && (a==="is"||a==="has"));
const seqEq = (a,b) => a.length === b.length && a.every((x,i) => tokEq(x,b[i]));
function seqIn(hay, needle){ if(!needle.length) return false; for(let i=0;i+needle.length<=hay.length;i++) if(needle.every((x,j) => tokEq(hay[i+j],x))) return true; return false; }
/* key with an apostrophe (CAN'T) must stay verbatim; other keys may sit inside a contraction (OUGHT in oughtn't) */
function keyOk(given, key){
  const k = key.toLowerCase().replace(/[’‘]/g,"'");
  if(k.includes("'")) return norm(given).split(" ").includes(k);
  return norm(given).split(" ").includes(k) || toks(given).includes(k);
}
/* the two markable halves of a Part 4 answer: data `parts` if present, otherwise split each accepted answer in half */
function ktHalves(it){
  if(it.parts && it.parts.length === 2) return it.parts;
  const A = [], B = [];
  it.ans.forEach(a => { const t = a.trim().split(/\s+/), m = Math.ceil(t.length/2); A.push(t.slice(0,m).join(" ")); B.push(t.slice(m).join(" ")); });
  return [A, B];
}
/* Part 4 scoring like Cambridge: 2 = full, 1 = one of the two parts, 0 if key changed/missing or >6 words */
function scoreKT(it, given){
  const g = toks(given), n = g.length;
  if(!String(given||"").trim()) return {marks:0, note:"bez odpovědi", hit:[false,false]};
  if(!keyOk(given, it.key)) return {marks:0, note:`chybí klíčové slovo ${it.key} v nezměněném tvaru`, hit:[false,false], fatal:true};
  if(n > 6) return {marks:0, note:`${n} ${plural(n)} – limit je 3 až 6 (stažené tvary = 2 slova)`, hit:[false,false], fatal:true};
  if(it.ans.some(a => seqEq(g, toks(a)))) return {marks:2, full:true, note:"", hit:[true,true]};
  const halves = ktHalves(it);
  const hit = halves.map(alts => alts.some(a => seqIn(g, toks(a))));
  const m = hit.some(Boolean) ? 1 : 0;
  return {marks:m, hit, note: m ? `část ${hit[0] ? 1 : 2} správně` : "", approx: !it.parts};
}
function checkText(it, given){
  if(it.type === "kt") return scoreKT(it, given).marks === 2;
  return it.ans.map(norm).includes(norm(given));
}

/* ---------- teaching helpers ---------- */
function ktPartsHTML(it, given){
  const r = scoreKT(it, given), halves = ktHalves(it);
  if(r.fatal || !String(given||"").trim()) return `<p class="note" style="margin:8px 0 0">0 / 2 body · ${esc(r.note)}</p>`;
  return `<ul class="uoe-ktp" aria-label="Hodnocení po částech">${halves.map((alts,i) =>
    `<li><span class="${r.hit[i] ? "y" : "n"}">${r.hit[i] ? "✓" : "✗"} Část ${i+1}</span> · očekává se <em>${esc(alts[0])}</em>${alts.length > 1 ? ` <span class="note">(nebo ${alts.slice(1,3).map(esc).join(", ")})</span>` : ""}</li>`).join("")}
    <li class="note">${r.marks} / 2 body${r.approx ? " · části jsou rozdělené orientačně" : ""}</li></ul>`;
}
const PREF = ["counter","under","over","inter","anti","mis","dis","non","out","pre","un","in","im","il","ir","re","en","em"];
const SUFF = ["isation","ization","ation","ition","ically","ment","ness","ship","hood","ance","ence","ancy","ency","ious","eous","able","ible","less","tion","sion","ally","ity","ful","ous","ive","ise","ize","ify","ism","ist","ant","ent","ary","ory","ial","ical","ic","al","en","er","or","ee","ly","ed","ing","th","ty","al","dom","y"];
function wordClass(a){
  if(/ly$/.test(a)) return "příslovce";
  if(/(tion|sion|ment|ness|ity|ance|ence|ancy|ency|ship|hood|ism|ist|dom|th|ee|ure)s?$/.test(a)) return "podstatné jméno";
  if(/(ful|less|ous|ive|able|ible|al|ic|ical|ent|ant|ary|ory|ed|ing|ish)$/.test(a)) return "přídavné jméno";
  if(/(ise|ize|ify|en)$/.test(a)) return "sloveso";
  return "";
}
/* Part 3: show prefix + base + suffix(es) when the derivation is regular enough */
function wfBreak(key, ans){
  const k = String(key).toLowerCase(), a = String(ans).toLowerCase();
  if(!k || !a || a === k) return null;
  let pre = "", rest = a;
  const head = k.slice(0, Math.min(3, k.length));
  if(!a.startsWith(head)){
    const p = PREF.find(x => a.startsWith(x) && a.slice(x.length).startsWith(head));
    if(!p) return null;
    pre = p; rest = a.slice(p.length);
  }
  let cp = 0; while(cp < k.length && cp < rest.length && k[cp] === rest[cp]) cp++;
  if(cp < Math.min(3, k.length)) return null;
  let tail = rest.slice(cp), plural = false;
  const dropped = k.slice(cp);
  if(/ies$/.test(tail) && tail.length > 3){ tail = tail.slice(0,-3) + "y"; plural = true; }
  else if(/[^su]s$/.test(tail) && !/(ous|ss|is)$/.test(rest)){ tail = tail.slice(0,-1); plural = true; }
  const sufs = []; let t = tail;
  while(t){ const s = SUFF.find(x => t.endsWith(x)); if(!s) break; sufs.unshift(s); t = t.slice(0, -s.length); }
  if(t){ if(sufs.length) sufs[0] = t + sufs[0]; else sufs.push(t); }
  let spell = "";
  if(dropped === "e") spell = "koncové -e vypadá";
  else if(dropped === "y" && /^i/.test(tail)) spell = "y → i";
  else if(dropped) return null;   /* irregular stem change (succeed → success, strong → strength) */
  if(!dropped && /^([bcdfgklmnprtvz])\1/.test(tail) && k.endsWith(tail[0])) spell = "zdvojení souhlásky";
  return {pre, base:k, sufs, plural, spell, cls: (!sufs.length && /^e[nm]$/.test(pre)) ? "sloveso" : wordClass(a)};
}
function wfBreakHTML(key, ans){
  const b = wfBreak(key, ans);
  if(!b) return `<p class="note" style="margin:8px 0 0">${esc(String(key).toLowerCase())} → <b>${esc(ans)}</b>: nepravidelná změna, nauč se ji jako celé slovo.</p>`;
  const chips = [];
  if(b.pre) chips.push(`<b class="af">${esc(b.pre)}-</b>`);
  chips.push(`<b>${esc(b.base)}</b>`);
  b.sufs.forEach(s => chips.push(`<b class="af">-${esc(s)}</b>`));
  if(b.plural) chips.push(`<b class="af">-s</b>`);
  const notes = [b.cls, b.plural ? "množné číslo" : "", b.spell].filter(Boolean);
  return `<div class="uoe-morph" aria-label="Rozbor slova">${chips.join(" + ")} <span>→ <b>${esc(ans)}</b></span>${notes.length ? `<span class="note">${esc(notes.join(" · "))}</span>` : ""}</div>`;
}
function hashStr(s){ let h = 0; for(const c of String(s)) h = (h*31 + c.charCodeAt(0)) >>> 0; return h; }
function filledHTML(it){
  const p = it.text.split("____"), ans = it.type === "mc" ? it.opts[it.correct] : it.ans[0];
  return esc(p[0]) + "<b>" + esc(ans) + "</b>" + esc(p[1] || "");
}
function similarHTML(it){
  bank();
  const pool = (BY_CAT[it.cat] || []).filter(x => x.id !== it.id);
  const same = pool.filter(x => x.type === it.type), use = same.length ? same : pool;
  if(use.length){
    const x = use[hashStr(it.id) % use.length];
    return (x.type === "kt" ? `<span class="note">${esc(x.a)}</span><br>` : "") + filledHTML(x);
  }
  const r = LZ().catRules[it.cat];
  return r && r.ex && r.ex.length ? esc(r.ex[hashStr(it.id) % r.ex.length]) : "";
}
function moreHTML(it){
  const rule = LZ().catRules[it.cat], sim = similarHTML(it), inMine = S().mine.includes(it.id);
  const topic = LZ().catTopic[it.cat];
  return `<div class="uoe-more">
    <p><span class="badge">${esc(catName(it.cat))}</span></p>
    ${rule ? `<p><b>Pravidlo:</b> ${esc(rule.rule)}</p>` : ""}
    ${sim ? `<p><b>Podobný příklad:</b> <span class="uoe-simex">${sim}</span></p>` : ""}
    <div class="row"><button class="btn ghost uoe-addweak" data-id="${esc(it.id)}" aria-pressed="${inMine}">${inMine ? "✓ V mém seznamu slabin" : "+ Přidat do mých slabin"}</button>${topic ? `<button class="link-btn" data-golesson="${esc(topic)}">Lekce k tématu</button>` : ""}</div>
  </div>`;
}
function bindMore(root){
  root.querySelectorAll(".uoe-addweak").forEach(b => b.onclick = () => {
    const id = b.dataset.id, m = S().mine, i = m.indexOf(id);
    if(i >= 0) m.splice(i, 1); else { m.push(id); if(m.length > 300) m.shift(); }
    save(); const on = i < 0;
    b.setAttribute("aria-pressed", String(on)); b.textContent = on ? "✓ V mém seznamu slabin" : "+ Přidat do mých slabin";
    P.toast(on ? "Přidáno do seznamu slabin" : "Odebráno ze seznamu slabin");
  });
  root.querySelectorAll("[data-golesson]").forEach(b => b.onclick = () => { sess = null; nav("l-" + b.dataset.golesson); });
}

/* hash navigation inside the module; re-renders even when the hash would not change */
function nav(sub){ if(location.hash === "#/uoe/" + sub) P.show("uoe"); else P.go("uoe", sub); }

/* ---------- module-level UI state ---------- */
let box = null, view = "home", sess = null, partFilter = 0, catFilter = "", resetArmed = false, curTask = null, taskFilter = 1, autoStart = null, lessonId = null, pendingTask = null;

function weak(cat){
  const c = S().cats[cat] || {seen:0, ok:0};
  const prior = SEED_WEAK.includes(cat) ? 0.4 : 0.65;
  return 1 - (c.ok + prior*4) / (c.seen + 4);
}
function streak(){
  const set = new Set(S().days); let n = 0; const d = new Date();
  if(!set.has(todayStr(d))) d.setDate(d.getDate()-1);
  while(set.has(todayStr(d))){ n++; d.setDate(d.getDate()-1); }
  return n;
}
function partAcc(p){
  const s = S(); bank();
  let d = s.parts[p];
  if(!d || !d.seen){ d = {seen:0, ok:0}; Object.entries(s.items).forEach(([id,v]) => { const it = BY_ID[id]; if(it && it.part === p && BANK_ID[id]){ d.seen += v.seen; d.ok += v.ok; } }); }
  const ts = (D().tasks["p"+p] || []).map(t => s.tasks[t.id]).filter(Boolean);
  const tm = ts.reduce((a,r) => a + r.best, 0), tx = ts.reduce((a,r) => a + r.max, 0);
  const seen = d.seen + tx, ok = d.ok + tm;
  return {pct: seen ? Math.round(100*ok/seen) : null, drill:d, tasks:ts.length, tm, tx};
}

/* ================= TRÉNINK (drills + lesson quizzes share one item renderer) ================= */
function buildSession(n, pool){
  const now = Date.now(), items = S().items;
  const due = pool.filter(it => items[it.id] && items[it.id].due <= now)
    .sort((a,b) => (items[a.id].box - items[b.id].box) || (weak(b.cat) - weak(a.cat)));
  let pick = due.slice(0, n);
  if(pick.length < n){
    const fresh = pool.filter(it => !items[it.id]).map(it => ({it, w: weak(it.cat) + Math.random()*0.35}))
      .sort((a,b) => b.w - a.w).map(x => x.it);
    pick = pick.concat(fresh.slice(0, n - pick.length));
  }
  if(pick.length < n){
    const rest = pool.filter(it => !pick.includes(it)).sort((a,b) => ((items[a.id]||{box:0}).box - (items[b.id]||{box:0}).box) || (Math.random() - .5));
    pick = pick.concat(rest.slice(0, n - pick.length));
  }
  return shuffle(pick);
}
const orderFor = it => it.type === "mc" ? shuffle(it.opts.map((_,i)=>i)) : null;
function drillPool(kind){
  bank();
  if(kind === "mine") return S().mine.map(id => BY_ID[id]).filter(Boolean);
  return D().bank.filter(it => (!partFilter || it.part === partFilter) && (!catFilter || it.cat === catFilter));
}
function newSess(items, extra){
  return Object.assign({mode:"drill", queue: items.map(item => ({item, retry:false, order:orderFor(item)})), i:0, n:items.length, phase:"q", fb:null, results:[], hinted:false, logged:false, part:partFilter}, extra || {});
}
function startSession(kind){
  const pool = drillPool(kind);
  if(!pool.length){ P.toast(kind === "mine" ? "Seznam slabin je zatím prázdný." : "Pro tento výběr nejsou úlohy."); return; }
  sess = newSess(buildSession(10, pool), {kind: kind || "", view:"train", cat:catFilter});
  renderTrain();
}
function record(it, ok, hinted, retry, given){
  S(); bank();
  const sr = !!BANK_ID[it.id];
  if(!retry){
    const c = st.cats[it.cat] || (st.cats[it.cat] = {seen:0, ok:0}); c.seen++; if(ok) c.ok++;
    const p = st.parts[it.part] || (st.parts[it.part] = {seen:0, ok:0}); p.seen++; if(ok) p.ok++;
  }
  if(sr){
    const s = st.items[it.id] || (st.items[it.id] = {box:0, due:0, seen:0, ok:0});
    s.seen++; if(ok) s.ok++;
    if(ok) s.box = (!hinted && !retry) ? Math.min(4, s.box+1) : Math.max(s.box, 1); else s.box = 0;
    s.due = Date.now() + INTERVALS[s.box];
  }
  if(!ok && !retry){ st.log.push({id:it.id, given: given == null ? "" : String(given), t:Date.now()}); if(st.log.length > 40) st.log = st.log.slice(-40); }
  touchDay(); save();
}
function submit(val, idk){
  const q = sess.queue[sess.i], it = q.item;
  let ok, given;
  if(it.type === "mc"){ given = idk ? null : val; ok = !idk && val === it.correct; }
  else { given = String(val || "").trim(); ok = !idk && given !== "" && checkText(it, given); }
  record(it, ok, sess.hinted, q.retry, it.type==="mc" ? (given==null ? "" : it.opts[given]) : given);
  if(!q.retry) sess.results.push({it, ok, given});
  if(!ok && !q.retry) sess.queue.splice(Math.min(sess.i + 4, sess.queue.length), 0, {item:it, retry:true, order:orderFor(it)});
  sess.phase = "fb"; sess.fb = {given, ok, idk};
  renderTrain();
}
function next(){ sess.i++; sess.phase = "q"; sess.fb = null; sess.hinted = false; renderTrain(); }
const correctDisplay = it => it.type === "mc" ? it.opts[it.correct] : it.ans[0];
const $b = s => box.querySelector(s);

function renderTrain(){
  if(!sess) return renderTrainHome();
  if(sess.i >= sess.queue.length) return renderDone();
  const q = sess.queue[sess.i], it = q.item, fb = sess.phase === "fb" ? sess.fb : null;
  const done = sess.results.length, pos = Math.min(done + (q.retry ? 0 : 1), sess.n);
  let inner;
  if(fb){
    if(fb.ok) inner = `<span class="filled ok">${esc(it.type==="mc" ? it.opts[it.correct] : fb.given)}</span>`;
    else { const wrong = it.type==="mc" ? (fb.given==null ? "" : it.opts[fb.given]) : fb.given;
      inner = `<span class="filled bad"><s>${wrong ? esc(wrong) : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"}</s><b class="pen">${esc(correctDisplay(it))}</b></span>`; }
  } else if(it.type === "mc") inner = `<span class="gap-blank" aria-label="mezera"></span>`;
  else { const w = Math.max(8, Math.max(...it.ans.map(a => a.length)) + 2);
    inner = `<input id="uoe-ans" class="gap-in" style="width:min(${w}ch,100%)" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Tvoje odpověď">`; }
  const parts = it.text.split("____");
  const label = sess.mode === "quiz" ? esc(sess.title) : esc(D().parts[it.part] || ("Part " + it.part));
  let html = `<section class="sheet uoe-train">
    <div class="uoe-stick"><div class="meta"><span>${label}</span><span>${q.retry ? '<span class="again">ještě jednou</span>' : pos + " / " + sess.n} · <button class="link-btn" id="uoe-quit">${sess.mode === "quiz" ? "zpět na lekci" : "ukončit"}</button></span></div>
    <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${sess.n}" aria-valuenow="${done}"><i style="width:${Math.round(done / sess.n * 100)}%"></i></div></div>`;
  if(it.type === "kt") html += `<p class="orig">${esc(it.a)}</p><p class="keyrow"><span class="keybox">${esc(it.key)}</span><span class="note">použij toto slovo beze změny, celkem 3 až 6 slov</span></p>`;
  html += `<p class="text">${esc(parts[0])}${inner}${esc(parts[1] || "")}${it.type==="wf" ? `<span class="keybox inline">${esc(it.key)}</span>` : ""}</p>`;
  if(it.type === "mc"){
    html += `<div class="opts">` + q.order.map((k,p) => {
      let cls = "opt"; if(fb){ if(k === it.correct) cls += " right"; else if(k === fb.given) cls += " wrong"; }
      return `<button class="${cls}" data-k="${k}" ${fb ? "disabled" : ""}><i>${"ABCD"[p]}</i>${esc(it.opts[k])}</button>`;
    }).join("") + `</div>`;
  }
  if(!fb){
    html += `<div class="row">` + (it.type === "mc" ? "" : `<button class="btn primary" id="uoe-check">Zkontrolovat</button><button class="btn ghost" id="uoe-hint">Nápověda</button>`) +
      `<button class="btn ghost" id="uoe-idk">Nevím</button></div><p class="hint" id="uoe-hintTxt" aria-live="polite"></p>` +
      `<p class="uoe-kbd">${it.type === "mc" ? "Klávesy <kbd>A</kbd>–<kbd>D</kbd> nebo <kbd>1</kbd>–<kbd>4</kbd> vyberou možnost." : "<kbd>Enter</kbd> zkontroluje odpověď."}</p>`;
  } else {
    const alts = it.ans && it.ans.length > 1 ? `<p class="alts">Uznává se i: ${it.ans.slice(1,3).map(esc).join(" · ")}</p>` : "";
    let verdict = fb.ok ? "Správně." : (q.retry ? "Znovu chyba, vrátí se v dalším kole." : "Chyba, vrátí se za pár úloh.");
    let extra = "";
    if(it.type === "kt" && !fb.idk){ const r = scoreKT(it, fb.given); if(!fb.ok && r.marks === 1) verdict = "Napůl: v testu by to byl 1 bod ze 2. " + (q.retry ? "" : "Úloha se vrátí."); extra += ktPartsHTML(it, fb.given); }
    if(it.type === "wf" && !fb.ok) extra += wfBreakHTML(it.key, it.ans[0]);
    const last = sess.i === sess.queue.length - 1;
    html += `<div class="fb ${fb.ok ? "" : "bad"}" aria-live="polite"><p class="verdict">${esc(verdict)}</p><p class="why">${esc(it.why)}</p>${alts}${extra}${fb.ok ? "" : moreHTML(it)}</div>
      <div class="row"><button class="btn primary" id="uoe-next">${last ? "Dokončit" : "Dál"}</button></div><p class="uoe-kbd"><kbd>Enter</kbd> pokračuje.</p>`;
  }
  box.innerHTML = html + `</section>`;
  $b("#uoe-quit").onclick = () => { const quiz = sess.mode === "quiz"; sess = null; if(quiz) renderLessons(); else renderTrainHome(); };
  if(fb){ bindMore(box); $b("#uoe-next").focus({preventScroll:true}); $b("#uoe-next").onclick = next; return; }
  if(it.type === "mc") box.querySelectorAll(".opt").forEach(b => b.onclick = () => submit(+b.dataset.k, false));
  else {
    const inp = $b("#uoe-ans"); inp.focus({preventScroll:true});
    inp.addEventListener("keydown", e => { if(e.key === "Enter"){ e.preventDefault(); if(inp.value.trim()) submit(inp.value, false); } });
    $b("#uoe-check").onclick = () => { if(inp.value.trim()) submit(inp.value, false); else inp.focus(); };
    $b("#uoe-hint").onclick = () => { sess.hinted = true; const a = it.ans[0], n = a.split(" ").length;
      $b("#uoe-hintTxt").textContent = `Odpověď má ${n} ${plural(n)} a začíná na „${a[0].toLowerCase()}“.`; inp.focus(); };
  }
  $b("#uoe-idk").onclick = () => submit(null, true);
}
function renderTrainHome(){
  const now = Date.now(), items = S().items, B = bank(), C = D().cats;
  const dueN = B.filter(it => items[it.id] && items[it.id].due <= now).length;
  const freshN = B.filter(it => !items[it.id]).length;
  const seenCats = Object.entries(st.cats).filter(([c,v]) => v.seen >= 3 && C[c]).sort((a,b) => (a[1].ok/a[1].seen) - (b[1].ok/b[1].seen));
  const weakLine = seenCats.length ? `Zatím nejslabší: ${esc(C[seenCats[0][0]])} (${seenCats[0][1].ok} z ${seenCats[0][1].seen} napoprvé).` : "Začneme tím, co bývá nejtěžší: inverze, dedukce a záměnná slova.";
  const catsHere = Object.keys(C).filter(c => (BY_CAT[c] || []).some(it => !partFilter || it.part === partFilter));
  if(catFilter && !catsHere.includes(catFilter)) catFilter = "";
  const poolN = drillPool().length, mineN = S().mine.length;
  box.innerHTML = `<section class="sheet home">
    <p>Každé kolo má 10 úloh. Chyby se vrací ještě ve stejném kole a pak znovu dřív než zbytek, správné odpovědi se opakují po 1, 3, 7 a 21 dnech. Častěji ti vychází to, v čem chybuješ.</p>
    <div class="chips" role="group" aria-label="Část zkoušky">
      ${[[0,"Všechno"],[1,"Part 1"],[2,"Part 2"],[3,"Part 3"],[4,"Part 4"]].map(([k,l]) => `<button class="chip" data-p="${k}" aria-pressed="${partFilter === k}">${l}</button>`).join("")}
    </div>
    <label class="note" for="uoe-cat">Téma</label>
    <select class="field" id="uoe-cat" style="margin:4px 0 16px;font-family:var(--sans);font-size:16px">
      <option value="">Všechna témata</option>${catsHere.map(c => `<option value="${esc(c)}" ${c === catFilter ? "selected" : ""}>${esc(C[c])}</option>`).join("")}
    </select>
    <div class="row"><button class="btn primary" id="uoe-start">Začít kolo</button><button class="btn ghost" id="uoe-mine" ${mineN ? "" : "disabled"}>Moje slabiny (${mineN})</button></div>
    <p class="plan">${weakLine}<br>Ve výběru: ${poolN} · k opakování: ${dueN} · nových úloh: ${freshN} · v bance: ${B.length}</p>
  </section>`;
  box.querySelectorAll(".chip").forEach(c => c.onclick = () => { partFilter = +c.dataset.p; renderTrainHome(); });
  $b("#uoe-cat").onchange = e => { catFilter = e.target.value; renderTrainHome(); };
  $b("#uoe-start").onclick = () => startSession("");
  $b("#uoe-mine").onclick = () => startSession("mine");
}
function renderDone(){
  const first = sess.results, okN = first.filter(r => r.ok).length, errs = first.filter(r => !r.ok);
  const quiz = sess.mode === "quiz";
  if(!sess.logged){
    sess.logged = true;
    if(quiz){
      const r = S().lessons[sess.lessonId] || {best:0, n:0};
      st.lessons[sess.lessonId] = {done:true, best: Math.max(r.best || 0, okN), last: okN, max: first.length, n: (r.n || 0) + 1, t: Date.now()};
      touchDay(); save();
      P.logActivity("uoe", sess.part ? "p"+sess.part : "lesson", okN, first.length, {kind:"lesson", lesson:sess.lessonId});
    } else P.logActivity("uoe", sess.part ? "p"+sess.part : "mix", okN, first.length, {kind:"drill"});
  }
  box.innerHTML = `<section class="sheet">
    ${quiz ? `<p class="note" style="margin:0 0 4px">${esc(sess.title)} · lekce dokončena</p>` : ""}
    <p class="score">${okN} z ${first.length} napoprvé</p>
    <p class="note" style="font-size:15px;margin:0">${errs.length ? (quiz ? "Projdi si chyby a pravidla v lekci, pak to zkus znovu." : "Chybné úlohy se vrátí hned v dalším kole.") : (quiz ? "Výborně, lekce je zvládnutá." : "Čisté kolo. Příště dostaneš těžší a nové úlohy.")}</p>
    ${errs.length ? `<ul class="errs">${errs.map(r => `<li>${r.it.type === "kt" ? `<span class="note">${esc(r.it.a)}</span><br>` : ""}${filledHTML(r.it)}<br><span class="note">${esc(r.it.why)}</span></li>`).join("")}</ul>` : `<div style="height:18px"></div>`}
    <div class="row">${quiz
      ? `<button class="btn primary" id="uoe-back">Zpět na lekci</button><button class="btn ghost" id="uoe-again">Zkusit znovu</button><button class="btn ghost" id="uoe-lnext">Další lekce</button>`
      : `<button class="btn primary" id="uoe-again">Další kolo</button><button class="btn ghost" id="uoe-toStats">Pokrok</button>`}</div>
  </section>`;
  if(quiz){
    const id = sess.lessonId;
    $b("#uoe-back").onclick = () => { sess = null; renderLessons(); window.scrollTo(0,0); };
    $b("#uoe-again").onclick = () => startQuiz(id);
    $b("#uoe-lnext").onclick = () => { sess = null; const ids = lessonIds(), i = ids.indexOf(id); nav("l-" + ids[(i+1) % ids.length]); };
  } else {
    $b("#uoe-again").onclick = () => startSession(sess.kind);
    $b("#uoe-toStats").onclick = () => { sess = null; nav("stats"); };
  }
}
document.addEventListener("keydown", e => {
  if(e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
  if(exam && exam.key(e)) return;
  if(!box || !box.isConnected) return;
  if(!sess || sess.view !== view || sess.i >= sess.queue.length) return;
  const tag = e.target && e.target.tagName;
  if(tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
  const it = sess.queue[sess.i].item;
  if(sess.phase === "fb" && e.key === "Enter"){ if(tag === "BUTTON") return; e.preventDefault(); next(); return; }
  if(sess.phase === "q" && it.type === "mc"){
    const k = "abcd".indexOf(e.key.toLowerCase()), n = "1234".indexOf(e.key), idx = k >= 0 ? k : n;
    if(e.key.length === 1 && idx >= 0 && idx < it.opts.length){ e.preventDefault(); submit(sess.queue[sess.i].order[idx], false); }
  }
});

/* ================= LEKCE ================= */
function lessonIds(){ const L = LZ(); return [1,2,3,4].filter(p => L.parts[p]).map(p => "p"+p).concat(L.topics.map(t => t.id)); }
function getLesson(id){ const L = LZ(); const m = /^p([1-4])$/.exec(id); return m ? L.parts[+m[1]] : L.topics.find(t => t.id === id); }
function startQuiz(id){
  const l = getLesson(id); if(!l || !l.quiz) return;
  bank();
  sess = newSess(l.quiz.slice(), {mode:"quiz", lessonId:id, title: l.title, view:"lessons", part: /^p[1-4]$/.test(id) ? +id[1] : 0});
  renderTrain(); window.scrollTo(0, 0);
}
function lessonBadge(id){ const r = S().lessons[id]; return r ? `<span class="badge uoe-done">✓ hotovo · ${r.best}/${r.max}</span>` : `<span class="badge">nová</span>`; }
function renderLessons(){
  if(sess && sess.mode === "quiz" && sess.view === "lessons") return renderTrain();
  const L = LZ();
  if(lessonId){ const l = getLesson(lessonId); if(l) return renderLesson(lessonId, l); lessonId = null; }
  box.innerHTML = `<section class="sheet home"><p>Každá lekce vysvětlí, co úloha testuje, ukáže postup, nejčastější pasti a řešené příklady. Na konci je mini-test se 6 otázkami – po jeho dokončení se lekce označí jako hotová.</p></section>
    <h2>Lekce k jednotlivým částem</h2>
    <div class="cards uoe-lcards">${[1,2,3,4].filter(p => L.parts[p]).map(p => { const l = L.parts[p];
      return `<button class="card" data-l="p${p}"><b>${esc(l.title)}</b><span>${esc(l.marks)} · ${esc(l.time)}</span><br>${lessonBadge("p"+p)}</button>`; }).join("")}</div>
    <h2>Gramatika a slovní zásoba</h2>
    <div class="cards uoe-lcards">${L.topics.map(t => `<button class="card" data-l="${esc(t.id)}"><b>${esc(t.title)}</b><span>tabulka pravidel + 6 cvičení</span><br>${lessonBadge(t.id)}</button>`).join("")}</div>`;
  box.querySelectorAll("[data-l]").forEach(b => b.onclick = () => nav("l-" + b.dataset.l));
}
function workedHTML(w, part){
  const [a, b] = w.text.split("____");
  let h = `<div class="uoe-worked">`;
  if(w.a) h += `<p class="orig" style="font-size:17px;margin:0 0 6px">${esc(w.a)}</p>`;
  if(w.key) h += `<p style="margin:0 0 6px"><span class="keybox">${esc(w.key)}</span></p>`;
  h += `<p class="q">${esc(a)}<span class="gapm" aria-label="mezera">&nbsp;</span>${esc(b || "")}</p>`;
  if(w.opts) h += `<p class="note" style="margin:0 0 4px">${w.opts.map((o,i) => `<b>${"ABCD"[i]}</b> ${esc(o)}`).join(" · ")}</p>`;
  h += `<details><summary>Ukázat postup řešení</summary><ol>${w.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol><p style="margin:4px 0 0">Odpověď: <span class="ansl">${esc(w.answer)}</span></p>${part === 3 && w.key ? wfBreakHTML(w.key, w.answer) : ""}</details></div>`;
  return h;
}
function renderLesson(id, l){
  const isPart = /^p[1-4]$/.test(id), part = isPart ? +id[1] : 0;
  let h = `<div class="row" style="margin:0 0 12px"><button class="btn ghost" id="uoe-lback">← Všechny lekce</button>${lessonBadge(id)}</div><article class="sheet uoe-lesson">`;
  if(isPart){
    h += `<h2>${esc(l.title)}</h2><p class="uoe-pmeta"><span class="badge">${esc(l.marks)}</span><span class="badge">${esc(l.time)}</span></p>
      <h2>Co úloha testuje</h2><p>${esc(l.tests)}</p>
      <h2>Postup krok za krokem</h2><ol class="uoe-steps">${l.strategy.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
      <h2>10 nejčastějších pastí</h2><ol class="uoe-traps">${l.traps.map(t => `<li><b>${esc(t.t)}.</b> ${esc(t.d)}<span class="ex">${esc(t.ex)}</span></li>`).join("")}</ol>
      <h2>Řešené příklady</h2><p class="note" style="margin:0 0 10px">Nejdřív si zkus odpovědět sám, pak rozbal postup.</p>${l.worked.map(w => workedHTML(w, part)).join("")}`;
  } else {
    h += `<h2>${esc(l.title)}</h2><p>${esc(l.intro)}</p>
      <h2>Přehled pravidel</h2><table class="uoe-rtbl"><thead><tr><th>Tvar</th><th>Význam / použití</th><th>Příklad</th></tr></thead><tbody>${l.table.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join("")}</tbody></table>
      ${l.tips && l.tips.length ? `<h2>Na co si dát pozor</h2><ul class="uoe-steps">${l.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}`;
  }
  h += `<h2>${isPart ? "Mini-test" : "Procvičení"}: 6 otázek</h2><p>Otázky mají stejnou podobu jako v tréninku. Chybné se v testu ještě jednou vrátí.</p>
    <div class="row"><button class="btn primary" id="uoe-quiz">Spustit test</button>${isPart ? `<button class="btn ghost" id="uoe-ltrain">Trénink Part ${part}</button>` : ""}</div></article>`;
  box.innerHTML = h;
  $b("#uoe-lback").onclick = () => { lessonId = null; nav("lessons"); };
  $b("#uoe-quiz").onclick = () => startQuiz(id);
  const t = $b("#uoe-ltrain"); if(t) t.onclick = () => { partFilter = part; catFilter = ""; autoStart = "drill"; nav("train"); };
}

/* ================= CELÉ ÚLOHY (exam format) ================= */
function taskHTML(part, t){
  const off = OFFSET[part];
  let h = `<div class="uoe-task" data-part="${part}"><div class="meta"><span><b>Part ${part}</b> · ${PART_NAMES[part]} · ${esc(t.title)}</span><span>${off}–${off + t.items.length - 1}</span></div>
    <p class="uoe-instr">${esc(INSTR[part])}</p>`;
  if(part === 4){
    t.items.forEach((it,i) => {
      const [a,b] = it.text.split("____");
      h += `<div class="uoe-kt" data-g="${i}"><p class="orig"><span class="uoe-n">${off+i}</span> ${esc(it.a)}</p><p class="keyrow"><span class="keybox">${esc(it.key)}</span></p>
        <p class="text">${esc(a)}<input class="gap-in uoe-in" data-g="${i}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Otázka ${off+i}">${esc(b||"")}</p><div class="uoe-fb" data-g="${i}" aria-live="polite"></div></div>`;
    });
    return h + `</div>`;
  }
  const pieces = t.text.split(/\[(\d+)\]/);
  h += `<div class="uoe-passage">`;
  pieces.forEach((p, k) => {
    if(k % 2 === 0){ h += esc(p); return; }
    const g = +p;
    if(g === 0){
      const ex = part === 1 ? t.ex.opts[t.ex.correct] : part === 3 ? t.ex.ans : t.ex;
      h += `<span class="uoe-ex"><span class="uoe-n">0</span><span class="filled">${esc(ex)}</span>${part===3 ? `<span class="keybox inline">${esc(t.ex.key)}</span>` : ""}</span>`;
    } else if(part === 1){
      h += `<button class="uoe-gap" data-g="${g-1}" aria-label="Mezera ${off+g-1}, vybrat odpověď"><span class="uoe-n">${off+g-1}</span><span class="uoe-fill">……</span></button>`;
    } else {
      const it = t.items[g-1];
      const w = part === 3 ? Math.max(10, Math.max(...it.ans.map(a=>a.length)) + 2) : 9;
      h += `<span class="uoe-gapdone"><span class="uoe-n">${off+g-1}</span><input class="gap-in uoe-in" data-g="${g-1}" style="width:min(${w}ch,70vw)" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Mezera ${off+g-1}"></span>${part===3 ? `<span class="keybox inline">${esc(it.key)}</span>` : ""}`;
    }
  });
  h += `</div>`;
  if(part === 1){
    h += `<p class="note">0: ${t.ex.opts.map((o,i) => (i===t.ex.correct ? "<b>" : "") + "ABCD"[i] + " " + esc(o) + (i===t.ex.correct ? "</b>" : "")).join(" · ")}</p>`;
    t.items.forEach((it,i) => {
      h += `<div class="uoe-mcrow" data-g="${i}" role="group" aria-label="Otázka ${off+i}"><span class="uoe-n">${off+i}</span>${it.opts.map((o,k) => `<button class="uoe-o" data-g="${i}" data-k="${k}" aria-pressed="false"><i>${"ABCD"[k]}</i>${esc(o)}</button>`).join("")}</div>`;
    });
  }
  return h + `<ul class="uoe-rev" hidden></ul></div>`;
}
function bindTask(sec, part, t, onChange){
  const sel = Array(t.items.length).fill(null);
  const ctl = {
    part, t, sel, active:-1,
    answers: () => part === 1 ? sel.slice() : [...sec.querySelectorAll(".uoe-in")].map(i => i.value.trim()),
    filled: i => part === 1 ? sel[i] != null : !!(sec.querySelector(`.uoe-in[data-g="${i}"]`) || {value:""}).value.trim(),
    choose(g, k){
      if(sec.dataset.done) return;
      sel[g] = k;
      sec.querySelectorAll(`.uoe-o[data-g="${g}"]`).forEach(x => x.setAttribute("aria-pressed", String(+x.dataset.k === k)));
      const gap = sec.querySelector(`.uoe-gap[data-g="${g}"]`);
      if(gap){ gap.querySelector(".uoe-fill").textContent = t.items[g].opts[k]; gap.classList.add("is-set"); }
      onChange && onChange();
    },
    activate(g){
      ctl.active = g;
      sec.querySelectorAll(".uoe-gap, .uoe-mcrow").forEach(x => x.classList.toggle("uoe-act", +x.dataset.g === g));
    },
    focus(g){
      if(part === 1){ const b = sec.querySelector(`.uoe-gap[data-g="${g}"]`); if(b){ b.scrollIntoView({block:"center"}); b.focus({preventScroll:true}); b.click(); } }
      else { const i = sec.querySelector(`.uoe-in[data-g="${g}"]`); if(i){ i.scrollIntoView({block:"center"}); i.focus({preventScroll:true}); } }
    }
  };
  if(part === 1){
    sec.querySelectorAll(".uoe-o").forEach(b => b.onclick = () => { ctl.activate(+b.dataset.g); ctl.choose(+b.dataset.g, +b.dataset.k); });
  } else {
    sec.querySelectorAll(".uoe-in").forEach(i => i.addEventListener("input", () => onChange && onChange()));
  }
  return ctl;
}
function gradeTask(part, t, answers){
  const res = t.items.map((it,i) => {
    const g = answers[i];
    if(part === 1) return {marks: g === it.correct ? 1 : 0, given: g == null ? "" : it.opts[g], correct: it.opts[it.correct]};
    if(part === 4){ const r = scoreKT(it, g); return {marks:r.marks, given:g, correct:it.ans[0], note:r.note}; }
    return {marks: g && it.ans.map(norm).includes(norm(g)) ? 1 : 0, given:g, correct:it.ans[0], alts:it.ans.slice(1)};
  });
  return {res, score: res.reduce((a,r) => a + r.marks, 0), max: part === 4 ? t.items.length*2 : t.items.length};
}
function paintReview(sec, part, t, g){
  sec.dataset.done = "1";
  const off = OFFSET[part], mx = part === 4 ? 2 : 1;
  sec.querySelectorAll(".uoe-act").forEach(x => x.classList.remove("uoe-act"));
  if(part === 1){
    sec.querySelectorAll(".uoe-o").forEach(b => { const it = t.items[+b.dataset.g], k = +b.dataset.k; b.disabled = true;
      if(k === it.correct) b.classList.add("right"); else if(b.getAttribute("aria-pressed") === "true") b.classList.add("wrong"); });
    sec.querySelectorAll(".uoe-mcrow").forEach(r => { if(g.res[+r.dataset.g].marks) r.classList.add("is-ok"); });
  }
  if(part !== 4) sec.querySelectorAll(".uoe-in, .uoe-gap").forEach(el => {
    const i = +el.dataset.g, r = g.res[i];
    const span = document.createElement("span");
    span.className = "filled " + (r.marks ? "ok" : "bad");
    span.innerHTML = r.marks ? esc(r.given) : `<s>${r.given ? esc(r.given) : "&nbsp;&nbsp;&nbsp;"}</s><b class="pen">${esc(r.correct)}</b>`;
    if(el.classList.contains("uoe-gap")){ const w = document.createElement("span"); w.className = "uoe-gapdone"; w.innerHTML = `<span class="uoe-n">${off+i}</span>`; w.appendChild(span); el.replaceWith(w); }
    else el.replaceWith(span);
  });
  const rows = t.items.map((it,i) => { const r = g.res[i];
    const verdict = `<span class="${r.marks === mx ? "ok" : r.marks ? "half" : "bad"}">${r.marks}/${mx}</span>`;
    const alts = (part === 4 ? it.ans.slice(1,4) : (r.alts || [])).filter(Boolean);
    const morph = part === 3 && r.marks < mx ? wfBreakHTML(it.key, it.ans[0]) : "";
    return `<li class="${r.marks === mx ? "is-ok" : ""}"><span class="uoe-n">${off+i}</span> ${verdict} · tvoje: <i>${r.given ? esc(r.given) : "—"}</i> · správně: <b>${esc(r.correct)}</b>${alts.length ? ` <span class="note">(uznává se i: ${alts.map(esc).join(" · ")})</span>` : ""}${r.note ? `<br><span class="note">${esc(r.note)}</span>` : ""}<br>${esc(it.why)}${morph}</li>`; }).join("");
  if(part === 4){
    sec.querySelectorAll(".uoe-in").forEach(i => { i.disabled = true; });
    t.items.forEach((it,i) => { const r = g.res[i], fb = sec.querySelector(`.uoe-fb[data-g="${i}"]`);
      fb.className = "fb" + (r.marks === 2 ? "" : " bad");
      fb.innerHTML = `<p class="verdict">${r.marks} / 2 ${r.note ? "· " + esc(r.note) : ""}</p><p class="why">Správně: <b>${esc(it.ans[0])}</b>. ${esc(it.why)}</p>${r.marks < 2 ? ktPartsHTML(it, r.given) : ""}`;
      if(r.marks === 2) sec.querySelector(`.uoe-kt[data-g="${i}"]`).classList.add("is-ok"); });
  } else { const ul = sec.querySelector(".uoe-rev"); ul.hidden = false; ul.innerHTML = rows; }
  const sheet = sec.closest(".uoe-exsec"); if(sheet && g.score === g.max) sheet.classList.add("is-ok");
}
function allTasks(){ const T = D().tasks; return [1,2,3,4].flatMap(p => (T["p"+p] || []).map(t => ({p, t}))); }
function pickTask(p, avoidId){
  const list = D().tasks["p"+p] || [], done = S().tasks;
  if(!list.length) return null;
  const c = list.filter(t => t.id !== avoidId);
  const use = c.length ? c : list;
  return use.map(t => ({t, w: (done[t.id] ? done[t.id].n * 10 + 100*done[t.id].best/done[t.id].max : 0) + Math.random()*5})).sort((a,b) => a.w - b.w)[0].t;
}

/* ---------- answer-sheet exam runner (single task, full Part 1–4, mock) ---------- */
let exam = null;   /* {key(e)} – keyboard hook of the running exam */
function runExam(host, picks, opt){
  opt = opt || {};
  const total = picks.reduce((a,x) => a + x.t.items.length, 0);
  const maxMarks = picks.reduce((a,x) => a + x.t.items.length * (x.p === 4 ? 2 : 1), 0);
  const timerHTML = opt.minutes ? (opt.timerForced ? `<span class="timer" data-t>${String(opt.minutes).padStart(2,"0")}:00</span>` : `<button class="chip" data-starttimer aria-pressed="false">⏱ Na čas (${opt.minutes} min)</button>`) : "";
  const cells = picks.map((x,si) => x.t.items.map((_,i) => `<button class="uoe-cell" data-s="${si}" data-i="${i}" aria-label="Otázka ${OFFSET[x.p]+i}">${OFFSET[x.p]+i}</button>`).join("")).join("");
  host.innerHTML = `<div class="uoe-exam${picks.some(x => x.p === 1) ? " has-p1" : ""}">
    <div class="uoe-sheetbar">
      <div class="uoe-sb-top"><span class="uoe-sb-title">${esc(opt.title || "Use of English")}</span><span class="uoe-sb-count">0 / ${total}</span>${timerHTML}<button class="chip" data-grid aria-expanded="${opt.gridOpen ? "true" : "false"}">Arch</button></div>
      <div class="bar"><i style="width:0%"></i></div>
      <div class="uoe-grid-wrap" ${opt.gridOpen ? "" : "hidden"}><div class="uoe-grid" role="group" aria-label="Odpovědní arch">${cells}</div>
      <div class="uoe-legend"><span>▢ nevyplněno</span><span>■ vyplněno</span></div></div>
    </div>
    <div class="uoe-result" aria-live="polite"></div>
    ${picks.map(x => `<section class="sheet uoe-exsec">${taskHTML(x.p, x.t)}</section>`).join("")}
    <div class="sheet uoe-submitbox"><p class="uoe-unans" aria-live="polite"></p><div class="row"><button class="btn primary" data-submit>Odevzdat</button>${opt.backLabel ? `<button class="btn ghost" data-back>${esc(opt.backLabel)}</button>` : ""}</div></div>
    <div class="uoe-chooser" hidden role="dialog" aria-label="Výběr odpovědi"><div class="in"><div class="top"><span data-cq></span><button class="link-btn" data-cclose>Zavřít (Esc)</button></div><div class="opts" data-copts></div></div></div>
    <div class="uoe-spacer"></div></div>`;
  const root = host.querySelector(".uoe-exam"), bar = root.querySelector(".uoe-sheetbar");
  const mk = document.querySelector(".mk-frame-head"); if(mk && mk.offsetParent !== null) bar.style.top = mk.offsetHeight + "px";
  const secs = [...root.querySelectorAll(".uoe-task")];
  let ctls = [], over = false, armed = false, timer = null, chooserFor = null;
  const update = () => {
    let n = 0;
    ctls.forEach((c,si) => c.t.items.forEach((_,i) => { const f = c.filled(i); if(f) n++;
      const cell = root.querySelector(`.uoe-cell[data-s="${si}"][data-i="${i}"]`); if(cell && !over) cell.classList.toggle("is-filled", f); }));
    root.querySelector(".uoe-sb-count").textContent = `${n} / ${total}`;
    root.querySelector(".uoe-sheetbar .bar > i").style.width = Math.round(100*n/total) + "%";
    if(armed){ armed = false; root.querySelector("[data-submit]").textContent = "Odevzdat"; root.querySelector(".uoe-unans").textContent = ""; root.querySelector(".uoe-unans").classList.remove("warn"); }
  };
  ctls = secs.map((s,i) => bindTask(s, picks[i].p, picks[i].t, () => { update(); if(chooserFor && chooserFor.ctl === ctls[i]) paintChooser(); }));
  /* bottom-sheet chooser for Part 1 gaps */
  const ch = root.querySelector(".uoe-chooser");
  function paintChooser(){
    if(!chooserFor) return;
    const {ctl, g} = chooserFor, it = ctl.t.items[g];
    ch.querySelector("[data-cq]").textContent = `Otázka ${OFFSET[ctl.part] + g} · vyber A–D`;
    ch.querySelector("[data-copts]").innerHTML = it.opts.map((o,k) => `<button class="opt" data-k="${k}" aria-pressed="${ctl.sel[g] === k}"><i>${"ABCD"[k]}</i>${esc(o)}</button>`).join("");
    ch.querySelectorAll("[data-k]").forEach(b => b.onclick = () => pickChooser(+b.dataset.k));
  }
  function openChooser(ctl, g){
    if(over) return;
    ctls.forEach(c => { if(c !== ctl) c.activate(-1); });
    chooserFor = {ctl, g}; ctl.activate(g); ch.hidden = false; root.classList.add("has-chooser"); paintChooser();
  }
  function closeChooser(){ if(chooserFor) chooserFor.ctl.activate(-1); chooserFor = null; ch.hidden = true; root.classList.remove("has-chooser"); }
  function pickChooser(k){
    const {ctl, g} = chooserFor; ctl.choose(g, k);
    if(g + 1 < ctl.t.items.length){ const nb = secs[ctls.indexOf(ctl)].querySelector(`.uoe-gap[data-g="${g+1}"]`); openChooser(ctl, g+1); if(nb) nb.scrollIntoView({block:"nearest"}); }
    else closeChooser();
  }
  ch.querySelector("[data-cclose]").onclick = closeChooser;
  secs.forEach((s,si) => s.querySelectorAll(".uoe-gap").forEach(b => b.onclick = () => openChooser(ctls[si], +b.dataset.g)));
  /* Enter in a text gap jumps to the next gap */
  const ins = [...root.querySelectorAll(".uoe-in")];
  ins.forEach((inp, k) => inp.addEventListener("keydown", e => { if(e.key === "Enter"){ e.preventDefault(); const nx = ins[k+1]; if(nx){ nx.focus({preventScroll:true}); nx.scrollIntoView({block:"nearest"}); } else root.querySelector("[data-submit]").focus(); } }));
  /* answer sheet grid */
  root.querySelector("[data-grid]").onclick = e => { const w = root.querySelector(".uoe-grid-wrap"), open = w.hidden; w.hidden = !open; e.currentTarget.setAttribute("aria-expanded", String(open)); };
  root.querySelectorAll(".uoe-cell").forEach(c => c.onclick = () => {
    const si = +c.dataset.s, i = +c.dataset.i, ctl = ctls[si];
    if(over){ const tgt = ctl.part === 4 ? secs[si].querySelector(`.uoe-kt[data-g="${i}"]`) : secs[si].querySelector(`.uoe-rev li:nth-child(${i+1})`); if(tgt) tgt.scrollIntoView({block:"center"}); return; }
    ctl.focus(i);
  });
  /* timer */
  const startTimer = el => { timer = U.countdown(el, opt.minutes*60, () => finish(true)); };
  if(opt.minutes && opt.timerForced) startTimer(root.querySelector("[data-t]"));
  const tb = root.querySelector("[data-starttimer]");
  if(tb) tb.onclick = () => { const sp = document.createElement("span"); sp.className = "timer"; tb.replaceWith(sp); startTimer(sp); };
  const back = root.querySelector("[data-back]"); if(back) back.onclick = () => { if(timer) timer.stop(); closeChooser(); exam = null; opt.onBack && opt.onBack(); };
  /* keyboard: A–D / 1–4 answer the active Part 1 gap, Esc closes the chooser */
  exam = {key(e){
    if(!root.isConnected){ exam = null; return false; }
    if(over) return false;
    if(e.key === "Escape" && chooserFor){ closeChooser(); return true; }
    const tag = e.target && e.target.tagName; if(tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return false;
    if(!chooserFor || e.key.length !== 1) return false;
    const k = "abcd".indexOf(e.key.toLowerCase()), n = "1234".indexOf(e.key), idx = k >= 0 ? k : n;
    if(idx < 0) return false;
    e.preventDefault(); pickChooser(idx); return true;
  }};
  function unanswered(){ const out = []; ctls.forEach(c => c.t.items.forEach((_,i) => { if(!c.filled(i)) out.push(OFFSET[c.part] + i); })); return out; }
  function finish(timeout){
    if(over) return;
    const un = unanswered();
    if(!timeout && un.length && !armed){
      armed = true; const u = root.querySelector(".uoe-unans"); u.classList.add("warn");
      u.textContent = `Nevyplněno ${un.length}: ${un.join(", ")}. Prázdná odpověď = 0 bodů. Klikni znovu, pokud chceš i tak odevzdat.`;
      root.querySelector("[data-submit]").textContent = "Přesto odevzdat"; return;
    }
    over = true; if(timer) timer.stop(); closeChooser(); exam = null;
    const results = picks.map((x,i) => { const g = gradeTask(x.p, x.t, ctls[i].answers()); paintReview(secs[i], x.p, x.t, g); return {p:x.p, t:x.t, g}; });
    results.forEach((r,si) => r.g.res.forEach((x,i) => { const c = root.querySelector(`.uoe-cell[data-s="${si}"][data-i="${i}"]`); if(!c) return;
      const mx = r.p === 4 ? 2 : 1; c.classList.remove("is-filled"); c.classList.add(x.marks === mx ? "c-ok" : x.marks ? "c-half" : "c-bad"); if(x.marks === mx) c.classList.add("is-ok"); }));
    root.querySelector(".uoe-legend").innerHTML = `<span style="color:var(--green)">■ správně</span><span>■ 1 ze 2 bodů</span><span style="color:var(--red)">■ chyba</span><span>klikni na číslo = oprava</span>`;
    root.querySelector(".uoe-grid-wrap").hidden = false; root.querySelector("[data-grid]").setAttribute("aria-expanded","true");
    root.querySelector(".uoe-submitbox").hidden = true; bar.classList.add("is-done");
    const correct = results.reduce((a,r) => a + r.g.score, 0);
    const res = root.querySelector(".uoe-result");
    res.innerHTML = summaryHTML(results, correct, maxMarks, timeout, opt);
    res.querySelector("[data-onlywrong]").onclick = e => { const on = !root.classList.contains("uoe-only-wrong"); root.classList.toggle("uoe-only-wrong", on); e.currentTarget.setAttribute("aria-pressed", String(on)); e.currentTarget.textContent = on ? "Zobrazit vše" : "Jen chybné odpovědi"; };
    (opt.actions || []).forEach((a,i) => { const b = res.querySelector(`[data-act="${i}"]`); if(b) b.onclick = () => a.fn(b); });
    opt.onSubmit && opt.onSubmit(results, correct, maxMarks);
    bar.scrollIntoView({block:"start"});
  }
  root.querySelector("[data-submit]").onclick = () => finish(false);
  return {finish};
}
function summaryHTML(results, correct, max, timeout, opt){
  const pct = max ? Math.round(100*correct/max) : 0;
  const full = results.length === 4;
  const rows = results.map(r => `<tr><td>Part ${r.p}</td><td>${esc(PART_NAMES[r.p])}<br><span class="note">${esc(r.t.title)}</span></td><td class="num">${r.t.items.length} × ${r.p === 4 ? 2 : 1}</td><td class="num">${r.g.score} / ${r.g.max}</td></tr>`).join("");
  const scale = full ? U.cambridgeScale(pct) : null;
  return `<section class="sheet">
    <p class="note" style="margin:0">${timeout ? "Čas vypršel – odevzdáno automaticky." : "Odevzdáno."}</p>
    <p class="score">${correct} / ${max} <span class="note" style="font-family:var(--sans);font-size:16px">(${pct} %)</span></p>
    <table class="uoe-tbl" aria-label="Body po částech"><thead><tr><th>Část</th><th>Úloha</th><th class="num">Otázky</th><th class="num">Body</th></tr></thead><tbody>${rows}
      ${results.length > 1 ? `<tr class="tot"><td>Celkem</td><td>Use of English</td><td class="num">${results.reduce((a,r) => a + r.t.items.length, 0)}</td><td class="num">${correct} / ${max}</td></tr>` : ""}</tbody></table>
    ${full ? `<p class="note">Ve zkoušce se těchto 36 bodů sčítá s Reading Part 5–8 (celkem 78 bodů za Reading &amp; Use of English). Orientačně odpovídá ${pct} % zhruba <b>${scale}</b> na Cambridge English Scale (${esc(U.gradeFor(scale))}). Hranice C1 bývá kolem 60 %.</p>` : `<p class="note">Part 1–3: 1 bod za mezeru · Part 4: 2 body za větu (1 bod za každou správnou část).</p>`}
    <div class="row"><button class="btn ghost" data-onlywrong aria-pressed="false">Jen chybné odpovědi</button>${(opt.actions || []).map((a,i) => `<button class="btn ${a.primary ? "primary" : "ghost"}" data-act="${i}">${esc(a.label)}</button>`).join("")}</div>
  </section>`;
}
function saveTaskResult(p, t, g, kind){
  const r = S().tasks[t.id] || {best:0, n:0};
  st.tasks[t.id] = {best: Math.max(r.best, g.score), max: g.max, last: g.score, n: r.n + 1, t: Date.now()};
  touchDay(); save(); P.logActivity("uoe", "p"+p, g.score, g.max, {kind, task:t.id});
}

function renderTasks(){
  if(curTask) return renderTaskRun();
  const T = D().tasks["p"+taskFilter] || [], done = S().tasks;
  box.innerHTML = `<section class="sheet home"><p>Celé úlohy přesně ve formátu zkoušky: text s očíslovanými mezerami, odpovědní arch a hodnocení jako na Cambridge (Part 1–3: 1 bod za mezeru, Part 4: až 2 body za větu). Na celou část 1–4 počítej zhruba 45 minut.</p>
    <div class="row" style="margin:0 0 16px"><button class="btn primary" id="uoe-tfull">Celá část 1–4 na čas</button></div>
    <div class="chips" role="group" aria-label="Část">${[1,2,3,4].map(p => `<button class="chip" data-p="${p}" aria-pressed="${taskFilter===p}">Part ${p}</button>`).join("")}</div>
    <div class="cards uoe-list">${T.map((t,i) => { const r = done[t.id];
      return `<button class="card" data-i="${i}"><b>${esc(t.title)}</b><span>${PART_NAMES[taskFilter]} · ${r ? `nejlépe ${r.best}/${r.max} (${r.n}×)` : "nezkoušeno"}</span><i class="pct"><i style="width:${r ? Math.round(100*r.best/r.max) : 0}%"></i></i></button>`; }).join("")}</div></section>`;
  $b("#uoe-tfull").onclick = () => nav("exam");
  box.querySelectorAll(".chip").forEach(c => c.onclick = () => { taskFilter = +c.dataset.p; renderTasks(); });
  box.querySelectorAll(".card").forEach(c => c.onclick = () => { curTask = {p:taskFilter, t:T[+c.dataset.i]}; renderTasks(); window.scrollTo(0,0); });
}
function renderTaskRun(){
  const {p, t} = curTask;
  runExam(box, [{p, t}], {
    title: `Part ${p} · ${t.title}`, minutes: PART_MIN[p], gridOpen: false, backLabel: "Zpět na seznam",
    onBack: () => { curTask = null; renderTasks(); },
    onSubmit: (results) => saveTaskResult(p, t, results[0].g, "task"),
    actions: [
      {label:"Další úloha", primary:true, fn: () => { curTask = {p, t: pickTask(p, t.id) || t}; renderTasks(); window.scrollTo(0,0); }},
      {label:"Zpět na seznam", fn: () => { curTask = null; renderTasks(); window.scrollTo(0,0); }}
    ]
  });
}

/* ================= CELÁ ČÁST 1–4 NA ČAS ================= */
let examTimed = true;
function renderExamStart(){
  box.innerHTML = `<section class="sheet home">
    <h2 style="margin-top:0">Use of English · Part 1–4</h2>
    <p>Čtyři celé úlohy za sebou, jako v první polovině papíru Reading &amp; Use of English: 30 otázek, 36 bodů. Ve zkoušce máš na celý papír 90 minut, na Part 1–4 si počítej zhruba 45.</p>
    <table class="uoe-tbl"><tbody>${[1,2,3,4].map(p => `<tr><td>Part ${p}</td><td>${PART_NAMES[p]}</td><td class="num">${p === 4 ? "6 × 2" : "8 × 1"} b.</td><td class="num">~${PART_MIN[p]} min</td></tr>`).join("")}</tbody></table>
    <div class="chips" role="group" aria-label="Časový limit"><button class="chip" data-tm="1" aria-pressed="${examTimed}">Na čas (45 min)</button><button class="chip" data-tm="0" aria-pressed="${!examTimed}">Bez limitu</button></div>
    <button class="btn primary uoe-big" id="uoe-exgo">Začít</button>
  </section>`;
  box.querySelectorAll("[data-tm]").forEach(c => c.onclick = () => { examTimed = c.dataset.tm === "1"; renderExamStart(); });
  $b("#uoe-exgo").onclick = startFullExam;
}
function startFullExam(){
  const picks = [1,2,3,4].map(p => ({p, t: pickTask(p)})).filter(x => x.t);
  runExam(box, picks, {
    title: "Use of English · Part 1–4", minutes: examTimed ? 45 : 0, timerForced: examTimed, gridOpen: false, backLabel: "Zrušit test",
    onBack: () => nav("home"),
    onSubmit: (results, correct, max) => {
      results.forEach(r => saveTaskResult(r.p, r.t, r.g, "exam"));
      st.exams.push({t:Date.now(), score:correct, max, parts: results.map(r => ({p:r.p, task:r.t.id, s:r.g.score, m:r.g.max})), timed: examTimed});
      if(st.exams.length > 50) st.exams = st.exams.slice(-50);
      save();
    },
    actions: [
      {label:"Nový test", primary:true, fn: () => { startFullExam(); window.scrollTo(0,0); }},
      {label:"Přehled", fn: () => nav("home")}
    ]
  });
  window.scrollTo(0,0);
}

/* ================= PŘEHLED (landing) ================= */
function recommend(){
  const s = S(), C = D().cats, L = LZ(), now = Date.now(); bank();
  const weakCats = Object.entries(s.cats).filter(([c,v]) => C[c] && v.seen >= 4 && v.ok/v.seen < 0.7).sort((a,b) => (a[1].ok/a[1].seen) - (b[1].ok/b[1].seen));
  if(weakCats.length){
    const [c, v] = weakCats[0], pct = Math.round(100*v.ok/v.seen), topic = L.catTopic[c];
    if(topic && !s.lessons[topic]){ const l = getLesson(topic);
      return {text:`Nejslabší téma: <b>${esc(C[c])}</b> (${pct} % napoprvé). Projdi lekci „${esc(l.title)}“ a udělej 6 cvičení na konci.`, label:"Otevřít lekci", go: () => nav("l-" + topic)}; }
    return {text:`Nejslabší téma: <b>${esc(C[c])}</b> (${pct} % napoprvé, ${v.seen} odpovědí). Udělej cílené kolo jen na toto téma.`, label:"Procvičit téma", go: () => { partFilter = 0; catFilter = c; autoStart = "drill"; nav("train"); }};
  }
  const dueN = D().bank.filter(it => s.items[it.id] && s.items[it.id].due <= now).length;
  if(dueN >= 5) return {text:`Máš <b>${dueN}</b> úloh k opakování – opakování ve správnou chvíli je nejrychlejší cesta, jak si vazby zapamatovat.`, label:"Opakovat", go: () => { partFilter = 0; catFilter = ""; autoStart = "drill"; nav("train"); }};
  const firstLesson = [1,2,3,4].find(p => L.parts[p] && !s.lessons["p"+p]);
  const seenAny = Object.keys(s.items).length > 0;
  if(!seenAny) return {text:"Začni krátkým kolem 10 úloh ze všech částí. Podle chyb ti pak doporučím, na co se zaměřit.", label:"Začít kolo", go: () => { partFilter = 0; catFilter = ""; autoStart = "drill"; nav("train"); }};
  if(firstLesson) return {text:`Projdi lekci k Part ${firstLesson}: postup, 10 nejčastějších pastí a řešené příklady.`, label:"Otevřít lekci", go: () => nav("l-p" + firstLesson)};
  const lastExam = s.exams[s.exams.length - 1];
  if(!lastExam || now - lastExam.t > 7*DAY) return {text:"Tento týden jsi ještě nepsal celou část 1–4 na čas. Vyzkoušej si tempo jako u zkoušky.", label:"Celá část 1–4", go: () => nav("exam")};
  return {text:"Pokračuj v tréninku – vybírám úlohy podle tvých slabin a opakování.", label:"Trénink", go: () => { partFilter = 0; catFilter = ""; autoStart = "drill"; nav("train"); }};
}
function renderHome(){
  const L = LZ(), rec = recommend(), s = S();
  const last = s.exams[s.exams.length - 1];
  box.innerHTML = `<section class="sheet uoe-hero">
    <p>Reading &amp; Use of English, <b>Part 1–4</b>: 30 otázek, 36 bodů, zhruba 45 minut. Ke každé části najdeš lekci, trénink jednotlivých vět a celé úlohy ve formátu zkoušky.</p>
    <div class="uoe-next"><p class="lbl">Doporučený další krok</p><p>${rec.text}</p><button class="btn primary" id="uoe-rec">${esc(rec.label)}</button></div>
    <button class="btn primary uoe-big" id="uoe-full">Celá část 1–4 na čas · 45 min</button>
    ${last ? `<p class="note" style="margin:8px 0 0">Poslední test: ${last.score}/${last.max} (${Math.round(100*last.score/last.max)} %), ${new Date(last.t).toLocaleDateString("cs-CZ")}</p>` : ""}
  </section>
  <div class="uoe-parts">${[1,2,3,4].map(p => {
    const l = L.parts[p], a = partAcc(p), done = s.lessons["p"+p];
    const accTxt = a.pct == null ? "zatím nic" : `${a.pct} % správně` + (a.tasks ? ` · úlohy ${a.tm}/${a.tx}` : "");
    return `<article class="card uoe-pcard" aria-labelledby="uoe-pt${p}">
      <div class="uoe-ptop"><span class="uoe-pnum" aria-hidden="true">${p}</span><b id="uoe-pt${p}">${PART_NAMES[p]}</b></div>
      <p class="uoe-pmeta"><span class="badge">${p === 4 ? "6 otázek · 12 bodů" : "8 otázek · 8 bodů"}</span><span class="badge">~${PART_MIN[p]} min</span>${done ? `<span class="badge uoe-done">lekce ✓</span>` : ""}</p>
      <p>${esc(l ? l.short : PART_FALLBACK[p])}</p>
      <div class="uoe-acc"><div class="track" aria-hidden="true"><i class="${a.pct != null && a.pct < 60 ? "low" : ""}" style="width:${a.pct || 0}%"></i></div><span>${accTxt}</span></div>
      <div class="uoe-pbtns"><button class="btn ghost" data-act="lesson" data-p="${p}">Lekce</button><button class="btn ghost" data-act="train" data-p="${p}">Trénink</button><button class="btn primary" data-act="task" data-p="${p}">Celá úloha</button></div>
    </article>`; }).join("")}</div>`;
  $b("#uoe-rec").onclick = rec.go;
  $b("#uoe-full").onclick = () => nav("exam");
  box.querySelectorAll(".uoe-pbtns .btn").forEach(b => b.onclick = () => {
    const p = +b.dataset.p, act = b.dataset.act;
    if(act === "lesson") nav("l-p" + p);
    else if(act === "train"){ partFilter = p; catFilter = ""; autoStart = "drill"; nav("train"); }
    else { const t = pickTask(p); if(!t) return P.toast("Pro tuto část zatím nejsou úlohy."); taskFilter = p; pendingTask = {p, t}; nav("tasks"); }
  });
}

/* ================= POKROK ================= */
function renderStats(){
  const s = S(), B = bank(), C = D().cats, L = LZ();
  const items = Object.entries(s.items).filter(([id]) => BANK_ID[id]).map(([,v]) => v);
  const seen = items.reduce((a,x) => a + x.seen, 0), cats = Object.values(s.cats);
  const first = cats.reduce((a,c) => a + c.seen, 0), firstOk = cats.reduce((a,c) => a + c.ok, 0);
  const mastered = items.filter(x => x.box >= 3).length;
  const all = allTasks(), tdone = all.filter(x => s.tasks[x.t.id]);
  const catRows = Object.keys(C).map(c => ({c, v: s.cats[c] || {seen:0, ok:0}})).sort((a,b) => (a.v.seen ? a.v.ok/a.v.seen : 2) - (b.v.seen ? b.v.ok/b.v.seen : 2));
  const log = s.log.slice(-12).reverse().filter(l => BY_ID[l.id]);
  const lids = lessonIds(), ldone = lids.filter(id => s.lessons[id]).length;
  const partRows = [1,2,3,4].map(p => { const xs = all.filter(x => x.p === p && s.tasks[x.t.id]); const pct = xs.length ? Math.round(100 * xs.reduce((a,x) => a + s.tasks[x.t.id].best/s.tasks[x.t.id].max, 0) / xs.length) : 0;
    return `<div class="cat"><div class="top"><span>Part ${p} · ${PART_NAMES[p]}</span><span>${xs.length ? pct + " % (" + xs.length + " úloh)" : "zatím nic"}</span></div><div class="track"><i class="${xs.length && pct < 60 ? "low" : ""}" style="width:${pct}%"></i></div></div>`; }).join("");
  const mine = s.mine.map(id => BY_ID[id]).filter(Boolean);
  const exams = s.exams.slice(-5).reverse();
  box.innerHTML = `
    <div class="grid">
      <div class="stat"><b>${seen}</b><span>zodpovězeno</span></div>
      <div class="stat"><b>${first ? Math.round(firstOk/first*100) : 0} %</b><span>správně napoprvé</span></div>
      <div class="stat"><b>${mastered} / ${B.length}</b><span>zvládnuté úlohy</span></div>
      <div class="stat"><b>${tdone.length} / ${all.length}</b><span>celé úlohy</span></div>
      <div class="stat"><b>${ldone} / ${lids.length}</b><span>lekce</span></div>
      <div class="stat"><b>${streak()}</b><span>dní v řadě</span></div>
    </div>
    <h2>Celé úlohy (nejlepší výsledek)</h2><div class="cats">${partRows}</div>
    ${exams.length ? `<h2>Testy Part 1–4</h2><table class="uoe-tbl"><tbody>${exams.map(e => `<tr><td>${new Date(e.t).toLocaleDateString("cs-CZ")}</td><td>${e.parts.map(x => `P${x.p} ${x.s}/${x.m}`).join(" · ")}</td><td class="num">${e.score}/${e.max}${e.timed ? " ⏱" : ""}</td></tr>`).join("")}</tbody></table>` : ""}
    <h2>Podle témat</h2>
    <div class="cats">${catRows.map(({c,v}) => { const pct = v.seen ? Math.round(v.ok/v.seen*100) : 0;
      return `<div class="cat"><div class="top"><span>${esc(C[c])}</span><span>${v.seen ? v.ok + " z " + v.seen : "zatím nic"}</span></div><div class="track"><i class="${v.seen && pct < 60 ? "low" : ""}" style="width:${pct}%"></i></div></div>`; }).join("")}</div>
    <h2>Můj seznam slabin (${mine.length})</h2>
    ${mine.length ? `<p><button class="btn primary" id="uoe-minego">Procvičit seznam</button></p><ul class="errs">${mine.slice(-15).reverse().map(it => `<li>${filledHTML(it)}<br><span class="note">${esc(catName(it.cat))}</span> <button class="link-btn" data-rm="${esc(it.id)}">odebrat</button></li>`).join("")}</ul>` : `<p class="note">Po chybě klikni na „Přidat do mých slabin“ – úlohy se sem uloží a můžeš je procvičit zvlášť.</p>`}
    <h2>Poslední chyby</h2>
    ${log.length ? `<ul class="errs">${log.map(l => { const it = BY_ID[l.id]; return `<li>${filledHTML(it)}${l.given ? `<br><span class="note">napsal jsi: <s>${esc(l.given)}</s></span>` : ""}</li>`; }).join("")}</ul>` : `<p class="note">Zatím žádné. Udělej první kolo.</p>`}
    <p><button class="link-btn" id="uoe-reset">${resetArmed ? "Opravdu smazat? Klikni znovu" : "Smazat postup"}</button></p>`;
  const mg = $b("#uoe-minego"); if(mg) mg.onclick = () => { autoStart = "mine"; nav("train"); };
  box.querySelectorAll("[data-rm]").forEach(b => b.onclick = () => { const i = s.mine.indexOf(b.dataset.rm); if(i >= 0){ s.mine.splice(i,1); save(); } renderStats(); });
  $b("#uoe-reset").onclick = () => {
    if(!resetArmed){ resetArmed = true; renderStats(); return; }
    st = blank(); save(); resetArmed = false; sess = null; renderStats();
  };
}

/* ================= TAHÁK ================= */
function renderCheat(){
  const d = D();
  const tables = d.wfTables.map(([cls, rows]) => `<p><b>${esc(cls)}</b></p><table class="uoe-tbl">${rows.map(([a,b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join("")}</table>`).join("");
  const pats = `<ol style="padding-left:22px;margin:0">${d.kwtPatterns.map(([a,b]) => `<li>${esc(a)} → <em>${esc(b)}</em></li>`).join("")}</ol>`;
  const all = d.cheat.concat([["Part 3: přípony podle slovních druhů", tables], ["Part 4: nejčastější vzory", pats]]);
  box.innerHTML = `<p class="note" style="margin:0 0 8px">Podrobný výklad s příklady najdeš v záložce <button class="link-btn" id="uoe-tol">Lekce</button>.</p><div class="cheat">${all.map(([t,b],i) => `<details ${i===0?"open":""}><summary>${esc(t)}</summary><div class="body">${b}</div></details>`).join("")}</div>`;
  $b("#uoe-tol").onclick = () => nav("lessons");
}

/* ================= router ================= */
const TABS = [["home","Přehled"],["lessons","Lekce"],["train","Trénink"],["tasks","Celé úlohy"],["stats","Pokrok"],["cheat","Tahák"]];
function render(stage, ctx){
  let sub = (ctx && ctx.sub) || "home";
  lessonId = null;
  if(/^p[1-4]$/.test(sub)){ taskFilter = +sub[1]; sub = "tasks"; }
  else if(/^part[1-4]$/.test(sub)){ partFilter = +sub[4]; catFilter = ""; sub = "train"; }
  else if(/^l-[\w-]+$/.test(sub)){ lessonId = sub.slice(2); sub = "lessons"; }
  if(sub !== "exam" && !TABS.some(t => t[0] === sub)) sub = "home";
  view = sub; resetArmed = false; exam = null;
  if(sess && sess.view !== view) sess = null;
  if(sess && sess.mode === "quiz" && sess.lessonId !== lessonId) sess = null;
  curTask = view === "tasks" ? pendingTask : null; pendingTask = null;
  const sel = view === "exam" ? "tasks" : view;
  stage.innerHTML = `<nav class="sub-tabs uoe-subtabs" role="tablist" aria-label="Use of English">${TABS.map(([k,l]) => `<button class="tab" role="tab" data-v="${k}" aria-selected="${k===sel}">${l}</button>`).join("")}</nav><div class="uoe-view"></div>`;
  stage.querySelectorAll(".sub-tabs .tab").forEach(b => b.onclick = () => { if(b.dataset.v === "tasks") curTask = null; nav(b.dataset.v); });
  box = stage.querySelector(".uoe-view"); S(); bank();
  const auto = autoStart; autoStart = null;
  if(view === "train"){ if(auto) startSession(auto === "mine" ? "mine" : ""); else renderTrain(); }
  else if(view === "lessons") renderLessons();
  else if(view === "tasks") renderTasks();
  else if(view === "exam") renderExamStart();
  else if(view === "stats") renderStats();
  else if(view === "cheat") renderCheat();
  else renderHome();
}

/* ================= mock (Parts 1–4, 45 min, 36 marks) ================= */
function runMock(stage, finish){
  S(); bank();
  const T = D().tasks, pick = [1,2,3,4].filter(p => (T["p"+p] || []).length).map(p => ({p, t: T["p"+p][Math.floor(Math.random()*T["p"+p].length)]}));
  let sent = false, results = [];
  runExam(stage, pick, {
    title: "Reading & Use of English · Part 1–4", minutes: 45, timerForced: true, gridOpen: false,
    actions: [{label:"Pokračovat", primary:true, fn: () => {
      if(sent) return; sent = true;
      let correct = 0, total = 0; const details = {};
      results.forEach(r => { correct += r.g.score; total += r.g.max; details["p"+r.p] = {task: r.t.id, score: r.g.score, max: r.g.max}; });
      finish({correct, total, details});
    }}],
    onSubmit: rs => { results = rs; }
  });
}

P.register({
  id:"uoe", title:"Use of English (Part 1–4)", short:"Use of English",
  blurb:"Reading & Use of English Part 1–4: lekce, drily s opakováním, celé úlohy na čas, tahák.",
  render,
  progress(){
    const s = S(), B = bank(), all = allTasks();
    return {done: B.filter(it => s.items[it.id] && s.items[it.id].box >= 1).length + all.filter(x => s.tasks[x.t.id]).length, total: B.length + all.length};
  },
  mock:{paper:"Reading & Use of English (Part 1–4)", minutes:45, run: runMock},
  _internal:{scoreKT, wfBreak, ktHalves, keyOk}
});
})();
