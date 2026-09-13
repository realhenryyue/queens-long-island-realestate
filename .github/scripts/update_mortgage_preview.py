"""Daily public preview from the site's EXISTING rate-result endpoint.

Run at the root of the GitHub repo. Requires Pillow and the tracked .env public
client key. Never writes a made-up rate when the endpoint is unavailable.
"""
from __future__ import annotations

import json
import os
import re
import sys
from datetime import date, datetime, timedelta
from pathlib import Path
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo

from PIL import Image, ImageDraw, ImageFont

HTML = Path('public/Henry_Yue_Mortgage_Planner.html')
IMAGE = Path('public/mortgage-share-cover.png')
ENDPOINT = 'https://c--51d57972-46c1-43d0-858b-2ad97bb86680-prod.lovable.cloud/functions/v1/mortgage-rates'
SOURCE = 'https://www.mortgagenewsdaily.com/mortgage-rates'
SITE = 'https://www.realhenryyue.com/Henry_Yue_Mortgage_Planner.html'


def font(size: int, bold: bool = False):
    name = 'DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf'
    for root in ('/usr/share/fonts/truetype/dejavu', '/usr/local/share/fonts'):
        file = Path(root) / name
        if file.exists():
            return ImageFont.truetype(str(file), size)
    return ImageFont.load_default()


def load_rates() -> tuple[str, float, float]:
    env = Path('.env').read_text(encoding='utf-8')
    match = re.search(r'^VITE_SUPABASE_PUBLISHABLE_KEY\s*=\s*["\']?([^"\'\s]+)', env, re.M)
    if not match:
        raise RuntimeError('Tracked .env public client key is missing')
    req = Request(ENDPOINT, headers={'apikey': match.group(1), 'Accept': 'application/json'})
    with urlopen(req, timeout=18) as response:
        payload = json.load(response)
    if payload.get('source') != SOURCE or not isinstance(payload.get('rates'), list):
        raise RuntimeError('Unexpected rate feed response')
    checked = date.fromisoformat(payload['updated'])
    today = datetime.now(ZoneInfo('America/New_York')).date()
    if checked > today or today - checked > timedelta(days=3):
        raise RuntimeError('Feed check date is outside the expected window')
    values = {r.get('key'): r.get('rate') for r in payload['rates'] if isinstance(r, dict)}
    rates = [values.get(key) for key in ('30yr', '15yr')]
    if any(not isinstance(value, (int, float)) or not (0 < value <= 30) for value in rates):
        raise RuntimeError('30- or 15-year reference rate missing; retaining prior preview')
    return checked.isoformat(), float(rates[0]), float(rates[1])


def draw_card(checked: str, thirty: float, fifteen: float) -> None:
    canvas = Image.new('RGB', (1200, 630), '#faf8f3')
    pen = ImageDraw.Draw(canvas)
    pen.rectangle((0, 0, 1200, 132), fill='#172538')
    pen.text((65, 45), 'RealHenryYue', font=font(30, True), fill='#e8d1a1')
    pen.text((65, 185), 'Mortgage rate snapshot', font=font(46), fill='#172538')
    for x, title, rate in [(64, '30 Yr. Fixed', thirty), (620, '15 Yr. Fixed', fifteen)]:
        pen.rounded_rectangle((x, 264, x + 518, 485), radius=6, fill='#ffffff', outline='#deddd5', width=2)
        pen.text((x + 25, 293), title, font=font(27), fill='#48545e')
        pen.text((x + 22, 345), f'{rate:.2f}%', font=font(67, True), fill='#15803d')
        pen.text((x + 26, 449), f'Site checked: {checked}', font=font(18), fill='#6c7777')
    pen.text((66, 524), 'National reference index  ·  Not a lender quote  ·  Verify publication date', font=font(18), fill='#59636c')
    pen.text((66, 572), 'www.realhenryyue.com', font=font(21), fill='#172538')
    IMAGE.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(IMAGE, optimize=True)


def update_html(checked: str) -> None:
    source = HTML.read_text(encoding='utf-8')
    image = f'https://www.realhenryyue.com/mortgage-share-cover.png?v={checked}'
    for key in ('og:image', 'twitter:image'):
        pattern = rf'(<meta (?:property|name)="{re.escape(key)}" content=")[^"]+("\s*/?>)'
        source, count = re.subn(pattern, lambda m: m.group(1) + image + m.group(2), source, count=1)
        if count != 1:
            raise RuntimeError(f'{key} metadata missing')
    pattern = r'(<meta property="og:url" content=")[^"]+("\s*/?>)'
    source, count = re.subn(pattern, lambda m: m.group(1) + SITE + '?asof=' + checked + m.group(2), source, count=1)
    if count != 1:
        raise RuntimeError('og:url metadata missing')
    HTML.write_text(source, encoding='utf-8')


if __name__ == '__main__':
    try:
        checked, thirty, fifteen = load_rates()
        draw_card(checked, thirty, fifteen)
        update_html(checked)
        print(f'Preview updated from existing website feed: {checked}; 30/15 year indices')
    except Exception as exc:
        sys.exit(f'Preview NOT changed: {exc}')
