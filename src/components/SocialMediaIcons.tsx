import { Facebook, Instagram, Linkedin, Video, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialPlatforms = [
  {
    name: "Xiaohongshu",
    url: "https://www.xiaohongshu.com/user/profile/65d657c9000000000503202b",
    icon: MessageCircle,
    color: "hover:text-red-500"
  },
  {
    name: "Facebook", 
    url: "https://www.facebook.com/share/1EfZ9iTfqa/",
    icon: Facebook,
    color: "hover:text-blue-600"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/realhenryyue",
    icon: Instagram,
    color: "hover:text-pink-500"
  },
  {
    name: "LinkedIn",
    url: "http://linkedin.com/in/hongyu-yue-85232191",
    icon: Linkedin,
    color: "hover:text-blue-700"
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@realhenryyue",
    icon: Video,
    color: "hover:text-gray-800"
  },
  {
    name: "Douyin",
    url: "https://v.douyin.com/i5JLpoT9/",
    icon: Video,
    color: "hover:text-gray-700"
  }
];

export const SocialMediaIcons = () => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {socialPlatforms.map((platform, index) => {
        const IconComponent = platform.icon;
        return (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`w-8 h-8 p-0 text-muted-foreground transition-colors ${platform.color}`}
            onClick={() => window.open(platform.url, '_blank')}
            title={platform.name}
          >
            <IconComponent className="w-4 h-4" />
          </Button>
        );
      })}
    </div>
  );
};