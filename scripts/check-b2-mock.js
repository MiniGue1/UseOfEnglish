#!/usr/bin/env node
/* Sanity checks for the B2 First dashboard + mock centre + exam guide (b2/js/modules/home.js, b2/js/modules/mock.js).
   Run: node scripts/check-b2-mock.js */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm"), assert = require("assert");
const root = path.join(__dirname, "..");
const read = f => fs.readFileSync(path.join(root, f), "utf8");

/* --- minimal browser stubs (page at /b2: window.CAE_LEVEL = "b2") --- */
const ls = new Map();
const el = () => ({ style:{}, classList:{toggle(){}, add(){}, remove(){}}, setAttribute(){}, removeAttribute(){}, appendChild(){}, addEventListener(){},
  querySelector(){ return null; }, querySelectorAll(){ return []; }, insertAdjacentHTML(){} });
const document = Object.assign(el(), { readyState:"complete", head: el(), body: el(), documentElement: el(), createElement: el });
const window = { CAE_LEVEL:"b2", addEventListener(){}, matchMedia: () => ({matches:false, addEventListener(){}}) };
const localStorage = { getItem: k => ls.has(k) ? ls.get(k) : null, setItem: (k,v) => ls.set(k, String(v)), removeItem: k => ls.delete(k) };
const ctx = { window, document, location:{hash:"", search:"", protocol:"http:", hostname:"example.org", replace(){ throw new Error("unexpected redirect"); }},
  navigator:{}, console, setTimeout, clearTimeout, Blob: class{}, URL };
ctx.window.window = ctx.window; ctx.globalThis = ctx;
/* Object.keys(localStorage) must list stored keys */
ctx.localStorage = new Proxy(localStorage, { ownKeys: () => [...ls.keys()], getOwnPropertyDescriptor: (t,k) => ls.has(k) ? {enumerable:true, configurable:true, value: ls.get(k)} : undefined });
vm.createContext(ctx);
vm.runInContext("var window = this.window; window.localStorage = localStorage; window.document = document;", ctx);
["js/core.js", "b2/js/modules/home.js", "b2/js/modules/mock.js"].forEach(f => vm.runInContext(read(f), ctx, {filename: f}));
const P = ctx.window.Portal;
assert(P, "Portal missing");
let n = 0; const ok = (c, m) => { assert(c, m); n++; };
ok(P.level === "b2" && P.prefix === "b2:", "level b2, prefix b2:");
ok(P.order[0] === "home", "home must stay first in nav");
ok(P.modules.mock && P.modules.mock._internal, "mock not registered");
ok(P.modules.home._internal, "home dashboard not registered (core default not replaced)");
const M = P.modules.mock._internal, H = P.modules.home._internal, SP = P.util.SCALE_POINTS;

/* --- conversion at the official B2 First reference points --- */
ok(M.convert({correct:0, total:0}, "reading") === null && M.convert(null) === null, "empty result -> null");
const SF = (k, c, t) => M.convert({correct:c, total:t}, k).scale;
const SS = (k, pct) => M.convert({selfScore:pct}, k).scale;
ok(SF("reading",24,42) === 160 && SF("reading",37,42) === 180, "Reading 24/42 -> 160, 37/42 -> 180");
ok(SF("reading",16,42) === 140 && SF("reading",42,42) === 190, "Reading 16/42 -> 140, 42/42 -> 190");
ok(SF("uoe",18,28) === 160 && SF("uoe",24,28) === 180, "UoE 18/28 -> 160, 24/28 -> 180");
ok(SF("uoe",11,28) === 140 && SF("uoe",28,28) === 190, "UoE 11/28 -> 140, 28/28 -> 190");
ok(SF("writing",24,40) === 160 && SS("writing",60) === 160, "Writing 24/40 (60 %) -> 160");
ok(SS("writing",85) === 180 && SS("writing",40) === 140 && SS("writing",100) === 190, "Writing 34/40 -> 180, 16/40 -> 140, 40/40 -> 190");
ok(SF("listening",18,30) === 160 && SF("listening",27,30) === 180 && SF("listening",12,30) === 140, "Listening 18/30 -> 160, 27/30 -> 180, 12/30 -> 140");
ok(SS("speaking",60) === 160 && SS("speaking",90) === 180 && SS("speaking",40) === 140, "Speaking 36/60 -> 160, 54/60 -> 180, 24/60 -> 140");
ok(SF("speaking",36,60) === 160 && SF("speaking",54,60) === 180, "Speaking raw marks 36/60, 54/60");
ok(SF("listening",0,30) === 122 && SF("reading",0,42) === 122, "floor 122");
ok(SF("reading",30,42) > 160 && SF("reading",30,42) < 180, "linear interpolation between points");
ok(M.convert({correct:99, total:10}, "listening").c === 10 && M.convert({selfScore:150}, "writing").pct === 100, "clamping");
ok(M.convert({selfScore:60}, "writing").self === 60, "self score kept");
/* raw totals other than the official max are rescaled */
ok(SF("listening",9,15) === 160, "listening 9/15 rescaled to 18/30 -> 160");

/* --- grades --- */
const g = P.util.gradeFor;
ok(g(190) === "A (C1)" && g(180) === "A (C1)" && g(179) === "B" && g(173) === "B" && g(172) === "C (B2)" && g(160) === "C (B2)", "grades A/B/C");
ok(g(159) === "B1" && g(140) === "B1" && g(139) === "pod B1", "B1 band and below");
["A (C1)", "B", "C (B2)", "B1", "pod B1"].forEach(l => ok(M.gradeNote(l) !== l, "grade note for " + l));
const GR = M.GRADE_ROWS();
ok(GR[0][1] === 190 && GR[GR.length-1][0] === 122 && GR.every((r, i) => i === 0 || r[1] === GR[i-1][0] - 1), "grade table covers 122–190 without gaps");

/* --- UoE Part 1 counts towards Reading (Statement of Results) --- */
const U = M.convert({correct:24, total:36, details:{p1:{score:6, max:8}, p2:{score:6, max:8}}}, "uoe");
ok(U.p1c === 6 && U.p1n === 8, "uoe keeps part 1 marks");
const R = M.convert({correct:18, total:34}, "reading");
const OS = M.officialSkills({uoe:U, reading:R});
ok(OS.uoe.c === 18 && OS.uoe.n === 28 && OS.uoe.scale === 160, "UoE = Parts 2–4 (18/28 -> 160)");
ok(OS.reading.c === 24 && OS.reading.n === 42 && OS.reading.scale === 160 && OS.reading.withP1, "Reading = Part 1 + 5–7 (24/42 -> 160)");
const OS2 = M.officialSkills({uoe:M.convert({correct:32, total:36, details:{part1:{correct:8, total:8}}}, "uoe"), reading:M.convert({correct:29, total:34}, "reading")});
ok(OS2.uoe.c === 24 && OS2.uoe.scale === 180 && OS2.reading.c === 37 && OS2.reading.scale === 180, "alt detail shape; 24/28 & 37/42 -> 180");
const OS3 = M.officialSkills({uoe:U});
ok(OS3.uoe.n === 28 && OS3.uoe.noP1 && !OS3.reading, "UoE alone: Parts 2–4 only, no Reading invented");
const OS4 = M.officialSkills({uoe:M.convert({correct:18, total:36}, "uoe")});
ok(OS4.uoe.n === 36 && OS4.uoe.scale === SF("uoe", 14, 28), "UoE without part details: rescaled to 28");
const raw = {uoe:U, reading:R};
ok(M.officialSkills(raw) !== raw && raw.uoe.n === 36, "officialSkills does not mutate input");

/* --- papers --- */
const rue = M.PAPERS.find(p => p.id === "rue");
ok(rue && rue.minutes === 75 && rue.sections.join() === "uoe,reading", "R&UoE 75 min, sections uoe + reading");
ok(M.PAPERS.map(p => p.id + ":" + p.minutes).join() === "rue:75,writing:80,listening:40,speaking:14", "paper minutes 75/80/40/14");
const ps = M.paperScore(rue, {uoe:M.convert({correct:28, total:28}, "uoe"), reading:M.convert({correct:0, total:42}, "reading")});
ok(ps.pct === 40 && ps.complete && ps.scale === Math.round((190 + 122)/2), "R&UoE adds raw marks, scale = mean of its skills");
ok(M.paperScore(rue, {uoe:M.convert({correct:14, total:28}, "uoe")}).complete === false, "partial paper flagged");

/* --- overall = mean of the 5 skills --- */
const skills = {reading:M.convert({correct:24,total:42},"reading"), uoe:M.convert({correct:24,total:28},"uoe"), writing:M.convert({selfScore:60},"writing"),
  listening:M.convert({correct:27,total:30},"listening"), speaking:M.convert({selfScore:60},"speaking")};
const o = M.overall(skills);
ok(o.complete && o.count === 5 && o.scale === 168 && o.grade === "C (B2)", "overall (160+180+160+180+160)/5 = 168, grade C");
const o2 = M.overall({writing:skills.writing, listening:skills.listening});
ok(!o2.complete && o2.count === 2 && o2.scale === 170, "partial overall averages available skills");
ok(M.overall({}) === null, "empty overall null");
const att = M.summarize({id:1, kind:"full", skills:{uoe:U, reading:R, writing:skills.writing, listening:skills.listening, speaking:skills.speaking}});
ok(att.scored.reading.c === 24 && att.papers.rue.complete && att.overall.complete && att.overall.scale === Math.round((160+160+160+180+160)/5), "summarize: official skills + overall");
ok(/<svg/.test(M.trendSVG([att, M.summarize({id:2, kind:"rue", skills:{uoe:U}})])), "trend svg");
ok(M.trendSVG([]) === "", "no trend without data");

/* --- guide facts (official B2 First format) --- */
const G = M.GUIDE;
const qs = G.rue.reduce((s,r) => s+r[3], 0), mk = G.rue.reduce((s,r) => s+r[3]*r[4], 0);
const skM = k => G.rue.filter(r => r[5] === k).reduce((s,r) => s+r[3]*r[4], 0);
ok(G.rue.length === 7 && qs === 52 && mk === 70, "R&UoE 7 parts, 52 questions, 70 marks");
ok(G.rue.map(r => r[3]).join() === "8,8,8,6,6,6,10", "questions per part 8/8/8/6/6/6/10");
ok(G.rue.filter(r => r[4] === 2).map(r => r[0]).join() === "4,5,6", "2 marks per question in Parts 4, 5, 6");
ok(skM("reading") === 42 && skM("reading") === SP.reading.max, "Reading = Parts 1 + 5–7 = 42");
ok(skM("uoe") === 28 && skM("uoe") === SP.uoe.max, "UoE = Parts 2–4 = 28");
ok(G.rue.filter(r => r[5] === "reading").map(r => r[0]).join() === "1,5,6,7", "Reading parts 1,5,6,7");
ok(/sentence|vět/i.test(G.rue[5][2]) && /7/.test(G.rue[5][2]), "Part 6 = six sentences from seven");
ok(G.listening.map(r => r[3]).join() === "8,10,5,7" && G.listening.reduce((s,r) => s+r[3], 0) === 30 && SP.listening.max === 30, "Listening 8/10/5/7 = 30");
ok(/8/.test(G.listening[2][2]), "Listening Part 3 matching from 8 options");
ok(G.speaking.length === 4 && G.speaking.reduce((s,r) => s+r[3], 0) === 14, "Speaking 4 parts, 14 min");
ok(G.writing.length === 2 && G.writing.every(r => r[3] === 140 && r[4] === 190), "Writing 2 × 140–190 words");
ok(/vlastní nápad/.test(G.writing[0][2]) && /article/i.test(G.writing[1][1]) && /review/i.test(G.writing[1][1]) && /report/i.test(G.writing[1][1]) && /email/i.test(G.writing[1][1]), "essay with own idea; Part 2 genres");
ok(M.TIMING.reduce((s,t) => s+t[1], 0) === 75, "R&UoE timing adds up to 75 min");
ok(SP.writing.max === 40 && SP.speaking.max === 60, "Writing /40, Speaking /60");
const mockSrc = read("b2/js/modules/mock.js");
ok(mockSrc.includes("https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/preparation/") && mockSrc.includes("https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/format/"), "official B2 First links");
ok(/B2 vs C1/.test(mockSrc) && /SCALE_POINTS\[k\]\.pts/.test(mockSrc), "B2 vs C1 section + conversion table from SCALE_POINTS");

/* --- dashboard analytics --- */
const day = P.util.todayStr();
const act = [];
for(let i=0;i<4;i++) act.push({t:Date.now()-i*1000, day, m:"reading", p:"part6", c:2, n:6});
for(let i=0;i<4;i++) act.push({t:Date.now()-i*1000, day, m:"uoe", p:"p1", c:7, n:8});
act.push({t:Date.now(), day, m:"mock", p:"rue", c:10, n:10, mock:true});
const w = H.weakSpots(act);
ok(w[0].m === "reading" && w[0].pct === 33 && !w.some(e => e.m === "mock"), "weakest = reading part6, mock excluded");
ok(H.partLabel("reading","part6") === "Reading Part 6 – Gapped text (věty)", "B2 part label (Part 6 = gapped text)");
ok(H.partLabel("reading","part7").startsWith("Reading Part 7 – Multiple matching"), "Part 7 = multiple matching");
ok(H.partLabel("listening","p3").includes("Multiple matching") && H.partLabel("listening","p1").includes("8"), "B2 listening labels");
ok(H.partLabel("writing","part2-review") === "Writing Part 2 – review" && H.partLabel("vocab","wf") === "Slovní zásoba – wf", "other labels");
ok(!H.PART_INFO["reading:8"] && Object.keys(H.PART_INFO).length === 4 + 3 + 4 + 2 + 4, "PART_INFO = B2 parts only");
ok(H.partSub("7","reading") === "part7" && H.partSub("p2","listening") === "p2" && H.partSub("part3","speaking") === "part3" && H.partSub("lesson","uoe") === "lesson" && H.partSub(null) === null, "deep-link sub");
P.modules.reading = {id:"reading"}; P.modules.uoe = {id:"uoe"}; P.modules.vocab = {id:"vocab"};
const tasks = H.todaysPlan(act);
ok(tasks.length === 3 && tasks.reduce((s,t) => s+t.min, 0) === 20 && tasks[0].m === "reading" && tasks[0].p === "part6", "today plan: 3 tasks, 20 min, weakest first");
ok(tasks.every(t => P.modules[t.m]), "plan only links to existing modules");
const wk = H.generateWeek({examDate:"", daily:30, rest:"6"}, act);
ok(wk.week.length === 7 && wk.week[6].rest && wk.week[6].items.length === 0, "rest day");
ok(wk.week.slice(0,6).every(d => d.items.reduce((s,i) => s+i.min, 0) === 30), "each day = daily minutes");
ok(wk.week.every(d => d.items.every(i => !/Part 8/.test(i.label) && !(i.m === "reading" && /^part[1-4]$/.test(i.p || "")))), "plan uses B2 parts only");
const rueMin = wk.alloc.find(a => a.k === "rue").min, lisMin = wk.alloc.find(a => a.k === "listening").min;
ok(rueMin > lisMin, "weak paper gets more time");
ok(H.daysUntil(day) === 0 && H.daysUntil("bad") === null, "daysUntil");

/* --- backup / restore / wipe touch only "b2:" keys --- */
ok(H.PREFIX === "b2:" && H.APP === "b2-portal", "backup prefix b2:");
ls.set("cae:activity", JSON.stringify([{t:5, m:"uoe"}])); ls.set("cae:plan", "{}"); ls.set("portal:level", "b2");
P.store.set("activity", [{t:1}]); P.store.set("keep", 1);
const pay = H.backupPayload();
ok(pay.app === "b2-portal" && Object.keys(pay.data).length && Object.keys(pay.data).every(k => k.startsWith("b2:")), "export holds only b2: keys");
ok(H.validateBackup(pay) === null, "own export is valid");
ok(H.validateBackup({app:"cae-portal", data:{"cae:x":"[1]"}}) && /C1/.test(H.validateBackup({app:"cae-portal", data:{"cae:x":"[1]"}})), "C1 backup rejected with a hint");
ok(H.validateBackup({app:"b2-portal", data:{"cae:x":"[1]"}}), "cae: key in a B2 backup rejected");
ok(H.validateBackup({app:"b2-portal", data:{"b2:x":"{bad"}}) && H.validateBackup({app:"other", data:{}}) && H.validateBackup({app:"b2-portal", data:{}}), "broken / foreign / empty rejected");
const merged = H.mergeValues([{t:1},{t:3}], [{t:2},{t:3}]);
ok(merged.length === 3 && merged[1].t === 2, "array merge dedupes + sorts by t");
ok(H.mergeValues({a:1, b:[1]}, {b:[2], c:3}).c === 3 && H.mergeValues({a:1},{a:2}).a === 1, "object merge keeps local scalars");
H.applyBackup({app:"b2-portal", data:{"b2:activity":JSON.stringify([{t:2}]), "b2:new":"true"}}, "merge");
ok(JSON.parse(ls.get("b2:activity")).length === 2 && ls.get("b2:keep") === "1" && ls.get("b2:new") === "true", "merge import");
H.applyBackup({app:"b2-portal", data:{"b2:activity":JSON.stringify([{t:9}])}}, "replace");
ok(!ls.has("b2:keep") && JSON.parse(ls.get("b2:activity")).length === 1, "replace import removes other b2: keys");
ok(ls.get("cae:activity") === JSON.stringify([{t:5, m:"uoe"}]) && ls.get("cae:plan") === "{}", "replace import leaves cae: keys alone");
P.store.set("theme", "dark"); P.store.set("plan", {daily:30});
const wiped = H.wipeData();
const left = [...ls.keys()];
ok(wiped >= 2 && !left.some(k => k.startsWith("b2:") && k !== "b2:__meta"), "wipe removes every b2: key");
ok(ls.has("cae:activity") && ls.has("cae:plan") && ls.get("portal:level") === "b2", "wipe leaves cae: keys and portal:level alone");

/* --- source-level rules --- */
const homeSrc = read("b2/js/modules/home.js");
ok(/serviceWorker\.register\("\/sw\.js",\s*\{scope:"\/"\}\)/.test(homeSrc), "SW registered as /sw.js with scope /");
[homeSrc, mockSrc].forEach((s, i) => ok(!/["'`]cae:/.test(s.replace(/"cae:remote"/g, "")) , (i ? "mock" : "home") + ".js must not hard-code cae: keys"));
ok(!/localStorage\.(setItem|removeItem)/.test(homeSrc + mockSrc), "writes go through Portal.store");
const page = read("b2/index.html");
const mods = [...page.matchAll(/src="\/b2\/js\/modules\/(\w+)\.js"/g)].map(m => m[1]);
ok(mods[0] === "home" && mods[mods.length-1] === "mock", "b2/index.html loads home first, mock last");

console.log("check-b2-mock: " + n + " checks OK");
