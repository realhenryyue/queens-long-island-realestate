import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

export const AdvancedMetaTags = () => {
  const { language } = useLanguage();

  const metaData = {
    en: {
      title: "Henry Yue - NYC Real Estate Expert | AI Investment Analysis & Bilingual Services",
      description: "Professional NYC real estate services by Henry Yue. AI-powered investment analysis, ROI calculator, bilingual support in Queens, Long Island & Manhattan. Licensed expert with 10+ years experience.",
      keywords: "NYC real estate, Henry Yue, Queens real estate agent, Long Island properties, Manhattan real estate, bilingual agent, Chinese speaking realtor, real estate investment analysis, AI ROI calculator, property management, first time homebuyer, commercial real estate NYC",
      ogTitle: "Henry Yue - Top NYC Real Estate Expert | AI Investment Analysis",
      ogDescription: "Transform your real estate investments with Henry Yue's AI-powered analysis tools. Expert bilingual services in Queens, Long Island & Manhattan. Get your free ROI calculation today!",
      twitterTitle: "Henry Yue - NYC Real Estate Expert | AI Investment Analysis",
      twitterDescription: "Professional NYC real estate services with AI-powered investment analysis. Bilingual support in English & Chinese. Serving Queens, Long Island & Manhattan."
    },
    zh: {
      title: "Henry岳先生 - 纽约房地产专家 | AI投资分析与双语服务",
      description: "Henry岳先生提供专业的纽约房地产服务。AI驱动的投资分析、ROI计算器、皇后区长岛曼哈顿双语支持。持牌专家，10年以上经验。",
      keywords: "纽约房地产, Henry岳先生, 皇后区房地产经纪, 长岛房产, 曼哈顿房地产, 双语经纪人, 中文房地产经纪, 房地产投资分析, AI ROI计算器, 物业管理, 首次购房, 纽约商业地产",
      ogTitle: "Henry岳先生 - 顶级纽约房地产专家 | AI投资分析",
      ogDescription: "使用Henry岳先生的AI投资分析工具改变您的房地产投资。皇后区、长岛和曼哈顿的专业双语服务。立即获得免费ROI计算！",
      twitterTitle: "Henry岳先生 - 纽约房地产专家 | AI投资分析",
      twitterDescription: "专业的纽约房地产服务，配备AI投资分析工具。中英文双语支持。服务皇后区、长岛和曼哈顿。"
    }
  };

  const currentMeta = metaData[language];

  return (
    <Helmet>
      {/* Advanced Meta Tags */}
      <meta name="author" content="Henry Yue" />
      <meta name="copyright" content="© 2024 Henry Yue Real Estate. All rights reserved." />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content={language === 'zh' ? 'zh-CN' : 'en-US'} />
      <meta property="og:locale" content={language === 'zh' ? 'zh_CN' : 'en_US'} />
      <meta property="og:locale:alternate" content={language === 'zh' ? 'en_US' : 'zh_CN'} />
      
      {/* Business Information */}
      <meta name="business:contact_data:street_address" content="41-25 Kissena Blvd Suite 126" />
      <meta name="business:contact_data:locality" content="Flushing" />
      <meta name="business:contact_data:region" content="NY" />
      <meta name="business:contact_data:postal_code" content="11355" />
      <meta name="business:contact_data:country_name" content="United States" />
      <meta name="business:contact_data:phone_number" content="+17187175210" />
      <meta name="business:contact_data:email" content="forangh@gmail.com" />
      
      {/* Geographic Targeting */}
      <meta name="geo.region" content="US-NY" />
      <meta name="geo.placename" content="New York" />
      <meta name="geo.position" content="40.7505;-73.8355" />
      <meta name="ICBM" content="40.7505, -73.8355" />
      
      {/* Mobile and App */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Henry Yue Real Estate" />
      <meta name="application-name" content="Henry Yue Real Estate" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Enhanced Open Graph */}
      <meta property="og:updated_time" content={new Date().toISOString()} />
      <meta property="og:rich_attachment" content="true" />
      <meta property="business:contact_data:phone_number" content="+17187175210" />
      <meta property="business:contact_data:website" content="https://www.realhenryyue.com" />
      
      {/* Twitter Card Enhancements */}
      <meta name="twitter:domain" content="realhenryyue.com" />
      <meta name="twitter:label1" content="Service Areas" />
      <meta name="twitter:data1" content="Queens, Long Island, Manhattan" />
      <meta name="twitter:label2" content="Languages" />
      <meta name="twitter:data2" content="English, Chinese" />
      
      {/* Article/Blog specific */}
      <meta property="article:author" content="Henry Yue" />
      <meta property="article:published_time" content="2024-01-01T00:00:00Z" />
      <meta property="article:modified_time" content={new Date().toISOString()} />
      <meta property="article:section" content="Real Estate" />
      <meta property="article:tag" content="NYC Real Estate" />
      <meta property="article:tag" content="Investment Analysis" />
      <meta property="article:tag" content="ROI Calculator" />
      
      {/* Additional SEO Tags */}
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="1 days" />
      <meta name="expires" content="never" />
      <meta name="coverage" content="worldwide" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="width" />
      
      {/* Rich Snippets Support */}
      <meta property="business:hours:day" content="monday" />
      <meta property="business:hours:start" content="09:00" />
      <meta property="business:hours:end" content="18:00" />
      <meta property="business:hours:day" content="tuesday" />
      <meta property="business:hours:start" content="09:00" />
      <meta property="business:hours:end" content="18:00" />
      <meta property="business:hours:day" content="wednesday" />
      <meta property="business:hours:start" content="09:00" />
      <meta property="business:hours:end" content="18:00" />
      <meta property="business:hours:day" content="thursday" />
      <meta property="business:hours:start" content="09:00" />
      <meta property="business:hours:end" content="18:00" />
      <meta property="business:hours:day" content="friday" />
      <meta property="business:hours:start" content="09:00" />
      <meta property="business:hours:end" content="18:00" />
      <meta property="business:hours:day" content="saturday" />
      <meta property="business:hours:start" content="10:00" />
      <meta property="business:hours:end" content="17:00" />
      <meta property="business:hours:day" content="sunday" />
      <meta property="business:hours:start" content="10:00" />
      <meta property="business:hours:end" content="17:00" />
    </Helmet>
  );
};