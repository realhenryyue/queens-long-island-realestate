import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

/**
 * Language toggle.
 *
 * IMPORTANT: This switches the SPA's language IN PLACE via LanguageContext.
 * It does NOT navigate to /en/ or /zh/, because those routes serve separate
 * static SEO landing pages (public/en/index.html, public/zh/index.html) that
 * intentionally contain only a stripped-down summary for search engines.
 * Sending a real user there would show an "incomplete" page missing the
 * ROI calculator, market analysis, Medium feed, etc.
 *
 * Crawlers still discover /en/ and /zh/ via sitemap + hreflang.
 */
export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const nextLang = language === "en" ? "zh" : "en";
  const targetLabel = nextLang === "zh" ? "中文" : "English";

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      onClick={() => setLanguage(nextLang)}
      aria-label={`Switch language to ${targetLabel}`}
    >
      <Globe className="w-4 h-4" />
      {targetLabel}
    </Button>
  );
};
