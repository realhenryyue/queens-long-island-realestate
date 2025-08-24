import { useLanguage } from "@/hooks/useLanguage";

const MarketAnalysisHub = () => {
  const { t, currentLanguage } = useLanguage();

  return (
    <section id="market-analysis" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            {t('marketAnalysis.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('marketAnalysis.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Market Trends Card */}
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {currentLanguage === 'zh' ? '市场趋势' : 'Market Trends'}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>{currentLanguage === 'zh' ? '皇后区中位价' : 'Queens Median'}</span>
                <span className="font-semibold text-green-600">$685,000</span>
              </div>
              <div className="flex justify-between">
                <span>{currentLanguage === 'zh' ? '年增长率' : 'YoY Growth'}</span>
                <span className="font-semibold text-green-600">+4.2%</span>
              </div>
              <div className="flex justify-between">
                <span>{currentLanguage === 'zh' ? '平均销售天数' : 'Days on Market'}</span>
                <span className="font-semibold">38 {currentLanguage === 'zh' ? '天' : 'days'}</span>
              </div>
            </div>
          </div>

          {/* Investment Analysis Card */}
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {currentLanguage === 'zh' ? '投资分析' : 'Investment Analysis'}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>{currentLanguage === 'zh' ? '平均租金回报率' : 'Average Cap Rate'}</span>
                <span className="font-semibold text-blue-600">4.7%</span>
              </div>
              <div className="flex justify-between">
                <span>{currentLanguage === 'zh' ? '现金流' : 'Cash Flow'}</span>
                <span className="font-semibold text-green-600">{currentLanguage === 'zh' ? '正现金流' : 'Positive'}</span>
              </div>
              <div className="flex justify-between">
                <span>{currentLanguage === 'zh' ? '投资风险' : 'Investment Risk'}</span>
                <span className="font-semibold text-yellow-600">{currentLanguage === 'zh' ? '中等' : 'Moderate'}</span>
              </div>
            </div>
          </div>

          {/* Top Neighborhoods Card */}
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {currentLanguage === 'zh' ? '热门社区' : 'Top Neighborhoods'}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{currentLanguage === 'zh' ? '法拉盛' : 'Flushing'}</span>
                <span className="text-sm text-green-600">4.5%</span>
              </div>
              <div className="flex justify-between">
                <span>{currentLanguage === 'zh' ? '长岛市' : 'LIC'}</span>
                <span className="text-sm text-green-600">3.9%</span>
              </div>
              <div className="flex justify-between">
                <span>{currentLanguage === 'zh' ? '阿斯托利亚' : 'Astoria'}</span>
                <span className="text-sm text-green-600">4.2%</span>
              </div>
              <div className="flex justify-between">
                <span>{currentLanguage === 'zh' ? '日落公园' : 'Sunset Park'}</span>
                <span className="text-sm text-green-600">4.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketAnalysisHub;