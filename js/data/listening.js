/* DATA.listening – C1 Advanced Listening, Parts 1–4. ALL CONTENT ORIGINAL (written for this portal).
 *
 * There is no audio: every recording is a transcript that the module speaks with the Web Speech API
 * (or shows line by line in "reader mode" when no speech engine is available).
 *
 * SHAPE
 * voices      : { presetKey: {g:"m"|"f", voiceIdx, pitch, rate} }   // g = preferred voice gender, voiceIdx = fallback index
 *                                                                       // into en-GB voices (modulo), pitch/rate multipliers
 * trapTypes   : { key: "Czech label" }                                  // typical exam traps, used for weak-spot statistics
 * A "recording" = { context:"rubric sentence read by the examiner",
 *                   speakers:{ "Name as used in lines": "presetKey" },
 *                   lines:[ {sp:"Name", t:"spoken text"} ] }
 * Every question has: why (CZ explanation), trap (CZ: the typical trap in this item), tt (trapTypes key),
 *                     evidence (EXACT substring of one line of its recording – highlighted after checking)
 *
 * p1: [{id, title, extracts:[ recording + {qs:[ {q, opts:[3 strings], correct:0-2, …} ×2 ]} ×3 ]}]          // 6 Qs
 * p2: [{id, title, …recording, qs:[ {s:"sentence with ___ gap", ans:["accepted answer", "variant", …], …} ×8 ]}]  // 8 Qs
 * p3: [{id, title, …recording, qs:[ {q, opts:[4 strings], correct:0-3, …} ×6 ]}]                             // 6 Qs
 * p4: [{id, title, …recording (sp = "Speaker 1" … "Speaker 5"),
 *       task1:{q, opts:[8 strings A–H]}, task2:{q, opts:[8 strings A–H]},
 *       qs:[ {task:1|2, n:1-5 (speaker), correct:0-7, …} ×10 ]}]   // per task the 5 answers are distinct (3 distractors unused)
 * strategy: { p1:{title, html-free paragraphs:[…], tips:[…]}, … }  (Czech)
 */
window.DATA = window.DATA || {};
window.DATA.listening = window.DATA.listening || {};
(function(L){
"use strict";

L.voices = {
  EX: {g:"f", voiceIdx:0, pitch:1.0,  rate:0.92},   // examiner / rubric
  M1: {g:"m", voiceIdx:1, pitch:0.85, rate:1.0},
  M2: {g:"m", voiceIdx:3, pitch:1.0,  rate:1.05},
  M3: {g:"m", voiceIdx:5, pitch:0.72, rate:0.95},
  F1: {g:"f", voiceIdx:0, pitch:1.12, rate:1.0},
  F2: {g:"f", voiceIdx:2, pitch:1.3,  rate:1.05},
  F3: {g:"f", voiceIdx:4, pitch:1.0,  rate:0.95}
};

L.trapTypes = {
  paraphrase: "Parafráze (jiná slova než v nahrávce)",
  distractor: "Zmíněno, ale odmítnuto",
  change:     "Změna názoru",
  attitude:   "Postoj a tón mluvčího",
  inference:  "Implicitní význam",
  detail:     "Přesné slovo / pravopis"
};

/* ===================================================================================== PART 1 */
L.p1 = [
{ id:"p1-01", title:"Documentary · Cello · Hybrid work", extracts:[
  { context:"You hear two friends discussing a documentary about deep-sea mining.",
    speakers:{"Woman":"F1","Man":"M1"},
    lines:[
      {sp:"Woman", t:"Did you end up watching that documentary about deep-sea mining?"},
      {sp:"Man", t:"I did, yeah. I'll be honest, I went in expecting the usual – you know, gloomy music, shots of oil-covered birds – but it was far more even-handed than that. They actually let the mining companies make their case at length."},
      {sp:"Woman", t:"That's what put me off, to be honest. I felt they gave them a bit too easy a ride. Some of those claims about 'minimal disturbance' went completely unchallenged."},
      {sp:"Man", t:"Hmm, I'm not sure I'd go that far. The scientists did come back on most of it later. What struck me, though, was how little anyone actually knows about what lives down there. It's a bit unnerving that we're debating whether to dig it up before we've even catalogued it."},
      {sp:"Woman", t:"Well, on that we're in complete agreement."}
    ],
    qs:[
      {q:"What surprised the man about the documentary?", opts:["its use of dramatic imagery","its balanced approach","its emphasis on scientific research"], correct:1,
       evidence:"it was far more even-handed than that",
       why:"„Even-handed“ = vyvážený. Čekal pochmurný, jednostranný film, ale nechali mluvit i těžařské firmy.",
       trap:"Dramatické záběry (ptáci od ropy) zmiňuje jen jako to, co OČEKÁVAL – ne co viděl.", tt:"distractor"},
      {q:"What do the friends agree about?", opts:["The mining companies were treated too generously.","More experts should have been interviewed.","Our knowledge of deep-sea life is very limited."], correct:2,
       evidence:"how little anyone actually knows about what lives down there",
       why:"Muž říká, jak málo víme o životě v hlubinách, a žena: „on that we're in complete agreement“.",
       trap:"O tom, zda firmy dostaly příliš prostoru, se naopak NEshodnou („I'm not sure I'd go that far“).", tt:"distractor"}
    ]},
  { context:"You hear a woman talking about learning to play the cello as an adult.",
    speakers:{"Woman":"F3"},
    lines:[
      {sp:"Woman", t:"People assume it must be frustrating, starting an instrument at forty-three, and, well, there are moments. My fingers simply don't do what I tell them some evenings."},
      {sp:"Woman", t:"But honestly, what I hadn't bargained for was how much it would change the way I listen. I'll be sitting in a café and suddenly I'm picking out the bass line in some song I've heard a hundred times."},
      {sp:"Woman", t:"My teacher's quite strict – she won't let me skip the scales, which I grumbled about at first. Now I'm actually rather grateful, because when I finally tackled a proper piece last month, it was the scales that got me through the tricky passages."},
      {sp:"Woman", t:"I'm not going to be performing anywhere, mind you – that was never the point."}
    ],
    qs:[
      {q:"What has the woman found most unexpected about learning the cello?", opts:["a change in the way she hears music","the physical difficulty of playing","the pleasure of playing for others"], correct:0,
       evidence:"how much it would change the way I listen",
       why:"„What I hadn't bargained for“ = s čím nepočítala → změnilo se, jak poslouchá hudbu.",
       trap:"Frustrace a neposlušné prsty: to si „lidé myslí“ (people assume) – a ona to jen částečně připouští, není to překvapení.", tt:"distractor"},
      {q:"How does she now feel about her teacher's approach?", opts:["She still finds it rather tedious.","She recognises its value.","She thinks it suits children better."], correct:1,
       evidence:"Now I'm actually rather grateful",
       why:"Stupnice jí pomohly zvládnout těžké pasáže, proto je teď vděčná.",
       trap:"Nejdřív reptala (grumbled at first) – klasická změna názoru; otázka se ptá na „now“.", tt:"change"}
    ]},
  { context:"You hear two colleagues talking about a new office policy.",
    speakers:{"Man":"M2","Woman":"F1"},
    lines:[
      {sp:"Man", t:"So, have you read the email about the new hybrid arrangement?"},
      {sp:"Woman", t:"Three days in, two at home? Yes. On paper it sounds reasonable, but the way they've gone about it... Nobody was asked. It just arrived, fully formed, on a Friday afternoon."},
      {sp:"Man", t:"Mm, the timing was a bit unfortunate. Though, to be fair, they did run that survey back in the spring."},
      {sp:"Woman", t:"Which asked whether we liked working from home, not which days suited us. It's not the same thing at all."},
      {sp:"Man", t:"Fair point. Personally, I'm relieved, actually. I was getting a bit stir-crazy in my flat. I just hope they sort out the desk booking, because if we're all fighting over the same twelve desks on Tuesdays, it'll be chaos."}
    ],
    qs:[
      {q:"What is the woman's main objection to the new policy?", opts:["the timing of the announcement","the number of office days required","the lack of consultation"], correct:2,
       evidence:"Nobody was asked",
       why:"Nikdo se zaměstnanců nezeptal; i průzkum se ptal na něco jiného → chybí konzultace.",
       trap:"Načasování (Friday afternoon) komentuje hlavně muž; samotný model 3+2 jí přijde rozumný („sounds reasonable“).", tt:"distractor"},
      {q:"What concern does the man express?", opts:["Practical arrangements may prove inadequate.","He will feel isolated working at home.","The survey results have been ignored."], correct:0,
       evidence:"I just hope they sort out the desk booking",
       why:"Bojí se rezervace stolů – 12 stolů pro všechny v úterý = chaos.",
       trap:"Izolace doma (stir-crazy) – to bylo dřív; teď je naopak rád, že bude v kanceláři.", tt:"distractor"}
    ]}
]},

{ id:"p1-02", title:"Novel · Walking tour · Presentation", extracts:[
  { context:"You hear two friends talking about a novel they have both read.",
    speakers:{"Woman":"F2","Man":"M1"},
    lines:[
      {sp:"Woman", t:"So what did you make of the ending? I know you were dreading it."},
      {sp:"Man", t:"I was! After all that build-up I was convinced she'd kill off the brother. But no, she just... left it hanging. And I thought I'd be furious, but actually, the more I think about it, the more it feels right. Wrapping it up neatly would've cheapened everything that came before."},
      {sp:"Woman", t:"I can see that. For me, though, the real triumph was the voice. That narrator's so prickly and unreliable, and yet you end up completely on her side."},
      {sp:"Man", t:"Oh, totally. Although I did find the middle section a bit of a slog."},
      {sp:"Woman", t:"Really? I raced through it."}
    ],
    qs:[
      {q:"How does the man now feel about the ending of the novel?", opts:["It was a disappointing anticlimax.","It was too predictable.","It was an appropriate choice."], correct:2,
       evidence:"the more I think about it, the more it feels right",
       why:"Otevřený konec mu po zamyšlení připadá správný – uzavřený by zlevnil celý příběh.",
       trap:"„I thought I'd be furious“ – čekal vztek, ale názor změnil.", tt:"change"},
      {q:"What does the woman particularly admire about the novel?", opts:["the way the narrator is presented","the pace of the middle section","the unpredictability of the plot"], correct:0,
       evidence:"the real triumph was the voice",
       why:"„The voice“ = hlas vypravěčky; „real triumph“ = to, co obdivuje nejvíc.",
       trap:"Prostřední část „přelétla“, ale neříká, že ji obdivuje – to je jen reakce na muže.", tt:"paraphrase"}
    ]},
  { context:"You hear a tour guide speaking to a group at the start of a walking tour.",
    speakers:{"Guide":"M3"},
    lines:[
      {sp:"Guide", t:"Right, if everyone could gather round... lovely. Before we set off, just a couple of things. The route today takes in the old docks and the warehouse district, and it's about two and a half hours, so I hope those shoes are comfortable."},
      {sp:"Guide", t:"Now, a lot of people come on this tour expecting tales of pirates and smugglers, and yes, we'll touch on that, but what I really want you to come away with is a sense of the ordinary people who lived and worked here – the rope-makers, the women who gutted fish on the quayside. Their stories rarely make it into the guidebooks."},
      {sp:"Guide", t:"Oh, and one practical point – the cobbles by the customs house get very slippery after rain, so do watch your step there."}
    ],
    qs:[
      {q:"What is the guide's main aim on the tour?", opts:["to correct a misconception about pirates","to draw attention to overlooked lives","to explain the history of the warehouses"], correct:1,
       evidence:"a sense of the ordinary people who lived and worked here",
       why:"Chce ukázat obyčejné lidi, o kterých průvodci nepíšou (overlooked = přehlížené).",
       trap:"Piráty nevyvrací – „we'll touch on that“ (zmíní je).", tt:"paraphrase"},
      {q:"The guide gives a warning about", opts:["the length of the walk.","a possibly dangerous surface.","the likelihood of rain."], correct:1,
       evidence:"the cobbles by the customs house get very slippery",
       why:"Kluzké dlažební kostky = potenciálně nebezpečný povrch.",
       trap:"Délka trasy a déšť zazní, ale varování („watch your step“) se týká dlažby.", tt:"distractor"}
    ]},
  { context:"You hear two students talking about a group presentation they have just given.",
    speakers:{"Woman":"F1","Man":"M2"},
    lines:[
      {sp:"Woman", t:"How do you think it went, honestly?"},
      {sp:"Man", t:"Better than the rehearsal, that's for sure. Though I kept noticing people glancing at their phones during the data section."},
      {sp:"Woman", t:"That was my bit! I knew I'd crammed too many figures onto those slides. I should've just picked the two most striking numbers and talked around them."},
      {sp:"Man", t:"Don't be too hard on yourself. The questions at the end showed people had followed the argument. That's what matters."},
      {sp:"Woman", t:"I suppose. Next time I'm going to insist we run through it in front of someone outside the group, though. We were all too close to it to see the problems."}
    ],
    qs:[
      {q:"What does the woman regret about the presentation?", opts:["She included too much information.","She did not rehearse enough.","She answered questions poorly."], correct:0,
       evidence:"I'd crammed too many figures onto those slides",
       why:"„Crammed too many figures“ = nacpala příliš mnoho čísel → příliš informací.",
       trap:"Zkouška (rehearsal) se zmiňuje jen jako srovnání; otázky na konci naopak dopadly dobře.", tt:"paraphrase"},
      {q:"What does she suggest for the future?", opts:["dividing the presentation differently","using fewer slides","getting feedback from an outsider"], correct:2,
       evidence:"in front of someone outside the group",
       why:"Chce prezentaci vyzkoušet před někým mimo skupinu = zpětná vazba zvenku.",
       trap:"Méně slajdů nenavrhuje – mluvila o méně číslech na slajdech.", tt:"paraphrase"}
    ]}
]},

{ id:"p1-03", title:"Zero-waste chef · Career change · Language app", extracts:[
  { context:"You hear part of a radio interview with a chef who runs a zero-waste restaurant.",
    speakers:{"Presenter":"F2","Chef":"M1"},
    lines:[
      {sp:"Presenter", t:"So, zero waste – is that genuinely achievable in a commercial kitchen?"},
      {sp:"Chef", t:"Genuinely? Not a hundred per cent, no, and I'd be suspicious of anyone who told you otherwise. What we've managed is to get our bin down to one small bag a week, which, for a sixty-cover restaurant, is pretty remarkable."},
      {sp:"Chef", t:"The hard part wasn't the cooking side, funnily enough. Chefs love the challenge of using up peelings and offcuts. It was the suppliers. Getting them to deliver without layers of plastic took months of, well, gentle persuasion."},
      {sp:"Presenter", t:"And customers – do they notice?"},
      {sp:"Chef", t:"Some come specifically because of it. Most just come for the food, which, frankly, is how it should be."}
    ],
    qs:[
      {q:"What does the chef say about the term 'zero waste'?", opts:["It cannot be achieved completely in practice.","It is the restaurant's main attraction.","It tends to mislead customers."], correct:0,
       evidence:"Not a hundred per cent, no",
       why:"Úplně bez odpadu to nejde – „not a hundred per cent“.",
       trap:"Hlavní lákadlo? Většina hostů chodí kvůli jídlu, ne kvůli zero waste.", tt:"distractor"},
      {q:"What was the chef's biggest challenge?", opts:["training kitchen staff","changing suppliers' practices","reducing food waste"], correct:1,
       evidence:"It was the suppliers",
       why:"Nejtěžší bylo přesvědčit dodavatele, aby nevozili zboží v plastu.",
       trap:"„The hard part wasn't the cooking side“ – kuchaři naopak výzvu milují.", tt:"distractor"}
    ]},
  { context:"You hear a woman talking about her decision to leave a career in law.",
    speakers:{"Woman":"F3"},
    lines:[
      {sp:"Woman", t:"Everyone thinks there must have been some dramatic moment – a terrible case, a row with a partner. There wasn't. I was good at the job, the money was more than fine."},
      {sp:"Woman", t:"It was more a slow realisation that I was always looking forward to something else – the weekend, the next holiday, retirement, even. And I remember thinking, I'm thirty-four, I can't spend another thirty years waiting."},
      {sp:"Woman", t:"Retraining as a teacher has been humbling, I won't pretend otherwise. Thirty teenagers are a far tougher audience than any judge. But I don't count the hours any more, and that, for me, is the whole point."}
    ],
    qs:[
      {q:"Why did the woman leave her job in law?", opts:["She was dissatisfied with her salary.","She realised she was not living in the present.","She had fallen out with a colleague."], correct:1,
       evidence:"I was always looking forward to something else",
       why:"Pořád jen čekala na víkend, dovolenou, důchod – nežila přítomností.",
       trap:"Hádka s partnerem a peníze: „There wasn't“ / „more than fine“ – výslovně odmítnuto.", tt:"distractor"},
      {q:"What does she say about her new career?", opts:["It is less stressful than law.","She wishes she had changed earlier.","She feels absorbed in it despite its difficulties."], correct:2,
       evidence:"I don't count the hours any more",
       why:"„Nepočítá hodiny“ = práce ji pohltí, i když je náročná (humbling, tougher audience).",
       trap:"Méně stresu? Naopak – teenageři jsou „tougher audience than any judge“.", tt:"inference"}
    ]},
  { context:"You hear two friends talking about a language-learning app.",
    speakers:{"Man":"M2","Woman":"F1"},
    lines:[
      {sp:"Man", t:"You're still doing the Portuguese app every morning? What's the streak now?"},
      {sp:"Woman", t:"Two hundred and twelve days. Which sounds impressive until you hear me try to order a coffee."},
      {sp:"Man", t:"Ha! So it isn't working?"},
      {sp:"Woman", t:"No, it is – just not in the way they advertise. My vocabulary's miles better and I can read menus, signs, that sort of thing. But it doesn't prepare you for real people talking at speed, interrupting each other. For that you need actual conversation, and an app can't fake that."},
      {sp:"Man", t:"So why keep going?"},
      {sp:"Woman", t:"Habit, mostly. And, I suppose, if I broke the streak now I'd feel I'd thrown something away."}
    ],
    qs:[
      {q:"What does the woman say about the app?", opts:["It has not helped her at all.","It has improved some of her skills but not others.","It is dishonest about its methods."], correct:1,
       evidence:"just not in the way they advertise",
       why:"Slovní zásoba a čtení se zlepšily, porozumění živé řeči ne.",
       trap:"„So it isn't working?“ – „No, it is“: pozor na otázku muže, ona ji vyvrací.", tt:"distractor"},
      {q:"Why does she continue to use it?", opts:["She is reluctant to waste her past effort.","She enjoys its game-like features.","She is planning a trip to Portugal."], correct:0,
       evidence:"if I broke the streak now I'd feel I'd thrown something away",
       why:"Nechce přijít o 212denní sérii – „thrown something away“ = promrhat úsilí.",
       trap:"Herní prvky (streak) jsou slovem zmíněny, ale důvodem je nechuť ztratit vybudované.", tt:"paraphrase"}
    ]}
]},

{ id:"p1-04", title:"Festival · Bird migration · Job interview", extracts:[
  { context:"You hear two people talking about a music festival they attended.",
    speakers:{"Woman":"F2","Man":"M1"},
    lines:[
      {sp:"Woman", t:"I thought this year's line-up was the strongest they've had."},
      {sp:"Man", t:"Musically, absolutely. But did you not feel it had lost something? When we first went, it was – what – five thousand people in a field? Now it's corporate sponsors everywhere and twenty-pound burgers."},
      {sp:"Woman", t:"Well, that's what happens when something gets popular. You can't really blame them for wanting to make it last."},
      {sp:"Man", t:"I suppose not. I just miss the feeling that we'd stumbled on a secret."},
      {sp:"Woman", t:"Mind you, I wouldn't miss the old toilets."},
      {sp:"Man", t:"No, fair enough, there's that."}
    ],
    qs:[
      {q:"What is the man's main feeling about the festival?", opts:["disappointment with the music","nostalgia for its early days","anger at the price of tickets"], correct:1,
       evidence:"I just miss the feeling that we'd stumbled on a secret",
       why:"Stýská se mu po době, kdy byl festival malý a „tajný“ = nostalgie.",
       trap:"Hudba: „Musically, absolutely“ – s ní je spokojen. Drahé byly burgery, ne vstupenky.", tt:"distractor"},
      {q:"What is the woman's attitude to the changes at the festival?", opts:["critical","indifferent","understanding"], correct:2,
       evidence:"You can't really blame them for wanting to make it last",
       why:"Chápe organizátory, kteří chtějí festival udržet → understanding.",
       trap:"Lhostejná není – aktivně je obhajuje; postoj poznáš z tónu i obsahu.", tt:"attitude"}
    ]},
  { context:"You hear a scientist talking about her research into bird migration.",
    speakers:{"Scientist":"F3"},
    lines:[
      {sp:"Scientist", t:"For years the assumption was that young birds simply inherit their migration route – it's hard-wired, end of story. And there's certainly a genetic component."},
      {sp:"Scientist", t:"But what our tracking data kept showing us was that first-year birds that travelled with older birds took straighter, more efficient routes than those that flew alone. So experience, social learning, matters far more than we'd given it credit for."},
      {sp:"Scientist", t:"The worrying implication is that when populations drop sharply, you lose that knowledge – the old birds that know the way – and it may not come back even if numbers recover."}
    ],
    qs:[
      {q:"What did her research reveal?", opts:["Young birds learn routes partly from other birds.","Migration routes are entirely inherited.","Young birds migrate more efficiently alone."], correct:0,
       evidence:"travelled with older birds took straighter, more efficient routes",
       why:"Mladí ptáci se staršími letí efektivněji → sociální učení.",
       trap:"„Entirely inherited“ je stará domněnka, kterou výzkum zpochybnil.", tt:"distractor"},
      {q:"What concern does she express?", opts:["Tracking devices may affect birds' behaviour.","Falling populations could lose vital knowledge.","Genetic research is being neglected."], correct:1,
       evidence:"you lose that knowledge",
       why:"Když populace klesne, zmizí staří ptáci, kteří znají cestu.",
       trap:"„Worrying implication“ – signál, že teď přijde obava; ostatní možnosti nezazní.", tt:"paraphrase"}
    ]},
  { context:"You hear a man telling a friend about a job interview.",
    speakers:{"Man":"M2","Woman":"F1"},
    lines:[
      {sp:"Man", t:"...and so then they asked me to sell them the pen. Literally – 'sell me this pen'. I thought that only happened in films."},
      {sp:"Woman", t:"What did you do?"},
      {sp:"Man", t:"I sort of laughed, which in hindsight probably wasn't ideal. And then I started asking her questions – when did she last use a pen, what for – which I'd read somewhere is the textbook approach. She seemed impressed, actually."},
      {sp:"Man", t:"But the bit that threw me was afterwards, when they asked what my previous manager would say was my biggest weakness. Not what I thought – what she'd say. I hadn't prepared for that angle at all and I waffled."},
      {sp:"Woman", t:"Well, you can't prepare for everything."},
      {sp:"Man", t:"True. I just hope the pen made up for it."}
    ],
    qs:[
      {q:"How did the man react at first to the request to sell the pen?", opts:["with irritation","with amusement","with confidence"], correct:1,
       evidence:"I sort of laughed",
       why:"Zasmál se = pobavení (amusement).",
       trap:"Sebejistě postupoval až potom („textbook approach“) – otázka je na první reakci.", tt:"paraphrase"},
      {q:"Which part of the interview does he feel went badly?", opts:["the sales task","his description of his previous job","his answer about a weakness"], correct:2,
       evidence:"I hadn't prepared for that angle at all and I waffled",
       why:"„Waffled“ = plácal, mluvil bez ladu – na otázku o slabině.",
       trap:"Úkol s perem dopadl dobře („She seemed impressed“).", tt:"distractor"}
    ]}
]},

{ id:"p1-05", title:"Countryside · Rejection log · Flatmates", extracts:[
  { context:"You hear a woman telling a friend about moving to the countryside.",
    speakers:{"Man":"M1","Woman":"F2"},
    lines:[
      {sp:"Man", t:"So how's rural life? Living the dream?"},
      {sp:"Woman", t:"Ha, ask me in February. No, it's lovely, it really is. The silence took some getting used to – the first few nights I genuinely couldn't sleep."},
      {sp:"Woman", t:"But what's really got to me is how dependent we are on the car. I'd imagined cycling to the village shop, and in theory I could, but it's three miles of narrow lanes with tractors coming round the bends."},
      {sp:"Man", t:"And the locals? Friendly?"},
      {sp:"Woman", t:"Polite. Friendly takes longer, I'm told. Ten years or so, someone joked. At least, I think it was a joke."}
    ],
    qs:[
      {q:"What has the woman found most difficult about living in the countryside?", opts:["the lack of noise at night","having to drive everywhere","the cost of living"], correct:1,
       evidence:"what's really got to me is how dependent we are on the car",
       why:"„What's really got to me“ = co mi opravdu leze na nervy → závislost na autě.",
       trap:"Ticho bylo jen na začátku („took some getting used to“) – menší a překonaný problém.", tt:"distractor"},
      {q:"What does she imply about the local people?", opts:["They take a long time to accept newcomers.","They are openly hostile to outsiders.","They have made her feel very welcome."], correct:0,
       evidence:"Friendly takes longer",
       why:"Jsou zdvořilí, ale přátelství trvá – možná i deset let.",
       trap:"„Hostile“ je přehnané – jsou „polite“. Implikace, ne přímé tvrzení.", tt:"inference"}
    ]},
  { context:"You hear part of a podcast in which a man is talking about failure.",
    speakers:{"Man":"M3"},
    lines:[
      {sp:"Man", t:"I've started keeping what I call a 'rejection log'. Every time I pitch an idea and it gets turned down, I write it in. Not to wallow – quite the reverse."},
      {sp:"Man", t:"After a year I went back through it and realised something that genuinely surprised me: almost every success I'd had came within a few weeks of a cluster of rejections."},
      {sp:"Man", t:"Not because rejection is good in itself, I'm not one of those 'fail fast' evangelists, but because those were the periods when I was putting the most work out there. The rejections were really just a measure of activity. So now, oddly, a bad week of rejections cheers me up a little."}
    ],
    qs:[
      {q:"What did the man discover from his log?", opts:["Rejection teaches valuable lessons.","His ideas improved steadily over time.","Rejections coincided with his most productive periods."], correct:2,
       evidence:"those were the periods when I was putting the most work out there",
       why:"Odmítnutí = měřítko aktivity; nejvíc jich bylo, když nejvíc pracoval.",
       trap:"„Rejection is good in itself“ – výslovně popírá („Not because…“).", tt:"distractor"},
      {q:"What is his attitude to the 'fail fast' philosophy?", opts:["enthusiastic","sceptical","undecided"], correct:1,
       evidence:"I'm not one of those 'fail fast' evangelists",
       why:"Distancuje se od „evangelistů“ – slovo má lehce ironický, skeptický tón.",
       trap:"Mluví pozitivně o odmítnutích, ale ne o filozofii „fail fast“.", tt:"attitude"}
    ]},
  { context:"You hear two flatmates discussing a household problem.",
    speakers:{"Woman":"F1","Man":"M2"},
    lines:[
      {sp:"Woman", t:"Have you seen the bill? The heating's nearly double what it was last winter."},
      {sp:"Man", t:"I know, I know. I've been working from home more, that's probably most of it."},
      {sp:"Woman", t:"I'm not blaming you. It's just that we agreed we'd split everything three ways, and Tom's barely here. It doesn't seem fair on him."},
      {sp:"Man", t:"So what, we work out who's in when? That sounds like a nightmare."},
      {sp:"Woman", t:"Not to the hour, obviously. But maybe you and I pay a bit more over the winter months and we review it in spring."},
      {sp:"Man", t:"Yeah... OK. That's reasonable. I'll mention it to Tom tonight."}
    ],
    qs:[
      {q:"What is the woman concerned about?", opts:["fairness to the third flatmate","the man's habits at home","the accuracy of the bill"], correct:0,
       evidence:"It doesn't seem fair on him",
       why:"Tom tam skoro není, ale platí třetinu → nespravedlivé vůči němu.",
       trap:"„I'm not blaming you“ – muže neobviňuje.", tt:"distractor"},
      {q:"What do they decide to do?", opts:["calculate exactly who uses most energy","reduce the amount of heating they use","change how they share the cost for a while"], correct:2,
       evidence:"you and I pay a bit more over the winter months",
       why:"Přes zimu zaplatí víc a na jaře to přehodnotí = dočasná úprava.",
       trap:"Přesný výpočet muž odmítne („a nightmare“) a ona taky („Not to the hour“).", tt:"distractor"}
    ]}
]},

{ id:"p1-06", title:"Library design · Cookery course · Young athletes", extracts:[
  { context:"You hear an architect talking about designing a new public library.",
    speakers:{"Architect":"F3"},
    lines:[
      {sp:"Architect", t:"The brief we were given was very much about technology – charging points, digital zones, that kind of thing. And we delivered all that."},
      {sp:"Architect", t:"But when we actually spent time in the old library, watching how people used it, the thing that struck us was how many came simply to be around other people without having to talk to them. Older people especially, but students too."},
      {sp:"Architect", t:"So the design really grew out of that – lots of long shared tables, window seats, places where you can be alone together, as it were. The digital stuff, honestly, will date within ten years. The need for that kind of space won't."}
    ],
    qs:[
      {q:"What influenced the library's design most?", opts:["the requirements of the original brief","observing how the old library was used","the needs of elderly visitors"], correct:1,
       evidence:"when we actually spent time in the old library, watching how people used it",
       why:"„The design really grew out of that“ – z pozorování návštěvníků staré knihovny.",
       trap:"Starší lidé jsou jen příklad („especially, but students too“), ne hlavní vliv.", tt:"paraphrase"},
      {q:"What does she suggest about the digital facilities?", opts:["They will soon become outdated.","They were not really necessary.","They were the most costly element."], correct:0,
       evidence:"will date within ten years",
       why:"„Date“ (sloveso) = zastarat.",
       trap:"Neříká, že nebyly potřeba – „we delivered all that“.", tt:"paraphrase"}
    ]},
  { context:"You hear two friends talking about a cookery course.",
    speakers:{"Man":"M1","Woman":"F2"},
    lines:[
      {sp:"Man", t:"So was the course worth the money in the end?"},
      {sp:"Woman", t:"The knife skills session alone was worth it. I'd been chopping onions wrong my whole life, apparently. The bread day was a bit of a let-down, though – we spent more time waiting for dough to rise than actually doing anything."},
      {sp:"Man", t:"Isn't that just... bread?"},
      {sp:"Woman", t:"Well, yes, but they could've had batches ready from earlier so we could move on. The chef was brilliant, mind you. Very patient, never made anyone feel stupid."},
      {sp:"Man", t:"Would you do another one?"},
      {sp:"Woman", t:"Pastry, maybe. If it's the same chef."}
    ],
    qs:[
      {q:"What criticism does the woman make of the course?", opts:["One session was poorly organised.","The knife skills session was too basic.","The chef lacked patience."], correct:0,
       evidence:"they could've had batches ready from earlier",
       why:"Mohli mít připravené těsto z dřívějška – špatná organizace chlebového dne.",
       trap:"Kuchař byl naopak „very patient“.", tt:"distractor"},
      {q:"What would persuade her to do another course?", opts:["a lower price","a more advanced level","a particular teacher"], correct:2,
       evidence:"If it's the same chef",
       why:"Podmínkou je stejný kuchař = konkrétní lektor.",
       trap:"Pastry (pečivo) je téma, ne úroveň; cena nezazní.", tt:"paraphrase"}
    ]},
  { context:"You hear a sports coach talking about working with young athletes.",
    speakers:{"Coach":"M3"},
    lines:[
      {sp:"Coach", t:"The biggest mistake I see from parents – and I made it myself with my own kids – is pushing them to specialise too early. You get a ten-year-old who's good at tennis and suddenly it's tennis five days a week, no football, no swimming."},
      {sp:"Coach", t:"And they might win a lot at twelve. But by sixteen, a lot of them are either injured or just sick of it. The kids who do a bit of everything until their mid-teens tend to be more resilient, physically and mentally."},
      {sp:"Coach", t:"I'm not saying talent doesn't matter. I'm saying it needs room."}
    ],
    qs:[
      {q:"What does the coach admit?", opts:["He used to coach tennis.","He has made the same mistake as other parents.","He once underestimated the importance of talent."], correct:1,
       evidence:"and I made it myself with my own kids",
       why:"Vsuvka „and I made it myself“ = přiznání.",
       trap:"Tenis je jen příklad, nic o jeho trénování neříká.", tt:"paraphrase"},
      {q:"What is his main argument?", opts:["Natural talent is overrated.","Children benefit from doing a range of sports.","Young athletes should compete less often."], correct:1,
       evidence:"The kids who do a bit of everything until their mid-teens tend to be more resilient",
       why:"Děti, které dělají víc sportů, jsou odolnější.",
       trap:"„I'm not saying talent doesn't matter“ – talent nezlehčuje.", tt:"distractor"}
    ]}
]},

{ id:"p1-07", title:"Art exhibition · Firefighter · Conference", extracts:[
  { context:"You hear two people discussing an exhibition of contemporary art.",
    speakers:{"Man":"M2","Woman":"F1"},
    lines:[
      {sp:"Man", t:"I have to confess, I didn't get the room with the empty frames."},
      {sp:"Woman", t:"Ah, the frames. I didn't either at first. But then I read that they'd all held paintings that were sold off to pay the gallery's debts in the nineteen-seventies. Suddenly it felt quite poignant."},
      {sp:"Man", t:"But shouldn't the art speak for itself? If you need a paragraph on the wall to explain it..."},
      {sp:"Woman", t:"Plenty of old paintings need explaining too – all those saints and symbols. Nobody complains about that."},
      {sp:"Man", t:"Hmm. Maybe. I still preferred the photographs upstairs."}
    ],
    qs:[
      {q:"What changed the woman's opinion of the empty frames?", opts:["discussing them with a friend","comparing them with older paintings","learning about their history"], correct:2,
       evidence:"But then I read that they'd all held paintings",
       why:"Dozvěděla se, že rámy kdysi držely obrazy prodané kvůli dluhům.",
       trap:"Staré obrazy zmiňuje až jako argument v debatě, ne jako důvod změny názoru.", tt:"distractor"},
      {q:"What does the man question?", opts:["the need for written explanations of art","the value of older paintings","the gallery's financial decisions"], correct:0,
       evidence:"shouldn't the art speak for itself?",
       why:"Ptá se, zda by umění nemělo mluvit samo, bez popisku na zdi.",
       trap:"Finanční rozhodnutí galerie jsou kontext, ne to, co zpochybňuje.", tt:"paraphrase"}
    ]},
  { context:"You hear a man talking about being a volunteer firefighter.",
    speakers:{"Man":"M1"},
    lines:[
      {sp:"Man", t:"When I signed up I imagined it'd be all burning buildings. In reality, a good half of our call-outs are road accidents, flooding, people locked out – that sort of thing. The training's relentless, too; two evenings a week, every week, plus weekends. My partner jokes she's a firefighting widow."},
      {sp:"Man", t:"What keeps me going, I think, is the team. You're in situations where you have to trust someone completely, and that creates a bond that I've honestly never had in any office job."},
      {sp:"Man", t:"It's not about being a hero. Most of the time it's quite mundane."}
    ],
    qs:[
      {q:"What does he say about the work?", opts:["It is mainly dramatic.","It requires little preparation.","It is more varied than he expected."], correct:2,
       evidence:"a good half of our call-outs are road accidents, flooding",
       why:"Čekal jen požáry, ale jezdí k nehodám, povodním, zabouchnutým dveřím = rozmanité.",
       trap:"Výcvik je naopak „relentless“ (neúprosný).", tt:"distractor"},
      {q:"What motivates him most?", opts:["the excitement of emergencies","his relationships with colleagues","the gratitude of the public"], correct:1,
       evidence:"What keeps me going, I think, is the team",
       why:"„What keeps me going“ = co ho motivuje → tým a vzájemná důvěra.",
       trap:"„It's not about being a hero… quite mundane“ – vzrušení to není.", tt:"distractor"}
    ]},
  { context:"You hear a woman telling a colleague about a conference she attended.",
    speakers:{"Man":"M2","Woman":"F3"},
    lines:[
      {sp:"Man", t:"How was Berlin? Did your talk go down well?"},
      {sp:"Woman", t:"The talk was fine – a few good questions. But honestly, the most useful part was nothing to do with the official programme. I got chatting to a researcher from Lisbon over breakfast and it turns out we're working on almost exactly the same problem from opposite ends. We're already planning a joint paper."},
      {sp:"Man", t:"That's brilliant. Was the rest worth it, though? These things cost a fortune."},
      {sp:"Woman", t:"Some of the sessions were frankly a waste of time – people reading out slides. I'd argue they should halve the number of talks and double the breaks."}
    ],
    qs:[
      {q:"What was the most valuable part of the conference for her?", opts:["the response to her talk","an informal conversation","one of the sessions"], correct:1,
       evidence:"I got chatting to a researcher from Lisbon over breakfast",
       why:"Neformální rozhovor u snídaně → společný článek.",
       trap:"Její přednáška byla jen „fine“.", tt:"paraphrase"},
      {q:"What does she think the organisers should do?", opts:["reduce the cost of attending","allow more time for networking","choose better speakers"], correct:1,
       evidence:"halve the number of talks and double the breaks",
       why:"Víc přestávek = víc času na kontakty (networking).",
       trap:"Kritizuje čtení slajdů, ale její NÁVRH se týká přestávek, ne řečníků.", tt:"paraphrase"}
    ]}
]},

{ id:"p1-08", title:"Electric car · Novelist · Returned artefact", extracts:[
  { context:"You hear two friends talking about buying an electric car.",
    speakers:{"Woman":"F2","Man":"M3"},
    lines:[
      {sp:"Woman", t:"So, did you go for it in the end? The electric one?"},
      {sp:"Man", t:"I did. The range was my big worry – I do that run up to my mum's every other weekend. But I've worked it out and I only need to stop once, and there's a café at the charging point, so it's actually quite civilised."},
      {sp:"Woman", t:"And the cost? They're not cheap."},
      {sp:"Man", t:"No, the upfront price made me wince. But I've done the sums and over five years it more or less evens out, what with fuel and servicing. I wouldn't say I've saved money, exactly. I just haven't lost any. And it's so quiet – that's the bit nobody tells you about."}
    ],
    qs:[
      {q:"What was the man's main concern before buying the car?", opts:["how far it could travel on one charge","where he would be able to charge it","how expensive it would be to service"], correct:0,
       evidence:"The range was my big worry",
       why:"„Range“ = dojezd.",
       trap:"Nabíječka u kavárny je jen řešení jeho obavy, ne obava sama.", tt:"paraphrase"},
      {q:"What does he say about the cost?", opts:["He has made significant savings.","It is roughly the same as a conventional car overall.","He regrets the amount he paid."], correct:1,
       evidence:"over five years it more or less evens out",
       why:"„Evens out“ = vyrovná se → celkově podobné jako u běžného auta.",
       trap:"„I wouldn't say I've saved money“ – úspory výslovně popírá.", tt:"distractor"}
    ]},
  { context:"You hear a novelist talking about her writing routine.",
    speakers:{"Novelist":"F1"},
    lines:[
      {sp:"Novelist", t:"I'm often asked whether I write every day, and the answer is no, and I've stopped feeling guilty about it. There's this myth that real writers sit down at six every morning without fail."},
      {sp:"Novelist", t:"For me, there are long stretches – weeks, sometimes – where I'm just walking, reading, letting things settle. Then the writing comes very fast. My editor used to panic during those quiet periods. She's learned to trust it now."},
      {sp:"Novelist", t:"What I do insist on is a notebook, always. The ideas turn up at the most inconvenient moments."}
    ],
    qs:[
      {q:"What is her attitude to the idea of writing every day?", opts:["She wishes she could manage it.","She considers it essential for serious writers.","She rejects it as a rule for all writers."], correct:2,
       evidence:"There's this myth that real writers sit down at six every morning",
       why:"„Myth“ = mýtus → nepovažuje to za pravidlo.",
       trap:"Dřív se cítila provinile („stopped feeling guilty“) – dnes už ne.", tt:"change"},
      {q:"How has her editor's attitude changed?", opts:["She has come to accept the writer's methods.","She has become more demanding about deadlines.","She has encouraged the writer to keep notes."], correct:0,
       evidence:"She's learned to trust it now",
       why:"Dřív panikařila, teď způsobu práce důvěřuje.",
       trap:"Zápisník je autorčin vlastní zvyk, ne rada redaktorky.", tt:"distractor"}
    ]},
  { context:"You hear a man and a woman talking about a museum's decision to return an artefact.",
    speakers:{"Man":"M1","Woman":"F3"},
    lines:[
      {sp:"Man", t:"Did you see the museum's giving the bronze head back to Nigeria?"},
      {sp:"Woman", t:"About time. It was taken in the eighteen-nineties, wasn't it? There's no serious argument for keeping it."},
      {sp:"Man", t:"I wouldn't say no argument. The museum's point was always that more people see it in London. But I think that's a bit weak now – it's not as if people can't travel, and there's a new museum being built there anyway."},
      {sp:"Woman", t:"Exactly. And it's not just about who sees it. It's about who gets to tell its story."},
      {sp:"Man", t:"That's true. I think what's changed is that the public mood has shifted. Ten years ago this wouldn't have happened."}
    ],
    qs:[
      {q:"What is the man's view of the museum's original argument?", opts:["It was never convincing.","It is still valid today.","It is less persuasive than it used to be."], correct:2,
       evidence:"I think that's a bit weak now",
       why:"„Weak now“ = TEĎ slabý → dřív měl větší váhu.",
       trap:"„I wouldn't say no argument“ – nesouhlasí, že argument nikdy neplatil.", tt:"attitude"},
      {q:"What does the man think explains the decision?", opts:["a change in public opinion","the building of a new museum","pressure from the government"], correct:0,
       evidence:"the public mood has shifted",
       why:"„Public mood has shifted“ = změnilo se veřejné mínění.",
       trap:"Nové muzeum zmiňuje jako protiargument, ne jako vysvětlení rozhodnutí.", tt:"distractor"}
    ]}
]}
];

/* ===================================================================================== PART 2 */
L.p2 = [
{ id:"p2-01", title:"Food stylist", context:"You will hear a food stylist called Hannah talking about her work.",
  speakers:{"Hannah":"F1"},
  lines:[
    {sp:"Hannah", t:"Hi everyone, and thanks for having me. I'm Hannah, and for the past twelve years I've worked as a food stylist – which, if you've never heard of it, means I make food look good for the camera. Cookbooks, adverts, the odd film."},
    {sp:"Hannah", t:"I actually trained as a graphic designer, not a chef, which surprises people. I drifted into this after a friend who was a photographer asked me to help on a shoot for a supermarket magazine, and I just loved it."},
    {sp:"Hannah", t:"People always ask about the tricks. And yes, there are a few. The famous one is that the 'milk' in cereal adverts is often glue – I've never actually done that, I should say. What I do use constantly is a spray bottle of glycerine and water, which gives vegetables that freshly-washed look that lasts under hot lights."},
    {sp:"Hannah", t:"The hardest thing to style, without a doubt, is ice cream. People assume it's soup, or anything with cheese melting, but ice cream starts collapsing within about forty seconds under studio lights, so often we use a mixture of icing sugar and margarine instead."},
    {sp:"Hannah", t:"Though that's an important point. Where food is shown on a product's packaging, there are strict rules – you can't make the portion look bigger than it is, for example, and it has to be the real product. Cookbooks are much freer."},
    {sp:"Hannah", t:"My kit bag is enormous. Paintbrushes, cotton buds, a blowtorch. If I had to choose one thing I couldn't work without, it'd be my tweezers – I place individual sesame seeds with them."},
    {sp:"Hannah", t:"A typical shoot day starts at seven, and we might aim for ten or twelve shots. The food's often prepared twice – one version for lighting tests, which we call the 'stand-in', and then the 'hero' version for the actual photo."},
    {sp:"Hannah", t:"What's changed most in recent years is the fashion. Ten years ago everything was perfect, symmetrical, polished. Now clients want what they call 'beautiful mess' – crumbs on the table, a drip running down the side of a glass. Ironically it takes much longer to make mess look natural."},
    {sp:"Hannah", t:"If you want to get into the industry, my advice is to assist an established stylist. Courses are fine, but nothing beats being on set."}
  ],
  qs:[
    {s:"Hannah originally trained as a ___ .", ans:["graphic designer"], evidence:"I actually trained as a graphic designer",
     why:"Vystudovala grafický design – „trained as a graphic designer“.", trap:"„Chef“ zazní hned vedle, ale s „not“.", tt:"distractor"},
    {s:"Hannah's first styling work was on a shoot for a ___ magazine.", ans:["supermarket"], evidence:"a shoot for a supermarket magazine",
     why:"Kamarád fotograf ji vzal na focení pro časopis supermarketu.", trap:"Nepiš „photographer“ – to je profese kamaráda.", tt:"detail"},
    {s:"To keep vegetables looking fresh, Hannah sprays them with water mixed with ___ .", ans:["glycerine","glycerin"], evidence:"a spray bottle of glycerine and water",
     why:"Glycerin + voda = čerstvě omytý vzhled.", trap:"Lepidlo (glue) je slavný trik, který ona NIKDY nepoužila.", tt:"distractor"},
    {s:"According to Hannah, ___ is the most difficult food to style.", ans:["ice cream","ice-cream"], evidence:"The hardest thing to style, without a doubt, is ice cream",
     why:"„The hardest thing… is ice cream“ – zmrzlina pod světly za 40 s padá.", trap:"Polévka a sýr: to si „lidé myslí“.", tt:"distractor"},
    {s:"Strict rules apply when food is shown on a product's ___ .", ans:["packaging"], evidence:"Where food is shown on a product's packaging, there are strict rules",
     why:"Na obalu výrobku musí být skutečný produkt a správná porce.", trap:"Kuchařky jsou naopak „much freer“.", tt:"distractor"},
    {s:"The piece of equipment Hannah could least do without is her ___ .", ans:["tweezers"], evidence:"it'd be my tweezers",
     why:"Pinzetou klade i jednotlivá sezamová semínka.", trap:"Ve výčtu zazní štětce, vatové tyčinky i hořák – odpověď přijde až po „one thing I couldn't work without“.", tt:"distractor"},
    {s:"The version of a dish used to test the lighting is known as the ___ .", ans:["stand-in","stand in","standin"], evidence:"which we call the 'stand-in'",
     why:"Testovací verze = „stand-in“, finální = „hero“.", trap:"„Hero“ je verze pro samotnou fotku – pozor na pořadí.", tt:"distractor"},
    {s:"Many clients now ask for a style described as ___ .", ans:["beautiful mess"], evidence:"what they call 'beautiful mess'",
     why:"Dnes klienti chtějí „krásný nepořádek“ – drobky, kapky.", trap:"„Perfect, symmetrical, polished“ – to byla móda před deseti lety.", tt:"change"}
  ]},

{ id:"p2-02", title:"Glacier research in Iceland", context:"You will hear a scientist called Tom talking about a research trip to a glacier in Iceland.",
  speakers:{"Tom":"M1"},
  lines:[
    {sp:"Tom", t:"Good evening. I'm going to tell you about the three months I spent last summer on an ice cap in south-east Iceland, measuring how fast one of its glaciers is retreating."},
    {sp:"Tom", t:"There were five of us in the team, living in a hut that, I'm told, was originally built for sheep farmers. Hardly luxurious, but after a day on the ice it felt like a palace."},
    {sp:"Tom", t:"Our main tool was something called a time-lapse camera. We set up six of them on the ridges around the glacier, each taking a photo every hour, so we could watch the ice front move, almost like a film."},
    {sp:"Tom", t:"We also used drones, though less than we'd planned. The wind up there is brutal – we lost one in the first week, and after that we only flew them on calm mornings."},
    {sp:"Tom", t:"Everyone assumes the biggest danger on a glacier is crevasses, and they're certainly a concern, but what actually caused us most trouble was meltwater. Rivers on the surface can change course overnight, and twice we had to abandon equipment because a stream had cut across our route."},
    {sp:"Tom", t:"Now, the results. We'd expected the glacier to have retreated by about forty metres since the last survey. In fact the figure was closer to sixty, which was sobering, to say the least."},
    {sp:"Tom", t:"Interestingly, the retreat wasn't uniform. The northern edge, which sits in the shadow of a mountain, has barely moved at all."},
    {sp:"Tom", t:"What I found hardest personally wasn't the cold, or the work. It was the light. In June it never really gets dark, and I just couldn't sleep properly. By the end I was wearing an eye mask even when I napped in the afternoon."},
    {sp:"Tom", t:"We came back with nearly two hundred thousand images, and analysing them will keep us busy for at least a year. What I'd really like to do next is go back in winter, which almost nobody has studied."}
  ],
  qs:[
    {s:"The team's hut was originally built for ___ .", ans:["sheep farmers"], evidence:"originally built for sheep farmers",
     why:"Chata byla postavena pro ovčáky/farmáře s ovcemi.", trap:"Napiš oba výrazy – „farmers“ samo je neúplné.", tt:"detail"},
    {s:"The team's main piece of equipment was a ___ .", ans:["time-lapse camera","time lapse camera","timelapse camera"], evidence:"something called a time-lapse camera",
     why:"„Our main tool“ = hlavní nástroj → časosběrná kamera.", trap:"Drony používali „less than we'd planned“.", tt:"distractor"},
    {s:"After losing a drone, the team only flew them on ___ .", ans:["calm mornings"], evidence:"we only flew them on calm mornings",
     why:"Kvůli větru létali jen za klidných rán.", trap:"Pozor na tvar: „calm mornings“ (množné číslo).", tt:"detail"},
    {s:"The biggest practical problem on the glacier was caused by ___ .", ans:["meltwater","melt water"], evidence:"what actually caused us most trouble was meltwater",
     why:"Řeky z tajícího ledu měnily koryto přes noc.", trap:"Trhliny (crevasses) – „everyone assumes“, ale skutečnost byla jiná.", tt:"distractor"},
    {s:"The glacier had retreated by about ___ since the previous survey.", ans:["sixty metres","60 metres","sixty meters","60 meters","60m","60 m","sixty","60"], evidence:"the figure was closer to sixty",
     why:"Čekali 40 m, ve skutečnosti skoro 60.", trap:"40 metrů bylo jen očekávání.", tt:"distractor"},
    {s:"The ___ edge of the glacier has hardly changed.", ans:["northern","north"], evidence:"The northern edge, which sits in the shadow of a mountain, has barely moved at all",
     why:"Severní okraj ve stínu hory se skoro nepohnul („barely moved“ = hardly changed).", trap:"Parafráze: barely moved → hardly changed.", tt:"paraphrase"},
    {s:"Personally, Tom found the constant ___ hardest to deal with.", ans:["light","daylight"], evidence:"It was the light",
     why:"V červnu se nestmívá – nemohl spát.", trap:"„Wasn't the cold, or the work“ – dvě odmítnuté možnosti.", tt:"distractor"},
    {s:"Tom would like to return to the glacier in ___ .", ans:["winter","the winter"], evidence:"go back in winter",
     why:"Chce se vrátit v zimě, kterou skoro nikdo nezkoumal.", trap:"Summer a June se v textu objeví – to byla minulá výprava.", tt:"detail"}
  ]},

{ id:"p2-03", title:"Urban beekeeping", context:"You will hear a woman called Priya talking about keeping bees in a city.",
  speakers:{"Priya":"F2"},
  lines:[
    {sp:"Priya", t:"Hello! So I'm Priya, and I keep bees – on the roof of an office block in central Manchester, which isn't quite what most people picture when they think of beekeeping."},
    {sp:"Priya", t:"I got into it by accident, really. I was working in the building's facilities team, and the company wanted to improve its environmental image. Someone suggested bees, and because I'd once mentioned that my grandfather kept them, I was volunteered."},
    {sp:"Priya", t:"I did a six-week course with a local beekeeping association, and the thing that struck me most was not the stings – you get used to those – but how calm you have to be. Bees pick up on nervous, jerky movements. The instructor kept telling us to move as if we were underwater."},
    {sp:"Priya", t:"We started with two hives and now have seven. City bees, by the way, often do better than country ones. That surprises people, but think about it – farmland is often one crop as far as you can see, whereas cities have parks, gardens, balcony pots, so there's an enormous variety of flowers."},
    {sp:"Priya", t:"The honey reflects that. Ours has a slightly minty taste, which we think comes from the lime trees along the canal. Last year we got about ninety jars – not huge, but staff love it, and we sell some in the café downstairs."},
    {sp:"Priya", t:"There is a debate, I should mention, about whether we have too many hives in cities now. Honeybees compete with wild bees for food, and some ecologists argue we'd do more good by planting flowers than by adding hives. I think that's a fair criticism, honestly."},
    {sp:"Priya", t:"So this year we've turned part of the roof into a wildflower meadow, which has been a lovely project for staff to get involved with."},
    {sp:"Priya", t:"The biggest challenge in winter is actually keeping the hives dry, rather than warm. Bees cope with cold remarkably well, but damp kills a colony."},
    {sp:"Priya", t:"If you're thinking of starting, my one piece of advice is find a mentor. Books and videos can only take you so far."}
  ],
  qs:[
    {s:"When she started beekeeping, Priya was working in the building's ___ team.", ans:["facilities"], evidence:"working in the building's facilities team",
     why:"Pracovala v týmu správy budovy (facilities).", trap:"Pravopis: facilities (dvě i, jedno l).", tt:"detail"},
    {s:"Priya was chosen to look after the bees because her ___ had kept them.", ans:["grandfather","grandad","granddad"], evidence:"my grandfather kept them",
     why:"Jednou zmínila, že děda choval včely.", trap:"„I was volunteered“ = někdo ji „dobrovolně“ určil – nezvolila si to sama.", tt:"inference"},
    {s:"Priya's instructor told the class to move as if they were ___ .", ans:["underwater","under water"], evidence:"move as if we were underwater",
     why:"Pomalu a klidně, jako pod vodou.", trap:"Žihadla (stings) – „not the stings“.", tt:"distractor"},
    {s:"City bees often do well because there is a great ___ of flowers.", ans:["variety"], evidence:"an enormous variety of flowers",
     why:"Parky, zahrady, truhlíky = velká rozmanitost květů.", trap:"Enormous → great: parafráze přídavného jména, podstatné jméno zůstává.", tt:"paraphrase"},
    {s:"The honey's unusual flavour is thought to come from the ___ near the canal.", ans:["lime trees","lime tree"], evidence:"comes from the lime trees along the canal",
     why:"Lípy (lime trees) u kanálu.", trap:"„Minty“ je popis chuti, ne zdroj.", tt:"detail"},
    {s:"Last year the bees produced around ___ of honey.", ans:["ninety jars","90 jars"], evidence:"we got about ninety jars",
     why:"Asi devadesát sklenic.", trap:"Sedm úlů je jiné číslo – čísel zazní víc.", tt:"detail"},
    {s:"To help wild bees, part of the roof has been turned into a ___ .", ans:["wildflower meadow","wild flower meadow","wild-flower meadow","meadow"], evidence:"a wildflower meadow",
     why:"Louka s lučními květinami pro divoké opylovače.", trap:"Nepiš „more hives“ – přidávání úlů ekologové kritizují.", tt:"distractor"},
    {s:"In winter, the greatest danger to a bee colony is ___ .", ans:["damp","dampness"], evidence:"damp kills a colony",
     why:"Vlhko kolonii zabije, zima ne.", trap:"„Cold“ – včely zvládají „remarkably well“.", tt:"distractor"}
  ]},

{ id:"p2-04", title:"Restoring a narrowboat", context:"You will hear a man called Gareth talking about restoring an old canal boat.",
  speakers:{"Gareth":"M3"},
  lines:[
    {sp:"Gareth", t:"Right, good afternoon. My name's Gareth, and four years ago I bought a sixty-foot narrowboat that, frankly, should have been scrapped. I'm going to tell you how my wife and I brought her back to life."},
    {sp:"Gareth", t:"We found her advertised on a noticeboard in a pub, of all places, near Oxford. The asking price was two thousand pounds, which tells you something about the state she was in."},
    {sp:"Gareth", t:"The first job – and it took almost a whole year – was the hull. Rust is the great enemy of a steel boat, and ours had patches you could push a screwdriver through. We had to have her lifted out of the water and new steel plates welded on."},
    {sp:"Gareth", t:"People assume the engine would be the big expense, but it was actually in surprisingly good shape. It just needed a thorough clean and new filters."},
    {sp:"Gareth", t:"Inside, we stripped everything back. We decided early on to use reclaimed wood wherever we could – old floorboards, a church pew that became our bench seat. It's cheaper, but it's also got character you can't buy."},
    {sp:"Gareth", t:"Heating was a big debate between us. My wife wanted a diesel heater; I wanted a traditional wood-burning stove. In the end she won, for reasons of space, and I have to admit she was right."},
    {sp:"Gareth", t:"The name on the side when we bought her was 'Persistence'. Some people say it's bad luck to rename a boat, and to be honest we didn't want to anyway. It suited the project perfectly."},
    {sp:"Gareth", t:"Living aboard full time has taught me how little we really need. We have one small water tank, so you become very aware of every drop you use. The biggest adjustment was the lack of storage – I had to give away about two thirds of my books."},
    {sp:"Gareth", t:"If you're tempted, my advice is to spend at least a week on a hired boat first. It's a lifestyle that suits some people and drives others mad."}
  ],
  qs:[
    {s:"Gareth saw the boat advertised on a noticeboard in a ___ .", ans:["pub"], evidence:"advertised on a noticeboard in a pub",
     why:"Inzerát visel na nástěnce v hospodě.", trap:"Oxford je místo, ne typ podniku.", tt:"detail"},
    {s:"Repairing the boat's ___ took almost a year.", ans:["hull"], evidence:"was the hull",
     why:"Trup (hull) – rez, nové ocelové pláty.", trap:"Pravopis: hull, ne „hole“.", tt:"detail"},
    {s:"Surprisingly, the ___ needed very little work.", ans:["engine"], evidence:"People assume the engine would be the big expense",
     why:"Motor byl v dobrém stavu – stačilo vyčistit a vyměnit filtry.", trap:"Filtry jsou detail opravy, ne odpověď.", tt:"paraphrase"},
    {s:"For the interior, they used ___ wherever possible.", ans:["reclaimed wood"], evidence:"use reclaimed wood wherever we could",
     why:"Recyklované (použité) dřevo.", trap:"Floorboards je jen příklad.", tt:"detail"},
    {s:"One of the seats on the boat was made from an old ___ .", ans:["church pew","pew"], evidence:"a church pew that became our bench seat",
     why:"Kostelní lavice se stala lavicí na lodi.", trap:"Bench seat je výsledek, ne materiál.", tt:"detail"},
    {s:"In the end, they chose a ___ to heat the boat.", ans:["diesel heater"], evidence:"My wife wanted a diesel heater; I wanted a traditional wood-burning stove. In the end she won",
     why:"Vyhrála manželka, která chtěla naftové topení.", trap:"Kamna na dřevo chtěl on – „she won“.", tt:"distractor"},
    {s:"The couple kept the boat's original name, ___ .", ans:["Persistence"], evidence:"The name on the side when we bought her was 'Persistence'",
     why:"Jméno nezměnili – sedělo projektu.", trap:"Pravopis: Persistence (-ence).", tt:"detail"},
    {s:"Because of limited storage, Gareth gave away most of his ___ .", ans:["books"], evidence:"I had to give away about two thirds of my books",
     why:"Musel se vzdát dvou třetin knih.", trap:"Voda (water tank) je jiná změna životního stylu.", tt:"distractor"}
  ]},

{ id:"p2-05", title:"Sound design for video games", context:"You will hear a sound designer called Lena talking about her work on video games.",
  speakers:{"Lena":"F3"},
  lines:[
    {sp:"Lena", t:"Hi, I'm Lena, and I'm a sound designer for video games. Basically, every footstep, every door creak, every explosion you hear in a game – someone like me made it."},
    {sp:"Lena", t:"I studied music at university, but it was a summer job at a radio station, editing adverts, that really taught me how to work with recorded sound."},
    {sp:"Lena", t:"A lot of what I do is called foley – recording everyday sounds and using them for something completely different. For instance, the sound of a monster's bones cracking in our last game was actually celery being snapped in half. Frozen celery, to be precise – it gives a sharper crack."},
    {sp:"Lena", t:"For one fantasy game, we needed the sound of a dragon's wings. We tried all sorts – umbrellas, flags, a leather jacket – and in the end it was a large beach towel being flapped by two people that worked best."},
    {sp:"Lena", t:"What makes games different from film is that the sound has to react to the player. In a film, a scene is always the same. In a game, a sword might hit stone, or wood, or metal, at any speed, so we record dozens of variations of each sound. Otherwise players notice the repetition very quickly, and it breaks the illusion."},
    {sp:"Lena", t:"The part of the job people least expect is how much time I spend in spreadsheets. Our last game had over forty thousand individual sound files, and keeping track of them all is a huge task."},
    {sp:"Lena", t:"My favourite piece of equipment is a tiny microphone called a hydrophone, which records underwater. I've dropped it into rivers, into a fish tank, once into a bowl of jelly."},
    {sp:"Lena", t:"The biggest challenge in the industry right now is that players often use cheap headphones or phone speakers, so we have to make sure everything still sounds good on bad equipment."},
    {sp:"Lena", t:"If you want to get into sound design, start recording. Carry a recorder everywhere. A good library of your own sounds is worth more than any qualification."}
  ],
  qs:[
    {s:"Lena learnt to work with recorded sound in a job at a ___ .", ans:["radio station"], evidence:"a summer job at a radio station",
     why:"Letní brigáda v rádiu, stříhala reklamy.", trap:"Univerzita (studovala hudbu) – ale „really taught me“ patří k rádiu.", tt:"distractor"},
    {s:"The sound of a monster's bones breaking was made using ___ .", ans:["frozen celery","celery"], evidence:"Frozen celery, to be precise",
     why:"Zmrazený celer dává ostřejší křupnutí.", trap:"Pravopis: celery.", tt:"detail"},
    {s:"The best sound for a dragon's wings came from a ___ .", ans:["beach towel","large beach towel"], evidence:"it was a large beach towel being flapped",
     why:"Velkou plážovou osušku mávaly dvě osoby.", trap:"Deštníky, vlajky a bunda nefungovaly („tried all sorts“).", tt:"distractor"},
    {s:"Game sounds need many variations because players quickly notice ___ .", ans:["repetition","the repetition"], evidence:"players notice the repetition very quickly",
     why:"Opakování zvuku ruší iluzi.", trap:"„Illusion“ je to, co se rozbije – ne to, čeho si hráči všimnou.", tt:"paraphrase"},
    {s:"Lena spends a surprising amount of time working with ___ .", ans:["spreadsheets"], evidence:"how much time I spend in spreadsheets",
     why:"„The part people least expect“ = překvapivě tabulky.", trap:"„Sound files“ – ty v tabulkách eviduje.", tt:"paraphrase"},
    {s:"Lena's favourite microphone, which records underwater, is called a ___ .", ans:["hydrophone"], evidence:"a tiny microphone called a hydrophone",
     why:"Hydrofon = podvodní mikrofon.", trap:"Pravopis: hydro-phone (ph).", tt:"detail"},
    {s:"Designers must make sure games sound good through cheap headphones or ___ .", ans:["phone speakers"], evidence:"players often use cheap headphones or phone speakers",
     why:"Reproduktory telefonu.", trap:"„Bad equipment“ je shrnutí, ne konkrétní slova z nahrávky.", tt:"detail"},
    {s:"Lena believes a personal ___ of sounds is worth more than qualifications.", ans:["library"], evidence:"A good library of your own sounds",
     why:"Vlastní knihovna (sbírka) zvuků.", trap:"„Recorder“ je nástroj, ne to, co má větší hodnotu.", tt:"paraphrase"}
  ]},

{ id:"p2-06", title:"Cycling the Silk Road", context:"You will hear a man called Daniel talking about cycling from Italy to China.",
  speakers:{"Daniel":"M2"},
  lines:[
    {sp:"Daniel", t:"Thanks for coming. Two years ago I set off from Venice on a bicycle, and eleven months later I arrived in western China, having followed – roughly – the old Silk Road routes. I want to share a few things I learnt along the way."},
    {sp:"Daniel", t:"First, the bike. I deliberately chose a steel frame rather than a lighter one, because steel can be welded back together almost anywhere – any village with a mechanic, basically. And I did need that, twice."},
    {sp:"Daniel", t:"I'd assumed the mountains would be the toughest part physically. The roads in Tajikistan are above four thousand metres in places. But actually it was the headwinds in the Gobi desert that nearly broke me. Some days I was managing barely thirty kilometres."},
    {sp:"Daniel", t:"Food was a constant preoccupation. You burn something like five thousand calories a day, and I lost nine kilos despite eating constantly. The thing I craved most, bizarrely, was cheese, which is very hard to find in parts of Central Asia."},
    {sp:"Daniel", t:"The hospitality was overwhelming. In Iran especially, I was invited into people's homes almost every evening. I learnt a few phrases of Farsi before I went, and that made an enormous difference – people really appreciated the effort."},
    {sp:"Daniel", t:"I carried a small solar panel to charge my phone and camera. It was the best purchase I made. My paper maps, on the other hand, I posted home after a month – I hardly used them."},
    {sp:"Daniel", t:"Bureaucracy was by far the most stressful part of the trip. Visas, permits, border crossings where you wait for six hours not knowing why. I'd tell anyone planning something similar to leave far more time for paperwork than you think you need."},
    {sp:"Daniel", t:"People ask whether I was lonely. Honestly, very rarely. Being on a bicycle makes you approachable in a way that being in a car never does."},
    {sp:"Daniel", t:"I'm now writing a book about the journey, and I'm hoping to raise money for a charity that provides bicycles to girls in rural Kyrgyzstan, so they can get to school."}
  ],
  qs:[
    {s:"Daniel chose a steel frame because it can be ___ almost anywhere.", ans:["welded","welded back together"], evidence:"steel can be welded back together almost anywhere",
     why:"Ocel se dá svařit v každé vesnici s mechanikem.", trap:"Lehčí rám („lighter one“) zamítl.", tt:"detail"},
    {s:"Physically, the hardest part of the journey was the ___ in the desert.", ans:["headwinds","headwind","head winds"], evidence:"it was the headwinds in the Gobi desert that nearly broke me",
     why:"Protivítr v Gobi ho „skoro zlomil“.", trap:"Hory: „I'd assumed“ – předpoklad, který se nepotvrdil.", tt:"distractor"},
    {s:"Daniel lost ___ in weight during the trip.", ans:["nine kilos","9 kilos","nine kilograms","9 kilograms","9 kg","9kg"], evidence:"I lost nine kilos",
     why:"Zhubl devět kilo.", trap:"5 000 kalorií je jiné číslo.", tt:"detail"},
    {s:"The food Daniel missed most was ___ .", ans:["cheese"], evidence:"The thing I craved most, bizarrely, was cheese",
     why:"„Craved“ = nejvíc toužil.", trap:"Parafráze: craved → missed most.", tt:"paraphrase"},
    {s:"Learning some ___ before the trip helped Daniel in Iran.", ans:["Farsi"], evidence:"I learnt a few phrases of Farsi",
     why:"Pár frází persky (farsí).", trap:"Pravopis: Farsi.", tt:"detail"},
    {s:"The most useful item Daniel took with him was a ___ .", ans:["solar panel","small solar panel"], evidence:"I carried a small solar panel to charge my phone and camera. It was the best purchase I made",
     why:"Solární panel = nejlepší nákup.", trap:"Papírové mapy poslal domů – skoro je nepoužil.", tt:"distractor"},
    {s:"Daniel found ___ the most stressful aspect of the journey.", ans:["bureaucracy","the bureaucracy","paperwork"], evidence:"Bureaucracy was by far the most stressful part of the trip",
     why:"Byrokracie – víza, povolení, hranice.", trap:"Pravopis: bureaucracy.", tt:"detail"},
    {s:"The charity provides bicycles so that girls can get to ___ .", ans:["school"], evidence:"so they can get to school",
     why:"Kola pro dívky, aby se dostaly do školy.", trap:"Book = kniha o cestě, ne cíl charity.", tt:"detail"}
  ]},

{ id:"p2-07", title:"Saving the lido", context:"You will hear a woman called Margaret talking about a campaign to save an open-air swimming pool.",
  speakers:{"Margaret":"F1"},
  lines:[
    {sp:"Margaret", t:"Good morning. I'm Margaret, and I chair the Friends of Hillfield Lido, the open-air pool that some of you will remember was nearly turned into a car park eight years ago."},
    {sp:"Margaret", t:"The lido opened in nineteen thirty-six, and in its heyday it attracted up to three thousand swimmers on a hot Saturday. By the time the council closed it, it was getting fewer than fifty visitors a day."},
    {sp:"Margaret", t:"The official reason for closing was safety, but really it was money. The pool's heating system alone was costing more than the entire income from tickets."},
    {sp:"Margaret", t:"Our campaign started with a petition, which got a respectable number of signatures, but what really changed things was a 'swim-in' – about four hundred of us turned up in vintage swimming costumes and stood around the empty pool. That got us on the regional news, and suddenly the council started taking us seriously."},
    {sp:"Margaret", t:"We raised the money for restoration through a mix of grants and a crowdfunding appeal. The single most generous donation, incidentally, came not from a business but from a retired swimming teacher, who left us money in her will."},
    {sp:"Margaret", t:"The biggest technical decision was the heating. We went for solar panels on the roof of the changing rooms, combined with a heat pump. It means the water's a pleasant twenty-four degrees from May to September."},
    {sp:"Margaret", t:"What's been most rewarding for me is not the numbers, though they're excellent, but seeing who uses it. We have a group of women in their eighties who swim every single morning, and a teenage water polo team that trains on Thursday evenings."},
    {sp:"Margaret", t:"Our next project is a small café, which we hope will give the lido a reliable income during the winter months, when the pool's closed."},
    {sp:"Margaret", t:"So if you'd like to get involved, we're always looking for volunteers, especially people with experience of fundraising."}
  ],
  qs:[
    {s:"Eight years ago, there was a plan to turn the site into a ___ .", ans:["car park","carpark"], evidence:"nearly turned into a car park",
     why:"Z koupaliště mělo být parkoviště.", trap:"Britská angličtina: car park (ne parking lot).", tt:"detail"},
    {s:"At its most popular, the lido attracted up to ___ swimmers on a Saturday.", ans:["three thousand","3000","3,000"], evidence:"up to three thousand swimmers",
     why:"Až tři tisíce plavců v horkou sobotu.", trap:"„Fewer than fifty“ – to bylo před zavřením.", tt:"distractor"},
    {s:"Margaret says the real reason for closing the lido was ___ .", ans:["money"], evidence:"really it was money",
     why:"Oficiálně bezpečnost, ve skutečnosti peníze.", trap:"„Safety“ = oficiální důvod; otázka chce ten skutečný.", tt:"distractor"},
    {s:"The campaign got noticed after an event called a ___ .", ans:["swim-in","swim in"], evidence:"what really changed things was a 'swim-in'",
     why:"Akce „swim-in“ – 400 lidí v historických plavkách.", trap:"Petice měla jen „respectable number“ podpisů – zlom to nebyl.", tt:"distractor"},
    {s:"The largest single donation came from a retired ___ .", ans:["swimming teacher"], evidence:"from a retired swimming teacher",
     why:"Bývalá učitelka plavání odkázala peníze v závěti.", trap:"„Not from a business“ – firma to nebyla.", tt:"distractor"},
    {s:"The water is heated using solar panels and a ___ .", ans:["heat pump"], evidence:"combined with a heat pump",
     why:"Solární panely + tepelné čerpadlo.", trap:"Changing rooms = kde jsou panely, ne druhý zdroj tepla.", tt:"detail"},
    {s:"A teenage ___ team trains at the lido on Thursday evenings.", ans:["water polo","water-polo"], evidence:"a teenage water polo team that trains on Thursday evenings",
     why:"Vodní pólo.", trap:"Ženy po osmdesátce plavou ráno – jiná skupina.", tt:"detail"},
    {s:"The planned café should provide income during ___ .", ans:["the winter months","winter months","winter","the winter"], evidence:"during the winter months",
     why:"V zimě je bazén zavřený – kavárna přinese příjem.", trap:"„May to September“ je provoz bazénu.", tt:"detail"}
  ]},

{ id:"p2-08", title:"Mountain rescue dogs", context:"You will hear a man called Rob talking about his work with a mountain rescue search dog.",
  speakers:{"Rob":"M1"},
  lines:[
    {sp:"Rob", t:"Hello. I'm Rob, I'm a volunteer with a mountain rescue team in the Lake District, and this is Bramble, who's a search dog – she's the one who does the real work."},
    {sp:"Rob", t:"Bramble's a Border Collie, which is the most common breed in mountain rescue here, though I've worked alongside Labradors and even a German Shepherd. Collies are light, agile and they don't overheat easily."},
    {sp:"Rob", t:"Training takes about three years, and it all starts as a game. The very first exercise is someone running off and hiding behind a wall while the puppy watches. When the puppy finds them, it gets a reward – in Bramble's case, not food, but a tug toy. She'd do anything for that toy."},
    {sp:"Rob", t:"Gradually the 'missing person' – we call them the 'dogsbody', which always gets a laugh – hides further away, and out of sight, until the dog is searching purely by scent."},
    {sp:"Rob", t:"What people don't realise is that the dogs aren't following footprints. They're picking up the air scent – tiny particles of skin that we all shed constantly – so they can find someone even when they haven't seen where that person walked."},
    {sp:"Rob", t:"The final assessment is tough. The dog has to find three hidden people across a large area of hillside, at night as well as in daylight. Only about half of dogs pass first time."},
    {sp:"Rob", t:"Weather is the biggest factor in how effective a dog is. Strong wind can carry scent a long way, which helps, but heavy rain really dampens it down – literally."},
    {sp:"Rob", t:"Our busiest time is actually not winter, as you might expect, but late summer, when there are huge numbers of walkers, many of them not properly prepared."},
    {sp:"Rob", t:"Bramble's nearly nine now, so she'll retire next year. She'll stay with me as a pet, of course, and I've already started training a new puppy, called Moss."}
  ],
  qs:[
    {s:"One reason collies suit the work is that they don't easily ___ .", ans:["overheat"], evidence:"they don't overheat easily",
     why:"Nepřehřívají se.", trap:"Light a agile jsou další vlastnosti, ale gramaticky se do mezery hodí jen sloveso.", tt:"detail"},
    {s:"During training, Bramble's reward is a ___ .", ans:["tug toy"], evidence:"not food, but a tug toy",
     why:"Přetahovací hračka.", trap:"„Not food“ – jídlo výslovně ne.", tt:"distractor"},
    {s:"The person who hides during training is jokingly called the ___ .", ans:["dogsbody","dog's body","dogs body"], evidence:"we call them the 'dogsbody'",
     why:"Slovní hříčka – dogsbody (běžně „poskok“).", trap:"„Missing person“ je obecný název, ne přezdívka.", tt:"detail"},
    {s:"Search dogs follow the ___ rather than footprints.", ans:["air scent","airscent"], evidence:"They're picking up the air scent",
     why:"Pach ve vzduchu – částečky kůže.", trap:"Footprints = to, co psi NEsledují.", tt:"distractor"},
    {s:"In the final assessment, dogs must find people in daylight and also ___ .", ans:["at night","in the dark"], evidence:"at night as well as in daylight",
     why:"Ve dne i v noci.", trap:"Počet osob (tři) se do mezery nehodí.", tt:"detail"},
    {s:"Rob says that ___ makes it harder for dogs to pick up a scent.", ans:["heavy rain","rain"], evidence:"heavy rain really dampens it down",
     why:"Silný déšť pach „sráží“.", trap:"Silný vítr naopak pomáhá.", tt:"distractor"},
    {s:"The team is busiest in ___ .", ans:["late summer"], evidence:"not winter, as you might expect, but late summer",
     why:"Pozdní léto – hodně nepřipravených turistů.", trap:"„Not winter, as you might expect“.", tt:"distractor"},
    {s:"Rob's new puppy is called ___ .", ans:["Moss"], evidence:"called Moss",
     why:"Nové štěně se jmenuje Moss.", trap:"Bramble je stará fena, která jde do penze.", tt:"distractor"}
  ]}
];

/* ===================================================================================== PART 3 */
L.p3 = [
{ id:"p3-01", title:"The psychology of boredom", context:"You will hear an interview with a psychologist called Clare Holt, who has written a book about boredom.",
  speakers:{"Interviewer":"M1","Clare":"F1"},
  lines:[
    {sp:"Interviewer", t:"My guest today is the psychologist Clare Holt, whose new book argues that we've got boredom all wrong. Clare, welcome."},
    {sp:"Clare", t:"Thank you. Lovely to be here."},
    {sp:"Interviewer", t:"So what first drew you to boredom as a subject? It's not exactly glamorous."},
    {sp:"Clare", t:"No, and that was rather the point. When I started, almost nobody in psychology took it seriously. It was seen as a sort of trivial, passing mood – something children complain about on long car journeys. But I was working with patients recovering from brain injuries at the time, and I kept noticing that boredom was one of the things they found most distressing – more than pain, in some cases. That made me think we'd badly underestimated it."},
    {sp:"Interviewer", t:"And your central argument is that boredom is actually useful?"},
    {sp:"Clare", t:"Useful is perhaps a bit strong. I'd say it's informative. Boredom is a signal, a bit like hunger. It tells you that what you're doing isn't meaningful to you – that you need to change something. The problem is that we've got very good at silencing that signal without listening to it."},
    {sp:"Interviewer", t:"With our phones, you mean."},
    {sp:"Clare", t:"Partly, yes, although I'm wary of blaming everything on technology. People in the eighteenth century had their distractions too. What's different now is the sheer speed. The moment there's a gap, we fill it, so we never get to the point of asking 'why am I bored?'"},
    {sp:"Interviewer", t:"There's been a lot written about boredom and creativity – the idea that being bored makes you more creative. Is that something you'd go along with?"},
    {sp:"Clare", t:"Well, there's one well-known study where people did a very dull task – copying numbers out of a phone book, I think – and then had to come up with uses for a plastic cup. And the bored group came up with more ideas. It's been widely reported. But when others have tried to repeat it, the results have been, let's say, mixed. So I'd be cautious. I think boredom can push you towards creativity, but only if you have the freedom to act on it."},
    {sp:"Interviewer", t:"You also distinguish between what you call 'situational' and 'chronic' boredom."},
    {sp:"Clare", t:"Yes. Situational boredom is the queue at the post office – it ends when the situation ends. Chronic boredom is more of a trait; some people are simply more prone to it, and they tend to be more at risk of things like impulsive spending. What interested me was that it's not about having nothing to do. Chronically bored people are often extremely busy. It's that nothing feels engaging."},
    {sp:"Interviewer", t:"So what would you advise? How should we be bored better?"},
    {sp:"Clare", t:"I'd love to say 'put your phone in a drawer', and that's not bad advice. But honestly, I think the more important thing is curiosity. When you notice you're bored, instead of reaching for something to fill the gap, stay with it for a minute and ask what it's telling you. Most of the time the answer's fairly mundane – you're tired, you need a break. But occasionally it's telling you something much bigger about your life."}
  ],
  qs:[
    {q:"What made Clare decide to study boredom?", opts:["She had suffered from chronic boredom herself.","She noticed how much it affected a particular group of people.","She wanted to challenge a theory about children's behaviour.","She felt colleagues had misinterpreted her earlier work."], correct:1,
     evidence:"boredom was one of the things they found most distressing",
     why:"U pacientů po úrazech mozku byla nuda někdy horší než bolest – to ji přivedlo k tématu.",
     trap:"Děti v autě jsou příklad toho, jak nudu všichni zlehčovali – žádnou teorii nevyvrací.", tt:"distractor"},
    {q:"What is Clare's main point about boredom?", opts:["It can prompt people to reconsider what they are doing.","It is something people should try to avoid.","It is largely caused by modern technology.","It is more common than it used to be."], correct:0,
     evidence:"It tells you that what you're doing isn't meaningful to you",
     why:"Nuda je signál (jako hlad), že je třeba něco změnit.",
     trap:"Technologie: „I'm wary of blaming everything on technology“.", tt:"distractor"},
    {q:"According to Clare, what is new about how people respond to boredom today?", opts:["They feel guiltier about it.","They are less willing to admit to it.","They depend on others to relieve it.","They react to it almost immediately."], correct:3,
     evidence:"What's different now is the sheer speed",
     why:"Každou mezeru hned zaplníme – nové je tempo (speed).",
     trap:"Rozptýlení měli lidé i v 18. století – to nové není.", tt:"paraphrase"},
    {q:"What is Clare's view of the research into boredom and creativity?", opts:["It has been unfairly criticised.","It relied on unsuitable tasks.","Its findings have not been reliably confirmed.","It has been ignored by the media."], correct:2,
     evidence:"the results have been, let's say, mixed",
     why:"Opakované studie dávají smíšené výsledky → nepotvrzeno.",
     trap:"Média naopak studii hojně citovala („widely reported“).", tt:"distractor"},
    {q:"What point does Clare make about chronically bored people?", opts:["They usually have too little to occupy them.","Their lives may in fact be very full.","Their boredom is generally related to work.","They are aware of the risks they face."], correct:1,
     evidence:"Chronically bored people are often extremely busy",
     why:"Nejde o nedostatek činnosti – mají jí hodně, jen je nic nezaujme.",
     trap:"„It's not about having nothing to do“ – první možnost je přesný opak.", tt:"distractor"},
    {q:"What does Clare recommend?", opts:["spending less time on mobile phones","taking more frequent breaks","making major changes to one's life","paying close attention to the feeling of boredom"], correct:3,
     evidence:"stay with it for a minute and ask what it's telling you",
     why:"Zůstat u nudy a ptát se, co říká = věnovat jí pozornost; „more important thing is curiosity“.",
     trap:"Telefon do šuplíku je „not bad advice“, ale důležitější je zvědavost.", tt:"distractor"}
  ]},

{ id:"p3-02", title:"A literary translator", context:"You will hear an interview with a literary translator called Sofia Marin.",
  speakers:{"Interviewer":"M2","Sofia":"F3"},
  lines:[
    {sp:"Interviewer", t:"Today I'm talking to Sofia Marin, who has translated more than thirty novels from Spanish and Catalan into English. Sofia, how did you become a translator?"},
    {sp:"Sofia", t:"Rather by the back door. I was teaching English in Barcelona in my twenties and I'd fallen in love with a particular novel – a very strange, funny book about a family of clockmakers. There was no English version, so I started translating bits of it for my friends back home, just so they'd understand why I kept going on about it. One of them happened to work in publishing. And that was that."},
    {sp:"Interviewer", t:"People often say translation is impossible – that something is always lost. Do you agree?"},
    {sp:"Sofia", t:"Something is always lost, yes. But something's also gained, which people tend to forget. When I translate a joke that relies on a pun in Spanish, I can't keep the pun, but I can sometimes find a different joke in English that does the same job. Is that betrayal? I'd say it's the opposite. A translation that's faithful to every word but isn't funny when the original is funny – that's the real betrayal."},
    {sp:"Interviewer", t:"How closely do you work with the authors?"},
    {sp:"Sofia", t:"It varies enormously. Some authors want to see every page and argue over every comma. Others say, 'It's your book now, do what you like.' Honestly, I find the second kind more nerve-racking. With the first, at least you know where you stand."},
    {sp:"Sofia", t:"One writer I worked with, who reads English quite well, sent me forty pages of notes. I was furious at first – and then I realised about half of them were right."},
    {sp:"Interviewer", t:"Translators are often invisible – your name might not even be on the cover. Does that bother you?"},
    {sp:"Sofia", t:"It used to. There's been a real campaign in recent years to get translators' names on covers, and I've been part of it. Partly it's about recognition, of course, but it's also about honesty. Readers deserve to know that the words they're reading were chosen by someone other than the author. Otherwise you get reviewers praising the 'beautiful prose' of a writer who didn't write a single one of those English sentences."},
    {sp:"Interviewer", t:"And what's next for you?"},
    {sp:"Sofia", t:"I'm finishing a very long historical novel – nine hundred pages – which has nearly finished me, frankly. After that, I'm going to do something I've never done: translate poetry. Everyone tells me it's madness. But I think if I don't try now, I never will, and I'd regret that more than any number of bad reviews."}
  ],
  qs:[
    {q:"How did Sofia begin her career as a translator?", opts:["She trained as a translator while teaching abroad.","A publisher asked her to translate a novel.","She won a prize for a translation.","She translated a book she loved for people she knew."], correct:3,
     evidence:"I started translating bits of it for my friends back home",
     why:"Překládala úryvky oblíbené knihy pro kamarády doma; jeden pracoval v nakladatelství.",
     trap:"Nakladatel ji nejdřív neoslovil – kamarád „happened to work in publishing“ až poté.", tt:"paraphrase"},
    {q:"What is Sofia's view on translating humour?", opts:["Recreating the effect matters more than the exact words.","It is the most difficult part of her work.","Puns should be explained in notes.","Some jokes are best left out."], correct:0,
     evidence:"A translation that's faithful to every word but isn't funny when the original is funny – that's the real betrayal",
     why:"Důležité je, aby to bylo vtipné (efekt), ne doslovnost.",
     trap:"„Something is always lost“ – ale nezmiňuje, že je to nejtěžší.", tt:"paraphrase"},
    {q:"How does Sofia feel about authors who give her complete freedom?", opts:["grateful for their trust","suspicious of their motives","anxious about the responsibility","frustrated by their lack of interest"], correct:2,
     evidence:"I find the second kind more nerve-racking",
     why:"„Nerve-racking“ = nervy drásající → úzkost z odpovědnosti.",
     trap:"Autor „It's your book now“ by mohl působit jako projev důvěry, ale ptáme se na JEJÍ pocit.", tt:"attitude"},
    {q:"Sofia's reaction to the author's forty pages of notes shows that she", opts:["resented his interference in her work.","was prepared to reconsider her first response.","doubted his knowledge of English.","had made some careless errors."], correct:1,
     evidence:"and then I realised about half of them were right",
     why:"Nejdřív zuřila, pak uznala polovinu poznámek → přehodnotila reakci.",
     trap:"„I was furious at first“ – první reakce se změnila.", tt:"change"},
    {q:"Why does Sofia believe translators should be named on book covers?", opts:["Readers should know who actually wrote the words they read.","Translators deserve to be better paid.","It would attract more people to the profession.","Reviewers often criticise translations unfairly."], correct:0,
     evidence:"Readers deserve to know that the words they're reading were chosen by someone other than the author",
     why:"Jde o poctivost vůči čtenářům.",
     trap:"Recenzenti translace nekritizují – naopak chválí autora za „krásný styl“, který napsal překladatel.", tt:"distractor"},
    {q:"How does Sofia feel about translating poetry?", opts:["She doubts she has the ability.","She expects it to be less demanding than fiction.","She is determined to try it despite others' warnings.","She hopes it will bring her greater recognition."], correct:2,
     evidence:"if I don't try now, I never will",
     why:"Všichni říkají, že je to šílenství, ale chce to zkusit hned.",
     trap:"„Everyone tells me it's madness“ = varování ostatních, ne její pochybnost.", tt:"attitude"}
  ]},

{ id:"p3-03", title:"Car-free city centres", context:"You will hear part of a radio discussion about a car-free city centre with an urban planner, Jane Rowe, and Nick Adebayo, who represents local shopkeepers.",
  speakers:{"Presenter":"M3","Jane":"F2","Nick":"M1"},
  lines:[
    {sp:"Presenter", t:"Today we're discussing car-free city centres with Jane Rowe, an urban planner who advised on the pedestrianisation of Bridgeford's city centre, and Nick Adebayo, who represents independent retailers in the area. Jane, it's now two years since cars were banned. Has it worked?"},
    {sp:"Jane", t:"By most measures, yes. Air quality's improved dramatically – nitrogen dioxide is down by about a third. But what I'm proudest of, honestly, is something less measurable. People linger now. You see families sitting on benches that didn't exist before, children playing where there used to be traffic. The centre's become somewhere you spend time, not just pass through."},
    {sp:"Presenter", t:"Nick, your members were strongly opposed at the start."},
    {sp:"Nick", t:"We were, and I won't pretend otherwise. The fear was that if customers couldn't park outside, they'd go to the out-of-town shopping centres instead. And for the first six months or so, that fear seemed justified. Several shops saw takings drop sharply."},
    {sp:"Presenter", t:"And now?"},
    {sp:"Nick", t:"Now the picture's more complicated. Cafés and restaurants are doing extremely well – they've got outdoor seating, people are strolling. But shops selling bulky goods, furniture, hardware, they're still struggling. If you're buying a lawnmower, you don't want to carry it half a mile to the bus stop."},
    {sp:"Jane", t:"That's a fair point, and it's something we underestimated. We've now introduced a delivery service – you pay in the shop and it's brought to your car at the edge of the zone."},
    {sp:"Nick", t:"Which is welcome, though it took a lot of lobbying to get it."},
    {sp:"Presenter", t:"What about people with disabilities? There were concerns about access."},
    {sp:"Jane", t:"Yes, and rightly. We kept a small number of disabled parking spaces inside the zone and introduced an electric shuttle. Is it perfect? No. Some people still find it harder to get into the centre than before, and we're working with disability groups on that."},
    {sp:"Presenter", t:"Nick, if another city asked your advice, what would you say?"},
    {sp:"Nick", t:"I'd say: don't do it overnight. Bridgeford went from cars everywhere to no cars at all in a single weekend. A phased approach – a few streets at a time – would have given businesses time to adapt, and probably avoided a lot of the hostility."},
    {sp:"Jane", t:"I'd actually agree with that. Though I'd add that you also need some political courage. Every scheme like this is unpopular at first. If you wait for everyone to agree, you'll wait forever."}
  ],
  qs:[
    {q:"What is Jane most pleased about regarding the scheme?", opts:["the improvement in air quality","the reduction in accidents","the way people now use the city centre","the creation of new green spaces"], correct:2,
     evidence:"People linger now",
     why:"„Proudest of“ = něco méně měřitelného → lidé se v centru zdržují.",
     trap:"Kvalita vzduchu je změřený úspěch, ale „But what I'm proudest of…“ ukazuje jinam.", tt:"distractor"},
    {q:"According to Nick, how has the scheme affected local businesses?", opts:["Most have eventually recovered their losses.","The effect has depended on what they sell.","Many have moved to out-of-town sites.","All types of business have benefited in the end."], correct:1,
     evidence:"Now the picture's more complicated",
     why:"Kavárnám se daří, obchodům s objemným zbožím ne.",
     trap:"Stěhování mimo město byla jen počáteční obava („The fear was…“).", tt:"distractor"},
    {q:"What does Jane admit about the planning of the scheme?", opts:["Some traders' needs were not properly anticipated.","Retailers were never consulted.","The delivery service has not worked well.","The scheme was introduced too early."], correct:0,
     evidence:"it's something we underestimated",
     why:"Podcenili potřeby obchodů s objemným zbožím.",
     trap:"Doručovací služba je řešení, které Nick vítá („welcome“).", tt:"paraphrase"},
    {q:"How does Jane respond to concerns about disabled access?", opts:["She claims the problem has been resolved.","She suggests the concerns were exaggerated.","She blames a shortage of funding.","She accepts that problems still exist."], correct:3,
     evidence:"Some people still find it harder to get into the centre than before",
     why:"„Is it perfect? No.“ – přiznává trvající potíže.",
     trap:"„Yes, and rightly“ – obavy považuje za oprávněné, ne přehnané.", tt:"attitude"},
    {q:"What does Nick think should have been done differently?", opts:["Businesses should have been compensated.","The change should have been introduced gradually.","More parking should have been provided nearby.","The public should have voted on the plan."], correct:1,
     evidence:"A phased approach – a few streets at a time",
     why:"Postupně, ulici po ulici, ne přes jeden víkend.",
     trap:"„Don't do it overnight“ – parafráze slova gradually.", tt:"paraphrase"},
    {q:"What do Jane and Nick agree about?", opts:["Schemes like this need strong political leadership.","Public opinion will always be divided.","The speed of the change was a mistake.","Shopkeepers should have helped design the scheme."], correct:2,
     evidence:"I'd actually agree with that",
     why:"Jane souhlasí s Nickem, že zavést to přes víkend byla chyba.",
     trap:"Politickou odvahu přidává jen Jane („I'd add“) – to už není společný názor.", tt:"distractor"}
  ]},

{ id:"p3-04", title:"Turning back: a polar explorer", context:"You will hear an interview with a polar explorer called Ed Marsh, who abandoned an expedition to the South Pole.",
  speakers:{"Interviewer":"F1","Ed":"M3"},
  lines:[
    {sp:"Interviewer", t:"My guest is the polar explorer Ed Marsh, who last year abandoned an attempt to ski solo to the South Pole, just two hundred kilometres from his goal. Ed, that must have been agonising."},
    {sp:"Ed", t:"It was, though perhaps not in the way people imagine. The physical side I'd prepared for – I knew I'd be exhausted, hungry, cold. What I hadn't prepared for was how hard it would be to make the decision alone. On previous expeditions there'd always been someone to talk it through with. Out there it was just me and a voice in my head telling me two different things."},
    {sp:"Interviewer", t:"What actually made you stop?"},
    {sp:"Ed", t:"Frostbite, initially, in two toes. Now, a lot of polar travellers would have carried on with that, and in the past I might have done too. But I'd been reading quite a lot about decision-making before the trip – about something called 'summit fever', where people get so fixated on a goal that they ignore the warning signs. And I suppose I recognised it in myself. I'd started making excuses for every bad sign."},
    {sp:"Interviewer", t:"How did people react?"},
    {sp:"Ed", t:"Mostly with kindness. But there were some comments online – people saying I'd lost my nerve. That stung at the time. What's surprised me, though, is how many people have written to me since – not explorers, just ordinary people, a nurse, a businesswoman – saying they'd faced a similar choice about giving up on something and found my story helpful."},
    {sp:"Interviewer", t:"Do you see it as a failure?"},
    {sp:"Ed", t:"I did for about a month. I'd lie awake replaying it. Now – and I'm aware this might sound like I'm just making myself feel better – I think it's the best decision I've made as an expedition leader. Success in this field is often defined very narrowly: did you get there or not? But coming home with all ten toes and the ability to go again – that's a kind of success too."},
    {sp:"Interviewer", t:"Will you go again?"},
    {sp:"Ed", t:"Yes, in two years. I'm going to do things differently, though. I'm going to agree my turnaround conditions in advance with my support team – specific, measurable things, like if my body temperature drops below a certain point. So the decision's taken out of my hands, in a sense, when I'm least able to make it well."},
    {sp:"Interviewer", t:"And what would you say to young adventurers?"},
    {sp:"Ed", t:"That the mountain – or the ice – will still be there. It sounds like a cliché, but you'd be amazed how many talented people die because they forgot it. Ambition's essential in this game, but it needs a partner, and that partner is humility."}
  ],
  qs:[
    {q:"What does Ed say was hardest about abandoning the expedition?", opts:["dealing with extreme physical exhaustion","having to decide without anyone's support","letting down the people who funded him","realising that his planning had been poor"], correct:1,
     evidence:"how hard it would be to make the decision alone",
     why:"Na fyzickou stránku byl připraven, ne na rozhodování o samotě.",
     trap:"Vyčerpání, hlad a zima: „The physical side I'd prepared for“.", tt:"distractor"},
    {q:"Why did Ed decide to turn back?", opts:["His injury had become life-threatening.","His support team ordered him to.","He had run short of supplies.","He saw that his goal was distorting his judgement."], correct:3,
     evidence:"And I suppose I recognised it in myself",
     why:"Poznal na sobě „summit fever“ – omlouval si každé varovné znamení.",
     trap:"Omrzliny byly jen začátek („initially“) – mnozí by s nimi pokračovali.", tt:"inference"},
    {q:"What has surprised Ed about people's reactions?", opts:["how relevant others found his experience","how harsh some of the criticism was","how quickly people forgot about it","how little interest other explorers showed"], correct:0,
     evidence:"saying they'd faced a similar choice about giving up on something and found my story helpful",
     why:"Píšou mu běžní lidé, kterým jeho příběh pomohl.",
     trap:"Kritika online „stung“ (bolela), ale nepřekvapila ho – „What's surprised me, though…“.", tt:"distractor"},
    {q:"How does Ed now regard his decision?", opts:["He still has doubts about whether it was right.","He feels it damaged his reputation.","He regards it as a success of a different kind.","He wishes he had turned back sooner."], correct:2,
     evidence:"that's a kind of success too",
     why:"Vrátil se se všemi prsty a může jet znovu = jiný druh úspěchu.",
     trap:"Měsíc to považoval za selhání („I did for about a month“) – změna názoru.", tt:"change"},
    {q:"What will Ed do differently next time?", opts:["take a companion with him","follow a different route","set clear conditions for turning back beforehand","spend longer preparing physically"], correct:2,
     evidence:"agree my turnaround conditions in advance",
     why:"Předem s týmem stanoví měřitelná kritéria pro návrat.",
     trap:"Podpůrný tým = s kým to dohodne, ne nový společník na cestu.", tt:"paraphrase"},
    {q:"What advice does Ed give to young adventurers?", opts:["Ambition must be balanced by an awareness of one's limits.","Talent is less important than preparation.","They should learn from more experienced explorers.","They should avoid unnecessary risks."], correct:0,
     evidence:"it needs a partner, and that partner is humility",
     why:"Ambice potřebuje „partnera“ – pokoru.",
     trap:"„Talented people die“ – neříká, že talent je méně důležitý než příprava.", tt:"paraphrase"}
  ]},

{ id:"p3-05", title:"The repair café", context:"You will hear part of a radio programme recorded at a repair café, with its founder Helen Price and a volunteer, Dev Patel.",
  speakers:{"Interviewer":"M2","Helen":"F2","Dev":"M1"},
  lines:[
    {sp:"Interviewer", t:"I'm at the Saturday repair café in Ashbury community hall, where volunteers fix broken items for free. I'm with the founder, Helen Price, and one of the volunteers, Dev Patel. Helen, where did the idea come from?"},
    {sp:"Helen", t:"From a toaster, believe it or not. Mine stopped working, and when I took it back to the shop, the assistant just laughed and said it wasn't worth repairing – I should buy a new one for twelve pounds. And something about that really annoyed me. Not the money, so much – it was the assumption that everything's disposable. I'd read about repair cafés in the Netherlands, so I thought, why not here?"},
    {sp:"Interviewer", t:"Dev, you're one of the electrical volunteers. What do people bring in?"},
    {sp:"Dev", t:"Everything. Lamps, vacuum cleaners, a lot of laptops. And honestly, about two thirds of what we see, we can fix. Often it's something tiny – a loose wire, a blown fuse. What frustrates me is when manufacturers make things deliberately hard to open. Special screws, everything glued together. You can tell some products were designed never to be repaired."},
    {sp:"Interviewer", t:"Is that changing?"},
    {sp:"Dev", t:"Slowly. There's new legislation – the so-called right to repair – which means manufacturers have to make spare parts available for a certain number of years. It's a start. But I'll believe it when I see it on my workbench."},
    {sp:"Interviewer", t:"Helen, is there a social side to all this?"},
    {sp:"Helen", t:"Oh, enormously. In fact, if you'd told me at the start that it would turn into a social club, I'd have been surprised. We have people who come every week even when they've got nothing broken – they just sit and have a cup of tea and chat. And there's a lovely exchange of skills: our sewing volunteer is teaching a couple of teenagers to use a machine."},
    {sp:"Interviewer", t:"And what about the people whose things can't be fixed?"},
    {sp:"Dev", t:"We always explain why. I think that matters. Even if we can't save the item, people go away understanding a bit more about how things work – and hopefully they'll think twice next time they buy something cheap that won't last."},
    {sp:"Interviewer", t:"Finally, Helen – what's next?"},
    {sp:"Helen", t:"We'd like to open more often, but the honest truth is we're limited by volunteers. Plenty of people want to help, but what we really need are people with specific skills – electrics, bicycle mechanics. So that's our appeal, really. Money's useful, but skills are what we're short of."}
  ],
  qs:[
    {q:"What prompted Helen to set up the repair café?", opts:["She could not afford to replace a broken appliance.","She objected to an attitude she came across.","She had volunteered at a repair café abroad.","She wanted to bring her community together."], correct:1,
     evidence:"it was the assumption that everything's disposable",
     why:"Vadil jí předpoklad, že vše je na jedno použití.",
     trap:"„Not the money, so much“ – peníze odmítá; o Nizozemsku jen četla.", tt:"distractor"},
    {q:"What frustrates Dev about some products?", opts:["They are made from poor-quality materials.","Spare parts are too expensive.","They have been designed to prevent repair.","They come without proper instructions."], correct:2,
     evidence:"designed never to be repaired",
     why:"Speciální šrouby, lepení – výrobky navržené tak, aby nešly opravit.",
     trap:"Náhradní díly zmíní až u zákona – ne jako to, co ho štve.", tt:"paraphrase"},
    {q:"How does Dev feel about the new legislation?", opts:["doubtful about its practical effect","confident it will transform the industry","worried that it will raise prices","disappointed that it does not go further"], correct:0,
     evidence:"I'll believe it when I see it on my workbench",
     why:"Idiom „I'll believe it when I see it“ = skepse.",
     trap:"„It's a start“ zní pozitivně, ale tón celé odpovědi je opatrný.", tt:"attitude"},
    {q:"What does Helen say about the social side of the café?", opts:["It was her main aim from the beginning.","It mainly attracts older people.","It sometimes distracts from the repairs.","It is something she did not foresee."], correct:3,
     evidence:"if you'd told me at the start that it would turn into a social club, I'd have been surprised",
     why:"Nečekala, že z toho bude společenský klub.",
     trap:"Starší lidé nejsou zmíněni; chodí i teenageři.", tt:"inference"},
    {q:"Why does Dev explain to people why their items cannot be repaired?", opts:["to avoid upsetting them","to influence what they buy in future","to encourage them to come back","to show the volunteers have done their best"], correct:1,
     evidence:"hopefully they'll think twice next time they buy something cheap",
     why:"Chce, aby si příště rozmysleli nákup levné věci.",
     trap:"„Understanding how things work“ je mezikrok, cílem je změna nákupního chování.", tt:"inference"},
    {q:"What does the repair café most need at the moment?", opts:["more funding","bigger premises","more publicity","volunteers with particular expertise"], correct:3,
     evidence:"what we really need are people with specific skills",
     why:"Lidé s konkrétními dovednostmi – elektrikáři, cyklomechanici.",
     trap:"„Money's useful, but…“ – peníze nejsou hlavní potřeba.", tt:"distractor"}
  ]},

{ id:"p3-06", title:"The science of sleep", context:"You will hear an interview with a sleep scientist called Simon Reid.",
  speakers:{"Interviewer":"F3","Simon":"M2"},
  lines:[
    {sp:"Interviewer", t:"My guest is the sleep scientist Simon Reid. Simon, we're constantly told we're in the middle of a 'sleep crisis'. Is that true?"},
    {sp:"Simon", t:"Well, I'm a bit wary of the word 'crisis'. If you look at the long-term data, average sleep duration in this country hasn't actually fallen that much over the past fifty years – perhaps twenty minutes or so. What has changed is how anxious we are about sleep. And ironically, worrying about not sleeping is one of the best ways to stop yourself sleeping."},
    {sp:"Interviewer", t:"So the sleep trackers so many of us wear – are they part of the problem?"},
    {sp:"Simon", t:"For some people, yes. We've even got a name for it: 'orthosomnia' – an obsession with achieving perfect sleep data. I've had patients who slept perfectly well, felt fine, but were distressed because their watch told them they'd had too little deep sleep. And the thing is, these devices are not very accurate at measuring sleep stages. They're estimating, based on movement and heart rate."},
    {sp:"Interviewer", t:"What about the idea that we should all get eight hours?"},
    {sp:"Simon", t:"It's an average, not a rule. Some people genuinely function well on six and a half; others need nine. The best guide, honestly, is how you feel during the day. If you're alert and don't need three coffees to get through the morning, you're probably getting enough."},
    {sp:"Interviewer", t:"Teenagers are often accused of being lazy because they sleep late."},
    {sp:"Simon", t:"And that's deeply unfair. During adolescence, the body clock genuinely shifts later – a teenager's brain isn't ready for sleep until around eleven. So forcing them up at seven for school is a bit like asking an adult to get up at five. There's good evidence that starting school later improves both attendance and exam results. I find it frustrating that so few schools have acted on it."},
    {sp:"Interviewer", t:"And the single most useful piece of advice for someone who sleeps badly?"},
    {sp:"Simon", t:"People expect me to say 'no screens before bed', and that helps a bit. But actually the most effective thing, by far, is getting up at the same time every day – including weekends. It's not glamorous advice, and people hate it, because they want their lie-ins. But a consistent wake-up time anchors your whole body clock."},
    {sp:"Interviewer", t:"Has your research changed your own habits?"},
    {sp:"Simon", t:"Embarrassingly little! I still check my emails in bed sometimes. But I've stopped feeling guilty about the occasional bad night. One poor night's sleep really doesn't matter much – the body's remarkably good at catching up. It's the pattern over weeks that counts."}
  ],
  qs:[
    {q:"What is Simon's view of the so-called 'sleep crisis'?", opts:["It is clearly supported by long-term data.","Its seriousness has been exaggerated.","It is the result of new working patterns.","It mainly affects younger people."], correct:1,
     evidence:"hasn't actually fallen that much",
     why:"Spánek se za 50 let zkrátil jen o cca 20 minut → „krize“ je přehnaná.",
     trap:"Dlouhodobá data krizi naopak nepotvrzují.", tt:"paraphrase"},
    {q:"What point does Simon make about sleep trackers?", opts:["They can cause needless anxiety.","They help to diagnose sleep disorders.","They are becoming increasingly accurate.","They encourage people to sleep longer."], correct:0,
     evidence:"were distressed because their watch told them",
     why:"Lidé, kteří spali dobře, byli ve stresu kvůli datům z hodinek.",
     trap:"„Not very accurate“ – přesnost naopak zpochybňuje.", tt:"distractor"},
    {q:"According to Simon, the best way to judge whether you are sleeping enough is to", opts:["count the hours you sleep.","compare yourself with other people.","notice how you feel during the day.","monitor how much coffee you drink."], correct:2,
     evidence:"The best guide, honestly, is how you feel during the day",
     why:"Nejlepší vodítko = jak se cítíte přes den.",
     trap:"Káva je jen příklad příznaku, ne metoda.", tt:"distractor"},
    {q:"What is Simon's attitude towards schools regarding teenagers' sleep?", opts:["He sympathises with the difficulties schools face.","He thinks parents should take more responsibility.","He believes the evidence is still unclear.","He is frustrated that they have not responded."], correct:3,
     evidence:"I find it frustrating that so few schools have acted on it",
     why:"Frustruje ho, že školy nereagují na jasné důkazy.",
     trap:"„Good evidence“ – důkazy považuje za jasné.", tt:"attitude"},
    {q:"What does Simon consider the most effective advice for poor sleepers?", opts:["avoiding screens before going to bed","waking up at the same time every day","having a lie-in at the weekend","going to bed earlier"], correct:1,
     evidence:"the most effective thing, by far, is getting up at the same time every day",
     why:"Pravidelné vstávání ukotví biologické hodiny.",
     trap:"Obrazovky: „People expect me to say…“ – pomáhá jen „a bit“.", tt:"distractor"},
    {q:"What has Simon's research taught him personally?", opts:["to stop using his phone in bed","to go to bed at a regular time","not to worry about the odd bad night","to change his working hours"], correct:2,
     evidence:"I've stopped feeling guilty about the occasional bad night",
     why:"Jedna špatná noc nevadí – rozhoduje dlouhodobý vzorec.",
     trap:"Maily v posteli kontroluje dál („Embarrassingly little!“).", tt:"distractor"}
  ]},

{ id:"p3-07", title:"A documentary photographer", context:"You will hear an interview with a documentary photographer called Kate Morrow.",
  speakers:{"Interviewer":"M1","Kate":"F1"},
  lines:[
    {sp:"Interviewer", t:"My guest is the documentary photographer Kate Morrow, whose exhibition of portraits of fishing communities opens next week. Kate, you spent three years on this project. Why so long?"},
    {sp:"Kate", t:"Because trust takes time. When I first turned up in the harbour with my camera, people were polite but very guarded. They'd had journalists come before, take a few dramatic pictures of storms and leave. So for the first six months, I barely took a photo. I just went out on the boats, helped with the nets, made a lot of mistakes. It was only once they'd seen me seasick at four in the morning that they started to treat me as something other than a tourist."},
    {sp:"Interviewer", t:"The photographs are very quiet. There aren't many of storms or dramatic catches."},
    {sp:"Kate", t:"That was deliberate. The dramatic image is the easy one, and it's the one everyone expects. But it's also a kind of distortion. The reality of fishing is mostly repetition – mending nets, cleaning, waiting for the weather to turn. I wanted to show the patience involved, which I think is a much more interesting story, though admittedly harder to sell to a magazine."},
    {sp:"Interviewer", t:"You use film rather than digital. Why?"},
    {sp:"Kate", t:"People assume it's nostalgia, and maybe there's a little of that. But the real reason is practical. With film I have thirty-six shots on a roll, so I think much harder before I press the shutter. With digital I'd take hundreds and look at the screen instead of the person in front of me. Film keeps me present."},
    {sp:"Interviewer", t:"Did the people you photographed see the pictures before the exhibition?"},
    {sp:"Kate", t:"Every one of them. That's something I feel strongly about. I had a rule that if anyone wasn't happy with an image, it wouldn't be shown. And a couple were withdrawn – one of my favourites, actually, of an old man laughing. His daughter felt it made him look frail. I was disappointed, of course, but I respected it. It's their life, not mine."},
    {sp:"Interviewer", t:"What do you hope visitors take away?"},
    {sp:"Kate", t:"Not pity, certainly. There's a tendency to photograph these communities as if they're dying – the last fishermen, that kind of thing. And yes, the industry's shrunk. But there are young people going into it, new cooperatives, people adapting. I'd like visitors to come away with respect rather than sympathy."},
    {sp:"Interviewer", t:"And what's next?"},
    {sp:"Kate", t:"Something completely different, I think – urban, maybe. After three years by the sea I need to see things with fresh eyes. The danger with a long project is that you stop noticing."}
  ],
  qs:[
    {q:"Why did Kate take very few photographs at the start of the project?", opts:["She was still learning to use her equipment.","She needed to win the community's trust first.","The weather made photography impossible.","She had not yet decided what to focus on."], correct:1,
     evidence:"Because trust takes time",
     why:"Komunita byla ostražitá; musela si získat důvěru.",
     trap:"Bouřky fotili novináři před ní – ne důvod, proč nefotila ona.", tt:"distractor"},
    {q:"What does Kate say about dramatic images of fishing?", opts:["They are difficult to capture.","They give a false impression.","They appeal more to galleries than magazines.","She included them only reluctantly."], correct:1,
     evidence:"it's also a kind of distortion",
     why:"„Distortion“ = zkreslení → falešný dojem.",
     trap:"Opak: dramatické fotky jsou „the easy one“ a magazíny je chtějí.", tt:"paraphrase"},
    {q:"Why does Kate prefer to work with film?", opts:["It produces better-quality pictures.","It reminds her of how she started out.","It helps her stay focused on the people she photographs.","It works out cheaper in the long term."], correct:2,
     evidence:"Film keeps me present",
     why:"Méně snímků → víc přemýšlí a dívá se na člověka, ne na displej.",
     trap:"Nostalgie: „People assume…“ – skutečný důvod je praktický.", tt:"distractor"},
    {q:"How did Kate feel when one of her photographs was withdrawn?", opts:["She accepted the decision although she was sorry.","She felt the daughter was being unreasonable.","She tried to change the family's mind.","She regretted showing them the picture."], correct:0,
     evidence:"I was disappointed, of course, but I respected it",
     why:"Zklamaná, ale rozhodnutí respektovala.",
     trap:"Tón je smířlivý: „It's their life, not mine.“", tt:"attitude"},
    {q:"What does Kate want visitors to feel about the fishing communities?", opts:["sadness at their decline","concern about their future","curiosity about their history","admiration for how they are adapting"], correct:3,
     evidence:"come away with respect rather than sympathy",
     why:"Respekt k lidem, kteří se přizpůsobují (mladí, družstva).",
     trap:"„Not pity“ – soucit výslovně odmítá.", tt:"distractor"},
    {q:"Why does Kate want her next project to be very different?", opts:["She has lost interest in the sea.","She wants to avoid becoming too used to what she sees.","She has been offered work in a city.","She feels her style has become old-fashioned."], correct:1,
     evidence:"The danger with a long project is that you stop noticing",
     why:"Potřebuje „fresh eyes“ – nebezpečí je přestat si všímat.",
     trap:"„Urban, maybe“ – žádná nabídka práce nezazní.", tt:"inference"}
  ]},

{ id:"p3-08", title:"A history podcast", context:"You will hear an interview with Tom and Asha Bell, a married couple who present a podcast about forgotten figures from history.",
  speakers:{"Presenter":"F3","Asha":"F2","Tom":"M2"},
  lines:[
    {sp:"Presenter", t:"With me are Tom and Asha Bell, whose podcast about overlooked figures from history now has over a million monthly listeners. Asha, how did it begin?"},
    {sp:"Asha", t:"Over dinner, really. Tom's a history teacher, and he'd tell me these extraordinary stories about people I'd never heard of – a Victorian woman who climbed the Matterhorn in a skirt, a Black trumpeter at the court of Henry the Eighth. And I kept saying, 'Why doesn't anybody know about this?' I'm a sound engineer, so recording it seemed the obvious thing."},
    {sp:"Presenter", t:"Tom, how do you choose your subjects?"},
    {sp:"Tom", t:"There's a rule we have, which is that the person has to have been genuinely significant in their own time, not just interesting to us now. It's very tempting to take someone obscure and inflate their importance to make a better story. We try hard not to do that. If the evidence is thin, we say so."},
    {sp:"Presenter", t:"Do you ever disagree?"},
    {sp:"Asha", t:"Constantly! Tom would happily spend forty minutes on the background – the economics, the politics. I'm always the one saying, 'Get to the person!' Listeners want a human being they can care about."},
    {sp:"Tom", t:"Though I'd say the context is what makes them make sense. Without it, they're just anecdotes."},
    {sp:"Asha", t:"Which is why it works, I think. We pull each other in opposite directions and end up somewhere in the middle."},
    {sp:"Presenter", t:"You've had some criticism from academic historians."},
    {sp:"Tom", t:"A little. One or two felt we'd simplified things. And they had a point in one episode – we'd repeated a story about a medieval queen that turned out to be a later invention. We did a follow-up episode correcting it, which, funnily enough, became one of our most popular. People seem to enjoy seeing how history actually gets made – the detective work."},
    {sp:"Presenter", t:"And what's next?"},
    {sp:"Asha", t:"A book, which is terrifying. Writing's completely different – you can't rely on tone of voice, on pauses, on all the things we do in the studio. Tom's very relaxed about it."},
    {sp:"Tom", t:"I'm not relaxed, I'm in denial."}
  ],
  qs:[
    {q:"What led to the podcast being created?", opts:["Tom's students wanted more engaging material.","They both wanted to learn about sound recording.","Asha was struck by how unknown certain stories were.","A radio producer suggested the idea to them."], correct:2,
     evidence:"Why doesn't anybody know about this?",
     why:"Asha žasla, že o těch lidech nikdo neví – a jako zvukařka to začala nahrávat.",
     trap:"Tom je učitel, ale studenti nic nežádali.", tt:"distractor"},
    {q:"What principle guides Tom's choice of subjects?", opts:["They must appeal to a modern audience.","They must have mattered in their own lifetime.","They must be well documented.","They must come from a variety of backgrounds."], correct:1,
     evidence:"genuinely significant in their own time",
     why:"Musí být významní ve své době, ne jen zajímaví dnes.",
     trap:"„If the evidence is thin, we say so“ – slabé prameny je nevylučují.", tt:"distractor"},
    {q:"What do Tom and Asha usually disagree about?", opts:["how much historical background to include","which historical periods to cover","how long the episodes should be","whether to invite expert guests"], correct:0,
     evidence:"Tom would happily spend forty minutes on the background",
     why:"Tom chce kontext, Asha chce rychle k člověku.",
     trap:"„Forty minutes“ evokuje délku epizody, ale spor je o pozadí.", tt:"paraphrase"},
    {q:"How does Asha feel about their disagreements?", opts:["She finds them exhausting.","She thinks Tom usually gets his way.","She tries to hide them from listeners.","She believes they benefit the podcast."], correct:3,
     evidence:"Which is why it works, I think",
     why:"Táhnou se opačným směrem a skončí uprostřed – proto to funguje.",
     trap:"„Constantly!“ zní jako stížnost, ale závěr je pozitivní.", tt:"attitude"},
    {q:"What happened after they made a mistake in one episode?", opts:["Their audience fell for a while.","The episode correcting it proved very popular.","They began consulting academics regularly.","They removed the original episode."], correct:1,
     evidence:"which, funnily enough, became one of our most popular",
     why:"Opravná epizoda patřila k nejpopulárnějším.",
     trap:"Akademiky nezačali konzultovat – to nezazní.", tt:"distractor"},
    {q:"How does Asha feel about writing a book?", opts:["nervous because it demands different skills","confident because of the podcast's success","worried that Tom is not taking it seriously","excited about reaching new readers"], correct:0,
     evidence:"you can't rely on tone of voice",
     why:"„Terrifying“ – psaní vyžaduje jiné dovednosti než mluvení.",
     trap:"Tom vtipkuje, že je „in denial“ – Asha si nestěžuje, že to nebere vážně.", tt:"inference"}
  ]}
];

/* ===================================================================================== PART 4 */
var SP5 = {"Speaker 1":"F1","Speaker 2":"M1","Speaker 3":"F2","Speaker 4":"M2","Speaker 5":"F3"};
L.p4 = [
{ id:"p4-01", title:"Taking up a sport as an adult", context:"You will hear five short extracts in which people talk about taking up a sport as adults.",
  speakers:SP5,
  task1:{q:"For questions 21–25, choose from the list (A–H) what prompted each speaker to take up the sport.", opts:["advice from a doctor","a wish to meet new people","a challenge from a friend","a childhood ambition","a need to escape work pressure","a desire to keep up with their children","watching a competition on television","a free trial session"]},
  task2:{q:"For questions 26–30, choose from the list (A–H) what each speaker has found most challenging.", opts:["the cost of equipment","fitting training into their schedule","overcoming fear","understanding technical terms","being older than other participants","recovering from injuries","the competitive atmosphere","coping with the weather"]},
  lines:[
    {sp:"Speaker 1", t:"I'd never have dreamed of climbing if it hadn't been for my flatmate, Jo. She'd been going for years, and one evening she basically dared me – said I'd last ten minutes on the wall before I gave up. Well, I wasn't having that. People assume the hard part is strength, but actually your legs do most of the work. For me it's always been the height. Even now, three years in, there's a moment near the top where my mind just screams at me to let go."},
    {sp:"Speaker 2", t:"I was flicking through channels during the Olympics and I came across the rowing final. I'm not a sporty person at all, but there was something about the rhythm of it, eight people moving as one, that I found mesmerising. Everyone warned me about the cold, early mornings on the river, but honestly, I quite like that. What's really tested me is juggling it all – the crew trains at six, three mornings a week, and with two jobs, something's always got to give."},
    {sp:"Speaker 3", t:"My two boys both play tennis, and I was always the one at the side of the court holding the water bottles. Then one day my youngest asked me to hit a few balls with him, and I could barely return a single shot. I didn't want to be the parent who couldn't join in. So I signed up for adult lessons. The coaching's great. The only thing is, I'm about twenty years older than everyone else in the group, and sometimes I feel like everyone's mum."},
    {sp:"Speaker 4", t:"I work in finance and the hours are brutal. By last spring I was barely sleeping, and I knew I needed something that would completely take my mind off the office. Fencing's perfect for that – if your concentration slips for a second, you get hit. The footwork took a while, but what I really struggled with was the terminology. It's all French, and the coach would shout instructions I simply didn't understand."},
    {sp:"Speaker 5", t:"After a check-up last year my GP told me, quite bluntly, that my blood pressure was too high. I'd always fancied doing a triathlon, ever since I was a kid, but it was her warning that actually got me moving. Training's fine – I like having a plan. But nobody tells you what it all costs. The bike alone was more than my first car, and then there's the wetsuit, the shoes, the watch."}
  ],
  qs:[
    {task:1, n:1, correct:2, evidence:"one evening she basically dared me", why:"Spolubydlící ji „vyzvala“ (dared) – výzva od kamarádky.", trap:"Síla (strength) nepatří mezi možnosti, je to jen vata.", tt:"paraphrase"},
    {task:1, n:2, correct:6, evidence:"I came across the rowing final", why:"Viděla finále v televizi během olympiády.", trap:"„Not a sporty person“ – žádná dětská ambice.", tt:"paraphrase"},
    {task:1, n:3, correct:5, evidence:"I didn't want to be the parent who couldn't join in", why:"Chtěla stačit svým synům.", trap:"Lekce pro dospělé ≠ setkávání s novými lidmi.", tt:"inference"},
    {task:1, n:4, correct:4, evidence:"I knew I needed something that would completely take my mind off the office", why:"Potřeboval vypnout od práce.", trap:"Nespavost by mohla svádět k „doctor's advice“, ale lékař nezazní.", tt:"distractor"},
    {task:1, n:5, correct:0, evidence:"it was her warning that actually got me moving", why:"Varování praktické lékařky ho opravdu rozhýbalo.", trap:"Dětský sen (since I was a kid) zazní, ale „it was her warning that actually…“.", tt:"distractor"},
    {task:2, n:1, correct:2, evidence:"For me it's always been the height", why:"Výška a strach, kdy jí mysl křičí, ať se pustí.", trap:"Síla je to, co si myslí „people“.", tt:"distractor"},
    {task:2, n:2, correct:1, evidence:"What's really tested me is juggling it all", why:"Skloubit trénink v 6 ráno a dvě práce.", trap:"Zima na řece: „I quite like that“ – počasí odmítá.", tt:"distractor"},
    {task:2, n:3, correct:4, evidence:"I'm about twenty years older than everyone else in the group", why:"Je o 20 let starší než ostatní.", trap:"„The coaching's great“ – trenéři problém nejsou.", tt:"paraphrase"},
    {task:2, n:4, correct:3, evidence:"what I really struggled with was the terminology", why:"Francouzská terminologie = odborné výrazy.", trap:"Práce nohou trvala, ale „what I really struggled with“ je jinde.", tt:"distractor"},
    {task:2, n:5, correct:0, evidence:"nobody tells you what it all costs", why:"Kolo, neopren, boty, hodinky – drahé vybavení.", trap:"„Training's fine“ – rozvrh problém není.", tt:"paraphrase"}
  ]},

{ id:"p4-02", title:"Changing career", context:"You will hear five short extracts in which people talk about changing their career.",
  speakers:SP5,
  task1:{q:"For questions 21–25, choose from the list (A–H) what prompted each speaker to change career.", opts:["losing their job","a health problem","a conversation with a stranger","becoming a parent","feeling undervalued by an employer","a long period of travel","disliking their colleagues","receiving an inheritance"]},
  task2:{q:"For questions 26–30, choose from the list (A–H) what each speaker enjoys most about their new work.", opts:["being able to organise their own time","working outdoors","seeing the results of their work","the variety of tasks","working with young people","the chance to be creative","earning more than before","being part of a community"]},
  lines:[
    {sp:"Speaker 1", t:"When the bank closed our department, I'll admit I was in shock for a while. Fifteen years, and then a cardboard box and a security guard. But it forced me to think about what I'd actually enjoyed, and the answer was always making things with my hands. So I retrained as a carpenter. The money's nowhere near what it was. But at the end of every day I can look at a staircase or a set of shelves and say, 'I made that'."},
    {sp:"Speaker 2", t:"I was on a train, coming back from yet another pointless meeting, and I got talking to the woman opposite, who turned out to be a landscape gardener. She was so passionate about her work. That conversation stayed with me for weeks. Now I've got my own small gardening business. Everyone assumes the best bit must be being outdoors – in January, in the rain, it's not that romantic. What I love is that I decide when I work. If I want Wednesday afternoon off, I can take it."},
    {sp:"Speaker 3", t:"It was having my daughter that changed everything. Suddenly working until nine every night just didn't make sense any more – I wanted to see her grow up. So I retrained as a primary teacher. People think the joy must be the children, and of course they're lovely. But for me it's that no two days are ever the same. One minute I'm teaching fractions, the next I'm dealing with a lost shoe, then I'm painting scenery for the school play."},
    {sp:"Speaker 4", t:"I'd worked at that software company for eight years and put my heart into it. Then they promoted someone who'd been there eighteen months over me, and nobody even bothered to explain why. That was it, really. I'd always baked as a hobby, so I opened a small bakery. The hours are terrible – I'm up at four. But I know all my regulars by name, whose kid has exams, whose mum's in hospital. It's become a sort of meeting point for the whole street."},
    {sp:"Speaker 5", t:"I took a career break – six months backpacking around South America – and when I came back, I just couldn't face accountancy again. So I became a tour guide here in Edinburgh. I'd assumed I'd miss the security, and occasionally I do. But I didn't expect how much I'd love designing my own tours – choosing the stories, working out how to tell them, adding little bits of theatre."}
  ],
  qs:[
    {task:1, n:1, correct:0, evidence:"When the bank closed our department", why:"Banka zrušila oddělení = přišel o práci.", trap:"Krabice a ochranka jsou jen obraz propuštění.", tt:"paraphrase"},
    {task:1, n:2, correct:2, evidence:"That conversation stayed with me for weeks", why:"Rozhovor s neznámou ženou ve vlaku.", trap:"Zbytečná porada nebyla spouštěč – jen kontext.", tt:"distractor"},
    {task:1, n:3, correct:3, evidence:"It was having my daughter that changed everything", why:"Narození dcery.", trap:"Práce do devíti večer – ale spouštěčem bylo rodičovství.", tt:"paraphrase"},
    {task:1, n:4, correct:4, evidence:"nobody even bothered to explain why", why:"Povýšili jiného – cítil se nedoceněný.", trap:"Kolegy nekritizuje, vadí mu přístup firmy.", tt:"inference"},
    {task:1, n:5, correct:5, evidence:"six months backpacking around South America", why:"Půlroční cestování.", trap:"„Security“ by mohlo svádět, ale je to až důsledek.", tt:"paraphrase"},
    {task:2, n:1, correct:2, evidence:"at the end of every day I can look at a staircase or a set of shelves", why:"Vidí hotové schody, police – výsledek své práce.", trap:"Peníze: „nowhere near what it was“ – vydělává méně.", tt:"distractor"},
    {task:2, n:2, correct:0, evidence:"What I love is that I decide when I work", why:"Sama si určuje pracovní dobu.", trap:"Práce venku: „Everyone assumes…“ – ale v lednu to romantické není.", tt:"distractor"},
    {task:2, n:3, correct:3, evidence:"no two days are ever the same", why:"Každý den jiný = rozmanitost.", trap:"Děti: „People think the joy must be the children“.", tt:"distractor"},
    {task:2, n:4, correct:7, evidence:"It's become a sort of meeting point for the whole street", why:"Zná štamgasty – je součástí komunity.", trap:"Pečení je koníček, tvořivost nezmiňuje.", tt:"paraphrase"},
    {task:2, n:5, correct:5, evidence:"how much I'd love designing my own tours", why:"Tvoří vlastní prohlídky – vybírá příběhy, přidává divadlo.", trap:"Jistota (security) – to jí občas chybí.", tt:"distractor"}
  ]},

{ id:"p4-03", title:"Travel mishaps", context:"You will hear five short extracts in which people talk about something that went wrong on a trip.",
  speakers:SP5,
  task1:{q:"For questions 21–25, choose from the list (A–H) what caused each speaker's problem.", opts:["a missed connection","a language misunderstanding","a stolen bag","a booking error","bad weather","relying on technology","an injury","a transport strike"]},
  task2:{q:"For questions 26–30, choose from the list (A–H) how each speaker feels about the experience now.", opts:["amused by their own naivety","grateful for help from strangers","still angry with a company","proud of how they coped","it has changed how they travel","it led to a lasting friendship","they wish they had complained","it put them off travelling alone"]},
  lines:[
    {sp:"Speaker 1", t:"We were driving in the mountains in Corsica and I'd put all my faith in the satnav on my phone. It confidently directed us up what turned out to be a goat track – no exaggeration, there was an actual goat. We had to reverse about a kilometre down a slope in the dark. These days, I always take a proper paper map when I go anywhere remote, and I actually look at it before setting off."},
    {sp:"Speaker 2", t:"I'd arrived in Lisbon for a long weekend, and the very next morning the whole metro system shut down – a strike nobody had warned us about. I was standing at the station looking lost when an older man, Rui, asked if I needed help. He ended up driving me around half the city in his ancient car. We've stayed in touch ever since – I've been back to visit him and his wife three times, and they came to my wedding."},
    {sp:"Speaker 3", t:"The hotel in Rome looked fabulous online, and I'd booked it months in advance. But when we turned up, they'd never heard of us. The booking website had put us down for the following month. I've written to the website four times now and all I've had is an automated apology and a voucher for ten euros. Honestly, it still makes my blood boil."},
    {sp:"Speaker 4", t:"I'd done a few weeks of Japanese on an app before going to Tokyo, and I was very pleased with myself. So when the taxi driver asked me something, I just said 'yes' confidently. It turned out he'd asked if I wanted to go to the airport – which I didn't, I'd just arrived from there. I cringe now, but I also laugh – I really thought a few weeks on an app made me fluent."},
    {sp:"Speaker 5", t:"We were walking a coastal path in Wales when a storm came in much faster than forecast. Within half an hour we were soaked through and visibility was down to a few metres. My son was only ten and I could see he was frightened, so I kept up a cheerful commentary while working out how to get us down safely. Looking back, I think I handled it rather well, actually. I didn't panic, and he still talks about it as an adventure."}
  ],
  qs:[
    {task:1, n:1, correct:5, evidence:"I'd put all my faith in the satnav on my phone", why:"Slepě věřil navigaci v telefonu.", trap:"Tma a svah jsou následky, ne příčina.", tt:"paraphrase"},
    {task:1, n:2, correct:7, evidence:"a strike nobody had warned us about", why:"Stávka metra.", trap:"Pomoc cizince se týká úkolu 2, ne příčiny.", tt:"paraphrase"},
    {task:1, n:3, correct:3, evidence:"The booking website had put us down for the following month", why:"Chyba v rezervaci.", trap:"Hotel je nevinný – chybu udělal web.", tt:"inference"},
    {task:1, n:4, correct:1, evidence:"he'd asked if I wanted to go to the airport", why:"Nepochopila otázku řidiče = jazykové nedorozumění.", trap:"Aplikace (technology) zazní, ale problém způsobilo nedorozumění.", tt:"distractor"},
    {task:1, n:5, correct:4, evidence:"a storm came in much faster than forecast", why:"Bouřka = špatné počasí.", trap:"Úraz se nestal.", tt:"paraphrase"},
    {task:2, n:1, correct:4, evidence:"These days, I always take a proper paper map", why:"Změnil způsob cestování – papírová mapa.", trap:"Nezní pobaveně ani opatrněji obecně – konkrétní změna návyku.", tt:"paraphrase"},
    {task:2, n:2, correct:5, evidence:"We've stayed in touch ever since", why:"Z Ruiho je dlouholetý přítel.", trap:"Vděčnost cizinci (B) svádí, ale klíčem je trvalé přátelství.", tt:"distractor"},
    {task:2, n:3, correct:2, evidence:"it still makes my blood boil", why:"Pořád zuří na rezervační web.", trap:"„Wish they had complained“ – stěžovala si čtyřikrát.", tt:"distractor"},
    {task:2, n:4, correct:0, evidence:"I cringe now, but I also laugh", why:"Směje se vlastní naivitě („thought… made me fluent“).", trap:"Opatrnost nezazní.", tt:"attitude"},
    {task:2, n:5, correct:3, evidence:"I think I handled it rather well", why:"Je hrdá, jak situaci zvládla.", trap:"Strach syna zmíní, ale hlavní je pocit, že to zvládla: „I didn't panic“.", tt:"attitude"}
  ]},

{ id:"p4-04", title:"Moving to a new city", context:"You will hear five short extracts in which people talk about moving to a new city.",
  speakers:SP5,
  task1:{q:"For questions 21–25, choose from the list (A–H) what made each speaker decide to move.", opts:["a job offer","the cost of housing","wanting to be near family","the end of a relationship","a partner's career","wanting a quieter life","a place at university","a sense of adventure"]},
  task2:{q:"For questions 26–30, choose from the list (A–H) what each speaker has found most difficult about their new home.", opts:["making friends","the local accent","the pace of life","getting around","the climate","finding somewhere to live","dealing with bureaucracy","feeling homesick"]},
  lines:[
    {sp:"Speaker 1", t:"Everyone imagines I moved to Glasgow for the job, because I happened to start at the hospital a fortnight after I arrived. But honestly, I'd have come anyway. My sister had just had twins and I wanted to be round the corner, not four hundred miles away. The weather's been no hardship – I'm from Manchester, I'm used to rain. What's caught me out is the way people speak. I've lived here two years and I still have to ask the man in the corner shop to repeat himself, which is mortifying for both of us."},
    {sp:"Speaker 2", t:"My partner was offered a research post in Bristol, and it was far too good for her to turn down, so I packed up my freelance work and came along. I can do that from anywhere, in theory. Finding a flat was surprisingly painless – we got lucky there. The thing I hadn't bargained for is how lonely it can get. Everyone here seems to have their circle already – school friends, university friends – and at forty, nobody's exactly looking for new ones."},
    {sp:"Speaker 3", t:"I'd been renting in London for nine years and I was handing over more than half my salary for a flat where the bedroom window looked straight onto a brick wall. When I worked out what I could buy for the same money in Leeds, the decision more or less made itself. I'd worried I'd pine for London, but I genuinely don't. What's driven me up the wall is the council – I've been trying to get a parking permit since March, and every form seems to require another form."},
    {sp:"Speaker 4", t:"I'd split up with someone I'd been with for six years, and every street in our town had some memory attached to it. I needed a clean slate, so I moved to a little fishing village in Cornwall. People said I was running away, and maybe I was. Making friends was easy, actually – the pub sees to that. But I hadn't realised everything would move quite so slowly. If you want a plumber, it's 'sometime next week, probably'. I'm still not used to it."},
    {sp:"Speaker 5", t:"I'd never lived anywhere but the town I grew up in, and at twenty-eight I suddenly thought, if I don't do something now, I never will. So I stuck a pin in a map, more or less, and ended up in Belfast. No job lined up, nothing. I found work within a month, luckily. The hardest part, believe it or not, is transport. There's no underground, the buses stop early, and I can't drive, so getting anywhere after ten at night is a real operation."}
  ],
  qs:[
    {task:1, n:1, correct:2, evidence:"I wanted to be round the corner, not four hundred miles away", why:"Chtěla bydlet blízko sestry s dvojčaty = blízko rodiny.", trap:"Práce v nemocnici zazní, ale „I'd have come anyway“ – nebyla důvodem.", tt:"distractor"},
    {task:1, n:2, correct:4, evidence:"My partner was offered a research post in Bristol", why:"Přestěhoval se kvůli partnerčině nabídce práce – její kariéra.", trap:"„A job offer“ (A) svádí, ale nabídku dostala partnerka, ne on.", tt:"inference"},
    {task:1, n:3, correct:1, evidence:"I was handing over more than half my salary", why:"Nájem v Londýně spolykal přes polovinu platu – cena bydlení.", trap:"Leeds není vybrané kvůli klidu – rozhodly peníze.", tt:"paraphrase"},
    {task:1, n:4, correct:3, evidence:"I'd split up with someone I'd been with for six years", why:"Rozchod po šesti letech – potřeboval začít znovu.", trap:"Rybářská vesnice svádí k „quieter life“, ale důvodem byl konec vztahu.", tt:"distractor"},
    {task:1, n:5, correct:7, evidence:"if I don't do something now, I never will", why:"Špendlík do mapy, bez práce – touha po dobrodružství.", trap:"„No job lined up“ – pracovní nabídka to rozhodně nebyla.", tt:"paraphrase"},
    {task:2, n:1, correct:1, evidence:"I still have to ask the man in the corner shop to repeat himself", why:"Pořád nerozumí místnímu přízvuku („the way people speak“).", trap:"Počasí: „no hardship“ – je zvyklá na déšť.", tt:"distractor"},
    {task:2, n:2, correct:0, evidence:"Everyone here seems to have their circle already", why:"Osamělost – všichni už mají své přátele, těžko se hledají noví.", trap:"Bydlení: „surprisingly painless“ – s bytem problém nebyl.", tt:"distractor"},
    {task:2, n:3, correct:6, evidence:"every form seems to require another form", why:"Úřad a formuláře kvůli parkovací kartě = byrokracie.", trap:"Stesk po Londýně: „I genuinely don't“ – odmítá ho.", tt:"distractor"},
    {task:2, n:4, correct:2, evidence:"I hadn't realised everything would move quite so slowly", why:"Všechno jde pomalu (instalatér „příští týden, asi“) = tempo života.", trap:"Přátelé: „Making friends was easy“ – to problém není.", tt:"distractor"},
    {task:2, n:5, correct:3, evidence:"The hardest part, believe it or not, is transport", why:"Žádné metro, autobusy končí brzy, neřídí – přeprava po městě.", trap:"Práce se našla do měsíce – to obtížné nebylo.", tt:"paraphrase"}
  ]},

{ id:"p4-05", title:"Volunteering", context:"You will hear five short extracts in which people talk about doing voluntary work.",
  speakers:SP5,
  task1:{q:"For questions 21–25, choose from the list (A–H) why each speaker started volunteering.", opts:["to gain work experience","to repay help they had once received","to fill time after retiring","because an employer encouraged it","to improve their mental health","because a friend needed support","to make use of a professional skill","in response to something they read"]},
  task2:{q:"For questions 26–30, choose from the list (A–H) what each speaker has learnt from volunteering.", opts:["to be more patient","how little people need to be happy","not to make assumptions about people","the value of listening","that they can manage a team","that they enjoy physical work","how to deal with conflict","confidence in speaking in public"]},
  lines:[
    {sp:"Speaker 1", t:"When my dad was ill, the hospice nurses were extraordinary – not just with him, with all of us. After he died, I kept thinking I owed them something I could never actually pay back. So now I do two evenings a week on their helpline. I'd imagined I'd be giving advice, but that's not really the job. Mostly people just want someone to hear them out, without interrupting or trying to fix things. It's made me a much better friend, I think."},
    {sp:"Speaker 2", t:"My company gives us three paid days a year for charity work, and for ages I just ignored it. Then my manager more or less told me it would look good at my appraisal, so I signed up at a food bank. I went in fairly cynical, if I'm honest. I suppose I'd expected the people coming in to be, I don't know, a certain type. They're not. Last week I served a nurse and a man in a suit who'd lost his business. I've stopped jumping to conclusions about anyone."},
    {sp:"Speaker 3", t:"I'd taken early retirement from teaching and I thought I'd relish the freedom. I didn't. By about February I was going slightly stir-crazy, rattling around the house with nothing to do. So I started helping at a community garden. For thirty years I'd been the one at the front of the classroom, talking. Here I'm digging, barrowing compost, building raised beds, and I come home aching and absolutely content. I'd never have guessed it."},
    {sp:"Speaker 4", t:"I'm a qualified electrician, and after the floods last winter I saw for myself how many families couldn't afford to get their wiring made safe. So I offered my services free at weekends through a local charity. The work itself is the same as my day job. What's been new for me is that I now coordinate six other tradespeople – who goes where, who needs what, keeping everyone happy. I'd never been in charge of anyone before, and it turns out I'm not bad at it."},
    {sp:"Speaker 5", t:"I came across an article about older people who go weeks without speaking to anyone, and it really got to me – I couldn't stop thinking about it. That same evening I signed up to a befriending scheme. People assume it must be good for my own wellbeing, and I suppose it is, but that wasn't why I did it. The woman I visit, Edna, is ninety-one and she tells the same stories over and over. At first I found that hard, I'll be honest. Now I just let her take her time, and I've become far less irritable in general – my kids have noticed."}
  ],
  qs:[
    {task:1, n:1, correct:1, evidence:"I kept thinking I owed them something I could never actually pay back", why:"Chce hospici splatit, co sestry udělaly pro jejího tátu i rodinu.", trap:"Smrt otce svádí k „mental health“, ale motivací je vděčnost.", tt:"paraphrase"},
    {task:1, n:2, correct:3, evidence:"my manager more or less told me it would look good at my appraisal", why:"Firma dává volné dny a manažer ho k tomu postrčil = zaměstnavatel.", trap:"Hodnocení (appraisal) neznamená, že sbírá pracovní zkušenosti.", tt:"paraphrase"},
    {task:1, n:3, correct:2, evidence:"rattling around the house with nothing to do", why:"Po předčasném důchodu se doma nudila – potřebovala vyplnit čas.", trap:"„Stir-crazy“ je hovorově „ponorková nemoc“, ne péče o duševní zdraví jako cíl.", tt:"inference"},
    {task:1, n:4, correct:6, evidence:"So I offered my services free at weekends", why:"Jako elektrikář nabízí svou odbornost zdarma.", trap:"Povodně viděl „for myself“ – nečetl o nich.", tt:"inference"},
    {task:1, n:5, correct:7, evidence:"I came across an article about older people", why:"Článek o osamělých seniorech ji nenechal spát.", trap:"Vlastní pohoda: „that wasn't why I did it“.", tt:"distractor"},
    {task:2, n:1, correct:3, evidence:"Mostly people just want someone to hear them out", why:"Naučila se, že nejdůležitější je naslouchat, ne radit.", trap:"Rady (advice) – to si původně myslela, že bude dělat.", tt:"change"},
    {task:2, n:2, correct:2, evidence:"I've stopped jumping to conclusions about anyone", why:"Přestal mít předsudky o tom, kdo chodí do potravinové banky.", trap:"„How little people need“ zde nezazní – jde o jeho předpoklady.", tt:"paraphrase"},
    {task:2, n:3, correct:5, evidence:"I come home aching and absolutely content", why:"Zjistila, že ji fyzická práce na zahradě naplňuje.", trap:"Mluvení před třídou je její minulost, ne nová dovednost.", tt:"distractor"},
    {task:2, n:4, correct:4, evidence:"I now coordinate six other tradespeople", why:"Poprvé vede tým šesti řemeslníků a jde mu to.", trap:"Samotná práce je „the same as my day job“ – nic nového.", tt:"paraphrase"},
    {task:2, n:5, correct:0, evidence:"I've become far less irritable in general", why:"Nechá Ednu mluvit vlastním tempem – je trpělivější.", trap:"Naslouchání (D) svádí, ale klíčová změna je menší podrážděnost = trpělivost.", tt:"inference"}
  ]},

{ id:"p4-06", title:"Giving up social media", context:"You will hear five short extracts in which people talk about giving up social media.",
  speakers:SP5,
  task1:{q:"For questions 21–25, choose from the list (A–H) why each speaker decided to give up social media.", opts:["it was affecting their sleep","concern about their privacy","a remark from a family member","it made them compare themselves to others","it was taking time away from a hobby","an argument online","a rule at their workplace","seeing figures for their own usage"]},
  task2:{q:"For questions 26–30, choose from the list (A–H) what each speaker says has changed since.", opts:["they read more","they feel less anxious","they have lost touch with some people","they get more done at work","they notice their surroundings more","their family relationships have improved","they sleep better","they feel less well informed"]},
  lines:[
    {sp:"Speaker 1", t:"My phone sends you a weekly report of your screen time, and I'd always swiped it away. One Sunday I actually read it: five hours a day, mostly scrolling. I was horrified. That's a part-time job. I deleted everything that night. People warned me I'd be out of the loop, and yes, I've missed a couple of birthday drinks. But the big thing is I've rediscovered books. I've got through eleven novels since January, which for me is unheard of."},
    {sp:"Speaker 2", t:"I'm a keen photographer, or I used to be. I realised I was spending more time posting old pictures and checking the likes than actually going out with my camera. That was the wake-up call. Funnily enough, the main difference since has nothing to do with photography. I walk to work the same way I always have, but I'm looking up now, not down. I spotted a kestrel nesting on the church tower last month. It had probably been there for years."},
    {sp:"Speaker 3", t:"My teenage daughter said something at dinner – that I was always telling her to put her phone away and then picking mine up the second she did. She wasn't being rude, she just said it, and it stung because it was true. So I came off everything. I thought I'd feel cut off from friends abroad, but we email properly now, long ones. Where I really notice it is at home. We actually talk at dinner, all of us, and she's started telling me things she never used to."},
    {sp:"Speaker 4", t:"I'd got into a ridiculous row with a stranger about a football referee, of all things, and found myself still typing replies at two in the morning, heart pounding. I thought: this is absurd. I'd been sleeping badly for months, and I'd assumed that would sort itself out once I stopped, but it hasn't really. What has changed is that general hum of worry I used to carry around. It's just gone. I hadn't realised how on edge I'd been."},
    {sp:"Speaker 5", t:"I work in IT security, so I knew more than most about where our data ends up. But it was reading the small print in one app's new terms that tipped me over – they could use your photos for pretty much anything. I left the next day. I'd assumed I'd lose touch with old colleagues, but they've been good about ringing. The surprise is work: without the constant pull of notifications, I get through in a morning what used to take me the whole day."}
  ],
  qs:[
    {task:1, n:1, correct:7, evidence:"five hours a day, mostly scrolling", why:"Týdenní přehled času u obrazovky ji vyděsil = čísla o vlastním používání.", trap:"„Out of the loop“ je až důsledek, ne důvod.", tt:"paraphrase"},
    {task:1, n:2, correct:4, evidence:"more time posting old pictures and checking the likes than actually going out with my camera", why:"Sítě mu braly čas na fotografování – jeho koníček.", trap:"Porovnávání s ostatními nezmiňuje – lajky jsou jen popis činnosti.", tt:"inference"},
    {task:1, n:3, correct:2, evidence:"My teenage daughter said something at dinner", why:"Poznámka dcery u večeře ji zasáhla.", trap:"Hádka (F) to nebyla: „She wasn't being rude“.", tt:"distractor"},
    {task:1, n:4, correct:5, evidence:"I'd got into a ridiculous row with a stranger", why:"Hádka s cizím člověkem o rozhodčím.", trap:"Špatný spánek zazní, ale důvodem odchodu byla hádka.", tt:"distractor"},
    {task:1, n:5, correct:1, evidence:"they could use your photos for pretty much anything", why:"Nové podmínky aplikace – obava o soukromí a data.", trap:"Pracuje v IT bezpečnosti, ale žádné firemní pravidlo nezazní.", tt:"distractor"},
    {task:2, n:1, correct:0, evidence:"I've rediscovered books", why:"Od ledna přečetla jedenáct románů.", trap:"Zmeškané oslavy (C) přizná, ale „the big thing“ jsou knihy.", tt:"distractor"},
    {task:2, n:2, correct:4, evidence:"I'm looking up now, not down", why:"Cestou do práce vnímá okolí – všiml si poštolky.", trap:"Fotografování: „nothing to do with photography“.", tt:"distractor"},
    {task:2, n:3, correct:5, evidence:"she's started telling me things she never used to", why:"Doma si povídají, dcera se jí svěřuje = lepší rodinné vztahy.", trap:"Přátelé v zahraničí: místo odcizení si teď píšou dlouhé e-maily.", tt:"distractor"},
    {task:2, n:4, correct:1, evidence:"that general hum of worry I used to carry around", why:"Zmizel neustálý pocit úzkosti („on edge“).", trap:"Spánek: „it hasn't really“ – nezlepšil se.", tt:"distractor"},
    {task:2, n:5, correct:3, evidence:"I get through in a morning what used to take me the whole day", why:"Bez notifikací stihne v práci mnohem víc.", trap:"Ztráta kontaktu s kolegy: „they've been good about ringing“.", tt:"distractor"}
  ]},

{ id:"p4-07", title:"Learning a language as an adult", context:"You will hear five short extracts in which people talk about learning a foreign language as adults.",
  speakers:SP5,
  task1:{q:"For questions 21–25, choose from the list (A–H) why each speaker decided to learn the language.", opts:["to communicate with a partner's family","to read literature in the original","to improve their career prospects","to prepare for a move abroad","to keep their mind active","to reconnect with their roots","after enjoying a holiday","to help their children with schoolwork"]},
  task2:{q:"For questions 26–30, choose from the list (A–H) what each speaker has found the most effective way of learning.", opts:["watching television drama","practising with a conversation partner","using a mobile app","learning the words of songs","keeping a diary","attending formal classes","labelling objects at home","reading children's books"]},
  lines:[
    {sp:"Speaker 1", t:"My husband's Italian, and for the first few years I'd sit at his parents' table smiling and nodding while everyone talked over me. His mother's English is about as good as my Italian was, so we used to pass the bread back and forth in silence. I tried an app, which was fine for vocabulary. What actually made the difference was children's picture books – my niece's, as it happens. Short sentences, lots of repetition, and pictures for when you're stuck."},
    {sp:"Speaker 2", t:"My grandparents came over from Poland after the war, but my dad never spoke Polish at home – he wanted us to fit in. When Grandma died, I found a box of her letters I couldn't read a word of, and it felt like a door had been shut on half of who I am. I did a term of evening classes, which gave me the grammar, but honestly, the breakthrough came from a Polish cook at work. We swap: I help with his English, he corrects my Polish over lunch."},
    {sp:"Speaker 3", t:"I'm seventy-three, and when a friend of mine was diagnosed with dementia, I read everything I could about it. Learning a language kept coming up as one of the best ways to keep your brain sharp, so I picked Spanish more or less at random. We'd been to Mallorca a few times, but that wasn't really the point. What works for me is writing. Every evening I put down a few lines about my day – dreadful Spanish, but nobody reads it except me."},
    {sp:"Speaker 4", t:"Our firm had just taken over a company in Lyon, and the job of managing it from London was mine if I could get my French up to a decent level within a year. No pressure, then. I did the lot – private tutor, apps, flashcards. The thing that really worked, though, was a crime drama I got hooked on. I'd watch each episode twice, once with French subtitles, once without, and I'd catch myself using whole phrases from it in meetings."},
    {sp:"Speaker 5", t:"We'd been planning to retire to Portugal for years, and once we'd actually bought the house, I realised I couldn't even ring a plumber. So I had about eighteen months to get myself going. I'd tried apps before and lost interest after a week. What finally stuck was music – fado especially. I'd print out the words, look up every line and sing along in the car. My pronunciation came on enormously, and I can still recite whole verses."}
  ],
  qs:[
    {task:1, n:1, correct:0, evidence:"I'd sit at his parents' table smiling and nodding while everyone talked over me", why:"Chtěla se domluvit s manželovou italskou rodinou.", trap:"Neteř a její knížky jsou metoda učení, ne důvod.", tt:"paraphrase"},
    {task:1, n:2, correct:5, evidence:"it felt like a door had been shut on half of who I am", why:"Chce znovu najít polovinu své identity – polské kořeny.", trap:"Babiččiny dopisy nejsou „literature in the original“.", tt:"inference"},
    {task:1, n:3, correct:4, evidence:"one of the best ways to keep your brain sharp", why:"Po diagnóze kamarádky chce udržet mozek v kondici.", trap:"Mallorca: „that wasn't really the point“ – dovolená důvodem není.", tt:"distractor"},
    {task:1, n:4, correct:2, evidence:"the job of managing it from London was mine", why:"Nové pracovní místo podmíněné francouzštinou = kariéra.", trap:"Firmu řídí „from London“ – nestěhuje se do zahraničí.", tt:"distractor"},
    {task:1, n:5, correct:3, evidence:"once we'd actually bought the house, I realised I couldn't even ring a plumber", why:"Koupili dům v Portugalsku a chystají se tam přestěhovat.", trap:"Důchod neznamená automaticky „keep their mind active“.", tt:"inference"},
    {task:2, n:1, correct:7, evidence:"What actually made the difference was children's picture books", why:"Dětské obrázkové knížky – krátké věty a opakování.", trap:"Aplikace byla jen „fine for vocabulary“.", tt:"distractor"},
    {task:2, n:2, correct:1, evidence:"he corrects my Polish over lunch", why:"Výměna s polským kuchařem = konverzační partner.", trap:"Večerní kurzy daly gramatiku, ale „the breakthrough came from…“.", tt:"distractor"},
    {task:2, n:3, correct:4, evidence:"Every evening I put down a few lines about my day", why:"Každý večer píše pár řádků o svém dni = deník.", trap:"Čtení o demenci souvisí s důvodem, ne s metodou.", tt:"paraphrase"},
    {task:2, n:4, correct:0, evidence:"was a crime drama I got hooked on", why:"Detektivní seriál sledoval dvakrát – s titulky i bez.", trap:"Lektor, aplikace i kartičky – „I did the lot“, ale fungoval seriál.", tt:"distractor"},
    {task:2, n:5, correct:3, evidence:"I'd print out the words, look up every line and sing along in the car", why:"Učí se texty písní fado a zpívá v autě.", trap:"Aplikace: „lost interest after a week“.", tt:"distractor"}
  ]},

{ id:"p4-08", title:"Starting a small business", context:"You will hear five short extracts in which people talk about starting their own small business.",
  speakers:SP5,
  task1:{q:"For questions 21–25, choose from the list (A–H) what gave each speaker the idea for their business.", opts:["market research they carried out","a problem in their own life","a comment from a customer at a previous job","a hobby that friends admired","something they saw abroad","a family tradition","a television programme","a course they attended"]},
  task2:{q:"For questions 26–30, choose from the list (A–H) what advice each speaker would give to someone starting a business.", opts:["get proper legal advice","don't try to do everything yourself","keep your existing job at first","take criticism seriously","don't underestimate the costs","build an online presence early","learn when to turn work down","test the idea on a small scale"]},
  lines:[
    {sp:"Speaker 1", t:"I've got coeliac disease, and finding decent gluten-free bread was a nightmare – it was either extortionate or tasted of cardboard. So I started experimenting in my own kitchen, and eventually I opened a bakery. If I'm honest, my biggest mistake was trying to be baker, accountant, cleaner and delivery driver all at once. I nearly burnt out in the first six months. Hire help sooner than you think you can afford it."},
    {sp:"Speaker 2", t:"I was in Copenhagen for a conference, and there were these little workshops everywhere where you could fix your own bike, with all the tools and someone on hand to show you how. I thought, why on earth don't we have that at home? Now I run one in Sheffield. My advice? Don't hand in your notice the day you have the idea. I kept working part-time in IT for the first two years, and that salary is the only reason we survived the first winter."},
    {sp:"Speaker 3", t:"Everyone always raved about the candles I made as presents – friends kept saying I should sell them. Eventually I gave in and took a stall at a Christmas market. I'd say to anyone, start like that. One stall, one weekend. I learnt more in those two days about what people would actually pay for than I could have from any business plan. And if it had flopped, I'd only have been out of pocket by a few hundred pounds."},
    {sp:"Speaker 4", t:"I used to be a sous-chef, and one of our regulars, an older chap, kept telling me there was nowhere in town you could buy proper fresh pasta. The third time he said it, I thought, he's got a point. So that's how the pasta shop started. What I'd tell people is: be prepared to say no. In the first year I took on every catering job, every wedding, every market, and the quality slipped. Now I'm much choosier."},
    {sp:"Speaker 5", t:"My family have kept bees for four generations – my great-grandfather started it – and I grew up helping with the hives. When I was made redundant from my marketing job, it seemed obvious to turn that into a proper business: honey, beeswax wraps, that sort of thing. I'd always say, get the paperwork right from the start. I signed a lease without having a solicitor look at it, and ended up paying for repairs that should never have been mine. An expensive lesson."}
  ],
  qs:[
    {task:1, n:1, correct:1, evidence:"finding decent gluten-free bread was a nightmare", why:"Celiakie a nedostatek dobrého bezlepkového chleba = problém v jejím životě.", trap:"Nedělala žádný průzkum trhu – experimentovala doma.", tt:"paraphrase"},
    {task:1, n:2, correct:4, evidence:"I was in Copenhagen for a conference", why:"Dílny na opravu kol viděl v Kodani – v zahraničí.", trap:"Práce v IT není zdroj nápadu, jen jistota příjmu.", tt:"paraphrase"},
    {task:1, n:3, correct:3, evidence:"friends kept saying I should sell them", why:"Svíčky jako koníček, který kamarádi obdivovali.", trap:"Stánek na trhu je test nápadu, ne „market research“.", tt:"distractor"},
    {task:1, n:4, correct:2, evidence:"one of our regulars, an older chap, kept telling me", why:"Stálý host v restauraci, kde pracoval, ho na mezeru upozornil.", trap:"„Market research“ (A) svádí, ale on sám nic nezkoumal – nápad mu dal zákazník.", tt:"inference"},
    {task:1, n:5, correct:5, evidence:"My family have kept bees for four generations", why:"Včelaření je rodinná tradice čtyř generací.", trap:"Propuštění (redundant) bylo spouštěčem, ale nápad pochází z rodiny.", tt:"distractor"},
    {task:2, n:1, correct:1, evidence:"Hire help sooner than you think you can afford it", why:"Dělala všechno sama a málem vyhořela – najmi pomoc.", trap:"„Afford“ svádí k E (náklady), ale rada je delegovat.", tt:"distractor"},
    {task:2, n:2, correct:2, evidence:"Don't hand in your notice the day you have the idea", why:"Nevypovídej hned práci – plat z IT je zachránil.", trap:"„Survived the first winter“ neznamená radu o nákladech.", tt:"paraphrase"},
    {task:2, n:3, correct:7, evidence:"One stall, one weekend", why:"Začni v malém – jeden stánek, jeden víkend, malé riziko.", trap:"Business plan zmiňuje jako horší alternativu.", tt:"paraphrase"},
    {task:2, n:4, correct:6, evidence:"be prepared to say no", why:"Bral všechno a kvalita šla dolů – nauč se odmítat.", trap:"Kritiku od zákazníků neřeší – stálý host dal nápad, ne kritiku.", tt:"paraphrase"},
    {task:2, n:5, correct:0, evidence:"I signed a lease without having a solicitor look at it", why:"Nájemní smlouvu podepsala bez právníka – rada: právní poradenství.", trap:"„An expensive lesson“ svádí k E, ale jde o chybějící právníka.", tt:"distractor"}
  ]}
];
})(window.DATA.listening);
