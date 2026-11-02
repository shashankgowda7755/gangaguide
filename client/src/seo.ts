import { site } from "./site.config";
import { trips, tripBySlug, categories } from "./content/trips";
import { places, placeBySlug } from "./content/places";
import { posts, postBySlug, faqs } from "./content/journal";

/** Absolute site URL, only once a domain is chosen (SITE_URL at build time). No canonical before that. */
export const SITE_URL: string = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");

export interface Meta {
  title: string;
  description: string;
  status?: number;
  noindex?: boolean;
  jsonld?: object[];
  type?: "website" | "article";
}

const abs = (p: string) => (SITE_URL ? SITE_URL + p : p);

const agency = () => ({
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.brandName,
  description: site.tagline,
  ...(SITE_URL && { url: SITE_URL }),
  telephone: "+" + site.whatsappNumber,
  ...(site.email && { email: site.email }),
  areaServed: ["Varanasi", "Sarnath", "Ayodhya", "Prayagraj"].map((name) => ({ "@type": "City", name })),
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: site.country,
    ...(site.address && { streetAddress: site.address }),
  },
  ...(Object.values(site.social).some(Boolean) && { sameAs: Object.values(site.social).filter(Boolean) }),
});

const faqLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const crumbsLd = (items: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
});

const t = (s: string) => `${s} · ${site.brandName}`;

export function metaFor(path: string): Meta {
  const p = path.replace(/\/$/, "") || "/";
  if (p === "/")
    return {
      title: `${site.brandName}: local guides for Varanasi, Sarnath, Ayodhya and Prayagraj`,
      description:
        "Boat rides, ghat walks, aarti and pooja in Varanasi with local guides. Day trips to Sarnath, trails to Ayodhya and Prayagraj. Prices from ₹1,500. Plan on WhatsApp.",
      jsonld: [agency(), faqLd(faqs)],
    };
  if (p === "/packages")
    return {
      title: t("Trips and prices"),
      description: `${trips.length} trips in and around Varanasi: one-day Kashi darshan, Sarnath, Ayodhya, Ganga aarti ritual, temple pooja, Ramlila and Dev Deepawali. Starting prices listed.`,
      jsonld: [crumbsLd([["Home", "/"], ["Trips", "/packages"]])],
    };
  if (p.startsWith("/packages/")) {
    const tr = tripBySlug(p.slice(10));
    if (!tr) return notFound;
    return {
      title: t(`${tr.name} (${tr.duration}, from ₹${tr.priceFrom.toLocaleString("en-IN")})`),
      description: tr.summary,
      jsonld: [
        {
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: tr.name,
          description: tr.summary,
          touristType: categories[tr.category].title,
          itinerary: {
            "@type": "ItemList",
            itemListElement: tr.highlights.map((h, i) => ({ "@type": "ListItem", position: i + 1, name: h })),
          },
          offers: {
            "@type": "Offer",
            price: tr.priceFrom,
            priceCurrency: "INR",
            description: "Starting price. Final quote confirmed before payment.",
            ...(SITE_URL && { url: abs(`/packages/${tr.slug}`) }),
          },
          provider: { "@type": "TravelAgency", name: site.brandName },
        },
        crumbsLd([["Home", "/"], ["Trips", "/packages"], [tr.name, `/packages/${tr.slug}`]]),
      ],
    };
  }
  if (p === "/destinations")
    return {
      title: t("Destinations: Varanasi, Sarnath, Ayodhya, Prayagraj"),
      description: "What to see in Varanasi, Sarnath, Ayodhya and Prayagraj, how far each is from the ghats, and when to go.",
      jsonld: [crumbsLd([["Home", "/"], ["Destinations", "/destinations"]])],
    };
  if (p.startsWith("/destinations/")) {
    const pl = placeBySlug(p.slice(14));
    if (!pl) return notFound;
    return {
      title: t(`${pl.name}: what to see and when to go`),
      description: pl.summary,
      jsonld: [
        {
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: pl.name,
          description: pl.summary,
          includesAttraction: pl.see.map((s) => ({ "@type": "TouristAttraction", name: s.name, description: s.note })),
        },
        crumbsLd([["Home", "/"], ["Destinations", "/destinations"], [pl.name, `/destinations/${pl.slug}`]]),
      ],
    };
  }
  if (p === "/journal") return { title: t("Journal"), description: "Notes from the river: rituals, temples and practical trip planning for Varanasi and around." };
  if (p.startsWith("/journal/")) {
    const po = postBySlug(p.slice(9));
    if (!po) return notFound;
    return {
      title: t(po.title),
      description: po.description,
      type: "article",
      jsonld: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: po.title,
          description: po.description,
          datePublished: po.published,
          dateModified: po.updated,
          author: { "@type": "Organization", name: site.brandName },
          publisher: { "@type": "Organization", name: site.brandName },
        },
        crumbsLd([["Home", "/"], ["Journal", "/journal"], [po.title, `/journal/${po.slug}`]]),
      ],
    };
  }
  const simple: Record<string, Meta> = {
    "/about": { title: t("About"), description: `Who we are and how we plan trips in Varanasi and around.` },
    "/contact": { title: t("Plan a trip"), description: "Send your dates and group size. We reply on WhatsApp with a plan and a price before you pay anything." },
    "/search": { title: t("Search"), description: "Search trips, destinations, journal posts and questions." },
    "/faq": { title: t("Questions"), description: "Booking, prices, seasons, temple rules and photography at the ghats.", jsonld: [faqLd(faqs)] },
    "/privacy": { title: t("Privacy policy"), description: "What we collect when you enquire, why, how long we keep it and your rights under India's DPDP Act." },
    "/terms": { title: t("Terms"), description: "Terms for using this website and booking trips." },
    "/cancellation-policy": { title: t("Cancellation and refunds"), description: "How cancellations, changes and refunds work." },
    "/cookies": { title: t("Cookies"), description: "The only things this site stores in your browser, and why." },
  };
  return simple[p] ?? notFound;
}

const notFound: Meta = { title: t("Page not found"), description: "This page does not exist.", status: 404, noindex: true };

/** Every path that is prerendered to static HTML. */
export const staticPaths: string[] = [
  "/",
  "/packages",
  ...trips.map((x) => `/packages/${x.slug}`),
  "/destinations",
  ...places.map((x) => `/destinations/${x.slug}`),
  "/journal",
  ...posts.map((x) => `/journal/${x.slug}`),
  "/about",
  "/contact",
  "/faq",
  "/search",
  "/privacy",
  "/terms",
  "/cancellation-policy",
  "/cookies",
];

/** <head> tags as an HTML string (prerender) — the client keeps title/description in sync. */
export function headHtml(path: string, m: Meta): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}">`,
    `<meta property="og:title" content="${esc(m.title)}">`,
    `<meta property="og:description" content="${esc(m.description)}">`,
    `<meta property="og:type" content="${m.type ?? "website"}">`,
    `<meta property="og:site_name" content="${esc(site.brandName)}">`,
    `<meta property="og:locale" content="en_IN">`,
    `<meta name="twitter:card" content="summary">`,
  ];
  if (m.noindex) tags.push(`<meta name="robots" content="noindex">`);
  if (SITE_URL && !m.noindex) {
    tags.push(`<link rel="canonical" href="${SITE_URL}${path === "/" ? "/" : path}">`);
    tags.push(`<meta property="og:url" content="${SITE_URL}${path === "/" ? "/" : path}">`);
  }
  for (const j of m.jsonld ?? []) tags.push(`<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`);
  return tags.join("\n    ");
}
