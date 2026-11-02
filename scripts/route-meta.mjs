// After `vite build`: write one index.html per route with its own title/description/canonical,
// plus sitemap.xml and robots.txt, so crawlers and link previews see the right page info.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";

const SITE = (process.env.SITE_URL || "https://gangaguide.vercel.app").replace(/\/$/, "");
const out = path.resolve("dist/public");
const routes = JSON.parse(readFileSync("client/src/seo-routes.json", "utf8"));
let base = readFileSync(path.join(out, "index.html"), "utf8");

// Preload the two main latin fonts so headings paint in the right font sooner
const fonts = readdirSync(path.join(out, "assets")).filter((f) =>
  /^(inter|playfair-display)-latin-wght-normal-.*\.woff2$/.test(f),
);
const preloads = fonts
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)
  .join("\n    ");
if (preloads) base = base.replace("</head>", `    ${preloads}\n  </head>`);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const setMeta = (html, attr, key, value) =>
  html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), `$1${esc(value)}$2`);

for (const [route, { title, description }] of Object.entries(routes)) {
  const url = SITE + (route === "/" ? "/" : route);
  let html = base.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = setMeta(html, "name", "title", title);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "twitter:title", title);
  html = setMeta(html, "property", "twitter:description", description);
  html = setMeta(html, "property", "twitter:url", url);
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`);
  html = html.replace(/(https:\/\/gangaguide\.vercel\.app)/g, SITE);

  // "/" -> index.html, "/packages/pooja" -> packages/pooja.html (served via cleanUrls)
  const file = route === "/" ? path.join(out, "index.html") : path.join(out, route + ".html");
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const today = new Date().toISOString().slice(0, 10);
const urls = Object.keys(routes)
  .map((r) => `  <url><loc>${SITE}${r === "/" ? "/" : r}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n");
writeFileSync(
  path.join(out, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
writeFileSync(path.join(out, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`route-meta: ${Object.keys(routes).length} pages, sitemap.xml, robots.txt`);
