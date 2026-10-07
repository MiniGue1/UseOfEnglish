/* Dashboard ("Přehled"), study plan, ⚙ tools (theme, backup/restore, wipe), service-worker registration.
   Loads right after core.js and replaces core's minimal home by registering id "home" again
   (order stays first because core registered "home" first). */
(function(){
"use strict";
const P = window.Portal; if(!P) return;
const {esc, todayStr, DAY} = P.util;

/* ---------------------------------------------------------------- styles */
const css = `
.hm-hero{display:flex;flex-wrap:wrap;gap:6px 18px;align-items:baseline;margin:0 0 14px}
.hm-hero .hm-count{font-size:clamp(40px,10vw,52px);font-weight:600;line-height:1;font-variant-numeric:tabular-nums}
.hm-hero span{color:var(--muted)}
.hm-sec{margin:0 0 22px}
.hm-sec>h2{margin-top:0}
.hm-tasks{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.hm-tasks li{display:flex;gap:12px;align-items:center;border:1px solid var(--rule);border-radius:8px;padding:10px 14px;background:var(--sheet)}
.hm-tasks li.done{opacity:.65}
.hm-tasks .hm-min{flex:none;font-variant-numeric:tabular-nums;font-weight:600;min-width:5ch}
.hm-tasks .hm-what{flex:1;min-width:0}
.hm-tasks .hm-what small{display:block;color:var(--muted);font-size:13.5px}
.hm-tasks .btn{min-height:38px;padding:0 14px;font-size:15px}
.hm-weak{border-left:3px solid var(--red);padding:4px 0 4px 14px;margin:0 0 12px}
.hm-weak p{margin:0 0 8px}
.hm-strip{display:grid;grid-template-columns:repeat(14,1fr);gap:2px;align-items:end;height:84px;border-bottom:1px solid var(--rule)}
.hm-strip i{display:block;background:var(--ink);border-radius:4px 4px 0 0;min-height:0;opacity:.85}
.hm-strip i.zero{background:transparent}
.hm-strip i.today{opacity:1;background:var(--green)}
.hm-strip-l{display:grid;grid-template-columns:repeat(14,1fr);gap:2px;font-size:11.5px;color:var(--muted);text-align:center;margin-top:4px;font-variant-numeric:tabular-nums}
.hm-cats .cat{cursor:pointer;background:none;border:0;padding:0;font:inherit;color:inherit;text-align:left;width:100%}
.hm-empty{color:var(--muted);font-size:15px}
.hm-plan-form{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin:0 0 14px}
.hm-plan-form label{display:grid;gap:4px;font-size:14px;color:var(--muted)}
.hm-week{display:grid;gap:8px}
.hm-day{border:1px solid var(--rule);border-radius:8px;padding:10px 14px;background:var(--sheet)}
.hm-day.today{border-color:var(--ink)}
.hm-day h3{margin:0 0 6px;font-size:15px;font-weight:600;display:flex;justify-content:space-between;gap:10px}
.hm-day ul{margin:0;padding:0;list-style:none}
.hm-day li{margin:3px 0;display:flex;gap:10px;align-items:baseline}
.hm-day .hm-m{flex:none;min-width:6ch;color:var(--muted);font-size:14px;font-variant-numeric:tabular-nums}
.hm-day .link-btn,.hm-weak .link-btn,.note .link-btn{text-align:left;display:inline;font-size:15px}
.hm-alloc{display:grid;gap:10px;margin:0 0 18px}
/* tools menu */
.topbar .tools{position:relative}
.hm-gear{appearance:none;background:none;border:1.5px solid var(--rule);color:var(--ink);border-radius:20px;min-width:40px;min-height:40px;font-size:18px;cursor:pointer}
.hm-gear:hover{border-color:var(--ink)}
.hm-menu{position:absolute;right:0;top:calc(100% + 6px);z-index:40;background:var(--sheet);border:1px solid var(--rule);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.18);padding:8px;min-width:230px;display:grid;gap:4px}
.hm-menu[hidden]{display:none}
.hm-menu button{appearance:none;background:none;border:0;text-align:left;font:inherit;color:var(--ink);padding:9px 10px;border-radius:6px;cursor:pointer}
.hm-menu button:hover,.hm-menu button:focus-visible{background:var(--soft)}
.hm-menu .hm-theme{display:flex;gap:4px;padding:4px 2px 8px;border-bottom:1px solid var(--rule);margin-bottom:4px}
.hm-menu .hm-theme button{flex:1;text-align:center;border:1.5px solid var(--rule);font-size:14px;padding:6px 4px}
.hm-menu .hm-theme button[aria-pressed="true"]{background:var(--ink);color:var(--paper);border-color:var(--ink)}
.hm-menu .danger{color:var(--red)}
.hm-dlg{border:1px solid var(--rule);border-radius:10px;background:var(--sheet);color:var(--ink);padding:20px 22px;max-width:min(440px,92vw)}
.hm-dlg::backdrop{background:rgba(0,0,0,.45)}
.hm-dlg h3{margin:0 0 8px;font-family:var(--serif);font-weight:500;font-size:22px}
.hm-dlg p{margin:0 0 12px;font-size:15px}
`;
const st = document.createElement("style"); st.id = "hm-style"; st.textContent = css; document.head.appendChild(st);

/* ---------------------------------------------------------------- theme */
const THEME_COLORS = {light:"#16213A", dark:"#0E1320"};
function applyTheme(mode){
  const root = document.documentElement;
  if(mode === "dark" || mode === "light") root.setAttribute("data-theme", mode); else root.removeAttribute("data-theme");
  const dark = mode === "dark" || (mode !== "light" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const m = document.querySelector('meta[name="theme-color"]'); if(m) m.setAttribute("content", dark ? THEME_COLORS.dark : THEME_COLORS.light);
}
applyTheme(P.store.get("theme", "auto"));

/* ---------------------------------------------------------------- exam knowledge */
const MOD_NAMES = {uoe:"Use of English", reading:"Reading", listening:"Listening", writing:"Writing", speaking:"Speaking", vocab:"Slovní zásoba", mock:"Mock test"};
const PAPER_OF = {uoe:"rue", reading:"rue", writing:"writing", listening:"listening", speaking:"speaking", vocab:"vocab"};
const PAPERS = {
  rue:{name:"Reading & Use of English", mods:["uoe","reading"], base:.32},
  writing:{name:"Writing", mods:["writing"], base:.2},
  listening:{name:"Listening", mods:["listening"], base:.2},
  speaking:{name:"Speaking", mods:["speaking"], base:.14},
  vocab:{name:"Slovní zásoba", mods:["vocab"], base:.14}
};
/* key "<module>:<part number>" -> name, exam minutes, practical next step */
const PART_INFO = {
  "uoe:1":{n:"Multiple-choice cloze", min:8, tip:"projdi 1 cvičení a u každé chyby si zapiš celou kolokaci (např. „draw a conclusion“) do slovníčku."},
  "uoe:2":{n:"Open cloze", min:8, tip:"zaměř se na „malá“ slova – předložky, spojky, vztažná zájmena a části pevných frází; před doplněním si přečti celou větu."},
  "uoe:3":{n:"Word formation", min:8, tip:"u každé mezery nejdřív urči slovní druh, pak zvaž zápor (un-, in-, dis-) a množné číslo."},
  "uoe:4":{n:"Key word transformation", min:12, tip:"trénuj pasivum, inverzi, nepřímou řeč a idiomy; klíčové slovo neměň a drž se 3–6 slov."},
  "reading:5":{n:"Multiple choice", min:18, tip:"čti nejdřív otázku, najdi v textu přesnou pasáž a odpověď si potvrď důkazem; distraktory často obsahují stejná slova jako text."},
  "reading:6":{n:"Cross-text multiple matching", min:12, tip:"u každého ze 4 textů si do okraje zapiš postoj autora (souhlas / nesouhlas / výhrada) ke každému tématu."},
  "reading:7":{n:"Gapped text", min:15, tip:"sleduj zájmena, spojovací výrazy a odkazy (this, such, however) na začátku i konci odstavců."},
  "reading:8":{n:"Multiple matching", min:15, tip:"otázky jsou parafráze – hledej myšlenku, ne stejná slova; skenuj sekce a ověřuj detail."},
  "listening:1":{n:"Multiple choice (krátké úryvky)", min:8, tip:"před poslechem si podtrhni klíčová slova v otázce a čekej na postoj mluvčího, ne na fakta."},
  "listening:2":{n:"Sentence completion", min:8, tip:"zapisuj přesně slova, která zazní (1–3 slova), a kontroluj pravopis a gramatickou návaznost věty."},
  "listening:3":{n:"Multiple choice (rozhovor)", min:10, tip:"sleduj, kdo co říká a jaký má názor; správná odpověď bývá parafrází, ne citací."},
  "listening:4":{n:"Multiple matching", min:8, tip:"poslouchej obě úlohy najednou – při prvním poslechu jednu, při druhém ověř druhou."},
  "writing:1":{n:"Essay", min:45, tip:"napiš esej 220–260 slov k zadání se dvěma body; jasně vyber, který bod je důležitější, a zdůvodni to."},
  "writing:2":{n:"Volitelný útvar (letter / proposal / report / review)", min:45, tip:"natrénuj formát a registr jednoho útvaru (nadpisy u reportu a proposalu, oslovení u dopisu)."},
  "speaking:1":{n:"Interview", min:2, tip:"odpovídej 2–3 větami s důvodem nebo příkladem, ne jedním slovem."},
  "speaking:2":{n:"Long turn", min:4, tip:"1 minuta srovnávání dvou fotek + odpověď na obě otázky; nepopisuj, spekuluj (might, could, seems)."},
  "speaking:3":{n:"Collaborative task", min:4, tip:"procvič fráze pro zapojení partnera a vyjednávání („What's your take on…?“, „Shall we go for…?“)."},
  "speaking:4":{n:"Discussion", min:5, tip:"rozvíjej názory: tvrzení → důvod → příklad → protiargument."}
};
const modTitle = id => (P.modules[id] && P.modules[id].title) || MOD_NAMES[id] || id;
const modShort = id => MOD_NAMES[id] || (P.modules[id] && (P.modules[id].short || P.modules[id].title)) || id;
const partNum = p => { const m = String(p == null ? "" : p).match(/\d+/); return m ? +m[0] : null; };
function partLabel(m, p){
  if(p == null || p === "") return modShort(m);
  const n = partNum(p);
  if(n != null && /^(p|part|cast|část)?\s*-?\d+$/i.test(String(p))) {
    const info = PART_INFO[m+":"+n];
    return modShort(m)+" Part "+n+(info ? " – "+info.n : "");
  }
  return modShort(m)+" – "+String(p);
}
function partSub(p){
  if(p == null || p === "") return null;
  const s = String(p);
  if(/^part\d+$/i.test(s)) return s.toLowerCase();
  if(/^(p|cast|část)?\s*-?\d+$/i.test(s)) return "part"+partNum(s);
  return s;
}
function tipFor(m, p){
  const n = partNum(p), info = PART_INFO[m+":"+n];
  if(info) return info.tip;
  if(m === "vocab") return "zopakuj dnešní kartičky ve slovní zásobě a nová slova použij ve vlastní větě.";
  return "udělej jednu krátkou sadu z této části a u každé chyby si přečti vysvětlení.";
}

/* ---------------------------------------------------------------- activity analytics */
const activity = () => { const a = P.store.get("activity", []); return Array.isArray(a) ? a.filter(x => x && typeof x === "object") : []; };
const pctOf = (c, n) => n > 0 ? Math.round(100*c/n) : null;
function groupParts(log, sinceDays){
  const since = sinceDays ? Date.now() - sinceDays*DAY : 0, g = {};
  log.forEach(a => {
    if(!a.m || a.m === "mock" || a.mock || !(a.n > 0) || (a.t||0) < since) return;
    const key = a.m+"|"+(a.p == null ? "" : a.p);
    const e = g[key] || (g[key] = {m:a.m, p:a.p, c:0, n:0, sets:0, last:0});
    e.c += Math.max(0, +a.c||0); e.n += +a.n; e.sets++; e.last = Math.max(e.last, a.t||0);
  });
  return Object.values(g).map(e => Object.assign(e, {pct:pctOf(e.c, e.n)}));
}
function weakSpots(log){
  let g = groupParts(log, 60); if(!g.length) g = groupParts(log, 0);
  return g.filter(e => e.n >= 5).sort((a,b) => a.pct - b.pct || b.n - a.n);
}
function paperAccuracy(log){
  const out = {};
  groupParts(log, 60).forEach(e => { const k = PAPER_OF[e.m]; if(!k) return; const o = out[k] || (out[k] = {c:0,n:0}); o.c += e.c; o.n += e.n; });
  Object.keys(out).forEach(k => out[k].pct = pctOf(out[k].c, out[k].n));
  return out;
}
function daysUntil(dateStr){
  if(!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;
  const [y,m,d] = dateStr.split("-").map(Number), t = new Date(y, m-1, d), now = new Date(); now.setHours(0,0,0,0);
  return Math.round((t - now)/DAY);
}
const dayWord = n => n === 1 ? "den" : (n >= 2 && n <= 4 ? "dny" : "dní");
const minWord = n => n === 1 ? "minuta" : (n >= 2 && n <= 4 ? "minuty" : "minut");

/* ---------------------------------------------------------------- today's plan (3 tasks, ~20 min) */
function todaysPlan(log){
  const plan = P.store.get("plan", {}) || {};
  const left = daysUntil(plan.examDate);
  const avail = id => !!P.modules[id];
  const tasks = [], used = new Set();
  const add = (m, p, min, why) => { const k = m+"|"+(p==null?"":p); if(used.has(k) || !avail(m)) return false; used.add(k); tasks.push({m, p, min, why}); return true; };
  const weak = weakSpots(log);
  const practiced = new Set(log.map(a => a.m));
  /* 1) the weakest part */
  if(weak[0]) add(weak[0].m, weak[0].p, 8, "nejslabší část ("+weak[0].pct+" %)");
  /* 2) a paper not practised for a long time / never, else second weakest */
  const fresh = ["uoe","reading","listening","writing","speaking"].filter(m => avail(m) && !practiced.has(m));
  if(fresh.length) add(fresh[0], null, 7, "zatím netrénováno");
  else if(weak[1]) add(weak[1].m, weak[1].p, 7, "druhá nejslabší ("+weak[1].pct+" %)");
  /* exam close: timed practice */
  if(left != null && left >= 0 && left <= 14 && tasks.length < 3) add("mock", null, 10, "zkouška za "+left+" "+dayWord(left)+" – trénuj na čas");
  /* 3) vocabulary review keeps the streak cheap */
  if(tasks.length < 3) add("vocab", null, 5, "denní opakování slovíček");
  /* fill defaults */
  [["uoe","part1"],["reading","part5"],["listening","part1"],["uoe","part4"],["reading","part7"],["speaking",null],["writing",null]]
    .forEach(([m,p]) => { if(tasks.length < 3) add(m, p, 6, "doporučený start"); });
  const total = tasks.reduce((s,t) => s+t.min, 0);
  if(tasks.length && total !== 20) tasks[tasks.length-1].min += 20 - total;
  const today = todayStr();
  tasks.forEach(t => t.done = log.some(a => a.day === today && a.m === t.m && (t.p == null || String(a.p) === String(t.p))));
  return tasks;
}

/* ---------------------------------------------------------------- weekly study plan generator */
function generateWeek(opts, log){
  const daily = Math.max(10, Math.min(240, +opts.daily || 30));
  const restDay = opts.rest === "" || opts.rest == null ? -1 : +opts.rest; /* 0=Mon … 6=Sun, -1 none */
  const acc = paperAccuracy(log);
  const left = daysUntil(opts.examDate);
  const keys = Object.keys(PAPERS); /* plan covers the whole exam, even modules not loaded yet */
  /* weight = base share × weakness factor (unknown → slightly boosted so it gets tried) */
  const w = {};
  keys.forEach(k => { const a = acc[k]; const f = a && a.n >= 5 ? Math.max(.6, Math.min(1.8, 1 + (75 - a.pct)/50)) : 1.15; w[k] = PAPERS[k].base * f; });
  const blocksPerDay = Math.max(1, Math.round(daily/15)), blockMin = Math.round(daily/blocksPerDay);
  const days = [0,1,2,3,4,5,6].filter(d => d !== restDay);
  const totalBlocks = blocksPerDay * days.length;
  const sumW = keys.reduce((s,k) => s+w[k], 0) || 1;
  /* largest remainder allocation */
  const raw = keys.map(k => ({k, x: totalBlocks*w[k]/sumW}));
  raw.forEach(r => r.b = Math.floor(r.x));
  let rest = totalBlocks - raw.reduce((s,r) => s+r.b, 0);
  raw.slice().sort((a,b) => (b.x-b.b)-(a.x-a.b)).forEach(r => { if(rest > 0){ r.b++; rest--; } });
  const remaining = {}; raw.forEach(r => remaining[r.k] = r.b);
  /* which part to practise inside a paper: weakest first, then rotate */
  const weak = weakSpots(log);
  const rot = {rue:["uoe:1","reading:5","uoe:4","reading:7","uoe:2","reading:6","uoe:3","reading:8"], listening:["listening:1","listening:2","listening:3","listening:4"],
    writing:["writing:1","writing:2"], speaking:["speaking:2","speaking:3","speaking:1","speaking:4"], vocab:["vocab:"]};
  const queue = {};
  Object.keys(rot).forEach(k => {
    const w8 = weak.filter(e => PAPER_OF[e.m] === k).slice(0,2).map(e => e.m+":"+(e.p==null?"":e.p));
    queue[k] = w8.concat(rot[k]);
  });
  const qi = {};
  const nextItem = k => { const q = queue[k] || [k+":"]; const i = qi[k] = ((qi[k] == null ? -1 : qi[k]) + 1) % q.length; const [m, p] = q[i].split(":"); return {m, p: p === "" ? null : p}; };
  const names = ["Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota","Neděle"];
  const week = names.map((name, d) => ({d, name, rest: d === restDay, items: []}));
  const lastMockDay = days[days.length-1];
  const mockWeek = left != null && left >= 0 && left <= 21;
  days.forEach(d => {
    if(mockWeek && d === lastMockDay && P.modules.mock){
      week[d].items.push({paper:"mock", m:"mock", p:null, min:Math.max(daily, 40), label:"Mock test – jedna celá část na čas"});
      return;
    }
    const today = new Set();
    for(let b=0; b<blocksPerDay; b++){
      const cand = Object.keys(remaining).filter(k => remaining[k] > 0).sort((a,b2) => (today.has(a)-today.has(b2)) || remaining[b2]-remaining[a]);
      const k = cand[0]; if(!k) break;
      remaining[k]--; today.add(k);
      const it = nextItem(k);
      week[d].items.push({paper:k, m:it.m, p:it.p, min:blockMin, label:partLabel(it.m, it.p)});
    }
  });
  const alloc = keys.map(k => ({k, name:PAPERS[k].name, min: raw.find(r => r.k === k).b * blockMin, acc: acc[k] ? acc[k].pct : null}));
  return {week, alloc, blockMin, generated: todayStr()};
}

/* ---------------------------------------------------------------- rendering helpers */
function subTabs(stage, active){
  const tabs = [["", "Přehled"], ["plan", "Studijní plán"], ["data", "Data a záloha"]];
  const nav = document.createElement("div"); nav.className = "sub-tabs"; nav.setAttribute("role","tablist");
  nav.innerHTML = tabs.map(([s,l]) => `<button class="tab" role="tab" data-sub="${s}" aria-selected="${s === (active||"")}">${l}</button>`).join("")
    + `<button class="tab" data-guide="1">O zkoušce ↗</button>`;
  nav.addEventListener("click", e => {
    const b = e.target.closest("button"); if(!b) return;
    if(b.dataset.guide) return P.go("mock", "guide");
    P.go("home", b.dataset.sub || null);
  });
  stage.appendChild(nav);
}
function bindGo(root){
  root.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => {
    const [m, sub] = b.dataset.go.split("/"); P.go(m, sub || null);
  }));
}
const goAttr = (m, p) => esc(m + (partSub(p) ? "/" + partSub(p) : ""));

/* ---------------------------------------------------------------- dashboard */
function renderDashboard(stage){
  const log = activity(), today = todayStr();
  const todays = log.filter(a => a.day === today && a.n > 0);
  const practice = todays.filter(a => !a.mock && a.m !== "mock"); /* mock self-scores are percentages, keep them out of accuracy */
  const tC = practice.reduce((s,a) => s+(+a.c||0), 0), tN = practice.reduce((s,a) => s+(+a.n||0), 0);
  const plan = P.store.get("plan", {}) || {};
  const left = daysUntil(plan.examDate);
  const strk = P.streak ? P.streak() : 0;
  const sec = document.createElement("div");

  /* hero + stats */
  let html = `<section class="hm-sec"><div class="hm-hero"><span class="hm-count">${strk}</span><span>${strk === 1 ? "den" : (strk>=2&&strk<=4?"dny":"dní")} v řadě${strk ? "" : " – začni dnes"}</span></div>
    <div class="grid">
      <div class="stat"><b>${todays.length}</b><span>dnešní sady</span></div>
      <div class="stat"><b>${tN ? pctOf(tC,tN)+" %" : "–"}</b><span>dnešní úspěšnost${tN ? " ("+tC+"/"+tN+")" : ""}</span></div>
      <div class="stat"><b>${left == null ? "–" : left < 0 ? "✓" : left}</b><span>${left == null ? `<button class="link-btn" data-go="home/plan">nastav datum zkoušky</button>` : left < 0 ? "zkouška proběhla" : "Do zkoušky zbývá "+left+" "+dayWord(left)}</span></div>
      <div class="stat"><b>${log.filter(a => a.n > 0).length}</b><span>sad celkem</span></div>
    </div></section>`;

  /* today's plan */
  const tasks = todaysPlan(log);
  html += `<section class="hm-sec"><h2>Dnešní plán <span class="badge">~20 min</span></h2>`;
  html += tasks.length ? `<ol class="hm-tasks">${tasks.map(t => `<li class="${t.done ? "done" : ""}"><span class="hm-min">${t.min} min</span>
      <span class="hm-what">${t.done ? "✓ " : ""}${esc(partLabel(t.m, t.p))}<small>${esc(t.why)}</small></span>
      <button class="btn ${t.done ? "ghost" : "primary"}" data-go="${goAttr(t.m, t.p)}">${t.done ? "Znovu" : "Start"}</button></li>`).join("")}</ol>`
    : `<p class="hm-empty">Moduly se ještě načítají.</p>`;
  html += `</section>`;

  /* weak spots */
  const weak = weakSpots(log);
  html += `<section class="hm-sec" aria-live="polite"><h2>Slabá místa</h2>`;
  if(weak.length){
    const w = weak[0];
    html += `<div class="hm-weak"><p>Tvoje nejslabší část: <b>${esc(partLabel(w.m, w.p))} – ${w.pct} %</b> (${w.c}/${w.n}).</p>
      <p>Doporučený další krok: ${esc(tipFor(w.m, w.p))}</p>
      <button class="btn primary" data-go="${goAttr(w.m, w.p)}">Procvičit teď</button></div>`;
    if(weak[1] && weak[1].pct < 75) html += `<p class="note">Další na řadě: ${weak.slice(1,3).filter(e => e.pct < 75).map(e => `<button class="link-btn" data-go="${goAttr(e.m, e.p)}">${esc(partLabel(e.m, e.p))} (${e.pct} %)</button>`).join(", ")}</p>`;
  } else html += `<p class="hm-empty">Až dokončíš aspoň pár sad (min. 5 otázek v jedné části), ukážu ti, kde ztrácíš nejvíc bodů.</p>`;
  html += `</section>`;

  /* 14-day strip */
  const days = [];
  for(let i=13;i>=0;i--){ const d = new Date(Date.now() - i*DAY), k = todayStr(d); days.push({k, d, n: log.filter(a => a.day === k && !a.mock && a.m !== "mock").reduce((s,a) => s+(+a.n||0), 0), sets: log.filter(a => a.day === k).length}); }
  const maxN = Math.max(1, ...days.map(d => d.n)), activeDays = days.filter(d => d.sets).length;
  html += `<section class="hm-sec"><h2>Posledních 14 dní</h2>
    <div class="hm-strip" role="img" aria-label="Aktivita za 14 dní: aktivní ${activeDays} ${dayWord(activeDays)}">${days.map(d =>
      `<i class="${d.n ? "" : "zero"} ${d.k === today ? "today" : ""}" style="height:${d.n ? Math.max(6, Math.round(100*d.n/maxN)) : 0}%" title="${d.d.getDate()}. ${d.d.getMonth()+1}.: ${d.n} otázek, ${d.sets} sad"></i>`).join("")}</div>
    <div class="hm-strip-l" aria-hidden="true">${days.map(d => `<span>${d.d.getDate()}</span>`).join("")}</div>
    <p class="note">Aktivní ${activeDays} z 14 dní · celkem ${days.reduce((s,d)=>s+d.n,0)} otázek.</p></section>`;

  /* module cards */
  const ms = P.order.filter(id => id !== "home" && P.modules[id]).map(id => P.modules[id]);
  html += `<section class="hm-sec"><h2>Moduly</h2><div class="cards">${ms.map(m => {
    let p = null; try{ p = m.progress ? m.progress() : null; }catch(e){ p = null; }
    const pct = p && p.total ? Math.min(100, Math.round(100*p.done/p.total)) : 0;
    return `<button class="card" data-go="${esc(m.id)}"><b>${esc(m.title)}</b><span>${esc(m.blurb||"")}${p && p.total ? ` · ${p.done}/${p.total}` : ""}</span><i class="pct" aria-hidden="true"><i style="width:${pct}%"></i></i></button>`;
  }).join("")}<button class="card" data-go="mock/guide"><b>O zkoušce</b><span>Formát C1 Advanced, body, Cambridge Scale, tipy na den zkoušky</span></button></div></section>`;

  /* accuracy per module/part */
  const parts = groupParts(log, 0).sort((a,b) => (a.m > b.m) - (a.m < b.m) || (partNum(a.p)||0) - (partNum(b.p)||0));
  html += `<section class="hm-sec"><h2>Úspěšnost podle částí</h2>`;
  html += parts.length ? `<div class="cats hm-cats">${parts.map(e => `<button class="cat" data-go="${goAttr(e.m, e.p)}"><div class="top"><span>${esc(partLabel(e.m, e.p))}</span><span>${e.pct} % · ${e.c}/${e.n}</span></div>
      <div class="track"><i class="${e.pct < 60 ? "low" : ""}" style="width:${e.pct}%"></i></div></button>`).join("")}</div>`
    : `<p class="hm-empty">Zatím žádná data – vyber modul výše a dokonči první sadu.</p>`;
  html += `</section>`;

  sec.innerHTML = html;
  stage.appendChild(sec);
  bindGo(sec);
}

/* ---------------------------------------------------------------- study plan page */
function renderPlan(stage){
  const log = activity();
  const plan = P.store.get("plan", {}) || {};
  const left = daysUntil(plan.examDate);
  const box = document.createElement("section"); box.className = "sheet";
  const phase = left == null ? "" : left < 0 ? "Zkouška už proběhla – nastav nové datum, pokud plánuješ další termín."
    : left <= 7 ? "Finiš: krátké opakování, jeden mock na čas, hodně spánku. Nic nového se už neuč."
    : left <= 21 ? "Zkouškové podmínky: každý týden aspoň jedna celá část na čas, rozbor chyb."
    : left <= 60 ? "Cílený trénink: většinu času věnuj slabým částem, jednou za 2 týdny mock."
    : "Budování základů: slovní zásoba, gramatika, pravidelné čtení a poslech v angličtině.";
  const minutes = [15,20,30,45,60,90,120];
  box.innerHTML = `<h2 style="margin-top:0">Studijní plán</h2>
    ${left != null && left >= 0 ? `<p class="score">Do zkoušky zbývá ${left} ${dayWord(left)}</p>` : ""}
    ${phase ? `<p>${esc(phase)}</p>` : `<p>Zadej datum zkoušky a kolik času denně můžeš věnovat přípravě. Plán rozdělí čas mezi části zkoušky podle toho, kde jsi nejslabší.</p>`}
    <form class="hm-plan-form" novalidate>
      <label>Datum zkoušky<input class="field" type="date" name="examDate" value="${esc(plan.examDate||"")}"></label>
      <label>Minut denně<select class="field" name="daily">${minutes.map(m => `<option value="${m}" ${(+plan.daily||30) === m ? "selected" : ""}>${m} ${minWord(m)}</option>`).join("")}</select></label>
      <label>Den volna<select class="field" name="rest"><option value="">žádný</option>${["Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota","Neděle"].map((d,i) => `<option value="${i}" ${String(plan.rest) === String(i) ? "selected" : ""}>${d}</option>`).join("")}</select></label>
    </form>
    <div class="row"><button class="btn primary" data-act="gen">${plan.week ? "Přegenerovat plán" : "Vytvořit plán"}</button>${plan.examDate ? `<button class="btn ghost" data-act="clear">Smazat plán</button>` : ""}</div>
    <div class="hm-out" aria-live="polite"></div>`;
  stage.appendChild(box);
  const out = box.querySelector(".hm-out");
  const draw = p => {
    if(!p || !p.week){ out.innerHTML = ""; return; }
    const dow = (new Date().getDay() + 6) % 7;
    /* which days of the current week had any activity */
    const monday = new Date(); monday.setHours(0,0,0,0); monday.setDate(monday.getDate() - dow);
    const doneDays = new Set(log.map(a => a.day));
    out.innerHTML = `<h2>Rozdělení času (týdně)</h2><div class="cats hm-alloc">${p.alloc.map(a => {
        const tot = p.alloc.reduce((s,x) => s+x.min, 0) || 1;
        return `<div class="cat"><div class="top"><span>${esc(a.name)}${a.acc != null ? ` <span class="badge">${a.acc} %</span>` : ""}</span><span>${a.min} min</span></div><div class="track"><i class="${a.acc != null && a.acc < 60 ? "low" : ""}" style="width:${Math.round(100*a.min/tot)}%"></i></div></div>`;
      }).join("")}</div>
      <p class="note">Slabší části (nižší úspěšnost za posledních 60 dní) dostávají víc času; části bez dat mírně navíc, abys je vyzkoušel/a. Vygenerováno ${esc(p.generated||"")}.</p>
      <h2>Tento týden</h2><div class="hm-week">${p.week.map(d => {
        const date = new Date(monday.getTime() + d.d*DAY), k = todayStr(date);
        return `<div class="hm-day ${d.d === dow ? "today" : ""}"><h3><span>${d.name} ${date.getDate()}. ${date.getMonth()+1}.</span><span>${doneDays.has(k) ? "✓ splněno" : d.d === dow ? "dnes" : ""}</span></h3>
          ${d.rest ? `<p class="note" style="margin:0">Volno – odpočinek je součást přípravy.</p>` : `<ul>${d.items.map(it => `<li><span class="hm-m">${it.min} min</span><button class="link-btn" data-go="${goAttr(it.m, it.p)}">${esc(it.label)}</button></li>`).join("")}</ul>`}</div>`;
      }).join("")}</div>`;
    bindGo(out);
  };
  draw(plan);
  box.querySelector('[data-act="gen"]').addEventListener("click", () => {
    const f = box.querySelector("form");
    const opts = {examDate: f.examDate.value, daily: +f.daily.value, rest: f.rest.value};
    if(opts.examDate && daysUntil(opts.examDate) < 0 && !confirm("Datum zkoušky je v minulosti. Přesto uložit?")) return;
    const p = Object.assign({}, opts, generateWeek(opts, log));
    P.store.set("plan", p);
    P.toast("Plán uložen");
    P.show("home", true);
  });
  const clr = box.querySelector('[data-act="clear"]');
  if(clr) clr.addEventListener("click", () => { if(confirm("Smazat datum zkoušky a týdenní plán?")){ P.store.del("plan"); P.show("home", true); } });
}

/* ---------------------------------------------------------------- backup / restore / wipe */
const PREFIX = "cae:";
function allKeys(){ try{ return Object.keys(localStorage).filter(k => k.startsWith(PREFIX)); }catch(e){ return []; } }
function exportData(){
  const data = {};
  allKeys().forEach(k => { data[k] = localStorage.getItem(k); });
  const payload = {app:"cae-portal", version:1, exported:new Date().toISOString(), data};
  const blob = new Blob([JSON.stringify(payload, null, 1)], {type:"application/json"});
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "cae-zaloha-"+todayStr()+".json";
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  P.toast("Záloha stažena ("+Object.keys(data).length+" položek)");
  return payload;
}
function validateBackup(obj){
  if(!obj || typeof obj !== "object" || obj.app !== "cae-portal" || !obj.data || typeof obj.data !== "object" || Array.isArray(obj.data)) return "Soubor není záloha C1 portálu.";
  const keys = Object.keys(obj.data);
  if(!keys.length) return "Záloha je prázdná.";
  for(const k of keys){
    if(!k.startsWith(PREFIX)) return "Neplatný klíč v záloze: "+k;
    if(typeof obj.data[k] !== "string") return "Neplatná hodnota u klíče "+k;
    try{ JSON.parse(obj.data[k]); }catch(e){ return "Poškozená data u klíče "+k; }
  }
  return null;
}
function mergeValues(cur, inc){
  if(Array.isArray(cur) && Array.isArray(inc)){
    const seen = new Set(), outA = [];
    cur.concat(inc).forEach(x => { const s = JSON.stringify(x); if(!seen.has(s)){ seen.add(s); outA.push(x); } });
    if(outA.every(x => x && typeof x.t === "number")) outA.sort((a,b) => a.t - b.t);
    return outA;
  }
  if(cur && inc && typeof cur === "object" && typeof inc === "object" && !Array.isArray(cur) && !Array.isArray(inc)){
    const o = Object.assign({}, inc);
    Object.keys(cur).forEach(k => { o[k] = (k in inc) ? mergeValues(cur[k], inc[k]) : cur[k]; });
    return o;
  }
  return cur === undefined ? inc : cur; /* scalars: keep what is on this device */
}
function applyBackup(obj, mode){
  if(mode === "replace") allKeys().forEach(k => localStorage.removeItem(k));
  let n = 0;
  Object.keys(obj.data).forEach(k => {
    const inc = JSON.parse(obj.data[k]);
    const curRaw = localStorage.getItem(k);
    let val = inc;
    if(mode === "merge" && curRaw != null){ try{ val = mergeValues(JSON.parse(curRaw), inc); }catch(e){ val = inc; } }
    try{ localStorage.setItem(k, JSON.stringify(val)); n++; }catch(e){}
  });
  return n;
}
function choose(title, text, buttons){
  return new Promise(res => {
    const d = document.createElement("dialog"); d.className = "hm-dlg";
    d.innerHTML = `<h3>${esc(title)}</h3><p>${esc(text)}</p><div class="row">${buttons.map((b,i) => `<button class="btn ${b.primary ? "primary" : "ghost"}" data-i="${i}">${esc(b.label)}</button>`).join("")}</div>`;
    document.body.appendChild(d);
    const done = v => { try{ d.close(); }catch(e){} d.remove(); res(v); };
    d.addEventListener("click", e => { const b = e.target.closest("button[data-i]"); if(b) done(buttons[+b.dataset.i].value); });
    d.addEventListener("cancel", e => { e.preventDefault(); done(null); });
    if(d.showModal) d.showModal(); else d.setAttribute("open", "");
    const f = d.querySelector("button"); if(f) f.focus();
  });
}
function importData(){
  const inp = document.createElement("input"); inp.type = "file"; inp.accept = "application/json,.json"; inp.style.display = "none";
  document.body.appendChild(inp);
  inp.addEventListener("change", async () => {
    const file = inp.files && inp.files[0]; inp.remove(); if(!file) return;
    let obj;
    try{ obj = JSON.parse(await file.text()); }catch(e){ P.toast("Soubor nelze přečíst (není to JSON)."); return; }
    const err = validateBackup(obj); if(err){ P.toast(err); return; }
    const n = Object.keys(obj.data).length;
    const mode = await choose("Obnovit zálohu", `Záloha z ${String(obj.exported||"").slice(0,10) || "neznámého data"} obsahuje ${n} položek. Sloučit ji s daty v tomto zařízení, nebo současná data nahradit?`,
      [{label:"Sloučit", value:"merge", primary:true}, {label:"Nahradit", value:"replace"}, {label:"Zrušit", value:null}]);
    if(!mode) return;
    if(mode === "replace" && !confirm("Opravdu nahradit všechna současná data zálohou?")) return;
    const cnt = applyBackup(obj, mode);
    applyTheme(P.store.get("theme", "auto"));
    P.toast((mode === "merge" ? "Sloučeno: " : "Obnoveno: ") + cnt + " položek");
    P.show(location.hash.split("/")[1] || "home", true);
  });
  inp.click();
}
function wipeAll(){
  if(!confirm("Smazat VŠECHNA data portálu (pokrok, aktivitu, plán, výsledky mocků) v tomto prohlížeči?")) return;
  const typed = prompt("Tohle nejde vrátit. Pro potvrzení napiš SMAZAT:");
  if(typed == null || typed.trim().toUpperCase() !== "SMAZAT"){ P.toast("Mazání zrušeno"); return; }
  allKeys().forEach(k => { try{ localStorage.removeItem(k); }catch(e){} });
  applyTheme("auto");
  P.toast("Všechna data smazána");
  P.show(location.hash.split("/")[1] || "home", true);
}

function renderData(stage){
  const keys = allKeys();
  const size = keys.reduce((s,k) => s + k.length + (localStorage.getItem(k)||"").length, 0);
  const box = document.createElement("section"); box.className = "sheet";
  box.innerHTML = `<h2 style="margin-top:0">Data a záloha</h2>
    <p>Veškerý pokrok se ukládá jen v tomto prohlížeči (localStorage). Pravidelně si stáhni zálohu – hodí se při přechodu na jiné zařízení nebo po vymazání prohlížeče.</p>
    <div class="grid"><div class="stat"><b>${keys.length}</b><span>uložených položek</span></div><div class="stat"><b>${(size/1024).toFixed(1)} kB</b><span>velikost dat</span></div><div class="stat"><b>${activity().length}</b><span>záznamů aktivity</span></div></div>
    <div class="row"><button class="btn primary" data-act="exp">Stáhnout zálohu (.json)</button><button class="btn ghost" data-act="imp">Obnovit ze zálohy…</button></div>
    <p class="note" style="margin-top:14px"><b>Sloučit</b> = přidá aktivitu a výsledky ze zálohy k současným, u nastavení ponechá hodnoty z tohoto zařízení. <b>Nahradit</b> = současná data smaže a nahraje zálohu.</p>
    <h2>Nebezpečná zóna</h2>
    <button class="btn ghost" data-act="wipe" style="border-color:var(--red);color:var(--red)">Smazat vše</button>`;
  stage.appendChild(box);
  box.querySelector('[data-act="exp"]').addEventListener("click", exportData);
  box.querySelector('[data-act="imp"]').addEventListener("click", importData);
  box.querySelector('[data-act="wipe"]').addEventListener("click", wipeAll);
}

/* ---------------------------------------------------------------- ⚙ tools menu in .topbar */
function initTools(){
  const bar = document.querySelector(".topbar"); if(!bar || bar.querySelector(".hm-gear")) return;
  let tools = bar.querySelector(".tools");
  if(!tools){ tools = document.createElement("div"); tools.className = "tools"; bar.appendChild(tools); }
  tools.insertAdjacentHTML("beforeend", `<button class="hm-gear" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="hm-menu" title="Nastavení">⚙</button>
    <div class="hm-menu" id="hm-menu" role="menu" hidden>
      <div class="hm-theme" role="group" aria-label="Vzhled"><button data-theme-set="auto">Auto</button><button data-theme-set="light">Světlý</button><button data-theme-set="dark">Tmavý</button></div>
      <button role="menuitem" data-act="exp">Stáhnout zálohu</button>
      <button role="menuitem" data-act="imp">Obnovit ze zálohy…</button>
      <button role="menuitem" data-act="data">Data a záloha</button>
      <button role="menuitem" data-act="wipe" class="danger">Smazat vše…</button>
    </div>`);
  const gear = tools.querySelector(".hm-gear"), menu = tools.querySelector(".hm-menu");
  const syncTheme = () => { const t = P.store.get("theme", "auto"); menu.querySelectorAll("[data-theme-set]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.themeSet === t))); };
  const open = v => { menu.hidden = !v; gear.setAttribute("aria-expanded", String(v)); if(v){ syncTheme(); const f = menu.querySelector("button"); if(f) f.focus(); } };
  gear.addEventListener("click", e => { e.stopPropagation(); open(menu.hidden); });
  document.addEventListener("click", e => { if(!menu.hidden && !tools.contains(e.target)) open(false); });
  document.addEventListener("keydown", e => { if(e.key === "Escape" && !menu.hidden){ open(false); gear.focus(); } });
  menu.addEventListener("click", e => {
    const b = e.target.closest("button"); if(!b) return;
    if(b.dataset.themeSet){ const t = b.dataset.themeSet; if(t === "auto") P.store.del("theme"); else P.store.set("theme", t); applyTheme(t); syncTheme(); return; }
    open(false);
    ({exp:exportData, imp:importData, wipe:wipeAll, data:() => P.go("home","data")})[b.dataset.act]();
  });
  if(window.matchMedia) try{ window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => applyTheme(P.store.get("theme","auto"))); }catch(e){}
}

/* ---------------------------------------------------------------- service worker */
function registerSW(){
  if(!("serviceWorker" in navigator)) return;
  const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  if(location.protocol !== "https:" && !local) return;
  navigator.serviceWorker.register("sw.js", {scope:"./"}).then(reg => {
    reg.addEventListener("updatefound", () => {
      const nw = reg.installing; if(!nw) return;
      nw.addEventListener("statechange", () => { if(nw.state === "installed" && navigator.serviceWorker.controller) P.toast("Nová verze portálu je připravena – obnov stránku."); });
    });
  }).catch(() => {});
}

/* ---------------------------------------------------------------- register */
P.register({
  id:"home", title:"Přehled", short:"Přehled", blurb:"Streak, dnešní plán, slabá místa",
  render(stage, ctx){
    const sub = ctx && ctx.sub || "";
    subTabs(stage, sub === "plan" || sub === "data" ? sub : "");
    if(sub === "plan") renderPlan(stage);
    else if(sub === "data") renderData(stage);
    else renderDashboard(stage);
  },
  /* exposed for scripts/check-mock.js */
  _internal:{weakSpots, todaysPlan, generateWeek, validateBackup, mergeValues, applyBackup, partLabel, partSub, daysUntil}
});
if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", initTools); else initTools();
window.addEventListener("load", registerSW);
})();
