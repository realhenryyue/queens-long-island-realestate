import { TestHeroSection } from "@/components/TestHeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TestHeroSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <SocialMediaSection />
      <Footer />
    </div>
  );
};

export default Index;
