import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const SEOEnhancer = () => {
  const { language, t } = useLanguage();

  useEffect(() => {
    // Enhanced meta tags for better SEO
    const updateEnhancedMetaTags = () => {
      // Update language attribute
      document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en-US';
      
      // Add/update additional meta tags
      const metaTags = [
        { name: 'geo.region', content: 'US-NY' },
        { name: 'geo.placename', content: 'New York' },
        { name: 'geo.position', content: '40.7589;-73.8365' },
        { name: 'ICBM', content: '40.7589, -73.8365' },
        { name: 'distribution', content: 'global' },
        { name: 'rating', content: 'general' },
        { name: 'revisit-after', content: '7 days' },
        { name: 'expires', content: 'never' },
        { name: 'coverage', content: 'worldwide' },
        { name: 'target', content: 'all' },
        { name: 'HandheldFriendly', content: 'True' },
        { name: 'MobileOptimized', content: '320' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'msapplication-TileColor', content: '#1a365d' },
        { name: 'msapplication-config', content: '/browserconfig.xml' }
      ];

      metaTags.forEach(({ name, content }) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      });

      // Update Open Graph tags dynamically
      const ogTags = [
        { property: 'og:title', content: t('seo.shareTitle') },
        { property: 'og:description', content: t('seo.shareDescription') },
        { property: 'og:locale', content: language === 'zh' ? 'zh_CN' : 'en_US' },
        { property: 'og:updated_time', content: new Date().toISOString() },
        { property: 'article:modified_time', content: new Date().toISOString() }
      ];

      ogTags.forEach(({ property, content }) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      });
    };

    // Add breadcrumb structured data
    const addBreadcrumbData = () => {
      const breadcrumbScript = document.getElementById('breadcrumb-ld');
      if (breadcrumbScript) {
        breadcrumbScript.remove();
      }

      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.realhenryyue.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About",
            "item": "https://www.realhenryyue.com/#about"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Services",
            "item": "https://www.realhenryyue.com/#services"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Contact",
            "item": "https://www.realhenryyue.com/#contact"
          }
        ]
      };

      const script = document.createElement('script');
      script.id = 'breadcrumb-ld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(breadcrumbData);
      document.head.appendChild(script);
    };

    // Add FAQ structured data
    const addFAQData = () => {
      const faqScript = document.getElementById('faq-ld');
      if (faqScript) {
        faqScript.remove();
      }

      const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What areas does Henry Yue serve in New York?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Henry Yue serves Queens, Long Island, Manhattan, Brooklyn, Bronx, and anywhere in New York State. He has specialized expertise in Flushing, Great Neck, and Nassau County areas."
            }
          },
          {
            "@type": "Question",
            "name": "Is Henry Yue a licensed real estate agent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Henry Yue is a licensed New York State real estate salesperson with extensive experience in residential and commercial properties."
            }
          },
          {
            "@type": "Question",
            "name": "Does Henry Yue provide bilingual services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Henry Yue provides professional bilingual services in both English and Chinese, with deep understanding of diverse community needs."
            }
          },
          {
            "@type": "Question",
            "name": "What types of properties does Henry Yue specialize in?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Henry specializes in residential sales, commercial properties, investment properties, first-time buyer support, and property management services."
            }
          }
        ]
      };

      const script = document.createElement('script');
      script.id = 'faq-ld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(faqData);
      document.head.appendChild(script);
    };

    // Add review schema
    const addReviewSchema = () => {
      const reviewScript = document.getElementById('review-ld');
      if (reviewScript) {
        reviewScript.remove();
      }

      const reviewData = {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "LocalBusiness",
          "name": "Henry Yue Real Estate Services"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Satisfied Client"
        },
        "reviewBody": "Henry provided exceptional service throughout our home buying process. His bilingual expertise and local market knowledge made all the difference."
      };

      const script = document.createElement('script');
      script.id = 'review-ld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(reviewData);
      document.head.appendChild(script);
    };

    // Update all enhanced SEO data
    updateEnhancedMetaTags();
    addBreadcrumbData();
    addFAQData();
    addReviewSchema();

  }, [language, t]);

  return null;
};