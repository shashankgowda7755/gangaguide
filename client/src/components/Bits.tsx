import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import { site, whatsappLink } from "@/site.config";
import { faqs as defaultFaqs } from "@/content/journal";

/** Visible marker for a business fact that has not been confirmed yet. */
export function Todo({ children }: { children: ReactNode }) {
  return <mark className="todo">To confirm: {children}</mark>;
}

/**
 * Photo slot. Until a real photo is supplied (see ASSETS-NEEDED.md) it renders a labelled
 * placeholder. Real photos go through `npm run images`, which writes avif/webp at 3 widths.
 */
export function Photo({ want, src, alt, ratio = "3 / 2" }: { want: string; src?: string; alt?: string; ratio?: string }) {
  const style = { "--ratio": ratio } as React.CSSProperties;
  if (src) {
    const base = src.replace(/\.(jpe?g|png|webp|avif)$/i, "");
    const set = (ext: string) => [640, 1024, 1600].map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
    return (
      <figure className="photo" style={style}>
        <picture>
          <source type="image/avif" srcSet={set("avif")} sizes="(max-width: 860px) 100vw, 50vw" />
          <source type="image/webp" srcSet={set("webp")} sizes="(max-width: 860px) 100vw, 50vw" />
          <img src={`${base}-1024.webp`} alt={alt ?? want} loading="lazy" decoding="async" width={1024} height={683} />
        </picture>
      </figure>
    );
  }
  return (
    <figure className="photo" style={style}>
      <div className="photo__ph" role="img" aria-label={`Photo placeholder: ${want}`}>
        <span>
          <strong>{want}</strong>
          Photo to supply
        </span>
      </div>
    </figure>
  );
}

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={i}>{it.href ? <Link href={it.href}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

export function WhatsAppButton({ message, label = "Plan on WhatsApp", variant = "" }: { message: string; label?: string; variant?: string }) {
  return (
    <a className={`btn ${variant}`} href={whatsappLink(message)} target="_blank" rel="noopener">
      {label}
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="copy-btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {
          /* clipboard blocked: the text is visible next to the button */
        }
      }}
    >
      <span aria-live="polite">{done ? "Copied" : label}</span>
    </button>
  );
}

export function Faq({ items = defaultFaqs }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function PriceNote() {
  return (
    <span className="muted small">
      Starting price{site.priceBasis ? `, ${site.priceBasis}` : ""}. Final quote on WhatsApp before you pay.
    </span>
  );
}

export function LastUpdated({ date }: { date: string }) {
  const d = new Date(date + "T00:00:00Z");
  return (
    <p className="meta-line">
      Last updated <time dateTime={date}>{d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time>
    </p>
  );
}

export function formatDate(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
