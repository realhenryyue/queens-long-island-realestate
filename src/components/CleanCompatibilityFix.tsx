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
          /* CRITICAL: iPad Chrome specific fixes */
          html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            background: hsl(var(--background));
            color: hsl(var(--foreground));
          }
          
          #root {
            min-height: 100vh;
            width: 100%;
            background: hsl(var(--background));
            display: block;
            position: relative;
          }
          
          /* Safe layout without transforms */
          .flex {
            display: flex;
          }
          
          .grid {
            display: grid;
          }
          
          /* Essential responsive images */
          img {
            max-width: 100%;
            height: auto;
            display: block;
          }
          
          /* Touch and interaction fixes */
          button, [role="button"], a {
            min-height: 44px;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }
          
          /* Accessibility */
          *:focus-visible {
            outline: 2px solid hsl(var(--primary));
            outline-offset: 2px;
          }
          
          /* Mobile responsive */
          @media (max-width: 768px) {
            .container {
              padding-left: 1rem;
              padding-right: 1rem;
            }
            
            .text-4xl { font-size: clamp(1.875rem, 5vw, 2.25rem); }
            .text-5xl { font-size: clamp(2.25rem, 6vw, 3rem); }
            .text-6xl { font-size: clamp(2.5rem, 7vw, 3.75rem); }
          }
          
          /* iPad Pro fixes - minimal and safe */
          @media (min-width: 768px) and (max-width: 1024px) {
            body {
              background: hsl(var(--background)) !important;
              min-height: 100vh !important;
            }
            
            #root {
              min-height: 100vh !important;
              background: hsl(var(--background)) !important;
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