import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Daily mortgage rates (national averages), sourced from Mortgage News Daily.
 * Update `RATES_UPDATED` and the `change` / `rate` values when refreshing.
 */
const RATES_UPDATED = "2026-08-28";

type RateRow = {
  key: string;
  labelEn: string;
  labelZh: string;
  rate: number;
  change: number;
  featured?: boolean;
};

const RATES: RateRow[] = [
  { key: "30yr", labelEn: "30 Yr. Fixed", labelZh: "30年固定利率", rate: 6.81, change: 0.06, featured: true },
  { key: "15yr", labelEn: "15 Yr. Fixed", labelZh: "15年固定利率", rate: 6.35, change: 0.03, featured: true },
  { key: "fha", labelEn: "30 Yr. FHA", labelZh: "30年 FHA 贷款", rate: 6.37, change: 0.03 },
  { key: "jumbo", labelEn: "30 Yr. Jumbo", labelZh: "30年 Jumbo 大额贷款", rate: 6.90, change: 0.02 },
  { key: "arm", labelEn: "7/6 SOFR ARM", labelZh: "7/6 SOFR 浮动利率", rate: 6.33, change: 0.03 },
  { key: "va", labelEn: "30 Yr. VA", labelZh: "30年 VA 退伍军人贷款", rate: 6.37, change: 0.02 },
];

const formatChange = (change: number) =>
  `${change > 0 ? "+" : change < 0 ? "-" : ""}${Math.abs(change).toFixed(2)}%`;

const ChangeBadge = ({ change, large = false }: { change: number; large?: boolean }) => {
  const Icon = change > 0 ? ArrowUpRight : change < 0 ? ArrowDownRight : Minus;
  const tone =
    change > 0
      ? "text-destructive"
      : change < 0
        ? "text-accent"
        : "text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold ${tone} ${large ? "text-lg" : "text-sm"}`}
    >
      <Icon className={large ? "w-5 h-5" : "w-4 h-4"} aria-hidden="true" />
      {formatChange(change)}
    </span>
  );
};

export const MortgageRates = () => {
  const { currentLanguage } = useLanguage();
  const zh = currentLanguage === "zh";

  const featured = RATES.filter((r) => r.featured);
  const rest = RATES.filter((r) => !r.featured);

  const updatedLabel = new Date(RATES_UPDATED).toLocaleDateString(
    zh ? "zh-CN" : "en-US",
    { year: "numeric", month: zh ? "long" : "short", day: "numeric" }
  );

  return (
    <section
      className="py-16 bg-secondary/30"
      aria-label={zh ? "每日最新房贷利率" : "Daily Mortgage Rates"}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-accent" aria-hidden="true" />
            <span className="text-accent font-semibold text-sm uppercase tracking-wide">
              {zh ? "每日利率更新" : "Daily Rate Update"}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">
            {zh ? "最新房贷利率" : "Today's Mortgage Rates"}
          </h2>
          <p className="text-muted-foreground">
            {zh
              ? "全美平均房贷利率，帮助您精准计算购房成本与投资回报。"
              : "National average mortgage rates to help you model purchase costs and investment returns."}
          </p>
        </div>

        <Card className="p-6 lg:p-8 shadow-elegant bg-card">
          {/* Featured rates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {featured.map((row) => (
              <div
                key={row.key}
                className="rounded-lg border border-border bg-secondary/40 p-6 text-center"
              >
                <div className="text-muted-foreground font-medium mb-2">
                  {zh ? row.labelZh : row.labelEn}
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2 tabular-nums">
                  {row.rate.toFixed(2)}%
                </div>
                <ChangeBadge change={row.change} large />
              </div>
            ))}
          </div>

          {/* Secondary rates */}
          <div className="divide-y divide-border">
            {rest.map((row) => (
              <div
                key={row.key}
                className="flex items-center justify-between gap-4 py-3"
              >
                <span className="text-foreground font-medium">
                  {zh ? row.labelZh : row.labelEn}
                </span>
                <div className="flex items-center gap-4 sm:gap-8">
                  <span className="text-lg font-bold text-primary tabular-nums">
                    {row.rate.toFixed(2)}%
                  </span>
                  <span className="min-w-[76px] text-right">
                    <ChangeBadge change={row.change} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>
              {zh
                ? `更新时间：${updatedLabel} · 数据为全美平均值`
                : `Updated: ${updatedLabel} · Based on national averages`}
            </span>
            <a
              href="https://www.mortgagenewsdaily.com/mortgage-rates"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent font-semibold hover:underline"
            >
              {zh ? "数据来源：Mortgage News Daily" : "Source: Mortgage News Daily"}
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MortgageRates;
