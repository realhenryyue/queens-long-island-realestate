import { useEffect } from 'react';

export const SEOValidator = () => {
  useEffect(() => {
    const validateSEO = () => {
      const issues: string[] = [];
      const warnings: string[] = [];

      // Check meta title
      const title = document.querySelector('title');
      if (!title || !title.textContent) {
        issues.push('Missing page title');
      } else if (title.textContent.length > 60) {
        warnings.push('Page title exceeds 60 characters');
      }

      // Check meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription || !metaDescription.getAttribute('content')) {
        issues.push('Missing meta description');
      } else {
        const descLength = metaDescription.getAttribute('content')?.length || 0;
        if (descLength > 160) {
          warnings.push('Meta description exceeds 160 characters');
        }
      }

      // Check H1 tags
      const h1Tags = document.querySelectorAll('h1');
      if (h1Tags.length === 0) {
        issues.push('Missing H1 tag');
      } else if (h1Tags.length > 1) {
        warnings.push('Multiple H1 tags found (should be unique)');
      }

      // Check images without alt text
      const images = document.querySelectorAll('img');
      const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'));
      if (imagesWithoutAlt.length > 0) {
        warnings.push(`${imagesWithoutAlt.length} images missing alt text`);
      }

      // Check canonical URL
      const canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        warnings.push('Missing canonical URL');
      }

      // Check Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      
      if (!ogTitle) warnings.push('Missing Open Graph title');
      if (!ogDescription) warnings.push('Missing Open Graph description');
      if (!ogImage) warnings.push('Missing Open Graph image');

      // Check structured data
      const structuredData = document.querySelector('script[type="application/ld+json"]');
      if (!structuredData) {
        warnings.push('Missing structured data (JSON-LD)');
      }

      // Check viewport meta tag
      const viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        issues.push('Missing viewport meta tag');
      }

      // Check language attribute
      if (!document.documentElement.getAttribute('lang')) {
        warnings.push('Missing lang attribute on html element');
      }

      // Check for mobile-friendly indicators
      const mobileViewport = viewport?.getAttribute('content')?.includes('width=device-width');
      if (!mobileViewport) {
        issues.push('Viewport not optimized for mobile');
      }

      // Performance checks
      const criticalCSS = document.querySelector('style');
      if (!criticalCSS) {
        warnings.push('No critical CSS found inline');
      }

      // Check for external resource preloading
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      if (preloadLinks.length === 0) {
        warnings.push('No resource preloading detected');
      }

      // Accessibility checks
      const skipLinks = document.querySelectorAll('a[href^="#"]');
      if (skipLinks.length === 0) {
        warnings.push('No skip navigation links found');
      }

      // Cross-browser compatibility checks
      const modernFeatures = [
        'IntersectionObserver',
        'ResizeObserver',
        'fetch',
        'Promise'
      ];

      const missingFeatures = modernFeatures.filter(feature => !(feature in window));
      if (missingFeatures.length > 0) {
        warnings.push(`Missing modern features: ${missingFeatures.join(', ')}`);
      }

      // Log results
      if (issues.length > 0) {
        console.group('🚨 SEO Critical Issues');
        issues.forEach(issue => console.error('❌', issue));
        console.groupEnd();
      }

      if (warnings.length > 0) {
        console.group('⚠️ SEO Warnings');
        warnings.forEach(warning => console.warn('⚠️', warning));
        console.groupEnd();
      }

      if (issues.length === 0 && warnings.length === 0) {
        console.log('✅ SEO validation passed - no critical issues found');
      }

      // Return summary for potential UI display
      return {
        critical: issues.length,
        warnings: warnings.length,
        issues: issues,
        warningMessages: warnings,
        score: Math.max(0, 100 - (issues.length * 20) - (warnings.length * 5))
      };
    };

    // Run validation after DOM is fully loaded
    const runValidation = () => {
      setTimeout(() => {
        try {
          const results = validateSEO();
          
          // Store results for potential debugging
          if (typeof window !== 'undefined') {
            (window as any).seoValidationResults = results;
          }
        } catch (err) {
          console.warn('SEO validation failed:', err);
        }
      }, 2000); // Allow time for dynamic content to load
    };

    // Run validation when component mounts
    runValidation();

    // Re-run validation on route changes
    const handleRouteChange = () => {
      setTimeout(runValidation, 1000);
    };

    window.addEventListener('popstate', handleRouteChange);
    
    // Clean up
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return null;
};