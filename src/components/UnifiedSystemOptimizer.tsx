import { useEffect } from 'react';

/**
 * Unified System Optimizer - Advanced Performance & Compatibility
 * Consolidates all optimizations with enhanced error handling and iPad compatibility
 */
const UnifiedSystemOptimizer = () => {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const initializeOptimizations = async () => {
      try {
        // 1. Enhanced Font Loading with Progressive Enhancement
        const optimizeFontLoading = () => {
          try {
            // Check if font is already loaded
            if (document.querySelector('link[href*="fonts.googleapis.com"]')) return;
            
            const fontLink = document.createElement('link');
            fontLink.rel = 'preload';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
            fontLink.as = 'style';
            fontLink.crossOrigin = 'anonymous';
            
            const noscriptFallback = document.createElement('noscript');
            const fallbackLink = document.createElement('link');
            fallbackLink.rel = 'stylesheet';
            fallbackLink.href = fontLink.href;
            noscriptFallback.appendChild(fallbackLink);
            
            fontLink.onload = function() { 
              (this as HTMLLinkElement).rel = 'stylesheet'; 
            };
            
            fontLink.onerror = () => {
              // Fallback to system fonts
              document.documentElement.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            };
            
            document.head.appendChild(fontLink);
            document.head.appendChild(noscriptFallback);
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('Font loading optimization failed:', error);
            }
          }
        };

        // 2. Advanced Performance Optimizations
        const optimizePerformance = () => {
          try {
            // Optimize images with comprehensive lazy loading
            const images = document.querySelectorAll('img');
            images.forEach((img) => {
              if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
              }
              if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
              }
              
              // Add error handling for broken images
              if (!img.onerror) {
                img.onerror = function() {
                  (this as HTMLImageElement).style.display = 'none';
                };
              }
            });

            // Enhanced form input optimization with iPad support
            const inputs = document.querySelectorAll('input, textarea, select');
            inputs.forEach((input) => {
              const htmlInput = input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
              
              // Prevent iOS zoom on focus
              if (!htmlInput.style.fontSize) {
                htmlInput.style.fontSize = '16px';
              }
              
              // Add autocomplete attributes
              if (!htmlInput.hasAttribute('autocomplete') && htmlInput.type !== 'hidden') {
                const inputType = (htmlInput as HTMLInputElement).type || htmlInput.tagName.toLowerCase();
                const autocompleteMap: { [key: string]: string } = {
                  'email': 'email',
                  'tel': 'tel',
                  'text': 'off',
                  'password': 'current-password',
                  'textarea': 'off',
                  'search': 'off'
                };
                htmlInput.setAttribute('autocomplete', autocompleteMap[inputType] || 'off');
              }
              
              // iPad-specific optimizations
              if (/iPad|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document) {
                htmlInput.style.webkitAppearance = 'none';
                htmlInput.style.borderRadius = '8px';
              }
            });

            // Performance monitoring (development only)
            if (process.env.NODE_ENV === 'development' && 'performance' in window) {
              setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
                if (navigation) {
                  console.log('Performance metrics:', {
                    loadTime: navigation.loadEventEnd - navigation.loadEventStart,
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 'N/A'
                  });
                }
              }, 1000);
            }
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('Performance optimization failed:', error);
            }
          }
        };

        // 3. Enhanced Mobile & iPad Experience
        const optimizeMobileExperience = () => {
          try {
            const isIPad = /iPad|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;
            const isMobile = window.innerWidth < 768;
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            
            if (isIPad || isMobile || isIOS) {
              // Ensure proper touch behavior
              document.body.style.touchAction = 'manipulation';
              (document.body.style as any).webkitTouchCallout = 'none';
              (document.body.style as any).webkitUserSelect = 'none';
              document.body.style.userSelect = 'none';
              
              // Optimize scrolling performance
              (document.documentElement.style as any).webkitOverflowScrolling = 'touch';
              if (CSS.supports('scroll-behavior', 'smooth')) {
                document.documentElement.style.scrollBehavior = 'smooth';
              }
              
              // iPad-specific viewport optimization
              const meta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
              if (meta) {
                if (isIPad) {
                  meta.content = 'width=device-width, initial-scale=1.0, user-scalable=yes, viewport-fit=cover, shrink-to-fit=no';
                } else if (isMobile) {
                  meta.content = 'width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover';
                }
              }
              
              // Add iOS-specific CSS fixes
              const iosStyle = document.createElement('style');
              iosStyle.textContent = `
                @supports (-webkit-touch-callout: none) {
                  .container { 
                    padding-left: max(1rem, env(safe-area-inset-left));
                    padding-right: max(1rem, env(safe-area-inset-right));
                  }
                  
                  input, textarea, select {
                    -webkit-appearance: none;
                    border-radius: 8px;
                    transform: translateZ(0);
                  }
                  
                  button {
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
                    transform: translateZ(0);
                  }
                }
              `;
              document.head.appendChild(iosStyle);
            }
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('Mobile optimization failed:', error);
            }
          }
        };

        // 4. Comprehensive Error Prevention & Handling
        const preventCommonErrors = () => {
          try {
            // Prevent iOS zoom with dynamic font sizing
            const preventZoomStyle = document.createElement('style');
            preventZoomStyle.textContent = `
              @media screen and (max-width: 767px) {
                input, textarea, select {
                  font-size: 16px !important;
                  line-height: 1.4 !important;
                }
                
                input:focus, textarea:focus, select:focus {
                  font-size: 16px !important;
                }
              }
              
              @supports (-webkit-touch-callout: none) {
                input, textarea, select {
                  -webkit-appearance: none !important;
                  appearance: none !important;
                }
              }
            `;
            document.head.appendChild(preventZoomStyle);
            
            // Enhanced global error handlers with context
            const handleGlobalError = (event: ErrorEvent | PromiseRejectionEvent) => {
              if (process.env.NODE_ENV === 'development') {
                console.group('🚨 Global Error Handler');
                console.warn('Error details:', event);
                console.warn('User agent:', navigator.userAgent);
                console.warn('Viewport:', { 
                  width: window.innerWidth, 
                  height: window.innerHeight 
                });
                console.groupEnd();
              }
              
              // Prevent error propagation that could break the app
              event.preventDefault?.();
              return true;
            };

            window.addEventListener('error', handleGlobalError);
            window.addEventListener('unhandledrejection', handleGlobalError);
            
            // Handle offline/online states
            const handleConnectionChange = () => {
              if (!navigator.onLine) {
                const offlineToast = document.createElement('div');
                offlineToast.textContent = 'Connection lost. Some features may be limited.';
                offlineToast.style.cssText = `
                  position: fixed; top: 20px; right: 20px; z-index: 9999;
                  background: hsl(var(--destructive)); color: hsl(var(--destructive-foreground));
                  padding: 12px 16px; border-radius: 8px; font-size: 14px;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                `;
                document.body.appendChild(offlineToast);
                
                setTimeout(() => {
                  if (offlineToast.parentNode) {
                    offlineToast.parentNode.removeChild(offlineToast);
                  }
                }, 5000);
              }
            };
            
            window.addEventListener('online', handleConnectionChange);
            window.addEventListener('offline', handleConnectionChange);
            
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('Error prevention setup failed:', error);
            }
          }
        };

        // 5. Advanced SEO and Accessibility
        const enhanceSEOAndA11y = () => {
          try {
            // Ensure all images have proper alt attributes
            const images = document.querySelectorAll('img:not([alt])');
            images.forEach((img) => {
              img.setAttribute('alt', '');
              img.setAttribute('role', 'presentation');
            });

            // Enhanced skip links
            if (!document.querySelector('a[href="#main-content"]')) {
              const skipLink = document.createElement('a');
              skipLink.href = '#main-content';
              skipLink.textContent = 'Skip to main content';
              skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 transition-all';
              skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.getElementById('main-content');
                if (target) {
                  target.focus({ preventScroll: false });
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              });
              document.body.insertBefore(skipLink, document.body.firstChild);
            }

            // Add focus management for keyboard navigation
            const addFocusRing = () => {
              const style = document.createElement('style');
              style.textContent = `
                .js-focus-visible :focus:not(.focus-visible) {
                  outline: none;
                }
                
                .js-focus-visible .focus-visible {
                  outline: 2px solid hsl(var(--primary));
                  outline-offset: 2px;
                  box-shadow: 0 0 0 4px hsl(var(--primary) / 0.2);
                }
              `;
              document.head.appendChild(style);
              document.documentElement.classList.add('js-focus-visible');
            };
            
            addFocusRing();
            
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('SEO/A11y enhancement failed:', error);
            }
          }
        };

        // Execute all optimizations with error boundaries
        await Promise.allSettled([
          Promise.resolve(optimizeFontLoading()),
          Promise.resolve(optimizePerformance()),
          Promise.resolve(optimizeMobileExperience()),
          Promise.resolve(preventCommonErrors()),
          Promise.resolve(enhanceSEOAndA11y())
        ]);

        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Unified system optimization complete');
        }

      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('⚠️ Some optimizations failed:', error);
        }
      }
    };

    // Initialize with a small delay to ensure DOM is ready
    const timer = setTimeout(initializeOptimizations, 100);
    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default UnifiedSystemOptimizer;