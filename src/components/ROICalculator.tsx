import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import jsPDF from 'jspdf';

ChartJS.register(ArcElement, Tooltip, Legend);

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    price: '',
    rent: '',
    tax: '',
    fee: '',
    rate: '6.5'
  });
  
  const [result, setResult] = useState<{ roi: number; annualRent: number; annualCost: number } | null>(null);
  const [showQR, setShowQR] = useState(false);

  // Detect language
  const lang = navigator.language.startsWith('zh') ? 'zh' : 'en';

  const i18n = {
    en: {
      title: "Real Estate ROI Calculator",
      price: "Purchase Price",
      rent: "Monthly Rent",
      tax: "Annual Property Tax",
      fee: "Monthly HOA/Maintenance",
      rate: "Loan Rate (%)",
      calc: "Calculate",
      roi: "Estimated ROI",
      pdf: "Export PDF",
      share: "WeChat Share",
      close: "Close"
    },
    zh: {
      title: "房地产投资回报计算器",
      price: "购房总价",
      rent: "月租金收入",
      tax: "每年地税",
      fee: "每月管理费/维修费",
      rate: "贷款利率 (%)",
      calc: "计算",
      roi: "预计年投资回报率",
      pdf: "导出 PDF",
      share: "微信分享",
      close: "关闭"
    }
  };

  const t = i18n[lang];

  const presets = {
    "Flushing": { price: 700000, rent: 2600, tax: 6000, fee: 300 },
    "Forest Hills": { price: 850000, rent: 3000, tax: 7000, fee: 450 },
    "Great Neck": { price: 950000, rent: 3200, tax: 8800, fee: 380 },
    "Hicksville": { price: 750000, rent: 2700, tax: 7400, fee: 250 },
    "Manhattan Midtown": { price: 1300000, rent: 4800, tax: 13000, fee: 900 }
  };

  const fillPreset = (region: string) => {
    const preset = presets[region as keyof typeof presets];
    setInputs({
      ...inputs,
      price: preset.price.toString(),
      rent: preset.rent.toString(),
      tax: preset.tax.toString(),
      fee: preset.fee.toString()
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateROI = () => {
    const price = parseFloat(inputs.price);
    const rent = parseFloat(inputs.rent);
    const tax = parseFloat(inputs.tax);
    const fee = parseFloat(inputs.fee);
    const rate = parseFloat(inputs.rate) / 100;

    if (!price || !rent || !tax || !rate) return;

    const downPayment = price * 0.3;
    const loanAmount = price * 0.7;
    const annualLoanInterest = loanAmount * rate;
    const annualRent = rent * 12;
    const annualCost = tax + (fee || 0) * 12 + annualLoanInterest;

    const roi = ((annualRent - annualCost) / downPayment) * 100;

    setResult({ roi, annualRent, annualCost });
  };

  const chartData = result ? {
    labels: ['Income', 'Cost'],
    datasets: [{
      data: [result.annualRent, result.annualCost],
      backgroundColor: ['hsl(142 76% 36%)', 'hsl(0 84% 60%)'],
      borderWidth: 0
    }]
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    }
  };

  const exportPDF = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text("Real Estate ROI Report", 10, 20);
    doc.setFontSize(12);
    doc.text("www.realhenryyue.com", 10, 30);
    
    doc.text(`Purchase Price: $${inputs.price}`, 10, 50);
    doc.text(`Monthly Rent: $${inputs.rent}`, 10, 60);
    doc.text(`Annual Tax: $${inputs.tax}`, 10, 70);
    doc.text(`Monthly Fee: $${inputs.fee}`, 10, 80);
    doc.text(`Loan Rate: ${inputs.rate}%`, 10, 90);
    
    if (result) {
      doc.text(`${t.roi}: ${result.roi.toFixed(2)}%`, 10, 110);
    }
    
    doc.save("roi-report.pdf");
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              {t.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Region Preset Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              {Object.keys(presets).map((region) => (
                <Button
                  key={region}
                  variant="outline"
                  size="sm"
                  onClick={() => fillPreset(region)}
                  className="text-sm"
                >
                  {region}
                </Button>
              ))}
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">{t.price}</Label>
                <Input
                  id="price"
                  type="number"
                  value={inputs.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="700000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rent">{t.rent}</Label>
                <Input
                  id="rent"
                  type="number"
                  value={inputs.rent}
                  onChange={(e) => handleInputChange('rent', e.target.value)}
                  placeholder="2600"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tax">{t.tax}</Label>
                <Input
                  id="tax"
                  type="number"
                  value={inputs.tax}
                  onChange={(e) => handleInputChange('tax', e.target.value)}
                  placeholder="6000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fee">{t.fee}</Label>
                <Input
                  id="fee"
                  type="number"
                  value={inputs.fee}
                  onChange={(e) => handleInputChange('fee', e.target.value)}
                  placeholder="300"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="rate">{t.rate}</Label>
                <Input
                  id="rate"
                  type="number"
                  step="0.1"
                  value={inputs.rate}
                  onChange={(e) => handleInputChange('rate', e.target.value)}
                  placeholder="6.5"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center">
              <Button onClick={calculateROI} size="lg">
                {t.calc}
              </Button>
            </div>

            {/* Results */}
            {result && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      {t.roi}: {result.roi.toFixed(2)}%
                    </p>
                  </div>
                  
                  {/* Chart */}
                  <div className="mt-6 max-w-md mx-auto">
                    <div className="h-64">
                      {chartData && (
                        <Doughnut data={chartData} options={chartOptions} />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={exportPDF} variant="outline">
                {t.pdf}
              </Button>
              
              <Dialog open={showQR} onOpenChange={setShowQR}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    {t.share}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <div className="text-center space-y-4">
                    <img 
                      src="/lovable-uploads/551665ae-4d12-46ac-a06f-b5c2e5ff4442.png" 
                      alt="WeChat QR Code"
                      className="w-48 h-48 mx-auto"
                    />
                    <Button onClick={() => setShowQR(false)}>
                      {t.close}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ROICalculator;