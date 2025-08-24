import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Star, TrendingUp, Calculator, Home } from "lucide-react";
import agentPhoto from "@/assets/agent-photo.jpg";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageToggle } from "@/components/LanguageToggle";

export const HeroSection = () => {
  const { t, currentLanguage } = useLanguage();

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary/90 to-primary/70">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-white space-y-6">
            {/* Slogan */}
            <div className="text-center lg:text-left mb-8">
              <div className="text-lg lg:text-xl font-medium text-accent tracking-wide">
                {t('hero.slogan')}
              </div>
            </div>
            
            <div className="space-y-4">
              <header>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  {t('hero.title')}
                </h1>
              </header>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-6 text-lg"
              >
                <Calculator className="w-5 h-5 mr-2" />
                {currentLanguage === 'zh' ? '投资分析工具' : 'Investment Analysis Tool'}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary"
                onClick={handleContactClick}
              >
                <Phone className="w-5 h-5 mr-2" />
                {currentLanguage === 'zh' ? '免费咨询' : 'Free Consultation'}
              </Button>
            </div>
          </div>
          
          {/* Right Column - Agent Photo Card */}
          <div className="flex justify-center lg:justify-end">
            <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-xl max-w-sm">
              <div className="text-center space-y-6">
                <div className="relative">
                   <img 
                    src={agentPhoto} 
                    alt={t('hero.agentAlt')}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                    width={128}
                    height={128}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {t('hero.agent')}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary">
                    {t('hero.agentName')}
                  </h3>
                  <p className="text-muted-foreground font-medium">
                    {t('hero.agentTitle')}
                  </p>
                </div>
                
                {/* Contact info */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{t('hero.locations')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4 text-accent" />
                    <a href="tel:+17187175210" className="hover:text-accent">
                      (718) 717-5210
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4 text-accent" />
                    <a href="mailto:forangh@gmail.com" className="hover:text-accent">
                      forangh@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};