import { useLanguage } from "@/contexts/LanguageContext";

export const SocialMetaTags = () => {
  const { language } = useLanguage();

  const socialMeta = {
    en: {
      title: "Henry Yue - NYC Real Estate Expert | AI Investment Analysis",
      description: "Transform your NYC real estate investments with AI-powered analysis. Expert bilingual services in Queens, Long Island & Manhattan. Get your free ROI calculation!",
      hashtags: "#NYCRealEstate #RealEstateInvestment #AIAnalysis #BilingualAgent #QueensRealEstate #LongIslandHomes #ManhattanProperties"
    },
    zh: {
      title: "Henry岳先生 - 纽约房地产专家 | AI投资分析",
      description: "使用AI投资分析工具改变您的纽约房地产投资。皇后区、长岛、曼哈顿专业双语服务。立即获得免费ROI计算！",
      hashtags: "#纽约房地产 #房地产投资 #AI分析 #双语经纪人 #皇后区房产 #长岛房屋 #曼哈顿房产"
    }
  };

  const current = socialMeta[language];

  const linkedInSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Henry Yue",
      "alternateName": "Henry岳先生",
      "jobTitle": language === 'zh' ? "房地产专家" : "Real Estate Expert",
      "description": current.description,
      "url": "https://www.realhenryyue.com",
      "sameAs": [
        "https://www.linkedin.com/in/henryyue",
        "https://www.realhenryyue.com"
      ],
      "knowsAbout": [
        language === 'zh' ? "房地产投资" : "Real Estate Investment",
        language === 'zh' ? "市场分析" : "Market Analysis", 
        language === 'zh' ? "AI投资工具" : "AI Investment Tools",
        "NYC", "Queens", "Long Island", "Manhattan"
      ]
    }
  };

  const facebookSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Henry Yue Real Estate",
    "url": "https://www.realhenryyue.com",
    "logo": "https://www.realhenryyue.com/assets/agent-photo.jpg",
    "description": current.description,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-718-717-5210",
      "contactType": "customer service"
    }
  };

  return (
    <>
      {/* LinkedIn Specific Meta Tags */}
      <meta property="linkedin:owner" content="Henry Yue" />
      <meta property="linkedin:title" content={current.title} />
      <meta property="linkedin:description" content={current.description} />
      <meta property="linkedin:image" content="https://www.realhenryyue.com/assets/agent-photo.jpg" />
      
      {/* Facebook Specific Meta Tags */}
      <meta property="fb:app_id" content="realhenryyue" />
      <meta property="article:publisher" content="https://www.facebook.com/realhenryyue" />
      <meta property="article:author" content="https://www.facebook.com/henryyue" />
      
      {/* Instagram Meta Tags */}
      <meta property="instagram:site" content="@realhenryyue" />
      <meta property="instagram:creator" content="@henryyue" />
      
      {/* TikTok Meta Tags */}
      <meta property="tiktok:app_id" content="realhenryyue" />
      <meta property="tiktok:site" content="@realhenryyue" />
      
      {/* WeChat Meta Tags */}
      <meta property="wechat:card" content="summary_large_image" />
      <meta property="wechat:title" content={current.title} />
      <meta property="wechat:description" content={current.description} />
      <meta property="wechat:image" content="https://www.realhenryyue.com/lovable-uploads/913b3b6c-94b4-41bb-843a-d28cd0eed1a4.png" />
      
      {/* Additional Social Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(linkedInSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(facebookSchema)
        }}
      />
    </>
  );
};