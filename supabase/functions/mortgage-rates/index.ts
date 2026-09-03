import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const SOURCE_URL = 'https://www.mortgagenewsdaily.com/mortgage-rates';
const TTL_MS = 3 * 60 * 60 * 1000; // 3 hours

type RateRow = { key: string; label: string; rate: number; change: number };
type Payload = { updated: string; rates: RateRow[]; source: string };

// Module-level cache (survives across warm invocations)
let cache: { at: number; payload: Payload } | null = null;

const KEY_MAP: Record<string, string> = {
  '30 yr. fixed': '30yr',
  '15 yr. fixed': '15yr',
  '30 yr. fha': 'fha',
  '30 yr. jumbo': 'jumbo',
  '7/6 sofr arm': 'arm',
  '5/1 arm': 'arm',
  '30 yr. va': 'va',
};

const decode = (s: string) =>
  s
    .replace(/&#x2B;/gi, '+')
    .replace(/&#x2212;|&minus;/gi, '-')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .trim();

function parseRates(html: string): RateRow[] {
  const rows: RateRow[] = [];
  const blocks = html.split(/class="[^"]*rate-product"/g).slice(1);

  for (const block of blocks) {
    const chunk = block.slice(0, 4000);
    const nameMatch = chunk.match(/rate-product-name[^>]*>\s*<a[^>]*>([\s\S]*?)<\/a>/);
    const rateMatch = chunk.match(/class="rate"\s*>\s*([\d.]+)\s*%/);
    const changeMatch = chunk.match(
      /rate-daily-chg[^"]*"\s*>\s*([\s\S]*?)\s*<\/div>/,
    );
    if (!nameMatch || !rateMatch) continue;

    const label = decode(nameMatch[1].replace(/\s+/g, ' '));
    const key = KEY_MAP[label.toLowerCase()];
    if (!key || rows.some((r) => r.key === key)) continue;

    const rate = Number(rateMatch[1]);
    let change = 0;
    if (changeMatch) {
      const raw = decode(changeMatch[1]).replace(/[^0-9.+-]/g, '');
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) change = parsed;
    }
    if (!Number.isFinite(rate)) continue;
    rows.push({ key, label, rate, change });
  }
  return rows;
}

async function loadRates(): Promise<Payload> {
  const res = await fetch(SOURCE_URL, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      Accept: 'text/html',
    },
  });
  if (!res.ok) {
    throw new Error(`Source request failed [${res.status}]: ${await res.text()}`);
  }
  const html = await res.text();
  const rates = parseRates(html);
  if (rates.length === 0) {
    throw new Error('Could not parse any rates from Mortgage News Daily');
  }
  // MND publishes weekdays around 4PM ET; use New York date as the "as of" day.
  const updated = new Date().toLocaleDateString('en-CA', {
    timeZone: 'America/New_York',
  });
  return { updated, rates, source: SOURCE_URL };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const fresh = cache && Date.now() - cache.at < TTL_MS;
    if (!fresh) {
      try {
        cache = { at: Date.now(), payload: await loadRates() };
      } catch (err) {
        if (!cache) throw err;
        console.error('Refresh failed, serving stale cache:', err);
      }
    }

    if (!cache) {
      throw new Error('Mortgage rate cache is unavailable');
    }

    return new Response(JSON.stringify(cache.payload), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800',
      },
      status: 200,
    });
  } catch (err) {
    console.error('mortgage-rates failed:', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
