import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TikTokIcon, DouyinIcon } from "@/components/icons/TikTokIcon";

const socialPlatforms = [
  {
    name: "LinkedIn",
    url: "http://linkedin.com/in/hongyu-yue-85232191",
    icon: Linkedin,
    color: "text-[#0077b5] hover:text-[#0077b5] hover:scale-110"
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@realhenryyue",
    icon: TikTokIcon,
    color: "text-[#000000] hover:text-[#000000] hover:scale-110"
  },
  {
    name: "Facebook", 
    url: "https://www.facebook.com/share/1EfZ9iTfqa/",
    icon: Facebook,
    color: "text-[#1877f2] hover:text-[#1877f2] hover:scale-110"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/realhenryyue",
    icon: Instagram,
    color: "text-[#e4405f] hover:text-[#e4405f] hover:scale-110"
  },
  {
    name: "Xiaohongshu",
    url: "https://www.xiaohongshu.com/user/profile/65d657c9000000000503202b",
    icon: MessageCircle,
    color: "text-[#fe2c55] hover:text-[#fe2c55] hover:scale-110"
  },
  {
    name: "Douyin",
    url: "https://v.douyin.com/i5JLpoT9/",
    icon: DouyinIcon,
    color: "text-[#25f4ee] hover:text-[#25f4ee] hover:scale-110"
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
            className={`w-8 h-8 p-0 transition-all duration-200 ${platform.color}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Clicking social media:', platform.name, 'URL:', platform.url);
              if (platform.url && platform.url.trim() !== "" && platform.url.startsWith('http')) {
                window.open(platform.url, '_blank', 'noopener,noreferrer');
              } else {
                console.error('Invalid social media URL:', platform.url);
              }
            }}
            title={platform.name}
          >
            <IconComponent className="w-4 h-4" />
          </Button>
        );
      })}
    </div>
  );
};