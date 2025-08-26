import { useEffect } from 'react';

/**
 * Responsive layout component that ensures perfect display across all devices
 * Specifically addresses overlapping issues and spacing problems
 */
const ResponsiveLayout = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.setAttribute('data-responsive-layout', 'true');
    style.textContent = `
      /* Comprehensive responsive layout fixes */
      
      /* Container and spacing standardization */
      .container {
        width: 100% !important;
        max-width: 1400px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        padding-left: 1rem !important;
        padding-right: 1rem !important;
      }
      
      @media (min-width: 640px) {
        .container { padding-left: 2rem !important; padding-right: 2rem !important; }
      }
      
      /* Fix overlapping sections - ROI Calculator and Cap Rate */
      section {
        position: relative !important;
        z-index: 1 !important;
        margin-bottom: 2rem !important;
        clear: both !important;
      }
      
      section + section {
        margin-top: 0 !important;
        padding-top: 2rem !important;
      }
      
      /* Card component fixes */
      .card, [class*="card"] {
        position: relative !important;
        z-index: 2 !important;
        margin-bottom: 1rem !important;
        box-sizing: border-box !important;
      }
      
      /* Grid system fixes */
      .grid {
        display: grid !important;
        gap: 1rem !important;
      }
      
      .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
      .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
      .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
      .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
      
      /* Responsive grid breakpoints */
      @media (max-width: 767px) {
        .md\\:grid-cols-2, .md\\:grid-cols-3, .md\\:grid-cols-4 {
          grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
        }
        .sm\\:grid-cols-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }
      }
      
      @media (min-width: 768px) {
        .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        .md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
      }
      
      @media (min-width: 1024px) {
        .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
      }
      
      /* Typography scaling fixes */
      @media (max-width: 640px) {
        .text-4xl { font-size: clamp(1.75rem, 8vw, 2.25rem) !important; line-height: 1.2 !important; }
        .text-3xl { font-size: clamp(1.5rem, 6vw, 1.875rem) !important; line-height: 1.3 !important; }
        .text-2xl { font-size: clamp(1.25rem, 5vw, 1.5rem) !important; line-height: 1.4 !important; }
        .text-xl { font-size: clamp(1.125rem, 4vw, 1.25rem) !important; line-height: 1.5 !important; }
      }
      
      /* Padding and margin standardization */
      @media (max-width: 767px) {
        .py-16 { padding-top: 3rem !important; padding-bottom: 3rem !important; }
        .py-12 { padding-top: 2.5rem !important; padding-bottom: 2.5rem !important; }
        .py-8 { padding-top: 2rem !important; padding-bottom: 2rem !important; }
        .px-6 { padding-left: 1rem !important; padding-right: 1rem !important; }
        .px-4 { padding-left: 0.75rem !important; padding-right: 0.75rem !important; }
        .gap-8 { gap: 1rem !important; }
        .gap-6 { gap: 0.75rem !important; }
        .gap-4 { gap: 0.5rem !important; }
        .space-y-8 > * + * { margin-top: 1.5rem !important; }
        .space-y-6 > * + * { margin-top: 1rem !important; }
        .mb-12 { margin-bottom: 2rem !important; }
        .mb-8 { margin-bottom: 1.5rem !important; }
      }
      
      /* iPad Pro specific optimizations */
      @media (min-width: 1024px) and (max-width: 1366px) {
        .container { max-width: 1200px !important; }
        
        /* Ensure proper scaling on iPad Pro */
        .text-4xl { font-size: 2.5rem !important; }
        .text-3xl { font-size: 2rem !important; }
        .text-2xl { font-size: 1.75rem !important; }
        
        /* Optimize card layouts for iPad Pro */
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
      }
      
      /* Landscape mode optimizations */
      @media (orientation: landscape) and (max-height: 600px) {
        .py-16 { padding-top: 2rem !important; padding-bottom: 2rem !important; }
        .py-12 { padding-top: 1.5rem !important; padding-bottom: 1.5rem !important; }
        .text-4xl { font-size: 2rem !important; }
        .text-3xl { font-size: 1.75rem !important; }
      }
      
      /* High DPI display optimizations */
      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        * {
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
        }
      }
      
      /* Prevent horizontal scrolling */
      body, html {
        overflow-x: hidden !important;
        width: 100% !important;
        max-width: 100% !important;
      }
      
      /* Fix for flexbox and grid alignment */
      .flex {
        align-items: stretch !important;
      }
      
      .flex > * {
        flex-shrink: 0 !important;
      }
      
      /* Ensure images don't break layout */
      img {
        max-width: 100% !important;
        height: auto !important;
        display: block !important;
      }
      
      /* Fix tab navigation on mobile */
      @media (max-width: 640px) {
        [role="tablist"] {
          display: flex !important;
          flex-direction: column !important;
          gap: 0.25rem !important;
        }
        
        [role="tab"] {
          white-space: normal !important;
          text-align: center !important;
          padding: 0.5rem !important;
          font-size: 0.875rem !important;
        }
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      const existingStyle = document.querySelector('[data-responsive-layout]');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return null;
};

export default ResponsiveLayout;