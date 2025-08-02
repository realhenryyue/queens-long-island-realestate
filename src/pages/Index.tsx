import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PerformanceOptimizer } from "@/components/PerformanceOptimizer";
import { SEOEnhancer } from "@/components/SEOEnhancer";
import { SEOContentStrategy } from "@/components/SEOContentStrategy";
import { TopAgentAnalysis } from "@/components/TopAgentAnalysis";
import { LocalMarketContent } from "@/components/content/LocalMarketContent";
import { EducationalContent } from "@/components/content/EducationalContent";
import { DataDrivenContent } from "@/components/content/DataDrivenContent";
import { SearchComponent } from "@/components/SearchComponent";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <PerformanceOptimizer />
      <SEOEnhancer />
      <HeroSection />
      <SearchComponent />
      <LocalMarketContent />
      <EducationalContent />
      <DataDrivenContent />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      
      {/* SEO Strategy Components - for internal reference */}
      <div className="hidden">
        <SEOContentStrategy />
        <TopAgentAnalysis />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
