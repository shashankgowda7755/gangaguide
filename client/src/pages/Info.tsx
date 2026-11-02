import { Link } from "wouter";
import { site, whatsappLink } from "@/site.config";
import { Crumbs, Faq, Photo, Todo, CopyButton, WhatsAppButton } from "@/components/Bits";
import { EnquiryForm } from "@/components/EnquiryForm";

export function AboutPage() {
  return (
    <>
      <section className="wrap page-head">
        <Crumbs items={[{ href: "/", label: "Home" }, { label: "About" }]} />
        <h1>Guides who live by the river</h1>
        <p className="lede">
          {site.brandName} plans trips in Varanasi and the pilgrim cities around it: boat rides, ghat walks, darshan, pooja, and the longer trails to
          Sarnath, Ayodhya and Prayagraj.
        </p>
      </section>
      <section className="wrap split" style={{ paddingBottom: "var(--space-section)" }}>
        <div className="prose">
          <h2>How we plan a trip</h2>
          <p>
            Every trip starts as a conversation on WhatsApp. You tell us your dates, who is travelling and what matters to you, whether that is a
            ritual for a parent, a first look at the ghats, or a full pilgrimage. We come back with a plan and a price, and change it until it fits.
          </p>
          <p>
            On the day, a local guide walks with you. They know which lane leads where, when the queue at the temple is shortest, and how to watch
            the ghats respectfully.
          </p>
          <h2>What we will not do</h2>
          <ul>
            <li>Sell "special access" to temples. Rituals and darshan are booked through each temple's own process.</li>
            <li>Take money before you have agreed the plan and the price in writing.</li>
            <li>Photograph or film at the cremation ghats, or ask you to.</li>
          </ul>
          <h2>The team</h2>
          <p>
            <Todo>guide names, photos and short bios (real people only)</Todo>
          </p>
        </div>
        <aside className="aside" aria-label="Talk to us">
          <Photo want="The team on the ghats" ratio="4 / 5" />
          <p style={{ marginTop: "var(--space-4)" }}>Questions before you plan? Ask us directly.</p>
          <WhatsAppButton message={`Namaste ${site.brandName}, I have a question.`} label="Ask on WhatsApp" />
        </aside>
      </section>
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <section className="wrap page-head">
        <Crumbs items={[{ href: "/", label: "Home" }, { label: "Plan a trip" }]} />
        <h1>Plan a trip</h1>
        <p className="lede">Send your dates and group size. We reply on WhatsApp with a plan and a price, and nothing is booked until you confirm.</p>
      </section>
      <section className="wrap enquire" style={{ paddingBottom: "var(--space-section)" }}>
        <div>
          <h2 style={{ fontSize: "var(--text-2xl)" }}>Other ways to reach us</h2>
          <ul className="contact-lines">
            <li>
              <span>
                WhatsApp:{" "}
                <a href={whatsappLink(`Namaste ${site.brandName}, I'd like to plan a trip.`)} target="_blank" rel="noopener">
                  {site.phoneDisplay}
                </a>
              </span>
              <CopyButton text={site.phoneDisplay} label="Copy number" />
            </li>
            <li>
              <span>Phone: <a href={`tel:+${site.whatsappNumber}`}>{site.phoneDisplay}</a></span>
            </li>
            <li>
              <span>Email: {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <Todo>email on own domain</Todo>}</span>
            </li>
            <li>
              <span>Office: {site.address ?? <Todo>postal address, {site.city}</Todo>}</span>
            </li>
            <li>
              <span>Replies: {site.responseHours ?? <Todo>WhatsApp response hours</Todo>}</span>
            </li>
          </ul>
          <p className="small muted">
            We use your details only to reply about your trip. See the <Link href="/privacy">privacy policy</Link>.
          </p>
        </div>
        <EnquiryForm />
      </section>
    </>
  );
}

export function FaqPage() {
  return (
    <>
      <section className="wrap page-head">
        <Crumbs items={[{ href: "/", label: "Home" }, { label: "Questions" }]} />
        <h1>Questions</h1>
        <p className="lede">Booking, prices, seasons, and how to behave at the ghats and temples.</p>
      </section>
      <section className="wrap" style={{ paddingBottom: "var(--space-section)" }}>
        <Faq />
        <p style={{ marginTop: "var(--space-6)" }}>
          Something else? <Link href="/contact">Ask us</Link>.
        </p>
      </section>
    </>
  );
}
