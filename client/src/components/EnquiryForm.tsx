import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { site, whatsappLink } from "@/site.config";
import { trips } from "@/content/trips";
import { postJSON, loadTurnstile, TURNSTILE_SITE_KEY } from "@/lib/humanCheck";
import { getUtm } from "@/lib/utm";

type Fields = {
  name: string;
  phone: string;
  email: string;
  trip: string;
  date: string;
  people: string;
  message: string;
  consent: boolean;
};

const EMPTY: Fields = { name: "", phone: "", email: "", trip: "", date: "", people: "", message: "", consent: false };
const DRAFT_KEY = "gg-enquiry-draft";

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a phone or WhatsApp number with at least 10 digits.";
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "That email address does not look right.";
  if (f.people && (!/^\d+$/.test(f.people) || +f.people < 1 || +f.people > 200)) e.people = "Enter a number of people between 1 and 200.";
  if (!f.consent) e.consent = "Please confirm you are 18 or older and agree, so we can reply.";
  return e;
}

function waMessage(f: Fields, ref?: string) {
  const trip = trips.find((t) => t.slug === f.trip)?.name ?? "Not sure yet";
  return [
    `Namaste ${site.brandName}, I'm ${f.name.trim() || "planning a trip"}.`,
    `Trip: ${trip}.`,
    f.date && `Dates: ${f.date}.`,
    f.people && `People: ${f.people}.`,
    f.message.trim(),
    ref && `(Enquiry ref ${ref})`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function EnquiryForm({ defaultTrip = "" }: { defaultTrip?: string }) {
  const [f, setF] = useState<Fields>({ ...EMPTY, trip: defaultTrip });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [ref, setRef] = useState<string>();
  const [serverMsg, setServerMsg] = useState("");
  const [hp, setHp] = useState("");
  const tsBox = useRef<HTMLDivElement>(null);
  const tsToken = useRef<string>("");
  const statusRef = useRef<HTMLDivElement>(null);

  // restore a saved draft
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
      if (d) setF((cur) => ({ ...cur, ...d, trip: defaultTrip || d.trip || "", consent: false }));
    } catch {
      /* no draft */
    }
  }, [defaultTrip]);

  // invisible Turnstile (only when the guard is switched on)
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let id: string | undefined;
    loadTurnstile().then(() => {
      if (tsBox.current && window.turnstile)
        id = window.turnstile.render(tsBox.current, {
          sitekey: TURNSTILE_SITE_KEY,
          appearance: "interaction-only",
          callback: (t: string) => (tsToken.current = t),
        });
    });
    return () => {
      if (id) window.turnstile?.remove(id);
    };
  }, []);

  useEffect(() => {
    if (state === "ok" || state === "error") statusRef.current?.focus();
  }, [state]);

  function set<K extends keyof Fields>(k: K, v: Fields[K]) {
    const next = { ...f, [k]: v };
    setF(next);
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
    try {
      const { consent, ...draft } = next;
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* storage blocked */
    }
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate(f);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setState("sending");
    try {
      const { status, data } = await postJSON<{ ok?: boolean; id?: string; error?: string }>("/api/leads", {
        ...f,
        people: f.people ? Number(f.people) : undefined,
        website: hp,
        utm: getUtm(),
        page: window.location.pathname,
        turnstileToken: tsToken.current || undefined,
      });
      if (status >= 200 && status < 300 && data.ok) {
        setRef(data.id);
        setState("ok");
        try {
          localStorage.removeItem(DRAFT_KEY);
        } catch {
          /* ignore */
        }
      } else {
        setServerMsg(data.error || "Something went wrong on our side.");
        setState("error");
      }
    } catch {
      setServerMsg("We could not reach the server. Check your connection.");
      setState("error");
    } finally {
      if (TURNSTILE_SITE_KEY) window.turnstile?.reset();
    }
  }

  if (state === "ok") {
    return (
      <div className="status status--ok" role="status" tabIndex={-1} ref={statusRef}>
        <h3>Thank you, {f.name.split(" ")[0]}. We have your enquiry.</h3>
        <p>Reference {ref}. Here is what happens next:</p>
        <ol>
          <li>We read your enquiry and check availability for your dates.</li>
          <li>We reply on WhatsApp with a plan and a price{site.responseHours ? `, ${site.responseHours}` : ""}.</li>
          <li>You confirm only when you are happy with both.</li>
        </ol>
        <p>Want to talk now? Send the same details on WhatsApp:</p>
        <div className="btn-row">
          <a className="btn" href={whatsappLink(waMessage(f, ref))} target="_blank" rel="noopener">
            Continue on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button type="button" className="btn btn--ghost" onClick={() => { setF({ ...EMPTY }); setState("idle"); }}>
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const err = (k: keyof Fields) => (errors[k] ? { "aria-invalid": true as const, "aria-describedby": `e-${k}` } : {});
  const msg = (k: keyof Fields) => errors[k] && <span className="err" id={`e-${k}`}>{errors[k]}</span>;

  return (
    <form className="form" onSubmit={submit} noValidate aria-label="Trip enquiry">
      <div className="field">
        <label htmlFor="f-name">Your name</label>
        <input id="f-name" name="name" autoComplete="name" required value={f.name} onChange={(e) => set("name", e.target.value)} {...err("name")} />
        {msg("name")}
      </div>
      <div className="field">
        <label htmlFor="f-phone">Phone or WhatsApp</label>
        <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required value={f.phone} onChange={(e) => set("phone", e.target.value)} {...err("phone")} />
        {msg("phone")}
      </div>
      <div className="field">
        <label htmlFor="f-email">Email <span className="hint">(optional)</span></label>
        <input id="f-email" name="email" type="email" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} {...err("email")} />
        {msg("email")}
      </div>
      <div className="field">
        <label htmlFor="f-trip">Trip</label>
        <select id="f-trip" name="trip" value={f.trip} onChange={(e) => set("trip", e.target.value)}>
          <option value="">Not sure yet</option>
          {trips.map((t) => (
            <option key={t.slug} value={t.slug}>{t.name}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-date">When are you travelling?</label>
        <input id="f-date" name="date" placeholder="e.g. 12–14 Feb, or 'March'" value={f.date} onChange={(e) => set("date", e.target.value)} maxLength={80} />
      </div>
      <div className="field">
        <label htmlFor="f-people">How many people?</label>
        <input id="f-people" name="people" inputMode="numeric" value={f.people} onChange={(e) => set("people", e.target.value)} {...err("people")} />
        {msg("people")}
      </div>
      <div className="field field--full">
        <label htmlFor="f-message">Anything we should know? <span className="hint">(optional)</span></label>
        <textarea id="f-message" name="message" maxLength={2000} value={f.message} onChange={(e) => set("message", e.target.value)} />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Leave this empty</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>
      <div className="consent">
        <input id="f-consent" type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} {...err("consent")} />
        <label htmlFor="f-consent">
          I am 18 or older, and I agree that {site.brandName} may use these details to reply about my trip, as described in the{" "}
          <Link href="/privacy">privacy policy</Link>. Booking for a child? A parent or guardian should send this form.
        </label>
        {msg("consent")}
      </div>
      <div ref={tsBox} className="field--full" />
      {state === "error" && (
        <div className="status status--err" role="alert" tabIndex={-1} ref={statusRef}>
          <h3>Your enquiry was not sent.</h3>
          <p>{serverMsg} Your details are still in the form. Try again, or send them on WhatsApp instead:</p>
          <a className="btn" href={whatsappLink(waMessage(f))} target="_blank" rel="noopener">
            Send on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      )}
      <div className="field--full btn-row">
        <button type="submit" className="btn" disabled={state === "sending"} aria-busy={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <a className="text-link" href={whatsappLink(waMessage(f))} target="_blank" rel="noopener">
          Or message us on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </form>
  );
}
