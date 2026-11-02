import { Link } from "wouter";
import { site } from "@/site.config";
import { places } from "@/content/places";
import { trips } from "@/content/trips";
import { faqs } from "@/content/journal";
import { GhatMap } from "@/components/GhatMap";
import { Faq, Photo, WhatsAppButton, CopyButton } from "@/components/Bits";
import { EnquiryForm } from "@/components/EnquiryForm";
import { TripIndex } from "./Trips";

const DAY = [
  { time: "Dawn", title: "On the water", text: "A rowing boat from Assi, north past the ghats while they wake. The light is best in the first hour." },
  { time: "Morning", title: "Into the lanes", text: "On foot through the old city behind Dashashwamedh: shrines, sweet shops, the alley to Kashi Vishwanath." },
  { time: "Afternoon", title: "Slow", text: "Rest, lunch, a quiet temple or two. Or Sarnath, about 10 km away, if you have a second day." },
  { time: "Evening", title: "Aarti", text: "The Ganga aarti at Dashashwamedh, from the steps or a boat. Times shift with sunset through the year." },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__text">
            <p className="hero__orient">Assi Ghat to Raj Ghat, south to north</p>
            <h1>
              Varanasi, read <span className="accent">from the river.</span>
            </h1>
            <p className="lede">
              Local guides for boat rides, ghat walks, aarti and pooja in Kashi, with day trips to Sarnath and trails to Ayodhya and Prayagraj.
            </p>
            <div className="btn-row" style={{ marginTop: "var(--space-5)" }}>
              <WhatsAppButton message={`Namaste ${site.brandName}, I'd like to plan a trip to Varanasi. My dates are: `} />
              <Link href="/packages" className="btn btn--ghost">
                See trips and prices
              </Link>
            </div>
            <p className="hero__note">Trips from ₹1,500. You pay nothing until you have confirmed the plan and the price.</p>
          </div>
          <GhatMap />
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="trips-h">
        <div className="wrap">
          <div className="head">
            <h2 id="trips-h">Ways to see it</h2>
            <p className="muted">{trips.length} trips, from half a day to three days. Each one can be shortened, stretched or combined.</p>
          </div>
          <TripIndex />
        </div>
      </section>

      <section className="section" aria-labelledby="day-h">
        <div className="wrap">
          <div className="head">
            <h2 id="day-h">A day on the river</h2>
            <p className="muted">How most first visits to Kashi go. Your guide adjusts it to the season and to you.</p>
          </div>
          <ol className="day">
            {DAY.map((d) => (
              <li key={d.time}>
                <time>{d.time}</time>
                <div>
                  <h3>{d.title}</h3>
                  <p className="muted" style={{ margin: 0 }}>
                    {d.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div style={{ marginTop: "var(--space-7)" }}>
            <Photo want="Evening aarti at Dashashwamedh, seen from a boat" ratio="21 / 9" />
          </div>
        </div>
      </section>

      <section className="section section--river" aria-labelledby="beyond-h">
        <div className="wrap">
          <div className="head">
            <h2 id="beyond-h">Beyond Kashi</h2>
            <p className="muted">Three journeys out from the ghats, each a different side of the same faith and history.</p>
          </div>
          <div className="places">
            {places
              .filter((p) => p.slug !== "varanasi")
              .map((p) => (
                <Link key={p.slug} href={`/destinations/${p.slug}`} className="place-link">
                  <Photo want={p.photo} ratio="4 / 3" />
                  <h3>
                    {p.name} <span lang="hi">{p.hindi}</span>
                  </h3>
                  <span className="dist">{p.fromVaranasi} from Varanasi</span>
                  <span className="muted">{p.summary}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-h">
        <div className="wrap">
          <div className="head">
            <h2 id="faq-h">Before you ask</h2>
          </div>
          <Faq items={faqs.slice(0, 4)} />
          <p style={{ marginTop: "var(--space-5)" }}>
            <Link href="/faq" className="text-link">
              All questions →
            </Link>
          </p>
        </div>
      </section>

      <section className="section section--tint" id="enquire" aria-labelledby="enq-h">
        <div className="wrap enquire">
          <div>
            <h2 id="enq-h" style={{ fontSize: "var(--text-3xl)" }}>
              Tell us your dates
            </h2>
            <p className="muted">We reply on WhatsApp with a plan and a price. Nothing is booked until you confirm.</p>
            <ul className="contact-lines">
              <li>
                <span>
                  WhatsApp <a href={`tel:+${site.whatsappNumber}`}>{site.phoneDisplay}</a>
                </span>
                <CopyButton text={site.phoneDisplay} label="Copy number" />
              </li>
            </ul>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
