import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import agentPhoto from "@/assets/agent-photo.jpg";
import queensSkyline from "@/assets/queens-skyline.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SocialMediaIcons } from "@/components/SocialMediaIcons";

export const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${queensSkyline})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
      </div>
      
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
                MOVE ON, CARRY ON. 換個地方, 續寫傳奇.
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="accent" 
                size="lg"
                className="text-lg px-8 py-6"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Phone className="w-5 h-5" />
                Call Now: (718) 717-5210
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.contact')}
              </Button>
            </div>
          </div>
          
          {/* Right Column - Agent Photo Card */}
          <div className="flex justify-center lg:justify-end">
            <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-elegant max-w-sm">
              <div className="text-center space-y-6">
                <div className="relative">
                  <img 
                    src={agentPhoto} 
                    alt="Hongyu (Henry) Yue - Real Estate Agent"
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-card"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {t('hero.agent')}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary">Hongyu (Henry) Yue</h3>
                  <p className="text-muted-foreground font-medium">Licensed Real Estate Agent</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>Queens • Long Island • New York</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4 text-accent" />
                    <span>(718) 717-5210</span>
                  </div>
                   <div className="flex items-center gap-2 text-muted-foreground">
                     <Mail className="w-4 h-4 text-accent" />
                     <span>forangh@gmail.com</span>
                   </div>
                 </div>
                 
                 <SocialMediaIcons />
               </div>
             </Card>
          </div>
        </div>
      </div>
    </section>
  );
};