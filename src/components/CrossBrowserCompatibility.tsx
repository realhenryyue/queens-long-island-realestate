import { useEffect } from 'react';

const CrossBrowserCompatibility = () => {
  useEffect(() => {
    // Enhanced Browser Detection
    const detectBrowser = () => {
      const userAgent = navigator.userAgent;
      const browsers = {
        isIE: /MSIE|Trident/.test(userAgent),
        isEdge: /Edge/.test(userAgent),
        isFirefox: /Firefox/.test(userAgent),
        isChrome: /Chrome/.test(userAgent) && !/Edge/.test(userAgent),
        isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
        isIOS: /iPad|iPhone|iPod/.test(userAgent),
        isAndroid: /Android/.test(userAgent),
        isMobile: /Mobi|Android/i.test(userAgent)
      };
      
      // Add browser classes to document
      Object.entries(browsers).forEach(([key, value]) => {
        if (value) {
          document.documentElement.classList.add(key.toLowerCase().replace('is', 'browser-'));
        }
      });
      
      return browsers;
    };

    // CSS Grid Fallbacks
    const enhanceGridSupport = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* CSS Grid fallbacks for older browsers */
        @supports not (display: grid) {
          .grid { display: flex; flex-wrap: wrap; }
          .grid-cols-1 > * { width: 100%; }
          .grid-cols-2 > * { width: 50%; }
          .grid-cols-3 > * { width: 33.333%; }
          .grid-cols-4 > * { width: 25%; }
          .grid-cols-6 > * { width: 16.666%; }
          
          @media (max-width: 768px) {
            .md\\:grid-cols-2 > *, 
            .md\\:grid-cols-3 > *,
            .md\\:grid-cols-4 > * { width: 100%; }
          }
          
          @media (max-width: 1024px) {
            .lg\\:grid-cols-2 > *, 
            .lg\\:grid-cols-3 > * { width: 100%; }
          }
        }
        
        /* Flexbox fallbacks */
        @supports not (display: flex) {
          .flex { display: block; }
          .flex-col > * { display: block; margin-bottom: 1rem; }
          .flex-row > * { display: inline-block; vertical-align: top; }
          .justify-center { text-align: center; }
          .items-center { vertical-align: middle; }
        }
      `;
      document.head.appendChild(style);
    };

    // Modern CSS Features with Fallbacks
    const addModernCSSFallbacks = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* Custom Properties fallbacks */
        .browser-ie {
          --primary: #1e3a8a;
          --background: #ffffff;
          --foreground: #374151;
          --card: #ffffff;
          --border: #e5e7eb;
        }
        
        /* Backdrop filter fallbacks */
        @supports not (backdrop-filter: blur(10px)) {
          .backdrop-blur-sm,
          .backdrop-blur-lg {
            background-color: rgba(255, 255, 255, 0.8);
          }
          
          .dark .backdrop-blur-sm,
          .dark .backdrop-blur-lg {
            background-color: rgba(0, 0, 0, 0.8);
          }
        }
        
        /* Aspect ratio fallbacks */
        @supports not (aspect-ratio: 16/9) {
          .aspect-video {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
          }
          
          .aspect-video > * {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
        
        /* Sticky position fallbacks */
        @supports not (position: sticky) {
          .sticky {
            position: fixed;
            z-index: 1000;
          }
        }
        
        /* Gap property fallbacks */
        @supports not (gap: 1rem) {
          .gap-1 > * { margin: 0.25rem; }
          .gap-2 > * { margin: 0.5rem; }
          .gap-4 > * { margin: 1rem; }
          .gap-6 > * { margin: 1.5rem; }
          .gap-8 > * { margin: 2rem; }
        }
      `;
      document.head.appendChild(style);
    };

    // iOS and Safari Specific Fixes
    const iOSAndSafariFixes = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* iOS Safari fixes */
        .browser-ios input,
        .browser-ios textarea,
        .browser-ios select {
          -webkit-appearance: none;
          border-radius: 0;
          background-clip: padding-box;
        }
        
        /* Prevent iOS zoom on input focus */
        .browser-ios input[type="text"],
        .browser-ios input[type="email"],
        .browser-ios input[type="number"],
        .browser-ios input[type="tel"],
        .browser-ios textarea {
          font-size: 16px !important;
        }
        
        /* Safari button fixes */
        .browser-safari button {
          -webkit-appearance: none;
          border-radius: 0;
        }
        
        /* iOS safe area handling */
        .browser-ios {
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
        }
        
        /* Fix for iOS viewport units */
        .browser-ios .min-h-screen {
          min-height: -webkit-fill-available;
        }
        
        /* iOS scroll behavior */
        .browser-ios {
          -webkit-overflow-scrolling: touch;
        }
      `;
      document.head.appendChild(style);
    };

    // Android and Chrome Specific Fixes
    const androidAndChromeFixes = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* Android Chrome fixes */
        .browser-android input,
        .browser-android textarea {
          background-color: transparent;
        }
        
        /* Android font rendering */
        .browser-android {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Chrome autofill styles */
        .browser-chrome input:-webkit-autofill,
        .browser-chrome input:-webkit-autofill:hover,
        .browser-chrome input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px hsl(var(--background)) inset !important;
          -webkit-text-fill-color: hsl(var(--foreground)) !important;
        }
        
        /* Android tap highlight */
        .browser-android * {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
      `;
      document.head.appendChild(style);
    };

    // Firefox Specific Fixes
    const firefoxFixes = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* Firefox specific fixes */
        .browser-firefox {
          scrollbar-width: thin;
          scrollbar-color: hsl(var(--border)) transparent;
        }
        
        /* Firefox button fixes */
        .browser-firefox button::-moz-focus-inner {
          border: 0;
          padding: 0;
        }
        
        /* Firefox input fixes */
        .browser-firefox input[type="number"] {
          -moz-appearance: textfield;
        }
        
        .browser-firefox input[type="number"]::-webkit-outer-spin-button,
        .browser-firefox input[type="number"]::-webkit-inner-spin-button {
          display: none;
        }
      `;
      document.head.appendChild(style);
    };

    // Internet Explorer Fixes (if needed)
    const ieFixes = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* IE11 fixes */
        .browser-ie {
          /* Flexbox fixes for IE */
        }
        
        .browser-ie .flex {
          display: -ms-flexbox;
          display: flex;
        }
        
        .browser-ie .flex-col {
          -ms-flex-direction: column;
          flex-direction: column;
        }
        
        .browser-ie .flex-1 {
          -ms-flex: 1 1 0%;
          flex: 1 1 0%;
        }
        
        .browser-ie .justify-center {
          -ms-flex-pack: center;
          justify-content: center;
        }
        
        .browser-ie .items-center {
          -ms-flex-align: center;
          align-items: center;
        }
      `;
      document.head.appendChild(style);
    };

    // Enhanced Touch Support
    const enhanceTouchSupport = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* Enhanced touch targets */
        @media (pointer: coarse) {
          button,
          .btn,
          [role="button"],
          a,
          input,
          select,
          textarea {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Larger spacing on mobile */
          .gap-2 { gap: 0.75rem; }
          .gap-4 { gap: 1.25rem; }
          .p-2 { padding: 0.75rem; }
          .p-4 { padding: 1.25rem; }
        }
        
        /* Touch-friendly hover states */
        @media (hover: none) {
          .hover\\:bg-primary:hover {
            background-color: hsl(var(--primary));
          }
          
          .hover\\:scale-105:hover {
            transform: scale(1.05);
          }
        }
      `;
      document.head.appendChild(style);
    };

    // Font Loading Optimization
    const optimizeFontLoading = () => {
      // Ensure fonts load properly across all browsers
      const fontFamilies = [
        'Inter',
        'Noto Sans SC'
      ];
      
      fontFamilies.forEach(family => {
        if (document.fonts && document.fonts.load) {
          document.fonts.load(`1rem ${family}`).catch(() => {
            // Fallback to system fonts if custom fonts fail
            const style = document.createElement('style');
            style.textContent = `
              * {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif !important;
              }
            `;
            document.head.appendChild(style);
          });
        }
      });
    };

    // Viewport Meta Tag Enhancement
    const enhanceViewport = () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        // Enhanced viewport for better mobile compatibility
        viewport.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover, shrink-to-fit=no'
        );
      }
    };

    // Initialize all compatibility enhancements
    const browsers = detectBrowser();
    enhanceGridSupport();
    addModernCSSFallbacks();
    enhanceTouchSupport();
    optimizeFontLoading();
    enhanceViewport();

    // Browser-specific fixes
    if (browsers.isIOS || browsers.isSafari) {
      iOSAndSafariFixes();
    }
    
    if (browsers.isAndroid || browsers.isChrome) {
      androidAndChromeFixes();
    }
    
    if (browsers.isFirefox) {
      firefoxFixes();
    }
    
    if (browsers.isIE) {
      ieFixes();
    }

    // Performance optimization for older devices
    if (browsers.isIE || (browsers.isAndroid && /Android [1-4]/.test(navigator.userAgent))) {
      const style = document.createElement('style');
      style.textContent = `
        /* Reduce animations for older devices */
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      // Cleanup function
      const addedStyles = document.querySelectorAll('style[data-compatibility]');
      addedStyles.forEach(style => style.remove());
    };
  }, []);

  return null; // This component only handles compatibility
};

export default CrossBrowserCompatibility;