import React from 'react';

export const OptimizedComponentLoader = () => {
  React.useEffect(() => {
    // Cleanup redundant meta tags to prevent conflicts
    const removeRedundantMetaTags = () => {
      // Remove duplicate meta descriptions
      const metaDescriptions = document.querySelectorAll('meta[name="description"]');
      if (metaDescriptions.length > 1) {
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
      const ogTags = ['og:title', 'og:description', 'og:image', 'og:url'];
      ogTags.forEach(property => {
        const elements = document.querySelectorAll(`meta[property="${property}"]`);
        if (elements.length > 1) {
          for (let i = 1; i < elements.length; i++) {
            elements[i].remove();
          }
        }
      });

      // Clean up any orphaned schema scripts
      const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
      const validSchemas = new Set();
      schemaScripts.forEach(script => {
        try {
          const content = JSON.parse(script.textContent || '');
          const schemaType = content['@type'];
          if (validSchemas.has(schemaType)) {
            script.remove();
          } else {
            validSchemas.add(schemaType);
          }
        } catch (e) {
          // Remove invalid JSON-LD
          script.remove();
        }
      });
    };

    // Run cleanup after all components have mounted
    const timeoutId = setTimeout(removeRedundantMetaTags, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return null;
};
