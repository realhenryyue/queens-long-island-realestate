import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

interface Translations {
  [key: string]: {
    en: string;
    zh: string;
  };
}

const translations: Translations = {
  // Hero Section
  'hero.title': {
    en: 'Your Trusted Real Estate Partner in Queens & Long Island',
    zh: '您在皇后区和长岛值得信赖的房地产合作伙伴'
  },
  'hero.subtitle': {
    en: 'Licensed New York Real Estate Agent specializing in helping you find your dream home or investment property with personalized service and local expertise.',
    zh: '持牌纽约房地产经纪人，专门帮助您找到梦想的家园或投资物业，提供个性化服务和当地专业知识。'
  },
  'hero.cta': {
    en: 'Start Your Home Search',
    zh: '开始寻找您的家'
  },
  'hero.contact': {
    en: 'Get Free Consultation',
    zh: '获取免费咨询'
  },
  'hero.agent': {
    en: 'Licensed Agent',
    zh: '持牌经纪人'
  },
  
  // About Section
  'about.title': {
    en: 'Why Choose Hongyu (Henry) Yue?',
    zh: '为什么选择岳宏宇(Henry)?'
  },
  'about.subtitle': {
    en: 'As a licensed New York real estate agent with deep roots in Queens and Long Island, I bring local expertise, cultural understanding, and bilingual communication to every transaction.',
    zh: '作为一名在皇后区和长岛深耕的持牌纽约房地产经纪人，我为每一笔交易带来当地专业知识、文化理解和双语沟通能力。'
  },
  'about.localExpert.title': {
    en: 'Local Market Expert',
    zh: '当地市场专家'
  },
  'about.localExpert.description': {
    en: 'Specializing in Queens and Long Island markets, I have intimate knowledge of neighborhoods, pricing trends, and investment opportunities. Whether you\'re looking in Flushing, Bayside, Nassau County, or anywhere in New York State, I\'ll guide you to the perfect property.',
    zh: '专精于皇后区和长岛市场，我对社区、价格趋势和投资机会有深入了解。无论您是在法拉盛、贝赛、拿骚县还是纽约州的任何地方寻找房产，我都会引导您找到完美的物业。'
  },
  'about.bilingual.title': {
    en: 'Bilingual & Cultural Support',
    zh: '双语和文化支持'
  },
  'about.bilingual.description': {
    en: 'I understand the unique needs of diverse communities and provide services in multiple languages. My cultural sensitivity and local connections help bridge communication gaps and ensure smooth transactions.',
    zh: '我理解多元化社区的独特需求，并提供多语言服务。我的文化敏感性和当地人脉有助于弥合沟通差距，确保交易顺利进行。'
  },
  'about.experience.title': {
    en: 'Professional Experience',
    zh: '专业经验'
  },
  'about.experience.description': {
    en: 'With over 15 years of experience in sales, business development, and customer relationship management across technology and real estate sectors, I bring a comprehensive understanding of market dynamics and client needs.',
    zh: '凭借在技术和房地产领域超过15年的销售、业务发展和客户关系管理经验，我对市场动态和客户需求有全面的理解。'
  },
  'about.cta': {
    en: 'Schedule a Consultation',
    zh: '预约咨询'
  },
  
  // Stats
  'stats.areas.value': { en: '3+', zh: '3+' },
  'stats.areas.label': { en: 'Service Areas', zh: '服务区域' },
  'stats.areas.description': { en: 'Queens, Long Island & NYC', zh: '皇后区、长岛和纽约市' },
  'stats.licensed.value': { en: 'Licensed', zh: '持牌' },
  'stats.licensed.label': { en: 'NY Agent', zh: '纽约经纪人' },
  'stats.licensed.description': { en: 'Fully certified professional', zh: '完全认证的专业人士' },
  'stats.availability.value': { en: '24/7', zh: '24/7' },
  'stats.availability.label': { en: 'Availability', zh: '可用性' },
  'stats.availability.description': { en: 'Always here when you need me', zh: '随时为您服务' },
  'stats.clients.value': { en: '100+', zh: '100+' },
  'stats.clients.label': { en: 'Happy Clients', zh: '满意客户' },
  'stats.clients.description': { en: 'Satisfied homeowners', zh: '满意的房主' },
  
  // Work Experience
  'experience.current': { en: 'Current', zh: '至今' },
  'experience.realEstate1': {
    en: 'Licensed Real Estate Salesperson at E Realty International Corp.',
    zh: 'E Realty International Corp. 持牌房地产销售员'
  },
  'experience.realEstate2': {
    en: 'Licensed Real Estate Salesperson at J-HOME Realty',
    zh: 'J-HOME Realty 持牌房地产销售员'
  },
  'experience.businessAgent': {
    en: 'Business Relationship Agent at Ideal Automotive Sales & Service',
    zh: 'Ideal Automotive Sales & Service 商业关系代理'
  },
  'experience.ceo': {
    en: 'CEO at Tianjin Zlon Culture Media Co., Ltd.',
    zh: '天津兹龙文化传媒有限公司 首席执行官'
  },
  'experience.generalManager': {
    en: 'General Manager at Beijing Huayigaote Technology Co., Ltd.',
    zh: '北京华艺高特科技有限公司 总经理'
  },
  'experience.productManager': {
    en: 'Product Manager at Shanghai WTi Information Technology Co., Ltd.',
    zh: '上海威梯信息技术有限公司 产品经理'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};