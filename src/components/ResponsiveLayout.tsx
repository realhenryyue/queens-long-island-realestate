import { useEffect } from 'react';

/**
 * ResponsiveLayout component ensures consistent cross-browser responsive behavior
 */
const ResponsiveLayout = () => {
  useEffect(() => {
    // Add responsive layout fixes
    const addResponsiveFixes = () => {
      const style = document.createElement('style');
      style.setAttribute('data-responsive-fixes', 'true');
      style.textContent = `
        /* Cross-browser responsive grid system */
        .responsive-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        @media (min-width: 640px) {
          .responsive-container { padding: 0 1.5rem; }
        }
        
        @media (min-width: 1024px) {
          .responsive-container { padding: 0 2rem; }
        }
        
        /* Fix overlapping elements with proper spacing */
        .section-spacing {
          margin-bottom: 4rem;
          position: relative;
          z-index: 1;
        }
        
        @media (min-width: 768px) {
          .section-spacing { margin-bottom: 6rem; }
        }
        
        /* Ensure sections don't overlap */
        section {
          clear: both;
          isolation: isolate;
        }
        
        /* Responsive typography scaling */
        .responsive-text {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          line-height: 1.6;
        }
        
        .responsive-heading {
          font-size: clamp(1.5rem, 4vw, 3rem);
          line-height: 1.2;
        }
        
        .responsive-subheading {
          font-size: clamp(1.125rem, 3vw, 1.875rem);
          line-height: 1.3;
        }
        
        /* Fluid images that maintain aspect ratio */
        .responsive-image {
          width: 100%;
          height: auto;
          object-fit: cover;
          max-width: 100%;
        }
        
        /* Grid system that works across all browsers */
        .responsive-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: 1fr;
        }
        
        @media (min-width: 768px) {
          .responsive-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (min-width: 1024px) {
          .responsive-grid { grid-template-columns: repeat(3, 1fr); }
        }
        
        /* Fix iPad Pro specific issues */
        @media screen and (min-width: 1024px) and (max-width: 1366px) {
          .ipad-fix {
            min-height: auto !important;
            overflow: visible !important;
          }
          
          /* Ensure proper scaling on iPad Pro */
          .responsive-container {
            max-width: 95vw;
            padding: 0 2rem;
          }
        }
        
        /* Cross-browser flexbox fixes */
        .flex-safe {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-flex-wrap: wrap;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
        }
        
        .flex-safe > * {
          -webkit-flex-shrink: 0;
          -ms-flex-negative: 0;
          flex-shrink: 0;
        }
        
        /* Prevent content overflow */
        .overflow-safe {
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
          hyphens: auto;
        }
        
        /* Orientation-aware layouts */
        @media screen and (orientation: landscape) and (max-height: 600px) {
          .landscape-adjust {
            padding: 1rem 0;
            min-height: auto;
          }
        }
        
        @media screen and (orientation: portrait) {
          .portrait-adjust {
            padding: 2rem 0;
          }
        }
      `;
      
      document.head.appendChild(style);
    };

    // Add browser-specific fixes
    const addBrowserFixes = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const style = document.createElement('style');
      style.setAttribute('data-browser-fixes', 'true');
      
      let browserSpecificCSS = '';
      
      // Safari fixes
      if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
        browserSpecificCSS += `
          /* Safari-specific fixes */
          .safari-fix {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }
          
          /* Fix Safari flexbox bugs */
          .flex {
            -webkit-flex-basis: auto;
            flex-basis: auto;
          }
        `;
      }
      
      // Chrome fixes
      if (userAgent.includes('chrome')) {
        browserSpecificCSS += `
          /* Chrome-specific optimizations */
          .chrome-optimize {
            will-change: transform;
          }
        `;
      }
      
      // Firefox fixes
      if (userAgent.includes('firefox')) {
        browserSpecificCSS += `
          /* Firefox-specific fixes */
          .firefox-fix {
            -moz-backface-visibility: hidden;
            backface-visibility: hidden;
          }
        `;
      }
      
      // Edge fixes
      if (userAgent.includes('edge')) {
        browserSpecificCSS += `
          /* Edge-specific fixes */
          .edge-fix {
            -ms-scroll-snap-type: x mandatory;
            scroll-snap-type: x mandatory;
          }
        `;
      }
      
      style.textContent = browserSpecificCSS;
      document.head.appendChild(style);
    };

    // Viewport meta tag optimization
    const optimizeViewport = () => {
      let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
      }
      viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=yes, maximum-scale=5.0';
    };

    addResponsiveFixes();
    addBrowserFixes();
    optimizeViewport();

    // Dynamic viewport height fix for mobile browsers
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return null;
};

export default ResponsiveLayout;