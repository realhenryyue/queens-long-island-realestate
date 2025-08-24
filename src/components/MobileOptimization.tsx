import { useEffect } from 'react';

const MobileOptimization = () => {
  useEffect(() => {
    // Enhanced Responsive Design Fixes
    const enhanceResponsiveDesign = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* Enhanced responsive breakpoints */
        @media (max-width: 320px) {
          .container { padding-left: 0.75rem; padding-right: 0.75rem; }
          .text-4xl { font-size: 1.875rem; }
          .text-5xl { font-size: 2.25rem; }
          .p-6 { padding: 1rem; }
          .gap-8 { gap: 1rem; }
        }
        
        @media (max-width: 480px) {
          .grid-cols-2 { grid-template-columns: 1fr; }
          .md\\:grid-cols-2 { grid-template-columns: 1fr; }
          .flex-row { flex-direction: column; }
          .text-base { font-size: 0.875rem; }
        }
        
        @media (max-width: 640px) {
          .sm\\:text-lg { font-size: 1rem; }
          .sm\\:p-6 { padding: 1rem; }
          .sm\\:gap-6 { gap: 1rem; }
          .hidden.sm\\:block { display: none !important; }
        }
        
        /* Ultra-wide screen optimization */
        @media (min-width: 1920px) {
          .container { max-width: 1400px; }
        }
        
        /* High-DPI screen optimization */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
        }
        
        /* Landscape mobile optimization */
        @media (max-height: 500px) and (orientation: landscape) {
          .min-h-screen { min-height: 100vh; }
          .py-16 { padding-top: 2rem; padding-bottom: 2rem; }
          .py-20 { padding-top: 3rem; padding-bottom: 3rem; }
        }
      `;
      document.head.appendChild(style);
    };

    // Prevent zoom on iOS when input is focused
    const preventZoom = () => {
      document.querySelectorAll('input, select, textarea').forEach(element => {
        element.addEventListener('touchstart', () => {
          if (!/iPad|iPhone|iPod/.test(navigator.userAgent)) return;
          const viewport = document.querySelector('meta[name=viewport]');
          if (viewport) {
            viewport.setAttribute('content', 
              'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
            );
          }
        });
        
        element.addEventListener('blur', () => {
          if (!/iPad|iPhone|iPod/.test(navigator.userAgent)) return;
          const viewport = document.querySelector('meta[name=viewport]');
          if (viewport) {
            viewport.setAttribute('content', 
              'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
            );
          }
        });
      });
    };

    // Enhanced touch interaction
    const optimizeTouch = () => {
      // Add touch-action to prevent double-tap zoom on buttons
      const style = document.createElement('style');
      style.textContent = `
        button, .btn, [role="button"] { 
          touch-action: manipulation; 
          -webkit-touch-callout: none;
        }
        
        /* Enhanced touch targets for mobile */
        @media (max-width: 768px) {
          button, .btn, [role="button"], a {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* Disable text selection on UI elements */
        .no-select {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        /* Safe area handling for iPhone X and newer */
        @supports (padding: max(0px)) {
          .safe-area-inset-top { padding-top: max(1rem, env(safe-area-inset-top)); }
          .safe-area-inset-bottom { padding-bottom: max(1rem, env(safe-area-inset-bottom)); }
          .safe-area-inset-left { padding-left: max(1rem, env(safe-area-inset-left)); }
          .safe-area-inset-right { padding-right: max(1rem, env(safe-area-inset-right)); }
        }
      `;
      document.head.appendChild(style);
    };

    // Performance optimization for mobile
    const mobilePerformance = () => {
      // Reduce animations on low-end devices
      const isLowEndDevice = navigator.hardwareConcurrency < 4 || 
                           /Android.*Chrome\/[0-6]/.test(navigator.userAgent) ||
                           /iPhone.*OS [89]_/.test(navigator.userAgent);
      
      if (isLowEndDevice) {
        const style = document.createElement('style');
        style.textContent = `
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        `;
        document.head.appendChild(style);
      }
    };

    // Initialize optimizations
    enhanceResponsiveDesign();
    preventZoom();
    optimizeTouch();
    mobilePerformance();

    // Clean up on unmount
    return () => {
      const styles = document.querySelectorAll('style[data-mobile-optimization]');
      styles.forEach(style => style.remove());
    };
  }, []);

  return null; // This component only handles mobile optimizations
};

export default MobileOptimization;