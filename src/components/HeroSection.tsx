import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Star, TrendingUp, Calculator, Home } from "lucide-react";
import agentPhoto from "@/assets/agent-photo.jpg";
import queensSkyline from "@/assets/queens-skyline.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SocialMediaIcons } from "@/components/SocialMediaIcons";
import EmailObfuscator from "@/components/EmailObfuscator";

export const HeroSection = () => {
  const { t, currentLanguage } = useLanguage();

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleROICalculatorClick = () => {
    const roiSection = document.getElementById('roi-calculator');
    if (roiSection) {
      roiSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label={currentLanguage === 'zh' ? 'Henry岳先生 - NYC房地产AI投资分析专家介绍' : 'Henry Yue - NYC Real Estate AI Investment Analysis Expert Introduction'}
      itemScope
      itemType="https://schema.org/RealEstateAgent"
    >
      {/* SEO-optimized background with proper structure */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
      </div>
      
      {/* Logo */}
      <div className="absolute top-4 left-4 z-20">
        <img 
          src="/lovable-uploads/a74ca3c0-60d0-45f4-8f61-1ab950ce1650.png"
          alt="RealHenryYue Logo"
          className="h-12 w-auto sm:h-16 lg:h-20 object-contain"
          width="200"
          height="80"
          loading="eager"
          decoding="async"
        />
      </div>
      
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-white space-y-6">
            {/* Slogan */}
            <div className="text-center lg:text-left mb-8">
              <div className="text-lg lg:text-xl font-medium text-accent tracking-wide">
                {t('hero.slogan')}
              </div>
            </div>
            
            <div className="space-y-4">
              <header>
                <h1 
                  className="text-5xl lg:text-6xl font-bold leading-tight"
                  itemProp="name"
                >
                  {t('hero.title')}
                </h1>
              </header>
              <p 
                className="text-xl lg:text-2xl text-white/90 leading-relaxed"
                itemProp="description"
              >
                {t('hero.subtitle')}
              </p>
              
              {/* Key Benefits - Enhanced for SEO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                <div className="flex items-center gap-2 text-white/90">
                  <TrendingUp className="h-5 w-5 text-accent flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm font-medium">
                    {currentLanguage === 'zh' ? 'AI投资分析' : 'AI Investment Analysis'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Calculator className="h-5 w-5 text-accent flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm font-medium">
                    {currentLanguage === 'zh' ? 'ROI计算器' : 'ROI Calculator'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Home className="h-5 w-5 text-accent flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm font-medium">
                    {currentLanguage === 'zh' ? '五大区覆盖' : '5 Boroughs Coverage'}
                  </span>
                </div>
              </div>
              
              {/* AI Investment Analysis Positioning - Enhanced */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" aria-hidden="true"></div>
                  <span className="text-accent font-semibold text-sm uppercase tracking-wide">
                    {currentLanguage === 'zh' ? 'AI 智能分析' : 'AI Investment Analysis'}
                  </span>
                </div>
                <p className="text-white/95 text-lg font-medium">
                  {currentLanguage === 'zh' 
                    ? '纽约五大区房产投资智能分析系统 • 曼哈顿 • 皇后区 • 布鲁克林 • 布朗克斯 • 史泰登岛 • 拿骚县'
                    : 'NYC 5 Boroughs Real Estate AI Investment Analysis • Manhattan • Queens • Brooklyn • Bronx • Staten Island • Nassau County'
                  }
                </p>
              </div>
            </div>
            
            {/* Enhanced CTA Buttons for conversions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg"
                onClick={handleROICalculatorClick}
                className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                aria-label={currentLanguage === 'zh' ? '开始房产投资分析' : 'Start Property Investment Analysis'}
              >
                <Calculator className="w-5 h-5 mr-2" aria-hidden="true" />
                {currentLanguage === 'zh' ? '投资分析工具' : 'Investment Analysis Tool'}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105"
                onClick={handleContactClick}
                aria-label={currentLanguage === 'zh' ? '联系Henry岳先生获取免费咨询' : 'Contact Henry Yue for Free Consultation'}
              >
                <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                {currentLanguage === 'zh' ? '免费咨询' : 'Free Consultation'}
              </Button>
            </div>
          </div>
          
          {/* Right Column - Enhanced Agent Photo Card with Schema markup */}
          <div className="flex justify-center lg:justify-end">
            <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-elegant max-w-sm">
              <div className="text-center space-y-6" itemScope itemType="https://schema.org/Person">
                <div className="relative">
                   <img 
                    src={agentPhoto} 
                    alt={t('hero.agentAlt')}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-card"
                    width="128"
                    height="128"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    itemProp="image"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {t('hero.agent')}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary" itemProp="name">
                    {t('hero.agentName')}
                  </h3>
                  <p className="text-muted-foreground font-medium" itemProp="jobTitle">
                    {t('hero.agentTitle')}
                  </p>
                  
                  {/* Google Business Profile Link */}
                  <div className="flex justify-center">
                    <a 
                      href="https://www.google.com/maps/place/Hongyu(Henry)+Yue/@40.8193196,-73.0576455,8z/data=!4m6!3m5!1s0x8a8315272881ebe9:0x7c39536f08d6a820!8m2!3d40.8193196!4d-73.0576455!16s%2Fg%2F11xsfg045t"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 bg-[#4285F4] hover:bg-[#5a95f5] text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95 max-w-[280px] w-full"
                      aria-label={currentLanguage === 'zh' ? '查看我们的Google商业档案' : 'View Our Google Business Profile'}
                    >
                      <img 
                        src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" 
                        alt="Google" 
                        className="w-4 h-4 mr-2 flex-shrink-0"
                        width="16"
                        height="16"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="truncate">
                        ⭐ {currentLanguage === 'zh' ? 'Google商业档案' : 'Google Business Profile'}
                      </span>
                    </a>
                  </div>
                </div>
                
                {/* Enhanced contact info with schema markup */}
                <address className="space-y-3 text-sm not-italic">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
                    <span itemProp="areaServed">{t('hero.locations')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
                    <a 
                      href="tel:+17187175210" 
                      className="hover:text-accent transition-colors"
                      itemProp="telephone"
                      aria-label={currentLanguage === 'zh' ? '拨打电话718-717-5210' : 'Call 718-717-5210'}
                    >
                      (718) 717-5210
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
                    <span itemProp="email">
                      <EmailObfuscator 
                        user="forangh" 
                        domain="gmail" 
                        tld="com" 
                        className="underline decoration-transparent hover:decoration-inherit transition-smooth hover:text-accent" 
                      />
                    </span>
                  </div>
                </address>
                 
                <SocialMediaIcons />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};