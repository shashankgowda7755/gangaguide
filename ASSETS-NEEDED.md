# Assets needed — GangaGuides

Rule: **real photos only** (taken by the team or licensed). No AI images, no stock passed off as ours. Each slot below currently shows a labelled placeholder on the site.

How to add: put originals (≥1600 px wide, JPG) in `photos/` named as below → `npm run images` → in the content file replace the `photo:` text with the image path (or pass `src="/img/<name>.jpg"` to `<Photo>`). Avif + webp at 640/1024/1600 px are generated automatically.

| # | File name | Shot | Used on | Ratio |
|---|---|---|---|---|
| 1 | `aarti-dashashwamedh-boat.jpg` | Evening aarti at Dashashwamedh, seen from a boat | Home (day on the river) | 21:9 |
| 2 | `sunrise-boat.jpg` | Sunrise from a rowing boat, ghats in soft light | One day in Kashi | 16:9 |
| 3 | `dhamek-stupa.jpg` | Dhamek Stupa at Sarnath, late afternoon | Kashi and Sarnath | 16:9 |
| 4 | `saryu-ghats-dusk.jpg` | Saryu ghats in Ayodhya at dusk | Ayodhya and Kashi trail | 16:9 |
| 5 | `diya-offering.jpg` | Hands offering a leaf-boat diya to the river | Ganga aarti ritual | 16:9 |
| 6 | `sankat-mochan.jpg` | Temple bells and marigolds at Sankat Mochan | Temple pooja day | 16:9 |
| 7 | `ramlila-ramnagar.jpg` | Ramlila crowd at Ramnagar, lamp-lit stage | Ramnagar Ramlila | 16:9 |
| 8 | `dev-deepawali.jpg` | Ghats lined with diyas on Dev Deepawali, from a boat | Dev Deepawali | 16:9 |
| 9 | `ghats-mid-river.jpg` | The ghats seen from mid-river, early morning | Varanasi destination | 16:9 / 4:3 |
| 10 | `sarnath-monks.jpg` | Dhamek Stupa with monks walking past | Sarnath destination, home | 4:3 |
| 11 | `saryu-aarti.jpg` | Evening aarti on the Saryu ghats | Ayodhya destination, home | 4:3 |
| 12 | `sangam-boats.jpg` | Boats at the Sangam, two rivers meeting | Prayagraj destination, home | 4:3 |
| 13 | `assi-morning-aarti.jpg` | Morning aarti at Assi Ghat | Journal: morning aarti | 16:9 |
| 14 | `nepali-temple.jpg` | Carved wooden struts of the Nepali temple | Journal: five quiet temples | 16:9 |
| 15 | `hanuman-garhi.jpg` | Hanuman Garhi steps in the morning | Journal: Ayodhya | 16:9 |
| 16 | `team-ghats.jpg` | The team on the ghats (real guides, with their consent) | About | 4:5 |

## Also needed
- **Logo**: confirm brand name ("GangaGuides" vs "Ganga Gates") first; a wordmark in Young Serif is used until then. SVG preferred.
- **Social share image** (1200×630, real photo + wordmark) → then add `og:image` in `client/src/seo.ts`.
- **Team**: names, roles, one-line bios of real guides (About page), with consent to publish.
- **Reviews**: only real ones with a source link (e.g. Google Business Profile). None are shown until then.

Do not reuse: the 14 AI images in `attached_assets/generated_images/` (removed in v2) or the WhatsApp screenshots from the Replit build.
