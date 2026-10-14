/* Listening (Parts 1–4) – B2 First. Audio = Web Speech API via Portal.tts; fallback = timed reader mode.
   Adapted from the C1 module: same player (per-speaker voices, exam/practice modes, 2 plays, prep time,
   speed 0.85–2×, skipping, keyboard shortcuts, reader mode, transcript with evidence, line dictation, mock),
   but with the B2 First format: P1 8 extracts × 1 question, P2 10 gaps, P3 5 speakers / 8 options, P4 7 questions. */
(function(){
"use strict";
const P = window.Portal; if(!P) return;
const {esc, norm, shuffle} = P.util;
const D = () => (window.DATA && window.DATA.listening) || {};
const ID = "listening";
const PARTS = {
  p1:{n:1, label:"Part 1", name:"Osm krátkých úryvků (8 otázek, A–C)", prep:5, first:1, count:8},
  p2:{n:2, label:"Part 2", name:"Doplňování vět (monolog, 10 mezer)", prep:45, first:9, count:10},
  p3:{n:3, label:"Part 3", name:"Pět krátkých monologů (výběr z A–H)", prep:30, first:19, count:5},
  p4:{n:4, label:"Part 4", name:"Rozhovor / interview (7 otázek, A–C)", prep:60, first:24, count:7}
};
const PREP_SAY = {p2:"forty-five seconds", p3:"thirty seconds", p4:"one minute"};
const ONES = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
const numWord = n => n < 20 ? ONES[n] : n === 30 ? "thirty" : "twenty" + (n % 10 ? "-" + ONES[n % 10] : "");
const LET = "ABCDEFGH";

/* ---------- settings ---------- */
const S = () => Object.assign({mode:"exam", speed:1, reader:false, fast:false, once:false}, P.store.get(ID+":settings", {}));
const SPEEDS = [0.85, 1, 1.25, 1.5, 1.75, 2];
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
const sentences = t => (String(t).match(/[^.!?]+[.!?]+['"’”]?|[^.!?]+$/g) || [String(t)]).map(s => s.trim()).filter(Boolean);
/* long lines are spoken in chunks of whole sentences: some speech engines cut off long utterances,
   and "⏮ Věta zpět" / "⏭ Další věta" then really move by a sentence or two */
function chunks(t){
  const out = []; let cur = "";
  sentences(t).forEach(s => { if(cur && (cur + " " + s).length > 170){ out.push(cur); cur = s; } else cur = cur ? cur + " " + s : s; });
  if(cur) out.push(cur);
  return out.length ? out : [String(t)];
}

/* ---------- style ---------- */
function injectStyle(){
  if(document.getElementById("b2lsn-style")) return;
  const st = document.createElement("style"); st.id = "b2lsn-style";
  st.textContent = `
.lsn-ctrl{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 0 12px}
.lsn-ctrl[hidden]{display:none}
.lsn-ctrl .chip{min-height:36px;padding:0 11px;font-size:14px}
.lsn-ctrl .chips{gap:6px}
.lsn-keys{margin:-4px 0 8px;font-size:12.5px}
@media (hover:none){.lsn-keys{display:none}}
.lsn-ctrl .btn{min-height:40px;padding:0 14px;font-size:15px}
.lsn-status{font-size:14px;color:var(--muted);margin:0 0 12px;min-height:1.3em}
.lsn-status b{color:var(--ink)}
.lsn-reader{border:1.5px dashed var(--rule);border-radius:6px;padding:12px 14px;margin:0 0 14px;font-family:var(--serif);font-size:19px;min-height:3.2em}
.lsn-reader .sp{display:block;font-family:var(--sans);font-size:13px;color:var(--muted)}
.lsn-q{margin:0 0 18px}
.lsn-q .qt{font-family:var(--serif);font-size:18px;margin:0 0 8px}
.lsn-q .qt b{font-family:var(--sans);font-size:14px;color:var(--muted);margin-right:6px}
.lsn-q .qt .ctx{display:block;font-style:italic;color:var(--muted);font-size:16.5px;margin:0 0 2px}
.lsn-q .opt{font-size:17px;min-height:40px;padding:8px 12px}
.lsn-q .opt[aria-pressed="true"]{border-color:var(--ink);background:var(--soft)}
.lsn-gapin{font:inherit;font-family:var(--serif);font-size:17px;border:0;border-bottom:2px solid var(--ink);background:transparent;color:var(--ink);min-width:9ch;max-width:100%;padding:0 4px}
.lsn-gapin.ok{border-bottom-color:var(--green);color:var(--green)} .lsn-gapin.bad{border-bottom-color:var(--red);color:var(--red)}
.lsn-p3task{font-family:var(--serif);font-size:17px;margin:0 0 8px}
.lsn-p3{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px 14px;margin:0 0 16px}
.lsn-p3 label{display:flex;gap:8px;align-items:center}
.lsn-p3 select{font:inherit;padding:6px;border:1.5px solid var(--rule);border-radius:6px;background:var(--sheet);color:var(--ink);max-width:100%}
.lsn-p3 select.ok{border-color:var(--green)} .lsn-p3 select.bad{border-color:var(--red)}
.lsn-opts8{font-size:16px;margin:0 0 12px;padding-left:0;list-style:none} .lsn-opts8 li{margin:3px 0}
.lsn-tr{font-family:var(--serif);font-size:17px;line-height:1.6}
.lsn-tr p{margin:0 0 8px} .lsn-tr .who{font-family:var(--sans);font-size:13px;font-weight:600;color:var(--muted);margin-right:6px}
.lsn-tr mark{background:var(--hl);color:var(--ink);padding:0 2px;border-radius:2px}
.lsn-tr mark sup{font-family:var(--sans);font-size:11px;font-weight:700;margin-left:2px}
.lsn-tag{display:inline-block;font-size:12px;padding:0 8px;border-radius:9px;background:var(--soft);color:var(--muted);margin-left:6px}
.lsn-line{border-top:1px solid var(--rule);padding:10px 0}
.lsn-line .txt{font-family:var(--serif);font-size:17px;margin:6px 0}
.lsn-strat p,.lsn-strat li{font-size:15.5px}
.lsn-warn{border-left:3px solid var(--red);padding:4px 12px;margin:0 0 14px;font-size:14.5px}
.lsn-fmt{width:100%;border-collapse:collapse;font-size:14.5px;margin:10px 0 0}
.lsn-fmt td{border-top:1px solid var(--rule);padding:5px 6px 5px 0;vertical-align:top}
`;
  document.head.appendChild(st);
}

/* ---------- strategy (CZ) ---------- */
const STRAT = {
  p1:["Osm nesouvisejících úryvků (asi 30 s), u každého JEDNA otázka A–C. Otázku i kontext („You hear…“) přečte examiner před úryvkem – máš asi 5 s na přečtení možností.",
      "Ptají se na hlavní myšlenku, názor, pocit, účel („Why is she calling?“), místo, vztah mluvčích nebo na to, na čem se shodnou.",
      "Všechny tři možnosti v nahrávce obvykle nějak zazní. Správná je ta, kterou mluvčí opravdu myslí – ne ta, kterou zmíní a hned odmítne („I'm not calling to cancel“).",
      "U otázky „What do they agree about?“ hledej reakce typu „Definitely“, „Yes, exactly“, „Me too“ – shodnout se musí OBA."],
  p2:["Jeden monolog (asi 3 min), 10 vět s mezerou. Píšeš 1–3 slova PŘESNĚ tak, jak zazní – nepřeformulovávej.",
      "Během 45 s přípravy si u každé mezery odhadni slovní druh: podstatné jméno, číslo, množné číslo, přídavné jméno?",
      "Věty jsou ve stejném pořadí jako nahrávka, ale jinými slovy. Poslouchej synonyma slov kolem mezery.",
      "Mluvčí často zmíní dvě možnosti – první je past („I thought it would be…, but in fact…“). Pravopis běžných slov se počítá."],
  p3:["Pět krátkých monologů na stejné téma, jeden úkol: ke každému mluvčímu jedna z osmi možností A–H. Tři písmena zůstanou nepoužitá.",
      "Při prvním poslechu si ke každému mluvčímu poznač 1–2 možné odpovědi, při druhém se rozhodni.",
      "Mluvčí často zmíní slova z jiné možnosti – rozhoduje, co opravdu říká o sobě (pocit, důvod, zkušenost), ne které slovo padlo.",
      "Každé písmeno použij jen jednou. Když nevíš, vyluč nejdřív jisté odpovědi."],
  p4:["Rozhovor nebo interview (3–4 minuty), 7 otázek A–C ve stejném pořadí jako v nahrávce. Na přečtení otázek máš 1 minutu.",
      "Otázky testují názory, pocity a důvody. Správná možnost je skoro vždy parafráze – shodné slovo v možnosti bývá spíš past.",
      "Za slovy „but“, „actually“, „in the end“, „what I really…“ obvykle přichází skutečná odpověď.",
      "Když jednu otázku propásneš, nezasekni se – další odpověď už přichází."]
};

/* ---------- progress ---------- */
const prog = () => P.store.get(ID+":done", {});
function saveResult(part, id, c, n, missed){
  const d = prog(); d[id] = Math.max(d[id] || 0, Math.round(100*c/n)); P.store.set(ID+":done", d);
  const w = P.store.get(ID+":traps", {}); missed.forEach(t => { if(t) w[t] = (w[t] || 0) + 1; }); P.store.set(ID+":traps", w);
  P.logActivity(ID, part, c, n, {task:id});
}
const allTasks = () => ["p1","p2","p3","p4"].reduce((a,k) => a.concat((D()[k]||[]).map(t => ({k, t}))), []);

/* ---------- build a playable script for a task ----------
   items: {say, sp, t, v, rec, li, ci} | {wait:sec, label, prep?} | {gap:ms} | {beep:true} | {mark:"play2"} | {note:text}
   blk = part of the intro of the next play-through (Part 1: question read by the examiner + reading time)
   fast = no spoken instructions and no pauses (straight to the recordings) */
function examinerSay(t){ return {say:true, sp:"Examiner", t, v:resolveVoice("EX"), rec:-1, li:-1}; }
function recItems(k, rec, ri, fast){
  const out = [];
  rec.lines.forEach((l, li) => {
    /* Part 3: a short silence between speakers, as in the exam */
    if(k === "p3" && !fast && li > 0 && l.sp !== rec.lines[li-1].sp) out.push({gap:1500});
    const v = resolveVoice(rec.speakers[l.sp]);
    chunks(l.t).forEach((t, ci) => out.push({say:true, sp:l.sp, t, v, rec:ri, li, ci}));
  });
  return out;
}
function recordings(k, task){ return k === "p1" ? task.extracts : [task]; }
function fullScript(k, task, twice, fast){
  const pt = PARTS[k], recs = recordings(k, task), out = [];
  const rub = {
    p1:"Part One. You will hear people talking in eight different situations. For questions one to eight, choose the best answer, A, B or C.",
    p2:"Part Two. " + task.context + " For questions nine to eighteen, complete the sentences with a word or short phrase.",
    p3:"Part Three. " + task.context + " For questions nineteen to twenty-three, choose from the list, A to H, " + task.ask + ". Use the letters only once. There are three extra letters which you do not need to use.",
    p4:"Part Four. " + task.context + " For questions twenty-four to thirty, choose the best answer, A, B or C."
  }[k];
  if(!fast) out.push(examinerSay(rub));
  recs.forEach((rec, ri) => {
    if(k === "p1"){
      if(fast) out.push({note:"Question " + (ri+1) + ": " + rec.context});
      else {
        out.push(Object.assign(examinerSay("Question " + numWord(ri+1) + ". " + rec.context + " " + rec.q), {blk:true}));
        out.push({wait:pt.prep, label:"Čas na přečtení otázky " + (ri+1), prep:true, blk:true});
      }
    } else if(!fast){
      out.push(examinerSay("You now have " + PREP_SAY[k] + " to look at Part " + numWord(pt.n) + "."));
      out.push({wait:pt.prep, label:"Čas na přečtení otázek", prep:true});
    }
    out.push({beep:true});
    out.push(...recItems(k, rec, ri, fast));
    if(twice){
      if(!fast) out.push({wait:k === "p1" ? 3 : 5, label:"Pauza před druhým poslechem"});
      out.push({beep:true});
      if(!fast) out.push(examinerSay(k === "p1" ? "Now listen again." : "Now you'll hear Part " + numWord(pt.n) + " again."));
      out.push({mark:"play2", rec:ri});
      out.push(...recItems(k, rec, ri, fast));
    }
  });
  if(!fast) out.push(examinerSay("That is the end of Part " + numWord(pt.n) + "."));
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
    this.skip = false;
    this.ui.onItem(this, it);
    if(it.say){
      const speed = S().speed, rate = (it.v.rate || 1) * speed * 0.95;
      if(useReader()){
        await this.wait(estMs(it.t, rate*1.2) - 2000, g);
      } else {
        await Promise.race([P.tts.speak(it.t, {lang:"en-GB", rate, pitch:it.v.pitch, voiceIdx:it.v.voiceIdx}), sleep(estMs(it.t, rate))]);
      }
    } else if(it.wait){
      for(let s = it.wait; s > 0; s--){
        if(g !== this.gen || this.skip || !this.alive()) break;
        while(this.state === "paused" && g === this.gen && !this.skip) await sleep(200);
        this.ui.onCount(this, it, s);
        for(let t = 0; t < 10 && g === this.gen && !this.skip && this.state !== "paused"; t++) await sleep(100);
      }
      this.ui.onCount(this, it, 0);
    } else if(it.gap){ await this.wait(it.gap / Math.max(1, S().speed), g); }
    else if(it.beep){ await beep(); }
    if(g !== this.gen) return;
    if(this.state === "paused" && !this.skip) continue;   // interrupted mid-line → replay this line on resume
    this.i++;
  }
  this.state = "ended"; this.ui.onState(this); this.ui.onEnd && this.ui.onEnd(this);
};
Player.prototype.wait = async function(ms, g){ const end = Date.now() + Math.max(800, ms); while(Date.now() < end){ if(g !== this.gen || this.state === "paused" || this.skip) return; await sleep(100); } };
Player.prototype.active = function(){ return this.state === "playing" || this.state === "paused"; };
/* skip whatever is playing now: instructions, countdown, tone or one sentence of the recording */
Player.prototype.skipItem = function(){ if(this.active()) this.seek(this.i + 1); };
/* restart the loop at item i (also from pause); the short gap lets the speech engine finish cancelling */
Player.prototype.seek = function(i){
  if(!this.active()) return;
  const g = ++this.gen; P.tts.stop();
  this.i = Math.max(0, Math.min(i, this.items.length)); this.state = "playing"; this.ui.onState(this);
  setTimeout(() => { if(g === this.gen) this.play(); }, 80);
};
/* next start of a play-through (2nd listening, next extract) – or the end */
const isIntro = it => !!(it && (it.beep || it.note || it.mark || it.blk));
const isStart = it => !!(it && it.say && it.rec >= 0 && it.li === 0 && !it.ci);
Player.prototype.nextBlock = function(){
  /* standing on the tone / intro of a play-through counts as being in it */
  let s = this.i; while(s < this.items.length && isIntro(this.items[s])) s++;
  const from = isStart(this.items[s]) ? s + 1 : this.i + 1;
  for(let j = from; j < this.items.length; j++){
    if(!isStart(this.items[j])) continue;
    while(j - 1 >= from && isIntro(this.items[j-1])) j--; /* keep the tone / question of the next extract */
    return this.seek(j);
  }
  this.seek(this.items.length);
};
Player.prototype.prevLine = function(){
  const cur = this.items[this.i], from = cur && cur.say && cur.rec >= 0 ? this.i - 1 : this.i;
  for(let j = from; j >= 0; j--){ const it = this.items[j]; if(it.say && it.rec >= 0) return this.seek(j); }
  this.seek(0);
};
Player.prototype.pause = function(){ if(this.state !== "playing") return; this.state = "paused"; P.tts.stop(); this.ui.onState(this); };
Player.prototype.resume = function(){ if(this.state !== "paused") return; this.state = "playing"; this.ui.onState(this); };
Player.prototype.stop = function(){ this.gen++; P.tts.stop(); this.state = "idle"; if(this.ui && this.ui.onState) this.ui.onState(this); };

/* ---------- question rendering ---------- */
/* flat list of questions in exam order; rec = index of the recording that holds the evidence */
function qsOf(k, task){
  if(k === "p1") return task.extracts.map((ex, ri) => ({rec:ri, context:ex.context, q:ex.q, opts:ex.opts, correct:ex.correct, evidence:ex.evidence, why:ex.why, trap:ex.trap, tt:ex.tt}));
  if(k === "p3") return task.qs.slice().sort((a,b) => a.n - b.n).map(q => Object.assign({rec:0}, q));
  return task.qs.map(q => Object.assign({rec:0}, q));
}
const p3Task = task => `For questions 19–23, choose from the list (A–H) ${task.ask}. Use the letters only once. There are three extra letters which you do not need to use.`;
function renderQuestions(k, task, box){
  const pt = PARTS[k]; const qs = qsOf(k, task); let h = "";
  if(k === "p3"){
    h += `<p class="lsn-p3task">${esc(p3Task(task))}</p><ul class="lsn-opts8">${task.opts.map((o,i) => `<li><b>${LET[i]}</b> ${esc(o)}</li>`).join("")}</ul><div class="lsn-p3">`;
    qs.forEach((q, qi) => {
      const num = pt.first + qi;
      h += `<label><span class="note">${num}</span> <span>Speaker ${q.n}</span> <select data-qi="${qi}" aria-label="Otázka ${num}, Speaker ${q.n}"><option value="">–</option>${task.opts.map((o,i) => `<option value="${i}">${LET[i]}</option>`).join("")}</select></label>`;
    });
    h += `</div><div class="fbx" aria-live="polite"></div>`;
  } else {
    qs.forEach((q, qi) => {
      const num = pt.first + qi;
      if(k === "p2"){
        const [a, b] = q.s.split("___");
        h += `<div class="lsn-q"><p class="qt"><b>${num}</b>${esc(a)}<input class="lsn-gapin" data-qi="${qi}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Mezera ${num}">${esc(b||"")}</p><div class="fbx" aria-live="polite"></div></div>`;
      } else {
        const ctx = k === "p1" ? `<span class="ctx">${esc(q.context)}</span>` : "";
        h += `<div class="lsn-q"><p class="qt"><b>${num}</b>${ctx}${esc(q.q)}</p><div class="opts">${q.opts.map((o,i) => `<button class="opt" data-qi="${qi}" data-i="${i}" aria-pressed="false"><i>${LET[i]}</i>${esc(o)}</button>`).join("")}</div><div class="fbx" aria-live="polite"></div></div>`;
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
    if(k === "p3"){ const el = box.querySelector(`select[data-qi="${qi}"]`); return el && el.value !== "" ? +el.value : null; }
    return ans[qi] == null ? null : ans[qi];
  }};
}
const gapNorm = s => norm(s).replace(/-/g," ").replace(/\s+/g," ").trim();
const okP2 = (val, q) => { const v = gapNorm(val); return !!v && q.ans.some(a => { const A = gapNorm(a); return A === v || A === v.replace(/^(a|an|the) /,""); }); };
function grade(k, task, form, box){
  let c = 0; const missed = [];
  form.qs.forEach((q, qi) => {
    const v = form.get(qi); let ok;
    if(k === "p2"){
      ok = okP2(v, q);
      const el = box.querySelector(`input[data-qi="${qi}"]`); el.classList.add(ok ? "ok" : "bad"); el.disabled = true;
    } else if(k === "p3"){
      ok = v === q.correct;
      const el = box.querySelector(`select[data-qi="${qi}"]`); el.classList.add(ok ? "ok" : "bad"); el.disabled = true;
    } else {
      ok = v === q.correct;
      box.querySelectorAll(`.opt[data-qi="${qi}"]`).forEach(b => { b.disabled = true; const i = +b.dataset.i; if(i === q.correct) b.classList.add("right"); else if(i === v) b.classList.add("wrong"); });
    }
    if(ok) c++; else missed.push(q.tt);
    q._ok = ok; q._v = v;
  });
  return {c, n:form.qs.length, missed};
}
function feedbackHTML(k, task, form){
  const pt = PARTS[k], tt = D().trapTypes || {};
  let h = form.qs.map((q, qi) => {
    const num = pt.first + qi;
    const right = k === "p2" ? q.ans.join(" / ") : k === "p3" ? LET[q.correct] + " – " + task.opts[q.correct] : LET[q.correct] + " – " + q.opts[q.correct];
    const yours = k === "p2" ? (String(q._v || "").trim() || "—") : q._v == null ? "—" : LET[q._v];
    return `<div class="fb ${q._ok ? "" : "bad"}"><p class="verdict">${num}. ${q._ok ? "Správně" : "Chyba"} · ${esc(right)}${k === "p3" ? ` <span class="lsn-tag">Speaker ${q.n}</span>` : ""}${q._ok ? "" : ` <span class="lsn-tag">tvoje: ${esc(yours)}</span>`}</p>
      <p class="why">${esc(q.why)}</p><p class="alts"><b>Past:</b> ${esc(q.trap)} <span class="lsn-tag">${esc(tt[q.tt] || q.tt)}</span></p>
      <p class="alts">Důkaz: „<i>${esc(q.evidence)}</i>“</p></div>`;
  }).join("");
  if(k === "p3"){
    const used = new Set(form.qs.map(q => q.correct));
    const extra = task.opts.map((o, i) => [o, i]).filter(([, i]) => !used.has(i));
    h += `<p class="note"><b>Nepoužité možnosti (navíc):</b> ${extra.map(([o, i]) => `${LET[i]} – ${esc(o)}`).join(" · ")}</p>`;
  }
  return h;
}
function transcriptHTML(k, task, form){
  const recs = recordings(k, task); const pt = PARTS[k];
  return recs.map((rec, ri) => (k === "p1" ? `<p class="note"><b>Question ${ri+1}</b> – ${esc(rec.context)}</p>` : "") + rec.lines.map((l, li) => {
    const marks = [];
    (form ? form.qs : []).forEach((q, qi) => {
      if(q.rec !== ri) return;
      if(k === "p3" && l.sp !== "Speaker " + q.n) return;
      const at = l.t.indexOf(q.evidence); if(at < 0) return;
      marks.push({at, end:at+q.evidence.length, num:pt.first + qi});
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
        st.innerHTML = `▶ <b>${esc(it.sp)}</b> mluví…`;
        if(rd){ rd.hidden = !useReader(); if(useReader()) rd.innerHTML = `<span class="sp">${esc(it.sp)}</span>${esc(it.t)}`; }
      } else if(it.beep){ st.textContent = "♪ tón"; }
      else if(it.gap){ st.textContent = "… pauza"; }
      else if(it.note){ st.innerHTML = `<b>${esc(it.note)}</b>`; }
      const sk = root.querySelector(".lsn-skip");
      if(sk) sk.textContent = it.wait ? "⏭ Přeskočit čekání" : it.say && it.rec < 0 ? "⏭ Přeskočit instrukce" : "⏭ Další věta";
    },
    onCount(p, it, s){ st.innerHTML = s ? `${esc(it.label)}: <b>${s} s</b>` : ""; },
    onEnd(){ st.textContent = "Nahrávka skončila."; if(rd) rd.hidden = true; opts.onEnd && opts.onEnd(); }
  };
}
/* options = show the "fast" / "one listening" switches (not in the mock exam) */
function controlsHTML(strict, options){
  const s = S(), spd = SPEEDS.includes(s.speed) ? s.speed : 1;
  return `<div class="lsn-ctrl">
    <button class="btn primary lsn-start">▶ Spustit poslech</button>
    <button class="btn ghost lsn-pause" disabled>⏸ Pauza</button>
    <button class="btn ghost lsn-stop" ${strict ? "hidden" : ""} disabled>⏹ Stop</button>
  </div>
  <div class="lsn-ctrl lsn-nav" hidden>
    <button class="btn ghost lsn-prev" ${strict ? "hidden" : ""} title="Předchozí věta (←)">⏮ Věta zpět</button>
    <button class="btn ghost lsn-skip" title="Přeskočit (→)">⏭ Přeskočit</button>
    <button class="btn ghost lsn-block" title="Na další poslech / úryvek (Shift+→)">⏩ Další poslech</button>
  </div>
  <div class="lsn-ctrl"><span class="note">Rychlost</span><span class="chips" style="margin:0" role="group" aria-label="Rychlost">${SPEEDS.map(v => `<button class="chip lsn-speed" data-v="${v}" aria-pressed="${spd===v}">${String(v).replace(".", ",")}×</button>`).join("")}</span></div>
  ${options ? `<div class="lsn-ctrl"><span class="chips" style="margin:0" role="group" aria-label="Možnosti poslechu">
    <button class="chip lsn-opt" data-o="fast" aria-pressed="${!!s.fast}" title="Rovnou nahrávka – bez mluvených instrukcí, odpočtů a pauz">⚡ Bez instrukcí a pauz</button>
    <button class="chip lsn-opt" data-o="once" aria-pressed="${!!s.once}" title="Každá nahrávka jen jednou">1 poslech</button></span></div>` : ""}
  <p class="note lsn-keys">Klávesy: mezerník pauza · → přeskočit · Shift+→ další poslech${strict ? "" : " · ← věta zpět"} · +/− rychlost</p>
  <p class="lsn-status" aria-live="polite"></p><div class="lsn-reader" hidden></div>`;
}
function setSpeed(root, player, v){
  setS({speed:v});
  root.querySelectorAll(".lsn-speed").forEach(x => x.setAttribute("aria-pressed", String(+x.dataset.v === v)));
  const it = player.items[player.i];
  if(player.state === "playing" && it && it.say && !useReader()) player.seek(player.i); /* replay the sentence at the new speed */
}
function wireControls(root, player, start, strict){
  const $ = s => root.querySelector(s);
  $(".lsn-start").onclick = start;
  $(".lsn-pause").onclick = () => { if(player.state === "paused") player.resume(); else player.pause(); };
  $(".lsn-stop").onclick = () => player.stop();
  $(".lsn-skip").onclick = () => player.skipItem();
  $(".lsn-block").onclick = () => player.nextBlock();
  $(".lsn-prev").onclick = () => player.prevLine();
  root.querySelectorAll(".lsn-speed").forEach(b => b.onclick = () => setSpeed(root, player, +b.dataset.v));
  root.querySelectorAll(".lsn-opt").forEach(b => b.onclick = () => {
    const o = b.dataset.o, v = !S()[o]; setS({[o]: v}); b.setAttribute("aria-pressed", String(v));
    if(player.active()) P.toast("Platí od dalšího spuštění");
  });
  const onKey = e => {
    if(!root.isConnected){ document.removeEventListener("keydown", onKey); return; }
    if(e.target && e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
    if(e.ctrlKey || e.metaKey || e.altKey) return;
    const i = SPEEDS.indexOf(S().speed);
    if(e.key === " " && player.active()){ if(e.target.closest && e.target.closest("button, a")) return; e.preventDefault(); $(".lsn-pause").click(); }
    else if(e.key === "ArrowRight" && player.active()){ e.preventDefault(); if(e.shiftKey) player.nextBlock(); else player.skipItem(); }
    else if(e.key === "ArrowLeft" && player.active() && !strict){ e.preventDefault(); player.prevLine(); }
    else if(e.key === "+" || e.key === "="){ setSpeed(root, player, SPEEDS[Math.min(SPEEDS.length - 1, (i < 0 ? 1 : i) + 1)]); }
    else if(e.key === "-" || e.key === "_"){ setSpeed(root, player, SPEEDS[Math.max(0, (i < 0 ? 1 : i) - 1)]); }
  };
  document.addEventListener("keydown", onKey);
}
function syncButtons(root, p, canStart){
  const $ = s => root.querySelector(s);
  const playing = p.active();
  $(".lsn-start").disabled = playing || !canStart;
  $(".lsn-pause").disabled = !playing; $(".lsn-pause").textContent = p.state === "paused" ? "▶ Pokračovat" : "⏸ Pauza";
  $(".lsn-stop").disabled = !playing;
  $(".lsn-nav").hidden = !playing;
}

function renderTask(stage, k, task, done){
  injectStyle();
  const s = S(), strict = s.mode === "exam", pt = PARTS[k];
  stage.innerHTML = `<section class="sheet">
    <div class="meta"><span>${esc(pt.label)} · ${esc(task.title)}</span><span class="badge">${strict ? "Zkouškový režim · 2 poslechy" : "Cvičný režim · neomezeně"}</span></div>
    ${k !== "p1" ? `<p class="note">${esc(task.context)}</p>` : `<p class="note">You will hear people talking in eight different situations. For questions 1–8, choose the best answer (A, B or C).</p>`}
    ${useReader() ? `<p class="lsn-warn">${ttsOK() ? "Režim čtení je zapnutý." : "Tento prohlížeč neumí syntézu řeči."} Nahrávka se zobrazí <b>po větách v reálném tempu</b> – čti ji jako poslech (text zmizí, nevracej se).</p>` : ""}
    ${controlsHTML(strict, true)}
    <div class="lsn-qs"></div>
    <div class="row"><button class="btn primary lsn-check">Vyhodnotit</button><button class="btn ghost lsn-back">← Zpět</button></div>
    <div class="lsn-res" aria-live="polite"></div>
  </section>`;
  const root = stage.querySelector(".sheet"), $ = q => root.querySelector(q);
  const form = renderQuestions(k, task, $(".lsn-qs"));
  let full = false;
  const canStart = () => !strict || !full;
  const player = new Player(playerUI(root, {
    onState:p => syncButtons(root, p, canStart()),
    onEnd:() => { full = true; syncButtons(root, player, canStart()); if(!strict) $(".lsn-start").textContent = "▶ Přehrát znovu"; }
  }));
  wireControls(root, player, () => { const o = S(); player.load(fullScript(k, task, !o.once, o.fast)); player.play(0); }, strict);
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
async function playOne(k, task, ri, li){
  const rec = recordings(k, task)[ri], l = rec.lines[li]; P.tts.stop();
  if(useReader()){ P.toast("Režim čtení – bez zvuku."); return; }
  const v = resolveVoice(rec.speakers[l.sp]), rate = v.rate * S().speed * 0.95;
  for(const t of chunks(l.t)){
    if(!document.querySelector(`.lsn-rl[data-r="${ri}"][data-l="${li}"]`)) return; /* view changed */
    await Promise.race([P.tts.speak(t, {lang:"en-GB", rate, pitch:v.pitch, voiceIdx:v.voiceIdx}), sleep(estMs(t, rate))]);
  }
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
  let lastRi = -1;
  box.innerHTML = items.map((it, i) => {
    const head = k === "p1" && it.ri !== lastRi ? `<p class="note"><b>Question ${it.ri+1}</b></p>` : ""; lastRi = it.ri;
    const w = it.t.split(/\s+/);
    const cand = w.map((x, j) => [x, j]).filter(([x]) => x.replace(/[^A-Za-z']/g,"").length >= 4);
    const pick = new Set(shuffle(cand).slice(0, Math.min(3, Math.max(1, Math.round(w.length/7)))).map(c => c[1]));
    const html = w.map((x, j) => {
      if(!pick.has(j)) return esc(x);
      const m = x.match(/^([^A-Za-z']*)([A-Za-z'’-]+)(.*)$/); if(!m) return esc(x);
      return esc(m[1]) + `<input class="lsn-gapin" data-a="${esc(m[2])}" style="width:${m[2].length+2}ch" aria-label="Chybějící slovo">` + esc(m[3]);
    }).join(" ");
    return head + `<div class="lsn-line" data-i="${i}"><span class="note">${esc(it.sp)}</span><p class="txt">${html}</p>
      <div class="row"><button class="btn ghost lsn-p1" data-i="${i}">▶ 1×</button><button class="btn ghost lsn-p75" data-i="${i}">▶ 0.75×</button><button class="btn ghost lsn-p15" data-i="${i}">▶ 1.5×</button><button class="btn ghost lsn-ck" data-i="${i}">Zkontrolovat</button><button class="link-btn lsn-sh" data-i="${i}">ukázat celou větu</button></div><p class="hint" aria-live="polite"></p></div>`;
  }).join("");
  const say = (i, f) => {
    const it = items[i]; if(useReader()){ P.toast("Syntéza řeči není k dispozici."); return; }
    const v = resolveVoice(it.v); P.tts.stop();
    const rate = v.rate * f; Promise.race([P.tts.speak(it.t, {lang:"en-GB", rate, pitch:v.pitch, voiceIdx:v.voiceIdx}), sleep(estMs(it.t, rate))]);
  };
  box.querySelectorAll(".lsn-p1").forEach(b => b.onclick = () => say(+b.dataset.i, 0.95));
  box.querySelectorAll(".lsn-p75").forEach(b => b.onclick = () => say(+b.dataset.i, 0.72));
  box.querySelectorAll(".lsn-p15").forEach(b => b.onclick = () => say(+b.dataset.i, 1.45));
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
    <p>B2 First Listening: asi 40 minut, <b>4 části, 30 otázek</b>, každá nahrávka zazní <b>dvakrát</b> a před ní je čas na přečtení otázek. Zvuk vytváří syntéza řeči prohlížeče (en-GB hlasy, každý mluvčí jiným hlasem) – zní uměleji než nahrávka, ale formát, typy otázek a pasti odpovídají zkoušce.</p>
    <table class="lsn-fmt"><tbody>
      <tr><td><b>Part 1</b></td><td>8 krátkých úryvků, 1 otázka A–C ke každému</td><td>ot. 1–8</td></tr>
      <tr><td><b>Part 2</b></td><td>monolog (~3 min), doplň 1–3 slova do 10 vět</td><td>ot. 9–18</td></tr>
      <tr><td><b>Part 3</b></td><td>5 mluvčích na jedno téma, výběr z 8 možností A–H</td><td>ot. 19–23</td></tr>
      <tr><td><b>Part 4</b></td><td>rozhovor / interview (3–4 min), 7 otázek A–C</td><td>ot. 24–30</td></tr>
    </tbody></table>
    <div class="lsn-tts"></div>
    <p class="note" style="margin:10px 0 4px">Režim</p>
    <div class="chips" role="group" aria-label="Režim"><button class="chip lsn-mode" data-v="exam" aria-pressed="${s.mode==="exam"}">Zkouškový (2 poslechy)</button><button class="chip lsn-mode" data-v="practice" aria-pressed="${s.mode==="practice"}">Cvičný (neomezeně, pauza, věta zpět)</button></div>
    <p class="note" style="margin:8px 0 0">V každé úloze můžeš zrychlit až na 2×, přeskočit instrukce, odpočet i jednotlivé věty a zapnout ⚡ <b>bez instrukcí a pauz</b> nebo <b>1 poslech</b>.</p>
    ${ttsOK() ? `<label class="note"><input type="checkbox" class="lsn-rdr" ${s.reader ? "checked" : ""}> Režim čtení místo zvuku (text po větách v reálném tempu)</label>` : ""}
  </section>
  <div class="cards" style="margin-top:16px">${Object.keys(PARTS).map(k => { const list = D()[k] || []; const dn = list.filter(t => d[t.id] != null).length;
    return `<button class="card" data-k="${k}"><b>${PARTS[k].label}</b><span>${esc(PARTS[k].name)} · ${dn}/${list.length} úloh</span><i class="pct"><i style="width:${list.length ? Math.round(100*dn/list.length) : 0}%"></i></i></button>`; }).join("")}</div>
  ${weak.length ? `<section class="sheet"><b>Tvoje nejčastější pasti:</b> ${weak.map(([k,n]) => `${esc(tt[k]||k)} (${n}×)`).join(", ")}</section>` : ""}`;
  const tb = stage.querySelector(".lsn-tts");
  const paint = () => { tb.innerHTML = !ttsOK() ? `<p class="lsn-warn">Prohlížeč nepodporuje syntézu řeči. Nahrávky poběží v <b>režimu čtení</b>: text se ukazuje po větách v tempu mluvené řeči, takže si procvičíš aspoň formát a práci s otázkami.</p>`
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

/* ---------- mock: one random task per part in exam order, strict 2 plays, auto-advancing ---------- */
function runMock(stage, finish){
  injectStyle();
  const pick = k => { const l = D()[k] || []; return l[Math.floor(Math.random()*l.length)]; };
  const plan = ["p1","p2","p3","p4"].map(k => ({k, task:pick(k)})).filter(x => x.task);
  let correct = 0, total = 0, idx = 0; const details = {};
  const next = () => {
    if(idx >= plan.length){ finish({correct, total, details}); return; }
    const {k, task} = plan[idx];
    const pt = PARTS[k];
    stage.innerHTML = `<section class="sheet"><div class="meta"><span>Listening · ${pt.label} (${idx+1}/${plan.length}) · otázky ${pt.first}–${pt.first + pt.count - 1}</span><span class="badge">Zkouška · 2 poslechy</span></div>
      <p class="note">${esc(k === "p1" ? "You will hear people talking in eight different situations. For questions 1–8, choose the best answer (A, B or C)." : task.context)}</p>
      ${useReader() ? `<p class="lsn-warn">Bez syntézy řeči – režim čtení po větách.</p>` : ""}
      ${controlsHTML(true, false)}<div class="lsn-qs"></div>
      <div class="row"><button class="btn primary lsn-done">${idx < plan.length-1 ? "Další část →" : "Odevzdat Listening"}</button></div></section>`;
    const root = stage.querySelector(".sheet");
    const form = renderQuestions(k, task, root.querySelector(".lsn-qs"));
    let ran = false;
    const player = new Player(playerUI(root, {onState:p => syncButtons(root, p, !ran)}));
    root.querySelector(".lsn-stop").hidden = true;
    wireControls(root, player, () => { ran = true; player.load(fullScript(k, task, true, false)); player.play(0); }, true);
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
  blurb:"8 úryvků, doplňování vět, 5 mluvčích, rozhovor – 30 otázek, 2 poslechy jako u zkoušky.",
  render(stage, ctx){ const sub = ctx && ctx.sub; if(sub && PARTS[sub]) renderPart(stage, sub); else renderHome(stage); },
  progress(){ const d = prog(), all = allTasks(); return {done: all.filter(x => d[x.t.id] != null).length, total: all.length}; },
  mock:{paper:"Listening", minutes:40, run:runMock}
});
})();
