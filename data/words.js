/**
 * Lingoloop 多语种内置词库
 * ------------------------------------------------------------------
 * 学习方向：中文母语者 → 西班牙语 / 法语 / 俄语 / 德语 / 上海话
 *
 * 词条字段：
 *   word   目标语言的写法（上海话用通行汉字写法）
 *   zh     中文（普通话）释义
 *   pron   读音标注：西/法/俄/德用宽式国际音标；上海话用拉丁字母近似注音
 *   ex     目标语言例句
 *   exZh   例句的中文翻译
 *
 * 上海话说明：吴语目前没有可用的浏览器语音合成，也没有统一的拼音方案。
 * 这里的注音是「近似读音」，仅供跟读参考，实际声调与口音请以本地人发音为准。
 *
 * 想加词：在「设置」里导入 JSON / CSV，或直接编辑本文件。
 */

(() => {
const LANGS = [
  { id: 'es', name: '西班牙语', native: 'Español',  emoji: '🇪🇸', color: '#DFA45E', tts: 'es-ES', ttsOk: true,  hanzi: false, tip: '拉丁字母 · 发音规则很规整' },
  { id: 'fr', name: '法语',     native: 'Français', emoji: '🇫🇷', color: '#8AA9D6', tts: 'fr-FR', ttsOk: true,  hanzi: false, tip: '拉丁字母 · 注意联诵与鼻化元音' },
  { id: 'ru', name: '俄语',     native: 'Русский',  emoji: '🇷🇺', color: '#C98B8B', tts: 'ru-RU', ttsOk: true,  hanzi: false, tip: '西里尔字母 · 建议先记字母读音' },
  { id: 'de', name: '德语',     native: 'Deutsch',  emoji: '🇩🇪', color: '#9CB87E', tts: 'de-DE', ttsOk: true,  hanzi: false, tip: '拉丁字母 · 名词首字母大写' },
  { id: 'sh', name: '上海话',   native: '上海闲话', emoji: '🏙️', color: '#B693CE', tts: '',      ttsOk: false, hanzi: true,  tip: '吴语 · 暂无语音合成，提供近似注音' }
];

const BUILTIN_UNITS = [
  /* ============================ 西班牙语 ============================ */
  { id: 'es-u1', langId: 'es', title: '打招呼', subtitle: 'Saludos', icon: '👋', words: [
    { id:'es-u1-1', word:'hola',        zh:'你好',     pron:'/ˈola/',        ex:'¡Hola! ¿Cómo estás?',        exZh:'你好！你好吗？' },
    { id:'es-u1-2', word:'adiós',       zh:'再见',     pron:'/aˈðjos/',      ex:'Adiós, hasta mañana.',       exZh:'再见，明天见。' },
    { id:'es-u1-3', word:'gracias',     zh:'谢谢',     pron:'/ˈɡɾasjas/',    ex:'Muchas gracias.',            exZh:'非常感谢。' },
    { id:'es-u1-4', word:'por favor',   zh:'请',       pron:'/poɾ faˈβoɾ/',  ex:'Un café, por favor.',        exZh:'请给我一杯咖啡。' },
    { id:'es-u1-5', word:'sí',          zh:'是；对',   pron:'/si/',          ex:'Sí, entiendo.',              exZh:'是的，我懂。' },
    { id:'es-u1-6', word:'no',          zh:'不；不是', pron:'/no/',          ex:'No, gracias.',               exZh:'不用了，谢谢。' },
    { id:'es-u1-7', word:'perdón',      zh:'对不起；打扰一下', pron:'/peɾˈðon/', ex:'Perdón, ¿dónde está?', exZh:'打扰一下，在哪里？' },
    { id:'es-u1-8', word:'bien',        zh:'好',       pron:'/bjen/',        ex:'Estoy muy bien.',            exZh:'我很好。' }
  ]},
  { id: 'es-u2', langId: 'es', title: '日常生活', subtitle: 'La vida diaria', icon: '☀️', words: [
    { id:'es-u2-1', word:'agua',        zh:'水',       pron:'/ˈaɣwa/',       ex:'¿Me da un vaso de agua?',    exZh:'能给我一杯水吗？' },
    { id:'es-u2-2', word:'comida',      zh:'食物；饭', pron:'/koˈmiða/',     ex:'La comida está lista.',      exZh:'饭做好了。' },
    { id:'es-u2-3', word:'casa',        zh:'家；房子', pron:'/ˈkasa/',       ex:'Vuelvo a casa.',             exZh:'我回家。' },
    { id:'es-u2-4', word:'trabajo',     zh:'工作',     pron:'/tɾaˈβaxo/',    ex:'Voy al trabajo.',            exZh:'我去上班。' },
    { id:'es-u2-5', word:'tiempo',      zh:'时间；天气', pron:'/ˈtjempo/',    ex:'No tengo tiempo.',           exZh:'我没时间。' },
    { id:'es-u2-6', word:'hoy',         zh:'今天',     pron:'/oj/',          ex:'Hoy hace sol.',              exZh:'今天出太阳。' },
    { id:'es-u2-7', word:'mañana',      zh:'明天',     pron:'/maˈɲana/',     ex:'Nos vemos mañana.',          exZh:'明天见。' },
    { id:'es-u2-8', word:'amigo',       zh:'朋友',     pron:'/aˈmiɣo/',      ex:'Es mi amigo.',               exZh:'这是我朋友。' }
  ]},
  { id: 'es-u3', langId: 'es', title: '出行与购物', subtitle: 'De compras', icon: '🛍️', words: [
    { id:'es-u3-1', word:'cuánto',      zh:'多少钱',   pron:'/ˈkwanto/',     ex:'¿Cuánto cuesta?',            exZh:'多少钱？' },
    { id:'es-u3-2', word:'tren',        zh:'火车',     pron:'/tɾen/',        ex:'El tren sale a las ocho.',   exZh:'火车八点开。' },
    { id:'es-u3-3', word:'calle',       zh:'街道',     pron:'/ˈkaʎe/',       ex:'Vivo en esta calle.',        exZh:'我住在这条街。' },
    { id:'es-u3-4', word:'tienda',      zh:'商店',     pron:'/ˈtjenda/',     ex:'La tienda está abierta.',    exZh:'店开着。' },
    { id:'es-u3-5', word:'libro',       zh:'书',       pron:'/ˈliβɾo/',      ex:'Leo un libro.',              exZh:'我在读一本书。' },
    { id:'es-u3-6', word:'café',        zh:'咖啡',     pron:'/kaˈfe/',       ex:'El café está caliente.',     exZh:'咖啡是热的。' },
    { id:'es-u3-7', word:'noche',       zh:'夜晚',     pron:'/ˈnotʃe/',      ex:'Buenas noches.',             exZh:'晚安。' },
    { id:'es-u3-8', word:'ayuda',       zh:'帮助',     pron:'/aˈʝuða/',      ex:'Necesito ayuda.',            exZh:'我需要帮助。' }
  ]},

  /* ============================== 法语 ============================== */
  { id: 'fr-u1', langId: 'fr', title: '打招呼', subtitle: 'Salutations', icon: '👋', words: [
    { id:'fr-u1-1', word:'bonjour',          zh:'你好；早上好', pron:'/bɔ̃ʒuʁ/',    ex:'Bonjour, comment ça va ?',      exZh:'你好，你好吗？' },
    { id:'fr-u1-2', word:'au revoir',        zh:'再见',         pron:'/o ʁəvwaʁ/',  ex:'Au revoir, à demain.',          exZh:'再见，明天见。' },
    { id:'fr-u1-3', word:'merci',            zh:'谢谢',         pron:'/mɛʁsi/',     ex:'Merci beaucoup.',               exZh:'非常感谢。' },
    { id:'fr-u1-4', word:"s'il vous plaît",  zh:'请',           pron:'/sil vu plɛ/', ex:"Un café, s'il vous plaît.",    exZh:'请来一杯咖啡。' },
    { id:'fr-u1-5', word:'oui',              zh:'是；对',       pron:'/wi/',        ex:'Oui, je comprends.',            exZh:'是的，我明白。' },
    { id:'fr-u1-6', word:'non',              zh:'不；不是',     pron:'/nɔ̃/',        ex:'Non, merci.',                   exZh:'不用了，谢谢。' },
    { id:'fr-u1-7', word:'pardon',           zh:'对不起；打扰一下', pron:'/paʁdɔ̃/', ex:"Pardon, où est la gare ?",    exZh:'打扰一下，车站在哪？' },
    { id:'fr-u1-8', word:'bien',             zh:'好',           pron:'/bjɛ̃/',       ex:'Je vais bien.',                 exZh:'我很好。' }
  ]},
  { id: 'fr-u2', langId: 'fr', title: '日常生活', subtitle: 'La vie quotidienne', icon: '☀️', words: [
    { id:'fr-u2-1', word:'eau',              zh:'水',       pron:'/o/',           ex:"Un verre d'eau, s'il vous plaît.", exZh:'请给我一杯水。' },
    { id:'fr-u2-2', word:'repas',            zh:'餐；饭',   pron:'/ʁəpa/',        ex:'Le repas est prêt.',            exZh:'饭准备好了。' },
    { id:'fr-u2-3', word:'maison',           zh:'家；房子', pron:'/mɛzɔ̃/',       ex:'Je rentre à la maison.',        exZh:'我回家。' },
    { id:'fr-u2-4', word:'travail',          zh:'工作',     pron:'/tʁavaj/',      ex:'Je vais au travail.',           exZh:'我去上班。' },
    { id:'fr-u2-5', word:'temps',            zh:'时间；天气', pron:'/tɑ̃/',        ex:"Je n'ai pas le temps.",         exZh:'我没时间。' },
    { id:'fr-u2-6', word:"aujourd'hui",      zh:'今天',     pron:'/oʒuʁdɥi/',    ex:"Aujourd'hui il fait beau.",     exZh:'今天天气好。' },
    { id:'fr-u2-7', word:'demain',           zh:'明天',     pron:'/dəmɛ̃/',       ex:'À demain !',                    exZh:'明天见！' },
    { id:'fr-u2-8', word:'ami',              zh:'朋友',     pron:'/ami/',         ex:"C'est mon ami.",                exZh:'这是我朋友。' }
  ]},
  { id: 'fr-u3', langId: 'fr', title: '出行与购物', subtitle: 'Les courses', icon: '🛍️', words: [
    { id:'fr-u3-1', word:'combien',          zh:'多少钱',   pron:'/kɔ̃bjɛ̃/',     ex:'Combien ça coûte ?',            exZh:'多少钱？' },
    { id:'fr-u3-2', word:'train',            zh:'火车',     pron:'/tʁɛ̃/',        ex:'Le train part à huit heures.',  exZh:'火车八点开。' },
    { id:'fr-u3-3', word:'rue',              zh:'街道',     pron:'/ʁy/',          ex:"J'habite dans cette rue.",      exZh:'我住这条街。' },
    { id:'fr-u3-4', word:'magasin',          zh:'商店',     pron:'/maɡazɛ̃/',     ex:'Le magasin est ouvert.',        exZh:'店开门了。' },
    { id:'fr-u3-5', word:'livre',            zh:'书',       pron:'/livʁ/',        ex:'Je lis un livre.',              exZh:'我在读书。' },
    { id:'fr-u3-6', word:'café',             zh:'咖啡',     pron:'/kafe/',        ex:'Le café est chaud.',            exZh:'咖啡是热的。' },
    { id:'fr-u3-7', word:'nuit',             zh:'夜晚',     pron:'/nɥi/',         ex:'Bonne nuit.',                   exZh:'晚安。' },
    { id:'fr-u3-8', word:'aide',             zh:'帮助',     pron:'/ɛd/',          ex:"J'ai besoin d'aide.",           exZh:'我需要帮助。' }
  ]},

  /* ============================== 俄语 ============================== */
  { id: 'ru-u1', langId: 'ru', title: '打招呼', subtitle: 'Приветствие', icon: '👋', words: [
    { id:'ru-u1-1', word:'привет',        zh:'你好',     pron:'/prʲɪˈvʲet/',        ex:'Привет! Как дела?',           exZh:'你好！最近怎么样？' },
    { id:'ru-u1-2', word:'до свидания',   zh:'再见',     pron:'/də svʲɪˈdanʲɪjə/',  ex:'До свидания, до завтра.',     exZh:'再见，明天见。' },
    { id:'ru-u1-3', word:'спасибо',       zh:'谢谢',     pron:'/spɐˈsʲibə/',        ex:'Большое спасибо.',            exZh:'非常感谢。' },
    { id:'ru-u1-4', word:'пожалуйста',    zh:'请；不客气', pron:'/pɐˈʐalʊstə/',    ex:'Кофе, пожалуйста.',           exZh:'请来杯咖啡。' },
    { id:'ru-u1-5', word:'да',            zh:'是；对',   pron:'/da/',               ex:'Да, я понимаю.',              exZh:'是的，我明白。' },
    { id:'ru-u1-6', word:'нет',           zh:'不；不是', pron:'/nʲet/',             ex:'Нет, спасибо.',               exZh:'不用了，谢谢。' },
    { id:'ru-u1-7', word:'извините',      zh:'对不起；打扰一下', pron:'/ɪzvʲɪˈnʲitʲe/', ex:'Извините, где метро?', exZh:'打扰一下，地铁在哪？' },
    { id:'ru-u1-8', word:'хорошо',        zh:'好',       pron:'/xərɐˈʂo/',          ex:'Всё хорошо.',                 exZh:'一切都好。' }
  ]},
  { id: 'ru-u2', langId: 'ru', title: '日常生活', subtitle: 'Повседневная жизнь', icon: '☀️', words: [
    { id:'ru-u2-1', word:'вода',          zh:'水',       pron:'/vɐˈda/',           ex:'Дайте воды, пожалуйста.',     exZh:'请给我点水。' },
    { id:'ru-u2-2', word:'еда',           zh:'食物；饭', pron:'/jɪˈda/',           ex:'Еда готова.',                 exZh:'饭好了。' },
    { id:'ru-u2-3', word:'дом',           zh:'家；房子', pron:'/dom/',             ex:'Я иду домой.',                exZh:'我回家。' },
    { id:'ru-u2-4', word:'работа',        zh:'工作',     pron:'/rɐˈbotə/',         ex:'Я на работе.',                exZh:'我在上班。' },
    { id:'ru-u2-5', word:'время',         zh:'时间',     pron:'/ˈvrʲemʲə/',        ex:'У меня нет времени.',         exZh:'我没时间。' },
    { id:'ru-u2-6', word:'сегодня',       zh:'今天',     pron:'/sʲɪˈvodʲnʲə/',     ex:'Сегодня тепло.',              exZh:'今天暖和。' },
    { id:'ru-u2-7', word:'завтра',        zh:'明天',     pron:'/ˈzaftrə/',         ex:'Увидимся завтра.',            exZh:'明天见。' },
    { id:'ru-u2-8', word:'друг',          zh:'朋友',     pron:'/druk/',            ex:'Это мой друг.',               exZh:'这是我朋友。' }
  ]},
  { id: 'ru-u3', langId: 'ru', title: '出行与购物', subtitle: 'В городе', icon: '🛍️', words: [
    { id:'ru-u3-1', word:'сколько',       zh:'多少钱',   pron:'/ˈskolʲkə/',        ex:'Сколько это стоит?',          exZh:'这个多少钱？' },
    { id:'ru-u3-2', word:'поезд',         zh:'火车',     pron:'/ˈpojɪst/',         ex:'Поезд в восемь часов.',       exZh:'火车八点。' },
    { id:'ru-u3-3', word:'улица',         zh:'街道',     pron:'/ˈulʲɪtsə/',        ex:'Я живу на этой улице.',       exZh:'我住这条街。' },
    { id:'ru-u3-4', word:'магазин',       zh:'商店',     pron:'/məɡɐˈzʲin/',       ex:'Магазин открыт.',             exZh:'商店开门了。' },
    { id:'ru-u3-5', word:'книга',         zh:'书',       pron:'/ˈknʲiɡə/',         ex:'Я читаю книгу.',              exZh:'我在读书。' },
    { id:'ru-u3-6', word:'кофе',          zh:'咖啡',     pron:'/ˈkofʲe/',          ex:'Кофе горячий.',               exZh:'咖啡是热的。' },
    { id:'ru-u3-7', word:'ночь',          zh:'夜晚',     pron:'/notɕ/',            ex:'Спокойной ночи.',             exZh:'晚安。' },
    { id:'ru-u3-8', word:'помощь',        zh:'帮助',     pron:'/ˈpomɐɕː/',         ex:'Мне нужна помощь.',           exZh:'我需要帮助。' }
  ]},

  /* ============================== 德语 ============================== */
  { id: 'de-u1', langId: 'de', title: '打招呼', subtitle: 'Begrüßung', icon: '👋', words: [
    { id:'de-u1-1', word:'hallo',            zh:'你好',     pron:'/ˈhaloː/',            ex:"Hallo! Wie geht's?",                    exZh:'你好！你好吗？' },
    { id:'de-u1-2', word:'auf Wiedersehen',  zh:'再见',     pron:'/aʊf ˈviːdɐzeːən/',  ex:'Auf Wiedersehen, bis morgen.',          exZh:'再见，明天见。' },
    { id:'de-u1-3', word:'danke',            zh:'谢谢',     pron:'/ˈdaŋkə/',            ex:'Vielen Dank.',                         exZh:'非常感谢。' },
    { id:'de-u1-4', word:'bitte',            zh:'请；不客气', pron:'/ˈbɪtə/',           ex:'Einen Kaffee, bitte.',                 exZh:'请来杯咖啡。' },
    { id:'de-u1-5', word:'ja',               zh:'是；对',   pron:'/jaː/',              ex:'Ja, ich verstehe.',                    exZh:'是的，我懂。' },
    { id:'de-u1-6', word:'nein',             zh:'不；不是', pron:'/naɪn/',             ex:'Nein, danke.',                         exZh:'不用了，谢谢。' },
    { id:'de-u1-7', word:'Entschuldigung',   zh:'对不起；打扰一下', pron:'/ɛntˈʃʊldɪɡʊŋ/', ex:'Entschuldigung, wo ist der Bahnhof?', exZh:'打扰一下，车站在哪？' },
    { id:'de-u1-8', word:'gut',              zh:'好',       pron:'/ɡuːt/',             ex:'Mir geht es gut.',                     exZh:'我很好。' }
  ]},
  { id: 'de-u2', langId: 'de', title: '日常生活', subtitle: 'Alltag', icon: '☀️', words: [
    { id:'de-u2-1', word:'Wasser',           zh:'水',       pron:'/ˈvasɐ/',            ex:'Ein Glas Wasser, bitte.',              exZh:'请给我一杯水。' },
    { id:'de-u2-2', word:'Essen',            zh:'食物；饭', pron:'/ˈɛsn̩/',            ex:'Das Essen ist fertig.',                exZh:'饭好了。' },
    { id:'de-u2-3', word:'Haus',             zh:'家；房子', pron:'/haʊs/',             ex:'Ich gehe nach Hause.',                 exZh:'我回家。' },
    { id:'de-u2-4', word:'Arbeit',           zh:'工作',     pron:'/ˈarbaɪt/',          ex:'Ich gehe zur Arbeit.',                 exZh:'我去上班。' },
    { id:'de-u2-5', word:'Zeit',             zh:'时间',     pron:'/tsaɪt/',            ex:'Ich habe keine Zeit.',                 exZh:'我没时间。' },
    { id:'de-u2-6', word:'heute',            zh:'今天',     pron:'/ˈhɔʏtə/',           ex:'Heute ist es sonnig.',                 exZh:'今天出太阳。' },
    { id:'de-u2-7', word:'morgen',           zh:'明天',     pron:'/ˈmɔrɡn̩/',          ex:'Bis morgen!',                          exZh:'明天见！' },
    { id:'de-u2-8', word:'Freund',           zh:'朋友',     pron:'/frɔʏnt/',           ex:'Das ist mein Freund.',                 exZh:'这是我朋友。' }
  ]},
  { id: 'de-u3', langId: 'de', title: '出行与购物', subtitle: 'Unterwegs', icon: '🛍️', words: [
    { id:'de-u3-1', word:'wie viel',         zh:'多少钱',   pron:'/viː fiːl/',         ex:'Wie viel kostet das?',                 exZh:'这个多少钱？' },
    { id:'de-u3-2', word:'Zug',              zh:'火车',     pron:'/tsuːk/',            ex:'Der Zug fährt um acht.',               exZh:'火车八点开。' },
    { id:'de-u3-3', word:'Straße',           zh:'街道',     pron:'/ˈʃtraːsə/',         ex:'Ich wohne in dieser Straße.',          exZh:'我住这条街。' },
    { id:'de-u3-4', word:'Geschäft',         zh:'商店',     pron:'/ɡəˈʃɛft/',          ex:'Das Geschäft ist offen.',              exZh:'店开着。' },
    { id:'de-u3-5', word:'Buch',             zh:'书',       pron:'/buːx/',             ex:'Ich lese ein Buch.',                   exZh:'我在读书。' },
    { id:'de-u3-6', word:'Kaffee',           zh:'咖啡',     pron:'/ˈkafeː/',           ex:'Der Kaffee ist heiß.',                 exZh:'咖啡是热的。' },
    { id:'de-u3-7', word:'Nacht',            zh:'夜晚',     pron:'/naxt/',             ex:'Gute Nacht.',                          exZh:'晚安。' },
    { id:'de-u3-8', word:'Hilfe',            zh:'帮助',     pron:'/ˈhɪlfə/',           ex:'Ich brauche Hilfe.',                   exZh:'我需要帮助。' }
  ]},

  /* ============================= 上海话 ============================= */
  { id: 'sh-u1', langId: 'sh', title: '打招呼', subtitle: '打招呼 · 吴语', icon: '👋', words: [
    { id:'sh-u1-1', word:'侬好',     zh:'你好',       pron:'nong ho',      ex:'侬好，长远勿见！',   exZh:'你好，好久不见！' },
    { id:'sh-u1-2', word:'再会',     zh:'再见',       pron:'tse we',       ex:'明朝再会！',         exZh:'明天见！' },
    { id:'sh-u1-3', word:'谢谢',     zh:'谢谢',       pron:'zia zia',      ex:'谢谢侬！',           exZh:'谢谢你！' },
    { id:'sh-u1-4', word:'勿客气',   zh:'不客气',     pron:'veh kheh chi', ex:'勿客气，自家来。',   exZh:'别客气，自己来。' },
    { id:'sh-u1-5', word:'是',       zh:'是；对',     pron:'zy',           ex:'是个，我晓得。',     exZh:'是的，我知道。' },
    { id:'sh-u1-6', word:'勿是',     zh:'不是',       pron:'veh zy',       ex:'勿是我。',           exZh:'不是我。' },
    { id:'sh-u1-7', word:'对勿起',   zh:'对不起',     pron:'te veh chi',   ex:'对勿起，我来晏了。', exZh:'对不起，我来晚了。' },
    { id:'sh-u1-8', word:'好',       zh:'好',         pron:'ho',           ex:'侬好伐？',           exZh:'你好吗？' }
  ]},
  { id: 'sh-u2', langId: 'sh', title: '日常用词', subtitle: '常用字眼 · 吴语', icon: '☀️', words: [
    { id:'sh-u2-1', word:'阿拉',     zh:'我们',       pron:'ah lah',       ex:'阿拉一道去。',       exZh:'我们一起去。' },
    { id:'sh-u2-2', word:'吾',       zh:'我',         pron:'ngu',          ex:'吾勿晓得。',         exZh:'我不知道。' },
    { id:'sh-u2-3', word:'伊',       zh:'他；她',     pron:'yi',           ex:'伊勒辣做啥？',       exZh:'他在做什么？' },
    { id:'sh-u2-4', word:'啥',       zh:'什么',       pron:'sa',           ex:'格是啥物事？',       exZh:'这是什么东西？' },
    { id:'sh-u2-5', word:'物事',     zh:'东西',       pron:'meh zy',       ex:'格个物事老好个。',   exZh:'这东西挺好的。' },
    { id:'sh-u2-6', word:'辰光',     zh:'时间',       pron:'zen kuang',    ex:'啥辰光出发？',       exZh:'什么时候出发？' },
    { id:'sh-u2-7', word:'今朝',     zh:'今天',       pron:'cin tsau',     ex:'今朝天气蛮好。',     exZh:'今天天气不错。' },
    { id:'sh-u2-8', word:'明朝',     zh:'明天',       pron:'min tsau',     ex:'明朝再讲。',         exZh:'明天再说。' }
  ]},
  { id: 'sh-u3', langId: 'sh', title: '生活场景', subtitle: '买物事 · 白相 · 吴语', icon: '🛍️', words: [
    { id:'sh-u3-1', word:'吃饭',     zh:'吃饭',       pron:'chieh veh',    ex:'吃饭勒伐？',         exZh:'吃饭了吗？' },
    { id:'sh-u3-2', word:'几钿',     zh:'多少钱',     pron:'ci di',        ex:'格个几钿？',         exZh:'这个多少钱？' },
    { id:'sh-u3-3', word:'格搭',     zh:'这里',       pron:'keh tah',      ex:'格搭坐一歇。',       exZh:'这里坐一会儿。' },
    { id:'sh-u3-4', word:'依搭',     zh:'那里',       pron:'i tah',        ex:'依搭有家店。',       exZh:'那里有家店。' },
    { id:'sh-u3-5', word:'白相',     zh:'玩',         pron:'bah siang',    ex:'一道去白相。',       exZh:'一起去玩。' },
    { id:'sh-u3-6', word:'交关',     zh:'很；非常',   pron:'ciau kue',     ex:'交关好白相。',       exZh:'非常好玩。' },
    { id:'sh-u3-7', word:'勿要',     zh:'不要',       pron:'veh iau',      ex:'勿要紧个。',         exZh:'没关系的。' },
    { id:'sh-u3-8', word:'晓得',     zh:'知道',       pron:'shiau teh',    ex:'吾晓得哉。',         exZh:'我知道了。' }
  ]}
];

function flattenWords(units) {
  return units.flatMap((unit) =>
    unit.words.map((w) => ({ ...w, unitId: unit.id, unitTitle: unit.title, langId: unit.langId }))
  );
}

/* 用 IIFE + 全局挂载，保证直接双击 index.html（file://）也能运行 */
window.LINGO = { LANGS, BUILTIN_UNITS, flattenWords };
})();
