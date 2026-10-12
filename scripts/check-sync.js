/* Tests for progress sync: merge rules (js/sync-merge.js) and the api/ functions with a fake Upstash Redis
   and a fake Google tokeninfo endpoint. Run: node scripts/check-sync.js */
"use strict";
const path = require("path");
const assert = require("assert");
const root = path.join(__dirname, "..");
const M = require(path.join(root, "js/sync-merge.js"));

let passed = 0;
const test = async (name, fn) => { try{ await fn(); passed++; }catch(e){ console.error("✗ " + name + "\n  " + (e && e.stack || e)); process.exitCode = 1; } };

/* ---------- fake services ---------- */
const KV = new Map();
const TOKENS = {
  "tok-anna": {aud: "client-1", iss: "accounts.google.com", sub: "anna", email: "anna@example.com", name: "Anna"},
  "tok-other-aud": {aud: "someone-else", iss: "accounts.google.com", sub: "x"},
  "tok-expired": {aud: "client-1", iss: "accounts.google.com", sub: "y", exp: String(Math.floor(Date.now() / 1000) - 10)}
};
global.fetch = async (url, opts) => {
  url = String(url);
  if(url.startsWith("https://kv.test")){
    assert.strictEqual(opts.headers.Authorization, "Bearer kv-token");
    const [cmd, key, val] = JSON.parse(opts.body);
    let result = null;
    if(cmd === "GET") result = KV.has(key) ? KV.get(key) : null;
    else if(cmd === "SET"){ KV.set(key, val); result = "OK"; }
    else if(cmd === "DEL"){ result = KV.delete(key) ? 1 : 0; }
    else return {ok: false, status: 400, json: async () => ({error: "unknown command"})};
    return {ok: true, status: 200, json: async () => ({result})};
  }
  if(url.startsWith("https://oauth2.googleapis.com/tokeninfo?id_token=")){
    const tok = decodeURIComponent(url.split("=")[1]);
    const info = TOKENS[tok];
    if(!info) return {ok: false, status: 400, json: async () => ({error: "invalid_token"})};
    return {ok: true, status: 200, json: async () => Object.assign({exp: String(Math.floor(Date.now() / 1000) + 3600)}, info)};
  }
  throw new Error("unexpected fetch " + url);
};
const setEnv = on => {
  if(on){ process.env.GOOGLE_CLIENT_ID = "client-1"; process.env.KV_REST_API_URL = "https://kv.test"; process.env.KV_REST_API_TOKEN = "kv-token"; }
  else ["GOOGLE_CLIENT_ID", "KV_REST_API_URL", "KV_REST_API_TOKEN", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"].forEach(k => delete process.env[k]);
};
const auth = require(path.join(root, "api/auth.js"));
const sync = require(path.join(root, "api/sync.js"));

function call(handler, {method = "GET", body, cookie, origin} = {}){
  return new Promise((resolve, reject) => {
    const req = {method, body, headers: {host: "portal.test"}};
    if(cookie) req.headers.cookie = cookie;
    if(origin) req.headers.origin = origin;
    const res = {statusCode: 200, headers: {}, setHeader(k, v){ this.headers[k.toLowerCase()] = v; },
      end(s){ try{ resolve({status: this.statusCode, headers: this.headers, json: s ? JSON.parse(s) : null}); }catch(e){ reject(e); } }};
    Promise.resolve(handler(req, res)).catch(reject);
  });
}
const cookieOf = r => (r.headers["set-cookie"] || "").split(";")[0];

(async () => {
  /* ---------- merge rules ---------- */
  await test("newer copy wins, ties keep the stored copy", () => {
    assert.deepStrictEqual(M.mergeItem("vocab:srs", {t: 5, v: {a: 1}}, {t: 9, v: {b: 2}}), {t: 9, v: {b: 2}});
    assert.deepStrictEqual(M.mergeItem("vocab:srs", {t: 9, v: {a: 1}}, {t: 5, v: {b: 2}}), {t: 9, v: {a: 1}});
    assert.deepStrictEqual(M.mergeItem("vocab:srs", {t: 5, v: 1}, {t: 5, v: 2}), {t: 5, v: 1});
  });
  await test("deletions are ordinary items with a time", () => {
    assert.deepStrictEqual(M.mergeItem("plan", {t: 5, v: {x: 1}}, {t: 6, d: 1}), {t: 6, d: 1});
    assert.deepStrictEqual(M.mergeItem("plan", {t: 7, v: {x: 1}}, {t: 6, d: 1}), {t: 7, v: {x: 1}});
  });
  await test("logs from two devices are joined, sorted and de-duplicated", () => {
    const a = {t: 10, v: [{t: 1, m: "uoe"}, {t: 3, m: "uoe"}]}, b = {t: 12, v: [{t: 2, m: "vocab"}, {t: 3, m: "uoe"}]};
    const r = M.mergeItem("activity", a, b);
    assert.strictEqual(r.t, 12);
    assert.deepStrictEqual(r.v.map(x => x.t), [1, 2, 3]);
    assert.ok(M.isLog("writing:history") && M.isLog("mock:history") && !M.isLog("vocab:srs"));
  });
  await test("a newer empty log is a reset", () => {
    assert.deepStrictEqual(M.mergeItem("activity", {t: 1, v: [{t: 1}]}, {t: 2, v: []}), {t: 2, v: []});
  });
  await test("logs are capped", () => {
    const big = n => Array.from({length: n}, (_, i) => ({t: i}));
    assert.strictEqual(M.mergeItem("activity", {t: 1, v: big(1500)}, {t: 2, v: big(2500)}).v.length, M.LOG_CAP);
  });
  await test("device-local keys never sync; malformed items are rejected", () => {
    ["__meta", "theme", "sync:state", "sync:dirty"].forEach(ns => assert.ok(!M.validNs(ns), ns));
    assert.ok(M.validNs("uoe:state"));
    assert.strictEqual(M.cleanItem({t: "5", v: 1}), null);
    assert.strictEqual(M.cleanItem({t: 0, v: 1}), null);
    assert.strictEqual(M.cleanItem({t: 5}), null);
    assert.deepStrictEqual(M.cleanItem({t: 5, d: true, v: 9}), {t: 5, d: 1});
  });

  /* ---------- api: not configured ---------- */
  setEnv(false);
  await test("without env vars the API reports what is missing", async () => {
    const r = await call(auth);
    assert.strictEqual(r.status, 200);
    assert.strictEqual(r.json.enabled, false);
    assert.strictEqual(r.json.missing.length, 2);
    assert.strictEqual((await call(sync, {method: "POST", body: {}})).status, 503);
  });

  /* ---------- api: login ---------- */
  setEnv(true);
  let annaPhone, annaPc;
  await test("GET /api/auth exposes the client id and no user", async () => {
    const r = await call(auth);
    assert.deepStrictEqual([r.json.enabled, r.json.clientId, r.json.user], [true, "client-1", null]);
  });
  await test("tokens for another client, expired or unknown tokens are refused", async () => {
    for(const credential of ["tok-other-aud", "tok-expired", "garbage"]){
      const r = await call(auth, {method: "POST", body: {credential}});
      assert.strictEqual(r.status, 401, credential);
      assert.ok(!r.headers["set-cookie"]);
    }
    assert.strictEqual((await call(auth, {method: "POST", body: {}})).status, 400);
  });
  await test("cross-site requests are refused", async () => {
    assert.strictEqual((await call(auth, {method: "POST", body: {credential: "tok-anna"}, origin: "https://evil.example"})).status, 403);
  });
  await test("valid Google token logs in on two devices with separate sessions", async () => {
    const a = await call(auth, {method: "POST", body: {credential: "tok-anna"}, origin: "https://portal.test"});
    const b = await call(auth, {method: "POST", body: JSON.stringify({credential: "tok-anna"})});
    assert.strictEqual(a.status, 200); assert.strictEqual(a.json.user.email, "anna@example.com");
    assert.ok(/HttpOnly/.test(a.headers["set-cookie"]) && /Secure/.test(a.headers["set-cookie"]) && /SameSite=Lax/.test(a.headers["set-cookie"]));
    annaPhone = cookieOf(a); annaPc = cookieOf(b);
    assert.notStrictEqual(annaPhone, annaPc);
    const me = await call(auth, {cookie: annaPhone});
    assert.strictEqual(me.json.user.name, "Anna");
    assert.ok(!("sub" in me.json.user));
  });

  /* ---------- api: sync ---------- */
  await test("sync needs a session", async () => {
    assert.strictEqual((await call(sync, {method: "POST", body: {}})).status, 401);
    assert.strictEqual((await call(sync, {method: "POST", body: {}, cookie: "cae_sid=" + "a".repeat(64)})).status, 401);
    assert.strictEqual((await call(sync, {method: "GET", cookie: annaPhone})).status, 405);
  });
  let pcSeq = 0, phoneSeq = 0;
  await test("PC uploads its progress (first sync sends everything)", async () => {
    const r = await call(sync, {method: "POST", cookie: annaPc, body: {lastSeq: 0, changes: {
      "uoe:state": {t: 100, v: {items: {a: 1}}},
      "activity": {t: 100, v: [{t: 10, m: "uoe"}]},
      "theme": {t: 100, v: "dark"},          /* device-local: ignored */
      "bad": {t: "x", v: 1}                  /* malformed: ignored */
    }}});
    assert.strictEqual(r.status, 200);
    assert.deepStrictEqual(Object.keys(r.json.items).sort(), ["activity", "uoe:state"]);
    pcSeq = r.json.seq;
  });
  await test("phone gets PC progress, its own log entries are joined, older key loses", async () => {
    const r = await call(sync, {method: "POST", cookie: annaPhone, body: {lastSeq: 0, changes: {
      "uoe:state": {t: 50, v: {items: {old: 1}}},
      "activity": {t: 60, v: [{t: 20, m: "vocab"}]},
      "vocab:srs": {t: 70, v: {w1: {due: 1}}}
    }}});
    assert.deepStrictEqual(r.json.items["uoe:state"], {t: 100, v: {items: {a: 1}}});
    assert.deepStrictEqual(r.json.items.activity.v.map(x => x.m), ["uoe", "vocab"]);
    assert.ok(r.json.items["vocab:srs"]);
    phoneSeq = r.json.seq;
  });
  await test("incremental sync only returns what changed since lastSeq", async () => {
    const r = await call(sync, {method: "POST", cookie: annaPc, body: {lastSeq: pcSeq, changes: {}}});
    assert.deepStrictEqual(Object.keys(r.json.items).sort(), ["activity", "vocab:srs"]);
    pcSeq = r.json.seq;
    const again = await call(sync, {method: "POST", cookie: annaPc, body: {lastSeq: pcSeq, changes: {}}});
    assert.deepStrictEqual(again.json.items, {});
    assert.strictEqual(again.json.seq, pcSeq);
  });
  await test("re-sending an identical item does not bump seq", async () => {
    const r = await call(sync, {method: "POST", cookie: annaPc, body: {lastSeq: pcSeq, changes: {"uoe:state": {t: 100, v: {items: {a: 1}}}}}});
    assert.strictEqual(r.json.seq, pcSeq);
  });
  await test("a deletion travels to the other device", async () => {
    await call(sync, {method: "POST", cookie: annaPhone, body: {lastSeq: phoneSeq, changes: {"vocab:srs": {t: 200, d: 1}}}});
    const r = await call(sync, {method: "POST", cookie: annaPc, body: {lastSeq: pcSeq, changes: {}}});
    assert.deepStrictEqual(r.json.items["vocab:srs"], {t: 200, d: 1});
    pcSeq = r.json.seq;
  });
  await test("a client that is ahead of the server receives everything", async () => {
    const r = await call(sync, {method: "POST", cookie: annaPc, body: {lastSeq: pcSeq + 50, changes: {}}});
    assert.strictEqual(r.json.full, true);
    assert.ok(Object.keys(r.json.items).length >= 3);
  });
  await test("oversized data is refused without losing the stored copy", async () => {
    const before = KV.get("u:anna");
    const r = await call(sync, {method: "POST", cookie: annaPc, body: {lastSeq: pcSeq, changes: {"writing:drafts": {t: 300, v: "x".repeat(1000000)}}}});
    assert.strictEqual(r.status, 413);
    assert.strictEqual(KV.get("u:anna"), before);
  });
  await test("data is stored per Google account", async () => {
    assert.deepStrictEqual([...KV.keys()].filter(k => k.startsWith("u:")), ["u:anna"]);
  });
  await test("logout ends only that device's session", async () => {
    const r = await call(auth, {method: "DELETE", cookie: annaPhone});
    assert.ok(/Max-Age=0/.test(r.headers["set-cookie"]));
    assert.strictEqual((await call(sync, {method: "POST", cookie: annaPhone, body: {}})).status, 401);
    assert.strictEqual((await call(sync, {method: "POST", cookie: annaPc, body: {}})).status, 200);
  });

  console.log(process.exitCode ? "check-sync: FAILED" : `check-sync: ${passed} checks OK`);
})();
