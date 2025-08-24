import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const BlogSection = () => {
  const { t, currentLanguage } = useLanguage();

  const blogPosts = [
    {
      id: 1,
      title: currentLanguage === 'zh' ? '2024年纽约房地产市场趋势' : '2024 NYC Real Estate Market Trends',
      excerpt: currentLanguage === 'zh' 
        ? '深入分析纽约五大区房地产市场的最新趋势和投资机会。'
        : 'In-depth analysis of the latest trends and investment opportunities in NYC real estate market.',
      author: currentLanguage === 'zh' ? '岳泓宇' : 'Henry Yue',
      date: currentLanguage === 'zh' ? '2024年1月15日' : 'January 15, 2024',
      tags: [
        currentLanguage === 'zh' ? '市场分析' : 'Market Analysis',
        currentLanguage === 'zh' ? '投资' : 'Investment'
      ],
      readTime: currentLanguage === 'zh' ? '5分钟阅读' : '5 min read'
    },
    {
      id: 2,
      title: currentLanguage === 'zh' ? '首次购房者指南：纽约购房全攻略' : 'First-Time Buyer Guide: Complete NYC Home Buying Strategy',
      excerpt: currentLanguage === 'zh'
        ? '为首次购房者提供的完整纽约购房指南，包括贷款、检查和过户流程。'
        : 'Complete guide for first-time buyers including financing, inspection, and closing process.',
      author: currentLanguage === 'zh' ? '岳泓宇' : 'Henry Yue',
      date: currentLanguage === 'zh' ? '2024年1月10日' : 'January 10, 2024',
      tags: [
        currentLanguage === 'zh' ? '购房指南' : 'Buying Guide',
        currentLanguage === 'zh' ? '首次购房' : 'First-Time Buyers'
      ],
      readTime: currentLanguage === 'zh' ? '8分钟阅读' : '8 min read'
    },
    {
      id: 3,
      title: currentLanguage === 'zh' ? 'AI技术在房地产投资分析中的应用' : 'AI Technology in Real Estate Investment Analysis',
      excerpt: currentLanguage === 'zh'
        ? '探索人工智能如何革命性地改变房地产投资决策和市场分析。'
        : 'Exploring how artificial intelligence is revolutionizing real estate investment decisions.',
      author: currentLanguage === 'zh' ? '岳泓宇' : 'Henry Yue',
      date: currentLanguage === 'zh' ? '2024年1月5日' : 'January 5, 2024',
      tags: [
        currentLanguage === 'zh' ? 'AI分析' : 'AI Analysis',
        currentLanguage === 'zh' ? '技术' : 'Technology'
      ],
      readTime: currentLanguage === 'zh' ? '6分钟阅读' : '6 min read'
    }
  ];

  return (
    <section id="blog" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            {t('blog.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <time>{post.date}</time>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </CardDescription>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {post.readTime}
                  </span>
                  
                  <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {currentLanguage === 'zh' ? '阅读更多' : 'Read More'}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <TrendingUp className="w-4 h-4 mr-2" />
            {currentLanguage === 'zh' ? '查看所有文章' : 'View All Articles'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;