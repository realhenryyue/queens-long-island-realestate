// 应急 Service Worker - 完全禁用缓存
console.log('Emergency Service Worker: All caching disabled');

// 立即清除所有现有缓存
self.addEventListener('install', event => {
  console.log('SW: Install - clearing all caches');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('SW: Activate - clearing all caches');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
  self.clients.claim();
});

// 直接从网络获取，不使用任何缓存
self.addEventListener('fetch', event => {
  console.log('SW: Fetch (no cache):', event.request.url);
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .catch(error => {
        console.error('SW: Fetch failed:', error);
        return new Response('Network error', { status: 503 });
      })
  );
});