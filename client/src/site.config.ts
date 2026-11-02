/**
 * Every business fact the site shows lives here, and only here.
 *
 * Anything marked TODO(ask) is NOT known yet and must be confirmed by the owner
 * before launch. While a value is unknown it is `null`, and the page renders a
 * visible "to confirm" marker instead of an invented value. `npm run build`
 * prints the list of open TODO(ask) items.
 */

export type Todo<T> = T | null;

export const site = {
  // TODO(ask): brand name. The old logo said "Ganga Gates", the old site said "GangaGuides".
  // Using "GangaGuides" until confirmed.
  brandName: "GangaGuides",
  brandConfirmed: false,

  tagline: "Local guides for Varanasi, Sarnath, Ayodhya and Prayagraj",

  // TODO(ask): registered business / legal entity name (shown in Terms, Privacy, footer).
  legalName: null as Todo<string>,
  // TODO(ask): full postal address (needed for legal pages, footer, JSON-LD).
  address: null as Todo<string>,
  city: "Varanasi",
  region: "Uttar Pradesh",
  country: "IN",
  // TODO(ask): GSTIN, if registered.
  gstin: null as Todo<string>,

  // TODO(ask): confirm this WhatsApp number. It is the number the old site used.
  whatsappNumber: "918468003094",
  whatsappConfirmed: false,
  // TODO(ask): phone number to show (often the same as WhatsApp).
  phoneDisplay: "+91 84680 03094",

  // TODO(ask): contact email on the project's own domain, e.g. hello@<domain>.
  email: null as Todo<string>,

  // TODO(ask): domain. Canonical URLs, sitemap and og:url use SITE_URL (env) at build time.
  domain: null as Todo<string>,

  // TODO(ask): Grievance Officer under the DPDP Act / IT Rules. Name + email on own domain.
  grievanceOfficer: { name: null as Todo<string>, email: null as Todo<string> },

  // TODO(ask): verified social profiles. Nothing is shown until these are filled.
  social: { instagram: null as Todo<string>, facebook: null as Todo<string>, youtube: null as Todo<string> },

  // TODO(ask): are package prices per person or per group, and are taxes included?
  priceBasis: null as Todo<"per person" | "per group">,

  // TODO(ask): cancellation and refund terms (the policy page shows a draft until confirmed).
  refundTermsConfirmed: false,

  // TODO(ask): is GangaGuides Shashank's own product (OIAS "Built by OIAS" badge) or a client
  // site (quiet "Designed & built by OIAS" line)? Nothing is shown until answered.
  oiasCredit: null as Todo<"badge" | "quiet">,

  // Hours the team answers WhatsApp. TODO(ask): confirm.
  responseHours: null as Todo<string>,

  // Date the legal pages were last reviewed. Update when the text changes.
  legalUpdated: "2026-11-02",
} as const;

/** Prefilled wa.me link. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** List of open questions, printed at build time. */
export function openTodos(): string[] {
  const t: string[] = [];
  if (!site.brandConfirmed) t.push('Brand name: "GangaGuides" or "Ganga Gates"?');
  if (!site.legalName) t.push("Registered business / legal entity name");
  if (!site.address) t.push("Postal address");
  if (!site.gstin) t.push("GSTIN (if registered)");
  if (!site.whatsappConfirmed) t.push(`WhatsApp number ${site.whatsappNumber}: confirm`);
  if (!site.email) t.push("Contact email on the project domain (hello@<domain>)");
  if (!site.domain) t.push("Domain (then set SITE_URL for canonical/sitemap)");
  if (!site.grievanceOfficer.name || !site.grievanceOfficer.email) t.push("Grievance Officer name + email");
  if (!site.social.instagram && !site.social.facebook && !site.social.youtube) t.push("Social profiles (optional)");
  if (!site.priceBasis) t.push("Prices: per person or per group? Taxes included?");
  if (!site.refundTermsConfirmed) t.push("Cancellation / refund terms");
  if (!site.oiasCredit) t.push("OIAS credit: own product (badge) or client (quiet line)?");
  if (!site.responseHours) t.push("WhatsApp response hours");
  return t;
}
