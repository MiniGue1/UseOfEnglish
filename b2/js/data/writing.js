/* B2 First – Writing data (Part 1 compulsory essay: question + two notes + own idea; Part 2 article, email/letter, report, review).
   All prompts and model answers are original. Czech = UI/teaching text, English = exam content.
   Model answers: 140–190 words, written like a strong B2 candidate (band 5 at B2) – natural and accurate, not a C1/C2 showpiece. */
window.DATA = window.DATA || {};
window.DATA.writing = {

/* ---------- labels for annotated callouts in model answers ---------- */
tags: {
  topic: "Topic sentence",
  opinion: "Vyjádření názoru",
  ownidea: "Vlastní nápad (3. bod)",
  linker: "Spojovací výraz",
  contrast: "Kontrast / ústupka",
  example: "Příklad",
  reason: "Důvod a důsledek",
  relative: "Vztažná věta",
  conditional: "Kondicionál",
  passive: "Trpný rod",
  modal: "Modální sloveso",
  gerund: "Gerundium / infinitiv",
  tense: "Slovesný čas",
  comparison: "Srovnání",
  collocation: "Kolokace",
  phrasal: "Frázové sloveso",
  evaluative: "Hodnoticí slovník",
  register: "Registr",
  title: "Nadpis",
  heading: "Nadpis sekce",
  question: "Otázka na čtenáře",
  opening: "Úvod / oslovení",
  closing: "Závěr / rozloučení",
  recommend: "Doporučení",
  quantity: "Kvantifikace",
  reference: "Odkazování (koheze)"
},

/* ---------- exam format overview ---------- */
format: {
  minutes: 80,
  p1Instruction: "Write an essay using all the notes and giving reasons for your point of view.",
  intro: "Písemná část B2 First trvá 1 hodinu 20 minut a má dvě části. Obě mají stejnou váhu a každý text má 140–190 slov. Doporučené rozdělení času: 40 minut na každou část (cca 8 min plánování, 25 min psaní, 7 min kontrola). Na B2 nemusíš psát „knižně“: zkoušející chce jasný, přesný a přirozený text ve správném registru. Vzácná slova, inverze a moreover v každé větě body nepřidají – spíš uberou, když zní strojeně nebo jsou v nich chyby.",
  parts: [
    {name: "Part 1 – Essay (povinná)", text: "Dostaneš krátkou situaci (o tématu jste mluvili ve škole), otázku a poznámky: DVA body jsou dané a třetí je „your own idea“. Musíš napsat o OBOU daných bodech a přidat VLASTNÍ třetí nápad, který se od nich liší. Zadání chce tvůj názor s důvody („giving reasons for your point of view“). Registr: neutrální až mírně formální."},
    {name: "Part 2 – výběr ze tří", text: "Vybereš si JEDNU ze tří úloh: článek (article), e-mail nebo dopis (formální i neformální), report nebo recenze (review). Zadání má krátký kontext a otázky, na které musíš odpovědět všechny. Proposal ani esej v Part 2 nejsou."}
  ],
  criteria: "Každý text se hodnotí ve čtyřech kritériích po 0–5 bodech: Content, Communicative Achievement, Organisation, Language – max. 20 bodů za úlohu, 40 celkem. Pro B2 (160 bodů na Cambridge Scale) potřebuješ zhruba 24 ze 40, tedy v průměru 3 v každém kritériu."
},

/* ---------- B2 First assessment criteria – descriptors paraphrased in Czech ---------- */
criteria: [
  {id: "content", name: "Content", cz: "Obsah",
   q: "Splnil(a) jsem úkol? Pokryl(a) jsem všechny body zadání (v eseji obě poznámky + vlastní nápad) a je čtenář plně informován?",
   bands: {
     5: "Veškerý obsah je relevantní k zadání. Čtenář je plně informován – všechny body zadání jsou pokryté a rozvinuté.",
     3: "Drobné odbočky nebo vynechání, ale čtenář je celkově informován. Některý bod je jen zmíněný, ne rozvinutý.",
     1: "Odbočky od tématu nebo nepochopení zadání; čtenář je informován jen minimálně (chybí podstatné body)."
   }},
  {id: "ca", name: "Communicative Achievement", cz: "Komunikační účinnost",
   q: "Odpovídá text konvencím daného typu (esej, článek, e-mail…), sedí registr a tón? Udrží pozornost čtenáře?",
   bands: {
     5: "Konvence typu textu jsou použity efektivně, text drží pozornost čtenáře a sděluje jednoduché i složitější myšlenky; registr a tón sedí po celou dobu.",
     3: "Konvence typu textu jsou použity tak, že text drží pozornost čtenáře a sděluje jednoduché myšlenky. Registr většinou sedí.",
     1: "Text sděluje jednoduché myšlenky jednoduchým způsobem; konvence typu textu a registr jsou použity jen částečně."
   }},
  {id: "org", name: "Organisation", cz: "Organizace",
   q: "Je text logicky členěný do odstavců (u reportu nadpisy)? Používám různé spojovací a odkazovací prostředky?",
   bands: {
     5: "Text je dobře uspořádaný a soudržný; používá rozmanité spojovací prostředky a organizační vzorce s dobrým efektem.",
     3: "Text je celkově dobře uspořádaný a soudržný; používá různé spojovací výrazy a omezený počet dalších kohezních prostředků (zájmena, odkazy).",
     1: "Text je souvislý, ale spojuje myšlenky jen základními výrazy (and, but, because) a málo kohezními prostředky."
   }},
  {id: "lang", name: "Language", cz: "Jazyk",
   q: "Používám škálu slovní zásoby (i méně běžné výrazy) a jednoduchých i složitějších struktur? Brání chyby porozumění?",
   bands: {
     5: "Škála slovní zásoby včetně méně běžných výrazů, použitá vhodně; škála jednoduchých i složitých struktur s kontrolou a flexibilitou. Občasné chyby nebrání porozumění.",
     3: "Škála běžné slovní zásoby použitá vhodně, méně běžná slova občas nepřesně; jednoduché a některé složitější struktury s dobrou kontrolou. Chyby nebrání porozumění.",
     1: "Běžná slovní zásoba použitá celkem vhodně, některá slova se nadměrně opakují; jednoduché struktury s dobrou kontrolou. Chyby jsou patrné, ale význam se dá pochopit."
   }}
],

/* ---------- pre-submit checklist ---------- */
checklist: [
  "Pokryl(a) jsem VŠECHNY body zadání? (Esej: obě poznámky + vlastní třetí nápad + můj názor. Part 2: odpověď na každou otázku.)",
  "Odpovídá registr čtenáři (kamarád = neformálně, ředitel/firma = formálně, časopis = živě a neutrálně) a drží se celým textem?",
  "Má text jasné odstavce (esej 4–5, e-mail 4–5, report s nadpisy, článek a recenze s nadpisem)?",
  "Začíná každý odstavec větou, ze které je jasné, o čem bude?",
  "Použil(a) jsem různé přirozené spojovací výrazy (however, although, because, so, for example, on the other hand) – ne jen and a but?",
  "Mám i složitější věty (vztažná věta, podmínka, trpný rod, kde se hodí) – a jsou přesné?",
  "Je délka 140–190 slov?",
  "Zkontroloval(a) jsem členy, -s ve 3. osobě, časy (if/when + přítomný čas), předložky a pravopis?"
],

/* ---------- lessons per text type ---------- */
lessons: [
 {id: "essay", title: "Esej (Part 1)", type: "essay",
  intro: "Esej je povinná a píšeš ji pro učitele. Zadání má otázku a poznámky: dva body jsou dané, třetí je „your own idea“. Musíš napsat o obou daných bodech A přidat vlastní třetí bod – kdo vlastní nápad vynechá, ztrácí body v Content. Zadání chce i tvůj názor s důvody, takže ho řekni jasně (nejlépe v úvodu i v závěru).",
  structure: [
    "Úvod (2–3 věty): uveď téma vlastními slovy (neopisuj otázku) a naznač svůj názor.",
    "Odstavec 2: první poznámka – hlavní myšlenka, vysvětlení, příklad.",
    "Odstavec 3: druhá poznámka – často protiargument (However, … / On the other hand, …).",
    "Odstavec 4: tvůj vlastní nápad – jasně uvedený (Another important point is…), musí se lišit od obou poznámek.",
    "Závěr: tvůj názor a hlavní důvod – shrnutí, ne opakování celého textu. Žádné nové argumenty."
  ],
  register: "Neutrální až mírně formální: raději bez stažených tvarů (do not, it is), bez hovorových slov (kids, stuff, gonna) a bez vykřičníků. Ale pozor – ne „knižně“: krátké jasné věty a běžná slova jsou lepší než moreover, furthermore a dlouhé souvětí s chybami.",
  plan: [
    {h: "Úvod", t: "Obecná věta o tématu + parafráze otázky + tvůj názor v jedné větě."},
    {h: "Poznámka 1", t: "Topic sentence → vysvětlení → konkrétní příklad."},
    {h: "Poznámka 2", t: "Topic sentence → vysvětlení → příklad nebo protiargument."},
    {h: "Vlastní nápad", t: "Another important point is… → vysvětlení → příklad."},
    {h: "Závěr", t: "In conclusion, … + tvůj názor + hlavní důvod (může být i podmínka)."}
  ],
  tip: "Vlastní nápad si vyber hned při plánování a dej mu samostatný odstavec – zkoušející ho pak nemůže přehlédnout. Pokud nevíš, zkus: peníze/cena, životní prostředí, zdraví, bezpečnost, čas, vliv na rodinu nebo na budoucí práci.",
  phrases: [
    {fn: "Úvod (introducing the topic)", items: ["Nowadays, more and more people…", "It is often said that…", "Many people believe that…, but is this really true?", "There are good arguments on both sides.", "In my opinion, …, and there are several reasons for this."]},
    {fn: "Přidávání (adding)", items: ["Firstly, … / First of all, …", "In addition, …", "What is more, …", "Also, … / …as well.", "Not only…, but also…"]},
    {fn: "Kontrast (contrasting)", items: ["However, …", "On the other hand, …", "Although…, …", "While some people…, others…", "It is true that…, but…"]},
    {fn: "Názor (giving opinion)", items: ["In my opinion, … / In my view, …", "I believe that…", "Personally, I think that…", "I am convinced that…", "I strongly agree/disagree that…"]},
    {fn: "Příklady (giving examples)", items: ["For example, …", "For instance, …", "…such as…", "A good example of this is…", "This is especially true for…"]},
    {fn: "Vlastní nápad (your own idea)", items: ["Another important point is…", "Apart from…, there is also…", "Something people often forget is…", "A further reason is that…", "We should also think about…"]},
    {fn: "Příčina a důsledek", items: ["…because… / …as…", "As a result, …", "This means that…", "…so…", "That is why…"]},
    {fn: "Závěr (concluding)", items: ["In conclusion, …", "To sum up, …", "All in all, …", "Taking everything into account, …", "For all these reasons, I believe that…"]}
  ],
  mistakes: [
    {bad: "I am agree with this opinion.", good: "I agree with this opinion.", why: "agree je sloveso – nepoužívá se s be."},
    {bad: "According to me, …", good: "In my opinion, … / I believe that…", why: "according to se používá jen u cizího zdroje (according to scientists)."},
    {bad: "Nowadays is very popular to travel.", good: "Nowadays it is very popular to travel.", why: "Anglická věta potřebuje podmět – chybějící „it“ je typická česká chyba."},
    {bad: "Although it is expensive, but it is useful.", good: "Although it is expensive, it is useful.", why: "Čeština říká „i když…, ale“; v angličtině jen jedna spojka."},
    {bad: "The most of people think…", good: "Most people think…", why: "most people bez členu a bez of."},
    {bad: "People is worried about it.", good: "People are worried about it.", why: "people je množné číslo."},
    {bad: "If the government will do it, …", good: "If the government does it, …", why: "Po if a when v budoucnosti je přítomný čas."},
    {bad: "In the conclusion, …", good: "In conclusion, …", why: "Pevná fráze bez členu."},
    {bad: "On the other side, …", good: "On the other hand, …", why: "Pevná fráze je on the other hand."},
    {bad: "It is a good possibility to learn.", good: "It is a good opportunity / chance to learn.", why: "possibility = možnost (že se něco stane); příležitost = opportunity / chance."}
  ]
 },
 {id: "article", title: "Článek (article)", type: "article",
  intro: "Článek píšeš do časopisu, na web nebo do školního magazínu. Čtenáři jsou lidé tvého věku – chtějí se bavit a něco se dozvědět. Hlavní je zaujmout: poutavý nadpis, otázka na čtenáře, osobní zkušenost a živý jazyk. Zároveň musíš odpovědět na všechny otázky ze zadání.",
  structure: [
    "Nadpis: krátký a zajímavý (může být otázka nebo slovní hříčka).",
    "Úvod: zaujmi čtenáře – otázka, překvapivý fakt nebo krátká osobní scénka.",
    "2–3 odstavce: odpovědi na otázky ze zadání, s konkrétními příklady a vlastní zkušeností.",
    "Závěr: shrnutí a oslovení čtenáře (Why not try it? / What about you?)."
  ],
  register: "Neutrální až neformální, osobní a živý. Stažené tvary (it's, don't) jsou v pořádku, stejně jako přímé oslovení „you“ a řečnické otázky. Nepiš ale jako SMS (gonna, lol) a nepřeháněj vykřičníky.",
  plan: [
    {h: "Nadpis + úvod", t: "Poutavý nadpis, otázka nebo krátký příběh, který uvede téma."},
    {h: "Otázka 1 ze zadání", t: "Popis / zkušenost s detaily (kde, kdy, jak)."},
    {h: "Otázka 2 ze zadání", t: "Proč / jak – důvody a příklady."},
    {h: "Závěr", t: "Shrnutí + otázka nebo výzva pro čtenáře."}
  ],
  tip: "Nadpis a úvodní otázka jsou pro Communicative Achievement skoro povinné. Ale článek bez odpovědí na otázky ze zadání ztrácí body v Content, i když je zábavný.",
  phrases: [
    {fn: "Nadpisy (titles)", items: ["Why I'll never forget…", "Hate sport? Try…!", "…: more than just a hobby", "Could you live without…?", "My secret place in the city"]},
    {fn: "Úvod – zaujmout čtenáře", items: ["Have you ever wondered…?", "Imagine…", "Most people think that…, but…", "Is there anything better than…?", "I'll never forget the day when…"]},
    {fn: "Oslovení čtenáře", items: ["You might think that…, but…", "If you're anything like me, …", "Believe it or not, …", "Let me tell you why…", "So what makes it so special?"]},
    {fn: "Popis a zkušenost", items: ["What I love most about it is…", "The best thing about… is…", "It reminds me of…", "I still remember…", "It's the kind of place where…"]},
    {fn: "Závěr (ending)", items: ["So why not give it a try?", "What about you?", "Next time you…, think about…", "Trust me – you won't regret it!", "All in all, …"]}
  ],
  mistakes: [
    {bad: "Hello readers, my name is Petr and I will write about…", good: "Have you ever wanted to escape from everything for a day?", why: "Článek nezačíná představením autora ani „I will write about“ – rovnou zaujmi."},
    {bad: "It was very funny day.", good: "It was a really fun day.", why: "funny = vtipný; zábavný = fun / enjoyable. A nezapomeň člen a."},
    {bad: "Have you ever been in London?", good: "Have you ever been to London?", why: "been to = navštívit (byl jsi někdy v…)."},
    {bad: "I like very much swimming.", good: "I really like swimming. / I like swimming very much.", why: "Příslovce nestojí mezi slovesem a předmětem."},
    {bad: "I was boring at the lesson.", good: "I was bored in the lesson.", why: "bored = nudím se; boring = nudný (je to nuda)."},
    {bad: "The people in my country love football.", good: "People in my country love football.", why: "Obecně o lidech bez členu."},
    {bad: "Článek bez nadpisu a bez odstavců", good: "Nadpis + 4 krátké odstavce", why: "Nadpis a jasné členění patří ke konvencím článku (Communicative Achievement)."}
  ]
 },
 {id: "email-informal", title: "Neformální e-mail / dopis", type: "email", register: "informal",
  intro: "Neformální e-mail píšeš kamarádovi nebo známému, který ti napsal. V zadání je jeho zpráva s otázkami – musíš odpovědět na všechny (často rada, doporučení, popis zkušenosti). Má znít přirozeně, jako skutečný e-mail, ale pořád má mít odstavce a pestrou gramatiku.",
  structure: [
    "Oslovení: Hi Sam, / Dear Anna,",
    "Úvod: reakce na jeho zprávu (Thanks for your email! / Great news about…).",
    "2–3 odstavce: odpovědi na jednotlivé otázky ze zprávy, každá ve vlastním odstavci.",
    "Závěr: shrnutí nebo nabídka pomoci, výzva (Let me know…), rozloučení + jméno."
  ],
  register: "Neformální: stažené tvary (I'm, you'll, don't), frázová slovesa (find out, look forward to, pick you up), otázky a přímé oslovení. Ne ale SMS styl (u, gonna, lol) a ne úřední fráze (I am writing to inform you).",
  plan: [
    {h: "Pozdrav + reakce", t: "Díky za zprávu, reakce na novinku."},
    {h: "Odpověď 1", t: "První otázka z e-mailu – konkrétně, s příkladem."},
    {h: "Odpověď 2 (a 3)", t: "Další otázky – rada, doporučení, vlastní zkušenost."},
    {h: "Závěr", t: "Let me know… / Can't wait to… + rozloučení a jméno."}
  ],
  tip: "Než začneš psát, podtrhni v kamarádově e-mailu všechny otázky. Každá musí mít ve tvé odpovědi jasnou odpověď – jinak ztrácíš body v Content.",
  phrases: [
    {fn: "Otevření (openings)", items: ["Thanks for your email – it was great to hear from you!", "Sorry I haven't written for so long.", "Great news about…!", "I'm so glad you're coming to…", "You asked me about…, so here goes."]},
    {fn: "Rada a doporučení", items: ["If I were you, I'd…", "Why don't you…?", "You should definitely…", "It might be a good idea to…", "Make sure you…", "Don't forget to…"]},
    {fn: "Návrhy (suggestions)", items: ["How about…-ing?", "We could…", "What do you think about…?", "Let's…", "I was thinking we could…"]},
    {fn: "Přechody (linking)", items: ["Anyway, …", "As for…, …", "By the way, …", "Oh, and one more thing – …", "Having said that, …"]},
    {fn: "Uzavření (closings)", items: ["Let me know what you think.", "Can't wait to see you!", "Write back soon.", "Say hi to your family.", "Best wishes, / Take care, / Love, / See you soon,"]}
  ],
  mistakes: [
    {bad: "Dear friend, I am writing to inform you…", good: "Hi Marta, Thanks for your email!", why: "Příliš formální úvod do kamarádského e-mailu."},
    {bad: "Yours faithfully, Petr", good: "Best wishes, Petr / Take care, Petr", why: "Formální rozloučení do neformálního textu nepatří."},
    {bad: "I'm writing you because…", good: "I'm writing to tell you… / Just a quick email to…", why: "write to someone; „writing you“ je americká hovorová verze, u zkoušky raději ne."},
    {bad: "I recommend you to visit the castle.", good: "I'd recommend visiting the castle. / You should visit the castle.", why: "recommend + -ing nebo that-věta, ne „recommend you to“."},
    {bad: "Write me soon!", good: "Write back soon! / Write to me soon!", why: "V britské angličtině write to someone; nejpřirozenější je Write back soon."},
    {bad: "When you will come, I will show you…", good: "When you come, I'll show you…", why: "Po when/if v budoucnosti přítomný čas."},
    {bad: "There is many things to do.", good: "There are lots of things to do.", why: "Shoda: there are + množné číslo."},
    {bad: "gonna, wanna, u, lol", good: "going to, want to, you", why: "Neformální neznamená SMS styl."}
  ]
 },
 {id: "email-formal", title: "Formální e-mail / dopis", type: "email", register: "formal",
  intro: "Formální dopis nebo e-mail píšeš někomu, koho neznáš nebo kdo je ve vyšší pozici: řediteli, firmě, organizátorovi akce. Na B2 je nejčastější žádost o práci/brigádu (letter of application), dále stížnost nebo návrh. Hlavní je jasný účel v první větě, zdvořilý tón a správné oslovení a rozloučení.",
  structure: [
    "Oslovení: Dear Sir or Madam, (neznám jméno) / Dear Ms Grant, (znám jméno).",
    "Odstavec 1: proč píšeš – I am writing to apply for… / I am writing to complain about…",
    "Odstavce 2–3: body zadání (zkušenosti, dovednosti / co se stalo a proč je to problém).",
    "Závěr: co očekáváš nebo nabízíš + I look forward to hearing from you.",
    "Rozloučení: Yours faithfully, (po Dear Sir or Madam) / Yours sincerely, (po jménu) + celé jméno."
  ],
  register: "Formální, ale přirozený: žádné stažené tvary (I am, I would), žádná hovorová slova a vykřičníky. Zdvořilé formulace (I would be grateful if…, Could you…?). Nemusíš psát složitě – krátké jasné věty působí profesionálně.",
  plan: [
    {h: "Účel", t: "1–2 věty: na co reaguješ a proč píšeš."},
    {h: "Bod 1", t: "Zkušenost / co se stalo – fakta a příklad."},
    {h: "Bod 2", t: "Dovednosti / další problém – fakta a příklad."},
    {h: "Závěr", t: "Co nabízíš nebo požaduješ, poděkování, formální rozloučení a celé jméno."}
  ],
  tip: "Dear Sir or Madam → Yours faithfully; Dear Mr/Ms + příjmení → Yours sincerely. Splést si je je drobnost, ale zkoušející si toho všimne.",
  phrases: [
    {fn: "Otevření (purpose)", items: ["I am writing to apply for the position of…, which I saw advertised on…", "I am writing in response to your advertisement for…", "I am writing to complain about…", "I am writing on behalf of…", "I am writing to ask for information about…"]},
    {fn: "Žádost o práci (applying)", items: ["I believe I would be suitable for this job because…", "I have experience of working with…", "For the last two years, I have been…", "I am hard-working, reliable and…", "I would be available from… to…"]},
    {fn: "Stížnost (complaining)", items: ["Unfortunately, …", "I was disappointed to find that…", "According to your advertisement, …; however, …", "As a result, …", "I would therefore like you to…"]},
    {fn: "Žádost / návrh (requests)", items: ["I would be grateful if you could…", "Could you please let me know…?", "I would like to suggest that…", "It would be a good idea to…", "I hope you will consider…"]},
    {fn: "Uzavření (closings)", items: ["I look forward to hearing from you.", "Thank you for considering my application.", "I would be happy to provide references.", "Please do not hesitate to contact me if you need more information.", "Yours faithfully, / Yours sincerely,"]}
  ],
  mistakes: [
    {bad: "I look forward to hear from you.", good: "I look forward to hearing from you.", why: "look forward to + -ing (to je předložka)."},
    {bad: "Dear Sir or Madam, … Yours sincerely,", good: "Dear Sir or Madam, … Yours faithfully,", why: "Neznámý adresát → faithfully."},
    {bad: "Hello Mr Smith,", good: "Dear Mr Smith,", why: "Hello je neformální oslovení."},
    {bad: "I have 18 years.", good: "I am 18 (years old).", why: "Věk se v angličtině vyjadřuje slovesem be."},
    {bad: "I would like to apply on the position…", good: "I would like to apply for the position…", why: "apply for a job / position."},
    {bad: "I have experiences with children.", good: "I have experience of working with children.", why: "experience = praxe je nepočitatelné; experiences = zážitky."},
    {bad: "I am interested about this job.", good: "I am interested in this job.", why: "interested in."},
    {bad: "I want my money back!!!", good: "I would therefore like a full refund.", why: "Emoce a vykřičníky do formálního dopisu nepatří; zdvořilé would like."}
  ]
 },
 {id: "report", title: "Report (zpráva)", type: "report",
  intro: "Report píšeš pro učitele, ředitele, klub nebo web. Popisuje současný stav nebo proběhlou akci (jídelna, výlet, kluby, možnosti ve městě), uvádí, co funguje a co ne, a končí doporučením. Musí mít nadpis a podnadpisy a věcný styl.",
  structure: [
    "Nadpis (Report on… / krátký název).",
    "Introduction: účel reportu a odkud máš informace (I asked 30 students…).",
    "2–3 sekce s podnadpisy podle bodů zadání.",
    "Recommendations / Conclusion: konkrétní doporučení navázaná na zjištění."
  ],
  register: "Neutrální až formální a věcný. Raději bez stažených tvarů. Místo osobních emocí (I hate…) uváděj, co zjistil(a) – Most students said…, Many people complained that… Trpný rod se hodí, ale nemusí být v každé větě.",
  plan: [
    {h: "Introduction", t: "The aim of this report is to… + zdroj informací."},
    {h: "Sekce 1", t: "První bod zadání – fakta, kvantifikace (most, many, a few)."},
    {h: "Sekce 2", t: "Druhý bod zadání – problémy nebo silné stránky."},
    {h: "Recommendations", t: "1–2 konkrétní doporučení + proč pomohou."}
  ],
  tip: "Podnadpisy si vezmi přímo z bodů zadání – zkoušející hned vidí, že máš všechno. Stačí 3–4 krátké sekce.",
  phrases: [
    {fn: "Nadpisy (headings)", items: ["Introduction", "What students like / dislike", "Problems", "Suggestions", "Recommendations", "Conclusion"]},
    {fn: "Úvod", items: ["The aim of this report is to…", "This report describes…", "The information is based on a questionnaire completed by…", "I asked … students about…"]},
    {fn: "Zjištění a kvantifikace", items: ["Most students said that…", "Many of the people I asked…", "Only a few students…", "Nearly everyone agreed that…", "The main complaint was that…"]},
    {fn: "Trpný rod (where it fits)", items: ["Students were asked…", "The trip was organised by…", "It was found that…", "…is used mainly for…"]},
    {fn: "Doporučení (recommending)", items: ["I would recommend…-ing / that…", "It would be a good idea to…", "The school should…", "Another option would be to…", "This would help students to…"]},
    {fn: "Závěr", items: ["Overall, …", "In conclusion, …", "On the whole, the event was…", "If these changes are made, …"]}
  ],
  mistakes: [
    {bad: "I think the canteen is terrible and I hate the food.", good: "Most students were not satisfied with the food in the canteen.", why: "Report je věcný – piš, co zjistil(a), ne emoce."},
    {bad: "Hello, my name is Jana and this is my report.", good: "Introduction – The aim of this report is to…", why: "Report není dopis – bez oslovení a představování."},
    {bad: "The most of students said…", good: "Most students said…", why: "most + podstatné jméno bez the a of."},
    {bad: "Students was asked…", good: "Students were asked…", why: "Shoda v množném čísle."},
    {bad: "They gave us many informations and advices.", good: "They gave us a lot of information and advice.", why: "information a advice jsou nepočitatelné."},
    {bad: "I recommend to buy new computers.", good: "I recommend buying new computers.", why: "recommend + -ing / that-věta."},
    {bad: "Text bez nadpisů", good: "Introduction / Problems / Recommendations", why: "Chybějící podnadpisy snižují Communicative Achievement i Organisation."}
  ]
 },
 {id: "review", title: "Recenze (review)", type: "review",
  intro: "Recenzi píšeš do časopisu nebo na web – o filmu, knize, seriálu, aplikaci, restauraci, koncertu, muzeu… Čtenář chce vědět, jestli se mu to vyplatí. Zadání obvykle chce krátký popis, hodnocení (co se ti líbilo a co ne) a doporučení.",
  structure: [
    "Nadpis (název díla/místa + krátké hodnocení).",
    "Úvod: co recenzuješ a krátký háček (kdy jsi to viděl/a, proč tě to zaujalo).",
    "Popis: stručně, o čem to je / jak to funguje – NEpřevyprávěj celý děj.",
    "Hodnocení: silné stránky s příklady + jedna výhrada.",
    "Doporučení: pro koho je to vhodné a proč."
  ],
  register: "Neutrální, může být mírně neformální a osobní. Přímé oslovení čtenáře a otázky jsou v pořádku. Klíčová je přesná hodnoticí slovní zásoba místo opakování good, nice, bad.",
  plan: [
    {h: "Nadpis + úvod", t: "Co to je, kde/kdy, háček."},
    {h: "Popis", t: "O čem to je / co nabízí – 2–3 věty."},
    {h: "Hodnocení", t: "Co se povedlo (s příklady) + výhrada (However, … / The only problem is…)."},
    {h: "Doporučení", t: "I would recommend it to… / It's ideal for… + verdikt."}
  ],
  tip: "Popis ať zabere maximálně třetinu textu. Body se získávají za hodnocení a doporučení – přesně to zadání chce.",
  phrases: [
    {fn: "Popis (describing)", items: ["It tells the story of…", "It is set in…", "The film stars…", "The app allows you to…", "The café is located in…"]},
    {fn: "Pozitivní hodnocení", items: ["gripping / exciting / moving / hilarious", "well-written, well-acted", "The best thing about it is…", "What I liked most was…", "It's well worth the money."]},
    {fn: "Negativní hodnocení", items: ["disappointing / predictable / slow / confusing", "a bit too long", "The only problem is that…", "It's not perfect, though.", "…could be better."]},
    {fn: "Vyváženost (balance)", items: ["Although…, …", "However, …", "On the other hand, …", "Even so, …", "Despite this, …"]},
    {fn: "Doporučení (recommending)", items: ["I would definitely recommend it to anyone who…", "It's ideal for…", "If you like…, you'll love…", "Don't miss it!", "If you are looking for…, this is not for you."]}
  ],
  mistakes: [
    {bad: "The film was very very good and the actors were good.", good: "The film was really gripping, and the actors were excellent.", why: "Opakování good/very – použij přesnější přídavná jména."},
    {bad: "Celá recenze je převyprávění děje", good: "Krátký popis, většina textu hodnocení a doporučení.", why: "Content: zadání chce hodnocení a doporučení."},
    {bad: "The film is about a boy which…", good: "The film is about a boy who…", why: "who pro osoby, which pro věci."},
    {bad: "The actors play very good.", good: "The actors play very well. / The acting is very good.", why: "Sloveso se pojí s příslovcem (well)."},
    {bad: "The story happens in London.", good: "The story is set in London.", why: "Ustálené spojení be set in = odehrávat se."},
    {bad: "I recommend it for everybody.", good: "I would recommend it to anyone who likes…", why: "recommend something to someone; a konkrétní cílová skupina."},
    {bad: "It was very funny film.", good: "It was a very entertaining film.", why: "Chybí člen a; funny = vtipný, ne „zábavný“ (to je fun/entertaining)."}
  ]
 }
],

/* ---------- typical spelling slips (wrong -> right) ---------- */
typos: [
  ["recieve","receive"],["enviroment","environment"],["goverment","government"],["neccessary","necessary"],["necesary","necessary"],
  ["definately","definitely"],["accomodation","accommodation"],["seperate","separate"],["untill","until"],["wich","which"],
  ["begining","beginning"],["beleive","believe"],["comunity","community"],["oportunity","opportunity"],["advertisment","advertisement"],
  ["tommorow","tomorrow"],["tomorow","tomorrow"],["allready","already"],["alot","a lot"],["thier","their"],["becouse","because"],
  ["beacause","because"],["becuase","because"],["familly","family"],["adress","address"],["proffesional","professional"],
  ["profesional","professional"],["freind","friend"],["intresting","interesting"],["diffrent","different"],["togheter","together"],
  ["comming","coming"],["writting","writing"],["swiming","swimming"],["runing","running"],["shoping","shopping"],["stoped","stopped"],
  ["realy","really"],["finaly","finally"],["usefull","useful"],["beautifull","beautiful"],["carefull","careful"],["helpfull","helpful"],
  ["wonderfull","wonderful"],["succesful","successful"],["successfull","successful"],["sincerly","sincerely"],["faithfuly","faithfully"],
  ["foreing","foreign"],["knowlege","knowledge"],["experiance","experience"],["restaurent","restaurant"],["excercise","exercise"],
  ["fourty","forty"],["bussiness","business"],["buisness","business"],["recomend","recommend"],["reccomend","recommend"],
  ["recommand","recommend"],["teached","taught"],["thinked","thought"],["buyed","bought"],["choosed","chose"],["writed","wrote"],
  ["informations","information"],["advices","advice"],["equipments","equipment"],["furnitures","furniture"],["homeworks","homework"],
  ["knowledges","knowledge"],["staffs","staff"],["luggages","luggage"]
],

/* ---------- Czech-speaker traps detected by the analyzer (regex source, Czech tip) ---------- */
traps: [
  ["\\bam agree\\b|\\bis agree\\b|\\bare agree\\b", "„I am agree“ → I agree."],
  ["\\baccording to me\\b", "„according to me“ → in my opinion / I believe."],
  ["\\bon the other side\\b", "„on the other side“ → on the other hand."],
  ["\\bdiscuss(?:es|ed|ing)? about\\b", "discuss about → discuss (bez about)."],
  ["\\bdespite of\\b", "despite of → despite / in spite of."],
  ["\\bthe most of\\b", "the most of people → most people."],
  ["\\bpeople is\\b|\\bpeople was\\b|\\bpeople has\\b", "people je množné číslo → people are/were/have."],
  ["\\bin the conclusion\\b", "in the conclusion → in conclusion."],
  ["\\blook(?:ing)? forward to (?:hear|see|meet|receive|visit)\\b", "look forward to + -ing (hearing, seeing)."],
  ["\\bsuggest(?:s|ed)? (?:to|you to)\\b", "suggest to do → suggest doing / suggest that…"],
  ["\\brecommend(?:s|ed)? (?:you|him|her|them|us) to\\b", "recommend you to → I'd recommend + -ing / You should…"],
  ["\\bmore (?:cheaper|better|easier|bigger|faster|smaller|worse|healthier|happier)\\b", "dvojí stupňování (more cheaper) → cheaper."],
  ["\\bsince (?:\\w+ )?(?:years|months|weeks|days)\\b", "since five years → for five years."],
  ["\\bif (?:i|you|we|they|he|she|it|people|students) will\\b", "Podmínka o budoucnosti: po if přítomný čas – If it rains, we will… (ne if it will rain). Výjimka: nepřímá otázka „I don't know if he will come“ je správně."],
  ["\\bwhen (?:i|you|we|they|he|she|it) will\\b", "Časová věta (až…): po when přítomný čas – When you come, I'll… (ne when you will come). Nepřímá otázka „I don't know when he will come“ je ale správně."],
  ["\\bhave (?:\\d{2}|fifteen|sixteen|seventeen|eighteen|nineteen|twenty) years\\b", "Věk: I am 18 (years old), ne I have 18 years."],
  ["\\bwriting you\\b|\\bwrite me\\b", "write to someone: I'm writing to you… / Write back soon!"],
  ["\\bapply on\\b", "apply on → apply for (a job / position)."],
  ["\\binterested about\\b", "interested about → interested in."],
  ["\\bdepend(?:s|ed|ing)? of\\b", "depend of → depend on."],
  ["\\bexplain me\\b|\\bexplain us\\b", "explain me → explain to me."],
  ["\\bsay me\\b|\\bsaid me\\b", "say me → tell me (tell someone, say something)."],
  ["\\bmake (?:a |my |the )?homework\\b", "make homework → do homework."],
  ["\\bdo (?:a |many |some |lots of |a lot of )?mistakes?\\b", "do a mistake → make a mistake."],
  ["\\bmake (?:a )?photos?\\b", "make a photo → take a photo."],
  ["\\bmake (?:a )?sports?\\b", "make sport → do sport."],
  ["\\bin the internet\\b", "in the internet → on the internet."],
  ["\\bmany (?:information|advice|homework|money|time|equipment|furniture)\\b", "many + nepočitatelné → much / a lot of (a lot of information)."],
  ["\\b(?:he|she|it) don't\\b", "he/she/it don't → doesn't."],
  ["\\b(?:everybody|everyone|somebody|someone|nobody) (?:have|are|were|like|want|need|know)\\b", "everybody/someone + sloveso ve 3. os. j. č. (everybody has, someone wants)."],
  ["\\bbecause of (?:i|you|we|they|he|she|it is|there)\\b", "because of + podstatné jméno; před větou jen because."],
  ["\\bpossibility to\\b", "possibility to do → opportunity / chance to do."],
  ["\\bhow (?:does )?it looks? like\\b", "how it looks like → what it looks like / how it looks."],
  ["\\bfunny\\b", "funny = vtipný (k smíchu). Pokud myslíš „zábavný, příjemný“, napiš fun / enjoyable."],
  ["\\beventually\\b", "eventually = nakonec (ne „případně“) – zkontroluj význam; případně = possibly / if necessary."],
  ["\\bactual(?:ly)?\\b", "actual(ly) = skutečný/vlastně, ne „aktuální“ – aktuální = current / currently."],
  ["\\bcontrol(?:led)? (?:my|your|the|our) (?:homework|text|answers?|essay|work)\\b", "control = ovládat/řídit; zkontrolovat = check."],
  ["\\balthough\\b[^.!?]*,\\s*but\\b", "although…, but… → použij jen jednu spojku."],
  ["\\b(?:english|czech|german|french|spanish|monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|february|april|june|july|august|september|october|november|december)\\b", "Národnosti, jazyky, dny a měsíce se v angličtině píšou s velkým písmenem."]
],

/* ---------- "rewrite a weak paragraph" exercises (better = strong B2, not C1) ---------- */
rewrite: [
 {id: "rw01", type: "essay", task: "Spoj krátké věty do souvětí (because, although, which) a přidej důsledek.",
  weak: "Many people use cars. Cars are bad for the environment. Public transport is cheaper. Some people don't like buses. Buses are slow.",
  better: "Although many people still prefer to drive, cars are one of the main causes of air pollution in cities. Public transport is usually cheaper and much better for the environment, but some people avoid buses because they think they are slow. If there were more bus lanes, journeys would be much quicker.",
  why: "Although/but/because spojují myšlenky, podmínka 2. typu přidává návrh. Slova jsou běžná – síla je v jasné stavbě vět."},
 {id: "rw02", type: "essay", task: "Nahraď opakované „I think“ a přidej důvod a konkrétní příklad.",
  weak: "I think homework is good. I think it helps students. I think teachers give too much homework. I think it is a problem.",
  better: "In my opinion, homework is useful because it helps students remember what they have learned in class. However, some teachers give far too much of it. When students spend three hours on homework every evening, they have no time left for sport or their family, which is a real problem.",
  why: "Názor stačí říct jednou; důvod (because), kontrast (However) a příklad (When students…) dělají z odstavce argument."},
 {id: "rw03", type: "essay", task: "Tento odstavec má být tvůj vlastní (třetí) bod, ale není jasné, o čem je. Přidej topic sentence a vysvětlení.",
  weak: "Also money. Some families have no money. It's expensive. Everybody need it.",
  better: "Another important point is cost. Laptops and tablets are expensive, and not every family can afford one for each child. If schools expect students to do their homework online, they should lend devices to those who need them.",
  why: "„Another important point is…“ jasně uvede vlastní bod; následuje vysvětlení a řešení. Opravená shoda (everybody needs) zmizela s přepisem."},
 {id: "rw04", type: "essay", task: "Úvod eseje jen opakuje zadání. Přepiš ho vlastními slovy a naznač svůj názor.",
  weak: "In this essay I will write about if students should wear school uniforms or not. There are advantages and disadvantages.",
  better: "In many countries, students have to wear a uniform to school, while in others they can wear whatever they like. Although uniforms are not popular with most teenagers, I believe they have some important advantages.",
  why: "Úvod představí téma obecně a hned řekne názor – „In this essay I will write about“ je zbytečné."},
 {id: "rw05", type: "email-informal", task: "E-mail kamarádovi zní jako úřední dopis. Přepiš ho přirozeně (stažené tvary, frázová slovesa).",
  weak: "Dear friend,\nI am writing to inform you that I have received your letter. I would like to recommend that you visit the castle. It is located near my house.\nYours faithfully,\nEva",
  better: "Hi Sam,\nThanks for your email – it was great to hear from you! You really must see the castle while you're here. It's only a short walk from my house, so I can show you around.\nTake care,\nEva",
  why: "Neformální oslovení a rozloučení, stažené tvary (it's, you're), frázové sloveso show you around."},
 {id: "rw06", type: "email-formal", task: "Formální stížnost je příliš neformální a emotivní. Přepiš ji zdvořile a věcně.",
  weak: "Hi!\nI'm really angry!!! The hotel was awful and the room was dirty. Nobody helped me. Give me my money back!!!",
  better: "Dear Sir or Madam,\nI am writing to complain about my recent stay at your hotel. Unfortunately, my room was not clean when I arrived, and although I spoke to the receptionist twice, nothing was done about it. I would therefore like to ask for a partial refund.\nYours faithfully,\nMarek Horák",
  why: "Formální oslovení, účel v první větě, fakta místo emocí, zdvořilý požadavek (I would like to ask for…)."},
 {id: "rw07", type: "email-formal", task: "Úvod žádosti o práci je nejasný a obsahuje chyby. Přepiš ho: na co reaguješ, kdo jsi a proč se hodíš.",
  weak: "Hello, my name is Petr and I have 19 years. I saw your thing on the internet. I want this job because I need money.",
  better: "Dear Mr Brown,\nI am writing to apply for the job of summer camp assistant, which I saw advertised on your website. I am nineteen years old and I am studying to become a primary school teacher, so I would love the chance to work with children this summer.",
  why: "Jasný účel, věk správně (I am nineteen), motivace, která souvisí s prací – peníze jako důvod nepiš."},
 {id: "rw08", type: "article", task: "Úvod článku je nudný. Přidej nadpis, otázku na čtenáře a osobní tón.",
  weak: "In this article I will write about my favourite place. My favourite place is a park. It is near my house.",
  better: "My secret corner of the city\n\nWhere do you go when you need a break from everything? For me, the answer is easy: a tiny park hidden behind an old church, just five minutes from my house.",
  why: "Nadpis + otázka na čtenáře + konkrétní detail – přesně to článek potřebuje pro Communicative Achievement."},
 {id: "rw09", type: "article", task: "Konec článku je useknutý. Přidej závěr, který osloví čtenáře.",
  weak: "So this is why I like cycling. The end.",
  better: "So if you're looking for a cheap, healthy and fun way to get around, why not give cycling a try? You might find, like me, that you never want to take the bus again.",
  why: "Shrnutí + výzva čtenáři (why not…?) + osobní pointa."},
 {id: "rw10", type: "report", task: "Přepiš odstavec do stylu reportu: podnadpis, věcné formulace, bez „I hate“.",
  weak: "I asked my friends and they hate the canteen. The food is horrible and we wait a lot. I think it's the worst thing at school.",
  better: "Problems\nMost of the students who were asked said that they were not satisfied with the canteen. The main complaints were the long queues at lunchtime and the lack of choice, especially for vegetarians.",
  why: "Podnadpis, kvantifikace (Most of the students), věcné shrnutí stížností místo emocí."},
 {id: "rw11", type: "report", task: "Doporučení je vágní. Přepiš ho tak, aby bylo konkrétní a navázané na zjištění.",
  weak: "So the school should make things better and maybe change some stuff.",
  better: "Recommendations\nI would recommend introducing two separate lunch breaks, which would make the queues shorter. It would also be a good idea to ask students to vote for new dishes once a month.",
  why: "Konkrétní návrhy (recommend + -ing, It would be a good idea to…) a co přinesou."},
 {id: "rw12", type: "review", task: "Recenze používá chudý slovník (good, nice, bad). Přidej přesnější přídavná jména a vyváženost.",
  weak: "The film was good. The actors were good and the music was nice. The end was bad. It is a good film.",
  better: "The film is exciting from start to finish. The two main actors are excellent, and the music really suits the story. My only complaint is the ending, which felt rushed and a little disappointing. Even so, it is well worth watching.",
  why: "Přesná hodnoticí slova (exciting, excellent, disappointing), výhrada (My only complaint is…) a verdikt."},
 {id: "rw13", type: "review", task: "Závěr recenze nemá doporučení. Přepiš ho: pro koho je vhodné a proč.",
  weak: "So that's the restaurant. It was ok. Maybe go there.",
  better: "All in all, Café Luna is a great place for a relaxed lunch with friends. The prices are reasonable and the portions are generous, although it can get quite noisy at weekends. I would definitely recommend it to students on a budget.",
  why: "Verdikt, krátké shrnutí plusů i minusu a konkrétní cílová skupina (students on a budget)."}
],

/* ---------- PART 1: essays (real B2 First format: question + two notes + "your own idea") ---------- */
part1: [
 {id: "e01", topic: "Technologie", title: "Young people and smartphones",
  context: "In your English class you have been talking about technology and young people. Now, your English teacher has asked you to write an essay.",
  question: "Do young people today spend too much time on their phones?",
  points: ["friendships and social life", "schoolwork and concentration"],
  ownIdeas: ["sleep", "physical activity", "finding information and learning online"],
  scaffold: [
    {h: "Úvod", t: "Telefony jsou všude – názor hned na začátku: ano, většina mladých na nich tráví příliš času."},
    {h: "Přátelé (poznámka 1)", t: "Plus: kontakt s kamarády z jiného města. Minus: psaní zpráv místo setkání → osamělost."},
    {h: "Škola a soustředění (poznámka 2)", t: "Telefon u úkolů = kontrolování každých pár minut, úkol trvá mnohem déle."},
    {h: "Vlastní nápad – spánek", t: "Scrollování v noci, světlo z displeje, únava ve škole."},
    {h: "Závěr", t: "Problém není telefon sám, ale množství času – naučit se ho vypínat."}
  ],
  model: `It is almost impossible to imagine a teenager without a smartphone these days. Phones are useful, but I believe that most young people spend far too much time on them.

Firstly, phones have changed the way we make and keep friends. It is great that we can chat with friends who live in another town, but many teenagers now prefer messaging to meeting in person. As a result, they may feel lonely even though they have hundreds of online contacts.

Secondly, phones can seriously damage concentration. When students do their homework with a phone next to them, they check it every few minutes, so a task that should take thirty minutes can take two hours.

Another important point is sleep. Many young people scroll through social media late at night, and the light from the screen makes it harder to fall asleep. This means they are often tired at school the next day.

In conclusion, the phones themselves are not the problem. However, young people should learn to switch them off more often, especially when they are studying or going to bed.`,
  callouts: [
    {q: "Phones are useful, but I believe that most young people spend far too much time on them.", tag: "opinion", cz: "Názor hned v úvodu – zadání chce „your point of view“, tak ho řekni jasně."},
    {q: "prefer messaging to meeting in person", tag: "gerund", cz: "prefer + -ing + to + -ing – užitečná B2 struktura."},
    {q: "even though they have hundreds of online contacts", tag: "contrast", cz: "even though = i když; kontrast uvnitř jedné věty."},
    {q: "Another important point is sleep.", tag: "ownidea", cz: "Vlastní (třetí) bod jasně ohlášený na začátku odstavce – zkoušející ho nepřehlédne."},
    {q: "makes it harder to fall asleep", tag: "collocation", cz: "make it harder to do something, fall asleep – přirozené kolokace."}
  ]},

 {id: "e02", topic: "Životní prostředí", title: "Cars in city centres",
  context: "In your English class you have been talking about life in towns and cities. Now, your English teacher has asked you to write an essay.",
  question: "Should cars be banned from city centres?",
  points: ["air pollution and noise", "people who really need a car"],
  ownIdeas: ["public transport", "local shops and businesses", "safety for cyclists and pedestrians"],
  scaffold: [
    {h: "Úvod", t: "Města jsou plná aut; názor: zákaz by byl dobrý, pokud bude dobře naplánovaný."},
    {h: "Znečištění a hluk (poznámka 1)", t: "Výfukové plyny škodí dětem a starším lidem; bez aut je centrum tišší a příjemnější."},
    {h: "Lidé, kteří auto potřebují (poznámka 2)", t: "Starší a postižení lidé – výjimky pro ně, pro zásobování a taxi."},
    {h: "Vlastní nápad – MHD", t: "Zákaz funguje jen s častou, levnou a spolehlivou dopravou."},
    {h: "Závěr", t: "Ano, ale jen pokud město nabídne skutečnou alternativu."}
  ],
  model: `Many cities are full of traffic, and some people believe that the best solution is to ban cars from the centre completely. In my view, this would be a positive change, as long as it is planned carefully.

The most obvious advantage is cleaner air. Exhaust fumes are one of the main causes of pollution in towns, and they are especially harmful to children and older people. Without cars, the centre would also be much quieter, which would make it a more pleasant place to live and work.

On the other hand, some people really need a car. For example, elderly or disabled people may not be able to walk long distances or use crowded buses. For this reason, there should be exceptions for them, as well as for delivery vans and taxis.

Another point to consider is public transport. A ban will only work if buses and trams are frequent, cheap and reliable. Otherwise, people will simply stop coming to the centre.

All in all, I believe that car-free centres are a good idea, but only if the city offers people a real alternative.`,
  callouts: [
    {q: "as long as it is planned carefully", tag: "conditional", cz: "as long as = pokud/za předpokladu, že; s trpným rodem – názor s podmínkou."},
    {q: "which would make it a more pleasant place to live and work", tag: "relative", cz: "Vztažná věta s which odkazuje na celou předchozí myšlenku."},
    {q: "On the other hand, some people really need a car.", tag: "contrast", cz: "Druhá poznámka jako protiargument – esej je vyvážená."},
    {q: "Another point to consider is public transport.", tag: "ownidea", cz: "Vlastní nápad v samostatném odstavci."},
    {q: "Otherwise, people will simply stop coming to the centre.", tag: "reason", cz: "Otherwise = jinak; ukazuje důsledek, když podmínka neplatí."}
  ]},

 {id: "e03", topic: "Vzdělávání", title: "Choosing school subjects",
  context: "In your English class you have been talking about school and education. Now, your English teacher has asked you to write an essay.",
  question: "Should students be allowed to choose which subjects they study at school?",
  points: ["motivation", "future jobs"],
  ownIdeas: ["general knowledge", "the age of the students", "advice from parents and teachers"],
  scaffold: [
    {h: "Úvod", t: "Každý má předmět, který nesnáší – otázka, jestli nechat výběr na studentech."},
    {h: "Motivace (poznámka 1)", t: "Co nás baví, tomu se věnujeme víc – osobní příklad (biologie vs. fyzika)."},
    {h: "Budoucí práce (poznámka 2)", t: "Příprava na povolání: inženýr – matematika, novinář – jazyky."},
    {h: "Vlastní nápad – všeobecné znalosti a věk", t: "15letý ještě neví, co bude dělat; „nudný“ předmět může být později důležitý."},
    {h: "Závěr", t: "Kompromis: část předmětů volitelná (hlavně v posledních ročnících), základ povinný."}
  ],
  model: `Most students have at least one subject they hate and would happily drop. But would it really be a good idea to let teenagers choose everything they study?

There is no doubt that choice increases motivation. When students study subjects they are interested in, they usually work harder and get better results. I have noticed this myself: I find it much easier to concentrate in biology, which I chose, than in physics, which I have to take.

Choosing subjects can also help students prepare for their future jobs. Someone who wants to become an engineer could spend more time on maths, while a future journalist could focus on languages.

However, there is a danger that students would know too little about the world in general. A fifteen-year-old does not always know what they will want to do in ten years, and a subject that seems boring now may become important later.

In conclusion, I believe students should be able to choose some of their subjects, especially in their last two years. Still, everybody should study a few basic subjects, such as maths and their own language.`,
  callouts: [
    {q: "But would it really be a good idea to let teenagers choose everything they study?", tag: "question", cz: "Otázka v úvodu je v eseji v pořádku – uvádí téma vlastními slovy."},
    {q: "There is no doubt that choice increases motivation.", tag: "topic", cz: "Topic sentence – jasně říká, o čem odstavec bude."},
    {q: "which I chose", tag: "relative", cz: "Vztažná věta s čárkou doplňuje informaci; osobní příklad posiluje argument."},
    {q: "while a future journalist could focus on languages", tag: "comparison", cz: "while = kdežto; srovnává dva příklady v jedné větě."},
    {q: "However, there is a danger that students would know too little about the world in general.", tag: "ownidea", cz: "Vlastní nápad (všeobecné znalosti) – liší se od motivace i od budoucí práce."}
  ]},

 {id: "e04", topic: "Sport", title: "PE lessons at school",
  context: "In your English class you have been talking about sport and health. Now, your English teacher has asked you to write an essay.",
  question: "Should physical education (PE) be compulsory for all students?",
  points: ["health and fitness", "students who do not enjoy sport"],
  ownIdeas: ["stress and concentration", "teamwork", "time for other subjects"],
  scaffold: [
    {h: "Úvod", t: "Někdo tělocvik miluje, jiný ho nesnáší; názor: má zůstat povinný."},
    {h: "Zdraví (poznámka 1)", t: "Mladí většinu dne sedí; pro některé je tělocvik jediný pohyb za týden."},
    {h: "Kdo sport nemá rád (poznámka 2)", t: "Uznej problém (trapné situace) a navrhni řešení: větší výběr aktivit."},
    {h: "Vlastní nápad – stres", t: "Pohyb mezi hodinami pomáhá uvolnit se a soustředit."},
    {h: "Závěr", t: "Nerušit, ale zpestřit hodiny, aby si každý něco našel."}
  ],
  model: `Some students love PE lessons, while others dread them. Even so, I am convinced that PE should remain compulsory at school.

The main reason is health. Many teenagers spend most of the day sitting, first at school and then in front of a screen at home. For some of them, PE is the only exercise they get all week, so if it became optional, they would probably do none at all.

It is true that not everyone enjoys sport, and for some students PE can be embarrassing, especially if they are not very good at it. However, this problem could be solved by offering a wider choice of activities. Not everybody likes football, but they might enjoy dancing, yoga or climbing.

Another advantage of PE is that it helps students relax. After several hours of maths and history, an hour of physical activity can reduce stress and help them concentrate better in the afternoon.

To sum up, PE has too many benefits to become optional. Instead of removing it, schools should make the lessons more varied, so that every student can find something they like.`,
  callouts: [
    {q: "while others dread them", tag: "contrast", cz: "while = kdežto; dread = mít z něčeho hrůzu – méně běžné, ale přirozené slovo."},
    {q: "if it became optional, they would probably do none at all", tag: "conditional", cz: "Kondicionál 2. typu – hypotetická situace a její důsledek."},
    {q: "It is true that not everyone enjoys sport", tag: "contrast", cz: "Ústupka: uznáš protiargument (poznámka 2) a pak ho vyvrátíš (However…)."},
    {q: "this problem could be solved by offering a wider choice of activities", tag: "passive", cz: "Trpný rod + by + -ing: elegantní návrh řešení."},
    {q: "Another advantage of PE is that it helps students relax.", tag: "ownidea", cz: "Vlastní nápad (stres a soustředění) v samostatném odstavci."}
  ]},

 {id: "e05", topic: "Cestování", title: "Holidays at home or abroad",
  context: "In your English class you have been talking about travel and holidays. Now, your English teacher has asked you to write an essay.",
  question: "Is it better to spend your holidays in your own country or abroad?",
  points: ["cost", "learning about other cultures"],
  ownIdeas: ["the environment", "practising foreign languages", "travel time and stress"],
  scaffold: [
    {h: "Úvod", t: "Dovolená = často zahraničí, ale stále víc lidí zůstává doma; argumenty na obou stranách."},
    {h: "Cena (poznámka 1)", t: "Letenky a turistická místa jsou drahé; doma levněji → dvě dovolené místo jedné."},
    {h: "Jiné kultury (poznámka 2)", t: "Jídlo, jazyk, život jinde otevře mysl – to kniha nenahradí."},
    {h: "Vlastní nápad – životní prostředí", t: "Let = hodně CO2, vlak do hor doma = malý dopad."},
    {h: "Závěr", t: "Rovnováha: poznat vlastní zemi, ale občas vycestovat."}
  ],
  model: `For many people, a summer holiday means a trip abroad. However, more and more people are choosing to stay in their own country, and there are good arguments on both sides.

Cost is often the deciding factor. Travelling abroad usually means paying for flights, and hotels and restaurants in popular destinations can be very expensive. A holiday at home is generally much cheaper, so families can sometimes afford to go away twice a year instead of once.

On the other hand, travelling abroad is one of the best ways to learn about other cultures. Trying new food, hearing a different language and seeing how people live in another country can open your mind in a way that no book can.

There is also the environment to think about. A flight produces a lot of carbon dioxide, while a train journey to the mountains in your own country has a much smaller impact.

Personally, I believe that the best solution is a balance. It is worth exploring your own country, which many of us hardly know, but travelling abroad from time to time is an experience that nobody should miss.`,
  callouts: [
    {q: "Cost is often the deciding factor.", tag: "topic", cz: "Krátká topic sentence – the deciding factor = rozhodující faktor."},
    {q: "so families can sometimes afford to go away twice a year instead of once", tag: "reason", cz: "so = takže; afford to do something = moct si dovolit."},
    {q: "Trying new food, hearing a different language and seeing how people live", tag: "gerund", cz: "Gerundia jako podmět věty – přirozená B2 struktura."},
    {q: "There is also the environment to think about.", tag: "ownidea", cz: "Vlastní nápad (životní prostředí) – liší se od ceny i kultury."},
    {q: "It is worth exploring your own country", tag: "gerund", cz: "It is worth + -ing = vyplatí se."}
  ]},

 {id: "e06", topic: "Práce", title: "Part-time jobs for students",
  context: "In your English class you have been talking about work and money. Now, your English teacher has asked you to write an essay.",
  question: "Is it a good idea for students to have a part-time job while they are still at school?",
  points: ["money", "schoolwork"],
  ownIdeas: ["skills and confidence", "free time and friends", "independence"],
  scaffold: [
    {h: "Úvod", t: "Brigády o víkendech jsou běžné; názor: užitečné, pokud nezaberou moc času."},
    {h: "Peníze (poznámka 1)", t: "Vlastní peníze, méně závislosti na rodičích, naučí se hodnotu peněz."},
    {h: "Škola (poznámka 2)", t: "Únava, méně času na učení → limit asi 10 hodin týdně, zvlášť před zkouškami."},
    {h: "Vlastní nápad – dovednosti", t: "Práce se zákazníky = sebevědomí, řešení problémů."},
    {h: "Závěr", t: "Ano, pokud škola zůstane na prvním místě."}
  ],
  model: `In my country, it is becoming more common for teenagers to work in cafés or shops at weekends. In my opinion, a part-time job can be very useful, but only if it does not take up too much time.

The most obvious benefit is money. Students who earn their own money do not have to ask their parents for everything, and they also learn how much things really cost. This often makes them more careful about how they spend it.

However, a job can easily affect schoolwork. If a student works late in the evening, he or she may be too tired to study or do homework properly. For this reason, I think students should not work more than about ten hours a week, especially before exams.

Apart from money, a job also teaches skills that you cannot learn in a classroom. Working with customers, for example, helps young people become more confident and learn how to deal with difficult situations.

To conclude, I believe a part-time job is a good idea for most teenagers, as long as school remains their first priority.`,
  callouts: [
    {q: "but only if it does not take up too much time", tag: "phrasal", cz: "take up time = zabrat čas; názor s podmínkou už v úvodu."},
    {q: "Students who earn their own money", tag: "relative", cz: "Vztažná věta s who upřesňuje, o kterých studentech mluvíš."},
    {q: "he or she may be too tired to study", tag: "modal", cz: "may = možná; too + přídavné jméno + to-infinitiv."},
    {q: "Apart from money, a job also teaches skills that you cannot learn in a classroom.", tag: "ownidea", cz: "Apart from… uvádí vlastní nápad a zároveň navazuje na předchozí text."},
    {q: "learn how to deal with difficult situations", tag: "collocation", cz: "deal with = poradit si s něčím; běžná a užitečná kolokace."}
  ]},

 {id: "e07", topic: "Rodina", title: "Living with parents",
  context: "In your English class you have been talking about family life. Now, your English teacher has asked you to write an essay.",
  question: "Is it a good idea for young adults to live with their parents until they are about 25?",
  points: ["saving money", "becoming independent"],
  ownIdeas: ["relationships within the family", "helping older parents", "the housing situation in cities"],
  scaffold: [
    {h: "Úvod", t: "Mladí bydlí u rodičů déle než dřív; záleží na okolnostech."},
    {h: "Úspora peněz (poznámka 1)", t: "Vysoké nájmy; doma lze šetřit na vlastní byt nebo splatit půjčku."},
    {h: "Samostatnost (poznámka 2)", t: "Nenaučí se vařit, platit účty, rozhodovat se sami."},
    {h: "Vlastní nápad – vztahy v rodině", t: "Může je sblížit, ale i vést k hádkám o soukromí a domácí práce."},
    {h: "Závěr", t: "Rozumné, pokud převezmou dospělé povinnosti (účty, domácnost)."}
  ],
  model: `In many countries, young people are staying in their parents' home for much longer than in the past. Whether this is a good thing depends on a number of factors.

The clearest advantage is financial. Rents are extremely high in most cities, especially for students and people in their first job. By living at home, young adults can save money for their own flat or pay off a student loan more quickly.

On the other hand, it can be harder to become independent. Young people who live with their parents may never learn how to cook, pay bills or organise their own lives. Some of them also find it difficult to make decisions because their parents are always there to help.

Another thing to consider is the relationship with the family. Living together as adults can bring parents and children closer, but it can also lead to arguments about privacy and housework.

In my view, living at home until 25 is a sensible choice for many people, but only if they take on adult responsibilities, such as paying part of the bills and doing their share of the housework.`,
  callouts: [
    {q: "Whether this is a good thing depends on a number of factors.", tag: "opinion", cz: "Whether… jako podmět věty – úvod naznačuje vyvážený názor."},
    {q: "By living at home, young adults can save money", tag: "gerund", cz: "By + -ing = tím, že…; vyjadřuje způsob."},
    {q: "pay off a student loan", tag: "phrasal", cz: "pay off = splatit (dluh, půjčku)."},
    {q: "Another thing to consider is the relationship with the family.", tag: "ownidea", cz: "Vlastní nápad jasně ohlášený – vztahy v rodině nejsou v poznámkách."},
    {q: "take on adult responsibilities", tag: "phrasal", cz: "take on = převzít (povinnosti, práci)."}
  ]},

 {id: "e08", topic: "Zdraví", title: "Fast food near schools",
  context: "In your English class you have been talking about food and health. Now, your English teacher has asked you to write an essay.",
  question: "Should fast-food restaurants be banned near schools?",
  points: ["young people's health", "freedom of choice"],
  ownIdeas: ["better school canteens", "teaching students about healthy eating", "advertising aimed at teenagers"],
  scaffold: [
    {h: "Úvod", t: "U každé školy je fast food; názor: zákaz není správné řešení."},
    {h: "Zdraví (poznámka 1)", t: "Tuk, cukr, sůl; každodenní jídlo → nadváha, problémy později. Levné = lákavé."},
    {h: "Svoboda volby (poznámka 2)", t: "Teenageři se umí rozhodnout; bez burgerů koupí chipsy v supermarketu."},
    {h: "Vlastní nápad – školní jídelna", t: "Chutné, zdravé a levné obědy → méně studentů odchází."},
    {h: "Závěr", t: "Ne zákaz, ale lepší možnosti a výchova ke zdravému jídlu."}
  ],
  model: `Nowadays, there is a fast-food restaurant near almost every school in my town. Some people think these restaurants should be banned, but I am not sure that this is the right answer.

Of course, health is a serious issue. Fast food is often high in fat, sugar and salt, and if teenagers eat it every day, they are more likely to put on weight and have health problems later in life. It is also cheap, which makes it very tempting for students.

However, banning these restaurants would take away people's freedom of choice. Most teenagers are old enough to decide what to eat, and if there were no burger bars near the school, they would probably just buy snacks at the supermarket instead.

In my opinion, a better solution is to improve school canteens. If schools offered tasty, healthy meals at a reasonable price, fewer students would want to leave the building at lunchtime.

To sum up, I do not think a ban is necessary. Instead, schools should give students better options and teach them why healthy eating matters.`,
  callouts: [
    {q: "they are more likely to put on weight", tag: "phrasal", cz: "be more likely to = je pravděpodobnější; put on weight = přibrat."},
    {q: "which makes it very tempting for students", tag: "relative", cz: "which odkazuje na celou předchozí myšlenku (že je to levné)."},
    {q: "if there were no burger bars near the school, they would probably just buy snacks", tag: "conditional", cz: "Kondicionál 2. typu – hypotéza, co by se stalo po zákazu."},
    {q: "In my opinion, a better solution is to improve school canteens.", tag: "ownidea", cz: "Vlastní nápad (jídelna) – zároveň nabízí řešení problému."},
    {q: "why healthy eating matters", tag: "collocation", cz: "matter = být důležitý; přirozené zakončení eseje."}
  ]},

 {id: "e09", topic: "Města", title: "City or countryside?",
  context: "In your English class you have been talking about where people live. Now, your English teacher has asked you to write an essay.",
  question: "Is it better for young people to live in a city or in the countryside?",
  points: ["jobs and education", "a healthy lifestyle"],
  ownIdeas: ["entertainment and social life", "the cost of living", "transport"],
  scaffold: [
    {h: "Úvod", t: "Mladí chtějí do města, rodiče z něj – kde je to opravdu lepší?"},
    {h: "Práce a vzdělání (poznámka 1)", t: "Univerzity a firmy jsou ve městech; z vesnice se dojíždí hodiny."},
    {h: "Zdravý životní styl (poznámka 2)", t: "Venkov: čistý vzduch, méně stresu, příroda. Město: doprava, smog."},
    {h: "Vlastní nápad – zábava a společenský život", t: "Kina, koncerty, kluby vs. málo možností večer na venkově."},
    {h: "Závěr", t: "Pro mladé město – aspoň během studia a začátku kariéry; na venkov se dá přestěhovat později."}
  ],
  model: `Most young people in my country dream of moving to a big city, while their parents often want to move out of one. So where is it really better to live?

For young people, cities have a clear advantage when it comes to jobs and education. Most universities and big companies are based there, so there are far more opportunities. Someone who grows up in a village often has to travel for hours or move away to continue studying.

However, the countryside is usually a healthier place to live. The air is cleaner, there is less stress and it is easy to go walking or cycling in nature. In a city, people spend a lot of time in traffic and breathe polluted air.

Another important factor is social life. Cities offer cinemas, concerts, clubs and sports centres, while in the countryside there is often very little for young people to do in the evening.

Taking everything into account, I believe that a city is a better choice for young people, at least while they are studying and starting their careers. They can always move to the countryside later.`,
  callouts: [
    {q: "while their parents often want to move out of one", tag: "contrast", cz: "while = kdežto; one nahrazuje „a city“ (koheze bez opakování)."},
    {q: "when it comes to jobs and education", tag: "collocation", cz: "when it comes to = pokud jde o…; uvádí první poznámku."},
    {q: "Someone who grows up in a village", tag: "relative", cz: "Vztažná věta s who a konkrétní příklad."},
    {q: "Another important factor is social life.", tag: "ownidea", cz: "Vlastní nápad v samostatném odstavci."},
    {q: "Taking everything into account,", tag: "linker", cz: "Přirozená závěrečná fráze – nemusí to být vždy In conclusion."}
  ]},

 {id: "e10", topic: "Nakupování", title: "Shopping online",
  context: "In your English class you have been talking about shopping. Now, your English teacher has asked you to write an essay.",
  question: "Is shopping online better than shopping in real shops?",
  points: ["convenience", "the environment"],
  ownIdeas: ["local shops and jobs", "seeing and trying products", "prices"],
  scaffold: [
    {h: "Úvod", t: "Online se dá koupit skoro všechno – je to ale lepší?"},
    {h: "Pohodlí (poznámka 1)", t: "Kdykoli, z domova, rychlé srovnání cen – šetří čas."},
    {h: "Životní prostředí (poznámka 2)", t: "Každá zásilka zvlášť, obaly, vracení zboží = další doprava."},
    {h: "Vlastní nápad – místní obchody", t: "Obchody zavírají, centra měst se vyprazdňují."},
    {h: "Závěr", t: "Online je užitečné na něco, ale oblečení a dárky raději v obchodě."}
  ],
  model: `These days, it is possible to buy almost anything online, from books to fridges. But does this mean that online shopping is better than going to real shops?

There is no doubt that online shopping is very convenient. You can order things at any time of day without leaving your home, and you can compare prices in a few minutes. For busy people or those who live far from a town, this saves a great deal of time.

However, the effect on the environment is a serious problem. Each order is delivered separately, often by van, and products are wrapped in a lot of plastic and cardboard. Many items are also sent back, which means even more transport.

What is more, online shopping can harm local businesses. When people stop visiting shops in their town, many of them have to close, and the high street becomes empty.

In conclusion, I think online shopping is useful for some things, but it is not always the better choice. When I need clothes or a present, I still prefer to visit a real shop, where I can see what I am buying.`,
  callouts: [
    {q: "There is no doubt that online shopping is very convenient.", tag: "topic", cz: "There is no doubt that… – jistá topic sentence pro první poznámku."},
    {q: "Each order is delivered separately", tag: "passive", cz: "Trpný rod – důležitý je proces, ne kdo zásilku doručuje."},
    {q: "which means even more transport", tag: "relative", cz: "which means… – vztažná věta vyjadřuje důsledek."},
    {q: "What is more, online shopping can harm local businesses.", tag: "ownidea", cz: "Vlastní nápad (místní obchody) – uvedený spojkou What is more."},
    {q: "where I can see what I am buying", tag: "relative", cz: "where ve vztažné větě o místě."}
  ]},

 {id: "e11", topic: "Média", title: "Printed books",
  context: "In your English class you have been talking about reading and the media. Now, your English teacher has asked you to write an essay.",
  question: "Do we still need printed books in the digital age?",
  points: ["reading on screens", "libraries"],
  ownIdeas: ["young children learning to read", "the pleasure of owning books", "cost"],
  scaffold: [
    {h: "Úvod", t: "Čtečky a telefony – zmizí tištěné knihy? Názor: rozhodně ne."},
    {h: "Čtení na displeji (poznámka 1)", t: "Výhody (stovky knih, levnější), ale únava očí; z papíru si pamatujeme víc."},
    {h: "Knihovny (poznámka 2)", t: "Přístup zdarma pro všechny, tichá místa ke studiu, děti objevují knihy."},
    {h: "Vlastní nápad – malé děti", t: "Obrázková kniha s rodičem je jiný zážitek než displej."},
    {h: "Závěr", t: "Digitální knihy vedle tištěných, ne místo nich."}
  ],
  model: `With e-readers, tablets and phones, some people believe that printed books will soon disappear. I strongly disagree.

It is true that reading on a screen has some advantages. An e-reader can hold hundreds of books, which is ideal when you travel, and e-books are often cheaper. However, many people find it tiring to read on a screen, and research suggests that we remember more when we read on paper.

Libraries are another reason why printed books are still important. Not everyone can afford a tablet or buy lots of books, and libraries give everyone free access to reading. They are also quiet places where students can study and children can discover books for the first time.

In addition, I believe printed books are especially important for young children. Turning the pages of a picture book with a parent is a different experience from looking at a screen, and it helps children develop a love of reading.

To conclude, digital books are useful, but they should exist alongside printed ones, not replace them. I hope my own children will still grow up surrounded by real books.`,
  callouts: [
    {q: "I strongly disagree.", tag: "opinion", cz: "Krátká úderná věta s jasným názorem – efektní konec úvodu."},
    {q: "many people find it tiring to read on a screen", tag: "gerund", cz: "find it + přídavné jméno + to-infinitiv – typická B2 struktura."},
    {q: "Libraries are another reason why printed books are still important.", tag: "topic", cz: "Topic sentence navazuje na předchozí odstavec (another reason)."},
    {q: "In addition, I believe printed books are especially important for young children.", tag: "ownidea", cz: "Vlastní nápad (malé děti) – jasně odlišený od obou poznámek."},
    {q: "they should exist alongside printed ones, not replace them", tag: "reference", cz: "ones a them nahrazují podstatná jména – text se neopakuje."}
  ]},

 {id: "e12", topic: "Jídlo", title: "Cooking lessons at school",
  context: "In your English class you have been talking about food and lifestyle. Now, your English teacher has asked you to write an essay.",
  question: "Should cooking be taught as a subject at school?",
  points: ["healthy eating", "time in the school timetable"],
  ownIdeas: ["preparing for independent life", "saving money", "the cost of equipment"],
  scaffold: [
    {h: "Úvod", t: "Mnoho mladých neumí uvařit ani jednoduché jídlo → názor: ano, učit vaření."},
    {h: "Zdravé jídlo (poznámka 1)", t: "Méně hotových jídel a jídla s sebou; výživa prakticky, ne z učebnice."},
    {h: "Rozvrh (poznámka 2)", t: "Uznej protiargument; řešení: krátký kurz jednou za 14 dní."},
    {h: "Vlastní nápad – samostatný život", t: "Po odchodu z domova ušetří peníze a postarají se o sebe."},
    {h: "Závěr", t: "Dovednost na celý život – užitečnější než některé současné učivo."}
  ],
  model: `Many young people leave home without knowing how to cook even a simple meal. For this reason, I believe that cooking should be taught at school.

Firstly, cooking lessons would encourage healthier eating. Students who can prepare fresh food are less likely to depend on ready meals and takeaways, which are often full of salt and sugar. They would also learn about nutrition in a practical way rather than just reading about it in a textbook.

Some people argue that the school timetable is already full and that there is no time for another subject. This is a fair point, but cooking does not need to be taught every week. A short course of one lesson a fortnight would be enough to teach the basics.

Another advantage is that cooking prepares students for independent life. When they move out to study or work, knowing how to cook will help them save money and look after themselves.

In conclusion, the benefits of cooking lessons are clear. Learning to cook is a skill for life, and I think it is more useful than some of the things we currently learn at school.`,
  callouts: [
    {q: "cooking should be taught at school", tag: "passive", cz: "Modální sloveso + trpný rod (should be taught) – neosobní, věcný tón eseje."},
    {q: "which are often full of salt and sugar", tag: "relative", cz: "Vztažná věta s čárkou doplňuje informaci o takeaways."},
    {q: "This is a fair point, but cooking does not need to be taught every week.", tag: "contrast", cz: "Ústupka a reakce: uznáš argument a nabídneš řešení."},
    {q: "Another advantage is that cooking prepares students for independent life.", tag: "ownidea", cz: "Vlastní nápad (samostatný život) v novém odstavci."},
    {q: "look after themselves", tag: "phrasal", cz: "look after = starat se o; zvratné zájmeno themselves."}
  ]},

 {id: "e13", topic: "Kultura", title: "Free museums",
  context: "In your English class you have been talking about culture and the arts. Now, your English teacher has asked you to write an essay.",
  question: "Should museums and galleries be free for everyone?",
  points: ["education", "the cost of running museums"],
  ownIdeas: ["tourism and local businesses", "encouraging young people to visit", "protecting the collections"],
  scaffold: [
    {h: "Úvod", t: "Někde zdarma, jinde drahé vstupné; názor: zdarma je lepší."},
    {h: "Vzdělávání (poznámka 1)", t: "Učení zajímavou formou (skutečná kostra dinosaura); rodiny a školy by chodily častěji."},
    {h: "Náklady (poznámka 2)", t: "Opravy, ochrana sbírek, platy; peníze z daní – někomu to přijde nefér."},
    {h: "Vlastní nápad – turismus", t: "Návštěvníci utrácejí v kavárně, obchodě, restauracích a hotelech."},
    {h: "Závěr", t: "Pro vstup zdarma – kultura patří všem."}
  ],
  model: `In some countries, you can visit national museums without paying anything, while in others tickets are quite expensive. I believe that free entry is the better approach.

Museums play an important role in education. They allow people to learn about history, science and art in an interesting way, and seeing a real dinosaur skeleton is much more memorable than looking at a photo. If museums were free, families and school groups would visit them more often, not only once a year.

On the other hand, museums are expensive to run. Buildings need to be repaired, collections must be protected and staff have to be paid. If there are no tickets, the money has to come from taxes, which some people think is unfair.

However, free museums can also bring money into a city. Tourists who visit a free museum often spend money in its café and shop, as well as in local restaurants and hotels.

All things considered, I am in favour of free entry. Museums belong to everyone, and nobody should miss out on culture just because they cannot afford a ticket.`,
  callouts: [
    {q: "Museums play an important role in education.", tag: "collocation", cz: "play an important role in – častá a užitečná kolokace."},
    {q: "If museums were free, families and school groups would visit them more often", tag: "conditional", cz: "Kondicionál 2. typu – co by se stalo, kdyby…"},
    {q: "Buildings need to be repaired, collections must be protected and staff have to be paid.", tag: "passive", cz: "Tři trpné konstrukce s různými modálními slovesy – pestré, ale přirozené."},
    {q: "However, free museums can also bring money into a city.", tag: "ownidea", cz: "Vlastní nápad (turismus) reaguje na předchozí odstavec o nákladech."},
    {q: "nobody should miss out on culture", tag: "phrasal", cz: "miss out on = přijít o něco."}
  ]},

 {id: "e14", topic: "Věda", title: "Space exploration",
  context: "In your English class you have been talking about science and technology. Now, your English teacher has asked you to write an essay.",
  question: "Is it worth spending large amounts of money on space exploration?",
  points: ["new technology", "problems on Earth"],
  ownIdeas: ["inspiring young people", "international cooperation", "protecting Earth from asteroids"],
  scaffold: [
    {h: "Úvod", t: "Miliardy na rakety – plýtvání? Názor: je to dobrá investice."},
    {h: "Nové technologie (poznámka 1)", t: "Satelitní navigace, předpověď počasí, lékařské přístroje."},
    {h: "Problémy na Zemi (poznámka 2)", t: "Uznej argument (chudoba, klima), ale satelity měří tání ledu."},
    {h: "Vlastní nápad – inspirace mladých", t: "Vědci se pro vědu nadchli díky startu rakety nebo snímkům z Marsu."},
    {h: "Závěr", t: "Stojí to za to, ale ne na úkor zdravotnictví a školství."}
  ],
  model: `Every year, governments spend billions on sending rockets and robots into space. Some people think this is a waste of money, but I believe it is a worthwhile investment.

First of all, space research has led to many new technologies that we use every day. Satellite navigation, weather forecasts and even some medical equipment were developed thanks to space programmes. Without this research, our lives would be very different.

Of course, it is easy to argue that the money should be spent on problems on Earth, such as poverty or climate change. However, space research actually helps with some of these problems. Satellites, for instance, allow scientists to measure how quickly the ice at the North and South Poles is melting.

In addition, space exploration inspires young people. Many scientists say they became interested in science because they watched a rocket launch or saw the first pictures from Mars when they were children.

In conclusion, I think space exploration is worth the cost. Nevertheless, governments should make sure that it does not take money away from health and education.`,
  callouts: [
    {q: "a worthwhile investment", tag: "evaluative", cz: "worthwhile = užitečný, stojící za to – přesnější než „good“."},
    {q: "were developed thanks to space programmes", tag: "passive", cz: "Trpný rod v minulém čase + thanks to = díky."},
    {q: "Without this research, our lives would be very different.", tag: "conditional", cz: "Without… + would – kondicionál bez if."},
    {q: "Of course, it is easy to argue that", tag: "contrast", cz: "Ústupka – uznáš druhou poznámku a hned na ni odpovíš (However…)."},
    {q: "In addition, space exploration inspires young people.", tag: "ownidea", cz: "Vlastní nápad (inspirace mladých) jasně na začátku odstavce."}
  ]},

 {id: "e15", topic: "Zvířata", title: "Zoos",
  context: "In your English class you have been talking about animals and nature. Now, your English teacher has asked you to write an essay.",
  question: "Is it right to keep animals in zoos?",
  points: ["protecting endangered species", "the animals' quality of life"],
  ownIdeas: ["education for children", "research", "wildlife documentaries as an alternative"],
  scaffold: [
    {h: "Úvod", t: "Zoo jsou oblíbené, ale kritizované; názor: obhajitelné, ale jen ty dobré."},
    {h: "Ohrožené druhy (poznámka 1)", t: "Chov a návrat do přírody – některé druhy by bez zoo zmizely."},
    {h: "Kvalita života zvířat (poznámka 2)", t: "Sloni a lední medvědi potřebují obrovský prostor – stres a nuda."},
    {h: "Vlastní nápad – vzdělávání dětí", t: "První setkání s žirafou; ale dokumenty učí také."},
    {h: "Závěr", t: "Jen zvířata, která v zajetí žijí dobře; ochrana, ne zábava."}
  ],
  model: `Zoos are popular with families, but they have also been criticised for keeping wild animals in cages. In my view, zoos can be justified, but only good ones.

One strong argument for zoos is that they help to protect endangered species. Some animals, such as certain types of tiger, would probably have disappeared without zoos, which breed them and sometimes return them to the wild.

On the other hand, we cannot ignore the animals' quality of life. Large animals like elephants and polar bears need huge areas to move around, and in small enclosures they often become bored and stressed. It is hard to believe that such animals can be happy in a zoo.

Zoos also play an educational role. Many children see a giraffe or a gorilla for the first time in a zoo, and this can make them care more about nature. Nevertheless, documentaries can teach people a lot about animals too.

To sum up, I think zoos should only keep animals that can live well in captivity, and they should focus on protecting species rather than entertaining visitors.`,
  callouts: [
    {q: "they have also been criticised for keeping wild animals in cages", tag: "passive", cz: "Trpný rod v předpřítomném čase + for + -ing."},
    {q: "would probably have disappeared without zoos", tag: "conditional", cz: "Kondicionál 3. typu (would have + příčestí) – co by se stalo v minulosti."},
    {q: "we cannot ignore the animals' quality of life", tag: "contrast", cz: "Druhá poznámka jako protiargument – esej zvažuje obě strany."},
    {q: "Zoos also play an educational role.", tag: "ownidea", cz: "Vlastní nápad (vzdělávání) – krátká topic sentence."},
    {q: "rather than entertaining visitors", tag: "comparison", cz: "rather than + -ing = spíše než."}
  ]},

 {id: "e16", topic: "Slavní lidé", title: "Celebrities as role models",
  context: "In your English class you have been talking about fame and the media. Now, your English teacher has asked you to write an essay.",
  question: "Are famous people good role models for young people?",
  points: ["success through hard work", "lifestyle and behaviour"],
  ownIdeas: ["using fame to support good causes", "unrealistic images on social media", "influencers and advertising"],
  scaffold: [
    {h: "Úvod", t: "Mladí sledují zpěváky, fotbalisty a influencery víc než kdy dřív – jsou to dobré vzory?"},
    {h: "Úspěch díky práci (poznámka 1)", t: "Roky dřiny – talent nestačí, nevzdávat se."},
    {h: "Životní styl a chování (poznámka 2)", t: "Drahá auta a večírky – špatný signál; špatné chování na veřejnosti."},
    {h: "Vlastní nápad – dobročinnost", t: "Celebrity, které sbírají peníze nebo mluví o duševním zdraví."},
    {h: "Závěr", t: "Nelze paušalizovat; obdivovat za činy a chování, ne za slávu a peníze."}
  ],
  model: `Young people follow the lives of singers, footballers and influencers more closely than ever before. But are these celebrities really good role models?

Some of them certainly are. Many famous athletes and musicians have become successful only after years of hard work. Their stories show young people that talent alone is not enough and that it is worth practising and not giving up.

However, the lifestyle of some celebrities sends the wrong message. Expensive cars, parties and designer clothes can make teenagers believe that money and fame are the most important things in life. Some stars also behave badly in public, and their fans may copy them.

Another point is that a lot of celebrities use their fame to support good causes. When a popular singer raises money for charity or speaks openly about mental health, millions of young people listen.

In my opinion, it is impossible to say that all celebrities are good or bad role models. Young people should learn to admire people for what they achieve and how they treat others, not for how rich or famous they are.`,
  callouts: [
    {q: "more closely than ever before", tag: "comparison", cz: "Srovnání s than ever before = víc než kdy dřív."},
    {q: "have become successful only after years of hard work", tag: "tense", cz: "Předpřítomný čas – výsledek dlouhé práce, který platí dnes."},
    {q: "can make teenagers believe that", tag: "collocation", cz: "make someone do something – make + infinitiv bez to."},
    {q: "Another point is that a lot of celebrities use their fame to support good causes.", tag: "ownidea", cz: "Vlastní nápad (dobročinnost) – jasně ohlášený."},
    {q: "for what they achieve and how they treat others", tag: "reference", cz: "Paralelní vedlejší věty (what…, how…) – vyvážený závěr."}
  ]},

 {id: "e17", topic: "Jazyky", title: "Translation apps and learning languages",
  context: "In your English class you have been talking about learning languages. Now, your English teacher has asked you to write an essay.",
  question: "Now that we have translation apps, is it still necessary to learn foreign languages?",
  points: ["how good translation apps are", "travel and work"],
  ownIdeas: ["understanding other cultures", "making friends", "keeping your brain active"],
  scaffold: [
    {h: "Úvod", t: "Překladače se hodně zlepšily – má smysl se učit jazyky? Názor: rozhodně ano."},
    {h: "Kvalita aplikací (poznámka 1)", t: "Menu a cedule v sekundě, ale chyby ve vtipech, idiomech a delších rozhovorech."},
    {h: "Cestování a práce (poznámka 2)", t: "Turista, který mluví s místními, má bohatší zážitek; zaměstnavatelé chtějí přímou komunikaci."},
    {h: "Vlastní nápad – porozumění kultuře", t: "Slova a výrazy ukazují, jak lidé v zemi myslí."},
    {h: "Závěr", t: "Aplikace jsou skvělý nástroj, ale nenahradí skutečné znalosti."}
  ],
  model: `Translation apps have improved enormously in the last few years. As a result, some people wonder whether it is still worth spending years learning a foreign language. I believe it definitely is.

It is true that translation apps are very useful. They can translate a menu or a road sign in seconds, and they are getting better all the time. However, they still make mistakes, especially with jokes, idioms or longer conversations, and they cannot understand the situation the way a person can.

When it comes to travel and work, speaking a language yourself is a huge advantage. A tourist who can chat with local people will have a much richer experience, and employers still prefer candidates who can talk to foreign customers directly.

What is more, learning a language helps you understand another culture. Many words and expressions show how people in a country think, and you lose this if you rely on an app.

In conclusion, translation apps are a great tool, but they cannot replace real language skills. Learning a language is not only useful – it is also a way of connecting with other people.`,
  callouts: [
    {q: "some people wonder whether it is still worth spending years learning a foreign language", tag: "gerund", cz: "wonder whether… + it is worth + -ing – nepřímá otázka a gerundium."},
    {q: "they are getting better all the time", tag: "tense", cz: "Průběhový čas pro postupnou změnu (get better)."},
    {q: "A tourist who can chat with local people will have a much richer experience", tag: "relative", cz: "Vztažná věta + srovnání much richer."},
    {q: "What is more, learning a language helps you understand another culture.", tag: "ownidea", cz: "Vlastní nápad (kultura) uvedený přirozenou spojkou What is more."},
    {q: "not only useful – it is also a way of connecting with other people", tag: "linker", cz: "not only… also – přidání bez knižní inverze."}
  ]},

 {id: "e18", topic: "Vzdělávání", title: "Homework every day",
  context: "In your English class you have been talking about school life. Now, your English teacher has asked you to write an essay.",
  question: "Should students be given homework every day?",
  points: ["practising what you learn in class", "free time and stress"],
  ownIdeas: ["learning to work independently", "help from parents", "differences between students"],
  scaffold: [
    {h: "Úvod", t: "Téma sporů mezi studenty a učiteli; názor: domácí úkoly ano, ale ne každý den."},
    {h: "Procvičování (poznámka 1)", t: "Bez opakování zapomeneme; krátké úkoly (slovíčka, pár příkladů) pomáhají."},
    {h: "Volný čas a stres (poznámka 2)", t: "6–7 hodin denně + úkoly z každého předmětu = celý večer; chybí sport a rodina."},
    {h: "Vlastní nápad – samostatnost", t: "Na univerzitě a v práci ti nikdo neřekne, co přesně dělat – naučit se organizovat čas."},
    {h: "Závěr", t: "2–3× týdně, krátké a smysluplné úkoly."}
  ],
  model: `Homework is one of the topics that students and teachers often disagree about. In my opinion, homework is useful, but students should not get it every day.

It cannot be denied that practice is important. If students do not review what they have learned, they forget most of it within a few days. Short tasks at home, such as learning new vocabulary or doing a few maths problems, help them remember it.

However, daily homework can be very stressful. Many students have six or seven lessons a day, and if every teacher gives them homework, they may spend the whole evening studying. As a result, they have no time for sport, hobbies or their family, which are also important.

Homework can also teach students to work on their own. At university and at work, nobody tells you exactly what to do, so it is useful to learn how to organise your time while you are still at school.

To sum up, I believe that homework should be given two or three times a week, not every day. It should be short and meaningful rather than just extra work.`,
  callouts: [
    {q: "one of the topics that students and teachers often disagree about", tag: "relative", cz: "Vztažná věta s předložkou na konci (disagree about) – přirozená angličtina."},
    {q: "It cannot be denied that practice is important.", tag: "passive", cz: "Neosobní trpná konstrukce – vhodná do eseje, ale stačí jednou."},
    {q: "If students do not review what they have learned, they forget most of it", tag: "conditional", cz: "Kondicionál 0. typu – obecná pravda."},
    {q: "Homework can also teach students to work on their own.", tag: "ownidea", cz: "Vlastní nápad (samostatnost) – nový odstavec, nový argument."},
    {q: "should be given two or three times a week", tag: "passive", cz: "Modální sloveso + trpný rod v závěru – jasný a konkrétní názor."}
  ]},

 {id: "e19", topic: "Společnost", title: "Voluntary work",
  context: "In your English class you have been talking about helping other people. Now, your English teacher has asked you to write an essay.",
  question: "Should all young people do some voluntary work in their community?",
  points: ["learning new skills", "the time it takes"],
  ownIdeas: ["helping people in need", "meeting people from different backgrounds", "whether it should be compulsory"],
  scaffold: [
    {h: "Úvod", t: "Dobrovolnictví = pomoc bez nároku na plat; pozitivní, ale nemělo by být povinné."},
    {h: "Nové dovednosti (poznámka 1)", t: "Charitativní obchod, útulek, trénování dětí → odpovědnost, týmová práce, CV."},
    {h: "Čas (poznámka 2)", t: "Škola, úkoly, zkoušky, brigáda – další povinnost by je vyčerpala."},
    {h: "Vlastní nápad – pomoc potřebným", t: "Osamělí senioři – návštěva a rozhovor mění jejich život."},
    {h: "Závěr", t: "Podporovat, ne nařizovat – nucená dobrovolnost není dobrovolná."}
  ],
  model: `Voluntary work means giving your time to help others without being paid. Although I think it is a very positive experience, I am not sure that it should be compulsory for all young people.

There is no doubt that volunteering helps young people learn new skills. Working in a charity shop, helping at an animal shelter or coaching younger children can teach responsibility, teamwork and communication. These skills are useful in any job, and they look good on a CV too.

On the other hand, many teenagers are already very busy. They have school, homework, exams and often a part-time job, so adding regular voluntary work could leave them exhausted.

The main reason for volunteering, however, is that it helps people who need support. Elderly people who live alone, for example, are often very grateful for a visit and a chat, and this can make a real difference to their lives.

All in all, I believe that young people should be encouraged to volunteer, but it should remain their own choice. If they are forced to do it, it is no longer really voluntary work.`,
  callouts: [
    {q: "without being paid", tag: "passive", cz: "without + being + příčestí – trpné gerundium, krátká a přesná definice."},
    {q: "Although I think it is a very positive experience, I am not sure that it should be compulsory", tag: "opinion", cz: "Vyvážený názor hned v úvodu: although… + jasný postoj."},
    {q: "leave them exhausted", tag: "collocation", cz: "leave someone + přídavné jméno = způsobit, že je někdo…"},
    {q: "The main reason for volunteering, however, is that it helps people who need support.", tag: "ownidea", cz: "Vlastní nápad (pomoc potřebným); however uprostřed věty zní přirozeně."},
    {q: "young people should be encouraged to volunteer", tag: "passive", cz: "Modální sloveso + trpný rod – doporučení bez „you must“."}
  ]},

 {id: "e20", topic: "Životní prostředí", title: "The price of flying",
  context: "In your English class you have been talking about travel and the environment. Now, your English teacher has asked you to write an essay.",
  question: "Should air travel be made more expensive to protect the environment?",
  points: ["pollution and climate change", "holidays for ordinary families"],
  ownIdeas: ["better train connections", "business travel and video calls", "jobs in tourism"],
  scaffold: [
    {h: "Úvod", t: "Levné lety umožnily cestovat milionům lidí, ale škodí přírodě; zdražit?"},
    {h: "Znečištění (poznámka 1)", t: "Jeden let tam a zpět = víc CO2 než roční produkce člověka v některých zemích."},
    {h: "Běžné rodiny (poznámka 2)", t: "Nefér: chudší by nemohli cestovat, bohatí by létali dál."},
    {h: "Vlastní nápad – vlaky", t: "Rychlejší a levnější vlaky jako alternativa pro kratší cesty v Evropě."},
    {h: "Závěr", t: "Mírně zdražit, pokud peníze půjdou do železnice."}
  ],
  model: `Cheap flights have made it possible for millions of people to travel abroad. However, flying is very bad for the environment, and some people believe tickets should cost more.

Planes certainly cause a lot of pollution. A single return flight to another continent can produce more carbon dioxide than a person in some countries produces in a whole year. If flights were more expensive, people would probably fly less, which would help to slow down climate change.

On the other hand, higher prices would be unfair to ordinary families. For many people, a cheap flight is the only way to afford a holiday abroad, while rich people would continue flying as much as they like.

In my view, the most important thing is to offer good alternatives. If trains were faster and cheaper, many people would choose them for shorter trips, especially within Europe.

In conclusion, I think it would be fair to make flights a little more expensive, but only if the money is used to improve rail travel. That way, protecting the environment would not mean ordinary people have to stay at home.`,
  callouts: [
    {q: "Cheap flights have made it possible for millions of people to travel abroad.", tag: "tense", cz: "Předpřítomný čas pro změnu, která trvá; make it possible for… to…"},
    {q: "more carbon dioxide than a person in some countries produces in a whole year", tag: "comparison", cz: "Srovnání s more… than + konkrétní údaj."},
    {q: "which would help to slow down climate change", tag: "relative", cz: "which odkazuje na celou předchozí myšlenku; slow down = zpomalit."},
    {q: "In my view, the most important thing is to offer good alternatives.", tag: "ownidea", cz: "Vlastní nápad (alternativy – vlaky) spojený s názorem."},
    {q: "but only if the money is used to improve rail travel", tag: "conditional", cz: "only if + trpný rod – názor s jasnou podmínkou."}
  ]},

 {id: "e21", topic: "Škola", title: "School uniforms",
  context: "In your English class you have been talking about school rules. Now, your English teacher has asked you to write an essay.",
  question: "Should all students have to wear a school uniform?",
  points: ["equality between students", "expressing your personality"],
  ownIdeas: ["the cost for families", "saving time in the morning", "a feeling of belonging to the school"],
  scaffold: [
    {h: "Úvod", t: "V Británii běžné, u nás ne; názor: víc výhod než nevýhod."},
    {h: "Rovnost (poznámka 1)", t: "Nikdo není souzen za značky, menší tlak módy, méně šikany."},
    {h: "Osobnost (poznámka 2)", t: "Oblečení jako vyjádření sebe sama – ale zbývají účes, tašky, víkendy."},
    {h: "Vlastní nápad – cena", t: "Uniformy nejsou nutně drahé – rodiče kupují méně módního oblečení."},
    {h: "Závěr", t: "Pro uniformy: praktické, spravedlivé, pocit sounáležitosti."}
  ],
  model: `School uniforms are common in Britain, but in my country most students wear whatever they like. Although many teenagers would disagree, I believe that uniforms have more advantages than disadvantages.

The strongest argument for uniforms is that they make students more equal. When everyone wears the same clothes, nobody is judged for not having expensive brands, and there is less pressure to follow fashion. This can reduce bullying, especially of students from poorer families.

On the other hand, many teenagers feel that clothes are an important way of expressing their personality. Being told what to wear every day can feel like a lack of freedom. However, students can still express themselves through their hairstyle, bags or the clothes they wear at weekends.

Another point is cost. Some people think uniforms are expensive, but in fact they can save families money, as parents do not have to buy as many fashionable clothes.

In conclusion, I am in favour of school uniforms. They are practical and fair, and they create a feeling of belonging, which I think matters more than wearing what you want for a few hours a day.`,
  callouts: [
    {q: "Although many teenagers would disagree, I believe that", tag: "opinion", cz: "Názor s ústupkou – ukazuje, že znáš i druhou stranu."},
    {q: "nobody is judged for not having expensive brands", tag: "passive", cz: "Trpný rod + for + not + -ing."},
    {q: "Being told what to wear every day can feel like a lack of freedom.", tag: "gerund", cz: "Trpné gerundium jako podmět (Being told…) – pokročilejší, ale přirozená struktura."},
    {q: "Another point is cost.", tag: "ownidea", cz: "Vlastní nápad (cena) – stručně a jasně."},
    {q: "which I think matters more than", tag: "relative", cz: "Vztažná věta s vloženým I think – přirozené vyjádření názoru."}
  ]},

 {id: "e22", topic: "Volný čas", title: "Video games",
  context: "In your English class you have been talking about free-time activities. Now, your English teacher has asked you to write an essay.",
  question: "Are video games good or bad for young people?",
  points: ["skills that games can develop", "health"],
  ownIdeas: ["learning English through games", "making friends online", "the cost of games"],
  scaffold: [
    {h: "Úvod", t: "Oblíbený koníček, rodiče se bojí; názor: hry samy o sobě neškodí – záleží jak."},
    {h: "Dovednosti (poznámka 1)", t: "Strategie = plánování; týmové hry = komunikace a rychlá rozhodnutí."},
    {h: "Zdraví (poznámka 2)", t: "Sezení bez pohybu, bolest zad, špatný spánek → pravidelné přestávky."},
    {h: "Vlastní nápad – angličtina", t: "Hry v angličtině, chat s hráči z jiných zemí – osobní zkušenost."},
    {h: "Závěr", t: "Dobré, pokud s mírou a nenahradí pohyb a skutečné přátele."}
  ],
  model: `Video games are one of the most popular hobbies among teenagers, but many parents worry about them. In my opinion, games are not harmful in themselves – it depends on how they are played.

To begin with, games can develop useful skills. Strategy games teach players to plan ahead and solve problems, while team games require communication and quick decisions. Some studies have shown that gamers have faster reactions than people who do not play.

However, spending hours in front of a screen can be bad for your health. Players who sit for hours without moving may put on weight, suffer from back pain or sleep badly if they play late at night. This is why it is important to take regular breaks.

Something people often forget is that games can help with learning English. Many popular games are only available in English, and players often chat with people from other countries. I have learned a lot of vocabulary this way myself.

To conclude, video games can be good for young people, as long as they are played in moderation and do not replace sport or real friendships.`,
  callouts: [
    {q: "it depends on how they are played", tag: "passive", cz: "depend on + nepřímá otázka s trpným rodem."},
    {q: "To begin with, games can develop useful skills.", tag: "topic", cz: "Topic sentence s přirozeným To begin with místo stále stejného Firstly."},
    {q: "Some studies have shown that", tag: "tense", cz: "Předpřítomný čas pro výsledky výzkumu, které platí dnes."},
    {q: "Something people often forget is that games can help with learning English.", tag: "ownidea", cz: "Vlastní nápad (angličtina) uvedený zajímavým způsobem."},
    {q: "as long as they are played in moderation", tag: "conditional", cz: "as long as = pokud; in moderation = s mírou."}
  ]}
],

/* ---------- PART 2: article, email/letter (formal + informal), report, review ---------- */
part2: [
 /* ===== ARTICLES ===== */
 {id: "a01", type: "article", register: "neutral", title: "Article: the best day of the year",
  prompt: "You see this announcement on an English-language website for young people.",
  notice: "Articles wanted!\n\nTHE BEST DAY OF THE YEAR\n\nWhich day of the year do you look forward to most? What do you usually do on this day, and why is it so special for you?\n\nWrite an article answering these questions. The best articles will be published on our website.",
  require: ["say which day of the year you look forward to most", "describe what you usually do on that day", "explain why it is special for you"],
  instruction: "Write your article.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Otázka na čtenáře; prozraď, o který den jde (poslední školní den)."},
    {h: "Co dělám", t: "Ráno vysvědčení a loučení, odpoledne celá třída u jezera – koupání, volejbal, grilování."},
    {h: "Proč je výjimečný", t: "Pocit svobody, ale hlavně všichni pohromadě a uvolnění."},
    {h: "Závěr", t: "Co pro mě ten den znamená + výzva čtenáři (why not try it?)."}
  ],
  model: `The day the summer begins

Is there one day you count down to every year? For me, it is the last day of the school year – and not just because the holidays are starting.

In my town, the end of the school year is a real celebration. In the morning, we get our reports and say goodbye to our teachers, which can be quite emotional. Then, in the afternoon, the whole class goes to the lake just outside the town. We swim, play volleyball and have a barbecue that usually goes on until it gets dark.

So why is this day so special? Partly, of course, it's the feeling of freedom. After ten months of tests and homework, two whole months of free time are waiting for you. But what I love most is that everyone is together and relaxed. Even people who hardly talk to each other during the year join in the fun.

It's a day that always reminds me how lucky I am to have such good friends. If you've never celebrated the end of the school year like this, why not try it next June?`,
  callouts: [
    {q: "Is there one day you count down to every year?", tag: "question", cz: "Otázka na čtenáře hned v úvodu – typický začátek článku. count down to = odpočítávat dny do…"},
    {q: "which can be quite emotional", tag: "relative", cz: "which odkazuje na celou předchozí myšlenku (loučení s učiteli)."},
    {q: "So why is this day so special?", tag: "question", cz: "Otázka uvádí odstavec, který odpovídá na třetí otázku zadání."},
    {q: "But what I love most is that everyone is together and relaxed.", tag: "evaluative", cz: "What I love most is… – jednoduchá vytýkací konstrukce, která zdůrazní hlavní důvod."},
    {q: "why not try it next June?", tag: "closing", cz: "Závěr oslovuje čtenáře a vybízí k akci."}
  ]},

 {id: "a02", type: "article", register: "neutral", title: "Article: a place that makes you happy",
  prompt: "You see this announcement in an English-language magazine for students.",
  notice: "My favourite place\n\nIs there a place where you always feel happy or relaxed? It could be in a city, in the countryside or even in your own home. What is it like, and why do you like being there so much?\n\nThe best articles will be published in next month's magazine.",
  require: ["describe the place", "explain why you like being there"],
  instruction: "Write your article.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Každý potřebuje místo, kam utéct – moje je lavička na kopci nad městem."},
    {h: "Jaké to místo je", t: "Cesta lesem, nikdo tam nechodí, výhled na údolí, řeku, střechy a hory."},
    {h: "Proč tam chodím", t: "Objevila jsem ho s dědou; chodím přemýšlet – problémy shora vypadají menší."},
    {h: "Nejlepší čas + závěr", t: "Podvečer, zlaté údolí; otázka na čtenáře."}
  ],
  model: `A bench with a view

Everyone needs a place where they can escape from the world for a while. Mine is an old wooden bench on a hill above my town.

To get there, you have to walk for about twenty minutes along a narrow path through the woods. It isn't a famous viewpoint, so you rarely meet anyone there. From the bench, you can see the whole valley: the river, the red roofs of the old town and, on a clear day, the mountains.

I discovered it with my grandfather when I was about eight, and since then it has become my favourite place. I go there whenever I need to think, especially before exams or after an argument. Somehow, problems always seem smaller when you look at them from above.

The best time to go is early in the evening, when the sun is going down and the valley turns gold. Sitting there with a book, or just listening to the birds, is the most relaxing thing I know.

Do you have a place like this? If not, maybe it's time to find one.`,
  callouts: [
    {q: "Everyone needs a place where they can escape from the world for a while.", tag: "opening", cz: "Obecná věta, se kterou čtenář souhlasí – a pak osobní pointa (Mine is…)."},
    {q: "you have to walk for about twenty minutes along a narrow path through the woods", tag: "example", cz: "Konkrétní detaily (čas, cesta) dělají popis živým – to je na článku nejdůležitější."},
    {q: "since then it has become my favourite place", tag: "tense", cz: "Předpřítomný čas se since – od té doby dodnes."},
    {q: "problems always seem smaller when you look at them from above", tag: "reason", cz: "Osobní důvod, proč tam chodím – odpověď na druhou otázku zadání."},
    {q: "Do you have a place like this?", tag: "question", cz: "Závěrečná otázka zapojí čtenáře."}
  ]},

 {id: "a03", type: "article", register: "neutral", title: "Article: a week without your phone",
  prompt: "You see this announcement on an English-language website.",
  notice: "Could you live without your phone for a week?\n\nHow would your life be different without your phone? What would you miss most, and is there anything you would enjoy about it?\n\nWrite an article answering these questions. We will publish the most interesting articles on our website.",
  require: ["describe how your life would be different", "say what you would miss most", "say what you might enjoy about it"],
  instruction: "Write your article.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Telefon je první a poslední věc dne; kamarádi mě vyzvali – jak by to vypadalo?"},
    {h: "Jak by se život změnil", t: "Budík, hudba, autobusy, plány s kamarády – zmeškaný autobus, nevím o plánech."},
    {h: "Co by mi chybělo", t: "Kontakt s nejlepší kamarádkou v jiném městě."},
    {h: "Co bych si užil(a) + závěr", t: "Čas na čtení a kreslení, lepší spánek; zvládnu to? Výzva čtenáři."}
  ],
  model: `A week offline? Challenge accepted!

My phone is the first thing I look at in the morning and the last thing I see at night. So when my friends challenged me to spend a week without it, I nearly said no. But how different would life really be?

The first few days would definitely be hard. I use my phone for almost everything: my alarm, music, bus times and, of course, chatting with friends. Without it, I'd probably miss the bus and have no idea what my friends were planning.

What I'd miss most is being in contact with people. My best friend moved to another city, and we message each other every day. A week without hearing from her would feel very long.

On the other hand, I'd enjoy some things. I'd have much more time for reading and drawing, which I used to love but rarely do now. I'd also sleep better, because I wouldn't be scrolling in bed until midnight.

So, could I do it? I think so – and it might even be good for me. Why don't you try it as well?`,
  callouts: [
    {q: "A week offline? Challenge accepted!", tag: "title", cz: "Krátký nadpis s otázkou a zvoláním – v článku je živý styl vítaný."},
    {q: "But how different would life really be?", tag: "question", cz: "Otázka na konci úvodu navede čtenáře k hlavní části."},
    {q: "Without it, I'd probably miss the bus", tag: "conditional", cz: "Hypotetická situace → would ('d) v celém textu; stažené tvary jsou v článku v pořádku."},
    {q: "which I used to love but rarely do now", tag: "relative", cz: "Vztažná věta + used to (dřívější zvyk)."},
    {q: "Why don't you try it as well?", tag: "closing", cz: "Výzva čtenáři – přirozený konec článku."}
  ]},

 {id: "a04", type: "article", register: "neutral", title: "Article: a person you admire",
  prompt: "You see this announcement in an international magazine for young people.",
  notice: "Everyday heroes\n\nWe are looking for articles about people you admire who are not famous. Who is the person? What have they done, and what have you learned from them?\n\nThe best articles will appear in our summer issue.",
  require: ["say who the person is", "describe what they have done", "explain what you have learned from them"],
  instruction: "Write your article.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Hrdinové = filmové hvězdy? Můj hrdina je 72letá babička."},
    {h: "Co dokázala", t: "40 let zdravotní sestrou, v důchodu začala běhat – maraton a další."},
    {h: "Co obdivuji", t: "Odhodlání, nestěžuje si, učí se angličtinu."},
    {h: "Co jsem se naučil(a)", t: "Nikdy není pozdě; když to chci vzdát, myslím na ni."}
  ],
  model: `My grandmother, the marathon runner

Who is your hero? Most people would name a film star or a famous athlete. My hero is a 72-year-old woman who lives in a small flat in Brno: my grandmother.

Grandma Věra worked as a nurse for forty years, often doing night shifts while she was bringing up three children. When she retired, everyone expected her to relax at home. Instead, she decided to take up running. At first, she could hardly run for five minutes, but she trained every morning, whatever the weather. Three years later, she finished her first marathon, and she has run four more since then.

What I admire most is her determination. She never complains, and she never says that she is too old to try something new. Last year she even started learning English, so that she could chat with the people she meets at international races.

Grandma has taught me that it is never too late to set yourself a goal. Whenever I feel like giving up, I think of her running through the rain at six in the morning – and I keep going.`,
  callouts: [
    {q: "My hero is a 72-year-old woman who lives in a small flat in Brno: my grandmother.", tag: "opening", cz: "Překvapivá pointa na konci úvodu – čtenář chce číst dál."},
    {q: "while she was bringing up three children", tag: "phrasal", cz: "bring up = vychovávat; průběhový minulý čas pro děj na pozadí."},
    {q: "she decided to take up running", tag: "phrasal", cz: "take up = začít s koníčkem/sportem."},
    {q: "she has run four more since then", tag: "tense", cz: "Předpřítomný čas + since then – výsledek až do dneška."},
    {q: "Grandma has taught me that it is never too late to set yourself a goal.", tag: "closing", cz: "Odpověď na poslední otázku zadání (co jsem se naučil/a) – jasně a osobně."}
  ]},

 {id: "a05", type: "article", register: "neutral", title: "Article: learning a new skill",
  prompt: "You see this announcement on an English-language website for students.",
  notice: "Learning something new\n\nHave you ever learned a new skill outside school, for example a sport, a musical instrument or a craft? How did you learn it, what was the most difficult part, and would you recommend it to other people?\n\nWrite an article answering these questions. The best articles will be published on our website.",
  require: ["say what skill you learned and how you learned it", "describe the most difficult part", "say whether you would recommend it"],
  instruction: "Write your article.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Tátova stará kytara v garáži, žádné peníze na lekce → učím se sám/sama z internetu."},
    {h: "Jak jsem se učil(a)", t: "Krátká videa, opakování těžkých míst, půl hodiny denně – akordy, pak písně."},
    {h: "Nejtěžší část", t: "Bolavé prsty, přechody mezi akordy; motivace = oblíbené písně."},
    {h: "Výsledek + doporučení", t: "50 písní, školní koncert; ano – učí trpělivosti."}
  ],
  model: `How the internet taught me the guitar

Two years ago, I found my dad's old guitar in the garage. I had no money for lessons, so I decided to teach myself – with a little help from the internet.

I started with free video lessons online. They were short and easy to follow, and I could watch the difficult parts again and again. Every day after school, I practised for about half an hour, first simple chords and then complete songs.

The hardest part was definitely the beginning. My fingers hurt for weeks, and changing quickly from one chord to another seemed impossible. More than once, I nearly gave up. What kept me going was choosing songs I really loved, because I wanted to play them for my friends.

Today I'm far from perfect, but I can play around fifty songs, and last month I performed at a school concert for the first time.

Would I recommend it? Absolutely. Learning an instrument teaches you patience, and there's no better feeling than playing a song you love. Just be ready for some sore fingers at first!`,
  callouts: [
    {q: "I decided to teach myself", tag: "gerund", cz: "decide + to-infinitiv; teach myself = učit se sám."},
    {q: "They were short and easy to follow", tag: "evaluative", cz: "easy to follow – přirozené hodnocení výukových videí."},
    {q: "The hardest part was definitely the beginning.", tag: "topic", cz: "Topic sentence přímo odpovídá na otázku ze zadání (the most difficult part)."},
    {q: "What kept me going was choosing songs I really loved", tag: "phrasal", cz: "keep somebody going = držet nad vodou, motivovat."},
    {q: "Would I recommend it? Absolutely.", tag: "recommend", cz: "Otázka + krátká odpověď – živý způsob, jak odpovědět na poslední bod zadání."}
  ]},

 {id: "a06", type: "article", register: "neutral", title: "Article: sport for people who hate sport",
  prompt: "You see this announcement in an English-language magazine.",
  notice: "Get moving!\n\nMany people say they don't like sport. Is there a sport or physical activity that you would recommend to them? What is it like, and why do you think they would enjoy it?\n\nWrite an article for our health and fitness section.",
  require: ["say which sport or activity you would recommend", "describe what it is like", "explain why people who don't like sport would enjoy it"],
  instruction: "Write your article.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Ve škole vždy poslední vybraný; kamarád mě vzal na lezeckou stěnu."},
    {h: "Jaký je bouldering", t: "Nízké stěny bez lan, žíněnky, barevné cesty podle úrovně."},
    {h: "Proč ho budou mít rádi", t: "Žádná soutěž, vlastní tempo; spíš hlavolam než cvičení."},
    {h: "Závěr", t: "Přátelská komunita; výzva: zkus to."}
  ],
  model: `Hate sport? Try climbing!

At school, I was always the last to be picked for any team. I hated running, I was terrible at football and PE lessons were my worst nightmare. Then a friend took me to a climbing centre, and everything changed.

Indoor climbing, or bouldering, means climbing short walls without ropes. The walls are only about four metres high, and there are thick mats underneath, so it's completely safe. Each route is marked with coloured holds, and you simply choose one that matches your level.

So why would someone who hates sport enjoy it? First of all, there's no competition. You climb at your own speed, and nobody shouts at you if you fall off. Secondly, it feels more like solving a puzzle than doing exercise. You have to think about where to put your hands and feet, so you forget that you're actually working hard.

On top of that, climbers are really friendly, and people often give each other tips. So if you think sport isn't for you, give climbing a try – you might be surprised!`,
  callouts: [
    {q: "Hate sport? Try climbing!", tag: "title", cz: "Nadpis oslovuje přímo cílovou skupinu ze zadání."},
    {q: "I was always the last to be picked for any team", tag: "passive", cz: "the last to be picked – trpný infinitiv; osobní příběh místo obecného úvodu."},
    {q: "Each route is marked with coloured holds", tag: "passive", cz: "Trpný rod při popisu, jak věc funguje."},
    {q: "it feels more like solving a puzzle than doing exercise", tag: "comparison", cz: "feel like + -ing a srovnání more… than – přesně vysvětluje, proč to baví."},
    {q: "give climbing a try", tag: "collocation", cz: "give something a try = zkusit to; přirozená výzva čtenáři."}
  ]},

 {id: "a07", type: "article", register: "neutral", title: "Article: a dish from your country",
  prompt: "You see this announcement on an international food website.",
  notice: "Food from around the world\n\nWhat is a traditional dish from your country that visitors should try? What is in it, when do people eat it, and why do you like it?\n\nWrite an article for our international food page. The best articles will win a cookbook!",
  require: ["describe the dish and what is in it", "say when people eat it", "explain why you like it"],
  instruction: "Write your article.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Všichni znají vepřo-knedlo-zelo, ale já doporučuji bramboráky."},
    {h: "Co v nich je", t: "Strouhané syrové brambory, mouka, vejce, česnek, majoránka; smažené dozlatova."},
    {h: "Kdy se jedí", t: "Dříve jídlo chudých, dnes na poutích a vánočních trzích."},
    {h: "Proč je mám rád(a) + závěr", t: "Babiččiny soboty, vůně česneku; výzva návštěvníkům."}
  ],
  model: `Potato pancakes: simple but delicious

If you ask a Czech person about traditional food, they'll probably mention roast pork with dumplings. But the dish I'd really like visitors to try is much simpler: bramboráky, or potato pancakes.

They're made from grated raw potatoes mixed with flour, eggs, garlic and a herb called marjoram. The mixture is fried in hot oil until the pancakes are golden and crispy on the outside but soft inside. Some people eat them on their own, while others add sour cream or even sauerkraut.

In the past, potato pancakes were food for poor families, because potatoes were cheap. Today they're popular everywhere, from village festivals to Christmas markets, where you can buy them straight from the pan.

For me, they're connected with family weekends. My grandmother always made a huge pile of them on Saturday afternoons, and the smell of garlic filled the whole house.

Hungry yet? If you visit the Czech Republic, don't leave without trying them. They're cheap, tasty and, to be honest, almost impossible to stop eating!`,
  callouts: [
    {q: "But the dish I'd really like visitors to try is much simpler", tag: "contrast", cz: "Úvod staví do kontrastu známé jídlo a to, které doporučuješ – zaujme."},
    {q: "They're made from grated raw potatoes", tag: "passive", cz: "be made from – trpný rod pro popis receptu."},
    {q: "The mixture is fried in hot oil until the pancakes are golden and crispy", tag: "passive", cz: "Trpný rod + until – postup přípravy krok za krokem."},
    {q: "where you can buy them straight from the pan", tag: "relative", cz: "where ve vztažné větě o místě."},
    {q: "don't leave without trying them", tag: "gerund", cz: "without + -ing; přímá rada čtenáři na konci článku."}
  ]},

 {id: "a08", type: "article", register: "neutral", title: "Article: small changes for the environment",
  prompt: "You see this announcement in your school's English-language magazine.",
  notice: "Going green\n\nWhat small changes can young people make in their everyday lives to help the environment? Do you think these changes really make a difference?\n\nWrite an article for our next issue.",
  require: ["describe small changes young people can make", "say whether you think these changes really make a difference"],
  instruction: "Write your article.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Klimatická změna – jak může jeden teenager zachránit planetu?"},
    {h: "Malé změny", t: "Pěšky/na kole do školy, vlastní láhev, zhasínání, oblečení z druhé ruky."},
    {h: "Mají smysl?", t: "Sám jeden člověk málo, ale miliony lidí hodně; vliv na rodinu (rodiče třídí kvůli mně)."},
    {h: "Závěr", t: "Nečekat na ostatní – začni jednou změnou tento týden."}
  ],
  model: `Small steps, big difference?

When we hear about climate change, it's easy to feel that there's nothing we can do. After all, how can one teenager save the planet? But I believe small changes matter more than we think.

There are lots of simple things young people can do every day. Instead of asking our parents for a lift, we can walk or cycle to school. We can carry a reusable water bottle rather than buying plastic ones, and we can switch off lights and chargers when we leave a room. Buying second-hand clothes is another easy step, and it's often cheaper too.

But do these changes really make a difference? On their own, perhaps not much. One person saving a few plastic bottles won't stop global warming. However, when millions of people change their habits, the effect is huge. Besides, young people can influence their families and friends. My parents only started recycling properly because I kept reminding them!

So let's stop waiting for someone else to solve the problem. Start with one small change this week – and see who follows you.`,
  callouts: [
    {q: "After all, how can one teenager save the planet?", tag: "question", cz: "Řečnická otázka vyjádří pochybnost, kterou pak článek vyvrátí."},
    {q: "Instead of asking our parents for a lift", tag: "gerund", cz: "instead of + -ing; ask for a lift = poprosit o svezení."},
    {q: "rather than buying plastic ones", tag: "reference", cz: "rather than + -ing; ones nahrazuje „bottles“."},
    {q: "But do these changes really make a difference?", tag: "question", cz: "Otázka ze zadání použitá jako uvedení odstavce – jasná organizace."},
    {q: "because I kept reminding them", tag: "gerund", cz: "keep + -ing = pořád něco dělat; osobní příklad na závěr argumentu."}
  ]},

 /* ===== EMAILS / LETTERS ===== */
 {id: "m01", type: "email", register: "informal", title: "Email: a friend's summer visit",
  prompt: "You have received this email from your English-speaking friend, Sam.",
  notice: "Guess what? My parents have said I can come and stay with you for a week in July! What's the weather usually like then, and what should I bring? Also, what would you like us to do while I'm there? Can't wait!\n\nSam",
  require: ["tell Sam about the weather in July", "advise Sam what to bring", "suggest what you could do together"],
  instruction: "Write your email.",
  scaffold: [
    {h: "Pozdrav + reakce", t: "Skvělá zpráva, rodina se těší."},
    {h: "Počasí + co přibalit", t: "Kolem 30 °C, ale odpolední bouřky → trička, opalovací krém, bunda, pohodlné boty."},
    {h: "Co budeme dělat", t: "Výlet do Prahy, kanoe u chaty prarodičů, letní párty fotbalového týmu."},
    {h: "Závěr", t: "Napiš, co bys chtěl; pošli let, vyzvedneme tě."}
  ],
  model: `Hi Sam,

That's brilliant news! I've already told my family, and they're really looking forward to meeting you too.

July is usually hot here – often around 30 degrees – so pack plenty of T-shirts, shorts and some sun cream. Having said that, we sometimes get big thunderstorms in the afternoon, so bring a light jacket as well. You'll also need comfortable trainers, because I'm planning to take you walking in the hills.

As for what we can do, I've got loads of ideas! We could spend a day in Prague – it's only an hour away by train – and see the castle and the old town. If the weather's good, we could also go canoeing on the river near my grandparents' cottage. It's great fun, even if you've never done it before. And of course, you have to come to my football team's summer party on the Saturday.

Let me know if there's anything special you'd like to do. Just send me your flight details when you've got them, and we'll pick you up from the airport.

See you soon!
Tomáš`,
  callouts: [
    {q: "That's brilliant news!", tag: "opening", cz: "Krátká reakce na zprávu – přirozený začátek neformálního e-mailu."},
    {q: "Having said that,", tag: "contrast", cz: "Having said that = na druhou stranu; přirozený neformální přechod."},
    {q: "As for what we can do,", tag: "linker", cz: "As for… = co se týče…; uvádí odpověď na další otázku z e-mailu."},
    {q: "even if you've never done it before", tag: "conditional", cz: "even if = i kdyby / i když; stažené tvary sedí do registru."},
    {q: "we'll pick you up from the airport", tag: "phrasal", cz: "pick somebody up = vyzvednout (autem)."}
  ]},

 {id: "m02", type: "email", register: "informal", title: "Email: advice about a weekend job",
  prompt: "You have received this email from your English-speaking friend, Alex.",
  notice: "I've been offered a weekend job at a café, but I'm worried it will affect my studies. Do you think I should take it? Have you ever had a job like this? Any tips would be great!\n\nAlex",
  require: ["say whether Alex should take the job", "tell Alex about your own experience", "give Alex some tips"],
  instruction: "Write your email.",
  scaffold: [
    {h: "Pozdrav + gratulace", t: "Díky za e-mail, gratulace k nabídce."},
    {h: "Rada: vzít to", t: "Kavárna o víkendu není náročná; vlastní peníze, noví lidé."},
    {h: "Moje zkušenost", t: "Pekárna každou sobotu; obavy, ale šlo to; volno před zkouškami."},
    {h: "Tipy + závěr", t: "Upřímnost k šéfovi, plánovat úkoly; přijdu na kafe."}
  ],
  model: `Hi Alex,

Thanks for your email – and congratulations on the job offer!

I think you should definitely take it. Working in a café at weekends isn't too demanding, and you'll earn your own money, which is a great feeling. You'll also meet lots of new people.

I know exactly how you feel, though. Last year I worked in a bakery every Saturday morning, and at first I was worried about my studies too. In the end, it was fine, because I still had Sundays and evenings free for homework. The only difficult time was just before exams, when I asked my boss for two weekends off. He was really understanding about it.

My main tip is to be honest with your boss from the start. Tell them that school comes first and that you can't work more than one day a week. Another tip is to plan your homework carefully, so you don't leave everything until Sunday night!

Anyway, let me know what you decide. If you take it, I'll come and have a coffee there – as long as you make it for me!

Best wishes,
Jana`,
  callouts: [
    {q: "I think you should definitely take it.", tag: "opinion", cz: "Jasná odpověď na první otázku hned na začátku odstavce."},
    {q: "which is a great feeling", tag: "relative", cz: "which odkazuje na celou předchozí myšlenku."},
    {q: "I know exactly how you feel, though.", tag: "contrast", cz: "though na konci věty = ale/přesto – typicky hovorové, do e-mailu ideální."},
    {q: "My main tip is to be honest with your boss from the start.", tag: "topic", cz: "Topic sentence uvádí odpověď na třetí otázku (tips)."},
    {q: "as long as you make it for me", tag: "conditional", cz: "as long as = pokud; vtipná osobní tečka na konci."}
  ]},

 {id: "m03", type: "email", register: "informal", title: "Email: weekends in your country",
  prompt: "You have received this email from your English-speaking friend, Emma.",
  notice: "I'm doing a project for school about how teenagers in different countries spend their weekends. What do you and your friends usually do? And is it different from what your parents did when they were young?\n\nThanks!\nEmma",
  require: ["describe what you and your friends usually do at weekends", "compare this with what your parents did when they were young"],
  instruction: "Write your email.",
  scaffold: [
    {h: "Pozdrav + reakce", t: "Rád(a) slyším; projekt zní zajímavě, pomůžu."},
    {h: "Naše víkendy", t: "Spánek, centrum, kavárna/kino, léto bazén a basketbal, neděle s rodinou a úkoly."},
    {h: "Víkendy rodičů", t: "Bez mobilů – domlouvání předem, čekání; víc venku, stanování, túry; méně nudy."},
    {h: "Závěr", t: "Snad to pomůže, pošli mi projekt."}
  ],
  model: `Hi Emma,

It was great to hear from you! Your project sounds really interesting, so I'm happy to help.

At weekends, my friends and I usually sleep late on Saturday – that's the best part! In the afternoon, we often meet in the town centre and have a coffee or go to the cinema. In summer, we spend most of our time at the swimming pool or play basketball in the park. On Sundays, I normally stay at home with my family and do my homework, although I often leave it until the evening.

I asked my parents what they did when they were my age, and it was quite different. They didn't have mobile phones, so they had to arrange to meet at a certain time and place – and if someone was late, they just waited! They also spent much more time outdoors, going camping or hiking with their friends. My dad says they got bored less often than we do, which is probably true.

I hope this helps. Good luck with the project, and send me a copy when it's finished!

Love,
Petra`,
  callouts: [
    {q: "Your project sounds really interesting, so I'm happy to help.", tag: "opening", cz: "Reakce na kamarádovu zprávu – e-mail působí jako skutečná odpověď."},
    {q: "although I often leave it until the evening", tag: "contrast", cz: "although uvnitř věty – drobná upřímná poznámka, která text oživí."},
    {q: "I asked my parents what they did when they were my age", tag: "tense", cz: "Nepřímá otázka (what they did) – žádná inverze, slovosled jako v oznamovací větě."},
    {q: "so they had to arrange to meet at a certain time and place", tag: "modal", cz: "had to = museli; arrange to meet = domluvit se na setkání."},
    {q: "they got bored less often than we do", tag: "comparison", cz: "Srovnání less often than; we do nahrazuje opakování slovesa."}
  ]},

 {id: "m04", type: "email", register: "informal", title: "Email: a language course in your town",
  prompt: "You have received this email from your English-speaking friend, Jamie.",
  notice: "I'm going to do a month-long language course in your town next spring! Do you think I should stay with a host family or in a student flat? And what's the best way to make friends there?\n\nJamie",
  require: ["recommend where Jamie should stay and explain why", "give advice on making friends"],
  instruction: "Write your email.",
  scaffold: [
    {h: "Pozdrav + reakce", t: "Skvělé zprávy, bude se ti tu líbit."},
    {h: "Kde bydlet", t: "Hostitelská rodina: každodenní jazyk, domácí jídlo; v bytě by mluvil anglicky."},
    {h: "Jak najít přátele", t: "Klub nebo sportovní tým, jazyková kavárna ve čtvrtek."},
    {h: "Závěr", t: "Seznámím tě s kamarády; napiš, kdy začíná kurz."}
  ],
  model: `Hi Jamie,

Great news about the course! You're going to love it here, I promise.

If I were you, I'd stay with a host family. A student flat might sound more fun, but you'd probably end up speaking English with the other students all the time. With a family, you'll have to use the language every day – at breakfast, at dinner and while watching TV together. You'll also get proper home-made food, which is much better than anything you'd cook yourself!

As for making friends, the easiest way is to join a club or a sports team. Lots of people here play volleyball or go climbing, and they're usually happy when someone new joins in. There's also a language café in the centre every Thursday, where locals and foreigners meet to practise languages. It's a really relaxed place, and I've met some of my best friends there.

And of course, you'll have me! I'll introduce you to my friends as soon as you arrive.

Let me know when your course starts.

Take care,
Martin`,
  callouts: [
    {q: "If I were you, I'd stay with a host family.", tag: "conditional", cz: "Klasická rada v kondicionálu 2. typu (If I were you…)."},
    {q: "you'd probably end up speaking English with the other students all the time", tag: "phrasal", cz: "end up + -ing = nakonec skončit tím, že…"},
    {q: "which is much better than anything you'd cook yourself", tag: "comparison", cz: "Vztažná věta + srovnání – vtipný, ale přesný argument."},
    {q: "where locals and foreigners meet to practise languages", tag: "relative", cz: "where ve vztažné větě o místě; practise (sloveso) se v britské angličtině píše s -s-."},
    {q: "as soon as you arrive", tag: "tense", cz: "Po as soon as (stejně jako po when/if) přítomný čas, i když jde o budoucnost."}
  ]},

 {id: "m05", type: "letter", register: "formal", title: "Letter of application: summer camp assistant",
  prompt: "You see this advertisement on an international website.",
  notice: "SUMMER CAMP ASSISTANTS WANTED\n\nWe are looking for friendly, energetic young people to help at our international summer camp for children aged 8–12 in July and August.\n\nWould you be good at organising games and activities? Do you have any experience of working with children? Which languages do you speak?\n\nWrite to Ms Laura Grant, the camp director, explaining why you would be suitable for the job.",
  require: ["say why you would be good at organising games and activities", "describe your experience of working with children", "say which languages you speak"],
  instruction: "Write your letter of application.",
  scaffold: [
    {h: "Oslovení + účel", t: "Dear Ms Grant – žádám o místo, kde jsem inzerát viděl(a), kdo jsem."},
    {h: "Hry a aktivity", t: "Kreativní, energický/á; skaut – venkovní hry, soutěže, večery u ohně."},
    {h: "Zkušenost s dětmi", t: "Dobrovolník na příměstském táboře, skupina 10 dětí, řešení hádek a stesku."},
    {h: "Jazyky + závěr", t: "Čeština, plynulá angličtina, základy němčiny; reference; Yours sincerely."}
  ],
  model: `Dear Ms Grant,

I am writing to apply for the position of summer camp assistant, which I saw advertised on your website. I am eighteen years old and I have just finished secondary school in the Czech Republic.

I believe I would be good at organising games and activities because I am creative and full of energy. For the last two years, I have been a member of a scout group, where I have planned outdoor games, sports competitions and evening activities around the campfire.

I also have some experience of working with children. Last summer, I worked as a volunteer at a day camp in my town, looking after a group of ten children aged seven to ten. I learned how to keep them interested and how to deal with small problems, such as arguments or homesickness.

As for languages, Czech is my first language and I speak English fluently. I also have a basic knowledge of German.

I would be happy to provide references if necessary. I look forward to hearing from you.

Yours sincerely,
Klára Svobodová`,
  callouts: [
    {q: "I am writing to apply for the position of summer camp assistant, which I saw advertised on your website.", tag: "opening", cz: "Účel dopisu v první větě + kde jsi inzerát viděl(a)."},
    {q: "For the last two years, I have been a member of a scout group", tag: "tense", cz: "Předpřítomný čas s for – zkušenost, která trvá dodnes."},
    {q: "I also have some experience of working with children.", tag: "topic", cz: "experience (nepočitatelné) of + -ing; topic sentence odpovídá na druhou otázku inzerátu."},
    {q: "how to deal with small problems, such as arguments or homesickness", tag: "example", cz: "Konkrétní příklady posilují tvrzení – zkoušející je ocení víc než obecná slova."},
    {q: "I look forward to hearing from you.", tag: "closing", cz: "look forward to + -ing; Dear Ms Grant → Yours sincerely."}
  ]},

 {id: "m06", type: "letter", register: "formal", title: "Letter of application: marathon volunteer",
  prompt: "You see this advertisement in your local English-language newspaper.",
  notice: "VOLUNTEERS NEEDED – CITY MARATHON\n\nWe need volunteers to help on the day of our international marathon in May. Tasks include giving information to runners and visitors, handing out water and helping at the finish line.\n\nTell us why you would like to help, what skills you could bring and whether you have done any voluntary work before.\n\nApply to: Mr David Hall, Volunteer Coordinator",
  require: ["explain why you would like to help", "describe the skills you could bring", "say whether you have done voluntary work before"],
  instruction: "Write your letter of application.",
  scaffold: [
    {h: "Oslovení + účel", t: "Dear Mr Hall – reaguji na inzerát, rád(a) pomůžu."},
    {h: "Proč chci pomoci", t: "Sám/sama běhám; loni půlmaraton – podpora dobrovolníků pro mě hodně znamenala."},
    {h: "Dovednosti", t: "Přátelský/á, klidný/á v davu, angličtina a španělština, práce venku."},
    {h: "Zkušenost + závěr", t: "Na sportovní akci ne, ale dny otevřených dveří ve škole; dostupnost; Yours sincerely."}
  ],
  model: `Dear Mr Hall,

I am writing in response to your advertisement for volunteers for the city marathon in May. I would be very glad to help on the day of the race.

I have been a keen runner for several years, and last year I took part in the half marathon myself. I remember how much the volunteers' support meant to me, especially in the last few kilometres, so I would love to give something back to the event.

I believe I have several useful skills. I am friendly and calm, even when there are a lot of people around, and I speak English and Spanish as well as Czech, which would allow me to help foreign runners and visitors. I am also used to working outdoors in all kinds of weather.

Although I have not volunteered at a sports event before, I have helped at our school's open days for the past two years, giving information to parents and showing them around the building.

I would be available for the whole day. Thank you for considering my application.

Yours sincerely,
Ondřej Král`,
  callouts: [
    {q: "I am writing in response to your advertisement", tag: "opening", cz: "Formální otevření – hned je jasné, na co reaguješ."},
    {q: "I have been a keen runner for several years", tag: "tense", cz: "Předpřítomný čas s for; keen runner = nadšený běžec."},
    {q: "so I would love to give something back to the event", tag: "phrasal", cz: "give something back = oplatit, vrátit něco zpět – silná motivace."},
    {q: "I am also used to working outdoors in all kinds of weather.", tag: "gerund", cz: "be used to + -ing = být zvyklý (ne used to + infinitiv = dříve)."},
    {q: "Although I have not volunteered at a sports event before", tag: "contrast", cz: "Upřímně přiznáš chybějící zkušenost a hned ji vyvážíš jinou – odpověď na třetí otázku."}
  ]},

 {id: "m07", type: "email", register: "formal", title: "Email: complaint about a day trip",
  prompt: "You recently went on a day trip with a company called Highlights Tours. You saw this advertisement before you booked, but the trip was disappointing. Write an email to the manager of the company explaining what went wrong and saying what you would like the company to do.",
  notice: "HIGHLIGHTS TOURS – Castle and Lake Day Trip\n\n• Comfortable air-conditioned coach\n• Guided tour of the castle in English\n• Two-course lunch at a lakeside restaurant\n• Back in the city by 6 p.m.",
  require: ["explain what was wrong with the trip compared with the advertisement", "say what you would like the company to do"],
  instruction: "Write your email.",
  scaffold: [
    {h: "Oslovení + účel", t: "Dear Sir or Madam – stížnost na výlet, datum."},
    {h: "Doprava a prohlídka", t: "Bez klimatizace při 30 °C; prohlídka jen německy."},
    {h: "Oběd a návrat", t: "Sendvič v autobuse místo oběda; návrat ve 20:30 → ujel vlak, taxi."},
    {h: "Požadavek + závěr", t: "Vrácení poloviny ceny + taxi; Yours faithfully."}
  ],
  model: `Dear Sir or Madam,

I am writing to complain about the Castle and Lake day trip which I went on with your company last Saturday, 14 June.

Unfortunately, the trip was very different from what your advertisement promised. Firstly, the coach was not air-conditioned, and as it was over 30 degrees that day, the two-hour journey was extremely uncomfortable. Secondly, the guided tour of the castle was only available in German, so I could hardly understand anything.

The lunch was also disappointing. Instead of a two-course meal at a lakeside restaurant, we were given a sandwich and a bottle of water, which we had to eat on the coach. Finally, we did not arrive back in the city until 8.30 p.m. As a result, I missed my train home and had to pay for a taxi.

I paid 65 euros for this trip, and I feel that I did not receive the service I paid for. I would therefore like you to refund half of the price, as well as the cost of my taxi, which was 20 euros.

I look forward to your reply.

Yours faithfully,
Lucie Dvořáková`,
  callouts: [
    {q: "I am writing to complain about", tag: "opening", cz: "Účel stížnosti v první větě – formální a jasné."},
    {q: "the trip was very different from what your advertisement promised", tag: "comparison", cz: "different from what… – přímo srovnává realitu s inzerátem ze zadání."},
    {q: "we were given a sandwich and a bottle of water", tag: "passive", cz: "Trpný rod – soustředí se na to, co se stalo, ne kdo to udělal."},
    {q: "we did not arrive back in the city until 8.30 p.m.", tag: "tense", cz: "not… until = až v; věcný údaj místo emocí."},
    {q: "I would therefore like you to refund half of the price", tag: "recommend", cz: "Zdvořilý, ale jasný požadavek – druhý bod zadání."}
  ]},

 {id: "m08", type: "email", register: "formal", title: "Email: the sports centre's new opening hours",
  prompt: "You are a member of your local sports centre. The centre has recently changed its opening hours, and many young members are unhappy. Write an email to the manager, Mrs Collins, explaining how the change has affected young members and suggesting what the centre could do.",
  notice: "NEW OPENING HOURS from 1 September\n\nMonday–Friday: 8 a.m. – 6 p.m.\nSaturday: 9 a.m. – 1 p.m.\nSunday: closed",
  require: ["explain how the new opening hours affect young members", "suggest what the centre could do"],
  instruction: "Write your email.",
  scaffold: [
    {h: "Oslovení + účel", t: "Dear Mrs Collins – píšu za skupinu mladých členů kvůli novým hodinám."},
    {h: "Dopad na mladé", t: "Škola končí 15:30, kroužky a brigády; zavírá se v 18:00, víkendy skoro zavřeno."},
    {h: "Důsledky", t: "Zrušená členství, přechod do soukromé posilovny."},
    {h: "Návrhy + závěr", t: "2–3 dny do 21:00, nebo neděle odpoledne; poděkování; Yours sincerely."}
  ],
  model: `Dear Mrs Collins,

I am writing on behalf of a group of young members of the sports centre about the new opening hours that were introduced on 1 September.

While I understand that the centre needs to reduce its costs, the new hours have made it very difficult for students like us to use the facilities. Most of us finish school at around half past three, and many have other activities or part-time jobs in the afternoon. As the centre now closes at 6 p.m. on weekdays, we can only visit for a short time, if at all. The weekends are not much better, since the centre is closed on Sundays.

As a result, several of my friends have already cancelled their membership, and others are thinking of joining a private gym instead.

I would like to suggest that the centre stays open until at least 9 p.m. on two or three weekdays. Alternatively, it could open on Sunday afternoons, when many families and young people have free time.

Thank you for considering our suggestions. I look forward to hearing from you.

Yours sincerely,
Adam Novák`,
  callouts: [
    {q: "I am writing on behalf of a group of young members", tag: "opening", cz: "on behalf of = jménem (někoho) – hned víme, kdo píše a proč."},
    {q: "the new opening hours that were introduced on 1 September", tag: "passive", cz: "Vztažná věta s trpným rodem – věcný popis změny."},
    {q: "While I understand that the centre needs to reduce its costs", tag: "contrast", cz: "Ústupka (While I understand…) – zdvořilý tón, který stížnost posílí."},
    {q: "we can only visit for a short time, if at all", tag: "collocation", cz: "if at all = pokud vůbec – přesné a přirozené."},
    {q: "I would like to suggest that the centre stays open until at least 9 p.m.", tag: "recommend", cz: "suggest that + věta – konkrétní návrh (druhý bod zadání)."}
  ]},

 /* ===== REPORTS ===== */
 {id: "r01", type: "report", register: "neutral", title: "Report: the school canteen",
  prompt: "The principal of your school wants to improve the school canteen and has asked students for their opinions. Write a report for the principal describing what students like and dislike about the canteen and recommending one or two changes.",
  require: ["describe what students like about the canteen", "describe what students dislike", "recommend one or two changes"],
  instruction: "Write your report.",
  scaffold: [
    {h: "Introduction", t: "Účel reportu + dotazník mezi 40 studenty."},
    {h: "What students like", t: "Ceny, milý personál, ovoce, salátový bar."},
    {h: "What students dislike", t: "Dlouhé fronty (až 20 min), stále stejné menu, jen jedno vegetariánské jídlo."},
    {h: "Recommendations", t: "Dvě obědové přestávky; hlasování o nových jídlech jednou měsíčně."}
  ],
  model: `Report on the school canteen

Introduction
The aim of this report is to describe what students think of the school canteen and to suggest some improvements. I asked 40 students from different classes to complete a short questionnaire.

What students like
Most students are happy with the prices, which they consider reasonable. They also appreciate the friendly staff and the fact that fresh fruit is always available. The salad bar, which was introduced last year, is especially popular with older students.

What students dislike
The main complaint is the long queue at lunchtime. Many students said they wait for up to twenty minutes and then have very little time to eat. Another problem is that the menu rarely changes, and there is usually only one vegetarian option.

Recommendations
I would recommend introducing two separate lunch breaks for younger and older classes, which would reduce the queues. In addition, the canteen could ask students to vote for new dishes once a month. This would make the menu more varied and show everyone that their opinions matter.`,
  callouts: [
    {q: "The aim of this report is to describe", tag: "opening", cz: "Standardní úvod reportu – účel hned v první větě."},
    {q: "I asked 40 students from different classes to complete a short questionnaire.", tag: "example", cz: "Zdroj informací – konvence reportu, díky které působí věrohodně."},
    {q: "which was introduced last year", tag: "passive", cz: "Vztažná věta s trpným rodem."},
    {q: "Many students said they wait for up to twenty minutes", tag: "quantity", cz: "Many students said… – názory respondentů místo vlastních emocí."},
    {q: "I would recommend introducing two separate lunch breaks", tag: "recommend", cz: "recommend + -ing; doporučení přímo řeší zjištěný problém (fronty)."}
  ]},

 {id: "r02", type: "report", register: "neutral", title: "Report: free-time facilities for young people",
  prompt: "An English-language website about your town has asked you to write a report on what there is for young people to do in their free time. Your report should describe the facilities that are available, say which are the most popular and suggest what else could be provided.",
  require: ["describe the facilities that are available", "say which are the most popular", "suggest what else could be provided"],
  instruction: "Write your report.",
  scaffold: [
    {h: "Introduction", t: "Co report popisuje + zdroj (vlastní zkušenost, rozhovory s kamarády)."},
    {h: "Available facilities", t: "Bazén, sportovní hala, hřiště, kino, klub mládeže, knihovna."},
    {h: "Most popular places", t: "Bazén nejvíc, kino o víkendech (drahé), klub mládeže málo známý."},
    {h: "Suggestions", t: "Skatepark; propagace klubu na sociálních sítích."}
  ],
  model: `Free-time facilities for young people in Kolín

Introduction
This report describes what there is for young people to do in Kolín in their free time. It is based on my own experience and on conversations with friends of different ages.

Available facilities
The town has a modern swimming pool, a sports hall and several football pitches, as well as a small cinema. There is also a youth club, which organises film nights and workshops, and a public library with a quiet study room.

Most popular places
The swimming pool is by far the most popular place, especially in summer when the outdoor pool is open. The cinema is also busy at weekends, although many teenagers complain that tickets are quite expensive. The youth club, on the other hand, is not very well known, and few people use it.

Suggestions
In my opinion, the town would benefit from a skatepark, as many young people currently skate in the main square, which causes problems for pedestrians. It would also be a good idea to advertise the youth club on social media, so that more teenagers find out about its activities.`,
  callouts: [
    {q: "It is based on my own experience and on conversations with friends of different ages.", tag: "passive", cz: "be based on – zdroj informací v úvodu reportu."},
    {q: "The swimming pool is by far the most popular place", tag: "comparison", cz: "by far + 3. stupeň = zdaleka nej…"},
    {q: "although many teenagers complain that tickets are quite expensive", tag: "contrast", cz: "although uvnitř věty – vyvážené zjištění."},
    {q: "the town would benefit from a skatepark", tag: "recommend", cz: "benefit from = mít prospěch z – přirozený způsob, jak něco navrhnout."},
    {q: "so that more teenagers find out about its activities", tag: "phrasal", cz: "so that = aby; find out about = dozvědět se o."}
  ]},

 {id: "r03", type: "report", register: "neutral", title: "Report: a class trip",
  prompt: "Your class recently went on a three-day trip to another city. Your teacher has asked you to write a report about the trip. In your report, you should say what went well, mention any problems and recommend whether the school should organise the same trip next year.",
  require: ["say what went well", "mention any problems", "recommend whether the trip should be repeated"],
  instruction: "Write your report.",
  scaffold: [
    {h: "Introduction", t: "Účel: zhodnotit třídenní výlet do Vídně a doporučit, zda ho opakovat."},
    {h: "What went well", t: "Hostel blízko centra, zábavná prohlídka, vědecké muzeum, volné večery."},
    {h: "Problems", t: "Zpožděný vlak, zmeškaná první aktivita; nabitý druhý den."},
    {h: "Recommendation", t: "Ano, ale méně aktivit za den a dřívější vlak."}
  ],
  model: `Report on the class trip to Vienna

Introduction
The purpose of this report is to evaluate our class trip to Vienna in April and to recommend whether it should be repeated next year.

What went well
Overall, the trip was a great success. The hostel was clean, comfortable and close to the city centre, so we could walk to most places. The guided tour of the old town was informative and fun, and almost everyone said that the visit to the science museum was the highlight of the trip. Students also enjoyed having some free time in the evenings.

Problems
There were, however, a few problems. Because of a delay, the train arrived too late for the first planned activity. In addition, several students felt that the programme on the second day was too full, as we visited three museums without a proper break.

Recommendation
I would strongly recommend organising the same trip next year. However, it would be better to plan fewer activities each day and to book an earlier train, so that there is more time to relax and enjoy the city.`,
  callouts: [
    {q: "to recommend whether it should be repeated next year", tag: "passive", cz: "Modální sloveso + trpný rod; úvod přímo kopíruje úkoly ze zadání."},
    {q: "Overall, the trip was a great success.", tag: "topic", cz: "Shrnující topic sentence na začátku sekce."},
    {q: "was the highlight of the trip", tag: "collocation", cz: "the highlight of = vrchol, nejlepší část."},
    {q: "There were, however, a few problems.", tag: "contrast", cz: "however uprostřed věty – plynulý přechod k problémům."},
    {q: "it would be better to plan fewer activities each day", tag: "recommend", cz: "Doporučení navázané na zjištěný problém (nabitý program)."}
  ]},

 {id: "r04", type: "report", register: "neutral", title: "Report: after-school clubs",
  prompt: "Your school offers several after-school clubs. The head teacher wants to know how popular they are and whether any new clubs should be started. Write a report describing the current clubs, explaining why some are more popular than others and suggesting a new club.",
  require: ["describe the current clubs", "explain why some clubs are more popular than others", "suggest a new club"],
  instruction: "Write your report.",
  scaffold: [
    {h: "Introduction", t: "Co report řeší + průzkum mezi 60 studenty."},
    {h: "Current clubs", t: "Fotbal, divadlo, šachy, fotografie – jednou týdně."},
    {h: "Popularity", t: "Fotbal (aktivní, společenský), divadlo (představení); šachy a foto: neví se o nich, začínají pozdě."},
    {h: "Suggestion", t: "Kroužek vaření v pátek; lepší propagace na začátku roku."}
  ],
  model: `After-school clubs

Introduction
This report looks at the after-school clubs currently offered at our school, explains why some are more successful than others and suggests a new club. The information comes from a survey completed by 60 students.

Current clubs
At present, the school runs four clubs: football, drama, chess and photography. Each of them meets once a week after lessons.

Popularity
The football club is the most popular by far, with more than twenty regular members. Students say they like it because it is active and sociable. The drama club is also well attended, mainly because the members put on a show at the end of the year. By contrast, the chess and photography clubs have very few members. Many students said they did not even know these clubs existed, while others complained that they start too late in the afternoon.

Suggestion
Almost half of the students said they would join a cooking club. I therefore recommend starting one, perhaps using the school kitchen on Friday afternoons. It would also be useful to advertise all the clubs more clearly at the start of the school year.`,
  callouts: [
    {q: "The information comes from a survey completed by 60 students.", tag: "passive", cz: "Zkrácená trpná vazba (a survey completed by…) – úsporné a věcné."},
    {q: "with more than twenty regular members", tag: "quantity", cz: "Konkrétní čísla dělají report přesvědčivým."},
    {q: "because the members put on a show at the end of the year", tag: "phrasal", cz: "put on a show = uspořádat představení; vysvětluje, PROČ je klub oblíbený."},
    {q: "By contrast, the chess and photography clubs have very few members.", tag: "contrast", cz: "By contrast – jasné srovnání oblíbených a neoblíbených kroužků."},
    {q: "Almost half of the students said they would join a cooking club.", tag: "quantity", cz: "Návrh opřený o data z průzkumu."}
  ]},

 {id: "r05", type: "report", register: "neutral", title: "Report: a day in your town for visiting students",
  prompt: "A group of English students is going to spend a day in your town next month. The teacher in charge has asked you to write a report suggesting places to visit, where the group could eat and how they could get around.",
  require: ["suggest places to visit", "recommend where the group could eat", "explain how they could get around"],
  instruction: "Write your report.",
  scaffold: [
    {h: "Introduction", t: "Účel: návrh programu na den v Olomouci."},
    {h: "Places to visit", t: "Náměstí s orlojem a věží radnice, botanická zahrada; za deště vědecké muzeum."},
    {h: "Where to eat", t: "Levné restaurace u univerzity, studentská menu; tvarůžky s varováním."},
    {h: "Getting around + Conclusion", t: "Centrum pěšky, tramvaje, denní jízdenka; shrnutí."}
  ],
  model: `A day in Olomouc

Introduction
The aim of this report is to suggest how a group of English students could spend an enjoyable day in Olomouc. It covers places to visit, places to eat and transport.

Places to visit
The best place to start is the main square, where the group can see the astronomical clock and climb the town hall tower for a great view. After that, I would recommend the botanical garden, which is free and very popular with young people. If the weather is bad, the science museum is an excellent alternative.

Where to eat
For lunch, there are several cheap restaurants near the university that offer student menus for about 150 crowns. Students who want to try local food should order the famous Olomouc cheese – although they should be warned that it has a very strong smell!

Getting around
The city centre is small, so most places can be reached on foot. For longer distances, trams are frequent and cheap, and a day ticket costs less than 100 crowns.

Conclusion
Olomouc has plenty to offer, and a day there should be both interesting and relaxing.`,
  callouts: [
    {q: "It covers places to visit, places to eat and transport.", tag: "opening", cz: "Úvod vyjmenuje, co report obsahuje – stejné body jako zadání."},
    {q: "where the group can see the astronomical clock", tag: "relative", cz: "where ve vztažné větě o místě."},
    {q: "although they should be warned that it has a very strong smell", tag: "passive", cz: "Modální sloveso + trpný rod; vtipná, ale užitečná rada."},
    {q: "most places can be reached on foot", tag: "passive", cz: "can be reached – trpný rod, typický pro praktické informace."},
    {q: "Olomouc has plenty to offer", tag: "closing", cz: "Krátký závěr, který shrne celkový dojem."}
  ]},

 {id: "r06", type: "report", register: "neutral", title: "Report: the school library",
  prompt: "Your school library is going to be modernised. The librarian has asked you to write a report explaining how students use the library at the moment, what problems there are and what changes would make it more useful.",
  require: ["explain how students use the library at present", "describe any problems", "suggest changes that would make it more useful"],
  instruction: "Write your report.",
  scaffold: [
    {h: "Introduction", t: "Pro koho a proč report je + rozhovory se studenty ze všech ročníků."},
    {h: "Current use", t: "Přestávky a volné hodiny, úkoly a opakování; málo půjčování; počítače hlavně na tisk."},
    {h: "Problems", t: "Málo místa (5 stolů), pomalé počítače, staré knihy."},
    {h: "Recommendations", t: "Víc stolů a pohodlných židlí, notebooky k zapůjčení, studenti vybírají nové knihy."}
  ],
  model: `Report on the school library

Introduction
This report has been written for the librarian. Its purpose is to explain how students use the library at present, to describe the main problems and to suggest some changes. It is based on interviews with students from all year groups.

Current use
Most students visit the library during breaks or free lessons. They mainly use it as a quiet place to do homework or revise for tests, and only a small number borrow books regularly. The computers are used mostly for printing.

Problems
The biggest problem is the lack of space. There are only five tables, so it is often impossible to find somewhere to sit. Students also complained that the computers are slow and that many of the books are out of date.

Recommendations
Firstly, I suggest replacing some of the old bookshelves with more tables and comfortable chairs. Secondly, the library should buy new laptops that students can borrow. Finally, it would be a good idea to ask students which new books they would like the library to order, as this would encourage more of them to read.`,
  callouts: [
    {q: "This report has been written for the librarian.", tag: "passive", cz: "Trpný rod v předpřítomném čase – neosobní začátek reportu."},
    {q: "only a small number borrow books regularly", tag: "quantity", cz: "Kvantifikace (most, only a small number) místo „some people“."},
    {q: "The biggest problem is the lack of space.", tag: "topic", cz: "Topic sentence jmenuje hlavní problém, zbytek odstavce ho dokládá."},
    {q: "I suggest replacing some of the old bookshelves", tag: "recommend", cz: "suggest + -ing (nikdy suggest to)."},
    {q: "which new books they would like the library to order", tag: "gerund", cz: "would like + někdo + to-infinitiv; nepřímá otázka bez inverze."}
  ]},

 {id: "r07", type: "report", register: "neutral", title: "Report: a charity sports day",
  prompt: "Last month your school organised a charity sports day to raise money for a local children's hospital. Write a report for the school website describing the event, saying how successful it was and suggesting how it could be improved next time.",
  require: ["describe the event", "say how successful it was", "suggest how it could be improved"],
  instruction: "Write your report.",
  scaffold: [
    {h: "Introduction", t: "Kdy, proč (dětské oddělení nemocnice), účel reportu."},
    {h: "The event", t: "Běh, fotbal studenti vs. učitelé, hry pro děti, koláče a limonáda, kapela."},
    {h: "How successful was it?", t: "400 lidí, přes 45 000 Kč, vítězství studentů 4:2, přání tradice."},
    {h: "Suggestions", t: "Málo jídla a stínu → víc jídla, stany, dřívější propagace."}
  ],
  model: `Charity sports day

Introduction
On 12 May, our school organised a charity sports day to raise money for the children's ward at the city hospital. The aim of this report is to describe the event, assess its success and suggest improvements for next year.

The event
The day included a fun run, a football match between students and teachers and a range of games for younger children. Students also sold home-made cakes and lemonade, and a local band played in the afternoon.

How successful was it?
The event was a great success. Around 400 people came, including many parents and former students, and we raised over 45,000 crowns. Everyone particularly enjoyed the football match, which the students won 4–2. Several visitors said they hoped the event would become a tradition.

Suggestions
However, there were a couple of problems. The cake stall sold out by midday, and there was not enough shade when it became very hot. Next year, I would recommend preparing more food and drink and hiring a few large tents. It would also be a good idea to advertise the event earlier.`,
  callouts: [
    {q: "to raise money for the children's ward", tag: "collocation", cz: "raise money for = vybírat peníze na."},
    {q: "How successful was it?", tag: "heading", cz: "Nadpis sekce může být i otázka – odpovídá přesně druhému bodu zadání."},
    {q: "Around 400 people came, including many parents and former students", tag: "quantity", cz: "Konkrétní čísla dokládají úspěch akce."},
    {q: "Several visitors said they hoped the event would become a tradition.", tag: "tense", cz: "Nepřímá řeč s posunem času (hoped… would)."},
    {q: "I would recommend preparing more food and drink and hiring a few large tents", tag: "recommend", cz: "recommend + dvě -ing formy; návrhy řeší oba zmíněné problémy."}
  ]},

 {id: "r08", type: "report", register: "neutral", title: "Report: technology in lessons",
  prompt: "Your English teacher has asked you to write a report on how technology is used in lessons at your school. In your report, you should describe how technology is used at present, say what students find most useful and suggest how its use could be improved.",
  require: ["describe how technology is used at present", "say what students find most useful", "suggest how its use could be improved"],
  instruction: "Write your report.",
  scaffold: [
    {h: "Introduction", t: "Účel + rozhovory se studenty tří tříd."},
    {h: "Current situation", t: "Interaktivní tabule, telefony na slovníky a kvízy, úkoly přes online platformu."},
    {h: "What students find useful", t: "Online kvízy (zábava, paměť), platforma (úkoly kdykoli, nic se neztratí)."},
    {h: "Suggestions", t: "Krátká školení pro učitele, lepší Wi-Fi."}
  ],
  model: `The use of technology in our lessons

Introduction
The aim of this report is to describe how technology is currently used in lessons at our school, to identify what students find most helpful and to make some suggestions. I spoke to students in three different classes.

Current situation
All classrooms have an interactive whiteboard, and most teachers use it to show presentations and videos. Students are allowed to use their phones in some lessons, for example to look up words or take part in online quizzes. Homework is usually set and handed in through an online platform.

What students find useful
Nearly everyone agreed that the online quizzes make lessons more enjoyable and help them remember new information. Students also find the online platform practical, as they can check their homework at any time.

Suggestions
However, some teachers rarely use technology, and many students feel that it is not used as well as it could be. It would therefore be helpful to offer teachers short training sessions. In addition, I suggest that the school should improve the Wi-Fi, which is very slow in some classrooms.`,
  callouts: [
    {q: "Students are allowed to use their phones in some lessons", tag: "passive", cz: "be allowed to = smět; trpný rod popisuje pravidla."},
    {q: "to look up words or take part in online quizzes", tag: "phrasal", cz: "look up = vyhledat (slovo); take part in = zúčastnit se."},
    {q: "Homework is usually set and handed in through an online platform.", tag: "passive", cz: "Dvě trpné konstrukce (set, handed in) – věcný popis procesu."},
    {q: "Nearly everyone agreed that", tag: "quantity", cz: "Kvantifikace názoru respondentů – typické pro report."},
    {q: "I suggest that the school should improve the Wi-Fi", tag: "recommend", cz: "suggest that + (should) – konkrétní doporučení."}
  ]},

 /* ===== REVIEWS ===== */
 {id: "v01", type: "review", register: "neutral", title: "Review: a film you could watch again and again",
  prompt: "You see this announcement on an English-language film website.",
  notice: "Reviews wanted!\n\nA FILM I COULD WATCH AGAIN AND AGAIN\n\nTell us about a film that you have enjoyed watching more than once. What is it about, and why do you enjoy watching it again? Would you recommend it to other people?\n\nThe best reviews will be published on our website.",
  require: ["say what the film is about", "explain why you enjoy watching it again", "say whether you would recommend it"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Název filmu, kolikrát jsem ho viděl(a), proč je pokaždé jiný."},
    {h: "O čem to je", t: "Čtyři teenageři cestují vlakem po Evropě; každý před něčím utíká."},
    {h: "Proč ho sleduji znovu", t: "Skuteční charaktery; detaily a nápovědy ke konci; soundtrack."},
    {h: "Doporučení", t: "Ne pro fanoušky akce, ale pro každého, kdo má rád příběhy o přátelství."}
  ],
  model: `The Last Summer Train – better every time

I first saw The Last Summer Train at the cinema three years ago, and since then I have watched it at least five times. It is one of those rare films that seems different every time you see it.

The film tells the story of four teenagers who travel across Europe by train after they finish school. At first, it looks like a simple road movie, but gradually we learn that each of them is running away from a secret.

So why do I keep watching it? First of all, the characters feel completely real. They argue, make mistakes and laugh at silly jokes, just like my friends. Secondly, there are lots of small details that you only notice the second or third time, such as clues about the ending that are hidden in early scenes. The soundtrack is also fantastic.

If you are looking for an action-packed blockbuster, this is not the film for you. However, I would highly recommend it to anyone who enjoys stories about friendship. Just make sure you have some tissues ready for the final scene!`,
  callouts: [
    {q: "It is one of those rare films that seems different every time you see it.", tag: "evaluative", cz: "one of those rare films that… – zajímavé hodnocení hned v úvodu."},
    {q: "The film tells the story of four teenagers who travel across Europe", tag: "relative", cz: "tells the story of + vztažná věta – krátký popis bez převyprávění děje."},
    {q: "So why do I keep watching it?", tag: "question", cz: "Otázka uvádí odpověď na druhý bod zadání."},
    {q: "clues about the ending that are hidden in early scenes", tag: "passive", cz: "Vztažná věta s trpným rodem – konkrétní důvod, proč se vyplatí film vidět znovu."},
    {q: "I would highly recommend it to anyone who enjoys stories about friendship", tag: "recommend", cz: "recommend to anyone who… – doporučení s cílovou skupinou."}
  ]},

 {id: "v02", type: "review", register: "neutral", title: "Review: a café popular with students",
  prompt: "You see this announcement in an English-language magazine for students.",
  notice: "Where do you like to eat?\n\nWe are looking for reviews of cafés and restaurants that are popular with young people. Tell us about the food, the atmosphere and the prices, and say whether you would recommend the place to other students.\n\nThe best reviews will be published next month.",
  require: ["describe the food", "describe the atmosphere", "comment on the prices", "say whether you would recommend it"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Café Fuego v Plzni u univerzity – rok otevřené, oblíbené."},
    {h: "Jídlo", t: "Malé menu, čerstvé, mexické; burrita, vegetariánské možnosti, domácí limonáda."},
    {h: "Atmosféra", t: "Barevné stěny, hudba, obsluhují studenti; minus: večer plno."},
    {h: "Ceny + doporučení", t: "Kolem 160 Kč, sleva 10 %; ano – přijď před sedmou."}
  ],
  model: `Café Fuego – great food at student prices

If you are looking for somewhere to eat with friends in Plzeň, Café Fuego is hard to beat. It opened about a year ago in a narrow street near the university, and it has quickly become one of the most popular places in town.

The menu is small, but everything on it is fresh and full of flavour. The café specialises in Mexican food, and I would particularly recommend the bean burritos, which are enormous. There are plenty of vegetarian options, and the home-made lemonade is delicious.

The atmosphere is relaxed and friendly. The walls are painted in bright colours, there is always good music playing, and most of the staff are students themselves. The only disadvantage is that it gets very busy in the evenings, so you may have to wait for a table.

The prices are another reason for its success. A main course costs around 160 crowns, and students get a ten per cent discount if they show their card.

All in all, I would definitely recommend Café Fuego to other students. Just try to arrive before seven!`,
  callouts: [
    {q: "Café Fuego is hard to beat", tag: "evaluative", cz: "hard to beat = těžko překonatelný – přirozená hodnoticí fráze."},
    {q: "it has quickly become one of the most popular places in town", tag: "tense", cz: "Předpřítomný čas – výsledek, který platí dnes."},
    {q: "everything on it is fresh and full of flavour", tag: "evaluative", cz: "Přesná slova o jídle místo „good“ a „tasty“ pořád dokola."},
    {q: "The only disadvantage is that it gets very busy in the evenings", tag: "contrast", cz: "Jedna výhrada dělá recenzi věrohodnou."},
    {q: "I would definitely recommend Café Fuego to other students.", tag: "recommend", cz: "Jasné doporučení – poslední bod zadání."}
  ]},

 {id: "v03", type: "review", register: "neutral", title: "Review: a book that would make a good film",
  prompt: "You see this announcement in an English-language magazine.",
  notice: "Book reviews wanted\n\nHave you read a book that you think would make a good film? Write a review of the book, saying what it is about and what you liked about it, and explain why you think it would work well as a film.\n\nWe will publish the best reviews in our next issue.",
  require: ["say what the book is about", "say what you liked about it", "explain why it would make a good film"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Název a autorka; nečtu moc, ale tuhle jsem přečetl(a) za dva dny."},
    {h: "O čem to je", t: "Nina u strýce na skotském ostrově, světla v moři, záhada a nebezpečí."},
    {h: "Co se mi líbilo", t: "Atmosféra (počasí, útesy, pláže), hlavní hrdinka."},
    {h: "Proč by byl dobrý film + doporučení", t: "Akční děj, krajina na plátně, konec; pro fanoušky záhad."}
  ],
  model: `The Island at the End of the Map by Hannah Cole

I am not usually a big reader, but I could not put this book down. I finished it in two days, and I have been recommending it to everyone ever since.

The story follows Nina, a sixteen-year-old girl who goes to stay with her uncle on a small island off the coast of Scotland. When strange lights start appearing in the sea at night, Nina and a local boy decide to find out what is happening. The more they discover, the more dangerous the situation becomes.

What I liked most was the atmosphere. The writer describes the wild weather, the cliffs and the lonely beaches so well that you feel as if you are there. Nina is also a great main character: brave and funny, but not perfect.

I think the book would work brilliantly as a film. It has an exciting plot with plenty of action, and the island would look amazing on a big screen.

I would recommend this book to anyone who likes mysteries and adventure. Read it before somebody makes the film!`,
  callouts: [
    {q: "I could not put this book down", tag: "phrasal", cz: "can't put a book down = nemůžu se od knihy odtrhnout."},
    {q: "I have been recommending it to everyone ever since", tag: "tense", cz: "Předpřítomný průběhový čas – opakovaná činnost až do teď."},
    {q: "The more they discover, the more dangerous the situation becomes.", tag: "comparison", cz: "The more…, the more… – čím víc…, tím víc; napínavý popis bez spoilerů."},
    {q: "so well that you feel as if you are there", tag: "evaluative", cz: "so… that a as if – konkrétní důvod, proč se kniha líbí."},
    {q: "the island would look amazing on a big screen", tag: "conditional", cz: "would – odpověď na třetí bod zadání (proč by byl dobrý film)."}
  ]},

 {id: "v04", type: "review", register: "neutral", title: "Review: an app you use regularly",
  prompt: "You see this announcement on an English-language technology website.",
  notice: "Apps you can't live without!\n\nWrite a review of an app that you use regularly. What does it do, what do you like and dislike about it, and who would you recommend it to?\n\nThe best reviews will be published on our website.",
  require: ["say what the app does", "say what you like and dislike about it", "say who you would recommend it to"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Ztrácel(a) jsem hodiny na mobilu, spolužák doporučil FocusFox."},
    {h: "Co aplikace dělá", t: "Časovač, liška usne; když odejdeš, probudí se; body na stavbu doupěte."},
    {h: "Co se mi líbí a nelíbí", t: "Studium jako hra, statistiky; minus: reklamy, placené funkce."},
    {h: "Doporučení", t: "Studentům, kteří se těžko soustředí."}
  ],
  model: `FocusFox: the app that stopped me wasting time

Like many students, I used to waste hours on my phone when I should have been studying. Then a classmate told me about FocusFox, and it has changed the way I work.

The idea is simple. Before you start studying, you set a timer and a little cartoon fox goes to sleep. If you leave the app to check social media, the fox wakes up and looks upset. After each session, you get points to build a home for your fox.

What I like most is that it turns studying into a kind of game. It sounds silly, but I really don't want to wake the fox up! The app also shows statistics, so you can see how many hours you have studied each week, which is very motivating.

On the negative side, the free version shows a lot of adverts, and some useful features are only available if you pay.

Overall, I would recommend FocusFox to any student who finds it hard to concentrate. It won't do your homework for you, but it will help you get started.`,
  callouts: [
    {q: "I used to waste hours on my phone when I should have been studying", tag: "modal", cz: "used to (dřívější zvyk) + should have been -ing (co jsem měl/a dělat)."},
    {q: "The idea is simple.", tag: "topic", cz: "Krátká topic sentence před popisem, jak aplikace funguje."},
    {q: "it turns studying into a kind of game", tag: "collocation", cz: "turn something into something = proměnit v."},
    {q: "On the negative side,", tag: "contrast", cz: "Uvádí výhrady – odpověď na „what you dislike“."},
    {q: "I would recommend FocusFox to any student who finds it hard to concentrate", tag: "recommend", cz: "recommend to + vztažná věta s find it hard to – přesná cílová skupina."}
  ]},

 {id: "v05", type: "review", register: "neutral", title: "Review: a TV series",
  prompt: "You see this announcement in an international magazine for young people.",
  notice: "TV series reviews\n\nWhich TV series would you recommend to people your age? Write a review telling us what the series is about, what makes it special and whether there is anything you don't like about it.\n\nThe best reviews will appear in our next issue.",
  require: ["say what the series is about", "explain what makes it special", "mention anything you don't like about it"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Station Nine – tři série za měsíc."},
    {h: "O čem to je", t: "Mladí záchranáři v Manchesteru; každý díl jiná nehoda + osobní životy."},
    {h: "Co je výjimečné", t: "Realistické (spolupráce se skutečnými záchranáři), herečka v roli Nadii."},
    {h: "Výhrady + doporučení", t: "Drsné scény (ne pro mladší), slabší 3. série; verdikt."}
  ],
  model: `Station Nine – gripping and moving

If you are looking for a new series to watch, I would definitely recommend Station Nine. I started watching it last winter, and I finished all three seasons in less than a month.

The series follows a team of young paramedics who work at a busy ambulance station in Manchester. Each episode deals with a different emergency, from car accidents to a baby being born in a lift, but there is also a longer story about the characters' private lives.

What makes the series special is that it feels very realistic. The writers worked with real paramedics, so you learn a lot about how the emergency services work. The acting is excellent, especially from the actress who plays Nadia, a new paramedic who doubts whether she is strong enough.

However, the series is not perfect. Some of the medical scenes are quite shocking, so it is not suitable for younger viewers, and the third season is weaker than the first two.

Overall, Station Nine is exciting, moving and often surprisingly funny. Once you start watching, you will not want to stop.`,
  callouts: [
    {q: "from car accidents to a baby being born in a lift", tag: "example", cz: "from… to… – konkrétní příklady místo obecného popisu."},
    {q: "Each episode deals with a different emergency", tag: "phrasal", cz: "deal with = zabývat se; stručný popis formátu seriálu."},
    {q: "What makes the series special is that it feels very realistic.", tag: "topic", cz: "Topic sentence přesně odpovídá na otázku ze zadání (what makes it special)."},
    {q: "However, the series is not perfect.", tag: "contrast", cz: "Krátká věta uvádí výhrady – třetí bod zadání."},
    {q: "Once you start watching, you will not want to stop.", tag: "closing", cz: "Once + přítomný čas – úderný závěr, který funguje jako doporučení."}
  ]},

 {id: "v06", type: "review", register: "neutral", title: "Review: a concert",
  prompt: "You see this announcement on an English-language music website.",
  notice: "Live music reviews\n\nHave you been to a concert or music festival recently? Write a review for our website. Tell us about the performers, the atmosphere and the venue, and say whether the event was worth the money.",
  require: ["describe the performers", "describe the atmosphere and the venue", "say whether the event was worth the money"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Konečně naživo moje oblíbená kapela – nezklamala."},
    {h: "Účinkující", t: "Skoro dvě hodiny, hity i nové písně, zpěvačka a její historky."},
    {h: "Atmosféra a místo", t: "Open-air pódium u řeky, světla na vodě, zpívající dav; minus: fronta na pití."},
    {h: "Stálo to za ty peníze?", t: "900 Kč není málo, ale délka a atmosféra – ano; nenech si je ujít."}
  ],
  model: `The Paper Lanterns live at the Riverside Stage

Last Friday, I finally saw my favourite band, The Paper Lanterns, play live. I had been looking forward to it for months, and I was not disappointed.

The band played for almost two hours and performed all their best-known songs, as well as three new ones. The singer, Mia Rowe, has an amazing voice that sounded even better live than on their recordings. She also chatted to the audience between songs and told funny stories about how some of the songs were written.

The concert took place at the Riverside Stage, an open-air venue next to the river. As the sun went down, the lights on the water looked beautiful, and by the end of the evening the whole crowd was singing and dancing. The only problem was the long queue for drinks, which meant I missed part of one song.

Tickets cost 900 crowns, which is not cheap for a student. However, considering the length of the show and the incredible atmosphere, it was definitely worth the money. If The Paper Lanterns come to your town, don't miss them!`,
  callouts: [
    {q: "I had been looking forward to it for months", tag: "tense", cz: "Předminulý průběhový čas – těšení trvalo až do koncertu."},
    {q: "sounded even better live than on their recordings", tag: "comparison", cz: "even better… than – zesílené srovnání."},
    {q: "how some of the songs were written", tag: "passive", cz: "Nepřímá otázka s trpným rodem."},
    {q: "which meant I missed part of one song", tag: "relative", cz: "which meant… – vztažná věta vyjadřuje důsledek; drobná výhrada."},
    {q: "considering the length of the show and the incredible atmosphere", tag: "reason", cz: "considering = vzhledem k – zdůvodnění verdiktu „worth the money“."}
  ]},

 {id: "v07", type: "review", register: "neutral", title: "Review: a museum or tourist attraction",
  prompt: "You see this announcement on an English-language travel website.",
  notice: "Museums and attractions\n\nHave you visited a museum or tourist attraction recently? Write a review telling us what there is to see and do there, who it is most suitable for and whether anything could be improved.",
  require: ["describe what there is to see and do", "say who it is most suitable for", "say whether anything could be improved"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Discovery Mill – vědecké centrum ve starém mlýně, návštěva s bratranci."},
    {h: "Co se dá vidět a dělat", t: "Vše na vyzkoušení: tornádo, reakce, mlýnské kolo a elektřina, planetárium."},
    {h: "Pro koho", t: "Rodiny s dětmi 6–14 let; teenageři a dospělí také, i když část je pro menší."},
    {h: "Co zlepšit + doporučení", t: "Nefunkční stroje, malá drahá kavárna; verdikt."}
  ],
  model: `Discovery Mill – science you can touch

If you are looking for a day out that is both fun and educational, Discovery Mill is a great choice. This science centre is located in an old water mill on the edge of my town, and I visited it with my cousins last month.

Instead of looking at objects behind glass, visitors can try almost everything themselves. You can create a small tornado, test your reactions against a computer or find out how the mill's huge wheel produces electricity. There is also a planetarium, where short shows about the stars take place every hour.

The centre is ideal for families with children between about six and fourteen. My cousins, who are eight and eleven, did not want to leave! Teenagers and adults will also find it interesting, although some activities are designed for younger visitors.

A couple of things could be improved. Some machines were not working when we visited, and the café is small and rather expensive, so it is worth bringing your own snacks.

All in all, I would definitely recommend Discovery Mill, especially on a rainy afternoon.`,
  callouts: [
    {q: "both fun and educational", tag: "evaluative", cz: "both… and… – hodnocení dvěma přídavnými jmény."},
    {q: "This science centre is located in an old water mill", tag: "passive", cz: "be located in – trpná vazba pro polohu."},
    {q: "Instead of looking at objects behind glass", tag: "gerund", cz: "instead of + -ing – kontrast s klasickým muzeem."},
    {q: "The centre is ideal for families with children between about six and fourteen.", tag: "recommend", cz: "ideal for… – přesná cílová skupina (druhý bod zadání)."},
    {q: "so it is worth bringing your own snacks", tag: "gerund", cz: "it is worth + -ing; praktická rada čtenáři."}
  ]},

 {id: "v08", type: "review", register: "neutral", title: "Review: a website or video channel for learning",
  prompt: "You see this announcement in an English-language magazine for students.",
  notice: "Learning online\n\nIs there a website or video channel that has helped you to learn something? Write a review telling us what it offers, how it has helped you and whether you would recommend it to other learners.",
  require: ["say what the website or channel offers", "explain how it has helped you", "say whether you would recommend it"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Nadpis + úvod", t: "Dějepis byl nejhorší předmět – pak kanál History in a Hurry."},
    {h: "Co nabízí", t: "Desetiminutová videa od Egypta po pád Berlínské zdi, animace, mapy, kvízy."},
    {h: "Jak mi pomohl", t: "Chápu příčiny, ne jen data; nejlepší známka ve třídě."},
    {h: "Nevýhody + doporučení", t: "Moc rychlé, jen anglicky; doporučení + bonus pro angličtinu."}
  ],
  model: `History in a Hurry – my favourite study channel

History used to be my least favourite subject. There were too many dates to remember, and the textbook was really boring. That changed when a friend showed me History in a Hurry.

The channel offers ten-minute videos on topics from ancient Egypt to the fall of the Berlin Wall. Each video uses simple animations, maps and funny drawings to explain what happened and why. There are also quizzes at the end, so you can check what you have learned.

The channel has helped me a lot. Because the stories are explained so clearly, I actually understand the reasons behind events instead of just learning facts by heart. Before my last history test, I watched three videos and got the best mark in my class.

The only disadvantage is that the videos sometimes go too fast, so you have to pause them. Also, they are only in English, which may be difficult for younger learners.

Overall, I would recommend History in a Hurry to any student who finds history difficult. It is also a great way to practise your English!`,
  callouts: [
    {q: "History used to be my least favourite subject.", tag: "opening", cz: "used to + infinitiv – osobní úvod, který ukáže změnu."},
    {q: "Each video uses simple animations, maps and funny drawings to explain what happened and why.", tag: "example", cz: "Konkrétní popis, co kanál nabízí – první bod zadání."},
    {q: "Because the stories are explained so clearly", tag: "passive", cz: "Trpný rod + because – důvod, PROČ kanál pomáhá."},
    {q: "instead of just learning facts by heart", tag: "gerund", cz: "instead of + -ing; learn by heart = učit se nazpaměť."},
    {q: "I would recommend History in a Hurry to any student who finds history difficult.", tag: "recommend", cz: "Doporučení s jasnou cílovou skupinou."}
  ]}
]
};
