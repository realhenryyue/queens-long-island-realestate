/**
 * Client-side fallback scraper for Mortgage News Daily.
 * Used when the `mortgage-rates` edge function is unreachable, so the
 * displayed rates/date still stay current.
 */

export type LiveRate = { key: string; label: string; rate: number; change: number };
export type LivePayload = { updated: string; rates: LiveRate[] };

const SOURCE_URL = "https://www.mortgagenewsdaily.com/mortgage-rates";

const PROXIES = [
  (u: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  (u: string) => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(u)}`,
  (u: string) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
];

const KEY_MAP: Record<string, string> = {
  "30 yr. fixed": "30yr",
  "15 yr. fixed": "15yr",
  "30 yr. fha": "fha",
  "30 yr. jumbo": "jumbo",
  "7/6 sofr arm": "arm",
  "5/1 arm": "arm",
  "30 yr. va": "va",
};

const decode = (s: string) =>
  s
    .replace(/&#x2B;/gi, "+")
    .replace(/&#x2212;|&minus;/gi, "-")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .trim();

export function parseRates(html: string): LiveRate[] {
  const rows: LiveRate[] = [];
  const blocks = html.split(/class="[^"]*rate-product"/g).slice(1);

  for (const block of blocks) {
    const chunk = block.slice(0, 4000);
    const nameMatch = chunk.match(/rate-product-name[^>]*>\s*<a[^>]*>([\s\S]*?)<\/a>/);
    const rateMatch = chunk.match(/class="rate"\s*>\s*([\d.]+)\s*%/);
    const changeMatch = chunk.match(/rate-daily-chg[^"]*"\s*>\s*([\s\S]*?)\s*<\/div>/);
    if (!nameMatch || !rateMatch) continue;

    const label = decode(nameMatch[1].replace(/\s+/g, " "));
    const key = KEY_MAP[label.toLowerCase()];
    if (!key || rows.some((r) => r.key === key)) continue;

    const rate = Number(rateMatch[1]);
    if (!Number.isFinite(rate)) continue;

    let change = 0;
    if (changeMatch) {
      const raw = decode(changeMatch[1]).replace(/<[^>]*>/g, "").replace(/[^0-9.+-]/g, "");
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) change = parsed;
    }
    rows.push({ key, label, rate, change });
  }
  return rows;
}

const nyToday = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });

export async function fetchRatesViaProxy(): Promise<LivePayload | null> {
  for (const build of PROXIES) {
    try {
      const res = await fetch(build(SOURCE_URL), { headers: { Accept: "text/html" } });
      if (!res.ok) continue;
      const html = await res.text();
      const rates = parseRates(html);
      if (rates.length) return { updated: nyToday(), rates };
    } catch {
      /* try next proxy */
    }
  }
  return null;
}
