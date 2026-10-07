/* CAE Portal core – router, storage, utilities. Modules register themselves via Portal.register(). */
(function(){
"use strict";
const $ = (s, r=document) => r.querySelector(s);
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const norm = s => String(s).toLowerCase().replace(/[’‘`´]/g,"'").replace(/[.,;!?]+/g," ").replace(/\s+/g," ").trim();
const plural = n => n===1 ? "slovo" : (n>=2 && n<=4 ? "slova" : "slov");
const shuffle = a => { a = a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const DAY = 864e5;
const todayStr = (d=new Date()) => d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");

/* ---- storage: namespaced localStorage, JSON, never throws ---- */
const PREFIX = "cae:";
const store = {
  get(ns, def){ try{ const v = localStorage.getItem(PREFIX+ns); return v == null ? def : JSON.parse(v); }catch(e){ return def; } },
  set(ns, val){ try{ localStorage.setItem(PREFIX+ns, JSON.stringify(val)); return true; }catch(e){ return false; } },
  del(ns){ try{ localStorage.removeItem(PREFIX+ns); }catch(e){} },
  keys(){ try{ return Object.keys(localStorage).filter(k => k.startsWith(PREFIX)).map(k => k.slice(PREFIX.length)); }catch(e){ return []; } }
};

/* ---- activity log shared by all modules (feeds dashboard, streak, weak spots) ---- */
function logActivity(moduleId, part, correct, total, extra){
  const log = store.get("activity", []);
  log.push(Object.assign({t:Date.now(), day:todayStr(), m:moduleId, p:part, c:correct, n:total}, extra||{}));
  store.set("activity", log.slice(-2000));
}
function streak(){
  const days = new Set(store.get("activity", []).map(a => a.day));
  let n = 0, d = new Date();
  if(!days.has(todayStr(d))) d = new Date(d.getTime()-DAY);
  while(days.has(todayStr(d))){ n++; d = new Date(d.getTime()-DAY); }
  return n;
}

/* ---- approximate Cambridge Scale (160–210). Orientační, ne oficiální převod. ---- */
function cambridgeScale(pct){
  const pts = [[0,120],[30,150],[45,160],[60,180],[75,193],[85,200],[100,210]];
  for(let i=1;i<pts.length;i++) if(pct <= pts[i][0]){
    const [x0,y0] = pts[i-1], [x1,y1] = pts[i];
    return Math.round(y0 + (y1-y0)*(pct-x0)/(x1-x0));
  }
  return 210;
}
function gradeFor(scale){
  return scale >= 200 ? "A" : scale >= 193 ? "B" : scale >= 180 ? "C (C1)" : scale >= 160 ? "B2" : "pod B2";
}

/* ---- text-to-speech (Listening / Speaking examiner voice) ---- */
let voices = [];
function loadVoices(){ try{ voices = speechSynthesis.getVoices(); }catch(e){} }
if("speechSynthesis" in window){ loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function pickVoice(lang, idx){
  const pool = voices.filter(v => v.lang && v.lang.replace("_","-").toLowerCase().startsWith(lang.toLowerCase()));
  const any = pool.length ? pool : voices.filter(v => v.lang && v.lang.toLowerCase().startsWith("en"));
  return any.length ? any[(idx||0) % any.length] : null;
}
const tts = {
  supported: "speechSynthesis" in window,
  /* speak(text, {lang, rate, pitch, voiceIdx}) -> Promise resolved at end (or on cancel) */
  speak(text, o={}){
    return new Promise(res => {
      if(!tts.supported) return res();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = o.lang || "en-GB"; u.rate = o.rate || 0.95; u.pitch = o.pitch || 1;
      const v = pickVoice(u.lang, o.voiceIdx); if(v) u.voice = v;
      u.onend = u.onerror = () => res();
      speechSynthesis.speak(u);
    });
  },
  stop(){ if(tts.supported) try{ speechSynthesis.cancel(); }catch(e){} }
};

/* ---- countdown timer. returns {stop(), left()} ---- */
function countdown(el, seconds, onEnd){
  let left = seconds, stopped = false;
  const fmt = s => String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
  const tick = () => {
    if(stopped) return;
    if(el.isConnected === false){ stopped = true; return; }
    el.textContent = fmt(Math.max(0,left)); el.classList.toggle("low", left <= 60);
    if(left <= 0){ stopped = true; onEnd && onEnd(); return; }
    left--; setTimeout(tick, 1000);
  };
  tick();
  return {stop(){ stopped = true; }, left(){ return left; }};
}

/* ---- toast ---- */
function toast(msg){
  const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; t.setAttribute("role","status");
  document.body.appendChild(t); setTimeout(() => t.remove(), 2600);
}

/* ---- registry + router ---- */
const modules = {}; const order = [];
let current = null;
const Portal = {
  modules, order, store, tts, toast,
  util: {$, esc, norm, plural, shuffle, DAY, todayStr, countdown, cambridgeScale, gradeFor},
  logActivity, streak,
  /* mod: {id, title, short, blurb, render(stage, ctx), progress?():{done,total}, mock?:{paper,minutes,run(stage,done)}} */
  register(mod){ if(!modules[mod.id]) order.push(mod.id); modules[mod.id] = mod; Portal.renderNav(); if(current === mod.id) Portal.show(mod.id, true); },
  go(id, sub){ location.hash = "#/" + id + (sub ? "/" + sub : ""); },
  show(id, quiet){
    const mod = modules[id] || modules.home; if(!mod) return;
    tts.stop(); current = mod.id;
    document.querySelectorAll("nav.portal .tab").forEach(t => t.setAttribute("aria-selected", String(t.dataset.id === mod.id)));
    const stage = $("#stage"); stage.innerHTML = "";
    const sub = (location.hash.split("/")[2]) || null;
    mod.render(stage, {sub});
    if(!quiet) window.scrollTo(0,0);
  },
  renderNav(){
    const nav = $("nav.portal"); if(!nav) return;
    nav.innerHTML = order.map(id => `<button class="tab" role="tab" data-id="${id}" aria-selected="${id===current}">${esc(modules[id].short || modules[id].title)}</button>`).join("");
    nav.querySelectorAll(".tab").forEach(b => b.onclick = () => Portal.go(b.dataset.id));
  }
};
window.Portal = Portal;
window.DATA = window.DATA || {};

function route(){ const id = (location.hash.split("/")[1]) || "home"; Portal.show(id); }
window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", () => { Portal.renderNav(); route(); });

/* ---- minimal home (overridden if a module registers id "home" later) ---- */
Portal.register({
  id:"home", title:"Přehled", short:"Přehled", blurb:"",
  render(stage){
    const ms = order.filter(id => id !== "home" && id !== "mock").map(id => modules[id]);
    stage.innerHTML = `<section class="sheet home"><p>Streak: <b>${streak()}</b> dní v řadě. Vyber část zkoušky C1 Advanced.</p></section>
      <div class="cards" style="margin-top:16px">${ms.map(m => { const p = m.progress ? m.progress() : null; const pct = p && p.total ? Math.round(100*p.done/p.total) : 0;
        return `<button class="card" data-id="${m.id}"><b>${esc(m.title)}</b><span>${esc(m.blurb||"")}</span><i class="pct"><i style="width:${pct}%"></i></i></button>`; }).join("")}</div>`;
    stage.querySelectorAll(".card").forEach(c => c.onclick = () => Portal.go(c.dataset.id));
  }
});
})();
