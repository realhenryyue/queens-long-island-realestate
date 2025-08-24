import { useLocation } from 'react-router-dom';

// Simple language hook without complex dependencies
export const useLanguage = () => {
  const location = useLocation();
  const currentLanguage = location.pathname.startsWith('/zh') ? 'zh' : 'en';

  // Essential translations only
  const translations = {
    'hero.title': {
      en: 'Your Trusted Real Estate Partner in Queens & Long Island',
      zh: 'Real Henry Yue | 纽约房产投资分析权威 | 数据驱动地产投资专家'
    },
    'hero.subtitle': {
      en: 'Licensed New York Real Estate Agent specializing in helping you find your dream home or investment property with personalized service and local expertise.',
      zh: '纽约州持牌房地产经纪人，专精纽约房产投资分析、现金回报率计算、投资风险模拟。'
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

  const t = (key) => {
    const translation = translations[key];
    return translation?.[currentLanguage] || key;
  };

  const setLanguage = (newLang) => {
    const newPath = newLang === 'en' ? '/' : '/zh';
    window.location.href = newPath;
  };

  return {
    currentLanguage,
    language: currentLanguage,
    t,
    setLanguage
  };
};