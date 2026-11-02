import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { z } from "zod";
import { neon } from "@neondatabase/serverless";
import { verifyTurnstile, sendEmail } from "./guard.js";

/*
 * Enquiry handler, shared by the Express server (local / any Node host) and the Vercel function.
 * Storage: Postgres when DATABASE_URL is set (see db/001_leads.sql); otherwise, off Vercel only,
 * an append-only file data/leads.jsonl. On Vercel without a database we refuse with 503 so a lead
 * is never silently dropped; the form then offers WhatsApp.
 */

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v.replace(/\D/g, "").length >= 10, "phone needs at least 10 digits"),
  email: z.union([z.literal(""), z.email().max(200)]).optional(),
  trip: z.string().trim().max(80).optional(),
  date: z.string().trim().max(80).optional(),
  people: z.number().int().min(1).max(200).optional(),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true),
  website: z.string().max(200).optional(), // honeypot
  utm: z.record(z.string().max(40), z.string().max(200)).optional(),
  page: z.string().max(200).optional(),
  turnstileToken: z.string().max(4096).optional(),
});

export type Lead = z.infer<typeof leadSchema>;
type Result = { status: number; body: Record<string, unknown> };

const SAVE_FAILED = "We could not save your enquiry just now.";

function newId() {
  return "GG-" + Date.now().toString(36).toUpperCase() + "-" + randomBytes(2).toString("hex").toUpperCase();
}

async function save(id: string, lead: Lead, ip: string) {
  const { turnstileToken, website, consent, ...data } = lead;
  const row = { id, created_at: new Date().toISOString(), ip, consent_text_version: "2026-11-02", ...data };
  if (process.env.DATABASE_URL) {
    const sql = neon(process.env.DATABASE_URL);
    await sql`insert into leads (id, name, phone, email, trip, travel_dates, people, message, page, utm, ip, consent_version)
              values (${id}, ${data.name}, ${data.phone}, ${data.email || null}, ${data.trip || null}, ${data.date || null},
                      ${data.people ?? null}, ${data.message || null}, ${data.page || null}, ${JSON.stringify(data.utm ?? {})},
                      ${ip}, ${row.consent_text_version})`;
    return;
  }
  if (process.env.VERCEL) throw new Error("storage-not-configured");
  const dir = path.resolve(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(row) + "\n", { mode: 0o600 });
}

async function notify(id: string, lead: Lead) {
  const to = process.env.LEAD_NOTIFY_TO;
  if (!to) return;
  const lines = [
    `Ref: ${id}`,
    `Name: ${lead.name}`,
    `Phone/WhatsApp: ${lead.phone}`,
    lead.email && `Email: ${lead.email}`,
    `Trip: ${lead.trip || "not sure yet"}`,
    lead.date && `Dates: ${lead.date}`,
    lead.people && `People: ${lead.people}`,
    lead.message && `Message: ${lead.message}`,
    lead.page && `Sent from: ${lead.page}`,
  ].filter(Boolean);
  await sendEmail(to, `New enquiry ${id}: ${lead.name}`, lines.join("\n"));
}

export async function handleLead(raw: unknown, ip: string): Promise<Result> {
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => String(i.path[0])))];
    return { status: 400, body: { ok: false, error: `Please check: ${fields.join(", ")}.`, fields } };
  }
  const lead = parsed.data;
  // Bots fill the hidden field; pretend success and keep nothing.
  if (lead.website) return { status: 201, body: { ok: true, id: newId() } };

  if (process.env.TURNSTILE_SECRET_KEY) {
    if (!lead.turnstileToken) return { status: 400, body: { ok: false, error: "The spam check did not finish. Please try again." } };
    const v = await verifyTurnstile(lead.turnstileToken, ip);
    if (v === "bad") return { status: 403, body: { ok: false, error: "The spam check failed. Please try again." } };
    if (v === "unreachable") return { status: 503, body: { ok: false, error: "The spam check is unavailable." } };
  }

  const id = newId();
  try {
    await save(id, lead, ip);
  } catch (e) {
    console.error("[leads] save failed", (e as Error).message);
    return { status: 503, body: { ok: false, error: SAVE_FAILED } };
  }
  // Awaited: serverless functions may stop as soon as the response is sent.
  await notify(id, lead).catch((e) => console.error("[leads] notify failed", (e as Error).message));
  return { status: 201, body: { ok: true, id } };
}
