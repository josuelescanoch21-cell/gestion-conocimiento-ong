const demo = {
  categories: [
    { name: 'Voluntariado', subs: ['Induccion', 'Postulacion'], icon: 'VO' },
    { name: 'Donaciones', subs: ['Campanas', 'Trazabilidad'], icon: 'DO' },
    { name: 'Beneficiarios', subs: ['Registro', 'Seguimiento'], icon: 'BE' },
    { name: 'Proyectos sociales', subs: ['Planificacion', 'Ejecucion'], icon: 'PS' },
    { name: 'Capacitaciones', subs: ['Talleres', 'Materiales'], icon: 'CA' },
    { name: 'Documentos internos', subs: ['Politicas', 'Plantillas'], icon: 'DI' },
    { name: 'Guias para voluntarios', subs: ['Campo', 'Remoto'], icon: 'GV' },
    { name: 'Reportes de impacto', subs: ['Indicadores', 'Resultados'], icon: 'RI' },
    { name: 'Leyes para ONG', subs: ['Constitucion', 'SUNARP', 'APCI', 'SUNAT', 'Gobernanza'], icon: 'LO' }
  ],
  items: [
    { id: '1', title: 'Manual de induccion para voluntarios', description: 'Ruta de bienvenida, principios y responsabilidades del voluntariado.', content: 'Codigo de conducta, canales de comunicacion, protocolos de seguridad y criterios de escalamiento.', category: 'Voluntariado', subcategory: 'Induccion', tags: ['induccion', 'aprendizaje', 'campo'], author: 'Carlos Creador ONG', date: '2026-07-01', status: 'publicado', visibility: 'publico', roles: ['administrador', 'creador_ong', 'voluntario'], organization: 'Manos Abiertas', type: 'guia', views: 148, image_url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80' },
    { id: '2', title: 'Protocolo de registro de beneficiarios', description: 'Estandar para captura de datos, consentimiento informado y seguimiento.', content: 'Campos obligatorios, resguardo de informacion sensible y flujo de derivacion.', category: 'Beneficiarios', subcategory: 'Registro', tags: ['proteccion', 'beneficiarios'], author: 'Carlos Creador ONG', date: '2026-06-22', status: 'revision', visibility: 'restringido', roles: ['administrador', 'creador_ong'], organization: 'Manos Abiertas', type: 'politica', views: 43 },
    { id: '3', title: 'Plantilla de campana de donaciones', description: 'Checklist para planificar campanas con metas, canales y rendicion.', content: 'Etapas, responsables, indicadores y reporte posterior a donantes.', category: 'Donaciones', subcategory: 'Campanas', tags: ['donantes', 'transparencia'], author: 'Carlos Creador ONG', date: '2026-06-10', status: 'publicado', visibility: 'interno', roles: ['administrador', 'creador_ong'], organization: 'Manos Abiertas', type: 'plantilla', views: 84 },
    { id: '4', title: 'Reporte de impacto trimestral', description: 'Resumen de beneficiarios atendidos, horas voluntarias y aprendizajes.', content: 'Metricas de alcance, resultados por proyecto y recomendaciones de mejora.', category: 'Reportes de impacto', subcategory: 'Indicadores', tags: ['impacto', 'indicadores'], author: 'Ana Administradora', date: '2026-07-02', status: 'publicado', visibility: 'publico', roles: ['administrador', 'creador_ong', 'voluntario'], organization: 'Puentes de Impacto', type: 'reporte', views: 212 },
    { id: 'ley1', title: 'Antes de crear una ONG: ruta legal basica', description: 'Mapa inicial: asociacion civil, estatuto, escritura publica, SUNARP, RUC y libros.', content: 'Una ONG suele iniciar como asociacion civil sin fines de lucro. Antes de operar conviene definir fines, asociados, organos internos, estatuto, consejo directivo, inscripcion registral, RUC y libros institucionales.', category: 'Leyes para ONG', subcategory: 'Constitucion', tags: ['constitucion', 'estatuto', 'asociacion'], author: 'Ana Administradora', date: '2026-07-02', status: 'publicado', visibility: 'publico', roles: ['administrador','creador_ong','voluntario'], organization: 'Manos Abiertas', type: 'ley', views: 55, legal_reference: 'SUNARP y Codigo Civil peruano. Contenido informativo; validar con asesoria legal.' },
    { id: 'ley2', title: 'Inscripcion registral en SUNARP', description: 'Documentos y pasos frecuentes para formalizar una asociacion.', content: 'La organizacion prepara acta, estatuto, nombramiento del primer consejo directivo, escritura publica y solicitud de inscripcion en el Registro de Personas Juridicas.', category: 'Leyes para ONG', subcategory: 'SUNARP', tags: ['sunarp', 'registro', 'persona juridica'], author: 'Ana Administradora', date: '2026-07-02', status: 'publicado', visibility: 'publico', roles: ['administrador','creador_ong','voluntario'], organization: 'Manos Abiertas', type: 'ley', views: 38, legal_reference: 'SUNARP: constitucion de asociacion por pasos.' },
    { id: 'ley3', title: 'Registro ONGD ante APCI', description: 'Cuando la entidad gestiona cooperacion tecnica internacional.', content: 'Si la organizacion ejecuta programas o proyectos con cooperacion tecnica internacional, debe revisar el registro ONGD ante APCI y mantener informacion actualizada.', category: 'Leyes para ONG', subcategory: 'APCI', tags: ['apci', 'ongd', 'cooperacion'], author: 'Ana Administradora', date: '2026-07-02', status: 'publicado', visibility: 'publico', roles: ['administrador','creador_ong','voluntario'], organization: 'Manos Abiertas', type: 'ley', views: 41, legal_reference: 'Gob.pe APCI: Inscribir tu Organizacion No Gubernamental de Desarrollo.' }
  ],
  opportunities: [
    { id: 'op1', title: 'Facilitador de capacitacion comunitaria', organization: 'Manos Abiertas', modality: 'presencial', location: 'Lima Norte', applicants: 18, required_skills: ['facilitacion', 'comunicacion'], description: 'Acompanamiento en talleres comunitarios.', status: 'abierta', image_url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1000&q=80' },
    { id: 'op2', title: 'Analista voluntario de datos de impacto', organization: 'Puentes de Impacto', modality: 'remota', location: 'Remoto', applicants: 27, required_skills: ['excel', 'datos'], description: 'Apoyo en tableros y reportes.', status: 'abierta' },
    { id: 'op3', title: 'Mentor de nuevos voluntarios', organization: 'Manos Abiertas', modality: 'hibrida', location: 'Lima', applicants: 11, required_skills: ['liderazgo', 'acompanamiento'], description: 'Mentoria inicial para nuevos postulantes.', status: 'abierta' }
  ]
};


// Iteracion 7 demo expanded content: llena Conocimiento y Leyes ONG aun sin Supabase.
demo.items.push(...[{"id": "leyx1", "title": "Ruta general para constituir una asociacion civil sin fines de lucro", "description": "Secuencia inicial para pasar de idea social a persona juridica inscrita.", "content": "Ruta general para constituir una asociacion civil sin fines de lucro orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y.", "category": "Leyes para ONG", "subcategory": "Constitucion", "tags": ["constitucion", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 31, "legal_reference": "SUNARP / Codigo Civil peruano / Guia practica de asociaciones sin fines de lucro.", "source_url": "https://scr.sunarp.gob.pe/constitucion-de-asociacion-por-pasos/"}, {"id": "leyx2", "title": "Definicion de asociacion y fin no lucrativo", "description": "Explica la logica de una organizacion estable con finalidad no lucrativa.", "content": "Definicion de asociacion y fin no lucrativo orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria.", "category": "Leyes para ONG", "subcategory": "Constitucion", "tags": ["constitucion", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 32, "legal_reference": "Codigo Civil peruano, articulo 80; revisar texto vigente.", "source_url": "https://peru.iom.int/sites/g/files/tmzbdl951/files/documents/2024-01/guia-practica-asociaciones-sin-fines-de-lucro.pdf"}, {"id": "leyx3", "title": "Estatuto: contenido minimo antes de firmar minuta", "description": "Checklist de denominacion, domicilio, fines, asociados, organos y patrimonio.", "content": "Estatuto: contenido minimo antes de firmar minuta orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria.", "category": "Leyes para ONG", "subcategory": "Constitucion", "tags": ["constitucion", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 33, "legal_reference": "Codigo Civil peruano sobre estatutos de asociaciones.", "source_url": "https://peru.iom.int/sites/g/files/tmzbdl951/files/documents/2024-01/guia-practica-asociaciones-sin-fines-de-lucro.pdf"}, {"id": "leyx4", "title": "Acta de constitucion y eleccion de primer consejo directivo", "description": "Documento base que acredita fundadores, acuerdo de constitucion y directivos.", "content": "Acta de constitucion y eleccion de primer consejo directivo orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas.", "category": "Leyes para ONG", "subcategory": "Constitucion", "tags": ["constitucion", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 34, "legal_reference": "SUNARP: constitucion de asociacion por pasos.", "source_url": "https://scr.sunarp.gob.pe/constitucion-de-asociacion-por-pasos/"}, {"id": "leyx5", "title": "Inscripcion en SUNARP del Registro de Personas Juridicas", "description": "Paso para que la asociacion quede inscrita y pueda acreditar existencia legal.", "content": "Inscripcion en SUNARP del Registro de Personas Juridicas orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con.", "category": "Leyes para ONG", "subcategory": "SUNARP", "tags": ["sunarp", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 35, "legal_reference": "SUNARP: constitucion de asociacion por pasos.", "source_url": "https://scr.sunarp.gob.pe/constitucion-de-asociacion-por-pasos/"}, {"id": "leyx6", "title": "Reserva o verificacion de nombre institucional", "description": "Control previo para evitar denominaciones confusas o incompatibles.", "content": "Reserva o verificacion de nombre institucional orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.", "category": "Leyes para ONG", "subcategory": "SUNARP", "tags": ["sunarp", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 36, "legal_reference": "Orientacion registral SUNARP; verificar procedimiento vigente.", "source_url": "https://www.sunarp.gob.pe/"}, {"id": "leyx7", "title": "Vigencia de poder del representante legal", "description": "Documento frecuente para bancos, convenios, tramites y convocatorias.", "content": "Vigencia de poder del representante legal orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.", "category": "Leyes para ONG", "subcategory": "SUNARP", "tags": ["sunarp", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 37, "legal_reference": "SUNARP: publicidad registral y vigencia de poder.", "source_url": "https://www.sunarp.gob.pe/"}, {"id": "leyx8", "title": "Inscripcion de nuevos consejos directivos", "description": "Actualiza autoridades cuando termina mandato o se aprueba nueva eleccion.", "content": "Inscripcion de nuevos consejos directivos orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.", "category": "Leyes para ONG", "subcategory": "SUNARP", "tags": ["sunarp", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 38, "legal_reference": "SUNARP: Registro de Personas Juridicas.", "source_url": "https://www.sunarp.gob.pe/"}, {"id": "leyx9", "title": "Registro ONGD ante APCI cuando existe cooperacion internacional", "description": "Aplica a personas juridicas privadas que gestionan proyectos de cooperacion tecnica internacional.", "content": "Registro ONGD ante APCI cuando existe cooperacion internacional orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con.", "category": "Leyes para ONG", "subcategory": "APCI", "tags": ["apci", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 39, "legal_reference": "Gob.pe APCI: Inscribir tu Organizacion No Gubernamental de Desarrollo.", "source_url": "https://www.gob.pe/9076-inscribir-tu-organizacion-no-gubernamental-de-desarrollo-ongd-en-la-apci"}, {"id": "leyx10", "title": "Actualizacion de informacion institucional ante APCI", "description": "Mantiene datos coherentes con partida, RUC, representante y proyectos.", "content": "Actualizacion de informacion institucional ante APCI orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.", "category": "Leyes para ONG", "subcategory": "APCI", "tags": ["apci", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 40, "legal_reference": "Gob.pe APCI: registros y actualizacion de entidad.", "source_url": "https://www.gob.pe/institucion/apci/tema/registros"}, {"id": "leyx11", "title": "Consulta de entidades registradas en APCI", "description": "Permite verificar si una entidad aparece en reportes de ONGD, ENIEX o IPREDA.", "content": "Consulta de entidades registradas en APCI orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.", "category": "Leyes para ONG", "subcategory": "APCI", "tags": ["apci", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 41, "legal_reference": "Gob.pe APCI: reporte de entidades registradas.", "source_url": "https://www.gob.pe/institucion/apci/informes-publicaciones/2192060-ongd-registradas-en-la-apci"}, {"id": "leyx12", "title": "Casilla electronica y notificaciones APCI", "description": "Ordena comunicaciones formales y seguimiento de tramites digitales.", "content": "Casilla electronica y notificaciones APCI orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.", "category": "Leyes para ONG", "subcategory": "APCI", "tags": ["apci", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 42, "legal_reference": "Portal APCI / Gob.pe: servicios y registros.", "source_url": "https://www.gob.pe/apci"}, {"id": "leyx13", "title": "Inscripcion al RUC para persona juridica", "description": "Paso tributario posterior a la inscripcion registral de la asociacion.", "content": "Inscripcion al RUC para persona juridica orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.", "category": "Leyes para ONG", "subcategory": "SUNAT", "tags": ["sunat", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 43, "legal_reference": "Gob.pe: Inscripcion al RUC para Persona Juridica.", "source_url": "https://www.gob.pe/276-inscripcion-al-ruc-para-persona-juridica"}, {"id": "leyx14", "title": "Clave SOL y operaciones en linea", "description": "Acceso para declaraciones, consultas, actualizaciones y tramites tributarios.", "content": "Clave SOL y operaciones en linea orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.", "category": "Leyes para ONG", "subcategory": "SUNAT", "tags": ["sunat", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 44, "legal_reference": "SUNAT: Operaciones en Linea.", "source_url": "https://www.sunat.gob.pe/sol.html"}, {"id": "leyx15", "title": "Domicilio fiscal y condicion habido", "description": "Dato clave para transparencia, bancos, convenios y revisiones tributarias.", "content": "Domicilio fiscal y condicion habido orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.", "category": "Leyes para ONG", "subcategory": "SUNAT", "tags": ["sunat", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 45, "legal_reference": "SUNAT: orientacion RUC empresas.", "source_url": "https://orientacion.sunat.gob.pe/01-inscripcion-al-ruc-empresas"}, {"id": "leyx16", "title": "Formularios para inscripcion o cambios del RUC", "description": "Identifica formularios usados cuando el tramite requiere documentacion fisica.", "content": "Formularios para inscripcion o cambios del RUC orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria.", "category": "Leyes para ONG", "subcategory": "SUNAT", "tags": ["sunat", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 46, "legal_reference": "SUNAT: formularios para inscripcion al RUC.", "source_url": "https://orientacion.sunat.gob.pe/03-formularios-para-la-inscripcion-al-ruc"}, {"id": "leyx17", "title": "Libros de actas y libro de asociados", "description": "Soporte documental para acuerdos, elecciones, asambleas y miembros.", "content": "Libros de actas y libro de asociados orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria.", "category": "Leyes para ONG", "subcategory": "Gobernanza", "tags": ["gobernanza", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 47, "legal_reference": "Codigo Civil y practica registral; validar formalidades vigentes.", "source_url": "https://scr.sunarp.gob.pe/constitucion-de-asociacion-por-pasos/"}, {"id": "leyx18", "title": "Politica de conflictos de interes", "description": "Regla interna para transparentar decisiones de directivos, aliados y proveedores.", "content": "Politica de conflictos de interes orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.", "category": "Leyes para ONG", "subcategory": "Gobernanza", "tags": ["gobernanza", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 48, "legal_reference": "Buena practica de gobernanza ONG; adaptar al estatuto.", "source_url": "https://peru.iom.int/sites/g/files/tmzbdl951/files/documents/2024-01/guia-practica-asociaciones-sin-fines-de-lucro.pdf"}, {"id": "leyx19", "title": "Matriz anual de cumplimiento institucional", "description": "Checklist para revisar estatuto, poderes, RUC, libros, reportes y documentos.", "content": "Matriz anual de cumplimiento institucional orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria especializada.", "category": "Leyes para ONG", "subcategory": "Gobernanza", "tags": ["gobernanza", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 49, "legal_reference": "Checklist interno basado en SUNARP, APCI y SUNAT.", "source_url": "https://www.gob.pe/apci"}, {"id": "leyx20", "title": "Transparencia y rendicion de cuentas ante donantes", "description": "Organiza evidencias, reportes y aprobaciones antes de publicar resultados.", "content": "Transparencia y rendicion de cuentas ante donantes orienta a la ONG sobre requisitos basicos, responsables, evidencia y verificacion oficial. Antes de aplicar, revisa la norma vigente, guarda el enlace gubernamental y valida dudas con asesoria.", "category": "Leyes para ONG", "subcategory": "Gobernanza", "tags": ["gobernanza", "ong", "legal"], "author": "Ana Administradora", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "ley", "views": 50, "legal_reference": "Buenas practicas de transparencia y control institucional.", "source_url": "https://www.gob.pe/institucion/apci/tema/registros"}, {"id": "conx1", "title": "Manual ampliado de induccion para voluntarios", "description": "Guia de bienvenida con responsabilidades, cultura institucional y seguridad.", "content": "Manual ampliado de induccion para voluntarios resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Voluntariado", "subcategory": "Induccion", "tags": ["voluntariado", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 71}, {"id": "conx2", "title": "Formulario de postulacion y entrevista voluntaria", "description": "Secuencia para evaluar motivacion, disponibilidad y habilidades.", "content": "Formulario de postulacion y entrevista voluntaria resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Voluntariado", "subcategory": "Postulacion", "tags": ["voluntariado", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 72}, {"id": "conx3", "title": "Protocolo de seguridad para actividades de campo", "description": "Control de riesgos, responsables, emergencias y reporte de incidentes.", "content": "Protocolo de seguridad para actividades de campo resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Voluntariado", "subcategory": "Seguridad", "tags": ["voluntariado", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 73}, {"id": "conx4", "title": "Plan de campana de donaciones comunitarias", "description": "Organiza objetivos, canales, mensajes, responsables y evidencias.", "content": "Plan de campana de donaciones comunitarias resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Donaciones", "subcategory": "Campanas", "tags": ["donaciones", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 74}, {"id": "conx5", "title": "Trazabilidad de bienes donados", "description": "Guia para registrar ingreso, custodia, entrega y conformidad.", "content": "Trazabilidad de bienes donados resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Donaciones", "subcategory": "Trazabilidad", "tags": ["donaciones", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 75}, {"id": "conx6", "title": "Convenios con empresas aliadas", "description": "Proceso para formalizar apoyo privado con entregables claros.", "content": "Convenios con empresas aliadas resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Donaciones", "subcategory": "Alianzas", "tags": ["donaciones", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 76}, {"id": "conx7", "title": "Registro seguro de beneficiarios", "description": "Control de datos, consentimiento, derivaciones y seguimiento.", "content": "Registro seguro de beneficiarios resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Beneficiarios", "subcategory": "Registro", "tags": ["beneficiarios", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 77}, {"id": "conx8", "title": "Seguimiento mensual de beneficiarios", "description": "Ficha de contacto, avance, alertas y cierre de atencion.", "content": "Seguimiento mensual de beneficiarios resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Beneficiarios", "subcategory": "Seguimiento", "tags": ["beneficiarios", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 78}, {"id": "conx9", "title": "Consentimiento informado para programas sociales", "description": "Modelo operativo para explicar uso de datos y participacion.", "content": "Consentimiento informado para programas sociales resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Beneficiarios", "subcategory": "Consentimiento", "tags": ["beneficiarios", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 79}, {"id": "conx10", "title": "Planificacion de proyectos sociales", "description": "Matriz de objetivos, actividades, responsables e indicadores.", "content": "Planificacion de proyectos sociales resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Proyectos sociales", "subcategory": "Planificacion", "tags": ["proyectos", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 80}, {"id": "conx11", "title": "Ejecucion semanal de proyecto comunitario", "description": "Ritmo de reuniones, tareas, evidencias y riesgos.", "content": "Ejecucion semanal de proyecto comunitario resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Proyectos sociales", "subcategory": "Ejecucion", "tags": ["proyectos", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 81}, {"id": "conx12", "title": "Cierre y lecciones aprendidas del proyecto", "description": "Formato para resultados, aprendizajes, pendientes y recomendaciones.", "content": "Cierre y lecciones aprendidas del proyecto resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Proyectos sociales", "subcategory": "Cierre", "tags": ["proyectos", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 82}, {"id": "conx13", "title": "Taller base para nuevos coordinadores", "description": "Contenido para formar lideres de actividad dentro de la ONG.", "content": "Taller base para nuevos coordinadores resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Capacitaciones", "subcategory": "Talleres", "tags": ["capacitaciones", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 83}, {"id": "conx14", "title": "Materiales reutilizables de capacitacion", "description": "Repositorio de guias, formatos, diapositivas y evaluaciones.", "content": "Materiales reutilizables de capacitacion resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Capacitaciones", "subcategory": "Materiales", "tags": ["capacitaciones", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 84}, {"id": "conx15", "title": "Evaluacion corta de aprendizaje voluntario", "description": "Preguntas y criterios para medir comprension antes de salir a campo.", "content": "Evaluacion corta de aprendizaje voluntario resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Capacitaciones", "subcategory": "Evaluacion", "tags": ["capacitaciones", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 85}, {"id": "conx16", "title": "Politica interna de gestion documental", "description": "Reglas de versionado, permisos, custodia y aprobacion.", "content": "Politica interna de gestion documental resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Documentos internos", "subcategory": "Politicas", "tags": ["documentos", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 86}, {"id": "conx17", "title": "Plantilla de informe mensual de ONG", "description": "Estructura para reportar avances, indicadores y necesidades.", "content": "Plantilla de informe mensual de ONG resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Documentos internos", "subcategory": "Plantillas", "tags": ["documentos", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 87}, {"id": "conx18", "title": "Auditoria documental de proyecto social", "description": "Lista de evidencias para revision interna o del donante.", "content": "Auditoria documental de proyecto social resume el procedimiento esencial para la ONG: objetivo, responsables, evidencias, riesgos y seguimiento. Usalo como guia operativa breve para capacitar, registrar acciones y mejorar la gestion interna.", "category": "Documentos internos", "subcategory": "Auditoria", "tags": ["documentos", "gestion", "ong"], "author": "Carlos Creador ONG", "date": "2026-07-02", "status": "publicado", "visibility": "publico", "roles": ["administrador", "creador_ong", "voluntario"], "organization": "Manos Abiertas", "type": "guia", "views": 88}]);

// Catalogo legal curado para la pagina de leyes. Sustituye los registros demo antiguos.
if (Array.isArray(window.ONG_LAWS)) {
  const legalSubs = ['Constitución','SUNARP','APCI','SUNAT','Voluntariado','Protección de datos','Gobernanza'];
  const legalCategory = demo.categories.find((category) => category.name === 'Leyes para ONG');
  if (legalCategory) legalCategory.subs = legalSubs;
  demo.items = demo.items.filter((item) => item.category !== 'Leyes para ONG' && item.type !== 'ley');
  demo.items.push(...window.ONG_LAWS);
}

const roleLabels = { administrador: 'Administrador', creador_ong: 'Creador ONG', voluntario: 'Voluntario' };
// cambio para el foro: se agrega 'foro' a los 3 roles para que el link aparezca en el menu de todos.
const navByRole = {
  administrador: ['dashboard', 'conocimiento', 'leyes', 'documentos', 'oportunidades', 'foro', 'analytics', 'admin'],
  creador_ong: ['dashboard', 'conocimiento', 'leyes', 'documentos', 'oportunidades', 'foro', 'analytics'],
  voluntario: ['dashboard', 'conocimiento', 'leyes', 'documentos', 'oportunidades', 'foro']
};

function currentUser() {
  const stored = localStorage.getItem('kms_user');
  return stored ? JSON.parse(stored) : { name: 'Valeria Voluntaria', email: 'voluntario@ongkms.test', role: 'voluntario', organization: 'Puentes de Impacto' };
}

function sessionHeaders() {
  const session = JSON.parse(localStorage.getItem('kms_session') || 'null');
  const user = currentUser();
  const headers = { 'Content-Type': 'application/json', 'x-demo-role': user.role, 'x-demo-email': user.email || '', 'x-demo-user-id': user.id || '', 'x-demo-organization-id': user.organization_id || '' };
  if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;
  return headers;
}

function supabaseClient() {
  if (!window.supabase || !window.KMS_SUPABASE_URL || !window.KMS_SUPABASE_ANON_KEY || window.KMS_SUPABASE_ANON_KEY.includes('PEGA_AQUI')) return null;
  if (!window.__kmsSupabase) window.__kmsSupabase = window.supabase.createClient(window.KMS_SUPABASE_URL, window.KMS_SUPABASE_ANON_KEY);
  return window.__kmsSupabase;
}

function parseJsonBody(options = {}) {
  if (!options.body) return {};
  try { return JSON.parse(options.body); } catch { return {}; }
}

function currentDbUser() {
  return currentUser();
}

async function api(path, options = {}) {
  const db = supabaseClient();
  if (!db) throw new Error('Supabase frontend no configurado. Revisa js/supabase-config.js');
  const method = String(options.method || 'GET').toUpperCase();
  const body = parseJsonBody(options);
  const user = currentDbUser();

  async function run(query) {
    const { data, error } = await query;
    if (error) throw new Error(error.message || 'No se pudo completar la accion en Supabase.');
    return data;
  }

  if (path === '/api/admin/roles') return run(db.from('roles').select('*').order('name'));

  if (path === '/api/admin/users') {
    return run(db.from('users').select('id, full_name, email, status, last_login_at, roles(id,name), organizations(id,name)').order('full_name'));
  }

  const roleMatch = path.match(/^\/api\/admin\/users\/([^/]+)\/role$/);
  if (roleMatch && method === 'PATCH') {
    return run(db.from('users').update({ role_id: body.role_id }).eq('id', roleMatch[1]).select('id, full_name, email, roles(name)').single());
  }

  if (path === '/api/taxonomy') {
    return run(db.from('categories').select('*, subcategories(*)').order('sort_order', { ascending: true }));
  }


  if (path === '/api/taxonomy/categories' && method === 'POST') {
    return run(db.from('categories').insert(body).select().single());
  }

  if (path === '/api/taxonomy/subcategories' && method === 'POST') {
    return run(db.from('subcategories').insert(body).select().single());
  }

  if (path === '/api/knowledge') {
    return run(db.from('knowledge_items').select('*, categories(name), subcategories(name), organizations(name), users(full_name,email)').order('updated_at', { ascending: false }));
  }

  const knowledgeOne = path.match(/^\/api\/knowledge\/([^/]+)$/);
  if (knowledgeOne && method === 'GET') {
    return run(db.from('knowledge_items').select('*, categories(name), subcategories(name), organizations(name), users(full_name,email)').eq('id', knowledgeOne[1]).single());
  }

  if (path === '/api/knowledge' && method === 'POST') {
    const payload = { ...body, author_name: body.author_name || user.full_name || user.name || user.email || 'Usuario', created_by: user.id || null, organization_id: body.organization_id || user.organization_id || null, status: body.status || 'publicado' };
    delete payload.tags; delete payload.tags_text;
    return run(db.from('knowledge_items').insert(payload).select().single());
  }

  if (knowledgeOne && method === 'PUT') {
    const payload = { ...body, updated_at: new Date().toISOString() };
    delete payload.tags; delete payload.tags_text;
    return run(db.from('knowledge_items').update(payload).eq('id', knowledgeOne[1]).select().single());
  }

  const publishMatch = path.match(/^\/api\/knowledge\/([^/]+)\/publish$/);
  if (publishMatch && method === 'PATCH') {
    return run(db.from('knowledge_items').update({ status: 'publicado', published_at: new Date().toISOString() }).eq('id', publishMatch[1]).select().single());
  }

  const favMatch = path.match(/^\/api\/knowledge\/([^/]+)\/favorite$/);
  if (favMatch && method === 'POST') {
    if (!user.id) return { favorite: false };
    const { data: existing } = await db.from('favorites').select('*').eq('user_id', user.id).eq('item_id', favMatch[1]).maybeSingle();
    if (existing) { await run(db.from('favorites').delete().eq('id', existing.id)); return { favorite: false }; }
    const data = await run(db.from('favorites').insert({ user_id: user.id, item_id: favMatch[1] }).select().single());
    return { favorite: true, data };
  }

  if (path === '/api/knowledge/favorites/mine') {
    if (!user.id) return [];
    const rows = await run(db.from('favorites').select('knowledge_items(*, categories(name), subcategories(name), organizations(name), users(full_name,email))').eq('user_id', user.id));
    return (rows || []).map((row) => row.knowledge_items).filter(Boolean);
  }

  if (path === '/api/opportunities') {
    return run(db.from('volunteer_opportunities').select('*, organizations(name), applications(id)').order('created_at', { ascending: false }));
  }

  if (path === '/api/opportunities' && method === 'POST') {
    const payload = { ...body, created_by: user.id || null, organization_id: body.organization_id || user.organization_id || null };
    return run(db.from('volunteer_opportunities').insert(payload).select().single());
  }

  const oppMatch = path.match(/^\/api\/opportunities\/([^/]+)$/);
  if (oppMatch && method === 'PUT') return run(db.from('volunteer_opportunities').update(body).eq('id', oppMatch[1]).select().single());

  const applyMatch = path.match(/^\/api\/opportunities\/([^/]+)\/apply$/);
  if (applyMatch && method === 'POST') {
    if (!user.id) throw new Error('Inicia sesion demo antes de postular.');
    return run(db.from('applications').insert({ ...body, opportunity_id: applyMatch[1], volunteer_id: user.id, skills: String(body.skills || '').split(',').map(s => s.trim()).filter(Boolean) }).select().single());
  }

  if (path === '/api/opportunities/applications/mine') {
    if (!user.id) return [];
    return run(db.from('applications').select('*, volunteer_opportunities(title, organizations(name))').eq('volunteer_id', user.id).order('created_at', { ascending: false }));
  }

  const appsMatch = path.match(/^\/api\/opportunities\/([^/]+)\/applications$/);
  if (appsMatch && method === 'GET') {
    const opportunity = await run(db.from('volunteer_opportunities').select('*').eq('id', appsMatch[1]).single());
    const applications = await run(db.from('applications').select('*, users(full_name,email)').eq('opportunity_id', appsMatch[1]).order('created_at', { ascending: false }));
    return { opportunity, applications };
  }

  const appStatusMatch = path.match(/^\/api\/opportunities\/([^/]+)\/applications\/([^/]+)$/);
  if (appStatusMatch && method === 'PATCH') return run(db.from('applications').update({ status: body.status }).eq('id', appStatusMatch[2]).select().single());

  if (path === '/api/documents') {
    let q = db.from('user_documents').select('*, users(full_name,email,organization_id, organizations(name))').order('created_at', { ascending: false });
    if (user.role === 'voluntario' && user.id) q = q.eq('user_id', user.id);
    if (user.role === 'creador_ong' && user.organization_id) q = q.eq('organization_id', user.organization_id);
    return run(q);
  }

  if (path === '/api/documents' && method === 'POST') {
    return run(db.from('user_documents').insert({ ...body, user_id: user.id || null, organization_id: user.organization_id || null }).select().single());
  }

  const docStatus = path.match(/^\/api\/documents\/([^/]+)$/);
  if (docStatus && method === 'PATCH') return run(db.from('user_documents').update(body).eq('id', docStatus[1]).select().single());

  // cambio para el foro: rutas para temas (forum_topics) y respuestas (forum_replies).
  // El foro solo permite crear temas/respuestas a creador_ong y voluntario; el administrador
  // unicamente modera (fijar, cerrar/reabrir, eliminar). Esta validacion de rol se hace aqui
  // en el frontend porque el proyecto no usa una sesion real de Supabase Auth (ver auth.js).
  if (path.startsWith('/api/forum/topics') && method === 'GET' && !path.includes('/replies')) {
    const url = new URL(path, window.location.origin);
    const board = url.searchParams.get('board');
    const single = path.match(/^\/api\/forum\/topics\/([^/?]+)$/);
    if (single) {
      const topic = await run(db.from('forum_topics').select('*, organizations(name), users!created_by(full_name), forum_reactions(user_id)').eq('id', single[1]).single());
      const replies = await run(db.from('forum_replies').select('*, users!created_by(full_name)').eq('topic_id', single[1]).order('created_at', { ascending: true }));
      return { topic, replies };
    }
    let query = db.from('forum_topics').select('*, organizations(name), users!created_by(full_name), forum_replies(id), forum_reactions(user_id)').order('is_pinned', { ascending: false }).order('created_at', { ascending: false });
    if (board) query = query.eq('board', board);
    return run(query);
  }

  if (path === '/api/forum/topics' && method === 'POST') {
    if (!['creador_ong', 'voluntario'].includes(user.role)) throw new Error('Solo Creador ONG y Voluntario pueden crear temas en el foro.');
    const payload = { board: body.board, title: body.title, content: body.content, author_name: user.full_name || user.name || user.email || 'Usuario', created_by: user.id || null, organization_id: user.organization_id || null, status: 'abierto' };
    return run(db.from('forum_topics').insert(payload).select().single());
  }

  const forumModerateMatch = path.match(/^\/api\/forum\/topics\/([^/]+)$/);
  if (forumModerateMatch && method === 'PATCH') {
    if (user.role !== 'administrador') throw new Error('Solo el administrador puede moderar temas del foro.');
    const payload = { ...body };
    if ('is_pinned' in payload) { payload.pinned_by = user.id || null; payload.pinned_at = new Date().toISOString(); }
    if ('status' in payload) { payload.closed_by = user.id || null; payload.closed_at = new Date().toISOString(); }
    if ('is_removed' in payload) { payload.removed_by = user.id || null; payload.removed_at = new Date().toISOString(); }
    return run(db.from('forum_topics').update(payload).eq('id', forumModerateMatch[1]).select().single());
  }

  const forumReplyMatch = path.match(/^\/api\/forum\/topics\/([^/]+)\/replies$/);
  if (forumReplyMatch && method === 'POST') {
    if (!['creador_ong', 'voluntario'].includes(user.role)) throw new Error('Solo Creador ONG y Voluntario pueden responder en el foro.');
    const topic = await run(db.from('forum_topics').select('status,is_removed').eq('id', forumReplyMatch[1]).single());
    if (topic.status === 'cerrado' || topic.is_removed) throw new Error('Este tema esta cerrado y no admite nuevas respuestas.');
    const payload = { topic_id: forumReplyMatch[1], content: body.content, author_name: user.full_name || user.name || user.email || 'Usuario', created_by: user.id || null, organization_id: user.organization_id || null };
    return run(db.from('forum_replies').insert(payload).select().single());
  }

  const forumReplyModerateMatch = path.match(/^\/api\/forum\/replies\/([^/]+)$/);
  if (forumReplyModerateMatch && method === 'PATCH') {
    if (user.role !== 'administrador') throw new Error('Solo el administrador puede eliminar respuestas del foro.');
    const payload = { ...body, removed_by: user.id || null, removed_at: new Date().toISOString() };
    return run(db.from('forum_replies').update(payload).eq('id', forumReplyModerateMatch[1]).select().single());
  }

  // cambio para el foro (rediseno): reaccion "Util" (like) por tema. Toggle: si ya reacciono, se
  // quita su reaccion; si no, se agrega. Un usuario solo puede tener una reaccion por tema
  // (constraint unique(topic_id, user_id) en la tabla forum_reactions).
  const forumReactMatch = path.match(/^\/api\/forum\/topics\/([^/]+)\/react$/);
  if (forumReactMatch && method === 'POST') {
    if (!['creador_ong', 'voluntario'].includes(user.role)) throw new Error('Solo Creador ONG y Voluntario pueden reaccionar en el foro.');
    if (!user.id) throw new Error('No se pudo identificar tu usuario.');
    const existing = await run(db.from('forum_reactions').select('id').eq('topic_id', forumReactMatch[1]).eq('user_id', user.id).maybeSingle());
    if (existing) {
      await run(db.from('forum_reactions').delete().eq('id', existing.id));
      return { reacted: false };
    }
    await run(db.from('forum_reactions').insert({ topic_id: forumReactMatch[1], user_id: user.id }));
    return { reacted: true };
  }

  if (path.startsWith('/api/search')) {
    const url = new URL(path, window.location.origin);
    const q = (url.searchParams.get('q') || '').trim();
    let query = db.from('knowledge_items').select('*, categories(name), subcategories(name), organizations(name), users(full_name,email)').order('updated_at', { ascending: false });
    if (q) query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%,content.ilike.%${q}%,author_name.ilike.%${q}%`);
    return run(query);
  }

  if (path === '/api/analytics') {
    const [items, opportunities, applications, favorites] = await Promise.all([
      api('/api/knowledge').catch(() => []), api('/api/opportunities').catch(() => []), run(db.from('applications').select('*')).catch(() => []), run(db.from('favorites').select('*, knowledge_items(title)')).catch(() => [])
    ]);
    const by = (rows, keyFn) => Object.entries(rows.reduce((acc, row) => { const key = keyFn(row) || 'Sin dato'; acc[key] = (acc[key] || 0) + 1; return acc; }, {})).map(([label, value]) => ({ label, value }));
    return {
      topDocuments: items.map((i) => ({ label: i.title, value: i.view_count || i.views || 0 })).sort((a,b)=>b.value-a.value).slice(0,8),
      topCategories: by(items, (i) => i.categories?.name || i.category),
      noResultSearches: [],
      opportunities: opportunities.map((o) => ({ label: o.title, value: o.applications?.length || 0 })).slice(0,8),
      activityByRole: [], lowVisitedContent: items.map((i) => ({ label: i.title, value: i.view_count || 0 })).sort((a,b)=>a.value-b.value).slice(0,8),
      applicationsByStatus: by(applications, (a) => a.status), favoritesByItem: by(favorites, (f) => f.knowledge_items?.title || 'Favorito')
    };
  }


  if (path === '/api/profile/me' && method === 'PUT') {
    if (!user.id) {
      return { full_name: body.full_name, email: body.email, user_profiles: [{ phone: body.phone, photo_url: body.photo_url, organization_position: body.organization_position, skills: body.skills, bio: body.bio }] };
    }
    await run(db.from('users').update({ full_name: body.full_name, email: body.email }).eq('id', user.id).select().single());
    const profilePayload = { user_id: user.id, phone: body.phone || null, photo_url: body.photo_url || null, organization_position: body.organization_position || null, skills: body.skills || [], bio: body.bio || null };
    const { data: existing } = await db.from('user_profiles').select('id').eq('user_id', user.id).maybeSingle();
    if (existing) await run(db.from('user_profiles').update(profilePayload).eq('id', existing.id).select().single());
    else await run(db.from('user_profiles').insert(profilePayload).select().single());
    return { full_name: body.full_name, email: body.email, user_profiles: [profilePayload] };
  }

  if (path === '/api/audit') return run(db.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(50));

  if (path === '/api/analytics/events' && method === 'POST') return run(db.from('analytics_events').insert({ ...body, user_id: user.id || null, role_name: user.role || 'demo' }).select().single());

  throw new Error('Ruta no disponible en modo frontend: ' + path);
}

function byId(id) { return document.getElementById(id); }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char])); }
function normalizeItem(item) {
  return {
    ...item,
    category: item.category || item.categories?.name || 'Sin categoria',
    subcategory: item.subcategory || item.subcategories?.name || '',
    author: item.author || item.author_name || item.users?.full_name || 'Sin autor',
    organization: item.organization || item.organizations?.name || 'Sin ONG',
    type: item.type || item.document_type || 'articulo',
    date: item.date || (item.updated_at || item.created_at || '').slice(0, 10),
    roles: item.roles || item.visible_to_roles || [],
    tags: item.tags || []
  };
}
function normalizeOpportunity(opportunity) {
  return {
    ...opportunity,
    organization: opportunity.organization || opportunity.organizations?.name || 'ONG',
    applicants: opportunity.applications?.length || opportunity.applicants || 0,
    required_skills: opportunity.required_skills || opportunity.skills || []
  };
}
function canRead(item, user = currentUser()) {
  if (user.role === 'administrador') return true;
  if (user.role === 'creador_ong' && item.organization === user.organization) return true;
  return item.visibility === 'publico' || (item.roles || []).includes(user.role);
}
function canEdit(item, user = currentUser()) { return user.role === 'administrador' || (user.role === 'creador_ong' && item.organization === user.organization); }
function toast(message, type = 'ok') {
  let node = document.querySelector('.toast');
  if (!node) { node = document.createElement('div'); node.className = 'toast'; document.body.appendChild(node); }
  node.className = `toast ${type}`; node.textContent = message; setTimeout(() => node.classList.add('show'), 10); setTimeout(() => node.classList.remove('show'), 3200);
}

function layoutInit(activePage) {
  const user = currentUser();
  const allowed = navByRole[user.role] || navByRole.voluntario;
  document.querySelectorAll('[data-page]').forEach((link) => {
    const page = link.dataset.page;
    const item = link.closest('li') || link;
    item.hidden = !allowed.includes(page);
    link.classList.toggle('active', page === activePage);
  });
  const nav = document.querySelector('.nav-list');
  if (nav && user.role === 'administrador' && !nav.querySelector('[data-page="admin"]')) {
    nav.insertAdjacentHTML('beforeend', '<li><a class="nav-link" data-page="admin" href="admin.html"><span class="nav-icon">AD</span>Roles</a></li>');
  }
  document.querySelectorAll('[data-role-only]').forEach((node) => { const allowedRole = node.dataset.roleOnly.split(',').includes(user.role); node.hidden = !allowedRole; node.style.display = allowedRole ? (['BUTTON','A'].includes(node.tagName) ? 'inline-flex' : 'block') : 'none'; });
  document.querySelectorAll('[data-user-name]').forEach((node) => { node.textContent = user.name || user.full_name || user.email; });
  document.querySelectorAll('[data-user-role]').forEach((node) => { node.textContent = roleLabels[user.role] || user.role; });
  document.querySelectorAll('.user-card').forEach((card) => { if (!card.querySelector('[data-profile-button]')) card.insertAdjacentHTML('beforeend', '<button class="ghost" data-profile-button type="button" onclick="window.KMS.openProfileForm()">Mi perfil</button>'); });
  if (!allowed.includes(activePage) && activePage !== 'login') window.location.href = 'dashboard.html';
}

function renderTree(targetId = 'knowledgeTree', categories = demo.categories) {
  const target = byId(targetId); if (!target) return;
  target.innerHTML = categories.map((category) => {
    const categoryName = category.name || '';
    const categoryUrl = `conocimiento.html?categoria=${encodeURIComponent(categoryName)}`;
    const subs = category.subs || category.subcategories || [];
    return `<div class="tree-category"><a class="tree-filter" href="${categoryUrl}"><strong>${escapeHtml(categoryName)}</strong></a>${subs.map((sub) => {
      const subName = sub.name || sub;
      const url = `${categoryUrl}&subcategoria=${encodeURIComponent(subName)}`;
      return `<a href="${url}">${escapeHtml(subName)}</a>`;
    }).join('')}</div>`;
  }).join('');
}

function itemCard(raw) {
  const item = normalizeItem(raw); const user = currentUser();
  return `<article class="card item-card">
    ${item.image_url ? `<img class="card-image" src="${escapeHtml(item.image_url)}" alt="${escapeHtml(item.title)}">` : ''}
    <div class="meta-row"><span class="tag">${escapeHtml(item.category)}</span><span class="status ${item.status === 'publicado' ? 'published' : 'draft'}">${escapeHtml(item.status)}</span></div>
    <h3>${escapeHtml(item.title)}</h3><p class="muted">${escapeHtml(item.description)}</p>
    <div class="tag-row">${(item.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
    <div class="meta-row muted"><span>${escapeHtml(item.author)}</span><span>${escapeHtml(item.date)}</span><span>${escapeHtml(item.organization)}</span></div>
    <div class="actions-row"><button class="secondary" type="button" onclick="window.KMS.openArticle('${item.id}')">Ver detalle</button><button class="secondary" type="button" onclick="window.KMS.favoriteArticle('${item.id}')">Favorito</button>${canEdit(item, user) ? `<button type="button" onclick="window.KMS.openArticleForm('${item.id}')">Editar</button>` : ''}${user.role === 'administrador' && item.status !== 'publicado' ? `<button type="button" onclick="window.KMS.publishArticle('${item.id}')">Aprobar</button>` : ''}</div>
  </article>`;
}
function renderCards(targetId, items) { const target = byId(targetId); if (target) target.innerHTML = items.length ? items.map(itemCard).join('') : '<div class="empty">No hay contenidos para los filtros actuales.</div>'; }

let state = { items: [], opportunities: [], categories: [] };
async function loadKnowledge() { try { state.items = (await api('/api/knowledge')).map(normalizeItem); } catch { state.items = demo.items.map(normalizeItem); } return state.items; }
async function loadOpportunities() { try { state.opportunities = (await api('/api/opportunities')).map(normalizeOpportunity); } catch { state.opportunities = demo.opportunities.map(normalizeOpportunity); } return state.opportunities; }
async function loadTaxonomy() { try { state.categories = await api('/api/taxonomy'); } catch { state.categories = demo.categories; } return state.categories; }
function categoryOptions(selected = '') { return (state.categories.length ? state.categories : demo.categories).map((category) => `<option value="${escapeHtml(category.id || category.name)}" ${String(selected) === String(category.id || category.name) || selected === category.name ? 'selected' : ''}>${escapeHtml(category.name)}</option>`).join(''); }
function subcategoryOptions(categoryId = '', selected = '') { const cats = state.categories.length ? state.categories : demo.categories; const category = cats.find((cat) => String(cat.id || cat.name) === String(categoryId) || cat.name === categoryId) || cats[0] || {}; const subs = category.subcategories || category.subs || []; return subs.map((sub) => `<option value="${escapeHtml(sub.id || sub.name || sub)}" ${String(selected) === String(sub.id || sub.name || sub) || selected === (sub.name || sub) ? 'selected' : ''}>${escapeHtml(sub.name || sub)}</option>`).join(''); }

async function renderDashboard() {
  layoutInit('dashboard');
  const [items, opportunities, categories] = await Promise.all([loadKnowledge(), loadOpportunities(), loadTaxonomy()]);
  const visible = items.filter((item) => canRead(item));
  try {
    const analytics = await api('/api/analytics');
    if (byId('statDocs')) byId('statDocs').textContent = analytics.totals?.documents ?? visible.length;
    if (byId('statCategories')) byId('statCategories').textContent = categories.length;
    if (byId('statSearches')) byId('statSearches').textContent = analytics.totals?.searchesWithoutResults ?? 0;
    if (byId('statOpportunities')) byId('statOpportunities').textContent = analytics.totals?.opportunities ?? opportunities.length;
    renderMiniAnalytics(analytics);
  } catch {
    if (byId('statDocs')) byId('statDocs').textContent = visible.length;
    if (byId('statCategories')) byId('statCategories').textContent = categories.length || demo.categories.length;
    if (byId('statSearches')) byId('statSearches').textContent = '0';
    if (byId('statOpportunities')) byId('statOpportunities').textContent = opportunities.length;
  }
  renderCards('recentItems', visible.slice(0, 6));
}
async function renderKnowledge() {
  layoutInit('conocimiento');
  const categories = (await loadTaxonomy()).filter((category) => category.name !== 'Leyes para ONG');
  renderTree('knowledgeTree', categories);
  populateCategoryFilters(categories);
  document.dispatchEvent(new CustomEvent('kms:filters-ready'));
  const params = new URLSearchParams(location.search);
  const category = params.get('categoria');
  let items = (await loadKnowledge()).filter((item) =>
    canRead(item) && item.category !== 'Leyes para ONG' && item.type !== 'ley' && item.document_type !== 'ley'
  );
  if (category) items = items.filter((item) => item.category === category);
  renderCards('knowledgeItems', items);
}

function normalizeSearchText(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
function lawCard(raw) {
  const item = normalizeItem(raw); const user = currentUser();
  return `<article class="card item-card law-card" data-law-category="${escapeHtml(item.subcategory)}">
    <div class="meta-row"><span class="law-category">${escapeHtml(item.subcategory || 'Normativa')}</span><span class="status ${item.status === 'publicado' ? 'published' : 'draft'}">${escapeHtml(item.status)}</span></div>
    <h3>${escapeHtml(item.title)}</h3>
    <p class="muted">${escapeHtml(item.description)}</p>
    <div class="law-reference"><strong>Referencia:</strong> ${escapeHtml(item.legal_reference || 'Verificar norma vigente en la fuente oficial.')}</div>
    <div class="tag-row">${(item.tags || []).map((tag) => `<button class="tag tag-button" type="button" onclick="window.KMS.setLawTag('${escapeHtml(String(tag).replace(/'/g, "\\'"))}')">${escapeHtml(tag)}</button>`).join('')}</div>
    <div class="actions-row"><button class="secondary" type="button" onclick="window.KMS.openArticle('${item.id}')">Ver detalle</button>${item.source_url ? `<a class="button-link secondary" href="${escapeHtml(item.source_url)}" target="_blank" rel="noopener noreferrer">Fuente oficial</a>` : ''}${canEdit(item, user) ? `<button type="button" onclick="window.KMS.openArticleForm('${item.id}')">Editar</button>` : ''}</div>
  </article>`;
}
function setLawTag(tag = '') {
  state.activeLawTag = state.activeLawTag === tag ? '' : tag;
  renderLaws();
}
function setLawCategory(category = '') {
  const select = byId('lawSubcategoryFilter');
  if (select) select.value = category;
  renderLaws();
}
function renderLawTree(categories, activeCategory = '') {
  const target = byId('lawsTree'); if (!target) return;
  const lawsCategory = categories.find((category) => category.name === 'Leyes para ONG');
  const subs = lawsCategory?.subcategories || lawsCategory?.subs || [];
  target.innerHTML = `<div class="tree-category"><strong>Ruta legal ONG</strong><button type="button" class="tree-filter ${!activeCategory ? 'active' : ''}" onclick="window.KMS.setLawCategory('')">Todas las categorías</button>${subs.map((sub) => { const name = sub.name || sub; return `<button type="button" class="tree-filter ${activeCategory === name ? 'active' : ''}" onclick="window.KMS.setLawCategory('${escapeHtml(String(name).replace(/'/g, "\\'"))}')">${escapeHtml(name)}</button>`; }).join('')}</div>`;
}
async function renderLaws() {
  layoutInit('leyes');
  const categories = await loadTaxonomy();
  const lawsCategory = categories.find((category) => category.name === 'Leyes para ONG');
  const officialSubs = ['Constitución','SUNARP','APCI','SUNAT','Voluntariado','Protección de datos','Gobernanza'];
  if (lawsCategory && !(lawsCategory.subcategories || lawsCategory.subs || []).length) lawsCategory.subs = officialSubs;
  if (lawsCategory && lawsCategory.subcategories && !officialSubs.every((name) => lawsCategory.subcategories.some((sub) => (sub.name || sub) === name))) {
    lawsCategory.subcategories = officialSubs.map((name) => ({ name }));
  }

  const loaded = await loadKnowledge();
  const apiLaws = loaded.filter((item) => canRead(item) && (item.category === 'Leyes para ONG' || item.type === 'ley' || item.document_type === 'ley')).map(normalizeItem);
  const officialLaws = (window.ONG_LAWS || []).map(normalizeItem).filter((item) => canRead(item));
  const legalTitle = /^(constitución|ley|decreto|resolución)/i;
  const merged = new Map(officialLaws.map((item) => [normalizeSearchText(item.title), item]));
  apiLaws.filter((item) => legalTitle.test(item.title || '')).forEach((item) => {
    const key = normalizeSearchText(item.title); const official = merged.get(key);
    merged.set(key, official ? { ...official, ...item, tags: (item.tags || []).length ? item.tags : official.tags, source_url: item.source_url || official.source_url } : item);
  });
  const items = [...merged.values()];

  const sub = byId('lawSubcategoryFilter')?.value || '';
  const role = byId('lawRoleFilter')?.value || '';
  const query = normalizeSearchText(byId('lawSearch')?.value || '');
  const activeTag = state.activeLawTag || '';
  let filtered = items;
  if (sub) filtered = filtered.filter((item) => item.subcategory === sub);
  if (role) filtered = filtered.filter((item) => (item.roles || []).includes(role));
  if (activeTag) filtered = filtered.filter((item) => (item.tags || []).includes(activeTag));
  if (query) filtered = filtered.filter((item) => normalizeSearchText([
    item.title, item.description, item.content, item.legal_reference, item.subcategory,
    item.category, item.organization, item.author, ...(item.tags || [])
  ].join(' ')).includes(query));

  filtered.sort((a, b) => officialSubs.indexOf(a.subcategory) - officialSubs.indexOf(b.subcategory) || a.title.localeCompare(b.title, 'es'));

  const subSelect = byId('lawSubcategoryFilter');
  if (subSelect && !subSelect.dataset.loaded) {
    subSelect.innerHTML = '<option value="">Todas las categorías legales</option>' + officialSubs.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join('');
    subSelect.dataset.loaded = '1';
  }
  renderLawTree(categories.length ? categories : demo.categories, sub);

  const allTags = [...new Set(items.flatMap((item) => item.tags || []))].sort((a,b) => a.localeCompare(b,'es'));
  const tagsTarget = byId('lawTagFilters');
  if (tagsTarget) tagsTarget.innerHTML = `<button type="button" class="tag-filter ${!activeTag ? 'active' : ''}" onclick="window.KMS.setLawTag('')">Todas</button>${allTags.map((tag) => `<button type="button" class="tag-filter ${activeTag === tag ? 'active' : ''}" onclick="window.KMS.setLawTag('${escapeHtml(String(tag).replace(/'/g, "\\'"))}')">${escapeHtml(tag)}</button>`).join('')}`;

  const suggestions = document.querySelector('[data-suggestions]');
  if (suggestions) {
    const rawQuery = byId('lawSearch')?.value || '';
    const suggestionTerms = [...new Set(filtered.flatMap((item) => [
      item.title,
      item.author,
      ...(item.tags || [])
    ]).filter(Boolean))]
      .filter((term) => !query || normalizeSearchText(term).includes(query))
      .slice(0, 8);

    suggestions.innerHTML = suggestionTerms
      .map((term) => `<button type="button">${escapeHtml(term)}</button>`)
      .join('');
    suggestions.style.display = rawQuery && suggestionTerms.length ? 'block' : 'none';

    suggestions.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        const searchInput = byId('lawSearch');
        if (searchInput) searchInput.value = button.textContent;
        suggestions.style.display = 'none';
        renderLaws();
      });
    });
  }

  const countTarget = byId('lawResultCount');
  if (countTarget) countTarget.textContent = `Mostrando ${filtered.length} de ${items.length} normas`;
  const activeTarget = byId('lawActiveFilters');
  if (activeTarget) {
    const active = [sub && `Categoría: ${sub}`, role && `Rol: ${roleLabels[role] || role}`, activeTag && `Etiqueta: ${activeTag}`, query && `Búsqueda: ${byId('lawSearch').value}`].filter(Boolean);
    activeTarget.innerHTML = active.length ? active.map((text) => `<span>${escapeHtml(text)}</span>`).join('') + '<button type="button" class="clear-filters" onclick="window.KMS.clearLawFilters()">Limpiar filtros</button>' : '';
  }

  const target = byId('lawItems');
  if (target) target.innerHTML = filtered.length ? filtered.map(lawCard).join('') : '<div class="empty-state"><strong>No se encontraron normas.</strong><p>Cambia la búsqueda, categoría, rol o etiqueta para volver a mostrar resultados.</p></div>';

  // cambio para el chat IA: guarda una version resumida de las leyes visibles en este momento
  // (respetando los filtros actuales) para que el chat IA responda con base en esto y no invente.
  state.lawsChatContext = filtered.slice(0, 12).map((item) => ({
    title: item.title, description: item.description, content: item.content,
    legal_reference: item.legal_reference, source_url: item.source_url
  }));
}
function clearLawFilters() {
  if (byId('lawSearch')) byId('lawSearch').value = '';
  if (byId('lawSubcategoryFilter')) byId('lawSubcategoryFilter').value = '';
  if (byId('lawRoleFilter')) byId('lawRoleFilter').value = '';
  state.activeLawTag = '';
  renderLaws();
}

function openLawForm(id = '') {
  const user = currentUser();
  if (!['administrador','creador_ong'].includes(user.role)) { toast('Solo Administrador y Creador ONG pueden modificar leyes.', 'error'); return; }
  openArticleForm(id);
  setTimeout(() => {
    const form = byId('articleForm');
    if (!form) return;
    const category = state.categories.find((cat) => cat.name === 'Leyes para ONG');
    if (category && form.category_id) {
      form.category_id.value = category.id || category.name;
      form.category_id.dispatchEvent(new Event('change'));
    }
    if (form.document_type) form.document_type.value = 'ley';
    if (form.visibility) form.visibility.value = 'publico';
  }, 0);
}

async function renderDocuments() {
  layoutInit('documentos');
  const user = currentUser();
  const target = byId('documentsTable');
  if (!target) return;
  try {
    const docs = await api('/api/documents');
    target.innerHTML = docs.length ? docs.map((doc) => `<tr>
      <td><strong>${escapeHtml(doc.title)}</strong><br><span class="muted">${escapeHtml(doc.notes || '')}</span></td>
      <td>${escapeHtml(doc.document_type)}</td>
      <td>${escapeHtml(doc.users?.full_name || user.name || '')}</td>
      <td><a class="button secondary tiny" href="${escapeHtml(doc.file_url)}" target="_blank" rel="noopener">Abrir</a></td>
      <td><span class="status ${doc.status === 'validado' ? 'published' : doc.status === 'observado' ? 'rejected' : 'draft'}">${escapeHtml(doc.status)}</span></td>
      <td>${user.role !== 'voluntario' ? `<button class="secondary" onclick="window.KMS.updateDocumentStatus('${doc.id}','validado')">Validar</button><button class="secondary" onclick="window.KMS.updateDocumentStatus('${doc.id}','observado')">Observar</button>` : ''}</td>
    </tr>`).join('') : '<tr><td colspan="6"><div class="empty-state"><strong>No hay documentos registrados.</strong><p>Sube un CV, certificado o evidencia para que pueda ser revisada.</p></div></td></tr>';
  } catch (error) {
    target.innerHTML = '<tr><td colspan="6"><div class="empty-state">No se pudieron cargar documentos.</div></td></tr>';
  }
}

async function renderOpportunities() {
  layoutInit('oportunidades');
  const user = currentUser();
  const opportunities = await loadOpportunities();
  const target = byId('opportunityGrid');
  if (target) {
    target.innerHTML = opportunities.length ? opportunities.map((opportunity) => `<article class="card opportunity-card">
      ${opportunity.image_url ? `<img class="card-image" src="${escapeHtml(opportunity.image_url)}" alt="${escapeHtml(opportunity.title)}">` : ''}
      <div class="meta-row"><span class="tag">${escapeHtml(opportunity.modality)}</span><span class="tag">${escapeHtml(opportunity.location || 'Sin ubicacion')}</span><span class="status ${opportunity.status === 'abierta' ? 'published' : 'draft'}">${escapeHtml(opportunity.status || 'abierta')}</span></div>
      <h3>${escapeHtml(opportunity.title)}</h3><p class="muted">${escapeHtml(opportunity.organization)}</p><p>${escapeHtml(opportunity.description || '')}</p>
      <div class="tag-row">${(opportunity.required_skills || []).map((skill) => `<span class="tag">${escapeHtml(skill)}</span>`).join('')}</div>
      <div class="meta-row muted"><span>${escapeHtml(opportunity.schedule || 'Horario por coordinar')}</span><span>${escapeHtml(opportunity.slots ? `${opportunity.slots} cupos` : 'Cupos por definir')}</span></div>
      <div class="actions-row">
        ${user.role === 'voluntario' ? `<button class="secondary" type="button" onclick="window.KMS.openApplyForm('${opportunity.id}')">Postular</button>` : `<button class="secondary" type="button" onclick="window.KMS.loadApplicants('${opportunity.id}')">Ver postulantes</button><button type="button" onclick="window.KMS.openOpportunityForm('${opportunity.id}')">Editar</button>`}
      </div>
      <div class="meta-row"><strong>${opportunity.applicants} postulantes</strong></div>
    </article>`).join('') : '<div class="empty">No hay oportunidades disponibles para tu rol.</div>';
  }
  if (user.role === 'voluntario') {
    renderMyApplications();
    renderMyFavorites();
  }
}

function ensureModal() {
  let modal = byId('kmsModal');
  if (!modal) { document.body.insertAdjacentHTML('beforeend', '<div class="modal-backdrop" id="kmsModal" hidden><div class="modal-card"><button class="modal-close" type="button" onclick="window.KMS.closeModal()">×</button><div id="kmsModalBody"></div></div></div>'); modal = byId('kmsModal'); }
  return modal;
}
function openModal(html) { ensureModal(); byId('kmsModalBody').innerHTML = html; byId('kmsModal').hidden = false; }
function closeModal() { const modal = byId('kmsModal'); if (modal) modal.hidden = true; }
async function openArticle(id) {
  const item = normalizeItem(await api(`/api/knowledge/${id}`).catch(() => state.items.find((row) => String(row.id) === String(id)) || demo.items.find((row) => row.id === id)));
  const sourceButton = item.source_url ? `<a class="button secondary" href="${escapeHtml(item.source_url)}" target="_blank" rel="noopener noreferrer">Ver fuente oficial</a>` : '';
  openModal(`<h2>${escapeHtml(item.title)}</h2>${item.image_url ? `<img class="modal-image" src="${escapeHtml(item.image_url)}" alt="${escapeHtml(item.title)}">` : ''}<p class="muted">${escapeHtml(item.category)} · ${escapeHtml(item.author)} · ${escapeHtml(item.date)}</p><p class="detail-description">${escapeHtml(item.description)}</p>${item.legal_reference ? `<p class="muted"><strong>Referencia:</strong> ${escapeHtml(item.legal_reference)}</p>` : ''}${sourceButton}<div class="article-content rich-lines">${escapeHtml(item.content || '').replace(/\n/g, '<br>')}</div>`);
}
function openArticleForm(id = '') {
  const user = currentUser();
  if (!['administrador','creador_ong'].includes(user.role)) { toast('Solo Administrador y Creador ONG pueden crear o editar articulos.', 'error'); return; }
  const item = state.items.find((row) => String(row.id) === String(id)) || {};
  if (!state.categories.length) { loadTaxonomy().then(() => openArticleForm(id)); return; }
  const selectedCategory = item.category_id || item.category || (state.categories[0]?.id || '');
  openModal(`<h2>${id ? 'Editar articulo' : 'Crear articulo'}</h2><form id="articleForm" class="stack-form">
    <input name="title" required placeholder="Titulo" value="${escapeHtml(item.title || '')}">
    <textarea name="description" required placeholder="Descripcion breve">${escapeHtml(item.description || '')}</textarea>
    <textarea name="content" required placeholder="Contenido completo">${escapeHtml(item.content || '')}</textarea>
    <div class="form-grid two"><label>Categoria<select name="category_id" id="articleCategory" required>${categoryOptions(selectedCategory)}</select></label><label>Subcategoria<select name="subcategory_id" id="articleSubcategory"><option value="">Sin subcategoria</option>${subcategoryOptions(selectedCategory, item.subcategory_id || item.subcategory || '')}</select></label></div>
    <input name="tags_text" placeholder="Etiquetas separadas por coma" value="${escapeHtml((item.tags || []).join(', '))}">
    <input name="image_url" placeholder="URL de imagen destacada" value="${escapeHtml(item.image_url || '')}">
    <input name="source_url" placeholder="URL de fuente oficial o pagina de referencia" value="${escapeHtml(item.source_url || '')}">
    <textarea name="legal_reference" placeholder="Referencia legal o fuente informativa, si aplica">${escapeHtml(item.legal_reference || '')}</textarea>
    <div class="form-grid two"><label>Visibilidad<select name="visibility"><option value="publico">Publico</option><option value="interno">Interno</option><option value="restringido">Restringido</option></select></label><label>Tipo<select name="document_type"><option value="articulo">Articulo</option><option value="guia">Guia</option><option value="reporte">Reporte</option><option value="plantilla">Plantilla</option><option value="politica">Politica</option><option value="documento">Documento</option><option value="ley">Ley / normativa ONG</option></select></label></div>
    <label>Roles permitidos<select name="visible_to_roles" multiple><option value="administrador" selected>Administrador</option><option value="creador_ong" selected>Creador ONG</option><option value="voluntario" selected>Voluntario</option></select></label>
    <button type="submit">Guardar</button>
  </form>`);
  const form = byId('articleForm');
  form.visibility.value = item.visibility || 'publico';
  form.document_type.value = item.document_type || item.type || 'articulo';
  const roleSelect = form.visible_to_roles;
  [...roleSelect.options].forEach((option) => { option.selected = (item.roles || item.visible_to_roles || ['administrador','creador_ong','voluntario']).includes(option.value); });
  byId('articleCategory').addEventListener('change', (event) => { byId('articleSubcategory').innerHTML = '<option value="">Sin subcategoria</option>' + subcategoryOptions(event.target.value); });
  form.onsubmit = (event) => saveArticle(event, id);
}
async function saveArticle(event, id) { event.preventDefault(); const formData = new FormData(event.target); const data = Object.fromEntries(formData); data.visible_to_roles = formData.getAll('visible_to_roles'); data.tags = String(data.tags_text || '').split(',').map((tag) => tag.trim()).filter(Boolean); delete data.tags_text; if (!data.subcategory_id) data.subcategory_id = null; try { await api(id ? `/api/knowledge/${id}` : '/api/knowledge', { method: id ? 'PUT' : 'POST', body: JSON.stringify(data) }); toast('Articulo guardado correctamente.'); closeModal(); if (document.getElementById('lawItems')) renderLaws(); else renderKnowledge(); } catch (error) { toast(error.message, 'error'); } }
async function publishArticle(id) { try { await api(`/api/knowledge/${id}/publish`, { method: 'PATCH' }); toast('Articulo aprobado y publicado.'); if (document.getElementById('lawItems')) renderLaws(); else renderKnowledge(); } catch (error) { toast(error.message, 'error'); } }
async function favoriteArticle(id) { try { await api(`/api/knowledge/${id}/favorite`, { method: 'POST' }); toast('Favoritos actualizado.'); } catch (error) { toast(error.message, 'error'); } }
async function renderMyApplications() {
  const target = byId('myApplicationsList');
  if (!target) return;
  try {
    const apps = await api('/api/opportunities/applications/mine');
    target.innerHTML = apps.length ? apps.map((app) => {
      const op = app.volunteer_opportunities || {};
      const org = op.organizations?.name || 'ONG';
      return `<article class="mini-card"><div><strong>${escapeHtml(op.title || 'Oportunidad')}</strong><p class="muted">${escapeHtml(org)} · ${escapeHtml(op.modality || '')} · ${escapeHtml(op.location || '')}</p><p>${escapeHtml(app.motivation || '')}</p></div><span class="status ${app.status === 'aceptada' ? 'published' : 'draft'}">${escapeHtml(app.status)}</span></article>`;
    }).join('') : '<p class="muted">Aun no tienes postulaciones registradas.</p>';
  } catch (error) {
    target.innerHTML = '<p class="muted">No se pudieron cargar tus postulaciones.</p>';
  }
}

async function renderMyFavorites() {
  const target = byId('myFavoritesList');
  if (!target) return;
  try {
    const favorites = await api('/api/knowledge/favorites/mine');
    target.innerHTML = favorites.length ? favorites.map((fav) => {
      const item = normalizeItem(fav.knowledge_items || fav);
      return `<article class="mini-card"><div><strong>${escapeHtml(item.title)}</strong><p class="muted">${escapeHtml(item.category)} · ${escapeHtml(item.author)}</p></div><button class="secondary" type="button" onclick="window.KMS.openArticle('${item.id}')">Ver</button></article>`;
    }).join('') : '<p class="muted">Todavia no guardaste favoritos.</p>';
  } catch (error) {
    target.innerHTML = '<p class="muted">No se pudieron cargar tus favoritos.</p>';
  }
}

function openOpportunityForm(id = '') {
  const opportunity = state.opportunities.find((row) => String(row.id) === String(id)) || {};
  openModal(`<h2>${id ? 'Editar oportunidad' : 'Nueva oportunidad'}</h2><form id="opportunityForm" class="stack-form">
    <input name="title" required placeholder="Titulo de la oportunidad" value="${escapeHtml(opportunity.title || '')}">
    <textarea name="description" required placeholder="Descripcion, actividades y requisitos">${escapeHtml(opportunity.description || '')}</textarea>
    <input name="location" placeholder="Ubicacion" value="${escapeHtml(opportunity.location || '')}">
    <select name="modality"><option value="presencial">Presencial</option><option value="remota">Remota</option><option value="hibrida">Hibrida</option></select>
    <input name="required_skills" placeholder="Habilidades separadas por coma" value="${escapeHtml((opportunity.required_skills || []).join(', '))}">
    <input name="schedule" placeholder="Horario" value="${escapeHtml(opportunity.schedule || '')}">
    <input name="duration" placeholder="Duracion" value="${escapeHtml(opportunity.duration || '')}">
    <input name="slots" type="number" min="1" placeholder="Cupos" value="${escapeHtml(opportunity.slots || '')}">
    <input name="starts_at" type="date" value="${escapeHtml(opportunity.starts_at || '')}">
    <input name="ends_at" type="date" value="${escapeHtml(opportunity.ends_at || '')}">
    <input name="image_url" placeholder="URL de imagen destacada" value="${escapeHtml(opportunity.image_url || '')}">
    <select name="status"><option value="abierta">Abierta</option><option value="pausada">Pausada</option><option value="cerrada">Cerrada</option></select>
    <button type="submit">Guardar oportunidad</button>
  </form>`);
  const form = byId('opportunityForm');
  if (form.modality) form.modality.value = opportunity.modality || 'hibrida';
  if (form.status) form.status.value = opportunity.status || 'abierta';
  form.onsubmit = (event) => saveOpportunity(event, id);
}

async function saveOpportunity(event, id) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  data.required_skills = String(data.required_skills || '').split(',').map((skill) => skill.trim()).filter(Boolean);
  data.slots = data.slots ? Number(data.slots) : null;
  try {
    await api(id ? `/api/opportunities/${id}` : '/api/opportunities', { method: id ? 'PUT' : 'POST', body: JSON.stringify(data) });
    toast('Oportunidad guardada correctamente.');
    closeModal();
    renderOpportunities();
  } catch (error) { toast(error.message, 'error'); }
}
function openApplyForm(id) { openModal(`<h2>Postular a oportunidad</h2><form id="applyForm" class="stack-form"><input name="applicant_name" required placeholder="Nombre completo"><input name="applicant_email" required type="email" placeholder="Correo"><input name="phone" placeholder="Telefono"><input name="document_number" placeholder="Documento/DNI"><input name="age" type="number" min="14" max="120" placeholder="Edad"><input name="availability" placeholder="Disponibilidad"><textarea name="experience" placeholder="Experiencia previa"></textarea><input name="skills" placeholder="Habilidades separadas por coma"><textarea name="motivation" required placeholder="Motivacion"></textarea><label class="check"><input type="checkbox" name="consent_data" required> Acepto el uso de mis datos para gestionar esta postulacion.</label><button type="submit">Enviar postulacion</button></form>`); byId('applyForm').onsubmit = (event) => submitApplication(event, id); }
async function submitApplication(event, id) { event.preventDefault(); const data = Object.fromEntries(new FormData(event.target)); data.consent_data = Boolean(data.consent_data); data.age = data.age ? Number(data.age) : null; try { await api(`/api/opportunities/${id}/apply`, { method: 'POST', body: JSON.stringify(data) }); toast('Postulacion enviada correctamente.'); closeModal(); renderOpportunities(); } catch (error) { toast(error.message, 'error'); } }
async function loadApplicants(id) { try { const payload = await api(`/api/opportunities/${id}/applications`); openModal(`<h2>Postulantes: ${escapeHtml(payload.opportunity.title)}</h2><div class="table-wrap"><table><thead><tr><th>Nombre</th><th>Contacto</th><th>Disponibilidad</th><th>Datos</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${payload.applications.map((app) => `<tr><td>${escapeHtml(app.applicant_name || app.users?.full_name)}</td><td>${escapeHtml(app.applicant_email || app.users?.email)}<br>${escapeHtml(app.phone || '')}</td><td>${escapeHtml(app.availability || '')}</td><td>${escapeHtml(app.document_number || '')}<br>${escapeHtml(app.age ? `${app.age} años` : '')}</td><td><span class="status draft">${escapeHtml(app.status)}</span></td><td><button onclick="window.KMS.updateApplication('${id}','${app.id}','revision')">Revision</button><button class="secondary" onclick="window.KMS.updateApplication('${id}','${app.id}','entrevista')">Entrevista</button><button onclick="window.KMS.updateApplication('${id}','${app.id}','aceptada')">Aceptar</button><button class="secondary" onclick="window.KMS.updateApplication('${id}','${app.id}','rechazada')">Rechazar</button><button class="secondary" onclick="window.KMS.updateApplication('${id}','${app.id}','finalizada')">Finalizar</button></td></tr>`).join('')}</tbody></table></div>`); } catch (error) { toast(error.message, 'error'); } }
async function updateApplication(opportunityId, applicationId, status) { try { await api(`/api/opportunities/${opportunityId}/applications/${applicationId}`, { method: 'PATCH', body: JSON.stringify({ status }) }); toast('Estado actualizado.'); loadApplicants(opportunityId); } catch (error) { toast(error.message, 'error'); } }


function populateSubcategoryFilters(categories = [], selectedCategory = '') {
  document.querySelectorAll('[data-filter-subcategory]').forEach((select) => {
    const requested = new URLSearchParams(location.search).get('subcategoria') || select.value;
    const source = selectedCategory
      ? categories.filter((category) => category.name === selectedCategory)
      : categories;
    const names = [...new Set(source.flatMap((category) => (category.subcategories || category.subs || []).map((sub) => sub.name || sub)).filter(Boolean))];
    select.innerHTML = '<option value="">Todas las subcategorias</option>' + names.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join('');
    if (names.includes(requested)) select.value = requested;
  });
}

function populateCategoryFilters(categories = []) {
  document.querySelectorAll('[data-filter-category]').forEach((select) => {
    const requested = new URLSearchParams(location.search).get('categoria') || select.value;
    select.innerHTML = '<option value="">Todas las categorias</option>' + categories.map((category) => `<option value="${escapeHtml(category.name)}">${escapeHtml(category.name)}</option>`).join('');
    if (categories.some((category) => category.name === requested)) select.value = requested;
    if (!select.dataset.taxonomyBound) {
      select.addEventListener('change', () => {
        populateSubcategoryFilters(categories, select.value);
        document.querySelector('[data-filter-subcategory]')?.dispatchEvent(new Event('change', { bubbles: true }));
      });
      select.dataset.taxonomyBound = 'true';
    }
    populateSubcategoryFilters(categories, select.value);
  });
}

function renderMiniAnalytics(data = {}) {
  const target = byId('dashboardAnalytics');
  if (!target) return;
  const totals = data.totals || {};
  target.innerHTML = `
    <article class="mini-card"><strong>${Number(totals.applications || 0)}</strong><span class="muted">Postulaciones</span></article>
    <article class="mini-card"><strong>${Number(totals.favorites || 0)}</strong><span class="muted">Favoritos</span></article>
    <article class="mini-card"><strong>${Number(totals.events || 0)}</strong><span class="muted">Eventos registrados</span></article>
  `;
}

async function openTaxonomyManager() {
  const user = currentUser();
  if (!['administrador','creador_ong'].includes(user.role)) { toast('Solo Administrador y Creador ONG pueden gestionar taxonomia.', 'error'); return; }
  const categories = await loadTaxonomy();
  openModal(`<h2>Gestionar taxonomia</h2>
    <form id="categoryForm" class="stack-form compact-form"><h3>Nueva categoria</h3><input name="name" required placeholder="Nombre de categoria"><input name="description" placeholder="Descripcion"><input name="icon" placeholder="Icono corto, ej. VO"><button type="submit">Crear categoria</button></form>
    <form id="subcategoryForm" class="stack-form compact-form"><h3>Nueva subcategoria</h3><select name="category_id" required>${categoryOptions()}</select><input name="name" required placeholder="Nombre de subcategoria"><input name="description" placeholder="Descripcion"><button type="submit">Crear subcategoria</button></form>
    <div class="taxonomy-admin">${categories.map((category) => `<article class="mini-card"><div><strong>${escapeHtml(category.name)}</strong><p class="muted">${escapeHtml(category.description || '')}</p><div class="tag-row">${(category.subcategories || []).map((sub) => `<span class="tag">${escapeHtml(sub.name)}</span>`).join('')}</div></div></article>`).join('')}</div>`);
  byId('categoryForm').onsubmit = async (event) => { event.preventDefault(); try { await api('/api/taxonomy/categories', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(event.target))) }); toast('Categoria creada.'); closeModal(); renderKnowledge(); } catch (error) { toast(error.message, 'error'); } };
  byId('subcategoryForm').onsubmit = async (event) => { event.preventDefault(); try { await api('/api/taxonomy/subcategories', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(event.target))) }); toast('Subcategoria creada.'); closeModal(); renderKnowledge(); } catch (error) { toast(error.message, 'error'); } };
}

async function trackFrontendEvent(event_type, entity_type, entity_id, metadata = {}) {
  try { await api('/api/analytics/events', { method: 'POST', body: JSON.stringify({ event_type, entity_type, entity_id, metadata }) }); } catch { /* silencioso para no bloquear UX */ }
}

function openProfileForm() {
  const user = currentUser();
  const profile = user.profile || user.user_profiles?.[0] || {};
  openModal(`<h2>Mi perfil</h2><form id="profileForm" class="stack-form">
    <input name="full_name" required placeholder="Nombre completo" value="${escapeHtml(user.name || user.full_name || '')}">
    <input name="email" type="email" required placeholder="Correo" value="${escapeHtml(user.email || '')}">
    <input name="phone" placeholder="Telefono" value="${escapeHtml(profile.phone || user.phone || '')}">
    <input name="photo_url" placeholder="URL de foto de perfil" value="${escapeHtml(profile.photo_url || user.photo_url || '')}">
    <input name="organization_position" placeholder="Cargo / area" value="${escapeHtml(profile.organization_position || '')}">
    <input name="skills" placeholder="Habilidades separadas por coma" value="${escapeHtml((profile.skills || user.skills || []).join ? (profile.skills || user.skills || []).join(', ') : '')}">
    <textarea name="bio" placeholder="Descripcion breve">${escapeHtml(profile.bio || user.bio || '')}</textarea>
    <button type="submit">Guardar perfil</button>
  </form>`);
  byId('profileForm').onsubmit = saveProfile;
}
async function saveProfile(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  data.skills = String(data.skills || '').split(',').map((skill) => skill.trim()).filter(Boolean);
  try {
    const updated = await api('/api/profile/me', { method: 'PUT', body: JSON.stringify(data) });
    const user = currentUser();
    const merged = { ...user, name: updated.full_name || data.full_name, full_name: updated.full_name || data.full_name, email: updated.email || data.email, profile: updated.user_profiles?.[0] || data };
    localStorage.setItem('kms_user', JSON.stringify(merged));
    toast('Perfil actualizado correctamente.');
    closeModal();
    layoutInit(document.querySelector('.nav-link.active')?.dataset.page || 'dashboard');
  } catch (error) { toast(error.message, 'error'); }
}
function openDocumentForm() {
  openModal(`<h2>Subir documento</h2><form id="documentForm" class="stack-form">
    <input name="title" required placeholder="Titulo del documento">
    <select name="document_type"><option value="cv">CV</option><option value="certificado">Certificado</option><option value="portafolio">Portafolio</option><option value="identidad">Identidad</option><option value="permiso">Permiso</option><option value="otro">Otro</option></select>
    <input name="file_url" required placeholder="URL del archivo en Supabase Storage o Drive">
    <select name="visibility"><option value="privado">Privado</option><option value="ong">Visible para ONG</option><option value="admin">Visible para administracion</option></select>
    <textarea name="notes" placeholder="Notas breves"></textarea>
    <button type="submit">Guardar documento</button>
  </form>`);
  byId('documentForm').onsubmit = saveDocument;
}
async function saveDocument(event) {
  event.preventDefault();
  try {
    await api('/api/documents', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(event.target))) });
    toast('Documento registrado correctamente.');
    closeModal();
    renderDocuments();
  } catch (error) { toast(error.message, 'error'); }
}
async function updateDocumentStatus(id, status) {
  try {
    await api(`/api/documents/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    toast('Documento actualizado.');
    renderDocuments();
  } catch (error) { toast(error.message, 'error'); }
}


window.KMS = { demo, currentUser, canRead, escapeHtml, layoutInit, renderDashboard, renderKnowledge, renderLaws, setLawTag, setLawCategory, clearLawFilters, openLawForm, renderDocuments, renderOpportunities, renderCards, api, toast, openModal, closeModal, openArticle, openArticleForm, saveArticle, publishArticle, favoriteArticle, renderMyApplications, renderMyFavorites, openOpportunityForm, saveOpportunity, openApplyForm, submitApplication, loadApplicants, updateApplication, loadTaxonomy, openTaxonomyManager, trackFrontendEvent, openProfileForm, saveProfile, openDocumentForm, saveDocument, updateDocumentStatus,
  // cambio para el chat IA: getter de las leyes visibles/filtradas, usado por public/js/legal-chat.js
  getLawsChatContext: () => state.lawsChatContext || [],
  // cambio para el foro: se expone para reutilizarla en la busqueda del foro (public/js/forum.js)
  normalizeSearchText };
