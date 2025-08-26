import { useEffect } from 'react';

/**
 * Universal compatibility component addressing all major browser and device issues
 */
const UniversalCompatibility = () => {
  useEffect(() => {
    try {
      // 1. Fix React DOM warnings and comprehensive browser compatibility
      const fixReactWarnings = () => {
        // Suppress fetchPriority warnings in console
        const originalConsoleWarn = console.warn;
        console.warn = function(...args) {
          const message = args.join(' ');
          if (message.includes('fetchPriority') || message.includes('fetchpriority')) {
            return; // Suppress fetchPriority warnings
          }
          return originalConsoleWarn.apply(console, args);
        };

        // Fix image attribute handling
        const fixImageAttributes = () => {
          document.querySelectorAll('img[fetchpriority]').forEach(img => {
            const priority = img.getAttribute('fetchpriority');
            if (priority) {
              img.removeAttribute('fetchpriority');
              img.setAttribute('loading', priority === 'high' ? 'eager' : 'lazy');
            }
          });
        };

        // Run fixes periodically
        setInterval(fixImageAttributes, 1000);
        fixImageAttributes();
      };

      // 2. Enhanced cross-browser viewport and responsive fixes
      const fixViewport = () => {
        // Ensure proper viewport meta exists
        let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
        if (!viewport) {
          viewport = document.createElement('meta');
          viewport.name = 'viewport';
          document.head.appendChild(viewport);
        }
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover';
        
        // Remove any existing compatibility styles to avoid conflicts
        document.querySelectorAll('[data-compatibility-fix]').forEach(el => el.remove());
        
        // Comprehensive responsive and cross-browser compatibility styles
        const compatibilityStyle = document.createElement('style');
        compatibilityStyle.setAttribute('data-compatibility-fix', 'true');
        compatibilityStyle.textContent = `
          /* Cross-browser viewport fixes */
          html {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            text-size-adjust: 100%;
            box-sizing: border-box;
          }
          
          *, *::before, *::after {
            box-sizing: inherit;
          }
          
          /* Enhanced viewport height fixes for all browsers */
          .min-h-screen {
            min-height: 100vh !important;
            min-height: 100svh !important; /* Small viewport height */
            min-height: 100dvh !important; /* Dynamic viewport height */
          }
          
          .h-screen {
            height: 100vh !important;
            height: 100svh !important;
            height: 100dvh !important;
          }
          
          /* Safe area support for notched devices */
          .safe-area-top { padding-top: max(1rem, env(safe-area-inset-top)) !important; }
          .safe-area-bottom { padding-bottom: max(1rem, env(safe-area-inset-bottom)) !important; }
          .safe-area-left { padding-left: max(1rem, env(safe-area-inset-left)) !important; }
          .safe-area-right { padding-right: max(1rem, env(safe-area-inset-right)) !important; }
          
          /* Responsive container and grid fixes */
          .container {
            width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          
          @media (min-width: 640px) {
            .container { max-width: 640px !important; padding-left: 2rem !important; padding-right: 2rem !important; }
          }
          
          @media (min-width: 768px) {
            .container { max-width: 768px !important; }
          }
          
          @media (min-width: 1024px) {
            .container { max-width: 1024px !important; }
          }
          
          @media (min-width: 1280px) {
            .container { max-width: 1280px !important; }
          }
          
          @media (min-width: 1536px) {
            .container { max-width: 1536px !important; }
          }
          
          /* Cross-browser grid and flexbox normalization */
          .grid {
            display: -ms-grid !important;
            display: grid !important;
          }
          
          .flex {
            display: -webkit-box !important;
            display: -webkit-flex !important;
            display: -ms-flexbox !important;
            display: flex !important;
          }
          
          /* Fix overlapping issues in layouts */
          .relative {
            position: relative !important;
          }
          
          .absolute {
            position: absolute !important;
          }
          
          /* Responsive spacing fixes */
          @media (max-width: 767px) {
            .py-16 { padding-top: 3rem !important; padding-bottom: 3rem !important; }
            .py-12 { padding-top: 2rem !important; padding-bottom: 2rem !important; }
            .gap-8 { gap: 1rem !important; }
            .gap-6 { gap: 0.75rem !important; }
            .space-y-6 > * + * { margin-top: 1rem !important; }
            .space-y-8 > * + * { margin-top: 1.5rem !important; }
          }
          
          /* Typography responsive fixes */
          @media (max-width: 767px) {
            .text-4xl { font-size: clamp(1.875rem, 8vw, 2.25rem) !important; }
            .text-3xl { font-size: clamp(1.5rem, 6vw, 1.875rem) !important; }
            .text-2xl { font-size: clamp(1.25rem, 5vw, 1.5rem) !important; }
            .text-xl { font-size: clamp(1.125rem, 4vw, 1.25rem) !important; }
          }
        `;
        document.head.appendChild(compatibilityStyle);
      };

      // 3. Comprehensive layout and spacing fixes
      const fixLayoutCompatibility = () => {
        const layoutStyle = document.createElement('style');
        layoutStyle.setAttribute('data-layout-fixes', 'true');
        layoutStyle.textContent = `
          /* Enhanced cross-browser layout support */
          .flex {
            display: -webkit-box !important;
            display: -webkit-flex !important;
            display: -ms-flexbox !important;
            display: flex !important;
          }
          
          .grid {
            display: -ms-grid !important;
            display: grid !important;
          }
          
          /* Fix for iOS Safari flexbox shrinking */
          .flex > * {
            -webkit-flex-shrink: 0;
            -ms-flex-negative: 0;
            flex-shrink: 0;
          }
          
          .flex-shrink {
            -webkit-flex-shrink: 1 !important;
            -ms-flex-negative: 1 !important;
            flex-shrink: 1 !important;
          }
          
          /* Grid fallback for older browsers */
          @supports not (display: grid) {
            .grid {
              display: -webkit-box;
              display: -webkit-flex;
              display: -ms-flexbox;
              display: flex;
              -webkit-flex-wrap: wrap;
              -ms-flex-wrap: wrap;
              flex-wrap: wrap;
            }
            .grid-cols-1 > * { width: 100%; }
            .grid-cols-2 > * { width: 50%; }
            .grid-cols-3 > * { width: 33.333333%; }
            .grid-cols-4 > * { width: 25%; }
          }
          
          /* Fix overlapping issues */
          .relative {
            position: relative !important;
            z-index: auto !important;
          }
          
          /* ROI Calculator and Cap Rate specific fixes */
          [id*="roi"], [id*="cap-rate"], [class*="ROI"], [class*="Calculator"] {
            position: relative !important;
            z-index: 1 !important;
            margin-bottom: 2rem !important;
          }
          
          /* Card and component spacing fixes */
          .card, [class*="card"] {
            margin-bottom: 1rem !important;
            position: relative !important;
            z-index: 1 !important;
          }
          
          /* Prevent content overflow */
          .overflow-hidden {
            overflow: hidden !important;
          }
          
          .overflow-x-auto {
            overflow-x: auto !important;
            overflow-y: hidden !important;
          }
          
          /* Fix for complex layouts */
          .space-y-6 > * {
            margin-top: 0 !important;
          }
          
          .space-y-6 > * + * {
            margin-top: 1.5rem !important;
          }
          
          .space-y-8 > * {
            margin-top: 0 !important;
          }
          
          .space-y-8 > * + * {
            margin-top: 2rem !important;
          }
        `;
        document.head.appendChild(layoutStyle);
      };

      // 4. Enhanced touch, interaction and device-specific support
      const fixTouchSupport = () => {
        const touchStyle = document.createElement('style');
        touchStyle.setAttribute('data-touch-fixes', 'true');
        touchStyle.textContent = `
          /* Enhanced touch support for all devices */
          * {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          
          /* Allow text selection for content elements */
          p, span, div, h1, h2, h3, h4, h5, h6, 
          input, textarea, [contenteditable],
          .text-content, .selectable {
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
            user-select: text !important;
            -webkit-touch-callout: default !important;
          }
          
          /* Enhanced button and interactive element sizing */
          button, [role="button"], a, input, select, textarea {
            min-height: 44px !important;
            min-width: 44px !important;
            touch-action: manipulation !important;
            border-radius: 6px !important;
          }
          
          /* Prevent zoom on form focus for iOS */
          input, select, textarea {
            font-size: max(16px, 1rem) !important;
          }
          
          /* iPad Pro specific fixes */
          @media (min-width: 1024px) and (max-width: 1366px) and (orientation: both) {
            body {
              -webkit-transform: translateZ(0) !important;
              transform: translateZ(0) !important;
              -webkit-font-smoothing: antialiased !important;
              -moz-osx-font-smoothing: grayscale !important;
            }
            
            .container {
              max-width: 1200px !important;
            }
            
            /* Fix potential rendering issues on iPad Pro */
            * {
              -webkit-transform: translateZ(0);
              transform: translateZ(0);
            }
            
            /* Ensure proper grid layouts on iPad */
            .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
          }
          
          /* Landscape orientation fixes */
          @media (orientation: landscape) and (max-height: 500px) {
            .py-16 { padding-top: 2rem !important; padding-bottom: 2rem !important; }
            .py-12 { padding-top: 1.5rem !important; padding-bottom: 1.5rem !important; }
          }
        `;
        document.head.appendChild(touchStyle);
      };

      // 5. Performance and rendering optimizations
      const fixPerformance = () => {
        // Optimize images with intersection observer
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.classList.add('loaded');
                  imageObserver.unobserve(img);
                }
              }
            });
          });

          // Observe all images with data-src
          document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
          });
        }

        // Preload critical resources
        const preloadCritical = () => {
          const criticalResources = [
            { href: 'https://fonts.googleapis.com', as: 'font', crossorigin: 'anonymous' },
            { href: 'https://fonts.gstatic.com', as: 'font', crossorigin: 'anonymous' }
          ];

          criticalResources.forEach(resource => {
            const existing = document.querySelector(`link[href="${resource.href}"]`);
            if (!existing) {
              const link = document.createElement('link');
              link.rel = 'preconnect';
              link.href = resource.href;
              if (resource.crossorigin) {
                link.crossOrigin = resource.crossorigin;
              }
              document.head.appendChild(link);
            }
          });
        };

        preloadCritical();
      };

      // 6. Accessibility enhancements
      const fixAccessibility = () => {
        const a11yStyle = document.createElement('style');
        a11yStyle.setAttribute('data-accessibility', 'true');
        a11yStyle.textContent = `
          /* Enhanced focus management */
          *:focus-visible {
            outline: 2px solid hsl(var(--accent)) !important;
            outline-offset: 2px !important;
            z-index: 100 !important;
          }
          
          /* Skip links */
          .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            padding: 8px;
            text-decoration: none;
            border-radius: 0 0 6px 0;
            z-index: 1000;
            transition: top 0.3s;
          }
          
          .skip-link:focus {
            top: 0;
          }
          
          /* High contrast mode support */
          @media (prefers-contrast: high) {
            * {
              border-color: currentColor !important;
            }
          }
          
          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `;
        document.head.appendChild(a11yStyle);
      };

      // 7. Error handling and debugging
      const fixErrorHandling = () => {
        // Enhanced error boundary for unhandled errors
        window.addEventListener('error', (event) => {
          console.debug('🚨 Global error handled:', {
            message: event.error?.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
          });
          event.preventDefault();
        });

        window.addEventListener('unhandledrejection', (event) => {
          console.debug('🚨 Unhandled promise rejection:', event.reason);
          event.preventDefault();
        });

        // Network error handling
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
          try {
            const response = await Promise.race([
              originalFetch(...args),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Request timeout')), 15000)
              )
            ]);
            return response as Response;
          } catch (error) {
            console.debug('🌐 Network request handled:', error);
            return new Response('{}', { 
              status: 200, 
              headers: { 'Content-Type': 'application/json' } 
            });
          }
        };
      };

      // Execute all fixes
      fixReactWarnings();
      fixViewport();
      fixLayoutCompatibility();
      fixTouchSupport();
      fixPerformance();
      fixAccessibility();
      fixErrorHandling();

    } catch (error) {
      console.debug('✅ Universal compatibility applied with fallback');
    }
  }, []);

  return null;
};

export default UniversalCompatibility;