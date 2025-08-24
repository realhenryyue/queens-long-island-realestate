import { Share2, Facebook, MessageCircle, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

export const SocialShareButtons = () => {
  const { t } = useLanguage();
  
  const currentUrl = "https://www.realhenryyue.com";
  const shareTitle = t('seo.shareTitle');
  const shareDescription = t('seo.shareDescription');

  const shareLinks = [
    {
      name: "Native Share",
      icon: Share2,
      url: "",
      color: "hover:bg-primary"
    },
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

  const handleNativeShare = async (platform?: string) => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Share.share({
          title: shareTitle,
          text: shareDescription,
          url: currentUrl,
          dialogTitle: t('share.text')
        });
      } catch (error) {
        // Native share failed, falling back to web share
        handleWebShare(platform);
      }
    } else {
      handleWebShare(platform);
    }
  };

  const handleWebShare = (platform?: string) => {
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    
    if (platform === "WeChat") {
      // For WeChat, show QR code in a popup
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}`;
      const newWindow = window.open('', '_blank', 'width=300,height=350');
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>${t('share.wechatQR')}</title>
              <style>
                body { text-align: center; padding: 20px; font-family: Arial, sans-serif; }
                h3 { color: #333; margin-bottom: 20px; }
                img { border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                p { color: #666; margin-top: 15px; }
              </style>
            </head>
            <body>
              <h3>${t('share.wechatQR')}</h3>
              <img src="${qrCodeUrl}" alt="WeChat QR Code" />
              <p>${t('share.wechatScan')}</p>
            </body>
          </html>
        `);
        newWindow.document.close();
      }
    } else if (platform === "Facebook") {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      if (shareUrl && shareUrl.trim() !== "") {
        window.open(shareUrl, '_blank');
      }
    } else if (platform === "Twitter") {
      const shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
      if (shareUrl && shareUrl.trim() !== "") {
        window.open(shareUrl, '_blank');
      }
    } else if (platform === "LinkedIn") {
      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      if (shareUrl && shareUrl.trim() !== "") {
        window.open(shareUrl, '_blank');
      }
    }
  };

  const handleShare = (url: string, name: string) => {
    if (name === "Native Share") {
      handleNativeShare();
    } else if (url && url.trim() !== "") {
      handleWebShare(name);
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