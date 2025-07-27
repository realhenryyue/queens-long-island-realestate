import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, TrendingUp, Shield, Key, Heart } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Sales",
    description: "Expert guidance for buying and selling homes across Queens, Long Island, and all of New York State."
  },
  {
    icon: Users,
    title: "First-Time Buyers",
    description: "Specialized support for first-time homebuyers, making the process smooth and stress-free."
  },
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description: "Comprehensive market insights and property valuations to help you make informed decisions."
  },
  {
    icon: Shield,
    title: "Licensed Professional",
    description: "Fully licensed New York real estate agent with deep knowledge of local markets and regulations."
  },
  {
    icon: Key,
    title: "Property Management",
    description: "Complete property management services for investors and rental property owners."
  },
  {
    icon: Heart,
    title: "Personalized Service",
    description: "Dedicated one-on-one attention with bilingual support and cultural understanding."
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary">
            Complete Real Estate Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From first-time buyers to seasoned investors, I provide comprehensive 
            real estate services across Queens, Long Island, and all of New York State.
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
                <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};