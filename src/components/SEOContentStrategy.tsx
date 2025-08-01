import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MapPin, Home, DollarSign, Users, Calendar } from "lucide-react";

export const SEOContentStrategy = () => {
  const contentCategories = [
    {
      title: "本地市场专家内容",
      priority: "高优先级",
      icon: <MapPin className="w-5 h-5" />,
      items: [
        "法拉盛房价走势分析 (月度更新)",
        "皇后区各社区详细指南", 
        "学区房投资报告",
        "曼哈顿 vs 皇后区房价对比",
        "长岛新建楼盘评测",
        "纽约各区租金回报率分析"
      ],
      seoValue: "本地SEO核心，获得地理相关搜索流量"
    },
    {
      title: "买房教育内容",
      priority: "高优先级", 
      icon: <Home className="w-5 h-5" />,
      items: [
        "首次海外买房完整指南",
        "纽约购房流程详解",
        "房屋贷款申请攻略",
        "房屋检查注意事项",
        "产权保险知识科普",
        "购房税务优化建议"
      ],
      seoValue: "捕获教育型搜索，建立专业权威"
    },
    {
      title: "投资分析内容",
      priority: "中等优先级",
      icon: <DollarSign className="w-5 h-5" />,
      items: [
        "纽约房产投资ROI计算器",
        "商业地产投资机会分析", 
        "短租vs长租收益对比",
        "房地产市场周期预测",
        "税务减免策略详解",
        "房产组合配置建议"
      ],
      seoValue: "吸引高价值投资客户"
    },
    {
      title: "客户成功案例",
      priority: "高优先级",
      icon: <Users className="w-5 h-5" />,
      items: [
        "客户成功购房故事",
        "投资回报真实案例",
        "疑难交易解决过程",
        "客户评价与推荐",
        "买房前后对比",
        "节省费用案例分享"
      ],
      seoValue: "建立信任，提高转化率"
    },
    {
      title: "市场数据报告",
      priority: "中等优先级", 
      icon: <TrendingUp className="w-5 h-5" />,
      items: [
        "月度市场销售报告",
        "季度价格趋势分析",
        "库存变化统计",
        "成交周期分析",
        "热门社区排行榜",
        "市场预测报告"
      ],
      seoValue: "获得数据相关搜索流量"
    },
    {
      title: "生活方式内容",
      priority: "中等优先级",
      icon: <Calendar className="w-5 h-5" />,
      items: [
        "纽约生活成本详解",
        "社区便民设施介绍",
        "学校评级与选择",
        "交通便利性分析",
        "购物娱乐指南",
        "安全性评估报告"
      ],
      seoValue: "扩大受众范围，提高停留时间"
    }
  ];

  const seoTechniques = [
    "每篇文章2000+字，深度专业内容",
    "使用'纽约房地产+具体区域'长尾关键词",
    "添加本地化FAQ部分",
    "嵌入Google地图和房源数据",
    "建立内部链接体系",
    "定期更新确保内容新鲜度"
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">纽约地产经纪人SEO内容策略</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          基于顶级经纪人成功模式，打造获得最高搜索排名的专业内容体系
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentCategories.map((category, index) => (
          <Card key={index} className="h-full">
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3">
                {category.icon}
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </div>
              <Badge variant={category.priority === "高优先级" ? "default" : "secondary"}>
                {category.priority}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t">
                <p className="text-xs text-muted-foreground font-medium">
                  SEO价值: {category.seoValue}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-2xl text-center">SEO技术要点</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {seoTechniques.map((technique, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <p className="text-sm">{technique}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4 text-center">实施时间线建议</h3>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary rounded-full mx-auto flex items-center justify-center text-primary-foreground font-bold">
              1
            </div>
            <h4 className="font-semibold">第1月</h4>
            <p className="text-sm text-muted-foreground">核心页面优化<br/>本地SEO设置</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary rounded-full mx-auto flex items-center justify-center text-primary-foreground font-bold">
              2
            </div>
            <h4 className="font-semibold">第2-3月</h4>
            <p className="text-sm text-muted-foreground">社区指南创建<br/>市场报告发布</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary rounded-full mx-auto flex items-center justify-center text-primary-foreground font-bold">
              3
            </div>
            <h4 className="font-semibold">第4-6月</h4>
            <p className="text-sm text-muted-foreground">教育内容体系<br/>案例故事发布</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary rounded-full mx-auto flex items-center justify-center text-primary-foreground font-bold">
              4
            </div>
            <h4 className="font-semibold">持续优化</h4>
            <p className="text-sm text-muted-foreground">数据分析调整<br/>内容更新维护</p>
          </div>
        </div>
      </div>
    </div>
  );
};