import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, TrendingUp, Home, Percent, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLanguage } from '@/contexts/LanguageContext';

const ROICalculator = () => {
  const { t } = useLanguage();
  
  const [inputs, setInputs] = useState({
    purchasePrice: '750000',
    monthlyRent: '3200',
    monthlyExpenses: '800',
    closingCosts: '15000',
    renovationCosts: '25000',
    appreciationRate: '4.5'
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
    // Convert string inputs to numbers for calculations
    const purchasePrice = parseFloat(inputs.purchasePrice) || 0;
    const downPayment = purchasePrice * 0.3; // 30% down payment
    const monthlyRent = parseFloat(inputs.monthlyRent) || 0;
    const monthlyExpenses = parseFloat(inputs.monthlyExpenses) || 0;
    const closingCosts = parseFloat(inputs.closingCosts) || 0;
    const renovationCosts = parseFloat(inputs.renovationCosts) || 0;
    const appreciationRate = parseFloat(inputs.appreciationRate) || 0;

    const cashInvested = downPayment + closingCosts + renovationCosts;
    const annualRent = monthlyRent * 12;
    const annualExpenses = monthlyExpenses * 12;
    const annualCashFlow = annualRent - annualExpenses;
    const monthlyProfit = annualCashFlow / 12;
    
    const cashOnCashReturn = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;
    const capRate = purchasePrice > 0 ? (annualCashFlow / purchasePrice) * 100 : 0;
    const annualAppreciation = purchasePrice * (appreciationRate / 100);
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
    // Store the raw string value to allow empty fields
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const exportToPDF = async () => {
    const element = document.getElementById('roi-calculator-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('roi-calculator-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
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
      name: t('roi.flushingCondo'),
      values: { purchasePrice: '720000', monthlyRent: '2800', monthlyExpenses: '650', closingCosts: '14400', renovationCosts: '15000', appreciationRate: '6.2' }
    },
    {
      name: t('roi.queensFamily'),
      values: { purchasePrice: '950000', monthlyRent: '3800', monthlyExpenses: '1100', closingCosts: '19000', renovationCosts: '35000', appreciationRate: '4.7' }
    },
    {
      name: t('roi.astoriaInvestment'),
      values: { purchasePrice: '860000', monthlyRent: '3200', monthlyExpenses: '850', closingCosts: '17200', renovationCosts: '20000', appreciationRate: '4.2' }
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {t('roi.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('roi.subtitle')}
          </p>
          <Button 
            onClick={exportToPDF}
            className="mt-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Download className="h-4 w-4 mr-2" />
            {t('roi.exportPDF')}
          </Button>
        </div>

        <div id="roi-calculator-content">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                {t('roi.investmentParameters')}
              </CardTitle>
              <CardDescription>
                {t('roi.parametersDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preset Scenarios */}
              <div>
                <Label className="text-sm font-medium mb-3 block">{t('roi.quickScenarios')}</Label>
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
                  <Label htmlFor="purchasePrice">{t('roi.purchasePrice')}</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={inputs.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="downPayment">{t('roi.downPayment')}</Label>
                  <Input
                    id="downPayment"
                    type="text"
                    value={formatCurrency(parseFloat(inputs.purchasePrice) * 0.3 || 0)}
                    readOnly
                    className="mt-1 bg-muted cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyRent">{t('roi.monthlyRent')}</Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={inputs.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyExpenses">{t('roi.monthlyExpenses')}</Label>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    value={inputs.monthlyExpenses}
                    onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="closingCosts">{t('roi.closingCosts')}</Label>
                  <Input
                    id="closingCosts"
                    type="number"
                    value={inputs.closingCosts}
                    onChange={(e) => handleInputChange('closingCosts', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="renovationCosts">{t('roi.renovationCosts')}</Label>
                  <Input
                    id="renovationCosts"
                    type="number"
                    value={inputs.renovationCosts}
                    onChange={(e) => handleInputChange('renovationCosts', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="appreciationRate">{t('roi.appreciationRate')}</Label>
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
                  {t('roi.investmentReturns')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border">
                    <DollarSign className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-primary">
                      {formatPercent(results.totalROI)}
                    </div>
                    <div className="text-sm text-muted-foreground">{t('roi.totalROI')}</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg border">
                    <Percent className="h-6 w-6 mx-auto mb-2 text-secondary-foreground" />
                    <div className="text-2xl font-bold">
                      {formatPercent(results.cashOnCashReturn)}
                    </div>
                    <div className="text-sm text-muted-foreground">{t('roi.cashOnCash')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  {t('roi.detailedAnalysis')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="font-medium">{t('roi.cashInvested')}</span>
                  <span className="font-bold">{formatCurrency(results.cashInvested)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="font-medium">{t('roi.monthlyCashFlow')}</span>
                  <span className={`font-bold ${results.monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(results.monthlyProfit)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="font-medium">{t('roi.annualCashFlow')}</span>
                  <span className={`font-bold ${results.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(results.annualCashFlow)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="font-medium">{t('roi.capRate')}</span>
                  <span className="font-bold">{formatPercent(results.capRate)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="font-medium">{t('roi.annualAppreciation')}</span>
                  <span className="font-bold text-green-600">{formatCurrency(results.annualAppreciation)}</span>
                </div>
              </CardContent>
            </Card>

            {/* ROI Interpretation */}
            <Card>
              <CardHeader>
                <CardTitle>{t('roi.investmentQuality')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>{t('roi.cashOnCash')}</span>
                    <Badge variant={results.cashOnCashReturn >= 8 ? "default" : results.cashOnCashReturn >= 5 ? "secondary" : "destructive"}>
                      {results.cashOnCashReturn >= 8 ? t('roi.excellent') : results.cashOnCashReturn >= 5 ? t('roi.good') : t('roi.poor')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t('roi.capRate')}</span>
                    <Badge variant={results.capRate >= 5 ? "default" : results.capRate >= 3 ? "secondary" : "destructive"}>
                      {results.capRate >= 5 ? t('roi.strong') : results.capRate >= 3 ? t('roi.moderate') : t('roi.weak')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t('roi.totalROI')}</span>
                    <Badge variant={results.totalROI >= 15 ? "default" : results.totalROI >= 8 ? "secondary" : "destructive"}>
                      {results.totalROI >= 15 ? t('roi.outstanding') : results.totalROI >= 8 ? t('roi.solid') : t('roi.belowAverage')}
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
              <strong>{t('roi.disclaimerTitle')}</strong> {t('roi.disclaimer')}
            </p>
          </CardContent>
        </Card>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;