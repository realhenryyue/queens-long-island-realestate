import { useEffect } from 'react';

/**
 * Unified Performance and Compatibility Optimizer
 * Consolidates all optimizations into a single, efficient component
 */
const UnifiedOptimizer = () => {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    console.log('🚀 Initializing unified optimizer...');

    try {
      // 1. Enhanced Font Loading Optimization
      const optimizeFontLoading = () => {
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
        fontLink.as = 'style';
        fontLink.onload = function() { 
          (this as HTMLLinkElement).rel = 'stylesheet'; 
        };
        document.head.appendChild(fontLink);
      };

      // 2. Critical Performance Optimizations
      const optimizePerformance = () => {
        // Optimize images with better lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach((img) => {
          if (!img.hasAttribute('decoding')) {
            img.setAttribute('decoding', 'async');
          }
        });

        // Optimize form inputs for better UX
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach((input) => {
          const htmlInput = input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
          if (!htmlInput.hasAttribute('autocomplete') && htmlInput.type !== 'hidden') {
            const inputType = (htmlInput as HTMLInputElement).type || htmlInput.tagName.toLowerCase();
            const autocompleteMap: { [key: string]: string } = {
              'email': 'email',
              'tel': 'tel',
              'text': 'off',
              'password': 'current-password',
              'textarea': 'off'
            };
            htmlInput.setAttribute('autocomplete', autocompleteMap[inputType] || 'off');
          }
        });
      };

      // 3. Enhanced iPad/Mobile Compatibility
      const optimizeMobileExperience = () => {
        const isIPad = /iPad|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;
        const isMobile = window.innerWidth < 768;
        
        if (isIPad || isMobile) {
          // Ensure proper touch behavior
          document.body.style.touchAction = 'manipulation';
          
          // Optimize for mobile scrolling
          if (CSS.supports('scroll-behavior', 'smooth')) {
            document.documentElement.style.scrollBehavior = 'smooth';
          }
          
          // Fix iOS Safari viewport issues
          const meta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
          if (meta && isIPad) {
            meta.content = 'width=device-width, initial-scale=1.0, user-scalable=yes, viewport-fit=cover';
          }
        }
      };

      // 4. Enhanced Error Prevention
      const preventCommonErrors = () => {
        // Prevent zoom on iOS for form inputs
        const style = document.createElement('style');
        style.textContent = `
          @media screen and (max-width: 767px) {
            input, textarea, select {
              font-size: 16px !important;
            }
          }
        `;
        document.head.appendChild(style);
        
        // Add global error handlers
        window.addEventListener('error', (event) => {
          if (process.env.NODE_ENV === 'development') {
            console.debug('Global error caught:', event.error?.message);
          }
          event.preventDefault();
        });

        window.addEventListener('unhandledrejection', (event) => {
          if (process.env.NODE_ENV === 'development') {
            console.debug('Promise rejection caught:', event.reason);
          }
          event.preventDefault();
        });
      };

      // 5. SEO and Accessibility Enhancements
      const enhanceSEOAndA11y = () => {
        // Ensure all images have alt attributes
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach((img) => {
          img.setAttribute('alt', '');
        });

        // Add skip links if missing
        if (!document.querySelector('a[href="#main-content"]')) {
          const skipLink = document.createElement('a');
          skipLink.href = '#main-content';
          skipLink.textContent = 'Skip to main content';
          skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50';
          document.body.insertBefore(skipLink, document.body.firstChild);
        }
      };

      // Execute all optimizations
      optimizeFontLoading();
      optimizePerformance();
      optimizeMobileExperience();
      preventCommonErrors();
      enhanceSEOAndA11y();

      console.log('✅ Unified optimizer initialization complete');

    } catch (error) {
      console.error('❌ Unified optimizer failed:', error);
    }
  }, []);

  return null;
};

export default UnifiedOptimizer;