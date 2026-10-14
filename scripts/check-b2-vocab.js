#!/usr/bin/env node
/* Validates b2/js/data/vocab.js (B2 First vocabulary trainer).
   Run: node scripts/check-b2-vocab.js [--cefr <file.csv|dir> ...]
   Optional level check: pass the open CEFR-J vocabulary profile (and/or the Octanove C1/C2 profile) as CSV files
   (https://github.com/openlanguageprofiles/olp-en-cefrj, CC BY-SA). Keep the downloads outside the repo. */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const file = path.join(__dirname, "..", "b2", "js", "data", "vocab.js");
const ctx = {window: {}}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(file, "utf8"), ctx, {filename: file});
const V = ctx.window.DATA && ctx.window.DATA.vocab;
if (!V) { console.error("DATA.vocab missing"); process.exit(1); }
const errors = [], warns = [];
const err = m => errors.push(m), warn = m => warns.push(m);

/* ---------- helpers ---------- */
const IRREG = {give: ["gave", "given"], take: ["took", "taken"], get: ["got", "gotten"], bring: ["brought"], come: ["came"], break: ["broke", "broken"],
  fall: ["fell", "fallen"], go: ["went", "gone", "goes"], grow: ["grew", "grown"], hang: ["hung"], hold: ["held"], keep: ["kept"], make: ["made"], pay: ["paid"],
  run: ["ran"], sell: ["sold"], stand: ["stood"], wake: ["woke", "woken"], wear: ["wore", "worn"], blow: ["blew", "blown"], do: ["did", "done", "does", "doing"],
  lie: ["lay", "lain", "lying"], see: ["saw", "seen"], find: ["found"], eat: ["ate", "eaten"], catch: ["caught"], tell: ["told"], say: ["said"], spend: ["spent"],
  lose: ["lost"], win: ["won"], beat: ["beaten"], think: ["thought"], feel: ["felt"], meet: ["met"], leave: ["left"], lend: ["lent"], steal: ["stole", "stolen"],
  rise: ["rose", "risen"], have: ["had", "has", "having"], be: ["was", "were", "is", "are", "been"], drive: ["drove", "driven"], ring: ["rang", "rung"],
  send: ["sent"], deal: ["dealt"], hear: ["heard"], speak: ["spoke", "spoken"], choose: ["chose", "chosen"], throw: ["threw", "thrown"], die: ["dying"],
  can: ["can't"], buy: ["bought"], fly: ["flew", "flown"], lay: ["laid"], my: ["your", "his", "her", "our", "their"]};
const SKIP = new Set(["sb", "sth", "someone", "someone's", "something", "one's", "oneself", "your", "my", "a", "an", "the", "to", "of", "be", "is", "it's", "that", "n", "v", "adj", "adv"]);
const forms = w => [w, ...(IRREG[w] || []), ...(/[^e]e$/.test(w) ? [w.slice(0, -1) + "ing"] : [])];
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const stemOk = (word, text) => forms(word).some(f => {
  const p = f.length <= 4 ? f : f.slice(0, Math.max(4, f.length - 3));
  return new RegExp("(^|[^a-z])" + esc(p), "i").test(text);
});
const words = en => en.replace(/\(.*?\)/g, " ").toLowerCase().split(/[^a-z'-]+/).filter(w => w && !SKIP.has(w));
const bolds = ex => [...ex.matchAll(/\*\*(.+?)\*\*/g)].map(m => m[1]);
const lc = s => String(s).toLowerCase();
const PREPOSITIONS = new Set(["about", "against", "among", "at", "between", "by", "for", "from", "in", "into", "of", "on", "over", "to", "towards", "upon", "with"]);
const NEED_DIS = new Set(["phrasal verb", "collocation", "confusable", "linker"]);
const MIN_TYPE = {"phrasal verb": 140, "collocation": 140, "dependent preposition": 75, "idiom": 55, "linker": 38, "confusable": 55, "topic vocabulary": 150};

/* ---------- structure ---------- */
const TYPES = new Set((V.types || []).map(t => t.id)), TOPICS = new Set((V.topics || []).map(t => t.id));
for (const t of V.types || []) if (!t.id || !t.cs) err(`type without id/cs: ${JSON.stringify(t)}`);
for (const t of V.topics || []) if (!t.id || !t.cs) err(`topic without id/cs: ${JSON.stringify(t)}`);
const ids = new Set(), ens = new Map(), exs = new Set(), gaps = new Set();
const byType = {}, byTopic = {}, topicVocab = {};

for (const c of V.cards || []) {
  const where = c.id || JSON.stringify(c).slice(0, 60);
  for (const k of ["id", "type", "en", "cs", "ex", "gap", "topic"]) if (!c[k] || typeof c[k] !== "string" || !c[k].trim()) err(`${where}: missing ${k}`);
  if (typeof c.ex !== "string" || typeof c.gap !== "string" || typeof c.en !== "string") continue;
  if (!/^[a-z0-9-]+$/.test(c.id)) err(`${where}: id must be lowercase a-z0-9-`);
  if (ids.has(c.id)) err(`${where}: duplicate id`); ids.add(c.id);
  if (!TYPES.has(c.type)) err(`${where}: unknown type ${c.type}`);
  if (!TOPICS.has(c.topic)) err(`${where}: unknown topic ${c.topic}`);
  const key = lc(c.en).trim();
  if (ens.has(key)) err(`${where}: duplicate entry "${c.en}" (also ${ens.get(key)})`); ens.set(key, c.id);
  if (exs.has(c.ex)) err(`${where}: duplicate example sentence`); exs.add(c.ex);
  if (gaps.has(c.gap)) err(`${where}: duplicate gap sentence`); gaps.add(c.gap);
  if (!/[.!?"]$/.test(c.ex)) err(`${where}: example must end with . ! ? or "`);
  if (/\s{2,}/.test(c.ex)) err(`${where}: double space in example`);
  if (!/[a-záčďéěíňóřšťúůýž]/i.test(c.cs)) err(`${where}: cs looks empty`);
  const b = bolds(c.ex);
  if (b.length !== 1) { err(`${where}: example must contain exactly one **bold** target (found ${b.length})`); continue; }
  const ans = b[0];
  // gap = the same sentence with the target replaced by ____
  if ((c.gap.match(/____/g) || []).length !== 1) err(`${where}: gap must contain exactly one ____`);
  if (c.ex.replace(/\*\*(.+?)\*\*/, "____") !== c.gap) err(`${where}: gap is not the example with the target replaced`);
  if (/\*\*/.test(c.gap)) err(`${where}: gap still contains bold markers`);
  // the example really uses the item: every content word of `en` appears (allowing inflection / irregular forms)
  const plain = c.ex.replace(/\*\*/g, ""), ws = words(c.en);
  for (const w of ws) if (!w.split("-").filter(Boolean).every(p => SKIP.has(p) || stemOk(p, plain))) err(`${where}: example does not contain "${w}" from "${c.en}"`);
  // the bold target is tied to the item
  const bl = lc(ans), tied = lc(c.en).includes(bl) || bl.split(/[\s-]+/).some(t => t.length > 1 && ws.some(w => w.split("-").some(p => forms(p).some(f => f.slice(0, 3) === t.slice(0, 3)))));
  if (!tied) err(`${where}: bold target "${ans}" not related to "${c.en}"`);
  if (c.type === "dependent preposition") {
    if (!PREPOSITIONS.has(bl)) err(`${where}: target "${ans}" is not a preposition`);
    if (!new RegExp("\\b" + esc(bl) + "\\b").test(lc(c.en))) err(`${where}: preposition "${ans}" not in "${c.en}"`);
  }
  if (c.type === "linker" && lc(c.en) !== bl) err(`${where}: linker target "${ans}" must equal en "${c.en}"`);
  // distractors
  const alt = c.alt || [];
  if (c.alt !== undefined && (!Array.isArray(c.alt) || !c.alt.length || c.alt.some(a => typeof a !== "string" || !a.trim()))) err(`${where}: alt must be a non-empty array of strings`);
  if (alt.some(a => lc(a) === bl)) err(`${where}: alt repeats the answer`);
  if (c.dis !== undefined) {
    if (!Array.isArray(c.dis) || c.dis.length < 3) err(`${where}: dis must have >= 3 distractors`);
    else {
      const dl = c.dis.map(lc);
      if (dl.includes(bl)) err(`${where}: distractor equals the answer`);
      if (dl.some(d => alt.map(lc).includes(d))) err(`${where}: distractor equals an accepted alternative`);
      if (new Set(dl).size !== dl.length) err(`${where}: duplicate distractors`);
      if (c.dis.some(d => !d.trim())) err(`${where}: empty distractor`);
      const upper = /^[A-Z]/.test(ans) && !/^[A-Z]{2}/.test(ans);
      if (c.dis.some(d => /^[A-Z]/.test(d) !== upper)) err(`${where}: distractors must match the capitalisation of "${ans}"`);
    }
  } else if (NEED_DIS.has(c.type)) err(`${where}: ${c.type} needs dis (exam-style distractors)`);
  if (c.tip !== undefined && (typeof c.tip !== "string" || !c.tip.trim())) err(`${where}: empty tip`);
  byType[c.type] = (byType[c.type] || 0) + 1; byTopic[c.topic] = (byTopic[c.topic] || 0) + 1;
  if (c.type === "topic vocabulary") topicVocab[c.topic] = (topicVocab[c.topic] || 0) + 1;
}

/* ---------- word families (Use of English Part 3) ---------- */
const stems = new Set(), famSentences = new Set(); let famItems = 0;
for (const f of V.wordFamilies || []) {
  const w = f.stem || "?";
  if (!f.stem || f.stem !== f.stem.toUpperCase()) err(`family ${w}: stem must be UPPERCASE`);
  if (stems.has(f.stem)) err(`family ${w}: duplicate stem`); stems.add(f.stem);
  if (!f.cs) err(`family ${w}: missing cs`);
  let ok = true;
  for (const k of ["noun", "adj", "adv", "verb", "neg"]) if (!Array.isArray(f[k])) { err(`family ${w}: ${k} must be an array`); ok = false; }
  if (!ok) continue;
  const all = new Set([...f.noun, ...f.adj, ...f.adv, ...f.verb, ...f.neg].map(lc));
  if (all.size < 2) err(`family ${w}: needs at least 2 forms`);
  for (const n of f.neg) if (![...f.noun, ...f.adj, ...f.adv, ...f.verb].map(lc).includes(lc(n)) && !/^(un|in|im|ir|il|dis|mis|over|under)/.test(n)) warn(`family ${w}: negative form "${n}" has no negative prefix`);
  if (!f.items || !f.items.length) err(`family ${w}: needs at least one sentence`);
  for (const it of f.items || []) {
    famItems++;
    if (typeof it.s !== "string" || (it.s.match(/____/g) || []).length !== 1) { err(`family ${w}: sentence needs exactly one ____: ${it.s}`); continue; }
    if (famSentences.has(it.s)) err(`family ${w}: duplicate sentence: ${it.s}`); famSentences.add(it.s);
    if (!it.a) { err(`family ${w}: missing answer`); continue; }
    const a = lc(it.a);
    if (a === lc(f.stem)) err(`family ${w}: answer equals the stem: ${it.s}`);
    if (it.s.startsWith("____") !== /^[A-Z]/.test(it.a)) err(`family ${w}: capitalisation of "${it.a}" does not match its position`);
    const base = [a, a.replace(/ies$/, "y"), a.replace(/es$/, ""), a.replace(/s$/, ""), a.replace(/d$/, ""), a.replace(/ed$/, "")];
    if (!base.some(b => all.has(b))) err(`family ${w}: answer "${it.a}" not listed among the forms`);
  }
}

/* ---------- counts ---------- */
const need = (cond, m) => { if (!cond) err(m); };
const cards = V.cards || [];
need(cards.length >= 700, `cards: ${cards.length} < 700`);
need((V.wordFamilies || []).length >= 80, `wordFamilies: ${(V.wordFamilies || []).length} < 80`);
for (const t of TYPES) need((byType[t] || 0) >= (MIN_TYPE[t] || 30), `type "${t}" has only ${byType[t] || 0} cards (min ${MIN_TYPE[t] || 30})`);
for (const t of TOPICS) {
  need((byTopic[t] || 0) >= 30, `topic "${t}" has only ${byTopic[t] || 0} cards (min 30)`);
  need((topicVocab[t] || 0) >= 10, `topic "${t}" has only ${topicVocab[t] || 0} topic-vocabulary cards (min 10)`);
}

/* ---------- optional CEFR level check ---------- */
const argv = process.argv.slice(2), cefrFiles = [];
for (let i = 0; i < argv.length; i++) if (argv[i] === "--cefr" && argv[i + 1]) {
  const p = argv[++i];
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) fs.readdirSync(p).filter(f => f.endsWith(".csv")).forEach(f => cefrFiles.push(path.join(p, f)));
  else cefrFiles.push(p);
}
let levelReport = "";
if (cefrFiles.length) {
  const RANK = {A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6};
  const lex = new Map();
  const csvRow = line => { const out = []; let cur = "", q = false; for (const ch of line) { if (ch === '"') q = !q; else if (ch === "," && !q) { out.push(cur); cur = ""; } else cur += ch; } out.push(cur); return out; };
  for (const f of cefrFiles) {
    const rows = fs.readFileSync(f, "utf8").split(/\r?\n/).filter(Boolean).map(csvRow);
    const h = rows.shift().map(s => s.trim().toLowerCase()), hi = h.indexOf("headword"), li = h.indexOf("cefr");
    if (hi < 0 || li < 0) { warn(`CEFR file ${f}: no headword/CEFR columns – skipped`); continue; }
    for (const r of rows) { const lv = RANK[(r[li] || "").trim()]; if (!lv) continue;
      for (const hw of (r[hi] || "").split("/")) { const k = hw.trim().toLowerCase(); if (k && (!lex.has(k) || lex.get(k) > lv)) lex.set(k, lv); } }
  }
  const REV = {}; for (const [b, fs2] of Object.entries(IRREG)) for (const x of fs2) REV[x] = b;
  const FUNC = new Set(["up", "down", "in", "out", "on", "off", "away", "back", "over", "into", "with", "for", "at", "by", "from", "about", "round", "through", "after", "along", "apart", "behind", "ahead", "without", "forward", "between", "towards", "upon", "and", "or", "but", "not", "no", "so", "as", "if", "than", "what's", "there's", "can't", "it", "you", "me", "who", "all", "both"]);
  const level = w => {
    const c = [w, REV[w], w.replace(/'s$/, ""), w.replace(/ies$/, "y"), w.replace(/es$/, ""), w.replace(/s$/, ""), w.replace(/ed$/, ""), w.replace(/ed$/, "e"), w.replace(/d$/, ""),
      w.replace(/ing$/, ""), w.replace(/ing$/, "e"), w.replace(/ly$/, ""), w.replace(/ily$/, "y"), w.replace(/ally$/, "al")].filter(Boolean);
    let best = 0; for (const x of c) { const l = lex.get(x); if (l && (!best || l < best)) best = l; } return best;
  };
  let cardsOk = 0, above = [], unlisted = new Map();
  for (const c of cards) {
    const toks = words(c.en).flatMap(w => w.split("-")).filter(w => w && !FUNC.has(w) && !SKIP.has(w));
    let ok = true;
    for (const t of toks) { const l = level(t); if (l >= 5) { above.push(`${t} (${c.id})`); ok = false; } else if (!l) { unlisted.set(t, (unlisted.get(t) || 0) + 1); ok = false; } }
    if (ok) cardsOk++;
  }
  const stemAbove = (V.wordFamilies || []).filter(f => level(lc(f.stem)) >= 5).map(f => f.stem);
  const pct = Math.round(1000 * cardsOk / cards.length) / 10;
  levelReport = `CEFR: ${pct} % of cards have every headword in A1–B2 (${lex.size} lemmas loaded); C1/C2 headwords: ${above.length}; not listed: ${unlisted.size} words`;
  if (unlisted.size) warns.push("CEFR: not in the lists (usually compounds/proper names): " + [...unlisted.keys()].sort().join(", "));
  if (above.length) warns.push("CEFR: C1/C2 headwords: " + above.join(", "));
  if (stemAbove.length) warns.push("CEFR: C1/C2 word-family stems: " + stemAbove.join(", "));
  need(pct >= 85, `CEFR: only ${pct} % of cards are fully A1–B2 (min 85 %)`);
  need(above.length <= Math.ceil(cards.length * 0.02), `CEFR: too many C1/C2 headwords (${above.length})`);
}

console.log(`cards: ${cards.length}, word families: ${(V.wordFamilies || []).length} (${famItems} sentences)`);
console.log("per type:", JSON.stringify(byType));
console.log("per topic:", JSON.stringify(byTopic));
console.log("topic vocabulary per topic:", JSON.stringify(topicVocab));
if (levelReport) console.log(levelReport);
warns.forEach(w => console.warn("WARN", w));
if (errors.length) { errors.forEach(e => console.error("ERROR", e)); console.error(`${errors.length} error(s)`); process.exit(1); }
console.log("OK – B2 vocab data valid");
