#!/usr/bin/env node
/* Validates b2/js/data/speaking.js (B2 First Speaking). Usage: node scripts/check-b2-speaking.js */
"use strict";
const path = require("path");
global.window = {};
require(path.join(__dirname, "..", "b2", "js", "data", "speaking.js"));
const D = window.DATA && window.DATA.speaking;
let errors = 0, warns = 0;
const err = m => { errors++; console.error("ERROR:", m); };
const warn = m => { warns++; console.warn("warn:", m); };
const ok = (c, m) => { if(!c) err(m); };
const str = (v, min) => typeof v === "string" && v.trim().length >= (min || 1);
const words = s => String(s).trim().split(/\s+/).filter(Boolean).length;
/* scene palettes known to the module's SVG illustrator (b2/js/modules/speaking.js PAL) */
const BG = ["home","indoor","kitchen","office","classroom","library","lab","hospital","shop","stage","city","street","station","airport","park","garden","forest","field","mountain","sea","beach","snow","night","market","stadium"];
const CZ = /[áčďěíňóřšťúůýž]/i; /* Czech-only letters (é also occurs in English loanwords like café) */

ok(D, "window.DATA.speaking missing");
if(!D) process.exit(1);
ok(D.level === "b2", "data must be marked level 'b2'");

/* interlocutor frame & real B2 First timing */
["p1Intro","p1Marks","p1From","p1FromPartner","p1First","p2Intro","p2YouFirst","p2PartnerTurn","p2AskPartner","p2AskYou","p3Intro","p3Start","p3Decide","p4ToPartner","p4ToYou","end"].forEach(k => ok(str(D.rubrics[k], 8), "rubric " + k));
ok(/two photographs/.test(D.rubrics.p2Intro), "B2 Part 2 intro must say 'two photographs'");
ok(/compare the photographs/.test(D.rubrics.p2YouFirst) && /compare the photographs/.test(D.rubrics.p2PartnerTurn), "B2 Part 2 frame: 'compare the photographs'");
const T = D.timing;
ok(T.total === 14, "B2 First speaking lasts 14 minutes");
ok(T.p1Total === 120, "Part 1 = 2 min");
ok(T.p2Long === 60 && T.p2Short === 30, "Part 2 = 1 min long turn + 30 s follow-up");
ok(T.p3Look === 15 && T.p3Discuss === 120 && T.p3Decide === 60, "Part 3 = 15 s look, 2 min discussion, 1 min decision");
ok(T.p4Total === 240, "Part 4 = 4 min");
ok(T.p3Total === 240 && T.p3Look + T.p3Discuss + T.p3Decide <= T.p3Total, "Part 3 = 4 min including instructions");
ok((T.p1Total + T.p2Total + T.p3Total + T.p4Total) / 60 === T.total, "parts must add up to 14 minutes");

/* criteria: B2 First – 4 analytical scales + Global Achievement, bands 0–5 */
ok(Array.isArray(D.criteria) && D.criteria.map(c => c.id).join() === "gv,dm,pr,ic,ga", "criteria ids gv,dm,pr,ic,ga");
const NAMES = {gv:"Grammar and Vocabulary", dm:"Discourse Management", pr:"Pronunciation", ic:"Interactive Communication", ga:"Global Achievement"};
D.criteria.forEach(c => {
  ok(c.name === NAMES[c.id], "criterion " + c.id + " official name");
  ok(str(c.cz) && str(c.focus, 20) && CZ.test(c.focus), "criterion " + c.id + " Czech label/focus");
  ok(Array.isArray(c.bands) && c.bands.length === 6 && c.bands.every((b, i) => str(b, 10) && b.startsWith(i + " ")), "criterion " + c.id + " needs 6 band descriptors '0 …' – '5 …'");
});

/* overview, lessons, mistakes */
ok(D.overview.length === 4 && D.overview.every((o, i) => o.part === i + 1 && str(o.what, 30) && str(o.tip, 20)), "overview of 4 parts");
ok(D.lessons.length >= 7, "at least 7 lessons (has " + D.lessons.length + ")");
const lids = new Set();
D.lessons.forEach(l => {
  ok(str(l.id) && !lids.has(l.id), "lesson id " + l.id); lids.add(l.id);
  ok(str(l.title) && CZ.test(l.title + l.points.join(" ")), "lesson " + l.id + " must be in Czech");
  ok(l.points.length >= 5 && l.points.every(p => str(p, 15)), "lesson " + l.id + " needs >= 5 points");
});
ok(lids.has("mistakes") && lids.has("pron") && lids.has("speculate"), "lessons must include Czech-speaker mistakes, pronunciation and speculating");
ok(D.mistakes.length >= 15, "at least 15 typical mistakes");
D.mistakes.forEach((m, i) => ok(str(m.wrong) && str(m.right) && m.wrong !== m.right && str(m.why, 10) && CZ.test(m.why), "mistake #" + i));

/* phrase banks by function */
const need = ["self","compare","speculate","opinion","ask","agree","disagree","suggest","decide","time"];
const pids = D.phrases.map(g => g.id);
need.forEach(k => ok(pids.includes(k), "phrase group '" + k + "' missing"));
let nPh = 0;
D.phrases.forEach(g => {
  ok(str(g.cz) && str(g.en) && Array.isArray(g.parts) && g.parts.length && g.parts.every(p => /^p[1-4]$/.test(p)), "phrase group " + g.id + " meta");
  ok(g.items.length >= 8, "phrase group " + g.id + " needs >= 8 items");
  const seen = new Set();
  g.items.forEach((c, i) => {
    ok(Array.isArray(c) && str(c[0]) && str(c[1], 8), "phrase " + g.id + "#" + i + " must be [phrase, example]");
    if(seen.has(c[0])) err("duplicate phrase " + g.id + ": " + c[0]); seen.add(c[0]);
  });
  nPh += g.items.length;
});
["p1","p2","p3","p4"].forEach(p => ok(D.phrases.some(g => g.parts.includes(p)), "no phrase group for " + p));
ok(D.phrases.find(g => g.id === "speculate").items.some(c => /\bmust\b/.test(c[0])) && D.phrases.find(g => g.id === "speculate").items.some(c => /\bmight\b/.test(c[0])) && D.phrases.find(g => g.id === "speculate").items.some(c => /\bcould\b/.test(c[0])), "speculating needs might/could/must");
ok(D.builder.length === 4 && D.p2builder.length === 4, "answer builders = 4 steps each");
[...D.builder, ...D.p2builder].forEach(b => ok(str(b.step) && str(b.en) && b.starters.length >= 2, "builder step " + b.en));
ok(D.partnerGeneric.length >= 4 && D.partnerP4.length >= 3, "partner filler lines");

/* ids */
const ids = new Set();
const uid = id => { ok(str(id), "missing id"); if(ids.has(id)) err("duplicate id " + id); ids.add(id); };

/* Part 1 */
ok(D.p1.length >= 30, "p1 >= 30 groups (has " + D.p1.length + ")");
const themes = new Set();
D.p1.forEach(g => {
  uid(g.id);
  ok(str(g.theme) && str(g.cz), g.id + " theme/cz");
  if(themes.has(g.theme)) err("duplicate Part 1 theme " + g.theme); themes.add(g.theme);
  ok(g.questions.length >= 5 && g.questions.every(q => str(q, 10) && /[?.]$/.test(q.trim())), g.id + " needs >= 5 questions ending with '?' or '.'");
  ok(new Set(g.questions).size === g.questions.length, g.id + " duplicate question");
  const w = words(g.model); ok(w >= 40 && w <= 90, g.id + " model 40–90 words (has " + w + ")");
  ok(/\?$/.test(g.pq) && g.questions.includes(g.pq), g.id + " pq must be one of its questions");
  ok(g.pq !== g.questions[0], g.id + " pq should differ from questions[0] (the modelled one)");
  const pw = words(g.pa); ok(pw >= 15 && pw <= 45, g.id + " partner answer 15–45 words (has " + pw + ")");
});

/* Part 2 */
ok(D.p2.length >= 20, "p2 >= 20 sets (has " + D.p2.length + ")");
D.p2.forEach(s => {
  uid(s.id);
  ok(str(s.title) && str(s.cz) && str(s.show, 8) && str(s.ask, 15), s.id + " title/cz/show/ask");
  ok(/\?$/.test(s.q) && str(s.q, 15), s.id + " needs ONE printed question");
  ok(!/\?/.test(s.ask), s.id + " ask is indirect (no '?')");
  ok(Array.isArray(s.pics) && s.pics.length === 2, s.id + " needs exactly 2 photos");
  (s.pics || []).forEach((p, i) => {
    ok(Array.isArray(p.e) && p.e.length >= 1 && p.e.length <= 4 && Array.isArray(p.p) && p.p.length <= 4, s.id + " pic " + i + " art e/p");
    ok(BG.includes(p.bg), s.id + " pic " + i + " unknown bg '" + p.bg + "'");
    ok(str(p.scene, 60), s.id + " pic " + i + " scene description too short");
  });
  ok(/\?$/.test(s.partnerQ), s.id + " partnerQ");
  const pa = words(s.partnerAnswer); ok(pa >= 20 && pa <= 60, s.id + " partnerAnswer 20–60 words, ≈30 s (has " + pa + ")");
  const w = words(s.model); ok(w >= 100 && w <= 150, s.id + " model ≈1 minute = 100–150 words (has " + w + ")");
  ok(/\b(whereas|while|both|Both|on the other hand|On the other hand)\b/.test(s.model), s.id + " model must compare");
  ok(/\b(might|could|must|probably|perhaps|Perhaps|maybe|Maybe)\b/.test(s.model), s.id + " model must speculate");
});

/* Part 3 */
ok(D.p3.length >= 20, "p3 >= 20 tasks (has " + D.p3.length + ")");
D.p3.forEach(t => {
  uid(t.id);
  ok(str(t.title) && str(t.cz), t.id + " title/cz");
  ok(str(t.topic, 10) && /\?$/.test(t.central) && str(t.say, 10) && /\.$/.test(t.say) && str(t.decision, 10) && /\.$/.test(t.decision), t.id + " topic/central/say/decision");
  ok(t.prompts.length === 5 && t.prompts.every(p => str(p, 3)) && new Set(t.prompts).size === 5, t.id + " needs exactly 5 distinct prompts");
  ok(t.partnerLines.length >= 5 && t.partnerLines.every(l => str(l, 15)), t.id + " needs >= 5 partnerLines");
  ok(Array.isArray(t.decideLines) && t.decideLines.length >= 2, t.id + " decideLines >= 2");
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
  ok(s.items.some(it => it.pa), s.id + " needs at least one item answered by the partner first (pa)");
  ok(!s.items[0].pa, s.id + " items[0] is the modelled question – must be asked to the learner");
  s.items.forEach((it, i) => {
    ok(/\?$/.test(it.q), s.id + " q" + i + " must end with '?'");
    ok(str(it.outline, 20) && CZ.test(it.outline), s.id + " q" + i + " Czech outline");
    ok(Array.isArray(it.phrases) && it.phrases.length >= 2, s.id + " q" + i + " >= 2 phrases");
    if(it.pa){ const w = words(it.pa); ok(w >= 15 && w <= 50, s.id + " q" + i + " partner answer 15–50 words (has " + w + ")"); }
  });
  const w = words(s.model); ok(w >= 60 && w <= 110, s.id + " model 60–110 words (has " + w + ")");
});
D.p3.forEach(t => { if(!linked.has(t.id)) err(t.id + " has no Part 4 set"); });

/* template placeholders: only known ones */
const known = ["name","partner","examiner","assessor","show","ask","q","central","topic","decision"];
Object.values(D.rubrics).flat().forEach(r => (String(r).match(/\{(\w+)\}/g) || []).forEach(m => ok(known.includes(m.slice(1, -1)), "unknown placeholder " + m)));
/* exam content must be English: no Czech letters in learner-facing English fields */
const en = [];
D.p1.forEach(g => en.push(...g.questions, g.model, g.pa));
D.p2.forEach(s => en.push(s.q, s.show, s.ask, s.partnerQ, s.partnerAnswer, s.model, ...s.pics.map(p => p.scene)));
D.p3.forEach(t => en.push(t.topic, t.central, t.say, t.decision, ...t.prompts, ...t.partnerLines, ...t.decideLines, t.model));
D.p4.forEach(s => { en.push(s.model); s.items.forEach(it => en.push(it.q, it.pa || "", ...it.phrases)); });
en.forEach(x => { if(CZ.test(x)) err("Czech characters in English exam content: " + String(x).slice(0, 60)); });

console.log(`b2 speaking: p1 ${D.p1.length} groups, p2 ${D.p2.length} sets, p3 ${D.p3.length} tasks, p4 ${D.p4.length} sets; phrases ${nPh} in ${D.phrases.length} groups; lessons ${D.lessons.length}; mistakes ${D.mistakes.length}`);
console.log(errors ? `FAILED: ${errors} error(s), ${warns} warning(s)` : `OK (${warns} warning(s))`);
process.exit(errors ? 1 : 0);
