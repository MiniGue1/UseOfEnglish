/* Merge rules for progress sync – shared by the browser (js/sync.js) and the server (api/sync.js).
   A synced item is {t, v} (value with its modification time) or {t, d:1} (deleted at time t).
   - Normal keys: the newer copy wins (whole key).
   - Logs (activity, *:history, *:log): both copies are joined, so practice done on two devices is never lost.
     A newer empty log counts as an explicit reset and wins. */
(function(root, factory){
  const api = factory();
  if(typeof module === "object" && module.exports) module.exports = api; else root.CaeMerge = api;
})(typeof self !== "undefined" ? self : this, function(){
  "use strict";
  const LOG_CAP = 2000;
  const isLog = ns => ns === "activity" || /:(history|log)$/.test(ns);
  const localOnly = ns => ns === "__meta" || ns === "theme" || ns.indexOf("sync:") === 0;

  function when(x){
    if(!x || typeof x !== "object") return null;
    for(const k of ["t", "ts", "date"]) if(typeof x[k] === "number") return x[k];
    return null;
  }
  function unionLog(a, b){
    const seen = new Set(), out = [];
    a.concat(b).forEach(x => { const k = JSON.stringify(x); if(!seen.has(k)){ seen.add(k); out.push(x); } });
    if(out.every(x => when(x) !== null)) out.sort((p, q) => when(p) - when(q));
    return out.length > LOG_CAP ? out.slice(-LOG_CAP) : out;
  }
  /* cur = copy already stored, inc = incoming copy; on equal times the stored copy is kept */
  function mergeItem(ns, cur, inc){
    if(!cur) return inc;
    if(!inc) return cur;
    const newer = inc.t > cur.t ? inc : cur;
    if(isLog(ns) && !cur.d && !inc.d && Array.isArray(cur.v) && Array.isArray(inc.v) && newer.v.length){
      return {t: Math.max(cur.t, inc.t), v: unionLog(cur.v, inc.v)};
    }
    return newer;
  }
  const sameValue = (a, b) => !!a.d === !!b.d && (a.d || JSON.stringify(a.v) === JSON.stringify(b.v));
  const sameItem = (a, b) => !!a && !!b && a.t === b.t && sameValue(a, b);
  /* validate an item received over the network */
  function cleanItem(x){
    if(!x || typeof x !== "object" || typeof x.t !== "number" || !isFinite(x.t) || x.t <= 0) return null;
    if(x.d) return {t: x.t, d: 1};
    if(!("v" in x)) return null;
    return {t: x.t, v: x.v};
  }
  const validNs = ns => typeof ns === "string" && ns.length > 0 && ns.length <= 120 && !localOnly(ns);
  return {mergeItem, sameItem, sameValue, cleanItem, validNs, isLog, localOnly, unionLog, LOG_CAP};
});
