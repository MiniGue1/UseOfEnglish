/* Vocabulary trainer – spaced repetition (SM-2 style), flashcards, cloze, multiple choice, word formation. */
(function(){
"use strict";
const P = window.Portal; if(!P) return;
const {esc, norm, shuffle, todayStr, DAY} = P.util;
const ID = "vocab";
const V = () => (window.DATA && window.DATA.vocab) || {cards:[], wordFamilies:[], types:[], topics:[]};
const PREPS = ["of","for","in","on","to","with","from","at","by","about","against","into","over"];

/* ---------- style (scoped .vc-) ---------- */
if(!document.getElementById("vc-style")){
  const st = document.createElement("style"); st.id = "vc-style";
  st.textContent = `
.vc-card{border:1.5px solid var(--rule);border-radius:10px;padding:26px 20px;text-align:center;background:var(--sheet);min-height:170px;display:flex;flex-direction:column;justify-content:center;gap:8px}
.vc-front{font-family:var(--serif);font-size:clamp(24px,6vw,32px);line-height:1.2}
.vc-back{font-size:17px}.vc-ex{font-family:var(--serif);font-size:18px;color:var(--ink)}.vc-ex b{background:var(--hl);font-weight:600;padding:0 2px}
.vc-tip{font-size:14px;color:var(--muted)}
.vc-grade{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:14px}.vc-grade .btn{padding:0 6px;font-size:15px}
.vc-list{list-style:none;margin:0;padding:0}.vc-list li{display:flex;gap:10px;align-items:center;border-top:1px solid var(--rule);padding:9px 0}
.vc-list .w{flex:1;min-width:0}.vc-list .w b{font-family:var(--serif);font-weight:500;font-size:18px}.vc-list .w span{display:block;color:var(--muted);font-size:14px}
.vc-ic{appearance:none;background:none;border:1.5px solid var(--rule);border-radius:6px;min-width:40px;min-height:40px;color:var(--ink);cursor:pointer;font-size:16px}
.vc-ic[aria-pressed="true"]{border-color:var(--ink);background:var(--soft)}
.vc-fam{width:100%;border-collapse:collapse;font-size:14.5px;margin:6px 0}.vc-fam th{text-align:left;color:var(--muted);font-weight:500;padding:3px 8px 3px 0;vertical-align:top;width:90px}.vc-fam td{padding:3px 0}
.vc-filters summary{cursor:pointer;color:var(--muted);margin:0 0 10px}
.vc-small .chip{min-height:34px;font-size:14px;padding:0 11px}`;
  document.head.appendChild(st);
}

/* ---------- storage ---------- */
const srs = () => P.store.get("vocab:srs", {});
const saveSrs = s => P.store.set("vocab:srs", s);
const settings = () => Object.assign({goal:20, newPerDay:10, types:[], topics:[], dir:"en"}, P.store.get("vocab:settings", {}));
const saveSettings = s => P.store.set("vocab:settings", s);
const stats = () => Object.assign({ans:0, ok:0, rev:0, revOk:0}, P.store.get("vocab:stats", {}));
const daily = () => P.store.get("vocab:daily", {});
const today = () => todayStr();
const addDays = n => todayStr(new Date(Date.now() + n*DAY));
const isLearned = st => !!st && (st.k || st.r >= 2);
const isDifficult = st => !!st && !st.k && (st.l >= 2 || (st.ko > 0 && st.ko >= st.ok));
const answerOf = c => (c.ex.match(/\*\*(.+?)\*\*/) || [,""])[1];
const exHtml = ex => esc(ex).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
const typeName = id => (V().types.find(t => t.id === id) || {cs:id}).cs;
const topicName = id => (V().topics.find(t => t.id === id) || {cs:id}).cs;

/* SM-2 grade: q 0–5 */
function grade(id, q, isNew){
  const all = srs(); const s = all[id] || {r:0, ef:2.5, iv:0, l:0, ok:0, ko:0};
  if(q < 3){ s.r = 0; s.iv = 1; s.l = (s.l||0) + 1; s.ko = (s.ko||0) + 1; s.ef = Math.max(1.3, s.ef - 0.2); }
  else {
    s.r = (s.r||0) + 1; s.ok = (s.ok||0) + 1;
    s.iv = s.r === 1 ? 1 : s.r === 2 ? (q === 3 ? 2 : 3) : Math.round(s.iv * s.ef * (q === 3 ? 0.8 : 1));
    s.ef = Math.max(1.3, s.ef + (0.1 - (5-q)*(0.08 + (5-q)*0.02)));
  }
  s.due = addDays(s.iv); s.last = today(); all[id] = s; saveSrs(all);
  const st = stats(); st.ans++; if(q >= 3) st.ok++; if(!isNew){ st.rev++; if(q >= 3) st.revOk++; } P.store.set("vocab:stats", st);
  const d = daily(); const t = today(); d[t] = d[t] || {n:0, nw:0}; d[t].n++; if(isNew) d[t].nw++;
  const keys = Object.keys(d).sort(); while(keys.length > 60) delete d[keys.shift()];
  P.store.set("vocab:daily", d);
}
function toggle(id, key){
  const all = srs(); const s = all[id] || {r:0, ef:2.5, iv:0, l:0, ok:0, ko:0};
  s[key] = !s[key];
  if(key === "k" && s.k){ s.r = Math.max(s.r, 3); s.iv = 30; s.due = addDays(30); }
  all[id] = s; saveSrs(all); return s[key];
}

/* ---------- pools ---------- */
function filtered(){
  const s = settings();
  return V().cards.filter(c => (!s.types.length || s.types.includes(c.type)) && (!s.topics.length || s.topics.includes(c.topic)));
}
function dueCards(pool){ const all = srs(), t = today(); return pool.filter(c => all[c.id] && all[c.id].due && all[c.id].due <= t && !all[c.id].k); }
function newCards(pool){ const all = srs(); return pool.filter(c => !all[c.id]); }
function newLeftToday(){ const d = daily()[today()]; return Math.max(0, settings().newPerDay - (d ? d.nw : 0)); }
function buildSession(kind, size){
  const pool = filtered(), all = srs();
  if(kind === "difficult") return shuffle(V().cards.filter(c => isDifficult(all[c.id]))).slice(0, size);
  if(kind === "star") return shuffle(V().cards.filter(c => all[c.id] && all[c.id].s)).slice(0, size);
  if(kind === "random") return shuffle(pool).slice(0, size);
  const due = shuffle(dueCards(pool)).slice(0, size);
  const nw = shuffle(newCards(pool)).slice(0, Math.min(size - due.length, newLeftToday()));
  return shuffle(due.concat(nw));
}

/* ---------- distractors ---------- */
function options(c){
  const ans = answerOf(c); const al = ans.toLowerCase();
  let pool;
  if(c.dis && c.dis.length >= 3) pool = shuffle(c.dis).slice(0, 3);
  else if(c.type === "dependent preposition") pool = shuffle(PREPS.filter(p => p !== al)).slice(0, 3);
  else {
    const same = V().cards.filter(x => x.type === c.type && x.id !== c.id && answerOf(x).toLowerCase() !== al);
    const nWords = ans.split(" ").length;
    const close = same.filter(x => x.topic === c.topic && Math.abs(answerOf(x).split(" ").length - nWords) <= 1);
    const rest = same.filter(x => !close.includes(x));
    pool = []; for(const x of shuffle(close).concat(shuffle(rest))){ const a = answerOf(x); if(!pool.some(p => p.toLowerCase() === a.toLowerCase())) pool.push(a); if(pool.length === 3) break; }
  }
  return shuffle([ans].concat(pool));
}

/* ---------- UI helpers ---------- */
const SUBS = [["overview","Přehled"],["flash","Kartičky"],["cloze","Doplňování"],["mc","Výběr"],["wf","Slovotvorba"],["list","Seznam"]];
function frame(stage, sub){
  stage.innerHTML = `<div class="sub-tabs" role="tablist">${SUBS.map(([k,l]) => `<button class="tab" role="tab" data-k="${k}" aria-selected="${k===sub}">${l}</button>`).join("")}</div><div class="vc-body"></div>`;
  stage.querySelectorAll(".sub-tabs .tab").forEach(b => b.onclick = () => P.go(ID, b.dataset.k));
  return stage.querySelector(".vc-body");
}
const speakBtn = text => P.tts && P.tts.supported ? `<button class="vc-ic vc-say" data-say="${esc(text)}" aria-label="Přehrát výslovnost" title="Výslovnost">▶</button>` : "";
function wireSpeak(root){ root.querySelectorAll(".vc-say").forEach(b => b.onclick = e => { e.stopPropagation(); P.tts.stop(); P.tts.speak(b.dataset.say, {lang:"en-GB"}); }); }
function filterChips(onChange){
  const s = settings();
  const chip = (kind, id, label, on) => `<button class="chip" data-kind="${kind}" data-id="${esc(id)}" aria-pressed="${on}">${esc(label)}</button>`;
  const html = `<details class="vc-filters"${(s.types.length || s.topics.length) ? " open" : ""}><summary>Filtry (typ ${s.types.length || "vše"}, téma ${s.topics.length || "vše"})</summary>
    <div class="chips vc-small">${V().types.map(t => chip("types", t.id, t.cs, s.types.includes(t.id))).join("")}</div>
    <div class="chips vc-small">${V().topics.map(t => chip("topics", t.id, t.cs, s.topics.includes(t.id))).join("")}</div></details>`;
  return {html, wire(root){ root.querySelectorAll(".vc-filters .chip").forEach(b => b.onclick = () => {
    const st = settings(); const arr = st[b.dataset.kind]; const i = arr.indexOf(b.dataset.id);
    if(i >= 0) arr.splice(i, 1); else arr.push(b.dataset.id); saveSettings(st); onChange(); }); }};
}

/* ---------- overview ---------- */
function overview(body, rerender){
  const cards = V().cards, all = srs(), st = stats(), s = settings();
  const learned = cards.filter(c => isLearned(all[c.id])).length;
  const due = dueCards(filtered()).length, diff = cards.filter(c => isDifficult(all[c.id])).length;
  const dd = daily()[today()] || {n:0}; const pct = Math.min(100, Math.round(100*dd.n/s.goal));
  const ret = st.rev ? Math.round(100*st.revOk/st.rev) + " %" : "–";
  const f = filterChips(rerender);
  body.innerHTML = `<section class="sheet">
    <div class="grid">
      <div class="stat"><b>${due}</b><span>k opakování dnes</span></div>
      <div class="stat"><b>${dd.n}/${s.goal}</b><span>dnešní cíl</span></div>
      <div class="stat"><b>${learned}</b><span>naučeno z ${cards.length}</span></div>
      <div class="stat"><b>${ret}</b><span>úspěšnost opakování</span></div>
      <div class="stat"><b>${diff}</b><span>obtížná slova</span></div>
      <div class="stat"><b>${newLeftToday()}</b><span>nových zbývá dnes</span></div>
    </div>
    <div class="bar" aria-label="Plnění denního cíle"><i style="width:${pct}%"></i></div>
    <p class="note">Denní cíl (odpovědí): <span class="chips vc-small" style="display:inline-flex;margin:0">${[10,20,30,50].map(n => `<button class="chip" data-goal="${n}" aria-pressed="${s.goal===n}">${n}</button>`).join("")}</span></p>
    <p class="note">Nových slov denně: <span class="chips vc-small" style="display:inline-flex;margin:0">${[5,10,20,40].map(n => `<button class="chip" data-new="${n}" aria-pressed="${s.newPerDay===n}">${n}</button>`).join("")}</span></p>
    ${f.html}
    <div class="row">
      <button class="btn primary" data-go="flash">Kartičky</button><button class="btn ghost" data-go="cloze">Doplňování</button>
      <button class="btn ghost" data-go="mc">Výběr z možností</button><button class="btn ghost" data-go="wf">Slovotvorba</button>
    </div>
    <p class="plan">Systém opakování: chybná slova se vrací zítra, správná po 1, 3, 7… dnech (SM-2). Nejdřív se opakují slova „k opakování dnes“, pak přibývají nová.</p>
  </section>
  <h2>Podle typu</h2><div class="cats">${V().types.map(t => { const cs = cards.filter(c => c.type === t.id); const l = cs.filter(c => isLearned(all[c.id])).length; const p = Math.round(100*l/cs.length);
    return `<div class="cat"><div class="top"><span>${esc(t.cs)}</span><span>${l}/${cs.length}</span></div><div class="track"><i style="width:${p}%"></i></div></div>`; }).join("")}</div>`;
  f.wire(body);
  body.querySelectorAll("[data-goal]").forEach(b => b.onclick = () => { const x = settings(); x.goal = +b.dataset.goal; saveSettings(x); rerender(); });
  body.querySelectorAll("[data-new]").forEach(b => b.onclick = () => { const x = settings(); x.newPerDay = +b.dataset.new; saveSettings(x); rerender(); });
  body.querySelectorAll("[data-go]").forEach(b => b.onclick = () => P.go(ID, b.dataset.go));
}

/* ---------- session start panel ---------- */
function startPanel(body, mode, rerender){
  const pool = filtered(), all = srs();
  const due = dueCards(pool).length, nw = Math.min(newCards(pool).length, newLeftToday());
  const diff = V().cards.filter(c => isDifficult(all[c.id])).length, star = V().cards.filter(c => all[c.id] && all[c.id].s).length;
  const intro = {flash:"Otoč kartičku a ohodnoť, jak dobře jsi slovo znal(a). Klávesy: mezerník = otočit, 1–4 = hodnocení.",
    cloze:"Doplň chybějící slovo nebo frázi do věty – přesný pravopis jako u zkoušky (Part 2–4). Nápověda ukáže první písmena, ale sníží hodnocení.",
    mc:"Vyber správnou možnost jako v Use of English Part 1 – distraktory jsou slova, která se často pletou."}[mode];
  const f = filterChips(rerender), s = settings();
  body.innerHTML = `<section class="sheet"><p>${intro}</p>
    ${mode === "flash" ? `<div class="chips vc-small"><button class="chip" data-dir="en" aria-pressed="${s.dir==="en"}">EN → CZ</button><button class="chip" data-dir="cs" aria-pressed="${s.dir==="cs"}">CZ → EN</button></div>` : ""}
    ${f.html}
    <div class="row">
      <button class="btn primary" data-k="srs" ${due+nw ? "" : "disabled"}>Opakovat (${due} k opakování + ${nw} nových)</button>
      <button class="btn ghost" data-k="random">Náhodně z filtru</button>
      <button class="btn ghost" data-k="difficult" ${diff ? "" : "disabled"}>Obtížná (${diff})</button>
      <button class="btn ghost" data-k="star" ${star ? "" : "disabled"}>S hvězdičkou (${star})</button>
    </div>${due+nw ? "" : `<p class="hint">Na dnešek je hotovo 🎉 – můžeš procvičovat náhodně nebo zvýšit počet nových slov v Přehledu.</p>`}</section>`;
  f.wire(body);
  body.querySelectorAll("[data-dir]").forEach(b => b.onclick = () => { const x = settings(); x.dir = b.dataset.dir; saveSettings(x); rerender(); });
  body.querySelectorAll("[data-k]").forEach(b => b.onclick = () => {
    const list = buildSession(b.dataset.k, 12);
    if(!list.length){ P.toast("Žádná slova pro tento výběr."); return; }
    runSession(body, mode, list, b.dataset.k, rerender);
  });
}

/* ---------- session runner ---------- */
function runSession(body, mode, list, kind, rerender){
  const queue = list.slice(); const first = new Set(); const res = []; let keyHandler = null;
  const total = list.length;
  const detach = () => { if(keyHandler) document.removeEventListener("keydown", keyHandler); keyHandler = null; };
  const setKeys = fn => { detach(); keyHandler = e => { if(!body.isConnected){ detach(); return; } fn(e); }; document.addEventListener("keydown", keyHandler); };
  const record = (c, q) => {
    if(first.has(c.id)) return; first.add(c.id);
    grade(c.id, q, !srs()[c.id]);
    res.push({c, ok: q >= 3});
    if(q < 3) queue.push(c);
  };
  const head = () => `<div class="meta"><span>${typeName(queue[0].type)} · ${topicName(queue[0].topic)}</span><span>${Math.min(first.size+1,total)}/${total}${first.has(queue[0].id) ? ' <span class="again">znovu</span>' : ""}</span></div><div class="bar"><i style="width:${Math.round(100*first.size/total)}%"></i></div>`;
  const why = c => `<p class="why"><b>${esc(c.en)}</b> – ${esc(c.cs)}</p><p class="why vc-ex">${exHtml(c.ex)}</p>${c.tip ? `<p class="alts">${esc(c.tip)}</p>` : ""}`;
  const next = () => { queue.shift(); queue.length ? show() : finish(); };

  function show(){
    const c = queue[0]; const ans = answerOf(c);
    if(mode === "flash"){
      const dir = settings().dir;
      const front = dir === "en" ? `<div class="vc-front">${esc(c.en)}</div>` : `<div class="vc-front">${esc(c.cs)}</div>`;
      body.innerHTML = `<section class="sheet">${head()}<div class="vc-card" aria-live="polite">${front}<div class="vc-back" hidden>
        <div class="vc-front" style="font-size:22px">${esc(dir === "en" ? c.cs : c.en)}</div><p class="vc-ex">${exHtml(c.ex)}</p>${c.tip ? `<p class="vc-tip">${esc(c.tip)}</p>` : ""}</div></div>
        <div class="row" style="justify-content:center;margin-top:14px"><button class="btn primary vc-flip">Otočit</button>${speakBtn(c.en)}</div>
        <div class="vc-grade" hidden><button class="btn ghost" data-q="1">1 Znovu</button><button class="btn ghost" data-q="3">2 Těžké</button><button class="btn ghost" data-q="4">3 Dobře</button><button class="btn primary" data-q="5">4 Snadné</button></div></section>`;
      wireSpeak(body);
      const flip = () => { body.querySelector(".vc-back").hidden = false; body.querySelector(".vc-grade").hidden = false; body.querySelector(".vc-flip").hidden = true; body.querySelector("[data-q='4']").focus(); };
      const rate = q => { record(c, q); next(); };
      body.querySelector(".vc-flip").onclick = flip;
      body.querySelectorAll("[data-q]").forEach(b => b.onclick = () => rate(+b.dataset.q));
      setKeys(e => { if(e.target.tagName === "INPUT") return;
        if(e.key === " " && !body.querySelector(".vc-flip").hidden){ e.preventDefault(); flip(); }
        else if(!body.querySelector(".vc-grade").hidden && "1234".includes(e.key) && e.key.length === 1){ rate([1,3,4,5][+e.key-1]); } });
      body.querySelector(".vc-flip").focus();
    } else if(mode === "cloze"){
      const [pre, post] = c.gap.split("____");
      let hints = 0;
      body.innerHTML = `<section class="sheet">${head()}<p class="note">${esc(c.cs)}${c.stem ? ` <span class="keybox inline">${esc(c.stem)}</span>` : ""}</p>
        <p class="text">${esc(pre)}<input class="gap-in" aria-label="Doplň chybějící výraz" autocomplete="off" autocapitalize="off" spellcheck="false" style="width:${Math.max(6, ans.length+2)}ch">${esc(post)}</p>
        <div class="row act"><button class="btn primary vc-check">Zkontrolovat</button><button class="btn ghost vc-hint">Nápověda</button><button class="btn ghost vc-skip">Nevím</button></div>
        <p class="hint" aria-live="polite"></p><div class="vc-fb" aria-live="polite"></div></section>`;
      const inp = body.querySelector(".gap-in"), hintEl = body.querySelector(".hint");
      inp.focus();
      body.querySelector(".vc-hint").onclick = () => { hints++; const n = Math.min(ans.length - 1, hints * Math.max(1, Math.ceil(ans.length/4)));
        hintEl.textContent = "Nápověda: " + ans.slice(0, n) + ans.slice(n).replace(/[^\s-]/g, "_") + ` (${ans.length} znaků)`; inp.focus(); };
      const check = given => {
        const ok = given != null && norm(given) === norm(ans);
        const q = ok ? (hints ? 3 : 4) : 1;
        record(c, q);
        inp.replaceWith(Object.assign(document.createElement("span"), {className: "filled " + (ok ? "ok" : "bad"), innerHTML: ok ? esc(ans) : `<s>${esc(given || "—")}</s><span class="pen">${esc(ans)}</span>`}));
        body.querySelector(".act").innerHTML = `<button class="btn primary vc-next">Další</button>${speakBtn(c.en)}`;
        body.querySelector(".vc-fb").innerHTML = `<div class="fb${ok ? "" : " bad"}"><p class="verdict">${ok ? (hints ? "Správně (s nápovědou)" : "Správně") : "Chyba – správně: " + esc(ans)}</p>${why(c)}</div>`;
        wireSpeak(body); hintEl.textContent = "";
        const nb = body.querySelector(".vc-next"); nb.onclick = next; nb.focus();
      };
      body.querySelector(".vc-check").onclick = () => { if(!inp.value.trim()){ hintEl.textContent = "Napiš odpověď (nebo zvol Nevím)."; inp.focus(); return; } check(inp.value); };
      body.querySelector(".vc-skip").onclick = () => check(null);
      inp.addEventListener("keydown", e => { if(e.key === "Enter"){ e.preventDefault(); body.querySelector(".vc-check").click(); } });
      setKeys(() => {});
    } else {
      const opts = options(c);
      body.innerHTML = `<section class="sheet">${head()}<p class="text" style="line-height:1.7">${esc(c.gap).replace("____", '<span class="gap-blank"></span>')}</p>
        <div class="opts" role="group" aria-label="Možnosti">${opts.map((o,i) => `<button class="opt" data-o="${esc(o)}"><i>${"ABCD"[i]}</i>${esc(o)}</button>`).join("")}</div>
        <div class="vc-fb" aria-live="polite"></div></section>`;
      const pick = btn => {
        const ok = btn.dataset.o === ans;
        body.querySelectorAll(".opt").forEach(b => { b.disabled = true; if(b.dataset.o === ans) b.classList.add("right"); });
        if(!ok) btn.classList.add("wrong");
        record(c, ok ? 4 : 1);
        body.querySelector(".vc-fb").innerHTML = `<div class="fb${ok ? "" : " bad"}"><p class="verdict">${ok ? "Správně" : "Chyba – správně: " + esc(ans)}</p>${why(c)}</div><div class="row"><button class="btn primary vc-next">Další</button>${speakBtn(c.en)}</div>`;
        wireSpeak(body); const nb = body.querySelector(".vc-next"); nb.onclick = next; nb.focus();
      };
      body.querySelectorAll(".opt").forEach(b => b.onclick = () => pick(b));
      setKeys(e => { const i = "abcd1234".indexOf(e.key.toLowerCase()); const bs = body.querySelectorAll(".opt"); if(i >= 0 && bs[i%4] && !bs[i%4].disabled) pick(bs[i%4]); });
    }
  }
  function finish(){
    detach();
    const ok = res.filter(r => r.ok).length;
    P.logActivity(ID, mode, ok, res.length, {kind});
    const bad = res.filter(r => !r.ok);
    body.innerHTML = `<section class="sheet"><p class="score">${ok}/${res.length}</p><p class="note">Hotovo. Chybná slova se zopakují zítra.</p>
      ${bad.length ? `<ul class="errs">${bad.map(r => `<li>${exHtml(r.c.ex)}<br><span class="note">${esc(r.c.en)} – ${esc(r.c.cs)}</span></li>`).join("")}</ul>` : ""}
      <div class="row"><button class="btn primary vc-again">Další kolo</button><button class="btn ghost vc-home">Přehled</button></div></section>`;
    body.querySelector(".vc-again").onclick = rerender;
    body.querySelector(".vc-home").onclick = () => P.go(ID, "overview");
  }
  show();
}

/* ---------- word formation drill ---------- */
function wfView(body, rerender){
  const fams = V().wordFamilies;
  const table = f => `<table class="vc-fam"><tr><th>podst. jm.</th><td>${esc(f.noun.join(", ") || "–")}</td></tr><tr><th>příd. jm.</th><td>${esc(f.adj.join(", ") || "–")}</td></tr>
    <tr><th>příslovce</th><td>${esc(f.adv.join(", ") || "–")}</td></tr><tr><th>sloveso</th><td>${esc(f.verb.join(", ") || "–")}</td></tr><tr><th>zápor</th><td>${esc(f.neg.join(", ") || "–")}</td></tr></table>`;
  const ws = P.store.get("vocab:wf", {});
  const weak = fams.flatMap(f => f.items.map((it, i) => ({f, it, k: f.stem + "#" + i}))).filter(x => ws[x.k] && ws[x.k].ko > (ws[x.k].ok || 0));
  body.innerHTML = `<section class="sheet"><p>Use of English Part 3: utvoř ze slova VELKÝMI písmeny tvar, který se hodí do věty (předpony, přípony, množné číslo, zápor). ${fams.length} slovních rodin.</p>
    <div class="row"><button class="btn primary vc-start">Začít (10 vět)</button><button class="btn ghost vc-weak" ${weak.length ? "" : "disabled"}>Chybné (${weak.length})</button></div></section>
    <h2>Tabulky slovních rodin</h2><div class="cheat">${fams.map(f => `<details><summary>${esc(f.stem)} <span class="note">(${esc(f.cs)})</span></summary><div class="body">${table(f)}</div></details>`).join("")}</div>`;
  const start = list => {
    let i = 0, ok = 0; const errs = [];
    const show = () => {
      const {f, it, k} = list[i]; const [pre, post] = it.s.split("____");
      body.innerHTML = `<section class="sheet"><div class="meta"><span>Slovotvorba</span><span>${i+1}/${list.length}</span></div><div class="bar"><i style="width:${Math.round(100*i/list.length)}%"></i></div>
        <p class="text">${esc(pre)}<input class="gap-in" aria-label="Doplň tvar slova" autocomplete="off" autocapitalize="off" spellcheck="false" style="width:${Math.max(8, it.a.length+2)}ch">${esc(post)} <span class="keybox inline">${esc(f.stem)}</span></p>
        <div class="row act"><button class="btn primary vc-check">Zkontrolovat</button></div><div class="vc-fb" aria-live="polite"></div></section>`;
      const inp = body.querySelector(".gap-in"); inp.focus();
      const check = () => {
        const good = norm(inp.value) === norm(it.a);
        const s = P.store.get("vocab:wf", {}); s[k] = s[k] || {ok:0, ko:0}; s[k][good ? "ok" : "ko"]++; P.store.set("vocab:wf", s);
        if(good) ok++; else errs.push({it, f});
        inp.replaceWith(Object.assign(document.createElement("span"), {className: "filled " + (good ? "ok" : "bad"), innerHTML: good ? esc(it.a) : `<s>${esc(inp.value || "—")}</s><span class="pen">${esc(it.a)}</span>`}));
        body.querySelector(".vc-fb").innerHTML = `<div class="fb${good ? "" : " bad"}"><p class="verdict">${good ? "Správně" : "Chyba – správně: " + esc(it.a)}</p><p class="why">Slovní rodina ${esc(f.stem)} (${esc(f.cs)}):</p>${table(f)}</div>`;
        body.querySelector(".act").innerHTML = `<button class="btn primary vc-next">${i+1 < list.length ? "Další" : "Výsledek"}</button>`;
        const nb = body.querySelector(".vc-next"); nb.focus(); nb.onclick = () => { i++; i < list.length ? show() : done(); };
      };
      body.querySelector(".vc-check").onclick = check;
      inp.addEventListener("keydown", e => { if(e.key === "Enter"){ e.preventDefault(); check(); } });
    };
    const done = () => {
      P.logActivity(ID, "wf", ok, list.length);
      body.innerHTML = `<section class="sheet"><p class="score">${ok}/${list.length}</p>${errs.length ? `<ul class="errs">${errs.map(e => `<li>${esc(e.it.s).replace("____", "<b>" + esc(e.it.a) + "</b>")} <span class="note">(${esc(e.f.stem)})</span></li>`).join("")}</ul>` : ""}
        <div class="row"><button class="btn primary vc-again">Další kolo</button></div></section>`;
      body.querySelector(".vc-again").onclick = rerender;
    };
    show();
  };
  body.querySelector(".vc-start").onclick = () => start(shuffle(fams.flatMap(f => f.items.map((it, i) => ({f, it, k: f.stem + "#" + i})))).slice(0, 10));
  body.querySelector(".vc-weak").onclick = () => start(shuffle(weak).slice(0, 10));
}

/* ---------- list / browse ---------- */
function listView(body){
  const f = filterChips(() => render()); let q = "", show = "all", limit = 60;
  body.innerHTML = `<section class="sheet"><input class="field vc-q" type="search" placeholder="Hledat (anglicky nebo česky)…" aria-label="Hledat">
    <div class="chips vc-small" style="margin-top:12px">${[["all","Vše"],["new","Nová"],["learning","Učím se"],["learned","Naučená"],["difficult","Obtížná"],["star","Hvězdička"]].map(([k,l]) => `<button class="chip" data-show="${k}" aria-pressed="${k==="all"}">${l}</button>`).join("")}</div>
    <div class="vc-fwrap"></div><p class="note vc-count" aria-live="polite"></p><ul class="vc-list"></ul><div class="row"><button class="btn ghost vc-more" hidden>Zobrazit další</button></div></section>`;
  const fwrap = body.querySelector(".vc-fwrap");
  function render(){
    const fc = filterChips(() => render()); fwrap.innerHTML = fc.html; fc.wire(fwrap);
    const all = srs(), nq = norm(q);
    const items = filtered().filter(c => {
      const s = all[c.id];
      if(nq && !(norm(c.en).includes(nq) || norm(c.cs).includes(nq) || norm(c.ex.replace(/\*\*/g,"")).includes(nq))) return false;
      return show === "all" || (show === "new" && !s) || (show === "learning" && s && !isLearned(s)) || (show === "learned" && isLearned(s)) || (show === "difficult" && isDifficult(s)) || (show === "star" && s && s.s);
    });
    body.querySelector(".vc-count").textContent = `${items.length} položek`;
    const status = s => !s ? "nové" : s.k ? "umím" : isLearned(s) ? "naučeno" : isDifficult(s) ? "obtížné" : "učím se";
    body.querySelector(".vc-list").innerHTML = items.slice(0, limit).map(c => { const s = all[c.id];
      return `<li><div class="w"><b>${esc(c.en)}</b> <span class="badge">${status(s)}</span><span>${esc(c.cs)} · ${esc(typeName(c.type))}</span></div>
        ${speakBtn(c.en)}<button class="vc-ic" data-star="${c.id}" aria-pressed="${!!(s && s.s)}" aria-label="Hvězdička">${s && s.s ? "★" : "☆"}</button>
        <button class="vc-ic" data-known="${c.id}" aria-pressed="${!!(s && s.k)}" aria-label="Označit jako známé" title="Umím">✓</button></li>`; }).join("");
    const more = body.querySelector(".vc-more"); more.hidden = items.length <= limit;
    wireSpeak(body);
    body.querySelectorAll("[data-star]").forEach(b => b.onclick = () => { const v = toggle(b.dataset.star, "s"); b.setAttribute("aria-pressed", v); b.textContent = v ? "★" : "☆"; });
    body.querySelectorAll("[data-known]").forEach(b => b.onclick = () => { const v = toggle(b.dataset.known, "k"); b.setAttribute("aria-pressed", v); P.toast(v ? "Označeno jako známé" : "Zrušeno"); });
  }
  void f;
  body.querySelector(".vc-q").addEventListener("input", e => { q = e.target.value; limit = 60; render(); });
  body.querySelectorAll("[data-show]").forEach(b => b.onclick = () => { show = b.dataset.show; body.querySelectorAll("[data-show]").forEach(x => x.setAttribute("aria-pressed", x === b)); render(); });
  body.querySelector(".vc-more").onclick = () => { limit += 60; render(); };
  render();
}

/* ---------- register ---------- */
P.register({
  id: ID, title: "Slovní zásoba", short: "Slovíčka",
  blurb: "Frázová slovesa, kolokace, idiomy a slovotvorba s chytrým opakováním",
  render(stage, ctx){
    const sub = SUBS.some(s => s[0] === (ctx && ctx.sub)) ? ctx.sub : "overview";
    const body = frame(stage, sub);
    const rerender = () => { body.innerHTML = ""; draw(); };
    const draw = () => {
      if(sub === "overview") overview(body, rerender);
      else if(sub === "wf") wfView(body, rerender);
      else if(sub === "list") listView(body);
      else startPanel(body, sub, rerender);
    };
    draw();
  },
  progress(){ const all = srs(); const cards = V().cards; return {done: cards.filter(c => isLearned(all[c.id])).length, total: cards.length}; }
});
})();
