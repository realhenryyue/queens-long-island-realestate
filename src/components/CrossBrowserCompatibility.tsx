import { useEffect } from 'react';

export const CrossBrowserCompatibility = () => {
  useEffect(() => {
    // Enhanced Safari-specific compatibility fixes
    const initializeSafariCompatibility = () => {
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      // Force Safari to respect viewport meta tag with enhanced settings
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta && (isSafari || isIOS)) {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover');
      }

      // Enhanced Safari font rendering and display fixes
      if (isSafari || isIOS) {
        document.documentElement.style.setProperty('-webkit-font-smoothing', 'antialiased');
        document.documentElement.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
        document.documentElement.style.setProperty('-webkit-text-size-adjust', '100%');
        document.documentElement.style.setProperty('-webkit-overflow-scrolling', 'touch');
        
        // Fix Safari's rendering of flexbox and grid layouts
        document.documentElement.style.setProperty('-webkit-backface-visibility', 'hidden');
        document.documentElement.style.setProperty('backface-visibility', 'hidden');
        
        // Fix Safari's CSS variable support issues
        document.documentElement.style.setProperty('--webkit-appearance', 'none');
      }

      // Service Worker compatibility
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => {
            if (registration.scope.includes(window.location.origin)) {
              registration.update();
            }
          });
        });
      }
    };

    // Enhanced cross-browser CSS compatibility
    const initializeCSSFallbacks = () => {
      // Check for CSS custom properties support and apply comprehensive fallbacks
      if (!window.CSS || !CSS.supports('color', 'var(--fake-var)')) {
        console.warn('CSS custom properties not supported, applying comprehensive fallbacks');
        const style = document.createElement('style');
        style.textContent = `
          :root {
            color: #334155;
            background-color: #ffffff;
          }
          [data-theme="dark"] {
            color: #ffffff;
            background-color: #0f172a;
          }
          /* Flexbox fallbacks for older browsers */
          .flex { display: -webkit-box; display: -ms-flexbox; display: flex; }
          .flex-col { -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column; }
          .items-center { -webkit-box-align: center; -ms-flex-align: center; align-items: center; }
          .justify-center { -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; }
          /* Grid fallbacks */
          .grid { display: -ms-grid; display: grid; }
          /* Transform fallbacks */
          .transform { -webkit-transform: translateZ(0); transform: translateZ(0); }
        `;
        document.head.appendChild(style);
      }

      // Enhanced CSS feature detection and polyfills
      const features = [
        { property: 'display', value: 'grid', fallback: 'block' },
        { property: 'display', value: 'flex', fallback: 'block' },
        { property: 'position', value: 'sticky', fallback: 'relative' }
      ];

      features.forEach(({ property, value, fallback }) => {
        if (!CSS.supports(property, value)) {
          console.warn(`${property}: ${value} not supported, using ${fallback}`);
        }
      });
    };

    // Enhanced JavaScript compatibility and polyfills
    const initializeJSCompatibility = () => {
      const polyfillsNeeded = [];

      // Check for essential modern features
      if (!('IntersectionObserver' in window)) {
        polyfillsNeeded.push('IntersectionObserver');
      }
      if (!('ResizeObserver' in window)) {
        polyfillsNeeded.push('ResizeObserver');
      }
      if (!('animate' in document.createElement('div'))) {
        polyfillsNeeded.push('web-animations');
      }
      if (!('fetch' in window)) {
        polyfillsNeeded.push('fetch');
      }
      if (!Array.prototype.includes) {
        polyfillsNeeded.push('Array.prototype.includes');
      }
      if (!Object.assign) {
        polyfillsNeeded.push('Object.assign');
      }
      if (!('Promise' in window)) {
        polyfillsNeeded.push('Promise');
      }

      // Load polyfills efficiently in one request
      if (polyfillsNeeded.length > 0) {
        console.log('Loading polyfills:', polyfillsNeeded.join(', '));
        const script = document.createElement('script');
        script.src = `https://polyfill.io/v3/polyfill.min.js?features=${polyfillsNeeded.join(',')}`;
        script.async = true;
        script.onload = () => console.log('Polyfills loaded successfully');
        script.onerror = () => console.warn('Failed to load polyfills');
        document.head.appendChild(script);
      }

      // Fix Safari's strict mode issues
      if (typeof window !== 'undefined') {
        // Ensure console exists for older browsers
        if (!window.console) {
          window.console = {
            log: () => {},
            warn: () => {},
            error: () => {}
          } as any;
        }
      }
    };

    // Enhanced Safari and WebKit rendering optimization
    const optimizeSafariRendering = () => {
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      const isWebKit = /WebKit/.test(navigator.userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      if (isSafari || isWebKit || isIOS) {
        // Force hardware acceleration for better performance
        document.documentElement.style.transform = 'translateZ(0)';
        document.documentElement.style.setProperty('will-change', 'transform');
        
        // Fix Safari's transform3d and layout bugs
        const optimizeElement = (el: Element) => {
          const element = el as HTMLElement;
          const computedStyle = window.getComputedStyle(element);
          
          // Fix transform issues
          if (computedStyle.transform && computedStyle.transform !== 'none') {
            if (!computedStyle.transform.includes('translateZ')) {
              element.style.transform = computedStyle.transform + ' translateZ(0)';
            }
          }
          
          // Fix Safari's flexbox bugs
          if (computedStyle.display === 'flex') {
            element.style.setProperty('-webkit-flex-wrap', computedStyle.flexWrap);
            element.style.setProperty('-webkit-justify-content', computedStyle.justifyContent);
            element.style.setProperty('-webkit-align-items', computedStyle.alignItems);
          }
        };

        // Apply optimizations to existing elements
        document.querySelectorAll('*').forEach(optimizeElement);
        
        // Observer for new elements
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                optimizeElement(node as Element);
              }
            });
          });
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Safari back/forward cache fix with enhanced handling
        window.addEventListener('pageshow', (event) => {
          if (event.persisted) {
            // Clear any stale states before reload
            sessionStorage.clear();
            window.location.reload();
          }
        });

        // Fix Safari's aggressive memory management
        window.addEventListener('pagehide', () => {
          observer.disconnect();
        });
      }
    };

    // Enhanced cross-browser event handling
    const initializeCrossBrowserEvents = () => {
      // Comprehensive passive event listener support detection
      const supportsPassive = (() => {
        let support = false;
        try {
          const opts = Object.defineProperty({}, 'passive', {
            get() {
              support = true;
              return false;
            }
          });
          window.addEventListener('testPassive', () => {}, opts);
          window.removeEventListener('testPassive', () => {}, opts);
        } catch(e) {
          support = false;
        }
        return support;
      })();

      // Apply passive listeners for better performance
      const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'touchend', 'wheel'];
      passiveEvents.forEach(eventType => {
        if (supportsPassive) {
          document.addEventListener(eventType, () => {}, { passive: true });
        }
      });

      // Fix Safari's touch event issues
      if (/Safari/.test(navigator.userAgent) || /iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.addEventListener('touchstart', () => {}, { passive: true });
        document.addEventListener('touchmove', (e) => {
          // Prevent zoom on double-tap while allowing scrolling
          if (e.touches.length > 1) {
            e.preventDefault();
          }
        }, { passive: false });
      }

      // Fix click events on iOS
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.addEventListener('click', (e) => {
          // Ensure click events work properly on iOS
          const target = e.target as HTMLElement;
          if (target && !target.onclick) {
            target.style.cursor = 'pointer';
          }
        });
      }
    };

    // Initialize all compatibility fixes
    initializeSafariCompatibility();
    initializeCSSFallbacks();
    initializeJSCompatibility();
    optimizeSafariRendering();
    initializeCrossBrowserEvents();

    // Enhanced error reporting
    window.addEventListener('error', (event) => {
      console.error('Global error caught:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', {
        reason: event.reason,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
    });

  }, []);

  return null;
};