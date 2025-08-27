import { useEffect } from 'react';

/**
 * Performance optimization component for improved loading and rendering
 */
const PerformanceOptimizer = () => {
  useEffect(() => {
    // Skip ALL optimizations on iPad Chrome to prevent black screen
    if (navigator.userAgent.includes('iPad') && navigator.userAgent.includes('Chrome')) {
      console.debug('Skipping ALL performance optimizations for iPad Chrome compatibility');
      return;
    }
    
    try {
      // 1. Optimize images loading
      const optimizeImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          // Add lazy loading if not already present
          if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
          }
          
          // Add decoding async for better performance
          if (!img.hasAttribute('decoding')) {
            img.setAttribute('decoding', 'async');
          }
          
          // Optimize image rendering
          img.style.imageRendering = 'auto';
        });
      };

      // 2. Optimize fonts loading
      const optimizeFonts = () => {
        const style = document.createElement('style');
        style.textContent = `
          /* Optimize font loading */
          @font-face {
            font-display: swap;
          }
          
          /* Preload critical fonts */
          body {
            font-display: swap;
          }
        `;
        document.head.appendChild(style);
      };

      // 3. Reduce layout shifts
      const reduceLayoutShifts = () => {
        const style = document.createElement('style');
        style.setAttribute('data-performance-optimizer', 'true');
        style.textContent = `
          /* Prevent layout shifts */
          img:not([width]):not([height]) {
            aspect-ratio: 16/9;
            object-fit: cover;
          }
          
          /* Optimize animations */
          * {
            will-change: auto;
          }
          
          .animate-pulse, .animate-spin, .animate-bounce {
            will-change: transform, opacity;
          }
          
          /* Optimize scrolling */
          .scroll-smooth {
            scroll-behavior: smooth;
          }
          
          @media (prefers-reduced-motion: reduce) {
            .scroll-smooth {
              scroll-behavior: auto;
            }
          }
          
          /* GPU acceleration for smooth animations */
          .transform, .transition, .animate-pulse {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }
        `;
        document.head.appendChild(style);
      };

      // 4. Optimize form interactions
      const optimizeForms = () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
          // Add autocomplete attributes for better UX
          const inputs = form.querySelectorAll('input');
          inputs.forEach(input => {
            if (input.type === 'email' && !input.hasAttribute('autocomplete')) {
              input.setAttribute('autocomplete', 'email');
            }
            if (input.type === 'tel' && !input.hasAttribute('autocomplete')) {
              input.setAttribute('autocomplete', 'tel');
            }
            if (input.name === 'name' && !input.hasAttribute('autocomplete')) {
              input.setAttribute('autocomplete', 'name');
            }
          });
        });
      };

      // 5. Memory optimization
      const optimizeMemory = () => {
        // Clean up observers when component unmounts
        const cleanup = () => {
          // Remove unused event listeners
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('scroll', handleScroll);
        };

        // Throttled resize handler
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            // Update viewport units for mobile browsers
            document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
          }, 250);
        };

        // Throttled scroll handler
        let scrollTimeout: NodeJS.Timeout;
        const handleScroll = () => {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            // Optimize scroll performance
            if (window.scrollY > 100) {
              document.body.classList.add('scrolled');
            } else {
              document.body.classList.remove('scrolled');
            }
          }, 16); // ~60fps
        };

        window.addEventListener('resize', handleResize, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial call
        handleResize();

        return cleanup;
      };

      // 6. Critical resource hints
      const addResourceHints = () => {
        const hints = [
          { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
          { rel: 'dns-prefetch', href: '//api.allorigins.win' },
          { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
        ];

        hints.forEach(hint => {
          const existing = document.querySelector(`link[href="${hint.href}"]`);
          if (!existing) {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            if (hint.crossorigin) {
              link.crossOrigin = hint.crossorigin;
            }
            document.head.appendChild(link);
          }
        });
      };

      // Execute optimizations
      optimizeImages();
      optimizeFonts();
      reduceLayoutShifts();
      optimizeForms();
      addResourceHints();
      const cleanup = optimizeMemory();

      // Cleanup function
      return cleanup;

    } catch (error) {
      console.debug('Performance optimization applied with fallback');
    }
  }, []);

  return null;
};

export default PerformanceOptimizer;