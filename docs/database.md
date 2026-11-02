# Database — GangaGuides
One table. Schema file: `db/001_leads.sql` (run manually; never from the build). Content (trips, places, posts) is static TypeScript in `client/src/content/`, not in the DB.

## `leads`
| Field | Type | Req | PII | Notes |
|---|---|---|---|---|
| id | text PK | yes | no | `GG-<base36 time>-<4 hex>`, shown to the visitor as reference |
| created_at | timestamptz | yes | no | default now() |
| name | text | yes | **yes** | ≤120 |
| phone | text | yes | **yes** | ≥10 digits |
| email | text | no | **yes** | |
| trip | text | no | no | trip slug |
| travel_dates | text | no | no | free text ≤80 |
| people | int | no | no | 1–200 |
| message | text | no | maybe | ≤2000 |
| page | text | no | no | path the form was sent from |
| utm | jsonb | yes | no | utm_*, gclid, fbclid, referrer |
| ip | text | no | **yes** | abuse prevention |
| consent_version | text | yes | no | date of the consent text shown |
| status | text | yes | no | default `new` (owner workflow: new → replied → booked/closed) |

## Access
Write: `/api/leads` only (server-side, validated). Read: owner via Neon console (no admin panel yet). No public read API.

## Retention
Non-booked enquiries deleted 12 months after last contact (stated in privacy policy). TODO(ask): who runs the deletion; until then a monthly manual `delete from leads where status <> 'booked' and created_at < now() - interval '12 months'` (copy → verify → delete).

## Without a database
Off Vercel, leads append to `data/leads.jsonl` (git-ignored, mode 600). On Vercel without `DATABASE_URL` the API returns 503 and the form offers WhatsApp, so nothing is silently lost.
