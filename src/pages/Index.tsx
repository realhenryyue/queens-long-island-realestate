import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { UnifiedSchema } from "@/components/UnifiedSchema";

import { PerformanceOptimizer } from "@/components/PerformanceOptimizer";
import MarketAnalysisHub from "@/components/MarketAnalysisHub";
import ROICalculator from "@/components/ROICalculator";
import BlogSection from "@/components/BlogSection";
import ComprehensiveSEO from "@/components/ComprehensiveSEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Main content */}
      <main role="main">
        {/* Enterprise-Level SEO Components */}
        <ComprehensiveSEO />
        <UnifiedSchema />
        <PerformanceOptimizer />
        
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
  );
};

export default Index;
