/* Mock test centre: runs the paper modules' mock.run() inside an exam-mode frame, converts raw marks
   to an approximate Cambridge English Scale score, keeps a history with a trend chart.
   Also hosts the Czech exam guide ("O zkoušce", #/mock/guide). */
(function(){
"use strict";
const P = window.Portal; if(!P) return;
const {esc, todayStr, countdown, cambridgeScale, gradeFor} = P.util;
const HIST = "mock:history";

/* ---------------------------------------------------------------- styles */
const css = `
.mk-papers{display:grid;gap:10px;margin:0 0 18px}
.mk-paper{display:flex;gap:14px;align-items:center;border:1px solid var(--rule);border-radius:8px;padding:12px 16px;background:var(--sheet)}
.mk-paper .mk-info{flex:1;min-width:0}
.mk-paper b{display:block;font-family:var(--serif);font-size:20px;font-weight:500}
.mk-paper small{color:var(--muted);font-size:14px}
.mk-paper.off{opacity:.6}
.mk-paper.full{border-color:var(--ink);border-width:1.5px}
.mk-frame-head{position:sticky;top:0;z-index:20;display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;justify-content:space-between;background:var(--paper);border-bottom:1px solid var(--rule);padding:10px 0;margin:0 0 14px}
.mk-frame-head .mk-title{font-family:var(--serif);font-size:20px}
.mk-frame-head .mk-sec{color:var(--muted);font-size:14px;display:block}
.mk-frame-head .btn{min-height:36px;padding:0 14px;font-size:15px}
.mk-timeup{flex-basis:100%;color:var(--red);font-weight:600;font-size:14px}
body.mk-exam nav.portal,body.mk-exam .sub,body.mk-exam .topbar .tools{display:none}
.mk-table{width:100%;border-collapse:collapse;font-size:15px;margin:0 0 16px}
.mk-table th,.mk-table td{text-align:left;padding:8px 6px;border-bottom:1px solid var(--rule);vertical-align:top}
.mk-table th{font-weight:600;color:var(--muted);font-size:13.5px}
.mk-table td.num{font-variant-numeric:tabular-nums;white-space:nowrap}
.mk-wrap{overflow-x:auto}
.mk-overall{display:flex;flex-wrap:wrap;gap:4px 16px;align-items:baseline;margin:0 0 6px}
.mk-overall .mk-big{font-size:clamp(44px,11vw,56px);font-weight:600;line-height:1;font-variant-numeric:tabular-nums}
.mk-chart{width:100%;max-width:560px;height:auto;display:block;margin:0 0 6px}
.mk-chart .grid{stroke:var(--rule);stroke-width:1}
.mk-chart .ax{fill:var(--muted);font-size:11px;font-family:var(--sans)}
.mk-chart .ln{fill:none;stroke:var(--ink);stroke-width:2;stroke-linejoin:round;stroke-linecap:round}
.mk-chart .dot{fill:var(--ink);stroke:var(--sheet);stroke-width:2}
.mk-chart .dot.part{fill:var(--sheet);stroke:var(--ink)}
.mk-chart .hit{fill:transparent;cursor:default}
.mk-chart .hit:hover+.dot,.mk-chart .hit:focus+.dot{r:6}
.mk-disc{font-size:13.5px;color:var(--muted);border-left:3px solid var(--rule);padding:2px 0 2px 12px;margin:14px 0}
.mk-guide table{width:100%;border-collapse:collapse;font-size:14.5px;margin:6px 0 12px}
.mk-guide th,.mk-guide td{text-align:left;padding:6px 6px;border-bottom:1px solid var(--rule);vertical-align:top}
.mk-guide th{color:var(--muted);font-weight:600;font-size:13px}
`;
const st = document.createElement("style"); st.id = "mk-style"; st.textContent = css; document.head.appendChild(st);

/* ---------------------------------------------------------------- papers & skills */
const SKILLS = {uoe:"Use of English", reading:"Reading", writing:"Writing", listening:"Listening", speaking:"Speaking"};
const PAPERS = [
  {id:"rue", name:"Reading & Use of English", minutes:90, sections:["uoe","reading"], blurb:"8 částí, 56 otázek (UoE Part 1–4 + Reading Part 5–8)"},
  {id:"writing", name:"Writing", minutes:90, sections:["writing"], blurb:"2 úlohy po 220–260 slovech, sebehodnocení"},
  {id:"listening", name:"Listening", minutes:40, sections:["listening"], blurb:"4 části, 30 otázek, každá nahrávka 2×"},
  {id:"speaking", name:"Speaking", minutes:15, sections:["speaking"], blurb:"4 části, simulace zkoušejícího, sebehodnocení"}
];
const paperById = id => PAPERS.find(p => p.id === id);
const hasMock = id => { const m = P.modules[id]; return !!(m && m.mock && typeof m.mock.run === "function"); };
const paperAvail = p => p.sections.filter(hasMock);

/* raw result from finish() -> normalised skill result */
function convert(res){
  if(!res || typeof res !== "object") return null;
  let pct, raw;
  if(typeof res.selfScore === "number" && isFinite(res.selfScore)){
    pct = Math.max(0, Math.min(100, res.selfScore)); raw = {self: Math.round(pct)};
  } else if(+res.total > 0){
    const c = Math.max(0, Math.min(+res.total, +res.correct || 0));
    pct = 100*c/(+res.total); raw = {c, n:+res.total};
  } else return null;
  const scale = cambridgeScale(pct);
  return Object.assign(raw, {pct: Math.round(pct), scale, grade: gradeFor(scale)});
}
/* paper score: R&UoE = UoE + Reading raw marks added together */
function paperScore(paper, skills){
  const rs = paper.sections.map(s => skills[s]).filter(Boolean);
  if(!rs.length) return null;
  let pct;
  if(rs.every(r => r.n > 0)){ const c = rs.reduce((s,r) => s+r.c, 0), n = rs.reduce((s,r) => s+r.n, 0); pct = 100*c/n; }
  else pct = rs.reduce((s,r) => s+r.pct, 0)/rs.length;
  const scale = cambridgeScale(pct);
  return {pct: Math.round(pct), scale, grade: gradeFor(scale), complete: rs.length === paper.sections.length};
}
/* overall = average of the five skill scores (Reading, UoE, Writing, Listening, Speaking), like the Statement of Results */
function overall(skills){
  const ks = Object.keys(SKILLS).filter(k => skills[k]);
  if(!ks.length) return null;
  const scale = Math.round(ks.reduce((s,k) => s + skills[k].scale, 0)/ks.length);
  return {scale, grade: gradeFor(scale), complete: ks.length === 5, count: ks.length};
}
function summarize(att){
  att.papers = {};
  PAPERS.forEach(p => { const s = paperScore(p, att.skills); if(s) att.papers[p.id] = s; });
  att.overall = overall(att.skills);
  return att;
}
const history = () => { const h = P.store.get(HIST, []); return Array.isArray(h) ? h : []; };
function saveAttempt(att){
  if(!Object.keys(att.skills).length) return;
  const h = history().filter(a => a.id !== att.id); h.push(att); h.sort((a,b) => a.id - b.id);
  P.store.set(HIST, h.slice(-100));
}
const gradeNote = g => ({"A":"Grade A – certifikát C2", "B":"Grade B – C1", "C (C1)":"Grade C – C1", "B2":"certifikát B2", "pod B2":"bez certifikátu"})[g] || g;

/* ---------------------------------------------------------------- exam mode */
let leaveGuard = null;
function examMode(on){
  document.body.classList.toggle("mk-exam", on);
  if(on && !leaveGuard){ leaveGuard = e => { e.preventDefault(); e.returnValue = ""; }; window.addEventListener("beforeunload", leaveGuard); }
  if(!on && leaveGuard){ window.removeEventListener("beforeunload", leaveGuard); leaveGuard = null; }
}
window.addEventListener("hashchange", () => examMode(false));

/* run one paper inside a frame; cb(aborted:boolean) when done. Results go into att.skills */
function runPaper(stage, paper, att, cb){
  const secs = paperAvail(paper);
  stage.innerHTML = "";
  const head = document.createElement("div"); head.className = "mk-frame-head";
  head.innerHTML = `<div><span class="mk-title">${esc(paper.name)}</span><span class="mk-sec"></span></div>
    <div class="row"><span class="timer" aria-label="Zbývající čas">--:--</span><button class="btn ghost" data-act="end">Ukončit</button></div>`;
  const body = document.createElement("div");
  stage.appendChild(head); stage.appendChild(body);
  examMode(true);
  let ended = false, idx = -1;
  const timer = countdown(head.querySelector(".timer"), paper.minutes*60, () => {
    if(ended) return;
    head.insertAdjacentHTML("beforeend", `<p class="mk-timeup" role="alert">Čas vypršel – v ostré zkoušce bys teď musel/a odevzdat. Dokonči rozpracovanou část a odevzdej.</p>`);
  });
  const done = aborted => { if(ended) return; ended = true; timer.stop(); examMode(false); summarize(att); saveAttempt(att); cb(aborted); };
  head.querySelector('[data-act="end"]').addEventListener("click", () => {
    if(confirm("Ukončit "+paper.name+"? Nedokončené sekce se do výsledku nezapočítají.")) done(true);
  });
  const next = () => {
    if(ended) return;
    idx++;
    if(idx >= secs.length) return done(false);
    const id = secs[idx], mod = P.modules[id];
    head.querySelector(".mk-sec").textContent = (secs.length > 1 ? `Sekce ${idx+1}/${secs.length}: ` : "") + SKILLS[id];
    body.innerHTML = ""; const box = document.createElement("div"); body.appendChild(box);
    window.scrollTo(0, 0);
    let called = false;
    const finish = res => {
      if(called || ended) return; called = true;
      const r = convert(res);
      if(r){ att.skills[id] = r; P.logActivity("mock", id, r.n > 0 ? r.c : r.pct, r.n > 0 ? r.n : 100, {mock:true}); }
      summarize(att); saveAttempt(att);
      next();
    };
    try{ mod.mock.run(box, finish); }
    catch(e){ console.warn("mock.run failed for "+id, e); box.innerHTML = `<p class="hint">Tuto sekci se nepodařilo spustit.</p>`; setTimeout(() => { if(!called){ called = true; next(); } }, 1200); }
  };
  next();
}

/* ---------------------------------------------------------------- views */
function subTabs(stage, active){
  const nav = document.createElement("div"); nav.className = "sub-tabs"; nav.setAttribute("role","tablist");
  nav.innerHTML = [["","Zkouška"],["history","Výsledky"],["guide","O zkoušce"]].map(([s,l]) => `<button class="tab" role="tab" data-sub="${s}" aria-selected="${s === active}">${l}</button>`).join("");
  nav.addEventListener("click", e => { const b = e.target.closest("button"); if(b) P.go("mock", b.dataset.sub || null); });
  stage.appendChild(nav);
}

function renderPicker(stage){
  const box = document.createElement("section");
  const anyAll = PAPERS.every(p => paperAvail(p).length);
  const allCount = PAPERS.filter(p => paperAvail(p).length).length;
  const totalMin = PAPERS.reduce((s,p) => s+p.minutes, 0);
  box.innerHTML = `<p>Simulace ostré zkoušky na čas. Výsledek se převede na <b>orientační</b> skóre Cambridge English Scale (160–210).</p>
    <div class="mk-papers">
      <div class="mk-paper full ${allCount ? "" : "off"}"><div class="mk-info"><b>Celá zkouška</b><small>Všechny 4 papers za sebou (~${Math.round(totalMin/60*10)/10} h) s pauzami mezi nimi${anyAll ? "" : allCount ? " · některé části zatím chybí a budou přeskočeny" : ""}</small></div>
        ${allCount ? `<button class="btn primary" data-run="full">Začít</button>` : `<span class="badge">zatím nedostupné</span>`}</div>
      ${PAPERS.map(p => { const av = paperAvail(p);
        const missing = p.sections.filter(s => !av.includes(s));
        return `<div class="mk-paper ${av.length ? "" : "off"}"><div class="mk-info"><b>${esc(p.name)}</b><small>${p.minutes} min · ${esc(p.blurb)}${av.length && missing.length ? ` · ${missing.map(s => SKILLS[s]).join(", ")} zatím nedostupné` : ""}</small></div>
          ${av.length ? `<button class="btn ghost" data-run="${p.id}">Spustit</button>` : `<span class="badge">zatím nedostupné</span>`}</div>`; }).join("")}
    </div>
    <p class="note">Tip: pusť si mock v klidu, bez telefonu a slovníku. Tlačítko <b>Ukončit</b> přeruší část – co jsi už odevzdal/a, se uloží.</p>`;
  stage.appendChild(box);
  box.querySelectorAll("[data-run]").forEach(b => b.addEventListener("click", () => start(stage, b.dataset.run)));
}

function start(stage, kind){
  const att = {id: Date.now(), day: todayStr(), kind, skills: {}, papers: {}, overall: null};
  const queue = kind === "full" ? PAPERS.filter(p => paperAvail(p).length) : [paperById(kind)].filter(Boolean);
  let i = 0;
  const runNext = () => {
    const paper = queue[i];
    runPaper(stage, paper, att, aborted => {
      i++;
      if(aborted || i >= queue.length) return report(stage, att);
      interstitial(stage, att, paper, queue[i], runNext);
    });
  };
  /* stage is cleared by the frame; keep the selection screen out */
  runNext();
}

function interstitial(stage, att, prev, nxt, go){
  const ps = att.papers[prev.id];
  stage.innerHTML = `<section class="sheet"><p class="badge">Pauza</p>
    <h2 style="margin-top:8px">${esc(prev.name)} – hotovo</h2>
    <p>${ps ? `Orientační skóre: <b>${ps.scale}</b> (${esc(gradeNote(ps.grade))})` : "Bez hodnocení (sekce nebyla dokončena)."}</p>
    <p>Další: <b>${esc(nxt.name)}</b> · ${nxt.minutes} min. Dej si krátkou pauzu, napij se a pokračuj, až budeš připraven/a.</p>
    <div class="row"><button class="btn primary" data-act="go">Pokračovat</button><button class="btn ghost" data-act="stop">Ukončit zkoušku a zobrazit výsledky</button></div></section>`;
  stage.querySelector('[data-act="go"]').addEventListener("click", go);
  stage.querySelector('[data-act="stop"]').addEventListener("click", () => report(stage, att));
}

function scoreRows(att){
  return PAPERS.map(p => {
    const ps = att.papers[p.id];
    const raw = p.sections.map(s => att.skills[s]).filter(Boolean).map(r => r.n > 0 ? `${r.c}/${r.n}` : `${r.self} %`).join(" + ");
    return `<tr><td>${esc(p.name)}${ps && !ps.complete ? ` <span class="badge">neúplné</span>` : ""}</td><td class="num">${raw || "–"}</td><td class="num">${ps ? `<b>${ps.scale}</b>` : "–"}</td><td>${ps ? esc(gradeNote(ps.grade)) : "neabsolvováno"}</td></tr>`;
  }).join("");
}
function report(stage, att){
  examMode(false);
  summarize(att); saveAttempt(att);
  const o = att.overall;
  stage.innerHTML = "";
  subTabs(stage, "");
  const box = document.createElement("section"); box.className = "sheet"; box.setAttribute("aria-live", "polite");
  const skillRows = Object.keys(SKILLS).map(k => { const r = att.skills[k]; return `<tr><td>${SKILLS[k]}</td><td class="num">${r ? (r.n > 0 ? `${r.c}/${r.n} (${r.pct} %)` : `${r.self} % (sebehodnocení)`) : "–"}</td><td class="num">${r ? r.scale : "–"}</td></tr>`; }).join("");
  box.innerHTML = `<p class="badge">Výsledek mocku · ${esc(att.day)}</p>
    ${o ? `<div class="mk-overall"><span class="mk-big">${o.scale}</span><span>${o.complete ? "celkové orientační skóre" : `průměr z ${o.count} ${o.count === 1 ? "dovednosti" : "dovedností"} (neúplná zkouška)`}<br><b>${esc(gradeNote(o.grade))}</b></span></div>`
      : `<p class="score">Bez výsledku</p><p>Žádná sekce nebyla dokončena.</p>`}
    <h2>Podle papers</h2>
    <div class="mk-wrap"><table class="mk-table"><thead><tr><th>Paper</th><th>Body</th><th>Scale</th><th>Úroveň</th></tr></thead><tbody>${scoreRows(att)}</tbody></table></div>
    <h2>Podle dovedností</h2>
    <div class="mk-wrap"><table class="mk-table"><thead><tr><th>Dovednost</th><th>Body</th><th>Scale</th></tr></thead><tbody>${skillRows}</tbody></table></div>
    <p class="mk-disc">Převod je jen <b>přibližný</b>: Cambridge převádí body na škálu podle obtížnosti konkrétní verze testu a hranice se mezi termíny mírně liší. Writing a Speaking jsou založené na tvém sebehodnocení. Celkové skóre = průměr pěti dovedností (Reading, Use of English, Writing, Listening, Speaking), stejně jako na Statement of Results.</p>
    <div class="row"><button class="btn primary" data-act="again">Další mock</button><button class="btn ghost" data-act="hist">Historie a trend</button><button class="btn ghost" data-act="home">Na přehled</button></div>`;
  stage.appendChild(box);
  box.querySelector('[data-act="again"]').addEventListener("click", () => P.show("mock"));
  box.querySelector('[data-act="hist"]').addEventListener("click", () => P.go("mock", "history"));
  box.querySelector('[data-act="home"]').addEventListener("click", () => P.go("home"));
  window.scrollTo(0, 0);
}

/* attempt -> single headline score for the trend: overall if any */
const headline = a => a.overall ? a.overall.scale : null;
function trendSVG(h){
  const pts = h.filter(a => headline(a) != null);
  if(!pts.length) return "";
  const W = 360, H = 190, L = 30, R = 22, T = 14, B = 24;
  const lo = 140, hi = 210;
  const x = i => pts.length === 1 ? L + (W-L-R)/2 : L + i*(W-L-R)/(pts.length-1);
  const y = v => T + (hi - Math.max(lo, Math.min(hi, v)))*(H-T-B)/(hi-lo);
  const refs = [[160,"B2"],[180,"C1"],[200,"A"]];
  let s = `<svg class="mk-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Vývoj orientačního skóre v mock testech: ${pts.map(a => headline(a)).join(", ")}">`;
  refs.forEach(([v,l]) => { s += `<line class="grid" x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}"/><text class="ax" x="${L-6}" y="${y(v)+4}" text-anchor="end">${v}</text><text class="ax" x="${W-R}" y="${y(v)-4}" text-anchor="end">${l}</text>`; });
  s += `<line class="grid" x1="${L}" x2="${W-R}" y1="${H-B}" y2="${H-B}"/>`;
  if(pts.length > 1) s += `<polyline class="ln" points="${pts.map((a,i) => x(i).toFixed(1)+","+y(headline(a)).toFixed(1)).join(" ")}"/>`;
  const step = Math.max(1, Math.ceil(pts.length/5));
  pts.forEach((a,i) => {
    const d = new Date(a.id), lab = d.getDate()+". "+(d.getMonth()+1)+".";
    const kind = a.kind === "full" ? "celá zkouška" : (paperById(a.kind)||{}).name || a.kind;
    s += `<circle class="hit" cx="${x(i)}" cy="${y(headline(a))}" r="12" tabindex="0"><title>${esc(lab)} · ${esc(kind)}: ${headline(a)}${a.overall && !a.overall.complete ? " (neúplné)" : ""}</title></circle>`;
    s += `<circle class="dot ${a.overall && a.overall.complete ? "" : "part"}" cx="${x(i)}" cy="${y(headline(a))}" r="4" pointer-events="none"/>`;
    if((i % step === 0 && pts.length-1-i >= step/2) || i === pts.length-1){ const anc = pts.length === 1 ? "middle" : i === 0 ? "start" : i === pts.length-1 ? "end" : "middle"; s += `<text class="ax" x="${x(i)}" y="${H-6}" text-anchor="${anc}">${esc(lab)}</text>`; }
  });
  const last = pts[pts.length-1];
  s += `<text class="ax" x="${x(pts.length-1)}" y="${y(headline(last))-9}" text-anchor="${pts.length === 1 ? "middle" : "end"}" style="fill:var(--ink);font-weight:600;font-size:12px">${headline(last)}</text>`;
  return s + `</svg>`;
}
function renderHistory(stage){
  const h = history();
  const box = document.createElement("section"); box.className = "sheet";
  if(!h.length){ box.innerHTML = `<p>Zatím žádný mock. Spusť první v záložce <button class="link-btn" data-go="1">Zkouška</button>.</p>`;
    stage.appendChild(box); box.querySelector("[data-go]").addEventListener("click", () => P.go("mock")); return; }
  const best = Math.max(...h.map(a => headline(a) || 0));
  box.innerHTML = `<h2 style="margin-top:0">Vývoj skóre</h2>
    <div class="grid"><div class="stat"><b>${h.length}</b><span>mocků celkem</span></div><div class="stat"><b>${best || "–"}</b><span>nejlepší skóre</span></div><div class="stat"><b>${headline(h[h.length-1]) || "–"}</b><span>poslední</span></div></div>
    ${trendSVG(h)}
    <p class="note">Plný bod = celá zkouška, prázdný = jen některé papers. Čáry 160 / 180 / 200 = hranice B2 / C1 / grade A.</p>
    <h2>Historie</h2>
    <div class="mk-wrap"><table class="mk-table"><thead><tr><th>Datum</th><th>Typ</th>${PAPERS.map(p => `<th>${esc(p.id === "rue" ? "R&UoE" : p.name)}</th>`).join("")}<th>Celkem</th></tr></thead>
    <tbody>${h.slice().reverse().map(a => `<tr><td class="num">${esc(a.day||"")}</td><td>${a.kind === "full" ? "celá" : esc(((paperById(a.kind)||{}).name)||a.kind)}</td>${PAPERS.map(p => `<td class="num">${a.papers && a.papers[p.id] ? a.papers[p.id].scale : "–"}</td>`).join("")}<td class="num"><b>${headline(a) || "–"}</b></td></tr>`).join("")}</tbody></table></div>
    <button class="btn ghost" data-act="clear">Smazat historii mocků</button>`;
  stage.appendChild(box);
  box.querySelector('[data-act="clear"]').addEventListener("click", () => { if(confirm("Smazat celou historii mock testů?")){ P.store.del(HIST); P.show("mock", true); } });
}

/* ---------------------------------------------------------------- exam guide (Czech) */
const GUIDE = {
  rue: [
    [1,"Multiple-choice cloze","text s 8 mezerami, 4 možnosti (kolokace, frázová slovesa, idiomy)",8,1],
    [2,"Open cloze","8 mezer, doplň 1 slovo (gramatika, předložky, spojky)",8,1],
    [3,"Word formation","8 mezer, utvoř správný tvar slova z kmene",8,1],
    [4,"Key word transformation","přepiš větu 3–6 slovy s daným klíčovým slovem",6,2],
    [5,"Multiple choice","delší text, 6 otázek se 4 možnostmi",6,2],
    [6,"Cross-text multiple matching","4 krátké texty, porovnání názorů autorů",4,2],
    [7,"Gapped text","doplň 6 vyjmutých odstavců (jeden navíc)",6,2],
    [8,"Multiple matching","text v sekcích nebo více textů, 10 výroků",10,1]
  ],
  listening: [
    [1,"Multiple choice","3 krátké rozhovory, 2 otázky ke každému",6,1],
    [2,"Sentence completion","monolog ~3 min, doplň 8 vět slovy z nahrávky",8,1],
    [3,"Multiple choice","rozhovor/interview ~4 min, 6 otázek",6,1],
    [4,"Multiple matching","5 krátkých monologů, 2 úlohy po 5 položkách",10,1]
  ],
  speaking: [
    [1,"Interview","otázky o tobě, zájmech, studiu",2],
    [2,"Long turn","1 min srovnání 2 ze 3 fotek + krátká reakce na partnera",4],
    [3,"Collaborative task","diskuse nad otázkou s 5 podněty (2 min) + rozhodnutí (1 min)",4],
    [4,"Discussion","širší otázky k tématu části 3",5]
  ]
};
const TIMING = [["Part 1",8],["Part 2",8],["Part 3",8],["Part 4",10],["Part 5",15],["Part 6",10],["Part 7",13],["Part 8",13],["kontrola",5]];
function renderGuide(stage){
  const sumQ = GUIDE.rue.reduce((s,r) => s+r[3], 0), sumM = GUIDE.rue.reduce((s,r) => s+r[3]*r[4], 0);
  const lq = GUIDE.listening.reduce((s,r) => s+r[3], 0);
  const box = document.createElement("section"); box.className = "sheet cheat mk-guide";
  box.innerHTML = `<h2 style="margin-top:0">O zkoušce C1 Advanced (CAE)</h2>
  <p>C1 Advanced má <b>4 papers</b> (5 hodnocených dovedností). Písemné části se dělají v jeden den, Speaking může být ve stejný den nebo v jiném termínu. Zkouška existuje v papírové i počítačové verzi – formát úloh je stejný.</p>
  <table><thead><tr><th>Paper</th><th>Čas</th><th>Obsah</th><th>Váha</th></tr></thead><tbody>
    <tr><td>Reading &amp; Use of English</td><td>90 min</td><td>8 částí, ${sumQ} otázek, ${sumM} bodů</td><td>40 % (2 dovednosti)</td></tr>
    <tr><td>Writing</td><td>90 min</td><td>2 úlohy, 220–260 slov každá</td><td>20 %</td></tr>
    <tr><td>Listening</td><td>cca 40 min</td><td>4 části, ${lq} otázek</td><td>20 %</td></tr>
    <tr><td>Speaking</td><td>15 min</td><td>4 části, ve dvojici, 2 zkoušející</td><td>20 %</td></tr></tbody></table>

  <details open><summary>Reading &amp; Use of English – body za části</summary><div class="body">
    <table><thead><tr><th>Část</th><th>Úloha</th><th>Otázek</th><th>Bodů</th></tr></thead><tbody>
    ${GUIDE.rue.map(r => `<tr><td>${r[0]}</td><td><b>${r[1]}</b><br><span class="note">${r[2]}</span></td><td>${r[3]}</td><td>${r[3]*r[4]} (${r[4]}/otázka)</td></tr>`).join("")}
    <tr><td></td><td><b>Celkem</b></td><td>${sumQ}</td><td>${sumM}</td></tr></tbody></table>
    <p>V Part 4 můžeš za každou větu získat 0, 1 nebo 2 body (každá ze dvou „půlek“ transformace je za 1 bod). Pravopis musí být v Part 2, 3 a 4 správně.</p></div></details>

  <details><summary>Writing – úlohy a hodnocení</summary><div class="body">
    <p><b>Part 1 (povinná): Essay</b> – na základě zadání a poznámek rozebereš 2 ze 3 uvedených bodů a vysvětlíš, který je důležitější.</p>
    <p><b>Part 2 (výběr 1 ze 3):</b> letter/email, proposal, report nebo review.</p>
    <p>Každá úloha se hodnotí 4 kritérii po 0–5 bodech: <b>Content</b> (splnění zadání), <b>Communicative Achievement</b> (registr, formát, účinek na čtenáře), <b>Organisation</b> (struktura, odstavce, návaznost) a <b>Language</b> (rozsah a přesnost slovní zásoby a gramatiky). Celkem 2 × 20 = 40 bodů.</p></div></details>

  <details><summary>Listening – části</summary><div class="body">
    <table><thead><tr><th>Část</th><th>Úloha</th><th>Otázek</th></tr></thead><tbody>
    ${GUIDE.listening.map(r => `<tr><td>${r[0]}</td><td><b>${r[1]}</b><br><span class="note">${r[2]}</span></td><td>${r[3]}</td></tr>`).join("")}</tbody></table>
    <p>Každou nahrávku slyšíš <b>dvakrát</b>, každá otázka je za 1 bod. V papírové verzi máš na konci 5 minut na přepsání odpovědí do answer sheetu.</p></div></details>

  <details><summary>Speaking – části a hodnocení</summary><div class="body">
    <table><thead><tr><th>Část</th><th>Úloha</th><th>Min</th></tr></thead><tbody>
    ${GUIDE.speaking.map(r => `<tr><td>${r[0]}</td><td><b>${r[1]}</b><br><span class="note">${r[2]}</span></td><td>${r[3]}</td></tr>`).join("")}</tbody></table>
    <p>Hodnotitel (assessor) sleduje <b>Grammatical Resource, Lexical Resource, Discourse Management, Pronunciation</b> a <b>Interactive Communication</b>; zkoušející, který s tebou mluví (interlocutor), dává celkový dojem (<b>Global Achievement</b>).</p></div></details>

  <details open><summary>Cambridge English Scale – jak se počítá výsledek</summary><div class="body">
    <p>Body z každé dovednosti se převedou na <b>Cambridge English Scale</b>. Dostaneš 5 dílčích skóre (Reading, Use of English, Writing, Listening, Speaking) a <b>celkové skóre = jejich průměr</b>. Každá dovednost má tedy váhu 20 % – a protože Reading a Use of English jsou v jednom paperu, tvoří dohromady 40 %.</p>
    <table><thead><tr><th>Skóre</th><th>Výsledek</th></tr></thead><tbody>
      <tr><td>200–210</td><td><b>Grade A</b> – certifikát s úrovní <b>C2</b></td></tr>
      <tr><td>193–199</td><td><b>Grade B</b> – C1</td></tr>
      <tr><td>180–192</td><td><b>Grade C</b> – C1 (180 = hranice úspěchu)</td></tr>
      <tr><td>160–179</td><td>neuspěl/a na C1, ale získáš certifikát úrovně <b>B2</b></td></tr>
      <tr><td>pod 160</td><td>bez certifikátu</td></tr></tbody></table>
    <p>Na úspěch nepotřebuješ projít každou část – rozhoduje průměr. Slabší Listening tak může vyrovnat silný Writing. Pro C1 obvykle stačí zhruba 60 % bodů, pro grade A kolem 80 % (přesný převod se liší podle verze testu). Odhady v této aplikaci jsou orientační.</p></div></details>

  <details><summary>Time management</summary><div class="body">
    <p><b>Reading &amp; Use of English (90 min)</b> – doporučené rozvržení:</p>
    <table><tbody>${TIMING.map(([p,m]) => `<tr><td>${p}</td><td>${m} min</td></tr>`).join("")}</tbody></table>
    <p>Odpovědi zapisuj rovnou do answer sheetu – na přepis není čas navíc. Když se zasekneš, tipni si, označ otázku a jdi dál.</p>
    <p><b>Writing (90 min)</b> – na každou úlohu 45 min: 5–8 min plán (odstavce, hlavní body), 30 min psaní, 5–7 min kontrola (počet slov, časy, shoda, členy, pravopis).</p>
    <p><b>Listening</b> – využij čas před každou částí na přečtení otázek a podtržení klíčových slov; při druhém poslechu ověřuj.</p>
    <p><b>Speaking</b> – v Part 2 mluv celou minutu (zkoušející tě přeruší), v Part 3 nečekej na „správnou“ odpověď, jde o interakci.</p></div></details>

  <details><summary>Co si vzít s sebou</summary><div class="body"><ul>
    <li>platný <b>doklad totožnosti</b> (občanský průkaz nebo pas) – ten, který jsi uvedl/a při registraci; bez něj tě nepustí,</li>
    <li>potvrzení o registraci (Confirmation of Entry) s časy a místem,</li>
    <li>u papírové verze <b>obyčejné tužky (HB)</b>, gumu a ořezávátko; Writing můžeš psát i perem,</li>
    <li>vodu v průhledné lahvi bez etikety (podle pravidel centra),</li>
    <li>telefon, chytré hodinky a poznámky odevzdáš před vstupem – do místnosti je nesmíš mít u sebe.</li></ul></div></details>

  <details><summary>Tipy na den zkoušky</summary><div class="body"><ul>
    <li>Přijď aspoň 30 minut předem, ověř si místnost a číslo kandidáta.</li>
    <li>Den předtím se nic nového neuč – projdi si jen svůj slovníček chyb a vyspi se.</li>
    <li>Za špatnou odpověď se body neodečítají – <b>nenechávej nic prázdné</b>.</li>
    <li>Čti zadání úplně – v Writing musíš pokrýt všechny body zadání a dodržet požadovaný útvar.</li>
    <li>Ve Speaking mluv na partnera, ne jen ke zkoušejícímu; když něčemu nerozumíš, slušně požádej o zopakování.</li>
    <li>Po každém paperu ho „zavři“ v hlavě – na celkový výsledek má vliv průměr, jedna horší část nic nekončí.</li></ul></div></details>

  <details><summary>Časté chyby</summary><div class="body"><ul>
    <li><b>Part 4 (UoE):</b> změna klíčového slova, více než 6 slov, nebo změna významu věty.</li>
    <li><b>Part 2 a 3 (UoE), Listening Part 2:</b> pravopisné chyby – i drobný překlep znamená 0 bodů.</li>
    <li><b>Part 3 (UoE):</b> přehlédnuté množné číslo nebo zápor (un-/in-/dis-/-less).</li>
    <li><b>Reading Part 5 a 8:</b> volba možnosti jen proto, že obsahuje stejné slovo jako text.</li>
    <li><b>Reading Part 7:</b> moc času na jedné mezeře; nejdřív doplň jisté, pak zbytek vylučovací metodou.</li>
    <li><b>Writing:</b> nevhodný registr (příliš neformální report), chybějící nadpisy u reportu/proposalu, výrazně pod/nad 220–260 slov, u eseje nevybraný „důležitější“ bod.</li>
    <li><b>Speaking:</b> popis fotek místo srovnání a spekulace, příliš krátké odpovědi, nebo naopak přerušování partnera.</li></ul></div></details>
  <p class="note" style="margin-top:14px">Informace odpovídají současnému formátu C1 Advanced. Organizační detaily (pravidla místnosti, časy, verze na počítači) si před zkouškou ověř u svého zkouškového centra.</p>`;
  stage.appendChild(box);
}

/* ---------------------------------------------------------------- register */
P.register({
  id:"mock", title:"Mock test", short:"Mock test", blurb:"Simulace celé zkoušky na čas s odhadem skóre",
  render(stage, ctx){
    examMode(false);
    const sub = (ctx && ctx.sub) || "";
    const active = sub === "history" || sub === "guide" ? sub : "";
    subTabs(stage, active);
    if(active === "history") renderHistory(stage);
    else if(active === "guide") renderGuide(stage);
    else renderPicker(stage);
  },
  _internal:{convert, paperScore, overall, summarize, PAPERS, GUIDE, trendSVG}
});
})();
