import { Link } from "wouter";
import { places, placeBySlug } from "@/content/places";
import { trips } from "@/content/trips";
import { Crumbs, Photo, WhatsAppButton } from "@/components/Bits";
import NotFound from "./NotFound";

export function PlacesPage() {
  return (
    <>
      <section className="wrap page-head">
        <Crumbs items={[{ href: "/", label: "Home" }, { label: "Destinations" }]} />
        <h1>Four places on one river system</h1>
        <p className="lede">Varanasi is the base. Sarnath is a short drive; Prayagraj and Ayodhya make a day or two each.</p>
      </section>
      <section className="wrap" style={{ paddingBottom: "var(--space-section)" }}>
        <div className="places" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" }}>
          {places.map((p) => (
            <Link key={p.slug} href={`/destinations/${p.slug}`} className="place-link">
              <Photo want={p.photo} ratio="4 / 3" />
              <span className="dist">{p.fromVaranasi === "Base city" ? "Base city" : `${p.fromVaranasi} from Varanasi`}</span>
              <h2 style={{ fontSize: "var(--text-2xl)" }}>
                {p.name} <span lang="hi">{p.hindi}</span>
              </h2>
              <span className="muted">{p.summary}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function PlacePage({ slug }: { slug: string }) {
  const p = placeBySlug(slug);
  if (!p) return <NotFound />;
  const related = trips.filter((t) => t.places.includes(p.slug));
  return (
    <>
      <section className="wrap page-head">
        <Crumbs items={[{ href: "/", label: "Home" }, { href: "/destinations", label: "Destinations" }, { label: p.name }]} />
        <h1>
          {p.name} <span lang="hi">{p.hindi}</span>
        </h1>
        <p className="lede">{p.summary}</p>
      </section>
      <section className="wrap split" style={{ paddingBottom: "var(--space-section)" }}>
        <div className="prose">
          <Photo want={p.photo} ratio="16 / 9" />
          {p.body.map((b, i) => (
            <p key={i} style={i === 0 ? { marginTop: "var(--space-6)" } : undefined}>
              {b}
            </p>
          ))}
          <h2>What to see</h2>
          <ul className="ticks">
            {p.see.map((s) => (
              <li key={s.name}>
                <strong>{s.name}.</strong> {s.note}
              </li>
            ))}
          </ul>
          <h2>When to go</h2>
          <p>{p.bestTime}</p>
        </div>
        <aside className="aside" aria-label="Trips that include this place">
          <dl>
            <dt>From Varanasi</dt>
            <dd>{p.fromVaranasi}</dd>
          </dl>
          {related.length > 0 && (
            <>
              <h2 style={{ fontSize: "var(--text-lg)", fontFamily: "var(--font-body)", fontWeight: 600, marginBottom: "var(--space-2)" }}>Trips that go here</h2>
              <ul className="ticks">
                {related.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/packages/${t.slug}`}>{t.name}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <WhatsAppButton message={`Namaste, I'd like to visit ${p.name}. My dates are: `} label="Plan on WhatsApp" />
        </aside>
      </section>
    </>
  );
}
