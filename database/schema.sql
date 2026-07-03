create extension if not exists "pgcrypto";

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  name text unique not null check (name in ('administrador', 'creador_ong', 'voluntario')),
  description text,
  created_at timestamptz not null default now()
);

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  country text,
  contact_email text,
  created_at timestamptz not null default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  role_id uuid not null references roles(id),
  organization_id uuid references organizations(id) on delete set null,
  full_name text not null,
  email text unique not null,
  status text not null default 'activo' check (status in ('activo', 'inactivo')),
  last_login_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  description text,
  icon text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists subcategories (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete cascade,
  name text not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (category_id, name)
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists knowledge_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  content text not null,
  category_id uuid not null references categories(id),
  subcategory_id uuid references subcategories(id),
  organization_id uuid references organizations(id),
  created_by uuid references users(id),
  author_name text not null,
  image_url text,
  legal_reference text,
  source_url text,
  document_type text not null default 'articulo' check (document_type in ('articulo', 'guia', 'reporte', 'plantilla', 'politica', 'documento', 'ley')),
  status text not null default 'borrador' check (status in ('borrador', 'revision', 'publicado', 'archivado')),
  visibility text not null default 'publico' check (visibility in ('publico', 'interno', 'restringido')),
  visible_to_roles text[] not null default array['administrador','creador_ong','voluntario'],
  view_count int not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  search_vector tsvector generated always as (
    setweight(to_tsvector('spanish', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('spanish', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('spanish', coalesce(content, '')), 'C') ||
    setweight(to_tsvector('spanish', coalesce(author_name, '')), 'D')
  ) stored
);

create table if not exists item_tags (
  item_id uuid not null references knowledge_items(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  primary key (item_id, tag_id)
);

create table if not exists volunteer_opportunities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  created_by uuid references users(id),
  title text not null,
  description text not null,
  location text,
  modality text not null default 'hibrida' check (modality in ('presencial', 'remota', 'hibrida')),
  required_skills text[] not null default array[]::text[],
  status text not null default 'abierta' check (status in ('abierta', 'cerrada', 'pausada')),
  starts_at date,
  ends_at date,
  created_at timestamptz not null default now()
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references volunteer_opportunities(id) on delete cascade,
  volunteer_id uuid not null references users(id) on delete cascade,
  applicant_name text,
  applicant_email text,
  phone text,
  document_number text,
  age int,
  availability text,
  experience text,
  skills text[] not null default array[]::text[],
  consent_data boolean not null default false,
  motivation text,
  status text not null default 'recibida' check (status in ('recibida', 'preseleccionada', 'aceptada', 'rechazada')),
  created_at timestamptz not null default now(),
  unique (opportunity_id, volunteer_id)
);

create table if not exists favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  item_id uuid not null references knowledge_items(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, item_id)
);

create table if not exists search_logs (
  id uuid primary key default gen_random_uuid(),
  query text not null,
  filters jsonb not null default '{}'::jsonb,
  user_id uuid references users(id) on delete set null,
  role_name text,
  results_count int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists version_history (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references knowledge_items(id) on delete cascade,
  previous_version jsonb not null,
  new_version jsonb not null,
  edited_by uuid references users(id) on delete set null,
  change_type text not null,
  created_at timestamptz not null default now()
);

create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  event_type text not null,
  entity_type text,
  entity_id uuid,
  role_name text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_knowledge_search on knowledge_items using gin(search_vector);
create index if not exists idx_knowledge_category on knowledge_items(category_id);
create index if not exists idx_knowledge_org on knowledge_items(organization_id);
create index if not exists idx_search_logs_query on search_logs(query);
create index if not exists idx_audit_logs_action on audit_logs(action);
create index if not exists idx_analytics_events_type on analytics_events(event_type);
create unique index if not exists uq_opportunity_org_title on volunteer_opportunities(organization_id, lower(title));

alter table if exists knowledge_items add column if not exists image_url text;
alter table if exists knowledge_items add column if not exists legal_reference text;
alter table if exists knowledge_items add column if not exists source_url text;
alter table if exists applications add column if not exists applicant_name text;
alter table if exists applications add column if not exists applicant_email text;
alter table if exists applications add column if not exists phone text;
alter table if exists applications add column if not exists document_number text;
alter table if exists applications add column if not exists age int;
alter table if exists applications add column if not exists availability text;
alter table if exists applications add column if not exists experience text;
alter table if exists applications add column if not exists skills text[] not null default array[]::text[];
alter table if exists applications add column if not exists consent_data boolean not null default false;

create or replace function app_user_id()
returns uuid
language sql
stable
as $$
  select id from public.users where auth_user_id = auth.uid()
$$;

create or replace function app_user_role()
returns text
language sql
stable
as $$
  select roles.name
  from public.users
  join public.roles on roles.id = users.role_id
  where users.auth_user_id = auth.uid()
$$;

create or replace function app_user_organization()
returns uuid
language sql
stable
as $$
  select organization_id from public.users where auth_user_id = auth.uid()
$$;

alter table roles enable row level security;
alter table organizations enable row level security;
alter table users enable row level security;
alter table categories enable row level security;
alter table subcategories enable row level security;
alter table tags enable row level security;
alter table knowledge_items enable row level security;
alter table item_tags enable row level security;
alter table volunteer_opportunities enable row level security;
alter table applications enable row level security;
alter table favorites enable row level security;
alter table search_logs enable row level security;
alter table audit_logs enable row level security;
alter table version_history enable row level security;
alter table analytics_events enable row level security;

create policy "roles readable" on roles for select using (auth.role() = 'authenticated');
create policy "organizations readable" on organizations for select using (auth.role() = 'authenticated');
create policy "categories readable" on categories for select using (auth.role() = 'authenticated');
create policy "subcategories readable" on subcategories for select using (auth.role() = 'authenticated');
create policy "tags readable" on tags for select using (auth.role() = 'authenticated');

create policy "admins manage users" on users for all using (app_user_role() = 'administrador') with check (app_user_role() = 'administrador');
create policy "users read own profile" on users for select using (id = app_user_id() or app_user_role() = 'administrador');
create policy "admins manage roles" on roles for all using (app_user_role() = 'administrador') with check (app_user_role() = 'administrador');

create policy "knowledge read by role" on knowledge_items
for select using (
  app_user_role() = 'administrador'
  or (app_user_role() = 'creador_ong' and organization_id = app_user_organization())
  or visibility = 'publico'
  or app_user_role() = any(visible_to_roles)
);

create policy "knowledge insert creators" on knowledge_items
for insert with check (
  app_user_role() = 'administrador'
  or (app_user_role() = 'creador_ong' and organization_id = app_user_organization())
);

create policy "knowledge update scoped" on knowledge_items
for update using (
  app_user_role() = 'administrador'
  or (app_user_role() = 'creador_ong' and created_by = app_user_id() and organization_id = app_user_organization())
) with check (
  app_user_role() = 'administrador'
  or (app_user_role() = 'creador_ong' and created_by = app_user_id() and organization_id = app_user_organization())
);

create policy "knowledge delete scoped" on knowledge_items
for delete using (
  app_user_role() = 'administrador'
  or (app_user_role() = 'creador_ong' and created_by = app_user_id())
);

create policy "item tags readable" on item_tags for select using (auth.role() = 'authenticated');
create policy "item tags managed by editors" on item_tags for all using (app_user_role() in ('administrador', 'creador_ong')) with check (app_user_role() in ('administrador', 'creador_ong'));

create policy "opportunities readable" on volunteer_opportunities for select using (
  status = 'abierta'
  or app_user_role() = 'administrador'
  or (app_user_role() = 'creador_ong' and organization_id = app_user_organization())
);
create policy "opportunities managed" on volunteer_opportunities for all using (
  app_user_role() = 'administrador'
  or (app_user_role() = 'creador_ong' and organization_id = app_user_organization())
) with check (
  app_user_role() = 'administrador'
  or (app_user_role() = 'creador_ong' and organization_id = app_user_organization())
);

create policy "applications scoped" on applications for select using (
  app_user_role() = 'administrador'
  or volunteer_id = app_user_id()
  or exists (
    select 1 from volunteer_opportunities vo
    where vo.id = applications.opportunity_id
    and vo.organization_id = app_user_organization()
    and app_user_role() = 'creador_ong'
  )
);
create policy "volunteers apply" on applications for insert with check (app_user_role() = 'voluntario' and volunteer_id = app_user_id());

create policy "favorites own" on favorites for all using (user_id = app_user_id()) with check (user_id = app_user_id());
create policy "search logs insert" on search_logs for insert with check (auth.role() = 'authenticated');
create policy "search logs admin read" on search_logs for select using (app_user_role() = 'administrador');
create policy "audit admin read" on audit_logs for select using (app_user_role() = 'administrador');
create policy "audit insert authenticated" on audit_logs for insert with check (auth.role() = 'authenticated');
create policy "versions admin read" on version_history for select using (app_user_role() = 'administrador');
create policy "versions insert editors" on version_history for insert with check (app_user_role() in ('administrador', 'creador_ong'));
create policy "analytics admin read" on analytics_events for select using (app_user_role() = 'administrador');
create policy "analytics insert authenticated" on analytics_events for insert with check (auth.role() = 'authenticated');

-- Iteracion frontend/backend final: campos visibles para oportunidades y postulantes
alter table if exists volunteer_opportunities add column if not exists image_url text;
alter table if exists volunteer_opportunities add column if not exists slots int;
alter table if exists volunteer_opportunities add column if not exists schedule text;
alter table if exists volunteer_opportunities add column if not exists duration text;
alter table if exists volunteer_opportunities add column if not exists updated_at timestamptz not null default now();

drop policy if exists "applications status managed" on applications;
create policy "applications status managed" on applications
for update using (
  app_user_role() = 'administrador'
  or exists (
    select 1 from volunteer_opportunities vo
    where vo.id = applications.opportunity_id
    and vo.organization_id = app_user_organization()
    and app_user_role() = 'creador_ong'
  )
) with check (
  app_user_role() = 'administrador'
  or exists (
    select 1 from volunteer_opportunities vo
    where vo.id = applications.opportunity_id
    and vo.organization_id = app_user_organization()
    and app_user_role() = 'creador_ong'
  )
);

-- Iteracion 3: taxonomia editable y analitica por creador ONG
alter table if exists categories add column if not exists updated_at timestamptz not null default now();
alter table if exists subcategories add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_applications_status on applications(status);
create index if not exists idx_favorites_item on favorites(item_id);
create index if not exists idx_opportunities_org on volunteer_opportunities(organization_id);
create index if not exists idx_analytics_created_at on analytics_events(created_at desc);

-- En proyectos con Supabase service role el backend puede operar aunque RLS este activo.
-- Estas politicas permiten gestion directa desde cliente autenticado si se decide usar Supabase client en frontend.
drop policy if exists "taxonomy editors insert categories" on categories;
create policy "taxonomy editors insert categories" on categories
for insert with check (app_user_role() in ('administrador','creador_ong'));

drop policy if exists "taxonomy editors update categories" on categories;
create policy "taxonomy editors update categories" on categories
for update using (app_user_role() in ('administrador','creador_ong')) with check (app_user_role() in ('administrador','creador_ong'));

drop policy if exists "taxonomy admin delete categories" on categories;
create policy "taxonomy admin delete categories" on categories
for delete using (app_user_role() = 'administrador');

drop policy if exists "taxonomy editors insert subcategories" on subcategories;
create policy "taxonomy editors insert subcategories" on subcategories
for insert with check (app_user_role() in ('administrador','creador_ong'));

drop policy if exists "taxonomy editors update subcategories" on subcategories;
create policy "taxonomy editors update subcategories" on subcategories
for update using (app_user_role() in ('administrador','creador_ong')) with check (app_user_role() in ('administrador','creador_ong'));

drop policy if exists "taxonomy admin delete subcategories" on subcategories;
create policy "taxonomy admin delete subcategories" on subcategories
for delete using (app_user_role() = 'administrador');

-- Vista util para dashboards rapidos por oportunidad.
create or replace view opportunity_application_metrics as
select
  vo.id as opportunity_id,
  vo.title,
  vo.organization_id,
  count(a.id) as total_applications,
  count(a.id) filter (where a.status = 'recibida') as recibidas,
  count(a.id) filter (where a.status = 'preseleccionada') as preseleccionadas,
  count(a.id) filter (where a.status = 'aceptada') as aceptadas,
  count(a.id) filter (where a.status = 'rechazada') as rechazadas
from volunteer_opportunities vo
left join applications a on a.opportunity_id = vo.id
group by vo.id, vo.title, vo.organization_id;

-- Iteracion 4: perfiles, documentos y flujo ampliado de postulaciones
create table if not exists user_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  phone text,
  bio text,
  skills text[] not null default array[]::text[],
  photo_url text,
  organization_position text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists user_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  organization_id uuid references organizations(id) on delete set null,
  title text not null,
  document_type text not null default 'cv' check (document_type in ('cv','certificado','portafolio','identidad','permiso','otro')),
  file_url text not null,
  notes text,
  visibility text not null default 'privado' check (visibility in ('privado','ong','admin')),
  status text not null default 'pendiente' check (status in ('pendiente','validado','observado','archivado')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists applications drop constraint if exists applications_status_check;
alter table if exists applications add constraint applications_status_check check (status in ('recibida','revision','entrevista','preseleccionada','aceptada','rechazada','finalizada'));
alter table if exists applications add column if not exists status_notes text;
alter table if exists applications add column if not exists updated_at timestamptz not null default now();

alter table user_profiles enable row level security;
alter table user_documents enable row level security;

drop policy if exists "profiles scoped" on user_profiles;
create policy "profiles scoped" on user_profiles for all
using (user_id = app_user_id() or app_user_role() = 'administrador')
with check (user_id = app_user_id() or app_user_role() = 'administrador');

drop policy if exists "documents scoped" on user_documents;
create policy "documents scoped" on user_documents for select using (
  user_id = app_user_id()
  or app_user_role() = 'administrador'
  or (app_user_role() = 'creador_ong' and organization_id = app_user_organization())
);

drop policy if exists "documents insert own" on user_documents;
create policy "documents insert own" on user_documents for insert with check (user_id = app_user_id());

drop policy if exists "documents update scoped" on user_documents;
create policy "documents update scoped" on user_documents for update using (
  user_id = app_user_id()
  or app_user_role() = 'administrador'
  or (app_user_role() = 'creador_ong' and organization_id = app_user_organization())
) with check (
  user_id = app_user_id()
  or app_user_role() = 'administrador'
  or (app_user_role() = 'creador_ong' and organization_id = app_user_organization())
);

create index if not exists idx_user_documents_user on user_documents(user_id);
create index if not exists idx_user_documents_org on user_documents(organization_id);
create index if not exists idx_applications_updated on applications(updated_at);

-- Iteracion 5: seguridad, mantenimiento y rendimiento
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_knowledge_updated_at on knowledge_items;
create trigger trg_knowledge_updated_at
before update on knowledge_items
for each row execute function set_updated_at();

drop trigger if exists trg_opportunities_updated_at on volunteer_opportunities;
create trigger trg_opportunities_updated_at
before update on volunteer_opportunities
for each row execute function set_updated_at();

drop trigger if exists trg_categories_updated_at on categories;
create trigger trg_categories_updated_at
before update on categories
for each row execute function set_updated_at();

drop trigger if exists trg_subcategories_updated_at on subcategories;
create trigger trg_subcategories_updated_at
before update on subcategories
for each row execute function set_updated_at();

drop trigger if exists trg_profiles_updated_at on user_profiles;
create trigger trg_profiles_updated_at
before update on user_profiles
for each row execute function set_updated_at();

drop trigger if exists trg_documents_updated_at on user_documents;
create trigger trg_documents_updated_at
before update on user_documents
for each row execute function set_updated_at();

drop trigger if exists trg_applications_updated_at on applications;
create trigger trg_applications_updated_at
before update on applications
for each row execute function set_updated_at();

create index if not exists idx_knowledge_status_updated on knowledge_items(status, updated_at desc);
create index if not exists idx_knowledge_visibility on knowledge_items(visibility);
create index if not exists idx_opportunities_status_created on volunteer_opportunities(status, created_at desc);
create index if not exists idx_users_role_status on users(role_id, status);
create index if not exists idx_audit_created_at on audit_logs(created_at desc);
create index if not exists idx_search_created_at on search_logs(created_at desc);
create index if not exists idx_favorites_user_created on favorites(user_id, created_at desc);

alter table if exists applications add constraint applications_age_range check (age is null or (age between 13 and 100));
alter table if exists volunteer_opportunities add constraint opportunities_slots_positive check (slots is null or slots > 0);

-- Politicas mas completas para analitica y auditoria desde frontend autenticado si se usa Supabase directo.
drop policy if exists "analytics creator read scoped" on analytics_events;
create policy "analytics creator read scoped" on analytics_events for select using (
  app_user_role() = 'administrador'
  or (app_user_role() = 'creador_ong' and (metadata->>'organization_id')::uuid = app_user_organization())
);

drop policy if exists "audit creator read scoped" on audit_logs;
create policy "audit creator read scoped" on audit_logs for select using (
  app_user_role() = 'administrador'
  or (app_user_role() = 'creador_ong' and (metadata->>'organization_id')::uuid = app_user_organization())
);

-- Vista de resumen para README/dashboard.
create or replace view public.dashboard_summary as
select
  (select count(*) from knowledge_items) as total_articulos,
  (select count(*) from knowledge_items where status = 'publicado') as articulos_publicados,
  (select count(*) from volunteer_opportunities) as total_oportunidades,
  (select count(*) from applications) as total_postulaciones,
  (select count(*) from favorites) as total_favoritos,
  (select count(*) from users where status = 'activo') as usuarios_activos;


-- Iteracion 6: tipo ley/normativa para seccion legal ONG.
do $$
begin
  if exists (
    select 1 from pg_constraint
    where conname = 'knowledge_items_document_type_check'
  ) then
    alter table knowledge_items drop constraint knowledge_items_document_type_check;
  end if;
  alter table knowledge_items add constraint knowledge_items_document_type_check
    check (document_type in ('articulo', 'guia', 'reporte', 'plantilla', 'politica', 'documento', 'ley'));
end $$;
