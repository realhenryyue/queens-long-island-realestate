import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, DollarSign, TrendingUp, Home, Percent, Download, MapPin, BarChart3, AlertTriangle, Star, Phone } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { useLanguage } from '@/contexts/LanguageContext';
import { EnhancedCapRateDisplay } from '@/components/EnhancedCapRateDisplay';

const ROICalculator = React.memo(() => {
  const { t, currentLanguage } = useLanguage();
  
  // State management with proper initialization
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
    mean_roi: 0,
    volatility: 0
  });

  // Memoized calculation functions for performance
  const formatCurrency = useCallback((value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }, []);

  const formatPercentage = useCallback((value: number): string => {
    return `${value.toFixed(2)}%`;
  }, []);

  const calculateAdvancedROI = useCallback(() => {
    try {
      const purchasePrice = parseFloat(inputs.purchasePrice) || 0;
      const monthlyRent = parseFloat(inputs.monthlyRent) || 0;
      const monthlyExpenses = parseFloat(inputs.monthlyExpenses) || 0;
      const closingCosts = parseFloat(inputs.closingCosts) || 0;
      const renovationCosts = parseFloat(inputs.renovationCosts) || 0;
      const appreciationRate = parseFloat(inputs.appreciationRate) || 0;
      const loanInterestRate = parseFloat(inputs.loanInterestRate) || 0;
      const downPaymentPercent = parseFloat(inputs.downPaymentPercent) || 0;
      const vacancyRate = parseFloat(inputs.vacancyRate) || 0;

      // Input validation
      if (purchasePrice <= 0 || monthlyRent <= 0) {
        return;
      }

      const downPayment = (purchasePrice * downPaymentPercent) / 100;
      const loanAmount = purchasePrice - downPayment;
      const monthlyInterestRate = loanInterestRate / 100 / 12;
      const numberOfPayments = 30 * 12; // 30 year mortgage

      // Monthly mortgage calculation
      const monthlyMortgage = monthlyInterestRate > 0 
        ? (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) / 
          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
        : loanAmount / numberOfPayments;

      const effectiveMonthlyRent = monthlyRent * (1 - vacancyRate / 100);
      const monthlyProfit = effectiveMonthlyRent - monthlyExpenses - monthlyMortgage;
      const annualCashFlow = monthlyProfit * 12;
      const cashInvested = downPayment + closingCosts + renovationCosts;
      const cashOnCashReturn = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;
      const capRate = purchasePrice > 0 ? ((monthlyRent * 12 - monthlyExpenses * 12) / purchasePrice) * 100 : 0;
      const annualAppreciation = purchasePrice * (appreciationRate / 100);
      const totalROI = cashInvested > 0 ? ((annualCashFlow + annualAppreciation) / cashInvested) * 100 : 0;

      // Investment rating calculation
      let rating = 1;
      let signal = 'AVOID';
      
      if (cashOnCashReturn >= 15 && capRate >= 8) {
        rating = 5;
        signal = 'STRONG BUY';
      } else if (cashOnCashReturn >= 10 && capRate >= 6) {
        rating = 4;
        signal = 'BUY';
      } else if (cashOnCashReturn >= 6 && capRate >= 4) {
        rating = 3;
        signal = 'HOLD';
      } else if (cashOnCashReturn >= 3 && capRate >= 2) {
        rating = 2;
        signal = 'WEAK HOLD';
      }

      // Break-even analysis
      const breakEvenDownPayment = cashInvested > 0 ? 
        (monthlyExpenses + monthlyMortgage) * 12 / (monthlyRent * 12 / cashInvested) : 0;
      const maxPurchasePrice = effectiveMonthlyRent > 0 ? 
        (effectiveMonthlyRent * 12) / (capRate / 100) : 0;

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
      runMonteCarloSimulation();
    } catch (error) {
      console.error('ROI calculation error:', error);
    }
  }, [inputs]);

  const runMonteCarloSimulation = useCallback(() => {
    try {
      const simulations = 1000;
      const results = [];

      for (let i = 0; i < simulations; i++) {
        // Add randomness to key variables
        const randPurchasePrice = parseFloat(inputs.purchasePrice) * (0.9 + Math.random() * 0.2);
        const randMonthlyRent = parseFloat(inputs.monthlyRent) * (0.85 + Math.random() * 0.3);
        const randAppreciationRate = parseFloat(inputs.appreciationRate) * (0.5 + Math.random() * 1.5);
        
        const downPayment = (randPurchasePrice * parseFloat(inputs.downPaymentPercent)) / 100;
        const cashInvested = downPayment + parseFloat(inputs.closingCosts) + parseFloat(inputs.renovationCosts);
        const annualCashFlow = (randMonthlyRent - parseFloat(inputs.monthlyExpenses)) * 12;
        const annualAppreciation = randPurchasePrice * (randAppreciationRate / 100);
        const totalROI = cashInvested > 0 ? ((annualCashFlow + annualAppreciation) / cashInvested) * 100 : 0;
        
        results.push(totalROI);
      }

      results.sort((a, b) => a - b);
      const mean = results.reduce((a, b) => a + b, 0) / results.length;
      const variance = results.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / results.length;
      const volatility = Math.sqrt(variance);

      setMonteCarloResults({
        roi_distribution: results,
        confidence_interval: {
          lower: results[Math.floor(simulations * 0.05)],
          upper: results[Math.floor(simulations * 0.95)]
        },
        mean_roi: mean,
        volatility: volatility
      });
    } catch (error) {
      console.error('Monte Carlo simulation error:', error);
    }
  }, [inputs]);

  // Effect hooks with proper dependencies
  useEffect(() => {
    calculateAdvancedROI();
  }, [calculateAdvancedROI]);

  const handleInputChange = useCallback((field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  }, []);

  const analyzeAddress = useCallback(async () => {
    if (!addressInput.trim()) return;

    setAnalysisStage('analyzing');
    
    try {
      // Simulate API delay
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
    } catch (error) {
      console.error('Address analysis error:', error);
      setAnalysisStage('input');
    }
  }, [addressInput]);

  const detectRegionFromAddress = useCallback((address: string): string => {
    const lowerAddress = address.toLowerCase();
    if (lowerAddress.includes('manhattan') || lowerAddress.includes('nyc') || lowerAddress.includes('new york, ny')) return 'manhattan';
    if (lowerAddress.includes('brooklyn') || lowerAddress.includes('bk')) return 'brooklyn';
    if (lowerAddress.includes('bronx')) return 'bronx';
    if (lowerAddress.includes('staten island') || lowerAddress.includes('si')) return 'staten';
    if (lowerAddress.includes('nassau') || lowerAddress.includes('long island') || lowerAddress.includes('li')) return 'nassau';
    if (lowerAddress.includes('queens') || lowerAddress.includes('flushing') || lowerAddress.includes('astoria') || lowerAddress.includes('elmhurst')) return 'queens';
    return 'queens'; // Default to Queens
  }, []);

  const getRegionMockData = useCallback((region: string) => {
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
        monthlyExpenses: '1450',
        closingCosts: '25000',
        renovationCosts: '45000',
        appreciationRate: '5.2'
      },
      brooklyn: {
        purchasePrice: '920000',
        monthlyRent: '3900',
        monthlyExpenses: '1100',
        closingCosts: '18400',
        renovationCosts: '32000',
        appreciationRate: '4.6'
      },
      bronx: {
        purchasePrice: '580000',
        monthlyRent: '2800',
        monthlyExpenses: '750',
        closingCosts: '11600',
        renovationCosts: '22000',
        appreciationRate: '4.2'
      },
      staten: {
        purchasePrice: '650000',
        monthlyRent: '2950',
        monthlyExpenses: '820',
        closingCosts: '13000',
        renovationCosts: '24000',
        appreciationRate: '3.8'
      },
      nassau: {
        purchasePrice: '890000',
        monthlyRent: '3650',
        monthlyExpenses: '980',
        closingCosts: '17800',
        renovationCosts: '29000',
        appreciationRate: '4.4'
      }
    };
    return regionData[region as keyof typeof regionData] || regionData.queens;
  }, []);

  const exportToPDF = useCallback(async () => {
    try {
      const createPDFContent = () => {
        const date = new Date().toLocaleDateString(currentLanguage === 'zh' ? 'zh-CN' : 'en-US');
        return `
          <div style="font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #2563eb; padding-bottom: 20px;">
              <h1 style="color: #1e40af; margin: 0; font-size: 28px;">
                ${currentLanguage === 'zh' ? 'NYC房地产投资分析报告' : 'NYC Real Estate Investment Analysis Report'}
              </h1>
              <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">
                ${currentLanguage === 'zh' ? '由Henry岳先生专业分析' : 'Professional Analysis by Henry Yue'} | ${date}
              </p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
              <div>
                <h2 style="color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                  ${currentLanguage === 'zh' ? '投资参数' : 'Investment Parameters'}
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>${currentLanguage === 'zh' ? '购买价格' : 'Purchase Price'}:</strong></td><td style="text-align: right;">${formatCurrency(parseFloat(inputs.purchasePrice))}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>${currentLanguage === 'zh' ? '月租金' : 'Monthly Rent'}:</strong></td><td style="text-align: right;">${formatCurrency(parseFloat(inputs.monthlyRent))}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>${currentLanguage === 'zh' ? '月支出' : 'Monthly Expenses'}:</strong></td><td style="text-align: right;">${formatCurrency(parseFloat(inputs.monthlyExpenses))}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>${currentLanguage === 'zh' ? '首付比例' : 'Down Payment'}:</strong></td><td style="text-align: right;">${inputs.downPaymentPercent}%</td></tr>
                  <tr><td style="padding: 8px 0;"><strong>${currentLanguage === 'zh' ? '升值率' : 'Appreciation Rate'}:</strong></td><td style="text-align: right;">${inputs.appreciationRate}%</td></tr>
                </table>
              </div>

              <div>
                <h2 style="color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                  ${currentLanguage === 'zh' ? '投资回报分析' : 'ROI Analysis'}
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>${currentLanguage === 'zh' ? '现金回报率' : 'Cash-on-Cash Return'}:</strong></td><td style="text-align: right; color: ${results.cashOnCashReturn >= 8 ? '#059669' : results.cashOnCashReturn >= 5 ? '#d97706' : '#dc2626'};">${formatPercentage(results.cashOnCashReturn)}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>${currentLanguage === 'zh' ? '资本化率' : 'Cap Rate'}:</strong></td><td style="text-align: right; color: ${results.capRate >= 6 ? '#059669' : results.capRate >= 4 ? '#d97706' : '#dc2626'};">${formatPercentage(results.capRate)}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>${currentLanguage === 'zh' ? '总投资回报率' : 'Total ROI'}:</strong></td><td style="text-align: right;">${formatPercentage(results.totalROI)}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><strong>${currentLanguage === 'zh' ? '月现金流' : 'Monthly Cash Flow'}:</strong></td><td style="text-align: right; color: ${results.monthlyProfit >= 0 ? '#059669' : '#dc2626'};">${formatCurrency(results.monthlyProfit)}</td></tr>
                  <tr><td style="padding: 8px 0;"><strong>${currentLanguage === 'zh' ? '投资评级' : 'Investment Rating'}:</strong></td><td style="text-align: right;"><span style="background: ${results.investmentRating >= 4 ? '#10b981' : results.investmentRating >= 3 ? '#f59e0b' : '#ef4444'}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${results.investmentSignal}</span></td></tr>
                </table>
              </div>
            </div>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #1e40af; margin-top: 0;">
                ${currentLanguage === 'zh' ? '风险分析 (蒙特卡洛模拟)' : 'Risk Analysis (Monte Carlo Simulation)'}
              </h3>
              <p><strong>${currentLanguage === 'zh' ? '预期ROI范围' : 'Expected ROI Range'}:</strong> ${formatPercentage(monteCarloResults.confidence_interval.lower)} - ${formatPercentage(monteCarloResults.confidence_interval.upper)} (90% ${currentLanguage === 'zh' ? '置信区间' : 'Confidence Interval'})</p>
              <p><strong>${currentLanguage === 'zh' ? '平均ROI' : 'Mean ROI'}:</strong> ${formatPercentage(monteCarloResults.mean_roi)}</p>
              <p><strong>${currentLanguage === 'zh' ? '波动率' : 'Volatility'}:</strong> ${formatPercentage(monteCarloResults.volatility)}</p>
            </div>

            <div style="border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; background: white;">
              <h3 style="color: #1e40af; margin-top: 0;">
                ${currentLanguage === 'zh' ? '专业建议' : 'Professional Recommendation'}
              </h3>
              <p style="margin-bottom: 15px;"><strong>${currentLanguage === 'zh' ? '投资信号' : 'Investment Signal'}:</strong> <span style="color: ${results.investmentRating >= 4 ? '#059669' : results.investmentRating >= 3 ? '#d97706' : '#dc2626'}; font-weight: bold;">${results.investmentSignal}</span></p>
              
              <div style="margin-bottom: 15px;">
                <strong>${currentLanguage === 'zh' ? '关键指标分析' : 'Key Metrics Analysis'}:</strong>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li style="margin-bottom: 5px;">${currentLanguage === 'zh' ? '现金回报率' : 'Cash-on-Cash Return'}: ${results.cashOnCashReturn >= 8 ? (currentLanguage === 'zh' ? '优秀 (≥8%)' : 'Excellent (≥8%)') : results.cashOnCashReturn >= 5 ? (currentLanguage === 'zh' ? '良好 (5-8%)' : 'Good (5-8%)') : (currentLanguage === 'zh' ? '需要改善 (<5%)' : 'Needs Improvement (<5%)')}</li>
                  <li style="margin-bottom: 5px;">${currentLanguage === 'zh' ? '资本化率' : 'Cap Rate'}: ${results.capRate >= 6 ? (currentLanguage === 'zh' ? '优秀 (≥6%)' : 'Excellent (≥6%)') : results.capRate >= 4 ? (currentLanguage === 'zh' ? '良好 (4-6%)' : 'Good (4-6%)') : (currentLanguage === 'zh' ? '需要改善 (<4%)' : 'Needs Improvement (<4%)')}</li>
                  <li>${currentLanguage === 'zh' ? '现金流状况' : 'Cash Flow Status'}: ${results.monthlyProfit >= 500 ? (currentLanguage === 'zh' ? '正现金流，投资优质' : 'Positive cash flow, quality investment') : results.monthlyProfit >= 0 ? (currentLanguage === 'zh' ? '现金流平衡' : 'Break-even cash flow') : (currentLanguage === 'zh' ? '负现金流，需谨慎考虑' : 'Negative cash flow, consider carefully')}</li>
                </ul>
              </div>
              
              <p style="margin-bottom: 0; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 15px;">
                <em>${currentLanguage === 'zh' ? '免责声明：此分析仅供参考，投资决策请咨询专业人士。' : 'Disclaimer: This analysis is for informational purposes only. Please consult professionals for investment decisions.'}</em>
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                ${currentLanguage === 'zh' ? '联系 Henry岳先生' : 'Contact Henry Yue'} | 📞 (718) 717-5210 | 📧 forangh@gmail.com | 🌐 realhenryyue.com
              </p>
            </div>
          </div>
        `;
      };

      // Create temporary container
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = createPDFContent();
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '210mm';
      tempContainer.style.background = '#ffffff';
      document.body.appendChild(tempContainer);

      // Configure html2pdf with proper settings
      const options = {
        margin: [10, 10, 10, 10],
        filename: `${currentLanguage === 'zh' ? 'NYC房地产投资分析报告' : 'NYC_Real_Estate_Investment_Analysis'}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          backgroundColor: '#FFFFFF',
          logging: false,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        }
      };

      // Generate and download PDF
      await html2pdf().from(tempContainer).set(options).save();

      // Clean up
      document.body.removeChild(tempContainer);

    } catch (error) {
      console.error('PDF export error:', error);
      alert(currentLanguage === 'zh' ? 'PDF 导出失败，请重试' : 'PDF export failed, please try again');
    }
  }, [inputs, results, monteCarloResults, currentLanguage, formatCurrency, formatPercentage]);

  // Memoized preset scenarios
  const presetScenarios = useMemo(() => [
    {
      name: currentLanguage === 'zh' ? '法拉盛公寓投资' : 'Flushing Condo Investment',
      values: { purchasePrice: '720000', monthlyRent: '2850', monthlyExpenses: '680', closingCosts: '14400', renovationCosts: '18000', appreciationRate: '5.8', loanInterestRate: '6.63', downPaymentPercent: '30', vacancyRate: '4.5' },
      region: 'queens',
      roiEstimate: 8.4,
      priority: 1
    },
    {
      name: currentLanguage === 'zh' ? '皇后区家庭住宅' : 'Queens Family Home',
      values: { purchasePrice: '920000', monthlyRent: '3750', monthlyExpenses: '1050', closingCosts: '18400', renovationCosts: '28000', appreciationRate: '4.9', loanInterestRate: '6.63', downPaymentPercent: '30', vacancyRate: '4.0' },
      region: 'queens',
      roiEstimate: 7.8,
      priority: 2
    },
    {
      name: currentLanguage === 'zh' ? '曼哈顿豪华公寓' : 'Manhattan Luxury Condo',
      values: { purchasePrice: '1350000', monthlyRent: '5200', monthlyExpenses: '1600', closingCosts: '27000', renovationCosts: '45000', appreciationRate: '5.5', loanInterestRate: '6.63', downPaymentPercent: '35', vacancyRate: '6.0' },
      region: 'manhattan',
      roiEstimate: 6.2,
      priority: 3
    }
  ], [currentLanguage]);

  // Memoized regions data
  const regions = useMemo(() => [
    { id: 'queens', name: currentLanguage === 'zh' ? '皇后区' : 'Queens', avgPrice: '$785K', avgRent: '$3.4K' },
    { id: 'manhattan', name: currentLanguage === 'zh' ? '曼哈顿' : 'Manhattan', avgPrice: '$1.25M', avgRent: '$4.8K' },
    { id: 'brooklyn', name: currentLanguage === 'zh' ? '布鲁克林' : 'Brooklyn', avgPrice: '$920K', avgRent: '$3.9K' },
    { id: 'bronx', name: currentLanguage === 'zh' ? '布朗克斯' : 'Bronx', avgPrice: '$580K', avgRent: '$2.8K' },
    { id: 'staten', name: currentLanguage === 'zh' ? '史泰登岛' : 'Staten Island', avgPrice: '$650K', avgRent: '$2.95K' },
    { id: 'nassau', name: currentLanguage === 'zh' ? '拿骚县' : 'Nassau County', avgPrice: '$890K', avgRent: '$3.65K' }
  ], [currentLanguage]);

  const loadScenario = useCallback((scenario: any) => {
    setInputs(scenario.values);
    setSelectedRegion(scenario.region);
  }, []);

  return (
    <section id="roi-calculator" className="py-16 px-4 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            {currentLanguage === 'zh' ? 'NYC 房地产投资 ROI 计算器' : 'NYC Real Estate Investment ROI Calculator'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentLanguage === 'zh' 
              ? '使用我们的专业级投资分析工具，获取基于蒙特卡洛模拟的精确ROI计算，为您的纽约房产投资决策提供数据支持'
              : 'Use our professional-grade investment analysis tool with Monte Carlo simulation for accurate ROI calculations to support your NYC real estate investment decisions'
            }
          </p>
          
          <div className="mt-8 mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {currentLanguage === 'zh' ? '选择投资区域' : 'Select Investment Region'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {regions.map((region) => (
                <Button
                  key={region.id}
                  variant={selectedRegion === region.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRegion(region.id)}
                  className="h-auto p-3 text-center"
                >
                  <div className="text-center">
                    <div className="font-medium text-xs leading-tight">{region.name}</div>
                    <div className={`text-xs font-semibold mt-1 ${
                      selectedRegion === region.id ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`}>
                      {region.avgPrice}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">
              {currentLanguage === 'zh' ? '快速开始投资分析' : 'Quick Start Investment Analysis'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {presetScenarios.map((scenario, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors cursor-pointer relative overflow-hidden group">
                  <div className="absolute top-2 right-2">
                    <Badge variant={scenario.priority === 1 ? "default" : scenario.priority === 2 ? "secondary" : "outline"} className="text-xs">
                      {scenario.priority === 1 ? (currentLanguage === 'zh' ? '推荐' : 'Recommended') : 
                       scenario.priority === 2 ? (currentLanguage === 'zh' ? '热门' : 'Popular') : 
                       (currentLanguage === 'zh' ? '精选' : 'Featured')}
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">{scenario.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {currentLanguage === 'zh' ? '预期ROI' : 'Expected ROI'}
                        </span>
                        <span className="text-sm font-bold text-green-600">
                          {scenario.roiEstimate}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {currentLanguage === 'zh' ? '房价' : 'Price'}
                        </span>
                        <span className="text-xs font-medium">
                          {formatCurrency(parseFloat(scenario.values.purchasePrice))}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => loadScenario(scenario)}
                    >
                      {currentLanguage === 'zh' ? '加载场景' : 'Load Scenario'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div id="roi-calculator-content" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6 shadow-lg border-primary/20">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calculator className="h-5 w-5" />
                {currentLanguage === 'zh' ? '投资参数输入' : 'Investment Parameters'}
              </CardTitle>
              <CardDescription>
                {currentLanguage === 'zh' ? '输入房产详情进行专业ROI分析' : 'Enter property details for professional ROI analysis'}
              </CardDescription>
            </CardHeader>

            <div className="space-y-6">
              {/* Basic Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchasePrice" className="text-sm font-medium">
                    {currentLanguage === 'zh' ? '购买价格 ($)' : 'Purchase Price ($)'}
                  </Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={inputs.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                    className="text-right"
                    placeholder="750000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyRent" className="text-sm font-medium">
                    {currentLanguage === 'zh' ? '月租金 ($)' : 'Monthly Rent ($)'}
                  </Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={inputs.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                    className="text-right"
                    placeholder="3200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyExpenses" className="text-sm font-medium">
                    {currentLanguage === 'zh' ? '月支出 ($)' : 'Monthly Expenses ($)'}
                  </Label>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    value={inputs.monthlyExpenses}
                    onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                    className="text-right"
                    placeholder="800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="downPaymentPercent" className="text-sm font-medium">
                    {currentLanguage === 'zh' ? '首付比例 (%)' : 'Down Payment (%)'}
                  </Label>
                  <Input
                    id="downPaymentPercent"
                    type="number"
                    value={inputs.downPaymentPercent}
                    onChange={(e) => handleInputChange('downPaymentPercent', e.target.value)}
                    className="text-right"
                    placeholder="30"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              {/* Advanced Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="closingCosts" className="text-sm font-medium">
                    {currentLanguage === 'zh' ? '交易费用 ($)' : 'Closing Costs ($)'}
                  </Label>
                  <Input
                    id="closingCosts"
                    type="number"
                    value={inputs.closingCosts}
                    onChange={(e) => handleInputChange('closingCosts', e.target.value)}
                    className="text-right"
                    placeholder="15000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="renovationCosts" className="text-sm font-medium">
                    {currentLanguage === 'zh' ? '装修费用 ($)' : 'Renovation Costs ($)'}
                  </Label>
                  <Input
                    id="renovationCosts"
                    type="number"
                    value={inputs.renovationCosts}
                    onChange={(e) => handleInputChange('renovationCosts', e.target.value)}
                    className="text-right"
                    placeholder="25000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appreciationRate" className="text-sm font-medium">
                    {currentLanguage === 'zh' ? '年升值率 (%)' : 'Appreciation Rate (%)'}
                  </Label>
                  <Input
                    id="appreciationRate"
                    type="number"
                    step="0.1"
                    value={inputs.appreciationRate}
                    onChange={(e) => handleInputChange('appreciationRate', e.target.value)}
                    className="text-right"
                    placeholder="4.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanInterestRate" className="text-sm font-medium">
                    {currentLanguage === 'zh' ? '贷款利率 (%)' : 'Loan Interest Rate (%)'}
                  </Label>
                  <Input
                    id="loanInterestRate"
                    type="number"
                    step="0.01"
                    value={inputs.loanInterestRate}
                    onChange={(e) => handleInputChange('loanInterestRate', e.target.value)}
                    className="text-right"
                    placeholder="6.63"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vacancyRate" className="text-sm font-medium">
                  {currentLanguage === 'zh' ? '空置率 (%)' : 'Vacancy Rate (%)'}
                </Label>
                <Input
                  id="vacancyRate"
                  type="number"
                  step="0.1"
                  value={inputs.vacancyRate}
                  onChange={(e) => handleInputChange('vacancyRate', e.target.value)}
                  className="text-right"
                  placeholder="5"
                />
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <Card className="p-6 shadow-lg border-accent/20">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-5 w-5" />
                {currentLanguage === 'zh' ? '投资回报分析' : 'Investment Returns Analysis'}
              </CardTitle>
              <CardDescription>
                {currentLanguage === 'zh' ? '基于蒙特卡洛模拟的专业投资分析结果' : 'Professional investment analysis based on Monte Carlo simulation'}
              </CardDescription>
            </CardHeader>

            {/* Investment Rating */}
            <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= results.investmentRating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">
                {results.investmentSignal}
              </h3>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'zh' ? '投资建议评级' : 'Investment Recommendation Rating'}
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="text-center p-6 bg-background rounded-lg border shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">
                  {formatPercentage(results.cashOnCashReturn)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentLanguage === 'zh' ? '现金回报率' : 'Cash-on-Cash Return'}
                </div>
              </div>
              <div className="text-center p-6 bg-background rounded-lg border shadow-sm">
                <EnhancedCapRateDisplay 
                  capRate={results.capRate}
                  size="large"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={exportToPDF}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Download className="w-4 h-4 mr-2" />
                {currentLanguage === 'zh' ? '导出详细报告' : 'Export Detailed Report'}
              </Button>
            </div>

            {/* Detailed Metrics */}
            <div className="space-y-4 mt-8 p-6 bg-muted/30 rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{currentLanguage === 'zh' ? '总投资回报率' : 'Total ROI'}:</span>
                <span className="font-medium">{formatPercentage(results.totalROI)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{currentLanguage === 'zh' ? '月现金流' : 'Monthly Cash Flow'}:</span>
                <span className={`font-medium ${results.monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(results.monthlyProfit)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{currentLanguage === 'zh' ? '年升值收益' : 'Annual Appreciation'}:</span>
                <span className="font-medium">{formatCurrency(results.annualAppreciation)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{currentLanguage === 'zh' ? '月供' : 'Monthly Mortgage'}:</span>
                <span className="font-medium">{formatCurrency(results.monthlyMortgage)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{currentLanguage === 'zh' ? '总投入资金' : 'Total Cash Invested'}:</span>
                <span className="font-medium">{formatCurrency(results.cashInvested)}</span>
              </div>

              {/* Monte Carlo Results */}
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">
                  {currentLanguage === 'zh' ? '风险分析 (1000次模拟)' : 'Risk Analysis (1000 Simulations)'}
                </h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{currentLanguage === 'zh' ? '预期ROI范围' : 'Expected ROI Range'}:</span>
                    <span>{formatPercentage(monteCarloResults.confidence_interval.lower)} - {formatPercentage(monteCarloResults.confidence_interval.upper)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{currentLanguage === 'zh' ? '平均ROI' : 'Mean ROI'}:</span>
                    <span>{formatPercentage(monteCarloResults.mean_roi)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{currentLanguage === 'zh' ? '波动率' : 'Volatility'}:</span>
                    <span>{formatPercentage(monteCarloResults.volatility)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Address Analysis Section */}
        <div className="mt-12 space-y-6">
          <Card className="p-6">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {currentLanguage === 'zh' ? 'AI 地址智能分析' : 'AI Address Intelligence Analysis'}
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="address" className="text-sm font-medium mb-2 block">
                    {currentLanguage === 'zh' ? '输入房产地址进行智能分析' : 'Enter property address for intelligent analysis'}
                  </Label>
                  <Input
                    id="address"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    placeholder={currentLanguage === 'zh' 
                      ? '例如: 123 Main St, Flushing, NY 11354' 
                      : 'e.g., 123 Main St, Flushing, NY 11354'
                    }
                    className="text-sm"
                    disabled={analysisStage === 'analyzing'}
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <Button 
                    onClick={analyzeAddress}
                    disabled={!addressInput.trim() || analysisStage === 'analyzing'}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {analysisStage === 'analyzing' ? (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {currentLanguage === 'zh' ? '分析中...' : 'Analyzing...'}
                        </div>
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        {currentLanguage === 'zh' ? '智能分析' : 'Analyze'}
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {analysisStage === 'complete' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center gap-2 text-green-800">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="font-medium">
                      {currentLanguage === 'zh' 
                        ? '地址分析完成！投资参数已根据区域数据自动更新。' 
                        : 'Address analysis complete! Investment parameters updated based on regional data.'
                      }
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="flex justify-center">
            <Button variant="outline" size="lg" asChild>
              <a href="#contact" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {currentLanguage === 'zh' ? '咨询专业投资建议' : 'Get Professional Investment Advice'}
              </a>
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-muted-foreground">
                {currentLanguage === 'zh' 
                  ? '免责声明：此工具仅供参考，不构成投资建议。请独立验证并咨询专业人士。'
                  : 'Disclaimer: This tool is for informational purposes only and does not constitute investment advice. Please verify independently and consult professionals.'
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ROICalculator.displayName = 'ROICalculator';

export default ROICalculator;