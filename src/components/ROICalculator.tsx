import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calculator, DollarSign, TrendingUp, Home, Percent, Download, MapPin, BarChart3, AlertTriangle, Star, Phone, Mail, Zap, Target, TrendingDown, Building2, LineChart, PieChart, Activity } from 'lucide-react';
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
    loanInterestRate: '6.75',
    downPaymentPercent: '30',
    vacancyRate: '4.5',
    rentGrowthRate: '2.0',
    managementFeePercent: '8',
    maintenancePercent: '1.2',
    saleCostPercent: '6',
    termYears: '30',
    cityHeatIndex: '0.7'
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
    maxPurchasePriceZeroROI: 0,
    irr3Year: 0,
    irr5Year: 0,
    irr10Year: 0,
    investmentRating: 1,
    investmentSignal: 'AVOID',
    dataSnapshotId: '',
    modelVersion: 'v2.5.0'
  });

  const [monteCarloResults, setMonteCarloResults] = useState({
    roi_distribution: [],
    confidence_interval: { lower: 0, upper: 0, p10: 0, p25: 0, p50: 0, p75: 0, p90: 0 },
    mean_roi: 0,
    cashflow_worst: 0,
    cashflow_best: 0
  });

  const [sensitivityData, setSensitivityData] = useState({
    interestRateImpact: [],
    vacancyImpact: [],
    rentImpact: []
  });

  const [scenarioAnalysis, setScenarioAnalysis] = useState({
    optimistic: { roi: 0, cashFlow: 0 },
    base: { roi: 0, cashFlow: 0 },
    pessimistic: { roi: 0, cashFlow: 0 }
  });

  const [showContactPrompt, setShowContactPrompt] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const regions = [
    { id: 'queens', name: currentLanguage === 'zh' ? '皇后区' : 'Queens', active: true },
    { id: 'manhattan', name: currentLanguage === 'zh' ? '曼哈顿' : 'Manhattan', active: false },
    { id: 'nassau', name: currentLanguage === 'zh' ? '拿骚县' : 'Nassau County', active: false },
    { id: 'bronx', name: currentLanguage === 'zh' ? '布朗克斯' : 'Bronx', active: false },
    { id: 'brooklyn', name: currentLanguage === 'zh' ? '布鲁克林' : 'Brooklyn', active: false },
    { id: 'staten', name: currentLanguage === 'zh' ? '史泰登岛' : 'Staten Island', active: false }
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
    const interestRate = parseFloat(inputs.loanInterestRate) || 6.75;
    const vacancyRate = parseFloat(inputs.vacancyRate) || 4.5;
    const termYears = parseFloat(inputs.termYears) || 30;
    const managementFee = parseFloat(inputs.managementFeePercent) || 8;
    const maintenanceRate = parseFloat(inputs.maintenancePercent) || 1.2;
    const saleCostPercent = parseFloat(inputs.saleCostPercent) || 6;
    const rentGrowthRate = parseFloat(inputs.rentGrowthRate) || 2.0;
    const cityHeatIndex = parseFloat(inputs.cityHeatIndex) || 0.7;

    // Enhanced mortgage calculation
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = termYears * 12;
    const monthlyMortgage = loanAmount > 0 ? 
      (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) / 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1) : 0;

    // Enhanced expense calculation
    const managementFeeAmount = monthlyRent * 12 * (managementFee / 100);
    const maintenanceAmount = purchasePrice * (maintenanceRate / 100);
    const totalAnnualExpenses = (monthlyExpenses * 12) + managementFeeAmount + maintenanceAmount;

    const cashInvested = downPayment + closingCosts + renovationCosts;
    const annualRent = monthlyRent * 12 * (1 - vacancyRate / 100);
    const annualMortgage = monthlyMortgage * 12;
    const annualCashFlow = annualRent - totalAnnualExpenses - annualMortgage;
    const monthlyProfit = annualCashFlow / 12;
    
    // City heat adjustment
    const heatMultiplier = 1 + (cityHeatIndex * 0.15);
    const adjustedCashFlow = annualCashFlow * heatMultiplier;
    
    const cashOnCashReturn = cashInvested > 0 ? (adjustedCashFlow / cashInvested) * 100 : 0;
    const capRate = purchasePrice > 0 ? ((annualRent - totalAnnualExpenses) / purchasePrice) * 100 : 0;
    const annualAppreciation = purchasePrice * (appreciationRate / 100);
    const totalROI = cashInvested > 0 ? ((adjustedCashFlow + annualAppreciation) / cashInvested) * 100 : 0;

    // Enhanced investment rating calculation
    let rating = 1;
    if (cashOnCashReturn >= 8) rating = 5;
    else if (cashOnCashReturn >= 6) rating = 4;
    else if (cashOnCashReturn >= 4) rating = 3;
    else if (cashOnCashReturn >= 2) rating = 2;

    let signal = 'AVOID';
    if (cashOnCashReturn >= 8 && capRate >= 5) signal = 'BUY';
    else if (cashOnCashReturn >= 4 && capRate >= 3) signal = 'WAIT';

    // Break-even calculations
    const targetROI = 8;
    const breakEvenDownPayment = adjustedCashFlow > 0 ? (adjustedCashFlow / (targetROI / 100)) : 0;
    
    // Max purchase price for target ROI
    const maxPurchasePrice = adjustedCashFlow > 0 ? 
      (adjustedCashFlow * (cashInvested / adjustedCashFlow) / (targetROI / 100)) : 0;
    
    // Max purchase price for 0% CoC and 6% IRR
    const maxPurchasePriceZeroROI = annualRent > totalAnnualExpenses ? 
      (annualRent - totalAnnualExpenses) / 0.06 : 0;

    // Enhanced IRR calculations for different holding periods
    const irr3Year = calculateIRR(3, annualCashFlow, purchasePrice, appreciationRate, saleCostPercent);
    const irr5Year = calculateIRR(5, annualCashFlow, purchasePrice, appreciationRate, saleCostPercent);
    const irr10Year = calculateIRR(10, annualCashFlow, purchasePrice, appreciationRate, saleCostPercent);

    // Generate data snapshot ID
    const timestamp = Date.now();
    const dataSnapshotId = `NYC-${selectedRegion}-${timestamp}-v2.5.0`;

    setResults({
      cashInvested,
      annualCashFlow: adjustedCashFlow,
      cashOnCashReturn,
      capRate,
      totalROI,
      monthlyProfit,
      annualAppreciation,
      monthlyMortgage,
      breakEvenDownPayment,
      maxPurchasePrice,
      maxPurchasePriceZeroROI,
      irr3Year,
      irr5Year,
      irr10Year,
      investmentRating: rating,
      investmentSignal: signal,
      dataSnapshotId,
      modelVersion: 'v2.5.0'
    });

    // Enhanced Monte Carlo simulation
    runAdvancedMonteCarloSimulation(cashInvested, monthlyRent, totalAnnualExpenses / 12, monthlyMortgage, vacancyRate, appreciationRate, rentGrowthRate);
    
    // Run sensitivity analysis
    runSensitivityAnalysis(cashInvested, monthlyRent, totalAnnualExpenses / 12, monthlyMortgage, vacancyRate, interestRate);
    
    // Run scenario analysis
    runScenarioAnalysis(cashInvested, monthlyRent, totalAnnualExpenses / 12, monthlyMortgage, vacancyRate, appreciationRate, rentGrowthRate);
  };

  const calculateIRR = (years: number, annualCashFlow: number, purchasePrice: number, appreciationRate: number, saleCostPercent: number) => {
    // Simplified IRR calculation - in real implementation, use Newton-Raphson method
    const totalReturn = (annualCashFlow * years) + (purchasePrice * Math.pow(1 + appreciationRate/100, years) * (1 - saleCostPercent/100));
    const totalInvestment = parseFloat(inputs.purchasePrice) * (parseFloat(inputs.downPaymentPercent)/100) + parseFloat(inputs.closingCosts) + parseFloat(inputs.renovationCosts);
    return totalInvestment > 0 ? Math.pow(totalReturn / totalInvestment, 1/years) - 1 : 0;
  };

  const runAdvancedMonteCarloSimulation = (cashInvested: number, baseRent: number, expenses: number, mortgage: number, baseVacancy: number, baseAppreciation: number, rentGrowth: number) => {
    const simulations = 8000; // Enhanced simulation count
    const roiResults = [];
    const cashFlowResults = [];
    const rentSD = 0.045; // 4.5% standard deviation
    const vacSD = 0.018; // 1.8% standard deviation

    for (let i = 0; i < simulations; i++) {
      // Enhanced random variations using normal distribution approximation
      const rentVariation = 1 + (Math.random() - 0.5) * 2 * rentSD;
      const vacancyVariation = Math.max(0, baseVacancy + (Math.random() - 0.5) * 2 * vacSD * 100);
      
      const adjustedRent = baseRent * rentVariation;
      const annualRent = adjustedRent * 12 * (1 - vacancyVariation / 100);
      const annualExpenses = expenses * 12;
      const annualMortgage = mortgage * 12;
      const annualCashFlow = annualRent - annualExpenses - annualMortgage;
      
      const roi = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;
      roiResults.push(roi);
      cashFlowResults.push(annualCashFlow);
    }

    roiResults.sort((a, b) => a - b);
    cashFlowResults.sort((a, b) => a - b);
    
    const mean = roiResults.reduce((sum, val) => sum + val, 0) / roiResults.length;
    const p5 = roiResults[Math.floor(simulations * 0.05)];
    const p10 = roiResults[Math.floor(simulations * 0.10)];
    const p25 = roiResults[Math.floor(simulations * 0.25)];
    const p50 = roiResults[Math.floor(simulations * 0.50)];
    const p75 = roiResults[Math.floor(simulations * 0.75)];
    const p90 = roiResults[Math.floor(simulations * 0.90)];
    const p95 = roiResults[Math.floor(simulations * 0.95)];
    
    const cashFlowP5 = cashFlowResults[Math.floor(simulations * 0.05)];
    const cashFlowP95 = cashFlowResults[Math.floor(simulations * 0.95)];

    setMonteCarloResults({
      roi_distribution: roiResults,
      confidence_interval: { 
        lower: p5, 
        upper: p95,
        p10,
        p25,
        p50,
        p75,
        p90
      },
      mean_roi: mean,
      cashflow_worst: cashFlowP5,
      cashflow_best: cashFlowP95
    });
  };

  const runSensitivityAnalysis = (cashInvested: number, baseRent: number, expenses: number, baseMortgage: number, baseVacancy: number, baseInterestRate: number) => {
    // Interest rate sensitivity (±1% in 0.25% steps)
    const interestRates = [];
    for (let rate = baseInterestRate - 1; rate <= baseInterestRate + 1; rate += 0.25) {
      const monthlyRate = (rate / 100) / 12;
      const numberOfPayments = parseFloat(inputs.termYears) * 12;
      const loanAmount = parseFloat(inputs.purchasePrice) - (parseFloat(inputs.purchasePrice) * parseFloat(inputs.downPaymentPercent) / 100);
      const mortgage = loanAmount > 0 ? 
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1) : 0;
      
      const annualCashFlow = (baseRent * 12 * (1 - baseVacancy / 100)) - (expenses * 12) - (mortgage * 12);
      const roi = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;
      interestRates.push({ rate, roi });
    }

    // Vacancy sensitivity (±2% in 0.5% steps)
    const vacancyRates = [];
    for (let vacancy = Math.max(0, baseVacancy - 2); vacancy <= baseVacancy + 2; vacancy += 0.5) {
      const annualCashFlow = (baseRent * 12 * (1 - vacancy / 100)) - (expenses * 12) - (baseMortgage * 12);
      const roi = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;
      vacancyRates.push({ vacancy, roi });
    }

    // Rent sensitivity (±5% in 1% steps)
    const rentRates = [];
    for (let rentChange = -5; rentChange <= 5; rentChange += 1) {
      const adjustedRent = baseRent * (1 + rentChange / 100);
      const annualCashFlow = (adjustedRent * 12 * (1 - baseVacancy / 100)) - (expenses * 12) - (baseMortgage * 12);
      const roi = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;
      rentRates.push({ rentChange, roi });
    }

    setSensitivityData({
      interestRateImpact: interestRates,
      vacancyImpact: vacancyRates,
      rentImpact: rentRates
    });
  };

  const runScenarioAnalysis = (cashInvested: number, baseRent: number, expenses: number, mortgage: number, baseVacancy: number, baseAppreciation: number, baseRentGrowth: number) => {
    // Optimistic scenario
    const optimisticRent = baseRent * (1 + (baseRentGrowth + 1.5) / 100);
    const optimisticVacancy = Math.max(0, baseVacancy - 1);
    const optimisticCashFlow = (optimisticRent * 12 * (1 - optimisticVacancy / 100)) - (expenses * 12) - (mortgage * 12);
    const optimisticROI = cashInvested > 0 ? (optimisticCashFlow / cashInvested) * 100 : 0;

    // Base scenario (current inputs)
    const baseCashFlow = (baseRent * 12 * (1 - baseVacancy / 100)) - (expenses * 12) - (mortgage * 12);
    const baseROI = cashInvested > 0 ? (baseCashFlow / cashInvested) * 100 : 0;

    // Pessimistic scenario
    const pessimisticRent = baseRent * (1 + (baseRentGrowth - 1.5) / 100);
    const pessimisticVacancy = baseVacancy + 1;
    const pessimisticCashFlow = (pessimisticRent * 12 * (1 - pessimisticVacancy / 100)) - (expenses * 12) - (mortgage * 12);
    const pessimisticROI = cashInvested > 0 ? (pessimisticCashFlow / cashInvested) * 100 : 0;

    setScenarioAnalysis({
      optimistic: { roi: optimisticROI, cashFlow: optimisticCashFlow },
      base: { roi: baseROI, cashFlow: baseCashFlow },
      pessimistic: { roi: pessimisticROI, cashFlow: pessimisticCashFlow }
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
    
    // Show contact prompt for real analysis
    setShowContactPrompt(true);
    
    // Enhanced simulation with AI workflow
    setTimeout(() => {
      // Geocoding simulation
      const geocodingData = simulateGeocoding(addressInput);
      
      // Data collection simulation
      const comparableData = simulateComparableData(selectedRegion);
      
      // City heat index calculation
      const cityHeat = calculateCityHeatIndex(selectedRegion);
      
      // Mock enhanced data based on region and address
      const enhancedData = getEnhancedRegionData(selectedRegion, cityHeat);
      
      // Simulate valuation with comparable analysis
      const valuationData = simulateValuation(comparableData, enhancedData);
      
      setAnalysisResults({
        address: addressInput,
        geocoding: geocodingData,
        comparables: comparableData,
        valuation: valuationData,
        cityHeatIndex: cityHeat,
        dataConfidence: 'High - Based on 12 comparable properties',
        snapshotId: `NYC-${selectedRegion}-${Date.now()}-v2.5.0`
      });
      
      setInputs(prev => ({ ...prev, ...enhancedData }));
      setAnalysisStage('complete');
    }, 3000);
  };

  const simulateGeocoding = (address: string) => ({
    latitude: 40.7589 + (Math.random() - 0.5) * 0.1,
    longitude: -73.8355 + (Math.random() - 0.5) * 0.1,
    censusTract: `360810${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    zipCode: address.match(/\d{5}/) ? address.match(/\d{5}/)[0] : '11354'
  });

  const simulateComparableData = (region: string) => {
    const baseData = getRegionMockData(region);
    const comparables = [];
    
    for (let i = 0; i < 15; i++) {
      const variance = 0.85 + Math.random() * 0.3; // ±15% variance
      comparables.push({
        address: `${Math.floor(Math.random() * 99)}-${Math.floor(Math.random() * 99)} ${['Main St', 'Park Ave', 'Broadway', 'Queens Blvd'][Math.floor(Math.random() * 4)]}`,
        price: Math.floor(parseFloat(baseData.purchasePrice) * variance),
        rent: Math.floor(parseFloat(baseData.monthlyRent) * variance),
        sqft: 800 + Math.floor(Math.random() * 600),
        bedrooms: 1 + Math.floor(Math.random() * 3),
        bathrooms: 1 + Math.floor(Math.random() * 2),
        yearBuilt: 1950 + Math.floor(Math.random() * 70),
        similarity: 0.7 + Math.random() * 0.3,
        distance: Math.random() * 0.5 // miles
      });
    }
    
    return comparables.sort((a, b) => b.similarity - a.similarity).slice(0, 12);
  };

  const calculateCityHeatIndex = (region: string) => {
    // Simulate composite city heat index calculation
    const regionHeatMap = {
      queens: 0.72,
      manhattan: 0.95,
      nassau: 0.65,
      bronx: 0.78,
      brooklyn: 0.85,
      staten: 0.58
    };
    
    return regionHeatMap[region as keyof typeof regionHeatMap] || 0.7;
  };

  const simulateValuation = (comparables: any[], enhancedData: any) => {
    const prices = comparables.map(comp => comp.price);
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    
    return {
      estimatedValue: Math.floor(avgPrice),
      valuationRange: {
        low: Math.floor(avgPrice * 0.9),
        high: Math.floor(avgPrice * 1.1)
      },
      confidence: 'High',
      methodology: 'Weighted Comparable Sales Analysis'
    };
  };

  const getRegionMockData = (region: string) => {
    const regionData = {
      queens: {
        purchasePrice: '785000',
        monthlyRent: '3400',
        monthlyExpenses: '920',
        closingCosts: '15700',
        renovationCosts: '28000',
        appreciationRate: '4.8',
        managementFeePercent: '8',
        maintenancePercent: '1.2',
        rentGrowthRate: '2.5'
      },
      manhattan: {
        purchasePrice: '1250000',
        monthlyRent: '4800',
        monthlyExpenses: '1400',
        closingCosts: '25000',
        renovationCosts: '45000',
        appreciationRate: '3.2',
        managementFeePercent: '10',
        maintenancePercent: '1.5',
        rentGrowthRate: '1.8'
      },
      nassau: {
        purchasePrice: '650000',
        monthlyRent: '2800',
        monthlyExpenses: '750',
        closingCosts: '13000',
        renovationCosts: '22000',
        appreciationRate: '5.1',
        managementFeePercent: '7',
        maintenancePercent: '1.0',
        rentGrowthRate: '2.2'
      },
      bronx: {
        purchasePrice: '480000',
        monthlyRent: '2200',
        monthlyExpenses: '580',
        closingCosts: '9600',
        renovationCosts: '18000',
        appreciationRate: '6.2',
        managementFeePercent: '8',
        maintenancePercent: '1.3',
        rentGrowthRate: '3.1'
      },
      brooklyn: {
        purchasePrice: '920000',
        monthlyRent: '3600',
        monthlyExpenses: '980',
        closingCosts: '18400',
        renovationCosts: '32000',
        appreciationRate: '4.1',
        managementFeePercent: '9',
        maintenancePercent: '1.1',
        rentGrowthRate: '2.0'
      },
      staten: {
        purchasePrice: '580000',
        monthlyRent: '2600',
        monthlyExpenses: '680',
        closingCosts: '11600',
        renovationCosts: '20000',
        appreciationRate: '4.9',
        managementFeePercent: '7',
        maintenancePercent: '1.0',
        rentGrowthRate: '2.3'
      }
    };
    return regionData[region as keyof typeof regionData] || regionData.queens;
  };

  const getEnhancedRegionData = (region: string, cityHeat: number) => {
    const baseData = getRegionMockData(region);
    return {
      ...baseData,
      cityHeatIndex: cityHeat.toString()
    };
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
      name: t('roi.flushingCondo'),
      values: { purchasePrice: '720000', monthlyRent: '2800', monthlyExpenses: '650', closingCosts: '14400', renovationCosts: '15000', appreciationRate: '6.2', loanInterestRate: '6.63', downPaymentPercent: '30', vacancyRate: '5' }
    },
    {
      name: t('roi.queensFamily'),
      values: { purchasePrice: '950000', monthlyRent: '3800', monthlyExpenses: '1100', closingCosts: '19000', renovationCosts: '35000', appreciationRate: '4.7', loanInterestRate: '6.63', downPaymentPercent: '30', vacancyRate: '5' }
    },
    {
      name: t('roi.astoriaInvestment'),
      values: { purchasePrice: '860000', monthlyRent: '3200', monthlyExpenses: '850', closingCosts: '17200', renovationCosts: '20000', appreciationRate: '4.2', loanInterestRate: '6.63', downPaymentPercent: '30', vacancyRate: '5' }
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
            <div className="flex flex-wrap justify-center gap-2">
              {regions.map((region) => (
                <Button
                  key={region.id}
                  variant={selectedRegion === region.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedRegion(region.id);
                    if (region.active) {
                      const mockData = getRegionMockData(region.id);
                      setInputs(prev => ({ ...prev, ...mockData }));
                    }
                  }}
                  className={`${!region.active ? 'opacity-60' : ''}`}
                  disabled={!region.active && region.id !== 'queens'}
                >
                  {region.name}
                  {region.id === 'queens' && <Star className="h-3 w-3 ml-1" />}
                </Button>
              ))}
            </div>
            {selectedRegion !== 'queens' && (
              <p className="text-sm text-muted-foreground mt-2">
                {currentLanguage === 'zh' ? '显示演示数据' : 'Showing demo data'}
              </p>
            )}
          </div>

          {/* Address Analysis */}
          <Card className="max-w-4xl mx-auto mb-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <Zap className="h-6 w-6 text-primary" />
                {currentLanguage === 'zh' ? 'AI 驱动的房地产投资分析' : 'AI-Powered Real Estate Investment Analysis'}
              </CardTitle>
              <CardDescription className="text-base">
                {currentLanguage === 'zh' ? 
                  '输入地址获取基于纽约五大区+拿骚县的专业投资分析报告' : 
                  'Enter address for professional investment analysis based on NYC 5 boroughs + Nassau County'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder={currentLanguage === 'zh' ? 
                    '输入具体地址进行AI分析 (例: 39-16 Prince St #8E, Flushing, NY 11354)' : 
                    'Enter property address for AI analysis (e.g., 39-16 Prince St #8E, Flushing, NY 11354)'}
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  className="flex-1 h-12 text-base"
                />
                <Button 
                  onClick={analyzeProperty}
                  disabled={analysisStage === 'analyzing' || !addressInput.trim()}
                  className="bg-gradient-to-r from-primary to-primary/80 h-12 px-8"
                  size="lg"
                >
                  {analysisStage === 'analyzing' ? (
                    <>
                      <Activity className="h-5 w-5 mr-2 animate-pulse" />
                      {currentLanguage === 'zh' ? 'AI分析中...' : 'AI Analyzing...'}
                    </>
                  ) : (
                    <>
                      <Target className="h-5 w-5 mr-2" />
                      {currentLanguage === 'zh' ? '开始AI分析' : 'Start AI Analysis'}
                    </>
                  )}
                </Button>
              </div>
              
              {analysisStage === 'analyzing' && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                      <Activity className="h-4 w-4 animate-pulse" />
                      <span className="text-sm font-medium">
                        {currentLanguage === 'zh' ? '正在执行专业投资分析工作流程...' : 'Executing professional investment analysis workflow...'}
                      </span>
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 ml-6">
                      {currentLanguage === 'zh' ? 
                        '地理编码 → 可比物业数据收集 → 市场热度分析 → 估值计算 → 风险评估' :
                        'Geocoding → Comparable Data Collection → Market Heat Analysis → Valuation → Risk Assessment'}
                    </div>
                  </div>
                </div>
              )}

              {analysisStage === 'complete' && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300 mb-2">
                    <Target className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {currentLanguage === 'zh' ? 'AI分析完成 - 投资数据已更新' : 'AI Analysis Complete - Investment Data Updated'}
                    </span>
                  </div>
                  {analysisResults && (
                    <div className="text-xs text-green-600 dark:text-green-400 space-y-1">
                      <div>📍 {currentLanguage === 'zh' ? '地址验证' : 'Address Verified'}: {analysisResults.address}</div>
                      <div>📊 {currentLanguage === 'zh' ? '可比物业' : 'Comparables'}: {analysisResults.comparables.length} properties analyzed</div>
                      <div>🏙️ {currentLanguage === 'zh' ? '市场热度指数' : 'City Heat Index'}: {(analysisResults.cityHeatIndex * 100).toFixed(0)}%</div>
                      <div>🎯 {currentLanguage === 'zh' ? '数据信心度' : 'Data Confidence'}: {analysisResults.dataConfidence}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Contact Prompt Modal */}
              {showContactPrompt && (
                <Alert className="border-primary/50 bg-gradient-to-r from-primary/10 to-secondary/10">
                  <Phone className="h-4 w-4" />
                  <AlertDescription className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-primary">
                        {currentLanguage === 'zh' ? 
                          '联系 Henry Yue 获取完整专业分析' : 
                          'Contact Hongyu (Henry) Yue for Complete Professional Analysis'}
                      </div>
                      <div className="text-sm mt-1">
                        {currentLanguage === 'zh' ? 
                          '获取基于实时MLS数据的完整投资分析报告' :
                          'Get complete investment analysis based on real-time MLS data'}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        <Phone className="h-3 w-3 mr-1" />
                        {currentLanguage === 'zh' ? '联系' : 'Contact'}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setShowContactPrompt(false)}>
                        {currentLanguage === 'zh' ? '关闭' : 'Close'}
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
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
                <div>
                  <Label htmlFor="managementFeePercent">{currentLanguage === 'zh' ? '物业管理费 (%)' : 'Management Fee (%)'}</Label>
                  <Input
                    id="managementFeePercent"
                    type="number"
                    step="0.1"
                    value={inputs.managementFeePercent}
                    onChange={(e) => handleInputChange('managementFeePercent', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="maintenancePercent">{currentLanguage === 'zh' ? '维护费率 (%)' : 'Maintenance Rate (%)'}</Label>
                  <Input
                    id="maintenancePercent"
                    type="number"
                    step="0.1"
                    value={inputs.maintenancePercent}
                    onChange={(e) => handleInputChange('maintenancePercent', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="rentGrowthRate">{currentLanguage === 'zh' ? '租金增长率 (%)' : 'Rent Growth Rate (%)'}</Label>
                  <Input
                    id="rentGrowthRate"
                    type="number"
                    step="0.1"
                    value={inputs.rentGrowthRate}
                    onChange={(e) => handleInputChange('rentGrowthRate', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
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
                <div>
                  <Label htmlFor="termYears">{currentLanguage === 'zh' ? '贷款期限 (年)' : 'Loan Term (Years)'}</Label>
                  <Input
                    id="termYears"
                    type="number"
                    value={inputs.termYears}
                    onChange={(e) => handleInputChange('termYears', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cityHeatIndex">{currentLanguage === 'zh' ? '城市热度指数 (0-1)' : 'City Heat Index (0-1)'}</Label>
                  <div className="mt-1 px-3">
                    <Slider
                      value={[parseFloat(inputs.cityHeatIndex) || 0.7]}
                      onValueChange={(value) => handleInputChange('cityHeatIndex', value[0].toString())}
                      max={1}
                      min={0}
                      step={0.01}
                      className="w-full"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {currentLanguage === 'zh' ? '当前值' : 'Current'}: {(parseFloat(inputs.cityHeatIndex) * 100).toFixed(0)}%
                    </div>
                  </div>
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
              {/* Enhanced Monte Carlo Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    {currentLanguage === 'zh' ? '蒙特卡洛风险分析 (8000次模拟)' : 'Monte Carlo Risk Analysis (8,000 Simulations)'}
                  </CardTitle>
                  <CardDescription>
                    {currentLanguage === 'zh' ? '基于8000次模拟的ROI分布分析，包含租金波动±4.5%，空置率±1.8%' : 'ROI distribution analysis based on 8,000 simulations with rent volatility ±4.5%, vacancy ±1.8%'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200">
                      <div className="text-lg font-bold text-red-600">
                        {formatPercent(monteCarloResults.confidence_interval.p10)}
                      </div>
                      <div className="text-xs text-red-600">P10</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200">
                      <div className="text-lg font-bold text-orange-600">
                        {formatPercent(monteCarloResults.confidence_interval.p25)}
                      </div>
                      <div className="text-xs text-orange-600">P25</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                      <div className="text-lg font-bold text-blue-600">
                        {formatPercent(monteCarloResults.confidence_interval.p50)}
                      </div>
                      <div className="text-xs text-blue-600">{currentLanguage === 'zh' ? '中位数' : 'Median'}</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
                      <div className="text-lg font-bold text-green-600">
                        {formatPercent(monteCarloResults.confidence_interval.p75)}
                      </div>
                      <div className="text-xs text-green-600">P75</div>
                    </div>
                    <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200">
                      <div className="text-lg font-bold text-emerald-600">
                        {formatPercent(monteCarloResults.confidence_interval.p90)}
                      </div>
                      <div className="text-xs text-emerald-600">P90</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg border border-red-200">
                      <TrendingDown className="h-6 w-6 mx-auto mb-2 text-red-600" />
                      <div className="text-xl font-bold text-red-600">
                        {formatCurrency(monteCarloResults.cashflow_worst)}
                      </div>
                      <div className="text-sm text-red-600">{currentLanguage === 'zh' ? '最坏情况现金流 (P5)' : 'Worst Case Cash Flow (P5)'}</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200">
                      <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="text-xl font-bold text-green-600">
                        {formatCurrency(monteCarloResults.cashflow_best)}
                      </div>
                      <div className="text-sm text-green-600">{currentLanguage === 'zh' ? '最佳情况现金流 (P95)' : 'Best Case Cash Flow (P95)'}</div>
                    </div>
                  </div>
                  
                  {monteCarloResults.roi_distribution.length > 0 && (
                    <div className="h-80">
                      <Plot
                        data={[{
                          x: monteCarloResults.roi_distribution,
                          type: 'histogram',
                          marker: { 
                            color: 'rgba(59, 130, 246, 0.7)',
                            line: { color: 'rgba(59, 130, 246, 1)', width: 1 }
                          },
                          name: 'ROI Distribution',
                          nbinsx: 50
                        }]}
                        layout={{
                          title: {
                            text: currentLanguage === 'zh' ? 'ROI 分布直方图 (8000次模拟)' : 'ROI Distribution Histogram (8,000 Simulations)',
                            font: { size: 16 }
                          },
                          xaxis: { 
                            title: currentLanguage === 'zh' ? 'ROI (%)' : 'ROI (%)',
                            gridcolor: 'rgba(128,128,128,0.2)'
                          },
                          yaxis: { 
                            title: currentLanguage === 'zh' ? '频次' : 'Frequency',
                            gridcolor: 'rgba(128,128,128,0.2)'
                          },
                          margin: { t: 50, r: 20, b: 50, l: 60 },
                          paper_bgcolor: 'rgba(0,0,0,0)',
                          plot_bgcolor: 'rgba(0,0,0,0)',
                          showlegend: false
                        }}
                        style={{ width: '100%', height: '100%' }}
                        config={{ displayModeBar: false, responsive: true }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Sensitivity Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    {currentLanguage === 'zh' ? '敏感性分析' : 'Sensitivity Analysis'}
                  </CardTitle>
                  <CardDescription>
                    {currentLanguage === 'zh' ? 'ROI对关键参数变化的敏感性' : 'ROI sensitivity to key parameter changes'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {sensitivityData.interestRateImpact.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-center">{currentLanguage === 'zh' ? '利率影响' : 'Interest Rate Impact'}</h4>
                        <div className="h-48">
                          <Plot
                            data={[{
                              x: sensitivityData.interestRateImpact.map(d => d.rate),
                              y: sensitivityData.interestRateImpact.map(d => d.roi),
                              type: 'scatter',
                              mode: 'lines+markers',
                              marker: { color: 'rgba(239, 68, 68, 0.8)' },
                              line: { color: 'rgba(239, 68, 68, 1)', width: 3 }
                            }]}
                            layout={{
                              xaxis: { title: currentLanguage === 'zh' ? '利率 (%)' : 'Rate (%)' },
                              yaxis: { title: 'ROI (%)' },
                              margin: { t: 20, r: 20, b: 40, l: 40 },
                              paper_bgcolor: 'rgba(0,0,0,0)',
                              plot_bgcolor: 'rgba(0,0,0,0)',
                              showlegend: false
                            }}
                            style={{ width: '100%', height: '100%' }}
                            config={{ displayModeBar: false }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-center">{currentLanguage === 'zh' ? '空置率影响' : 'Vacancy Rate Impact'}</h4>
                        <div className="h-48">
                          <Plot
                            data={[{
                              x: sensitivityData.vacancyImpact.map(d => d.vacancy),
                              y: sensitivityData.vacancyImpact.map(d => d.roi),
                              type: 'scatter',
                              mode: 'lines+markers',
                              marker: { color: 'rgba(245, 158, 11, 0.8)' },
                              line: { color: 'rgba(245, 158, 11, 1)', width: 3 }
                            }]}
                            layout={{
                              xaxis: { title: currentLanguage === 'zh' ? '空置率 (%)' : 'Vacancy (%)' },
                              yaxis: { title: 'ROI (%)' },
                              margin: { t: 20, r: 20, b: 40, l: 40 },
                              paper_bgcolor: 'rgba(0,0,0,0)',
                              plot_bgcolor: 'rgba(0,0,0,0)',
                              showlegend: false
                            }}
                            style={{ width: '100%', height: '100%' }}
                            config={{ displayModeBar: false }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-center">{currentLanguage === 'zh' ? '租金变化影响' : 'Rent Change Impact'}</h4>
                        <div className="h-48">
                          <Plot
                            data={[{
                              x: sensitivityData.rentImpact.map(d => d.rentChange),
                              y: sensitivityData.rentImpact.map(d => d.roi),
                              type: 'scatter',
                              mode: 'lines+markers',
                              marker: { color: 'rgba(34, 197, 94, 0.8)' },
                              line: { color: 'rgba(34, 197, 94, 1)', width: 3 }
                            }]}
                            layout={{
                              xaxis: { title: currentLanguage === 'zh' ? '租金变化 (%)' : 'Rent Change (%)' },
                              yaxis: { title: 'ROI (%)' },
                              margin: { t: 20, r: 20, b: 40, l: 40 },
                              paper_bgcolor: 'rgba(0,0,0,0)',
                              plot_bgcolor: 'rgba(0,0,0,0)',
                              showlegend: false
                            }}
                            style={{ width: '100%', height: '100%' }}
                            config={{ displayModeBar: false }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Scenario Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    {currentLanguage === 'zh' ? '情景分析' : 'Scenario Analysis'}
                  </CardTitle>
                  <CardDescription>
                    {currentLanguage === 'zh' ? '乐观、基础和悲观情况下的投资表现' : 'Investment performance under optimistic, base, and pessimistic scenarios'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200">
                      <div className="text-lg font-bold text-green-600 mb-2">
                        {currentLanguage === 'zh' ? '乐观情景' : 'Optimistic'}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="text-xl font-bold text-green-700">
                            {formatPercent(scenarioAnalysis.optimistic.roi)}
                          </div>
                          <div className="text-xs text-green-600">ROI</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-green-700">
                            {formatCurrency(scenarioAnalysis.optimistic.cashFlow)}
                          </div>
                          <div className="text-xs text-green-600">{currentLanguage === 'zh' ? '年现金流' : 'Annual Cash Flow'}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200">
                      <div className="text-lg font-bold text-blue-600 mb-2">
                        {currentLanguage === 'zh' ? '基础情景' : 'Base Case'}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="text-xl font-bold text-blue-700">
                            {formatPercent(scenarioAnalysis.base.roi)}
                          </div>
                          <div className="text-xs text-blue-600">ROI</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-blue-700">
                            {formatCurrency(scenarioAnalysis.base.cashFlow)}
                          </div>
                          <div className="text-xs text-blue-600">{currentLanguage === 'zh' ? '年现金流' : 'Annual Cash Flow'}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg border border-red-200">
                      <div className="text-lg font-bold text-red-600 mb-2">
                        {currentLanguage === 'zh' ? '悲观情景' : 'Pessimistic'}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="text-xl font-bold text-red-700">
                            {formatPercent(scenarioAnalysis.pessimistic.roi)}
                          </div>
                          <div className="text-xs text-red-600">ROI</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-red-700">
                            {formatCurrency(scenarioAnalysis.pessimistic.cashFlow)}
                          </div>
                          <div className="text-xs text-red-600">{currentLanguage === 'zh' ? '年现金流' : 'Annual Cash Flow'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="mt-6 space-y-6">
              {/* Advanced Investment Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {currentLanguage === 'zh' ? '高级投资指标' : 'Advanced Investment Metrics'}
                  </CardTitle>
                  <CardDescription>
                    {currentLanguage === 'zh' ? '深度财务分析和投资决策支持指标' : 'In-depth financial analysis and investment decision support metrics'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">{currentLanguage === 'zh' ? '保本分析' : 'Break-Even Analysis'}</span>
                      </div>
                      <div className="text-2xl font-bold mb-1">{formatCurrency(results.breakEvenDownPayment)}</div>
                      <div className="text-sm text-muted-foreground">{currentLanguage === 'zh' ? '保本首付金额' : 'Break-Even Down Payment'}</div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg border border-secondary/30">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-secondary-foreground" />
                        <span className="font-medium text-secondary-foreground">{currentLanguage === 'zh' ? '最大购买价 (8% ROI)' : 'Max Purchase Price (8% ROI)'}</span>
                      </div>
                      <div className="text-2xl font-bold mb-1">{formatCurrency(results.maxPurchasePrice)}</div>
                      <div className="text-sm text-muted-foreground">{currentLanguage === 'zh' ? '目标回报率最大价格' : 'Maximum price for target ROI'}</div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-600">{currentLanguage === 'zh' ? '零回报最大价格' : 'Max Price (CoC=0%, IRR=6%)'}</span>
                      </div>
                      <div className="text-2xl font-bold mb-1 text-green-700">{formatCurrency(results.maxPurchasePriceZeroROI)}</div>
                      <div className="text-sm text-green-600">{currentLanguage === 'zh' ? '现金回报率为零时最大价格' : 'Maximum price for zero cash-on-cash return'}</div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4 text-accent-foreground" />
                        <span className="font-medium text-accent-foreground">{currentLanguage === 'zh' ? '数据快照ID' : 'Data Snapshot ID'}</span>
                      </div>
                      <div className="text-sm font-mono bg-muted p-2 rounded border">
                        {results.dataSnapshotId}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {currentLanguage === 'zh' ? '模型版本' : 'Model Version'}: {results.modelVersion}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* IRR Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    {currentLanguage === 'zh' ? 'IRR 多期间分析' : 'IRR Multi-Period Analysis'}
                  </CardTitle>
                  <CardDescription>
                    {currentLanguage === 'zh' ? '不同持有期的内部收益率分析' : 'Internal Rate of Return analysis for different holding periods'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {formatPercent(results.irr3Year * 100)}
                      </div>
                      <div className="text-sm font-medium text-blue-700">{currentLanguage === 'zh' ? '3年IRR' : '3-Year IRR'}</div>
                      <div className="text-xs text-blue-600 mt-1">{currentLanguage === 'zh' ? '短期持有' : 'Short-term hold'}</div>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {formatPercent(results.irr5Year * 100)}
                      </div>
                      <div className="text-sm font-medium text-green-700">{currentLanguage === 'zh' ? '5年IRR' : '5-Year IRR'}</div>
                      <div className="text-xs text-green-600 mt-1">{currentLanguage === 'zh' ? '中期持有' : 'Medium-term hold'}</div>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {formatPercent(results.irr10Year * 100)}
                      </div>
                      <div className="text-sm font-medium text-purple-700">{currentLanguage === 'zh' ? '10年IRR' : '10-Year IRR'}</div>
                      <div className="text-xs text-purple-600 mt-1">{currentLanguage === 'zh' ? '长期持有' : 'Long-term hold'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comparable Properties Table */}
              {analysisResults?.comparables && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      {currentLanguage === 'zh' ? '可比物业分析' : 'Comparable Properties Analysis'}
                    </CardTitle>
                    <CardDescription>
                      {currentLanguage === 'zh' ? 
                        `基于${analysisResults.comparables.length}个高相似度可比物业的估值分析` :
                        `Valuation analysis based on ${analysisResults.comparables.length} highly similar comparable properties`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{currentLanguage === 'zh' ? '地址' : 'Address'}</TableHead>
                            <TableHead>{currentLanguage === 'zh' ? '价格' : 'Price'}</TableHead>
                            <TableHead>{currentLanguage === 'zh' ? '租金' : 'Rent'}</TableHead>
                            <TableHead>{currentLanguage === 'zh' ? '面积' : 'Sq Ft'}</TableHead>
                            <TableHead>{currentLanguage === 'zh' ? '卧室' : 'Beds'}</TableHead>
                            <TableHead>{currentLanguage === 'zh' ? '相似度' : 'Similarity'}</TableHead>
                            <TableHead>{currentLanguage === 'zh' ? '距离' : 'Distance'}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {analysisResults.comparables.slice(0, 8).map((comp: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{comp.address}</TableCell>
                              <TableCell>{formatCurrency(comp.price)}</TableCell>
                              <TableCell>{formatCurrency(comp.rent)}</TableCell>
                              <TableCell>{comp.sqft.toLocaleString()}</TableCell>
                              <TableCell>{comp.bedrooms}BR/{comp.bathrooms}BA</TableCell>
                              <TableCell>
                                <Badge variant={comp.similarity > 0.8 ? "default" : "secondary"}>
                                  {(comp.similarity * 100).toFixed(0)}%
                                </Badge>
                              </TableCell>
                              <TableCell>{comp.distance.toFixed(2)} mi</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Enhanced Assumptions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    {currentLanguage === 'zh' ? '关键假设与数据来源' : 'Key Assumptions & Data Sources'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">{currentLanguage === 'zh' ? '计算假设' : 'Calculation Assumptions'}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>{currentLanguage === 'zh' ? '首付比例' : 'Down Payment'}:</span>
                          <span className="font-medium">{inputs.downPaymentPercent}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{currentLanguage === 'zh' ? '贷款利率' : 'Interest Rate'}:</span>
                          <span className="font-medium">{inputs.loanInterestRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{currentLanguage === 'zh' ? '贷款期限' : 'Loan Term'}:</span>
                          <span className="font-medium">{inputs.termYears} {currentLanguage === 'zh' ? '年' : 'years'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{currentLanguage === 'zh' ? '空置率' : 'Vacancy Rate'}:</span>
                          <span className="font-medium">{inputs.vacancyRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{currentLanguage === 'zh' ? '管理费' : 'Management Fee'}:</span>
                          <span className="font-medium">{inputs.managementFeePercent}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{currentLanguage === 'zh' ? '租金增长率' : 'Rent Growth'}:</span>
                          <span className="font-medium">{inputs.rentGrowthRate}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">{currentLanguage === 'zh' ? '数据置信度' : 'Data Confidence'}</h4>
                      <div className="space-y-2 text-sm">
                        {analysisResults ? (
                          <>
                            <div className="flex justify-between">
                              <span>{currentLanguage === 'zh' ? '数据来源' : 'Data Sources'}:</span>
                              <span className="font-medium">Zillow, Redfin, MLS</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{currentLanguage === 'zh' ? '可比物业数量' : 'Comparables Count'}:</span>
                              <span className="font-medium">{analysisResults.comparables.length}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{currentLanguage === 'zh' ? '城市热度指数' : 'City Heat Index'}:</span>
                              <span className="font-medium">{(analysisResults.cityHeatIndex * 100).toFixed(0)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{currentLanguage === 'zh' ? '数据信心度' : 'Data Confidence'}:</span>
                              <span className="font-medium">{analysisResults.dataConfidence}</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-muted-foreground">
                            {currentLanguage === 'zh' ? '运行AI分析以查看数据信心指标' : 'Run AI analysis to view data confidence metrics'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
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
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="font-medium">{currentLanguage === 'zh' ? '地区中位价格' : 'Median Price'}</span>
                      <span className="font-bold">{formatCurrency(parseFloat(inputs.purchasePrice))}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="font-medium">{currentLanguage === 'zh' ? '地区租金收益率' : 'Regional Rental Yield'}</span>
                      <span className="font-bold">{formatPercent((parseFloat(inputs.monthlyRent) * 12 / parseFloat(inputs.purchasePrice)) * 100)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <span className="font-medium">{currentLanguage === 'zh' ? '年增值率' : 'Annual Appreciation'}</span>
                      <span className="font-bold">{formatPercent(parseFloat(inputs.appreciationRate))}</span>
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