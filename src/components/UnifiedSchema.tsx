import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const UnifiedSchema = () => {
  const location = useLocation();
  const isChinesePath = location.pathname.startsWith('/zh');
  const language = isChinesePath ? 'zh' : 'en';

  useEffect(() => {
    // Remove all existing schemas to prevent duplicates
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(script => script.remove());

    // Single comprehensive schema with one aggregateRating
    const unifiedSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "RealEstateAgent",
          "@id": "https://www.realhenryyue.com/#person",
          "name": language === 'zh' ? "岳鸿宇" : "Hongyu (Henry) Yue",
          "alternateName": ["Henry Yue", "Henry岳先生"],
          "description": language === 'zh' 
            ? "纽约州持牌房地产经纪人，专业AI投资分析，服务五大区华人客户"
            : "Licensed NYC Real Estate Agent specializing in AI investment analysis for 5 boroughs",
          "url": "https://www.realhenryyue.com",
          "image": {
            "@type": "ImageObject",
            "url": "https://www.realhenryyue.com/assets/agent-photo.jpg",
            "width": 400,
            "height": 400
          },
          "telephone": "+1-718-717-5210",
          "email": "forangh@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "41-25 Kissena Blvd Suite 126",
            "addressLocality": "Flushing",
            "addressRegion": "NY",
            "postalCode": "11355",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "40.7589",
            "longitude": "-73.8365"
          },
          "areaServed": [
            { "@type": "City", "name": "Manhattan" },
            { "@type": "City", "name": "Queens" },
            { "@type": "City", "name": "Brooklyn" },
            { "@type": "City", "name": "Bronx" },
            { "@type": "City", "name": "Staten Island" },
            { "@type": "AdministrativeArea", "name": "Nassau County" }
          ],
          "knowsLanguage": [
            { "@type": "Language", "name": "Chinese" },
            { "@type": "Language", "name": "English" }
          ],
          "jobTitle": "Licensed Real Estate Salesperson",
          "hasCredential": {
            "@type": "EducationalOccupationalCredential",
            "name": "New York State Real Estate License"
          },
          // SINGLE aggregateRating - consolidated from all previous duplicates
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "150",
            "bestRating": "5",
            "worstRating": "1"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": language === 'zh' ? "房地产服务" : "Real Estate Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": language === 'zh' ? "AI投资分析" : "AI Investment Analysis",
                  "description": language === 'zh' ? "人工智能房产投资分析" : "AI-powered property investment analysis"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": language === 'zh' ? "双语服务" : "Bilingual Services",
                  "description": language === 'zh' ? "中英双语房地产服务" : "Chinese-English bilingual real estate services"
                }
              }
            ]
          }
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://www.realhenryyue.com/#business",
          "name": language === 'zh' ? "Henry岳房地产" : "Henry Yue Real Estate",
          "description": language === 'zh'
            ? "专业NYC房地产AI投资分析服务"
            : "Professional NYC real estate AI investment analysis services",
          "url": "https://www.realhenryyue.com",
          "telephone": "+1-718-717-5210",
          "email": "forangh@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "41-25 Kissena Blvd Suite 126",
            "addressLocality": "Flushing",
            "addressRegion": "NY",
            "postalCode": "11355",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "40.7589",
            "longitude": "-73.8365"
          },
          "openingHours": ["Mo-Fr 08:00-20:00", "Sa-Su 09:00-18:00"],
          "priceRange": "$$",
          "founder": { "@id": "https://www.realhenryyue.com/#person" },
          "employee": { "@id": "https://www.realhenryyue.com/#person" }
        },
        {
          "@type": "WebSite",
          "@id": "https://www.realhenryyue.com/#website",
          "url": "https://www.realhenryyue.com",
          "name": language === 'zh' ? "Henry岳房地产网站" : "Henry Yue Real Estate Website",
          "description": language === 'zh'
            ? "NYC房地产AI投资分析专家网站"
            : "NYC Real Estate AI Investment Analysis Expert Website",
          "publisher": { "@id": "https://www.realhenryyue.com/#person" },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.realhenryyue.com/?s={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "inLanguage": ["zh-CN", "en-US"]
        }
      ]
    };

    // Add the unified schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'unified-schema';
    script.textContent = JSON.stringify(unifiedSchema, null, 2);
    document.head.appendChild(script);

  }, [language]);

  return null;
};