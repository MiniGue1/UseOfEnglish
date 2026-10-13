/* B2 First – Speaking (Paper 4). Original practice content, modelled on the real B2 First exam format
   (14 minutes, two candidates, four parts). Pure data: window.DATA.speaking.
   UI texts in Czech, exam content in English at B2 level. Nothing here is copied from Cambridge papers. */
window.DATA = window.DATA || {};
window.DATA.speaking = {

level: "b2",

/* ---------- interlocutor (examiner), assessor & virtual partner ---------- */
cast: {
  examiner: "Anna Brooks", assessor: "James Hill", partner: "Petra",
  partnerFrom: "I'm from a small town near Brno, in the south-east of the country.",
  examinerVoice: 0, partnerVoice: 1
},

/* Interlocutor frame – same structure as the B2 First speaking test, written for this portal.
   {name} = learner, {partner} = virtual partner, {examiner}, {assessor}; {show}, {ask}, {q}, {central}, {decision}, {topic} filled at runtime. */
rubrics: {
  p1Intro: "Good morning. My name is {examiner} and this is my colleague, {assessor}. And your names are?",
  p1Marks: "Can I have your mark sheets, please? Thank you.",
  p1From: "Where are you from, {name}?",
  p1FromPartner: "And you, {partner}?",
  p1First: "Thank you. First, we'd like to know something about you.",
  p1Thanks: "Thank you.",
  p2Intro: "In this part of the test, I'm going to give each of you two photographs. I'd like you to talk about your photographs on your own for about a minute, and also to answer a question about your partner's photographs.",
  p2YouFirst: "{name}, it's your turn first. Here are your photographs. They show {show}. I'd like you to compare the photographs, and say {ask}. All right?",
  p2PartnerTurn: "Now, {partner}, here are your photographs. They show {show}. I'd like you to compare the photographs, and say {ask}. All right?",
  p2Thanks: "Thank you.",
  p2AskPartner: "{partner}, {q}",
  p2AskYou: "{name}, {q}",
  p3Intro: "Now, I'd like you to talk about something together for about two minutes. Here are some {topic} and a question for you to discuss. First you have some time to look at the task.",
  p3Start: "Now, talk to each other about {central}",
  p3Decide: "Thank you. Now you have about a minute to decide {decision}",
  p3Thanks: "Thank you.",
  p4ToPartner: "{partner}, what do you think?",
  p4ToYou: "And what about you, {name}? What do you think?",
  p4Prompts: ["What do you think?", "Do you agree?", "And what about you?", "Why do you think that?"],
  end: "Thank you. That is the end of the test."
},

/* real B2 First timings in seconds (paired test: 14 minutes in total) */
timing: {
  total: 14,
  p1Answer: 20, p1Total: 120,
  p2Long: 60, p2Short: 30, p2Total: 240,
  p3Look: 15, p3Discuss: 120, p3Decide: 60, p3Turn: 30, p3Total: 240,
  p4Think: 5, p4Answer: 40, p4Total: 240
},

/* ---------- assessment: B2 First scales 0–5 (bands 2 and 4 share features of the bands around them).
   The assessor gives GV, DM, PR, IC; the interlocutor gives Global Achievement. ---------- */
criteria: [
  { id:"gv", name:"Grammar and Vocabulary", cz:"Gramatika a slovní zásoba",
    focus:"Jak přesně používáš jednoduchou gramatiku, zda zkoušíš i složitější struktury a zda máš slovní zásobu na vyjádření názoru k běžným tématům.",
    bands:[
      "0 – Výkon pod pásmem 1 (zatím spíš úroveň A2–B1).",
      "1 – Jednoduché věty máš většinou správně; slovní zásoba stačí na každodenní situace, ale u názorů ti chybí slova.",
      "2 – Mezi pásmy 1 a 3: jednoduchá gramatika je v pořádku, složitější struktury zkoušíš jen výjimečně.",
      "3 – Dobře zvládáš jednoduchou gramatiku a zkoušíš i složitější (podmínky, předpřítomný čas, trpný rod, modální slovesa); slovní zásoba stačí na výměnu názorů o běžných tématech. To je úroveň B2.",
      "4 – Mezi pásmy 3 a 5: složitější struktury používáš častěji a s menším počtem chyb, slovní zásoba je pestřejší.",
      "5 – Jistě používáš jednoduché i řadu složitějších struktur; slovní zásoba je pestrá a přesná i u méně známých témat. Drobné chyby nevadí."
    ]},
  { id:"dm", name:"Discourse Management", cz:"Stavba projevu",
    focus:"Zda mluvíš v delších souvislých úsecích, bez dlouhého váhání, k věci a s jasně uspořádanými myšlenkami a spojovacími výrazy.",
    bands:[
      "0 – Výkon pod pásmem 1.",
      "1 – Odpovědi jsou delší než pár slov, ale s častým váháním; obsah většinou k věci, něco se opakuje; jen základní spojky (and, but, because).",
      "2 – Mezi pásmy 1 a 3: odpovědi přiměřeně dlouhé, ale místy se opakuješ nebo ztrácíš nit.",
      "3 – Mluvíš v delších úsecích, i když občas zaváháš; obsah je k věci a skoro se neopakuješ; používáš různé spojovací výrazy (so, however, for example, whereas). To je úroveň B2.",
      "4 – Mezi pásmy 3 a 5: delší úseky s minimem váhání, jasné pořadí myšlenek.",
      "5 – Delší úseky téměř bez váhání; myšlenky jsou k věci a jasně uspořádané; pestré spojovací a diskurzní výrazy (on the other hand, what's more, anyway)."
    ]},
  { id:"pr", name:"Pronunciation", cz:"Výslovnost",
    focus:"Srozumitelnost, intonace, přízvuk ve slovech i ve větách, zřetelné hlásky. Český přízvuk nevadí, pokud ti posluchač bez námahy rozumí.",
    bands:[
      "0 – Výkon pod pásmem 1.",
      "1 – Většinou ti je rozumět; přízvuk a intonace jsou jen částečně správně, posluchač se musí soustředit.",
      "2 – Mezi pásmy 1 a 3: srozumitelné, ale plochá „česká“ intonace a přízvuk často na první slabice.",
      "3 – Jsi srozumitelný(á); intonace a přízvuk ve slovech i větách jsou většinou správně, hlásky většinou zřetelné. To je úroveň B2.",
      "4 – Mezi pásmy 3 a 5: snadno srozumitelné, chyby jen ojedinělé (th, w/v, koncovky).",
      "5 – Snadno srozumitelné; intonace odpovídá situaci, přízvuk je přesně umístěný a hlásky jsou zřetelné."
    ]},
  { id:"ic", name:"Interactive Communication", cz:"Interakce",
    focus:"Zda zahajuješ rozhovor, reaguješ na partnera, navazuješ na jeho myšlenky, udržuješ diskusi v chodu a vedeš ji k rozhodnutí.",
    bands:[
      "0 – Výkon pod pásmem 1.",
      "1 – Zahajuješ i reaguješ přiměřeně, ale rozhovor udržíš jen s pomocí zkoušejícího nebo partnera.",
      "2 – Mezi pásmy 1 a 3: reaguješ, ale málokdy se ptáš partnera nebo rozvíjíš jeho nápady.",
      "3 – Zahajuješ i reaguješ přiměřeně, udržuješ a rozvíjíš rozhovor a s malou pomocí směřuješ k rozhodnutí. To je úroveň B2.",
      "4 – Mezi pásmy 3 a 5: aktivně zapojuješ partnera a navazuješ na něj.",
      "5 – Zahajuješ i reaguješ přirozeně, navazuješ na to, co řekl partner, rozvíjíš diskusi a vyjednáváte až k výsledku."
    ]},
  { id:"ga", name:"Global Achievement", cz:"Celkový dojem",
    focus:"Celkové hodnocení od zkoušejícího, který s tebou mluví (interlocutor): jak dobře zvládáš komunikaci v celém testu.",
    bands:[
      "0 – Výkon pod pásmem 1.",
      "1 – Zvládáš komunikaci v každodenních situacích, i když s váháním; delší výpovědi ano, složitější jazyk jen v naučených frázích.",
      "2 – Mezi pásmy 1 a 3.",
      "3 – Zvládáš komunikaci o známých tématech i přes občasné váhání; mluvíš delší dobu, i když se občas ztratí souvislost nebo objeví nepřesnost. To je úroveň B2.",
      "4 – Mezi pásmy 3 a 5.",
      "5 – Zvládáš komunikaci o řadě známých témat téměř bez váhání; jazyk je přesný a vhodný, projev delší a souvislý."
    ]}
],

/* ---------- overview of the test (Czech) ---------- */
overview: [
  { part:1, name:"Part 1 – Interview", time:"2 min",
    what:"Zkoušející se ptá každého z vás zvlášť na běžná osobní témata: domov, škola, práce, volný čas, plány. Na každou otázku stačí 2–3 věty (asi 15–20 sekund).",
    tip:"Odpověz přímo a pak přidej důvod a konkrétní detail. „Yes, I do.“ je málo, minutový monolog zase moc." },
  { part:2, name:"Part 2 – Long turn", time:"4 min (1 min + 30 s pro každého)",
    what:"Dostaneš DVĚ fotky, nad nimi je napsaná otázka. Asi minutu sám/sama fotky porovnáváš a odpovídáš na otázku. Pak partner asi 30 sekund odpoví na krátkou otázku k tvým fotkám – a potom se role vymění.",
    tip:"Neposuzuj fotky každou zvlášť – porovnávej (both, whereas, while) a hlavně odpověz na otázku nad fotkami. Spekuluj: might, could, must, it looks as if." },
  { part:3, name:"Part 3 – Collaborative task", time:"4 min (15 s příprava, 2 min diskuse, 1 min rozhodnutí)",
    what:"Uprostřed je otázka a kolem ní pět napsaných podnětů. S partnerem o nich 2 minuty diskutujete, potom máte asi minutu na to, abyste se společně rozhodli.",
    tip:"Hodnotí se spolupráce, ne „správná“ odpověď. Ptej se partnera, reaguj na něj, souhlas i nesouhlas zdůvodni. Nemusíte probrat všech pět podnětů a nemusíte se shodnout." },
  { part:4, name:"Part 4 – Discussion", time:"4 min",
    what:"Zkoušející klade obecnější otázky k tématu z Part 3. Někdy se ptá tebe, někdy partnera a pak tebe, jestli souhlasíš.",
    tip:"Odpovídej delšími úseky než v Part 1: názor → důvod → příklad → druhá strana. Reaguj i na to, co řekl partner." }
],

/* ---------- lessons (Czech) ---------- */
lessons: [
  { id:"how", title:"Jak zkouška probíhá a co se hodnotí",
    points:[
      "Zkouška trvá 14 minut a skládá se ve dvojici (výjimečně ve trojici). V místnosti jsou dva zkoušející: interlocutor s vámi mluví, assessor jen poslouchá a hodnotí.",
      "Assessor hodnotí čtyři kritéria: Grammar and Vocabulary, Discourse Management, Pronunciation a Interactive Communication. Interlocutor dává celkový dojem (Global Achievement). Každé kritérium má pásma 0–5.",
      "Pro B2 (grade C) stačí zhruba pásmo 3 ve všech kritériích. Pásmo 5 odpovídá silnému B2, které už míří ke C1 (grade A).",
      "Hodnotí se celý výkon, ne jednotlivé odpovědi. Jedna chyba nebo zaváhání nevadí – důležité je, jestli celkově zvládáš komunikaci.",
      "Neexistuje „správný“ názor. Můžeš tvrdit cokoli, jen to zdůvodni a dobře vyjádři.",
      "Naučené monology zkoušející poznají (neodpovídají přesně na otázku, zní jinak). Raději mluv přirozeně, i když jednodušeji.",
      "Mluv dost nahlas a čelem k partnerovi i zkoušejícímu. Když nerozumíš, klidně požádej: „Sorry, could you repeat the question, please?“"
    ]},
  { id:"part1", title:"Part 1: jak rozvinout krátkou odpověď",
    points:[
      "Vzorec: odpověď → důvod → detail nebo příklad. „Yes, I do. I play basketball twice a week, mainly because my friends are in the team. We usually go for pizza after training.“",
      "Délka: 2–3 věty, asi 15–20 sekund. Zkoušející tě má ještě čas zeptat na další otázku.",
      "Ukaž různé časy: přítomný prostý pro zvyky, předpřítomný pro zkušenosti (I've never been to…), minulý pro zážitky, „going to“ a „I'd like to“ pro plány.",
      "Nepřeháněj s jednoslovnými odpověďmi („Yes.“ „Football.“), ale ani nevyprávěj celou historii.",
      "Pozor na otázky „Do you prefer… or…?“ – vyber jednu možnost a řekni proč. „Both“ je v pořádku, jen to zdůvodni.",
      "Otázka „Where are you from?“ – stačí věta nebo dvě: „I'm from Plzeň, a city in the west of the Czech Republic.“"
    ]},
  { id:"part2", title:"Part 2: porovnání dvou fotek krok za krokem",
    points:[
      "Nejdřív si přečti otázku nad fotkami – ta je nejdůležitější. Zkoušející ji řekne a je i vytištěná.",
      "Krok 1 – podobnost: „Both photos show people who are…“ Krok 2 – rozdíl: „In the first photo…, whereas in the second one…“",
      "Krok 3 – odpověz na otázku a spekuluj: „I think the man might be doing this because…“, „They must be tired.“, „It looks as if they're enjoying themselves.“",
      "Krok 4 – krátký závěr nebo osobní názor: „Personally, I'd prefer… because…“",
      "Nepopisuj každou fotku zvlášť („In the first picture there is a man. He has a blue T-shirt…“). Za popis detailů body nejsou.",
      "Minuta je krátká: na podobnost a rozdíl stačí 20 s, zbytek času věnuj otázce.",
      "Krátká otázka k partnerovým fotkám (asi 30 s): nemusíš porovnávat, stačí jasný názor a důvod. „I'd choose the first one, because…“"
    ]},
  { id:"part3", title:"Part 3: diskuse s partnerem",
    points:[
      "Na začátku máš asi 15 sekund na prohlédnutí úkolu. Přečti si otázku uprostřed a vyber si podnět, kterým začneš.",
      "Začni návrhem: „Shall we start with this one?“ nebo „Would you like to start?“",
      "U každého podnětu: tvůj názor + důvod + otázka na partnera. „I think a skate park is a great idea, because… What do you think?“",
      "Reaguj na partnera, nejen na podnět: „That's a good point, and also…“, „I see what you mean, but…“",
      "Nemusíte probrat všech pět podnětů. Lepší jsou tři podněty probrané pořádně než pět jedním slovem.",
      "V minutě na rozhodnutí vyjednávejte: „So which one shall we choose?“, „I'd go for… because…“, „OK, let's agree on…“ Shoda není povinná: „I think we'll have to agree to disagree.“",
      "Nedominuj a nečekej pasivně. Střídejte se zhruba rovnoměrně."
    ]},
  { id:"part4", title:"Part 4: názor a zdůvodnění",
    points:[
      "Otázky jsou obecnější než v Part 1 („Do you think young people today…?“). Odpověď by měla trvat asi 30–40 sekund.",
      "Stavba: názor → důvod → příklad → druhá strana. „I think so, because… For example,… But on the other hand,…“",
      "Když tě zkoušející požádá, abys reagoval(a) na partnera („Do you agree?“), navaž na jeho slova: „I agree with Petra that…, but I'd also add…“",
      "Když nevíš, co si myslíš, přiznej to a přemýšlej nahlas: „That's a difficult question. I've never really thought about it, but I suppose…“",
      "Používej obecné příklady ze života, školy nebo své země – nemusí být „chytré“, stačí konkrétní."
    ]},
  { id:"speculate", title:"Spekulace: might, could, must, can't",
    points:[
      "Might / may / could + sloveso = možná: „She might be a teacher.“ „They could be waiting for a train.“",
      "Must = určitě (jsem si skoro jistý): „He must be cold – he isn't wearing a coat.“",
      "Can't = určitě ne: „They can't be on holiday – they're wearing suits.“ (Ne „mustn't be“ – to znamená zákaz.)",
      "Průběhový tvar pro to, co se děje právě teď: „She might be studying for an exam.“ Minulost: „They must have trained for months.“",
      "Look + přídavné jméno: „She looks happy.“ (ne „looks like happy“). Look like + podstatné jméno: „It looks like a school.“ Look as if + věta: „It looks as if they're lost.“",
      "Další užitečné výrazy: „I'd say…“, „Maybe / Perhaps…“, „It's probably…“, „I'm not sure, but…“"
    ]},
  { id:"pron", title:"Výslovnost pro české mluvčí",
    points:[
      "Přízvuk ve slově: v angličtině není vždy na první slabice! phoTOgraph, phoTOgraphy, deVElop, enVIronment, faMIliar, comPUter, beGINning, hoTEL.",
      "Krátká slova (a, the, to, of, for, can, and) se ve větě vyslovují slabě se zvukem /ə/: „a cup of tea“ = /ə kʌp əv tiː/.",
      "Th: /θ/ ve think, three, month; /ð/ ve the, this, mother. Ne „f“, „s“ ani „d“.",
      "W a v: west ≠ vest, wine ≠ vine. U „w“ zaokrouhli rty, zuby se rtu nedotýkají.",
      "Znělé koncovky: angličtina rozlišuje bag/back, eyes/ice, prize/price. Samohlásku před znělou souhláskou prodluž.",
      "Koncovka -ed: /t/ worked, watched; /d/ played, lived; /ɪd/ jen po t a d: wanted, decided. „Liked“ není „lajkid“.",
      "Intonace: u otázek typu ano/ne hlas stoupá, u „wh-“ otázek a oznamovacích vět klesá. Plochá intonace působí znuděně."
    ]},
  { id:"mistakes", title:"Typické chyby českých mluvčích",
    points:[
      "„I am agree“ → I agree. „I am not agree“ → I don't agree.",
      "„It depends of“ → It depends on. „Discuss about“ → discuss (bez about).",
      "„How do you think?“ → What do you think? (ale How do you feel about…?)",
      "„I have 17 years“ → I'm 17. „Since three years“ → for three years.",
      "„Make a photo“ → take a photo; „make sport“ → do sport; „do a mistake“ → make a mistake.",
      "Nepočitatelná slova bez -s a bez „a“: advice, information, homework, news, furniture, equipment.",
      "„In the first photo is a man“ → In the first photo there's a man / I can see a man.",
      "„Actual“ = skutečný, ne aktuální (current). „Eventually“ = nakonec, ne eventuálně (possibly).",
      "„I'm boring“ = jsem nudný; „I'm bored“ = nudím se. Stejně interesting/interested, tiring/tired.",
      "Chybějící členy: „The people in the first photo…“, „They're at a concert.“"
    ]},
  { id:"time", title:"Když chybí slovo nebo potřebuješ čas",
    points:[
      "Získej čas krátkou frází: „Well, let me think…“, „That's a good question.“, „How can I put it?“ – ale jen jednou, ne před každou větou.",
      "Neznáš slovo? Opiš ho: „It's a kind of…“, „It's something you use for…“, „It's the person who…“, „It's a place where…“",
      "Použij obecnější slovo: thing, stuff, place, equipment, tool, machine.",
      "Oprav se klidně: „Sorry, I mean…“, „What I wanted to say is…“ – oprava je lepší než ticho.",
      "Nerozumíš otázce? „Sorry, could you say that again, please?“ nebo „Do you mean…?“ Body za to nepřijdeš.",
      "Nemluv česky ani na chvilku („jak se to řekne…“) – i „Erm…“ zní lépe."
    ]}
],

/* quick quiz in the lessons page: typical mistakes of Czech speakers */
mistakes: [
  { wrong:"I am agree with you.", right:"I agree with you.", why:"Agree je sloveso, ne přídavné jméno – „am“ nepatří." },
  { wrong:"It depends of the weather.", right:"It depends on the weather.", why:"Depend se pojí s předložkou on (záviset NA)." },
  { wrong:"How do you think?", right:"What do you think?", why:"Na názor se ptáme What. „How do you feel about…?“ je také správně." },
  { wrong:"I have seventeen years.", right:"I'm seventeen.", why:"Věk vyjadřujeme slovesem be." },
  { wrong:"I live here since three years.", right:"I've lived here for three years.", why:"Děj trvající do teď = předpřítomný čas; doba trvání = for, začátek = since." },
  { wrong:"They are making a photo.", right:"They are taking a photo.", why:"Fotografii v angličtině pořizujeme slovesem take: take a photo / a picture (ne make)." },
  { wrong:"She looks like happy.", right:"She looks happy.", why:"Look + přídavné jméno; look like + podstatné jméno (She looks like a teacher)." },
  { wrong:"In the second photo is a woman.", right:"In the second photo there's a woman.", why:"Existenci něčeho vyjadřuje there is / there are (nebo I can see…)." },
  { wrong:"Can you give me an advice?", right:"Can you give me some advice?", why:"Advice je nepočitatelné – bez „an“ a bez -s. Jedna rada = a piece of advice." },
  { wrong:"We discussed about the problem.", right:"We discussed the problem.", why:"Discuss má přímý předmět, bez about. (Ale: talk about.)" },
  { wrong:"They must be not tired.", right:"They can't be tired.", why:"Logický zápor k must (určitě) je can't (určitě ne)." },
  { wrong:"I'm interesting in music.", right:"I'm interested in music.", why:"-ed = jak se cítím; -ing = jaká věc je (music is interesting)." },
  { wrong:"The people is very happy.", right:"The people are very happy.", why:"People je množné číslo." },
  { wrong:"It's more better.", right:"It's much better.", why:"Better už je 2. stupeň; zesilujeme ho much / a lot / far." },
  { wrong:"I didn't went there.", right:"I didn't go there.", why:"Po did / didn't následuje základní tvar slovesa." },
  { wrong:"He explained me the rules.", right:"He explained the rules to me.", why:"Vysvětlit něco někomu = explain something TO somebody; „explain me“ je chyba." },
  { wrong:"If I will have time, I'll come.", right:"If I have time, I'll come.", why:"Ve vedlejší větě s if se budoucí čas nepoužívá." },
  { wrong:"I'm going to the school by foot.", right:"I walk to school. / I go to school on foot.", why:"On foot (ne by foot); go to school bez členu, když tam chodíme studovat." },
  { wrong:"My actual job is quite boring.", right:"My current job is quite boring.", why:"Actual = skutečný. Aktuální = current / present." },
  { wrong:"Eventually we could go by train.", right:"Possibly we could go by train.", why:"Eventually = nakonec, po nějaké době. Eventuálně = possibly / alternatively." },
  { wrong:"I'm looking forward to see you.", right:"I'm looking forward to seeing you.", why:"Po look forward to následuje -ing tvar." },
  { wrong:"There were a lot of informations.", right:"There was a lot of information.", why:"Information je nepočitatelné, sloveso je v jednotném čísle." },
  { wrong:"I prefer staying at home than going out.", right:"I prefer staying at home to going out. / I'd rather stay at home than go out.", why:"Po prefer srovnáváme pomocí to (prefer A to B), po I'd rather pomocí than." },
  { wrong:"I'd like to make more sport.", right:"I'd like to do more sport.", why:"Sport se v angličtině „dělá“: do sport / exercise; ale play football, go swimming." }
],

/* ---------- functional phrase banks: [phrase, example]. parts = where the group helps most ---------- */
phrases: [
  { id:"self", cz:"Mluvit o sobě", en:"Talking about yourself", parts:["p1"], items:[
    ["I'm really into …", "I'm really into basketball at the moment."],
    ["I'm not a big fan of …", "I'm not a big fan of horror films."],
    ["I usually … / I tend to …", "I tend to do my homework late in the evening."],
    ["I used to …, but now …", "I used to hate vegetables, but now I quite like them."],
    ["I've been … for …", "I've been learning the guitar for two years."],
    ["I've never …", "I've never been abroad on my own."],
    ["To be honest, …", "To be honest, I don't have much free time."],
    ["It depends on …", "It depends on the weather, really."],
    ["I'd rather … than …", "I'd rather stay in than go to a crowded party."],
    ["What I like most about … is …", "What I like most about my town is the river."],
    ["I'm hoping to …", "I'm hoping to study medicine after school."],
    ["I'd love to … one day.", "I'd love to visit Japan one day."],
    ["If I had more time, I'd …", "If I had more time, I'd learn to cook properly."],
    ["When I was younger, I …", "When I was younger, I spent every summer at my grandma's."],
    ["The main reason is that …", "The main reason is that it helps me relax."],
    ["Most of the time …, but sometimes …", "Most of the time I take the bus, but sometimes I cycle."]
  ]},
  { id:"compare", cz:"Porovnávat fotky", en:"Comparing", parts:["p2"], items:[
    ["Both photos show …", "Both photos show people who are working outdoors."],
    ["In both pictures …", "In both pictures the people seem to be enjoying themselves."],
    ["In the first photo …, whereas in the second one …", "In the first photo they're at home, whereas in the second one they're in a restaurant."],
    ["…, while …", "The boy looks relaxed, while the girl looks a bit nervous."],
    ["One big difference is that …", "One big difference is that the first group is outside."],
    ["The main similarity is that …", "The main similarity is that they're all learning something new."],
    ["Unlike the people in the first photo, …", "Unlike the people in the first photo, the woman is on her own."],
    ["Compared to …, …", "Compared to the city, the village looks very quiet."],
    ["… is more … than …", "The second situation is more stressful than the first one."],
    ["… isn't as … as …", "The bus isn't as fast as the train, but it's cheaper."],
    ["On the other hand, …", "On the other hand, the people in the second photo are alone."],
    ["The first photo looks more … to me.", "The first photo looks more relaxing to me."],
    ["Another difference is that …", "Another difference is that the second group is much older."],
    ["Personally, I'd prefer …", "Personally, I'd prefer to study in the library."]
  ]},
  { id:"speculate", cz:"Spekulovat (might / could / must / can't)", en:"Speculating", parts:["p2"], items:[
    ["They might be …", "They might be friends from school."],
    ["She could be …", "She could be waiting for a friend."],
    ["He must be …", "He must be tired after such a long run."],
    ["They can't be …", "They can't be on holiday – they're wearing work clothes."],
    ["They might have …", "They might have won the match."],
    ["She looks + adjective", "She looks really excited."],
    ["It looks like + noun", "It looks like a birthday party."],
    ["It looks as if …", "It looks as if they're lost."],
    ["They seem to be …", "They seem to be having a great time."],
    ["I'd say …", "I'd say they're about sixteen."],
    ["Perhaps / Maybe …", "Maybe they're celebrating the end of their exams."],
    ["It's probably …", "It's probably quite expensive to stay there."],
    ["I'm not sure, but I think …", "I'm not sure, but I think it's early in the morning."],
    ["I imagine they feel …", "I imagine they feel proud of themselves."],
    ["…, probably because …", "He looks worried, probably because he's late."]
  ]},
  { id:"opinion", cz:"Vyjádřit a zdůvodnit názor", en:"Giving opinions", parts:["p3","p4"], items:[
    ["I think / I believe …", "I think young people spend too much time online."],
    ["In my opinion, …", "In my opinion, cooking should be taught at school."],
    ["Personally, I feel that …", "Personally, I feel that cities are too noisy."],
    ["As far as I'm concerned, …", "As far as I'm concerned, sport is the best way to relax."],
    ["The main reason is …", "The main reason is that it's cheap."],
    ["For example, … / For instance, …", "For example, my brother learnt Spanish from films."],
    ["That's because …", "That's because most teenagers don't have a car."],
    ["On the one hand, … On the other hand, …", "On the one hand, it's fun. On the other hand, it's quite dangerous."],
    ["It's true that …, but …", "It's true that it's expensive, but it's worth it."],
    ["What's more, … / Also, …", "What's more, it's good for the environment."],
    ["I'm not sure, but …", "I'm not sure, but I think it depends on the person."],
    ["In general, …", "In general, people are happier when they do sport."]
  ]},
  { id:"ask", cz:"Zeptat se partnera na názor", en:"Asking for opinions", parts:["p3","p4"], items:[
    ["What do you think?", "I think it's useful. What do you think?"],
    ["What do you think about …?", "What do you think about the skate park?"],
    ["How do you feel about …?", "How do you feel about studying with friends?"],
    ["Do you agree?", "It's the cheapest option. Do you agree?"],
    ["What about you?", "I'd choose the museum. What about you?"],
    ["Would you like to start?", "Would you like to start, or shall I?"],
    ["Do you think … is a good idea?", "Do you think a longer break is a good idea?"],
    ["Which one do you think is …?", "Which one do you think is the most important?"],
    ["Have you ever …?", "Have you ever tried learning with an app?"],
    ["Don't you think …?", "Don't you think it's a bit expensive?"]
  ]},
  { id:"agree", cz:"Souhlasit a rozvíjet", en:"Agreeing", parts:["p3","p4"], items:[
    ["I agree with you.", "I agree with you – it's really important."],
    ["That's a good point.", "That's a good point. I hadn't thought of that."],
    ["You're right.", "You're right, it would save a lot of time."],
    ["Exactly!", "Exactly! And it's cheaper too."],
    ["I think so too.", "I think so too, especially for older people."],
    ["Me too. / Me neither.", "Me neither – I've never tried it."],
    ["I couldn't agree more.", "I couldn't agree more, it's the best option."],
    ["Yes, and also …", "Yes, and also you can meet new people there."],
    ["That's true, and …", "That's true, and it's good for your health as well."],
    ["Absolutely.", "Absolutely. It would help a lot of students."]
  ]},
  { id:"disagree", cz:"Zdvořile nesouhlasit", en:"Disagreeing politely", parts:["p3","p4"], items:[
    ["I see what you mean, but …", "I see what you mean, but it might be too expensive."],
    ["I'm not sure about that.", "I'm not sure about that. Not everyone likes sport."],
    ["I don't really agree, because …", "I don't really agree, because it takes a lot of time."],
    ["That's true, but …", "That's true, but what about people who live far away?"],
    ["Maybe, but don't you think …?", "Maybe, but don't you think it's a bit boring?"],
    ["I'm afraid I don't agree.", "I'm afraid I don't agree. I think it's the least useful."],
    ["Yes, but on the other hand …", "Yes, but on the other hand, it's very popular."],
    ["I'm not so sure it would work.", "I'm not so sure it would work in a small town."],
    ["I see it a bit differently.", "I see it a bit differently, actually."],
    ["Do you really think so?", "Do you really think so? I'd say it's the opposite."]
  ]},
  { id:"suggest", cz:"Navrhnout a posunout diskusi", en:"Suggesting and moving on", parts:["p3"], items:[
    ["Shall we start with …?", "Shall we start with the library?"],
    ["Let's start with …", "Let's start with this one – the cost."],
    ["What about …?", "What about cheaper buses?"],
    ["How about …?", "How about talking about the music next?"],
    ["Let's move on to …", "Let's move on to the next one."],
    ["Shall we talk about … now?", "Shall we talk about the food now?"],
    ["We haven't talked about … yet.", "We haven't talked about the weather yet."],
    ["Why don't we …?", "Why don't we look at the last one?"],
    ["Going back to …", "Going back to what you said about money…"],
    ["Sorry, I interrupted you. Go on.", "Sorry, I interrupted you. Go on, please."]
  ]},
  { id:"decide", cz:"Rozhodnout se", en:"Reaching a decision", parts:["p3"], items:[
    ["So, which one shall we choose?", "So, which one shall we choose?"],
    ["I'd go for … because …", "I'd go for the bike lanes because they're cheap."],
    ["I think … is the most important.", "I think sleep is the most important."],
    ["Shall we choose …?", "Shall we choose the walking tour, then?"],
    ["Are we agreed, then?", "So it's the museum. Are we agreed, then?"],
    ["OK, let's go with …", "OK, let's go with your idea."],
    ["So we've decided that …", "So we've decided that the club is the best option."],
    ["I'm happy with that.", "Yes, I'm happy with that."],
    ["Let's say … and …", "Let's say cooking and first aid."],
    ["I think we'll have to agree to disagree.", "I think we'll have to agree to disagree on this one."]
  ]},
  { id:"time", cz:"Získat čas a opravit se", en:"Gaining time and repairing", parts:["p1","p2","p3","p4"], items:[
    ["Well, let me think …", "Well, let me think… probably last summer."],
    ["That's a good question.", "That's a good question. I'm not really sure."],
    ["How can I put it?", "How can I put it? It's not really my thing."],
    ["It's a kind of …", "It's a kind of small boat."],
    ["It's something you use for …", "It's something you use for cutting wood."],
    ["It's a place where …", "It's a place where you can borrow books."],
    ["Sorry, I mean …", "He's my cousin – sorry, I mean my uncle."],
    ["What I wanted to say is …", "What I wanted to say is that it's too far."],
    ["Sorry, could you repeat the question, please?", "Sorry, could you repeat the question, please?"],
    ["I've never really thought about it, but …", "I've never really thought about it, but I suppose so."]
  ]}
],

/* answer builders: Part 2 long turn and Part 4 answers (also used as tick-off checklists while speaking) */
p2builder: [
  { step:"Podobnost", en:"Similarity", starters:["Both photos show…","In both pictures…"] },
  { step:"Rozdíl", en:"Difference", starters:["In the first photo…, whereas in the second…","One big difference is that…"] },
  { step:"Odpověď na otázku", en:"Answer the question", starters:["I think they might… because…","They must be…"] },
  { step:"Závěr", en:"Round off", starters:["Personally, I'd prefer…","Overall, I think…"] }
],
builder: [
  { step:"Názor", en:"Opinion", starters:["I think…","In my opinion,…","Personally, I feel that…"] },
  { step:"Důvod", en:"Reason", starters:["The main reason is that…","That's because…"] },
  { step:"Příklad", en:"Example", starters:["For example,…","In my country,…","When I was…"] },
  { step:"Druhá strana", en:"Other side", starters:["On the other hand,…","But it depends on…","Of course, some people…"] }
],

/* short partner lines used when the learner passes the turn and set lines have run out (Part 3, Part 4) */
partnerGeneric: [
  "Hmm, I see what you mean. What else do you think?",
  "That's a good point. Shall we talk about another one?",
  "I hadn't thought about it like that. Go on.",
  "Yes, I agree with that, more or less.",
  "Really? I'm not so sure. Why do you think so?"
],
partnerP4: [
  "I agree, mostly. But I think it really depends on the person.",
  "I'm not so sure, actually. In my town it's a bit different.",
  "Yes, I think so too. My friends would say the same.",
  "That's true, but I think there's another side to it as well."
],

/* ---------- PART 1: interview question groups.
   questions = asked to the learner; model = sample strong-B2 answer to questions[0];
   pq/pa = a question the interlocutor asks the partner and the partner's short answer (for the paired feel). ---------- */
p1: [
  { id:"p1-01", theme:"Home and family", cz:"Domov a rodina", questions:[
    "Tell us about the people you live with.",
    "Who are you most similar to in your family?",
    "What do you like doing together as a family?",
    "Do you help much with the housework at home?",
    "Would you like to live in a different kind of home in the future?"],
    model:"I live with my parents and my younger brother, who's twelve. We get on quite well most of the time, although he can be really annoying when he plays his music too loud. My dad works from home a lot, so he's usually the one who cooks dinner, and at weekends we try to eat together and talk about our week.",
    pq:"Who are you most similar to in your family?",
    pa:"Probably my mum. We both love reading and we're both quite organised. My dad says we even laugh in the same way!" },

  { id:"p1-02", theme:"Free time", cz:"Volný čas", questions:[
    "What do you usually do in your free time?",
    "Do you prefer spending your free time indoors or outdoors?",
    "Is there a new hobby you'd like to try?",
    "Do you have more or less free time than a few years ago?",
    "What did you do last weekend?"],
    model:"It depends on how much homework I have, but I usually meet my friends after school, and we either go to the park or just hang out at someone's house. I also play the drums, so I practise for about half an hour most evenings. At the weekend I like to sleep a bit longer and maybe watch a film.",
    pq:"Is there a new hobby you'd like to try?",
    pa:"Yes, I'd love to try climbing. A friend of mine goes to a climbing wall every week and she says it's great fun and really good exercise." },

  { id:"p1-03", theme:"School and studies", cz:"Škola a studium", questions:[
    "What's your favourite subject at school, and why?",
    "Is there a subject you find difficult?",
    "How do you usually prepare for exams?",
    "Do you prefer studying alone or with other people?",
    "What would you change about your school if you could?"],
    model:"My favourite subject is probably biology. I've always been interested in how the human body works, and our teacher makes the lessons really practical – last month we even did experiments in the school garden. I'm thinking about studying medicine, so it's also quite useful for my future.",
    pq:"How do you usually prepare for exams?",
    pa:"I make a plan about two weeks before and I write short notes on cards. Then my sister tests me, which really helps." },

  { id:"p1-04", theme:"Work and jobs", cz:"Práce a zaměstnání", questions:[
    "Have you ever had a part-time or summer job?",
    "What job would you like to do in the future?",
    "Would you prefer to work for a big company or for yourself?",
    "Is it important to enjoy your job, or is the money more important?",
    "What jobs are popular among young people in your country?"],
    model:"Yes, last summer I worked in a café near the river for about six weeks. It was hard work, especially when it was really hot and there were lots of tourists, but I learnt a lot – for example, how to stay calm when customers are rude. And of course it was nice to earn my own money for the first time.",
    pq:"What job would you like to do in the future?",
    pa:"I'd like to be an architect. I've always enjoyed drawing buildings, and I think it would be amazing to walk past something you designed yourself." },

  { id:"p1-05", theme:"Friends", cz:"Přátelé", questions:[
    "Tell us about your best friend.",
    "How did you meet your closest friends?",
    "What do you usually do when you meet your friends?",
    "Do you think it's easy to make new friends?",
    "Do you prefer having a lot of friends or just a few close ones?"],
    model:"My best friend is called Jakub and we've known each other since primary school. He's really funny and very loyal – if I have a problem, he's always the first person I call. We're quite different, actually, because he loves football and I'm more into music, but I think that's why we never get bored together.",
    pq:"Do you think it's easy to make new friends?",
    pa:"Not for me, to be honest. I'm quite shy at first, so it takes me a while. But once I know people, I'm very chatty." },

  { id:"p1-06", theme:"Holidays", cz:"Prázdniny a dovolená", questions:[
    "Where did you go on your last holiday?",
    "Do you prefer holidays by the sea or in the mountains?",
    "Who do you usually go on holiday with?",
    "Is there a country you'd really like to visit?",
    "Do you like planning holidays, or do you prefer to just go?"],
    model:"Last summer I went to Croatia with my family. We stayed in a small apartment near the beach, and we spent most of the time swimming and exploring the old towns along the coast. The best part was a boat trip to an island, where we saw dolphins – I'd never seen them in the wild before, so that was really special.",
    pq:"Do you prefer holidays by the sea or in the mountains?",
    pa:"The mountains, definitely. I don't really like lying on the beach all day – I get bored. I'd rather go hiking and see something new every day." },

  { id:"p1-07", theme:"Food and meals", cz:"Jídlo", questions:[
    "What's your favourite meal, and why?",
    "Do you enjoy cooking?",
    "How often do you eat out?",
    "Is there any food you really don't like?",
    "Do you think you have a healthy diet?"],
    model:"My favourite meal is my grandmother's chicken soup. She makes it every Sunday when we visit her, and it always reminds me of my childhood. It's nothing special, really – just chicken, vegetables and noodles – but nobody else can make it taste the same. I've tried to cook it myself, but it's never as good.",
    pq:"Do you enjoy cooking?",
    pa:"I do, but I only cook simple things like pasta or omelettes. I'd like to learn to make more dishes before I move out." },

  { id:"p1-08", theme:"Sport and exercise", cz:"Sport a pohyb", questions:[
    "What sports do you enjoy doing or watching?",
    "Did you do much sport when you were younger?",
    "Do you prefer team sports or individual sports?",
    "Is there a sport you'd like to try in the future?",
    "How do you keep fit?"],
    model:"I really enjoy playing volleyball. I've been in a team for about three years now, and we train twice a week. I like it because it's a team sport, so you can't win on your own – you have to work together. I also watch football on TV sometimes, but only big matches, because watching a whole season would take too much time.",
    pq:"Do you prefer team sports or individual sports?",
    pa:"Individual sports, I think. I go running on my own, so I can choose when and where to go, and I don't have to depend on anyone else." },

  { id:"p1-09", theme:"Music", cz:"Hudba", questions:[
    "What kind of music do you like listening to?",
    "Do you play a musical instrument?",
    "Have you ever been to a concert or a music festival?",
    "When do you usually listen to music?",
    "Has your taste in music changed over the years?"],
    model:"I listen to lots of different things, but mostly pop and a bit of rock. I usually have music on when I'm travelling to school or doing housework, because it makes boring things more fun. Recently I've also started listening to some older bands that my dad likes – I was surprised that I actually enjoy them!",
    pq:"Have you ever been to a concert or a music festival?",
    pa:"Yes, I went to a festival last summer with my cousins. It was really muddy because it rained a lot, but the atmosphere was fantastic." },

  { id:"p1-10", theme:"Films and TV", cz:"Filmy a televize", questions:[
    "What kind of films do you enjoy?",
    "Do you prefer watching films at home or at the cinema?",
    "Is there a TV series you're watching at the moment?",
    "Do you usually watch films in English?",
    "Tell us about a film you've seen recently."],
    model:"I really like comedies and also science fiction films. After a long day at school I don't want anything too serious, so a good comedy is perfect. But I also love films about space and the future, because they make you think about what life might be like in a hundred years. My friends think they're boring, so I usually watch them alone.",
    pq:"Do you prefer watching films at home or at the cinema?",
    pa:"At home, mostly, because it's much cheaper. But for really big action films I think the cinema is better – the sound is amazing." },

  { id:"p1-11", theme:"Books and reading", cz:"Knihy a čtení", questions:[
    "Do you enjoy reading? Why or why not?",
    "What kind of books do you like?",
    "Do you prefer paper books or reading on a screen?",
    "Did you read a lot when you were a child?",
    "Is there a book you'd recommend to a friend?"],
    model:"Yes, I do, although I don't read as much as I used to. When I was younger I read every evening before bed, but now I'm usually too tired or I'm on my phone. I still read on holiday, though – mostly detective stories, because I like trying to guess who did it before the end.",
    pq:"Do you prefer paper books or reading on a screen?",
    pa:"Paper books, definitely. I spend all day looking at screens, so it's nice to hold a real book. I also like seeing them on my shelf." },

  { id:"p1-12", theme:"Technology and phones", cz:"Technologie a mobil", questions:[
    "How much time do you spend on your phone every day?",
    "What do you mainly use the internet for?",
    "Could you live without your phone for a week?",
    "Is there a piece of technology you'd like to buy?",
    "Do your parents use technology in the same way as you?"],
    model:"Probably too much, if I'm honest – about four hours a day. I use it for almost everything: chatting with friends, listening to music, checking the bus times and sometimes for homework. I've started switching it off an hour before bed, though, because I noticed I was sleeping really badly.",
    pq:"Could you live without your phone for a week?",
    pa:"I think I could, but it would be difficult. I'd miss chatting with my friends most. Maybe it would be good for me, though." },

  { id:"p1-13", theme:"Shopping", cz:"Nakupování", questions:[
    "Do you enjoy going shopping?",
    "Do you prefer shopping online or in real shops?",
    "What was the last thing you bought for yourself?",
    "Who do you usually go shopping with?",
    "Are there good shops where you live?"],
    model:"Not really, to be honest. I find shopping centres too crowded and noisy, especially at the weekend. If I need something, I usually know exactly what I want, so I go in, buy it and leave as quickly as possible. The only shops I really enjoy are bookshops – I can spend hours in them without noticing.",
    pq:"Do you prefer shopping online or in real shops?",
    pa:"For clothes I prefer real shops, because I need to try things on. But for things like books or electronics I usually buy online because it's cheaper." },

  { id:"p1-14", theme:"Weather and seasons", cz:"Počasí a roční období", questions:[
    "What's your favourite time of year, and why?",
    "What do you like doing when the weather is bad?",
    "Does the weather affect how you feel?",
    "What's the weather usually like where you live?",
    "Would you like to live in a hotter or colder country?"],
    model:"I'd say spring is my favourite. After a long, grey winter it's great when the days get longer and everything starts to turn green again. I love the first warm days when you can sit outside in a café without a coat. Summer is nice too, but in my city it can get uncomfortably hot in July.",
    pq:"Does the weather affect how you feel?",
    pa:"Yes, a lot. When it's sunny I feel full of energy, but in November, when it's dark at four o'clock, I just want to stay in bed." },

  { id:"p1-15", theme:"Your town", cz:"Tvoje město", questions:[
    "What do you like about the place where you live?",
    "Is there anything you'd like to change about your town?",
    "What is there for young people to do there?",
    "Has your town changed much since you were a child?",
    "Would you like to live somewhere else in the future?"],
    model:"I live in quite a small town, and what I like most is that everything is close. I can walk to school in ten minutes, and there's a lovely park with a lake where people go jogging and have picnics. It's also very safe, so my parents don't worry when I come home late. The only problem is that there isn't much to do in the evenings.",
    pq:"What is there for young people to do there?",
    pa:"Not a lot, actually. There's a cinema and a sports centre, but no clubs or concerts, so most of us go to the city at weekends." },

  { id:"p1-16", theme:"Daily routine", cz:"Denní režim", questions:[
    "What's a typical day like for you?",
    "Are you a morning person?",
    "What's your favourite part of the day?",
    "How do you usually get to school or work?",
    "How is your weekend different from your weekdays?"],
    model:"On weekdays I get up at about half past six, which is too early for me! I have breakfast, catch the bus and I'm at school by eight. Lessons usually finish at about two, then I have lunch and go to basketball training or do my homework. In the evening I relax – I watch something or chat with friends – and I try to be in bed by eleven.",
    pq:"Are you a morning person?",
    pa:"No, not at all! I need two alarms and a big cup of tea before I can talk to anyone. I'm much more awake in the evening." },

  { id:"p1-17", theme:"Special occasions", cz:"Svátky a oslavy", questions:[
    "How do you usually celebrate your birthday?",
    "What's the most important festival in your country?",
    "Do you prefer big parties or small celebrations?",
    "Tell us about a special day you remember well.",
    "Do you enjoy giving presents?"],
    model:"Usually quite simply. I have a family dinner on the day itself – my mum always makes my favourite cake – and then at the weekend I invite a few friends to go bowling or to a pizza place. I don't really like big parties where you don't know half the people. I'd rather spend the day with the people who matter most to me.",
    pq:"Do you enjoy giving presents?",
    pa:"Yes, I love it, actually – maybe more than getting them. I like trying to find something that's perfect for the person." },

  { id:"p1-18", theme:"Learning English", cz:"Angličtina", questions:[
    "How long have you been learning English?",
    "What do you find most difficult about English?",
    "How do you practise English outside class?",
    "Why is English important for you?",
    "Would you like to learn another language?"],
    model:"I've been learning English for about ten years, since I was in the second year of primary school. At first it was just songs and games, but it got more serious later on. These days I think I learn most outside school – I watch series in English with English subtitles, and I play online games where I chat with people from other countries.",
    pq:"Would you like to learn another language?",
    pa:"Yes, I'd like to learn Spanish. It's spoken in so many countries, and I'd love to travel around South America one day." },

  { id:"p1-19", theme:"Animals and pets", cz:"Zvířata", questions:[
    "Have you got a pet?",
    "What's your favourite animal, and why?",
    "Did you have a pet when you were a child?",
    "Do you think it's a good idea for children to have pets?",
    "Would you like to work with animals?"],
    model:"Yes, we've got a dog called Max. He's a mix of different breeds and we got him from an animal shelter about four years ago. He's very friendly and full of energy, so I take him for a long walk every evening. Having a dog is a lot of responsibility, but he's part of the family now and I can't imagine our home without him.",
    pq:"What's your favourite animal, and why?",
    pa:"I love horses. My aunt has a farm and I used to ride there every summer. They're really clever animals and very calm." },

  { id:"p1-20", theme:"Clothes and fashion", cz:"Oblečení a móda", questions:[
    "What kind of clothes do you like wearing?",
    "Do you follow fashion?",
    "Do you ever buy second-hand clothes?",
    "Is there an item of clothing you've had for a long time?",
    "Do you dress differently at the weekend?"],
    model:"I mostly wear comfortable things – jeans, T-shirts and trainers. I don't really follow fashion, because trends change so quickly and clothes are expensive. I'd rather buy a few things I really like and wear them for years. My favourite thing at the moment is a green jacket that I found in a second-hand shop for almost nothing.",
    pq:"Do you dress differently at the weekend?",
    pa:"Yes, at school we can't wear sports clothes, so at the weekend I just wear tracksuits and hoodies. It's much more comfortable." },

  { id:"p1-21", theme:"Health", cz:"Zdraví", questions:[
    "What do you do to stay healthy?",
    "Do you think you get enough sleep?",
    "Is it easy to eat healthily where you live?",
    "What do you do when you feel stressed?",
    "Is there anything about your lifestyle you'd like to change?"],
    model:"I try to do some exercise every day, even if it's just walking instead of taking the bus. I also go swimming once a week with my sister. I'm not perfect with food – I eat too many sweets – but my parents cook healthy meals, so I think I'm OK. The thing I really need to improve is sleep, because I often go to bed after midnight.",
    pq:"What do you do when you feel stressed?",
    pa:"I usually go for a walk with my headphones on. After half an hour outside I always feel calmer and I can think more clearly." },

  { id:"p1-22", theme:"Getting around", cz:"Doprava", questions:[
    "How do you usually travel around your town?",
    "What do you think of public transport where you live?",
    "Do you enjoy long journeys?",
    "Would you like to learn to drive?",
    "Do you ever cycle?"],
    model:"Mostly by bus, because I don't have a car and my school is too far to walk. The buses are fine, but they're often late in the morning when the traffic is bad. In summer I prefer to cycle – it's faster, it's free and I get some exercise at the same time. The only problem is that there aren't many bike lanes in my town.",
    pq:"Would you like to learn to drive?",
    pa:"Yes, I'm starting lessons next month, actually. I'm a bit nervous, but it will be really useful because the buses in my village are terrible." },

  { id:"p1-23", theme:"Weekends", cz:"Víkendy", questions:[
    "What do you usually do at the weekend?",
    "What was the best weekend you've had recently?",
    "Do you prefer busy weekends or relaxing ones?",
    "Do you ever have to study or work at the weekend?",
    "What are you doing next weekend?"],
    model:"On Saturdays I usually sleep late and then help my parents with the shopping or cleaning. In the afternoon I meet my friends – we often go to the cinema or just sit in a café and talk. Sundays are quieter: we visit my grandparents for lunch, and in the evening I prepare my things for school. It's a nice mix of fun and rest.",
    pq:"Do you prefer busy weekends or relaxing ones?",
    pa:"Relaxing ones, definitely. My weeks are so busy with school and training that at the weekend I just want to do nothing for a while." },

  { id:"p1-24", theme:"Childhood", cz:"Dětství", questions:[
    "What did you enjoy doing when you were a child?",
    "Who was your best friend when you were small?",
    "What games did you play when you were younger?",
    "Do you think childhood is different today?",
    "What's one of your earliest memories?"],
    model:"I loved being outside. We lived near a forest, so my friends and I spent hours there building little houses from branches and pretending we were explorers. We only came home when we were hungry or when it got dark. I also remember collecting stickers of footballers – I had hundreds of them and I knew all their names.",
    pq:"Do you think childhood is different today?",
    pa:"Yes, I think so. Children today spend much more time on tablets and phones. When I was small, we played outside every day." },

  { id:"p1-25", theme:"Nature", cz:"Příroda", questions:[
    "How often do you spend time in the countryside?",
    "Is there a place in nature you particularly like?",
    "Do you prefer the city or the countryside?",
    "Have you ever been camping?",
    "Do you do anything to protect the environment?"],
    model:"Quite often, actually, because my grandparents have a cottage about an hour from the city. We go there most weekends in summer, and I love it because it's so quiet – there's no traffic, just birds and the river. We go walking in the hills or pick mushrooms in the forest. When I come back to the city, I always feel much more relaxed.",
    pq:"Have you ever been camping?",
    pa:"Yes, a few times with the scouts. Once it rained for three days and our tent got wet, but it's still one of my best memories!" },

  { id:"p1-26", theme:"Hobbies and skills", cz:"Koníčky a dovednosti", questions:[
    "Is there something you're particularly good at?",
    "What skill would you most like to learn?",
    "Who taught you the most useful things you know?",
    "Do you prefer learning things from videos or from a teacher?",
    "Is there a hobby you've given up?"],
    model:"I think I'm quite good at drawing. I've been doing it since I was little, and now I draw mostly cartoons and portraits of my friends. Last year one of my drawings was chosen for the cover of our school magazine, which made me really proud. I'd like to get better at drawing on a tablet, because that could be useful for a job one day.",
    pq:"Is there a hobby you've given up?",
    pa:"Yes, I played the piano for five years, but I stopped when I started secondary school. Now I'm a bit sorry – I've forgotten almost everything." },

  { id:"p1-27", theme:"News and social media", cz:"Zprávy a sociální sítě", questions:[
    "How do you usually find out what's happening in the world?",
    "Which social media apps do you use most?",
    "Do you post a lot online?",
    "Do you think everything you read online is true?",
    "What kind of news stories interest you most?"],
    model:"Mostly from social media, to be honest, which isn't always the best source. I follow a couple of news websites, so I see their posts during the day. If something big happens, I check it on a proper news site or ask my parents, because they watch the news on TV every evening. I'm more interested in science and sport than politics.",
    pq:"Do you post a lot online?",
    pa:"Not really. I sometimes post photos from holidays, but most of the time I just look at what other people post." },

  { id:"p1-28", theme:"Money", cz:"Peníze", questions:[
    "Are you good at saving money?",
    "What do you usually spend your money on?",
    "Did you get pocket money when you were younger?",
    "Is there something you're saving for at the moment?",
    "Should young people have a part-time job?"],
    model:"I'm getting better at it. I used to spend all my money as soon as I got it, mostly on snacks and games. Now I'm saving for a new laptop, so I put half of what I earn from babysitting into a separate account. It's quite hard sometimes when my friends want to go out, but I think it'll be worth it.",
    pq:"What do you usually spend your money on?",
    pa:"Mostly on food and going out with friends. And concert tickets – they're really expensive, but I think live music is worth it." },

  { id:"p1-29", theme:"Future plans", cz:"Plány do budoucna", questions:[
    "What are you planning to do after you finish school?",
    "Where would you like to live in ten years' time?",
    "Would you like to study or work abroad?",
    "What do you hope to achieve in the next few years?",
    "Do you usually make plans, or do you prefer to be spontaneous?"],
    model:"I'm hoping to go to university to study computer science. I'm not sure which university yet – it depends on my exam results. Before that, though, I'd like to take a few months off and travel, maybe around Europe by train. I think it would be good to see a bit of the world before I start studying again.",
    pq:"Would you like to study or work abroad?",
    pa:"Yes, I'd love to spend a year in Ireland or Scotland. It would be great for my English, and I've heard the people there are really friendly." },

  { id:"p1-30", theme:"Games", cz:"Hry", questions:[
    "Do you enjoy playing games, for example board games or video games?",
    "What games did you play with your family when you were younger?",
    "Do you prefer playing games alone or with other people?",
    "Do you think video games can be good for you?",
    "How much time do you spend playing games?"],
    model:"Yes, I really like board games. My friends and I have a games evening about once a month – we take turns to host it, and everybody brings some snacks. My favourite is a strategy game where you build cities and trade with the other players. It can take three hours, but it's great fun, and it's a nice change from looking at screens.",
    pq:"Do you think video games can be good for you?",
    pa:"I think some can be. Some games help you solve problems or work in a team. But if you play for eight hours a day, it's probably not healthy." },

  { id:"p1-31", theme:"Art and photography", cz:"Umění a fotografie", questions:[
    "Do you like taking photos?",
    "Have you been to a museum or gallery recently?",
    "Were you good at art at school?",
    "Do you have any pictures or posters in your room?",
    "Would you like to learn to paint or draw?"],
    model:"Yes, I take photos all the time, mostly on my phone. I especially like taking pictures of nature – sunsets, flowers, that kind of thing. Last year I bought a second-hand camera and started taking it on trips, and I've noticed that it makes me look at places more carefully. I'd love to do a photography course one day.",
    pq:"Have you been to a museum or gallery recently?",
    pa:"Yes, I went to a science museum with my class last month. There were lots of interactive things to try, so it wasn't boring at all." },

  { id:"p1-32", theme:"Where you live", cz:"Kde bydlíš", questions:[
    "Do you live in a house or a flat?",
    "What's your favourite room in your home, and why?",
    "Do you share a bedroom with anyone?",
    "What do you like about your neighbourhood?",
    "What would your dream home be like?"],
    model:"I live in a flat on the fourth floor of quite an old building in the centre. It's not very big, but it has a balcony with a great view of the river, and in summer we have breakfast out there. The only thing I don't like is that there's no lift, so carrying the shopping upstairs is quite tiring.",
    pq:"What would your dream home be like?",
    pa:"A small house by the sea with a big garden. I'd have a dog and lots of plants, and I'd be able to see the water from my window." },

  { id:"p1-33", theme:"People you admire", cz:"Lidé, které obdivuješ", questions:[
    "Is there someone you admire? Why?",
    "Who has helped you most in your life?",
    "Do you have a favourite teacher?",
    "Is there a famous person you'd like to meet?",
    "What makes someone a good role model?"],
    model:"I really admire my aunt. She's a nurse, and a few years ago she went to work in a hospital in Africa for six months. She came back with so many stories about the people she met. What I admire most is that she's always calm and positive, even when her job is really stressful. I'd like to be a bit more like her.",
    pq:"Is there a famous person you'd like to meet?",
    pa:"I'd love to meet a famous footballer, maybe one from our national team, and ask him how he deals with all the pressure before big matches." }
],

/* ---------- PART 2: long turn. TWO 'photos' per set, each described by an art spec
   {e: main figures (emoji), p: props/background (emoji), bg: scene palette key, scene: English description}.
   show/ask are inserted into the interlocutor frame; q = the question printed above the photos;
   partnerQ = the short follow-up question for the other candidate (about 30 seconds);
   model = sample one-minute answer (strong B2). ---------- */
p2: [
  { id:"p2-01", title:"Learning new things", cz:"Učit se něco nového",
    show:"people learning new things",
    ask:"why the people might want to learn these things",
    q:"Why might the people want to learn these things?",
    pics:[
      { e:["👧","👨"], p:["🚗","🚦","🛣️"], bg:"street", scene:"A teenage girl sits behind the wheel of a small car with an L-plate, while an older male driving instructor in the passenger seat points at the road ahead." },
      { e:["👴","👩‍🍳"], p:["🍝","🥕","🔪"], bg:"kitchen", scene:"A retired man in an apron is learning to make fresh pasta at a cookery class, while a young chef watches him and smiles." }],
    partnerQ:"Which of these things would you like to learn? Why?",
    partnerAnswer:"I'd choose cooking. I can only make really simple meals at the moment. If I learnt to cook properly, I could eat more healthily and save money, and it would be fun to cook for my friends.",
    model:"Both photos show people who are learning a practical skill with the help of a teacher. In the first photo, a teenage girl is having a driving lesson, whereas in the second one an older man is learning to cook. I think the girl probably wants to learn to drive because it will give her more freedom – she won't have to depend on her parents or on buses any more. She looks a bit nervous, though, so it might be one of her first lessons. The man, on the other hand, seems very relaxed. Maybe he's just retired and finally has time for a hobby, or perhaps he wants to help more at home. Personally, I think learning to drive is more useful, but cooking looks more fun." },

  { id:"p2-02", title:"Family time", cz:"Čas s rodinou",
    show:"families spending time together",
    ask:"what the people might be enjoying about spending time together in these ways",
    q:"What might the people be enjoying about spending time together in these ways?",
    pics:[
      { e:["👨‍👩‍👧‍👦"], p:["🎲","🍿","🛋️"], bg:"home", scene:"A family of four sits on the living-room floor playing a board game and laughing, with a bowl of popcorn between them." },
      { e:["🚴","🚴‍♀️","🚴‍♂️"], p:["🌳","🌳","☀️"], bg:"park", scene:"Two parents and their young son cycle along a path through a sunny park, the boy riding slightly ahead of them." }],
    partnerQ:"Which of these activities would you prefer to do with your family? Why?",
    partnerAnswer:"I'd prefer cycling, because I spend too much time indoors during the week. It's nice to be outside, and you can still talk while you ride. Board games are fun too, but in my family they always end in an argument!",
    model:"In both photos, families are spending their free time together, but in very different ways. The first family is at home playing a board game, while the second one is cycling in a park. I think the people in the first photo are enjoying the chance to laugh together and relax. They look really happy, so maybe someone has just won, or perhaps something funny has happened. It's also a good way to switch off from phones and screens. The family in the second photo are probably enjoying the fresh air and the exercise. It must be a lovely sunny day, and the boy seems proud that he's riding in front. One difference is that cycling is more active, but a board game is easier to play in any weather." },

  { id:"p2-03", title:"Travelling", cz:"Cestování",
    show:"people travelling in different ways",
    ask:"why the people might have chosen to travel in these ways",
    q:"Why might the people have chosen to travel in these ways?",
    pics:[
      { e:["🧑","👩"], p:["🎒","🚆","🗺️"], bg:"station", scene:"Two young backpackers with big rucksacks study a paper map on a busy train platform as a train arrives behind them." },
      { e:["👨‍💼"], p:["✈️","🧳","💻"], bg:"airport", scene:"A businessman in a suit works on his laptop in an airport departure lounge, with a small suitcase next to his seat." }],
    partnerQ:"Which way of travelling do you prefer? Why?",
    partnerAnswer:"I prefer travelling by train. You can look out of the window, walk around and even chat to people. Flying is faster, of course, but I find airports really stressful, with all the queues and security checks.",
    model:"Both photos show people who are on a journey, but for different reasons. In the first one, two young people with backpacks are at a train station, whereas in the second one a man in a suit is waiting at an airport. I think the backpackers have chosen the train because it's cheaper and more flexible – they might be travelling around Europe and stopping in several cities. They can also see the countryside from the window, which is part of the fun. The businessman, on the other hand, has probably chosen to fly because he doesn't have much time. He must be going to a meeting, because he's working even while he waits. So for him travelling is just a way to get somewhere quickly, but for the backpackers it's part of the adventure." },

  { id:"p2-04", title:"Celebrating", cz:"Oslavy",
    show:"people celebrating special occasions",
    ask:"what the people might enjoy about celebrating in these ways",
    q:"What might the people enjoy about celebrating in these ways?",
    pics:[
      { e:["👧","👦","🧒"], p:["🎂","🎈","🎁"], bg:"home", scene:"A group of teenagers in a small living room sing around a birthday cake with candles, while the girl in the middle covers her face and laughs." },
      { e:["💃","🕺","👯"], p:["🎆","🎶","🏮"], bg:"night", scene:"Crowds of people dance in a city street at night during a big festival, with fireworks exploding in the sky above them." }],
    partnerQ:"Which of these celebrations would you prefer to go to? Why?",
    partnerAnswer:"I'd prefer the street festival. I love big crowds and loud music, and fireworks always make me feel excited. A small party is nice, but a festival like that is something you only experience a few times in your life.",
    model:"Both photos show people celebrating, but the first celebration is small and private, whereas the second one is a huge public event. In the first photo, some teenagers are having a birthday party at home. I think they're enjoying being with their closest friends in a relaxed atmosphere. The girl looks a bit embarrassed, maybe because everybody is singing to her, but she must be really happy too. In the second photo, lots of people are dancing in the street during a festival. They're probably enjoying the music, the fireworks and the feeling of being part of a big crowd. It looks as if the whole city is celebrating together. I'd say the birthday party is more personal, but the festival is more exciting." },

  { id:"p2-05", title:"Jobs indoors and outdoors", cz:"Práce venku a uvnitř",
    show:"people doing their jobs in different places",
    ask:"what might be difficult about doing these jobs",
    q:"What might be difficult about doing these jobs?",
    pics:[
      { e:["👩‍🌾"], p:["🌷","🌧️","🌳"], bg:"park", scene:"A gardener in a waterproof jacket plants flowers in a city park on a cold, grey morning, with rain clouds overhead." },
      { e:["👨‍💻"], p:["🖥️","☕","📞"], bg:"office", scene:"A young man sits at a desk in an open-plan office looking at two computer screens, holding a phone to his ear and looking tired." }],
    partnerQ:"Which of these jobs would you rather do? Why?",
    partnerAnswer:"I'd rather be a gardener, I think. I'd hate sitting in front of a computer all day. Even if the weather is bad sometimes, you're moving around and you can see the results of your work.",
    model:"Both photos show people at work, but the woman in the first photo is working outside, while the man in the second photo is in an office. I think the most difficult thing about the gardener's job is probably the weather. She has to work outside even when it's cold and rainy, like in this photo, and it's also hard physical work – she must have a sore back at the end of the day. The office job looks easier physically, but it might be stressful in a different way. The man looks tired, maybe because he has too many emails or a difficult customer on the phone. Sitting in front of screens all day isn't very healthy either. So both jobs are difficult, just in different ways." },

  { id:"p2-06", title:"Ways of studying", cz:"Způsoby studia",
    show:"students studying in different ways",
    ask:"why the students might have chosen to study in these ways",
    q:"Why might the students have chosen to study in these ways?",
    pics:[
      { e:["👩‍🎓"], p:["📚","🎧","📝"], bg:"library", scene:"A university student sits alone at a quiet library desk surrounded by piles of books, wearing headphones and writing notes." },
      { e:["🧑‍🎓","👩‍🎓","👨‍🎓"], p:["💻","📝","☕"], bg:"classroom", scene:"Four students sit around a table with a laptop and coffee cups, talking and pointing at a big sheet of paper during a group project." }],
    partnerQ:"How do you prefer to study? Why?",
    partnerAnswer:"I prefer studying on my own, like the girl in the library. When I study with friends, we always start chatting about other things. But before an exam it's useful to test each other, so sometimes I do both.",
    model:"In both photos, students are studying, but in the first one a girl is working alone in a library, whereas in the second one a group of students are working together. I think the girl has chosen to study alone because she needs to concentrate – maybe she has an important exam soon. The library is quiet, and she's even wearing headphones, so she obviously doesn't want to be disturbed. The students in the second photo might be preparing a group project, so they have to work together. They seem to be sharing ideas, which can be really useful because everyone sees the problem differently. On the other hand, working in a group can be slower, and it's easy to get distracted. Both ways have advantages, depending on the task." },

  { id:"p2-07", title:"Eating together", cz:"Společné jídlo",
    show:"people eating in different places",
    ask:"why the people might have chosen to eat in these places",
    q:"Why might the people have chosen to eat in these places?",
    pics:[
      { e:["👨‍👩‍👧","👵"], p:["🍲","🥖","🕯️"], bg:"kitchen", scene:"Three generations of a family share a big home-cooked meal around a kitchen table, the grandmother serving soup from a large pot." },
      { e:["👦","👧"], p:["🍔","🍟","🥤"], bg:"market", scene:"Two teenagers eat burgers and chips at a busy street-food stall, standing up, laughing and holding paper cups." }],
    partnerQ:"Where do you prefer to eat with your friends? Why?",
    partnerAnswer:"Usually somewhere quick and cheap, like a street-food place. We don't have much money, and we just want to chat and have fun. A proper restaurant is nice for special occasions, though.",
    model:"Both photos show people having a meal together, but the situations are quite different. In the first photo, a family is eating at home, while in the second one two teenagers are eating street food. I think the family has chosen to eat at home because it's a special occasion – maybe it's Sunday lunch and the grandmother has cooked her famous soup. Eating at home is also cheaper and more relaxed, and you can sit and talk for as long as you want. The teenagers have probably chosen the food stall because it's quick and they don't have much money. They might be on their way to the cinema, so they don't want to sit in a restaurant for an hour. They look like they're having a great time, so the place doesn't really matter to them." },

  { id:"p2-08", title:"Doing sport", cz:"Sportování",
    show:"people doing different kinds of sport",
    ask:"why the people might have chosen to do these sports",
    q:"Why might the people have chosen to do these sports?",
    pics:[
      { e:["🏃","⚽","🏃‍♂️"], p:["🌧️","🥅","💦"], bg:"stadium", scene:"A group of young men play football in heavy rain on a muddy pitch, one of them sliding through the mud to reach the ball." },
      { e:["🏃‍♀️"], p:["🌅","🌳","🎧"], bg:"park", scene:"A woman jogs alone along a path by a lake early in the morning, wearing headphones, as the sun rises behind the trees." }],
    partnerQ:"Which of these sports would you prefer to do? Why?",
    partnerAnswer:"I'd prefer running. I'm not very good at football, and I really don't like playing in the rain! Running is easy to organise – you just put on your trainers and go.",
    model:"Both photos show people doing sport outdoors, but the first is a team sport and the second is something you do on your own. In the first photo, some young men are playing football in the rain. I think they've chosen football because they enjoy the competition and being part of a team. They obviously don't mind getting wet and dirty – they must really love the game! The woman in the second photo is running alone early in the morning. Maybe she's chosen running because it fits into her busy day – she can go before work, whenever she wants, and she doesn't need anyone else. She looks very calm, so perhaps it also helps her to relax and think. For me, running looks more peaceful, but football looks like more fun." },

  { id:"p2-09", title:"Shopping", cz:"Nakupování",
    show:"people shopping in different ways",
    ask:"what the advantages of shopping in these ways might be",
    q:"What might be the advantages of shopping in these ways?",
    pics:[
      { e:["👩","👴"], p:["🍎","🥕","🧺"], bg:"market", scene:"A woman chooses vegetables at an outdoor market stall while the elderly stallholder weighs a bag of apples and chats to her." },
      { e:["🧑"], p:["💻","📦","🛋️"], bg:"home", scene:"A young man sits on his sofa in pyjamas, ordering something on his laptop, with several delivery boxes on the floor beside him." }],
    partnerQ:"Do you prefer shopping online or in shops? Why?",
    partnerAnswer:"It depends on what I'm buying. For clothes, I like going to shops so I can try things on. But for books or electronics, shopping online is easier and usually cheaper.",
    model:"Both photos show people buying things, but in the first one a woman is shopping at a market, whereas in the second one a young man is shopping online at home. One advantage of the market is that you can see and touch the food before you buy it, so you know it's fresh. The woman is also chatting with the stallholder, so it's a more personal and friendly way of shopping. The man in the second photo, on the other hand, doesn't even need to get dressed! Shopping online is very convenient – you can compare prices quickly and get things delivered to your door. He must buy a lot online, judging by all those boxes. However, it's less social, and you can't check the quality. I think the market is more enjoyable, but online shopping saves time." },

  { id:"p2-10", title:"Helping others", cz:"Pomoc druhým",
    show:"people helping others",
    ask:"how the people might be feeling about helping in these ways",
    q:"How might the people be feeling about helping in these ways?",
    pics:[
      { e:["🧑","👧","👦"], p:["🗑️","🌊","🧤"], bg:"beach", scene:"A group of teenagers in gloves collects plastic rubbish on a beach and puts it into big bags, smiling at each other." },
      { e:["👦","👵"], p:["🛍️","🏠","🚪"], bg:"street", scene:"A young man carries heavy shopping bags up the steps of a house for an elderly woman, who is holding the door open for him." }],
    partnerQ:"Have you ever done any volunteering? Would you like to?",
    partnerAnswer:"Not yet, but I'd like to. There's an animal shelter near my school that needs volunteers to walk the dogs at weekends. I think that would be fun and really useful too.",
    model:"Both photos show young people who are helping others, but in different situations. In the first one, a group of teenagers is cleaning a beach, while in the second one a young man is helping an old lady with her shopping. I think the teenagers are probably feeling quite proud of themselves. They might be part of a school project, and they seem to be enjoying working together. It must be satisfying to see the beach getting cleaner. The young man in the second photo might be the woman's neighbour. He's helping just one person, but I imagine he feels good because he can see how much it means to her. She looks really grateful. I think the second kind of help is more personal, but the first one helps more people in the long term." },

  { id:"p2-11", title:"Weather", cz:"Počasí",
    show:"people in different kinds of weather",
    ask:"how the weather might be affecting the people",
    q:"How might the weather be affecting the people?",
    pics:[
      { e:["👨","👧","👩"], p:["☀️","⛱️","🍦"], bg:"beach", scene:"A family sits under a beach umbrella on a very hot, crowded beach; the father fans himself and the little girl's ice cream is melting." },
      { e:["🚶","🚶‍♀️","🧍"], p:["☔","🌧️","🏢"], bg:"city", scene:"People hurry along a city street in heavy rain, holding umbrellas, while a woman without an umbrella holds a newspaper over her head." }],
    partnerQ:"What kind of weather do you like best? Why?",
    partnerAnswer:"I like it when it's warm but not too hot, about twenty degrees. Then you can do anything outside – walk, cycle or sit in a park – without getting too tired.",
    model:"Both photos show how the weather can affect people, but in the first photo it's very hot, whereas in the second one it's pouring with rain. The family on the beach are probably enjoying the sunshine, but it looks as if it's a bit too hot for them. The father is trying to cool himself down, and the little girl's ice cream is melting, so they might go home early or look for some shade. In the second photo, the rain is making people hurry, and they must be feeling cold and wet. The woman without an umbrella looks quite annoyed – maybe she's on her way to work and didn't check the weather forecast. So in both situations the weather is making people uncomfortable, but I'd still prefer the beach to the rain!" },

  { id:"p2-12", title:"Making music", cz:"Hraní hudby",
    show:"people making music",
    ask:"how the people might be feeling while they play",
    q:"How might the people be feeling while they play?",
    pics:[
      { e:["🧑‍🎤","🎸","🥁"], p:["🎶","🔌","🎤"], bg:"indoor", scene:"Three teenagers practise in a garage with an electric guitar, a drum kit and a microphone, one of them singing loudly with his eyes closed." },
      { e:["👧","🎻"], p:["🎼","💡","👏"], bg:"stage", scene:"A young girl in a long dress plays the violin alone on a big concert stage, in front of a large audience sitting in the dark." }],
    partnerQ:"Would you like to perform in front of an audience? Why or why not?",
    partnerAnswer:"No, I don't think so. I'd be far too nervous! I sometimes sing at home, but just the idea of people watching me makes me feel sick. I'd rather be in the audience.",
    model:"Both photos show young people playing music, but the situations are very different. In the first one, some teenagers are practising in a garage, while in the second one a girl is playing the violin at a concert. I think the teenagers are feeling relaxed and having a lot of fun. Nobody is watching them, so they can make mistakes and be as loud as they like. The singer seems to be really enjoying himself. The girl in the second photo might be feeling much more nervous, because there's a big audience and she's playing on her own. She must have practised for months for this concert. However, she might also be feeling proud and excited, especially when people start clapping. I think playing with friends is more fun, but performing is more of an achievement." },

  { id:"p2-13", title:"People and animals", cz:"Lidé a zvířata",
    show:"people with animals",
    ask:"why the animals might be important to the people",
    q:"Why might the animals be important to the people?",
    pics:[
      { e:["👨‍👩‍👦","🐕"], p:["🌳","⛰️","🌼"], bg:"field", scene:"A family walks along a country path with their large, happy dog running in front of them, the boy holding the lead." },
      { e:["👧","🐈"], p:["🩺","🏥","💊"], bg:"hospital", scene:"A worried girl holds her cat in her arms at the vet's, while the vet in a green uniform gently checks the cat's ear." }],
    partnerQ:"Would you like to have a pet? Why or why not?",
    partnerAnswer:"I'd love a cat, but our flat is quite small and my dad is allergic, so it's not possible at the moment. Maybe when I have my own place, I'll get one.",
    model:"Both photos show people with their pets. In the first one, a family is walking their dog in the countryside, whereas in the second one a girl has taken her cat to the vet. I think the dog is important to the family because it gets them outside and gives them a reason to go for walks together. The dog looks really happy, and so do the people, so it's probably like another member of the family. The cat must be very important to the girl, because she looks really worried. Maybe the cat is ill or has hurt its ear. For a child, a pet can be a best friend – someone to play with and talk to. So in both photos the animals are clearly loved, although the girl's situation is much more stressful." },

  { id:"p2-14", title:"Using technology", cz:"Technologie",
    show:"people using technology",
    ask:"how technology is helping the people in these situations",
    q:"How is technology helping the people in these situations?",
    pics:[
      { e:["👧","📱"], p:["👵","👴","❤️"], bg:"home", scene:"A teenage girl holds up a tablet during a video call so that her grandparents, who live in another country, can see her new room; they are waving from the screen." },
      { e:["👦","🧑"], p:["🎮","🖥️","🍕"], bg:"indoor", scene:"Two friends sit on a sofa in a dark room playing a video game together on a large screen, shouting and laughing." }],
    partnerQ:"Do you think you use technology too much? Why or why not?",
    partnerAnswer:"Probably, yes. I check my phone hundreds of times a day, often for no reason. I'd like to use it less, but all my friends organise everything online, so it's difficult.",
    model:"Both photos show people using technology, but for different purposes. In the first photo, a girl is having a video call with her grandparents, whereas in the second one two friends are playing a video game. In the first situation, technology is helping the family to stay close even though they live far apart. The grandparents look delighted – they must miss their granddaughter a lot, and seeing her face is much better than just talking on the phone. In the second photo, technology is helping the boys to have fun and relax together. They seem to be really enjoying the game, and it's something they can share. On the other hand, they're sitting in a dark room, so maybe they should go outside more. I'd say technology is more useful in the first situation." },

  { id:"p2-15", title:"Holidays", cz:"Dovolená",
    show:"people on holiday in different places",
    ask:"what the people might enjoy about these holidays",
    q:"What might the people enjoy about these holidays?",
    pics:[
      { e:["🧑","👩"], p:["⛺","🔥","🏔️"], bg:"mountain", scene:"Two young people sit outside a small tent high in the mountains, cooking on a camping stove, with snowy peaks behind them." },
      { e:["👨‍👩‍👧"], p:["🏨","🏊","🍹"], bg:"sea", scene:"A family relaxes by the swimming pool of a large hotel, the parents lying on sunbeds and the daughter jumping into the water." }],
    partnerQ:"Which of these holidays would you choose? Why?",
    partnerAnswer:"I'd choose the hotel, to be honest. On holiday I want to relax and not worry about anything. Camping is fun for a night or two, but I like having a proper bed and a hot shower.",
    model:"Both photos show people on holiday, but the holidays are very different. In the first one, two young people are camping in the mountains, whereas in the second one a family is staying in a hotel with a pool. I think the campers are enjoying the adventure and the beautiful views. They're far from the city and probably far from other people too, so it must be very peaceful. It's also a cheap holiday, which is important for young people. The family in the second photo are probably enjoying the comfort. The parents can just lie in the sun while their daughter plays in the pool, and they don't have to cook or clean. It looks like a really relaxing holiday. Personally, I'd prefer the mountains, because I get bored lying by a pool all day." },

  { id:"p2-16", title:"Waiting", cz:"Čekání",
    show:"people waiting in different situations",
    ask:"how the people might be feeling while they wait",
    q:"How might the people be feeling while they wait?",
    pics:[
      { e:["🧑‍💼","👩","😴"], p:["✈️","🕒","🧳"], bg:"airport", scene:"Passengers sit and lie on the floor of a crowded airport hall under a departures board which shows that many flights are delayed." },
      { e:["👩","👦"], p:["📋","🪑","🩹"], bg:"hospital", scene:"A mother and her young son wait in a doctor's waiting room; the boy holds his arm and looks unhappy, while the mother fills in a form." }],
    partnerQ:"How do you usually pass the time when you have to wait?",
    partnerAnswer:"I usually listen to music or a podcast on my phone. If I have nothing to do, I get really impatient, so I always carry headphones with me.",
    model:"Both photos show people who are waiting, and none of them look very happy about it. In the first photo, lots of passengers are waiting at an airport because their flights are delayed, while in the second one a mother and son are waiting to see a doctor. The passengers must be feeling bored and tired – some of them are even lying on the floor, so they might have been there for hours. They're probably also annoyed, because they could miss meetings or lose a day of their holiday. The boy in the second photo seems to be in pain – maybe he's hurt his arm – so he's probably feeling scared as well as uncomfortable. His mother might be worried too. I think waiting at the doctor's is harder, because you're worried about your health." },

  { id:"p2-17", title:"Competitions", cz:"Soutěže",
    show:"people taking part in competitions",
    ask:"why the people might be taking part in these competitions",
    q:"Why might the people be taking part in these competitions?",
    pics:[
      { e:["🏃‍♀️","🏃","🏃‍♂️"], p:["🏁","🏫","👏"], bg:"field", scene:"Children in school sports kit race towards a finish line on a school field while parents and teachers cheer from the side." },
      { e:["👩‍🍳","👨‍🍳"], p:["🎂","🏆","⏱️"], bg:"kitchen", scene:"Two amateur bakers decorate a tall cake under bright lights in a TV studio kitchen, with a big clock showing that time is almost up." }],
    partnerQ:"Do you enjoy competitions? Why or why not?",
    partnerAnswer:"Not really. I'm quite competitive, so if I lose, I get annoyed with myself. I prefer doing things just for fun, without anyone giving me points.",
    model:"Both photos show people taking part in competitions. In the first one, some children are running a race at a school sports day, while in the second one two adults are taking part in a baking competition on TV. I think the children are probably taking part because it's part of school life – maybe everybody has to run. Some of them might really want to win, and they must be happy that their parents are watching. The adults, on the other hand, have chosen to enter the competition. Perhaps they love baking and want to show their skills, or maybe they hope to win a prize. They look quite stressed, though, because the clock shows that time is nearly over. I'd say the race looks more fun, but the baking competition is a bigger challenge." },

  { id:"p2-18", title:"Getting around the city", cz:"Doprava ve městě",
    show:"people travelling around a city",
    ask:"what might be good and bad about travelling around the city in these ways",
    q:"What might be good and bad about travelling around the city in these ways?",
    pics:[
      { e:["🚴‍♀️"], p:["🚗","🚙","🌳"], bg:"city", scene:"A young woman with a backpack rides her bike along a green cycle lane next to a long line of cars stuck in traffic." },
      { e:["🧍","🧍‍♀️","🧑‍💼"], p:["🚇","📱","🕗"], bg:"station", scene:"Commuters stand pressed together inside a crowded underground train, most of them looking at their phones." }],
    partnerQ:"How do you usually travel around your town? Why?",
    partnerAnswer:"I usually take the tram. It's quite cheap with a student ticket, and it stops right outside my school. I'd love to cycle, but my town is very hilly!",
    model:"Both photos show people travelling around a city during the rush hour, probably on their way to work or school. In the first photo, a woman is cycling, whereas in the second one people are on a crowded underground train. The good thing about cycling is that she isn't stuck in traffic like the cars next to her, and she's getting some exercise at the same time. It's also free and good for the environment. However, it might be dangerous in a busy city, and it's not much fun when it's raining. The underground is fast and you don't have to worry about the weather, but it looks really uncomfortable. The people are standing very close to each other, and it must be hot and stressful. If I lived in a city, I'd probably choose the bike." },

  { id:"p2-19", title:"Places to live", cz:"Kde bydlet",
    show:"people living in different places",
    ask:"what the people might like about living in these places",
    q:"What might the people like about living in these places?",
    pics:[
      { e:["👩","👨"], p:["🏙️","☕","🪴"], bg:"city", scene:"A young couple drinks coffee on the small balcony of a flat high up in a modern tower block, with the city skyline behind them." },
      { e:["👵","👴"], p:["🏡","🐔","🌾"], bg:"field", scene:"An older couple stands in front of their farmhouse in the countryside, feeding chickens, with fields and hills all around them." }],
    partnerQ:"Would you prefer to live in the city or in the countryside? Why?",
    partnerAnswer:"In the city, at least for now. I want to be close to cafés, cinemas and my friends. Maybe when I'm older I'll want a quieter life in the countryside.",
    model:"Both photos show couples at home, but one couple lives in a big city, while the other lives in the countryside. I think the young couple in the first photo probably like living in the city because everything is close – work, shops, restaurants and entertainment. They have a great view from their balcony, and they can go out every evening if they want. On the other hand, the flat looks quite small, and the city might be noisy. The older couple in the second photo seem to enjoy a quieter, simpler life. They have lots of space, fresh air and their own animals, so they might grow their own food too. However, they probably need a car for everything, because the nearest shop might be quite far away. Both places have advantages, really." },

  { id:"p2-20", title:"Caring jobs", cz:"Pomáhající profese",
    show:"people doing jobs that involve helping others",
    ask:"what might be rewarding about doing these jobs",
    q:"What might be rewarding about doing these jobs?",
    pics:[
      { e:["👩‍⚕️","🧓"], p:["🏥","🩺","💐"], bg:"hospital", scene:"A nurse sits next to an elderly patient's hospital bed, holding his hand and smiling as she explains something to him." },
      { e:["👨‍🏫","🧒","👧"], p:["🔤","🎨","🧸"], bg:"classroom", scene:"A young male teacher sits on a small chair surrounded by young children who are proudly showing him their colourful paintings." }],
    partnerQ:"Which of these jobs do you think is more difficult? Why?",
    partnerAnswer:"I think the nurse's job is more difficult. She works long hours, sometimes at night, and she has to deal with people who are very ill. That must be really hard emotionally.",
    model:"Both photos show people whose jobs involve looking after others. In the first one, a nurse is talking to an old man in hospital, whereas in the second one a teacher is with a group of young children. I think the most rewarding thing for the nurse is helping people when they really need it. The patient looks calmer because she's holding his hand, so she must feel that she's making a real difference. When patients get better and go home, that must be a great feeling. For the teacher, the rewarding part might be seeing the children learn new things. They're obviously very proud of their paintings, and he looks happy too. Both jobs can be tiring and they aren't very well paid, but I imagine they're more satisfying than many office jobs." },

  { id:"p2-21", title:"Being creative", cz:"Tvořivost",
    show:"people being creative",
    ask:"why the people might enjoy being creative in these ways",
    q:"Why might the people enjoy being creative in these ways?",
    pics:[
      { e:["👩‍🎨","🧑‍🎨"], p:["🎨","🖼️","🌳"], bg:"garden", scene:"An older woman and a young man sit at easels in a sunny garden, painting the same group of trees with watercolours." },
      { e:["🧑"], p:["📱","🎬","💡"], bg:"indoor", scene:"A teenager in his bedroom films himself with a phone on a small stand, with a ring light, explaining something with big hand movements." }],
    partnerQ:"Which of these activities would you like to try? Why?",
    partnerAnswer:"I'd like to try making videos. I watch a lot of them, and I think it would be interesting to learn how to film and edit. Painting needs a lot of patience, and I don't have much.",
    model:"Both photos show people doing creative activities. In the first one, two people are painting outdoors, while in the second one a teenager is making a video in his bedroom. I think the painters enjoy it because it's very relaxing – they're sitting in a beautiful garden, taking their time and looking carefully at nature. They might be in a painting class, and the older woman could be teaching the young man. The teenager, on the other hand, is probably enjoying the chance to share his ideas with lots of people. He might have his own online channel, and he seems full of energy. It must be exciting when people watch and comment on your videos. So the first activity is quieter and more personal, whereas the second one is about communicating with an audience." },

  { id:"p2-22", title:"Special memories", cz:"Vzpomínky",
    show:"people remembering special moments",
    ask:"why the people might want to remember these moments",
    q:"Why might the people want to remember these moments?",
    pics:[
      { e:["👰","🤵","📸"], p:["💐","💒","🥂"], bg:"garden", scene:"A photographer takes a picture of a bride and groom and their laughing guests outside a small church decorated with flowers." },
      { e:["👦","👵","👧"], p:["📖","🖼️","🛋️"], bg:"home", scene:"A grandmother sits on a sofa between her two grandchildren, showing them old black-and-white photos in a family album." }],
    partnerQ:"Do you keep photos of special moments? Why or why not?",
    partnerAnswer:"Yes, I've got thousands on my phone! But I hardly ever look at them. My mum prints the best ones every year and puts them in an album, which is much nicer.",
    model:"Both photos show people who want to remember special moments, but in the first one the moment is happening now, whereas in the second one it happened a long time ago. The couple in the first photo are getting married, and they want to remember it because it's one of the most important days of their lives. That's why they've paid a photographer – they'll probably look at these photos for years. In the second photo, the grandmother is showing her grandchildren an old album. I think she wants them to know about the family's history and about her life when she was young. The children look really interested, so maybe she's telling them funny stories. Both photos are about keeping memories alive, but the second one also connects different generations." }
],

/* ---------- PART 3: collaborative task. central question + 5 written prompts; topic/say/decision go into the frame.
   partnerLines = what the virtual partner says in turn; decideLines = partner in the 1-minute decision;
   model = short sample discussion (A/B). ---------- */
p3: [
  { id:"p3-01", title:"Staying healthy", cz:"Zdravý životní styl",
    topic:"things that can help young people to stay healthy",
    central:"How might these things help young people to stay healthy?",
    say:"how these things might help young people to stay healthy.",
    prompts:["doing sport at school","eating home-cooked meals","getting enough sleep","spending less time on screens","walking or cycling to school"],
    decision:"which two things would be the easiest for young people to do.",
    partnerLines:[
      "Shall we start with sport at school? I think it's important, because for some students it's the only exercise they get all week.",
      "That's true. What about sleep? I think a lot of teenagers don't sleep enough because they're on their phones until really late.",
      "Mm, I'm not sure that spending less time on screens is realistic, though. We need our phones and computers for school too.",
      "Home-cooked meals are great, but not every family has time to cook every day. Both my parents work late, for example.",
      "Walking or cycling to school is a good idea if you live close. But if you live in a village far away, it's not possible, is it?"
    ],
    decideLines:[
      "So, which two shall we choose? I think walking to school and sleeping more are the easiest, because they don't cost anything. What do you think?",
      "OK, I'm happy with that. So we've decided, then."
    ],
    model:"A: Shall we start with doing sport at school? I think it's really important, because some students don't do any exercise at all after school.\nB: I agree. But some people hate PE lessons, so it doesn't always help. What do you think about sleep?\nA: I think it's probably the most important thing. When I don't sleep enough, I feel terrible the next day and I can't concentrate.\nB: Me too. And I think screens are part of the problem – people stay up late chatting or watching videos.\nA: That's a good point. So spending less time on screens helps with sleep as well.\nB: Exactly. What about walking or cycling to school?\nA: It's a great idea if you live near your school, but it depends on where you live.\nB: Yes, and in winter it might be a bit difficult." },

  { id:"p3-02", title:"Choosing a holiday", cz:"Výběr dovolené",
    topic:"things people think about when they choose a holiday",
    central:"Why might these things be important when people choose a holiday?",
    say:"why these things might be important when people choose a holiday.",
    prompts:["the cost","the weather","things to do there","how to get there","who to go with"],
    decision:"which is the most important thing to think about when choosing a holiday.",
    partnerLines:[
      "Let's start with the cost. For most people that's the first thing they think about, isn't it?",
      "And the weather is important too. If you go to the beach and it rains all week, the holiday is ruined.",
      "I think things to do there matter a lot for families with children. Kids get bored really quickly.",
      "How to get there is interesting. Some people are afraid of flying, so they choose places they can reach by car or train.",
      "Who you go with is maybe the most important thing for me. A holiday with the wrong people can be a disaster!"
    ],
    decideLines:[
      "So, what shall we choose? I'd say the cost, because if you can't afford it, nothing else matters. Do you agree?",
      "Hmm, OK, that's a fair point. Let's go with that, then."
    ],
    model:"A: Shall we start with the cost? I think that's the first thing most people look at.\nB: Yes, definitely, especially students like us. We don't have much money, so we usually look for cheap flights or camping.\nA: Exactly. But I think the weather is important too. If you go to the seaside, you want sunshine.\nB: That's true, but for a city break the weather doesn't matter so much, because you can visit museums.\nA: Good point. What about who to go with? For me, that's really important.\nB: I agree. I once went on holiday with a friend who wanted to sleep until twelve every day, and I wanted to see everything!\nA: That sounds difficult! So the people can make or break a holiday.\nB: Absolutely. Shall we talk about how to get there?" },

  { id:"p3-03", title:"A better school", cz:"Lepší škola",
    topic:"ideas for making a school a better place for students",
    central:"How might these ideas make a school a better place for students?",
    say:"how these ideas might make a school a better place for students.",
    prompts:["a bigger library","more school trips","healthier food in the canteen","longer breaks","more after-school clubs"],
    decision:"which two ideas would make the biggest difference.",
    partnerLines:[
      "Shall we start with school trips? I think students learn a lot when they get out of the classroom.",
      "I like the idea of longer breaks. After three lessons I can't concentrate any more, so a longer break would really help.",
      "A bigger library sounds nice, but do students really use libraries now? Most people find information online.",
      "Healthier food is important, I think. In my school the canteen sells mostly pizza and sweets.",
      "After-school clubs are a great way to meet people from other classes, don't you think?"
    ],
    decideLines:[
      "So, which two shall we choose? I'd go for school trips and healthier food. What do you think?",
      "OK, I can agree with that. Let's choose those two, then."
    ],
    model:"A: Would you like to start, or shall I?\nB: You start.\nA: OK. I think more school trips would be great, because students learn better when they see things in real life.\nB: I agree, but trips are quite expensive, and not every family can pay for them.\nA: That's true. What about longer breaks? I think that would help students concentrate.\nB: Maybe, but then the school day would be longer, and nobody wants that!\nA: Ha, that's a good point. How do you feel about healthier food in the canteen?\nB: I think it's really important. If students eat badly, they feel tired in the afternoon.\nA: Exactly. And after-school clubs could help shy students make friends.\nB: Yes, I hadn't thought of that." },

  { id:"p3-04", title:"Learning a language", cz:"Učení se jazyka",
    topic:"ways of learning a foreign language",
    central:"How useful might these ways be for learning a foreign language?",
    say:"how useful these ways might be for learning a foreign language.",
    prompts:["watching films and series","using a language app","having a private teacher","spending time abroad","chatting with people online"],
    decision:"which would be the best way for a beginner.",
    partnerLines:[
      "Let's start with films and series. I've learnt so much English from watching series with subtitles.",
      "Language apps are fun, but I'm not sure you can learn to speak properly with them. You just tap on words.",
      "A private teacher is probably very effective, but it's really expensive, isn't it?",
      "Spending time abroad must be the best way. You have to use the language all the time, even in shops.",
      "Chatting online is good practice, but people make lots of mistakes, so you might learn the wrong things."
    ],
    decideLines:[
      "So, for a beginner… I think a private teacher is best, because a beginner needs someone to explain the grammar. What about you?",
      "Fine, I think we agree on that. A teacher it is."
    ],
    model:"A: Shall we start with watching films? I think it's a really good way to learn, because you hear how people actually speak.\nB: I agree, but only if your level is already quite good. For a beginner it would be too difficult.\nA: That's true. What about language apps? They're cheap and you can use them anywhere.\nB: Yes, they're good for vocabulary, but I don't think you can learn to speak with an app.\nA: Good point. A private teacher would help with speaking, though.\nB: Definitely, but it costs a lot. I think spending time abroad is the best way of all.\nA: Maybe, but you can't go abroad if you don't speak any of the language at all.\nB: Hmm, that's true. So perhaps it's better for people who already know the basics." },

  { id:"p3-05", title:"Helping the environment", cz:"Ochrana životního prostředí",
    topic:"things people can do to help the environment",
    central:"How much can these things help the environment?",
    say:"how much these things can help the environment.",
    prompts:["recycling","using public transport","buying fewer clothes","eating less meat","saving energy at home"],
    decision:"which would be the easiest for people to start doing.",
    partnerLines:[
      "Shall we start with recycling? Almost everybody does it now, so it must help a bit.",
      "I think public transport makes a big difference, especially in big cities where there's so much traffic.",
      "Buying fewer clothes is interesting. I read that making clothes uses a lot of water. I had no idea.",
      "Eating less meat might be difficult for some people. My grandparents eat meat every day!",
      "Saving energy at home is easy, isn't it? Just turning off lights and not leaving things on standby."
    ],
    decideLines:[
      "So, which one is the easiest to start? I think saving energy at home, because you don't have to change your whole lifestyle. Do you agree?",
      "Yes, OK. So we've decided on saving energy."
    ],
    model:"A: Let's start with recycling. I think it's important, but it's not enough on its own.\nB: I agree. Everyone recycles now, but there's still too much rubbish. What do you think about public transport?\nA: I think it could help a lot, especially in cities. But buses need to be cheap and frequent, or people will still use their cars.\nB: That's a good point. In my town the buses are so slow that everybody drives.\nA: Exactly. How about eating less meat? I've heard it's one of the biggest things you can do.\nB: Maybe, but it's very hard to change what people eat. I think buying fewer clothes would be easier.\nA: Really? Don't you think people love shopping too much?\nB: Ha, maybe you're right!" },

  { id:"p3-06", title:"Student jobs", cz:"Brigády",
    topic:"jobs that students sometimes do in their free time",
    central:"What might young people learn from doing these jobs?",
    say:"what young people might learn from doing these jobs.",
    prompts:["working in a café","babysitting","helping on a farm","teaching children to swim","working in a hotel"],
    decision:"which job would be the most useful for a young person's future.",
    partnerLines:[
      "Shall we start with working in a café? I think you learn how to deal with people, even rude ones!",
      "Babysitting teaches you to be responsible. If something goes wrong, you have to know what to do.",
      "Working on a farm sounds hard, but you'd probably learn how to work outside in any weather.",
      "Teaching children to swim must need a lot of patience. And you have to be good at explaining things.",
      "In a hotel you might use foreign languages, because there are guests from everywhere."
    ],
    decideLines:[
      "So, which one is the most useful? I'd say the hotel, because you learn languages and how to talk to customers. What do you think?",
      "OK, I agree. Let's choose the hotel."
    ],
    model:"A: Shall we start with working in a café? I did that last summer, and I learnt how to stay calm when it's really busy.\nB: That's interesting. I think you also learn to work in a team, because everybody has to help each other.\nA: Exactly. What about babysitting?\nB: I think it teaches you responsibility. You're looking after someone else's child, so you can't just look at your phone all evening.\nA: True. And teaching children to swim is similar, but you also need to be good at explaining things.\nB: Yes, and very patient! How do you feel about working on a farm?\nA: I think it would be hard work, but you'd learn how to manage your time and work outdoors." },

  { id:"p3-07", title:"A town for young people", cz:"Město pro mladé",
    topic:"ideas to make a town more attractive for young people",
    central:"How could these ideas make a town more attractive for young people?",
    say:"how these ideas could make a town more attractive for young people.",
    prompts:["a skate park","a cinema","cheaper public transport","a place for live music","free Wi-Fi in public places"],
    decision:"which idea the town should spend money on first.",
    partnerLines:[
      "Let's start with the skate park. It's cheap to build, and lots of teenagers would use it every day.",
      "A cinema would be nice, but most people watch films at home now, don't they?",
      "Cheaper public transport would help everyone, not only young people. That's a big advantage.",
      "A place for live music could bring people from other towns too. It might help local bands.",
      "Free Wi-Fi is useful, but I'm not sure it would make the town more attractive. Everyone has mobile data anyway."
    ],
    decideLines:[
      "So, which one first? I'd say cheaper public transport, because it helps people get to school and work as well. What do you think?",
      "Fair enough. Let's say public transport, then."
    ],
    model:"A: Shall we start with the skate park? I think a lot of teenagers would love it.\nB: Yes, but only the ones who skate. What about the others?\nA: That's true. Maybe a place for live music would be better, because almost everyone likes music.\nB: I agree. And it could be used for different events – concerts, parties, maybe even theatre.\nA: Good idea. What do you think about cheaper public transport?\nB: I think it's really important. In my town the last bus is at ten o'clock, so it's difficult to go out in the evening.\nA: Exactly. So it's not only about the price, but also about how often the buses run.\nB: Right. Shall we talk about the cinema now?" },

  { id:"p3-08", title:"A surprise party", cz:"Večírek s překvapením",
    topic:"things to think about when planning a surprise party for a friend",
    central:"Why might these things be important when planning a surprise party?",
    say:"why these things might be important when planning a surprise party.",
    prompts:["the place","the food","the music","the guest list","keeping it a secret"],
    decision:"which would be the most difficult thing to organise.",
    partnerLines:[
      "Shall we start with the place? It needs to be big enough, but not too expensive.",
      "The food is important too. You have to think about people who are vegetarian or have allergies.",
      "I think the music can make or break a party. If the music is bad, people go home early.",
      "The guest list is tricky, isn't it? If you forget to invite someone, they might be really upset.",
      "Keeping it a secret is the hardest part, I think. Someone always tells the person by mistake!"
    ],
    decideLines:[
      "So, what's the most difficult? I'd say keeping it a secret. What do you think?",
      "Yes, I'm happy with that. Keeping it a secret, then."
    ],
    model:"A: Shall we start with the place? I think it's one of the first things you have to decide.\nB: Definitely. If you have it at someone's house, it's cheaper, but the neighbours might complain about the noise.\nA: Good point. What about the food? Do you think it's important?\nB: Yes, very. People get hungry, and if there's nothing to eat, the party ends early.\nA: That's true. And the guest list is quite difficult too, because you don't want to forget anyone.\nB: I agree. But for a surprise party, keeping it a secret is probably the hardest thing.\nA: You're right. The more people you invite, the more likely it is that someone will tell your friend.\nB: Exactly!" },

  { id:"p3-09", title:"Moving to a big city", cz:"Stěhování do velkoměsta",
    topic:"reasons why young people might move to a big city",
    central:"Why might young people decide to move to a big city?",
    say:"why young people might decide to move to a big city.",
    prompts:["finding a job","going to university","entertainment and nightlife","better public transport","meeting new people"],
    decision:"which reason is the most important for young people.",
    partnerLines:[
      "Shall we start with jobs? In small towns there often aren't many jobs for young people.",
      "University is a big reason too. Most universities are in big cities, so students don't have a choice.",
      "Entertainment is important when you're young. In my town everything closes at nine o'clock!",
      "Better transport is useful, especially if you don't have a car. In the countryside you really need one.",
      "Meeting new people is great, but big cities can also be quite lonely, don't you think?"
    ],
    decideLines:[
      "So which reason is the most important? I think finding a job, because you need money to live in a city. Do you agree?",
      "OK, I think university and jobs are similar, but let's choose jobs."
    ],
    model:"A: Shall we start with finding a job? I think that's the main reason for most people.\nB: I agree. There are many more jobs in cities, and they're usually better paid.\nA: Yes, but living in a city is also more expensive. Rents are really high.\nB: That's true. What about university? I think a lot of young people move just to study.\nA: Definitely. And then many of them stay after they graduate because they've made friends there.\nB: Good point. So meeting new people is connected to that.\nA: Exactly. How about entertainment? Do you think that's important?\nB: For some people, yes, but I don't think it's a reason to move on its own." },

  { id:"p3-10", title:"Technology and our lives", cz:"Technologie a život",
    topic:"areas of life that technology has changed",
    central:"How has technology changed these areas of life?",
    say:"how technology has changed these areas of life.",
    prompts:["shopping","keeping in touch with friends","studying","listening to music","travelling"],
    decision:"which change has been the most positive.",
    partnerLines:[
      "Let's start with shopping. These days you can buy almost anything online in a few minutes.",
      "Keeping in touch with friends is so easy now. I talk to my cousin in Canada every week.",
      "Studying has changed a lot too. You can find any information online, but it's not always correct.",
      "Listening to music is completely different. When my parents were young, they had to buy CDs!",
      "Travelling is easier too, because you can book everything on your phone and use maps everywhere."
    ],
    decideLines:[
      "So, which change is the most positive? I think keeping in touch with people. What do you think?",
      "Yes, I agree with that. Let's choose that one."
    ],
    model:"A: Shall we start with keeping in touch with friends? I think technology has changed that the most.\nB: I agree. My grandparents used to write letters, and now we can video call anyone for free.\nA: Exactly. But sometimes I think we see each other less because we chat online all the time.\nB: That's a good point. What about studying?\nA: Well, it's much easier to find information now, but you have to check if it's true.\nB: Yes, and there are so many distractions on the computer while you study.\nA: True! How about travelling? I think apps have made it much easier.\nB: Definitely. I can't imagine travelling without a map on my phone." },

  { id:"p3-11", title:"Keeping in touch", cz:"Být v kontaktu",
    topic:"ways people keep in touch with friends and family",
    central:"What are the advantages and disadvantages of these ways of keeping in touch?",
    say:"the advantages and disadvantages of these ways of keeping in touch.",
    prompts:["phone calls","text messages","video calls","social media","visiting in person"],
    decision:"which is the best way to keep in touch with someone who lives far away.",
    partnerLines:[
      "Shall we start with phone calls? I think they're more personal than messages, because you hear the person's voice.",
      "Text messages are quick, but it's easy to misunderstand them. People can't hear if you're joking.",
      "Video calls are great because you can see each other. But the connection is sometimes terrible.",
      "Social media is good for seeing what people are doing, but it's not real communication, is it?",
      "Visiting in person is the best, of course, but it takes time and money."
    ],
    decideLines:[
      "So, for someone far away… I'd choose video calls. You can see them, and it's free. Do you agree?",
      "Great, let's go with video calls."
    ],
    model:"A: Let's start with video calls. I think they're the best way to keep in touch with someone far away.\nB: I agree, because you can see their face and their home. It's almost like being there.\nA: Exactly. But it's sometimes difficult to find a time, especially if there's a time difference.\nB: That's true. Text messages are easier, because you can reply whenever you want.\nA: Yes, but they're not very personal. What do you think about social media?\nB: I think it's useful for sharing photos, but you don't really talk to people.\nA: I see what you mean. And visiting in person is the best, but it's expensive.\nB: Definitely, especially if they live in another country." },

  { id:"p3-12", title:"Skills for life", cz:"Dovednosti do života",
    topic:"skills that young people might learn",
    central:"How useful might these skills be in the future?",
    say:"how useful these skills might be in the future.",
    prompts:["cooking","managing money","first aid","driving","speaking in public"],
    decision:"which skill schools should teach.",
    partnerLines:[
      "Shall we start with cooking? Everyone needs to eat, so it's useful for the whole of your life.",
      "Managing money is really important, I think. Many young people have problems with debt.",
      "First aid could save someone's life. I think everybody should know the basics.",
      "Driving is useful, but with climate change maybe fewer people will drive in the future.",
      "Speaking in public is scary for most people, but it's very useful at university and at work."
    ],
    decideLines:[
      "So which one should schools teach? I'd say first aid, because it can save lives. What do you think?",
      "OK, I agree. First aid, then."
    ],
    model:"A: Shall we start with cooking? I think it's one of the most useful skills.\nB: I agree. When students leave home, many of them can't cook anything, so they eat fast food.\nA: Exactly. What about managing money?\nB: That's really important too. If you don't know how to plan your money, you can get into trouble.\nA: True. And first aid? I did a course last year and I think everyone should do one.\nB: Really? What did you learn?\nA: How to help someone who isn't breathing, for example. It was really interesting.\nB: That sounds very useful. I think speaking in public is useful too, but it's not as important as first aid." },

  { id:"p3-13", title:"Family activities", cz:"Rodinné aktivity",
    topic:"activities families can do together",
    central:"What are the benefits of doing these activities together as a family?",
    say:"the benefits of doing these activities together as a family.",
    prompts:["playing board games","going for walks","cooking together","watching films","doing sport"],
    decision:"which activity is the best for families with teenagers.",
    partnerLines:[
      "Let's start with board games. They're cheap and everyone can play, from children to grandparents.",
      "Going for walks is good because you can talk to each other without any distractions.",
      "Cooking together sounds fun, but in my family it would probably end in an argument!",
      "Watching films is easy, but you don't really talk while you're watching, do you?",
      "Doing sport together is healthy, but parents and teenagers often like different sports."
    ],
    decideLines:[
      "So, for families with teenagers… I'd say cooking, because teenagers learn something useful. What do you think?",
      "OK, that sounds good. Let's choose cooking."
    ],
    model:"A: Shall we start with board games? I think they're great for families because everyone can join in.\nB: I agree, but some teenagers think board games are boring.\nA: That's true. What about going for walks?\nB: I think that's a good one, because you can really talk to each other. At home, everyone's on their phone.\nA: Exactly. And cooking together is useful, because teenagers learn how to make meals.\nB: Yes, I like that idea. My dad taught me to make pancakes and now I make them every Sunday.\nA: That's nice! And watching films?\nB: It's relaxing, but you don't really spend time together – you just sit in the same room." },

  { id:"p3-14", title:"Hobbies", cz:"Koníčky",
    topic:"hobbies that people enjoy",
    central:"What can people get from doing these hobbies?",
    say:"what people can get from doing these hobbies.",
    prompts:["playing a musical instrument","photography","gardening","collecting things","playing chess"],
    decision:"which hobby would be the best to start at any age.",
    partnerLines:[
      "Shall we start with playing an instrument? It's difficult at first, but it must be very satisfying later.",
      "Photography is great because you start to notice beautiful things around you.",
      "Gardening is relaxing, and you can grow your own vegetables too. That's a nice bonus.",
      "Collecting things… I'm not sure what people get from it. Maybe it's just fun to look for things?",
      "Chess is really good for your brain. My grandfather plays every day and he's very sharp."
    ],
    decideLines:[
      "So, which one can you start at any age? I'd say gardening or photography. What do you think?",
      "Let's choose photography, then. Everyone has a camera on their phone."
    ],
    model:"A: Let's start with playing an instrument. I think you get a lot of satisfaction when you can finally play a song.\nB: Yes, but it takes years to get good, and you have to practise every day.\nA: That's true. What do you think about photography?\nB: I really like that one. It makes you look at the world in a different way.\nA: I agree. And it's easy to start because everyone has a phone with a camera.\nB: Exactly. Gardening is good too, especially for people who want to relax.\nA: Yes, and you spend time outside. How about chess?\nB: It's great for your brain, but some people find it too slow." },

  { id:"p3-15", title:"Friendship", cz:"Přátelství",
    topic:"things that might be important in a friendship",
    central:"Why might these things be important in a friendship?",
    say:"why these things might be important in a friendship.",
    prompts:["being honest","having the same interests","being a good listener","spending time together","helping each other"],
    decision:"which is the most important thing in a friendship.",
    partnerLines:[
      "Shall we start with being honest? I think if you can't trust your friend, the friendship doesn't work.",
      "Having the same interests helps, but my best friend and I like completely different things.",
      "Being a good listener is so important. Some people only talk about themselves!",
      "Spending time together is important, but it's difficult when people move to different cities.",
      "Helping each other is what friends are for, isn't it? Especially when things go wrong."
    ],
    decideLines:[
      "So, which is the most important? For me it's being honest. What about you?",
      "OK, let's say honesty, then. We agree."
    ],
    model:"A: Shall we start with being honest? I think it's the most important thing.\nB: I agree, but sometimes the truth can hurt. Do you think you should always be completely honest?\nA: Hmm, that's a difficult question. Maybe not always, but about important things, yes.\nB: That makes sense. What about having the same interests?\nA: I think it helps you become friends at first, but it's not necessary later.\nB: Exactly. My best friend loves football and I hate it, but we're still very close.\nA: That's interesting. Being a good listener is important too, I think.\nB: Definitely. Everybody needs someone to talk to when they have a problem." },

  { id:"p3-16", title:"A day for visitors", cz:"Den pro turisty",
    topic:"things that visitors could do in a town",
    central:"Why might tourists enjoy doing these things?",
    say:"why tourists might enjoy doing these things.",
    prompts:["visiting a museum","going on a walking tour","trying local food","going to a market","taking a boat trip"],
    decision:"which would be the best thing for a visitor who only has one day.",
    partnerLines:[
      "Let's start with the museum. It's good if you want to learn about the history of the place.",
      "A walking tour is a great way to see a lot in a short time, and the guide tells you interesting stories.",
      "Trying local food is my favourite part of travelling! You learn a lot about a country from its food.",
      "Markets are fun, but they can be very crowded and a bit touristy.",
      "A boat trip sounds relaxing, especially if the town has a river or is by the sea."
    ],
    decideLines:[
      "So, for one day… I'd choose the walking tour, because you see the most. Do you agree?",
      "Great, we've decided on the walking tour."
    ],
    model:"A: Shall we start with trying local food? I think that's one of the best things about travelling.\nB: I agree! You can learn a lot about a place from what people eat.\nA: Exactly. And it's something you can do at any time of day.\nB: True. What about a museum? Some people find them boring.\nA: I think it depends on the museum. If it's interactive, it can be really interesting.\nB: That's a good point. And a walking tour?\nA: I think that's the best way to see a new town, because a local guide shows you places you'd never find on your own.\nB: I agree. Shall we talk about the boat trip?" },

  { id:"p3-17", title:"Exam stress", cz:"Stres před zkouškami",
    topic:"things that might help students feel less stressed before exams",
    central:"How might these things help students to feel less stressed before exams?",
    say:"how these things might help students to feel less stressed before exams.",
    prompts:["making a study plan","doing exercise","talking to a teacher","studying with friends","taking regular breaks"],
    decision:"which would be the most helpful.",
    partnerLines:[
      "Shall we start with making a study plan? When I have a plan, I feel much more in control.",
      "Doing exercise really helps me. After a run, I can concentrate much better.",
      "Talking to a teacher is a good idea, but some students are too shy to ask for help.",
      "Studying with friends can be useful, but it can also make you more stressed if they know more than you!",
      "Taking regular breaks is important. Nobody can study for six hours without stopping."
    ],
    decideLines:[
      "So which is the most helpful? I'd say making a study plan. What do you think?",
      "Fine, let's choose the study plan, then."
    ],
    model:"A: Let's start with making a study plan. I think it really helps, because you know exactly what to do each day.\nB: I agree. When I don't have a plan, I panic because I think there's too much to learn.\nA: Exactly. What about doing exercise?\nB: I think it's great. Even a short walk helps me relax.\nA: Me too. But some students think they don't have time for exercise before exams.\nB: That's true, but they're wrong! What do you think about studying with friends?\nA: It depends on the friends. If they're serious, it's useful. If not, you just chat.\nB: Ha, yes, that's what usually happens with my friends." },

  { id:"p3-18", title:"A new student", cz:"Nový spolužák",
    topic:"things that could help a new student who is starting at a school",
    central:"How could these things help a new student?",
    say:"how these things could help a new student.",
    prompts:["a tour of the school","an older student as a 'buddy'","joining a club","a welcome party","an information booklet"],
    decision:"which the school should do first.",
    partnerLines:[
      "Shall we start with the tour? On the first day you don't even know where the toilets are!",
      "I really like the buddy idea. It's easier to ask an older student than a teacher.",
      "Joining a club is a great way to make friends who like the same things as you.",
      "A welcome party sounds fun, but shy students might find it a bit scary.",
      "An information booklet is useful, but I don't think many students would read it, do you?"
    ],
    decideLines:[
      "So, what should the school do first? I'd say the tour, because it's the first thing you need. Do you agree?",
      "Yes, OK. Let's start with the tour."
    ],
    model:"A: Shall we start with the tour of the school? I think it's really important on the first day.\nB: I agree. When I started secondary school, I got lost three times on the first day!\nA: Ha! Me too. What do you think about having a buddy?\nB: I think it's a great idea, because the new student has someone to ask about everything.\nA: Exactly. And the buddy could introduce them to other students.\nB: That's a good point. What about a welcome party?\nA: It could be nice, but if you don't know anybody, a party can be quite stressful.\nB: That's true. Maybe joining a club is better, because you do something together." },

  { id:"p3-19", title:"Raising money for charity", cz:"Sbírka pro charitu",
    topic:"ways of raising money for a local charity",
    central:"How successful might these ways of raising money be?",
    say:"how successful these ways of raising money might be.",
    prompts:["a sponsored run","a cake sale","a concert","selling second-hand clothes","an online campaign"],
    decision:"which would raise the most money.",
    partnerLines:[
      "Shall we start with a sponsored run? People like supporting friends who do something difficult.",
      "A cake sale is easy to organise, but you don't make much money, do you?",
      "A concert could raise a lot, especially if a popular local band plays for free.",
      "Selling second-hand clothes is good for the environment as well as for the charity.",
      "An online campaign can reach thousands of people, but there are so many of them now that people ignore them."
    ],
    decideLines:[
      "So, which would raise the most? I'd say the concert. What do you think?",
      "OK, I'm happy with the concert."
    ],
    model:"A: Shall we start with a sponsored run? I think it could be quite successful.\nB: I agree. If lots of people take part, and each person gets sponsors, you could raise a lot of money.\nA: Exactly. What about a cake sale?\nB: It's fun, but I don't think it would make much. Cakes are cheap.\nA: That's true. A concert might be better, because people pay for tickets.\nB: Yes, but it costs money to organise a concert – you need a place, sound equipment and so on.\nA: Good point. How do you feel about an online campaign?\nB: It could reach lots of people, but I'm not sure they'd actually give money." },

  { id:"p3-20", title:"What makes us buy things", cz:"Co ovlivňuje nákupy",
    topic:"things that influence what people buy",
    central:"How much do these things influence what people buy?",
    say:"how much these things influence what people buy.",
    prompts:["advertisements","friends' opinions","the price","online reviews","famous people"],
    decision:"which has the biggest influence on young people.",
    partnerLines:[
      "Let's start with advertisements. They're everywhere – on TV, online, even on buses.",
      "Friends' opinions matter a lot, I think. If my friends love something, I usually want it too.",
      "For most people the price is the most important thing, especially for students.",
      "I always read online reviews before I buy anything expensive. Don't you?",
      "Famous people have a huge influence on teenagers. If a singer wears certain trainers, everyone wants them."
    ],
    decideLines:[
      "So, for young people, I think famous people have the biggest influence. What do you think?",
      "Hmm, OK, let's agree on that, then."
    ],
    model:"A: Shall we start with advertisements? I think they influence us more than we realise.\nB: I agree. Even if you don't watch TV, you see adverts online all the time.\nA: Exactly. What about friends' opinions?\nB: For me that's really important. If a friend recommends something, I trust them more than an advert.\nA: Me too. And online reviews are similar, because they come from real customers.\nB: Yes, but some reviews are fake, aren't they?\nA: That's true. How about famous people?\nB: I think they have a big influence on teenagers, especially on social media." },

  { id:"p3-21", title:"Less traffic in the city", cz:"Méně aut ve městě",
    topic:"ideas for reducing traffic in city centres",
    central:"How effective might these ideas be in reducing traffic in city centres?",
    say:"how effective these ideas might be in reducing traffic in city centres.",
    prompts:["more bike lanes","cheaper buses and trams","car-free days","more expensive parking","working from home"],
    decision:"which idea would be the most effective.",
    partnerLines:[
      "Shall we start with bike lanes? If people feel safe on a bike, more of them will cycle.",
      "Cheaper buses would help, but they also need to be faster and more frequent.",
      "Car-free days are a nice idea, but they only happen once or twice a year, don't they?",
      "More expensive parking would definitely work, but drivers would be really angry!",
      "Working from home has already reduced traffic a lot in some cities."
    ],
    decideLines:[
      "So, which is the most effective? I'd say cheaper public transport. What about you?",
      "OK, let's go with that."
    ],
    model:"A: Let's start with more bike lanes. I think they would make a big difference.\nB: I agree, but only when the weather is good. In winter, most people won't cycle.\nA: That's true. What about cheaper buses and trams?\nB: I think that's the best idea. If public transport is cheap, people leave their cars at home.\nA: Exactly. But it also has to be reliable. Nobody wants to wait twenty minutes for a bus.\nB: Good point. How do you feel about more expensive parking?\nA: It would probably work, but it's not very fair for people who really need a car.\nB: I see what you mean. Maybe it should be combined with better buses." }
],

/* ---------- PART 4: discussion linked to the Part 3 task (p3). items: q + Czech outline + useful phrases;
   an item with pa is first asked to the partner, then the interlocutor asks the learner to respond.
   model = sample strong-B2 answer to items[0]. ---------- */
p4: [
  { id:"p4-01", p3:"p3-01", items:[
    { q:"Do you think young people today are healthier than in the past? Why or why not?", outline:"V něčem ano (víc informací, posilovny, sportovní kluby), v něčem ne (méně pohybu, víc času u obrazovek). Příklad: rodiče chodili ven každý den. Závěr: záleží na člověku.", phrases:["In some ways…, but in other ways…","For example,…","It depends on…"] },
    { q:"Should schools teach students how to cook healthy meals?", outline:"Ano: praktická dovednost na celý život, zdravější strava. Příklad: studenti na kolejích jedí fast food. Ale: málo místa v rozvrhu, je to i úkol rodičů.", phrases:["I think it's a great idea because…","On the other hand,…"] },
    { q:"Why do some people find it difficult to do regular exercise?", pa:"I think the main problem is time. People work long hours, and when they get home they're too tired. Also, gyms are quite expensive.", outline:"Důvody: nedostatek času, únava, peníze, chybí motivace. Příklad: po škole už nemám energii. Řešení: chodit pěšky, cvičit s kamarádem.", phrases:["The main reason is that…","What's more,…","One solution might be…"] },
    { q:"Do you think famous sports stars are good role models for young people?", outline:"Ano: disciplína, tvrdá práce, zdravý život. Ne vždy: skandály, obrovské peníze. Příklad: sportovec, který pomáhá charitě.", phrases:["Some of them are, but…","A good example is…"] },
    { q:"Is it the government's job to help people live more healthily?", outline:"Částečně: levnější sportoviště, informační kampaně, zdravé jídlo ve školách. Ale nakonec je každý zodpovědný sám za sebe.", phrases:["To some extent,…","In the end, it's up to…"] }],
    model:"I think in some ways they are, but in other ways they aren't. Young people today know much more about healthy food, and there are lots of gyms and sports clubs. On the other hand, we spend hours sitting in front of screens. When my parents were teenagers, they played outside every day after school, but now a lot of my friends only move when they walk to the bus stop. So I'd say it really depends on the person." },

  { id:"p4-02", p3:"p3-02", items:[
    { q:"Do you think it's better to go on holiday in your own country or abroad?", outline:"Obojí má výhody. Doma: levnější, bez letu, poznáš vlastní zemi. Zahraničí: nová kultura, jídlo, jazyk. Příklad: hory doma vs. moře v cizině.", phrases:["Both have advantages.","Personally, I prefer…"] },
    { q:"Why do some people go to the same place on holiday every year?", outline:"Jistota, místo znají, odpočinek bez plánování, přátelé tam. Příklad: prarodiče jezdí každý rok na stejnou chatu. Nevýhoda: nic nového.", phrases:["I suppose…","The advantage is that…"] },
    { q:"Is it important to plan a holiday carefully, or is it better to be spontaneous?", pa:"I prefer to plan everything. I like knowing where I'm going to sleep and what I'm going to see. If I don't plan, I worry the whole time.", outline:"Plánování: méně stresu, levnější letenky. Spontánnost: dobrodružství, svoboda. Kompromis: zarezervovat ubytování, zbytek nechat volný.", phrases:["I'd say a mix of both.","On the one hand,… On the other hand,…"] },
    { q:"Do you think tourism is good for the places people visit?", outline:"Ano: peníze, pracovní místa. Ne: davy, drahé bydlení pro místní, odpadky. Příklad: historické centrum v létě.", phrases:["It's true that…, but…","For example,…"] },
    { q:"How do you think holidays might be different in the future?", outline:"Možná méně letů kvůli životnímu prostředí, víc vlaků, kratší cesty blízko domova. Příklad: noční vlaky jsou znovu populární.", phrases:["I think people might…","Maybe in the future…"] }],
    model:"I think both have advantages. Holidays in your own country are usually cheaper and you don't have to fly, which is better for the environment. I've been to the mountains in my country lots of times, and they're beautiful. But going abroad is more exciting, because you see a different culture, try new food and maybe practise a foreign language. For me, the best thing would be a mix – one big trip abroad and some shorter trips at home." },

  { id:"p4-03", p3:"p3-03", items:[
    { q:"What makes a good teacher, in your opinion?", outline:"Umí jasně vysvětlit, je trpělivý, spravedlivý, má rád svůj předmět. Příklad: učitel, který tě bavil. Nestačí jen znalosti.", phrases:["In my opinion, the most important thing is…","For example, my … teacher…"] },
    { q:"Do you think students should get less homework?", outline:"Ano: únava, málo času na koníčky a spánek. Ale procvičování je potřeba. Řešení: méně úkolů, ale smysluplných.", phrases:["I think so, because…","But it depends on…"] },
    { q:"Should students be allowed to use their phones at school?", pa:"I think phones should be allowed in the breaks, but not in lessons. In lessons they're just a distraction, and people stop listening to the teacher.", outline:"Ve výuce ne (rozptyluje), o přestávkách ano. Někdy užitečný: slovník, aplikace, fotky tabule. Příklad: pravidla na tvé škole.", phrases:["I agree with…, but…","It can be useful for…"] },
    { q:"Is it better to study at a big school or a small school?", outline:"Velká: víc předmětů, kroužků a lidí. Malá: všichni se znají, učitelé mají víc času na každého. Příklad: tvoje škola.", phrases:["The advantage of … is that…","…, whereas…"] },
    { q:"How do you think schools will change in the future?", outline:"Víc technologií, část výuky online, umělá inteligence, méně papírových učebnic. Ale učitelé budou potřeba dál.", phrases:["I think there will probably be…","I can't imagine…"] }],
    model:"In my opinion, the most important thing is being able to explain things clearly. Some teachers know a lot, but they can't explain it in a simple way. A good teacher is also patient and fair, and doesn't make students feel stupid when they make mistakes. For example, my maths teacher always explains a problem in two or three different ways until everyone understands. Because of her, I actually started to enjoy maths, which I never thought would happen!" },

  { id:"p4-04", p3:"p3-04", items:[
    { q:"Why do you think English is so important nowadays?", outline:"Mezinárodní jazyk: práce, cestování, internet, věda. Příklad: návody, hry a filmy jsou v angličtině.", phrases:["The main reason is that…","For instance,…"] },
    { q:"Do you think everyone should learn two foreign languages at school?", outline:"Ano: otevírá dveře, poznáš jinou kulturu. Ale: málo času, ne každý má na jazyky talent. Možná druhý jazyk dobrovolně.", phrases:["I think it's a good idea because…","However,…"] },
    { q:"Is it easier for children or adults to learn a language?", pa:"I think it's easier for children. They aren't afraid of making mistakes, and they just copy what they hear. My little cousin already speaks English better than me!", outline:"Děti: lepší výslovnost, nebojí se chyb. Dospělí: silnější motivace, rozumějí gramatice. Příklad: malý sourozenec nebo rodiče.", phrases:["I agree that…, but…","Adults, on the other hand,…"] },
    { q:"Will people still need to learn languages if translation apps get better?", outline:"Aplikace pomohou na cestách, ale nejsou dokonalé. Komunikace je víc než překlad – humor, kultura, přátelství.", phrases:["I don't think so, because…","Apps are useful for…"] },
    { q:"What's the best way to remember new words?", outline:"Používat slova ve větách, kartičky, opakování po pár dnech, písničky a seriály. Příklad: co funguje tobě.", phrases:["What works for me is…","It's important to…"] }],
    model:"I think the main reason is that it's the international language. If you travel, English is usually the language you use, even in countries where nobody speaks it as a first language. It's also important for jobs – lots of companies want people who can write emails and talk to customers in English. And of course, most of the internet, games and films are in English, so if you speak it, you have access to much more information." },

  { id:"p4-05", p3:"p3-05", items:[
    { q:"Do you think young people care more about the environment than older people?", outline:"V něčem ano – jde o jejich budoucnost, protesty. Ale starší lidé šetří a opravují věci. Příklad: prarodiče nic nevyhodí.", phrases:["In some ways…, but…","For example, my grandparents…"] },
    { q:"What can schools do to help the environment?", outline:"Třídit odpad, šetřit energii, solární panely, méně papíru, výuka o klimatu, zahrada. Příklad: projekt na tvé škole.", phrases:["Schools could…","It would also be a good idea to…"] },
    { q:"Should people pay more for things that are bad for the environment, like plastic bags?", pa:"Yes, I think so. When shops started charging for plastic bags, people brought their own bags very quickly. So it really works.", outline:"Ano: funguje (příklad s taškami). Ale: nespravedlivé pro chudší lidi. Musí existovat levná alternativa.", phrases:["I agree with…, because…","The problem is that…"] },
    { q:"Who is more responsible for protecting the environment – governments or individuals?", outline:"Obojí. Vlády: zákony a velké změny (doprava, energie). Jednotlivci: každodenní volby. Bez vlády je efekt malý.", phrases:["I think it's both.","Governments can…, while individuals…"] },
    { q:"Are you optimistic about the future of the planet? Why or why not?", outline:"Trochu ano: nové technologie, elektromobily, větší zájem lidí. Ale změny jsou pomalé. Řekni, jak to cítíš ty.", phrases:["I'm quite optimistic because…","What worries me is…"] }],
    model:"In some ways I think they do. Young people talk about climate change a lot, and many of them go on protests or try to eat less meat. That's probably because it's their future that's at risk. But I don't think older people don't care. My grandparents, for example, never throw anything away – they repair things and grow their own vegetables. So maybe older people help the environment in a more practical way, without talking about it so much." },

  { id:"p4-06", p3:"p3-06", items:[
    { q:"Is it a good idea for teenagers to have a part-time job while they're at school?", outline:"Ano: zkušenost, vlastní peníze, zodpovědnost. Ne: méně času na učení a spánek. Ideálně pár hodin týdně nebo léto.", phrases:["I think it's a good idea as long as…","The danger is that…"] },
    { q:"What's more important in a job – the money or enjoying what you do?", outline:"Obojí, ale spokojenost – v práci strávíme mnoho let. Peníze jsou nutné na život. Příklad někoho, kdo změnil práci.", phrases:["For me, … is more important, because…","Of course,…"] },
    { q:"Why do you think some jobs are paid much more than others?", pa:"I suppose it's because some jobs need many years of study, like doctors or lawyers. But I think nurses and teachers should get much more money.", outline:"Vzdělání, odpovědnost, poptávka. Nespravedlnost: zdravotní sestry, učitelé. Příklad.", phrases:["I suppose it's because…","It doesn't seem fair that…"] },
    { q:"Would you prefer to work in an office or outdoors? Why?", outline:"Osobní preference + důvod. Výhody a nevýhody obou (počasí, pohyb, pohodlí, kolegové).", phrases:["I'd definitely prefer…","The advantage is…"] },
    { q:"Do you think people will work fewer hours in the future?", outline:"Možná: technologie, čtyřdenní pracovní týden. Ale: život je drahý. Tvůj názor + důvod.", phrases:["It's possible that…","I'm not sure, because…"] }],
    model:"I think it's a good idea, as long as it doesn't affect their studies. Having a part-time job teaches you a lot – for example, how to be on time, how to work with other people and how much things really cost. I worked in a shop at weekends last year, and I became much more careful with money. But if a student works every evening, they'll be too tired to study, so a few hours a week or a summer job is probably best." },

  { id:"p4-07", p3:"p3-07", items:[
    { q:"Do you think towns do enough for young people?", outline:"Často ne: peníze jdou jinam, chybí místa, kde se dá potkat bez utrácení. Příklad: tvoje město. Co by pomohlo.", phrases:["Not really, in my opinion.","In my town, for example,…"] },
    { q:"Is it better for children to grow up in a city or in the countryside?", outline:"Město: možnosti, kultura, školy. Venkov: bezpečí, příroda, svoboda. Vlastní zkušenost.", phrases:["It depends on…","Children in the countryside…, whereas…"] },
    { q:"Should young people have a say in how their town spends its money?", pa:"Yes, definitely. Young people know what they need better than older politicians. Some towns even have youth councils, which I think is a great idea.", outline:"Ano: znají své potřeby, učí se demokracii. Příklad: studentská rada, hlasování o projektech. Ale dospělí mají víc zkušeností.", phrases:["I agree with…","It would help young people to…"] },
    { q:"Why do some young people get bored in their free time?", outline:"Nic k dělání, málo peněz, telefon místo aktivit. Řešení: kroužky, sport, dobrovolnictví.", phrases:["One reason might be…","Another reason is…"] },
    { q:"How important are parks and other public spaces in a town?", outline:"Velmi: setkávání, sport, zdraví, příroda ve městě, místo pro rodiny. Příklad: park ve tvém městě.", phrases:["They're really important because…","Without them,…"] }],
    model:"Not really, in my opinion. In many towns there are places for small children, like playgrounds, and places for adults, like restaurants, but nothing for teenagers. In my town, for example, the only thing we can do in the evening is sit in a café, which gets expensive. I think towns should ask young people what they want – maybe a sports centre with cheap tickets or a youth club where people can meet without spending money." },

  { id:"p4-08", p3:"p3-08", items:[
    { q:"Why do you think people like celebrating special occasions?", outline:"Setkání s rodinou a přáteli, přestávka v rutině, vzpomínky, ukázat někomu, že je důležitý. Příklad: narozeniny, Vánoce.", phrases:["I think people need…","It's a chance to…"] },
    { q:"Do people spend too much money on celebrations nowadays?", outline:"Někdy ano: svatby, drahé dárky, tlak sociálních sítí. Ale je to jejich volba. Příklad.", phrases:["Some people do, especially…","In my opinion,…"] },
    { q:"Is it better to celebrate at home or in a restaurant?", pa:"I prefer celebrating at home. It's cheaper, you can stay as long as you like, and you can play your own music. Restaurants are nice, but they're too formal for me.", outline:"Doma: levnější, pohodlí, ale vaření a úklid. Restaurace: žádná práce, ale dražší a formálnější.", phrases:["I agree with…, but…","The good thing about … is…"] },
    { q:"How have celebrations changed since your grandparents were young?", outline:"Víc peněz a dárků, fotky na sociálních sítích, menší rodiny. Dřív jednodušší, víc doma. Příklad z rodiny.", phrases:["When my grandparents were young,…","Nowadays,…"] },
    { q:"Do you think it's important to keep traditional festivals?", outline:"Ano: identita, kultura, spojení generací. Mohou se ale měnit. Příklad: tradice ve tvé zemi.", phrases:["I think it's important because…","In my country, for example,…"] }],
    model:"I think people need a break from their normal routine. Most of the year we're busy with school or work, so a celebration is a chance to relax and spend time with the people we love. It's also a way of showing someone that they're important – for example, when you organise a party for a friend's birthday. And I think celebrations create memories. When I think about my childhood, a lot of my best memories are from birthdays and Christmas." },

  { id:"p4-09", p3:"p3-09", items:[
    { q:"What are the disadvantages of living in a big city?", outline:"Hluk, doprava, znečištění, drahé bydlení, anonymita. Příklad.", phrases:["One big disadvantage is…","Another problem is that…"] },
    { q:"Do you think more people will live in cities in the future?", outline:"Pravděpodobně ano: práce, služby. Ale práce z domova – někteří se stěhují na venkov.", phrases:["I think it's likely that…","On the other hand,…"] },
    { q:"Why do some people move from the city to the countryside?", pa:"I think they want a quieter life, especially when they have children. In the countryside houses are cheaper, there's more space and the air is cleaner.", outline:"Klid, příroda, levnější bydlení, děti, práce z domova. Příklad známých.", phrases:["I agree with…","Another reason might be…"] },
    { q:"What could be done to make cities better places to live?", outline:"Víc zeleně, cyklostezky, levnější bydlení, méně aut, místa pro setkávání.", phrases:["One thing that would help is…","Cities could also…"] },
    { q:"Would you like to live in a different city or country one day?", outline:"Osobní odpověď + kde + proč. Použij podmínku: If I could, I'd… / I'd like to…", phrases:["If I could, I'd…","I've always wanted to…"] }],
    model:"One big disadvantage is the cost of living. Flats in big cities are really expensive, so many young people have to share with others or live far from the centre. Another problem is the noise and the traffic. It can take an hour to cross the city in the rush hour, and the air isn't very clean. Some people also feel lonely in a big city, because nobody knows their neighbours. So although cities are exciting, they're not always easy places to live." },

  { id:"p4-10", p3:"p3-10", items:[
    { q:"Do you think people spend too much time on their phones?", outline:"Ano: hodiny denně, méně osobního kontaktu, horší spánek. Ale telefon je i užitečný. Příklad.", phrases:["I'd say yes, because…","Having said that,…"] },
    { q:"Has technology made our lives easier or more complicated?", outline:"Většinou jednodušší (platby, mapy, komunikace), ale víc stresu, rozptýlení a neustálé dostupnosti.", phrases:["In most ways…, but…","For example,…"] },
    { q:"Should young children have their own smartphones?", pa:"I think it depends on the age. A ten-year-old doesn't need a smartphone – a simple phone for calling parents is enough. Teenagers probably need one for school and friends.", outline:"Záleží na věku. Bezpečnost (zavolat rodičům) vs. rizika (sociální sítě, závislost). Pravidla od rodičů.", phrases:["I agree with…, it depends on…","Parents should…"] },
    { q:"Which invention do you think has changed the world the most?", outline:"Internet / chytrý telefon / počítač / auto. Proč – příklad, jak se změnil život.", phrases:["I'd say … because…","Before…, people had to…"] },
    { q:"How might technology change the way we live in the next twenty years?", outline:"Samořiditelná auta, umělá inteligence, chytré domácnosti, medicína. Obavy: práce, soukromí.", phrases:["I think we'll probably…","What worries me is…"] }],
    model:"I'd say yes, most people do, including me. I check my phone the moment I wake up, and it's often the last thing I look at at night. The problem is that it isn't only for one thing – it's our music, our news, our friends and our games, so we pick it up all the time. I think it affects our sleep and our concentration. Having said that, phones are really useful, so the answer isn't to stop using them, just to use them more carefully." },

  { id:"p4-11", p3:"p3-11", items:[
    { q:"Do you think social media helps people to make real friends?", outline:"Někdy: lidé se stejnými zájmy, i z jiných zemí. Většinou ale povrchní kontakty. Skutečné přátelství potřebuje osobní setkání.", phrases:["In some cases,…","But I think real friendship…"] },
    { q:"Is it rude to look at your phone when you're with other people?", outline:"Většinou ano: druhý se cítí nedůležitý. Výjimka: důležitá zpráva. Příklad: kamarádi u stolu.", phrases:["I think it is, because…","Unless…"] },
    { q:"Do people write fewer letters and cards than in the past?", pa:"Yes, much fewer. I only write cards at Christmas, and only to my grandparents. But I think a handwritten card is really special because it's so rare now.", outline:"Ano, nahradily je e-maily a zprávy. Ručně psaný dopis je proto vzácný a cenný. Příklad.", phrases:["I agree that…","That's why…"] },
    { q:"How important is it to see your family regularly?", outline:"Důležité: vztahy, podpora, prarodiče. Ale vzdálenost a čas. Příklad tvé rodiny.", phrases:["I think it's very important because…","In my family,…"] },
    { q:"What problems can there be when people communicate online?", outline:"Nedorozumění, chybí tón hlasu, nenávistné komentáře, falešné profily. Příklad.", phrases:["One problem is that…","It's also easy to…"] }],
    model:"In some cases, yes. You can meet people who have the same interests as you, even if they live in another country, and sometimes those friendships become real. A friend of mine met her best friend in an online group for people who draw comics, and now they visit each other. But I think most contacts on social media aren't real friends. A real friend is someone you can call when you have a problem, and I think that needs time together in person." },

  { id:"p4-12", p3:"p3-12", items:[
    { q:"Do you think schools teach the right skills for adult life?", outline:"Částečně: teorii ano, praktické věci (peníze, vaření, úřady) málo. Příklad: nevím, jak zaplatit účty nebo pronajmout byt.", phrases:["Partly, but…","For example, nobody teaches us…"] },
    { q:"Who should teach young people practical skills – parents or schools?", outline:"Obojí: rodiče doma (vaření, úklid), škola systematicky (první pomoc, finance). Ne všichni rodiče mají čas nebo znalosti.", phrases:["I think both should…","Not all parents…"] },
    { q:"Is it more important to be good at practical things or at academic subjects?", pa:"I think both are important, but practical skills are often forgotten. You can be very good at physics but not know how to change a light bulb!", outline:"Obojí. Praktické dovednosti pro každodenní život, akademické pro kariéru. Záleží na povolání.", phrases:["I agree with…, and I'd add…","It depends on…"] },
    { q:"Why are some people afraid of speaking in public?", outline:"Strach z chyb a z posměchu, málo praxe. Řešení: cvičit, začít v malé skupině, dobře se připravit.", phrases:["I think the main reason is…","The best way to get better is…"] },
    { q:"What new skill would you like to learn in the next few years?", outline:"Osobní: konkrétní dovednost + proč + jak se ji naučíš.", phrases:["I'd really like to learn…","…, because…"] }],
    model:"Partly, but not completely. Schools are good at teaching subjects like maths, history and languages, and that's important for university. But there are lots of practical things that nobody teaches us. For example, I have no idea how to pay bills or what to do if I want to rent a flat. Some schools have started teaching first aid and how to manage money, which I think is great. It would be useful if all schools did that." },

  { id:"p4-13", p3:"p3-13", items:[
    { q:"Do families spend less time together than they did in the past?", outline:"Pravděpodobně ano: práce, telefony, každý jiný program. Ale někdy víc (práce z domova). Příklad.", phrases:["I think they probably do, because…","On the other hand,…"] },
    { q:"Is it important for families to eat meals together?", outline:"Ano: mluví se o dni, zdravější jídlo, lepší vztahy. Těžké kvůli rozvrhům. Příklad tvé rodiny.", phrases:["I think it's really important because…","In my family, we…"] },
    { q:"Should teenagers go on holiday with their parents?", pa:"I think it's fine until about sixteen. After that, most teenagers want to go with friends. But a short trip with your family can still be fun.", outline:"Záleží na věku a vztazích. Výhody: společný čas, levnější. Nevýhody: nuda, hádky. Kompromis.", phrases:["I agree with…, but…","Maybe a compromise is…"] },
    { q:"What can grandparents teach young people?", outline:"Životní zkušenosti, historie rodiny, praktické dovednosti, trpělivost. Příklad: babička tě naučila vařit.", phrases:["They can teach us…","For example, my grandmother…"] },
    { q:"How have families changed in your country in recent years?", outline:"Menší rodiny, děti později, oba rodiče pracují, prarodiče bydlí daleko.", phrases:["Nowadays,…","Compared to the past,…"] }],
    model:"I think they probably do, mainly because everyone is so busy. Parents often work long hours, and children have school, clubs and homework. And even when the whole family is at home, everyone is often in a different room looking at a screen. On the other hand, some parents now work from home, so they can see their children more during the day. In my family, we try to have dinner together at least three times a week, and it really helps." },

  { id:"p4-14", p3:"p3-14", items:[
    { q:"Why do you think hobbies are important?", outline:"Odpočinek od školy a práce, noví přátelé, dovednosti, radost. Příklad tvého koníčku.", phrases:["Hobbies help people to…","For me,…"] },
    { q:"Do people have less time for hobbies than in the past?", outline:"Ano: práce, telefony zabírají volný čas. Ale možná víc možností (online kurzy, videa).", phrases:["I'd say…","The problem is that…"] },
    { q:"Is it better to have one hobby or to try lots of different things?", pa:"I think it's good to try lots of things when you're young, to find out what you really enjoy. Later you can choose one and get really good at it.", outline:"V mládí zkoušet, později jeden koníček do hloubky. Příklad.", phrases:["I agree with…","When you're young,…"] },
    { q:"Can a hobby become a good job?", outline:"Ano, někdy (fotograf, kuchař, tvůrce videí), ale přestane bavit, když je to povinnost.", phrases:["It's possible – for example,…","The risk is that…"] },
    { q:"Should hobbies for children be free?", outline:"Ideálně levné nebo zdarma, aby měly šanci všechny děti. Některé koníčky jsou drahé (lyžování, hudební nástroje).", phrases:["I think they should be cheap, because…","Some hobbies, like…, are cheap, whereas…"] }],
    model:"I think hobbies help people to relax and forget about their problems for a while. When I'm drawing, for example, I don't think about tests or homework at all. Hobbies are also a great way to meet people – I met some of my best friends at a drama club. And you learn skills that might be useful later. I think people without a hobby can find it harder to deal with stress, because they have nothing to help them switch off." },

  { id:"p4-15", p3:"p3-15", items:[
    { q:"Do you think it's possible to stay friends with someone for your whole life?", outline:"Ano, ale vzácné: lidé se stěhují a mění. Příklad: rodiče a jejich přátelé ze školy. Je potřeba se snažit.", phrases:["I think it's possible, but…","For example, my mum…"] },
    { q:"Is it easier to make friends at school or at work?", outline:"Škola: hodně času spolu, podobný věk. Práce: různý věk, méně volného času. Vlastní zkušenost.", phrases:["I'd say it's easier at…, because…","At work,…"] },
    { q:"Are online friends as important as friends you meet in person?", pa:"Not for me. Online friends are nice to chat with, but when you need help, you need someone who can actually be there with you.", outline:"Mohou být důležití (stejné zájmy), ale osobní kontakt je hlubší. Záleží na situaci.", phrases:["I agree with…, because…","Then again,…"] },
    { q:"Why do friendships sometimes end?", outline:"Stěhování, jiné zájmy, hádky, nedostatek času. Příklad.", phrases:["One reason is that…","Sometimes people just…"] },
    { q:"Do you think we usually choose friends who are similar to us?", outline:"Často ano – podobné zájmy a hodnoty. Ale rozdíly mohou přátelství obohatit.", phrases:["Usually, yes, because…","But sometimes…"] }],
    model:"I think it's possible, but it doesn't happen very often. People change a lot as they get older, and they move to different cities for university or work, so it's hard to stay close. My mum, for example, still has a friend from primary school, and they meet every month, but she lost touch with most of her other school friends. I think you need to make an effort – call, visit and remember birthdays – otherwise friendships slowly disappear." },

  { id:"p4-16", p3:"p3-16", items:[
    { q:"Why do you think people enjoy visiting new places?", outline:"Nové zážitky, odpočinek, kultura, jídlo, únik z rutiny, příběhy na doma. Příklad.", phrases:["I think people enjoy…","It's also a chance to…"] },
    { q:"Is it better to travel with a guide or on your own?", outline:"S průvodcem: informace, bezpečí. Sám: svoboda, levnější. Záleží na místě a člověku.", phrases:["It depends on…","With a guide,…, whereas…"] },
    { q:"What should tourists do to respect the places they visit?", pa:"They should learn a little about the local customs before they go, and maybe a few words of the language. And of course, they shouldn't leave rubbish everywhere.", outline:"Respekt k místním zvykům, vhodné oblečení, žádný nepořádek a hluk, pár slov místního jazyka.", phrases:["I agree with…, and also…","Tourists should…"] },
    { q:"What would you show a tourist in your town?", outline:"Konkrétní místa + proč: památka, vyhlídka, park, místní jídlo.", phrases:["I'd definitely take them to…","They should also try…"] },
    { q:"Do you think tourists see what a country is really like?", outline:"Většinou ne: vidí jen centra a památky. Lepší: mimo turistické trasy, s místními lidmi.", phrases:["Not really, because…","To see the real country,…"] }],
    model:"I think people enjoy the feeling of discovering something new. At home, every day is quite similar, but when you visit a new place, everything is different – the streets, the food, the language and even the way people behave. It's also a good way to relax, because you forget about your normal problems. And for many people it's about the stories – when you come home, you have lots of things to tell your friends and photos to remember the trip." },

  { id:"p4-17", p3:"p3-17", items:[
    { q:"Do you think students today are under more pressure than in the past?", outline:"Pravděpodobně ano: soutěž o univerzity, sociální sítě, očekávání rodičů. Ale dřív měli jiné problémy.", phrases:["I think they probably are, because…","However,…"] },
    { q:"Are exams the best way to find out what students know?", outline:"Ne úplně: stres, jeden špatný den. Alternativy: projekty, průběžné hodnocení. Ale zkoušky jsou objektivní.", phrases:["Not completely, because…","On the other hand,…"] },
    { q:"Should parents help their children with schoolwork?", pa:"I think parents can help a little, for example by checking homework. But if they do everything for their children, the children don't learn anything.", outline:"Podpora ano, dělat úkoly za děti ne. Ne všichni rodiče umějí pomoct. Příklad.", phrases:["I agree with…","The problem is that…"] },
    { q:"What can schools do to help students who feel stressed?", outline:"Školní psycholog, méně testů najednou, výuka relaxačních technik, rozumné množství úkolů.", phrases:["Schools could…","It would also help if…"] },
    { q:"Is a little stress sometimes a good thing?", outline:"Ano, trochu stresu motivuje (termín, zkouška). Dlouhodobý stres ale škodí. Příklad.", phrases:["I think a little stress can…","But too much…"] }],
    model:"I think they probably are. There's a lot of competition to get into good universities, so every exam feels really important. Social media also adds pressure, because everyone posts about their great results, and you start comparing yourself to them. And many parents expect a lot from their children. However, I think students in the past had different problems, like having to work to help their families, so I'm not sure our lives are really harder." },

  { id:"p4-18", p3:"p3-18", items:[
    { q:"Why do some people find it difficult to start at a new school or job?", outline:"Nikoho neznají, nová pravidla, strach z chyb, stud. Příklad z vlastní zkušenosti.", phrases:["I think the main reason is…","When I started…"] },
    { q:"Is it easier for children or adults to make friends in a new place?", outline:"Děti: otevřenější, hrají si. Dospělí: méně příležitostí, hodně práce. Ale dospělí mají víc zkušeností.", phrases:["I'd say it's easier for…, because…","Adults, on the other hand,…"] },
    { q:"Do you think it's a good idea for families to move to another country?", pa:"It can be a great experience, especially for children, because they learn a new language very quickly. But it's hard to leave grandparents and friends behind.", outline:"Výhody: jazyk, zkušenost, práce. Nevýhody: stesk, jiná kultura. Záleží na věku dětí.", phrases:["I agree with…, but…","It depends on…"] },
    { q:"What can people do to feel more confident in new situations?", outline:"Připravit se předem, ptát se, usmívat se, přijmout, že chyby jsou normální.", phrases:["One thing that helps is…","It's also important to…"] },
    { q:"Do you enjoy change, or do you prefer things to stay the same?", outline:"Osobní: názor + příklad + důvod.", phrases:["To be honest,…","For example,…"] }],
    model:"I think the main reason is that you don't know anyone, so you feel alone, especially on the first day. Everything is new – the building, the rules, the people – and you're afraid of making mistakes. When I started secondary school, I didn't know where my classroom was and I was too shy to ask anyone, so I was late for my first lesson. I think it's much easier if someone is friendly to you at the beginning." },

  { id:"p4-19", p3:"p3-19", items:[
    { q:"Why do you think people give money to charity?", outline:"Chtějí pomoct, dobrý pocit, osobní zkušenost (nemoc v rodině). Příklad.", phrases:["I think most people…","Some people also…"] },
    { q:"Should schools encourage students to do volunteer work?", outline:"Ano: učí empatii, zkušenost, hodí se do životopisu. Ale nemělo by to být povinné.", phrases:["I think it's a good idea because…","But I don't think it should be…"] },
    { q:"Is it better to give money or to give your time to help others?", pa:"I think giving time is more valuable, because you actually see the people you're helping. But for big problems, like building hospitals, money is necessary.", outline:"Čas: osobní kontakt, jde to i bez peněz. Peníze: velké projekty. Obojí je potřeba.", phrases:["I agree with…, but…","Both are…"] },
    { q:"Do famous people do enough to help others?", outline:"Někteří ano (nadace, sbírky), jiní jen kvůli reklamě. Mají velký vliv.", phrases:["Some of them do – for example,…","But others…"] },
    { q:"Who should help people in need – the government or charities?", outline:"Hlavně stát (zdravotnictví, sociální pomoc), charity doplňují a reagují rychle. Příklad.", phrases:["I think the government should…","Charities can…"] }],
    model:"I think most people simply want to help. When they see pictures of people in difficult situations, for example after a flood, they feel they have to do something. Some people also give money because a charity helped someone in their family – for example, a hospital charity. And I think it makes people feel good about themselves, which isn't a bad thing. Even a small amount of money can make a big difference if lots of people give it." },

  { id:"p4-20", p3:"p3-20", items:[
    { q:"Do you think advertising has too much influence on young people?", outline:"Ano: sociální sítě, influenceři, cílená reklama. Ale mladí jsou i kritičtí. Příklad.", phrases:["I think it does, especially…","On the other hand,…"] },
    { q:"Why do people buy things they don't really need?", outline:"Reklama, slevy, nuda, lepší nálada, tlak okolí. Příklad.", phrases:["One reason is that…","Sometimes people…"] },
    { q:"Is it important to buy things from local shops?", pa:"I think it is. Local shops are part of the community, and if everybody buys online, they'll close. But sometimes local shops are too expensive for students.", outline:"Ano: podpora místních, méně dopravy. Ale cena a výběr. Příklad: obchod ve tvé ulici.", phrases:["I agree with…","The problem is that…"] },
    { q:"Should famous people be paid to advertise products?", outline:"Je to jejich práce, ale měli by být upřímní; problém u nezdravých výrobků a reklamy pro děti.", phrases:["I don't see a problem with it as long as…","But it's not OK when…"] },
    { q:"How do you think people will shop in the future?", outline:"Víc online, doručování drony, ale možná víc second-hand a opravování kvůli přírodě.", phrases:["I think more people will…","Maybe we'll also…"] }],
    model:"I think it does, especially on social media. Young people spend hours online, and adverts are everywhere – sometimes you don't even realise that something is an advert, because an influencer is showing a product as if it's just part of their life. On the other hand, I think many young people are quite critical. They read reviews and compare prices before they buy something. So advertising is powerful, but we're not completely helpless." },

  { id:"p4-21", p3:"p3-21", items:[
    { q:"Do you think people use their cars too much?", outline:"Ano: krátké cesty autem, i když by šli pěšky nebo jeli MHD; zvyk. Ale na venkově je auto nutnost. Příklad.", phrases:["I think many people do, because…","But in the countryside…"] },
    { q:"Should city centres be closed to cars?", outline:"Výhody: čistší vzduch, bezpečí, klid. Nevýhody: obchody, lidé s handicapem, zásobování. Kompromis.", phrases:["It's a good idea in some ways, but…","A compromise might be…"] },
    { q:"Would you like to have your own car one day? Why or why not?", pa:"Yes, I think so. I live in a village, and the bus only goes three times a day, so a car would make my life much easier.", outline:"Osobní: ano/ne + důvod (kde bydlíš, peníze, příroda).", phrases:["I'd like to…, because…","Not really, because…"] },
    { q:"How can people be encouraged to use public transport more?", outline:"Levnější nebo zdarma, častější spoje, pohodlí, Wi-Fi, parkoviště na okraji města.", phrases:["The best way would be to…","It would also help if…"] },
    { q:"What do you think transport will be like in fifty years?", outline:"Elektrická a samořiditelná auta, rychlovlaky, méně aut ve městech. Spekuluj: will, might, could.", phrases:["I think we might…","There could be…"] }],
    model:"I think many people do, yes. In my town people drive to the shop even if it's only five minutes away on foot, and in the morning the streets are full of parents driving their children to school. It's often just a habit. But it depends on where you live. In the countryside, buses are rare, so people really need a car to get to work. In cities, though, there's good public transport, so people could use their cars much less." }
]
};
