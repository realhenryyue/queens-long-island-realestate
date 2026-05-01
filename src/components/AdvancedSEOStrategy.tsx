import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdvancedSEOStrategyProps {
  page?: 'home' | 'calculator' | 'contact';
  customTitle?: string;
  customDescription?: string;
}

export const AdvancedSEOStrategy: React.FC<AdvancedSEOStrategyProps> = ({ 
  page = 'home', 
  customTitle,
  customDescription 
}) => {
  const { currentLanguage } = useLanguage();
  const primaryTitle = "Henry Yue 岳先生 | NYC Real Estate Investment Expert";
  const langPath = currentLanguage === 'zh' ? '/zh/' : '/en/';
  const baseCanonical = `https://www.realhenryyue.com${langPath}`;

  const seoConfig = {
    home: {
      title: customTitle || primaryTitle,
      description: customDescription || "NYC's top real estate expert Henry Yue. Get professional investment analysis, market insights, and ROI calculations. Call 718-717-5210 for expert consultation.",
      keywords: "NYC real estate, Henry Yue, investment analysis, ROI calculator, Queens real estate, Manhattan properties, real estate expert",
      canonical: baseCanonical,
      h1: "NYC Real Estate Investment Expert - Henry Yue"
    },
    calculator: {
      title: "Free NYC ROI Calculator | Real Estate Investment Analysis Tool",
      description: "Calculate NYC real estate ROI instantly. Free investment analysis tool with cap rates, cash flow projections, and market data by expert Henry Yue.",
      keywords: "ROI calculator, NYC real estate calculator, investment analysis, cap rate calculator, cash flow analysis",
      canonical: `${baseCanonical}#roi-calculator`,
      h1: "NYC Real Estate ROI Calculator"
    },
    contact: {
      title: "Contact Henry Yue | NYC Real Estate Expert | 718-717-5210",
      description: "Contact NYC real estate expert Henry Yue for professional investment consultation. Phone: 718-717-5210. Email: RealHenryYue@gmail.com. Free market analysis.",
      keywords: "contact Henry Yue, NYC real estate consultation, real estate expert contact, 718-717-5210",
      canonical: `${baseCanonical}#contact`,
      h1: "Contact NYC Real Estate Expert Henry Yue"
    }
  };

  const config = seoConfig[page];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{config.title}</title>
      <meta name="title" content={config.title} />
      <meta name="description" content={config.description} />
      <meta name="keywords" content={config.keywords} />
      
      {/* Canonical URL (per language variant) */}
      <link rel="canonical" href={config.canonical} />

      {/* hreflang annotations linking both language variants */}
      <link rel="alternate" hrefLang="en" href="https://www.realhenryyue.com/en/" />
      <link rel="alternate" hrefLang="zh" href="https://www.realhenryyue.com/zh/" />
      <link rel="alternate" hrefLang="x-default" href="https://www.realhenryyue.com/en/" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={config.canonical} />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:image" content="https://www.realhenryyue.com/og-image.webp" />
      <meta property="og:site_name" content="Henry Yue Real Estate" />
      <meta property="og:locale" content={currentLanguage === 'zh' ? 'zh_CN' : 'en_US'} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={config.canonical} />
      <meta property="twitter:title" content={config.title} />
      <meta property="twitter:description" content={config.description} />
      <meta property="twitter:image" content="https://www.realhenryyue.com/og-image.webp" />
      <meta name="twitter:creator" content="@henryyue_realestate" />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="Henry Yue" />
      <meta name="geo.region" content="US-NY" />
      <meta name="geo.placename" content="New York City" />
      <meta name="geo.position" content="40.7589,-73.9851" />
      <meta name="ICBM" content="40.7589,-73.9851" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Performance & Security */}
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <meta name="referrer" content="origin-when-cross-origin" />
    </Helmet>
  );
};