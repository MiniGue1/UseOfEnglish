/* Shared helpers for the Vercel functions (files starting with "_" are not exposed as routes).
   Storage: Redis – Upstash REST API when its env vars exist, otherwise a plain Redis connection (REDIS_URL/KV_URL).
            Vercel → Storage → connect a Redis database to the project; any custom env prefix is detected.
   Login:   Google ID token verified once, then a random session id in an HttpOnly cookie. */
"use strict";
const crypto = require("crypto");
const net = require("net");
const tls = require("tls");

const COOKIE = "cae_sid";
const SESSION_TTL = 180 * 86400; /* seconds */

/* Google OAuth client of this portal. It is public (every browser receives it); GOOGLE_CLIENT_ID overrides it. */
const DEFAULT_CLIENT_ID = "392680412431-pl72oos02d71lqemnslpt43tbs0oq2na.apps.googleusercontent.com";
const clientId = () => process.env.GOOGLE_CLIENT_ID || DEFAULT_CLIENT_ID;

/* env var by exact name first, then with any prefix (e.g. STORAGE_KV_REST_API_URL) */
function env(names){
  for(const n of names) if(process.env[n]) return process.env[n];
  for(const n of names){
    const k = Object.keys(process.env).find(k => k.endsWith("_" + n) && process.env[k]);
    if(k) return process.env[k];
  }
  return "";
}
function redisTarget(){
  const url = env(["KV_REST_API_URL", "UPSTASH_REDIS_REST_URL"]);
  const token = env(["KV_REST_API_TOKEN", "UPSTASH_REDIS_REST_TOKEN"]);
  if(url && token) return {kind: "rest", url, token};
  const tcp = env(["REDIS_URL", "KV_URL"]);
  if(/^rediss?:\/\//.test(tcp)) return {kind: "tcp", url: tcp};
  return null;
}

function config(){
  const missing = [];
  if(!redisTarget()) missing.push("databáze Redis (Vercel → Storage → Upstash Redis → Connect Project)");
  return {enabled: missing.length === 0, missing, clientId: clientId()};
}

async function kv(command){
  const t = redisTarget();
  if(!t) throw new Error("no redis");
  if(t.kind === "tcp") return tcpCommand(t.url, command);
  const r = await fetch(t.url, {
    method: "POST",
    headers: {Authorization: "Bearer " + t.token, "Content-Type": "application/json"},
    body: JSON.stringify(command)
  });
  let j = null; try{ j = await r.json(); }catch(e){}
  if(!r.ok || !j || j.error) throw new Error("kv " + command[0] + ": " + ((j && j.error) || r.status));
  return j.result;
}

/* ---- minimal Redis protocol client (one connection per call, enough for GET/SET/DEL) ---- */
function encode(args){
  return args.map(a => String(a)).reduce((s, a) => s + "$" + Buffer.byteLength(a) + "\r\n" + a + "\r\n", "*" + args.length + "\r\n");
}
function parseReply(buf, pos){
  const nl = buf.indexOf("\r\n", pos);
  if(nl < 0) return null;
  const type = String.fromCharCode(buf[pos]), line = buf.toString("utf8", pos + 1, nl), next = nl + 2;
  if(type === "+") return {value: line, pos: next};
  if(type === "-") return {value: new Error("redis: " + line), pos: next};
  if(type === ":") return {value: Number(line), pos: next};
  if(type === "_") return {value: null, pos: next};
  if(type === "$"){
    const n = Number(line);
    if(n < 0) return {value: null, pos: next};
    if(buf.length < next + n + 2) return null;
    return {value: buf.toString("utf8", next, next + n), pos: next + n + 2};
  }
  if(type === "*"){
    const n = Number(line); if(n < 0) return {value: null, pos: next};
    const out = []; let p = next;
    for(let i = 0; i < n; i++){ const r = parseReply(buf, p); if(!r) return null; out.push(r.value); p = r.pos; }
    return {value: out, pos: p};
  }
  return {value: new Error("redis: bad reply"), pos: buf.length};
}
function tcpCommand(urlStr, command){
  const u = new URL(urlStr), secure = u.protocol === "rediss:";
  const cmds = [];
  if(u.password) cmds.push(u.username ? ["AUTH", decodeURIComponent(u.username), decodeURIComponent(u.password)] : ["AUTH", decodeURIComponent(u.password)]);
  const db = u.pathname.replace(/^\//, "");
  if(db) cmds.push(["SELECT", db]);
  cmds.push(command);
  return new Promise((resolve, reject) => {
    const opts = {host: u.hostname, port: Number(u.port) || 6379};
    const sock = secure ? tls.connect(Object.assign({servername: u.hostname}, opts)) : net.connect(opts);
    let buf = Buffer.alloc(0); const replies = [];
    const timer = setTimeout(() => { sock.destroy(); reject(new Error("redis timeout")); }, 8000);
    sock.on(secure ? "secureConnect" : "connect", () => sock.write(cmds.map(encode).join("")));
    sock.on("data", d => {
      buf = Buffer.concat([buf, d]);
      let r;
      while(replies.length < cmds.length && (r = parseReply(buf, 0))){ replies.push(r.value); buf = buf.subarray(r.pos); }
      if(replies.length === cmds.length){
        clearTimeout(timer); sock.end();
        const err = replies.find(x => x instanceof Error);
        if(err) reject(err); else resolve(replies[replies.length - 1]);
      }
    });
    sock.on("error", e => { clearTimeout(timer); reject(e); });
  });
}

function cookies(req){
  const out = {};
  String(req.headers.cookie || "").split(";").forEach(p => {
    const i = p.indexOf("="); if(i < 0) return;
    out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}
const sessionCookie = (sid, maxAge) => `${COOKIE}=${sid}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
const newSessionId = () => crypto.randomBytes(32).toString("hex");

async function getSession(req){
  const sid = cookies(req)[COOKIE];
  if(!sid || !/^[a-f0-9]{64}$/.test(sid)) return null;
  const raw = await kv(["GET", "s:" + sid]);
  if(!raw) return null;
  try{ return Object.assign({sid}, JSON.parse(raw)); }catch(e){ return null; }
}

/* state-changing requests must come from our own pages (the cookie is SameSite=Lax as well) */
function sameOrigin(req){
  const o = req.headers.origin;
  if(!o) return true;
  try{ return new URL(o).host === req.headers.host; }catch(e){ return false; }
}

async function readBody(req, limit){
  if(req.body !== undefined && req.body !== null){
    if(typeof req.body === "string") return req.body ? JSON.parse(req.body) : {};
    if(Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString("utf8") || "{}");
    return req.body;
  }
  const chunks = []; let size = 0;
  for await (const c of req){ size += c.length; if(size > limit) throw Object.assign(new Error("too large"), {status: 413}); chunks.push(c); }
  const s = Buffer.concat(chunks).toString("utf8");
  return s ? JSON.parse(s) : {};
}

function send(res, status, body, headers){
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  Object.entries(headers || {}).forEach(([k, v]) => res.setHeader(k, v));
  res.end(JSON.stringify(body));
}

module.exports = {config, kv, getSession, sessionCookie, newSessionId, sameOrigin, readBody, send, SESSION_TTL};
