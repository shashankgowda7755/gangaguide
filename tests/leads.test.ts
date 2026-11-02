import { test, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { PassThrough } from "node:stream";
import { handleLead } from "../server/leads.ts";
import handler from "../api/leads.ts";

// Leads are written to ./data/leads.jsonl when no DATABASE_URL is set: run in a scratch dir.
const cwd = process.cwd();
let dir = "";
const file = () => path.join(dir, "data/leads.jsonl");
const rows = async () => (await readFile(file(), "utf8").catch(() => "")).split("\n").filter(Boolean).map((l) => JSON.parse(l));
const valid = { name: "Asha Rao", phone: "+91 98765 43210", email: "asha@example.com", trip: "kashi-darshan-one-day", people: 3, consent: true, utm: { utm_source: "test" }, page: "/contact" };
const ENV = ["DATABASE_URL", "VERCEL", "TURNSTILE_SECRET_KEY", "LEAD_NOTIFY_TO", "RESEND_API_KEY", "SCRAPE_GUARD"];

before(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "gg-leads-"));
  process.chdir(dir);
});
after(async () => {
  process.chdir(cwd);
  await rm(dir, { recursive: true, force: true });
});
beforeEach(async () => {
  for (const k of ENV) delete process.env[k];
  await rm(path.join(dir, "data"), { recursive: true, force: true });
});

test("valid enquiry is saved with a GG- reference and consent version", async () => {
  const r = await handleLead(valid, "203.0.113.7");
  assert.equal(r.status, 201);
  assert.match(String(r.body.id), /^GG-[0-9A-Z]+-[0-9A-F]{4}$/);
  const [row] = await rows();
  assert.equal(row.id, r.body.id);
  assert.equal(row.name, "Asha Rao");
  assert.equal(row.ip, "203.0.113.7");
  assert.equal(row.consent_text_version, "2026-11-02");
  assert.deepEqual(row.utm, { utm_source: "test" });
  assert.equal(row.consent, undefined, "consent flag itself is not stored, only its version");
  assert.equal((await stat(file())).mode & 0o777, 0o600, "lead file is owner-only");
});

test("missing consent, short phone and bad email are rejected with field names", async () => {
  const r = await handleLead({ ...valid, consent: false, phone: "12345", email: "nope" }, "1.1.1.1");
  assert.equal(r.status, 400);
  assert.deepEqual([...(r.body.fields as string[])].sort(), ["consent", "email", "phone"]);
  assert.deepEqual(await rows(), []);
});

test("empty email is allowed; non-object body is rejected", async () => {
  assert.equal((await handleLead({ ...valid, email: "" }, "1.1.1.1")).status, 201);
  assert.equal((await handleLead("name=x", "1.1.1.1")).status, 400);
  assert.equal((await handleLead(null, "1.1.1.1")).status, 400);
});

test("oversized fields are rejected", async () => {
  assert.equal((await handleLead({ ...valid, message: "x".repeat(2001) }, "1.1.1.1")).status, 400);
  assert.equal((await handleLead({ ...valid, people: 500 }, "1.1.1.1")).status, 400);
});

test("honeypot: bots get a fake success and nothing is stored", async () => {
  const r = await handleLead({ ...valid, website: "http://spam.example" }, "1.1.1.1");
  assert.equal(r.status, 201);
  assert.deepEqual(await rows(), []);
});

test("on Vercel without a database the API refuses (503) instead of losing the lead", async () => {
  process.env.VERCEL = "1";
  const r = await handleLead(valid, "1.1.1.1");
  assert.equal(r.status, 503);
  assert.deepEqual(await rows(), []);
});

test("with Turnstile on, a missing token is rejected before saving", async () => {
  process.env.TURNSTILE_SECRET_KEY = "test-secret";
  const r = await handleLead(valid, "1.1.1.1");
  assert.equal(r.status, 400);
  assert.deepEqual(await rows(), []);
});

// The Vercel function wrapper: method check, JSON response, guard.
function call(method: string, body: unknown, headers: Record<string, string> = {}) {
  const req = Object.assign(new PassThrough(), { method, headers, body, socket: { remoteAddress: "198.51.100.9" } });
  const res = { statusCode: 0, headers: {} as Record<string, string>, text: "", setHeader(k: string, v: string) { this.headers[k.toLowerCase()] = v; }, end(s: string) { this.text = s; } };
  return handler(req as never, res as never).then(() => ({ status: res.statusCode, type: res.headers["content-type"], json: JSON.parse(res.text) }));
}

test("api/leads: GET is 405, POST saves and returns JSON", async () => {
  assert.equal((await call("GET", undefined)).status, 405);
  const r = await call("POST", valid, { "x-forwarded-for": "203.0.113.50, 10.0.0.1" });
  assert.equal(r.status, 201);
  assert.equal(r.type, "application/json");
  assert.equal(r.json.ok, true);
  assert.equal((await rows())[0].ip, "203.0.113.50", "first X-Forwarded-For hop is the client");
});

test("api/leads: guard OFF by default; ON challenges after the limit", async () => {
  for (let i = 0; i < 5; i++) assert.equal((await call("POST", {}, { "x-forwarded-for": "192.0.2.1" })).status, 400);
  process.env.SCRAPE_GUARD = "on";
  process.env.SCRAPE_GUARD_MAX = "2";
  const codes = [];
  for (let i = 0; i < 4; i++) codes.push((await call("POST", {}, { "x-forwarded-for": "192.0.2.2" })).status);
  assert.deepEqual(codes, [400, 400, 403, 403]);
  const blocked = await call("POST", {}, { "x-forwarded-for": "192.0.2.2" });
  assert.equal(blocked.json.code, "HUMAN_CHECK_REQUIRED");
  delete process.env.SCRAPE_GUARD_MAX;
});
