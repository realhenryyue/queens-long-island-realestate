import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <>
      {/* Inline SEO for 404 page */}
      <title>404 - Page Not Found | Henry Yue Real Estate</title>
      <meta name="description" content="Page not found. Return to Henry Yue Real Estate for NYC investment analysis and property services." />
      <meta name="robots" content="noindex, nofollow" />
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-lg mx-auto px-4">
          <h1 className="text-6xl font-bold mb-6 text-primary">404</h1>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-4">
            <a 
              href="/en" 
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Return to Home
            </a>
            
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-4">Quick Links:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/en/investment-analysis" className="text-primary hover:underline">Investment Analysis</a>
                <a href="/en/queens-real-estate" className="text-primary hover:underline">Queens Real Estate</a>
                <a href="/en/roi-calculator" className="text-primary hover:underline">ROI Calculator</a>
                <a href="/en/contact" className="text-primary hover:underline">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
