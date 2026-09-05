import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type RateLookup = (years: number) => { rate: number; basisEn: string; basisZh: string };

const DOWN_OPTIONS = [20, 30, 50, 80];
const TERM_OPTIONS = [5, 10, 15, 30];

const monthlyPayment = (loan: number, annualRatePercent: number, years: number) => {
  const r = annualRatePercent / 100 / 12;
  const n = years * 12;
  if (n <= 0) return 0;
  if (r === 0) return loan / n;
  return (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
};

interface Props {
  getRate: RateLookup;
}

export const MonthlyPaymentCalculator = ({ getRate }: Props) => {
  const { currentLanguage } = useLanguage();
  const zh = currentLanguage === "zh";

  const [priceText, setPriceText] = useState("1000000");
  const [downPercent, setDownPercent] = useState(30);
  const [years, setYears] = useState(30);

  const price = Math.max(0, Number(priceText.replace(/[^\d.]/g, "")) || 0);
  const down = price * (downPercent / 100);
  const loan = price - down;

  const active = getRate(years);
  const payment = monthlyPayment(loan, active.rate, years);

  const money = (v: number, decimals = 0) =>
    v.toLocaleString(zh ? "zh-CN" : "en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const comparison = useMemo(
    () =>
      TERM_OPTIONS.map((y) => {
        const info = getRate(y);
        const pay = monthlyPayment(loan, info.rate, y);
        return {
          years: y,
          rate: info.rate,
          payment: pay,
          totalInterest: pay * y * 12 - loan,
        };
      }),
    [loan, getRate]
  );

  return (
    <Card className="mt-8 p-6 lg:p-8 bg-card shadow-elegant">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-accent" aria-hidden="true" />
        <h3 className="text-xl lg:text-2xl font-bold text-primary">
          {zh ? "月供计算器" : "Monthly Payment Calculator"}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="mpc-price"
              className="block text-sm font-medium text-muted-foreground mb-2"
            >
              {zh ? "房产总价（美元）" : "Home price (USD)"}
            </label>
            <Input
              id="mpc-price"
              inputMode="numeric"
              value={priceText}
              onChange={(e) => setPriceText(e.target.value)}
              className="text-lg font-semibold tabular-nums"
            />
          </div>

          <div>
            <span className="block text-sm font-medium text-muted-foreground mb-2">
              {zh ? "首付比例" : "Down payment"}
            </span>
            <div className="grid grid-cols-4 gap-2">
              {DOWN_OPTIONS.map((p) => (
                <Button
                  key={p}
                  type="button"
                  variant={downPercent === p ? "default" : "outline"}
                  onClick={() => setDownPercent(p)}
                  className="font-semibold"
                >
                  {p}%
                </Button>
              ))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground tabular-nums">
              {zh ? "首付金额：" : "Down payment: "}
              {money(down)} · {zh ? "贷款额：" : "Loan: "}
              {money(loan)}
            </p>
          </div>

          <div>
            <span className="block text-sm font-medium text-muted-foreground mb-2">
              {zh ? "贷款年限" : "Loan term"}
            </span>
            <div className="grid grid-cols-4 gap-2">
              {TERM_OPTIONS.map((y) => (
                <Button
                  key={y}
                  type="button"
                  variant={years === y ? "default" : "outline"}
                  onClick={() => setYears(y)}
                  className="font-semibold"
                >
                  {zh ? `${y}年` : `${y} yr`}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="rounded-lg border border-border bg-secondary/40 p-6 flex flex-col justify-center text-center">
          <div className="text-muted-foreground font-medium mb-2">
            {zh ? "预计每月还款" : "Estimated monthly payment"}
          </div>
          <div className="text-4xl lg:text-5xl font-bold text-primary tabular-nums mb-3">
            {money(payment)}
          </div>
          <div className="text-sm text-muted-foreground">
            {zh
              ? `按当日利率 ${active.rate.toFixed(2)}%（${active.basisZh}）· ${years}年期`
              : `At today's ${active.rate.toFixed(2)}% (${active.basisEn}) · ${years}-year term`}
          </div>
          <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
            {zh
              ? "仅含贷款本金与利息，不含房产税、保险、HOA 及其他费用。纽约地区这些费用通常会让实际月支出再增加 30%–50%。"
              : "Principal and interest only — property taxes, insurance, HOA and other costs are not included. In the NYC area these typically add another 30%–50% to your real monthly outlay."}
          </p>
        </div>
      </div>

      {/* Comparison list */}
      <div className="mt-8">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          {zh ? "不同年限对比" : "Compare loan terms"}
        </h4>
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="grid grid-cols-4 gap-2 bg-secondary/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span>{zh ? "年限" : "Term"}</span>
            <span className="text-right">{zh ? "利率" : "Rate"}</span>
            <span className="text-right">{zh ? "月供" : "Monthly"}</span>
            <span className="text-right">{zh ? "总利息" : "Total interest"}</span>
          </div>
          <div className="divide-y divide-border">
            {comparison.map((row) => (
              <div
                key={row.years}
                className={`grid grid-cols-4 gap-2 px-4 py-3 text-sm tabular-nums ${
                  row.years === years ? "bg-accent/10 font-semibold text-primary" : "text-foreground"
                }`}
              >
                <span>{zh ? `${row.years}年` : `${row.years} yr`}</span>
                <span className="text-right">{row.rate.toFixed(2)}%</span>
                <span className="text-right">{money(row.payment)}</span>
                <span className="text-right">{money(Math.max(0, row.totalInterest))}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MonthlyPaymentCalculator;
