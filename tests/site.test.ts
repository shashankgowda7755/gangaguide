import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { trips } from "../client/src/content/trips.ts";
import { places } from "../client/src/content/places.ts";
import { posts } from "../client/src/content/journal.ts";

// Checks the prerendered output in dist/public. Run `npm run build` first (CI does).
const root = path.resolve(import.meta.dirname, "..");
const pub = path.join(root, "dist/public");
assert.ok(existsSync(path.join(pub, "index.html")), "dist/public missing: run `npm run build` first");

const routes = [
  "/", "/packages", ...trips.map((t) => `/packages/${t.slug}`), "/destinations", ...places.map((p) => `/destinations/${p.slug}`),
  "/journal", ...posts.map((p) => `/journal/${p.slug}`), "/about", "/contact", "/faq", "/search", "/privacy", "/terms", "/cancellation-policy", "/cookies",
];
const fileFor = (r: string) => path.join(pub, r === "/" ? "index.html" : `${r.slice(1)}/index.html`);
const html = new Map(routes.map((r) => [r, existsSync(fileFor(r)) ? readFileSync(fileFor(r), "utf8") : ""]));
const notFound = readFileSync(path.join(pub, "404.html"), "utf8");
const vercel = JSON.parse(readFileSync(path.join(root, "vercel.json"), "utf8"));
const one = (s: string, re: RegExp) => s.match(re)?.[1] ?? "";

test("every route is prerendered with its content (no empty shell)", () => {
  for (const [r, h] of html) {
    assert.ok(h, `${r}: no index.html`);
    assert.ok(!h.includes("<!--app-->") && !h.includes("<!--head-->"), `${r}: placeholder left`);
    assert.equal((h.match(/<h1[\s>]/g) || []).length, 1, `${r}: exactly one h1`);
    assert.match(h, /<main[\s>]/, `${r}: main landmark`);
    assert.ok(one(h, /<div id="root">([\s\S]{200})/), `${r}: app markup rendered`);
  }
});

test("titles and descriptions exist and are unique", () => {
  const titles = new Set<string>(), descs = new Set<string>();
  for (const [r, h] of html) {
    const t = one(h, /<title>([^<]+)<\/title>/), d = one(h, /<meta name="description" content="([^"]+)"/);
    assert.ok(t.length >= 10 && t.length <= 90, `${r}: title length ${t.length}`);
    assert.ok(d.length >= 50 && d.length <= 170, `${r}: description length ${d.length}`);
    assert.ok(!titles.has(t), `${r}: duplicate title "${t}"`);
    assert.ok(!descs.has(d), `${r}: duplicate description`);
    titles.add(t), descs.add(d);
  }
});

test("JSON-LD parses, uses schema.org and carries no ratings or reviews", () => {
  for (const [r, h] of [...html, ["/404", notFound] as const]) {
    for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      const j = JSON.parse(m[1]);
      assert.equal(j["@context"], "https://schema.org", `${r}: @context`);
      assert.ok(j["@type"], `${r}: @type`);
      assert.ok(!/aggregateRating|"review"/i.test(m[1]), `${r}: no ratings/reviews in structured data`);
    }
  }
  const types = (r: string) => [...html.get(r)!.matchAll(/"@type":"(\w+)"/g)].map((m) => m[1]);
  assert.ok(types("/").includes("TravelAgency") && types("/").includes("FAQPage"));
  assert.ok(types(`/packages/${trips[0].slug}`).includes("TouristTrip"));
  assert.ok(types(`/journal/${posts[0].slug}`).includes("Article"));
});

test("og:image is set on every page and the file exists", () => {
  for (const [r, h] of html) {
    const img = one(h, /<meta property="og:image" content="([^"]+)"/);
    assert.ok(img, `${r}: og:image`);
    assert.ok(existsSync(path.join(pub, new URL(img, "http://x").pathname)), `${r}: ${img} missing`);
    assert.match(h, /<meta name="twitter:card" content="summary_large_image">/, `${r}: large card`);
  }
});

test("canonical only with a domain, and then absolute and self-referencing", () => {
  for (const [r, h] of html) {
    const c = one(h, /<link rel="canonical" href="([^"]+)"/);
    if (!c) continue;
    const u = new URL(c);
    assert.equal(u.protocol, "https:", `${r}: canonical must be https`);
    assert.equal(u.pathname, r, `${r}: canonical points elsewhere`);
  }
});

test("404 page is noindex; stylesheet is inlined; fonts are self-hosted", () => {
  assert.match(notFound, /<meta name="robots" content="noindex">/);
  for (const [r, h] of html) {
    assert.ok(h.includes("<style>"), `${r}: inline CSS`);
    assert.ok(!/fonts\.googleapis|fonts\.gstatic/.test(h), `${r}: Google Fonts CDN`);
  }
});

test("every internal link resolves to a page, a file or a redirect", () => {
  const sources = vercel.redirects.map((x: { source: string }) => new RegExp("^" + x.source.replace(/:\w+/g, "[^/]+") + "$"));
  for (const [r, h] of html) {
    for (const [, href] of h.matchAll(/href="(\/[^"#?]*)/g)) {
      const p = href.replace(/\/$/, "") || "/";
      const ok = html.has(p) || existsSync(path.join(pub, p)) || sources.some((re: RegExp) => re.test(p));
      assert.ok(ok, `${r}: broken link ${href}`);
    }
  }
});

test("old v1 URLs redirect permanently to pages (and anchors) that exist", () => {
  for (const { source, destination, permanent } of vercel.redirects) {
    assert.equal(permanent, true, source);
    const [p, hash] = destination.split("#");
    assert.ok(html.has(p), `${source} -> ${destination}: target not prerendered`);
    if (hash) assert.match(html.get(p)!, new RegExp(`id="${hash}"`), `${source}: anchor #${hash} missing`);
    assert.ok(!html.has(source), `${source} shadows a real page`);
  }
});

test("robots disallows the API; sitemap (when written) lists exactly the routes", () => {
  assert.match(readFileSync(path.join(pub, "robots.txt"), "utf8"), /Disallow: \/api\//);
  const sm = path.join(pub, "sitemap.xml");
  if (!existsSync(sm)) return;
  const locs = [...readFileSync(sm, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  assert.deepEqual([...locs].sort(), [...routes].sort());
});

test("no private address, fake rating or v1 leftovers anywhere in the output", () => {
  const walk = (d: string): string[] => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  for (const f of walk(pub).filter((f) => /\.(html|js|css|txt|xml|svg)$/.test(f))) {
    const s = readFileSync(f, "utf8");
    assert.ok(!/tndwwt/i.test(s), `${f}: private domain`);
    assert.ok(!/500\+|aggregateRating|replit|Kerala/i.test(s), `${f}: v1 leftover`);
  }
});
