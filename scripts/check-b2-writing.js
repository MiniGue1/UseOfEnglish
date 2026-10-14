#!/usr/bin/env node
/* Validates b2/js/data/writing.js (B2 First Writing) – run: node scripts/check-b2-writing.js
   Checks structure, unique ids, the real B2 format (Part 1: question + 2 notes + own idea; Part 2: article,
   email/letter, report, review – no proposal), model answers 140–190 words, callouts found in the models. */
"use strict";
const path = require("path");
global.window = {};
require(path.join(__dirname, "..", "b2", "js", "data", "writing.js"));
const W = window.DATA && window.DATA.writing;

let errors = 0;
const fail = msg => { errors++; console.error("✗ " + msg); };
const ok = (cond, msg) => { if (!cond) fail(msg); };
const str = v => typeof v === "string" && v.trim().length > 0;
/* same counting rule as the module: whitespace tokens containing a letter or digit */
const words = t => t.trim().split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
const WMIN = 140, WMAX = 190;

ok(W, "window.DATA.writing missing");
if (!W) process.exit(1);

const ids = new Set();
const uniq = (id, where) => { ok(str(id), where + ": missing id"); ok(!ids.has(id), where + ": duplicate id " + id); ids.add(id); };

/* tags */
ok(W.tags && Object.keys(W.tags).length >= 10 && Object.values(W.tags).every(str), "tags: expected label map (>= 10)");
ok(W.tags && W.tags.ownidea, "tags: 'ownidea' label (Part 1 own idea)");

/* format */
const F = W.format || {};
ok(F.minutes === 80, "format.minutes must be 80 (B2 First Writing = 1 h 20 min)");
ok(str(F.intro) && /140–190/.test(F.intro), "format.intro must mention 140–190 words");
ok(str(F.p1Instruction), "format.p1Instruction");
ok(Array.isArray(F.parts) && F.parts.length === 2 && F.parts.every(p => str(p.name) && str(p.text)), "format.parts: 2 × {name,text}");
ok(str(F.criteria), "format.criteria");
ok(!/proposal/i.test(JSON.stringify(F).replace(/Proposal ani esej/i, "")), "format: B2 Part 2 has no proposal");

/* criteria */
ok(Array.isArray(W.criteria) && W.criteria.length === 4, "criteria: expected 4");
ok(JSON.stringify((W.criteria || []).map(c => c.id)) === JSON.stringify(["content", "ca", "org", "lang"]), "criteria ids must be content, ca, org, lang (AI 'take marks' uses them)");
(W.criteria || []).forEach(c => {
  uniq(c.id, "criteria");
  ok(str(c.name) && str(c.cz) && str(c.q), "criteria " + c.id + ": name/cz/q");
  [5, 3, 1].forEach(b => ok(c.bands && str(c.bands[b]), "criteria " + c.id + ": band " + b));
});

/* checklist */
ok(Array.isArray(W.checklist) && W.checklist.length >= 6 && W.checklist.every(str), "checklist: >= 6 items");
ok((W.checklist || []).some(c => /140–190/.test(c)), "checklist: word range 140–190");
ok((W.checklist || []).some(c => /vlastní/i.test(c)), "checklist: mentions the own idea");

/* lessons */
const LESSONS = ["essay", "article", "email-informal", "email-formal", "report", "review"];
ok(Array.isArray(W.lessons) && W.lessons.length === LESSONS.length, "lessons: exactly " + LESSONS.length);
const lessonIds = new Set();
(W.lessons || []).forEach(l => {
  uniq(l.id, "lessons");
  lessonIds.add(l.id);
  ok(LESSONS.includes(l.id), "lesson " + l.id + ": unexpected id");
  ["title", "intro", "register", "type", "tip"].forEach(k => ok(str(l[k]), "lesson " + l.id + ": " + k));
  ok(Array.isArray(l.structure) && l.structure.length >= 3 && l.structure.every(str), "lesson " + l.id + ": structure >= 3");
  ok(Array.isArray(l.plan) && l.plan.length >= 3 && l.plan.every(p => str(p.h) && str(p.t)), "lesson " + l.id + ": plan");
  ok(Array.isArray(l.phrases) && l.phrases.length >= 4 && l.phrases.every(g => str(g.fn) && Array.isArray(g.items) && g.items.length >= 3 && g.items.every(str)), "lesson " + l.id + ": phrases (>= 4 groups, >= 3 items)");
  ok(Array.isArray(l.mistakes) && l.mistakes.length >= 5 && l.mistakes.every(m => str(m.bad) && str(m.good) && str(m.why)), "lesson " + l.id + ": mistakes >= 5");
  /* B2 phrase banks stay natural: no showpiece C1 linkers */
  const bank = l.phrases.map(g => g.items.join(" ")).join(" ");
  ok(!/\b(notwithstanding|albeit|whereby|hence|thus|nonetheless|furthermore|moreover)\b/i.test(bank), "lesson " + l.id + ": phrase bank contains over-formal C1 linkers");
});
LESSONS.forEach(id => ok(lessonIds.has(id), "lessons: missing " + id));
const essay = (W.lessons || []).find(l => l.id === "essay") || {phrases: []};
const essayFns = essay.phrases.map(g => g.fn.toLowerCase()).join("|");
["introducing", "adding", "contrasting", "opinion", "examples", "own idea", "concluding"].forEach(f => ok(essayFns.includes(f), "essay lesson: phrase group '" + f + "'"));

/* typos + traps */
ok(Array.isArray(W.typos) && W.typos.length >= 30 && W.typos.every(p => Array.isArray(p) && p.length === 2 && str(p[0]) && str(p[1]) && p[0] !== p[1]), "typos: [wrong,right] pairs");
ok(new Set((W.typos || []).map(p => p[0])).size === (W.typos || []).length, "typos: duplicate wrong spelling");
ok(Array.isArray(W.traps) && W.traps.length >= 20, "traps: >= 20");
(W.traps || []).forEach((t, i) => { try { new RegExp(t[0], "gi"); } catch (e) { fail("trap " + i + ": bad regex " + t[0]); } ok(str(t[1]), "trap " + i + ": tip"); });
const trapHit = (re, s) => new RegExp(re, "i").test(s);
[["I am agree with you", true], ["If it will rain tomorrow, we stay", true], ["I have 18 years", true], ["I am 18 years old", false], ["I look forward to hear from you", true]]
  .forEach(([s, exp]) => ok((W.traps || []).some(t => !/english\|czech/.test(t[0]) && trapHit(t[0], s)) === exp, "traps: '" + s + "' should " + (exp ? "" : "not ") + "be flagged"));

/* rewrite */
ok(Array.isArray(W.rewrite) && W.rewrite.length >= 10, "rewrite: >= 10");
(W.rewrite || []).forEach(r => {
  uniq(r.id, "rewrite");
  ["type", "task", "weak", "better", "why"].forEach(k => ok(str(r[k]), "rewrite " + r.id + ": " + k));
  ok(lessonIds.has(r.type), "rewrite " + r.id + ": type must be a lesson id");
});
LESSONS.forEach(id => ok((W.rewrite || []).some(r => r.type === id), "rewrite: no exercise for lesson " + id));

/* tasks */
const STOP = new Set("the a an and or but of to in on at for with by from as is are was were be it this that their your who what which how".split(" "));
function checkTask(t, where) {
  uniq(t.id, where);
  ["title", "model"].forEach(k => ok(str(t[k]), where + " " + t.id + ": " + k));
  ok(Array.isArray(t.scaffold) && t.scaffold.length >= 3 && t.scaffold.every(s => str(s.h) && str(s.t)), where + " " + t.id + ": scaffold >= 3 {h,t}");
  const n = words(t.model || "");
  ok(n >= WMIN && n <= WMAX, where + " " + t.id + ": model has " + n + " words (need " + WMIN + "–" + WMAX + ")");
  ok(Array.isArray(t.callouts) && t.callouts.length >= 3, where + " " + t.id + ": >= 3 callouts");
  (t.callouts || []).forEach(c => {
    ok(str(c.q) && t.model.includes(c.q), where + " " + t.id + ": callout not found in model: " + c.q);
    ok(W.tags[c.tag], where + " " + t.id + ": unknown tag " + c.tag);
    ok(str(c.cz), where + " " + t.id + ": callout cz");
  });
  ok(new Set((t.callouts || []).map(c => c.q)).size === (t.callouts || []).length, where + " " + t.id + ": duplicate callout");
  ok(!/\$\{/.test(t.model), where + " " + t.id + ": template placeholder in model");
  ok(!/\b(notwithstanding|albeit|whereby|hitherto|henceforth)\b/i.test(t.model), where + " " + t.id + ": model uses showpiece C2 vocabulary");
  const heavy = (t.model.match(/\b(moreover|furthermore|nevertheless|nonetheless|consequently|thus|hence)\b/gi) || []).length;
  ok(heavy <= 1, where + " " + t.id + ": model uses " + heavy + " over-formal linkers (max 1)");
  const pcount = t.model.split(/\n\s*\n/).filter(p => p.trim()).length;
  ok(pcount >= (t.part === 1 ? 5 : 4), where + " " + t.id + ": model has only " + pcount + " paragraphs");
  return n;
}

ok(Array.isArray(W.part1) && W.part1.length >= 20, "part1: >= 20 essay prompts (has " + (W.part1 || []).length + ")");
const topics = new Set();
(W.part1 || []).forEach(t => {
  t = Object.assign({part: 1}, t);
  checkTask(t, "part1");
  ok(/^e\d{2}$/.test(t.id), "part1 " + t.id + ": id must be eNN");
  ["topic", "context", "question"].forEach(k => ok(str(t[k]), "part1 " + t.id + ": " + k));
  ok(/teacher has asked you to write an essay/.test(t.context), "part1 " + t.id + ": context should follow the exam wording");
  ok(/\?$/.test(t.question), "part1 " + t.id + ": question must end with ?");
  ok(Array.isArray(t.points) && t.points.length === 2 && t.points.every(str), "part1 " + t.id + ": exactly 2 notes (the 3rd is the candidate's own idea)");
  ok(!t.opinions, "part1 " + t.id + ": no opinions bubbles in B2 First");
  ok(Array.isArray(t.ownIdeas) && t.ownIdeas.length >= 2 && t.ownIdeas.every(str), "part1 " + t.id + ": >= 2 ownIdeas suggestions");
  ok(t.scaffold.length >= 5 && t.scaffold.some(s => /vlastní/i.test(s.h)), "part1 " + t.id + ": scaffold must have 5 steps incl. 'Vlastní nápad'");
  ok(t.callouts.some(c => c.tag === "ownidea"), "part1 " + t.id + ": a callout must point out the own idea");
  /* both notes must be discussed in the model (keyword check) */
  const low = t.model.toLowerCase();
  (t.points || []).forEach(p => {
    const keys = p.toLowerCase().split(/\W+/).filter(w => w.length > 3 && !STOP.has(w));
    ok(keys.some(w => low.includes(w.slice(0, 5))), "part1 " + t.id + ": model does not seem to cover note '" + p + "'");
  });
  topics.add(t.topic);
});
ok(topics.size >= 12, "part1: >= 12 distinct topics (has " + topics.size + ")");

const TYPES = ["article", "email", "letter", "report", "review"];
const INSTR = {article: /^Write your article\.$/, review: /^Write your review\.$/, report: /^Write your report\.$/, email: /^Write your email\.$/, letter: /^Write your letter( of application)?\.$/};
const byGroup = {};
ok(Array.isArray(W.part2) && W.part2.length >= 30, "part2: >= 30 prompts (has " + (W.part2 || []).length + ")");
(W.part2 || []).forEach(t => {
  t = Object.assign({part: 2}, t);
  checkTask(t, "part2");
  ok(TYPES.includes(t.type), "part2 " + t.id + ": bad type " + t.type + " (B2 First: article, email, letter, report, review)");
  ok(["formal", "informal", "neutral"].includes(t.register), "part2 " + t.id + ": register");
  ["prompt", "instruction"].forEach(k => ok(str(t[k]), "part2 " + t.id + ": " + k));
  ok(t.notice === undefined || str(t.notice), "part2 " + t.id + ": notice must be a non-empty string if present");
  ok(INSTR[t.type] && INSTR[t.type].test(t.instruction), "part2 " + t.id + ": instruction '" + t.instruction + "' does not match type " + t.type);
  ok(Array.isArray(t.require) && t.require.length >= 2 && t.require.every(str), "part2 " + t.id + ": >= 2 required points");
  const lines = t.model.split("\n").map(l => l.trim()).filter(Boolean);
  const head = l => l.length < 80 && !/[.,:;]$/.test(l) && words(l) <= 12;
  if (t.type === "report") ok(lines.filter(head).length >= 4, "part2 " + t.id + ": report needs a title + >= 3 headings");
  if (t.type === "article" || t.type === "review") ok(head(lines[0]), "part2 " + t.id + ": " + t.type + " should start with a title line");
  if (t.type === "article") ok(/\?/.test(t.model), "part2 " + t.id + ": article should address the reader with a question");
  if (t.type === "review") ok(/recommend|worth|don't miss|ideal for/i.test(t.model), "part2 " + t.id + ": review must recommend");
  if (t.type === "email" || t.type === "letter") {
    ok(/^(Dear|Hi|Hello)\b/.test(t.model.trim()), "part2 " + t.id + ": letter/email must open with a greeting");
    ok(["formal", "informal"].includes(t.register), "part2 " + t.id + ": email/letter register must be formal or informal");
    if (t.register === "formal") {
      ok(/^Dear (Sir or Madam|Mr|Mrs|Ms)\b/.test(t.model.trim()), "part2 " + t.id + ": formal greeting");
      ok(/Yours (faithfully|sincerely),/.test(t.model), "part2 " + t.id + ": formal sign-off");
      if (/^Dear Sir or Madam/.test(t.model.trim())) ok(/Yours faithfully/.test(t.model), "part2 " + t.id + ": Dear Sir or Madam → Yours faithfully");
      else ok(/Yours sincerely/.test(t.model), "part2 " + t.id + ": Dear + name → Yours sincerely");
      ok(!/\b(don't|can't|I'm|it's|won't|I've|I'd)\b/.test(t.model), "part2 " + t.id + ": contractions in a formal letter");
    } else {
      ok(/\b(I'm|I've|you're|it's|don't|I'll|you'll|that's|can't|I'd|let's)\b/.test(t.model), "part2 " + t.id + ": informal email should use contractions");
      ok(!/Yours (faithfully|sincerely)/.test(t.model), "part2 " + t.id + ": formal sign-off in an informal email");
    }
  }
  const g = t.type === "letter" ? "email" : t.type;
  byGroup[g] = (byGroup[g] || 0) + 1;
});
["article", "email", "report", "review"].forEach(k => ok((byGroup[k] || 0) >= 7, "part2: at least 7 of type " + k + " (has " + (byGroup[k] || 0) + ")"));
const mails = (W.part2 || []).filter(t => t.type === "email" || t.type === "letter");
ok(mails.filter(t => t.register === "formal").length >= 3 && mails.filter(t => t.register === "informal").length >= 3, "part2: >= 3 formal and >= 3 informal emails/letters");

const all = [...(W.part1 || []), ...(W.part2 || [])].map(t => words(t.model));
console.log("part1:", (W.part1 || []).length, "| part2:", (W.part2 || []).length, JSON.stringify(byGroup), "| lessons:", (W.lessons || []).length, "| rewrite:", (W.rewrite || []).length, "| typos:", (W.typos || []).length, "| traps:", (W.traps || []).length);
if (all.length) console.log("model answers words: min", Math.min(...all), "max", Math.max(...all), "avg", Math.round(all.reduce((a, b) => a + b, 0) / all.length));
if (errors) { console.error(errors + " error(s)"); process.exit(1); }
console.log("✓ B2 writing data OK");
