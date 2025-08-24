import React, { Suspense } from 'react';
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import MarketAnalysisHub from "@/components/MarketAnalysisHub";
import ROICalculator from "@/components/ROICalculator";
import BlogSection from "@/components/BlogSection";

// 加载指示器组件
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <h1 className="text-2xl font-bold text-primary">Henry Yue Real Estate</h1>
      <p className="text-muted-foreground">加载中... Loading...</p>
    </div>
  </div>
);

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

// 错误边界组件
class ErrorBoundaryWrapper extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4 p-8 max-w-2xl">
            <h1 className="text-3xl font-bold text-primary">Henry Yue Real Estate</h1>
            <h2 className="text-xl font-semibold text-secondary-foreground">岳泓宇房地产</h2>
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                纽约州持牌房地产经纪人 | Licensed NY Real Estate Agent
              </p>
              <div className="bg-card p-6 rounded-lg space-y-3 border">
                <div className="flex items-center justify-center gap-2">
                  <span>📞</span>
                  <a href="tel:+17187175210" className="text-primary font-semibold hover:underline">
                    (718) 717-5210
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span>✉️</span>
                  <a href="mailto:forangh@gmail.com" className="text-primary font-semibold hover:underline">
                    forangh@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span>📍</span>
                  <span className="text-muted-foreground">Queens • Long Island • NYC</span>
                </div>
              </div>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                刷新页面 / Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const Index = () => {
  return (
    <ErrorBoundaryWrapper>
      <div className="min-h-screen bg-background">
        <SEOHead />
        
        <main role="main">
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <MarketAnalysisHub />
          <ROICalculator />
          <BlogSection />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
    </ErrorBoundaryWrapper>
  );
};

export default Index;