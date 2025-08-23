import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { UnifiedSchema } from "@/components/UnifiedSchema";
import { EnterpriseMetaTags } from "@/components/EnterpriseMetaTags";
import { ComprehensiveSEOAudit } from "@/components/ComprehensiveSEOAudit";
import { AdvancedSEOStrategy } from "@/components/AdvancedSEOStrategy";
import { PerformanceOptimizer } from "@/components/PerformanceOptimizer";
import MarketAnalysisHub from "@/components/MarketAnalysisHub";
import ROICalculator from "@/components/ROICalculator";
import BlogSection from "@/components/BlogSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Enterprise-Level SEO Components - 90+ Score Compliance */}
      <UnifiedSchema />
      <EnterpriseMetaTags />
      <AdvancedSEOStrategy page="home" />
      <PerformanceOptimizer />
      
      {/* SEO Audit Tool (Development/Admin) */}
      <div id="seo-audit-section" className="hidden">
        <ComprehensiveSEOAudit />
      </div>
      
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
  );
};

export default Index;
