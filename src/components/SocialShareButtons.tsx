import { Share2, Facebook, MessageCircle, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const SocialShareButtons = () => {
  const { t } = useLanguage();
  
  const currentUrl = encodeURIComponent("https://www.realhenryyue.com");
  const shareTitle = encodeURIComponent(t('seo.shareTitle'));
  const shareDescription = encodeURIComponent(t('seo.shareDescription'));

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
            <head><title>${t('share.wechatQR')}</title></head>
            <body style="text-align:center; padding:20px;">
              <h3>${t('share.wechatQR')}</h3>
              <img src="${url}" alt="WeChat QR Code" />
              <p>${t('share.wechatScan')}</p>
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
      <span className="text-sm text-muted-foreground mr-2">{t('share.text')}</span>
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