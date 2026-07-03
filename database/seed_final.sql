insert into roles (name, description) values
('administrador', 'Acceso total, auditoria, analitica y aprobacion de contenidos.'),
('creador_ong', 'Crea y edita conocimiento de su ONG; gestiona oportunidades.'),
('voluntario', 'Busca conocimiento, guarda favoritos y postula a oportunidades.')
on conflict (name) do nothing;

insert into organizations (name, description, country, contact_email) values
('Manos Abiertas', 'ONG enfocada en voluntariado comunitario y donaciones.', 'Peru', 'contacto@manosabiertas.org'),
('Puentes de Impacto', 'ONG que gestiona proyectos sociales, capacitaciones y reportes de impacto.', 'Peru', 'equipo@puentesimpacto.org')
on conflict do nothing;

insert into categories (name, description, icon, sort_order) values
('Voluntariado', 'Procesos, induccion y buenas practicas de voluntariado.', 'users', 1),
('Donaciones', 'Gestion de donantes, trazabilidad y campanas.', 'heart', 2),
('Beneficiarios', 'Protocolos de atencion y seguimiento de beneficiarios.', 'handshake', 3),
('Proyectos sociales', 'Diseno, ejecucion y cierre de iniciativas.', 'folder-kanban', 4),
('Capacitaciones', 'Materiales de aprendizaje y sesiones internas.', 'graduation-cap', 5),
('Documentos internos', 'Politicas, plantillas y procesos administrativos.', 'briefcase', 6),
('Guias para voluntarios', 'Guias practicas para trabajo de campo y remoto.', 'book-open', 7),
('Reportes de impacto', 'Medicion, indicadores y resultados sociales.', 'bar-chart', 8)
on conflict (name) do nothing;

insert into subcategories (category_id, name, description, sort_order)
select c.id, x.name, x.description, x.sort_order
from categories c
join (values
('Voluntariado', 'Induccion', 'Primeros pasos para nuevos voluntarios.', 1),
('Voluntariado', 'Retencion', 'Practicas para sostener participacion.', 2),
('Donaciones', 'Campanas', 'Planificacion de campanas de recaudacion.', 1),
('Beneficiarios', 'Registro', 'Ficha, consentimiento y seguimiento.', 1),
('Proyectos sociales', 'Planificacion', 'Marco logico, alcance y cronograma.', 1),
('Capacitaciones', 'Talleres', 'Materiales para facilitadores.', 1),
('Documentos internos', 'Politicas', 'Normativas internas y aprobaciones.', 1),
('Guias para voluntarios', 'Campo', 'Protocolos operativos para visitas.', 1),
('Reportes de impacto', 'Indicadores', 'KPIs sociales y metodologia.', 1)
) as x(category, name, description, sort_order) on x.category = c.name
on conflict (category_id, name) do nothing;

insert into tags (name) values
('induccion'), ('impacto'), ('donantes'), ('campo'), ('proteccion'), ('aprendizaje'), ('transparencia'), ('indicadores')
on conflict (name) do nothing;

insert into users (role_id, organization_id, full_name, email, status)
select r.id, o.id, 'Ana Administradora', 'admin@ongkms.test', 'activo'
from roles r cross join organizations o
where r.name = 'administrador' and o.name = 'Manos Abiertas'
on conflict (email) do nothing;

insert into users (role_id, organization_id, full_name, email, status)
select r.id, o.id, 'Carlos Creador ONG', 'creador@ongkms.test', 'activo'
from roles r cross join organizations o
where r.name = 'creador_ong' and o.name = 'Manos Abiertas'
on conflict (email) do nothing;

insert into users (role_id, organization_id, full_name, email, status)
select r.id, o.id, 'Valeria Voluntaria', 'voluntario@ongkms.test', 'activo'
from roles r cross join organizations o
where r.name = 'voluntario' and o.name = 'Puentes de Impacto'
on conflict (email) do nothing;

insert into knowledge_items (
  title, description, content, category_id, subcategory_id, organization_id, created_by,
  author_name, image_url, legal_reference, document_type, status, visibility, visible_to_roles, published_at
)
select
  x.title, x.description, x.content, c.id, sc.id, o.id, u.id, x.author_name,
  x.image_url, x.legal_reference, x.document_type, 'publicado', x.visibility, x.visible_to_roles, now()
from (values
('Manual de induccion para voluntarios', 'Ruta de bienvenida, principios y responsabilidades del voluntariado.', 'El voluntariado debe ser libre, solidario y orientado a una necesidad real. La ONG registra induccion, funciones, riesgos, canales de comunicacion y constancia de participacion.', 'Voluntariado', 'Induccion', 'Manos Abiertas', 'Carlos Creador ONG', 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80', 'Ley General del Voluntariado del Peru, Ley 28238; uso informativo, validar con asesoria legal antes de publicar politicas internas.', 'guia', 'publico', array['administrador','creador_ong','voluntario']),
('Derechos y deberes del voluntario', 'Resumen operativo para informar derechos, deberes, trato digno y confidencialidad.', 'Todo voluntario debe recibir orientacion, informacion suficiente y condiciones seguras para participar. Tambien debe cumplir protocolos, respetar datos personales y actuar segun los fines de la organizacion.', 'Voluntariado', 'Induccion', 'Manos Abiertas', 'Carlos Creador ONG', 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80', 'Ley General del Voluntariado del Peru, Ley 28238; Ley de Proteccion de Datos Personales, Ley 29733.', 'articulo', 'publico', array['administrador','creador_ong','voluntario']),
('Protocolo de registro de beneficiarios', 'Estandar para captura de datos, consentimiento informado y seguimiento.', 'Define campos obligatorios, resguardo de informacion sensible y flujo de derivacion. Incluye consentimiento, minimizacion de datos y acceso solo a personal autorizado.', 'Beneficiarios', 'Registro', 'Manos Abiertas', 'Carlos Creador ONG', null, 'Ley de Proteccion de Datos Personales del Peru, Ley 29733.', 'politica', 'restringido', array['administrador','creador_ong']),
('Plantilla de campana de donaciones', 'Checklist para planificar campanas con metas, canales y rendicion.', 'Contiene etapas, responsables, indicadores, trazabilidad de aportes y reporte posterior a donantes para sostener transparencia.', 'Donaciones', 'Campanas', 'Manos Abiertas', 'Carlos Creador ONG', null, 'Buenas practicas de transparencia y rendicion de cuentas para organizaciones sin fines de lucro.', 'plantilla', 'interno', array['administrador','creador_ong']),
('Reporte de impacto trimestral', 'Resumen de beneficiarios atendidos, horas voluntarias y aprendizajes.', 'Presenta metricas de alcance, resultados por proyecto, brechas de conocimiento y recomendaciones para priorizar nuevos articulos.', 'Reportes de impacto', 'Indicadores', 'Puentes de Impacto', 'Ana Administradora', null, 'Marco interno de monitoreo, evaluacion y aprendizaje.', 'reporte', 'publico', array['administrador','creador_ong','voluntario']),
('Guia de visitas de campo', 'Pasos para preparar, ejecutar y cerrar una visita comunitaria.', 'Incluye materiales, ruta de registro, alertas de proteccion, criterios de no discriminacion y seguimiento posterior.', 'Guias para voluntarios', 'Campo', 'Manos Abiertas', 'Carlos Creador ONG', null, 'Ley General del Voluntariado del Peru, Ley 28238; politicas internas de seguridad.', 'guia', 'publico', array['administrador','creador_ong','voluntario']),
('Matriz de planificacion de proyectos sociales', 'Guia breve para definir problema, objetivos, supuestos e indicadores.', 'El creador ONG documenta teoria de cambio, actividades, responsables, riesgos y evidencias esperadas antes de iniciar ejecucion.', 'Proyectos sociales', 'Planificacion', 'Puentes de Impacto', 'Ana Administradora', null, 'Buenas practicas de gestion de proyectos sociales.', 'guia', 'interno', array['administrador','creador_ong']),
('Kit de capacitacion para facilitadores', 'Material de apoyo para preparar sesiones con voluntarios y beneficiarios.', 'Incluye objetivos de aprendizaje, dinamicas, evaluacion rapida y registro de asistencia para medir adopcion del conocimiento.', 'Capacitaciones', 'Talleres', 'Manos Abiertas', 'Carlos Creador ONG', null, 'Lineamientos internos de capacitacion y mejora continua.', 'documento', 'publico', array['administrador','creador_ong','voluntario'])
) as x(title, description, content, category, subcategory, organization, author_name, image_url, legal_reference, document_type, visibility, visible_to_roles)
join categories c on c.name = x.category
left join subcategories sc on sc.category_id = c.id and sc.name = x.subcategory
join organizations o on o.name = x.organization
join users u on u.full_name = x.author_name
on conflict do nothing;

insert into volunteer_opportunities (organization_id, created_by, title, description, location, modality, required_skills, status, starts_at, ends_at, image_url, slots, schedule, duration)
select o.id, u.id, x.title, x.description, x.location, x.modality, x.required_skills, 'abierta', x.starts_at::date, x.ends_at::date, x.image_url, x.slots, x.schedule, x.duration
from (values
('Manos Abiertas', 'Carlos Creador ONG', 'Facilitador de capacitacion comunitaria', 'Apoyar talleres de habilidades digitales para beneficiarios.', 'Lima Norte', 'presencial', array['facilitacion','paciencia','comunicacion'], '2026-08-01', '2026-09-15', 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80', 20, 'Sabados 9:00 a 12:00', '6 semanas'),
('Puentes de Impacto', 'Ana Administradora', 'Analista voluntario de datos de impacto', 'Ordenar bases y construir tableros simples de seguimiento.', 'Remoto', 'remota', array['excel','analisis de datos','visualizacion'], '2026-07-20', '2026-10-20', 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80', 8, 'Flexible, 4 horas por semana', '3 meses'),
('Manos Abiertas', 'Carlos Creador ONG', 'Mentor de nuevos voluntarios', 'Acompanamiento inicial a personas que ingresan a la ONG y seguimiento de dudas frecuentes.', 'Lima', 'hibrida', array['liderazgo','acompanamiento','comunicacion'], '2026-08-10', '2026-11-10', 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80', 12, 'Martes 19:00 y una salida mensual', '3 meses')
) as x(organization, creator, title, description, location, modality, required_skills, starts_at, ends_at, image_url, slots, schedule, duration)
join organizations o on o.name = x.organization
join users u on u.full_name = x.creator
on conflict do nothing;

insert into applications (
  opportunity_id, volunteer_id, applicant_name, applicant_email, phone, document_number, age,
  availability, experience, skills, consent_data, motivation, status
)
select vo.id, u.id, 'Valeria Voluntaria', 'voluntario@ongkms.test', '+51 999 111 222', 'DNI demo', 21,
  'Sabados por la manana', 'Apoyo previo en talleres comunitarios y registro de asistencia.',
  array['comunicacion','facilitacion'], true, 'Quiero aportar en procesos de capacitacion comunitaria.', 'recibida'
from volunteer_opportunities vo
join users u on u.email = 'voluntario@ongkms.test'
where vo.title = 'Facilitador de capacitacion comunitaria'
on conflict (opportunity_id, volunteer_id) do nothing;

insert into favorites (user_id, item_id)
select u.id, k.id
from users u cross join knowledge_items k
where u.email = 'voluntario@ongkms.test' and k.title in ('Manual de induccion para voluntarios','Guia de visitas de campo')
on conflict (user_id, item_id) do nothing;

insert into search_logs (query, filters, role_name, results_count) values
('becas escolares', '{"category":"Beneficiarios"}', 'voluntario', 0),
('manual marca', '{"type":"documento"}', 'creador_ong', 0);

insert into analytics_events (
    event_type,
    entity_type,
    entity_id,
    role_name,
    metadata
)
select
    'view_item',
    'knowledge_items',
    k.id,
    'voluntario',
    jsonb_build_object(
        'title', k.title,
        'category_name', c.name
    )
from knowledge_items k
inner join categories c
    on c.id = k.category_id
limit 5;

-- Iteracion 6: mas ejemplos por taxonomia y nueva seccion Leyes para ONG.
insert into categories (name, description, icon, sort_order) values
('Leyes para ONG', 'Normativa, tramites y secuencia legal que una persona debe revisar antes de crear una ONG en Peru.', 'scale', 9)
on conflict (name) do nothing;

insert into subcategories (category_id, name, description, sort_order)
select c.id, x.name, x.description, x.sort_order
from categories c
join (values
('Voluntariado', 'Seguridad', 'Prevencion de riesgos y cuidado del voluntario.', 3),
('Voluntariado', 'Evaluacion', 'Seguimiento de desempeno y cierre de participacion.', 4),
('Donaciones', 'Rendicion', 'Comprobantes, reportes y trazabilidad.', 2),
('Donaciones', 'Alianzas', 'Relaciones con empresas y donantes institucionales.', 3),
('Beneficiarios', 'Consentimiento', 'Autorizaciones y tratamiento de datos.', 2),
('Beneficiarios', 'Derivacion', 'Escalamiento a servicios o aliados.', 3),
('Proyectos sociales', 'Ejecucion', 'Control operativo y seguimiento semanal.', 2),
('Proyectos sociales', 'Cierre', 'Lecciones aprendidas e informe final.', 3),
('Capacitaciones', 'Evaluacion', 'Pruebas rapidas y retroalimentacion.', 2),
('Capacitaciones', 'Repositorio', 'Materiales reutilizables por programa.', 3),
('Documentos internos', 'Plantillas', 'Formatos base para gestion institucional.', 2),
('Documentos internos', 'Auditoria', 'Evidencias, historial y control interno.', 3),
('Guias para voluntarios', 'Remoto', 'Participacion virtual segura y ordenada.', 2),
('Guias para voluntarios', 'Emergencias', 'Primeras acciones ante incidentes.', 3),
('Reportes de impacto', 'Resultados', 'Hallazgos y avances por periodo.', 2),
('Reportes de impacto', 'Aprendizajes', 'Mejora continua y decisiones.', 3),
('Leyes para ONG', 'Constitucion', 'Antes de crear la asociacion: fines, asociados, estatuto y consejo directivo.', 1),
('Leyes para ONG', 'SUNARP', 'Inscripcion registral de la asociacion y actos posteriores.', 2),
('Leyes para ONG', 'APCI', 'Registro de ONGD cuando corresponde cooperacion tecnica internacional.', 3),
('Leyes para ONG', 'SUNAT', 'RUC, obligaciones tributarias y comprobantes.', 4),
('Leyes para ONG', 'Gobernanza', 'Libros, actas, asambleas, consejo directivo y transparencia.', 5)
) as x(category, name, description, sort_order) on x.category = c.name
on conflict (category_id, name) do nothing;

insert into tags (name) values
('constitucion'), ('estatuto'), ('asociacion'), ('sunarp'), ('registro'), ('persona juridica'),
('apci'), ('ongd'), ('cooperacion'), ('sunat'), ('ruc'), ('tributario'),
('gobernanza'), ('actas'), ('transparencia'), ('seguridad'), ('alianzas'), ('auditoria')
on conflict (name) do nothing;

-- 3 contenidos por subcategoria principal de la seccion legal.
insert into knowledge_items (
  title, description, content, category_id, subcategory_id, organization_id, created_by,
  author_name, image_url, legal_reference, document_type, status, visibility, visible_to_roles, published_at
)
select x.title, x.description, x.content, c.id, sc.id, o.id, u.id, x.author_name,
  x.image_url, x.legal_reference, 'ley', 'publicado', 'publico', array['administrador','creador_ong','voluntario'], now()
from (values
('Ruta legal para crear una asociacion sin fines de lucro', 'Secuencia inicial antes de operar como ONG.', 'Define fines no lucrativos, identifica asociados fundadores, redacta estatuto, elige consejo directivo, eleva escritura publica, inscribe en SUNARP y luego gestiona RUC y libros.', 'Leyes para ONG', 'Constitucion', 'Manos Abiertas', 'Ana Administradora', null, 'SUNARP, constitucion de asociacion por pasos; Codigo Civil peruano, articulos sobre asociaciones.'),
('Contenido minimo del estatuto de una ONG', 'Campos que conviene revisar antes de firmar la minuta.', 'El estatuto debe ordenar denominacion, domicilio, fines, patrimonio, asociados, organos, convocatorias, quorum, elecciones, sanciones, disolucion y destino del patrimonio.', 'Leyes para ONG', 'Constitucion', 'Manos Abiertas', 'Ana Administradora', null, 'Codigo Civil peruano sobre asociaciones; revisar texto vigente antes de aprobar estatuto.'),
('Acta de constitucion y primer consejo directivo', 'Documento base para iniciar la vida institucional.', 'El acta deja constancia de fundadores, aprobacion de estatuto, eleccion de directivos y autorizacion para tramites notariales y registrales.', 'Leyes para ONG', 'Constitucion', 'Manos Abiertas', 'Ana Administradora', null, 'SUNARP: pasos para registrar asociacion.'),
('Inscripcion de asociacion en SUNARP', 'Paso registral para obtener existencia legal inscrita.', 'La escritura publica se presenta al Registro de Personas Juridicas. La partida registral acredita existencia, directivos y actos inscritos.', 'Leyes para ONG', 'SUNARP', 'Manos Abiertas', 'Ana Administradora', null, 'SUNARP, constitucion de asociacion por pasos.'),
('Reserva o verificacion de nombre institucional', 'Evita conflictos de denominacion antes de registrar.', 'Antes de formalizar, conviene revisar que el nombre de la asociacion no genere confusion con entidades inscritas y sea coherente con sus fines.', 'Leyes para ONG', 'SUNARP', 'Manos Abiertas', 'Ana Administradora', null, 'Orientacion registral SUNARP; validar disponibilidad segun tramite vigente.'),
('Inscripcion de consejo directivo posterior', 'Actualizacion registral cuando cambian autoridades.', 'Las asociaciones deben documentar convocatoria, quorum, votacion y eleccion para inscribir nuevos consejos directivos o cambios relevantes.', 'Leyes para ONG', 'SUNARP', 'Manos Abiertas', 'Ana Administradora', null, 'SUNARP: nombramiento de consejo directivo de asociacion.'),
('Cuando corresponde registro ONGD en APCI', 'Aplica a entidades que gestionan cooperacion tecnica internacional.', 'Si la organizacion ejecuta planes, programas o proyectos vinculados a cooperacion tecnica internacional, debe revisar la inscripcion o actualizacion ante APCI.', 'Leyes para ONG', 'APCI', 'Manos Abiertas', 'Ana Administradora', null, 'Gob.pe APCI: Inscribir tu Organizacion No Gubernamental de Desarrollo.'),
('Datos del representante legal para APCI', 'Informacion que se solicita al iniciar el tramite.', 'La plataforma puede pedir identificacion del representante legal y aceptacion de tratamiento de datos y notificacion para acceder al tramite.', 'Leyes para ONG', 'APCI', 'Manos Abiertas', 'Ana Administradora', null, 'Gob.pe APCI, tramite de registro ONGD, actualizado 16 de junio de 2026.'),
('Actualizacion de informacion ante APCI', 'Control posterior para mantener datos vigentes.', 'Una entidad ya registrada puede actualizar informacion institucional mediante el procedimiento correspondiente, evitando inconsistencias con su partida y RUC.', 'Leyes para ONG', 'APCI', 'Manos Abiertas', 'Ana Administradora', null, 'Gob.pe APCI, registros.'),
('RUC para asociacion sin fines de lucro', 'Paso tributario posterior a la inscripcion registral.', 'Luego de inscribirse, la asociacion gestiona RUC para operar formalmente, emitir o recibir comprobantes, abrir cuentas y cumplir obligaciones.', 'Leyes para ONG', 'SUNAT', 'Manos Abiertas', 'Ana Administradora', null, 'SUNAT: revisar requisitos vigentes para inscripcion o activacion de RUC.'),
('Condicion de domicilio y habido', 'Dato relevante para tramites y transparencia.', 'Mantener domicilio fiscal actualizado y condicion adecuada evita problemas al presentar proyectos, rendiciones, convenios o registros institucionales.', 'Leyes para ONG', 'SUNAT', 'Manos Abiertas', 'Ana Administradora', null, 'SUNAT: obligaciones del RUC y domicilio fiscal.'),
('Comprobantes y rendicion de donaciones', 'Buenas practicas tributarias y documentales.', 'La ONG debe documentar ingresos, gastos, donaciones, convenios y sustentos para rendicion interna, donantes y eventuales revisiones.', 'Leyes para ONG', 'SUNAT', 'Manos Abiertas', 'Ana Administradora', null, 'SUNAT y politicas internas de transparencia; revisar regimen aplicable.'),
('Libros obligatorios de una asociacion', 'Libros institucionales antes de usarse.', 'La asociacion debe contar con libro de asociados, libro de actas de asamblea y libro del consejo directivo o junta directiva, con apertura certificada cuando corresponda.', 'Leyes para ONG', 'Gobernanza', 'Manos Abiertas', 'Ana Administradora', null, 'SUNARP cita articulo 83 del Codigo Civil y Ley del Notariado para apertura de libros.'),
('Politica de conflictos de interes', 'Regla interna para decisiones transparentes.', 'Directivos, trabajadores y voluntarios deben declarar intereses cuando una decision pueda beneficiarlos directa o indirectamente.', 'Leyes para ONG', 'Gobernanza', 'Manos Abiertas', 'Ana Administradora', null, 'Buenas practicas de gobernanza; adaptar al estatuto y reglamento interno.'),
('Matriz de cumplimiento legal anual', 'Checklist para no perder obligaciones clave.', 'El administrador revisa partida registral, vigencia de poder, RUC, libros, actas, reportes, tratamiento de datos, documentos de voluntariado y registros sectoriales.', 'Leyes para ONG', 'Gobernanza', 'Manos Abiertas', 'Ana Administradora', null, 'Checklist interno basado en SUNARP, APCI, SUNAT y Codigo Civil.'),
-- ejemplos extra para llenar la taxonomia general
('Checklist de seguridad para voluntarios', 'Control antes, durante y despues de actividades.', 'Incluye contacto de emergencia, evaluacion de zona, responsable de salida, reporte de incidentes y cierre de actividad.', 'Voluntariado', 'Seguridad', 'Manos Abiertas', 'Carlos Creador ONG', null, 'Politica interna de seguridad y voluntariado.'),
('Guia de alianzas con empresas donantes', 'Pasos para proponer, formalizar y reportar alianzas.', 'Define propuesta de valor, convenio, entregables, rendicion, uso de marca y evidencias de impacto.', 'Donaciones', 'Alianzas', 'Manos Abiertas', 'Carlos Creador ONG', null, 'Buenas practicas de alianzas y transparencia.'),
('Formato de auditoria documental interna', 'Plantilla para revisar evidencias por proyecto.', 'Lista actas, comprobantes, informes, fotos, consentimientos, indicadores y responsables de custodia.', 'Documentos internos', 'Auditoria', 'Manos Abiertas', 'Carlos Creador ONG', null, 'Control interno documental de la ONG.')
) as x(title, description, content, category, subcategory, organization, author_name, image_url, legal_reference)
join categories c on c.name = x.category
left join subcategories sc on sc.category_id = c.id and sc.name = x.subcategory
join organizations o on o.name = x.organization
join users u on u.full_name = x.author_name
where not exists (select 1 from knowledge_items k where k.title = x.title);


-- Iteracion 7: contenido ampliado para conocimiento y leyes ONG.
alter table if exists knowledge_items add column if not exists source_url text;

insert into knowledge_items (
  title, description, content, category_id, subcategory_id, organization_id, created_by,
  author_name, image_url, legal_reference, source_url, document_type, status, visibility, visible_to_roles, published_at
)
select x.title, x.description, x.content, c.id, sc.id, o.id, u.id,
  x.author_name, x.image_url, x.legal_reference, nullif(x.source_url,''), x.document_type,
  'publicado', 'publico', array['administrador','creador_ong','voluntario'], now()
from (values
('Ruta general para constituir una asociacion civil sin fines de lucro','Secuencia inicial para pasar de idea social a persona juridica inscrita.','Ruta general para constituir una asociacion civil sin fines de lucro orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y.','Leyes para ONG','Constitucion','Manos Abiertas','Ana Administradora',null,'SUNARP / Codigo Civil peruano / Guia practica de asociaciones sin fines de lucro.','https://scr.sunarp.gob.pe/constitucion-de-asociacion-por-pasos/','ley','constitucion,estatuto,asociacion'),
('Definicion de asociacion y fin no lucrativo','Explica la logica de una organizacion estable con finalidad no lucrativa.','Definicion de asociacion y fin no lucrativo orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria.','Leyes para ONG','Constitucion','Manos Abiertas','Ana Administradora',null,'Codigo Civil peruano, articulo 80; revisar texto vigente.','https://peru.iom.int/sites/g/files/tmzbdl951/files/documents/2024-01/guia-practica-asociaciones-sin-fines-de-lucro.pdf','ley','constitucion,estatuto,asociacion'),
('Estatuto: contenido minimo antes de firmar minuta','Checklist de denominacion, domicilio, fines, asociados, organos y patrimonio.','Estatuto: contenido minimo antes de firmar minuta orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria.','Leyes para ONG','Constitucion','Manos Abiertas','Ana Administradora',null,'Codigo Civil peruano sobre estatutos de asociaciones.','https://peru.iom.int/sites/g/files/tmzbdl951/files/documents/2024-01/guia-practica-asociaciones-sin-fines-de-lucro.pdf','ley','constitucion,estatuto,asociacion'),
('Acta de constitucion y eleccion de primer consejo directivo','Documento base que acredita fundadores, acuerdo de constitucion y directivos.','Acta de constitucion y eleccion de primer consejo directivo orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas.','Leyes para ONG','Constitucion','Manos Abiertas','Ana Administradora',null,'SUNARP: constitucion de asociacion por pasos.','https://scr.sunarp.gob.pe/constitucion-de-asociacion-por-pasos/','ley','constitucion,estatuto,asociacion'),
('Inscripcion en SUNARP del Registro de Personas Juridicas','Paso para que la asociacion quede inscrita y pueda acreditar existencia legal.','Inscripcion en SUNARP del Registro de Personas Juridicas orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con.','Leyes para ONG','SUNARP','Manos Abiertas','Ana Administradora',null,'SUNARP: constitucion de asociacion por pasos.','https://scr.sunarp.gob.pe/constitucion-de-asociacion-por-pasos/','ley','sunarp,registro,persona juridica'),
('Reserva o verificacion de nombre institucional','Control previo para evitar denominaciones confusas o incompatibles.','Reserva o verificacion de nombre institucional orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.','Leyes para ONG','SUNARP','Manos Abiertas','Ana Administradora',null,'Orientacion registral SUNARP; verificar procedimiento vigente.','https://www.sunarp.gob.pe/','ley','sunarp,registro,persona juridica'),
('Vigencia de poder del representante legal','Documento frecuente para bancos, convenios, tramites y convocatorias.','Vigencia de poder del representante legal orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.','Leyes para ONG','SUNARP','Manos Abiertas','Ana Administradora',null,'SUNARP: publicidad registral y vigencia de poder.','https://www.sunarp.gob.pe/','ley','sunarp,registro,persona juridica'),
('Inscripcion de nuevos consejos directivos','Actualiza autoridades cuando termina mandato o se aprueba nueva eleccion.','Inscripcion de nuevos consejos directivos orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.','Leyes para ONG','SUNARP','Manos Abiertas','Ana Administradora',null,'SUNARP: Registro de Personas Juridicas.','https://www.sunarp.gob.pe/','ley','sunarp,registro,persona juridica'),
('Registro ONGD ante APCI cuando existe cooperacion internacional','Aplica a personas juridicas privadas que gestionan proyectos de cooperacion tecnica internacional.','Registro ONGD ante APCI cuando existe cooperacion internacional orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con.','Leyes para ONG','APCI','Manos Abiertas','Ana Administradora',null,'Gob.pe APCI: Inscribir tu Organizacion No Gubernamental de Desarrollo.','https://www.gob.pe/9076-inscribir-tu-organizacion-no-gubernamental-de-desarrollo-ongd-en-la-apci','ley','apci,ongd,cooperacion'),
('Actualizacion de informacion institucional ante APCI','Mantiene datos coherentes con partida, RUC, representante y proyectos.','Actualizacion de informacion institucional ante APCI orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.','Leyes para ONG','APCI','Manos Abiertas','Ana Administradora',null,'Gob.pe APCI: registros y actualizacion de entidad.','https://www.gob.pe/institucion/apci/tema/registros','ley','apci,ongd,cooperacion'),
('Consulta de entidades registradas en APCI','Permite verificar si una entidad aparece en reportes de ONGD, ENIEX o IPREDA.','Consulta de entidades registradas en APCI orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.','Leyes para ONG','APCI','Manos Abiertas','Ana Administradora',null,'Gob.pe APCI: reporte de entidades registradas.','https://www.gob.pe/institucion/apci/informes-publicaciones/2192060-ongd-registradas-en-la-apci','ley','apci,ongd,cooperacion'),
('Casilla electronica y notificaciones APCI','Ordena comunicaciones formales y seguimiento de tramites digitales.','Casilla electronica y notificaciones APCI orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.','Leyes para ONG','APCI','Manos Abiertas','Ana Administradora',null,'Portal APCI / Gob.pe: servicios y registros.','https://www.gob.pe/apci','ley','apci,ongd,cooperacion'),
('Inscripcion al RUC para persona juridica','Paso tributario posterior a la inscripcion registral de la asociacion.','Inscripcion al RUC para persona juridica orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.','Leyes para ONG','SUNAT','Manos Abiertas','Ana Administradora',null,'Gob.pe: Inscripcion al RUC para Persona Juridica.','https://www.gob.pe/276-inscripcion-al-ruc-para-persona-juridica','ley','sunat,ruc,tributario'),
('Clave SOL y operaciones en linea','Acceso para declaraciones, consultas, actualizaciones y tramites tributarios.','Clave SOL y operaciones en linea orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.','Leyes para ONG','SUNAT','Manos Abiertas','Ana Administradora',null,'SUNAT: Operaciones en Linea.','https://www.sunat.gob.pe/sol.html','ley','sunat,ruc,tributario'),
('Domicilio fiscal y condicion habido','Dato clave para transparencia, bancos, convenios y revisiones tributarias.','Domicilio fiscal y condicion habido orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.','Leyes para ONG','SUNAT','Manos Abiertas','Ana Administradora',null,'SUNAT: orientacion RUC empresas.','https://orientacion.sunat.gob.pe/01-inscripcion-al-ruc-empresas','ley','sunat,ruc,tributario'),
('Formularios para inscripcion o cambios del RUC','Identifica formularios usados cuando el tramite requiere documentacion fisica.','Formularios para inscripcion o cambios del RUC orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria.','Leyes para ONG','SUNAT','Manos Abiertas','Ana Administradora',null,'SUNAT: formularios para inscripcion al RUC.','https://orientacion.sunat.gob.pe/03-formularios-para-la-inscripcion-al-ruc','ley','sunat,ruc,tributario'),
('Libros de actas y libro de asociados','Soporte documental para acuerdos, elecciones, asambleas y miembros.','Libros de actas y libro de asociados orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria.','Leyes para ONG','Gobernanza','Manos Abiertas','Ana Administradora',null,'Codigo Civil y practica registral; validar formalidades vigentes.','https://scr.sunarp.gob.pe/constitucion-de-asociacion-por-pasos/','ley','gobernanza,actas,transparencia'),
('Politica de conflictos de interes','Regla interna para transparentar decisiones de directivos, aliados y proveedores.','Politica de conflictos de interes orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.','Leyes para ONG','Gobernanza','Manos Abiertas','Ana Administradora',null,'Buena practica de gobernanza ONG; adaptar al estatuto.','https://peru.iom.int/sites/g/files/tmzbdl951/files/documents/2024-01/guia-practica-asociaciones-sin-fines-de-lucro.pdf','ley','gobernanza,actas,transparencia'),
('Matriz anual de cumplimiento institucional','Checklist para revisar estatuto, poderes, RUC, libros, reportes y documentos.','Matriz anual de cumplimiento institucional orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.','Leyes para ONG','Gobernanza','Manos Abiertas','Ana Administradora',null,'Checklist interno basado en SUNARP, APCI y SUNAT.','https://www.gob.pe/apci','ley','gobernanza,actas,transparencia'),
('Transparencia y rendicion de cuentas ante donantes','Organiza evidencias, reportes y aprobaciones antes de publicar resultados.','Transparencia y rendicion de cuentas ante donantes orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria.','Leyes para ONG','Gobernanza','Manos Abiertas','Ana Administradora',null,'Buenas practicas de transparencia y control institucional.','https://www.gob.pe/institucion/apci/tema/registros','ley','gobernanza,actas,transparencia'),
('Manual ampliado de induccion para voluntarios','Guia de bienvenida con responsabilidades, cultura institucional y seguridad.','Manual ampliado de induccion para voluntarios resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Voluntariado','Induccion','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Formulario de postulacion y entrevista voluntaria','Secuencia para evaluar motivacion, disponibilidad y habilidades.','Formulario de postulacion y entrevista voluntaria resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Voluntariado','Postulacion','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Protocolo de seguridad para actividades de campo','Control de riesgos, responsables, emergencias y reporte de incidentes.','Protocolo de seguridad para actividades de campo resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Voluntariado','Seguridad','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Plan de campana de donaciones comunitarias','Organiza objetivos, canales, mensajes, responsables y evidencias.','Plan de campana de donaciones comunitarias resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Donaciones','Campanas','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Trazabilidad de bienes donados','Guia para registrar ingreso, custodia, entrega y conformidad.','Trazabilidad de bienes donados resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Donaciones','Trazabilidad','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Convenios con empresas aliadas','Proceso para formalizar apoyo privado con entregables claros.','Convenios con empresas aliadas resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Donaciones','Alianzas','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Registro seguro de beneficiarios','Control de datos, consentimiento, derivaciones y seguimiento.','Registro seguro de beneficiarios resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Beneficiarios','Registro','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Seguimiento mensual de beneficiarios','Ficha de contacto, avance, alertas y cierre de atencion.','Seguimiento mensual de beneficiarios resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Beneficiarios','Seguimiento','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Consentimiento informado para programas sociales','Modelo operativo para explicar uso de datos y participacion.','Consentimiento informado para programas sociales resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Beneficiarios','Consentimiento','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Planificacion de proyectos sociales','Matriz de objetivos, actividades, responsables e indicadores.','Planificacion de proyectos sociales resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Proyectos sociales','Planificacion','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Ejecucion semanal de proyecto comunitario','Ritmo de reuniones, tareas, evidencias y riesgos.','Ejecucion semanal de proyecto comunitario resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Proyectos sociales','Ejecucion','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Cierre y lecciones aprendidas del proyecto','Formato para resultados, aprendizajes, pendientes y recomendaciones.','Cierre y lecciones aprendidas del proyecto resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Proyectos sociales','Cierre','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Taller base para nuevos coordinadores','Contenido para formar lideres de actividad dentro de la ONG.','Taller base para nuevos coordinadores resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Capacitaciones','Talleres','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Materiales reutilizables de capacitacion','Repositorio de guias, formatos, diapositivas y evaluaciones.','Materiales reutilizables de capacitacion resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Capacitaciones','Materiales','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Evaluacion corta de aprendizaje voluntario','Preguntas y criterios para medir comprension antes de salir a campo.','Evaluacion corta de aprendizaje voluntario resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Capacitaciones','Evaluacion','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Politica interna de gestion documental','Reglas de versionado, permisos, custodia y aprobacion.','Politica interna de gestion documental resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Documentos internos','Politicas','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Plantilla de informe mensual de ONG','Estructura para reportar avances, indicadores y necesidades.','Plantilla de informe mensual de ONG orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.','Documentos internos','Plantillas','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento'),
('Auditoria documental de proyecto social','Lista de evidencias para revision interna o del donante.','Auditoria documental de proyecto social resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.','Documentos internos','Auditoria','Manos Abiertas','Carlos Creador ONG',null,'Guia interna de gestion del conocimiento ONG.','', 'guia','ong,gestion,conocimiento')
) as x(title, description, content, category, subcategory, organization, author_name, image_url, legal_reference, source_url, document_type, tags_text)
join categories c on c.name = x.category
left join subcategories sc on sc.category_id = c.id and sc.name = x.subcategory
join organizations o on o.name = x.organization
join users u on u.full_name = x.author_name
where not exists (select 1 from knowledge_items k where lower(k.title) = lower(x.title));
