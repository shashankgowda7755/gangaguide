import express from "express";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { brotliCompressSync, gzipSync } from "node:zlib";
import { handleLead } from "./leads.js";
import { guardCheck, handleHumanCheck } from "./guard.js";
import { securityHeaders } from "./headers.js";

/*
 * Local dev (Vite middleware, client-rendered) and production preview (`npm start`, serves the
 * prerendered dist/public). On Vercel the same handlers run as functions in /api.
 */
const prod = process.env.NODE_ENV === "production";
const root = path.resolve(import.meta.dirname, "..");
const app = express();
app.disable("x-powered-by");
app.set("trust proxy", true);
app.use(express.json({ limit: "20kb" }));
if (prod) app.use((_req, res, next) => (res.set(securityHeaders), next()));

const ipOf = (req: express.Request) => req.ip || req.socket.remoteAddress || "";

app.use("/api", (req, res, next) => {
  const blocked = guardCheck(ipOf(req), req.originalUrl, req.headers.cookie, req.headers["user-agent"]);
  if (blocked) return void res.status(blocked.status).json(blocked.body);
  next();
});
app.post("/api/leads", async (req, res) => {
  const r = await handleLead(req.body, ipOf(req));
  res.status(r.status).json(r.body);
});
app.post("/api/human-check", async (req, res) => {
  const r = await handleHumanCheck(req.body, ipOf(req));
  if (r.cookie) res.setHeader("Set-Cookie", r.cookie);
  res.status(r.status).json(r.body);
});
app.get("/api/health", (_req, res) => void res.json({ ok: true }));
app.all("/api/*", (_req, res) => void res.status(404).json({ ok: false, error: "not found" }));

if (prod) {
  const pub = path.join(root, "dist/public");
  // Same permanent redirects as vercel.json (old v1 URLs), so the preview answers like production.
  const { redirects } = JSON.parse(await readFile(path.join(root, "vercel.json"), "utf8")) as { redirects: { source: string; destination: string }[] };
  for (const r of redirects) {
    const re = new RegExp(`^${r.source.replace(/:[a-z]+/g, "[^/]+")}/?$`);
    app.get(re, (_req, res) => res.redirect(308, r.destination));
  }
  // Vercel's CDN compresses text responses; do the same here so local Lighthouse numbers match.
  const packed = new Map<string, Buffer>();
  const types: Record<string, string> = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8" };
  app.get(/^\/[a-zA-Z0-9/._-]*$/, async (req, res, next) => {
    const enc = /\bbr\b/.test(req.headers["accept-encoding"] || "") ? "br" : /\bgzip\b/.test(req.headers["accept-encoding"] || "") ? "gzip" : "";
    const rel = /\.[a-z0-9]+$/.test(req.path) ? req.path : path.join(req.path, "index.html");
    const file = path.join(pub, rel);
    const type = types[path.extname(file)];
    if (!enc || !type || !file.startsWith(pub + path.sep)) return next();
    const key = `${enc}:${file}`;
    if (!packed.has(key)) {
      const raw = await readFile(file).catch(() => null);
      if (!raw) return next();
      packed.set(key, enc === "br" ? brotliCompressSync(raw) : gzipSync(raw));
    }
    res.set({ "Content-Type": type, "Content-Encoding": enc, Vary: "Accept-Encoding" });
    if (req.path.startsWith("/assets/")) res.set("Cache-Control", "public, max-age=31536000, immutable");
    res.send(packed.get(key));
  });
  app.use("/assets", express.static(path.join(pub, "assets"), { immutable: true, maxAge: "1y" }));
  app.use(express.static(pub, { redirect: false }));
  // clean URLs: /packages/x -> dist/public/packages/x/index.html (same as Vercel)
  app.get(/^\/[a-z0-9/-]+$/, (req, res, next) => {
    const file = path.join(pub, req.path.replace(/\/$/, ""), "index.html");
    if (!file.startsWith(pub + path.sep)) return next();
    res.sendFile(file, (err) => err && next());
  });
  app.use((_req, res) => res.status(404).sendFile(path.join(pub, "404.html")));
} else {
  const { createServer } = await import("vite");
  const vite = await createServer({ configFile: path.join(root, "vite.config.ts"), server: { middlewareMode: true }, appType: "custom" });
  app.use(vite.middlewares);
  app.use(async (req, res, next) => {
    try {
      const tpl = await readFile(path.join(root, "client/index.html"), "utf8");
      const html = await vite.transformIndexHtml(req.originalUrl, tpl.replace("<!--head-->", "<title>GangaGuides (dev)</title>"));
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

const port = Number(process.env.PORT) || 4870;
app.listen(port, "127.0.0.1", () => console.log(`GangaGuides ${prod ? "preview" : "dev"} on http://127.0.0.1:${port}`));
