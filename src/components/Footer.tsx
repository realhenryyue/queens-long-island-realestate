import { Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
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
          
          {/* Areas */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Service Areas</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Queens (All Neighborhoods)</li>
              <li>Long Island (Nassau & Suffolk)</li>
              <li>Manhattan</li>
              <li>Brooklyn</li>
              <li>Bronx</li>
              <li>Anywhere in New York State</li>
            </ul>
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