# Memory — GangaGuides (newest first)

## 2026-11-02 — finish-up pass (worker-gangaguide-rebuild-3)
- Re-score 77/100 (85/110) with evidence in `~/Claude/gangaguide-audit/v2-score.html`. Lighthouse mobile (local preview) 99–100 on all 4 categories for home, a trip, a destination, a post, /booking.
- Bug: `npm start` ignored `vercel.json` redirects, so v1 URLs (/booking, /blog/:id …) 404'd locally. `server/index.ts` now reads them and answers 308.
- Bug: `scripts/qa.mjs` counted the 404 route's own expected document error as a console error (QA FAIL 1/27). Now ignored only for that URL.
- Gotcha: `scripts/schema-check.mjs` downloads the vocabulary from schema.org; DNS is blocked in the Claude sandbox, run it outside.

## 2026-11-02 — rebuild v2 (worker-gangaguide-rebuild)
- Audit scored v1 23/100 (verdict: rebuild). Rebuilt from scratch on `rebuild/v2`; `main` untouched.
- **Root cause of live outage:** Vercel project settings Output = `dist` served `dist/index.js` (Express bundle) at `/`. Fix: `vercel.json` pins `buildCommand` + `outputDirectory: dist/public`; server bundle no longer built into a served dir.
- Decision: static prerender (Vite SSR build + `scripts/prerender.ts`) instead of SSR runtime — content is static, crawlers get full HTML, functions only for `/api/*`.
- Decision: content moved from in-memory DB with random UUIDs to static TS with stable slugs; old routes 301 to new ones.
- Decision: removed all AI images, Kerala reviews, fake 5.0 aggregateRating, invented team, "500+ travellers". Placeholders + ASSETS-NEEDED.md instead.
- Decision: Tailwind/shadcn dropped for a small token CSS file; JS 524 kB → ~217 kB raw (~70 kB gzip) in 2 chunks.
- Bug found in QA: footer `a` colour overrode `.btn` text (light on saffron, 2.2:1). Fixed with `.site-footer a.btn`.
- Gotcha: in the Claude sandbox, `tsx` CLI and port binding fail (EPERM) → scripts use `node --import tsx`; run preview outside sandbox.
- Gotcha: Vercel ESM functions need `.js` extensions on relative imports (used throughout `server/` and `api/`). Not yet verified on a real Vercel deploy.
- Dev-only audit: `sharp` (image script) has an advisory with no fixed release; production deps audit = 0.
