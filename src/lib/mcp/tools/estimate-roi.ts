import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "estimate_roi",
  title: "Estimate investment ROI",
  description:
    "Estimate cap rate, monthly cash flow, and cash-on-cash return for a rental property investment.",
  inputSchema: {
    purchase_price: z.number().positive().describe("Purchase price in USD."),
    down_payment_percent: z
      .number()
      .min(0)
      .max(100)
      .default(20)
      .describe("Down payment as a percentage of price."),
    interest_rate_percent: z.number().min(0).max(30).default(6.5).describe("Annual mortgage rate."),
    loan_years: z.number().int().min(1).max(40).default(30).describe("Mortgage term in years."),
    monthly_rent: z.number().nonnegative().describe("Expected gross monthly rent in USD."),
    monthly_expenses: z
      .number()
      .nonnegative()
      .default(0)
      .describe("Monthly taxes, insurance, HOA, maintenance, and management in USD."),
    vacancy_percent: z.number().min(0).max(50).default(5).describe("Assumed vacancy rate."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({
    purchase_price,
    down_payment_percent,
    interest_rate_percent,
    loan_years,
    monthly_rent,
    monthly_expenses,
    vacancy_percent,
  }) => {
    const down = purchase_price * ((down_payment_percent ?? 20) / 100);
    const loan = purchase_price - down;
    const r = (interest_rate_percent ?? 6.5) / 100 / 12;
    const n = (loan_years ?? 30) * 12;
    const mortgage =
      r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const effectiveRent = monthly_rent * (1 - (vacancy_percent ?? 5) / 100);
    const expenses = monthly_expenses ?? 0;
    const noiMonthly = effectiveRent - expenses;
    const capRate = (noiMonthly * 12) / purchase_price;
    const cashFlow = noiMonthly - mortgage;
    const cashOnCash = down > 0 ? (cashFlow * 12) / down : 0;

    const round = (v: number) => Math.round(v * 100) / 100;
    const result = {
      down_payment: round(down),
      loan_amount: round(loan),
      monthly_mortgage_payment: round(mortgage),
      effective_monthly_rent: round(effectiveRent),
      monthly_noi: round(noiMonthly),
      monthly_cash_flow: round(cashFlow),
      annual_cash_flow: round(cashFlow * 12),
      cap_rate_percent: round(capRate * 100),
      cash_on_cash_return_percent: round(cashOnCash * 100),
    };

    return {
      content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
