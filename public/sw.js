// Henry Yue Real Estate — Service Worker
// Strategy:
//  - Network-first for HTML navigations (so a new deploy is picked up immediately
//    and Chrome users never get a blank screen from a cached index.html that
//    references stale hashed JS bundle filenames).
//  - Cache-first for static assets (images, fonts, css, js) with background refresh.
//  - On activate, purge ALL old caches AND any cached HTML documents.

const CACHE_VERSION = 'v7.0-2026-05-06';
const STATIC_CACHE = `realhenryyue-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `realhenryyue-runtime-${CACHE_VERSION}`;
const OFFLINE_URL = '/index.html';

const PRECACHE_ASSETS = [
  '/assets/agent-photo-256.webp',
  '/assets/agent-photo-512.webp',
  '/assets/queens-skyline-640.webp',
  '/assets/queens-skyline-1024.webp',
  '/lovable-uploads/37df6745-4c04-4216-b503-10af6f8c13aa.webp',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/favicon-96x96.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          cache.add(new Request(url, { credentials: 'same-origin', cache: 'reload' }))
            .catch(() => undefined)
        )
      )
    )
  );
  // Take over immediately so old SW versions stop serving stale HTML.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // 1. Delete every cache that is not the current version.
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((k) => k !== STATIC_CACHE && k !== RUNTIME_CACHE)
        .map((k) => caches.delete(k))
    );
    // 2. Defensive: also purge any HTML documents that may still be sitting in
    //    current caches from a previous SW version.
    for (const cacheName of [STATIC_CACHE, RUNTIME_CACHE]) {
      try {
        const cache = await caches.open(cacheName);
        const reqs = await cache.keys();
        await Promise.all(
          reqs.map(async (req) => {
            if (req.mode === 'navigate' || req.destination === 'document' || req.url.endsWith('.html')) {
              await cache.delete(req);
            }
          })
        );
      } catch (_) { /* ignore */ }
    }
    await self.clients.claim();
  })());
});

// One-time message hook so the page can ask the SW to clear everything.
self.addEventListener('message', (event) => {
  if (event.data === 'CLEAR_CACHES') {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
    );
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GET.
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Never intercept cross-origin requests except Google Fonts (which we want to cache).
  const sameOrigin = url.origin === self.location.origin;
  const isGoogleFont = url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com';
  if (!sameOrigin && !isGoogleFont) return;

  // Bypass SW for the static SEO landing pages — always fetch fresh.
  if (sameOrigin && /^\/(en|zh)(\/.*)?$/.test(url.pathname)) return;

  // HTML navigations -> network-first, fall back to cache, then offline page.
  const isNavigation = req.mode === 'navigate' ||
    (req.destination === '' && req.headers.get('accept')?.includes('text/html'));

  if (isNavigation) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: 'no-store' });
        // Do NOT cache navigation responses — index.html references hashed
        // bundle filenames that change on every deploy. Caching it causes
        // blank screens after deploy because the cached HTML asks for JS
        // files that no longer exist on the server.
        return fresh;
      } catch (_) {
        const cached = await caches.match(req) || await caches.match(OFFLINE_URL);
        return cached || new Response(
          '<!doctype html><meta charset="utf-8"><title>Offline</title><h1>You are offline</h1>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' }, status: 503 }
        );
      }
    })());
    return;
  }

  // Static assets -> cache-first with background refresh (stale-while-revalidate).
  event.respondWith((async () => {
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(req);
    const networkPromise = fetch(req).then((res) => {
      if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
        // Clone before consuming.
        cache.put(req, res.clone()).catch(() => undefined);
      }
      return res;
    }).catch(() => undefined);
    return cached || networkPromise || fetch(req);
  })());
});
