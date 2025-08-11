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
    
    // Enhanced keywords for better ranking with investment analysis focus
    const keywords = language === 'zh'
      ? 'Henry岳先生, 纽约房产投资分析专家, NYC纽约房地产经纪人, 曼哈顿投资房产, 皇后区投资物业, 纽约投资型物业评估, 纽约买房现金回报率, 纽约多户型投资, 纽约房租盈利分析, 法拉盛商业楼投资, 华人买房投资经纪, 海外房产投资咨询, 长岛投资房产, 纽约持牌投资分析师, 双语房产投资服务, 学区房投资分析, 商业地产投资咨询, 纽约房产估值专家, 投资回报率计算, 房产现金流分析'
      : 'Henry Yue NYC real estate investment analysis, New York property investment expert, NYC investment property valuation, New York cap rate analysis, NY investment ROI calculator, invest in NYC rental condo, New York multifamily investment, NYC real estate trends analysis, NY property cash-on-cash return, Queens investment properties, Manhattan investment analysis, Long Island rental property, licensed NY investment specialist, bilingual real estate investment, commercial real estate investment NYC, residential investment analysis, property cash flow analysis, New York real estate market trends, investment property evaluation, NYC property investment consultant';
    
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
    
    // Determine the canonical URL and alternate language URLs
    let canonicalUrl = `${baseUrl}${currentPath}`;
    let alternateZh = `${baseUrl}/zh`;
    let alternateEn = `${baseUrl}/en`;
    
    // Normalize paths and set proper canonical
    if (currentPath.startsWith('/zh')) {
      canonicalUrl = `${baseUrl}/zh`;
      alternateEn = `${baseUrl}/en`;
    } else if (currentPath.startsWith('/en')) {
      canonicalUrl = `${baseUrl}/en`;
      alternateZh = `${baseUrl}/zh`;
    } else {
      // Default redirect case
      canonicalUrl = `${baseUrl}/en`;
      alternateZh = `${baseUrl}/zh`;
      alternateEn = `${baseUrl}/en`;
    }
    
    const hreflangs = [
      { lang: 'zh-CN', href: alternateZh },
      { lang: 'en-US', href: alternateEn },
      { lang: 'x-default', href: `${baseUrl}/en` }
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
      "name": language === 'zh' ? "岳鸿宇" : "Hongyu (Henry) Yue",
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