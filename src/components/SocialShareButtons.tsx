import { Share2, Facebook, MessageCircle, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SocialShareButtons = () => {
  const currentUrl = encodeURIComponent("https://www.realhenryyue.com");
  const shareTitle = encodeURIComponent("Henry岳先生 | 纽约华人地产经纪 | 专业海外买房投资服务");
  const shareDescription = encodeURIComponent("专业纽约房地产经纪人，提供海外买房、纽约房产投资、法拉盛商业楼推荐等服务");

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      color: "hover:bg-blue-600"
    },
    {
      name: "Twitter",
      icon: Twitter, 
      url: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareTitle}`,
      color: "hover:bg-sky-500"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
      color: "hover:bg-blue-700"
    },
    {
      name: "WeChat",
      icon: MessageCircle,
      url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${currentUrl}`,
      color: "hover:bg-green-600"
    }
  ];

  const handleShare = (url: string, name: string) => {
    if (name === "WeChat") {
      // For WeChat, show QR code in a popup
      const newWindow = window.open("", "_blank", "width=300,height=300");
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>微信分享</title></head>
            <body style="text-align:center; padding:20px;">
              <h3>扫描二维码分享到微信</h3>
              <img src="${url}" alt="WeChat QR Code" />
              <p>用微信扫描二维码分享</p>
            </body>
          </html>
        `);
      }
    } else {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-muted-foreground mr-2">分享:</span>
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="outline"
          size="sm"
          className={`${link.color} transition-smooth`}
          onClick={() => handleShare(link.url, link.name)}
          aria-label={`Share on ${link.name}`}
        >
          <link.icon className="w-4 h-4" />
        </Button>
      ))}
    </div>
  );
};