# Rules — GangaGuides (for any AI or developer)

## Do
- Put every business fact in `client/src/site.config.ts`. Unknown → `null` + `TODO(ask)`, rendered with `<Todo>`. Never invent.
- New page → add route in `App.tsx`, meta in `seo.ts` (`metaFor` + `staticPaths`), link it, run `npm run build` (prerender) and `scripts/qa.mjs` (axe 0, no overflow 320–768).
- Colours/fonts only through tokens in `tokens.css`. Run `hallmark` for UI work.
- Content slugs are permanent; renaming needs a redirect in `vercel.json`.
- Every form: inline errors, busy state, success + error panels, WhatsApp fallback, consent line.
- Server input: validate with zod; return `{ ok, error }` JSON; log server-side, never leak stack traces.

## Avoid
- AI-generated or stock photos; fake reviews, ratings, counts ("500+ travellers"), invented team members.
- Google Fonts CDN, analytics/session replay, tracking pixels (would need consent first).
- Dark-mode toggle (owner rule). Carousels/autoplay.
- Public write APIs without validation; DB operations in the build.
- Adding libraries without need (current set: react, react-dom, wouter, zod, express, @neondatabase/serverless, @fontsource/*).

## Hard rules (global)
- Ship chain: commit locally; push = PR only; merge/deploy only on owner's explicit go; batch merges.
- Never write the owner's private email anywhere in this repo or site. Contact email = project domain address.
- Secrets: env var names only. A secret pasted in chat or committed is compromised → rotate.
- Before PR: `legal-launch-audit` scanner (1/3/6 must not FAIL), `site-essentials` table, `auto-guard check .` must not BLOCK, anti-scrape-guard stays OFF unless owner sets keys.
- Never claim "done" without browser proof.
