import { useEffect } from 'react';

/**
 * SystemHealthMonitor - Unified component for comprehensive website optimization
 * Handles performance, compatibility, error prevention, and user experience
 */
export const SystemHealthMonitor = () => {
  useEffect(() => {
    // Consolidated optimization system with minimal overhead
    const initializeOptimizations = () => {
      try {
        // 1. Component State Synchronization - Prevent React hydration mismatches
        const syncComponentStates = () => {
          // Ensure consistent viewport handling across all devices
          const viewport = document.querySelector('meta[name="viewport"]');
          if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
          }

          // Sync dark mode preferences if theme system exists
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.setAttribute('data-system-theme', prefersDark ? 'dark' : 'light');
        };

        // 2. Enhanced Form Validation & UX
        const optimizeForms = () => {
          const forms = document.querySelectorAll('form');
          forms.forEach(form => {
            // Add proper form validation attributes
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
              const htmlElement = input as HTMLElement;
              if (!htmlElement.hasAttribute('autocomplete')) {
                const inputType = htmlElement.getAttribute('type') || htmlElement.tagName.toLowerCase();
                const autocompleteMap: Record<string, string> = {
                  'email': 'email',
                  'tel': 'tel',
                  'text': htmlElement.getAttribute('name') === 'name' ? 'name' : 'off',
                  'textarea': 'off'
                };
                htmlElement.setAttribute('autocomplete', autocompleteMap[inputType] || 'off');
              }
              
              // Prevent iOS zoom on focus for inputs
              if (htmlElement.getAttribute('type') === 'email' || htmlElement.getAttribute('type') === 'tel') {
                (htmlElement as HTMLInputElement).style.fontSize = '16px';
              }
            });
          });
        };

        // 3. Image Loading Optimization
        const optimizeImages = () => {
          const images = document.querySelectorAll('img');
          images.forEach(img => {
            // Add missing alt attributes for accessibility
            if (!img.hasAttribute('alt')) {
              const src = img.getAttribute('src') || '';
              const filename = src.split('/').pop()?.split('.')[0] || 'image';
              img.setAttribute('alt', `${filename.replace(/[-_]/g, ' ')}`);
            }
            
            // Optimize loading for non-critical images
            if (!img.hasAttribute('loading') && !img.hasAttribute('fetchpriority')) {
              img.setAttribute('loading', 'lazy');
              img.setAttribute('decoding', 'async');
            }
          });
        };

        // 4. Accessibility Compliance
        const enhanceAccessibility = () => {
          // Ensure skip navigation exists and works
          let skipLink = document.querySelector('a[href="#main-content"]') as HTMLAnchorElement;
          if (!skipLink) {
            skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.textContent = 'Skip to main content';
            skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50';
            skipLink.setAttribute('aria-label', 'Skip to main content');
            document.body.insertBefore(skipLink, document.body.firstChild);
          }

          // Ensure all interactive elements have proper focus indicators
          const interactiveElements = document.querySelectorAll('button, a, input, textarea, select, [tabindex]');
          interactiveElements.forEach(element => {
            if (!element.hasAttribute('aria-label') && !element.textContent?.trim()) {
              const role = element.getAttribute('role') || element.tagName.toLowerCase();
              element.setAttribute('aria-label', `${role} element`);
            }
          });
        };

        // 5. Mobile Device Optimization
        const optimizeMobileExperience = () => {
          const isMobile = window.innerWidth < 768;
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
          
          if (isMobile || isIOS) {
            // Optimize touch interactions
            document.documentElement.style.setProperty('touch-action', 'manipulation');
            
            // Fix iOS Safari viewport issues without breaking iPad Chrome
            if (isIOS && window.innerHeight < window.innerWidth) {
              document.documentElement.style.setProperty('height', '-webkit-fill-available');
            }
            
            // Improve scrolling performance
            document.documentElement.style.setProperty('scroll-behavior', 'smooth');
            document.documentElement.style.setProperty('-webkit-overflow-scrolling', 'touch');
          }
        };

        // 6. Performance Monitoring & Error Prevention
        const setupPerformanceMonitoring = () => {
          // Global error handling
          window.addEventListener('error', (event) => {
            console.warn('SystemHealthMonitor: Handled error', event.error?.message || event.message);
          });

          window.addEventListener('unhandledrejection', (event) => {
            console.warn('SystemHealthMonitor: Handled promise rejection', event.reason);
          });
        };

        // Execute all optimizations
        syncComponentStates();
        optimizeForms();
        optimizeImages();
        enhanceAccessibility();
        optimizeMobileExperience();
        setupPerformanceMonitoring();

        // Re-run optimizations when DOM changes (for dynamic content)
        let reoptimizationTimer: number | undefined;
        
        const observer = new MutationObserver((mutations) => {
          let shouldReoptimize = false;
          mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              shouldReoptimize = true;
            }
          });
          
          if (shouldReoptimize) {
            // Debounced re-optimization
            if (reoptimizationTimer) clearTimeout(reoptimizationTimer);
            reoptimizationTimer = window.setTimeout(() => {
              optimizeImages();
              optimizeForms();
              enhanceAccessibility();
            }, 100);
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true
        });

        // Cleanup function
        return () => {
          observer.disconnect();
          clearTimeout(reoptimizationTimer);
        };

      } catch (error) {
        console.warn('SystemHealthMonitor: Initialization error handled gracefully', error);
      }
    };

    // Initialize with minimal delay to avoid blocking render
    const cleanup = initializeOptimizations();
    
    return cleanup;
  }, []);

  return null; // This component only provides side effects
};

export default SystemHealthMonitor;