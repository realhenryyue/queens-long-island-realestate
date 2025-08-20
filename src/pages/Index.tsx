import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { StructuredDataManager } from "@/components/StructuredDataManager";
import { MetaTagManager } from "@/components/MetaTagManager";
import { PerformanceOptimizer } from "@/components/PerformanceOptimizer";
import { SEOReport } from "@/components/SEOReport";
import MarketAnalysisHub from "@/components/MarketAnalysisHub";
import ROICalculator from "@/components/ROICalculator";
import BlogSection from "@/components/BlogSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Essential SEO Components */}
      <StructuredDataManager />
      <MetaTagManager />
      <PerformanceOptimizer />
      <SEOReport />
      
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
