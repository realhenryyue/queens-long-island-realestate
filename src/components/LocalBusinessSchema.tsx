import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const LocalBusinessSchema = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Remove existing schema
    const existingSchema = document.querySelector('#local-business-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "RealEstateAgent",
          "@id": "https://www.realhenryyue.com/#person",
          "name": language === 'zh' ? "Henry岳先生 (Hongyu Yue)" : "Hongyu (Henry) Yue",
          "alternateName": ["Henry Yue", "岳鸿宇", "Henry岳先生"],
          "description": language === 'zh' 
            ? "纽约州持牌房地产经纪人，专业服务曼哈顿、皇后区、长岛地区，为华人客户提供双语房产咨询与投资建议"
            : "Licensed New York Real Estate Agent specializing in Manhattan, Queens, and Long Island properties, providing bilingual real estate consultation and investment advice",
          "url": "https://www.realhenryyue.com",
          "image": {
            "@type": "ImageObject",
            "url": "https://www.realhenryyue.com/assets/agent-photo.jpg",
            "width": 400,
            "height": 400,
            "caption": "Henry Yue - Professional Real Estate Agent"
          },
          "telephone": "+1-718-717-5210",
          "email": "forangh@gmail.com",
          "address": [
            {
              "@type": "PostalAddress",
              "streetAddress": "41-25 Kissena Blvd Suite 126",
              "addressLocality": "Flushing",
              "addressRegion": "NY",
              "postalCode": "11355",
              "addressCountry": "US"
            },
            {
              "@type": "PostalAddress",
              "streetAddress": "39-07 Prince St #4D",
              "addressLocality": "Flushing", 
              "addressRegion": "NY",
              "postalCode": "11354",
              "addressCountry": "US"
            }
          ],
          "geo": [
            {
              "@type": "GeoCoordinates",
              "latitude": "40.7589",
              "longitude": "-73.8365",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Flushing",
                "addressRegion": "NY",
                "addressCountry": "US"
              }
            }
          ],
          "areaServed": [
            {
              "@type": "AdministrativeArea",
              "name": "Queens",
              "containedInPlace": {
                "@type": "City",
                "name": "New York City",
                "containedInPlace": {
                  "@type": "State",
                  "name": "New York"
                }
              }
            },
            {
              "@type": "AdministrativeArea", 
              "name": "Manhattan",
              "containedInPlace": {
                "@type": "City",
                "name": "New York City"
              }
            },
            {
              "@type": "AdministrativeArea",
              "name": "Long Island",
              "containedInPlace": {
                "@type": "State",
                "name": "New York"
              }
            },
            {
              "@type": "Place",
              "name": "Flushing",
              "containedInPlace": {
                "@type": "AdministrativeArea",
                "name": "Queens"
              }
            },
            {
              "@type": "Place",
              "name": "Astoria"
            },
            {
              "@type": "Place", 
              "name": "Bayside"
            },
            {
              "@type": "Place",
              "name": "Forest Hills"
            },
            {
              "@type": "Place",
              "name": "Great Neck"
            }
          ],
          "knowsLanguage": [
            {
              "@type": "Language",
              "name": "Chinese",
              "alternateName": "Mandarin"
            },
            {
              "@type": "Language",
              "name": "English"
            }
          ],
          "jobTitle": "Licensed Real Estate Salesperson",
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "name": "New York State Real Estate License",
              "credentialCategory": "Professional License"
            }
          ],
          "worksFor": [
            {
              "@type": "RealEstateAgent",
              "name": "E Realty International Corp.",
              "url": "https://www.realhenryyue.com"
            },
            {
              "@type": "RealEstateAgent", 
              "name": "J-HOME Realty"
            }
          ],
          "memberOf": {
            "@type": "Organization",
            "name": "National Association of Realtors"
          }
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://www.realhenryyue.com/#business",
          "name": language === 'zh' ? "Henry岳房地产服务" : "Henry Yue Real Estate Services",
          "alternateName": language === 'zh' ? "纽约华人地产经纪" : "NYC Chinese Real Estate Agent",
          "description": language === 'zh'
            ? "专业纽约房地产经纪服务，专注海外买房、房产投资、法拉盛商业楼等，为华人客户提供双语专业服务"
            : "Professional NYC real estate services specializing in international property purchases, real estate investment, and commercial properties, providing bilingual services for Chinese clients",
          "url": "https://www.realhenryyue.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.realhenryyue.com/lovable-uploads/37df6745-4c04-4216-b503-10af6f8c13aa.png",
            "width": 200,
            "height": 200
          },
          "image": [
            {
              "@type": "ImageObject",
              "url": "https://www.realhenryyue.com/assets/agent-photo.jpg",
              "caption": "Henry Yue - Professional Real Estate Agent"
            },
            {
              "@type": "ImageObject",
              "url": "https://www.realhenryyue.com/assets/queens-skyline.jpg", 
              "caption": "Queens Real Estate Market"
            }
          ],
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
          "serviceType": [
            language === 'zh' ? "住宅房产买卖" : "Residential Real Estate Sales",
            language === 'zh' ? "商业地产投资" : "Commercial Real Estate Investment", 
            language === 'zh' ? "房产投资咨询" : "Property Investment Consultation",
            language === 'zh' ? "首次购房指导" : "First-Time Home Buyer Services",
            language === 'zh' ? "双语地产服务" : "Bilingual Real Estate Services"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": language === 'zh' ? "房地产服务目录" : "Real Estate Services Catalog",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": language === 'zh' ? "住宅买卖服务" : "Residential Sales Services",
                  "description": language === 'zh' ? "专业住宅房产买卖咨询服务" : "Professional residential property buying and selling consultation",
                  "provider": {
                    "@id": "https://www.realhenryyue.com/#person"
                  },
                  "areaServed": {
                    "@type": "State",
                    "name": "New York"
                  }
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": language === 'zh' ? "商业地产投资" : "Commercial Real Estate Investment",
                  "description": language === 'zh' ? "法拉盛商业楼等商业地产投资机会分析" : "Analysis of commercial real estate investment opportunities including Flushing commercial buildings",
                  "provider": {
                    "@id": "https://www.realhenryyue.com/#person"
                  }
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": language === 'zh' ? "海外买房指导" : "International Property Purchase Guidance",
                  "description": language === 'zh' ? "为海外客户提供纽约房产购买专业指导" : "Professional guidance for international clients purchasing NYC properties",
                  "provider": {
                    "@id": "https://www.realhenryyue.com/#person"
                  }
                }
              }
            ]
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "156",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": language === 'zh' ? "满意客户" : "Satisfied Client"
              },
              "reviewBody": language === 'zh' 
                ? "Henry先生非常专业，帮助我们顺利在法拉盛购买了理想的房产。双语服务很贴心，推荐！"
                : "Henry is very professional and helped us successfully purchase our ideal property in Flushing. Bilingual service is very helpful, highly recommended!"
            }
          ],
          "priceRange": "$$",
          "currenciesAccepted": "USD",
          "paymentAccepted": ["Cash", "Check", "Bank Transfer"],
          "sameAs": [
            "https://www.facebook.com/RealHenryYue",
            "https://www.instagram.com/real_henry_yue", 
            "https://www.linkedin.com/in/henry-yue-real-estate",
            "https://www.tiktok.com/@realhenryyue"
          ],
          "founder": {
            "@id": "https://www.realhenryyue.com/#person"
          },
          "employee": {
            "@id": "https://www.realhenryyue.com/#person"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://www.realhenryyue.com/#website",
          "url": "https://www.realhenryyue.com",
          "name": "RealHenryYue.com",
          "description": language === 'zh'
            ? "Henry岳先生专业纽约房地产服务网站，提供海外买房、纽约生活、投资咨询等服务"
            : "Henry Yue's professional NYC real estate services website, providing international property purchase, NYC living, and investment consultation services",
          "publisher": {
            "@id": "https://www.realhenryyue.com/#person"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.realhenryyue.com/?s={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "inLanguage": ["zh-CN", "en-US"],
          "about": {
            "@id": "https://www.realhenryyue.com/#business"
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'local-business-schema';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);

  }, [language]);

  return null;
};