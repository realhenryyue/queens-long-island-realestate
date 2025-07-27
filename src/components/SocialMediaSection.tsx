import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Facebook, Instagram, Linkedin, Video, MessageCircle } from "lucide-react";

const socialPlatforms = [
  {
    name: "Xiaohongshu",
    description: "Follow my real estate tips and market insights",
    url: "https://www.xiaohongshu.com/user/profile/65d657c9000000000503202b",
    color: "bg-red-500",
    textColor: "text-red-600",
    icon: MessageCircle,
    iconBg: "hover:bg-red-500"
  },
  {
    name: "Facebook", 
    description: "Connect with me for community updates",
    url: "https://www.facebook.com/share/1EfZ9iTfqa/",
    color: "bg-blue-600",
    textColor: "text-blue-600",
    icon: Facebook,
    iconBg: "hover:bg-blue-600"
  },
  {
    name: "Instagram",
    description: "See my latest property features and behind-the-scenes",
    url: "https://www.instagram.com/realhenryyue",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    textColor: "text-purple-600",
    icon: Instagram,
    iconBg: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
  },
  {
    name: "LinkedIn",
    description: "Professional network and industry insights",
    url: "http://linkedin.com/in/hongyu-yue-85232191",
    color: "bg-blue-700",
    textColor: "text-blue-700",
    icon: Linkedin,
    iconBg: "hover:bg-blue-700"
  },
  {
    name: "TikTok",
    description: "Quick real estate tips and market trends",
    url: "https://www.tiktok.com/@realhenryyue",
    color: "bg-black",
    textColor: "text-gray-800",
    icon: Video,
    iconBg: "hover:bg-black"
  },
  {
    name: "Douyin",
    description: "Chinese platform for real estate content",
    url: "https://v.douyin.com/i5JLpoT9/",
    color: "bg-gray-800",
    textColor: "text-gray-700",
    icon: Video,
    iconBg: "hover:bg-gray-800"
  }
];

export const SocialMediaSection = () => {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary">
            Follow Me on Social Media
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest market trends, property features, and real estate tips 
            across multiple platforms. I share valuable insights in both English and Chinese.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {socialPlatforms.map((platform, index) => {
            const IconComponent = platform.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-elegant transition-smooth hover:-translate-y-1 bg-card/80 backdrop-blur-sm cursor-pointer"
                onClick={() => window.open(platform.url, '_blank')}
              >
                <CardHeader className="pb-4">
                  <CardTitle className={`text-xl ${platform.textColor} flex items-center gap-3`}>
                    <div className={`w-12 h-12 rounded-full ${platform.color} flex items-center justify-center ${platform.iconBg} transition-smooth group-hover:scale-110`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {platform.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {platform.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-primary font-medium group-hover:text-accent transition-smooth">
                    <ExternalLink className="w-4 h-4" />
                    Click to follow
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Card className="inline-block p-6 bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold text-primary mb-2">
                🎯 Stay Connected for Market Updates
              </h3>
              <p className="text-muted-foreground">
                Get real-time market insights, new listings, and exclusive opportunities 
                by following me on your preferred platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};