/**
 * Lingoloop 多语种内置词库
 * ------------------------------------------------------------------
 * 学习方向：中文母语者 → 西班牙语 / 法语 / 俄语 / 德语 / 日语 / 韩语 /
 *            意大利语 / 葡萄牙语 / 阿拉伯语 / 上海话 / 闽南话
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
  { id: 'sh', name: '上海话',   native: '上海闲话', emoji: '🏙️', color: '#B693CE', tts: '',      ttsOk: false, hanzi: true,  tip: '吴语 · 暂无语音合成，提供近似注音' },
  { id: 'ja', name: '日语',     native: '日本語',   emoji: '🇯🇵', color: '#D98B8B', tts: 'ja-JP', ttsOk: true,  hanzi: false, skipSentence: true, tip: '假名 + 汉字 · 例句不做分词排序' },
  { id: 'ko', name: '韩语',     native: '한국어',   emoji: '🇰🇷', color: '#8FA8D8', tts: 'ko-KR', ttsOk: true,  hanzi: false, skipSentence: true, tip: '谚文 · 建议先记字母读音' },
  { id: 'it', name: '意大利语', native: 'Italiano', emoji: '🇮🇹', color: '#8FBF8F', tts: 'it-IT', ttsOk: true,  hanzi: false, tip: '拉丁字母 · 发音规则很规整' },
  { id: 'pt', name: '葡萄牙语', native: 'Português',emoji: '🇵🇹', color: '#B9A05E', tts: 'pt-BR', ttsOk: true,  hanzi: false, tip: '巴西葡语常用词 · 拉丁字母' },
  { id: 'ar', name: '阿拉伯语', native: 'العربية',  emoji: '🇸🇦', color: '#C9A46B', tts: 'ar-SA', ttsOk: true,  hanzi: false, rtl: true, skipSentence: true, tip: '现代标准阿拉伯语 · 从右向左书写' },
  { id: 'mn', name: '闽南话',   native: '闽南语',   emoji: '🗣️', color: '#B087B8', tts: '',      ttsOk: false, hanzi: true, skipSentence: true, tip: '泉漳片 · 近似注音，暂无语音合成' }
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
  ]},

  /* ============================ 日语 ============================ */
  { id: 'ja-u1', langId: 'ja', title: '打招呼', subtitle: '挨拶', icon: '👋', words: [
    { id:'ja-u1-1', word:'こんにちは', zh:'你好',     pron:'konnichiwa', ex:'こんにちは、元気ですか？', exZh:'你好，你好吗？' },
    { id:'ja-u1-2', word:'ありがとう', zh:'谢谢',     pron:'arigatō',    ex:'ありがとうございます。',   exZh:'非常感谢。' },
    { id:'ja-u1-3', word:'すみません', zh:'对不起；打扰一下', pron:'sumimasen', ex:'すみません、駅はどこですか？', exZh:'打扰一下，车站在哪里？' },
    { id:'ja-u1-4', word:'はい',       zh:'是；对',   pron:'hai',        ex:'はい、わかりました。',     exZh:'是的，明白了。' },
    { id:'ja-u1-5', word:'いいえ',     zh:'不；不是', pron:'iie',        ex:'いいえ、違います。',       exZh:'不，不对。' },
    { id:'ja-u1-6', word:'さようなら', zh:'再见',     pron:'sayōnara',   ex:'さようなら、また明日。',   exZh:'再见，明天见。' },
    { id:'ja-u1-7', word:'おはよう',   zh:'早上好',   pron:'ohayō',      ex:'おはようございます。',     exZh:'早上好。' },
    { id:'ja-u1-8', word:'こんばんは', zh:'晚上好',   pron:'konbanwa',   ex:'こんばんは、お疲れさまです。', exZh:'晚上好，辛苦了。' }
  ]},
  { id: 'ja-u2', langId: 'ja', title: '日常生活', subtitle: '日常生活', icon: '☀️', words: [
    { id:'ja-u2-1', word:'水',       zh:'水',       pron:'mizu',       ex:'水を一杯ください。',       exZh:'请给我一杯水。' },
    { id:'ja-u2-2', word:'食べ物',   zh:'食物；饭', pron:'tabemono',   ex:'食べ物はもうありますか？', exZh:'有吃的了吗？' },
    { id:'ja-u2-3', word:'家',       zh:'家；房子', pron:'ie',         ex:'家に帰ります。',           exZh:'我回家。' },
    { id:'ja-u2-4', word:'仕事',     zh:'工作',     pron:'shigoto',    ex:'仕事に行きます。',         exZh:'我去上班。' },
    { id:'ja-u2-5', word:'時間',     zh:'时间',     pron:'jikan',      ex:'時間がありません。',       exZh:'没时间。' },
    { id:'ja-u2-6', word:'お金',     zh:'钱',       pron:'okane',      ex:'お金を払います。',         exZh:'我付钱。' },
    { id:'ja-u2-7', word:'友達',     zh:'朋友',     pron:'tomodachi',  ex:'友達と会います。',         exZh:'和朋友见面。' },
    { id:'ja-u2-8', word:'今日',     zh:'今天',     pron:'kyō',        ex:'今日はいい天気です。',     exZh:'今天天气不错。' }
  ]},
  { id: 'ja-u3', langId: 'ja', title: '出行与购物', subtitle: 'お出かけ', icon: '🚉', words: [
    { id:'ja-u3-1', word:'駅',       zh:'车站',     pron:'eki',        ex:'駅はどこですか？',         exZh:'车站在哪里？' },
    { id:'ja-u3-2', word:'電車',     zh:'电车',     pron:'densha',     ex:'電車で行きます。',         exZh:'坐电车去。' },
    { id:'ja-u3-3', word:'店',       zh:'店',       pron:'mise',       ex:'あの店に入りましょう。',   exZh:'进那家店吧。' },
    { id:'ja-u3-4', word:'いくら',   zh:'多少钱',   pron:'ikura',      ex:'これはいくらですか？',     exZh:'这个多少钱？' },
    { id:'ja-u3-5', word:'これ',     zh:'这个',     pron:'kore',       ex:'これをください。',         exZh:'请给我这个。' },
    { id:'ja-u3-6', word:'それ',     zh:'那个',     pron:'sore',       ex:'それを見せてください。',   exZh:'请给我看看那个。' },
    { id:'ja-u3-7', word:'トイレ',   zh:'洗手间',   pron:'toire',      ex:'トイレはどこですか？',     exZh:'洗手间在哪儿？' },
    { id:'ja-u3-8', word:'助けて',   zh:'救命；帮帮我', pron:'tasukete', ex:'助けてください！',       exZh:'请帮帮我！' }
  ]},

  /* ============================ 韩语 ============================ */
  { id: 'ko-u1', langId: 'ko', title: '打招呼', subtitle: '인사', icon: '👋', words: [
    { id:'ko-u1-1', word:'안녕하세요', zh:'你好',     pron:'annyeonghaseyo', ex:'안녕하세요, 만나서 반갑습니다.', exZh:'你好，很高兴见到你。' },
    { id:'ko-u1-2', word:'감사합니다', zh:'谢谢',     pron:'gamsahamnida',   ex:'정말 감사합니다.',           exZh:'非常感谢。' },
    { id:'ko-u1-3', word:'죄송합니다', zh:'对不起',   pron:'joesonghamnida', ex:'죄송합니다, 늦었습니다.',     exZh:'对不起，我迟到了。' },
    { id:'ko-u1-4', word:'네',         zh:'是；对',   pron:'ne',             ex:'네, 알겠습니다.',            exZh:'是的，知道了。' },
    { id:'ko-u1-5', word:'아니요',     zh:'不；不是', pron:'aniyo',          ex:'아니요, 괜찮습니다.',        exZh:'不，没关系。' },
    { id:'ko-u1-6', word:'안녕히 가세요', zh:'再见',  pron:'annyeonghi gaseyo', ex:'안녕히 가세요, 내일 봐요.', exZh:'再见，明天见。' },
    { id:'ko-u1-7', word:'실례합니다', zh:'打扰一下', pron:'sillyehamnida',  ex:'실례합니다, 화장실이 어디예요?', exZh:'打扰一下，洗手间在哪？' },
    { id:'ko-u1-8', word:'주세요',     zh:'请给我',   pron:'juseyo',         ex:'물 좀 주세요.',              exZh:'请给我点水。' }
  ]},
  { id: 'ko-u2', langId: 'ko', title: '日常生活', subtitle: '일상', icon: '☀️', words: [
    { id:'ko-u2-1', word:'물',     zh:'水',       pron:'mul',     ex:'물 한 잔 주세요.',       exZh:'请给我一杯水。' },
    { id:'ko-u2-2', word:'음식',   zh:'食物；饭', pron:'eumsik',  ex:'음식이 맛있어요.',       exZh:'饭菜很好吃。' },
    { id:'ko-u2-3', word:'집',     zh:'家；房子', pron:'jip',     ex:'집에 가요.',             exZh:'我回家。' },
    { id:'ko-u2-4', word:'일',     zh:'工作；事', pron:'il',      ex:'일하러 가요.',           exZh:'我去上班。' },
    { id:'ko-u2-5', word:'시간',   zh:'时间',     pron:'sigan',   ex:'시간이 없어요.',         exZh:'没时间。' },
    { id:'ko-u2-6', word:'돈',     zh:'钱',       pron:'don',     ex:'돈을 내겠습니다.',       exZh:'我来付钱。' },
    { id:'ko-u2-7', word:'친구',   zh:'朋友',     pron:'chingu',  ex:'친구를 만나요.',         exZh:'见朋友。' },
    { id:'ko-u2-8', word:'오늘',   zh:'今天',     pron:'oneul',   ex:'오늘 날씨가 좋아요.',    exZh:'今天天气好。' }
  ]},
  { id: 'ko-u3', langId: 'ko', title: '出行与购物', subtitle: '외출과 쇼핑', icon: '🚉', words: [
    { id:'ko-u3-1', word:'역',         zh:'车站',     pron:'yeok',      ex:'역이 어디예요?',             exZh:'车站在哪里？' },
    { id:'ko-u3-2', word:'지하철',     zh:'地铁',     pron:'jihacheol', ex:'지하철로 가요.',             exZh:'坐地铁去。' },
    { id:'ko-u3-3', word:'가게',       zh:'店',       pron:'gage',      ex:'저 가게에 가 봐요.',         exZh:'去那家店看看。' },
    { id:'ko-u3-4', word:'얼마예요',   zh:'多少钱',   pron:'eolmayeyo', ex:'이거 얼마예요?',             exZh:'这个多少钱？' },
    { id:'ko-u3-5', word:'이거',       zh:'这个',     pron:'igeo',      ex:'이거 주세요.',               exZh:'请给我这个。' },
    { id:'ko-u3-6', word:'저거',       zh:'那个',     pron:'jeogeo',    ex:'저거 보여 주세요.',          exZh:'请给我看那个。' },
    { id:'ko-u3-7', word:'화장실',     zh:'洗手间',   pron:'hwajangsil',ex:'화장실이 어디예요?',        exZh:'洗手间在哪儿？' },
    { id:'ko-u3-8', word:'도와주세요', zh:'请帮帮我', pron:'dowajuseyo',ex:'도와주세요!',                exZh:'请帮帮我！' }
  ]},

  /* ============================ 意大利语 ============================ */
  { id: 'it-u1', langId: 'it', title: '打招呼', subtitle: 'Saluti', icon: '👋', words: [
    { id:'it-u1-1', word:'ciao',        zh:'你好；再见', pron:'/ˈtʃao/',        ex:'Ciao, come stai?',              exZh:'你好，你好吗？' },
    { id:'it-u1-2', word:'grazie',      zh:'谢谢',       pron:'/ˈɡrattsje/',    ex:'Grazie mille.',                 exZh:'非常感谢。' },
    { id:'it-u1-3', word:'scusa',       zh:'对不起；打扰一下', pron:'/ˈskuza/', ex:'Scusa, dov’è la stazione?',    exZh:'打扰一下，车站在哪？' },
    { id:'it-u1-4', word:'sì',          zh:'是；对',     pron:'/si/',           ex:'Sì, capisco.',                  exZh:'是的，我懂。' },
    { id:'it-u1-5', word:'no',          zh:'不；不是',   pron:'/nɔ/',           ex:'No, grazie.',                   exZh:'不用了，谢谢。' },
    { id:'it-u1-6', word:'arrivederci', zh:'再见',       pron:'/arriveˈdɛrtʃi/',ex:'Arrivederci, a domani.',        exZh:'再见，明天见。' },
    { id:'it-u1-7', word:'buongiorno',  zh:'早上好；您好',pron:'/bwonˈdʒorno/', ex:'Buongiorno a tutti.',           exZh:'大家早上好。' },
    { id:'it-u1-8', word:'per favore',  zh:'请',         pron:'/per faˈvore/',  ex:'Un caffè, per favore.',         exZh:'请给我一杯咖啡。' }
  ]},
  { id: 'it-u2', langId: 'it', title: '日常生活', subtitle: 'La vita quotidiana', icon: '☀️', words: [
    { id:'it-u2-1', word:'acqua',   zh:'水',       pron:'/ˈakkwa/',   ex:'Un bicchiere d’acqua, per favore.', exZh:'请给我一杯水。' },
    { id:'it-u2-2', word:'cibo',    zh:'食物；饭', pron:'/ˈtʃibo/',   ex:'Il cibo è pronto.',           exZh:'饭做好了。' },
    { id:'it-u2-3', word:'casa',    zh:'家；房子', pron:'/ˈkaza/',    ex:'Torno a casa.',               exZh:'我回家。' },
    { id:'it-u2-4', word:'lavoro',  zh:'工作',     pron:'/laˈvoro/',  ex:'Vado al lavoro.',             exZh:'我去上班。' },
    { id:'it-u2-5', word:'tempo',   zh:'时间；天气',pron:'/ˈtɛmpo/',  ex:'Non ho tempo.',               exZh:'我没时间。' },
    { id:'it-u2-6', word:'soldi',   zh:'钱',       pron:'/ˈsɔldi/',   ex:'Non ho soldi con me.',        exZh:'我没带钱。' },
    { id:'it-u2-7', word:'amico',   zh:'朋友',     pron:'/aˈmiko/',   ex:'Vedo un amico.',              exZh:'我见一个朋友。' },
    { id:'it-u2-8', word:'oggi',    zh:'今天',     pron:'/ˈɔddʒi/',   ex:'Oggi fa bel tempo.',          exZh:'今天天气好。' }
  ]},
  { id: 'it-u3', langId: 'it', title: '出行与购物', subtitle: 'In giro', icon: '🚉', words: [
    { id:'it-u3-1', word:'stazione',     zh:'车站',     pron:'/statˈtsjone/',  ex:'Dov’è la stazione?',          exZh:'车站在哪里？' },
    { id:'it-u3-2', word:'treno',        zh:'火车',     pron:'/ˈtrɛno/',       ex:'Prendo il treno.',            exZh:'我坐火车。' },
    { id:'it-u3-3', word:'negozio',      zh:'店',       pron:'/neˈɡɔttsjo/',   ex:'Entriamo in quel negozio.',   exZh:'我们进那家店吧。' },
    { id:'it-u3-4', word:'quanto costa', zh:'多少钱',   pron:'/ˈkwanto ˈkɔsta/',ex:'Quanto costa questo?',       exZh:'这个多少钱？' },
    { id:'it-u3-5', word:'questo',       zh:'这个',     pron:'/ˈkwesto/',      ex:'Vorrei questo.',              exZh:'我要这个。' },
    { id:'it-u3-6', word:'quello',       zh:'那个',     pron:'/ˈkwello/',      ex:'Mi mostri quello.',           exZh:'请给我看那个。' },
    { id:'it-u3-7', word:'bagno',        zh:'洗手间',   pron:'/ˈbaɲɲo/',       ex:'Dov’è il bagno?',            exZh:'洗手间在哪儿？' },
    { id:'it-u3-8', word:'aiuto',        zh:'救命；帮助',pron:'/aˈjuto/',      ex:'Aiuto, per favore!',          exZh:'请帮帮我！' }
  ]},

  /* ============================ 葡萄牙语（巴西） ============================ */
  { id: 'pt-u1', langId: 'pt', title: '打招呼', subtitle: 'Saudações', icon: '👋', words: [
    { id:'pt-u1-1', word:'oi',         zh:'你好',     pron:'/oj/',           ex:'Oi, tudo bem?',                    exZh:'你好，一切都好吗？' },
    { id:'pt-u1-2', word:'obrigado',   zh:'谢谢（男说）',pron:'/obɾiˈɡadu/',ex:'Muito obrigado.',                  exZh:'非常感谢。' },
    { id:'pt-u1-3', word:'obrigada',   zh:'谢谢（女说）',pron:'/obɾiˈɡadɐ/',ex:'Obrigada pela ajuda.',             exZh:'谢谢你的帮助。' },
    { id:'pt-u1-4', word:'desculpa',   zh:'对不起；打扰一下',pron:'/dʒisˈkuwpa/',ex:'Desculpa, onde fica a estação?',exZh:'打扰一下，车站在哪？' },
    { id:'pt-u1-5', word:'sim',        zh:'是；对',   pron:'/sĩ/',           ex:'Sim, entendi.',                    exZh:'是的，我懂了。' },
    { id:'pt-u1-6', word:'não',        zh:'不；不是', pron:'/nɐ̃w/',         ex:'Não, obrigado.',                   exZh:'不用了，谢谢。' },
    { id:'pt-u1-7', word:'tchau',      zh:'再见',     pron:'/tʃaw/',         ex:'Tchau, até amanhã.',               exZh:'再见，明天见。' },
    { id:'pt-u1-8', word:'por favor',  zh:'请',       pron:'/puʁ faˈvoʁ/',   ex:'Um café, por favor.',              exZh:'请给我一杯咖啡。' }
  ]},
  { id: 'pt-u2', langId: 'pt', title: '日常生活', subtitle: 'Cotidiano', icon: '☀️', words: [
    { id:'pt-u2-1', word:'água',     zh:'水',       pron:'/ˈaɡwa/',    ex:'Um copo de água, por favor.', exZh:'请给我一杯水。' },
    { id:'pt-u2-2', word:'comida',   zh:'食物；饭', pron:'/koˈmidɐ/',  ex:'A comida está pronta.',       exZh:'饭做好了。' },
    { id:'pt-u2-3', word:'casa',     zh:'家；房子', pron:'/ˈkazɐ/',    ex:'Vou para casa.',              exZh:'我回家。' },
    { id:'pt-u2-4', word:'trabalho', zh:'工作',     pron:'/tɾaˈbaʎu/', ex:'Vou ao trabalho.',            exZh:'我去上班。' },
    { id:'pt-u2-5', word:'tempo',    zh:'时间；天气',pron:'/ˈtẽpu/',   ex:'Não tenho tempo.',            exZh:'我没时间。' },
    { id:'pt-u2-6', word:'dinheiro', zh:'钱',       pron:'/dʒiˈɲejɾu/',ex:'Não tenho dinheiro.',        exZh:'我没钱。' },
    { id:'pt-u2-7', word:'amigo',    zh:'朋友',     pron:'/aˈmiɡu/',   ex:'Vou encontrar um amigo.',     exZh:'我去见一个朋友。' },
    { id:'pt-u2-8', word:'hoje',     zh:'今天',     pron:'/ˈoʒi/',     ex:'Hoje está ensolarado.',       exZh:'今天是晴天。' }
  ]},
  { id: 'pt-u3', langId: 'pt', title: '出行与购物', subtitle: 'Saindo de casa', icon: '🚉', words: [
    { id:'pt-u3-1', word:'estação',     zh:'车站',     pron:'/istaˈsɐ̃w/',    ex:'Onde fica a estação?',        exZh:'车站在哪里？' },
    { id:'pt-u3-2', word:'trem',        zh:'火车',     pron:'/tɾẽj/',         ex:'Vou de trem.',                exZh:'我坐火车。' },
    { id:'pt-u3-3', word:'loja',        zh:'店',       pron:'/ˈloʒɐ/',        ex:'Vamos entrar naquela loja.',  exZh:'我们进那家店吧。' },
    { id:'pt-u3-4', word:'quanto custa',zh:'多少钱',   pron:'/ˈkwãtu ˈkustɐ/',ex:'Quanto custa isto?',          exZh:'这个多少钱？' },
    { id:'pt-u3-5', word:'isto',        zh:'这个',     pron:'/ˈistu/',        ex:'Quero isto.',                 exZh:'我要这个。' },
    { id:'pt-u3-6', word:'aquilo',      zh:'那个',     pron:'/aˈkilu/',       ex:'Mostre-me aquilo.',           exZh:'请给我看那个。' },
    { id:'pt-u3-7', word:'banheiro',    zh:'洗手间',   pron:'/baˈɲejɾu/',     ex:'Onde fica o banheiro?',       exZh:'洗手间在哪儿？' },
    { id:'pt-u3-8', word:'ajuda',       zh:'救命；帮助',pron:'/aˈʒudɐ/',      ex:'Ajuda, por favor!',           exZh:'请帮帮我！' }
  ]},

  /* ============================ 阿拉伯语（现代标准语，从右向左书写） ============================ */
  { id: 'ar-u1', langId: 'ar', title: '打招呼', subtitle: 'التحية', icon: '👋', words: [
    { id:'ar-u1-1', word:'مرحباً',       zh:'你好',     pron:'marḥaban',        ex:'مرحباً، كيف حالك؟',            exZh:'你好，你好吗？' },
    { id:'ar-u1-2', word:'شكراً',        zh:'谢谢',     pron:'shukran',         ex:'شكراً جزيلاً.',               exZh:'非常感谢。' },
    { id:'ar-u1-3', word:'آسف',          zh:'对不起；打扰一下',pron:'āsif',     ex:'آسف، أين المحطة؟',            exZh:'打扰一下，车站在哪？' },
    { id:'ar-u1-4', word:'نعم',          zh:'是；对',   pron:'naʿam',           ex:'نعم، فهمت.',                 exZh:'是的，我懂了。' },
    { id:'ar-u1-5', word:'لا',           zh:'不；不是', pron:'lā',              ex:'لا، شكراً.',                  exZh:'不用了，谢谢。' },
    { id:'ar-u1-6', word:'مع السلامة',   zh:'再见',     pron:'maʿa al-salāma',  ex:'مع السلامة، إلى الغد.',       exZh:'再见，明天见。' },
    { id:'ar-u1-7', word:'صباح الخير',   zh:'早上好',   pron:'ṣabāḥ al-khayr',  ex:'صباح الخير للجميع.',          exZh:'大家早上好。' },
    { id:'ar-u1-8', word:'من فضلك',      zh:'请',       pron:'min faḍlik',      ex:'قهوة من فضلك.',               exZh:'请给我一杯咖啡。' }
  ]},
  { id: 'ar-u2', langId: 'ar', title: '日常生活', subtitle: 'الحياة اليومية', icon: '☀️', words: [
    { id:'ar-u2-1', word:'ماء',    zh:'水',       pron:'māʾ',     ex:'كوب ماء من فضلك.',      exZh:'请给我一杯水。' },
    { id:'ar-u2-2', word:'طعام',   zh:'食物；饭', pron:'ṭaʿām',   ex:'الطعام جاهز.',          exZh:'饭做好了。' },
    { id:'ar-u2-3', word:'بيت',    zh:'家；房子', pron:'bayt',    ex:'أعود إلى البيت.',       exZh:'我回家。' },
    { id:'ar-u2-4', word:'عمل',    zh:'工作',     pron:'ʿamal',   ex:'أذهب إلى العمل.',       exZh:'我去上班。' },
    { id:'ar-u2-5', word:'وقت',    zh:'时间',     pron:'waqt',    ex:'ليس لدي وقت.',          exZh:'我没时间。' },
    { id:'ar-u2-6', word:'مال',    zh:'钱',       pron:'māl',     ex:'ليس معي مال.',          exZh:'我没带钱。' },
    { id:'ar-u2-7', word:'صديق',   zh:'朋友',     pron:'ṣadīq',   ex:'أقابل صديقاً.',         exZh:'我见一个朋友。' },
    { id:'ar-u2-8', word:'اليوم',  zh:'今天',     pron:'al-yawm', ex:'الجو جميل اليوم.',      exZh:'今天天气好。' }
  ]},
  { id: 'ar-u3', langId: 'ar', title: '出行与购物', subtitle: 'الخروج والتسوق', icon: '🚉', words: [
    { id:'ar-u3-1', word:'محطة',     zh:'车站',     pron:'maḥaṭṭa',    ex:'أين المحطة؟',              exZh:'车站在哪里？' },
    { id:'ar-u3-2', word:'قطار',     zh:'火车',     pron:'qiṭār',      ex:'أذهب بالقطار.',            exZh:'我坐火车。' },
    { id:'ar-u3-3', word:'متجر',     zh:'店',       pron:'matjar',     ex:'لندخل ذلك المتجر.',        exZh:'我们进那家店吧。' },
    { id:'ar-u3-4', word:'كم السعر', zh:'多少钱',   pron:'kam al-siʿr',ex:'كم السعر؟',                exZh:'多少钱？' },
    { id:'ar-u3-5', word:'هذا',      zh:'这个',     pron:'hādhā',      ex:'أريد هذا.',                exZh:'我要这个。' },
    { id:'ar-u3-6', word:'ذلك',      zh:'那个',     pron:'dhālika',    ex:'أرني ذلك.',                exZh:'请给我看那个。' },
    { id:'ar-u3-7', word:'حمام',     zh:'洗手间',   pron:'ḥammām',     ex:'أين الحمام؟',              exZh:'洗手间在哪儿？' },
    { id:'ar-u3-8', word:'مساعدة',   zh:'救命；帮助',pron:'musāʿada',   ex:'المساعدة من فضلك!',         exZh:'请帮帮我！' }
  ]},

  /* ============================ 闽南话（泉漳片，近似注音） ============================ */
  { id: 'mn-u1', langId: 'mn', title: '打招呼', subtitle: '相借问', icon: '👋', words: [
    { id:'mn-u1-1', word:'汝好',     zh:'你好',     pron:'li ho',          ex:'汝好，近来好无？',       exZh:'你好，最近好吗？' },
    { id:'mn-u1-2', word:'多谢',     zh:'谢谢',     pron:'to sia',         ex:'多谢汝帮忙。',           exZh:'谢谢你的帮忙。' },
    { id:'mn-u1-3', word:'歹势',     zh:'对不起；不好意思', pron:'phainn se', ex:'歹势，车站伫叨位？', exZh:'不好意思，车站在哪里？' },
    { id:'mn-u1-4', word:'是',       zh:'是；对',   pron:'si',             ex:'是，我知影。',           exZh:'是的，我知道。' },
    { id:'mn-u1-5', word:'毋是',     zh:'不；不是', pron:'m si',           ex:'毋是，免啦。',           exZh:'不是，不用啦。' },
    { id:'mn-u1-6', word:'再会',     zh:'再见',     pron:'tsai hue',       ex:'再会，明仔日见。',       exZh:'再见，明天见。' },
    { id:'mn-u1-7', word:'早起好',   zh:'早上好',   pron:'tsai khi ho',    ex:'早起好，大家。',         exZh:'大家早上好。' },
    { id:'mn-u1-8', word:'请问',     zh:'请问；打扰一下', pron:'tshiann mng', ex:'请问，便所伫叨位？', exZh:'请问，洗手间在哪儿？' }
  ]},
  { id: 'mn-u2', langId: 'mn', title: '日常生活', subtitle: '日常', icon: '☀️', words: [
    { id:'mn-u2-1', word:'水',       zh:'水',       pron:'tsui',        ex:'予我一杯水。',           exZh:'给我一杯水。' },
    { id:'mn-u2-2', word:'饭',       zh:'食物；饭', pron:'png',         ex:'饭煮好啊。',             exZh:'饭做好了。' },
    { id:'mn-u2-3', word:'厝',       zh:'家；房子', pron:'tshu',        ex:'我欲转去厝。',           exZh:'我要回家。' },
    { id:'mn-u2-4', word:'头路',     zh:'工作',     pron:'thau loo',    ex:'我欲去食头路。',         exZh:'我要去上班。' },
    { id:'mn-u2-5', word:'时间',     zh:'时间',     pron:'si kan',      ex:'无时间啦。',             exZh:'没时间啦。' },
    { id:'mn-u2-6', word:'钱',       zh:'钱',       pron:'tsiann',      ex:'我无带钱。',             exZh:'我没带钱。' },
    { id:'mn-u2-7', word:'朋友',     zh:'朋友',     pron:'ping iu',     ex:'欲去揣朋友。',           exZh:'要去见朋友。' },
    { id:'mn-u2-8', word:'今仔日',   zh:'今天',     pron:'kin a jit',   ex:'今仔日天气真好。',       exZh:'今天天气很好。' }
  ]},
  { id: 'mn-u3', langId: 'mn', title: '出行与购物', subtitle: '出门甲买物', icon: '🚉', words: [
    { id:'mn-u3-1', word:'车站',     zh:'车站',     pron:'tshia tsam',  ex:'车站伫叨位？',           exZh:'车站在哪里？' },
    { id:'mn-u3-2', word:'火车',     zh:'火车',     pron:'hue tshia',   ex:'坐火车去。',             exZh:'坐火车去。' },
    { id:'mn-u3-3', word:'店',       zh:'店',       pron:'tiam',        ex:'入去彼间店看觅。',       exZh:'进那家店看看。' },
    { id:'mn-u3-4', word:'若济钱',   zh:'多少钱',   pron:'jua tse tsiann', ex:'即个若济钱？',        exZh:'这个多少钱？' },
    { id:'mn-u3-5', word:'即个',     zh:'这个',     pron:'tsit e',      ex:'欲买即个。',             exZh:'要买这个。' },
    { id:'mn-u3-6', word:'彼个',     zh:'那个',     pron:'hit e',       ex:'彼个予我看一下。',       exZh:'那个给我看一下。' },
    { id:'mn-u3-7', word:'便所',     zh:'洗手间',   pron:'pian soo',    ex:'便所伫叨位？',           exZh:'洗手间在哪儿？' },
    { id:'mn-u3-8', word:'斗相共',   zh:'帮忙；搭把手', pron:'tau sio kang', ex:'斗相共一下！',       exZh:'帮个忙！' }
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
