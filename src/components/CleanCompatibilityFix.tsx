import { useEffect } from 'react';

/**
 * Clean, minimal compatibility fix that doesn't interfere with iPad Chrome
 * Removes all conflicting optimizations and applies only essential fixes
 */
const CleanCompatibilityFix = () => {
  useEffect(() => {
    try {
      console.log('🔧 Initializing clean compatibility fixes...');
      
      // Step 1: Remove ALL existing optimization styles that might conflict
      const removeConflictingStyles = () => {
        const conflictingSelectors = [
          'style[data-unified-fixes]',
          'style[data-ipad-chrome-fix]',
          'style[data-mobile-optimization]',
          'style[data-responsive-fixes]',
          'style[data-browser-fixes]',
          'style[data-performance-optimizer]',
          'style[data-layout-fixes]',
          'style[data-touch-fixes]',
          'style[data-accessibility]',
          'style[data-safe-area]',
          'style[data-ipad-chrome-safe]'
        ];
        
        conflictingSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => el.remove());
        });
        
        console.log('🧹 Removed all conflicting optimization styles');
      };

      // Step 2: Apply minimal, safe base styles
      const applyBaseStyles = () => {
        const baseStyle = document.createElement('style');
        baseStyle.setAttribute('data-clean-compatibility', 'true');
        baseStyle.textContent = `
          /* Essential HTML/Body setup */
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
            overflow-x: hidden;
            background: hsl(var(--background));
            color: hsl(var(--foreground));
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.5;
          }
          
          #root {
            min-height: 100vh;
            width: 100%;
            position: relative;
            background: hsl(var(--background));
          }
          
          /* Safe flexbox without transforms */
          .flex {
            display: flex;
          }
          
          .grid {
            display: grid;
          }
          
          /* Safe responsive images */
          img {
            max-width: 100%;
            height: auto;
            display: block;
          }
          
          /* Essential form fixes */
          input, textarea, select, button {
            font-family: inherit;
            font-size: 16px;
            background: hsl(var(--background));
            color: hsl(var(--foreground));
            border: 1px solid hsl(var(--border));
          }
          
          /* Touch improvements without breaking anything */
          button, [role="button"], a {
            min-height: 44px;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }
          
          /* Essential accessibility */
          *:focus-visible {
            outline: 2px solid hsl(var(--primary));
            outline-offset: 2px;
          }
          
          .sr-only {
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
          }
          
          /* Mobile responsive without breaking iPad Chrome */
          @media (max-width: 768px) {
            .container {
              padding-left: 1rem;
              padding-right: 1rem;
            }
            
            button, [role="button"], a {
              min-height: 44px;
              min-width: 44px;
              padding: 12px 16px;
            }
            
            /* Responsive typography */
            .text-4xl { font-size: clamp(1.875rem, 5vw, 2.25rem); }
            .text-5xl { font-size: clamp(2.25rem, 6vw, 3rem); }
            .text-6xl { font-size: clamp(2.5rem, 7vw, 3.75rem); }
          }
          
          /* iPad specific fixes - very minimal */
          @media (max-width: 1024px) and (min-width: 769px) {
            #root {
              min-height: 100vh;
              isolation: isolate;
            }
          }
          
          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `;
        
        // Insert at the very beginning to take precedence
        document.head.insertBefore(baseStyle, document.head.firstChild);
        console.log('✅ Applied clean base styles');
      };

      // Step 3: Fix viewport meta tag
      const fixViewportMeta = () => {
        let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
        if (!viewport) {
          viewport = document.createElement('meta');
          viewport.name = 'viewport';
          document.head.appendChild(viewport);
        }
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
        console.log('📱 Fixed viewport meta tag');
      };

      // Step 4: Basic error handling (no complex overrides)
      const setupErrorHandling = () => {
        window.addEventListener('error', (event) => {
          console.debug('Error handled:', event.error?.message);
          event.preventDefault();
        });

        window.addEventListener('unhandledrejection', (event) => {
          console.debug('Promise rejection handled:', event.reason);
          event.preventDefault();
        });
        console.log('🛡️ Error handling setup complete');
      };

      // Step 5: Force a clean render
      const forceCleanRender = () => {
        const root = document.getElementById('root');
        if (root) {
          // Force reflow without transforms
          root.style.display = 'none';
          root.offsetHeight; // Force reflow
          root.style.display = 'block';
        }
        console.log('🔄 Forced clean render');
      };

      // Execute all fixes in order
      removeConflictingStyles();
      applyBaseStyles();
      fixViewportMeta();
      setupErrorHandling();
      
      // Small delay to ensure all conflicts are removed
      setTimeout(forceCleanRender, 100);
      
      console.log('✅ Clean compatibility fix complete');
      
    } catch (error) {
      console.error('❌ Clean compatibility fix failed:', error);
    }
  }, []);

  return null;
};

export default CleanCompatibilityFix;