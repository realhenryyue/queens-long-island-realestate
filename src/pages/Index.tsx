import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PerformanceOptimizer } from "@/components/PerformanceOptimizer";
import { GlobalSchema } from "@/components/GlobalSchema";
import { RichSnippets } from "@/components/RichSnippets";
import { ArticleSchema } from "@/components/ArticleSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { ProductSchema } from "@/components/ProductSchema";
import { AdvancedMetaTags } from "@/components/AdvancedMetaTags";
import { SocialMetaTags } from "@/components/SocialMetaTags";
import { SEOEnhancer } from "@/components/SEOEnhancer";
import { SEOContentStrategy } from "@/components/SEOContentStrategy";
import { TopAgentAnalysis } from "@/components/TopAgentAnalysis";
import MarketAnalysisHub from "@/components/MarketAnalysisHub";
import ROICalculator from "@/components/ROICalculator";
import BlogSection from "@/components/BlogSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <GlobalSchema />
      <RichSnippets pageType="home" />
      <ArticleSchema />
      <FAQSchema />
      <ProductSchema />
      <AdvancedMetaTags />
      <SocialMetaTags />
      <PerformanceOptimizer />
      <SEOEnhancer />
      
      <main role="main">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <MarketAnalysisHub />
        <ROICalculator />
        <BlogSection />
        <ContactSection />
      </main>
      
      {/* SEO Strategy Components - for internal reference */}
      <div className="hidden" aria-hidden="true">
        <SEOContentStrategy />
        <TopAgentAnalysis />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
