/* Use of English (Reading & Use of English Parts 1–4) – drills with spaced repetition, full exam-format tasks, mock, stats, cheat sheet. */
(function(){
"use strict";
const P = window.Portal, U = P.util;
const {esc, norm, plural, shuffle, DAY, todayStr} = U;
const D = () => window.DATA.uoe || {cats:{}, parts:{}, bank:[], tasks:{p1:[],p2:[],p3:[],p4:[]}, cheat:[], wfTables:[], kwtPatterns:[]};
const NS = "uoe:state", OLD_KEY = "uoe-c1-v1";
const INTERVALS = [0, DAY, 3*DAY, 7*DAY, 21*DAY];
const SEED_WEAK = ["inv","ded","wfc","link"];
const OFFSET = {1:1, 2:9, 3:17, 4:25};
const PART_NAMES = {1:"Multiple-choice cloze", 2:"Open cloze", 3:"Word formation", 4:"Key word transformation"};
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
.uoe-passage{font-family:var(--serif);font-size:18.5px;line-height:2.1;margin:0 0 18px}
.uoe-n{display:inline-block;min-width:1.7em;font-family:var(--sans);font-size:12.5px;font-weight:600;text-align:center;background:var(--ink);color:var(--paper);border-radius:3px;padding:0 4px;margin-right:4px;vertical-align:2px;line-height:1.6}
.uoe-gap{appearance:none;background:none;border:0;border-bottom:2px solid var(--ink);font:inherit;color:var(--ink);padding:0 4px;cursor:pointer;min-width:6ch}
.uoe-passage .gap-in{font-size:inherit;line-height:1.3}
.uoe-ex{color:var(--muted)}
.uoe-mcrow{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:8px 0;border-top:1px solid var(--rule)}
.uoe-o{appearance:none;min-height:40px;padding:4px 12px;border:1.5px solid var(--rule);border-radius:6px;background:transparent;color:var(--ink);font-family:var(--serif);font-size:17px;cursor:pointer}
.uoe-o i{font-family:var(--sans);font-style:normal;font-size:12.5px;color:var(--muted);margin-right:6px}
.uoe-o[aria-pressed="true"]{border-color:var(--ink);background:var(--soft);font-weight:600}
.uoe-o.right{border-color:var(--green);background:color-mix(in srgb,var(--green) 12%,transparent)}
.uoe-o.wrong{border-color:var(--red);text-decoration:line-through}
.uoe-kt{border-top:1px solid var(--rule);padding:12px 0 4px}
.uoe-kt .text{font-size:19px;line-height:2}
.uoe-kt .gap-in{min-width:14ch;width:26ch}
.uoe-rev{list-style:none;padding:0;margin:14px 0 18px;display:grid;gap:10px}
.uoe-rev li{border-top:1px solid var(--rule);padding-top:10px;font-size:15.5px}
.uoe-rev .ok{color:var(--green);font-weight:600}.uoe-rev .bad{color:var(--red);font-weight:600}
.uoe-sticky{position:sticky;top:0;z-index:5;background:var(--paper);padding:8px 0;display:flex;justify-content:space-between;align-items:center;gap:10px}
.uoe-tbl{width:100%;border-collapse:collapse;font-size:14.5px;margin:0 0 12px}
.uoe-tbl td{border-top:1px solid var(--rule);padding:5px 6px;vertical-align:top}
.uoe-tbl td:first-child{font-weight:600;white-space:nowrap}
.uoe-list .card b{font-size:18px}`;
  document.head.appendChild(s);
})();

/* ---------- storage (+ one-time migration from the standalone trainer) ---------- */
function blank(){ return {items:{}, cats:{}, log:[], days:[], tasks:{}}; }
function load(){
  let s = P.store.get(NS, null);
  if(s && s.items) { s.tasks = s.tasks || {}; return s; }
  try{
    const old = JSON.parse(localStorage.getItem(OLD_KEY));
    if(old && old.items){ s = Object.assign(blank(), old, {tasks:{}, migrated:Date.now()}); P.store.set(NS, s); return s; }
  }catch(e){}
  return blank();
}
let st = null;
const S = () => st || (st = load());
function save(){ P.store.set(NS, st); }
function touchDay(){ const t = todayStr(); if(!st.days.includes(t)){ st.days.push(t); if(st.days.length > 400) st.days = st.days.slice(-400); } }

let BY_ID = null;
function bank(){ const b = D().bank; if(!BY_ID){ BY_ID = {}; b.forEach(it => { BY_ID[it.id] = it; }); } return b; }

/* ---------- answer checking ---------- */
const CONTR = [[/\bcan't\b/g,"can not"],[/\bcannot\b/g,"can not"],[/\bwon't\b/g,"will not"],[/\bshan't\b/g,"shall not"],[/n't\b/g," not"],[/'re\b/g," are"],[/'ve\b/g," have"],[/'m\b/g," am"],[/'ll\b/g," will"],[/'d\b/g," 'd"],[/'s\b/g," 's"]];
function toks(s){ let t = norm(s); CONTR.forEach(([r,v]) => { t = t.replace(r, v); }); return t.split(" ").filter(Boolean); }
const tokEq = (a,b) => a === b || (a==="'d" && (b==="had"||b==="would")) || (b==="'d" && (a==="had"||a==="would")) || (a==="'s" && (b==="is"||b==="has")) || (b==="'s" && (a==="is"||a==="has"));
const seqEq = (a,b) => a.length === b.length && a.every((x,i) => tokEq(x,b[i]));
function seqIn(hay, needle){ for(let i=0;i+needle.length<=hay.length;i++) if(needle.every((x,j) => tokEq(hay[i+j],x))) return true; return false; }
function keyOk(given, key){ return norm(given).split(" ").includes(key.toLowerCase().replace(/[’‘]/g,"'")); }
/* Part 4 scoring like Cambridge: 2 = full, 1 = one of the two parts, 0 if key changed/missing or >6 words */
function scoreKT(it, given){
  const g = toks(given), n = g.length;
  if(!String(given||"").trim()) return {marks:0, note:"bez odpovědi"};
  if(!keyOk(given, it.key)) return {marks:0, note:`chybí klíčové slovo ${it.key} v nezměněném tvaru`};
  if(n > 6) return {marks:0, note:`${n} ${plural(n)} – limit je 3 až 6 (stažené tvary = 2 slova)`};
  if(it.ans.some(a => seqEq(g, toks(a)))) return {marks:2, full:true, note:""};
  if(!it.parts) return {marks:0, note:""};
  const hit = it.parts.map(alts => alts.some(a => seqIn(g, toks(a))));
  const m = hit.filter(Boolean).length ? 1 : 0;
  return {marks:m, hit, note: m ? `část ${hit[0] ? 1 : 2} správně` : ""};
}
function checkText(it, given){
  if(it.type === "kt") return scoreKT(it, given).marks === 2;
  return it.ans.map(norm).includes(norm(given));
}

/* ---------- module-level UI state ---------- */
let box = null, view = "train", sess = null, partFilter = 0, resetArmed = false, curTask = null, taskFilter = 1;

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

/* ================= TRÉNINK (drills) ================= */
function buildSession(n=10){
  const now = Date.now(), items = S().items;
  const pool = bank().filter(it => !partFilter || it.part === partFilter);
  const due = pool.filter(it => items[it.id] && items[it.id].due <= now)
    .sort((a,b) => (items[a.id].box - items[b.id].box) || (weak(b.cat) - weak(a.cat)));
  let pick = due.slice(0, n);
  if(pick.length < n){
    const fresh = pool.filter(it => !items[it.id]).map(it => ({it, w: weak(it.cat) + Math.random()*0.35}))
      .sort((a,b) => b.w - a.w).map(x => x.it);
    pick = pick.concat(fresh.slice(0, n - pick.length));
  }
  if(pick.length < n){
    const rest = pool.filter(it => !pick.includes(it)).sort((a,b) => (items[a.id].box - items[b.id].box) || (Math.random() - .5));
    pick = pick.concat(rest.slice(0, n - pick.length));
  }
  return shuffle(pick);
}
const orderFor = it => it.type === "mc" ? shuffle(it.opts.map((_,i)=>i)) : null;
function startSession(){
  const items = buildSession(10);
  sess = {queue: items.map(item => ({item, retry:false, order:orderFor(item)})), i:0, n:items.length, phase:"q", fb:null, results:[], hinted:false, logged:false, part:partFilter};
  renderTrain();
}
function record(it, ok, hinted, retry, given){
  S(); const s = st.items[it.id] || (st.items[it.id] = {box:0, due:0, seen:0, ok:0});
  s.seen++; if(ok) s.ok++;
  if(!retry){ const c = st.cats[it.cat] || (st.cats[it.cat] = {seen:0, ok:0}); c.seen++; if(ok) c.ok++; }
  if(ok) s.box = (!hinted && !retry) ? Math.min(4, s.box+1) : Math.max(s.box, 1); else s.box = 0;
  s.due = Date.now() + INTERVALS[s.box];
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
function filledText(it){ const p = it.text.split("____"); return esc(p[0]) + "<b>" + esc(correctDisplay(it)) + "</b>" + esc(p[1] || ""); }
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
  } else if(it.type === "mc") inner = `<span class="gap-blank"></span>`;
  else { const w = Math.max(8, Math.max(...it.ans.map(a => a.length)) + 2);
    inner = `<input id="uoe-ans" class="gap-in" style="width:${w}ch" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Tvoje odpověď">`; }
  const parts = it.text.split("____");
  let html = `<section class="sheet uoe-train">
    <div class="meta"><span>${esc(D().parts[it.part])}</span><span>${q.retry ? '<span class="again">ještě jednou</span>' : pos + " / " + sess.n}</span></div>
    <div class="bar"><i style="width:${Math.round(done / sess.n * 100)}%"></i></div>`;
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
      `<button class="btn ghost" id="uoe-idk">Nevím</button></div><p class="hint" id="uoe-hintTxt" aria-live="polite"></p>`;
  } else {
    const alts = it.ans && it.ans.length > 1 ? `<p class="alts">Uznává se i: ${it.ans.slice(1,3).map(esc).join(" · ")}</p>` : "";
    const verdict = fb.ok ? "Správně." : (q.retry ? "Znovu chyba, vrátí se v dalším kole." : "Chyba, vrátí se za pár úloh.");
    const last = sess.i === sess.queue.length - 1;
    html += `<div class="fb ${fb.ok ? "" : "bad"}" aria-live="polite"><p class="verdict">${verdict}</p><p class="why">${esc(it.why)}</p>${alts}</div>
      <div class="row"><button class="btn primary" id="uoe-next">${last ? "Dokončit" : "Dál"}</button></div>`;
  }
  box.innerHTML = html + `</section>`;
  if(fb){ $b("#uoe-next").focus(); $b("#uoe-next").onclick = next; return; }
  if(it.type === "mc") box.querySelectorAll(".opt").forEach(b => b.onclick = () => submit(+b.dataset.k, false));
  else {
    const inp = $b("#uoe-ans"); inp.focus();
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
  box.innerHTML = `<section class="sheet home">
    <p>Každé kolo má 10 úloh z celé zkoušky. Chyby se vrací ještě ve stejném kole a pak znovu dřív než zbytek, správné odpovědi se opakují po 1, 3, 7 a 21 dnech. Častěji ti vychází to, v čem chybuješ.</p>
    <div class="chips" role="group" aria-label="Část zkoušky">
      ${[[0,"Všechno"],[1,"Part 1"],[2,"Part 2"],[3,"Part 3"],[4,"Part 4"]].map(([k,l]) => `<button class="chip" data-p="${k}" aria-pressed="${partFilter === k}">${l}</button>`).join("")}
    </div>
    <button class="btn primary" id="uoe-start">Začít kolo</button>
    <p class="plan">${weakLine}<br>K opakování: ${dueN} · nových úloh: ${freshN} · v bance: ${B.length}</p>
  </section>`;
  box.querySelectorAll(".chip").forEach(c => c.onclick = () => { partFilter = +c.dataset.p; renderTrainHome(); });
  $b("#uoe-start").onclick = startSession;
}
function renderDone(){
  const first = sess.results, okN = first.filter(r => r.ok).length, errs = first.filter(r => !r.ok);
  if(!sess.logged){ sess.logged = true; P.logActivity("uoe", sess.part ? "p"+sess.part : "mix", okN, first.length, {kind:"drill"}); }
  box.innerHTML = `<section class="sheet">
    <p class="score">${okN} z ${first.length} napoprvé</p>
    <p class="note" style="font-size:15px;margin:0">${errs.length ? "Chybné úlohy se vrátí hned v dalším kole." : "Čisté kolo. Příště dostaneš těžší a nové úlohy."}</p>
    ${errs.length ? `<ul class="errs">${errs.map(r => `<li>${filledText(r.it)}<br><span class="note">${esc(r.it.why)}</span></li>`).join("")}</ul>` : `<div style="height:18px"></div>`}
    <div class="row"><button class="btn primary" id="uoe-again">Další kolo</button><button class="btn ghost" id="uoe-toStats">Pokrok</button></div>
  </section>`;
  $b("#uoe-again").onclick = startSession;
  $b("#uoe-toStats").onclick = () => { sess = null; P.go("uoe","stats"); };
}
document.addEventListener("keydown", e => {
  if(!box || !box.isConnected || view !== "train" || !sess || sess.i >= sess.queue.length) return;
  if(e.target !== document.body) return;
  const it = sess.queue[sess.i].item;
  if(sess.phase === "fb" && e.key === "Enter"){ e.preventDefault(); next(); return; }
  if(sess.phase === "q" && it.type === "mc"){
    const k = "abcd".indexOf(e.key.toLowerCase()), n = "1234".indexOf(e.key), idx = k >= 0 ? k : n;
    if(idx >= 0 && idx < it.opts.length) submit(sess.queue[sess.i].order[idx], false);
  }
});

/* ================= CELÉ ÚLOHY (exam format) ================= */
function taskHTML(part, t){
  const off = OFFSET[part];
  let h = `<div class="uoe-task" data-part="${part}"><div class="meta"><span><b>Part ${part}</b> · ${PART_NAMES[part]} · ${esc(t.title)}</span><span>${part===4 ? "25–30" : off+"–"+(off+7)}</span></div>
    <p class="uoe-instr">${esc(INSTR[part])}</p>`;
  if(part === 4){
    t.items.forEach((it,i) => {
      const [a,b] = it.text.split("____");
      h += `<div class="uoe-kt"><p class="orig"><span class="uoe-n">${off+i}</span> ${esc(it.a)}</p><p class="keyrow"><span class="keybox">${esc(it.key)}</span></p>
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
      h += `<button class="uoe-gap" data-g="${g-1}" aria-label="Mezera ${off+g-1}"><span class="uoe-n">${off+g-1}</span><span class="uoe-fill">……</span></button>`;
    } else {
      const it = t.items[g-1];
      const w = part === 3 ? Math.max(10, Math.max(...it.ans.map(a=>a.length)) + 2) : 9;
      h += `<span style="white-space:nowrap"><span class="uoe-n">${off+g-1}</span><input class="gap-in uoe-in" data-g="${g-1}" style="width:${w}ch" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Mezera ${off+g-1}"></span>${part===3 ? `<span class="keybox inline">${esc(it.key)}</span>` : ""}`;
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
function bindTask(sec, part, t){
  const sel = Array(t.items.length).fill(null);
  if(part === 1){
    sec.querySelectorAll(".uoe-o").forEach(b => b.onclick = () => {
      if(sec.dataset.done) return;
      const g = +b.dataset.g, k = +b.dataset.k; sel[g] = k;
      sec.querySelectorAll(`.uoe-o[data-g="${g}"]`).forEach(x => x.setAttribute("aria-pressed", String(+x.dataset.k === k)));
      sec.querySelector(`.uoe-gap[data-g="${g}"] .uoe-fill`).textContent = t.items[g].opts[k];
    });
    sec.querySelectorAll(".uoe-gap").forEach(b => b.onclick = () => { const r = sec.querySelector(`.uoe-mcrow[data-g="${b.dataset.g}"] .uoe-o`); if(r) r.focus(); });
  }
  return {answers: () => part === 1 ? sel.slice() : [...sec.querySelectorAll(".uoe-in")].map(i => i.value.trim())};
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
  sec.querySelectorAll(".uoe-in").forEach(i => { i.disabled = true; });
  if(part === 1){
    sec.querySelectorAll(".uoe-o").forEach(b => { const it = t.items[+b.dataset.g], k = +b.dataset.k; b.disabled = true;
      if(k === it.correct) b.classList.add("right"); else if(b.getAttribute("aria-pressed") === "true") b.classList.add("wrong"); });
  }
  if(part !== 4) sec.querySelectorAll(".uoe-in, .uoe-gap").forEach(el => {
    const i = +el.dataset.g, r = g.res[i];
    const span = document.createElement("span");
    span.className = "filled " + (r.marks ? "ok" : "bad");
    span.innerHTML = r.marks ? esc(r.given) : `<s>${r.given ? esc(r.given) : "&nbsp;&nbsp;&nbsp;"}</s><b class="pen">${esc(r.correct)}</b>`;
    if(el.classList.contains("uoe-gap")){ const n = el.querySelector(".uoe-n").outerHTML; el.replaceWith(Object.assign(document.createElement("span"), {innerHTML: n})); sec.querySelector(".uoe-passage").querySelectorAll(".uoe-n").forEach(x => { if(x.textContent == off+i && !x.nextSibling) x.after(span); }); }
    else el.replaceWith(span);
  });
  const rows = t.items.map((it,i) => { const r = g.res[i];
    const verdict = `<span class="${r.marks === mx ? "ok" : "bad"}">${r.marks}/${mx}</span>`;
    const alts = (part === 4 ? it.ans.slice(1,4) : (r.alts || [])).filter(Boolean);
    return `<li><span class="uoe-n">${off+i}</span> ${verdict} · tvoje: <i>${r.given ? esc(r.given) : "—"}</i> · správně: <b>${esc(r.correct)}</b>${alts.length ? ` <span class="note">(uznává se i: ${alts.map(esc).join(" · ")})</span>` : ""}${r.note ? `<br><span class="note">${esc(r.note)}</span>` : ""}<br>${esc(it.why)}</li>`; }).join("");
  if(part === 4){
    t.items.forEach((it,i) => { const r = g.res[i], fb = sec.querySelector(`.uoe-fb[data-g="${i}"]`);
      fb.className = "fb" + (r.marks === 2 ? "" : " bad");
      fb.innerHTML = `<p class="verdict">${r.marks} / 2 ${r.note ? "· " + esc(r.note) : ""}</p><p class="why">Správně: <b>${esc(it.ans[0])}</b>. ${esc(it.why)}</p>`; });
  } else { const ul = sec.querySelector(".uoe-rev"); ul.hidden = false; ul.innerHTML = rows; }
}
function allTasks(){ const T = D().tasks; return [1,2,3,4].flatMap(p => (T["p"+p] || []).map(t => ({p, t}))); }

function renderTasks(){
  if(curTask) return renderTaskRun();
  const T = D().tasks["p"+taskFilter] || [], done = S().tasks;
  box.innerHTML = `<section class="sheet home"><p>Celé úlohy přesně ve formátu zkoušky: text s očíslovanými mezerami, hodnocení jako na Cambridge (Part 1–3: 1 bod za mezeru, Part 4: až 2 body za větu). Na celou část 1–4 počítej zhruba 45 minut.</p>
    <div class="chips" role="group" aria-label="Část">${[1,2,3,4].map(p => `<button class="chip" data-p="${p}" aria-pressed="${taskFilter===p}">Part ${p}</button>`).join("")}</div>
    <div class="cards uoe-list">${T.map((t,i) => { const r = done[t.id];
      return `<button class="card" data-i="${i}"><b>${esc(t.title)}</b><span>${PART_NAMES[taskFilter]} · ${r ? `nejlépe ${r.best}/${r.max} (${r.n}×)` : "nezkoušeno"}</span><i class="pct"><i style="width:${r ? Math.round(100*r.best/r.max) : 0}%"></i></i></button>`; }).join("")}</div></section>`;
  box.querySelectorAll(".chip").forEach(c => c.onclick = () => { taskFilter = +c.dataset.p; renderTasks(); });
  box.querySelectorAll(".card").forEach(c => c.onclick = () => { curTask = {p:taskFilter, t:T[+c.dataset.i]}; renderTasks(); window.scrollTo(0,0); });
}
function renderTaskRun(){
  const {p, t} = curTask;
  box.innerHTML = `<section class="sheet">${taskHTML(p, t)}<div class="row"><button class="btn primary" id="uoe-tcheck">Zkontrolovat</button><button class="btn ghost" id="uoe-tback">Zpět na seznam</button></div><p class="hint" id="uoe-tscore" aria-live="polite"></p></section>`;
  const sec = box.querySelector(".uoe-task"), ctl = bindTask(sec, p, t);
  $b("#uoe-tback").onclick = () => { curTask = null; renderTasks(); };
  $b("#uoe-tcheck").onclick = () => {
    const g = gradeTask(p, t, ctl.answers()); paintReview(sec, p, t, g);
    const r = S().tasks[t.id] || {best:0, n:0};
    st.tasks[t.id] = {best: Math.max(r.best, g.score), max: g.max, last: g.score, n: r.n + 1, t: Date.now()};
    touchDay(); save(); P.logActivity("uoe", "p"+p, g.score, g.max, {kind:"task", task:t.id});
    $b("#uoe-tscore").innerHTML = `<span class="score" style="font-size:30px">${g.score} / ${g.max}</span>`;
    const btn = $b("#uoe-tcheck"); btn.textContent = "Další úloha"; btn.onclick = () => {
      const list = D().tasks["p"+p], i = list.indexOf(t); curTask = {p, t: list[(i+1) % list.length]}; renderTasks(); window.scrollTo(0,0); };
  };
}

/* ================= POKROK ================= */
function renderStats(){
  const s = S(), items = Object.values(s.items), B = bank(), C = D().cats;
  const seen = items.reduce((a,x) => a + x.seen, 0), cats = Object.values(s.cats);
  const first = cats.reduce((a,c) => a + c.seen, 0), firstOk = cats.reduce((a,c) => a + c.ok, 0);
  const mastered = items.filter(x => x.box >= 3).length;
  const all = allTasks(), tdone = all.filter(x => s.tasks[x.t.id]);
  const catRows = Object.keys(C).map(c => ({c, v: s.cats[c] || {seen:0, ok:0}})).sort((a,b) => (a.v.seen ? a.v.ok/a.v.seen : 2) - (b.v.seen ? b.v.ok/b.v.seen : 2));
  const log = s.log.slice(-12).reverse().filter(l => BY_ID[l.id]);
  const partRows = [1,2,3,4].map(p => { const xs = all.filter(x => x.p === p && s.tasks[x.t.id]); const pct = xs.length ? Math.round(100 * xs.reduce((a,x) => a + s.tasks[x.t.id].best/s.tasks[x.t.id].max, 0) / xs.length) : 0;
    return `<div class="cat"><div class="top"><span>Part ${p} · ${PART_NAMES[p]}</span><span>${xs.length ? pct + " % (" + xs.length + " úloh)" : "zatím nic"}</span></div><div class="track"><i class="${xs.length && pct < 60 ? "low" : ""}" style="width:${pct}%"></i></div></div>`; }).join("");
  box.innerHTML = `
    <div class="grid">
      <div class="stat"><b>${seen}</b><span>zodpovězeno</span></div>
      <div class="stat"><b>${first ? Math.round(firstOk/first*100) : 0} %</b><span>správně napoprvé</span></div>
      <div class="stat"><b>${mastered} / ${B.length}</b><span>zvládnuté úlohy</span></div>
      <div class="stat"><b>${tdone.length} / ${all.length}</b><span>celé úlohy</span></div>
      <div class="stat"><b>${streak()}</b><span>dní v řadě</span></div>
    </div>
    <h2>Celé úlohy (nejlepší výsledek)</h2><div class="cats">${partRows}</div>
    <h2>Podle témat</h2>
    <div class="cats">${catRows.map(({c,v}) => { const pct = v.seen ? Math.round(v.ok/v.seen*100) : 0;
      return `<div class="cat"><div class="top"><span>${esc(C[c])}</span><span>${v.seen ? v.ok + " z " + v.seen : "zatím nic"}</span></div><div class="track"><i class="${v.seen && pct < 60 ? "low" : ""}" style="width:${pct}%"></i></div></div>`; }).join("")}</div>
    <h2>Poslední chyby</h2>
    ${log.length ? `<ul class="errs">${log.map(l => { const it = BY_ID[l.id]; return `<li>${filledText(it)}${l.given ? `<br><span class="note">napsal jsi: <s>${esc(l.given)}</s></span>` : ""}</li>`; }).join("")}</ul>` : `<p class="note">Zatím žádné. Udělej první kolo.</p>`}
    <p><button class="link-btn" id="uoe-reset">${resetArmed ? "Opravdu smazat? Klikni znovu" : "Smazat postup"}</button></p>`;
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
  const all = d.cheat.concat([["Part 3: přípony podle slovních druhů", tables], ["Part 4: 40 nejčastějších vzorů", pats]]);
  box.innerHTML = `<div class="cheat">${all.map(([t,b],i) => `<details ${i===0?"open":""}><summary>${esc(t)}</summary><div class="body">${b}</div></details>`).join("")}</div>`;
}

/* ================= router ================= */
const TABS = [["train","Trénink"],["tasks","Celé úlohy"],["stats","Pokrok"],["cheat","Tahák"]];
function render(stage, ctx){
  let sub = (ctx && ctx.sub) || "train";
  if(/^p[1-4]$/.test(sub)){ taskFilter = +sub[1]; sub = "tasks"; }
  if(!TABS.some(t => t[0] === sub)) sub = "train";
  view = sub; resetArmed = false;
  stage.innerHTML = `<nav class="sub-tabs" role="tablist" aria-label="Use of English">${TABS.map(([k,l]) => `<button class="tab" role="tab" data-v="${k}" aria-selected="${k===view}">${l}</button>`).join("")}</nav><div class="uoe-view"></div>`;
  stage.querySelectorAll(".sub-tabs .tab").forEach(b => b.onclick = () => P.go("uoe", b.dataset.v));
  box = stage.querySelector(".uoe-view"); S(); bank();
  if(view === "train") renderTrain(); else if(view === "tasks") renderTasks(); else if(view === "stats") renderStats(); else renderCheat();
}

/* ================= mock (Parts 1–4, 45 min, 36 marks) ================= */
function runMock(stage, finish){
  S(); bank();
  const T = D().tasks, pick = [1,2,3,4].map(p => ({p, t: T["p"+p][Math.floor(Math.random()*T["p"+p].length)]}));
  stage.innerHTML = `<div class="uoe-sticky"><b>Reading &amp; Use of English · Part 1–4</b><span class="timer" id="uoe-mtimer">45:00</span></div>
    ${pick.map(x => `<section class="sheet" style="margin-bottom:16px">${taskHTML(x.p, x.t)}</section>`).join("")}
    <div class="row"><button class="btn primary" id="uoe-msubmit">Odevzdat</button></div><div id="uoe-mres" aria-live="polite"></div>`;
  const secs = [...stage.querySelectorAll(".uoe-task")], ctls = secs.map((s,i) => bindTask(s, pick[i].p, pick[i].t));
  let over = false;
  const timer = U.countdown(stage.querySelector("#uoe-mtimer"), 45*60, () => end(true));
  function end(timeout){
    if(over) return; over = true; timer.stop();
    let correct = 0, total = 0; const details = {};
    secs.forEach((s,i) => { const g = gradeTask(pick[i].p, pick[i].t, ctls[i].answers()); paintReview(s, pick[i].p, pick[i].t, g);
      correct += g.score; total += g.max; details["p"+pick[i].p] = {task: pick[i].t.id, score: g.score, max: g.max}; });
    const btn = stage.querySelector("#uoe-msubmit"); btn.textContent = "Pokračovat";
    stage.querySelector("#uoe-mres").innerHTML = `<p class="score">${correct} / ${total}</p><p class="note">${timeout ? "Čas vypršel. " : ""}${Object.entries(details).map(([k,v]) => `${k.toUpperCase()}: ${v.score}/${v.max}`).join(" · ")}. Projdi si opravy výše a pokračuj.</p>`;
    let sent = false; btn.onclick = () => { if(sent) return; sent = true; finish({correct, total, details}); };
  }
  stage.querySelector("#uoe-msubmit").onclick = () => end(false);
}

P.register({
  id:"uoe", title:"Use of English (Part 1–4)", short:"Use of English",
  blurb:"Reading & Use of English Part 1–4: drily s opakováním, celé úlohy, tahák.",
  render,
  progress(){
    const s = S(), B = bank(), all = allTasks();
    return {done: B.filter(it => s.items[it.id] && s.items[it.id].box >= 1).length + all.filter(x => s.tasks[x.t.id]).length, total: B.length + all.length};
  },
  mock:{paper:"Reading & Use of English (Part 1–4)", minutes:45, run: runMock}
});
})();
