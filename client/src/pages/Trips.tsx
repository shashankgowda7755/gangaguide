import { Link } from "wouter";
import { trips, categories, tripBySlug, formatPrice, type TripCategory } from "@/content/trips";
import { placeBySlug } from "@/content/places";
import { Crumbs, Photo, PriceNote, WhatsAppButton } from "@/components/Bits";
import { EnquiryForm } from "@/components/EnquiryForm";
import NotFound from "./NotFound";

export function TripIndex({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <>
      {(Object.keys(categories) as TripCategory[]).map((c) => (
        <div className="trip-group" key={c} id={c}>
          <H className="trip-group__title">{categories[c].title}</H>
          <p className="muted">{categories[c].blurb}</p>
          <ul className="trip-list">
            {trips
              .filter((t) => t.category === c)
              .map((t) => (
                <li className="trip-row" key={t.slug}>
                  <Link href={`/packages/${t.slug}`}>
                    <span>
                      <span className="trip-row__name">{t.name}<span className="sr-only">.</span></span>
                      <span className="trip-row__sum">{t.summary}</span>
                    </span>
                    <span className="trip-row__dur">{t.duration}</span>
                    <span className="trip-row__price">
                      <small>from</small>
                      {formatPrice(t.priceFrom)}
                    </span>
                    <span className="trip-row__arrow" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export function TripsPage() {
  return (
    <>
      <section className="wrap page-head">
        <Crumbs items={[{ href: "/", label: "Home" }, { label: "Trips" }]} />
        <h1>Trips and prices</h1>
        <p className="lede">
          Every trip can be shortened, stretched or combined. The prices are where each one starts; we confirm the final quote for your dates and
          group on WhatsApp before you pay anything.
        </p>
      </section>
      <section className="wrap" style={{ paddingBottom: "var(--space-section)" }}>
        <TripIndex headingLevel={2} />
      </section>
    </>
  );
}

export function TripPage({ slug }: { slug: string }) {
  const trip = tripBySlug(slug);
  if (!trip) return <NotFound />;
  const msg = `Namaste, I'm interested in "${trip.name}" (${trip.duration}). My dates are: `;
  return (
    <>
      <section className="wrap page-head">
        <Crumbs items={[{ href: "/", label: "Home" }, { href: "/packages", label: "Trips" }, { label: trip.name }]} />
        <h1>{trip.name}</h1>
        <p className="lede">{trip.summary}</p>
        {/* phones: the price box sits below the itinerary, so repeat the essentials here */}
        <p className="trip-facts">
          {trip.duration} · from <strong>{formatPrice(trip.priceFrom)}</strong> · <a href="#enquire">Enquire</a>
        </p>
      </section>
      <section className="wrap split" style={{ paddingBottom: "var(--space-section)" }}>
        <div>
          <Photo want={trip.photo} ratio="16 / 9" />
          <div className="prose" style={{ marginTop: "var(--space-6)" }}>
            <h2>What the trip covers</h2>
            <ul className="ticks">
              {trip.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <h2>How the day goes</h2>
            {trip.body.map((b, i) => (
              <p key={i}>{b}</p>
            ))}
            {trip.note && <p className="notice">{trip.note}</p>}
            <h2>Where</h2>
            <p>
              {trip.places.map((s, i) => {
                const pl = placeBySlug(s)!;
                return (
                  <span key={s}>
                    {i > 0 && ", "}
                    <Link href={`/destinations/${pl.slug}`}>{pl.name}</Link>
                  </span>
                );
              })}
            </p>
            <h2>Before you book</h2>
            <p>
              Inclusions, pickup point and group size are agreed with you in writing on WhatsApp before you pay. See the{" "}
              <Link href="/cancellation-policy">cancellation and refund policy</Link>.
            </p>
          </div>
        </div>
        <aside className="aside" aria-label="Price and booking">
          <dl>
            <dt>Duration</dt>
            <dd>{trip.duration}</dd>
            <dt>From</dt>
            <dd>{formatPrice(trip.priceFrom)}</dd>
          </dl>
          <p>
            <PriceNote />
          </p>
          <WhatsAppButton message={msg} label="Ask on WhatsApp" />
          <a className="btn btn--ghost" href="#enquire">
            Send an enquiry
          </a>
        </aside>
      </section>
      <section className="section section--tint" id="enquire" aria-labelledby="enq-h">
        <div className="wrap enquire">
          <div>
            <h2 id="enq-h" style={{ fontSize: "var(--text-3xl)" }}>
              Enquire about {trip.name}
            </h2>
            <p className="muted">We reply on WhatsApp with a plan and a price. Nothing is booked until you confirm.</p>
          </div>
          <EnquiryForm defaultTrip={trip.slug} />
        </div>
      </section>
    </>
  );
}
