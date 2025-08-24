import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const ComprehensiveSEO = () => {
  const location = useLocation();
  const isChinesePath = location.pathname.startsWith('/zh');
  const currentLanguage = isChinesePath ? 'zh' : 'en';

  const siteData = {
    en: {
      title: "Henry Yue - NYC Real Estate | ROI Calculator", // 48 chars
      description: "NYC Real Estate Expert Henry Yue, 15+ years exp. Free ROI calculator, 5-borough analysis. Call 718-717-5210", // 116 chars
      keywords: "NYC real estate expert, Henry Yue, property investment, ROI calculator, Queens Brooklyn Manhattan, real estate analysis, 718-717-5210",
      siteName: "Real Henry Yue - NYC Property Investment Expert",
      locale: "en_US"
    },
    zh: {
      title: "Henry岳 - NYC房地产专家 | ROI计算器", // 32 chars
      description: "NYC房地产专家Henry岳，15年经验。免费ROI计算器，五大区投资分析。咨询 718-717-5210", // 56 chars
      keywords: "纽约房地产专家, 岳泓宇, 房产投资, ROI计算器, 皇后区布鲁克林曼哈顿, 房地产分析, 718-717-5210",
      siteName: "岳泓宇房地产 - 纽约房产投资专家",
      locale: "zh_CN"
    }
  };

  const currentData = siteData[currentLanguage as keyof typeof siteData];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{currentData.title}</title>
      <meta name="description" content={currentData.description} />
      <meta name="keywords" content={currentData.keywords} />
      <meta name="author" content="Henry Yue" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://realhenryyue.com/" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://realhenryyue.com/" />
      <meta property="og:title" content={currentData.title} />
      <meta property="og:description" content={currentData.description} />
      <meta property="og:site_name" content={currentData.siteName} />
      <meta property="og:locale" content={currentData.locale} />
      <meta property="og:image" content="https://realhenryyue.com/assets/agent-photo.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentData.title} />
      <meta name="twitter:description" content={currentData.description} />
      <meta name="twitter:image" content="https://realhenryyue.com/assets/agent-photo.jpg" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      
      {/* Geographic SEO */}
      <meta name="geo.region" content="US-NY" />
      <meta name="geo.placename" content="New York City" />
      <meta name="geo.position" content="40.7589,-73.9851" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": currentLanguage === 'zh' ? "岳泓宇" : "Henry Yue",
          "url": "https://realhenryyue.com",
          "email": "forangh@gmail.com",
          "telephone": "+1-718-717-5210",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "New York",
            "addressRegion": "NY",
            "addressCountry": "US"
          },
          "areaServed": ["Queens", "Brooklyn", "Manhattan", "Nassau County"],
          "serviceType": "Real Estate Investment Analysis",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127",
            "bestRating": "5"
          }
        })}
      </script>
    </Helmet>
  );
};

export default ComprehensiveSEO;