import { Share2, Facebook, MessageCircle, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
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
        console.log('Native share failed, falling back to web share');
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
      // For WeChat, create QR code overlay in current page
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}`;
      
      // Create overlay div
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        cursor: pointer;
      `;
      
      overlay.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; max-width: 300px;">
          <h3 style="margin: 0 0 15px 0; color: #333;">${t('share.wechatQR')}</h3>
          <img src="${qrCodeUrl}" alt="WeChat QR Code" style="display: block; margin: 0 auto 15px;" />
          <p style="margin: 0; color: #666; font-size: 14px;">${t('share.wechatScan')}</p>
        </div>
      `;
      
      overlay.onclick = () => document.body.removeChild(overlay);
      document.body.appendChild(overlay);
    } else if (platform === "Facebook") {
      window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    } else if (platform === "Twitter") {
      window.location.href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    } else if (platform === "LinkedIn") {
      window.location.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    }
  };

  const handleShare = (url: string, name: string) => {
    if (name === "Native Share") {
      handleNativeShare();
    } else {
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