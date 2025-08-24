import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const ROICalculator = () => {
  const { t, currentLanguage } = useLanguage();
  const [inputs, setInputs] = useState({
    purchasePrice: '',
    downPayment: '',
    monthlyRent: '',
    monthlyExpenses: ''
  });
  const [results, setResults] = useState(null);

  const calculateROI = () => {
    const price = parseFloat(inputs.purchasePrice) || 0;
    const down = parseFloat(inputs.downPayment) || 0;
    const rent = parseFloat(inputs.monthlyRent) || 0;
    const expenses = parseFloat(inputs.monthlyExpenses) || 0;

    const annualRent = rent * 12;
    const annualExpenses = expenses * 12;
    const netIncome = annualRent - annualExpenses;
    const capRate = price > 0 ? (netIncome / price) * 100 : 0;
    const cashOnCashReturn = down > 0 ? (netIncome / down) * 100 : 0;

    setResults({
      annualRent,
      annualExpenses,
      netIncome,
      capRate: capRate.toFixed(2),
      cashOnCashReturn: cashOnCashReturn.toFixed(2)
    });
  };

  return (
    <section id="roi-calculator" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            {t('roi.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('roi.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                {currentLanguage === 'zh' ? '投资计算器' : 'Investment Calculator'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="purchasePrice">
                  {currentLanguage === 'zh' ? '购买价格' : 'Purchase Price'} ($)
                </Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  value={inputs.purchasePrice}
                  onChange={(e) => setInputs({...inputs, purchasePrice: e.target.value})}
                  placeholder="750000"
                />
              </div>

              <div>
                <Label htmlFor="downPayment">
                  {currentLanguage === 'zh' ? '首付款' : 'Down Payment'} ($)
                </Label>
                <Input
                  id="downPayment"
                  type="number"
                  value={inputs.downPayment}
                  onChange={(e) => setInputs({...inputs, downPayment: e.target.value})}
                  placeholder="150000"
                />
              </div>

              <div>
                <Label htmlFor="monthlyRent">
                  {currentLanguage === 'zh' ? '月租金' : 'Monthly Rent'} ($)
                </Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  value={inputs.monthlyRent}
                  onChange={(e) => setInputs({...inputs, monthlyRent: e.target.value})}
                  placeholder="3500"
                />
              </div>

              <div>
                <Label htmlFor="monthlyExpenses">
                  {currentLanguage === 'zh' ? '月支出' : 'Monthly Expenses'} ($)
                </Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  value={inputs.monthlyExpenses}
                  onChange={(e) => setInputs({...inputs, monthlyExpenses: e.target.value})}
                  placeholder="1000"
                />
              </div>

              <Button onClick={calculateROI} className="w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                {currentLanguage === 'zh' ? '计算投资回报率' : 'Calculate ROI'}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                {currentLanguage === 'zh' ? '分析结果' : 'Analysis Results'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-secondary/50 rounded">
                    <span>{currentLanguage === 'zh' ? '年租金收入' : 'Annual Rental Income'}</span>
                    <span className="font-semibold text-green-600">
                      ${results.annualRent.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-secondary/50 rounded">
                    <span>{currentLanguage === 'zh' ? '年支出' : 'Annual Expenses'}</span>
                    <span className="font-semibold text-red-600">
                      ${results.annualExpenses.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-secondary/50 rounded">
                    <span>{currentLanguage === 'zh' ? '净收入' : 'Net Income'}</span>
                    <span className="font-semibold">
                      ${results.netIncome.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded">
                    <span className="font-semibold">{currentLanguage === 'zh' ? '资本化率' : 'Cap Rate'}</span>
                    <span className="font-bold text-primary text-lg">
                      {results.capRate}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-accent/10 rounded">
                    <span className="font-semibold">{currentLanguage === 'zh' ? '现金回报率' : 'Cash-on-Cash Return'}</span>
                    <span className="font-bold text-accent text-lg">
                      {results.cashOnCashReturn}%
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  {currentLanguage === 'zh' 
                    ? '输入数据并点击计算查看结果' 
                    : 'Enter data and click calculate to see results'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;