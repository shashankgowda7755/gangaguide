/*
 * Screen-reader proxy audit (not a real screen reader): for key pages, dumps the accessibility tree
 * (Playwright ARIA snapshot), walks the Tab order recording each stop's role + accessible name, and
 * exercises the menu and the enquiry form (error and success) to record focus moves and live regions.
 *   BASE=http://127.0.0.1:4870 OUT=./a11y PLAYWRIGHT=/path/to/playwright node scripts/a11y-audit.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || "playwright");
const BASE = process.env.BASE || "http://127.0.0.1:4870";
const OUT = process.env.OUT || "a11y-report";
mkdirSync(OUT, { recursive: true });

const PAGES = ["/", "/destinations/varanasi", "/packages/kashi-darshan-one-day", "/contact"];
const browser = await chromium.launch({ channel: process.env.CHANNEL || "chrome" });
const log = [];
const say = (s) => (log.push(s), console.log(s));

// what a screen reader would announce for the focused element: computed role + name (ARIA snapshot),
// plus description and visibility, which the snapshot leaves out
async function focused(page) {
  const el = page.locator(":focus");
  if (!(await el.count())) return "(body)";
  const snap = (await el.ariaSnapshot()).split("\n")[0].replace(/^- /, "").replace(/:$/, "");
  const extra = await el.evaluate((n) => {
    const d = n.getAttribute("aria-describedby");
    const r = n.getBoundingClientRect();
    return [d && `desc="${d.split(" ").map((id) => document.getElementById(id)?.textContent).join(" ")}"`, (r.width === 0 || getComputedStyle(n).visibility === "hidden") && "!!INVISIBLE"].filter(Boolean).join(" ");
  });
  return `${snap}${extra ? " " + extra : ""}`.slice(0, 220);
}

for (const [label, width] of [["desktop", 1440], ["mobile", 375]]) {
  for (const p of PAGES) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    await ctx.addInitScript(() => localStorage.setItem("gg-cookie-ok", "1"));
    const page = await ctx.newPage();
    await page.goto(BASE + p, { waitUntil: "networkidle" });
    const name = `${p === "/" ? "home" : p.slice(1).replace(/\//g, "_")}-${label}`;
    writeFileSync(path.join(OUT, `${name}.aria.yml`), await page.locator("body").ariaSnapshot());
    say(`\n## ${p} @${width} — Tab order`);
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press("Tab");
      say(`${String(i + 1).padStart(2)}. ${await focused(page)}`);
    }
    await ctx.close();
  }
}

// menu (phone)
{
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  await ctx.addInitScript(() => localStorage.setItem("gg-cookie-ok", "1"));
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  say("\n## Menu @375");
  await page.keyboard.press("Tab"); await page.keyboard.press("Tab"); await page.keyboard.press("Tab");
  say(`focus: ${await focused(page)}`);
  await page.keyboard.press("Enter");
  say(`after Enter: ${await focused(page)}`);
  for (let i = 0; i < 7; i++) { await page.keyboard.press("Tab"); say(`  tab: ${await focused(page)}`); }
  writeFileSync(path.join(OUT, "menu-open.aria.yml"), await page.locator("header").ariaSnapshot());
  await page.keyboard.press("Escape");
  say(`after Esc: ${await focused(page)}`);
  await ctx.close();
}

// enquiry form: error then success; record focus + live regions
{
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  await ctx.addInitScript(() => localStorage.setItem("gg-cookie-ok", "1"));
  const page = await ctx.newPage();
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    window.__announced = [];
    const mo = new MutationObserver((ms) => {
      for (const m of ms) {
        const host = (m.target.nodeType === 1 ? m.target : m.target.parentElement)?.closest('[role="alert"],[role="status"],[aria-live]');
        if (host) window.__announced.push(`${host.getAttribute("role") || "live=" + host.getAttribute("aria-live")}: ${host.textContent.replace(/\s+/g, " ").trim().slice(0, 120)}`);
      }
    });
    mo.observe(document.body, { subtree: true, childList: true, characterData: true });
  });
  say("\n## Form errors @375");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await page.waitForTimeout(300);
  say(`focus after empty submit: ${await focused(page)}`);
  say(`live: ${JSON.stringify(await page.evaluate(() => window.__announced.splice(0)))}`);
  say("\n## Form server error @375");
  await page.route("**/api/leads", (r) => r.fulfill({ status: 500, contentType: "application/json", body: '{"ok":false,"error":"Test failure."}' }));
  await page.getByLabel("Your name").fill("Test Visitor");
  await page.getByLabel("Phone or WhatsApp").fill("+91 98765 43210");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await page.waitForTimeout(500);
  say(`focus after server error: ${await focused(page)}`);
  say(`live: ${JSON.stringify(await page.evaluate(() => window.__announced.splice(0)))}`);
  await page.unroute("**/api/leads");
  say("\n## Form success @375");
  await page.route("**/api/leads", (r) => r.fulfill({ status: 201, contentType: "application/json", body: '{"ok":true,"id":"GG-TEST-0000"}' }));
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await page.waitForTimeout(500);
  say(`focus after success: ${await focused(page)}`);
  say(`live: ${JSON.stringify(await page.evaluate(() => window.__announced.splice(0)))}`);
  writeFileSync(path.join(OUT, "form-success.aria.yml"), await page.locator("main").ariaSnapshot());
  await ctx.close();
}

await browser.close();
writeFileSync(path.join(OUT, "a11y-audit.txt"), log.join("\n") + "\n");
