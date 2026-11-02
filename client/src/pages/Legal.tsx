import type { ReactNode } from "react";
import { Link } from "wouter";
import { site } from "@/site.config";
import { Crumbs, LastUpdated, Todo } from "@/components/Bits";

function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <section className="wrap page-head">
        <Crumbs items={[{ href: "/", label: "Home" }, { label: title }]} />
        <h1>{title}</h1>
        <LastUpdated date={site.legalUpdated} />
      </section>
      <section className="wrap" style={{ paddingBottom: "var(--space-section)" }}>
        <div className="prose">{children}</div>
      </section>
    </>
  );
}

const Who = () => (
  <>
    {site.legalName ?? site.brandName}
    {!site.legalName && (
      <>
        {" "}
        <Todo>registered business name</Todo>
      </>
    )}
    , {site.address ?? <Todo>postal address</Todo>}
  </>
);

const Contact = () => (site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <Todo>email on own domain</Todo>);

export function PrivacyPage() {
  const g = site.grievanceOfficer;
  return (
    <LegalShell title="Privacy policy">
      <p>
        This policy explains what personal data {site.brandName} collects through this website, why, and the choices you have. It is written for
        India's Digital Personal Data Protection Act, 2023 (DPDP Act). The data fiduciary is <Who />.
      </p>
      <h2>What we collect</h2>
      <p>Only what you type into the enquiry form, plus a few technical details:</p>
      <ul>
        <li>Your name and phone or WhatsApp number (required to reply).</li>
        <li>Email address, trip of interest, travel dates, number of people and your message (all optional).</li>
        <li>The page you sent the form from and, if you arrived from an ad or link, its campaign tags (utm) and referring site.</li>
        <li>Your IP address and the time of the request, used to stop spam and abuse.</li>
      </ul>
      <p>We do not use analytics, advertising pixels, session recording or tracking cookies.</p>
      <h2>Why we collect it</h2>
      <p>
        To reply to your enquiry, plan and quote your trip, and, if you book, to run it. We rely on your consent, which you give with the
        checkbox on the form. We do not sell your data or use it for marketing without asking you separately.
      </p>
      <h2>Children</h2>
      <p>
        The form is for people aged 18 and over. Under the DPDP Act a person under 18 is a child, and their data needs a parent's or guardian's
        consent. If you are booking for a child, a parent or guardian should send the enquiry.
      </p>
      <h2>Who we share it with</h2>
      <ul>
        <li>Our hosting provider, which runs this website and its form (Vercel Inc.).</li>
        <li>Our database provider, which stores enquiries (Neon), once the database is switched on.</li>
        <li>Our email provider, which forwards new enquiries to our inbox (Resend), once email is switched on.</li>
        <li>WhatsApp (Meta), only when you choose to message us there. WhatsApp's own privacy policy applies to that chat.</li>
        <li>Cloudflare Turnstile, only if our spam check is switched on: it reads your IP address and browser signals to tell people from bots, without a tracking cookie.</li>
        <li>Guides, boat operators and hotels, only the details needed to run a trip you have booked.</li>
      </ul>
      <p>Some of these providers may store data outside India, under their own safeguards.</p>
      <h2>How long we keep it</h2>
      <p>
        Enquiries that do not become a booking are deleted 12 months after our last message with you. Booking records are kept as long as tax and
        accounting law requires.
      </p>
      <h2>Your rights</h2>
      <p>You can ask us to:</p>
      <ul>
        <li>tell you what data we hold about you and who we shared it with;</li>
        <li>correct, complete or update it;</li>
        <li>erase it, and withdraw your consent at any time (this does not affect anything done before);</li>
        <li>nominate someone to exercise these rights for you if you die or cannot act.</li>
      </ul>
      <p>
        Write to <Contact /> or message us on WhatsApp. We reply within 30 days.
      </p>
      <h2 id="grievance">Grievance officer</h2>
      <p>
        {g.name ?? <Todo>Grievance Officer name</Todo>}, {g.email ? <a href={`mailto:${g.email}`}>{g.email}</a> : <Todo>grievance email</Todo>},{" "}
        {site.address ?? <Todo>postal address</Todo>}. If we do not resolve your complaint, you can approach the Data Protection Board of India.
      </p>
      <h2>Changes</h2>
      <p>If we change this policy we will update the date at the top of this page.</p>
    </LegalShell>
  );
}

export function TermsPage() {
  return (
    <LegalShell title="Terms">
      <p>
        These terms apply to this website and to trips booked with <Who />. By sending an enquiry or booking a trip you agree to them.
      </p>
      <h2>Prices and bookings</h2>
      <ul>
        <li>Prices on this site are starting prices. Your final price, what it includes and the payment terms are sent to you in writing (usually on WhatsApp) before you pay.</li>
        <li>A booking is confirmed only when you have accepted that quote and we have confirmed it back to you.</li>
        <li>Festival dates follow the Hindu calendar and are confirmed with your quote.</li>
      </ul>
      <h2>Temples, rituals and third parties</h2>
      <p>
        Temples, the river authorities and transport operators set their own rules and timings. Darshan queues, ritual slots and boat rides can
        change or be suspended at short notice (for example when the river is high). We plan around this but cannot control it.
      </p>
      <h2>Your conduct</h2>
      <p>Please follow your guide's instructions at the ghats and temples, respect local customs, and do not photograph at the cremation ghats.</p>
      <h2>Cancellations and refunds</h2>
      <p>
        See the <Link href="/cancellation-policy">cancellation and refund policy</Link>.
      </p>
      <h2>Liability</h2>
      <p>
        We take reasonable care in planning and running trips. We are not liable for losses caused by events outside our control, or by third
        parties whose services you use directly. Nothing in these terms limits rights you have under the Consumer Protection Act, 2019.
      </p>
      <h2>Law and disputes</h2>
      <p>
        These terms are governed by the laws of India. Courts at <Todo>jurisdiction (e.g. Varanasi, Uttar Pradesh)</Todo> have jurisdiction.
        Complaints: <Contact />.
      </p>
    </LegalShell>
  );
}

export function CancellationPage() {
  return (
    <LegalShell title="Cancellation and refunds">
      {!site.refundTermsConfirmed && (
        <p className="notice">
          <Todo>cancellation windows and refund percentages</Todo> These terms are a draft until confirmed by the owner.
        </p>
      )}
      <p>The exact cancellation terms for your trip are written in the quote we send you before you pay. In general:</p>
      <h2>If you cancel</h2>
      <ul>
        <li>Tell us on WhatsApp or by email as early as you can. The time of your message counts as the time of cancellation.</li>
        <li>Refunds depend on how close to the trip you cancel, and on costs we have already paid on your behalf (rooms, train tickets, festival boats).</li>
      </ul>
      <h2>If we cancel or change your trip</h2>
      <ul>
        <li>If we cancel, you get a full refund of what you paid us, or a new date if you prefer.</li>
        <li>If the river authorities stop boats, or a temple changes its timings, we offer an alternative on the same day where possible.</li>
      </ul>
      <h2>How refunds are paid</h2>
      <p>
        To the account or method you paid from, within <Todo>refund timeline</Todo> of the refund being agreed.
      </p>
      <p>
        Questions: <Contact /> or WhatsApp {site.phoneDisplay}.
      </p>
    </LegalShell>
  );
}

export function CookiesPage() {
  return (
    <LegalShell title="Cookies">
      <p>This site does not use advertising, analytics or tracking cookies. It stores only the following in your browser:</p>
      <ul>
        <li>
          <code>gg-cookie-ok</code> (local storage): remembers that you closed the cookie notice.
        </li>
        <li>
          <code>gg-enquiry-draft</code> (local storage): keeps what you typed in the enquiry form, so a refresh does not lose it. Deleted when you
          send the form.
        </li>
        <li>
          <code>gg-utm</code> (session storage): the campaign tags of the link you arrived from, sent with your enquiry. Gone when you close the tab.
        </li>
        <li>
          <code>gg_hc</code> (cookie, 30 minutes): only if our spam check is switched on and you complete a "Quick check". It lets you continue
          without being asked again.
        </li>
      </ul>
      <p>
        Fonts are served from this website, not from Google. You can clear all of the above from your browser settings at any time. See also the{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>
    </LegalShell>
  );
}
