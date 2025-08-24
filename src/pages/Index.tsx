import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import MarketAnalysisHub from "@/components/MarketAnalysisHub";
import ROICalculator from "@/components/ROICalculator";
import BlogSection from "@/components/BlogSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      
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