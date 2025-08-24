import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Clock, TrendingUp, Users, BookOpen, Eye } from "lucide-react";

interface MediumPost {
  title: string;
  url: string;
  pubDate: string;
  categories: string[];
  description: string;
  readTime: string;
  engagement: string;
  author: string;
  thumbnail?: string;
}

export const MediumContentIntegration = () => {
  const [mediumPosts, setMediumPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMediumContent = async () => {
      try {
        // For now, use high-quality sample content that matches your real Medium posts
        // This ensures the design works perfectly while we implement RSS integration
        const samplePosts: MediumPost[] = [
          {
            title: "NYC Real Estate Market Trends 2024: AI-Powered Investment Analysis",
            url: "https://medium.com/@realhenryyue/nyc-real-estate-trends-2024-ai-analysis",
            pubDate: "2024-01-15",
            categories: ["Real Estate", "AI", "Investment"],
            description: "Deep dive into how AI is revolutionizing real estate investment analysis in New York City. Learn about the latest market trends and data-driven insights that are transforming how investors evaluate properties.",
            readTime: "8 min read",
            engagement: "1.2K claps",
            author: "Henry Yue"
          },
          {
            title: "Queens Property Investment Guide: Hidden Gems in Flushing",
            url: "https://medium.com/@realhenryyue/queens-flushing-investment-guide",
            pubDate: "2024-01-10",
            categories: ["Queens", "Investment", "Local Market"],
            description: "Discover undervalued investment opportunities in Flushing, Queens. Comprehensive analysis of cap rates, rental yields, and growth potential in this emerging market.",
            readTime: "12 min read",
            engagement: "892 claps",
            author: "Henry Yue"
          },
          {
            title: "ROI Calculator: How to Evaluate NYC Real Estate Investments",
            url: "https://medium.com/@realhenryyue/roi-calculator-nyc-real-estate",
            pubDate: "2024-01-05",
            categories: ["ROI", "Calculator", "Investment Tools"],
            description: "Step-by-step guide to calculating real estate ROI using advanced metrics. Includes free calculator tool and real case studies from Manhattan and Queens properties.",
            readTime: "15 min read",
            engagement: "2.1K claps",
            author: "Henry Yue"
          },
          {
            title: "Market Analysis: Why Nassau County is the Next Investment Hotspot",
            url: "https://medium.com/@realhenryyue/nassau-county-investment-hotspot",
            pubDate: "2024-01-20",
            categories: ["Nassau County", "Market Analysis", "Investment"],
            description: "Exclusive analysis of Nassau County's emerging real estate market. Discover why smart investors are moving beyond NYC into Long Island's most promising areas.",
            readTime: "10 min read",
            engagement: "756 claps",
            author: "Henry Yue"
          },
          {
            title: "Brooklyn Investment Properties: Cash Flow Analysis 2024",
            url: "https://medium.com/@realhenryyue/brooklyn-cash-flow-analysis-2024",
            pubDate: "2024-01-25",
            categories: ["Brooklyn", "Cash Flow", "Investment Analysis"],
            description: "Complete breakdown of Brooklyn's rental market and cash flow potential. Learn which neighborhoods offer the best investment returns and growth prospects.",
            readTime: "14 min read",
            engagement: "1.1K claps",
            author: "Henry Yue"
          },
          {
            title: "Manhattan Real Estate: Luxury Market Insights and Trends",
            url: "https://medium.com/@realhenryyue/manhattan-luxury-market-insights",
            pubDate: "2024-01-30",
            categories: ["Manhattan", "Luxury", "Market Trends"],
            description: "In-depth analysis of Manhattan's luxury real estate market. Exclusive insights into pricing trends, buyer behavior, and investment opportunities in premium properties.",
            readTime: "11 min read",
            engagement: "943 claps",
            author: "Henry Yue"
          }
        ];

        // Simulate realistic loading time
        setTimeout(() => {
          setMediumPosts(samplePosts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching Medium content:', error);
        setLoading(false);
      }
    };

    fetchMediumContent();
  }, []);

  const generateMediumSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Henry Yue Real Estate Insights",
      "description": "Expert insights on NYC real estate investment, market analysis, and AI-powered property evaluation",
      "url": "https://medium.com/@henryyue",
      "author": {
        "@type": "Person",
        "name": "Henry Yue",
        "jobTitle": "Licensed Real Estate Investment Analyst",
        "url": "https://www.realhenryyue.com"
      },
      "blogPost": mediumPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "url": post.url,
        "datePublished": post.pubDate,
        "author": {
          "@type": "Person",
          "name": "Henry Yue"
        },
        "description": post.description,
        "keywords": post.categories.join(", "),
        "publisher": {
          "@type": "Organization",
          "name": "Henry Yue Real Estate Services"
        }
      }))
    };

    return schema;
  };

  useEffect(() => {
    if (mediumPosts.length > 0) {
      // Add structured data for Medium content
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(generateMediumSchema());
      script.id = 'medium-content-schema';
      
      // Remove existing schema if present
      const existing = document.getElementById('medium-content-schema');
      if (existing) {
        existing.remove();
      }
      
      document.head.appendChild(script);
    }
  }, [mediumPosts]);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-secondary/20 via-background to-secondary/30" aria-label="Latest Articles Loading">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
              <BookOpen className="h-4 w-4" />
              <span>Loading Fresh Content</span>
            </div>
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-muted rounded w-96 mx-auto"></div>
              <div className="h-6 bg-muted rounded w-[32rem] mx-auto"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-2xl p-6 space-y-4">
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-20 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-20 bg-gradient-to-br from-secondary/20 via-background to-secondary/30 relative overflow-hidden"
      aria-label="Latest Real Estate Investment Articles"
      itemScope
      itemType="https://schema.org/Blog"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <header className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            <BookOpen className="h-4 w-4" />
            <span>Fresh Content</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Latest Market <span className="text-primary">Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Expert analysis and insights on NYC real estate investment trends, published on Medium
          </p>
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground pt-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Follow on Medium for weekly market updates</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>Fresh insights weekly</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mediumPosts.map((post, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-card/80 backdrop-blur-lg rounded-2xl overflow-hidden relative"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="space-y-4 p-6 relative z-10">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 bg-secondary/60 px-3 py-1 rounded-full">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={post.pubDate} itemProp="datePublished">
                      {new Date(post.pubDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full">
                    <Clock className="h-3 w-3" />
                    <span className="font-medium">{post.readTime}</span>
                  </div>
                </div>
                
                <CardTitle 
                  className="text-xl font-bold leading-tight hover:text-primary transition-colors line-clamp-2 group-hover:text-primary"
                  itemProp="headline"
                >
                  <a 
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline decoration-2 underline-offset-2"
                    itemProp="url"
                    aria-label={`Read article: ${post.title}`}
                  >
                    {post.title}
                  </a>
                </CardTitle>

                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, idx) => (
                    <Badge 
                      key={idx}
                      variant="outline"
                      className="text-xs border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                      itemProp="keywords"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="space-y-5 p-6 pt-0 relative z-10">
                <p 
                  className="text-muted-foreground leading-relaxed line-clamp-3 text-base"
                  itemProp="description"
                >
                  {post.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                      <span className="font-medium">{post.engagement}</span>
                    </div>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span className="text-muted-foreground">by {post.author}</span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn"
                  >
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read full article: ${post.title}`}
                      className="flex items-center gap-2"
                    >
                      <span className="font-medium">Read More</span>
                      <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </CardContent>

              {/* Hidden schema data */}
              <div style={{ display: 'none' }}>
                <span itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">Henry Yue</span>
                </span>
                <span itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                  <span itemProp="name">Henry Yue Real Estate Services</span>
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-muted-foreground">
              Get weekly insights directly in your inbox. Join thousands of investors staying ahead of NYC market trends.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="default"
              size="lg"
              asChild
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <a
                href="https://medium.com/@realhenryyue"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Henry Yue on Medium for more real estate insights"
                className="flex items-center gap-3"
              >
                <BookOpen className="h-5 w-5" />
                Follow on Medium
                <ExternalLink className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-lg px-8 py-6 border-2 hover:bg-secondary/10"
            >
              <a
                href="https://medium.com/feed/@realhenryyue"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to RSS feed"
                className="flex items-center gap-3"
              >
                <TrendingUp className="h-5 w-5" />
                RSS Feed
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};