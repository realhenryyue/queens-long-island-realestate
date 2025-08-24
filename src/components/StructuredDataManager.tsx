import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const StructuredDataManager = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Remove existing structured data to prevent duplicates
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => {
      if (script.id && script.id.includes('structured-data')) {
        script.remove();
      }
    });

    // Comprehensive structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "RealEstateAgent",
          "@id": "https://www.realhenryyue.com/#person",
          "name": language === 'zh' ? "岳鸿宇 (Henry Yue)" : "Henry Yue",
          "alternateName": language === 'zh' ? ["Henry Yue", "岳鸿宇"] : ["Hongyu Yue"],
          "description": language === 'zh' 
            ? "纽约州持牌房地产经纪人，专业提供房产投资分析、ROI计算、市场趋势分析等服务。"
            : "Licensed New York Real Estate Agent specializing in property investment analysis, ROI calculations, and market trend analysis.",
          "url": "https://www.realhenryyue.com",
          "image": {
            "@type": "ImageObject",
            "url": "https://www.realhenryyue.com/assets/agent-photo.jpg",
            "width": 400,
            "height": 400,
            "caption": language === 'zh' ? "岳鸿宇专业照片" : "Henry Yue Professional Photo"
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
            {
              "@type": "City",
              "name": "Queens",
              "containedInPlace": {
                "@type": "State",
                "name": "New York"
              }
            },
            {
              "@type": "City",
              "name": "Manhattan",
              "containedInPlace": {
                "@type": "State", 
                "name": "New York"
              }
            },
            {
              "@type": "Place",
              "name": "Nassau County",
              "containedInPlace": {
                "@type": "State",
                "name": "New York"
              }
            }
          ],
          "knowsLanguage": ["en-US", "zh-CN"],
          "jobTitle": "Licensed Real Estate Salesperson",
          "hasCredential": {
            "@type": "EducationalOccupationalCredential",
            "name": "New York State Real Estate License",
            "credentialCategory": "Professional License"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "150",
            "bestRating": "5"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": language === 'zh' ? "房地产服务" : "Real Estate Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": language === 'zh' ? "投资物业分析" : "Investment Property Analysis",
                  "description": language === 'zh' ? "专业房产投资分析服务" : "Professional property investment analysis services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": language === 'zh' ? "市场趋势分析" : "Market Trend Analysis", 
                  "description": language === 'zh' ? "房地产市场趋势专业分析" : "Professional real estate market trend analysis"
                }
              }
            ]
          }
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://www.realhenryyue.com/#business",
          "name": language === 'zh' ? "Henry Yue 房地产服务" : "Henry Yue Real Estate Services",
          "description": language === 'zh'
            ? "专业纽约房地产经纪服务，提供投资分析、ROI计算、市场趋势分析等服务。"
            : "Professional NYC real estate services providing investment analysis, ROI calculations, and market trend analysis.",
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
          "openingHours": [
            "Mo-Fr 08:00-20:00",
            "Sa-Su 09:00-18:00"
          ],
          "priceRange": "$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "150",
            "bestRating": "5"
          },
          "founder": {
            "@id": "https://www.realhenryyue.com/#person"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://www.realhenryyue.com/#website",
          "url": "https://www.realhenryyue.com",
          "name": "Henry Yue Real Estate",
          "description": language === 'zh'
            ? "Henry Yue专业房地产网站，提供投资分析和房产服务"
            : "Henry Yue professional real estate website providing investment analysis and property services",
          "publisher": {
            "@id": "https://www.realhenryyue.com/#person"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.realhenryyue.com/?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "inLanguage": ["en-US", "zh-CN"]
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": language === 'zh' ? "首页" : "Home",
              "item": "https://www.realhenryyue.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": language === 'zh' ? "关于" : "About",
              "item": "https://www.realhenryyue.com/#about"
            },
            {
              "@type": "ListItem", 
              "position": 3,
              "name": language === 'zh' ? "服务" : "Services",
              "item": "https://www.realhenryyue.com/#services"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": language === 'zh' ? "联系" : "Contact",
              "item": "https://www.realhenryyue.com/#contact"
            }
          ]
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'main-structured-data';
    script.textContent = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);

  }, [language]);

  return null;
};