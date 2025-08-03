import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, MapPin, GraduationCap, DollarSign, Users, BarChart3, Calendar, Award } from 'lucide-react';

const MarketAnalysisHub = () => {
  const [activeCategory, setActiveCategory] = useState('local');

  const localMarketContent = [
    {
      title: "Flushing Housing Price Trend Analysis",
      icon: <TrendingUp className="h-5 w-5" />,
      content: "Flushing, a major hub for the Chinese community in Queens, has shown a stable and consistent increase in housing prices in recent years. According to 2024 data, the median home price in Flushing grew by 6.2% year-over-year, reaching $720,000, up from $678,000 in 2023.",
      keyStats: [
        { label: "Median Price 2024", value: "$720,000" },
        { label: "YoY Growth", value: "6.2%" },
        { label: "East Flushing 2BR", value: "$630,000" }
      ],
      tags: ["Flushing", "Queens", "Chinese community", "housing prices", "real estate trends", "Main Street", "Kissena Boulevard"]
    },
    {
      title: "Detailed Guide to Queens Neighborhoods",
      icon: <MapPin className="h-5 w-5" />,
      content: "Queens is renowned for its diverse cultural communities, with each neighborhood offering unique attractions. Forest Hills attracts middle-to-upper-class families with large green spaces. Bayside is highly desirable for excellent school districts.",
      keyStats: [
        { label: "Forest Hills", value: "Luxury" },
        { label: "Bayside", value: "Top Schools" },
        { label: "Elmhurst", value: "Family Friendly" }
      ],
      tags: ["Queens neighborhoods", "Forest Hills", "Bayside", "Elmhurst", "Jackson Heights", "cultural diversity", "investment opportunities"]
    },
    {
      title: "School District Investment Report",
      icon: <GraduationCap className="h-5 w-5" />,
      content: "Investing in properties within top-rated school districts in NYC is a sound strategy for long-term value appreciation. Queens boasts 'yellow diamond' school zones like Bayside and Fresh Meadows with schools receiving 8+ ratings.",
      keyStats: [
        { label: "PS 203 Rating", value: "9/10" },
        { label: "Bayside 2BR Rent", value: "$2,700" },
        { label: "Vacancy Rate", value: "<3%" }
      ],
      tags: ["school districts", "NYC DOE", "GreatSchools", "PS 203", "PS 173", "Bayside", "Fresh Meadows", "education investment"]
    },
    {
      title: "Rental Yield Analysis Across NYC Boroughs",
      icon: <BarChart3 className="h-5 w-5" />,
      content: "According to 2024 data, the Bronx leads with the highest average gross rental yield at 6.1%. Queens' rental yields vary by neighborhood, with an average of 4.7%. Jamaica achieves approximately 5.3% yield.",
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
      title: "Complete Guide to Buying Property as a Foreigner",
      icon: <Users className="h-5 w-5" />,
      content: "Non-U.S. citizens can purchase property in the U.S., but there are specific requirements for loans, taxes, and ownership structures. The process involves eligibility assessment, financial preparation, and final transaction phases.",
      keyPoints: [
        "Traceable source of funds required",
        "International bank account setup",
        "FIRPTA tax considerations",
        "Currency exchange planning"
      ],
      tags: ["foreign buyers", "non-US citizens", "FIRPTA tax", "international investment", "currency exchange", "property ownership"]
    },
    {
      title: "Detailed NYC Home Buying Process",
      icon: <Calendar className="h-5 w-5" />,
      content: "The home buying process in New York State typically takes 6 to 10 weeks and requires both buyer's and seller's attorneys to handle contracts and title processes.",
      keyPoints: [
        "6-10 week timeline",
        "Attorney representation required",
        "Home inspection essential",
        "Bank appraisal process"
      ],
      tags: ["NYC home buying", "New York real estate", "attorney", "home inspection", "mortgage approval", "closing process"]
    },
    {
      title: "Home Loan Application Guide",
      icon: <DollarSign className="h-5 w-5" />,
      content: "Multiple loan types available including Conventional Loans (3-5% down), FHA Loans (3.5% down), and Non-QM/Commercial Loans for asset-based documentation.",
      keyPoints: [
        "Conventional: 3-5% down payment",
        "FHA: 3.5% down, first-time buyer friendly",
        "Non-QM: Asset-based documentation",
        "21-30 day approval process"
      ],
      tags: ["home loans", "conventional loans", "FHA loans", "Non-QM loans", "mortgage application", "down payment", "credit score"]
    },
    {
      title: "Tax Optimization Strategies",
      icon: <Award className="h-5 w-5" />,
      content: "Legal methods can significantly reduce tax liabilities including LLC setup, 1031 Exchange for capital gains deferral, and STAR/SCHE tax exemptions for eligible homeowners.",
      keyPoints: [
        "LLC setup for capital gains protection",
        "1031 Exchange for tax deferral",
        "STAR/SCHE exemptions available",
        "CPA consultation recommended"
      ],
      tags: ["tax optimization", "LLC setup", "1031 exchange", "STAR exemption", "SCHE exemption", "capital gains", "CPA", "tax strategy"]
    }
  ];

  const marketInsights = [
    {
      title: "Monthly Market Sales Report",
      icon: <BarChart3 className="h-5 w-5" />,
      content: "July 2025 data shows Queens median home price at $685,000, representing 4.2% YoY growth. Flushing properties average 38 days on market, indicating strong demand and quick turnover.",
      metrics: [
        { label: "Queens Median", value: "$685,000", change: "+4.2%" },
        { label: "Flushing DOM", value: "38 days", change: "Fast" }
      ],
      tags: ["market report", "July 2025", "Queens median price", "days on market", "market trends", "sales data"]
    },
    {
      title: "Days on Market Analysis",
      icon: <Calendar className="h-5 w-5" />,
      content: "Days on market varies significantly by borough and price range. Manhattan luxury properties have longer cycles due to complex financing, while Queens and Brooklyn mid-range homes sell faster with more cash buyers.",
      metrics: [
        { label: "Manhattan Luxury", value: "65+ days", change: "Complex" },
        { label: "Queens/Brooklyn", value: "35-45 days", change: "Fast" }
      ],
      tags: ["days on market", "DOM analysis", "Manhattan luxury", "Queens Brooklyn", "cash buyers", "market timing"]
    },
    {
      title: "Top Neighborhoods Ranking",
      icon: <Award className="h-5 w-5" />,
      content: "Based on H1 2025 data including price appreciation, rental yield, population growth, and infrastructure development, top five NYC investment neighborhoods identified.",
      rankings: [
        { rank: 1, name: "Flushing", price: "$720,000", yield: "4.5%" },
        { rank: 2, name: "Long Island City", price: "$1,050,000", yield: "3.9%" },
        { rank: 3, name: "Astoria", price: "$860,000", yield: "4.2%" },
        { rank: 4, name: "Sunset Park", price: "$760,000", yield: "4.8%" },
        { rank: 5, name: "Park Slope", price: "$1,350,000", yield: "3.5%" }
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

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-secondary/10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            New York Real Estate Market In-Depth Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A Decade of Expert Insights - Comprehensive market data, educational resources, and investment strategies for NYC real estate
          </p>
        </div>

        {/* SEO Tags Cloud */}
        <div className="mb-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Featured Topics & Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueTags.slice(0, 20).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="local" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Local Market Expert
            </TabsTrigger>
            <TabsTrigger value="educational" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Educational Content
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Market Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="local" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {localMarketContent.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {item.icon}
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{item.content}</p>
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
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="educational" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {educationalContent.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {item.icon}
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{item.content}</p>
                    <ul className="space-y-2 mb-4">
                      {item.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 4).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
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
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {item.icon}
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{item.content}</p>
                    
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
                          {tag}
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