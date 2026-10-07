/* C1 Advanced – Writing data (Part 1 essay, Part 2 letter/email, proposal, report, review).
   All prompts and model answers are original. Czech = UI/teaching text, English = exam content. */
window.DATA = window.DATA || {};
window.DATA.writing = {

/* ---------- labels for annotated callouts in model answers ---------- */
tags: {
  topic: "Topic sentence",
  concession: "Ústupka (concession)",
  hedging: "Hedging (zmírnění)",
  complex: "Souvětí (complex sentence)",
  inversion: "Inverze",
  passive: "Trpný rod / neosobní styl",
  linker: "Spojovací výraz",
  register: "Registr",
  recommend: "Doporučení",
  conditional: "Kondicionál",
  cleft: "Vytýkací věta (cleft)",
  evaluative: "Hodnoticí slovník",
  collocation: "Kolokace",
  opinion: "Vyjádření názoru",
  reference: "Odkazování (koheze)",
  rhetorical: "Řečnická otázka"
},

/* ---------- exam format overview ---------- */
format: {
  minutes: 90,
  intro: "Písemná část C1 Advanced trvá 90 minut a má dvě části. Obě mají stejnou váhu a každý text má 220–260 slov. Doporučené rozdělení času: 45 minut na každou část (cca 10 min plánování, 30 min psaní, 5 min kontrola).",
  parts: [
    {name: "Part 1 – Essay (povinná)", text: "Dostaneš téma ve formě poznámek z diskuse/přednášky: otázka a TŘI body. Píšeš esej, ve které rozebereš DVA z těchto bodů a vysvětlíš, který z nich je podle tebe důležitější/účinnější, s argumenty. Tři citované názory z diskuse můžeš (ale nemusíš) využít – vlastními slovy. Registr: neutrální až formální."},
    {name: "Part 2 – výběr ze tří", text: "Vybereš si JEDNU ze tří úloh: dopis/e-mail (formální i neformální), proposal (návrh), report (zpráva) nebo review (recenze). Každá má krátký kontext a 2–3 body, které musíš pokrýt. Esej v Part 2 už není."}
  ],
  criteria: "Hodnotí se čtyři kritéria, každé 0–5 bodů: Content, Communicative Achievement, Organisation, Language. Maximum je 20 bodů za každou část (40 celkem)."
},

/* ---------- Cambridge assessment criteria – descriptors paraphrased in Czech ---------- */
criteria: [
  {id: "content", name: "Content", cz: "Obsah",
   q: "Splnil(a) jsem úkol? Pokryl(a) jsem všechny body zadání a je čtenář plně informován?",
   bands: {
     5: "Veškerý obsah je relevantní k zadání, všechny požadované body jsou rozvinuté. Cílový čtenář je plně informován.",
     3: "Drobné odbočení nebo vynechání, ale čtenář je celkově informován. Některé body jsou rozvedeny jen povrchně.",
     1: "Výrazné vynechání nebo nepochopení zadání; podstatná část textu je mimo téma. Čtenář je informován jen minimálně."
   }},
  {id: "ca", name: "Communicative Achievement", cz: "Komunikační účinnost",
   q: "Odpovídá registr, tón a konvence typu textu? Drží text pozornost čtenáře a sděluje složité myšlenky?",
   bands: {
     5: "Konvence typu textu (esej, report…) jsou použity efektivně a pružně; registr a tón sedí po celou dobu. Text drží pozornost a sděluje jednoduché i složité myšlenky.",
     3: "Konvence jsou použity vhodně, registr většinou sedí; jednoduché i některé složitější myšlenky jsou sděleny srozumitelně.",
     1: "Konvence typu textu jsou použity jen částečně, registr kolísá; sdělují se hlavně jednoduché myšlenky jednoduchými prostředky."
   }},
  {id: "org", name: "Organisation", cz: "Organizace",
   q: "Je text logicky členěný do odstavců? Používám rozmanité spojovací a odkazovací prostředky?",
   bands: {
     5: "Text je dobře uspořádaný a soudržný; používá rozmanité organizační vzorce a široké spektrum spojovacích a odkazovacích prostředků s pružností.",
     3: "Text je dobře uspořádaný a souvislý; používá různé spojovací výrazy a organizační prostředky (odstavce, nadpisy) s jistým efektem.",
     1: "Text je souvislý, ale spojuje myšlenky jen základními a omezenými výrazy (and, but, because); odstavce chybí nebo jsou nelogické."
   }},
  {id: "lang", name: "Language", cz: "Jazyk",
   q: "Používám širokou slovní zásobu (i méně běžnou) a rozmanité gramatické struktury? Jsou chyby jen občasné?",
   bands: {
     5: "Široká slovní zásoba včetně méně běžných výrazů, přesná a vhodná; široká škála jednoduchých i složitých struktur s kontrolou a flexibilitou. Chyby jen výjimečně (tzv. slips).",
     3: "Řada slovní zásoby včetně méně běžné, použitá vhodně; jednoduché i složité struktury. Chyby se vyskytují, ale nebrání porozumění.",
     1: "Běžná každodenní slovní zásoba, jednoduché struktury s dobrou kontrolou; složitější pokusy obsahují chyby, které mohou bránit porozumění."
   }}
],

/* ---------- pre-submit checklist ---------- */
checklist: [
  "Odpověděl(a) jsem na VŠECHNY body zadání (v eseji dva body + který je důležitější a proč)?",
  "Odpovídá registr čtenáři (formální / neutrální / neformální) a drží se celým textem?",
  "Má text jasné odstavce (esej 4–5, dopis 4–6, report/proposal s nadpisy)?",
  "Začíná každý odstavec topic sentence a jsou odstavce propojené?",
  "Použil(a) jsem rozmanité spojovací výrazy (ne jen and, but, also, so)?",
  "Je v textu škála struktur: trpný rod, kondicionál, vztažné věty, inverze nebo vytýkací věta, modální slovesa?",
  "Je délka 220–260 slov?",
  "Zkontroloval(a) jsem členy, shodu podmětu s přísudkem, časy a pravopis?"
],

/* ---------- lessons per text type ---------- */
lessons: [
 {id: "essay", title: "Esej (Part 1)", type: "essay",
  intro: "Esej je povinná. Píšeš pro učitele/zkoušejícího v neutrálním až formálním registru. Klíčové je vybrat DVA ze tří bodů v poznámkách, každý rozebrat v samostatném odstavci a v závěru jasně říct, který je důležitější/účinnější a PROČ. Třetí bod nerozebírej – nic tím nezískáš a přijdeš o slova.",
  structure: [
    "Úvod (2–3 věty): uveď téma obecně, parafrázuj otázku, naznač, které dva body rozebereš. Nevyjadřuj ještě konečný verdikt.",
    "Odstavec 2: první bod – topic sentence, argument, příklad/důsledek, případně ústupka.",
    "Odstavec 3: druhý bod – stejně, ale jinými strukturami a spojovacími výrazy.",
    "Závěr: jasný verdikt – který bod je důležitější a proč (porovnání, ne opakování). Můžeš přidat výhled nebo podmínku."
  ],
  register: "Neutrální/formální: žádné stažené tvary (don’t → do not), žádné hovorové výrazy (kids, stuff, a lot of → a great deal of / numerous). Vyhýbej se přímému oslovování čtenáře a vykřičníkům. Názor vyjadřuj, ale s mírou (hedging).",
  plan: [
    {h: "Úvod", t: "Obecná věta o tématu + parafráze otázky + zmínka o dvou bodech."},
    {h: "Bod 1", t: "Topic sentence → vysvětlení → příklad → (ústupka)."},
    {h: "Bod 2", t: "Topic sentence → vysvětlení → příklad → srovnání s bodem 1."},
    {h: "Závěr", t: "Který bod je důležitější + hlavní důvod; případně kompromis."}
  ],
  phrases: [
    {fn: "Úvod (introducing)", items: ["It is often argued that…", "There is ongoing debate about whether…", "In recent years, the question of … has attracted considerable attention.", "This essay will consider two of the most frequently suggested approaches: … and …"]},
    {fn: "Přidávání (adding)", items: ["Furthermore, …", "What is more, …", "In addition to this, …", "Not only does X…, but it also…", "A further point worth considering is…"]},
    {fn: "Kontrast (contrasting)", items: ["However, …", "By contrast, …", "On the other hand, …", "Whereas X…, Y…", "Conversely, …"]},
    {fn: "Ústupka (concession)", items: ["Admittedly, …", "While it is true that…, …", "Although X has its merits, …", "Granted, …; nevertheless, …", "This is not to say that…"]},
    {fn: "Názor (giving opinion)", items: ["I would argue that…", "In my view, …", "It seems to me that…", "I am inclined to believe that…", "From my perspective, …"]},
    {fn: "Hedging (zmírnění)", items: ["It could be argued that…", "This may well be…", "…tends to…", "…is arguably the most…", "There is some evidence to suggest that…", "To a certain extent, …"]},
    {fn: "Příčina a důsledek", items: ["As a result, …", "Consequently, …", "This, in turn, leads to…", "…which means that…", "Owing to…"]},
    {fn: "Závěr (concluding)", items: ["On balance, …", "All things considered, …", "Weighing up both approaches, …", "Ultimately, …", "To sum up, …"]}
  ],
  mistakes: [
    {bad: "I am agree with this opinion.", good: "I agree with this opinion.", why: "agree je sloveso, nepoužívá se s be (vliv „jsem souhlasný“)."},
    {bad: "According to me, …", good: "In my view, … / I would argue that…", why: "according to se používá jen pro cizí zdroj (according to experts)."},
    {bad: "On the other side, …", good: "On the other hand, …", why: "Pevná fráze je on the other hand."},
    {bad: "Although it is expensive, but it is effective.", good: "Although it is expensive, it is effective.", why: "Čeština říká „i když…, ale“; v angličtině jen jedna spojka."},
    {bad: "The most of people think…", good: "Most people think…", why: "most people bez členu a bez of."},
    {bad: "People is worried about…", good: "People are worried about…", why: "people je množné číslo."},
    {bad: "In the conclusion, …", good: "In conclusion, … / To conclude, …", why: "Pevná fráze bez členu."},
    {bad: "Discuss about the advantages", good: "Discuss the advantages", why: "discuss je přechodné sloveso, žádné about."},
    {bad: "Despite of the cost, …", good: "Despite the cost, … / In spite of the cost, …", why: "despite nemá of."},
    {bad: "The society should…", good: "Society should…", why: "Obecné pojmy (society, nature, technology) bez členu."}
  ]
 },
 {id: "letter-formal", title: "Formální dopis / e-mail", type: "letter",
  intro: "Formální dopis píšeš instituci, redaktorovi novin, firmě, vedení školy… Cílem bývá stížnost, žádost o práci, reakce na článek nebo návrh. Hlavní je jasný účel v první větě, zdvořilý ale sebevědomý tón a jasné závěrečné vyzvání k akci.",
  structure: [
    "Oslovení: Dear Sir or Madam, (neznám jméno) / Dear Ms Novak, (znám jméno).",
    "Odstavec 1: důvod psaní – I am writing to… / I am writing in response to…",
    "Odstavce 2–3(4): jednotlivé body zadání, každý ve vlastním odstavci.",
    "Závěr: co očekáváš, výzva k akci, poděkování.",
    "Rozloučení: Yours faithfully (po Dear Sir or Madam) / Yours sincerely (po jménu) + celé jméno."
  ],
  register: "Formální: žádné zkratky (I’m), žádné vykřičníky, nepřímé zdvořilé formulace (I would be grateful if you could…), pasivum tam, kde nechceš obviňovat (I was given incorrect information).",
  plan: [
    {h: "Účel", t: "1–2 věty: proč píšeš a na co reaguješ."},
    {h: "Bod 1", t: "Fakta/argument + příklad."},
    {h: "Bod 2", t: "Fakta/argument + příklad."},
    {h: "Bod 3 / návrh", t: "Co navrhuješ nebo požaduješ."},
    {h: "Závěr", t: "Výzva k akci, poděkování, formální rozloučení."}
  ],
  phrases: [
    {fn: "Otevření (openings)", items: ["I am writing in response to your article on…", "I am writing to express my concern about…", "I am writing to apply for the position of…, as advertised on…", "I am writing with regard to…"]},
    {fn: "Stížnost / nespokojenost", items: ["I was disappointed to discover that…", "Contrary to what was stated in your brochure, …", "I would like to draw your attention to…", "This was all the more frustrating given that…"]},
    {fn: "Žádost / doporučení", items: ["I would be grateful if you could…", "I would urge the council to reconsider…", "It would be advisable to…", "I would appreciate it if…"]},
    {fn: "Ústupka", items: ["While I appreciate that…, …", "I fully understand that…; however, …", "Admittedly, …"]},
    {fn: "Uzavření (closings)", items: ["I look forward to hearing from you.", "I trust that this matter will be dealt with promptly.", "Thank you for taking the time to consider my views.", "Please do not hesitate to contact me should you require further information."]},
    {fn: "Rozloučení", items: ["Yours faithfully, (Dear Sir or Madam)", "Yours sincerely, (Dear Mr/Ms + příjmení)", "Kind regards, (e-mail, polo-formální)"]}
  ],
  mistakes: [
    {bad: "I look forward to hear from you.", good: "I look forward to hearing from you.", why: "look forward to + -ing (to je předložka)."},
    {bad: "Dear Sir or Madam, … Yours sincerely,", good: "Dear Sir or Madam, … Yours faithfully,", why: "Neznámý adresát → faithfully."},
    {bad: "I am writing you because…", good: "I am writing to you regarding…", why: "V britské angličtině write to someone."},
    {bad: "I would like to complain about…!!!", good: "I wish to express my dissatisfaction with…", why: "Vykřičníky a emoce do formálního dopisu nepatří."},
    {bad: "Hello Mr Smith,", good: "Dear Mr Smith,", why: "Hello je neformální oslovení."},
    {bad: "I recommend you to change…", good: "I recommend that you change… / I recommend changing…", why: "recommend + that / -ing."},
    {bad: "Please, send me the informations.", good: "Please send me the information.", why: "information je nepočitatelné; v angličtině bez čárky po please."}
  ]
 },
 {id: "letter-informal", title: "Neformální dopis / e-mail", type: "letter",
  intro: "Neformální e-mail píšeš kamarádovi, bývalému spolužákovi, kolegovi, kterého dobře znáš. Na C1 se hodnotí, zda zní přirozeně (stažené tvary, frázová slovesa, idiomy), ale zároveň musí mít strukturu a pokrýt všechny body zadání – často radu nebo doporučení.",
  structure: [
    "Oslovení: Hi Tom, / Dear Anna,",
    "Úvod: reakce na jeho zprávu, krátká osobní věta (ne přehnaně dlouhá).",
    "2–3 odstavce: jednotlivé body zadání (rada, zkušenost, doporučení).",
    "Závěr: shrnutí, přání, výzva (Let me know…), rozloučení."
  ],
  register: "Neformální, ale ne slangový: stažené tvary, frázová slovesa (sort out, come across), idiomy s mírou, přímé oslovení čtenáře, otázky. Pořád ale potřebuješ rozmanitou gramatiku (kondicionály, vztažné věty) – C1 není chat.",
  plan: [
    {h: "Pozdrav + reakce", t: "Díky za zprávu, krátce k jeho situaci."},
    {h: "Bod 1", t: "Rada/zkušenost s konkrétním příkladem."},
    {h: "Bod 2", t: "Další rada/doporučení, případně varování."},
    {h: "Závěr", t: "Shrnutí, nabídka pomoci, rozloučení."}
  ],
  phrases: [
    {fn: "Otevření (openings)", items: ["It was great to hear from you!", "Sorry it’s taken me so long to get back to you.", "Thanks for your email – it sounds like you’ve got a lot on your plate.", "I couldn’t believe it when I read your news!"]},
    {fn: "Rada", items: ["If I were you, I’d…", "Have you thought about…?", "You might want to…", "Whatever you do, don’t…", "It might be worth…"]},
    {fn: "Přidávání / kontrast", items: ["On top of that, …", "Mind you, …", "Having said that, …", "Then again, …", "Anyway, …"]},
    {fn: "Uzavření (closings)", items: ["Let me know how it goes.", "Give my love to…", "Can’t wait to see you!", "Drop me a line if you need anything else.", "Take care,", "All the best,", "Speak soon,"]}
  ],
  mistakes: [
    {bad: "Dear friend, I am writing to inform you…", good: "Hi Marta, Great to hear from you!", why: "Příliš formální úvod do kamarádského e-mailu."},
    {bad: "Yours faithfully, Petr", good: "Best wishes, Petr / Take care, Petr", why: "Formální rozloučení do neformálního textu nepatří."},
    {bad: "You must visit the castle. You must try the food.", good: "You really can’t leave without seeing the castle – and do try the food!", why: "Opakování must zní jako příkaz; rozmanité způsoby rady."},
    {bad: "I am very happy, it is great, it is nice.", good: "I’m absolutely thrilled – it’s a fantastic opportunity.", why: "Chudá hodnoticí slovní zásoba."},
    {bad: "gonna, wanna, u, lol", good: "going to, want to, you", why: "Neformální neznamená SMS styl."}
  ]
 },
 {id: "proposal", title: "Proposal (návrh)", type: "proposal",
  intro: "Proposal píšeš nadřízenému, vedení školy, městské radě nebo komisi grantu. Na rozdíl od reportu se dívá do BUDOUCNA: navrhuješ, co udělat, a přesvědčuješ, že to bude fungovat. Musí mít nadpis, podnadpisy a jasná doporučení.",
  structure: [
    "Název (Title / To / From – nepovinné; stačí výstižný nadpis).",
    "Introduction / Aim: účel návrhu v 1–2 větách.",
    "2–3 sekce s podnadpisy podle bodů zadání (např. Current situation, Suggested improvements, Benefits).",
    "Conclusion / Recommendation: shrnutí a přesvědčivé doporučení."
  ],
  register: "Formální/neutrální, věcný a přesvědčivý. Neosobní konstrukce a pasivum (It is proposed that…, It is suggested that…), modální slovesa (could, would), konkrétní návrhy s odůvodněním.",
  plan: [
    {h: "Introduction", t: "The aim of this proposal is to…"},
    {h: "Současný stav", t: "Krátce problém (není to report – max 2–3 věty)."},
    {h: "Návrhy", t: "2–3 konkrétní návrhy, každý s přínosem."},
    {h: "Recommendation", t: "Shrnutí + proč by vedení mělo návrh přijmout."}
  ],
  phrases: [
    {fn: "Nadpisy (headings)", items: ["Introduction / Aim", "Current situation", "Proposed changes", "Suggested activities", "Expected benefits", "Costs and funding", "Conclusion / Recommendation"]},
    {fn: "Úvod", items: ["The aim of this proposal is to outline…", "This proposal sets out a number of suggestions for…", "The purpose of this proposal is to…"]},
    {fn: "Neosobní pasivum (impersonal passive)", items: ["It is proposed that…", "It is suggested that the room (should) be…", "It is widely felt that…", "Students were consulted and…", "It is hoped that…", "It is estimated that…"]},
    {fn: "Návrh a doporučení (recommending)", items: ["I would recommend that…", "One option would be to…", "It would be advisable to…", "Serious consideration should be given to…", "This could be achieved by…"]},
    {fn: "Přínosy", items: ["This would enable students to…", "The main advantage of this would be…", "Not only would this…, but it would also…", "In the long term, this would…"]},
    {fn: "Závěr (concluding)", items: ["In conclusion, the measures outlined above would…", "I am confident that…", "Implementing these changes would…"]}
  ],
  mistakes: [
    {bad: "I suggest to buy new computers.", good: "I suggest buying new computers. / I suggest that new computers (should) be bought.", why: "suggest + -ing / that-věta, nikdy to-infinitiv."},
    {bad: "Text bez nadpisů", good: "Introduction / Proposed changes / Conclusion", why: "Chybějící podnadpisy snižují Communicative Achievement i Organisation."},
    {bad: "It is very good idea.", good: "It would be a highly beneficial initiative.", why: "Člen a/an + precizní hodnoticí slovník."},
    {bad: "In the past, the club was… (celý text o minulosti)", good: "Krátce stav, většina textu o návrzích do budoucna.", why: "Proposal ≠ report."},
    {bad: "We must do it!!!", good: "I would strongly recommend that this be implemented.", why: "Formální přesvědčování, ne emoce."}
  ]
 },
 {id: "report", title: "Report (zpráva)", type: "report",
  intro: "Report píšeš pro vedení, učitele nebo instituci. Hodnotí SOUČASNÝ nebo MINULÝ stav (kurz, zařízení, akci, průzkum), uvádí zjištění a končí doporučením. Musí mít nadpis a podnadpisy, faktický a neosobní styl.",
  structure: [
    "Nadpis (Report on…).",
    "Introduction: účel reportu a jak byla data získána (survey, interviews, observation).",
    "2–3 sekce zjištění s podnadpisy podle bodů zadání.",
    "Conclusion / Recommendations: shrnutí a konkrétní doporučení."
  ],
  register: "Formální, neosobní, objektivní. Hodně pasiva a reportovacích sloves (It was found that…, The majority of respondents…), kvantifikátory (a significant proportion, almost half), žádné emoce.",
  plan: [
    {h: "Introduction", t: "The aim of this report is to… Information was gathered by…"},
    {h: "Zjištění 1", t: "Co funguje / nefunguje + data."},
    {h: "Zjištění 2", t: "Další bod zadání + data."},
    {h: "Recommendations", t: "1–3 konkrétní doporučení navázaná na zjištění."}
  ],
  phrases: [
    {fn: "Nadpisy (headings)", items: ["Introduction", "Methods / Background", "Findings", "Strengths / Weaknesses", "Areas for improvement", "Conclusion", "Recommendations"]},
    {fn: "Úvod", items: ["The aim of this report is to assess…", "This report evaluates…", "The findings are based on a questionnaire completed by…", "Information was gathered through interviews with…"]},
    {fn: "Neosobní pasivum (impersonal passive)", items: ["It was found that…", "It was generally agreed that…", "Concerns were raised about…", "It has been noted that…", "The facilities are considered to be…"]},
    {fn: "Kvantifikace", items: ["The vast majority of respondents…", "A significant proportion of…", "Just under half of those surveyed…", "Only a handful of…", "Opinion was divided on…"]},
    {fn: "Doporučení (recommending)", items: ["It is recommended that…", "In light of these findings, I would recommend…", "Consideration should be given to…", "It would be advisable to…"]},
    {fn: "Závěr", items: ["Overall, …", "In conclusion, it is clear that…", "On the whole, the scheme has proved…"]}
  ],
  mistakes: [
    {bad: "I think the canteen is terrible and I hate the food.", good: "The canteen was rated poorly by most respondents, particularly in terms of…", why: "Report je objektivní – názory vkládej do úst respondentů."},
    {bad: "Researches show…", good: "Research shows… / Studies show…", why: "research je nepočitatelné."},
    {bad: "There were made many changes.", good: "Many changes were made.", why: "Kalk českého slovosledu."},
    {bad: "The 60 % of students", good: "60% of students", why: "Procenta bez členu."},
    {bad: "Text začíná: Hello, my name is…", good: "Introduction – The aim of this report is…", why: "Report není dopis."}
  ]
 },
 {id: "review", title: "Review (recenze)", type: "review",
  intro: "Recenze se píše pro web, časopis nebo blog – čtenáři chtějí vědět, zda se jim kniha/film/místo vyplatí. Zadání obvykle chce popis + hodnocení + doporučení (často i srovnání nebo „pro koho je vhodná“). Na C1 je klíčový bohatý hodnoticí slovník a schopnost zaujmout.",
  structure: [
    "Poutavý nadpis (nepovinný, ale pomáhá).",
    "Úvod: co recenzuješ, základní kontext, háček pro čtenáře.",
    "Popis (stručně!) – bez převyprávění celého děje.",
    "Hodnocení: silné a slabé stránky s konkrétními příklady.",
    "Doporučení: pro koho, proč, případně výhrady."
  ],
  register: "Neutrální, může být lehce neformální a osobní; přímé oslovení čtenáře, řečnické otázky, živá přídavná jména. Pozor na přehánění – hodnocení má být vyvážené.",
  plan: [
    {h: "Úvod", t: "Název, typ, háček (otázka, překvapivý fakt)."},
    {h: "Popis", t: "Krátce o čem to je / jak to funguje."},
    {h: "Hodnocení", t: "Silné stránky + výhrada (ústupka)."},
    {h: "Doporučení", t: "Pro koho a proč; verdikt."}
  ],
  phrases: [
    {fn: "Hodnoticí slovník – pozitivní (evaluative)", items: ["gripping, thought-provoking, beautifully crafted", "a tour de force", "breathtaking scenery", "superbly acted", "well worth the price of admission", "it lives up to the hype"]},
    {fn: "Hodnoticí slovník – negativní", items: ["predictable, long-winded, overrated", "falls flat", "the plot drags in places", "fails to live up to expectations", "a missed opportunity", "rather clichéd"]},
    {fn: "Popis", items: ["Set in…, the novel follows…", "The exhibition brings together…", "The app is designed to…", "At its heart, the story is about…"]},
    {fn: "Ústupka / vyváženost", items: ["Admittedly, …", "My only reservation is that…", "Although the second half is weaker, …", "That said, …"]},
    {fn: "Doporučení", items: ["I would wholeheartedly recommend it to…", "It is a must-see for anyone who…", "If you are looking for…, look no further.", "Unless you are a die-hard fan, you might want to give it a miss."]}
  ],
  mistakes: [
    {bad: "The film was very very good and the actors were good.", good: "The film was outstanding, and the cast delivered compelling performances.", why: "Opakování good/very; použij přesná přídavná jména."},
    {bad: "Celá recenze je převyprávění děje", good: "Max. jeden krátký odstavec popisu, zbytek hodnocení.", why: "Content: zadání chce hodnocení a doporučení."},
    {bad: "The film is about a boy which…", good: "The film is about a boy who…", why: "who pro osoby."},
    {bad: "It was very boring film.", good: "It was a rather tedious film.", why: "Chybí člen a; použij přesnější slovo."},
    {bad: "I recommend it for everybody.", good: "I would recommend it to anyone who enjoys…", why: "recommend to; a konkrétní cílová skupina."}
  ]
 }
],

/* ---------- typical spelling slips (wrong -> right) ---------- */
typos: [
  ["recieve","receive"],["enviroment","environment"],["goverment","government"],["neccessary","necessary"],["necesary","necessary"],
  ["definately","definitely"],["accomodation","accommodation"],["occured","occurred"],["seperate","separate"],["untill","until"],
  ["wich","which"],["begining","beginning"],["beleive","believe"],["responsability","responsibility"],["comunity","community"],
  ["oportunity","opportunity"],["advertisment","advertisement"],["existance","existence"],["independant","independent"],
  ["occassion","occasion"],["embarass","embarrass"],["tommorow","tomorrow"],["allready","already"],["alot","a lot"],
  ["thier","their"],["becouse","because"],["familly","family"],["adress","address"],["programm","programme"],
  ["proffesional","professional"],["profesional","professional"],["possibilty","possibility"],["concious","conscious"],
  ["developement","development"],["efficent","efficient"],["critisism","criticism"],["relevent","relevant"],
  ["appartment","apartment"],["sucess","success"],["succesful","successful"],["successfull","successful"],["truely","truly"],
  ["arguement","argument"],["comittee","committee"],["commitee","committee"],["publically","publicly"],["wierd","weird"],
  ["writting","writing"],["realy","really"],["finaly","finally"],["usefull","useful"],["beautifull","beautiful"],
  ["carefull","careful"],["helpfull","helpful"],["sincerly","sincerely"],["faithfuly","faithfully"],["foreing","foreign"],
  ["goverments","governments"],["inteligent","intelligent"],["knowlege","knowledge"],["lenght","length"],["strenght","strength"],
  ["medecine","medicine"],["occurence","occurrence"],["persue","pursue"],["recomend","recommend"],["reccomend","recommend"],
  ["recommand","recommend"],["teached","taught"],["thinked","thought"],["buyed","bought"],["choosed","chose"],["writed","wrote"],
  ["informations","information"],["advices","advice"],["equipments","equipment"],["furnitures","furniture"],["researches","research"],
  ["knowledges","knowledge"],["homeworks","homework"],["evidences","evidence"]
],

/* ---------- Czech-speaker traps detected by the analyzer (regex source, Czech tip) ---------- */
traps: [
  ["\\bam agree\\b|\\bis agree\\b|\\bare agree\\b", "„I am agree“ → I agree."],
  ["\\baccording to me\\b", "„according to me“ → in my view / I would argue."],
  ["\\bon the other side\\b", "„on the other side“ → on the other hand."],
  ["\\bdiscuss(?:es|ed|ing)? about\\b", "discuss about → discuss (bez about)."],
  ["\\bdespite of\\b", "despite of → despite / in spite of."],
  ["\\bthe most of\\b", "the most of people → most people."],
  ["\\bpeople is\\b|\\bpeople was\\b|\\bpeople has\\b", "people je množné číslo → people are/were/have."],
  ["\\bin the conclusion\\b", "in the conclusion → in conclusion."],
  ["\\blook(?:ing)? forward to (?:hear|see|meet|receive)\\b", "look forward to + -ing (hearing)."],
  ["\\bsuggest(?:s|ed)? (?:to|you to)\\b", "suggest to do → suggest doing / suggest that…"],
  ["\\brecommend(?:s|ed)? (?:you|him|her|them|us) to\\b", "recommend you to → recommend that you… / recommend doing."],
  ["\\bmore (?:cheaper|better|easier|bigger|faster|smaller)\\b", "dvojí stupňování (more cheaper) → cheaper."],
  ["\\bsince (?:\\w+ )?(?:years|months|weeks|days)\\b", "since five years → for five years."],
  ["\\bpossibility to\\b", "possibility to do → opportunity to do / chance of doing."],
  ["\\beventually\\b", "eventually = nakonec (ne „případně“) – zkontroluj význam; případně = possibly / if necessary."],
  ["\\bactual(?:ly)?\\b", "actual(ly) = skutečný/vlastně, ne „aktuální“ – aktuální = current / currently."],
  ["\\bexplain me\\b|\\bexplain us\\b", "explain me → explain to me."],
  ["\\binterested about\\b", "interested about → interested in."],
  ["\\bdepend(?:s|ed|ing)? of\\b", "depend of → depend on."],
  ["\\bmake (?:a )?photos?\\b", "make a photo → take a photo."],
  ["\\bmake (?:a )?sports?\\b", "make sport → do sport."],
  ["\\balthough\\b[^.!?]*,\\s*but\\b", "although…, but… → použij jen jednu spojku."],
  ["\\b(?:english|czech|german|french|monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|february|april|june|july|august|september|october|november|december)\\b", "Národnosti, jazyky, dny a měsíce se v angličtině píšou s velkým písmenem."]
],

/* ---------- "rewrite a weak paragraph" exercises ---------- */
rewrite: [
 {id: "rw01", type: "essay", task: "Odstavec je plný opakování a jednoduchých vět. Přepiš ho: spoj věty, přidej ústupku a hedging.",
  weak: "Public transport is good. Public transport is cheap. Many people use public transport. Public transport is good for the environment. But some people do not like public transport because it is slow.",
  better: "Investing in public transport is arguably the most effective way to reduce congestion. Not only is it considerably cheaper for commuters than running a car, but it also produces a fraction of the emissions per passenger. Admittedly, buses and trams are still perceived as slow in some areas; however, dedicated lanes and more frequent services could largely overcome this objection."},
 {id: "rw02", type: "essay", task: "Nahraď „In my opinion“ a „I think“ rozmanitějšími výrazy a přidej argument s důsledkem.",
  weak: "In my opinion, schools should teach practical skills. I think it is important. In my opinion, students do not know how to cook or manage money. I think this is a problem.",
  better: "There is a strong case for schools placing greater emphasis on practical skills. A surprising number of school-leavers are unable to prepare a basic meal or draw up a monthly budget, which leaves them poorly equipped for independent life. It seems to me that a modest amount of curriculum time devoted to such skills would pay considerable dividends later on."},
 {id: "rw03", type: "letter-formal", task: "Odstavec stížnosti je příliš emotivní a neformální. Přepiš ho do formálního registru.",
  weak: "I'm really angry!!! The course was terrible and the teacher didn't even come twice. You said in the ad that there would be 8 students but there were like 20. I want my money back now.",
  better: "I wish to express my dissatisfaction with the course I recently attended. On two occasions, the lessons were cancelled without prior notice, as the teacher failed to arrive. Furthermore, your advertisement stated that groups would be limited to eight students, whereas there were in fact twenty participants in mine. In view of this, I would expect a full refund."},
 {id: "rw04", type: "report", task: "Přepiš do neosobního stylu reportu: pasivum, kvantifikátory, žádné „I think“.",
  weak: "I asked people and they said the gym is too small. I think a lot of them don't like the opening hours. Some people said the equipment is old and I agree.",
  better: "A survey of members revealed that the gym is widely considered too small to cope with demand at peak times. Over half of the respondents expressed dissatisfaction with the current opening hours, while a significant minority noted that much of the equipment is outdated and in need of replacement."},
 {id: "rw05", type: "review", task: "Odstavec recenze používá chudý slovník (good, nice, bad). Přidej hodnoticí výrazy a vyváženost.",
  weak: "The film is very good. The actors are good and the music is nice. The ending is bad. It is a good film.",
  better: "This is an absorbing film, anchored by two superbly understated lead performances and a haunting score that lingers long after the credits. My only reservation concerns the ending, which feels rushed and somewhat contrived after such a patient build-up. That said, it remains one of the most rewarding releases of the year."},
 {id: "rw06", type: "proposal", task: "Přepiš návrh tak, aby obsahoval neosobní pasivum, modální slovesa a jasné přínosy.",
  weak: "We need a new study room. You should buy computers and tables. Students will like it.",
  better: "It is proposed that the unused storeroom on the ground floor be converted into a quiet study area. Equipping it with eight networked computers and flexible seating would cost relatively little, yet it would provide students with a much-needed space for independent work outside lesson time."},
 {id: "rw07", type: "letter-informal", task: "E-mail kamarádovi zní jako úřední dopis. Udělej ho přirozeně neformálním (stažené tvary, frázová slovesa).",
  weak: "Dear friend, I am writing in order to provide you with information regarding accommodation in my city. It is recommended that you reserve a hostel in advance. Yours faithfully, Jana",
  better: "Hi Tom, Great to hear you're finally coming over! If I were you, I'd book a hostel in the old town sooner rather than later – they fill up fast in summer. Mind you, you're more than welcome to crash at my place for a couple of nights. Take care, Jana"},
 {id: "rw08", type: "essay", task: "Odstavec nemá topic sentence a myšlenky skáčou. Přidej úvodní větu a logické spojky.",
  weak: "Taxes on sugary drinks exist in some countries. Obesity is a big problem. Children drink a lot of cola. Prices go up and people buy less. Some say it is unfair to poor people.",
  better: "A tax on sugary drinks is one of the most direct ways in which governments can influence eating habits. Since soft drinks account for a large share of children's sugar intake, raising their price tends to reduce consumption almost immediately. Critics argue that such taxes hit low-income families hardest; nevertheless, if the revenue is reinvested in free school sports, those same families stand to benefit most."},
 {id: "rw09", type: "essay", task: "Přidej inverzi nebo vytýkací konstrukci (cleft) a odstraň opakování „very important“.",
  weak: "Teachers are very important. Technology is also very important but teachers are more important. Technology can't motivate students.",
  better: "What ultimately determines whether learners succeed is the quality of their teacher. Technology can certainly enrich lessons, but at no point can an app replicate the encouragement and tailored feedback that a skilled teacher provides."},
 {id: "rw10", type: "report", task: "Doporučení je vágní. Přepiš ho tak, aby bylo konkrétní, formální a navázané na zjištění.",
  weak: "So you should make things better and maybe change some stuff in the canteen.",
  better: "In light of these findings, it is recommended that the canteen introduce at least two vegetarian options daily and extend its opening hours until 3 p.m. It would also be advisable to survey students again at the end of the term to assess whether these changes have had the desired effect."},
 {id: "rw11", type: "letter-formal", task: "Úvod žádosti o práci je nejasný. Přepiš ho tak, aby hned bylo jasné, na co a proč reaguješ.",
  weak: "Hello, my name is Petr and I am 22. I saw your thing on the internet. I want the job.",
  better: "Dear Ms Harper, I am writing to apply for the position of volunteer coordinator at this year's Riverside Arts Festival, as advertised on your website. As a final-year student of event management with two seasons of experience at a regional music festival, I believe I am well suited to the role."},
 {id: "rw12", type: "review", task: "Závěr recenze nemá jasné doporučení. Přepiš ho: pro koho je vhodné a proč.",
  weak: "So that's the museum. It was ok. Maybe go there.",
  better: "All in all, the museum is a hidden gem. Families with curious children will find the hands-on galleries particularly rewarding, although visitors hoping for a comprehensive historical overview may be left wanting more. Either way, at just five pounds a ticket, it is well worth an afternoon."}
],

/* ---------- PART 1: essays (real format: 3 notes, discuss TWO, decide which is more important) ---------- */
part1: [
 {id: "e01", topic: "Technologie", title: "Smartphones and young people",
  context: "Your class has attended a panel discussion on the negative effects of smartphones on young people. You have made the notes below.",
  question: "Who should take the main responsibility for limiting the negative effects of smartphones on young people?",
  points: ["schools", "parents", "technology companies"],
  opinions: ["“Phones should simply be banned during the school day.”", "“Children copy what their parents do, not what they say.”", "“Apps are deliberately designed to keep us scrolling.”"],
  task: "Write an essay discussing two of the groups in your notes. You should explain which group should take more responsibility, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Popiš problém (spánek, soustředění, sebevědomí) a oznam, že rozebereš rodiče a technologické firmy."},
    {h: "Rodiče", t: "Topic sentence: rodiče jsou první obranná linie. Pravidla (telefon mimo ložnici) + ústupka: musí jít příkladem, často sami selhávají."},
    {h: "Technologické firmy", t: "Návykový design (nekonečné scrollování, notifikace). Podmínka/inverze: kdyby firmy musely… Ústupka: dobrovolně to neudělají → regulace."},
    {h: "Závěr", t: "Verdikt: firmy nesou větší odpovědnost, protože mění prostředí pro všechny, rodiče jen pro své dítě."}
  ],
  model: `Smartphones have transformed adolescence almost beyond recognition, and there is growing concern that constant connectivity is affecting young people's sleep, concentration and self-esteem. Responsibility for tackling this is often placed either on families or on the companies that design the devices.

Parents are, in many respects, the first line of defence. They decide when a child receives a phone, and they are in a position to set sensible limits, such as keeping devices out of bedrooms at night. However, rules are only effective if they are modelled at home. A parent who checks their messages throughout dinner can hardly expect a teenager to behave differently, and many adults struggle to resist the pull of the screen themselves.

This is precisely why technology companies cannot be let off the hook. Many popular apps are deliberately engineered to maximise the time users spend on them, through features such as endless scrolling and a constant stream of notifications. Were these companies required to switch such features off by default for under-eighteens, the pressure on individual families would be considerably reduced. Admittedly, firms are unlikely to make these changes voluntarily, so regulation would almost certainly be needed.

On balance, I would argue that technology companies bear the greater responsibility. Parents can influence their own children, but only the designers of these products can change the environment in which every young person grows up. Without action at that level, family rules will always be fighting an uphill battle.`,
  callouts: [
    {q: "Parents are, in many respects, the first line of defence.", tag: "topic", cz: "Topic sentence jasně uvádí, o čem odstavec bude; „in many respects“ tvrzení jemně zmírňuje."},
    {q: "can hardly expect", tag: "collocation", cz: "can hardly + sloveso = „těžko může“ – elegantnější než „cannot expect“."},
    {q: "Were these companies required to switch such features off", tag: "inversion", cz: "Inverze místo „If these companies were required…“ – formální kondicionál 2. typu."},
    {q: "Admittedly, firms are unlikely to make these changes voluntarily", tag: "concession", cz: "Ústupka: uznáš slabinu vlastního argumentu a hned ji vyřešíš (regulace)."},
    {q: "On balance, I would argue that", tag: "opinion", cz: "Jasný verdikt v závěru – zadání chce říct, která skupina je důležitější."}
  ]},

 {id: "e02", topic: "Vzdělávání", title: "Preparing young people for work",
  context: "Your class has listened to a radio discussion about how young people can best be prepared for the world of work. You have made the notes below.",
  question: "Which of these is most valuable in preparing young people for the world of work?",
  points: ["work experience", "a university degree", "practical skills courses"],
  opinions: ["“Employers care more about what you can do than what you know.”", "“A degree opens doors that would otherwise stay closed.”", "“You learn more in two weeks at a real workplace than in a year at school.”"],
  task: "Write an essay discussing two of the options in your notes. You should explain which option is more valuable, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Trh práce se mění; školy kritizovány, že nepřipravují. Představ diplom a pracovní zkušenost."},
    {h: "Vysokoškolský titul", t: "Otevírá dveře (některé profese ho vyžadují), učí kritickému myšlení. Ústupka: ne vždy praktický, drahý."},
    {h: "Pracovní zkušenost", t: "Měkké dovednosti, realita pracoviště, kontakty, ujasnění kariéry. Příklad: stáž."},
    {h: "Závěr", t: "Verdikt: pracovní zkušenost je cennější, protože učí věci, které se ve třídě naučit nedají; ideálně kombinace."}
  ],
  model: `Young people today enter a job market that is more competitive and less predictable than ever before. It is therefore hardly surprising that there is considerable debate about what best equips them for working life, with academic qualifications and practical experience frequently presented as rival paths.

A university degree has long been regarded as the gateway to a successful career. In professions such as medicine or law, it is simply indispensable, and even in other fields it signals to employers that a candidate can manage complex information and meet demanding deadlines. That said, a degree is an expensive undertaking, and graduates sometimes discover that much of what they studied bears little relation to the tasks they are actually asked to perform.

Work experience, by contrast, exposes young people to the realities of the workplace from the outset. A few weeks in an office, a hospital or a workshop can teach them how to communicate with colleagues, take responsibility and cope with pressure, skills which are notoriously difficult to develop in a classroom. Moreover, a placement often helps young people decide what they do not want to do, which can save them years of following the wrong path.

All things considered, I believe that work experience is the more valuable of the two. While a degree remains essential for certain careers, it is the confidence and judgement gained in a real working environment that tend to distinguish successful employees. Ideally, of course, the two should go hand in hand.`,
  callouts: [
    {q: "It is therefore hardly surprising that", tag: "linker", cz: "Logické navázání na předchozí větu – therefore uvnitř věty působí přirozeně formálně."},
    {q: "That said, a degree is an expensive undertaking", tag: "concession", cz: "That said = přesto; obrat argumentu po vyzdvižení výhod."},
    {q: "skills which are notoriously difficult to develop in a classroom", tag: "complex", cz: "Vztažná věta + silné příslovce „notoriously“ rozšiřuje rozsah jazyka."},
    {q: "it is the confidence and judgement gained in a real working environment that tend to distinguish", tag: "cleft", cz: "Vytýkací věta It is… that… zdůrazní hlavní argument verdiktu."}
  ]},

 {id: "e03", topic: "Životní prostředí", title: "Reducing car use in cities",
  context: "Your class has attended a lecture on methods governments could use to reduce car use in cities. You have made the notes below.",
  question: "Which methods should governments use to reduce car use in cities?",
  points: ["improving public transport", "building cycle lanes", "introducing congestion charges"],
  opinions: ["“People will only leave their cars at home if there’s a real alternative.”", "“Charges hit the poorest drivers hardest.”", "“Cycling is fine if you don’t mind getting wet.”"],
  task: "Write an essay discussing two of the methods in your notes. You should explain which method you think is more effective, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Dopravní zácpy a znečištění; vláda má více nástrojů – rozebereš veřejnou dopravu a poplatky za vjezd."},
    {h: "Veřejná doprava", t: "Skutečná alternativa (frekvence, cena, spolehlivost). Ústupka: drahé a pomalé zavádění."},
    {h: "Poplatky za vjezd", t: "Okamžitý efekt, příjmy na investice; nespravedlivé k chudším řidičům."},
    {h: "Závěr", t: "Veřejná doprava je účinnější dlouhodobě; poplatky fungují jen tehdy, existuje-li alternativa."}
  ],
  model: `Traffic congestion and poor air quality have become defining features of modern city life, and governments are under increasing pressure to persuade people to drive less. Two of the most widely discussed measures are investment in public transport and the introduction of charges for driving into city centres.

Improving public transport tackles the problem at its root. Many people drive not because they enjoy it, but because the alternatives are slow, infrequent or unreliable. If buses and trains ran every few minutes, were reasonably priced and reached outlying districts, a considerable number of commuters would happily abandon their cars. Admittedly, such improvements require enormous investment and may take years to complete, but their benefits are lasting.

Congestion charges, on the other hand, can produce results almost overnight. Cities which have adopted them have generally seen a noticeable drop in traffic, and the revenue raised can be reinvested in transport projects. Nevertheless, this approach has a significant drawback: it falls most heavily on those on lower incomes, who may have no choice but to drive, while wealthier motorists simply pay and carry on as before.

Weighing up both approaches, I am convinced that improving public transport is the more effective solution. A charge without a credible alternative merely punishes drivers, whereas a fast and affordable network gives them a genuine reason to change their habits. Only once such a network is in place, I would argue, can charges be introduced fairly.`,
  callouts: [
    {q: "Improving public transport tackles the problem at its root.", tag: "topic", cz: "Krátká, silná topic sentence s idiomem „at its root“."},
    {q: "If buses and trains ran every few minutes, were reasonably priced and reached outlying districts", tag: "conditional", cz: "Kondicionál 2. typu se třemi souřadnými podmínkami – přesná a bohatá struktura."},
    {q: "Nevertheless, this approach has a significant drawback", tag: "linker", cz: "Nevertheless uvozuje protiargument; dvojtečka pak drawback rozvede."},
    {q: "Only once such a network is in place, I would argue, can charges be introduced fairly.", tag: "inversion", cz: "Inverze po „Only once…“ – typická C1 struktura v závěru."}
  ]},

 {id: "e04", topic: "Práce", title: "Quality of life at work",
  context: "Your class has watched a documentary about changes that could improve people's quality of life at work. You have made the notes below.",
  question: "Which changes would most improve people's quality of life at work?",
  points: ["flexible working hours", "the option to work from home", "a four-day working week"],
  opinions: ["“Being trusted to organise your own time is what really matters.”", "“Working from home can be very lonely.”", "“A shorter week just means squeezing the same work into less time.”"],
  task: "Write an essay discussing two of the changes in your notes. You should explain which change would be more beneficial, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Rovnováha práce a života; rozebereš flexibilní pracovní dobu a čtyřdenní týden."},
    {h: "Flexibilní pracovní doba", t: "Sladění s rodinou, menší stres při dojíždění, pocit důvěry. Ústupka: ne pro všechny profese."},
    {h: "Čtyřdenní týden", t: "Delší odpočinek, pilotní projekty – vyšší produktivita. Riziko: intenzivnější dny, stres."},
    {h: "Závěr", t: "Flexibilní doba přínosnější – přizpůsobí se individuálním potřebám a dá se zavést hned."}
  ],
  model: `Over the past decade, the traditional nine-to-five routine has come under increasing scrutiny, as employees and employers alike recognise that exhausted, stressed workers are rarely productive. Among the proposals for improving working life, flexible hours and a four-day week have attracted particular attention.

Flexible working hours allow employees to arrange their day around their personal commitments rather than the other way round. A parent might start early in order to collect their children from school, while someone who struggles in the mornings could begin later and work into the evening. Perhaps more importantly, such arrangements send a clear message that staff are trusted to manage their own time, which tends to boost both morale and loyalty. It must be acknowledged, however, that flexibility is difficult to offer in jobs such as nursing or retail, where shifts have to be covered.

A four-day week, meanwhile, promises a more dramatic change. Several trials have reported that employees given an extra day off were not only happier but also just as productive. Yet the benefits are not guaranteed. In some workplaces, the same workload is simply squeezed into fewer days, leaving staff more exhausted than before.

In my view, flexible working hours would bring the greater benefit. Not only can they be tailored to the needs of each individual, but they can also be introduced gradually and at little cost. A four-day week may be appealing in theory, but it risks replacing one kind of pressure with another.`,
  callouts: [
    {q: "rather than the other way round", tag: "collocation", cz: "Idiomatický obrat „a ne naopak“ – přirozená C1 angličtina."},
    {q: "It must be acknowledged, however, that flexibility is difficult to offer", tag: "passive", cz: "Neosobní pasivum + vsunuté however: ústupka bez „I think“."},
    {q: "Yet the benefits are not guaranteed.", tag: "linker", cz: "Yet na začátku krátké věty = důrazný kontrast; střídání délky vět."},
    {q: "Not only can they be tailored to the needs of each individual, but they can also", tag: "inversion", cz: "Not only + inverze → but also: klasická struktura pro hodnocení Language."}
  ]},

 {id: "e05", topic: "Zdraví", title: "Encouraging healthier lifestyles",
  context: "Your class has attended a panel discussion on how people can be encouraged to lead healthier lives. You have made the notes below.",
  question: "Which measures would be most effective in encouraging people to lead healthier lives?",
  points: ["health education in schools", "taxes on unhealthy food", "free access to sports facilities"],
  opinions: ["“Habits formed in childhood last a lifetime.”", "“People only change when it hits their wallet.”", "“It shouldn’t cost anything to get fit.”"],
  task: "Write an essay discussing two of the measures in your notes. You should explain which measure would be more effective, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Obezita a sedavý životní styl; rozebereš výuku o zdraví ve školách a daně na nezdravé jídlo."},
    {h: "Výuka ve školách", t: "Návyky z dětství, praktické vaření; ústupka: vliv domova, výsledky až za léta."},
    {h: "Daně", t: "Rychlý efekt na spotřebu, výnos na prevenci; kritika: dopad na chudší, paternalismus."},
    {h: "Závěr", t: "Výchova ve školách je účinnější dlouhodobě – mění motivaci, ne jen chování pod tlakem ceny."}
  ],
  model: `Rising rates of obesity and heart disease suggest that, despite unprecedented access to information, many people find it difficult to adopt a healthy lifestyle. This essay examines two possible responses: teaching health in schools and taxing unhealthy food.

Health education is often regarded as a long-term investment. Children who learn how to cook simple, nutritious meals and who understand the effects of sugar and inactivity are more likely to carry these habits into adulthood. It is, after all, much easier to establish good routines early than to break bad ones later. The weakness of this approach is that lessons can be undermined at home, and it may be decades before any measurable improvement in public health becomes apparent.

Taxes on unhealthy products work in a far more immediate way. When the price of fizzy drinks or processed snacks rises, consumption tends to fall, and the revenue can be used to fund health campaigns. However, critics point out that such taxes place a disproportionate burden on low-income households, and some argue that it is not the role of governments to dictate what people eat.

Having considered both measures, I would say that education in schools is ultimately the more effective. A tax may change what people buy, but only for as long as the price remains high, whereas education changes the way people think about food and exercise. What a society needs, in the end, is citizens who choose to live healthily rather than those who are merely priced into it.`,
  callouts: [
    {q: "despite unprecedented access to information", tag: "complex", cz: "despite + podstatné jméno – kompaktní ústupka uvnitř věty."},
    {q: "It is, after all, much easier to establish good routines early than to break bad ones later.", tag: "complex", cz: "Srovnávací konstrukce s infinitivy a „ones“ místo opakování „routines“."},
    {q: "critics point out that such taxes place a disproportionate burden on", tag: "collocation", cz: "Kolokace „place a burden on“ + přesné přídavné jméno disproportionate."},
    {q: "What a society needs, in the end, is citizens who", tag: "cleft", cz: "Vytýkací věta „What… is…“ – efektní závěrečná myšlenka."}
  ]},

 {id: "e06", topic: "Kultura", title: "Public funding for culture",
  context: "Your class has attended a lecture on the ways in which governments support culture. You have made the notes below.",
  question: "Which areas of culture should governments spend public money on?",
  points: ["museums and galleries", "local festivals", "arts education for children"],
  opinions: ["“Museums preserve our history for future generations.”", "“Festivals bring whole communities together.”", "“Every child deserves the chance to play an instrument.”"],
  task: "Write an essay discussing two of the areas in your notes. You should explain which area should receive more public money, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Omezené rozpočty, kultura často škrtána jako první; rozebereš muzea a uměleckou výchovu dětí."},
    {h: "Muzea a galerie", t: "Uchovávají dědictví, turismus; ústupka: návštěvníci často turisté a vzdělaní, ne všichni."},
    {h: "Umělecká výchova", t: "Kreativita, sebevědomí, rovné příležitosti pro děti z chudších rodin; dlouhodobý efekt."},
    {h: "Závěr", t: "Výchova dětí si zaslouží víc – vytváří budoucí publikum i tvůrce; muzea bez publika nepřežijí."}
  ],
  model: `When public budgets are under strain, culture is frequently among the first areas to face cuts. Yet most people accept that governments have some role to play in supporting the arts, and the real question is where limited funds can do the most good. Museums and arts education for children are two strong candidates.

Museums and galleries are the guardians of a nation's heritage. Without public funding, many collections would be sold off or left to deteriorate, and future generations would lose a vital connection with their past. Major museums also attract large numbers of tourists, bringing considerable economic benefits. It should be noted, however, that their visitors tend to be relatively well educated and affluent, so the benefits are not shared equally across society.

Arts education for children, in contrast, reaches young people regardless of their background. Learning to paint, act or play an instrument develops creativity, concentration and self-confidence, qualities that are valuable far beyond the arts themselves. For children from families who could never afford private lessons, a school music programme may be their only opportunity to discover a talent.

Taking everything into account, I am inclined to believe that arts education deserves the larger share of public money. Museums are undoubtedly important, but a museum without visitors who care about culture serves little purpose. By investing in children, governments would be nurturing both the artists and the audiences of the future, which is surely the best way to keep culture alive.`,
  callouts: [
    {q: "Yet most people accept that governments have some role to play", tag: "hedging", cz: "„most people“ a „some role“ – tvrzení je opatrné, ne absolutní."},
    {q: "Without public funding, many collections would be sold off or left to deteriorate", tag: "conditional", cz: "Without… místo if-věty = skrytý kondicionál; trpný rod would be sold off."},
    {q: "It should be noted, however, that", tag: "passive", cz: "Neosobní formule pro ústupku – vhodný neutrální registr."},
    {q: "I am inclined to believe that", tag: "hedging", cz: "Zdvořile vyjádřený názor místo opakovaného „In my opinion“."}
  ]},

 {id: "e07", topic: "Města", title: "Improving life in cities",
  context: "Your class has listened to a radio programme about facilities that improve life for people living in cities. You have made the notes below.",
  question: "Which facilities do most to improve the quality of life in cities?",
  points: ["parks and green spaces", "public libraries", "community centres"],
  opinions: ["“A park is the only place where city people can breathe.”", "“Libraries are about much more than books these days.”", "“Lonely people need somewhere to meet.”"],
  task: "Write an essay discussing two of the facilities in your notes. You should explain which facility does more to improve the quality of life, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Více lidí žije ve městech; kvalita života nejen o bydlení a práci. Rozebereš parky a knihovny."},
    {h: "Parky", t: "Fyzické a duševní zdraví, chlad v létě, setkávání. Příklad."},
    {h: "Knihovny", t: "Nejen knihy – internet, kurzy, tiché místo zdarma; ústupka: méně návštěvníků díky internetu."},
    {h: "Závěr", t: "Parky mají širší dopad (všechny věkové skupiny, zdraví, klima)."}
  ],
  model: `As an ever greater proportion of the world's population moves to urban areas, the question of what makes a city pleasant to live in has become increasingly pressing. While housing and employment are obviously crucial, shared public facilities also play a significant role. Two that are frequently mentioned are parks and public libraries.

Parks and green spaces offer city dwellers a rare chance to escape noise and traffic. Research suggests that even a short walk among trees can reduce stress, and parks provide free space for exercise, children's play and informal meetings between neighbours. In addition, green areas help to cool cities during increasingly frequent heatwaves, a benefit that will only grow in importance as the climate changes.

Libraries, for their part, have quietly reinvented themselves. Far from being mere collections of books, many now offer free internet access, language courses and a warm, quiet place to study. For people without a computer at home or space to work, they can be a genuine lifeline. Admittedly, visitor numbers have fallen in some cities, as more people read and research online, which has made libraries an easy target for budget cuts.

In my opinion, parks do more to improve the quality of life in cities. While libraries serve particular groups extremely well, green spaces benefit virtually everyone, from toddlers to pensioners, and they support both physical and mental health. Moreover, they help cities adapt to a warming climate, which is a contribution no other public facility can match.`,
  callouts: [
    {q: "As an ever greater proportion of the world's population moves to urban areas", tag: "complex", cz: "Vedlejší věta s „as“ (= protože/jak) a stupňováním „ever greater“."},
    {q: "Research suggests that even a short walk", tag: "hedging", cz: "„Research suggests“ – opatrně podložené tvrzení bez vymyšlených čísel."},
    {q: "Far from being mere collections of books", tag: "complex", cz: "Far from + -ing = „zdaleka ne“, elegantní kontrast."},
    {q: "which is a contribution no other public facility can match", tag: "reference", cz: "Vztažné „which“ odkazuje na celou předchozí myšlenku – koheze."}
  ]},

 {id: "e08", topic: "Cestování", title: "The impact of tourism",
  context: "Your class has attended a panel discussion on how the negative effects of mass tourism can be reduced. You have made the notes below.",
  question: "How can the negative effects of mass tourism be reduced?",
  points: ["limiting visitor numbers", "introducing tourist taxes", "promoting less-visited destinations"],
  opinions: ["“Some historic centres are simply full.”", "“Visitors should pay for the damage they cause.”", "“There are hundreds of beautiful towns nobody has heard of.”"],
  task: "Write an essay discussing two of the methods in your notes. You should explain which method would be more effective, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Přeplněná historická centra, rostoucí nájmy; rozebereš limity návštěvníků a turistické daně."},
    {h: "Limity návštěvníků", t: "Přímá ochrana památek a místních; ústupka: složité vymáhání, ztráta příjmů."},
    {h: "Turistické daně", t: "Příjmy na údržbu a infrastrukturu; ale bohaté turisty neodradí – počet neklesne."},
    {h: "Závěr", t: "Limity účinnější pro nejvíc zatížená místa; daně jen doplněk."}
  ],
  model: `In many of the world's most popular destinations, the sheer volume of visitors has begun to threaten the very attractions that draw them. Narrow streets are blocked by crowds, rents soar as flats are converted for short-term lets, and local residents feel increasingly pushed out. Limiting visitor numbers and introducing tourist taxes are two frequently proposed remedies.

Restricting the number of visitors addresses overcrowding directly. A city might require tourists to book a time slot for its historic centre, or cap the number of cruise ships allowed to dock each day. Such measures protect fragile monuments and allow residents to go about their daily lives. Admittedly, they can be difficult to enforce, and businesses that depend on tourism may suffer a loss of income in the short term.

Tourist taxes, by contrast, aim to make visitors contribute to the costs they create. The money raised can be spent on cleaning, maintenance and public transport, and a modest nightly charge is unlikely to deter most travellers. Paradoxically, however, this is precisely the weakness of the approach: if a tax is too low to discourage anyone, it raises money without actually reducing the crowds.

Weighing up the two methods, I would argue that limiting visitor numbers is the more effective. Taxes certainly have their place, particularly as a way of funding repairs, but they treat the symptoms rather than the cause. For places that are already at breaking point, only a firm limit can guarantee that they remain liveable for residents and enjoyable for visitors alike.`,
  callouts: [
    {q: "threaten the very attractions that draw them", tag: "collocation", cz: "„the very“ = právě ty; zdůraznění paradoxu."},
    {q: "Such measures protect fragile monuments", tag: "reference", cz: "„Such measures“ odkazuje na předchozí příklady – kohezní prostředek."},
    {q: "Paradoxically, however, this is precisely the weakness of the approach", tag: "linker", cz: "Kombinace hodnoticího příslovce a kontrastu – sofistikovaný protiargument."},
    {q: "they treat the symptoms rather than the cause", tag: "evaluative", cz: "Metafora z medicíny – vyjadřuje kritiku stručně a výstižně."}
  ]},

 {id: "e09", topic: "Média", title: "Protecting people from misinformation",
  context: "Your class has attended a lecture on how people can be protected from false information online. You have made the notes below.",
  question: "What is the best way to protect people from false information online?",
  points: ["teaching media literacy in schools", "regulating social media platforms", "supporting independent fact-checkers"],
  opinions: ["“Young people need to learn to question what they read.”", "“The platforms make money from spreading lies.”", "“Nobody reads fact-checks anyway.”"],
  task: "Write an essay discussing two of the ways in your notes. You should explain which way is more effective, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Rychlé šíření nepravd na sociálních sítích; rozebereš mediální gramotnost a regulaci platforem."},
    {h: "Mediální gramotnost", t: "Kritické myšlení, ověřování zdrojů; trvalá dovednost, ale pomalé a dospělí se k ní nedostanou."},
    {h: "Regulace platforem", t: "Algoritmy podporují senzace; povinnost odstraňovat obsah; ústupka: riziko cenzury."},
    {h: "Závěr", t: "Mediální gramotnost účinnější – lidé si odnesou dovednost na jakoukoli platformu."}
  ],
  model: `False information has always existed, but social media allow it to spread further and faster than ever before. A misleading claim can reach millions of people within hours, often long before anyone has had the chance to correct it. This essay considers whether education or regulation offers the better defence.

Teaching media literacy in schools aims to give young people the tools to judge information for themselves. Students who learn to check sources, recognise manipulated images and ask who benefits from a particular story are far less likely to be taken in. Crucially, this is a skill that stays with them for life and applies to any platform, including those that do not yet exist. Its main limitation is that it does little for older adults, who are, according to some studies, the group most likely to share false stories.

Regulating social media platforms, on the other hand, targets the channels through which misinformation travels. Since their algorithms tend to reward content that provokes strong emotions, platforms could be required to reduce the reach of posts flagged as false. However, regulation raises difficult questions about who decides what counts as false, and heavy-handed rules could easily slide into censorship.

On balance, I believe that media literacy is the more effective approach. Regulation will always lag behind technology and risks restricting legitimate debate, whereas a critical, well-informed public is the most reliable protection a society can have. Ideally, though, education should be extended beyond the classroom so that it reaches people of all ages.`,
  callouts: [
    {q: "often long before anyone has had the chance to correct it", tag: "complex", cz: "Časová vedlejší věta s předpřítomným časem – přesné vyjádření posloupnosti."},
    {q: "are far less likely to be taken in", tag: "collocation", cz: "be taken in = nechat se napálit; frázové sloveso v trpném rodě."},
    {q: "who are, according to some studies, the group most likely to share false stories", tag: "hedging", cz: "Vsuvka „according to some studies“ zmírňuje tvrzení a odkazuje na zdroj."},
    {q: "heavy-handed rules could easily slide into censorship", tag: "evaluative", cz: "Silné hodnoticí přídavné jméno heavy-handed a metafora slide into."}
  ]},

 {id: "e10", topic: "Společnost", title: "Supporting older people",
  context: "Your class has watched a documentary about how society can better support older people. You have made the notes below.",
  question: "How can society best support older people?",
  points: ["suitable housing", "technology training", "volunteering opportunities"],
  opinions: ["“Many elderly people are trapped in homes they can no longer manage.”", "“Without the internet, you’re cut off from everything.”", "“Older people have so much experience to offer.”"],
  task: "Write an essay discussing two of the ways in your notes. You should explain which way is more important, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Stárnoucí populace; nejde jen o zdravotní péči. Rozebereš vhodné bydlení a školení v technologiích."},
    {h: "Bydlení", t: "Bezbariérové byty, bydlení blízko služeb, nezávislost; ale drahé a pomalé."},
    {h: "Technologie", t: "Online banka, lékař, kontakt s rodinou; boj proti izolaci; levné, rychlé."},
    {h: "Závěr", t: "Bydlení důležitější – bez bezpečného domova technologie nepomůže; zdůvodnění."}
  ],
  model: `In most developed countries, people are living longer than ever, and the proportion of the population over the age of seventy is rising steadily. Supporting this generation involves far more than providing medical care, and two areas that deserve attention are suitable housing and training in the use of technology.

Suitable housing is fundamental to older people's independence. Many live in houses that were ideal when they were raising families but have since become difficult to heat, clean or even move around. Homes with step-free access, adapted bathrooms and nearby shops would allow people to remain independent for much longer, thus reducing the need for expensive residential care. The drawback is that building such homes requires substantial investment and careful planning, so progress is inevitably slow.

Technology training, meanwhile, could make an immediate difference. Today, everything from booking a doctor's appointment to paying bills is increasingly done online, and those who cannot use a smartphone risk being excluded from basic services. Short, patient courses could also enable older people to keep in touch with relatives by video call, which may go some way towards easing loneliness.

Although technology training is cheaper and quicker to deliver, I would maintain that suitable housing is the more important of the two. A person who is afraid of falling on the stairs or cannot afford to heat their home will gain little from learning to use a tablet. Only when people feel safe and comfortable at home can other forms of support make a real difference.`,
  callouts: [
    {q: "Suitable housing is fundamental to older people's independence.", tag: "topic", cz: "Topic sentence s přesným slovem „fundamental to“."},
    {q: "thus reducing the need for expensive residential care", tag: "complex", cz: "Participiální konstrukce „thus + -ing“ vyjadřuje důsledek bez nové věty."},
    {q: "which may go some way towards easing loneliness", tag: "hedging", cz: "„go some way towards“ = částečně pomoci – typický hedging."},
    {q: "Only when people feel safe and comfortable at home can other forms of support", tag: "inversion", cz: "Inverze po „Only when“ v závěrečné větě – silná pointa."}
  ]},
 {id: "e11", topic: "Sport", title: "Hosting major sporting events",
  context: "Your class has attended a panel discussion on whether countries benefit from hosting major international sporting events. You have made the notes below.",
  question: "What are the main benefits for a country of hosting a major sporting event?",
  points: ["the economy", "infrastructure", "national pride"],
  opinions: ["“The tourists leave, but the debts stay.”", "“New stadiums and railways are used for decades.”", "“For a few weeks, the whole country feels united.”"],
  task: "Write an essay discussing two of the benefits in your notes. You should explain which benefit is more significant, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Země soupeří o pořadatelství; náklady obrovské. Rozebereš ekonomiku a infrastrukturu."},
    {h: "Ekonomika", t: "Turisté, pracovní místa, reklama země; ale často krátkodobé a dluhy."},
    {h: "Infrastruktura", t: "Doprava, stadiony, bydlení – dlouhodobé; podmínka: musí se plánovat i po akci."},
    {h: "Závěr", t: "Infrastruktura je významnější přínos – trvá desítky let, ekonomika jen týdny."}
  ],
  model: `Countries compete fiercely for the right to host events such as the Olympic Games or the football World Cup, often spending billions in the process. Supporters claim that the investment pays for itself, while sceptics point to abandoned stadiums and mounting debts. This essay looks at two of the benefits most commonly cited: economic gains and improved infrastructure.

The economic argument rests largely on tourism. During the event, hotels, restaurants and shops enjoy a surge in custom, and thousands of temporary jobs are created. Furthermore, the global television coverage can act as an advertisement for the host country, encouraging future visitors and investors. However, the evidence for lasting economic growth is mixed at best. Much of the spending is concentrated in a few weeks, and regular tourists sometimes stay away to avoid the crowds and inflated prices.

Improvements to infrastructure, by contrast, can benefit a country for generations. Hosting a major event often provides the political will to complete projects that would otherwise be delayed for years, such as new railway lines, airport terminals or the regeneration of neglected districts. Provided that these are planned with the needs of residents in mind, rather than simply for a fortnight of competition, they continue to serve the population long after the final medal has been awarded.

To my mind, improved infrastructure is by far the more significant benefit. The economic boost tends to be short-lived and unevenly distributed, whereas a well-designed transport network or a revitalised neighbourhood remains a lasting legacy that ordinary citizens use every day.`,
  callouts: [
    {q: "However, the evidence for lasting economic growth is mixed at best.", tag: "hedging", cz: "„mixed at best“ – opatrné, ale kritické hodnocení důkazů."},
    {q: "that would otherwise be delayed for years", tag: "conditional", cz: "„would otherwise“ = jinak by – skrytá podmínka v trpném rodě."},
    {q: "Provided that these are planned with the needs of residents in mind", tag: "conditional", cz: "Provided that = za předpokladu, že; pestřejší než if."},
    {q: "long after the final medal has been awarded", tag: "passive", cz: "Pasivum v předpřítomném čase v časové větě – přesné a obrazné."}
  ]},

 {id: "e12", topic: "Spotřeba", title: "Reducing consumer waste",
  context: "Your class has listened to a radio discussion about how consumers can be encouraged to waste less. You have made the notes below.",
  question: "How can consumers be encouraged to waste less?",
  points: ["making repairs cheaper and easier", "laws on packaging", "promoting second-hand shopping"],
  opinions: ["“It’s often cheaper to buy a new phone than to fix the old one.”", "“Supermarkets wrap everything in plastic.”", "“Buying second-hand used to be embarrassing – not any more.”"],
  task: "Write an essay discussing two of the ways in your notes. You should explain which way would be more effective, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Kultura „kup a vyhoď“; rozebereš opravy a zákony o obalech."},
    {h: "Opravy", t: "Opravit je dražší než koupit nové; právo na opravu, náhradní díly, nižší DPH na opravy."},
    {h: "Obaly", t: "Zákony mění chování výrobců i obchodů automaticky; ale přesouvají odpad, ne vždy snižují."},
    {h: "Závěr", t: "Opravy účinnější – řeší věci s velkou ekologickou stopou a mění myšlení."}
  ],
  model: `Modern economies rely on a cycle of buying, using and discarding, and its environmental cost is becoming impossible to ignore. Two strategies that could help to break the cycle are making repairs more accessible and introducing stricter laws on packaging.

At present, many consumers discard broken goods simply because repairing them makes little financial sense. A cracked phone screen or a faulty washing machine can cost almost as much to fix as to replace, and spare parts are often unavailable. If manufacturers were obliged to supply parts for a minimum number of years, and repairs were taxed at a lower rate, mending things would once again become the obvious choice. What is more, the items concerned, particularly electronics, require vast amounts of energy and raw materials to produce, so extending their lifespan has a considerable impact.

Packaging laws, on the other hand, place the responsibility on businesses rather than individuals. Banning unnecessary plastic wrapping or requiring packaging to be recyclable would reduce waste automatically, without consumers having to make any special effort. Nonetheless, such laws sometimes merely shift the problem, for example when plastic is replaced by heavier materials whose production generates even more emissions.

All in all, I am convinced that cheaper, easier repairs would be more effective. Packaging is the most visible form of waste, but it is far from the most damaging. By encouraging people to value and maintain what they already own, repair schemes could bring about a genuine change in attitudes, which is ultimately what a less wasteful society requires.`,
  callouts: [
    {q: "If manufacturers were obliged to supply parts for a minimum number of years, and repairs were taxed at a lower rate", tag: "conditional", cz: "Kondicionál 2. typu s pasivem ve dvou podmínkách – precizní návrh."},
    {q: "What is more, the items concerned", tag: "linker", cz: "What is more = navíc; „the items concerned“ = dané předměty (postpozice)."},
    {q: "Nonetheless, such laws sometimes merely shift the problem", tag: "concession", cz: "Protiargument se slovem merely (pouze) – kritika bez přehánění."},
    {q: "but it is far from the most damaging", tag: "evaluative", cz: "far from = zdaleka ne; působivý kontrast."}
  ]},

 {id: "e13", topic: "Věda", title: "Funding scientific research",
  context: "Your class has attended a lecture on how governments decide which areas of scientific research to fund. You have made the notes below.",
  question: "Which areas of scientific research should receive more government funding?",
  points: ["medical research", "renewable energy", "space exploration"],
  opinions: ["“Curing diseases should always come first.”", "“If we don’t solve the energy problem, nothing else will matter.”", "“Space research has given us countless everyday inventions.”"],
  task: "Write an essay discussing two of the areas in your notes. You should explain which area should receive more funding, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Omezené prostředky, nutnost priorit. Rozebereš medicínu a vesmírný výzkum."},
    {h: "Medicína", t: "Přímý dopad na životy; příklady (vakcíny); ústupka: farmaceutické firmy už investují."},
    {h: "Vesmír", t: "Vedlejší objevy (satelity, materiály), inspirace; ale vzdálené a drahé."},
    {h: "Závěr", t: "Medicína má přednost – okamžitý přínos pro všechny; vesmír spíš soukromé zdroje."}
  ],
  model: `Since no government can afford to fund every promising scientific project, difficult choices have to be made about where public money should go. Medical research and space exploration illustrate the dilemma particularly well, as both have passionate supporters and very different goals.

Medical research has the most direct impact on human well-being. Advances in this field, from vaccines to new cancer treatments, have saved millions of lives and continue to extend life expectancy across the world. It might be objected that pharmaceutical companies already invest heavily in research, so public money is unnecessary. Yet private firms naturally focus on profitable drugs, while rare diseases and conditions that mainly affect poorer countries are frequently neglected. It is precisely here that public funding is essential.

Space exploration, by contrast, is often dismissed as an expensive luxury. Its defenders argue that it has produced a remarkable number of practical spin-offs, including satellite navigation, weather forecasting and new materials, and that it inspires young people to pursue careers in science. These are valid points. Nevertheless, the benefits are largely indirect and uncertain, and the costs of a single mission could fund hundreds of medical studies.

Having weighed up both areas, I would argue that medical research deserves a greater share of government funding. Its benefits are immediate, measurable and available to everyone, whereas the rewards of space exploration may take decades to materialise. Moreover, private companies are increasingly willing to finance space projects themselves, which suggests that public resources can be directed elsewhere without bringing such exploration to a halt.`,
  callouts: [
    {q: "It might be objected that pharmaceutical companies already invest heavily", tag: "passive", cz: "Neosobní předjímání námitky – „It might be objected that…“ je velmi akademické."},
    {q: "It is precisely here that public funding is essential.", tag: "cleft", cz: "Vytýkací věta zdůrazňuje místo, kde má veřejné financování smysl."},
    {q: "These are valid points. Nevertheless,", tag: "concession", cz: "Krátké uznání protistrany a pak obrat – efektivní ústupka."},
    {q: "may take decades to materialise", tag: "hedging", cz: "may + materialise (uskutečnit se) – opatrné, přesné sloveso."}
  ]},

 {id: "e14", topic: "Vzdělávání", title: "Learning a foreign language",
  context: "Your class has attended a panel discussion on what helps people learn a foreign language successfully. You have made the notes below.",
  question: "What contributes most to learning a foreign language successfully?",
  points: ["a good teacher", "spending time abroad", "using technology"],
  opinions: ["“A great teacher can make anyone love a language.”", "“You never really learn until you have to survive in the language.”", "“Apps let you practise whenever you have five minutes.”"],
  task: "Write an essay discussing two of the factors in your notes. You should explain which factor contributes more, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Jazyky klíčové v globálním světě; rozebereš učitele a pobyt v zahraničí."},
    {h: "Učitel", t: "Struktura, zpětná vazba, motivace; ústupka: ne všichni mají přístup k dobrému učiteli."},
    {h: "Pobyt v zahraničí", t: "Ponoření, nutnost komunikovat, kultura; ale bez základů se člověk drží svých krajanů."},
    {h: "Závěr", t: "Učitel přispívá víc – dává základy, díky nimž pobyt v zahraničí vůbec funguje."}
  ],
  model: `In an increasingly interconnected world, the ability to speak a foreign language is a valuable asset, yet many people spend years studying without ever feeling confident. What, then, distinguishes those who succeed from those who give up? Two factors often mentioned are the teacher and time spent abroad.

A good teacher provides far more than grammar explanations. They structure the learning process, correct errors before they become ingrained and, perhaps most importantly, keep learners motivated when progress seems slow. Many successful speakers can name a particular teacher who sparked their enthusiasm. It must be admitted, though, that access to inspiring teachers is uneven, and even the best teacher can only do so much in a few hours a week.

Spending time abroad, on the other hand, offers total immersion. Learners are forced to use the language to shop, travel and make friends, and they absorb natural expressions and pronunciation in a way that no classroom can replicate. Having said that, the experience is not automatically effective. Those who arrive with a weak foundation often struggle to communicate and end up socialising mainly with people from their own country.

On reflection, I would say that a good teacher contributes more to success. Time abroad is undoubtedly valuable, but it is most beneficial for learners who have already built a solid foundation, and that foundation is precisely what a skilled teacher provides. In other words, a good teacher not only produces progress in the classroom but also makes the most of every later opportunity to use the language.`,
  callouts: [
    {q: "correct errors before they become ingrained", tag: "collocation", cz: "ingrained = zakořeněný; přesné méně běžné slovo (Language 5)."},
    {q: "even the best teacher can only do so much", tag: "hedging", cz: "can only do so much = má své limity; idiomatická ústupka."},
    {q: "in a way that no classroom can replicate", tag: "complex", cz: "Vztažná věta s negativním podmětem – silné tvrzení."},
    {q: "Having said that, the experience is not automatically effective.", tag: "concession", cz: "Having said that = přesto; ústupka uvnitř odstavce."}
  ]},

 {id: "e15", topic: "Práce", title: "Helping young people find work",
  context: "Your class has watched a documentary about youth unemployment. You have made the notes below.",
  question: "How can young people best be helped to find their first job?",
  points: ["better careers advice at school", "paid internships", "government support for employers who hire young people"],
  opinions: ["“Most teenagers have no idea what jobs actually exist.”", "“Unpaid internships are only for the rich.”", "“Companies need a reason to take a risk on someone without experience.”"],
  task: "Write an essay discussing two of the ways in your notes. You should explain which way is more effective, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Začarovaný kruh: bez zkušeností práce, bez práce zkušenosti. Rozebereš kariérní poradenství a placené stáže."},
    {h: "Kariérní poradenství", t: "Přehled o profesích, CV, pohovor; ale samo o sobě nevytváří pracovní místa."},
    {h: "Placené stáže", t: "Reálná zkušenost, reference, kontakt s firmou; placené = dostupné všem."},
    {h: "Závěr", t: "Placené stáže efektivnější – prolomí kruh; poradenství je doplněk."}
  ],
  model: `For many young people, finding a first job feels like a trap: employers want experience, but experience can only be gained through employment. Breaking this cycle is essential, as long periods of unemployment early in life can damage confidence and earning potential for years. Better careers advice and paid internships are two possible solutions.

Careers advice at school is often surprisingly limited. Many teenagers are aware of only a handful of professions, usually those of their parents or those they see on television, and they leave school with little idea of how to write a convincing application. Well-informed advisers could broaden their horizons, help them identify their strengths and prepare them for interviews. The weakness of this approach, however, is that advice alone does not create opportunities; it merely helps young people compete for the few that exist.

Paid internships tackle the problem more directly. By spending several months in a real company, young people acquire practical skills, a reference and, in many cases, an offer of permanent employment. The fact that they are paid is crucial, since unpaid placements are only realistic for those whose families can support them, which effectively excludes many talented candidates.

In my view, paid internships are the more effective of the two measures. Careers advice is certainly helpful, but it cannot by itself overcome employers' reluctance to hire someone without experience. Internships, in contrast, give young people exactly what they lack, and they give employers the chance to discover talent they might otherwise have overlooked.`,
  callouts: [
    {q: "employers want experience, but experience can only be gained through employment", tag: "passive", cz: "Pasivum s modálním slovesem; dvojtečka uvádí paradox."},
    {q: "it merely helps young people compete for the few that exist", tag: "reference", cz: "„the few“ odkazuje zpět na opportunities – vyhnutí se opakování."},
    {q: "The fact that they are paid is crucial", tag: "complex", cz: "The fact that… jako podmět – pokročilá struktura."},
    {q: "talent they might otherwise have overlooked", tag: "conditional", cz: "might have + příčestí = smíšený/třetí kondicionál bez if."}
  ]},

 {id: "e16", topic: "Životní prostředí", title: "Individual action on the environment",
  context: "Your class has attended a lecture on how individuals can help to protect the environment. You have made the notes below.",
  question: "In which area can individuals do most to protect the environment?",
  points: ["diet", "travel", "energy use at home"],
  opinions: ["“Eating less meat is the single biggest change most people can make.”", "“One long-haul flight cancels out a year of recycling.”", "“Turning the heating down a degree makes a real difference.”"],
  task: "Write an essay discussing two of the areas in your notes. You should explain in which area individuals can do more, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Pocit bezmoci jednotlivce; přesto osobní rozhodnutí mají vliv. Rozebereš stravu a cestování."},
    {h: "Strava", t: "Méně masa – emise, půda, voda; snadné, denně; ústupka: kulturní zvyky."},
    {h: "Cestování", t: "Lety mají obrovskou stopu; vlak místo letadla; ale ne vždy reálné (vzdálenost, cena)."},
    {h: "Závěr", t: "Cestování – jediný let se rovná měsícům úspor; pro lidi, kteří létají, největší dopad."}
  ],
  model: `Faced with the scale of climate change, many people feel that their own actions are too insignificant to matter. Yet individual choices add up, and some matter far more than others. Two areas in which personal decisions have a considerable impact are diet and travel.

Diet is an area where change is both possible and frequent, since we make decisions about food several times a day. Meat production, and beef in particular, is responsible for a large share of agricultural emissions, as well as deforestation and heavy water use. Simply replacing meat with plant-based meals a few times a week can noticeably reduce a person's footprint. Admittedly, eating habits are closely tied to culture and family tradition, and many people are reluctant to give up dishes they grew up with.

Travel, on the other hand, involves fewer but much larger decisions. A single return flight between Europe and Asia can generate more emissions than many months of careful eating. For those who fly regularly, choosing the train for shorter journeys or taking one long holiday instead of several short breaks could therefore make a dramatic difference. That said, alternatives to flying are not always realistic, being slower and, in many cases, more expensive.

Taking all this into account, I would argue that travel is where individuals can achieve most, at least those who fly frequently. Changing one's diet is valuable and easier to sustain, but no amount of vegetarian meals can compensate for regular air travel. Reducing flights is therefore the most powerful step many people can take.`,
  callouts: [
    {q: "Diet is an area where change is both possible and frequent", tag: "topic", cz: "Topic sentence s vztažným „where“ a konstrukcí both… and."},
    {q: "Meat production, and beef in particular, is responsible for", tag: "complex", cz: "Vsuvka „and beef in particular“ – shoda slovesa zůstává se singulárním podmětem."},
    {q: "being slower and, in many cases, more expensive", tag: "complex", cz: "Participiální konstrukce „being…“ vysvětluje důvod bez další věty."},
    {q: "no amount of vegetarian meals can compensate for", tag: "evaluative", cz: "„no amount of… can…“ = žádné množství… nevyváží; důrazné hodnocení."}
  ]},

 {id: "e17", topic: "Společnost", title: "Community life",
  context: "Your class has listened to a radio discussion about how people can be encouraged to take part in the life of their local community. You have made the notes below.",
  question: "How can more people be encouraged to take part in the life of their local community?",
  points: ["organising local events", "volunteering schemes", "online neighbourhood groups"],
  opinions: ["“A street party does more for a neighbourhood than any council policy.”", "“People want to help, but they don’t know where to start.”", "“Online groups are mostly people complaining about parking.”"],
  task: "Write an essay discussing two of the ways in your notes. You should explain which way is more effective, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Lidé neznají sousedy, osamělost; rozebereš místní akce a dobrovolnické programy."},
    {h: "Místní akce", t: "Snadný první krok, zábava, všechny generace; ale jednorázové, kontakty nevydrží."},
    {h: "Dobrovolnictví", t: "Pravidelnost, smysluplnost, trvalé vztahy; lidé chtějí pomáhat, ale nevědí kde – programy to usnadní."},
    {h: "Závěr", t: "Dobrovolnické programy účinnější – vytvářejí trvalé zapojení; akce jsou vstupní brána."}
  ],
  model: `It is often said that people today know more about celebrities than about their own neighbours. Busy schedules, long commutes and online entertainment have all contributed to a decline in community life, with loneliness among the consequences. Local events and volunteering schemes are two ways in which this trend might be reversed.

Local events, such as street parties, markets or open-air concerts, have the great advantage of being informal and enjoyable. They require no long-term commitment, so even the shyest residents may be tempted to drop by, and they bring together people of different ages and backgrounds who would otherwise rarely meet. Such events, however, are by their nature occasional. A pleasant conversation at a summer festival does not necessarily lead to any lasting connection.

Volunteering schemes, by contrast, involve people in their community on a regular basis. Whether it is reading with children at a local school or delivering meals to elderly residents, volunteering gives people a sense of purpose and creates relationships that develop over time. Surveys suggest that many people would like to volunteer but simply do not know how to get involved, which is exactly the gap that a well-organised scheme can fill.

On balance, I believe volunteering schemes are the more effective way of strengthening community life. Events can certainly break the ice, but it is regular, shared activity that turns neighbours into friends. Ideally, of course, local events could serve as an introduction to volunteering, combining the appeal of the former with the lasting benefits of the latter.`,
  callouts: [
    {q: "It is often said that people today know more about celebrities", tag: "passive", cz: "Neosobní „It is often said that…“ – efektní začátek eseje."},
    {q: "even the shyest residents may be tempted to drop by", tag: "collocation", cz: "drop by = zastavit se; frázové sloveso v neutrálním registru je v pořádku."},
    {q: "Whether it is reading with children at a local school or delivering meals", tag: "complex", cz: "Whether… or… uvádí příklady elegantně v jedné větě."},
    {q: "combining the appeal of the former with the lasting benefits of the latter", tag: "reference", cz: "the former / the latter – kohezní odkazy na dvě dříve zmíněné věci."}
  ]},

 {id: "e18", topic: "Technologie", title: "Artificial intelligence",
  context: "Your class has attended a lecture on the areas of daily life in which artificial intelligence could bring the greatest benefits. You have made the notes below.",
  question: "In which areas could artificial intelligence bring the greatest benefits?",
  points: ["healthcare", "education", "transport"],
  opinions: ["“AI can spot diseases that doctors miss.”", "“Every student could have a personal tutor.”", "“Self-driving cars still aren’t safe enough.”"],
  task: "Write an essay discussing two of the areas in your notes. You should explain in which area AI could bring greater benefits, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "AI vyvolává nadšení i obavy; rozebereš zdravotnictví a vzdělávání."},
    {h: "Zdravotnictví", t: "Diagnostika ze snímků, rychlost, nedostatek lékařů; ústupka: odpovědnost za chyby, data."},
    {h: "Vzdělávání", t: "Individuální tempo, okamžitá zpětná vazba; riziko: podvádění, méně lidského kontaktu."},
    {h: "Závěr", t: "Zdravotnictví – přínos měřitelný v zachráněných životech; AI jako pomocník lékaře."}
  ],
  model: `Few technologies have provoked as much excitement, and as much anxiety, as artificial intelligence. While some fear that it will replace human workers, others believe it could solve problems that have defeated us for decades. Healthcare and education are two areas in which its potential is particularly striking.

In healthcare, AI is already proving its worth. Systems trained on vast numbers of medical images can detect early signs of certain cancers or eye diseases, sometimes noticing details that a tired specialist might miss. Given that many countries face a shortage of doctors, such tools could shorten waiting times and allow staff to concentrate on patients who need them most. There are, of course, serious questions to be resolved, not least who is responsible when an algorithm makes a mistake and how sensitive patient data should be protected.

In education, AI offers the prospect of a personal tutor for every learner. A program can adjust the difficulty of exercises to each student's level and provide instant feedback, something a teacher with thirty pupils simply cannot do. On the other hand, students may use AI to complete assignments rather than to learn, and that screen-based tutoring may reduce valuable human contact.

Weighing up the two, I would argue that healthcare is where AI could bring the greatest benefits. Its contribution there can be measured in lives saved and illnesses caught early, which few other applications can claim. As long as it supports doctors rather than replacing them, its advantages would appear to outweigh the risks considerably.`,
  callouts: [
    {q: "Few technologies have provoked as much excitement, and as much anxiety, as artificial intelligence.", tag: "complex", cz: "Srovnání as much… as s vsuvkou – poutavý úvod."},
    {q: "Given that many countries face a shortage of doctors", tag: "linker", cz: "Given that = vzhledem k tomu, že; formální příčinná spojka."},
    {q: "not least who is responsible when an algorithm makes a mistake", tag: "collocation", cz: "not least = v neposlední řadě / zejména."},
    {q: "its advantages would appear to outweigh the risks considerably", tag: "hedging", cz: "would appear to = zdá se; akademický hedging."}
  ]},

 {id: "e19", topic: "Zdraví", title: "Stress among students",
  context: "Your class has attended a panel discussion on how stress among students can be reduced. You have made the notes below.",
  question: "How can stress among students be reduced?",
  points: ["reducing the amount of homework and testing", "more time for sport and leisure", "access to counselling services"],
  opinions: ["“Students are tested so often that they never get a break.”", "“Exercise is the best cure for anxiety.”", "“Talking to someone can make all the difference.”"],
  task: "Write an essay discussing two of the ways in your notes. You should explain which way would be more effective, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Rostoucí stres a úzkost studentů; rozebereš méně testů/úkolů a poradenství."},
    {h: "Méně testů", t: "Řeší příčinu; čas na odpočinek a spánek; ale obava ze snížení standardů."},
    {h: "Poradenství", t: "Pomoc s krizí, ale řeší následky; odborníci; stigma, čekací lhůty."},
    {h: "Závěr", t: "Snížení zátěže účinnější – prevence lepší než léčba; poradenství pro vážné případy."}
  ],
  model: `Surveys in many countries indicate that a growing number of students suffer from stress and anxiety, sometimes severe enough to affect their health. While a certain amount of pressure can be motivating, there is little doubt that, for many young people, the balance has tipped too far. Two possible responses are reducing workload and providing counselling.

Reducing the amount of homework and testing would address one of the main sources of pressure directly. When students face assessments almost every week, they rarely have the opportunity to rest, pursue hobbies or even sleep properly. Fewer, better-designed tests would allow them to learn more deeply rather than simply memorising material for the next exam. Opponents of this idea fear that standards would fall, but there is little evidence that constant testing leads to better learning.

Counselling services, on the other hand, offer support to students who are already struggling. A trained counsellor can help a young person put their worries into perspective and develop strategies for coping with pressure, and in serious cases may even prevent a crisis. However, such services deal with the consequences of stress rather than its causes. Furthermore, many students hesitate to seek help, fearing that they will be seen as weak, and waiting lists can be long.

All things considered, I believe that reducing homework and testing would be more effective. Counselling is undeniably essential for those in difficulty, but it would be far better to prevent so many students from reaching that point in the first place. As the saying goes, prevention is better than cure.`,
  callouts: [
    {q: "there is little doubt that, for many young people, the balance has tipped too far", tag: "opinion", cz: "„there is little doubt“ + metafora – názor bez „I think“."},
    {q: "Opponents of this idea fear that standards would fall, but there is little evidence", tag: "concession", cz: "Předjímání námitky a její vyvrácení v jedné větě."},
    {q: "fearing that they will be seen as weak", tag: "passive", cz: "Participium + pasivum: důvod vyjádřený úsporně."},
    {q: "in the first place", tag: "collocation", cz: "in the first place = vůbec / už od začátku; přirozený idiom."}
  ]},

 {id: "e20", topic: "Kultura", title: "Preserving local traditions",
  context: "Your class has watched a documentary about how local traditions can be preserved in a globalised world. You have made the notes below.",
  question: "What is the most effective way to preserve local traditions?",
  points: ["teaching them in schools", "tourism", "the media"],
  opinions: ["“If children don’t learn the old songs, they will disappear.”", "“Tourists turn traditions into shows for cameras.”", "“A single TV programme can make an old craft fashionable again.”"],
  task: "Write an essay discussing two of the ways in your notes. You should explain which way is more effective, giving reasons in support of your answer.",
  scaffold: [
    {h: "Úvod", t: "Globalizace sjednocuje kulturu; tradice mizí. Rozebereš školy a cestovní ruch."},
    {h: "Školy", t: "Předávání generacím, hrdost, všichni žáci; ale přetížené osnovy, riziko nudy."},
    {h: "Turismus", t: "Peníze a motivace řemeslníků; riziko komercializace a „divadla pro turisty“."},
    {h: "Závěr", t: "Školy účinnější – tradice musí žít v komunitě, ne jen jako představení."}
  ],
  model: `As global brands, films and music reach every corner of the world, many local customs are in danger of fading away. Crafts, dances and festivals that were once part of everyday life now survive only in older people's memories. If these traditions are to be preserved, two possible approaches are teaching them in schools and promoting them through tourism.

Schools are uniquely placed to pass traditions on, as they reach every child regardless of family background. Lessons in local songs, dialects or crafts can give young people a sense of pride in where they come from, and children who have learned a tradition themselves are more likely to hand it down to their own children. The difficulty is that school timetables are already overcrowded, and a tradition taught as a compulsory subject risks being seen as boring and old-fashioned.

Tourism, by contrast, can provide the financial incentive that keeps traditions alive. Visitors will often pay to watch a folk festival or buy handmade goods, allowing craftspeople to earn a living from skills that would otherwise die out. Yet there is a real danger that customs become performances staged purely for cameras, gradually losing their original meaning.

On balance, I would argue that teaching traditions in schools is the more effective approach. Tourism may keep certain traditions visible, but it can also transform them into commercial products. A tradition truly survives only when a community continues to practise it for its own sake, and this is far more likely to happen when it has been learned and valued from childhood.`,
  callouts: [
    {q: "If these traditions are to be preserved", tag: "conditional", cz: "„If… are to be…“ = má-li se…; formální podmínka účelu."},
    {q: "Schools are uniquely placed to pass traditions on", tag: "topic", cz: "Topic sentence s kolokací „uniquely placed to“."},
    {q: "skills that would otherwise die out", tag: "conditional", cz: "would otherwise – skrytý kondicionál; frázové sloveso die out."},
    {q: "A tradition truly survives only when a community continues to practise it for its own sake", tag: "complex", cz: "Silná závěrečná myšlenka s výrazem „for its own sake“ (pro ni samotnou)."}
  ]}
],

/* ---------- PART 2: choose one of three (letter/email, proposal, report, review) ---------- */
part2: [
 {id: "p01", type: "letter", register: "formal", title: "Letter to the editor: library closure",
  prompt: "You have read an article in your local newspaper about the council's plan to close the town's public library and use the building as a car park. You decide to write a letter to the editor.",
  require: ["explain why the library is important to the local community", "suggest how the library could attract more users"],
  instruction: "Write your letter. You do not need to include postal addresses.",
  scaffold: [
    {h: "Oslovení + účel", t: "Dear Sir or Madam, – reaguješ na článek, vyjádři nesouhlas."},
    {h: "Význam knihovny", t: "Kdo ji používá (senioři, studenti, rodiny), služby zdarma, místo setkávání."},
    {h: "Jak přilákat čtenáře", t: "2–3 konkrétní návrhy: delší otevírací doba, akce, kavárna, digitální služby."},
    {h: "Závěr", t: "Výzva radě, ať plán přehodnotí; Yours faithfully + jméno."}
  ],
  model: `Dear Sir or Madam,

I am writing in response to your article of 12 March concerning the council's proposal to close Hillside Library and convert the site into a car park. I was dismayed to read of this plan, which in my view seriously underestimates the role the library plays in our town.

For many residents, the library is far more than a place to borrow books. Elderly people who live alone rely on it as a warm, welcoming place to meet others, while students without a quiet space at home use it to study. It also offers free computer access, which is essential for those applying for jobs or benefits online. Replacing all this with parking spaces would send a deeply discouraging message about the town's priorities.

That said, I accept that visitor numbers have fallen, and the library needs to adapt. Extending opening hours into the evenings and weekends would make it accessible to people who work full-time. A small café could turn it into a social hub, and regular events such as author talks, homework clubs or language exchanges would draw in new visitors. Furthermore, if the library were promoted more actively on social media, many younger residents might discover what it offers for the first time.

I would therefore urge the council to reconsider its decision and to consult residents before taking any irreversible step. A modernised library could serve the community for decades; a car park cannot.

Yours faithfully,

Tomas Novak`,
  callouts: [
    {q: "I am writing in response to your article", tag: "register", cz: "Formální otevření – hned jasný účel a na co reaguješ."},
    {q: "That said, I accept that visitor numbers have fallen", tag: "concession", cz: "Ústupka posiluje důvěryhodnost: uznáš problém a navrhneš řešení."},
    {q: "if the library were promoted more actively on social media", tag: "conditional", cz: "Kondicionál 2. typu s pasivem – zdvořilý návrh."},
    {q: "I would therefore urge the council to reconsider its decision", tag: "recommend", cz: "Formální výzva k akci; urge = důrazně vyzvat."},
    {q: "a car park cannot", tag: "complex", cz: "Elipsa (vynechání slovesa) – úderná závěrečná pointa."}
  ]},

 {id: "p02", type: "email", register: "informal", title: "Email: a friend coming to study in your country",
  prompt: "You have received an email from your English-speaking friend, Sam. “I’ve been offered a place on a one-year course at a university in your country, but I’m not sure whether to accept. What do you think the biggest challenges would be? And what would I enjoy most about living there? Any advice would be great!”",
  require: ["the biggest challenges Sam would face", "what Sam would enjoy most", "advice on making the decision"],
  instruction: "Write your email.",
  scaffold: [
    {h: "Pozdrav + reakce", t: "Gratulace, nadšení, krátká osobní věta."},
    {h: "Výzvy", t: "Jazyk, byrokracie, zima/počasí – s praktickou radou."},
    {h: "Co si užije", t: "Cestování, ceny, studentský život, jídlo."},
    {h: "Rada + závěr", t: "Doporuč přijmout; nabídni pomoc; neformální rozloučení."}
  ],
  model: `Hi Sam,

Congratulations – that's fantastic news! I'm so glad you're even considering it, and I have to admit I'm being slightly selfish when I say I really hope you'll come.

Let's get the challenges out of the way first. The language is probably the biggest hurdle. Most students speak good English, but you'll find that older people and officials often don't, so dealing with things like registering with the police or opening a bank account can be a bit of a headache. My advice would be to pick up a few basic phrases before you arrive – people really appreciate the effort. The other thing is the winter. It's long, dark and pretty grey, so make sure you pack proper boots and a decent coat!

Having said that, I think you'd absolutely love living here. Everything is much cheaper than back home, so you'll actually be able to afford to eat out and travel. The trains are cheap too, and you could easily spend your weekends exploring castles, hiking in the mountains or popping over to Vienna or Berlin. Student life is great as well – there's always something going on, from concerts to film nights.

If I were you, I'd say yes. A year isn't that long, and even if some things turn out to be harder than you expect, you'll come back with amazing memories. And you'll have me to show you around, of course!

Let me know what you decide.

Take care,
Petra`,
  callouts: [
    {q: "Let's get the challenges out of the way first.", tag: "register", cz: "Neformální, ale strukturující věta – čtenář ví, co přijde."},
    {q: "can be a bit of a headache", tag: "collocation", cz: "Hovorový idiom vhodný pro kamaráda."},
    {q: "Having said that, I think you'd absolutely love living here.", tag: "linker", cz: "Přechod od problémů k pozitivům; stažené tvary sedí do registru."},
    {q: "If I were you, I'd say yes.", tag: "conditional", cz: "Klasická rada v kondicionálu – jasně odpovídá na třetí bod."},
    {q: "even if some things turn out to be harder than you expect", tag: "complex", cz: "even if + turn out to be – přirozená složitější struktura i v neformálním textu."}
  ]},

 {id: "p03", type: "letter", register: "formal", title: "Job application: festival volunteer coordinator",
  prompt: "You see this advertisement on an international arts festival website. “We are looking for enthusiastic people to help coordinate our team of volunteers during the two-week festival in July. Applicants should have good organisational skills and experience of working with people from different backgrounds. Write to us explaining why you would be suitable and what you would hope to gain from the experience.”",
  require: ["why you would be suitable for the role", "what you would hope to gain from the experience"],
  instruction: "Write your letter of application. You do not need to include postal addresses.",
  scaffold: [
    {h: "Účel", t: "Na jakou pozici a kde jsi inzerát viděl(a)."},
    {h: "Organizační schopnosti", t: "Konkrétní zkušenost (akce ve škole, brigáda) s výsledkem."},
    {h: "Práce s lidmi z různých prostředí", t: "Výměnný pobyt, jazyky, příklad řešení konfliktu."},
    {h: "Co chceš získat", t: "Zkušenosti z oboru, kontakty, rozvoj; závěr – dostupnost na pohovor, Yours sincerely/faithfully."}
  ],
  model: `Dear Sir or Madam,

I am writing to apply for the position of volunteer coordinator at this year's festival, as advertised on your website. As a final-year student of cultural management who has attended the festival twice as a visitor, I would be delighted to contribute to its success.

I believe my organisational skills make me well suited to the role. Last year I was responsible for planning my university's spring open day, which involved scheduling over forty student helpers, coordinating with catering staff and dealing with last-minute changes on the day itself. The event ran smoothly and was attended by more than a thousand visitors, which taught me the importance of clear communication and careful preparation.

I also have considerable experience of working with people from different backgrounds. During an exchange semester in Portugal, I lived with students from six countries, and I currently work part-time at a hostel reception, where resolving misunderstandings between guests is part of my daily routine. I speak English, German and Czech fluently, which would enable me to support international volunteers effectively.

In return, I would hope to gain first-hand insight into how a large-scale cultural event is managed, as this is the field in which I intend to build my career. I would also value the opportunity to learn from your experienced organisers and to develop my leadership skills under real pressure.

I would be happy to provide references and am available for an interview at your convenience. I look forward to hearing from you.

Yours faithfully,

Jana Dvorakova`,
  callouts: [
    {q: "as advertised on your website", tag: "register", cz: "Standardní formální obrat v žádosti o práci."},
    {q: "which involved scheduling over forty student helpers", tag: "complex", cz: "Vztažná věta s konkrétními fakty – důkaz místo prázdného tvrzení."},
    {q: "which would enable me to support international volunteers effectively", tag: "conditional", cz: "would enable – propojení dovednosti s potřebou zaměstnavatele."},
    {q: "In return, I would hope to gain first-hand insight", tag: "topic", cz: "Topic sentence jasně otevírá druhý bod zadání."},
    {q: "I look forward to hearing from you.", tag: "register", cz: "look forward to + -ing – pozor, častá chyba Čechů."}
  ]},

 {id: "p04", type: "email", register: "informal", title: "Email: advice on choosing between two jobs",
  prompt: "You have received an email from your English friend, Olivia. “I’ve got a dilemma! I’ve been offered two jobs: one is well paid in a big company in the city, the other is at a small environmental charity near my parents – much less money, but I’d love the work. Which do you think I should choose, and why? How did you make big decisions like this?”",
  require: ["which job Olivia should choose and why", "how you have made a big decision yourself"],
  instruction: "Write your email.",
  scaffold: [
    {h: "Reakce", t: "Gratulace ke dvěma nabídkám, pochopení dilematu."},
    {h: "Zvážení obou", t: "Výhody a nevýhody – peníze vs. smysl práce."},
    {h: "Doporučení", t: "Jasně: kterou a proč (tvoje zdůvodnění)."},
    {h: "Tvoje zkušenost", t: "Krátký příběh o vlastním rozhodnutí + co ses naučil(a); rozloučení."}
  ],
  model: `Hi Olivia,

Two job offers at once – you must be thrilled! I can see why you're torn, though. It's the classic choice between head and heart, isn't it?

Let's look at the city job first. The salary would obviously make life easier, and a big company might open doors later on. But from what you've told me in the past, you'd probably end up spending most of that extra money on rent and commuting, and I'm not sure you'd feel particularly proud of what you were doing all day.

The charity job, on the other hand, sounds like exactly the sort of thing you've always talked about. Yes, the money's tight, but living near your parents means your costs would be lower, and doing something you actually believe in is worth a lot. Honestly, if I were in your shoes, I'd go for the charity. You can always move to a bigger organisation in a few years, whereas jobs you're genuinely passionate about don't come along every day.

As for how I make big decisions, I'm not exactly an expert! When I was choosing between studying medicine and history, I made endless lists of pros and cons, but in the end they didn't help much. What finally worked was imagining myself a year later in each situation and noticing which one made me feel excited rather than anxious. I chose history and I haven't regretted it for a second.

Let me know what you decide – and good luck!

Love,
Marek`,
  callouts: [
    {q: "It's the classic choice between head and heart, isn't it?", tag: "register", cz: "Tázací dovětek (question tag) – přirozený neformální tón."},
    {q: "if I were in your shoes, I'd go for the charity", tag: "conditional", cz: "Idiom „in your shoes“ v kondicionálu – jasná odpověď na první bod."},
    {q: "whereas jobs you're genuinely passionate about don't come along every day", tag: "complex", cz: "whereas + vztažná věta bez who/that + frázové sloveso come along."},
    {q: "What finally worked was imagining myself a year later", tag: "cleft", cz: "Vytýkací věta s What… was… – i v neformálním textu ukazuje rozsah gramatiky."}
  ]},

 {id: "p05", type: "letter", register: "formal", title: "Complaint: a summer language course",
  prompt: "You recently attended a two-week summer language course abroad, but you were disappointed with several aspects of it. Write a letter to the director of the language school.",
  require: ["explain which aspects of the course did not match the description in the brochure", "say how the course could be improved", "state what you would like the school to do"],
  instruction: "Write your letter. You do not need to include postal addresses.",
  scaffold: [
    {h: "Účel", t: "Kdy a jaký kurz; že píšeš kvůli nespokojenosti."},
    {h: "Co neodpovídalo brožuře", t: "Velikost skupin, ubytování, výlety – brožura vs. realita."},
    {h: "Zlepšení", t: "Konstruktivní návrhy pro budoucí studenty."},
    {h: "Požadavek", t: "Částečná refundace / odpověď; zdvořilé, ale pevné zakončení."}
  ],
  model: `Dear Ms Harrington,

I am writing to express my dissatisfaction with the two-week General English course I attended at your school in August. While some aspects of my stay were enjoyable, several important features of the course fell well short of the description in your brochure.

Firstly, the brochure states that classes contain a maximum of ten students. However, my group had eighteen participants, which meant that each of us had very little opportunity to speak. Secondly, the accommodation, described as "comfortable single rooms within walking distance", turned out to be shared rooms forty minutes away by bus. Finally, two of the four advertised excursions were cancelled without explanation, and no alternative activities were offered.

I appreciate that unexpected problems can arise during the busy summer season. Nevertheless, I would suggest that the school limits enrolment to the number of places it can genuinely provide. It would also be helpful if students were informed in advance of any changes to their accommodation, so that they could make other arrangements if necessary. Furthermore, cancelled excursions should be replaced, or at least refunded.

In view of the above, I believe that a partial refund of the course fee would be appropriate, particularly to cover the cancelled excursions and the additional travel costs I incurred. I would be grateful if you could look into this matter and reply at your earliest convenience.

I look forward to hearing from you.

Yours sincerely,

Lukas Svoboda`,
  callouts: [
    {q: "fell well short of the description in your brochure", tag: "collocation", cz: "fall short of = nesplnit očekávání; formální a přesné."},
    {q: "turned out to be shared rooms forty minutes away by bus", tag: "complex", cz: "Kontrast „described as… turned out to be…“ – fakticky, bez emocí."},
    {q: "I appreciate that unexpected problems can arise", tag: "concession", cz: "Zdvořilá ústupka – stížnost působí rozumně a profesionálně."},
    {q: "It would also be helpful if students were informed in advance", tag: "passive", cz: "Pasivum + kondicionál = taktní návrh bez přímého obviňování."},
    {q: "Yours sincerely", tag: "register", cz: "Oslovení jménem (Dear Ms Harrington) → Yours sincerely."}
  ]},

 {id: "p06", type: "email", register: "informal", title: "Email: a week in your region on a budget",
  prompt: "You have received an email from an English-speaking friend, Daniel. “I’m planning to visit your area for a week next spring with a couple of friends, but we’re students so we haven’t got much money. What are the best things to see and do that won’t cost a fortune? And where should we stay?”",
  require: ["recommend things to see and do cheaply", "suggest suitable accommodation", "give any other useful tips"],
  instruction: "Write your email.",
  scaffold: [
    {h: "Pozdrav", t: "Radost z návštěvy, nabídka setkání."},
    {h: "Co dělat levně", t: "Příroda, památky zdarma, festivaly, jídlo – konkrétně."},
    {h: "Ubytování", t: "Hostely, kempy, případně u tebe; rezervace."},
    {h: "Tipy + závěr", t: "Doprava, slevy, jaro – počasí; rozloučení."}
  ],
  model: `Hi Daniel,

Great to hear from you – and even better news that you're coming over in the spring! You've picked a good time, as the weather's usually mild and the summer crowds haven't arrived yet.

The good news is that a lot of the best things round here are completely free. The hills just outside town are criss-crossed with well-marked trails, and if you're lucky with the weather, the walk up to the old watchtower gives you an amazing view of the whole valley. In town, the castle gardens don't charge for entry, and on Saturday mornings there's a farmers' market where you can fill up on local cheese and homemade pastries for next to nothing. If you fancy something more cultural, most museums have one evening a month when entry is free, so it's worth checking their websites.

As for accommodation, I'd go for the hostel by the river. It's clean, friendly and cheap, especially if you share a dorm, and it's only a ten-minute walk from the centre. Just make sure you book early, because it tends to fill up quickly. And for a night or two, you're more than welcome to crash on my sofa!

One last tip: get a weekly travel pass as soon as you arrive. It covers buses and local trains, so you can explore nearby villages without spending much at all.

Let me know your dates and I'll take a day off to show you around.

Cheers,
Klara`,
  callouts: [
    {q: "The good news is that a lot of the best things round here are completely free.", tag: "topic", cz: "Topic sentence v neformálním stylu – uvádí první bod zadání."},
    {q: "are criss-crossed with well-marked trails", tag: "collocation", cz: "Živý popis s méně běžným slovesem (criss-cross) v pasivu."},
    {q: "for next to nothing", tag: "collocation", cz: "Idiom = skoro zadarmo; přirozená neformální angličtina."},
    {q: "you're more than welcome to crash on my sofa", tag: "register", cz: "Hovorové „crash“ = přespat; vhodné jen v neformálním textu."}
  ]},

 {id: "p07", type: "letter", register: "formal", title: "Letter to the council: improving a park",
  prompt: "Your local council has announced that it has some money available to improve Riverside Park, and it has invited residents to write in with their views. Write a letter to the council.",
  require: ["describe the main problems with the park at present", "suggest how the money should be spent", "explain how your suggestions would benefit local people"],
  instruction: "Write your letter. You do not need to include postal addresses.",
  scaffold: [
    {h: "Účel", t: "Reaguješ na výzvu rady, vítáš iniciativu."},
    {h: "Problémy", t: "Osvětlení, rozbité hřiště, chybějící toalety."},
    {h: "Návrhy", t: "Konkrétní priority pro peníze."},
    {h: "Přínosy + závěr", t: "Pro koho (rodiny, senioři, mládež); poděkování, Yours faithfully."}
  ],
  model: `Dear Sir or Madam,

I am writing in response to the council's invitation for residents to comment on the planned improvements to Riverside Park. As someone who has lived opposite the park for over ten years, I welcome this initiative and would like to offer a few suggestions.

At present, the park suffers from a number of problems. The lighting along the main path is poor, and many residents, particularly women and older people, avoid walking there after dark. The children's playground has not been renovated for years, and several pieces of equipment have been removed as unsafe, leaving little for young children to do. In addition, the absence of public toilets makes it difficult for families to spend more than an hour or so in the park.

In my view, the money would be best spent on three priorities. Firstly, energy-efficient lighting should be installed along all the main paths. Secondly, the playground should be modernised, ideally with equipment suitable for a wider range of ages. Finally, a small toilet block, perhaps combined with a kiosk selling drinks, would make the park far more practical for visitors.

These changes would benefit a wide cross-section of the community. Families would have a safe, attractive place to spend their weekends, older residents could take evening walks without feeling anxious, and the kiosk could even generate income to help maintain the park. Above all, a well-used park is a safer park.

Thank you for taking the time to consider my views.

Yours faithfully,

Martin Kral`,
  callouts: [
    {q: "As someone who has lived opposite the park for over ten years", tag: "complex", cz: "Úvodní participiální/vztažná konstrukce dává pisateli důvěryhodnost."},
    {q: "several pieces of equipment have been removed as unsafe", tag: "passive", cz: "Pasivum – věcné konstatování bez obviňování rady."},
    {q: "energy-efficient lighting should be installed along all the main paths", tag: "passive", cz: "Návrh v pasivu s should – typické pro formální doporučení."},
    {q: "Above all, a well-used park is a safer park.", tag: "evaluative", cz: "Krátká, zapamatovatelná pointa po delších větách – variace délky vět."}
  ]},

 {id: "p08", type: "email", register: "informal", title: "Email: planning a class reunion",
  prompt: "You have received an email from a former classmate, Alex, who is organising a reunion for your old secondary school class. “It’s ten years since we left school! I want to make the reunion really special. What are your best memories of our time at school? And have you got any ideas for what we could do on the day?”",
  require: ["share your best memories of school", "suggest ideas for the reunion"],
  instruction: "Write your email.",
  scaffold: [
    {h: "Reakce", t: "Nadšení z nápadu, nostalgie."},
    {h: "Vzpomínky", t: "1–2 konkrétní vzpomínky s detaily (výlet, divadlo, učitel)."},
    {h: "Nápady", t: "Místo, program (fotky, prohlídka školy, pozvat učitele)."},
    {h: "Závěr", t: "Nabídka pomoci; rozloučení."}
  ],
  model: `Hi Alex,

What a brilliant idea! I can't believe it's been ten years already – it feels like only yesterday we were cramming for our final exams in the library.

I've been thinking about my favourite memories, and the first thing that springs to mind is our trip to the mountains in the third year. Do you remember when the bus broke down and we ended up singing in a farmer's barn for three hours while we waited for a replacement? At the time it felt like a disaster, but looking back, it was probably the moment our class really became friends. I also have fond memories of the end-of-year play, especially Mr Horak trying desperately to keep a straight face when half the cast forgot their lines.

As for the reunion, I think we should keep it relaxed rather than formal. How about booking the back room of a café near the school, so people can just chat? It would be lovely to put together a slideshow of old photos – I've still got loads, including some fairly embarrassing ones! We could also ask whether the school would let us have a quick look around, and it might be worth inviting a few of our old teachers. Mr Horak would definitely enjoy seeing how we've all turned out.

If you need any help with the organisation, just let me know. I'd be more than happy to track people down on social media or sort out the photos.

Can't wait!

Best,
Eva`,
  callouts: [
    {q: "the first thing that springs to mind", tag: "collocation", cz: "spring to mind = vybavit se; přirozený idiom."},
    {q: "At the time it felt like a disaster, but looking back, it was probably", tag: "linker", cz: "Kontrast tehdy × teď; „looking back“ jako spojovací prostředek."},
    {q: "trying desperately to keep a straight face", tag: "collocation", cz: "keep a straight face = udržet vážnou tvář; barvitý detail."},
    {q: "How about booking the back room of a café near the school", tag: "recommend", cz: "Neformální návrh How about + -ing."}
  ]},

 {id: "p09", type: "proposal", register: "formal", title: "Proposal: a student study and social space",
  prompt: "The principal of your college has some money available to improve the facilities for students. She has asked students to submit proposals. You decide to write a proposal suggesting how an unused room in the college could be converted.",
  require: ["explain why students need a new space", "describe how the room should be converted", "explain how students would benefit"],
  instruction: "Write your proposal.",
  scaffold: [
    {h: "Introduction", t: "Účel návrhu; místnost (bývalá učebna)."},
    {h: "Proč potřeba", t: "Knihovna plná, žádné místo na skupinovou práci ani odpočinek."},
    {h: "Proposed conversion", t: "Zóny: tichá, skupinová, odpočinková; zásuvky, nábytek."},
    {h: "Benefits + Recommendation", t: "Výsledky, pohoda, komunita; přesvědčivý závěr."}
  ],
  model: `Proposal for converting Room 14 into a student study and social space

Introduction
The aim of this proposal is to suggest how the unused former computer room, Room 14, could be converted into a flexible space for students. The suggestions are based on informal discussions with around thirty students from different year groups.

Why a new space is needed
At present, students have very few places to go between lessons. The library is frequently full, and as silence is required there, it cannot be used for group projects. The canteen, meanwhile, is noisy and closes at two o'clock. As a result, many students spend free periods sitting in corridors or leave the building altogether.

Proposed conversion
It is proposed that the room be divided into three areas. A quiet zone with individual desks and good lighting would allow students to study without distractions. A group work area could be furnished with large tables and a whiteboard wall, while a small relaxation corner with comfortable seating would give students somewhere to unwind. Plenty of power sockets should be installed throughout, as most students now work on laptops.

Benefits
The new space would enable students to use their free periods productively, which is likely to have a positive effect on their results. Furthermore, by providing a place where students from different courses can meet, it would help to build a stronger sense of community within the college.

Recommendation
I strongly recommend that this proposal be approved. The conversion would require only modest investment, yet the benefits for students would be considerable.`,
  callouts: [
    {q: "The aim of this proposal is to suggest how", tag: "register", cz: "Standardní úvod proposalu – hned účel."},
    {q: "as silence is required there, it cannot be used for group projects", tag: "passive", cz: "Pasivum ve vedlejší i hlavní větě – neosobní, věcný styl."},
    {q: "It is proposed that the room be divided into three areas.", tag: "passive", cz: "Neosobní pasivum + subjunktiv (be divided) – typické pro proposal."},
    {q: "I strongly recommend that this proposal be approved.", tag: "recommend", cz: "recommend that + subjunktiv; jasné doporučení na konci."},
    {q: "Proposed conversion", tag: "register", cz: "Podnadpisy odpovídají bodům zadání – Organisation i Communicative Achievement."}
  ]},

 {id: "p10", type: "proposal", register: "formal", title: "Proposal: a festival celebrating local culture",
  prompt: "Your town council wants to attract more visitors and has invited residents to submit proposals for a one-day festival celebrating local culture. You decide to submit a proposal.",
  require: ["describe what the festival should include", "explain how local people could be involved", "say how the festival would benefit the town"],
  instruction: "Write your proposal.",
  scaffold: [
    {h: "Introduction", t: "Účel – jednodenní festival místní kultury."},
    {h: "Programme", t: "Jídlo, hudba, řemesla, historická prohlídka – konkrétně."},
    {h: "Involving local people", t: "Školy, spolky, místní podniky, dobrovolníci."},
    {h: "Benefits + Conclusion", t: "Turisté, příjmy, hrdost; doporučení."}
  ],
  model: `Proposal for a Heritage Day festival

Introduction
This proposal outlines plans for a one-day festival, provisionally named Heritage Day, which would showcase the traditions, food and crafts of our town. It is suggested that the event take place on a Saturday in early September.

Festival programme
The main square would be transformed into a market where local producers sell regional specialities such as smoked cheese and honey. On a stage nearby, folk musicians and dance groups could perform throughout the afternoon, followed by a concert by local bands in the evening. In addition, craftspeople could hold short workshops in pottery, woodcarving and lace-making, giving visitors the chance to try these skills for themselves. Guided walks led by members of the local history society would complete the programme.

Involving local people
It is essential that the festival is organised by and for the community. Schools could contribute by preparing exhibitions about the town's history, while sports clubs and other associations might run stalls to raise funds. Volunteers would be needed to help with information points and setting up, which would give residents a genuine sense of ownership.

Benefits for the town
Not only would the festival attract visitors from the surrounding region, but it would also bring valuable income to local shops, cafés and producers. Moreover, it would strengthen local pride and encourage younger residents to take an interest in traditions that are in danger of being forgotten.

Conclusion
I am confident that Heritage Day could become an annual highlight and would urge the council to give it serious consideration.`,
  callouts: [
    {q: "It is suggested that the event take place", tag: "passive", cz: "Neosobní návrh se subjunktivem (take, ne takes)."},
    {q: "giving visitors the chance to try these skills for themselves", tag: "complex", cz: "Participiální konstrukce vyjadřuje důsledek/přínos."},
    {q: "organised by and for the community", tag: "evaluative", cz: "Úsporná, rétoricky účinná formulace."},
    {q: "Not only would the festival attract visitors from the surrounding region, but it would also", tag: "inversion", cz: "Inverze Not only… but also – výborná pro sekci přínosů."}
  ]},
 {id: "p11", type: "proposal", register: "formal", title: "Proposal: improving staff well-being",
  prompt: "You work for a medium-sized company. The manager is concerned that staff seem stressed and that several employees have left recently. She has asked staff to submit proposals on how to improve well-being at work.",
  require: ["outline the main causes of stress among staff", "suggest practical changes the company could make", "explain how these changes would benefit the company"],
  instruction: "Write your proposal.",
  scaffold: [
    {h: "Introduction", t: "Účel, na čem je návrh založen (rozhovory s kolegy)."},
    {h: "Causes of stress", t: "Přesčasy, e-maily po pracovní době, hlučná open-space kancelář."},
    {h: "Suggested changes", t: "Flexibilní doba, pravidlo e-mailů, tichá místnost, školení manažerů."},
    {h: "Benefits + Recommendation", t: "Nižší fluktuace, nižší náklady na nábor, produktivita."}
  ],
  model: `Improving well-being in the workplace

Introduction
The purpose of this proposal is to identify the main sources of stress among staff and to recommend practical measures to address them. It is based on informal conversations with colleagues in all four departments.

Causes of stress
The most frequently mentioned problem is workload. Since two colleagues left in the spring and have not been replaced, many staff regularly work late to meet deadlines. Another source of pressure is the expectation, rarely stated but widely felt, that emails should be answered in the evenings and at weekends. Finally, the open-plan office is often noisy, making concentration difficult.

Suggested changes
First and foremost, the vacant positions should be filled as soon as possible. In the meantime, managers could review deadlines with their teams to ensure that they are realistic. It would also be advisable to introduce a clear policy that staff are not expected to reply to emails outside working hours. In addition, one of the small meeting rooms could be designated as a quiet room for work requiring concentration.

Benefits
These measures would involve relatively little expense, yet they could make a considerable difference. Staff who feel that their well-being is taken seriously are far more likely to stay with the company, which would reduce the significant costs of recruiting and training replacements. Rested employees also tend to be more productive and make fewer mistakes.

Recommendation
I would therefore recommend that these changes be introduced without delay and that staff be consulted again in six months to assess their impact.`,
  callouts: [
    {q: "the expectation, rarely stated but widely felt, that emails should be answered", tag: "complex", cz: "Vsuvka „rarely stated but widely felt“ – jemná, přesná formulace problému."},
    {q: "First and foremost, the vacant positions should be filled", tag: "passive", cz: "Pasivum s should – formální doporučení bez ukazování prstem."},
    {q: "It would also be advisable to introduce a clear policy", tag: "recommend", cz: "It would be advisable to… – zdvořilý formální návrh."},
    {q: "Staff who feel that their well-being is taken seriously are far more likely to stay", tag: "complex", cz: "Vztažná věta + pasivum v podmětu – argument propojující přínos pro firmu."}
  ]},

 {id: "p12", type: "proposal", register: "formal", title: "Proposal: a school environmental project",
  prompt: "An environmental organisation is offering funding for projects that help schools reduce their impact on the environment. Your teacher has asked you to write a proposal for a project at your school.",
  require: ["describe the project you would like to run", "explain how students would be involved", "say why the project deserves funding"],
  instruction: "Write your proposal.",
  scaffold: [
    {h: "Introduction", t: "Účel – žádost o grant na projekt."},
    {h: "Project description", t: "Školní zahrada + kompostování + sběr dešťové vody."},
    {h: "Student involvement", t: "Kroužek, předměty (biologie), rotace tříd."},
    {h: "Why fund it", t: "Měřitelné výsledky, dlouhodobost, vzdělávací dopad; závěr."}
  ],
  model: `Proposal: The Green Roof Garden Project

Aim
The aim of this proposal is to request funding for a project that would transform the flat roof of our school's science building into a garden, reducing waste and energy use while teaching students about sustainability.

Project description
At present, the school canteen throws away around forty kilograms of food waste every week. We propose installing compost bins to turn this waste into soil for a vegetable garden on the roof. Rainwater would be collected in tanks and used for watering, and the plants themselves would help to insulate the building, keeping it cooler in summer. Any vegetables grown would be supplied to the canteen.

Student involvement
Students would be at the heart of the project. A weekly gardening club would take responsibility for planting and maintenance, while biology and geography classes could use the garden for practical lessons on ecosystems and climate. In addition, older students would measure the amount of waste composted and energy saved, and present their findings to the rest of the school each term.

Why the project deserves funding
Unlike one-off awareness campaigns, this project would bring measurable, long-term benefits. Once the initial costs of the containers, tanks and safety railings have been covered, running costs would be minimal. More importantly, it would give hundreds of students first-hand experience of environmental responsibility, something which no textbook can provide.

Conclusion
We are convinced that the Green Roof Garden would become a model for other schools in the region, and we would be extremely grateful for your support.`,
  callouts: [
    {q: "We propose installing compost bins", tag: "recommend", cz: "propose + -ing (ne to-infinitiv) – správná vazba."},
    {q: "Students would be at the heart of the project.", tag: "topic", cz: "Krátká topic sentence s idiomem at the heart of."},
    {q: "Unlike one-off awareness campaigns, this project would bring measurable, long-term benefits.", tag: "evaluative", cz: "Srovnání s alternativou – přesvědčivý argument pro grant."},
    {q: "Once the initial costs of the containers, tanks and safety railings have been covered", tag: "passive", cz: "Časová věta s pasivem v předpřítomném čase."}
  ]},

 {id: "p13", type: "proposal", register: "formal", title: "Proposal: attracting young tourists",
  prompt: "The tourist office in your town wants to attract more young visitors aged 18–30. It has asked local young people to submit proposals.",
  require: ["explain why the town is not currently popular with young visitors", "suggest ways of making it more attractive to them", "describe how these ideas could be promoted"],
  instruction: "Write your proposal.",
  scaffold: [
    {h: "Introduction", t: "Účel návrhu."},
    {h: "Current situation", t: "Image pro seniory, drahé hotely, žádný noční život, web jen v češtině."},
    {h: "Suggestions", t: "Hostel, outdoorové aktivity, festival, studentská karta."},
    {h: "Promotion + Conclusion", t: "Sociální sítě, influenceři, spolupráce s univerzitami."}
  ],
  model: `Attracting young visitors to Lipnice

Introduction
This proposal aims to explain why relatively few young people visit our town and to suggest how this could be changed. It draws on a short online survey of 60 local and international students.

Current situation
Lipnice has a beautiful old town and stunning countryside, yet it has a reputation as a destination for retired coach parties. Accommodation consists mainly of mid-range hotels, which are too expensive for most young travellers, and there is very little to do in the evenings. Moreover, the tourist office website is available only in Czech, so it is unlikely to reach international visitors.

Suggestions
It is suggested that the empty former school building be converted into a youth hostel offering affordable dormitory beds. The surrounding hills are ideal for mountain biking and climbing, so equipment hire and guided adventure trips could be introduced. A summer music festival by the lake would give young people a specific reason to visit, while a discount card for under-thirties, covering museums, transport and selected cafés, would make longer stays affordable.

Promotion
Traditional brochures are unlikely to reach this age group. Instead, the town should invest in an English-language website and an active presence on social media, featuring short videos of outdoor activities. Inviting travel bloggers to experience the town for free could also generate considerable publicity at minimal cost.

Conclusion
Were these measures adopted, Lipnice could become a popular destination for young travellers, bringing new life and income to the town throughout the year.`,
  callouts: [
    {q: "It draws on a short online survey", tag: "register", cz: "draw on = opírat se o; uvádí zdroj informací."},
    {q: "yet it has a reputation as a destination for retired coach parties", tag: "linker", cz: "yet = a přesto; kontrast uvnitř topic sentence."},
    {q: "It is suggested that the empty former school building be converted", tag: "passive", cz: "Neosobní pasivum + subjunktiv (be converted)."},
    {q: "Were these measures adopted", tag: "inversion", cz: "Inverze místo If these measures were adopted – formální kondicionál."}
  ]},

 {id: "p14", type: "proposal", register: "formal", title: "Proposal: modernising the town library",
  prompt: "The director of your town library wants to attract more people, especially teenagers and young adults. She has invited library users to submit proposals.",
  require: ["describe the changes you would make to the library's services", "suggest changes to the building or layout", "explain how these changes would attract new users"],
  instruction: "Write your proposal.",
  scaffold: [
    {h: "Introduction", t: "Účel a cílová skupina."},
    {h: "Services", t: "E-knihy, kurzy, herní večery, půjčovna techniky."},
    {h: "Building and layout", t: "Zóny, Wi-Fi, zásuvky, kavárna, venkovní terasa."},
    {h: "Attracting users + Conclusion", t: "Proč to mladé osloví; doporučení."}
  ],
  model: `Proposal for modernising Central Library

Introduction
The purpose of this proposal is to suggest ways in which Central Library could attract more teenagers and young adults. The ideas presented are based on conversations with regular users and my own experience as a student.

Library services
Although the book collection is excellent, the services on offer have changed little in years. It is recommended that the library expand its range of e-books and audiobooks, which many young people prefer. In addition, regular events such as board game evenings, creative writing workshops and exam revision sessions would give younger people a reason to visit. Lending equipment such as laptops, cameras or even musical instruments could also prove popular.

Building and layout
At present, the layout is rather old-fashioned, with rows of tall shelves and very few places to sit. The ground floor could be reorganised to include a quiet study zone and a separate area for group work. Reliable Wi-Fi and plenty of power sockets are essential, and a small café would make the library a more welcoming place to spend time.

Attracting new users
Young people today are looking for spaces where they can study, meet friends and take part in activities without spending much money. A modernised library would meet all of these needs, and once teenagers start coming for events, many are likely to begin borrowing books as well.

Conclusion
I would strongly recommend that these changes be introduced in stages, beginning with the events programme, which would require little investment.`,
  callouts: [
    {q: "Although the book collection is excellent, the services on offer have changed little in years.", tag: "concession", cz: "Ústupka na začátku sekce – vyvážený, zdvořilý tón k řediteli."},
    {q: "It is recommended that the library expand its range", tag: "passive", cz: "Neosobní doporučení + subjunktiv (expand, ne expands)."},
    {q: "could also prove popular", tag: "hedging", cz: "could prove = mohlo by se ukázat – opatrný odhad."},
    {q: "once teenagers start coming for events, many are likely to begin borrowing books as well", tag: "complex", cz: "Časová věta s once + hedging „are likely to“."}
  ]},

 {id: "p15", type: "proposal", register: "formal", title: "Proposal: getting more people to use the sports centre",
  prompt: "The manager of your local sports centre is concerned that membership has fallen. He has asked members to submit proposals suggesting how more people could be encouraged to use the centre.",
  require: ["suggest why fewer people are using the centre", "propose changes to activities or facilities", "explain how the centre could reach groups who do not currently use it"],
  instruction: "Write your proposal.",
  scaffold: [
    {h: "Introduction", t: "Účel."},
    {h: "Reasons for decline", t: "Konkurence levných fitek, otevírací doba, zastaralé vybavení."},
    {h: "Proposed changes", t: "Nové lekce, flexibilní členství, rodinné programy."},
    {h: "New groups + Conclusion", t: "Senioři, rodiče s dětmi, firmy; doporučení."}
  ],
  model: `Proposal to increase use of Parkside Sports Centre

Introduction
The aim of this proposal is to suggest why membership of Parkside Sports Centre has declined and to recommend changes that could reverse this trend. It is based on my own experience as a member for six years and on discussions with other users.

Reasons for the decline
The main reason appears to be competition from the new budget gym in the town centre, which is cheaper and open twenty-four hours a day. By comparison, Parkside's fees seem high, and its opening hours, which end at nine in the evening, are inconvenient for people who work late. Several members have also commented that the fitness equipment is outdated.

Proposed changes
Rather than competing on price alone, the centre should focus on what a budget gym cannot offer. It is proposed that a wider range of group classes be introduced, such as yoga, climbing and dance. A flexible pay-as-you-go option would suit people who cannot commit to a monthly membership, and extending opening hours until eleven on weekdays would attract those with long working days.

Reaching new groups
At present, the centre is used mainly by young adults. Morning sessions for older people, combined with discounted rates, could appeal to retired residents. Parent-and-toddler swimming lessons would bring in young families, while partnerships with local employers could offer staff discounted membership.

Conclusion
If these recommendations were implemented, Parkside could re-establish itself as a centre for the whole community rather than simply another gym.`,
  callouts: [
    {q: "The main reason appears to be competition from the new budget gym", tag: "hedging", cz: "appears to be – zjištění podané opatrně, ne jako fakt."},
    {q: "Rather than competing on price alone, the centre should focus on what a budget gym cannot offer.", tag: "topic", cz: "Strategická topic sentence s rather than + -ing a vztažnou větou what."},
    {q: "It is proposed that a wider range of group classes be introduced", tag: "passive", cz: "Neosobní pasivum se subjunktivem."},
    {q: "If these recommendations were implemented", tag: "conditional", cz: "Kondicionál 2. typu v pasivu v závěru."}
  ]},

 {id: "p16", type: "report", register: "formal", title: "Report: the language exchange programme",
  prompt: "Your college has run a language exchange programme with a partner college abroad for the past two years. The principal has asked you to write a report on the programme.",
  require: ["describe how students have benefited from the programme", "identify any problems that have arisen", "recommend how the programme could be improved"],
  instruction: "Write your report.",
  scaffold: [
    {h: "Introduction", t: "Účel reportu + jak jsi sbíral(a) informace (dotazník, rozhovory)."},
    {h: "Benefits", t: "Jazyk, sebevědomí, přátelství – s kvantifikací."},
    {h: "Problems", t: "Krátké pobyty, nerovnováha rodin, náklady."},
    {h: "Recommendations", t: "Konkrétní a navázaná na problémy."}
  ],
  model: `Report on the language exchange programme

Introduction
The aim of this report is to assess the language exchange programme with Lyon Technical College, which has now been running for two years. The information was gathered through a questionnaire completed by 45 participants and short interviews with two of the teachers involved.

Benefits for students
The programme has clearly been a success in several respects. Almost all respondents reported that their speaking skills had improved noticeably, and many said they felt far more confident communicating with native speakers. Living with a host family was considered the most valuable part of the experience, as it gave students an insight into everyday life that no textbook could offer. A number of participants have also remained in contact with their exchange partners.

Problems
However, some problems were identified. The exchange currently lasts only ten days, which most students felt was too short to make significant progress. Several respondents also mentioned that host families varied considerably, with some students spending little time with their hosts. Finally, travel costs were a concern for a significant minority and may discourage some students from applying.

Recommendations
In light of these findings, it is recommended that the exchange be extended to at least two weeks. Host families should be given clear guidelines about what is expected of them, and a short meeting with each family before the visit would help to ensure consistency. It would also be advisable to set up a fund to support students who would otherwise be unable to afford the trip.`,
  callouts: [
    {q: "The information was gathered through a questionnaire completed by 45 participants", tag: "passive", cz: "Pasivum + zdroj dat v úvodu – klíčová konvence reportu."},
    {q: "Almost all respondents reported that", tag: "register", cz: "Kvantifikátor + reportovací sloveso místo „I think“."},
    {q: "a significant minority", tag: "collocation", cz: "Typická kvantifikace v reportech."},
    {q: "it is recommended that the exchange be extended", tag: "recommend", cz: "Neosobní doporučení se subjunktivem – navázané na zjištěný problém."}
  ]},

 {id: "p17", type: "report", register: "formal", title: "Report: public transport in your town",
  prompt: "An international website for people moving to new cities is collecting reports about public transport. You have been asked to write a report about public transport in your town.",
  require: ["describe the main forms of public transport available", "evaluate how well they meet the needs of residents and visitors", "suggest what newcomers should know before using them"],
  instruction: "Write your report.",
  scaffold: [
    {h: "Introduction", t: "Účel, pro koho."},
    {h: "Forms of transport", t: "Tramvaje, autobusy, noční linky, kola."},
    {h: "Evaluation", t: "Silné stránky (cena, frekvence) × slabiny (předměstí, přístupnost)."},
    {h: "Advice for newcomers", t: "Jízdenky, aplikace, revizoři; závěr."}
  ],
  model: `Public transport in Brno: a guide for newcomers

Introduction
This report provides an overview of public transport in Brno and assesses how well it serves residents and visitors. It is based on my experience as a daily commuter and on the views of several international students.

Available transport
The backbone of the network is the tram system, which covers most of the city centre and the main residential districts. Trams are supplemented by buses and trolleybuses serving the outskirts, and a night bus network operates after midnight. A public bike-sharing scheme has also been introduced in recent years.

Evaluation
On the whole, the system is highly regarded by local residents. Trams run every few minutes at peak times, and fares are considerably lower than in most Western European cities. Visitors find major attractions easy to reach. However, connections between outer suburbs can be slow, often requiring a change in the centre. Furthermore, while newer vehicles are fully accessible, some older trams remain difficult for wheelchair users and parents with pushchairs.

Advice for newcomers
Tickets must be bought before boarding, either from machines at stops or via the official mobile app, which is by far the most convenient option. They must then be validated immediately, as inspectors carry out frequent checks and fines are substantial. Anyone staying for more than a month would be well advised to buy a long-term pass, which offers significant savings.

Conclusion
Overall, Brno's public transport is reliable and affordable, and most newcomers will find they have little need for a car.`,
  callouts: [
    {q: "The backbone of the network is the tram system", tag: "topic", cz: "Metafora backbone (páteř) v topic sentence."},
    {q: "Trams are supplemented by buses and trolleybuses serving the outskirts", tag: "passive", cz: "Pasivum + participium serving – hutný, faktický styl."},
    {q: "On the whole, the system is highly regarded by local residents.", tag: "evaluative", cz: "highly regarded – formální hodnocení."},
    {q: "would be well advised to buy a long-term pass", tag: "recommend", cz: "be well advised to = bylo by rozumné; formální rada."}
  ]},

 {id: "p18", type: "report", register: "formal", title: "Report: a training course",
  prompt: "Your employer recently paid for you to attend a three-day training course in presentation skills. Your manager has asked you to write a report about it.",
  require: ["describe what the course covered", "evaluate how useful it was", "recommend whether other staff should attend"],
  instruction: "Write your report.",
  scaffold: [
    {h: "Introduction", t: "Kurz, kdy, kde, účel reportu."},
    {h: "Course content", t: "Struktura prezentace, hlas, řeč těla, nahrávání a feedback."},
    {h: "Evaluation", t: "Co bylo nejužitečnější, co slabší (teorie, velká skupina)."},
    {h: "Recommendations", t: "Pro koho ano; možné úpravy."}
  ],
  model: `Report on the Effective Presentations training course

Introduction
The purpose of this report is to evaluate the three-day Effective Presentations course which I attended in October, and to consider whether it would be worthwhile for other members of staff.

Course content
The course was divided into three parts. The first day focused on structuring a presentation, including how to open with impact and adapt content to different audiences. On the second day, participants worked on voice, body language and the use of visual aids. The final day was devoted almost entirely to practice: each of us gave two short presentations, which were filmed and then analysed by the trainer and the group.

Evaluation
Overall, the course proved extremely useful. The practical sessions were by far the most valuable element, since watching recordings of ourselves revealed habits we had been completely unaware of, such as speaking too quickly or avoiding eye contact. The trainer's feedback was detailed, constructive and encouraging. The only significant weakness was that the first morning was rather theoretical, and some of the material on slide design seemed somewhat outdated.

Recommendations
I would recommend the course to any colleagues who regularly present to clients or at internal meetings, particularly those in the sales and project management teams. However, it would be advisable to request that the theoretical content be shortened in favour of additional practice time. Sending staff in small groups would also allow them to support one another in applying the techniques afterwards.

Conclusion
In short, the course represents good value for money.`,
  callouts: [
    {q: "The final day was devoted almost entirely to practice", tag: "passive", cz: "be devoted to – formální pasivní kolokace."},
    {q: "since watching recordings of ourselves revealed habits we had been completely unaware of", tag: "complex", cz: "Gerundium jako podmět + předminulý průběhový čas ve vztažné větě."},
    {q: "The only significant weakness was that", tag: "concession", cz: "Vyvážené hodnocení – report není jen chvála."},
    {q: "request that the theoretical content be shortened in favour of additional practice time", tag: "recommend", cz: "request that + subjunktiv; in favour of = ve prospěch."}
  ]},

 {id: "p19", type: "report", register: "formal", title: "Report: a volunteering project",
  prompt: "You have been volunteering for a local project that helps elderly people with shopping and technology. The organisation that funds the project has asked you to write a report.",
  require: ["describe what the project has achieved", "explain what difficulties volunteers have faced", "suggest how the project could develop in the future"],
  instruction: "Write your report.",
  scaffold: [
    {h: "Introduction", t: "Projekt, délka, zdroj informací."},
    {h: "Achievements", t: "Počty klientů, hodnocení, dopady na osamělost."},
    {h: "Difficulties", t: "Málo dobrovolníků, doprava, důvěra seniorů."},
    {h: "Future development", t: "Nábor studentů, partnerství, rozšíření služeb."}
  ],
  model: `Report on the Helping Hands volunteering project

Introduction
This report summarises the progress of the Helping Hands project during its first year, outlines the main difficulties encountered and makes suggestions for its future development. It is based on project records, client feedback forms and a recent volunteers' meeting.

Achievements
Over the past twelve months, twenty-two volunteers have provided regular support to more than sixty elderly residents. The service has two main strands: weekly help with shopping, and one-to-one sessions teaching clients to use smartphones and tablets. Feedback has been overwhelmingly positive, with nearly all clients describing the service as very helpful. Perhaps more significantly, many reported feeling less isolated, and several now make regular video calls to family members living abroad.

Difficulties
The most pressing problem has been a shortage of volunteers, particularly during the summer, when many students leave the area. As a result, some clients have had their visits postponed. Transport has also proved difficult in outlying villages, which are poorly served by buses. In addition, some clients were initially slow to trust unfamiliar volunteers.

Future development
It is recommended that the project establish links with the local university and secondary schools, as volunteering could count towards students' community service requirements. A small budget for volunteers' travel costs would enable the service to reach more remote clients. Finally, group technology sessions in the community centre could be introduced, allowing volunteers to help several clients at once.

Conclusion
In short, the project has made a real difference, and with modest additional support it could expand considerably.`,
  callouts: [
    {q: "The service has two main strands", tag: "collocation", cz: "strand = linie/část programu; přesná slovní zásoba."},
    {q: "Feedback has been overwhelmingly positive", tag: "evaluative", cz: "Silné, ale věcné hodnocení podložené daty."},
    {q: "Perhaps more significantly, many reported feeling less isolated", tag: "hedging", cz: "Perhaps + report + -ing: opatrně, ale důrazně."},
    {q: "Transport has also proved difficult in outlying villages, which are poorly served by buses.", tag: "passive", cz: "proved difficult + pasivum ve vztažné větě."}
  ]},

 {id: "p20", type: "report", register: "formal", title: "Report: leisure facilities for young people",
  prompt: "Your town council wants to know what young people think about the leisure facilities in the area. You have been asked to write a report for the council.",
  require: ["describe the leisure facilities currently available", "explain which facilities are most and least popular, and why", "suggest what new facilities are needed"],
  instruction: "Write your report.",
  scaffold: [
    {h: "Introduction", t: "Účel + průzkum mezi mladými."},
    {h: "Current facilities", t: "Bazén, skatepark, kino, mládežnický klub."},
    {h: "Popularity", t: "Nejoblíbenější/nejméně oblíbené + důvody (cena, stav)."},
    {h: "Recommendations", t: "Nová zařízení a priority."}
  ],
  model: `Report on leisure facilities for young people in Horice

Introduction
The aim of this report is to present young people's views on the leisure facilities available in Horice and to recommend improvements. The findings are based on an online survey completed by 120 residents aged between 14 and 25.

Current facilities
The town has a public swimming pool, a small cinema, a skatepark and a youth club run by the council. There are also several football pitches.

Most and least popular facilities
The swimming pool emerged as by far the most popular facility, used regularly by nearly two-thirds of respondents. It was praised for its affordable prices and long opening hours. The skatepark is also well used, although many respondents complained that it is in poor condition. The least popular facility is the youth club, which only a handful of those surveyed had visited in the past year. Its activities were widely described as aimed at much younger children, and its opening hours, which end at seven in the evening, were considered unsuitable.

Recommendations
In light of these findings, it is recommended that the skatepark be renovated as a matter of priority. The youth club should consult young people directly about its programme, perhaps introducing music workshops or gaming tournaments, and remain open later at weekends. Finally, a significant number of respondents expressed interest in an indoor climbing wall, which the council may wish to consider when planning future investment.

Conclusion
Overall, young people value the existing facilities but feel that several need updating.`,
  callouts: [
    {q: "The swimming pool emerged as by far the most popular facility", tag: "evaluative", cz: "emerge as = ukázat se jako; by far zesiluje superlativ."},
    {q: "which only a handful of those surveyed had visited in the past year", tag: "complex", cz: "Vztažná věta s kvantifikátorem a handful of."},
    {q: "Its activities were widely described as aimed at much younger children", tag: "passive", cz: "Neosobní pasivum „were widely described as“ – názor respondentů, ne pisatele."},
    {q: "which the council may wish to consider", tag: "register", cz: "Velmi zdvořilé formální doporučení pro instituci."}
  ]},
 {id: "p21", type: "report", register: "formal", title: "Report: a cultural exchange visit",
  prompt: "Your class recently hosted a group of students from a school in another country for a week-long cultural exchange. Your teacher has asked you to write a report about the visit for the school's head teacher.",
  require: ["describe the main activities during the visit", "explain what both groups of students gained", "suggest how future visits could be improved"],
  instruction: "Write your report.",
  scaffold: [
    {h: "Introduction", t: "Kdo, kdy, účel reportu, zdroj informací."},
    {h: "Activities", t: "Výuka, výlety, společný projekt, večírek."},
    {h: "What students gained", t: "Jazyk, kulturní porozumění, přátelství – obě strany."},
    {h: "Recommendations", t: "Více společného času, méně autobusů, příprava předem."}
  ],
  model: `Report on the exchange visit from Kraków

Introduction
The purpose of this report is to describe the week-long visit by twenty students from St Jadwiga School in Kraków, to evaluate what participants gained and to suggest improvements for future exchanges. It draws on feedback forms completed by both groups.

Main activities
The programme combined school-based and cultural activities. On three mornings, the visitors attended lessons alongside their hosts, and the two groups worked together on a short video comparing teenage life in both countries. Afternoons were spent on excursions, including a guided tour of the old town and a day trip to the mountains. The week ended with a farewell evening, at which each group performed traditional songs.

Benefits for participants
Both groups clearly benefited from the experience. Since English was the common language, students on both sides had constant opportunities to use it in real situations, and many said they had become noticeably more confident speakers. Equally importantly, the visit challenged several stereotypes: several of our students admitted knowing little about Poland and were surprised by how much the two cultures share.

Recommendations
The most common criticism was that too much time was spent travelling by coach. It is therefore recommended that future excursions be closer to home, leaving more time for informal activities. Students also suggested that the joint video project be started online a few weeks before the visit, so that groups could get to know each other in advance.

Conclusion
Overall, the exchange was valuable and should certainly be repeated.`,
  callouts: [
    {q: "It draws on feedback forms completed by both groups.", tag: "register", cz: "Zdroj informací v úvodu reportu – konvence žánru."},
    {q: "Afternoons were spent on excursions", tag: "passive", cz: "Pasivum – důraz na činnost, ne na toho, kdo ji dělal."},
    {q: "Equally importantly, the visit challenged several stereotypes", tag: "linker", cz: "Equally importantly – přidání dalšího přínosu se stejnou váhou."},
    {q: "It is therefore recommended that future excursions be closer to home", tag: "recommend", cz: "Doporučení navazuje přímo na zjištěnou kritiku."}
  ]},

 {id: "p22", type: "report", register: "formal", title: "Report: healthy eating in the college canteen",
  prompt: "The principal of your college is concerned that many students do not eat healthily during the day. She has asked you to write a report on the college canteen.",
  require: ["describe what students currently eat at lunchtime", "explain why some students avoid the canteen", "recommend changes that would encourage healthier eating"],
  instruction: "Write your report.",
  scaffold: [
    {h: "Introduction", t: "Účel + průzkum a pozorování."},
    {h: "Current eating habits", t: "Bagety, sladkosti, automaty, rychlé občerstvení venku."},
    {h: "Why students avoid the canteen", t: "Fronty, cena, málo vegetariánských jídel, prostředí."},
    {h: "Recommendations", t: "Rychlé zdravé menu, ceny, předobjednávky, úprava prostoru."}
  ],
  model: `Report on lunchtime eating habits and the college canteen

Introduction
This report examines what students eat during the college day and why many choose not to use the canteen. The findings are based on a questionnaire answered by 150 students and observation of the canteen over one week.

Current eating habits
The survey revealed that fewer than a third of students eat a hot meal at lunchtime. Most rely on snacks from the vending machines or buy fast food from outlets near the college. A worrying number admitted to skipping lunch altogether, often replacing it with energy drinks.

Reasons for avoiding the canteen
The most frequently cited reason was the length of the queues. With only one serving counter, students can wait up to twenty minutes, leaving little time to eat during a forty-minute break. Price was also an issue, as a main course costs considerably more than a sandwich from the supermarket. In addition, many vegetarian students felt that the choice available to them was extremely limited.

Recommendations
It is recommended that a second counter be opened, offering a quick, healthy option such as salads or soup. Introducing a pre-ordering system via the college app would also reduce queues significantly. To make healthy food more competitive, the price of the daily vegetarian dish could be subsidised, while the range of sugary drinks in the vending machines should be reduced.

Conclusion
If these changes were made, it is likely that far more students would choose the canteen, with clear benefits for their health and concentration.`,
  callouts: [
    {q: "The survey revealed that fewer than a third of students", tag: "register", cz: "Reportovací sloveso + přesná kvantifikace."},
    {q: "The most frequently cited reason was the length of the queues.", tag: "topic", cz: "Topic sentence s pasivním participiem cited."},
    {q: "leaving little time to eat during a forty-minute break", tag: "complex", cz: "Participiální věta vyjadřuje důsledek."},
    {q: "it is likely that far more students would choose the canteen", tag: "hedging", cz: "it is likely that – opatrná prognóza v závěru."}
  ]},

 {id: "p23", type: "review", register: "neutral", title: "Review: a book that changed your mind",
  prompt: "You see this announcement on an English-language book website. “Reviews wanted: a book that changed the way you think. Have you read a book that made you see something differently? Write a review telling us about the book, explaining how it changed your thinking and saying who else would benefit from reading it.”",
  require: ["tell readers about the book", "explain how it changed your thinking", "say who else would benefit from reading it"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Úvod + háček", t: "Název, autor, typ; jaký byl tvůj názor předtím."},
    {h: "O knize", t: "Stručně obsah/styl, bez převyprávění."},
    {h: "Jak změnila myšlení", t: "Konkrétní příklad, co teď děláš/vidíš jinak."},
    {h: "Pro koho", t: "Cílová skupina + výhrada; verdikt."}
  ],
  model: `The Quiet Hours by Miriam Hale – a book that taught me to switch off

Until last year, I considered being busy a badge of honour. My phone was never more than an arm's length away, and a free evening felt like a wasted opportunity. Then a friend lent me The Quiet Hours, and I have not looked at my schedule in quite the same way since.

The book is part memoir, part investigation. Hale, a former journalist, describes how burnout forced her to give up a successful career, and she then sets out to discover why so many of us feel permanently exhausted. She interviews neuroscientists, monks and overworked parents, and weaves their stories together with remarkable lightness. Despite the serious subject, it is often very funny.

What struck me most was her argument that boredom is not a problem to be solved but a condition the brain actually needs in order to be creative. I had always filled every spare moment with my phone, assuming I was being efficient. After reading the book, I started leaving it at home on my morning walk, and I was astonished at how many ideas came to me once I stopped consuming information.

Admittedly, the final chapters become somewhat repetitive, and readers looking for a practical step-by-step guide may be disappointed. Nevertheless, I would wholeheartedly recommend the book to students, professionals and anyone who feels that their life is running away with them. It might not change your life overnight, but it will almost certainly change the way you spend your free time.`,
  callouts: [
    {q: "I considered being busy a badge of honour", tag: "evaluative", cz: "Idiom badge of honour – osobní, poutavý úvod recenze."},
    {q: "The book is part memoir, part investigation.", tag: "topic", cz: "Úsporný popis žánru – „part X, part Y“."},
    {q: "What struck me most was her argument that", tag: "cleft", cz: "Vytýkací věta – ideální pro „how it changed your thinking“."},
    {q: "Admittedly, the final chapters become somewhat repetitive", tag: "concession", cz: "Vyvážené hodnocení: výhrada s hedgingem somewhat."},
    {q: "I would wholeheartedly recommend the book to", tag: "recommend", cz: "recommend + to + konkrétní cílové skupiny."}
  ]},

 {id: "p24", type: "review", register: "neutral", title: "Review: a documentary series",
  prompt: "An international student magazine has asked readers to send in reviews of a documentary series they have watched recently. Your review should describe the series, say what you learned from it and explain whether it would appeal to young people.",
  require: ["describe the series", "say what you learned from it", "explain whether it would appeal to young people"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Úvod", t: "Název, platforma, téma, háček."},
    {h: "Popis", t: "Formát, počet dílů, styl (kamera, vypravěč)."},
    {h: "Co ses naučil(a)", t: "1–2 konkrétní poznatky."},
    {h: "Pro mladé?", t: "Ano/ne a proč; výhrada; verdikt."}
  ],
  model: `Deep Blue Cities: an eye-opening dive beneath the waves

If you think documentaries about the ocean are all slow-motion whales and soothing music, Deep Blue Cities will come as a pleasant surprise. This six-part series, now available on several streaming platforms, explores the extraordinary communities of creatures that live on coral reefs, and the scientists racing to protect them.

Each fifty-minute episode focuses on a different reef, from the Red Sea to the coast of Indonesia. The underwater photography is simply breathtaking, with colours so vivid they almost look artificial. What sets the series apart, however, is its focus on people. Rather than relying on a single narrator, it lets young marine biologists tell their own stories, which gives the programme an energy that more traditional documentaries often lack.

I learned a great deal, but two things stayed with me in particular. Firstly, I had no idea that reefs, despite covering a tiny fraction of the ocean floor, support around a quarter of all marine species. Secondly, the series shows that damaged reefs can recover remarkably quickly if they are protected from overfishing and pollution, which left me feeling hopeful rather than depressed.

Would it appeal to young people? Absolutely. The episodes are fast-paced, the presenters are close in age to most students, and there is a refreshing absence of lecturing. My only criticism is that the final episode tries to cover too much ground. Even so, this is compulsive viewing, and I would urge anyone with even a passing interest in nature to give it a try.`,
  callouts: [
    {q: "If you think documentaries about the ocean are all slow-motion whales and soothing music", tag: "register", cz: "Přímé oslovení čtenáře a humor – typický háček recenze."},
    {q: "What sets the series apart, however, is its focus on people.", tag: "cleft", cz: "Vytýkací věta zdůrazňuje hlavní přednost."},
    {q: "despite covering a tiny fraction of the ocean floor", tag: "complex", cz: "despite + -ing jako vsuvka – hutná struktura."},
    {q: "Would it appeal to young people? Absolutely.", tag: "rhetorical", cz: "Řečnická otázka přímo převzatá ze zadání – jasně pokrývá třetí bod."},
    {q: "this is compulsive viewing", tag: "evaluative", cz: "compulsive viewing = nedá se od toho odtrhnout; recenzní kolokace."}
  ]},

 {id: "p25", type: "review", register: "neutral", title: "Review: a café or restaurant for students",
  prompt: "A website for international students in your city is publishing reviews of places to eat. Write a review of a café or restaurant you know, describing the food and atmosphere and explaining why it would or would not be a good choice for students on a budget.",
  require: ["describe the food and atmosphere", "explain whether it is a good choice for students on a budget"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Úvod", t: "Název, kde je, první dojem."},
    {h: "Jídlo", t: "Konkrétní pokrmy, kvalita, porce."},
    {h: "Atmosféra", t: "Interiér, obsluha, hluk, Wi-Fi."},
    {h: "Pro studenty?", t: "Ceny, slevy, nevýhody; verdikt."}
  ],
  model: `The Green Spoon – good food that won't break the bank

Tucked away in a side street behind the main university building, The Green Spoon is easy to miss. That would be a shame, because this small vegetarian café is one of the best-kept secrets in town.

The menu changes every day and is written on a blackboard by the door. There are usually two soups, a couple of hot dishes and a selection of salads, all made from fresh, seasonal ingredients. On my last visit, I had a rich lentil curry with rice, which was generously spiced and filling enough to keep me going until dinner. The homemade cakes are also outstanding, although they tend to sell out by mid-afternoon.

The atmosphere is relaxed and welcoming. Mismatched furniture, shelves of second-hand books and plants hanging from the ceiling give the place a cosy, slightly bohemian feel. The staff are friendly and never rush you, so it is a popular spot for studying, especially as the Wi-Fi is fast and free. It can get rather crowded at lunchtime, however, and finding a table between twelve and one is something of a challenge.

For students on a budget, The Green Spoon is hard to beat. A daily lunch menu of soup and a main course costs less than a sandwich and coffee at most chain cafés, and anyone with a student card gets a further ten per cent off. Even committed meat-eaters are unlikely to leave disappointed. Go early, bring a book and prepare to become a regular.`,
  callouts: [
    {q: "Tucked away in a side street behind the main university building", tag: "complex", cz: "Úvodní participiální konstrukce – živý popis místa."},
    {q: "one of the best-kept secrets in town", tag: "evaluative", cz: "Ustálené hodnoticí spojení v recenzích."},
    {q: "although they tend to sell out by mid-afternoon", tag: "hedging", cz: "tend to – opatrně podaná nevýhoda."},
    {q: "For students on a budget, The Green Spoon is hard to beat.", tag: "topic", cz: "Topic sentence přímo odpovídá na bod zadání."}
  ]},

 {id: "p26", type: "review", register: "neutral", title: "Review: a museum or exhibition",
  prompt: "A travel website has asked visitors to review museums or exhibitions they have been to. Write a review of a museum or exhibition, describing what visitors can see and do there, and saying whether it would be suitable for families with children.",
  require: ["describe what visitors can see and do", "say whether it is suitable for families with children"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Úvod", t: "Název, kde, téma, háček."},
    {h: "Co vidět", t: "Hlavní exponáty, uspořádání."},
    {h: "Co dělat", t: "Interaktivní prvky, workshopy, audioprůvodce."},
    {h: "Pro rodiny", t: "Ano/ne + praktické informace; verdikt."}
  ],
  model: `Hands on History at the Riverside Museum

Museums are not always top of a family's list of weekend activities, but the newly reopened Riverside Museum of Technology may well change that. After a two-year renovation, this former power station now houses one of the most engaging collections I have come across.

The museum tells the story of how inventions have shaped everyday life, from steam engines to smartphones. The vast main hall, where the original turbines still stand, is dominated by vintage trams and early aircraft suspended from the ceiling. Smaller galleries upstairs explore themes such as communication and medicine, with displays that are concise, well designed and refreshingly free of jargon.

What really distinguishes the museum, though, is how much visitors can do. You can send a message using a Victorian telegraph machine, try your hand at steering a ship in a simulator or build a simple electrical circuit. Short science demonstrations take place every hour, and the staff running them are enthusiastic and clearly enjoy answering questions.

For families with children, the museum is close to ideal. Most of the interactive exhibits are designed for ages six and upwards, there are plenty of places to sit down, and the café offers reasonably priced meals for children. The only drawback is that the museum becomes very busy during school holidays, when queues for the simulators can be long. Arriving early or visiting on a weekday is therefore highly advisable. Overall, this is an inspiring, beautifully presented museum that adults will enjoy just as much as their children.`,
  callouts: [
    {q: "may well change that", tag: "hedging", cz: "may well = docela možná; opatrný optimismus."},
    {q: "where the original turbines still stand", tag: "complex", cz: "Vztažná věta s where – popis místa."},
    {q: "What really distinguishes the museum, though, is how much visitors can do.", tag: "cleft", cz: "Vytýkací věta uvádí odstavec o aktivitách."},
    {q: "For families with children, the museum is close to ideal.", tag: "topic", cz: "Jasná odpověď na druhý bod zadání v topic sentence."},
    {q: "refreshingly free of jargon", tag: "evaluative", cz: "Kombinace příslovce a přídavného jména – bohatý hodnoticí slovník."}
  ]},

 {id: "p27", type: "review", register: "neutral", title: "Review: a language-learning app",
  prompt: "An English-language technology blog is inviting readers to review apps or websites that help people learn. Write a review of an app or website you have used, explaining how it works, what its strengths and weaknesses are, and who you would recommend it to.",
  require: ["explain how the app works", "describe its strengths and weaknesses", "say who you would recommend it to"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Úvod", t: "Název, účel, jak dlouho používáš."},
    {h: "Jak funguje", t: "Lekce, opakování, hodnocení výslovnosti."},
    {h: "Silné × slabé stránky", t: "Motivace a krátké lekce × chybí gramatika a mluvení."},
    {h: "Doporučení", t: "Pro začátečníky/dojíždějící; ne jako jediný zdroj."}
  ],
  model: `WordWise: a pocket tutor with limits

Like many people, I have downloaded countless language apps, only to abandon them within a week. WordWise is the first I have stuck with, and after six months of daily use for my Spanish, I feel I can give a fair verdict.

The app is built around short, five-minute lessons, each introducing around ten new words or phrases in context. These are then recycled using a spaced repetition system, which means that words you find difficult reappear more often until they become automatic. There are also listening exercises recorded by native speakers and a feature that analyses your pronunciation.

Its greatest strength is undoubtedly its ability to keep you motivated. Progress is tracked in an attractive dashboard, and the lessons are so brief that it is easy to fit one in while waiting for a bus. My vocabulary has expanded enormously. However, the app is far less effective when it comes to grammar, which is explained only briefly, if at all. Furthermore, although the pronunciation feature is impressive, there is no real opportunity to hold a conversation, so I still freeze when I have to speak spontaneously.

I would recommend WordWise to beginners and busy people who want to build their vocabulary in small, regular doses. Anyone hoping to become fluent through the app alone, though, is likely to be disappointed. Used alongside lessons and real conversation practice, it is a genuinely useful tool; used on its own, it will only take you so far.`,
  callouts: [
    {q: "only to abandon them within a week", tag: "complex", cz: "only to + infinitiv = „jen abych je pak…“ – nečekaný výsledek."},
    {q: "which means that words you find difficult reappear more often", tag: "complex", cz: "Vztažná věta + vnořená vztažná věta bez that."},
    {q: "which is explained only briefly, if at all", tag: "evaluative", cz: "„if at all“ = pokud vůbec; jemná, ale ostrá kritika."},
    {q: "Used alongside lessons and real conversation practice, it is a genuinely useful tool; used on its own, it will only take you so far.", tag: "complex", cz: "Paralelní participiální konstrukce – vyvážený závěrečný verdikt."}
  ]},

 {id: "p28", type: "review", register: "neutral", title: "Review: a film adaptation of a book",
  prompt: "A film website is running a series called “Book versus film”. Write a review of a film based on a book you have read, comparing the film with the book and saying whether you think the film does justice to the original.",
  require: ["briefly describe the story", "compare the film with the book", "say whether the film does justice to the original"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Úvod", t: "Kniha, film, režisér, očekávání."},
    {h: "Příběh", t: "Max. 2–3 věty, bez spoilerů."},
    {h: "Srovnání", t: "Co film zachoval/změnil/vynechal; herci, vizuál."},
    {h: "Verdikt", t: "Does it do justice? + komu doporučit."}
  ],
  model: `The Lighthouse Keeper's Daughter: does the film live up to the novel?

When I heard that Anna Kerr's much-loved novel was being adapted for the cinema, I was both excited and slightly nervous. The book had been one of my favourites for years, and I could not imagine how its quiet, reflective tone would translate to the big screen.

The story follows Elsie, a teenager growing up on a remote Scottish island in the 1950s, who discovers a bundle of letters revealing a family secret. Without giving too much away, it is a tale of loyalty, loss and the courage it takes to leave home.

In many respects, the film is remarkably faithful. The windswept island scenery is captured beautifully, and newcomer Isla Grant is superb as Elsie, conveying a great deal with very little dialogue. However, the screenplay has made some significant changes. Several minor characters have been cut, which is understandable, but so has the subplot involving Elsie's grandmother, arguably the emotional heart of the novel. As a result, the ending, which is so moving in the book, feels somewhat abrupt on screen.

So does the film do justice to the original? Only partly. Taken on its own terms, it is a beautifully shot and well-acted drama that will appeal to anyone who enjoys slow-burning, atmospheric stories. Readers who love the book, however, may find that its emotional depth has been lost in translation. My advice would be to read the novel first and see the film afterwards, rather than the other way round.`,
  callouts: [
    {q: "I could not imagine how its quiet, reflective tone would translate to the big screen", tag: "evaluative", cz: "translate to the big screen = převést na plátno; přesný recenzní slovník."},
    {q: "Without giving too much away", tag: "register", cz: "Konvence recenze – upozornění, že nebudeš prozrazovat děj."},
    {q: "but so has the subplot involving Elsie's grandmother", tag: "inversion", cz: "Inverze „so has…“ = a stejně tak i…; pokročilá struktura."},
    {q: "Taken on its own terms", tag: "complex", cz: "Participiální konstrukce = posuzováno samo o sobě."},
    {q: "lost in translation", tag: "collocation", cz: "Idiom použitý vtipně v kontextu adaptace."}
  ]},

 {id: "p29", type: "review", register: "neutral", title: "Review: a music festival",
  prompt: "An international music magazine has asked readers to send in reviews of music festivals they have attended. Write a review describing the festival, commenting on the organisation and facilities, and saying whether you would go again.",
  require: ["describe the festival and its atmosphere", "comment on the organisation and facilities", "say whether you would go again"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Úvod", t: "Název, kde, kdy, atmosféra."},
    {h: "Hudba a zážitek", t: "Nejlepší vystoupení, různorodost."},
    {h: "Organizace", t: "Doprava, toalety, jídlo, kemp – dobré × špatné."},
    {h: "Znovu?", t: "Ano/ne a za jakých podmínek."}
  ],
  model: `Lakeside Sounds: great music, mixed organisation

Set on the shores of a lake surrounded by pine forest, Lakeside Sounds has one of the most picturesque locations of any festival I have attended. This year's three-day event attracted around twenty thousand people, and the atmosphere throughout was relaxed, friendly and refreshingly free of trouble.

Musically, the festival offered an impressive range, with indie bands, electronic acts and folk musicians spread across four stages. The highlight for me was a sunset set by a little-known Icelandic singer on the smallest stage, which drew a crowd of only a few hundred but was utterly mesmerising. The headliners were solid, if somewhat predictable.

Unfortunately, the organisation did not always match the quality of the music. Getting to the site was a nightmare: the shuttle buses from the nearest town were far too infrequent, and many festival-goers waited over an hour in the heat. The toilets were insufficient in number and, by the second day, in a fairly grim state. On a more positive note, the food stalls offered an excellent variety of affordable dishes, and the campsite was well lit and patrolled by friendly security staff.

Would I go again? Probably, yes, but with some reservations. The setting and line-up make Lakeside Sounds a genuinely special experience, and the organisers have promised more buses next year. If they also address the problem of facilities, this could become one of the best small festivals in Europe. Until then, I would advise future visitors to arrive early and bring plenty of patience.`,
  callouts: [
    {q: "Set on the shores of a lake surrounded by pine forest", tag: "complex", cz: "Úvodní participiální konstrukce – atmosférický začátek."},
    {q: "The headliners were solid, if somewhat predictable.", tag: "concession", cz: "„if + přídavné jméno“ = i když; elegantní ústupka."},
    {q: "Getting to the site was a nightmare:", tag: "evaluative", cz: "Gerundium jako podmět + silné hodnocení, dvojtečka uvádí důkazy."},
    {q: "On a more positive note", tag: "linker", cz: "Obrat k pozitivům – vyvážená recenze."},
    {q: "Would I go again? Probably, yes, but with some reservations.", tag: "rhetorical", cz: "Řečnická otázka odpovídá přímo na poslední bod zadání."}
  ]},

 {id: "p30", type: "review", register: "neutral", title: "Review: a podcast",
  prompt: "A student website is publishing reviews of podcasts. Write a review of a podcast you listen to regularly, explaining what it is about, what makes it enjoyable and whether it would be useful for people learning English.",
  require: ["explain what the podcast is about", "say what makes it enjoyable", "say whether it would be useful for people learning English"],
  instruction: "Write your review.",
  scaffold: [
    {h: "Úvod", t: "Název, jak dlouho posloucháš, háček."},
    {h: "O čem to je", t: "Formát, délka epizod, moderátoři."},
    {h: "Proč baví", t: "Humor, témata, chemie moderátorů."},
    {h: "Pro studenty angličtiny?", t: "Rychlost, přízvuk, přepisy; úroveň; verdikt."}
  ],
  model: `Curious Minds: the podcast that makes you want to know more

I first came across Curious Minds during a long train journey two years ago, and I have hardly missed an episode since. If you have ever wondered why we yawn, how maps shaped empires or whether octopuses dream, this is the podcast for you.

Each weekly episode lasts around forty minutes and tackles a single question, usually from science or history. The two presenters, a biologist and a former history teacher, research the topic thoroughly and then discuss it in a lively, conversational style. Occasionally they invite an expert, but the format never feels like a lecture.

What makes the podcast so enjoyable is the chemistry between the hosts. They tease each other, admit when they do not know something and are genuinely delighted by surprising facts, which makes their enthusiasm infectious. The topics are also cleverly chosen: familiar enough to grab your attention, yet unusual enough that you almost always learn something new.

For learners of English, I would say Curious Minds is best suited to those at an upper-intermediate level or above. The presenters speak at a natural pace and use plenty of idiomatic language, which may be challenging at first. However, full transcripts are available on the website, so listeners can read along and look up unfamiliar vocabulary. In my experience, it is an excellent way to improve listening skills while learning about the world at the same time. Whether you are a language learner or simply a curious person, it is well worth subscribing.`,
  callouts: [
    {q: "I have hardly missed an episode since", tag: "complex", cz: "hardly + předpřítomný čas – téměř nikdy; přirozená C1 struktura."},
    {q: "What makes the podcast so enjoyable is the chemistry between the hosts.", tag: "cleft", cz: "Vytýkací věta uvádí odstavec odpovídající na druhý bod zadání."},
    {q: "familiar enough to grab your attention, yet unusual enough that you almost always learn something new", tag: "complex", cz: "Paralelní struktura enough… yet… enough – stylisticky vyspělé."},
    {q: "so listeners can read along and look up unfamiliar vocabulary", tag: "collocation", cz: "Frázová slovesa read along, look up – přirozená slovní zásoba."}
  ]}
]
};
