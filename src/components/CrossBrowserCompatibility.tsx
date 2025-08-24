import { useEffect } from 'react';

export const CrossBrowserCompatibility = () => {
  useEffect(() => {
    // Safari-specific compatibility fixes
    const initializeSafariCompatibility = () => {
      // Fix Safari's aggressive caching that can cause stale states
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => {
            if (registration.scope.includes(window.location.origin)) {
              registration.update();
            }
          });
        });
      }

      // Force Safari to respect viewport meta tag
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta && /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }

      // Safari font rendering fix
      document.documentElement.style.setProperty('-webkit-font-smoothing', 'antialiased');
      document.documentElement.style.setProperty('-moz-osx-font-smoothing', 'grayscale');
    };

    // Cross-browser CSS custom properties fallback
    const initializeCSSFallbacks = () => {
      // Check for CSS custom properties support
      if (!window.CSS || !CSS.supports('color', 'var(--fake-var)')) {
        console.warn('CSS custom properties not supported, applying fallbacks');
        // Apply fallback styles for older browsers
        const style = document.createElement('style');
        style.textContent = `
          :root {
            color: #1a1a1a;
            background-color: #ffffff;
          }
          [data-theme="dark"] {
            color: #ffffff;
            background-color: #1a1a1a;
          }
        `;
        document.head.appendChild(style);
      }
    };

    // Initialize modern JavaScript feature detection
    const initializeJSCompatibility = () => {
      // Intersection Observer polyfill for older browsers
      if (!('IntersectionObserver' in window)) {
        console.log('Loading IntersectionObserver polyfill');
        const script = document.createElement('script');
        script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
        script.async = true;
        document.head.appendChild(script);
      }

      // ResizeObserver polyfill
      if (!('ResizeObserver' in window)) {
        console.log('Loading ResizeObserver polyfill');
        const script = document.createElement('script');
        script.src = 'https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver';
        script.async = true;
        document.head.appendChild(script);
      }

      // Web Animations API polyfill for Safari < 14
      if (!('animate' in document.createElement('div'))) {
        console.log('Loading Web Animations polyfill');
        const script = document.createElement('script');
        script.src = 'https://polyfill.io/v3/polyfill.min.js?features=web-animations';
        script.async = true;
        document.head.appendChild(script);
      }
    };

    // Safari-specific rendering optimization
    const optimizeSafariRendering = () => {
      if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
        // Force hardware acceleration for better performance
        document.documentElement.style.transform = 'translateZ(0)';
        
        // Fix Safari's transform3d bug
        const elements = document.querySelectorAll('[style*="transform"]');
        elements.forEach(el => {
          const element = el as HTMLElement;
          const transform = element.style.transform;
          if (transform && !transform.includes('translateZ')) {
            element.style.transform = transform + ' translateZ(0)';
          }
        });

        // Safari back/forward cache fix
        window.addEventListener('pageshow', (event) => {
          if (event.persisted) {
            window.location.reload();
          }
        });
      }
    };

    // Cross-browser event handling
    const initializeCrossBrowserEvents = () => {
      // Passive event listeners for better scroll performance
      const supportsPassive = (() => {
        let support = false;
        try {
          window.addEventListener('test', () => {}, {
            get passive() {
              support = true;
              return false;
            }
          });
        } catch(e) {}
        return support;
      })();

      if (supportsPassive) {
        document.addEventListener('touchstart', () => {}, { passive: true });
        document.addEventListener('touchmove', () => {}, { passive: true });
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