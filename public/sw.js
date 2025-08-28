// Enhanced Service Worker for Henry Yue Real Estate - Safari Compatible
// NYC Real Estate AI Investment Analysis Expert - Cross-Browser Performance

const CACHE_NAME = 'realhenryyue-v4.0-ipad-webkit-fix';
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

// Install event - cache critical resources with Safari error handling
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache critical resources first with enhanced error handling
      caches.open(CACHE_NAME).then(cache => {
        return Promise.allSettled(CRITICAL_CACHE.map(url => {
          const request = new Request(url, {
            credentials: 'same-origin',
            cache: 'default'
          });
          return cache.add(request).catch(err => {
            console.warn(`Failed to cache ${url}:`, err);
            return null;
          });
        }));
      }),
      // Cache extended resources with fallback
      caches.open(CACHE_NAME + '-extended').then(cache => {
        return Promise.allSettled(EXTENDED_CACHE.map(url => {
          const request = new Request(url, {
            credentials: 'same-origin',
            cache: 'default'
          });
          return cache.add(request).catch(err => {
            console.warn(`Failed to cache extended ${url}:`, err);
            return null;
          });
        }));
      })
    ]).catch(err => {
      console.error('Cache install failed:', err);
    })
  );
  self.skipWaiting();
});

// Fetch event - iPad WebKit compatible caching
self.addEventListener('fetch', event => {
  // Enhanced iPad Safari compatibility - skip problematic requests
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.startsWith('https://fonts.googleapis.com') &&
      !event.request.url.startsWith('https://fonts.gstatic.com')) {
    return;
  }
  
  // Skip requests that cause issues on iPad WebKit
  if (event.request.url.includes('chrome-extension') || 
      event.request.url.includes('moz-extension') ||
      event.request.method !== 'GET') {
    return;
  }

  // Enhanced Safari-compatible navigation handling
  if (event.request.mode === 'navigate') {
    event.respondWith(
      Promise.resolve()
        .then(() => caches.match(event.request))
        .then(response => {
          if (response) {
            return response;
          }
          
          return fetch(event.request)
            .then(response => {
              // Ensure we have a valid response
              if (!response || response.status !== 200) {
                return response;
              }
              
              // Clone and cache navigation responses with Safari error handling
              try {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, responseToCache))
                  .catch(err => console.warn('Cache put failed:', err));
              } catch (err) {
                console.warn('Response clone failed:', err);
              }
              
              return response;
            })
            .catch(err => {
              console.warn('Navigation fetch failed:', err);
              // Fallback to offline page for navigation failures
              return caches.match(OFFLINE_URL).catch(() => {
                // Final fallback - return basic HTML
                return new Response('<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1></body></html>', {
                  headers: { 'Content-Type': 'text/html' }
                });
              });
            });
        })
        .catch(err => {
          console.error('Navigation handler failed:', err);
          return new Response('<!DOCTYPE html><html><head><title>Error</title></head><body><h1>Service Worker Error</h1></body></html>', {
            headers: { 'Content-Type': 'text/html' }
          });
        })
    );
    return;
  }

  // Enhanced Safari-compatible caching strategy for other requests
  event.respondWith(
    Promise.resolve()
      .then(() => caches.match(event.request))
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Clone the request for caching with error handling
        let fetchRequest;
        try {
          fetchRequest = event.request.clone();
        } catch (err) {
          console.warn('Request clone failed:', err);
          fetchRequest = event.request;
        }
        
        return fetch(fetchRequest)
          .then(response => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone response for caching with enhanced Safari error handling
            try {
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then(cache => {
                  try {
                    // Simplified caching for better Safari compatibility
                    cache.put(event.request, responseToCache);
                  } catch (cacheErr) {
                    console.warn('Cache put operation failed:', cacheErr);
                  }
                })
                .catch(cacheOpenErr => {
                  console.warn('Cache open failed:', cacheOpenErr);
                });
            } catch (cloneErr) {
              console.warn('Response clone failed:', cloneErr);
            }
            
            return response;
          })
          .catch(error => {
            console.warn('Fetch failed for', event.request.url, error);
            // Return offline page for critical failures
            if (event.request.destination === 'document') {
              return caches.match(OFFLINE_URL).catch(() => {
                return new Response('<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1></body></html>', {
                  headers: { 'Content-Type': 'text/html' }
                });
              });
            }
            return Promise.reject(error);
          });
      })
      .catch(err => {
        console.error('Cache match failed:', err);
        return fetch(event.request).catch(() => {
          return new Response('Network error', { status: 503 });
        });
      })
  );
});

// Activate event - clean up old caches with Safari compatibility
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.resolve()
      .then(() => caches.keys())
      .then(cacheNames => {
        const deletePromises = cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME && cacheName !== CACHE_NAME + '-extended')
          .map(cacheName => {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName).catch(err => {
              console.warn('Failed to delete cache:', cacheName, err);
              return false;
            });
          });
        
        return Promise.allSettled(deletePromises);
      })
      .then(() => {
        // Safari-specific client claim with error handling
        try {
          return self.clients.claim();
        } catch (err) {
          console.warn('Client claim failed:', err);
          return Promise.resolve();
        }
      })
      .catch(err => {
        console.error('Activation failed:', err);
      })
  );
});