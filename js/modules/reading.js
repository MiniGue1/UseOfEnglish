/* Reading Part 5–8 module: practice runner (real-exam layout), evidence highlighting, review, spaced repetition, mock.
   Data: DATA.reading.p5/p6 (js/data/reading.js) and p7/p8 (js/data/reading78.js) – read lazily at render time. */
(function(){
"use strict";
const P = window.Portal; if(!P) return;
const U = P.util, esc = U.esc;
const ID = "reading";
const LETTERS = "ABCDEFGHIJ";

/* ------------------------------------------------------------------ part metadata ------------------------------------------------------------------ */
const PARTS = {
  p5:{key:"p5", n:5, kind:"Multiple choice", cz:"Výběr z možností", first:31, per:1, min:18,
    desc:"Jeden delší text (550–750 slov – článek, esej, úryvek z knihy) a 6 otázek se čtyřmi možnostmi A–D. Testuje detailní porozumění, názor a postoj autora, účel, tón a význam výrazů či odkazů v kontextu. Otázky jdou ve stejném pořadí jako text.",
    strat:["Text si nejdřív rychle přečti celý – zjisti téma a postoj autora.","Ke každé otázce najdi v textu příslušnou pasáž (otázky jdou po pořadí) a čti ji pozorně.","Odpověz si vlastními slovy dřív, než se podíváš na možnosti.","Stejná slova jako v textu ≠ stejný význam. Pozor na přehnaná tvrzení (proved, always, entirely).","Možnost musí platit celá – jedna nepravdivá část ji vylučuje."]},
  p6:{key:"p6", n:6, kind:"Cross-text multiple matching", cz:"Porovnávání názorů napříč texty", first:37, per:2, min:12,
    desc:"Čtyři krátké texty (A–D, každý cca 100–150 slov) od čtyř autorů na stejné téma. 4 otázky typu „Který autor má jiný názor než ostatní na…?“ nebo „Který autor sdílí názor autora B na…?“. Testuje porozumění názorům a jejich porovnání napříč texty.",
    strat:["Přečti si nejdřív otázky – zjistíš 3–4 témata, která se porovnávají.","U každého textu si ke každému tématu poznač postoj autora (+ / – / nezmiňuje).","U „sdílí názor autora X“ nejdřív přesně najdi názor X, teprve pak hledej shodu.","U „jiný názor než ostatní“ musí tři autoři souhlasit a jeden se lišit.","Pozor na ústupky (I accept that…, Admittedly…) – autor může něco připustit a přesto zastávat opačný názor."]},
  p7:{key:"p7", n:7, kind:"Gapped text", cz:"Text s vyjmutými odstavci", first:41, per:2, min:15,
    desc:"Článek, ze kterého bylo vyjmuto 6 odstavců. Doplňuješ je ze 7 nabízených (A–G), jeden je navíc. Testuje porozumění stavbě textu, soudržnosti a návaznosti myšlenek.",
    strat:["Nejdřív si přečti celý základní text, ať víš, kam se děj nebo argument vyvíjí.","Sleduj odkazy: zájmena (this, they, such), spojky (however, yet), čas, jména a opakovaná slova.","Kontroluj obě strany mezery – odstavec musí navazovat na text před i za mezerou.","Začni mezerami, kde si jsi jistý; odstavec navíc zbude na konci.","Na závěr si přečti celý text i s doplněnými odstavci – musí plynout."]},
  p8:{key:"p8", n:8, kind:"Multiple matching", cz:"Přiřazování informací k sekcím", first:47, per:1, min:15,
    desc:"Delší text rozdělený do 4–5 sekcí (nebo několik krátkých textů) a 10 tvrzení. Hledáš, ve které sekci je daná informace, názor nebo postoj. Testuje rychlé vyhledávání konkrétních informací a parafrází.",
    strat:["Nejdřív si přečti všech 10 tvrzení a podtrhni klíčová slova.","Hledej parafráze, ne stejná slova – shodné slovo v jiné sekci bývá past.","Čti po sekcích: přečti sekci A a projdi, která tvrzení k ní patří.","Sekce se mohou opakovat, jedna sekce může mít více odpovědí.","Nezasekni se – nejistá tvrzení dořeš na konci vylučovací metodou."]}
};
const ORDER = ["p5","p6","p7","p8"];

/* ------------------------------------------------------------------ data access (lazy) ------------------------------------------------------------------ */
const data = () => ((window.DATA || {}).reading) || {};
const tasksOf = part => { const a = data()[part]; return Array.isArray(a) ? a : []; };
const findTask = (part, id) => tasksOf(part).find(t => String(t.id) === String(id));
const keyOf = (part, id) => part + ":" + id;
const gapsOf = t => (String(t.text || "").match(/\[(\d+)\]/g) || []).map(g => +g.slice(1, -1));
const getK = (o, k) => o ? (o[k] != null ? o[k] : o[String(k)]) : undefined;
function itemCount(part, t){ return part === "p7" ? gapsOf(t).length : (t.questions || []).length; }
function rubric(part, t){
  const p = PARTS[part], n = itemCount(part, t), last = p.first + n - 1;
  if(part === "p5") return (t.intro ? t.intro + " " : "You are going to read an article. ") + `For questions ${p.first}–${last}, choose the answer (A, B, C or D) which you think fits best according to the text.`;
  if(part === "p6") return (t.intro ? t.intro + " " : "You are going to read four extracts from articles. ") + `For questions ${p.first}–${last}, choose from the writers A–D. The writers may be chosen more than once.`;
  if(part === "p7") return (t.intro ? t.intro + " " : "You are going to read an article. ") + `${n} paragraphs have been removed from the article. Choose from the paragraphs A–${LETTERS[(t.paras || []).length - 1] || "G"} the one which fits each gap (${p.first}–${last}). There is one extra paragraph which you do not need to use.`;
  const labs = (t.sections || []).map(s => s.label);
  return (t.intro ? t.intro + " " : "You are going to read an article in sections. ") + `For questions ${p.first}–${last}, choose from the sections (${labs[0] || "A"}–${labs[labs.length - 1] || "E"}). The sections may be chosen more than once.`;
}

/* ------------------------------------------------------------------ storage ------------------------------------------------------------------ */
const NS = {prog:"reading:progress", wrong:"reading:wrong", srs:"reading:srs", prefs:"reading:prefs"};
const SRS_DAYS = [1, 3, 7, 14];
function record(part, task, results, source){
  const key = keyOf(part, task.id), now = Date.now();
  const n = results.length, c = results.filter(r => r.ok).length, pct = n ? Math.round(100 * c / n) : 0;
  const prog = P.store.get(NS.prog, {}); const old = prog[key] || {best:0, tries:0};
  prog[key] = {best:Math.max(old.best || 0, pct), last:pct, tries:(old.tries || 0) + 1, t:now};
  P.store.set(NS.prog, prog);
  const wrong = P.store.get(NS.wrong, {});
  const bad = results.filter(r => !r.ok).map(r => ({i:r.i, given:r.given == null ? null : r.given}));
  if(bad.length) wrong[key] = {t:now, items:bad, src:source || "practice"}; else delete wrong[key];
  P.store.set(NS.wrong, wrong);
  const srs = P.store.get(NS.srs, {});
  if(pct < 100) srs[key] = {box:0, due:now + SRS_DAYS[0] * U.DAY};
  else if(srs[key]){ const b = srs[key].box + 1; if(b >= SRS_DAYS.length) delete srs[key]; else srs[key] = {box:b, due:now + SRS_DAYS[b] * U.DAY}; }
  P.store.set(NS.srs, srs);
  return {c, n, pct, marks:c * PARTS[part].per, max:n * PARTS[part].per};
}
function dueList(){
  const srs = P.store.get(NS.srs, {}), now = Date.now(), out = [];
  Object.keys(srs).forEach(k => { const [part, ...rest] = k.split(":"); const t = findTask(part, rest.join(":")); if(t && srs[k].due <= now) out.push({part, task:t, due:srs[k].due}); });
  return out.sort((a, b) => a.due - b.due);
}
function partStats(part){
  const prog = P.store.get(NS.prog, {}), ts = tasksOf(part);
  const done = ts.filter(t => prog[keyOf(part, t.id)]);
  const avg = done.length ? Math.round(done.reduce((s, t) => s + prog[keyOf(part, t.id)].best, 0) / done.length) : 0;
  return {done:done.length, total:ts.length, avg};
}
function nextTask(part){
  const ts = tasksOf(part); if(!ts.length) return null;
  const prog = P.store.get(NS.prog, {}), srs = P.store.get(NS.srs, {}), now = Date.now();
  const fresh = ts.find(t => !prog[keyOf(part, t.id)]); if(fresh) return fresh;
  const due = ts.find(t => srs[keyOf(part, t.id)] && srs[keyOf(part, t.id)].due <= now); if(due) return due;
  const sorted = ts.slice().sort((a, b) => (prog[keyOf(part, a.id)].best - prog[keyOf(part, b.id)].best) || (prog[keyOf(part, a.id)].t - prog[keyOf(part, b.id)].t));
  return sorted[0];
}
const prefs = () => P.store.get(NS.prefs, {timer:false, hl:false});
const setPref = (k, v) => { const p = prefs(); p[k] = v; P.store.set(NS.prefs, p); };

/* ------------------------------------------------------------------ styles (scoped, rd- prefix) ------------------------------------------------------------------ */
function injectStyle(){
  if(document.getElementById("rd-style")) return;
  const s = document.createElement("style"); s.id = "rd-style";
  s.textContent = `
.rd h2{margin-top:0}
.rd-intro p{margin:0 0 10px}
.rd-parts{display:grid;gap:14px;margin:0 0 22px}
@media (min-width:700px){.rd-parts{grid-template-columns:1fr 1fr}}
.rd-part{display:flex;flex-direction:column;gap:8px}
.rd-part h3{font-family:var(--serif);font-weight:500;font-size:22px;margin:0}
.rd-part h3 small{display:block;font-family:var(--sans);font-size:13px;color:var(--muted);font-weight:500;margin-top:2px}
.rd-part p{margin:0;font-size:15px}
.rd-part ul{margin:0;padding-left:20px;font-size:14.5px}
.rd-part li{margin:2px 0}
.rd-part .row{margin-top:auto;padding-top:6px}
.rd-kv{display:flex;gap:6px;flex-wrap:wrap}
.rd-prog{font-size:13.5px;color:var(--muted)}
.rd-empty{font-size:14px;color:var(--muted);background:var(--soft);border-radius:6px;padding:8px 12px}
.rd-list{display:grid;gap:10px;margin:0 0 18px}
.rd-item{display:flex;justify-content:space-between;align-items:center;gap:12px;text-align:left;width:100%}
.rd-item b{font-family:var(--serif);font-size:18px;font-weight:500;display:block}
.rd-item span{font-size:13.5px;color:var(--muted)}
.rd-split{display:grid;gap:18px;align-items:start}
@media (min-width:980px){
  main:has(.rd-split){max-width:1220px}
  .rd-split{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr)}
  .rd-textcol{position:sticky;top:8px;max-height:calc(100vh - 16px);overflow:auto}
}
.rd-rubric{font-style:italic;color:var(--muted);font-size:14.5px;margin:0 0 12px}
.rd-title{font-family:var(--serif);font-weight:500;font-size:24px;margin:0 0 10px}
.rd-passage{font-family:var(--serif);font-size:18px;line-height:1.7;white-space:pre-wrap;overflow-wrap:break-word}
.rd-hl-on .rd-passage{cursor:text}
.rd-wtext{margin:0 0 16px}
.rd-wtext h4,.rd-sec h4{font-family:var(--sans);font-size:15px;margin:0 0 4px;display:flex;gap:8px;align-items:center}
.rd-lab{display:inline-grid;place-items:center;min-width:28px;height:28px;border:1.5px solid var(--ink);border-radius:4px;font-weight:600}
.rd-tools{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:0 0 14px}
.rd-tools .chip{min-height:36px;font-size:14px}
mark.rd-hl{background:var(--hl);color:inherit;border-radius:2px}
mark.rd-ev{background:color-mix(in srgb,var(--green) 20%,transparent);color:inherit;border-bottom:2px solid var(--green);border-radius:2px;cursor:pointer}
mark.rd-ev.bad{background:color-mix(in srgb,var(--red) 14%,transparent);border-bottom-color:var(--red)}
mark.rd-ev[data-n]::before{content:attr(data-n);font-family:var(--sans);font-size:11px;font-weight:600;background:var(--green);color:var(--sheet);border-radius:8px;padding:0 5px;margin-right:4px;vertical-align:2px}
mark.rd-ev.bad[data-n]::before{background:var(--red)}
.rd-flash{animation:rdflash 1.6s ease-out}
@keyframes rdflash{0%,40%{outline:3px solid #4C8DFF;outline-offset:2px}100%{outline:3px solid transparent}}
.rd-q{border-top:1px solid var(--rule);padding:14px 0 6px}
.rd-q:first-child{border-top:0;padding-top:0}
.rd-qt{margin:0 0 10px;font-family:var(--serif);font-size:18.5px;line-height:1.45}
.rd-num{display:inline-block;min-width:2.2em;font-family:var(--sans);font-weight:600;font-size:14px;color:var(--muted)}
.rd .opt{font-size:17px}
.rd .opt[aria-checked="true"]{border-color:var(--ink);background:var(--soft)}
.rd-letters{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 10px}
.rd-letter{appearance:none;min-width:48px;min-height:44px;border:1.5px solid var(--rule);border-radius:6px;background:transparent;color:var(--ink);font-weight:600;font-size:16px;cursor:pointer}
.rd-letter:hover:not(:disabled){border-color:var(--ink)}
.rd-letter[aria-checked="true"]{background:var(--ink);color:var(--paper);border-color:var(--ink)}
.rd-letter.right{border-color:var(--green);background:color-mix(in srgb,var(--green) 18%,transparent);color:var(--ink)}
.rd-letter.wrong{border-color:var(--red);background:color-mix(in srgb,var(--red) 14%,transparent);color:var(--ink);text-decoration:line-through}
.rd-letter:disabled{cursor:default}
.rd-fb:empty{display:none}
.rd-fb .fb{margin:4px 0 8px}
.rd-quote{font-family:var(--serif);font-style:italic;font-size:15.5px;margin:6px 0 0}
.rd-quote b{font-style:normal;font-family:var(--sans);font-size:13px}
.rd-show{margin-top:6px}
.rd-gap{display:block;white-space:normal;font-family:var(--sans);font-size:15px;border:1.5px dashed var(--rule);border-radius:6px;padding:8px 12px;margin:6px 0 10px;background:var(--sheet)}
.rd-gap.ok{border:1.5px solid var(--green)}
.rd-gap.bad{border:1.5px solid var(--red)}
.rd-gap select{font:inherit;min-height:40px;padding:4px 8px;border:1.5px solid var(--rule);border-radius:6px;background:var(--sheet);color:var(--ink);max-width:100%}
.rd-gap-prev{font-family:var(--serif);font-size:16.5px;line-height:1.6;margin-top:6px;color:var(--muted)}
.rd-gap-prev:empty{display:none}
.rd-para{border:1px solid var(--rule);border-radius:6px;padding:10px 12px;margin:0 0 10px;background:var(--sheet)}
.rd-para p{margin:6px 0 0;font-family:var(--serif);font-size:16.5px;line-height:1.6}
.rd-para.used{opacity:.62}
.rd-para.dup{border-color:var(--red)}
.rd-para .badge{margin-left:6px}
.rd-sectabs{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 12px}
.rd-sec{margin:0 0 18px}
.rd-sec[hidden]{display:none}
.rd-result{border:1.5px solid var(--ink);border-radius:8px;padding:14px 16px;margin:0 0 16px;background:var(--sheet)}
.rd-result .score{margin:0}
.rd-actions{margin:16px 0 4px}
.rd-mockbar{position:sticky;top:0;z-index:5;background:var(--paper);padding:8px 0;border-bottom:1px solid var(--rule);margin:0 0 14px}
.rd-rev{border-top:1px solid var(--rule);padding:12px 0}
.rd-rev h4{margin:0 0 6px;font-size:15px}
.rd-rev .rd-qt{font-size:17px}
.rd-ans{font-size:14.5px;margin:0 0 6px}
.rd-ans .bad{color:var(--red);text-decoration:line-through}
.rd-ans .good{color:var(--green);font-weight:600}
`;
  document.head.appendChild(s);
}

/* ------------------------------------------------------------------ text marking helpers ------------------------------------------------------------------ */
function textNodes(root){ const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); const a = []; let n; while((n = w.nextNode())) a.push(n); return a; }
/* wrap characters [start,end) of root's text in elements produced by make(); skips text inside [data-nohl] */
function wrapOffsets(root, start, end, make){
  let pos = 0; const out = [];
  for(const node of textNodes(root)){
    const len = node.nodeValue.length, s = pos, e = pos + len; pos = e;
    if(e <= start || s >= end || !len) continue;
    if(node.parentElement && node.parentElement.closest("[data-nohl]")) continue;
    let target = node; const a = Math.max(start, s) - s, b = Math.min(end, e) - s;
    if(b < len) target.splitText(b);
    if(a > 0) target = target.splitText(a);
    if(!target.nodeValue.length) continue;
    const m = make(out.length); target.parentNode.insertBefore(m, target); m.appendChild(target); out.push(m);
  }
  return out;
}
function offsetIn(root, container, offset){ const r = document.createRange(); r.setStart(root, 0); r.setEnd(container, offset); return r.toString().length; }
function unwrap(el){ const p = el.parentNode; while(el.firstChild) p.insertBefore(el.firstChild, el); p.removeChild(el); p.normalize(); }
function markEvidence(root, quote, qn, ok){
  if(!root || !quote) return [];
  const idx = root.textContent.indexOf(quote); if(idx < 0) return [];
  return wrapOffsets(root, idx, idx + quote.length, i => {
    const m = document.createElement("mark"); m.className = "rd-ev" + (ok ? "" : " bad"); m.dataset.q = qn;
    if(i === 0) m.dataset.n = qn; m.title = "Důkaz k otázce " + qn; return m;
  });
}
function flash(el){ if(!el) return; el.scrollIntoView({block:"center", behavior:"smooth"}); el.classList.remove("rd-flash"); void el.offsetWidth; el.classList.add("rd-flash"); }
const passage = (txt, attrs) => `<div class="rd-passage" ${attrs || ""}>${esc(String(txt || "").trim())}</div>`;

/* ------------------------------------------------------------------ highlighter + timer tools ------------------------------------------------------------------ */
function setupTools(toolsEl, textCol, part, mock){
  const pf = prefs(); let timer = null;
  toolsEl.innerHTML = `<button class="chip rd-hlbtn" aria-pressed="${pf.hl ? "true" : "false"}">Zvýrazňovač</button>
    <button class="chip rd-clr">Smazat zvýraznění</button>
    ${mock ? "" : `<button class="chip rd-tbtn" aria-pressed="false">Časomíra ${PARTS[part].min} min</button><span class="timer rd-time" hidden></span>`}`;
  const hlBtn = toolsEl.querySelector(".rd-hlbtn");
  const applyHl = on => { textCol.classList.toggle("rd-hl-on", on); hlBtn.setAttribute("aria-pressed", String(on)); };
  applyHl(!!pf.hl);
  hlBtn.onclick = () => { const on = hlBtn.getAttribute("aria-pressed") !== "true"; applyHl(on); setPref("hl", on); P.toast(on ? "Zvýrazňovač zapnut – označ text myší nebo prstem." : "Zvýrazňovač vypnut"); };
  toolsEl.querySelector(".rd-clr").onclick = () => textCol.querySelectorAll("mark.rd-hl").forEach(unwrap);
  const doHl = () => {
    if(!textCol.classList.contains("rd-hl-on")) return;
    const sel = window.getSelection(); if(!sel || sel.isCollapsed || !sel.rangeCount) return;
    const r = sel.getRangeAt(0);
    const root = (r.commonAncestorContainer.nodeType === 1 ? r.commonAncestorContainer : r.commonAncestorContainer.parentElement).closest(".rd-hlroot");
    if(!root || !textCol.contains(root)) return;
    const a = offsetIn(root, r.startContainer, r.startOffset), b = offsetIn(root, r.endContainer, r.endOffset);
    if(b > a) wrapOffsets(root, a, b, () => { const m = document.createElement("mark"); m.className = "rd-hl"; return m; });
    sel.removeAllRanges();
  };
  textCol.addEventListener("mouseup", () => setTimeout(doHl, 0));
  textCol.addEventListener("touchend", () => setTimeout(doHl, 250));
  textCol.addEventListener("keyup", e => { if(e.shiftKey) doHl(); });
  textCol.addEventListener("click", e => {
    const hl = e.target.closest("mark.rd-hl");
    if(hl && textCol.classList.contains("rd-hl-on") && window.getSelection().isCollapsed){ unwrap(hl); return; }
    const ev = e.target.closest("mark.rd-ev");
    if(ev && !textCol.classList.contains("rd-hl-on")){ const q = document.getElementById("rd-q-" + ev.dataset.q); if(q) flash(q); }
  });
  const tBtn = toolsEl.querySelector(".rd-tbtn");
  if(tBtn){
    const tEl = toolsEl.querySelector(".rd-time");
    const start = () => { tEl.hidden = false; tBtn.setAttribute("aria-pressed", "true"); timer = U.countdown(tEl, PARTS[part].min * 60, () => P.toast("Čas na Part " + PARTS[part].n + " vypršel – v testu bys měl/a pokračovat dál.")); };
    const stop = () => { if(timer) timer.stop(); timer = null; tEl.hidden = true; tBtn.setAttribute("aria-pressed", "false"); };
    tBtn.onclick = () => { if(timer){ stop(); setPref("timer", false); } else { start(); setPref("timer", true); } };
    if(pf.timer) start();
    return {stopTimer:stop};
  }
  return {stopTimer(){}};
}

/* ------------------------------------------------------------------ part renderers ------------------------------------------------------------------
   Each returns {answered(), grade() -> [{i, ok, given, right}], reveal(results)} and fills textCol/qCol. */
function choiceGroup(container, labels, texts, onPick){
  container.setAttribute("role", "radiogroup");
  container.innerHTML = labels.map((l, i) => texts
    ? `<button class="opt" role="radio" aria-checked="false" data-v="${i}"><i>${esc(l)}</i><span>${esc(texts[i])}</span></button>`
    : `<button class="rd-letter" role="radio" aria-checked="false" data-v="${esc(l)}" aria-label="${esc(l)}">${esc(l)}</button>`).join("");
  const btns = [...container.querySelectorAll("button")];
  btns.forEach((b, i) => {
    b.onclick = () => { btns.forEach(x => x.setAttribute("aria-checked", String(x === b))); onPick(b.dataset.v); };
    b.onkeydown = e => {
      const d = (e.key === "ArrowDown" || e.key === "ArrowRight") ? 1 : (e.key === "ArrowUp" || e.key === "ArrowLeft") ? -1 : 0;
      if(d){ e.preventDefault(); btns[(i + d + btns.length) % btns.length].focus(); }
    };
  });
  return btns;
}
function fbHtml(ok, verdict, why, quotes){
  return `<div class="fb ${ok ? "" : "bad"}"><p class="verdict">${verdict}</p>${why ? `<p class="why">${esc(why)}</p>` : ""}
    ${(quotes || []).map(q => `<p class="rd-quote">${q.label ? `<b>${esc(q.label)}:</b> ` : ""}„${esc(q.quote)}“</p>`).join("")}
    ${quotes && quotes.length ? `<button class="link-btn rd-show">Ukázat v textu</button>` : ""}</div>`;
}

function renderP5(task, textCol, qCol, state){
  const first = PARTS.p5.first;
  textCol.insertAdjacentHTML("beforeend", `<h3 class="rd-title">${esc(task.title || "")}</h3>` + passage(task.text, 'class-x="" data-root="1"').replace('class="rd-passage"', 'class="rd-passage rd-hlroot"'));
  const root = textCol.querySelector(".rd-hlroot");
  const groups = [];
  task.questions.forEach((q, i) => {
    const n = first + i;
    const div = document.createElement("div"); div.className = "rd-q"; div.id = "rd-q-" + n;
    div.innerHTML = `<p class="rd-qt" id="rd-qt-${n}"><span class="rd-num">${n}</span>${esc(q.q)}</p><div class="opts" aria-labelledby="rd-qt-${n}"></div><div class="rd-fb" aria-live="polite"></div>`;
    qCol.appendChild(div);
    groups.push(choiceGroup(div.querySelector(".opts"), ["A","B","C","D"], q.opts, v => { state.ans[i] = +v; }));
  });
  return {
    answered: () => task.questions.filter((q, i) => state.ans[i] != null).length,
    grade: () => task.questions.map((q, i) => ({i, given:state.ans[i] == null ? null : state.ans[i], ok:state.ans[i] === q.correct, right:q.correct})),
    reveal(res){
      res.forEach(r => {
        const q = task.questions[r.i], n = first + r.i, div = qCol.querySelector("#rd-q-" + n);
        groups[r.i].forEach((b, j) => { b.disabled = true; if(j === q.correct) b.classList.add("right"); else if(j === r.given) b.classList.add("wrong"); });
        markEvidence(root, q.evidence, n, r.ok);
        const fb = div.querySelector(".rd-fb");
        fb.innerHTML = fbHtml(r.ok, r.ok ? "Správně" : (r.given == null ? "Bez odpovědi" : "Špatně") + " – správně je " + "ABCD"[q.correct], q.why, [{quote:q.evidence}]);
        const sb = fb.querySelector(".rd-show"); if(sb) sb.onclick = () => flash(root.querySelector(`mark.rd-ev[data-q="${n}"]`));
      });
    }
  };
}

function renderP6(task, textCol, qCol, state){
  const first = PARTS.p6.first, labels = task.texts.map(t => t.label);
  textCol.insertAdjacentHTML("beforeend", `<h3 class="rd-title">${esc(task.title || "")}</h3>` + task.texts.map(t =>
    `<section class="rd-wtext"><h4><span class="rd-lab">${esc(t.label)}</span></h4><div class="rd-passage rd-hlroot" data-label="${esc(t.label)}">${esc(String(t.text).trim())}</div></section>`).join(""));
  const rootOf = l => [...textCol.querySelectorAll(".rd-passage")].find(x => x.dataset.label === l);
  const groups = [];
  task.questions.forEach((q, i) => {
    const n = first + i;
    const div = document.createElement("div"); div.className = "rd-q"; div.id = "rd-q-" + n;
    div.innerHTML = `<p class="rd-qt" id="rd-qt-${n}"><span class="rd-num">${n}</span>${esc(q.q)}</p><div class="rd-letters" aria-labelledby="rd-qt-${n}"></div><div class="rd-fb" aria-live="polite"></div>`;
    qCol.appendChild(div);
    groups.push(choiceGroup(div.querySelector(".rd-letters"), labels, null, v => { state.ans[i] = v; }));
  });
  return {
    answered: () => task.questions.filter((q, i) => state.ans[i] != null).length,
    grade: () => task.questions.map((q, i) => ({i, given:state.ans[i] == null ? null : state.ans[i], ok:state.ans[i] === q.answer, right:q.answer})),
    reveal(res){
      res.forEach(r => {
        const q = task.questions[r.i], n = first + r.i, div = qCol.querySelector("#rd-q-" + n);
        groups[r.i].forEach(b => { b.disabled = true; if(b.dataset.v === q.answer) b.classList.add("right"); else if(b.dataset.v === r.given) b.classList.add("wrong"); });
        const ev = Array.isArray(q.evidence) ? q.evidence : [];
        ev.forEach(e => markEvidence(rootOf(e.label), e.quote, n, r.ok));
        const fb = div.querySelector(".rd-fb");
        fb.innerHTML = fbHtml(r.ok, r.ok ? "Správně (2 body)" : (r.given == null ? "Bez odpovědi" : "Špatně") + " – správně je " + q.answer, q.why, ev);
        const sb = fb.querySelector(".rd-show"); if(sb) sb.onclick = () => flash(textCol.querySelector(`mark.rd-ev[data-q="${n}"]`));
      });
    }
  };
}

function renderP7(task, textCol, qCol, state){
  const first = PARTS.p7.first, paras = task.paras || [], gaps = gapsOf(task);
  const pieces = String(task.text || "").trim().split(/\[(\d+)\]/);
  let html = "";
  pieces.forEach((p, k) => {
    if(k % 2 === 0){ html += esc(p.replace(/^[ \t]*\n/, "").replace(/\n[ \t]*$/, "")); return; }
    const g = +p, n = first + g - 1;
    html += `<span class="rd-gap" data-nohl="1" data-gap="${g}" id="rd-q-${n}"><label><span class="rd-num">${n}</span>
      <select aria-label="Mezera ${n}"><option value="">– vyber odstavec –</option>${paras.map(x => `<option value="${esc(x.label)}">${esc(x.label)} – ${esc(String(x.text).trim().split(/\s+/).slice(0, 6).join(" "))}…</option>`).join("")}</select></label>
      <span class="rd-gap-prev"></span><span class="rd-fb" aria-live="polite"></span></span>`;
  });
  textCol.insertAdjacentHTML("beforeend", `<h3 class="rd-title">${esc(task.title || "")}</h3><div class="rd-passage rd-hlroot">${html}</div>`);
  qCol.insertAdjacentHTML("beforeend", `<p class="note">Odstavce ${esc(paras.map(p => p.label).join(", "))} – jeden je navíc. Každý vyber u mezery v textu.</p>` +
    paras.map(p => `<div class="rd-para rd-hlroot" data-label="${esc(p.label)}"><span class="rd-lab" data-nohl="1">${esc(p.label)}</span><span class="badge" data-nohl="1" hidden></span><p>${esc(String(p.text).trim())}</p></div>`).join(""));
  const sync = () => {
    const use = {};
    textCol.querySelectorAll(".rd-gap").forEach(gEl => {
      const v = gEl.querySelector("select").value, g = +gEl.dataset.gap; state.ans[g] = v || null;
      const para = paras.find(x => x.label === v);
      gEl.querySelector(".rd-gap-prev").textContent = para ? String(para.text).trim() : "";
      if(v) (use[v] = use[v] || []).push(first + g - 1);
    });
    qCol.querySelectorAll(".rd-para").forEach(el => {
      const u = use[el.dataset.label], b = el.querySelector(".badge");
      el.classList.toggle("used", !!u); el.classList.toggle("dup", !!u && u.length > 1);
      b.hidden = !u; b.textContent = u ? (u.length > 1 ? "použito vícekrát: " : "v mezeře ") + u.join(", ") : "";
    });
  };
  textCol.querySelectorAll(".rd-gap select").forEach(s => s.onchange = sync);
  return {
    answered: () => gaps.filter(g => state.ans[g]).length,
    grade: () => gaps.map((g, i) => { const right = getK(task.answers, g); return {i, gap:g, given:state.ans[g] || null, ok:state.ans[g] === right, right}; }),
    reveal(res){
      const usedRight = new Set(res.map(r => r.right));
      res.forEach(r => {
        const n = first + r.gap - 1, gEl = textCol.querySelector(`.rd-gap[data-gap="${r.gap}"]`);
        gEl.classList.add(r.ok ? "ok" : "bad"); gEl.querySelector("select").disabled = true;
        const para = paras.find(x => x.label === r.right);
        if(!r.ok && para) gEl.querySelector(".rd-gap-prev").textContent = String(para.text).trim();
        gEl.querySelector(".rd-fb").innerHTML = fbHtml(r.ok, r.ok ? "Správně (2 body)" : (r.given ? "Špatně (" + esc(r.given) + ")" : "Bez odpovědi") + " – správně je " + esc(r.right), getK(task.why, r.gap) || "", null);
      });
      qCol.querySelectorAll(".rd-para").forEach(el => { if(!usedRight.has(el.dataset.label)){ const b = el.querySelector(".badge"); b.hidden = false; b.textContent = "odstavec navíc"; el.classList.remove("dup"); } });
    }
  };
}

function renderP8(task, textCol, qCol, state){
  const first = PARTS.p8.first, secs = task.sections || [], labels = secs.map(s => s.label);
  textCol.insertAdjacentHTML("beforeend", `<h3 class="rd-title">${esc(task.title || "")}</h3>
    <div class="rd-sectabs" role="group" aria-label="Sekce"><button class="chip" data-s="" aria-pressed="true">Vše</button>${labels.map(l => `<button class="chip" data-s="${esc(l)}" aria-pressed="false">${esc(l)}</button>`).join("")}</div>` +
    secs.map(s => `<section class="rd-sec" data-sec="${esc(s.label)}"><h4><span class="rd-lab">${esc(s.label)}</span>${s.title ? esc(s.title) : ""}</h4><div class="rd-passage rd-hlroot" data-label="${esc(s.label)}">${esc(String(s.text).trim())}</div></section>`).join(""));
  const tabs = [...textCol.querySelectorAll(".rd-sectabs .chip")];
  const showSec = l => { tabs.forEach(t => t.setAttribute("aria-pressed", String(t.dataset.s === l))); textCol.querySelectorAll(".rd-sec").forEach(s => s.hidden = !!l && s.dataset.sec !== l); };
  tabs.forEach(t => t.onclick = () => showSec(t.dataset.s));
  const rootOf = l => [...textCol.querySelectorAll(".rd-passage")].find(x => x.dataset.label === l);
  qCol.insertAdjacentHTML("beforeend", task.stem ? `<p class="rd-qt"><b>${esc(task.stem)}</b></p>` : "");
  const groups = [];
  task.questions.forEach((q, i) => {
    const n = first + i;
    const div = document.createElement("div"); div.className = "rd-q"; div.id = "rd-q-" + n;
    div.innerHTML = `<p class="rd-qt" id="rd-qt-${n}"><span class="rd-num">${n}</span>${esc(q.q)}</p><div class="rd-letters" aria-labelledby="rd-qt-${n}"></div><div class="rd-fb" aria-live="polite"></div>`;
    qCol.appendChild(div);
    groups.push(choiceGroup(div.querySelector(".rd-letters"), labels, null, v => { state.ans[i] = v; }));
  });
  return {
    answered: () => task.questions.filter((q, i) => state.ans[i] != null).length,
    grade: () => task.questions.map((q, i) => ({i, given:state.ans[i] == null ? null : state.ans[i], ok:state.ans[i] === q.answer, right:q.answer})),
    reveal(res){
      res.forEach(r => {
        const q = task.questions[r.i], n = first + r.i, div = qCol.querySelector("#rd-q-" + n);
        groups[r.i].forEach(b => { b.disabled = true; if(b.dataset.v === q.answer) b.classList.add("right"); else if(b.dataset.v === r.given) b.classList.add("wrong"); });
        markEvidence(rootOf(q.answer), q.evidence, n, r.ok);
        const fb = div.querySelector(".rd-fb");
        fb.innerHTML = fbHtml(r.ok, r.ok ? "Správně" : (r.given == null ? "Bez odpovědi" : "Špatně") + " – správně je " + q.answer, q.why, q.evidence ? [{label:q.answer, quote:q.evidence}] : []);
        const sb = fb.querySelector(".rd-show"); if(sb) sb.onclick = () => { showSec(q.answer); flash(textCol.querySelector(`mark.rd-ev[data-q="${n}"]`)); };
      });
    }
  };
}
const RENDER = {p5:renderP5, p6:renderP6, p7:renderP7, p8:renderP8};

/* ------------------------------------------------------------------ task runner ------------------------------------------------------------------
   opts: {mock:bool, lastInMock:bool, onSubmit(results)} – in mock mode no feedback is shown. */
function runTask(stage, part, task, opts){
  opts = opts || {};
  const p = PARTS[part], state = {ans:{}};
  const wrap = document.createElement("div"); wrap.className = "rd";
  wrap.innerHTML = `${opts.mock ? "" : `<div class="meta"><button class="link-btn rd-back">← Reading</button><span class="badge">${esc(task.topic || "")}</span></div>`}
    <h2>Part ${p.n} · ${esc(p.kind)}</h2>
    <p class="rd-rubric">${esc(rubric(part, task))}</p>
    <div class="rd-tools"></div>
    <div class="rd-split"><div class="rd-textcol sheet"></div><div class="rd-qcol"><div class="rd-res" aria-live="polite"></div><div class="rd-qs"></div>
      <p class="hint rd-hint" aria-live="polite"></p><div class="row rd-actions"><button class="btn primary rd-check">${opts.mock ? (opts.lastInMock ? "Odevzdat test" : "Další část →") : "Vyhodnotit"}</button></div></div></div>`;
  stage.appendChild(wrap);
  const textCol = wrap.querySelector(".rd-textcol"), qCol = wrap.querySelector(".rd-qs");
  const tools = setupTools(wrap.querySelector(".rd-tools"), textCol, part, opts.mock);
  const ctl = RENDER[part](task, textCol, qCol, state);
  const back = wrap.querySelector(".rd-back"); if(back) back.onclick = () => P.go(ID);
  const total = itemCount(part, task);
  let armed = false;
  const checkBtn = wrap.querySelector(".rd-check"), hint = wrap.querySelector(".rd-hint");
  checkBtn.onclick = () => {
    const missing = total - ctl.answered();
    if(missing > 0 && !armed){ armed = true; hint.textContent = `Nezodpovězeno: ${missing}. Klikni znovu, pokud chceš přesto ${opts.mock ? "pokračovat" : "vyhodnotit"}.`; return; }
    hint.textContent = "";
    const res = ctl.grade();
    if(opts.mock){ tools.stopTimer(); opts.onSubmit && opts.onSubmit(res); return; }
    tools.stopTimer();
    const sc = record(part, task, res, "practice");
    P.logActivity(ID, "part" + p.n, sc.c, sc.n, {task:task.id, marks:sc.marks, max:sc.max});
    ctl.reveal(res);
    const resEl = wrap.querySelector(".rd-res");
    resEl.innerHTML = `<div class="rd-result"><p class="score">${sc.c}/${sc.n}</p><p class="note">${sc.marks} z ${sc.max} bodů${p.per > 1 ? " (v testu " + p.per + " body za otázku)" : ""} · ${sc.pct} %${sc.pct < 100 ? " · úloha zařazena k zopakování" : ""}</p>
      <p class="note">Zelené/červené zvýraznění v textu ukazuje, <b>kde byla odpověď</b>. Klikni na „Ukázat v textu“ u otázky.</p></div>`;
    const acts = wrap.querySelector(".rd-actions");
    acts.innerHTML = `<button class="btn primary rd-next">Další úloha</button><button class="btn ghost rd-again">Zkusit znovu</button><button class="btn ghost rd-home">Přehled Reading</button>`;
    acts.querySelector(".rd-next").onclick = () => { const nt = nextTask(part); if(nt && nt.id === task.id && tasksOf(part).length > 1){ const o = tasksOf(part).filter(t => t.id !== task.id); goTask(part, U.shuffle(o)[0]); } else goTask(part, nt || task); };
    acts.querySelector(".rd-again").onclick = () => { P.show(ID, false); };
    acts.querySelector(".rd-home").onclick = () => P.go(ID);
    resEl.scrollIntoView({block:"nearest"});
  };
  return {ctl, wrap, tools};
}
const goTask = (part, t) => P.go(ID, part + "." + encodeURIComponent(t.id));

/* ------------------------------------------------------------------ views ------------------------------------------------------------------ */
function viewHome(stage){
  const due = dueList();
  const wrongN = Object.values(P.store.get(NS.wrong, {})).reduce((s, w) => s + (w.items || []).length, 0);
  const all = ORDER.map(partStats);
  const done = all.reduce((s, x) => s + x.done, 0), tot = all.reduce((s, x) => s + x.total, 0);
  stage.innerHTML = `<div class="rd">
    <section class="sheet rd-intro"><h2>Reading (Part 5–8)</h2>
      <p>V písemce <b>Reading &amp; Use of English</b> (90 minut, 8 částí) tvoří části 5–8 čtení s porozuměním – dohromady 36 bodů. Na čtení si počítej zhruba hodinu, zbytek na Use of English.</p>
      <div class="grid" style="margin:12px 0 0"><div class="stat"><b>${done}/${tot}</b><span>úloh hotovo</span></div><div class="stat"><b>${due.length}</b><span>k zopakování dnes</span></div><div class="stat"><b>${wrongN}</b><span>chyb k revizi</span></div></div>
      <div class="row" style="margin-top:12px"><button class="btn ghost rd-review">Chyby a revize</button>${due.length ? `<button class="btn primary rd-due">Zopakovat (${due.length})</button>` : ""}</div>
    </section>
    <h2>Části</h2>
    <div class="rd-parts">${ORDER.map(k => {
      const p = PARTS[k], st = partStats(k), pct = st.total ? Math.round(100 * st.done / st.total) : 0, items = k === "p5" ? 6 : k === "p6" ? 4 : k === "p7" ? 6 : 10;
      return `<article class="sheet rd-part"><h3>Part ${p.n} · ${esc(p.kind)}<small>${esc(p.cz)}</small></h3>
        <div class="rd-kv"><span class="badge">${items} ${items < 5 ? "otázky" : "otázek"} × ${p.per} ${p.per > 1 ? "body" : "bod"} = ${items * p.per} bodů</span><span class="badge">cca ${p.min} min</span></div>
        <p>${esc(p.desc)}</p>
        <details><summary class="note" style="cursor:pointer">Strategie</summary><ul>${p.strat.map(s => `<li>${esc(s)}</li>`).join("")}</ul></details>
        ${st.total ? `<span class="rd-prog">Hotovo ${st.done}/${st.total}${st.done ? ` · nejlepší výsledky v průměru ${st.avg} %` : ""}</span><i class="pct" style="display:block;height:6px;background:var(--soft);border-radius:3px;overflow:hidden"><i style="display:block;height:100%;width:${pct}%;background:var(--ink)"></i></i>`
          : `<p class="rd-empty">Obsah se připravuje – úlohy pro Part ${p.n} brzy doplníme.</p>`}
        <div class="row"><button class="btn primary rd-start" data-p="${k}" ${st.total ? "" : "disabled"}>Začít</button><button class="btn ghost rd-listbtn" data-p="${k}" ${st.total ? "" : "disabled"}>Seznam úloh</button></div>
      </article>`; }).join("")}</div></div>`;
  stage.querySelectorAll(".rd-start").forEach(b => b.onclick = () => { const t = nextTask(b.dataset.p); if(t) goTask(b.dataset.p, t); });
  stage.querySelectorAll(".rd-listbtn").forEach(b => b.onclick = () => P.go(ID, "part" + PARTS[b.dataset.p].n));
  stage.querySelector(".rd-review").onclick = () => P.go(ID, "review");
  const dueBtn = stage.querySelector(".rd-due"); if(dueBtn) dueBtn.onclick = () => goTask(due[0].part, due[0].task);
}

function viewList(stage, part){
  const p = PARTS[part], ts = tasksOf(part), prog = P.store.get(NS.prog, {}), srs = P.store.get(NS.srs, {}), now = Date.now();
  stage.innerHTML = `<div class="rd"><div class="meta"><button class="link-btn rd-back">← Reading</button><span>${ts.length} úloh</span></div>
    <h2>Part ${p.n} · ${esc(p.kind)}</h2><p class="note">${esc(p.desc)}</p>
    ${ts.length ? `<div class="rd-list">${ts.map(t => { const pr = prog[keyOf(part, t.id)], s = srs[keyOf(part, t.id)];
      return `<button class="card rd-item" data-id="${esc(t.id)}"><div><b>${esc(t.title || t.id)}</b><span>${esc(t.topic || "")}</span></div>
        <span>${pr ? `nejlépe ${pr.best} % · ${pr.tries}×` : "nová"}${s && s.due <= now ? ` · <span class="again">zopakovat</span>` : ""}</span></button>`; }).join("")}</div>`
      : `<p class="rd-empty">Obsah se připravuje – úlohy pro Part ${p.n} brzy doplníme.</p>`}</div>`;
  stage.querySelector(".rd-back").onclick = () => P.go(ID);
  stage.querySelectorAll(".rd-item").forEach(b => b.onclick = () => goTask(part, findTask(part, b.dataset.id)));
}

function viewReview(stage){
  const wrong = P.store.get(NS.wrong, {}), srs = P.store.get(NS.srs, {}), now = Date.now();
  const keys = Object.keys(wrong).sort((a, b) => wrong[b].t - wrong[a].t);
  let html = "";
  keys.forEach(k => {
    const [part, ...rest] = k.split(":"); const t = findTask(part, rest.join(":")); if(!t || !PARTS[part]) return;
    const p = PARTS[part];
    html += `<section class="sheet" style="margin:0 0 14px"><div class="meta"><span>Part ${p.n} · <b>${esc(t.title || t.id)}</b></span>${srs[k] ? `<span class="${srs[k].due <= now ? "again" : "badge"}">${srs[k].due <= now ? "zopakovat dnes" : "zopakovat " + new Date(srs[k].due).toLocaleDateString("cs-CZ")}</span>` : ""}</div>`;
    (wrong[k].items || []).forEach(it => {
      if(part === "p7"){
        const g = gapsOf(t)[it.i], right = getK(t.answers, g), para = (t.paras || []).find(x => x.label === right);
        html += `<div class="rd-rev"><h4>Mezera ${p.first + g - 1}</h4><p class="rd-ans">Tvoje: <span class="bad">${esc(it.given || "–")}</span> · správně: <span class="good">${esc(right)}</span></p>
          ${para ? `<p class="rd-quote">„${esc(String(para.text).trim().slice(0, 220))}${String(para.text).trim().length > 220 ? "…" : ""}“</p>` : ""}<p class="why">${esc(getK(t.why, g) || "")}</p></div>`;
        return;
      }
      const q = (t.questions || [])[it.i]; if(!q) return;
      const n = p.first + it.i;
      const yours = it.given == null ? "–" : part === "p5" ? "ABCD"[it.given] + " " + q.opts[it.given] : it.given;
      const right = part === "p5" ? "ABCD"[q.correct] + " " + q.opts[q.correct] : q.answer;
      const quotes = part === "p6" ? (q.evidence || []) : q.evidence ? [{label:part === "p8" ? q.answer : "", quote:q.evidence}] : [];
      html += `<div class="rd-rev"><p class="rd-qt"><span class="rd-num">${n}</span>${esc(q.q)}</p><p class="rd-ans">Tvoje: <span class="bad">${esc(yours)}</span> · správně: <span class="good">${esc(right)}</span></p>
        <p class="why">${esc(q.why || "")}</p>${quotes.map(e => `<p class="rd-quote">${e.label ? `<b>${esc(e.label)}:</b> ` : ""}„${esc(e.quote)}“</p>`).join("")}</div>`;
    });
    html += `<div class="row" style="margin-top:8px"><button class="btn ghost rd-redo" data-k="${esc(k)}">Zkusit úlohu znovu</button></div></section>`;
  });
  stage.innerHTML = `<div class="rd"><div class="meta"><button class="link-btn rd-back">← Reading</button><span>Revize chyb</span></div>
    <h2>Chyby a revize</h2><p class="note">Poslední chybné odpovědi z každé úlohy. Úlohy s chybou se vracejí k zopakování po 1, 3, 7 a 14 dnech (spaced repetition); po bezchybném vyřešení zmizí.</p>
    ${html || `<p class="rd-empty">Zatím tu nic není – žádné chyby k revizi.</p>`}</div>`;
  stage.querySelector(".rd-back").onclick = () => P.go(ID);
  stage.querySelectorAll(".rd-redo").forEach(b => b.onclick = () => { const [part, ...rest] = b.dataset.k.split(":"); goTask(part, findTask(part, rest.join(":"))); });
}

function render(stage, ctx){
  injectStyle();
  const sub = (ctx && ctx.sub) || "";
  const m = /^(p[5-8])\.(.+)$/.exec(sub);
  if(m){
    const t = findTask(m[1], decodeURIComponent(m[2]));
    if(t){ runTask(stage, m[1], t); return; }
    P.toast("Úloha nenalezena"); viewHome(stage); return;
  }
  const pm = /^part([5-8])$/.exec(sub);
  if(pm){ viewList(stage, "p" + pm[1]); return; }
  if(sub === "review"){ viewReview(stage); return; }
  viewHome(stage);
}

/* ------------------------------------------------------------------ mock (timed Parts 5–8) ------------------------------------------------------------------ */
const MOCK_MIN = 60;
function runMock(stage, finish){
  injectStyle();
  const pick = part => { const ts = tasksOf(part); return ts.length ? ts[Math.floor(Math.random() * ts.length)] : null; };
  const seq = ORDER.map(part => ({part, task:pick(part)})).filter(x => x.task);
  if(!seq.length){
    stage.innerHTML = `<div class="sheet"><p class="rd-empty">Obsah Reading se připravuje.</p><button class="btn primary">Pokračovat</button></div>`;
    stage.querySelector("button").onclick = () => finish({correct:0, total:0, details:[]});
    return;
  }
  stage.innerHTML = `<div class="rd"><div class="rd-mockbar meta"><span class="rd-step"></span><span class="timer rd-mtime"></span></div><div class="rd-mbody"></div></div>`;
  const body = stage.querySelector(".rd-mbody"), stepEl = stage.querySelector(".rd-step");
  const results = []; let idx = 0, cur = null, ended = false, clock = null;
  const done = () => {
    if(ended) return; ended = true; if(clock) clock.stop();
    seq.forEach((s, i) => { if(!results[i]){ const n = itemCount(s.part, s.task); results[i] = Array.from({length:n}, (_, k) => ({i:k, gap:s.part === "p7" ? gapsOf(s.task)[k] : undefined, given:null, ok:false})); } });
    let correct = 0, total = 0; const details = [];
    seq.forEach((s, i) => { const sc = record(s.part, s.task, results[i], "mock"); correct += sc.marks; total += sc.max; details.push({part:"Part " + PARTS[s.part].n, task:s.task.id, correct:sc.marks, total:sc.max}); });
    finish({correct, total, details});
  };
  const step = () => {
    if(ended) return;
    if(idx >= seq.length){ done(); return; }
    const s = seq[idx];
    stepEl.textContent = `Reading · Part ${PARTS[s.part].n} (${idx + 1}/${seq.length})`;
    body.innerHTML = "";
    cur = runTask(body, s.part, s.task, {mock:true, lastInMock:idx === seq.length - 1, onSubmit(res){ results[idx] = res; idx++; step(); }});
    window.scrollTo(0, 0);
  };
  clock = U.countdown(stage.querySelector(".rd-mtime"), MOCK_MIN * 60, () => {
    if(ended) return;
    if(cur && !results[idx]) results[idx] = cur.ctl.grade();
    P.toast("Čas vypršel – test byl odevzdán.");
    done();
  });
  step();
}

/* ------------------------------------------------------------------ register ------------------------------------------------------------------ */
P.register({
  id:ID, short:"Reading", title:"Reading (Part 5–8)",
  blurb:"Čtení s porozuměním: výběr z možností, porovnání názorů, text s mezerami a přiřazování – s ukázkou, kde v textu byla odpověď.",
  render,
  progress(){ const all = ORDER.map(partStats); return {done:all.reduce((s, x) => s + x.done, 0), total:all.reduce((s, x) => s + x.total, 0)}; },
  mock:{paper:"Reading (Part 5–8)", minutes:MOCK_MIN, run:runMock}
});
})();
