/* Writing module – C1 Advanced Part 1 (essay) + Part 2 (letter/email, proposal, report, review). */
(function(){
"use strict";
const P = window.Portal; if(!P) return;
const {esc, countdown, todayStr, shuffle} = P.util;
const D = () => (window.DATA && window.DATA.writing) || {part1:[], part2:[], lessons:[], criteria:[], checklist:[], rewrite:[], typos:[], traps:[], tags:{}};
const NS_DRAFT = "writing:drafts", NS_HIST = "writing:history", NS_DONE = "writing:done", NS_RW = "writing:rewrites";
const TYPE_CZ = {essay:"Esej", letter:"Dopis", email:"E-mail", proposal:"Proposal", report:"Report", review:"Review"};
const words = t => t.trim() ? t.trim().split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length : 0;
const allTasks = () => [...D().part1.map(t => Object.assign({part:1, type:"essay", register:"neutral"}, t)), ...D().part2.map(t => Object.assign({part:2}, t))];
const findTask = id => allTasks().find(t => t.id === id);
const paras = t => esc(t).split(/\n\s*\n/).map(p => "<p>" + p.replace(/\n/g, "<br>") + "</p>").join("");

/* ---------- scoped styles ---------- */
if(!document.getElementById("wr-style")){
  const st = document.createElement("style"); st.id = "wr-style";
  st.textContent = `
.wr-notes{border:1.5px solid var(--ink);border-radius:4px;padding:10px 14px;margin:10px 0}
.wr-notes ul{margin:6px 0 0;padding-left:20px}
.wr-bubbles{display:grid;gap:8px;margin:10px 0}
.wr-bubble{position:relative;background:var(--soft);border-radius:14px;padding:8px 14px;font-family:var(--serif);font-size:16.5px}
.wr-bubble::after{content:"";position:absolute;left:18px;bottom:-7px;border:7px solid transparent;border-top-color:var(--soft);border-bottom:0}
.wr-prompt{font-family:var(--serif);font-size:17.5px;line-height:1.55}
.wr-prompt .instr{font-weight:600}
.wr-wc{font-variant-numeric:tabular-nums;font-weight:600;padding:2px 10px;border-radius:12px;border:1.5px solid var(--rule);font-size:14px}
.wr-wc.ok{border-color:var(--green);color:var(--green)} .wr-wc.near{border-color:#C98A00;color:#C98A00} .wr-wc.bad{border-color:var(--red);color:var(--red)}
.wr-ta{min-height:340px!important}
.wr-check label{display:flex;gap:8px;align-items:flex-start;margin:6px 0;font-size:15px}
.wr-an li{margin:4px 0;font-size:15px} .wr-an .good{color:var(--green)} .wr-an .warn{color:var(--red)}
.wr-compare{display:grid;grid-template-columns:1fr;gap:12px}
@media(min-width:720px){.wr-compare{grid-template-columns:1fr 1fr}}
.wr-col{border:1px solid var(--rule);border-radius:6px;padding:12px 14px;font-family:var(--serif);font-size:16px;line-height:1.6;background:var(--sheet)}
.wr-col p{margin:0 0 10px}
.wr-col mark{background:var(--hl);color:inherit;padding:0 2px;border-radius:2px}
.wr-col mark sup{font-family:var(--sans);font-size:11px;font-weight:700;margin-left:2px}
.wr-callouts{margin:8px 0 0;padding-left:20px;font-size:14.5px} .wr-callouts li{margin:5px 0}
.wr-crit{border-top:1px solid var(--rule);padding:10px 0}
.wr-crit .scale{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}
.wr-crit details{font-size:14px;color:var(--muted)}
.wr-list{display:grid;gap:8px}
.wr-item{appearance:none;text-align:left;display:flex;justify-content:space-between;gap:10px;align-items:center;border:1px solid var(--rule);border-radius:6px;background:var(--sheet);color:var(--ink);padding:10px 12px;cursor:pointer;font:inherit}
.wr-item:hover{border-color:var(--ink)}
.wr-phr h4{margin:12px 0 4px;font-size:15px} .wr-phr ul{margin:0;padding-left:20px;font-family:var(--serif)}
.wr-mis td{padding:4px 6px;vertical-align:top;font-size:14.5px;border-top:1px solid var(--rule)}
.wr-mis .b{color:var(--red);text-decoration:line-through} .wr-mis .g{color:var(--green)}
.wr-chart svg{width:100%;height:auto;display:block}
`;
  document.head.appendChild(st);
}

/* ---------- navigation ---------- */
function subnav(active){
  const items = [["", "Přehled"], ["lessons", "Lekce"], ["tasks", "Úlohy"], ["progress", "Hodnocení"], ["rewrite", "Přepiš odstavec"]];
  return `<div class="sub-tabs" role="tablist">${items.map(([s, l]) => `<button class="tab" role="tab" data-sub="${s}" aria-selected="${s === active}">${l}</button>`).join("")}</div>`;
}
function wireNav(stage){ stage.querySelectorAll(".sub-tabs .tab").forEach(b => b.onclick = () => P.go("writing", b.dataset.sub)); }

function render(stage, ctx){
  const sub = (ctx && ctx.sub) || "";
  if(sub.startsWith("t-")) return renderTask(stage, sub.slice(2));
  if(sub.startsWith("l-")) return renderLesson(stage, sub.slice(2));
  const active = ["lessons", "tasks", "progress", "rewrite"].includes(sub) ? sub : "";
  stage.innerHTML = subnav(active) + `<div class="wr-body"></div>`;
  wireNav(stage);
  const body = stage.querySelector(".wr-body");
  ({"": renderOverview, lessons: renderLessons, tasks: renderTasks, progress: renderProgress, rewrite: renderRewrite})[active](body);
}

/* ---------- overview ---------- */
function renderOverview(el){
  const f = D().format || {}; const done = P.store.get(NS_DONE, {}); const hist = P.store.get(NS_HIST, []);
  el.innerHTML = `<section class="sheet">
    <h2 style="margin-top:0">Writing – 90 minut, 2 texty</h2>
    <p>${esc(f.intro || "")}</p>
    ${(f.parts || []).map(p => `<p><b>${esc(p.name)}:</b> ${esc(p.text)}</p>`).join("")}
    <p class="note">${esc(f.criteria || "")}</p>
    <div class="grid"><div class="stat"><b>${Object.keys(done).length}</b><span>napsaných úloh z ${allTasks().length}</span></div>
      <div class="stat"><b>${hist.length}</b><span>sebehodnocení</span></div>
      <div class="stat"><b>${D().part1.length}+${D().part2.length}</b><span>zadání Part 1 + Part 2</span></div></div>
    <div class="row"><button class="btn primary" data-go="tasks">Vybrat úlohu</button><button class="btn ghost" data-go="lessons">Lekce a fráze</button><button class="btn ghost" data-rand>Náhodná esej</button></div>
  </section>`;
  el.querySelectorAll("[data-go]").forEach(b => b.onclick = () => P.go("writing", b.dataset.go));
  el.querySelector("[data-rand]").onclick = () => P.go("writing", "t-" + shuffle(D().part1)[0].id);
}

/* ---------- lessons ---------- */
function renderLessons(el){
  el.innerHTML = `<div class="cards">${D().lessons.map(l => `<button class="card" data-id="${esc(l.id)}"><b>${esc(l.title)}</b><span>${esc(l.intro.slice(0, 110))}…</span></button>`).join("")}</div>`;
  el.querySelectorAll(".card").forEach(c => c.onclick = () => P.go("writing", "l-" + c.dataset.id));
}
function renderLesson(stage, id){
  const l = D().lessons.find(x => x.id === id);
  if(!l){ P.go("writing", "lessons"); return; }
  const type = l.id === "essay" ? "essay" : l.type;
  const tasks = allTasks().filter(t => t.type === type || (type === "letter" && t.type === "email" ) ).filter(t => l.id !== "letter-formal" || t.register === "formal").filter(t => l.id !== "letter-informal" || t.register === "informal");
  stage.innerHTML = subnav("lessons") + `<section class="sheet">
    <h2 style="margin-top:0">${esc(l.title)}</h2><p>${esc(l.intro)}</p>
    <h3>Struktura</h3><ol>${l.structure.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
    <h3>Registr</h3><p>${esc(l.register)}</p>
    <h3>Plán odstavců</h3><ol>${l.plan.map(p => `<li><b>${esc(p.h)}</b> – ${esc(p.t)}</li>`).join("")}</ol>
    <h3>Banka frází</h3><div class="wr-phr">${l.phrases.map(g => `<h4>${esc(g.fn)}</h4><ul>${g.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`).join("")}</div>
    <h3>Časté chyby českých mluvčích</h3>
    <table class="wr-mis" style="border-collapse:collapse;width:100%">${l.mistakes.map(m => `<tr><td class="b">${esc(m.bad)}</td><td class="g">${esc(m.good)}</td><td>${esc(m.why)}</td></tr>`).join("")}</table>
    <h3>Procvič</h3><div class="wr-list">${tasks.slice(0, 8).map(t => itemBtn(t)).join("")}</div>
  </section>`;
  wireNav(stage);
  stage.querySelectorAll(".wr-item").forEach(b => b.onclick = () => P.go("writing", "t-" + b.dataset.id));
}

/* ---------- task list ---------- */
function itemBtn(t){
  const done = P.store.get(NS_DONE, {})[t.id]; const draft = (P.store.get(NS_DRAFT, {})[t.id] || {}).text;
  return `<button class="wr-item" data-id="${esc(t.id)}"><span><span class="badge">${t.part === 1 ? "Part 1" : TYPE_CZ[t.type]}</span> ${esc(t.title)}</span><span class="note">${done ? "✓ napsáno" : draft ? "koncept" : ""}</span></button>`;
}
function renderTasks(el){
  let filter = P.store.get("writing:filter", "all");
  const types = [["all", "Vše"], ["essay", "Part 1 esej"], ["letter", "Dopis/e-mail"], ["proposal", "Proposal"], ["report", "Report"], ["review", "Review"]];
  const draw = () => {
    const list = allTasks().filter(t => filter === "all" || t.type === filter || (filter === "letter" && t.type === "email"));
    el.innerHTML = `<div class="chips">${types.map(([k, l]) => `<button class="chip" data-f="${k}" aria-pressed="${k === filter}">${l}</button>`).join("")}</div><div class="wr-list">${list.map(itemBtn).join("")}</div>`;
    el.querySelectorAll(".chip").forEach(c => c.onclick = () => { filter = c.dataset.f; P.store.set("writing:filter", filter); draw(); });
    el.querySelectorAll(".wr-item").forEach(b => b.onclick = () => P.go("writing", "t-" + b.dataset.id));
  };
  draw();
}

/* ---------- prompt in exam layout ---------- */
function promptHTML(t){
  if(t.part === 1) return `<div class="wr-prompt"><p>${esc(t.context)}</p>
    <div class="wr-notes"><b>${esc(t.question)}</b><p class="note" style="margin:6px 0 0">Notes</p><ul>${t.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul></div>
    <p class="note">Some opinions expressed in the discussion:</p>
    <div class="wr-bubbles">${t.opinions.map(o => `<div class="wr-bubble">${esc(o)}</div>`).join("")}</div>
    <p class="instr">${esc(t.task)}</p>
    <p>You may, if you wish, make use of the opinions expressed in the discussion, but you should use your own words as far as possible.</p>
    <p class="note">Write your essay in 220–260 words in an appropriate style.</p></div>`;
  return `<div class="wr-prompt"><p>${esc(t.prompt)}</p>${t.require ? `<ul>${t.require.map(r => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}
    <p class="instr">${esc(t.instruction)}</p><p class="note">Write your answer in 220–260 words in an appropriate style.</p></div>`;
}

/* ---------- heuristic analyzer ---------- */
const LINKERS = ["however","moreover","furthermore","in addition","what is more","nevertheless","nonetheless","consequently","as a result","therefore","thus","although","even though","whereas","while","despite","in spite of","on the other hand","by contrast","in contrast","admittedly","that said","having said that","on balance","all things considered","ultimately","firstly","secondly","finally","for instance","for example","such as","in particular","as long as","provided that","unless","since","owing to","due to","in conclusion","to sum up","overall","besides","yet","meanwhile","above all","in other words"];
const CONTR = /\b(?:don't|doesn't|didn't|can't|won't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|wouldn't|shouldn't|couldn't|i'm|i've|i'd|i'll|you're|we're|they're|it's|that's|there's|let's|we'll|you'll|they'll|he's|she's|what's)\b/gi;
const STOP = new Set("the a an and or but of to in on at for with by from as is are was were be been being it this that these those which who whom whose what when where why how not no can could would should may might must will shall do does did have has had their there they them its his her our your you we i he she my me us than then also very more most some such into about over only other so if just because people".split(" "));
const IRREG = "done|made|given|taken|seen|known|shown|built|held|found|thought|brought|bought|taught|told|said|paid|sent|spent|kept|left|lost|met|put|set|run|cut|chosen|spoken|written|driven|eaten|grown|drawn|thrown|broken|forgotten|hidden|undertaken|understood|seen".split("|");
function analyze(text, task){
  const out = []; const add = (cls, msg) => out.push({cls, msg});
  const n = words(text);
  add(n >= 220 && n <= 260 ? "good" : "warn", `Počet slov: ${n} (cíl 220–260).` + (n < 220 ? " Text je krátký – pravděpodobně některý bod zadání není dostatečně rozvinutý." : n > 260 ? " Text je delší – zkrať opakování; přílišná délka může vést k irelevanci." : ""));
  const ps = text.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
  const pc = ps.length > 1 ? ps.length : text.split(/\n/).filter(s => s.trim()).length;
  const minP = task.type === "essay" ? 4 : 4;
  add(pc >= minP ? "good" : "warn", `Odstavce: ${pc}. ${pc >= minP ? "Struktura v pořádku." : "Doporučeno alespoň " + minP + " odstavce (oddělené prázdným řádkem)."}`);
  const sents = text.replace(/\n+/g, " ").split(/(?<=[.!?])\s+/).map(s => words(s)).filter(x => x > 0);
  if(sents.length > 2){
    const avg = sents.reduce((a, b) => a + b, 0) / sents.length;
    const sd = Math.sqrt(sents.reduce((a, b) => a + (b - avg) ** 2, 0) / sents.length);
    add(sd >= 5 && avg <= 28 ? "good" : "warn", `Věty: ${sents.length}, průměrná délka ${avg.toFixed(1)} slov, rozptyl ${sd.toFixed(1)}. ` + (avg > 28 ? "Věty jsou velmi dlouhé – hrozí ztráta kontroly." : sd < 5 ? "Věty mají podobnou délku – střídej krátké úderné a delší souvětí." : "Dobrá variace délky vět."));
  }
  const lw = (text.toLowerCase().match(/[a-z']+/g) || []);
  const freq = {}; lw.forEach(w => { if(w.length >= 4 && !STOP.has(w)) freq[w] = (freq[w] || 0) + 1; });
  const rep = Object.entries(freq).filter(([, c]) => c >= 4).sort((a, b) => b[1] - a[1]).slice(0, 6);
  if(rep.length) add("warn", "Často opakovaná slova: " + rep.map(([w, c]) => `${w} (${c}×)`).join(", ") + ". Zvaž synonyma nebo zájmena (this, such, the former…).");
  const low = " " + text.toLowerCase().replace(/\s+/g, " ") + " ";
  const used = LINKERS.filter(l => new RegExp("\\b" + l.replace(/ /g, "\\s+") + "\\b").test(low));
  add(used.length >= 6 ? "good" : "warn", `Různé spojovací výrazy: ${used.length}${used.length ? " (" + used.slice(0, 10).join(", ") + ")" : ""}. ${used.length >= 6 ? "" : "Přidej rozmanitější spojky (whereas, admittedly, consequently…)."}`);
  const formal = task.register !== "informal";
  const cons = text.match(CONTR) || [];
  if(formal && cons.length) add("warn", `Stažené tvary ve formálním/neutrálním textu: ${[...new Set(cons.map(c => c.toLowerCase()))].join(", ")} → piš plné tvary.`);
  if(!formal && !cons.length) add("warn", "Neformální text bez stažených tvarů může působit strojeně (I’m, you’ll, don’t…).");
  if(formal && /\b(gonna|wanna|kids|stuff|guys|cool|awesome)\b|!{2,}/i.test(text)) add("warn", "Hovorové výrazy (kids, stuff, gonna…) nebo vícenásobné vykřičníky nepatří do formálního textu.");
  const op = (low.match(/\bin my opinion\b|\bi think\b/g) || []).length;
  if(op > 2) add("warn", `„In my opinion / I think“ ${op}× – zkus: I would argue that…, It seems to me that…, I am inclined to believe…`);
  const pas = (low.match(new RegExp("\\b(?:am|is|are|was|were|be|been|being)\\s+(?:\\w+ly\\s+)?(?:\\w+ed|" + IRREG.join("|") + ")\\b", "g")) || []).length;
  const cond = (low.match(/\bif\b|\bunless\b|\bprovided that\b|\bas long as\b|\bwould\b/g) || []).length;
  const inv = text.split(/(?<=[.!?])\s+|\n/).filter(s => /^\s*(Not only|Never|Rarely|Seldom|Only (when|by|if|once|after|then)|Little|Hardly|No sooner|Under no circumstances|Not until|At no time|Nowhere|Were|Had|Should)\b/.test(s)).length;
  const cleft = (text.match(/\bWhat [^.?!]{3,60}\b(is|was)\b|\bIt (is|was) [^.?!]{2,60} (that|who) /g) || []).length;
  const rel = (low.match(/\b(which|whom|whose|whereby)\b/g) || []).length;
  add(pas && cond ? "good" : "warn", `Struktury: trpný rod ~${pas}, kondicionály/would ~${cond}, inverze ${inv}, vytýkací věty ${cleft}, vztažné which/whose ${rel}.` + (inv + cleft === 0 ? " Pro Language 5 zkus aspoň jednu inverzi (Not only… / Were it…) nebo cleft (What matters is…)." : ""));
  const typos = D().typos.filter(([w]) => new RegExp("\\b" + w + "\\b", "i").test(text));
  if(typos.length) add("warn", "Možné překlepy: " + typos.map(([w, r]) => `${w} → ${r}`).join(", ") + ".");
  D().traps.forEach(([re, tip]) => {
    const isCaps = /english\|czech/.test(re);
    const m = text.match(new RegExp(re, isCaps ? "g" : "gi"));
    if(m) add("warn", (isCaps ? `Malé písmeno: ${[...new Set(m)].join(", ")}. ` : `„${m[0]}“: `) + tip);
  });
  if(task.type === "report" || task.type === "proposal"){
    const heads = text.split("\n").filter(l => l.trim() && l.trim().length < 45 && !/[.!?,]$/.test(l.trim())).length;
    add(heads >= 3 ? "good" : "warn", heads >= 3 ? "Nadpisy sekcí nalezeny." : "Report/proposal by měl mít nadpis a podnadpisy (Introduction, …, Recommendations).");
  }
  if(task.type === "letter" || task.type === "email"){
    if(!/^\s*(Dear|Hi|Hello|Hey)\b/.test(text)) add("warn", "Chybí oslovení (Dear… / Hi…).");
    if(task.register === "formal"){
      if(/Dear Sir or Madam/i.test(text) && /Yours sincerely/i.test(text)) add("warn", "Dear Sir or Madam → Yours faithfully (ne sincerely).");
      if(!/Yours (faithfully|sincerely)|Kind regards|Best regards/i.test(text)) add("warn", "Chybí formální rozloučení (Yours faithfully/sincerely).");
    }
  }
  if(task.part === 1){
    const hit = task.points.filter(p => p.toLowerCase().split(/\W+/).filter(w => w.length > 4 && !STOP.has(w)).some(w => low.includes(w.slice(0, 6))));
    add(hit.length >= 2 ? "good" : "warn", `Body z poznámek zmíněné v textu (odhad): ${hit.length ? hit.join(", ") : "žádný"}. ${hit.length >= 2 ? "Nezapomeň jasně říct, který je důležitější." : "Esej musí rozebrat DVA body z poznámek."}`);
  }
  return out;
}
function analysisHTML(items){
  return `<p class="note">⚠ Jde o heuristickou kontrolu (počítání, vzory), ne o hodnocení zkoušejícího. Obsah, logiku a přesnost musíš posoudit sám/sama podle kritérií.</p><ul class="wr-an">${items.map(i => `<li class="${i.cls}">${i.cls === "good" ? "✓" : "•"} ${esc(i.msg)}</li>`).join("")}</ul>`;
}

/* ---------- model with highlighted callouts ---------- */
function modelHTML(t){
  let html = esc(t.model); const tags = D().tags;
  (t.callouts || []).forEach((c, i) => { const q = esc(c.q); const at = html.indexOf(q); if(at >= 0) html = html.slice(0, at) + `<mark title="${esc(tags[c.tag] || c.tag)}">${q}<sup>${i + 1}</sup></mark>` + html.slice(at + q.length); });
  const body = html.split(/\n\s*\n/).map(p => "<p>" + p.replace(/\n/g, "<br>") + "</p>").join("");
  return body;
}
function calloutsHTML(t){
  const tags = D().tags;
  return `<ol class="wr-callouts">${(t.callouts || []).map(c => `<li><b>${esc(tags[c.tag] || c.tag)}</b>: ${esc(c.cz)}</li>`).join("")}</ol>`;
}

/* ---------- self-assessment form ---------- */
function selfAssessHTML(prefix){
  return D().criteria.map(c => `<div class="wr-crit" data-crit="${c.id}"><b>${esc(c.name)}</b> <span class="note">(${esc(c.cz)})</span><div class="note">${esc(c.q)}</div>
    <div class="scale" role="radiogroup" aria-label="${esc(c.name)}">${[0,1,2,3,4,5].map(v => `<button type="button" class="chip" data-v="${v}" aria-pressed="false">${v}</button>`).join("")}</div>
    <details><summary>Jak vypadá 5 / 3 / 1</summary><p><b>5:</b> ${esc(c.bands[5])}</p><p><b>3:</b> ${esc(c.bands[3])}</p><p><b>1:</b> ${esc(c.bands[1])}</p></details></div>`).join("");
}
function wireSelfAssess(root){
  root.querySelectorAll(".wr-crit .scale").forEach(sc => sc.querySelectorAll(".chip").forEach(b => b.onclick = () => {
    sc.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  }));
  return () => { const s = {}; let ok = true; root.querySelectorAll(".wr-crit").forEach(c => { const p = c.querySelector('.chip[aria-pressed="true"]'); if(!p) ok = false; else s[c.dataset.crit] = +p.dataset.v; }); return ok ? s : null; };
}
function saveResult(t, text, scores, extra){
  const hist = P.store.get(NS_HIST, []);
  const sum = Object.values(scores).reduce((a, b) => a + b, 0);
  hist.push(Object.assign({t: Date.now(), day: todayStr(), id: t.id, type: t.type, part: t.part, words: words(text), scores, sum}, extra || {}));
  P.store.set(NS_HIST, hist.slice(-300));
  const done = P.store.get(NS_DONE, {}); done[t.id] = Date.now(); P.store.set(NS_DONE, done);
  P.logActivity("writing", t.part === 1 ? "part1" : "part2-" + t.type, sum, 20, {task: t.id});
  return sum;
}

/* ---------- workspace ---------- */
function editorHTML(t, draft){
  return `<div class="meta"><span><span class="badge">${t.part === 1 ? "Part 1 – Essay" : "Part 2 – " + TYPE_CZ[t.type]}</span> ${esc(t.register === "informal" ? "neformální registr" : t.register === "formal" ? "formální registr" : "neutrální registr")}</span><span class="wr-wc" aria-live="polite">0 slov</span></div>
    <label class="note" for="wr-ta-${esc(t.id)}">Tvůj text (odstavce odděl prázdným řádkem)</label>
    <textarea id="wr-ta-${esc(t.id)}" class="field wr-ta" spellcheck="false" lang="en">${esc(draft || "")}</textarea>`;
}
function wireCounter(root, onInput){
  const ta = root.querySelector("textarea"), wc = root.querySelector(".wr-wc");
  const upd = () => { const n = words(ta.value); wc.textContent = n + " " + (n === 1 ? "slovo" : n >= 2 && n <= 4 ? "slova" : "slov") + " / 220–260";
    wc.className = "wr-wc " + (n >= 220 && n <= 260 ? "ok" : (n >= 190 && n < 220) || (n > 260 && n <= 290) ? "near" : n ? "bad" : ""); };
  let tm; ta.addEventListener("input", () => { upd(); clearTimeout(tm); tm = setTimeout(() => onInput && onInput(ta.value), 600); });
  upd(); return ta;
}

function renderTask(stage, id){
  const t = findTask(id);
  if(!t){ stage.innerHTML = subnav("tasks") + `<p>Úloha nenalezena.</p>`; wireNav(stage); return; }
  const drafts = P.store.get(NS_DRAFT, {});
  stage.innerHTML = subnav("tasks") + `<section class="sheet">
    <div class="meta"><button class="link-btn" data-back>← zpět na úlohy</button><span class="row"><span class="timer" hidden>45:00</span><button class="btn ghost" data-timer style="min-height:36px">⏱ 45 min</button></span></div>
    <h2 style="margin-top:0">${esc(t.title)}</h2>${promptHTML(t)}
    <details><summary><b>Osnova (CZ)</b> – plán odstavec po odstavci</summary><ol>${t.scaffold.map(s => `<li><b>${esc(s.h)}</b>: ${esc(s.t)}</li>`).join("")}</ol></details>
    <details><summary><b>Lekce k tomuto typu textu</b></summary><p><button class="link-btn" data-lesson>Otevřít lekci a banku frází</button></p></details>
    <div style="margin-top:14px">${editorHTML(t, (drafts[t.id] || {}).text)}</div>
    <p class="note" data-saved aria-live="polite"></p>
    <h3>Kontrola před odevzdáním</h3><div class="wr-check">${D().checklist.map((c, i) => `<label><input type="checkbox" data-ck="${i}"> <span>${esc(c)}</span></label>`).join("")}</div>
    <div class="row" style="margin-top:10px"><button class="btn ghost" data-an>Analyzovat (heuristika)</button><button class="btn primary" data-submit>Odevzdat a porovnat</button></div>
    <div data-anout aria-live="polite" style="margin-top:12px"></div>
    <div data-result></div></section>`;
  wireNav(stage);
  stage.querySelector("[data-back]").onclick = () => P.go("writing", "tasks");
  stage.querySelector("[data-lesson]").onclick = () => P.go("writing", "l-" + (t.type === "essay" ? "essay" : (t.type === "letter" || t.type === "email") ? (t.register === "informal" ? "letter-informal" : "letter-formal") : t.type));
  const savedEl = stage.querySelector("[data-saved]");
  const ta = wireCounter(stage, v => { const d = P.store.get(NS_DRAFT, {}); d[t.id] = {text: v, t: Date.now()}; P.store.set(NS_DRAFT, d); savedEl.textContent = "Koncept uložen " + new Date().toLocaleTimeString("cs-CZ"); });
  let timer = null;
  stage.querySelector("[data-timer]").onclick = e => {
    const el = stage.querySelector(".timer"); el.hidden = false;
    if(timer) timer.stop();
    timer = countdown(el, 45 * 60, () => P.toast("Čas vypršel – dokonči a zkontroluj text."));
    e.target.textContent = "⏱ restart";
  };
  const anOut = stage.querySelector("[data-anout]");
  stage.querySelector("[data-an]").onclick = () => { anOut.innerHTML = `<h3>Heuristická zpětná vazba</h3>` + analysisHTML(analyze(ta.value, t)); };
  stage.querySelector("[data-submit]").onclick = () => {
    if(words(ta.value) < 50){ P.toast("Napiš nejdřív aspoň 50 slov."); return; }
    if(timer) timer.stop();
    anOut.innerHTML = `<h3>Heuristická zpětná vazba</h3>` + analysisHTML(analyze(ta.value, t));
    showResult(stage.querySelector("[data-result]"), t, ta.value);
  };
}

function showResult(box, t, text){
  box.innerHTML = `<h3>Srovnání s modelovou odpovědí</h3>
    <div class="wr-compare"><div><p class="note">Tvůj text (${words(text)} slov)</p><div class="wr-col">${paras(text)}</div></div>
    <div><p class="note">Modelová odpověď – band 5 (${words(t.model)} slov)</p><div class="wr-col">${modelHTML(t)}</div>${calloutsHTML(t)}</div></div>
    <h3>Sebehodnocení podle kritérií Cambridge (0–5)</h3>${selfAssessHTML()}
    <div class="row" style="margin-top:10px"><button class="btn primary" data-save>Uložit hodnocení</button></div><p class="hint" aria-live="polite" data-msg></p>`;
  const get = wireSelfAssess(box);
  box.querySelector("[data-save]").onclick = () => {
    const s = get(); if(!s){ box.querySelector("[data-msg]").textContent = "Ohodnoť všechna čtyři kritéria."; return; }
    const sum = saveResult(t, text, s);
    box.querySelector("[data-msg]").textContent = `Uloženo: ${sum}/20. Vývoj najdeš v záložce Hodnocení.`;
    box.querySelector("[data-save]").disabled = true; P.toast("Hodnocení uloženo");
  };
  box.scrollIntoView({behavior: "smooth", block: "start"});
}

/* ---------- progress / history ---------- */
function chartSVG(vals, label){
  const w = 300, h = 90, pad = 18; const n = vals.length;
  const x = i => pad + (n <= 1 ? (w - 2 * pad) / 2 : i * (w - 2 * pad) / (n - 1)); const y = v => h - pad - v * (h - 2 * pad) / 5;
  const pts = vals.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}: ${vals.join(", ")}">
    ${[0, 1, 2, 3, 4, 5].map(v => `<line x1="${pad}" x2="${w - pad}" y1="${y(v)}" y2="${y(v)}" stroke="var(--rule)" stroke-width="${v % 5 ? .5 : 1}"/>`).join("")}
    <text x="2" y="${y(5) + 4}" font-size="10" fill="var(--muted)">5</text><text x="2" y="${y(0) + 4}" font-size="10" fill="var(--muted)">0</text>
    ${n > 1 ? `<polyline points="${pts}" fill="none" stroke="var(--ink)" stroke-width="2"/>` : ""}
    ${vals.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="var(--ink)"/>`).join("")}</svg>`;
}
function renderProgress(el){
  const hist = P.store.get(NS_HIST, []);
  if(!hist.length){ el.innerHTML = `<section class="sheet"><p>Zatím žádné sebehodnocení. Napiš úlohu a po odevzdání ji ohodnoť podle čtyř kritérií.</p><button class="btn primary" data-go>Vybrat úlohu</button></section>`; el.querySelector("[data-go]").onclick = () => P.go("writing", "tasks"); return; }
  const last = hist.slice(-12);
  const avg = id => (hist.reduce((a, h) => a + (h.scores[id] || 0), 0) / hist.length);
  const weakest = D().criteria.slice().sort((a, b) => avg(a.id) - avg(b.id))[0];
  el.innerHTML = `<section class="sheet"><div class="grid"><div class="stat"><b>${hist.length}</b><span>hodnocení</span></div><div class="stat"><b>${(hist.reduce((a, h) => a + h.sum, 0) / hist.length).toFixed(1)}</b><span>průměr z 20</span></div><div class="stat"><b>${esc(weakest.name.split(" ")[0])}</b><span>nejslabší kritérium</span></div></div>
    <div class="cats">${D().criteria.map(c => `<div class="cat wr-chart"><div class="top"><span>${esc(c.name)}</span><span>průměr ${avg(c.id).toFixed(1)} / 5</span></div><div class="track"><i class="${avg(c.id) < 3 ? "low" : ""}" style="width:${avg(c.id) * 20}%"></i></div>${chartSVG(last.map(h => h.scores[c.id] || 0), c.name)}</div>`).join("")}</div>
    <h3>Historie</h3><div class="wr-list">${hist.slice().reverse().slice(0, 30).map(h => { const t = findTask(h.id); return `<button class="wr-item" data-id="${esc(h.id)}"><span>${esc(h.day)} · ${esc(t ? t.title : h.id)}${h.mock ? " (mock)" : ""}</span><span>${h.sum}/20 · ${h.words} sl.</span></button>`; }).join("")}</div>
    <p class="note" style="margin-top:12px">Tip: zaměř se na „${esc(weakest.cz)}“ – ${esc(weakest.bands[5])}</p></section>`;
  el.querySelectorAll(".wr-item").forEach(b => b.onclick = () => P.go("writing", "t-" + b.dataset.id));
}

/* ---------- rewrite weak paragraphs ---------- */
function renderRewrite(el){
  const saved = P.store.get(NS_RW, {});
  el.innerHTML = `<p class="note">Přepiš slabý odstavec tak, aby odpovídal úrovni C1. Pak si zobraz vylepšenou verzi a porovnej.</p>` + D().rewrite.map(r => `<section class="sheet" style="margin-bottom:12px" data-rw="${esc(r.id)}">
    <span class="badge">${esc((D().lessons.find(l => l.id === r.type) || {}).title || r.type)}</span><p><b>${esc(r.task)}</b></p>
    <div class="wr-col" style="margin-bottom:8px">${esc(r.weak)}</div>
    <textarea class="field" style="min-height:120px" lang="en" aria-label="Tvoje přepsaná verze">${esc(saved[r.id] || "")}</textarea>
    <div class="row" style="margin-top:8px"><button class="btn ghost" data-show>Ukázat vylepšenou verzi</button><span class="note" data-wc></span></div>
    <div class="wr-col" data-better hidden style="margin-top:8px">${esc(r.better)}</div></section>`).join("");
  el.querySelectorAll("[data-rw]").forEach(sec => {
    const ta = sec.querySelector("textarea"), wc = sec.querySelector("[data-wc]");
    const upd = () => { wc.textContent = words(ta.value) + " slov"; };
    ta.addEventListener("input", () => { upd(); const s = P.store.get(NS_RW, {}); s[sec.dataset.rw] = ta.value; P.store.set(NS_RW, s); }); upd();
    sec.querySelector("[data-show]").onclick = () => { sec.querySelector("[data-better]").hidden = false; };
  });
}

/* ---------- mock: 90 minutes, Part 1 + choice of Part 2 ---------- */
function runMock(stage, finish){
  const p1 = Object.assign({part: 1, type: "essay", register: "neutral"}, shuffle(D().part1)[0]);
  const byType = {}; shuffle(D().part2).forEach(t => { const k = t.type === "email" ? "letter" : t.type; if(!byType[k]) byType[k] = t; });
  const choices = shuffle(Object.values(byType)).slice(0, 3).map(t => Object.assign({part: 2}, t));
  let p2 = null; const texts = {1: "", 2: ""}; let cur = 1, ended = false;
  stage.innerHTML = `<section class="sheet"><div class="meta"><span><b>Writing – zkouška nanečisto</b> · Part 1 + Part 2</span><span class="timer">90:00</span></div>
    <div class="sub-tabs"><button class="tab" data-p="1" aria-selected="true">Part 1</button><button class="tab" data-p="2" aria-selected="false">Part 2</button></div>
    <div data-pane></div><div class="row" style="margin-top:12px"><button class="btn primary" data-end>Ukončit a ohodnotit</button></div></section>`;
  const pane = stage.querySelector("[data-pane]");
  const timer = countdown(stage.querySelector(".timer"), 90 * 60, () => { P.toast("Čas vypršel"); end(); });
  const draw = () => {
    stage.querySelectorAll(".sub-tabs .tab").forEach(b => b.setAttribute("aria-selected", String(+b.dataset.p === cur)));
    if(cur === 2 && !p2){
      pane.innerHTML = `<p>Vyber <b>jednu</b> ze tří úloh (jako u skutečné zkoušky):</p>` + choices.map((t, i) => `<div class="wr-col" style="margin-bottom:10px"><span class="badge">${i + 2}. ${TYPE_CZ[t.type]}</span>${promptHTML(t)}<button class="btn ghost" data-pick="${i}">Vybrat tuto úlohu</button></div>`).join("");
      pane.querySelectorAll("[data-pick]").forEach(b => b.onclick = () => { p2 = choices[+b.dataset.pick]; draw(); });
      return;
    }
    const t = cur === 1 ? p1 : p2;
    pane.innerHTML = promptHTML(t) + editorHTML(t, texts[cur]);
    const ta = wireCounter(pane); ta.addEventListener("input", () => { texts[cur] = ta.value; });
  };
  stage.querySelectorAll(".sub-tabs .tab").forEach(b => b.onclick = () => { cur = +b.dataset.p; draw(); });
  draw();
  stage.querySelector("[data-end]").onclick = () => end();
  function end(){
    if(ended) return; ended = true; timer.stop();
    const parts = [[p1, texts[1]]].concat(p2 ? [[p2, texts[2]]] : []);
    stage.innerHTML = `<section class="sheet"><h2 style="margin-top:0">Sebehodnocení</h2><p class="note">Porovnej své texty s modelovými odpověďmi a ohodnoť každé kritérium 0–5.${p2 ? "" : " Part 2 jsi nevybral(a) – počítá se jako 0."}</p>
      ${parts.map(([t, tx], i) => `<div data-part="${i}"><h3>${t.part === 1 ? "Part 1 – Essay" : "Part 2 – " + TYPE_CZ[t.type]}: ${esc(t.title)}</h3>
        <div class="wr-compare"><div><p class="note">Tvůj text (${words(tx)} slov)</p><div class="wr-col">${tx.trim() ? paras(tx) : "<p><i>(prázdné)</i></p>"}</div></div><div><p class="note">Model</p><div class="wr-col">${modelHTML(t)}</div>${calloutsHTML(t)}</div></div>
        ${selfAssessHTML()}</div>`).join("")}
      <div class="row" style="margin-top:12px"><button class="btn primary" data-fin>Dokončit</button></div><p class="hint" data-msg aria-live="polite"></p></section>`;
    const getters = parts.map((_, i) => wireSelfAssess(stage.querySelector(`[data-part="${i}"]`)));
    stage.querySelector("[data-fin]").onclick = () => {
      const res = getters.map(g => g());
      if(res.some(r => !r)){ stage.querySelector("[data-msg]").textContent = "Ohodnoť všechna kritéria u obou částí."; return; }
      let total = 0; parts.forEach(([t, tx], i) => { total += saveResult(t, tx, res[i], {mock: true}); });
      stage.querySelector("[data-fin]").disabled = true;
      finish({selfScore: Math.round(100 * total / 40)});
    };
  }
}

P.register({
  id: "writing", title: "Writing", short: "Writing",
  blurb: "Esej (Part 1) a dopis, proposal, report, review (Part 2) – lekce, 50 zadání, modelové odpovědi, analyzátor.",
  render,
  progress(){ return {done: Object.keys(P.store.get(NS_DONE, {})).length, total: allTasks().length}; },
  mock: {paper: "Writing", minutes: 90, run: runMock}
});
})();
