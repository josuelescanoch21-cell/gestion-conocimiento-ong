-- Politicas simples para proyecto universitario SIN backend.
-- Permiten que el frontend use la Publishable Key de Supabase directamente.
-- NO usar esta configuracion en produccion real con datos sensibles.

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
alter table user_profiles enable row level security;
alter table user_documents enable row level security;

-- Lectura publica para catalogos, usuarios demo y contenido.
drop policy if exists "frontend read roles" on roles;
create policy "frontend read roles" on roles for select to anon using (true);

drop policy if exists "frontend read organizations" on organizations;
create policy "frontend read organizations" on organizations for select to anon using (true);

drop policy if exists "frontend read users" on users;
create policy "frontend read users" on users for select to anon using (true);

drop policy if exists "frontend update users" on users;
create policy "frontend update users" on users for update to anon using (true) with check (true);

drop policy if exists "frontend read categories" on categories;
create policy "frontend read categories" on categories for select to anon using (true);

drop policy if exists "frontend write categories" on categories;
create policy "frontend write categories" on categories for all to anon using (true) with check (true);

drop policy if exists "frontend read subcategories" on subcategories;
create policy "frontend read subcategories" on subcategories for select to anon using (true);

drop policy if exists "frontend write subcategories" on subcategories;
create policy "frontend write subcategories" on subcategories for all to anon using (true) with check (true);

drop policy if exists "frontend read knowledge" on knowledge_items;
create policy "frontend read knowledge" on knowledge_items for select to anon using (true);

drop policy if exists "frontend write knowledge" on knowledge_items;
create policy "frontend write knowledge" on knowledge_items for all to anon using (true) with check (true);

drop policy if exists "frontend read opportunities" on volunteer_opportunities;
create policy "frontend read opportunities" on volunteer_opportunities for select to anon using (true);

drop policy if exists "frontend write opportunities" on volunteer_opportunities;
create policy "frontend write opportunities" on volunteer_opportunities for all to anon using (true) with check (true);

drop policy if exists "frontend read applications" on applications;
create policy "frontend read applications" on applications for select to anon using (true);

drop policy if exists "frontend write applications" on applications;
create policy "frontend write applications" on applications for all to anon using (true) with check (true);

drop policy if exists "frontend read favorites" on favorites;
create policy "frontend read favorites" on favorites for select to anon using (true);

drop policy if exists "frontend write favorites" on favorites;
create policy "frontend write favorites" on favorites for all to anon using (true) with check (true);

drop policy if exists "frontend read user_documents" on user_documents;
create policy "frontend read user_documents" on user_documents for select to anon using (true);

drop policy if exists "frontend write user_documents" on user_documents;
create policy "frontend write user_documents" on user_documents for all to anon using (true) with check (true);

drop policy if exists "frontend read analytics" on analytics_events;
create policy "frontend read analytics" on analytics_events for select to anon using (true);

drop policy if exists "frontend write analytics" on analytics_events;
create policy "frontend write analytics" on analytics_events for insert to anon with check (true);

drop policy if exists "frontend read audit" on audit_logs;
create policy "frontend read audit" on audit_logs for select to anon using (true);

drop policy if exists "frontend write audit" on audit_logs;
create policy "frontend write audit" on audit_logs for insert to anon with check (true);

-- cambio para el foro: politicas abiertas para el modo demo (sin backend), igual al resto de
-- tablas de este archivo. Como el proyecto no usa una sesion real de Supabase Auth (el rol
-- viene de localStorage, ver public/js/auth.js), aca solo se habilita el acceso con la
-- Publishable Key. Las reglas por rol (quien crea temas, quien modera, etc.) se validan
-- en public/js/forum.js y en la funcion api() de public/js/app.js.
alter table forum_topics enable row level security;
alter table forum_replies enable row level security;

drop policy if exists "frontend read forum_topics" on forum_topics;
create policy "frontend read forum_topics" on forum_topics for select to anon using (true);

drop policy if exists "frontend write forum_topics" on forum_topics;
create policy "frontend write forum_topics" on forum_topics for all to anon using (true) with check (true);

drop policy if exists "frontend read forum_replies" on forum_replies;
create policy "frontend read forum_replies" on forum_replies for select to anon using (true);

drop policy if exists "frontend write forum_replies" on forum_replies;
create policy "frontend write forum_replies" on forum_replies for all to anon using (true) with check (true);

-- cambio para el foro (rediseno): politicas abiertas de modo demo para reacciones.
alter table forum_reactions enable row level security;

drop policy if exists "frontend read forum_reactions" on forum_reactions;
create policy "frontend read forum_reactions" on forum_reactions for select to anon using (true);

drop policy if exists "frontend write forum_reactions" on forum_reactions;
create policy "frontend write forum_reactions" on forum_reactions for all to anon using (true) with check (true);
