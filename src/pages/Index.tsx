import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { UnifiedSchema } from "@/components/UnifiedSchema";
import MarketAnalysisHub from "@/components/MarketAnalysisHub";
import ROICalculator from "@/components/ROICalculator";
import RealMediumContent from "@/components/RealMediumContent";
import UnifiedErrorFix from "@/components/UnifiedErrorFix";
import MobileOptimization from "@/components/MobileOptimization";
import UniversalCompatibility from "@/components/UniversalCompatibility";
import AccessibilityEnhancements from "@/components/AccessibilityEnhancements";
import ResponsiveLayout from "@/components/ResponsiveLayout";
import CrossBrowserFixes from "@/components/CrossBrowserFixes";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Comprehensive compatibility and optimization fixes */}
      <UnifiedErrorFix />
      <UniversalCompatibility />
      <ResponsiveLayout />
      <CrossBrowserFixes />
      <MobileOptimization />
      <AccessibilityEnhancements />
      
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
        <ServicesSection />
        <AboutSection />
        <MarketAnalysisHub />
        <ROICalculator />
        <RealMediumContent />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;