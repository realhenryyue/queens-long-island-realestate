import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { UnifiedSchema } from "@/components/UnifiedSchema";
import MarketAnalysisHub from "@/components/MarketAnalysisHub";
import ROICalculator from "@/components/ROICalculator";
import RealMediumContent from "@/components/RealMediumContent";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const location = useLocation();
  const { currentLanguage } = useLanguage();
  const mortgagePlannerUrl = currentLanguage === "zh"
    ? "/Henry_Yue_Mortgage_Planner_zh.html"
    : "/Henry_Yue_Mortgage_Planner.html";
  const mortgageFrameRef = useRef<HTMLIFrameElement>(null);
  const mortgageResizeObserverRef = useRef<ResizeObserver | null>(null);
  const [mortgageFrameHeight, setMortgageFrameHeight] = useState(2400);

  const resizeMortgageFrame = () => {
    const documentElement = mortgageFrameRef.current?.contentDocument?.documentElement;
    if (!documentElement) return;
    setMortgageFrameHeight(documentElement.scrollHeight);
    mortgageResizeObserverRef.current?.disconnect();
    mortgageResizeObserverRef.current = new ResizeObserver(() => {
      setMortgageFrameHeight(documentElement.scrollHeight);
    });
    mortgageResizeObserverRef.current.observe(documentElement);
  };

  useEffect(() => () => mortgageResizeObserverRef.current?.disconnect(), []);

  // Handle hash-based navigation for deep links
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      {/* Essential SEO only */}
      <UnifiedSchema />
      
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      
      <main role="main" id="main-content">
        <HeroSection />
        <section id="mortgage-rates" className="bg-background scroll-mt-24">
          <div id="monthly-payment-calculator" className="scroll-mt-24" />
          <iframe
            ref={mortgageFrameRef}
            key={mortgagePlannerUrl}
            src={mortgagePlannerUrl}
            title={currentLanguage === "zh" ? "Henry Yue 房贷月供计算器" : "Henry Yue Mortgage Payment Planner"}
            className="block w-full border-0"
            style={{ height: `${mortgageFrameHeight}px` }}
            onLoad={resizeMortgageFrame}
            loading="eager"
          />
        </section>
        <section id="queens-real-estate">
          <ServicesSection />
        </section>
        <section id="manhattan-properties">
          <AboutSection />
        </section>
        <section id="investment-analysis">
          <MarketAnalysisHub />
        </section>
        <section id="roi-calculator">
          <ROICalculator />
        </section>
        <section id="blog">
          <RealMediumContent />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;