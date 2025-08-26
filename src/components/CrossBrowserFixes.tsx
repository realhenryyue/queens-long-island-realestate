import { useEffect } from 'react';

/**
 * Cross-browser compatibility fixes for Chrome, Safari, Firefox, and Edge
 * Ensures identical display across all browsers
 */
const CrossBrowserFixes = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.setAttribute('data-cross-browser-fixes', 'true');
    style.textContent = `
      /* Cross-browser normalization */
      * {
        box-sizing: border-box !important;
        -webkit-box-sizing: border-box !important;
        -moz-box-sizing: border-box !important;
      }
      
      html {
        -webkit-text-size-adjust: 100% !important;
        -ms-text-size-adjust: 100% !important;
        text-size-adjust: 100% !important;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
      }
      
      /* Safari specific fixes */
      @supports (-webkit-appearance: none) {
        button, input, select, textarea {
          -webkit-appearance: none !important;
        }
        
        .rounded {
          -webkit-border-radius: 0.375rem !important;
          border-radius: 0.375rem !important;
        }
        
        .rounded-lg {
          -webkit-border-radius: 0.5rem !important;
          border-radius: 0.5rem !important;
        }
        
        /* Fix Safari flexbox bugs */
        .flex {
          -webkit-box-align: stretch !important;
          -webkit-align-items: stretch !important;
          -ms-flex-align: stretch !important;
          align-items: stretch !important;
        }
        
        .flex > * {
          -webkit-flex-shrink: 0 !important;
          -ms-flex-negative: 0 !important;
          flex-shrink: 0 !important;
        }
      }
      
      /* Firefox specific fixes */
      @-moz-document url-prefix() {
        .grid {
          display: -moz-grid !important;
          display: grid !important;
        }
        
        button {
          -moz-appearance: none !important;
        }
        
        /* Fix Firefox grid gaps */
        .gap-4 { gap: 1rem !important; }
        .gap-6 { gap: 1.5rem !important; }
        .gap-8 { gap: 2rem !important; }
      }
      
      /* Edge/IE specific fixes */
      @supports (-ms-ime-align: auto) {
        .grid {
          display: -ms-grid !important;
          -ms-grid-columns: 1fr !important;
        }
        
        .grid-cols-2 {
          -ms-grid-columns: 1fr 1rem 1fr !important;
        }
        
        .grid-cols-3 {
          -ms-grid-columns: 1fr 1rem 1fr 1rem 1fr !important;
        }
        
        .flex {
          display: -ms-flexbox !important;
          -ms-flex-direction: row !important;
        }
      }
      
      /* Chrome specific optimizations */
      @supports (backdrop-filter: blur(10px)) {
        .backdrop-blur {
          -webkit-backdrop-filter: blur(10px) !important;
          backdrop-filter: blur(10px) !important;
        }
      }
      
      /* Consistent button styling across browsers */
      button, [role="button"] {
        background: none !important;
        border: none !important;
        padding: 0 !important;
        font: inherit !important;
        cursor: pointer !important;
        outline: inherit !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important;
      }
      
      /* Consistent form elements across browsers */
      input, select, textarea {
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important;
        background: inherit !important;
        border: inherit !important;
        font: inherit !important;
        margin: 0 !important;
      }
      
      /* Prevent iOS zoom on input focus */
      @supports (-webkit-touch-callout: none) {
        input, select, textarea {
          font-size: 16px !important;
        }
      }
      
      /* Consistent scrollbar styling */
      ::-webkit-scrollbar {
        width: 8px !important;
        height: 8px !important;
      }
      
      ::-webkit-scrollbar-track {
        background: hsl(var(--muted)) !important;
        border-radius: 4px !important;
      }
      
      ::-webkit-scrollbar-thumb {
        background: hsl(var(--muted-foreground)) !important;
        border-radius: 4px !important;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: hsl(var(--accent)) !important;
      }
      
      /* Firefox scrollbar */
      * {
        scrollbar-width: thin !important;
        scrollbar-color: hsl(var(--muted-foreground)) hsl(var(--muted)) !important;
      }
      
      /* Consistent text rendering */
      body, p, span, div, h1, h2, h3, h4, h5, h6 {
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
      }
      
      /* Fix for inconsistent line heights */
      * {
        line-height: inherit !important;
      }
      
      /* Consistent focus styles */
      *:focus-visible {
        outline: 2px solid hsl(var(--accent)) !important;
        outline-offset: 2px !important;
        border-radius: 4px !important;
      }
      
      /* Remove default browser focus styles */
      *:focus {
        outline: none !important;
      }
      
      /* Ensure consistent transform support */
      .transform {
        -webkit-transform: translateZ(0) !important;
        -moz-transform: translateZ(0) !important;
        -ms-transform: translateZ(0) !important;
        transform: translateZ(0) !important;
      }
      
      /* Consistent transition support */
      .transition, [class*="transition"] {
        -webkit-transition: all 0.15s ease-in-out !important;
        -moz-transition: all 0.15s ease-in-out !important;
        -ms-transition: all 0.15s ease-in-out !important;
        -o-transition: all 0.15s ease-in-out !important;
        transition: all 0.15s ease-in-out !important;
      }
      
      /* Gradient support normalization */
      .bg-gradient-to-r, .bg-gradient-to-br, [class*="bg-gradient"] {
        background-image: -webkit-linear-gradient(left, var(--tw-gradient-stops)) !important;
        background-image: -moz-linear-gradient(left, var(--tw-gradient-stops)) !important;
        background-image: -ms-linear-gradient(left, var(--tw-gradient-stops)) !important;
        background-image: -o-linear-gradient(left, var(--tw-gradient-stops)) !important;
        background-image: linear-gradient(to right, var(--tw-gradient-stops)) !important;
      }
      
      /* Ensure consistent animation support */
      @-webkit-keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @-moz-keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      /* Fix for touch devices */
      @media (hover: none) and (pointer: coarse) {
        .hover\\:scale-105:hover {
          transform: scale(1) !important;
        }
        
        .hover\\:bg-accent:hover {
          background-color: hsl(var(--accent)) !important;
        }
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      const existingStyle = document.querySelector('[data-cross-browser-fixes]');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return null;
};

export default CrossBrowserFixes;