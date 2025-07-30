import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Award, Clock, Users, Building, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const workExperience = [
  {
    title: 'experience.realEstate1',
    period: 'Jan 2025 - Present',
    location: 'New York, USA',
    type: 'Full time',
    description: 'Move on, Carry on. Focus on investment'
  },
  {
    title: 'experience.businessAgent',
    period: 'Nov 2023 - Present',
    location: 'New York, USA',
    type: 'Part time',
    description: 'Customer relationship maintenance'
  },
  {
    title: 'experience.realEstate2',
    period: 'Jan 2024 - Jan 2025',
    location: 'New York, USA',
    type: 'Full time',
    description: 'It is my mission to find a satisfactory home for my clients.'
  },
  {
    title: 'experience.ceo',
    period: 'Mar 2018 - Oct 2023',
    location: 'Tianjin, China',
    type: 'Full time',
    description: 'Visual Design Marketing Manager - Culture. Media. Finance'
  },
  {
    title: 'experience.generalManager',
    period: 'Apr 2014 - May 2017',
    location: 'Beijing, China',
    type: 'Full time',
    description: 'NEC Movie Projector Manager - Integrating limited resources to accomplish the impossible.'
  },
  {
    title: 'experience.productManager',
    period: 'Jul 2009 - Apr 2014',
    location: 'Beijing/Hebei/Shandong, China',
    type: 'Full time',
    description: 'EPSON Home Projection Product Manager - Product sales and inventory management, develop marketing plan for the year, New customer development, team building, customer relationship maintenance.'
  }
];

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
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary">
            {t('about.title')}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">{t('about.localExpert.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.localExpert.description')}
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">{t('about.bilingual.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.bilingual.description')}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">{t('about.experience.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.experience.description')}
                </p>
              </div>
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
          </div>
          
          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-card transition-smooth bg-gradient-to-br from-card to-secondary/30">
                <CardContent className="space-y-4 p-0">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-lg font-semibold text-foreground">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-primary text-center mb-12">Professional Journey</h3>
          <div className="space-y-6">
            {workExperience.map((job, index) => (
              <Card key={index} className="p-6 hover:shadow-card transition-smooth">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-primary mb-2">
                        {t(job.title)}
                      </h4>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {job.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {job.type}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};