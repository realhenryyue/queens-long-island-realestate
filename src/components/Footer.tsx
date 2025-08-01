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
            <h3 className="text-xl font-semibold">Hongyu (Henry) Yue</h3>
            <p className="text-primary-foreground/80">
              Licensed New York Real Estate Agent
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
            <h3 className="text-xl font-semibold">Services</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Residential Sales</li>
              <li>First-Time Buyer Support</li>
              <li>Market Analysis</li>
              <li>Property Management</li>
              <li>Investment Properties</li>
              <li>Bilingual Services</li>
            </ul>
          </div>
          
          {/* Office Locations */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Office Locations</h3>
            <div className="space-y-4 text-primary-foreground/80">
              <div>
                <h4 className="font-medium text-primary-foreground">Team Office</h4>
                <p className="text-sm">41-25 Kissena Blvd Suite 126</p>
                <p className="text-sm">Flushing, NY 11355</p>
              </div>
              <div>
                <h4 className="font-medium text-primary-foreground">Flushing Office</h4>
                <p className="text-sm">39-07 Prince St #4D</p>
                <p className="text-sm">Flushing, NY 11354</p>
              </div>
              <div>
                <h4 className="font-medium text-primary-foreground">Great Neck Office</h4>
                <p className="text-sm">40 Cutter Mill Road Suite 400</p>
                <p className="text-sm">Great Neck, NY 11021</p>
              </div>
            </div>
          </div>
          
          {/* WeChat QR Code */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">WeChat Contact</h3>
            <div className="text-center space-y-3">
              <img 
                src="/lovable-uploads/913b3b6c-94b4-41bb-843a-d28cd0eed1a4.png" 
                alt="Henry Yue WeChat QR Code"
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
              © 2024 Hongyu (Henry) Yue Real Estate. Licensed New York Real Estate Agent.
            </p>
            <p className="text-primary-foreground/60">
              Equal Housing Opportunity
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};