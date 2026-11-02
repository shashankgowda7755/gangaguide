# Memory — GangaGuides (newest first)

## 2026-11-02 — copy fact-check (worker-gangaguide-rebuild-5)
Every factual claim in `client/src/content/{trips,places,journal}.ts` checked by web search. Unverifiable details softened or removed; prices stay as the owner's seeded "from" figures.
- Changed: Assi arrival (advice "45 min before sunrise", not a fixed start); Tulsi Manas (dropped "verses carved on walls", unconfirmed); Kashi Vishwanath FAQ ("leather items" → phones/cameras/electronics); Ganga Mahotsav = the 5 days up to Dev Deepawali, run by UP Tourism; Ramlila UNESCO year 2008; Kedar Ghat "red-and-white stripes" → "brightly painted" (unconfirmed). Earlier WIP edits (Subah-e-Banaras 2014, Nepali temple/Pashupatinath, Sankat Mochan Samaroh 6 nights, Prayagraj 125 km / 2.5–3 h) confirmed.
- Sources (21):
  - Subah-e-Banaras since 2014, before sunrise: https://subahebanaras.net · https://en.wikipedia.org/wiki/Assi_Ghat · https://roobaroowalks.com/subah-e-banaras-morning-aarti-timings-sunrise-experience-at-assi-ghat/
  - Nepali Mandir, 19th c., Pashupatinath style, by Lalita Ghat: https://en.wikipedia.org/wiki/Nepali_Mandir · https://livehistoryindia.com/story/monuments/pashupatinath-temple
  - Sankat Mochan Sangeet Samaroh, free, six nights, April: https://en.wikipedia.org/wiki/Sankat_Mochan_Sangeet_Samaroh · https://incredibleindia.gov.in/en/festivals-and-events/sankat-mochan-sangeet-samoroh
  - Bharat Mata Mandir, Gandhi 1936, Kashi Vidyapith, marble map: https://en.wikipedia.org/wiki/Bharat_Mata_Mandir
  - Tulsi Manas Mandir 1964: https://en.wikipedia.org/wiki/Tulsi_Manas_Mandir · Durga Mandir 18th c.: https://en.wikipedia.org/wiki/Durga_Mandir,_Varanasi
  - Sarnath museum closed Fridays, Lion Capital: https://www.incredibleindia.gov.in/en/uttar-pradesh/varanasi/sarnath-museum · Chaukhandi tower 1588: https://en.wikipedia.org/wiki/Chaukhandi_Stupa · ~10 km / 25–45 min: https://www.stayvista.com/blog/sarnath-unesco-world-heritage-site/
  - Ayodhya ~200 km / 4–5 h: https://www.savaari.com/blog/varanasi-to-ayodhya-distance/ · consecration 22 Jan 2024 + phone ban: https://www.outlooktraveller.com/News/planning-a-visit-to-the-ram-mandir-in-ayodhya-read-this-first
  - Prayagraj fort 1583, renamed 2018, Maha Kumbh 13 Jan–26 Feb 2025: https://www.britannica.com/place/Prayagraj · https://static.pib.gov.in/WriteReadData/specificdocs/documents/2024/dec/doc20241213471901.pdf · ~125 km: https://www.rome2rio.com/s/Varanasi/Prayagraj
  - Ramnagar Ramlila, month-long, no mics/electric light: https://www.outlooktraveller.com/explore/culture/the-theatre-of-ramnagar · UNESCO 2008: https://ich.unesco.org/en/RL/ramlila-the-traditional-performance-of-the-ramayana-00110
  - Dev Deepawali on Kartik Purnima, Ganga Mahotsav 5 days: https://en.wikipedia.org/wiki/Dev_Deepavali_(Varanasi) · https://www.holidify.com/places/varanasi/ganga-mahotsav-2019-varanasi-sightseeing-1253801.html
  - Kashi Vishwanath phones not allowed (red zone): https://www.deccanherald.com/india/bihar/tej-pratap-seen-in-video-inside-kashi-temples-red-zone-probe-ordered-3586149
  - Ghats (Scindia sunken temple, Panchganga five rivers, Kedar, Tulsi): https://en.wikipedia.org/wiki/Ghats_in_Varanasi · https://en.wikipedia.org/wiki/Scindia_Ghat
- Not independently re-searched (well-established, kept): Ayodhya airport/station names, Shreyansanath as 11th tirthankara, Lion Capital as national emblem in 1950.

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
