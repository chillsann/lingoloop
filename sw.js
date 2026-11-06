/* Lingoloop Service Worker — 离线可用，不联网、不追踪 */
const CACHE = 'lingoloop-v5';
const CORE = [
  './', './index.html', './styles.css', './app.js',
  './data/words.js', './data/audio/manifest.js',
  './manifest.json', './icon.svg',
  './icon-192.png', './icon-512.png'
];

/* 安装时预缓存全部内置发音 mp3（432 条：216 单词 + 216 整句例句）。
   微信内置浏览器首次安装可能较慢，因此分批、并发受限、单个失败不影响安装；
   没缓存到的音频，运行时 fetch 会按需补缓存，不影响使用。 */
async function precacheAudio(cache) {
  try {
    const res = await fetch('./data/audio/manifest.js');
    const txt = await res.text();
    const m = txt.match(/window\.LINGO_AUDIO\s*=\s*(\[[^\]]*\])/);
    const ids = m ? JSON.parse(m[1]) : [];
    const BATCH = 12;
    for (let i = 0; i < ids.length; i += BATCH) {
      await Promise.all(ids.slice(i, i + BATCH).map((id) =>
        cache.add('./data/audio/' + encodeURIComponent(id) + '.mp3').catch(() => {})
      ));
    }
  } catch { /* 清单不可读时跳过，运行时仍会按需缓存 */ }
}

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(CORE);
    await precacheAudio(c);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
