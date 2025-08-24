import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { UnifiedSchema } from "@/components/UnifiedSchema";
import { EnterpriseMetaTags } from "@/components/EnterpriseMetaTags";
import { PerformanceOptimizer } from "@/components/PerformanceOptimizer";
import { SEOValidator } from "@/components/SEOValidator";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { AdvancedSEOOptimizer } from "@/components/AdvancedSEOOptimizer";
import { GoogleComplianceOptimizer } from "@/components/GoogleComplianceOptimizer";
import { SEOActionPlan } from "@/components/SEOActionPlan";
import SimpleMediumContent from "@/components/SimpleMediumContent";
import { MediumSEOStrategy } from "@/components/MediumSEOStrategy";
import MarketAnalysisHub from "@/components/MarketAnalysisHub";
import ROICalculator from "@/components/ROICalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Essential SEO only - no blocking components */}
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
        <ServicesSection />
        <AboutSection />
        <MarketAnalysisHub />
        <ROICalculator />
        <SimpleMediumContent />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
