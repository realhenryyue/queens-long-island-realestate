import { useEffect } from 'react';

const ProgressiveWebAppOptimization = () => {
  useEffect(() => {
    // Progressive Web App Enhancements
    const enhancePWAFeatures = () => {
      // Service Worker registration with enhanced compatibility
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none'
          }).then((registration) => {
            // Enhanced update handling
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // Show update available notification
                    if (process.env.NODE_ENV === 'development') {
                      console.log('New content available, refresh to update');
                    }
                  }
                });
              }
            });
          }).catch(() => {
            // Silent fail for browsers that don't support service workers
          });
        });
      }

      // Web App Manifest enhancements
      const manifestLink = document.querySelector('link[rel="manifest"]');
      if (!manifestLink) {
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = '/manifest.json';
        document.head.appendChild(link);
      }
    };

    // Advanced Network Detection
    const enhanceNetworkHandling = () => {
      // Network status detection
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        
        if (connection) {
          const handleConnectionChange = () => {
            const connectionType = connection.effectiveType;
            
            // Optimize based on connection speed
            if (connectionType === 'slow-2g' || connectionType === '2g') {
              // Reduce animations and image quality for slow connections
              const style = document.createElement('style');
              style.textContent = `
                *, *::before, *::after {
                  animation-duration: 0.01ms !important;
                  transition-duration: 0.01ms !important;
                }
                img {
                  image-rendering: -webkit-optimize-contrast;
                }
              `;
              document.head.appendChild(style);
            }
          };
          
          connection.addEventListener('change', handleConnectionChange);
          handleConnectionChange(); // Initial check
        }
      }

      // Online/offline status
      const handleOnlineStatus = () => {
        const isOnline = navigator.onLine;
        document.documentElement.classList.toggle('offline', !isOnline);
        
        if (!isOnline) {
          // Show offline indicator
          const offlineStyle = document.createElement('style');
          offlineStyle.textContent = `
            .offline::before {
              content: 'Offline Mode';
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              background: #f59e0b;
              color: white;
              text-align: center;
              padding: 0.5rem;
              z-index: 9999;
              font-size: 0.875rem;
            }
          `;
          document.head.appendChild(offlineStyle);
        }
      };
      
      window.addEventListener('online', handleOnlineStatus);
      window.addEventListener('offline', handleOnlineStatus);
      handleOnlineStatus(); // Initial check
    };

    // Advanced Touch and Gesture Support
    const enhanceTouchInteractions = () => {
      // Detect touch capability
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      if (isTouchDevice) {
        document.documentElement.classList.add('touch-device');
        
        const style = document.createElement('style');
        style.textContent = `
          .touch-device {
            /* Enhanced touch interactions */
            touch-action: manipulation;
          }
          
          .touch-device button,
          .touch-device .btn,
          .touch-device [role="button"] {
            /* Larger touch targets */
            min-height: 48px;
            min-width: 48px;
            padding: 0.75rem;
          }
          
          /* Remove hover effects on touch devices */
          .touch-device .hover\\:scale-105:hover {
            transform: none;
          }
          
          .touch-device .hover\\:bg-primary\\/90:hover {
            background-color: hsl(var(--primary));
          }
          
          /* Enhanced focus for touch navigation */
          .touch-device *:focus {
            outline: 3px solid hsl(var(--accent));
            outline-offset: 3px;
          }
        `;
        document.head.appendChild(style);
      }
    };

    // Browser Feature Detection and Polyfills
    const loadPolyfillsIfNeeded = () => {
      const features = {
        IntersectionObserver: 'IntersectionObserver' in window,
        ResizeObserver: 'ResizeObserver' in window,
        customElements: 'customElements' in window,
        Promise: 'Promise' in window,
        fetch: 'fetch' in window
      };

      const missingFeatures = Object.entries(features)
        .filter(([, supported]) => !supported)
        .map(([feature]) => feature);

      if (missingFeatures.length > 0) {
        // Load polyfills for missing features
        const script = document.createElement('script');
        script.src = `https://polyfill.io/v3/polyfill.min.js?features=${missingFeatures.join(',')}`;
        script.async = true;
        document.head.appendChild(script);
      }
    };

    // Memory and Performance Monitoring
    const monitorPerformance = () => {
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        
        // Monitor memory usage
        const checkMemory = () => {
          const usedMemory = memInfo.usedJSHeapSize / memInfo.totalJSHeapSize;
          
          if (usedMemory > 0.8) {
            // High memory usage - reduce animations and features
            const style = document.createElement('style');
            style.textContent = `
              * {
                animation: none !important;
                transition: none !important;
              }
            `;
            document.head.appendChild(style);
          }
        };
        
        setInterval(checkMemory, 30000); // Check every 30 seconds
      }

      // Performance observer for monitoring
      if ('PerformanceObserver' in window && process.env.NODE_ENV === 'development') {
        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
              }
              if (entry.entryType === 'layout-shift') {
                // Type assertion for layout shift entry
                const layoutShiftEntry = entry as any;
                console.log('CLS:', layoutShiftEntry.value);
              }
            }
          });
          
          observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] });
        } catch (e) {
          // Silently fail if not supported
        }
      }
    };

    // Dark Mode System Integration
    const enhanceDarkMode = () => {
      // Respect system dark mode preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleDarkModeChange = (e: MediaQueryListEvent) => {
        const prefersDark = e.matches;
        document.documentElement.classList.toggle('dark', prefersDark);
        
        // Update theme-color meta tag
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
          themeColorMeta.setAttribute('content', prefersDark ? '#1e40af' : '#2563eb');
        }
      };
      
      mediaQuery.addListener(handleDarkModeChange);
      handleDarkModeChange({ matches: mediaQuery.matches } as MediaQueryListEvent);
    };

    // Initialize all enhancements
    enhancePWAFeatures();
    enhanceNetworkHandling();
    enhanceTouchInteractions();
    loadPolyfillsIfNeeded();
    monitorPerformance();
    enhanceDarkMode();

    return () => {
      // Cleanup
      window.removeEventListener('online', () => {});
      window.removeEventListener('offline', () => {});
    };
  }, []);

  return null; // This component only handles PWA optimizations
};

export default ProgressiveWebAppOptimization;