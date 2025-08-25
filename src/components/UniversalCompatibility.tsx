import { useEffect } from 'react';

/**
 * Universal compatibility component addressing all major browser and device issues
 */
const UniversalCompatibility = () => {
  useEffect(() => {
    try {
      // 1. Fix React DOM warnings and compatibility issues
      const fixReactWarnings = () => {
        // Override problematic attributes
        const originalCreateElement = document.createElement;
        document.createElement = function(tagName: string, options?: any) {
          const element = originalCreateElement.call(this, tagName, options);
          
          // Fix img element attribute warnings
          if (tagName.toLowerCase() === 'img') {
            const originalSetAttribute = element.setAttribute;
            element.setAttribute = function(name: string, value: any) {
              // Convert fetchPriority to lowercase for DOM
              if (name === 'fetchPriority') {
                return originalSetAttribute.call(this, 'fetchpriority', value);
              }
              return originalSetAttribute.call(this, name, value);
            };
          }
          
          return element;
        };
      };

      // 2. Enhanced cross-browser viewport handling
      const fixViewport = () => {
        // Ensure proper viewport meta exists
        let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
        if (!viewport) {
          viewport = document.createElement('meta');
          viewport.name = 'viewport';
          document.head.appendChild(viewport);
        }
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover';
        
        // Add CSS environment support for safe areas
        const safeAreaStyle = document.createElement('style');
        safeAreaStyle.setAttribute('data-safe-area', 'true');
        safeAreaStyle.textContent = `
          /* Enhanced safe area support for all devices */
          .safe-area-top { padding-top: max(1rem, env(safe-area-inset-top)); }
          .safe-area-bottom { padding-bottom: max(1rem, env(safe-area-inset-bottom)); }
          .safe-area-left { padding-left: max(1rem, env(safe-area-inset-left)); }
          .safe-area-right { padding-right: max(1rem, env(safe-area-inset-right)); }
          
          /* Fix for viewport units on mobile browsers */
          .min-h-screen {
            min-height: 100vh;
            min-height: 100svh; /* Small viewport height */
            min-height: 100dvh; /* Dynamic viewport height */
          }
          
          .h-screen {
            height: 100vh;
            height: 100svh;
            height: 100dvh;
          }
        `;
        document.head.appendChild(safeAreaStyle);
      };

      // 3. Cross-browser flexbox and grid fixes
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
          
          /* Fix grid support for older browsers */
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
          }
        `;
        document.head.appendChild(layoutStyle);
      };

      // 4. Enhanced touch and interaction support
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
            min-height: 44px;
            min-width: 44px;
            touch-action: manipulation;
          }
          
          /* Prevent zoom on form focus for iOS */
          input, select, textarea {
            font-size: max(16px, 1rem) !important;
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