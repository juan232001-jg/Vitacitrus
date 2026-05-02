const CACHE = 'vitacitrus-v1';
const ASSETS = [
  '/',
  './index.html',
  './css/stayls.css',
  './js/main.js',
  './images/Producto.jpg',
  './images/botvita.png',
  './images/LimonadaNatural.png',
  './images/CevicheCítrico.png',
  './images/MojitoVerde.png',
  './images/AderezoCitrico.png',
  './images/Marinado .png',
  './images/TartadeLima.png',
  './images/natural.png',
  './images/vitaminac.png',
  './images/sostenible.png',
  './images/versatil.png',
];

// Instalar y cachear assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activar y limpiar caches viejos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Estrategia: Cache first, luego network
self.addEventListener('fetch', e => {
  // Solo cachear GET requests
  if (e.request.method !== 'GET') return;
  // No cachear WhatsApp ni APIs externas
  if (e.request.url.includes('wa.me') || e.request.url.includes('fonts.googleapis')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        // Cachear nuevas respuestas exitosas
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback
        if (e.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
