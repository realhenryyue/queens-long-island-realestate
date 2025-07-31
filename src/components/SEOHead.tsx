import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const SEOHead = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Update document title
    document.title = t('seo.title');
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('seo.description'));
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = t('seo.description');
      document.head.appendChild(newMetaDescription);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', t('seo.keywords'));
    } else {
      const newMetaKeywords = document.createElement('meta');
      newMetaKeywords.name = 'keywords';
      newMetaKeywords.content = t('seo.keywords');
      document.head.appendChild(newMetaKeywords);
    }
  }, [t]);

  return null;
};