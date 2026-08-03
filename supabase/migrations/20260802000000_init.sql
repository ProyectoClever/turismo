-- TurismoGo schema for Supabase
-- Run this in the Supabase SQL Editor

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Destinations
create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text not null,
  description text,
  image_url text,
  created_at timestamptz not null default now()
);

alter table public.destinations enable row level security;

create policy "Destinations are public"
  on public.destinations for select
  using (true);

-- Tours
create table if not exists public.tours (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid references public.destinations (id) on delete set null,
  title text not null,
  description text,
  price numeric(10, 2) not null default 0,
  duration_days int not null default 1,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.tours enable row level security;

create policy "Active tours are public"
  on public.tours for select
  using (is_active = true);

-- Bookings / Reservations
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  tour_id uuid not null references public.tours (id) on delete restrict,
  booking_date date not null,
  guests int not null default 1 check (guests > 0),
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled')),
  total_price numeric(10, 2) not null default 0,
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

create policy "Users can view own bookings"
  on public.bookings for select
  using (auth.uid() = user_id);

create policy "Users can create own bookings"
  on public.bookings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own bookings"
  on public.bookings for update
  using (auth.uid() = user_id);

-- Sample data
insert into public.destinations (name, country, description, image_url) values
  ('Cartagena', 'Colombia', 'Ciudad amurallada y playas del Caribe.', null),
  ('Machu Picchu', 'Perú', 'Ciudadela inca en los Andes.', null),
  ('Cancún', 'México', 'Playas turquesa y vida nocturna.', null)
on conflict do nothing;

insert into public.tours (destination_id, title, description, price, duration_days)
select d.id, t.title, t.description, t.price, t.duration_days
from (
  values
    ('Cartagena', 'Tour Ciudad Amurallada', 'Recorre el centro histórico y las murallas.', 89.00, 1),
    ('Machu Picchu', 'Trekking Camino Inca', 'Expedición de 4 días al santuario.', 450.00, 4),
    ('Cancún', 'Snorkel en Isla Mujeres', 'Día completo en el Caribe mexicano.', 120.00, 1)
) as t(dest_name, title, description, price, duration_days)
join public.destinations d on d.name = t.dest_name
where not exists (select 1 from public.tours limit 1);
