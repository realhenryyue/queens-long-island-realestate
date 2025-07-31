import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, TrendingUp, Shield, Key, Heart } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "纽约买房服务",
    description: "专业指导海外买房客户在皇后区、长岛及纽约州各地区购买优质房产，提供全方位纽约房地产服务。"
  },
  {
    icon: Users,
    title: "首次购房咨询",
    description: "为首次海外买房的客户提供专业支持，让纽约生活置业过程轻松无忧。"
  },
  {
    icon: TrendingUp,
    title: "房产投资分析",
    description: "提供全面的纽约房地产市场分析和房产估值，助您做出明智的投资决策。"
  },
  {
    icon: Shield,
    title: "持牌专业经纪",
    description: "纽约州持牌房地产经纪人，深度了解当地市场和法规，为您的纽约房产投资保驾护航。"
  },
  {
    icon: Key,
    title: "法拉盛商业楼推荐",
    description: "专注法拉盛商业楼投资机会，为投资者和租赁物业业主提供完整的房产管理服务。"
  },
  {
    icon: Heart,
    title: "双语贴心服务",
    description: "提供中英双语专属服务，深度理解华人客户需求，让您的纽约生活置业更加放心。"
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary">
            纽约房地产服务 - 专业海外买房投资指导
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            为海外买房客户、纽约房产投资者提供专业服务，覆盖法拉盛商业楼、曼哈顿地产等优质房源推荐
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