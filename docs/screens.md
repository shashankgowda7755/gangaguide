# Screens — GangaGuides
All pages: sticky header (Trips, Destinations, Journal, About, "Plan a trip" → /contact; Menu button < 860px, Esc closes), footer (WhatsApp, enquiry, site + policy links), floating WhatsApp button, back-to-top after 900px scroll, cookie notice until "OK".

| Route | What it shows | Buttons / actions |
|---|---|---|
| `/` | Hero + ghat map (legend buttons highlight a ghat; trip links), trip index, day timeline, Beyond Kashi, FAQ (4), enquiry | "Plan on WhatsApp" → wa.me prefilled · "See trips and prices" → /packages · trip row → /packages/<slug> · form (below) |
| `/packages` | Trip index grouped: day trips, pooja, festivals | row → trip page |
| `/packages/<slug>` | Highlights, how the day goes, where, before you book; aside with duration + from price | "Ask on WhatsApp" → wa.me with trip name · "Send an enquiry" → #enquire (form prefilled with trip) |
| `/destinations`, `/destinations/<slug>` | Places, what to see, when to go, related trips | trip links, "Plan on WhatsApp" |
| `/journal`, `/journal/<slug>` | Posts with date, reading progress bar, last updated | "Plan on WhatsApp" |
| `/about` | How we plan, what we will not do, team (TODO) | "Ask on WhatsApp" |
| `/contact` | Contact lines (copy number), enquiry form | form |
| `/faq` | All FAQs (details/summary) | — |
| `/search` | Client-side search over trips, places, posts, FAQs | result links |
| `/privacy`, `/terms`, `/cancellation-policy`, `/cookies` | Legal text, last updated | — |
| any other | 404 page, HTTP 404 | Home, trips |

## Enquiry form
Fields: name*, phone/WhatsApp*, email, trip (select), dates (free text), people, message, consent* ("18 or older + agree to privacy policy"), hidden honeypot. Draft kept in localStorage.
- Submit invalid → inline errors (`aria-invalid`), focus first invalid, nothing sent.
- Submit valid → button "Sending…" (disabled) → `POST /api/leads` →
  - 201 → success panel (reference, next steps, "Continue on WhatsApp" with details + ref), draft cleared.
  - 4xx/5xx/network → error panel, input kept, "Send on WhatsApp" fallback.
- If guard ON and flagged → "Quick check" overlay (Turnstile) → retry once.
