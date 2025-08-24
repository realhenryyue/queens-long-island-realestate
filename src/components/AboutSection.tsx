import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Award, Clock, Users } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const AboutSection = () => {
  const { t } = useLanguage();
  
  const stats = [
    {
      icon: MapPin,
      value: t('stats.areas.value'),
      label: t('stats.areas.label'),
      description: t('stats.areas.description')
    },
    {
      icon: Award,
      value: t('stats.licensed.value'),
      label: t('stats.licensed.label'),
      description: t('stats.licensed.description')
    },
    {
      icon: Clock,
      value: t('stats.availability.value'),
      label: t('stats.availability.label'),
      description: t('stats.availability.description')
    },
    {
      icon: Users,
      value: t('stats.clients.value'),
      label: t('stats.clients.label'),
      description: t('stats.clients.description')
    }
  ];

  return (
    <section 
      id="about" 
      className="py-20 bg-background"
      aria-labelledby="about-heading"
      itemScope 
      itemType="https://schema.org/Person"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center space-y-4 mb-16">
          <h2 id="about-heading" className="text-4xl lg:text-5xl font-bold text-primary" itemProp="jobTitle">
            {t('about.title')}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto" itemProp="description">
            {t('about.subtitle')}
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Content */}
          <article className="space-y-8" itemProp="knowsAbout">
            <div className="space-y-6">
              <section className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">{t('about.localExpert.title')}</h3>
                <p className="text-muted-foreground leading-relaxed" itemProp="areaServed">
                  {t('about.localExpert.description')}
                </p>
              </section>
              
              <section className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">{t('about.bilingual.title')}</h3>
                <p className="text-muted-foreground leading-relaxed" itemProp="knowsLanguage">
                  {t('about.bilingual.description')}
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">{t('about.experience.title')}</h3>
                <p className="text-muted-foreground leading-relaxed" itemProp="workLocation">
                  {t('about.experience.description')}
                </p>
              </section>
            </div>
            
            <div className="pt-4">
              <Button 
                variant="cta" 
                size="lg"
                className="text-lg px-8 py-6"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('about.cta')}
              </Button>
            </div>
          </article>
          
          {/* Right Column - Stats */}
          <aside className="grid grid-cols-2 gap-6 mb-8" role="complementary" aria-label="Professional Statistics">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="text-center p-6 hover:shadow-card transition-smooth bg-gradient-to-br from-card to-secondary/30"
                itemScope 
                itemType="https://schema.org/QuantitativeValue"
              >
                <CardContent className="space-y-4 p-0">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <stat.icon className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary" itemProp="value">{stat.value}</div>
                    <div className="text-lg font-semibold text-foreground" itemProp="name">{stat.label}</div>
                    <div className="text-sm text-muted-foreground" itemProp="description">{stat.description}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
};