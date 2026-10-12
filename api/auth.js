/* GET    /api/auth  -> {enabled, missing, clientId, user}
   POST   /api/auth  {credential: <Google ID token>} -> logs in, sets the session cookie
   DELETE /api/auth  -> logs out */
"use strict";
const {config, kv, getSession, sessionCookie, newSessionId, sameOrigin, readBody, send, SESSION_TTL} = require("./_lib.js");

const GOOGLE_ISSUERS = ["accounts.google.com", "https://accounts.google.com"];
const publicUser = u => ({email: u.email || "", name: u.name || "", picture: u.picture || ""});

/* Google's tokeninfo endpoint checks the signature and expiry; we check that the token was issued for our client. */
async function verifyGoogle(credential, clientId){
  const r = await fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + encodeURIComponent(credential));
  if(!r.ok) return null;
  const info = await r.json();
  if(info.aud !== clientId || !GOOGLE_ISSUERS.includes(info.iss) || !info.sub) return null;
  if(!(Number(info.exp) * 1000 > Date.now())) return null;
  return {sub: String(info.sub), email: info.email || "", name: info.name || "", picture: info.picture || ""};
}

module.exports = async function handler(req, res){
  const cfg = config();
  try{
    if(req.method === "GET"){
      const s = cfg.enabled ? await getSession(req) : null;
      return send(res, 200, {enabled: cfg.enabled, missing: cfg.missing, clientId: cfg.enabled ? cfg.clientId : "", user: s ? publicUser(s) : null});
    }
    if(!cfg.enabled) return send(res, 503, {error: "not_configured", missing: cfg.missing});
    if(!sameOrigin(req)) return send(res, 403, {error: "origin"});

    if(req.method === "POST"){
      const body = await readBody(req, 16384);
      const cred = body && body.credential;
      if(typeof cred !== "string" || !cred || cred.length > 8192) return send(res, 400, {error: "bad_request"});
      const user = await verifyGoogle(cred, cfg.clientId);
      if(!user) return send(res, 401, {error: "invalid_token"});
      const sid = newSessionId();
      await kv(["SET", "s:" + sid, JSON.stringify(user), "EX", String(SESSION_TTL)]);
      return send(res, 200, {user: publicUser(user)}, {"Set-Cookie": sessionCookie(sid, SESSION_TTL)});
    }
    if(req.method === "DELETE"){
      const s = await getSession(req);
      if(s) await kv(["DEL", "s:" + s.sid]);
      return send(res, 200, {ok: true}, {"Set-Cookie": sessionCookie("", 0)});
    }
    return send(res, 405, {error: "method"});
  }catch(e){
    console.error("auth", e && e.message);
    return send(res, e && e.status === 413 ? 413 : 500, {error: "server"});
  }
};
