import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const SEOEnhancer = () => {
  const { language, t } = useLanguage();

  useEffect(() => {
    // Enhanced meta tags for better SEO
    const updateEnhancedMetaTags = () => {
      // Update language attribute
      document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en-US';
      
      // Add/update additional meta tags
      const metaTags = [
        { name: 'geo.region', content: 'US-NY' },
        { name: 'geo.placename', content: 'New York' },
        { name: 'geo.position', content: '40.7589;-73.8365' },
        { name: 'ICBM', content: '40.7589, -73.8365' },
        { name: 'distribution', content: 'global' },
        { name: 'rating', content: 'general' },
        { name: 'revisit-after', content: '7 days' },
        { name: 'expires', content: 'never' },
        { name: 'coverage', content: 'worldwide' },
        { name: 'target', content: 'all' },
        { name: 'HandheldFriendly', content: 'True' },
        { name: 'MobileOptimized', content: '320' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'msapplication-TileColor', content: '#1a365d' },
        { name: 'msapplication-config', content: '/browserconfig.xml' }
      ];

      metaTags.forEach(({ name, content }) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      });

      // Update Open Graph tags dynamically with investment focus and borough coverage
      const shareTitle = language === 'zh' ? 
        'Henry岳先生 - 纽约五大区房产投资分析权威 | NYC曼哈顿皇后区布鲁克林投资专家' :
        'Henry Yue - NYC 5 Boroughs Real Estate Investment Expert | Manhattan Queens Brooklyn Bronx Nassau Investment Analysis';
      const shareDescription = language === 'zh' ?
        '专业纽约五大区房产投资分析服务，覆盖曼哈顿、皇后区、布鲁克林、布朗克斯、史泰登岛、拿骚县。提供详细ROI计算、现金流分析、市场趋势预测。15年经验，双语服务，助您做出明智投资决策。免费咨询: 718-717-5210' :
        'Professional NYC 5 boroughs real estate investment analysis services covering Manhattan, Queens, Brooklyn, Bronx, Staten Island, Nassau County. Detailed ROI calculations, cash flow analysis, market trend forecasting for all NYC areas. 15+ years experience, bilingual support. Free consultation: 718-717-5210';

      const ogTags = [
        { property: 'og:title', content: shareTitle },
        { property: 'og:description', content: shareDescription },
        { property: 'og:locale', content: language === 'zh' ? 'zh_CN' : 'en_US' },
        { property: 'og:updated_time', content: new Date().toISOString() },
        { property: 'article:modified_time', content: new Date().toISOString() },
        { property: 'og:type', content: 'business.business' },
        { property: 'business:contact_data:street_address', content: 'New York' },
        { property: 'business:contact_data:locality', content: 'New York' },
        { property: 'business:contact_data:region', content: 'NY' },
        { property: 'business:contact_data:postal_code', content: '10001' },
        { property: 'business:contact_data:country_name', content: 'United States' }
      ];

      ogTags.forEach(({ property, content }) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      });
    };

    // Add breadcrumb structured data
    const addBreadcrumbData = () => {
      const breadcrumbScript = document.getElementById('breadcrumb-ld');
      if (breadcrumbScript) {
        breadcrumbScript.remove();
      }

      const breadcrumbData = {
        "@context": "https://schema.org",
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
            "name": language === 'zh' ? "关于我们" : "About",
            "item": "https://www.realhenryyue.com/#about"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": language === 'zh' ? "服务项目" : "Services",
            "item": "https://www.realhenryyue.com/#services"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": language === 'zh' ? "联系我们" : "Contact",
            "item": "https://www.realhenryyue.com/#contact"
          }
        ]
      };

      const script = document.createElement('script');
      script.id = 'breadcrumb-ld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(breadcrumbData);
      document.head.appendChild(script);
    };

    // Add FAQ structured data
    const addFAQData = () => {
      const faqScript = document.getElementById('faq-ld');
      if (faqScript) {
        faqScript.remove();
      }

      const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": language === 'zh' ? "岳鸿宇在纽约服务哪些地区？" : "What areas does Henry Yue serve in New York?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'zh' 
                ? "岳鸿宇服务皇后区、长岛、曼哈顿、布鲁克林、布朗克斯以及纽约州任何地方。他在法拉盛、大颈和拿骚县地区拥有专业经验。"
                : "Henry Yue serves Queens, Long Island, Manhattan, Brooklyn, Bronx, and anywhere in New York State. He has specialized expertise in Flushing, Great Neck, and Nassau County areas."
            }
          },
          {
            "@type": "Question",
            "name": language === 'zh' ? "岳鸿宇是持牌房地产经纪人吗？" : "Is Henry Yue a licensed real estate agent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'zh'
                ? "是的，岳鸿宇是纽约州持牌房地产经纪人，在住宅和商业房产方面拥有丰富经验。"
                : "Yes, Henry Yue is a licensed New York State real estate salesperson with extensive experience in residential and commercial properties."
            }
          },
          {
            "@type": "Question",
            "name": language === 'zh' ? "岳鸿宇提供双语服务吗？" : "Does Henry Yue provide bilingual services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'zh'
                ? "是的，岳鸿宇提供专业的中英双语服务，深入了解多元化社区需求。"
                : "Yes, Henry Yue provides professional bilingual services in both English and Chinese, with deep understanding of diverse community needs."
            }
          },
          {
            "@type": "Question",
            "name": language === 'zh' ? "岳鸿宇专门从事哪些类型的房产？" : "What types of properties does Henry Yue specialize in?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'zh'
                ? "岳鸿宇专门从事住宅销售、商业地产、投资房产、首次购房指导和物业管理服务。"
                : "Henry specializes in residential sales, commercial properties, investment properties, first-time buyer support, and property management services."
            }
          }
        ]
      };

      const script = document.createElement('script');
      script.id = 'faq-ld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(faqData);
      document.head.appendChild(script);
    };

    // Add review schema
    const addReviewSchema = () => {
      const reviewScript = document.getElementById('review-ld');
      if (reviewScript) {
        reviewScript.remove();
      }

      const reviewData = {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "LocalBusiness",
          "name": language === 'zh' ? "岳鸿宇房地产服务" : "Henry Yue Real Estate Services"
        },
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
          ? "岳鸿宇在我们的购房过程中提供了卓越的服务。他的双语专业知识和本地市场了解起到了关键作用。"
          : "Henry provided exceptional service throughout our home buying process. His bilingual expertise and local market knowledge made all the difference."
      };

      const script = document.createElement('script');
      script.id = 'review-ld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(reviewData);
      document.head.appendChild(script);
    };

    // Update all enhanced SEO data
    updateEnhancedMetaTags();
    addBreadcrumbData();
    addFAQData();
    addReviewSchema();

  }, [language, t]);

  return null;
};