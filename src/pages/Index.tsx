import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PerformanceOptimizer } from "@/components/PerformanceOptimizer";
import MarketAnalysisHub from "@/components/MarketAnalysisHub";
import ROICalculator from "@/components/ROICalculator";
import BlogSection from "@/components/BlogSection";

const Index = () => {
  try {
    return (
      <div className="min-h-screen bg-background">
        <SEOHead />
        <PerformanceOptimizer />
        
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
  } catch (error) {
    console.error('Index page error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Henry Yue Real Estate</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
};

export default Index;