-- ============================================================
-- MIGRACION: LOGIN Y REGISTRO REAL CON SUPABASE AUTH
-- Ejecutar una sola vez en Supabase > SQL Editor.
-- ============================================================

-- Datos adicionales solicitados para el formulario de registro.
alter table public.users add column if not exists first_name text;
alter table public.users add column if not exists last_name text;
alter table public.users add column if not exists dni text;
alter table public.users add column if not exists birth_date date;
alter table public.users add column if not exists ong_affiliation text;
alter table public.users add column if not exists phone text;

-- El DNI debe ser único cuando tenga valor.
create unique index if not exists users_dni_unique
on public.users (dni)
where dni is not null;

-- Asegura que exista el rol predeterminado de nuevos usuarios.
insert into public.roles (name, description)
values ('voluntario', 'Usuario voluntario de la plataforma')
on conflict (name) do nothing;

-- Crea automáticamente el registro de public.users después de auth.signUp().
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  volunteer_role_id uuid;
begin
  select id into volunteer_role_id
  from public.roles
  where name = 'voluntario'
  limit 1;

  insert into public.users (
    auth_user_id,
    role_id,
    full_name,
    first_name,
    last_name,
    dni,
    birth_date,
    phone,
    ong_affiliation,
    email,
    status
  )
  values (
    new.id,
    volunteer_role_id,
    coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(new.email, '@', 1)),
    nullif(new.raw_user_meta_data ->> 'first_name', ''),
    nullif(new.raw_user_meta_data ->> 'last_name', ''),
    nullif(new.raw_user_meta_data ->> 'dni', ''),
    nullif(new.raw_user_meta_data ->> 'birth_date', '')::date,
    nullif(new.raw_user_meta_data ->> 'phone', ''),
    nullif(new.raw_user_meta_data ->> 'ong_affiliation', ''),
    lower(new.email),
    'activo'
  )
  on conflict (email) do update set
    auth_user_id = excluded.auth_user_id,
    full_name = excluded.full_name,
    first_name = excluded.first_name,
    last_name = excluded.last_name,
    dni = excluded.dni,
    birth_date = excluded.birth_date,
    phone = excluded.phone,
    ong_affiliation = excluded.ong_affiliation,
    role_id = volunteer_role_id,
    status = 'activo';

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_auth_user();

-- La lectura ya existe en frontend_policies.sql; se replica de forma segura.
alter table public.users enable row level security;

drop policy if exists "frontend read users" on public.users;
create policy "frontend read users"
on public.users for select
to anon, authenticated
using (true);

-- El trigger usa SECURITY DEFINER, por lo que no se requiere permitir INSERT anónimo.
drop policy if exists "authenticated update own user" on public.users;
create policy "authenticated update own user"
on public.users for update
to authenticated
using (auth.uid() = auth_user_id)
with check (auth.uid() = auth_user_id);
