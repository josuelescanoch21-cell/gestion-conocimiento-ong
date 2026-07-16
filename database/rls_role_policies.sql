-- Politicas RLS basadas en rol para el proyecto universitario.
-- Reemplaza los "using (true)" de database/frontend_policies.sql por reglas que leen el rol
-- (y el id) del usuario actual desde los headers HTTP que ahora si envia el frontend
-- (ver el cambio en public/js/app.js: supabaseClient() adjunta sessionHeaders()).
--
-- COMO FUNCIONA: PostgREST reenvia los headers de cada peticion a Postgres. Esta funcion los
-- lee de forma segura (si no hay headers, no revienta, simplemente no coincide con ningun rol).
--
-- LIMITE HONESTO: esto NO es un JWT firmado por Supabase Auth. La app usa un login demo por
-- localStorage (public/js/auth.js), asi que estos headers no estan criptograficamente
-- garantizados: alguien con la anon key podria en teoria armar su propia peticion HTTP con un
-- header falso. Lo que SI logra es que el uso normal de la aplicacion respete los roles a
-- nivel de base de datos (y no solo ocultando botones en el frontend, como pasaba antes).
-- Para una garantia criptografica real haria falta Supabase Auth con JWT (fuera de alcance
-- por decision explicita del equipo, para mantener el login simple).
--
-- COMO APLICAR: pega este archivo completo en el SQL Editor de tu proyecto de Supabase y
-- ejecutalo. Es idempotente (usa "drop policy if exists"), lo puedes correr mas de una vez.
-- Recomendado: pruebalo primero en un proyecto de desarrollo/staging antes de produccion.

create or replace function kms_current_role()
returns text
language sql
stable
as $$
  select coalesce(current_setting('request.headers', true)::json ->> 'x-demo-role', '');
$$;

create or replace function kms_current_user_id()
returns text
language sql
stable
as $$
  select coalesce(current_setting('request.headers', true)::json ->> 'x-demo-user-id', '');
$$;

create or replace function kms_current_organization_id()
returns text
language sql
stable
as $$
  select coalesce(current_setting('request.headers', true)::json ->> 'x-demo-organization-id', '');
$$;

-- ==========================================================================
-- roles: lectura abierta (necesaria para el login demo), escritura solo admin
-- ==========================================================================
drop policy if exists "frontend read roles" on roles;
create policy "frontend read roles" on roles for select to anon using (true);

-- ==========================================================================
-- organizations: lectura abierta, sin escritura desde el frontend
-- ==========================================================================
drop policy if exists "frontend read organizations" on organizations;
create policy "frontend read organizations" on organizations for select to anon using (true);

-- ==========================================================================
-- users: lectura abierta (login busca por email), escritura solo de tu propio
-- perfil o por un administrador
-- ==========================================================================
drop policy if exists "frontend read users" on users;
create policy "frontend read users" on users for select to anon using (true);

drop policy if exists "frontend update users" on users;
create policy "frontend update users" on users for update to anon
  using (kms_current_role() = 'administrador' or id::text = kms_current_user_id())
  with check (kms_current_role() = 'administrador' or id::text = kms_current_user_id());

-- cambio: el cambio de rol (role_id) de otro usuario solo lo puede hacer un administrador,
-- ya cubierto por la condicion de arriba (si no eres administrador, solo puedes tocar tu
-- propia fila, y el frontend no ofrece cambiar tu propio rol).

-- ==========================================================================
-- categories / subcategories: lectura abierta, escritura solo administrador y creador_ong
-- (coincide con el boton "Gestionar taxonomia", visible solo para esos roles)
-- ==========================================================================
drop policy if exists "frontend read categories" on categories;
create policy "frontend read categories" on categories for select to anon using (true);

drop policy if exists "frontend write categories" on categories;
create policy "frontend write categories" on categories for all to anon
  using (kms_current_role() in ('administrador','creador_ong'))
  with check (kms_current_role() in ('administrador','creador_ong'));

drop policy if exists "frontend read subcategories" on subcategories;
create policy "frontend read subcategories" on subcategories for select to anon using (true);

drop policy if exists "frontend write subcategories" on subcategories;
create policy "frontend write subcategories" on subcategories for all to anon
  using (kms_current_role() in ('administrador','creador_ong'))
  with check (kms_current_role() in ('administrador','creador_ong'));

-- ==========================================================================
-- knowledge_items: lectura abierta (el frontend ya filtra visibilidad por rol),
-- escritura (crear/editar/eliminar) solo administrador y creador_ong
-- ==========================================================================
drop policy if exists "frontend read knowledge" on knowledge_items;
create policy "frontend read knowledge" on knowledge_items for select to anon using (true);

drop policy if exists "frontend write knowledge" on knowledge_items;
create policy "frontend write knowledge" on knowledge_items for all to anon
  using (kms_current_role() in ('administrador','creador_ong'))
  with check (kms_current_role() in ('administrador','creador_ong'));

-- ==========================================================================
-- volunteer_opportunities: lectura abierta, escritura solo administrador y creador_ong
-- (coincide con "Publicar voluntariado", visible solo para esos roles)
-- ==========================================================================
drop policy if exists "frontend read opportunities" on volunteer_opportunities;
create policy "frontend read opportunities" on volunteer_opportunities for select to anon using (true);

drop policy if exists "frontend write opportunities" on volunteer_opportunities;
create policy "frontend write opportunities" on volunteer_opportunities for all to anon
  using (kms_current_role() in ('administrador','creador_ong'))
  with check (kms_current_role() in ('administrador','creador_ong'));

-- ==========================================================================
-- applications: lectura abierta (ya filtrada por consulta en el frontend),
-- crear solo voluntario (postular a su propio nombre), cambiar estado solo
-- administrador/creador_ong (revisar postulantes)
-- ==========================================================================
drop policy if exists "frontend read applications" on applications;
create policy "frontend read applications" on applications for select to anon using (true);

drop policy if exists "frontend write applications" on applications;
drop policy if exists "frontend insert applications" on applications;
create policy "frontend insert applications" on applications for insert to anon
  with check (kms_current_role() = 'voluntario' and volunteer_id::text = kms_current_user_id());

drop policy if exists "frontend update applications" on applications;
create policy "frontend update applications" on applications for update to anon
  using (kms_current_role() in ('administrador','creador_ong'))
  with check (kms_current_role() in ('administrador','creador_ong'));

-- ==========================================================================
-- favorites: cada quien solo puede crear/borrar sus propios favoritos
-- ==========================================================================
drop policy if exists "frontend read favorites" on favorites;
create policy "frontend read favorites" on favorites for select to anon using (true);

drop policy if exists "frontend write favorites" on favorites;
create policy "frontend write favorites" on favorites for all to anon
  using (user_id::text = kms_current_user_id())
  with check (user_id::text = kms_current_user_id());

-- ==========================================================================
-- user_documents: crear solo para uno mismo; cambiar estado (validar/observar)
-- solo administrador/creador_ong (coincide con la UI: "voluntario" no ve esos botones)
-- ==========================================================================
drop policy if exists "frontend read user_documents" on user_documents;
create policy "frontend read user_documents" on user_documents for select to anon using (true);

drop policy if exists "frontend write user_documents" on user_documents;
drop policy if exists "frontend insert user_documents" on user_documents;
create policy "frontend insert user_documents" on user_documents for insert to anon
  with check (user_id::text = kms_current_user_id());

drop policy if exists "frontend update user_documents" on user_documents;
create policy "frontend update user_documents" on user_documents for update to anon
  using (kms_current_role() in ('administrador','creador_ong'))
  with check (kms_current_role() in ('administrador','creador_ong'));

-- ==========================================================================
-- analytics_events: cualquiera puede insertar (tracking), pero solo
-- administrador/creador_ong pueden leer el panel de Reviews/Analytics
-- (coincide con navByRole: voluntario no tiene "analytics" en el menu)
-- ==========================================================================
drop policy if exists "frontend read analytics" on analytics_events;
create policy "frontend read analytics" on analytics_events for select to anon
  using (kms_current_role() in ('administrador','creador_ong'));

drop policy if exists "frontend write analytics" on analytics_events;
create policy "frontend write analytics" on analytics_events for insert to anon with check (true);

-- ==========================================================================
-- audit_logs: solo administrador puede leer (pagina de administracion);
-- se sigue permitiendo insertar (triggers/registro de acciones)
-- ==========================================================================
drop policy if exists "frontend read audit" on audit_logs;
create policy "frontend read audit" on audit_logs for select to anon
  using (kms_current_role() = 'administrador');

drop policy if exists "frontend write audit" on audit_logs;
create policy "frontend write audit" on audit_logs for insert to anon with check (true);

-- ==========================================================================
-- forum_topics: lectura abierta; crear solo creador_ong/voluntario (igual que
-- en public/js/app.js); moderar (fijar/cerrar/eliminar via UPDATE) solo administrador
-- ==========================================================================
drop policy if exists "frontend write forum_topics" on forum_topics;

drop policy if exists "frontend read forum_topics" on forum_topics;
create policy "frontend read forum_topics" on forum_topics for select to anon using (true);

drop policy if exists "frontend insert forum_topics" on forum_topics;
create policy "frontend insert forum_topics" on forum_topics for insert to anon
  with check (kms_current_role() in ('creador_ong','voluntario'));

drop policy if exists "frontend update forum_topics" on forum_topics;
create policy "frontend update forum_topics" on forum_topics for update to anon
  using (kms_current_role() = 'administrador')
  with check (kms_current_role() = 'administrador');

-- ==========================================================================
-- forum_replies: lectura abierta; crear solo creador_ong/voluntario; eliminar
-- (soft-delete via UPDATE is_removed) solo administrador
-- ==========================================================================
drop policy if exists "frontend write forum_replies" on forum_replies;

drop policy if exists "frontend read forum_replies" on forum_replies;
create policy "frontend read forum_replies" on forum_replies for select to anon using (true);

drop policy if exists "frontend insert forum_replies" on forum_replies;
create policy "frontend insert forum_replies" on forum_replies for insert to anon
  with check (kms_current_role() in ('creador_ong','voluntario'));

drop policy if exists "frontend update forum_replies" on forum_replies;
create policy "frontend update forum_replies" on forum_replies for update to anon
  using (kms_current_role() = 'administrador')
  with check (kms_current_role() = 'administrador');

-- ==========================================================================
-- forum_reactions: lectura abierta; solo creador_ong/voluntario reaccionan, y
-- solo pueden crear/borrar su propia reaccion (coincide con el toggle "Util")
-- ==========================================================================
drop policy if exists "frontend write forum_reactions" on forum_reactions;

drop policy if exists "frontend read forum_reactions" on forum_reactions;
create policy "frontend read forum_reactions" on forum_reactions for select to anon using (true);

drop policy if exists "frontend insert forum_reactions" on forum_reactions;
create policy "frontend insert forum_reactions" on forum_reactions for insert to anon
  with check (kms_current_role() in ('creador_ong','voluntario') and user_id::text = kms_current_user_id());

drop policy if exists "frontend delete forum_reactions" on forum_reactions;
create policy "frontend delete forum_reactions" on forum_reactions for delete to anon
  using (user_id::text = kms_current_user_id());
