/*
 * Fresh-visitor task runs (simulated, not real users). Each task starts on the home page in a new browser
 * context (no cookies, no storage), clicks only what a visitor can see, and logs friction: clicks needed,
 * targets not in view, targets covered by something else (cookie notice, floating button), missing info.
 *   BASE=http://127.0.0.1:4870 OUT=./visitor PLAYWRIGHT=/path/to/playwright node scripts/visitor-tasks.mjs
 * The enquiry POST is answered by a stub (201) so no test lead is stored; WhatsApp links are captured, not opened.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || "playwright");
const BASE = process.env.BASE || "http://127.0.0.1:4870";
const OUT = process.env.OUT || "visitor-report";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: process.env.CHANNEL || "chrome" });
const results = [];

async function run(task, width, fn) {
  const ctx = await browser.newContext({ viewport: { width, height: width < 500 ? 812 : 900 } });
  const page = await ctx.newPage();
  await page.route("**/api/leads", (r) => r.fulfill({ status: 201, contentType: "application/json", body: '{"ok":true,"id":"GG-TEST-0000"}' }));
  const r = { task, width, clicks: 0, scrolls: 0, friction: [], ok: false, notes: [] };
  // click like a person: the target must be visible after scrolling, and nothing may sit on top of it
  r.click = async (loc, what) => {
    loc = loc.first();
    if (!(await loc.isVisible())) await loc.scrollIntoViewIfNeeded().catch(() => {});
    const before = await page.evaluate(() => scrollY);
    await loc.scrollIntoViewIfNeeded();
    if ((await page.evaluate(() => scrollY)) !== before) r.scrolls++;
    const covered = await loc.evaluate((el) => {
      const b = el.getBoundingClientRect();
      const top = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2);
      return top && !el.contains(top) && !top.contains(el) ? (top.closest("[class]")?.className || top.tagName) : "";
    });
    if (covered) r.friction.push(`"${what}" was covered by .${covered}`);
    await loc.click({ force: !!covered });
    r.clicks++;
  };
  try {
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await fn(page, r, ctx);
  } catch (e) {
    r.friction.push(`FAILED: ${e.message.split("\n")[0]}`);
  }
  await page.screenshot({ path: path.join(OUT, `${task}-${width}.jpg`), type: "jpeg", quality: 60 });
  delete r.click;
  results.push(r);
  console.log(`${r.ok ? "PASS" : "FAIL"} ${task} @${width}: ${r.clicks} clicks, ${r.scrolls} scrolls${r.friction.length ? "\n   friction: " + r.friction.join("\n   friction: ") : ""}${r.notes.length ? "\n   note: " + r.notes.join("\n   note: ") : ""}`);
  await ctx.close();
}

// what a first-time visitor sees before scrolling
async function firstScreen(page, r) {
  const seen = await page.evaluate(() => {
    const vis = (el) => { const b = el.getBoundingClientRect(); return b.bottom > 0 && b.top < innerHeight && b.width > 0; };
    return {
      price: [...document.querySelectorAll("p, span, dd")].some((el) => /₹\s?\d/.test(el.textContent) && vis(el)),
      whatsapp: [...document.querySelectorAll("a[href*='wa.me']")].some(vis),
      cookie: !!document.querySelector(".cookie"),
    };
  });
  r.notes.push(`first screen: price ${seen.price ? "visible" : "not visible"}, WhatsApp ${seen.whatsapp ? "visible" : "not visible"}, cookie notice ${seen.cookie ? "shown" : "none"}`);
  return seen;
}

for (const width of [375, 1440]) {
  // Task 1: plan a one-day Kashi trip through the enquiry form
  await run("form-1day-kashi", width, async (page, r) => {
    await firstScreen(page, r);
    await r.click(page.getByRole("link", { name: /^One day in Kashi\b/ }).filter({ hasText: "from" }), "One day in Kashi trip row");
    await page.waitForURL(/kashi-darshan-one-day/);
    await r.click(page.getByRole("link", { name: "Send an enquiry" }).first(), "Send an enquiry");
    const trip = await page.getByLabel("Trip", { exact: true }).inputValue();
    if (trip !== "kashi-darshan-one-day") r.friction.push(`trip not prefilled (got "${trip}")`);
    await page.getByLabel("Your name").fill("Test Visitor");
    await page.getByLabel("Phone or WhatsApp").fill("+91 98765 43210");
    await page.getByLabel("When are you travelling?").fill("14 Feb");
    await page.getByLabel("How many people?").fill("2");
    await r.click(page.getByRole("checkbox"), "consent checkbox");
    await r.click(page.getByRole("button", { name: "Send enquiry" }), "Send enquiry button");
    await page.getByRole("status").waitFor();
    const txt = await page.getByRole("status").innerText();
    r.ok = /GG-TEST-0000/.test(txt);
    r.notes.push(`form fields filled: 4 typed + consent; success shows reference: ${r.ok}`);
  });

  // Task 2: hand off to WhatsApp from the first screen
  await run("whatsapp-handoff", width, async (page, r, ctx) => {
    const seen = await firstScreen(page, r);
    if (!seen.whatsapp) r.friction.push("no WhatsApp button on the first screen");
    await ctx.route(/wa\.me|api\.whatsapp\.com/, (rt) => rt.fulfill({ status: 200, body: "stub" }));
    const popup = ctx.waitForEvent("page");
    await r.click(page.getByRole("link", { name: /WhatsApp/ }).filter({ visible: true }), "first visible WhatsApp button");
    const p2 = await popup;
    const url = new URL(p2.url());
    const text = url.searchParams.get("text") || "";
    r.notes.push(`opens ${url.host}${url.pathname} with text: "${text.replace(/\n/g, " / ")}"`);
    if (!/^\/\d{10,15}$/.test(url.pathname)) r.friction.push("WhatsApp link has no phone number");
    if (!text) r.friction.push("WhatsApp message not prefilled");
    if (/My dates are: $/.test(text)) r.notes.push("message ends in an open 'My dates are:' for the visitor to complete");
    r.ok = !!text && /^\/\d{10,15}$/.test(url.pathname);
  });

  // Task 3: find the price of a one-day trip and the cancellation terms
  await run("price-and-cancellation", width, async (page, r) => {
    await firstScreen(page, r);
    await r.click(page.getByRole("link", { name: /^One day in Kashi\b/ }).filter({ hasText: "from" }), "One day in Kashi trip row");
    await page.waitForURL(/kashi-darshan-one-day/);
    const price = await page.locator("aside dd, .aside dd").allInnerTexts();
    r.notes.push(`trip page price box: ${price.join(" | ")}`);
    const inView = await page.evaluate(() => { return [...document.querySelectorAll("dd, .trip-facts")].some((d) => { const b = d.getBoundingClientRect(); return /₹/.test(d.textContent) && b.width > 0 && b.top < innerHeight && b.bottom > 0; }); });
    if (!inView) r.friction.push("price not visible without scrolling on the trip page");
    await r.click(page.getByRole("link", { name: /cancellation/i }).filter({ visible: true }), "cancellation link");
    await page.waitForURL(/cancellation-policy/);
    const body = await page.locator("main").innerText();
    const todo = (body.match(/To confirm/g) || []).length;
    if (todo) r.friction.push(`cancellation page has ${todo} "To confirm" marker(s): no refund percentages or timeline yet (owner input)`);
    r.ok = /cancel/i.test(body);
  });
}

await browser.close();
writeFileSync(path.join(OUT, "visitor-tasks.json"), JSON.stringify(results, null, 2));
