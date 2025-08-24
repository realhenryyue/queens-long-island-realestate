import { useLocation } from 'react-router-dom';

export const useLanguage = () => {
  const location = useLocation();
  const currentLanguage = location.pathname.startsWith('/zh') ? 'zh' : 'en';

  // 完整的翻译系统
  const translations = {
    // Hero Section
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

    // Services Section
    'services.title': {
      en: 'Comprehensive Real Estate Services',
      zh: '全方位房地产服务'
    },
    'services.subtitle': {
      en: 'Professional real estate services tailored to your needs in New York',
      zh: '为您在纽约量身定制的专业房地产服务'
    },
    'services.buyingService.title': {
      en: 'Home Buying',
      zh: '购房服务'
    },
    'services.buyingService.description': {
      en: 'Find your perfect home with expert guidance through every step of the buying process.',
      zh: '在专业指导下找到您的完美家园，全程协助购房流程。'
    },
    'services.firstTime.title': {
      en: 'First-Time Buyers',
      zh: '首次购房者'
    },
    'services.firstTime.description': {
      en: 'Special guidance and support for first-time homebuyers navigating the NYC market.',
      zh: '为首次在纽约市场购房的买家提供特别指导和支持。'
    },
    'services.investment.title': {
      en: 'Investment Properties',
      zh: '投资房产'
    },
    'services.investment.description': {
      en: 'Build wealth through smart real estate investments with data-driven analysis.',
      zh: '通过数据驱动分析进行明智的房地产投资，建立财富。'
    },
    'services.licensed.title': {
      en: 'Licensed Professional',
      zh: '持牌专业人士'
    },
    'services.licensed.description': {
      en: 'Fully licensed New York State real estate professional with years of experience.',
      zh: '拥有多年经验的纽约州持牌房地产专业人士。'
    },
    'services.commercial.title': {
      en: 'Commercial Real Estate',
      zh: '商业地产'
    },
    'services.commercial.description': {
      en: 'Expert guidance for commercial property investments and transactions.',
      zh: '为商业地产投资和交易提供专业指导。'
    },
    'services.bilingual.title': {
      en: 'Bilingual Service',
      zh: '双语服务'
    },
    'services.bilingual.description': {
      en: 'Fluent in English and Chinese, serving diverse communities with cultural understanding.',
      zh: '精通英文和中文，以文化理解服务多元化社区。'
    },

    // About Section  
    'about.title': {
      en: 'About Henry Yue',
      zh: '关于岳泓宇先生'
    },
    'about.subtitle': {
      en: 'With over a decade of experience in New York real estate, Henry Yue brings unparalleled expertise to help clients achieve their property goals.',
      zh: '凭借超过十年的纽约房地产经验，岳泓宇先生为客户实现房产目标提供无与伦比的专业知识。'
    },
    'about.localExpert.title': {
      en: 'Local Market Expert',
      zh: '当地市场专家'
    },
    'about.localExpert.description': {
      en: 'Deep knowledge of Queens, Long Island, and NYC markets with insights into neighborhood trends.',
      zh: '对皇后区、长岛和纽约市场有深入了解，洞察社区趋势。'
    },
    'about.bilingual.title': {
      en: 'Bilingual Communication',
      zh: '双语沟通'
    },
    'about.bilingual.description': {
      en: 'Fluent in English and Chinese, bridging cultural gaps for international clients.',
      zh: '精通英文和中文，为国际客户架起文化沟通的桥梁。'
    },
    'about.experience.title': {
      en: 'Proven Experience',
      zh: '丰富经验'
    },
    'about.experience.description': {
      en: 'Successfully helped hundreds of families buy, sell, and invest in New York real estate.',
      zh: '成功帮助数百个家庭在纽约房地产市场买卖和投资。'
    },
    'about.cta': {
      en: 'Get in Touch',
      zh: '联系我们'
    },

    // Stats
    'stats.areas.value': { en: '5+', zh: '5+' },
    'stats.areas.label': { en: 'Service Areas', zh: '服务区域' },
    'stats.areas.description': { en: 'NYC Boroughs', zh: '纽约五大区' },
    'stats.licensed.value': { en: 'NY', zh: 'NY' },
    'stats.licensed.label': { en: 'Licensed', zh: '持牌' },
    'stats.licensed.description': { en: 'State Licensed', zh: '州政府持牌' },
    'stats.availability.value': { en: '24/7', zh: '24/7' },
    'stats.availability.label': { en: 'Available', zh: '随时服务' },
    'stats.availability.description': { en: 'Client Support', zh: '客户支持' },
    'stats.clients.value': { en: '500+', zh: '500+' },
    'stats.clients.label': { en: 'Happy Clients', zh: '满意客户' },
    'stats.clients.description': { en: 'Served', zh: '已服务' },

    // Experience
    'experience.title': { en: 'Professional Experience', zh: '专业经历' },

    // Contact Section
    'contact.title': { en: 'Contact Henry Yue', zh: '联系岳泓宇先生' },
    'contact.subtitle': { en: 'Ready to start your real estate journey? Get in touch today.', zh: '准备开始您的房地产之旅？今天就联系我们。' },
    'contact.getInTouch': { en: 'Get in Touch', zh: '联系方式' },
    'contact.callText': { en: 'Call or Text', zh: '电话或短信' },
    'contact.email': { en: 'Email', zh: '邮箱' },
    'contact.serviceAreas': { en: 'Service Areas', zh: '服务区域' },
    'contact.bestTimes': { en: 'Best Times to Contact', zh: '最佳联系时间' },
    'contact.weekdays': { en: 'Weekdays: 9 AM - 8 PM', zh: '工作日：上午9点 - 晚上8点' },
    'contact.weekends': { en: 'Weekends: 10 AM - 6 PM', zh: '周末：上午10点 - 下午6点' },
    'contact.emergency': { en: 'Emergency: Available 24/7', zh: '紧急情况：24/7全天候' },
    'contact.sendMessage': { en: 'Send a Message', zh: '发送消息' },
    'contact.fullName': { en: 'Full Name', zh: '姓名' },
    'contact.phoneNumber': { en: 'Phone Number', zh: '电话号码' },
    'contact.emailAddress': { en: 'Email Address', zh: '邮箱地址' },
    'contact.howCanHelp': { en: 'How can I help you?', zh: '我能为您做些什么？' },
    'contact.placeholder': { en: 'Tell me about your real estate needs...', zh: '告诉我您的房地产需求...' },
    'contact.sendButton': { en: 'Send Message', zh: '发送消息' },

    // Footer
    'footer.name': { en: 'Henry Yue', zh: '岳泓宇' },
    'footer.title': { en: 'Licensed Real Estate Agent', zh: '持牌房地产经纪人' },
    'footer.services': { en: 'Services', zh: '服务项目' },
    'footer.services.residential': { en: 'Residential Sales', zh: '住宅销售' },
    'footer.services.firstTime': { en: 'First-Time Buyers', zh: '首次购房' },
    'footer.services.analysis': { en: 'Investment Analysis', zh: '投资分析' },
    'footer.services.management': { en: 'Property Management', zh: '物业管理' },
    'footer.services.investment': { en: 'Investment Properties', zh: '投资房产' },
    'footer.services.bilingual': { en: 'Bilingual Service', zh: '双语服务' },
    'footer.offices': { en: 'Office Locations', zh: '办公地点' },
    'footer.offices.team': { en: 'Team Real Estate', zh: 'Team Real Estate' },
    'footer.offices.flushing': { en: 'Flushing Office', zh: '法拉盛办公室' },
    'footer.offices.greatNeck': { en: 'Great Neck Office', zh: '大颈办公室' },
    'footer.wechatTitle': { en: 'WeChat', zh: '微信' },
    'footer.wechatAlt': { en: 'WeChat QR Code', zh: '微信二维码' },
    'footer.wechat': { en: 'henryyue2024', zh: 'henryyue2024' },
    'footer.copyright': { en: '© 2024 Henry Yue Real Estate. All rights reserved.', zh: '© 2024 岳泓宇房地产。保留所有权利。' },
    'footer.equalHousing': { en: 'Equal Housing Opportunity', zh: '平等住房机会' },

    // ROI Calculator
    'roi.title': { en: 'Investment Property ROI Calculator', zh: '投资房产投资回报率计算器' },
    'roi.subtitle': { en: 'Advanced AI-powered analysis for NYC real estate investments', zh: 'NYC房地产投资的高级AI分析' },

    // Blog Section
    'blog.title': { en: 'Latest Real Estate Insights', zh: '最新房地产见解' },
    'blog.subtitle': { en: 'Expert analysis and market updates', zh: '专家分析和市场更新' },

    // Market Analysis
    'marketAnalysis.title': { en: 'Market Analysis Hub', zh: '市场分析中心' },
    'marketAnalysis.subtitle': { en: 'Comprehensive real estate market insights and trends', zh: '全面的房地产市场洞察和趋势' }
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