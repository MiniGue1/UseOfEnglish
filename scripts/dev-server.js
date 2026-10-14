/* Local static server that behaves like the Vercel setup for page routing: /b2 -> b2/index.html.
   No api/ functions (the account chip stays hidden). Usage: node scripts/dev-server.js [port] */
"use strict";
const http = require("http"), fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, ".."), PORT = +process.argv[2] || 8000;
const TYPES = {".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml"};
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if(p === "/b2") p = "/b2/index.html";
  if(p.endsWith("/")) p += "index.html";
  const file = path.join(ROOT, p);
  if(!file.startsWith(ROOT)){ res.statusCode = 403; return res.end(); }
  fs.readFile(file, (err, data) => {
    if(err){ res.statusCode = 404; return res.end("not found"); }
    res.setHeader("Content-Type", TYPES[path.extname(file)] || "application/octet-stream");
    res.end(data);
  });
}).listen(PORT, () => console.log("http://localhost:" + PORT + "/  (C1)   http://localhost:" + PORT + "/b2  (B2)"));
