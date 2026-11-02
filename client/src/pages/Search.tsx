import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { trips } from "@/content/trips";
import { places } from "@/content/places";
import { posts, faqs } from "@/content/journal";
import { Crumbs } from "@/components/Bits";

type Item = { kind: string; title: string; href: string; text: string };

const INDEX: Item[] = [
  ...trips.map((t) => ({ kind: "Trip", title: t.name, href: `/packages/${t.slug}`, text: [t.summary, ...t.highlights, ...t.body].join(" ") })),
  ...places.map((p) => ({ kind: "Destination", title: p.name, href: `/destinations/${p.slug}`, text: [p.summary, ...p.body, ...p.see.map((s) => s.name)].join(" ") })),
  ...posts.map((p) => ({ kind: "Journal", title: p.title, href: `/journal/${p.slug}`, text: [p.description, ...p.sections.flatMap((s) => [s.heading ?? "", ...(s.paras ?? []), ...(s.list ?? [])])].join(" ") })),
  ...faqs.map((f) => ({ kind: "Question", title: f.q, href: "/faq", text: f.a })),
];

export function SearchPage() {
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setQ(new URLSearchParams(window.location.search).get("q") ?? "");
    input.current?.focus();
  }, []);
  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
    if (!words.length) return [];
    return INDEX.filter((it) => words.every((w) => (it.title + " " + it.text).toLowerCase().includes(w)));
  }, [q]);
  return (
    <>
      <section className="wrap page-head">
        <Crumbs items={[{ href: "/", label: "Home" }, { label: "Search" }]} />
        <h1>Search</h1>
      </section>
      <section className="wrap" style={{ paddingBottom: "var(--space-section)" }}>
        <form className="search-box" role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="q">Search trips, places and the journal</label>
          <input id="q" ref={input} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. aarti, Sarnath, boat" />
        </form>
        <p aria-live="polite" className="muted">
          {q.trim().length < 2 ? "Type at least two letters." : results.length ? `${results.length} result${results.length > 1 ? "s" : ""}` : "Nothing found. Try another word, or ask us on WhatsApp."}
        </p>
        {results.length > 0 && (
          <ul className="results">
            {results.map((r) => (
              <li key={r.href + r.title}>
                <span className="kind">{r.kind}</span>
                <Link href={r.href}>{r.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
