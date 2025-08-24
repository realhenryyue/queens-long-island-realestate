import { useEffect } from 'react';

const UnifiedWebOptimization = () => {
  useEffect(() => {
    // Security Headers and CSP Enhancement
    const enhanceSecurity = () => {
      // Add security meta tags if not present
      const securityMetas = [
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        { name: 'X-Content-Type-Options', content: 'nosniff' },
        { name: 'X-Frame-Options', content: 'DENY' },
        { name: 'X-XSS-Protection', content: '1; mode=block' }
      ];

      securityMetas.forEach(({ name, content }) => {
        if (!document.querySelector(`meta[name="${name}"]`)) {
          const meta = document.createElement('meta');
          meta.name = name;
          meta.content = content;
          document.head.appendChild(meta);
        }
      });
    };

    // Performance optimization
    const optimizePerformance = () => {
      // Prefetch critical resources
      const criticalResources = [
        '/assets/agent-photo.jpg',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
      ];

      criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      });

      // Optimize images with modern formats
      if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[data-src]').forEach(img => {
          img.addEventListener('load', () => {
            img.classList.remove('lazy');
          });
        });
      }

      // Optimize third-party scripts
      const optimizeScripts = () => {
        // Defer non-critical scripts
        document.querySelectorAll('script:not([async]):not([defer])').forEach(script => {
          const scriptElement = script as HTMLScriptElement;
          if (scriptElement.src && 
              !scriptElement.src.includes('gtag') && 
              !scriptElement.textContent?.includes('dataLayer')) {
            scriptElement.defer = true;
          }
        });
      };

      setTimeout(optimizeScripts, 1000);
    };

    // SEO and Schema validation
    const validateSEO = () => {
      // Ensure all images have alt attributes
      document.querySelectorAll('img:not([alt])').forEach(img => {
        const altText = img.getAttribute('title') || 
                       img.closest('[aria-label]')?.getAttribute('aria-label') || 
                       'Image';
        img.setAttribute('alt', altText);
      });

      // Validate heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let lastLevel = 0;
      headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        if (level > lastLevel + 1 && lastLevel !== 0 && process.env.NODE_ENV === 'development') {
          console.warn(`Heading hierarchy issue: ${heading.tagName} follows h${lastLevel}`);
        }
        lastLevel = level;
      });
    };

    // Enhanced error handling
    const setupErrorHandling = () => {
      // Global error handler with production-safe logging
      window.addEventListener('error', (event) => {
        if (process.env.NODE_ENV === 'production') {
          // Only log to analytics in production
          if (typeof window !== 'undefined' && 'gtag' in window) {
            (window as any).gtag('event', 'exception', {
              description: event.error?.message || 'Unknown error',
              fatal: false
            });
          }
        }
      });

      // Unhandled promise rejection handler
      window.addEventListener('unhandledrejection', (event) => {
        if (process.env.NODE_ENV === 'production') {
          if (typeof window !== 'undefined' && 'gtag' in window) {
            (window as any).gtag('event', 'exception', {
              description: event.reason?.message || 'Unhandled promise rejection',
              fatal: false
            });
          }
        }
      });
    };

    // Cross-browser compatibility
    const ensureCompatibility = () => {
      // Polyfill for IntersectionObserver
      if (!window.IntersectionObserver) {
        const script = document.createElement('script');
        script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
        document.head.appendChild(script);
      }

      // CSS Grid fallback for older browsers
      if (!CSS.supports('display', 'grid')) {
        document.body.classList.add('no-grid-support');
      }

      // Modern CSS features detection
      const modernFeatures = [
        { property: 'display', value: 'flex', className: 'has-flexbox' },
        { property: 'position', value: 'sticky', className: 'has-sticky' },
        { property: 'backdrop-filter', value: 'blur(10px)', className: 'has-backdrop-filter' }
      ];

      modernFeatures.forEach(({ property, value, className }) => {
        if (CSS.supports(property, value)) {
          document.documentElement.classList.add(className);
        }
      });
    };

    // Run all optimizations
    enhanceSecurity();
    optimizePerformance();
    validateSEO();
    setupErrorHandling();
    ensureCompatibility();

    // Performance monitoring (development only)
    if (process.env.NODE_ENV === 'development') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            console.log('Navigation timing:', entry);
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['navigation'] });
      } catch (e) {
        // Silently fail if not supported
      }
    }

    return () => {
      // Cleanup
      if (process.env.NODE_ENV === 'development') {
        const observers = document.querySelectorAll('[data-performance-observer]');
        observers.forEach(observer => observer.remove());
      }
    };
  }, []);

  return null; // This component only handles optimizations
};

export default UnifiedWebOptimization;