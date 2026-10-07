/* Listening (Parts 1–4) – C1 Advanced. Audio = Web Speech API via Portal.tts; fallback = timed reader mode. */
(function(){
"use strict";
const P = window.Portal; if(!P) return;
const {esc, norm, shuffle} = P.util;
const D = () => (window.DATA && window.DATA.listening) || {};
const ID = "listening";
const PARTS = {
  p1:{n:1, label:"Part 1", name:"Krátké úryvky (3× dialog/monolog, A–C)", prep:15, first:1},
  p2:{n:2, label:"Part 2", name:"Doplňování vět (monolog, 8 mezer)", prep:20, first:7},
  p3:{n:3, label:"Part 3", name:"Rozhovor (6 otázek, A–D)", prep:45, first:15},
  p4:{n:4, label:"Part 4", name:"Pět monologů, dva úkoly (A–H)", prep:45, first:21}
};
const NUM = ["zero","one","two","three","four","five","six","seven","eight","nine","ten"];
const LET = "ABCDEFGH";

/* ---------- settings ---------- */
const S = () => Object.assign({mode:"exam", speed:1, reader:false}, P.store.get(ID+":settings", {}));
const setS = o => P.store.set(ID+":settings", Object.assign(S(), o));
const ttsOK = () => !!P.tts.supported;
const voiceCount = () => { try{ return speechSynthesis.getVoices().length; }catch(e){ return 0; } };
const useReader = () => !ttsOK() || S().reader;

/* ---------- voices: prefer gender-matched en-GB voices ---------- */
function voicePool(){
  let v = []; try{ v = speechSynthesis.getVoices(); }catch(e){}
  const gb = v.filter(x => x.lang && x.lang.replace("_","-").toLowerCase().startsWith("en-gb"));
  return gb.length ? gb : v.filter(x => x.lang && x.lang.toLowerCase().startsWith("en"));
}
const FEM = /female|woman|serena|kate|susan|hazel|libby|sonia|maisie|fiona|moira|tessa|karen|martha|stephanie|amy|emma/i;
const MAL = /\bmale\b|daniel|george|ryan|thomas|arthur|oliver|rishi|brian|james|male/i;
function resolveVoice(key){
  const pr = (D().voices || {})[key] || {voiceIdx:0, pitch:1, rate:1};
  const pool = voicePool(); let idx = pr.voiceIdx || 0;
  if(pool.length){
    const fem = [], mal = [];
    pool.forEach((v,i) => { if(FEM.test(v.name)) fem.push(i); else if(MAL.test(v.name)) mal.push(i); });
    const list = pr.g === "f" ? fem : mal;
    if(list.length) idx = list[(pr.voiceIdx || 0) % list.length];
  }
  return {voiceIdx:idx, pitch:pr.pitch || 1, rate:pr.rate || 1};
}

/* ---------- small helpers ---------- */
const sleep = ms => new Promise(r => setTimeout(r, ms));
const words = t => String(t).trim().split(/\s+/).length;
/* safety estimate: ~2.5 words/s at rate 1, generous margin – speech engines that never fire 'end' cannot hang us */
const estMs = (t, rate) => Math.round(words(t) / (2.5 * (rate || 1)) * 1000 * 1.6 + 2500);
let audioCtx = null;
function beep(){
  try{
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.frequency.value = 880; g.gain.value = 0.08; o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + 0.35);
  }catch(e){}
  return sleep(600);
}
const sentences = t => String(t).match(/[^.!?]+[.!?]+['"]?|[^.!?]+$/g).map(s => s.trim()).filter(Boolean);

/* ---------- style ---------- */
function injectStyle(){
  if(document.getElementById("lsn-style")) return;
  const st = document.createElement("style"); st.id = "lsn-style";
  st.textContent = `
.lsn-ctrl{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 0 12px}
.lsn-ctrl .btn{min-height:40px;padding:0 14px;font-size:15px}
.lsn-status{font-size:14px;color:var(--muted);margin:0 0 12px;min-height:1.3em}
.lsn-status b{color:var(--ink)}
.lsn-reader{border:1.5px dashed var(--rule);border-radius:6px;padding:12px 14px;margin:0 0 14px;font-family:var(--serif);font-size:19px;min-height:3.2em}
.lsn-reader .sp{display:block;font-family:var(--sans);font-size:13px;color:var(--muted)}
.lsn-q{margin:0 0 18px}
.lsn-q .qt{font-family:var(--serif);font-size:18px;margin:0 0 8px}
.lsn-q .qt b{font-family:var(--sans);font-size:14px;color:var(--muted);margin-right:6px}
.lsn-q .opt{font-size:17px;min-height:40px;padding:8px 12px}
.lsn-q .opt[aria-pressed="true"]{border-color:var(--ink);background:var(--soft)}
.lsn-gapin{font:inherit;font-family:var(--serif);font-size:17px;border:0;border-bottom:2px solid var(--ink);background:transparent;color:var(--ink);min-width:9ch;max-width:100%;padding:0 4px}
.lsn-gapin.ok{border-bottom-color:var(--green);color:var(--green)} .lsn-gapin.bad{border-bottom-color:var(--red);color:var(--red)}
.lsn-p4{display:grid;grid-template-columns:auto 1fr 1fr;gap:6px 10px;align-items:center;margin:0 0 16px}
.lsn-p4 select{font:inherit;padding:6px;border:1.5px solid var(--rule);border-radius:6px;background:var(--sheet);color:var(--ink);max-width:100%}
.lsn-p4 select.ok{border-color:var(--green)} .lsn-p4 select.bad{border-color:var(--red)}
.lsn-opts8{font-size:15px;margin:0 0 10px;padding-left:0;list-style:none} .lsn-opts8 li{margin:2px 0}
.lsn-tr{font-family:var(--serif);font-size:17px;line-height:1.6}
.lsn-tr p{margin:0 0 8px} .lsn-tr .who{font-family:var(--sans);font-size:13px;font-weight:600;color:var(--muted);margin-right:6px}
.lsn-tr mark{background:var(--hl);color:var(--ink);padding:0 2px;border-radius:2px}
.lsn-tr mark sup{font-family:var(--sans);font-size:11px;font-weight:700;margin-left:2px}
.lsn-tr p.now{outline:2px solid var(--hl);outline-offset:3px;border-radius:3px}
.lsn-tag{display:inline-block;font-size:12px;padding:0 8px;border-radius:9px;background:var(--soft);color:var(--muted);margin-left:6px}
.lsn-line{border-top:1px solid var(--rule);padding:10px 0}
.lsn-line .txt{font-family:var(--serif);font-size:17px;margin:6px 0}
.lsn-strat p,.lsn-strat li{font-size:15.5px}
.lsn-warn{border-left:3px solid var(--red);padding:4px 12px;margin:0 0 14px;font-size:14.5px}
@media (max-width:520px){.lsn-p4{grid-template-columns:auto 1fr}.lsn-p4 .h2{display:none}}
`;
  document.head.appendChild(st);
}

/* ---------- strategy (CZ) ---------- */
const STRAT = {
  p1:["Tři nesouvisející úryvky, ke každému 2 otázky (A–C). Ptají se na postoj, názor, účel, shodu mluvčích a pocity – málokdy na fakta.",
      "U otázky „What do they agree about?“ čekej na signály souhlasu: „Exactly“, „on that we're in complete agreement“, „That's true“.",
      "Pozor na slova z možností, která v nahrávce zazní doslova – často jde o past (zmíněno, ale odmítnuto)."],
  p2:["Monolog, 8 vět s mezerou. Píšeš slova PŘESNĚ tak, jak zazní (1–3 slova), pravopis se počítá.",
      "Během 45 s přípravy odhadni slovní druh (podstatné jméno? číslo? množné číslo?).",
      "Mluvčí často nejdřív řekne špatnou odpověď („People assume…“, „I'd expected…“) a pak tu správnou. Nepiš první slovo, které padne."],
  p3:["Rozhovor (2–3 mluvčí), 6 otázek A–D v pořadí nahrávky. Testuje názory a postoje, ne fakta.",
      "Odpověď je skoro vždy parafráze – v možnosti nenajdeš stejná slova jako v nahrávce. Shoda slov je spíš varování.",
      "Sleduj obraty „but“, „though“, „what really…“, „honestly“ – za nimi bývá skutečný názor."],
  p4:["Pět krátkých monologů, dva úkoly zároveň (A–H). Každý mluvčí odpovídá na oba úkoly; tři možnosti v každém úkolu jsou navíc.",
      "Při 1. poslechu se soustřeď na úkol 1, při 2. na úkol 2 (nebo zapisuj, co tě napadne, k oběma).",
      "Mluvčí často zmíní víc možností – vyber tu, kterou potvrdí („what actually…“, „it was… that“), ne tu, kterou odmítne."]
};

/* ---------- progress ---------- */
const prog = () => P.store.get(ID+":done", {});
function saveResult(part, id, c, n, missed){
  const d = prog(); d[id] = Math.max(d[id] || 0, Math.round(100*c/n)); P.store.set(ID+":done", d);
  const w = P.store.get(ID+":traps", {}); missed.forEach(t => w[t] = (w[t] || 0) + 1); P.store.set(ID+":traps", w);
  P.logActivity(ID, part, c, n, {task:id});
}
const allTasks = () => ["p1","p2","p3","p4"].reduce((a,k) => a.concat((D()[k]||[]).map(t => ({k, t}))), []);

/* ---------- build a playable script for a task ----------
   items: {say, sp, t, v, rec, li} | {wait:sec, label, prep?} | {beep:true} | {mark:"play2"} */
function examinerSay(t){ return {say:true, sp:"Examiner", t, v:resolveVoice("EX"), rec:-1, li:-1}; }
function recItems(rec, recIdx){
  return rec.lines.map((l, li) => ({say:true, sp:l.sp, t:l.t, v:resolveVoice(rec.speakers[l.sp]), rec:recIdx, li}));
}
function recordings(k, task){ return k === "p1" ? task.extracts : [task]; }
function fullScript(k, task, twice){
  const pt = PARTS[k], recs = recordings(k, task), out = [];
  const rub = {
    p1:"Part One. You will hear three different extracts. For questions one to six, choose the answer, A, B or C, which fits best according to what you hear. There are two questions for each extract.",
    p2:"Part Two. " + task.context + " For questions seven to fourteen, complete the sentences with a word or short phrase.",
    p3:"Part Three. " + task.context + " For questions fifteen to twenty, choose the answer, A, B, C or D, which fits best according to what you hear.",
    p4:"Part Four. " + task.context + " Look at Task One and Task Two. While you listen, you must complete both tasks."
  }[k];
  out.push(examinerSay(rub));
  recs.forEach((rec, ri) => {
    if(k === "p1"){ out.push(examinerSay("Extract " + NUM[ri+1] + ". " + rec.context)); }
    out.push(examinerSay("You now have " + (pt.prep >= 45 ? "forty-five" : pt.prep === 20 ? "twenty" : "fifteen") + " seconds to look at the questions."));
    out.push({wait:pt.prep, label:"Čas na přečtení otázek", prep:true});
    out.push({beep:true});
    out.push(...recItems(rec, ri));
    if(twice){
      out.push({wait:5, label:"Pauza před druhým poslechem"});
      out.push({beep:true}, examinerSay("Now you'll hear the recording again."), {mark:"play2", rec:ri});
      out.push(...recItems(rec, ri));
    }
  });
  out.push(examinerSay("That is the end of Part " + NUM[pt.n] + "."));
  return out;
}

/* ---------- Player ---------- */
function Player(ui){
  this.ui = ui; this.items = []; this.i = 0; this.state = "idle"; this.gen = 0; this.skip = false;
}
Player.prototype.load = function(items){ this.stop(); this.items = items; this.i = 0; };
Player.prototype.alive = function(){ return this.ui.root.isConnected; };
Player.prototype.play = async function(from){
  const g = ++this.gen; if(from != null) this.i = from;
  this.state = "playing"; this.ui.onState(this);
  while(this.i < this.items.length){
    if(g !== this.gen || !this.alive()){ if(!this.alive()) P.tts.stop(); return; }
    if(this.state === "paused"){ await sleep(200); continue; }
    const it = this.items[this.i];
    this.ui.onItem(this, it);
    if(it.say){
      const speed = S().speed, rate = (it.v.rate || 1) * speed * 0.95;
      if(useReader()){
        await this.wait(estMs(it.t, rate*1.2) - 2000, g);
      } else {
        await Promise.race([P.tts.speak(it.t, {lang:"en-GB", rate, pitch:it.v.pitch, voiceIdx:it.v.voiceIdx}), sleep(estMs(it.t, rate))]);
      }
    } else if(it.wait){
      this.skip = false;
      for(let s = it.wait; s > 0; s--){
        if(g !== this.gen || this.skip || !this.alive()) break;
        while(this.state === "paused" && g === this.gen) await sleep(200);
        this.ui.onCount(this, it, s); await sleep(1000);
      }
      this.ui.onCount(this, it, 0);
    } else if(it.beep){ await beep(); }
    if(g !== this.gen) return;
    if(this.state === "paused") continue;          // interrupted mid-line → replay this line on resume
    this.i++;
  }
  this.state = "ended"; this.ui.onState(this); this.ui.onEnd && this.ui.onEnd(this);
};
Player.prototype.wait = async function(ms, g){ const end = Date.now() + Math.max(800, ms); while(Date.now() < end){ if(g !== this.gen || this.state === "paused") return; await sleep(100); } };
Player.prototype.pause = function(){ if(this.state !== "playing") return; this.state = "paused"; P.tts.stop(); this.ui.onState(this); };
Player.prototype.resume = function(){ if(this.state !== "paused") return; this.state = "playing"; this.ui.onState(this); };
Player.prototype.stop = function(){ this.gen++; P.tts.stop(); this.state = "idle"; if(this.ui && this.ui.onState) this.ui.onState(this); };

/* ---------- question rendering ---------- */
function qsOf(k, task){
  if(k === "p1") return task.extracts.reduce((a, ex, ri) => a.concat(ex.qs.map(q => Object.assign({rec:ri}, q))), []);
  return task.qs.map(q => Object.assign({rec:0}, q));
}
function renderQuestions(k, task, box){
  const pt = PARTS[k]; const qs = qsOf(k, task); let h = "";
  if(k === "p4"){
    [task.task1, task.task2].forEach((tk, ti) => {
      h += `<p class="qt"><b>Task ${ti+1}</b>${esc(tk.q)}</p><ul class="lsn-opts8">${tk.opts.map((o,i) => `<li><b>${LET[i]}</b> ${esc(o)}</li>`).join("")}</ul>`;
    });
    h += `<div class="lsn-p4"><span></span><b class="h1">Task 1</b><b class="h2">Task 2</b>`;
    for(let n = 1; n <= 5; n++){
      h += `<span>Speaker ${n}</span>`;
      [1,2].forEach(tn => {
        const qi = qs.findIndex(q => q.task === tn && q.n === n);
        const num = tn === 1 ? 20+n : 25+n;
        h += `<label><span class="note">${num}</span> <select data-qi="${qi}" aria-label="Otázka ${num}, Speaker ${n}, Task ${tn}"><option value="">–</option>${LET.split("").map((L,i) => `<option value="${i}">${L}</option>`).join("")}</select></label>`;
      });
    }
    h += `</div>`;
  } else {
    qs.forEach((q, qi) => {
      const num = pt.first + qi;
      if(k === "p1" && qi % 2 === 0) h += `<p class="note"><b>Extract ${qi/2+1}</b> – ${esc(task.extracts[qi/2].context)}</p>`;
      if(k === "p2"){
        const [a, b] = q.s.split("___");
        h += `<div class="lsn-q"><p class="qt"><b>${num}</b>${esc(a)}<input class="lsn-gapin" data-qi="${qi}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Mezera ${num}">${esc(b||"")}</p><div class="fbx" aria-live="polite"></div></div>`;
      } else {
        h += `<div class="lsn-q"><p class="qt"><b>${num}</b>${esc(q.q)}</p><div class="opts">${q.opts.map((o,i) => `<button class="opt" data-qi="${qi}" data-i="${i}" aria-pressed="false"><i>${LET[i]}</i>${esc(o)}</button>`).join("")}</div><div class="fbx" aria-live="polite"></div></div>`;
      }
    });
  }
  box.innerHTML = h;
  const ans = {};
  box.querySelectorAll(".opt").forEach(b => b.onclick = () => {
    const qi = +b.dataset.qi; ans[qi] = +b.dataset.i;
    box.querySelectorAll(`.opt[data-qi="${qi}"]`).forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
  return {qs, get(qi){
    if(k === "p2"){ const el = box.querySelector(`input[data-qi="${qi}"]`); return el ? el.value : ""; }
    if(k === "p4"){ const el = box.querySelector(`select[data-qi="${qi}"]`); return el && el.value !== "" ? +el.value : null; }
    return ans[qi] == null ? null : ans[qi];
  }};
}
const okP2 = (val, q) => q.ans.some(a => norm(a).replace(/-/g," ") === norm(val).replace(/-/g," ").replace(/^(a|an|the) /,"") || norm(a).replace(/-/g," ") === norm(val).replace(/-/g," "));
function grade(k, task, form, box){
  let c = 0; const missed = [];
  form.qs.forEach((q, qi) => {
    const v = form.get(qi); let ok;
    if(k === "p2"){
      ok = okP2(v, q);
      const el = box.querySelector(`input[data-qi="${qi}"]`); el.classList.add(ok ? "ok" : "bad"); el.disabled = true;
    } else if(k === "p4"){
      ok = v === q.correct;
      const el = box.querySelector(`select[data-qi="${qi}"]`); el.classList.add(ok ? "ok" : "bad"); el.disabled = true;
    } else {
      ok = v === q.correct;
      box.querySelectorAll(`.opt[data-qi="${qi}"]`).forEach(b => { b.disabled = true; const i = +b.dataset.i; if(i === q.correct) b.classList.add("right"); else if(i === v) b.classList.add("wrong"); });
    }
    if(ok) c++; else missed.push(q.tt);
    q._ok = ok;
  });
  return {c, n:form.qs.length, missed};
}
function feedbackHTML(k, task, form){
  const pt = PARTS[k], tt = D().trapTypes || {};
  return form.qs.map((q, qi) => {
    const num = k === "p4" ? (q.task === 1 ? 20+q.n : 25+q.n) : pt.first + qi;
    const right = k === "p2" ? q.ans[0] : k === "p4" ? LET[q.correct] + " – " + [task.task1, task.task2][q.task-1].opts[q.correct] : LET[q.correct] + " – " + q.opts[q.correct];
    return `<div class="fb ${q._ok ? "" : "bad"}"><p class="verdict">${num}. ${q._ok ? "Správně" : "Chyba"} · ${esc(right)}${k === "p4" ? ` <span class="lsn-tag">Speaker ${q.n}, Task ${q.task}</span>` : ""}</p>
      <p class="why">${esc(q.why)}</p><p class="alts"><b>Past:</b> ${esc(q.trap)} <span class="lsn-tag">${esc(tt[q.tt] || q.tt)}</span></p>
      <p class="alts">Důkaz: „<i>${esc(q.evidence)}</i>“</p></div>`;
  }).join("");
}
function transcriptHTML(k, task, form){
  const recs = recordings(k, task); const pt = PARTS[k];
  return recs.map((rec, ri) => (recs.length > 1 ? `<p class="note"><b>Extract ${ri+1}</b></p>` : "") + rec.lines.map((l, li) => {
    const marks = [];
    (form ? form.qs : []).forEach((q, qi) => {
      if(q.rec !== ri) return;
      if(k === "p4" && l.sp !== "Speaker " + q.n) return;
      const at = l.t.indexOf(q.evidence); if(at < 0) return;
      const num = k === "p4" ? (q.task === 1 ? 20+q.n : 25+q.n) : pt.first + qi;
      marks.push({at, end:at+q.evidence.length, num});
    });
    marks.sort((a,b) => a.at - b.at);
    let h = "", pos = 0;
    marks.forEach(m => { if(m.at < pos) return; h += esc(l.t.slice(pos, m.at)) + `<mark>${esc(l.t.slice(m.at, m.end))}<sup>${m.num}</sup></mark>`; pos = m.end; });
    h += esc(l.t.slice(pos));
    return `<p data-r="${ri}" data-l="${li}"><span class="who">${esc(l.sp)}</span>${h} <button class="link-btn lsn-rl" data-r="${ri}" data-l="${li}" aria-label="Přehrát řádek">▶</button></p>`;
  }).join("")).join("");
}

/* ---------- task view ---------- */
function playerUI(root, opts){
  const st = root.querySelector(".lsn-status"), rd = root.querySelector(".lsn-reader");
  return {
    root,
    onState(p){ opts.onState && opts.onState(p); },
    onItem(p, it){
      if(it.mark === "play2"){ opts.onPlay2 && opts.onPlay2(it); return; }
      if(it.say){
        st.innerHTML = `▶ <b>${esc(it.sp === "Examiner" ? "Examiner" : it.sp)}</b> mluví…`;
        if(rd){ rd.hidden = !useReader(); if(useReader()) rd.innerHTML = `<span class="sp">${esc(it.sp)}</span>${esc(it.t)}`; }
      } else if(it.beep){ st.textContent = "♪ tón"; }
    },
    onCount(p, it, s){ st.innerHTML = s ? `${esc(it.label)}: <b>${s} s</b>` : ""; const sk = root.querySelector(".lsn-skip"); if(sk) sk.hidden = !s; },
    onEnd(){ st.textContent = "Nahrávka skončila."; if(rd) rd.hidden = true; opts.onEnd && opts.onEnd(); }
  };
}
function controlsHTML(strict){
  const s = S();
  return `<div class="lsn-ctrl">
    <button class="btn primary lsn-start">▶ Spustit poslech</button>
    <button class="btn ghost lsn-pause" disabled>⏸ Pauza</button>
    <button class="btn ghost lsn-stop" ${strict ? "hidden" : ""} disabled>⏹ Stop</button>
    <button class="btn ghost lsn-skip" hidden>Přeskočit čekání ⏭</button>
    <span class="chips" style="margin:0" role="group" aria-label="Rychlost">${[0.85,1,1.1].map(v => `<button class="chip lsn-speed" data-v="${v}" aria-pressed="${s.speed===v}">${v}×</button>`).join("")}</span>
  </div><p class="lsn-status" aria-live="polite"></p><div class="lsn-reader" hidden></div>`;
}
function wireControls(root, player, start){
  const $ = s => root.querySelector(s);
  $(".lsn-start").onclick = start;
  $(".lsn-pause").onclick = () => { if(player.state === "paused") player.resume(); else player.pause(); };
  $(".lsn-stop").onclick = () => player.stop();
  $(".lsn-skip").onclick = () => { player.skip = true; };
  root.querySelectorAll(".lsn-speed").forEach(b => b.onclick = () => { setS({speed:+b.dataset.v}); root.querySelectorAll(".lsn-speed").forEach(x => x.setAttribute("aria-pressed", String(x === b))); });
}
function syncButtons(root, p, canStart){
  const $ = s => root.querySelector(s);
  const playing = p.state === "playing" || p.state === "paused";
  $(".lsn-start").disabled = playing || !canStart;
  $(".lsn-pause").disabled = !playing; $(".lsn-pause").textContent = p.state === "paused" ? "▶ Pokračovat" : "⏸ Pauza";
  $(".lsn-stop").disabled = !playing;
}

function renderTask(stage, k, task, done){
  injectStyle();
  const s = S(), strict = s.mode === "exam", pt = PARTS[k];
  stage.innerHTML = `<section class="sheet">
    <div class="meta"><span>${esc(pt.label)} · ${esc(task.title)}</span><span class="badge">${strict ? "Zkouškový režim · 2 poslechy" : "Cvičný režim · neomezeně"}</span></div>
    ${!k.startsWith("p1") ? `<p class="note">${esc(task.context)}</p>` : ""}
    ${useReader() ? `<p class="lsn-warn">${ttsOK() ? "Režim čtení je zapnutý." : "Tento prohlížeč neumí syntézu řeči."} Nahrávka se zobrazí <b>po řádcích v reálném tempu</b> – čti ji jako poslech (řádek zmizí, nevracej se).</p>` : ""}
    ${controlsHTML(strict)}
    <div class="lsn-qs"></div>
    <div class="row"><button class="btn primary lsn-check">Vyhodnotit</button><button class="btn ghost lsn-back">← Zpět</button></div>
    <div class="lsn-res" aria-live="polite"></div>
  </section>`;
  const root = stage.querySelector(".sheet"), $ = q => root.querySelector(q);
  const form = renderQuestions(k, task, $(".lsn-qs"));
  let plays = 0, full = false;
  const canStart = () => !strict || !full;
  const player = new Player(playerUI(root, {
    onState:p => syncButtons(root, p, canStart()),
    onEnd:() => { full = true; plays = 2; syncButtons(root, player, canStart()); if(!strict) $(".lsn-start").textContent = "▶ Přehrát znovu"; }
  }));
  wireControls(root, player, () => { player.load(fullScript(k, task, true)); player.play(0); });
  syncButtons(root, player, true);
  $(".lsn-back").onclick = () => { player.stop(); done ? done(null) : P.go(ID, k); };
  $(".lsn-check").onclick = () => {
    player.stop();
    const r = grade(k, task, form, root);
    saveResult(k, task.id, r.c, r.n, r.missed);
    $(".lsn-check").disabled = true;
    $(".lsn-res").innerHTML = `<p class="score">${r.c} / ${r.n}</p>
      <div class="row" style="margin:0 0 14px"><button class="btn ghost lsn-lines">Poslech po větách</button><button class="btn primary lsn-next">Další úloha</button></div>
      <h2>Vysvětlení</h2>${feedbackHTML(k, task, form)}
      <h2>Transcript</h2><div class="lsn-tr">${transcriptHTML(k, task, form)}</div>`;
    $(".lsn-next").onclick = () => done ? done(r) : openNext(stage, k, task.id);
    $(".lsn-lines").onclick = () => renderLines(stage, k, task);
    root.querySelectorAll(".lsn-rl").forEach(b => b.onclick = () => playOne(k, task, +b.dataset.r, +b.dataset.l));
  };
}
function playOne(k, task, ri, li){
  const rec = recordings(k, task)[ri], l = rec.lines[li]; P.tts.stop();
  if(useReader()){ P.toast("Režim čtení – bez zvuku."); return Promise.resolve(); }
  const v = resolveVoice(rec.speakers[l.sp]), rate = v.rate * S().speed * 0.95;
  return Promise.race([P.tts.speak(l.t, {lang:"en-GB", rate, pitch:v.pitch, voiceIdx:v.voiceIdx}), sleep(estMs(l.t, rate))]);
}
function openNext(stage, k, curId){
  const list = D()[k] || [], d = prog();
  const fresh = list.filter(t => d[t.id] == null && t.id !== curId);
  const t = fresh.length ? fresh[0] : list[(list.findIndex(x => x.id === curId) + 1) % list.length];
  renderTask(stage, k, t);
}

/* ---------- "Poslech po větách": replay sentence by sentence, transcript with gaps ---------- */
function renderLines(stage, k, task){
  injectStyle();
  const recs = recordings(k, task), items = [];
  recs.forEach((rec, ri) => rec.lines.forEach(l => sentences(l.t).forEach(t => items.push({ri, sp:l.sp, t, v:rec.speakers[l.sp]}))));
  stage.innerHTML = `<section class="sheet"><div class="meta"><span>Poslech po větách · ${esc(task.title)}</span><button class="link-btn lsn-back">← zpět</button></div>
    <p class="note">Pusť si větu (klidně zpomaleně), doplň vynechaná slova a zkontroluj. Pak větu nahlas zopakuj (shadowing) – trénuješ spojenou řeč, redukce a slabé tvary.</p>
    ${useReader() ? `<p class="lsn-warn">Bez syntézy řeči: zkus si nejdřív větu přečíst nahlas, pak doplň slova zpaměti.</p>` : ""}
    <div class="lsn-ls"></div></section>`;
  const box = stage.querySelector(".lsn-ls");
  box.innerHTML = items.map((it, i) => {
    const w = it.t.split(/\s+/);
    const cand = w.map((x, j) => [x, j]).filter(([x]) => x.replace(/[^A-Za-z']/g,"").length >= 4);
    const pick = new Set(shuffle(cand).slice(0, Math.min(3, Math.max(1, Math.round(w.length/7)))).map(c => c[1]));
    const html = w.map((x, j) => {
      if(!pick.has(j)) return esc(x);
      const m = x.match(/^([^A-Za-z']*)([A-Za-z'’-]+)(.*)$/); if(!m) return esc(x);
      return esc(m[1]) + `<input class="lsn-gapin" data-a="${esc(m[2])}" style="width:${m[2].length+2}ch" aria-label="Chybějící slovo">` + esc(m[3]);
    }).join(" ");
    return `<div class="lsn-line" data-i="${i}"><span class="note">${esc(it.sp)}</span><p class="txt">${html}</p>
      <div class="row"><button class="btn ghost lsn-p1" data-i="${i}">▶ 1×</button><button class="btn ghost lsn-p75" data-i="${i}">▶ 0.75×</button><button class="btn ghost lsn-ck" data-i="${i}">Zkontrolovat</button><button class="link-btn lsn-sh" data-i="${i}">ukázat celou větu</button></div><p class="hint" aria-live="polite"></p></div>`;
  }).join("");
  const say = (i, f) => {
    const it = items[i]; if(useReader()){ P.toast("Syntéza řeči není k dispozici."); return; }
    const v = resolveVoice(it.v); P.tts.stop();
    const rate = v.rate * f; Promise.race([P.tts.speak(it.t, {lang:"en-GB", rate, pitch:v.pitch, voiceIdx:v.voiceIdx}), sleep(estMs(it.t, rate))]);
  };
  box.querySelectorAll(".lsn-p1").forEach(b => b.onclick = () => say(+b.dataset.i, 0.95));
  box.querySelectorAll(".lsn-p75").forEach(b => b.onclick = () => say(+b.dataset.i, 0.72));
  box.querySelectorAll(".lsn-ck").forEach(b => b.onclick = () => {
    const ln = b.closest(".lsn-line"); let ok = 0, n = 0;
    ln.querySelectorAll("input").forEach(x => { n++; const good = norm(x.value) === norm(x.dataset.a); if(good) ok++; x.classList.toggle("ok", good); x.classList.toggle("bad", !good); });
    ln.querySelector(".hint").textContent = `${ok}/${n} správně` + (ok < n ? " – pusť si větu znovu, nebo zobraz celou." : " ✓");
  });
  box.querySelectorAll(".lsn-sh").forEach(b => b.onclick = () => { b.closest(".lsn-line").querySelector(".hint").textContent = items[+b.dataset.i].t; });
  stage.querySelector(".lsn-back").onclick = () => renderTask(stage, k, task);
}

/* ---------- home + part list ---------- */
function renderHome(stage){
  injectStyle();
  const s = S(), d = prog(), traps = P.store.get(ID+":traps", {}), tt = D().trapTypes || {};
  const weak = Object.entries(traps).sort((a,b) => b[1]-a[1]).slice(0,3);
  stage.innerHTML = `<section class="sheet">
    <h2 style="margin-top:0">Listening · Part 1–4</h2>
    <p>Poslech jako u skutečné zkoušky: každá nahrávka zazní <b>dvakrát</b>, před ní je čas na přečtení otázek. Zvuk vytváří syntéza řeči prohlížeče (en-GB hlasy, každý mluvčí jiným hlasem) – zní uměleji než nahrávka, ale formát, rychlost a typy otázek odpovídají zkoušce.</p>
    <div class="lsn-tts"></div>
    <p class="note" style="margin:10px 0 4px">Režim</p>
    <div class="chips" role="group" aria-label="Režim"><button class="chip lsn-mode" data-v="exam" aria-pressed="${s.mode==="exam"}">Zkouškový (2 poslechy)</button><button class="chip lsn-mode" data-v="practice" aria-pressed="${s.mode==="practice"}">Cvičný (neomezeně, pauza)</button></div>
    ${ttsOK() ? `<label class="note"><input type="checkbox" class="lsn-rdr" ${s.reader ? "checked" : ""}> Režim čtení místo zvuku (text po řádcích v reálném tempu)</label>` : ""}
  </section>
  <div class="cards" style="margin-top:16px">${Object.keys(PARTS).map(k => { const list = D()[k] || []; const dn = list.filter(t => d[t.id] != null).length;
    return `<button class="card" data-k="${k}"><b>${PARTS[k].label}</b><span>${esc(PARTS[k].name)} · ${dn}/${list.length} úloh</span><i class="pct"><i style="width:${list.length ? Math.round(100*dn/list.length) : 0}%"></i></i></button>`; }).join("")}</div>
  ${weak.length ? `<section class="sheet"><b>Tvoje nejčastější pasti:</b> ${weak.map(([k,n]) => `${esc(tt[k]||k)} (${n}×)`).join(", ")}</section>` : ""}`;
  const tb = stage.querySelector(".lsn-tts");
  const paint = () => { tb.innerHTML = !ttsOK() ? `<p class="lsn-warn">Prohlížeč nepodporuje syntézu řeči. Nahrávky poběží v <b>režimu čtení</b>: text se ukazuje po řádcích v tempu mluvené řeči, takže si procvičíš aspoň formát a práci s otázkami.</p>`
    : voiceCount() === 0 ? `<p class="lsn-warn">Prohlížeč zatím nenabízí žádný hlas. Pokud zůstane potichu, zapni níže <b>režim čtení</b> (nebo zkus Chrome/Edge/Safari).</p>` : `<p class="note">Nalezeno hlasů: ${voicePool().length} anglických.</p>`; };
  paint(); setTimeout(() => { if(tb.isConnected) paint(); }, 1200);
  stage.querySelectorAll(".lsn-mode").forEach(b => b.onclick = () => { setS({mode:b.dataset.v}); renderHome(stage); });
  const r = stage.querySelector(".lsn-rdr"); if(r) r.onchange = () => setS({reader:r.checked});
  stage.querySelectorAll(".card").forEach(c => c.onclick = () => P.go(ID, c.dataset.k));
}
function renderPart(stage, k){
  injectStyle();
  const list = D()[k] || [], d = prog();
  stage.innerHTML = `<section class="sheet"><div class="meta"><span>${PARTS[k].label} · ${esc(PARTS[k].name)}</span><button class="link-btn lsn-home">← Listening</button></div>
    <details class="lsn-strat"><summary><b>Strategie pro ${PARTS[k].label}</b></summary><ul>${STRAT[k].map(x => `<li>${esc(x)}</li>`).join("")}</ul></details>
    <div class="cards" style="margin-top:14px">${list.map(t => `<button class="card" data-id="${esc(t.id)}"><b>${esc(t.title)}</b><span>${d[t.id] != null ? "nejlépe " + d[t.id] + " %" : "nezkoušeno"}</span></button>`).join("")}</div></section>`;
  stage.querySelector(".lsn-home").onclick = () => P.go(ID);
  stage.querySelectorAll(".card").forEach(c => c.onclick = () => renderTask(stage, k, list.find(t => t.id === c.dataset.id)));
}

/* ---------- mock: one random task per part, strict 2-play, auto-advancing ---------- */
function runMock(stage, finish){
  injectStyle();
  const pick = k => { const l = D()[k] || []; return l[Math.floor(Math.random()*l.length)]; };
  const plan = ["p1","p2","p3","p4"].map(k => ({k, task:pick(k)})).filter(x => x.task);
  let correct = 0, total = 0, idx = 0; const details = {};
  const next = () => {
    if(idx >= plan.length){ finish({correct, total, details}); return; }
    const {k, task} = plan[idx];
    stage.innerHTML = `<section class="sheet"><div class="meta"><span>Listening · ${PARTS[k].label} (${idx+1}/4)</span><span class="badge">Zkouška · 2 poslechy</span></div>
      ${useReader() ? `<p class="lsn-warn">Bez syntézy řeči – režim čtení po řádcích.</p>` : ""}
      ${controlsHTML(true)}<div class="lsn-qs"></div>
      <div class="row"><button class="btn primary lsn-done">${idx < plan.length-1 ? "Další část →" : "Odevzdat Listening"}</button></div></section>`;
    const root = stage.querySelector(".sheet");
    const form = renderQuestions(k, task, root.querySelector(".lsn-qs"));
    let ran = false;
    const player = new Player(playerUI(root, {onState:p => syncButtons(root, p, !ran)}));
    root.querySelector(".lsn-stop").hidden = true;
    wireControls(root, player, () => { ran = true; player.load(fullScript(k, task, true)); player.play(0); });
    syncButtons(root, player, true);
    root.querySelector(".lsn-done").onclick = () => {
      player.stop(); const r = grade(k, task, form, root);
      correct += r.c; total += r.n; details[k] = {id:task.id, correct:r.c, total:r.n};
      P.logActivity(ID, k, r.c, r.n, {task:task.id, mock:true});
      idx++; next();
    };
  };
  next();
}

P.register({
  id:ID, title:"Listening (Part 1–4)", short:"Listening",
  blurb:"Úryvky, doplňování vět, rozhovor, 5 monologů – 2 poslechy jako u zkoušky.",
  render(stage, ctx){ const sub = ctx && ctx.sub; if(sub && PARTS[sub]) renderPart(stage, sub); else renderHome(stage); },
  progress(){ const d = prog(), all = allTasks(); return {done: all.filter(x => d[x.t.id] != null).length, total: all.length}; },
  mock:{paper:"Listening", minutes:40, run:runMock}
});
})();
