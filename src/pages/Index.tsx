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
import SEOValidation from "@/components/SEOValidation";
import LinkValidation from "@/components/LinkValidation";

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
      
      {/* Development Tools - Only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">🔧 Development Tools</h2>
            <div className="space-y-8">
              <SEOValidation />
              <LinkValidation />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
