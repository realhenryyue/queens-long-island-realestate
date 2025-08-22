import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  MapPin, 
  Home, 
  DollarSign, 
  Users, 
  Calendar,
  Search,
  Target,
  BarChart,
  Globe
} from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

export const AdvancedSEOStrategy = () => {
  const { language, t } = useLanguage();

  const seoStrategies = [
    {
      title: language === 'zh' ? "本地SEO优化策略" : "Local SEO Optimization",
      priority: "critical",
      icon: <MapPin className="w-5 h-5" />,
      techniques: [
        language === 'zh' ? "Google商业档案完整优化" : "Complete Google Business Profile optimization",
        language === 'zh' ? "纽约地区关键词密度优化" : "NYC region keyword density optimization", 
        language === 'zh' ? "地理位置标记与坐标优化" : "Geographic tagging and coordinate optimization",
        language === 'zh' ? "本地引用与目录提交" : "Local citations and directory submissions",
        language === 'zh' ? "客户评价管理与优化" : "Customer review management and optimization"
      ],
      impact: language === 'zh' ? "提升40%本地搜索排名" : "Improve local search ranking by 40%"
    },
    {
      title: language === 'zh' ? "内容营销与权威建立" : "Content Marketing & Authority Building",
      priority: "high",
      icon: <BarChart className="w-5 h-5" />,
      techniques: [
        language === 'zh' ? "每周发布3篇专业市场分析" : "Publish 3 professional market analyses weekly",
        language === 'zh' ? "创建纽约房地产终极指南" : "Create ultimate NYC real estate guides",
        language === 'zh' ? "客户成功案例视频制作" : "Produce client success story videos",
        language === 'zh' ? "市场趋势预测报告" : "Market trend prediction reports",
        language === 'zh' ? "双语社交媒体内容策略" : "Bilingual social media content strategy"
      ],
      impact: language === 'zh' ? "增加60%有机搜索流量" : "Increase organic search traffic by 60%"
    },
    {
      title: language === 'zh' ? "技术SEO与性能优化" : "Technical SEO & Performance",
      priority: "high", 
      icon: <Search className="w-5 h-5" />,
      techniques: [
        language === 'zh' ? "页面加载速度优化至2秒内" : "Optimize page load speed to under 2 seconds",
        language === 'zh' ? "移动端响应式设计优化" : "Mobile responsive design optimization",
        language === 'zh' ? "结构化数据标记实施" : "Implement structured data markup",
        language === 'zh' ? "网站地图与内链优化" : "Sitemap and internal linking optimization",
        language === 'zh' ? "多语言hreflang标签配置" : "Multi-language hreflang tag configuration"
      ],
      impact: language === 'zh' ? "提升25%页面排名" : "Improve page rankings by 25%"
    },
    {
      title: language === 'zh' ? "竞争对手分析与超越" : "Competitor Analysis & Outranking",
      priority: "medium",
      icon: <Target className="w-5 h-5" />,
      techniques: [
        language === 'zh' ? "分析TOP10纽约地产经纪SEO策略" : "Analyze TOP 10 NYC real estate agent SEO strategies",
        language === 'zh' ? "识别竞争对手关键词缺口" : "Identify competitor keyword gaps",
        language === 'zh' ? "创建更优质的内容替代" : "Create superior content alternatives",
        language === 'zh' ? "建立更强的反向链接网络" : "Build stronger backlink networks",
        language === 'zh' ? "监控竞争对手排名变化" : "Monitor competitor ranking changes"
      ],
      impact: language === 'zh' ? "超越70%直接竞争对手" : "Outrank 70% of direct competitors"
    }
  ];

  const keywordStrategies = [
    {
      category: language === 'zh' ? "主要目标关键词" : "Primary Target Keywords",
      keywords: language === 'zh' 
        ? ["纽约房地产经纪人", "曼哈顿地产专家", "皇后区买房", "法拉盛商业楼", "华人地产经纪"]
        : ["NYC real estate agent", "Manhattan property expert", "Queens home buying", "Flushing commercial property", "bilingual realtor"],
      difficulty: "high",
      priority: 1
    },
    {
      category: language === 'zh' ? "长尾关键词" : "Long-tail Keywords",
      keywords: language === 'zh'
        ? ["纽约海外买房经纪人推荐", "法拉盛学区房投资分析", "曼哈顿华人地产中介", "皇后区房产投资咨询", "长岛新房销售代理"]
        : ["best NYC real estate agent for international buyers", "Flushing school district property investment", "Manhattan Chinese speaking realtor", "Queens property investment consultation", "Long Island new home sales"],
      difficulty: "medium",
      priority: 2
    },
    {
      category: language === 'zh' ? "本地化关键词" : "Local Keywords",
      keywords: language === 'zh'
        ? ["法拉盛地产经纪", "贝赛德房产专家", "森林山买房代理", "阿斯托利亚投资顾问", "大颈地产服务"]
        : ["Flushing real estate agent", "Bayside property expert", "Forest Hills home buyer agent", "Astoria investment advisor", "Great Neck real estate services"],
      difficulty: "low",
      priority: 3
    }
  ];

  const contentPlan = [
    {
      week: 1,
      focus: language === 'zh' ? "市场分析报告" : "Market Analysis Reports",
      content: [
        language === 'zh' ? "Q4纽约房价趋势分析" : "Q4 NYC Housing Price Trend Analysis",
        language === 'zh' ? "皇后区投资热点地图" : "Queens Investment Hotspot Map",
        language === 'zh' ? "曼哈顿豪宅市场报告" : "Manhattan Luxury Market Report"
      ]
    },
    {
      week: 2,
      focus: language === 'zh' ? "教育内容" : "Educational Content", 
      content: [
        language === 'zh' ? "首次海外买房完整指南" : "Complete Guide to First-Time Foreign Property Purchase",
        language === 'zh' ? "纽约房贷申请详解" : "NYC Mortgage Application Detailed Guide",
        language === 'zh' ? "房产税务优化策略" : "Property Tax Optimization Strategies"
      ]
    },
    {
      week: 3,
      focus: language === 'zh' ? "客户案例" : "Client Success Stories",
      content: [
        language === 'zh' ? "成功帮助客户购买学区房案例" : "Successfully Helping Clients Purchase School District Properties",
        language === 'zh' ? "商业地产投资回报分析" : "Commercial Real Estate Investment ROI Analysis", 
        language === 'zh' ? "疫情后房产投资策略调整" : "Post-Pandemic Property Investment Strategy Adjustments"
      ]
    },
    {
      week: 4,
      focus: language === 'zh' ? "社区指南" : "Neighborhood Guides",
      content: [
        language === 'zh' ? "法拉盛生活指南2024" : "Flushing Living Guide 2024",
        language === 'zh' ? "曼哈顿上东区房产分析" : "Manhattan Upper East Side Property Analysis",
        language === 'zh' ? "长岛学区房选择指南" : "Long Island School District Property Selection Guide"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {language === 'zh' ? 'NYC房地产经纪人终极SEO策略' : 'Ultimate SEO Strategy for NYC Real Estate Agents'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          {language === 'zh' 
            ? '基于数据驱动的综合SEO策略，确保在纽约地产经纪人搜索中获得顶级排名，覆盖中英双语市场'
            : 'Data-driven comprehensive SEO strategy to ensure top rankings in NYC real estate agent searches, covering both Chinese and English markets'
          }
        </p>
      </div>

      {/* SEO Strategies */}
      <div className="grid md:grid-cols-2 gap-6">
        {seoStrategies.map((strategy, index) => (
          <Card key={index} className="h-full">
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3">
                {strategy.icon}
                <CardTitle className="text-lg">{strategy.title}</CardTitle>
              </div>
              <Badge variant={strategy.priority === "critical" ? "destructive" : strategy.priority === "high" ? "default" : "secondary"}>
                {strategy.priority === "critical" ? (language === 'zh' ? "关键" : "Critical") :
                 strategy.priority === "high" ? (language === 'zh' ? "高优先级" : "High Priority") :
                 (language === 'zh' ? "中等优先级" : "Medium Priority")}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {strategy.techniques.map((technique, techIndex) => (
                  <li key={techIndex} className="text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {technique}
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t">
                <p className="text-xs text-green-600 font-medium">
                  {language === 'zh' ? '预期效果: ' : 'Expected Impact: '}{strategy.impact}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Keyword Strategy */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Globe className="w-6 h-6" />
            {language === 'zh' ? '关键词策略矩阵' : 'Keyword Strategy Matrix'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {keywordStrategies.map((strategy, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{strategy.category}</h4>
                  <Badge variant={strategy.difficulty === "high" ? "destructive" : strategy.difficulty === "medium" ? "default" : "secondary"}>
                    {strategy.difficulty === "high" ? (language === 'zh' ? "高难度" : "High") :
                     strategy.difficulty === "medium" ? (language === 'zh' ? "中等" : "Medium") :
                     (language === 'zh' ? "低难度" : "Low")}
                  </Badge>
                </div>
                <ul className="space-y-1">
                  {strategy.keywords.map((keyword, keyIndex) => (
                    <li key={keyIndex} className="text-sm p-2 bg-white/50 rounded border">
                      {keyword}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            {language === 'zh' ? '月度内容发布计划' : 'Monthly Content Publishing Plan'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contentPlan.map((week, index) => (
              <div key={index} className="space-y-3 p-4 border rounded-lg">
                <div className="text-center">
                  <div className="w-10 h-10 bg-primary rounded-full mx-auto flex items-center justify-center text-primary-foreground font-bold">
                    {week.week}
                  </div>
                  <h4 className="font-semibold mt-2">{week.focus}</h4>
                </div>
                <ul className="space-y-1">
                  {week.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-xs p-2 bg-secondary/20 rounded">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {language === 'zh' ? '预期SEO成果指标' : 'Expected SEO Performance Metrics'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">+200%</div>
              <p className="text-sm text-muted-foreground">
                {language === 'zh' ? '有机搜索流量增长' : 'Organic Search Traffic Growth'}
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">TOP 3</div>
              <p className="text-sm text-muted-foreground">
                {language === 'zh' ? '主要关键词排名' : 'Primary Keyword Rankings'}
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">+150%</div>
              <p className="text-sm text-muted-foreground">
                {language === 'zh' ? '合格询盘增长' : 'Qualified Lead Growth'}
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">90%</div>
              <p className="text-sm text-muted-foreground">
                {language === 'zh' ? '本地搜索可见性' : 'Local Search Visibility'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {language === 'zh' ? '6个月实施时间线' : '6-Month Implementation Timeline'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                month: 1,
                title: language === 'zh' ? '基础优化' : 'Foundation Optimization',
                tasks: language === 'zh' ? '技术SEO, 关键词研究, 竞争分析' : 'Technical SEO, Keyword Research, Competitor Analysis'
              },
              {
                month: 2,
                title: language === 'zh' ? '内容创建' : 'Content Creation',
                tasks: language === 'zh' ? '专业文章发布, 本地SEO优化' : 'Professional Article Publishing, Local SEO Optimization'
              },
              {
                month: 3,
                title: language === 'zh' ? '权威建立' : 'Authority Building',
                tasks: language === 'zh' ? '反向链接建设, 社交媒体整合' : 'Backlink Building, Social Media Integration'
              },
              {
                month: 4,
                title: language === 'zh' ? '性能优化' : 'Performance Optimization',
                tasks: language === 'zh' ? '页面速度优化, 用户体验改进' : 'Page Speed Optimization, User Experience Improvement'
              },
              {
                month: 5,
                title: language === 'zh' ? '扩展策略' : 'Expansion Strategy',
                tasks: language === 'zh' ? '新关键词拓展, 内容多样化' : 'New Keyword Expansion, Content Diversification'
              },
              {
                month: 6,
                title: language === 'zh' ? '效果评估' : 'Performance Evaluation',
                tasks: language === 'zh' ? '数据分析, 策略调整, 持续优化' : 'Data Analysis, Strategy Adjustment, Continuous Optimization'
              }
            ].map((phase, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  {phase.month}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{phase.title}</h4>
                  <p className="text-sm text-muted-foreground">{phase.tasks}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};