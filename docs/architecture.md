# Architecture — GangaGuides

## Flow
```
Browser ──GET /any-page──▶ Vercel static (dist/public/<route>/index.html, prerendered) ──▶ React hydrates
Browser ──POST /api/leads──▶ api/leads.ts ─▶ server/guard.ts (rate limit, OFF by default)
                                          └▶ server/leads.ts ─▶ zod ─▶ Postgres (Neon) via DATABASE_URL
                                                                 └▶ Resend email (if env set)
Success panel ──▶ wa.me/<number>?text=<prefilled enquiry + ref>
```
Local / any Node host: `server/index.ts` (Express) serves the same static output and the same handlers.

## Stack
| Part | Choice | Version |
|---|---|---|
| UI | React + wouter (routing) | 18.3 / 3.x |
| Build | Vite (client + SSR build), prerender script `scripts/prerender.ts` | 6.x |
| Styles | Plain CSS with tokens (`client/src/styles/tokens.css`), no Tailwind | — |
| Fonts | @fontsource Young Serif + Mukta, self-hosted | 5.x |
| Server | Express (local/preview), Vercel Node functions (`api/*.ts`) | 4.22 |
| Validation | zod | 4.x |
| Database | Postgres on Neon via `@neondatabase/serverless` (optional; JSONL file fallback off-Vercel) | 1.x |
| Email | Resend HTTP API (no SDK) | — |
| Bot check | Cloudflare Turnstile (optional) | — |
| Hosting | Vercel (project under another account — TODO(ask) which) | — |

## Folders
```
client/index.html          template (<!--head--> / <!--app--> placeholders)
client/src/site.config.ts  ALL business facts + TODO(ask)
client/src/content/        trips.ts, places.ts, journal.ts (stable slugs)
client/src/pages/          Home, Trips, Places, Journal, Info, Legal, Search, NotFound
client/src/components/     Layout, Bits, GhatMap, EnquiryForm
client/src/lib/            humanCheck (guard client), utm
client/src/seo.ts          per-route meta + JSON-LD + list of prerendered paths
server/                    leads.ts, guard.ts, headers.ts, index.ts
api/                       leads.ts, human-check.ts (Vercel functions)
db/001_leads.sql           schema, run manually
scripts/                   prerender.ts, qa.mjs, optimize-images.mjs
```

## Env vars (names only)
`SITE_URL` (build; canonical + sitemap once a domain exists) · `PREVIEW_URL` (local sitemap) · `DATABASE_URL` · `RESEND_API_KEY` · `LEAD_FROM_EMAIL` (project domain) · `LEAD_NOTIFY_TO` (project domain inbox) · `SCRAPE_GUARD` · `SCRAPE_GUARD_MAX` · `SCRAPE_GUARD_WINDOW_MS` · `SCRAPE_GUARD_ALLOW_IPS` · `SCRAPE_GUARD_ALERT_EMAIL` · `TURNSTILE_SECRET_KEY` + `VITE_TURNSTILE_SITE_KEY` (always together) · `PORT`.

## Deploy
Vercel reads `vercel.json`: `npm ci` → `npm run build` → serve `dist/public`, functions from `api/`. The v1 outage came from project settings (Output = `dist`) serving the server bundle; `vercel.json` now pins build + output. Only production and `preview/*` branches build (`ignoreCommand`). Push = PR; merge/deploy = owner's go.
