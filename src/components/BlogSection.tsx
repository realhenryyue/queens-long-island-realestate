import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, TrendingUp, Home, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const BlogSection = () => {
  const { currentLanguage } = useLanguage();

  const blogPosts = [
    {
      id: 1,
      title: currentLanguage === 'zh' ? 
        '2025年高利率下纽约房地产投资策略：复利思维应对市场挑战' : 
        '2025 NYC Real Estate Investment Strategy in High Interest Rate Environment: Compound Growth Mindset',
      excerpt: currentLanguage === 'zh' ? 
        '在当下的纽约市场，高利率环境下房地产投资仍有机会。通过复利思维和结构设计，无论是公寓、独立屋、小型多户，还是利用1031置换和信托架构，都有不同的策略切入点。' :
        'In the current NYC market, real estate investment opportunities still exist despite high interest rates. Through compound growth thinking and structural design, there are different strategic entry points for condos, houses, small multi-family properties, and utilizing 1031 exchanges and trust structures.',
      date: '2025-08-19',
      author: currentLanguage === 'zh' ? '岳泓宇 (Henry Yue)' : 'Henry Yue',
      category: currentLanguage === 'zh' ? '投资策略' : 'Investment Strategy',
      readTime: currentLanguage === 'zh' ? '12分钟阅读' : '12 min read',
      tags: currentLanguage === 'zh' ? 
        ['高利率', '投资策略', '1031置换', '现金流', '信托架构'] :
        ['High Interest Rate', 'Investment Strategy', '1031 Exchange', 'Cash Flow', 'Trust Structure'],
      featured: true,
      url: 'https://medium.com/@RealHenryYue/2025%E5%B9%B4%E9%AB%98%E5%88%A9%E7%8E%87%E4%B8%8B%E7%BA%BD%E7%BA%A6%E6%88%BF%E5%9C%B0%E4%BA%A7%E6%8A%95%E8%B5%84%E7%AD%96%E7%95%A5-%E5%A4%8D%E5%88%A9%E6%80%9D%E7%BB%B4%E5%BA%94%E5%AF%B9%E5%B8%82%E5%9C%BA%E6%8C%91%E6%88%98-5cfb576f4633'
    },
    {
      id: 2,
      title: currentLanguage === 'zh' ? 
        '关于我 | 岳泓宇' : 
        'About Me | Henry Yue',
      excerpt: currentLanguage === 'zh' ? 
        '我是岳泓宇（Henry Yue），一名专注于纽约房产交易与投资分析的专业人士，服务范围涵盖纽约房源、纽约房产挂牌以及Queens、Long Island、曼哈顿等区域的优质投资物业。' :
        'I am Henry Yue, a professional focusing on NYC real estate transactions and investment analysis, serving areas including NYC property listings and quality investment properties in Queens, Long Island, and Manhattan.',
      date: '2025-08-19',
      author: currentLanguage === 'zh' ? '岳泓宇 (Henry Yue)' : 'Henry Yue',
      category: currentLanguage === 'zh' ? '区域分析' : 'Regional Analysis',
      readTime: currentLanguage === 'zh' ? '5分钟阅读' : '5 min read',
      tags: currentLanguage === 'zh' ? 
        ['专业背景', '房产分析', '投资工具', 'AI分析'] :
        ['Professional Background', 'Property Analysis', 'Investment Tools', 'AI Analysis'],
      featured: false,
      url: 'https://medium.com/@RealHenryYue/%E5%85%B3%E4%BA%8E%E6%88%91-%E5%B2%B3%E6%B3%93%E5%AE%87-cc356200c04c'
    },
    {
      id: 3,
      title: currentLanguage === 'zh' ? 
        'About Me | Henry Yue (English Version)' : 
        'About Me | Henry Yue',
      excerpt: currentLanguage === 'zh' ? 
        '我是Henry Yue，一名专业的纽约房地产经纪人，专门从事纽约房屋销售、纽约房产挂牌以及皇后区、长岛和曼哈顿的投资物业。' :
        'I am Henry Yue, a professional New York real estate agent specializing in homes for sale in New York, NYC property listings, and investment properties in Queens, Long Island, and Manhattan.',
      date: '2025-08-19',
      author: currentLanguage === 'zh' ? '岳泓宇 (Henry Yue)' : 'Henry Yue',
      category: currentLanguage === 'zh' ? '市场研究' : 'Market Research',
      readTime: currentLanguage === 'zh' ? '6分钟阅读' : '6 min read',
      tags: currentLanguage === 'zh' ? 
        ['房产估价', '数据分析', '客户服务', '投资咨询'] :
        ['Property Valuation', 'Data Analysis', 'Client Service', 'Investment Consulting'],
      featured: false,
      url: 'https://medium.com/@RealHenryYue/about-me-henry-yue-ad241927c0ac'
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
                  
                  <Button 
                    className="w-full sm:w-auto"
                    onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}
                  >
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
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}
                >
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
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open('https://medium.com/@RealHenryYue', '_blank', 'noopener,noreferrer')}
                >
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