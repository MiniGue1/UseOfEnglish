#!/usr/bin/env node
/* Validates js/data/writing.js – run: node scripts/check-writing.js */
"use strict";
const path = require("path");
global.window = {};
require(path.join(__dirname, "..", "js", "data", "writing.js"));
const W = window.DATA && window.DATA.writing;

let errors = 0;
const fail = msg => { errors++; console.error("✗ " + msg); };
const ok = (cond, msg) => { if (!cond) fail(msg); };
const str = v => typeof v === "string" && v.trim().length > 0;
/* same counting rule as the module: whitespace tokens containing a letter or digit */
const words = t => t.trim().split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;

ok(W, "window.DATA.writing missing");
if (!W) process.exit(1);

const ids = new Set();
const uniq = (id, where) => { ok(str(id), where + ": missing id"); ok(!ids.has(id), where + ": duplicate id " + id); ids.add(id); };

/* tags */
ok(W.tags && Object.keys(W.tags).length >= 8, "tags: expected label map");

/* criteria */
ok(Array.isArray(W.criteria) && W.criteria.length === 4, "criteria: expected 4");
(W.criteria || []).forEach(c => {
  uniq(c.id, "criteria");
  ok(str(c.name) && str(c.cz) && str(c.q), "criteria " + c.id + ": name/cz/q");
  [5, 3, 1].forEach(b => ok(c.bands && str(c.bands[b]), "criteria " + c.id + ": band " + b));
});

/* checklist, format */
ok(Array.isArray(W.checklist) && W.checklist.length >= 5, "checklist: >= 5 items");
ok(W.format && W.format.minutes === 90 && Array.isArray(W.format.parts), "format: minutes 90 + parts");

/* lessons */
const lessonTypes = new Set();
ok(Array.isArray(W.lessons) && W.lessons.length >= 6, "lessons: >= 6");
(W.lessons || []).forEach(l => {
  uniq(l.id, "lessons");
  lessonTypes.add(l.id);
  ["title", "intro", "register"].forEach(k => ok(str(l[k]), "lesson " + l.id + ": " + k));
  ok(Array.isArray(l.structure) && l.structure.length >= 3, "lesson " + l.id + ": structure");
  ok(Array.isArray(l.plan) && l.plan.every(p => str(p.h) && str(p.t)), "lesson " + l.id + ": plan");
  ok(Array.isArray(l.phrases) && l.phrases.length >= 4 && l.phrases.every(g => str(g.fn) && g.items.length >= 3 && g.items.every(str)), "lesson " + l.id + ": phrases (>=4 groups, >=3 items)");
  ok(Array.isArray(l.mistakes) && l.mistakes.length >= 4 && l.mistakes.every(m => str(m.bad) && str(m.good) && str(m.why)), "lesson " + l.id + ": mistakes");
});
const essayFns = (W.lessons.find(l => l.id === "essay") || {phrases: []}).phrases.map(g => g.fn.toLowerCase()).join("|");
["introducing", "adding", "contrasting", "concession", "opinion", "hedging", "concluding"].forEach(f => ok(essayFns.includes(f), "essay lesson: phrase group '" + f + "'"));

/* typos + traps */
ok(Array.isArray(W.typos) && W.typos.every(p => Array.isArray(p) && p.length === 2 && str(p[0]) && str(p[1]) && p[0] !== p[1]), "typos: [wrong,right] pairs");
(W.traps || []).forEach((t, i) => { try { new RegExp(t[0], "i"); } catch (e) { fail("trap " + i + ": bad regex"); } ok(str(t[1]), "trap " + i + ": tip"); });

/* rewrite */
ok(Array.isArray(W.rewrite) && W.rewrite.length >= 8, "rewrite: >= 8");
(W.rewrite || []).forEach(r => { uniq(r.id, "rewrite"); ["type", "task", "weak", "better"].forEach(k => ok(str(r[k]), "rewrite " + r.id + ": " + k)); ok(lessonTypes.has(r.type), "rewrite " + r.id + ": type must be a lesson id"); });

/* tasks */
function checkTask(t, where) {
  uniq(t.id, where);
  ["title", "model"].forEach(k => ok(str(t[k]), where + " " + t.id + ": " + k));
  ok(Array.isArray(t.scaffold) && t.scaffold.length >= 3 && t.scaffold.every(s => str(s.h) && str(s.t)), where + " " + t.id + ": scaffold >= 3 {h,t}");
  const n = words(t.model || "");
  ok(n >= 220 && n <= 260, where + " " + t.id + ": model has " + n + " words (need 220–260)");
  ok(Array.isArray(t.callouts) && t.callouts.length >= 3, where + " " + t.id + ": >= 3 callouts");
  (t.callouts || []).forEach(c => {
    ok(str(c.q) && t.model.includes(c.q), where + " " + t.id + ": callout not found in model: " + c.q);
    ok(W.tags[c.tag], where + " " + t.id + ": unknown tag " + c.tag);
    ok(str(c.cz), where + " " + t.id + ": callout cz");
  });
  ok(!/\$\{/.test(t.model), where + " " + t.id + ": template placeholder in model");
  return n;
}

ok(Array.isArray(W.part1) && W.part1.length >= 20, "part1: >= 20 essay prompts (has " + (W.part1 || []).length + ")");
const topics = new Set();
(W.part1 || []).forEach(t => {
  checkTask(t, "part1");
  ["topic", "context", "question", "task"].forEach(k => ok(str(t[k]), "part1 " + t.id + ": " + k));
  ok(Array.isArray(t.points) && t.points.length === 3 && t.points.every(str), "part1 " + t.id + ": 3 notes (exam: discuss two of three)");
  ok(Array.isArray(t.opinions) && t.opinions.length === 3 && t.opinions.every(str), "part1 " + t.id + ": 3 opinions");
  topics.add(t.topic);
});
ok(topics.size >= 8, "part1: >= 8 distinct topics (has " + topics.size + ")");

const TYPES = ["letter", "email", "proposal", "report", "review"];
const byType = {};
ok(Array.isArray(W.part2) && W.part2.length >= 30, "part2: >= 30 prompts (has " + (W.part2 || []).length + ")");
(W.part2 || []).forEach(t => {
  checkTask(t, "part2");
  ok(TYPES.includes(t.type), "part2 " + t.id + ": bad type " + t.type);
  ok(["formal", "informal", "neutral"].includes(t.register), "part2 " + t.id + ": register");
  ["prompt", "instruction"].forEach(k => ok(str(t[k]), "part2 " + t.id + ": " + k));
  ok(Array.isArray(t.require) && t.require.length >= 2 && t.require.every(str), "part2 " + t.id + ": >= 2 required points");
  if (t.type === "proposal" || t.type === "report") ok(t.model.split("\n").filter(l => l.trim() && l.trim().length < 45 && !/[.!?]$/.test(l.trim())).length >= 4, "part2 " + t.id + ": model should have headings");
  if (t.type === "letter" || t.type === "email") ok(/^(Dear|Hi|Hello)\b/.test(t.model.trim()), "part2 " + t.id + ": letter must open with a greeting");
  const k = t.type === "email" ? "letter" : t.type;
  byType[k] = (byType[k] || 0) + 1;
});
["letter", "proposal", "report", "review"].forEach(k => ok((byType[k] || 0) >= 6, "part2: at least 6 of type " + k + " (has " + (byType[k] || 0) + ")"));

const all = [...W.part1, ...W.part2].map(t => words(t.model));
console.log("part1:", W.part1.length, "| part2:", W.part2.length, JSON.stringify(byType), "| lessons:", W.lessons.length, "| rewrite:", W.rewrite.length, "| typos:", W.typos.length, "| traps:", W.traps.length);
console.log("model answers words: min", Math.min(...all), "max", Math.max(...all), "avg", Math.round(all.reduce((a, b) => a + b, 0) / all.length));
if (errors) { console.error(errors + " error(s)"); process.exit(1); }
console.log("✓ writing data OK");
