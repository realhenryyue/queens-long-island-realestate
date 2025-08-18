import { useLanguage } from "@/contexts/LanguageContext";

export const ProductSchema = () => {
  const { language } = useLanguage();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": language === 'zh' 
      ? "NYC房地产AI投资分析系统"
      : "NYC Real Estate AI Investment Analysis System",
    "description": language === 'zh'
      ? "基于人工智能的房地产投资分析工具，提供精准的ROI计算、市场趋势分析和投资建议"
      : "AI-powered real estate investment analysis tool providing accurate ROI calculations, market trend analysis and investment recommendations",
    "brand": {
      "@type": "Brand",
      "name": "Henry Yue Real Estate"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Henry Yue Real Estate",
      "url": "https://www.realhenryyue.com"
    },
    "image": [
      "https://www.realhenryyue.com/lovable-uploads/37df6745-4c04-4216-b503-10af6f8c13aa.png",
      "https://www.realhenryyue.com/assets/queens-skyline.jpg"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.realhenryyue.com",
      "priceValidUntil": "2025-12-31",
      "seller": {
        "@type": "Organization",
        "name": "Henry Yue Real Estate"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
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
          "name": language === 'zh' ? "李女士" : "Ms. Li"
        },
        "reviewBody": language === 'zh'
          ? "Henry岳先生的投资分析工具非常专业，帮助我找到了理想的投资物业。"
          : "Henry Yue's investment analysis tool is very professional and helped me find the ideal investment property."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": language === 'zh' ? "王先生" : "Mr. Wang"
        },
        "reviewBody": language === 'zh'
          ? "双语服务很贴心，AI分析工具让投资决策变得更简单。"
          : "Bilingual service is very thoughtful, and the AI analysis tool makes investment decisions easier."
      }
    ],
    "category": language === 'zh' ? "房地产分析工具" : "Real Estate Analysis Tool",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": language === 'zh' ? "服务语言" : "Service Languages",
        "value": language === 'zh' ? "中文、英文" : "Chinese, English"
      },
      {
        "@type": "PropertyValue", 
        "name": language === 'zh' ? "服务区域" : "Service Areas",
        "value": "NYC, Queens, Long Island, Manhattan"
      },
      {
        "@type": "PropertyValue",
        "name": language === 'zh' ? "分析类型" : "Analysis Types", 
        "value": language === 'zh' ? "ROI计算、市场分析、投资建议" : "ROI Calculation, Market Analysis, Investment Advice"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(productSchema)
      }}
    />
  );
};