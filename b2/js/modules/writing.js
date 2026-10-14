/* Writing module – B2 First Part 1 (compulsory essay: two notes + own idea) + Part 2 (article, email/letter, report, review).
   Adapted from the C1 module; own data (b2/js/data/writing.js), own progress (Portal.store -> "b2:" prefix). */
(function(){
"use strict";
const P = window.Portal; if(!P) return;
const {esc, countdown, todayStr, shuffle} = P.util;
const D = () => (window.DATA && window.DATA.writing) || {part1:[], part2:[], lessons:[], criteria:[], checklist:[], rewrite:[], typos:[], traps:[], tags:{}, format:{}};
const NS_DRAFT = "writing:drafts", NS_HIST = "writing:history", NS_DONE = "writing:done", NS_RW = "writing:rewrites", NS_FILTER = "writing:filter";
const WMIN = 140, WMAX = 190, MINUTES = 80, TASK_MIN = 40;
const TYPE_CZ = {essay:"Esej", article:"Článek", email:"E-mail", letter:"Dopis", report:"Report", review:"Recenze"};
const P1_INSTR = "Write an essay using all the notes and giving reasons for your point of view.";
const words = t => t.trim() ? t.trim().split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length : 0;
const allTasks = () => [...D().part1.map(t => Object.assign({part:1, type:"essay", register:"neutral"}, t)), ...D().part2.map(t => Object.assign({part:2}, t))];
const findTask = id => allTasks().find(t => t.id === id);
const paras = t => esc(t).split(/\n\s*\n/).map(p => "<p>" + p.replace(/\n/g, "<br>") + "</p>").join("");
const isMail = t => t.type === "email" || t.type === "letter";
const lessonFor = t => t.type === "essay" ? "essay" : isMail(t) ? (t.register === "informal" ? "email-informal" : "email-formal") : t.type;
const regCZ = r => r === "informal" ? "neformální registr" : r === "formal" ? "formální registr" : "neutrální registr";
const partLabel = t => t.part === 1 ? "Part 1 – Essay" : "Part 2 – " + TYPE_CZ[t.type];
const scaleEst = sum => P.util.scaleFor("writing", sum * 2, 40);

/* ---------- AI feedback (api/write-check.js – Google Gemini with the B2 First examiner brief) ---------- */
const NS_AI = "writing:ai";
const AI_CRIT = [["content", "content", "Content"], ["communicative", "ca", "Communicative Achievement"], ["organisation", "org", "Organisation"], ["language", "lang", "Language"]];
const ERR_CZ = {grammar: "gramatika", vocabulary: "slovní zásoba", spelling: "pravopis", punctuation: "interpunkce", register: "registr", "word order": "slovosled", collocation: "kolokace", cohesion: "návaznost", other: "jiné"};
const taskPayload = t => t.part === 1
  ? {part: 1, type: "essay", register: "neutral", title: t.title, context: t.context, question: t.question, points: t.points,
     task: (t.task || (D().format || {}).p1Instruction || P1_INSTR) + " Write about both notes and add a third idea of your own."}
  : {part: 2, type: t.type, register: t.register, title: t.title, prompt: [t.prompt, t.notice].filter(Boolean).join("\n\n"), require: t.require, instruction: t.instruction};
/* the learner's text with numbered marks for errors (red) and stilted phrases (yellow) */
function markedText(text, r){
  const spans = [];
  const put = (q, cls, label) => {
    const at = q ? text.indexOf(q) : -1; if(at < 0) return;
    if(spans.some(x => at < x.end && at + q.length > x.start)) return;
    spans.push({start: at, end: at + q.length, cls, label});
  };
  r.errors.forEach((e, i) => put(e.quote, "err", i + 1));
  r.stilted.forEach((e, i) => put(e.quote, "stl", "S" + (i + 1)));
  spans.sort((a, b) => a.start - b.start);
  let html = "", pos = 0;
  spans.forEach(x => { html += esc(text.slice(pos, x.start)) + `<mark class="${x.cls}">${esc(text.slice(x.start, x.end))}<sup>${x.label}</sup></mark>`; pos = x.end; });
  html += esc(text.slice(pos));
  return html.split(/\n\s*\n/).map(p => "<p>" + p.replace(/\n/g, "<br>") + "</p>").join("");
}
function aiHTML(r, text, meta){
  const scale = scaleEst(r.total);
  return `<section class="wb-ai"><h3>AI hodnocení <span class="badge">${esc(meta.when || "")}</span></h3>
    <p class="score">${r.total} / 20</p>
    <p class="note">Kdyby druhá úloha dopadla stejně: ≈ <b>${scale}</b> na Cambridge Scale (${esc(P.util.gradeFor(scale))}). Na B2 (160) stačí zhruba 12 bodů z 20 za každou úlohu.</p>
    ${r.summary ? `<p>${esc(r.summary)}</p>` : ""}
    <div class="wb-ai-crit">${AI_CRIT.map(([k, , name]) => `<div><b class="band">${r.scores[k].band}</b><b>${name}</b><br><span>${esc(r.scores[k].why)}</span></div>`).join("")}</div>
    <div class="row"><button class="btn ghost" data-ai-take>Převzít body do sebehodnocení</button></div>
    ${r.strengths.length ? `<h4>Co se povedlo</h4><ul>${r.strengths.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
    ${r.priorities.length ? `<h4>Na co se zaměřit příště</h4><ol>${r.priorities.map(x => `<li>${esc(x)}</li>`).join("")}</ol>` : ""}
    ${r.errors.length || r.stilted.length ? `<h4>Tvůj text</h4><p class="note"><mark class="err" style="padding:0 3px">červeně</mark> chyby, <mark class="stl" style="padding:0 3px">žlutě</mark> místa, která zní strojeně.</p><div class="wb-col">${markedText(text, r)}</div>` : ""}
    ${r.errors.length ? `<h4>Chyby (${r.errors.length})</h4><ol class="wb-errs">${r.errors.map(e => `<li><span class="badge">${esc(ERR_CZ[e.type] || e.type)}</span> <s>${esc(e.quote)}</s> → <b>${esc(e.fix)}</b><br><span class="note">${esc(e.why)}</span></li>`).join("")}</ol>` : `<p>Žádné výrazné chyby nenalezeny.</p>`}
    ${r.stilted.length ? `<h4>Zní strojeně</h4><ol class="wb-stl">${r.stilted.map((e, i) => `<li value="${i + 1}"><s>${esc(e.quote)}</s> → <b>${esc(e.natural)}</b><br><span class="note">${esc(e.why)}</span></li>`).join("")}</ol>` : ""}
    ${r.improved ? `<details><summary><b>Vylepšená verze</b> – tvoje myšlenky v přirozené angličtině B2</summary><div class="wb-col">${paras(r.improved)}</div></details>` : ""}
    <p class="note" style="margin-top:12px">Hodnotí AI (Google Gemini) podle kritérií B2 First – je to odhad, ne oficiální skóre.${meta.remaining != null ? ` Dnes zbývá ${meta.remaining} hodnocení.` : ""}</p>
  </section>`;
}
function wireAI(box, r, onTake){
  const b = box.querySelector("[data-ai-take]");
  if(b) b.onclick = () => onTake(Object.fromEntries(AI_CRIT.map(([k, id]) => [id, r.scores[k].band])));
}
async function runAI(box, t, text, btn, onTake){
  if(words(text) < 40){ P.toast("Na AI hodnocení napiš aspoň 40 slov."); return; }
  btn.disabled = true;
  box.innerHTML = `<section class="wb-ai"><p>Hodnotím… obvykle 10–40 sekund.</p></section>`;
  let r, j = null;
  try{
    r = await fetch("/api/write-check", {method: "POST", credentials: "same-origin", cache: "no-store",
      headers: {"Content-Type": "application/json"}, body: JSON.stringify({level: P.level, task: taskPayload(t), text})});
    try{ j = await r.json(); }catch(e){}
  }catch(e){ r = null; }
  btn.disabled = false;
  if(!box.isConnected) return;
  const msg = html => { box.innerHTML = `<section class="wb-ai"><p>${html}</p></section>`; };
  if(!r) return msg("Nepodařilo se spojit se serverem – jsi online?");
  if(r.status === 401) return msg("Pro AI hodnocení se přihlas Google účtem (tlačítko ☁ vpravo nahoře). Je to jen kvůli tomu, aby bezplatný limit nevyčerpal někdo cizí.");
  if(r.status === 503) return msg("AI hodnocení zatím není na serveru zapnuté. Chybí: " + esc(((j && j.missing) || []).join(", ")) + ".");
  if(r.status === 429) return msg(j && j.error === "limit" ? `Dnešní limit ${esc(j.daily)} AI hodnocení je vyčerpaný – zítra zase.` : "Bezplatná kvóta Gemini je teď vytížená. Zkus to za minutu.");
  if(r.status === 400 && j && j.error === "length") return msg(`Text má ${esc(j.words)} slov – AI hodnotí texty od 40 do 700 slov.`);
  if(r.status === 404 || r.status === 405) return msg("AI hodnocení tady není dostupné (běží jen na nasazeném webu). Ohodnoť se zatím sám/sama podle kritérií níže.");
  if(!r.ok || !j || !j.result){
    const d = (j && j.detail) || {}, g = d.gemini, m = String(d.message || "");
    const why = g === 402 || /credit|billing|prepay/i.test(m) ? "Klíč GEMINI_API_KEY nemá kredit – je z projektu se zapnutým placením. Vytvoř klíč v novém projektu v Google AI Studio (bez billingu = bezplatná verze), ulož ho na Vercel a dej Redeploy."
      : (g === 400 && /api key/i.test(m)) || d.reason === "API_KEY_INVALID" ? "Klíč GEMINI_API_KEY je neplatný – zkontroluj, že je na Vercelu celý a bez mezer, a dej Redeploy."
      : g === 403 ? "Klíč nemá přístup ke Gemini API (je omezený nebo je API v projektu vypnuté)."
      : g === 404 ? "Model nebyl nalezen – na Vercelu nastav GEMINI_MODEL např. na gemini-2.5-flash."
      : d.reason === "MAX_TOKENS" ? "Odpověď modelu byla useknutá – zkus to znovu, případně kratší text."
      : "";
    return msg("AI hodnocení se nepovedlo (" + r.status + (g ? ", Gemini " + esc(g) : "") + "). " + esc(why || m || "Zkus to znovu."));
  }
  const all = P.store.get(NS_AI, {});
  all[t.id] = {t: Date.now(), words: words(text), text, result: j.result};
  const keep = Object.entries(all).sort((a, b) => b[1].t - a[1].t).slice(0, 30);
  P.store.set(NS_AI, Object.fromEntries(keep));
  box.innerHTML = aiHTML(j.result, text, {when: "právě teď", remaining: j.remaining});
  wireAI(box, j.result, onTake);
  box.scrollIntoView({behavior: "smooth", block: "start"});
}

/* ---------- scoped styles (prefix wb-) ---------- */
if(!document.getElementById("wb-style")){
  const st = document.createElement("style"); st.id = "wb-style";
  st.textContent = `
.wb-ai{border:1.5px solid var(--ink);border-radius:8px;padding:14px 16px;margin:14px 0}
.wb-ai h3{margin-top:0}
.wb-ai .score{margin:0}
.wb-ai-crit{display:grid;gap:10px;margin:12px 0}
.wb-ai-crit div{border-top:1px solid var(--rule);padding-top:8px}
.wb-ai-crit b.band{display:inline-grid;place-items:center;min-width:28px;height:28px;border-radius:14px;background:var(--ink);color:var(--paper);margin-right:8px;font-family:var(--sans)}
.wb-ai mark.err{background:color-mix(in srgb,var(--red) 18%,transparent);color:inherit;border-bottom:2px solid var(--red)}
.wb-ai mark.stl{background:var(--hl);color:inherit}
.wb-ai mark sup{font-family:var(--sans);font-size:10px;font-weight:600;margin-left:1px}
.wb-ai .wb-col{font-family:var(--serif);font-size:16.5px;line-height:1.65;border:1px solid var(--rule);border-radius:6px;padding:8px 12px;margin:8px 0}
.wb-ai ol.wb-errs,.wb-ai ol.wb-stl{padding-left:22px;margin:6px 0 12px}
.wb-ai ol li{margin:0 0 8px}
.wb-ai s{text-decoration-color:var(--red);color:var(--muted)}
.wb-notes{border:1.5px solid var(--ink);border-radius:4px;padding:10px 14px;margin:10px 0}
.wb-notes ol{margin:4px 0 0;padding-left:22px}
.wb-notes .own{color:var(--muted);letter-spacing:.5px}
.wb-box{border:1.5px solid var(--ink);border-radius:4px;padding:10px 14px;margin:10px 0;white-space:normal}
.wb-box p{margin:0 0 6px}
.wb-box p:first-child{font-weight:600}
.wb-prompt{font-family:var(--serif);font-size:17.5px;line-height:1.55}
.wb-prompt .instr{font-weight:600}
.wb-req{font-size:14.5px;margin:6px 0 0;padding-left:20px;font-family:var(--sans)}
.wb-wc{font-variant-numeric:tabular-nums;font-weight:600;padding:2px 10px;border-radius:12px;border:1.5px solid var(--rule);font-size:14px}
.wb-wc.ok{border-color:var(--green);color:var(--green)} .wb-wc.near{border-color:#C98A00;color:#C98A00} .wb-wc.bad{border-color:var(--red);color:var(--red)}
.wb-ta{min-height:300px!important}
.wb-check label{display:flex;gap:8px;align-items:flex-start;margin:6px 0;font-size:15px}
.wb-an li{margin:4px 0;font-size:15px} .wb-an .good{color:var(--green)} .wb-an .warn{color:var(--red)} .wb-an .info{color:var(--muted)}
.wb-compare{display:grid;grid-template-columns:1fr;gap:12px}
@media(min-width:720px){.wb-compare{grid-template-columns:1fr 1fr}}
.wb-col{border:1px solid var(--rule);border-radius:6px;padding:12px 14px;font-family:var(--serif);font-size:16px;line-height:1.6;background:var(--sheet)}
.wb-col p{margin:0 0 10px}
.wb-col mark{background:var(--hl);color:inherit;padding:0 2px;border-radius:2px}
.wb-col mark sup{font-family:var(--sans);font-size:11px;font-weight:700;margin-left:2px}
.wb-callouts{margin:8px 0 0;padding-left:20px;font-size:14.5px} .wb-callouts li{margin:5px 0}
.wb-crit{border-top:1px solid var(--rule);padding:10px 0}
.wb-crit .scale{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}
.wb-crit details{font-size:14px;color:var(--muted)}
.wb-list{display:grid;gap:8px}
.wb-item{appearance:none;text-align:left;display:flex;justify-content:space-between;gap:10px;align-items:center;border:1px solid var(--rule);border-radius:6px;background:var(--sheet);color:var(--ink);padding:10px 12px;cursor:pointer;font:inherit}
.wb-item:hover{border-color:var(--ink)}
.wb-phr h4{margin:12px 0 4px;font-size:15px} .wb-phr ul{margin:0;padding-left:20px;font-family:var(--serif)}
.wb-mis{border-collapse:collapse;width:100%}
.wb-mis td{padding:4px 6px;vertical-align:top;font-size:14.5px;border-top:1px solid var(--rule)}
.wb-mis .b{color:var(--red);text-decoration:line-through} .wb-mis .g{color:var(--green)}
.wb-chart svg{width:100%;height:auto;display:block}
.wb-total{font-size:20px;font-weight:600;margin:8px 0 0}
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
  stage.innerHTML = subnav(active) + `<div class="wb-body"></div>`;
  wireNav(stage);
  const body = stage.querySelector(".wb-body");
  ({"": renderOverview, lessons: renderLessons, tasks: renderTasks, progress: renderProgress, rewrite: renderRewrite})[active](body);
}

/* ---------- overview ---------- */
function bandsHTML(c){
  return `<p><b>5:</b> ${esc(c.bands[5])}</p><p><b>3:</b> ${esc(c.bands[3])}</p><p><b>1:</b> ${esc(c.bands[1])}</p><p class="note">4 a 2 = mezistupně (část rysů pásma nad i pod), 0 = výkon pod úrovní pásma 1.</p>`;
}
function renderOverview(el){
  const f = D().format || {}; const done = P.store.get(NS_DONE, {}); const hist = P.store.get(NS_HIST, []);
  const n2 = t => D().part2.filter(x => t.includes(x.type)).length;
  el.innerHTML = `<section class="sheet">
    <h2 style="margin-top:0">Writing – 80 minut, 2 texty po 140–190 slovech</h2>
    <p>${esc(f.intro || "")}</p>
    ${(f.parts || []).map(p => `<p><b>${esc(p.name)}:</b> ${esc(p.text)}</p>`).join("")}
    <p class="note">${esc(f.criteria || "")}</p>
    <div class="grid"><div class="stat"><b>${Object.keys(done).length}</b><span>napsaných úloh z ${allTasks().length}</span></div>
      <div class="stat"><b>${hist.length}</b><span>sebehodnocení</span></div>
      <div class="stat"><b>${D().part1.length}+${D().part2.length}</b><span>zadání Part 1 + Part 2</span></div></div>
    <p class="note">Part 2: ${n2(["article"])} článků · ${n2(["email", "letter"])} e-mailů/dopisů · ${n2(["report"])} reportů · ${n2(["review"])} recenzí – každé s osnovou a modelovou odpovědí.</p>
    <div class="row"><button class="btn primary" data-go="tasks">Vybrat úlohu</button><button class="btn ghost" data-go="lessons">Lekce a fráze</button><button class="btn ghost" data-rand>Náhodná esej</button></div>
    <details style="margin-top:12px"><summary><b>Jak se hodnotí (B2 First, 0–5 v každém kritériu)</b></summary>
      ${D().criteria.map(c => `<div class="wb-crit"><b>${esc(c.name)}</b> <span class="note">(${esc(c.cz)})</span><div class="note">${esc(c.q)}</div>${bandsHTML(c)}</div>`).join("")}
    </details>
  </section>`;
  el.querySelectorAll("[data-go]").forEach(b => b.onclick = () => P.go("writing", b.dataset.go));
  el.querySelector("[data-rand]").onclick = () => { const p = shuffle(D().part1)[0]; if(p) P.go("writing", "t-" + p.id); };
}

/* ---------- lessons ---------- */
function renderLessons(el){
  el.innerHTML = `<div class="cards">${D().lessons.map(l => `<button class="card" data-id="${esc(l.id)}"><b>${esc(l.title)}</b><span>${esc(l.intro.slice(0, 110))}…</span></button>`).join("")}</div>`;
  el.querySelectorAll(".card").forEach(c => c.onclick = () => P.go("writing", "l-" + c.dataset.id));
}
function lessonTasks(l){
  return allTasks().filter(t => l.type === "essay" ? t.part === 1
    : l.type === "email" ? isMail(t) && (!l.reg || t.register === l.reg)
    : t.type === l.type);
}
function renderLesson(stage, id){
  const l = D().lessons.find(x => x.id === id);
  if(!l){ P.go("writing", "lessons"); return; }
  const tasks = lessonTasks(l);
  stage.innerHTML = subnav("lessons") + `<section class="sheet">
    <div class="meta"><button class="link-btn" data-back>← všechny lekce</button></div>
    <h2 style="margin-top:0">${esc(l.title)}</h2><p>${esc(l.intro)}</p>
    <h3>Struktura</h3><ol>${l.structure.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
    <h3>Registr</h3><p>${esc(l.register)}</p>
    <h3>Plán odstavců</h3><ol>${l.plan.map(p => `<li><b>${esc(p.h)}</b> – ${esc(p.t)}</li>`).join("")}</ol>
    ${l.tip ? `<p class="note"><b>Tip ke zkoušce:</b> ${esc(l.tip)}</p>` : ""}
    <h3>Banka frází</h3><div class="wb-phr">${l.phrases.map(g => `<h4>${esc(g.fn)}</h4><ul>${g.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`).join("")}</div>
    <h3>Časté chyby českých mluvčích</h3>
    <div style="overflow-x:auto"><table class="wb-mis"><tbody>${l.mistakes.map(m => `<tr><td class="b">${esc(m.bad)}</td><td class="g">${esc(m.good)}</td><td>${esc(m.why)}</td></tr>`).join("")}</tbody></table></div>
    <h3>Procvič (${tasks.length})</h3><div class="wb-list">${tasks.map(t => itemBtn(t)).join("")}</div>
  </section>`;
  wireNav(stage);
  stage.querySelector("[data-back]").onclick = () => P.go("writing", "lessons");
  stage.querySelectorAll(".wb-item").forEach(b => b.onclick = () => P.go("writing", "t-" + b.dataset.id));
}

/* ---------- task list ---------- */
function itemBtn(t){
  const done = P.store.get(NS_DONE, {})[t.id]; const draft = (P.store.get(NS_DRAFT, {})[t.id] || {}).text;
  const badge = t.part === 1 ? "Part 1" : TYPE_CZ[t.type] + (isMail(t) ? (t.register === "informal" ? " · neform." : " · formální") : "");
  return `<button class="wb-item" data-id="${esc(t.id)}"><span><span class="badge">${esc(badge)}</span> ${esc(t.title)}</span><span class="note">${done ? "✓ napsáno" : draft ? "koncept" : ""}</span></button>`;
}
function renderTasks(el){
  let filter = P.store.get(NS_FILTER, "all");
  const types = [["all", "Vše"], ["essay", "Part 1 esej"], ["article", "Článek"], ["email", "E-mail/dopis"], ["report", "Report"], ["review", "Recenze"]];
  if(!types.some(([k]) => k === filter)) filter = "all";
  const draw = () => {
    const list = allTasks().filter(t => filter === "all" || t.type === filter || (filter === "email" && isMail(t)));
    el.innerHTML = `<div class="chips" role="group" aria-label="Typ úlohy">${types.map(([k, l]) => `<button class="chip" data-f="${k}" aria-pressed="${k === filter}">${l}</button>`).join("")}</div><div class="wb-list">${list.map(itemBtn).join("")}</div>`;
    el.querySelectorAll(".chip").forEach(c => c.onclick = () => { filter = c.dataset.f; P.store.set(NS_FILTER, filter); draw(); });
    el.querySelectorAll(".wb-item").forEach(b => b.onclick = () => P.go("writing", "t-" + b.dataset.id));
  };
  draw();
}

/* ---------- prompt in exam layout ---------- */
function promptHTML(t, opts){
  opts = opts || {};
  if(t.part === 1) return `<div class="wb-prompt"><p class="note">You must answer this question. Write your answer in 140–190 words in an appropriate style.</p>
    <p>${esc(t.context)}</p>
    <p class="instr">${esc(t.task || (D().format || {}).p1Instruction || P1_INSTR)}</p>
    <div class="wb-notes"><b>${esc(t.question)}</b><p class="note" style="margin:8px 0 0">Notes</p><p style="margin:4px 0 0">Write about:</p>
      <ol>${t.points.map(p => `<li>${esc(p)}</li>`).join("")}<li><span class="own">…………………………</span> (your own idea)</li></ol></div></div>`;
  return `<div class="wb-prompt"><p class="note">Write your answer in 140–190 words in an appropriate style.</p>
    ${paras(t.prompt)}${t.notice ? `<div class="wb-box">${paras(t.notice)}</div>` : ""}
    <p class="instr">${esc(t.instruction)}</p>
    ${opts.req !== false && t.require ? `<details><summary class="note">Obsahové body, které musíš pokrýt (${t.require.length})</summary><ul class="wb-req">${t.require.map(r => `<li>${esc(r)}</li>`).join("")}</ul></details>` : ""}</div>`;
}

/* ---------- heuristic analyzer (B2: clear, accurate, natural – never pushes over-formal style) ---------- */
const LINKERS = ["however","also","in addition","what is more","as well as","although","even though","though","whereas","while","despite","in spite of","on the other hand","on top of that","because","since","as a result","so that","therefore","this means","firstly","first of all","to begin with","secondly","finally","lastly","for example","for instance","such as","in particular","especially","as long as","unless","otherwise","instead","in my opinion","in my view","personally","in conclusion","to sum up","all in all","overall","to conclude","besides","apart from","anyway","actually","of course","after all","in fact","so","then","at first","in the end","after that","having said that","as for","that is why","that's why","by contrast","in contrast","when it comes to","not only","on the negative side","on the positive side","if","when","another","instead","as well","the only","once","until","whenever","which means"];
const CONTR = /\b(?:don't|doesn't|didn't|can't|won't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|wouldn't|shouldn't|couldn't|i'm|i've|i'd|i'll|you're|we're|they're|it's|that's|there's|let's|we'll|you'll|they'll|he's|she's|what's|you've|we've|they've)\b/gi;
const STOP = new Set("the a an and or but of to in on at for with by from as is are was were be been being it this that these those which who whom whose what when where why how not no can could would should may might must will shall do does did have has had their there they them its his her our your you we i he she my me us than then also very more most some such into about over only other so if just because people really think".split(" "));
const IRREG = "done|made|given|taken|seen|known|shown|built|held|found|thought|brought|bought|taught|told|said|paid|sent|spent|kept|left|lost|met|put|set|run|cut|chosen|spoken|written|driven|eaten|grown|drawn|thrown|broken|forgotten|hidden|understood|sold|won|worn|born".split("|");
const OWN_SIGNAL = /\b(another (?:important |key |big |good )?(?:point|reason|thing|factor|advantage|disadvantage|issue|aspect|benefit|problem)|apart from|a further|one more|something (?:else|people often forget)|there is also|it is also worth|we should also (?:think|consider)|in addition to this|we must not forget)\b/i;
function analyze(text, task){
  const out = []; const add = (cls, msg) => out.push({cls, msg});
  /* a title/heading: short line without a full stop (a title may end with ? or !) */
  const shortHead = l => l.length < 80 && !/[.,:;]$/.test(l) && words(l) > 0 && words(l) <= 12;
  const t0 = v => String(v || "").toLowerCase();
  const n = words(text);
  add(n >= WMIN && n <= WMAX ? "good" : "warn", `Počet slov: ${n} (cíl ${WMIN}–${WMAX}).` + (n < WMIN ? " Text je krátký – nejspíš některý bod zadání není dost rozvinutý (to stojí body v Content)." : n > WMAX ? " Text je delší – zkrať opakování. Delší text není lepší: roste riziko chyb a odbočení od tématu." : ""));
  const ps = text.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
  const pc = ps.length > 1 ? ps.length : text.split(/\n/).filter(s => s.trim()).length;
  const minP = task.part === 1 ? 4 : 3;
  add(pc >= minP ? "good" : "warn", `Odstavce: ${pc}. ${pc >= minP ? "Členění v pořádku." : "Doporučeno alespoň " + minP + " odstavce (oddělené prázdným řádkem) – zkoušející hodnotí i Organisation."}`);
  const sents = text.replace(/\n+/g, " ").split(/(?<=[.!?])\s+/).map(s => words(s)).filter(x => x > 0);
  if(sents.length > 2){
    const avg = sents.reduce((a, b) => a + b, 0) / sents.length;
    const sd = Math.sqrt(sents.reduce((a, b) => a + (b - avg) ** 2, 0) / sents.length);
    add(avg <= 24 && avg >= 8 && sd >= 3 ? "good" : "warn", `Věty: ${sents.length}, průměrná délka ${avg.toFixed(1)} slov. ` +
      (avg > 24 ? "Věty jsou hodně dlouhé – na B2 je lepší kratší a přesná souvětí než dlouhé řetězy s chybami." : avg < 8 ? "Hodně krátkých vět – spoj některé pomocí because, although, which, so…" : sd < 3 ? "Věty mají podobnou délku – střídej krátké a delší souvětí." : "Dobrá variace délky vět."));
  }
  /* repetition: headings/titles are ignored, and words from the task itself (the topic) may naturally recur more often */
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const body = lines.filter(l => !shortHead(l)).join(" ");
  const stem = w => w.length > 4 ? w.replace(/s$/, "") : w;
  const taskWords = new Set(([t0(task.question), t0(task.title), t0(task.prompt), t0(task.notice), ...(task.points || []).map(t0), ...(task.require || []).map(t0), ...lines.filter(shortHead).map(t0)].join(" ").match(/[a-z]+/g) || []).map(stem));
  const lw = (body.toLowerCase().match(/[a-z']+/g) || []).filter(w => !w.includes("'"));
  const freq = {}; lw.forEach(w => { if(w.length >= 4 && !STOP.has(w)) freq[w] = (freq[w] || 0) + 1; });
  const rep = Object.entries(freq).filter(([w, c]) => c >= (taskWords.has(stem(w)) ? 10 : 5)).sort((a, b) => b[1] - a[1]).slice(0, 6);
  if(rep.length) add("warn", "Často opakovaná slova: " + rep.map(([w, c]) => `${w} (${c}×)`).join(", ") + ". Zkus synonymum nebo zájmeno (it, this, they…).");
  const low = " " + text.toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ") + " ";
  const used = LINKERS.filter(l => new RegExp("\\b" + l.replace(/ /g, "\\s+") + "\\b").test(low));
  add(used.length >= 3 ? "good" : "warn", `Různé spojovací výrazy: ${used.length}${used.length ? " (" + used.slice(0, 10).join(", ") + ")" : ""}. ${used.length >= 3 ? "" : "Přidej pár přirozených spojek: however, although, because, so, for example, on the other hand."}`);
  /* examiners mark down mechanical, over-formal linking – B2 is about clear, natural English */
  const heavy = (low.match(/\b(moreover|furthermore|nevertheless|nonetheless|consequently|thus|hence|whereby|albeit|notwithstanding)\b/g) || []).length;
  if(heavy > 2) add("warn", `Knižní spojky (moreover, furthermore, nevertheless…) ${heavy}× – na text o 170 slovech je to moc a zní to strojeně. Stačí however, also, so, but, what is more.`);
  const formalish = task.register === "formal" || task.type === "essay" || task.type === "report";
  const cons = low.match(CONTR) || [];
  if(formalish && cons.length) add("warn", `Stažené tvary ${task.register === "formal" ? "ve formálním" : "v neutrálním"} textu: ${[...new Set(cons)].join(", ")} → ${task.type === "essay" ? "v eseji" : task.type === "report" ? "v reportu" : "ve formálním dopise"} raději plné tvary (do not, it is).`);
  if(task.register === "informal" && !cons.length) add("warn", "E-mail kamarádovi bez stažených tvarů zní strojeně – piš I’m, you’ll, don’t, it’s…");
  if(formalish && /\b(gonna|wanna|gotta|kids|stuff|guys|cool|awesome|super)\b|!{2,}/i.test(text)) add("warn", "Hovorové výrazy (kids, stuff, gonna, cool…) nebo vícenásobné vykřičníky do tohoto typu textu nepatří.");
  if(task.register === "informal" && /\b(gonna|wanna|u|ur|lol|btw|omg)\b/i.test(text)) add("warn", "Neformální neznamená SMS styl – gonna/wanna/u/lol do e-mailu u zkoušky nepiš.");
  const op = (low.match(/\bin my opinion\b|\bi think\b/g) || []).length;
  if(op > 2) add("warn", `„In my opinion / I think“ ${op}× – střídej: I believe…, In my view…, Personally, …, I'm sure that…${task.register === "informal" ? ", I'd say…" : ""}`);
  const pas = (low.match(new RegExp("\\b(?:am|is|are|was|were|be|been|being)\\s+(?:\\w+ly\\s+)?(?:\\w+ed|" + IRREG.join("|") + ")\\b", "g")) || []).length;
  const cond = (low.match(/\bif\b|\bunless\b|\bas long as\b|\bwould\b|\b\w+'d\b/g) || []).length;
  const rel = (low.match(/\b(who|which|whose)\b|, where\b/g) || []).length;
  const sub = (low.match(/\b(because|although|even though|when|while|whenever|unless|so that|as soon as|once|until)\b/g) || []).length;
  const inv = text.split(/(?<=[.!?])\s+|\n/).filter(s => /^\s*(Not only|Never (have|has|had|did|do|will|would)|Rarely|Seldom|Only (when|by|if|once|after|then)|Little (did|do)|Hardly (had|did)|No sooner|Under no circumstances|Not until|At no time|Nowhere|Were (I|we|you|they|he|she|it|this|these)|Had (I|we|you|they|he|she|it))\b/.test(s)).length;
  const cleft = (text.match(/\bWhat [^.?!]{3,60}\b(is|was)\b|\bIt (is|was) [^.?!]{2,60} (that|who) /g) || []).length;
  const simple = rel + cond + sub < 2;
  add(inv > 1 || simple ? "warn" : "good", `Struktury: vztažné věty (who/which/where) ${rel}, podmínky/would ~${cond}, vedlejší věty (because, when, although…) ${sub}, trpný rod ~${pas}${inv ? `, inverze ${inv}` : ""}. ` +
    (inv > 1 ? "Inverze na B2 vůbec nepotřebuješ – zní vyumělkovaně a snadno se v nich udělá chyba. Napiš to normálním slovosledem."
      : simple ? "Přidej pár souvětí: vztažnou větu (…, which is…) nebo podmínku (If…, …would…). Na B2 stačí, když jsou přesné."
      : "Dobrá škála. Na Language 5 nepotřebuješ vzácná slova ani inverze – rozhoduje přesnost a přirozenost." + (cleft > 1 ? " (Vytýkací věty What I like… jsou fajn, ale ne víc než jednou.)" : "")));
  const typos = (D().typos || []).filter(([w]) => new RegExp("\\b" + w + "\\b", "i").test(text));
  if(typos.length) add("warn", "Možné překlepy: " + typos.map(([w, r]) => `${w} → ${r}`).join(", ") + ".");
  (D().traps || []).forEach(([re, tip, kind]) => {
    const isCaps = /english\|czech/.test(re);
    let m = null; try{ m = text.match(new RegExp(re, isCaps ? "g" : "gi")); }catch(e){}
    if(m) add(kind === "info" ? "info" : "warn", (isCaps ? `Malé písmeno: ${[...new Set(m)].join(", ")}. ` : kind === "info" ? `Zkontroluj význam „${m[0]}“: ` : `„${m[0]}“: `) + tip);
  });
  if(task.type === "report"){
    const heads = lines.filter(shortHead).length;
    add(heads >= 3 ? "good" : "warn", heads >= 3 ? `Nadpisy: ${heads} – report má jasnou strukturu.` : "Report potřebuje nadpis a podnadpisy sekcí (Introduction, …, Recommendations).");
    if(/\bi (hate|love)\b/i.test(text)) add("warn", "Report je věcný: místo I hate/I love napiš Most students said… / Many people complained that…");
  }
  if(task.type === "article"){
    add(lines[0] && shortHead(lines[0]) ? "good" : "warn", lines[0] && shortHead(lines[0]) ? `Nadpis: „${lines[0]}“.` : "Článek by měl mít krátký poutavý nadpis na prvním řádku (bez tečky).");
    add(/\?/.test(text) && /\byou(r)?\b/i.test(text) ? "good" : "warn", /\?/.test(text) && /\byou(r)?\b/i.test(text) ? "Oslovuješ čtenáře (otázka, you) – článek je živý." : "Osloví čtenáře: otázka v úvodu nebo závěru (Have you ever…? Why not try…?) a přímé „you“.");
  }
  if(task.type === "review"){
    add(/recommend|worth|must-see|don't miss|do not miss|give it a miss|ideal for|perfect for|suitable for/i.test(text) ? "good" : "warn",
      /recommend|worth|must-see|don't miss|do not miss|give it a miss|ideal for|perfect for|suitable for/i.test(text) ? "Recenze obsahuje doporučení." : "Recenze musí skončit jasným doporučením: I would recommend it to… / It's well worth… / It's ideal for…");
  }
  if(isMail(task)){
    if(!/^\s*(Dear|Hi|Hello|Hey)\b/.test(text)) add("warn", "Chybí oslovení (Dear… / Hi…).");
    if(task.register === "formal"){
      if(/Dear Sir or Madam/i.test(text) && /Yours sincerely/i.test(text)) add("warn", "Dear Sir or Madam → Yours faithfully (ne sincerely).");
      if(/Dear (Mr|Mrs|Ms|Miss)\b/.test(text) && /Yours faithfully/i.test(text)) add("warn", "Dear Mr/Ms + příjmení → Yours sincerely (faithfully jen po Dear Sir or Madam).");
      if(!/Yours (faithfully|sincerely)|Kind regards|Best regards/i.test(text)) add("warn", "Chybí formální rozloučení (Yours faithfully / Yours sincerely + celé jméno).");
      if(/^\s*(Hi|Hello|Hey)\b/.test(text)) add("warn", "Hi/Hello je neformální oslovení – ve formálním dopise piš Dear…");
    } else {
      if(/Yours (faithfully|sincerely)/i.test(text)) add("warn", "Yours faithfully/sincerely je formální – kamarádovi napiš Best wishes, Love, Take care, See you soon…");
      if(!/(love|best wishes|take care|see you|all the best|speak soon|write soon|bye|cheers|best,|hugs)/i.test(lines.slice(-3).join(" "))) add("warn", "Chybí neformální rozloučení na konci (Best wishes / Take care / See you soon + jméno).");
    }
  }
  if(task.part === 1){
    const hit = task.points.filter(p => p.toLowerCase().split(/\W+/).filter(w => w.length >= 4 && !STOP.has(w)).some(w => low.includes(w.slice(0, 5))));
    add(hit.length === task.points.length ? "good" : "warn", `Poznámky ze zadání zmíněné v textu (odhad): ${hit.length ? hit.map(h => "„" + h + "“").join(", ") : "žádná"}. ${hit.length === task.points.length ? "" : "Esej musí rozebrat OBĚ poznámky."}`);
    const own = OWN_SIGNAL.exec(text);
    add(own || pc >= 5 ? "good" : "warn", own || pc >= 5
      ? `Vlastní (třetí) bod: ${own ? "našel jsem signál „" + own[0] + "“" : "počet odstavců odpovídá struktuře úvod + 3 body + závěr"} (odhad). Ověř, že se opravdu liší od obou poznámek.`
      : "Nevidím jasně tvůj vlastní (třetí) bod. Bez něj ztrácíš body v Content – dej mu vlastní odstavec a uveď ho např. „Another important point is…“.");
    add(/\bin my (opinion|view)\b|\bi (strongly )?(believe|think|feel|agree|disagree)\b|\bpersonally\b|\bi am (convinced|in favour|against|sure)\b|\bi would (argue|say)\b|\bas far as i am concerned\b/i.test(text) ? "good" : "warn",
      /\bin my (opinion|view)\b|\bi (strongly )?(believe|think|feel|agree|disagree)\b|\bpersonally\b|\bi am (convinced|in favour|against|sure)\b|\bi would (argue|say)\b|\bas far as i am concerned\b/i.test(text) ? "Názor je vyjádřený (zadání chce „giving reasons for your point of view“)." : "Chybí jasně vyjádřený názor – zadání chce tvůj postoj s důvody (In my opinion…, I believe…), nejlépe v úvodu i závěru.");
  }
  return out;
}
function analysisHTML(items){
  return `<p class="note">⚠ Jde o heuristickou kontrolu (počítání, vzory), ne o hodnocení zkoušejícího. Obsah, logiku a přesnost posuď podle kritérií – nebo použij AI hodnocení.</p><ul class="wb-an">${items.map(i => `<li class="${i.cls}">${i.cls === "good" ? "✓" : i.cls === "info" ? "ℹ" : "•"} ${esc(i.msg)}</li>`).join("")}</ul>`;
}

/* ---------- model with highlighted callouts ---------- */
function modelHTML(t){
  let html = esc(t.model); const tags = D().tags || {};
  (t.callouts || []).forEach((c, i) => { const q = esc(c.q); const at = html.indexOf(q); if(at >= 0) html = html.slice(0, at) + `<mark title="${esc(tags[c.tag] || c.tag)}">${q}<sup>${i + 1}</sup></mark>` + html.slice(at + q.length); });
  return html.split(/\n\s*\n/).map(p => "<p>" + p.replace(/\n/g, "<br>") + "</p>").join("");
}
function calloutsHTML(t){
  const tags = D().tags || {};
  return `<ol class="wb-callouts">${(t.callouts || []).map(c => `<li><b>${esc(tags[c.tag] || c.tag)}</b>: ${esc(c.cz)}</li>`).join("")}</ol>`;
}

/* ---------- self-assessment form (B2 First descriptors, 0–5 each, /20 per task) ---------- */
function selfAssessHTML(){
  return D().criteria.map(c => `<div class="wb-crit" data-crit="${esc(c.id)}"><b>${esc(c.name)}</b> <span class="note">(${esc(c.cz)})</span><div class="note">${esc(c.q)}</div>
    <div class="scale" role="radiogroup" aria-label="${esc(c.name)}">${[0,1,2,3,4,5].map(v => `<button type="button" class="chip" role="radio" data-v="${v}" aria-checked="false" aria-pressed="false">${v}</button>`).join("")}</div>
    <details><summary>Jak vypadá 5 / 3 / 1 (B2 First)</summary>${bandsHTML(c)}</details></div>`).join("") + `<p class="wb-total" aria-live="polite" data-total>Celkem: – / 20</p>`;
}
function wireSelfAssess(root){
  const total = root.querySelector("[data-total]");
  const read = () => { const s = {}; let ok = true; root.querySelectorAll(".wb-crit[data-crit]").forEach(c => { const p = c.querySelector('.chip[aria-pressed="true"]'); if(!p) ok = false; else s[c.dataset.crit] = +p.dataset.v; }); return {s, ok}; };
  const upd = () => { const {s, ok} = read(); const sum = Object.values(s).reduce((a, b) => a + b, 0);
    if(total) total.textContent = ok ? `Celkem: ${sum} / 20 · ≈ ${scaleEst(sum)} na Cambridge Scale (${P.util.gradeFor(scaleEst(sum))})` : `Celkem: ${Object.keys(s).length ? sum : "–"} / 20`; };
  root.querySelectorAll(".wb-crit .scale").forEach(sc => sc.querySelectorAll(".chip").forEach(b => b.onclick = () => {
    sc.querySelectorAll(".chip").forEach(x => { x.setAttribute("aria-pressed", String(x === b)); x.setAttribute("aria-checked", String(x === b)); });
    upd();
  }));
  const get = () => { const {s, ok} = read(); return ok ? s : null; };
  get.refresh = upd;
  return get;
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
  return `<div class="meta"><span><span class="badge">${esc(partLabel(t))}</span> ${esc(regCZ(t.register))}</span><span class="wb-wc" aria-live="polite">0 slov</span></div>
    <label class="note" for="wb-ta-${esc(t.id)}">Tvůj text (odstavce odděl prázdným řádkem)</label>
    <textarea id="wb-ta-${esc(t.id)}" class="field wb-ta" spellcheck="false" lang="en">${esc(draft || "")}</textarea>`;
}
function wireCounter(root, onInput){
  const ta = root.querySelector("textarea"), wc = root.querySelector(".wb-wc");
  const upd = () => { const n = words(ta.value); wc.textContent = n + " " + P.util.plural(n) + " / " + WMIN + "–" + WMAX;
    wc.className = "wb-wc " + (n >= WMIN && n <= WMAX ? "ok" : (n >= 120 && n < WMIN) || (n > WMAX && n <= 210) ? "near" : n ? "bad" : ""); };
  let tm; ta.addEventListener("input", () => { upd(); clearTimeout(tm); tm = setTimeout(() => onInput && onInput(ta.value), 600); });
  upd(); return ta;
}

function renderTask(stage, id){
  const t = findTask(id);
  if(!t){ stage.innerHTML = subnav("tasks") + `<section class="sheet"><p>Úloha nenalezena.</p></section>`; wireNav(stage); return; }
  const drafts = P.store.get(NS_DRAFT, {});
  stage.innerHTML = subnav("tasks") + `<section class="sheet">
    <div class="meta"><button class="link-btn" data-back>← zpět na úlohy</button><span class="row"><span class="timer" hidden>${TASK_MIN}:00</span><button class="btn ghost" data-timer style="min-height:36px">⏱ ${TASK_MIN} min</button></span></div>
    <h2 style="margin-top:0">${esc(t.title)}</h2>${promptHTML(t)}
    <details><summary><b>Osnova (CZ)</b> – plán odstavec po odstavci</summary><ol>${t.scaffold.map(s => `<li><b>${esc(s.h)}</b>: ${esc(s.t)}</li>`).join("")}</ol></details>
    ${t.part === 1 && t.ownIdeas ? `<details><summary><b>Nápady na vlastní (3.) bod</b></summary><p class="note">Vyber jeden – nebo vymysli svůj. Musí se lišit od obou poznámek.</p><ul>${t.ownIdeas.map(x => `<li lang="en">${esc(x)}</li>`).join("")}</ul></details>` : ""}
    <details><summary><b>Lekce k tomuto typu textu</b></summary><p><button class="link-btn" data-lesson>Otevřít lekci a banku frází</button></p></details>
    <div style="margin-top:14px">${editorHTML(t, (drafts[t.id] || {}).text)}</div>
    <p class="note" data-saved aria-live="polite"></p>
    <h3>Kontrola před odevzdáním</h3><div class="wb-check">${D().checklist.map((c, i) => `<label><input type="checkbox" data-ck="${i}"> <span>${esc(c)}</span></label>`).join("")}</div>
    <div class="row" style="margin-top:10px"><button class="btn ghost" data-an>Analyzovat (heuristika)</button><button class="btn ghost" data-ai>✨ Ohodnotit AI</button><button class="btn primary" data-submit>Odevzdat a porovnat</button></div>
    <div data-ai-out aria-live="polite"></div>
    <div data-anout aria-live="polite" style="margin-top:12px"></div>
    <div data-result></div></section>`;
  wireNav(stage);
  stage.querySelector("[data-back]").onclick = () => P.go("writing", "tasks");
  stage.querySelector("[data-lesson]").onclick = () => P.go("writing", "l-" + lessonFor(t));
  const savedEl = stage.querySelector("[data-saved]");
  const ta = wireCounter(stage, v => { const d = P.store.get(NS_DRAFT, {}); d[t.id] = {text: v, t: Date.now()}; P.store.set(NS_DRAFT, d); savedEl.textContent = "Koncept uložen " + new Date().toLocaleTimeString("cs-CZ"); });
  let timer = null;
  stage.querySelector("[data-timer]").onclick = e => {
    const el = stage.querySelector(".timer"); el.hidden = false;
    if(timer) timer.stop();
    timer = countdown(el, TASK_MIN * 60, () => P.toast("Čas vypršel – dokonči a zkontroluj text."));
    e.currentTarget.textContent = "⏱ restart";
  };
  const anOut = stage.querySelector("[data-anout]");
  stage.querySelector("[data-an]").onclick = () => { anOut.innerHTML = `<h3>Heuristická zpětná vazba</h3>` + analysisHTML(analyze(ta.value, t)); };
  /* AI feedback: "take the marks" opens the self-assessment (if needed) and pre-selects the AI bands */
  const aiOut = stage.querySelector("[data-ai-out]"), resBox = stage.querySelector("[data-result]");
  let getScores = null;
  const takeMarks = bands => {
    if(!resBox.querySelector(".wb-crit")) getScores = showResult(resBox, t, ta.value);
    Object.entries(bands).forEach(([cid, v]) => resBox.querySelectorAll(`.wb-crit[data-crit="${cid}"] .chip`).forEach(c => { c.setAttribute("aria-pressed", String(+c.dataset.v === v)); c.setAttribute("aria-checked", String(+c.dataset.v === v)); }));
    if(getScores && getScores.refresh) getScores.refresh();
    resBox.querySelector(".wb-crit").scrollIntoView({behavior: "smooth", block: "start"});
    P.toast("Body z AI předvyplněné – uprav je, pokud nesouhlasíš, a ulož.");
  };
  stage.querySelector("[data-ai]").onclick = e => runAI(aiOut, t, ta.value, e.currentTarget, takeMarks);
  const lastAI = P.store.get(NS_AI, {})[t.id];
  if(lastAI && lastAI.result){
    aiOut.innerHTML = `<p class="note">Poslední AI hodnocení: ${esc(lastAI.result.total)}/20 (${new Date(lastAI.t).toLocaleDateString("cs-CZ")}) · <button class="link-btn" data-ai-last>zobrazit</button></p>`;
    aiOut.querySelector("[data-ai-last]").onclick = () => { aiOut.innerHTML = aiHTML(lastAI.result, lastAI.text || ta.value, {when: new Date(lastAI.t).toLocaleString("cs-CZ")}); wireAI(aiOut, lastAI.result, takeMarks); };
  }
  stage.querySelector("[data-submit]").onclick = () => {
    if(words(ta.value) < 40){ P.toast("Napiš nejdřív aspoň 40 slov."); return; }
    if(timer) timer.stop();
    anOut.innerHTML = `<h3>Heuristická zpětná vazba</h3>` + analysisHTML(analyze(ta.value, t));
    getScores = showResult(resBox, t, ta.value);
  };
}

function showResult(box, t, text){
  box.innerHTML = `<h3>Srovnání s modelovou odpovědí</h3>
    <div class="wb-compare"><div><p class="note">Tvůj text (${words(text)} slov)</p><div class="wb-col">${paras(text)}</div></div>
    <div><p class="note">Modelová odpověď – silný kandidát B2, band 5 (${words(t.model)} slov)</p><div class="wb-col" lang="en">${modelHTML(t)}</div>${calloutsHTML(t)}</div></div>
    <h3>Sebehodnocení podle kritérií B2 First (0–5)</h3>${selfAssessHTML()}
    <div class="row" style="margin-top:10px"><button class="btn primary" data-save>Uložit hodnocení</button></div><p class="hint" aria-live="polite" data-msg></p>`;
  const get = wireSelfAssess(box);
  box.querySelector("[data-save]").onclick = () => {
    const s = get(); if(!s){ box.querySelector("[data-msg]").textContent = "Ohodnoť všechna čtyři kritéria."; return; }
    const sum = saveResult(t, text, s);
    box.querySelector("[data-msg]").textContent = `Uloženo: ${sum}/20 (≈ ${scaleEst(sum)} na Cambridge Scale, ${P.util.gradeFor(scaleEst(sum))}). Vývoj najdeš v záložce Hodnocení.`;
    box.querySelector("[data-save]").disabled = true; P.toast("Hodnocení uloženo");
  };
  box.scrollIntoView({behavior: "smooth", block: "start"});
  return get;
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
  const hist = P.store.get(NS_HIST, []).filter(h => h && h.scores);
  if(!hist.length){ el.innerHTML = `<section class="sheet"><p>Zatím žádné sebehodnocení. Napiš úlohu a po odevzdání ji ohodnoť podle čtyř kritérií.</p><button class="btn primary" data-go>Vybrat úlohu</button></section>`; el.querySelector("[data-go]").onclick = () => P.go("writing", "tasks"); return; }
  const last = hist.slice(-12);
  const avg = id => (hist.reduce((a, h) => a + (h.scores[id] || 0), 0) / hist.length);
  const mean = hist.reduce((a, h) => a + h.sum, 0) / hist.length;
  const weakest = D().criteria.slice().sort((a, b) => avg(a.id) - avg(b.id))[0];
  el.innerHTML = `<section class="sheet"><div class="grid"><div class="stat"><b>${hist.length}</b><span>hodnocení</span></div><div class="stat"><b>${mean.toFixed(1)}</b><span>průměr z 20 (≈ ${scaleEst(mean)})</span></div><div class="stat"><b>${esc(weakest.name.split(" ")[0])}</b><span>nejslabší kritérium</span></div></div>
    <div class="cats">${D().criteria.map(c => `<div class="cat wb-chart"><div class="top"><span>${esc(c.name)}</span><span>průměr ${avg(c.id).toFixed(1)} / 5</span></div><div class="track"><i class="${avg(c.id) < 3 ? "low" : ""}" style="width:${avg(c.id) * 20}%"></i></div>${chartSVG(last.map(h => h.scores[c.id] || 0), c.name)}</div>`).join("")}</div>
    <h3>Historie</h3><div class="wb-list">${hist.slice().reverse().slice(0, 30).map(h => { const t = findTask(h.id); return `<button class="wb-item" data-id="${esc(h.id)}"><span>${esc(h.day)} · ${esc(t ? t.title : h.id)}${h.mock ? " (mock)" : ""}</span><span>${esc(h.sum)}/20 · ${esc(h.words)} sl.</span></button>`; }).join("")}</div>
    <p class="note" style="margin-top:12px">Tip: zaměř se na „${esc(weakest.cz)}“ – ${esc(weakest.bands[5])}</p></section>`;
  el.querySelectorAll(".wb-item").forEach(b => b.onclick = () => P.go("writing", "t-" + b.dataset.id));
}

/* ---------- rewrite weak paragraphs ---------- */
function renderRewrite(el){
  const saved = P.store.get(NS_RW, {});
  el.innerHTML = `<p class="note">Přepiš slabý odstavec tak, aby zněl jako silný kandidát B2 – jasně, přesně a přirozeně (ne knižně). Pak si zobraz vylepšenou verzi a porovnej.</p>` + D().rewrite.map(r => `<section class="sheet" style="margin-bottom:12px" data-rw="${esc(r.id)}">
    <span class="badge">${esc((D().lessons.find(l => l.id === r.type) || {}).title || r.type)}</span><p><b>${esc(r.task)}</b></p>
    <div class="wb-col" style="margin-bottom:8px" lang="en">${paras(r.weak)}</div>
    <textarea class="field" style="min-height:120px" lang="en" aria-label="Tvoje přepsaná verze">${esc(saved[r.id] || "")}</textarea>
    <div class="row" style="margin-top:8px"><button class="btn ghost" data-show>Ukázat vylepšenou verzi</button><span class="note" data-wc></span></div>
    <div data-better hidden style="margin-top:8px"><div class="wb-col" lang="en">${paras(r.better)}</div>${r.why ? `<p class="note">${esc(r.why)}</p>` : ""}</div></section>`).join("");
  el.querySelectorAll("[data-rw]").forEach(sec => {
    const ta = sec.querySelector("textarea"), wc = sec.querySelector("[data-wc]");
    const upd = () => { const n = words(ta.value); wc.textContent = n + " " + P.util.plural(n); };
    ta.addEventListener("input", () => { upd(); const s = P.store.get(NS_RW, {}); s[sec.dataset.rw] = ta.value; P.store.set(NS_RW, s); }); upd();
    sec.querySelector("[data-show]").onclick = () => { sec.querySelector("[data-better]").hidden = false; };
  });
}

/* ---------- mock: 80 minutes, Part 1 + one of three Part 2 tasks ---------- */
function runMock(stage, finish){
  const p1 = Object.assign({part: 1, type: "essay", register: "neutral"}, shuffle(D().part1)[0]);
  const byType = {}; shuffle(D().part2).forEach(t => { const k = isMail(t) ? "email" : t.type; if(!byType[k]) byType[k] = t; });
  const choices = shuffle(Object.values(byType)).slice(0, 3).map(t => Object.assign({part: 2}, t));
  let p2 = null; const texts = {1: "", 2: ""}; let cur = 1, ended = false;
  stage.innerHTML = `<section class="sheet"><div class="meta"><span><b>Writing – zkouška nanečisto</b> · Part 1 + Part 2 · 2 × 140–190 slov</span><span class="timer">${MINUTES}:00</span></div>
    <div class="sub-tabs" role="tablist"><button class="tab" role="tab" data-p="1" aria-selected="true">Part 1</button><button class="tab" role="tab" data-p="2" aria-selected="false">Part 2</button></div>
    <div data-pane></div><div class="row" style="margin-top:12px"><button class="btn primary" data-end>Ukončit a ohodnotit</button></div></section>`;
  const pane = stage.querySelector("[data-pane]");
  const timer = countdown(stage.querySelector(".timer"), MINUTES * 60, () => { P.toast("Čas vypršel"); end(); });
  const draw = () => {
    stage.querySelectorAll(".sub-tabs .tab").forEach(b => b.setAttribute("aria-selected", String(+b.dataset.p === cur)));
    if(cur === 2 && !p2){
      pane.innerHTML = `<p>Vyber <b>jednu</b> ze tří úloh (jako u skutečné zkoušky – otázky 2–4):</p>` + choices.map((t, i) => `<div class="wb-col" style="margin-bottom:10px;font-family:inherit"><span class="badge">${i + 2}. ${esc(TYPE_CZ[t.type])}</span>${promptHTML(t, {req: false})}<button class="btn ghost" data-pick="${i}">Vybrat tuto úlohu</button></div>`).join("");
      pane.querySelectorAll("[data-pick]").forEach(b => b.onclick = () => { p2 = choices[+b.dataset.pick]; draw(); });
      return;
    }
    const t = cur === 1 ? p1 : p2;
    pane.innerHTML = promptHTML(t, {req: false}) + editorHTML(t, texts[cur]);
    const ta = wireCounter(pane); ta.addEventListener("input", () => { texts[cur] = ta.value; });
  };
  stage.querySelectorAll(".sub-tabs .tab").forEach(b => b.onclick = () => { if(ended) return; cur = +b.dataset.p; draw(); });
  draw();
  stage.querySelector("[data-end]").onclick = () => end();
  function end(){
    if(ended) return; ended = true; timer.stop();
    const parts = [[p1, texts[1]]].concat(p2 ? [[p2, texts[2]]] : []);
    stage.innerHTML = `<section class="sheet"><h2 style="margin-top:0">Sebehodnocení</h2><p class="note">Porovnej své texty s modelovými odpověďmi a ohodnoť každé kritérium 0–5 (max. 20 za úlohu, 40 celkem).${p2 ? "" : " Part 2 jsi nevybral(a) – počítá se jako 0."}</p>
      ${parts.map(([t, tx], i) => `<div data-part="${i}"><h3>${esc(partLabel(t))}: ${esc(t.title)}</h3>
        <div class="wb-compare"><div><p class="note">Tvůj text (${words(tx)} slov)</p><div class="wb-col">${tx.trim() ? paras(tx) : "<p><i>(prázdné)</i></p>"}</div></div><div><p class="note">Model (${words(t.model)} slov)</p><div class="wb-col" lang="en">${modelHTML(t)}</div>${calloutsHTML(t)}</div></div>
        ${selfAssessHTML()}</div>`).join("")}
      <div class="row" style="margin-top:12px"><button class="btn primary" data-fin>Dokončit</button></div><p class="hint" data-msg aria-live="polite"></p></section>`;
    const getters = parts.map((_, i) => wireSelfAssess(stage.querySelector(`[data-part="${i}"]`)));
    stage.querySelector("[data-fin]").onclick = () => {
      const res = getters.map(g => g());
      if(res.some(r => !r)){ stage.querySelector("[data-msg]").textContent = "Ohodnoť všechna kritéria u " + (parts.length > 1 ? "obou částí." : "eseje."); return; }
      let total = 0; parts.forEach(([t, tx], i) => { total += saveResult(t, tx, res[i], {mock: true}); });
      stage.querySelector("[data-fin]").disabled = true;
      stage.querySelector("[data-msg]").textContent = `Celkem ${total}/40 (≈ ${P.util.scaleFor("writing", total, 40)} na Cambridge Scale).`;
      finish({selfScore: Math.round(100 * total / 40)});
    };
  }
}

P.register({
  id: "writing", title: "Writing", short: "Writing",
  blurb: "Esej se dvěma poznámkami a vlastním nápadem (Part 1) a článek, e-mail/dopis, report, recenze (Part 2) – lekce, modelové odpovědi B2, analyzátor, AI hodnocení.",
  render,
  progress(){ return {done: Object.keys(P.store.get(NS_DONE, {})).length, total: allTasks().length}; },
  mock: {paper: "Writing", minutes: MINUTES, run: runMock}
});
})();
