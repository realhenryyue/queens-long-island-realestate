import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
      className="flex items-center gap-2"
    >
      <Globe className="w-4 h-4" />
      {language === 'en' ? '中文' : 'English'}
    </Button>
  );
};