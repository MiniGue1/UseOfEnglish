#!/usr/bin/env node
/* Sanity checks for mock.js, home.js and sw.js. Run: node scripts/check-mock.js */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm"), assert = require("assert");
const root = path.join(__dirname, "..");
const read = f => fs.readFileSync(path.join(root, f), "utf8");

/* --- minimal browser stubs --- */
const ls = new Map();
const el = () => ({ style:{}, classList:{toggle(){}, add(){}, remove(){}}, setAttribute(){}, removeAttribute(){}, appendChild(){}, addEventListener(){},
  querySelector(){ return null; }, querySelectorAll(){ return []; }, insertAdjacentHTML(){} });
const document = Object.assign(el(), { readyState:"complete", head: el(), body: el(), documentElement: el(), createElement: el });
const window = { addEventListener(){}, matchMedia: () => ({matches:false, addEventListener(){}}) };
const localStorage = { getItem: k => ls.has(k) ? ls.get(k) : null, setItem: (k,v) => ls.set(k, String(v)), removeItem: k => ls.delete(k) };
const ctx = { window, document, localStorage, location:{hash:"", protocol:"http:", hostname:"example.org"}, navigator:{}, console, setTimeout, clearTimeout, Blob: class{}, URL };
ctx.window.window = ctx.window; ctx.globalThis = ctx;
vm.createContext(ctx);
/* Object.keys(localStorage) must list stored keys */
ctx.localStorage = new Proxy(localStorage, { ownKeys: () => [...ls.keys()], getOwnPropertyDescriptor: (t,k) => ls.has(k) ? {enumerable:true, configurable:true, value: ls.get(k)} : undefined });
vm.runInContext("var window = this.window; window.localStorage = localStorage; window.document = document;", ctx);
["js/core.js", "js/modules/home.js", "js/modules/mock.js"].forEach(f => vm.runInContext(read(f), ctx, {filename: f}));
const P = ctx.window.Portal;
assert(P, "Portal missing");
assert.strictEqual(P.order[0], "home", "home must stay first in nav");
assert(P.modules.mock && P.modules.mock._internal, "mock not registered");
assert(P.modules.home._internal, "home dashboard not registered (core default not replaced)");
const M = P.modules.mock._internal, H = P.modules.home._internal;
let n = 0; const ok = (c, m) => { assert(c, m); n++; };

/* --- conversion --- */
ok(M.convert({correct:0, total:0}) === null, "total 0 -> null");
ok(M.convert(null) === null, "null -> null");
const full = M.convert({correct:78, total:78}); ok(full.scale === 210 && full.grade === "A", "100 % -> 210 A");
const self = M.convert({selfScore:60}); ok(self.scale === 180 && self.self === 60, "self 60 -> 180");
ok(M.convert({correct:99, total:10}).c === 10, "correct clamped to total");
ok(M.convert({selfScore:150}).pct === 100, "selfScore clamped");
/* R&UoE combined = raw marks added */
const rue = M.PAPERS.find(p => p.id === "rue");
const ps = M.paperScore(rue, {uoe:M.convert({correct:28, total:28}), reading:M.convert({correct:0, total:50})});
ok(ps.pct === Math.round(100*28/78) && ps.complete, "R&UoE adds raw marks");
ok(M.paperScore(rue, {uoe:M.convert({correct:14, total:28})}).complete === false, "partial paper flagged");
/* overall = mean of 5 skills */
const skills = {uoe:M.convert({correct:28,total:28}), reading:M.convert({correct:50,total:50}), writing:M.convert({selfScore:60}), listening:M.convert({selfScore:60}), speaking:M.convert({selfScore:60})};
const o = M.overall(skills); ok(o.complete && o.scale === Math.round((210+210+180+180+180)/5), "overall mean of 5 skills");
ok(M.overall({}) === null, "empty overall null");
ok(/<svg/.test(M.trendSVG([M.summarize({id:1, kind:"full", skills}), M.summarize({id:2, kind:"rue", skills:{uoe:skills.uoe}})])), "trend svg");

/* --- guide facts --- */
const G = M.GUIDE;
ok(G.rue.length === 8 && G.rue.reduce((s,r) => s+r[3], 0) === 56 && G.rue.reduce((s,r) => s+r[3]*r[4], 0) === 78, "R&UoE 8 parts, 56 q, 78 marks");
ok(G.listening.reduce((s,r) => s+r[3], 0) === 30, "Listening 30 q");
ok(G.speaking.reduce((s,r) => s+r[3], 0) === 15, "Speaking 15 min");
ok(M.PAPERS.reduce((s,p) => s+p.minutes, 0) === 90+90+40+15, "paper minutes");

/* --- core scale anchors --- */
ok(P.util.gradeFor(P.util.cambridgeScale(60)) === "C (C1)" && P.util.gradeFor(200) === "A" && P.util.gradeFor(170) === "B2", "grade bands");

/* --- dashboard analytics --- */
const day = P.util.todayStr();
const act = [];
for(let i=0;i<4;i++) act.push({t:Date.now()-i*1000, day, m:"reading", p:"part7", c:2, n:6});
for(let i=0;i<4;i++) act.push({t:Date.now()-i*1000, day, m:"uoe", p:"part1", c:7, n:8});
act.push({t:Date.now(), day, m:"mock", p:"rue", c:10, n:10, mock:true});
const w = H.weakSpots(act);
ok(w[0].m === "reading" && w[0].pct === 33 && !w.some(e => e.m === "mock"), "weakest = reading part7, mock excluded");
ok(H.partLabel("reading","part7").startsWith("Reading Part 7"), "part label");
ok(H.partSub("7") === "part7" && H.partSub("part3") === "part3" && H.partSub("idioms") === "idioms", "deep-link sub");
P.modules.reading = {id:"reading"}; P.modules.uoe = {id:"uoe"}; P.modules.vocab = {id:"vocab"};
const tasks = H.todaysPlan(act);
ok(tasks.length === 3 && tasks.reduce((s,t) => s+t.min, 0) === 20 && tasks[0].m === "reading", "today plan: 3 tasks, 20 min, weakest first");
ok(tasks.every(t => P.modules[t.m]), "plan only links to existing modules");
const wk = H.generateWeek({examDate:"", daily:30, rest:"6"}, act);
ok(wk.week.length === 7 && wk.week[6].rest && wk.week[6].items.length === 0, "rest day");
ok(wk.week.slice(0,6).every(d => d.items.reduce((s,i) => s+i.min, 0) === 30), "each day = daily minutes");
const rueMin = wk.alloc.find(a => a.k === "rue").min, lisMin = wk.alloc.find(a => a.k === "listening").min;
ok(rueMin > lisMin, "weak paper gets more time");
ok(H.daysUntil(day) === 0 && H.daysUntil("bad") === null, "daysUntil");

/* --- backup --- */
ok(H.validateBackup({app:"cae-portal", data:{"cae:x":"[1]"}}) === null, "valid backup");
ok(H.validateBackup({app:"other", data:{}}), "foreign file rejected");
ok(H.validateBackup({app:"cae-portal", data:{"evil":"1"}}), "non-prefixed key rejected");
ok(H.validateBackup({app:"cae-portal", data:{"cae:x":"{bad"}}), "broken JSON rejected");
const merged = H.mergeValues([{t:1},{t:3}], [{t:2},{t:3}]);
ok(merged.length === 3 && merged[1].t === 2, "array merge dedupes + sorts by t");
ok(H.mergeValues({a:1, b:[1]}, {b:[2], c:3}).c === 3 && H.mergeValues({a:1},{a:2}).a === 1, "object merge keeps local scalars");
ctx.localStorage.setItem("cae:keep", "1"); ctx.localStorage.setItem("cae:activity", JSON.stringify([{t:1}]));
H.applyBackup({app:"cae-portal", data:{"cae:activity":JSON.stringify([{t:2}]), "cae:new":"true"}}, "merge");
ok(JSON.parse(ls.get("cae:activity")).length === 2 && ls.get("cae:keep") === "1" && ls.get("cae:new") === "true", "merge import");
H.applyBackup({app:"cae-portal", data:{"cae:activity":JSON.stringify([{t:9}])}}, "replace");
ok(!ls.has("cae:keep") && JSON.parse(ls.get("cae:activity")).length === 1, "replace import");

/* --- service worker precache covers every local script/style in index.html, and files exist --- */
const sw = read("sw.js");
const pre = JSON.parse(sw.match(/const PRECACHE = (\[[\s\S]*?\]);/)[1].replace(/\/\*[\s\S]*?\*\//g, "").replace(/,\s*\]/, "]"));
const html = read("index.html");
const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]).filter(u => !/^(https?:|#)/.test(u));
refs.forEach(r => ok(pre.includes(r), "sw.js PRECACHE is missing " + r + " (add it and bump VERSION)"));
pre.filter(u => u !== "./").forEach(u => ok(fs.existsSync(path.join(root, u)), "PRECACHE lists missing file " + u));
ok(/const VERSION = "cae-v\d+"/.test(sw), "VERSION format");

console.log("check-mock: " + n + " checks OK");
