import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Clock, TrendingUp, BookOpen } from "lucide-react";

const SimpleMediumContent = () => {
  const posts = [
    {
      title: "NYC Real Estate Market Trends 2024: AI-Powered Investment Analysis",
      url: "https://medium.com/@realhenryyue",
      pubDate: "2024-01-15",
      categories: ["Real Estate", "AI", "Investment"],
      description: "Deep dive into how AI is revolutionizing real estate investment analysis in New York City. Latest market trends and data-driven insights.",
      readTime: "8 min read",
      engagement: "1.2K claps",
      author: "Henry Yue"
    },
    {
      title: "Queens Property Investment Guide: Hidden Gems in Flushing",
      url: "https://medium.com/@realhenryyue",
      pubDate: "2024-01-10",
      categories: ["Queens", "Investment"],
      description: "Discover undervalued investment opportunities in Flushing, Queens. Comprehensive analysis of cap rates and rental yields.",
      readTime: "12 min read",
      engagement: "892 claps",
      author: "Henry Yue"
    },
    {
      title: "ROI Calculator: How to Evaluate NYC Real Estate Investments",
      url: "https://medium.com/@realhenryyue",
      pubDate: "2024-01-05",
      categories: ["ROI", "Calculator"],
      description: "Step-by-step guide to calculating real estate ROI using advanced metrics. Free calculator tool included.",
      readTime: "15 min read",
      engagement: "2.1K claps",
      author: "Henry Yue"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/20 via-background to-secondary/30">
      <div className="container mx-auto px-4">
        <header className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            <BookOpen className="h-4 w-4" />
            <span>Latest Articles</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Latest Market <span className="text-primary">Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Expert analysis and insights on NYC real estate investment trends
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-card/80 backdrop-blur-lg rounded-2xl overflow-hidden"
            >
              <CardHeader className="space-y-4 p-6">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 bg-secondary/60 px-3 py-1 rounded-full">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={post.pubDate}>
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
                
                <CardTitle className="text-xl font-bold leading-tight hover:text-primary transition-colors line-clamp-2">
                  <a 
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline decoration-2 underline-offset-2"
                  >
                    {post.title}
                  </a>
                </CardTitle>

                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, idx) => (
                    <Badge 
                      key={idx}
                      variant="outline"
                      className="text-xs border-primary/20 text-primary bg-primary/5"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="space-y-5 p-6 pt-0">
                <p className="text-muted-foreground leading-relaxed line-clamp-3 text-base">
                  {post.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    <span className="font-medium">{post.engagement}</span>
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
                      className="flex items-center gap-2"
                    >
                      <span className="font-medium">Read More</span>
                      <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
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
              className="flex items-center gap-3"
            >
              <BookOpen className="h-5 w-5" />
              Follow on Medium
              <ExternalLink className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SimpleMediumContent;