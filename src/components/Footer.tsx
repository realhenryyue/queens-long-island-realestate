import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import EmailObfuscator from "@/components/EmailObfuscator";

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer 
      className="bg-primary text-primary-foreground py-12"
      itemScope 
      itemType="https://schema.org/Organization"
      role="contentinfo"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" itemProp="name">{t('footer.name')}</h3>
            <p className="text-primary-foreground/80" itemProp="description">
              {t('footer.title')}
            </p>
            <address className="space-y-2 not-italic" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <div className="flex items-center gap-2 leading-none">
                <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <a 
                  href="tel:7187175210" 
                  className="hover:text-accent transition-smooth leading-none inline-block"
                  itemProp="telephone"
                  aria-label="Call Henry Yue at (718) 717-5210"
                >
                  (718) 717-5210
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <EmailObfuscator 
                  user="RealHenryYue" 
                  domain="gmail" 
                  tld="com" 
                  className="hover:text-accent transition-smooth" 
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span itemProp="areaServed">Queens • Long Island • New York</span>
              </div>
            </address>
          </div>
          
          {/* Services */}
          <nav className="space-y-4" aria-label="Services Navigation">
            <h3 className="text-xl font-semibold">{t('footer.services')}</h3>
            <ul className="space-y-2 text-primary-foreground/80" itemProp="makesOffer" itemScope itemType="https://schema.org/Offer">
              <li itemProp="itemOffered">{t('footer.services.residential')}</li>
              <li itemProp="itemOffered">{t('footer.services.firstTime')}</li>
              <li itemProp="itemOffered">{t('footer.services.analysis')}</li>
              <li itemProp="itemOffered">{t('footer.services.management')}</li>
              <li itemProp="itemOffered">{t('footer.services.investment')}</li>
              <li itemProp="itemOffered">{t('footer.services.bilingual')}</li>
            </ul>
          </nav>
          
          {/* Office Locations */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{t('footer.offices')}</h3>
            <div className="space-y-4 text-primary-foreground/80" itemProp="location" itemScope itemType="https://schema.org/Place">
              <address className="not-italic" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <h4 className="font-medium text-primary-foreground">{t('footer.offices.team')}</h4>
                <p className="text-sm" itemProp="streetAddress">41-25 Kissena Blvd Suite 126</p>
                <p className="text-sm">
                  <span itemProp="addressLocality">Flushing</span>, 
                  <span itemProp="addressRegion">NY</span> 
                  <span itemProp="postalCode">11355</span>
                </p>
              </address>
              <address className="not-italic" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <h4 className="font-medium text-primary-foreground">{t('footer.offices.flushing')}</h4>
                <p className="text-sm" itemProp="streetAddress">39-07 Prince St #4D</p>
                <p className="text-sm">
                  <span itemProp="addressLocality">Flushing</span>, 
                  <span itemProp="addressRegion">NY</span> 
                  <span itemProp="postalCode">11354</span>
                </p>
              </address>
              <address className="not-italic" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <h4 className="font-medium text-primary-foreground">{t('footer.offices.greatNeck')}</h4>
                <p className="text-sm" itemProp="streetAddress">40 Cutter Mill Road Suite 400</p>
                <p className="text-sm">
                  <span itemProp="addressLocality">Great Neck</span>, 
                  <span itemProp="addressRegion">NY</span> 
                  <span itemProp="postalCode">11021</span>
                </p>
              </address>
            </div>
          </div>
          
          {/* WeChat QR Code */}
          <aside className="space-y-4" aria-label="WeChat Contact">
            <h3 className="text-xl font-semibold">{t('footer.wechatTitle')}</h3>
            <figure className="text-center space-y-3">
              <img 
                src="/lovable-uploads/913b3b6c-94b4-41bb-843a-d28cd0eed1a4.png" 
                alt={t('footer.wechatAlt')}
                className="w-24 h-24 mx-auto rounded-lg bg-white p-2"
                width={96}
                height={96}
                loading="lazy"
                decoding="async"
                itemProp="image"
              />
              <figcaption className="text-sm text-primary-foreground/80 leading-relaxed">
                {t('footer.wechat')}
              </figcaption>
            </figure>
          </aside>
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