/*
 * Browser QA against a running preview (npm run preview): screenshots of every page at desktop and
 * mobile, horizontal-overflow check at 320/375/414/768, axe-core WCAG 2.2 AA scan, console errors.
 *   BASE=http://127.0.0.1:4870 SHOTS=./shots PLAYWRIGHT=/path/to/playwright node scripts/qa.mjs
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || "playwright");
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const BASE = process.env.BASE || "http://127.0.0.1:4870";
const SHOTS = process.env.SHOTS || "qa-shots";
mkdirSync(SHOTS, { recursive: true });

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>[^<]*?(\/[^<]*)<\/loc>/g)].map((m) => new URL(m[1], BASE).pathname);
paths.push("/this-page-does-not-exist");

const browser = await chromium.launch({ channel: process.env.CHANNEL || "chrome" });
const report = [];
for (const p of paths) {
  const name = p === "/" ? "home" : p.slice(1).replace(/\//g, "_");
  const row = { path: p, status: 0, h1: 0, overflow: [], axe: [], console: [] };
  for (const [label, width, height] of [["desktop", 1440, 900], ["mobile", 375, 812]]) {
    const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, bypassCSP: true });
    await ctx.addInitScript(() => localStorage.setItem("gg-cookie-ok", "1"));
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && row.console.push(`${label}: ${m.text()}`));
    page.on("pageerror", (e) => row.console.push(`${label}: ${e.message}`));
    const res = await page.goto(BASE + p, { waitUntil: "networkidle" });
    row.status = res.status();
    await page.screenshot({ path: path.join(SHOTS, `${name}-${label}.jpg`), fullPage: true, quality: 70, type: "jpeg" });
    if (label === "desktop") {
      row.h1 = await page.locator("h1").count();
      await page.addScriptTag({ content: axeSource });
      const r = await page.evaluate(() =>
        window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] }),
      );
      row.axe = r.violations.map((v) => `${v.impact} ${v.id} x${v.nodes.length}: ${v.nodes[0]?.target.join(" ")}`);
      for (const w of [320, 375, 414, 768]) {
        await page.setViewportSize({ width: w, height: 800 });
        const sw = await page.evaluate(() => document.documentElement.scrollWidth);
        if (sw > w) row.overflow.push(`${w}px -> ${sw}px`);
      }
    }
    await ctx.close();
  }
  report.push(row);
  console.log(`${row.status} ${p}  h1=${row.h1}  axe=${row.axe.length}  overflow=${row.overflow.length}  console=${row.console.length}`);
  for (const a of row.axe) console.log("   axe:", a);
  for (const o of row.overflow) console.log("   overflow:", o);
  for (const c of row.console) console.log("   console:", c);
}
await browser.close();
writeFileSync(path.join(SHOTS, "qa-report.json"), JSON.stringify(report, null, 2));
