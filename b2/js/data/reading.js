/* B2 First – Reading and Use of English, Parts 5–7 (Reading). Pure data, ORIGINAL texts written for this portal at B2 level.
   p5: multiple choice   {id, title, topic, intro, text ("\n\n" = new paragraph), questions:[{q, opts:[4], correct:0-3, why (CZ), evidence (exact substring of text)}]}
       – 6 questions (31–36), text 550–650 words, questions follow the text order.
   p6: gapped text       {id, title, topic, intro, text (gaps [1]…[6] inside the paragraphs), sents:[{label:"A"…"G", text}], answers:{1:"C",…},
       why:{1:"CZ – clue before/after the gap"}, extraWhy:"CZ – why the extra sentence fits nowhere"} – six SENTENCES removed, one extra (37–42),
       full article 550–650 words.
   p7: multiple matching {id, title, topic, intro, pick:"people"|"sections", stem:"Which person", sections:[{label, title?, text}], questions:[{q, answer, why, evidence}]}
       – 10 statements (43–52), 4–5 sections, 600–700 words together; evidence is an exact substring of the answer section.
   Validate with: node scripts/check-b2-reading.js */
window.DATA = window.DATA || {};
window.DATA.reading = window.DATA.reading || {};

/* ============================================================ PART 5 – multiple choice ============================================================ */
window.DATA.reading.p5 = [
/* ------------------------------------------------------------------ */
{
id:"p5-summer-job", title:"Coffee, crosswords and early mornings", topic:"práce", intro:"You are going to read an article in which a teenager describes her first summer job.",
text:`When I told my parents that I had got a summer job at the Harbour Café, my dad laughed and said he would give me a week. I was sixteen, I had never worked anywhere except in my grandmother's garden, and I was famous in our family for being unable to get up before ten o'clock. The café opened at seven. I decided not to tell him how worried I was myself.

The first morning was every bit as bad as I had feared. Maria, the owner, showed me the coffee machine, the till and the dishwasher in about five minutes and then disappeared into the kitchen. By eight o'clock there was a queue of fishermen and dog walkers stretching out of the door, and I was getting almost every order wrong. One man asked for his tea without milk three times, and three times I handed him a cup with milk in it. To my surprise, he didn't get angry. He just smiled and said, 'Don't worry, love. Everyone's first day is a disaster. Mine certainly was.'

Over the next few weeks, things slowly improved. I learnt that the regular customers mostly wanted the same thing every day, and that they were delighted if I remembered it. Mr Evans, the man with the tea, turned out to be a retired headteacher who came in every morning to do the crossword. Sometimes, when the café was quiet, he asked me for help with a clue, although I suspected he already knew the answer and was just being kind. I started to look forward to seeing him.

What I found hardest was not the work itself but dealing with the occasional difficult customer. In July, a woman complained loudly that her sandwich was too small and demanded to see the manager. I could feel my face going red, and I was close to tears. Maria came out, listened politely, and gave the woman a free cake. Afterwards, I expected her to tell me off, but instead she explained that most people who complain are just having a bad day. 'It's not about you,' she said. 'Once you understand that, it gets much easier.' I have thought about that advice many times since, and not only at work.

By August I could make a perfect cappuccino, carry four plates at once and work the till faster than Maria's nephew, who had been there for two summers. I also had more money than I had ever had before. I had planned to spend it all on a new phone, but after counting it carefully I put most of it into a savings account instead. Knowing how many early mornings each pound represented made me much less keen to spend it.

On my last day, Mr Evans gave me a card with a crossword he had made himself. Every answer was connected to something that had happened in the café that summer, and the last clue was 'What this young lady will never again forget to leave out (4)'. The answer, of course, was 'milk'. I laughed so much that Maria came out of the kitchen to see what was going on.

My dad, by the way, has never mentioned his prediction again. I am going back to the café next summer, and this time I'm actually looking forward to the early starts. Well, almost.`,
questions:[
{q:"How did the writer feel before she started the job?",
 opts:["excited about earning her own money","annoyed that her father did not believe in her","more anxious than she let her parents see","confident because of her experience in the garden"],
 correct:2, why:"Táta jí dával týden a ona mu „neřekla, jak moc se sama bojí“ – byla nervóznější, než dala najevo. B: o naštvání na tátu text nemluví. D: práce na zahradě byla jediná zkušenost, sebevědomí jí nedodala.",
 evidence:"I decided not to tell him how worried I was myself."},
{q:"What happened on the writer's first morning?",
 opts:["Maria spent a long time explaining how everything worked.","A customer reacted to her mistakes in an understanding way.","She had to serve all the customers without any help.","Several customers left because the queue was too long."],
 correct:1, why:"Pán, kterému třikrát přinesla čaj s mlékem, se nezlobil, jen se usmál a uklidnil ji. A je opak – Maria jí vše ukázala „asi za pět minut“. C ani D text neříká (Maria byla v kuchyni, nikdo neodešel).",
 evidence:"To my surprise, he didn't get angry. He just smiled"},
{q:"What does the writer suggest about Mr Evans in the third paragraph?",
 opts:["He needed help because the crossword was too difficult for him.","He had been one of her teachers at school.","He came to the café mainly to talk to her.","He pretended to need help in order to be friendly."],
 correct:3, why:"Tušila, že odpověď zná a „je jen laskavý“ (just being kind). A je opak. B: byl to ředitel v důchodu, ne její učitel. C: chodil hlavně kvůli křížovce.",
 evidence:"although I suspected he already knew the answer and was just being kind"},
{q:"What was the most important thing the writer learnt from Maria?",
 opts:["Customers who complain should always get something for free.","She should call the manager whenever there is a problem.","Complaints are not usually a criticism of her personally.","It is better to hide your feelings from customers."],
 correct:2, why:"Maria jí vysvětlila, že stěžovatelé mají jen špatný den: „It's not about you“ – stížnost není osobní útok. A: dort zdarma byl jen to, co Maria udělala v jedné situaci, ne obecná rada.",
 evidence:"'It's not about you,' she said."},
{q:"Why did the writer decide not to spend her money on a new phone?",
 opts:["She realised how hard she had worked for it.","She discovered she had earned less than she expected.","Her parents advised her to save the money.","She wanted to save for the following summer."],
 correct:0, why:"Když věděla, kolik časných rán představuje každá libra, už se jí nechtělo utrácet – uvědomila si, jak tvrdě na peníze pracovala. B je opak (měla víc peněz než kdy dřív), C a D text nezmiňuje.",
 evidence:"Knowing how many early mornings each pound represented made me much less keen to spend it."},
{q:"Why did the writer laugh so much on her last day?",
 opts:["Mr Evans had made a mistake in his crossword.","The final clue reminded her of her first day.","Maria had come out of the kitchen unexpectedly.","She could not work out the answer to the last clue."],
 correct:1, why:"Odpověď na poslední otázku byla „milk“ – narážka na první den, kdy panu Evansovi třikrát dala čaj s mlékem. C: Maria přišla až KVŮLI jejímu smíchu, nebyla příčinou.",
 evidence:"The answer, of course, was 'milk'."}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-young-climber", title:"Fear at the bottom, focus at the top", topic:"sport", intro:"You are going to read an article about a young climber.",
text:`At first glance, Lena Novak looks like any other fifteen-year-old. She is quiet, rather shy, and spends a lot of time on her phone. But put her at the bottom of a climbing wall and she changes completely. Within seconds she is moving up the wall with a speed and confidence that make the adults watching her hold their breath. Last year she won the national youth championship, and her coach believes she could one day compete at the highest level.

What surprises most people is that Lena was once terrified of heights. As a small child, she refused to climb trees with her cousins and would not even stand near the window of her grandparents' tenth-floor flat. It was her mother, a keen walker, who took her to an indoor climbing centre for a birthday party when she was eight. 'I spent the first hour sitting on a bench,' Lena remembers. 'Then I watched a girl younger than me go all the way to the top, and I thought, if she can do it, why can't I?'

She did not get very far that day, but she asked to go back the following weekend, and the weekend after that. By the end of the summer she was climbing three times a week. Her coach, Pavel Horak, noticed her almost immediately. 'She wasn't the strongest child in the group,' he says, 'but she was the one who never gave up. If she fell off, she would sit and look at the wall for a few minutes and then try again in a different way. That's something you can't really teach.'

These days Lena trains five times a week, which leaves her very little free time. She gets up at six to do her homework before school, and most evenings she doesn't get home until after eight. Her friends sometimes complain that she misses parties and trips to the cinema, and she admits this can be hard. 'There are moments when I wish I had a normal life,' she says. 'But then I go to a competition and I remember why I do it. Nothing else makes me feel like that.'

Climbing has become far more popular since it was included in the Olympic Games, and Horak has mixed feelings about this. On the one hand, there is more money for young climbers and there are better facilities. On the other, he worries that some parents now push their children too hard, hoping they will become stars. 'Climbing should be fun first,' he says. 'The children who do best are the ones who would climb even if there were no medals at all.'

Lena seems to be exactly that kind of climber. When I ask her about her plans for the future, she does not mention the Olympics. Instead, she talks about a famous rock face in Spain that she has seen in videos and hopes to climb one day. 'Competitions are exciting,' she says, 'but real rock is different. There are no coloured holds to show you the way. You have to find it yourself.'

As for her old fear of heights, she says it has never completely gone away. 'I still don't like looking down from tall buildings,' she laughs. 'On a wall, I'm concentrating so hard on the next move that I forget to be scared.'`,
questions:[
{q:"What does the writer say about Lena in the first paragraph?",
 opts:["Her behaviour on a climbing wall is very different from her usual behaviour.","She is less confident than other climbers of her age.","She enjoys being watched by adults when she climbs.","She expects to compete at the highest level very soon."],
 correct:0, why:"Normálně je tichá a stydlivá, ale na stěně se „úplně změní“ (changes completely). D: o vrcholové úrovni mluví trenér a „jednoho dne“ (one day), ne Lena a ne brzy.",
 evidence:"But put her at the bottom of a climbing wall and she changes completely."},
{q:"What made Lena decide to try climbing at the birthday party?",
 opts:["Her mother encouraged her to join in.","She felt bored sitting on the bench.","She saw someone younger than her succeed.","Her cousins challenged her to do it."],
 correct:2, why:"Viděla mladší holku vylézt až nahoru a řekla si: když to zvládne ona, proč ne já. A: maminka ji na oslavu jen vzala. D: sestřenice a bratranci jsou zmínění u lezení po stromech v dětství.",
 evidence:"Then I watched a girl younger than me go all the way to the top"},
{q:"What impressed Pavel Horak when he first saw Lena?",
 opts:["her physical strength","her natural ability to climb fast","her willingness to listen to advice","her determination"],
 correct:3, why:"Nebyla nejsilnější, ale „nikdy to nevzdala“ a zkoušela to znovu jinak – tedy odhodlání. A trenér přímo popírá (wasn't the strongest).",
 evidence:"but she was the one who never gave up"},
{q:"How does Lena feel about the time she spends training?",
 opts:["She regrets missing so many social events.","She would like to train less so that she can see her friends.","She sometimes finds it difficult but thinks it is worth it.","She is annoyed that her friends do not understand her."],
 correct:2, why:"Přiznává, že je to někdy těžké a chtěla by „normální život“, ale na závodech si vzpomene, proč to dělá – stojí jí to za to. A a B přehánějí jen první polovinu její odpovědi.",
 evidence:"But then I go to a competition and I remember why I do it."},
{q:"What worries Horak about climbing becoming an Olympic sport?",
 opts:["There is not enough money for young climbers.","Some children may be put under too much pressure.","Climbing centres have become too crowded.","Children are only interested in winning medals."],
 correct:1, why:"Bojí se, že někteří rodiče teď na děti příliš tlačí, aby z nich byly hvězdy. A je opak (peněz je víc). D je past: o medailích mluví, ale tvrdí, že nejlepší jsou děti, které by lezly i bez nich.",
 evidence:"he worries that some parents now push their children too hard"},
{q:"What does Lena say about climbing on real rock?",
 opts:["She has to find the route without any help.","It is less exciting than taking part in competitions.","It is something she has already done several times in Spain.","It helped her to get over her fear of heights."],
 correct:0, why:"Na skále nejsou barevné chyty, které ukazují cestu – musí si ji najít sama. B: soutěže jsou „exciting“, ale skála není označena za méně zajímavou. C: skálu ve Španělsku zná jen z videí a teprve ji chce zdolat.",
 evidence:"There are no coloured holds to show you the way. You have to find it yourself."}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-river-cleanup", title:"Friends of the river", topic:"životní prostředí", intro:"You are going to read an article in which a teenager describes how he started a river clean-up group.",
text:`I have lived next to the River Ash my whole life, but until two years ago I hardly ever looked at it. It was just there, a brown line on the way to school, usually with a plastic bag or two caught in the branches along the bank. Then, one Saturday morning, I went fishing with my uncle, and instead of fish we caught three crisp packets, a flip-flop and a bicycle tyre. My uncle shook his head and said that when he was my age, people used to swim there. I remember feeling angry, although I wasn't sure who I was angry with.

That evening I posted a message on our town's social media page asking if anyone wanted to help me clean the river. I honestly expected nobody to answer. By the next morning, twenty-three people had replied. Most of them were retired, a few were parents with young children, and one was my former maths teacher, which was slightly embarrassing. We agreed to meet by the old bridge the following Sunday.

That first clean-up was chaotic. Nobody had thought about gloves or bags, and we had no idea what to do with the rubbish once we had collected it. In the end, a farmer let us pile everything in a corner of his field until the council could take it away. But we filled forty bags in three hours, and the highlight of the day came when four of us managed to pull a rusty shopping trolley out of the water. Someone took a photo of us holding it above our heads, and it appeared in the local newspaper the next week.

After that, things moved quickly. The council gave us equipment and agreed to collect the rubbish, and a local supermarket offered to pay for T-shirts with our name on them: Friends of the Ash. More young people started coming too, which pleased me most of all. At the beginning I had been the only teenager, and I had worried that my friends would think the whole thing was uncool. In fact, several of them now come every month.

Not everything has been positive, though. Some of the rubbish keeps coming back however often we remove it, because people continue to throw it out of their car windows on the road above the river. We have put up signs, but I'm not sure they make much difference. It can be frustrating to clean the same stretch of bank and find it just as dirty four weeks later. My mum says this is a lesson about life in general, but I think she just likes saying things like that.

The good news is that the river itself seems to be recovering. Last spring, a scientist from the university tested the water and found that it was cleaner than it had been for twenty years. She explained that this was mainly because of new rules for the factories upstream, not because of us. Still, she said, our work had helped wildlife along the banks, and it had made people care about the river again. That, I think, is the part I'm proudest of.

Next month my uncle and I are going fishing again, in the same place as before. I can't promise we'll catch anything, but I'm fairly confident it won't be a flip-flop.`,
questions:[
{q:"How did the writer feel after the fishing trip with his uncle?",
 opts:["guilty that he had never noticed the state of the river","upset, without knowing exactly who to blame","disappointed that they had not caught any fish","surprised that people used to swim in the river"],
 correct:1, why:"Cítil vztek, ale „nevěděl, na koho se zlobí“. A: že si řeky nevšímal, říká, ale pocit viny nezmiňuje. D: koupání zmínil strýc, o překvapení pisatele text nemluví.",
 evidence:"I remember feeling angry, although I wasn't sure who I was angry with."},
{q:"What does the writer say about the replies to his message?",
 opts:["There were more of them than he had expected.","They came mainly from people of his own age.","Most of them came from parents with young children.","Several people suggested a different meeting place."],
 correct:0, why:"Čekal, že neodpoví nikdo, a do rána odpovědělo 23 lidí. B ani C neplatí – většina byli důchodci, rodičů bylo jen „pár“.",
 evidence:"I honestly expected nobody to answer. By the next morning, twenty-three people had replied."},
{q:"What does the writer say about the first clean-up?",
 opts:["It was spoilt by an argument with a farmer.","It was reported in the newspaper before it took place.","It took much longer than everyone had planned.","It was badly organised but successful."],
 correct:3, why:"Byl to chaos (bez rukavic a pytlů), ale za tři hodiny naplnili 40 pytlů a vytáhli vozík – úspěch. A je opak: farmář jim pomohl. B: článek vyšel až týden potom.",
 evidence:"That first clean-up was chaotic."},
{q:"What pleased the writer most about the way the group developed?",
 opts:["the support from the local council","the T-shirts paid for by the supermarket","the increasing number of young members","the article about the group in the newspaper"],
 correct:2, why:"Že začali chodit i další mladí, ho potěšilo „ze všeho nejvíc“ (pleased me most of all). Rada i supermarket pomohly, ale nejsou označeny jako to nejdůležitější.",
 evidence:"More young people started coming too, which pleased me most of all."},
{q:"What problem does the writer describe in the fifth paragraph?",
 opts:["The signs the group put up were removed.","The group's efforts are undone by people who continue to drop litter.","Some members have stopped coming because they feel frustrated.","The group is not allowed to clean the road above the river."],
 correct:1, why:"Odpadky se vracejí, protože lidé je dál vyhazují z aut – práce skupiny přijde vniveč. A: cedule tam jsou, jen nejspíš nepomáhají. C: frustraci cítí pisatel, nikdo neodešel.",
 evidence:"because people continue to throw it out of their car windows on the road above the river"},
{q:"According to the scientist, why is the water cleaner than before?",
 opts:["The group had removed so much rubbish from the river.","Wildlife had returned to the banks of the river.","Factories now have to follow new regulations.","People in the town had started to care about the river."],
 correct:2, why:"Hlavní příčinou jsou nová pravidla pro továrny proti proudu, „ne my“. A je přesně to, co vědkyně popírá. B a D jsou přínosy práce skupiny, ne důvod čistší vody.",
 evidence:"this was mainly because of new rules for the factories upstream, not because of us"}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-audition", title:"The audition", topic:"hudba", intro:"You are going to read an extract from a novel about a girl who is auditioning for a music school.",
text:`Ellie had been sitting outside the audition room for forty minutes, and in that time she had decided at least three times to go home. The corridor smelt of floor polish and old radiators, and through the closed door she could hear someone playing the same difficult piece she had prepared, only much better. Every time the music stopped, she checked her phone, as if a message might arrive telling her the audition had been cancelled.

Her brother Sam had offered to come with her, but she had said no. Sam was two years older and had never been nervous about anything in his life, or at least that was how it seemed to Ellie. He would have sat beside her, telling jokes and asking her loudly whether she was scared, and that would have made everything worse. Now, though, she rather wished he were there. Even his terrible jokes would have been better than the silence.

The door opened and a tall boy came out carrying a violin case. He looked pale but relieved, and he gave her a small, sympathetic smile as he passed, the kind of smile people give you at the dentist's. Then a woman with grey hair and bright red glasses put her head round the door and read Ellie's name from a list. It sounded strange, as though it belonged to somebody else.

Inside, the room was bigger than she had imagined. There were three people sitting behind a long table: the woman with the red glasses, a younger man who was writing something, and an elderly man who did not look up at all. Ellie's hands were shaking so badly that it took her two attempts to open her cello case. When she finally sat down and began to tune, one of the strings went flat almost immediately, and she had to start again. She could feel her cheeks burning.

'Take your time,' said the woman, kindly. 'We're not in a hurry.'

It was such an ordinary thing to say, but it helped. Ellie took a deep breath, the way her teacher had shown her, and looked at the window instead of the table. Outside, a man was trying to park a van in a space that was obviously too small for it. She watched him for a few seconds, and somehow his struggle made her feel calmer. Then she lifted her bow and began.

She would never be able to remember the next six minutes clearly. She knew that she had made a mistake near the beginning, and that the slow section in the middle had gone better than it ever had at home. At one point she noticed that the elderly man had stopped writing and was looking straight at her, but she could not tell whether that was a good sign or a bad one. When she finished, nobody said anything for a moment, and she was suddenly sure she had failed.

'Thank you, Eleanor,' said the elderly man at last. It was the first time he had spoken. 'Tell me – who taught you to play the slow movement like that?'

'Nobody,' Ellie said, before she could stop herself. 'I mean, I just … that's how it sounds to me.'

For the first time, the old man smiled. 'Good,' he said. 'That's the right answer.'

On the bus home, she sent Sam a message. She did not tell him how it had gone, because she still did not know. She just wrote: 'Done. Survived.' His reply came back immediately: 'Never doubted it.' She knew that was not quite true, but she smiled anyway.`,
questions:[
{q:"How did Ellie feel while she was waiting outside the room?",
 opts:["She regretted not having practised the piece more.","She was tempted to leave before her audition.","She was annoyed that the audition had been delayed.","She was hoping to hear from her brother."],
 correct:1, why:"Za 40 minut se „nejméně třikrát rozhodla jít domů“ – lákalo ji odejít. D: telefon kontrolovala kvůli případnému zrušení konkurzu, ne kvůli bratrovi.",
 evidence:"she had decided at least three times to go home"},
{q:"Why had Ellie refused Sam's offer to come with her?",
 opts:["She knew that he was secretly nervous himself.","She wanted to prove that she could manage on her own.","She thought his behaviour would make her more nervous.","She did not want him to hear her play."],
 correct:2, why:"Sam by vtipkoval a nahlas se ptal, jestli se bojí – „a tím by bylo všechno horší“. A je opak (Sam nebyl nervózní nikdy). B ani D text neuvádí.",
 evidence:"and that would have made everything worse"},
{q:"The writer compares the boy's smile to 'the kind of smile people give you at the dentist's' to show that",
 opts:["he was trying to hide how badly his own audition had gone.","he was not really interested in Ellie.","he recognised Ellie from somewhere else.","he felt sorry for Ellie because of what she was about to go through."],
 correct:3, why:"Úsměv byl „soucitný“ (sympathetic) – jako u zubaře, kde ostatní vědí, že vás čeká něco nepříjemného. A: chlapec vypadal „pale but relieved“, nic neskrýval.",
 evidence:"he gave her a small, sympathetic smile as he passed"},
{q:"Apart from the woman's words, what helped Ellie to feel calmer before she started playing?",
 opts:["remembering one of her brother's jokes","watching something unrelated happening outside","noticing that the examiners were not looking at her","tuning her cello for a second time"],
 correct:1, why:"Dívala se z okna na muže, který parkoval dodávku – a jeho trápení ji „nějak uklidnilo“. D: druhé ladění bylo naopak důsledkem nervozity (tváře jí hořely).",
 evidence:"somehow his struggle made her feel calmer"},
{q:"What do we learn about Ellie's performance?",
 opts:["She played every section perfectly.","She was confident that it had gone well.","Some parts went better than others.","She could not remember anything about it afterwards."],
 correct:2, why:"Na začátku udělala chybu, ale pomalá část šla lépe než kdykoli doma. B je opak (byla si jistá, že neuspěla). D je past: nepamatovala si to „jasně“, ne vůbec nic.",
 evidence:"She knew that she had made a mistake near the beginning, and that the slow section in the middle had gone better than it ever had at home."},
{q:"Why did the elderly man say 'That's the right answer'?",
 opts:["He approved of Ellie having her own way of playing.","Ellie had named a well-known teacher.","He wanted to end the audition politely.","Ellie had admitted making a mistake."],
 correct:0, why:"Ellie řekla, že ji to nikdo neučil, takhle to prostě slyší – starý pán oceňuje její vlastní interpretaci. B je opak (odpověděla „Nobody“).",
 evidence:"that's how it sounds to me"}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-island-volunteer", title:"Counting puffins", topic:"cestování", intro:"You are going to read an article in which a young woman describes a month she spent as a volunteer on a small island.",
text:`When I finished school, most of my friends went straight to university or started work. I wasn't ready for either, so I applied to spend a month as a volunteer on Fair Isle, a tiny island halfway between Scotland and Norway. I had seen it on a nature programme years earlier and never forgotten the pictures of puffins standing on the cliffs. What I hadn't really thought about was how I would cope with living somewhere with sixty inhabitants, one shop and no proper internet.

Getting there was an adventure in itself. The small plane from the mainland only flies when the weather is good, and on the day I was supposed to travel, it wasn't. I spent two nights in a hostel in Shetland, checking the forecast every hour and wondering whether I had made a terrible mistake. When the plane finally took off, I was so relieved that I hardly noticed how much it was shaking.

My job was to help the scientists at the bird observatory count the seabirds that nest on the island. This sounds simple, but it isn't. Every morning we walked to a different part of the coast, lay on our stomachs at the edge of the cliffs, and counted the birds on each rock through binoculars. It was cold, windy and often wet, and the numbers had to be exact. On my first day I lost count so many times that I almost gave up. Gemma, the scientist in charge, told me that everybody struggled at first and that it was better to count slowly than to guess. By the end of the week I could tell the difference between a guillemot and a razorbill from two hundred metres away.

The puffins were everything I had hoped for. They are much smaller than I had imagined – about the size of a pigeon – and they are surprisingly unafraid of people. If you sit quietly near their burrows, they carry on with their business as if you weren't there. I spent hours watching them and took hundreds of photos, nearly all of which turned out blurred.

What I hadn't expected was how much I would enjoy the community. Everyone on the island seemed to have three or four jobs. The woman who ran the shop also drove the fire engine, and the man who repaired the boats was also the island's photographer. On Saturday evenings there was a dance in the village hall, and the volunteers were always invited. I can't dance at all, but nobody seemed to mind.

There were difficult moments too. Our counts showed that the number of some seabirds had fallen badly in recent years, mainly because the small fish they feed on are disappearing as the sea gets warmer. Gemma said it was hard to watch, but that the counts were important exactly because they showed what was happening. Without them, she said, nobody would know there was a problem at all.

I've been home for six months now and I've started a degree in environmental science, something I would never have considered before. I still have one of my blurred puffin photos on my bedroom wall. It isn't a good picture, but whenever I look at it I remember lying on a cliff in the wind, counting birds one by one, and feeling that for once I was doing something that really mattered.`,
questions:[
{q:"Why did the writer choose to go to Fair Isle?",
 opts:["She wanted to get away from her friends for a while.","She had been interested in it since seeing it on television.","She needed some experience before starting university.","She wanted to find out how she would cope in a small community."],
 correct:1, why:"Ostrov viděla před lety v přírodovědném pořadu a nezapomněla na papuchalky. D je past: o tom, jak zvládne malou komunitu, právě „vůbec nepřemýšlela“.",
 evidence:"I had seen it on a nature programme years earlier and never forgotten the pictures of puffins"},
{q:"How did the writer feel while she was waiting in Shetland?",
 opts:["worried that she had made the wrong decision","frightened about flying in a small plane","annoyed that nobody had warned her about the weather","pleased to have time to rest before starting work"],
 correct:0, why:"Přemýšlela, jestli neudělala „hroznou chybu“. B: let byl neklidný, ale byla tak ráda, že si toho skoro nevšimla.",
 evidence:"wondering whether I had made a terrible mistake"},
{q:"What does the writer say about counting the seabirds?",
 opts:["Gemma allowed the volunteers to estimate the numbers.","She preferred it to the other jobs on the island.","It was easier when the weather was bad.","It was more difficult than it might appear."],
 correct:3, why:"„Zní to jednoduše, ale není.“ A je opak – Gemma řekla, že je lepší počítat pomalu než odhadovat (guess).",
 evidence:"This sounds simple, but it isn't."},
{q:"What surprised the writer about the puffins?",
 opts:["how easy they were to photograph","how large they were","how little they seemed to be disturbed by people","how much time they spent in their burrows"],
 correct:2, why:"Jsou „překvapivě nebojácní“ – když sedíte potichu, chovají se, jako byste tam nebyli. A je opak (fotky byly rozmazané), B také (byli menší, než čekala).",
 evidence:"they are surprisingly unafraid of people"},
{q:"What point does the writer make about the people who live on the island?",
 opts:["They were not very welcoming to the volunteers.","Many of them did more than one kind of work.","They spent most of their free time dancing.","They had all lived on the island for many years."],
 correct:1, why:"Každý na ostrově měl „tři nebo čtyři práce“ (obchod + hasičské auto, opravy lodí + fotograf). A je opak – dobrovolníci byli vždy zváni.",
 evidence:"Everyone on the island seemed to have three or four jobs."},
{q:"According to Gemma, why are the bird counts important?",
 opts:["They help to stop the fish from disappearing.","They prove that the sea is getting warmer.","They show changes that would otherwise go unnoticed.","They encourage more people to visit the island."],
 correct:2, why:"Bez sčítání by „nikdo nevěděl, že je nějaký problém“. B: oteplování moře je příčina úbytku, sčítání ho nedokazuje. A: sčítání nic nezastaví, jen ukazuje stav.",
 evidence:"Without them, she said, nobody would know there was a problem at all."}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-teen-app", title:"An app for Grandma", topic:"technologie", intro:"You are going to read an article about a teenager who designed a successful app.",
text:`Like many people his age, Tomás Ruiz spends a lot of time looking at a screen. Unlike most of them, however, the seventeen-year-old from Valencia has something to show for it. Last year, an app he designed in his bedroom was downloaded more than two hundred thousand times, and he is now being asked to give talks at technology conferences where he is usually the youngest person in the room by about twenty years.

The idea for the app came from his grandmother, Carmen, who lives alone and has poor eyesight. She kept forgetting to take her medicine, and the alarm on her phone did not help because she could never remember what it was for. 'She would hear the alarm, switch it off, and then forget about it,' Tomás explains. 'So I thought, what if the phone could actually tell her what to do, in her own language, in a voice she recognised?'

The app he created allows family members to record short spoken messages, which are then played at set times. Instead of a beep, Carmen now hears her grandson's voice saying, 'Grandma, it's time for your blue tablet.' Tomás admits that the first version was far from perfect. 'It crashed about five times a day,' he laughs. 'My grandmother was very patient. She said it was the most interesting thing that had happened to her phone in years.'

Tomás taught himself to program by watching online videos when he was twelve, and he says his school has not played a big part in his success. Computer science lessons, he says, mostly involved learning to use office software. 'I don't want to criticise my teachers,' he adds quickly. 'They were very supportive when they found out what I was doing. But the things I needed to learn weren't on the timetable.'

Once the app was working reliably, Tomás shared it with a few friends, whose families started using it too. Then a local newspaper wrote about him, and the number of downloads suddenly exploded. Within a month he was receiving hundreds of emails a day, many from people asking for new features. Some wanted the messages to be translated automatically; others asked for a version for children with learning difficulties. 'At first I tried to answer everyone,' he says. 'Then I realised I would never have time to sleep, or to do my homework.'

His parents, who are both nurses, have been careful not to let the app take over his life. They insisted that he finish school before thinking about setting up a company, and they have turned down several offers from investors on his behalf. Tomás says he found this frustrating at the time, but now he is grateful. 'I was being offered a lot of money,' he says, 'but I didn't really understand what I would have to give up in return.'

The app is still free, and Tomás has no plans to change that. He has been offered a place to study engineering at university next year, and he hopes to use what he learns there to improve the app further. When I ask whether he thinks of himself as a businessman, he looks genuinely surprised. 'Not really,' he says. 'I just wanted to help my grandmother. Everything else happened by accident.'

His grandmother, meanwhile, has become something of a celebrity in her neighbourhood. 'People stop her in the street to talk about it,' Tomás says. 'She tells everyone the app was her idea. And to be honest, she's right.'`,
questions:[
{q:"What does the writer suggest about Tomás in the first paragraph?",
 opts:["He spends less time online than most teenagers.","He feels uncomfortable at technology conferences.","He designed the app with help from older experts.","He has achieved something unusual for someone of his age."],
 correct:3, why:"Na konferencích bývá „nejmladší asi o dvacet let“ a jeho aplikaci si stáhlo přes 200 000 lidí – na svůj věk dosáhl něčeho neobvyklého. A je opak (u obrazovky tráví hodně času). B ani C text neříká.",
 evidence:"he is usually the youngest person in the room by about twenty years"},
{q:"Why did the alarm on Carmen's phone not solve her problem?",
 opts:["She could not hear it clearly.","She could not remember what it was reminding her to do.","She did not know how to switch it off.","It went off at the wrong times."],
 correct:1, why:"Budík slyšela a vypnula, ale „nikdy si nepamatovala, k čemu je“. A: má špatný zrak, ne sluch. C je opak – vypnout ho uměla.",
 evidence:"she could never remember what it was for"},
{q:"What does Tomás say about the first version of the app?",
 opts:["His grandmother found it too complicated to use.","It only worked in one language.","It had a lot of technical problems.","He was disappointed with the way it sounded."],
 correct:2, why:"„Padala asi pětkrát denně“ – měla hodně technických chyb. A: babička byla trpělivá a aplikace ji bavila, o složitosti nemluví.",
 evidence:"It crashed about five times a day"},
{q:"What is Tomás's opinion of the education he received at school?",
 opts:["It did not teach him the skills he needed for the app.","His teachers did not support his interest in programming.","The computer science lessons were too difficult for him.","It was more useful than the online videos he watched."],
 correct:0, why:"To, co potřeboval, „nebylo v rozvrhu“ – učil se sám z videí. B je opak (učitelé ho podporovali). C: hodiny byly spíš jednoduché (kancelářský software).",
 evidence:"But the things I needed to learn weren't on the timetable."},
{q:"What does 'this' refer to in the sentence 'Tomás says he found this frustrating at the time'?",
 opts:["having to answer hundreds of emails","his parents' decisions about the app and his future","being asked to give talks at conferences","the time he had to spend on his homework"],
 correct:1, why:"„This“ odkazuje na předchozí větu: rodiče trvali na tom, aby nejdřív dokončil školu, a odmítli nabídky investorů. A je z předchozího odstavce, ne z věty těsně před „this“.",
 evidence:"They insisted that he finish school before thinking about setting up a company, and they have turned down several offers from investors on his behalf."},
{q:"What does Tomás's final comment show?",
 opts:["He recognises his grandmother's part in creating the app.","He is annoyed that his grandmother takes the credit.","He wants his grandmother to become more famous.","He is embarrassed by the attention his grandmother gets."],
 correct:0, why:"Babička všem říká, že nápad byl její, a Tomás dodává „a upřímně, má pravdu“ – uznává, že nápad opravdu vzešel od ní. B je opak, C a D text neříká.",
 evidence:"And to be honest, she's right."}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-new-school", title:"Number 52 instead of 25", topic:"škola", intro:"You are going to read an article in which a teenager describes his first day at a new school in another country.",
text:`The night before my first day at Westbrook High, I hardly slept. We had arrived in Toronto two weeks earlier, after my mum got a job at a hospital there, and so far I had spent most of my time in our half-empty flat, watching Canadian television and trying to understand ice hockey. In England I had been at the same school since I was eleven. I knew everyone, and everyone knew me. Here, I was going to be the new boy with the funny accent.

Mum offered to drive me, but I said I'd rather take the bus. I didn't want my first appearance to be getting out of my mother's car while she waved at me. As it turned out, this was a mistake. I got on the wrong bus, ended up on the other side of the city, and arrived at school forty minutes late, hot and out of breath. The secretary in the school office took one look at me and laughed – not unkindly – and said, 'Let me guess. Number 52 instead of 25?' Apparently I wasn't the first.

She took me to my maths class, where the teacher, Mr Kowalski, introduced me to everyone. 'This is Daniel,' he said. 'He's come all the way from London.' I'm actually from a small town about two hours from London, but it didn't seem the right moment to explain. Twenty-eight faces turned to look at me, and I sat down in the only empty seat, next to a tall boy with headphones round his neck who didn't say a word for the whole lesson.

At lunchtime I wasn't sure where to go. The canteen was enormous and noisy, and everyone seemed to belong to a group already. I bought a sandwich and was looking for somewhere to sit when the boy with the headphones appeared beside me. 'You can sit with us if you want,' he said, as if he was mentioning the weather. His name was Marcus, and it turned out he wasn't unfriendly at all, just very shy. His friends asked me hundreds of questions about England – whether I had met the King, whether it really rained every day – and laughed every time I said 'mate'.

The afternoon was easier. In geography we were studying rivers, which I had done the year before, and for the first time that day I felt as if I knew what I was doing. I even answered a question, although I noticed that a couple of people repeated my answer afterwards in what was supposed to be an English accent. I decided to take it as a compliment.

When I got home, Mum was waiting with a cake she had bought specially, which was a bit embarrassing but also quite nice. She asked how it had gone, and I said 'fine', which is what I always say. Later, though, lying in bed, I made a list in my head of the good and bad parts of the day. The bus was definitely on the bad list. Marcus was on the good one.

That was eight months ago. I still haven't really understood ice hockey, but Marcus is now my best friend and I've stopped getting lost. Last week a new girl arrived in our class from Brazil. At lunchtime I saw her standing in the canteen with a sandwich, looking around. I knew exactly what to do.`,
questions:[
{q:"What was the writer worried about the night before his first day?",
 opts:["that he would not understand the lessons","that he would seem different from the other students","that he would not be able to find the school","that his old friends would forget him"],
 correct:1, why:"V Anglii znal všechny, tady měl být „nový kluk s legračním přízvukem“ – bál se, že bude působit jinak než ostatní. C je past: zabloudil až ráno, předem se toho nebál.",
 evidence:"Here, I was going to be the new boy with the funny accent."},
{q:"Why did the writer decide not to let his mother drive him to school?",
 opts:["He wanted to learn how to use the buses.","His mother had to get to work early.","He thought it would be quicker to go by bus.","He was worried about what the other students might think."],
 correct:3, why:"Nechtěl, aby jeho první příchod vypadal tak, že vystupuje z maminčina auta a ona mu mává – bál se, jak to budou vnímat ostatní. A–C text nezmiňuje.",
 evidence:"I didn't want my first appearance to be getting out of my mother's car while she waved at me."},
{q:"What does the secretary's comment suggest?",
 opts:["Other students had made the same mistake before.","She was annoyed that the writer was late.","The bus numbers had recently been changed.","She had been told that the writer would be late."],
 correct:0, why:"Hned uhodla, že spletl autobus 52 a 25 – „zřejmě jsem nebyl první“. B je opak: smála se „not unkindly“, tedy ne zle.",
 evidence:"Apparently I wasn't the first."},
{q:"Why didn't the writer correct Mr Kowalski?",
 opts:["He was too nervous to speak.","He did not think the mistake was important.","He felt it was not a suitable time to do so.","He did not want to seem rude to the teacher."],
 correct:2, why:"Nezdálo se mu, že je „ta správná chvíle“ to vysvětlovat. A, B ani D text neuvádí – jde o vhodnost chvíle, ne o nervozitu či zdvořilost.",
 evidence:"it didn't seem the right moment to explain"},
{q:"What did the writer discover about Marcus at lunchtime?",
 opts:["The teacher had asked him to look after the writer.","He was keen to learn more about England.","His silence in class had been caused by shyness.","He was not very popular with the other students."],
 correct:2, why:"Ukázalo se, že Marcus vůbec nebyl nepřátelský, „jen hodně stydlivý“ – proto celou hodinu mlčel. B: na Anglii se ptali hlavně jeho kamarádi. D je opak – měl partu přátel.",
 evidence:"it turned out he wasn't unfriendly at all, just very shy"},
{q:"What does the final paragraph suggest about the writer?",
 opts:["He still finds it difficult to make new friends.","He regrets moving to Canada.","He wants to learn Portuguese.","He intends to help the new girl as he was once helped."],
 correct:3, why:"Nová dívka stojí v jídelně se sendvičem a rozhlíží se – přesně jako on kdysi. „Věděl přesně, co udělat“: pozve ji ke stolu jako Marcus jeho. A je opak (Marcus je jeho nejlepší kamarád).",
 evidence:"I knew exactly what to do."}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-half-marathon", title:"Twenty-one kilometres with Dad", topic:"rodina a sport", intro:"You are going to read an article in which a young man describes training for a race with his father.",
text:`My dad has never been what you would call sporty. For as long as I can remember, his idea of exercise has been walking to the newsagent's on Sunday morning to buy a paper. So when he announced at dinner one evening in January that he was going to run a half marathon in the autumn, my brother and I nearly choked on our pasta. Then he looked at me and said, 'And you're going to run it with me.'

I was nineteen, in my first year at university, and I considered myself reasonably fit. I played football once a week and sometimes went to the gym. A half marathon, though, is twenty-one kilometres, which is a long way however fit you are. My first reaction was to say no. But Dad explained that he wanted to raise money for the hospital that had looked after my grandfather the year before, and suddenly it was much harder to refuse.

We started training in February, following a plan we found online. Three times a week we went running together, usually early on Saturday and Sunday mornings and once during the week when I came home. The first few weeks were not much fun. Dad could only run for about two minutes before he had to stop and walk, and he complained constantly – about the cold, about his knees, about the people who passed us looking as if they were enjoying themselves. To be honest, I wasn't much better. Football, it turned out, had not prepared me for running at a steady pace for a long time.

Then, sometime in April, something changed. I can't say exactly when it happened, but one Sunday we ran eight kilometres without stopping and realised we were still able to talk. After that, the runs became the part of the week I looked forward to most. We talked about all kinds of things we had never discussed before: his job, which I had never really understood, my plans after university, even my grandfather, whom neither of us had talked about much since he died. Running side by side, without looking at each other, made it somehow easier to say things.

Not everything went according to plan. In June, Dad hurt his ankle and could not run for three weeks. He was so miserable that Mum said he was worse than a child. I carried on training alone, but it wasn't the same, and I was secretly relieved when he was able to join me again.

The race itself was in October. It was raining, the start was crowded, and at the sixteen-kilometre mark Dad told me to go on without him. I refused. We had started together and we were going to finish together, even if it meant walking. In the end we crossed the line in two hours and twenty-eight minutes, which is not a fast time, but we didn't care. Mum and my brother were waiting at the finish with a huge homemade sign. Between us we had raised almost two thousand pounds.

Dad has now signed up for another race next spring. He hasn't asked me to run with him this time, but I think he knows I will. Not for the medal, and not even for the money, but for those long conversations on Sunday mornings.`,
questions:[
{q:"How did the writer and his brother react to their father's announcement?",
 opts:["They were very surprised.","They thought he was joking.","They were worried about his health.","They offered to help him train."],
 correct:0, why:"Málem se zakuckali těstovinami – byli velmi překvapení, protože táta nikdy nesportoval. B ani C text neříká.",
 evidence:"my brother and I nearly choked on our pasta"},
{q:"Why did the writer agree to run the race?",
 opts:["He wanted to prove how fit he was.","He had always wanted to run a long race.","He did not want his father to run alone.","He was persuaded by his father's reason for running."],
 correct:3, why:"Nejdřív chtěl odmítnout, ale táta chtěl vybrat peníze pro nemocnici, která se starala o dědečka – „najednou bylo mnohem těžší odmítnout“.",
 evidence:"suddenly it was much harder to refuse"},
{q:"What does the writer say about the first weeks of training?",
 opts:["He found running much easier than his father did.","Playing football had prepared him well for long runs.","Neither he nor his father found it easy.","They often trained with other runners."],
 correct:2, why:"Táta uběhl jen dvě minuty a stěžoval si, a pisatel přiznává: „upřímně, já nebyl o moc lepší“. A i B text vyvrací (fotbal ho na běh nepřipravil).",
 evidence:"To be honest, I wasn't much better."},
{q:"According to the writer, why was it easier to talk during their runs?",
 opts:["They no longer had to concentrate on running.","They were not looking at each other while they talked.","They had plenty of time because the runs were long.","They were both happy because they were getting fitter."],
 correct:1, why:"Běh bok po boku, „aniž by se na sebe dívali“, usnadňoval říkat věci. Ostatní důvody text neuvádí.",
 evidence:"Running side by side, without looking at each other, made it somehow easier to say things."},
{q:"How did the writer feel while his father was injured?",
 opts:["pleased to have more time for his studies","annoyed that his father complained so much","sorry not to be running with him","worried that they would not be able to do the race"],
 correct:2, why:"Běhal dál sám, ale „nebylo to ono“ a byl potají rád, když se táta vrátil – chyběly mu společné běhy. B: stěžování zmiňuje máma, ne pisatel.",
 evidence:"it wasn't the same, and I was secretly relieved when he was able to join me again"},
{q:"What is the main reason the writer will run with his father again?",
 opts:["He enjoys the time they spend together.","He wants to achieve a better time.","He wants to raise more money.","His father has asked him to."],
 correct:0, why:"Nepoběží kvůli medaili ani penězům, „ale kvůli těm dlouhým nedělním rozhovorům“. D je opak – tentokrát ho táta nepožádal.",
 evidence:"but for those long conversations on Sunday mornings"}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-market-stall", title:"Grandma's recipes, Saturday queues", topic:"jídlo a podnikání", intro:"You are going to read an article about a teenager who runs a food stall at a market.",
text:`Every Saturday at six in the morning, while most of her friends are still asleep, eighteen-year-old Priya Shah is loading boxes into her uncle's van. By nine, her small stall at Kingsbridge Market is ready, and by ten there is usually a queue. Priya sells vegetable curries, rice and flatbreads made from recipes that belonged to her grandmother, and in the two years since she started, the stall has become one of the most popular in the market.

It all began with a school project. In Year 12, Priya's business studies class was asked to come up with an idea for a small company and test it for a month. Most of her classmates chose to sell things online, but Priya wanted to do something with food. 'I'd been cooking with my grandmother since I was about six,' she says. 'It was the one thing I knew I was good at.' Her teacher was doubtful at first, pointing out that food businesses have to follow strict hygiene rules. Priya responded by doing a food safety course at the weekend and passing it with the highest mark in the group.

The first month was harder than she had imagined. On her first Saturday it rained all day, and she sold only eleven portions. Most of the food had to be given away to the other stallholders at the end of the day. 'I went home and cried,' she admits. 'I thought, that's it, it was a stupid idea.' It was her grandmother who persuaded her to try again. She told Priya that her own first restaurant in Nairobi, more than fifty years earlier, had almost closed in its first week.

Gradually, word spread. Office workers started coming back every weekend, and a food blogger wrote a review that described Priya's dal as 'the best thing I have eaten in this city for under five pounds'. After that, she never had leftover food again. In fact, her main problem now is that she often runs out by one o'clock and has to send people away disappointed.

Running a business while studying for her final exams has not been easy. Priya cooks on Friday evenings, which means she has had to give up most of her social life, and she does her homework on Sunday afternoons, when she is often exhausted. Her parents were worried that her grades would suffer, but in fact they have improved. 'Having less time made me more organised,' she explains. 'I can't waste an hour scrolling through my phone any more, because I simply don't have that hour.'

The stall has also taught her things that no classroom could. She has learnt how to deal with suppliers, how to calculate prices so that she makes a profit, and how to stay polite to customers who complain that the food is too spicy – or not spicy enough. 'You can't please everybody,' she says, 'so I just try to make food that I'm proud of.'

Next year Priya will start a degree in food science, and she plans to keep the stall going in the holidays. Her long-term dream is to open a restaurant named after her grandmother. When I ask what her grandmother thinks of all this, Priya laughs. 'She comes to the market every week and tastes everything,' she says. 'Then she tells me exactly what I've done wrong. She's my toughest customer.'`,
questions:[
{q:"Why did Priya choose a food business for her school project?",
 opts:["She was confident about her cooking skills.","She thought it would make more money than selling online.","Her teacher suggested it.","Her grandmother wanted her to."],
 correct:0, why:"Vaření s babičkou bylo „to jediné, o čem věděla, že v tom je dobrá“. C je opak – učitel o nápadu zpočátku pochyboval.",
 evidence:"It was the one thing I knew I was good at."},
{q:"How did Priya react to her teacher's doubts?",
 opts:["She changed her plans.","She took action to show she could meet the requirements.","She asked her grandmother to help her.","She decided to sell food online instead."],
 correct:1, why:"Učitel upozornil na přísná hygienická pravidla a Priya si o víkendu udělala kurz bezpečnosti potravin – s nejlepší známkou. A a D jsou opak.",
 evidence:"Priya responded by doing a food safety course at the weekend"},
{q:"Why did Priya decide to continue after her first Saturday?",
 opts:["The other stallholders had enjoyed her food.","She had sold more than she expected.","Her grandmother encouraged her by describing her own experience.","Her teacher told her not to give up."],
 correct:2, why:"Přesvědčila ji babička – vyprávěla, že její první restaurace v Nairobi taky málem v prvním týdnu zavřela. A: jídlo stánkařům rozdala, ale to důvodem pokračovat nebylo. B je opak.",
 evidence:"It was her grandmother who persuaded her to try again."},
{q:"What happened after the food blogger's review?",
 opts:["Priya had to increase her prices.","Office workers started to visit the stall.","Priya opened the stall on more days.","Priya always sold all her food."],
 correct:3, why:"Po recenzi už jí nikdy nezbylo jídlo a často je vyprodaná do jedné hodiny. B je past – kancelářští pracovníci chodili už PŘED recenzí („Gradually, word spread“).",
 evidence:"After that, she never had leftover food again."},
{q:"According to Priya, why have her grades improved?",
 opts:["Her parents have helped her with her studies.","She has learnt to use her time more efficiently.","She studies on Friday evenings instead of going out.","Her business studies teacher has given her extra support."],
 correct:1, why:"„Méně času mě naučilo být organizovanější“ – už nemá hodinu na scrollování. C: v pátek večer vaří, úkoly dělá v neděli.",
 evidence:"Having less time made me more organised"},
{q:"What does Priya say about customers who complain?",
 opts:["She changes her recipes to suit them.","She refuses to serve them again.","She accepts that she cannot satisfy everyone.","She finds it hard to stay polite to them."],
 correct:2, why:"„Nemůžete se zavděčit všem“, a tak vaří jídlo, na které je hrdá. D: naučila se zůstat zdvořilá, o tom, že je to těžké, nemluví. A je opak.",
 evidence:"You can't please everybody"}
]},
/* ------------------------------------------------------------------ */
{
id:"p5-phone-free", title:"A month without my smartphone", topic:"technologie a zdraví", intro:"You are going to read an article in which a teenager describes spending a month without his smartphone.",
text:`It started as a bet. My friend Jakub said I couldn't survive a month without my smartphone, and I said of course I could. I was sixteen, and I spent, according to the screen-time feature on my phone, an average of six hours and twelve minutes a day on it. I had never actually looked at that number before. When I did, I felt slightly sick. I accepted the bet partly to win the pizza Jakub had promised me, and partly because I wanted to know who I was without it.

My parents were delighted, although my mum was also a bit worried about how she would contact me. In the end we agreed that I would carry my grandfather's old phone, which can only make calls and send texts, and which has a screen the size of a postage stamp. Typing a message on it takes so long that I soon stopped bothering, and started phoning people instead. This, it turned out, was the first of many surprises.

The first week was awful. I kept reaching for my pocket without thinking, especially when I was bored or waiting for something – at the bus stop, in the queue at the canteen, during adverts on television. Each time, there was nothing there, and I felt a strange kind of panic, as if I had forgotten something important. I also felt left out. My friends kept talking about videos and messages I hadn't seen, and I realised how much of our conversation was about things that had happened on our phones.

By the second week, though, something had changed. Without anything to look at, I started noticing things. I noticed that the old man who sits at the bus stop every morning feeds the pigeons with crumbs he brings in his pocket. I noticed that my little sister had started drawing comics, and that they were actually quite good. I read two books, which was two more than I had read in the whole previous year. And I slept much better, probably because I wasn't lying in bed watching videos until one o'clock in the morning.

Not everything was easier. Without a map on my phone, I got lost twice, once so badly that I had to ask a stranger for directions, which I found surprisingly embarrassing. I missed a party because the invitation was sent on a group chat I could no longer read. And I couldn't listen to music on the bus, which I minded more than almost anything else.

When the month ended, Jakub paid for the pizza, and I switched my smartphone back on. There were four hundred and twelve notifications waiting for me. I looked at them for a long time, and then I put the phone down and went to make a sandwich. Most of them, I realised, didn't matter at all.

I haven't given up my phone completely – I'm not sure that would be realistic, or even sensible. But I've made some changes. It stays in the kitchen at night now, and I've deleted the two apps I used most. My screen time is down to about two hours a day. I'd like to say I did it all for my health, but to be honest, I mainly did it for the pizza. The rest was a bonus.`,
questions:[
{q:"Why did the writer accept Jakub's bet?",
 opts:["to prove to his parents that he could do it","because Jakub had done the same thing before","because he was curious about what he was like without his phone","because his parents had asked him to use his phone less"],
 correct:2, why:"Vsadil se zčásti kvůli pizze a zčásti proto, že chtěl zjistit, „kým je bez telefonu“. A, B ani D text neuvádí – rodiče byli rádi až potom.",
 evidence:"partly because I wanted to know who I was without it"},
{q:"In the second paragraph, what does 'This' refer to?",
 opts:["his parents being delighted about the bet","the writer phoning people instead of sending messages","the size of the screen on his grandfather's phone","the agreement he made with his mother"],
 correct:1, why:"„This“ odkazuje na větu těsně předtím: psaní zpráv trvalo tak dlouho, že místo toho začal lidem volat. To bylo první překvapení.",
 evidence:"Typing a message on it takes so long that I soon stopped bothering, and started phoning people instead."},
{q:"How did the writer feel during the first week?",
 opts:["excluded from what his friends were talking about","relieved to have a break from his friends","proud that he had not touched his phone","bored because he had nothing to read"],
 correct:0, why:"Cítil se „left out“ – kamarádi mluvili o videích a zprávách, které neviděl. B je opak. C: naopak pořád sahal do kapsy a cítil paniku.",
 evidence:"I also felt left out."},
{q:"What is the writer's main point in the fourth paragraph?",
 opts:["He became more aware of what was happening around him.","He discovered that his sister was a talented artist.","He realised that reading was more fun than watching videos.","He needed less sleep than before."],
 correct:0, why:"Hlavní myšlenka: bez telefonu si začal „všímat věcí“ – pána s holuby, sestřiných komiksů… B je jen jeden z příkladů, ne hlavní pointa. D je opak (spal lépe, ne méně).",
 evidence:"Without anything to look at, I started noticing things."},
{q:"Which of these did the writer find hardest about being without his smartphone?",
 opts:["getting lost","having to ask a stranger for directions","missing a party","not being able to listen to music while travelling"],
 correct:3, why:"Nemožnost poslouchat hudbu v autobuse mu vadila „víc než skoro cokoli jiného“. Ostatní možnosti zmiňuje, ale bez takového důrazu (ptát se cizího bylo jen „embarrassing“).",
 evidence:"which I minded more than almost anything else"},
{q:"How does the writer feel about his phone now?",
 opts:["He thinks everyone should give up smartphones completely.","He has found a more balanced way of using it.","He regrets switching it back on.","He uses it only for music and maps."],
 correct:1, why:"Telefon se úplně nevzdal (to by nebylo realistické), ale změnil návyky – v noci je v kuchyni a používá ho jen asi dvě hodiny denně. A text výslovně odmítá.",
 evidence:"I haven't given up my phone completely"}
]},
];

/* ============================================================ PART 6 – gapped text (six sentences) ============================================================ */
window.DATA.reading.p6 = [
/* ------------------------------------------------------------------ */
{
id:"p6-skateparks", title:"From car park to skatepark", topic:"sport a volný čas", intro:"You are going to read an article about a man who designs skateparks.",
text:`When Tom Bradley was fourteen, the only place to skateboard in his town was the car park behind the supermarket. He and his friends would arrive after school, set up a homemade ramp and practise until the security guard came out to chase them away. [1] Then they would pick up their boards and move on to the steps outside the library, where the whole thing would start again.

Today, Tom is the director of a company that has designed more than forty skateparks across Britain. [2] Tom certainly sees the funny side. 'I spent my teenage years being told to go somewhere else,' he says. 'Now I'm the one building the somewhere else.'

Every project begins in the same way: not with a drawing, but with a conversation. Before anything is designed, Tom's team visits the local secondary schools and youth clubs and asks the people who will actually use the park what they want. [3] In one town, officials had planned a huge park with dozens of different features, but the teenagers asked for something much simpler: a long, smooth bowl and a few benches where they could sit and watch. 'Adults tend to think more is better,' Tom says. 'Skaters just want a few things that are really well made.'

Materials matter too. For many years, councils bought ready-made metal ramps from catalogues, because they were cheap and quick to install. [4] Every time a board landed, the sound rang across the neighbourhood, and complaints from local residents led to several parks being closed. Tom's company works only with concrete, which is almost silent and can last for fifty years or more.

Skateboarders are no longer the only people who use these parks. On a typical Saturday afternoon, the same concrete is shared by BMX riders, inline skaters and, above all, children on scooters. [5] To reduce the risk, Tom now designs separate areas for beginners, with gentle slopes and plenty of space, so that younger children can learn without getting in the way of more experienced riders.

The parks have not always been welcome. When plans for a new skatepark are announced, the first reaction from many older residents is to worry about noise, litter and groups of teenagers hanging around. Tom understands these fears, but he says they usually disappear within a few months. [6] He comes every afternoon with a flask of tea, sits on the same bench and watches. 'He told me it's better than television,' Tom laughs.

Tom himself still skates, although at thirty-eight he admits that he falls off more often than he used to and takes longer to get up. But his favourite moment in any project is not riding the new park himself. It is the opening day, when the gates are unlocked and dozens of young people rush in at once. 'I always think about that car park,' he says. 'If someone had built us a place like this, we'd never have gone home.'`,
sents:[
{label:"A", text:"The answers are not always what the council expects."},
{label:"B", text:"Most of them were made of wood and needed repairing every couple of years."},
{label:"C", text:"This can lead to arguments, and occasionally to accidents."},
{label:"D", text:"Sometimes he did this within minutes; on a good day, they had almost an hour."},
{label:"E", text:"At one park in the north of England, the most regular visitor is now a retired man of eighty-two."},
{label:"F", text:"Unfortunately, they also turned out to be extremely noisy."},
{label:"G", text:"Several of them are in towns very much like the one where he grew up."}
],
answers:{1:"D", 2:"G", 3:"A", 4:"F", 5:"C", 6:"E"},
why:{
1:"D – „he“ = hlídač (the security guard) a „did this“ = vyhnal je (chase them away). Věta za mezerou „Then they would pick up their boards and move on“ popisuje, co kluci udělali potom.",
2:"G – „Several of them“ odkazuje na „more than forty skateparks“. Za mezerou „Tom certainly sees the funny side“ – vtipné je právě to, že staví parky ve městech, jako bylo to jeho, kde ho dřív vyháněli.",
3:"A – „The answers“ jsou odpovědi na otázku, co mladí chtějí („asks … what they want“). Za mezerou následuje příklad, kdy odpovědi překvapily: úředníci plánovali obří park, teenageři chtěli něco jednoduchého.",
4:"F – „they also“ = kovové rampy; před mezerou jsou jejich výhody (cheap, quick), „Unfortunately … also“ přidává nevýhodu. Věta za mezerou hluk vysvětluje: „Every time a board landed, the sound rang…“.",
5:"C – „This“ = to, že park sdílí mnoho různých skupin (BMX, brusle, koloběžky). „Accidents“ navazuje na další větu „To reduce the risk…“ – bez zmínky o nehodách by „the risk“ neměl na co odkazovat.",
6:"E – Obavy obyvatel do pár měsíců zmizí; věta E je příkladem. Věta za mezerou začíná „He comes every afternoon“ – „he“ potřebuje mužský podmět, a tím je jen „a retired man of eighty-two“."
},
extraWhy:"B je navíc: „Most of them were made of wood“ – v textu se mluví jen o kovových rampách z katalogu (mezera 40) a o Tomových betonových parcích (mezera 38). Na obou místech by věta B textu odporovala a nenavazovala by ani na následující větu."
},
/* ------------------------------------------------------------------ */
{
id:"p6-teen-sleep", title:"Why teenagers can't get up", topic:"zdraví", intro:"You are going to read an article about teenagers and sleep.",
text:`Every school morning, in homes all over the world, the same scene takes place. A parent knocks on a bedroom door, calls a name, waits, and knocks again. Inside, a teenager groans and pulls the covers over his or her head. [1] Scientists now believe, however, that the real explanation has much more to do with biology than with character.

The key is a chemical called melatonin, which the brain produces in the evening to make us feel sleepy. In adults and young children, melatonin levels usually start rising at around nine or ten o'clock. [2] This means that a fifteen-year-old who goes to bed at ten may lie awake for a long time, not because of a phone or a computer game, but because their body is simply not ready to sleep. Melatonin levels also stay high for longer in the morning, which is why so many teenagers feel half asleep in their first lesson.

The problem is that school starts at the same time for everyone. Experts recommend that teenagers get between eight and ten hours of sleep a night, but surveys suggest that most get far less – often fewer than seven hours on school nights. [3] Unfortunately, this tends to make things worse, because it moves their body clock even later and makes it more difficult to fall asleep on Sunday night.

Lack of sleep affects far more than mood. Studies have linked it to poorer concentration and memory, slower reaction times and a higher risk of accidents among young drivers. [4] Tired people, it seems, are more likely to reach for sugary snacks, perhaps because their bodies are looking for a quick source of energy.

Some schools have decided to act on this research. In one well-known experiment, a group of secondary schools in the United States moved the start of the school day from half past seven to half past eight. [5] Attendance went up, fewer students fell asleep in class, and exam results improved, particularly in the first lessons of the day. The number of car accidents involving teenage drivers in the area also fell.

Not everyone is convinced that later start times are the answer. Some parents worry about how they will get to work if their children leave home later, and some teachers point out that after-school activities would also have to finish later. [6] Others argue that it would be better to teach teenagers about sleep and encourage them to switch off their screens earlier in the evening.

Most sleep scientists agree that both approaches are needed. Screens do make the problem worse, as their bright light can delay melatonin even further, and it is a good idea to keep phones out of the bedroom at night. But scientists insist that teenagers should not be blamed for something they cannot fully control. As one researcher puts it, 'Asking a sixteen-year-old to fall asleep at nine o'clock is like asking an adult to fall asleep at seven in the evening. You can try, but it probably won't work.'`,
sents:[
{label:"A", text:"The effects were noticeable within a single school year."},
{label:"B", text:"They then try to make up for it at the weekend by sleeping until lunchtime."},
{label:"C", text:"Sports clubs, for example, could find themselves training in the dark during the winter months."},
{label:"D", text:"In teenagers, however, the process begins up to two hours later."},
{label:"E", text:"Adults who work night shifts often have exactly the same difficulty."},
{label:"F", text:"It may also make it harder to control what we eat."},
{label:"G", text:"For years, this was seen simply as a sign of laziness."}
],
answers:{1:"G", 2:"D", 3:"B", 4:"F", 5:"A", 6:"C"},
why:{
1:"G – „this“ = scéna, kdy teenager nechce vstát. Věta za mezerou „Scientists now believe, however, … biology than with character“ staví vědecký pohled do protikladu k „laziness“ (lenost = povaha).",
2:"D – „however“ vytváří kontrast s dospělými a malými dětmi z předchozí věty, „the process“ = stoupání melatoninu. Za mezerou „This means that a fifteen-year-old…“ vyvozuje důsledek právě pro teenagery.",
3:"B – „They“ = teenageři, „make up for it“ = dohnat spánek, kterého mají málo. Za mezerou „this tends to make things worse“ – „this“ = vyspávání do oběda o víkendu, které posouvá biologické hodiny.",
4:"F – „It may also“ = nedostatek spánku a „also“ přidává další následek k výčtu (koncentrace, paměť, nehody). Věta za mezerou o sladkostech („sugary snacks“) rozvádí právě jídlo.",
5:"A – „The effects“ = výsledky popsaného experimentu (posunutí začátku školy). Za mezerou následuje jejich výčet: docházka, méně usínání, lepší výsledky.",
6:"C – „for example“ uvádí příklad k „after-school activities would also have to finish later“: sportovní kluby by v zimě trénovaly po tmě. Za mezerou „Others argue“ uvádí další skupinu kritiků."
},
extraWhy:"E je navíc: „exactly the same difficulty“ by potřebovalo před sebou konkrétní potíž, se kterou se dá srovnat. U mezery 39 by sice šlo o málo spánku, ale následující „this tends to make things worse, because it moves their body clock even later“ by pak nemělo na co odkazovat – vyspávání o víkendu zmiňuje jen věta B."
},
/* ------------------------------------------------------------------ */
{
id:"p6-repair-cafe", title:"Don't throw it away – fix it", topic:"životní prostředí", intro:"You are going to read an article about repair cafés.",
text:`On the first Saturday of every month, the community hall in Hillford fills up with broken things. There are toasters that no longer toast, lamps that refuse to light up and jeans with holes in embarrassing places. Their owners have not come to buy replacements. [1] Waiting for them at long tables are around fifteen volunteers with screwdrivers, sewing machines and, above all, a great deal of patience. Some of them are retired engineers or tailors; others are students who simply enjoy taking things apart.

This is the Hillford Repair Café, one of more than two thousand similar events around the world. The idea started in Amsterdam in 2009, when a journalist called Martine Postma became frustrated by how much was being thrown away. [2] She organised a single afternoon where people could bring their broken possessions and have them fixed for free, and it was so popular that it quickly spread to other cities and then to other countries. Today there are repair cafés in more than thirty countries, from Japan to Chile.

In Hillford, the café is run by Grace Okafor, a nineteen-year-old engineering student, who first came as a visitor with a broken hairdryer. [3] 'I couldn't believe something so simple had made it stop working,' she says. 'I'd been about to throw it in the bin.' She started volunteering the following month, and took over as organiser last year. Since then, the number of visitors has almost doubled.

Grace is keen to point out that the café is not a free repair service. Visitors are expected to sit with the volunteer and take part in the repair, so that next time they might be able to do it themselves. [4] But most leave feeling proud of what they have achieved, and quite a few have gone on to become volunteers themselves.

Not every repair is successful. About a third of the items brought in cannot be saved, usually because spare parts are unavailable or too expensive. Grace finds this frustrating. [5] Phones and laptops, for example, are often glued together, which makes it almost impossible to change a battery without special tools. 'Sometimes the problem is something tiny, like a broken plastic clip,' she says, 'but there's no way to buy a new one.'

There are signs that this may be changing. In several countries, new laws now require manufacturers to make spare parts available for a number of years and to provide repair instructions. [6] Grace hopes the idea will spread to Britain too. 'If you can't fix something you've paid for,' she says, 'do you really own it?'

For now, though, the café is more popular than ever, and the waiting list for bicycle repairs has grown so long that Grace is looking for more volunteers. It is not only about saving money or reducing waste, she says. 'People chat while they wait, they share cake, they meet neighbours they've never spoken to before. Sometimes I think the things we fix best aren't the toasters at all.'`,
sents:[
{label:"A", text:"Some are nervous at first, especially when electricity is involved."},
{label:"B", text:"Most of these are clothes that need nothing more than a new button or zip."},
{label:"C", text:"They have come to learn how to repair them."},
{label:"D", text:"Supporters of these laws call this the 'right to repair'."},
{label:"E", text:"Within ten minutes, a retired electrician had found the problem and shown her how to fix it."},
{label:"F", text:"Some products, she believes, seem to be designed so that they cannot be opened at all."},
{label:"G", text:"Many of the items, she noticed, needed only a small repair."}
],
answers:{1:"C", 2:"G", 3:"E", 4:"A", 5:"F", 6:"D"},
why:{
1:"C – Kontrast s předchozí větou: majitelé nepřišli koupit nové věci („not … to buy replacements“), ale naučit se je opravit. „They“ = majitelé, „them“ = rozbité věci. Za mezerou „Waiting for them“ = majitelé.",
2:"G – „she noticed“ = Martine Postma, „the items“ = věci, které se vyhazovaly („how much was being thrown away“). Za mezerou „She organised…“ je její řešení – nechat věci opravit zdarma.",
3:"E – „the problem“ a „her“ navazují na Grace s rozbitým fénem. Za mezerou Grace říká „something so simple had made it stop working“ – reaguje na to, jak rychle elektrikář závadu našel.",
4:"A – „Some“ = návštěvníci, kteří se musí na opravě podílet. Za mezerou „But most leave feeling proud“ tvoří protiklad: někteří jsou zpočátku nervózní, ALE většina odchází hrdá.",
5:"F – „she believes“ = Grace, která je frustrovaná, že třetinu věcí nejde zachránit. Za mezerou „Phones and laptops, for example, are often glued together“ je příklad výrobků, které nejdou otevřít.",
6:"D – „these laws“ = nové zákony z předchozí věty. Za mezerou „Grace hopes the idea will spread“ – „the idea“ = právo na opravu („right to repair“)."
},
extraWhy:"B je navíc: nejlákavější je mezera 41 po větě, že třetinu věcí nelze zachránit – ale věci, kterým stačí knoflík nebo zip, zachránit jde, takže by si věta odporovala. Navíc by pak nenavazovalo „Phones and laptops, for example, are often glued together“."
},
/* ------------------------------------------------------------------ */
{
id:"p6-cycling-europe", title:"Two wheels, twelve countries", topic:"cestování", intro:"You are going to read an article about a young woman who cycled across Europe.",
text:`Two years ago, Hannah Lewis was a twenty-year-old student who had never cycled further than the ten kilometres to her university. Last summer, she rode more than four thousand kilometres from the west coast of Ireland to the Black Sea, passing through twelve countries on the way. [1] When I meet her in a café in Bristol, she still seems slightly surprised by what she has done. She is small and quietly spoken, and not at all the kind of person you would expect to have crossed a continent on a bicycle.

The idea came to her during a long, grey winter of exams. 'I was sitting in the library, completely bored, looking at a map of Europe on the wall,' she says. 'I started wondering how long it would take to cross it by bike.' [2] That evening she told her flatmates she was going to do it. 'They laughed,' she says. 'To be fair, so did I.'

Preparation took almost a year. Hannah bought a second-hand touring bike and spent every weekend riding longer and longer distances, often in the rain. She also had to learn how to look after it. [3] By the time she set off, she could repair a broken chain at the side of the road in under ten minutes. 'Learning to fix things myself made me feel much more confident,' she says.

The first few weeks were the hardest. In Ireland and Wales it rained almost every day, and in northern France she rode into a strong wind for five days in a row. [4] 'I cried a lot,' she admits. 'But I never seriously thought about stopping. I'd told too many people I was doing it.'

What kept her going, more than anything, was the kindness of strangers. In Germany, a farmer whose field she had asked to camp in insisted that she sleep in his spare room instead. In Hungary, a family she met at a petrol station invited her to a wedding. [5] 'I danced until two in the morning in cycling shorts,' she laughs. 'It was one of the best nights of my life.' Not everyone was so friendly, of course, but the bad experiences were few and far between.

Her parents were less enthusiastic about the trip than her friends. Her mother, in particular, worried about her safety, especially as she would often be camping alone. They agreed that Hannah would send a message every evening with her location. [6] 'I've never heard her so angry,' Hannah says, 'or so relieved.'

When she finally reached the Black Sea, there was nobody waiting for her, and the beach was full of tourists who had no idea what she had done. She sat on the sand for an hour, eating an ice cream and watching the waves. Now back at university, Hannah is already planning her next trip, from Norway to Portugal. 'People think you need to be really fit or really brave,' she says. 'You don't. You just need to start.'`,
sents:[
{label:"A", text:"She only forgot once, and by the time she remembered, her mother was about to call the police."},
{label:"B", text:"She did it alone, carrying everything she needed on her bike."},
{label:"C", text:"She had nothing to wear except her cycling clothes, but nobody seemed to mind."},
{label:"D", text:"Until then, she had never even changed a tyre."},
{label:"E", text:"Fortunately, the second half of the route was much flatter."},
{label:"F", text:"The answer, she discovered, was about ten weeks."},
{label:"G", text:"Against a wind like that, she sometimes managed fewer than forty kilometres a day."}
],
answers:{1:"B", 2:"F", 3:"D", 4:"G", 5:"C", 6:"A"},
why:{
1:"B – „She did it“ = cesta přes 12 zemí z předchozí věty. Za mezerou „surprised by what she has done“ – sama, se vším na kole, to je výkon, který ji dodnes překvapuje.",
2:"F – „The answer“ odpovídá na otázku „how long it would take to cross it by bike“. Za mezerou „That evening she told her flatmates she was going to do it“ – rozhodnutí přichází po zjištění odpovědi.",
3:"D – „Until then“ = než se musela naučit kolo opravovat. Věta za mezerou tvoří kontrast: dřív nevyměnila ani duši, ale než vyrazila, opravila řetěz do deseti minut.",
4:"G – „a wind like that“ odkazuje na „a strong wind for five days in a row“. Za mezerou „I cried a lot“ – pomalý postup proti větru vysvětluje, proč často plakala.",
5:"C – „nothing to wear“ navazuje na pozvání na svatbu. Za mezerou „I danced … in cycling shorts“ – tanec v cyklistických kraťasech potvrzuje, že neměla nic jiného.",
6:"A – „She only forgot once“ = zapomněla poslat večerní zprávu, na které se dohodly. Za mezerou „I've never heard her so angry … or so relieved“ – „her“ = matka, která už chtěla volat policii."
},
extraWhy:"E je navíc: „the second half of the route“ by navazovalo na popis kopců v první polovině trasy, ale text kopce vůbec nezmiňuje – mluví o dešti a větru. Na místě mezery 40 by navíc nedávalo smysl pokračování „I cried a lot“."
},
/* ------------------------------------------------------------------ */
{
id:"p6-escape-rooms", title:"Locked in – and loving it", topic:"volný čas", intro:"You are going to read an article about escape rooms.",
text:`The door closes behind you, and you hear the key turn in the lock. You and your friends have sixty minutes to get out, and the clock on the wall is already counting down. Somewhere in the room there are clues – a code hidden in a painting, a key inside a book, a message written in invisible ink – and you need to find them all. [1] Welcome to the world of escape rooms, one of the fastest-growing forms of entertainment of the last ten years.

The first escape rooms appeared in Japan in the late 2000s, inspired by online games in which players had to escape from a virtual room by clicking on objects. [2] Today there are thousands of them, from small rooms above shops to huge themed experiences with special effects and actors. Some are based on films or books, others on historical events, and a few are designed to be genuinely frightening. The most popular rooms are often booked up weeks in advance.

Designing a good room is much harder than it looks, according to Marta Lisowska, who has created more than twenty rooms for a company in Kraków. The puzzles have to be difficult enough to be satisfying but not so difficult that players give up. [3] To test each new room, she invites groups of friends to try it and watches them on camera, making changes every time they get stuck for too long. Sometimes a single puzzle is rewritten five or six times before she is happy with it.

Marta has noticed that groups behave in very different ways. Some work as a team from the very beginning, sharing every discovery. Others split up, each person searching a different corner of the room on their own. [4] 'The rooms are designed so that no single person can solve them,' Marta explains. 'You need to put together information that different people have found.'

Escape rooms are not only popular with groups of friends and families. Many companies now send their employees to them as a way of improving teamwork. [5] 'Sometimes the boss takes control and nobody else is allowed to touch anything,' she laughs. 'You learn a lot about a company in sixty minutes.'

For Marta, the best moment is not when a group escapes but just before. [6] 'You can see it on their faces,' she says. 'Everyone starts shouting at the same time. It's like watching people score a goal.' She admits that, after five years in the business, she still finds it hard to play other designers' rooms without trying to work out how they were built, which her friends find very annoying.

As for the future, Marta believes that escape rooms will continue to grow, partly because they offer something that screens cannot. 'People spend all day looking at phones,' she says. 'Here they have to talk to each other, touch real objects and think together. I think that's why they come back.' She is already working on her next room, which is set in an old railway station.`,
sents:[
{label:"A", text:"Getting this balance right is the hardest part of her job."},
{label:"B", text:"Like the Japanese rooms, these were mostly designed by students."},
{label:"C", text:"If you fail, a member of staff will come and open the door for you."},
{label:"D", text:"That is when everybody suddenly understands how the final clue works."},
{label:"E", text:"Within a few years, the idea had spread to Europe and North America."},
{label:"F", text:"Marta is not sure that this always works."},
{label:"G", text:"Unless they talk to each other, these groups rarely escape in time."}
],
answers:{1:"C", 2:"E", 3:"A", 4:"G", 5:"F", 6:"D"},
why:{
1:"C – „If you fail“ navazuje na „You … have sixty minutes to get out“: co se stane, když to nestihnete. Text je stále psaný ve 2. osobě („you“), stejně jako věta C.",
2:"E – „the idea“ = únikové místnosti, které vznikly v Japonsku. Za mezerou „Today there are thousands of them“ pokračuje časová linie: Japonsko → Evropa a Amerika → dnes tisíce.",
3:"A – „this balance“ = rovnováha mezi „difficult enough to be satisfying“ a „not so difficult that players give up“; „her job“ = Marta. Za mezerou popisuje, jak tuto rovnováhu testuje.",
4:"G – „these groups“ = skupiny, které se rozdělí („Others split up“). Za mezerou Marta vysvětluje proč: místnost nevyřeší jeden člověk, musí se spojit informace od různých lidí.",
5:"F – „this“ = posílání zaměstnanců do únikových místností kvůli týmové spolupráci. Za mezerou příklad, kdy to nefunguje: šéf převezme velení a ostatní na nic nesmí sáhnout. „she laughs“ = Marta zmíněná ve větě F.",
6:"D – „That is when“ = chvíle těsně před útěkem („just before“). Za mezerou „You can see it on their faces“ – „it“ = okamžik, kdy všichni pochopí poslední indicii."
},
extraWhy:"B je navíc: láká hlavně do mezery 38, ale „these“ nemá na co odkazovat – v té chvíli text zmiňuje jen japonské místnosti, takže je nelze srovnávat „s japonskými místnostmi“. O studentech jako autorech text nikde nemluví."
},
/* ------------------------------------------------------------------ */
{
id:"p6-school-esports", title:"When gaming became a school sport", topic:"škola a technologie", intro:"You are going to read an article about a school esports team.",
text:`When Mr Daniels, a physics teacher at Brookfield Academy, suggested starting a school esports team, not everyone in the staff room was impressed. Some thought it was a joke. Several colleagues pointed out that students already spent far too much time playing video games. [1] Mr Daniels, who has been a keen gamer since his own schooldays, had an answer ready.

'Students are going to play anyway,' he told them. 'If we organise it properly, we can teach them to do it in a healthier way, and we can use it to teach other skills too.' [2] Three years later, the team has forty members, a special room with twelve computers, and a cupboard full of trophies from regional and national competitions.

Training sessions take place twice a week after school, and they are not quite what outsiders expect. Players spend only about half the time actually playing. [3] 'It's exactly what a football team does,' says sixteen-year-old captain Aisha Rahman. 'You learn more from your mistakes than from your wins.' Players also have to communicate constantly during a match, and Aisha says this has made her much more confident about speaking in class. 'Before, I never put my hand up,' she says.

There are also strict rules. Team members must keep up with their schoolwork, and anyone whose grades fall is not allowed to compete until they improve. [4] Mr Daniels says that several players who used to hand in homework late or not at all are now among the most organised students in their year, simply because they do not want to miss a match. One boy even made a revision timetable for the whole team.

Physical health is taken seriously too. Every session begins with ten minutes of stretching, and players are encouraged to take regular breaks to rest their eyes and walk around. [5] 'We thought it was a bit silly,' Aisha admits. 'But after a two-hour match your back and wrists really hurt if you don't look after them.' The team also has a rule that nobody plays for more than ninety minutes without a proper break.

Perhaps the biggest change, though, has been social. Esports has attracted students who never joined any other club, including several who were shy or had found it difficult to make friends. [6] Last year, when the team reached the national final, more than two hundred students and parents came to the school hall to watch the match on a big screen. They lost by a single point, but Mr Daniels says the noise in the hall was louder than at any football match he has ever seen.

Not everyone has been won over. Some parents still feel that the school should be getting their children away from screens, not putting them in front of more of them. Mr Daniels respects that view, but he believes the results speak for themselves. 'We're not just making better gamers,' he says. 'We're making better teammates.' He is now helping three other schools in the area to set up teams of their own.`,
sents:[
{label:"A", text:"Why, they asked, should the school encourage them to spend even more?"},
{label:"B", text:"Some of them laughed at this at first."},
{label:"C", text:"The rest is spent watching recordings of their matches and discussing what went wrong."},
{label:"D", text:"She had been against the idea from the start."},
{label:"E", text:"In the end, the head teacher agreed to a one-year trial."},
{label:"F", text:"For them, the team has become a kind of second family."},
{label:"G", text:"This has had an unexpected effect on some students."}
],
answers:{1:"A", 2:"E", 3:"C", 4:"G", 5:"B", 6:"F"},
why:{
1:"A – „they asked“ = kolegové, „even more“ navazuje na „far too much time playing video games“. Za mezerou „had an answer ready“ – pan Daniels má připravenou odpověď na jejich otázku.",
2:"E – „In the end“ uzavírá debatu z předchozích odstavců (námitky kolegů a odpověď pana Danielse). Za mezerou „Three years later“ pokračuje časová osa od zkušebního roku.",
3:"C – „The rest“ = druhá polovina tréninku („only about half the time actually playing“). Za mezerou „It's exactly what a football team does“ – i fotbalisté rozebírají záznamy zápasů.",
4:"G – „This“ = pravidlo, že kdo má horší známky, nesmí hrát. Za mezerou je popsán ten nečekaný účinek: z hráčů, kteří nosili úkoly pozdě, jsou nejorganizovanější studenti.",
5:"B – „this“ = protahování a přestávky z předchozí věty, „Some of them“ = hráči. Za mezerou Aisha přiznává „We thought it was a bit silly“ – to je ten smích.",
6:"F – „For them“ = stydliví studenti, kteří se dřív nezapojili do žádného kroužku. Věta F dokončuje myšlenku „the biggest change … has been social“."
},
extraWhy:"D je navíc: „She“ nemá v textu žádný ženský protějšek, ke kterému by mohlo odkazovat – ředitel/ka školy je zmíněn/a až ve větě E a Aisha přichází až později. V mezeře 38 by navíc chybělo rozhodnutí, na které navazuje „Three years later“."
},
/* ------------------------------------------------------------------ */
{
id:"p6-parkour", title:"The city is my playground", topic:"sport", intro:"You are going to read an article about a young man who does parkour.",
text:`To most people, a wall is something that stops you going where you want to go. To Leo Marsh, it is an invitation. The nineteen-year-old has been practising parkour – the art of moving through a city by running, jumping and climbing – since he was twelve. [1] 'Every railing, every step, every bench is something you can use,' he explains, as we walk through a shopping centre car park that he clearly sees as a giant playground.

Parkour began in the suburbs of Paris in the 1980s and 1990s, where a group of teenagers started training together on the concrete buildings around their homes. [2] Their films spread around the world in the early days of the internet, and today parkour is practised in almost every major city, by people of all ages and backgrounds. The founders called it 'the art of moving', and many people who do it still prefer that name.

Leo admits that what he does looks dangerous, and that people sometimes shout at him or even call the police. But he insists that parkour is much safer than it appears. [3] 'The videos online only show the big jumps,' he says. 'They don't show the thousands of small ones we practise first.' In seven years, his worst injury has been a sprained wrist.

Leo now teaches parkour classes at a local sports centre, mostly to children between eight and fifteen. The classes take place indoors, using soft mats and wooden boxes of different heights. [4] Many of his students are children who did not enjoy traditional team sports at school. 'There's no competition, no one sitting on the bench,' Leo says. 'You just try to be a bit better than you were last week.'

Not everyone welcomes parkour. Some building owners have put up signs banning it, and in a few cities, people have been fined for climbing on public property. Leo understands why. [5] 'That gives everyone a bad name,' he says. 'We try to follow a simple rule: leave a place exactly as you found it, and always respect the people around you.' Leo also picks up any litter he finds wherever he trains.

Some cities have taken a different approach. Instead of banning parkour, they have built special parks for it, full of walls, bars and platforms at different heights. [6] He says it is now busy every evening, not only with teenagers but also with adults and even a few grandparents. 'One woman told me she's seventy-one,' he says. 'She can't do the big jumps, but her balance is better than mine.'

For Leo, parkour has become much more than a hobby. It has taught him patience, given him confidence and introduced him to friends all over the world, some of whom he travels to train with every summer. 'When I was younger, I was always in trouble at school for not sitting still,' he says. 'Now I've found something where moving is the whole point.' He is now studying sports science at a local college.`,
sents:[
{label:"A", text:"They wanted to be able to get from one place to another as quickly and efficiently as possible."},
{label:"B", text:"Leo helped to design one of these in his home town last year."},
{label:"C", text:"Students only move outside once they have mastered the basics there."},
{label:"D", text:"Because of this, he always trains on his own."},
{label:"E", text:"In that time, he has learnt to see buildings in a completely different way."},
{label:"F", text:"Beginners spend months learning how to land and roll before they try anything high."},
{label:"G", text:"A small number of people have damaged walls or frightened passers-by."}
],
answers:{1:"E", 2:"A", 3:"F", 4:"C", 5:"G", 6:"B"},
why:{
1:"E – „In that time“ = od dvanácti let („since he was twelve“). Za mezerou „Every railing, every step, every bench is something you can use“ ukazuje, jak jinak teď vidí budovy.",
2:"A – „They“ = skupina teenagerů z pařížských předměstí. Za mezerou „Their films“ – „their“ opět odkazuje na tutéž skupinu.",
3:"F – Věta F vysvětluje, proč je parkour bezpečnější, než vypadá. Za mezerou „The videos online only show the big jumps … not the thousands of small ones we practise first“ navazuje na nácvik dopadů.",
4:"C – „there“ = uvnitř na žíněnkách a bednách („indoors, using soft mats“), „outside“ tvoří protiklad k „indoors“. Teprve po zvládnutí základů jdou žáci ven.",
5:"G – „Leo understands why“ → věta G uvádí důvod zákazů. Za mezerou „That gives everyone a bad name“ – „that“ = poškozené zdi a vyděšení chodci.",
6:"B – „one of these“ = speciální parky z předchozí věty. Za mezerou „He says it is now busy every evening“ – „it“ = park, který Leo pomáhal navrhnout."
},
extraWhy:"D je navíc: „Because of this, he always trains on his own“ odporuje textu – Leo učí skupiny dětí a díky parkouru má přátele po celém světě, se kterými jezdí trénovat. Navíc v žádné mezeře není „this“, které by bylo důvodem k trénování o samotě."
},
/* ------------------------------------------------------------------ */
{
id:"p6-exchange-italy", title:"Six months in Bologna", topic:"škola a cestování", intro:"You are going to read an article in which a student describes a school exchange in Italy.",
text:`When I arrived in Bologna last September, my Italian was limited to 'pizza', 'ciao' and 'grazie'. I had chosen to spend six months at an Italian school as part of an exchange programme, mainly because I liked the idea of living somewhere warm with amazing food. [1] That turned out to be a serious mistake.

My host family, the Romanos, met me at the airport. There were five of them: two parents, two teenage daughters and a grandmother who, it soon became clear, was really in charge. [2] For the first week, we communicated mainly through smiles, gestures and a translation app that frequently got things wrong. At dinner on my second night, I tried to say that the pasta was delicious and, according to the younger daughter, told the grandmother that she was a delicious potato.

School was even harder. Lessons were entirely in Italian, and for the first month I understood almost nothing. I sat at the back of the class, copying notes I couldn't read and feeling completely lost. [3] She told me to stop trying to understand every word and instead to listen for words I already knew, and to guess the rest. It sounds obvious, but it made a huge difference, and by the end of October I could at least follow the main idea of most lessons.

Gradually, I started to understand more. By November I could follow most conversations at dinner, and I laughed at the jokes, even if I was sometimes a few seconds late. [4] I was so worried about making mistakes that I often said nothing at all. It was Nonna, the grandmother, who finally solved this problem. Every afternoon she took me shopping at the market and refused to speak to me in anything except Italian, however long it took me to answer.

Those trips to the market became the highlight of my week. Nonna introduced me to every stallholder as 'my English granddaughter', and they all joined in her campaign to make me talk. [5] More importantly, I had stopped being afraid of getting things wrong. If I made a mistake, someone laughed, corrected me, and we carried on.

By the time I left in March, I was dreaming in Italian, and my host sisters said that I spoke with a strong Bologna accent, which they found extremely funny. Saying goodbye at the airport was much harder than I had expected. [6] She pressed a small package into my hand and told me not to open it until I was on the plane. Inside was a handwritten book of her recipes, all in Italian, of course.

I've been home for four months now, and I'm trying hard not to forget what I learnt. I talk to the Romanos on video every Sunday, and I've cooked my way through almost half of Nonna's recipes. My family say they have never eaten so well. I just tell them it's nothing compared to the real thing.`,
sents:[
{label:"A", text:"Within a few weeks, I could argue about the price of tomatoes with the best of them."},
{label:"B", text:"None of them spoke more than a few words of English."},
{label:"C", text:"Even the grandmother, who never showed her feelings, had tears in her eyes."},
{label:"D", text:"I had not thought very carefully about the language."},
{label:"E", text:"Speaking, however, was a different matter."},
{label:"F", text:"Luckily, all my teachers spoke excellent English."},
{label:"G", text:"Then one of my teachers made a suggestion that changed everything."}
],
answers:{1:"D", 2:"B", 3:"G", 4:"E", 5:"A", 6:"C"},
why:{
1:"D – Před mezerou: italsky uměla jen tři slova a vybrala si Itálii kvůli teplu a jídlu. Za mezerou „That turned out to be a serious mistake“ – „that“ = to, že o jazyku vůbec nepřemýšlela.",
2:"B – „None of them“ = pět členů rodiny („There were five of them“). Za mezerou vysvětlení důsledku: domlouvali se úsměvy, gesty a překladačem.",
3:"G – „Then“ uvádí zlom po pasáži o tom, jak byla ztracená. Za mezerou „She told me…“ – „she“ = ta učitelka z věty G a „suggestion“ = rada poslouchat známá slova.",
4:"E – „however“ staví do protikladu porozumění (rozumí konverzaci i vtipům) a mluvení. Za mezerou „so worried about making mistakes that I often said nothing“ vysvětluje, proč s mluvením byl problém.",
5:"A – „with the best of them“ = s prodavači na trhu („every stallholder“), „argue about the price of tomatoes“ navazuje na nákupy. Za mezerou „More importantly“ přidává ještě důležitější výsledek.",
6:"C – „Even the grandmother“ navazuje na těžké loučení na letišti. Za mezerou „She pressed a small package into my hand“ – „she“ = babička z věty C."
},
extraWhy:"F je navíc: odporuje textu („Lessons were entirely in Italian“, „I understood almost nothing“). Láká do mezery 39, ale tam by po ní „She told me…“ nemělo jasný podmět – „all my teachers“ je množné číslo, ne jedna učitelka."
},
/* ------------------------------------------------------------------ */
{
id:"p6-robot-team", title:"The robot that nearly didn't make it", topic:"technologie a škola", intro:"You are going to read an article about a school robotics team.",
text:`Six weeks before the national robotics championship, the team from Castleton High School had a serious problem: their robot did not work. It could move forwards and backwards perfectly well, but every time it tried to pick up a ball, it fell over. [1] 'We were starting to panic,' admits seventeen-year-old team leader Sofia Mendes. 'We'd spent months on it, and suddenly it looked as if we would have nothing to show.' Every test ended the same way, with the robot lying on its side on the classroom floor.

The competition, which is open to students aged fourteen to eighteen, requires teams to design and build a robot that can complete a series of tasks, such as collecting balls and placing them in baskets. [2] Teachers are allowed to give advice, but they cannot touch the robots, and judges check this carefully during the competition. Each school may enter only one team.

The Castleton team had eight members, each with a different job. Two were responsible for the design, three for building, two for the programming and one – Sofia – for keeping everyone organised. [3] They noticed that the robot only fell over when its arm reached a certain height, and they wondered whether it was simply too heavy at the top.

They were right. The arm was made of steel, which made it strong but also very heavy. [4] With only a month left, this was a risky decision, and the team argued about it for two days. Some members wanted to keep the steel arm and just add weight to the bottom of the robot. In the end, they voted to build a new arm.

The next three weeks were the most intense of their lives. The builders stayed at school until eight o'clock most evenings, and on one occasion the caretaker had to remind them that the building was closing. Sofia brought pizza for everyone on Fridays to keep them going. The new arm, made of aluminium, was finished just ten days before the competition. [5] There was no time to celebrate, though, because the programmers now had to change all their code for the lighter arm.

At the championship, Castleton finished fourth out of thirty-two teams. They did not win a trophy, but the judges gave them a special prize for teamwork. [6] 'Anyone can build a robot that works the first time,' she says, laughing. 'We built one that didn't, and we fixed it together.' The judges said they had been impressed by how calmly the team had explained their mistakes.

The team's teacher, Mr Owens, says the experience taught the students far more than engineering. 'They learnt how to deal with failure, how to make difficult decisions and how to work under pressure,' he says. 'Those are things you can't learn from a textbook.' Several team members are now planning to study engineering at university, and the team has already started work on next year's robot. This time, Sofia says, it will be lighter from the start.`,
sents:[
{label:"A", text:"Teams have just three months to do this, and they must do almost everything themselves."},
{label:"B", text:"Sofia says this meant more to them than any medal could have done."},
{label:"C", text:"Replacing it with a lighter material would mean starting that part again from the beginning."},
{label:"D", text:"Luckily, the new steel arm was much lighter than the old one."},
{label:"E", text:"It was the programmers who first suspected where the problem might be."},
{label:"F", text:"Nobody could work out why this kept happening."},
{label:"G", text:"To everyone's relief, the robot stayed upright the first time they tested it."}
],
answers:{1:"F", 2:"A", 3:"E", 4:"C", 5:"G", 6:"B"},
why:{
1:"F – „this kept happening“ = robot pořád padal („every time … it fell over“). Za mezerou „We were starting to panic“ – panika plyne z toho, že nikdo nevěděl proč.",
2:"A – „do this“ = navrhnout a postavit robota, „do almost everything themselves“ připravuje další větu: učitelé smějí radit, ale na roboty nesmějí sáhnout.",
3:"E – „the programmers“ navazují na výčet rolí (two for the programming), „the problem“ = padající robot. Za mezerou „They noticed…“ – „they“ = programátoři.",
4:"C – „Replacing it“ = ocelové rameno z předchozí věty. Za mezerou „this was a risky decision“ – „this“ = výměna ramene a stavba od začátku měsíc před soutěží.",
5:"G – Věta G navazuje na dokončení nového ramene („the first time they tested it“). Za mezerou „There was no time to celebrate, though“ – úleva by vedla k oslavě, ale programátoři museli upravit kód.",
6:"B – „this“ = zvláštní cena za týmovou práci, „any medal“ kontrastuje s „They did not win a trophy“. Za mezerou „she says“ = Sofia z věty B."
},
extraWhy:"D je navíc: nové rameno bylo z hliníku („made of aluminium“), ne z oceli – ocelové bylo to staré a těžké. Věta tedy odporuje textu v mezeře 40 i 41."
},
/* ------------------------------------------------------------------ */
{
id:"p6-animal-shelter", title:"Walking the dogs nobody wants", topic:"dobrovolnictví", intro:"You are going to read an article about a teenager who volunteers at an animal shelter.",
text:`Every Saturday morning, while her friends are still in bed, sixteen-year-old Chloe Barnes catches the bus to the Greenway Animal Shelter on the edge of town. She spends the next four hours walking dogs, cleaning kennels and, as she puts it, 'giving cuddles to anyone who needs them'. [1] 'Two of those were because I was ill,' she says. 'The third was my cousin's wedding, and I still feel guilty about it.'

Chloe first came to the shelter with her school, as part of a project on animal welfare. Most of her classmates enjoyed the visit, but for Chloe it was more than that. [2] Because she was only fourteen, she had to bring a parent with her for the first six months, so her dad got up early every Saturday too. 'He complained all the way there,' she laughs, 'and then he didn't want to leave.'

The shelter looks after around sixty dogs at any one time, as well as cats, rabbits and the occasional guinea pig. Most of the animals have been abandoned or given up by owners who could no longer care for them. [3] Part of the volunteers' job is simply to spend time with these animals, so that they learn to trust people again. Chloe says it can take weeks before a frightened dog will even take food from her hand.

Chloe's favourite is Bruno, a large black dog who has been at the shelter for more than a year. Black dogs, she explains, are often the last to be adopted. [4] Some think it is because black dogs look less friendly in photos, or because their faces are harder to see. 'It's so unfair,' Chloe says. 'Bruno is the gentlest dog here. He's scared of the cats.'

Volunteering has not always been easy. Chloe admits that she sometimes finds it upsetting, especially when an animal arrives in very poor condition. [5] But the good moments, she says, more than make up for the bad ones. The best is when a dog she has looked after for months finally leaves with a new family. 'You're sad to say goodbye, but you're so happy for them at the same time.' Chloe keeps a photo of every dog she has seen adopted on her bedroom wall. There are now forty-three.

The shelter's manager, Jan Kowal, says young volunteers like Chloe are extremely valuable. [6] He wishes more teenagers would get involved, and points out that volunteering can also help with university applications. Chloe, however, says that has nothing to do with it. 'I'd come even if nobody ever knew about it,' she says. 'The dogs don't care what you look like or what marks you got. They're just happy to see you.'

Next year she hopes to start studying to become a vet. And Bruno? 'If nobody has adopted him by the time I've got my own place,' she says, 'I know exactly who I'm taking home.' Her parents, she says, have already started saving for an extra-large dog bed.`,
sents:[
{label:"A", text:"Some arrive frightened, thin or badly injured."},
{label:"B", text:"They have energy, they're reliable, and the dogs love them."},
{label:"C", text:"He was adopted by a young couple just before Christmas."},
{label:"D", text:"She asked the manager on the spot whether she could come back as a volunteer."},
{label:"E", text:"On those days, she goes home and cries."},
{label:"F", text:"Nobody is quite sure why this is, but staff at shelters all over the country have noticed the same pattern."},
{label:"G", text:"She has been doing this for almost two years now, and she has missed only three Saturdays."}
],
answers:{1:"G", 2:"D", 3:"A", 4:"F", 5:"E", 6:"B"},
why:{
1:"G – „doing this“ = sobotní práce v útulku popsaná před mezerou. Za mezerou „Two of those were because I was ill“ – „those“ = tři vynechané soboty z věty G.",
2:"D – „more than that“ (víc než jen hezký výlet) → hned se zeptala, jestli může přijít jako dobrovolnice. Za mezerou „Because she was only fourteen, she had to bring a parent“ navazuje na dobrovolnictví.",
3:"A – „Some“ = zvířata z předchozí věty. Za mezerou „these animals, so that they learn to trust people again“ – „these“ = vyděšená a zraněná zvířata z věty A.",
4:"F – „why this is“ = proč jsou černí psi adoptováni jako poslední. Za mezerou „Some think it is because…“ uvádí možná vysvětlení – navazuje na „Nobody is quite sure“.",
5:"E – „On those days“ = dny, kdy přijde zvíře ve špatném stavu. Za mezerou „But the good moments … make up for the bad ones“ tvoří protiklad ke smutným dnům.",
6:"B – „They“ = mladí dobrovolníci jako Chloe; věta vysvětluje, proč jsou „extremely valuable“. Za mezerou „He wishes more teenagers would get involved“ – „he“ = manažer Jan Kowal."
},
extraWhy:"C je navíc: Bruno je v útulku pořád – podle textu tam je „more than a year“ a na konci Chloe říká, že si ho vezme, pokud ho nikdo neadoptuje. Věta C by v mezeře 40 textu odporovala a nenavazovala by na „Some think it is because black dogs…“."
},
];

/* ============================================================ PART 7 – multiple matching ============================================================ */
window.DATA.reading.p7 = [
/* ------------------------------------------------------------------ */
{
id:"p7-part-time-jobs", title:"My part-time job", topic:"práce", pick:"people", stem:"Which person",
intro:"You are going to read an article in which four teenagers talk about their part-time jobs.",
sections:[
{label:"A", title:"Jake, 17", text:`I work at a supermarket on Thursday evenings and Saturdays, mainly filling shelves and helping customers find things. I applied because my older brother worked there and said it was easy money. It isn't, actually – you're on your feet for eight hours, and the managers notice if you stand around chatting. The best thing about it is the people I work with. Most of them are students like me, and we have a laugh even on the busiest days. On my birthday they all signed a card and hid it in the freezer, which took me an hour to find. I've learnt a lot about dealing with the public, too. At first I was terrified of customers asking me questions I couldn't answer, but now I just say I'll find out, and go and ask someone. The money goes towards driving lessons. I've had twelve so far, and my instructor says I'll be ready for my test in the spring, as long as I stop braking so suddenly.`},
{label:"B", title:"Amira, 16", text:`I help two younger children with their maths homework twice a week. It started when a neighbour asked if I could help her son, who was struggling, and then his friend's mum heard about it and asked too. I didn't think of it as a job at first, but they both insisted on paying me. The hardest part is staying patient when a child has made the same mistake five times in a row. Sometimes I have to stop and take a deep breath before I say anything. I've had to find lots of different ways of explaining things, which has actually improved my own understanding – my maths grade went up this year. I like being able to choose my own hours, because I have a lot of exams coming up and I can't work every weekend. What am I saving for? Nothing in particular yet. I just like knowing that the money's there if I need it.`},
{label:"C", title:"Lukas, 18", text:`Last summer I set up my own dog-walking business. I'd always loved dogs, but we can't have one because my dad's allergic, so this seemed like the perfect solution. I made some posters, put them up in local shops, and within a month I had eight regular customers. My favourite is a huge, lazy dog called Biscuit who refuses to walk faster than me. Running your own business sounds exciting, but there's a lot of boring stuff too – keeping records, sending bills and chasing people who forget to pay. I wasn't prepared for that at all. Walking six dogs at once in the pouring rain isn't much fun either. Still, I'm outside all day, I'm fitter than I've ever been, and nobody tells me what to do. I'm hoping to earn enough by next autumn to pay for a trip to Canada before I start university.`},
{label:"D", title:"Sophie, 17", text:`I work at the cinema in town, selling tickets and popcorn and cleaning the screens after each film. I'd wanted to work there for years because I love films, and one of the benefits is that staff can watch films for free. Unfortunately, I'm usually so tired after a shift that I don't take advantage of it as often as I'd hoped. The job itself is fine, though it can get really busy at weekends, especially when a big film comes out. Last summer we had queues out of the door for three weeks in a row. What I didn't expect was how much it would help my confidence. I used to be really shy, and talking to strangers all evening has changed that. My parents say I'm a different person. Most of my wages go on clothes and concerts, which my mum thinks is a waste of money, but I disagree.`}
],
questions:[
{q:"took the job because a family member said it would be easy?", answer:"A", why:"Jake se přihlásil, protože jeho starší bratr tam pracoval a říkal, že jsou to „snadné peníze“. Ostatní práci získali jinak (Amira přes sousedku, Lukas si podnik založil sám).", evidence:"I applied because my older brother worked there and said it was easy money."},
{q:"was not expecting to be paid at first?", answer:"B", why:"Amira to zpočátku nebrala jako práci, ale obě maminky trvaly na tom, že jí zaplatí.", evidence:"I didn't think of it as a job at first, but they both insisted on paying me."},
{q:"has become much less shy as a result of the job?", answer:"D", why:"Sophie bývala velmi stydlivá, ale celovečerní mluvení s cizími lidmi to změnilo. Jake se sice bál otázek zákazníků, ale o plachosti nemluví.", evidence:"I used to be really shy, and talking to strangers all evening has changed that."},
{q:"found some of the paperwork harder to cope with than they had expected?", answer:"C", why:"Lukas nebyl vůbec připraven na „nudné věci“ – vedení záznamů, posílání faktur a upomínání neplatičů (paperwork = administrativa).", evidence:"I wasn't prepared for that at all."},
{q:"says the job has helped them do better at school?", answer:"B", why:"Vysvětlování dětem zlepšilo Amiře její vlastní porozumění – a známka z matematiky šla nahoru.", evidence:"my maths grade went up this year"},
{q:"does not use one of the advantages of the job as much as they planned?", answer:"D", why:"Zaměstnanci kina mají filmy zdarma, ale Sophie je po směně tak unavená, že toho nevyužívá tak často, jak doufala.", evidence:"I don't take advantage of it as often as I'd hoped"},
{q:"found the job more physically tiring than they had been told?", answer:"A", why:"Bratr tvrdil, že jsou to snadné peníze, „ale není to tak“ – je celých osm hodin na nohou. Lukas je díky práci fit, ale nikdo mu neříkal, že bude snadná.", evidence:"It isn't, actually – you're on your feet for eight hours"},
{q:"enjoys being their own boss?", answer:"C", why:"Lukas má vlastní firmu a oceňuje, že mu „nikdo neříká, co má dělat“. Amira si sice volí hodiny, ale nemá vlastní podnik a o šéfech nemluví.", evidence:"nobody tells me what to do"},
{q:"has learnt what to do when they do not know the answer to a question?", answer:"A", why:"Jake se dřív bál otázek, na které neznal odpověď; teď řekne, že to zjistí, a zeptá se kolegy.", evidence:"now I just say I'll find out, and go and ask someone"},
{q:"has not decided what to spend their money on?", answer:"B", why:"Amira zatím nešetří na nic konkrétního – jen ráda ví, že peníze má. Ostatní cíl mají (autoškola, Kanada, oblečení a koncerty).", evidence:"Nothing in particular yet."}
]},
/* ------------------------------------------------------------------ */
{
id:"p7-school-trips", title:"School trips to remember", topic:"škola a cestování", pick:"people", stem:"Which person",
intro:"You are going to read an article in which four students describe a school trip abroad.",
sections:[
{label:"A", title:"Ella – Berlin", text:`Our history class went to Berlin for four days in March. I'd been looking forward to it for months, but I'll admit I was worried it would be like a week of lessons in a different building. It wasn't like that at all. Standing next to what's left of the Wall made everything we'd studied suddenly feel real, in a way no textbook could. We also visited a museum about life in East Germany, where you could sit in an old car and listen to music from the time. We ate a lot of currywurst, too. The hostel was pretty basic – twelve of us in one room, and only two showers for the whole floor – but nobody really cared. The highlight for me was an evening bike tour of the city. Our teacher fell off her bike right in front of the Brandenburg Gate, and we'll never let her forget it. I'm now thinking of studying history at university, which I'd never considered before.`},
{label:"B", title:"Noah – Iceland", text:`The geography trip to Iceland was the most expensive trip our school has ever organised, and my parents had to think hard before agreeing to it. I did a paper round for six months to help pay for it. It was worth every penny. We walked on a glacier, saw hot water shooting out of the ground and swam in an outdoor pool while it was snowing. Our guide, a woman from Reykjavik, knew the answer to every question we asked. What surprised me was how much I enjoyed the long coach journeys between places. The landscape was so strange and empty that I just stared out of the window for hours, which I never usually do – normally I'd be on my phone. The only disappointment was that we didn't see the northern lights, because it was cloudy every night. Our guide said that's the most common complaint she hears.`},
{label:"C", title:"Maya – Lyon", text:`I went on a two-week exchange to Lyon and stayed with a French family. Before I went, I was convinced my French was good enough to cope. I was wrong. On the first evening everyone talked so fast at dinner that I understood about one word in ten, and I went to bed feeling quite homesick. Things got better quickly, though. My exchange partner, Camille, was really patient and kept explaining things until I understood. By the end, I was even dreaming in French. We also went to the Alps for a day, which was the first time I'd seen real mountains. The school day there was much longer than ours, which I found tiring, but lunch was amazing – a proper three-course meal every day. Camille is coming to stay with us in June, and I'm already worrying about what we'll cook for her, because my family's cooking is nothing special.`},
{label:"D", title:"Ryan – Austria", text:`Every two years our school organises a ski trip to Austria, and this year I finally went. I'd never skied before, and on the first morning I spent more time lying in the snow than standing on my skis. Some of my friends had been skiing for years and disappeared up the mountain straight away, which was a bit annoying. But the instructors were brilliant. They split us into groups by ability, so I was with other complete beginners and didn't feel stupid. By day four I could get down a red slope without falling over once. Our teacher, who skis brilliantly, filmed it on his phone and showed everyone at dinner. The evenings were great fun too – we had a quiz night and a disco in the hotel. I came home exhausted, with a sunburnt nose, and already asking my parents whether we could go skiing as a family next winter.`}
],
questions:[
{q:"had doubts beforehand about whether the trip would be enjoyable?", answer:"A", why:"Ella se bála, že to bude jako týden vyučování v jiné budově. Maya měla před cestou naopak přehnanou důvěru ve svou francouzštinu.", evidence:"I was worried it would be like a week of lessons in a different building"},
{q:"overestimated their own ability before the trip?", answer:"C", why:"Maya byla přesvědčená, že její francouzština stačí – „mýlila jsem se“. Ryan lyžovat neuměl a věděl to.", evidence:"I was convinced my French was good enough to cope. I was wrong."},
{q:"helped to pay for the trip?", answer:"B", why:"Noah půl roku roznášel noviny, aby na cestu přispěl.", evidence:"I did a paper round for six months to help pay for it."},
{q:"appreciated being with people of the same level?", answer:"D", why:"Instruktoři rozdělili žáky podle úrovně, takže Ryan byl s dalšími úplnými začátečníky a necítil se hloupě.", evidence:"so I was with other complete beginners and didn't feel stupid"},
{q:"missed home at one point?", answer:"C", why:"První večer Maya rozuměla jen každému desátému slovu a šla spát s pocitem stesku po domově (homesick).", evidence:"I went to bed feeling quite homesick"},
{q:"says the accommodation was uncomfortable but it did not matter?", answer:"A", why:"Hostel byl hodně skromný (12 lidí v pokoji, dvě sprchy na patro), ale „nikomu to nevadilo“. Ryan bydlel v hotelu a nestěžuje si.", evidence:"but nobody really cared"},
{q:"enjoyed doing something they do not usually do?", answer:"B", why:"Noah hodiny jen koukal z okna autobusu, „což normálně nikdy nedělám“ – jinak by byl na mobilu.", evidence:"which I never usually do"},
{q:"was slightly irritated by some of their friends?", answer:"D", why:"Kamarádi, kteří lyžovali roky, hned zmizeli na sjezdovku – „což mě trochu štvalo“.", evidence:"which was a bit annoying"},
{q:"did not see something they had hoped to see?", answer:"B", why:"Jediné zklamání: polární záři neviděli, protože bylo každou noc zataženo.", evidence:"we didn't see the northern lights"},
{q:"feels anxious about an event in the near future?", answer:"C", why:"Camille přijede v červnu a Maya se už teď bojí, co jí uvaří. Ryan se na lyžování s rodinou těší, neobává se.", evidence:"I'm already worrying about what we'll cook for her"}
]},
/* ------------------------------------------------------------------ */
{
id:"p7-young-athletes", title:"How I got into my sport", topic:"sport", pick:"people", stem:"Which person",
intro:"You are going to read an article in which four young athletes describe how they started their sport.",
sections:[
{label:"A", title:"Daniel, swimming", text:`I started swimming when I was seven because I had asthma, and our doctor said it would help my breathing. I hated it at first – the water was cold and I was always the slowest in the group. But I improved quickly, and by the time I was eleven I was competing for my county. My best event is the two hundred metres backstroke, and last year I broke the county record for my age group. Training is tough. I'm in the pool at half past five four mornings a week, which means my parents have to get up at five to drive me there. When I was thirteen I stopped completely for almost a year. I was tired of it and wanted to spend time with my friends instead. But I missed it more than I expected, and when I went back I enjoyed it in a way I never had before, because it was my own choice.`},
{label:"B", title:"Zara, football", text:`I learnt to play football in the street with the boys who lived on our road. When I was nine, I joined the local club, and for two years I was the only girl in the team. Some of the boys hardly ever passed the ball to me, even when I was in a better position, and I used to go home really upset. My coach noticed and had a word with them, and things slowly got better. Now I play for a girls' academy linked to a professional club, and the standard is incredibly high. We train four evenings a week and play matches all over the country at weekends. Women's football has changed so much in the last few years – there are matches on TV and real role models. I already know what I want to do when I stop playing: I want to become a coach and help other girls get started.`},
{label:"C", title:"Tom, wheelchair basketball", text:`When I was twelve, I was in a car accident and lost the use of my legs. I'd always been sporty, and lying in hospital I was sure that part of my life was finished. Then a coach from a wheelchair basketball club came to visit the ward and invited me to a training session. I wasn't keen, but my mum persuaded me to go. I couldn't believe how fast the game was – the players crashed into each other and spun their chairs around at amazing speeds. I was hooked immediately. Within a month I was training three times a week and had my own sports wheelchair, which is much lighter than an ordinary one. Four years later, I play for the national junior team, which has taken me to tournaments in Spain, Germany and Canada. People sometimes feel sorry for me when they see my wheelchair, but honestly, I think I have a pretty great life.`},
{label:"D", title:"Mei, table tennis", text:`My grandfather taught me to play table tennis on an old table in his garage when I was six. He had played for his university in China and was very strict about technique, which drove me crazy at the time but has helped me enormously since. I now compete nationally, and I train about fifteen hours a week. What really annoys me is when people call it 'ping pong' and act as if it's a game you play on holiday. At the top level, the ball travels at over a hundred kilometres an hour, and you have to make decisions in a fraction of a second. It's as much a mental game as a physical one. Fitting in schoolwork isn't easy. I plan every week in detail on a big chart on my bedroom wall, and I do homework on the train to competitions.`}
],
questions:[
{q:"took up their sport for health reasons?", answer:"A", why:"Daniel začal plavat kvůli astmatu – lékař řekl, že mu to pomůže s dýcháním. Tom začal s basketbalem po úrazu, ale ne ze zdravotních důvodů.", evidence:"because I had asthma, and our doctor said it would help my breathing"},
{q:"was not always included by teammates at first?", answer:"B", why:"Zara byla dva roky jediná holka v týmu a někteří kluci jí skoro nepřihrávali, i když byla v lepší pozici.", evidence:"Some of the boys hardly ever passed the ball to me"},
{q:"believed they would never do sport again?", answer:"C", why:"Tom po nehodě ležel v nemocnici a byl si jistý, že sportovní část jeho života skončila.", evidence:"I was sure that part of my life was finished"},
{q:"gets irritated when people do not take their sport seriously?", answer:"D", why:"Mei štve, když lidé stolnímu tenisu říkají „ping pong“ a mají ho za hru na dovolenou.", evidence:"What really annoys me is when people call it 'ping pong'"},
{q:"gave up their sport for a period?", answer:"A", why:"Ve třinácti Daniel skoro na rok úplně přestal, protože ho to unavovalo. Pak se vrátil – už z vlastní vůle.", evidence:"When I was thirteen I stopped completely for almost a year."},
{q:"was amazed by the speed of the sport the first time they saw it?", answer:"C", why:"Tom nemohl uvěřit, jak rychlá hra je. Mei o rychlosti míčku mluví také, ale jako o faktu na vrcholové úrovni, ne jako o prvním dojmu.", evidence:"I couldn't believe how fast the game was"},
{q:"was taught by an older relative?", answer:"D", why:"Stolní tenis ji naučil dědeček v garáži. Zara se naučila fotbal s kluky z ulice, ne s příbuznými.", evidence:"My grandfather taught me to play table tennis"},
{q:"has been able to travel abroad because of their sport?", answer:"C", why:"Národní juniorský tým vzal Toma na turnaje do Španělska, Německa a Kanady.", evidence:"which has taken me to tournaments in Spain, Germany and Canada"},
{q:"relies on careful planning to manage their studies?", answer:"D", why:"Mei si každý týden podrobně plánuje na velkém plánu na zdi a úkoly dělá ve vlaku.", evidence:"I plan every week in detail on a big chart on my bedroom wall"},
{q:"already knows what job they would like to do in the future?", answer:"B", why:"Zara chce po skončení kariéry trénovat a pomáhat dalším holkám začít.", evidence:"I want to become a coach and help other girls get started"}
]},
/* ------------------------------------------------------------------ */
{
id:"p7-online-skills", title:"I learnt it online", topic:"technologie a koníčky", pick:"people", stem:"Which person",
intro:"You are going to read an article in which four young people describe a skill they learnt using the internet.",
sections:[
{label:"A", title:"Ollie – guitar", text:`I taught myself the guitar from free online videos when I was thirteen. There are thousands of them, and you can learn almost any song you like, which is great for motivation. I started with simple songs that only used three or four chords, and practised for at least an hour every evening. The problem is that nobody is watching you. After about two years I realised I was holding my hand in a completely wrong position, which is why I could never play fast. In the end I paid for six lessons with a real teacher to sort it out. It was annoying having to relearn things I thought I already knew, but it made a huge difference. Now I play in a band with three friends from school, and we perform in a café in town once a month. The audience is mostly our parents, but it still counts.`},
{label:"B", title:"Hana – sign language", text:`My cousin Josh was born deaf, and for years I could only communicate with him by writing things down or waving my arms around. When I was fifteen, I found an online course in British Sign Language and decided to try it. The course had videos, quizzes and live sessions with a deaf teacher once a week, which were the most useful part because you could ask questions. There was also a group chat where students could practise with each other, although I was usually too nervous to join in. I practised with Josh every weekend, and he laughed at my mistakes a lot, but in a nice way. Last summer I passed the first official exam, and I got a certificate, which I'm really proud of. The best thing, though, is that Josh and I can finally have proper conversations, about anything we like. He says my signing still has an English accent, whatever that means.`},
{label:"C", title:"Felix – cooking", text:`Both my parents work late, so when I was fourteen I started making dinner a couple of times a week. I knew nothing about cooking, so I watched recipe videos on my phone and copied exactly what they did. The first few attempts were not great. Once I burnt some onions so badly that the smoke alarm went off and our neighbour came round to check that the house wasn't on fire. Things improved quickly after that, mainly because I started reading the whole recipe before I began, rather than just following it step by step. Now I'm in charge of the family dinner every Tuesday and Thursday. I like trying dishes from different countries – this month it's Korean food. Next I'd like to try baking bread, which everyone says is much harder than it looks. My little brother complains about everything, but he always finishes his plate.`},
{label:"D", title:"Ines – coding", text:`I started learning to code on a free website when I was sixteen, mainly out of curiosity. I'd always wondered how websites and apps actually work, and the lessons were short enough to do one every evening after school. My first big project was a website for my mum's bakery, so that customers could order cakes online. It took me four months, and there were times when I almost gave up – every time I fixed one error, two more appeared. What saved me was an online forum where people answer each other's questions. I'd post a problem late at night and wake up to three helpful answers from complete strangers in different countries. The website has been running for a year now, and online orders have doubled the bakery's sales. This summer I've been offered a two-week work placement at a software company, which I'm really excited about. Mum has already asked me to build an app for the bakery next.`}
],
questions:[
{q:"wanted to be able to communicate better with a relative?", answer:"B", why:"Hana se učila znakový jazyk kvůli neslyšícímu bratranci Joshovi, se kterým se dřív domlouvala jen psaním.", evidence:"for years I could only communicate with him by writing things down or waving my arms around"},
{q:"caused a small emergency at home while learning?", answer:"C", why:"Felix spálil cibuli tak, že spustil požární hlásič a soused přišel zkontrolovat, jestli nehoří.", evidence:"the smoke alarm went off"},
{q:"eventually paid for some face-to-face lessons?", answer:"A", why:"Ollie si nakonec zaplatil šest lekcí se skutečným učitelem, aby si opravil držení ruky.", evidence:"In the end I paid for six lessons with a real teacher to sort it out."},
{q:"was helped by people they had never met?", answer:"D", why:"Ines pomohlo online fórum – ráno měla tři odpovědi od úplně cizích lidí z různých zemí. Hana měla učitelku na živých hodinách, ale ta byla součástí kurzu.", evidence:"wake up to three helpful answers from complete strangers"},
{q:"has taken on a regular responsibility at home?", answer:"C", why:"Felix má teď každé úterý a čtvrtek na starosti rodinnou večeři.", evidence:"Now I'm in charge of the family dinner every Tuesday and Thursday."},
{q:"had to correct a bad habit they had developed?", answer:"A", why:"Ollie po dvou letech zjistil, že drží ruku úplně špatně – a musel se učit znovu. Nikdo ho při samostudiu nekontroloval.", evidence:"I was holding my hand in a completely wrong position"},
{q:"used their new skill to help a family business?", answer:"D", why:"Ines udělala web pro maminčinu pekárnu a online objednávky zdvojnásobily tržby.", evidence:"My first big project was a website for my mum's bakery"},
{q:"has an official document that proves their level?", answer:"B", why:"Hana loni v létě složila první oficiální zkoušku a získala certifikát.", evidence:"I passed the first official exam, and I got a certificate"},
{q:"performs in front of an audience?", answer:"A", why:"Ollie hraje s kapelou jednou měsíčně v kavárně (i když publikum tvoří hlavně rodiče).", evidence:"we perform in a café in town once a month"},
{q:"nearly stopped because problems kept appearing?", answer:"D", why:"Ines to málem vzdala – kdykoli opravila jednu chybu, objevily se dvě další. Felix měl nezdary, ale o vzdávání nemluví.", evidence:"there were times when I almost gave up"}
]},
/* ------------------------------------------------------------------ */
{
id:"p7-volunteers", title:"Giving my time", topic:"dobrovolnictví", pick:"people", stem:"Which person",
intro:"You are going to read an article in which four teenagers talk about their volunteer work.",
sections:[
{label:"A", title:"Ben – football coach", text:`Every Saturday morning I help coach the under-eights at my old football club. I only started because my friend Callum was already doing it and needed someone to help, and I thought I'd do it for a few weeks. That was two years ago. Coaching small children is completely different from playing. They have no interest in tactics; they just all run after the ball at the same time, like a swarm of bees. I've had to learn to keep things simple and make everything into a game. We do a lot of races and relay competitions, and at the end of every session they get a sticker if they've tried hard. The parents can be more difficult than the children – some of them shout at the referee as if it's a World Cup final. What I love is seeing a shy kid score their first goal. The look on their face is the best thing in the world. Callum and I are now doing a coaching course together, so that we can work with older age groups.`},
{label:"B", title:"Lily – care home", text:`I visit a care home near my school every Wednesday afternoon and read to the residents, or just chat with them. My grandmother lived there before she died, and I wanted to give something back to the staff who had looked after her so well. Some of the residents have amazing stories – one man was a jazz musician in the 1960s and played all over Europe. He still sings sometimes, and the other residents join in, even the ones who hardly ever speak. The difficult part is that people sometimes get ill, and occasionally someone I've got to know dies. The first time that happened, I wasn't sure I could carry on. The manager sat with me and talked it through, which really helped. I feel I've become a better listener, and, according to my mum, I'm much more patient with my own family now.`},
{label:"C", title:"Arjun – conservation", text:`Once a month I spend a weekend with a conservation group in a national park, planting trees, repairing footpaths and clearing plants that shouldn't be there. We sleep in an old farmhouse with no heating, which is fine in summer but freezing in January. It's hard physical work, and at the end of the day I'm usually covered in mud from head to foot. Last spring our group planted over two thousand trees in a single weekend, which felt like a real achievement. I'd never really done anything outdoors before – I was more of a computer games person – and I've learnt to use tools I didn't even know existed. I can now build a stone wall without any cement, which is surprisingly satisfying. The experience has also made me think about my future. I'd always assumed I would study IT, but now I'm seriously considering environmental management instead.`},
{label:"D", title:"Rosa – charity shop", text:`I work in a charity shop on Saturday afternoons, sorting donations, pricing things and serving customers. People donate the strangest things – last month someone brought in a stuffed crocodile, and it sold within an hour. We also get a lot of books and old records, which I sort into sections so that customers can find them more easily. I started volunteering because I wanted some work experience to put on my university application, and I'll admit that was my main reason at first. But I've come to really enjoy it. The other volunteers are mostly retired women, and they've become good friends, even though they're fifty years older than me. They tease me about my phone constantly. I've also become much more aware of how much we all throw away. These days I buy almost all my clothes second-hand, and I hardly ever go to normal shops.`}
],
questions:[
{q:"started volunteering because a friend asked for help?", answer:"A", why:"Ben začal jen proto, že kamarád Callum už trénoval a potřeboval pomocníka.", evidence:"my friend Callum was already doing it and needed someone to help"},
{q:"wanted to thank people for the way they had treated a relative?", answer:"B", why:"Lily chtěla něco vrátit personálu, který se tak dobře staral o její babičku.", evidence:"I wanted to give something back to the staff who had looked after her so well"},
{q:"admits that their original reason for volunteering was a practical one?", answer:"D", why:"Rosa přiznává, že zpočátku chtěla hlavně pracovní zkušenost do přihlášky na univerzitu.", evidence:"I wanted some work experience to put on my university application"},
{q:"finds some adults harder to deal with than the people they help?", answer:"A", why:"Podle Bena jsou rodiče někdy horší než děti – křičí na rozhodčího jako na finále mistrovství světa.", evidence:"The parents can be more difficult than the children"},
{q:"was supported through an upsetting experience?", answer:"B", why:"Když poprvé zemřel někdo, koho Lily znala, nevěděla, jestli vydrží; manažerka s ní vše probrala a pomohlo to.", evidence:"The manager sat with me and talked it through, which really helped."},
{q:"mentions uncomfortable living conditions?", answer:"C", why:"Arjun spí ve starém statku bez topení, kde je v lednu mrazivá zima.", evidence:"We sleep in an old farmhouse with no heating"},
{q:"has changed their shopping habits?", answer:"D", why:"Rosa si teď kupuje skoro všechno oblečení z druhé ruky a do běžných obchodů skoro nechodí.", evidence:"These days I buy almost all my clothes second-hand"},
{q:"may change their plans for further study?", answer:"C", why:"Arjun vždy počítal se studiem IT, ale teď vážně uvažuje o environmentálním managementu.", evidence:"now I'm seriously considering environmental management instead"},
{q:"has become friends with people much older than them?", answer:"D", why:"Ostatní dobrovolnice jsou většinou důchodkyně o 50 let starší – a staly se z nich dobré kamarádky. Lily se se seniory baví, ale o přátelství nemluví.", evidence:"they've become good friends, even though they're fifty years older than me"},
{q:"says the experience has improved their relationships at home?", answer:"B", why:"Podle maminky je Lily teď mnohem trpělivější se svou rodinou.", evidence:"I'm much more patient with my own family now"}
]},
/* ------------------------------------------------------------------ */
{
id:"p7-first-year-uni", title:"My first year away from home", topic:"studium a samostatnost", pick:"people", stem:"Which person",
intro:"You are going to read an article in which four students talk about their first year at university.",
sections:[
{label:"A", title:"Freya", text:`Nobody warned me how expensive food is. In my first month I spent nearly all my money in the first two weeks, mostly on takeaways and coffees, and had to live on pasta and toast until my next payment came. My mum laughed when I told her, which didn't help. Now I plan all my meals on Sunday and cook big pots of soup or curry that last several days. I've actually become quite a good cook, which nobody at home believes – my brother still thinks I live on crisps. The freedom is the best part of university life. Nobody asks where you're going or what time you'll be back. The downside is that there's also nobody to wake you up, and I missed two morning lectures in my first term because I slept through my alarm. Now I set three. I've also discovered that the library is the only place where I can concentrate properly.`},
{label:"B", title:"Sam", text:`I'd expected to love every minute of university, so it was a shock when I felt really lonely in the first few weeks. Everyone else seemed to be making friends instantly, and I was spending my evenings alone in my room, calling my parents. I almost went home in October, and I even looked at train times. What changed things was joining the climbing club. I'd only ever been climbing once, on a school trip, but the club welcomed complete beginners and organised trips every weekend. Spending hours in a minibus with people is a great way to get to know them. We've been to Wales, Scotland and the Peak District this year. Now some of my closest friends are people I met there, and I'm on the club committee. My advice to anyone starting university is to join something, anything, in the first week – even if you're not sure you'll like it.`},
{label:"C", title:"Anika", text:`I share a house with five other students, and living together has been the biggest challenge of the year. We get on well most of the time, but we have very different ideas about cleanliness. One of my housemates once left a frying pan in the sink for three weeks. In the end we made a cleaning rota and stuck it on the fridge, and things improved, although it took several rather tense house meetings before everyone agreed to it. I've learnt a lot about compromise. We even have a house dinner every Sunday now, and everyone takes turns to cook. At home, my parents did everything for me – I'd never even used a washing machine before I came here. The first time I tried, I turned all my white T-shirts pink. Now I'm the one who explains to everyone else in the house how it works, which they find very funny.`},
{label:"D", title:"Jonas", text:`I came from Germany to study engineering here, so everything was new at once – the language, the food, the way lectures are taught. My English was good on paper, but understanding people in the pub or the supermarket was a different matter, especially with the local accent. I spent a lot of the first month smiling and nodding. Lectures were much easier, because lecturers speak more slowly and clearly, and you can always check the slides afterwards. What I miss most is proper bread – I'm not joking, it's a real problem. My parents sent me a parcel of it from Hamburg last month, and I made it last for two weeks. On the other hand, I've been amazed at how friendly people are here. Strangers start conversations with you at bus stops, which would never happen at home. I'm enjoying it so much that I'm already planning to stay for a master's degree after I graduate.`}
],
questions:[
{q:"ran out of money because of poor planning?", answer:"A", why:"Freya utratila skoro všechny peníze za první dva týdny (jídlo s sebou, kafe) a pak žila na těstovinách a toastech.", evidence:"In my first month I spent nearly all my money in the first two weeks"},
{q:"seriously thought about leaving university?", answer:"B", why:"Sam se v říjnu málem vrátil domů a dokonce už hledal vlaky.", evidence:"I almost went home in October, and I even looked at train times."},
{q:"had to reach an agreement with other people to solve a problem?", answer:"C", why:"Anika a spolubydlící po několika napjatých schůzkách odsouhlasili rozpis úklidu na lednici.", evidence:"it took several rather tense house meetings before everyone agreed to it"},
{q:"found everyday conversations harder than formal teaching?", answer:"D", why:"Jonas rozuměl přednáškám, ale lidem v hospodě a v obchodě ne – hlavně kvůli místnímu přízvuku.", evidence:"Lectures were much easier, because lecturers speak more slowly and clearly"},
{q:"made a mistake when doing a household task for the first time?", answer:"C", why:"Anika poprvé prala v pračce a obarvila všechna bílá trička narůžovo.", evidence:"The first time I tried, I turned all my white T-shirts pink."},
{q:"gives advice to people who are about to start university?", answer:"B", why:"Sam radí přihlásit se v prvním týdnu do jakéhokoli klubu, i když si člověk není jistý.", evidence:"My advice to anyone starting university is to join something, anything, in the first week"},
{q:"has developed a skill that their family does not believe in?", answer:"A", why:"Freya z ní je docela dobrá kuchařka, „čemuž doma nikdo nevěří“ – bratr si myslí, že žije na chipsech.", evidence:"which nobody at home believes"},
{q:"has been impressed by the behaviour of local people?", answer:"D", why:"Jonase ohromilo, jak jsou lidé přátelští – cizí lidé se dávají do řeči na zastávkách.", evidence:"I've been amazed at how friendly people are here"},
{q:"missed some classes?", answer:"A", why:"Freya v prvním semestru zaspala dvě ranní přednášky.", evidence:"I missed two morning lectures in my first term because I slept through my alarm"},
{q:"now helps others with something they once could not do?", answer:"C", why:"Anika dřív pračku nikdy nepoužila, teď vysvětluje ostatním v domě, jak funguje.", evidence:"Now I'm the one who explains to everyone else in the house how it works"}
]},
/* ------------------------------------------------------------------ */
{
id:"p7-young-musicians", title:"Living for music", topic:"hudba", pick:"people", stem:"Which person",
intro:"You are going to read an article in which four young musicians talk about what music means to them.",
sections:[
{label:"A", title:"Kai, drummer", text:`I've played the drums since I was nine, which my neighbours have never forgiven me for. Our band, The Late Buses, formed at school three years ago, and we now play in pubs and at local festivals most weekends in the summer. We play our own songs as well as covers, and the crowd usually knows the words to at least one of ours. Being in a band is like being in a family – you argue all the time, but you'd do anything for each other. The hardest thing is finding time to rehearse when four people all have exams, part-time jobs and girlfriends or boyfriends. We've had to cancel more rehearsals than I can count, usually at the last minute. Last summer we recorded our first songs in a proper studio. It cost us all our savings, but hearing ourselves sound professional for the first time was unforgettable, and we'd do it again tomorrow.`},
{label:"B", title:"Elena, violinist", text:`I play first violin in the county youth orchestra, which rehearses every Saturday and performs four concerts a year. Last year we played in a cathedral, and the sound was so beautiful that some of us were almost in tears. Classical music isn't very fashionable among people my age, and for years I kept quiet about it at school because I was afraid of being laughed at. Then our music teacher made me play in assembly, and afterwards several people came up to say how much they'd liked it. Practising takes up at least two hours a day, and there are days when I'd rather do anything else. But playing with eighty other musicians, all concentrating on the same thing, gives me a feeling I can't really describe. I'm applying to music college next year, although my parents would prefer me to study something they call 'safer', like law or medicine.`},
{label:"C", title:"Zoe, singer-songwriter", text:`I started posting videos of my songs online when I was fifteen, just for fun. I'd only had a few guitar lessons, so I kept the songs very simple. One of them, which I wrote about missing my best friend after she moved to Australia, was shared thousands of times, and suddenly I had followers all over the world. It was exciting but also scary. Not all the comments were kind, and at first I took the negative ones very personally. Now I simply don't read them, and I'm much happier. I write all my own songs, usually late at night in my bedroom, and I record them on my phone because I can't afford proper equipment. People often ask if I want to be famous. Honestly, I'm not sure – it looks quite stressful. I just want people to feel something when they listen. My next goal is to play a few songs live at a local open-mic night.`},
{label:"D", title:"Ade, DJ", text:`I got into DJing through my uncle, who used to play at clubs in the nineties and still has a huge collection of records. He taught me how to mix two songs together so that you can't hear where one ends and the next begins. It's much harder than it looks. I practised every evening for about six months before I was good enough to play in front of anyone. Now I play at birthday parties and school events, and I've started getting paid for it, which is great, because the equipment I need is very expensive. The best moment is when you play exactly the right song and the whole room starts dancing. The worst was when my laptop crashed in the middle of a wedding. I had to play music from my phone for twenty minutes while I fixed it, and I've never been so embarrassed in my life.`}
],
questions:[
{q:"used to hide their musical interest from people of their own age?", answer:"B", why:"Elena roky o klasické hudbě ve škole mlčela, protože se bála posměchu.", evidence:"for years I kept quiet about it at school because I was afraid of being laughed at"},
{q:"learnt their skills from a relative?", answer:"D", why:"Ade se k DJingu dostal přes strýce, který ho naučil míchat písně.", evidence:"I got into DJing through my uncle"},
{q:"finds it hard to organise regular practice?", answer:"A", why:"Kai říká, že nejtěžší je najít čas na zkoušky, když všichni čtyři mají zkoušky ve škole, brigády a vztahy.", evidence:"The hardest thing is finding time to rehearse"},
{q:"deals with criticism by avoiding it?", answer:"C", why:"Zoe si negativní komentáře zpočátku brala osobně, teď je prostě nečte.", evidence:"Now I simply don't read them"},
{q:"spent a lot of money on something they do not regret?", answer:"A", why:"Nahrávání ve studiu stálo kapelu všechny úspory, ale udělali by to znovu. Ade zmiňuje drahé vybavení, ale nic nelituje ani neutratil úspory.", evidence:"It cost us all our savings"},
{q:"had a technical problem during a performance?", answer:"D", why:"Uprostřed svatby Ademu spadl notebook a dvacet minut hrál hudbu z telefonu.", evidence:"my laptop crashed in the middle of a wedding"},
{q:"is unsure whether they would like to be successful?", answer:"C", why:"Na otázku, jestli chce být slavná, Zoe říká, že si není jistá – vypadá to stresující.", evidence:"Honestly, I'm not sure – it looks quite stressful."},
{q:"disagrees with their parents about their future?", answer:"B", why:"Elena se hlásí na hudební konzervatoř, ale rodiče by chtěli „bezpečnější“ obor jako práva nebo medicínu.", evidence:"my parents would prefer me to study something they call 'safer'"},
{q:"earns money which helps them buy what they need for their music?", answer:"D", why:"Ade je za hraní placený, „což je skvělé, protože vybavení je velmi drahé“. Zoe si vybavení dovolit nemůže.", evidence:"because the equipment I need is very expensive"},
{q:"mentions a song based on their own experience?", answer:"C", why:"Zoe napsala píseň o tom, jak jí chybí nejlepší kamarádka, která se odstěhovala do Austrálie.", evidence:"which I wrote about missing my best friend after she moved to Australia"}
]},
/* ------------------------------------------------------------------ */
{
id:"p7-unusual-holidays", title:"Not your usual holiday", topic:"cestování", pick:"people", stem:"Which person",
intro:"You are going to read an article in which four young people describe an unusual holiday.",
sections:[
{label:"A", title:"Oscar – by train around Europe", text:`Last summer, three friends and I bought rail passes and travelled around Europe by train for three weeks. We visited eleven cities, from Amsterdam to Budapest. We stayed in cheap hostels and lived mainly on bread, cheese and fruit from supermarkets. Planning was half the fun – we spent months arguing about routes in a group chat. The reality was a bit different from our plans. Trains were late, we missed connections, and once we had to sleep on the floor of a station in northern Italy because there was no train until the morning. Strangely, that's now our favourite memory, and we laugh about it every time we meet. Travelling together for three weeks also tests your friendship. By the end, two of us weren't speaking to each other after a stupid argument about money. We're friends again now, but next time we've agreed to spend a few days apart in the middle.`},
{label:"B", title:"Isla – on a farm in Portugal", text:`Instead of a normal holiday, I spent a month volunteering on an organic farm in Portugal. You work five hours a day in exchange for food and somewhere to sleep, so apart from the flight it costs almost nothing. The work was harder than I'd imagined – picking fruit in thirty-degree heat is exhausting – but the afternoons were free, and the farm was only twenty minutes from a beautiful beach. There were four other volunteers, from Germany, Canada and Japan, and we became really close. The family who owned it spoke very little English, so I picked up quite a lot of Portuguese without really trying. What I loved most was sitting down every evening to eat food we had grown ourselves. My only regret is that I didn't stay longer. The family has invited me back next summer, and I've already said yes and started saving for the flight.`},
{label:"C", title:"Will – a house swap in Canada", text:`My family did a house swap with a family from Canada last summer. They lived in our house in Manchester for three weeks while we lived in theirs, next to a lake in Ontario. My mum found them on a website. I was against the idea at first – I didn't like the thought of strangers sleeping in my bed and looking through my things. But it was amazing. Their house came with a canoe, bikes and a very friendly dog, and their neighbours invited us to barbecues almost every night. We went swimming in the lake every morning, even when it was cold. It was like having instant friends. When we got home, the Canadian family had left us a thank-you card and an enormous bottle of maple syrup. We're still in touch, and their son, who's my age, is coming to stay with us next year.`},
{label:"D", title:"Nadia – canoeing in Sweden", text:`My dad and I spent a week canoeing through a lake district in Sweden, camping on a different island every night. There was no phone signal for most of the trip, which I was really worried about beforehand, but in the end I didn't miss it at all. We had to carry everything in the canoe, including all our food, so we planned every meal carefully. Dad cooked on a tiny gas stove, and everything tasted amazing after a day of paddling. The silence was incredible – some evenings the only sound was the birds. One night we even saw a moose standing in the water near our tent. It wasn't all peaceful, though. On the third day a storm came in and we had to wait for six hours on a tiny island before it was safe to paddle again. Dad and I don't usually spend much time together, because he works long hours, so it was really special to have him to myself for a whole week.`}
],
questions:[
{q:"fell out with someone they were travelling with?", answer:"A", why:"Dva z Oscarovy party spolu na konci cesty kvůli hloupé hádce o peníze nemluvili.", evidence:"two of us weren't speaking to each other after a stupid argument about money"},
{q:"did not like the holiday idea when they first heard it?", answer:"C", why:"Will byl zpočátku proti výměně domů – nelíbilo se mu, že by mu cizí lidé spali v posteli.", evidence:"I was against the idea at first"},
{q:"had to wait for the weather to improve?", answer:"D", why:"Třetí den přišla bouřka a Nadia s tátou čekali šest hodin na ostrůvku.", evidence:"we had to wait for six hours on a tiny island before it was safe to paddle again"},
{q:"spent very little money on the holiday?", answer:"B", why:"Isla pracovala za jídlo a ubytování, takže kromě letenky to nestálo skoro nic.", evidence:"so apart from the flight it costs almost nothing"},
{q:"learnt some of the local language?", answer:"B", why:"Rodina na farmě skoro nemluvila anglicky, takže Isla pochytila dost portugalštiny.", evidence:"I picked up quite a lot of Portuguese without really trying"},
{q:"now remembers a difficult experience with pleasure?", answer:"A", why:"Noc na podlaze nádraží v Itálii je teď jejich nejoblíbenější vzpomínkou. Bouřka u Nadii takto popsána není.", evidence:"Strangely, that's now our favourite memory"},
{q:"received a present at the end of the holiday?", answer:"C", why:"Kanadská rodina Willovým nechala děkovnou kartu a obrovskou láhev javorového sirupu.", evidence:"the Canadian family had left us a thank-you card and an enormous bottle of maple syrup"},
{q:"was surprised not to miss their phone?", answer:"D", why:"Nadia se předem bála, že nebude signál, ale nakonec jí telefon vůbec nechyběl.", evidence:"in the end I didn't miss it at all"},
{q:"is going to return to the same place?", answer:"B", why:"Rodina Islu pozvala znovu a ona už souhlasila. U Willa naopak přijede kanadský syn k nim.", evidence:"The family has invited me back next summer, and I've already said yes"},
{q:"valued the chance to spend time with a parent?", answer:"D", why:"Táta hodně pracuje, takže pro Nadiu bylo výjimečné mít ho celý týden jen pro sebe. Will cestoval s rodinou, ale o tom nemluví.", evidence:"it was really special to have him to myself for a whole week"}
]},
/* ------------------------------------------------------------------ */
{
id:"p7-teen-business", title:"Young and in business", topic:"podnikání", pick:"people", stem:"Which person",
intro:"You are going to read an article in which four teenagers describe the small businesses they run.",
sections:[
{label:"A", title:"Mia – handmade jewellery", text:`I started making jewellery from beads when I was fourteen, mostly as presents for friends. When people began asking where they could buy my earrings, I opened a small online shop. I now sell about thirty pieces a month, and last month I got my first order from Japan, which was very exciting. I had to look up how much it would cost to post. The hardest thing is competing with big companies that sell mass-produced jewellery for a fraction of my price. I can't make things that cheaply, because each pair of earrings takes me about an hour. So I focus on what they can't offer: everything I make is unique. Customers often send me photos of themselves wearing my earrings, which I love. My mum helps me take photos for the website, and she's my biggest fan, although she's also my harshest critic. I'm now saving for a better camera so that the photos look more professional.`},
{label:"B", title:"Reuben – bike repairs", text:`I've always been good at fixing things. When I was fifteen, I repaired my own bike after a crash, and then a neighbour asked me to look at hers. Within a few months, people from all over the area were bringing me their bikes. I've never advertised – people just tell their friends. Most of the repairs are simple things like punctures and brakes, but sometimes I get a really old bike that needs a lot of work. I work in my dad's garage, and the deal is that I keep it tidy and leave space for his car, which isn't always easy when there are six bikes in there. I charge much less than the bike shop in town, but I still make enough to cover my phone bill and save a bit. Next year I'm hoping to start an apprenticeship as a mechanic, so this is really good practice for that.`},
{label:"C", title:"Sana – science videos", text:`I make science videos for the internet – mostly experiments you can do in your kitchen, like making a volcano or growing crystals. I always explain the science behind each experiment, because that's the part that interests me most. I started when I was thirteen, and my parents made some rules at the beginning: nothing with fire unless one of them is there, and no experiments after nine o'clock in the evening. For two years I earned nothing, but now the channel has enough viewers to make money from adverts. What people don't realise is that filming is the quick part. Editing a ten-minute video can take me a whole weekend. The thing I'm proudest of is that some teachers use my videos in their science lessons. A girl once told me she'd decided to study chemistry because of me, which made me cry. I'm hoping to study science communication at university.`},
{label:"D", title:"Tobias – T-shirt designs", text:`My friend Lewis and I design T-shirts with funny slogans and pictures, and sell them at school events and local markets. The slogans are usually jokes about school life, which our customers seem to love. He does most of the drawing, and I deal with the money and the printing company. Our first order was a disaster. We ordered a hundred T-shirts, all in large, without thinking about the fact that most of our customers were younger students. We lost nearly two hundred pounds and had to give a lot of them away. Since then, we always ask people what they want before we order anything. Business is going well now, but I've decided to take a break from it for the next six months, because my final exams are coming up and I need to concentrate on revision. Lewis is going to keep designing in the meantime, so we'll have plenty of new ideas when I come back.`}
],
questions:[
{q:"gets customers through recommendations rather than advertising?", answer:"B", why:"Reuben nikdy neinzeroval – lidé ho prostě doporučují přátelům.", evidence:"I've never advertised – people just tell their friends."},
{q:"lost money because of an early mistake?", answer:"D", why:"Tobias a Lewis objednali sto triček jen ve velikosti L a přišli skoro o dvě stě liber.", evidence:"We lost nearly two hundred pounds"},
{q:"says one stage of their work takes much longer than another?", answer:"C", why:"Natáčení je u Sany rychlé, ale střih desetiminutového videa jí zabere celý víkend.", evidence:"Editing a ten-minute video can take me a whole weekend."},
{q:"has received an order from another country?", answer:"A", why:"Mia minulý měsíc dostala první objednávku z Japonska.", evidence:"last month I got my first order from Japan"},
{q:"had to accept some rules from their parents?", answer:"C", why:"Rodiče Saně stanovili pravidla: nic s ohněm bez dozoru a žádné pokusy po deváté večer. Reuben má s tátou „dohodu“ o garáži, ale to nejsou pravidla pro práci samotnou.", evidence:"my parents made some rules at the beginning"},
{q:"finds it difficult to offer prices as low as their competitors?", answer:"A", why:"Mia nemůže konkurovat velkým firmám s levnými sériovými šperky – každé náušnice jí zaberou hodinu. Reuben je naopak levnější než konkurence.", evidence:"The hardest thing is competing with big companies"},
{q:"uses a space that belongs to a family member?", answer:"B", why:"Reuben pracuje v tátově garáži a musí v ní udržovat pořádek.", evidence:"I work in my dad's garage"},
{q:"is going to stop working for a while?", answer:"D", why:"Tobias si na půl roku dá od podnikání pauzu kvůli maturitě.", evidence:"I've decided to take a break from it for the next six months"},
{q:"knows that their work is used in schools?", answer:"C", why:"Někteří učitelé používají Saniny videa v hodinách přírodních věd.", evidence:"some teachers use my videos in their science lessons"},
{q:"runs the business together with someone else?", answer:"D", why:"Tobias podniká s kamarádem Lewisem – ten kreslí, Tobias řeší peníze a tisk. Mie jen maminka pomáhá s fotkami.", evidence:"My friend Lewis and I design T-shirts"}
]},
/* ------------------------------------------------------------------ */
{
id:"p7-going-green", title:"Small steps for the planet", topic:"životní prostředí", pick:"people", stem:"Which person",
intro:"You are going to read an article in which four young people describe changes they have made to help the environment.",
sections:[
{label:"A", title:"Ruby – going vegetarian", text:`I stopped eating meat when I was fifteen, after we watched a documentary about farming in a geography lesson. My family are all big meat-eaters, so at first my parents thought it was just a phase. For the first few months I had to cook most of my own meals, which was a pain, but it taught me a lot. I've learnt to make really good curries, and my lentil lasagne is now a family favourite. Gradually my family started trying some of the things I made, and now my dad has two vegetarian days a week – his idea, not mine! He says he feels healthier. I won't pretend it's always easy. I still really miss bacon, especially when someone is cooking it in the kitchen. But knowing that my choices make even a small difference keeps me going. My little sister has now decided to become vegetarian too, although she still eats fish fingers.`},
{label:"B", title:"Kofi – no new clothes", text:`Last year I made a promise not to buy any new clothes for twelve months. I'd read about how much water it takes to make one pair of jeans, and I was shocked. I'd also noticed that I had lots of clothes I'd only worn once or twice. Instead, I bought things second-hand, swapped clothes with friends, and learnt to repair things myself. My grandmother taught me to sew, which I'd never have imagined doing a few years ago. Now I can replace a zip and put patches on jeans. The hardest moment was my cousin's wedding. Everyone else had new suits, and I turned up in one from a charity shop that was slightly too big. Nobody noticed, apparently. The other unexpected benefit was money – by the end of the year I had saved enough to buy a new bike. I've kept going this year too, and it feels completely normal now.`},
{label:"C", title:"Ida – cycling to school", text:`My school is eight kilometres from home, and until last year my mum drove me there every day. When I suggested cycling instead, my parents were worried about the busy main road. So my dad and I spent a Saturday looking for a different route, and we found one that goes along the river and through a park, with hardly any traffic. We rode it together a few times at the weekend until my parents were happy that it was safe. It takes me thirty-five minutes, which is only ten minutes longer than the car in the morning rush hour. Of course, there are days when it pours with rain, and I arrive looking like I've been swimming. I keep spare clothes in my locker now. But I'm much fitter than I was – I used to get out of breath on the stairs, and now I don't. Two of my friends have started cycling with me, so the journey is much more fun.`},
{label:"D", title:"Ethan – plastic-free canteen", text:`I started a campaign to get rid of plastic bottles in our school canteen. At first the head teacher said no – she was worried that the school would lose money, because drinks are one of the canteen's best sellers. So I organised a petition, and in two weeks more than six hundred students and teachers had signed it. I also worked out how many bottles the school was throwing away every year. It was over forty thousand. I made a poster showing that many bottles piled up next to the school building. When I showed her the numbers, she agreed to try it for a term. The school installed three water fountains and now sells metal bottles at cost price. Some younger students have started their own campaign about plastic packaging, which is brilliant. I'm now working with the local council on a project to reduce plastic in other schools too.`}
],
questions:[
{q:"persuaded someone in charge to change their mind?", answer:"D", why:"Ředitelka nejdřív odmítla, ale po petici a číslech souhlasila se zkušebním obdobím.", evidence:"When I showed her the numbers, she agreed to try it for a term."},
{q:"has had an influence on a parent's habits?", answer:"A", why:"Rubyin táta teď má dva vegetariánské dny v týdnu. U Idy táta jen pomohl najít trasu, své návyky nezměnil.", evidence:"now my dad has two vegetarian days a week"},
{q:"found one particular occasion difficult?", answer:"B", why:"Nejtěžší chvíle byla pro Kofiho bratrancova svatba – všichni měli nové obleky, on o číslo větší z charity.", evidence:"The hardest moment was my cousin's wedding."},
{q:"had to deal with their parents' concerns about safety?", answer:"C", why:"Rodiče se báli rušné hlavní silnice, a tak Ida s tátou našli trasu podél řeky a parkem.", evidence:"my parents were worried about the busy main road"},
{q:"still misses something they have given up?", answer:"A", why:"Ruby pořád chybí slanina, hlavně když ji někdo smaží v kuchyni.", evidence:"I still really miss bacon"},
{q:"has saved money as a result of the change?", answer:"B", why:"Kofi za rok bez nového oblečení ušetřil tolik, že si koupil nové kolo. Ethanova škola prodává lahve za nákupní cenu – to není úspora pro něj.", evidence:"by the end of the year I had saved enough to buy a new bike"},
{q:"has noticed that they are in better physical condition?", answer:"C", why:"Ida je mnohem fitter – dřív se zadýchala na schodech, teď už ne. Rubyin táta se cítí zdravější, ale to není pisatelka sama.", evidence:"But I'm much fitter than I was"},
{q:"collected the support of a large number of people?", answer:"D", why:"Ethanovu petici podepsalo za dva týdny přes 600 studentů a učitelů.", evidence:"more than six hundred students and teachers had signed it"},
{q:"is sometimes affected by bad weather?", answer:"C", why:"Když leje, přijede Ida do školy promočená, a proto má ve skříňce náhradní oblečení.", evidence:"there are days when it pours with rain"},
{q:"learnt a practical skill from an older relative?", answer:"B", why:"Babička naučila Kofiho šít – teď umí vyměnit zip a záplatovat džíny. Ruby se vařit učila sama.", evidence:"My grandmother taught me to sew"}
]},
];
