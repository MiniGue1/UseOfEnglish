/* C1 Advanced portál – service worker (offline).
   PO KAŽDÉ ZMĚNĚ SOUBORŮ zvyš VERSION (viz README) – tím se stáhne nová cache a stará se smaže.
   Nový soubor (data/modul) přidej do PRECACHE. */
const VERSION = "cae-v2";
const STATIC_CACHE = VERSION + "-static";
const RUNTIME_CACHE = VERSION + "-runtime";

const PRECACHE = [
  "./",
  "manifest.json",
  "icon-192.png",
  "icon-512.png",
  "css/app.css",
  "js/core.js",
  /* data */
  "js/data/uoe.js",
  "js/data/reading.js",
  "js/data/reading78.js",
  "js/data/listening.js",
  "js/data/writing.js",
  "js/data/speaking.js",
  "js/data/vocab.js",
  /* modules */
  "js/modules/home.js",
  "js/modules/uoe.js",
  "js/modules/reading.js",
  "js/modules/listening.js",
  "js/modules/writing.js",
  "js/modules/speaking.js",
  "js/modules/vocab.js",
  "js/modules/mock.js",
  "js/data/uoe-lessons.js"
];

/* Responses that followed a redirect (e.g. Vercel cleanUrls: /index.html -> /) cannot be served to
   navigations, so store a clean copy. */
async function clean(res){
  if(!res || !res.redirected) return res;
  const body = await res.blob();
  return new Response(body, {status: res.status, statusText: res.statusText, headers: res.headers});
}

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(STATIC_CACHE);
    /* add one by one: a missing file must not break the whole install */
    await Promise.all(PRECACHE.map(async url => {
      try{
        const res = await fetch(new Request(url, {cache: "reload"}));
        if(res.ok) await cache.put(url, await clean(res));
      }catch(e){ /* offline during install – ignore */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => !k.startsWith(VERSION + "-")).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

const isCode = url => /\.(?:html|js|css|json)$/.test(url.pathname) || url.pathname.endsWith("/");

async function staleWhileRevalidate(event, req, cacheName, fallbackKey){
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req, {ignoreSearch: req.mode === "navigate"}) || (fallbackKey && await caches.match(fallbackKey));
  const network = fetch(req).then(async res => {
    if(res && res.ok && res.type !== "opaque") await cache.put(req.mode === "navigate" ? (fallbackKey || req) : req, await clean(res.clone()));
    return res;
  }).catch(() => null);
  if(cached){ event.waitUntil(network); return cached; }
  const res = await network;
  return res || new Response("Offline – tento soubor zatím není v mezipaměti.", {status: 503, headers: {"Content-Type": "text/plain; charset=utf-8"}});
}

async function cacheFirst(req, cacheName){
  const cached = await caches.match(req);
  if(cached) return cached;
  try{
    const res = await fetch(req);
    if(res && (res.ok || res.type === "opaque")){ const c = await caches.open(cacheName); await c.put(req, await clean(res.clone())); }
    return res;
  }catch(e){
    return new Response("", {status: 503, statusText: "offline"});
  }
}

self.addEventListener("fetch", event => {
  const req = event.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);

  /* Google Fonts: cache-first, failures are silent (system fonts fallback in CSS) */
  if(url.origin !== location.origin){
    if(/(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) event.respondWith(cacheFirst(req, RUNTIME_CACHE));
    return; /* any other cross-origin request: let the browser handle it */
  }
  if(req.mode === "navigate"){
    event.respondWith(staleWhileRevalidate(event, req, STATIC_CACHE, "./"));
    return;
  }
  if(isCode(url)){
    event.respondWith(staleWhileRevalidate(event, req, STATIC_CACHE));
    return;
  }
  event.respondWith(cacheFirst(req, STATIC_CACHE));
});
