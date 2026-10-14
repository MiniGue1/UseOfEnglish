/* B2 First – Speaking (Paper 4) module: solo practice with a virtual interlocutor and partner.
   14 minutes, 4 parts: interview, two-photo long turn, collaborative task, discussion. Data: b2/js/data/speaking.js */
(function(){
"use strict";
const P = window.Portal;
if(!P) return;
const {esc, shuffle, countdown} = P.util;
const ID = "speaking";
const EMPTY = {p1:[], p2:[], p3:[], p4:[], phrases:[], lessons:[], mistakes:[], criteria:[], rubrics:{}, timing:{}, overview:[], builder:[], p2builder:[], partnerGeneric:[], partnerP4:[], cast:{}};
const D = () => (window.DATA && window.DATA.speaking) || EMPTY;
const ABORT = {abort:true};
const PARTS = ["part1","part2","part3","part4"];
const LETTERS = ["A","B"];
const maxSum = () => D().criteria.length * 5;          /* 5 criteria × 0–5 = 25 */
const PH_P2 = ["compare","speculate"], PH_P3 = ["ask","agree","disagree","suggest","decide"];

/* ---------------- styles (scoped, injected once) ---------------- */
function injectCSS(){
  if(document.getElementById("b2spk-css")) return;
  const s = document.createElement("style"); s.id = "b2spk-css";
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
.spk-settings input[type=checkbox]{width:20px;height:20px;flex:none}
.spk-settings label:has([data-k="name"]){flex-wrap:wrap}
.spk-studio{display:grid;gap:14px}
.spk-head{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;justify-content:space-between}
.spk-head .spk-tl{display:flex;gap:8px;align-items:center}
.spk-rec{display:none;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--red)}
.spk-rec.on{display:inline-flex}
.spk-rec i{width:10px;height:10px;border-radius:50%;background:var(--red);animation:b2spkpulse 1s infinite}
@keyframes b2spkpulse{50%{opacity:.25}}
.spk-now{min-height:64px;border:1px solid var(--rule);border-radius:8px;padding:10px 14px;background:var(--soft)}
.spk-now .who{font-size:12.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);margin:0 0 2px}
.spk-now .say{font-family:var(--serif);font-size:18px;line-height:1.5;margin:0}
.spk-now.you{background:color-mix(in srgb,var(--green) 10%,var(--sheet));border-color:var(--green)}
.spk-now.hidden .say{filter:blur(5px);user-select:none}
.spk-now.you.hidden .say{filter:none}
.spk-tbar{height:8px;background:var(--soft);border-radius:4px;overflow:hidden;margin:6px 0 0}
.spk-tbar i{display:block;height:100%;width:100%;background:var(--green);transition:width .25s linear}
.spk-tbar i.low{background:var(--red)}
.spk-tlabel{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);margin-top:4px}
.spk-log{font-size:14px;color:var(--muted)}
.spk-log summary{cursor:pointer}
.spk-log p{margin:4px 0}
.spk-log b{color:var(--ink);font-weight:600}
.spk-pq{font-family:var(--serif);font-size:19px;line-height:1.4;text-align:center;margin:0 0 10px;padding:8px 12px;border:1.5px solid var(--ink);border-radius:8px;background:var(--sheet)}
.spk-photos{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.spk-photo{margin:0;border:1.5px solid var(--rule);border-radius:8px;overflow:hidden;background:var(--sheet)}
.spk-photo svg{display:block;width:100%;height:auto}
.spk-photo figcaption{padding:8px 10px 10px;font-size:14px;line-height:1.45}
.spk-photo figcaption b{display:inline-block;margin-right:6px;font-size:12px;background:var(--ink);color:var(--paper);border-radius:4px;padding:0 6px}
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
.spk-mis{display:grid;gap:8px;margin:8px 0 0}
.spk-mis .card-m{border:1px solid var(--rule);border-radius:8px;padding:8px 12px}
.spk-mis .w{font-family:var(--serif);font-size:17px;margin:0;text-decoration:line-through;text-decoration-color:var(--red)}
.spk-mis .r{font-family:var(--serif);font-size:17px;margin:4px 0 0;color:var(--green)}
.spk-mis .y{font-size:14px;margin:2px 0 0;color:var(--muted)}
.spk-mis .link-btn{margin-top:4px}
@media (max-width:420px){.spk-bub{font-size:12.5px;padding:8px 5px;min-height:58px}.spk-center{font-size:13.5px}.spk-map{gap:8px}.spk-pq{font-size:17px}}
`;
  document.head.appendChild(s);
}

/* ---------------- persistence (Portal.store → "b2:" prefix on the B2 page) ---------------- */
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
function baseVars(extra){
  const c = D().cast || {};
  return Object.assign({name:learnerName(), partner:c.partner || "Petra", examiner:c.examiner || "Anna Brooks", assessor:c.assessor || "James Hill"}, extra || {});
}
const lcFirst = s => /^I\b/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1);
const wc = s => String(s).trim().split(/\s+/).filter(Boolean).length;
const sumOf = s => Object.values(s || {}).reduce((a, b) => a + b, 0);
/* self-assessment → marks out of 60 → Cambridge English Scale (B2 First conversion from core) */
function estimate(sum){
  const pct = Math.round(100 * sum / maxSum());
  const raw60 = Math.round(60 * sum / maxSum());
  const scale = P.util.scaleFor ? P.util.scaleFor("speaking", raw60, 60) : null;
  return {pct, raw60, scale, grade: scale != null && P.util.gradeFor ? P.util.gradeFor(scale) : ""};
}

/* ---------------- voice: only when the browser really has voices (headless / some desktops have none) ---------------- */
function voicesReady(){
  if(!P.tts.supported) return false;
  try{ return speechSynthesis.getVoices().length > 0; }catch(e){ return false; }
}

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
    if(n === "Timeout") return "Mikrofon nereaguje (možná čeká na tvé povolení). Pokračujeme bez nahrávání – mluv nahlas podle časovače.";
    return "Mikrofon se nepodařilo spustit" + (n ? " (" + n + ")" : "") + ". Trénovat můžeš i bez nahrávky.";
  },
  async ensure(){
    if(Rec.stream && Rec.stream.active) return Rec.stream;
    if(!Rec.supported()) throw {name:"Unsupported"};
    let late = false;
    const gum = navigator.mediaDevices.getUserMedia({audio:true});
    gum.then(s => { if(late) try{ s.getTracks().forEach(t => t.stop()); }catch(e){} }, () => {});
    Rec.stream = await Promise.race([gum, new Promise((_, rej) => setTimeout(() => { late = true; rej({name:"Timeout"}); }, 12000))]);
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

/* ---------------- illustrated 'photos' (inline SVG scene + emoji figures + written description) ---------------- */
const PAL = {
  home:["#F6E7D2","#EBD3B4","#B98C62"], indoor:["#E9E2D6","#D6C8B4","#9C8466"], kitchen:["#FBEFD9","#F1D9B0","#B98A55"],
  office:["#E4ECF3","#CBD8E4","#7F90A3"], classroom:["#EAF1E3","#D3E2C4","#8DA674"], library:["#F1E6D3","#E0CDAE","#8C6A44"],
  lab:["#E6F4F6","#C9E6EC","#7FA9B3"], hospital:["#EAF4F7","#D3E7EE","#9CB9C4"], shop:["#FBEAEA","#F1D3D3","#B79393"],
  stage:["#2B1E3F","#4A2556","#1A1222"], city:["#BFD8F0","#DDEBF8","#8A94A3"], street:["#CFE2F4","#E6F0FA","#9A9FA6"],
  station:["#D9DEE6","#C3CAD6","#6E7684"], airport:["#D6E6F5","#EDF3FA","#9AA6B4"], park:["#AED8F2","#D7EEFA","#7FBF6A"],
  garden:["#B8DEF5","#DDF0FA","#6FAE57"], forest:["#BCDDC5","#DCEFE0","#3F7A4F"], field:["#BFE0F7","#E4F2FB","#B5C96A"],
  mountain:["#9FC8EE","#DCEAF7","#8E9AA8"], sea:["#8ECBF0","#CBE7F8","#2C7FB8"], beach:["#93D0F2","#D1ECFA","#EED9A4"],
  snow:["#C9D9E8","#EEF3F8","#FFFFFF"], night:["#0E1A3A","#24305C","#151B2E"], market:["#F9DDB1","#FBEBD0","#B68A4C"],
  stadium:["#84BCE8","#C5E0F5","#4E9A4B"]
};
const INDOOR = new Set(["home","indoor","kitchen","office","classroom","library","lab","hospital","shop","stage","station","airport"]);
const SKY = new Set(["☀️","🌧️","☔","🌅","🎆","✈️","☁️","💨","🌙","⭐"]);
let svgSeq = 0;
function decor(bg, pal){
  let d = "";
  if(INDOOR.has(bg)){
    if(bg === "stage"){
      d += `<polygon points="70,0 100,0 150,150 30,150" fill="#FFF6C8" opacity=".14"/><polygon points="220,0 250,0 290,150 170,150" fill="#FFF6C8" opacity=".14"/>`;
      d += `<rect x="0" y="0" width="26" height="150" fill="#7A1F2B"/><rect x="294" y="0" width="26" height="150" fill="#7A1F2B"/>`;
    } else if(bg === "library"){
      for(let r = 0; r < 3; r++){ d += `<rect x="14" y="${14 + r * 40}" width="292" height="4" fill="#8C6A44" opacity=".7"/>`;
        for(let i = 0; i < 26; i++){ const h = 22 + (i * 7 + r * 5) % 10; d += `<rect x="${18 + i * 11}" y="${18 + r * 40 + (32 - h)}" width="8" height="${h}" fill="${["#C0504D","#4F81BD","#9BBB59","#8064A2","#F79646"][(i + r) % 5]}" opacity=".55"/>`; } }
    } else if(bg === "classroom"){
      d += `<rect x="90" y="16" width="140" height="62" rx="3" fill="#2F5233"/><rect x="90" y="78" width="140" height="4" fill="#A88D6E"/><path d="M104 36h40M104 50h70M104 62h30" stroke="#E8F0E0" stroke-width="2" opacity=".7"/>`;
    } else if(bg === "station" || bg === "airport"){
      d += `<rect x="0" y="10" width="320" height="100" fill="#EAF3FB" opacity=".75"/>`;
      for(let i = 0; i <= 8; i++) d += `<rect x="${i * 40}" y="10" width="3" height="100" fill="${pal[2]}" opacity=".55"/>`;
      d += bg === "station" ? `<rect x="0" y="134" width="320" height="4" fill="#555" opacity=".6"/><rect x="0" y="142" width="320" height="3" fill="#555" opacity=".5"/>` : `<rect x="210" y="18" width="80" height="26" rx="3" fill="#1F2A44"/><path d="M218 27h50M218 35h36" stroke="#F6C343" stroke-width="2.5"/>`;
    } else {
      d += `<rect x="118" y="16" width="84" height="58" rx="3" fill="#FFFFFF" opacity=".9"/><rect x="123" y="21" width="35" height="48" fill="#BFE3F7"/><rect x="162" y="21" width="35" height="48" fill="#BFE3F7"/>`;
      if(bg === "hospital") d += `<rect x="30" y="22" width="26" height="26" rx="4" fill="#fff"/><path d="M43 27v16M35 35h16" stroke="#D9534F" stroke-width="5"/>`;
      if(bg === "office") d += `<rect x="236" y="30" width="56" height="34" rx="2" fill="#FFFFFF" opacity=".6"/><path d="M244 56l10-12 9 7 12-16" stroke="#4F81BD" stroke-width="2" fill="none"/>`;
      if(bg === "home") d += `<rect x="240" y="26" width="44" height="34" rx="2" fill="#fff" opacity=".7"/><circle cx="256" cy="40" r="6" fill="#E8B04B" opacity=".8"/>`;
    }
    return d + `<rect x="0" y="148" width="320" height="52" fill="${pal[2]}" opacity=".85"/><rect x="0" y="146" width="320" height="3" fill="#000" opacity=".08"/>`;
  }
  /* outdoor */
  if(bg === "night"){
    d += `<circle cx="280" cy="30" r="12" fill="#F4F1D0" opacity=".9"/>` + [[40,22],[90,40],[130,16],[200,30],[240,58],[20,70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.5" fill="#fff"/>`).join("");
  } else if(bg !== "snow"){
    d += `<circle cx="276" cy="32" r="16" fill="#FFD86B" opacity=".95"/>`;
  }
  if(bg !== "night") d += `<g fill="#fff" opacity=".85"><ellipse cx="70" cy="30" rx="26" ry="9"/><ellipse cx="88" cy="24" rx="16" ry="9"/><ellipse cx="190" cy="44" rx="20" ry="7"/></g>`;
  if(bg === "city" || bg === "street" || bg === "night" || bg === "market"){
    const b = [[0,70,40],[42,50,34],[78,86,30],[110,60,44],[156,40,36],[194,76,28],[224,56,40],[266,84,30],[298,64,22]];
    d += b.map(([x, h, w]) => `<rect x="${x}" y="${150 - h - 20}" width="${w}" height="${h + 20}" fill="${bg === "night" ? "#3A4470" : "#9AA3B2"}" opacity="${bg === "night" ? .9 : .55}"/>`).join("");
    if(bg === "night") d += b.map(([x, h, w], i) => i % 2 ? `<rect x="${x + 6}" y="${150 - h - 8}" width="5" height="5" fill="#F6E27F"/>` : "").join("");
    if(bg === "market") d += `<path d="M20 96h280l-14 18H34z" fill="#D9534F"/>` + [0,1,2,3,4,5,6].map(i => `<rect x="${34 + i * 38}" y="96" width="19" height="18" fill="#fff" opacity=".85"/>`).join("");
  }
  if(bg === "mountain") d += `<polygon points="0,150 70,60 120,110 180,40 250,120 290,80 320,110 320,150" fill="#8E9AA8"/><polygon points="168,56 180,40 192,56 184,52 176,58" fill="#fff"/><polygon points="62,70 70,60 78,70" fill="#fff"/>`;
  if(bg === "forest" || bg === "park" || bg === "garden" || bg === "field"){
    const n = bg === "forest" ? 9 : 4;
    for(let i = 0; i < n; i++){ const x = 18 + i * (290 / Math.max(1, n - 1)); const y = 112 + (i % 2) * 8;
      d += bg === "forest" ? `<polygon points="${x - 16},${y + 30} ${x},${y - 26} ${x + 16},${y + 30}" fill="#2F6B3F" opacity=".85"/>` : `<rect x="${x - 2}" y="${y}" width="4" height="30" fill="#7A5A3A"/><circle cx="${x}" cy="${y - 6}" r="15" fill="#4E9A4B" opacity=".85"/>`; }
  }
  if(bg === "sea" || bg === "beach") d += `<rect x="0" y="112" width="320" height="${bg === "sea" ? 88 : 30}" fill="${bg === "sea" ? pal[2] : "#4FA6DB"}"/><path d="M0 118q20-6 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/>`;
  if(bg === "snow") d += [[30,30],[80,60],[140,24],[200,70],[260,40],[300,90],[110,100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="#fff"/>`).join("");
  if(bg === "stadium") return d + `<rect x="0" y="120" width="320" height="80" fill="${pal[2]}"/><path d="M0 160h320M160 120v80" stroke="#fff" stroke-width="2" opacity=".7"/><circle cx="160" cy="160" r="18" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>`;
  if(bg === "sea") return d;
  const groundY = bg === "beach" ? 142 : 150;
  return d + `<path d="M0 ${groundY} Q80 ${groundY - 12} 160 ${groundY - 4} T320 ${groundY - 10} V200 H0Z" fill="${bg === "night" ? "#1B2340" : pal[2]}" opacity=".95"/>`;
}
function sceneSVG(pic){
  const bg = PAL[pic.bg] ? pic.bg : "indoor"; const pal = PAL[bg]; const id = "b2spkg" + (++svgSeq);
  const props = (pic.p || []).slice(0, 4), figs = (pic.e || []).slice(0, 4);
  /* indoor props hang on the wall / stand on the floor; outdoors they stand on the ground, weather goes in the sky */
  const ground = INDOOR.has(bg) ? [[46,48],[276,100],[258,48],[60,110]] : [[40,122],[282,124],[124,104],[204,100]];
  const sky = [[74,44],[186,36],[130,22]];
  let gi = 0, si = 0;
  let s = `<svg viewBox="0 0 320 200" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pal[0]}"/><stop offset="1" stop-color="${pal[1]}"/></linearGradient></defs><rect width="320" height="200" fill="url(#${id})"/>`;
  s += decor(bg, pal);
  props.forEach(e => {
    const up = !INDOOR.has(bg) && SKY.has(e) && si < sky.length;
    const [x, y] = up ? sky[si++] : ground[gi++ % ground.length];
    s += `<text x="${x}" y="${y}" font-size="28" text-anchor="middle" dominant-baseline="middle">${esc(e)}</text>`;
  });
  const n = figs.length;
  figs.forEach((e, i) => {
    const x = n === 1 ? 160 : 82 + i * (156 / Math.max(1, n - 1));
    s += `<text x="${x}" y="158" font-size="${n > 2 ? 46 : 56}" text-anchor="middle" dominant-baseline="middle">${esc(e)}</text>`;
  });
  return s + `</svg>`;
}
function photosHTML(set){
  return `<p class="spk-pq">${esc(set.q)}</p>
    <div class="spk-photos">${set.pics.map((p, i) => `<figure class="spk-photo">${sceneSVG(p)}<figcaption><b>${LETTERS[i]}</b>${esc(p.scene)}</figcaption></figure>`).join("")}</div>`;
}

/* ---------------- phrase helpers, builders, Part 3 mind map ---------------- */
const phraseGroups = ids => (D().phrases || []).filter(g => ids.includes(g.id));
function coachHTML(ids, open, title){
  return `<details class="spk-coach"${open ? " open" : ""}><summary>${esc(title || "Kouč: užitečné fráze")}</summary>
    ${phraseGroups(ids).map(g => `<div class="grp"><b>${esc(g.cz)}</b>${g.items.slice(0, 5).map(x => `<span>${esc(x[0])}</span>`).join("")}</div>`).join("")}</details>`;
}
function stepsHTML(list, note){
  return `<div class="spk-builder">${(list || []).map((b, i) => `<button type="button" class="spk-step" aria-pressed="false" data-i="${i}"><b>${i + 1}. ${esc(b.step)} · ${esc(b.en)}</b><span>${esc(b.starters[0])}</span></button>`).join("")}</div>
    <p class="spk-note">${esc(note)}</p>`;
}
function wireSteps(root){ root.querySelectorAll(".spk-step").forEach(b => b.onclick = () => b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"))); }
function mapHTML(task){
  const cells = [[1,1],[1,3],[2,1],[2,3],[3,2]];
  const pts = [[16.7,16.7],[83.3,16.7],[16.7,50],[83.3,50],[50,83.3]];
  return `<div class="spk-map">
    <svg class="lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${pts.map(p => `<line x1="50" y1="50" x2="${p[0]}" y2="${p[1]}" vector-effect="non-scaling-stroke"/>`).join("")}</svg>
    <div class="spk-center">${esc(task.central)}</div>
    ${task.prompts.map((p, i) => `<button type="button" class="spk-bub" style="grid-row:${cells[i][0]};grid-column:${cells[i][1]}" aria-pressed="false" title="Označit jako probrané">${esc(p)}</button>`).join("")}
  </div>`;
}
function wireMap(root){ root.querySelectorAll(".spk-bub").forEach(b => b.onclick = () => b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"))); }
function chunkSample(part, n){
  const all = [];
  (D().phrases || []).forEach(g => { if(g.parts.includes(part) && g.id !== "time") g.items.forEach(c => all.push(c)); });
  const ch = shuffle(all).slice(0, n);
  if(!ch.length) return "";
  return `<details class="spk-hint" style="margin-top:10px"><summary>Fráze, které se hodí (${ch.length})</summary><ul class="spk-chunks">${ch.map(c => `<li><b>${esc(c[0])}</b><span>${esc(c[1])}</span></li>`).join("")}</ul></details>`;
}

/* ---------------- studio: interlocutor/partner voice, timers, recording ---------------- */
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
  ctx.el = {badge:$(".spk-head .badge"), visual:$(".spk-visual"), now:$(".spk-now"), who:$(".spk-now .who"), say:$(".spk-now .say"), actions:$(".spk-actions"),
    timer:$(".spk-head .timer"), rec:$(".spk-rec"), log:$(".spk-log .lines"), tbar:$(".spk-tbar"), tbarI:$(".spk-tbar i"),
    tlabel:$(".spk-tlabel"), tlL:$(".tl-l"), tlR:$(".tl-r"), warn:$(".spk-warnbox")};
  ctx.alive = () => !ctx.aborted && host.isConnected;
  ctx.check = () => { if(!ctx.alive()) throw ABORT; };
  /* watchdog: release the microphone and stop the voice when the view is left */
  const wd = setInterval(() => { if(!host.isConnected){ clearInterval(wd); ctx.aborted = true; if(ctx.recH) ctx.recH.stop(); Rec.release(); P.tts.stop(); if(ctx.skipFn) ctx.skipFn(); } }, 700);
  ctx.close = () => { clearInterval(wd); Rec.release(); ctx.el.actions.innerHTML = ""; ctx.el.timer.hidden = true; ctx.bar(null); };
  ctx.visual = html => { ctx.el.visual.innerHTML = html; };
  ctx.title = t => { ctx.el.badge.textContent = t; };
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

  /* interlocutor / partner speaks: TTS when voices exist, always shown as text; resolves on end, skip or timeout */
  ctx.say = (text, who) => {
    ctx.check();
    const cast = D().cast || {}; const s = settings();
    const label = who === "partner" ? (cast.partner || "Petra") + " (partnerka)" : "Zkoušející";
    ctx.el.now.classList.remove("you"); ctx.el.who.textContent = label; ctx.el.say.textContent = text; ctx.bar(null);
    ctx.log(label, text);
    const useTTS = s.tts && voicesReady();
    return new Promise(res => {
      let done = false;
      const fin = () => { if(done) return; done = true; clearTimeout(to); ctx.skipFn = null; res(); };
      const to = setTimeout(fin, useTTS ? (1200 + wc(text) * 430) * 1.8 + 3000 : Math.min(9000, 1500 + wc(text) * 260));
      ctx.skipFn = () => { P.tts.stop(); fin(); };
      ctx.actions([{label:"Přeskočit ▸", onClick: () => ctx.skipFn && ctx.skipFn()}]);
      if(useTTS){
        const v = who === "partner" ? (cast.partnerVoice || 1) : (cast.examinerVoice || 0);
        P.tts.speak(text, {lang:"en-GB", voiceIdx:v, rate: who === "partner" ? 1 : 0.93, pitch: who === "partner" ? 1.08 : 1}).then(fin, fin);
      }
    }).then(() => { ctx.check(); });
  };

  /* silent countdown (look at the task / think time) */
  ctx.wait = (seconds, label, sub) => {
    ctx.check();
    ctx.el.now.classList.remove("you"); ctx.el.who.textContent = label; ctx.el.say.textContent = sub || "";
    return ctx.timed(seconds, "Hotovo ▸", null).then(() => ctx.check());
  };

  /* generic timed phase with timer + bar; resolves on time-out or button. maxEnd = end of the whole phase (Part 3) */
  ctx.timed = (seconds, btnLabel, extraBtns, maxEnd) => new Promise(res => {
    const tEl = ctx.el.timer; tEl.hidden = false;
    const t0 = Date.now(); let done = false;
    const phase = () => maxEnd ? "fáze: " + Math.max(0, Math.ceil((maxEnd - Date.now()) / 1000)) + " s" : "";
    const fin = () => { if(done) return; done = true; cd.stop(); clearInterval(iv); ctx.skipFn = null; ctx.bar(null); res((Date.now() - t0) / 1000); };
    const cd = countdown(tEl, seconds, fin);
    const iv = setInterval(() => {
      if(!host.isConnected){ fin(); return; }
      const el = (Date.now() - t0) / 1000;
      ctx.bar(1 - el / seconds, "Zbývá " + Math.max(0, Math.ceil(seconds - el)) + " s", phase());
      if(maxEnd && Date.now() >= maxEnd) fin();
    }, 250);
    ctx.bar(1, "Zbývá " + seconds + " s", phase());
    ctx.skipFn = fin;
    ctx.actions([{label:btnLabel, primary:true, onClick:fin}].concat(extraBtns || []));
  });

  /* learner answers: optional recording + timer; returns {take, used} */
  ctx.answer = async (seconds, label, prompt, opts) => {
    ctx.check(); opts = opts || {};
    ctx.el.now.classList.add("you"); ctx.el.who.textContent = "Tvůj čas – " + label; ctx.el.say.textContent = prompt || "Mluv nahlas anglicky.";
    let h = null;
    if(settings().rec){ h = await Rec.start(); ctx.check(); ctx.showWarn(); }
    ctx.recH = h; ctx.el.rec.classList.toggle("on", !!h);
    const used = await ctx.timed(Math.max(3, Math.round(seconds)), opts.btn || "Hotovo ▸", opts.extra, opts.maxEnd);
    ctx.el.rec.classList.remove("on"); ctx.recH = null;
    const take = h ? await h.stop() : null;
    ctx.check();
    if(take){ take.label = label; ctx.takes.push(take); }
    return {take, used};
  };
  return ctx;
}

/* ---------------- review: playback, model, self-rating (5 criteria, 0–5) ---------------- */
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
/* full review block; resolves with scores when saved (or null when skipped) */
function review(host, o){
  return new Promise(res => {
    const n = D().criteria.length;
    host.innerHTML = `<div class="spk-review">
      <h3>Poslech a sebehodnocení</h3>${takesHTML(o.takes)}
      ${o.modelHTML ? `<h3>Vzorová odpověď (silné B2)</h3>${o.modelHTML}` : ""}
      ${o.extraHTML || ""}
      <h3>Ohodnoť se (0–5)</h3>
      <p class="spk-lead">Poslechni si nahrávku a zvol pásmo podle popisu. Pro B2 (grade C) stačí zhruba pásmo 3 v každém kritériu, pro grade A (úroveň C1) kolem 5.</p>
      ${ratingHTML()}
      <div class="row" style="margin-top:12px"><button type="button" class="btn primary spk-save" disabled>Uložit hodnocení</button>${o.skipLabel ? `<button type="button" class="btn ghost spk-skip">${esc(o.skipLabel)}</button>` : ""}</div>
      <p class="hint" aria-live="polite">Ohodnoť všech ${n} kritérií.</p>
    </div>`;
    const save = host.querySelector(".spk-save");
    const scores = wireRating(host, s => {
      const k = Object.keys(s).length; save.disabled = k < n;
      const e = estimate(sumOf(s));
      host.querySelector(".hint").textContent = k < n ? "Ohodnoť všech " + n + " kritérií (zbývá " + (n - k) + ")." : "Celkem " + sumOf(s) + "/" + maxSum() + " ≈ " + e.raw60 + "/60 bodů" + (e.scale ? " → Cambridge English Scale " + e.scale + " (" + e.grade + ")" : "") + ". Orientační odhad.";
    });
    save.onclick = () => { save.disabled = true; res(Object.assign({}, scores)); };
    const sk = host.querySelector(".spk-skip"); if(sk) sk.onclick = () => res(null);
  });
}
function recordResult(part, setId, scores){
  if(!scores) return;
  const total = sumOf(scores);
  addHistory({t:Date.now(), part, set:setId, s:scores, sum:total, max:maxSum()});
  P.logActivity(ID, part, total, maxSum(), {set:setId});
}
function afterSave(box, extra){
  const x = extra && extra();
  box.innerHTML = `<div class="fb" role="status"><p class="verdict">Uloženo.</p><p class="why">Hodnocení najdeš v přehledu Speaking. Zkus další sadu – nejlépe hned, dokud víš, co chceš zlepšit.</p></div>
    <div class="row"><button type="button" class="btn primary spk-next">Další sada</button>${x ? `<button type="button" class="btn ghost spk-x">${esc(x.label)}</button>` : ""}<button type="button" class="btn ghost spk-home">Přehled Speaking</button></div>`;
  box.querySelector(".spk-next").onclick = () => { P.show(ID, true); window.scrollTo(0, 0); };
  box.querySelector(".spk-home").onclick = () => P.go(ID);
  if(x) box.querySelector(".spk-x").onclick = x.go;
}

/* ---------------- the four parts (shared by practice and the full test) ---------------- */
function abortable(fn){ return fn().catch(e => { if(e !== ABORT) console.error(e); }); }
function pickSet(list, part){
  const done = doneMap()[part] || [];
  const fresh = list.filter(x => !done.includes(x.id));
  return (fresh.length ? shuffle(fresh) : shuffle(list))[0];
}

/* Part 1: greeting, names, where from, then personal questions; the partner gets one question too */
async function flowPart1(ctx, group, nQ){
  const R = D().rubrics, T = D().timing, V = baseVars(), cast = D().cast || {};
  await ctx.say(fill(R.p1Intro, V));
  await ctx.answer(8, "představení", "Řekni své jméno, např. „My name's …“ nebo „I'm …“.");
  await ctx.say("I'm " + V.partner + ".", "partner");
  await ctx.say(R.p1Marks);
  await ctx.say(fill(R.p1From, V));
  await ctx.answer(15, "odkud jsi", "Where are you from? (1–2 věty)");
  await ctx.say(fill(R.p1FromPartner, V));
  await ctx.say(cast.partnerFrom || "I'm from a small town near Brno.", "partner");
  await ctx.say(R.p1First);
  const qs = group.questions.filter(q => q !== group.pq).slice(0, nQ);
  for(let i = 0; i < qs.length; i++){
    await ctx.say(i === 0 ? V.name + ", " + lcFirst(qs[i]) : qs[i]);
    await ctx.answer(T.p1Answer || 20, "otázka " + (i + 1), qs[i]);
    if(i === 1 && group.pq){ await ctx.say(V.partner + ", " + lcFirst(group.pq)); await ctx.say(group.pa, "partner"); }
  }
  await ctx.say(R.p1Thanks);
}

/* Part 2: the learner's long turn on `set`, the partner's short answer; optionally the partner's turn on `other` */
async function flowPart2(ctx, set, other, coach){
  const R = D().rubrics, T = D().timing;
  const show = (s, mine) => {
    ctx.visual(photosHTML(s) + (coach && mine ? `<div style="margin-top:12px">${stepsHTML(D().p2builder, "Osnova minuty: během mluvení si odklikej, co už máš.")}</div>${coachHTML(PH_P2, false, "Fráze: porovnávání a spekulace")}` : ""));
    wireSteps(ctx.el.visual);
  };
  show(set, true);
  await ctx.say(R.p2Intro);
  await ctx.say(fill(R.p2YouFirst, baseVars({show:set.show, ask:set.ask})));
  await ctx.answer(T.p2Long || 60, "dlouhý projev (1 min)", "Porovnej obě fotky a odpověz na otázku nad nimi: " + set.q);
  await ctx.say(R.p2Thanks);
  await ctx.say(fill(R.p2AskPartner, baseVars({q:set.partnerQ})));
  await ctx.say(set.partnerAnswer, "partner");
  await ctx.say(R.p2Thanks);
  if(!other) return;
  show(other, false);
  await ctx.say(fill(R.p2PartnerTurn, baseVars({show:other.show, ask:other.ask})));
  await ctx.say(other.model, "partner");
  await ctx.say(R.p2Thanks);
  await ctx.say(fill(R.p2AskYou, baseVars({q:other.partnerQ})));
  await ctx.answer(T.p2Short || 30, "krátká odpověď (30 s)", other.partnerQ + " (stačí názor a důvod, asi 30 s)");
  await ctx.say(R.p2Thanks);
}

/* Part 3 discussion: turn-taking with the virtual partner until the phase time runs out (or the learner ends it) */
async function discussPhase(ctx, seconds, lines, label, turnMax, partnerFirst){
  const end = Date.now() + seconds * 1000;
  const generic = shuffle(D().partnerGeneric || []);
  let li = 0, gi = 0, n = 0, stop = false;
  const endBtn = {label:"Ukončit tuto fázi ⏭", onClick: () => { stop = true; if(ctx.skipFn) ctx.skipFn(); }};
  const partnerTurn = async () => {
    const line = li < lines.length ? lines[li++] : generic.length ? generic[gi++ % generic.length] : "";
    if(line) await ctx.say(line, "partner");
  };
  if(partnerFirst) await partnerTurn();
  while(!stop && Date.now() < end - 1500){
    ctx.check(); n++;
    const left = Math.ceil((end - Date.now()) / 1000);
    await ctx.answer(Math.min(turnMax, left), label + " · tvůj tah " + n,
      "Reaguj na partnerku (souhlas / nesouhlas + důvod), přidej vlastní myšlenku a předej jí slovo otázkou.", {btn:"Předat slovo partnerce ▸", maxEnd:end, extra:[endBtn]});
    if(stop || Date.now() >= end - 2500) break;
    await partnerTurn();
  }
}
async function flowPart3(ctx, task, coach){
  const R = D().rubrics, T = D().timing;
  ctx.visual(mapHTML(task) + (coach ? coachHTML(PH_P3, true, "Kouč: fráze pro diskusi") : ""));
  wireMap(ctx.el.visual);
  await ctx.say(fill(R.p3Intro, baseVars({topic:task.topic})));
  await ctx.wait(T.p3Look || 15, "Čas na prohlédnutí úkolu (15 s)", "Přečti si otázku uprostřed a pět podnětů. Klepnutím si podnět označíš jako probraný.");
  await ctx.say(fill(R.p3Start, baseVars({central:task.say})));
  await discussPhase(ctx, T.p3Discuss || 120, task.partnerLines, "diskuse 2 min", T.p3Turn || 30, true);
  await ctx.say(fill(R.p3Decide, baseVars({decision:task.decision})));
  await discussPhase(ctx, T.p3Decide || 60, task.decideLines || [], "rozhodnutí 1 min", 25, false);
  await ctx.say(R.p3Thanks);
}

/* Part 4: questions linked to Part 3; items with `pa` go to the partner first, then the learner reacts */
async function flowPart4(ctx, set, opts){
  opts = opts || {};
  const R = D().rubrics, T = D().timing, V = baseVars();
  const items = opts.limit ? set.items.slice(0, opts.limit) : set.items;
  const fillers = shuffle(D().partnerP4 || D().partnerGeneric || []);
  let fi = 0;
  for(let i = 0; i < items.length; i++){
    const it = items[i];
    ctx.visual(`<p class="spk-note">Otázka ${i + 1} / ${items.length}${it.pa ? " · nejdřív odpovídá partnerka, ty pak reaguješ" : ""}</p><div class="spk-qcard">${esc(it.q)}</div>
      ${opts.help ? `<div style="margin-top:12px">${stepsHTML(D().builder, "Stavitel odpovědi: během mluvení si odklikej kroky, které už máš.")}</div>
      <details class="spk-hint" style="margin-top:10px"><summary>Nápověda: osnova a fráze</summary><p>${esc(it.outline)}</p><p><i>${it.phrases.map(esc).join(" · ")}</i></p></details>` : ""}`);
    wireSteps(ctx.el.visual);
    if(it.pa){
      await ctx.say(V.partner + ", " + lcFirst(it.q));
      await ctx.say(it.pa, "partner");
      await ctx.say(fill(R.p4ToYou, V));
      if(opts.help) await ctx.wait(T.p4Think || 5, "Přemýšlej (5 s)", "Navaž na partnerku: I agree with " + V.partner + " that… / I see it a bit differently, because…");
      await ctx.answer(T.p4Answer || 40, "otázka " + (i + 1) + " (reakce)", it.q);
    } else {
      await ctx.say(i === 0 ? V.name + ", " + lcFirst(it.q) : it.q);
      if(opts.help) await ctx.wait(T.p4Think || 5, "Přemýšlej (5 s)", "Názor → důvod → příklad → druhá strana.");
      await ctx.answer(T.p4Answer || 40, "otázka " + (i + 1), it.q);
      if(i === 1 || i === 3){
        await ctx.say(fill(R.p4ToPartner, V));
        if(fillers.length) await ctx.say(fillers[fi++ % fillers.length], "partner");
      }
    }
  }
}

/* ---------------- practice runs ---------------- */
async function runPart1(host, group){
  const ctx = studio(host, "Part 1 · Interview · " + group.theme);
  ctx.visual(`<p class="spk-lead">Téma: <b>${esc(group.theme)}</b> (${esc(group.cz)}). Odpovídej 2–3 větami (asi 20 s): odpověď → důvod → detail.</p>`);
  await flowPart1(ctx, group, 99);
  ctx.close();
  const box = document.createElement("div"); host.appendChild(box);
  const scores = await review(box, {takes:ctx.takes,
    modelHTML:`<p><b>${esc(group.questions[0])}</b></p><div class="spk-model">${esc(group.model)}</div>
      <p class="spk-note"><b>${esc(D().cast.partner || "Petra")}: ${esc(group.pq)}</b><br>${esc(group.pa)}</p>`,
    extraHTML: `<details class="spk-hint"><summary>Kontrolní otázky</summary><ul><li>Odpověděl(a) jsem přímo na otázku?</li><li>Přidal(a) jsem důvod a konkrétní detail (ne jen „Yes, I do.“)?</li><li>Použil(a) jsem různé časy (I've…, I used to…, I'd like to…)?</li></ul></details>` + chunkSample("p1", 6)});
  recordResult("part1", group.id, scores); markDone("p1", group.id);
  afterSave(box);
}

async function runPart2(host, set){
  const ctx = studio(host, "Part 2 · Long turn · " + set.title);
  let other = null;
  /* own long turn + partner's answer; then optionally candidate B's role (partner talks, learner answers 30 s) */
  await flowPart2(ctx, set, null, true);
  const choose = await new Promise(res => {
    ctx.el.now.classList.remove("you"); ctx.el.who.textContent = "Volitelně";
    ctx.el.say.textContent = "Chceš si vyzkoušet i druhou roli? Partnerka promluví o svých fotkách a ty pak asi 30 sekund odpovíš na otázku zkoušejícího.";
    ctx.actions([{label:"Ano, i druhá role (30 s)", primary:true, onClick:() => res(true)}, {label:"Ne, k hodnocení", onClick:() => res(false)}]);
  });
  ctx.check();
  if(choose){
    other = shuffle(D().p2.filter(x => x.id !== set.id))[0];
    if(other){
      const R = D().rubrics, T = D().timing;
      ctx.visual(photosHTML(other));
      await ctx.say(fill(R.p2PartnerTurn, baseVars({show:other.show, ask:other.ask})));
      await ctx.say(other.model, "partner");
      await ctx.say(R.p2Thanks);
      await ctx.say(fill(R.p2AskYou, baseVars({q:other.partnerQ})));
      await ctx.answer(T.p2Short || 30, "krátká odpověď (30 s)", other.partnerQ + " (stačí názor a důvod)");
      await ctx.say(R.p2Thanks);
    }
  }
  ctx.close();
  ctx.visual(photosHTML(set));
  const box = document.createElement("div"); host.appendChild(box);
  const scores = await review(box, {takes:ctx.takes,
    modelHTML:`<p class="spk-note">Vzor k otázce „${esc(set.q)}“ · ${wc(set.model)} slov (≈ 1 minuta)</p><div class="spk-model">${esc(set.model)}</div>
      <p class="spk-note"><b>Odpověď partnerky na „${esc(set.partnerQ)}“</b> (≈ 30 s): ${esc(set.partnerAnswer)}</p>`,
    extraHTML: `<details class="spk-hint"><summary>Kontrolní otázky k tvé odpovědi</summary><ul>
      <li>Porovnával(a) jsem fotky (both, whereas, while), nebo je jen popisoval(a) jednu po druhé?</li><li>Odpověděl(a) jsem na otázku nad fotkami?</li>
      <li>Spekuloval(a) jsem (might, could, must, it looks as if…)?</li><li>Mluvil(a) jsem celou minutu bez dlouhých pauz?</li></ul></details>` + chunkSample("p2", 6)});
  recordResult("part2", set.id, scores); markDone("p2", set.id);
  afterSave(box);
}

async function runPart3(host, task){
  const ctx = studio(host, "Part 3 · Collaborative task · " + task.title);
  await flowPart3(ctx, task, true);
  ctx.close();
  const box = document.createElement("div"); host.appendChild(box);
  const scores = await review(box, {takes:ctx.takes,
    modelHTML:`<p class="spk-note">Ukázka části diskuse – všimni si, jak se mluvčí ptají na názor, navazují na sebe a zdvořile nesouhlasí.</p><div class="spk-model">${esc(task.model)}</div>`,
    extraHTML:`<details class="spk-hint"><summary>Kontrolní otázky</summary><ul><li>Ptal(a) jsem se partnerky na názor (What do you think…?)?</li>
      <li>Reagoval(a) jsem na to, co řekla, ne jen na podněty?</li><li>Zdůvodnil(a) jsem souhlas i nesouhlas?</li><li>Ve fázi rozhodnutí jsme vyjednávali a shrnuli výsledek?</li>
      <li>Nevadí, když jste neprobrali všech pět podnětů.</li></ul></details>` + chunkSample("p3", 6)});
  recordResult("part3", task.id, scores); markDone("p3", task.id);
  afterSave(box, () => {
    const p4 = D().p4.find(s => s.p3 === task.id);
    return p4 ? {label:"Pokračovat Part 4 k tomuto tématu", go:() => startPart4(host.closest(".spk") || host, p4)} : null;
  });
}

async function runPart4(host, set){
  const p3 = D().p3.find(t => t.id === set.p3) || {title:""};
  const ctx = studio(host, "Part 4 · Discussion · " + p3.title);
  await flowPart4(ctx, set, {help:true});
  await ctx.say("Thank you.");
  ctx.close();
  const box = document.createElement("div"); host.appendChild(box);
  const scores = await review(box, {takes:ctx.takes,
    modelHTML:`<p><b>${esc(set.items[0].q)}</b></p><div class="spk-model">${esc(set.model)}</div>`,
    extraHTML:`<h3>Osnovy odpovědí</h3><ol>${set.items.map(it => `<li><b>${esc(it.q)}</b><br><span class="spk-note" style="display:block;border:0;padding:0;margin:2px 0 8px">${esc(it.outline)}<br><i>${it.phrases.map(esc).join(" · ")}</i>${it.pa ? `<br>${esc(D().cast.partner || "Petra")}: ${esc(it.pa)}` : ""}</span></li>`).join("")}</ol>` + chunkSample("p4", 6)});
  recordResult("part4", set.id, scores); markDone("p4", set.id);
  afterSave(box);
}

/* ---------------- full test (14 min) → finish({selfScore}) ---------------- */
async function runMock(stage, finish){
  injectCSS(); Rec.revokeAll(); Rec.error = null;
  const d = D();
  stage.innerHTML = `<section class="sheet spk"><div class="spk-mock-host"></div></section>`;
  const host = stage.querySelector(".spk-mock-host");
  await new Promise(res => {
    host.innerHTML = `<h3 style="margin-top:0">Speaking – celý test (14 minut)</h3>
      <p class="spk-lead">Virtuální zkoušející a partnerka tě provedou všemi čtyřmi částmi v reálném čase: Part 1 (2 min), Part 2 (4 min), Part 3 (4 min), Part 4 (4 min). Nápovědy jsou vypnuté jako u zkoušky. Na konci si nahrávky poslechneš a ohodnotíš se podle ${d.criteria.length} kritérií.</p>
      ${settingsHTML()}
      <p class="spk-note">Nahrávky zůstávají jen v paměti prohlížeče a nikam se neodesílají. Bez mikrofonu nebo hlasu test proběhne také – text se zobrazí na obrazovce.</p>
      <div class="row"><button type="button" class="btn primary spk-go">Začít test</button></div>`;
    wireSettings(host);
    host.querySelector(".spk-go").onclick = res;
  });
  const p1 = shuffle(d.p1)[0], sets = shuffle(d.p2).slice(0, 2), task = shuffle(d.p3)[0];
  const p4 = d.p4.find(s => s.p3 === task.id) || shuffle(d.p4)[0];
  const ctx = studio(host, "Part 1 · Interview");
  ctx.visual(`<p class="spk-lead">Part 1 – rozhovor se zkoušejícím (asi 2 minuty).</p>`);
  await flowPart1(ctx, p1, 3);
  P.logActivity(ID, "mock-part1", 1, 1);
  ctx.title("Part 2 · Long turn");
  await flowPart2(ctx, sets[0], sets[1], false);
  P.logActivity(ID, "mock-part2", 1, 1);
  ctx.title("Part 3 · Collaborative task");
  await flowPart3(ctx, task, false);
  P.logActivity(ID, "mock-part3", 1, 1);
  ctx.title("Part 4 · Discussion");
  await flowPart4(ctx, p4, {limit:5});
  await ctx.say(d.rubrics.end);
  P.logActivity(ID, "mock-part4", 1, 1);
  ctx.close();
  const box = document.createElement("div"); host.appendChild(box);
  const scores = await review(box, {takes:ctx.takes,
    modelHTML:`<p class="spk-note">Part 2 – vzor k tvým fotkám („${esc(sets[0].q)}“):</p><div class="spk-model">${esc(sets[0].model)}</div>
      <p class="spk-note">Part 3 – ukázka interakce:</p><div class="spk-model">${esc(task.model)}</div>
      <p class="spk-note">Part 4 – vzor k první otázce („${esc(p4.items[0].q)}“):</p><div class="spk-model">${esc(p4.model)}</div>`});
  const sum = sumOf(scores);
  const e = estimate(sum);
  addHistory({t:Date.now(), part:"mock", set:[p1.id, sets[0].id, sets[1].id, task.id, p4.id].join(","), s:scores, sum, max:maxSum(), raw60:e.raw60});
  P.logActivity(ID, "mock", sum, maxSum());
  finish({selfScore:e.pct, details:{scores, sum, max:maxSum(), raw60:e.raw60, scale:e.scale, sets:{p1:p1.id, p2:[sets[0].id, sets[1].id], p3:task.id, p4:p4.id}}});
}

/* ---------------- pages ---------------- */
function settingsHTML(){
  const s = settings();
  return `<div class="spk-settings">
    <label><input type="checkbox" data-k="tts"${s.tts ? " checked" : ""}> Hlas zkoušejícího a partnerky (čtení nahlas)${P.tts.supported ? (voicesReady() ? "" : " – zatím nenačtené hlasy, text se zobrazí na obrazovce") : " – v tomto prohlížeči nedostupný"}</label>
    <label><input type="checkbox" data-k="rec"${s.rec ? " checked" : ""}> Nahrávat mé odpovědi (mikrofon)${Rec.supported() ? "" : " – v tomto prohlížeči nedostupné"}</label>
    <label><input type="checkbox" data-k="text"${s.text ? " checked" : ""}> Zobrazovat text otázek (vypni pro trénink poslechu)</label>
    <label>Tvé jméno (osloví tě zkoušející): <input class="field" style="max-width:200px;padding:6px 10px" data-k="name" value="${esc(s.name)}" maxlength="30" placeholder="Candidate A" autocomplete="given-name"></label>
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
  const ids = D().criteria.map(c => c.id); const c = {};
  ids.forEach(k => c[k] = []);
  h.forEach(e => e.s && ids.forEach(k => typeof e.s[k] === "number" && c[k].push(e.s[k])));
  const out = {}; ids.forEach(k => out[k] = c[k].length ? c[k].reduce((a, b) => a + b, 0) / c[k].length : null);
  return out;
}
const TIPS = {
  gv:"V další odpovědi vědomě použij jednu podmínkovou větu (If I had…, I'd…) a dvě fráze z karty Fráze.",
  dm:"Stav odpověď podle schématu názor → důvod → příklad → druhá strana (stavitel v Part 4) a střídej spojky: so, however, whereas, what's more.",
  pr:"Projdi lekci Výslovnost pro české mluvčí: přízvuk mimo první slabiku, th, w/v a koncovky -ed.",
  ic:"V Part 3 se po každém svém názoru zeptej partnerky (What do you think?) a navazuj na ni – pomůže panel Kouč.",
  ga:"Udělej si celý test (14 min) – celkový dojem roste s tím, jak zvládáš všechny části bez dlouhého váhání."
};
function pageHome(body){
  const d = D(), dm = doneMap(), h = P.store.get(ID+":history", []);
  const av = avgScores(h.slice(-20));
  const weak = Object.entries(av).filter(([, v]) => v != null).sort((a, b) => a[1] - b[1])[0];
  const crit = id => d.criteria.find(c => c.id === id) || {cz:id};
  const lastMock = h.slice().reverse().find(e => e.part === "mock" && e.s);
  const lm = lastMock ? estimate(sumOf(lastMock.s) * maxSum() / (lastMock.max || maxSum())) : null;
  body.innerHTML = `
    <div class="sheet">
      <p class="spk-lead" style="margin-top:0">Ústní zkouška B2 First trvá 14 minut a skládá se ve dvojici. Tady trénuješ sám/sama s virtuálním zkoušejícím a partnerkou – se zněním instrukcí jako u zkoušky, skutečnými časy a nahráváním.</p>
      <div class="spk-parts">${d.overview.map(o => `<button type="button" class="spk-part" data-p="part${o.part}"><b>${esc(o.name)}</b><span>${esc(o.time)}</span><span>Hotovo: ${(dm["p" + o.part] || []).length} / ${(d["p" + o.part] || []).length}</span></button>`).join("")}</div>
      <div class="row"><button type="button" class="btn primary spk-mock">Celý test (14 min)</button><button type="button" class="btn ghost spk-les">Lekce: jak na to</button></div>
    </div>
    <h2>Nastavení</h2><div class="sheet">${settingsHTML()}
      <p class="spk-note">Nahrávky se ukládají jen do paměti tohoto prohlížeče (nikam se neodesílají) a smažou se, jakmile stránku opustíš. Ukládá se pouze tvé sebehodnocení.</p></div>
    <h2>Tvůj pokrok</h2>
    <div class="grid">${d.criteria.map(c => `<div class="stat"><b>${av[c.id] == null ? "–" : av[c.id].toFixed(1)}</b><span>${esc(c.cz)} (průměr, 0–5)</span></div>`).join("")}</div>
    ${lm ? `<p class="spk-note">Poslední celý test: ${lm.raw60}/60 bodů → Cambridge English Scale ${lm.scale} (${esc(lm.grade)}). Orientační odhad ze sebehodnocení.</p>` : ""}
    ${weak ? `<div class="fb bad"><p class="verdict">Slabé místo: ${esc(crit(weak[0]).cz)}</p><p class="why">${esc(TIPS[weak[0]] || "")}</p></div>` : `<p class="spk-note">Zatím žádné hodnocení. Začni třeba Part 2 – nejvíc prozradí o tvé plynulosti.</p>`}
    ${h.length ? `<table class="spk-hist"><thead><tr><th>Datum</th><th>Část</th><th>GV/DM/P/IC/GA</th><th>Σ /${maxSum()}</th></tr></thead><tbody>${h.slice(-10).reverse().map(e => `<tr><td>${esc(new Date(e.t).toLocaleDateString("cs-CZ"))}</td><td>${esc(e.part)}</td><td>${e.s ? d.criteria.map(c => e.s[c.id] == null ? "–" : e.s[c.id]).join(" / ") : "–"}</td><td>${esc(e.sum)}</td></tr>`).join("")}</tbody></table>` : ""}`;
  body.querySelectorAll(".spk-part").forEach(b => b.onclick = () => P.go(ID, b.dataset.p));
  body.querySelector(".spk-mock").onclick = () => P.go(ID, "test");
  body.querySelector(".spk-les").onclick = () => P.go(ID, "lessons");
  wireSettings(body);
}

function pagePicker(body, part){
  const d = D(); const n = +part.slice(-1); const list = d["p" + n] || []; const done = doneMap()["p" + n] || [];
  const ov = d.overview[n - 1] || {name:part, time:"", what:"", tip:""};
  const label = x => n === 1 ? x.theme : n === 4 ? ((d.p3.find(t => t.id === x.p3) || {}).title || x.id) : x.title;
  body.innerHTML = `<div class="sheet spk-pick">
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
    if(!item) return;
    const run = body.querySelector(".spk-run"); run.hidden = false;
    body.querySelector(".spk-pick").hidden = true; Rec.revokeAll(); Rec.error = null;
    window.scrollTo(0, 0);
    const fn = {1:runPart1, 2:runPart2, 3:runPart3, 4:runPart4}[n];
    abortable(() => fn(run, item));
  };
  body.querySelector(".spk-rand").onclick = () => start(pickSet(list, "p" + n));
  body.querySelectorAll(".spk-list .chip").forEach(b => b.onclick = () => start(list.find(x => x.id === b.dataset.id)));
}
function startPart4(root, set){
  const run = root.querySelector(".spk-run") || root;
  const pick = root.querySelector(".spk-pick"); if(pick) pick.hidden = true;
  run.hidden = false; window.scrollTo(0, 0);
  abortable(() => runPart4(run, set));
}

function pageLessons(body){
  const d = D();
  body.innerHTML = `<div class="sheet cheat">
    <h3 style="margin-top:0">Formát zkoušky (14 minut, ve dvojici)</h3>
    ${d.overview.map(o => `<p><b>${esc(o.name)}</b> <span class="badge">${esc(o.time)}</span><br>${esc(o.what)}</p>`).join("")}
    ${d.lessons.map((l, i) => `<details${i === 0 ? " open" : ""}><summary>${esc(l.title)}</summary><div class="body"><ul>${l.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul></div></details>`).join("")}
    <details><summary>Najdi chybu: ${d.mistakes.length} vět</summary><div class="body">
      <p>Co je špatně? Zkus větu nejdřív opravit nahlas, pak klepni na „Ukázat opravu“.</p>
      <div class="row"><button type="button" class="btn ghost spk-mshuf">Zamíchat</button></div>
      <div class="spk-mis"></div></div></details>
    <details><summary>Hodnoticí kritéria a pásma 0–5</summary><div class="body"><p>Assessor hodnotí první čtyři kritéria, interlocutor (zkoušející, který s vámi mluví) dává celkový dojem. Pásma 2 a 4 leží mezi popsanými pásmy.</p>${d.criteria.map(c => `<p><b>${esc(c.cz)}</b> (${esc(c.name)}) – ${esc(c.focus)}</p><ul>${c.bands.map(b => `<li>${esc(b)}</li>`).join("")}</ul>`).join("")}</div></details>
    <details><summary>Osnova minuty v Part 2</summary><div class="body"><ol>${d.p2builder.map(b => `<li><b>${esc(b.step)} (${esc(b.en)})</b>: <em>${b.starters.map(esc).join(" / ")}</em></li>`).join("")}</ol></div></details>
    <details><summary>Stavitel odpovědi (Part 4)</summary><div class="body"><ol>${d.builder.map(b => `<li><b>${esc(b.step)} (${esc(b.en)})</b>: <em>${b.starters.map(esc).join(" / ")}</em></li>`).join("")}</ol></div></details>
  </div>`;
  const box = body.querySelector(".spk-mis");
  const draw = list => {
    box.innerHTML = list.map((m, i) => `<div class="card-m"><p class="w">${esc(m.wrong)}</p><div class="ans" hidden aria-live="polite"><p class="r">${esc(m.right)}</p><p class="y">${esc(m.why)}</p></div><button type="button" class="link-btn" data-i="${i}" aria-expanded="false">Ukázat opravu</button></div>`).join("");
    box.querySelectorAll(".link-btn").forEach(b => b.onclick = () => {
      const a = b.parentNode.querySelector(".ans"); const open = a.hidden;
      a.hidden = !open; b.setAttribute("aria-expanded", String(open)); b.textContent = open ? "Skrýt" : "Ukázat opravu";
    });
  };
  draw(d.mistakes);
  body.querySelector(".spk-mshuf").onclick = () => draw(shuffle(d.mistakes));
}
function pagePhrases(body){
  const d = D(); const groups = d.phrases || [];
  let key = P.store.get(ID+":phrasetab", groups[0] && groups[0].id);
  if(!groups.some(g => g.id === key)) key = groups[0] && groups[0].id;
  body.innerHTML = `<div class="sheet">
    <div class="chips" role="group" aria-label="Funkce">${groups.map(g => `<button type="button" class="chip" data-k="${esc(g.id)}" aria-pressed="${g.id === key}">${esc(g.cz)}</button>`).join("")}</div>
    <div class="spk-ph"></div></div>`;
  const partName = {p1:"Part 1", p2:"Part 2", p3:"Part 3", p4:"Part 4"};
  const show = k => {
    if(k !== P.store.get(ID+":phrasetab", null)) P.store.set(ID+":phrasetab", k);
    body.querySelectorAll(".chips .chip").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.k === k)));
    const g = groups.find(x => x.id === k); if(!g) return;
    body.querySelector(".spk-ph").innerHTML = `<h3 style="margin-top:0">${esc(g.cz)} · <i>${esc(g.en)}</i> <span class="badge">${g.items.length}</span></h3>
      <p class="spk-lead">Hodí se hlavně pro: ${g.parts.map(p => partName[p]).join(", ")}. Klepni na ▶ a uslyšíš příklad (pokud prohlížeč umí hlas). Uč se fráze jako celky.</p>
      <ul class="spk-chunks">${g.items.map((c, i) => `<li><b>${esc(c[0])}</b><span><button type="button" class="link-btn" data-i="${i}" aria-label="Přehrát příklad">▶</button> ${esc(c[1])}</span></li>`).join("")}</ul>`;
    body.querySelectorAll(".spk-ph .link-btn").forEach(b => b.onclick = () => { P.tts.stop(); if(voicesReady()) P.tts.speak(g.items[+b.dataset.i][1], {lang:"en-GB"}); else P.toast("Hlasový výstup není v tomto prohlížeči k dispozici."); });
  };
  body.querySelectorAll(".chips .chip").forEach(b => b.onclick = () => show(b.dataset.k));
  if(key) show(key);
}
function pageTest(body){
  abortable(() => runMock(body, res => {
    const det = res.details || {};
    const box = document.createElement("div"); box.className = "sheet"; box.style.marginTop = "14px";
    box.innerHTML = `<p class="spk-big">${res.selfScore} %</p>
      <p class="spk-lead">Tvé sebehodnocení celého testu: ${esc(det.sum)}/${esc(det.max)} ≈ ${esc(det.raw60)}/60 bodů${det.scale ? " → Cambridge English Scale " + esc(det.scale) + " (" + esc(P.util.gradeFor(det.scale)) + ")" : ""}.
      ${res.selfScore >= 60 ? "Odpovídá zhruba úrovni B2 (grade C a výš)." : "Zatím spíš pod úrovní B2 – zaměř se na slabé kritérium v přehledu."} (Orientační, vychází jen z tvého vlastního hodnocení.)</p>
      <div class="row"><button type="button" class="btn primary">Přehled Speaking</button></div>`;
    box.querySelector(".btn").onclick = () => P.go(ID);
    body.appendChild(box); box.scrollIntoView({behavior:"smooth", block:"start"});
  }));
}

P.register({
  id: ID, title: "Speaking", short: "Speaking",
  blurb: "Ústní zkouška B2 First: virtuální zkoušející a partnerka, dvě fotky, nahrávání, sebehodnocení",
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
    paper: "Speaking", minutes: 14,
    run(stage, finish){ abortable(() => runMock(stage, finish)); }
  }
});
})();
