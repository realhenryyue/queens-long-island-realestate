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
        '为获得最准确的投资分析，请联系专业房地产投资分析师 岳泓宇 (Henry Yue)。\n\n电话: 718-717-5210\n邮箱: forangh@gmail.com\n\n点击"确定"继续基础分析，或"取消"先联系专家。' :
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
    try {
      // Create comprehensive PDF content based on language
      const createPDFContent = () => {
        return `
          <div style="font-family: ${currentLanguage === 'zh' ? 
            'PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimHei, sans-serif' : 
            'Arial, Helvetica, sans-serif'}; 
            padding: 40px; background: white; color: #000; line-height: 1.6; font-size: 14px;">
            
            <!-- Header Section -->
            <div style="border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px;">
              <h1 style="color: #2563eb; font-size: 28px; margin: 0 0 8px 0; font-weight: bold;">
                realhenryyue.com
              </h1>
              <h2 style="font-size: 22px; margin: 0 0 8px 0; font-weight: 600; color: #1f2937;">
                ${currentLanguage === 'zh' ? 'NYC房地产投资AI分析报告' : 'NYC Real Estate AI Investment Analysis Report'}
              </h2>
              <p style="color: #6b7280; font-size: 14px; margin: 0; font-weight: 500;">
                Henry Yue | 718-717-5210 | forangh@gmail.com
              </p>
            </div>
            
            <!-- Investment Summary Section -->
            <div style="margin-bottom: 35px;">
              <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 15px 0; border-left: 5px solid #2563eb; padding-left: 12px; font-weight: 700;">
                ${currentLanguage === 'zh' ? '投资总结' : 'Investment Summary'}
              </h3>
              <div style="background: #f8fafc; padding: 25px; border-radius: 10px; border: 1px solid #e2e8f0;">
                <div style="margin-bottom: 12px;">
                  <span style="font-weight: 700; color: #374151;">${currentLanguage === 'zh' ? '投资评级' : 'Investment Rating'}:</span>
                  <span style="font-size: 16px; color: #dc2626; font-weight: 600;"> ${results.investmentRating}/5 ${Array(results.investmentRating).fill('★').join('')}</span>
                </div>
                <div style="margin-bottom: 12px;">
                  <span style="font-weight: 700; color: #374151;">${currentLanguage === 'zh' ? '投资信号' : 'Investment Signal'}:</span>
                  <span style="font-size: 16px; color: ${results.investmentSignal === 'BUY' ? '#059669' : results.investmentSignal === 'WAIT' ? '#d97706' : '#dc2626'}; font-weight: 700;"> ${results.investmentSignal}</span>
                </div>
                <div style="margin-bottom: 12px;">
                  <span style="font-weight: 700; color: #374151;">${currentLanguage === 'zh' ? '现金回报率' : 'Cash-on-Cash ROI'}:</span>
                  <span style="font-size: 16px; color: #059669; font-weight: 600;"> ${formatPercent(results.cashOnCashReturn)}</span>
                </div>
                <div style="margin-bottom: 0;">
                  <span style="font-weight: 700; color: #374151;">${currentLanguage === 'zh' ? '资本化率' : 'Cap Rate'}:</span>
                  <span style="font-size: 16px; color: #059669; font-weight: 600;"> ${formatPercent(results.capRate)}</span>
                </div>
              </div>
            </div>

            <!-- Key Metrics Section -->
            <div style="margin-bottom: 35px;">
              <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 15px 0; border-left: 5px solid #2563eb; padding-left: 12px; font-weight: 700;">
                ${currentLanguage === 'zh' ? '关键财务指标' : 'Key Financial Metrics'}
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="background: #fefefe; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
                  <div style="margin-bottom: 15px;">
                    <div style="font-weight: 700; color: #374151; margin-bottom: 5px;">${currentLanguage === 'zh' ? '购买价格' : 'Purchase Price'}</div>
                    <div style="font-size: 18px; color: #059669; font-weight: 600;">${formatCurrency(parseFloat(inputs.purchasePrice))}</div>
                  </div>
                  <div style="margin-bottom: 15px;">
                    <div style="font-weight: 700; color: #374151; margin-bottom: 5px;">${currentLanguage === 'zh' ? '现金投入' : 'Cash Invested'}</div>
                    <div style="font-size: 18px; color: #059669; font-weight: 600;">${formatCurrency(results.cashInvested)}</div>
                  </div>
                  <div style="margin-bottom: 0;">
                    <div style="font-weight: 700; color: #374151; margin-bottom: 5px;">${currentLanguage === 'zh' ? '月租金' : 'Monthly Rent'}</div>
                    <div style="font-size: 18px; color: #059669; font-weight: 600;">${formatCurrency(parseFloat(inputs.monthlyRent))}</div>
                  </div>
                </div>
                <div style="background: #fefefe; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
                  <div style="margin-bottom: 15px;">
                    <div style="font-weight: 700; color: #374151; margin-bottom: 5px;">${currentLanguage === 'zh' ? '年现金流' : 'Annual Cash Flow'}</div>
                    <div style="font-size: 18px; color: ${results.annualCashFlow >= 0 ? '#059669' : '#dc2626'}; font-weight: 600;">${formatCurrency(results.annualCashFlow)}</div>
                  </div>
                  <div style="margin-bottom: 15px;">
                    <div style="font-weight: 700; color: #374151; margin-bottom: 5px;">${currentLanguage === 'zh' ? '月净利润' : 'Monthly Profit'}</div>
                    <div style="font-size: 18px; color: ${results.monthlyProfit >= 0 ? '#059669' : '#dc2626'}; font-weight: 600;">${formatCurrency(results.monthlyProfit)}</div>
                  </div>
                  <div style="margin-bottom: 0;">
                    <div style="font-weight: 700; color: #374151; margin-bottom: 5px;">${currentLanguage === 'zh' ? '总投资回报率' : 'Total ROI'}</div>
                    <div style="font-size: 18px; color: #059669; font-weight: 600;">${formatPercent(results.totalROI)}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Risk Analysis Section -->
            <div style="margin-bottom: 35px;">
              <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 15px 0; border-left: 5px solid #2563eb; padding-left: 12px; font-weight: 700;">
                ${currentLanguage === 'zh' ? '风险分析与预测 (90% 置信区间)' : 'Risk Analysis & Forecast (90% Confidence Interval)'}
              </h3>
              <div style="background: #fef3c7; padding: 25px; border-radius: 10px; border-left: 5px solid #f59e0b;">
                <div style="margin-bottom: 15px;">
                  <span style="font-weight: 700; color: #92400e;">${currentLanguage === 'zh' ? '预期平均回报率' : 'Expected Average ROI'}:</span>
                  <span style="font-size: 16px; color: #92400e; font-weight: 600;"> ${formatPercent(monteCarloResults.mean_roi)}</span>
                </div>
                <div style="margin-bottom: 15px;">
                  <span style="font-weight: 700; color: #92400e;">${currentLanguage === 'zh' ? '回报率区间范围' : 'ROI Range'}:</span>
                  <span style="font-size: 16px; color: #92400e; font-weight: 600;"> ${formatPercent(monteCarloResults.confidence_interval.lower)} - ${formatPercent(monteCarloResults.confidence_interval.upper)}</span>
                </div>
                <div style="margin-bottom: 0;">
                  <span style="font-weight: 700; color: #92400e;">${currentLanguage === 'zh' ? '投资建议' : 'Investment Recommendation'}:</span>
                  <span style="font-size: 16px; color: #92400e; font-weight: 600;"> ${currentLanguage === 'zh' ? 
                    (results.investmentSignal === 'BUY' ? '建议购买' : results.investmentSignal === 'WAIT' ? '建议观望' : '不建议购买') :
                    results.investmentSignal}</span>
                </div>
              </div>
            </div>

            <!-- Property Details Section -->
            <div style="margin-bottom: 35px;">
              <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 15px 0; border-left: 5px solid #2563eb; padding-left: 12px; font-weight: 700;">
                ${currentLanguage === 'zh' ? '房产详细信息' : 'Property Details'}
              </h3>
              <div style="background: #f1f5f9; padding: 25px; border-radius: 10px; border: 1px solid #cbd5e1;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                  <div>
                    <div style="margin-bottom: 12px;">
                      <span style="font-weight: 700; color: #374151;">${currentLanguage === 'zh' ? '地区' : 'Region'}:</span>
                      <span style="color: #1f2937; font-weight: 500;"> ${regions.find(r => r.id === selectedRegion)?.name || 'Queens'}</span>
                    </div>
                    <div style="margin-bottom: 12px;">
                      <span style="font-weight: 700; color: #374151;">${currentLanguage === 'zh' ? '首付比例' : 'Down Payment'}:</span>
                      <span style="color: #1f2937; font-weight: 500;"> ${inputs.downPaymentPercent}%</span>
                    </div>
                    <div style="margin-bottom: 12px;">
                      <span style="font-weight: 700; color: #374151;">${currentLanguage === 'zh' ? '贷款利率' : 'Interest Rate'}:</span>
                      <span style="color: #1f2937; font-weight: 500;"> ${inputs.loanInterestRate}%</span>
                    </div>
                  </div>
                  <div>
                    <div style="margin-bottom: 12px;">
                      <span style="font-weight: 700; color: #374151;">${currentLanguage === 'zh' ? '月费用' : 'Monthly Expenses'}:</span>
                      <span style="color: #1f2937; font-weight: 500;"> ${formatCurrency(parseFloat(inputs.monthlyExpenses))}</span>
                    </div>
                    <div style="margin-bottom: 12px;">
                      <span style="font-weight: 700; color: #374151;">${currentLanguage === 'zh' ? '空置率' : 'Vacancy Rate'}:</span>
                      <span style="color: #1f2937; font-weight: 500;"> ${inputs.vacancyRate}%</span>
                    </div>
                    <div style="margin-bottom: 12px;">
                      <span style="font-weight: 700; color: #374151;">${currentLanguage === 'zh' ? '升值率' : 'Appreciation Rate'}:</span>
                      <span style="color: #1f2937; font-weight: 500;"> ${inputs.appreciationRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer/Disclaimer Section -->
            <div style="margin-top: 50px; padding-top: 25px; border-top: 2px solid #e5e7eb;">
              <h3 style="color: #dc2626; font-size: 16px; margin: 0 0 15px 0; font-weight: 700;">
                ${currentLanguage === 'zh' ? '重要免责声明' : 'Important Disclaimer'}
              </h3>
              <div style="background: #fef2f2; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626;">
                <p style="font-size: 13px; color: #374151; line-height: 1.7; margin: 0; font-weight: 500;">
                  ${currentLanguage === 'zh' ? 
                    '本分析报告基于提供的数据和当前市场假设进行计算。实际投资结果可能因市场波动、政策变化、空置率变动、维修费用、管理成本等多种因素而有所不同。过往业绩不代表未来回报。房地产投资存在风险，包括但不限于市场价值下跌、流动性风险、利率变化等。投资者应根据自身财务状况和风险承受能力谨慎决策，建议在投资前咨询专业财务顾问。' :
                    'This analysis report is based on provided data and current market assumptions. Actual investment results may vary due to market volatility, policy changes, vacancy rate fluctuations, repair costs, management expenses, and other factors. Past performance does not guarantee future returns. Real estate investment involves risks including but not limited to market value decline, liquidity risks, and interest rate changes. Investors should make decisions based on their financial situation and risk tolerance, and are advised to consult professional financial advisors before investing.'}
                </p>
              </div>
              <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #d1d5db;">
                <p style="font-size: 12px; color: #6b7280; margin: 0; font-weight: 500;">
                  ${currentLanguage === 'zh' ? 
                    '报告生成时间: ' + new Date().toLocaleDateString('zh-CN') + ' | 专业房地产投资分析师: Henry Yue' :
                    'Report Generated: ' + new Date().toLocaleDateString('en-US') + ' | Professional Real Estate Investment Analyst: Henry Yue'}
                </p>
              </div>
            </div>
          </div>
        `;
      };

      // Create a temporary container for PDF generation
      const tempContainer = document.createElement('div');
      tempContainer.style.cssText = `
        position: absolute;
        top: -10000px;
        left: -10000px;
        width: 794px;
        background: white;
        z-index: -1;
      `;
      tempContainer.innerHTML = createPDFContent();
      document.body.appendChild(tempContainer);

      // Wait for content to render
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate canvas from the content
      const canvas = await html2canvas(tempContainer, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: tempContainer.scrollHeight,
        foreignObjectRendering: true,
        logging: false
      });

      // Remove temporary container
      document.body.removeChild(tempContainer);

      // Create and save PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Handle multi-page PDF if content is long
      if (imgHeight > 297) { // A4 height in mm
        let position = 0;
        const pageHeight = 297;
        
        while (position < imgHeight) {
          if (position > 0) {
            pdf.addPage();
          }
          
          pdf.addImage(
            imgData,
            'JPEG',
            0,
            -position,
            imgWidth,
            imgHeight,
            undefined,
            'FAST'
          );
          
          position += pageHeight;
        }
      } else {
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      }

      // Generate filename based on language and region
      const filename = currentLanguage === 'zh' ? 
        `NYC房产投资分析报告-${regions.find(r => r.id === selectedRegion)?.name || '皇后区'}-${Date.now()}.pdf` :
        `NYC-Real-Estate-Investment-Analysis-${selectedRegion}-${Date.now()}.pdf`;

      pdf.save(filename);

    } catch (error) {
      console.error('PDF export error:', error);
      alert(currentLanguage === 'zh' ? 
        'PDF生成失败，请重试。如问题持续，请联系技术支持。' : 
        'PDF generation failed. Please try again. If the problem persists, contact technical support.'
      );
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
      name: currentLanguage === 'zh' ? '阿斯托利亚投资型物业' : 'Astoria Investment Property',
      values: { purchasePrice: '840000', monthlyRent: '3150', monthlyExpenses: '820', closingCosts: '16800', renovationCosts: '22000', appreciationRate: '4.5', loanInterestRate: '6.63', downPaymentPercent: '30', vacancyRate: '4.2' },
      region: 'queens',
      roiEstimate: 7.6,
      priority: 3
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
                <Button
                  key={region.id}
                  variant={selectedRegion === region.id ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-auto py-3 px-2 transition-all duration-200"
                  onClick={() => setSelectedRegion(region.id)}
                >
                  <div className="text-center">
                    <div className="font-medium text-xs leading-tight">{region.name}</div>
                    <div className={`text-xs font-semibold mt-1 ${
                      selectedRegion === region.id 
                        ? 'text-primary-foreground/90' 
                        : region.medianROI >= 8 
                          ? 'text-green-600' 
                          : region.medianROI >= 6 
                            ? 'text-yellow-600' 
                            : 'text-red-600'
                    }`}>
                      ROI: {region.medianROI}%
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Preset Scenarios */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
              <Star className="h-5 w-5" />
              {currentLanguage === 'zh' ? '快速分析场景' : 'Quick Analysis Scenarios'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {presetScenarios.sort((a, b) => a.priority - b.priority).map((scenario, index) => (
                <Card key={index} 
                  className={`p-4 cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${
                    inputs.purchasePrice === scenario.values.purchasePrice && inputs.monthlyRent === scenario.values.monthlyRent
                      ? 'bg-gradient-to-br from-primary/20 to-primary/10 border-primary text-primary-foreground shadow-lg'
                      : 'bg-gradient-to-br from-secondary/5 to-background border-secondary/30 hover:border-primary/50'
                  }`}
                >
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-bold text-sm leading-tight break-words ${
                        inputs.purchasePrice === scenario.values.purchasePrice && inputs.monthlyRent === scenario.values.monthlyRent
                          ? 'text-primary-foreground' 
                          : 'text-primary'
                      }`}>
                        {scenario.name}
                      </h4>
                      <Badge variant="outline" className={`text-xs ml-2 flex-shrink-0 ${
                        inputs.purchasePrice === scenario.values.purchasePrice && inputs.monthlyRent === scenario.values.monthlyRent
                          ? 'bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30'
                          : 'bg-green-50 text-green-700 border-green-200'
                      }`}>
                        ROI: {scenario.roiEstimate}%
                      </Badge>
                    </div>
                    <Button 
                      variant={inputs.purchasePrice === scenario.values.purchasePrice && inputs.monthlyRent === scenario.values.monthlyRent ? "secondary" : "outline"}
                      size="sm" 
                      className={`w-full transition-colors duration-200 ${
                        inputs.purchasePrice === scenario.values.purchasePrice && inputs.monthlyRent === scenario.values.monthlyRent
                          ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
                          : 'hover:bg-primary hover:text-primary-foreground'
                      }`}
                      onClick={() => {
                        setInputs(scenario.values);
                        setSelectedRegion(scenario.region);
                      }}
                    >
                      {currentLanguage === 'zh' ? '加载场景' : 'Load Scenario'}
                    </Button>
                  </div>
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
            
            <CardContent className="p-0 space-y-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">{currentLanguage === 'zh' ? '基础信息' : 'Basic Info'}</TabsTrigger>
                  <TabsTrigger value="advanced">{currentLanguage === 'zh' ? '高级设置' : 'Advanced'}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="purchase-price">{currentLanguage === 'zh' ? '购买价格' : 'Purchase Price'}</Label>
                      <Input
                        id="purchase-price"
                        type="text"
                        value={inputs.purchasePrice}
                        onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                        placeholder="750000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthly-rent">{currentLanguage === 'zh' ? '月租金' : 'Monthly Rent'}</Label>
                      <Input
                        id="monthly-rent"
                        type="text"
                        value={inputs.monthlyRent}
                        onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                        placeholder="3200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthly-expenses">{currentLanguage === 'zh' ? '月支出' : 'Monthly Expenses'}</Label>
                      <Input
                        id="monthly-expenses"
                        type="text"
                        value={inputs.monthlyExpenses}
                        onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                        placeholder="800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="down-payment">{currentLanguage === 'zh' ? '首付比例 (%)' : 'Down Payment (%)'}</Label>
                      <Input
                        id="down-payment"
                        type="text"
                        value={inputs.downPaymentPercent}
                        onChange={(e) => handleInputChange('downPaymentPercent', e.target.value)}
                        placeholder="30"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="advanced" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="closing-costs">{currentLanguage === 'zh' ? '过户费用' : 'Closing Costs'}</Label>
                      <Input
                        id="closing-costs"
                        type="text"
                        value={inputs.closingCosts}
                        onChange={(e) => handleInputChange('closingCosts', e.target.value)}
                        placeholder="15000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="renovation-costs">{currentLanguage === 'zh' ? '装修费用' : 'Renovation Costs'}</Label>
                      <Input
                        id="renovation-costs"
                        type="text"
                        value={inputs.renovationCosts}
                        onChange={(e) => handleInputChange('renovationCosts', e.target.value)}
                        placeholder="25000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="appreciation-rate">{currentLanguage === 'zh' ? '年升值率 (%)' : 'Appreciation Rate (%)'}</Label>
                      <Input
                        id="appreciation-rate"
                        type="text"
                        value={inputs.appreciationRate}
                        onChange={(e) => handleInputChange('appreciationRate', e.target.value)}
                        placeholder="4.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="interest-rate">{currentLanguage === 'zh' ? '贷款利率 (%)' : 'Interest Rate (%)'}</Label>
                      <Input
                        id="interest-rate"
                        type="text"
                        value={inputs.loanInterestRate}
                        onChange={(e) => handleInputChange('loanInterestRate', e.target.value)}
                        placeholder="6.63"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vacancy-rate">{currentLanguage === 'zh' ? '空置率 (%)' : 'Vacancy Rate (%)'}</Label>
                      <Input
                        id="vacancy-rate"
                        type="text"
                        value={inputs.vacancyRate}
                        onChange={(e) => handleInputChange('vacancyRate', e.target.value)}
                        placeholder="5"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="p-6 shadow-lg border-primary/20">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-5 w-5" />
                {currentLanguage === 'zh' ? 'ROI 分析结果' : 'ROI Analysis Results'}
              </CardTitle>
              <CardDescription>
                {currentLanguage === 'zh' ? '基于AI算法的专业投资回报分析' : 'Professional investment return analysis based on AI algorithms'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0 space-y-6">
              {/* Investment Rating */}
              <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`h-6 w-6 ${i < results.investmentRating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-lg font-semibold">
                  {currentLanguage === 'zh' ? '投资评级' : 'Investment Rating'}: {results.investmentRating}/5
                </p>
                <Badge 
                  variant={results.investmentSignal === 'BUY' ? 'default' : results.investmentSignal === 'WAIT' ? 'secondary' : 'destructive'}
                  className="mt-2"
                >
                  {results.investmentSignal}
                </Badge>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-background rounded border">
                  <div className="text-2xl font-bold text-primary">
                    {formatPercent(results.cashOnCashReturn)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === 'zh' ? '现金回报率' : 'Cash-on-Cash ROI'}
                  </p>
                </div>
                <div className="text-center p-3 bg-background rounded border">
                  <div className="text-2xl font-bold text-secondary">
                    {formatPercent(results.capRate)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === 'zh' ? '资本化率' : 'Cap Rate'}
                  </p>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>{currentLanguage === 'zh' ? '现金投入' : 'Cash Invested'}:</span>
                  <span className="font-medium">{formatCurrency(results.cashInvested)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{currentLanguage === 'zh' ? '年现金流' : 'Annual Cash Flow'}:</span>
                  <span className={`font-medium ${results.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(results.annualCashFlow)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{currentLanguage === 'zh' ? '月利润' : 'Monthly Profit'}:</span>
                  <span className={`font-medium ${results.monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(results.monthlyProfit)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{currentLanguage === 'zh' ? '总ROI' : 'Total ROI'}:</span>
                  <span className={`font-medium ${getROIColor(results.totalROI)}`}>
                    {formatPercent(results.totalROI)}
                  </span>
                </div>
              </div>

              {/* Monte Carlo Results */}
              {monteCarloResults.roi_distribution.length > 0 && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    {currentLanguage === 'zh' ? '风险分析 (90% 置信区间)' : 'Risk Analysis (90% Confidence Interval)'}
                  </h4>
                  <div className="text-sm space-y-1">
                    <div>
                      {currentLanguage === 'zh' ? '预期ROI' : 'Expected ROI'}: <span className="font-medium">{formatPercent(monteCarloResults.mean_roi)}</span>
                    </div>
                    <div>
                      {currentLanguage === 'zh' ? '范围' : 'Range'}: <span className="font-medium">
                        {formatPercent(monteCarloResults.confidence_interval.lower)} - {formatPercent(monteCarloResults.confidence_interval.upper)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Property Analysis Form and Export - Moved to bottom */}
        <div className="mt-12 space-y-6">
          {/* Property Analysis Section */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {currentLanguage === 'zh' ? 'AI物业分析' : 'AI Property Analysis'}
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="address-input" className="text-sm font-medium mb-2 block">
                  {currentLanguage === 'zh' ? '输入物业地址进行AI分析' : 'Enter Property Address for AI Analysis'}
                </Label>
                <Input
                  id="address-input"
                  placeholder={currentLanguage === 'zh' ? '例如: 123 Main St, Flushing, NY 11354' : 'e.g., 123 Main St, Flushing, NY 11354'}
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col justify-end">
                <Button 
                  onClick={analyzeProperty}
                  disabled={!addressInput.trim() || analysisStage === 'analyzing'}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2 h-10"
                >
                  {analysisStage === 'analyzing' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {currentLanguage === 'zh' ? 'AI分析中...' : 'AI Analyzing...'}
                    </div>
                  ) : (
                    <>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      {currentLanguage === 'zh' ? 'AI分析' : 'AI Analyze'}
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
                    {currentLanguage === 'zh' ? 'AI分析完成' : 'AI Analysis Complete'}
                  </span>
                </div>
                <p className="text-green-700 text-sm mt-2">
                  {currentLanguage === 'zh' ? 
                    '已基于地址和市场数据更新投资参数。' : 
                    'Investment parameters updated based on address and market data.'}
                </p>
              </div>
            )}
          </div>

          {/* Export to PDF Button */}
          <div className="flex justify-center">
            <Button 
              onClick={exportToPDF}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3"
            >
              <Download className="w-4 h-4 mr-2" />
              {currentLanguage === 'zh' ? '导出PDF报告' : 'Export PDF Report'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;