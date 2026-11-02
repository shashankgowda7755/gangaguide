/** Keeps the first-touch UTM tags for this browser session so an enquiry records its source. */
const KEY = "gg-utm";
const TAGS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export function captureUtm() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const q = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const t of TAGS) {
      const v = q.get(t);
      if (v) found[t] = v.slice(0, 100);
    }
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) found.referrer = document.referrer.slice(0, 200);
    if (Object.keys(found).length) sessionStorage.setItem(KEY, JSON.stringify(found));
  } catch {
    /* storage blocked */
  }
}

export function getUtm(): Record<string, string> | undefined {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "null") ?? undefined;
  } catch {
    return undefined;
  }
}
