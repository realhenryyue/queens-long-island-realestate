import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const OptimizedSEO = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Optimized titles under 60 characters
    const title = language === 'zh' 
      ? 'Henry岳先生 - NYC房地产AI投资专家 | 五大区服务'
      : 'Henry Yue - NYC Real Estate AI Expert | 5 Boroughs';
    
    document.title = title;
    
    // Optimized meta description under 160 characters
    const description = language === 'zh'
      ? 'NYC房地产AI投资分析专家Henry岳先生，15年经验服务五大区华人客户。提供双语ROI计算器、投资咨询。电话: 718-717-5210'
      : 'NYC Real Estate AI Investment Expert Henry Yue, 15+ years serving 5 boroughs Chinese clients. Bilingual ROI calculator & consulting. Call: 718-717-5210';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }
    
    // Enhanced keywords (concise)
    const keywords = language === 'zh'
      ? 'Henry岳先生,NYC房地产AI投资,纽约五大区地产,曼哈顿皇后区投资,华人房产经纪,双语地产服务,ROI计算器,投资分析,718-717-5210'
      : 'Henry Yue,NYC real estate AI,New York 5 boroughs,Manhattan Queens investment,Chinese agent,bilingual service,ROI calculator,investment analysis,718-717-5210';
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      metaKeywords.setAttribute('content', keywords);
      document.head.appendChild(metaKeywords);
    }

    // Set canonical URL to unified domain (no www)
    const canonicalUrl = 'https://realhenryyue.com';
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonical);
    }

    // Update Open Graph tags with optimized content
    const ogMeta = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:locale', content: language === 'zh' ? 'zh_CN' : 'en_US' },
      { property: 'og:site_name', content: language === 'zh' ? 'Henry岳房地产' : 'Henry Yue Real Estate' },
      { property: 'og:image', content: 'https://realhenryyue.com/assets/agent-photo.jpg' },
      { property: 'og:image:width', content: '400' },
      { property: 'og:image:height', content: '400' }
    ];

    ogMeta.forEach(({ property, content }) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Add Twitter Card meta
    const twitterMeta = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: 'https://realhenryyue.com/assets/agent-photo.jpg' }
    ];

    twitterMeta.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Add geo-targeting meta tags
    const geoMeta = [
      { name: 'geo.region', content: 'US-NY' },
      { name: 'geo.placename', content: 'New York City' },
      { name: 'geo.position', content: '40.7128;-74.0060' },
      { name: 'ICBM', content: '40.7128, -74.0060' }
    ];

    geoMeta.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

  }, [language]);

  return null;
};