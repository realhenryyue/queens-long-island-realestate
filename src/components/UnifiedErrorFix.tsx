import { useEffect } from 'react';

/**
 * Unified error handling and display fixes for cross-browser compatibility
 * This component provides systematic fixes for common issues across the website
 */
const UnifiedErrorFix = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Fix 1: iOS Safari viewport and touch issues
        const iosSafariFixStyle = document.createElement('style');
        iosSafariFixStyle.textContent = `
          /* iOS Safari specific fixes */
          @supports (-webkit-touch-callout: none) {
            .min-h-screen {
              min-height: -webkit-fill-available;
            }
            
            /* Fix button appearance on iOS */
            button, [role="button"], .btn, input[type="submit"] {
              -webkit-appearance: none;
              -webkit-border-radius: 0;
              border-radius: inherit;
              background-clip: padding-box;
              touch-action: manipulation;
            }
            
            /* Fix input appearance on iOS */
            input[type="text"], input[type="email"], input[type="tel"], 
            input[type="number"], textarea, select {
              -webkit-appearance: none;
              -webkit-border-radius: 0;
              border-radius: inherit;
              background-clip: padding-box;
            }
            
            /* Fix sticky positioning issues */
            .sticky {
              position: -webkit-sticky;
              position: sticky;
            }
          }
          
          /* Fix 2: Cross-browser flexbox and grid issues */
          .grid {
            display: -ms-grid;
            display: grid;
          }
          
          .flex {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
          }
          
          .items-center {
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
          }
          
          .justify-center {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
          }
          
          /* Fix 3: Ensure minimum touch targets */
          @media (max-width: 768px) {
            button, .btn, [role="button"], a.btn {
              min-height: 44px;
              min-width: 44px;
              padding: 12px 16px;
            }
            
            /* Fix text wrapping issues on mobile */
            .text-4xl { font-size: clamp(1.875rem, 5vw, 2.25rem); }
            .text-5xl { font-size: clamp(2.25rem, 6vw, 3rem); }
            .text-6xl { font-size: clamp(2.5rem, 7vw, 3.75rem); }
            
            /* Fix spacing on mobile */
            .container {
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }
          
          /* Fix 4: Prevent layout shifts and flickering */
          * {
            -webkit-tap-highlight-color: transparent;
          }
          
          img {
            max-width: 100%;
            height: auto;
            display: block;
          }
          
          /* Fix 5: Dark mode consistency */
          [data-theme="dark"] {
            color-scheme: dark;
          }
          
          [data-theme="light"] {
            color-scheme: light;
          }
          
          /* Fix 6: Form element consistency */
          input, textarea, select {
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
          }
          
          /* Fix 7: Smooth scrolling with reduced motion support */
          @media (prefers-reduced-motion: no-preference) {
            html {
              scroll-behavior: smooth;
            }
          }
          
          /* Fix 8: High contrast mode support */
          @media (prefers-contrast: high) {
            * {
              text-shadow: none !important;
              box-shadow: none !important;
            }
            
            button, .btn {
              border: 2px solid currentColor !important;
            }
          }
          
          /* Fix 9: Focus indicators for accessibility */
          *:focus-visible {
            outline: 2px solid hsl(var(--primary));
            outline-offset: 2px;
            border-radius: 4px;
          }
          
          /* Fix 10: Prevent zoom on iOS form inputs */
          @media screen and (max-width: 768px) {
            input[type="text"], input[type="email"], input[type="tel"],
            input[type="number"], textarea, select {
              font-size: 16px !important;
            }
          }
        `;
        
        document.head.appendChild(iosSafariFixStyle);
        
        // Fix 2: Ensure proper error boundaries don't interfere with display
        const errorElements = document.querySelectorAll('[data-error-boundary]');
        errorElements.forEach((element: Element) => {
          const htmlElement = element as HTMLElement;
          if (htmlElement.style.display === 'none') {
            htmlElement.style.display = '';
          }
        });
        
        // Fix 3: Handle images without alt attributes
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        imagesWithoutAlt.forEach((img: Element) => {
          const imgElement = img as HTMLImageElement;
          const title = imgElement.getAttribute('title');
          imgElement.setAttribute('alt', title || 'Image');
        });
        
        // Fix 4: Ensure proper ARIA attributes for buttons
        const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
        buttons.forEach((button: Element) => {
          const buttonElement = button as HTMLButtonElement;
          const textContent = buttonElement.textContent?.trim();
          if (textContent && !buttonElement.getAttribute('aria-label')) {
            buttonElement.setAttribute('aria-label', textContent);
          }
        });
        
        // Fix 5: Handle viewport meta tag for proper mobile rendering
        let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
        if (!viewportMeta) {
          viewportMeta = document.createElement('meta');
          viewportMeta.name = 'viewport';
          document.head.appendChild(viewportMeta);
        }
        viewportMeta.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
        
        // Fix 6: Ensure proper charset
        let charsetMeta = document.querySelector('meta[charset]');
        if (!charsetMeta) {
          charsetMeta = document.createElement('meta');
          charsetMeta.setAttribute('charset', 'utf-8');
          document.head.insertBefore(charsetMeta, document.head.firstChild);
        }
        
      } catch (error) {
        // Silent error handling to prevent blocking
        console.debug('UnifiedErrorFix: Non-critical error handled silently');
      }
    }, 100); // Minimal delay to ensure DOM is ready
    
    return () => clearTimeout(timer);
  }, []);
  
  return null;
};

export default UnifiedErrorFix;