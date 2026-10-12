/* POST /api/sync  {lastSeq, changes: {ns: {t, v} | {t, d:1}}}
   Merges the device's changes into the stored copy (rules in js/sync-merge.js) and returns every item
   that changed on the server since `lastSeq`, plus the new `seq`.
   Stored per Google account in Redis as u:<sub> = {seq, items: {ns: {t, v|d, s}}} (s = seq of last write). */
"use strict";
const {config, kv, getSession, sameOrigin, readBody, send} = require("./_lib.js");
const M = require("../js/sync-merge.js");

const MAX_BODY = 1500000;  /* bytes accepted from one device */
const MAX_DOC = 900000;    /* stored copy, stays under Upstash's request size limit */

module.exports = async function handler(req, res){
  const cfg = config();
  try{
    if(!cfg.enabled) return send(res, 503, {error: "not_configured", missing: cfg.missing});
    if(req.method !== "POST") return send(res, 405, {error: "method"});
    if(!sameOrigin(req)) return send(res, 403, {error: "origin"});
    const sess = await getSession(req);
    if(!sess) return send(res, 401, {error: "auth"});

    const body = await readBody(req, MAX_BODY);
    const lastSeq = Math.max(0, Math.floor(Number(body && body.lastSeq) || 0));
    const changes = body && body.changes && typeof body.changes === "object" && !Array.isArray(body.changes) ? body.changes : {};

    const key = "u:" + sess.sub;
    const raw = await kv(["GET", key]);
    let doc = {seq: 0, items: {}};
    if(raw){ try{ doc = JSON.parse(raw); }catch(e){} }
    if(!doc.items || typeof doc.items !== "object") doc = {seq: 0, items: {}};

    let changed = false;
    for(const ns of Object.keys(changes)){
      if(!M.validNs(ns)) continue;
      const inc = M.cleanItem(changes[ns]);
      if(!inc) continue;
      const stored = doc.items[ns];
      const cur = stored ? M.cleanItem(stored) : null;
      const merged = M.mergeItem(ns, cur, inc);
      if(cur && M.sameItem(cur, merged)) continue;
      doc.seq += 1;
      doc.items[ns] = Object.assign({}, merged, {s: doc.seq});
      changed = true;
    }

    if(changed){
      const str = JSON.stringify(doc);
      if(str.length > MAX_DOC) return send(res, 413, {error: "too_large"});
      await kv(["SET", key, str]);
    }

    /* a client that is ahead of the server (data was reset) gets everything again */
    const since = lastSeq > doc.seq ? 0 : lastSeq;
    const items = {};
    Object.keys(doc.items).forEach(ns => {
      const it = doc.items[ns];
      if(it.s > since) items[ns] = it.d ? {t: it.t, d: 1} : {t: it.t, v: it.v};
    });
    return send(res, 200, {seq: doc.seq, items, full: since === 0});
  }catch(e){
    console.error("sync", e && e.message);
    return send(res, e && e.status === 413 ? 413 : 500, {error: e && e.status === 413 ? "too_large" : "server"});
  }
};
