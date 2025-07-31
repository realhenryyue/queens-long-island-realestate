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
    zh: 'Henry岳先生 | 纽约专业房地产经纪人 | 双语地产服务专家'
  },
  'hero.subtitle': {
    en: 'Licensed New York Real Estate Agent specializing in helping you find your dream home or investment property with personalized service and local expertise. Serving Flushing, Manhattan, Nassau County and all of New York State.',
    zh: '纽约州持牌房地产经纪人，专业服务曼哈顿、皇后区、长岛地区，为华人客户提供双语房产咨询与投资建议'
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
  
  // Services Section
  'services.title': {
    en: 'Professional Real Estate Services',
    zh: '纽约房地产服务 - 专业海外买房投资指导'
  },
  'services.subtitle': {
    en: 'Comprehensive real estate services for home buyers, sellers, and investors across Queens, Long Island, and Manhattan',
    zh: '为海外买房客户、纽约房产投资者提供专业服务，覆盖法拉盛商业楼、曼哈顿地产等优质房源推荐'
  },
  'services.buyingService.title': {
    en: 'Home Buying Services',
    zh: '纽约买房服务'
  },
  'services.buyingService.description': {
    en: 'Expert guidance for international and domestic buyers in Queens, Long Island, and throughout New York State.',
    zh: '专业指导海外买房客户在皇后区、长岛及纽约州各地区购买优质房产，提供全方位纽约房地产服务。'
  },
  'services.firstTime.title': {
    en: 'First-Time Buyer Consultation',
    zh: '首次购房咨询'
  },
  'services.firstTime.description': {
    en: 'Professional support for first-time home buyers, making the process smooth and stress-free.',
    zh: '为首次海外买房的客户提供专业支持，让纽约生活置业过程轻松无忧。'
  },
  'services.investment.title': {
    en: 'Investment Property Analysis',
    zh: '房产投资分析'
  },
  'services.investment.description': {
    en: 'Comprehensive market analysis and property valuation to help you make informed investment decisions.',
    zh: '提供全面的纽约房地产市场分析和房产估值，助您做出明智的投资决策。'
  },
  'services.licensed.title': {
    en: 'Licensed Professional',
    zh: '持牌专业经纪'
  },
  'services.licensed.description': {
    en: 'New York State licensed real estate agent with deep local market knowledge and regulatory expertise.',
    zh: '纽约州持牌房地产经纪人，深度了解当地市场和法规，为您的纽约房产投资保驾护航。'
  },
  'services.commercial.title': {
    en: 'Commercial Property Services',
    zh: '法拉盛商业楼推荐'
  },
  'services.commercial.description': {
    en: 'Specialized commercial property investment opportunities and complete property management services.',
    zh: '专注法拉盛商业楼投资机会，为投资者和租赁物业业主提供完整的房产管理服务。'
  },
  'services.bilingual.title': {
    en: 'Bilingual Personalized Service',
    zh: '双语贴心服务'
  },
  'services.bilingual.description': {
    en: 'Dedicated bilingual service with deep understanding of diverse client needs for confident transactions.',
    zh: '提供中英双语专属服务，深度理解华人客户需求，让您的纽约生活置业更加放心。'
  },

  // Contact Section
  'contact.title': {
    en: 'Contact Henry Yue - Start Your Real Estate Journey',
    zh: '联系Henry岳先生 - 开启您的纽约房产投资之旅'
  },
  'contact.subtitle': {
    en: 'Get in touch for a free consultation. Professional guidance for your property investment and home buying needs.',
    zh: '立即联系我获得免费咨询，专业的曼哈顿地产中介为您的海外买房、纽约房地产投资保驾护航'
  },
  'contact.getInTouch': {
    en: 'Get In Touch',
    zh: '联系方式'
  },
  'contact.callText': {
    en: 'Call or Text',
    zh: '电话或短信'
  },
  'contact.email': {
    en: 'Email',
    zh: '邮箱'
  },
  'contact.serviceAreas': {
    en: 'Service Areas',
    zh: '服务区域'
  },
  'contact.bestTimes': {
    en: 'Best Times to Reach Me:',
    zh: '最佳联系时间：'
  },
  'contact.weekdays': {
    en: 'Monday - Friday: 8:00 AM - 8:00 PM',
    zh: '周一至周五：上午8点 - 晚上8点'
  },
  'contact.weekends': {
    en: 'Saturday - Sunday: 9:00 AM - 6:00 PM',
    zh: '周六至周日：上午9点 - 晚上6点'
  },
  'contact.emergency': {
    en: 'Emergency inquiries: Available 24/7',
    zh: '紧急咨询：24/7全天候服务'
  },
  'contact.sendMessage': {
    en: 'Send a Message',
    zh: '发送消息'
  },
  'contact.fullName': {
    en: 'Full Name *',
    zh: '姓名 *'
  },
  'contact.phoneNumber': {
    en: 'Phone Number',
    zh: '电话号码'
  },
  'contact.emailAddress': {
    en: 'Email Address *',
    zh: '邮箱地址 *'
  },
  'contact.howCanHelp': {
    en: 'How can I help you? *',
    zh: '我如何为您提供帮助？*'
  },
  'contact.placeholder': {
    en: 'Tell me about your real estate needs, preferred areas, timeline, or any questions you have...',
    zh: '请告诉我您的房地产需求、偏好区域、时间安排或任何问题...'
  },
  'contact.sendButton': {
    en: 'Send Message',
    zh: '发送消息'
  },

  // Social Share
  'share.text': {
    en: 'Share:',
    zh: '分享:'
  },
  'share.wechatQR': {
    en: 'Scan QR Code to Share on WeChat',
    zh: '扫描二维码分享到微信'
  },
  'share.wechatScan': {
    en: 'Scan with WeChat to share',
    zh: '用微信扫描二维码分享'
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
    en: 'Henry Yue - Licensed New York Real Estate Agent | Queens & Long Island Properties',
    zh: 'Henry岳先生 - 纽约房地产经纪人 | 曼哈顿、皇后区专业地产服务'
  },
  'seo.description': {
    en: 'Licensed New York real estate agent Henry Yue provides professional property services in Queens, Long Island & Manhattan. Expert guidance for home buyers, sellers & investors.',
    zh: 'Henry岳先生，纽约州持牌房地产经纪人，专业服务皇后区、长岛、曼哈顿地区。提供双语房产咨询，协助海外买房、投资置业，拥有丰富的当地市场经验。'
  },
  'seo.keywords': {
    en: 'Henry Yue, New York real estate agent, Queens properties, Long Island homes, Manhattan real estate, licensed agent, property investment, home buying services',
    zh: 'Henry岳先生, 纽约房地产经纪人, 曼哈顿地产, 皇后区房产, 海外买房, 法拉盛商业楼, 华人地产经纪, 房产投资咨询'
  },
  'seo.shareTitle': {
    en: 'Henry Yue - Licensed Real Estate Agent | Professional Property Services',
    zh: 'Henry岳先生 | 纽约华人地产经纪 | 专业海外买房投资服务'
  },
  'seo.shareDescription': {
    en: 'Professional New York real estate agent providing expert guidance for property investment, home buying, and commercial real estate services.',
    zh: '专业纽约房地产经纪人，提供海外买房、纽约房产投资、法拉盛商业楼推荐等服务'
  },

  // Real Estate Section
  'realEstate.title': {
    en: 'Premium Real Estate Listings',
    zh: '精选房地产列表'
  },
  'realEstate.subtitle': {
    en: 'Intelligently curated properties based on market analysis and value optimization',
    zh: '基于市场分析和性价比的智能筛选，为您推荐最优质的房源'
  },
  'realEstate.searchPlaceholder': {
    en: 'Search areas (e.g., Queens, Brooklyn, Manhattan...)',
    zh: '搜索地区 (如: Queens, Brooklyn, Manhattan...)'
  },
  'realEstate.searching': {
    en: 'Searching...',
    zh: '搜索中...'
  },
  'realEstate.search': {
    en: 'Search',
    zh: '搜索'
  },
  'realEstate.filter': {
    en: 'Filter',
    zh: '筛选'
  },
  'realEstate.minPrice': {
    en: 'Min Price',
    zh: '最低价格'
  },
  'realEstate.maxPrice': {
    en: 'Max Price',
    zh: '最高价格'
  },
  'realEstate.noLimit': {
    en: 'No limit',
    zh: '不限'
  },
  'realEstate.propertyType': {
    en: 'Property Type',
    zh: '房屋类型'
  },
  'realEstate.allTypes': {
    en: 'All Types',
    zh: '所有类型'
  },
  'realEstate.house': {
    en: 'House',
    zh: '独立屋'
  },
  'realEstate.condo': {
    en: 'Condo',
    zh: '公寓'
  },
  'realEstate.townhouse': {
    en: 'Townhouse',
    zh: '联排别墅'
  },
  'realEstate.sortBy': {
    en: 'Sort By',
    zh: '排序方式'
  },
  'realEstate.newest': {
    en: 'Newest',
    zh: '最新发布'
  },
  'realEstate.priceLow': {
    en: 'Price: Low to High',
    zh: '价格从低到高'
  },
  'realEstate.priceHigh': {
    en: 'Price: High to Low',
    zh: '价格从高到低'
  },
  'realEstate.valueScore': {
    en: 'Value Score',
    zh: '性价比评分'
  },
  'realEstate.marketScore': {
    en: 'Market Score',
    zh: '市场评分'
  },
  'realEstate.loading': {
    en: 'Loading property information...',
    zh: '正在加载房源信息...'
  },
  'realEstate.noResults': {
    en: 'No properties match your criteria',
    zh: '暂无符合条件的房源'
  },
  'realEstate.adjustSearch': {
    en: 'Try adjusting your search criteria',
    zh: '请尝试调整搜索条件'
  },
  'realEstate.viewDetails': {
    en: 'View Details',
    zh: '查看详情'
  },
  'realEstate.bedrooms': {
    en: 'bed',
    zh: '卧'
  },
  'realEstate.bathrooms': {
    en: 'bath',
    zh: '卫'
  },
  'realEstate.sqft': {
    en: 'sqft',
    zh: '平方英尺'
  },
  'realEstate.perSqft': {
    en: '/sqft',
    zh: '/平方英尺'
  },
  'realEstate.valueScore.label': {
    en: 'Value',
    zh: '性价比'
  },
  'realEstate.market': {
    en: 'Market',
    zh: '市场'
  },
  'realEstate.interest': {
    en: 'Interest',
    zh: '热度'
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
      // Missing translation for key: ${key}
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