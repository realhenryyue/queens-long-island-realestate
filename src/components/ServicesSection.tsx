import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, TrendingUp, Shield, Key, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Home,
      titleKey: "services.buyingService.title",
      descriptionKey: "services.buyingService.description"
    },
    {
      icon: Users,
      titleKey: "services.firstTime.title",
      descriptionKey: "services.firstTime.description"
    },
    {
      icon: TrendingUp,
      titleKey: "services.investment.title",
      descriptionKey: "services.investment.description"
    },
    {
      icon: Shield,
      titleKey: "services.licensed.title",
      descriptionKey: "services.licensed.description"
    },
    {
      icon: Key,
      titleKey: "services.commercial.title",
      descriptionKey: "services.commercial.description"
    },
    {
      icon: Heart,
      titleKey: "services.bilingual.title",
      descriptionKey: "services.bilingual.description"
    }
  ];

  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elegant transition-smooth hover:-translate-y-1 bg-card/80 backdrop-blur-sm"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-primary">{t(service.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {t(service.descriptionKey)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};