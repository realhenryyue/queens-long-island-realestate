import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

/**
 * Language toggle.
 * Navigates to real static URLs (/en/ and /zh/) so search engines see
 * independent, fully-rendered language pages instead of client-only switching.
 */
export const LanguageToggle = () => {
  const { language } = useLanguage();
  const targetHref = language === "en" ? "/zh/" : "/en/";
  const targetLabel = language === "en" ? "中文" : "English";
  const targetHrefLang = language === "en" ? "zh" : "en";

  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <a href={targetHref} hrefLang={targetHrefLang} rel="alternate" aria-label={`Switch language to ${targetLabel}`}>
        <Globe className="w-4 h-4" />
        {targetLabel}
      </a>
    </Button>
  );
};
