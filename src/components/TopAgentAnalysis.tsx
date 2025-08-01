import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Search, Target, TrendingUp, Users, Zap } from "lucide-react";

export const TopAgentAnalysis = () => {
  const topAgentStrategies = [
    {
      agent: "Ryan Serhant",
      company: "SERHANT.",
      rank: "#1全球",
      icon: <Star className="w-5 h-5" />,
      strategies: [
        "Netflix节目内容营销",
        "94.7%成交率数据展示", 
        "个人品牌+媒体结合",
        "教育课程平台",
        "社交媒体最高关注度"
      ],
      keyTakeaway: "内容+媒体+教育的三重模式",
      traffic: "500万+月访问"
    },
    {
      agent: "Barbara Corcoran",
      company: "The Corcoran Group",
      rank: "#2影响力",
      icon: <Target className="w-5 h-5" />,
      strategies: [
        "市场报告权威发布",
        "专家评论与预测",
        "媒体采访频繁出现",
        "投资建议内容",
        "个人故事营销"
      ],
      keyTakeaway: "专业权威+媒体曝光",
      traffic: "200万+月访问"
    },
    {
      agent: "Frederik Eklund", 
      company: "Douglas Elliman",
      rank: "#3奢侈品",
      icon: <TrendingUp className="w-5 h-5" />,
      strategies: [
        "奢侈房产专业化",
        "国际买家服务",
        "高端生活方式内容",
        "独家房源展示",
        "个性化服务故事"
      ],
      keyTakeaway: "专业化+高端定位",
      traffic: "150万+月访问"
    }
  ];

  const winningContentTypes = [
    {
      type: "本地市场报告",
      searchVolume: "10,000+/月",
      difficulty: "中等",
      roi: "极高",
      example: "'法拉盛房价2024年趋势'"
    },
    {
      type: "社区生活指南", 
      searchVolume: "5,000+/月",
      difficulty: "低",
      roi: "高",
      example: "'皇后区最佳学区完整指南'"
    },
    {
      type: "购房教育内容",
      searchVolume: "15,000+/月", 
      difficulty: "中等",
      roi: "极高",
      example: "'海外买房纽约完整攻略'"
    },
    {
      type: "投资分析工具",
      searchVolume: "3,000+/月",
      difficulty: "高", 
      roi: "极高",
      example: "'纽约房产投资回报计算器'"
    }
  ];

  const seoSecrets = [
    {
      title: "地理关键词策略",
      description: "使用'社区名+房地产'组合",
      impact: "本地搜索排名提升300%"
    },
    {
      title: "长尾关键词挖掘",
      description: "捕获具体需求搜索",
      impact: "转化率提升150%"
    },
    {
      title: "数据驱动内容",
      description: "发布独家市场数据", 
      impact: "权威性建立+回链增加"
    },
    {
      title: "客户成功故事",
      description: "真实案例+成果展示",
      impact: "信任度提升+转介绍增加"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">顶级经纪人网站策略分析</h1>
        <p className="text-xl text-muted-foreground">
          深度解析行业顶尖经纪人的成功模式，获取最高排名的核心策略
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {topAgentStrategies.map((agent, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge variant="default">{agent.rank}</Badge>
            </div>
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3">
                {agent.icon}
                <div>
                  <CardTitle className="text-lg">{agent.agent}</CardTitle>
                  <p className="text-sm text-muted-foreground">{agent.company}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">核心策略：</h4>
                <ul className="space-y-1">
                  {agent.strategies.map((strategy, strategyIndex) => (
                    <li key={strategyIndex} className="text-sm flex items-start gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {strategy}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3 border-t space-y-2">
                <p className="text-sm font-medium text-primary">
                  核心要点: {agent.keyTakeaway}
                </p>
                <p className="text-xs text-muted-foreground">
                  月流量: {agent.traffic}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Search className="w-6 h-6" />
            高价值内容类型分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {winningContentTypes.map((content, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold">{content.type}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>搜索量:</span>
                    <span className="font-medium">{content.searchVolume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>难度:</span>
                    <Badge variant={content.difficulty === "低" ? "default" : content.difficulty === "中等" ? "secondary" : "destructive"} className="text-xs">
                      {content.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>ROI:</span>
                    <span className="font-medium text-green-600">{content.roi}</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground italic">
                    示例: {content.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              SEO成功秘诀
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {seoSecrets.map((secret, index) => (
              <div key={index} className="border-l-4 border-primary pl-4 space-y-1">
                <h4 className="font-semibold">{secret.title}</h4>
                <p className="text-sm text-muted-foreground">{secret.description}</p>
                <p className="text-xs font-medium text-green-600">{secret.impact}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              立即行动计划
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <h4 className="font-semibold">创建社区专家页面</h4>
                  <p className="text-sm opacity-90">为每个服务区域创建详细指南</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <h4 className="font-semibold">建立内容发布节奏</h4>
                  <p className="text-sm opacity-90">每周1-2篇高质量原创内容</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <h4 className="font-semibold">数据收集与分析</h4>
                  <p className="text-sm opacity-90">建立本地市场数据库</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div>
                  <h4 className="font-semibold">客户成功案例收集</h4>
                  <p className="text-sm opacity-90">记录并发布真实交易故事</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};