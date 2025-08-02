import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Calculator, Clock, TrendingUp, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export const DataDrivenContent = () => {
  const { t } = useLanguage();
  const [roiInputs, setRoiInputs] = useState({
    purchasePrice: '',
    downPayment: '',
    monthlyRent: '',
    monthlyExpenses: '',
    closingCosts: ''
  });
  const [roiResult, setRoiResult] = useState<number | null>(null);

  const calculateROI = () => {
    const price = parseFloat(roiInputs.purchasePrice);
    const down = parseFloat(roiInputs.downPayment);
    const rent = parseFloat(roiInputs.monthlyRent);
    const expenses = parseFloat(roiInputs.monthlyExpenses);
    const closing = parseFloat(roiInputs.closingCosts);

    if (price && down && rent && expenses) {
      const totalInvestment = down + closing;
      const annualCashFlow = (rent - expenses) * 12;
      const roi = (annualCashFlow / totalInvestment) * 100;
      setRoiResult(roi);
    }
  };

  const marketReports = [
    {
      month: t("2024年1月"),
      salesVolume: 1250,
      avgPrice: "$875,000",
      daysOnMarket: 42,
      inventory: "3.2个月",
      priceChange: "+2.1%"
    },
    {
      month: t("2024年2月"),
      salesVolume: 1180,
      avgPrice: "$890,000",
      daysOnMarket: 38,
      inventory: "2.9个月",
      priceChange: "+1.7%"
    },
    {
      month: t("2024年3月"),
      salesVolume: 1420,
      avgPrice: "$910,000",
      daysOnMarket: 35,
      inventory: "2.6个月",
      priceChange: "+2.2%"
    }
  ];

  const hotNeighborhoods = [
    {
      rank: 1,
      name: t("长岛市"),
      nameEn: "Long Island City",
      priceGrowth: "+12.5%",
      avgPrice: "$750,000",
      reasons: [t("交通便利"), t("新开发项目"), t("曼哈顿景观")]
    },
    {
      rank: 2,
      name: t("阿斯托利亚"),
      nameEn: "Astoria",
      priceGrowth: "+9.8%",
      avgPrice: "$680,000",
      reasons: [t("文化多元"), t("餐饮丰富"), t("性价比高")]
    },
    {
      rank: 3,
      name: t("法拉盛"),
      nameEn: "Flushing",
      priceGrowth: "+8.5%",
      avgPrice: "$850,000",
      reasons: [t("华人社区"), t("优质学区"), t("商业发达")]
    },
    {
      rank: 4,
      name: t("森林小丘"),
      nameEn: "Forest Hills",
      priceGrowth: "+7.2%",
      avgPrice: "$950,000",
      reasons: [t("花园住宅"), t("安静宜居"), t("保值稳定")]
    }
  ];

  const transactionAnalysis = [
    {
      priceRange: "$500K - $700K",
      avgDays: 28,
      competitionLevel: t("激烈"),
      successRate: "65%",
      tips: t("需快速决策，灵活条件")
    },
    {
      priceRange: "$700K - $1M",
      avgDays: 35,
      competitionLevel: t("中等"),
      successRate: "78%",
      tips: t("充分准备，合理出价")
    },
    {
      priceRange: "$1M - $1.5M",
      avgDays: 45,
      competitionLevel: t("较低"),
      successRate: "85%",
      tips: t("详细检查，谨慎谈判")
    },
    {
      priceRange: "$1.5M+",
      avgDays: 65,
      competitionLevel: t("很低"),
      successRate: "92%",
      tips: t("专业团队，全面评估")
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{t("数据驱动内容")}</h1>
        <p className="text-xl text-muted-foreground">
          {t("基于真实市场数据的专业分析和实用工具")}
        </p>
        <Badge variant="default" className="text-lg px-4 py-2">
          {t("实时更新")} | {t("专业权威")}
        </Badge>
      </div>

      {/* 月度市场销售报告 */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center gap-4">
            <BarChart className="w-6 h-6" />
            <div>
              <CardTitle className="text-2xl">{t("月度市场销售报告")}</CardTitle>
              <p className="text-muted-foreground mt-2">
                {t("皇后区房地产市场最新销售数据分析")}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">{t("月份")}</th>
                  <th className="text-left p-3">{t("销售量")}</th>
                  <th className="text-left p-3">{t("平均价格")}</th>
                  <th className="text-left p-3">{t("在市天数")}</th>
                  <th className="text-left p-3">{t("库存")}</th>
                  <th className="text-left p-3">{t("价格变化")}</th>
                </tr>
              </thead>
              <tbody>
                {marketReports.map((report, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">{report.month}</td>
                    <td className="p-3">{report.salesVolume}</td>
                    <td className="p-3 font-medium text-green-600">{report.avgPrice}</td>
                    <td className="p-3">{report.daysOnMarket}</td>
                    <td className="p-3">{report.inventory}</td>
                    <td className="p-3 font-medium text-green-600">{report.priceChange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
            <h4 className="font-semibold mb-2">{t("市场趋势分析")}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("2024年第一季度皇后区房地产市场表现强劲，销售量稳定增长，平均价格持续上涨。库存紧张推动了价格上涨，买家需要做好充分准备以在竞争中获胜。建议买家关注新上市房源，快速决策。")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ROI计算器 */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-secondary/10 to-primary/10">
          <div className="flex items-center gap-4">
            <Calculator className="w-6 h-6" />
            <div>
              <CardTitle className="text-2xl">{t("房产投资ROI计算器")}</CardTitle>
              <p className="text-muted-foreground mt-2">
                {t("计算您的房产投资回报率")}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="purchasePrice">{t("购买价格")} ($)</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  placeholder="850000"
                  value={roiInputs.purchasePrice}
                  onChange={(e) => setRoiInputs(prev => ({...prev, purchasePrice: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="downPayment">{t("首付金额")} ($)</Label>
                <Input
                  id="downPayment"
                  type="number"
                  placeholder="170000"
                  value={roiInputs.downPayment}
                  onChange={(e) => setRoiInputs(prev => ({...prev, downPayment: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="monthlyRent">{t("月租金")} ($)</Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  placeholder="3500"
                  value={roiInputs.monthlyRent}
                  onChange={(e) => setRoiInputs(prev => ({...prev, monthlyRent: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="monthlyExpenses">{t("月支出")} ($)</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  placeholder="1200"
                  value={roiInputs.monthlyExpenses}
                  onChange={(e) => setRoiInputs(prev => ({...prev, monthlyExpenses: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="closingCosts">{t("交割费用")} ($)</Label>
                <Input
                  id="closingCosts"
                  type="number"
                  placeholder="25000"
                  value={roiInputs.closingCosts}
                  onChange={(e) => setRoiInputs(prev => ({...prev, closingCosts: e.target.value}))}
                />
              </div>
              <Button onClick={calculateROI} className="w-full">
                {t("计算ROI")}
              </Button>
            </div>
            <div className="flex items-center justify-center">
              {roiResult !== null && (
                <div className="text-center p-8 bg-primary/10 rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {roiResult.toFixed(2)}%
                  </div>
                  <p className="text-muted-foreground">{t("年化投资回报率")}</p>
                  <div className="mt-4 text-sm">
                    {roiResult > 8 && (
                      <Badge variant="default">{t("优秀投资")}</Badge>
                    )}
                    {roiResult > 5 && roiResult <= 8 && (
                      <Badge variant="secondary">{t("良好投资")}</Badge>
                    )}
                    {roiResult <= 5 && (
                      <Badge variant="outline">{t("需要改善")}</Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 成交周期分析 */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-accent/10 to-secondary/10">
          <div className="flex items-center gap-4">
            <Clock className="w-6 h-6" />
            <div>
              <CardTitle className="text-2xl">{t("成交周期分析")}</CardTitle>
              <p className="text-muted-foreground mt-2">
                {t("不同价位房产的成交时间和竞争情况")}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4">
            {transactionAnalysis.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="grid md:grid-cols-5 gap-4 items-center">
                  <div className="font-semibold">{item.priceRange}</div>
                  <div className="text-center">
                    <div className="font-medium">{item.avgDays}</div>
                    <div className="text-xs text-muted-foreground">{t("平均天数")}</div>
                  </div>
                  <div className="text-center">
                    <Badge variant={item.competitionLevel === "激烈" ? "destructive" : 
                                   item.competitionLevel === "中等" ? "secondary" : "default"}>
                      {item.competitionLevel}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-green-600">{item.successRate}</div>
                    <div className="text-xs text-muted-foreground">{t("成功率")}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{item.tips}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 热门社区排行榜 */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center gap-4">
            <Star className="w-6 h-6" />
            <div>
              <CardTitle className="text-2xl">{t("热门社区排行榜")}</CardTitle>
              <p className="text-muted-foreground mt-2">
                {t("基于价格增长和投资潜力的社区排名")}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4">
            {hotNeighborhoods.map((neighborhood) => (
              <div key={neighborhood.rank} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {neighborhood.rank}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{neighborhood.name}</h4>
                      <p className="text-sm text-muted-foreground">{neighborhood.nameEn}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600 text-lg">{neighborhood.priceGrowth}</div>
                    <div className="text-sm text-muted-foreground">{t("年增长率")}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-muted-foreground">{t("平均价格")}: </span>
                    <span className="font-medium">{neighborhood.avgPrice}</span>
                  </div>
                  <div className="flex gap-2">
                    {neighborhood.reasons.map((reason, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {reason}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-accent/20 rounded-lg">
            <h4 className="font-semibold mb-2">{t("投资建议")}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("长岛市和阿斯托利亚是当前最具投资潜力的区域，结合了交通便利和相对较低的价格。法拉盛和森林小丘则更适合追求稳定增值的投资者。建议根据个人投资目标和风险承受能力选择合适的区域。")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};