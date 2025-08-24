import React from 'react';

export const OptimizedComponentLoader = () => {
  React.useEffect(() => {
    // Cleanup redundant SEO components to prevent conflicts
    const removeRedundantMetaTags = () => {
      // Remove duplicate meta descriptions
      const metaDescriptions = document.querySelectorAll('meta[name="description"]');
      if (metaDescriptions.length > 1) {
        // Keep only the first one, remove others
        for (let i = 1; i < metaDescriptions.length; i++) {
          metaDescriptions[i].remove();
        }
      }

      // Remove duplicate titles
      const titles = document.querySelectorAll('title');
      if (titles.length > 1) {
        for (let i = 1; i < titles.length; i++) {
          titles[i].remove();
        }
      }

      // Remove duplicate Open Graph tags
      const ogTags = ['og:title', 'og:description', 'og:image'];
      ogTags.forEach(property => {
        const elements = document.querySelectorAll(`meta[property="${property}"]`);
        if (elements.length > 1) {
          for (let i = 1; i < elements.length; i++) {
            elements[i].remove();
          }
        }
      });
    };

    // Run cleanup after all components have mounted
    const timeoutId = setTimeout(removeRedundantMetaTags, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return null;
};
