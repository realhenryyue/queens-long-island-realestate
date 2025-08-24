import { useLocation } from 'react-router-dom';
import { useCallback } from 'react';

// Comprehensive language hook with all translations
export const useLanguage = () => {
  const location = useLocation();
  
  // Determine language from URL path
  const getLanguageFromPath = (pathname: string) => {
    if (pathname.startsWith('/zh')) return 'zh';
    return 'en';
  };

  const currentLanguage = getLanguageFromPath(location.pathname);

  // Complete translations with ALL required keys
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
    'experience.realEstate1': { en: 'Real Estate Agent', zh: '房地产经纪人' },
    'experience.realEstate1.period': { en: '2015 - Present', zh: '2015年 - 至今' },
    'experience.realEstate1.location': { en: 'New York', zh: '纽约' },
    'experience.realEstate1.type': { en: 'Licensed Agent', zh: '持牌经纪人' },
    'experience.realEstate1.description': { en: 'Providing comprehensive real estate services in Queens, Manhattan, and Long Island.', zh: '在皇后区、曼哈顿和长岛提供全面的房地产服务。' },

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
    'contact.form.email': { en: 'Email', zh: '邮箱' },

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

    // Market Analysis Hub
    'localMarket.flushingTrend.title': { en: 'Flushing Real Estate Market Trends', zh: '法拉盛房地产市场趋势' },
    'localMarket.flushingTrend.content': { en: 'Comprehensive analysis of Flushing housing market with latest pricing trends.', zh: '法拉盛房地产市场的全面分析，包含最新价格趋势。' },
    'localMarket.queensGuide.title': { en: 'Queens Neighborhoods Investment Guide', zh: '皇后区社区投资指南' },
    'localMarket.queensGuide.content': { en: 'Detailed guide to the best investment neighborhoods in Queens.', zh: '皇后区最佳投资社区的详细指南。' },
    'localMarket.schoolDistrict.title': { en: 'School District Impact on Property Value', zh: '学区对房产价值的影响' },
    'localMarket.schoolDistrict.content': { en: 'How school ratings affect property values and investment potential.', zh: '学校评级如何影响房产价值和投资潜力。' },
    'localMarket.rentalYield.title': { en: 'NYC Rental Yield Analysis', zh: 'NYC租金回报率分析' },
    'localMarket.rentalYield.content': { en: 'Comprehensive rental yield analysis across NYC boroughs.', zh: 'NYC各区的全面租金回报率分析。' },

    // Educational Content
    'educational.foreignBuyer.title': { en: 'Foreign Buyer\'s Guide to NYC Real Estate', zh: '外国买家纽约房地产指南' },
    'educational.foreignBuyer.content': { en: 'Complete guide for international buyers purchasing NYC real estate.', zh: '国际买家购买纽约房地产的完整指南。' },
    'educational.foreignBuyer.point1': { en: 'FIRPTA tax implications for foreign buyers', zh: '外国买家的FIRPTA税务影响' },
    'educational.foreignBuyer.point2': { en: 'Required documentation and legal processes', zh: '所需文件和法律程序' },
    'educational.foreignBuyer.point3': { en: 'Financing options for non-US citizens', zh: '非美国公民的融资选择' },
    'educational.foreignBuyer.point4': { en: 'Currency exchange and international wire transfers', zh: '货币兑换和国际电汇' },

    'educational.buyingProcess.title': { en: 'Complete NYC Home Buying Process', zh: '完整的纽约购房流程' },
    'educational.buyingProcess.content': { en: 'Step-by-step guide to buying a home in New York City.', zh: '在纽约市购房的分步指南。' },
    'educational.buyingProcess.point1': { en: 'Pre-approval and financing preparation', zh: '预批准和融资准备' },
    'educational.buyingProcess.point2': { en: 'Property search and market analysis', zh: '房产搜索和市场分析' },
    'educational.buyingProcess.point3': { en: 'Offer negotiation and contract signing', zh: '报价谈判和合同签署' },
    'educational.buyingProcess.point4': { en: 'Inspection, appraisal, and closing process', zh: '检查、评估和过户流程' },

    'educational.loanGuide.title': { en: 'NYC Home Loan and Financing Guide', zh: '纽约房屋贷款和融资指南' },
    'educational.loanGuide.content': { en: 'Comprehensive guide to home financing options in NYC.', zh: '纽约房屋融资选择的综合指南。' },
    'educational.loanGuide.point1': { en: 'Conventional loans vs FHA loans comparison', zh: '传统贷款与FHA贷款比较' },
    'educational.loanGuide.point2': { en: 'Non-QM loans for self-employed buyers', zh: '自雇买家的Non-QM贷款' },
    'educational.loanGuide.point3': { en: 'Down payment assistance programs', zh: '首付款援助计划' },
    'educational.loanGuide.point4': { en: 'Credit score requirements and improvement tips', zh: '信用评分要求和改善建议' },

    'educational.taxOptimization.title': { en: 'NYC Real Estate Tax Optimization', zh: '纽约房地产税务优化' },
    'educational.taxOptimization.content': { en: 'Strategic tax planning for NYC real estate investments.', zh: '纽约房地产投资的战略税务规划。' },
    'educational.taxOptimization.point1': { en: 'LLC setup for real estate investments', zh: '房地产投资的LLC设置' },
    'educational.taxOptimization.point2': { en: '1031 exchanges for investment properties', zh: '投资房产的1031交换' },
    'educational.taxOptimization.point3': { en: 'STAR and SCHE exemption applications', zh: 'STAR和SCHE免税申请' },
    'educational.taxOptimization.point4': { en: 'Capital gains optimization strategies', zh: '资本收益优化策略' },

    // Market Insights
    'insights.salesReport.title': { en: 'July 2025 Queens Sales Report', zh: '2025年7月皇后区销售报告' },
    'insights.salesReport.content': { en: 'Latest market data and sales trends for Queens real estate.', zh: '皇后区房地产的最新市场数据和销售趋势。' },
    'insights.domAnalysis.title': { en: 'Days on Market Analysis', zh: '市场停留天数分析' },
    'insights.domAnalysis.content': { en: 'Analysis of how quickly properties sell in different NYC areas.', zh: '纽约不同地区房产销售速度分析。' },
    'insights.topNeighborhoods.title': { en: 'Top Investment Neighborhoods 2025', zh: '2025年顶级投资社区' },
    'insights.topNeighborhoods.content': { en: 'Best neighborhoods for real estate investment in NYC.', zh: '纽约房地产投资的最佳社区。' },

    // Neighborhood names
    'insights.topCommunities.flushing': { en: 'Flushing', zh: '法拉盛' },
    'insights.topCommunities.longIslandCity': { en: 'Long Island City', zh: '长岛市' },
    'insights.topCommunities.astoria': { en: 'Astoria', zh: '阿斯托利亚' },
    'insights.topCommunities.sunsetPark': { en: 'Sunset Park', zh: '日落公园' },
    'insights.topCommunities.parkSlope': { en: 'Park Slope', zh: '公园坡' },
    'insights.topCommunities.bayside': { en: 'Bayside', zh: '贝赛德' },
    'insights.topCommunities.forestHills': { en: 'Forest Hills', zh: '森林山' },
    'insights.topCommunities.regoPark': { en: 'Rego Park', zh: '瑞格公园' },
    'insights.topCommunities.elmhurst': { en: 'Elmhurst', zh: '艾尔姆赫斯特' },
    'insights.topCommunities.jacksonHeights': { en: 'Jackson Heights', zh: '杰克逊高地' },

    // ROI Calculator
    'roi.title': { en: 'Investment Property ROI Calculator', zh: '投资房产投资回报率计算器' },
    'roi.subtitle': { en: 'Advanced AI-powered analysis for NYC real estate investments', zh: 'NYC房地产投资的高级AI分析' },

    // Blog Section
    'blog.title': { en: 'Latest Real Estate Insights', zh: '最新房地产见解' },
    'blog.subtitle': { en: 'Expert analysis and market updates', zh: '专家分析和市场更新' },

    // SEO and sharing
    'seo.shareTitle': { en: 'Henry Yue - NYC Real Estate Expert', zh: 'Henry岳 - NYC房地产专家' },
    'seo.shareDescription': { en: 'Trusted NYC real estate agent with AI-powered investment analysis', zh: '值得信赖的纽约房地产经纪人，提供AI投资分析' }
  };

  // Translation function with fallback
  const t = useCallback((key: string): string => {
    const translation = translations[key as keyof typeof translations];
    if (translation && translation[currentLanguage]) {
      return translation[currentLanguage];
    }
    // Return the key itself as fallback - this prevents crashes
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