import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Award, Clock, Users } from "lucide-react";

const stats = [
  {
    icon: MapPin,
    value: "3+",
    label: "Service Areas",
    description: "Queens, Long Island & NYC"
  },
  {
    icon: Award,
    value: "Licensed",
    label: "NY Agent",
    description: "Fully certified professional"
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Availability",
    description: "Always here when you need me"
  },
  {
    icon: Users,
    value: "100+",
    label: "Happy Clients",
    description: "Satisfied homeowners"
  }
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary">
                Why Choose Hongyu (Henry) Yue?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                As a licensed New York real estate agent with deep roots in Queens and Long Island, 
                I bring local expertise, cultural understanding, and bilingual communication to 
                every transaction.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">Local Market Expert</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Specializing in Queens and Long Island markets, I have intimate knowledge of 
                  neighborhoods, pricing trends, and investment opportunities. Whether you're 
                  looking in Flushing, Bayside, Nassau County, or anywhere in New York State, 
                  I'll guide you to the perfect property.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">Bilingual & Cultural Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I understand the unique needs of diverse communities and provide services 
                  in multiple languages. My cultural sensitivity and local connections help 
                  bridge communication gaps and ensure smooth transactions.
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
          <div className="grid grid-cols-2 gap-6">
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
      </div>
    </section>
  );
};