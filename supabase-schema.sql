-- Center City Auto Repair — Supabase schema
-- Run this in your Supabase SQL editor

create table if not exists public.tickets (
  id               text primary key,
  status           text not null default 'received'
                   check (status in ('received','reviewing','in_repair','ready','completed')),
  year             text not null,
  make             text not null,
  model            text not null,
  license_plate    text,
  mileage          text,
  issues           text[] not null default '{}',
  customer_name    text,
  customer_email   text,
  customer_phone   text,
  assigned_to      text,
  notes            text,
  appointment_date text,
  appointment_time text,
  source           text not null default 'web'
                   check (source in ('web','walkin')),
  created_at       timestamptz not null default now()
);

-- Index for rate limiting lookup
create index if not exists tickets_customer_email_created_at
  on public.tickets (customer_email, created_at);

-- Enable Row Level Security
alter table public.tickets enable row level security;

-- Allow authenticated users (admin) to read/write all
create policy "Admin full access"
  on public.tickets
  for all
  to authenticated
  using (true)
  with check (true);

-- Allow service role to bypass RLS (used by API routes)
-- This is implicit — service key always bypasses RLS.

-- Enable realtime for the tickets table
alter publication supabase_realtime add table public.tickets;
