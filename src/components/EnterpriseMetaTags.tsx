import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const EnterpriseMetaTags = () => {
  const { currentLanguage } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Remove existing duplicate meta tags to prevent conflicts
    const existingMetas = document.querySelectorAll('meta[data-enterprise="true"]');
    existingMetas.forEach(meta => meta.remove());

    // Optimized titles under 60 characters with high-value keywords
    const title = currentLanguage === 'zh' 
      ? 'Henry岳 - NYC房地产AI专家 | ROI计算器'
      : 'Henry Yue - NYC Real Estate Expert | ROI Calculator';
    
    document.title = title;
    
    // Optimized meta description under 160 characters with compelling CTA
    const description = currentLanguage === 'zh'
      ? 'NYC房地产专家Henry岳，15年经验。免费ROI计算器，五大区投资分析。咨询 718-717-5210'
      : 'NYC Real Estate Expert Henry Yue, 15+ years exp. Free ROI calculator, 5-borough analysis. Call 718-717-5210';
    
    // Enhanced keywords with long-tail variations
    const keywords = currentLanguage === 'zh'
      ? 'Henry岳,NYC房地产AI,纽约投资分析,ROI计算器,五大区地产,曼哈顿投资,皇后区房产,华人经纪,双语服务,718-717-5210'
      : 'Henry Yue,NYC real estate AI,New York investment analysis,ROI calculator,5 boroughs real estate,Manhattan investment,Queens property,Chinese agent,bilingual service,718-717-5210';

    // Update or create meta tags with enterprise flag
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: 'Henry Yue' },
      { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' },
      { name: 'googlebot', content: 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1' },
      { name: 'bingbot', content: 'index,follow' },
      { name: 'rating', content: 'general' },
      { name: 'distribution', content: 'global' },
      { name: 'revisit-after', content: '1 days' },
      { name: 'language', content: currentLanguage === 'zh' ? 'zh-CN' : 'en-US' },
      { name: 'geo.region', content: 'US-NY' },
      { name: 'geo.placename', content: 'New York City, Queens, Manhattan, Brooklyn' },
      { name: 'geo.position', content: '40.7589;-73.8365' },
      { name: 'ICBM', content: '40.7589,-73.8365' },
      { name: 'contact', content: '718-717-5210' },
      { name: 'copyright', content: 'Henry Yue Real Estate' },
      { name: 'classification', content: 'Real Estate Investment Analysis' },
      { name: 'category', content: 'Real Estate,Investment,NYC,Property Analysis' },
      { name: 'coverage', content: 'Manhattan,Queens,Brooklyn,Bronx,Staten Island,Nassau County' },
      { name: 'target', content: 'real estate investors,property buyers,Chinese clients' },
      { name: 'audience', content: 'real estate investors,home buyers,international clients' }
    ];

    metaTags.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('data-enterprise', 'true');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Enhanced Open Graph tags with proper image dimensions
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://realhenryyue.com' },
      { property: 'og:locale', content: currentLanguage === 'zh' ? 'zh_CN' : 'en_US' },
      { property: 'og:locale:alternate', content: currentLanguage === 'zh' ? 'en_US' : 'zh_CN' },
      { property: 'og:site_name', content: 'Henry Yue Real Estate' },
      { property: 'og:image', content: 'https://realhenryyue.com/assets/agent-photo.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:alt', content: currentLanguage === 'zh' ? 'Henry岳 - NYC房地产AI投资专家' : 'Henry Yue - NYC Real Estate AI Investment Expert' }
    ];

    ogTags.forEach(({ property, content }) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('data-enterprise', 'true');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Enhanced Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: 'https://realhenryyue.com/assets/agent-photo.jpg' },
      { name: 'twitter:image:alt', content: currentLanguage === 'zh' ? 'Henry岳专业房地产服务' : 'Henry Yue Professional Real Estate Services' },
      { name: 'twitter:site', content: '@RealHenryYue' },
      { name: 'twitter:creator', content: '@RealHenryYue' }
    ];

    twitterTags.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('data-enterprise', 'true');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Set canonical URL (unified domain without www)
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('data-enterprise', 'true');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://realhenryyue.com');

    // Add hreflang tags for proper international SEO
    const hreflangs = [
      { lang: 'zh-CN', href: 'https://realhenryyue.com' },
      { lang: 'en-US', href: 'https://realhenryyue.com/en' },
      { lang: 'x-default', href: 'https://realhenryyue.com' }
    ];

    // Remove existing hreflang tags
    const existingHreflangs = document.querySelectorAll('link[hreflang]');
    existingHreflangs.forEach(link => link.remove());

    hreflangs.forEach(({ lang, href }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', href);
      link.setAttribute('data-enterprise', 'true');
      document.head.appendChild(link);
    });

    // Add structured data for business hours
    const businessHoursScript = document.createElement('script');
    businessHoursScript.type = 'application/ld+json';
    businessHoursScript.setAttribute('data-enterprise', 'true');
    businessHoursScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    });
    document.head.appendChild(businessHoursScript);

    setIsLoaded(true);
  }, [currentLanguage]);

  // Add performance optimization
  useEffect(() => {
    if (isLoaded) {
      // Preload critical resources
      const preloadLinks = [
        { href: 'https://fonts.googleapis.com', rel: 'preconnect', crossOrigin: 'anonymous' },
        { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossOrigin: 'anonymous' },
        { href: 'https://www.google-analytics.com', rel: 'dns-prefetch' },
        { href: 'https://www.googletagmanager.com', rel: 'dns-prefetch' }
      ];

      preloadLinks.forEach(({ href, rel, crossOrigin }) => {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const link = document.createElement('link');
          link.setAttribute('rel', rel);
          link.setAttribute('href', href);
          if (crossOrigin) link.setAttribute('crossorigin', crossOrigin);
          link.setAttribute('data-enterprise', 'true');
          document.head.appendChild(link);
        }
      });
    }
  }, [isLoaded]);

  return null;
};