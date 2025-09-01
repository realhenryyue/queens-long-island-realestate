import { useLanguage } from "@/contexts/LanguageContext";

interface RichSnippetsProps {
  pageType?: 'home' | 'about' | 'services' | 'contact' | 'analysis';
  title?: string;
  description?: string;
}

export const RichSnippets = ({ pageType = 'home', title, description }: RichSnippetsProps) => {
  const { language } = useLanguage();

  const getSchemaForPage = () => {
    const baseUrl = "https://www.realhenryyue.com";
    
    switch (pageType) {
      case 'home':
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": title || (language === 'zh' ? "Henry岳先生 - 纽约房地产专家" : "Henry Yue - NYC Real Estate Expert"),
          "description": description || (language === 'zh' 
            ? "专业的纽约房地产投资分析服务，提供双语支持和AI驱动的市场分析"
            : "Professional NYC real estate investment analysis services with bilingual support and AI-driven market insights"),
          "url": baseUrl,
          "mainEntity": {
            "@type": "RealEstateAgent",
            "name": "Henry Yue",
            "alternateName": "Henry岳先生"
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": language === 'zh' ? "首页" : "Home",
                "item": baseUrl
              }
            ]
          }
        };
        
      case 'about':
        return {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": title || (language === 'zh' ? "关于Henry岳先生" : "About Henry Yue"),
          "description": description || (language === 'zh'
            ? "了解Henry岳先生的专业背景和房地产服务经验"
            : "Learn about Henry Yue's professional background and real estate service experience"),
          "url": `${baseUrl}#about`,
          "mainEntity": {
            "@type": "Person",
            "name": "Henry Yue",
            "alternateName": "Henry岳先生",
            "jobTitle": language === 'zh' ? "房地产专家" : "Real Estate Expert",
            "worksFor": {
              "@type": "Organization",
              "name": "Henry Yue Real Estate"
            }
          }
        };
        
      case 'services':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": title || (language === 'zh' ? "房地产服务" : "Real Estate Services"),
          "description": description || (language === 'zh'
            ? "专业的房地产买卖、投资分析和咨询服务"
            : "Professional real estate buying, selling, investment analysis and consulting services"),
          "url": `${baseUrl}#services`,
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Henry Yue Real Estate"
          },
          "serviceType": [
            language === 'zh' ? "住宅房地产服务" : "Residential Real Estate",
            language === 'zh' ? "投资分析" : "Investment Analysis",
            language === 'zh' ? "双语服务" : "Bilingual Services"
          ]
        };
        
      case 'contact':
        return {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": title || (language === 'zh' ? "联系我们" : "Contact Us"),
          "description": description || (language === 'zh'
            ? "联系Henry岳先生获取专业房地产服务"
            : "Contact Henry Yue for professional real estate services"),
          "url": `${baseUrl}#contact`,
          "mainEntity": {
            "@type": "ContactPoint",
            "telephone": "+1-718-717-5210",
            "email": "RealHenryYue@gmail.com",
            "contactType": "customer service",
            "availableLanguage": ["English", "Chinese"]
          }
        };
        
      case 'analysis':
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": title || (language === 'zh' ? "房地产投资分析工具" : "Real Estate Investment Analysis Tool"),
          "description": description || (language === 'zh'
            ? "基于AI的房地产投资ROI计算和市场分析工具"
            : "AI-powered real estate investment ROI calculator and market analysis tool"),
          "url": `${baseUrl}#analysis`,
          "applicationCategory": "Business Application",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "creator": {
            "@type": "Organization",
            "name": "Henry Yue Real Estate"
          }
        };
        
      default:
        return null;
    }
  };

  const schema = getSchemaForPage();

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
};