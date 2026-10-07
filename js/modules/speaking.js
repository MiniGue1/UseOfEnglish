/* C1 Advanced – Speaking (Paper 4) module: solo practice with a virtual examiner and partner. */
(function(){
"use strict";
const P = window.Portal;
if(!P) return;
const {esc, shuffle, countdown} = P.util;
const ID = "speaking";
const D = () => (window.DATA && window.DATA.speaking) || {p1:[], p2:[], p3:[], p4:[], chunks:{}, lessons:[], criteria:[], rubrics:{}, timing:{}};
const ABORT = {abort:true};
const PARTS = ["part1","part2","part3","part4"];
const LETTERS = ["A","B","C"];

/* ---------------- styles (scoped, injected once) ---------------- */
function injectCSS(){
  if(document.getElementById("spk-css")) return;
  const s = document.createElement("style"); s.id = "spk-css";
  s.textContent = `
.spk h3{font-family:var(--serif);font-weight:500;font-size:20px;margin:18px 0 8px}
.spk .spk-lead{color:var(--muted);font-size:15px;margin:0 0 14px}
.spk-parts{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin:0 0 18px}
.spk-part{appearance:none;text-align:left;font:inherit;color:var(--ink);background:var(--sheet);border:1px solid var(--rule);border-radius:8px;padding:12px 14px;cursor:pointer}
.spk-part:hover{border-color:var(--ink)}
.spk-part b{display:block;font-family:var(--serif);font-weight:500;font-size:18px}
.spk-part span{display:block;font-size:13.5px;color:var(--muted)}
.spk-note{font-size:13.5px;color:var(--muted);border-left:3px solid var(--rule);padding:2px 0 2px 12px;margin:12px 0}
.spk-warn{font-size:14px;border-left:3px solid var(--red);padding:4px 0 4px 12px;margin:10px 0}
.spk-settings{display:grid;gap:10px;margin:8px 0 0}
.spk-settings label{display:flex;gap:10px;align-items:center;font-size:15px}
.spk-settings input[type=checkbox]{width:20px;height:20px}
.spk-studio{display:grid;gap:14px}
.spk-head{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;justify-content:space-between}
.spk-head .spk-tl{display:flex;gap:8px;align-items:center}
.spk-rec{display:none;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--red)}
.spk-rec.on{display:inline-flex}
.spk-rec i{width:10px;height:10px;border-radius:50%;background:var(--red);animation:spkpulse 1s infinite}
@keyframes spkpulse{50%{opacity:.25}}
.spk-now{min-height:64px;border:1px solid var(--rule);border-radius:8px;padding:10px 14px;background:var(--soft)}
.spk-now .who{font-size:12.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);margin:0 0 2px}
.spk-now .say{font-family:var(--serif);font-size:18px;line-height:1.5;margin:0}
.spk-now.you{background:color-mix(in srgb,var(--green) 10%,var(--sheet));border-color:var(--green)}
.spk-now.hidden .say{filter:blur(5px);user-select:none}
.spk-tbar{height:8px;background:var(--soft);border-radius:4px;overflow:hidden;margin:6px 0 0}
.spk-tbar i{display:block;height:100%;width:100%;background:var(--green);transition:width .25s linear}
.spk-tbar i.low{background:var(--red)}
.spk-tlabel{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);margin-top:4px}
.spk-log{font-size:14px;color:var(--muted)}
.spk-log summary{cursor:pointer}
.spk-log p{margin:4px 0}
.spk-log b{color:var(--ink);font-weight:600}
.spk-qs{font-family:var(--serif);font-size:18px;margin:0 0 10px;padding:0 0 0 18px}
.spk-photos{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}
.spk-photo{margin:0;border:2px solid var(--rule);border-radius:8px;overflow:hidden;background:var(--sheet);cursor:pointer;text-align:left;padding:0;font:inherit;color:var(--ink);appearance:none}
.spk-photo[aria-pressed=true]{border-color:var(--green);box-shadow:0 0 0 2px color-mix(in srgb,var(--green) 35%,transparent)}
.spk-photo svg{display:block;width:100%;height:auto}
.spk-photo .cap{display:block;padding:8px 10px 10px;font-size:14px;line-height:1.45}
.spk-photo .cap b{display:inline-block;margin-right:6px;font-size:12px;background:var(--ink);color:var(--paper);border-radius:4px;padding:0 6px}
.spk-map{position:relative;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,auto);gap:12px;padding:6px}
.spk-map svg.lines{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.spk-map svg.lines line{stroke:var(--rule);stroke-width:2;stroke-dasharray:4 4}
.spk-bub{position:relative;appearance:none;font:inherit;font-size:14px;line-height:1.3;color:var(--ink);background:var(--sheet);border:1.5px solid var(--ink);border-radius:18px;padding:10px 8px;min-height:64px;display:flex;align-items:center;justify-content:center;text-align:center;cursor:pointer}
.spk-bub[aria-pressed=true]{background:color-mix(in srgb,var(--green) 16%,var(--sheet));border-color:var(--green)}
.spk-bub[aria-pressed=true]::after{content:"✓";position:absolute;top:2px;right:8px;color:var(--green);font-size:13px}
.spk-center{position:relative;grid-column:2;grid-row:2;font-family:var(--serif);font-size:15.5px;line-height:1.3;text-align:center;background:var(--ink);color:var(--paper);border-radius:12px;padding:12px 10px;display:flex;align-items:center;justify-content:center}
.spk-coach{border:1px solid var(--rule);border-radius:8px;padding:6px 12px 10px}
.spk-coach summary{cursor:pointer;font-weight:600;padding:6px 0}
.spk-coach .grp{margin:6px 0}
.spk-coach .grp b{display:block;font-size:13px;color:var(--muted);font-weight:600}
.spk-coach .grp span{display:inline-block;font-family:var(--serif);font-size:15.5px;background:var(--soft);border-radius:12px;padding:1px 9px;margin:3px 4px 0 0}
.spk-qcard{font-family:var(--serif);font-size:21px;line-height:1.45;border-left:4px solid var(--ink);padding:4px 0 4px 14px}
.spk-builder{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px}
.spk-step{appearance:none;text-align:left;font:inherit;color:var(--ink);background:var(--sheet);border:1.5px solid var(--rule);border-radius:8px;padding:8px 10px;cursor:pointer}
.spk-step b{display:block;font-size:14px}
.spk-step span{display:block;font-family:var(--serif);font-size:14.5px;color:var(--muted)}
.spk-step[aria-pressed=true]{border-color:var(--green);background:color-mix(in srgb,var(--green) 12%,var(--sheet))}
.spk-hint{border:1px dashed var(--rule);border-radius:8px;padding:8px 12px;font-size:14.5px}
.spk-hint summary{cursor:pointer;font-weight:600}
.spk-takes{display:grid;gap:8px;margin:8px 0 14px}
.spk-take{display:grid;gap:4px;border:1px solid var(--rule);border-radius:8px;padding:8px 10px}
.spk-take span{font-size:13.5px;color:var(--muted)}
.spk-take audio{width:100%;height:36px}
.spk-crit{border-top:1px solid var(--rule);padding:10px 0}
.spk-crit .top{display:flex;justify-content:space-between;gap:8px;align-items:baseline;flex-wrap:wrap}
.spk-crit .top b{font-size:15.5px}
.spk-crit .top small{color:var(--muted);font-size:13px}
.spk-crit .chips{margin:8px 0 4px}
.spk-crit .chip{min-width:44px}
.spk-crit .desc{font-size:14px;margin:4px 0 0;min-height:1.4em}
.spk-model{font-family:var(--serif);font-size:17.5px;line-height:1.6;white-space:pre-wrap;background:var(--soft);border-radius:8px;padding:12px 14px;margin:8px 0}
.spk-chunks{list-style:none;padding:0;margin:0;display:grid;gap:6px}
.spk-chunks li{border-bottom:1px solid var(--rule);padding:6px 0}
.spk-chunks li b{font-family:var(--serif);font-weight:600;font-size:17px}
.spk-chunks li span{display:block;font-family:var(--serif);font-style:italic;color:var(--muted);font-size:15.5px}
.spk-list{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}
.spk-list .chip.done::after{content:" ✓";color:var(--green)}
.spk-hist{width:100%;border-collapse:collapse;font-size:14px}
.spk-hist th,.spk-hist td{text-align:left;padding:6px 4px;border-bottom:1px solid var(--rule)}
.spk-hist th{color:var(--muted);font-weight:500}
.spk-big{font-family:var(--serif);font-size:40px;line-height:1.1;margin:0}
@media (max-width:420px){.spk-bub{font-size:12.5px;padding:8px 5px;min-height:58px}.spk-center{font-size:13.5px}.spk-map{gap:8px}}
`;
  document.head.appendChild(s);
}

/* ---------------- persistence ---------------- */
const settings = () => Object.assign({tts:true, rec:true, text:true, name:""}, P.store.get(ID+":settings", {}));
const saveSettings = s => P.store.set(ID+":settings", s);
const doneMap = () => Object.assign({p1:[], p2:[], p3:[], p4:[]}, P.store.get(ID+":done", {}));
function markDone(part, id){
  const m = doneMap(); if(!m[part].includes(id)) m[part].push(id); P.store.set(ID+":done", m);
}
function addHistory(entry){
  const h = P.store.get(ID+":history", []); h.push(entry); P.store.set(ID+":history", h.slice(-200));
}
const learnerName = () => (settings().name || "").trim() || "Candidate A";

function fill(tpl, vars){ return String(tpl || "").replace(/\{(\w+)\}/g, (m, k) => vars[k] != null ? vars[k] : m); }
function baseVars(){
  const c = D().cast || {};
  return {name:learnerName(), partner:c.partner || "Marta", examiner:c.examiner || "Helen Carter", assessor:c.assessor || "David Moss"};
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
const wc = s => String(s).trim().split(/\s+/).filter(Boolean).length;

/* ---------------- recorder (MediaRecorder, in-memory only) ---------------- */
const Rec = {
  supported(){ return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder); },
  stream: null, error: null, urls: [],
  message(e){
    if(!Rec.supported()) return "Tento prohlížeč neumí nahrávat zvuk (chybí MediaRecorder nebo přístup k mikrofonu, případně stránka neběží přes HTTPS). Trénovat můžeš i tak – mluv nahlas podle časovače.";
    const n = e && e.name;
    if(n === "NotAllowedError" || n === "SecurityError" || n === "PermissionDeniedError") return "Přístup k mikrofonu byl zamítnut. Povol ho v nastavení prohlížeče (ikona vedle adresy) a začni znovu. Mezitím můžeš mluvit bez nahrávání.";
    if(n === "NotFoundError" || n === "DevicesNotFoundError") return "Nenašli jsme žádný mikrofon. Připoj ho, nebo trénuj bez nahrávání.";
    if(n === "NotReadableError") return "Mikrofon používá jiná aplikace. Zavři ji a zkus to znovu.";
    return "Mikrofon se nepodařilo spustit" + (n ? " (" + n + ")" : "") + ". Trénovat můžeš i bez nahrávky.";
  },
  async ensure(){
    if(Rec.stream && Rec.stream.active) return Rec.stream;
    if(!Rec.supported()) throw {name:"Unsupported"};
    Rec.stream = await navigator.mediaDevices.getUserMedia({audio:true});
    return Rec.stream;
  },
  release(){
    if(Rec.stream){ try{ Rec.stream.getTracks().forEach(t => t.stop()); }catch(e){} }
    Rec.stream = null;
  },
  /* returns handle {stop(): Promise<take|null>} or null (and sets Rec.error) */
  async start(){
    if(Rec.error) return null;
    try{
      const stream = await Rec.ensure();
      const mr = new MediaRecorder(stream); const chunks = []; const t0 = Date.now();
      mr.ondataavailable = e => { if(e.data && e.data.size) chunks.push(e.data); };
      mr.start();
      return {
        stop(){
          return new Promise(res => {
            if(mr.state === "inactive") return res(null);
            mr.onstop = () => {
              if(!chunks.length) return res(null);
              const blob = new Blob(chunks, {type: mr.mimeType || "audio/webm"});
              const url = URL.createObjectURL(blob); Rec.urls.push(url);
              res({blob, url, dur: Math.round((Date.now() - t0) / 1000)});
            };
            try{ mr.stop(); }catch(e){ res(null); }
          });
        }
      };
    }catch(e){ Rec.error = Rec.message(e); return null; }
  },
  revokeAll(){ Rec.urls.forEach(u => { try{ URL.revokeObjectURL(u); }catch(e){} }); Rec.urls = []; }
};

/* ---------------- SVG 'photo' scenes ---------------- */
const PAL = {
  home:["#F6E7D2","#EBD3B4","#C79F76"], indoor:["#EDE6DA","#D9CCBA","#A88D6E"], kitchen:["#FBEFD9","#F1D9B0","#B98A55"],
  office:["#E4ECF3","#CBD8E4","#8395A8"], classroom:["#EAF1E3","#D3E2C4","#8DA674"], lab:["#E6F4F6","#C9E6EC","#7FA9B3"],
  stage:["#2B1E3F","#5A2E64","#1A1222"], city:["#C9DDF0","#A9C2DC","#7A8696"], street:["#D7E6F4","#B8CFE4","#9097A0"],
  station:["#D9DEE6","#B7C0CD","#6E7684"], park:["#BFE3F7","#A6D8F0","#7FBF6A"], garden:["#C8E8F8","#B0DDF2","#6FAE57"],
  forest:["#BCDDC5","#8FC4A0","#3F7A4F"], field:["#CFE8FA","#F3E3A9","#B9C86A"], mountain:["#B9D6F2","#E7EEF6","#8E9AA8"],
  sea:["#9FD3F2","#5FB2E3","#2C7FB8"], beach:["#A8DCF5","#7CC6EC","#EED9A4"], sky:["#7DB8EC","#BFDDF7","#E6F1FB"],
  night:["#0E1A3A","#24305C","#151B2E"], hospital:["#EAF4F7","#D3E7EE","#9CB9C4"], shop:["#FBEAEA","#F1D3D3","#B79393"],
  market:["#FBE3BF","#F6CF92","#B68A4C"], stadium:["#7FB6E6","#B7D7F1","#4E9A4B"]
};
let svgSeq = 0;
function sceneSVG(pic){
  const pal = PAL[pic.bg] || PAL.indoor; const id = "spkg" + (++svgSeq);
  const props = (pic.p || []).slice(0, 4), figs = (pic.e || []).slice(0, 4);
  const pPos = [[44,52],[272,46],[160,40],[104,96],[220,96]];
  const dark = pic.bg === "night" || pic.bg === "stage";
  let s = `<svg viewBox="0 0 320 200" role="img" aria-hidden="true" focusable="false">
<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pal[0]}"/><stop offset="1" stop-color="${pal[1]}"/></linearGradient></defs>
<rect width="320" height="200" fill="url(#${id})"/>`;
  if(dark) s += `<circle cx="280" cy="30" r="12" fill="#F4F1D0" opacity=".85"/><circle cx="40" cy="22" r="1.6" fill="#fff"/><circle cx="120" cy="36" r="1.2" fill="#fff"/><circle cx="210" cy="18" r="1.4" fill="#fff"/>`;
  s += `<path d="M0 150 Q80 ${pic.bg === "mountain" ? 96 : 138} 160 146 T320 140 V200 H0Z" fill="${pal[2]}" opacity=".9"/>`;
  props.forEach((e, i) => { const [x, y] = pPos[i]; s += `<text x="${x}" y="${y}" font-size="30" text-anchor="middle" dominant-baseline="middle">${esc(e)}</text>`; });
  const n = figs.length; figs.forEach((e, i) => {
    const x = n === 1 ? 160 : 70 + i * (180 / Math.max(1, n - 1));
    s += `<text x="${x}" y="158" font-size="${n > 2 ? 50 : 60}" text-anchor="middle" dominant-baseline="middle">${esc(e)}</text>`;
  });
  return s + `</svg>`;
}
function photosHTML(set, opts){
  opts = opts || {};
  return `<div class="spk-photos">${set.pics.map((p, i) => `
    <button type="button" class="spk-photo" data-i="${i}" aria-pressed="false" aria-label="Obrázek ${LETTERS[i]}: ${esc(p.scene)}">
      ${sceneSVG(p)}<span class="cap"><b>${LETTERS[i]}</b>${esc(p.scene)}</span></button>`).join("")}</div>
    ${opts.pick ? `<p class="spk-note">Klepnutím vyber dvě fotky, které budeš porovnávat (nepovinné – jen pro tebe).</p>` : ""}`;
}
function wirePhotos(root){
  root.querySelectorAll(".spk-photo").forEach(b => b.onclick = () => {
    const on = b.getAttribute("aria-pressed") === "true";
    const sel = root.querySelectorAll('.spk-photo[aria-pressed="true"]');
    if(!on && sel.length >= 2) sel[0].setAttribute("aria-pressed", "false");
    b.setAttribute("aria-pressed", String(!on));
  });
}

/* ---------------- Part 3 mind map + coach ---------------- */
function mapHTML(task){
  const cells = [[1,1],[1,3],[2,1],[2,3],[3,2]];
  const pts = [[16.7,16.7],[83.3,16.7],[16.7,50],[83.3,50],[50,83.3]];
  return `<div class="spk-map">
    <svg class="lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${pts.map(p => `<line x1="50" y1="50" x2="${p[0]}" y2="${p[1]}" vector-effect="non-scaling-stroke"/>`).join("")}</svg>
    <div class="spk-center">${esc(task.central)}</div>
    ${task.prompts.map((p, i) => `<button type="button" class="spk-bub" style="grid-row:${cells[i][0]};grid-column:${cells[i][1]}" aria-pressed="false" title="Označit jako probrané">${esc(p)}</button>`).join("")}
  </div>`;
}
function coachHTML(open){
  const c = D().coach || [];
  return `<details class="spk-coach"${open ? " open" : ""}><summary>Kouč: fráze pro interakci</summary>
    ${c.map(g => `<div class="grp"><b>${esc(g.cz)}</b>${g.items.map(x => `<span>${esc(x)}</span>`).join("")}</div>`).join("")}</details>`;
}
function wireMap(root){ root.querySelectorAll(".spk-bub").forEach(b => b.onclick = () => b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"))); }

/* ---------------- studio: examiner/partner voice, timers, recording ---------------- */
function studio(host, title){
  const st = settings();
  const ctx = {takes:[], skipFn:null, host, aborted:false};
  host.innerHTML = `<div class="spk-studio">
    <div class="spk-head"><span class="badge">${esc(title)}</span><span class="spk-tl"><span class="spk-rec" aria-live="polite"><i></i>REC</span><span class="timer" hidden>00:00</span></span></div>
    <div class="spk-warnbox"></div>
    <div class="spk-visual"></div>
    <div class="spk-now${st.text ? "" : " hidden"}" aria-live="polite"><p class="who">&nbsp;</p><p class="say">&nbsp;</p>
      <div class="spk-tbar" hidden><i></i></div><div class="spk-tlabel" hidden><span class="tl-l"></span><span class="tl-r"></span></div></div>
    <div class="row spk-actions"></div>
    <details class="spk-log"><summary>Přepis toho, co zaznělo</summary><div class="lines"></div></details>
  </div>`;
  const $ = s => host.querySelector(s);
  ctx.el = {visual:$(".spk-visual"), now:$(".spk-now"), who:$(".spk-now .who"), say:$(".spk-now .say"), actions:$(".spk-actions"),
    timer:$(".spk-head .timer"), rec:$(".spk-rec"), log:$(".spk-log .lines"), tbar:$(".spk-tbar"), tbarI:$(".spk-tbar i"),
    tlabel:$(".spk-tlabel"), tlL:$(".tl-l"), tlR:$(".tl-r"), warn:$(".spk-warnbox")};
  ctx.alive = () => !ctx.aborted && host.isConnected;
  ctx.check = () => { if(!ctx.alive()) throw ABORT; };
  /* watchdog: release the microphone when the view is left */
  const wd = setInterval(() => { if(!host.isConnected){ clearInterval(wd); ctx.aborted = true; if(ctx.recH) ctx.recH.stop(); Rec.release(); P.tts.stop(); } }, 700);
  ctx.close = () => { clearInterval(wd); Rec.release(); };
  ctx.visual = html => { ctx.el.visual.innerHTML = html; };
  ctx.actions = btns => {
    ctx.el.actions.innerHTML = "";
    (btns || []).forEach(b => { const x = document.createElement("button"); x.type = "button"; x.className = "btn " + (b.primary ? "primary" : "ghost"); x.textContent = b.label; x.onclick = b.onClick; ctx.el.actions.appendChild(x); });
  };
  ctx.log = (who, text) => { const p = document.createElement("p"); p.innerHTML = `<b>${esc(who)}:</b> ${esc(text)}`; ctx.el.log.appendChild(p); };
  ctx.showWarn = () => { if(Rec.error && settings().rec && !ctx.warned){ ctx.warned = true; ctx.el.warn.innerHTML = `<p class="spk-warn" role="alert">${esc(Rec.error)}</p>`; } };
  ctx.bar = (frac, l, r) => {
    const show = frac != null; ctx.el.tbar.hidden = !show; ctx.el.tlabel.hidden = !show;
    if(!show) return;
    ctx.el.tbarI.style.width = Math.max(0, Math.min(100, frac * 100)) + "%"; ctx.el.tbarI.classList.toggle("low", frac < 0.2);
    ctx.el.tlL.textContent = l || ""; ctx.el.tlR.textContent = r || "";
  };

  /* examiner / partner speaks: TTS if available, always shown as text; resolves on end, skip or timeout */
  ctx.say = (text, who) => {
    ctx.check();
    const cast = D().cast || {}; const s = settings();
    const label = who === "partner" ? (cast.partner || "Marta") + " (partner)" : "Zkoušející";
    ctx.el.now.classList.remove("you"); ctx.el.who.textContent = label; ctx.el.say.textContent = text; ctx.bar(null);
    ctx.log(label, text);
    const useTTS = s.tts && P.tts.supported;
    return new Promise(res => {
      let done = false;
      const fin = () => { if(done) return; done = true; clearTimeout(to); ctx.skipFn = null; res(); };
      const est = 1200 + wc(text) * 430;
      const to = setTimeout(fin, useTTS ? est * 1.8 + 3000 : Math.min(9000, 1500 + wc(text) * 260));
      ctx.skipFn = () => { P.tts.stop(); fin(); };
      ctx.actions([{label:"Přeskočit ▸", onClick: () => ctx.skipFn && ctx.skipFn()}]);
      if(useTTS){
        const v = who === "partner" ? (cast.partnerVoice || 1) : (cast.examinerVoice || 0);
        P.tts.speak(text, {lang:"en-GB", voiceIdx:v, rate: who === "partner" ? 1 : 0.93, pitch: who === "partner" ? 1.08 : 1}).then(fin, fin);
      }
    }).then(() => { ctx.check(); });
  };

  /* silent countdown (preparation / think time) */
  ctx.wait = (seconds, label, sub) => {
    ctx.check();
    ctx.el.now.classList.remove("you"); ctx.el.who.textContent = label; ctx.el.say.textContent = sub || "";
    return ctx.timed(seconds, "Hotovo ▸", null).then(() => ctx.check());
  };

  /* generic timed phase with timer + bar; resolves on time-out or button */
  ctx.timed = (seconds, btnLabel, extraBtns, maxEnd) => new Promise(res => {
    const tEl = ctx.el.timer; tEl.hidden = false;
    const t0 = Date.now(); let done = false;
    const fin = () => { if(done) return; done = true; cd.stop(); clearInterval(iv); ctx.skipFn = null; ctx.bar(null); res((Date.now() - t0) / 1000); };
    const cd = countdown(tEl, seconds, fin);
    const iv = setInterval(() => {
      if(!host.isConnected){ fin(); return; }
      const el = (Date.now() - t0) / 1000;
      ctx.bar(1 - el / seconds, "Zbývá " + Math.max(0, Math.ceil(seconds - el)) + " s", "");
      if(maxEnd && Date.now() >= maxEnd) fin();
    }, 250);
    ctx.bar(1, "Zbývá " + seconds + " s", "");
    ctx.skipFn = fin;
    ctx.actions([{label:btnLabel, primary:true, onClick:fin}].concat(extraBtns || []));
  });

  /* learner answers: optional recording, timer; returns take or null */
  ctx.answer = async (seconds, label, prompt, opts) => {
    ctx.check(); opts = opts || {};
    ctx.el.now.classList.add("you"); ctx.el.who.textContent = "Tvůj čas – " + label; ctx.el.say.textContent = prompt || "Mluv nahlas anglicky.";
    let h = null;
    if(settings().rec){ h = await Rec.start(); ctx.check(); ctx.showWarn(); }
    ctx.recH = h; ctx.el.rec.classList.toggle("on", !!h);
    const used = await ctx.timed(seconds, opts.btn || "Hotovo ▸", opts.extra, opts.maxEnd);
    ctx.el.rec.classList.remove("on"); ctx.recH = null;
    const take = h ? await h.stop() : null;
    ctx.check();
    if(take){ take.label = label; ctx.takes.push(take); }
    return {take, used};
  };
  return ctx;
}

/* ---------------- review: playback, model, self-rating ---------------- */
function takesHTML(takes){
  if(!takes.length) return `<p class="spk-note">Žádná nahrávka (nahrávání vypnuto nebo mikrofon nedostupný). Ohodnoť se podle toho, jak sis odpověď pamatuješ – příště zkus nahrávání zapnout.</p>`;
  return `<div class="spk-takes">${takes.map(t => `<div class="spk-take"><span>${esc(t.label)} · ${t.dur} s</span><audio controls preload="metadata" src="${esc(t.url)}"></audio></div>`).join("")}</div>
    <p class="spk-note">Nahrávky jsou uložené jen v paměti tohoto prohlížeče – nikam se neodesílají a zmizí, jakmile stránku opustíš.</p>`;
}
function ratingHTML(){
  return `<div class="spk-rate">${D().criteria.map(c => `
    <div class="spk-crit" data-c="${esc(c.id)}">
      <div class="top"><b>${esc(c.cz)}</b><small>${esc(c.name)}</small></div>
      <p class="spk-note" style="margin:4px 0">${esc(c.focus)}</p>
      <div class="chips" role="group" aria-label="${esc(c.cz)}">${[0,1,2,3,4,5].map(n => `<button type="button" class="chip" data-v="${n}" aria-pressed="false">${n}</button>`).join("")}</div>
      <p class="desc" aria-live="polite"></p>
    </div>`).join("")}</div>`;
}
function wireRating(root, onChange){
  const scores = {};
  root.querySelectorAll(".spk-crit").forEach(row => {
    const c = D().criteria.find(x => x.id === row.dataset.c);
    row.querySelectorAll(".chip").forEach(b => b.onclick = () => {
      row.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      scores[c.id] = +b.dataset.v; row.querySelector(".desc").textContent = c.bands[+b.dataset.v];
      onChange && onChange(scores);
    });
  });
  return scores;
}
/* full review block; resolves with scores when saved */
function review(host, o){
  return new Promise(res => {
    const sum = s => Object.values(s).reduce((a, b) => a + b, 0);
    host.innerHTML = `<div class="spk-review">
      <h3>Poslech a sebehodnocení</h3>${takesHTML(o.takes)}
      ${o.modelHTML ? `<h3>Vzorová odpověď (vysoké pásmo)</h3>${o.modelHTML}` : ""}
      ${o.extraHTML || ""}
      <h3>Ohodnoť se (0–5)</h3>
      <p class="spk-lead">Poslechni si nahrávku a zvol pásmo podle popisu. Pro C1 (grade C) potřebuješ zhruba 3 v každém kritériu, pro grade A kolem 5.</p>
      ${ratingHTML()}
      <div class="row" style="margin-top:12px"><button type="button" class="btn primary spk-save" disabled>Uložit hodnocení</button>${o.skipLabel ? `<button type="button" class="btn ghost spk-skip">${esc(o.skipLabel)}</button>` : ""}</div>
      <p class="hint" aria-live="polite"></p>
    </div>`;
    const save = host.querySelector(".spk-save");
    const scores = wireRating(host, s => { save.disabled = Object.keys(s).length < 4; host.querySelector(".hint").textContent = Object.keys(s).length < 4 ? "Ohodnoť všechna 4 kritéria." : "Celkem " + sum(s) + "/20"; });
    save.onclick = () => { save.disabled = true; res(Object.assign({}, scores)); };
    const sk = host.querySelector(".spk-skip"); if(sk) sk.onclick = () => res(null);
  });
}
function recordResult(part, setId, scores){
  if(!scores) return;
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  addHistory({t:Date.now(), part, set:setId, s:scores, sum:total});
  P.logActivity(ID, part, total, 20, {set:setId});
}

/* ---------------- practice flows ---------------- */
function abortable(fn){ return fn().catch(e => { if(e !== ABORT) { console.error(e); } }); }

function pickSet(list, part, sub){
  const done = doneMap()[part] || [];
  const fresh = list.filter(x => !done.includes(x.id));
  return (fresh.length ? shuffle(fresh) : shuffle(list))[0];
}

async function runPart1(host, group){
  const R = D().rubrics, T = D().timing, V = baseVars();
  const ctx = studio(host, "Part 1 · Interview · " + group.theme);
  ctx.visual(`<p class="spk-lead">Téma: <b>${esc(group.theme)}</b> (${esc(group.cz)}). Odpovídej 2–4 větami: odpověď → důvod → detail. Zkoušející uvidí otázky až když zazní.</p>`);
  await ctx.say(fill(R.p1Intro, V));
  await ctx.answer(8, "představení", "Řekni své jméno (např. „I'm …“).");
  await ctx.say("I'm " + V.partner + ".", "partner");
  await ctx.say(R.p1Marks);
  await ctx.say(fill(R.p1From, V));
  await ctx.answer(15, "odkud jsi", "Where are you from?");
  await ctx.say(R.p1First);
  for(let i = 0; i < group.questions.length; i++){
    await ctx.say(group.questions[i]);
    await ctx.answer(T.p1Answer || 25, "otázka " + (i + 1), group.questions[i]);
  }
  await ctx.say(R.p1Thanks);
  ctx.close();
  const box = document.createElement("div"); host.appendChild(box);
  ctx.el.actions.innerHTML = ""; ctx.el.timer.hidden = true;
  const scores = await review(box, {takes:ctx.takes,
    modelHTML:`<p><b>${esc(group.questions[0])}</b></p><div class="spk-model">${esc(group.model)}</div>`,
    extraHTML: chunkSample("p1", 6)});
  recordResult("part1", group.id, scores); markDone("p1", group.id);
  afterSave(box, "part1");
}

async function runPart2(host, set, opts){
  opts = opts || {};
  const R = D().rubrics, T = D().timing, V = baseVars();
  const ctx = studio(host, "Part 2 · Long turn · " + set.title);
  const showSet = s => ctx.visual(`<ol class="spk-qs">${s.qs.map(q => `<li>${esc(q)}</li>`).join("")}</ol>${photosHTML(s, {pick:s === set})}`);
  showSet(set); wirePhotos(ctx.el.visual);
  await ctx.say(R.p2Intro);
  await ctx.say(fill(R.p2YouFirst, Object.assign({show:set.show, ask:set.ask}, V)));
  await ctx.answer(T.p2Long || 60, "dlouhý projev (1 min)", "Porovnej DVĚ fotky a odpověz na obě otázky nahoře.");
  await ctx.say(R.p2Thanks);
  await ctx.say(fill(R.p2AskPartner, Object.assign({q:set.partnerQ}, V)));
  await ctx.say(set.partnerAnswer, "partner");
  await ctx.say(R.p2Thanks);
  let other = null;
  if(opts.roleB !== false){
    const choose = await new Promise(res => {
      ctx.el.now.classList.remove("you"); ctx.el.who.textContent = "Volitelně"; ctx.el.say.textContent = "Chceš si vyzkoušet i roli kandidáta B? Partnerka promluví o svých fotkách a ty pak 30 sekund odpovíš na otázku zkoušejícího.";
      ctx.actions([{label:"Ano, role B (30 s)", primary:true, onClick:() => res(true)}, {label:"Ne, k hodnocení", onClick:() => res(false)}]);
    });
    ctx.check();
    if(choose){
      other = shuffle(D().p2.filter(x => x.id !== set.id))[0];
      showSet(other);
      await ctx.say(fill(R.p2PartnerTurn, Object.assign({show:other.show, ask:other.ask}, V)));
      await ctx.say(other.model, "partner");
      await ctx.say(R.p2Thanks);
      await ctx.say(fill(R.p2AskYou, Object.assign({q:other.partnerQ}, V)));
      await ctx.answer(T.p2Short || 30, "krátká odpověď (30 s)", other.partnerQ);
      await ctx.say(R.p2Thanks);
    }
  }
  ctx.close();
  ctx.el.actions.innerHTML = ""; ctx.el.timer.hidden = true;
  showSet(set);
  const box = document.createElement("div"); host.appendChild(box);
  const mp = set.modelPics.map(i => LETTERS[i]).join(" + ");
  const scores = await review(box, {takes:ctx.takes,
    modelHTML:`<p class="spk-note">Porovnání fotek ${mp} · ${wc(set.model)} slov (≈ 1 minuta)</p><div class="spk-model">${esc(set.model)}</div>
      <p class="spk-note"><b>Odpověď partnera na „${esc(set.partnerQ)}“</b> (≈ 30 s): ${esc(set.partnerAnswer)}</p>`,
    extraHTML: `<details class="spk-hint"><summary>Kontrolní otázky k tvé odpovědi</summary><ul>
      <li>Porovnával(a) jsem, nebo jen popisoval(a) jednotlivé fotky?</li><li>Odpověděl(a) jsem na OBĚ otázky?</li>
      <li>Spekuloval(a) jsem (might, could, it looks as if…)?</li><li>Vešel/vešla jsem se do minuty a nezůstalo hluché místo?</li></ul></details>` + chunkSample("p2", 6)});
  recordResult("part2", set.id, scores); markDone("p2", set.id);
  afterSave(box, "part2");
}

/* Part 3 discussion: turn-taking with the virtual partner until phase time runs out */
async function discussPhase(ctx, seconds, lines, label, turnMax){
  const end = Date.now() + seconds * 1000;
  const generic = shuffle(D().partnerGeneric || []);
  let li = 0, gi = 0, n = 0;
  const tEl = ctx.el.timer;
  while(Date.now() < end - 1500){
    ctx.check();
    const left = Math.ceil((end - Date.now()) / 1000);
    n++;
    await ctx.answer(Math.min(turnMax, left), label + " · tvůj tah " + n,
      "Reaguj na partnerku, rozviň myšlenku, pak jí předej slovo.", {btn:"Předat slovo partnerce ▸", maxEnd:end});
    if(Date.now() >= end - 2500) break;
    const line = li < lines.length ? lines[li++] : generic[gi++ % Math.max(1, generic.length)];
    if(line) await ctx.say(line, "partner");
    const remain = Math.max(0, Math.ceil((end - Date.now()) / 1000));
    tEl.textContent = String(Math.floor(remain / 60)).padStart(2, "0") + ":" + String(remain % 60).padStart(2, "0");
  }
}
async function runPart3(host, task, opts){
  opts = opts || {};
  const R = D().rubrics, T = D().timing, V = baseVars();
  const ctx = studio(host, "Part 3 · Collaborative task · " + task.title);
  ctx.visual(mapHTML(task) + coachHTML(true));
  wireMap(ctx.el.visual);
  await ctx.say(fill(R.p3Intro, Object.assign({topic:task.topic}, V)));
  await ctx.wait(T.p3Look || 15, "Čas na prohlédnutí úkolu (15 s)", "Prohlédni si otázku a pět podnětů. Klepnutím si podnět označíš jako probraný.");
  await ctx.say(fill(R.p3Start, Object.assign({central:task.say}, V)));
  await discussPhase(ctx, T.p3Discuss || 120, task.partnerLines, "diskuse 2 min", T.p3Turn || 30);
  await ctx.say(fill(R.p3Decide, Object.assign({decision:task.decision}, V)));
  await discussPhase(ctx, T.p3Decide || 60, task.decideLines || [], "rozhodnutí 1 min", 25);
  await ctx.say(R.p3Thanks);
  ctx.close();
  ctx.el.actions.innerHTML = ""; ctx.el.timer.hidden = true;
  if(opts.inMock) return ctx;
  const box = document.createElement("div"); host.appendChild(box);
  const scores = await review(box, {takes:ctx.takes,
    modelHTML:`<p class="spk-note">Ukázka části diskuse – všimni si, jak se mluvčí navzájem zvou, navazují a nesouhlasí.</p><div class="spk-model">${esc(task.model)}</div>`,
    extraHTML:`<details class="spk-hint"><summary>Kontrolní otázky</summary><ul><li>Zval(a) jsem partnerku do diskuse (What do you think…?)</li>
      <li>Navazoval(a) jsem na její myšlenky, ne jen na své?</li><li>Ve fázi rozhodnutí jsme vyjednávali a shrnuli výsledek?</li>
      <li>Nevadí, pokud jsme neprobrali všech pět podnětů.</li></ul></details>`});
  recordResult("part3", task.id, scores); markDone("p3", task.id);
  afterSave(box, "part3", () => {
    const p4 = D().p4.find(s => s.p3 === task.id);
    return p4 ? {label:"Pokračovat na Part 4 k tomuto tématu", go:() => startPart4(host.closest(".spk") || host, p4)} : null;
  });
}

function builderHTML(){
  return `<div class="spk-builder">${(D().builder || []).map((b, i) => `<button type="button" class="spk-step" aria-pressed="false" data-i="${i}"><b>${i + 1}. ${esc(b.step)} · ${esc(b.en)}</b><span>${esc(b.starters[0])}</span></button>`).join("")}</div>
    <p class="spk-note">Stavitel odpovědi: během mluvení si odklikej kroky, které už máš.</p>`;
}
async function runPart4(host, set, opts){
  opts = opts || {};
  const R = D().rubrics, T = D().timing;
  const p3 = D().p3.find(t => t.id === set.p3) || {title:""};
  const items = opts.limit ? set.items.slice(0, opts.limit) : set.items;
  const ctx = studio(host, "Part 4 · Discussion · " + p3.title);
  await ctx.say(R.p4Intro);
  for(let i = 0; i < items.length; i++){
    const it = items[i];
    ctx.visual(`<p class="spk-note">Otázka ${i + 1} / ${items.length}</p><div class="spk-qcard">${esc(it.q)}</div>
      <div style="margin-top:12px">${builderHTML()}</div>
      <details class="spk-hint" style="margin-top:10px"><summary>Nápověda: osnova a fráze</summary><p>${esc(it.outline)}</p><p><i>${it.phrases.map(esc).join(" · ")}</i></p></details>`);
    ctx.el.visual.querySelectorAll(".spk-step").forEach(b => b.onclick = () => b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true")));
    await ctx.say(it.q);
    await ctx.wait(T.p4Think || 5, "Přemýšlej (5 s)", "Názor → důvod → příklad → protiargument.");
    await ctx.answer(opts.answer || T.p4Answer || 50, "otázka " + (i + 1), it.q);
    if(i < items.length - 1 && !opts.inMock && i % 2 === 1){
      const pr = D().rubrics.p4Prompts || [];
      await ctx.say(pr[i % pr.length] ? (baseVars().partner + ", " + pr[i % pr.length].charAt(0).toLowerCase() + pr[i % pr.length].slice(1)) : "Thank you.");
      await ctx.say(shuffle(D().partnerGeneric || ["I'd agree with that, to some extent."])[0], "partner");
    }
  }
  await ctx.say(opts.inMock ? R.end : "Thank you.");
  ctx.close();
  ctx.el.actions.innerHTML = ""; ctx.el.timer.hidden = true;
  if(opts.inMock) return ctx;
  const box = document.createElement("div"); host.appendChild(box);
  const scores = await review(box, {takes:ctx.takes,
    modelHTML:`<p><b>${esc(set.items[0].q)}</b></p><div class="spk-model">${esc(set.model)}</div>`,
    extraHTML:`<h3>Osnovy odpovědí</h3><ol>${set.items.map(it => `<li><b>${esc(it.q)}</b><br><span class="spk-note" style="display:block;border:0;padding:0;margin:2px 0 8px">${esc(it.outline)}<br><i>${it.phrases.map(esc).join(" · ")}</i></span></li>`).join("")}</ol>` + chunkSample("p4", 6)});
  recordResult("part4", set.id, scores); markDone("p4", set.id);
  afterSave(box, "part4");
}

function chunkSample(part, n){
  const ch = shuffle((D().chunks || {})[part] || []).slice(0, n);
  if(!ch.length) return "";
  return `<details class="spk-hint" style="margin-top:10px"><summary>Fráze, které se hodí (${ch.length})</summary><ul class="spk-chunks">${ch.map(c => `<li><b>${esc(c[0])}</b><span>${esc(c[1])}</span></li>`).join("")}</ul></details>`;
}
function afterSave(box, sub, extra){
  const x = extra && extra();
  box.innerHTML = `<div class="fb" role="status"><p class="verdict">Uloženo.</p><p class="why">Hodnocení najdeš v přehledu. Zkus další sadu – nejlépe ještě dnes, dokud máš v hlavě, co zlepšit.</p></div>
    <div class="row"><button type="button" class="btn primary spk-next">Další sada</button>${x ? `<button type="button" class="btn ghost spk-x">${esc(x.label)}</button>` : ""}<button type="button" class="btn ghost spk-home">Přehled Speaking</button></div>`;
  box.querySelector(".spk-next").onclick = () => { P.show(ID, true); window.scrollTo(0, 0); };
  box.querySelector(".spk-home").onclick = () => P.go(ID);
  if(x) box.querySelector(".spk-x").onclick = x.go;
}

/* ---------------- full mock test (≈ 15 min) ---------------- */
async function runMock(stage, finish){
  injectCSS(); Rec.revokeAll(); Rec.error = null;
  const R = D().rubrics, T = D().timing, V = baseVars();
  stage.innerHTML = `<section class="sheet spk"><div class="spk-mock-host"></div></section>`;
  const host = stage.querySelector(".spk-mock-host");
  /* intro screen */
  await new Promise(res => {
    host.innerHTML = `<h3 style="margin-top:0">Speaking – celý test (asi 15 minut)</h3>
      <p class="spk-lead">Virtuální zkoušející a partnerka tě provedou všemi čtyřmi částmi v reálném čase: Part 1 (2 min), Part 2 (4 min), Part 3 (4 min), Part 4 (5 min). Na konci si nahrávky poslechneš a ohodnotíš se podle 4 kritérií.</p>
      ${settingsHTML()}
      <p class="spk-note">Nahrávky zůstávají jen v paměti prohlížeče a nikam se neodesílají. Bez mikrofonu nebo hlasu test proběhne také – text se zobrazí na obrazovce.</p>
      <div class="row"><button type="button" class="btn primary spk-go">Začít test</button></div>`;
    wireSettings(host);
    host.querySelector(".spk-go").onclick = res;
  });
  const p1 = shuffle(D().p1)[0], sets = shuffle(D().p2).slice(0, 2), task = shuffle(D().p3)[0];
  const p4 = D().p4.find(s => s.p3 === task.id) || shuffle(D().p4)[0];
  const ctx = studio(host, "Celý test");
  /* Part 1 */
  ctx.el.head = host.querySelector(".spk-head .badge");
  ctx.el.head.textContent = "Part 1 · Interview";
  ctx.visual(`<p class="spk-lead">Part 1 – rozhovor se zkoušejícím (asi 2 minuty).</p>`);
  await ctx.say(fill(R.p1Intro, V));
  await ctx.answer(8, "P1 představení", "Řekni své jméno.");
  await ctx.say("I'm " + V.partner + ".", "partner");
  await ctx.say(fill(R.p1From, V));
  await ctx.answer(15, "P1 odkud jsi", "Where are you from?");
  await ctx.say(R.p1First);
  for(const q of p1.questions.slice(0, 3)){ await ctx.say(q); await ctx.answer(T.p1Answer || 25, "P1 " + p1.theme, q); }
  await ctx.say(R.p1Thanks);
  P.logActivity(ID, "mock-part1", 1, 1);
  /* Part 2 */
  ctx.el.head.textContent = "Part 2 · Long turn";
  const show = s => ctx.visual(`<ol class="spk-qs">${s.qs.map(q => `<li>${esc(q)}</li>`).join("")}</ol>${photosHTML(s, {pick:true})}`);
  show(sets[0]); wirePhotos(ctx.el.visual);
  await ctx.say(R.p2Intro);
  await ctx.say(fill(R.p2YouFirst, Object.assign({show:sets[0].show, ask:sets[0].ask}, V)));
  await ctx.answer(T.p2Long || 60, "P2 dlouhý projev", "Porovnej dvě fotky, odpověz na obě otázky.");
  await ctx.say(R.p2Thanks);
  await ctx.say(fill(R.p2AskPartner, Object.assign({q:sets[0].partnerQ}, V)));
  await ctx.say(sets[0].partnerAnswer, "partner");
  await ctx.say(R.p2Thanks);
  show(sets[1]); wirePhotos(ctx.el.visual);
  await ctx.say(fill(R.p2PartnerTurn, Object.assign({show:sets[1].show, ask:sets[1].ask}, V)));
  await ctx.say(sets[1].model, "partner");
  await ctx.say(R.p2Thanks);
  await ctx.say(fill(R.p2AskYou, Object.assign({q:sets[1].partnerQ}, V)));
  await ctx.answer(T.p2Short || 30, "P2 krátká odpověď", sets[1].partnerQ);
  await ctx.say(R.p2Thanks);
  P.logActivity(ID, "mock-part2", 1, 1);
  /* Part 3 */
  ctx.el.head.textContent = "Part 3 · Collaborative task";
  ctx.visual(mapHTML(task) + coachHTML(false)); wireMap(ctx.el.visual);
  await ctx.say(fill(R.p3Intro, Object.assign({topic:task.topic}, V)));
  await ctx.wait(T.p3Look || 15, "Čas na prohlédnutí úkolu (15 s)", "");
  await ctx.say(fill(R.p3Start, Object.assign({central:task.say}, V)));
  await discussPhase(ctx, T.p3Discuss || 120, task.partnerLines, "P3 diskuse", T.p3Turn || 30);
  await ctx.say(fill(R.p3Decide, Object.assign({decision:task.decision}, V)));
  await discussPhase(ctx, T.p3Decide || 60, task.decideLines || [], "P3 rozhodnutí", 25);
  await ctx.say(R.p3Thanks);
  P.logActivity(ID, "mock-part3", 1, 1);
  /* Part 4 */
  ctx.el.head.textContent = "Part 4 · Discussion";
  await ctx.say(R.p4Intro);
  const qs = p4.items.slice(0, 4);
  for(let i = 0; i < qs.length; i++){
    ctx.visual(`<p class="spk-note">Otázka ${i + 1} / ${qs.length}</p><div class="spk-qcard">${esc(qs[i].q)}</div><div style="margin-top:12px">${builderHTML()}</div>`);
    ctx.el.visual.querySelectorAll(".spk-step").forEach(b => b.onclick = () => b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true")));
    await ctx.say(qs[i].q);
    await ctx.wait(T.p4Think || 5, "Přemýšlej (5 s)", "");
    await ctx.answer(T.p4Answer || 50, "P4 otázka " + (i + 1), qs[i].q);
    if(i === 1){ await ctx.say(V.partner + ", do you agree?"); await ctx.say(shuffle(D().partnerGeneric)[0], "partner"); }
  }
  await ctx.say(R.end);
  P.logActivity(ID, "mock-part4", 1, 1);
  ctx.close(); ctx.el.actions.innerHTML = ""; ctx.el.timer.hidden = true;
  /* self-assessment */
  const box = document.createElement("div"); host.appendChild(box);
  const scores = await review(box, {takes:ctx.takes,
    modelHTML:`<p class="spk-note">Part 2 – vzor k tvým fotkám:</p><div class="spk-model">${esc(sets[0].model)}</div><p class="spk-note">Part 3 – ukázka interakce:</p><div class="spk-model">${esc(task.model)}</div>`});
  const sum = Object.values(scores || {}).reduce((a, b) => a + b, 0);
  const selfScore = Math.round(sum / 20 * 100);
  addHistory({t:Date.now(), part:"mock", set:[p1.id, sets[0].id, sets[1].id, task.id, p4.id].join(","), s:scores, sum});
  P.logActivity(ID, "mock", sum, 20);
  finish({selfScore, details:{scores, sets:{p1:p1.id, p2:[sets[0].id, sets[1].id], p3:task.id, p4:p4.id}}});
}

/* ---------------- pages ---------------- */
function settingsHTML(){
  const s = settings();
  return `<div class="spk-settings">
    <label><input type="checkbox" data-k="tts"${s.tts ? " checked" : ""}> Hlas zkoušejícího (text-to-speech)${P.tts.supported ? "" : " – v tomto prohlížeči nedostupný"}</label>
    <label><input type="checkbox" data-k="rec"${s.rec ? " checked" : ""}> Nahrávat mé odpovědi (mikrofon)${Rec.supported() ? "" : " – v tomto prohlížeči nedostupné"}</label>
    <label><input type="checkbox" data-k="text"${s.text ? " checked" : ""}> Zobrazovat text otázek (vypni pro trénink poslechu)</label>
    <label>Tvé jméno (osloví tě zkoušející): <input class="field" style="max-width:200px;padding:6px 10px" data-k="name" value="${esc(s.name)}" maxlength="30" placeholder="Candidate A"></label>
  </div>`;
}
function wireSettings(root){
  root.querySelectorAll(".spk-settings [data-k]").forEach(inp => {
    const upd = () => { const s = settings(); s[inp.dataset.k] = inp.type === "checkbox" ? inp.checked : inp.value.slice(0, 30); saveSettings(s); };
    inp.onchange = upd; if(inp.type !== "checkbox") inp.oninput = upd;
  });
}

const TABS = [["", "Přehled"], ["part1", "Part 1"], ["part2", "Part 2"], ["part3", "Part 3"], ["part4", "Part 4"], ["lessons", "Lekce"], ["phrases", "Fráze"], ["test", "Celý test"]];
function frame(stage, sub){
  stage.innerHTML = `<section class="spk">
    <div class="sub-tabs" role="tablist" aria-label="Speaking">${TABS.map(([k, l]) => `<button class="tab" role="tab" data-k="${k}" aria-selected="${(sub || "") === k}">${l}</button>`).join("")}</div>
    <div class="spk-body"></div></section>`;
  stage.querySelectorAll(".sub-tabs .tab").forEach(b => b.onclick = () => P.go(ID, b.dataset.k || ""));
  return stage.querySelector(".spk-body");
}

function avgScores(h){
  const c = {gv:[], dm:[], pr:[], ic:[]};
  h.forEach(e => e.s && Object.keys(c).forEach(k => typeof e.s[k] === "number" && c[k].push(e.s[k])));
  const out = {}; Object.keys(c).forEach(k => out[k] = c[k].length ? c[k].reduce((a, b) => a + b, 0) / c[k].length : null);
  return out;
}
function pageHome(body){
  const d = D(), dm = doneMap(), h = P.store.get(ID+":history", []);
  const av = avgScores(h.slice(-20));
  const weak = Object.entries(av).filter(([, v]) => v != null).sort((a, b) => a[1] - b[1])[0];
  const crit = id => d.criteria.find(c => c.id === id) || {cz:id};
  const tipFor = {gv:"Zkus v další odpovědi vědomě použít 2–3 fráze z karty Fráze a jednu podmínkovou větu.", dm:"Stav odpovědi podle schématu názor → důvod → příklad → protiargument (stavitel v Part 4).", pr:"Projdi lekci o výslovnosti: slovní přízvuk mimo první slabiku a vázání slov.", ic:"V Part 3 zvi partnerku a navazuj na ni – použij panel Kouč."};
  body.innerHTML = `
    <div class="sheet">
      <p class="spk-lead" style="margin-top:0">Ústní zkouška C1 Advanced se skládá ve dvojici a trvá 15 minut. Tady trénuješ sám/sama s virtuálním zkoušejícím a partnerkou – se skutečnými instrukcemi, časy a nahráváním.</p>
      <div class="spk-parts">${d.overview.map((o, i) => `<button type="button" class="spk-part" data-p="part${o.part}"><b>${esc(o.name)}</b><span>${esc(o.time)}</span><span>Hotovo: ${dm["p" + o.part].length} / ${d["p" + o.part].length}</span></button>`).join("")}</div>
      <div class="row"><button type="button" class="btn primary spk-mock">Celý test (15 min)</button><button type="button" class="btn ghost spk-les">Lekce: co se hodnotí</button></div>
    </div>
    <h2>Nastavení</h2><div class="sheet">${settingsHTML()}
      <p class="spk-note">Nahrávky se ukládají jen do paměti tohoto prohlížeče (nikam se neodesílají) a smažou se, jakmile stránku opustíš. Ukládá se pouze tvé sebehodnocení.</p></div>
    <h2>Tvůj pokrok</h2>
    <div class="grid">${d.criteria.map(c => `<div class="stat"><b>${av[c.id] == null ? "–" : av[c.id].toFixed(1)}</b><span>${esc(c.cz)} (průměr, 0–5)</span></div>`).join("")}</div>
    ${weak ? `<div class="fb bad"><p class="verdict">Slabé místo: ${esc(crit(weak[0]).cz)}</p><p class="why">${esc(tipFor[weak[0]])}</p></div>` : `<p class="spk-note">Zatím žádné hodnocení. Začni třeba Part 2 – nejvíc prozradí o tvé plynulosti.</p>`}
    ${h.length ? `<table class="spk-hist"><thead><tr><th>Datum</th><th>Část</th><th>GV/DM/P/IC</th><th>Σ /20</th></tr></thead><tbody>${h.slice(-10).reverse().map(e => `<tr><td>${esc(new Date(e.t).toLocaleDateString("cs-CZ"))}</td><td>${esc(e.part)}</td><td>${e.s ? ["gv","dm","pr","ic"].map(k => e.s[k]).join(" / ") : "–"}</td><td>${e.sum}</td></tr>`).join("")}</tbody></table>` : ""}`;
  body.querySelectorAll(".spk-part").forEach(b => b.onclick = () => P.go(ID, b.dataset.p));
  body.querySelector(".spk-mock").onclick = () => P.go(ID, "test");
  body.querySelector(".spk-les").onclick = () => P.go(ID, "lessons");
  wireSettings(body);
}

function pagePicker(body, part){
  const d = D(); const n = +part.slice(-1); const list = d["p" + n] || []; const done = doneMap()["p" + n] || [];
  const ov = d.overview[n - 1];
  const label = x => n === 1 ? x.theme : n === 4 ? ((d.p3.find(t => t.id === x.p3) || {}).title || x.id) : x.title;
  body.innerHTML = `<div class="sheet">
      <h3 style="margin-top:0">${esc(ov.name)} <span class="badge">${esc(ov.time)}</span></h3>
      <p class="spk-lead">${esc(ov.what)}</p>
      <div class="fb"><p class="why"><b>Tip:</b> ${esc(ov.tip)}</p></div>
      <div class="row" style="margin:0 0 14px"><button type="button" class="btn primary spk-rand">Začít náhodnou sadu</button></div>
      <p class="spk-note" style="border:0;padding:0">Nebo si vyber téma (✓ = už procvičeno):</p>
      <div class="spk-list">${list.map(x => `<button type="button" class="chip${done.includes(x.id) ? " done" : ""}" data-id="${esc(x.id)}">${esc(label(x))}</button>`).join("")}</div>
      ${!P.tts.supported ? `<p class="spk-warn">Prohlížeč nepodporuje hlasový výstup – otázky zkoušejícího se zobrazí jako text.</p>` : ""}
      ${!Rec.supported() ? `<p class="spk-warn">${esc(Rec.message())}</p>` : ""}
    </div><div class="sheet spk-run" style="margin-top:14px" hidden></div>`;
  const start = item => {
    const run = body.querySelector(".spk-run"); run.hidden = false;
    body.firstElementChild.hidden = true; Rec.revokeAll(); Rec.error = null;
    window.scrollTo(0, 0);
    const fn = {1:runPart1, 2:runPart2, 3:runPart3, 4:runPart4}[n];
    abortable(() => fn(run, item));
  };
  body.querySelector(".spk-rand").onclick = () => start(pickSet(list, "p" + n));
  body.querySelectorAll(".spk-list .chip").forEach(b => b.onclick = () => start(list.find(x => x.id === b.dataset.id)));
}
function startPart4(root, set){
  const run = root.querySelector(".spk-run") || root;
  const pick = root.querySelector(".spk-body > .sheet:not(.spk-run)"); if(pick) pick.hidden = true;
  run.hidden = false; window.scrollTo(0, 0);
  abortable(() => runPart4(run, set));
}

function pageLessons(body){
  const d = D();
  body.innerHTML = `<div class="sheet cheat">
    <h3 style="margin-top:0">Formát zkoušky</h3>
    ${d.overview.map(o => `<p><b>${esc(o.name)}</b> <span class="badge">${esc(o.time)}</span><br>${esc(o.what)}</p>`).join("")}
    ${d.lessons.map((l, i) => `<details${i === 0 ? " open" : ""}><summary>${esc(l.title)}</summary><div class="body"><ul>${l.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul></div></details>`).join("")}
    <details><summary>Hodnoticí kritéria a pásma 0–5</summary><div class="body">${d.criteria.map(c => `<p><b>${esc(c.cz)}</b> (${esc(c.name)}) – ${esc(c.focus)}</p><ul>${c.bands.map(b => `<li>${esc(b)}</li>`).join("")}</ul>`).join("")}</div></details>
    <details><summary>Stavitel odpovědi (Part 4)</summary><div class="body"><ol>${d.builder.map(b => `<li><b>${esc(b.step)} (${esc(b.en)})</b>: <em>${b.starters.map(esc).join(" / ")}</em></li>`).join("")}</ol></div></details>
  </div>`;
}
function pagePhrases(body){
  const d = D(); const names = {p1:"Part 1 – rozhovor", p2:"Part 2 – porovnání a spekulace", p3:"Part 3 – interakce", p4:"Part 4 – diskuse"};
  const key = P.store.get(ID+":phrasetab", "p1");
  body.innerHTML = `<div class="sheet">
    <div class="chips" role="group" aria-label="Část">${Object.keys(names).map(k => `<button type="button" class="chip" data-k="${k}" aria-pressed="${k === key}">${k.toUpperCase().replace("P", "Part ")}</button>`).join("")}</div>
    <div class="spk-ph"></div></div>`;
  const show = k => {
    P.store.set(ID+":phrasetab", k);
    body.querySelectorAll(".chips .chip").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.k === k)));
    const ch = d.chunks[k] || [];
    body.querySelector(".spk-ph").innerHTML = `<h3 style="margin-top:0">${esc(names[k])} <span class="badge">${ch.length}</span></h3>
      <p class="spk-lead">Klepni na větu a uslyšíš ji (pokud prohlížeč umí hlas). Nauč se je jako celky – ne slovo od slova.</p>
      <ul class="spk-chunks">${ch.map((c, i) => `<li><b>${esc(c[0])}</b><span><button type="button" class="link-btn" data-i="${i}" aria-label="Přehrát">▶</button> ${esc(c[1])}</span></li>`).join("")}</ul>`;
    body.querySelectorAll(".spk-ph .link-btn").forEach(b => b.onclick = () => { P.tts.stop(); P.tts.speak(ch[+b.dataset.i][1], {lang:"en-GB"}); });
  };
  body.querySelectorAll(".chips .chip").forEach(b => b.onclick = () => show(b.dataset.k));
  show(key);
}
function pageTest(body){
  abortable(() => runMock(body, res => {
    const box = document.createElement("div"); box.className = "sheet"; box.style.marginTop = "14px";
    box.innerHTML = `<p class="spk-big">${res.selfScore} %</p><p class="spk-lead">Tvé sebehodnocení celého testu. ${res.selfScore >= 60 ? "Odpovídá zhruba úrovni C1." : "Zatím spíš pod úrovní C1 – zaměř se na slabé kritérium v přehledu."} (Orientační, vychází jen z tvého vlastního hodnocení.)</p>
      <div class="row"><button type="button" class="btn primary">Přehled Speaking</button></div>`;
    box.querySelector(".btn").onclick = () => P.go(ID);
    body.appendChild(box); box.scrollIntoView({behavior:"smooth", block:"start"});
  }));
}

P.register({
  id: ID, title: "Speaking", short: "Speaking",
  blurb: "Ústní zkouška: virtuální zkoušející a partner, nahrávání, sebehodnocení",
  render(stage, ctx){
    injectCSS(); Rec.release();
    const sub = ctx && ctx.sub || "";
    const body = frame(stage, TABS.some(t => t[0] === sub) ? sub : "");
    if(PARTS.includes(sub)) pagePicker(body, sub);
    else if(sub === "lessons") pageLessons(body);
    else if(sub === "phrases") pagePhrases(body);
    else if(sub === "test") pageTest(body);
    else pageHome(body);
  },
  progress(){
    const d = D(), m = doneMap();
    return {done: m.p1.length + m.p2.length + m.p3.length + m.p4.length, total: d.p1.length + d.p2.length + d.p3.length + d.p4.length};
  },
  mock: {
    paper: "Speaking", minutes: 15,
    run(stage, finish){ abortable(() => runMock(stage, finish)); }
  }
});
})();
