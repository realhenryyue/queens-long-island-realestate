import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const SEOHead = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    // Update document title with location-specific keywords
    const title = language === 'zh' 
      ? 'Henry岳先生 - NYC纽约房地产经纪人 | 曼哈顿皇后区地产专家 | 华人买房投资首选'
      : 'Henry Yue - Top NYC Real Estate Agent | Queens Manhattan Long Island | Licensed NY Property Expert';
    document.title = title;
    
    // Update meta description with enhanced local SEO
    const description = language === 'zh'
      ? 'Henry岳先生，纽约州持牌房地产经纪人，专业服务曼哈顿、皇后区、长岛地区。提供华人买房、海外投资、法拉盛商业楼等服务。15年经验，双语专业，客户满意度98%以上。免费咨询热线: 718-717-5210'
      : 'Henry Yue, Licensed NYC Real Estate Agent with 15+ years experience. Specializing in Queens, Manhattan, Long Island properties. Expert in residential sales, commercial investment, first-time buyer services. Bilingual Chinese-English support. Call 718-717-5210 for free consultation.';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = description;
      document.head.appendChild(newMetaDescription);
    }
    
    // Enhanced keywords for better ranking
    const keywords = language === 'zh'
      ? 'Henry岳先生, NYC纽约房地产经纪人, 曼哈顿地产经纪, 皇后区房产专家, 法拉盛商业楼, 华人买房经纪, 海外房产投资, 长岛地产服务, 纽约持牌经纪人, 双语地产服务, 学区房投资, 商业地产投资, 新房销售, 二手房买卖, 房产估价'
      : 'Henry Yue, NYC real estate agent, New York property expert, Queens real estate, Manhattan homes, Long Island properties, licensed NY agent, bilingual realtor, commercial real estate NYC, residential sales, property investment, first time home buyer, luxury homes NYC, condo sales, house hunting';
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const newMetaKeywords = document.createElement('meta');
      newMetaKeywords.name = 'keywords';
      newMetaKeywords.content = keywords;
      document.head.appendChild(newMetaKeywords);
    }

    // Add hreflang attributes dynamically
    const existingHreflang = document.querySelectorAll('link[hreflang]');
    existingHreflang.forEach(link => link.remove());

    const baseUrl = window.location.origin;
    const currentPath = window.location.pathname;
    const canonicalUrl = `${baseUrl}${currentPath}`;
    const hreflangs = [
      { lang: 'zh-CN', href: `${baseUrl}${currentPath}?lang=zh` },
      { lang: 'en-US', href: `${baseUrl}${currentPath}?lang=en` },
      { lang: 'x-default', href: `${baseUrl}${currentPath}` }
    ];

    hreflangs.forEach(({ lang, href }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = href;
      document.head.appendChild(link);
    });

    // Add geo-targeting meta tags
    const geoMeta = [
      { name: 'geo.region', content: 'US-NY' },
      { name: 'geo.placename', content: 'New York City' },
      { name: 'geo.position', content: '40.7128;-74.0060' },
      { name: 'ICBM', content: '40.7128, -74.0060' }
    ];

    geoMeta.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        (meta as HTMLMetaElement).name = name;
        document.head.appendChild(meta);
      }
      (meta as HTMLMetaElement).content = content;
    });

    // Add canonical URL to prevent duplicate content
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = canonicalUrl;
    document.head.appendChild(canonical);

    // Update Open Graph tags
    const ogMeta = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:locale', content: language === 'zh' ? 'zh_CN' : 'en_US' },
      { property: 'og:site_name', content: 'RealHenryYue.com' }
    ];

    ogMeta.forEach(({ property, content }) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      (meta as HTMLMetaElement).content = content;
    });

    // Add JSON-LD structured data for better local SEO
    const existingLD = document.querySelector('script[type="application/ld+json"]#seo-structured-data');
    if (existingLD) {
      existingLD.remove();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": language === 'zh' ? "Henry岳先生 (Hongyu Yue)" : "Hongyu (Henry) Yue",
      "alternateName": "Henry Yue",
      "url": window.location.origin,
      "description": description,
      "telephone": "+1-718-717-5210",
      "email": "forangh@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "addressCountry": "US"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Queens",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Queens",
            "addressRegion": "NY",
            "addressCountry": "US"
          }
        },
        {
          "@type": "City", 
          "name": "Manhattan",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Manhattan",
            "addressRegion": "NY",
            "addressCountry": "US"
          }
        },
        {
          "@type": "Place",
          "name": "Long Island",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Long Island",
            "addressRegion": "NY",
            "addressCountry": "US"
          }
        }
      ],
      "knowsLanguage": ["zh-CN", "en-US"],
      "jobTitle": "Licensed Real Estate Salesperson",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "150",
        "bestRating": "5"
      },
      "priceRange": "$$",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": language === 'zh' ? "房地产服务" : "Real Estate Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": language === 'zh' ? "住宅买卖服务" : "Residential Sales",
              "description": language === 'zh' ? "专业住宅房产买卖服务" : "Expert residential property buying and selling services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": language === 'zh' ? "商业地产投资" : "Commercial Real Estate Investment",
              "description": language === 'zh' ? "商业地产投资咨询与服务" : "Commercial property investment consultation and services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": language === 'zh' ? "首次购房指导" : "First-Time Buyer Services", 
              "description": language === 'zh' ? "首次购房者专业指导服务" : "Professional guidance for first-time home buyers"
            }
          }
        ]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'seo-structured-data';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, [t, language]);

  return null;
};