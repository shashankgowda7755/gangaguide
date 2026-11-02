import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { site, whatsappLink } from "@/site.config";
import { Todo } from "./Bits";

const NAV = [
  { href: "/packages", label: "Trips" },
  { href: "/destinations", label: "Destinations" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

function Header() {
  const [path] = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const current = (href: string) => (path === href || path.startsWith(href + "/") ? "page" : undefined);
  return (
    <header className="site-header">
      <div className="wrap site-header__bar">
        <Link href="/" className="wordmark" aria-label={`${site.brandName}, home`}>
          {site.brandName}
          <span>Varanasi</span>
        </Link>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="site-nav" className="nav" aria-label="Main" data-open={open}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current(n.href)}>
              {n.label}
            </Link>
          ))}
          <Link href="/contact" className="btn" aria-current={current("/contact")}>
            Plan a trip
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const year = 2026;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p className="site-footer__statement">Ask us anything about the river.</p>
        <div className="btn-row">
          <a className="btn" href={whatsappLink(`Namaste ${site.brandName}, I have a question about a trip.`)} target="_blank" rel="noopener">
            Message on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link href="/contact" className="btn btn--ghost" style={{ color: "inherit", borderColor: "currentColor" }}>
            Send an enquiry
          </Link>
        </div>
        <div className="site-footer__grid">
          <div>
            <p>
              <strong>{site.legalName ?? site.brandName}</strong>
              {!site.legalName && (
                <>
                  {" "}
                  <Todo>registered business name</Todo>
                </>
              )}
            </p>
            <p>{site.address ?? <Todo>postal address, {site.city}</Todo>}</p>
            {site.gstin && <p>GSTIN {site.gstin}</p>}
            <p>
              WhatsApp / phone: <a href={`tel:+${site.whatsappNumber}`}>{site.phoneDisplay}</a>
              {site.email ? (
                <>
                  {" · "}
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </>
              ) : (
                <>
                  {" "}
                  <Todo>email on own domain</Todo>
                </>
              )}
            </p>
          </div>
          <ul aria-label="Site">
            <li><Link href="/packages">Trips and prices</Link></li>
            <li><Link href="/destinations">Destinations</Link></li>
            <li><Link href="/journal">Journal</Link></li>
            <li><Link href="/faq">Questions</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
          <ul aria-label="Policies">
            <li><Link href="/privacy">Privacy policy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/cancellation-policy">Cancellation and refunds</Link></li>
            <li><Link href="/cookies">Cookies</Link></li>
            <li><Link href="/privacy#grievance">Grievance officer</Link></li>
          </ul>
        </div>
        <div className="site-footer__base">
          <span>© {year} {site.legalName ?? site.brandName}. Photos on this site are placeholders until our own are added.</span>
          {/* OIAS credit: TODO(ask) badge vs quiet line; site.config.oiasCredit decides. */}
          {site.oiasCredit === "badge" && <a href="https://oias.in/?utm_source=gangaguides">Built by OIAS</a>}
          {site.oiasCredit === "quiet" && <a href="https://oias.in/?utm_source=gangaguides">Designed &amp; built by OIAS</a>}
        </div>
      </div>
    </footer>
  );
}

function Floating() {
  const [showTop, setShowTop] = useState(false);
  const [cookie, setCookie] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    try {
      setCookie(localStorage.getItem("gg-cookie-ok") !== "1");
    } catch {
      setCookie(true);
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <a className="btn btn--ink wa-float" href={whatsappLink(`Namaste ${site.brandName}, I'd like to plan a trip.`)} target="_blank" rel="noopener">
        WhatsApp<span className="sr-only"> us (opens in a new tab)</span>
      </a>
      {showTop && (
        <button type="button" className="to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ↑
        </button>
      )}
      {cookie && (
        <div className="cookie" role="region" aria-label="Cookie notice">
          <p>
            We use no tracking or advertising cookies. Your browser stores this choice and any enquiry draft locally.{" "}
            <Link href="/cookies">Cookie details</Link>
          </p>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              try {
                localStorage.setItem("gg-cookie-ok", "1");
              } catch {
                /* storage blocked: notice returns next visit */
              }
              setCookie(false);
            }}
          >
            OK
          </button>
        </div>
      )}
    </>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <Floating />
    </>
  );
}
