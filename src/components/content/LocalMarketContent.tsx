import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MapPin, GraduationCap, DollarSign } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const LocalMarketContent = () => {
  const { t } = useLanguage();

  const marketContent = [
    {
      id: "flushing-trends",
      title: t("法拉盛房价走势分析"),
      titleEn: "Flushing Housing Market Trends Analysis",
      icon: <TrendingUp className="w-6 h-6" />,
      summary: t("深度分析法拉盛地区房价变化趋势，为投资者提供专业市场洞察"),
      summaryEn: "In-depth analysis of Flushing area housing price trends, providing professional market insights for investors",
      content: t(`法拉盛作为纽约华人聚集的核心区域，其房地产市场表现出独特的发展特征。根据最新市场数据显示，2024年法拉盛地区房价同比上涨8.5%，超过皇后区平均涨幅。

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
法拉盛地区适合寻求稳定增值的长期投资者，特别是关注学区房的家庭买家。建议关注Main Street周边及新开发项目的投资机会。`),
      contentEn: "Flushing, as the core area of Chinese community in New York, shows unique development characteristics in its real estate market. According to the latest market data, housing prices in Flushing area increased by 8.5% year-over-year in 2024, exceeding the average growth rate in Queens.",
      searchKeywords: ["法拉盛", "房价", "市场分析", "投资", "flushing", "housing", "market", "investment"]
    },
    {
      id: "queens-neighborhoods",
      title: t("皇后区各社区详细指南"),
      titleEn: "Comprehensive Queens Neighborhood Guide",
      icon: <MapPin className="w-6 h-6" />,
      summary: t("全面解析皇后区各社区特色，帮助买家找到最适合的居住区域"),
      summaryEn: "Comprehensive analysis of Queens neighborhood characteristics to help buyers find the most suitable residential areas",
      content: t(`皇后区作为纽约市面积最大的行政区，拥有多元化的社区选择，每个区域都有其独特的魅力和投资价值。

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
根据您的预算、通勤需求和生活方式选择最适合的社区。建议实地考察，体验当地生活氛围。`),
      contentEn: "Queens, as the largest borough in New York City, offers diverse community choices, with each area having its unique charm and investment value.",
      searchKeywords: ["皇后区", "社区", "指南", "法拉盛", "阿斯托利亚", "queens", "neighborhood", "guide", "flushing", "astoria"]
    },
    {
      id: "school-district-investment",
      title: t("学区房投资报告"),
      titleEn: "School District Investment Report",
      icon: <GraduationCap className="w-6 h-6" />,
      summary: t("分析优质学区对房产投资价值的影响，指导学区房投资决策"),
      summaryEn: "Analyze the impact of quality school districts on property investment value and guide school district housing investment decisions",
      content: t(`学区房投资一直是华人家庭房产投资的重要考量因素。优质学区不仅保障子女教育，更是房产保值增值的重要保障。

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
学区划分可能调整，建议持续关注教育政策变化。选择学区房时要综合考虑房屋品质、社区环境等因素。`),
      contentEn: "School district housing investment has always been an important consideration for Chinese families in property investment. Quality school districts not only ensure children's education but also serve as important guarantees for property value preservation and appreciation.",
      searchKeywords: ["学区房", "投资", "教育", "学校", "PS163", "school district", "investment", "education"]
    },
    {
      id: "rental-yield-analysis",
      title: t("纽约各区租金回报率分析"),
      titleEn: "NYC Rental Yield Analysis by Borough",
      icon: <DollarSign className="w-6 h-6" />,
      summary: t("对比分析纽约各区域租金回报率，为投资者提供数据支持"),
      summaryEn: "Comparative analysis of rental yields across NYC areas, providing data support for investors",
      content: t(`租金回报率是衡量房产投资价值的核心指标。通过对纽约各区域租金回报率的深度分析，帮助投资者做出明智的投资决策。

各区域租金回报率对比：

**皇后区 (Queens)**
• 平均租金回报率：4.5% - 6.2%
• 最佳区域：森林小丘、阿斯托利亚
• 投资特点：性价比高，增值稳定
• 适合投资者：首次投资者，长期持有

**布鲁克林 (Brooklyn)**
• 平均租金回报率：3.8% - 5.5%
• 最佳区域：威廉斯堡、公园坡
• 投资特点：增值潜力大，租金上涨快
• 适合投资者：有经验的投资者

**曼哈顿 (Manhattan)**
• 平均租金回报率：2.5% - 4.0%
• 最佳区域：上东区、中城
• 投资特点：保值性强，流动性好
• 适合投资者：高净值投资者

**布朗克斯 (Bronx)**
• 平均租金回报率：5.5% - 7.8%
• 最佳区域：riverdale、Concourse
• 投资特点：高回报，成长空间大
• 适合投资者：风险承受能力强的投资者

投资建议：
1. 新手投资者建议从皇后区开始
2. 关注新兴社区的发展潜力
3. 考虑租客群体的稳定性
4. 定期评估和调整投资组合

市场趋势：
后疫情时代，租金市场逐步回暖，预计2024年整体租金将上涨3-5%。`),
      contentEn: "Rental yield is a core indicator for measuring property investment value. Through in-depth analysis of rental yields across NYC areas, we help investors make informed investment decisions.",
      searchKeywords: ["租金回报率", "投资分析", "皇后区", "布鲁克林", "曼哈顿", "rental yield", "investment", "queens", "brooklyn", "manhattan"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{t("本地市场专家内容")}</h1>
        <p className="text-xl text-muted-foreground">
          {t("专业的本地市场分析，助您把握投资机遇")}
        </p>
        <Badge variant="default" className="text-lg px-4 py-2">
          {t("月搜索量：35,000+")}
        </Badge>
      </div>

      <div className="grid gap-8">
        {marketContent.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="flex items-center gap-4">
                {item.icon}
                <div className="flex-1">
                  <CardTitle className="text-2xl">{item.title}</CardTitle>
                  <p className="text-muted-foreground mt-2">{item.summary}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-foreground leading-relaxed">
                  {item.content}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  {item.searchKeywords.slice(0, 6).map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};