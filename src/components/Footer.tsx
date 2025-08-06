import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{t('footer.name')}</h3>
            <p className="text-primary-foreground/80">
              {t('footer.title')}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:7187175210" className="hover:text-accent transition-smooth">
                  (718) 717-5210
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:forangh@gmail.com" className="hover:text-accent transition-smooth">
                  forangh@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Queens • Long Island • New York</span>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{t('footer.services')}</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>{t('footer.services.residential')}</li>
              <li>{t('footer.services.firstTime')}</li>
              <li>{t('footer.services.analysis')}</li>
              <li>{t('footer.services.management')}</li>
              <li>{t('footer.services.investment')}</li>
              <li>{t('footer.services.bilingual')}</li>
            </ul>
          </div>
          
          {/* Office Locations */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{t('footer.offices')}</h3>
            <div className="space-y-4 text-primary-foreground/80">
              <div>
                <h4 className="font-medium text-primary-foreground">{t('footer.offices.team')}</h4>
                <p className="text-sm">41-25 Kissena Blvd Suite 126</p>
                <p className="text-sm">Flushing, NY 11355</p>
              </div>
              <div>
                <h4 className="font-medium text-primary-foreground">{t('footer.offices.flushing')}</h4>
                <p className="text-sm">39-07 Prince St #4D</p>
                <p className="text-sm">Flushing, NY 11354</p>
              </div>
              <div>
                <h4 className="font-medium text-primary-foreground">{t('footer.offices.greatNeck')}</h4>
                <p className="text-sm">40 Cutter Mill Road Suite 400</p>
                <p className="text-sm">Great Neck, NY 11021</p>
              </div>
            </div>
          </div>
          
          {/* WeChat QR Code */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{t('footer.wechatTitle')}</h3>
            <div className="text-center space-y-3">
              <img 
                src="/lovable-uploads/913b3b6c-94b4-41bb-843a-d28cd0eed1a4.png" 
                alt={t('footer.wechatAlt')}
                className="w-24 h-24 mx-auto rounded-lg bg-white p-2"
              />
              <p className="text-sm text-primary-foreground/80 leading-relaxed">
                {t('footer.wechat')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60">
              {t('footer.copyright')}
            </p>
            <p className="text-primary-foreground/60">
              {t('footer.equalHousing')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};