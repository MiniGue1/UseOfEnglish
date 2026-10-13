/* B2 First – mock test centre: runs the paper modules' mock.run() inside an exam-mode frame, converts raw marks
   to an approximate Cambridge English Scale score (official B2 First reference points, Portal.util.scaleFor),
   keeps a history with a trend chart. Also hosts the Czech exam guide ("O zkoušce", #/mock/guide). */
(function(){
"use strict";
const P = window.Portal; if(!P) return;
const {esc, todayStr, countdown, cambridgeScale, scaleFor, SCALE_POINTS, gradeFor} = P.util;
const HIST = "mock:history";
const FLOOR = (P.scale && P.scale.floor) || 122, TOP = (P.scale && P.scale.top) || 190;

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
.mk-next{border-left:3px solid var(--red);padding:4px 0 4px 14px;margin:6px 0 16px}
.mk-next p{margin:0 0 8px}
.mk-chart{width:100%;max-width:560px;height:auto;display:block;margin:0 0 6px}
.mk-chart .grid{stroke:var(--rule);stroke-width:1}
.mk-chart .ax{fill:var(--muted);font-size:11px;font-family:var(--sans)}
.mk-chart .ln{fill:none;stroke:var(--ink);stroke-width:2;stroke-linejoin:round;stroke-linecap:round}
.mk-chart .dot{fill:var(--ink);stroke:var(--sheet);stroke-width:2}
.mk-chart .dot.part{fill:var(--sheet);stroke:var(--ink)}
.mk-chart .hit{fill:transparent;cursor:default}
.mk-chart .hit:hover+.dot,.mk-chart .hit:focus+.dot{r:6}
.mk-disc{font-size:13.5px;color:var(--muted);border-left:3px solid var(--rule);padding:2px 0 2px 12px;margin:14px 0}
.mk-guide .mk-wrap{margin:6px 0 12px}
.mk-guide table{width:100%;border-collapse:collapse;font-size:14.5px;margin:6px 0 12px}
.mk-guide .mk-wrap table{margin:0}
.mk-guide th,.mk-guide td{text-align:left;padding:6px 6px;border-bottom:1px solid var(--rule);vertical-align:top}
.mk-guide th{color:var(--muted);font-weight:600;font-size:13px}
.mk-guide td.num{font-variant-numeric:tabular-nums;white-space:nowrap}
`;
const st = document.createElement("style"); st.id = "mk-style"; st.textContent = css; document.head.appendChild(st);

/* ---------------------------------------------------------------- papers & skills (B2 First) */
const SKILLS = {reading:"Reading", uoe:"Use of English", writing:"Writing", listening:"Listening", speaking:"Speaking"}; /* Statement of Results order */
const SKILL_FULL = {reading:"Reading (Part 1 + 5–7)", uoe:"Use of English (Part 2–4)", writing:"Writing", listening:"Listening", speaking:"Speaking"};
const PAPERS = [
  {id:"rue", name:"Reading & Use of English", minutes:75, sections:["uoe","reading"], blurb:"7 částí, 52 otázek (UoE Part 1–4 + Reading Part 5–7)"},
  {id:"writing", name:"Writing", minutes:80, sections:["writing"], blurb:"2 úlohy po 140–190 slovech, sebehodnocení"},
  {id:"listening", name:"Listening", minutes:40, sections:["listening"], blurb:"4 části, 30 otázek, každá nahrávka 2×"},
  {id:"speaking", name:"Speaking", minutes:14, sections:["speaking"], blurb:"4 části, simulace zkoušejícího, sebehodnocení"}
];
const paperById = id => PAPERS.find(p => p.id === id);
const hasMock = id => { const m = P.modules[id]; return !!(m && m.mock && typeof m.mock.run === "function"); };
const paperAvail = p => p.sections.filter(hasMock);

/* Part 1 marks reported by the UoE mock: details.p1 = {score, max} (also accepts part1 / {correct, total}) */
function p1Of(details){
  if(!details || typeof details !== "object" || Array.isArray(details)) return null;
  const p = details.p1 || details.part1 || details["1"];
  if(!p || typeof p !== "object") return null;
  const max = +(p.max != null ? p.max : p.total != null ? p.total : p.n);
  const sc = +(p.score != null ? p.score : p.correct != null ? p.correct : p.c);
  return max > 0 && isFinite(sc) ? {c: Math.max(0, Math.min(max, sc)), n: max} : null;
}
/* raw result from finish() -> normalised skill result; `skill` picks Cambridge's official B2 First conversion
   (self-assessed Writing/Speaking % is read as marks out of 40 / 60) */
function convert(res, skill){
  if(!res || typeof res !== "object") return null;
  const d = SCALE_POINTS[skill];
  let pct, raw, scale;
  if(typeof res.selfScore === "number" && isFinite(res.selfScore)){
    pct = Math.max(0, Math.min(100, res.selfScore)); raw = {self: Math.round(pct)};
    scale = d ? scaleFor(skill, pct * d.max / 100, d.max) : cambridgeScale(pct);
  } else if(+res.total > 0){
    const n = +res.total, c = Math.max(0, Math.min(n, +res.correct || 0));
    pct = 100*c/n; raw = {c, n};
    scale = d ? scaleFor(skill, c, n) : cambridgeScale(pct);
    /* UoE Part 1 belongs to the Reading score in the real exam: keep it so officialSkills() can move it */
    if(skill === "uoe"){ const p1 = p1Of(res.details); if(p1 && p1.n < n) Object.assign(raw, {p1c: Math.min(p1.c, c), p1n: p1.n}); }
  } else return null;
  return Object.assign(raw, {pct: Math.round(pct), scale, grade: gradeFor(scale)});
}
/* skills as Cambridge reports them: Reading = Parts 1 + 5–7 (max 42), Use of English = Parts 2–4 (max 28) */
function officialSkills(sk){
  const out = Object.assign({}, sk), u = sk.uoe, r = sk.reading;
  if(u && u.n > 0 && u.p1n > 0 && u.p1n < u.n){
    const rest = convert({correct: u.c - u.p1c, total: u.n - u.p1n}, "uoe");
    if(rest) out.uoe = Object.assign(rest, {noP1: true});
    if(r && r.n > 0){
      const rr = convert({correct: r.c + u.p1c, total: r.n + u.p1n}, "reading");
      if(rr) out.reading = Object.assign(rr, {withP1: true});
    }
  }
  return out;
}
/* paper score: raw marks added up; scale = mean of the paper's skill scores */
function paperScore(paper, skills){
  const rs = paper.sections.map(s => skills[s]).filter(Boolean);
  if(!rs.length) return null;
  let pct;
  if(rs.every(r => r.n > 0)){ const c = rs.reduce((s,r) => s+r.c, 0), n = rs.reduce((s,r) => s+r.n, 0); pct = 100*c/n; }
  else pct = rs.reduce((s,r) => s+r.pct, 0)/rs.length;
  const scale = Math.round(rs.reduce((s,r) => s + r.scale, 0) / rs.length);
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
  att.scored = officialSkills(att.skills);
  PAPERS.forEach(p => { const s = paperScore(p, att.scored); if(s) att.papers[p.id] = s; });
  att.overall = overall(att.scored);
  return att;
}
const history = () => { const h = P.store.get(HIST, []); return Array.isArray(h) ? h.filter(a => a && typeof a === "object" && typeof a.id === "number") : []; };
function saveAttempt(att){
  if(!Object.keys(att.skills).length) return;
  const h = history().filter(a => a.id !== att.id); h.push(att); h.sort((a,b) => a.id - b.id);
  P.store.set(HIST, h.slice(-100));
}
const GRADE_NOTE = {"A (C1)":"Grade A – certifikát C1", "B":"Grade B – B2", "C (B2)":"Grade C – B2", "B1":"certifikát B1 (pod hranicí B2)", "pod B1":"bez certifikátu"};
const gradeNote = g => GRADE_NOTE[g] || g;

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
    head.querySelector(".mk-sec").textContent = (secs.length > 1 ? `Sekce ${idx+1}/${secs.length}: ` : "") + (id === "uoe" ? "Part 1–4" : id === "reading" ? "Part 5–7" : SKILLS[id]);
    body.innerHTML = ""; const box = document.createElement("div"); body.appendChild(box);
    window.scrollTo(0, 0);
    let called = false;
    const finish = res => {
      if(called || ended) return; called = true;
      const r = convert(res, id);
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
  const anyAll = PAPERS.every(p => paperAvail(p).length === p.sections.length);
  const allCount = PAPERS.filter(p => paperAvail(p).length).length;
  const totalMin = PAPERS.reduce((s,p) => s+p.minutes, 0);
  box.innerHTML = `<p>Simulace ostré zkoušky B2 First na čas. Výsledek se převede na <b>orientační</b> skóre Cambridge English Scale (${FLOOR}–${TOP}) podle oficiálních převodních bodů.</p>
    <div class="mk-papers">
      <div class="mk-paper full ${allCount ? "" : "off"}"><div class="mk-info"><b>Celá zkouška</b><small>Všechny 4 papers za sebou (~${Math.round(totalMin/60*10)/10} h) s pauzami mezi nimi${anyAll ? "" : allCount ? " · některé části zatím chybí a budou přeskočeny" : ""}</small></div>
        ${allCount ? `<button class="btn primary" data-run="full">Začít</button>` : `<span class="badge">zatím nedostupné</span>`}</div>
      ${PAPERS.map(p => { const av = paperAvail(p);
        const missing = p.sections.filter(s => !av.includes(s));
        return `<div class="mk-paper ${av.length ? "" : "off"}"><div class="mk-info"><b>${esc(p.name)}</b><small>${p.minutes} min · ${esc(p.blurb)}${av.length && missing.length ? ` · ${missing.map(s => SKILLS[s]).join(", ")} zatím nedostupné` : ""}</small></div>
          ${av.length ? `<button class="btn ghost" data-run="${p.id}">Spustit</button>` : `<span class="badge">zatím nedostupné</span>`}</div>`; }).join("")}
    </div>
    <p class="note">Tip: pusť si mock v klidu, bez telefonu a slovníku. Tlačítko <b>Ukončit</b> přeruší část – co jsi už odevzdal/a, se uloží. Formát a bodování najdeš v záložce <button class="link-btn" data-guide="1">O zkoušce</button>.</p>`;
  stage.appendChild(box);
  box.querySelectorAll("[data-run]").forEach(b => b.addEventListener("click", () => start(stage, b.dataset.run)));
  box.querySelector("[data-guide]").addEventListener("click", () => P.go("mock", "guide"));
}

function start(stage, kind){
  const att = {id: Date.now(), day: todayStr(), kind, skills: {}, papers: {}, overall: null};
  const queue = kind === "full" ? PAPERS.filter(p => paperAvail(p).length) : [paperById(kind)].filter(p => p && paperAvail(p).length);
  if(!queue.length){ P.toast("Tato část zatím není k dispozici."); return; }
  let i = 0;
  const runNext = () => {
    const paper = queue[i];
    runPaper(stage, paper, att, aborted => {
      i++;
      if(aborted || i >= queue.length) return report(stage, att);
      interstitial(stage, att, paper, queue[i], runNext);
    });
  };
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

/* self-assessed Writing / Speaking are shown as the marks they stand for (out of 40 / 60) */
const selfMarks = (r, k) => { const d = SCALE_POINTS[k]; return d ? `${Math.round(r.self * d.max / 10) / 10}/${d.max}` : `${r.self} %`; };
const marks = (r, k) => r.n > 0 ? `${r.c}/${r.n}` : selfMarks(r, k);
function scoreRows(att){
  const sk = att.scored || att.skills;
  return PAPERS.map(p => {
    const ps = att.papers[p.id];
    const raw = p.sections.filter(s => sk[s]).map(s => marks(sk[s], s)).join(" + ");
    return `<tr><td>${esc(p.name)}${ps && !ps.complete ? ` <span class="badge">neúplné</span>` : ""}</td><td class="num">${raw || "–"}</td><td class="num">${ps ? `<b>${ps.scale}</b>` : "–"}</td><td>${ps ? esc(gradeNote(ps.grade)) : "neabsolvováno"}</td></tr>`;
  }).join("");
}
function report(stage, att){
  examMode(false);
  summarize(att); saveAttempt(att);
  const o = att.overall, sk = att.scored || att.skills;
  stage.innerHTML = "";
  subTabs(stage, "");
  const box = document.createElement("section"); box.className = "sheet"; box.setAttribute("aria-live", "polite");
  const skillRows = Object.keys(SKILLS).map(k => { const r = sk[k]; return `<tr><td>${SKILL_FULL[k]}</td><td class="num">${r ? (r.n > 0 ? `${r.c}/${r.n} (${r.pct} %)` : `${selfMarks(r, k)} (sebehodnocení ${r.self} %)`) : "–"}</td><td class="num">${r ? r.scale : "–"}</td></tr>`; }).join("");
  const done = Object.keys(SKILLS).filter(k => sk[k]);
  const weakest = done.length > 1 ? done.slice().sort((a,b) => sk[a].scale - sk[b].scale)[0] : null;
  const p1Note = sk.uoe && sk.uoe.noP1 && !(sk.reading && sk.reading.withP1);
  box.innerHTML = `<p class="badge">Výsledek mocku · ${esc(att.day)}</p>
    ${o ? `<div class="mk-overall"><span class="mk-big">${o.scale}</span><span>${o.complete ? "celkové orientační skóre" : `průměr z ${o.count} ${o.count === 1 ? "dovednosti" : "dovedností"} (neúplná zkouška)`}<br><b>${esc(gradeNote(o.grade))}</b></span></div>`
      : `<p class="score">Bez výsledku</p><p>Žádná sekce nebyla dokončena.</p>`}
    ${weakest && P.modules[weakest] ? `<div class="mk-next"><p>Nejslabší dovednost v tomto mocku: <b>${esc(SKILLS[weakest])} – ${sk[weakest].scale}</b>.</p><button class="btn primary" data-goto="${esc(weakest)}">Procvičit ${esc(SKILLS[weakest])}</button></div>` : ""}
    <h2>Podle papers</h2>
    <div class="mk-wrap"><table class="mk-table"><thead><tr><th>Paper</th><th>Body</th><th>Scale</th><th>Úroveň</th></tr></thead><tbody>${scoreRows(att)}</tbody></table></div>
    <h2>Podle dovedností</h2>
    <div class="mk-wrap"><table class="mk-table"><thead><tr><th>Dovednost</th><th>Body</th><th>Scale</th></tr></thead><tbody>${skillRows}</tbody></table></div>
    ${p1Note ? `<p class="note">Body z Use of English Part 1 se v ostré zkoušce počítají do Readingu. Reading (Part 5–7) jsi v tomto mocku nedokončil/a, proto Use of English ukazuje jen Part 2–4.</p>` : ""}
    <p class="mk-disc">Převod je jen <b>přibližný</b>: Cambridge převádí body na škálu podle obtížnosti konkrétní verze testu a hranice se mezi termíny mírně liší. Writing a Speaking jsou založené na tvém sebehodnocení (Writing = body ze 40, Speaking = body ze 60). Celkové skóre = průměr pěti dovedností (Reading, Use of English, Writing, Listening, Speaking), stejně jako na Statement of Results.</p>
    <div class="row"><button class="btn primary" data-act="again">Další mock</button><button class="btn ghost" data-act="hist">Historie a trend</button><button class="btn ghost" data-act="home">Na přehled</button></div>`;
  stage.appendChild(box);
  box.querySelector('[data-act="again"]').addEventListener("click", () => { if((location.hash.split("/")[2] || "") === "") P.show("mock"); else P.go("mock"); });
  box.querySelector('[data-act="hist"]').addEventListener("click", () => P.go("mock", "history"));
  box.querySelector('[data-act="home"]').addEventListener("click", () => P.go("home"));
  const g = box.querySelector("[data-goto]"); if(g) g.addEventListener("click", () => P.go(g.dataset.goto));
  window.scrollTo(0, 0);
}

/* attempt -> single headline score for the trend: overall if any */
const headline = a => a && a.overall && typeof a.overall.scale === "number" ? a.overall.scale : null;
function trendSVG(h){
  const pts = h.filter(a => headline(a) != null);
  if(!pts.length) return "";
  const W = 360, H = 190, L = 30, R = 30, T = 14, B = 24;
  const lo = 120, hi = TOP;
  const x = i => pts.length === 1 ? L + (W-L-R)/2 : L + i*(W-L-R)/(pts.length-1);
  const y = v => T + (hi - Math.max(lo, Math.min(hi, v)))*(H-T-B)/(hi-lo);
  const refs = [[140,"B1"],[160,"B2"],[180,"C1 (A)"]];
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
  const scores = h.map(headline).filter(v => v != null);
  const best = scores.length ? Math.max(...scores) : null;
  const lastS = headline(h[h.length-1]);
  box.innerHTML = `<h2 style="margin-top:0">Vývoj skóre</h2>
    <div class="grid"><div class="stat"><b>${h.length}</b><span>mocků celkem</span></div><div class="stat"><b>${best == null ? "–" : best}</b><span>nejlepší skóre</span></div><div class="stat"><b>${lastS == null ? "–" : lastS}</b><span>poslední</span></div></div>
    ${trendSVG(h)}
    <p class="note">Plný bod = celá zkouška, prázdný = jen některé papers. Čáry 140 / 160 / 180 = hranice B1 / B2 (úspěch) / grade A s certifikátem C1.</p>
    <h2>Historie</h2>
    <div class="mk-wrap"><table class="mk-table"><thead><tr><th>Datum</th><th>Typ</th>${PAPERS.map(p => `<th>${esc(p.id === "rue" ? "R&UoE" : p.name)}</th>`).join("")}<th>Celkem</th></tr></thead>
    <tbody>${h.slice().reverse().map(a => `<tr><td class="num">${esc(a.day||"")}</td><td>${a.kind === "full" ? "celá" : esc(((paperById(a.kind)||{}).name)||a.kind||"")}</td>${PAPERS.map(p => `<td class="num">${a.papers && a.papers[p.id] && a.papers[p.id].scale != null ? esc(a.papers[p.id].scale) : "–"}</td>`).join("")}<td class="num"><b>${headline(a) == null ? "–" : headline(a)}</b></td></tr>`).join("")}</tbody></table></div>
    <button class="btn ghost" data-act="clear">Smazat historii mocků</button>`;
  stage.appendChild(box);
  box.querySelector('[data-act="clear"]').addEventListener("click", () => { if(confirm("Smazat celou historii mock testů B2 First?")){ P.store.del(HIST); P.show("mock", true); } });
}

/* ---------------------------------------------------------------- exam guide (Czech) */
/* rue rows: [part, task, description, questions, marks per question, skill it counts towards] */
const GUIDE = {
  rue: [
    [1,"Multiple-choice cloze","text s 8 mezerami, 4 možnosti A–D (kolokace, frázová slovesa, pevná spojení, význam slov)",8,1,"reading"],
    [2,"Open cloze","text s 8 mezerami, doplň 1 slovo (předložky, členy, spojky, zájmena, pomocná slovesa)",8,1,"uoe"],
    [3,"Word formation","text s 8 mezerami, utvoř správný tvar ze slova psaného VELKÝMI PÍSMENY",8,1,"uoe"],
    [4,"Key word transformation","přepiš větu tak, aby měla stejný význam: 2–5 slov včetně klíčového slova, které nesmíš změnit",6,2,"uoe"],
    [5,"Multiple choice","delší text, 6 otázek se 4 možnostmi A–D (detail, názor, postoj, význam slova)",6,2,"reading"],
    [6,"Gapped text","z článku je vyjmuto 6 vět, doplň je ze 7 vět A–G (jedna přebývá)",6,2,"reading"],
    [7,"Multiple matching","jeden text rozdělený do sekcí nebo několik krátkých textů, 10 výroků k přiřazení",10,1,"reading"]
  ],
  listening: [
    [1,"Multiple choice","8 krátkých nesouvisejících úryvků (monolog nebo dialog), ke každému 1 otázka se 3 možnostmi A–C",8,1],
    [2,"Sentence completion","monolog (~3 min), doplň 10 vět 1–3 slovy přesně tak, jak zazní",10,1],
    [3,"Multiple matching","5 krátkých monologů na stejné téma, ke každému mluvčímu vyber 1 z 8 možností A–H (3 přebývají)",5,1],
    [4,"Multiple choice","interview nebo rozhovor (~3–4 min), 7 otázek se 3 možnostmi A–C",7,1]
  ],
  speaking: [
    [1,"Interview","zkoušející se ptá na tebe – škola, práce, volný čas, plány, zájmy",2],
    [2,"Long turn","1 min srovnáš 2 fotky a odpovíš na otázku nad nimi; pak asi 30 s reaguješ na fotky partnera",4],
    [3,"Collaborative task","s partnerem diskutuješ nad otázkou s 5 podněty (2 min), pak se musíte dohodnout (1 min)",4],
    [4,"Discussion","širší otázky navazující na téma Part 3, odpovídáš sám i reaguješ na partnera",4]
  ],
  writing: [
    [1,"Essay (povinná)","otázka + 2 poznámky (notes) ze zadání + tvůj vlastní nápad; musíš pokrýt všechny tři body",140,190],
    [2,"Article / email / letter / report / review (výběr 1 ze 3)","útvar s jasným čtenářem a účelem: článek do časopisu, email nebo dopis (formální i neformální), report, recenze",140,190]
  ]
};
/* recommended Reading & Use of English timing (75 min) */
const TIMING = [["Part 1",6],["Part 2",7],["Part 3",7],["Part 4",10],["Part 5",14],["Part 6",12],["Part 7",12],["kontrola a přepis",7]];
const GRADE_ROWS = () => {
  const gs = (P.scale && P.scale.grades) || [], rows = [];
  let hi = TOP;
  gs.forEach(([min, label]) => { rows.push([min, hi, label]); hi = min - 1; });
  rows.push([FLOOR, hi, null]);
  return rows;
};
const GRADE_DESC = {"A (C1)":"<b>Grade A</b> – certifikát s úrovní <b>C1</b>", "B":"<b>Grade B</b> – B2", "C (B2)":"<b>Grade C</b> – B2 (160 = hranice úspěchu)",
  "B1":"neuspěl/a na B2, ale získáš certifikát úrovně <b>B1</b>"};
function renderGuide(stage){
  const sumQ = GUIDE.rue.reduce((s,r) => s+r[3], 0), sumM = GUIDE.rue.reduce((s,r) => s+r[3]*r[4], 0);
  const skM = k => GUIDE.rue.filter(r => r[5] === k).reduce((s,r) => s+r[3]*r[4], 0);
  const lq = GUIDE.listening.reduce((s,r) => s+r[3], 0), sMin = GUIDE.speaking.reduce((s,r) => s+r[3], 0);
  const box = document.createElement("section"); box.className = "sheet cheat mk-guide";
  box.innerHTML = `<h2 style="margin-top:0">O zkoušce B2 First (FCE)</h2>
  <p>B2 First má <b>4 papers</b> (5 hodnocených dovedností). Reading &amp; Use of English, Writing a Listening se píšou v jeden den, Speaking může být ve stejný den nebo v jiném termínu. Zkouška existuje v papírové i počítačové verzi – formát úloh je stejný. Je určená pro úroveň <b>B2</b>; s výborným výsledkem získáš certifikát <b>C1</b>, s horším aspoň <b>B1</b>.</p>
  <div class="mk-wrap"><table><thead><tr><th>Paper</th><th>Čas</th><th>Obsah</th><th>Váha</th></tr></thead><tbody>
    <tr><td>Reading &amp; Use of English</td><td class="num">1 h 15 min</td><td>${GUIDE.rue.length} částí, ${sumQ} otázek, ${sumM} bodů</td><td>40 % (2 dovednosti)</td></tr>
    <tr><td>Writing</td><td class="num">1 h 20 min</td><td>2 úlohy, 140–190 slov každá</td><td>20 %</td></tr>
    <tr><td>Listening</td><td class="num">cca 40 min</td><td>4 části, ${lq} otázek</td><td>20 %</td></tr>
    <tr><td>Speaking</td><td class="num">${sMin} min</td><td>4 části, ve dvojici, 2 zkoušející</td><td>20 %</td></tr></tbody></table></div>

  <details open><summary>Reading &amp; Use of English – body za části</summary><div class="body">
    <div class="mk-wrap"><table><thead><tr><th>Část</th><th>Úloha</th><th>Otázek</th><th>Bodů</th></tr></thead><tbody>
    ${GUIDE.rue.map(r => `<tr><td>${r[0]}</td><td><b>${r[1]}</b> <span class="badge" title="počítá se do této dovednosti">${r[5] === "reading" ? "Reading" : "Use of English"}</span><br><span class="note">${r[2]}</span></td><td class="num">${r[3]}</td><td class="num">${r[3]*r[4]}<br><span class="note">${r[4]}/otázka</span></td></tr>`).join("")}
    <tr><td></td><td><b>Celkem</b></td><td class="num"><b>${sumQ}</b></td><td class="num"><b>${sumM}</b></td></tr></tbody></table></div>
    <p><b>Reading</b> = Part 1 + 5–7 (max ${skM("reading")} bodů), <b>Use of English</b> = Part 2–4 (max ${skM("uoe")} bodů). Part 1 je sice v úlohách „Use of English“, ale Cambridge ji počítá do Readingu.</p>
    <p>Za Part 5 a Part 6 jsou <b>2 body</b> za otázku. V Part 4 dostaneš za každou větu 0, 1 nebo 2 body (každá ze dvou „půlek“ transformace je za 1 bod). Pravopis musí být v Part 2, 3 a 4 správně.</p></div></details>

  <details><summary>Writing – úlohy a hodnocení</summary><div class="body">
    <div class="mk-wrap"><table><thead><tr><th>Část</th><th>Úloha</th><th>Slov</th></tr></thead><tbody>
    ${GUIDE.writing.map(r => `<tr><td>${r[0]}</td><td><b>${r[1]}</b><br><span class="note">${r[2]}</span></td><td class="num">${r[3]}–${r[4]}</td></tr>`).join("")}</tbody></table></div>
    <p><b>Part 1 – Essay:</b> obvykle pro učitele angličtiny. Zadání obsahuje otázku a dvě poznámky; ty k nim přidáš <b>vlastní nápad</b> (třetí bod). Všechny tři body musí být v textu jasně rozvedené a esej má mít úvod a závěr s tvým názorem.</p>
    <p><b>Part 2:</b> vybereš 1 ze 3 úloh – <b>article</b> (článek, zaujmi čtenáře, klidně otázkou v nadpisu), <b>email / letter</b> (formální nebo neformální podle adresáta), <b>report</b> (nadpisy, fakta, doporučení) nebo <b>review</b> (popis, hodnocení, doporučení).</p>
    <p>Každá úloha se hodnotí 4 kritérii po 0–5 bodech: <b>Content</b> (splnění zadání), <b>Communicative Achievement</b> (registr, formát, účinek na čtenáře), <b>Organisation</b> (struktura, odstavce, spojovací výrazy) a <b>Language</b> (rozsah a přesnost slovní zásoby a gramatiky). Celkem 2 × 20 = 40 bodů.</p></div></details>

  <details><summary>Listening – části</summary><div class="body">
    <div class="mk-wrap"><table><thead><tr><th>Část</th><th>Úloha</th><th>Otázek</th></tr></thead><tbody>
    ${GUIDE.listening.map(r => `<tr><td>${r[0]}</td><td><b>${r[1]}</b><br><span class="note">${r[2]}</span></td><td class="num">${r[3]}</td></tr>`).join("")}
    <tr><td></td><td><b>Celkem</b></td><td class="num"><b>${lq}</b></td></tr></tbody></table></div>
    <p>Každou nahrávku slyšíš <b>dvakrát</b>, každá otázka je za 1 bod (max ${lq}). V papírové verzi máš na konci 5 minut na přepsání odpovědí do answer sheetu.</p></div></details>

  <details><summary>Speaking – části a hodnocení</summary><div class="body">
    <div class="mk-wrap"><table><thead><tr><th>Část</th><th>Úloha</th><th>Min</th></tr></thead><tbody>
    ${GUIDE.speaking.map(r => `<tr><td>${r[0]}</td><td><b>${r[1]}</b><br><span class="note">${r[2]}</span></td><td class="num">${r[3]}</td></tr>`).join("")}
    <tr><td></td><td><b>Celkem</b></td><td class="num"><b>${sMin}</b></td></tr></tbody></table></div>
    <p>Zkouška probíhá ve dvojici (výjimečně ve trojici, pak trvá déle). Hodnotitel (assessor) sleduje <b>Grammar and Vocabulary, Discourse Management, Pronunciation</b> a <b>Interactive Communication</b>; zkoušející, který s vámi mluví (interlocutor), dává celkový dojem (<b>Global Achievement</b>). Celkem max 60 bodů.</p></div></details>

  <details open><summary>Cambridge English Scale – jak se počítá výsledek</summary><div class="body">
    <p>Body z každé dovednosti se převedou na <b>Cambridge English Scale</b>. Dostaneš 5 dílčích skóre (Reading, Use of English, Writing, Listening, Speaking) a <b>celkové skóre = jejich průměr</b>. Každá dovednost má tedy váhu 20 % – Reading a Use of English jsou v jednom paperu, a tvoří proto dohromady 40 %.</p>
    <div class="mk-wrap"><table><thead><tr><th>Skóre</th><th>Výsledek</th></tr></thead><tbody>
      ${GRADE_ROWS().map(([lo, hi, g]) => `<tr><td class="num">${lo}–${hi}</td><td>${g ? (GRADE_DESC[g] || esc(g)) : "bez certifikátu (skóre se uvede jen na Statement of Results)"}</td></tr>`).join("")}</tbody></table></div>
    <p>Na úspěch nepotřebuješ projít každou část – rozhoduje průměr. Slabší Listening tak může vyrovnat silný Writing. Převod v této aplikaci používá <b>oficiální referenční body Cambridge</b> pro cvičné testy B2 First (mezi nimi lineárně, maximum bodů = ${TOP}):</p>
    <div class="mk-wrap"><table><thead><tr><th>Dovednost</th><th>Max</th><th>140 (B1)</th><th>160 (B2)</th><th>180 (C1)</th></tr></thead><tbody>
      ${Object.keys(SKILL_FULL).map(k => SCALE_POINTS[k] ? `<tr><td>${SKILL_FULL[k]}</td><td class="num">${SCALE_POINTS[k].max}</td>${SCALE_POINTS[k].pts.map(p => `<td class="num">${p[0]}</td>`).join("")}</tr>` : "").join("")}</tbody></table></div>
    <p class="note">Příklad: 24 bodů ze 42 v Readingu = 160, 37 ze 42 = 180. Úlohy v portálu jsou ale vlastní, ne oficiální, a Writing/Speaking si hodnotíš sám – výsledek je proto jen odhad. Nejpřesnější kontrolu dají <a href="https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/preparation/" target="_blank" rel="noopener">oficiální ukázkové testy Cambridge</a> (zdarma, se skutečnými nahrávkami).</p></div></details>

  <details open><summary>Oficiální materiály Cambridge</summary><div class="body">
    <ul>
      <li><a href="https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/preparation/" target="_blank" rel="noopener">Příprava na B2 First</a> – ukázkové testy všech částí zdarma (Reading &amp; Use of English, Writing, Listening s audiem, Speaking).</li>
      <li><a href="https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/format/" target="_blank" rel="noopener">Formát zkoušky B2 First</a> – oficiální popis částí, časů a bodování.</li>
      <li><a href="https://www.cambridgeenglish.org/Images/210434-converting-practice-test-scores-to-cambridge-english-scale-scores.pdf" target="_blank" rel="noopener">Převod bodů z cvičných testů na Cambridge English Scale</a> (PDF).</li>
      <li>Placené sbírky skutečných testů: <i>B2 First Authentic Practice Tests</i> (Cambridge University Press &amp; Assessment).</li>
    </ul>
    <p class="note">Portál je trénink formátu a dovedností s vlastními úlohami. Před zkouškou si udělej aspoň jeden oficiální test na čas.</p></div></details>

  <details><summary>B2 vs C1 – v čem je rozdíl</summary><div class="body">
    <div class="mk-wrap"><table><thead><tr><th></th><th>B2 First</th><th>C1 Advanced</th></tr></thead><tbody>
      <tr><td>Reading &amp; UoE</td><td>75 min, 7 částí, 52 otázek</td><td>90 min, 8 částí, 56 otázek</td></tr>
      <tr><td>Key word transformation</td><td>2–5 slov</td><td>3–6 slov</td></tr>
      <tr><td>Reading</td><td>gapped text s vyjmutými <b>větami</b>; bez cross-text matchingu</td><td>gapped text s vyjmutými <b>odstavci</b> + cross-text matching (4 autoři)</td></tr>
      <tr><td>Writing</td><td>80 min, 2 × 140–190 slov; esej: 2 body + vlastní nápad; Part 2: article, email/letter, report, review</td><td>90 min, 2 × 220–260 slov; esej: vybereš 2 ze 3 bodů; Part 2: letter/email, proposal, report, review</td></tr>
      <tr><td>Listening</td><td>8 krátkých úryvků po 1 otázce, 10 vět, 5 mluvčích (1 úloha), interview 7 otázek</td><td>3 úryvky po 2 otázkách, 8 vět, rozhovor 6 otázek, 5 mluvčích (2 úlohy)</td></tr>
      <tr><td>Speaking</td><td>14 min, srovnání 2 fotek</td><td>15 min, výběr 2 ze 3 fotek</td></tr>
      <tr><td>Škála</td><td>122–190, úspěch od 160, grade A (180+) = C1</td><td>142–210, úspěch od 180, grade A (200+) = C2</td></tr></tbody></table></div>
    <p>Texty v B2 First jsou kratší a o běžných tématech (škola, práce, cestování, sport, technologie, volný čas), slovní zásoba je převážně do úrovně B2 a gramatika „klasická“ – časy, podmínkové věty, trpný rod, nepřímá řeč, frázová slovesa. C1 čeká víc idiomů, abstraktnější texty a jemnější rozdíly ve významu.</p>
    <p>Kdy jít rovnou na C1? Pokud v mock testech B2 First pravidelně dosahuješ <b>180+</b> ve všech dovednostech, zvaž C1 Advanced – přepneš se tlačítkem <b>C1</b> nahoře nebo <a href="/?c1">zde</a>. Postup v B2 a C1 je oddělený, nic se nesmíchá.</p></div></details>

  <details><summary>Time management</summary><div class="body">
    <p><b>Reading &amp; Use of English (75 min)</b> – doporučené rozvržení:</p>
    <table><tbody>${TIMING.map(([p,m]) => `<tr><td>${p}</td><td class="num">${m} min</td></tr>`).join("")}</tbody></table>
    <p>Odpovědi zapisuj rovnou do answer sheetu – na přepis není čas navíc. Když se zasekneš, tipni si, označ otázku a jdi dál.</p>
    <p><b>Writing (80 min)</b> – na každou úlohu 40 min: 5 min plán (odstavce, hlavní body, u eseje vlastní nápad), 28–30 min psaní, 5 min kontrola (počet slov, časy, členy, shoda, pravopis).</p>
    <p><b>Listening</b> – využij čas před každou částí na přečtení otázek a podtržení klíčových slov; při druhém poslechu ověřuj.</p>
    <p><b>Speaking</b> – v Part 2 mluv celou minutu (zkoušející tě přeruší), v Part 3 nečekej na „správnou“ odpověď, jde o rozhovor a dohodu s partnerem.</p></div></details>

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
    <li>Ve Writing si nejdřív podtrhni všechny body zadání (u eseje obě poznámky) a napiš si, jaký bude tvůj vlastní nápad.</li>
    <li>Ve Speaking mluv na partnera, ne jen ke zkoušejícímu; když něčemu nerozumíš, požádej o zopakování („Could you repeat the question, please?“).</li>
    <li>Po každém paperu ho „zavři“ v hlavě – na celkový výsledek má vliv průměr, jedna horší část nic nekončí.</li></ul></div></details>

  <details><summary>Časté chyby</summary><div class="body"><ul>
    <li><b>UoE Part 1:</b> slovo „sedí“ významem, ale ne kolokací (make/do, say/tell, rise/raise) – čti i slova za mezerou (předložka!).</li>
    <li><b>UoE Part 4:</b> změněné klíčové slovo, víc než 5 slov (zkrácené tvary jako don't nebo it's se počítají jako dvě slova), nebo posunutý význam věty.</li>
    <li><b>UoE Part 2 a 3, Listening Part 2:</b> pravopisné chyby – i drobný překlep znamená 0 bodů.</li>
    <li><b>UoE Part 3:</b> přehlédnutý zápor (un-/in-/dis-/-less), množné číslo nebo špatný slovní druh.</li>
    <li><b>Reading Part 5 a 7:</b> volba možnosti jen proto, že obsahuje stejné slovo jako text.</li>
    <li><b>Reading Part 6:</b> věta sedí na text před mezerou, ale ne na text za ní – kontroluj obě strany (zájmena, this/these, however).</li>
    <li><b>Writing:</b> v eseji chybí vlastní nápad nebo jeden z bodů, špatný registr (neformální email vs. formální dopis), report bez nadpisů, review bez doporučení, text výrazně mimo 140–190 slov.</li>
    <li><b>Listening Part 1 a 3:</b> odpověď podle prvního slova, které zazní – mluvčí často něco zmíní a pak to odmítne.</li>
    <li><b>Speaking:</b> popis fotek místo srovnání, nezodpovězená otázka nad fotkami, v Part 3 monolog místo diskuse nebo žádné rozhodnutí na konci.</li></ul></div></details>
  <p class="note" style="margin-top:14px">Informace odpovídají současnému formátu B2 First. Organizační detaily (pravidla místnosti, časy, verze na počítači) si před zkouškou ověř u svého zkouškového centra.</p>`;
  stage.appendChild(box);
}

/* ---------------------------------------------------------------- register */
P.register({
  id:"mock", title:"Mock test", short:"Mock test", blurb:"Simulace celé zkoušky B2 First na čas s odhadem skóre",
  render(stage, ctx){
    examMode(false);
    const sub = (ctx && ctx.sub) || "";
    const active = sub === "history" || sub === "guide" ? sub : "";
    subTabs(stage, active);
    if(active === "history") renderHistory(stage);
    else if(active === "guide") renderGuide(stage);
    else renderPicker(stage);
  },
  /* exposed for scripts/check-b2-mock.js */
  _internal:{convert, officialSkills, paperScore, overall, summarize, PAPERS, GUIDE, TIMING, GRADE_ROWS, trendSVG, gradeNote}
});
})();
