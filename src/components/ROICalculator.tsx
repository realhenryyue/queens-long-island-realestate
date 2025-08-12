import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, DollarSign, TrendingUp, Home, Percent, Download, MapPin, BarChart3, AlertTriangle, Star } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLanguage } from '@/contexts/LanguageContext';
import Plot from 'react-plotly.js';

const ROICalculator = () => {
  const { t, currentLanguage } = useLanguage();
  
  const [selectedRegion, setSelectedRegion] = useState('queens');
  const [addressInput, setAddressInput] = useState('');
  const [analysisStage, setAnalysisStage] = useState('input');
  
  const [inputs, setInputs] = useState({
    purchasePrice: '750000',
    monthlyRent: '3200',
    monthlyExpenses: '800',
    closingCosts: '15000',
    renovationCosts: '25000',
    appreciationRate: '4.5',
    loanInterestRate: '6.63',
    downPaymentPercent: '30',
    vacancyRate: '5'
  });

  const [results, setResults] = useState({
    cashInvested: 0,
    annualCashFlow: 0,
    cashOnCashReturn: 0,
    capRate: 0,
    totalROI: 0,
    monthlyProfit: 0,
    annualAppreciation: 0,
    monthlyMortgage: 0,
    breakEvenDownPayment: 0,
    maxPurchasePrice: 0,
    investmentRating: 1,
    investmentSignal: 'AVOID'
  });

  const [monteCarloResults, setMonteCarloResults] = useState({
    roi_distribution: [],
    confidence_interval: { lower: 0, upper: 0 },
    mean_roi: 0
  });

  const regions = [
    { id: 'queens', name: currentLanguage === 'zh' ? '皇后区' : 'Queens', active: true, medianROI: 8.2, medianPrice: 720000, medianRent: 2850 },
    { id: 'manhattan', name: currentLanguage === 'zh' ? '曼哈顿' : 'Manhattan', active: true, medianROI: 5.4, medianPrice: 1250000, medianRent: 4200 },
    { id: 'nassau', name: currentLanguage === 'zh' ? '拿骚县' : 'Nassau County', active: true, medianROI: 6.8, medianPrice: 850000, medianRent: 3100 },
    { id: 'bronx', name: currentLanguage === 'zh' ? '布朗克斯' : 'Bronx', active: true, medianROI: 9.1, medianPrice: 520000, medianRent: 2400 },
    { id: 'brooklyn', name: currentLanguage === 'zh' ? '布鲁克林' : 'Brooklyn', active: true, medianROI: 7.3, medianPrice: 680000, medianRent: 2900 },
    { id: 'staten', name: currentLanguage === 'zh' ? '史泰登岛' : 'Staten Island', active: true, medianROI: 7.8, medianPrice: 590000, medianRent: 2600 }
  ];

  const calculateAdvancedROI = () => {
    const purchasePrice = parseFloat(inputs.purchasePrice) || 0;
    const downPaymentPercent = parseFloat(inputs.downPaymentPercent) || 30;
    const downPayment = purchasePrice * (downPaymentPercent / 100);
    const loanAmount = purchasePrice - downPayment;
    const monthlyRent = parseFloat(inputs.monthlyRent) || 0;
    const monthlyExpenses = parseFloat(inputs.monthlyExpenses) || 0;
    const closingCosts = parseFloat(inputs.closingCosts) || 0;
    const renovationCosts = parseFloat(inputs.renovationCosts) || 0;
    const appreciationRate = parseFloat(inputs.appreciationRate) || 0;
    const interestRate = parseFloat(inputs.loanInterestRate) || 6.63;
    const vacancyRate = parseFloat(inputs.vacancyRate) || 5;

    // Mortgage calculation
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = 30 * 12; // 30 years
    const monthlyMortgage = loanAmount > 0 ? 
      (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) / 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1) : 0;

    const cashInvested = downPayment + closingCosts + renovationCosts;
    const annualRent = monthlyRent * 12 * (1 - vacancyRate / 100);
    const annualExpenses = monthlyExpenses * 12;
    const annualMortgage = monthlyMortgage * 12;
    const annualCashFlow = annualRent - annualExpenses - annualMortgage;
    const monthlyProfit = annualCashFlow / 12;
    
    const cashOnCashReturn = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;
    const capRate = purchasePrice > 0 ? ((annualRent - annualExpenses) / purchasePrice) * 100 : 0;
    const annualAppreciation = purchasePrice * (appreciationRate / 100);
    const totalROI = cashInvested > 0 ? ((annualCashFlow + annualAppreciation) / cashInvested) * 100 : 0;

    // Investment rating calculation
    let rating = 1;
    if (cashOnCashReturn >= 8) rating = 5;
    else if (cashOnCashReturn >= 6) rating = 4;
    else if (cashOnCashReturn >= 4) rating = 3;
    else if (cashOnCashReturn >= 2) rating = 2;

    let signal = 'AVOID';
    if (cashOnCashReturn >= 8 && capRate >= 5) signal = 'BUY';
    else if (cashOnCashReturn >= 4 && capRate >= 3) signal = 'WAIT';

    // Break-even down payment calculation
    const targetROI = 8; // 8% target
    const breakEvenDownPayment = annualCashFlow > 0 ? (annualCashFlow / (targetROI / 100)) : 0;

    // Maximum purchase price for target ROI
    const maxPurchasePrice = annualCashFlow > 0 ? 
      (annualCashFlow + annualExpenses + annualMortgage) / (1 - vacancyRate / 100) * 12 : 0;

    setResults({
      cashInvested,
      annualCashFlow,
      cashOnCashReturn,
      capRate,
      totalROI,
      monthlyProfit,
      annualAppreciation,
      monthlyMortgage,
      breakEvenDownPayment,
      maxPurchasePrice,
      investmentRating: rating,
      investmentSignal: signal
    });

    // Monte Carlo simulation
    runMonteCarloSimulation(cashInvested, monthlyRent, monthlyExpenses, monthlyMortgage, vacancyRate, appreciationRate);
  };

  const runMonteCarloSimulation = (cashInvested: number, baseRent: number, expenses: number, mortgage: number, baseVacancy: number, baseAppreciation: number) => {
    const simulations = 1000; // Reduced for performance
    const roiResults = [];

    for (let i = 0; i < simulations; i++) {
      // Random variations
      const rentVariation = 1 + (Math.random() - 0.5) * 0.1; // ±5%
      const vacancyVariation = Math.max(0, baseVacancy + (Math.random() - 0.5) * 4); // ±2%
      
      const adjustedRent = baseRent * rentVariation;
      const annualRent = adjustedRent * 12 * (1 - vacancyVariation / 100);
      const annualExpenses = expenses * 12;
      const annualMortgage = mortgage * 12;
      const annualCashFlow = annualRent - annualExpenses - annualMortgage;
      
      const roi = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;
      roiResults.push(roi);
    }

    roiResults.sort((a, b) => a - b);
    const mean = roiResults.reduce((sum, val) => sum + val, 0) / roiResults.length;
    const p5 = roiResults[Math.floor(simulations * 0.05)];
    const p95 = roiResults[Math.floor(simulations * 0.95)];

    setMonteCarloResults({
      roi_distribution: roiResults,
      confidence_interval: { lower: p5, upper: p95 },
      mean_roi: mean
    });
  };

  useEffect(() => {
    calculateAdvancedROI();
  }, [inputs]);

  const handleInputChange = (field: string, value: string) => {
    // Store the raw string value to allow empty fields
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const analyzeProperty = async () => {
    if (!addressInput.trim()) return;
    
    setAnalysisStage('analyzing');
    
    // Show contact prompt for Henry Yue as per specifications
    const shouldContact = window.confirm(
      currentLanguage === 'zh' ? 
        '为获得最准确的投资分析，请联系专业房地产投资分析师 岳鸿宇 (Henry Yue)。\n\n电话: 718-717-5210\n邮箱: forangh@gmail.com\n\n点击"确定"继续基础分析，或"取消"先联系专家。' :
        'For the most accurate investment analysis, please contact professional real estate investment analyst Hongyu (Henry) Yue.\n\nPhone: 718-717-5210\nEmail: forangh@gmail.com\n\nClick "OK" to continue with basic analysis, or "Cancel" to contact the expert first.'
    );
    
    if (!shouldContact) {
      setAnalysisStage('input');
      return;
    }
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Extract region from address and apply region-specific data
    const regionFromAddress = detectRegionFromAddress(addressInput);
    setSelectedRegion(regionFromAddress);
    
    // Get mock data for the detected region
    const mockData = getRegionMockData(regionFromAddress);
    setInputs(prev => ({ ...prev, ...mockData }));
    
    setAnalysisStage('complete');
    
    setTimeout(() => {
      setAnalysisStage('input');
    }, 5000);
  };

  const detectRegionFromAddress = (address: string): string => {
    const lowerAddress = address.toLowerCase();
    if (lowerAddress.includes('manhattan') || lowerAddress.includes('nyc') || lowerAddress.includes('new york, ny')) return 'manhattan';
    if (lowerAddress.includes('brooklyn') || lowerAddress.includes('bk')) return 'brooklyn';
    if (lowerAddress.includes('bronx')) return 'bronx';
    if (lowerAddress.includes('staten island') || lowerAddress.includes('si')) return 'staten';
    if (lowerAddress.includes('nassau') || lowerAddress.includes('long island') || lowerAddress.includes('li')) return 'nassau';
    if (lowerAddress.includes('queens') || lowerAddress.includes('flushing') || lowerAddress.includes('astoria') || lowerAddress.includes('elmhurst')) return 'queens';
    return 'queens'; // Default to Queens
  };

  const getRegionMockData = (region: string) => {
    const regionData = {
      queens: {
        purchasePrice: '785000',
        monthlyRent: '3400',
        monthlyExpenses: '920',
        closingCosts: '15700',
        renovationCosts: '28000',
        appreciationRate: '4.8'
      },
      manhattan: {
        purchasePrice: '1250000',
        monthlyRent: '4800',
        monthlyExpenses: '1400',
        closingCosts: '25000',
        renovationCosts: '45000',
        appreciationRate: '3.2'
      },
      nassau: {
        purchasePrice: '650000',
        monthlyRent: '2800',
        monthlyExpenses: '750',
        closingCosts: '13000',
        renovationCosts: '22000',
        appreciationRate: '5.1'
      },
      bronx: {
        purchasePrice: '480000',
        monthlyRent: '2200',
        monthlyExpenses: '580',
        closingCosts: '9600',
        renovationCosts: '18000',
        appreciationRate: '6.2'
      },
      brooklyn: {
        purchasePrice: '920000',
        monthlyRent: '3600',
        monthlyExpenses: '980',
        closingCosts: '18400',
        renovationCosts: '32000',
        appreciationRate: '4.1'
      },
      staten: {
        purchasePrice: '580000',
        monthlyRent: '2600',
        monthlyExpenses: '680',
        closingCosts: '11600',
        renovationCosts: '20000',
        appreciationRate: '4.9'
      }
    };
    return regionData[region as keyof typeof regionData] || regionData.queens;
  };

  const exportToPDF = async () => {
    const element = document.getElementById('roi-calculator-content');
    if (!element) return;

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Add logo and header
      pdf.setFontSize(20);
      pdf.setTextColor(0, 0, 0);
      pdf.text('www.realhenryyue.com', 20, 20);
      
      pdf.setFontSize(16);
      pdf.text(currentLanguage === 'zh' ? '房地产投资分析报告' : 'Real Estate Investment Analysis Report', 20, 35);

      // Add analysis summary
      pdf.setFontSize(12);
      let yPos = 50;
      
      // Investment Summary
      pdf.setFont(undefined, 'bold');
      pdf.text(currentLanguage === 'zh' ? '投资总结' : 'Investment Summary', 20, yPos);
      yPos += 10;
      
      pdf.setFont(undefined, 'normal');
      pdf.text(`${currentLanguage === 'zh' ? '投资评级' : 'Investment Rating'}: ${results.investmentRating}/5 ${Array(results.investmentRating).fill('★').join('')}`, 20, yPos);
      yPos += 7;
      pdf.text(`${currentLanguage === 'zh' ? '投资信号' : 'Investment Signal'}: ${results.investmentSignal}`, 20, yPos);
      yPos += 7;
      pdf.text(`${currentLanguage === 'zh' ? '现金回报率' : 'Cash-on-Cash ROI'}: ${formatPercent(results.cashOnCashReturn)}`, 20, yPos);
      yPos += 7;
      pdf.text(`${currentLanguage === 'zh' ? '资本化率' : 'Cap Rate'}: ${formatPercent(results.capRate)}`, 20, yPos);
      yPos += 15;

      // Key Metrics
      pdf.setFont(undefined, 'bold');
      pdf.text(currentLanguage === 'zh' ? '关键指标' : 'Key Metrics', 20, yPos);
      yPos += 10;
      
      pdf.setFont(undefined, 'normal');
      pdf.text(`${currentLanguage === 'zh' ? '购买价格' : 'Purchase Price'}: ${formatCurrency(parseFloat(inputs.purchasePrice))}`, 20, yPos);
      yPos += 7;
      pdf.text(`${currentLanguage === 'zh' ? '现金投入' : 'Cash Invested'}: ${formatCurrency(results.cashInvested)}`, 20, yPos);
      yPos += 7;
      pdf.text(`${currentLanguage === 'zh' ? '年现金流' : 'Annual Cash Flow'}: ${formatCurrency(results.annualCashFlow)}`, 20, yPos);
      yPos += 7;
      pdf.text(`${currentLanguage === 'zh' ? '总投资回报率' : 'Total ROI'}: ${formatPercent(results.totalROI)}`, 20, yPos);
      yPos += 15;

      // Risk Analysis
      pdf.setFont(undefined, 'bold');
      pdf.text(currentLanguage === 'zh' ? '风险分析 (90% 置信区间)' : 'Risk Analysis (90% Confidence Interval)', 20, yPos);
      yPos += 10;
      
      pdf.setFont(undefined, 'normal');
      pdf.text(`${currentLanguage === 'zh' ? '预期回报率' : 'Expected ROI'}: ${formatPercent(monteCarloResults.mean_roi)}`, 20, yPos);
      yPos += 7;
      pdf.text(`${currentLanguage === 'zh' ? '回报区间' : 'ROI Range'}: ${formatPercent(monteCarloResults.confidence_interval.lower)} - ${formatPercent(monteCarloResults.confidence_interval.upper)}`, 20, yPos);

      // Add disclaimer
      yPos += 20;
      pdf.setFont(undefined, 'bold');
      pdf.text(currentLanguage === 'zh' ? '免责声明' : 'Disclaimer', 20, yPos);
      yPos += 7;
      pdf.setFont(undefined, 'normal');
      const disclaimerText = currentLanguage === 'zh' ? 
        '此分析基于提供的数据和市场假设。实际结果可能因市场条件、空置率等因素而有所不同。' :
        'This analysis is based on provided data and market assumptions. Actual results may vary due to market conditions, vacancy rates, and other factors.';
      
      const splitText = pdf.splitTextToSize(disclaimerText, 170);
      pdf.text(splitText, 20, yPos);

      pdf.save(`roi-analysis-${selectedRegion}-${Date.now()}.pdf`);
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
      name: currentLanguage === 'zh' ? '法拉盛公寓投资' : 'Flushing Condo Investment',
      values: { purchasePrice: '720000', monthlyRent: '2850', monthlyExpenses: '680', closingCosts: '14400', renovationCosts: '18000', appreciationRate: '5.8', loanInterestRate: '6.63', downPaymentPercent: '30', vacancyRate: '4.5' },
      region: 'queens',
      roiEstimate: 8.4
    },
    {
      name: currentLanguage === 'zh' ? '皇后区家庭住宅' : 'Queens Family Home',
      values: { purchasePrice: '920000', monthlyRent: '3750', monthlyExpenses: '1050', closingCosts: '18400', renovationCosts: '28000', appreciationRate: '4.9', loanInterestRate: '6.63', downPaymentPercent: '30', vacancyRate: '4.0' },
      region: 'queens',
      roiEstimate: 7.8
    },
    {
      name: currentLanguage === 'zh' ? '阿斯托利亚投资型物业' : 'Astoria Investment Property',
      values: { purchasePrice: '840000', monthlyRent: '3150', monthlyExpenses: '820', closingCosts: '16800', renovationCosts: '22000', appreciationRate: '4.5', loanInterestRate: '6.63', downPaymentPercent: '30', vacancyRate: '4.2' },
      region: 'queens',
      roiEstimate: 7.6
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
          
          {/* Region Selector */}
          <div className="mt-8 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5" />
              {currentLanguage === 'zh' ? '选择分析区域' : 'Select Analysis Region'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => {
                    setSelectedRegion(region.id);
                    if (region.active) {
                      // Auto-fill with regional medians when region is selected
                      setInputs(prev => ({
                        ...prev,
                        purchasePrice: region.medianPrice.toString(),
                        monthlyRent: region.medianRent.toString()
                      }));
                      calculateAdvancedROI();
                    }
                  }}
                  className={`p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                    selectedRegion === region.id
                      ? 'border-primary bg-primary/10 shadow-glow ring-2 ring-primary/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5'
                  }`}
                  disabled={!region.active}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium mb-1 text-foreground">{region.name}</div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {currentLanguage === 'zh' ? '中位ROI:' : 'Median ROI:'} 
                      <span className="font-bold text-primary ml-1">{region.medianROI}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatCurrency(region.medianPrice / 1000)}K
                    </div>
                  </div>
                 </button>
              ))}
            </div>
            <div className="mt-4 p-4 bg-secondary/10 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">
                {currentLanguage === 'zh' ? '当前选择区域统计' : 'Selected Region Statistics'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-primary">{regions.find(r => r.id === selectedRegion)?.medianROI}%</div>
                  <div className="text-muted-foreground">{currentLanguage === 'zh' ? '中位ROI' : 'Median ROI'}</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-primary">{formatCurrency(regions.find(r => r.id === selectedRegion)?.medianPrice || 0)}</div>
                  <div className="text-muted-foreground">{currentLanguage === 'zh' ? '中位价格' : 'Median Price'}</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-primary">{formatCurrency(regions.find(r => r.id === selectedRegion)?.medianRent || 0)}</div>
                  <div className="text-muted-foreground">{currentLanguage === 'zh' ? '中位租金' : 'Median Rent'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Analysis */}
          <Card className="max-w-2xl mx-auto mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Input
                  placeholder={currentLanguage === 'zh' ? '输入具体地址进行AI分析 (例: 39-16 Prince St #8E, Flushing, NY 11354)' : 'Enter property address for AI analysis (e.g., 39-16 Prince St #8E, Flushing, NY 11354)'}
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={analyzeProperty}
                  disabled={analysisStage === 'analyzing' || !addressInput.trim()}
                  className="bg-gradient-to-r from-primary to-primary/80"
                >
                  {analysisStage === 'analyzing' ? (
                    <>
                      <BarChart3 className="h-4 w-4 mr-2 animate-pulse" />
                      {currentLanguage === 'zh' ? '分析中...' : 'Analyzing...'}
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      {currentLanguage === 'zh' ? 'AI分析' : 'AI Analyze'}
                    </>
                  )}
                </Button>
              </div>
              {analysisStage === 'complete' && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <BarChart3 className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {currentLanguage === 'zh' ? '分析完成 - 数据已更新' : 'Analysis Complete - Data Updated'}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Button 
            onClick={exportToPDF}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Download className="h-4 w-4 mr-2" />
            {t('roi.exportPDF')}
          </Button>
        </div>

        <div id="roi-calculator-content">
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="analysis">{currentLanguage === 'zh' ? '投资分析' : 'Analysis'}</TabsTrigger>
            <TabsTrigger value="risk">{currentLanguage === 'zh' ? '风险评估' : 'Risk'}</TabsTrigger>
            <TabsTrigger value="advanced">{currentLanguage === 'zh' ? '高级指标' : 'Advanced'}</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
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
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                   {presetScenarios.map((scenario, index) => (
                     <Button
                       key={index}
                       variant={scenario.region === selectedRegion ? "default" : "outline"}
                       size="sm"
                       onClick={() => {
                         setInputs(scenario.values);
                         setSelectedRegion(scenario.region);
                       }}
                       className="flex flex-col p-3 h-auto space-y-1"
                     >
                       <span className="font-medium text-xs">{scenario.name}</span>
                       <span className="text-xs text-muted-foreground">
                         {currentLanguage === 'zh' ? '预期ROI:' : 'Est. ROI:'} {scenario.roiEstimate}%
                       </span>
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
                  <Label htmlFor="downPaymentPercent">{t('roi.downPaymentPercent')}</Label>
                  <Input
                    id="downPaymentPercent"
                    type="number"
                    value={inputs.downPaymentPercent}
                    onChange={(e) => handleInputChange('downPaymentPercent', e.target.value)}
                    className="mt-1"
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
                <div>
                  <Label htmlFor="loanInterestRate">{currentLanguage === 'zh' ? '贷款利率 (%)' : 'Loan Interest Rate (%)'}</Label>
                  <Input
                    id="loanInterestRate"
                    type="number"
                    step="0.01"
                    value={inputs.loanInterestRate}
                    onChange={(e) => handleInputChange('loanInterestRate', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="vacancyRate">{currentLanguage === 'zh' ? '空置率 (%)' : 'Vacancy Rate (%)'}</Label>
                  <Input
                    id="vacancyRate"
                    type="number"
                    step="0.1"
                    value={inputs.vacancyRate}
                    onChange={(e) => handleInputChange('vacancyRate', e.target.value)}
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
                <div className="grid grid-cols-2 gap-4 mb-4">
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
                
                {/* Investment Rating */}
                <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < results.investmentRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <div className="text-lg font-bold mb-1">
                    <Badge variant={results.investmentSignal === 'BUY' ? 'default' : results.investmentSignal === 'WAIT' ? 'secondary' : 'destructive'}>
                      {results.investmentSignal}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {currentLanguage === 'zh' ? '投资建议' : 'Investment Recommendation'}
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
                <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <span className="font-medium">{currentLanguage === 'zh' ? '月抵押贷款' : 'Monthly Mortgage'}</span>
                  <span className="font-bold text-red-600">{formatCurrency(results.monthlyMortgage)}</span>
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
          </TabsContent>

          <TabsContent value="risk">
            <div className="mt-6 space-y-6">
              {/* Monte Carlo Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    {currentLanguage === 'zh' ? '蒙特卡洛风险分析' : 'Monte Carlo Risk Analysis'}
                  </CardTitle>
                  <CardDescription>
                    {currentLanguage === 'zh' ? '基于1000次模拟的ROI分布分析' : 'ROI distribution analysis based on 1,000 simulations'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatPercent(monteCarloResults.mean_roi)}
                      </div>
                      <div className="text-sm text-blue-600">{currentLanguage === 'zh' ? '平均ROI' : 'Average ROI'}</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {formatPercent(monteCarloResults.confidence_interval.upper)}
                      </div>
                      <div className="text-sm text-green-600">{currentLanguage === 'zh' ? '95%上限' : '95% Upper'}</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {formatPercent(monteCarloResults.confidence_interval.lower)}
                      </div>
                      <div className="text-sm text-red-600">{currentLanguage === 'zh' ? '5%下限' : '5% Lower'}</div>
                    </div>
                  </div>
                  
                  {monteCarloResults.roi_distribution.length > 0 && (
                    <div className="h-64">
                      <Plot
                        data={[{
                          x: monteCarloResults.roi_distribution,
                          type: 'histogram',
                          marker: { color: 'rgba(99, 102, 241, 0.7)' },
                          name: 'ROI Distribution'
                        }]}
                        layout={{
                          title: currentLanguage === 'zh' ? 'ROI分布直方图' : 'ROI Distribution Histogram',
                          xaxis: { title: currentLanguage === 'zh' ? 'ROI (%)' : 'ROI (%)' },
                          yaxis: { title: currentLanguage === 'zh' ? '频次' : 'Frequency' },
                          margin: { t: 40, r: 20, b: 40, l: 60 },
                          paper_bgcolor: 'rgba(0,0,0,0)',
                          plot_bgcolor: 'rgba(0,0,0,0)'
                        }}
                        style={{ width: '100%', height: '100%' }}
                        config={{ displayModeBar: false }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="mt-6 space-y-6">
              {/* Advanced Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    {currentLanguage === 'zh' ? '高级投资指标' : 'Advanced Investment Metrics'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                    <span className="font-medium">{currentLanguage === 'zh' ? '保本首付比例' : 'Break-Even Down Payment'}</span>
                    <span className="font-bold">{formatCurrency(results.breakEvenDownPayment)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                    <span className="font-medium">{currentLanguage === 'zh' ? '目标ROI最大购买价' : 'Max Purchase Price (8% ROI)'}</span>
                    <span className="font-bold">{formatCurrency(results.maxPurchasePrice)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                    <span className="font-medium">{currentLanguage === 'zh' ? '贷款金额' : 'Loan Amount'}</span>
                    <span className="font-bold">
                      {formatCurrency(parseFloat(inputs.purchasePrice) * (1 - parseFloat(inputs.downPaymentPercent) / 100))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                    <span className="font-medium">{currentLanguage === 'zh' ? '贷款价值比' : 'Loan-to-Value Ratio'}</span>
                    <span className="font-bold">{formatPercent(100 - parseFloat(inputs.downPaymentPercent))}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Comparable Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>{currentLanguage === 'zh' ? '区域可比分析' : 'Regional Comparable Analysis'}</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="text-sm text-muted-foreground mb-4">
                     {currentLanguage === 'zh' ? 
                       `基于${regions.find(r => r.id === selectedRegion)?.name}地区2025年8月市场数据` :
                       `Based on ${regions.find(r => r.id === selectedRegion)?.name} August 2025 market data`
                     }
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-3">
                       <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                         <span className="font-medium">{currentLanguage === 'zh' ? '您的投资价格' : 'Your Investment Price'}</span>
                         <span className="font-bold">{formatCurrency(parseFloat(inputs.purchasePrice))}</span>
                       </div>
                       <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                         <span className="font-medium">{currentLanguage === 'zh' ? '您的租金收益率' : 'Your Rental Yield'}</span>
                         <span className="font-bold">{formatPercent((parseFloat(inputs.monthlyRent) * 12 / parseFloat(inputs.purchasePrice)) * 100)}</span>
                       </div>
                       <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                         <span className="font-medium">{currentLanguage === 'zh' ? '您的现金回报率' : 'Your Cash-on-Cash ROI'}</span>
                         <span className="font-bold">{formatPercent(results.cashOnCashReturn)}</span>
                       </div>
                     </div>
                     <div className="space-y-3">
                       <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                         <span className="font-medium">{currentLanguage === 'zh' ? '地区中位价格' : 'Regional Median Price'}</span>
                         <span className="font-bold">{formatCurrency(regions.find(r => r.id === selectedRegion)?.medianPrice || 0)}</span>
                       </div>
                       <div className="flex justify-between items-center p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                         <span className="font-medium">{currentLanguage === 'zh' ? '地区中位ROI' : 'Regional Median ROI'}</span>
                         <span className="font-bold">{formatPercent(regions.find(r => r.id === selectedRegion)?.medianROI || 0)}</span>
                       </div>
                       <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                         <span className="font-medium">{currentLanguage === 'zh' ? '年增值率' : 'Annual Appreciation'}</span>
                         <span className="font-bold">{formatPercent(parseFloat(inputs.appreciationRate))}</span>
                       </div>
                     </div>
                   </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

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