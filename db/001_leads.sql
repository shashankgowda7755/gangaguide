-- Enquiries from the website form. Run once against the Postgres (Neon) database before
-- setting DATABASE_URL in Vercel. Never run from the build.
create table if not exists leads (
  id               text primary key,
  created_at       timestamptz not null default now(),
  name             text not null,
  phone            text not null,
  email            text,
  trip             text,
  travel_dates     text,
  people           integer,
  message          text,
  page             text,
  utm              jsonb not null default '{}'::jsonb,
  ip               text,
  consent_version  text not null,
  status           text not null default 'new'
);
create index if not exists leads_created_at_idx on leads (created_at desc);
