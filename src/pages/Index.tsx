import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { UnifiedSchema } from "@/components/UnifiedSchema";
import MarketAnalysisHub from "@/components/MarketAnalysisHub";
import ROICalculator from "@/components/ROICalculator";
import RealMediumContent from "@/components/RealMediumContent";
import SystemHealthMonitor from "@/components/SystemHealthMonitor";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

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
      {/* Comprehensive system health and optimization monitoring */}
      <SystemHealthMonitor />
      
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
        <section id="investment-analysis">
          <MarketAnalysisHub />
        </section>
        <section id="queens-real-estate">
          <ServicesSection />
        </section>
        <section id="manhattan-properties">
          <AboutSection />
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