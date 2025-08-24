import { useLocation } from 'react-router-dom';

// Safe language hook that doesn't depend on context
export const useSafeLanguage = () => {
  const location = useLocation();
  
  // Determine language from URL path
  const getLanguageFromPath = (pathname: string) => {
    if (pathname.startsWith('/zh')) return 'zh';
    if (pathname.startsWith('/en')) return 'en';
    return 'en'; // Default fallback
  };

  const currentLanguage = getLanguageFromPath(location.pathname);

  // Safe translation function - this will be basic but won't crash
  const t = (key: string): string => {
    // Basic translations for essential components
    const basicTranslations: Record<string, Record<string, string>> = {
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
      }
    };

    const translation = basicTranslations[key];
    if (translation && translation[currentLanguage]) {
      return translation[currentLanguage];
    }
    
    // Return key if no translation found (this prevents crashes)
    return key;
  };

  // Safe setLanguage function that navigates to the correct route
  const setLanguage = (newLang: 'en' | 'zh') => {
    const currentPath = location.pathname;
    let newPath: string;
    
    if (currentPath === '/' || currentPath === '') {
      newPath = `/${newLang}`;
    } else if (currentPath.startsWith('/zh')) {
      newPath = currentPath.replace('/zh', `/${newLang}`);
    } else if (currentPath.startsWith('/en')) {
      newPath = currentPath.replace('/en', `/${newLang}`);
    } else {
      newPath = `/${newLang}`;
    }
    
    // Use window.location for safety (no router dependency)
    window.location.href = newPath;
  };

  return {
    currentLanguage,
    language: currentLanguage,
    t,
    setLanguage
  };
};