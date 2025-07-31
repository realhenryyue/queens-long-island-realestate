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
    zh: 'Henry岳先生 | 纽约华人地产经纪 | 专业海外买房投资服务'
  },
  'hero.subtitle': {
    en: 'Licensed New York Real Estate Agent specializing in helping you find your dream home or investment property with personalized service and local expertise. Serving Flushing, Manhattan, Nassau County and all of New York State.',
    zh: '专注纽约生活、曼哈顿房产投资、法拉盛商业楼推荐，为您提供专业的纽约房地产服务'
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
    zh: '关于Henry岳先生 - 您的纽约房地产专家'
  },
  'about.subtitle': {
    en: 'As a licensed New York real estate agent with deep roots in Queens and Long Island, I bring local expertise, cultural understanding, and bilingual communication to every transaction. Specializing in New York real estate investment, luxury properties, and serving the diverse needs of international clients.',
    zh: '专业的曼哈顿华人地产经纪，为您提供全方位的纽约房产投资和海外买房服务'
  },
  'about.localExpert.title': {
    en: 'Local Market Expert',
    zh: '当地市场专家'
  },
  'about.localExpert.description': {
    en: 'Specializing in Queens and Long Island markets, I have intimate knowledge of neighborhoods, pricing trends, and investment opportunities. Whether you\'re looking in Flushing, Bayside, Nassau County, or anywhere in New York State, I\'ll guide you to the perfect property.',
    zh: '专精于皇后区和长岛市场，对纽约房源、纽约地产信息有深入了解。无论您寻找法拉盛商业楼、曼哈顿房产信息，还是需要纽约租房、纽约房产推荐服务，我都会为您提供最专业的纽约地产公司级别服务。'
  },
  'about.bilingual.title': {
    en: 'Bilingual & Cultural Support',
    zh: '双语和文化支持'
  },
  'about.bilingual.description': {
    en: 'I understand the unique needs of diverse communities and provide services in multiple languages. My cultural sensitivity and local connections help bridge communication gaps and ensure smooth transactions.',
    zh: '作为曼哈顿华人地产经纪，我深度理解多元化社区需求，提供双语服务。协助客户解决纽约生活适应、海外买房流程等问题，确保每一笔纽约房地产交易顺利完成。'
  },
  'about.experience.title': {
    en: 'Professional Experience',
    zh: '专业经验'
  },
  'about.experience.description': {
    en: 'With over 15 years of experience in sales, business development, and customer relationship management across technology and real estate sectors, I bring a comprehensive understanding of market dynamics and client needs.',
    zh: '拥有超过15年销售和客户关系管理经验，深谙纽约房地产网运营和曼哈顿房地产网络。从纽约房产经纪人到曼哈顿地产中介，致力于为每位客户提供最优质的纽约房产信息和投资建议。'
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
  },
  
  // Work Experience Section
  'experience.title': {
    en: 'Professional Journey',
    zh: '职业历程'
  },
  
  // Contact & Footer
  'footer.wechat': {
    en: '📱 Scan QR code to add Henry on WeChat for more New York property information.',
    zh: '📱 扫码添加 Henry 微信，了解更多纽约房源信息。'
  },
  'contact.form.email': {
    en: 'Email sent successfully! I will get back to you soon.',
    zh: '邮件发送成功！我会尽快回复您。'
  },
  
  // SEO Meta Tags
  'seo.title': {
    en: 'Henry Yue - Licensed Real Estate Agent | Queens & Long Island Properties',
    zh: 'Henry岳先生 - 纽约华人地产经纪 | 皇后区长岛房地产专家'
  },
  'seo.description': {
    en: 'Licensed NY real estate agent specializing in Queens, Long Island & Manhattan properties. Expert guidance for home buyers, sellers & investors. Bilingual service available.',
    zh: '纽约持牌华人地产经纪，专注皇后区、长岛、曼哈顿房产投资。提供专业海外买房、纽约地产投资咨询服务。'
  },
  'seo.keywords': {
    en: 'New York real estate agent, Queens properties, Long Island homes, Manhattan real estate, licensed agent, property investment, home buying, real estate services',
    zh: '纽约华人地产经纪,皇后区房产,长岛房地产,曼哈顿地产投资,海外买房,纽约房产中介,地产经纪人,房地产投资'
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