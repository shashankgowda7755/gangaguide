import { BlockList, isIP } from "node:net";
import { createHmac, timingSafeEqual } from "node:crypto";

/*
 * anti-scrape-guard, server side. Shipped OFF: with SCRAPE_GUARD unset every request passes.
 * Env: SCRAPE_GUARD=on · SCRAPE_GUARD_MAX (600) · SCRAPE_GUARD_WINDOW_MS (300000) ·
 * SCRAPE_GUARD_ALLOW_IPS (IPs / CIDRs, comma separated) · SCRAPE_GUARD_ALERT_EMAIL ·
 * TURNSTILE_SECRET_KEY (+ VITE_TURNSTILE_SITE_KEY on the client — always set both).
 * Counters live in memory: per instance on serverless, so they are approximate there.
 */

const on = () => process.env.SCRAPE_GUARD === "on";
const MAX = () => Number(process.env.SCRAPE_GUARD_MAX) || 600;
const WINDOW = () => Number(process.env.SCRAPE_GUARD_WINDOW_MS) || 5 * 60_000;
const PASS_MS = 30 * 60_000;
export const PASS_COOKIE = "gg_hc";

const hits = new Map<string, { n: number; start: number }>();
const alerted = new Map<string, number>();

let allow: BlockList | null = null;
function allowList() {
  if (allow) return allow;
  allow = new BlockList();
  for (const raw of (process.env.SCRAPE_GUARD_ALLOW_IPS || "").split(",").map((s) => s.trim()).filter(Boolean)) {
    const [addr, bits] = raw.split("/");
    const type = isIP(addr) === 6 ? "ipv6" : "ipv4";
    if (!isIP(addr)) {
      console.warn(`[guard] SCRAPE_GUARD_ALLOW_IPS: "${raw}" is not an IP or CIDR, skipped`);
      continue;
    }
    if (bits) allow.addSubnet(addr, Number(bits), type);
    else allow.addAddress(addr, type);
  }
  return allow;
}

function secret() {
  return process.env.TURNSTILE_SECRET_KEY || "";
}

function sign(ip: string, exp: number) {
  return createHmac("sha256", secret()).update(`${ip}|${exp}`).digest("base64url");
}

function hasPass(ip: string, cookieHeader = "") {
  const m = cookieHeader.match(new RegExp(`(?:^|;\\s*)${PASS_COOKIE}=([^;]+)`));
  if (!m || !secret()) return false;
  const [expStr, sig] = decodeURIComponent(m[1]).split(".");
  const exp = Number(expStr);
  if (!exp || exp < Date.now() || !sig) return false;
  const want = Buffer.from(sign(ip, exp));
  const got = Buffer.from(sig);
  return want.length === got.length && timingSafeEqual(want, got);
}

/** Returns a 403 body when this request should be challenged, else null. */
export function guardCheck(ip: string, path: string, cookieHeader?: string, userAgent = ""): { status: number; body: object } | null {
  if (!on() || path.startsWith("/api/human-check")) return null;
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.start > WINDOW()) {
    hits.set(ip, { n: 1, start: now });
    return null;
  }
  h.n++;
  if (h.n <= MAX()) return null;
  const family = isIP(ip) === 6 ? "ipv6" : "ipv4";
  if (isIP(ip) && allowList().check(ip, family)) return null;
  if (hasPass(ip, cookieHeader)) return null;
  flag(ip, path, userAgent);
  return { status: 403, body: { ok: false, code: "HUMAN_CHECK_REQUIRED" } };
}

function flag(ip: string, path: string, ua: string) {
  const last = alerted.get(ip) ?? 0;
  if (Date.now() - last < 60 * 60_000) return;
  alerted.set(ip, Date.now());
  console.warn(`[guard] flagged ip=${ip} path=${path} ua=${ua.slice(0, 160)}`);
  const to = process.env.SCRAPE_GUARD_ALERT_EMAIL;
  if (to) sendEmail(to, `Scrape guard flagged ${ip}`, `Path: ${path}\nUser agent: ${ua}\nAllow it: add to SCRAPE_GUARD_ALLOW_IPS.`).catch(() => {});
}

export async function verifyTurnstile(token: string, ip: string): Promise<"ok" | "bad" | "unreachable"> {
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secret(), response: token, remoteip: ip }),
      signal: AbortSignal.timeout(5000),
    });
    const j = (await r.json()) as { success?: boolean };
    return j.success ? "ok" : "bad";
  } catch {
    return "unreachable";
  }
}

/** POST /api/human-check: Turnstile token → signed pass cookie, counter reset. */
export async function handleHumanCheck(body: unknown, ip: string): Promise<{ status: number; body: object; cookie?: string }> {
  const token = (body as { token?: unknown })?.token;
  if (!secret()) return { status: 404, body: { ok: false } };
  if (typeof token !== "string" || !token) return { status: 400, body: { ok: false, error: "missing token" } };
  const v = await verifyTurnstile(token, ip);
  if (v === "unreachable") return { status: 503, body: { ok: false } };
  if (v === "bad") return { status: 403, body: { ok: false } };
  const exp = Date.now() + PASS_MS;
  hits.delete(ip);
  console.info(`[guard] pass ip=${ip}`);
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return {
    status: 200,
    body: { ok: true },
    cookie: `${PASS_COOKIE}=${encodeURIComponent(`${exp}.${sign(ip, exp)}`)}; Path=/; Max-Age=${PASS_MS / 1000}; HttpOnly; SameSite=Lax${secure}`,
  };
}

/** Resend, only when RESEND_API_KEY and LEAD_FROM_EMAIL (an address on the project's own domain) are set. */
export async function sendEmail(to: string, subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!key || !from) return;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, text }),
    signal: AbortSignal.timeout(8000),
  });
  if (!r.ok) throw new Error(`resend ${r.status}`);
}

/** Client IP behind Vercel / a proxy. */
export function clientIp(headers: Record<string, string | string[] | undefined>, fallback = ""): string {
  const xff = headers["x-forwarded-for"];
  const first = (Array.isArray(xff) ? xff[0] : xff)?.split(",")[0]?.trim();
  return first || (headers["x-real-ip"] as string) || fallback;
}
