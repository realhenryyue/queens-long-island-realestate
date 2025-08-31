import { useLanguage } from "@/contexts/LanguageContext";

export const GlobalSchema = () => {
  const { language } = useLanguage();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Henry Yue Real Estate",
    "alternateName": "Henry岳先生房地产",
    "url": "https://www.realhenryyue.com",
    "logo": "https://www.realhenryyue.com/assets/agent-photo.jpg",
    "image": [
      "https://www.realhenryyue.com/assets/agent-photo.jpg",
      "https://www.realhenryyue.com/assets/queens-skyline.jpg"
    ],
    "description": language === 'zh' 
      ? "Henry岳先生 - 纽约房地产专家，提供专业的房地产投资分析和咨询服务"
      : "Henry Yue - NYC Real Estate Expert specializing in AI-powered investment analysis and bilingual services",
    "founder": {
      "@type": "Person",
      "name": "Henry Yue",
      "alternateName": "Henry岳先生",
      "jobTitle": language === 'zh' ? "房地产专家" : "Real Estate Expert",
      "telephone": "+1-718-717-5210",
      "email": "RealHenryYue@gmail.com",
      "knowsLanguage": ["en", "zh-CN"],
      "areaServed": [
        {
          "@type": "City",
          "name": "Queens",
          "addressRegion": "NY",
          "addressCountry": "US"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Long Island",
          "addressRegion": "NY",
          "addressCountry": "US"
        },
        {
          "@type": "State",
          "name": "New York",
          "addressCountry": "US"
        }
      ]
    },
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
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "40 Cutter Mill Road Suite 400",
        "addressLocality": "Great Neck",
        "addressRegion": "NY",
        "postalCode": "11021",
        "addressCountry": "US"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-718-717-5210",
      "contactType": "customer service",
      "availableLanguage": ["English", "Chinese"],
      "areaServed": ["NY", "NYC", "Queens", "Long Island"]
    },
    "sameAs": [
      "https://www.linkedin.com/in/henryyue",
      "https://www.realhenryyue.com"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 40.7505,
        "longitude": -73.8355
      },
      "geoRadius": "50000"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": language === 'zh' ? "住宅房地产服务" : "Residential Real Estate Services",
          "description": language === 'zh' 
            ? "专业的住宅房地产买卖服务，包括投资分析和市场咨询"
            : "Professional residential real estate buying and selling services with investment analysis"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": language === 'zh' ? "房地产投资分析" : "Real Estate Investment Analysis",
          "description": language === 'zh'
            ? "基于人工智能的房地产投资分析和ROI计算服务"
            : "AI-powered real estate investment analysis and ROI calculation services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": language === 'zh' ? "双语房地产服务" : "Bilingual Real Estate Services",
          "description": language === 'zh'
            ? "提供英语和中文的专业房地产服务"
            : "Professional real estate services in English and Chinese"
        }
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Henry Yue Real Estate",
    "alternateName": "Henry岳先生房地产",
    "url": "https://www.realhenryyue.com",
    "description": language === 'zh'
      ? "Henry岳先生专业房地产网站 - 提供纽约地区房地产投资分析、咨询和双语服务"
      : "Henry Yue Professional Real Estate Website - NYC Real Estate Investment Analysis, Consulting and Bilingual Services",
    "inLanguage": [language],
    "author": {
      "@type": "Person",
      "name": "Henry Yue",
      "alternateName": "Henry岳先生"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Henry Yue Real Estate",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.realhenryyue.com/assets/agent-photo.jpg"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.realhenryyue.com/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Henry Yue Real Estate",
    "alternateName": "Henry岳先生房地产",
    "description": language === 'zh'
      ? "专业的纽约房地产代理服务，提供投资分析、市场咨询和双语支持"
      : "Professional NYC real estate agent services with investment analysis, market consulting and bilingual support",
    "url": "https://www.realhenryyue.com",
    "telephone": "+1-718-717-5210",
    "email": "RealHenryYue@gmail.com",
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
      "latitude": 40.7505,
      "longitude": -73.8355
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "17:00"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Queens"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Long Island"
      },
      {
        "@type": "State",
        "name": "New York"
      }
    ],
    "knowsLanguage": ["en", "zh-CN"],
    "image": [
      "https://www.realhenryyue.com/assets/agent-photo.jpg",
      "https://www.realhenryyue.com/assets/queens-skyline.jpg"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "$$"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />
    </>
  );
};