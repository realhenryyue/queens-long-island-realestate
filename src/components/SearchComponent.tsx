import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchResult {
  id: string;
  title: string;
  titleEn?: string;
  summary: string;
  summaryEn?: string;
  content: string;
  contentEn?: string;
  category: string;
  searchKeywords: string[];
}

export const SearchComponent = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search data - in a real implementation, this would come from a database or API
  const searchData: SearchResult[] = [
    // Local Market Content
    {
      id: "flushing-trends",
      title: "法拉盛房价走势分析",
      titleEn: "Flushing Housing Market Trends Analysis", 
      summary: "深度分析法拉盛地区房价变化趋势，为投资者提供专业市场洞察",
      summaryEn: "In-depth analysis of Flushing area housing price trends, providing professional market insights for investors",
      content: "法拉盛作为纽约华人聚集的核心区域，其房地产市场表现出独特的发展特征...",
      contentEn: "Flushing, as the core area of Chinese community in New York, shows unique development characteristics...",
      category: "本地市场专家内容",
      searchKeywords: ["法拉盛", "房价", "市场分析", "投资", "flushing", "housing", "market", "investment", "trends", "analysis"]
    },
    {
      id: "queens-neighborhoods",
      title: "皇后区各社区详细指南",
      titleEn: "Comprehensive Queens Neighborhood Guide",
      summary: "全面解析皇后区各社区特色，帮助买家找到最适合的居住区域",
      summaryEn: "Comprehensive analysis of Queens neighborhood characteristics to help buyers find the most suitable residential areas",
      content: "皇后区作为纽约市面积最大的行政区，拥有多元化的社区选择...",
      contentEn: "Queens, as the largest borough in New York City, offers diverse community choices...",
      category: "本地市场专家内容",
      searchKeywords: ["皇后区", "社区", "指南", "法拉盛", "阿斯托利亚", "queens", "neighborhood", "guide", "flushing", "astoria", "forest hills"]
    },
    {
      id: "school-district-investment",
      title: "学区房投资报告",
      titleEn: "School District Investment Report",
      summary: "分析优质学区对房产投资价值的影响，指导学区房投资决策",
      summaryEn: "Analyze the impact of quality school districts on property investment value and guide school district housing investment decisions",
      content: "学区房投资一直是华人家庭房产投资的重要考量因素...",
      contentEn: "School district housing investment has always been an important consideration for Chinese families...",
      category: "本地市场专家内容",
      searchKeywords: ["学区房", "投资", "教育", "学校", "PS163", "school district", "investment", "education", "schools"]
    },
    {
      id: "rental-yield-analysis",
      title: "纽约各区租金回报率分析",
      titleEn: "NYC Rental Yield Analysis by Borough",
      summary: "对比分析纽约各区域租金回报率，为投资者提供数据支持",
      summaryEn: "Comparative analysis of rental yields across NYC areas, providing data support for investors",
      content: "租金回报率是衡量房产投资价值的核心指标...",
      contentEn: "Rental yield is a core indicator for measuring property investment value...",
      category: "本地市场专家内容",
      searchKeywords: ["租金回报率", "投资分析", "皇后区", "布鲁克林", "曼哈顿", "rental yield", "investment", "queens", "brooklyn", "manhattan"]
    },
    // Educational Content
    {
      id: "overseas-buying-guide",
      title: "海外买房完整指南",
      titleEn: "Complete Guide to Overseas Property Buying",
      summary: "为海外投资者提供纽约购房的完整攻略和专业建议",
      summaryEn: "Comprehensive guide and professional advice for overseas investors buying property in New York",
      content: "海外买房是一项重大投资决策，需要充分了解当地法律、税务和市场环境...",
      contentEn: "Overseas property buying is a major investment decision that requires thorough understanding...",
      category: "教育型内容",
      searchKeywords: ["海外买房", "投资指南", "纽约房产", "外国买家", "overseas", "property", "investment", "guide", "foreign", "buyer"]
    },
    {
      id: "nyc-buying-process",
      title: "纽约购房流程详解",
      titleEn: "Detailed NYC Home Buying Process",
      summary: "一步一步详解纽约购房的完整流程和关键节点",
      summaryEn: "Step-by-step detailed explanation of the complete NYC home buying process and key milestones",
      content: "纽约房地产市场竞争激烈，了解完整的购房流程是成功购房的关键...",
      contentEn: "The New York real estate market is highly competitive, and understanding the complete home buying process...",
      category: "教育型内容",
      searchKeywords: ["纽约购房", "流程", "买房指南", "房地产", "nyc", "home buying", "process", "real estate", "guide"]
    },
    {
      id: "mortgage-application-guide",
      title: "房屋贷款申请攻略",
      titleEn: "Mortgage Application Strategy Guide",
      summary: "详解房屋贷款申请技巧，提高批准率并获得最佳利率",
      summaryEn: "Detailed mortgage application techniques to improve approval rates and secure the best interest rates",
      content: "房屋贷款是购房过程中的重要环节，合适的贷款产品和申请策略能够为您节省数万美元...",
      contentEn: "Mortgage is an important part of the home buying process...",
      category: "教育型内容",
      searchKeywords: ["房屋贷款", "贷款申请", "按揭", "利率", "mortgage", "loan", "application", "interest rate", "financing"]
    },
    {
      id: "tax-optimization",
      title: "税务优化建议",
      titleEn: "Tax Optimization Strategies",
      summary: "房产投资的税务优化策略，合法减税增加投资回报",
      summaryEn: "Tax optimization strategies for property investment to legally reduce taxes and increase investment returns",
      content: "房产投资涉及多种税务考量，合理的税务规划能够显著提高投资回报率...",
      contentEn: "Property investment involves various tax considerations...",
      category: "教育型内容",
      searchKeywords: ["税务优化", "房产税", "投资税务", "节税", "tax optimization", "property tax", "investment tax", "tax saving"]
    },
    // Data-Driven Content
    {
      id: "monthly-market-reports",
      title: "月度市场销售报告",
      titleEn: "Monthly Market Sales Reports",
      summary: "皇后区房地产市场最新销售数据分析",
      summaryEn: "Latest sales data analysis for Queens real estate market",
      content: "2024年第一季度皇后区房地产市场表现强劲，销售量稳定增长...",
      contentEn: "Queens real estate market showed strong performance in Q1 2024...",
      category: "数据驱动内容",
      searchKeywords: ["市场报告", "销售数据", "皇后区", "房地产", "market report", "sales data", "queens", "real estate", "monthly"]
    },
    {
      id: "roi-calculator",
      title: "房产投资ROI计算器",
      titleEn: "Property Investment ROI Calculator",
      summary: "计算您的房产投资回报率",
      summaryEn: "Calculate your property investment return on investment",
      content: "使用我们的专业ROI计算器，评估房产投资的回报率...",
      contentEn: "Use our professional ROI calculator to evaluate property investment returns...",
      category: "数据驱动内容",
      searchKeywords: ["ROI计算器", "投资回报", "计算工具", "roi calculator", "investment", "return", "calculation", "tool"]
    },
    {
      id: "transaction-cycle-analysis",
      title: "成交周期分析",
      titleEn: "Transaction Cycle Analysis",
      summary: "不同价位房产的成交时间和竞争情况",
      summaryEn: "Transaction times and competition levels for different price ranges",
      content: "分析不同价位房产的平均成交时间、竞争激烈程度和成功率...",
      contentEn: "Analysis of average transaction times, competition levels, and success rates...",
      category: "数据驱动内容",
      searchKeywords: ["成交周期", "交易时间", "竞争分析", "transaction", "cycle", "time", "competition", "analysis"]
    },
    {
      id: "hot-neighborhoods-ranking",
      title: "热门社区排行榜",
      titleEn: "Hot Neighborhoods Ranking",
      summary: "基于价格增长和投资潜力的社区排名",
      summaryEn: "Neighborhood rankings based on price growth and investment potential",
      content: "长岛市和阿斯托利亚是当前最具投资潜力的区域...",
      contentEn: "Long Island City and Astoria are currently the most promising investment areas...",
      category: "数据驱动内容",
      searchKeywords: ["热门社区", "排行榜", "投资潜力", "长岛市", "阿斯托利亚", "hot neighborhoods", "ranking", "investment", "potential", "long island city", "astoria"]
    }
  ];

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      const queryLower = query.toLowerCase();
      const results = searchData.filter(item => {
        // Search in keywords
        const keywordMatch = item.searchKeywords.some(keyword => 
          keyword.toLowerCase().includes(queryLower)
        );
        
        // Search in title and summary
        const titleMatch = language === 'zh' 
          ? item.title.toLowerCase().includes(queryLower)
          : (item.titleEn || item.title).toLowerCase().includes(queryLower);
          
        const summaryMatch = language === 'zh'
          ? item.summary.toLowerCase().includes(queryLower)
          : (item.summaryEn || item.summary).toLowerCase().includes(queryLower);
          
        const contentMatch = language === 'zh'
          ? item.content.toLowerCase().includes(queryLower)
          : (item.contentEn || item.content).toLowerCase().includes(queryLower);

        return keywordMatch || titleMatch || summaryMatch || contentMatch;
      });
      
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, language]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">{t("内容搜索")}</h2>
        <p className="text-muted-foreground">
          {t("搜索专业的房地产投资内容和市场分析")}
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={language === 'zh' ? "搜索关键词，如'法拉盛'、'学区房'、'投资回报'..." : "Search keywords like 'Flushing', 'school district', 'ROI'..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 py-3 text-lg"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={clearSearch}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">{t("搜索中...")}</p>
        </div>
      )}

      {/* Search Results */}
      {!isSearching && searchQuery && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {t("搜索结果")} ({searchResults.length})
            </h3>
            {searchResults.length > 0 && (
              <Badge variant="secondary">
                {t("找到")} {searchResults.length} {t("条相关内容")}
              </Badge>
            )}
          </div>

          {searchResults.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  {t("未找到相关内容，请尝试其他关键词")}
                </p>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">{t("建议搜索：")}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {["法拉盛", "学区房", "投资回报", "贷款", "税务"].map((suggestion) => (
                      <Badge 
                        key={suggestion}
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => setSearchQuery(suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {searchResults.map((result) => (
            <Card key={result.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {highlightText(
                        language === 'zh' ? result.title : (result.titleEn || result.title),
                        searchQuery
                      )}
                    </CardTitle>
                    <Badge variant="outline" className="mt-2">
                      {result.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {highlightText(
                    language === 'zh' ? result.summary : (result.summaryEn || result.summary),
                    searchQuery
                  )}
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm line-clamp-3">
                      {highlightText(
                        (language === 'zh' ? result.content : (result.contentEn || result.content)).substring(0, 200) + '...',
                        searchQuery
                      )}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.searchKeywords
                      .filter(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
                      .slice(0, 4)
                      .map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlightText(keyword, searchQuery)}
                        </Badge>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Popular Searches */}
      {!searchQuery && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("热门搜索")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "法拉盛房价", "学区房投资", "纽约购房", "贷款申请",
                "税务优化", "租金回报", "市场报告", "投资计算器"
              ].map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};