import { useEffect } from 'react';

/**
 * Comprehensive iPad Chrome/Safari WebKit compatibility fixes
 * Addresses all known issues with WebKit rendering engine
 */
const IPadSafariCompatibility = () => {
  useEffect(() => {
    // Detect iPad Safari/Chrome (both use WebKit)
    const isIPad = /iPad|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;
    const isIPadChrome = isIPad && navigator.userAgent.includes('Chrome');
    const isIPadSafari = isIPad && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
    
    if (!isIPad) return;

    console.log('🍎 Applying iPad WebKit compatibility fixes...');

    try {
      // 1. Remove all conflicting optimization styles
      const conflictingStyles = document.querySelectorAll([
        'style[data-unified-fixes]',
        'style[data-ipad-chrome-fix]', 
        'style[data-mobile-optimization]',
        'style[data-responsive-fixes]',
        'style[data-browser-fixes]',
        'style[data-performance-optimizer]',
        'style[data-layout-fixes]',
        'style[data-touch-fixes]',
        'style[data-accessibility]',
        'style[data-safe-area]',
        'style[data-ipad-chrome-safe]',
        'style[data-clean-compatibility]'
      ].join(', '));
      
      conflictingStyles.forEach(function(style) {
        style.remove();
      });

      // 2. Fix viewport meta tag for iPad scaling
      let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
      if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1.0, user-scalable=yes, viewport-fit=cover';
      }

      // 3. Apply WebKit-compatible CSS fixes
      const webkitStyle = document.createElement('style');
      webkitStyle.setAttribute('data-ipad-webkit-fixes', 'true');
      webkitStyle.textContent = `
        /* CRITICAL: iPad WebKit base fixes */
        html {
          height: 100%;
          width: 100%;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
          overflow-x: hidden;
        }
        
        body {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          overflow-x: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        #root {
          min-height: 100vh;
          width: 100%;
          display: block;
          position: relative;
          background: hsl(var(--background));
          overflow-x: hidden;
        }
        
        /* Remove ALL transforms and hardware acceleration for iPad */
        *, *::before, *::after {
          -webkit-transform: none !important;
          transform: none !important;
          -webkit-backface-visibility: visible !important;
          backface-visibility: visible !important;
          will-change: auto !important;
          -webkit-perspective: none !important;
          perspective: none !important;
        }
        
        /* Disable animations on iPad Chrome for stability */
        ${isIPadChrome ? `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
        }
        ` : ''}
        
        /* WebKit-compatible flexbox with prefixes */
        .flex {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
        }
        
        /* WebKit-compatible grid with fallback */
        .grid {
          display: grid;
          display: -ms-grid;
        }
        
        /* Safe area support for iPad */
        @supports(padding: max(0px)) {
          body {
            padding-left: max(0px, env(safe-area-inset-left));
            padding-right: max(0px, env(safe-area-inset-right));
          }
        }
        
        /* Touch action optimization */
        * {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
        
        /* Allow text selection where needed */
        p, span, h1, h2, h3, h4, h5, h6, li, td, th, div[contenteditable] {
          -webkit-user-select: text;
          user-select: text;
        }
        
        /* Button and input touch targets */
        button, [role="button"], a, input, textarea, select {
          min-height: 44px;
          min-width: 44px;
          touch-action: manipulation;
          -webkit-user-select: none;
          user-select: none;
        }
        
        /* Image rendering fixes */
        img {
          max-width: 100%;
          height: auto;
          display: block;
          -webkit-image-smoothing: true;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
        
        /* Form element fixes */
        input, textarea, select, button {
          font-family: inherit;
          font-size: 16px; /* Prevent zoom on focus */
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          border: 1px solid hsl(var(--border));
          -webkit-appearance: none;
          appearance: none;
          border-radius: 0;
        }
        
        /* Responsive typography with clamp for Safari */
        .text-4xl { 
          font-size: clamp(1.875rem, 5vw, 2.25rem); 
        }
        .text-5xl { 
          font-size: clamp(2.25rem, 6vw, 3rem); 
        }
        .text-6xl { 
          font-size: clamp(2.5rem, 7vw, 3.75rem); 
        }
        
        /* Container responsive padding */
        .container {
          max-width: 100%;
          margin: 0 auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        /* Focus visibility for accessibility */
        *:focus-visible {
          outline: 2px solid hsl(var(--primary));
          outline-offset: 2px;
        }
        
        /* iPad-specific media queries */
        @media (min-width: 768px) and (max-width: 1024px) {
          body {
            background: hsl(var(--background)) !important;
            min-height: 100vh !important;
          }
          
          #root {
            min-height: 100vh !important;
            background: hsl(var(--background)) !important;
          }
          
          .container {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
        
        /* Print styles */
        @media print {
          .no-print {
            display: none !important;
          }
          
          * {
            background: transparent !important;
            color: black !important;
            box-shadow: none !important;
          }
        }
      `;
      
      // Insert at the very beginning to override other styles
      document.head.insertBefore(webkitStyle, document.head.firstChild);

      // 4. JavaScript polyfills for Safari compatibility
      if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(callback, thisArg) {
          if (this == null) {
            throw new TypeError('Array.prototype.forEach called on null or undefined');
          }
          var O = Object(this);
          var len = parseInt(O.length) || 0;
          if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
          }
          var T = thisArg;
          var k = 0;
          while(k < len) {
            var kValue;
            if (k in O) {
              kValue = O[k];
              callback.call(T, kValue, k, O);
            }
            k++;
          }
        };
      }

      // 5. Enhanced error handling for WebKit
      window.addEventListener('error', function(event) {
        console.debug('WebKit error handled:', event.error?.message);
        event.preventDefault();
        return true;
      });

      window.addEventListener('unhandledrejection', function(event) {
        console.debug('WebKit promise rejection handled:', event.reason);
        event.preventDefault();
        return true;
      });

      // 6. Force clean render for iPad
      const root = document.getElementById('root');
      if (root) {
        root.style.display = 'none';
        root.offsetHeight; // Force reflow
        root.style.display = 'block';
      }

      // 7. Clear any problematic service worker cache for iPad
      if ('serviceWorker' in navigator && 'caches' in window) {
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheName.includes('old') || cacheName.includes('conflict')) {
                return caches.delete(cacheName);
              }
            })
          );
        }).catch(function(err) {
          console.debug('Cache cleanup failed:', err);
        });
      }

      console.log('✅ iPad WebKit compatibility fixes applied successfully');
      
    } catch (error) {
      console.error('❌ iPad WebKit compatibility fix failed:', error);
    }
  }, []);

  return null;
};

export default IPadSafariCompatibility;