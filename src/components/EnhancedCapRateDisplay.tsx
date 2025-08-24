import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface EnhancedCapRateDisplayProps {
  capRate: number;
  isHighlighted?: boolean;
  size?: 'small' | 'medium' | 'large' | 'enterprise';
  showBenchmark?: boolean;
}

export const EnhancedCapRateDisplay: React.FC<EnhancedCapRateDisplayProps> = ({
  capRate,
  isHighlighted = false,
  size = 'medium',
  showBenchmark = true
}) => {
  const { currentLanguage } = useLanguage();

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const getCapRateAnalysis = (rate: number) => {
    if (rate >= 6) return { level: 'excellent', color: 'text-green-600', bg: 'bg-green-50', label: currentLanguage === 'zh' ? '优秀' : 'Excellent' };
    if (rate >= 4) return { level: 'good', color: 'text-blue-600', bg: 'bg-blue-50', label: currentLanguage === 'zh' ? '良好' : 'Good' };
    if (rate >= 2) return { level: 'fair', color: 'text-yellow-600', bg: 'bg-yellow-50', label: currentLanguage === 'zh' ? '一般' : 'Fair' };
    return { level: 'poor', color: 'text-red-600', bg: 'bg-red-50', label: currentLanguage === 'zh' ? '较差' : 'Poor' };
  };

  const analysis = getCapRateAnalysis(capRate);

  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl',
    enterprise: 'text-4xl'
  };

  const containerClasses = {
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
    enterprise: 'p-8'
  };

  if (isHighlighted || size === 'enterprise') {
    return (
      <Card className={`${analysis.bg} border-2 ${analysis.color.replace('text-', 'border-')} ${isHighlighted ? 'animate-pulse' : ''} shadow-lg`}>
        <CardContent className={`${containerClasses[size]} text-center`}>
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className={`h-6 w-6 ${analysis.color}`} />
              <h3 className="text-lg font-semibold text-gray-800">
                {currentLanguage === 'zh' ? '资本化率 (Cap Rate)' : 'Capitalization Rate (Cap Rate)'}
              </h3>
            </div>
            
            <div className={`${sizeClasses[size]} font-bold ${analysis.color}`}>
              {formatPercent(capRate)}
            </div>
            
            <Badge variant="secondary" className={`${analysis.bg} ${analysis.color} font-semibold`}>
              {analysis.label}
            </Badge>
            
            {showBenchmark && (
              <div className="space-y-2 text-sm text-gray-600">
                <div className="border-t pt-2">
                  <p className="font-medium mb-1">
                    {currentLanguage === 'zh' ? '行业基准:' : 'Market Benchmarks:'}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-green-600">
                      {currentLanguage === 'zh' ? '优秀: ≥6%' : 'Excellent: ≥6%'}
                    </div>
                    <div className="text-blue-600">
                      {currentLanguage === 'zh' ? '良好: 4-6%' : 'Good: 4-6%'}
                    </div>
                    <div className="text-yellow-600">
                      {currentLanguage === 'zh' ? '一般: 2-4%' : 'Fair: 2-4%'}
                    </div>
                    <div className="text-red-600">
                      {currentLanguage === 'zh' ? '较差: <2%' : 'Poor: <2%'}
                    </div>
                  </div>
                </div>
                
                {capRate < 3 && (
                  <div className="flex items-center gap-1 text-orange-600 mt-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-xs font-medium">
                      {currentLanguage === 'zh' ? '建议谨慎投资' : 'Proceed with caution'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Standard display
  return (
    <div className={`text-center ${containerClasses[size]} bg-background rounded border`}>
      <div className={`${sizeClasses[size]} font-bold ${analysis.color}`}>
        {formatPercent(capRate)}
      </div>
      <p className="text-sm text-muted-foreground">
        {currentLanguage === 'zh' ? '资本化率' : 'Cap Rate'}
      </p>
      {showBenchmark && (
        <Badge variant="outline" className={`mt-1 text-xs ${analysis.color}`}>
          {analysis.label}
        </Badge>
      )}
    </div>
  );
};