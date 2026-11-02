import { useEffect, useRef, useState } from "react";

/*
 * Anti-scrape guard, client side. Shipped OFF: with VITE_TURNSTILE_SITE_KEY unset nothing here
 * renders and API calls behave like plain fetch. When the server answers 403 HUMAN_CHECK_REQUIRED
 * we show one "Quick check" overlay (shared by parallel calls), exchange the Turnstile token for a
 * pass cookie at /api/human-check, then retry the request once.
 */

export const TURNSTILE_SITE_KEY: string | undefined = import.meta.env.VITE_TURNSTILE_SITE_KEY || undefined;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;
export function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  scriptPromise ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Turnstile failed to load"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

type Listener = (open: boolean) => void;
const listeners = new Set<Listener>();
let pending: Promise<void> | null = null;
let settle: ((ok: boolean) => void) | null = null;

function humanCheck(): Promise<void> {
  pending ??= new Promise<void>((resolve, reject) => {
    settle = (ok) => {
      pending = null;
      settle = null;
      listeners.forEach((l) => l(false));
      ok ? resolve() : reject(new Error("Human check failed"));
    };
    listeners.forEach((l) => l(true));
  });
  return pending;
}

export async function postJSON<T>(url: string, body: unknown): Promise<{ status: number; data: T }> {
  const go = () =>
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), credentials: "same-origin" });
  let res = await go();
  if (res.status === 403 && TURNSTILE_SITE_KEY) {
    const peek = (await res.clone().json().catch(() => ({}))) as { code?: string };
    if (peek.code === "HUMAN_CHECK_REQUIRED") {
      await humanCheck();
      res = await go();
    }
  }
  const data = (await res.json().catch(() => ({}))) as T;
  return { status: res.status, data };
}

/** Mounted once in the layout. Renders nothing unless a check is pending. */
export function HumanCheckHost() {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const l: Listener = (o) => setOpen(o);
    listeners.add(l);
    return () => void listeners.delete(l);
  }, []);

  useEffect(() => {
    if (!open || !TURNSTILE_SITE_KEY) return;
    let id: string | undefined;
    loadTurnstile()
      .then(() => {
        if (!box.current || !window.turnstile) return;
        id = window.turnstile.render(box.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: async (token: string) => {
            const r = await fetch("/api/human-check", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token }),
              credentials: "same-origin",
            });
            if (r.ok) settle?.(true);
            else {
              setErr("That did not work. Please try again.");
              window.turnstile?.reset(id);
            }
          },
        });
      })
      .catch(() => setErr("The check could not load. Please message us on WhatsApp instead."));
    return () => {
      if (id) window.turnstile?.remove(id);
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="hc" role="dialog" aria-modal="true" aria-labelledby="hc-title">
      <div className="hc__panel">
        <h2 id="hc-title">Quick check</h2>
        <p>We saw a lot of requests from your connection. Please confirm you are human to continue.</p>
        <div ref={box} />
        {err && <p role="alert">{err}</p>}
        <button type="button" className="btn btn--ghost" onClick={() => settle?.(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
