import { useEffect } from 'react';

const MobileOptimization = () => {
  useEffect(() => {
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