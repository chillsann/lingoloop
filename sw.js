/* Lingoloop Service Worker — 离线可用，不联网、不追踪 */
const CACHE = 'lingoloop-v6';
const CORE = [
  './', './index.html', './styles.css', './app.js',
  './data/words.js', './data/audio/manifest.js',
  './manifest.json', './icon.svg',
  './icon-192.png', './icon-512.png'
];

/* 只预缓存 10 个核心文件，保证 install 秒级完成、新版本立刻接管。
   不在安装时批量预缓存 432 个发音 mp3：微信 / 移动网络下几百个并发请求会
   长时间占满连接、拖慢首屏，甚至让新 SW 迟迟装不上，用户会一直读到旧缓存。
   音频改为「按需缓存」——点过一次就写入缓存，之后离线照常播放。 */
self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(CORE);
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
