/* Tests for the AI writing feedback (api/write-check.js) with a fake Redis, fake Google tokeninfo and fake Gemini.
   Run: node scripts/check-write.js */
"use strict";
const path = require("path");
const assert = require("assert");
const root = path.join(__dirname, "..");

let passed = 0;
const test = async (name, fn) => { try{ await fn(); passed++; }catch(e){ console.error("✗ " + name + "\n  " + (e && e.stack || e)); process.exitCode = 1; } };

/* ---------- fakes ---------- */
const KV = new Map();
let gemini = null;            /* (body) => {status, json} */
let geminiCalls = [];
global.fetch = async (url, opts) => {
  url = String(url);
  if(url.startsWith("https://kv.test")){
    const [cmd, key, val] = JSON.parse(opts.body);
    let result = null;
    if(cmd === "GET") result = KV.has(key) ? KV.get(key) : null;
    else if(cmd === "SET"){ KV.set(key, val); result = "OK"; }
    else if(cmd === "DEL") result = KV.delete(key) ? 1 : 0;
    else if(cmd === "INCR"){ result = (Number(KV.get(key)) || 0) + 1; KV.set(key, String(result)); }
    else if(cmd === "DECR"){ result = (Number(KV.get(key)) || 0) - 1; KV.set(key, String(result)); }
    else if(cmd === "EXPIRE") result = 1;
    else return {ok: false, status: 400, json: async () => ({error: "unknown command " + cmd})};
    return {ok: true, status: 200, json: async () => ({result})};
  }
  if(url.startsWith("https://oauth2.googleapis.com/tokeninfo?id_token=tok-anna")){
    return {ok: true, status: 200, json: async () => ({aud: "client-1", iss: "accounts.google.com", sub: "anna", email: "a@x.cz", exp: String(Math.floor(Date.now() / 1000) + 3600)})};
  }
  if(url.startsWith("https://generativelanguage.googleapis.com/v1beta/models/")){
    assert.strictEqual(opts.headers["x-goog-api-key"], "gem-key");
    const body = JSON.parse(opts.body); geminiCalls.push({url, body});
    const r = gemini(body);
    return {ok: r.status === 200, status: r.status, json: async () => r.json};
  }
  throw new Error("unexpected fetch " + url);
};
process.env.GOOGLE_CLIENT_ID = "client-1";
process.env.KV_REST_API_URL = "https://kv.test"; process.env.KV_REST_API_TOKEN = "kv-token";
const auth = require(path.join(root, "api/auth.js"));
const wc = require(path.join(root, "api/write-check.js"));

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

const TEXT = "Smartphones have changed how teenagers live. Parents should set clear rules at home, for example no phones at dinner. " +
  "However, companies design apps to be addictive, so families cannot solve the problem alone. In my opinion the companies " +
  "are more responsible because they have more power and they earn money from our attention. Governments should make them change.";
const TASK = {part: 1, type: "essay", register: "neutral", title: "Smartphones", question: "Who should be responsible?", points: ["parents", "companies", "schools"], opinions: ["x"], task: "Write an essay"};
const good = () => ({
  scores: {content: {band: 3, why: "Dva body"}, communicative: {band: 4, why: "ok"}, organisation: {band: 7, why: "too high"}, language: {band: 3, why: "ok"}},
  summary: "Solidní C1.", strengths: ["a", "b", "c", "d"], priorities: ["x", "y", "z"],
  errors: [{quote: "In my opinion the companies", fix: "In my opinion, the companies", type: "punctuation", why: "čárka"},
           {quote: "not in the text", fix: "y", type: "weird", why: "?"}],
  stilted: [], improved: "Better text."
});
const geminiOK = obj => () => ({status: 200, json: {candidates: [{content: {parts: [{text: "thinking…", thought: true}, {text: JSON.stringify(obj)}]}, finishReason: "STOP"}]}});

(async () => {
  await test("without the Gemini key the feature reports what is missing", async () => {
    const r = await call(wc);
    assert.strictEqual(r.json.enabled, false);
    assert.ok(r.json.missing.some(m => /GEMINI_API_KEY/.test(m)));
    assert.strictEqual((await call(wc, {method: "POST", body: {text: TEXT}})).status, 503);
  });

  process.env.GEMINI_API_KEY = "gem-key"; process.env.WRITE_CHECK_DAILY = "2";
  const login = await call(auth, {method: "POST", body: {credential: "tok-anna"}});
  const cookie = login.headers["set-cookie"].split(";")[0];

  await test("needs a signed-in user and a same-origin request", async () => {
    assert.strictEqual((await call(wc, {method: "POST", body: {text: TEXT}})).status, 401);
    assert.strictEqual((await call(wc, {method: "POST", body: {text: TEXT}, cookie, origin: "https://evil.example"})).status, 403);
  });
  await test("text length is checked before anything is spent", async () => {
    geminiCalls = [];
    const r = await call(wc, {method: "POST", cookie, body: {text: "Too short.", task: TASK}});
    assert.strictEqual(r.status, 400); assert.strictEqual(r.json.error, "length");
    assert.strictEqual(geminiCalls.length, 0);
  });
  await test("a check sends the examiner brief, task and text, and cleans the model output", async () => {
    geminiCalls = []; gemini = geminiOK(good());
    const r = await call(wc, {method: "POST", cookie, body: {text: TEXT, task: Object.assign({}, TASK, {type: "<script>"})}});
    assert.strictEqual(r.status, 200, JSON.stringify(r.json));
    const sent = geminiCalls[0].body;
    assert.ok(/Cambridge English C1 Advanced/.test(sent.systemInstruction.parts[0].text));
    assert.ok(/Do NOT reward rare or C2-level words/.test(sent.systemInstruction.parts[0].text));
    assert.strictEqual(sent.generationConfig.responseMimeType, "application/json");
    assert.ok(sent.generationConfig.responseJsonSchema.properties.scores);
    const user = sent.contents[0].parts[0].text;
    assert.ok(/discuss TWO of these/.test(user) && user.includes(TEXT) && /Part 1 – essay/.test(user), "task type sanitised to essay");
    const res = r.json.result;
    assert.strictEqual(res.scores.organisation.band, 5, "band clamped to 5");
    assert.strictEqual(res.total, 3 + 4 + 5 + 3);
    assert.strictEqual(res.strengths.length, 3);
    assert.strictEqual(res.errors.length, 2);
    assert.strictEqual(res.errors[0].found, true); assert.strictEqual(res.errors[1].found, false);
    assert.strictEqual(res.errors[1].type, "other", "unknown error type mapped");
    assert.strictEqual(r.json.remaining, 1);
  });
  await test("B2 First checks use the B2 examiner brief and word range", async () => {
    const ck = [...KV.keys()].find(k => k.startsWith("wc:anna:")), saved = KV.get(ck);
    geminiCalls = []; gemini = geminiOK(good());
    KV.set(ck, "0");
    const r = await call(wc, {method: "POST", cookie, body: {level: "b2", text: TEXT, task: Object.assign({}, TASK, {points: ["parents", "companies"]})}});
    assert.strictEqual(r.status, 200);
    const sent = geminiCalls[0].body;
    assert.ok(/B2 First \(FCE\) Writing examiner/.test(sent.systemInstruction.parts[0].text));
    const user = sent.contents[0].parts[0].text;
    assert.ok(/B2 First Writing Part 1/.test(user) && /Write 140–190 words/.test(user) && /BOTH notes and add your own idea/.test(user));
    KV.set(ck, "0");
    await call(wc, {method: "POST", cookie, body: {text: TEXT, task: TASK}});
    assert.ok(/C1 Advanced \(CAE\) Writing examiner/.test(geminiCalls[1].body.systemInstruction.parts[0].text), "default stays C1");
    KV.set(ck, saved);   /* leave the counter as the later tests expect */
  });
  await test("Gemini errors and broken output do not use up the daily quota", async () => {
    const before = KV.get([...KV.keys()].find(k => k.startsWith("wc:anna:")));
    gemini = () => ({status: 429, json: {error: {message: "quota"}}});
    const busy = await call(wc, {method: "POST", cookie, body: {text: TEXT, task: TASK}});
    assert.strictEqual(busy.status, 429); assert.strictEqual(busy.json.error, "busy");
    gemini = () => ({status: 402, json: {error: {code: 402, status: "FAILED_PRECONDITION", message: "Your prepayment credits are depleted."}}});
    const noCredit = await call(wc, {method: "POST", cookie, body: {text: TEXT, task: TASK}});
    assert.strictEqual(noCredit.status, 502); assert.strictEqual(noCredit.json.detail.gemini, 402);
    assert.ok(/credits are depleted/.test(noCredit.json.detail.message), "reason passed to the user");
    gemini = () => ({status: 200, json: {candidates: [{content: {parts: [{text: "{\"scores\":"}]}, finishReason: "MAX_TOKENS"}]}});
    assert.strictEqual((await call(wc, {method: "POST", cookie, body: {text: TEXT, task: TASK}})).json.detail.reason, "MAX_TOKENS");
    gemini = () => ({status: 200, json: {candidates: [{content: {parts: [{text: "not json"}]}}]}});
    assert.strictEqual((await call(wc, {method: "POST", cookie, body: {text: TEXT, task: TASK}})).status, 502);
    gemini = () => ({status: 200, json: {promptFeedback: {blockReason: "SAFETY"}}});
    assert.strictEqual((await call(wc, {method: "POST", cookie, body: {text: TEXT, task: TASK}})).status, 502);
    assert.strictEqual(KV.get([...KV.keys()].find(k => k.startsWith("wc:anna:"))), before);
  });
  await test("daily limit per account", async () => {
    gemini = geminiOK(good());
    assert.strictEqual((await call(wc, {method: "POST", cookie, body: {text: TEXT, task: TASK}})).status, 200);
    const over = await call(wc, {method: "POST", cookie, body: {text: TEXT, task: TASK}});
    assert.strictEqual(over.status, 429); assert.strictEqual(over.json.error, "limit"); assert.strictEqual(over.json.daily, 2);
    const st = await call(wc, {cookie});
    assert.deepStrictEqual([st.json.enabled, st.json.daily, st.json.used], [true, 2, 2]);
  });
  await test("the API key never appears in a response", async () => {
    const r = await call(wc, {cookie});
    assert.ok(!JSON.stringify(r).includes("gem-key"));
  });

  console.log(process.exitCode ? "check-write: FAILED" : `check-write: ${passed} checks OK`);
})();
