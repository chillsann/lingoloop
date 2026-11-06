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
  { id: 'mn', name: '闽南话',   native: '闽南语',   emoji: '🗣️', color: '#B087B8', tts: '',      ttsOk: true,  hanzi: true, skipSentence: true, audioPartial: true, tip: '台湾通行腔 · 官方辞典真人录音 + 标准台罗' }
];

const BUILTIN_UNITS = [
  /* ============================ 西班牙语 ============================ */
  { id: 'es-u1', langId: 'es', title: '打招呼', subtitle: 'Saludos', icon: '👋', level: 'A1', grammar: '问候用倒装符号：¡Hola! 开头、¿Cómo estás? 结尾都要成对写。', words: [
    { id:'es-u1-1', word:'hola',        zh:'你好',     pron:'/ˈola/',        ex:'¡Hola! ¿Cómo estás?',        exZh:'你好！你好吗？' },
    { id:'es-u1-2', word:'adiós',       zh:'再见',     pron:'/aˈðjos/',      ex:'Adiós, hasta mañana.',       exZh:'再见，明天见。' },
    { id:'es-u1-3', word:'gracias',     zh:'谢谢',     pron:'/ˈɡɾasjas/',    ex:'Muchas gracias.',            exZh:'非常感谢。' },
    { id:'es-u1-4', word:'por favor',   zh:'请',       pron:'/poɾ faˈβoɾ/',  ex:'Un café, por favor.',        exZh:'请给我一杯咖啡。' },
    { id:'es-u1-5', word:'sí',          zh:'是；对',   pron:'/si/',          ex:'Sí, entiendo.',              exZh:'是的，我懂。' },
    { id:'es-u1-6', word:'no',          zh:'不；不是', pron:'/no/',          ex:'No, gracias.',               exZh:'不用了，谢谢。' },
    { id:'es-u1-7', word:'perdón',      zh:'对不起；打扰一下', pron:'/peɾˈðon/', ex:'Perdón, ¿dónde está?', exZh:'打扰一下，在哪里？' },
    { id:'es-u1-8', word:'bien',        zh:'好',       pron:'/bjen/',        ex:'Estoy muy bien.',            exZh:'我很好。' }
  ]},
  { id: 'es-u2', langId: 'es', title: '日常生活', subtitle: 'La vida diaria', icon: '☀️', level: 'A1', grammar: '名词分阴阳：la casa、el trabajo；agua 是阴性但用 el agua。', words: [
    { id:'es-u2-1', word:'agua',        zh:'水',       pron:'/ˈaɣwa/',       ex:'¿Me da un vaso de agua?',    exZh:'能给我一杯水吗？' },
    { id:'es-u2-2', word:'comida',      zh:'食物；饭', pron:'/koˈmiða/',     ex:'La comida está lista.',      exZh:'饭做好了。' },
    { id:'es-u2-3', word:'casa',        zh:'家；房子', pron:'/ˈkasa/',       ex:'Vuelvo a casa.',             exZh:'我回家。' },
    { id:'es-u2-4', word:'trabajo',     zh:'工作',     pron:'/tɾaˈβaxo/',    ex:'Voy al trabajo.',            exZh:'我去上班。' },
    { id:'es-u2-5', word:'tiempo',      zh:'时间；天气', pron:'/ˈtjempo/',    ex:'No tengo tiempo.',           exZh:'我没时间。' },
    { id:'es-u2-6', word:'hoy',         zh:'今天',     pron:'/oj/',          ex:'Hoy hace sol.',              exZh:'今天出太阳。' },
    { id:'es-u2-7', word:'mañana',      zh:'明天',     pron:'/maˈɲana/',     ex:'Nos vemos mañana.',          exZh:'明天见。' },
    { id:'es-u2-8', word:'amigo',       zh:'朋友',     pron:'/aˈmiɣo/',      ex:'Es mi amigo.',               exZh:'这是我朋友。' }
  ]},
  { id: 'es-u3', langId: 'es', title: '出行与购物', subtitle: 'De compras', icon: '🛍️', level: 'A1', grammar: '问价格用 ¿Cuánto cuesta?；cuánto 会随名词变成 cuánta / cuántos。', words: [
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
    { id:'mn-u1-2', word:'多谢',     zh:'谢谢',     "pron": "to-siā",         ex:'多谢汝帮忙。',           exZh:'谢谢你的帮忙。' },
    { id:'mn-u1-3', word:'歹势',     zh:'对不起；不好意思', "pron": "pháinn-sè", ex:'歹势，车站伫叨位？', exZh:'不好意思，车站在哪里？' },
    { id:'mn-u1-4', word:'是',       zh:'是；对',   "pron": "sī",             ex:'是，我知影。',           exZh:'是的，我知道。' },
    { id:'mn-u1-5', word:'毋是',     zh:'不；不是', "pron": "m̄ sī",           ex:'毋是，免啦。',           exZh:'不是，不用啦。' },
    { id:'mn-u1-6', word:'再会',     zh:'再见',     "pron": "tsài-huē",       ex:'再会，明仔日见。',       exZh:'再见，明天见。' },
    { id:'mn-u1-7', word:'早起好',   zh:'早上好',   pron:'tsai khi ho',    ex:'早起好，大家。',         exZh:'大家早上好。' },
    { id:'mn-u1-8', word:'请问',     zh:'请问；打扰一下', "pron": "tshiánn-mn̄g", ex:'请问，便所伫叨位？', exZh:'请问，洗手间在哪儿？' }
  ]},
  { id: 'mn-u2', langId: 'mn', title: '日常生活', subtitle: '日常', icon: '☀️', words: [
    { id:'mn-u2-1', word:'水',       zh:'水',       "pron": "tsuí",        ex:'予我一杯水。',           exZh:'给我一杯水。' },
    { id:'mn-u2-2', word:'饭',       zh:'食物；饭', "pron": "pn̄g",         ex:'饭煮好啊。',             exZh:'饭做好了。' },
    { id:'mn-u2-3', word:'厝',       zh:'家；房子', "pron": "tshù",        ex:'我欲转去厝。',           exZh:'我要回家。' },
    { id:'mn-u2-4', word:'头路',     zh:'工作',     "pron": "thâu-lōo",    ex:'我欲去食头路。',         exZh:'我要去上班。' },
    { id:'mn-u2-5', word:'时间',     zh:'时间',     "pron": "sî-kan",      ex:'无时间啦。',             exZh:'没时间啦。' },
    { id:'mn-u2-6', word:'钱',       zh:'钱',       "pron": "tsînn",      ex:'我无带钱。',             exZh:'我没带钱。' },
    { id:'mn-u2-7', word:'朋友',     zh:'朋友',     "pron": "pîng-iú",     ex:'欲去揣朋友。',           exZh:'要去见朋友。' },
    { id:'mn-u2-8', word:'今仔日',   zh:'今天',     "pron": "kin-á-ji̍t",   ex:'今仔日天气真好。',       exZh:'今天天气很好。' }
  ]},
  { id: 'mn-u3', langId: 'mn', title: '出行与购物', subtitle: '出门甲买物', icon: '🚉', words: [
    { id:'mn-u3-1', word:'车站',     zh:'车站',     "pron": "tshia-tsām",  ex:'车站伫叨位？',           exZh:'车站在哪里？' },
    { id:'mn-u3-2', word:'火车',     zh:'火车',     "pron": "hué-tshia",   ex:'坐火车去。',             exZh:'坐火车去。' },
    { id:'mn-u3-3', word:'店',       zh:'店',       "pron": "tiàm",        ex:'入去彼间店看觅。',       exZh:'进那家店看看。' },
    { id:'mn-u3-4', word:'若济钱',   zh:'多少钱',   pron:'jua tse tsiann', ex:'即个若济钱？',        exZh:'这个多少钱？' },
    { id:'mn-u3-5', word:'即个',     zh:'这个',     pron:'tsit e',      ex:'欲买即个。',             exZh:'要买这个。' },
    { id:'mn-u3-6', word:'彼个',     zh:'那个',     "pron": "hit ê",       ex:'彼个予我看一下。',       exZh:'那个给我看一下。' },
    { id:'mn-u3-7', word:'便所',     zh:'洗手间',   "pron": "piān-sóo",    ex:'便所伫叨位？',           exZh:'洗手间在哪儿？' },
    { id:'mn-u3-8', word:'斗相共',   zh:'帮忙；搭把手', "pron": "tàu-sann-kāng", ex:'斗相共一下！',       exZh:'帮个忙！' }
  ]},
  { id: 'es-u4', langId: 'es', level: 'A1', title: '数字与计数', subtitle: 'Los números', icon: '🔢', grammar: '数字 1–10 先记牢；uno 在阳性名词前要短化成 un（un café）。', words: [
    { id:'es-u4-1', word:'uno', zh:'一', pron:'/ˈuno/', ex:'Uno, dos, tres.', exZh:'一、二、三。' },
    { id:'es-u4-2', word:'dos', zh:'二', pron:'/dos/', ex:'Quiero dos cafés.', exZh:'我要两杯咖啡。' },
    { id:'es-u4-3', word:'tres', zh:'三', pron:'/tɾes/', ex:'Tres personas, por favor.', exZh:'三个人，谢谢。' },
    { id:'es-u4-4', word:'diez', zh:'十', pron:'/ˈdjes/', ex:'Son las diez.', exZh:'现在十点。' },
    { id:'es-u4-5', word:'cien', zh:'一百', pron:'/ˈsjen/', ex:'Cuesta cien euros.', exZh:'要一百欧元。' },
    { id:'es-u4-6', word:'primero', zh:'第一', pron:'/pɾiˈmeɾo/', ex:'Es mi primer día.', exZh:'这是我第一天。' },
    { id:'es-u4-7', word:'mucho', zh:'很多', pron:'/ˈmutʃo/', ex:'Mucho gusto.', exZh:'很高兴认识你。' },
    { id:'es-u4-8', word:'poco', zh:'一点；少', pron:'/ˈpoko/', ex:'Un poco de azúcar.', exZh:'一点糖。' }
  ]},
  { id: 'es-u5', langId: 'es', level: 'A1', title: '自我介绍', subtitle: 'Presentarse', icon: '🙋', grammar: 'ser 表身份与来源，tener 表年龄：西语说「我有 20 岁」而不是「我是 20 岁」。', words: [
    { id:'es-u5-1', word:'me llamo', zh:'我叫', pron:'/me ˈʝamo/', ex:'Me llamo Ana.', exZh:'我叫安娜。' },
    { id:'es-u5-2', word:'soy', zh:'我是', pron:'/soj/', ex:'Soy chino.', exZh:'我是中国人。', "conj": ["soy", "eres", "es", "somos", "sois", "son"] },
    { id:'es-u5-3', word:'nombre', zh:'名字', pron:'/ˈnombɾe/', ex:'¿Cuál es tu nombre?', exZh:'你叫什么名字？' },
    { id:'es-u5-4', word:'de', zh:'从；来自', pron:'/de/', ex:'Soy de Shanghái.', exZh:'我来自上海。' },
    { id:'es-u5-5', word:'vivo', zh:'我住', pron:'/ˈbiβo/', ex:'Vivo en Madrid.', exZh:'我住在马德里。', "conj": ["vivo", "vives", "vive", "vivimos", "vivís", "viven"] },
    { id:'es-u5-6', word:'años', zh:'岁；年', pron:'/ˈaɲos/', ex:'Tengo veinte años.', exZh:'我二十岁。' },
    { id:'es-u5-7', word:'gusto', zh:'高兴；愉快', pron:'/ˈɡusto/', ex:'Mucho gusto en conocerte.', exZh:'很高兴认识你。' },
    { id:'es-u5-8', word:'también', zh:'也', pron:'/tamˈbjen/', ex:'Yo también.', exZh:'我也是。' }
  ]},
  { id: 'es-u6', langId: 'es', level: 'A1', title: '家庭与人物', subtitle: 'La familia', icon: '👨‍👩‍👧', grammar: '物主词 mi / tu / su 不随名词变；名词与形容词要分阴阳单复数。', words: [
    { id:'es-u6-1', word:'familia', zh:'家庭', pron:'/faˈmilja/', ex:'Mi familia es grande.', exZh:'我家人口多。' },
    { id:'es-u6-2', word:'madre', zh:'母亲', pron:'/ˈmaðɾe/', ex:'Mi madre cocina bien.', exZh:'我妈妈做饭很好吃。' },
    { id:'es-u6-3', word:'padre', zh:'父亲', pron:'/ˈpaðɾe/', ex:'Mi padre trabaja aquí.', exZh:'我爸爸在这儿工作。' },
    { id:'es-u6-4', word:'hijo', zh:'儿子', pron:'/ˈixo/', ex:'Tengo un hijo.', exZh:'我有一个儿子。' },
    { id:'es-u6-5', word:'hermana', zh:'姐妹', pron:'/eɾˈmana/', ex:'Mi hermana estudia.', exZh:'我姐姐在读书。' },
    { id:'es-u6-6', word:'esposo', zh:'丈夫', pron:'/esˈposo/', ex:'Su esposo es médico.', exZh:'她丈夫是医生。' },
    { id:'es-u6-7', word:'niño', zh:'小孩', pron:'/ˈniɲo/', ex:'El niño juega.', exZh:'小孩在玩。' },
    { id:'es-u6-8', word:'persona', zh:'人', pron:'/peɾˈsona/', ex:'Es una persona amable.', exZh:'他是个和善的人。' }
  ]},
  { id: 'es-u7', langId: 'es', level: 'A1', title: '饮食', subtitle: 'Comer y beber', icon: '🍽️', grammar: '点东西用 querer + 名词：Quiero un café；不可数食物用 un poco de。', words: [
    { id:'es-u7-1', word:'desayuno', zh:'早餐', pron:'/desaˈʝuno/', ex:'Tomo el desayuno a las siete.', exZh:'我七点吃早饭。' },
    { id:'es-u7-2', word:'pan', zh:'面包', pron:'/pan/', ex:'Quiero pan con mantequilla.', exZh:'我要黄油面包。' },
    { id:'es-u7-3', word:'café', zh:'咖啡', pron:'/kaˈfe/', ex:'Un café con leche.', exZh:'一杯牛奶咖啡。' },
    { id:'es-u7-4', word:'arroz', zh:'米饭', pron:'/aˈros/', ex:'El arroz está listo.', exZh:'米饭好了。' },
    { id:'es-u7-5', word:'carne', zh:'肉', pron:'/ˈkaɾne/', ex:'No como carne.', exZh:'我不吃肉。' },
    { id:'es-u7-6', word:'pescado', zh:'鱼', pron:'/pesˈkaðo/', ex:'El pescado es fresco.', exZh:'这鱼很新鲜。' },
    { id:'es-u7-7', word:'verdura', zh:'蔬菜', pron:'/beɾˈðuɾa/', ex:'Come más verdura.', exZh:'多吃点蔬菜。' },
    { id:'es-u7-8', word:'bebida', zh:'饮料', pron:'/beˈβiða/', ex:'¿Qué bebida quieres?', exZh:'你想喝什么？' }
  ]},
  { id: 'es-u8', langId: 'es', level: 'A1', title: '时间与日期', subtitle: 'La hora y la fecha', icon: '🕐', grammar: '问时间用 ser：¿Qué hora es? / Son las diez；「在下午」用 por la tarde。', words: [
    { id:'es-u8-1', word:'hora', zh:'小时；点钟', pron:'/ˈoɾa/', ex:'¿Qué hora es?', exZh:'现在几点？' },
    { id:'es-u8-2', word:'día', zh:'天；日', pron:'/ˈdia/', ex:'Hoy es un buen día.', exZh:'今天是个好日子。' },
    { id:'es-u8-3', word:'semana', zh:'星期', pron:'/seˈmana/', ex:'Nos vemos la próxima semana.', exZh:'下周见。' },
    { id:'es-u8-4', word:'mes', zh:'月', pron:'/mes/', ex:'El mes que viene.', exZh:'下个月。' },
    { id:'es-u8-5', word:'año', zh:'年', pron:'/ˈaɲo/', ex:'Feliz año nuevo.', exZh:'新年快乐。' },
    { id:'es-u8-6', word:'lunes', zh:'星期一', pron:'/ˈlunes/', ex:'El lunes empiezo.', exZh:'我周一开始。' },
    { id:'es-u8-7', word:'ahora', zh:'现在', pron:'/aˈoɾa/', ex:'Salgo ahora.', exZh:'我现在出门。' },
    { id:'es-u8-8', word:'tarde', zh:'下午', pron:'/ˈtaɾðe/', ex:'Nos vemos por la tarde.', exZh:'下午见。' }
  ]},
  { id: 'es-u9', langId: 'es', level: 'A1', title: '颜色与形容', subtitle: 'Colores y adjetivos', icon: '🎨', grammar: '形容词一般放在名词后，且要跟着变：rojo / roja / rojos / rojas。', words: [
    { id:'es-u9-1', word:'rojo', zh:'红色', pron:'/ˈroxo/', ex:'El coche es rojo.', exZh:'车是红色的。' },
    { id:'es-u9-2', word:'azul', zh:'蓝色', pron:'/aˈsul/', ex:'El cielo está azul.', exZh:'天空是蓝的。' },
    { id:'es-u9-3', word:'blanco', zh:'白色', pron:'/ˈblaŋko/', ex:'Una camisa blanca.', exZh:'一件白衬衫。' },
    { id:'es-u9-4', word:'negro', zh:'黑色', pron:'/ˈneɣɾo/', ex:'Prefiero el negro.', exZh:'我更喜欢黑的。' },
    { id:'es-u9-5', word:'grande', zh:'大', pron:'/ˈɡɾande/', ex:'Una casa grande.', exZh:'一栋大房子。' },
    { id:'es-u9-6', word:'pequeño', zh:'小', pron:'/peˈkeɲo/', ex:'Un piso pequeño.', exZh:'一间小公寓。' },
    { id:'es-u9-7', word:'nuevo', zh:'新', pron:'/ˈnweβo/', ex:'Tengo un móvil nuevo.', exZh:'我有部新手机。' },
    { id:'es-u9-8', word:'bonito', zh:'漂亮', pron:'/boˈnito/', ex:'¡Qué bonito es!', exZh:'真好看！' }
  ]},
  { id: 'es-u10', langId: 'es', level: 'A2', title: '天气与季节', subtitle: 'El tiempo', icon: '🌤️', grammar: '天气不用「是」，用 hacer / hay：Hace frío、Hace sol、Hay viento。', words: [
    { id:'es-u10-1', word:'sol', zh:'太阳', pron:'/sol/', ex:'Hace sol.', exZh:'天晴。' },
    { id:'es-u10-2', word:'lluvia', zh:'雨', pron:'/ˈʝuβja/', ex:'La lluvia no para.', exZh:'雨下个不停。' },
    { id:'es-u10-3', word:'frío', zh:'冷', pron:'/ˈfɾio/', ex:'Hace mucho frío.', exZh:'天很冷。' },
    { id:'es-u10-4', word:'calor', zh:'热', pron:'/kaˈloɾ/', ex:'Hace calor hoy.', exZh:'今天很热。' },
    { id:'es-u10-5', word:'viento', zh:'风', pron:'/ˈbjento/', ex:'Hay mucho viento.', exZh:'风很大。' },
    { id:'es-u10-6', word:'nube', zh:'云', pron:'/ˈnuβe/', ex:'Hay nubes grises.', exZh:'有乌云。' },
    { id:'es-u10-7', word:'verano', zh:'夏天', pron:'/beˈɾano/', ex:'En verano viajo.', exZh:'夏天我去旅行。' },
    { id:'es-u10-8', word:'invierno', zh:'冬天', pron:'/imˈbjeɾno/', ex:'El invierno es corto aquí.', exZh:'这儿冬天很短。' }
  ]},
  { id: 'es-u11', langId: 'es', level: 'A2', title: '方位与问路', subtitle: 'Direcciones', icon: '🧭', grammar: '问路常用命令式：Gire a la derecha / Siga todo recto；a la + 方向。', words: [
    { id:'es-u11-1', word:'derecha', zh:'右边', pron:'/deˈɾetʃa/', ex:'Gire a la derecha.', exZh:'向右转。' },
    { id:'es-u11-2', word:'izquierda', zh:'左边', pron:'/isˈkjeɾða/', ex:'Está a la izquierda.', exZh:'在左边。' },
    { id:'es-u11-3', word:'recto', zh:'直；笔直', pron:'/ˈrekto/', ex:'Siga todo recto.', exZh:'一直往前走。' },
    { id:'es-u11-4', word:'cerca', zh:'近', pron:'/ˈseɾka/', ex:'Está muy cerca.', exZh:'很近。' },
    { id:'es-u11-5', word:'lejos', zh:'远', pron:'/ˈlexos/', ex:'No está lejos.', exZh:'不远。' },
    { id:'es-u11-6', word:'esquina', zh:'拐角', pron:'/esˈkina/', ex:'En la esquina hay un banco.', exZh:'拐角有家银行。' },
    { id:'es-u11-7', word:'metro', zh:'地铁', pron:'/ˈmetɾo/', ex:'Tome el metro, línea dos.', exZh:'坐地铁二号线。' },
    { id:'es-u11-8', word:'mapa', zh:'地图', pron:'/ˈmapa/', ex:'¿Tiene un mapa?', exZh:'有地图吗？' }
  ]},
  { id: 'es-u12', langId: 'es', level: 'A2', title: '身体与健康', subtitle: 'El cuerpo y la salud', icon: '🩺', grammar: '说疼用 me duele + 身体部位（不是「我疼」，而是「头让我疼」）。', words: [
    { id:'es-u12-1', word:'cabeza', zh:'头', pron:'/kaˈβesa/', ex:'Me duele la cabeza.', exZh:'我头疼。' },
    { id:'es-u12-2', word:'mano', zh:'手', pron:'/ˈmano/', ex:'Lávate las manos.', exZh:'洗洗手。' },
    { id:'es-u12-3', word:'ojo', zh:'眼睛', pron:'/ˈoxo/', ex:'Tengo los ojos cansados.', exZh:'我眼睛很累。' },
    { id:'es-u12-4', word:'pie', zh:'脚', pron:'/pje/', ex:'Me duele el pie.', exZh:'我脚疼。' },
    { id:'es-u12-5', word:'médico', zh:'医生', pron:'/ˈmeðiko/', ex:'Necesito un médico.', exZh:'我需要看医生。' },
    { id:'es-u12-6', word:'farmacia', zh:'药店', pron:'/faɾˈmasja/', ex:'La farmacia está abierta.', exZh:'药店开着。' },
    { id:'es-u12-7', word:'enfermo', zh:'生病的', pron:'/emˈfeɾmo/', ex:'Estoy un poco enfermo.', exZh:'我有点不舒服。' },
    { id:'es-u12-8', word:'descansar', zh:'休息', pron:'/deskanˈsaɾ/', ex:'Necesito descansar.', exZh:'我需要休息。' }
  ]},
  { id: 'es-u13', langId: 'es', level: 'A2', title: '工作与学习', subtitle: 'Trabajo y estudio', icon: '💼', grammar: '介词 en 表地点、a 表方向、de 表所属：estudiante de español。', words: [
    { id:'es-u13-1', word:'oficina', zh:'办公室', pron:'/ofiˈsina/', ex:'Trabajo en una oficina.', exZh:'我在办公室上班。' },
    { id:'es-u13-2', word:'reunión', zh:'会议', pron:'/reuˈnjon/', ex:'La reunión empieza a las nueve.', exZh:'会议九点开始。' },
    { id:'es-u13-3', word:'correo', zh:'邮件', pron:'/koˈreo/', ex:'Le envío un correo.', exZh:'我给他发封邮件。' },
    { id:'es-u13-4', word:'escuela', zh:'学校', pron:'/esˈkwela/', ex:'La escuela está cerca.', exZh:'学校很近。' },
    { id:'es-u13-5', word:'estudiante', zh:'学生', pron:'/estuˈðjante/', ex:'Soy estudiante de español.', exZh:'我是西语学生。' },
    { id:'es-u13-6', word:'profesor', zh:'老师', pron:'/pɾofeˈsoɾ/', ex:'El profesor explica despacio.', exZh:'老师讲得很慢。' },
    { id:'es-u13-7', word:'examen', zh:'考试', pron:'/eɣˈsamen/', ex:'El examen es mañana.', exZh:'明天考试。' },
    { id:'es-u13-8', word:'aprender', zh:'学习', pron:'/apɾenˈdeɾ/', ex:'Quiero aprender español.', exZh:'我想学西语。' }
  ]},
  { id: 'es-u14', langId: 'es', level: 'A2', title: '核心动词', subtitle: 'Verbos esenciales', icon: '⚡', grammar: 'ser 表本质、estar 表状态与位置；querer / poder 后面接动词原形。', words: [
    { id:'es-u14-1', word:'ser', zh:'是（本质）', pron:'/seɾ/', ex:'Soy profesor.', exZh:'我是老师。', "conj": ["soy", "eres", "es", "somos", "sois", "son"] },
    { id:'es-u14-2', word:'estar', zh:'是（状态、位置）', pron:'/esˈtaɾ/', ex:'Estoy en casa.', exZh:'我在家。', "conj": ["estoy", "estás", "está", "estamos", "estáis", "están"] },
    { id:'es-u14-3', word:'tener', zh:'有', pron:'/teˈneɾ/', ex:'Tengo dos hermanos.', exZh:'我有两个兄弟。', "conj": ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"] },
    { id:'es-u14-4', word:'hacer', zh:'做', pron:'/aˈseɾ/', ex:'¿Qué haces?', exZh:'你在做什么？', "conj": ["hago", "haces", "hace", "hacemos", "hacéis", "hacen"] },
    { id:'es-u14-5', word:'ir', zh:'去', pron:'/iɾ/', ex:'Voy al mercado.', exZh:'我去市场。', "conj": ["voy", "vas", "va", "vamos", "vais", "van"] },
    { id:'es-u14-6', word:'venir', zh:'来', pron:'/beˈniɾ/', ex:'¿Vienes conmigo?', exZh:'你跟我一起来吗？', "conj": ["vengo", "vienes", "viene", "venimos", "venís", "vienen"] },
    { id:'es-u14-7', word:'querer', zh:'想要', pron:'/keˈɾeɾ/', ex:'Quiero un café.', exZh:'我想要杯咖啡。', "conj": ["quiero", "quieres", "quiere", "queremos", "queréis", "quieren"] },
    { id:'es-u14-8', word:'poder', zh:'能；可以', pron:'/poˈðeɾ/', ex:'¿Puedes ayudarme?', exZh:'你能帮我吗？', "conj": ["puedo", "puedes", "puede", "podemos", "podéis", "pueden"] }
  ]},
  { id: 'es-u15', langId: 'es', level: 'A2', title: '过去与计划', subtitle: 'Pasado y planes', icon: '📅', grammar: '简单过去时词尾 -é / -í：compré、viajé；ir 不规则变 fui。', words: [
    { id:'es-u15-1', word:'ayer', zh:'昨天', pron:'/aˈʝeɾ/', ex:'Ayer fui al cine.', exZh:'昨天我去看电影了。' },
    { id:'es-u15-2', word:'fui', zh:'我去了', pron:'/fwi/', ex:'Fui a ver a un amigo.', exZh:'我去看了个朋友。', "conj": ["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"] },
    { id:'es-u15-3', word:'compré', zh:'我买了', pron:'/komˈpɾe/', ex:'Compré un libro.', exZh:'我买了一本书。', "conj": ["compré", "compraste", "compró", "compramos", "comprasteis", "compraron"] },
    { id:'es-u15-4', word:'viaje', zh:'旅行', pron:'/ˈbjaxe/', ex:'El viaje fue corto.', exZh:'旅行很短。' },
    { id:'es-u15-5', word:'próximo', zh:'下一个', pron:'/ˈpɾoksimo/', ex:'El próximo fin de semana.', exZh:'下个周末。' },
    { id:'es-u15-6', word:'planeo', zh:'我计划', pron:'/plaˈneo/', ex:'Planeo viajar en junio.', exZh:'我打算六月去旅行。', "conj": ["planeo", "planeas", "planea", "planeamos", "planeáis", "planean"] },
    { id:'es-u15-7', word:'anoche', zh:'昨晚', pron:'/aˈnotʃe/', ex:'Anoche llovió.', exZh:'昨晚下雨了。' },
    { id:'es-u15-8', word:'nunca', zh:'从不', pron:'/ˈnuŋka/', ex:'Nunca llego tarde.', exZh:'我从不迟到。' }
  ]},
  { "id": "fr-u4", "langId": "fr", "level": "A1", "title": "数字与计数", "subtitle": "Les nombres", "icon": "🔢", "grammar": "数字 1–10：un / deux / trois；un 在阴性名词前变 une（une table）。", "words": [
    { "id":"fr-u4-1", "word":"un", "zh":"一", "pron":"/œ̃/", "ex":"Un, deux, trois.", "exZh":"一、二、三。" },
    { "id":"fr-u4-2", "word":"deux", "zh":"二", "pron":"/dø/", "ex":"Je voudrais deux cafés.", "exZh":"我要两杯咖啡。" },
    { "id":"fr-u4-3", "word":"trois", "zh":"三", "pron":"/tʁwa/", "ex":"Trois personnes, merci.", "exZh":"三个人，谢谢。" },
    { "id":"fr-u4-4", "word":"dix", "zh":"十", "pron":"/dis/", "ex":"Il est dix heures.", "exZh":"现在十点。" },
    { "id":"fr-u4-5", "word":"cent", "zh":"一百", "pron":"/sɑ̃/", "ex":"Ça coûte cent euros.", "exZh":"要一百欧元。" },
    { "id":"fr-u4-6", "word":"premier", "zh":"第一", "pron":"/pʁə.mje/", "ex":"C'est mon premier jour.", "exZh":"这是我第一天。" },
    { "id":"fr-u4-7", "word":"beaucoup", "zh":"很多", "pron":"/bo.ku/", "ex":"Il y a beaucoup de monde ici.", "exZh":"这里有很多人。" },
    { "id":"fr-u4-8", "word":"peu", "zh":"一点；少", "pron":"/pø/", "ex":"Un peu de sucre, merci.", "exZh":"请给我一点糖。" }
  ]},
  { "id": "fr-u5", "langId": "fr", "level": "A1", "title": "自我介绍", "subtitle": "Se présenter", "icon": "🙋", "grammar": "「我叫」用 s’appeler：Je m’appelle Ana；「我是」用 être：Je suis chinois。", "words": [
    { "id":"fr-u5-1", "word":"je m'appelle", "zh":"我叫", "pron":"/ʒə ma.pɛl/", "ex":"Je m'appelle Ana.", "exZh":"我叫安娜。" },
    { "id":"fr-u5-2", "word":"je suis", "zh":"我是", "pron":"/ʒə sɥi/", "ex":"Je suis chinois.", "exZh":"我是中国人。" },
    { "id":"fr-u5-3", "word":"nom", "zh":"名字", "pron":"/nɔ̃/", "ex":"Quel est ton nom ?", "exZh":"你叫什么名字？" },
    { "id":"fr-u5-4", "word":"venir de", "zh":"从；来自", "pron":"/və.niʁ də/", "ex":"Je viens de Shanghaï.", "exZh":"我来自上海。" },
    { "id":"fr-u5-5", "word":"j'habite", "zh":"我住", "pron":"/ʒa.bit/", "ex":"J'habite au centre-ville.", "exZh":"我住在市中心。" },
    { "id":"fr-u5-6", "word":"an", "zh":"岁；年", "pron":"/ɑ̃/", "ex":"J'ai vingt ans.", "exZh":"我二十岁。" },
    { "id":"fr-u5-7", "word":"enchanté", "zh":"高兴；愉快", "pron":"/ɑ̃.ʃɑ̃.te/", "ex":"Enchanté de vous connaître.", "exZh":"很高兴认识你。" },
    { "id":"fr-u5-8", "word":"aussi", "zh":"也", "pron":"/o.si/", "ex":"Moi aussi.", "exZh":"我也是。" }
  ]},
  { "id": "fr-u6", "langId": "fr", "level": "A1", "title": "家庭与人物", "subtitle": "La famille", "icon": "👨‍👩‍👧", "grammar": "物主形容词随名词变性数：ma mère、mon père、mes sœurs。", "words": [
    { "id":"fr-u6-1", "word":"famille", "zh":"家庭", "pron":"/fa.mij/", "ex":"Ma famille est grande.", "exZh":"我家人口多。" },
    { "id":"fr-u6-2", "word":"mère", "zh":"母亲", "pron":"/mɛʁ/", "ex":"Ma mère cuisine bien.", "exZh":"我妈妈做饭很好吃。" },
    { "id":"fr-u6-3", "word":"père", "zh":"父亲", "pron":"/pɛʁ/", "ex":"Mon père travaille ici.", "exZh":"我爸爸在这儿工作。" },
    { "id":"fr-u6-4", "word":"fils", "zh":"儿子", "pron":"/fis/", "ex":"J'ai un fils.", "exZh":"我有一个儿子。" },
    { "id":"fr-u6-5", "word":"sœur", "zh":"姐妹", "pron":"/sœʁ/", "ex":"Ma sœur étudie.", "exZh":"我姐姐在读书。" },
    { "id":"fr-u6-6", "word":"mari", "zh":"丈夫", "pron":"/ma.ʁi/", "ex":"Son mari est médecin.", "exZh":"她丈夫是医生。" },
    { "id":"fr-u6-7", "word":"enfant", "zh":"小孩", "pron":"/ɑ̃.fɑ̃/", "ex":"L'enfant joue.", "exZh":"小孩在玩。" },
    { "id":"fr-u6-8", "word":"personne", "zh":"人", "pron":"/pɛʁ.sɔn/", "ex":"C'est une personne gentille.", "exZh":"他是个和善的人。" }
  ]},
  { "id": "fr-u7", "langId": "fr", "level": "A1", "title": "饮食", "subtitle": "Manger et boire", "icon": "🍽️", "grammar": "部分冠词 du / de la / des 表不可数：Je veux du pain、de l’eau。", "words": [
    { "id":"fr-u7-1", "word":"petit-déjeuner", "zh":"早餐", "pron":"/pə.ti de.ʒœ.ne/", "ex":"Je prends le petit-déjeuner à sept heures.", "exZh":"我七点吃早饭。" },
    { "id":"fr-u7-2", "word":"pain", "zh":"面包", "pron":"/pɛ̃/", "ex":"Je voudrais du pain.", "exZh":"我要面包。" },
    { "id":"fr-u7-3", "word":"café", "zh":"咖啡", "pron":"/ka.fe/", "ex":"Un café, s'il vous plaît.", "exZh":"一杯咖啡。" },
    { "id":"fr-u7-4", "word":"riz", "zh":"米饭", "pron":"/ʁi/", "ex":"Le riz est prêt.", "exZh":"米饭好了。" },
    { "id":"fr-u7-5", "word":"viande", "zh":"肉", "pron":"/vjɑ̃d/", "ex":"Je ne mange pas de viande.", "exZh":"我不吃肉。" },
    { "id":"fr-u7-6", "word":"poisson", "zh":"鱼", "pron":"/pwa.sɔ̃/", "ex":"Le poisson est frais.", "exZh":"这鱼很新鲜。" },
    { "id":"fr-u7-7", "word":"légume", "zh":"蔬菜", "pron":"/le.ɡym/", "ex":"Mange plus de légumes.", "exZh":"多吃点蔬菜。" },
    { "id":"fr-u7-8", "word":"boisson", "zh":"饮料", "pron":"/bwa.sɔ̃/", "ex":"Quelle boisson veux-tu ?", "exZh":"你想喝什么？" }
  ]},
  { "id": "fr-u8", "langId": "fr", "level": "A1", "title": "时间与日期", "subtitle": "L'heure et la date", "icon": "🕐", "grammar": "问时间 Quelle heure est-il ? / Il est dix heures；「下午」用 de l’après-midi。", "words": [
    { "id":"fr-u8-1", "word":"heure", "zh":"小时；点钟", "pron":"/œʁ/", "ex":"Quelle heure est-il ?", "exZh":"现在几点？" },
    { "id":"fr-u8-2", "word":"jour", "zh":"天；日", "pron":"/ʒuʁ/", "ex":"Aujourd'hui est un beau jour.", "exZh":"今天是个好日子。" },
    { "id":"fr-u8-3", "word":"semaine", "zh":"星期", "pron":"/sə.mɛn/", "ex":"À la semaine prochaine.", "exZh":"下周见。" },
    { "id":"fr-u8-4", "word":"mois", "zh":"月", "pron":"/mwa/", "ex":"Le mois prochain.", "exZh":"下个月。" },
    { "id":"fr-u8-5", "word":"année", "zh":"年", "pron":"/a.ne/", "ex":"Bonne année !", "exZh":"新年快乐。" },
    { "id":"fr-u8-6", "word":"lundi", "zh":"星期一", "pron":"/lœ̃.di/", "ex":"Je commence lundi.", "exZh":"我周一开始。" },
    { "id":"fr-u8-7", "word":"maintenant", "zh":"现在", "pron":"/mɛ̃t.nɑ̃/", "ex":"Je sors maintenant.", "exZh":"我现在出门。" },
    { "id":"fr-u8-8", "word":"après-midi", "zh":"下午", "pron":"/a.pʁɛ mi.di/", "ex":"À cet après-midi.", "exZh":"下午见。" }
  ]},
  { "id": "fr-u9", "langId": "fr", "level": "A1", "title": "颜色与形容", "subtitle": "Couleurs et adjectifs", "icon": "🎨", "grammar": "形容词一般放名词后并变性数：une voiture rouge / des voitures rouges。", "words": [
    { "id":"fr-u9-1", "word":"rouge", "zh":"红色", "pron":"/ʁuʒ/", "ex":"La voiture est rouge.", "exZh":"车是红色的。" },
    { "id":"fr-u9-2", "word":"bleu", "zh":"蓝色", "pron":"/blø/", "ex":"Le ciel est bleu.", "exZh":"天空是蓝的。" },
    { "id":"fr-u9-3", "word":"blanc", "zh":"白色", "pron":"/blɑ̃/", "ex":"Une chemise blanche.", "exZh":"一件白衬衫。" },
    { "id":"fr-u9-4", "word":"noir", "zh":"黑色", "pron":"/nwaʁ/", "ex":"Je préfère le noir.", "exZh":"我更喜欢黑的。" },
    { "id":"fr-u9-5", "word":"grand", "zh":"大", "pron":"/ɡʁɑ̃/", "ex":"Une grande maison.", "exZh":"一栋大房子。" },
    { "id":"fr-u9-6", "word":"petit", "zh":"小", "pron":"/pə.ti/", "ex":"Un petit appartement.", "exZh":"一间小公寓。" },
    { "id":"fr-u9-7", "word":"nouveau", "zh":"新", "pron":"/nu.vo/", "ex":"J'ai un nouveau téléphone.", "exZh":"我有一部新手机。" },
    { "id":"fr-u9-8", "word":"beau", "zh":"漂亮", "pron":"/bo/", "ex":"C'est très beau !", "exZh":"真好看！" }
  ]},
  { "id": "fr-u10", "langId": "fr", "level": "A2", "title": "天气与季节", "subtitle": "Le temps", "icon": "🌤️", "grammar": "天气用 il fait / il y a：Il fait froid、Il fait soleil、Il y a du vent。", "words": [
    { "id":"fr-u10-1", "word":"soleil", "zh":"太阳", "pron":"/sɔ.lɛj/", "ex":"Il y a du soleil aujourd'hui.", "exZh":"今天出太阳。" },
    { "id":"fr-u10-2", "word":"pluie", "zh":"雨", "pron":"/plɥi/", "ex":"La pluie commence.", "exZh":"下雨了。" },
    { "id":"fr-u10-3", "word":"froid", "zh":"冷", "pron":"/fʁwa/", "ex":"Il fait froid aujourd'hui.", "exZh":"今天很冷。" },
    { "id":"fr-u10-4", "word":"chaud", "zh":"热", "pron":"/ʃo/", "ex":"Il fait chaud aujourd'hui.", "exZh":"今天很热。" },
    { "id":"fr-u10-5", "word":"vent", "zh":"风", "pron":"/vɑ̃/", "ex":"Il y a du vent.", "exZh":"有风。" },
    { "id":"fr-u10-6", "word":"nuage", "zh":"云", "pron":"/nɥaʒ/", "ex":"Il y a beaucoup de nuages.", "exZh":"天上有很多云。" },
    { "id":"fr-u10-7", "word":"été", "zh":"夏天", "pron":"/e.te/", "ex":"Il fait chaud en été.", "exZh":"夏天很热。" },
    { "id":"fr-u10-8", "word":"hiver", "zh":"冬天", "pron":"/i.vɛʁ/", "ex":"Il neige en hiver.", "exZh":"冬天下雪。" }
  ]},
  { "id": "fr-u11", "langId": "fr", "level": "A2", "title": "方位与问路", "subtitle": "Les directions", "icon": "🧭", "grammar": "问路常用命令式：Tournez à droite / Allez tout droit；à la + 方向。", "words": [
    { "id":"fr-u11-1", "word":"droite", "zh":"右边", "pron":"/dʁwat/", "ex":"Tournez à droite.", "exZh":"向右转。" },
    { "id":"fr-u11-2", "word":"gauche", "zh":"左边", "pron":"/ɡoʃ/", "ex":"Tournez à gauche.", "exZh":"向左转。" },
    { "id":"fr-u11-3", "word":"tout droit", "zh":"直；笔直", "pron":"/tu dʁwa/", "ex":"Allez tout droit.", "exZh":"一直往前走。" },
    { "id":"fr-u11-4", "word":"près", "zh":"近", "pron":"/pʁɛ/", "ex":"La gare est près d'ici.", "exZh":"车站很近。" },
    { "id":"fr-u11-5", "word":"loin", "zh":"远", "pron":"/lwɛ̃/", "ex":"La gare est loin.", "exZh":"车站很远。" },
    { "id":"fr-u11-6", "word":"coin", "zh":"拐角", "pron":"/kwɛ̃/", "ex":"C'est au coin de la rue.", "exZh":"在拐角处。" },
    { "id":"fr-u11-7", "word":"métro", "zh":"地铁", "pron":"/me.tʁo/", "ex":"Je prends le métro.", "exZh":"我坐地铁去。" },
    { "id":"fr-u11-8", "word":"carte", "zh":"地图", "pron":"/kaʁt/", "ex":"Regarde la carte.", "exZh":"看一下地图。" }
  ]},
  { "id": "fr-u12", "langId": "fr", "level": "A2", "title": "身体与健康", "subtitle": "Le corps et la santé", "icon": "🩺", "grammar": "说疼用 avoir mal à：J’ai mal à la tête（不是「我疼」）。", "words": [
    { "id":"fr-u12-1", "word":"tête", "zh":"头", "pron":"/tɛt/", "ex":"J'ai mal à la tête.", "exZh":"我头疼。" },
    { "id":"fr-u12-2", "word":"main", "zh":"手", "pron":"/mɛ̃/", "ex":"Lave-toi les mains.", "exZh":"洗洗手。" },
    { "id":"fr-u12-3", "word":"œil", "zh":"眼睛", "pron":"/œj/", "ex":"J'ai les yeux fatigués.", "exZh":"眼睛很累。" },
    { "id":"fr-u12-4", "word":"pied", "zh":"脚", "pron":"/pje/", "ex":"J'ai mal au pied.", "exZh":"我的脚疼。" },
    { "id":"fr-u12-5", "word":"médecin", "zh":"医生", "pron":"/med.sɛ̃/", "ex":"Va voir le médecin.", "exZh":"去看医生。" },
    { "id":"fr-u12-6", "word":"pharmacie", "zh":"药店", "pron":"/faʁ.ma.si/", "ex":"Où est la pharmacie ?", "exZh":"药店在哪里？" },
    { "id":"fr-u12-7", "word":"malade", "zh":"生病的", "pron":"/ma.lad/", "ex":"Je suis malade.", "exZh":"我生病了。" },
    { "id":"fr-u12-8", "word":"repos", "zh":"休息", "pron":"/ʁə.po/", "ex":"Tu as besoin de repos.", "exZh":"你需要休息。" }
  ]},
  { "id": "fr-u13", "langId": "fr", "level": "A2", "title": "工作与学习", "subtitle": "Travail et études", "icon": "💼", "grammar": "介词 à / en / de：Je suis au bureau、étudiant de français。", "words": [
    { "id":"fr-u13-1", "word":"bureau", "zh":"办公室", "pron":"/by.ʁo/", "ex":"Je suis au bureau.", "exZh":"我在办公室。" },
    { "id":"fr-u13-2", "word":"réunion", "zh":"会议", "pron":"/ʁe.y.njɔ̃/", "ex":"La réunion est à trois heures.", "exZh":"三点开会。" },
    { "id":"fr-u13-3", "word":"e-mail", "zh":"邮件", "pron":"/i.mɛl/", "ex":"J'envoie un e-mail.", "exZh":"我发一封邮件。" },
    { "id":"fr-u13-4", "word":"école", "zh":"学校", "pron":"/e.kɔl/", "ex":"L'école est près d'ici.", "exZh":"学校很近。" },
    { "id":"fr-u13-5", "word":"étudiant", "zh":"学生", "pron":"/e.ty.djɑ̃/", "ex":"Je suis étudiant.", "exZh":"我是学生。" },
    { "id":"fr-u13-6", "word":"professeur", "zh":"老师", "pron":"/pʁɔ.fɛ.sœʁ/", "ex":"Le professeur est gentil.", "exZh":"老师很好。" },
    { "id":"fr-u13-7", "word":"examen", "zh":"考试", "pron":"/ɛɡ.za.mɛ̃/", "ex":"J'ai un examen demain.", "exZh":"明天有考试。" },
    { "id":"fr-u13-8", "word":"étudier", "zh":"学习", "pron":"/e.ty.dje/", "ex":"J'étudie les langues.", "exZh":"我学外语。" }
  ]},
  { "id": "fr-u14", "langId": "fr", "level": "A2", "title": "核心动词", "subtitle": "Verbes essentiels", "icon": "⚡", "grammar": "être 表本质，aller / venir / vouloir / pouvoir 后接动词原形。", "words": [
    { "id":"fr-u14-1", "word":"être", "zh":"是（本质）", "pron":"/ɛtʁ/", "ex":"Je suis professeur.", "exZh":"我是老师。" },
    { "id":"fr-u14-2", "word":"se trouver", "zh":"在；位于", "pron":"/sə tʁu.ve/", "ex":"Je me trouve à la maison.", "exZh":"我在家。" },
    { "id":"fr-u14-3", "word":"avoir", "zh":"有", "pron":"/a.vwaʁ/", "ex":"J'ai deux frères.", "exZh":"我有两个兄弟。" },
    { "id":"fr-u14-4", "word":"faire", "zh":"做", "pron":"/fɛʁ/", "ex":"Qu'est-ce que tu fais ?", "exZh":"你在做什么？" },
    { "id":"fr-u14-5", "word":"aller", "zh":"去", "pron":"/a.le/", "ex":"Je vais au marché.", "exZh":"我去市场。" },
    { "id":"fr-u14-6", "word":"venir", "zh":"来", "pron":"/və.niʁ/", "ex":"Tu viens avec moi ?", "exZh":"你跟我一起来吗？" },
    { "id":"fr-u14-7", "word":"vouloir", "zh":"想要", "pron":"/vu.lwaʁ/", "ex":"Je veux un café.", "exZh":"我想要杯咖啡。" },
    { "id":"fr-u14-8", "word":"pouvoir", "zh":"能；可以", "pron":"/pu.vwaʁ/", "ex":"Peux-tu m'aider ?", "exZh":"你能帮我吗？" }
  ]},
  { "id": "fr-u15", "langId": "fr", "level": "A2", "title": "过去与计划", "subtitle": "Passé et projets", "icon": "📅", "grammar": "复合过去时 passé composé：j’ai acheté、je suis allé(e)；aller 用 être 作助动词。", "words": [
    { "id":"fr-u15-1", "word":"hier", "zh":"昨天", "pron":"/jɛʁ/", "ex":"Hier je suis allé au cinéma.", "exZh":"昨天我去看电影了。" },
    { "id":"fr-u15-2", "word":"allé", "zh":"我去了", "pron":"/a.le/", "ex":"Je suis allé voir un ami.", "exZh":"我去看了个朋友。" },
    { "id":"fr-u15-3", "word":"acheté", "zh":"我买了", "pron":"/aʃ.te/", "ex":"J'ai acheté un livre.", "exZh":"我买了一本书。" },
    { "id":"fr-u15-4", "word":"voyage", "zh":"旅行", "pron":"/vwa.jaʒ/", "ex":"Le voyage était court.", "exZh":"旅行很短。" },
    { "id":"fr-u15-5", "word":"prochain", "zh":"下一个", "pron":"/pʁɔ.ʃɛ̃/", "ex":"Le week-end prochain.", "exZh":"下个周末。" },
    { "id":"fr-u15-6", "word":"prévoir", "zh":"我计划", "pron":"/pʁe.vwaʁ/", "ex":"Je prévois de voyager en juin.", "exZh":"我打算六月去旅行。" },
    { "id":"fr-u15-7", "word":"hier soir", "zh":"昨晚", "pron":"/jɛʁ swaʁ/", "ex":"Hier soir il a plu.", "exZh":"昨晚下雨了。" },
    { "id":"fr-u15-8", "word":"jamais", "zh":"从不", "pron":"/ʒa.mɛ/", "ex":"Je n'arrive jamais en retard.", "exZh":"我从不迟到。" }
  ]},
  { "id": "ru-u4", "langId": "ru", "level": "A1", "title": "数字与计数", "subtitle": "Числа", "icon": "🔢", "grammar": "数字 один / два / три；два 后接单数二格：два кофе。", "words": [
    { "id":"ru-u4-1", "word":"один", "zh":"一", "pron":"/ɐˈdʲin/", "ex":"Один, два, три.", "exZh":"一、二、三。" },
    { "id":"ru-u4-2", "word":"два", "zh":"二", "pron":"/dva/", "ex":"Два кофе, пожалуйста.", "exZh":"我要两杯咖啡。" },
    { "id":"ru-u4-3", "word":"три", "zh":"三", "pron":"/trʲi/", "ex":"Три человека, спасибо.", "exZh":"三个人，谢谢。" },
    { "id":"ru-u4-4", "word":"десять", "zh":"十", "pron":"/ˈdʲesʲɪtʲ/", "ex":"Сейчас десять часов.", "exZh":"现在十点。" },
    { "id":"ru-u4-5", "word":"сто", "zh":"一百", "pron":"/sto/", "ex":"Это стоит сто евро.", "exZh":"要一百欧元。" },
    { "id":"ru-u4-6", "word":"первый", "zh":"第一", "pron":"/ˈpʲervɨj/", "ex":"Это мой первый день.", "exZh":"这是我第一天。" },
    { "id":"ru-u4-7", "word":"много", "zh":"很多", "pron":"/ˈmnogə/", "ex":"Здесь много людей.", "exZh":"这里有很多人。" },
    { "id":"ru-u4-8", "word":"немного", "zh":"一点；少", "pron":"/nʲɪˈmnogə/", "ex":"Немного сахара, пожалуйста.", "exZh":"请给我一点糖。" }
  ]},
  { "id": "ru-u5", "langId": "ru", "level": "A1", "title": "自我介绍", "subtitle": "Знакомство", "icon": "🙋", "grammar": "「我叫」用 Меня зовут Аня；«我是中国人» 用 Я китаец（китаянка）。", "words": [
    { "id":"ru-u5-1", "word":"меня зовут", "zh":"我叫", "pron":"/mʲɪˈnʲa zɐˈvut/", "ex":"Меня зовут Анна.", "exZh":"我叫安娜。" },
    { "id":"ru-u5-2", "word":"я", "zh":"我是", "pron":"/ja/", "ex":"Я китаец.", "exZh":"我是中国人。" },
    { "id":"ru-u5-3", "word":"имя", "zh":"名字", "pron":"/ˈimʲə/", "ex":"Как тебя зовут?", "exZh":"你叫什么名字？" },
    { "id":"ru-u5-4", "word":"из", "zh":"从；来自", "pron":"/iz/", "ex":"Я из Шанхая.", "exZh":"我来自上海。" },
    { "id":"ru-u5-5", "word":"живу", "zh":"我住", "pron":"/ʐɨˈvu/", "ex":"Я живу в центре.", "exZh":"我住在市中心。" },
    { "id":"ru-u5-6", "word":"лет", "zh":"岁；年", "pron":"/lʲet/", "ex":"Мне двадцать лет.", "exZh":"我二十岁。" },
    { "id":"ru-u5-7", "word":"приятно", "zh":"高兴；愉快", "pron":"/prʲɪˈjatnə/", "ex":"Приятно познакомиться.", "exZh":"很高兴认识你。" },
    { "id":"ru-u5-8", "word":"тоже", "zh":"也", "pron":"/ˈtoʐə/", "ex":"Я тоже.", "exZh":"我也是。" }
  ]},
  { "id": "ru-u6", "langId": "ru", "level": "A1", "title": "家庭与人物", "subtitle": "Семья", "icon": "👨‍👩‍👧", "grammar": "物主词 мой / моя / моё 随名词变性数：моя мать、мой отец。", "words": [
    { "id":"ru-u6-1", "word":"семья", "zh":"家庭", "pron":"/sʲɪˈmʲja/", "ex":"Моя семья большая.", "exZh":"我家人口多。" },
    { "id":"ru-u6-2", "word":"мать", "zh":"母亲", "pron":"/matʲ/", "ex":"Моя мать хорошо готовит.", "exZh":"我妈妈做饭很好吃。" },
    { "id":"ru-u6-3", "word":"отец", "zh":"父亲", "pron":"/ɐˈtʲets/", "ex":"Мой отец работает здесь.", "exZh":"我爸爸在这儿工作。" },
    { "id":"ru-u6-4", "word":"сын", "zh":"儿子", "pron":"/sɨn/", "ex":"У меня есть сын.", "exZh":"我有一个儿子。" },
    { "id":"ru-u6-5", "word":"сестра", "zh":"姐妹", "pron":"/sʲɪˈstra/", "ex":"Моя сестра учится.", "exZh":"我姐姐在读书。" },
    { "id":"ru-u6-6", "word":"муж", "zh":"丈夫", "pron":"/muʂ/", "ex":"Её муж врач.", "exZh":"她丈夫是医生。" },
    { "id":"ru-u6-7", "word":"ребёнок", "zh":"小孩", "pron":"/rʲɪˈbʲonək/", "ex":"Ребёнок играет.", "exZh":"小孩在玩。" },
    { "id":"ru-u6-8", "word":"человек", "zh":"人", "pron":"/tɕɪlɐˈvʲek/", "ex":"Он добрый человек.", "exZh":"他是个和善的人。" }
  ]},
  { "id": "ru-u7", "langId": "ru", "level": "A1", "title": "饮食", "subtitle": "Еда и напитки", "icon": "🍽️", "grammar": "«我想要» 用 Я хочу + 宾格：Я хочу кофе；«我不吃肉» Я не ем мясо。", "words": [
    { "id":"ru-u7-1", "word":"завтрак", "zh":"早餐", "pron":"/ˈzavtrək/", "ex":"Завтрак в семь часов.", "exZh":"我七点吃早饭。" },
    { "id":"ru-u7-2", "word":"хлеб", "zh":"面包", "pron":"/xlʲep/", "ex":"Дайте хлеб, пожалуйста.", "exZh":"我要面包。" },
    { "id":"ru-u7-3", "word":"кофе", "zh":"咖啡", "pron":"/ˈkofʲe/", "ex":"Кофе, пожалуйста.", "exZh":"一杯咖啡。" },
    { "id":"ru-u7-4", "word":"рис", "zh":"米饭", "pron":"/rʲis/", "ex":"Рис готов.", "exZh":"米饭好了。" },
    { "id":"ru-u7-5", "word":"мясо", "zh":"肉", "pron":"/ˈmʲasə/", "ex":"Я не ем мясо.", "exZh":"我不吃肉。" },
    { "id":"ru-u7-6", "word":"рыба", "zh":"鱼", "pron":"/ˈrɨbə/", "ex":"Рыба свежая.", "exZh":"这鱼很新鲜。" },
    { "id":"ru-u7-7", "word":"овощи", "zh":"蔬菜", "pron":"/ˈovəɕːɪ/", "ex":"Ешь больше овощей.", "exZh":"多吃点蔬菜。" },
    { "id":"ru-u7-8", "word":"напиток", "zh":"饮料", "pron":"/nɐˈpʲitək/", "ex":"Какой напиток ты хочешь?", "exZh":"你想喝什么？" }
  ]},
  { "id": "ru-u8", "langId": "ru", "level": "A1", "title": "时间与日期", "subtitle": "Время и дата", "icon": "🕐", "grammar": "«几点» Который час? / Сейчас десять часов；«在下午» после обеда。", "words": [
    { "id":"ru-u8-1", "word":"час", "zh":"小时；点钟", "pron":"/tɕas/", "ex":"Который час?", "exZh":"现在几点？" },
    { "id":"ru-u8-2", "word":"день", "zh":"天；日", "pron":"/dʲenʲ/", "ex":"Сегодня хороший день.", "exZh":"今天是个好日子。" },
    { "id":"ru-u8-3", "word":"неделя", "zh":"星期", "pron":"/nʲɪˈdʲelʲə/", "ex":"До следующей недели.", "exZh":"下周见。" },
    { "id":"ru-u8-4", "word":"месяц", "zh":"月", "pron":"/ˈmʲesʲɪts/", "ex":"В следующем месяце.", "exZh":"下个月。" },
    { "id":"ru-u8-5", "word":"год", "zh":"年", "pron":"/got/", "ex":"С Новым годом!", "exZh":"新年快乐。" },
    { "id":"ru-u8-6", "word":"понедельник", "zh":"星期一", "pron":"/pənʲɪˈdʲelʲnʲɪk/", "ex":"Начну в понедельник.", "exZh":"我周一开始。" },
    { "id":"ru-u8-7", "word":"сейчас", "zh":"现在", "pron":"/sʲɪˈtɕas/", "ex":"Я сейчас выхожу.", "exZh":"我现在出门。" },
    { "id":"ru-u8-8", "word":"днём", "zh":"下午", "pron":"/dnʲom/", "ex":"Увидимся днём.", "exZh":"下午见。" }
  ]},
  { "id": "ru-u9", "langId": "ru", "level": "A1", "title": "颜色与形容", "subtitle": "Цвета и прилагательные", "icon": "🎨", "grammar": "形容词随名词变性数：красная машина、синее небо。", "words": [
    { "id":"ru-u9-1", "word":"красный", "zh":"红色", "pron":"/ˈkrasnɨj/", "ex":"Машина красная.", "exZh":"车是红色的。" },
    { "id":"ru-u9-2", "word":"синий", "zh":"蓝色", "pron":"/ˈsʲinʲɪj/", "ex":"Небо синее.", "exZh":"天空是蓝的。" },
    { "id":"ru-u9-3", "word":"белый", "zh":"白色", "pron":"/ˈbʲelɨj/", "ex":"Белая рубашка.", "exZh":"一件白衬衫。" },
    { "id":"ru-u9-4", "word":"чёрный", "zh":"黑色", "pron":"/ˈtɕornɨj/", "ex":"Я предпочитаю чёрный.", "exZh":"我更喜欢黑的。" },
    { "id":"ru-u9-5", "word":"большой", "zh":"大", "pron":"/bɐlʲˈʂoj/", "ex":"Большой дом.", "exZh":"一栋大房子。" },
    { "id":"ru-u9-6", "word":"маленький", "zh":"小", "pron":"/ˈmalʲɪnʲkʲɪj/", "ex":"Маленькая квартира.", "exZh":"一间小公寓。" },
    { "id":"ru-u9-7", "word":"новый", "zh":"新", "pron":"/ˈnovɨj/", "ex":"У меня новый телефон.", "exZh":"我有一部新手机。" },
    { "id":"ru-u9-8", "word":"красивый", "zh":"漂亮", "pron":"/krɐˈsʲivɨj/", "ex":"Очень красиво!", "exZh":"真好看！" }
  ]},
  { "id": "ru-u10", "langId": "ru", "level": "A2", "title": "天气与季节", "subtitle": "Погода", "icon": "🌤️", "grammar": "天气用 «Сегодня + 副词/动词»：Сегодня холодно、Идёт дождь。", "words": [
    { "id":"ru-u10-1", "word":"солнце", "zh":"太阳", "pron":"/ˈsontsə/", "ex":"Сегодня светит солнце.", "exZh":"今天出太阳。" },
    { "id":"ru-u10-2", "word":"дождь", "zh":"雨", "pron":"/doʂtʲ/", "ex":"Идёт дождь.", "exZh":"下雨了。" },
    { "id":"ru-u10-3", "word":"холодно", "zh":"冷", "pron":"/ˈxolədnə/", "ex":"Сегодня холодно.", "exZh":"今天很冷。" },
    { "id":"ru-u10-4", "word":"жарко", "zh":"热", "pron":"/ˈʐarkə/", "ex":"Сегодня жарко.", "exZh":"今天很热。" },
    { "id":"ru-u10-5", "word":"ветер", "zh":"风", "pron":"/ˈvʲetʲɪr/", "ex":"Дует ветер.", "exZh":"有风。" },
    { "id":"ru-u10-6", "word":"облако", "zh":"云", "pron":"/ˈobləkə/", "ex":"На небе много облаков.", "exZh":"天上有很多云。" },
    { "id":"ru-u10-7", "word":"лето", "zh":"夏天", "pron":"/ˈlʲetə/", "ex":"Летом жарко.", "exZh":"夏天很热。" },
    { "id":"ru-u10-8", "word":"зима", "zh":"冬天", "pron":"/zʲɪˈma/", "ex":"Зимой идёт снег.", "exZh":"冬天下雪。" }
  ]},
  { "id": "ru-u11", "langId": "ru", "level": "A2", "title": "方位与问路", "subtitle": "Направления", "icon": "🧭", "grammar": "«向右» направо、«向左» налево、«一直» прямо；命令式 Идите прямо。", "words": [
    { "id":"ru-u11-1", "word":"направо", "zh":"右边", "pron":"/nɐˈpravə/", "ex":"Поверните направо.", "exZh":"向右转。" },
    { "id":"ru-u11-2", "word":"налево", "zh":"左边", "pron":"/nɐˈlʲevə/", "ex":"Поверните налево.", "exZh":"向左转。" },
    { "id":"ru-u11-3", "word":"прямо", "zh":"直；笔直", "pron":"/ˈprʲamə/", "ex":"Идите прямо.", "exZh":"一直往前走。" },
    { "id":"ru-u11-4", "word":"близко", "zh":"近", "pron":"/ˈblʲiskə/", "ex":"Вокзал близко.", "exZh":"车站很近。" },
    { "id":"ru-u11-5", "word":"далеко", "zh":"远", "pron":"/dəlʲɪˈko/", "ex":"Вокзал далеко.", "exZh":"车站很远。" },
    { "id":"ru-u11-6", "word":"угол", "zh":"拐角", "pron":"/ˈugəl/", "ex":"На углу.", "exZh":"在拐角处。" },
    { "id":"ru-u11-7", "word":"метро", "zh":"地铁", "pron":"/mʲɪˈtro/", "ex":"Я еду на метро.", "exZh":"我坐地铁去。" },
    { "id":"ru-u11-8", "word":"карта", "zh":"地图", "pron":"/ˈkartə/", "ex":"Посмотри на карту.", "exZh":"看一下地图。" }
  ]},
  { "id": "ru-u12", "langId": "ru", "level": "A2", "title": "身体与健康", "subtitle": "Тело и здоровье", "icon": "🩺", "grammar": "«我头疼» У меня болит голова（用 у меня + болит）。", "words": [
    { "id":"ru-u12-1", "word":"голова", "zh":"头", "pron":"/ɡəlɐˈva/", "ex":"У меня болит голова.", "exZh":"我头疼。" },
    { "id":"ru-u12-2", "word":"рука", "zh":"手", "pron":"/rʊˈka/", "ex":"Вымой руки.", "exZh":"洗洗手。" },
    { "id":"ru-u12-3", "word":"глаз", "zh":"眼睛", "pron":"/glas/", "ex":"Глаза устали.", "exZh":"眼睛很累。" },
    { "id":"ru-u12-4", "word":"нога", "zh":"脚", "pron":"/nɐˈɡa/", "ex":"У меня болит нога.", "exZh":"我的脚疼。" },
    { "id":"ru-u12-5", "word":"врач", "zh":"医生", "pron":"/vratɕ/", "ex":"Иди к врачу.", "exZh":"去看医生。" },
    { "id":"ru-u12-6", "word":"аптека", "zh":"药店", "pron":"/ɐpˈtʲekə/", "ex":"Где аптека?", "exZh":"药店在哪里？" },
    { "id":"ru-u12-7", "word":"больной", "zh":"生病的", "pron":"/bɐlʲˈnoj/", "ex":"Я болен.", "exZh":"我生病了。" },
    { "id":"ru-u12-8", "word":"отдых", "zh":"休息", "pron":"/ˈoddɨx/", "ex":"Тебе нужен отдых.", "exZh":"你需要休息。" }
  ]},
  { "id": "ru-u13", "langId": "ru", "level": "A2", "title": "工作与学习", "subtitle": "Работа и учёба", "icon": "💼", "grammar": "前置词 в / на 表地点：Я в офисе、в школе。", "words": [
    { "id":"ru-u13-1", "word":"офис", "zh":"办公室", "pron":"/ˈofʲɪs/", "ex":"Я в офисе.", "exZh":"我在办公室。" },
    { "id":"ru-u13-2", "word":"встреча", "zh":"会议", "pron":"/ˈfstrʲetɕə/", "ex":"Встреча в три часа.", "exZh":"三点开会。" },
    { "id":"ru-u13-3", "word":"письмо", "zh":"邮件", "pron":"/pʲɪsʲˈmo/", "ex":"Я отправлю письмо.", "exZh":"我发一封邮件。" },
    { "id":"ru-u13-4", "word":"школа", "zh":"学校", "pron":"/ˈʃkolə/", "ex":"Школа рядом.", "exZh":"学校很近。" },
    { "id":"ru-u13-5", "word":"студент", "zh":"学生", "pron":"/stʊˈdʲent/", "ex":"Я студент.", "exZh":"我是学生。" },
    { "id":"ru-u13-6", "word":"учитель", "zh":"老师", "pron":"/ʊˈtɕitʲɪlʲ/", "ex":"Учитель добрый.", "exZh":"老师很好。" },
    { "id":"ru-u13-7", "word":"экзамен", "zh":"考试", "pron":"/ɪɡˈzamʲɪn/", "ex":"Завтра экзамен.", "exZh":"明天有考试。" },
    { "id":"ru-u13-8", "word":"изучать", "zh":"学习", "pron":"/ɪzʊˈtɕatʲ/", "ex":"Я изучаю языки.", "exZh":"我学外语。" }
  ]},
  { "id": "ru-u14", "langId": "ru", "level": "A2", "title": "核心动词", "subtitle": "Основные глаголы", "icon": "⚡", "grammar": "быть 现在时常省略；хотеть / мочь 后接动词原形。", "words": [
    { "id":"ru-u14-1", "word":"быть", "zh":"是（本质）", "pron":"/bɨtʲ/", "ex":"Я учитель.", "exZh":"我是老师。" },
    { "id":"ru-u14-2", "word":"находиться", "zh":"在；位于", "pron":"/nəxɐˈdʲitsə/", "ex":"Я нахожусь дома.", "exZh":"我在家。" },
    { "id":"ru-u14-3", "word":"есть", "zh":"有", "pron":"/jestʲ/", "ex":"У меня есть два брата.", "exZh":"我有两个兄弟。" },
    { "id":"ru-u14-4", "word":"делать", "zh":"做", "pron":"/ˈdʲelətʲ/", "ex":"Что ты делаешь?", "exZh":"你在做什么？" },
    { "id":"ru-u14-5", "word":"идти", "zh":"去", "pron":"/ɪˈtʲi/", "ex":"Я иду на рынок.", "exZh":"我去市场。" },
    { "id":"ru-u14-6", "word":"прийти", "zh":"来", "pron":"/prʲɪˈtʲi/", "ex":"Ты придёшь со мной?", "exZh":"你跟我一起来吗？" },
    { "id":"ru-u14-7", "word":"хотеть", "zh":"想要", "pron":"/xɐˈtʲetʲ/", "ex":"Я хочу кофе.", "exZh":"我想要杯咖啡。" },
    { "id":"ru-u14-8", "word":"мочь", "zh":"能；可以", "pron":"/motɕ/", "ex":"Ты можешь мне помочь?", "exZh":"你能帮我吗？" }
  ]},
  { "id": "ru-u15", "langId": "ru", "level": "A2", "title": "过去与计划", "subtitle": "Прошлое и планы", "icon": "📅", "grammar": "过去时按性数变：ходил / ходила / ходил；купил、вчера、никогда。", "words": [
    { "id":"ru-u15-1", "word":"вчера", "zh":"昨天", "pron":"/vtɕɪˈra/", "ex":"Вчера я ходил в кино.", "exZh":"昨天我去看电影了。" },
    { "id":"ru-u15-2", "word":"ходил", "zh":"我去了", "pron":"/xɐˈdʲil/", "ex":"Я ходил к другу.", "exZh":"我去看了个朋友。" },
    { "id":"ru-u15-3", "word":"купил", "zh":"我买了", "pron":"/kʊˈpʲil/", "ex":"Я купил книгу.", "exZh":"我买了一本书。" },
    { "id":"ru-u15-4", "word":"поездка", "zh":"旅行", "pron":"/pɐˈjestkə/", "ex":"Поездка была короткой.", "exZh":"旅行很短。" },
    { "id":"ru-u15-5", "word":"следующий", "zh":"下一个", "pron":"/ˈslʲedʊjɕːɪj/", "ex":"В следующие выходные.", "exZh":"下个周末。" },
    { "id":"ru-u15-6", "word":"планировать", "zh":"我计划", "pron":"/plɐˈnʲirəvətʲ/", "ex":"Планирую поехать в июне.", "exZh":"我打算六月去旅行。" },
    { "id":"ru-u15-7", "word":"прошлой ночью", "zh":"昨晚", "pron":"/ˈproʂləj ˈnotɕjʊ/", "ex":"Прошлой ночью шёл дождь.", "exZh":"昨晚下雨了。" },
    { "id":"ru-u15-8", "word":"никогда", "zh":"从不", "pron":"/nʲɪkɐɡˈda/", "ex":"Я никогда не опаздываю.", "exZh":"我从不迟到。" }
  ]},
  { "id": "de-u4", "langId": "de", "level": "A1", "title": "数字与计数", "subtitle": "Zahlen", "icon": "🔢", "grammar": "数字 eins / zwei / drei；`ein` 随格与性变化：eine Tasse。", "words": [
    { "id":"de-u4-1", "word":"eins", "zh":"一", "pron":"/aɪ̯ns/", "ex":"Eins, zwei, drei.", "exZh":"一、二、三。" },
    { "id":"de-u4-2", "word":"zwei", "zh":"二", "pron":"/tsvaɪ̯/", "ex":"Ich möchte zwei Kaffee.", "exZh":"我要两杯咖啡。" },
    { "id":"de-u4-3", "word":"drei", "zh":"三", "pron":"/dʁaɪ̯/", "ex":"Drei Personen, bitte.", "exZh":"三个人，谢谢。" },
    { "id":"de-u4-4", "word":"zehn", "zh":"十", "pron":"/tseːn/", "ex":"Es ist zehn Uhr.", "exZh":"现在十点。" },
    { "id":"de-u4-5", "word":"hundert", "zh":"一百", "pron":"/ˈhʊndɐt/", "ex":"Das kostet hundert Euro.", "exZh":"要一百欧元。" },
    { "id":"de-u4-6", "word":"erste", "zh":"第一", "pron":"/ˈeːɐ̯stə/", "ex":"Das ist mein erster Tag.", "exZh":"这是我第一天。" },
    { "id":"de-u4-7", "word":"viel", "zh":"很多", "pron":"/fiːl/", "ex":"Hier sind viele Leute.", "exZh":"这里有很多人。" },
    { "id":"de-u4-8", "word":"wenig", "zh":"一点；少", "pron":"/ˈveːnɪç/", "ex":"Bitte ein wenig Zucker.", "exZh":"请给我一点糖。" }
  ]},
  { "id": "de-u5", "langId": "de", "level": "A1", "title": "自我介绍", "subtitle": "Sich vorstellen", "icon": "🙋", "grammar": "「我叫」Ich heiße Ana / Ich bin Chinese；名词一律大写。", "words": [
    { "id":"de-u5-1", "word":"ich heiße", "zh":"我叫", "pron":"/ɪç ˈhaɪ̯sə/", "ex":"Ich heiße Anna.", "exZh":"我叫安娜。" },
    { "id":"de-u5-2", "word":"ich bin", "zh":"我是", "pron":"/ɪç bɪn/", "ex":"Ich bin Chinese.", "exZh":"我是中国人。" },
    { "id":"de-u5-3", "word":"Name", "zh":"名字", "pron":"/ˈnaːmə/", "ex":"Wie ist dein Name?", "exZh":"你叫什么名字？" },
    { "id":"de-u5-4", "word":"aus", "zh":"从；来自", "pron":"/aʊ̯s/", "ex":"Ich komme aus Shanghai.", "exZh":"我来自上海。" },
    { "id":"de-u5-5", "word":"ich wohne", "zh":"我住", "pron":"/ɪç ˈvoːnə/", "ex":"Ich wohne in der Innenstadt.", "exZh":"我住在市中心。" },
    { "id":"de-u5-6", "word":"Alter", "zh":"岁；年", "pron":"/ˈaltɐ/", "ex":"Ich bin zwanzig Jahre alt.", "exZh":"我二十岁。" },
    { "id":"de-u5-7", "word":"Freude", "zh":"高兴；愉快", "pron":"/ˈfʁɔʏ̯də/", "ex":"Freut mich, dich kennenzulernen.", "exZh":"很高兴认识你。" },
    { "id":"de-u5-8", "word":"auch", "zh":"也", "pron":"/aʊ̯x/", "ex":"Ich auch.", "exZh":"我也是。" }
  ]},
  { "id": "de-u6", "langId": "de", "level": "A1", "title": "家庭与人物", "subtitle": "Die Familie", "icon": "👨‍👩‍👧", "grammar": "物主词 mein / meine：meine Mutter、mein Vater；名词分阴阳中三性。", "words": [
    { "id":"de-u6-1", "word":"Familie", "zh":"家庭", "pron":"/faˈmiːli̯ə/", "ex":"Meine Familie ist groß.", "exZh":"我家人口多。" },
    { "id":"de-u6-2", "word":"Mutter", "zh":"母亲", "pron":"/ˈmʊtɐ/", "ex":"Meine Mutter kocht gut.", "exZh":"我妈妈做饭很好吃。" },
    { "id":"de-u6-3", "word":"Vater", "zh":"父亲", "pron":"/ˈfaːtɐ/", "ex":"Mein Vater arbeitet hier.", "exZh":"我爸爸在这儿工作。" },
    { "id":"de-u6-4", "word":"Sohn", "zh":"儿子", "pron":"/zoːn/", "ex":"Ich habe einen Sohn.", "exZh":"我有一个儿子。" },
    { "id":"de-u6-5", "word":"Schwester", "zh":"姐妹", "pron":"/ˈʃvɛstɐ/", "ex":"Meine Schwester studiert.", "exZh":"我姐姐在读书。" },
    { "id":"de-u6-6", "word":"Ehemann", "zh":"丈夫", "pron":"/ˈeːəman/", "ex":"Ihr Mann ist Arzt.", "exZh":"她丈夫是医生。" },
    { "id":"de-u6-7", "word":"Kind", "zh":"小孩", "pron":"/kɪnt/", "ex":"Das Kind spielt.", "exZh":"小孩在玩。" },
    { "id":"de-u6-8", "word":"Mensch", "zh":"人", "pron":"/mɛnʃ/", "ex":"Er ist ein freundlicher Mensch.", "exZh":"他是个和善的人。" }
  ]},
  { "id": "de-u7", "langId": "de", "level": "A1", "title": "饮食", "subtitle": "Essen und Trinken", "icon": "🍽️", "grammar": "«我想要» Ich möchte + 名词；否定用 kein：Ich esse kein Fleisch。", "words": [
    { "id":"de-u7-1", "word":"Frühstück", "zh":"早餐", "pron":"/ˈfʁyːʃtʏk/", "ex":"Ich frühstücke um sieben.", "exZh":"我七点吃早饭。" },
    { "id":"de-u7-2", "word":"Brot", "zh":"面包", "pron":"/bʁoːt/", "ex":"Ich möchte Brot.", "exZh":"我要面包。" },
    { "id":"de-u7-3", "word":"Kaffee", "zh":"咖啡", "pron":"/ˈkafeː/", "ex":"Eine Tasse Kaffee.", "exZh":"一杯咖啡。" },
    { "id":"de-u7-4", "word":"Reis", "zh":"米饭", "pron":"/ʁaɪ̯s/", "ex":"Der Reis ist fertig.", "exZh":"米饭好了。" },
    { "id":"de-u7-5", "word":"Fleisch", "zh":"肉", "pron":"/flaɪ̯ʃ/", "ex":"Ich esse kein Fleisch.", "exZh":"我不吃肉。" },
    { "id":"de-u7-6", "word":"Fisch", "zh":"鱼", "pron":"/fɪʃ/", "ex":"Der Fisch ist frisch.", "exZh":"这鱼很新鲜。" },
    { "id":"de-u7-7", "word":"Gemüse", "zh":"蔬菜", "pron":"/ɡəˈmyːzə/", "ex":"Iss mehr Gemüse.", "exZh":"多吃点蔬菜。" },
    { "id":"de-u7-8", "word":"Getränk", "zh":"饮料", "pron":"/ɡəˈtʁɛŋk/", "ex":"Was möchtest du trinken?", "exZh":"你想喝什么？" }
  ]},
  { "id": "de-u8", "langId": "de", "level": "A1", "title": "时间与日期", "subtitle": "Uhrzeit und Datum", "icon": "🕐", "grammar": "«几点» Wie spät ist es? / Es ist zehn Uhr；«下午» am Nachmittag。", "words": [
    { "id":"de-u8-1", "word":"Uhr", "zh":"小时；点钟", "pron":"/uːɐ̯/", "ex":"Wie spät ist es?", "exZh":"现在几点？" },
    { "id":"de-u8-2", "word":"Tag", "zh":"天；日", "pron":"/taːk/", "ex":"Heute ist ein schöner Tag.", "exZh":"今天是个好日子。" },
    { "id":"de-u8-3", "word":"Woche", "zh":"星期", "pron":"/ˈvɔxə/", "ex":"Bis nächste Woche.", "exZh":"下周见。" },
    { "id":"de-u8-4", "word":"Monat", "zh":"月", "pron":"/ˈmoːnat/", "ex":"Nächsten Monat.", "exZh":"下个月。" },
    { "id":"de-u8-5", "word":"Jahr", "zh":"年", "pron":"/jaːɐ̯/", "ex":"Frohes neues Jahr!", "exZh":"新年快乐。" },
    { "id":"de-u8-6", "word":"Montag", "zh":"星期一", "pron":"/ˈmoːntaːk/", "ex":"Ich beginne am Montag.", "exZh":"我周一开始。" },
    { "id":"de-u8-7", "word":"jetzt", "zh":"现在", "pron":"/jɛtst/", "ex":"Ich gehe jetzt los.", "exZh":"我现在出门。" },
    { "id":"de-u8-8", "word":"Nachmittag", "zh":"下午", "pron":"/ˈnaːxmɪtaːk/", "ex":"Bis heute Nachmittag.", "exZh":"下午见。" }
  ]},
  { "id": "de-u9", "langId": "de", "level": "A1", "title": "颜色与形容", "subtitle": "Farben und Adjektive", "icon": "🎨", "grammar": "形容词在名词前要加词尾：ein rotes Auto、ein blaues Hemd。", "words": [
    { "id":"de-u9-1", "word":"rot", "zh":"红色", "pron":"/ʁoːt/", "ex":"Das Auto ist rot.", "exZh":"车是红色的。" },
    { "id":"de-u9-2", "word":"blau", "zh":"蓝色", "pron":"/blaʊ̯/", "ex":"Der Himmel ist blau.", "exZh":"天空是蓝的。" },
    { "id":"de-u9-3", "word":"weiß", "zh":"白色", "pron":"/vaɪ̯s/", "ex":"Ein weißes Hemd.", "exZh":"一件白衬衫。" },
    { "id":"de-u9-4", "word":"schwarz", "zh":"黑色", "pron":"/ʃvaʁts/", "ex":"Ich mag Schwarz lieber.", "exZh":"我更喜欢黑的。" },
    { "id":"de-u9-5", "word":"groß", "zh":"大", "pron":"/ɡʁoːs/", "ex":"Ein großes Haus.", "exZh":"一栋大房子。" },
    { "id":"de-u9-6", "word":"klein", "zh":"小", "pron":"/klaɪ̯n/", "ex":"Eine kleine Wohnung.", "exZh":"一间小公寓。" },
    { "id":"de-u9-7", "word":"neu", "zh":"新", "pron":"/nɔʏ̯/", "ex":"Ich habe ein neues Handy.", "exZh":"我有一部新手机。" },
    { "id":"de-u9-8", "word":"schön", "zh":"漂亮", "pron":"/ʃøːn/", "ex":"Das ist sehr schön!", "exZh":"真好看！" }
  ]},
  { "id": "de-u10", "langId": "de", "level": "A2", "title": "天气与季节", "subtitle": "Das Wetter", "icon": "🌤️", "grammar": "天气用 es：Es ist kalt、Es regnet、Die Sonne scheint。", "words": [
    { "id":"de-u10-1", "word":"Sonne", "zh":"太阳", "pron":"/ˈzɔnə/", "ex":"Heute scheint die Sonne.", "exZh":"今天出太阳。" },
    { "id":"de-u10-2", "word":"Regen", "zh":"雨", "pron":"/ˈʁeːɡn̩/", "ex":"Der Regen beginnt.", "exZh":"下雨了。" },
    { "id":"de-u10-3", "word":"kalt", "zh":"冷", "pron":"/kalt/", "ex":"Heute ist es kalt.", "exZh":"今天很冷。" },
    { "id":"de-u10-4", "word":"heiß", "zh":"热", "pron":"/haɪ̯s/", "ex":"Heute ist es heiß.", "exZh":"今天很热。" },
    { "id":"de-u10-5", "word":"Wind", "zh":"风", "pron":"/vɪnt/", "ex":"Es gibt Wind.", "exZh":"有风。" },
    { "id":"de-u10-6", "word":"Wolke", "zh":"云", "pron":"/ˈvɔlkə/", "ex":"Es gibt viele Wolken.", "exZh":"天上有很多云。" },
    { "id":"de-u10-7", "word":"Sommer", "zh":"夏天", "pron":"/ˈzɔmɐ/", "ex":"Im Sommer ist es heiß.", "exZh":"夏天很热。" },
    { "id":"de-u10-8", "word":"Winter", "zh":"冬天", "pron":"/ˈvɪntɐ/", "ex":"Im Winter schneit es.", "exZh":"冬天下雪。" }
  ]},
  { "id": "de-u11", "langId": "de", "level": "A2", "title": "方位与问路", "subtitle": "Wegbeschreibung", "icon": "🧭", "grammar": "命令式：Gehen Sie geradeaus / Biegen Sie rechts ab；nach rechts。", "words": [
    { "id":"de-u11-1", "word":"rechts", "zh":"右边", "pron":"/ʁɛçts/", "ex":"Biegen Sie rechts ab.", "exZh":"向右转。" },
    { "id":"de-u11-2", "word":"links", "zh":"左边", "pron":"/lɪŋks/", "ex":"Biegen Sie links ab.", "exZh":"向左转。" },
    { "id":"de-u11-3", "word":"geradeaus", "zh":"直；笔直", "pron":"/ɡəˈʁaːdəˈaʊ̯s/", "ex":"Gehen Sie geradeaus.", "exZh":"一直往前走。" },
    { "id":"de-u11-4", "word":"nah", "zh":"近", "pron":"/naː/", "ex":"Der Bahnhof ist nah.", "exZh":"车站很近。" },
    { "id":"de-u11-5", "word":"weit", "zh":"远", "pron":"/vaɪ̯t/", "ex":"Der Bahnhof ist weit.", "exZh":"车站很远。" },
    { "id":"de-u11-6", "word":"Ecke", "zh":"拐角", "pron":"/ˈɛkə/", "ex":"An der Ecke.", "exZh":"在拐角处。" },
    { "id":"de-u11-7", "word":"U-Bahn", "zh":"地铁", "pron":"/ˈuːbaːn/", "ex":"Ich nehme die U-Bahn.", "exZh":"我坐地铁去。" },
    { "id":"de-u11-8", "word":"Karte", "zh":"地图", "pron":"/ˈkaʁtə/", "ex":"Schau auf die Karte.", "exZh":"看一下地图。" }
  ]},
  { "id": "de-u12", "langId": "de", "level": "A2", "title": "身体与健康", "subtitle": "Körper und Gesundheit", "icon": "🩺", "grammar": "«我头疼» Ich habe Kopfschmerzen / Mir tut der Kopf weh。", "words": [
    { "id":"de-u12-1", "word":"Kopf", "zh":"头", "pron":"/kɔpf/", "ex":"Ich habe Kopfschmerzen.", "exZh":"我头疼。" },
    { "id":"de-u12-2", "word":"Hand", "zh":"手", "pron":"/hant/", "ex":"Wasch dir die Hände.", "exZh":"洗洗手。" },
    { "id":"de-u12-3", "word":"Auge", "zh":"眼睛", "pron":"/ˈaʊ̯ɡə/", "ex":"Meine Augen sind müde.", "exZh":"眼睛很累。" },
    { "id":"de-u12-4", "word":"Fuß", "zh":"脚", "pron":"/fuːs/", "ex":"Mein Fuß tut weh.", "exZh":"我的脚疼。" },
    { "id":"de-u12-5", "word":"Arzt", "zh":"医生", "pron":"/aːʁtst/", "ex":"Geh zum Arzt.", "exZh":"去看医生。" },
    { "id":"de-u12-6", "word":"Apotheke", "zh":"药店", "pron":"/apoˈteːkə/", "ex":"Wo ist die Apotheke?", "exZh":"药店在哪里？" },
    { "id":"de-u12-7", "word":"krank", "zh":"生病的", "pron":"/kʁaŋk/", "ex":"Ich bin krank.", "exZh":"我生病了。" },
    { "id":"de-u12-8", "word":"Ruhe", "zh":"休息", "pron":"/ˈʁuːə/", "ex":"Du brauchst Ruhe.", "exZh":"你需要休息。" }
  ]},
  { "id": "de-u13", "langId": "de", "level": "A2", "title": "工作与学习", "subtitle": "Arbeit und Studium", "icon": "💼", "grammar": "介词 in / bei / an：Ich bin im Büro、an der Uni。", "words": [
    { "id":"de-u13-1", "word":"Büro", "zh":"办公室", "pron":"/byˈʁoː/", "ex":"Ich bin im Büro.", "exZh":"我在办公室。" },
    { "id":"de-u13-2", "word":"Besprechung", "zh":"会议", "pron":"/bəˈʃpʁɛçʊŋ/", "ex":"Die Besprechung ist um drei.", "exZh":"三点开会。" },
    { "id":"de-u13-3", "word":"E-Mail", "zh":"邮件", "pron":"/ˈiːmɛl/", "ex":"Ich schicke eine E-Mail.", "exZh":"我发一封邮件。" },
    { "id":"de-u13-4", "word":"Schule", "zh":"学校", "pron":"/ˈʃuːlə/", "ex":"Die Schule ist nah.", "exZh":"学校很近。" },
    { "id":"de-u13-5", "word":"Student", "zh":"学生", "pron":"/ʃtuˈdɛnt/", "ex":"Ich bin Student.", "exZh":"我是学生。" },
    { "id":"de-u13-6", "word":"Lehrer", "zh":"老师", "pron":"/ˈleːʁɐ/", "ex":"Der Lehrer ist nett.", "exZh":"老师很好。" },
    { "id":"de-u13-7", "word":"Prüfung", "zh":"考试", "pron":"/ˈpʁyːfʊŋ/", "ex":"Morgen ist eine Prüfung.", "exZh":"明天有考试。" },
    { "id":"de-u13-8", "word":"lernen", "zh":"学习", "pron":"/ˈlɛʁnən/", "ex":"Ich lerne Fremdsprachen.", "exZh":"我学外语。" }
  ]},
  { "id": "de-u14", "langId": "de", "level": "A2", "title": "核心动词", "subtitle": "Wichtige Verben", "icon": "⚡", "grammar": "sein 表本质；wollen / können 后接原形且置于句末（框型结构）。", "words": [
    { "id":"de-u14-1", "word":"sein", "zh":"是（本质）", "pron":"/zaɪ̯n/", "ex":"Ich bin Lehrer.", "exZh":"我是老师。" },
    { "id":"de-u14-2", "word":"sich befinden", "zh":"在；位于", "pron":"/zɪç bəˈfɪndən/", "ex":"Ich befinde mich zu Hause.", "exZh":"我在家。" },
    { "id":"de-u14-3", "word":"haben", "zh":"有", "pron":"/ˈhaːbən/", "ex":"Ich habe zwei Brüder.", "exZh":"我有两个兄弟。" },
    { "id":"de-u14-4", "word":"machen", "zh":"做", "pron":"/ˈmaxən/", "ex":"Was machst du?", "exZh":"你在做什么？" },
    { "id":"de-u14-5", "word":"gehen", "zh":"去", "pron":"/ˈɡeːən/", "ex":"Ich gehe zum Markt.", "exZh":"我去市场。" },
    { "id":"de-u14-6", "word":"kommen", "zh":"来", "pron":"/ˈkɔmən/", "ex":"Kommst du mit?", "exZh":"你跟我一起来吗？" },
    { "id":"de-u14-7", "word":"möchten", "zh":"想要", "pron":"/ˈmœçtən/", "ex":"Ich möchte einen Kaffee.", "exZh":"我想要杯咖啡。" },
    { "id":"de-u14-8", "word":"können", "zh":"能；可以", "pron":"/ˈkœnən/", "ex":"Kannst du mir helfen?", "exZh":"你能帮我吗？" }
  ]},
  { "id": "de-u15", "langId": "de", "level": "A2", "title": "过去与计划", "subtitle": "Vergangenheit und Pläne", "icon": "📅", "grammar": "过去时常用 Perfekt：Ich habe gekauft、Ich bin gegangen；gestern、nie。", "words": [
    { "id":"de-u15-1", "word":"gestern", "zh":"昨天", "pron":"/ˈɡɛstɐn/", "ex":"Gestern war ich im Kino.", "exZh":"昨天我去看电影了。" },
    { "id":"de-u15-2", "word":"gegangen", "zh":"我去了", "pron":"/ɡəˈɡaŋən/", "ex":"Ich bin zu einem Freund gegangen.", "exZh":"我去看了个朋友。" },
    { "id":"de-u15-3", "word":"gekauft", "zh":"我买了", "pron":"/ɡəˈkaʊ̯ft/", "ex":"Ich habe ein Buch gekauft.", "exZh":"我买了一本书。" },
    { "id":"de-u15-4", "word":"Reise", "zh":"旅行", "pron":"/ˈʁaɪ̯zə/", "ex":"Die Reise war kurz.", "exZh":"旅行很短。" },
    { "id":"de-u15-5", "word":"nächste", "zh":"下一个", "pron":"/ˈnɛçstə/", "ex":"Nächstes Wochenende.", "exZh":"下个周末。" },
    { "id":"de-u15-6", "word":"plane", "zh":"我计划", "pron":"/ˈplaːnə/", "ex":"Ich plane, im Juni zu reisen.", "exZh":"我打算六月去旅行。" },
    { "id":"de-u15-7", "word":"letzte Nacht", "zh":"昨晚", "pron":"/ˈlɛtstə naxt/", "ex":"Letzte Nacht hat es geregnet.", "exZh":"昨晚下雨了。" },
    { "id":"de-u15-8", "word":"nie", "zh":"从不", "pron":"/niː/", "ex":"Ich komme nie zu spät.", "exZh":"我从不迟到。" }
  ]},
  { "id": "it-u4", "langId": "it", "level": "A1", "title": "数字与计数", "subtitle": "I numeri", "icon": "🔢", "grammar": "数字 uno / due / tre；uno 在阳性名词前短化为 un（un caffè）。", "words": [
    { "id":"it-u4-1", "word":"uno", "zh":"一", "pron":"/ˈuno/", "ex":"Uno, due, tre.", "exZh":"一、二、三。" },
    { "id":"it-u4-2", "word":"due", "zh":"二", "pron":"/ˈdue/", "ex":"Vorrei due caffè.", "exZh":"我要两杯咖啡。" },
    { "id":"it-u4-3", "word":"tre", "zh":"三", "pron":"/tre/", "ex":"Tre persone, per favore.", "exZh":"三个人，谢谢。" },
    { "id":"it-u4-4", "word":"dieci", "zh":"十", "pron":"/ˈdjɛtʃi/", "ex":"Sono le dieci.", "exZh":"现在十点。" },
    { "id":"it-u4-5", "word":"cento", "zh":"一百", "pron":"/ˈtʃɛnto/", "ex":"Costa cento euro.", "exZh":"要一百欧元。" },
    { "id":"it-u4-6", "word":"primo", "zh":"第一", "pron":"/ˈprimo/", "ex":"È il mio primo giorno.", "exZh":"这是我第一天。" },
    { "id":"it-u4-7", "word":"molto", "zh":"很多", "pron":"/ˈmolto/", "ex":"C'è molta gente qui.", "exZh":"这里有很多人。" },
    { "id":"it-u4-8", "word":"poco", "zh":"一点；少", "pron":"/ˈpɔko/", "ex":"Un po' di zucchero, per favore.", "exZh":"请给我一点糖。" }
  ]},
  { "id": "it-u5", "langId": "it", "level": "A1", "title": "自我介绍", "subtitle": "Presentarsi", "icon": "🙋", "grammar": "「我叫」Mi chiamo Ana；«我是» Sono cinese；名词分阴阳。", "words": [
    { "id":"it-u5-1", "word":"mi chiamo", "zh":"我叫", "pron":"/mi ˈkjamo/", "ex":"Mi chiamo Ana.", "exZh":"我叫安娜。" },
    { "id":"it-u5-2", "word":"sono", "zh":"我是", "pron":"/ˈsono/", "ex":"Sono cinese.", "exZh":"我是中国人。" },
    { "id":"it-u5-3", "word":"nome", "zh":"名字", "pron":"/ˈnome/", "ex":"Qual è il tuo nome?", "exZh":"你叫什么名字？" },
    { "id":"it-u5-4", "word":"venire da", "zh":"从；来自", "pron":"/veˈnire da/", "ex":"Vengo da Shanghai.", "exZh":"我来自上海。" },
    { "id":"it-u5-5", "word":"abito", "zh":"我住", "pron":"/ˈabito/", "ex":"Abito in centro.", "exZh":"我住在市中心。" },
    { "id":"it-u5-6", "word":"età", "zh":"岁；年", "pron":"/eˈta/", "ex":"Ho vent'anni.", "exZh":"我二十岁。" },
    { "id":"it-u5-7", "word":"piacere", "zh":"高兴；愉快", "pron":"/pjaˈtʃere/", "ex":"Piacere di conoscerti.", "exZh":"很高兴认识你。" },
    { "id":"it-u5-8", "word":"anche", "zh":"也", "pron":"/ˈanke/", "ex":"Anch'io.", "exZh":"我也是。" }
  ]},
  { "id": "it-u6", "langId": "it", "level": "A1", "title": "家庭与人物", "subtitle": "La famiglia", "icon": "👨‍👩‍👧", "grammar": "物主词 mio / mia 随名词变：mia madre、mio padre。", "words": [
    { "id":"it-u6-1", "word":"famiglia", "zh":"家庭", "pron":"/faˈmiʎʎa/", "ex":"La mia famiglia è grande.", "exZh":"我家人口多。" },
    { "id":"it-u6-2", "word":"madre", "zh":"母亲", "pron":"/ˈmadre/", "ex":"Mia madre cucina bene.", "exZh":"我妈妈做饭很好吃。" },
    { "id":"it-u6-3", "word":"padre", "zh":"父亲", "pron":"/ˈpadre/", "ex":"Mio padre lavora qui.", "exZh":"我爸爸在这儿工作。" },
    { "id":"it-u6-4", "word":"figlio", "zh":"儿子", "pron":"/ˈfiʎʎo/", "ex":"Ho un figlio.", "exZh":"我有一个儿子。" },
    { "id":"it-u6-5", "word":"sorella", "zh":"姐妹", "pron":"/soˈrɛlla/", "ex":"Mia sorella studia.", "exZh":"我姐姐在读书。" },
    { "id":"it-u6-6", "word":"marito", "zh":"丈夫", "pron":"/maˈrito/", "ex":"Suo marito è medico.", "exZh":"她丈夫是医生。" },
    { "id":"it-u6-7", "word":"bambino", "zh":"小孩", "pron":"/bamˈbino/", "ex":"Il bambino gioca.", "exZh":"小孩在玩。" },
    { "id":"it-u6-8", "word":"persona", "zh":"人", "pron":"/perˈsona/", "ex":"È una persona gentile.", "exZh":"他是个和善的人。" }
  ]},
  { "id": "it-u7", "langId": "it", "level": "A1", "title": "饮食", "subtitle": "Mangiare e bere", "icon": "🍽️", "grammar": "部分冠词 del / della：Vorrei del pane；«我不吃肉» Non mangio carne。", "words": [
    { "id":"it-u7-1", "word":"colazione", "zh":"早餐", "pron":"/kolaˈtsjone/", "ex":"Faccio colazione alle sette.", "exZh":"我七点吃早饭。" },
    { "id":"it-u7-2", "word":"pane", "zh":"面包", "pron":"/ˈpane/", "ex":"Vorrei del pane.", "exZh":"我要面包。" },
    { "id":"it-u7-3", "word":"caffè", "zh":"咖啡", "pron":"/kafˈfɛ/", "ex":"Un caffè, per favore.", "exZh":"一杯咖啡。" },
    { "id":"it-u7-4", "word":"riso", "zh":"米饭", "pron":"/ˈriso/", "ex":"Il riso è pronto.", "exZh":"米饭好了。" },
    { "id":"it-u7-5", "word":"carne", "zh":"肉", "pron":"/ˈkarne/", "ex":"Non mangio carne.", "exZh":"我不吃肉。" },
    { "id":"it-u7-6", "word":"pesce", "zh":"鱼", "pron":"/ˈpeʃʃe/", "ex":"Il pesce è fresco.", "exZh":"这鱼很新鲜。" },
    { "id":"it-u7-7", "word":"verdura", "zh":"蔬菜", "pron":"/verˈdura/", "ex":"Mangia più verdura.", "exZh":"多吃点蔬菜。" },
    { "id":"it-u7-8", "word":"bevanda", "zh":"饮料", "pron":"/beˈvanda/", "ex":"Quale bevanda vuoi?", "exZh":"你想喝什么？" }
  ]},
  { "id": "it-u8", "langId": "it", "level": "A1", "title": "时间与日期", "subtitle": "L'ora e la data", "icon": "🕐", "grammar": "«几点» Che ore sono? / Sono le dieci；«下午» nel pomeriggio。", "words": [
    { "id":"it-u8-1", "word":"ora", "zh":"小时；点钟", "pron":"/ˈora/", "ex":"Che ore sono?", "exZh":"现在几点？" },
    { "id":"it-u8-2", "word":"giorno", "zh":"天；日", "pron":"/ˈdʒorno/", "ex":"Oggi è un bel giorno.", "exZh":"今天是个好日子。" },
    { "id":"it-u8-3", "word":"settimana", "zh":"星期", "pron":"/settiˈmana/", "ex":"Ci vediamo la prossima settimana.", "exZh":"下周见。" },
    { "id":"it-u8-4", "word":"mese", "zh":"月", "pron":"/ˈmese/", "ex":"Il mese prossimo.", "exZh":"下个月。" },
    { "id":"it-u8-5", "word":"anno", "zh":"年", "pron":"/ˈanno/", "ex":"Felice anno nuovo!", "exZh":"新年快乐。" },
    { "id":"it-u8-6", "word":"lunedì", "zh":"星期一", "pron":"/luneˈdi/", "ex":"Comincio lunedì.", "exZh":"我周一开始。" },
    { "id":"it-u8-7", "word":"adesso", "zh":"现在", "pron":"/aˈdɛsso/", "ex":"Esco adesso.", "exZh":"我现在出门。" },
    { "id":"it-u8-8", "word":"pomeriggio", "zh":"下午", "pron":"/pomeˈriddʒo/", "ex":"Ci vediamo nel pomeriggio.", "exZh":"下午见。" }
  ]},
  { "id": "it-u9", "langId": "it", "level": "A1", "title": "颜色与形容", "subtitle": "Colori e aggettivi", "icon": "🎨", "grammar": "形容词随名词变性数：una macchina rossa、una camicia bianca。", "words": [
    { "id":"it-u9-1", "word":"rosso", "zh":"红色", "pron":"/ˈrosso/", "ex":"La macchina è rossa.", "exZh":"车是红色的。" },
    { "id":"it-u9-2", "word":"blu", "zh":"蓝色", "pron":"/blu/", "ex":"Il cielo è blu.", "exZh":"天空是蓝的。" },
    { "id":"it-u9-3", "word":"bianco", "zh":"白色", "pron":"/ˈbjaŋko/", "ex":"Una camicia bianca.", "exZh":"一件白衬衫。" },
    { "id":"it-u9-4", "word":"nero", "zh":"黑色", "pron":"/ˈnero/", "ex":"Preferisco il nero.", "exZh":"我更喜欢黑的。" },
    { "id":"it-u9-5", "word":"grande", "zh":"大", "pron":"/ˈɡrande/", "ex":"Una casa grande.", "exZh":"一栋大房子。" },
    { "id":"it-u9-6", "word":"piccolo", "zh":"小", "pron":"/ˈpikkolo/", "ex":"Un piccolo appartamento.", "exZh":"一间小公寓。" },
    { "id":"it-u9-7", "word":"nuovo", "zh":"新", "pron":"/ˈnwɔvo/", "ex":"Ho un telefono nuovo.", "exZh":"我有一部新手机。" },
    { "id":"it-u9-8", "word":"bello", "zh":"漂亮", "pron":"/ˈbɛllo/", "ex":"Che bello!", "exZh":"真好看！" }
  ]},
  { "id": "it-u10", "langId": "it", "level": "A2", "title": "天气与季节", "subtitle": "Il tempo", "icon": "🌤️", "grammar": "天气用 fare / c’è：Fa freddo、C’è il sole、Piove。", "words": [
    { "id":"it-u10-1", "word":"sole", "zh":"太阳", "pron":"/ˈsole/", "ex":"Oggi c'è il sole.", "exZh":"今天出太阳。" },
    { "id":"it-u10-2", "word":"pioggia", "zh":"雨", "pron":"/ˈpjɔddʒa/", "ex":"La pioggia comincia.", "exZh":"下雨了。" },
    { "id":"it-u10-3", "word":"freddo", "zh":"冷", "pron":"/ˈfrɛddo/", "ex":"Oggi fa freddo.", "exZh":"今天很冷。" },
    { "id":"it-u10-4", "word":"caldo", "zh":"热", "pron":"/ˈkaldo/", "ex":"Oggi fa caldo.", "exZh":"今天很热。" },
    { "id":"it-u10-5", "word":"vento", "zh":"风", "pron":"/ˈvɛnto/", "ex":"C'è vento.", "exZh":"有风。" },
    { "id":"it-u10-6", "word":"nuvola", "zh":"云", "pron":"/ˈnuvola/", "ex":"Ci sono molte nuvole.", "exZh":"天上有很多云。" },
    { "id":"it-u10-7", "word":"estate", "zh":"夏天", "pron":"/eˈstate/", "ex":"D'estate fa caldo.", "exZh":"夏天很热。" },
    { "id":"it-u10-8", "word":"inverno", "zh":"冬天", "pron":"/inˈvɛrno/", "ex":"D'inverno nevica.", "exZh":"冬天下雪。" }
  ]},
  { "id": "it-u11", "langId": "it", "level": "A2", "title": "方位与问路", "subtitle": "Le direzioni", "icon": "🧭", "grammar": "命令式：Giri a destra / Vada dritto；alla + 方向。", "words": [
    { "id":"it-u11-1", "word":"destra", "zh":"右边", "pron":"/ˈdɛstra/", "ex":"Giri a destra.", "exZh":"向右转。" },
    { "id":"it-u11-2", "word":"sinistra", "zh":"左边", "pron":"/siˈnistra/", "ex":"Giri a sinistra.", "exZh":"向左转。" },
    { "id":"it-u11-3", "word":"dritto", "zh":"直；笔直", "pron":"/ˈdritto/", "ex":"Vada sempre dritto.", "exZh":"一直往前走。" },
    { "id":"it-u11-4", "word":"vicino", "zh":"近", "pron":"/viˈtʃino/", "ex":"La stazione è vicina.", "exZh":"车站很近。" },
    { "id":"it-u11-5", "word":"lontano", "zh":"远", "pron":"/lonˈtano/", "ex":"La stazione è lontana.", "exZh":"车站很远。" },
    { "id":"it-u11-6", "word":"angolo", "zh":"拐角", "pron":"/ˈaŋɡolo/", "ex":"All'angolo della strada.", "exZh":"在拐角处。" },
    { "id":"it-u11-7", "word":"metropolitana", "zh":"地铁", "pron":"/metropoliˈtana/", "ex":"Prendo la metropolitana.", "exZh":"我坐地铁去。" },
    { "id":"it-u11-8", "word":"mappa", "zh":"地图", "pron":"/ˈmappa/", "ex":"Guardiamo la mappa.", "exZh":"看一下地图。" }
  ]},
  { "id": "it-u12", "langId": "it", "level": "A2", "title": "身体与健康", "subtitle": "Il corpo e la salute", "icon": "🩺", "grammar": "«我头疼» Mi fa male la testa / Ho mal di testa。", "words": [
    { "id":"it-u12-1", "word":"testa", "zh":"头", "pron":"/ˈtɛsta/", "ex":"Ho mal di testa.", "exZh":"我头疼。" },
    { "id":"it-u12-2", "word":"mano", "zh":"手", "pron":"/ˈmano/", "ex":"Lavati le mani.", "exZh":"洗洗手。" },
    { "id":"it-u12-3", "word":"occhio", "zh":"眼睛", "pron":"/ˈɔkkjo/", "ex":"Ho gli occhi stanchi.", "exZh":"眼睛很累。" },
    { "id":"it-u12-4", "word":"piede", "zh":"脚", "pron":"/ˈpjɛde/", "ex":"Mi fa male il piede.", "exZh":"我的脚疼。" },
    { "id":"it-u12-5", "word":"medico", "zh":"医生", "pron":"/ˈmɛdiko/", "ex":"Vai dal medico.", "exZh":"去看医生。" },
    { "id":"it-u12-6", "word":"farmacia", "zh":"药店", "pron":"/farmaˈtʃia/", "ex":"Dov'è la farmacia?", "exZh":"药店在哪里？" },
    { "id":"it-u12-7", "word":"malato", "zh":"生病的", "pron":"/maˈlato/", "ex":"Sono malato.", "exZh":"我生病了。" },
    { "id":"it-u12-8", "word":"riposo", "zh":"休息", "pron":"/riˈpɔso/", "ex":"Hai bisogno di riposo.", "exZh":"你需要休息。" }
  ]},
  { "id": "it-u13", "langId": "it", "level": "A2", "title": "工作与学习", "subtitle": "Lavoro e studio", "icon": "💼", "grammar": "介词 in / a / di：Sono in ufficio、studente di italiano。", "words": [
    { "id":"it-u13-1", "word":"ufficio", "zh":"办公室", "pron":"/ufˈfitʃo/", "ex":"Sono in ufficio.", "exZh":"我在办公室。" },
    { "id":"it-u13-2", "word":"riunione", "zh":"会议", "pron":"/riuˈnjone/", "ex":"La riunione è alle tre.", "exZh":"三点开会。" },
    { "id":"it-u13-3", "word":"email", "zh":"邮件", "pron":"/ˈimeil/", "ex":"Mando un'email.", "exZh":"我发一封邮件。" },
    { "id":"it-u13-4", "word":"scuola", "zh":"学校", "pron":"/ˈskwɔla/", "ex":"La scuola è vicina.", "exZh":"学校很近。" },
    { "id":"it-u13-5", "word":"studente", "zh":"学生", "pron":"/stuˈdɛnte/", "ex":"Sono studente.", "exZh":"我是学生。" },
    { "id":"it-u13-6", "word":"insegnante", "zh":"老师", "pron":"/inseˈɲante/", "ex":"L'insegnante è bravo.", "exZh":"老师很好。" },
    { "id":"it-u13-7", "word":"esame", "zh":"考试", "pron":"/eˈzame/", "ex":"Domani ho un esame.", "exZh":"明天有考试。" },
    { "id":"it-u13-8", "word":"studiare", "zh":"学习", "pron":"/stuˈdjare/", "ex":"Studio le lingue.", "exZh":"我学外语。" }
  ]},
  { "id": "it-u14", "langId": "it", "level": "A2", "title": "核心动词", "subtitle": "Verbi essenziali", "icon": "⚡", "grammar": "essere 表本质，stare 表状态；volere / potere 后接原形。", "words": [
    { "id":"it-u14-1", "word":"essere", "zh":"是（本质）", "pron":"/ˈɛssere/", "ex":"Sono insegnante.", "exZh":"我是老师。" },
    { "id":"it-u14-2", "word":"trovarsi", "zh":"在；位于", "pron":"/troˈvarsi/", "ex":"Mi trovo a casa.", "exZh":"我在家。" },
    { "id":"it-u14-3", "word":"avere", "zh":"有", "pron":"/aˈvere/", "ex":"Ho due fratelli.", "exZh":"我有两个兄弟。" },
    { "id":"it-u14-4", "word":"fare", "zh":"做", "pron":"/ˈfare/", "ex":"Che fai?", "exZh":"你在做什么？" },
    { "id":"it-u14-5", "word":"andare", "zh":"去", "pron":"/anˈdare/", "ex":"Vado al mercato.", "exZh":"我去市场。" },
    { "id":"it-u14-6", "word":"venire", "zh":"来", "pron":"/veˈnire/", "ex":"Vieni con me?", "exZh":"你跟我一起来吗？" },
    { "id":"it-u14-7", "word":"volere", "zh":"想要", "pron":"/voˈlere/", "ex":"Voglio un caffè.", "exZh":"我想要杯咖啡。" },
    { "id":"it-u14-8", "word":"potere", "zh":"能；可以", "pron":"/poˈtere/", "ex":"Puoi aiutarmi?", "exZh":"你能帮我吗？" }
  ]},
  { "id": "it-u15", "langId": "it", "level": "A2", "title": "过去与计划", "subtitle": "Passato e progetti", "icon": "📅", "grammar": "近过去时 passato prossimo：ho comprato、sono andato；ieri、mai。", "words": [
    { "id":"it-u15-1", "word":"ieri", "zh":"昨天", "pron":"/ˈjɛri/", "ex":"Ieri sono andato al cinema.", "exZh":"昨天我去看电影了。" },
    { "id":"it-u15-2", "word":"andato", "zh":"我去了", "pron":"/anˈdato/", "ex":"Sono andato a trovare un amico.", "exZh":"我去看了个朋友。" },
    { "id":"it-u15-3", "word":"comprato", "zh":"我买了", "pron":"/komˈprato/", "ex":"Ho comprato un libro.", "exZh":"我买了一本书。" },
    { "id":"it-u15-4", "word":"viaggio", "zh":"旅行", "pron":"/viˈaddʒo/", "ex":"Il viaggio è stato breve.", "exZh":"旅行很短。" },
    { "id":"it-u15-5", "word":"prossimo", "zh":"下一个", "pron":"/ˈprɔssimo/", "ex":"Il prossimo fine settimana.", "exZh":"下个周末。" },
    { "id":"it-u15-6", "word":"pianificare", "zh":"我计划", "pron":"/pjanifiˈkare/", "ex":"Pianifico di viaggiare a giugno.", "exZh":"我打算六月去旅行。" },
    { "id":"it-u15-7", "word":"ieri sera", "zh":"昨晚", "pron":"/ˈjɛri ˈsera/", "ex":"Ieri sera ha piovuto.", "exZh":"昨晚下雨了。" },
    { "id":"it-u15-8", "word":"mai", "zh":"从不", "pron":"/mai/", "ex":"Non arrivo mai in ritardo.", "exZh":"我从不迟到。" }
  ]},
  { "id": "pt-u4", "langId": "pt", "level": "A1", "title": "数字与计数", "subtitle": "Os números", "icon": "🔢", "grammar": "数字 um / dois / três；um 在阴性前变 uma（uma xícara）。", "words": [
    { "id":"pt-u4-1", "word":"um", "zh":"一", "pron":"/ũ/", "ex":"Um, dois, três.", "exZh":"一、二、三。" },
    { "id":"pt-u4-2", "word":"dois", "zh":"二", "pron":"/dojs/", "ex":"Quero dois cafés.", "exZh":"我要两杯咖啡。" },
    { "id":"pt-u4-3", "word":"três", "zh":"三", "pron":"/tɾejs/", "ex":"Três pessoas, por favor.", "exZh":"三个人，谢谢。" },
    { "id":"pt-u4-4", "word":"dez", "zh":"十", "pron":"/dejs/", "ex":"São dez horas.", "exZh":"现在十点。" },
    { "id":"pt-u4-5", "word":"cem", "zh":"一百", "pron":"/sẽj/", "ex":"Custa cem reais.", "exZh":"要一百欧元。" },
    { "id":"pt-u4-6", "word":"primeiro", "zh":"第一", "pron":"/pɾiˈmejɾu/", "ex":"É meu primeiro dia.", "exZh":"这是我第一天。" },
    { "id":"pt-u4-7", "word":"muito", "zh":"很多", "pron":"/ˈmujtu/", "ex":"Tem muita gente aqui.", "exZh":"这里有很多人。" },
    { "id":"pt-u4-8", "word":"pouco", "zh":"一点；少", "pron":"/ˈpoku/", "ex":"Um pouco de açúcar, por favor.", "exZh":"请给我一点糖。" }
  ]},
  { "id": "pt-u5", "langId": "pt", "level": "A1", "title": "自我介绍", "subtitle": "Apresentar-se", "icon": "🙋", "grammar": "「我叫」Me chamo Ana / Eu me chamo；«我是» Sou chinês（chinesa）。", "words": [
    { "id":"pt-u5-1", "word":"me chamo", "zh":"我叫", "pron":"/mi ˈʃamu/", "ex":"Me chamo Ana.", "exZh":"我叫安娜。" },
    { "id":"pt-u5-2", "word":"sou", "zh":"我是", "pron":"/sow/", "ex":"Sou chinês.", "exZh":"我是中国人。" },
    { "id":"pt-u5-3", "word":"nome", "zh":"名字", "pron":"/ˈnomi/", "ex":"Qual é o seu nome?", "exZh":"你叫什么名字？" },
    { "id":"pt-u5-4", "word":"vir de", "zh":"从；来自", "pron":"/viʁ dʒi/", "ex":"Venho de Xangai.", "exZh":"我来自上海。" },
    { "id":"pt-u5-5", "word":"moro", "zh":"我住", "pron":"/ˈmoɾu/", "ex":"Moro no centro.", "exZh":"我住在市中心。" },
    { "id":"pt-u5-6", "word":"anos", "zh":"岁；年", "pron":"/ˈanus/", "ex":"Tenho vinte anos.", "exZh":"我二十岁。" },
    { "id":"pt-u5-7", "word":"prazer", "zh":"高兴；愉快", "pron":"/pɾaˈzeʁ/", "ex":"Prazer em te conhecer.", "exZh":"很高兴认识你。" },
    { "id":"pt-u5-8", "word":"também", "zh":"也", "pron":"/tãˈbẽj/", "ex":"Eu também.", "exZh":"我也是。" }
  ]},
  { "id": "pt-u6", "langId": "pt", "level": "A1", "title": "家庭与人物", "subtitle": "A família", "icon": "👨‍👩‍👧", "grammar": "物主词 meu / minha：minha mãe、meu pai。", "words": [
    { "id":"pt-u6-1", "word":"família", "zh":"家庭", "pron":"/faˈmilja/", "ex":"Minha família é grande.", "exZh":"我家人口多。" },
    { "id":"pt-u6-2", "word":"mãe", "zh":"母亲", "pron":"/mãj/", "ex":"Minha mãe cozinha bem.", "exZh":"我妈妈做饭很好吃。" },
    { "id":"pt-u6-3", "word":"pai", "zh":"父亲", "pron":"/paj/", "ex":"Meu pai trabalha aqui.", "exZh":"我爸爸在这儿工作。" },
    { "id":"pt-u6-4", "word":"filho", "zh":"儿子", "pron":"/ˈfiʎu/", "ex":"Tenho um filho.", "exZh":"我有一个儿子。" },
    { "id":"pt-u6-5", "word":"irmã", "zh":"姐妹", "pron":"/iʁˈmã/", "ex":"Minha irmã estuda.", "exZh":"我姐姐在读书。" },
    { "id":"pt-u6-6", "word":"marido", "zh":"丈夫", "pron":"/maˈɾidu/", "ex":"O marido dela é médico.", "exZh":"她丈夫是医生。" },
    { "id":"pt-u6-7", "word":"criança", "zh":"小孩", "pron":"/kɾiˈãsa/", "ex":"A criança brinca.", "exZh":"小孩在玩。" },
    { "id":"pt-u6-8", "word":"pessoa", "zh":"人", "pron":"/peˈsoa/", "ex":"É uma pessoa legal.", "exZh":"他是个和善的人。" }
  ]},
  { "id": "pt-u7", "langId": "pt", "level": "A1", "title": "饮食", "subtitle": "Comer e beber", "icon": "🍽️", "grammar": "«我想要» Quero + 名词；«我不吃肉» Não como carne。", "words": [
    { "id":"pt-u7-1", "word":"café da manhã", "zh":"早餐", "pron":"/kaˈfɛ da maˈɲã/", "ex":"Tomo café da manhã às sete.", "exZh":"我七点吃早饭。" },
    { "id":"pt-u7-2", "word":"pão", "zh":"面包", "pron":"/pãw/", "ex":"Quero pão.", "exZh":"我要面包。" },
    { "id":"pt-u7-3", "word":"café", "zh":"咖啡", "pron":"/kaˈfɛ/", "ex":"Um café, por favor.", "exZh":"一杯咖啡。" },
    { "id":"pt-u7-4", "word":"arroz", "zh":"米饭", "pron":"/aˈʁos/", "ex":"O arroz está pronto.", "exZh":"米饭好了。" },
    { "id":"pt-u7-5", "word":"carne", "zh":"肉", "pron":"/ˈkaʁni/", "ex":"Não como carne.", "exZh":"我不吃肉。" },
    { "id":"pt-u7-6", "word":"peixe", "zh":"鱼", "pron":"/ˈpejʃi/", "ex":"O peixe está fresco.", "exZh":"这鱼很新鲜。" },
    { "id":"pt-u7-7", "word":"verdura", "zh":"蔬菜", "pron":"/veʁˈduɾa/", "ex":"Coma mais verdura.", "exZh":"多吃点蔬菜。" },
    { "id":"pt-u7-8", "word":"bebida", "zh":"饮料", "pron":"/beˈbida/", "ex":"Qual bebida você quer?", "exZh":"你想喝什么？" }
  ]},
  { "id": "pt-u8", "langId": "pt", "level": "A1", "title": "时间与日期", "subtitle": "A hora e a data", "icon": "🕐", "grammar": "«几点» Que horas são? / São dez horas；«下午» à tarde。", "words": [
    { "id":"pt-u8-1", "word":"hora", "zh":"小时；点钟", "pron":"/ˈoɾa/", "ex":"Que horas são?", "exZh":"现在几点？" },
    { "id":"pt-u8-2", "word":"dia", "zh":"天；日", "pron":"/ˈdʒia/", "ex":"Hoje é um bom dia.", "exZh":"今天是个好日子。" },
    { "id":"pt-u8-3", "word":"semana", "zh":"星期", "pron":"/seˈmana/", "ex":"Até a próxima semana.", "exZh":"下周见。" },
    { "id":"pt-u8-4", "word":"mês", "zh":"月", "pron":"/mes/", "ex":"O mês que vem.", "exZh":"下个月。" },
    { "id":"pt-u8-5", "word":"ano", "zh":"年", "pron":"/ˈanu/", "ex":"Feliz ano novo!", "exZh":"新年快乐。" },
    { "id":"pt-u8-6", "word":"segunda-feira", "zh":"星期一", "pron":"/seˈɡunda ˈfejɾa/", "ex":"Começo na segunda.", "exZh":"我周一开始。" },
    { "id":"pt-u8-7", "word":"agora", "zh":"现在", "pron":"/aˈɡɔɾa/", "ex":"Estou saindo agora.", "exZh":"我现在出门。" },
    { "id":"pt-u8-8", "word":"tarde", "zh":"下午", "pron":"/ˈtaʁdʒi/", "ex":"Vejo você à tarde.", "exZh":"下午见。" }
  ]},
  { "id": "pt-u9", "langId": "pt", "level": "A1", "title": "颜色与形容", "subtitle": "Cores e adjetivos", "icon": "🎨", "grammar": "形容词一般放名词后并变性数：um carro vermelho、uma camisa branca。", "words": [
    { "id":"pt-u9-1", "word":"vermelho", "zh":"红色", "pron":"/veʁˈmeʎu/", "ex":"O carro é vermelho.", "exZh":"车是红色的。" },
    { "id":"pt-u9-2", "word":"azul", "zh":"蓝色", "pron":"/aˈzuw/", "ex":"O céu está azul.", "exZh":"天空是蓝的。" },
    { "id":"pt-u9-3", "word":"branco", "zh":"白色", "pron":"/ˈbɾãku/", "ex":"Uma camisa branca.", "exZh":"一件白衬衫。" },
    { "id":"pt-u9-4", "word":"preto", "zh":"黑色", "pron":"/ˈpɾetu/", "ex":"Prefiro o preto.", "exZh":"我更喜欢黑的。" },
    { "id":"pt-u9-5", "word":"grande", "zh":"大", "pron":"/ˈɡɾãdʒi/", "ex":"Uma casa grande.", "exZh":"一栋大房子。" },
    { "id":"pt-u9-6", "word":"pequeno", "zh":"小", "pron":"/peˈkenu/", "ex":"Um apartamento pequeno.", "exZh":"一间小公寓。" },
    { "id":"pt-u9-7", "word":"novo", "zh":"新", "pron":"/ˈnovu/", "ex":"Tenho um celular novo.", "exZh":"我有一部新手机。" },
    { "id":"pt-u9-8", "word":"bonito", "zh":"漂亮", "pron":"/boˈnitu/", "ex":"Que bonito!", "exZh":"真好看！" }
  ]},
  { "id": "pt-u10", "langId": "pt", "level": "A2", "title": "天气与季节", "subtitle": "O tempo", "icon": "🌤️", "grammar": "天气用 faz / há：Faz frio、Faz sol、Está chovendo。", "words": [
    { "id":"pt-u10-1", "word":"sol", "zh":"太阳", "pron":"/sow/", "ex":"Hoje faz sol.", "exZh":"今天出太阳。" },
    { "id":"pt-u10-2", "word":"chuva", "zh":"雨", "pron":"/ˈʃuva/", "ex":"A chuva começou.", "exZh":"下雨了。" },
    { "id":"pt-u10-3", "word":"frio", "zh":"冷", "pron":"/ˈfɾiu/", "ex":"Hoje está frio.", "exZh":"今天很冷。" },
    { "id":"pt-u10-4", "word":"calor", "zh":"热", "pron":"/kaˈloʁ/", "ex":"Hoje faz calor.", "exZh":"今天很热。" },
    { "id":"pt-u10-5", "word":"vento", "zh":"风", "pron":"/ˈvẽtu/", "ex":"Há vento.", "exZh":"有风。" },
    { "id":"pt-u10-6", "word":"nuvem", "zh":"云", "pron":"/ˈnuvẽj/", "ex":"Há muitas nuvens.", "exZh":"天上有很多云。" },
    { "id":"pt-u10-7", "word":"verão", "zh":"夏天", "pron":"/veˈɾãw/", "ex":"No verão faz calor.", "exZh":"夏天很热。" },
    { "id":"pt-u10-8", "word":"inverno", "zh":"冬天", "pron":"/ĩˈveʁnu/", "ex":"No inverno neva.", "exZh":"冬天下雪。" }
  ]},
  { "id": "pt-u11", "langId": "pt", "level": "A2", "title": "方位与问路", "subtitle": "As direções", "icon": "🧭", "grammar": "«向右» à direita、«向左» à esquerda、«一直» em frente / reto。", "words": [
    { "id":"pt-u11-1", "word":"direita", "zh":"右边", "pron":"/dʒiˈɾejta/", "ex":"Vire à direita.", "exZh":"向右转。" },
    { "id":"pt-u11-2", "word":"esquerda", "zh":"左边", "pron":"/isˈkeʁda/", "ex":"Vire à esquerda.", "exZh":"向左转。" },
    { "id":"pt-u11-3", "word":"reto", "zh":"直；笔直", "pron":"/ˈʁetu/", "ex":"Siga reto.", "exZh":"一直往前走。" },
    { "id":"pt-u11-4", "word":"perto", "zh":"近", "pron":"/ˈpeʁtu/", "ex":"A estação é perto.", "exZh":"车站很近。" },
    { "id":"pt-u11-5", "word":"longe", "zh":"远", "pron":"/ˈlõʒi/", "ex":"A estação fica longe.", "exZh":"车站很远。" },
    { "id":"pt-u11-6", "word":"esquina", "zh":"拐角", "pron":"/isˈkina/", "ex":"Na esquina.", "exZh":"在拐角处。" },
    { "id":"pt-u11-7", "word":"metrô", "zh":"地铁", "pron":"/meˈtɾo/", "ex":"Vou de metrô.", "exZh":"我坐地铁去。" },
    { "id":"pt-u11-8", "word":"mapa", "zh":"地图", "pron":"/ˈmapa/", "ex":"Olhe o mapa.", "exZh":"看一下地图。" }
  ]},
  { "id": "pt-u12", "langId": "pt", "level": "A2", "title": "身体与健康", "subtitle": "O corpo e a saúde", "icon": "🩺", "grammar": "«我头疼» Estou com dor de cabeça / Dói a cabeça。", "words": [
    { "id":"pt-u12-1", "word":"cabeça", "zh":"头", "pron":"/kaˈbesa/", "ex":"Estou com dor de cabeça.", "exZh":"我头疼。" },
    { "id":"pt-u12-2", "word":"mão", "zh":"手", "pron":"/mãw/", "ex":"Lave as mãos.", "exZh":"洗洗手。" },
    { "id":"pt-u12-3", "word":"olho", "zh":"眼睛", "pron":"/ˈoʎu/", "ex":"Meus olhos estão cansados.", "exZh":"眼睛很累。" },
    { "id":"pt-u12-4", "word":"pé", "zh":"脚", "pron":"/pɛ/", "ex":"Meu pé dói.", "exZh":"我的脚疼。" },
    { "id":"pt-u12-5", "word":"médico", "zh":"医生", "pron":"/ˈmɛdʒiku/", "ex":"Vá ao médico.", "exZh":"去看医生。" },
    { "id":"pt-u12-6", "word":"farmácia", "zh":"药店", "pron":"/faʁˈmasja/", "ex":"Onde fica a farmácia?", "exZh":"药店在哪里？" },
    { "id":"pt-u12-7", "word":"doente", "zh":"生病的", "pron":"/doˈẽtʃi/", "ex":"Estou doente.", "exZh":"我生病了。" },
    { "id":"pt-u12-8", "word":"descanso", "zh":"休息", "pron":"/disˈkãsu/", "ex":"Você precisa de descanso.", "exZh":"你需要休息。" }
  ]},
  { "id": "pt-u13", "langId": "pt", "level": "A2", "title": "工作与学习", "subtitle": "Trabalho e estudo", "icon": "💼", "grammar": "介词 em / no / na / de：Estou no escritório、estudante de português。", "words": [
    { "id":"pt-u13-1", "word":"escritório", "zh":"办公室", "pron":"/iskɾiˈtɔɾju/", "ex":"Estou no escritório.", "exZh":"我在办公室。" },
    { "id":"pt-u13-2", "word":"reunião", "zh":"会议", "pron":"/ʁeuniˈãw/", "ex":"A reunião é às três.", "exZh":"三点开会。" },
    { "id":"pt-u13-3", "word":"e-mail", "zh":"邮件", "pron":"/ˈimejl/", "ex":"Vou enviar um e-mail.", "exZh":"我发一封邮件。" },
    { "id":"pt-u13-4", "word":"escola", "zh":"学校", "pron":"/isˈkɔla/", "ex":"A escola é perto.", "exZh":"学校很近。" },
    { "id":"pt-u13-5", "word":"estudante", "zh":"学生", "pron":"/istuˈdãtʃi/", "ex":"Sou estudante.", "exZh":"我是学生。" },
    { "id":"pt-u13-6", "word":"professor", "zh":"老师", "pron":"/pɾofeˈsoʁ/", "ex":"O professor é bom.", "exZh":"老师很好。" },
    { "id":"pt-u13-7", "word":"prova", "zh":"考试", "pron":"/ˈpɾɔva/", "ex":"Amanhã tem prova.", "exZh":"明天有考试。" },
    { "id":"pt-u13-8", "word":"estudar", "zh":"学习", "pron":"/istuˈdaʁ/", "ex":"Estudo idiomas.", "exZh":"我学外语。" }
  ]},
  { "id": "pt-u14", "langId": "pt", "level": "A2", "title": "核心动词", "subtitle": "Verbos essenciais", "icon": "⚡", "grammar": "ser 表本质，estar 表状态与位置；querer / poder 后接原形。", "words": [
    { "id":"pt-u14-1", "word":"ser", "zh":"是（本质）", "pron":"/seʁ/", "ex":"Sou professor.", "exZh":"我是老师。" },
    { "id":"pt-u14-2", "word":"estar", "zh":"在；位于", "pron":"/isˈtaʁ/", "ex":"Estou em casa.", "exZh":"我在家。" },
    { "id":"pt-u14-3", "word":"ter", "zh":"有", "pron":"/teʁ/", "ex":"Tenho dois irmãos.", "exZh":"我有两个兄弟。" },
    { "id":"pt-u14-4", "word":"fazer", "zh":"做", "pron":"/faˈzeʁ/", "ex":"O que você faz?", "exZh":"你在做什么？" },
    { "id":"pt-u14-5", "word":"ir", "zh":"去", "pron":"/iʁ/", "ex":"Vou ao mercado.", "exZh":"我去市场。" },
    { "id":"pt-u14-6", "word":"vir", "zh":"来", "pron":"/viʁ/", "ex":"Você vem comigo?", "exZh":"你跟我一起来吗？" },
    { "id":"pt-u14-7", "word":"querer", "zh":"想要", "pron":"/keˈɾeʁ/", "ex":"Quero um café.", "exZh":"我想要杯咖啡。" },
    { "id":"pt-u14-8", "word":"poder", "zh":"能；可以", "pron":"/poˈdeʁ/", "ex":"Pode me ajudar?", "exZh":"你能帮我吗？" }
  ]},
  { "id": "pt-u15", "langId": "pt", "level": "A2", "title": "过去与计划", "subtitle": "Passado e planos", "icon": "📅", "grammar": "简单过去时 pretérito perfeito：comprei、fui；ontem、nunca。", "words": [
    { "id":"pt-u15-1", "word":"ontem", "zh":"昨天", "pron":"/ˈõtẽj/", "ex":"Ontem fui ao cinema.", "exZh":"昨天我去看电影了。" },
    { "id":"pt-u15-2", "word":"fui", "zh":"我去了", "pron":"/fuj/", "ex":"Fui ver um amigo.", "exZh":"我去看了个朋友。" },
    { "id":"pt-u15-3", "word":"comprei", "zh":"我买了", "pron":"/kõˈpɾej/", "ex":"Comprei um livro.", "exZh":"我买了一本书。" },
    { "id":"pt-u15-4", "word":"viagem", "zh":"旅行", "pron":"/viˈaʒẽj/", "ex":"A viagem foi curta.", "exZh":"旅行很短。" },
    { "id":"pt-u15-5", "word":"próximo", "zh":"下一个", "pron":"/ˈpɾɔsimu/", "ex":"O próximo fim de semana.", "exZh":"下个周末。" },
    { "id":"pt-u15-6", "word":"planejo", "zh":"我计划", "pron":"/plaˈneʒu/", "ex":"Planejo viajar em junho.", "exZh":"我打算六月去旅行。" },
    { "id":"pt-u15-7", "word":"noite passada", "zh":"昨晚", "pron":"/ˈnojtʃi paˈsada/", "ex":"Choveu na noite passada.", "exZh":"昨晚下雨了。" },
    { "id":"pt-u15-8", "word":"nunca", "zh":"从不", "pron":"/ˈnũka/", "ex":"Nunca chego atrasado.", "exZh":"我从不迟到。" }
  ]},
  { "id": "ja-u4", "langId": "ja", "level": "A1", "title": "数字与计数", "subtitle": "数字", "icon": "🔢", "grammar": "数字 一（いち）二（に）三（さん）；数东西用助数词「〜つ / 〜杯」。", "words": [
    { "id":"ja-u4-1", "word":"一", "zh":"一", "pron":"ichi", "ex":"いち、に、さん。", "exZh":"一、二、三。" },
    { "id":"ja-u4-2", "word":"二", "zh":"二", "pron":"ni", "ex":"コーヒーを二つください。", "exZh":"我要两杯咖啡。" },
    { "id":"ja-u4-3", "word":"三", "zh":"三", "pron":"san", "ex":"三人、お願いします。", "exZh":"三个人，谢谢。" },
    { "id":"ja-u4-4", "word":"十", "zh":"十", "pron":"jū", "ex":"今十時です。", "exZh":"现在十点。" },
    { "id":"ja-u4-5", "word":"百", "zh":"一百", "pron":"hyaku", "ex":"百ユーロです。", "exZh":"要一百欧元。" },
    { "id":"ja-u4-6", "word":"第一", "zh":"第一", "pron":"daiichi", "ex":"第一日目です。", "exZh":"这是我第一天。" },
    { "id":"ja-u4-7", "word":"多い", "zh":"很多", "pron":"ōi", "ex":"ここには人が多いです。", "exZh":"这里有很多人。" },
    { "id":"ja-u4-8", "word":"少し", "zh":"一点；少", "pron":"sukoshi", "ex":"砂糖を少しください。", "exZh":"请给我一点糖。" }
  ]},
  { "id": "ja-u5", "langId": "ja", "level": "A1", "title": "自我介绍", "subtitle": "自己紹介", "icon": "🙋", "grammar": "「我叫」は「〜です / 〜と言います」；自我介绍常用「よろしくお願いします」。", "words": [
    { "id":"ja-u5-1", "word":"〜と言います", "zh":"我叫", "pron":"to iimasu", "ex":"アンナと言います。", "exZh":"我叫安娜。" },
    { "id":"ja-u5-2", "word":"です", "zh":"我是", "pron":"desu", "ex":"私は中国人です。", "exZh":"我是中国人。" },
    { "id":"ja-u5-3", "word":"名前", "zh":"名字", "pron":"namae", "ex":"お名前は何ですか。", "exZh":"你叫什么名字？" },
    { "id":"ja-u5-4", "word":"〜から来ました", "zh":"从；来自", "pron":"kara kimashita", "ex":"上海から来ました。", "exZh":"我来自上海。" },
    { "id":"ja-u5-5", "word":"住んでいます", "zh":"我住", "pron":"sunde imasu", "ex":"中心部に住んでいます。", "exZh":"我住在市中心。" },
    { "id":"ja-u5-6", "word":"歳", "zh":"岁；年", "pron":"sai", "ex":"二十歳です。", "exZh":"我二十岁。" },
    { "id":"ja-u5-7", "word":"はじめまして", "zh":"高兴；愉快", "pron":"hajimemashite", "ex":"はじめまして、よろしく。", "exZh":"很高兴认识你。" },
    { "id":"ja-u5-8", "word":"も", "zh":"也", "pron":"mo", "ex":"私もです。", "exZh":"我也是。" }
  ]},
  { "id": "ja-u6", "langId": "ja", "level": "A1", "title": "家庭与人物", "subtitle": "家族", "icon": "👨‍👩‍👧", "grammar": "称呼家人分内外：自己的母亲说「母（はは）」，别人的说「お母さん」。", "words": [
    { "id":"ja-u6-1", "word":"家族", "zh":"家庭", "pron":"kazoku", "ex":"家族が多いです。", "exZh":"我家人口多。" },
    { "id":"ja-u6-2", "word":"母", "zh":"母亲", "pron":"haha", "ex":"母は料理が上手です。", "exZh":"我妈妈做饭很好吃。" },
    { "id":"ja-u6-3", "word":"父", "zh":"父亲", "pron":"chichi", "ex":"父はここで働いています。", "exZh":"我爸爸在这儿工作。" },
    { "id":"ja-u6-4", "word":"息子", "zh":"儿子", "pron":"musuko", "ex":"息子が一人います。", "exZh":"我有一个儿子。" },
    { "id":"ja-u6-5", "word":"姉", "zh":"姐妹", "pron":"ane", "ex":"姉は勉強しています。", "exZh":"我姐姐在读书。" },
    { "id":"ja-u6-6", "word":"夫", "zh":"丈夫", "pron":"otto", "ex":"彼女の夫は医者です。", "exZh":"她丈夫是医生。" },
    { "id":"ja-u6-7", "word":"子供", "zh":"小孩", "pron":"kodomo", "ex":"子供が遊んでいます。", "exZh":"小孩在玩。" },
    { "id":"ja-u6-8", "word":"人", "zh":"人", "pron":"hito", "ex":"親切な人です。", "exZh":"他是个和善的人。" }
  ]},
  { "id": "ja-u7", "langId": "ja", "level": "A1", "title": "饮食", "subtitle": "食事", "icon": "🍽️", "grammar": "「我想要」用「〜が欲しい / 〜をください」；「我不吃肉」肉は食べません。", "words": [
    { "id":"ja-u7-1", "word":"朝ご飯", "zh":"早餐", "pron":"asagohan", "ex":"七時に朝ご飯を食べます。", "exZh":"我七点吃早饭。" },
    { "id":"ja-u7-2", "word":"パン", "zh":"面包", "pron":"pan", "ex":"パンをください。", "exZh":"我要面包。" },
    { "id":"ja-u7-3", "word":"コーヒー", "zh":"咖啡", "pron":"kōhī", "ex":"コーヒーを一杯ください。", "exZh":"一杯咖啡。" },
    { "id":"ja-u7-4", "word":"ご飯", "zh":"米饭", "pron":"gohan", "ex":"ご飯ができました。", "exZh":"米饭好了。" },
    { "id":"ja-u7-5", "word":"肉", "zh":"肉", "pron":"niku", "ex":"肉は食べません。", "exZh":"我不吃肉。" },
    { "id":"ja-u7-6", "word":"魚", "zh":"鱼", "pron":"sakana", "ex":"魚は新鮮です。", "exZh":"这鱼很新鲜。" },
    { "id":"ja-u7-7", "word":"野菜", "zh":"蔬菜", "pron":"yasai", "ex":"野菜をたくさん食べて。", "exZh":"多吃点蔬菜。" },
    { "id":"ja-u7-8", "word":"飲み物", "zh":"饮料", "pron":"nomimono", "ex":"何を飲みますか。", "exZh":"你想喝什么？" }
  ]},
  { "id": "ja-u8", "langId": "ja", "level": "A1", "title": "时间与日期", "subtitle": "時間と日付", "icon": "🕐", "grammar": "「现在几点」今何時ですか；「下午」午後（ごご）。", "words": [
    { "id":"ja-u8-1", "word":"何時", "zh":"小时；点钟", "pron":"nanji", "ex":"今何時ですか。", "exZh":"现在几点？" },
    { "id":"ja-u8-2", "word":"日", "zh":"天；日", "pron":"hi", "ex":"今日はいい日です。", "exZh":"今天是个好日子。" },
    { "id":"ja-u8-3", "word":"来週", "zh":"星期", "pron":"raishū", "ex":"また来週。", "exZh":"下周见。" },
    { "id":"ja-u8-4", "word":"月", "zh":"月", "pron":"getsu", "ex":"来月行きます。", "exZh":"下个月。" },
    { "id":"ja-u8-5", "word":"年", "zh":"年", "pron":"nen", "ex":"新年おめでとう。", "exZh":"新年快乐。" },
    { "id":"ja-u8-6", "word":"月曜日", "zh":"星期一", "pron":"getsuyōbi", "ex":"月曜日に始めます。", "exZh":"我周一开始。" },
    { "id":"ja-u8-7", "word":"今", "zh":"现在", "pron":"ima", "ex":"今出かけます。", "exZh":"我现在出门。" },
    { "id":"ja-u8-8", "word":"午後", "zh":"下午", "pron":"gogo", "ex":"午後会いましょう。", "exZh":"下午见。" }
  ]},
  { "id": "ja-u9", "langId": "ja", "level": "A1", "title": "颜色与形容", "subtitle": "色と形容詞", "icon": "🎨", "grammar": "い形容词直接修饰名词（赤い車），な形容词要加「な」（静かな部屋）。", "words": [
    { "id":"ja-u9-1", "word":"赤い", "zh":"红色", "pron":"akai", "ex":"車は赤いです。", "exZh":"车是红色的。" },
    { "id":"ja-u9-2", "word":"青い", "zh":"蓝色", "pron":"aoi", "ex":"空が青いです。", "exZh":"天空是蓝的。" },
    { "id":"ja-u9-3", "word":"白い", "zh":"白色", "pron":"shiroi", "ex":"白いシャツ。", "exZh":"一件白衬衫。" },
    { "id":"ja-u9-4", "word":"黒い", "zh":"黑色", "pron":"kuroi", "ex":"黒い方が好きです。", "exZh":"我更喜欢黑的。" },
    { "id":"ja-u9-5", "word":"大きい", "zh":"大", "pron":"ōkii", "ex":"大きい家。", "exZh":"一栋大房子。" },
    { "id":"ja-u9-6", "word":"小さい", "zh":"小", "pron":"chiisai", "ex":"小さいアパート。", "exZh":"一间小公寓。" },
    { "id":"ja-u9-7", "word":"新しい", "zh":"新", "pron":"atarashii", "ex":"新しい携帯があります。", "exZh":"我有一部新手机。" },
    { "id":"ja-u9-8", "word":"きれい", "zh":"漂亮", "pron":"kirei", "ex":"とてもきれい！", "exZh":"真好看！" }
  ]},
  { "id": "ja-u10", "langId": "ja", "level": "A2", "title": "天气与季节", "subtitle": "天気", "icon": "🌤️", "grammar": "天气用「〜です / が降っています」：寒いです、雨が降っています。", "words": [
    { "id":"ja-u10-1", "word":"太陽", "zh":"太阳", "pron":"taiyō", "ex":"太陽が照っています。", "exZh":"今天出太阳。" },
    { "id":"ja-u10-2", "word":"雨", "zh":"雨", "pron":"ame", "ex":"雨が降っています。", "exZh":"下雨了。" },
    { "id":"ja-u10-3", "word":"寒い", "zh":"冷", "pron":"samui", "ex":"今日は寒いです。", "exZh":"今天很冷。" },
    { "id":"ja-u10-4", "word":"暑い", "zh":"热", "pron":"atsui", "ex":"今日は暑いです。", "exZh":"今天很热。" },
    { "id":"ja-u10-5", "word":"風", "zh":"风", "pron":"kaze", "ex":"風が吹いています。", "exZh":"有风。" },
    { "id":"ja-u10-6", "word":"雲", "zh":"云", "pron":"kumo", "ex":"雲がたくさんあります。", "exZh":"天上有很多云。" },
    { "id":"ja-u10-7", "word":"夏", "zh":"夏天", "pron":"natsu", "ex":"夏は暑いです。", "exZh":"夏天很热。" },
    { "id":"ja-u10-8", "word":"冬", "zh":"冬天", "pron":"fuyu", "ex":"冬は雪が降ります。", "exZh":"冬天下雪。" }
  ]},
  { "id": "ja-u11", "langId": "ja", "level": "A2", "title": "方位与问路", "subtitle": "道案内", "icon": "🧭", "grammar": "「向右转」右に曲がってください；「一直」まっすぐ行ってください。", "words": [
    { "id":"ja-u11-1", "word":"右", "zh":"右边", "pron":"migi", "ex":"右に曲がってください。", "exZh":"向右转。" },
    { "id":"ja-u11-2", "word":"左", "zh":"左边", "pron":"hidari", "ex":"左に曲がってください。", "exZh":"向左转。" },
    { "id":"ja-u11-3", "word":"まっすぐ", "zh":"直；笔直", "pron":"massugu", "ex":"まっすぐ行ってください。", "exZh":"一直往前走。" },
    { "id":"ja-u11-4", "word":"近い", "zh":"近", "pron":"chikai", "ex":"駅は近いです。", "exZh":"车站很近。" },
    { "id":"ja-u11-5", "word":"遠い", "zh":"远", "pron":"tōi", "ex":"駅は遠いです。", "exZh":"车站很远。" },
    { "id":"ja-u11-6", "word":"角", "zh":"拐角", "pron":"kado", "ex":"角にあります。", "exZh":"在拐角处。" },
    { "id":"ja-u11-7", "word":"地下鉄", "zh":"地铁", "pron":"chikatetsu", "ex":"地下鉄で行きます。", "exZh":"我坐地铁去。" },
    { "id":"ja-u11-8", "word":"地図", "zh":"地图", "pron":"chizu", "ex":"地図を見てください。", "exZh":"看一下地图。" }
  ]},
  { "id": "ja-u12", "langId": "ja", "level": "A2", "title": "身体与健康", "subtitle": "体と健康", "icon": "🩺", "grammar": "「我头疼」頭が痛いです；身体部位 + が + 痛い。", "words": [
    { "id":"ja-u12-1", "word":"頭", "zh":"头", "pron":"atama", "ex":"頭が痛いです。", "exZh":"我头疼。" },
    { "id":"ja-u12-2", "word":"手", "zh":"手", "pron":"te", "ex":"手を洗って。", "exZh":"洗洗手。" },
    { "id":"ja-u12-3", "word":"目", "zh":"眼睛", "pron":"me", "ex":"目が疲れました。", "exZh":"眼睛很累。" },
    { "id":"ja-u12-4", "word":"足", "zh":"脚", "pron":"ashi", "ex":"足が痛いです。", "exZh":"我的脚疼。" },
    { "id":"ja-u12-5", "word":"医者", "zh":"医生", "pron":"isha", "ex":"医者に行って。", "exZh":"去看医生。" },
    { "id":"ja-u12-6", "word":"薬局", "zh":"药店", "pron":"yakkyoku", "ex":"薬局はどこですか。", "exZh":"药店在哪里？" },
    { "id":"ja-u12-7", "word":"病気", "zh":"生病的", "pron":"byōki", "ex":"病気です。", "exZh":"我生病了。" },
    { "id":"ja-u12-8", "word":"休む", "zh":"休息", "pron":"yasumu", "ex":"少し休んでください。", "exZh":"你需要休息。" }
  ]},
  { "id": "ja-u13", "langId": "ja", "level": "A2", "title": "工作与学习", "subtitle": "仕事と勉強", "icon": "💼", "grammar": "助词「で」表场所、「に」表存在、「へ」表方向：事務所にいます。", "words": [
    { "id":"ja-u13-1", "word":"事務所", "zh":"办公室", "pron":"jimusho", "ex":"事務所にいます。", "exZh":"我在办公室。" },
    { "id":"ja-u13-2", "word":"会議", "zh":"会议", "pron":"kaigi", "ex":"三時に会議があります。", "exZh":"三点开会。" },
    { "id":"ja-u13-3", "word":"メール", "zh":"邮件", "pron":"mēru", "ex":"メールを送ります。", "exZh":"我发一封邮件。" },
    { "id":"ja-u13-4", "word":"学校", "zh":"学校", "pron":"gakkō", "ex":"学校は近いです。", "exZh":"学校很近。" },
    { "id":"ja-u13-5", "word":"学生", "zh":"学生", "pron":"gakusei", "ex":"私は学生です。", "exZh":"我是学生。" },
    { "id":"ja-u13-6", "word":"先生", "zh":"老师", "pron":"sensei", "ex":"先生は親切です。", "exZh":"老师很好。" },
    { "id":"ja-u13-7", "word":"試験", "zh":"考试", "pron":"shiken", "ex":"明日は試験です。", "exZh":"明天有考试。" },
    { "id":"ja-u13-8", "word":"勉強する", "zh":"学习", "pron":"benkyō suru", "ex":"外国語を勉強します。", "exZh":"我学外语。" }
  ]},
  { "id": "ja-u14", "langId": "ja", "level": "A2", "title": "核心动词", "subtitle": "基本動詞", "icon": "⚡", "grammar": "动词按ます形 / て形变化；「たい」表想要、「できる」表能够。", "words": [
    { "id":"ja-u14-1", "word":"だ", "zh":"是（本质）", "pron":"da", "ex":"私は先生だ。", "exZh":"我是老师。" },
    { "id":"ja-u14-2", "word":"いる", "zh":"在；位于", "pron":"iru", "ex":"私は家にいます。", "exZh":"我在家。" },
    { "id":"ja-u14-3", "word":"ある", "zh":"有", "pron":"aru", "ex":"本があります。", "exZh":"有一本书。" },
    { "id":"ja-u14-4", "word":"する", "zh":"做", "pron":"suru", "ex":"何をしていますか。", "exZh":"你在做什么？" },
    { "id":"ja-u14-5", "word":"行く", "zh":"去", "pron":"iku", "ex":"市場に行きます。", "exZh":"我去市场。" },
    { "id":"ja-u14-6", "word":"来る", "zh":"来", "pron":"kuru", "ex":"一緒に来ませんか。", "exZh":"你跟我一起来吗？" },
    { "id":"ja-u14-7", "word":"欲しい", "zh":"想要", "pron":"hoshii", "ex":"コーヒーが欲しいです。", "exZh":"我想要杯咖啡。" },
    { "id":"ja-u14-8", "word":"できる", "zh":"能；可以", "pron":"dekiru", "ex":"手伝うことができますか。", "exZh":"你能帮我吗？" }
  ]},
  { "id": "ja-u15", "langId": "ja", "level": "A2", "title": "过去与计划", "subtitle": "過去と予定", "icon": "📅", "grammar": "过去用「〜ました / 〜た」：買いました、行きました；昨日、一度も〜ない。", "words": [
    { "id":"ja-u15-1", "word":"昨日", "zh":"昨天", "pron":"kinō", "ex":"昨日映画に行きました。", "exZh":"昨天我去看电影了。" },
    { "id":"ja-u15-2", "word":"行きました", "zh":"我去了", "pron":"ikimashita", "ex":"友達に会いに行きました。", "exZh":"我去看了个朋友。" },
    { "id":"ja-u15-3", "word":"買いました", "zh":"我买了", "pron":"kaimashita", "ex":"本を買いました。", "exZh":"我买了一本书。" },
    { "id":"ja-u15-4", "word":"旅行", "zh":"旅行", "pron":"ryokō", "ex":"旅行は短かったです。", "exZh":"旅行很短。" },
    { "id":"ja-u15-5", "word":"次の", "zh":"下一个", "pron":"tsugi no", "ex":"次の週末。", "exZh":"下个周末。" },
    { "id":"ja-u15-6", "word":"予定", "zh":"我计划", "pron":"yotei", "ex":"六月に旅行する予定です。", "exZh":"我打算六月去旅行。" },
    { "id":"ja-u15-7", "word":"昨夜", "zh":"昨晚", "pron":"sakuya", "ex":"昨夜は雨でした。", "exZh":"昨晚下雨了。" },
    { "id":"ja-u15-8", "word":"決して", "zh":"从不", "pron":"kesshite", "ex":"決して遅刻しません。", "exZh":"我从不迟到。" }
  ]},
  { "id": "ko-u4", "langId": "ko", "level": "A1", "title": "数字与计数", "subtitle": "숫자", "icon": "🔢", "grammar": "数字有汉字数词（일 이 삼）与固有数词（하나 둘 셋）两套，数东西用固有词。", "words": [
    { "id":"ko-u4-1", "word":"하나", "zh":"一", "pron":"hana", "ex":"하나, 둘, 셋.", "exZh":"一、二、三。" },
    { "id":"ko-u4-2", "word":"둘", "zh":"二", "pron":"dul", "ex":"커피 두 잔 주세요.", "exZh":"我要两杯咖啡。" },
    { "id":"ko-u4-3", "word":"셋", "zh":"三", "pron":"set", "ex":"세 명이요.", "exZh":"三个人，谢谢。" },
    { "id":"ko-u4-4", "word":"열", "zh":"十", "pron":"yeol", "ex":"지금 열 시예요.", "exZh":"现在十点。" },
    { "id":"ko-u4-5", "word":"백", "zh":"一百", "pron":"baek", "ex":"백 유로예요.", "exZh":"要一百欧元。" },
    { "id":"ko-u4-6", "word":"첫째", "zh":"第一", "pron":"cheotjjae", "ex":"오늘이 첫째 날이에요.", "exZh":"这是我第一天。" },
    { "id":"ko-u4-7", "word":"많다", "zh":"很多", "pron":"manta", "ex":"여기 사람이 많아요.", "exZh":"这里有很多人。" },
    { "id":"ko-u4-8", "word":"조금", "zh":"一点；少", "pron":"jogeum", "ex":"설탕 조금만 주세요.", "exZh":"请给我一点糖。" }
  ]},
  { "id": "ko-u5", "langId": "ko", "level": "A1", "title": "自我介绍", "subtitle": "자기소개", "icon": "🙋", "grammar": "「我叫」저는 아나입니다 / 제 이름은 ~입니다；「我是中国人」저는 중국 사람이에요。", "words": [
    { "id":"ko-u5-1", "word":"~라고 해요", "zh":"我叫", "pron":"rago haeyo", "ex":"아나라고 해요.", "exZh":"我叫安娜。" },
    { "id":"ko-u5-2", "word":"저는", "zh":"我是", "pron":"jeoneun", "ex":"저는 중국 사람이에요.", "exZh":"我是中国人。" },
    { "id":"ko-u5-3", "word":"이름", "zh":"名字", "pron":"ireum", "ex":"이름이 뭐예요?", "exZh":"你叫什么名字？" },
    { "id":"ko-u5-4", "word":"에서", "zh":"从；来自", "pron":"eseo", "ex":"상하이에서 왔어요.", "exZh":"我来自上海。" },
    { "id":"ko-u5-5", "word":"살아요", "zh":"我住", "pron":"sarayo", "ex":"시내에 살아요.", "exZh":"我住在市中心。" },
    { "id":"ko-u5-6", "word":"살", "zh":"岁；年", "pron":"sal", "ex":"스무 살이에요.", "exZh":"我二十岁。" },
    { "id":"ko-u5-7", "word":"반갑습니다", "zh":"高兴；愉快", "pron":"bangapseumnida", "ex":"만나서 반갑습니다.", "exZh":"很高兴认识你。" },
    { "id":"ko-u5-8", "word":"도", "zh":"也", "pron":"do", "ex":"저도요.", "exZh":"我也是。" }
  ]},
  { "id": "ko-u6", "langId": "ko", "level": "A1", "title": "家庭与人物", "subtitle": "가족", "icon": "👨‍👩‍👧", "grammar": "称呼前加「우리」很常见：우리 어머니；敬语用「~님 / ~세요」。", "words": [
    { "id":"ko-u6-1", "word":"가족", "zh":"家庭", "pron":"gajok", "ex":"우리 가족은 많아요.", "exZh":"我家人口多。" },
    { "id":"ko-u6-2", "word":"어머니", "zh":"母亲", "pron":"eomeoni", "ex":"우리 어머니는 요리를 잘해요.", "exZh":"我妈妈做饭很好吃。" },
    { "id":"ko-u6-3", "word":"아버지", "zh":"父亲", "pron":"abeoji", "ex":"아버지는 여기서 일해요.", "exZh":"我爸爸在这儿工作。" },
    { "id":"ko-u6-4", "word":"아들", "zh":"儿子", "pron":"adeul", "ex":"아들이 하나 있어요.", "exZh":"我有一个儿子。" },
    { "id":"ko-u6-5", "word":"자매", "zh":"姐妹", "pron":"jamae", "ex":"제 자매는 공부해요.", "exZh":"我姐姐在读书。" },
    { "id":"ko-u6-6", "word":"남편", "zh":"丈夫", "pron":"nampyeon", "ex":"그분 남편은 의사예요.", "exZh":"她丈夫是医生。" },
    { "id":"ko-u6-7", "word":"아이", "zh":"小孩", "pron":"ai", "ex":"아이가 놀아요.", "exZh":"小孩在玩。" },
    { "id":"ko-u6-8", "word":"사람", "zh":"人", "pron":"saram", "ex":"친절한 사람이에요.", "exZh":"他是个和善的人。" }
  ]},
  { "id": "ko-u7", "langId": "ko", "level": "A1", "title": "饮食", "subtitle": "음식", "icon": "🍽️", "grammar": "「我想要」~고 싶어요 / ~주세요；「我不吃肉」고기를 안 먹어요。", "words": [
    { "id":"ko-u7-1", "word":"아침밥", "zh":"早餐", "pron":"achimbap", "ex":"일곱 시에 아침밥을 먹어요.", "exZh":"我七点吃早饭。" },
    { "id":"ko-u7-2", "word":"빵", "zh":"面包", "pron":"ppang", "ex":"빵 주세요.", "exZh":"我要面包。" },
    { "id":"ko-u7-3", "word":"커피", "zh":"咖啡", "pron":"keopi", "ex":"커피 한 잔 주세요.", "exZh":"一杯咖啡。" },
    { "id":"ko-u7-4", "word":"밥", "zh":"米饭", "pron":"bap", "ex":"밥이 다 됐어요.", "exZh":"米饭好了。" },
    { "id":"ko-u7-5", "word":"고기", "zh":"肉", "pron":"gogi", "ex":"고기는 안 먹어요.", "exZh":"我不吃肉。" },
    { "id":"ko-u7-6", "word":"생선", "zh":"鱼", "pron":"saengseon", "ex":"생선이 신선해요.", "exZh":"这鱼很新鲜。" },
    { "id":"ko-u7-7", "word":"채소", "zh":"蔬菜", "pron":"chaeso", "ex":"채소를 더 드세요.", "exZh":"多吃点蔬菜。" },
    { "id":"ko-u7-8", "word":"음료수", "zh":"饮料", "pron":"eumnyosu", "ex":"어떤 음료수가 있어요?", "exZh":"你想喝什么？" }
  ]},
  { "id": "ko-u8", "langId": "ko", "level": "A1", "title": "时间与日期", "subtitle": "시간과 날짜", "icon": "🕐", "grammar": "「现在几点」지금 몇 시예요?；「下午」오후；时间用「시 / 분」。", "words": [
    { "id":"ko-u8-1", "word":"시", "zh":"小时；点钟", "pron":"si", "ex":"지금 몇 시예요?", "exZh":"现在几点？" },
    { "id":"ko-u8-2", "word":"날", "zh":"天；日", "pron":"nal", "ex":"오늘은 좋은 날이에요.", "exZh":"今天是个好日子。" },
    { "id":"ko-u8-3", "word":"주", "zh":"星期", "pron":"ju", "ex":"다음 주에 봐요.", "exZh":"下周见。" },
    { "id":"ko-u8-4", "word":"달", "zh":"月", "pron":"dal", "ex":"다음 달에요.", "exZh":"下个月。" },
    { "id":"ko-u8-5", "word":"해", "zh":"年", "pron":"hae", "ex":"새해 복 많이 받으세요!", "exZh":"新年快乐。" },
    { "id":"ko-u8-6", "word":"월요일", "zh":"星期一", "pron":"woryoil", "ex":"월요일에 시작해요.", "exZh":"我周一开始。" },
    { "id":"ko-u8-7", "word":"지금", "zh":"现在", "pron":"jigeum", "ex":"지금 나가요.", "exZh":"我现在出门。" },
    { "id":"ko-u8-8", "word":"오후", "zh":"下午", "pron":"ohu", "ex":"오후에 봐요.", "exZh":"下午见。" }
  ]},
  { "id": "ko-u9", "langId": "ko", "level": "A1", "title": "颜色与形容", "subtitle": "색깔과 형용사", "icon": "🎨", "grammar": "形容词也当动词用，修饰名词要加「~은 / ~는」：빨간 차、파란 하늘。", "words": [
    { "id":"ko-u9-1", "word":"빨간색", "zh":"红色", "pron":"ppalgansaek", "ex":"차가 빨간색이에요.", "exZh":"车是红色的。" },
    { "id":"ko-u9-2", "word":"파란색", "zh":"蓝色", "pron":"paransaek", "ex":"하늘이 파래요.", "exZh":"天空是蓝的。" },
    { "id":"ko-u9-3", "word":"하얀색", "zh":"白色", "pron":"hayansaek", "ex":"하얀 셔츠.", "exZh":"一件白衬衫。" },
    { "id":"ko-u9-4", "word":"검은색", "zh":"黑色", "pron":"geomeunsaek", "ex":"검은색이 더 좋아요.", "exZh":"我更喜欢黑的。" },
    { "id":"ko-u9-5", "word":"크다", "zh":"大", "pron":"keuda", "ex":"큰 집이에요.", "exZh":"一栋大房子。" },
    { "id":"ko-u9-6", "word":"작다", "zh":"小", "pron":"jakda", "ex":"작은 아파트예요.", "exZh":"一间小公寓。" },
    { "id":"ko-u9-7", "word":"새", "zh":"新", "pron":"sae", "ex":"새 휴대폰이 있어요.", "exZh":"我有一部新手机。" },
    { "id":"ko-u9-8", "word":"예쁘다", "zh":"漂亮", "pron":"yeppeuda", "ex":"정말 예뻐요!", "exZh":"真好看！" }
  ]},
  { "id": "ko-u10", "langId": "ko", "level": "A2", "title": "天气与季节", "subtitle": "날씨", "icon": "🌤️", "grammar": "天气用「~아요/어요」：추워요、더워요、비가 와요。", "words": [
    { "id":"ko-u10-1", "word":"태양", "zh":"太阳", "pron":"taeyang", "ex":"태양이 빛나요.", "exZh":"今天出太阳。" },
    { "id":"ko-u10-2", "word":"비", "zh":"雨", "pron":"bi", "ex":"비가 와요.", "exZh":"下雨了。" },
    { "id":"ko-u10-3", "word":"춥다", "zh":"冷", "pron":"chupda", "ex":"오늘 추워요.", "exZh":"今天很冷。" },
    { "id":"ko-u10-4", "word":"덥다", "zh":"热", "pron":"deopda", "ex":"오늘 더워요.", "exZh":"今天很热。" },
    { "id":"ko-u10-5", "word":"바람", "zh":"风", "pron":"baram", "ex":"바람이 불어요.", "exZh":"有风。" },
    { "id":"ko-u10-6", "word":"구름", "zh":"云", "pron":"gureum", "ex":"구름이 많아요.", "exZh":"天上有很多云。" },
    { "id":"ko-u10-7", "word":"여름", "zh":"夏天", "pron":"yeoreum", "ex":"여름은 더워요.", "exZh":"夏天很热。" },
    { "id":"ko-u10-8", "word":"겨울", "zh":"冬天", "pron":"gyeoul", "ex":"겨울에 눈이 와요.", "exZh":"冬天下雪。" }
  ]},
  { "id": "ko-u11", "langId": "ko", "level": "A2", "title": "方位与问路", "subtitle": "길 찾기", "icon": "🧭", "grammar": "「向右转」오른쪽으로 가세요；「一直」쭉 가세요；「拐角」모퉁이。", "words": [
    { "id":"ko-u11-1", "word":"오른쪽", "zh":"右边", "pron":"oreunjjok", "ex":"오른쪽으로 가세요.", "exZh":"向右转。" },
    { "id":"ko-u11-2", "word":"왼쪽", "zh":"左边", "pron":"oenjjok", "ex":"왼쪽으로 가세요.", "exZh":"向左转。" },
    { "id":"ko-u11-3", "word":"직진", "zh":"直；笔直", "pron":"jikjin", "ex":"직진하세요.", "exZh":"一直往前走。" },
    { "id":"ko-u11-4", "word":"가깝다", "zh":"近", "pron":"gakkapda", "ex":"역이 가까워요.", "exZh":"车站很近。" },
    { "id":"ko-u11-5", "word":"멀다", "zh":"远", "pron":"meolda", "ex":"역이 멀어요.", "exZh":"车站很远。" },
    { "id":"ko-u11-6", "word":"모퉁이", "zh":"拐角", "pron":"motungi", "ex":"모퉁이에 있어요.", "exZh":"在拐角处。" },
    { "id":"ko-u11-7", "word":"지하철", "zh":"地铁", "pron":"jihacheol", "ex":"지하철을 타고 가요.", "exZh":"我坐地铁去。" },
    { "id":"ko-u11-8", "word":"지도", "zh":"地图", "pron":"jido", "ex":"지도를 보세요.", "exZh":"看一下地图。" }
  ]},
  { "id": "ko-u12", "langId": "ko", "level": "A2", "title": "身体与健康", "subtitle": "몸과 건강", "icon": "🩺", "grammar": "「我头疼」머리가 아파요；身体部位 + 가/이 + 아프다。", "words": [
    { "id":"ko-u12-1", "word":"머리", "zh":"头", "pron":"meori", "ex":"머리가 아파요.", "exZh":"我头疼。" },
    { "id":"ko-u12-2", "word":"손", "zh":"手", "pron":"son", "ex":"손을 씻으세요.", "exZh":"洗洗手。" },
    { "id":"ko-u12-3", "word":"눈", "zh":"眼睛", "pron":"nun", "ex":"눈이 피곤해요.", "exZh":"眼睛很累。" },
    { "id":"ko-u12-4", "word":"발", "zh":"脚", "pron":"bal", "ex":"발이 아파요.", "exZh":"我的脚疼。" },
    { "id":"ko-u12-5", "word":"의사", "zh":"医生", "pron":"uisa", "ex":"의사에게 가 보세요.", "exZh":"去看医生。" },
    { "id":"ko-u12-6", "word":"약국", "zh":"药店", "pron":"yakguk", "ex":"약국이 어디예요?", "exZh":"药店在哪里？" },
    { "id":"ko-u12-7", "word":"아프다", "zh":"生病的", "pron":"apeuda", "ex":"저는 아파요.", "exZh":"我生病了。" },
    { "id":"ko-u12-8", "word":"휴식", "zh":"休息", "pron":"hyusik", "ex":"휴식이 필요해요.", "exZh":"你需要休息。" }
  ]},
  { "id": "ko-u13", "langId": "ko", "level": "A2", "title": "工作与学习", "subtitle": "일과 공부", "icon": "💼", "grammar": "助词「에서」表场所、「에」表存在与方向：사무실에 있어요。", "words": [
    { "id":"ko-u13-1", "word":"사무실", "zh":"办公室", "pron":"samusil", "ex":"사무실에 있어요.", "exZh":"我在办公室。" },
    { "id":"ko-u13-2", "word":"회의", "zh":"会议", "pron":"hoeui", "ex":"세 시에 회의가 있어요.", "exZh":"三点开会。" },
    { "id":"ko-u13-3", "word":"이메일", "zh":"邮件", "pron":"imeil", "ex":"이메일을 보낼게요.", "exZh":"我发一封邮件。" },
    { "id":"ko-u13-4", "word":"학교", "zh":"学校", "pron":"hakgyo", "ex":"학교가 가까워요.", "exZh":"学校很近。" },
    { "id":"ko-u13-5", "word":"학생", "zh":"学生", "pron":"haksaeng", "ex":"저는 학생이에요.", "exZh":"我是学生。" },
    { "id":"ko-u13-6", "word":"선생님", "zh":"老师", "pron":"seonsaengnim", "ex":"선생님이 친절해요.", "exZh":"老师很好。" },
    { "id":"ko-u13-7", "word":"시험", "zh":"考试", "pron":"siheom", "ex":"내일 시험이 있어요.", "exZh":"明天有考试。" },
    { "id":"ko-u13-8", "word":"공부하다", "zh":"学习", "pron":"gongbuhada", "ex":"외국어를 공부해요.", "exZh":"我学外语。" }
  ]},
  { "id": "ko-u14", "langId": "ko", "level": "A2", "title": "核心动词", "subtitle": "기본 동사", "icon": "⚡", "grammar": "动词按「~아요/어요」变化；「~고 싶다」想要、「~할 수 있다」能够。", "words": [
    { "id":"ko-u14-1", "word":"이다", "zh":"是（本质）", "pron":"ida", "ex":"저는 선생님입니다.", "exZh":"我是老师。" },
    { "id":"ko-u14-2", "word":"있다", "zh":"在；位于", "pron":"itda", "ex":"저는 집에 있어요.", "exZh":"我在家。" },
    { "id":"ko-u14-3", "word":"가지다", "zh":"有", "pron":"gajida", "ex":"돈을 가지고 있어요.", "exZh":"我带着钱。" },
    { "id":"ko-u14-4", "word":"하다", "zh":"做", "pron":"hada", "ex":"뭐 하고 있어요?", "exZh":"你在做什么？" },
    { "id":"ko-u14-5", "word":"가다", "zh":"去", "pron":"gada", "ex":"시장에 가요.", "exZh":"我去市场。" },
    { "id":"ko-u14-6", "word":"오다", "zh":"来", "pron":"oda", "ex":"같이 올래요?", "exZh":"你跟我一起来吗？" },
    { "id":"ko-u14-7", "word":"원하다", "zh":"想要", "pron":"wonhada", "ex":"커피 한 잔 원해요.", "exZh":"我想要杯咖啡。" },
    { "id":"ko-u14-8", "word":"할 수 있다", "zh":"能；可以", "pron":"hal su itda", "ex":"도와줄 수 있어요?", "exZh":"你能帮我吗？" }
  ]},
  { "id": "ko-u15", "langId": "ko", "level": "A2", "title": "过去与计划", "subtitle": "과거와 계획", "icon": "📅", "grammar": "过去用「~았/었어요」：샀어요、갔어요；어제、결코 ~않다。", "words": [
    { "id":"ko-u15-1", "word":"어제", "zh":"昨天", "pron":"eoje", "ex":"어제 영화 보러 갔어요.", "exZh":"昨天我去看电影了。" },
    { "id":"ko-u15-2", "word":"갔어요", "zh":"我去了", "pron":"gasseoyo", "ex":"친구를 만나러 갔어요.", "exZh":"我去看了个朋友。" },
    { "id":"ko-u15-3", "word":"샀어요", "zh":"我买了", "pron":"sasseoyo", "ex":"책을 한 권 샀어요.", "exZh":"我买了一本书。" },
    { "id":"ko-u15-4", "word":"여행", "zh":"旅行", "pron":"yeohaeng", "ex":"여행이 짧았어요.", "exZh":"旅行很短。" },
    { "id":"ko-u15-5", "word":"다음", "zh":"下一个", "pron":"daeum", "ex":"다음 주말에요.", "exZh":"下个周末。" },
    { "id":"ko-u15-6", "word":"계획하다", "zh":"我计划", "pron":"gyehoekhada", "ex":"유월에 여행할 계획이에요.", "exZh":"我打算六月去旅行。" },
    { "id":"ko-u15-7", "word":"어젯밤", "zh":"昨晚", "pron":"eojetbam", "ex":"어젯밤에 비가 왔어요.", "exZh":"昨晚下雨了。" },
    { "id":"ko-u15-8", "word":"절대", "zh":"从不", "pron":"jeoldae", "ex":"절대 늦지 않아요.", "exZh":"我从不迟到。" }
  ]},
  { "id": "ar-u4", "langId": "ar", "level": "A1", "title": "数字与计数", "subtitle": "الأرقام", "icon": "🔢", "grammar": "الأرقام ١ ٢ ٣؛书写从右向左，数字仍自左向右读。", "words": [
    { "id":"ar-u4-1", "word":"واحد", "zh":"一", "pron":"wāḥid", "ex":"واحد، اثنان، ثلاثة.", "exZh":"一、二、三。" },
    { "id":"ar-u4-2", "word":"اثنان", "zh":"二", "pron":"ithnān", "ex":"أريد قهوتين.", "exZh":"我要两杯咖啡。" },
    { "id":"ar-u4-3", "word":"ثلاثة", "zh":"三", "pron":"thalātha", "ex":"ثلاثة أشخاص، من فضلك.", "exZh":"三个人，谢谢。" },
    { "id":"ar-u4-4", "word":"عشرة", "zh":"十", "pron":"ʿashara", "ex":"الساعة العاشرة الآن.", "exZh":"现在十点。" },
    { "id":"ar-u4-5", "word":"مائة", "zh":"一百", "pron":"mi'a", "ex":"يكلف مائة يورو.", "exZh":"要一百欧元。" },
    { "id":"ar-u4-6", "word":"الأول", "zh":"第一", "pron":"al-awwal", "ex":"هذا يومي الأول.", "exZh":"这是我第一天。" },
    { "id":"ar-u4-7", "word":"كثير", "zh":"很多", "pron":"kathīr", "ex":"يوجد كثير من الناس هنا.", "exZh":"这里有很多人。" },
    { "id":"ar-u4-8", "word":"قليل", "zh":"一点；少", "pron":"qalīl", "ex":"قليلاً من السكر، من فضلك.", "exZh":"请给我一点糖。" }
  ]},
  { "id": "ar-u5", "langId": "ar", "level": "A1", "title": "自我介绍", "subtitle": "التعريف بالنفس", "icon": "🙋", "grammar": "「我叫」اسمي آنا；«我是中国人» أنا صيني（صينية）；名词分阴阳。", "words": [
    { "id":"ar-u5-1", "word":"اسمي", "zh":"我叫", "pron":"ismī", "ex":"اسمي آنا.", "exZh":"我叫安娜。" },
    { "id":"ar-u5-2", "word":"أنا", "zh":"我是", "pron":"anā", "ex":"أنا صيني.", "exZh":"我是中国人。" },
    { "id":"ar-u5-3", "word":"اسم", "zh":"名字", "pron":"ism", "ex":"ما اسمك؟", "exZh":"你叫什么名字？" },
    { "id":"ar-u5-4", "word":"من", "zh":"从；来自", "pron":"min", "ex":"أنا من شنغهاي.", "exZh":"我来自上海。" },
    { "id":"ar-u5-5", "word":"أسكن", "zh":"我住", "pron":"askunu", "ex":"أسكن في وسط المدينة.", "exZh":"我住在市中心。" },
    { "id":"ar-u5-6", "word":"عمر", "zh":"岁；年", "pron":"ʿumr", "ex":"عمري عشرون سنة.", "exZh":"我二十岁。" },
    { "id":"ar-u5-7", "word":"سعيد", "zh":"高兴；愉快", "pron":"saʿīd", "ex":"أنا سعيد بلقائك.", "exZh":"很高兴认识你。" },
    { "id":"ar-u5-8", "word":"أيضاً", "zh":"也", "pron":"ayḍan", "ex":"أنا أيضاً.", "exZh":"我也是。" }
  ]},
  { "id": "ar-u6", "langId": "ar", "level": "A1", "title": "家庭与人物", "subtitle": "العائلة", "icon": "👨‍👩‍👧", "grammar": "物主用后缀：أمي（我妈妈）、أبي（我爸爸）；أختي 我的姐妹。", "words": [
    { "id":"ar-u6-1", "word":"عائلة", "zh":"家庭", "pron":"ʿā'ila", "ex":"عائلتي كبيرة.", "exZh":"我家人口多。" },
    { "id":"ar-u6-2", "word":"أم", "zh":"母亲", "pron":"umm", "ex":"أمي تطبخ جيداً.", "exZh":"我妈妈做饭很好吃。" },
    { "id":"ar-u6-3", "word":"أب", "zh":"父亲", "pron":"ab", "ex":"أبي يعمل هنا.", "exZh":"我爸爸在这儿工作。" },
    { "id":"ar-u6-4", "word":"ابن", "zh":"儿子", "pron":"ibn", "ex":"لدي ابن.", "exZh":"我有一个儿子。" },
    { "id":"ar-u6-5", "word":"أخت", "zh":"姐妹", "pron":"ukht", "ex":"أختي تدرس.", "exZh":"我姐姐在读书。" },
    { "id":"ar-u6-6", "word":"زوج", "zh":"丈夫", "pron":"zawj", "ex":"زوجها طبيب.", "exZh":"她丈夫是医生。" },
    { "id":"ar-u6-7", "word":"طفل", "zh":"小孩", "pron":"ṭifl", "ex":"الطفل يلعب.", "exZh":"小孩在玩。" },
    { "id":"ar-u6-8", "word":"شخص", "zh":"人", "pron":"shakhṣ", "ex":"إنه شخص لطيف.", "exZh":"他是个和善的人。" }
  ]},
  { "id": "ar-u7", "langId": "ar", "level": "A1", "title": "饮食", "subtitle": "الطعام والشراب", "icon": "🍽️", "grammar": "«我想要» أريد + 名词；否定用 لا：لا آكل اللحم。", "words": [
    { "id":"ar-u7-1", "word":"إفطار", "zh":"早餐", "pron":"ifṭār", "ex":"أتناول الإفطار في السابعة.", "exZh":"我七点吃早饭。" },
    { "id":"ar-u7-2", "word":"خبز", "zh":"面包", "pron":"khubz", "ex":"أريد خبزاً.", "exZh":"我要面包。" },
    { "id":"ar-u7-3", "word":"قهوة", "zh":"咖啡", "pron":"qahwa", "ex":"قهوة من فضلك.", "exZh":"一杯咖啡。" },
    { "id":"ar-u7-4", "word":"أرز", "zh":"米饭", "pron":"aruzz", "ex":"الأرز جاهز.", "exZh":"米饭好了。" },
    { "id":"ar-u7-5", "word":"لحم", "zh":"肉", "pron":"laḥm", "ex":"لا آكل اللحم.", "exZh":"我不吃肉。" },
    { "id":"ar-u7-6", "word":"سمك", "zh":"鱼", "pron":"samak", "ex":"السمك طازج.", "exZh":"这鱼很新鲜。" },
    { "id":"ar-u7-7", "word":"خضار", "zh":"蔬菜", "pron":"khuḍār", "ex":"كل المزيد من الخضار.", "exZh":"多吃点蔬菜。" },
    { "id":"ar-u7-8", "word":"مشروب", "zh":"饮料", "pron":"mashrūb", "ex":"أي مشروب تريد؟", "exZh":"你想喝什么？" }
  ]},
  { "id": "ar-u8", "langId": "ar", "level": "A1", "title": "时间与日期", "subtitle": "الوقت والتاريخ", "icon": "🕐", "grammar": "«几点» كم الساعة؟ / الساعة العاشرة；«下午» بعد الظهر。", "words": [
    { "id":"ar-u8-1", "word":"ساعة", "zh":"小时；点钟", "pron":"sāʿa", "ex":"كم الساعة؟", "exZh":"现在几点？" },
    { "id":"ar-u8-2", "word":"يوم", "zh":"天；日", "pron":"yawm", "ex":"اليوم يوم جميل.", "exZh":"今天是个好日子。" },
    { "id":"ar-u8-3", "word":"أسبوع", "zh":"星期", "pron":"usbūʿ", "ex":"إلى الأسبوع القادم.", "exZh":"下周见。" },
    { "id":"ar-u8-4", "word":"شهر", "zh":"月", "pron":"shahr", "ex":"الشهر القادم.", "exZh":"下个月。" },
    { "id":"ar-u8-5", "word":"سنة", "zh":"年", "pron":"sana", "ex":"سنة جديدة سعيدة!", "exZh":"新年快乐。" },
    { "id":"ar-u8-6", "word":"الاثنين", "zh":"星期一", "pron":"al-ithnayn", "ex":"أبدأ يوم الاثنين.", "exZh":"我周一开始。" },
    { "id":"ar-u8-7", "word":"الآن", "zh":"现在", "pron":"al-ān", "ex":"أخرج الآن.", "exZh":"我现在出门。" },
    { "id":"ar-u8-8", "word":"بعد الظهر", "zh":"下午", "pron":"baʿd aẓ-ẓuhr", "ex":"أراك بعد الظهر.", "exZh":"下午见。" }
  ]},
  { "id": "ar-u9", "langId": "ar", "level": "A1", "title": "颜色与形容", "subtitle": "الألوان والصفات", "icon": "🎨", "grammar": "形容词跟名词变性数并加冠词 ال：سيارة حمراء、قميص أبيض。", "words": [
    { "id":"ar-u9-1", "word":"أحمر", "zh":"红色", "pron":"aḥmar", "ex":"السيارة حمراء.", "exZh":"车是红色的。" },
    { "id":"ar-u9-2", "word":"أزرق", "zh":"蓝色", "pron":"azraq", "ex":"السماء زرقاء.", "exZh":"天空是蓝的。" },
    { "id":"ar-u9-3", "word":"أبيض", "zh":"白色", "pron":"abyaḍ", "ex":"قميص أبيض.", "exZh":"一件白衬衫。" },
    { "id":"ar-u9-4", "word":"أسود", "zh":"黑色", "pron":"aswad", "ex":"أفضل الأسود.", "exZh":"我更喜欢黑的。" },
    { "id":"ar-u9-5", "word":"كبير", "zh":"大", "pron":"kabīr", "ex":"بيت كبير.", "exZh":"一栋大房子。" },
    { "id":"ar-u9-6", "word":"صغير", "zh":"小", "pron":"ṣaghīr", "ex":"شقة صغيرة.", "exZh":"一间小公寓。" },
    { "id":"ar-u9-7", "word":"جديد", "zh":"新", "pron":"jadīd", "ex":"لدي هاتف جديد.", "exZh":"我有一部新手机。" },
    { "id":"ar-u9-8", "word":"جميل", "zh":"漂亮", "pron":"jamīl", "ex":"جميل جداً!", "exZh":"真好看！" }
  ]},
  { "id": "ar-u10", "langId": "ar", "level": "A2", "title": "天气与季节", "subtitle": "الطقس", "icon": "🌤️", "grammar": "天气用 الجو / هناك：الجو بارد、تمطر、هناك ريح。", "words": [
    { "id":"ar-u10-1", "word":"شمس", "zh":"太阳", "pron":"shams", "ex":"الشمس مشرقة اليوم.", "exZh":"今天出太阳。" },
    { "id":"ar-u10-2", "word":"مطر", "zh":"雨", "pron":"maṭar", "ex":"المطر ينزل.", "exZh":"下雨了。" },
    { "id":"ar-u10-3", "word":"بارد", "zh":"冷", "pron":"bārid", "ex":"الجو بارد اليوم.", "exZh":"今天很冷。" },
    { "id":"ar-u10-4", "word":"حار", "zh":"热", "pron":"ḥārr", "ex":"الجو حار اليوم.", "exZh":"今天很热。" },
    { "id":"ar-u10-5", "word":"ريح", "zh":"风", "pron":"rīḥ", "ex":"هناك ريح.", "exZh":"有风。" },
    { "id":"ar-u10-6", "word":"غيمة", "zh":"云", "pron":"ghayma", "ex":"هناك كثير من الغيوم.", "exZh":"天上有很多云。" },
    { "id":"ar-u10-7", "word":"صيف", "zh":"夏天", "pron":"ṣayf", "ex":"الجو حار في الصيف.", "exZh":"夏天很热。" },
    { "id":"ar-u10-8", "word":"شتاء", "zh":"冬天", "pron":"shitā'", "ex":"يثلج في الشتاء.", "exZh":"冬天下雪。" }
  ]},
  { "id": "ar-u11", "langId": "ar", "level": "A2", "title": "方位与问路", "subtitle": "الاتجاهات", "icon": "🧭", "grammar": "«向右» إلى اليمين、«向左» إلى اليسار、«一直» على طول。", "words": [
    { "id":"ar-u11-1", "word":"اليمين", "zh":"右边", "pron":"al-yamīn", "ex":"انعطف إلى اليمين.", "exZh":"向右转。" },
    { "id":"ar-u11-2", "word":"اليسار", "zh":"左边", "pron":"al-yasār", "ex":"انعطف إلى اليسار.", "exZh":"向左转。" },
    { "id":"ar-u11-3", "word":"مستقيماً", "zh":"直；笔直", "pron":"mustaqīman", "ex":"سر مستقيماً.", "exZh":"一直往前走。" },
    { "id":"ar-u11-4", "word":"قريب", "zh":"近", "pron":"qarīb", "ex":"المحطة قريبة.", "exZh":"车站很近。" },
    { "id":"ar-u11-5", "word":"بعيد", "zh":"远", "pron":"baʿīd", "ex":"المحطة بعيدة.", "exZh":"车站很远。" },
    { "id":"ar-u11-6", "word":"زاوية", "zh":"拐角", "pron":"zāwiya", "ex":"عند الزاوية.", "exZh":"在拐角处。" },
    { "id":"ar-u11-7", "word":"مترو", "zh":"地铁", "pron":"mitrū", "ex":"آخذ المترو.", "exZh":"我坐地铁去。" },
    { "id":"ar-u11-8", "word":"خريطة", "zh":"地图", "pron":"kharīṭa", "ex":"انظر إلى الخريطة.", "exZh":"看一下地图。" }
  ]},
  { "id": "ar-u12", "langId": "ar", "level": "A2", "title": "身体与健康", "subtitle": "الجسم والصحة", "icon": "🩺", "grammar": "«我头疼» رأسي يؤلمني / عندي صداع；身体部位常加后缀。", "words": [
    { "id":"ar-u12-1", "word":"رأس", "zh":"头", "pron":"ra's", "ex":"رأسي يؤلمني.", "exZh":"我头疼。" },
    { "id":"ar-u12-2", "word":"يد", "zh":"手", "pron":"yad", "ex":"اغسل يديك.", "exZh":"洗洗手。" },
    { "id":"ar-u12-3", "word":"عين", "zh":"眼睛", "pron":"ʿayn", "ex":"عيناي متعبتان.", "exZh":"眼睛很累。" },
    { "id":"ar-u12-4", "word":"قدم", "zh":"脚", "pron":"qadam", "ex":"قدمي تؤلمني.", "exZh":"我的脚疼。" },
    { "id":"ar-u12-5", "word":"طبيب", "zh":"医生", "pron":"ṭabīb", "ex":"اذهب إلى الطبيب.", "exZh":"去看医生。" },
    { "id":"ar-u12-6", "word":"صيدلية", "zh":"药店", "pron":"ṣaydaliyya", "ex":"أين الصيدلية؟", "exZh":"药店在哪里？" },
    { "id":"ar-u12-7", "word":"مريض", "zh":"生病的", "pron":"marīḍ", "ex":"أنا مريض.", "exZh":"我生病了。" },
    { "id":"ar-u12-8", "word":"راحة", "zh":"休息", "pron":"rāḥa", "ex":"تحتاج إلى الراحة.", "exZh":"你需要休息。" }
  ]},
  { "id": "ar-u13", "langId": "ar", "level": "A2", "title": "工作与学习", "subtitle": "العمل والدراسة", "icon": "💼", "grammar": "介词 في / إلى / من：أنا في المكتب、طالب العربية。", "words": [
    { "id":"ar-u13-1", "word":"مكتب", "zh":"办公室", "pron":"maktab", "ex":"أنا في المكتب.", "exZh":"我在办公室。" },
    { "id":"ar-u13-2", "word":"اجتماع", "zh":"会议", "pron":"ijtimāʿ", "ex":"الاجتماع في الثالثة.", "exZh":"三点开会。" },
    { "id":"ar-u13-3", "word":"رسالة", "zh":"邮件", "pron":"risāla", "ex":"سأرسل رسالة.", "exZh":"我发一封邮件。" },
    { "id":"ar-u13-4", "word":"مدرسة", "zh":"学校", "pron":"madrasa", "ex":"المدرسة قريبة.", "exZh":"学校很近。" },
    { "id":"ar-u13-5", "word":"طالب", "zh":"学生", "pron":"ṭālib", "ex":"أنا طالب.", "exZh":"我是学生。" },
    { "id":"ar-u13-6", "word":"معلم", "zh":"老师", "pron":"muʿallim", "ex":"المعلم لطيف.", "exZh":"老师很好。" },
    { "id":"ar-u13-7", "word":"امتحان", "zh":"考试", "pron":"imtiḥān", "ex":"غداً امتحان.", "exZh":"明天有考试。" },
    { "id":"ar-u13-8", "word":"درس", "zh":"学习", "pron":"darasa", "ex":"أدرس اللغات.", "exZh":"我学外语。" }
  ]},
  { "id": "ar-u14", "langId": "ar", "level": "A2", "title": "核心动词", "subtitle": "الأفعال الأساسية", "icon": "⚡", "grammar": "كان 表过去；أريد / أستطيع 后接动词现在式；动词按人称变位。", "words": [
    { "id":"ar-u14-1", "word":"كان", "zh":"是（本质）", "pron":"kāna", "ex":"أنا معلم.", "exZh":"我是老师。" },
    { "id":"ar-u14-2", "word":"في", "zh":"在；位于", "pron":"fī", "ex":"أنا في البيت.", "exZh":"我在家。" },
    { "id":"ar-u14-3", "word":"لدى", "zh":"有", "pron":"ladayya", "ex":"لدي أخوان.", "exZh":"我有两个兄弟。" },
    { "id":"ar-u14-4", "word":"فعل", "zh":"做", "pron":"faʿala", "ex":"ماذا تفعل؟", "exZh":"你在做什么？" },
    { "id":"ar-u14-5", "word":"ذهب", "zh":"去", "pron":"dhahaba", "ex":"أذهب إلى السوق.", "exZh":"我去市场。" },
    { "id":"ar-u14-6", "word":"جاء", "zh":"来", "pron":"jā'a", "ex":"هل تأتي معي؟", "exZh":"你跟我一起来吗？" },
    { "id":"ar-u14-7", "word":"أراد", "zh":"想要", "pron":"arāda", "ex":"أريد قهوة.", "exZh":"我想要杯咖啡。" },
    { "id":"ar-u14-8", "word":"استطاع", "zh":"能；可以", "pron":"istaṭāʿa", "ex":"هل تستطيع مساعدتي؟", "exZh":"你能帮我吗？" }
  ]},
  { "id": "ar-u15", "langId": "ar", "level": "A2", "title": "过去与计划", "subtitle": "الماضي والخطط", "icon": "📅", "grammar": "过去时 «فعلَ» 加后缀：اشتريتُ、ذهبتُ؛أمس、أبداً 表从不。", "words": [
    { "id":"ar-u15-1", "word":"أمس", "zh":"昨天", "pron":"ams", "ex":"ذهبتُ إلى السينما أمس.", "exZh":"昨天我去看电影了。" },
    { "id":"ar-u15-2", "word":"ذهبتُ", "zh":"我去了", "pron":"dhahabtu", "ex":"ذهبتُ لزيارة صديق.", "exZh":"我去看了个朋友。" },
    { "id":"ar-u15-3", "word":"اشتريتُ", "zh":"我买了", "pron":"ishtaraytu", "ex":"اشتريتُ كتاباً.", "exZh":"我买了一本书。" },
    { "id":"ar-u15-4", "word":"رحلة", "zh":"旅行", "pron":"riḥla", "ex":"كانت الرحلة قصيرة.", "exZh":"旅行很短。" },
    { "id":"ar-u15-5", "word":"القادم", "zh":"下一个", "pron":"al-qādim", "ex":"عطلة نهاية الأسبوع القادمة.", "exZh":"下个周末。" },
    { "id":"ar-u15-6", "word":"خطط", "zh":"我计划", "pron":"khaṭṭaṭa", "ex":"أخطط للسفر في يونيو.", "exZh":"我打算六月去旅行。" },
    { "id":"ar-u15-7", "word":"الليلة الماضية", "zh":"昨晚", "pron":"al-layla al-māḍiya", "ex":"أمطرت الليلة الماضية.", "exZh":"昨晚下雨了。" },
    { "id":"ar-u15-8", "word":"أبداً", "zh":"从不", "pron":"abadan", "ex":"لا أتأخر أبداً.", "exZh":"我从不迟到。" }
  ]},
  { "id": "sh-u4", "langId": "sh", "level": "A1", "title": "数字与计数", "subtitle": "数字", "icon": "🔢", "grammar": "吴语数字：一（ieh）、两（lian）、三（se）；「二」口语多讲「两」。", "words": [
    { "id":"sh-u4-1", "word":"一", "zh":"一", "pron":"ieh", "ex":"一、两、三。", "exZh":"一、二、三。" },
    { "id":"sh-u4-2", "word":"两", "zh":"二", "pron":"lian", "ex":"吾要两杯咖啡。", "exZh":"我要两杯咖啡。" },
    { "id":"sh-u4-3", "word":"三", "zh":"三", "pron":"se", "ex":"三个人，谢谢。", "exZh":"三个人，谢谢。" },
    { "id":"sh-u4-4", "word":"十", "zh":"十", "pron":"zeh", "ex":"现在十点钟。", "exZh":"现在十点。" },
    { "id":"sh-u4-5", "word":"一百", "zh":"一百", "pron":"ieh pah", "ex":"要一百欧元。", "exZh":"要一百欧元。" },
    { "id":"sh-u4-6", "word":"第一", "zh":"第一", "pron":"di ieh", "ex":"搿是吾第一日。", "exZh":"这是我第一天。" },
    { "id":"sh-u4-7", "word":"交关", "zh":"很多", "pron":"ciau kue", "ex":"格搭人交关多。", "exZh":"这里有很多人。" },
    { "id":"sh-u4-8", "word":"一眼", "zh":"一点；少", "pron":"ieh nge", "ex":"拨吾一眼糖。", "exZh":"请给我一点糖。" }
  ]},
  { "id": "sh-u5", "langId": "sh", "level": "A1", "title": "自我介绍", "subtitle": "自我介绍", "icon": "🙋", "grammar": "「我是」讲「吾是」，「侬」是你、「伊」是伊；勿要拿普通话「你」混进来。", "words": [
    { "id":"sh-u5-1", "word":"吾叫", "zh":"我叫", "pron":"ngu ciau", "ex":"吾叫安娜。", "exZh":"我叫安娜。" },
    { "id":"sh-u5-2", "word":"吾是", "zh":"我是", "pron":"ngu zy", "ex":"吾是中国人。", "exZh":"我是中国人。" },
    { "id":"sh-u5-3", "word":"名字", "zh":"名字", "pron":"min zy", "ex":"侬叫啥名字？", "exZh":"你叫什么名字？" },
    { "id":"sh-u5-4", "word":"从", "zh":"从；来自", "pron":"zon", "ex":"吾从上海来。", "exZh":"我来自上海。" },
    { "id":"sh-u5-5", "word":"吾住", "zh":"我住", "pron":"ngu zy", "ex":"吾住勒市中心。", "exZh":"我住在市中心。" },
    { "id":"sh-u5-6", "word":"岁", "zh":"岁；年", "pron":"soe", "ex":"吾廿岁。", "exZh":"我二十岁。" },
    { "id":"sh-u5-7", "word":"高兴", "zh":"高兴；愉快", "pron":"kau shin", "ex":"认得侬老高兴。", "exZh":"很高兴认识你。" },
    { "id":"sh-u5-8", "word":"也", "zh":"也", "pron":"a", "ex":"吾也个能。", "exZh":"我也是。" }
  ]},
  { "id": "sh-u6", "langId": "sh", "level": "A1", "title": "家庭与人物", "subtitle": "屋里人", "icon": "👨‍👩‍👧", "grammar": "屋里人称：姆妈（母亲）、阿爸（父亲）、小囡（小孩）。", "words": [
    { "id":"sh-u6-1", "word":"屋里人", "zh":"家庭", "pron":"oh li nin", "ex":"吾屋里人交关多。", "exZh":"我家人口多。" },
    { "id":"sh-u6-2", "word":"姆妈", "zh":"母亲", "pron":"m ma", "ex":"姆妈烧菜老好。", "exZh":"我妈妈做饭很好吃。" },
    { "id":"sh-u6-3", "word":"阿爸", "zh":"父亲", "pron":"a pa", "ex":"阿爸勒格搭做生活。", "exZh":"我爸爸在这儿工作。" },
    { "id":"sh-u6-4", "word":"儿子", "zh":"儿子", "pron":"ni tsy", "ex":"吾有个儿子。", "exZh":"我有一个儿子。" },
    { "id":"sh-u6-5", "word":"阿姐", "zh":"姐妹", "pron":"a cia", "ex":"阿姐勒读书。", "exZh":"我姐姐在读书。" },
    { "id":"sh-u6-6", "word":"男人", "zh":"丈夫", "pron":"noe nin", "ex":"伊男人是医生。", "exZh":"她丈夫是医生。" },
    { "id":"sh-u6-7", "word":"小囡", "zh":"小孩", "pron":"siau noe", "ex":"小囡勒白相。", "exZh":"小孩在玩。" },
    { "id":"sh-u6-8", "word":"人", "zh":"人", "pron":"nin", "ex":"伊是好人。", "exZh":"他是个和善的人。" }
  ]},
  { "id": "sh-u7", "langId": "sh", "level": "A1", "title": "饮食", "subtitle": "吃个物事", "icon": "🍽️", "grammar": "「吃」讲「吃（chieh）」，「饭」讲「饭（ve）」；早点心＝早饭。", "words": [
    { "id":"sh-u7-1", "word":"早点心", "zh":"早餐", "pron":"tsau ti shin", "ex":"吾七点钟吃早点心。", "exZh":"我七点吃早饭。" },
    { "id":"sh-u7-2", "word":"面包", "zh":"面包", "pron":"mi pau", "ex":"吾要面包。", "exZh":"我要面包。" },
    { "id":"sh-u7-3", "word":"咖啡", "zh":"咖啡", "pron":"ka fi", "ex":"一杯咖啡。", "exZh":"一杯咖啡。" },
    { "id":"sh-u7-4", "word":"饭", "zh":"米饭", "pron":"ve", "ex":"饭烧好哉。", "exZh":"米饭好了。" },
    { "id":"sh-u7-5", "word":"肉", "zh":"肉", "pron":"nioh", "ex":"吾勿吃肉。", "exZh":"我不吃肉。" },
    { "id":"sh-u7-6", "word":"鱼", "zh":"鱼", "pron":"ng", "ex":"搿条鱼老新鲜。", "exZh":"这鱼很新鲜。" },
    { "id":"sh-u7-7", "word":"蔬菜", "zh":"蔬菜", "pron":"su tshe", "ex":"多拨点蔬菜。", "exZh":"多吃点蔬菜。" },
    { "id":"sh-u7-8", "word":"饮料", "zh":"饮料", "pron":"in liau", "ex":"侬要吃啥饮料？", "exZh":"你想喝什么？" }
  ]},
  { "id": "sh-u8", "langId": "sh", "level": "A1", "title": "时间与日期", "subtitle": "辰光", "icon": "🕐", "grammar": "「辰光」＝时间，「今朝」「明朝」「昨日」；一点钟讲「一点钟」。", "words": [
    { "id":"sh-u8-1", "word":"钟头", "zh":"小时；点钟", "pron":"tson deu", "ex":"现在几点钟？", "exZh":"现在几点？" },
    { "id":"sh-u8-2", "word":"日脚", "zh":"天；日", "pron":"nieh ciah", "ex":"今朝是好日脚。", "exZh":"今天是个好日子。" },
    { "id":"sh-u8-3", "word":"礼拜", "zh":"星期", "pron":"li pa", "ex":"下礼拜再会。", "exZh":"下周见。" },
    { "id":"sh-u8-4", "word":"号头", "zh":"月", "pron":"hau deu", "ex":"下个号头。", "exZh":"下个月。" },
    { "id":"sh-u8-5", "word":"年", "zh":"年", "pron":"ni", "ex":"新年快乐！", "exZh":"新年快乐。" },
    { "id":"sh-u8-6", "word":"礼拜一", "zh":"星期一", "pron":"li pa ieh", "ex":"吾礼拜一开始。", "exZh":"我周一开始。" },
    { "id":"sh-u8-7", "word":"现在", "zh":"现在", "pron":"ie ze", "ex":"吾现在出去。", "exZh":"我现在出门。" },
    { "id":"sh-u8-8", "word":"下半日", "zh":"下午", "pron":"wu poe nieh", "ex":"下半日再会。", "exZh":"下午见。" }
  ]},
  { "id": "sh-u9", "langId": "sh", "level": "A1", "title": "颜色与形容", "subtitle": "颜色", "icon": "🎨", "grammar": "形容词常叠用或加「交关」：交关好＝很好；颜色词多跟普通话同源。", "words": [
    { "id":"sh-u9-1", "word":"红", "zh":"红色", "pron":"hon", "ex":"车子是红个。", "exZh":"车是红色的。" },
    { "id":"sh-u9-2", "word":"蓝", "zh":"蓝色", "pron":"le", "ex":"天是蓝个。", "exZh":"天空是蓝的。" },
    { "id":"sh-u9-3", "word":"白", "zh":"白色", "pron":"bah", "ex":"一件白衬衫。", "exZh":"一件白衬衫。" },
    { "id":"sh-u9-4", "word":"黑", "zh":"黑色", "pron":"heh", "ex":"吾欢喜黑个。", "exZh":"我更喜欢黑的。" },
    { "id":"sh-u9-5", "word":"大", "zh":"大", "pron":"du", "ex":"一幢大房子。", "exZh":"一栋大房子。" },
    { "id":"sh-u9-6", "word":"小", "zh":"小", "pron":"siau", "ex":"一间小房间。", "exZh":"一间小公寓。" },
    { "id":"sh-u9-7", "word":"新", "zh":"新", "pron":"shin", "ex":"吾有只新手机。", "exZh":"我有一部新手机。" },
    { "id":"sh-u9-8", "word":"好看", "zh":"漂亮", "pron":"hau khoen", "ex":"搿个老好看！", "exZh":"真好看！" }
  ]},
  { "id": "sh-u10", "langId": "sh", "level": "A2", "title": "天气与季节", "subtitle": "天气", "icon": "🌤️", "grammar": "「天热 / 天冷」勿用「是」；落雨＝下雨，落雪＝下雪。", "words": [
    { "id":"sh-u10-1", "word":"太阳", "zh":"太阳", "pron":"tha yan", "ex":"今朝出太阳。", "exZh":"今天出太阳。" },
    { "id":"sh-u10-2", "word":"雨", "zh":"雨", "pron":"yu", "ex":"落雨哉。", "exZh":"下雨了。" },
    { "id":"sh-u10-3", "word":"冷", "zh":"冷", "pron":"lan", "ex":"今朝老冷。", "exZh":"今天很冷。" },
    { "id":"sh-u10-4", "word":"热", "zh":"热", "pron":"nieh", "ex":"今朝老热。", "exZh":"今天很热。" },
    { "id":"sh-u10-5", "word":"风", "zh":"风", "pron":"fon", "ex":"有风。", "exZh":"有风。" },
    { "id":"sh-u10-6", "word":"云", "zh":"云", "pron":"yun", "ex":"天浪向交关云。", "exZh":"天上有很多云。" },
    { "id":"sh-u10-7", "word":"热天", "zh":"夏天", "pron":"nieh thi", "ex":"热天老热。", "exZh":"夏天很热。" },
    { "id":"sh-u10-8", "word":"冷天", "zh":"冬天", "pron":"lan thi", "ex":"冷天落雪。", "exZh":"冬天下雪。" }
  ]},
  { "id": "sh-u11", "langId": "sh", "level": "A2", "title": "方位与问路", "subtitle": "问路", "icon": "🧭", "grammar": "「格搭」＝这里、「依搭」＝那里；「朝右面转弯」＝向右转。", "words": [
    { "id":"sh-u11-1", "word":"右面", "zh":"右边", "pron":"yeu mi", "ex":"朝右面转弯。", "exZh":"向右转。" },
    { "id":"sh-u11-2", "word":"左面", "zh":"左边", "pron":"tsu mi", "ex":"朝左面转弯。", "exZh":"向左转。" },
    { "id":"sh-u11-3", "word":"一直", "zh":"直；笔直", "pron":"ieh zeh", "ex":"一直朝前走。", "exZh":"一直往前走。" },
    { "id":"sh-u11-4", "word":"近", "zh":"近", "pron":"jin", "ex":"车站老近。", "exZh":"车站很近。" },
    { "id":"sh-u11-5", "word":"远", "zh":"远", "pron":"yoe", "ex":"车站老远。", "exZh":"车站很远。" },
    { "id":"sh-u11-6", "word":"转角", "zh":"拐角", "pron":"tsoe koh", "ex":"勒转角浪。", "exZh":"在拐角处。" },
    { "id":"sh-u11-7", "word":"地铁", "zh":"地铁", "pron":"di thieh", "ex":"吾乘地铁去。", "exZh":"我坐地铁去。" },
    { "id":"sh-u11-8", "word":"地图", "zh":"地图", "pron":"di du", "ex":"看看地图。", "exZh":"看一下地图。" }
  ]},
  { "id": "sh-u12", "langId": "sh", "level": "A2", "title": "身体与健康", "subtitle": "身体", "icon": "🩺", "grammar": "「勿适意」＝不舒服／生病；「歇一歇」＝休息。", "words": [
    { "id":"sh-u12-1", "word":"头", "zh":"头", "pron":"deu", "ex":"吾头痛。", "exZh":"我头疼。" },
    { "id":"sh-u12-2", "word":"手", "zh":"手", "pron":"seu", "ex":"汏汏手。", "exZh":"洗洗手。" },
    { "id":"sh-u12-3", "word":"眼睛", "zh":"眼睛", "pron":"nge tsin", "ex":"眼睛老吃力。", "exZh":"眼睛很累。" },
    { "id":"sh-u12-4", "word":"脚", "zh":"脚", "pron":"ciah", "ex":"吾脚痛。", "exZh":"我的脚疼。" },
    { "id":"sh-u12-5", "word":"医生", "zh":"医生", "pron":"i san", "ex":"去看医生。", "exZh":"去看医生。" },
    { "id":"sh-u12-6", "word":"药房", "zh":"药店", "pron":"yah van", "ex":"药房勒啥地方？", "exZh":"药店在哪里？" },
    { "id":"sh-u12-7", "word":"勿适意", "zh":"生病的", "pron":"veh seh i", "ex":"吾勿适意。", "exZh":"我生病了。" },
    { "id":"sh-u12-8", "word":"歇一歇", "zh":"休息", "pron":"shieh ieh shieh", "ex":"侬要歇一歇。", "exZh":"你需要休息。" }
  ]},
  { "id": "sh-u13", "langId": "sh", "level": "A2", "title": "工作与学习", "subtitle": "做生活", "icon": "💼", "grammar": "「做生活」＝工作，「读书」＝上学；问句常加「伐」。", "words": [
    { "id":"sh-u13-1", "word":"写字间", "zh":"办公室", "pron":"sia zy ke", "ex":"吾勒写字间。", "exZh":"我在办公室。" },
    { "id":"sh-u13-2", "word":"开会", "zh":"会议", "pron":"khe we", "ex":"三点钟开会。", "exZh":"三点开会。" },
    { "id":"sh-u13-3", "word":"邮件", "zh":"邮件", "pron":"yeu ji", "ex":"吾发只邮件。", "exZh":"我发一封邮件。" },
    { "id":"sh-u13-4", "word":"学堂", "zh":"学校", "pron":"hoh dan", "ex":"学堂老近。", "exZh":"学校很近。" },
    { "id":"sh-u13-5", "word":"学生", "zh":"学生", "pron":"hoh san", "ex":"吾是学生。", "exZh":"我是学生。" },
    { "id":"sh-u13-6", "word":"先生", "zh":"老师", "pron":"si san", "ex":"先生老好。", "exZh":"老师很好。" },
    { "id":"sh-u13-7", "word":"考试", "zh":"考试", "pron":"khau sy", "ex":"明朝要考试。", "exZh":"明天有考试。" },
    { "id":"sh-u13-8", "word":"读书", "zh":"学习", "pron":"toh sy", "ex":"吾读外语。", "exZh":"我学外语。" }
  ]},
  { "id": "sh-u14", "langId": "sh", "level": "A2", "title": "核心动词", "subtitle": "常用动词", "icon": "⚡", "grammar": "「是」勿随人称变；「要」「会得」直接加动词，无变位。", "words": [
    { "id":"sh-u14-1", "word":"是", "zh":"是（本质）", "pron":"zy", "ex":"吾是先生。", "exZh":"我是老师。" },
    { "id":"sh-u14-2", "word":"勒", "zh":"在；位于", "pron":"leh", "ex":"吾勒屋里。", "exZh":"我在家。" },
    { "id":"sh-u14-3", "word":"有", "zh":"有", "pron":"yeu", "ex":"吾有两个阿哥。", "exZh":"我有两个兄弟。" },
    { "id":"sh-u14-4", "word":"做", "zh":"做", "pron":"tsu", "ex":"侬勒做啥？", "exZh":"你在做什么？" },
    { "id":"sh-u14-5", "word":"去", "zh":"去", "pron":"chi", "ex":"吾去小菜场。", "exZh":"我去市场。" },
    { "id":"sh-u14-6", "word":"来", "zh":"来", "pron":"le", "ex":"侬搭吾一道来伐？", "exZh":"你跟我一起来吗？" },
    { "id":"sh-u14-7", "word":"要", "zh":"想要", "pron":"iau", "ex":"吾要杯咖啡。", "exZh":"我想要杯咖啡。" },
    { "id":"sh-u14-8", "word":"会得", "zh":"能；可以", "pron":"we teh", "ex":"侬会得帮吾伐？", "exZh":"你能帮我吗？" }
  ]},
  { "id": "sh-u15", "langId": "sh", "level": "A2", "title": "过去与计划", "subtitle": "昨日搭明朝", "icon": "📅", "grammar": "过去用「……个哉 / 昨日」；「从来勿」＝从不，无动词时态变化。", "words": [
    { "id":"sh-u15-1", "word":"昨日", "zh":"昨天", "pron":"zoh nieh", "ex":"昨日吾去看电影。", "exZh":"昨天我去看电影了。" },
    { "id":"sh-u15-2", "word":"去过", "zh":"我去了", "pron":"chi ku", "ex":"吾去过望朋友。", "exZh":"我去看了个朋友。" },
    { "id":"sh-u15-3", "word":"买勒", "zh":"我买了", "pron":"ma leh", "ex":"吾买勒本书。", "exZh":"我买了一本书。" },
    { "id":"sh-u15-4", "word":"旅行", "zh":"旅行", "pron":"lyu yin", "ex":"搿趟旅行老短。", "exZh":"旅行很短。" },
    { "id":"sh-u15-5", "word":"下个", "zh":"下一个", "pron":"wu keh", "ex":"下个礼拜六。", "exZh":"下个周末。" },
    { "id":"sh-u15-6", "word":"打算", "zh":"我计划", "pron":"tan soe", "ex":"吾打算六月去旅行。", "exZh":"我打算六月去旅行。" },
    { "id":"sh-u15-7", "word":"昨夜", "zh":"昨晚", "pron":"zoh ya", "ex":"昨夜落雨。", "exZh":"昨晚下雨了。" },
    { "id":"sh-u15-8", "word":"从来勿", "zh":"从不", "pron":"zon le veh", "ex":"吾从来勿迟到。", "exZh":"我从不迟到。" }
  ]},
  { "id": "mn-u4", "langId": "mn", "level": "A1", "title": "数字与计数", "subtitle": "数字", "icon": "🔢", "grammar": "数字文白异读：一（tsi̍t / i̍t）、二（jī / nn̄g）；日常多用白话音。", "words": [
    { "id":"mn-u4-1", "word":"一", "zh":"一", "pron": "it", "ex":"一、两、三。", "exZh":"一、二、三。" },
    { "id":"mn-u4-2", "word":"两", "zh":"二", "pron": "lióng", "ex":"我欲两杯咖啡。", "exZh":"我要两杯咖啡。" },
    { "id":"mn-u4-3", "word":"三", "zh":"三", "pron": "sam", "ex":"三个人，多谢。", "exZh":"三个人，谢谢。" },
    { "id":"mn-u4-4", "word":"十", "zh":"十", "pron": "tsa̍p", "ex":"这马十点。", "exZh":"现在十点。" },
    { "id":"mn-u4-5", "word":"一百", "zh":"一百", "pron":"tsi̍t-pah", "ex":"欲一百箍。", "exZh":"要一百欧元。" },
    { "id":"mn-u4-6", "word":"第一", "zh":"第一", "pron": "tē-it", "ex":"这是我第一工。", "exZh":"这是我第一天。" },
    { "id":"mn-u4-7", "word":"真济", "zh":"很多", "pron":"tsin-tsē", "ex":"遮有真济人。", "exZh":"这里有很多人。" },
    { "id":"mn-u4-8", "word":"一点仔", "zh":"一点；少", "pron": "tsi̍t-tiám-á", "ex":"予我一点仔糖。", "exZh":"请给我一点糖。" }
  ]},
  { "id": "mn-u5", "langId": "mn", "level": "A1", "title": "自我介绍", "subtitle": "自我介绍", "icon": "🙋", "grammar": "「我」讲「我（guá）」、「汝（lí）」是你、「伊（i）」是他；「汝好」＝你好。", "words": [
    { "id":"mn-u5-1", "word":"我叫", "zh":"我叫", "pron":"guá-kiò", "ex":"我叫安娜。", "exZh":"我叫安娜。" },
    { "id":"mn-u5-2", "word":"我是", "zh":"我是", "pron":"guá-sī", "ex":"我是中国人。", "exZh":"我是中国人。" },
    { "id":"mn-u5-3", "word":"名", "zh":"名字", "pron": "bîng", "ex":"汝叫啥物名？", "exZh":"你叫什么名字？" },
    { "id":"mn-u5-4", "word":"对", "zh":"从；来自", "pron": "tuì", "ex":"我对上海来。", "exZh":"我来自上海。" },
    { "id":"mn-u5-5", "word":"我蹛", "zh":"我住", "pron":"guá-tuà", "ex":"我蹛伫市中心。", "exZh":"我住在市中心。" },
    { "id":"mn-u5-6", "word":"岁", "zh":"岁；年", "pron": "huè", "ex":"我二十岁。", "exZh":"我二十岁。" },
    { "id":"mn-u5-7", "word":"真高兴", "zh":"高兴；愉快", "pron":"tsin-ko-hìng", "ex":"熟似汝真高兴。", "exZh":"很高兴认识你。" },
    { "id":"mn-u5-8", "word":"嘛", "zh":"也", "pron":"mā", "ex":"我嘛是按呢。", "exZh":"我也是。" }
  ]},
  { "id": "mn-u6", "langId": "mn", "level": "A1", "title": "家庭与人物", "subtitle": "家庭", "icon": "👨‍👩‍👧", "grammar": "「阿母」「阿爸」「囝仔」；「厝」＝家／房子，勿写成「家」。", "words": [
    { "id":"mn-u6-1", "word":"家庭", "zh":"家庭", "pron": "ka-tîng", "ex":"阮家庭真大。", "exZh":"我家人口多。" },
    { "id":"mn-u6-2", "word":"阿母", "zh":"母亲", "pron": "a-bú", "ex":"阿母煮菜真好食。", "exZh":"我妈妈做饭很好吃。" },
    { "id":"mn-u6-3", "word":"阿爸", "zh":"父亲", "pron": "a-pah", "ex":"阿爸伫遮做工。", "exZh":"我爸爸在这儿工作。" },
    { "id":"mn-u6-4", "word":"囝", "zh":"儿子", "pron": "kiánn", "ex":"我有一个囝。", "exZh":"我有一个儿子。" },
    { "id":"mn-u6-5", "word":"阿姊", "zh":"姐妹", "pron": "a-tsí", "ex":"阿姊咧读册。", "exZh":"我姐姐在读书。" },
    { "id":"mn-u6-6", "word":"翁", "zh":"丈夫", "pron": "ang", "ex":"伊的翁是医生。", "exZh":"她丈夫是医生。" },
    { "id":"mn-u6-7", "word":"囝仔", "zh":"小孩", "pron":"gín-á", "ex":"囝仔咧耍。", "exZh":"小孩在玩。" },
    { "id":"mn-u6-8", "word":"人", "zh":"人", "pron": "jîn", "ex":"伊是好人。", "exZh":"他是个和善的人。" }
  ]},
  { "id": "mn-u7", "langId": "mn", "level": "A1", "title": "饮食", "subtitle": "饮食", "icon": "🍽️", "grammar": "「食（tsia̍h）」＝吃、「饮（lim）」＝喝；「食饱未」是常见问候。", "words": [
    { "id":"mn-u7-1", "word":"早起顿", "zh":"早餐", "pron": "tsá-khí-tǹg", "ex":"我七点食早起顿。", "exZh":"我七点吃早饭。" },
    { "id":"mn-u7-2", "word":"面包", "zh":"面包", "pron": "mī-pau", "ex":"我欲面包。", "exZh":"我要面包。" },
    { "id":"mn-u7-3", "word":"咖啡", "zh":"咖啡", "pron": "ka-pi", "ex":"一杯咖啡。", "exZh":"一杯咖啡。" },
    { "id":"mn-u7-4", "word":"饭", "zh":"米饭", "pron": "pn̄g", "ex":"饭煮好矣。", "exZh":"米饭好了。" },
    { "id":"mn-u7-5", "word":"肉", "zh":"肉", "pron": "jio̍k", "ex":"我无食肉。", "exZh":"我不吃肉。" },
    { "id":"mn-u7-6", "word":"鱼", "zh":"鱼", "pron": "hî", "ex":"这尾鱼真鲜。", "exZh":"这鱼很新鲜。" },
    { "id":"mn-u7-7", "word":"菜", "zh":"蔬菜", "pron": "tshài", "ex":"加食寡菜。", "exZh":"多吃点蔬菜。" },
    { "id":"mn-u7-8", "word":"饮料", "zh":"饮料", "pron": "ím-liāu", "ex":"汝欲啉啥物？", "exZh":"你想喝什么？" }
  ]},
  { "id": "mn-u8", "langId": "mn", "level": "A1", "title": "时间与日期", "subtitle": "时间", "icon": "🕐", "grammar": "「今仔日」「明日」「昨日」；「几点」讲「几点（kuí-tiám）」。", "words": [
    { "id":"mn-u8-1", "word":"点", "zh":"小时；点钟", "pron": "tiám", "ex":"这马几点？", "exZh":"现在几点？" },
    { "id":"mn-u8-2", "word":"日", "zh":"天；日", "pron": "ji̍t", "ex":"今仔日是好日。", "exZh":"今天是个好日子。" },
    { "id":"mn-u8-3", "word":"礼拜", "zh":"星期", "pron": "lé-pài", "ex":"后礼拜才见。", "exZh":"下周见。" },
    { "id":"mn-u8-4", "word":"月", "zh":"月", "pron": "gua̍t", "ex":"后个月。", "exZh":"下个月。" },
    { "id":"mn-u8-5", "word":"年", "zh":"年", "pron": "liân", "ex":"新年快乐！", "exZh":"新年快乐。" },
    { "id":"mn-u8-6", "word":"拜一", "zh":"星期一", "pron": "pài-it", "ex":"我拜一开始。", "exZh":"我周一开始。" },
    { "id":"mn-u8-7", "word":"这马", "zh":"现在", "pron": "tsit-má", "ex":"我这马欲出去。", "exZh":"我现在出门。" },
    { "id":"mn-u8-8", "word":"下昼", "zh":"下午", "pron": "ē-tàu", "ex":"下昼才见。", "exZh":"下午见。" }
  ]},
  { "id": "mn-u9", "langId": "mn", "level": "A1", "title": "颜色与形容", "subtitle": "色彩", "icon": "🎨", "grammar": "形容词常加「真 / 诚」：真水＝很漂亮；「水（suí）」是漂亮不是水。", "words": [
    { "id":"mn-u9-1", "word":"红", "zh":"红色", "pron": "âng", "ex":"车是红色的。", "exZh":"车是红色的。" },
    { "id":"mn-u9-2", "word":"蓝", "zh":"蓝色", "pron": "nâ", "ex":"天是蓝色的。", "exZh":"天空是蓝的。" },
    { "id":"mn-u9-3", "word":"白", "zh":"白色", "pron": "pe̍h", "ex":"一领白衫。", "exZh":"一件白衬衫。" },
    { "id":"mn-u9-4", "word":"乌", "zh":"黑色", "pron": "oo", "ex":"我较佮意乌的。", "exZh":"我更喜欢黑的。" },
    { "id":"mn-u9-5", "word":"大", "zh":"大", "pron": "tāi", "ex":"一间大厝。", "exZh":"一栋大房子。" },
    { "id":"mn-u9-6", "word":"细", "zh":"小", "pron": "sè", "ex":"一间细房间。", "exZh":"一间小公寓。" },
    { "id":"mn-u9-7", "word":"新", "zh":"新", "pron": "sin", "ex":"我有一支新手机。", "exZh":"我有一部新手机。" },
    { "id":"mn-u9-8", "word":"水", "zh":"漂亮", "pron": "tsuí", "ex":"真水！", "exZh":"真好看！" }
  ]},
  { "id": "mn-u10", "langId": "mn", "level": "A2", "title": "天气与季节", "subtitle": "天气", "icon": "🌤️", "grammar": "「落雨」「出日头」；「寒 / 热」讲「冷 / 热」，勿照普通话套。", "words": [
    { "id":"mn-u10-1", "word":"日头", "zh":"太阳", "pron": "ji̍t-thâu", "ex":"今仔日出日头。", "exZh":"今天出太阳。" },
    { "id":"mn-u10-2", "word":"雨", "zh":"雨", "pron": "hōo", "ex":"落雨矣。", "exZh":"下雨了。" },
    { "id":"mn-u10-3", "word":"寒", "zh":"冷", "pron": "kuânn", "ex":"今仔日真寒。", "exZh":"今天很冷。" },
    { "id":"mn-u10-4", "word":"热", "zh":"热", "pron": "jia̍t", "ex":"今仔日真热。", "exZh":"今天很热。" },
    { "id":"mn-u10-5", "word":"风", "zh":"风", "pron": "hong", "ex":"有风。", "exZh":"有风。" },
    { "id":"mn-u10-6", "word":"云", "zh":"云", "pron": "hûn", "ex":"天顶真济云。", "exZh":"天上有很多云。" },
    { "id":"mn-u10-7", "word":"热天", "zh":"夏天", "pron": "jua̍h-thinn", "ex":"热天真热。", "exZh":"夏天很热。" },
    { "id":"mn-u10-8", "word":"寒天", "zh":"冬天", "pron": "kuânn-thinn", "ex":"寒天落雪。", "exZh":"冬天下雪。" }
  ]},
  { "id": "mn-u11", "langId": "mn", "level": "A2", "title": "方位与问路", "subtitle": "问路", "icon": "🧭", "grammar": "「倒手 / 正手」＝左／右；「遐（hia）」＝那里、「遮（tsia）」＝这里。", "words": [
    { "id":"mn-u11-1", "word":"正手", "zh":"右边", "pron": "tsiànn-tshiú", "ex":"斡对正手边。", "exZh":"向右转。" },
    { "id":"mn-u11-2", "word":"倒手", "zh":"左边", "pron": "tò-tshiú", "ex":"斡对倒手边。", "exZh":"向左转。" },
    { "id":"mn-u11-3", "word":"直直", "zh":"直；笔直", "pron": "ti̍t-ti̍t", "ex":"直直行落去。", "exZh":"一直往前走。" },
    { "id":"mn-u11-4", "word":"近", "zh":"近", "pron": "kīn", "ex":"车站真近。", "exZh":"车站很近。" },
    { "id":"mn-u11-5", "word":"远", "zh":"远", "pron": "hn̄g", "ex":"车站真远。", "exZh":"车站很远。" },
    { "id":"mn-u11-6", "word":"角头", "zh":"拐角", "pron": "kak-thâu", "ex":"伫角头遐。", "exZh":"在拐角处。" },
    { "id":"mn-u11-7", "word":"捷运", "zh":"地铁", "pron": "tsia̍t-ūn", "ex":"我坐捷运去。", "exZh":"我坐地铁去。" },
    { "id":"mn-u11-8", "word":"地图", "zh":"地图", "pron": "tē-tôo", "ex":"看寡地图。", "exZh":"看一下地图。" }
  ]},
  { "id": "mn-u12", "langId": "mn", "level": "A2", "title": "身体与健康", "subtitle": "身体", "icon": "🩺", "grammar": "「破病」＝生病、「歇困」＝休息；「头壳疼」＝头疼。", "words": [
    { "id":"mn-u12-1", "word":"头壳", "zh":"头", "pron": "thâu-khak", "ex":"我头壳疼。", "exZh":"我头疼。" },
    { "id":"mn-u12-2", "word":"手", "zh":"手", "pron": "tshiú", "ex":"洗手。", "exZh":"洗洗手。" },
    { "id":"mn-u12-3", "word":"目睭", "zh":"眼睛", "pron": "ba̍k-tsiu", "ex":"目睭真忝。", "exZh":"眼睛很累。" },
    { "id":"mn-u12-4", "word":"跤", "zh":"脚", "pron": "kha", "ex":"我跤疼。", "exZh":"我的脚疼。" },
    { "id":"mn-u12-5", "word":"医生", "zh":"医生", "pron": "i-sing", "ex":"去看医生。", "exZh":"去看医生。" },
    { "id":"mn-u12-6", "word":"药局", "zh":"药店", "pron": "io̍h-kio̍k", "ex":"药局伫佗位？", "exZh":"药店在哪里？" },
    { "id":"mn-u12-7", "word":"破病", "zh":"生病的", "pron": "phuà-pēnn", "ex":"我破病矣。", "exZh":"我生病了。" },
    { "id":"mn-u12-8", "word":"歇困", "zh":"休息", "pron": "hioh-khùn", "ex":"汝爱歇困。", "exZh":"你需要休息。" }
  ]},
  { "id": "mn-u13", "langId": "mn", "level": "A2", "title": "工作与学习", "subtitle": "工作甲读书", "icon": "💼", "grammar": "「头路」＝工作、「读册」＝读书；问句用「……无 / 未」。", "words": [
    { "id":"mn-u13-1", "word":"办公室", "zh":"办公室", "pron": "pān-kong-sik", "ex":"我伫办公室。", "exZh":"我在办公室。" },
    { "id":"mn-u13-2", "word":"开会", "zh":"会议", "pron": "khui-huē", "ex":"三点开会。", "exZh":"三点开会。" },
    { "id":"mn-u13-3", "word":"批", "zh":"邮件", "pron": "phue", "ex":"我寄一张批。", "exZh":"我发一封邮件。" },
    { "id":"mn-u13-4", "word":"学校", "zh":"学校", "pron": "ha̍k-hāu", "ex":"学校真近。", "exZh":"学校很近。" },
    { "id":"mn-u13-5", "word":"学生", "zh":"学生", "pron": "ha̍k-sing", "ex":"我是学生。", "exZh":"我是学生。" },
    { "id":"mn-u13-6", "word":"先生", "zh":"老师", "pron": "sian-sinn", "ex":"先生真好。", "exZh":"老师很好。" },
    { "id":"mn-u13-7", "word":"考试", "zh":"考试", "pron": "khó-tshì", "ex":"明仔日有考试。", "exZh":"明天有考试。" },
    { "id":"mn-u13-8", "word":"读册", "zh":"学习", "pron": "tha̍k-tsheh", "ex":"我读外语。", "exZh":"我学外语。" }
  ]},
  { "id": "mn-u14", "langId": "mn", "level": "A2", "title": "核心动词", "subtitle": "基本动词", "icon": "⚡", "grammar": "「是 / 毋是」，「有 / 无」；动词无变位，时态靠「有 / 已经 / 欲」。", "words": [
    { "id":"mn-u14-1", "word":"是", "zh":"是（本质）", "pron": "sī", "ex":"我是先生。", "exZh":"我是老师。" },
    { "id":"mn-u14-2", "word":"伫", "zh":"在；位于", "pron": "tī", "ex":"我伫厝里。", "exZh":"我在家。" },
    { "id":"mn-u14-3", "word":"有", "zh":"有", "pron": "iú", "ex":"我有两个阿兄。", "exZh":"我有两个兄弟。" },
    { "id":"mn-u14-4", "word":"做", "zh":"做", "pron": "tsò", "ex":"汝咧做啥物？", "exZh":"你在做什么？" },
    { "id":"mn-u14-5", "word":"去", "zh":"去", "pron": "khì", "ex":"我去菜市仔。", "exZh":"我去市场。" },
    { "id":"mn-u14-6", "word":"来", "zh":"来", "pron": "lâi", "ex":"汝欲缀我来无？", "exZh":"你跟我一起来吗？" },
    { "id":"mn-u14-7", "word":"欲", "zh":"想要", "pron":"beh", "ex":"我欲一杯咖啡。", "exZh":"我想要杯咖啡。" },
    { "id":"mn-u14-8", "word":"会得", "zh":"能；可以", "pron": "ē-tit", "ex":"汝会得帮我无？", "exZh":"你能帮我吗？" }
  ]},
  { "id": "mn-u15", "langId": "mn", "level": "A2", "title": "过去与计划", "subtitle": "过去甲计划", "icon": "📅", "grammar": "「昨日」「暗暝」表过去；「欲（beh）」表将要；「拢总无」＝从不。", "words": [
    { "id":"mn-u15-1", "word":"昨日", "zh":"昨天", "pron": "tso̍h--ji̍t", "ex":"昨日我去看电影。", "exZh":"昨天我去看电影了。" },
    { "id":"mn-u15-2", "word":"有去", "zh":"我去了", "pron":"ū-khì", "ex":"我有去看朋友。", "exZh":"我去看了个朋友。" },
    { "id":"mn-u15-3", "word":"有买", "zh":"我买了", "pron":"ū-bé", "ex":"我有买一本册。", "exZh":"我买了一本书。" },
    { "id":"mn-u15-4", "word":"旅行", "zh":"旅行", "pron": "lí-hîng", "ex":"这摆旅行真短。", "exZh":"旅行很短。" },
    { "id":"mn-u15-5", "word":"后个", "zh":"下一个", "pron":"āu-ê", "ex":"后个礼拜六。", "exZh":"下个周末。" },
    { "id":"mn-u15-6", "word":"拍算", "zh":"我计划", "pron": "phah-sǹg", "ex":"我拍算六月去旅行。", "exZh":"我打算六月去旅行。" },
    { "id":"mn-u15-7", "word":"暗暝", "zh":"昨晚", "pron": "àm-mê", "ex":"昨暗落雨。", "exZh":"昨晚下雨了。" },
    { "id":"mn-u15-8", "word":"拢总无", "zh":"从不", "pron":"lóng-tsóng-bô", "ex":"我拢总无迟到。", "exZh":"我从不迟到。" }
  ]}
];

function flattenWords(units) {
  return units.flatMap((unit) =>
    unit.words.map((w) => ({ ...w, unitId: unit.id, unitTitle: unit.title, langId: unit.langId }))
  );
}


/* ---- 西语语法小测（对标 Guidebook：每单元列语法点并配可练小题） ----
   题目与讲解为原创编写，不涉及 Duolingo 课程内容。 */
const GRAMMAR_QUIZ = [
  { "unitId": "es-u1", "prompt": "跟人打招呼，哪一句写法正确？", "options": ["¡Hola! ¿Cómo estás?", "Hola! Cómo estás?", "¡Hola ¿Cómo estás!", "¡Hola! ¿Cómo estas?"], "answer": "¡Hola! ¿Cómo estás?", "note": "西语疑问句首尾要成对用倒装符号：¡…! 与 ¿…?，estás 有重音。" },
  { "unitId": "es-u1", "prompt": "「再见，明天见」怎么说？", "options": ["Adiós, hasta mañana.", "Adiós, hasta ayer.", "Adios, hasta mañana.", "Hola, hasta mañana."], "answer": "Adiós, hasta mañana.", "note": "adiós 有重音符号；hasta mañana 是「明天见」。" },
  { "unitId": "es-u2", "prompt": "「房子」和「工作」的冠词用哪个？", "options": ["la casa / el trabajo", "el casa / la trabajo", "las casa / los trabajo", "un casa / una trabajo"], "answer": "la casa / el trabajo", "note": "casa 阴性用 la，trabajo 阳性用 el；名词分阴阳。" },
  { "unitId": "es-u2", "prompt": "下面哪个说法是对的？", "options": ["el agua fría", "la agua fría", "el agua frío", "la agua frío"], "answer": "el agua fría", "note": "agua 是阴性名词，但重音在首音节，单数用 el；形容词仍要阴性 fría。" },
  { "unitId": "es-u3", "prompt": "问「这个多少钱」用哪句？", "options": ["¿Cuánto cuesta?", "¿Cuánta cuesta?", "¿Cuántos cuesta?", "Cuánto cuesta."], "answer": "¿Cuánto cuesta?", "note": "cuánto 作疑问词不随名词变；疑问句要有 ¿?。" },
  { "unitId": "es-u3", "prompt": "问「这些东西多少钱」呢？", "options": ["¿Cuánto cuestan?", "¿Cuánto cuesta?", "¿Cuántos cuestan?", "¿Cuántas cuestan?"], "answer": "¿Cuánto cuestan?", "note": "主语是复数时动词变 cuestan，疑问词仍用 cuánto。" },
  { "unitId": "es-u4", "prompt": "「一杯咖啡」正确的是？", "options": ["un café", "uno café", "una café", "unos café"], "answer": "un café", "note": "uno 在阳性单数名词前短化成 un；café 是阳性。" },
  { "unitId": "es-u4", "prompt": "「一百欧元」正确的是？", "options": ["cien euros", "ciento euros", "cien euro", "cien euros?"], "answer": "cien euros", "note": "整百用 cien；101 起才用 ciento，名词用复数 euros。" },
  { "unitId": "es-u5", "prompt": "「我二十岁」西语怎么说？", "options": ["Tengo veinte años.", "Soy veinte años.", "Estoy veinte años.", "Tengo veinte año."], "answer": "Tengo veinte años.", "note": "年龄用 tener（有），说「我有二十岁」，不用 ser。" },
  { "unitId": "es-u5", "prompt": "「我来自上海」正确的是？", "options": ["Soy de Shanghái.", "Estoy de Shanghái.", "Soy en Shanghái.", "Tengo de Shanghái."], "answer": "Soy de Shanghái.", "note": "来源与身份用 ser + de；estar 表位置与状态。" },
  { "unitId": "es-u6", "prompt": "「我的母亲和我的父亲」正确的是？", "options": ["mi madre / mi padre", "mi madre / mi padra", "mía madre / mío padre", "mis madre / mis padre"], "answer": "mi madre / mi padre", "note": "mi / tu / su 不随名词阴阳变，只随单复数（mis / tus / sus）。" },
  { "unitId": "es-u6", "prompt": "「两个姐妹」正确的是？", "options": ["dos hermanas", "dos hermanos", "dos hermana", "dos hermanas?"], "answer": "dos hermanas", "note": "阴性复数加 -s：hermana → hermanas；hermanos 指兄弟。" },
  { "unitId": "es-u7", "prompt": "「我想要一杯咖啡」正确的是？", "options": ["Quiero un café.", "Quiero de un café.", "Quiero a un café.", "Quiero un café?"], "answer": "Quiero un café.", "note": "querer 后直接接名词，不加介词；人称变位 quiero。" },
  { "unitId": "es-u7", "prompt": "「一点糖」正确的是？", "options": ["un poco de azúcar", "un poco azúcar", "poco de azúcar", "un poco del azúcar"], "answer": "un poco de azúcar", "note": "不可数名词用 un poco de + 名词。" },
  { "unitId": "es-u8", "prompt": "「现在几点」正确的是？", "options": ["¿Qué hora es?", "¿Qué horas son?", "¿Cuánto hora es?", "¿Qué hora está?"], "answer": "¿Qué hora es?", "note": "问时间用 ser：¿Qué hora es?；回答「一点」用 es la una，其余用 son las…。" },
  { "unitId": "es-u8", "prompt": "「现在十点」正确的是？", "options": ["Son las diez.", "Es las diez.", "Son los diez.", "Es la diez."], "answer": "Son las diez.", "note": "两点以上用 son las + 数字；la 是阴性复数定冠词。" },
  { "unitId": "es-u9", "prompt": "「红车 / 红衬衫」正确的是？", "options": ["el coche rojo / la camisa roja", "el coche roja / la camisa rojo", "el coche rojos / la camisa rojas", "el coche rojo / la camisa rojo"], "answer": "el coche rojo / la camisa roja", "note": "形容词跟名词变性数：rojo / roja / rojos / rojas。" },
  { "unitId": "es-u9", "prompt": "「一栋大房子」正确的是？", "options": ["una casa grande", "una casa gran", "un casa grande", "una casa grandes"], "answer": "una casa grande", "note": "grande 阴阳同形，只变复数 grandes；casa 是阴性。" },
  { "unitId": "es-u10", "prompt": "「今天很冷」正确的是？", "options": ["Hace frío.", "Es frío.", "Está frío.", "Tiene frío."], "answer": "Hace frío.", "note": "天气用 hacer：hace frío / hace calor / hace sol。" },
  { "unitId": "es-u10", "prompt": "「有风」正确的是？", "options": ["Hay viento.", "Hace viento.", "Es viento.", "Tiene viento."], "answer": "Hace viento.", "note": "「有风」惯用 hace viento；hay viento 也能听懂但不是惯用说法。" },
  { "unitId": "es-u11", "prompt": "「向右转」礼貌说法是？", "options": ["Gire a la derecha.", "Gira la derecha.", "Gire en derecha.", "Giras a la derecha."], "answer": "Gire a la derecha.", "note": "命令式（usted）用 gire，方向用 a la + derecha。" },
  { "unitId": "es-u11", "prompt": "「一直往前走」正确的是？", "options": ["Siga todo recto.", "Siga todo derecho?", "Seguir recto.", "Sigue todo recto?"], "answer": "Siga todo recto.", "note": "seguir 的 usted 命令式是 siga；todo recto 意为「一直往前」。" },
  { "unitId": "es-u12", "prompt": "「我头疼」西语怎么说？", "options": ["Me duele la cabeza.", "Yo duele la cabeza.", "Me duelo la cabeza.", "Tengo dolor la cabeza."], "answer": "Me duele la cabeza.", "note": "用 me duele + 身体部位，字面是「头让我疼」。复数部位用 me duelen。" },
  { "unitId": "es-u12", "prompt": "「我需要休息」正确的是？", "options": ["Necesito descansar.", "Necesito descanso?", "Necesito a descansar.", "Necesito descansando."], "answer": "Necesito descansar.", "note": "necesitar 后接动词原形 descansar，不加介词。" },
  { "unitId": "es-u13", "prompt": "「我在办公室」正确的是？", "options": ["Estoy en la oficina.", "Soy en la oficina.", "Estoy a la oficina.", "Estoy en oficina?"], "answer": "Estoy en la oficina.", "note": "位置用 estar + en；ser 表本质不表地点。" },
  { "unitId": "es-u13", "prompt": "「西语学生」正确的是？", "options": ["estudiante de español", "estudiante en español", "estudiante a español", "estudiante por español"], "answer": "estudiante de español", "note": "de 表所属与内容：estudiante de español。" },
  { "unitId": "es-u14", "prompt": "「我是老师」（身份）正确的是？", "options": ["Soy profesor.", "Estoy profesor.", "Tengo profesor.", "Soy profesor?"], "answer": "Soy profesor.", "note": "身份、职业、本质用 ser：soy。" },
  { "unitId": "es-u14", "prompt": "「我在家」（位置）正确的是？", "options": ["Estoy en casa.", "Soy en casa.", "Estoy a casa.", "Soy en la casa."], "answer": "Estoy en casa.", "note": "位置与状态用 estar：estoy。" },
  { "unitId": "es-u15", "prompt": "「我买了一本书」正确的是？", "options": ["Compré un libro.", "Compro un libro.", "Compré uno libro.", "He compré un libro."], "answer": "Compré un libro.", "note": "简单过去时 -ar 动词第一人称词尾 -é：compré。" },
  { "unitId": "es-u15", "prompt": "「昨天我去看电影了」正确的是？", "options": ["Ayer fui al cine.", "Ayer voy al cine.", "Ayer ir al cine.", "Ayer fui a cine."], "answer": "Ayer fui al cine.", "note": "ir 的简单过去时第一人称是不规则 fui；al = a + el。" }
];
/* 动词变位表的人称标签（西语现在时 / 简单过去时） */
const CONJ_PERSONS = ["yo 我", "tú 你", "él/ella 他·她", "nosotros 我们", "vosotros 你们", "ellos 他们"];

/* 用 IIFE + 全局挂载，保证直接双击 index.html（file://）也能运行 */
window.LINGO = { LANGS, BUILTIN_UNITS, flattenWords, GRAMMAR_QUIZ, CONJ_PERSONS };
})();
