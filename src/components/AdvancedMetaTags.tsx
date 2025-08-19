import { useEffect } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

export const AdvancedMetaTags = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Advanced Meta Tags implementation using direct DOM manipulation
    const metaTags = [
      { name: 'author', content: 'Henry Yue' },
      { name: 'copyright', content: '© 2024 Henry Yue Real Estate. All rights reserved.' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'bingbot', content: 'index, follow' },
      { name: 'rating', content: 'general' },
      { name: 'distribution', content: 'global' },
      { name: 'revisit-after', content: '1 days' },
      { name: 'expires', content: 'never' },
      { name: 'coverage', content: 'worldwide' },
      { name: 'target', content: 'all' },
      { name: 'HandheldFriendly', content: 'true' },
      { name: 'MobileOptimized', content: 'width' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'apple-mobile-web-app-title', content: 'Henry Yue Real Estate' },
      { name: 'application-name', content: 'Henry Yue Real Estate' },
      { name: 'msapplication-TileColor', content: '#2563eb' },
      { name: 'msapplication-config', content: '/browserconfig.xml' },
      { name: 'theme-color', content: '#2563eb' }
    ];

    // Language specific meta tags
    const httpEquivTags = [
      { httpEquiv: 'content-language', content: language === 'zh' ? 'zh-CN' : 'en-US' }
    ];

    // Property based meta tags
    const propertyTags = [
      { property: 'og:locale', content: language === 'zh' ? 'zh_CN' : 'en_US' },
      { property: 'og:locale:alternate', content: language === 'zh' ? 'en_US' : 'zh_CN' },
      { property: 'og:updated_time', content: new Date().toISOString() },
      { property: 'og:rich_attachment', content: 'true' },
      { property: 'business:contact_data:phone_number', content: '+17187175210' },
      { property: 'business:contact_data:website', content: 'https://www.realhenryyue.com' },
      { property: 'article:author', content: 'Henry Yue' },
      { property: 'article:published_time', content: '2024-01-01T00:00:00Z' },
      { property: 'article:modified_time', content: new Date().toISOString() },
      { property: 'article:section', content: 'Real Estate' },
      { property: 'twitter:domain', content: 'realhenryyue.com' },
      { property: 'twitter:label1', content: 'Service Areas' },
      { property: 'twitter:data1', content: 'Queens, Long Island, Manhattan' },
      { property: 'twitter:label2', content: 'Languages' },
      { property: 'twitter:data2', content: 'English, Chinese' }
    ];

    // Business contact meta tags
    const businessTags = [
      { name: 'business:contact_data:street_address', content: '41-25 Kissena Blvd Suite 126' },
      { name: 'business:contact_data:locality', content: 'Flushing' },
      { name: 'business:contact_data:region', content: 'NY' },
      { name: 'business:contact_data:postal_code', content: '11355' },
      { name: 'business:contact_data:country_name', content: 'United States' },
      { name: 'business:contact_data:phone_number', content: '+17187175210' },
      { name: 'business:contact_data:email', content: 'forangh@gmail.com' }
    ];

    // Function to add/update meta tags
    const updateMetaTags = (tags: Array<{name?: string, content: string, property?: string, httpEquiv?: string}>) => {
      tags.forEach(({ name, content, property, httpEquiv }) => {
        let selector = '';
        let attr = '';
        
        if (name) {
          selector = `meta[name="${name}"]`;
          attr = 'name';
        } else if (property) {
          selector = `meta[property="${property}"]`;
          attr = 'property';
        } else if (httpEquiv) {
          selector = `meta[http-equiv="${httpEquiv}"]`;
          attr = 'http-equiv';
        }
        
        let meta = document.querySelector(selector) as HTMLMetaElement;
        if (!meta) {
          meta = document.createElement('meta');
          if (name) meta.setAttribute('name', name);
          if (property) meta.setAttribute('property', property);
          if (httpEquiv) meta.setAttribute('http-equiv', httpEquiv);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      });
    };

    // Apply all meta tags
    updateMetaTags(metaTags);
    updateMetaTags(httpEquivTags);
    updateMetaTags(propertyTags);
    updateMetaTags(businessTags);

  }, [language]);

  return null;
};