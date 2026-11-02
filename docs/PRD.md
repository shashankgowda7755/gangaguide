# PRD — GangaGuides

## Problem
Travellers planning Varanasi (and Sarnath, Ayodhya, Prayagraj) want a trustworthy local guide but cannot tell real operators from template sites. The v1 site lost every enquiry (forms only ran `console.log`), showed fake reviews, and did not load in production.

## Target user
Indian families and NRIs planning a pilgrimage or first visit; foreign travellers wanting a guided Varanasi day. Mostly on phones, mostly already on WhatsApp.

## Goal
Turn a visit into a WhatsApp conversation or a saved enquiry, honestly. Scoreboard = enquiries received and answered.

## Features
| Feature | Priority | Status |
|---|---|---|
| Home with ghat map (Assi → Raj Ghat), trip index with "from" prices, day timeline, destinations, FAQ, enquiry form | must | done |
| Trip pages (7) with highlights, how the day goes, price aside, enquiry prefilled | must | done |
| Destination pages (4), journal (3 posts), about, FAQ, search | must | done |
| Enquiry form → saved server-side (Postgres or JSONL) + WhatsApp hand-off + success/error states | must | done |
| Email notification of new enquiries (Resend from project domain) | must | wired, OFF until domain + env |
| Legal: privacy (DPDP), terms, cancellation/refund, cookies, grievance officer, 18+ consent | must | done (business details TODO(ask)) |
| SEO/AEO: prerendered HTML, per-route meta, JSON-LD (TravelAgency, TouristTrip, FAQPage, Article, Breadcrumb), sitemap, robots, llms.txt, real 404 | must | done (canonical waits for domain) |
| anti-scrape guard + Turnstile | must | shipped OFF |
| Real photos | must | waiting on owner (see ASSETS-NEEDED.md) |
| Reviews / testimonials | later | only real, sourced ones, after launch |
| Online payment | later | not planned; quotes and payment happen on WhatsApp |
| Dark-mode toggle, AI images, invented team/reviews/ratings | never | — |
