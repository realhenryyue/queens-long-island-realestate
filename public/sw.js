// Enhanced Service Worker for Henry Yue Real Estate
// NYC Real Estate AI Investment Analysis Expert - Enterprise Performance

const CACHE_NAME = 'realhenryyue-v2.1-enterprise';
const OFFLINE_URL = '/index.html';

// Critical resources for immediate caching
const CRITICAL_CACHE = [
  '/',
  '/index.html',
  '/en',
  '/zh',
  '/assets/agent-photo.jpg',
  '/assets/queens-skyline.jpg',
  '/lovable-uploads/37df6745-4c04-4216-b503-10af6f8c13aa.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/favicon.ico'
];

// Extended cache for performance
const EXTENDED_CACHE = [
  '/lovable-uploads/7822d7f2-39af-4ce6-9499-31e488327974.png',
  '/lovable-uploads/913b3b6c-94b4-41bb-843a-d28cd0eed1a4.png',
  '/lovable-uploads/e70886eb-1687-4063-b5fa-bd44be25b6e2.png',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  '/ads.txt'
];

// Install event - cache critical resources immediately
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache critical resources first
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(CRITICAL_CACHE.map(url => new Request(url, {
          credentials: 'same-origin'
        })));
      }),
      // Cache extended resources
      caches.open(CACHE_NAME + '-extended').then(cache => {
        return cache.addAll(EXTENDED_CACHE.map(url => new Request(url, {
          credentials: 'same-origin'
        })));
      })
    ]).catch(err => {
      console.log('Cache install failed:', err);
    })
  );
  self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.startsWith('https://fonts.googleapis.com') &&
      !event.request.url.startsWith('https://fonts.gstatic.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Clone the request for caching
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone response for caching
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});