import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TrendingUp, MapPin, GraduationCap, DollarSign, Users, BarChart3, Calendar, Award, Clock, Building } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const workExperience = [
  {
    titleKey: 'experience.realEstate1',
    periodKey: 'experience.realEstate1.period',
    locationKey: 'experience.realEstate1.location',
    typeKey: 'experience.realEstate1.type',
    descriptionKey: 'experience.realEstate1.description',
  },
  {
    titleKey: 'experience.businessAgent',
    periodKey: 'experience.businessAgent.period',
    locationKey: 'experience.businessAgent.location',
    typeKey: 'experience.businessAgent.type',
    descriptionKey: 'experience.businessAgent.description',
  },
  {
    titleKey: 'experience.realEstate2',
    periodKey: 'experience.realEstate2.period',
    locationKey: 'experience.realEstate2.location',
    typeKey: 'experience.realEstate2.type',
    descriptionKey: 'experience.realEstate2.description',
  },
  {
    titleKey: 'experience.ceo',
    periodKey: 'experience.ceo.period',
    locationKey: 'experience.ceo.location',
    typeKey: 'experience.ceo.type',
    descriptionKey: 'experience.ceo.description',
  },
  {
    titleKey: 'experience.generalManager',
    periodKey: 'experience.generalManager.period',
    locationKey: 'experience.generalManager.location',
    typeKey: 'experience.generalManager.type',
    descriptionKey: 'experience.generalManager.description',
  },
  {
    titleKey: 'experience.productManager',
    periodKey: 'experience.productManager.period',
    locationKey: 'experience.productManager.location',
    typeKey: 'experience.productManager.type',
    descriptionKey: 'experience.productManager.description',
  },
];

const MarketAnalysisHub = () => {
  const [activeCategory, setActiveCategory] = useState('local');
  const { t } = useLanguage();
  
  const stats = [
    {
      icon: MapPin,
      value: t('stats.areas.value'),
      label: t('stats.areas.label'),
      description: t('stats.areas.description')
    },
    {
      icon: Award,
      value: t('stats.licensed.value'),
      label: t('stats.licensed.label'),
      description: t('stats.licensed.description')
    },
    {
      icon: Clock,
      value: t('stats.availability.value'),
      label: t('stats.availability.label'),
      description: t('stats.availability.description')
    },
    {
      icon: Users,
      value: t('stats.clients.value'),
      label: t('stats.clients.label'),
      description: t('stats.clients.description')
    }
  ];

  const localMarketContent = [
    {
      titleKey: "localMarket.flushingTrend.title",
      contentKey: "localMarket.flushingTrend.content",
      icon: <TrendingUp className="h-5 w-5" />,
      keyStats: [
        { label: "Median Price 2024", value: "$720,000" },
        { label: "YoY Growth", value: "6.2%" },
        { label: "East Flushing 2BR", value: "$630,000" }
      ],
      tags: ["Flushing", "Queens", "Chinese community", "housing prices", "real estate trends", "Main Street", "Kissena Boulevard"]
    },
    {
      titleKey: "localMarket.queensGuide.title",
      contentKey: "localMarket.queensGuide.content",
      icon: <MapPin className="h-5 w-5" />,
      keyStats: [
        { label: "Forest Hills", value: "Luxury" },
        { label: "Bayside", value: "Top Schools" },
        { label: "Elmhurst", value: "Family Friendly" }
      ],
      tags: ["Queens neighborhoods", "Forest Hills", "Bayside", "Elmhurst", "Jackson Heights", "cultural diversity", "investment opportunities"]
    },
    {
      titleKey: "localMarket.schoolDistrict.title",
      contentKey: "localMarket.schoolDistrict.content",
      icon: <GraduationCap className="h-5 w-5" />,
      keyStats: [
        { label: "PS 203 Rating", value: "9/10" },
        { label: "Bayside 2BR Rent", value: "$2,700" },
        { label: "Vacancy Rate", value: "<3%" }
      ],
      tags: ["school districts", "NYC DOE", "GreatSchools", "PS 203", "PS 173", "Bayside", "Fresh Meadows", "education investment"]
    },
    {
      titleKey: "localMarket.rentalYield.title",
      contentKey: "localMarket.rentalYield.content",
      icon: <BarChart3 className="h-5 w-5" />,
      keyStats: [
        { label: "Bronx Yield", value: "6.1%" },
        { label: "Queens Average", value: "4.7%" },
        { label: "Jamaica Yield", value: "5.3%" }
      ],
      tags: ["rental yield", "cap rate", "investment returns", "Bronx", "Queens", "Jamaica", "Rego Park", "property investment"]
    }
  ];

  const educationalContent = [
    {
      titleKey: "educational.foreignBuyer.title",
      contentKey: "educational.foreignBuyer.content",
      icon: <Users className="h-5 w-5" />,
      keyPoints: [
        "educational.foreignBuyer.point1",
        "educational.foreignBuyer.point2",
        "educational.foreignBuyer.point3",
        "educational.foreignBuyer.point4",
      ],
      tags: ["foreign buyers", "non-US citizens", "FIRPTA tax", "international investment", "currency exchange", "property ownership"]
    },
    {
      titleKey: "educational.buyingProcess.title",
      contentKey: "educational.buyingProcess.content",
      icon: <Calendar className="h-5 w-5" />,
      keyPoints: [
        "educational.buyingProcess.point1",
        "educational.buyingProcess.point2",
        "educational.buyingProcess.point3",
        "educational.buyingProcess.point4",
      ],
      tags: ["NYC home buying", "New York real estate", "attorney", "home inspection", "mortgage approval", "closing process"]
    },
    {
      titleKey: "educational.loanGuide.title",
      contentKey: "educational.loanGuide.content",
      icon: <DollarSign className="h-5 w-5" />,
      keyPoints: [
        "educational.loanGuide.point1",
        "educational.loanGuide.point2",
        "educational.loanGuide.point3",
        "educational.loanGuide.point4",
      ],
      tags: ["home loans", "conventional loans", "FHA loans", "Non-QM loans", "mortgage application", "down payment", "credit score"]
    },
    {
      titleKey: "educational.taxOptimization.title",
      contentKey: "educational.taxOptimization.content",
      icon: <Award className="h-5 w-5" />,
      keyPoints: [
        "educational.taxOptimization.point1",
        "educational.taxOptimization.point2",
        "educational.taxOptimization.point3",
        "educational.taxOptimization.point4",
      ],
      tags: ["tax optimization", "LLC setup", "1031 exchange", "STAR exemption", "SCHE exemption", "capital gains", "CPA", "tax strategy"]
    }
  ];

  const marketInsights = [
    {
      titleKey: "insights.salesReport.title",
      contentKey: "insights.salesReport.content",
      icon: <BarChart3 className="h-5 w-5" />,
      metrics: [
        { label: "Queens Median", value: "$685,000", change: "+4.2%" },
        { label: "Flushing DOM", value: "38 days", change: "Fast" }
      ],
      tags: ["market report", "July 2025", "Queens median price", "days on market", "market trends", "sales data"]
    },
    {
      titleKey: "insights.domAnalysis.title",
      contentKey: "insights.domAnalysis.content",
      icon: <Calendar className="h-5 w-5" />,
      metrics: [
        { label: "Manhattan Luxury", value: "65+ days", change: "Complex" },
        { label: "Queens/Brooklyn", value: "35-45 days", change: "Fast" }
      ],
      tags: ["days on market", "DOM analysis", "Manhattan luxury", "Queens Brooklyn", "cash buyers", "market timing"]
    },
    {
      titleKey: "insights.topNeighborhoods.title",
      contentKey: "insights.topNeighborhoods.content",
      icon: <Award className="h-5 w-5" />,
      rankings: [
        { rank: 1, name: t('insights.topCommunities.flushing'), price: "$720,000", yield: "4.5%" },
        { rank: 2, name: t('insights.topCommunities.longIslandCity'), price: "$1,050,000", yield: "3.9%" },
        { rank: 3, name: t('insights.topCommunities.astoria'), price: "$860,000", yield: "4.2%" },
        { rank: 4, name: t('insights.topCommunities.sunsetPark'), price: "$760,000", yield: "4.8%" },
        { rank: 5, name: t('insights.topCommunities.parkSlope'), price: "$1,350,000", yield: "3.5%" }
      ],
      tags: ["neighborhood ranking", "investment neighborhoods", "Flushing", "Long Island City", "Astoria", "Sunset Park", "Park Slope", "cap rate"]
    }
  ];

  const allTags = [
    ...localMarketContent.flatMap(item => item.tags),
    ...educationalContent.flatMap(item => item.tags),
    ...marketInsights.flatMap(item => item.tags)
  ];

  const uniqueTags = [...new Set(allTags)];

  // Function to translate tags - try tag translation first, fallback to original
  const translateTag = (tag: string): string => {
    // Create a mapping for common tags
    const tagMap: { [key: string]: string } = {
      'Flushing': 'tag.flushing',
      'Queens': 'tag.queens',
      'Chinese community': 'tag.chineseCommunity',
      'housing prices': 'tag.housingPrices',
      'real estate trends': 'tag.realEstateTrends',
      'Main Street': 'tag.mainStreet',
      'Kissena Boulevard': 'tag.kissena',
      'Queens neighborhoods': 'tag.queensNeighborhoods',
      'Forest Hills': 'tag.forestHills',
      'Bayside': 'tag.bayside',
      'Elmhurst': 'tag.elmhurst',
      'Jackson Heights': 'tag.jacksonHeights',
      'cultural diversity': 'tag.culturalDiversity',
      'investment opportunities': 'tag.investmentOpportunities',
      'school districts': 'tag.schoolDistricts',
      'NYC DOE': 'tag.nycDoe',
      'GreatSchools': 'tag.greatSchools',
      'PS 203': 'tag.ps203',
      'PS 173': 'tag.ps173',
      'Fresh Meadows': 'tag.freshMeadows',
      'education investment': 'tag.educationInvestment',
      'rental yield': 'tag.rentalYield',
      'cap rate': 'tag.capRate',
      'investment returns': 'tag.investmentReturns',
      'Bronx': 'tag.bronx',
      'Jamaica': 'tag.jamaica',
      'Rego Park': 'tag.regoPark',
      'property investment': 'tag.propertyInvestment',
      'foreign buyers': 'tag.foreignBuyers',
      'non-US citizens': 'tag.nonUsCitizens',
      'FIRPTA tax': 'tag.firptaTax',
      'international investment': 'tag.internationalInvestment',
      'currency exchange': 'tag.currencyExchange',
      'property ownership': 'tag.propertyOwnership',
      'NYC home buying': 'tag.nycHomeBuying',
      'New York real estate': 'tag.newYorkRealEstate',
      'attorney': 'tag.attorney',
      'home inspection': 'tag.homeInspection',
      'mortgage approval': 'tag.mortgageApproval',
      'closing process': 'tag.closingProcess',
      'home loans': 'tag.homeLoans',
      'conventional loans': 'tag.conventionalLoans',
      'FHA loans': 'tag.fhaLoans',
      'Non-QM loans': 'tag.nonQmLoans',
      'mortgage application': 'tag.mortgageApplication',
      'down payment': 'tag.downPayment',
      'credit score': 'tag.creditScore',
      'tax optimization': 'tag.taxOptimization',
      'LLC setup': 'tag.llcSetup',
      '1031 exchange': 'tag.1031Exchange',
      'STAR exemption': 'tag.starExemption',
      'SCHE exemption': 'tag.scheExemption',
      'capital gains': 'tag.capitalGains',
      'CPA': 'tag.cpa',
      'tax strategy': 'tag.taxStrategy',
      'market report': 'tag.marketReport',
      'July 2025': 'tag.july2025',
      'Queens median price': 'tag.queensMedianPrice',
      'days on market': 'tag.daysOnMarket',
      'market trends': 'tag.marketTrends',
      'sales data': 'tag.salesData',
      'DOM analysis': 'tag.domAnalysis',
      'Manhattan luxury': 'tag.manhattanLuxury',
      'Queens Brooklyn': 'tag.queensBrooklyn',
      'cash buyers': 'tag.cashBuyers',
      'market timing': 'tag.marketTiming',
      'neighborhood ranking': 'tag.neighborhoodRanking',
      'investment neighborhoods': 'tag.investmentNeighborhoods',
      'Long Island City': 'tag.longIslandCity',
      'Astoria': 'tag.astoria',
      'Sunset Park': 'tag.sunsetPark',
      'Park Slope': 'tag.parkSlope'
    };
    
    const tagKey = tagMap[tag];
    if (tagKey) {
      const translatedTag = t(tagKey);
      return translatedTag !== tagKey ? translatedTag : tag;
    }
    return tag;
  };

  // Function to find content by tag and navigate to it
  const handleTagClick = (tag: string) => {
    // Find which content contains this tag
    const localIndex = localMarketContent.findIndex(item => item.tags.includes(tag));
    const educationalIndex = educationalContent.findIndex(item => item.tags.includes(tag));
    const insightsIndex = marketInsights.findIndex(item => item.tags.includes(tag));

    let targetTab = '';
    let targetId = '';

    if (localIndex !== -1) {
      targetTab = 'local';
      targetId = `local-content-${localIndex}`;
    } else if (educationalIndex !== -1) {
      targetTab = 'educational';
      targetId = `educational-content-${educationalIndex}`;
    } else if (insightsIndex !== -1) {
      targetTab = 'insights';
      targetId = `insights-content-${insightsIndex}`;
    }

    if (targetTab && targetId) {
      // Switch to the correct tab
      setActiveCategory(targetTab);
      
      // Scroll to the content after a brief delay to allow tab switching
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          // Add a brief highlight effect
          element.style.background = 'hsl(var(--primary) / 0.1)';
          setTimeout(() => {
            element.style.background = '';
          }, 2000);
        }
      }, 100);
    }
  };

  return (
    <section className="section-spacing py-8 md:py-16 px-4 bg-gradient-to-br from-background to-secondary/10">
      <div className="responsive-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {t('marketAnalysis.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('marketAnalysis.subtitle')}
          </p>
        </div>

        {/* SEO Tags Cloud */}
        <div className="mb-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">{t('marketAnalysis.featuredTopics')}</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueTags.slice(0, 20).map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors" 
                onClick={() => handleTagClick(tag)}
              >
                {translateTag(tag)}
              </Badge>
            ))}
          </div>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid grid-cols-1 sm:grid-cols-4 w-full gap-2 mb-8">
            <TabsTrigger value="about" className="flex items-center gap-2 whitespace-normal text-center text-xs sm:text-sm py-2">
              <Users className="h-4 w-4" />
              {t('about.title')}
            </TabsTrigger>
            <TabsTrigger value="local" className="flex items-center gap-2 whitespace-normal text-center text-xs sm:text-sm py-2">
              <MapPin className="h-4 w-4" />
              {t('marketAnalysis.localMarket')}
            </TabsTrigger>
            <TabsTrigger value="educational" className="flex items-center gap-2 whitespace-normal text-center text-xs sm:text-sm py-2">
              <GraduationCap className="h-4 w-4" />
              {t('marketAnalysis.educational')}
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2 whitespace-normal text-center text-xs sm:text-sm py-2">
              <BarChart3 className="h-4 w-4" />
              {t('marketAnalysis.insights')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column - Content */}
              <article className="space-y-8">
                <div className="space-y-6">
                  <section className="space-y-4">
                    <h3 className="text-2xl font-semibold text-primary">{t('about.localExpert.title')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('about.localExpert.description')}
                    </p>
                  </section>
                  
                  <section className="space-y-4">
                    <h3 className="text-2xl font-semibold text-primary">{t('about.bilingual.title')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('about.bilingual.description')}
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-2xl font-semibold text-primary">{t('about.experience.title')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('about.experience.description')}
                    </p>
                  </section>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="cta" 
                    size="lg"
                    className="text-lg px-8 py-6"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {t('about.cta')}
                  </Button>
                </div>
              </article>
              
              {/* Right Column - Stats */}
              <aside className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <Card 
                    key={index} 
                    className="text-center p-6 hover:shadow-card transition-smooth bg-gradient-to-br from-card to-secondary/30"
                  >
                    <CardContent className="space-y-4 p-0">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                        <stat.icon className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary">{stat.value}</div>
                        <div className="text-lg font-semibold text-foreground">{stat.label}</div>
                        <div className="text-sm text-muted-foreground">{stat.description}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </aside>
            </div>

            {/* Work Experience Section */}
            <section className="mt-12">
              <h3 className="text-3xl font-bold text-primary text-center mb-12">{t('experience.title')}</h3>
              <div className="space-y-6">
                {workExperience.map((job, index) => (
                  <Card 
                    key={index} 
                    className="p-6 hover:shadow-card transition-smooth"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-primary mb-2">
                            {t(job.titleKey)}
                          </h4>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" aria-hidden="true" />
                              <time>{t(job.periodKey)}</time>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" aria-hidden="true" />
                              <span>{t(job.locationKey)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4" aria-hidden="true" />
                              <span>{t(job.typeKey)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {t(job.descriptionKey)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="local" className="space-y-6">
            <div className="responsive-grid">
              {localMarketContent.map((item, index) => (
                <Card key={index} id={`local-content-${index}`} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {item.icon}
                      {t(item.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{t(item.contentKey)}</p>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {item.keyStats.map((stat, idx) => (
                        <div key={idx} className="text-center p-3 bg-secondary/50 rounded-lg">
                          <div className="font-bold text-primary">{stat.value}</div>
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 4).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {translateTag(tag)}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="educational" className="space-y-6">
            <div className="responsive-grid">
              {educationalContent.map((item, index) => (
                <Card key={index} id={`educational-content-${index}`} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {item.icon}
                      {t(item.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{t(item.contentKey)}</p>
                    <ul className="space-y-2 mb-4">
                      {item.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          {t(point)}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 4).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {translateTag(tag)}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {marketInsights.map((item, index) => (
                <Card key={index} id={`insights-content-${index}`} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {item.icon}
                      {t(item.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{t(item.contentKey)}</p>
                    
                    {item.metrics && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {item.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center p-3 bg-secondary/50 rounded-lg">
                            <div className="font-bold text-primary">{metric.value}</div>
                            <div className="text-xs text-muted-foreground">{metric.label}</div>
                            <div className="text-xs font-medium text-green-600">{metric.change}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {item.rankings && (
                      <div className="space-y-3 mb-4">
                        {item.rankings.map((neighborhood, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                                {neighborhood.rank}
                              </div>
                              <span className="font-medium">{neighborhood.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{neighborhood.price}</div>
                              <div className="text-sm text-green-600">{neighborhood.yield} yield</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 6).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {translateTag(tag)}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default MarketAnalysisHub;