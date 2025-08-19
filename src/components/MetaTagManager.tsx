import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const MetaTagManager = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Update document title based on language
    const title = language === 'zh' 
      ? 'Henry Yue - NYC房地产AI投资分析专家 | 曼哈顿皇后区投资房产专家'
      : 'Henry Yue - NYC Real Estate AI Investment Analysis Expert | Manhattan Queens Investment Specialist';
    document.title = title;
    
    // Update meta description
    const description = language === 'zh'
      ? 'Henry Yue，纽约州持牌房地产经纪人，专业提供NYC房产投资分析、ROI计算、现金流分析。覆盖曼哈顿、皇后区、布鲁克林、拿骚县。15年经验，双语服务。免费咨询: 718-717-5210'
      : 'Henry Yue, Licensed NYC Real Estate Agent specializing in AI-powered investment analysis for Manhattan, Queens, Brooklyn & Nassau County. Expert ROI calculations, cash flow analysis. 15+ years experience, bilingual service. Free consultation: 718-717-5210';
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
    
    // Update keywords
    const keywords = language === 'zh'
      ? 'Henry Yue, 纽约房地产经纪人, NYC投资分析, 曼哈顿房产, 皇后区投资, ROI计算器, 房产投资分析, 纽约持牌经纪, 双语房产服务, 现金流分析'
      : 'Henry Yue, NYC real estate agent, Manhattan properties, Queens investment, Brooklyn homes, Nassau County real estate, ROI calculator, investment analysis, licensed NY agent, bilingual service';
    
    let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords;
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    if (ogTitle) {
      ogTitle.content = title;
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
    if (ogDescription) {
      ogDescription.content = description;
    }
    
    // Update language attribute
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en-US';
    
    // Update canonical URL based on current language
    const currentPath = window.location.pathname;
    let canonicalUrl = 'https://www.realhenryyue.com';
    
    if (currentPath.startsWith('/zh')) {
      canonicalUrl += '/zh';
    } else if (currentPath.startsWith('/en')) {
      canonicalUrl += '/en';
    } else {
      canonicalUrl += '/en'; // Default to English
    }
    
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    
    // Add proper hreflang tags
    const existingHreflang = document.querySelectorAll('link[hreflang]');
    existingHreflang.forEach(link => link.remove());
    
    const hreflangs = [
      { lang: 'en-US', href: 'https://www.realhenryyue.com/en' },
      { lang: 'zh-CN', href: 'https://www.realhenryyue.com/zh' },
      { lang: 'x-default', href: 'https://www.realhenryyue.com/en' }
    ];
    
    hreflangs.forEach(({ lang, href }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = href;
      document.head.appendChild(link);
    });
    
  }, [language]);

  return null;
};