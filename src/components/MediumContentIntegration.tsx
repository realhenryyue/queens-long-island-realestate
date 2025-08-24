import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Clock, TrendingUp, Users } from "lucide-react";

interface MediumPost {
  title: string;
  url: string;
  pubDate: string;
  categories: string[];
  description: string;
  readTime: string;
  engagement: string;
}

export const MediumContentIntegration = () => {
  const [mediumPosts, setMediumPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated Medium RSS feed integration
    // In production, you would fetch from Medium RSS feed
    const fetchMediumContent = async () => {
      try {
        // Example Medium posts structure
        const samplePosts: MediumPost[] = [
          {
            title: "NYC Real Estate Market Trends 2024: AI-Powered Investment Analysis",
            url: "https://medium.com/@henryyue/nyc-real-estate-trends-2024-ai-analysis",
            pubDate: "2024-01-15",
            categories: ["Real Estate", "AI", "Investment"],
            description: "Deep dive into how AI is revolutionizing real estate investment analysis in New York City. Learn about the latest market trends and data-driven insights.",
            readTime: "8 min read",
            engagement: "1.2K claps"
          },
          {
            title: "Queens Property Investment Guide: Hidden Gems in Flushing",
            url: "https://medium.com/@henryyue/queens-flushing-investment-guide",
            pubDate: "2024-01-10",
            categories: ["Queens", "Investment", "Local Market"],
            description: "Discover undervalued investment opportunities in Flushing, Queens. Comprehensive analysis of cap rates, rental yields, and growth potential.",
            readTime: "12 min read",
            engagement: "892 claps"
          },
          {
            title: "ROI Calculator: How to Evaluate NYC Real Estate Investments",
            url: "https://medium.com/@henryyue/roi-calculator-nyc-real-estate",
            pubDate: "2024-01-05",
            categories: ["ROI", "Calculator", "Investment Tools"],
            description: "Step-by-step guide to calculating real estate ROI using advanced metrics. Includes free calculator tool and real case studies from Manhattan and Queens.",
            readTime: "15 min read",
            engagement: "2.1K claps"
          }
        ];

        // Simulate API delay
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
      <section className="py-16 bg-secondary/30" aria-label="Latest Articles Loading">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-16 bg-secondary/30"
      aria-label="Latest Real Estate Investment Articles"
      itemScope
      itemType="https://schema.org/Blog"
    >
      <div className="container mx-auto px-4">
        <header className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            Latest Market Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert analysis and insights on NYC real estate investment trends, published on Medium
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Follow on Medium for weekly market updates</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {mediumPosts.map((post, index) => (
            <Card 
              key={index}
              className="hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.pubDate} itemProp="datePublished">
                      {new Date(post.pubDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <CardTitle 
                  className="text-xl leading-tight hover:text-primary transition-colors line-clamp-2"
                  itemProp="headline"
                >
                  <a 
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
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
                      variant="secondary"
                      className="text-xs"
                      itemProp="keywords"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p 
                  className="text-muted-foreground leading-relaxed line-clamp-3"
                  itemProp="description"
                >
                  {post.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>{post.engagement}</span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read full article: ${post.title}`}
                    >
                      Read More
                      <ExternalLink className="h-4 w-4 ml-1" />
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

        <div className="text-center">
          <Button
            variant="cta"
            size="lg"
            asChild
            className="text-lg px-8 py-6"
          >
            <a
              href="https://medium.com/@henryyue"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Henry Yue on Medium for more real estate insights"
            >
              Follow on Medium
              <ExternalLink className="h-5 w-5 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};