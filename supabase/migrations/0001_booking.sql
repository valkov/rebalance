-- Re-balance — group (1:4) session booking
-- Run via: supabase db push   (or paste into the Supabase SQL editor)

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Weekly recurrence rules. Tanya edits these rows in the Supabase table editor.
-- weekday uses Postgres/JS convention: 0=Sunday, 1=Monday, ... 6=Saturday.
-- start_time is local wall-clock time in Europe/Copenhagen.
-- ---------------------------------------------------------------------------
create table if not exists recurring_rules (
  id          uuid primary key default gen_random_uuid(),
  title       text not null default 'Semi-private session 1:4',
  weekday     int  not null check (weekday between 0 and 6),
  start_time  time not null,
  duration_min int not null default 60,
  capacity    int  not null default 4 check (capacity > 0),
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Concrete bookable slot instances, materialised from the rules for the near
-- future. `booked` is the live attendee count; capacity gate lives here.
-- ---------------------------------------------------------------------------
create table if not exists slots (
  id           uuid primary key default gen_random_uuid(),
  rule_id      uuid references recurring_rules(id) on delete cascade,
  starts_at    timestamptz not null,
  duration_min int not null default 60,
  capacity     int not null default 4 check (capacity > 0),
  booked       int not null default 0 check (booked >= 0),
  status       text not null default 'open' check (status in ('open','closed')),
  unique (rule_id, starts_at)
);
create index if not exists slots_starts_at_idx on slots (starts_at);

-- ---------------------------------------------------------------------------
-- Bookings. Holds the client's details + a per-booking cancel token.
-- ---------------------------------------------------------------------------
create table if not exists bookings (
  id           uuid primary key default gen_random_uuid(),
  slot_id      uuid not null references slots(id) on delete cascade,
  name         text not null,
  email        text not null,
  phone        text not null,
  status       text not null default 'booked' check (status in ('booked','cancelled')),
  cancel_token uuid not null default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  cancelled_at timestamptz
);
create index if not exists bookings_slot_idx on bookings (slot_id);
create unique index if not exists bookings_cancel_token_idx on bookings (cancel_token);

-- All access goes through Edge Functions using the service-role key (which
-- bypasses RLS). Enable RLS with no anon policies so the tables are private
-- (bookings hold PII) to the public anon/authenticated keys.
alter table recurring_rules enable row level security;
alter table slots           enable row level security;
alter table bookings        enable row level security;

-- ---------------------------------------------------------------------------
-- materialize_slots: generate concrete slot rows for the next p_weeks weeks
-- from the active rules. Idempotent (unique rule_id+starts_at).
-- ---------------------------------------------------------------------------
create or replace function materialize_slots(p_weeks int default 8)
returns void language plpgsql security definer set search_path = public as $$
declare
  r recurring_rules%rowtype;
  d date;
  today date := (now() at time zone 'Europe/Copenhagen')::date;
  horizon date := (now() at time zone 'Europe/Copenhagen')::date + (p_weeks * 7);
  v_start timestamptz;
begin
  for r in select * from recurring_rules where active loop
    d := today;
    while d <= horizon loop
      if extract(dow from d)::int = r.weekday then
        -- interpret local wall-clock date+time in Copenhagen -> absolute time
        v_start := ((d::text || ' ' || r.start_time::text)::timestamp) at time zone 'Europe/Copenhagen';
        if v_start > now() then
          insert into slots (rule_id, starts_at, duration_min, capacity)
          values (r.id, v_start, r.duration_min, r.capacity)
          on conflict (rule_id, starts_at) do nothing;
        end if;
      end if;
      d := d + 1;
    end loop;
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- book_slot: atomically reserve one seat if capacity remains, then record the
-- booking. The conditional UPDATE ... booked < capacity is race-safe.
-- ---------------------------------------------------------------------------
create or replace function book_slot(
  p_slot_id uuid, p_name text, p_email text, p_phone text
) returns table (booking_id uuid, cancel_token uuid, starts_at timestamptz)
language plpgsql security definer set search_path = public as $$
#variable_conflict use_column
declare
  v_slot    slots%rowtype;
  v_booking bookings%rowtype;
begin
  update slots
     set booked = booked + 1
   where id = p_slot_id
     and status = 'open'
     and slots.starts_at > now()
     and booked < capacity
  returning * into v_slot;

  if not found then
    raise exception 'slot_unavailable' using errcode = 'P0001';
  end if;

  insert into bookings (slot_id, name, email, phone)
  values (p_slot_id, p_name, p_email, p_phone)
  returning * into v_booking;

  return query select v_booking.id, v_booking.cancel_token, v_slot.starts_at;
end;
$$;

-- ---------------------------------------------------------------------------
-- cancel_booking: enforce the 24h rule server-side. Frees the seat.
-- ---------------------------------------------------------------------------
create or replace function cancel_booking(p_token uuid)
returns table (starts_at timestamptz, name text)
language plpgsql security definer set search_path = public as $$
declare
  v_booking bookings%rowtype;
  v_slot    slots%rowtype;
begin
  select * into v_booking from bookings where cancel_token = p_token;
  if not found then
    raise exception 'not_found' using errcode = 'P0002';
  end if;
  if v_booking.status = 'cancelled' then
    raise exception 'already_cancelled' using errcode = 'P0003';
  end if;

  select * into v_slot from slots where id = v_booking.slot_id;

  if v_slot.starts_at - interval '24 hours' <= now() then
    raise exception 'too_late' using errcode = 'P0004';
  end if;

  update bookings set status = 'cancelled', cancelled_at = now() where id = v_booking.id;
  update slots    set booked = greatest(booked - 1, 0)          where id = v_slot.id;

  return query select v_slot.starts_at, v_booking.name;
end;
$$;

-- Seed one example rule so there is something to see (Tuesday 17:00, 4 seats).
-- Delete or edit in the table editor.
insert into recurring_rules (title, weekday, start_time, duration_min, capacity)
select 'Semi-private session 1:4', 2, '17:00', 60, 4
where not exists (select 1 from recurring_rules);
