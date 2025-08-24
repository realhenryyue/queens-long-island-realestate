import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, TrendingUp, Home, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const BlogSection = () => {
  const { currentLanguage } = useLanguage();

  const blogPosts = [
    {
      id: 1,
      title: currentLanguage === 'zh' ? 
        '2024年纽约房地产市场AI投资趋势分析' : 
        '2024 NYC Real Estate AI Investment Trend Analysis',
      excerpt: currentLanguage === 'zh' ? 
        '深度分析人工智能如何改变纽约房地产投资策略，包括皇后区、曼哈顿、布鲁克林的最新投资机会。' :
        'In-depth analysis of how AI is transforming NYC real estate investment strategies, including latest opportunities in Queens, Manhattan, and Brooklyn.',
      date: '2024-01-15',
      author: currentLanguage === 'zh' ? '岳泓宇 (Henry Yue)' : 'Henry Yue',
      category: currentLanguage === 'zh' ? 'AI投资分析' : 'AI Investment Analysis',
      readTime: currentLanguage === 'zh' ? '8分钟阅读' : '8 min read',
      tags: currentLanguage === 'zh' ? 
        ['AI分析', '纽约房产', '投资策略', 'ROI优化'] :
        ['AI Analysis', 'NYC Real Estate', 'Investment Strategy', 'ROI Optimization'],
      featured: true
    },
    {
      id: 2,
      title: currentLanguage === 'zh' ? 
        '法拉盛公寓投资完整指南：从分析到收益最大化' : 
        'Complete Guide to Flushing Condo Investment: From Analysis to ROI Maximization',
      excerpt: currentLanguage === 'zh' ? 
        '详细解析法拉盛公寓市场，包括价格趋势、租金回报率、投资风险评估和长期升值潜力。' :
        'Detailed analysis of Flushing condo market including price trends, rental yields, investment risk assessment, and long-term appreciation potential.',
      date: '2024-01-10',
      author: currentLanguage === 'zh' ? '岳泓宇 (Henry Yue)' : 'Henry Yue',
      category: currentLanguage === 'zh' ? '区域分析' : 'Regional Analysis',
      readTime: currentLanguage === 'zh' ? '12分钟阅读' : '12 min read',
      tags: currentLanguage === 'zh' ? 
        ['法拉盛', '公寓投资', '皇后区', '市场分析'] :
        ['Flushing', 'Condo Investment', 'Queens', 'Market Analysis'],
      featured: false
    },
    {
      id: 3,
      title: currentLanguage === 'zh' ? 
        '阿斯托利亚投资型物业市场深度报告' : 
        'Astoria Investment Property Market Deep Dive Report',
      excerpt: currentLanguage === 'zh' ? 
        '阿斯托利亚作为新兴投资热点的全面分析，包括交通便利性、人口增长趋势和未来发展规划。' :
        'Comprehensive analysis of Astoria as an emerging investment hotspot, including transportation convenience, population growth trends, and future development plans.',
      date: '2024-01-05',
      author: currentLanguage === 'zh' ? '岳泓宇 (Henry Yue)' : 'Henry Yue',
      category: currentLanguage === 'zh' ? '市场研究' : 'Market Research',
      readTime: currentLanguage === 'zh' ? '10分钟阅读' : '10 min read',
      tags: currentLanguage === 'zh' ? 
        ['阿斯托利亚', '投资型物业', '市场趋势', '未来规划'] :
        ['Astoria', 'Investment Property', 'Market Trends', 'Future Planning'],
      featured: false
    },
    {
      id: 4,
      title: currentLanguage === 'zh' ? 
        '皇后区家庭住宅投资策略：单户vs多户比较分析' : 
        'Queens Family Home Investment Strategy: Single vs Multi-Family Comparative Analysis',
      excerpt: currentLanguage === 'zh' ? 
        '比较分析皇后区单户和多户家庭住宅的投资优势，包括现金流分析、管理复杂度和长期回报率。' :
        'Comparative analysis of investment advantages between single and multi-family homes in Queens, including cash flow analysis, management complexity, and long-term returns.',
      date: '2023-12-28',
      author: currentLanguage === 'zh' ? '岳泓宇 (Henry Yue)' : 'Henry Yue',
      category: currentLanguage === 'zh' ? '投资策略' : 'Investment Strategy',
      readTime: currentLanguage === 'zh' ? '15分钟阅读' : '15 min read',
      tags: currentLanguage === 'zh' ? 
        ['皇后区', '家庭住宅', '投资比较', '现金流'] :
        ['Queens', 'Family Homes', 'Investment Comparison', 'Cash Flow'],
      featured: false
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-secondary/5">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {currentLanguage === 'zh' ? 'NYC房地产投资博客' : 'NYC Real Estate Investment Blog'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {currentLanguage === 'zh' ? 
              '获取最新的纽约房地产市场分析、AI投资策略和专业洞察' :
              'Get the latest NYC real estate market analysis, AI investment strategies, and professional insights'}
          </p>
        </div>

        {/* Featured Article */}
        {blogPosts.filter(post => post.featured).map(post => (
          <Card key={post.id} className="mb-8 overflow-hidden border-primary/20 shadow-lg">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-1">
              <div className="bg-background rounded-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default" className="bg-primary text-primary-foreground">
                      {currentLanguage === 'zh' ? '精选文章' : 'Featured'}
                    </Badge>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-2xl mb-3 leading-tight">{post.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString(currentLanguage === 'zh' ? 'zh-CN' : 'en-US')}
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full sm:w-auto">
                    {currentLanguage === 'zh' ? '阅读全文' : 'Read Full Article'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.filter(post => !post.featured).map(post => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-secondary/30 hover:border-primary/30">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">{post.category}</Badge>
                </div>
                <CardTitle className="text-lg leading-tight line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col gap-3 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString(currentLanguage === 'zh' ? 'zh-CN' : 'en-US')}
                    </div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs py-0">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs py-0">
                      +{post.tags.length - 2}
                    </Badge>
                  )}
                </div>
                
                <Button variant="outline" size="sm" className="w-full text-xs">
                  {currentLanguage === 'zh' ? '阅读更多' : 'Read More'}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                {currentLanguage === 'zh' ? '想要获得更多投资洞察？' : 'Want More Investment Insights?'}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {currentLanguage === 'zh' ? 
                  '订阅我们的专业分析报告，获得最新的纽约房地产AI投资策略和市场趋势分析。' :
                  'Subscribe to our professional analysis reports for the latest NYC real estate AI investment strategies and market trend analysis.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Home className="mr-2 h-4 w-4" />
                  {currentLanguage === 'zh' ? '联系投资顾问' : 'Contact Investment Advisor'}
                </Button>
                <Button variant="outline" size="lg">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  {currentLanguage === 'zh' ? '查看更多文章' : 'View More Articles'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;