import { useEffect } from 'react';

const MobileOptimization = () => {
  useEffect(() => {
    // Lightweight mobile optimizations that don't interfere with iPad Chrome
    const timer = setTimeout(() => {
      try {
        const style = document.createElement('style');
        style.setAttribute('data-mobile-optimization', 'true');
        style.textContent = `
          /* Essential mobile optimizations only */
          @media (max-width: 768px) {
            button, .btn, [role="button"], a {
              min-height: 44px;
              min-width: 44px;
              touch-action: manipulation;
            }
            
            /* Responsive typography */
            .text-4xl { font-size: clamp(1.875rem, 5vw, 2.25rem); }
            .text-5xl { font-size: clamp(2.25rem, 6vw, 3rem); }
            .text-6xl { font-size: clamp(2.5rem, 7vw, 3.75rem); }
            
            /* Improved spacing */
            .container { padding-left: 1rem; padding-right: 1rem; }
            .p-6 { padding: 1rem; }
            .gap-8 { gap: 1rem; }
            .gap-12 { gap: 1.5rem; }
          }
          
          /* iOS Safari specific fixes without breaking iPad Chrome */
          @supports (-webkit-touch-callout: none) and (not (user-agent: *Chrome*)) {
            .min-h-screen {
              min-height: -webkit-fill-available;
            }
            body {
              min-height: -webkit-fill-available;
            }
          }
          
          /* Touch device optimizations */
          @media (pointer: coarse) {
            * {
              touch-action: manipulation;
              -webkit-tap-highlight-color: transparent;
            }
          }
        `;
        document.head.appendChild(style);
      } catch (error) {
        // Silent error handling
      }
    }, 100); // Minimal delay to avoid blocking

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default MobileOptimization;