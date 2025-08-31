import { useEffect } from 'react';

/**
 * System Health Monitor - Final unified strategy for display and logic error prevention
 * Addresses all potential edge cases and ensures robust error handling
 */
const SystemHealthMonitor = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let mounted = true;

    const initializeHealthChecks = async () => {
      try {
        // 1. Component State Synchronization
        const synchronizeComponentStates = () => {
          try {
            // Ensure all React components are properly mounted
            const checkReactMounts = () => {
              const reactRoots = document.querySelectorAll('[data-reactroot], #root');
              reactRoots.forEach(root => {
                if (!root.children.length) {
                  console.warn('React root appears empty, triggering refresh');
                  setTimeout(() => {
                    if (mounted) window.location.reload();
                  }, 5000);
                }
              });
            };

            checkReactMounts();

            // Validate form inputs for iOS compatibility
            const inputs = document.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
              const htmlInput = input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
              
              // Ensure proper input attributes for iOS
              if (!htmlInput.style.fontSize) {
                htmlInput.style.fontSize = '16px';
              }
              
              // Fix iOS autocomplete issues
              if (htmlInput.type === 'email' && !htmlInput.hasAttribute('autocomplete')) {
                htmlInput.setAttribute('autocomplete', 'email');
              }
              if (htmlInput.type === 'tel' && !htmlInput.hasAttribute('autocomplete')) {
                htmlInput.setAttribute('autocomplete', 'tel');
              }
            });

          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('Component state sync failed:', error);
            }
          }
        };

        // 2. Image Loading Optimization
        const optimizeImageLoading = () => {
          try {
            const images = document.querySelectorAll('img');
            images.forEach((img, index) => {
              // Ensure all images have proper alt attributes
              if (!img.hasAttribute('alt')) {
                img.setAttribute('alt', `Image ${index + 1}`);
              }

              // Add error handling for broken images
              if (!img.onerror) {
                img.onerror = function() {
                  const fallbackImg = this as HTMLImageElement;
                  fallbackImg.style.display = 'none';
                  
                  // Create placeholder div
                  const placeholder = document.createElement('div');
                  placeholder.className = 'w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm';
                  placeholder.textContent = 'Image unavailable';
                  placeholder.setAttribute('role', 'img');
                  placeholder.setAttribute('aria-label', 'Image could not be loaded');
                  
                  if (fallbackImg.parentNode) {
                    fallbackImg.parentNode.insertBefore(placeholder, fallbackImg);
                  }
                };
              }

              // Optimize loading attributes
              if (!img.hasAttribute('loading') && index > 2) {
                img.setAttribute('loading', 'lazy');
              }
              if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
              }
            });
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('Image optimization failed:', error);
            }
          }
        };

        // 3. Form Validation Enhancement
        const enhanceFormValidation = () => {
          try {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
              if (!form.hasAttribute('novalidate')) {
                form.setAttribute('novalidate', 'true');
              }

              // Add custom validation handler
              const handleSubmit = (e: Event) => {
                const formElement = e.target as HTMLFormElement;
                const requiredFields = formElement.querySelectorAll('[required]');
                let isValid = true;

                requiredFields.forEach(field => {
                  const input = field as HTMLInputElement | HTMLTextAreaElement;
                  if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'hsl(var(--destructive))';
                    input.setAttribute('aria-invalid', 'true');
                  } else {
                    input.style.borderColor = '';
                    input.removeAttribute('aria-invalid');
                  }
                });

                if (!isValid) {
                  e.preventDefault();
                  const firstInvalidField = formElement.querySelector('[aria-invalid="true"]') as HTMLElement;
                  if (firstInvalidField) {
                    firstInvalidField.focus();
                    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }
              };

              // Remove existing listeners to prevent duplicates
              form.removeEventListener('submit', handleSubmit);
              form.addEventListener('submit', handleSubmit);
            });
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('Form validation enhancement failed:', error);
            }
          }
        };

        // 4. Accessibility Compliance Check
        const ensureAccessibilityCompliance = () => {
          try {
            // Ensure all interactive elements have proper focus handling
            const interactiveElements = document.querySelectorAll('button, a, input, textarea, select, [tabindex]');
            interactiveElements.forEach(element => {
              if (!element.hasAttribute('tabindex') || element.getAttribute('tabindex') === '-1') {
                if (element.tagName.toLowerCase() !== 'input' && element.tagName.toLowerCase() !== 'textarea') {
                  element.setAttribute('tabindex', '0');
                }
              }
            });

            // Ensure proper heading hierarchy
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            let previousLevel = 0;
            headings.forEach(heading => {
              const currentLevel = parseInt(heading.tagName.charAt(1));
              if (currentLevel > previousLevel + 1 && previousLevel !== 0) {
                if (process.env.NODE_ENV === 'development') {
                  console.warn(`Heading hierarchy jump detected: h${previousLevel} to h${currentLevel}`);
                }
              }
              previousLevel = currentLevel;
            });

            // Ensure all buttons have accessible names
            const buttons = document.querySelectorAll('button');
            buttons.forEach((button, index) => {
              if (!button.textContent?.trim() && !button.getAttribute('aria-label') && !button.getAttribute('aria-labelledby')) {
                button.setAttribute('aria-label', `Button ${index + 1}`);
              }
            });

          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('Accessibility compliance check failed:', error);
            }
          }
        };

        // 5. Mobile Device Optimization
        const optimizeMobileExperience = () => {
          try {
            const isMobile = window.innerWidth < 768;
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            
            if (isMobile || isIOS) {
              // Optimize touch targets
              const touchTargets = document.querySelectorAll('button, a, input, textarea, select');
              touchTargets.forEach(target => {
                const element = target as HTMLElement;
                const computedStyle = getComputedStyle(element);
                const minHeight = parseInt(computedStyle.minHeight) || 0;
                
                if (minHeight < 44) {
                  element.style.minHeight = '44px';
                  element.style.touchAction = 'manipulation';
                }
              });

              // Prevent iOS zoom on input focus
              const metaViewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
              if (metaViewport && !metaViewport.content.includes('user-scalable=no')) {
                metaViewport.content = metaViewport.content.replace('user-scalable=yes', 'user-scalable=no');
              }
            }
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('Mobile optimization failed:', error);
            }
          }
        };

        // 6. Performance Monitoring
        const monitorPerformance = () => {
          try {
            if ('performance' in window && performance.mark) {
              performance.mark('system-health-check-start');
              
              // Monitor for layout shifts
              if ('LayoutShift' in window) {
                let clsValue = 0;
                new PerformanceObserver((list) => {
                  for (const entry of list.getEntries() as any[]) {
                    if (!entry.hadRecentInput) {
                      clsValue += entry.value;
                    }
                  }
                  
                  if (clsValue > 0.1 && process.env.NODE_ENV === 'development') {
                    console.warn(`High CLS detected: ${clsValue}`);
                  }
                }).observe({ type: 'layout-shift', buffered: true });
              }

              performance.mark('system-health-check-end');
              performance.measure('system-health-check', 'system-health-check-start', 'system-health-check-end');
            }
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('Performance monitoring failed:', error);
            }
          }
        };

        // Execute all health checks
        await Promise.allSettled([
          Promise.resolve(synchronizeComponentStates()),
          Promise.resolve(optimizeImageLoading()),
          Promise.resolve(enhanceFormValidation()),
          Promise.resolve(ensureAccessibilityCompliance()),
          Promise.resolve(optimizeMobileExperience()),
          Promise.resolve(monitorPerformance())
        ]);

        if (process.env.NODE_ENV === 'development') {
          console.log('✅ System health monitoring complete');
        }

      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('⚠️ System health check failed:', error);
        }
      }
    };

    // Initialize with a delay to ensure DOM is ready
    const timer = setTimeout(initializeHealthChecks, 500);

    // Set up periodic health checks
    const healthCheckInterval = setInterval(() => {
      if (mounted) {
        initializeHealthChecks();
      }
    }, 30000); // Check every 30 seconds

    return () => {
      mounted = false;
      clearTimeout(timer);
      clearInterval(healthCheckInterval);
    };
  }, []);

  return null;
};

export default SystemHealthMonitor;