import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbNavigation = ({ items }: BreadcrumbNavigationProps) => {
  const { t } = useLanguage();

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground" itemScope itemType="https://schema.org/BreadcrumbList">
        <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
          <a 
            href="/" 
            className="flex items-center hover:text-primary transition-smooth"
            itemProp="item"
          >
            <Home className="w-4 h-4 mr-1" aria-hidden="true" />
            <span itemProp="name">{t('nav.home')}</span>
          </a>
          <meta itemProp="position" content="1" />
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center" itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" aria-hidden="true" />
            {item.href && !item.current ? (
              <a 
                href={item.href} 
                className="hover:text-primary transition-smooth"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </a>
            ) : (
              <span 
                className={item.current ? "text-foreground font-medium" : ""}
                itemProp="name"
                aria-current={item.current ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={`${index + 2}`} />
          </li>
        ))}
      </ol>
    </nav>
  );
};