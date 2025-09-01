import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import EmailObfuscator from "@/components/EmailObfuscator";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto URL with form data
    const subject = `Contact from ${formData.name} - Real Estate Inquiry`;
    const body = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message: ${formData.message}`;
    
    const targetEmail = `${'RealHenryYue'}@${'gmail'}.${'com'}`;
    const mailtoUrl = `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    
    toast({
      title: t('contact.form.email'),
      description: "Opening your email client...",
    });
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      id="contact" 
      className="py-20 bg-gradient-to-br from-primary/5 to-accent/5"
      aria-labelledby="contact-heading"
      itemScope 
      itemType="https://schema.org/ContactPage"
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-16 space-y-4">
          <h2 id="contact-heading" className="text-4xl lg:text-5xl font-bold text-primary">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </header>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <aside className="space-y-8" itemScope itemType="https://schema.org/ContactPoint">
            <Card className="shadow-card bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center gap-3">
                  <MessageCircle className="w-6 h-6" aria-hidden="true" />
                  {t('contact.getInTouch')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <address className="space-y-4 not-italic">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-semibold text-primary">{t('contact.callText')}</div>
                      <a 
                        href="tel:7187175210" 
                        className="text-lg text-foreground hover:text-primary transition-smooth"
                        itemProp="telephone"
                        aria-label="Call Henry Yue at (718) 717-5210"
                      >
                        (718) 717-5210
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-semibold text-primary">{t('contact.email')}</div>
                       <EmailObfuscator 
                        user="RealHenryYue" 
                        domain="gmail" 
                        tld="com" 
                        className="text-lg text-foreground hover:text-primary transition-smooth" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-semibold text-primary">{t('contact.serviceAreas')}</div>
                      <div className="text-lg text-foreground" itemProp="areaServed">Queens • Long Island • New York State</div>
                    </div>
                  </div>
                </address>
                
                <div className="pt-4">
                  <h4 className="font-semibold text-primary mb-3">{t('contact.bestTimes')}</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• {t('contact.weekdays')}</li>
                    <li>• {t('contact.weekends')}</li>
                    <li>• {t('contact.emergency')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </aside>
          
          {/* Contact Form */}
          <Card className="shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{t('contact.sendMessage')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                noValidate
                aria-label="Contact Henry Yue Real Estate Form"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      {t('contact.fullName')} <span className="text-destructive" aria-label="required">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background/50"
                      aria-describedby={formData.name ? undefined : "name-error"}
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      {t('contact.phoneNumber')}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-background/50"
                      autoComplete="tel"
                      aria-describedby="phone-helper"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    {t('contact.emailAddress')} <span className="text-destructive" aria-label="required">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background/50"
                    aria-describedby={formData.email ? undefined : "email-error"}
                    autoComplete="email"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    {t('contact.howCanHelp')} <span className="text-destructive" aria-label="required">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={t('contact.placeholder')}
                    className="bg-background/50"
                    aria-describedby={formData.message ? undefined : "message-error"}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg py-6 bg-gradient-primary text-primary-foreground hover:shadow-elegant transform hover:-translate-y-0.5 font-semibold"
                  aria-describedby="submit-helper"
                >
                  {t('contact.sendButton')}
                </Button>
                
                <div className="pt-4 border-t border-border">
                  <SocialShareButtons />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};