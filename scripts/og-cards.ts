/*
 * Social share cards (og:image), 1200x630 PNG: typography + a drawn river line, no photos, no AI.
 * Rendered in Chrome with the site's own fonts. Output: client/public/og/<key>.png (committed, so
 * the Vercel build does not need a browser). Re-run after changing a trip/place/post title or the
 * brand name:
 *   PLAYWRIGHT=~/Claude/browser-stack/node_modules/playwright node --import tsx scripts/og-cards.ts
 */
import { mkdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { site } from "../client/src/site.config.ts";
import { trips, formatPrice } from "../client/src/content/trips.ts";
import { places } from "../client/src/content/places.ts";
import { posts } from "../client/src/content/journal.ts";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || "playwright");
const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "client/public/og");
mkdirSync(out, { recursive: true });

const font = (pkg: string, file: string) =>
  readFileSync(path.join(root, "node_modules/@fontsource", pkg, "files", file)).toString("base64");
const faces = `
@font-face{font-family:YS;src:url(data:font/woff2;base64,${font("young-serif", "young-serif-latin-400-normal.woff2")})}
@font-face{font-family:M;font-weight:400;src:url(data:font/woff2;base64,${font("mukta", "mukta-latin-400-normal.woff2")})}
@font-face{font-family:M;font-weight:600;src:url(data:font/woff2;base64,${font("mukta", "mukta-latin-600-normal.woff2")})}
@font-face{font-family:MD;font-weight:600;src:url(data:font/woff2;base64,${font("mukta", "mukta-devanagari-600-normal.woff2")})}`;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
// Colours = design tokens (docs/design.md): paper, ink, ink-2, saffron, sindoor, river.
const card = (kicker: string, title: string, line: string, hindi = "") => `<!doctype html><html><head><style>${faces}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#f9f5ec;color:#291c15;font-family:M;position:relative;overflow:hidden}
.k{position:absolute;left:80px;top:72px;font:600 26px M;letter-spacing:.08em;text-transform:uppercase;color:#9d3013}
h1{position:absolute;left:80px;top:128px;width:820px;font:400 ${title.length > 34 ? 68 : 84}px/1.08 YS;letter-spacing:-.01em}
.l{position:absolute;left:80px;bottom:132px;width:820px;font:400 30px/1.35 M;color:#58463b;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.f{position:absolute;left:80px;right:300px;bottom:56px;display:flex;justify-content:space-between;align-items:baseline;border-top:3px solid #291c15;padding-top:18px;font:600 26px M}
.f b{font:400 34px YS}.hi{position:absolute;left:80px;top:250px;font:600 40px MD;color:#1a586d}
svg{position:absolute;right:0;top:0}</style></head><body>
<svg width="300" height="630" viewBox="0 0 300 630" aria-hidden="true">
  <path d="M210 -10 C 150 120, 260 230, 190 340 S 140 520, 220 640" fill="none" stroke="#b4d8e1" stroke-width="64" stroke-linecap="round"/>
  <path d="M210 -10 C 150 120, 260 230, 190 340 S 140 520, 220 640" fill="none" stroke="#1a586d" stroke-width="3"/>
  ${[150, 220, 290, 360, 430].map((y, i) => `<circle cx="${[176, 228, 214, 168, 176][i]}" cy="${y}" r="9" fill="#f19024" stroke="#291c15" stroke-width="3"/>`).join("")}
</svg>
${hindi ? `<div class="hi">${esc(hindi)}</div>` : ""}
<div class="k">${esc(kicker)}</div><h1>${esc(title)}</h1><div class="l">${esc(line)}</div>
<div class="f"><b>${esc(site.brandName)}</b><span>Plan on WhatsApp</span></div></body></html>`;

const cards: [string, string][] = [
  ["default", card("Varanasi · Sarnath · Ayodhya · Prayagraj", "Local guides on the ghats of Kashi", "Boat rides, ghat walks, aarti and pooja, with a plan and a fixed quote before you pay.")],
  ...trips.map((t): [string, string] => [`trip-${t.slug}`, card(`Trip · ${t.duration}`, t.name, `From ${formatPrice(t.priceFrom)} · ${t.summary}`)]),
  ...places.map((p): [string, string] => [`place-${p.slug}`, card(p.fromVaranasi === "Base city" ? "Destination · base city" : `Destination · ${p.fromVaranasi} from Varanasi`, p.name, p.summary, p.hindi)]),
  ...posts.map((p): [string, string] => [`post-${p.slug}`, card("Journal", p.title, p.description)]),
];

const browser = await chromium.launch({ channel: process.env.CHANNEL || "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [key, html] of cards) {
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(out, `${key}.png`) });
}
await browser.close();
console.log(`Wrote ${cards.length} cards to client/public/og/`);
