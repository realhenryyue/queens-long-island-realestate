import { useLanguage } from "@/contexts/LanguageContext";

export const ArticleSchema = () => {
  const { language } = useLanguage();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": language === 'zh' 
      ? "纽约房地产投资指南 - Henry岳先生专业分析"
      : "NYC Real Estate Investment Guide - Professional Analysis by Henry Yue",
    "description": language === 'zh'
      ? "专业的纽约房地产投资分析，包括市场趋势、投资策略和ROI计算工具"
      : "Professional NYC real estate investment analysis including market trends, investment strategies and ROI calculation tools",
    "author": {
      "@type": "Person",
      "name": "Henry Yue",
      "alternateName": "Henry岳先生",
      "url": "https://www.realhenryyue.com",
      "jobTitle": language === 'zh' ? "房地产专家" : "Real Estate Expert",
      "worksFor": {
        "@type": "Organization",
        "name": "Henry Yue Real Estate"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Henry Yue Real Estate",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.realhenryyue.com/assets/agent-photo.jpg",
        "width": 400,
        "height": 400
      }
    },
    "datePublished": "2024-01-01T00:00:00Z",
    "dateModified": new Date().toISOString(),
    "image": [
      {
        "@type": "ImageObject",
        "url": "https://www.realhenryyue.com/assets/queens-skyline.jpg",
        "width": 1200,
        "height": 800,
        "caption": language === 'zh' ? "纽约皇后区天际线" : "Queens NYC Skyline"
      },
      {
        "@type": "ImageObject", 
        "url": "https://www.realhenryyue.com/lovable-uploads/37df6745-4c04-4216-b503-10af6f8c13aa.png",
        "width": 800,
        "height": 600,
        "caption": language === 'zh' ? "房地产投资分析工具" : "Real Estate Investment Analysis Tool"
      }
    ],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.realhenryyue.com"
    },
    "articleSection": language === 'zh' ? "房地产投资" : "Real Estate Investment",
    "keywords": [
      language === 'zh' ? "纽约房地产" : "NYC Real Estate",
      language === 'zh' ? "房地产投资" : "Real Estate Investment", 
      language === 'zh' ? "ROI计算" : "ROI Calculator",
      language === 'zh' ? "市场分析" : "Market Analysis",
      language === 'zh' ? "双语服务" : "Bilingual Services",
      "Queens", "Long Island", "Manhattan"
    ],
    "inLanguage": language === 'zh' ? "zh-CN" : "en-US"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleSchema)
      }}
    />
  );
};