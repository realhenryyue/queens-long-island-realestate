import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  currentLanguage: Language;
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
    zh: 'Real Henry Yue | 纽约房产投资分析权威 | 数据驱动地产投资专家'
  },
  'hero.subtitle': {
    en: 'Licensed New York Real Estate Agent specializing in helping you find your dream home or investment property with personalized service and local expertise. Serving Flushing, Manhattan, Nassau County and all of New York State.',
    zh: '纽约州持牌房地产经纪人，专精纽约房产投资分析、现金回报率计算、投资风险模拟。为华人投资者提供数据驱动的纽约投资型物业评估服务，覆盖曼哈顿、皇后区、长岛及全纽约州投资机会分析'
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
  'hero.callNow': {
    en: 'Call Now: (718) 717-5210',
    zh: '立即致电: (718) 717-5210'
  },
  'hero.locations': {
    en: 'Queens • Long Island • New York',
    zh: '皇后区 • 长岛 • 纽约'
  },
  
  // About Section
  'about.title': {
    en: 'Why Choose Real Henry Yue?',
    zh: '为什么选择Real Henry Yue - 纽约房产投资分析专家'
  },
  'about.subtitle': {
    en: 'As a licensed New York real estate agent specializing in investment analysis, I combine deep market intelligence with advanced analytics to identify profitable opportunities. My expertise in NYC investment property valuation, cap rate analysis, and cash-on-cash returns helps clients make data-driven investment decisions across Queens, Manhattan, and Long Island markets.',
    zh: '作为专精投资分析的纽约州持牌房地产经纪人，我运用深度市场洞察和先进分析技术，为客户识别盈利机会。专长于纽约投资房产估值、资本化率分析、现金回报率计算，帮助投资者在皇后区、曼哈顿、长岛市场做出数据驱动的投资决策'
  },
  'about.localExpert.title': {
    en: 'NYC Investment Analysis Expert',
    zh: '纽约投资分析专家'
  },
  'about.localExpert.description': {
    en: 'Deep expertise in New York real estate investment analysis with comprehensive knowledge of NYC cap rates, rental yields, and market trends. I provide detailed investment property valuation, cash-on-cash return calculations, and risk assessment for multifamily investments, rental condos, and commercial properties across Manhattan, Queens, and Nassau County.',
    zh: '深度掌握纽约房产投资分析，全面了解纽约资本化率、租金收益率、市场趋势。提供详细的投资型物业评估、现金回报率计算、风险评估服务，涵盖曼哈顿、皇后区、拿骚县的多户型投资、租赁公寓、商业地产投资机会'
  },
  'about.bilingual.title': {
    en: 'Data-Driven Investment Intelligence',
    zh: '数据驱动投资智能分析'
  },
  'about.bilingual.description': {
    en: 'Utilizing advanced analytics and market data to provide comprehensive NY investment ROI calculations, Monte Carlo risk simulations, and trend analysis. My investment reports include comparable sales analysis, break-even calculations, and maximum purchase price recommendations based on target returns for informed decision-making.',
    zh: '运用先进分析技术和市场数据，提供全面的纽约投资回报率计算、蒙特卡洛风险模拟、趋势分析。投资报告包含可比销售分析、盈亏平衡计算、基于目标回报的最大购买价格建议，确保投资决策的科学性和准确性'
  },
  'about.experience.title': {
    en: 'Proven Investment Track Record',
    zh: '经验证的投资业绩记录'
  },
  'about.experience.description': {
    en: 'Over 15 years of combined experience in financial analysis, technology, and real estate investment. Specialized in NYC real estate trends analysis, investment property screening, and portfolio optimization. My analytical background ensures precise investment calculations and risk assessment for every New York property opportunity.',
    zh: '超过15年金融分析、科技和房地产投资综合经验。专精于纽约房地产趋势分析、投资物业筛选、投资组合优化。我的分析背景确保每个纽约房产投资机会都有精确的投资计算和风险评估'
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
    en: 'CEO at Tianjin Zilong Culture Media Co., Ltd.',
    zh: '天津紫龙文化传媒有限公司 首席执行官'
  },
  'experience.generalManager': {
    en: 'General Manager at Beijing Huayi Gaote Technology Co., Ltd.',
    zh: '北京华亿高特技术有限公司 总经理'
  },
  'experience.productManager': {
    en: 'Product Manager at Shanghai Wangting Information Technology Co., Ltd.',
    zh: '上海网庭信息科技有限公司 产品经理'
  },
  
  // Work Experience Details
  'experience.realEstate1.period': { en: 'Jan 2025 - Present', zh: '2025年1月 - 至今' },
  'experience.realEstate1.location': { en: 'New York, USA', zh: '美国纽约' },
  'experience.realEstate1.type': { en: 'Full time', zh: '全职' },
  'experience.realEstate1.description': { en: 'Move on, Carry on. Focus on investment.', zh: '换个地方，续写传奇。专注投资。' },

  'experience.businessAgent.period': { en: 'Nov 2023 - Present', zh: '2023年11月 - 至今' },
  'experience.businessAgent.location': { en: 'New York, USA', zh: '美国纽约' },
  'experience.businessAgent.type': { en: 'Part time', zh: '兼职' },
  'experience.businessAgent.description': { en: 'Customer relationship maintenance', zh: '客户关系维护' },

  'experience.realEstate2.period': { en: 'Jan 2024 - Jan 2025', zh: '2024年1月 - 2025年1月' },
  'experience.realEstate2.location': { en: 'New York, USA', zh: '美国纽约' },
  'experience.realEstate2.type': { en: 'Full time', zh: '全职' },
  'experience.realEstate2.description': { en: 'It is my mission to find a satisfactory home for my clients.', zh: '为客户找到满意的家是我的使命。' },

  'experience.ceo.period': { en: 'Mar 2018 - Oct 2023', zh: '2018年3月 - 2023年10月' },
  'experience.ceo.location': { en: 'Tianjin, China', zh: '中国天津' },
  'experience.ceo.type': { en: 'Full time', zh: '全职' },
  'experience.ceo.description': { en: 'Visual Design Marketing Manager - Culture. Media. Finance', zh: '视觉设计与营销管理 - 文化、媒体、金融。' },

  'experience.generalManager.period': { en: 'Apr 2014 - May 2017', zh: '2014年4月 - 2017年5月' },
  'experience.generalManager.location': { en: 'Beijing, China', zh: '中国北京' },
  'experience.generalManager.type': { en: 'Full time', zh: '全职' },
  'experience.generalManager.description': { en: 'NEC Movie Projector Manager - Integrating limited resources to accomplish the impossible.', zh: 'NEC电影放映机项目负责人 - 整合有限资源，完成不可能的任务。' },

  'experience.productManager.period': { en: 'Jul 2009 - Apr 2014', zh: '2009年7月 - 2014年4月' },
  'experience.productManager.location': { en: 'Beijing/Hebei/Shandong, China', zh: '中国 北京/河北/山东' },
  'experience.productManager.type': { en: 'Full time', zh: '全职' },
  'experience.productManager.description': { en: 'EPSON Home Projection Product Manager - Product sales and inventory management, develop marketing plan for the year, New customer development, team building, customer relationship maintenance.', zh: '爱普生家用投影产品经理 - 产品销售与库存管理；年度营销规划；新客户开发；团队建设；客户关系维护。' },
  
  // Services Section
  'services.title': {
    en: 'New York Real Estate Investment Analysis Services',
    zh: '纽约房产投资分析服务 - 专业投资决策支持'
  },
  'services.subtitle': {
    en: 'Comprehensive investment analysis services including NYC investment property valuation, cap rate analysis, cash-on-cash return calculations, and risk assessment for investors across Queens, Manhattan, and Long Island',
    zh: '全面的投资分析服务，包括纽约投资房产估值、资本化率分析、现金回报率计算、风险评估，为皇后区、曼哈顿、长岛的投资者提供专业投资决策支持'
  },
  'services.buyingService.title': {
    en: 'Investment Property Analysis',
    zh: '投资房产分析服务'
  },
  'services.buyingService.description': {
    en: 'Comprehensive NYC investment property valuation with detailed cap rate analysis, rental income projections, and ROI calculations. Expert analysis of multifamily investments and rental condo opportunities throughout New York State.',
    zh: '全面的纽约投资房产估值服务，包括详细的资本化率分析、租金收入预测、投资回报率计算。专业分析纽约州内多户型投资和租赁公寓投资机会。'
  },
  'services.firstTime.title': {
    en: 'Advanced Investment Analytics',
    zh: '高级投资分析技术'
  },
  'services.firstTime.description': {
    en: 'Sophisticated NY investment ROI calculator tools, Monte Carlo risk simulations, and New York real estate trends analysis to optimize your investment portfolio performance.',
    zh: '先进的纽约投资回报率计算工具、蒙特卡洛风险模拟、纽约房地产趋势分析，优化您的投资组合表现。'
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
    zh: '联系岳泓宇先生 - 开启您的纽约房产投资之旅'
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
  'experience.company1': {
    en: 'Tianjin Zilong Cultural Media Co., Ltd.',
    zh: '天津紫龙文化传媒有限公司'
  },
  'experience.company2': {
    en: 'Beijing Huayi Gaote Technology Co., Ltd.',
    zh: '北京华亿高特技术有限公司'
  },
  'experience.company3': {
    en: 'Shanghai Weiti Information Technology Co., Ltd.',
    zh: '上海网庭信息科技有限公司'
  },
  
  // Contact & Footer
  'footer.wechat': {
    en: '📱 Scan QR code to add Henry on WeChat for more New York property information.',
    zh: '📱 扫码添加岳泓宇微信，了解更多纽约房源信息。'
  },
  'footer.name': {
    en: 'Hongyu (Henry) Yue',
    zh: '岳泓宇'
  },
  'footer.title': {
    en: 'Licensed New York Real Estate Agent',
    zh: '纽约州持牌房地产经纪人'
  },
  'footer.services': {
    en: 'Services',
    zh: '服务项目'
  },
  'footer.services.residential': {
    en: 'Residential Sales',
    zh: '住宅买卖'
  },
  'footer.services.firstTime': {
    en: 'First-Time Buyer Support',
    zh: '首次购房指导'
  },
  'footer.services.analysis': {
    en: 'Market Analysis',
    zh: '市场分析'
  },
  'footer.services.management': {
    en: 'Property Management',
    zh: '物业管理'
  },
  'footer.services.investment': {
    en: 'Investment Properties',
    zh: '投资房产'
  },
  'footer.services.bilingual': {
    en: 'Bilingual Services',
    zh: '双语服务'
  },
  'footer.offices': {
    en: 'Office Locations',
    zh: '办公地点'
  },
  'footer.offices.team': {
    en: 'Team Office',
    zh: '团队办公室'
  },
  'footer.offices.flushing': {
    en: 'Flushing Office',
    zh: '法拉盛办公室'
  },
  'footer.offices.greatNeck': {
    en: 'Great Neck Office',
    zh: '大颈办公室'
  },
  'footer.wechatTitle': {
    en: 'WeChat Contact',
    zh: '微信联系'
  },
  'footer.wechatAlt': {
    en: 'Henry Yue WeChat QR Code',
    zh: '岳泓宇微信二维码'
  },
  'footer.copyright': {
    en: '© 2024 Hongyu (Henry) Yue Real Estate. Licensed New York Real Estate Agent.',
    zh: '© 2024 岳泓宇房地产。纽约州持牌房地产经纪人。'
  },
  'footer.equalHousing': {
    en: 'Equal Housing Opportunity',
    zh: '平等住房机会'
  },
  'contact.form.email': {
    en: 'Email sent successfully! I will get back to you soon.',
    zh: '邮件发送成功！我会尽快回复您。'
  },
  
  // SEO Meta Tags
  'seo.title': {
    en: 'Henry Yue - Licensed New York Real Estate Agent | Queens & Long Island Properties',
    zh: '岳泓宇先生 - 纽约房地产经纪人 | 曼哈顿、皇后区专业地产服务'
  },
  'seo.description': {
    en: 'Licensed New York real estate agent Henry Yue provides professional property services in Queens, Long Island & Manhattan. Expert guidance for home buyers, sellers & investors.',
    zh: '岳泓宇先生，纽约州持牌房地产经纪人，专业服务皇后区、长岛、曼哈顿地区。提供双语房产咨询，协助海外买房、投资置业，拥有丰富的当地市场经验。'
  },
  'seo.keywords': {
    en: 'Henry Yue, New York real estate agent, Queens properties, Long Island homes, Manhattan real estate, licensed agent, property investment, home buying services',
    zh: '岳泓宇先生, 纽约房地产经纪人, 曼哈顿地产, 皇后区房产, 海外买房, 法拉盛商业楼, 华人地产经纪, 房产投资咨询'
  },
  'seo.shareTitle': {
    en: 'Henry Yue - Licensed Real Estate Agent | Professional Property Services',
    zh: '岳泓宇先生 | 纽约华人地产经纪 | 专业海外买房投资服务'
  },
  'seo.shareDescription': {
    en: 'Professional New York real estate agent providing expert guidance for property investment, home buying, and commercial real estate services.',
    zh: '专业纽约房地产经纪人，提供海外买房、纽约房产投资、法拉盛商业楼推荐等服务'
  },

  // Market Analysis Hub
  'marketAnalysis.title': {
    en: 'New York Real Estate Market In-Depth Analysis',
    zh: '纽约房地产市场深度分析'
  },
  'marketAnalysis.subtitle': {
    en: 'A Decade of Expert Insights - Comprehensive market data, educational resources, and investment strategies for NYC real estate',
    zh: '十年专业洞察 - 纽约房地产的全面市场数据、教育资源和投资策略'
  },
  'marketAnalysis.featuredTopics': {
    en: 'Featured Topics & Keywords',
    zh: '特色主题与关键词'
  },
  'marketAnalysis.localMarket': {
    en: 'Local Market Expert',
    zh: '本地市场专家'
  },
  'marketAnalysis.educational': {
    en: 'Educational Content',
    zh: '教育内容'
  },
  'marketAnalysis.insights': {
    en: 'Market Insights',
    zh: '市场洞察'
  },

  // Local Market Content
  'localMarket.flushingTrend.title': {
    en: 'Flushing Housing Price Trend Analysis',
    zh: '法拉盛房价趋势分析'
  },
  'localMarket.flushingTrend.content': {
    en: 'Flushing, a major hub for the Chinese community in Queens, has shown a stable and consistent increase in housing prices in recent years. According to 2024 data, the median home price in Flushing grew by 6.2% year-over-year, reaching $720,000, up from $678,000 in 2023.',
    zh: '法拉盛作为皇后区华人社区的主要中心，近年来房价呈现稳定持续上涨趋势。根据2024年数据，法拉盛中位数房价同比增长6.2%，从2023年的$678,000上涨至$720,000。'
  },
  'localMarket.queensGuide.title': {
    en: 'Detailed Guide to Queens Neighborhoods',
    zh: '皇后区社区详细指南'
  },
  'localMarket.queensGuide.content': {
    en: 'Queens is renowned for its diverse cultural communities, with each neighborhood offering unique attractions. Forest Hills attracts middle-to-upper-class families with large green spaces. Bayside is highly desirable for excellent school districts.',
    zh: '皇后区以其多元文化社区而闻名，每个社区都有独特的吸引力。森林山以大片绿地吸引中高收入家庭。贝赛德因优秀的学区而备受青睐。'
  },
  'localMarket.schoolDistrict.title': {
    en: 'School District Investment Report',
    zh: '学区投资报告'
  },
  'localMarket.schoolDistrict.content': {
    en: 'Investing in properties within top-rated school districts in NYC is a sound strategy for long-term value appreciation. Queens boasts \'yellow diamond\' school zones like Bayside and Fresh Meadows with schools receiving 8+ ratings.',
    zh: '在纽约顶级学区内投资房产是长期增值的明智策略。皇后区拥有贝赛德和Fresh Meadows等"黄金学区"，学校评分达8+。'
  },
  'localMarket.rentalYield.title': {
    en: 'Rental Yield Analysis Across NYC Boroughs',
    zh: '纽约各区租金收益率分析'
  },
  'localMarket.rentalYield.content': {
    en: 'According to 2024 data, the Bronx leads with the highest average gross rental yield at 6.1%. Queens\' rental yields vary by neighborhood, with an average of 4.7%. Jamaica achieves approximately 5.3% yield.',
    zh: '根据2024年数据，布朗克斯以6.1%的平均毛租金收益率领先。皇后区租金收益率因社区而异，平均为4.7%。牙买加地区达到约5.3%的收益率。'
  },

  // Educational Content
  'educational.foreignBuyer.title': {
    en: 'Complete Guide to Buying Property as a Foreigner',
    zh: '外国人购房完整指南'
  },
  'educational.foreignBuyer.content': {
    en: 'Non-U.S. citizens can purchase property in the U.S., but there are specific requirements for loans, taxes, and ownership structures. The process involves eligibility assessment, financial preparation, and final transaction phases.',
    zh: '非美国公民可以在美国购买房产，但在贷款、税务和所有权结构方面有特定要求。流程包括资格评估、财务准备和最终交易阶段。'
  },
  'educational.foreignBuyer.point1': {
    en: 'Foreign buyers must provide additional documentation including passport copies, visa status, and proof of funds from overseas bank accounts to qualify for property financing.',
    zh: '外国买家必须提供额外文件，包括护照复印件、签证状态和海外银行账户资金证明，以获得房产融资资格。'
  },
  'educational.foreignBuyer.point2': {
    en: 'FIRPTA (Foreign Investment in Real Property Tax Act) requires 15% withholding tax on property sales by foreign sellers, but buyers can request reduced rates with proper documentation.',
    zh: 'FIRPTA（外国人房地产投资税法）要求外国卖家房产销售缴纳15%预扣税，但买家可通过适当文件申请降低税率。'
  },
  'educational.foreignBuyer.point3': {
    en: 'Setting up an LLC or trust structure can provide tax benefits and privacy protection for foreign investors, but requires proper legal and accounting guidance.',
    zh: '建立LLC或信托结构可为外国投资者提供税务优惠和隐私保护，但需要适当的法律和会计指导。'
  },
  'educational.foreignBuyer.point4': {
    en: 'Currency exchange timing and hedging strategies can significantly impact investment returns - consider working with international banking specialists.',
    zh: '外汇兑换时机和对冲策略会显著影响投资回报——建议与国际银行专家合作。'
  },
  'educational.buyingProcess.title': {
    en: 'Detailed NYC Home Buying Process',
    zh: '纽约购房流程详解'
  },
  'educational.buyingProcess.content': {
    en: 'The home buying process in New York State typically takes 6 to 10 weeks and requires both buyer\'s and seller\'s attorneys to handle contracts and title processes.',
    zh: '纽约州购房流程通常需要6至10周，需要买卖双方律师处理合同和产权流程。'
  },
  'educational.buyingProcess.point1': {
    en: 'Pre-approval for mortgage financing is the critical first step, establishing your budget and demonstrating serious intent to sellers in competitive NYC markets.',
    zh: '房贷预批准是关键的第一步，确定您的预算并在竞争激烈的纽约市场中向卖方展示购买诚意。'
  },
  'educational.buyingProcess.point2': {
    en: 'Property search and selection involves analyzing comparable sales, neighborhood trends, and future development plans that could affect property values.',
    zh: '房产搜索和选择涉及分析可比销售、社区趋势和可能影响房产价值的未来发展计划。'
  },
  'educational.buyingProcess.point3': {
    en: 'Due diligence includes professional home inspection, title search, and reviewing building financials for condos and co-ops to identify potential issues.',
    zh: '尽职调查包括专业房屋检查、产权调查，以及审查公寓和合作社的建筑财务状况以识别潜在问题。'
  },
  'educational.buyingProcess.point4': {
    en: 'Closing preparation requires coordinating with attorneys, lenders, and insurance providers while conducting final walkthrough before deed transfer.',
    zh: '过户准备需要与律师、贷款机构和保险提供商协调，同时在产权转移前进行最终房屋检查。'
  },
  'educational.loanGuide.title': {
    en: 'Home Loan Application Guide',
    zh: '房贷申请指南'
  },
  'educational.loanGuide.content': {
    en: 'Multiple loan types available including Conventional Loans (3-5% down), FHA Loans (3.5% down), and Non-QM/Commercial Loans for asset-based documentation.',
    zh: '多种贷款类型可选，包括传统贷款（3-5%首付）、FHA贷款（3.5%首付）和资产证明的Non-QM/商业贷款。'
  },
  'educational.loanGuide.point1': {
    en: 'Interest rates vary significantly based on credit score, down payment amount, and loan type - shop multiple lenders to secure the best terms for your situation.',
    zh: '利率因信用评分、首付金额和贷款类型而显著不同——多家贷款机构比较以获得最适合您情况的最佳条件。'
  },
  'educational.loanGuide.point2': {
    en: 'Debt-to-income ratio requirements are typically 43% or lower for conventional loans, but specialty programs may allow higher ratios with compensating factors.',
    zh: '传统贷款的债务收入比要求通常为43%或更低，但特殊项目可能允许更高比例的补偿因素。'
  },
  'educational.loanGuide.point3': {
    en: 'Private mortgage insurance (PMI) is required for conventional loans with less than 20% down payment, adding $200-500 monthly to your housing costs.',
    zh: '首付低于20%的传统贷款需要私人抵押贷款保险（PMI），每月增加$200-500的住房成本。'
  },
  'educational.loanGuide.point4': {
    en: 'Asset-based loans and bank statement programs offer alternative documentation paths for self-employed borrowers and investors with complex income structures.',
    zh: '资产基础贷款和银行对账单项目为自雇借款人和收入结构复杂的投资者提供替代文件路径。'
  },
  'educational.taxOptimization.title': {
    en: 'Tax Optimization Strategies',
    zh: '税务优化策略'
  },
  'educational.taxOptimization.content': {
    en: 'Legal methods can significantly reduce tax liabilities including LLC setup, 1031 Exchange for capital gains deferral, and STAR/SCHE tax exemptions for eligible homeowners.',
    zh: '合法方法可显著减少税务负担，包括LLC设立、1031交换延迟资本利得税，以及符合条件房主的STAR/SCHE税务减免。'
  },
  'educational.taxOptimization.point1': {
    en: 'Homestead exemptions and STAR programs can reduce annual property tax burden by $1,000-3,000 for qualifying primary residence owners.',
    zh: '宅地豁免和STAR项目可为符合条件的主要居住地业主减少$1,000-3,000的年度房产税负担。'
  },
  'educational.taxOptimization.point2': {
    en: 'Cost segregation studies for rental properties can accelerate depreciation deductions, potentially saving thousands in current-year tax liability.',
    zh: '租赁物业的成本分离研究可以加速折旧扣除，潜在节省当年数千美元的税务负担。'
  },
  'educational.taxOptimization.point3': {
    en: 'Opportunity Zone investments offer capital gains deferral and potential tax-free growth for long-term property investments in designated areas.',
    zh: '机会区域投资为指定区域的长期房产投资提供资本利得延期和潜在的免税增长。'
  },
  'educational.taxOptimization.point4': {
    en: 'Depreciation deductions on rental properties can offset taxable income, while strategic timing of property sales can minimize capital gains exposure.',
    zh: '租赁物业的折旧扣除可以抵消应税收入，而战略性安排房产销售时机可以最大限度减少资本利得税负担。'
  },

  // Market Insights
  'insights.salesReport.title': {
    en: 'Monthly Market Sales Report',
    zh: '月度市场销售报告'
  },
  'insights.salesReport.content': {
    en: 'July 2025 data shows Queens median home price at $685,000, representing 4.2% YoY growth. Flushing properties average 38 days on market, indicating strong demand and quick turnover.',
    zh: '2025年7月数据显示皇后区中位数房价为$685,000，同比增长4.2%。法拉盛房产平均38天售出，显示强劲需求和快速周转。'
  },
  'insights.domAnalysis.title': {
    en: 'Days on Market Analysis',
    zh: '市场停留天数分析'
  },
  'insights.domAnalysis.content': {
    en: 'Days on market varies significantly by borough and price range. Manhattan luxury properties have longer cycles due to complex financing, while Queens and Brooklyn mid-range homes sell faster with more cash buyers.',
    zh: '市场停留天数因区域和价格范围差异显著。曼哈顿豪宅因复杂融资周期较长，而皇后区和布鲁克林中档房产因现金买家较多而销售更快。'
  },
  'insights.topNeighborhoods.title': {
    en: 'Top Neighborhoods Ranking',
    zh: '顶级社区排名'
  },
  'insights.topNeighborhoods.content': {
    en: 'Based on H1 2025 data including price appreciation, rental yield, population growth, and infrastructure development, top five NYC investment neighborhoods identified.',
    zh: '基于2025年上半年数据，包括房价增值、租金收益率、人口增长和基础设施发展，确定纽约前五大投资社区。'
  },

  // ROI Calculator
  'roi.title': {
    en: 'Real Estate Investment ROI Calculator',
    zh: '房地产投资回报率计算器'
  },
  'roi.subtitle': {
    en: 'Calculate your potential returns on NYC real estate investments with accurate market data',
    zh: '利用准确的市场数据计算您在纽约房地产投资的潜在回报'
  },
  'roi.exportPDF': {
    en: 'Export to PDF',
    zh: '导出为PDF'
  },
  'roi.investmentParameters': {
    en: 'Investment Parameters',
    zh: '投资参数'
  },
  'roi.parametersDescription': {
    en: 'Enter your investment details to calculate potential returns',
    zh: '输入您的投资详情以计算潜在回报'
  },
  'roi.quickScenarios': {
    en: 'Quick Scenarios',
    zh: '快速方案'
  },
  'roi.purchasePrice': {
    en: 'Purchase Price',
    zh: '购买价格'
  },
  'roi.downPaymentPercent': {
    en: 'Down Payment (%)',
    zh: '首付比例（%）'
  },
  'roi.monthlyRent': {
    en: 'Monthly Rent',
    zh: '月租金'
  },
  'roi.monthlyExpenses': {
    en: 'Monthly Expenses',
    zh: '月支出'
  },
  'roi.closingCosts': {
    en: 'Closing Costs',
    zh: '过户费用'
  },
  'roi.renovationCosts': {
    en: 'Renovation Costs',
    zh: '装修费用'
  },
  'roi.appreciationRate': {
    en: 'Annual Appreciation Rate (%)',
    zh: '年增值率（%）'
  },
  'roi.investmentReturns': {
    en: 'Investment Returns',
    zh: '投资回报'
  },
  'roi.totalROI': {
    en: 'Total ROI',
    zh: '总投资回报率'
  },
  'roi.cashOnCash': {
    en: 'Cash-on-Cash',
    zh: '现金回报率'
  },
  'roi.detailedAnalysis': {
    en: 'Detailed Analysis',
    zh: '详细分析'
  },
  'roi.cashInvested': {
    en: 'Cash Invested',
    zh: '投入现金'
  },
  'roi.monthlyCashFlow': {
    en: 'Monthly Cash Flow',
    zh: '月现金流'
  },
  'roi.annualCashFlow': {
    en: 'Annual Cash Flow',
    zh: '年现金流'
  },
  'roi.capRate': {
    en: 'Cap Rate',
    zh: '资本化率'
  },
  'roi.annualAppreciation': {
    en: 'Annual Appreciation',
    zh: '年增值'
  },
  'roi.investmentQuality': {
    en: 'Investment Quality',
    zh: '投资质量'
  },
  'roi.excellent': {
    en: 'Excellent',
    zh: '优秀'
  },
  'roi.good': {
    en: 'Good',
    zh: '良好'
  },
  'roi.poor': {
    en: 'Poor',
    zh: '较差'
  },
  'roi.strong': {
    en: 'Strong',
    zh: '强劲'
  },
  'roi.moderate': {
    en: 'Moderate',
    zh: '中等'
  },
  'roi.weak': {
    en: 'Weak',
    zh: '疲弱'
  },
  'roi.outstanding': {
    en: 'Outstanding',
    zh: '杰出'
  },
  'roi.solid': {
    en: 'Solid',
    zh: '稳健'
  },
  'roi.belowAverage': {
    en: 'Below Average',
    zh: '低于平均'
  },
  'roi.disclaimer': {
    en: 'This calculator provides estimates based on the inputs provided. Actual returns may vary due to market conditions, vacancy rates, maintenance costs, and other factors. Consult with a real estate professional and financial advisor before making investment decisions.',
    zh: '此计算器基于提供的输入数据提供估算。实际回报可能因市场条件、空置率、维护成本和其他因素而有所不同。在做出投资决策之前，请咨询房地产专业人士和财务顾问。'
  },
  'roi.disclaimerTitle': {
    en: 'Disclaimer:',
    zh: '免责声明：'
  },

  // Preset Scenarios Chinese Names
  'roi.flushingCondo': {
    en: 'Flushing Condo',
    zh: '法拉盛公寓'
  },
  'roi.queensFamily': {
    en: 'Queens Family Home',
    zh: '皇后区家庭住宅'
  },
  'roi.astoriaInvestment': {
    en: 'Astoria Investment',
    zh: '阿斯托利亚投资'
  },

  // Market Analysis Tags Translations
  'tag.flushing': { en: 'Flushing', zh: '法拉盛' },
  'tag.queens': { en: 'Queens', zh: '皇后区' },
  'tag.chineseCommunity': { en: 'Chinese community', zh: '华人社区' },
  'tag.housingPrices': { en: 'housing prices', zh: '房价' },
  'tag.realEstateTrends': { en: 'real estate trends', zh: '房地产趋势' },
  'tag.mainStreet': { en: 'Main Street', zh: '主街' },
  'tag.kissena': { en: 'Kissena Boulevard', zh: '基西纳大道' },
  'tag.queensNeighborhoods': { en: 'Queens neighborhoods', zh: '皇后区社区' },
  'tag.forestHills': { en: 'Forest Hills', zh: '森林山' },
  'tag.bayside': { en: 'Bayside', zh: '贝赛德' },
  'tag.elmhurst': { en: 'Elmhurst', zh: '艾尔姆赫斯特' },
  'tag.jacksonHeights': { en: 'Jackson Heights', zh: '杰克逊高地' },
  'tag.culturalDiversity': { en: 'cultural diversity', zh: '文化多样性' },
  'tag.investmentOpportunities': { en: 'investment opportunities', zh: '投资机会' },
  'tag.schoolDistricts': { en: 'school districts', zh: '学区' },
  'tag.nycDoe': { en: 'NYC DOE', zh: '纽约市教育局' },
  'tag.greatSchools': { en: 'GreatSchools', zh: 'GreatSchools评级' },
  'tag.ps203': { en: 'PS 203', zh: 'PS 203小学' },
  'tag.ps173': { en: 'PS 173', zh: 'PS 173小学' },
  'tag.freshMeadows': { en: 'Fresh Meadows', zh: '弗雷什草地' },
  'tag.educationInvestment': { en: 'education investment', zh: '教育投资' },
  'tag.rentalYield': { en: 'rental yield', zh: '租金收益率' },
  'tag.capRate': { en: 'cap rate', zh: '资本化率' },
  'tag.investmentReturns': { en: 'investment returns', zh: '投资回报' },
  'tag.bronx': { en: 'Bronx', zh: '布朗克斯' },
  'tag.jamaica': { en: 'Jamaica', zh: '牙买加地区' },
  'tag.regoPark': { en: 'Rego Park', zh: '瑞格公园' },
  'tag.propertyInvestment': { en: 'property investment', zh: '房产投资' },
  'tag.foreignBuyers': { en: 'foreign buyers', zh: '外国买家' },
  'tag.nonUsCitizens': { en: 'non-US citizens', zh: '非美国公民' },
  'tag.firptaTax': { en: 'FIRPTA tax', zh: 'FIRPTA税' },
  'tag.internationalInvestment': { en: 'international investment', zh: '国际投资' },
  'tag.currencyExchange': { en: 'currency exchange', zh: '货币兑换' },
  'tag.propertyOwnership': { en: 'property ownership', zh: '房产所有权' },
  'tag.nycHomeBuying': { en: 'NYC home buying', zh: '纽约购房' },
  'tag.newYorkRealEstate': { en: 'New York real estate', zh: '纽约房地产' },
  'tag.attorney': { en: 'attorney', zh: '律师' },
  'tag.homeInspection': { en: 'home inspection', zh: '房屋检查' },
  'tag.mortgageApproval': { en: 'mortgage approval', zh: '贷款批准' },
  'tag.closingProcess': { en: 'closing process', zh: '过户流程' },
  'tag.homeLoans': { en: 'home loans', zh: '房屋贷款' },
  'tag.conventionalLoans': { en: 'conventional loans', zh: '传统贷款' },
  'tag.fhaLoans': { en: 'FHA loans', zh: 'FHA贷款' },
  'tag.nonQmLoans': { en: 'Non-QM loans', zh: 'Non-QM贷款' },
  'tag.mortgageApplication': { en: 'mortgage application', zh: '抵押贷款申请' },
  'tag.downPayment': { en: 'down payment', zh: '首付款' },
  'tag.creditScore': { en: 'credit score', zh: '信用评分' },
  'tag.taxOptimization': { en: 'tax optimization', zh: '税务优化' },
  'tag.llcSetup': { en: 'LLC setup', zh: 'LLC设立' },
  'tag.1031Exchange': { en: '1031 exchange', zh: '1031交换' },
  'tag.starExemption': { en: 'STAR exemption', zh: 'STAR减免' },
  'tag.scheExemption': { en: 'SCHE exemption', zh: 'SCHE减免' },
  'tag.capitalGains': { en: 'capital gains', zh: '资本利得' },
  'tag.cpa': { en: 'CPA', zh: '注册会计师' },
  'tag.taxStrategy': { en: 'tax strategy', zh: '税务策略' },
  'tag.marketReport': { en: 'market report', zh: '市场报告' },
  'tag.july2025': { en: 'July 2025', zh: '2025年7月' },
  'tag.queensMedianPrice': { en: 'Queens median price', zh: '皇后区中位价格' },
  'tag.daysOnMarket': { en: 'days on market', zh: '市场停留天数' },
  'tag.marketTrends': { en: 'market trends', zh: '市场趋势' },
  'tag.salesData': { en: 'sales data', zh: '销售数据' },
  'tag.domAnalysis': { en: 'DOM analysis', zh: 'DOM分析' },
  'tag.manhattanLuxury': { en: 'Manhattan luxury', zh: '曼哈顿豪宅' },
  'tag.queensBrooklyn': { en: 'Queens Brooklyn', zh: '皇后区布鲁克林' },
  'tag.cashBuyers': { en: 'cash buyers', zh: '现金买家' },
  'tag.marketTiming': { en: 'market timing', zh: '市场时机' },
  'tag.neighborhoodRanking': { en: 'neighborhood ranking', zh: '社区排名' },
  'tag.investmentNeighborhoods': { en: 'investment neighborhoods', zh: '投资社区' },
  'tag.longIslandCity': { en: 'Long Island City', zh: '长岛市' },
  'tag.astoria': { en: 'Astoria', zh: '阿斯托利亚' },
  'tag.sunsetPark': { en: 'Sunset Park', zh: '日落公园' },
  'tag.parkSlope': { en: 'Park Slope', zh: '公园坡' },
  
  // Top neighborhoods ranking translations
  'insights.topCommunities.longIslandCity': { en: 'Long Island City', zh: '长岛市' },
  'insights.topCommunities.astoria': { en: 'Astoria', zh: '阿斯托利亚' },
  'insights.topCommunities.sunsetPark': { en: 'Sunset Park', zh: '日落公园' },
  'insights.topCommunities.parkSlope': { en: 'Park Slope', zh: '公园坡' },
  'insights.topCommunities.flushing': { en: 'Flushing', zh: '法拉盛' },
  'insights.topCommunities.bayside': { en: 'Bayside', zh: '贝赛德' },
  'insights.topCommunities.forestHills': { en: 'Forest Hills', zh: '森林山' },
  'insights.topCommunities.regoPark': { en: 'Rego Park', zh: '瑞格公园' },
  'insights.topCommunities.elmhurst': { en: 'Elmhurst', zh: '艾尔姆赫斯特' },
  'insights.topCommunities.jacksonHeights': { en: 'Jackson Heights', zh: '杰克逊高地' }
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
  defaultLanguage: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, defaultLanguage }) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const location = useLocation();

  // Initialize language from URL once. Priority: ?lang= query (set by static SEO
  // landing pages redirecting real visitors) > /zh or /en path prefix > default.
  // Not tied to language state — toggling language must NOT navigate.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const langFromQuery = params.get('lang');
    const currentPath = location.pathname;
    let nextLang: Language | null = null;
    if (langFromQuery === 'zh' || langFromQuery === 'en') {
      nextLang = langFromQuery;
    } else if (currentPath.startsWith('/zh')) {
      nextLang = 'zh';
    } else if (currentPath.startsWith('/en')) {
      nextLang = 'en';
    }
    if (nextLang) {
      setLanguage((current) => (current === nextLang ? current : (nextLang as Language)));
    }
  }, [location.pathname]);

  // Handle language switching inside the full React app without URL navigation.
  const handleSetLanguage = (newLang: Language) => {
    setLanguage(newLang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      // Missing translation for key: ${key}
      return key;
    }
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, currentLanguage: language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};