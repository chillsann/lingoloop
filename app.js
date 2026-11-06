/* Lingoloop — 零广告 · 零账号 · 零后端的多语种学习应用
 * 中文母语者 → 西 / 法 / 俄 / 德 / 日 / 韩 / 意 / 葡 / 阿拉伯语 / 上海话 / 闽南话
 * 纯原生 JS，无构建、无依赖；数据仅存浏览器 localStorage。 */

const { LANGS, BUILTIN_UNITS, flattenWords } = window.LINGO;

const KEY = 'lingoloop.v2', OLD_KEY = 'lingoloop.v1';
const HEARTS_MAX = 5, HEART_MS = 20 * 60 * 1000;
const ROUTES = [
  { id: 'learn', ico: '🗺️', label: '学习' }, { id: 'review', ico: '🔁', label: '复习' },
  { id: 'words', ico: '📖', label: '词库' }, { id: 'stats', ico: '📈', label: '统计' },
  { id: 'settings', ico: '⚙️', label: '设置' }
];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
/* 外语文本用 dir=auto 包裹：阿拉伯语等 RTL 文字自动从右向左排，中文/拉丁文保持 LTR */
const dv = (s) => `<span dir="auto">${esc(s)}</span>`;
const rnd = (n) => Math.floor(Math.random() * n);
const pick = (a) => a[rnd(a.length)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function shuffle(a) { const x = a.slice(); for (let i = x.length - 1; i > 0; i--) { const j = rnd(i + 1); [x[i], x[j]] = [x[j], x[i]]; } return x; }
function dateKey(d = new Date()) { const p = (n) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`; }
function dayOffset(key, n) { const d = new Date(key + 'T12:00:00'); d.setDate(d.getDate() + n); return dateKey(d); }
const uid = () => Math.random().toString(36).slice(2, 9);
const langOf = (id) => LANGS.find((l) => l.id === id) || LANGS[0];
const curLang = () => langOf(S.lang);

/* ------------------------------------------------------------ 状态 */
function defaultState() {
  return {
    lang: 'es', xp: 0, todayXp: 0, today: dateKey(),
    hearts: HEARTS_MAX, heartAt: Date.now(), streak: 0, lastActive: '',
    dailyGoal: 20, completed: [], stars: {}, wordStats: {}, mistakes: [],
    dailyXp: {}, customUnits: [], sound: true, tts: true, rate: 0.9
  };
}
let S = load();
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return Object.assign(defaultState(), JSON.parse(raw));
    const old = localStorage.getItem(OLD_KEY);   // v1 中→英版：只迁移通用数据
    if (old) {
      const o = JSON.parse(old), d = defaultState();
      ['xp', 'streak', 'dailyGoal', 'sound', 'tts', 'rate', 'todayXp', 'today', 'dailyXp', 'hearts', 'heartAt']
        .forEach((k) => { if (o[k] !== undefined) d[k] = o[k]; });
      return d;
    }
    return defaultState();
  } catch { return defaultState(); }
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('本地存储写入失败：' + e.message); } }
function rollover() {
  const t = dateKey();
  if (S.today !== t) { S.today = t; S.todayXp = 0; S.hearts = HEARTS_MAX; S.heartAt = Date.now(); }
  if (S.hearts < HEARTS_MAX) {
    const gain = Math.floor((Date.now() - (S.heartAt || Date.now())) / HEART_MS);
    if (gain > 0) { S.hearts = Math.min(HEARTS_MAX, S.hearts + gain); S.heartAt = S.hearts >= HEARTS_MAX ? Date.now() : S.heartAt + gain * HEART_MS; }
  } else S.heartAt = Date.now();
  save();
}

/* ------------------------------------------------------------ 词库与课程 */
function units() { return [...BUILTIN_UNITS, ...(S.customUnits || [])]; }
function unitsOfLang(id) { return units().filter((u) => u.langId === id); }
function unitById(id) { return units().find((u) => u.id === id); }
function words() { return flattenWords(units()); }
function wordsOfLang(id) { return words().filter((w) => w.langId === id); }
function wordById(id) { return words().find((w) => w.id === id); }
function lessonsOf(unit) {
  const ws = unit.words || [], mid = Math.ceil(ws.length / 2);
  return [
    { id: `${unit.id}-L1`, unitId: unit.id, langId: unit.langId, no: 1, title: '基础词汇', words: ws.slice(0, mid) },
    { id: `${unit.id}-L2`, unitId: unit.id, langId: unit.langId, no: 2, title: '进阶词汇', words: ws.slice(mid) },
    { id: `${unit.id}-L3`, unitId: unit.id, langId: unit.langId, no: 3, title: '综合练习', words: ws }
  ].filter((l) => l.words.length > 0);
}
function allLessons() { return units().flatMap(lessonsOf); }
function lessonsOfLang(id) { return allLessons().filter((l) => l.langId === id); }
function lessonById(id) { return allLessons().find((l) => l.id === id); }
function isUnlocked(lessonId) {
  const l = lessonById(lessonId); if (!l) return false;
  const list = lessonsOfLang(l.langId), i = list.findIndex((x) => x.id === lessonId);
  return i <= 0 || S.completed.includes(list[i - 1].id);   // 各语言独立解锁
}
function unitProgress(u) { const ls = lessonsOf(u); return { done: ls.filter((l) => S.completed.includes(l.id)).length, total: ls.length }; }
function langProgress(id) { const ls = lessonsOfLang(id); return { done: ls.filter((l) => S.completed.includes(l.id)).length, total: ls.length }; }
function masteredCount() { return Object.values(S.wordStats).filter((s) => (s.lv || 0) >= 3).length; }

/* ------------------------------------------------------------ 声音 */
let audioCtx = null;
function beep(ok) {
  if (!S.sound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    (ok ? [660, 880] : [300, 220]).forEach((f, i) => {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, audioCtx.currentTime + i * 0.085);
      g.gain.exponentialRampToValueAtTime(0.09, audioCtx.currentTime + i * 0.085 + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + i * 0.085 + 0.16);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(audioCtx.currentTime + i * 0.085); o.stop(audioCtx.currentTime + i * 0.085 + 0.17);
    });
  } catch { /* 静默 */ }
}
/* ------------------------------------------------------------ 发音引擎
 * 微信内置浏览器（安卓 X5 / iOS WKWebView）有两个坑：
 *  ① 每次 new Audio() 动态新建元素，X5 上常见「首次点击没声音」，且 play()
 *     必须发生在用户手势的同步调用链里，异步回调里调用会被系统拒绝。
 *  ② 媒体播放能力需由真实手势或 WeixinJSBridgeReady 解锁，而且
 *     「解锁用的是哪个 <audio> 元素，就必须用哪个元素播放」才有效。
 * 因此全站只复用一个常驻 <audio> 元素（带 playsinline / x5-playsinline），
 * 首次手势与微信 JSBridge 双重解锁，play() 失败自动重试一次，
 * 仍失败才降级到系统语音合成 / 在线词典音频。
 * 内置音频：data/audio/ 下 432 条 mp3（216 单词 + 216 整句例句），
 * 离线可用，不依赖浏览器 TTS、不依赖任何第三方服务。
 * ------------------------------------------------------------------ */
const AUDIO_IDS = new Set(window.LINGO_AUDIO || []);
const ONLINE_LE = { es: 'es', fr: 'fr', ru: 'ru', de: 'de', ja: 'ja', ko: 'ko', it: 'it', pt: 'pt', ar: 'ar' };
const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';

let voices = [];
function refreshVoices() { try { voices = window.speechSynthesis ? speechSynthesis.getVoices() : []; } catch { voices = []; } }
if (window.speechSynthesis) { refreshVoices(); speechSynthesis.onvoiceschanged = refreshVoices; }

let player = null, curAudio = null, mediaUnlocked = false;
/** 常驻播放器：只创建一次并挂到 DOM，微信 X5 / iOS 都认这个元素 */
function getPlayer() {
  if (player) return player;
  player = document.createElement('audio');
  ['playsinline', 'webkit-playsinline', 'x5-playsinline'].forEach((k) => player.setAttribute(k, ''));
  player.setAttribute('preload', 'auto');
  player.playsInline = true;
  player.style.cssText = 'position:fixed;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none';
  document.body.appendChild(player);
  return player;
}
function stopAudio() {
  if (curAudio) { try { curAudio.pause(); curAudio.currentTime = 0; } catch {} curAudio = null; }
  try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch {}
}
function bindBtn(a, btn) {
  if (!btn) return;
  btn.classList.add('playing');
  const done = () => btn.classList.remove('playing');
  a.onended = done; a.onerror = done;
}
/** 解锁媒体播放：解锁与播放必须用同一个元素，微信 X5 才认 */
function unlockMedia() {
  if (mediaUnlocked) return;
  mediaUnlocked = true;
  try {
    const a = getPlayer();
    a.src = SILENT_WAV; a.load();
    const p = a.play();
    if (p && p.catch) p.catch(() => {});
    a.pause();
  } catch { /* 忽略 */ }
}
document.addEventListener('touchend', unlockMedia, { once: true, capture: true });
document.addEventListener('click', unlockMedia, { once: true, capture: true });
/* 微信 JSBridge 就绪后主动解锁一次（部分安卓 X5 必需），并顺带触发网络能力初始化 */
document.addEventListener('WeixinJSBridgeReady', () => {
  if (window.WeixinJSBridge) { try { WeixinJSBridge.invoke('getNetworkType', {}, () => {}); } catch {} }
  unlockMedia();
}, false);

/** 通用播放：复用常驻元素，play() 被拒时隔 160ms 自动重试一次 */
function playUrl(url, slow, btn, onFail) {
  try {
    stopAudio();
    const a = getPlayer();
    a.onended = a.onerror = null;
    a.pause();
    a.src = url;
    a.playbackRate = slow ? 0.7 : 1;
    a.load();
    curAudio = a; bindBtn(a, btn);
    let done = false;
    const fail = () => {
      if (done) return; done = true;
      if (btn) btn.classList.remove('playing');
      if (onFail) onFail();
    };
    let tries = 0;
    const attempt = () => {
      tries++;
      let p;
      try { p = a.play(); } catch { fail(); return; }
      if (p && p.then) {
        p.then(() => { done = true; }).catch(() => {
          if (tries < 2) setTimeout(attempt, 160); else fail();
        });
      } else done = true;   // 不支持 Promise 的老 WebView，交给 onended/onerror
    };
    attempt();
    a.onerror = () => { if (btn) btn.classList.remove('playing'); if (!done) fail(); };
    return true;
  } catch { return false; }
}
/** 播放内置 mp3；返回 true 表示已发起播放（失败通过 onFail 异步回调） */
function playFile(id, slow, btn, onFail) {
  return playUrl('data/audio/' + encodeURIComponent(id) + '.mp3', slow, btn, onFail);
}
/** 系统语音合成（桌面浏览器可用，微信里常常为空） */
function playTTS(text, lang, slow, btn) {
  /* 没有任何可用音色时直接跳过，避免系统语音与在线音频叠在一起 */
  if (!window.speechSynthesis || !window.SpeechSynthesisUtterance || !voices.length) return false;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text));
    u.lang = lang.tts; u.rate = slow ? 0.6 : (S.rate || 0.9); u.pitch = 1;
    const pref = lang.tts.slice(0, 2).toLowerCase();
    const v = voices.find((x) => x.lang.toLowerCase().replace('_', '-') === lang.tts.toLowerCase())
           || voices.find((x) => x.lang.toLowerCase().replace('_', '-').startsWith(pref));
    if (v) u.voice = v;
    if (btn) { btn.classList.add('playing'); u.onend = u.onerror = () => btn.classList.remove('playing'); }
    speechSynthesis.speak(u);
    return true;
  } catch { return false; }
}
/** 在线词典音频，仅用于自定义导入的词（audio 标签不受 CORS 限制） */
function playOnline(text, langId, btn) {
  const url = 'https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(text) + '&le=' + (ONLINE_LE[langId] || 'en');
  return playUrl(url, false, btn, () => toast('这个词暂时无法发音'));
}
/** 发音主入口。opts: { btn, id, slow, auto }；id 传 xxx-ex 即朗读整句例句 */
function speak(text, langId, opts = {}) {
  const { btn = null, id = null, slow = false, auto = false } = opts;
  const lang = langOf(langId || S.lang);
  if (!S.tts || !lang.ttsOk || !text) return;
  const fallback = () => {
    if (auto) { toast('🔊 点一下喇叭就能听发音'); return; }
    if (!playTTS(text, lang, slow, btn)) playOnline(text, langId, btn);
  };
  if (id && AUDIO_IDS.has(id) && playFile(id, slow, btn, fallback)) return;
  fallback();
}

/* ------------------------------------------------------------ 提示 UI */
let toastTimer;
function toast(msg) {
  const el = $('#toast'); el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}
function modal({ ico = '❓', title, body, cancel = '取消', confirm = '确定', danger = false, onConfirm }) {
  const root = $('#modal-root');
  root.innerHTML = `<div class="modal-mask"><div class="modal">
    <div class="modal-ico">${ico}</div><h3>${esc(title)}</h3><p>${body}</p>
    <div class="btn-row" style="justify-content:center">
      ${cancel ? `<button class="btn btn-ghost" data-act="modal-close">${esc(cancel)}</button>` : ''}
      <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-act="modal-confirm">${esc(confirm)}</button>
    </div></div></div>`;
  root._onConfirm = onConfirm;
}

/* ------------------------------------------------------------ 题目生成 */
function distractors(word, pool, field, n = 3) {
  const used = new Set([word[field]]), out = [];
  for (const w of shuffle(pool.filter((x) => x.id !== word.id && x[field]))) {
    if (out.length >= n) break;
    if (used.has(w[field])) continue;
    used.add(w[field]); out.push(w[field]);
  }
  let guard = 0;
  while (out.length < n && guard++ < 40) {
    const v = String(pick(pool)[field] || '') + (guard > 20 ? '·' : '');
    if (v && !used.has(v)) { used.add(v); out.push(v); }
  }
  return out;
}
function nearMisses(word, hanzi) {
  const out = new Set(); let guard = 0;
  if (hanzi) {
    const chars = [...word], fill = ['勿', '要', '侬', '吾', '伊', '好', '啥', '格', '阿', '拉', '个', '哉', '勒', '伐'];
    while (out.size < 3 && guard++ < 80) {
      const arr = chars.slice(), m = rnd(4);
      if (m === 0 && arr.length > 1) { const i = rnd(arr.length - 1); [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; }
      else if (m === 1) arr[rnd(arr.length)] = pick(fill);
      else if (m === 2) arr.push(pick(fill));
      else if (arr.length > 1) arr.pop();
      const s = arr.join('');
      if (s && s !== word) out.add(s);
    }
    while (out.size < 3) out.add(word + pick(['个', '伐', '哉']));
  } else {
    const vowels = 'aeiou';
    while (out.size < 3 && guard++ < 80) {
      let s = word, m = rnd(4), i = rnd(Math.max(1, word.length - 1));
      if (m === 0 && i + 1 < word.length) s = word.slice(0, i) + word[i + 1] + word[i] + word.slice(i + 2);
      else if (m === 1) s = word.slice(0, i) + pick(vowels) + word.slice(i + 1);
      else if (m === 2 && word.length > 3) s = word.slice(0, -1);
      else s = word.slice(0, i) + word[i] + word.slice(i);
      if (s !== word && !out.has(s) && s.trim().length > 1) out.add(s);
    }
    while (out.size < 3) out.add(word + pick(['s', 'e', 'd', 'o', 'a']));
  }
  return [...out].slice(0, 3);
}
const norm = (s) => String(s).toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
function makeQ(word, type, pool, lang) {
  let t = type;
  /* 汉字方言、无空格语言（日/韩）、RTL 语言（阿拉伯语）都不做词块排序题 */
  if (t === 'sentence' && (lang.hanzi || lang.skipSentence || !word.ex)) t = 'spell';
  if (t === 'listen' && !lang.ttsOk && !word.pron) t = 'zh2word';
  const q = { type: t, word, langId: lang.id, id: uid() };
  if (t === 'word2zh') { q.options = shuffle([word.zh, ...distractors(word, pool, 'zh')]); q.answer = word.zh; }
  else if (t === 'zh2word') { q.options = shuffle([word.word, ...distractors(word, pool, 'word')]); q.answer = word.word; }
  else if (t === 'listen') {
    if (lang.ttsOk) { q.options = shuffle([word.word, ...distractors(word, pool, 'word')]); q.answer = word.word; q.kindLabel = '听发音，选单词'; }
    else { q.options = shuffle([word.pron, ...distractors(word, pool, 'pron')]); q.answer = word.pron; q.kindLabel = '选出正确读音'; q.noAudio = true; }
  }
  else if (t === 'spell') { q.options = shuffle([word.word, ...nearMisses(word.word, lang.hanzi)]); q.answer = word.word; }
  else if (t === 'sentence') { const tokens = word.ex.split(/\s+/).filter(Boolean); q.chops = shuffle(tokens); q.answer = tokens.join(' '); }
  return q;
}
function buildQuiz(lessonWords, langId, opts = {}) {
  const lang = langOf(langId), all = wordsOfLang(langId);
  const pool = all.length > 4 ? all : lessonWords;
  const n = opts.count || Math.max(6, Math.min(12, lessonWords.length * 2));
  const target = Math.max(1, Math.min(lessonWords.length, Math.ceil(n / 2)));
  const chosen = shuffle(lessonWords).slice(0, target);
  const extras = (lang.hanzi || lang.skipSentence)
    ? ['listen', 'spell', 'zh2word', 'listen', 'word2zh']
    : ['listen', 'spell', 'sentence', 'zh2word', 'word2zh'];
  const qs = [];
  chosen.forEach((w, i) => {
    qs.push(makeQ(w, i % 2 ? 'zh2word' : 'word2zh', pool, lang));
    qs.push(makeQ(w, extras[i % extras.length], pool, lang));
  });
  let guard = 0;
  while (qs.length < 6 && guard++ < 20) {
    const w = chosen[guard % chosen.length];
    qs.push(makeQ(w, extras[(guard + 2) % extras.length], pool, lang));
  }
  return shuffle(qs);
}

/* ------------------------------------------------------------ 答题流程 */
let Q = null;
function startQuiz(lessonId, review = false, customWords = null, langId = null) {
  const lid = langId || S.lang;
  if (S.hearts <= 0 && !review) {
    modal({ ico: '💤', title: '红心用完了', body: '红心每 20 分钟会自动恢复一颗，也可以先去「复习」练练错词（不消耗红心）。这里没有广告，也没有付费墙。', cancel: '', confirm: '知道了' });
    return;
  }
  let ws, title;
  if (customWords) { ws = customWords; title = '错词专项复习'; }
  else { const l = lessonById(lessonId); if (!l) return; ws = l.words; title = l.title; }
  if (!ws || !ws.length) { toast('这节课还没有词'); return; }
  Q = {
    questions: buildQuiz(ws, lid, { count: customWords ? Math.min(10, ws.length * 2) : undefined }),
    idx: 0, correct: 0, wrong: 0, mistakes: [],
    hearts: review ? HEARTS_MAX : S.hearts, xp: 0,
    lessonId, review, title, langId: lid,
    checked: false, selected: null, placed: [], out: false
  };
  $('#overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  renderQuiz();
}
function closeQuiz(force = false) {
  if (!Q) return;
  if (!force && !Q.out && Q.idx > 0) {
    modal({ ico: '🚪', title: '要离开这节课吗？', body: '这节课不会记为完成，但已经答对拿到的经验值会保留，掌握度和错词本也会照常更新。', confirm: '离开', danger: true, onConfirm: () => closeQuiz(true) });
    return;
  }
  if (!Q.out && Q.xp > 0) {
    const awarded = Q.review ? Math.round(Q.xp / 2) : Q.xp;
    S.xp += awarded; S.todayXp += awarded;
    S.dailyXp[S.today] = (S.dailyXp[S.today] || 0) + awarded;
    save();
  }
  Q = null;
  $('#overlay').classList.add('hidden');
  document.body.style.overflow = '';
  render();
}
function qKindLabel(q) {
  return q.kindLabel || ({ word2zh: '选出中文意思', zh2word: '选出正确写法', listen: '听发音，选单词', spell: '选出正确拼写', sentence: '把单词排成句子' })[q.type] || '练习';
}
function renderQuiz() {
  if (!Q) return;
  if (Q.out) { renderResult(); return; }
  const q = Q.questions[Q.idx], w = q.word, lang = langOf(Q.langId);
  const pct = Math.round((Q.idx / Q.questions.length) * 100);
  const say = (txt, label) => lang.ttsOk
    ? `<button class="btn btn-ghost btn-sm" data-act="speak" data-text="${esc(txt)}" data-lang="${esc(Q.langId)}" data-id="${esc(w.id)}">🔊 ${label}</button>` : '';
  let body = '';
  if (q.type === 'sentence') {
    const placed = Q.placed.map((i) => `<button class="chip placed" data-act="unplace" data-i="${i}"><span dir="auto">${esc(q.chops[i])}</span></button>`).join('');
    body = `<div class="q-kind">${qKindLabel(q)} · ${esc(lang.name)}</div>
      <h2 class="q-title">翻译这句话</h2><p class="q-hint">${esc(w.exZh || w.zh)}</p>
      <div class="answer-slot">${placed || '<span class="placeholder">依次点击下方词块…</span>'}</div>
      <div class="wordbank">${q.chops.map((c, i) => `<button class="chip ${Q.placed.includes(i) ? 'used' : ''}" data-act="place" data-i="${i}" ${Q.placed.includes(i) ? 'disabled' : ''}><span dir="auto">${esc(c)}</span></button>`).join('')}</div>
      <div class="q-example">💡 提示：${esc(w.zh)}${w.pron ? ` · ${esc(w.pron)}` : ''}</div>`;
  } else {
    const isListen = q.type === 'listen' && !q.noAudio;
    const isSpell = q.type === 'spell', isPron = q.type === 'listen' && q.noAudio;
    let head;
    if (isListen) head = `<button class="speak-btn" data-act="speak" data-text="${esc(w.word)}" data-lang="${esc(Q.langId)}" data-id="${esc(w.id)}" aria-label="播放发音">🔊</button>
        <button class="btn btn-ghost btn-sm" data-act="speak-slow" data-text="${esc(w.word)}" data-lang="${esc(Q.langId)}" data-id="${esc(w.id)}">🐢 慢速再听一次</button>`;
    else if (isPron) head = `<div class="q-word">${dv(w.word)}</div><div class="q-ipa">这个词怎么念？参照近似注音选一选</div>`;
    else if (isSpell) head = `<div class="q-word">${esc(w.zh)}</div><div class="q-ipa">选出正确的${esc(lang.name)}写法</div>`;
    else if (q.type === 'word2zh') head = `<div class="q-word">${dv(w.word)}</div><div class="q-ipa">${lang.ttsOk ? esc(w.pron || '') : '近似读音 · ' + esc(w.pron || '')}</div>${say(w.word, '听发音')}`;
    else head = `<div class="q-word">${esc(w.zh)}</div><div class="q-ipa">选出对应的${esc(lang.name)}说法</div>`;
    const titles = { word2zh: '这是什么意思？', zh2word: `「${esc(w.zh)}」怎么说？`, listen: isPron ? '选出正确读音' : '你听到了什么？', spell: `「${esc(w.zh)}」怎么写？` };
    const hint = isListen ? '点击喇叭播放，可以反复听' : isPron ? `${esc(lang.name)}暂无语音合成，这里用近似注音练习` : '点击选项后按「检查」，也可以按键盘 1–4';
    body = `<div class="q-kind ${isListen ? 'listen' : ''}">${qKindLabel(q)} · ${esc(lang.name)}</div>
      <h2 class="q-title">${titles[q.type] || '选一选'}</h2><p class="q-hint">${hint}</p>
      <div style="margin-bottom:26px">${head}</div>
      <div class="options">${q.options.map((o, i) => {
        let cls = '';
        if (Q.checked) { if (o === q.answer) cls = 'correct'; else if (i === Q.selected) cls = 'wrong'; }
        else if (i === Q.selected) cls = 'selected';
        return `<button class="option ${cls}" data-act="select" data-i="${i}" ${Q.checked ? 'disabled' : ''}><span class="key">${i + 1}</span><span dir="auto">${esc(o)}</span></button>`;
      }).join('')}</div>
      ${!Q.checked && !isListen && !isPron && w.ex ? `<div class="q-example">${dv(w.ex || '')}<i>${esc(w.exZh || '')}</i>
        ${lang.ttsOk && AUDIO_IDS.has(w.id + '-ex') ? `<button class="ex-speak" data-act="speak" data-text="${esc(w.ex)}" data-lang="${esc(Q.langId)}" data-id="${esc(w.id)}-ex" aria-label="朗读整句">🔊 听整句</button>` : ''}</div>` : ''}`;
  }
  const exBtn = lang.ttsOk && w.ex && AUDIO_IDS.has(w.id + '-ex')
    ? `<button class="ex-speak ex-speak--fb" data-act="speak" data-text="${esc(w.ex)}" data-lang="${esc(Q.langId)}" data-id="${esc(w.id)}-ex" aria-label="朗读整句例句">🔊 听整句</button>` : '';
  const fb = Q.checked
    ? `<div class="feedback ${Q.lastOk ? 'ok' : 'no'}"><b><span class="feedback-ico">${Q.lastOk ? '✓' : '✕'}</span>${Q.lastOk ? pick(['很好！', '答对了', '漂亮', '就是这个']) : '再记一下'}</b>
        <small>${Q.lastOk ? `+${Q.lastXp} XP` : `正确答案：${esc(q.answer)}`}</small>${Q.lastOk ? exBtn : ''}</div>`
    : `<div class="feedback"><b style="color:var(--ink-3);font-size:14px">第 ${Q.idx + 1} / ${Q.questions.length} 题 · ${esc(lang.name)}</b><small>答错会扣一颗红心，别紧张</small></div>`;
  const canCheck = q.type === 'sentence' ? Q.placed.length === q.chops.length : Q.selected !== null;
  const btnLabel = Q.checked ? (Q.idx === Q.questions.length - 1 ? '完成' : '继续') : '检查';
  $('#overlay').innerHTML = `
    <div class="quiz-top"><button class="quiz-close" data-act="quit" aria-label="退出">✕</button>
      <div class="quiz-bar"><i style="width:${pct}%"></i></div>
      <div class="quiz-hearts">${Q.review ? '🔁 复习' : '♥ ' + Q.hearts}</div></div>
    <div class="quiz-main">${body}</div>
    <div class="quiz-footer"><div class="quiz-footer-inner">${fb}
      <button class="btn btn-primary" data-act="check" ${Q.checked || canCheck ? '' : 'disabled'} ${Q.checked && !Q.lastOk ? 'style="background:#df6f6f;box-shadow:0 4px 0 #c25a5a"' : ''}>${btnLabel}</button>
    </div></div>`;
  if (q.type === 'listen' && !q.noAudio && !Q.checked) setTimeout(() => speak(w.word, Q.langId, { id: w.id, auto: true }), 260);
}
function doCheck() {
  if (!Q || Q.out) return;
  const q = Q.questions[Q.idx];
  if (!Q.checked) {
    const can = q.type === 'sentence' ? Q.placed.length === q.chops.length : Q.selected !== null;
    if (!can) return;
    const ok = q.type === 'sentence'
      ? norm(Q.placed.map((i) => q.chops[i]).join(' ')) === norm(q.answer)
      : q.options[Q.selected] === q.answer;
    Q.lastOk = ok; Q.lastXp = ok ? 10 : 0; Q.checked = true;
    if (ok) {
      Q.correct++; Q.xp += Q.lastXp; beep(true);
      /* 句子排序题答对后朗读完整例句；其余题型朗读单词 */
      if (q.type === 'sentence' && q.word.ex && AUDIO_IDS.has(q.word.id + '-ex'))
        speak(q.word.ex, Q.langId, { id: q.word.id + '-ex' });
      else speak(q.word.word, Q.langId, { id: q.word.id });
      const st = S.wordStats[q.word.id] || { c: 0, w: 0, lv: 0 };
      st.c++; st.lv = clamp((st.lv || 0) + 1, 0, 5); S.wordStats[q.word.id] = st;
      if (Q.review) S.mistakes = S.mistakes.filter((id) => id !== q.word.id);
    } else {
      Q.wrong++; beep(false);
      if (!Q.review) { Q.hearts = Math.max(0, Q.hearts - 1); S.hearts = Q.hearts; S.heartAt = Date.now(); }
      if (!Q.mistakes.includes(q.word.id)) Q.mistakes.push(q.word.id);
      if (!S.mistakes.includes(q.word.id)) S.mistakes.push(q.word.id);
      const st = S.wordStats[q.word.id] || { c: 0, w: 0, lv: 0 };
      st.w++; st.lv = clamp((st.lv || 0) - 1, 0, 5); S.wordStats[q.word.id] = st;
    }
    save(); renderQuiz(); return;
  }
  if (Q.hearts <= 0 && !Q.review) { finishQuiz(true); return; }
  if (Q.idx >= Q.questions.length - 1) finishQuiz(false);
  else { Q.idx++; Q.checked = false; Q.selected = null; Q.placed = []; renderQuiz(); }
}
function finishQuiz(ranOut) {
  Q.out = true;
  const bonus = Q.wrong === 0 && Q.correct > 0 ? 15 : 0, gained = Q.xp + bonus;
  const firstTime = Q.lessonId && !Q.review && !S.completed.includes(Q.lessonId) && !ranOut;
  const repeat = Q.lessonId && !Q.review && S.completed.includes(Q.lessonId);
  const awarded = Q.review ? Math.round(gained * 0.5) : (repeat ? Math.round(gained * 0.5) : gained);
  S.xp += awarded; S.todayXp += awarded;
  S.dailyXp[S.today] = (S.dailyXp[S.today] || 0) + awarded;
  if (firstTime) {
    S.completed.push(Q.lessonId);
    const acc = Q.correct / Math.max(1, Q.correct + Q.wrong);
    S.stars[Q.lessonId] = acc >= 0.95 ? 3 : acc >= 0.7 ? 2 : 1;
  }
  if (!ranOut && Q.correct > 0 && S.lastActive !== S.today) {
    S.streak = S.lastActive === dayOffset(S.today, -1) ? (S.streak || 0) + 1 : 1;
    S.lastActive = S.today;
  }
  Q.final = { awarded, bonus, ranOut, firstTime, repeat, acc: Math.round(Q.correct / Math.max(1, Q.correct + Q.wrong) * 100) };
  save(); renderResult();
  if (Q.final.firstTime || Q.wrong === 0) beep(true);
}
function renderResult() {
  const f = Q.final, lang = langOf(Q.langId);
  const emoji = f.ranOut ? '💤' : f.acc >= 90 ? '🎉' : f.acc >= 60 ? '👍' : '🌱';
  const heading = f.ranOut ? '红心用完啦' : f.acc >= 90 ? '太棒了！' : f.acc >= 60 ? '完成一节课' : '继续加油';
  const sub = f.ranOut ? '休息一下，红心会自动恢复；或者去「复习」练错词，不消耗红心。'
    : Q.review ? '错词又少了一批，掌握度正在上升。'
    : f.firstTime ? `${lang.name}的新课程已解锁，连胜继续保持。` : '复习旧课也能巩固记忆，经验值按一半计算。';
  const list = Q.mistakes.map(wordById).filter(Boolean);
  $('#overlay').innerHTML = `
    <div class="quiz-top"><button class="quiz-close" data-act="quit-force" aria-label="返回">✕</button>
      <div class="quiz-bar"><i style="width:100%"></i></div><div class="quiz-hearts">✓</div></div>
    <div class="result"><div class="result-emoji">${emoji}</div><h2>${heading}</h2><p>${sub}</p>
      <div class="result-grid">
        <div class="result-cell xp"><b>+${f.awarded}</b><span>经验值 XP</span></div>
        <div class="result-cell acc"><b>${f.acc}%</b><span>正确率</span></div>
        <div class="result-cell mis"><b>${Q.wrong}</b><span>需复习</span></div></div>
      ${list.length ? `<div class="mistake-list"><h4>📌 这些词再记一下</h4>
        ${list.map((w) => `<div class="mistake-row"><b>${dv(w.word)}</b><span>${esc(w.zh)} · ${esc(w.pron || '')}</span></div>`).join('')}</div>` : ''}
      <div class="result-actions">
        ${f.ranOut ? `<button class="btn btn-primary btn-lg" data-act="go-review">去复习错词（不扣红心）</button>` : ''}
        <button class="btn ${f.ranOut ? 'btn-outline' : 'btn-primary'} btn-lg" data-act="quit-force">返回${esc(lang.name)}课程地图</button>
        ${!f.ranOut ? `<button class="btn btn-ghost" data-act="again">再练一次</button>` : ''}
      </div></div>`;
}

/* ------------------------------------------------------------ 页面 */
function route() { const r = (location.hash || '').replace(/^#\/?/, '').split('/')[0]; return ROUTES.some((x) => x.id === r) ? r : 'learn'; }
function go(r) { location.hash = '#/' + r; if (route() === r) render(); }
function renderChrome() {
  $('#stat-streak').innerHTML = `<span class="stat-ico">🔥</span><b>${S.streak || 0}</b>`;
  $('#stat-xp').innerHTML = `<span class="stat-ico xp">✦</span><b>${S.xp || 0}</b>`;
  $('#stat-hearts').innerHTML = `<span class="stat-ico heart">♥</span><b>${S.hearts}</b>`;
  const r = route();
  const item = (x, tab) => `<button class="${tab ? 'tab' : 'nav-item'} ${x.id === r ? 'active' : ''}" data-act="nav" data-r="${x.id}"><span class="nav-ico">${x.ico}</span><span>${x.label}</span></button>`;
  $('#sidebar').innerHTML = ROUTES.map((x) => item(x)).join('') + `<div class="sidebar-note"><strong>🔒 数据只在你这里</strong>没有账号、没有广告、没有服务器。进度保存在本机浏览器，可在设置里导出备份。</div>`;
  $('#tabbar').innerHTML = ROUTES.map((x) => item(x, true)).join('');
}
function render() {
  rollover(); if (Q) return;
  renderChrome();
  $('#view').innerHTML = ({ learn: viewLearn, review: viewReview, words: viewWords, stats: viewStats, settings: viewSettings })[route()]();
}
function langPicker() {
  return `<div class="section-label">选择要学的语言 · ${LANGS.length} 门</div>
    <div class="lang-grid">${LANGS.map((l) => {
      const p = langProgress(l.id);
      return `<button class="lang-card ${S.lang === l.id ? 'active' : ''}" style="--lc:${l.color}" data-act="lang" data-id="${l.id}">
        <span class="lang-emoji">${l.emoji}</span><span class="lang-name">${esc(l.name)}</span>
        <span class="lang-native" dir="auto">${esc(l.native)}</span><span class="lang-prog">${p.done}/${p.total} 课</span></button>`;
    }).join('')}</div>`;
}
function viewLearn() {
  const lang = curLang(), goal = S.dailyGoal || 20;
  const pctGoal = clamp(Math.round(S.todayXp / goal * 100), 0, 100), deg = Math.round(pctGoal * 3.6);
  const next = lessonsOfLang(lang.id).find((l) => !S.completed.includes(l.id));
  const nextUnit = next ? unitById(next.unitId) : null, lp = langProgress(lang.id);
  const tiles = [
    { ico: '🔥', v: S.streak || 0, l: '连续天数' }, { ico: '✦', v: S.xp || 0, l: '累计 XP' },
    { ico: '📗', v: `${lp.done}/${lp.total}`, l: `${lang.name}课程` }, { ico: '🧠', v: masteredCount(), l: '已掌握词' }
  ];
  return `<div class="hero"><div>
      <h2>${S.todayXp >= goal ? '今日目标已完成 🎉' : `今天学点${esc(lang.name)}吧`}</h2>
      <p>${nextUnit ? `下一站：<b>${esc(nextUnit.title)}</b> · ${esc(next.title)}` : `${esc(lang.name)}全部通关了，换门语言或去复习巩固。`}</p>
      <p class="lang-tip">${esc(lang.tip)}</p>
      <div class="hero-goal"><div class="goal-row"><span>今日目标</span><span>${S.todayXp} / ${goal} XP</span></div>
        <div class="bar"><i style="width:${pctGoal}%"></i></div></div>
      <div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn-primary" data-act="continue">${next ? '继续学习 →' : '自由复习 →'}</button>
        <button class="btn btn-ghost" data-act="nav" data-r="review">复习错词 ${S.mistakes.length ? `(${S.mistakes.length})` : ''}</button></div>
    </div><div class="hero-ring" style="background:conic-gradient(var(--green) ${deg}deg,#e6efe8 ${deg}deg)">
      <div><b>${pctGoal}%</b><span>今日进度</span></div></div></div>
    <div class="tile-grid">${tiles.map((t) => `<div class="tile"><div class="tile-ico">${t.ico}</div><b>${t.v}</b><span>${t.l}</span></div>`).join('')}</div>
    ${langPicker()}
    <div class="section-label">${esc(lang.name)}课程地图 · ${unitsOfLang(lang.id).length} 个单元 / ${wordsOfLang(lang.id).length} 个词</div>
    ${unitsOfLang(lang.id).map((u, ui) => {
      const p = unitProgress(u);
      return `<section class="unit"><div class="unit-head" style="background:${esc(lang.color)}">
        <div class="unit-ico">${esc(u.icon || '📘')}</div>
        <div class="unit-head-text"><h3>单元 ${ui + 1} · ${esc(u.title)}</h3><p>${esc(u.subtitle || '')}</p></div>
        <div class="unit-progress">${p.done}/${p.total} 课</div></div>
        <div class="unit-body">
          <p class="unit-note">${esc((u.words[0] || {}).word || '')}、${esc((u.words[1] || {}).word || '')}… 共 ${u.words.length} 个词，学完解锁下一单元。</p>
          <div class="path"><div class="path-dots">• • •</div>
          ${lessonsOf(u).map((l, li) => {
            const unlocked = isUnlocked(l.id), done = S.completed.includes(l.id), stars = S.stars[l.id] || 0;
            return `<div class="path-row" style="transform:translateX(${li === 1 ? '38px' : li === 2 ? '-26px' : '0'})">
              <div class="lesson-wrap"><button class="lesson-node ${unlocked ? '' : 'locked'} ${done ? 'done' : ''}"
                data-act="${unlocked ? 'lesson' : 'locked'}" data-id="${esc(l.id)}" aria-label="${esc(l.title)}">
                ${unlocked ? (done ? '<span class="check">✓</span>' : (li === 2 ? '⭐' : '📖')) : '🔒'}</button>
                <div class="lesson-label ${unlocked ? '' : 'locked'}">${esc(l.title)}${done ? `<div class="lesson-stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>` : ''}</div></div></div>`;
          }).join('')}<div class="path-dots">• • •</div></div></div></section>`;
    }).join('')}`;
}
function viewReview() {
  const list = S.mistakes.map(wordById).filter(Boolean);
  const weak = words().filter((w) => (S.wordStats[w.id]?.lv || 0) <= 1 && !S.mistakes.includes(w.id)).slice(0, 20);
  return `<div class="page-head"><h1 class="page-title">复习与错词本</h1><p class="page-desc">所有语言一起复习，不消耗红心，答对后错词会自动移出列表。</p></div>
    <div class="card"><h3 class="card-title">📌 我的错词 <span class="pill ${list.length ? 'pill-red' : 'pill-green'}">${list.length} 个</span></h3>
      <p class="card-sub">答错的词会自动收进这里，答对一次即可移除。</p>
      ${list.length ? `<div class="btn-row" style="margin:0 0 18px">
          <button class="btn btn-primary" data-act="review-mistakes">开始错词专项练习（${Math.min(10, list.length * 2)} 题）</button>
          <button class="btn btn-ghost btn-sm" data-act="clear-mistakes">清空错词本</button></div>
        <div class="word-list">${list.map(wordRow).join('')}</div>`
        : `<div class="empty"><span class="empty-ico">✨</span><h3>错词本是空的</h3><p>去学一课，答错的词会自动出现在这里。</p>
           <button class="btn btn-primary" data-act="nav" data-r="learn">去学习</button></div>`}</div>
    ${weak.length ? `<div class="card"><h3 class="card-title">🌱 掌握度较低的词</h3>
      <p class="card-sub">这些词还没练熟，可以顺手过一遍。</p>
      <div class="word-list">${weak.slice(0, 12).map(wordRow).join('')}</div>
      <div class="btn-row"><button class="btn btn-outline btn-sm" data-act="review-weak">练一练这些词</button></div></div>` : ''}`;
}
function wordRow(w) {
  const st = S.wordStats[w.id] || { lv: 0, c: 0, w: 0 }, lang = langOf(w.langId);
  return `<div class="word-row"><div class="word-main">
      <div><span class="word-en" dir="auto">${esc(w.word)}</span><span class="word-ipa">${esc(w.pron || '')}</span></div>
      <div class="word-zh">${esc(w.zh)} <span class="pill pill-gray" style="font-size:10px;padding:1px 7px">${esc(lang.name)}</span></div>
      ${w.ex ? `<div class="word-ex" dir="auto">${esc(w.ex)}
        ${lang.ttsOk && AUDIO_IDS.has(w.id + '-ex') ? `<button class="ex-speak" data-act="speak" data-text="${esc(w.ex)}" data-lang="${esc(w.langId)}" data-id="${esc(w.id)}-ex" aria-label="朗读整句">🔊 听整句</button>` : ''}</div>` : ''}</div>
    <div class="word-meta">
      ${lang.ttsOk ? `<button class="mini-speak" data-act="speak" data-text="${esc(w.word)}" data-lang="${esc(w.langId)}" data-id="${esc(w.id)}" aria-label="朗读单词">🔊</button>` : '<span style="font-size:11px;color:var(--ink-3)">无语音</span>'}
      <div class="mastery" title="掌握度 ${st.lv}/5">${[1,2,3,4,5].map((i) => `<i class="${i <= (st.lv || 0) ? 'on' : ''}"></i>`).join('')}</div>
    </div></div>`;
}
function viewWords() {
  const lang = curLang(), all = wordsOfLang(lang.id);
  const rows = all.map((w) => `<tr data-id="${esc(w.id)}">
      <td style="padding:11px 10px;border-top:1px solid var(--line)"><b dir="auto">${esc(w.word)}</b><div style="font-size:11.5px;color:var(--ink-3)">${esc(w.pron || '')}</div>
        ${w.ex ? `<div class="word-ex" dir="auto">${esc(w.ex)}</div>` : ''}</td>
      <td style="padding:11px 10px;border-top:1px solid var(--line)">${esc(w.zh)}</td>
      <td style="padding:11px 10px;border-top:1px solid var(--line);font-size:12px;color:var(--ink-2)">${esc(w.unitTitle)}</td>
      <td style="padding:11px 10px;border-top:1px solid var(--line);text-align:right;white-space:nowrap">${lang.ttsOk ? `<button class="mini-speak" data-act="speak" data-text="${esc(w.word)}" data-lang="${esc(lang.id)}" data-id="${esc(w.id)}" aria-label="朗读单词">🔊</button>${AUDIO_IDS.has(w.id + '-ex') ? `<button class="ex-speak" data-act="speak" data-text="${esc(w.ex)}" data-lang="${esc(lang.id)}" data-id="${esc(w.id)}-ex" aria-label="朗读整句">整句</button>` : ''}` : ''}</td></tr>`).join('');
  return `<div class="page-head"><h1 class="page-title">词库</h1><p class="page-desc">${esc(lang.name)}内置 ${all.length} 个词，可在「设置」里导入自己的词表。</p></div>
    ${langPicker()}
    <div class="card" style="padding:0;overflow:hidden">
      <div style="padding:18px 22px;display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <input type="text" id="wordSearch" placeholder="🔍 搜索写法或中文…" style="max-width:320px" autocomplete="off">
        <span class="pill pill-gray" id="wordCount">${all.length} 个词</span></div>
      <div style="overflow-x:auto;padding:0 12px 14px"><table style="width:100%;border-collapse:collapse;font-size:14px" id="wordTable"><tbody>${rows}</tbody></table></div></div>
    ${!lang.ttsOk ? `<div class="card" style="background:var(--green-tint);border-color:#dcefe2">
      <h3 class="card-title">🗣️ 关于${esc(lang.name)}发音</h3>
      <p style="font-size:13px;color:var(--ink-2);margin:0">${esc(lang.name)}目前没有浏览器可用的语音合成，也没有统一的拼音方案。词库里的注音是<b>近似读音</b>，仅供跟读参考，实际声调和口音请以本地人发音为准。学习时用「选出正确读音」题型代替听音题。</p></div>` : ''}
    ${lang.rtl ? `<div class="card" style="background:#fdf8ef;border-color:#eee0c4">
      <h3 class="card-title">↔️ 关于从右向左书写</h3>
      <p style="font-size:13px;color:var(--ink-2);margin:0">${esc(lang.name)}从右向左书写，界面会按文字方向自动排版。词条附<b>拉丁转写</b>（如 <span dir="ltr">marḥaban</span>）方便初学者跟读；现代标准阿拉伯语通常不标元音符号，实际读音请以内置发音音频为准。</p></div>` : ''}`;
}
function viewStats() {
  const days = Array.from({ length: 7 }, (_, i) => dayOffset(dateKey(), i - 6));
  const vals = days.map((d) => S.dailyXp[d] || 0), max = Math.max(20, ...vals);
  const totalAnswered = Object.values(S.wordStats).reduce((a, s) => a + (s.c || 0) + (s.w || 0), 0);
  const totalCorrect = Object.values(S.wordStats).reduce((a, s) => a + (s.c || 0), 0);
  const acc = totalAnswered ? Math.round(totalCorrect / totalAnswered * 100) : 0;
  return `<div class="page-head"><h1 class="page-title">学习统计</h1><p class="page-desc">所有数字都来自你本机浏览器，不上传、不追踪。</p></div>
    <div class="tile-grid" style="grid-template-columns:repeat(4,1fr)">
      <div class="tile"><div class="tile-ico">✦</div><b>${S.xp || 0}</b><span>累计 XP</span></div>
      <div class="tile"><div class="tile-ico">🔥</div><b>${S.streak || 0}</b><span>连续天数</span></div>
      <div class="tile"><div class="tile-ico">🎯</div><b>${acc}%</b><span>总正确率</span></div>
      <div class="tile"><div class="tile-ico">🧠</div><b>${masteredCount()}</b><span>已掌握词</span></div></div>
    <div class="card"><h3 class="card-title">最近 7 天</h3><p class="card-sub">每天获得的经验值</p>
      <div class="heat">${days.map((d, i) => `<div class="heat-col" title="${d} · ${vals[i]} XP">
        <div class="heat-bar ${vals[i] ? '' : 'zero'}" style="height:${vals[i] ? Math.max(8, vals[i] / max * 78) : 5}px"></div>
        <span>${d.slice(5).replace('-', '/')}</span></div>`).join('')}</div></div>
    <div class="card"><h3 class="card-title">各语言进度</h3>
      ${LANGS.map((l) => { const p = langProgress(l.id); return `<div class="stat-line"><span>${l.emoji} ${esc(l.name)}</span><b>${p.done} / ${p.total} 课</b></div>`; }).join('')}</div>
    <div class="card"><h3 class="card-title">明细</h3>
      <div class="stat-line"><span>当前语言</span><b>${esc(curLang().name)}</b></div>
      <div class="stat-line"><span>完成课程（全部语言）</span><b>${S.completed.length} / ${allLessons().length}</b></div>
      <div class="stat-line"><span>累计答题</span><b>${totalAnswered} 题</b></div>
      <div class="stat-line"><span>答对 / 答错</span><b>${totalCorrect} / ${totalAnswered - totalCorrect}</b></div>
      <div class="stat-line"><span>错词本</span><b>${S.mistakes.length} 个</b></div>
      <div class="stat-line"><span>自定义词库</span><b>${(S.customUnits || []).length} 个单元</b></div>
      <div class="stat-line"><span>今日目标</span><b>${S.todayXp} / ${S.dailyGoal} XP</b></div></div>`;
}
function viewSettings() {
  const langOpts = (sel) => LANGS.map((l) => `<option value="${l.id}" ${sel === l.id ? 'selected' : ''}>${esc(l.name)} · ${esc(l.native)}</option>`).join('');
  return `<div class="page-head"><h1 class="page-title">设置</h1><p class="page-desc">偏好与数据都保存在本机，随时可导出备份。</p></div>
    <div class="card"><h3 class="card-title">默认学习语言</h3><p class="card-sub">打开应用时默认选中哪门语言（学习页顶部也能随时切换）。</p>
      <div class="field" style="max-width:300px;margin:0"><select id="defaultLang">${langOpts(S.lang)}</select></div></div>
    <div class="card"><h3 class="card-title">学习目标</h3><p class="card-sub">建议 20 XP（约两节课），按自己的节奏来就好。</p>
      <div class="goal-options">${[10, 20, 30, 50].map((g) => `<button class="goal-opt ${S.dailyGoal === g ? 'active' : ''}" data-act="goal" data-v="${g}">${g} XP / 天</button>`).join('')}</div></div>
    <div class="card"><h3 class="card-title">声音与发音</h3>
      <div class="switch-row"><div class="txt"><b>答题提示音</b><span>答对 / 答错时的轻微提示</span></div>
        <button class="switch ${S.sound ? 'on' : ''}" data-act="toggle" data-k="sound" aria-label="答题提示音"></button></div>
      <div class="switch-row"><div class="txt"><b>自动朗读外语</b><span>关闭后所有发音静音（含内置音频）</span></div>
        <button class="switch ${S.tts ? 'on' : ''}" data-act="toggle" data-k="tts" aria-label="自动朗读"></button></div>
      <div class="switch-row"><div class="txt"><b>朗读语速</b><span>当前 ${S.rate}× · 仅作用于系统语音；内置音频可用「慢速再听一次」</span></div>
        <div class="goal-options">${[0.7, 0.9, 1.1].map((r) => `<button class="goal-opt ${S.rate === r ? 'active' : ''}" data-act="rate" data-v="${r}">${r}×</button>`).join('')}</div></div>
      <div style="margin-top:14px;padding:14px 16px;background:var(--green-tint);border:1px solid #dcefe2;border-radius:12px">
        <b style="font-size:13.5px">🎧 内置离线发音 ${AUDIO_IDS.size} 条</b>
        <p style="font-size:12.5px;color:var(--ink-2);margin:7px 0">西 / 法 / 俄 / 德 / 日 / 韩 / 意 / 葡 / 阿拉伯语共 <b>9 门语言、216 个单词 + 216 句完整例句</b>，全部由微软神经语音生成，多音节短语与整句都能完整朗读。<b>微信、QQ 内置浏览器都能播放</b>，不依赖浏览器语音合成；每条发音首次播放后自动缓存，之后断网也能听。上海话与闽南话两门方言暂无语音，仍用近似注音练习。</p>
        <p style="font-size:12px;color:var(--ink-3);margin:0 0 10px">当前环境：${voices.length ? `系统语音可用（${voices.length} 个音色）` : '浏览器未提供系统语音（常见于微信内置浏览器）→ 已自动使用内置音频'} · 播放引擎已针对微信 X5 内核解锁${mediaUnlocked ? '（已就绪）' : '（等待首次触摸）'}</p>
        <div class="btn-row" style="justify-content:flex-start;gap:8px;flex-wrap:wrap">
          <button class="btn btn-outline btn-sm" data-act="speak" data-text="hola" data-lang="es" data-id="es-u1-1">🔊 测单词</button>
          <button class="btn btn-outline btn-sm" data-act="speak" data-text="¡Hola! ¿Cómo estás?" data-lang="es" data-id="es-u1-1-ex">🔊 测整句</button></div></div></div>
    <div class="card"><h3 class="card-title">导入自定义词库</h3>
      <p class="card-sub">把自己的词表变成一个可学习的新单元，先选语言，再粘贴 JSON 数组或 CSV。</p>
      <div class="field" style="max-width:300px"><label for="importLang">归入哪门语言</label><select id="importLang">${langOpts(S.lang)}</select></div>
      <div class="code-sample">[{"word":"buenos días","zh":"早上好","pron":"/ˈbwenos ˈdias/","ex":"Buenos días, ¿qué tal?","exZh":"早上好，怎么样？"},
 {"word":"vale","zh":"好的；行","pron":"/ˈbale/","ex":"Vale, nos vemos.","exZh":"好，回头见。"}]</div>
      <div class="dropzone" id="dropzone"><p>把 .json / .csv 文件拖到这里，或直接粘贴内容 ↓</p>
        <textarea id="importText" placeholder='粘贴 JSON 数组或 CSV 内容…'></textarea>
        <div class="btn-row" style="justify-content:center">
          <button class="btn btn-primary btn-sm" data-act="import-text">导入粘贴的内容</button>
          <button class="btn btn-ghost btn-sm" data-act="pick-file">选择文件…</button>
          <input type="file" id="fileInput" accept=".json,.csv,.txt" hidden></div></div>
      <p class="help" style="margin-top:12px">CSV 表头：<code>word,zh,pron,ex,exZh</code>（后三列可省略）。已有 ${(S.customUnits || []).length} 个自定义单元。</p>
      ${(S.customUnits || []).length ? `<div class="btn-row">${S.customUnits.map((u) => `<button class="btn btn-danger btn-sm" data-act="del-unit" data-id="${esc(u.id)}">删除「${esc(u.title)}」</button>`).join('')}</div>` : ''}</div>
    <div class="card"><h3 class="card-title">数据备份</h3><p class="card-sub">换电脑、清缓存前建议导出一份。</p>
      <div class="btn-row"><button class="btn btn-outline btn-sm" data-act="export">导出进度 JSON</button>
        <button class="btn btn-ghost btn-sm" data-act="import-progress">导入进度 JSON</button>
        <button class="btn btn-danger btn-sm" data-act="reset">清空全部数据</button></div></div>
    <div class="card" style="background:var(--green-tint);border-color:#dcefe2"><h3 class="card-title">🌿 关于 Lingoloop</h3>
      <p style="font-size:13.5px;color:var(--ink-2);margin:0">一个原创的、零广告零账号的开源多语种学习应用。代码完全本地运行，没有统计脚本、没有广告 SDK、没有付费墙，也不需要注册任何账号。词库与界面均为原创，与 Duolingo 无任何关联。</p></div>`;
}

/* ------------------------------------------------------------ 导入导出 */
function parseImport(text, name, langId) {
  const t = text.trim(); if (!t) throw new Error('内容为空');
  let arr;
  if (t.startsWith('[') || t.startsWith('{')) { arr = JSON.parse(t); if (!Array.isArray(arr)) arr = [arr]; }
  else {
    const lines = t.split(/\r?\n/).filter((l) => l.trim()), sep = lines[0].includes('\t') ? '\t' : ',';
    const cells = (line) => {
      const out = []; let cur = '', q = false;
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; }
        else if (c === sep && !q) { out.push(cur.trim()); cur = ''; } else cur += c;
      }
      out.push(cur.trim()); return out;
    };
    const head = cells(lines[0]).map((h) => h.toLowerCase().replace(/[^a-z]/g, ''));
    const hasHead = head.includes('word') && head.includes('zh');
    const rows = (hasHead ? lines.slice(1) : lines).map(cells);
    const col = (r, key, fb) => hasHead && head.indexOf(key) >= 0 ? r[head.indexOf(key)] : (r[fb] || '');
    arr = rows.map((r) => ({ word: col(r, 'word', 0), zh: col(r, 'zh', 1), pron: col(r, 'pron', 2), ex: col(r, 'ex', 3), exZh: col(r, 'exzh', 4) }));
  }
  const clean = arr.map((r) => ({
    word: String(r.word || r.en || '').trim(), zh: String(r.zh || r.meaning || '').trim(),
    pron: String(r.pron || r.ipa || '').trim(), ex: String(r.ex || r.example || '').trim(),
    exZh: String(r.exZh || r.exampleZh || r.translation || '').trim()
  })).filter((r) => r.word && r.zh);
  if (!clean.length) throw new Error('没有解析到有效词条，需要至少包含 word 和 zh 两列');
  const lid = langId || S.lang, id = `custom-${lid}-${uid()}`;
  S.customUnits.push({
    id, langId: lid, title: (name || '我的词库').slice(0, 20), subtitle: `${clean.length} words · custom`,
    color: langOf(lid).color, icon: '✏️',
    words: clean.map((r, i) => ({ id: `${id}-${i}`, word: r.word, zh: r.zh, pron: r.pron, ex: r.ex, exZh: r.exZh }))
  });
  S.lang = lid; save(); render();
  toast(`✅ 已导入 ${clean.length} 个词到${langOf(lid).name}`);
}
function exportProgress() {
  const blob = new Blob([JSON.stringify({ app: 'Lingoloop', version: 2, exportedAt: new Date().toISOString(), state: S }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `lingoloop-backup-${dateKey()}.json`; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000); toast('已导出备份文件');
}

/* ------------------------------------------------------------ 事件委托 */
document.addEventListener('click', (e) => {
  const mask = e.target.closest('.modal-mask');
  if (mask && e.target === mask) { $('#modal-root').innerHTML = ''; return; }
  const el = e.target.closest('[data-act]'); if (!el) return;
  const act = el.dataset.act;
  if (act === 'modal-close') { $('#modal-root').innerHTML = ''; return; }
  if (act === 'modal-confirm') { const fn = $('#modal-root')._onConfirm; $('#modal-root').innerHTML = ''; if (fn) fn(); return; }
  if (act === 'nav' || act === 'go-review') { go(act === 'go-review' ? 'review' : el.dataset.r); return; }
  if (act === 'lang') { S.lang = el.dataset.id; save(); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  if (act === 'continue') {
    const next = lessonsOfLang(S.lang).find((l) => !S.completed.includes(l.id));
    if (next) startQuiz(next.id, false, null, S.lang); else go('review'); return;
  }
  if (act === 'locked') { toast('🔒 先完成这门语言前面的课程就能解锁'); return; }
  if (act === 'lesson') { const l = lessonById(el.dataset.id); startQuiz(el.dataset.id, false, null, l ? l.langId : S.lang); return; }
  if (act === 'speak') { speak(el.dataset.text, el.dataset.lang || S.lang, { btn: el, id: el.dataset.id }); return; }
  if (act === 'speak-slow') { speak(el.dataset.text, el.dataset.lang || S.lang, { btn: el, id: el.dataset.id, slow: true }); return; }
  if (act === 'quit') { closeQuiz(); return; }
  if (act === 'quit-force') { closeQuiz(true); return; }
  if (act === 'again') {
    const id = Q.lessonId, rev = Q.review, lid = Q.langId; closeQuiz(true);
    if (rev && !id) startQuiz(null, true, S.mistakes.map(wordById).filter((w) => w && w.langId === lid), lid);
    else startQuiz(id, rev, null, lid); return;
  }
  if (act === 'select') { if (!Q || Q.checked || Q.questions[Q.idx].type === 'sentence') return; Q.selected = Number(el.dataset.i); renderQuiz(); return; }
  if (act === 'place') { if (!Q || Q.checked) return; Q.placed.push(Number(el.dataset.i)); renderQuiz(); return; }
  if (act === 'unplace') { if (!Q || Q.checked) return; Q.placed = Q.placed.filter((i) => i !== Number(el.dataset.i)); renderQuiz(); return; }
  if (act === 'check') { doCheck(); return; }
  if (act === 'review-mistakes') {
    const all = S.mistakes.map(wordById).filter(Boolean);
    if (!all.length) { toast('错词本是空的'); return; }
    // 一次只复习同一门语言的错词，避免发音串到别的语言
    const lid = all[0].langId, list = all.filter((w) => w.langId === lid);
    toast(`正在复习${langOf(lid).name}的 ${list.length} 个错词`);
    startQuiz(null, true, list, lid); return;
  }
  if (act === 'review-weak') {
    const all = words().filter((w) => (S.wordStats[w.id]?.lv || 0) <= 1).slice(0, 24);
    if (!all.length) { toast('暂时没有需要加强的词'); return; }
    const lid = all[0].langId, list = all.filter((w) => w.langId === lid).slice(0, 12);
    startQuiz(null, true, list, lid); return;
  }
  if (act === 'clear-mistakes') {
    modal({ ico: '🧹', title: '清空错词本？', body: '只清除错词列表，已获得的经验值和掌握度不受影响。', confirm: '清空', danger: true,
      onConfirm: () => { S.mistakes = []; save(); render(); toast('错词本已清空'); } }); return;
  }
  if (act === 'goal') { S.dailyGoal = Number(el.dataset.v); save(); render(); toast('每日目标已更新'); return; }
  if (act === 'toggle') { S[el.dataset.k] = !S[el.dataset.k]; save(); render(); return; }
  if (act === 'rate') { S.rate = Number(el.dataset.v); save(); render(); speak('hola', 'es', { id: 'es-u1-1' }); return; }
  if (act === 'del-unit') {
    const u = S.customUnits.find((x) => x.id === el.dataset.id);
    modal({ ico: '🗑️', title: `删除「${esc(u?.title || '')}」？`, body: '这个自定义单元会从课程地图移除，已获得的经验值保留。', confirm: '删除', danger: true,
      onConfirm: () => { S.customUnits = S.customUnits.filter((x) => x.id !== el.dataset.id); save(); render(); toast('已删除'); } }); return;
  }
  if (act === 'import-text') {
    try { parseImport($('#importText').value, '我的词库', $('#importLang')?.value || S.lang); } catch (err) { toast('导入失败：' + err.message); } return;
  }
  if (act === 'pick-file') { $('#fileInput').click(); return; }
  if (act === 'export') { exportProgress(); return; }
  if (act === 'import-progress') {
    const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.json';
    inp.onchange = () => {
      const f = inp.files[0]; if (!f) return;
      const fr = new FileReader();
      fr.onload = () => {
        try {
          const d = JSON.parse(fr.result), st = d.state || d;
          if (!st || typeof st !== 'object' || !('xp' in st)) throw new Error('不是有效的 Lingoloop 备份');
          S = Object.assign(defaultState(), st); save(); render(); toast('✅ 进度已恢复');
        } catch (err) { toast('导入失败：' + err.message); }
      };
      fr.readAsText(f);
    };
    inp.click(); return;
  }
  if (act === 'reset') {
    modal({ ico: '⚠️', title: '清空全部数据？', body: '经验值、连胜、所有语言的课程进度、错词本和自定义词库都会被删除，且无法撤销。建议先导出备份。', confirm: '确认清空', danger: true,
      onConfirm: () => { S = defaultState(); save(); render(); toast('已恢复初始状态'); } }); return;
  }
});
document.addEventListener('change', (e) => {
  if (e.target.id === 'defaultLang') { S.lang = e.target.value; save(); render(); toast('默认语言已设为 ' + langOf(S.lang).name); return; }
  if (e.target.id !== 'fileInput' || !e.target.files[0]) return;
  const f = e.target.files[0], fr = new FileReader();
  fr.onload = () => { try { parseImport(fr.result, f.name.replace(/\.[^.]+$/, ''), $('#importLang')?.value || S.lang); } catch (err) { toast('导入失败：' + err.message); } };
  fr.readAsText(f); e.target.value = '';
});
document.addEventListener('dragover', (e) => { const dz = e.target.closest('#dropzone'); if (!dz) return; e.preventDefault(); dz.classList.add('drag'); });
document.addEventListener('dragleave', (e) => { const dz = e.target.closest('#dropzone'); if (dz) dz.classList.remove('drag'); });
document.addEventListener('drop', (e) => {
  const dz = e.target.closest('#dropzone'); if (!dz) return;
  e.preventDefault(); dz.classList.remove('drag');
  const f = e.dataTransfer.files[0]; if (!f) return;
  const fr = new FileReader();
  fr.onload = () => { try { parseImport(fr.result, f.name.replace(/\.[^.]+$/, ''), $('#importLang')?.value || S.lang); } catch (err) { toast('导入失败：' + err.message); } };
  fr.readAsText(f);
});
document.addEventListener('input', (e) => {
  if (e.target.id !== 'wordSearch') return;
  const q = e.target.value.trim().toLowerCase(); let n = 0;
  $$('#wordTable tr').forEach((r) => { const hit = r.textContent.toLowerCase().includes(q); r.style.display = hit ? 'table-row' : 'none'; if (hit) n++; });
  const c = $('#wordCount'); if (c) c.textContent = `${n} 个词`;
});
document.addEventListener('keydown', (e) => {
  if (!Q || Q.out) return;
  if (e.key === 'Escape') { closeQuiz(); return; }
  const q = Q.questions[Q.idx];
  if (!Q.checked && /^[1-4]$/.test(e.key) && q.type !== 'sentence') {
    const i = Number(e.key) - 1; if (i < q.options.length) { Q.selected = i; renderQuiz(); } return;
  }
  if (e.key === 'Enter') {
    e.preventDefault();
    const can = q.type === 'sentence' ? Q.placed.length === q.chops.length : Q.selected !== null;
    if (Q.checked || can) doCheck();
  }
});
window.addEventListener('hashchange', render);
window.addEventListener('focus', () => { rollover(); if (!Q) renderChrome(); });
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
rollover(); render();
