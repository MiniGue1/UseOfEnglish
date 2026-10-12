/* Shared helpers for the Vercel functions (files starting with "_" are not exposed as routes).
   Storage: Upstash Redis over its REST API (Vercel → Storage → Upstash Redis sets the env vars).
   Login:   Google ID token verified once, then a random session id in an HttpOnly cookie. */
"use strict";
const crypto = require("crypto");

const COOKIE = "cae_sid";
const SESSION_TTL = 180 * 86400; /* seconds */

const kvUrl = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const kvToken = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const clientId = () => process.env.GOOGLE_CLIENT_ID || "";

function config(){
  const missing = [];
  if(!clientId()) missing.push("GOOGLE_CLIENT_ID");
  if(!kvUrl() || !kvToken()) missing.push("Upstash Redis (KV_REST_API_URL, KV_REST_API_TOKEN)");
  return {enabled: missing.length === 0, missing, clientId: clientId()};
}

async function kv(command){
  const r = await fetch(kvUrl(), {
    method: "POST",
    headers: {Authorization: "Bearer " + kvToken(), "Content-Type": "application/json"},
    body: JSON.stringify(command)
  });
  let j = null; try{ j = await r.json(); }catch(e){}
  if(!r.ok || !j || j.error) throw new Error("kv " + command[0] + ": " + ((j && j.error) || r.status));
  return j.result;
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
