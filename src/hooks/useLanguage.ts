import { useLocation } from 'react-router-dom';
import { useCallback } from 'react';

// Simplified language hook that works reliably
export const useLanguage = () => {
  const location = useLocation();
  
  // Determine language from URL path
  const getLanguageFromPath = (pathname: string) => {
    if (pathname.startsWith('/zh')) return 'zh';
    return 'en';
  };

  const currentLanguage = getLanguageFromPath(location.pathname);

  // Complete translations
  const translations = {
    'hero.title': {
      en: 'Your Trusted Real Estate Partner in Queens & Long Island',
      zh: 'Real Henry Yue | 纽约房产投资分析权威 | 数据驱动地产投资专家'
    },
    'hero.subtitle': {
      en: 'Licensed New York Real Estate Agent specializing in helping you find your dream home or investment property with personalized service and local expertise. Serving Flushing, Manhattan, Nassau County and all of New York State.',
      zh: '纽约州持牌房地产经纪人，专精纽约房产投资分析、现金回报率计算、投资风险模拟。为华人投资者提供数据驱动的纽约投资型物业评估服务，覆盖曼哈顿、皇后区、长岛及全纽约州投资机会分析'
    },
    'hero.slogan': {
      en: 'MOVE ON, CARRY ON.',
      zh: '換個地方, 續寫傳奇.'
    },
    'hero.agentAlt': {
      en: 'Hongyu (Henry) Yue - Real Estate Agent',
      zh: '岳泓宇 - 房地产经纪人'
    },
    'hero.agentName': {
      en: 'Hongyu (Henry) Yue',
      zh: '岳泓宇'
    },
    'hero.agentTitle': {
      en: 'Licensed Real Estate Agent',
      zh: '持牌房地产经纪人'
    },
    'hero.agent': {
      en: 'Licensed Agent',
      zh: '持牌经纪人'
    },
    'hero.locations': {
      en: 'Queens • Long Island • New York',
      zh: '皇后区 • 长岛 • 纽约'
    },
    'contact.title': {
      en: 'Contact Henry Yue',
      zh: '联系岳泓宇先生'
    },
    'services.title': {
      en: 'Comprehensive Real Estate Services',
      zh: '全方位房地产服务'
    },
    'services.buying.title': {
      en: 'Home Buying',
      zh: '购房服务'
    },
    'services.buying.description': {
      en: 'Find your perfect home with expert guidance through every step of the buying process.',
      zh: '在专业指导下找到您的完美家园，全程协助购房流程。'
    },
    'services.selling.title': {
      en: 'Home Selling',
      zh: '售房服务'
    },
    'services.selling.description': {
      en: 'Maximize your property value with strategic marketing and expert negotiation.',
      zh: '通过战略营销和专业谈判最大化您的房产价值。'
    },
    'services.investment.title': {
      en: 'Investment Properties',
      zh: '投资房产'
    },
    'services.investment.description': {
      en: 'Build wealth through smart real estate investments with data-driven analysis.',
      zh: '通过数据驱动分析进行明智的房地产投资，建立财富。'
    },
    'about.title': {
      en: 'About Henry Yue',
      zh: '关于岳泓宇先生'
    },
    'about.description': {
      en: 'With over a decade of experience in New York real estate, Henry Yue brings unparalleled expertise to help clients achieve their property goals.',
      zh: '凭借超过十年的纽约房地产经验，岳泓宇先生为客户实现房产目标提供无与伦比的专业知识。'
    }
  };

  // Translation function
  const t = useCallback((key: string): string => {
    const translation = translations[key as keyof typeof translations];
    if (translation && translation[currentLanguage]) {
      return translation[currentLanguage];
    }
    return key;
  }, [currentLanguage]);

  // Language switching function
  const setLanguage = useCallback((newLang: 'en' | 'zh') => {
    const currentPath = location.pathname;
    let newPath: string;
    
    if (currentPath === '/' || currentPath === '') {
      newPath = newLang === 'en' ? '/' : `/${newLang}`;
    } else if (currentPath.startsWith('/zh')) {
      newPath = newLang === 'en' ? '/' : currentPath.replace('/zh', `/${newLang}`);
    } else if (currentPath.startsWith('/en')) {
      newPath = newLang === 'en' ? '/' : currentPath.replace('/en', `/${newLang}`);
    } else {
      newPath = newLang === 'en' ? '/' : `/${newLang}`;
    }
    
    window.location.href = newPath;
  }, [location.pathname]);

  return {
    currentLanguage,
    language: currentLanguage,
    t,
    setLanguage
  };
};