#!/usr/bin/env node
/* Validates js/data/speaking.js structure. Usage: node scripts/check-speaking.js */
"use strict";
const path = require("path");
global.window = {};
require(path.join(__dirname, "..", "js", "data", "speaking.js"));
const D = window.DATA && window.DATA.speaking;
let errors = 0, warns = 0;
const err = m => { errors++; console.error("ERROR:", m); };
const warn = m => { warns++; console.warn("warn:", m); };
const ok = (c, m) => { if(!c) err(m); };
const str = (v, min) => typeof v === "string" && v.trim().length >= (min || 1);
const words = s => String(s).trim().split(/\s+/).filter(Boolean).length;
const BG = ["home","indoor","kitchen","office","classroom","lab","stage","city","street","station","park","garden","forest","field","mountain","sea","beach","sky","night","hospital","shop","market","stadium"];

ok(D, "window.DATA.speaking missing");
if(!D){ process.exit(1); }

/* rubrics & timing (real exam) */
["p1Intro","p1From","p1First","p2Intro","p2YouFirst","p2PartnerTurn","p3Intro","p3Start","p3Decide","p4Intro","end"].forEach(k => ok(str(D.rubrics[k], 10), "rubric " + k));
const T = D.timing;
ok(T.p2Long === 60 && T.p2Short === 30, "Part 2 timings must be 60 s / 30 s");
ok(T.p3Look === 15 && T.p3Discuss === 120 && T.p3Decide === 60, "Part 3 timings must be 15 s / 2 min / 1 min");
ok(T.p1Total === 120, "Part 1 must be 2 min (paired)");

/* criteria */
ok(Array.isArray(D.criteria) && D.criteria.length === 4, "4 criteria");
ok(D.criteria.map(c => c.id).join() === "gv,dm,pr,ic", "criteria ids gv,dm,pr,ic");
D.criteria.forEach(c => { ok(c.bands.length === 6 && c.bands.every(b => str(b, 10)), "criterion " + c.id + " needs 6 band descriptors (0–5)"); });

/* lessons & chunks */
ok(D.lessons.length >= 5, "at least 5 lessons");
D.lessons.forEach(l => ok(str(l.title) && l.points.length >= 5, "lesson " + l.id + " needs >= 5 points"));
["p1","p2","p3","p4"].forEach(p => {
  const ch = D.chunks[p];
  ok(Array.isArray(ch) && ch.length >= 40, "chunks." + p + " >= 40 (has " + (ch ? ch.length : 0) + ")");
  const seen = new Set();
  (ch || []).forEach((c, i) => {
    ok(Array.isArray(c) && str(c[0]) && str(c[1], 10), "chunk " + p + "#" + i + " must be [phrase, example]");
    if(seen.has(c[0])) err("duplicate chunk " + p + ": " + c[0]); seen.add(c[0]);
  });
});
ok(D.builder.length === 4, "answer builder = 4 steps");

/* ids */
const ids = new Set();
const uid = id => { ok(str(id), "missing id"); if(ids.has(id)) err("duplicate id " + id); ids.add(id); };

/* Part 1 */
ok(D.p1.length >= 30, "p1 >= 30 groups (has " + D.p1.length + ")");
D.p1.forEach(g => {
  uid(g.id);
  ok(str(g.theme) && str(g.cz), g.id + " theme/cz");
  ok(g.questions.length >= 4 && g.questions.every(q => str(q, 10) && /[?.]$/.test(q.trim())), g.id + " needs >= 4 questions ending with '?' or '.'");
  const w = words(g.model); ok(w >= 40 && w <= 110, g.id + " model 40–110 words (has " + w + ")");
});

/* Part 2 */
ok(D.p2.length >= 20, "p2 >= 20 sets (has " + D.p2.length + ")");
D.p2.forEach(s => {
  uid(s.id);
  ok(str(s.title) && str(s.show, 8) && str(s.ask, 15), s.id + " title/show/ask");
  ok(s.qs.length === 2 && s.qs.every(q => /\?$/.test(q)), s.id + " needs 2 printed questions");
  ok(s.pics.length === 3, s.id + " needs exactly 3 pictures");
  s.pics.forEach((p, i) => {
    ok(Array.isArray(p.e) && p.e.length >= 1 && Array.isArray(p.p), s.id + " pic " + i + " art e/p");
    ok(BG.includes(p.bg), s.id + " pic " + i + " unknown bg '" + p.bg + "'");
    ok(str(p.scene, 40), s.id + " pic " + i + " scene description too short");
  });
  ok(Array.isArray(s.modelPics) && s.modelPics.length === 2 && s.modelPics[0] !== s.modelPics[1] && s.modelPics.every(i => i >= 0 && i < 3), s.id + " modelPics");
  ok(/\?$/.test(s.partnerQ), s.id + " partnerQ");
  const pa = words(s.partnerAnswer); ok(pa >= 20 && pa <= 70, s.id + " partnerAnswer 20–70 words (has " + pa + ")");
  const w = words(s.model); ok(w >= 100 && w <= 160, s.id + " model ≈100–150 words (has " + w + ")");
  if(w > 150) warn(s.id + " model slightly long (" + w + ")");
});

/* Part 3 */
ok(D.p3.length >= 20, "p3 >= 20 tasks (has " + D.p3.length + ")");
D.p3.forEach(t => {
  uid(t.id);
  ok(str(t.topic, 10) && /\?$/.test(t.central) && str(t.say, 10) && str(t.decision, 10), t.id + " topic/central/say/decision");
  ok(t.prompts.length === 5 && t.prompts.every(p => str(p, 3)), t.id + " needs exactly 5 prompts");
  ok(t.partnerLines.length >= 5 && t.partnerLines.every(l => str(l, 15)), t.id + " needs >= 5 partnerLines");
  ok(Array.isArray(t.decideLines) && t.decideLines.length >= 1, t.id + " decideLines");
  ok(/^A: /.test(t.model) && /\nB: /.test(t.model), t.id + " model must be an A/B dialogue");
  const w = words(t.model); ok(w >= 90, t.id + " model >= 90 words (has " + w + ")");
});

/* Part 4 */
ok(D.p4.length >= 20, "p4 >= 20 sets (has " + D.p4.length + ")");
const p3ids = new Set(D.p3.map(t => t.id));
const linked = new Set();
D.p4.forEach(s => {
  uid(s.id);
  ok(p3ids.has(s.p3), s.id + " links to unknown Part 3 task " + s.p3);
  if(linked.has(s.p3)) warn(s.p3 + " linked from several p4 sets"); linked.add(s.p3);
  ok(s.items.length >= 5, s.id + " needs >= 5 questions");
  s.items.forEach((it, i) => {
    ok(/\?$/.test(it.q), s.id + " q" + i + " must end with '?'");
    ok(str(it.outline, 20), s.id + " q" + i + " Czech outline");
    ok(Array.isArray(it.phrases) && it.phrases.length >= 2, s.id + " q" + i + " >= 2 phrases");
  });
  const w = words(s.model); ok(w >= 70 && w <= 140, s.id + " model 70–140 words (has " + w + ")");
});
D.p3.forEach(t => { if(!linked.has(t.id)) warn(t.id + " has no Part 4 set"); });

/* no unescaped template placeholders in data except known ones */
const known = ["name","partner","examiner","assessor","show","ask","q","central","topic","decision"];
Object.values(D.rubrics).flat().forEach(r => (String(r).match(/\{(\w+)\}/g) || []).forEach(m => ok(known.includes(m.slice(1, -1)), "unknown placeholder " + m)));

console.log(`speaking: p1 ${D.p1.length} groups, p2 ${D.p2.length} sets, p3 ${D.p3.length} tasks, p4 ${D.p4.length} sets; chunks ${Object.values(D.chunks).map(c => c.length).join("/")}; lessons ${D.lessons.length}`);
console.log(errors ? `FAILED: ${errors} error(s), ${warns} warning(s)` : `OK (${warns} warning(s))`);
process.exit(errors ? 1 : 0);
