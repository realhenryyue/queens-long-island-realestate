import { useEffect } from 'react';

/**
 * Dedicated fix for iPad Chrome blank screen issue
 * Removes conflicting optimizations and ensures proper rendering
 */
const IPadChromeCompatibility = () => {
  useEffect(() => {
    // Only apply fixes for iPad Chrome
    const isIPadChrome = navigator.userAgent.includes('iPad') && navigator.userAgent.includes('Chrome');
    
    if (!isIPadChrome) {
      return;
    }

    try {
      // Remove all potentially conflicting optimization styles
      const conflictingStyles = document.querySelectorAll([
        'style[data-unified-fixes]',
        'style[data-ipad-chrome-fix]',
        'style[data-mobile-optimization]',
        'style[data-responsive-fixes]',
        'style[data-browser-fixes]',
        'style[data-performance-optimizer]'
      ].join(', '));
      
      conflictingStyles.forEach(style => style.remove());

      // Apply minimal, safe iPad Chrome fixes
      const iPadChromeStyle = document.createElement('style');
      iPadChromeStyle.setAttribute('data-ipad-chrome-safe', 'true');
      iPadChromeStyle.textContent = `
        /* CRITICAL: Reset base elements for iPad Chrome */
        html {
          height: 100%;
          width: 100%;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
        
        body {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          overflow-x: hidden;
        }
        
        #root {
          min-height: 100vh;
          display: block;
          position: relative;
          background: hsl(var(--background));
          isolation: isolate;
        }
        
        /* Remove ALL transform3d and hardware acceleration */
        *, *::before, *::after {
          -webkit-transform: none !important;
          transform: none !important;
          -webkit-backface-visibility: visible !important;
          backface-visibility: visible !important;
          will-change: auto !important;
        }
        
        /* Disable all animations on iPad Chrome */
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
        }
        
        /* Simple flexbox without vendor prefixes */
        .flex {
          display: flex;
        }
        
        .grid {
          display: grid;
        }
        
        /* Basic responsive behavior */
        .container {
          max-width: 100%;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        /* Ensure images display correctly */
        img {
          max-width: 100%;
          height: auto;
          display: block;
        }
        
        /* Simple form styling */
        input, textarea, select, button {
          font-family: inherit;
          font-size: 16px;
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          border: 1px solid hsl(var(--border));
        }
        
        /* Basic responsive breakpoints */
        @media (max-width: 768px) {
          .container {
            padding: 0 0.5rem;
          }
        }
      `;
      
      // Insert at the very beginning of head to override other styles
      document.head.insertBefore(iPadChromeStyle, document.head.firstChild);
      
      // Force re-render
      const root = document.getElementById('root');
      if (root) {
        root.style.display = 'none';
        root.offsetHeight; // Force reflow
        root.style.display = 'block';
      }
      
      console.log('iPad Chrome compatibility fix applied');
      
    } catch (error) {
      console.error('iPad Chrome fix failed:', error);
    }
  }, []);

  return null;
};

export default IPadChromeCompatibility;