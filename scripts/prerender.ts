/*
 * Build step 3: render every route to static HTML so crawlers (and visitors without JS) get the
 * full page. Also writes 404.html, sitemap.xml, robots.txt and llms.txt, and prints open TODO(ask)s.
 */
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const pub = path.join(root, "dist/public");
const ssr = await import(pathToFileURL(path.join(root, "dist/server/entry-server.js")).href);
const { render, staticPaths, openTodos } = ssr as {
  render: (p: string) => { html: string; head: string; status: number };
  staticPaths: string[];
  openTodos: () => string[];
};

const template = await readFile(path.join(pub, "index.html"), "utf8");
const page = (p: string) => {
  const r = render(p);
  return template.replace("<!--head-->", r.head).replace("<!--app-->", r.html);
};

for (const p of staticPaths) {
  const file = p === "/" ? path.join(pub, "index.html") : path.join(pub, p, "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page(p));
}
await writeFile(path.join(pub, "404.html"), page("/__not-found__"));

const site = (process.env.SITE_URL || "").replace(/\/$/, "");
const base =
  site ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  (process.env.PREVIEW_URL || "").replace(/\/$/, "");

let robots = "User-agent: *\nAllow: /\nDisallow: /api/\n";
if (base) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = staticPaths.map((p) => `  <url><loc>${base}${p}</loc><lastmod>${today}</lastmod></url>`).join("\n");
  await writeFile(path.join(pub, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  robots += `\nSitemap: ${base}/sitemap.xml\n`;
} else {
  console.warn("! No SITE_URL / VERCEL_PROJECT_PRODUCTION_URL / PREVIEW_URL: sitemap.xml not written.");
}
await writeFile(path.join(pub, "robots.txt"), robots);

const { trips } = await import("../client/src/content/trips.ts");
const { places } = await import("../client/src/content/places.ts");
const { posts, faqs } = await import("../client/src/content/journal.ts");
const u = (p: string) => (base ? base + p : p);
const llms = `# GangaGuides

> Local guides for Varanasi (Kashi), with day trips to Sarnath and trails to Ayodhya and Prayagraj. Boat rides, ghat walks, darshan, Ganga aarti and pooja. Enquiries are answered on WhatsApp with a plan and a fixed quote before any payment.

## Trips (starting prices in INR)
${trips.map((t) => `- [${t.name}](${u(`/packages/${t.slug}`)}): ${t.duration}, from ₹${t.priceFrom.toLocaleString("en-IN")}. ${t.summary}`).join("\n")}

## Destinations
${places.map((p) => `- [${p.name}](${u(`/destinations/${p.slug}`)}): ${p.summary}`).join("\n")}

## Journal
${posts.map((p) => `- [${p.title}](${u(`/journal/${p.slug}`)}): ${p.description}`).join("\n")}

## Questions
${faqs.map((f) => `- ${f.q} ${f.a}`).join("\n")}

## Contact and policies
- [Plan a trip](${u("/contact")})
- [Privacy policy](${u("/privacy")}) · [Terms](${u("/terms")}) · [Cancellation and refunds](${u("/cancellation-policy")})
`;
await writeFile(path.join(pub, "llms.txt"), llms);
await rm(path.join(root, "dist/server"), { recursive: true, force: true });

console.log(`Prerendered ${staticPaths.length} pages + 404.html${base ? `, sitemap for ${base}` : ""}.`);
const todos = openTodos();
if (todos.length) console.warn(`\nOpen TODO(ask) items in client/src/site.config.ts (${todos.length}):\n- ${todos.join("\n- ")}\n`);
