/* C1 Advanced – Speaking (Paper 4). Original practice content, modelled on the real exam format.
   Pure data: window.DATA.speaking. UI texts in Czech, exam content in English. */
window.DATA = window.DATA || {};
window.DATA.speaking = {

/* ---------- examiner (interlocutor) & virtual partner ---------- */
cast: {
  examiner: "Helen Carter", assessor: "David Moss", partner: "Marta",
  examinerVoice: 0, partnerVoice: 1
},

/* Real-format interlocutor frame. {name} = learner, {partner} = virtual partner, {show}, {ask}, {q}, {central}, {decision}, {topic} filled at runtime. */
rubrics: {
  p1Intro: "Good morning. My name is {examiner} and this is my colleague, {assessor}. And your names are?",
  p1Marks: "Can I have your mark sheets, please? Thank you.",
  p1From: "Where are you from, {name}?",
  p1First: "First, we'd like to know something about you.",
  p1Thanks: "Thank you.",
  p2Intro: "In this part of the test, I'm going to give each of you three pictures. I'd like you to talk about two of them on your own for about a minute, and also to answer a question briefly about your partner's pictures.",
  p2YouFirst: "{name}, it's your turn first. Here are your pictures. They show {show}. I'd like you to compare two of the pictures, and say {ask}. All right?",
  p2PartnerTurn: "Now, {partner}, here are your pictures. They show {show}. I'd like you to compare two of the pictures, and say {ask}. All right?",
  p2Thanks: "Thank you.",
  p2AskPartner: "{partner}, {q}",
  p2AskYou: "{name}, {q}",
  p3Intro: "Now, I'd like you to talk about something together for about two minutes. Here are some {topic} and a question for you to discuss. First you have some time to look at the task.",
  p3Start: "Now, talk to each other about {central}",
  p3Decide: "Thank you. Now you have about a minute to decide {decision}",
  p3Thanks: "Thank you.",
  p4Intro: "Now I'd like to ask you some more questions related to the topic you have just discussed.",
  p4Prompts: ["What do you think?", "Do you agree?", "How about you?", "Why do you think that is?", "Can you give me an example?"],
  end: "Thank you. That is the end of the test."
},

/* real timings in seconds (paired exam: 15 minutes in total) */
timing: {
  p1Answer: 25, p1Total: 120,
  p2Long: 60, p2Short: 30,
  p3Look: 15, p3Discuss: 120, p3Decide: 60, p3Turn: 30,
  p4Think: 5, p4Answer: 50, p4Total: 240
},

/* ---------- assessment criteria (C1 Advanced scale 0–5; examiner can award half bands) ---------- */
criteria: [
  { id:"gv", name:"Grammar and Vocabulary", cz:"Gramatika a slovní zásoba",
    focus:"Rozsah a přesnost gramatiky i slovní zásoby, schopnost vyjádřit názor, spekulovat a mluvit abstraktně.",
    bands:[
      "0 – Výkon pod úrovní B2; téměř žádný souvislý projev.",
      "1 – Jednoduché struktury, opakující se slovní zásoba; chyby často brání porozumění.",
      "2 – Většinou jednoduché struktury s občasnými složitějšími; slovní zásoba stačí na běžná témata.",
      "3 – Dobrá kontrola jednoduchých i některých složitých struktur; vhodná slovní zásoba k názorům i ke známým tématům (úroveň B2+).",
      "4 – Široký rozsah: podmínky, trpný rod, modální slovesa spekulace; kolokace a frázová slovesa; chyby jen drobné.",
      "5 – Pružná a přesná práce se složitými strukturami a idiomatickou slovní zásobou i u abstraktních témat; chyby skoro nepostřehnutelné."
    ]},
  { id:"dm", name:"Discourse Management", cz:"Stavba projevu",
    focus:"Délka a souvislost odpovědí, logická stavba, propojovací výrazy, relevance, minimum váhání.",
    bands:[
      "0 – Projev se nedá sledovat.",
      "1 – Velmi krátké odpovědi, časté pauzy, chybí spojovací výrazy.",
      "2 – Odpovědi přiměřeně dlouhé, ale místy nesouvislé nebo opakující se.",
      "3 – Rozvinuté odpovědi se základními spojovacími výrazy; občasné váhání nebo odbočení.",
      "4 – Delší souvislé úseky, jasná struktura (názor – důvod – příklad), pestré konektory, minimum váhání.",
      "5 – Plynulé, dobře organizované a relevantní dlouhé úseky; přirozeně odstupňované argumenty a shrnutí."
    ]},
  { id:"pr", name:"Pronunciation", cz:"Výslovnost",
    focus:"Srozumitelnost, slovní i větný přízvuk, intonace, vázání slov, jednotlivé hlásky.",
    bands:[
      "0 – Většině projevu nelze rozumět.",
      "1 – Srozumitelnost často narušena; přízvuk a intonace převážně z češtiny.",
      "2 – Obecně srozumitelné, ale intonace plochá a přízvuky často na první slabice.",
      "3 – Srozumitelné; intonace a přízvuk většinou správně, občasné chyby v hláskách (th, w/v, -ed).",
      "4 – Snadno srozumitelné; větný přízvuk zdůrazňuje důležité informace, slova se plynule vážou.",
      "5 – Výborná srozumitelnost; intonace jemně vyjadřuje postoj, přízvuk i vázání jsou přirozené. Přízvuk mateřštiny nevadí, pokud nebrání porozumění."
    ]},
  { id:"ic", name:"Interactive Communication", cz:"Interakce",
    focus:"Zahájení a udržení rozhovoru, reakce na partnera, vyjednávání a směřování k závěru.",
    bands:[
      "0 – Žádná interakce.",
      "1 – Reaguje jen minimálně, nepřebírá iniciativu.",
      "2 – Reaguje přiměřeně, ale málo rozvíjí partnerovy myšlenky; občas potřebuje pomoc zkoušejícího.",
      "3 – Zahajuje i reaguje, udržuje rozhovor, občas dominuje nebo naopak čeká.",
      "4 – Aktivně zapojuje partnera, navazuje na jeho myšlenky, vyjednává a směřuje k výsledku.",
      "5 – Přirozeně řídí rozhovor, citlivě střídá role, rozvíjí a propojuje myšlenky obou a dovede je k rozhodnutí."
    ]}
],

/* ---------- lessons (Czech) ---------- */
overview: [
  { part:1, name:"Part 1 – Interview", time:"2 min", what:"Zkoušející se ptá každého kandidáta zvlášť na osobní témata (domov, studium, plány, názory). Odpověď 2–4 věty (cca 20–30 s).", tip:"Odpověz přímo, pak rozveď: důvod + konkrétní detail. Nevyprávěj naučené monology." },
  { part:2, name:"Part 2 – Long turn", time:"4 min (1 min + 30 s pro každého)", what:"Dostaneš tři fotky a dvě otázky. Porovnáš DVĚ z nich a odpovíš na obě otázky – mluvíš sám asi 1 minutu. Pak krátce (cca 30 s) odpovíš na otázku k fotkám partnera.", tip:"Neposuzuj fotky jednotlivě – porovnávej (whereas, while, both…). Spekuluj (might, could, it looks as if…). Odpověz na obě otázky." },
  { part:3, name:"Part 3 – Collaborative task", time:"4 min (15 s přípravy, 2 min diskuse, 1 min rozhodnutí)", what:"Ústřední otázka a pět podnětů v myšlenkové mapě. Diskutujete spolu 2 minuty, pak máte 1 minutu na rozhodnutí (např. který podnět je nejdůležitější).", tip:"Nejde o shodu, ale o kvalitu interakce: zvi partnera, reaguj na něj, rozvíjej jeho nápady, vyjednávej. Nemusíte probrat všech pět podnětů." },
  { part:4, name:"Part 4 – Discussion", time:"5 min", what:"Zkoušející klade abstraktnější otázky navazující na téma Part 3; odpovídáte jednotlivě i společně.", tip:"Stavba odpovědi: názor → důvod → příklad → protiargument/omezení. Reaguj i na partnerovu odpověď." }
],

lessons: [
  { id:"reward", title:"Co zkoušející odměňuje",
    points:[
      "Rozvinuté odpovědi: na otázku v Part 1 nestačí „Yes, I do.“ Přidej důvod, příklad, vlastní zkušenost (2–4 věty).",
      "Přirozený projev, ne naučené monology. Zkoušející poznají memorovaný text (jiná intonace, neodpovídá přesně na otázku) a hodnotí ho níž.",
      "Opisování (paraphrase): když nevíš slovo, popiš ho – „the thing you use to…“, „a kind of…“, „what I mean is…“. Zkoušející to oceňuje víc než ticho.",
      "Výplňová slova místo ticha: „Well…“, „Let me think…“, „That's an interesting question…“, „How can I put it?“ – max. jednou na odpověď.",
      "Spekulace a nuance: might/could/must have, „I'd imagine…“, „It's hard to say, but…“ – to je úroveň C1.",
      "Interakce: v Part 3 a 4 se ptej partnera, navazuj na jeho myšlenky („Building on what you said…“), nediktuj.",
      "Hodnotí se celý výkon, ne „správná“ odpověď. Názor může být jakýkoli, pokud je dobře podložený.",
      "Hodnotí dva lidé: assessor (tichý) dává GV, DM, Pron, IC; interlocutor (ten, kdo mluví) dává celkový dojem (Global Achievement)."
    ]},
  { id:"pron", title:"Výslovnost: přízvuk, intonace, vázání",
    points:[
      "Slovní přízvuk: čeština má přízvuk na první slabice, angličtina ne! deVElopment, phoTOgraphy, eCOnomy, enVIronment, deTERmine, comFORtable (COMF-ta-ble).",
      "Větný přízvuk: zdůrazni nosná slova a novou informaci – „I DON'T think it's the BEST option.“ Funkční slova (a, the, of, to, can) oslabuj na /ə/.",
      "Intonace: na konci otázky ano/ne stoupá, u wh-otázek a oznamovacích vět klesá. Plochá „česká“ intonace působí znuděně.",
      "Vázání slov (linking): „an_apple“, „turn_off“, „it_is“ – nevkládej ráz (rázovou pauzu) před samohláskou jako v češtině.",
      "Neznělé koncovky: angličtina rozlišuje „bag/back“, „eyes/ice“ – Češi znělost na konci ztrácejí. Prodluž samohlásku před znělou souhláskou.",
      "Hlásky: th /θ ð/ (ne f, d, s), w vs. v (west ≠ vest), krátké /æ/ (bad ≠ bed), koncovka -ed (worked /t/, played /d/, wanted /ɪd/).",
      "Nepřehánět rychlost: srozumitelnost > tempo. Krátké pauzy mezi myšlenkovými celky pomáhají."
    ]},
  { id:"pitfalls", title:"Typické chyby českých mluvčích",
    points:[
      "„I agree“ ne „I am agree“. „It depends on“ ne „It depends of“.",
      "„Discuss something“ bez „about“; „explain something to someone“ ne „explain me“.",
      "„Make a photo“ → take a photo; „make a decision“ (ne do); „do sport“ ale „play football“.",
      "Chybějící členy: „The pictures show people…“, „In the first picture…“; nepočitatelná slova: advice, information, equipment, furniture (bez -s).",
      "„Actual/actually“ = vlastně/ve skutečnosti, ne aktuální (current). „Eventually“ = nakonec, ne eventuálně (possibly).",
      "„Since 3 years“ → for three years; „I live here for…“ → I've lived here for…",
      "Doslovné překlady: „It's not my cup of tea“ OK, ale „I have 20 years“ → I'm 20.",
      "Monotónní „and… and… and…“ – střídej konektory: what's more, on top of that, whereas, that said.",
      "Příliš krátké odpovědi z ostychu – a naopak skákání partnerovi do řeči v Part 3.",
      "V Part 2 popis jednotlivých fotek („In this picture there is…“) místo porovnání a odpovědi na otázky."
    ]},
  { id:"strategy", title:"Strategie pro jednotlivé části",
    points:[
      "Part 1: odpověz → důvod → detail. Ukaž rozsah (např. podmínky: „If I had more time, I'd…“).",
      "Part 2: vyber dvě fotky rychle, začni porovnáním („Both pictures show…, but whereas…“), pak odpověz na obě otázky, poslední větou shrň nebo uveď osobní pohled. Hlídej čas – 1 minuta je krátká.",
      "Part 2 (odpověď k partnerovi): cca 30 s, jasný názor + důvod, nemusíš porovnávat.",
      "Part 3: začni pozvánkou („Shall we start with…?“), u každého podnětu 2–3 výměny, propojuj podněty, nespěchej. Ve fázi rozhodnutí vyjednávej a shrň („So we've agreed that…“). Rozhodnutí nemusí padnout.",
      "Part 4: odpovídej delšími úseky než v Part 1, používej abstraktní slovní zásobu a vyvážené názory („On the one hand… on the other…“).",
      "Když nerozumíš: „Sorry, could you repeat the question, please?“ – to se nepenalizuje (jednou)."
    ]},
  { id:"paraphrase", title:"Když chybí slovo: opisování",
    points:[
      "„It's a kind of… / a sort of…“ – It's a kind of tool for cutting wood.",
      "„It's something you use to… / for -ing“ – something you use for keeping food cold.",
      "„The person who…“ – the person who looks after the building.",
      "„It's like a… but…“ – It's like a café, but you can also borrow books there.",
      "„What's the word… / I can't think of the word, but…“ – přiznej to a pokračuj.",
      "„In other words… / What I mean is…“ – oprav se elegantně.",
      "Použij obecnější slovo: equipment, stuff, device, place, activity."
    ]}
],

/* ---------- functional chunks: [phrase, example sentence] ---------- */
chunks: {
  p1: [
    ["To be honest, …", "To be honest, I'm not much of a morning person."],
    ["I'd say that …", "I'd say that my hometown has changed a lot recently."],
    ["As far as I'm concerned, …", "As far as I'm concerned, weekends are for switching off."],
    ["It depends on …", "It depends on how much free time I have that week."],
    ["I'm really into …", "I'm really into photography at the moment."],
    ["I'm not a big fan of …", "I'm not a big fan of crowded places."],
    ["I tend to …", "I tend to read on my phone rather than buy books."],
    ["More often than not, …", "More often than not, I end up cooking for the whole family."],
    ["Every now and then …", "Every now and then I treat myself to a meal out."],
    ["Whenever I get the chance, …", "Whenever I get the chance, I go hiking in the mountains."],
    ["I've been … -ing for …", "I've been learning the guitar for about three years."],
    ["I used to … but now …", "I used to hate vegetables, but now I can't get enough of them."],
    ["I'm hoping to …", "I'm hoping to do a master's degree abroad."],
    ["If all goes well, …", "If all goes well, I'll start my first job next autumn."],
    ["I've always wanted to …", "I've always wanted to visit Japan."],
    ["Ideally, I'd like to …", "Ideally, I'd like to work for an international company."],
    ["What I like most about … is …", "What I like most about my job is the variety."],
    ["The thing is, …", "The thing is, I don't really have time for hobbies."],
    ["Actually, …", "Actually, I've just moved to a new flat."],
    ["Mind you, …", "Mind you, the rent is quite high."],
    ["It's not really my cup of tea.", "Opera isn't really my cup of tea."],
    ["I can't stand …", "I can't stand waiting in queues."],
    ["I'm quite keen on …", "I'm quite keen on trying new recipes."],
    ["It's a great way to …", "Running is a great way to clear my head."],
    ["It helps me to unwind.", "Listening to music helps me to unwind after work."],
    ["I'd rather … than …", "I'd rather stay in than go to a noisy club."],
    ["If I had more time, I'd …", "If I had more time, I'd volunteer at the animal shelter."],
    ["Looking back, …", "Looking back, I wish I'd started learning languages earlier."],
    ["As a child, I would …", "As a child, I would spend hours drawing comics."],
    ["These days, …", "These days, I mostly communicate by message."],
    ["It's hard to say, but …", "It's hard to say, but probably my grandmother had the biggest influence on me."],
    ["Off the top of my head, …", "Off the top of my head, I'd say about five times a week."],
    ["Let me think …", "Let me think… yes, it was probably last summer."],
    ["That's an interesting question.", "That's an interesting question – I've never really thought about it."],
    ["Not as much as I'd like to.", "Do I read a lot? Not as much as I'd like to."],
    ["It makes a real difference.", "Having a good boss makes a real difference."],
    ["I find it … to …", "I find it relaxing to cook in the evening."],
    ["One thing I'd change is …", "One thing I'd change about my town is the public transport."],
    ["For one thing, … For another, …", "For one thing, it's cheap. For another, it's really close to home."],
    ["It's something I'd recommend to anyone.", "Learning to swim is something I'd recommend to anyone."],
    ["I'm the kind of person who …", "I'm the kind of person who plans everything in advance."],
    ["I'm torn between … and …", "I'm torn between studying law and studying medicine."]
  ],
  p2: [
    ["Both pictures show …", "Both pictures show people who are concentrating hard."],
    ["In the first picture … whereas in the second …", "In the first picture they're outdoors, whereas in the second they're in a cramped office."],
    ["One obvious difference is that …", "One obvious difference is that the people in this picture seem to be on their own."],
    ["The main similarity is that …", "The main similarity is that everyone is waiting for something."],
    ["Unlike the people in …, …", "Unlike the people in the kitchen, the climbers are facing real danger."],
    ["…, while …", "The children look excited, while the adults seem a bit anxious."],
    ["Compared to …, …", "Compared to the market, the supermarket looks rather impersonal."],
    ["The situation is quite different in …", "The situation is quite different in the third picture."],
    ["It looks as if …", "It looks as if they've been working on this for hours."],
    ["They might be … -ing", "They might be preparing for an important exam."],
    ["They could well be …", "They could well be celebrating a family anniversary."],
    ["They must be feeling …", "They must be feeling exhausted after such a long climb."],
    ["They can't be …", "They can't be enjoying the weather very much."],
    ["Judging by their expressions, …", "Judging by their expressions, they're rather nervous."],
    ["I'd imagine that …", "I'd imagine that the man is a bit frustrated."],
    ["Presumably, …", "Presumably, they've done this many times before."],
    ["I get the impression that …", "I get the impression that the atmosphere is quite tense."],
    ["It's hard to tell, but …", "It's hard to tell, but she might be a teacher."],
    ["My guess would be that …", "My guess would be that this is their first performance."],
    ["Perhaps the reason is that …", "Perhaps the reason is that they couldn't find anyone else to help."],
    ["The most likely explanation is …", "The most likely explanation is that the train has been delayed."],
    ["They seem to be …", "They seem to be thoroughly enjoying themselves."],
    ["…, which suggests that …", "There are lots of empty cups, which suggests that the meeting has gone on for a while."],
    ["This picture conveys a sense of …", "This picture conveys a sense of calm."],
    ["In this case, … ; in the other one, …", "In this case it's a necessity; in the other one it's purely for fun."],
    ["On the other hand, …", "On the other hand, the woman in the café looks completely relaxed."],
    ["Moving on to the question of …", "Moving on to the question of how they might be feeling…"],
    ["As for why …", "As for why they're doing it, I suppose it's for charity."],
    ["When it comes to …", "When it comes to the risks, the climbers are clearly in more danger."],
    ["Another thing worth mentioning is …", "Another thing worth mentioning is the age of the participants."],
    ["I'd say the people in … are more likely to …", "I'd say the people in the library are more likely to remember what they've learnt."],
    ["Overall, …", "Overall, I think the family picnic looks the most relaxing."],
    ["All in all, …", "All in all, both situations demand a lot of patience."],
    ["If I had to choose, …", "If I had to choose, I'd go for the second picture."],
    ["I'll compare these two pictures.", "I'll compare the picture of the market and the one of the online shop."],
    ["The setting seems to be …", "The setting seems to be some kind of community centre."],
    ["In the foreground / in the background …", "In the background you can see a crowd of spectators."],
    ["They appear to be …", "They appear to be in the middle of an argument."],
    ["…, probably because …", "She looks relieved, probably because she's finally finished."],
    ["It's likely to be a … experience.", "It's likely to be a nerve-racking experience."],
    ["(Answering partner's question) I think the … would …", "I think the people at the concert would remember the day longest."],
    ["(Answering partner's question) For me, it'd have to be …", "For me, it'd have to be the picture of the volunteers."]
  ],
  p3: [
    ["Shall we start with …?", "Shall we start with the idea of flexible working hours?"],
    ["Would you like to begin?", "Would you like to begin, or shall I?"],
    ["Let's begin by looking at …", "Let's begin by looking at the cost."],
    ["What do you think about …?", "What do you think about online courses?"],
    ["How do you feel about …?", "How do you feel about banning cars from the centre?"],
    ["What's your take on …?", "What's your take on advertising aimed at children?"],
    ["Do you see what I mean?", "It's not just about money – do you see what I mean?"],
    ["I couldn't agree more.", "I couldn't agree more – it's absolutely vital."],
    ["That's a good point.", "That's a good point, I hadn't thought of that."],
    ["Exactly, and on top of that …", "Exactly, and on top of that it saves time."],
    ["You're absolutely right.", "You're absolutely right, especially for older people."],
    ["I see what you mean, but …", "I see what you mean, but isn't it rather expensive?"],
    ["I'm not so sure about that.", "I'm not so sure about that – it might not work in a small town."],
    ["That's true to some extent, but …", "That's true to some extent, but it depends on the person."],
    ["I take your point, however …", "I take your point; however, not everyone can afford it."],
    ["Wouldn't you say that …?", "Wouldn't you say that schools have a bigger role to play?"],
    ["Don't you think that …?", "Don't you think that people are tired of campaigns?"],
    ["Building on what you said, …", "Building on what you said, it could also help local businesses."],
    ["That links to …", "That links to the next point about education."],
    ["Going back to …", "Going back to what you said about money…"],
    ["Let's move on to …", "Let's move on to the idea of volunteering."],
    ["What about this one?", "What about this one – sharing transport?"],
    ["We haven't talked about … yet.", "We haven't talked about the environmental side yet."],
    ["Sorry, I interrupted you. Go on.", "Sorry, I interrupted you. Go on."],
    ["Sorry to interrupt, but …", "Sorry to interrupt, but I think that's crucial."],
    ["What I'm trying to say is …", "What I'm trying to say is that it isn't realistic."],
    ["Let's think about it from … point of view.", "Let's think about it from a parent's point of view."],
    ["The way I see it, …", "The way I see it, cost is the biggest barrier."],
    ["It all comes down to …", "It all comes down to how much time people have."],
    ["So, which one shall we choose?", "So, which one shall we choose as the most effective?"],
    ["I'd go for … because …", "I'd go for public campaigns because they reach everyone."],
    ["How about … as a compromise?", "How about choosing education as a compromise?"],
    ["Could we agree on …?", "Could we agree on the first two, then?"],
    ["I'd be happy to go with that.", "I'd be happy to go with that."],
    ["I'm still not entirely convinced.", "I'm still not entirely convinced it's the best option."],
    ["If we had to narrow it down, …", "If we had to narrow it down, I'd keep the financial one."],
    ["So, to sum up, …", "So, to sum up, we think teachers matter most."],
    ["So we've agreed that …", "So we've agreed that technology is the least important."],
    ["It seems we agree to disagree.", "It seems we agree to disagree on this one."],
    ["Let's leave it at that.", "Let's leave it at that, then."],
    ["Have we got time to …?", "Have we got time to look at the last one?"],
    ["Anyway, the point is …", "Anyway, the point is that it has to be affordable."],
    ["I'd rank … above …", "I'd rank health above career, to be honest."]
  ],
  p4: [
    ["On the one hand, … On the other hand, …", "On the one hand, it's convenient. On the other hand, it can be isolating."],
    ["There's no denying that …", "There's no denying that technology has changed how we work."],
    ["It's widely believed that …, but …", "It's widely believed that young people read less, but I'm not sure that's true."],
    ["In my experience, …", "In my experience, people are more generous than we think."],
    ["A good example of this is …", "A good example of this is the way cities are investing in cycle lanes."],
    ["Take … for example.", "Take my grandparents, for example."],
    ["This is particularly true of …", "This is particularly true of people living in big cities."],
    ["That's not to say that …", "That's not to say that it's always a bad thing."],
    ["Having said that, …", "Having said that, there are clear benefits too."],
    ["Admittedly, …", "Admittedly, it's not a perfect solution."],
    ["It could be argued that …", "It could be argued that governments should step in."],
    ["I'd go so far as to say …", "I'd go so far as to say it's the biggest challenge of our time."],
    ["I'm inclined to think that …", "I'm inclined to think that change is inevitable."],
    ["To a certain extent, …", "To a certain extent, it's a question of upbringing."],
    ["It's a double-edged sword.", "Social media is a double-edged sword."],
    ["The key issue here is …", "The key issue here is who pays for it."],
    ["One of the main reasons is …", "One of the main reasons is the cost of living."],
    ["This, in turn, leads to …", "This, in turn, leads to more stress."],
    ["As a result, …", "As a result, many people move abroad."],
    ["It's a matter of …", "It's a matter of priorities, really."],
    ["Whether … or not depends on …", "Whether it works or not depends on the individual."],
    ["In the long run, …", "In the long run, it would save money."],
    ["In the short term, …", "In the short term, people might resist the change."],
    ["Generally speaking, …", "Generally speaking, older people are more cautious."],
    ["By and large, …", "By and large, I think it's been a positive development."],
    ["It's not so much … as …", "It's not so much a question of money as of time."],
    ["What worries me is …", "What worries me is the lack of privacy."],
    ["I've never really thought about it, but …", "I've never really thought about it, but I suppose it matters."],
    ["That's a tricky one.", "That's a tricky one – there are arguments on both sides."],
    ["I'd agree with … up to a point.", "I'd agree with Marta up to a point."],
    ["I'd like to add that …", "I'd like to add that schools have a role too."],
    ["As … mentioned, …", "As Marta mentioned, it's partly about education."],
    ["Coming back to your point, …", "Coming back to your point, I think cost is key."],
    ["Would you agree?", "It's a generational thing. Would you agree?"],
    ["It's likely that in the future …", "It's likely that in the future most work will be remote."],
    ["I can't see … happening any time soon.", "I can't see that happening any time soon."],
    ["There's bound to be …", "There's bound to be some resistance at first."],
    ["The flip side is that …", "The flip side is that people lose touch with each other."],
    ["It goes without saying that …", "It goes without saying that safety comes first."],
    ["Ultimately, …", "Ultimately, it's up to each individual."],
    ["All things considered, …", "All things considered, I'd say the benefits outweigh the drawbacks."],
    ["To put it another way, …", "To put it another way, we need balance."]
  ]
},

/* answer builder for Part 4 (and long Part 1 answers) */
builder: [
  { step:"Názor", en:"Opinion", starters:["I'm inclined to think that…","As far as I'm concerned,…","I'd say that, by and large,…"] },
  { step:"Důvod", en:"Reason", starters:["The main reason is that…","This is mainly because…","What I mean is that…"] },
  { step:"Příklad", en:"Example", starters:["Take … for example.","In my experience,…","A good example of this is…"] },
  { step:"Protiargument", en:"Counterpoint", starters:["Having said that,…","That's not to say that…","Admittedly, …, but…"] }
],

/* Part 3 coach panel: phrase bank by function */
coach: [
  { key:"invite", cz:"Zapojit partnera", items:["What do you think?","How do you feel about…?","Would you agree?","What's your take on…?","Shall we start with…?"] },
  { key:"agree", cz:"Souhlasit a rozvíjet", items:["I couldn't agree more.","That's a good point, and…","Exactly – and building on that…","You're absolutely right, especially…"] },
  { key:"disagree", cz:"Zdvořile nesouhlasit", items:["I see what you mean, but…","I'm not so sure about that.","That's true to some extent, but…","I take your point; however…"] },
  { key:"negotiate", cz:"Vyjednávat", items:["How about… as a compromise?","Could we agree on…?","If we had to narrow it down…","I'd be happy to go with that."] },
  { key:"summarise", cz:"Shrnout", items:["So, to sum up…","So far we've said that…","Going back to what you said…","Let's move on to…"] },
  { key:"decide", cz:"Rozhodnout", items:["So, which one shall we choose?","I'd go for… because…","So we've agreed that…","It seems we agree to disagree."] }
],

/* short partner fillers used when the learner passes the turn and set lines have run out */
partnerGeneric: [
  "Hmm, I see what you mean. What else do you think?",
  "That's a fair point. Shall we look at another one?",
  "I hadn't thought of it like that. Go on.",
  "Yes, I'd agree with that, to some extent.",
  "Interesting. Which one do you think matters most, then?"
],

/* ---------- PART 1: interview question groups. model = sample high-band answer to questions[0] ---------- */
p1: [
  { id:"p1-01", theme:"Home and family", cz:"Domov a rodina", questions:[
    "Who are you closest to in your family, and why?",
    "What do you enjoy doing together as a family?",
    "In what ways are you similar to or different from your parents?",
    "Would you prefer to live in a house or a flat in the future? Why?"],
    model:"I'd say I'm closest to my older sister. There's only a two-year age gap between us, so we grew up doing pretty much everything together, and even now that she's moved to another city we talk almost every day. What I appreciate most is that she's brutally honest with me – if I'm about to make a bad decision, she'll tell me straight away." },
  { id:"p1-02", theme:"Free time", cz:"Volný čas", questions:[
    "How do you usually spend your free time?",
    "Is there a hobby you'd like to take up in the future?",
    "Do you prefer spending your free time alone or with other people?",
    "Do you think people have less free time now than in the past?"],
    model:"Well, it depends on the time of year. In summer I spend as much time outdoors as I can – cycling, mostly, or swimming in the lake near our town. In winter I tend to stay in more, so I read or play board games with friends. To be honest, I'm also guilty of losing whole evenings to series, which isn't something I'm particularly proud of!" },
  { id:"p1-03", theme:"Work and study", cz:"Práce a studium", questions:[
    "What do you enjoy most about your work or studies?",
    "What's the most useful thing you've learnt in the last year?",
    "Do you prefer studying in the morning or in the evening?",
    "What job would you like to be doing in ten years' time?"],
    model:"What I enjoy most about my studies is probably the practical side. I'm doing engineering, and although the theory can be quite dry, the lab sessions where we actually build and test things are fascinating. There's something really satisfying about seeing an idea work in real life – or, just as often, figuring out why it doesn't." },
  { id:"p1-04", theme:"Technology", cz:"Technologie", questions:[
    "How much do you rely on your phone in everyday life?",
    "Is there any piece of technology you couldn't live without?",
    "Do you think you spend too much time online?",
    "How has technology changed the way you study or work?"],
    model:"Far more than I'd like to admit! I use it for everything – banking, navigation, messaging, even my bus tickets. A few months ago I left it at home by mistake and it was a real eye-opener: I couldn't pay for my lunch and I had no idea what time my next lesson started. Since then I've been trying to be a bit less dependent on it." },
  { id:"p1-05", theme:"Travel", cz:"Cestování", questions:[
    "What's the most memorable place you've ever visited?",
    "Do you prefer travelling independently or on organised tours?",
    "Where would you like to go next, and why?",
    "What do you find most tiring about travelling?"],
    model:"The most memorable place I've been to is probably Lisbon. I went there with two friends a couple of years ago, and what struck me was the light – everything seemed to glow in the late afternoon. We spent most of our time just wandering around the old districts, getting lost in narrow streets and stopping for coffee, which is exactly my idea of a perfect trip." },
  { id:"p1-06", theme:"Food and cooking", cz:"Jídlo a vaření", questions:[
    "Do you enjoy cooking? Why or why not?",
    "Is there a dish from your country you'd recommend to visitors?",
    "How have your eating habits changed over the years?",
    "Do you prefer eating at home or eating out?"],
    model:"I do, actually, although I only really got into it during my first year at university, when I realised I couldn't survive on pasta forever. Now I find it quite relaxing – after a long day, chopping vegetables and listening to a podcast helps me switch off. I'm not very adventurous, though; I tend to stick to recipes I know will work." },
  { id:"p1-07", theme:"Future plans", cz:"Plány do budoucna", questions:[
    "What are your plans for the next few years?",
    "Would you consider living abroad at some point?",
    "Is there anything you'd like to achieve before you're thirty?",
    "Do you usually plan things carefully or go with the flow?"],
    model:"If all goes well, I'll finish my degree next summer and then, ideally, I'd like to get some work experience abroad – possibly in Germany or the Netherlands, since my field is quite strong there. Further down the line I'm hoping to come back and maybe set up something of my own, but I'm trying not to plan too far ahead because things change so quickly." },
  { id:"p1-08", theme:"Learning", cz:"Učení", questions:[
    "What's the best way for you to learn something new?",
    "Is there a skill you've tried to learn but given up on?",
    "Who was the best teacher you've ever had, and why?",
    "Do you think it's easier to learn things as a child or as an adult?"],
    model:"For me, it's definitely learning by doing. I can read instructions for hours and nothing sinks in, but as soon as I actually try something and make a few mistakes, it starts to make sense. When I was learning to code, for instance, I only really understood loops once I'd written a program that got stuck in one and froze my laptop!" },
  { id:"p1-09", theme:"Friends", cz:"Přátelé", questions:[
    "What qualities do you value most in a friend?",
    "How do you usually keep in touch with your friends?",
    "Have you ever made a friend in an unusual way?",
    "Do you think friendships change as people get older?"],
    model:"Loyalty, first and foremost, and a sense of humour. I think a good friend is someone who'll stand by you when things go wrong, but who can also make you laugh about it afterwards. I've got a friend from primary school who's exactly like that – we don't see each other very often any more, but whenever we meet, it's as if no time has passed." },
  { id:"p1-10", theme:"Health and fitness", cz:"Zdraví a kondice", questions:[
    "What do you do to stay healthy?",
    "Do you find it easy to stay motivated to exercise?",
    "Is there anything about your lifestyle you'd like to change?",
    "How important is sleep to you?"],
    model:"I try to walk or cycle wherever I can rather than taking the bus, and I go to a yoga class once a week, which does wonders for my back. Food-wise, I'm reasonably sensible, although I do have a weakness for chocolate. I'd say the area where I really need to improve is sleep – I'm terrible at going to bed at a reasonable hour." },
  { id:"p1-11", theme:"Your hometown", cz:"Rodné město", questions:[
    "What do you like most about the place where you live?",
    "How has your town changed since you were a child?",
    "What would you show a visitor to your town?",
    "Would you like to live in the same place all your life?"],
    model:"What I like most is that it's small enough to feel friendly but big enough to have most things you need. You can walk from one end to the other in about twenty minutes, and you're bound to bump into someone you know on the way. The downside is that there isn't much nightlife, so at weekends a lot of young people head off to the city." },
  { id:"p1-12", theme:"Music", cz:"Hudba", questions:[
    "What kind of music do you listen to most?",
    "Have you ever learnt to play a musical instrument?",
    "Do you prefer listening to live music or recorded music?",
    "Is there a song that brings back special memories for you?"],
    model:"It really depends on my mood. When I'm working, I listen to instrumental stuff – film soundtracks or piano music – because lyrics distract me. When I'm with friends or doing sport, I'd go for something more upbeat, like indie rock. I've noticed my taste has become much broader since I started using streaming services and their recommendations." },
  { id:"p1-13", theme:"Reading", cz:"Čtení", questions:[
    "What kinds of things do you enjoy reading?",
    "Do you prefer printed books or e-books?",
    "Is there a book that has had a big influence on you?",
    "Did you read much when you were a child?"],
    model:"I read quite a lot of non-fiction, especially books about history and psychology. I like the feeling of learning something while I'm relaxing. That said, when I'm on holiday I switch to crime novels – the kind of book you can't put down. Unfortunately, these days most of my reading happens on my phone, in short bursts on the train." },
  { id:"p1-14", theme:"Sport", cz:"Sport", questions:[
    "Do you prefer watching sport or doing it yourself?",
    "Was sport an important part of your school life?",
    "Is there a sport you've always wanted to try?",
    "Why do you think some people don't enjoy sport?"],
    model:"Definitely doing it. I find watching sport on TV a bit dull unless it's a really big event. I play volleyball twice a week with a local team, and for me the social side is just as important as the exercise – we usually go for something to eat after training, and some of my closest friends are people I met through the team." },
  { id:"p1-15", theme:"Holidays", cz:"Dovolená", questions:[
    "What kind of holiday do you find most relaxing?",
    "Do you prefer holidays in your own country or abroad?",
    "Who do you usually go on holiday with?",
    "Tell us about a holiday that didn't go according to plan."],
    model:"For me, the most relaxing holidays are the ones with no fixed schedule. A cottage in the countryside, a pile of books, and maybe a bike to explore the area – that's my ideal. I've tried those city breaks where you rush from one museum to the next, and although they're interesting, I usually come back more exhausted than when I left." },
  { id:"p1-16", theme:"Shopping", cz:"Nakupování", questions:[
    "Do you enjoy shopping, or is it a chore for you?",
    "Do you buy more things online or in shops?",
    "What was the last thing you bought that you were really pleased with?",
    "Do you think people buy too many things nowadays?"],
    model:"It depends what I'm shopping for. Food shopping is a chore – I just want to get it over with as quickly as possible. But I quite enjoy browsing in second-hand shops and markets, because you never know what you'll find. Last month I picked up a beautiful old record player for next to nothing, which made my week." },
  { id:"p1-17", theme:"Weather and seasons", cz:"Počasí a roční období", questions:[
    "What's your favourite season, and why?",
    "Does the weather affect your mood?",
    "What do you usually do when the weather is bad?",
    "Would you like to live in a country with a very different climate?"],
    model:"I'd have to say autumn. I love that crisp feeling in the air in the mornings, and the colours of the trees in the park near my flat are stunning in October. It's also the season when life seems to get back to normal after the summer, which I actually quite like – I'm more productive when I've got a routine." },
  { id:"p1-18", theme:"News and media", cz:"Zprávy a média", questions:[
    "How do you usually find out about the news?",
    "Do you think it's important to keep up with current events?",
    "Do you trust the news you read online?",
    "What kind of stories do you find most interesting?"],
    model:"Mostly through news apps on my phone, and occasionally I listen to a podcast that summarises the day's main stories while I'm cooking. I try to check more than one source, because different outlets can present the same event in very different ways. I'm not a big fan of getting news from social media, as it's often hard to tell what's reliable." },
  { id:"p1-19", theme:"Languages", cz:"Jazyky", questions:[
    "Why are you learning English?",
    "What do you find most difficult about learning a language?",
    "Would you like to learn another language in the future?",
    "Have you ever had a funny misunderstanding in a foreign language?"],
    model:"Partly for my career – most of the research in my field is published in English – but also because it opens so many doors when I travel. I'd say the hardest part for me is speaking spontaneously. I can understand quite a lot, but when I have to respond quickly, I sometimes freeze and the right words just won't come." },
  { id:"p1-20", theme:"Daily routine", cz:"Denní režim", questions:[
    "What's your favourite part of the day, and why?",
    "Are you more of a morning person or a night owl?",
    "How has your daily routine changed in the last few years?",
    "Is there anything you do every day without fail?"],
    model:"Probably early evening, once work is finished. It's the time when I finally feel I can do what I want – go for a run, meet a friend, or just sit on the balcony with a cup of tea. The mornings, on the other hand, are always a rush in our house, because four of us are trying to use one bathroom at the same time." },
  { id:"p1-21", theme:"Celebrations", cz:"Oslavy", questions:[
    "How do you usually celebrate your birthday?",
    "What's the most important festival or holiday in your country?",
    "Do you prefer big parties or small gatherings?",
    "Tell us about a celebration you particularly enjoyed."],
    model:"Nothing too extravagant, to be honest. I usually have dinner with my family and then, at the weekend, I invite a few close friends round. I've never been one for huge parties where you hardly get to talk to anybody. For my last birthday we went on a long hike and had a picnic at the top, which was much more memorable than any party." },
  { id:"p1-22", theme:"Childhood", cz:"Dětství", questions:[
    "What did you enjoy doing most when you were a child?",
    "Who were your heroes when you were younger?",
    "In what ways is childhood different today?",
    "Is there anything from your childhood you'd like to experience again?"],
    model:"I spent a lot of time at my grandparents' house in the countryside, and my favourite thing was building dens in the woods with my cousins. We'd disappear for the whole day and only come back when we were hungry. Looking back, it was an amazing amount of freedom – I'm not sure many children have that kind of experience nowadays." },
  { id:"p1-23", theme:"Nature and the environment", cz:"Příroda a životní prostředí", questions:[
    "How often do you spend time in nature?",
    "What do you personally do to help the environment?",
    "Is there a natural place in your country that you love?",
    "Do you think people in your town care enough about the environment?"],
    model:"Not as often as I'd like, unfortunately, but I try to get out of the city at least once a fortnight. There's a forest about half an hour away by train, and just walking there for a couple of hours completely recharges me. I've noticed that if I go too long without it, I start feeling restless and a bit irritable." },
  { id:"p1-24", theme:"Arts and culture", cz:"Umění a kultura", questions:[
    "How often do you go to museums, galleries or the theatre?",
    "Is there a type of art you particularly enjoy?",
    "Were you encouraged to be creative at school?",
    "Do you think art should be free for everyone?"],
    model:"Maybe once every couple of months. I'm especially fond of small galleries, because you can see everything in an hour without getting overwhelmed. The last exhibition I went to was a photography show about life in post-war cities, and I found it incredibly moving – some of the images have stayed with me ever since." },
  { id:"p1-25", theme:"Transport", cz:"Doprava", questions:[
    "How do you usually get around your town?",
    "What do you think of public transport where you live?",
    "Would you like to have a car in the future?",
    "What's the longest journey you've ever made?"],
    model:"Mostly by tram, and occasionally by bike when the weather's decent. The public transport in my city is actually pretty good – it's frequent and reasonably cheap, although it does get unbearably crowded in the rush hour. I don't drive, and to be honest I don't really feel the need to, at least not while I'm living in the city centre." },
  { id:"p1-26", theme:"Money", cz:"Peníze", questions:[
    "Are you good at saving money?",
    "What's something you'd never mind spending money on?",
    "Did you get pocket money when you were a child?",
    "Do you think young people should be taught more about managing money?"],
    model:"I'm getting better at it! When I first started earning, I spent everything almost as soon as it came in. Now I've set up a separate account and I transfer a small amount automatically at the start of each month, so I don't even notice it's gone. It's not a fortune, but it gives me a bit of peace of mind." },
  { id:"p1-27", theme:"Personal goals", cz:"Osobní cíle", questions:[
    "What's something you're working towards at the moment?",
    "How do you stay motivated when things get difficult?",
    "What's an achievement you're particularly proud of?",
    "Do you think it's important to set goals?"],
    model:"Apart from this exam, which is taking up most of my energy right now, I'm training for a half marathon in the spring. I've never run more than ten kilometres before, so it's quite a challenge. I've found that following a proper training plan really helps – when I can see my progress written down, it's much easier to keep going." },
  { id:"p1-28", theme:"Films and TV", cz:"Filmy a televize", questions:[
    "What kind of films or series do you enjoy?",
    "Do you prefer watching films at home or at the cinema?",
    "Is there a film you could watch again and again?",
    "Do you think films can change the way people think?"],
    model:"I'm a sucker for a good thriller – anything with plenty of twists that keeps me guessing until the end. I also enjoy documentaries, particularly about nature or science. What I'm not so keen on are superhero films; I know they're hugely popular, but after a while they all seem to blur into one." },
  { id:"p1-29", theme:"Social media", cz:"Sociální sítě", questions:[
    "Which social media platforms do you use, and what for?",
    "Have you ever taken a break from social media?",
    "Do you think social media brings people closer together?",
    "What do you think you'll be using to communicate in ten years' time?"],
    model:"I mainly use one messaging app to keep in touch with friends and family, and a photo-sharing site, although I mostly scroll rather than post anything myself. I deleted a couple of other apps last year because I realised I was wasting hours on them without really enjoying it, and honestly, I don't miss them at all." },
  { id:"p1-30", theme:"Animals and pets", cz:"Zvířata a domácí mazlíčci", questions:[
    "Have you got, or have you ever had, a pet?",
    "What animal would you most like to see in the wild?",
    "Do you think keeping pets is good for children?",
    "Are animals important in your culture?"],
    model:"Yes, we've got a rather lazy cat called Pepper who spends about twenty hours a day asleep. We got her from a rescue centre when I was fifteen, so she's quite old now. She's not the most affectionate animal in the world – she only really comes to you when she wants food – but the house wouldn't feel the same without her." },
  { id:"p1-31", theme:"Clothes and fashion", cz:"Oblečení a móda", questions:[
    "How would you describe your style of clothing?",
    "Do you follow fashion trends?",
    "Is there an item of clothing you've had for a very long time?",
    "Do you think people judge others by the clothes they wear?"],
    model:"Comfortable and fairly practical, I suppose. I'm usually in jeans and a jumper, and I'll only dress up if there's a special occasion. I've become much more conscious of where my clothes come from, so these days I tend to buy fewer things but of better quality, and I've also started buying second-hand." },
  { id:"p1-32", theme:"Communication", cz:"Komunikace", questions:[
    "Do you prefer talking on the phone or sending messages?",
    "Are you good at remembering people's names?",
    "Who do you talk to when you need advice?",
    "Do you find it easy to speak in front of a group?"],
    model:"Messages, for most things, because I can reply when it suits me. But for anything important or emotional I'd much rather talk on the phone or face to face – it's so easy for a written message to be misunderstood. My mum is the opposite, actually: she calls me for everything, even if it's just to ask what time I'm coming home!" }
],

/* ---------- PART 2: long turn. Three 'photos' per set, described by an art spec
   {e: main figures (emoji), p: props/background (emoji), bg: scene palette key, scene: English description}.
   show/ask are inserted into the interlocutor frame; qs = the two questions printed above the pictures.
   model = sample 1-minute answer comparing pics[modelPics[0]] and pics[modelPics[1]]. ---------- */
p2: [
  { id:"p2-01", title:"Working together", cz:"Spolupráce",
    show:"people working together in different situations",
    ask:"why the people might be working together in these situations, and how they might be feeling",
    qs:["Why might the people be working together in these situations?","How might they be feeling?"],
    pics:[
      { e:["👩‍🚒","🧑‍🚒"], p:["🔥","🏚️","💨"], bg:"night", scene:"Two firefighters in helmets drag a heavy hose towards a burning barn at night, shouting instructions to each other." },
      { e:["🧑‍🔬","👩‍🔬"], p:["🧪","🔬","📋"], bg:"lab", scene:"Two young scientists in a bright laboratory lean over a microscope, one pointing at a screen of results while the other takes notes." },
      { e:["👨‍👩‍👧‍👦"], p:["🧱","🪣","🏠"], bg:"garden", scene:"A family in old clothes builds a low brick wall in their back garden, the children passing bricks along a line." }],
    modelPics:[0,1],
    partnerQ:"Which of these situations do you think requires the most trust between the people?",
    partnerAnswer:"I'd say the firefighters, without a doubt. If one of them makes a mistake, the other could get seriously hurt, so they have to rely on each other completely. The scientists need to trust each other's work, of course, but nobody's life is at risk.",
    model:"Both of these pictures show people who clearly depend on each other to get the job done, but the situations couldn't be more different. In the first one, the firefighters are working together because they simply have no choice – a fire like that is far too dangerous for one person to handle, and they need to coordinate every move. I'd imagine they're feeling a mixture of adrenaline and intense concentration, and possibly fear, although they're trained to control it. The scientists, on the other hand, are in a calm, controlled environment. They're probably collaborating because two minds are better than one when you're interpreting complicated data. Judging by their expressions, they seem quite excited – perhaps they've just made a breakthrough. So while both teams need trust, the firefighters' teamwork is a matter of life and death." },

  { id:"p2-02", title:"Learning new skills", cz:"Učení se nových dovedností",
    show:"people learning new skills",
    ask:"why the people might have decided to learn these skills, and how difficult it might be for them",
    qs:["Why might the people have decided to learn these skills?","How difficult might it be for them?"],
    pics:[
      { e:["👵","💻"], p:["☕","📱"], bg:"home", scene:"An elderly woman sits at a kitchen table with a laptop, frowning slightly as her teenage grandson points at the screen." },
      { e:["🧑‍🦱","🎸"], p:["🎶","📖"], bg:"indoor", scene:"A young man in his bedroom practises guitar chords from an online video, his fingers awkwardly stretched across the strings." },
      { e:["👩","🏄‍♀️"], p:["🌊","☀️"], bg:"sea", scene:"A woman in a wetsuit falls off a surfboard into a wave while an instructor laughs and gives a thumbs-up from the shore." }],
    modelPics:[0,2],
    partnerQ:"Which skill do you think would be the most useful in everyday life?",
    partnerAnswer:"Probably the computer skills the grandmother is learning. So many everyday things – banking, booking a doctor's appointment, even talking to family – happen online now. Surfing is great fun, but you can live perfectly well without it.",
    model:"In both of these pictures, people are stepping out of their comfort zones, but for quite different reasons. The elderly woman with the laptop has probably decided to learn because she feels she has to – so many services are online nowadays that she might feel left behind if she doesn't. The woman surfing, on the other hand, is presumably doing it purely for pleasure, maybe on holiday. As for how difficult it is, I'd imagine the grandmother is finding it quite frustrating; she looks a bit confused, and the vocabulary of technology can be baffling if you didn't grow up with it. Surfing, though, is physically much more demanding – she's just fallen into the water, so she must be exhausted. That said, she seems to be enjoying herself, whereas the grandmother looks rather tense. I suppose motivation makes a big difference." },

  { id:"p2-03", title:"Celebrating", cz:"Oslavy",
    show:"people celebrating in different ways",
    ask:"what the people might be celebrating, and how memorable the occasion might be for them",
    qs:["What might the people be celebrating?","How memorable might the occasion be for them?"],
    pics:[
      { e:["🧑‍🎓","👩‍🎓","👨‍🎓"], p:["🎓","🎉","📸"], bg:"park", scene:"Graduates in gowns throw their caps into the air on a sunny lawn while parents take photos in the background." },
      { e:["👨‍👩‍👧","👴"], p:["🎂","🕯️","🎈"], bg:"home", scene:"A small family gathers round a kitchen table as a grandfather blows out the candles on a cake shaped like a 9 and a 0." },
      { e:["🏃‍♀️","🏅"], p:["🏁","👏"], bg:"street", scene:"An exhausted runner crosses a marathon finish line with her arms raised, strangers clapping on both sides of the barrier." }],
    modelPics:[0,1],
    partnerQ:"Which of these celebrations do you think involves the most personal achievement?",
    partnerAnswer:"I'd go for the marathon runner. Graduation is an achievement too, of course, but you share it with hundreds of others, whereas crossing that line is something she's done entirely on her own, through months of training.",
    model:"These two pictures both show important milestones, but one marks the beginning of something and the other celebrates a whole lifetime. The graduates are obviously celebrating the end of their degree – all those years of hard work have finally paid off, and they must be feeling a huge sense of relief and pride. In the second picture, the family seems to be celebrating the grandfather's ninetieth birthday, which is a much quieter, more intimate occasion. As for how memorable they'll be, I'd say the graduation is likely to be a day the young people remember for the rest of their lives, partly because it's such a public, symbolic moment and there are photos everywhere. Having said that, the birthday might be even more precious for the family, because they probably realise they don't have many more of these occasions left together." },

  { id:"p2-04", title:"Waiting", cz:"Čekání",
    show:"people waiting in different situations",
    ask:"why the people might be waiting, and how they might be feeling",
    qs:["Why might the people be waiting?","How might they be feeling?"],
    pics:[
      { e:["🧍","🧍‍♀️","🧑‍💼"], p:["🚉","🕐","📢"], bg:"station", scene:"Commuters crowd a station platform, staring up at a departures board showing a long list of delayed trains." },
      { e:["👨","🤰"], p:["🏥","☕"], bg:"hospital", scene:"A young man sits in a hospital corridor holding two coffees, bouncing his knee nervously outside a maternity ward." },
      { e:["🧑‍🤝‍🧑","⛺"], p:["🎟️","🌙"], bg:"night", scene:"Fans sit in sleeping bags outside a concert venue late at night, chatting and laughing at the front of a long queue." }],
    modelPics:[0,1],
    partnerQ:"Which of these people do you think would find the waiting most worthwhile?",
    partnerAnswer:"I think the young man at the hospital. However stressful it is, he's about to become a father, so in a few hours the wait won't matter at all. The commuters, sadly, will just get home late.",
    model:"Both pictures show people stuck in a situation they can't control, but the reasons behind the waiting are very different. The commuters are clearly waiting because their trains have been delayed or cancelled – it looks like rush hour, so they're probably desperate to get home or to work. The man in the hospital, by contrast, seems to be waiting for the birth of his child, judging by the sign on the door. When it comes to their feelings, I'd imagine the commuters are irritated and fed up, especially if this happens regularly. The young man must be feeling something much more intense – a mixture of excitement and anxiety, and he can't sit still. So, while the commuters' wait is just an annoying inconvenience, his is probably one of the most emotional hours of his life." },

  { id:"p2-05", title:"Taking risks", cz:"Riskování",
    show:"people taking risks",
    ask:"why the people might be taking these risks, and what the possible consequences might be",
    qs:["Why might the people be taking these risks?","What might the possible consequences be?"],
    pics:[
      { e:["🧗","🧗‍♀️"], p:["🏔️","🪢","☁️"], bg:"mountain", scene:"Two climbers roped together edge along a narrow, icy ridge high above the clouds." },
      { e:["👩‍💼","📦"], p:["🏪","🔑","📝"], bg:"street", scene:"A woman in her forties stands proudly outside a tiny bakery she has just opened, the sign still being fixed above the door." },
      { e:["🧑","🎤"], p:["🎙️","👥","💡"], bg:"stage", scene:"A nervous teenager steps up to an open-mic stage in a crowded café, gripping the microphone with both hands." }],
    modelPics:[0,1],
    partnerQ:"Which of these risks do you think is the most worth taking?",
    partnerAnswer:"For me, it'd have to be opening the bakery. It's a financial gamble, but if it works, it could change her whole life. The climbers might get a fantastic view, but I'm not sure that's worth risking your life for.",
    model:"In both pictures, people are taking a big gamble, although one risk is physical and the other is mainly financial. The climbers are probably doing it for the thrill and the sense of achievement – reaching a summit like that must be an incredible feeling, and for some people that kind of challenge is what makes life exciting. The woman with the bakery, on the other hand, has presumably given up a secure job to follow her dream, which takes a different kind of courage. As for the consequences, the climbers' situation is obviously far more dangerous: one slip on that ice could be fatal. If the bakery fails, she might lose her savings, which would be devastating, but at least she could start again. Then again, if it succeeds, the reward could be lasting satisfaction, whereas the climbers' high is over once they're back down the mountain." },

  { id:"p2-06", title:"Helping others", cz:"Pomoc druhým",
    show:"people helping others",
    ask:"why the people might be helping in these situations, and how the people being helped might feel",
    qs:["Why might the people be helping in these situations?","How might the people being helped feel?"],
    pics:[
      { e:["🧑‍🦰","👵"], p:["🛒","🥫","🏘️"], bg:"street", scene:"A young volunteer carries heavy shopping bags up the steps of a block of flats for an elderly neighbour." },
      { e:["👩‍⚕️","🧒"], p:["🩹","🧸"], bg:"hospital", scene:"A nurse kneels beside a little boy in a hospital bed, showing him a teddy bear with a bandage on its arm." },
      { e:["👨‍🏫","👩‍🦱"], p:["📚","✏️","🌍"], bg:"classroom", scene:"A retired man tutors a refugee woman in English at a community centre, both laughing over a picture dictionary." }],
    modelPics:[0,2],
    partnerQ:"Which kind of help do you think would make the biggest long-term difference?",
    partnerAnswer:"I'd say the English lessons. Carrying shopping is lovely, but it's a one-off. Learning the language could help that woman find a job, make friends and really settle into her new life.",
    model:"Both of these pictures show ordinary people giving up their time for others, rather than professionals doing their job. In the first one, the young volunteer is probably helping because the elderly woman can't manage the stairs any more – perhaps she lives alone and has no family nearby. In the third picture, the retired man might be tutoring because he wants to feel useful now that he's stopped working, and maybe he understands how isolating it is not to speak the language. As for the people being helped, I'd imagine the elderly neighbour feels grateful but perhaps also slightly embarrassed to depend on someone else. The woman learning English seems much more relaxed – they're laughing together, which suggests a real friendship is developing. So while both acts are generous, the second seems to benefit both people equally." },

  { id:"p2-07", title:"Eating together", cz:"Společné jídlo",
    show:"people eating together in different places",
    ask:"why the people might have chosen to eat in these places, and how important the food might be to them",
    qs:["Why might the people have chosen to eat in these places?","How important might the food be to them?"],
    pics:[
      { e:["👨‍👩‍👧‍👦"], p:["🧺","🥪","🌳"], bg:"park", scene:"A family sits on a checked blanket under a tree, sharing sandwiches and fruit while a dog waits hopefully nearby." },
      { e:["🧑‍💼","👩‍💼"], p:["🍷","🕯️","🍽️"], bg:"indoor", scene:"Two business people in suits sit in an elegant restaurant, a waiter presenting a beautifully arranged dish." },
      { e:["👷","👷‍♀️"], p:["🥡","🏗️"], bg:"city", scene:"Construction workers in hard hats sit on a steel beam at a building site, eating takeaway noodles out of cartons." }],
    modelPics:[0,1],
    partnerQ:"Which of these meals do you think the people will remember longest?",
    partnerAnswer:"Probably the family picnic, especially for the children. Business dinners all tend to blur together, but a relaxed afternoon in the park with your parents is the kind of thing you remember years later.",
    model:"Both pictures show people sharing a meal, but the atmosphere in each is completely different. The family have probably chosen the park because it's a sunny day and it's an easy, cheap way to spend time together – the children can run around and nobody has to worry about table manners. The business people, by contrast, are likely to be in that restaurant to impress someone, or perhaps to celebrate closing a deal; the setting is very formal and probably quite expensive. As for the food, I'd say it's almost secondary for the family – sandwiches and fruit are just an excuse to be outdoors together. In the restaurant, however, the food seems to be part of the experience; the dish looks like a work of art. Then again, I suspect they're focusing more on the conversation than on what's on their plates." },

  { id:"p2-08", title:"Ways of travelling", cz:"Způsoby cestování",
    show:"people travelling in different ways",
    ask:"why the people might have chosen to travel in these ways, and what problems they might face",
    qs:["Why might the people have chosen to travel in these ways?","What problems might they face?"],
    pics:[
      { e:["🚴","🚴‍♀️"], p:["🎒","🗺️","🌄"], bg:"field", scene:"Two cyclists with heavily loaded bikes pedal up a quiet country road as the sun rises over rolling hills." },
      { e:["🧳","👨‍💼"], p:["✈️","🛫","📱"], bg:"station", scene:"A businessman checks his phone while hurrying through a busy airport terminal, wheeling a small suitcase." },
      { e:["👫","🚐"], p:["🏕️","🌲","⛰️"], bg:"forest", scene:"A young couple sit on the step of an old camper van parked by a lake, drinking coffee from tin mugs." }],
    modelPics:[0,1],
    partnerQ:"Which way of travelling do you think is the most enjoyable?",
    partnerAnswer:"The camper van, I think. You've got the freedom to stop wherever you like, like the cyclists, but you don't have to pedal up hills all day, and you can sleep in a proper bed.",
    model:"These pictures show two very different approaches to travel – one slow and one as fast as possible. The cyclists have presumably chosen to travel by bike because for them the journey is the whole point; they get to see the countryside up close, it's cheap, and it's environmentally friendly. The businessman, on the other hand, has probably flown because he's short of time and needs to get to a meeting. When it comes to problems, the cyclists could face bad weather, punctures, or simply exhaustion – those bikes look incredibly heavy, and that hill seems steep. The man in the airport is more likely to have to deal with delays, long queues at security, or a missed connection, which can be just as stressful in a different way. Overall, I'd say the cyclists' problems are more physical, while his are mainly about stress and time pressure." },

  { id:"p2-09", title:"Competing", cz:"Soutěžení",
    show:"people competing in different situations",
    ask:"why the people might be competing, and how important winning might be to them",
    qs:["Why might the people be competing?","How important might winning be to them?"],
    pics:[
      { e:["🧒","👧","🧑‍🦱"], p:["🥄","🥚","🏁"], bg:"park", scene:"Children at a school sports day run an egg-and-spoon race, giggling, while parents cheer from deckchairs." },
      { e:["🧑‍🍳","👩‍🍳"], p:["🍰","⏱️","📺"], bg:"kitchen", scene:"Two amateur chefs race against a giant clock in a TV cooking competition, cameras pointed at their hands." },
      { e:["🧑‍💻","👩‍💻"], p:["♟️","🏆"], bg:"indoor", scene:"Two teenagers face each other across a chessboard at a national tournament, one with her head in her hands." }],
    modelPics:[1,2],
    partnerQ:"Which of these competitions do you think is the most stressful?",
    partnerAnswer:"I'd say the TV cooking show. The chess players are under pressure too, but at least nobody's filming every mistake they make, and they don't have a giant clock counting down above their heads.",
    model:"In both of these pictures, people are competing under intense pressure, but in rather different ways. The amateur chefs are probably on the TV show because they love cooking and want some recognition – perhaps they dream of opening their own restaurant one day, and winning could open doors for them. The chess players, meanwhile, have probably been training for years to reach a national tournament, so this could be the most important moment of their lives so far. As for how much winning matters, I get the impression it matters enormously to the chess player with her head in her hands – she looks as if she's just made a terrible mistake. The chefs seem to be focused, but there's a sense of entertainment about TV shows, so maybe taking part is half the fun. In both cases, though, I'd imagine nobody wants to lose in public." },

  { id:"p2-10", title:"Making things by hand", cz:"Ruční výroba",
    show:"people making things by hand",
    ask:"why the people might be making these things by hand, and what satisfaction they might get from it",
    qs:["Why might the people be making these things by hand?","What satisfaction might they get from it?"],
    pics:[
      { e:["👨‍🦳","🪑"], p:["🪚","🪵","🔨"], bg:"indoor", scene:"An old carpenter in a dusty workshop carefully sands the leg of a wooden chair, shavings all over the floor." },
      { e:["👩","🧶"], p:["🧣","🛋️","📺"], bg:"home", scene:"A young woman knits a bright striped scarf on a sofa, a tutorial paused on her laptop beside her." },
      { e:["🧒","🧑‍🎨"], p:["🏺","🎨"], bg:"classroom", scene:"A father and his young son, both covered in clay, shape a lopsided pot on a pottery wheel at an evening class." }],
    modelPics:[0,1],
    partnerQ:"Which of these activities would you most like to try, and why?",
    partnerAnswer:"Pottery, definitely. It looks really messy, but that's half the appeal. And doing it with someone else, like the father and son, sounds like a great way to spend an evening.",
    model:"Both pictures show people concentrating on something they're creating by hand, but I suspect their reasons are quite different. The carpenter is probably a professional – it's his livelihood, and he's likely been doing this for decades, perhaps because handmade furniture is valued for its quality and lasts much longer than mass-produced pieces. The young woman knitting, on the other hand, seems to be doing it as a hobby; maybe she finds it relaxing after work or wants to give the scarf as a present. As for satisfaction, I'd imagine the carpenter takes enormous pride in his craftsmanship and the fact that his chairs might be used for generations. For the woman, I think the satisfaction is more about the process – the repetitive movement can be almost meditative. Mind you, finishing something and actually wearing it must feel pretty good too." },

  { id:"p2-11", title:"Performing", cz:"Vystupování",
    show:"people performing in front of others",
    ask:"why the people might have decided to perform, and how the audience might be reacting",
    qs:["Why might the people have decided to perform?","How might the audience be reacting?"],
    pics:[
      { e:["🧑‍🎤","🎸"], p:["🏙️","🪙","🎶"], bg:"street", scene:"A street musician plays guitar on a busy shopping street, a few coins in his open case while most people hurry past." },
      { e:["💃","🕺"], p:["🎭","💡","👏"], bg:"stage", scene:"A pair of ballet dancers leap across a grand theatre stage in front of a packed, silent audience." },
      { e:["👧","🎻"], p:["🏫","📸","👨‍👩‍👧"], bg:"classroom", scene:"A girl of about eight plays the violin at a school concert while parents film her on their phones." }],
    modelPics:[0,2],
    partnerQ:"Which of these performers do you think feels the most nervous?",
    partnerAnswer:"Probably the little girl. Even though the audience is friendly, it might be her first time on stage, and everyone's filming her, so any mistake will be recorded forever.",
    model:"In both pictures someone is performing music, but the circumstances are worlds apart. The street musician has probably chosen to play outdoors to earn some money, or perhaps to get experience of playing in front of strangers, which is a brave thing to do. The little girl, on the other hand, is presumably performing because it's part of her music lessons – it might not have been entirely her decision. When it comes to the audience, the contrast is striking. On the street, most people seem completely indifferent; they're hurrying past without really noticing him, which must be quite disheartening. At the school concert, however, the audience couldn't be more supportive – the parents are filming every second, and I'm sure they'll applaud enthusiastically whatever happens. So, ironically, the more experienced performer probably gets far less appreciation." },

  { id:"p2-12", title:"Communicating", cz:"Komunikace",
    show:"people communicating in different ways",
    ask:"why the people might be communicating in these ways, and how effective the communication might be",
    qs:["Why might the people be communicating in these ways?","How effective might the communication be?"],
    pics:[
      { e:["👩‍💻"], p:["💻","🌐","👥"], bg:"home", scene:"A woman on a video call at her kitchen table waves at a screen showing a grid of colleagues' faces, one of whose images has frozen." },
      { e:["👴","✉️"], p:["🖋️","📮"], bg:"indoor", scene:"An old man writes a long letter by hand at a desk, a stack of envelopes and a stamp album beside him." },
      { e:["🧏","🧏‍♀️"], p:["🤟","☕"], bg:"city", scene:"Two friends chat animatedly in sign language at a pavement café." }],
    modelPics:[0,1],
    partnerQ:"Which form of communication do you think is the most personal?",
    partnerAnswer:"The handwritten letter, I'd say. Somebody has taken real time and effort to write it, and you can keep it for years. A video call is useful, but it's gone the moment you hang up.",
    model:"These two pictures show the contrast between the most modern and probably the most traditional way of keeping in touch. The woman is presumably using a video call because she's working from home and needs to speak to several colleagues at once, which would be impossible otherwise. The old man, on the other hand, might be writing a letter because he's never felt comfortable with technology, or simply because he enjoys it. When it comes to effectiveness, the video call is obviously much faster – you can discuss something and make decisions on the spot. Having said that, it doesn't look entirely smooth: one person's image has frozen, which suggests connection problems. The letter will take days to arrive, but I suspect it'll be read much more carefully, and it might mean a great deal to the person who receives it." },

  { id:"p2-13", title:"Shopping", cz:"Nakupování",
    show:"people shopping in different places",
    ask:"why the people might have chosen to shop in these places, and how they might be feeling",
    qs:["Why might the people have chosen to shop in these places?","How might they be feeling?"],
    pics:[
      { e:["👵","🧑‍🌾"], p:["🍅","🥕","🧺"], bg:"market", scene:"An elderly woman chats with a farmer at an outdoor market stall, picking out tomatoes from a wooden crate." },
      { e:["👨‍👧","🛒"], p:["🏬","🏷️","📦"], bg:"shop", scene:"A tired father pushes an overflowing trolley through a huge supermarket while his toddler reaches for sweets." },
      { e:["🧑","📱"], p:["🛋️","📦","🚚"], bg:"home", scene:"A young man lying on a sofa scrolls through an online shop, a pile of delivery boxes stacked by the door." }],
    modelPics:[0,1],
    partnerQ:"Which way of shopping do you think will become less common in the future?",
    partnerAnswer:"Probably the big supermarket shop. With home delivery getting cheaper, I think more families will order online, whereas markets might survive because people enjoy the experience and the local produce.",
    model:"Both pictures show people buying food, but the experiences seem completely different. The elderly woman has probably chosen the market because she values fresh, local produce, and I suspect she also enjoys the social side – she seems to know the farmer quite well. The father, by contrast, is in a huge supermarket, presumably because it's convenient and he can get everything for the week in one go. As for their feelings, the woman looks relaxed and in no hurry at all; shopping is clearly a pleasure for her rather than a chore. The father, on the other hand, looks rather worn out, and keeping a toddler away from the sweets while pushing that trolley can't be easy. I'd say it's a good example of how the same everyday task can be either an enjoyable ritual or simply a stressful necessity." },

  { id:"p2-14", title:"Caring for animals", cz:"Péče o zvířata",
    show:"people looking after animals",
    ask:"why the people might be looking after these animals, and what responsibilities they might have",
    qs:["Why might the people be looking after these animals?","What responsibilities might they have?"],
    pics:[
      { e:["👩‍⚕️","🐕"], p:["🩺","💉"], bg:"hospital", scene:"A vet gently examines a nervous dog on a table while its young owner strokes its head." },
      { e:["🧑‍🌾","🐄","🐑"], p:["🌾","🏡"], bg:"field", scene:"A farmer leads cows across a muddy field at dawn, sheep grazing near a stone barn." },
      { e:["🧒","🐹"], p:["🏠","🥕"], bg:"home", scene:"A child kneels beside a cage, carefully feeding a hamster a piece of carrot." }],
    modelPics:[1,2],
    partnerQ:"Which of these people do you think gets the most enjoyment from the animals?",
    partnerAnswer:"I think the child. For the farmer, the animals are his job, and it's hard work in all weathers. The child is just discovering what it's like to care for something, and that's really exciting at that age.",
    model:"Both pictures show people taking care of animals, but for very different reasons. The farmer is obviously looking after his cows and sheep because they're his livelihood – he depends on them for milk, meat or wool, and it's probably a family business. The child, on the other hand, has a hamster as a pet, perhaps because his parents want him to learn to be responsible. When it comes to responsibilities, the farmer's are enormous: he has to be up at dawn every single day, whatever the weather, and make sure the animals are healthy, fed and sheltered. The child's responsibilities are much smaller in scale – feeding the hamster and cleaning its cage – but for a young child that's still an important lesson. I suppose in both cases the animals depend entirely on them, which is quite a commitment." },

  { id:"p2-15", title:"Working unusual hours", cz:"Práce v netypickou dobu",
    show:"people working at unusual times",
    ask:"why the people might be working at these times, and how it might affect their lives",
    qs:["Why might the people be working at these times?","How might it affect their lives?"],
    pics:[
      { e:["🧑‍⚕️","👩‍⚕️"], p:["🏥","🌙","☕"], bg:"night", scene:"Two doctors share a quick coffee in a dimly lit hospital corridor at three in the morning." },
      { e:["🥖","👨‍🍳"], p:["🍞","🔥","⏰"], bg:"kitchen", scene:"A baker kneads dough in a warm bakery long before sunrise, the alarm clock on the shelf showing 4 a.m." },
      { e:["🧑‍💻"], p:["💻","🌃","🍕"], bg:"night", scene:"A young programmer works alone in an empty office at midnight, cold pizza next to her keyboard." }],
    modelPics:[0,1],
    partnerQ:"Which of these people do you think has chosen their working hours freely?",
    partnerAnswer:"Probably the programmer. Doctors and bakers have no choice – people need care at night and bread in the morning. She might just be meeting a deadline, or maybe she simply concentrates better when it's quiet.",
    model:"Both of these pictures show people working while most of us are asleep, and in both cases it's because the job demands it. The doctors are on a night shift because hospitals obviously can't close – emergencies happen around the clock. The baker, on the other hand, has to start in the middle of the night so that fresh bread is ready when customers arrive in the morning. As for how it affects their lives, I'd imagine it's tough for both. Doctors on night shifts must find it really difficult to switch off and sleep during the day, and constantly changing shifts can be exhausting. The baker probably has a more regular routine, so his body might get used to it, but his social life must suffer – he can hardly go out in the evening if he's getting up at three. Either way, it takes real dedication." },

  { id:"p2-16", title:"Relaxing", cz:"Odpočinek",
    show:"people relaxing in different ways",
    ask:"why the people might have chosen to relax in these ways, and how relaxing these activities really are",
    qs:["Why might the people have chosen to relax in these ways?","How relaxing are these activities really?"],
    pics:[
      { e:["🧘‍♀️"], p:["🌅","🌊","🌴"], bg:"beach", scene:"A woman does yoga alone on an empty beach at sunrise, eyes closed, the sea perfectly calm." },
      { e:["👨‍👩‍👦","🎢"], p:["🎡","🍿","🎠"], bg:"park", scene:"A family screams with excitement on a rollercoaster at a crowded theme park." },
      { e:["🧔","🎮"], p:["🛋️","🥤","📺"], bg:"home", scene:"A man in headphones sits on a sofa playing a fast-paced video game, leaning forward in concentration." }],
    modelPics:[0,1],
    partnerQ:"Which of these activities would you choose after a stressful week?",
    partnerAnswer:"I'd go for the yoga on the beach. After a stressful week, the last thing I'd want is queues and noise at a theme park. Peace and quiet would do me much more good.",
    model:"These two pictures show completely opposite ideas of relaxation. The woman doing yoga has probably chosen it because she wants peace and quiet – perhaps she has a hectic job, and starting the day in silence by the sea helps her to clear her mind. The family at the theme park, however, are looking for excitement rather than calm; for them, relaxing means having fun together and forgetting about everyday routines. As for whether these activities are really relaxing, I'd say the yoga clearly is – it's hard to imagine a more tranquil setting. The theme park is more debatable. They're obviously having a great time, but between the queues, the crowds and the noise, the parents in particular may well come home more exhausted than they were before. So I suppose it depends whether you see relaxation as rest or simply as a change from routine." },

  { id:"p2-17", title:"Making decisions", cz:"Rozhodování",
    show:"people making decisions",
    ask:"what the people might be trying to decide, and how difficult the decision might be",
    qs:["What might the people be trying to decide?","How difficult might the decision be?"],
    pics:[
      { e:["👫","🏠"], p:["🔑","📄","🏷️"], bg:"street", scene:"A young couple stand outside a small house with a 'For Sale' sign, studying a brochure and looking unsure." },
      { e:["🧑‍🎓","🖥️"], p:["🏛️","📚","❓"], bg:"indoor", scene:"A teenager sits in front of a computer screen showing three university websites, chewing a pen." },
      { e:["👩‍⚖️","👥"], p:["⚖️","🗂️"], bg:"office", scene:"A group of people sit around a table in a formal room, a jury discussing evidence spread across papers." }],
    modelPics:[0,1],
    partnerQ:"Which decision do you think would have the biggest effect on other people?",
    partnerAnswer:"Definitely the jury's. The couple and the student are mainly deciding about their own lives, but the jury's decision could change someone else's life completely, so it's a huge responsibility.",
    model:"Both pictures show people facing decisions that could shape their future. The young couple seem to be deciding whether to buy that house – they're studying the brochure, but they look rather doubtful, so perhaps it's slightly out of their price range or not quite what they'd hoped for. The teenager, meanwhile, is presumably trying to choose which university to apply to. As for how difficult the decisions are, I'd say buying a house is probably the more serious one financially – it's likely to involve a huge mortgage and committing to one place for many years. That said, the student's choice might be harder emotionally, because at that age you don't really know what you want, and it could determine your career. One difference is that the couple can discuss it together, whereas the teenager looks rather alone with the decision." },

  { id:"p2-18", title:"Teaching and guiding", cz:"Výuka a vedení",
    show:"people teaching others",
    ask:"what the learners might be gaining from the experience, and how the teachers might be feeling",
    qs:["What might the learners be gaining from the experience?","How might the teachers be feeling?"],
    pics:[
      { e:["👨‍🏫","🧑‍🎓","👩‍🎓"], p:["📊","🏛️","🎓"], bg:"classroom", scene:"A professor lectures to a huge, half-empty lecture hall; some students take notes, others look at their phones." },
      { e:["👩‍🦳","🧒"], p:["🌱","🪴","🌻"], bg:"garden", scene:"A grandmother shows her granddaughter how to plant seedlings in a vegetable garden, both kneeling in the soil." },
      { e:["🧑‍✈️","👨‍✈️"], p:["✈️","🎛️"], bg:"sky", scene:"A flight instructor sits beside a trainee pilot in a small cockpit, pointing at the controls." }],
    modelPics:[0,1],
    partnerQ:"In which situation do you think the learner will remember the lesson best?",
    partnerAnswer:"I think the girl in the garden. She's learning by doing it with her own hands, and there's an emotional connection with her grandmother, so it'll probably stay with her for life.",
    model:"These two pictures show very different ways of passing on knowledge. In the lecture hall, the students are presumably gaining theoretical knowledge they'll need for exams, but judging by the number of people on their phones, I'm not sure how much they're really absorbing. In the garden, the little girl is learning a practical skill in a much more personal way, and probably gaining something beyond gardening – a love of nature, perhaps, and a close bond with her grandmother. As for the teachers, I'd imagine the professor feels slightly frustrated, or maybe resigned, speaking to rows of empty seats and distracted students. The grandmother, by contrast, seems to be thoroughly enjoying herself; teaching someone you love, one-to-one, is likely to be far more rewarding. So I'd say the scale of the teaching makes a real difference to both sides." },

  { id:"p2-19", title:"Protecting the environment", cz:"Ochrana životního prostředí",
    show:"people doing things to protect the environment",
    ask:"why the people might be doing these things, and how much difference they might make",
    qs:["Why might the people be doing these things?","How much difference might they make?"],
    pics:[
      { e:["🧑‍🤝‍🧑","🗑️"], p:["🏖️","🧴","🥤"], bg:"beach", scene:"Volunteers in gloves pick up plastic bottles and nets on a windswept beach, filling large bags." },
      { e:["👨‍🔧","☀️"], p:["🏠","🔧"], bg:"sky", scene:"A technician installs solar panels on the roof of a family house under a bright blue sky." },
      { e:["🧑‍🤝‍🧑","📢"], p:["🪧","🌍","🏛️"], bg:"city", scene:"Young people march down a city street holding handmade banners outside a government building." }],
    modelPics:[0,2],
    partnerQ:"Which of these actions do you think is the most effective in the long term?",
    partnerAnswer:"I'd probably say the solar panels. Cleaning beaches is important, but the plastic keeps coming back, whereas solar panels reduce emissions every single day for twenty years or more.",
    model:"Both pictures show groups of people taking action for the environment, but in quite different ways – one is very hands-on and the other is about raising awareness. The volunteers on the beach are probably there because they're tired of seeing their coastline covered in plastic, and they want to do something tangible straight away. The young people marching, on the other hand, seem to want to put pressure on politicians to change the law. As for how much difference they make, the beach clean-up has an immediate, visible effect, which must be rewarding, but it doesn't tackle the root of the problem – next week there'll be more rubbish. The protest might not achieve anything in the short term, but if it changes government policy, its impact could be far greater. So I'd say both are valuable, but in different time frames." },

  { id:"p2-20", title:"Being part of a crowd", cz:"Být v davu",
    show:"people in crowds",
    ask:"why the people might have chosen to be in these places, and how they might be feeling",
    qs:["Why might the people have chosen to be in these places?","How might they be feeling?"],
    pics:[
      { e:["🙌","🧑‍🤝‍🧑","👯"], p:["🎆","🎵","💡"], bg:"stage", scene:"A huge crowd at an outdoor music festival jumps with their arms raised as fireworks burst over the stage." },
      { e:["🧑‍💼","👩‍💼","🧍"], p:["🚇","📱"], bg:"station", scene:"Commuters are packed shoulder to shoulder in a metro carriage, most of them staring at their phones." },
      { e:["⚽","🧑‍🤝‍🧑"], p:["🏟️","🧣","📣"], bg:"stadium", scene:"Football supporters in matching scarves sing together in a packed stadium as the players come out." }],
    modelPics:[0,1],
    partnerQ:"Which of these crowds would you least like to be part of?",
    partnerAnswer:"The metro, without a doubt. At a festival or a match you've chosen to be there and there's a shared atmosphere, but a crowded carriage is just uncomfortable, and nobody is enjoying it.",
    model:"Both pictures show people squeezed into a small space with hundreds of strangers, but the experience couldn't be more different. The festival-goers have obviously chosen to be there – they've probably paid a lot for tickets and travelled a long way to see their favourite bands. The commuters, on the other hand, are only in that carriage because they have to get to work; given the choice, I'm sure most of them would rather be anywhere else. When it comes to feelings, the people at the festival look euphoric – there's a real sense of shared energy, and being part of a crowd seems to be part of the fun. In the metro, people are physically close but emotionally completely disconnected; everyone is retreating into their phones, and I'd imagine they feel tired, cramped and slightly irritated. It shows how a crowd can be either exhilarating or exhausting." },

  { id:"p2-21", title:"Moving to a new place", cz:"Stěhování",
    show:"people moving to a new place",
    ask:"why the people might be moving, and what challenges they might face",
    qs:["Why might the people be moving?","What challenges might they face?"],
    pics:[
      { e:["👨‍👩‍👧","📦"], p:["🚚","🏠","🪴"], bg:"street", scene:"A family carries boxes from a removal van into a new house, the youngest child hugging a toy rabbit at the door." },
      { e:["🧑‍🎓","🧳"], p:["🏢","🛏️","📚"], bg:"indoor", scene:"A first-year student sits on a bare bed in a tiny university room, surrounded by unopened bags." },
      { e:["👴","👵"], p:["🌴","☀️","🏡"], bg:"beach", scene:"A retired couple wave from the balcony of a small white flat overlooking the sea in a southern country." }],
    modelPics:[1,2],
    partnerQ:"Who do you think will find it easiest to settle in, and why?",
    partnerAnswer:"Probably the student. University is set up for meeting people – there are clubs and parties and everyone's new. The retired couple might struggle more with the language and with being far from their grandchildren.",
    model:"In both of these pictures, people are starting a new chapter in their lives, but at completely different stages. The student has presumably just moved away from home for the first time to start university, whereas the retired couple have probably moved abroad to enjoy a warmer climate and a slower pace of life now that they've stopped working. When it comes to challenges, I'd imagine the student is feeling rather lonely and overwhelmed at the moment – sitting on a bare bed surrounded by bags, he looks as if he doesn't quite know where to start. He'll have to learn to look after himself and make new friends. The couple, on the other hand, seem perfectly happy, but they might face practical problems, such as learning the language, dealing with bureaucracy, or being far from their family and doctors if their health declines." }
],

/* ---------- PART 3: collaborative task.
   topic -> "Here are some {topic} and a question for you to discuss."; central = question in the mind map;
   say -> "Now, talk to each other about {say}"; decision -> "Now you have about a minute to decide {decision}".
   partnerLines = what the virtual partner says at pause points (in order). model = sample exchange (A/B). ---------- */
p3: [
  { id:"p3-01", title:"Reducing stress", cz:"Zvládání stresu",
    topic:"things that people often do to reduce stress",
    central:"How effective might these things be in reducing stress?",
    say:"how effective these things might be in reducing stress.",
    prompts:["doing physical exercise","spending time in nature","talking to friends or family","taking up a creative hobby","switching off digital devices"],
    decision:"which of these things would be the most helpful for students before exams.",
    partnerLines:[
      "Shall we start with physical exercise? I find a run really clears my head, but I know not everyone enjoys sport.",
      "That's true. And what about switching off devices? I think it sounds great in theory, but I'm not sure people would actually do it.",
      "Mm, talking to friends is interesting, because sometimes it helps, but sometimes it just makes you more anxious if they're stressed too.",
      "What about nature? Even a short walk in a park can make a difference, don't you think?",
      "Creative hobbies take quite a lot of time, though. Is that realistic for someone who's already overloaded?"
    ],
    decideLines:[
      "So, for students before exams… I'd lean towards physical exercise, because it's quick. What would you choose?",
      "OK, I could live with that. So we agree, more or less?"
    ],
    model:"A: Shall we start with physical exercise? I'd say it's one of the most effective, because it actually changes your body chemistry.\nB: I couldn't agree more, although it depends on the person. Some people find the gym stressful in itself.\nA: That's a fair point. What about switching off devices? I think constant notifications keep us permanently on edge.\nB: True, but it's easier said than done. Most people would feel cut off, and that might make them even more anxious.\nA: So maybe it works better combined with something else – like spending time in nature, where you naturally leave your phone in your pocket.\nB: Exactly. And building on that, talking to friends could happen on a walk too, so you get two benefits at once.\nA: Yes, I hadn't thought of it like that. Shall we look at creative hobbies?\nB: I think they're wonderful long-term, but they're probably not a quick fix." },

  { id:"p3-02", title:"Choosing a career", cz:"Volba povolání",
    topic:"factors that people consider when choosing a career",
    central:"How important might these factors be when people choose a career?",
    say:"how important these factors might be when people choose a career.",
    prompts:["salary","job security","opportunities to travel","work-life balance","doing something meaningful"],
    decision:"which factor young people today consider most important.",
    partnerLines:[
      "Let's begin with salary. I suppose for most people it's the first thing they look at, isn't it?",
      "But job security matters too, especially when the economy's unpredictable. Wouldn't you say that?",
      "I think work-life balance has become much more important recently. My parents never talked about it.",
      "What about doing something meaningful? Do you think people would accept a lower salary for that?",
      "Travel is attractive when you're young, but maybe less so once you have a family."
    ],
    decideLines:[
      "So, what do young people care about most? I'm inclined to say work-life balance. Do you agree?",
      "Fair enough. Shall we go with that, then?"
    ],
    model:"A: Let's begin with salary. I suppose it's the most obvious factor.\nB: It is, but I'd argue it matters less than people think, once you earn enough to live comfortably.\nA: That's true to some extent, but with the cost of housing these days, money is a real concern for young people.\nB: I take your point. What about job security? My grandparents stayed in one company all their lives.\nA: Whereas nowadays people change jobs every few years, so maybe security is less of a priority.\nB: Exactly – and that links to work-life balance. I think people are much less willing to sacrifice their free time than they used to be.\nA: Definitely. And doing something meaningful goes hand in hand with that, don't you think?\nB: For some people, yes, although not everyone can afford to choose a job just because it's meaningful." },

  { id:"p3-03", title:"Protecting the environment", cz:"Ochrana prostředí",
    topic:"ways of encouraging people to protect the environment",
    central:"How effective might these ways be in encouraging people to protect the environment?",
    say:"how effective these ways might be in encouraging people to protect the environment.",
    prompts:["higher taxes on pollution","education in schools","celebrity campaigns","free public transport","rewards for recycling"],
    decision:"which way would have the greatest impact in your country.",
    partnerLines:[
      "Shall we start with education in schools? I think it's essential, but it takes years to have an effect.",
      "Higher taxes are interesting. They definitely change behaviour, but people really resent them.",
      "I'm a bit sceptical about celebrity campaigns, to be honest. Do you think anyone really listens?",
      "Free public transport would be great, but who would pay for it?",
      "Rewards for recycling seem to work well in some countries, like deposits on bottles."
    ],
    decideLines:[
      "So, which would have the greatest impact here? I'd probably go for free public transport. How about you?",
      "I see your point. Let's agree on that one."
    ],
    model:"A: Would you like to begin, or shall I?\nB: Go ahead.\nA: OK, I think higher taxes on pollution are probably the most effective, simply because they hit people's wallets.\nB: I see what you mean, but isn't there a risk that they hit poorer people hardest?\nA: That's a really good point. Maybe it's fairer to target companies rather than individuals.\nB: And what's your take on education in schools? I'd say it's crucial in the long run.\nA: I agree, children often influence their parents too – mine made us start recycling!\nB: That links nicely to rewards for recycling. If there's a small incentive, people change their habits surprisingly fast.\nA: Whereas celebrity campaigns… I'm not entirely convinced, especially when celebrities fly in private jets." },

  { id:"p3-04", title:"Benefits of travel", cz:"Přínosy cestování",
    topic:"benefits that people can get from travelling",
    central:"How important might these benefits of travelling be?",
    say:"how important these benefits of travelling might be.",
    prompts:["learning about other cultures","improving language skills","becoming more independent","making new friends","relaxing and escaping routine"],
    decision:"which benefit is most important for young people.",
    partnerLines:[
      "What about learning about other cultures? For me, that's the main reason to travel.",
      "Improving language skills is important, but only if you actually talk to local people, don't you think?",
      "Becoming independent is a big one. When I travelled alone for the first time, I had to solve everything myself.",
      "Making new friends is nice, but those friendships don't always last, do they?",
      "Escaping routine – that's what most people want from a holiday, I suppose."
    ],
    decideLines:[
      "For young people specifically, I'd say independence. Would you go along with that?",
      "Right, so we're agreed."
    ],
    model:"A: Shall we start with learning about other cultures?\nB: Sure. I think it's the most valuable benefit, because it changes the way you see your own country too.\nA: Absolutely, although I'd say that only happens if you get off the beaten track. Staying in an international hotel won't teach you much.\nB: True. What about becoming more independent? I think that's underrated.\nA: Definitely. Being in a strange place forces you to solve problems on your own – missing a train, ordering in a foreign language…\nB: Which brings us to language skills. Do you think travelling really improves them?\nA: Only if you make an effort. Many people just point at the menu!\nB: (laughs) That's true. And relaxing – is that really a benefit of travel, or could you relax at home?" },

  { id:"p3-05", title:"Technology in education", cz:"Technologie ve vzdělávání",
    topic:"ways in which technology is used in education",
    central:"How might these uses of technology affect the way students learn?",
    say:"how these uses of technology might affect the way students learn.",
    prompts:["online courses","learning apps on phones","interactive whiteboards","AI writing tools","video lessons"],
    decision:"which use of technology is the most beneficial for students.",
    partnerLines:[
      "Let's start with online courses. They've made education available to so many more people, haven't they?",
      "Learning apps are fun, but I wonder if people really learn anything deep from them.",
      "AI writing tools are the controversial one. Do you think they help students or just make them lazy?",
      "Video lessons are great because you can pause and rewind. I use them all the time.",
      "Interactive whiteboards seem a bit old-fashioned now, to be honest."
    ],
    decideLines:[
      "So, the most beneficial… I'd go for video lessons. What's your view?",
      "OK, let's settle on that."
    ],
    model:"A: What do you think about online courses?\nB: I think they've been revolutionary, especially for people who live far from a university or work full time.\nA: I agree, although the drop-out rate is apparently very high. You need a lot of self-discipline.\nB: That's a good point. Learning apps are the opposite – they're designed to keep you motivated with games and rewards.\nA: True, but I sometimes wonder whether you're learning or just collecting points.\nB: Ha, I know what you mean. And what's your take on AI writing tools?\nA: It's a double-edged sword. They can explain things brilliantly, but if students just copy the answers, they don't develop their own thinking.\nB: So it depends on how they're used, really. Teachers have a big role there." },

  { id:"p3-06", title:"A good place to live", cz:"Dobré místo k životu",
    topic:"things that can make a city a good place to live",
    central:"How might these things make a city a good place to live?",
    say:"how these things might make a city a good place to live.",
    prompts:["green spaces","affordable housing","cultural events","efficient public transport","a sense of safety"],
    decision:"which two things city councils should spend most money on.",
    partnerLines:[
      "Shall we start with affordable housing? It seems to be the biggest problem in most cities now.",
      "Green spaces are underrated, I think. Parks make such a difference to people's mental health.",
      "Cultural events are nice, but are they really essential?",
      "What about safety? If you don't feel safe walking home at night, nothing else really matters.",
      "Public transport links to housing too, don't you think? If transport is good, people can live further out."
    ],
    decideLines:[
      "We need two. I'd say housing and transport. Do you agree, or would you choose something else?",
      "Fine, I'm happy with that."
    ],
    model:"A: Shall we start with affordable housing?\nB: Good idea. I'd say it's the most fundamental – if young people can't afford to live in a city, it slowly loses its life.\nA: Exactly. And that's connected to transport, isn't it? If public transport is efficient, people can live in cheaper areas and still get to work.\nB: That's a really good point. What about green spaces?\nA: I think they're essential, actually. Cities can be so stressful, and parks are often the only place you can breathe.\nB: I couldn't agree more. Cultural events, on the other hand, seem a bit less important.\nA: I'm not so sure. They're what gives a city its character – otherwise it's just somewhere you sleep and work.\nB: Fair enough, I hadn't thought of it that way." },

  { id:"p3-07", title:"A healthy lifestyle", cz:"Zdravý životní styl",
    topic:"ways in which governments could encourage people to lead healthier lives",
    central:"How effective might these measures be in encouraging healthier lifestyles?",
    say:"how effective these measures might be in encouraging healthier lifestyles.",
    prompts:["taxing sugary food","free sports facilities","health education campaigns","cycle lanes in cities","shorter working hours"],
    decision:"which measure would be the most effective.",
    partnerLines:[
      "Let's begin with taxing sugary food. It's been tried in some countries, hasn't it?",
      "I like the idea of free sports facilities, but I'm not sure people who don't exercise would suddenly start.",
      "Cycle lanes are a good one – they make exercise part of everyday life.",
      "Health campaigns… people have heard it all before, haven't they?",
      "Shorter working hours is interesting. If people had more time, maybe they'd cook properly and exercise."
    ],
    decideLines:[
      "So which one? I'm torn between cycle lanes and shorter working hours. What do you think?",
      "Alright, let's go with that."
    ],
    model:"A: Let's begin with taxing sugary food. I think it's quite effective, because it changes what companies produce.\nB: Hmm, I take your point, but don't you think it's a bit paternalistic? People should be free to choose.\nA: That's true to some extent, but children can't really choose, and they're the ones most affected.\nB: OK, that's fair. What about cycle lanes? I think they're brilliant because exercise becomes part of your commute.\nA: Absolutely – you don't need willpower, you just need a safe route.\nB: Unlike health campaigns, which rely entirely on willpower.\nA: Exactly. Everyone knows they should eat vegetables; the problem is time.\nB: Which brings us to shorter working hours – maybe that's the real solution." },

  { id:"p3-08", title:"Influences on young people", cz:"Vlivy na mladé lidi",
    topic:"things that influence young people's opinions",
    central:"How much might these things influence young people's opinions?",
    say:"how much these things might influence young people's opinions.",
    prompts:["parents","friends","social media influencers","teachers","news and documentaries"],
    decision:"which has the strongest influence nowadays.",
    partnerLines:[
      "I suppose parents are the obvious place to start. They shape our opinions before we even realise it.",
      "Friends are probably more important when you're a teenager, though, aren't they?",
      "Influencers are the tricky one. Some of them have millions of young followers.",
      "Teachers can have a huge influence, but maybe only a few really good ones.",
      "And news? I'm not sure young people watch the news much at all."
    ],
    decideLines:[
      "So nowadays… I'd honestly say social media influencers. Do you think that's too pessimistic?",
      "OK, that sounds reasonable."
    ],
    model:"A: Shall we start with parents?\nB: Sure. I think their influence is deeper than people admit. Even when teenagers rebel, they're still reacting to their parents' views.\nA: That's an interesting way of putting it. But friends probably matter more day to day.\nB: Yes, especially when it comes to fashion, music and so on. What about influencers?\nA: That's what worries me most, to be honest. They're often promoting products, but young people see them as friends.\nB: I see what you mean, but there are also influencers who talk about serious issues, like mental health.\nA: True, it's not all negative. And teachers?\nB: I had one teacher who completely changed the way I thought about history, so I'd say a good teacher can be very influential." },

  { id:"p3-09", title:"Volunteering", cz:"Dobrovolnictví",
    topic:"reasons why people volunteer",
    central:"Why might people decide to volunteer?",
    say:"why people might decide to volunteer for these reasons.",
    prompts:["to gain work experience","to meet new people","to give something back","to learn new skills","to feel useful in retirement"],
    decision:"which reason is the most common.",
    partnerLines:[
      "I'd guess work experience is a big reason for students. It looks good on a CV.",
      "Meeting new people is important too, especially if you've just moved somewhere.",
      "Giving something back – that's the most selfless reason, isn't it?",
      "What about retired people? I think volunteering gives their week some structure.",
      "Do you think it matters why people volunteer, as long as they help?"
    ],
    decideLines:[
      "The most common reason… I'd say giving something back. Or do you think that's naive?",
      "OK, we'll go with that."
    ],
    model:"A: Shall we start with work experience?\nB: Yes, I think that's probably the main motivation for students nowadays, because it's so hard to get a first job.\nA: I agree, although some people might say that's not really volunteering in the true sense.\nB: That's an interesting point. Does it matter why people do it, as long as they help?\nA: I suppose not. What about giving something back?\nB: I think that's the most admirable reason – people who've been helped themselves often want to return the favour.\nA: Exactly, and building on that, retired people often have time and experience that's being wasted otherwise.\nB: And it helps them too. My grandmother volunteers at a library, and it's given her a whole new circle of friends." },

  { id:"p3-10", title:"Attracting museum visitors", cz:"Muzea a návštěvníci",
    topic:"ways in which museums try to attract more visitors",
    central:"How successful might these ways be in attracting more visitors to museums?",
    say:"how successful these ways might be in attracting more visitors to museums.",
    prompts:["free entry","interactive exhibits","late-night openings","a good café and shop","virtual reality tours"],
    decision:"which would attract the most young people.",
    partnerLines:[
      "Free entry seems like the obvious one. Though some free museums are still empty, aren't they?",
      "Interactive exhibits are brilliant for children – I remember loving them.",
      "Late-night openings with music and drinks are becoming quite popular in some cities.",
      "A café and shop… it sounds trivial, but people do like somewhere to sit down.",
      "Virtual reality tours are interesting, but then why would you go to the museum at all?"
    ],
    decideLines:[
      "For young people, I'd go for late-night openings. Would you agree?",
      "Great, let's settle on that."
    ],
    model:"A: Free entry seems like an obvious place to start.\nB: Yes, although I'm not convinced price is the main barrier. Lots of people simply think museums are boring.\nA: That's true. So maybe interactive exhibits are more effective – they change the whole experience.\nB: I couldn't agree more. You remember things much better if you've touched or tried them.\nA: What do you think about late-night openings?\nB: I think they're a great idea for young people. A museum with music and a bar feels more like an event than a lesson.\nA: And it fits around work too. Virtual reality tours, on the other hand, might keep people at home.\nB: Unless they're used as a taster, to make people want to see the real thing." },

  { id:"p3-11", title:"Skills for the future", cz:"Dovednosti pro budoucnost",
    topic:"skills that people might need in the job market of the future",
    central:"How important might these skills be in the job market of the future?",
    say:"how important these skills might be in the job market of the future.",
    prompts:["creativity","coding","speaking several languages","adaptability","teamwork"],
    decision:"which skill schools should focus on most.",
    partnerLines:[
      "Coding is the one everyone talks about. But won't computers soon write most of the code themselves?",
      "Creativity is interesting, because it's the thing machines are worst at, at least for now.",
      "Adaptability seems essential if jobs keep changing so fast.",
      "Languages – do you think translation software will make them less important?",
      "Teamwork never goes out of date, does it?"
    ],
    decideLines:[
      "So what should schools focus on? I think adaptability, although it's hard to teach. What's your view?",
      "That's a good compromise."
    ],
    model:"A: What's your take on coding?\nB: I think it's useful, but I'm not sure it's as essential as people claim, since AI can already write a lot of code.\nA: That's a fair point. Understanding how technology works is still important, though.\nB: True. Creativity is the one I'd put first – it's what makes us different from machines.\nA: I'd agree, and adaptability goes hand in hand with it. People will probably have several careers in their lifetime.\nB: Exactly. And what about languages? Do you think translation tools will replace them?\nA: For basic things, maybe, but not for building real relationships with clients.\nB: I see what you mean. You can't really make friends through an app." },

  { id:"p3-12", title:"Community spirit", cz:"Pocit sounáležitosti",
    topic:"ways of building a sense of community in a neighbourhood",
    central:"How might these things help to build a sense of community in a neighbourhood?",
    say:"how these things might help to build a sense of community in a neighbourhood.",
    prompts:["street parties","community gardens","local social media groups","sports clubs","shared repair workshops"],
    decision:"which would be the most effective in a big city.",
    partnerLines:[
      "Street parties are fun, but they only happen once a year, don't they?",
      "Community gardens are lovely – people work side by side every week.",
      "Local social media groups – they can be useful, but they can also turn into places for complaining!",
      "Sports clubs bring together people of different ages, which is great.",
      "Repair workshops are a newer idea. I really like that they also help the environment."
    ],
    decideLines:[
      "In a big city… I'd go for community gardens. What would you pick?",
      "Alright, let's go with your suggestion then."
    ],
    model:"A: Shall we start with street parties?\nB: Sure. They're a great way to meet your neighbours for the first time, but they're a one-off.\nA: Exactly, whereas a community garden brings people together regularly, which is how real relationships form.\nB: That's a good point. Though not every neighbourhood has the space for one.\nA: True, especially in city centres. What about local social media groups?\nB: I think they're useful for practical things, like finding a lost cat, but they're not quite the same as meeting face to face.\nA: I couldn't agree more. And sometimes they create conflict rather than community!\nB: Ha, yes. Repair workshops sound interesting – you'd meet people while doing something useful." },

  { id:"p3-13", title:"Qualities of good leaders", cz:"Vlastnosti dobrého lídra",
    topic:"qualities that a good leader might need",
    central:"How important might these qualities be for a good leader?",
    say:"how important these qualities might be for a good leader.",
    prompts:["honesty","confidence","the ability to listen","experience","decisiveness"],
    decision:"which quality is the most important for a leader of a large company.",
    partnerLines:[
      "Honesty seems like a basic one, but plenty of leaders don't have it, do they?",
      "Confidence is important, but too much can be dangerous.",
      "The ability to listen – I think that's what makes people actually want to follow you.",
      "Experience matters, but some great leaders have been surprisingly young.",
      "Decisiveness is crucial in a crisis. Someone has to make the call."
    ],
    decideLines:[
      "For a big company… maybe decisiveness? Or would you say listening?",
      "OK, I'm happy to go with that."
    ],
    model:"A: Would you like to begin?\nB: Sure. I'd say honesty is fundamental. If people can't trust you, nothing else works.\nA: I agree, although in politics some very dishonest leaders have been extremely popular.\nB: That's true, unfortunately. What about confidence?\nA: It's necessary, but there's a fine line between confidence and arrogance.\nB: Exactly, and that's where the ability to listen comes in. A confident leader who also listens is ideal.\nA: Building on that, I think listening is underrated. People feel valued, so they work harder.\nB: And decisiveness? Don't you think a leader who listens too much might never make a decision?\nA: Good point. It's about balance, really." },

  { id:"p3-14", title:"Reducing food waste", cz:"Plýtvání jídlem",
    topic:"ways of reducing the amount of food that is wasted",
    central:"How effective might these ways be in reducing food waste?",
    say:"how effective these ways might be in reducing food waste.",
    prompts:["planning meals in advance","selling 'ugly' fruit and vegetables","apps that share leftover food","smaller portions in restaurants","clearer date labels"],
    decision:"which would make the biggest difference.",
    partnerLines:[
      "Planning meals in advance sounds sensible, but who actually has time for that?",
      "Selling ugly vegetables is a great idea. Most of them taste exactly the same.",
      "Have you ever used one of those apps that share leftover food? I've heard they're popular.",
      "Smaller portions in restaurants – customers might feel cheated, though.",
      "Date labels are so confusing. 'Best before' and 'use by' aren't the same thing, are they?"
    ],
    decideLines:[
      "So the biggest difference… I think clearer labels, because it affects everyone. Do you agree?",
      "Fine, that's settled."
    ],
    model:"A: Let's begin with planning meals in advance.\nB: I think it's effective, but only for organised people. Most of us shop when we're hungry and buy far too much.\nA: (laughs) That's so true. What about selling 'ugly' fruit and vegetables?\nB: I think it's brilliant. A huge amount is thrown away just because it's the wrong shape.\nA: And if it's cheaper, people on a budget benefit too.\nB: Exactly. What's your take on the apps?\nA: They're a clever idea, but I'm not sure they reach enough people yet.\nB: Whereas clearer date labels would affect everyone. I often throw things away that are probably still fine.\nA: Me too – I never know what 'best before' really means." },

  { id:"p3-15", title:"Social media and relationships", cz:"Sociální sítě a vztahy",
    topic:"ways in which social media might affect relationships",
    central:"How might social media affect these relationships?",
    say:"how social media might affect these relationships.",
    prompts:["friendships","family relationships","romantic relationships","relationships between colleagues","relationships between neighbours"],
    decision:"which relationship has been affected most.",
    partnerLines:[
      "Friendships seem the obvious one. It's easier to keep in touch, but are the friendships as deep?",
      "With family, I think it helps a lot, especially when relatives live abroad.",
      "Romantic relationships – dating apps have completely changed how people meet, haven't they?",
      "With colleagues it's a bit strange. Do you really want your boss to see your holiday photos?",
      "Neighbours is interesting. Maybe social media is the only way some neighbours communicate now!"
    ],
    decideLines:[
      "Most affected… I'd say romantic relationships. What do you think?",
      "OK, we agree then."
    ],
    model:"A: Shall we start with friendships?\nB: Yes. I think social media has made it much easier to keep in touch, especially with people who've moved away.\nA: True, but I sometimes feel those friendships become quite superficial – you just like each other's photos.\nB: That's a fair point. With family, though, I think it's mostly positive. My grandparents love seeing photos of my cousins abroad.\nA: I agree. What about romantic relationships?\nB: That's probably where the biggest change has happened. Most couples I know met online.\nA: Exactly, although it can also create jealousy – people check who their partner is following.\nB: Ha, yes, that's the dark side of it." },

  { id:"p3-16", title:"Traditions and celebrations", cz:"Tradice a oslavy",
    topic:"reasons why people celebrate important events",
    central:"Why might it be important for people to celebrate these events?",
    say:"why it might be important for people to celebrate these events.",
    prompts:["weddings","national holidays","birthdays","graduations","religious festivals"],
    decision:"which celebration is becoming less important nowadays.",
    partnerLines:[
      "Weddings are interesting – they've become so expensive. Do you think that's still worth it?",
      "National holidays bring people together, but for many it's just a day off work.",
      "Birthdays matter more for children, I think. Adults often don't bother so much.",
      "Graduations mark a real achievement, so I think they'll always be important.",
      "Religious festivals have changed a lot – many people celebrate them without being religious."
    ],
    decideLines:[
      "Becoming less important… perhaps national holidays? Or would you say weddings?",
      "Yes, I think that's right."
    ],
    model:"A: What do you think about weddings?\nB: I think they're still important, but the reason has changed. They used to be about tradition; now they're more about a personal statement.\nA: I see what you mean. And they've become incredibly expensive, which puts some couples off.\nB: Exactly. Graduations, on the other hand, seem to be getting bigger. Even primary schools have them now!\nA: Ha, that's true. I think it's because people want to recognise effort and achievement.\nB: What about religious festivals?\nA: In my country lots of people celebrate Christmas without being religious. It's more about family.\nB: So perhaps the meaning changes, but the need to come together stays the same." },

  { id:"p3-17", title:"Learning a language", cz:"Učení jazyka",
    topic:"ways of learning a foreign language",
    central:"How effective might these ways of learning a language be?",
    say:"how effective these ways of learning a language might be.",
    prompts:["taking classes","living abroad","watching films and series","using language apps","having a conversation partner"],
    decision:"which way would be best for someone who has very little time.",
    partnerLines:[
      "Living abroad is probably the most effective, but not everyone can do it.",
      "Classes give you structure, which I need, to be honest.",
      "I learnt a lot of English from series. What about you?",
      "Language apps are good for vocabulary, but I've never had a real conversation thanks to an app.",
      "A conversation partner sounds great for speaking, which is the hardest part for most people."
    ],
    decideLines:[
      "For someone with very little time… apps, maybe? Or a conversation partner once a week?",
      "Good, let's go with that."
    ],
    model:"A: Shall we start with living abroad?\nB: Sure. It's probably the most effective, because you're surrounded by the language all day.\nA: I agree, although I know people who lived abroad for years and only spoke to other foreigners.\nB: That's true – it depends on your attitude. What about films and series?\nA: For listening, they're fantastic. I picked up so many expressions that way.\nB: Me too, but it doesn't really help your speaking, does it?\nA: Not much. That's where a conversation partner comes in.\nB: Exactly. And building on that, classes give you the grammar so you can actually use what you hear." },

  { id:"p3-18", title:"Advertising", cz:"Reklama",
    topic:"places where people see advertising",
    central:"How might advertising in these places influence people?",
    say:"how advertising in these places might influence people.",
    prompts:["on social media","on public transport","during sports events","in films (product placement)","in schools"],
    decision:"where advertising should be banned.",
    partnerLines:[
      "Social media advertising is so targeted now – it almost feels like it reads your mind.",
      "On public transport, people are bored, so they actually look at the adverts.",
      "Sports events are full of sponsors. Do you even notice them any more?",
      "Product placement is clever because you don't realise you're being advertised to.",
      "Advertising in schools worries me. Children can't really judge it critically."
    ],
    decideLines:[
      "So where should it be banned? I'd definitely say schools. Anything else?",
      "Agreed."
    ],
    model:"A: Let's begin with social media.\nB: I think it's the most influential, because the adverts are tailored to you personally.\nA: Absolutely, it can be quite unsettling. I talked about running shoes once and saw adverts for days.\nB: Ha, same here. What about public transport?\nA: I think it's less powerful – people are mostly looking at their phones anyway.\nB: True. Product placement is interesting, though, because it's so subtle.\nA: Exactly, you're influenced without noticing, which is arguably more dangerous.\nB: Building on that, advertising in schools worries me most. Children are especially vulnerable.\nA: I couldn't agree more. I think that's where we should draw the line." },

  { id:"p3-19", title:"Taking risks", cz:"Riskování",
    topic:"risky activities that some people choose to do",
    central:"Why might people choose to do these risky activities?",
    say:"why people might choose to do these risky activities.",
    prompts:["skydiving","starting a business","travelling alone","moving to another country","changing career in mid-life"],
    decision:"which activity involves the greatest risk.",
    partnerLines:[
      "Skydiving is the obvious physical risk. I think people do it for the adrenaline.",
      "Starting a business is risky financially, but the rewards can be huge.",
      "Travelling alone – for some people that's terrifying, for others it's completely normal.",
      "Moving to another country is a big one. You leave your whole support network behind.",
      "Changing career in mid-life takes real courage, especially if you have a family."
    ],
    decideLines:[
      "The greatest risk… I'd say starting a business, because you could lose everything. What about you?",
      "OK, that's fair."
    ],
    model:"A: Shall we start with skydiving?\nB: Sure. I think people do it for the thrill, and maybe to prove something to themselves.\nA: Probably. Though statistically it's safer than many people think.\nB: Interesting. Starting a business seems riskier to me in some ways – you could lose your savings.\nA: That's true, but people do it because they want independence and to build something of their own.\nB: Building on that, changing career in mid-life is similar. People want meaning, even if it means earning less.\nA: Exactly, and it's harder when you have a mortgage and children.\nB: What about travelling alone? I don't really see that as risky.\nA: For some people it is – especially if they've never done it." },

  { id:"p3-20", title:"The changing workplace", cz:"Proměna pracoviště",
    topic:"changes that are happening in the workplace",
    central:"How might these changes affect people's working lives?",
    say:"how these changes might affect people's working lives.",
    prompts:["working from home","a four-day week","open-plan offices","automation","flexible working hours"],
    decision:"which change is the most positive for employees.",
    partnerLines:[
      "Working from home has changed everything, hasn't it? No commute, but it can be lonely.",
      "A four-day week sounds amazing, but can every company afford it?",
      "Open-plan offices – I find them really distracting, to be honest.",
      "Automation worries a lot of people. Do you think it will take more jobs than it creates?",
      "Flexible hours are great for parents, I think."
    ],
    decideLines:[
      "Most positive for employees… I'd go for the four-day week. Would you?",
      "Right, let's agree on that."
    ],
    model:"A: Shall we start with working from home?\nB: Good idea. I think it's been mostly positive – no commuting, more time with family.\nA: I agree, although some people feel quite isolated, especially young people starting their careers.\nB: That's a really good point. They miss out on learning from colleagues.\nA: Exactly. What about open-plan offices?\nB: I'm not a fan, to be honest. They're supposed to encourage communication, but most people just wear headphones.\nA: Ha, that's true. And automation?\nB: That's the one that worries me. It might remove boring tasks, but it could also make some jobs disappear completely.\nA: I see what you mean, but historically new technology has always created new types of jobs too." }
],

/* ---------- PART 4: discussion questions linked to Part 3 (p3 = id of the linked Part 3 task).
   items: {q, outline: Czech answer plan, phrases: English phrase suggestions}. model = sample answer to items[0]. ---------- */
p4: [
  { id:"p4-01", p3:"p3-01", items:[
    { q:"Why do you think so many people feel stressed nowadays?", outline:"Názor: tempo života a neustálá dostupnost. Důvod: práce v telefonu i doma. Příklad: e-maily večer. Protiargument: dřív jiné, možná horší starosti.", phrases:["There's no denying that…","This, in turn, leads to…","Having said that, …"] },
    { q:"Some people say a certain amount of stress is good for us. What do you think?", outline:"Částečný souhlas: krátkodobý stres motivuje (zkoušky, termíny). Rozlišit krátkodobý vs. chronický. Příklad: sportovci před závodem.", phrases:["To a certain extent, …","It's not so much … as …","Take … for example."] },
    { q:"Should employers be responsible for their employees' mental health?", outline:"Ano, částečně: rozumná pracovní zátěž, pružná doba. Ale hranice: soukromý život je věc jednotlivce. Příklad: firemní psycholog.", phrases:["It could be argued that…","Ultimately, …","The key issue here is…"] },
    { q:"Do you think schools should teach young people how to deal with stress?", outline:"Ano: dovednost na celý život, prevence. Příklad: krátké dechové techniky před testem. Riziko: další předmět navíc = další stres.", phrases:["It goes without saying that…","In the long run, …","The flip side is that…"] },
    { q:"Is modern technology more of a cause of stress or a solution to it?", outline:"Dvousečná zbraň: notifikace vs. aplikace na meditaci. Záleží na tom, jak ji používáme. Závěr: problém je v návycích, ne v technologii.", phrases:["It's a double-edged sword.","Whether … or not depends on…","All things considered, …"] }],
    model:"I think it's largely to do with the pace of modern life. We're expected to be available all the time – people answer work emails late at night and check their phones the moment they wake up, so we never really switch off. On top of that, there's huge pressure, particularly on young people, to be successful in every area of life at once. Having said that, I'm not sure people in the past were less stressed; they just had different worries, like poverty or illness, and perhaps talked about it less." },

  { id:"p4-02", p3:"p3-02", items:[
    { q:"Is it better to choose a job you love or a job that pays well?", outline:"Ideálně obojí; když ne – láska k práci, ale s minimem jistoty. Příklad: učitel vs. bankéř. Protiargument: rodina, hypotéka.", phrases:["Ideally, …","That's not to say that…","It's a matter of priorities."] },
    { q:"Should young people be given more help in choosing a career at school?", outline:"Ano: praxe, setkání s odborníky. Dnes mnoho studentů neví, co obnáší konkrétní práce. Ale rozhodnutí je jejich.", phrases:["A good example of this is…","In my experience, …","Ultimately, …"] },
    { q:"Do you think the idea of a 'job for life' has disappeared?", outline:"Většinou ano: technologie, změny trhu. Lidé mění obor několikrát. Výjimka: státní správa, některé profese (lékaři).", phrases:["By and large, …","This is particularly true of…","I can't see … happening any time soon."] },
    { q:"How much should parents influence their children's career choices?", outline:"Radit ano, rozhodovat ne. Příklad: rodiče lékaři tlačí dítě na medicínu. Riziko nespokojenosti.", phrases:["Up to a point, …","The danger is that…","I'd go so far as to say…"] },
    { q:"Why do some people decide to change career completely later in life?", outline:"Hledání smyslu, vyhoření, nové příležitosti. Příklad: právník, který se stal truhlářem. Odvaha i finanční riziko.", phrases:["One of the main reasons is…","As a result, …","Admittedly, …"] }],
    model:"In an ideal world you'd have both, of course. But if I had to choose, I'd say it's better to do something you genuinely enjoy, because you spend such a large part of your life at work. I've seen people in well-paid jobs who are utterly miserable, and no amount of money seems to make up for it. That's not to say money doesn't matter – if you're struggling to pay the rent, that's a huge source of stress. So I suppose the answer is a job you love that pays enough to live on comfortably." },

  { id:"p4-03", p3:"p3-03", items:[
    { q:"Is it the responsibility of individuals or governments to protect the environment?", outline:"Obojí, ale hlavní páka je u vlád a firem (zákony, infrastruktura). Jednotlivci: tlak a návyky. Příklad: zálohování lahví.", phrases:["It's not so much … as…","The key issue here is…","On top of that, …"] },
    { q:"Do you think people are more environmentally aware than they were twenty years ago?", outline:"Ano, povědomí roste (třídění, média). Ale chování se mění pomaleji – víc létáme a nakupujeme.", phrases:["There's no denying that…","That said, …","The flip side is that…"] },
    { q:"Should flying be made more expensive to protect the environment?", outline:"Částečně: daň z letenek, investice do vlaků. Ale nespravedlivé pro chudší. Kompromis: daň pro časté letce.", phrases:["It could be argued that…","How about … as a compromise?","In the short term, …"] },
    { q:"Can one person really make a difference to environmental problems?", outline:"Sám málo, ale příklad táhne; změna norem ve společnosti. Příklad: aktivisté, kteří ovlivnili politiku.", phrases:["I'm inclined to think that…","Take … for example.","In the long run, …"] },
    { q:"What environmental problems do you think will be most serious in the future?", outline:"Nedostatek vody, extrémní počasí, ztráta biodiverzity. Dopad na zemědělství a migraci.", phrases:["It's likely that in the future…","What worries me is…","This, in turn, leads to…"] }],
    model:"I'd say it has to be both, but governments have far more power to make a real difference. An individual can recycle and cycle to work, which is great, but it's governments that decide whether there are safe cycle lanes in the first place, or whether companies are allowed to pollute rivers. That said, individuals aren't powerless, because governments respond to what voters care about. If enough people change their habits and make their voices heard, politicians eventually follow. So it's really a partnership, although the heavy lifting should be done by those with the power to change the rules." },

  { id:"p4-04", p3:"p3-04", items:[
    { q:"Do you think travel really broadens the mind?", outline:"Může, pokud cestovatel opravdu poznává místní život. Ne při 'all-inclusive' pobytu. Příklad: bydlení u místní rodiny.", phrases:["Whether … or not depends on…","Generally speaking, …","A good example of this is…"] },
    { q:"What are the negative effects of tourism on popular destinations?", outline:"Přeplněnost, ceny bydlení, ztráta autenticity. Příklad: centra historických měst bez místních. Ale peníze a pracovní místa.", phrases:["The flip side is that…","This is particularly true of…","Admittedly, …"] },
    { q:"Should young people take a gap year before university?", outline:"Výhody: zralost, zkušenosti, jasnější cíle. Nevýhody: ztráta motivace, finance. Záleží na plánu.", phrases:["On the one hand, … On the other hand, …","It depends on…","All things considered, …"] },
    { q:"Will people travel more or less in the future, do you think?", outline:"Možná více (levné lety, práce na dálku), ale klima a ceny mohou omezit. Více cestování vlakem, blíž.", phrases:["It's likely that in the future…","There's bound to be…","I can't see … happening any time soon."] },
    { q:"Is virtual travel, for example through VR, a good substitute for the real thing?", outline:"Ne úplně: chybí lidé, jídlo, vůně, nečekané situace. Ale užitečné pro lidi, kteří cestovat nemohou.", phrases:["I'd go so far as to say…","That's not to say that…","Ultimately, …"] }],
    model:"It can, but I don't think it does automatically. If you spend a week in a resort where everything is exactly like home – the same food, the same language – you probably won't come back with a very different outlook. But if you make an effort to talk to local people, try to understand how they live and what they care about, then yes, it can be eye-opening. A friend of mine stayed with a family in rural Morocco, and she said it completely changed the way she thought about hospitality. So it really depends on the attitude of the traveller." },

  { id:"p4-05", p3:"p3-05", items:[
    { q:"Will teachers ever be replaced by technology?", outline:"Ne úplně: lidský vztah, motivace, výchova. Technologie převezme část výkladu a opravování. Role učitele se změní na průvodce.", phrases:["I can't see … happening any time soon.","It's likely that…","Ultimately, …"] },
    { q:"Should children be allowed to use phones in school?", outline:"Omezeně: zákaz o přestávkách pro sociální kontakt, ale použití ve výuce. Příklad: země, které zavedly zákaz.", phrases:["Up to a point, …","A good example of this is…","The key issue here is…"] },
    { q:"What are the disadvantages of studying online?", outline:"Izolace, nízká motivace, technické problémy, méně spontánní diskuse. Ale flexibilita.", phrases:["One of the main reasons is…","As a result, …","Having said that, …"] },
    { q:"How might AI change the way students are assessed?", outline:"Méně domácích esejí, více ústních zkoušek a projektů. Hodnocení procesu, ne jen výsledku.", phrases:["It's likely that in the future…","This, in turn, leads to…","It's not so much … as …"] },
    { q:"Do you think technology has made students lazier?", outline:"Částečně – snadné odpovědi. Ale umožňuje hlubší studium těm, kdo chtějí. Problém je motivace, ne nástroj.", phrases:["It's widely believed that…, but…","To a certain extent, …","In my experience, …"] }],
    model:"I can't see it happening any time soon, at least not completely. Technology is fantastic at delivering information, and I'm sure it'll take over a lot of things like marking or explaining basic grammar. But a good teacher does far more than that. They notice when a student is struggling, they motivate people who've lost interest, and they act as role models. I remember a maths teacher who made me believe I could actually do the subject – I can't imagine an app doing that. So I think teachers' roles will change, but they won't disappear." },

  { id:"p4-06", p3:"p3-06", items:[
    { q:"Why do so many young people move from the countryside to cities?", outline:"Práce, studium, kultura, anonymita. Příklad: vesnice bez školy a dopravy. Ale návrat s prací na dálku.", phrases:["One of the main reasons is…","This, in turn, leads to…","Having said that, …"] },
    { q:"What can be done to make housing more affordable for young people?", outline:"Více výstavby, regulace krátkodobých pronájmů, podpora družstev. Příklad: Vídeň a obecní byty.", phrases:["A good example of this is…","It could be argued that…","In the long run, …"] },
    { q:"Should cars be banned from city centres?", outline:"Částečně: pěší zóny, výjimky pro zásobování a postižené. Kvalitní MHD jako podmínka.", phrases:["Up to a point, …","How about … as a compromise?","Ultimately, …"] },
    { q:"Do you think cities will look very different in fifty years?", outline:"Více zeleně kvůli vedrům, méně aut, chytrá doprava. Historická centra zůstanou.", phrases:["It's likely that in the future…","There's bound to be…","By and large, …"] },
    { q:"Is it better to grow up in a city or in the countryside?", outline:"Venkov: svoboda, příroda. Město: možnosti, kroužky, rozmanitost. Ideál: menší město.", phrases:["On the one hand, … On the other hand, …","In my experience, …","All things considered, …"] }],
    model:"I think it's mainly a question of opportunities. In many rural areas there simply aren't enough jobs, especially skilled ones, so if you've studied something specialised, you more or less have to move. On top of that, cities offer things young people value – a social life, cultural events, a sense of anonymity even. This, in turn, leads to a vicious circle, because when young people leave, shops and schools close, and the village becomes even less attractive. Having said that, remote working might reverse the trend a little, as some people realise they can have a city salary and a country lifestyle." },

  { id:"p4-07", p3:"p3-07", items:[
    { q:"Why do you think people find it so hard to change unhealthy habits?", outline:"Pohodlí, nedostatek času, okamžitá odměna (sladkosti). Zvyky jsou automatické. Příklad: novoroční předsevzetí.", phrases:["One of the main reasons is…","Take … for example.","It's a matter of…"] },
    { q:"Should healthcare be cheaper for people who lead healthy lives?", outline:"Spíše ne: nespravedlivé, nemoci nejsou jen o životním stylu, kontrola soukromí. Lepší motivace než trest.", phrases:["I'm not entirely convinced that…","The key issue here is…","What worries me is…"] },
    { q:"How much influence does advertising have on what people eat?", outline:"Velký, hlavně u dětí. Příklad: reklamy na sladké cereálie. Regulace v některých zemích.", phrases:["There's no denying that…","This is particularly true of…","As a result, …"] },
    { q:"Are people today healthier than their grandparents were?", outline:"Delší život, lepší medicína; ale méně pohybu, více obezity a stresu. Smíšený obraz.", phrases:["In some ways… in others…","Generally speaking, …","The flip side is that…"] },
    { q:"Is it the role of schools to teach children about healthy eating?", outline:"Ano, spolu s rodinou: školní jídelny jako příklad, vaření jako předmět. Rodina ale klíčová.", phrases:["It goes without saying that…","I'd like to add that…","Ultimately, …"] }],
    model:"I think the main reason is that unhealthy habits usually give us an immediate reward, whereas the benefits of healthy ones only appear much later. Eating a bar of chocolate makes you feel good right now, while going to the gym might only show results after several months. On top of that, habits become automatic – we don't really decide to reach for our phone instead of going for a walk; we just do it. Take New Year's resolutions, for example: most people give up by February. So I'd say change only lasts if you make the healthy option the easy one." },

  { id:"p4-08", p3:"p3-08", items:[
    { q:"Are young people today more independent-minded than previous generations?", outline:"V něčem ano (přístup k informacím, kritika autorit), ale silný tlak skupiny a algoritmů. Smíšený obraz.", phrases:["It's widely believed that…, but…","To a certain extent, …","The flip side is that…"] },
    { q:"Should influencers be regulated in the same way as advertisers?", outline:"Ano, pokud propagují produkty – povinné označení reklamy. Ochrana mladých. Ale svoboda projevu.", phrases:["It goes without saying that…","The key issue here is…","Having said that, …"] },
    { q:"How can young people learn to think critically about what they see online?", outline:"Mediální výchova ve škole, ověřování zdrojů, diskuse doma. Příklad: cvičení s falešnými zprávami.", phrases:["A good example of this is…","In my experience, …","In the long run, …"] },
    { q:"Do you think celebrities have a responsibility to be good role models?", outline:"Do určité míry: vědí, že je sledují děti. Ale jsou to jen lidé; zodpovědnost hlavně rodičů.", phrases:["Up to a point, …","That's not to say that…","Ultimately, …"] },
    { q:"Who influenced your opinions most when you were growing up?", outline:"Osobní: konkrétní osoba, příklad situace, co se změnilo. Rozvinout, ne jen jméno.", phrases:["Looking back, …","I'd have to say…","What I appreciated most was…"] }],
    model:"It's widely believed that they are, because they have access to so much information and they're far more willing to question authority than my grandparents' generation ever was. To a certain extent I think that's true – young people are often the ones pushing for change on issues like climate or equality. The flip side, though, is that much of what they see online is filtered by algorithms, so they may only encounter opinions they already agree with. And peer pressure on social media is enormous. So I'd say they're more outspoken, but not necessarily more independent in their thinking." },

  { id:"p4-09", p3:"p3-09", items:[
    { q:"Should volunteering be a compulsory part of education?", outline:"Výhody: empatie, zkušenost. Nevýhoda: nucení ničí smysl. Kompromis: nabídka a uznání, ne povinnost.", phrases:["It could be argued that…","How about … as a compromise?","The danger is that…"] },
    { q:"Why do some people never volunteer?", outline:"Nedostatek času, nevědí jak, pocit, že nepomohou. Příklad: pracující rodiče.", phrases:["One of the main reasons is…","It's not so much … as…","Admittedly, …"] },
    { q:"Do charities rely too much on volunteers?", outline:"Někdy ano – kvalifikované role by měly být placené. Ale bez dobrovolníků by mnohé zanikly.", phrases:["To a certain extent, …","That's not to say that…","All things considered, …"] },
    { q:"Is giving money to charity as valuable as giving your time?", outline:"Obojí hodnotné; peníze efektivnější pro odborné úkoly, čas buduje vztahy a komunitu.", phrases:["It depends on…","In some cases… in others…","Ultimately, …"] },
    { q:"How has technology changed the way people help others?", outline:"Online sbírky, crowdfunding, dobrovolnictví na dálku (překlady). Riziko podvodů.", phrases:["A good example of this is…","There's no denying that…","The flip side is that…"] }],
    model:"I can see the appeal of the idea, because volunteering can teach young people empathy and give them experience of the world outside school. However, I think making it compulsory risks defeating the purpose. Volunteering is supposed to be something you choose to do; if students are forced into it, many of them will just go through the motions, and the people they're meant to be helping might notice that. Perhaps a better compromise would be for schools to offer lots of opportunities and give students credit for taking part, without making it an obligation." },

  { id:"p4-10", p3:"p3-10", items:[
    { q:"Should museums return objects to the countries they originally came from?", outline:"V mnoha případech ano, zvlášť u předmětů získaných násilím. Ale někdy chybí podmínky uchování. Spolupráce, zápůjčky.", phrases:["It goes without saying that…","In some cases…","How about … as a compromise?"] },
    { q:"Is it important for children to visit museums?", outline:"Ano: učení zážitkem, kontext k výuce. Musí být ale zajímavě podané, jinak odradí.", phrases:["In my experience, …","That's not to say that…","It makes a real difference."] },
    { q:"Should governments fund the arts when there are other priorities like healthcare?", outline:"Ano, v rozumné míře: kultura je součást kvality života a identity, přináší i turismus. Priority se nevylučují.", phrases:["It could be argued that…","It's not so much … as…","In the long run, …"] },
    { q:"Will people still go to museums in the future, or will everything be online?", outline:"Budou: autentický zážitek, společenská akce. Online jako doplněk a pro lidi, kteří nemohou přijet.", phrases:["I can't see … happening any time soon.","It's likely that…","Ultimately, …"] },
    { q:"What makes a museum exhibition memorable?", outline:"Příběh, interaktivita, osobní souvislost, překvapení. Osobní příklad výstavy.", phrases:["What struck me was…","A good example of this is…","Generally speaking, …"] }],
    model:"In many cases, yes, I think they should, particularly when objects were taken during colonial times without any real consent. It goes without saying that these objects are part of a nation's identity, and it seems unfair that people have to travel thousands of kilometres to see their own heritage. Having said that, it's not always straightforward – sometimes the original country doesn't have the facilities to preserve fragile items properly. So a compromise might be long-term loans or joint exhibitions, where the museums work together rather than arguing about ownership." },

  { id:"p4-11", p3:"p3-11", items:[
    { q:"Do you think schools prepare young people well for the world of work?", outline:"Částečně: znalosti ano, praktické dovednosti (komunikace, finance, týmová práce) méně. Příklad: stáže.", phrases:["To a certain extent, …","The key issue here is…","A good example of this is…"] },
    { q:"Will artificial intelligence create more jobs than it destroys?", outline:"Dlouhodobě možná ano (historie technologií), ale krátkodobě bolestné přechody pro určité profese.", phrases:["In the long run, …","In the short term, …","It's hard to say, but…"] },
    { q:"Should people be expected to keep learning throughout their lives?", outline:"Ano, dnes nutnost; ale firmy a stát by měly pomáhat (čas, peníze). Příklad: rekvalifikace.", phrases:["It goes without saying that…","I'd like to add that…","Ultimately, …"] },
    { q:"Are university degrees still as valuable as they used to be?", outline:"Méně exkluzivní, víc absolventů. Některé obory stále klíčové; jinde praxe a certifikáty.", phrases:["It's widely believed that…, but…","This is particularly true of…","By and large, …"] },
    { q:"Which jobs do you think will always be done by humans?", outline:"Péče (sestry), kreativní a vztahové práce, řemesla v nepředvídatelném prostředí.", phrases:["I'm inclined to think that…","It's likely that…","Take … for example."] }],
    model:"To a certain extent, yes. Schools are good at giving people a broad base of knowledge, and they teach discipline and how to meet deadlines. But I think there's a real gap when it comes to practical skills. Many young people leave school without knowing how to write a professional email, manage their money or work in a team on a long project. A good example of what works is the system of work placements in some countries, where students spend a few weeks in a company. That gives them a much clearer idea of what working life is actually like." },

  { id:"p4-12", p3:"p3-12", items:[
    { q:"Do people know their neighbours less than they used to?", outline:"Ve městech ano: stěhování, práce, anonymita. Na vesnici méně změn. Ale skupiny online pomáhají.", phrases:["Generally speaking, …","This is particularly true of…","Having said that, …"] },
    { q:"Why is a sense of community important?", outline:"Bezpečí, vzájemná pomoc, méně osamělosti, zvlášť pro seniory. Příklad: pomoc během pandemie.", phrases:["There's no denying that…","A good example of this is…","As a result, …"] },
    { q:"Should local councils spend money on community events?", outline:"Ano, levné a efektivní; posilují soudržnost a místní podnikání. Ale ne na úkor základních služeb.", phrases:["It could be argued that…","In the long run, …","That's not to say that…"] },
    { q:"Can online communities replace real-life ones?", outline:"Doplňují, nenahrazují – pro lidi se specifickými zájmy jsou cenné, ale fyzická pomoc chybí.", phrases:["To a certain extent, …","The flip side is that…","Ultimately, …"] },
    { q:"How can older and younger people be brought together?", outline:"Společné projekty: školy v domovech seniorů, sdílené bydlení, mentoring, technologie. Oboustranný přínos.", phrases:["One idea would be…","Both sides would benefit…","In my experience, …"] }],
    model:"Generally speaking, I think they do, particularly in big cities. People move house much more often than they used to, they work long hours and often commute a long way, so there's simply less time to get to know the people next door. This is particularly true of blocks of flats, where you can live for years without knowing the names of the people on your floor. Having said that, I've noticed that local online groups have brought some neighbours together again, especially during the pandemic, when people started helping each other with shopping." },

  { id:"p4-13", p3:"p3-13", items:[
    { q:"Are leaders born or made?", outline:"Kombinace: některé vlastnosti vrozené (charisma), ale vedení se dá naučit zkušeností. Příklad: kapitán týmu.", phrases:["It's not so much … as…","To a certain extent, …","In my experience, …"] },
    { q:"Why do so few people want to go into politics nowadays?", outline:"Kritika na sociálních sítích, ztráta soukromí, nízká důvěra. Důsledek: méně kvalitních kandidátů.", phrases:["One of the main reasons is…","This, in turn, leads to…","What worries me is…"] },
    { q:"Should there be more young people in positions of leadership?", outline:"Ano: nové pohledy, technologie, klima. Ale zkušenost je cenná – ideální mix generací.", phrases:["It could be argued that…","Having said that, …","Ideally, …"] },
    { q:"Is it possible to be a good leader and be popular at the same time?", outline:"Někdy ne: dobré rozhodnutí bývá nepopulární. Respekt důležitější než obliba.", phrases:["The key issue here is…","It's not so much … as…","Ultimately, …"] },
    { q:"What can schools do to develop leadership skills in children?", outline:"Projekty, studentská rada, sport, střídání rolí ve skupině. Učit i následovat.", phrases:["A good example of this is…","It goes without saying that…","I'd like to add that…"] }],
    model:"I'd say it's not so much one or the other as a combination of both. Some people are clearly born with a certain confidence or charisma that makes others want to listen to them. But I think the most important leadership skills – listening, making difficult decisions, dealing with conflict – are learnt through experience. In my experience, the best captains in sports teams I've played in weren't necessarily the most talented or the loudest; they were the ones who'd learnt to read people and knew when to encourage and when to push." },

  { id:"p4-14", p3:"p3-14", items:[
    { q:"Why do you think people waste so much food?", outline:"Velké nákupy, akce 2+1, nejasné datum, vysoké nároky na vzhled. Jídlo je relativně levné.", phrases:["One of the main reasons is…","On top of that, …","It's a matter of…"] },
    { q:"Should supermarkets be forced to give unsold food to charities?", outline:"Ano – některé země to už mají (Francie). Nutná logistika a bezpečnost potravin.", phrases:["A good example of this is…","It could be argued that…","Admittedly, …"] },
    { q:"Do people value food less than in the past?", outline:"Ano, bylo dražší a vzácnější; prarodiče nic nevyhazovali. Dnes jídlo všude a levné.", phrases:["Looking back, …","Generally speaking, …","As a result, …"] },
    { q:"Is cooking a skill that everyone should learn?", outline:"Ano: zdraví, peníze, méně odpadu. Měla by to učit škola i rodina.", phrases:["It goes without saying that…","In the long run, …","I'd go so far as to say…"] },
    { q:"How might the way we produce food change in the future?", outline:"Vertikální farmy, laboratorní maso, méně masa, lokální produkce. Ale cena a přijetí.", phrases:["It's likely that in the future…","There's bound to be…","I can't see … happening any time soon."] }],
    model:"I think one of the main reasons is that food is relatively cheap compared to what it used to be, so throwing some away doesn't feel like a big loss. On top of that, supermarkets encourage us to buy more than we need with special offers like 'buy two, get one free', and then half of it goes off before we can eat it. There's also a lot of confusion about date labels – people throw food away simply because the date has passed, even when it's perfectly safe. It's a matter of habits and awareness, really." },

  { id:"p4-15", p3:"p3-15", items:[
    { q:"Do you think people are lonelier now, despite being more connected?", outline:"Paradox: mnoho kontaktů, málo hlubokých vztahů. Srovnávání s ostatními. Ale online pomáhá izolovaným.", phrases:["It's a double-edged sword.","There's no denying that…","The flip side is that…"] },
    { q:"Should there be a minimum age for using social media?", outline:"Ano a mělo by se lépe kontrolovat; vliv na sebevědomí dětí. Ale zákaz sám nestačí – výchova.", phrases:["It goes without saying that…","The key issue here is…","Having said that, …"] },
    { q:"How has social media changed the way people communicate?", outline:"Kratší zprávy, obrázky, rychlost; méně telefonování. Příklad: emoji místo slov.", phrases:["A good example of this is…","As a result, …","Generally speaking, …"] },
    { q:"Is it possible to have a real friendship with someone you've only met online?", outline:"Ano, sdílené zájmy, upřímnost; ale bez osobního setkání některé roviny chybí.", phrases:["In my experience, …","To a certain extent, …","That's not to say that…"] },
    { q:"What responsibility do social media companies have for their users' wellbeing?", outline:"Velkou: algoritmy podporují závislost. Transparentnost, ochrana dětí, regulace.", phrases:["It could be argued that…","What worries me is…","Ultimately, …"] }],
    model:"It does seem to be a paradox. We have hundreds of online friends, and we can talk to anyone in the world instantly, and yet surveys suggest more and more people feel lonely. I think part of the reason is that online contact is often quite superficial – liking someone's photo isn't the same as sitting down for a coffee together. There's also the problem of comparison: everyone else's life looks perfect online. The flip side, though, is that for people who are isolated, for example elderly people or those with health problems, social media can be a lifeline." },

  { id:"p4-16", p3:"p3-16", items:[
    { q:"Why do you think traditions are important to people?", outline:"Identita, kontinuita, rodinná soudržnost, jistota v proměnlivém světě. Příklad: Vánoce u babičky.", phrases:["One of the main reasons is…","Take … for example.","It gives people a sense of…"] },
    { q:"Are some traditions disappearing in your country?", outline:"Ano: lidové zvyky na venkově, ručně dělané dekorace. Některé se ale vracejí v nové podobě.", phrases:["Generally speaking, …","Having said that, …","This is particularly true of…"] },
    { q:"Have celebrations become too commercial?", outline:"Často ano – nákupní horečka, Black Friday, dárky. Ale záleží na rodině, jak slaví.", phrases:["There's no denying that…","That's not to say that…","Ultimately, …"] },
    { q:"Is it good when countries adopt celebrations from other cultures, like Halloween?", outline:"Kulturní výměna je přirozená; riziko je jen ztráta vlastních tradic. Obojí může existovat.", phrases:["On the one hand, … On the other hand, …","By and large, …","I'd go so far as to say…"] },
    { q:"Should schools teach children about traditions from different cultures?", outline:"Ano: tolerance, porozumění spolužákům. Příklad: multikulturní třídy.", phrases:["It goes without saying that…","A good example of this is…","In the long run, …"] }],
    model:"I think traditions give people a sense of belonging and continuity. In a world that's changing so quickly, it's reassuring to do certain things in exactly the same way every year, the way your parents and grandparents did. Take Christmas in my family, for example – we always make the same biscuits from my great-grandmother's recipe, and even though nobody is particularly religious, it's something that connects all the generations. Traditions also give us a reason to come together, which I think is more important than ever, now that families often live far apart." },

  { id:"p4-17", p3:"p3-17", items:[
    { q:"At what age should children start learning a foreign language?", outline:"Co nejdřív – přirozená výslovnost a hravost. Ale záleží na kvalitě výuky, ne jen věku.", phrases:["It's widely believed that…","Whether … or not depends on…","In my experience, …"] },
    { q:"Will translation technology make learning languages unnecessary?", outline:"Ne úplně: kultura, vztahy, nuance, humor. Pro základní komunikaci možná ano.", phrases:["I can't see … happening any time soon.","To a certain extent, …","Ultimately, …"] },
    { q:"Is English becoming too dominant in the world?", outline:"Výhoda pro komunikaci, ale ohrožení menších jazyků a kultur. Příklad: angličtina ve vědě.", phrases:["It's a double-edged sword.","What worries me is…","The flip side is that…"] },
    { q:"What are the benefits of speaking more than one language, apart from communication?", outline:"Kognitivní flexibilita, kariéra, empatie, pochopení vlastního jazyka.", phrases:["On top of that, …","There's some evidence that…","A good example of this is…"] },
    { q:"Why do some people find it much easier to learn languages than others?", outline:"Motivace, příležitosti, osobnost (ostych), sluch; talent hraje menší roli, než se myslí.", phrases:["It's not so much … as…","One of the main reasons is…","In my experience, …"] }],
    model:"It's widely believed that the earlier the better, and to some extent I'd agree. Young children pick up pronunciation remarkably easily, and they aren't afraid of making mistakes, which is a huge advantage. However, whether early learning works or not depends on the quality of the teaching. In my experience, an hour a week of repeating colours and numbers doesn't achieve much. What really matters is regular exposure and making the language fun and meaningful. Older learners, on the other hand, are often faster at grammar because they can understand rules." },

  { id:"p4-18", p3:"p3-18", items:[
    { q:"Do you think advertising makes people buy things they don't need?", outline:"Často ano – vytváří potřeby a nespokojenost. Ale informuje i o užitečných produktech.", phrases:["There's no denying that…","Having said that, …","To a certain extent, …"] },
    { q:"Should advertising aimed at children be banned?", outline:"Ano, nebo přísně omezena – děti nerozliší reklamu. Příklad: země se zákazem v TV.", phrases:["It goes without saying that…","A good example of this is…","The key issue here is…"] },
    { q:"How has online advertising changed the way companies sell products?", outline:"Cílení podle dat, influenceři, personalizace; menší firmy mají šanci. Otázky soukromí.", phrases:["As a result, …","What worries me is…","On the one hand, … On the other hand, …"] },
    { q:"Are people today more sceptical about advertising than in the past?", outline:"Ano, vědí, jak funguje; ale skrytá reklama (influenceři) obchází skepsi.", phrases:["Generally speaking, …","The flip side is that…","It's not so much … as…"] },
    { q:"Can advertising ever be a force for good?", outline:"Ano: kampaně za zdraví, bezpečnost na silnicích, dárcovství krve. Kreativita s pozitivním cílem.", phrases:["Take … for example.","I'd go so far as to say…","Ultimately, …"] }],
    model:"There's no denying that it does, at least some of the time. The whole point of advertising is to make us feel that our lives would be better with a particular product, so it often creates needs that weren't there before. I've definitely bought things after seeing an advert online and then hardly used them. Having said that, advertising isn't all negative – it also tells us about new products that might genuinely be useful. So to a certain extent it's up to us as consumers to stop and ask ourselves whether we really need something before buying it." },

  { id:"p4-19", p3:"p3-19", items:[
    { q:"Why are some people more willing to take risks than others?", outline:"Osobnost, výchova, zkušenosti s úspěchem/neúspěchem, finanční zázemí (záchranná síť).", phrases:["One of the main reasons is…","It's not so much … as…","In my experience, …"] },
    { q:"Do you think young people today are too cautious?", outline:"V něčem ano (méně svobody v dětství, bezpečnost); v jiném riskují (sociální sítě, kryptoměny).", phrases:["It's widely believed that…, but…","To a certain extent, …","The flip side is that…"] },
    { q:"Should parents let children take risks?", outline:"Ano, přiměřená rizika – učí odhadnout nebezpečí a odolnosti. Příklad: lezení na stromy.", phrases:["It goes without saying that…","Take … for example.","In the long run, …"] },
    { q:"Is it fair that the public pays for rescuing people who do dangerous sports?", outline:"Složité: povinné pojištění jako řešení; ale záchrana musí být dostupná vždy.", phrases:["It could be argued that…","How about … as a compromise?","Ultimately, …"] },
    { q:"What's the biggest risk you've ever taken?", outline:"Osobní příběh: situace, proč, výsledek, co ses naučil. Minulé časy, rozvinutí.", phrases:["Looking back, …","At the time, …","If I hadn't…, I would never have…"] }],
    model:"I think it's partly about personality – some people simply get a buzz from uncertainty, while others find it terrifying. But I'd say it's not so much personality as circumstances in many cases. If you have a safety net, for example parents who can support you if things go wrong, it's much easier to start a business or move abroad. Someone with no savings and a family to feed can't afford to fail. In my experience, upbringing matters too: children who were allowed to try things and fail usually grow up more willing to take chances." },

  { id:"p4-20", p3:"p3-20", items:[
    { q:"Do you think the traditional office will disappear in the future?", outline:"Ne úplně: hybridní model. Kancelář jako místo setkání a spolupráce, ne každodenní práce.", phrases:["I can't see … happening any time soon.","It's likely that…","Generally speaking, …"] },
    { q:"How important is it to have a good relationship with your colleagues?", outline:"Velmi: motivace, spokojenost, spolupráce. Příklad: odchod z dobře placené práce kvůli kolektivu.", phrases:["It makes a real difference.","A good example of this is…","Ultimately, …"] },
    { q:"Should employees be allowed to choose their own working hours?", outline:"Kde to jde, ano – produktivita, rodina. Ale některé profese vyžadují pevný čas.", phrases:["Whether … or not depends on…","This is particularly true of…","Having said that, …"] },
    { q:"Is it healthy that many people's work and home lives now overlap?", outline:"Spíše ne – nejasné hranice, vyhoření. Řešení: právo nebýt dostupný, vlastní pravidla.", phrases:["What worries me is…","The flip side is that…","It could be argued that…"] },
    { q:"How might work be different for your generation compared to your parents'?", outline:"Více změn kariéry, práce na dálku, AI, delší pracovní život. Méně jistoty, víc svobody.", phrases:["It's likely that…","On the one hand, … On the other hand, …","All things considered, …"] }],
    model:"I can't see it disappearing completely, at least not any time soon. What I think is more likely is that its role will change. Instead of being the place where you sit at a desk from nine to five, the office will become somewhere people go for meetings, brainstorming and social contact – the things that don't work so well on a screen. Generally speaking, people seem to want a mix: a couple of days at home to concentrate and a couple of days with colleagues. Of course, it depends on the job – a nurse or a chef can't work from home." }
]
};
