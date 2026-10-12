/* Account chip in the top bar + progress sync between devices (Google login, server in api/).
   Every Portal.store write is stamped by core.js; changed keys are queued in "sync:dirty" and pushed a few
   seconds later, and the server answers with whatever other devices changed (merge rules: js/sync-merge.js).
   Without the api/ functions (plain static hosting) the chip simply does not appear. */
(function(){
"use strict";
const P = window.Portal, M = window.CaeMerge;
if(!P || !M) return;
const {esc} = P.util;
const STATE = "sync:state", DIRTY = "sync:dirty";
const PUSH_DELAY = 4000, POLL_EVERY = 120000;

let cfg = null, user = null;
let busy = false, again = false, timer = null;
let status = "idle", errMsg = "";
const loadedAt = Date.now();
let wroteSinceLoad = false;

const state = () => Object.assign({lastSeq: 0, at: 0}, P.store.get(STATE, {}));
const setState = patch => P.store.set(STATE, Object.assign(state(), patch));
const dirtySet = () => new Set(P.store.get(DIRTY, []));

/* ---------------------------------------------------------------- network */
async function api(path, opts){
  const r = await fetch(path, Object.assign({credentials: "same-origin", cache: "no-store", headers: {"Content-Type": "application/json"}}, opts || {}));
  let j = null; try{ j = await r.json(); }catch(e){}
  return {ok: r.ok, status: r.status, j};
}

/* ---------------------------------------------------------------- local snapshot */
function itemFor(ns, meta){
  let raw = null; try{ raw = localStorage.getItem("cae:" + ns); }catch(e){}
  const t = meta[ns] || 1; /* data saved before sync existed counts as oldest */
  if(raw == null) return meta[ns] ? {t, d: 1} : null;
  try{ return {t, v: JSON.parse(raw)}; }catch(e){ return null; }
}
function collect(full){
  const meta = P.store.meta();
  const names = full ? new Set(P.store.keys().concat(Object.keys(meta))) : dirtySet();
  const out = {};
  names.forEach(ns => { if(!M.validNs(ns)) return; const it = itemFor(ns, meta); if(it) out[ns] = it; });
  return out;
}

/* ---------------------------------------------------------------- sync */
function schedule(ms){ clearTimeout(timer); timer = setTimeout(() => syncNow(), ms); }

async function syncNow(opts){
  opts = opts || {};
  if(!user) return false;
  if(busy){ again = true; return false; }
  busy = true; setStatus("sync");
  try{
    const s = state();
    const full = !!opts.full || !s.lastSeq;
    const changes = collect(full);
    const sent = {}; Object.keys(changes).forEach(ns => { sent[ns] = changes[ns].t; });
    const body = JSON.stringify({lastSeq: full ? 0 : s.lastSeq, changes});
    const r = await api("api/sync", {method: "POST", body, keepalive: !!opts.keepalive && body.length < 60000});
    if(r.status === 401){ user = null; setState({lastSeq: 0}); setStatus("idle"); renderChip(); return false; }
    if(!r.ok) throw new Error(r.status === 413 ? "příliš mnoho dat" : (r.j && r.j.error) || "HTTP " + r.status);

    /* sent keys are done unless they changed again while the request was in flight */
    const meta = P.store.meta(), dirty = dirtySet();
    Object.keys(sent).forEach(ns => { if((meta[ns] || 1) === sent[ns]) dirty.delete(ns); });
    P.store.set(DIRTY, [...dirty]);

    const applied = [];
    Object.entries((r.j && r.j.items) || {}).forEach(([ns, raw]) => {
      const it = M.cleanItem(raw);
      if(!it || !M.validNs(ns)) return;
      if(dirty.has(ns) && (meta[ns] || 0) > it.t) return; /* a newer local edit is still queued */
      const cur = itemFor(ns, meta);
      if(cur && M.sameItem(cur, it)) return;
      const valueChanged = !cur || !M.sameValue(cur, it);
      P.store.applyRemote(ns, it);
      if(valueChanged) applied.push(ns);
    });
    setState({lastSeq: r.j.seq, at: Date.now()});
    setStatus("ok");
    if(applied.length) onRemote(applied);
    return true;
  }catch(e){
    errMsg = navigator.onLine === false ? "jsi offline" : String(e && e.message || e);
    setStatus("err");
    return false;
  }finally{
    busy = false;
    if(again){ again = false; schedule(1500); }
  }
}

/* data from another device arrived: modules that cache state drop it; refresh the view when it is safe */
function onRemote(keys){
  try{ window.dispatchEvent(new CustomEvent("cae:remote", {detail: {keys}})); }catch(e){}
  const view = P.view && P.view();
  const early = Date.now() - loadedAt < 15000 && !wroteSinceLoad;
  if(early || view === "home") P.show(view || "home", true);
  else P.toast("Načten postup z jiného zařízení");
}

window.addEventListener("cae:change", e => {
  const ns = e.detail && e.detail.ns;
  if(!ns || !M.validNs(ns)) return;
  wroteSinceLoad = true;
  const d = dirtySet(); if(!d.has(ns)){ d.add(ns); P.store.set(DIRTY, [...d]); }
  if(user) schedule(PUSH_DELAY);
});
document.addEventListener("visibilitychange", () => {
  if(!user) return;
  if(document.visibilityState === "hidden"){ if(dirtySet().size){ clearTimeout(timer); syncNow({keepalive: true}); } }
  else if(Date.now() - state().at > 30000) syncNow();
});
window.addEventListener("online", () => { if(user) syncNow(); });
setInterval(() => { if(user && document.visibilityState === "visible") syncNow(); }, POLL_EVERY);

/* ---------------------------------------------------------------- Google sign-in */
let gisPromise = null;
function loadGis(){
  if(window.google && window.google.accounts && window.google.accounts.id) return Promise.resolve();
  if(gisPromise) return gisPromise;
  gisPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client"; s.async = true;
    s.onload = () => { if(window.google && window.google.accounts && window.google.accounts.id){
      window.google.accounts.id.initialize({client_id: cfg.clientId, callback: onCredential, auto_select: false, cancel_on_tap_outside: true});
      resolve(); } else reject(new Error("gis")); };
    s.onerror = () => { gisPromise = null; reject(new Error("gis")); };
    document.head.appendChild(s);
  });
  return gisPromise;
}
const darkTheme = () => {
  const t = document.documentElement.getAttribute("data-theme");
  return t ? t === "dark" : !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
};
async function onCredential(resp){
  const msg = document.querySelector(".sy-msg");
  if(msg) msg.textContent = "Přihlašuji…";
  try{
    const r = await api("api/auth", {method: "POST", body: JSON.stringify({credential: resp && resp.credential})});
    if(!r.ok || !r.j || !r.j.user) throw new Error(r.status === 401 ? "Google přihlášení se nepodařilo ověřit." : "Server neodpověděl (" + r.status + ").");
    user = r.j.user;
    setState({lastSeq: 0});
    renderChip(); renderPop();
    P.toast("Přihlášeno – synchronizuji postup…");
    if(await syncNow({full: true})) P.toast("Postup je synchronizovaný");
  }catch(e){
    if(msg) msg.textContent = e.message || "Přihlášení selhalo.";
  }
}
async function logout(){
  try{ await api("api/auth", {method: "DELETE"}); }catch(e){}
  try{ window.google && window.google.accounts && window.google.accounts.id.disableAutoSelect(); }catch(e){}
  user = null; setState({lastSeq: 0, at: 0}); setStatus("idle");
  renderChip(); renderPop();
  P.toast("Odhlášeno – postup zůstává i v tomto zařízení");
}

/* ---------------------------------------------------------------- UI */
const CSS = `
.sy{position:relative}
.sy-chip{appearance:none;display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:0 12px;border-radius:20px;border:1.5px solid var(--rule);background:var(--sheet);color:var(--ink);font:inherit;font-size:14px;font-weight:500;cursor:pointer;position:relative}
.sy-chip:hover{border-color:var(--ink)}
.sy-chip svg{width:18px;height:18px;flex:none}
.sy-chip.user{padding:0;width:40px;justify-content:center;border-radius:50%;font-family:var(--serif);font-size:18px;background:var(--ink);color:var(--paper);border-color:var(--ink)}
.sy-dot{position:absolute;right:-1px;bottom:-1px;width:12px;height:12px;border-radius:50%;border:2px solid var(--paper);background:var(--muted)}
.sy-dot.ok{background:var(--green)} .sy-dot.err{background:var(--red)} .sy-dot.sync{background:#E0A100}
.sy-pop{position:absolute;right:0;top:calc(100% + 6px);z-index:41;width:min(310px, calc(100vw - 32px));background:var(--sheet);border:1px solid var(--rule);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.18);padding:16px;font-size:15px}
.sy-pop[hidden]{display:none}
.sy-pop h3{font-family:var(--serif);font-weight:500;font-size:20px;margin:0 0 6px}
.sy-pop p{margin:0 0 10px}
.sy-pop .note{font-size:13px}
.sy-pop .row{margin-top:12px}
.sy-pop .btn{min-height:40px;padding:0 14px;font-size:15px}
.sy-gbtn{min-height:44px;margin:4px 0 6px}
.sy-msg{min-height:1.2em;font-size:14px;color:var(--muted);margin:4px 0 0}
.sy-who{display:flex;gap:10px;align-items:center;margin-bottom:10px}
.sy-who .av{width:40px;height:40px;border-radius:50%;background:var(--ink);color:var(--paper);display:grid;place-items:center;font-family:var(--serif);font-size:20px;flex:none}
.sy-who b{display:block;font-weight:600;word-break:break-word}
.sy-who span{color:var(--muted);font-size:13.5px;word-break:break-all}
.sy-status{display:flex;gap:8px;align-items:center;font-size:14px;color:var(--muted)}
.sy-status i{width:10px;height:10px;border-radius:50%;background:var(--muted);flex:none}
.sy-status i.ok{background:var(--green)} .sy-status i.err{background:var(--red)} .sy-status i.sync{background:#E0A100}
@media (max-width:420px){.sy-chip .sy-label{display:none}.sy-chip:not(.user){padding:0;width:40px;justify-content:center}}
`;
const CLOUD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 18h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.1 9.2 4.5 4.5 0 0 0 7 18z"/></svg>`;

let root = null, chip = null, pop = null;

function ago(ts){
  if(!ts) return "zatím ne";
  const s = Math.round((Date.now() - ts) / 1000);
  if(s < 45) return "právě teď";
  if(s < 3600) return "před " + Math.round(s / 60) + " min";
  if(s < 86400) return "před " + Math.round(s / 3600) + " h";
  return new Date(ts).toLocaleDateString("cs-CZ");
}
function statusText(){
  if(status === "sync") return "Synchronizuji…";
  if(status === "err") return "Nepodařilo se (" + errMsg + ") – zkusím to znovu";
  return "Synchronizováno " + ago(state().at);
}
function setStatus(s){
  status = s;
  if(chip){ const d = chip.querySelector(".sy-dot"); if(d) d.className = "sy-dot " + (user ? s : ""); }
  const st = pop && !pop.hidden && pop.querySelector(".sy-status");
  if(st) st.innerHTML = `<i class="${status}"></i>${esc(statusText())}`;
}
const initial = () => ((user && (user.name || user.email)) || "?").trim().charAt(0).toUpperCase();

function renderChip(){
  if(!chip) return;
  if(user){
    chip.className = "sy-chip user";
    chip.innerHTML = `${esc(initial())}<i class="sy-dot ${status}"></i>`;
    chip.title = "Účet: " + (user.email || user.name) + " – synchronizace";
  }else{
    chip.className = "sy-chip";
    chip.innerHTML = `${CLOUD}<span class="sy-label">${cfg && cfg.enabled ? "Přihlásit" : "Sync"}</span>`;
    chip.title = "Přihlášení a synchronizace mezi zařízeními";
  }
}

function renderPop(){
  if(!pop || pop.hidden) return;
  if(!cfg.enabled){
    pop.innerHTML = `<h3>Synchronizace</h3>
      <p>Stejný postup na mobilu i na PC zatím není na serveru zapnutý.</p>
      <p class="note">Chybí nastavení: ${cfg.missing.map(esc).join(", ")}. Postup je v README v sekci „Synchronizace mezi zařízeními“.</p>`;
    return;
  }
  if(!user){
    pop.innerHTML = `<h3>Stejný postup všude</h3>
      <p>Přihlas se Google účtem na mobilu i na PC a postup se bude synchronizovat sám.</p>
      <div class="sy-gbtn" id="sy-gbtn"></div>
      <p class="sy-msg" aria-live="polite"></p>
      <p class="note">Ukládá se jen tvůj postup v učení. Data, která už máš v tomto zařízení, se po přihlášení sloučí s účtem.</p>`;
    const box = pop.querySelector("#sy-gbtn"), msg = pop.querySelector(".sy-msg");
    msg.textContent = "Načítám přihlášení Google…";
    loadGis().then(() => {
      msg.textContent = "";
      window.google.accounts.id.renderButton(box, {type: "standard", theme: darkTheme() ? "filled_black" : "outline", size: "large", text: "signin_with", shape: "pill", locale: "cs", width: 260});
    }).catch(() => { msg.textContent = "Přihlášení Google se nepodařilo načíst (jsi offline, nebo ho blokuje rozšíření prohlížeče)."; });
    return;
  }
  pop.innerHTML = `<div class="sy-who"><span class="av">${esc(initial())}</span><div><b>${esc(user.name || "Přihlášený účet")}</b><span>${esc(user.email)}</span></div></div>
    <p class="sy-status" aria-live="polite"><i class="${status}"></i>${esc(statusText())}</p>
    <p class="note">Postup se ukládá automaticky. Na druhém zařízení se přihlas stejným účtem.</p>
    <div class="row"><button class="btn primary" data-act="now">Synchronizovat teď</button><button class="btn ghost" data-act="out">Odhlásit</button></div>`;
  pop.querySelector('[data-act="now"]').addEventListener("click", async () => { if(await syncNow()) P.toast("Hotovo – postup je synchronizovaný"); });
  pop.querySelector('[data-act="out"]').addEventListener("click", logout);
}

function openPop(v){
  pop.hidden = !v; chip.setAttribute("aria-expanded", String(v));
  if(v) renderPop();
}

function mount(){
  const bar = document.querySelector(".topbar"); if(!bar) return;
  let tools = bar.querySelector(".tools");
  if(!tools){ tools = document.createElement("div"); tools.className = "tools"; bar.appendChild(tools); }
  const style = document.createElement("style"); style.textContent = CSS; document.head.appendChild(style);
  root = document.createElement("div"); root.className = "sy";
  root.innerHTML = `<button class="sy-chip" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="sy-pop"></button><div class="sy-pop" id="sy-pop" role="dialog" aria-label="Účet a synchronizace" hidden></div>`;
  tools.insertBefore(root, tools.firstChild);
  chip = root.querySelector(".sy-chip"); pop = root.querySelector(".sy-pop");
  chip.addEventListener("click", e => { e.stopPropagation(); openPop(pop.hidden); });
  document.addEventListener("click", e => { if(!pop.hidden && !root.contains(e.target)) openPop(false); });
  document.addEventListener("keydown", e => { if(e.key === "Escape" && !pop.hidden){ openPop(false); chip.focus(); } });
  renderChip();
}

async function init(){
  try{
    const r = await api("api/auth");
    if(!r.ok || !r.j || typeof r.j.enabled !== "boolean") return; /* no backend here: stay invisible */
    cfg = r.j; user = r.j.user || null;
  }catch(e){ return; }
  mount();
  if(user) syncNow();
}

P.sync = {now: syncNow, status: () => ({status, user, cfg, state: state(), dirty: [...dirtySet()]})};
if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
