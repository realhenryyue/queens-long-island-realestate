import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, TrendingUp, Home, Percent } from 'lucide-react';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    purchasePrice: 750000,
    downPayment: 150000,
    monthlyRent: 3200,
    monthlyExpenses: 800,
    closingCosts: 15000,
    renovationCosts: 25000,
    appreciationRate: 4.5
  });

  const [results, setResults] = useState({
    cashInvested: 0,
    annualCashFlow: 0,
    cashOnCashReturn: 0,
    capRate: 0,
    totalROI: 0,
    monthlyProfit: 0,
    annualAppreciation: 0
  });

  const calculateROI = () => {
    const cashInvested = inputs.downPayment + inputs.closingCosts + inputs.renovationCosts;
    const annualRent = inputs.monthlyRent * 12;
    const annualExpenses = inputs.monthlyExpenses * 12;
    const annualCashFlow = annualRent - annualExpenses;
    const monthlyProfit = annualCashFlow / 12;
    
    const cashOnCashReturn = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;
    const capRate = inputs.purchasePrice > 0 ? (annualCashFlow / inputs.purchasePrice) * 100 : 0;
    const annualAppreciation = inputs.purchasePrice * (inputs.appreciationRate / 100);
    const totalROI = cashInvested > 0 ? ((annualCashFlow + annualAppreciation) / cashInvested) * 100 : 0;

    setResults({
      cashInvested,
      annualCashFlow,
      cashOnCashReturn,
      capRate,
      totalROI,
      monthlyProfit,
      annualAppreciation
    });
  };

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent.toFixed(2)}%`;
  };

  const getROIColor = (roi: number) => {
    if (roi >= 15) return 'text-green-600';
    if (roi >= 8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const presetScenarios = [
    {
      name: "Flushing Condo",
      values: { purchasePrice: 720000, downPayment: 144000, monthlyRent: 2800, monthlyExpenses: 650, closingCosts: 14400, renovationCosts: 15000, appreciationRate: 6.2 }
    },
    {
      name: "Queens Family Home",
      values: { purchasePrice: 950000, downPayment: 190000, monthlyRent: 3800, monthlyExpenses: 1100, closingCosts: 19000, renovationCosts: 35000, appreciationRate: 4.7 }
    },
    {
      name: "Astoria Investment",
      values: { purchasePrice: 860000, downPayment: 172000, monthlyRent: 3200, monthlyExpenses: 850, closingCosts: 17200, renovationCosts: 20000, appreciationRate: 4.2 }
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Real Estate Investment ROI Calculator
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate your potential returns on NYC real estate investments with accurate market data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Investment Parameters
              </CardTitle>
              <CardDescription>
                Enter your investment details to calculate potential returns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preset Scenarios */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Quick Scenarios</Label>
                <div className="flex flex-wrap gap-2">
                  {presetScenarios.map((scenario, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputs(scenario.values)}
                      className="text-xs"
                    >
                      {scenario.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="purchasePrice">Purchase Price</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={inputs.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="downPayment">Down Payment</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    value={inputs.downPayment}
                    onChange={(e) => handleInputChange('downPayment', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyRent">Monthly Rent</Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={inputs.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyExpenses">Monthly Expenses</Label>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    value={inputs.monthlyExpenses}
                    onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="closingCosts">Closing Costs</Label>
                  <Input
                    id="closingCosts"
                    type="number"
                    value={inputs.closingCosts}
                    onChange={(e) => handleInputChange('closingCosts', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="renovationCosts">Renovation Costs</Label>
                  <Input
                    id="renovationCosts"
                    type="number"
                    value={inputs.renovationCosts}
                    onChange={(e) => handleInputChange('renovationCosts', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="appreciationRate">Annual Appreciation Rate (%)</Label>
                  <Input
                    id="appreciationRate"
                    type="number"
                    step="0.1"
                    value={inputs.appreciationRate}
                    onChange={(e) => handleInputChange('appreciationRate', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Investment Returns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border">
                    <DollarSign className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-primary">
                      {formatPercent(results.totalROI)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total ROI</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg border">
                    <Percent className="h-6 w-6 mx-auto mb-2 text-secondary-foreground" />
                    <div className="text-2xl font-bold">
                      {formatPercent(results.cashOnCashReturn)}
                    </div>
                    <div className="text-sm text-muted-foreground">Cash-on-Cash</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Detailed Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="font-medium">Cash Invested</span>
                  <span className="font-bold">{formatCurrency(results.cashInvested)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="font-medium">Monthly Cash Flow</span>
                  <span className={`font-bold ${results.monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(results.monthlyProfit)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="font-medium">Annual Cash Flow</span>
                  <span className={`font-bold ${results.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(results.annualCashFlow)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="font-medium">Cap Rate</span>
                  <span className="font-bold">{formatPercent(results.capRate)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="font-medium">Annual Appreciation</span>
                  <span className="font-bold text-green-600">{formatCurrency(results.annualAppreciation)}</span>
                </div>
              </CardContent>
            </Card>

            {/* ROI Interpretation */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Cash-on-Cash Return</span>
                    <Badge variant={results.cashOnCashReturn >= 8 ? "default" : results.cashOnCashReturn >= 5 ? "secondary" : "destructive"}>
                      {results.cashOnCashReturn >= 8 ? "Excellent" : results.cashOnCashReturn >= 5 ? "Good" : "Poor"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cap Rate</span>
                    <Badge variant={results.capRate >= 5 ? "default" : results.capRate >= 3 ? "secondary" : "destructive"}>
                      {results.capRate >= 5 ? "Strong" : results.capRate >= 3 ? "Moderate" : "Weak"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total ROI</span>
                    <Badge variant={results.totalROI >= 15 ? "default" : results.totalROI >= 8 ? "secondary" : "destructive"}>
                      {results.totalROI >= 15 ? "Outstanding" : results.totalROI >= 8 ? "Solid" : "Below Average"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Disclaimer:</strong> This calculator provides estimates based on the inputs provided. Actual returns may vary due to market conditions, 
              vacancy rates, maintenance costs, and other factors. Consult with a real estate professional and financial advisor before making investment decisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ROICalculator;