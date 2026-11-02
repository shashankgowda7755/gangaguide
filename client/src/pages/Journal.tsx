import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { posts, postBySlug } from "@/content/journal";
import { site } from "@/site.config";
import { Crumbs, Photo, WhatsAppButton, formatDate, LastUpdated } from "@/components/Bits";
import NotFound from "./NotFound";

export function JournalPage() {
  return (
    <>
      <section className="wrap page-head">
        <Crumbs items={[{ href: "/", label: "Home" }, { label: "Journal" }]} />
        <h1>Journal</h1>
        <p className="lede">Notes from the river: rituals, temples, and the practical side of planning a trip.</p>
      </section>
      <section className="wrap" style={{ paddingBottom: "var(--space-section)" }}>
        <ul className="post-list">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/journal/${p.slug}`}>
                <span className="meta-line">
                  <time dateTime={p.published}>{formatDate(p.published)}</time>
                  <br />
                  {p.tag}
                </span>
                <span>
                  <h2>{p.title}</h2>
                  <span className="muted">{p.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      bar.current?.style.setProperty("--p", String(Math.min(1, Math.max(0, p))));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div className="progress" ref={bar} aria-hidden="true" />;
}

export function PostPage({ slug }: { slug: string }) {
  const p = postBySlug(slug);
  if (!p) return <NotFound />;
  return (
    <article>
      <ReadingProgress />
      <header className="wrap page-head">
        <Crumbs items={[{ href: "/", label: "Home" }, { href: "/journal", label: "Journal" }, { label: p.title }]} />
        <h1>{p.title}</h1>
        <p className="meta-line">
          {p.tag} · Published <time dateTime={p.published}>{formatDate(p.published)}</time> · By the {site.brandName} team
        </p>
      </header>
      <div className="wrap" style={{ paddingBottom: "var(--space-section)" }}>
        <div className="prose">
          <Photo want={p.photo} ratio="16 / 9" />
          <div style={{ marginTop: "var(--space-6)" }}>
            {p.sections.map((s, i) => (
              <section key={i}>
                {s.heading && <h2>{s.heading}</h2>}
                {s.paras?.map((t, j) => (
                  <p key={j}>{t}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
          <LastUpdated date={p.updated} />
          <div className="notice">
            <p>Planning a visit? Tell us your dates and we will suggest a plan.</p>
            <WhatsAppButton message={`Namaste, I read "${p.title}" and I'd like to plan a trip. My dates are: `} />
          </div>
        </div>
      </div>
    </article>
  );
}
