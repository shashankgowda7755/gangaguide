# Tasks (build plan) — GangaGuides
_One task at a time. Status: todo · doing · done · blocked._

| # | Task | Target date | Status | Done when | Notes |
|---|---|---|---|---|---|
| 1 | Rebuild v2 on `rebuild/v2` (design, pages, leads, infra, SEO, legal, a11y, docs) | 2026-11-02 | done | QA green, score page written | this branch |
| 2 | Owner answers TODO(ask) list in `client/src/site.config.ts` | 2026-11-09 | blocked | no "To confirm" markers on any page | needs Shashank |
| 3 | Owner supplies real photos (ASSETS-NEEDED.md), run `npm run images`, swap `<Photo want>` for `src` | 2026-11-16 | blocked | no placeholder blocks | needs photos |
| 4 | Choose + buy domain; set `SITE_URL` in Vercel | 2026-11-09 | blocked | canonical + sitemap on real domain | spend = owner's go |
| 5 | Create Neon DB, run `db/001_leads.sql`, set `DATABASE_URL` | 2026-11-09 | todo | test lead visible in Neon | |
| 6 | Resend domain + `RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `LEAD_NOTIFY_TO` | after 4 | todo | owner gets an email per enquiry | resend-domain-setup skill |
| 7 | Fix Vercel project settings (Framework: Other, no Output override) or let vercel.json rule; deploy from PR | after 2–5 | todo | prod URL serves HTML, `/api/leads` 201 | push = PR; merge = owner's go |
| 8 | Real reviews (Google Business Profile) once collected | later | todo | only sourced reviews shown | no fake ratings ever |
