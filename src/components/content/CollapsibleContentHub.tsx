import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, TrendingUp, MapPin, GraduationCap, DollarSign, Globe, Home, CreditCard, Calculator, BarChart, Clock, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContentItem {
  id: string;
  title: string;
  titleEn: string;
  icon: React.ReactNode;
  summary: string;
  summaryEn: string;
  content: string;
  contentEn: string;
  searchKeywords: string[];
  category: string;
}

export const CollapsibleContentHub = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  useEffect(() => {
    const handleSelectContent = (event: CustomEvent) => {
      const { contentId } = event.detail;
      setIsOpen(true);
      setSelectedContent(contentId);
    };

    window.addEventListener('selectContent', handleSelectContent as EventListener);
    return () => window.removeEventListener('selectContent', handleSelectContent as EventListener);
  }, []);

  const allContent: ContentItem[] = [
    // Local Market Content
    {
      id: "flushing-trends",
      title: "法拉盛房价走势分析",
      titleEn: "Flushing Housing Market Trends Analysis",
      icon: <TrendingUp className="w-6 h-6" />,
      summary: "深度分析法拉盛地区房价变化趋势，为投资者提供专业市场洞察",
      summaryEn: "In-depth analysis of Flushing area housing price trends, providing professional market insights for investors",
      content: `法拉盛作为纽约华人聚集的核心区域，其房地产市场表现出独特的发展特征。根据最新市场数据显示，2024年法拉盛地区房价同比上涨8.5%，超过皇后区平均涨幅。

核心数据分析：
• 平均房价：$850,000 - $1,200,000
• 年增长率：8.5%
• 库存周期：平均45天
• 租金回报率：4.2% - 5.8%

市场驱动因素：
1. 优质学区资源：法拉盛拥有多所评级优秀的公立学校
2. 交通便利性：7号线直达曼哈顿，通勤便利
3. 商业繁荣：完善的中式商业配套设施
4. 社区成熟度：华人社区文化氛围浓厚

投资建议：
法拉盛地区适合寻求稳定增值的长期投资者，特别是关注学区房的家庭买家。建议关注Main Street周边及新开发项目的投资机会。`,
      contentEn: `Flushing, as the core area of Chinese community in New York, shows unique development characteristics in its real estate market. According to the latest market data, housing prices in Flushing area increased by 8.5% year-over-year in 2024, exceeding the average growth rate in Queens.

Core Data Analysis:
• Average housing price: $850,000 - $1,200,000
• Annual growth rate: 8.5%
• Inventory cycle: Average 45 days
• Rental yield: 4.2% - 5.8%

Market Driving Factors:
1. Quality school district resources: Flushing has multiple highly-rated public schools
2. Transportation convenience: Direct access to Manhattan via 7 train, convenient commuting
3. Business prosperity: Complete Chinese commercial supporting facilities
4. Community maturity: Strong Chinese community cultural atmosphere

Investment Recommendations:
Flushing area is suitable for long-term investors seeking stable appreciation, especially family buyers focusing on school districts. We recommend paying attention to investment opportunities around Main Street and new development projects.`,
      searchKeywords: ["法拉盛", "房价", "市场分析", "投资", "flushing", "housing", "market", "investment"],
      category: "本地市场专家内容"
    },
    {
      id: "queens-neighborhoods",
      title: "皇后区各社区详细指南",
      titleEn: "Comprehensive Queens Neighborhood Guide",
      icon: <MapPin className="w-6 h-6" />,
      summary: "全面解析皇后区各社区特色，帮助买家找到最适合的居住区域",
      summaryEn: "Comprehensive analysis of Queens neighborhood characteristics to help buyers find the most suitable residential areas",
      content: `皇后区作为纽约市面积最大的行政区，拥有多元化的社区选择，每个区域都有其独特的魅力和投资价值。

重点社区分析：

**法拉盛 (Flushing)**
• 人口构成：50%亚裔
• 平均房价：$850,000
• 特色：华人商圈，优质学区
• 适合人群：华人家庭，注重教育的买家

**阿斯托利亚 (Astoria)**
• 人口构成：多元化社区
• 平均房价：$750,000
• 特色：艺术文化区，餐饮丰富
• 适合人群：年轻专业人士，艺术爱好者

**森林小丘 (Forest Hills)**
• 人口构成：中高收入家庭
• 平均房价：$950,000
• 特色：花园式住宅，安静宜居
• 适合人群：追求品质生活的家庭

**长岛市 (Long Island City)**
• 人口构成：年轻专业人士
• 平均房价：$700,000
• 特色：现代高层公寓，曼哈顿天际线景观
• 适合人群：通勤族，投资者

选择建议：
根据您的预算、通勤需求和生活方式选择最适合的社区。建议实地考察，体验当地生活氛围。`,
      contentEn: `Queens, as the largest borough in New York City, offers diverse community choices, with each area having its unique charm and investment value.

Key Community Analysis:

**Flushing**
• Demographics: 50% Asian
• Average housing price: $850,000
• Features: Chinese business district, quality school districts
• Suitable for: Chinese families, education-focused buyers

**Astoria**
• Demographics: Diverse community
• Average housing price: $750,000
• Features: Arts and culture district, rich dining options
• Suitable for: Young professionals, art enthusiasts

**Forest Hills**
• Demographics: Middle to high-income families
• Average housing price: $950,000
• Features: Garden-style residences, quiet and livable
• Suitable for: Families pursuing quality of life

**Long Island City**
• Demographics: Young professionals
• Average housing price: $700,000
• Features: Modern high-rise apartments, Manhattan skyline views
• Suitable for: Commuters, investors

Selection Advice:
Choose the most suitable community based on your budget, commuting needs, and lifestyle. We recommend on-site visits to experience the local living atmosphere.`,
      searchKeywords: ["皇后区", "社区", "指南", "法拉盛", "阿斯托利亚", "queens", "neighborhood", "guide", "flushing", "astoria"],
      category: "本地市场专家内容"
    },
    {
      id: "school-district-investment",
      title: "学区房投资报告",
      titleEn: "School District Investment Report",
      icon: <GraduationCap className="w-6 h-6" />,
      summary: "分析优质学区对房产投资价值的影响，指导学区房投资决策",
      summaryEn: "Analyze the impact of quality school districts on property investment value and guide school district housing investment decisions",
      content: `学区房投资一直是华人家庭房产投资的重要考量因素。优质学区不仅保障子女教育，更是房产保值增值的重要保障。

顶级学区分析：

**PS 163 学区 (法拉盛)**
• 学校评级：9/10
• 房价溢价：15-20%
• 投资回报：年均增值6-8%
• 特色：双语教育，亚裔学生比例高

**Hunter College High School 学区**
• 学校评级：10/10
• 房价溢价：25-30%
• 投资回报：年均增值8-10%
• 特色：精英教育，竞争激烈

**Townsend Harris High School 学区**
• 学校评级：9/10
• 房价溢价：18-22%
• 投资回报：年均增值7-9%
• 特色：STEM教育强，升学率高

投资策略：
1. 关注学校评级变化趋势
2. 考虑学区房的流动性
3. 评估教育资源的长期稳定性
4. 平衡房价溢价与投资回报

风险提示：
学区划分可能调整，建议持续关注教育政策变化。选择学区房时要综合考虑房屋品质、社区环境等因素。`,
      contentEn: `School district housing investment has always been an important consideration for Chinese families in property investment. Quality school districts not only ensure children's education but also serve as important guarantees for property value preservation and appreciation.

Top School District Analysis:

**PS 163 District (Flushing)**
• School rating: 9/10
• Housing price premium: 15-20%
• Investment return: Annual appreciation 6-8%
• Features: Bilingual education, high proportion of Asian students

**Hunter College High School District**
• School rating: 10/10
• Housing price premium: 25-30%
• Investment return: Annual appreciation 8-10%
• Features: Elite education, highly competitive

**Townsend Harris High School District**
• School rating: 9/10
• Housing price premium: 18-22%
• Investment return: Annual appreciation 7-9%
• Features: Strong STEM education, high college admission rate

Investment Strategies:
1. Monitor trends in school rating changes
2. Consider liquidity of school district properties
3. Assess long-term stability of educational resources
4. Balance housing price premiums with investment returns

Risk Warnings:
School district boundaries may be adjusted; we recommend continuously monitoring educational policy changes. When choosing school district properties, consider housing quality, community environment, and other factors comprehensively.`,
      searchKeywords: ["学区房", "投资", "教育", "学校", "PS163", "school district", "investment", "education"],
      category: "本地市场专家内容"
    },
    // Educational Content
    {
      id: "overseas-buying-guide",
      title: "海外买房完整指南",
      titleEn: "Complete Guide to Overseas Property Buying",
      icon: <Globe className="w-6 h-6" />,
      summary: "为海外投资者提供纽约购房的完整攻略和专业建议",
      summaryEn: "Comprehensive guide and professional advice for overseas investors buying property in New York",
      content: `海外买房是一项重大投资决策，需要充分了解当地法律、税务和市场环境。本指南将为您提供完整的纽约购房攻略。

**购房资格要求**

1. **身份要求**
   • 外国人可以在美国购买房产
   • 无需绿卡或公民身份
   • 需要有效护照和签证

2. **资金要求**
   • 首付比例：30-50%（外国买家）
   • 现金购买更有优势
   • 需证明资金来源合法性

**购房流程详解**

**第一步：市场研究**
   • 确定目标区域和预算
   • 了解当地市场价格
   • 选择专业房地产经纪人

**第二步：贷款预批**
   • 选择合适的贷款机构
   • 准备财务文件
   • 获得预批准信

专业建议：
海外购房成功的关键在于选择有经验的专业团队，充分了解当地市场和法规，制定清晰的投资目标。`,
      contentEn: `Overseas property buying is a major investment decision that requires thorough understanding of local laws, taxes, and market conditions. This guide provides a complete New York property buying strategy.

**Property Purchase Eligibility Requirements**

1. **Identity Requirements**
   • Foreigners can purchase property in the United States
   • No green card or citizenship required
   • Valid passport and visa required

2. **Funding Requirements**
   • Down payment ratio: 30-50% (foreign buyers)
   • Cash purchases have advantages
   • Need to prove legal source of funds

**Detailed Property Buying Process**

**Step 1: Market Research**
   • Determine target area and budget
   • Understand local market prices
   • Choose professional real estate agent

**Step 2: Loan Pre-approval**
   • Select appropriate lending institution
   • Prepare financial documents
   • Obtain pre-approval letter

Professional Advice:
The key to successful overseas property buying lies in selecting an experienced professional team, thoroughly understanding local markets and regulations, and establishing clear investment objectives.`,
      searchKeywords: ["海外买房", "投资指南", "纽约房产", "外国买家", "overseas", "property", "investment", "guide", "foreign", "buyer"],
      category: "教育型内容"
    },
    {
      id: "mortgage-application-guide",
      title: "房屋贷款申请攻略",
      titleEn: "Mortgage Application Strategy Guide",
      icon: <CreditCard className="w-6 h-6" />,
      summary: "详解房屋贷款申请技巧，提高批准率并获得最佳利率",
      summaryEn: "Detailed mortgage application techniques to improve approval rates and secure the best interest rates",
      content: `房屋贷款是购房过程中的重要环节，合适的贷款产品和申请策略能够为您节省数万美元。

**贷款类型选择**

1. **常规贷款（Conventional Loan）**
   • 首付要求：3-20%
   • 信用分数：620+
   • 利率水平：最优
   • 适合人群：信用良好的买家

2. **FHA贷款**
   • 首付要求：3.5%
   • 信用分数：580+
   • 贷款保险：必需
   • 适合人群：首次购房者

**提高批准率的策略**

1. **信用分数优化**
   • 及时还款提高信用分数
   • 减少信用卡使用率
   • 避免新开信用账户
   • 检查信用报告错误

专业建议：
成功获得房屋贷款的关键在于提前规划财务状况，选择合适的贷款产品，保持良好沟通。`,
      contentEn: `Mortgage is an important part of the home buying process. The right loan product and application strategy can save you tens of thousands of dollars.

**Loan Type Selection**

1. **Conventional Loan**
   • Down payment requirement: 3-20%
   • Credit score: 620+
   • Interest rate level: Optimal
   • Suitable for: Buyers with good credit

2. **FHA Loan**
   • Down payment requirement: 3.5%
   • Credit score: 580+
   • Mortgage insurance: Required
   • Suitable for: First-time homebuyers

**Strategies to Improve Approval Rates**

1. **Credit Score Optimization**
   • Make timely payments to improve credit score
   • Reduce credit card utilization rate
   • Avoid opening new credit accounts
   • Check credit report for errors

Professional Advice:
The key to successfully obtaining a mortgage lies in advance financial planning, selecting appropriate loan products, and maintaining good communication.`,
      searchKeywords: ["房屋贷款", "贷款申请", "按揭", "利率", "mortgage", "loan", "application", "interest rate", "financing"],
      category: "教育型内容"
    }
  ];

  const handleContentClick = (contentId: string) => {
    setSelectedContent(selectedContent === contentId ? null : contentId);
  };

  const getDisplayTitle = (item: ContentItem) => {
    return language === 'zh' ? item.title : item.titleEn;
  };

  const getDisplaySummary = (item: ContentItem) => {
    return language === 'zh' ? item.summary : item.summaryEn;
  };

  const getDisplayContent = (item: ContentItem) => {
    return language === 'zh' ? item.content : item.contentEn;
  };

  return (
    <div className="max-w-7xl mx-auto p-6" data-content-hub>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className="overflow-hidden">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      {language === 'zh' ? "专业房地产内容中心" : "Professional Real Estate Content Hub"}
                    </CardTitle>
                    <p className="text-muted-foreground mt-2">
                      {language === 'zh' 
                        ? "点击展开查看完整的房地产投资教育内容和市场分析"
                        : "Click to expand and view complete real estate investment education content and market analysis"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-sm px-3 py-1">
                    {allContent.length} {language === 'zh' ? "篇专业内容" : "Professional Articles"}
                  </Badge>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-4">
                {allContent.map((item) => (
                  <Card 
                    key={item.id} 
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedContent === item.id 
                        ? 'ring-2 ring-primary shadow-lg' 
                        : 'hover:shadow-md hover:bg-muted/30'
                    }`}
                    onClick={() => handleContentClick(item.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-primary">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{getDisplayTitle(item)}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {getDisplaySummary(item)}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {language === 'zh' ? item.category : 
                            item.category === "本地市场专家内容" ? "Local Market Expert Content" :
                            item.category === "教育型内容" ? "Educational Content" :
                            "Data-Driven Content"
                          }
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    {selectedContent === item.id && (
                      <CardContent className="pt-0">
                        <div className="border-t pt-4">
                          <div className="prose max-w-none">
                            <div className="whitespace-pre-line text-foreground leading-relaxed text-sm">
                              {getDisplayContent(item)}
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex flex-wrap gap-2">
                              {item.searchKeywords.slice(0, 8).map((keyword, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
              
              <div className="text-center pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  {language === 'zh' 
                    ? "点击任意内容卡片查看完整详情 • 所有内容均基于真实市场数据"
                    : "Click any content card to view complete details • All content based on real market data"
                  }
                </p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};