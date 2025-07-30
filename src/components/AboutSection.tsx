import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Award, Clock, Users, Building, Calendar } from "lucide-react";

const workExperience = [
  {
    title: 'Licensed Real Estate Salesperson at E Realty International Corp.',
    period: 'Jan 2025 - Present',
    location: 'New York, USA',
    type: 'Full time',
    description: 'Move on, Carry on. Focus on investment'
  },
  {
    title: 'Business Relationship Agent at Ideal Automotive Sales & Service',
    period: 'Nov 2023 - Present',
    location: 'New York, USA',
    type: 'Part time',
    description: 'Customer relationship maintenance'
  },
  {
    title: 'Licensed Real Estate Salesperson at J-HOME Realty',
    period: 'Jan 2024 - Jan 2025',
    location: 'New York, USA',
    type: 'Full time',
    description: 'It is my mission to find a satisfactory home for my clients.'
  },
  {
    title: 'CEO at Tianjin Zlon Culture Media Co., Ltd.',
    period: 'Mar 2018 - Oct 2023',
    location: 'Tianjin, China',
    type: 'Full time',
    description: 'Visual Design Marketing Manager - Culture. Media. Finance'
  },
  {
    title: 'General Manager at Beijing Huayigaote Technology Co., Ltd.',
    period: 'Apr 2014 - May 2017',
    location: 'Beijing, China',
    type: 'Full time',
    description: 'NEC Movie Projector Manager - Integrating limited resources to accomplish the impossible.'
  },
  {
    title: 'Product Manager at Shanghai WTi Information Technology Co., Ltd.',
    period: 'Jul 2009 - Apr 2014',
    location: 'Beijing/Hebei/Shandong, China',
    type: 'Full time',
    description: 'EPSON Home Projection Product Manager - Product sales and inventory management, develop marketing plan for the year, New customer development, team building, customer relationship maintenance.'
  }
];

export const AboutSection = () => {
  const stats = [
    {
      icon: MapPin,
      value: '3+',
      label: 'Service Areas',
      description: 'Queens, Long Island & NYC'
    },
    {
      icon: Award,
      value: 'Licensed',
      label: 'NY Agent',
      description: 'Fully certified professional'
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'Availability',
      description: 'Always here when you need me'
    },
    {
      icon: Users,
      value: '100+',
      label: 'Happy Clients',
      description: 'Satisfied homeowners'
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary">
            Why Choose Hongyu (Henry) Yue?
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            As a licensed New York real estate agent with deep roots in Queens and Long Island, I bring local expertise, cultural understanding, and bilingual communication to every transaction.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">Local Market Expert</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Specializing in Queens and Long Island markets, I have intimate knowledge of neighborhoods, pricing trends, and investment opportunities. Whether you're looking in Flushing, Bayside, Nassau County, or anywhere in New York State, I'll guide you to the perfect property.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">Bilingual & Cultural Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I understand the unique needs of diverse communities and provide services in multiple languages. My cultural sensitivity and local connections help bridge communication gaps and ensure smooth transactions.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">Professional Experience</h3>
                <p className="text-muted-foreground leading-relaxed">
                  With over 15 years of experience in sales, business development, and customer relationship management across technology and real estate sectors, I bring a comprehensive understanding of market dynamics and client needs.
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
                Schedule a Consultation
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
                        {job.title}
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