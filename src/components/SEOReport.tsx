import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOIssue {
  level: 'error' | 'warning' | 'info';
  message: string;
  category: string;
}

export const SEOReport = () => {
  const { language } = useLanguage();
  const [issues, setIssues] = useState<SEOIssue[]>([]);

  useEffect(() => {
    const analyzePageSEO = () => {
      const foundIssues: SEOIssue[] = [];

      // Check title length
      const title = document.title;
      if (!title) {
        foundIssues.push({
          level: 'error',
          message: 'Missing page title',
          category: 'Title'
        });
      } else if (title.length > 60) {
        foundIssues.push({
          level: 'warning',
          message: `Title too long: ${title.length} characters (recommended: <60)`,
          category: 'Title'
        });
      }

      // Check meta description
      const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (!metaDesc || !metaDesc.content) {
        foundIssues.push({
          level: 'error',
          message: 'Missing meta description',
          category: 'Meta Description'
        });
      } else if (metaDesc.content.length > 160) {
        foundIssues.push({
          level: 'warning',
          message: `Meta description too long: ${metaDesc.content.length} characters (recommended: <160)`,
          category: 'Meta Description'
        });
      }

      // Check H1 tags
      const h1Elements = document.querySelectorAll('h1');
      if (h1Elements.length === 0) {
        foundIssues.push({
          level: 'error',
          message: 'Missing H1 tag',
          category: 'Headings'
        });
      } else if (h1Elements.length > 1) {
        foundIssues.push({
          level: 'warning',
          message: `Multiple H1 tags found: ${h1Elements.length} (recommended: 1)`,
          category: 'Headings'
        });
      }

      // Check images without alt text
      const images = document.querySelectorAll('img');
      const imagesWithoutAlt = Array.from(images).filter(img => !img.alt || img.alt.trim() === '');
      if (imagesWithoutAlt.length > 0) {
        foundIssues.push({
          level: 'warning',
          message: `${imagesWithoutAlt.length} images missing alt text`,
          category: 'Images'
        });
      }

      // Check canonical link
      const canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        foundIssues.push({
          level: 'warning',
          message: 'Missing canonical URL',
          category: 'Canonical'
        });
      }

      // Check structured data
      const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
      if (structuredData.length === 0) {
        foundIssues.push({
          level: 'warning',
          message: 'No structured data found',
          category: 'Structured Data'
        });
      }

      // Check Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      
      if (!ogTitle) {
        foundIssues.push({
          level: 'warning',
          message: 'Missing Open Graph title',
          category: 'Open Graph'
        });
      }
      if (!ogDescription) {
        foundIssues.push({
          level: 'warning',
          message: 'Missing Open Graph description',
          category: 'Open Graph'
        });
      }
      if (!ogImage) {
        foundIssues.push({
          level: 'warning',
          message: 'Missing Open Graph image',
          category: 'Open Graph'
        });
      }

      // Check hreflang tags
      const hreflangTags = document.querySelectorAll('link[hreflang]');
      if (hreflangTags.length === 0) {
        foundIssues.push({
          level: 'info',
          message: 'No hreflang tags found (consider for international SEO)',
          category: 'International SEO'
        });
      }

      setIssues(foundIssues);
    };

    // Run analysis after page loads
    setTimeout(analyzePageSEO, 1000);
  }, [language]);

  // Calculate SEO score
  const calculateSEOScore = () => {
    const errorCount = issues.filter(issue => issue.level === 'error').length;
    const warningCount = issues.filter(issue => issue.level === 'warning').length;
    
    let score = 100;
    score -= errorCount * 15; // Errors are major deductions
    score -= warningCount * 5; // Warnings are minor deductions
    
    return Math.max(0, score);
  };

  const seoScore = calculateSEOScore();

  // Only show in development mode
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white shadow-lg border rounded-lg p-4 max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">SEO Score</h3>
          <div className={`px-2 py-1 rounded text-xs font-medium ${
            seoScore >= 90 ? 'bg-green-100 text-green-800' :
            seoScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {seoScore}/100
          </div>
        </div>
        
        {issues.length > 0 && (
          <div className="space-y-1">
            <div className="text-xs text-gray-600 mb-2">Issues found:</div>
            {issues.slice(0, 3).map((issue, index) => (
              <div key={index} className="text-xs flex items-start gap-2">
                <span className={`inline-block w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                  issue.level === 'error' ? 'bg-red-500' :
                  issue.level === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <span className="text-gray-700">{issue.message}</span>
              </div>
            ))}
            {issues.length > 3 && (
              <div className="text-xs text-gray-500 mt-1">
                +{issues.length - 3} more issues
              </div>
            )}
          </div>
        )}
        
        {issues.length === 0 && (
          <div className="text-xs text-green-600">
            ✓ No SEO issues detected
          </div>
        )}
      </div>
    </div>
  );
};