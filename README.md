# Plataforma de Gestión del Conocimiento para ONG

Proyecto universitario simplificado a **Frontend + Supabase directo**.

## Tecnologías

- HTML, CSS y JavaScript puro
- Supabase PostgreSQL
- Railway solo como hosting del frontend estático
- GitHub como repositorio

## Estructura final

```txt
GC/
├── public/
│   ├── css/
│   ├── js/
│   │   ├── supabase-config.js
│   │   ├── app.js
│   │   ├── auth.js
│   │   ├── analytics.js
│   │   ├── audit.js
│   │   ├── search.js
│   │   └── forum.js
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── admin.html
│   ├── documentos.html
│   ├── oportunidades.html
│   ├── conocimiento.html
│   ├── analytics.html
│   ├── leyes.html
│   └── foro.html
├── database/
│   ├── schema.sql
│   ├── seed_final.sql
│   ├── frontend_policies.sql
│   └── migration_legal_taxonomy.sql
├── package.json
├── package-lock.json
├── static-server.js
├── Procfile
└── README.md
```

## Configuración de Supabase

1. En Supabase ejecuta primero:

```txt
database/schema.sql
```

2. Luego ejecuta:

```txt
database/seed_final.sql
```

3. Finalmente ejecuta:

```txt
database/frontend_policies.sql
```

## Configuración del frontend

Abre:

```txt
public/js/supabase-config.js
```

Coloca tu URL y tu Publishable Key:

```js
window.KMS_SUPABASE_URL = 'https://TU-PROYECTO.supabase.co';
window.KMS_SUPABASE_ANON_KEY = 'sb_publishable_TU_CLAVE_PUBLICA';
```

No colocar aquí la Secret Key ni Service Role Key.

## Despliegue en Railway

Railway sirve los archivos estáticos del frontend. La única ruta de backend real es
`POST /api/ai/legal-chat` (ver sección "Asistente legal con IA" más abajo); todo lo demás
sigue siendo Supabase directo desde el navegador, sin backend Express ni más rutas `/api`.

Comando de inicio:

```txt
npm start
```

El archivo que levanta el sitio es:

```txt
static-server.js
```

## Asistente legal con IA (cambio para el chat IA)

Panel de chat fijo dentro de **Leyes ONG**, al costado de los filtros/resultados. Responde
preguntas basándose únicamente en las leyes visibles/filtradas en esa página (no inventa
normas), usando el modelo gratuito **Gemini 2.5 Flash** de Google.

- **Quién lo ve**: solo `creador_ong` y `voluntario`. El administrador no participa (mismo
  criterio que en el Foro: modera, no conversa).
- **Dónde vive la lógica**: `public/js/legal-chat.js` (frontend) y `static-server.js`
  (backend mínimo que llama a Gemini sin exponer la key al navegador).
- **No se guarda nada**: las preguntas y respuestas no se persisten en Supabase ni en logs;
  cada consulta es efímera.
- **Variable de entorno requerida**: `GEMINI_API_KEY`.
  1. Crea una key gratis (sin tarjeta) en <https://aistudio.google.com/apikey>.
  2. En Railway: pestaña **Variables** del servicio → agrega `GEMINI_API_KEY` con tu key.
  3. En local: expórtala antes de correr `npm start`, por ejemplo
     `GEMINI_API_KEY=tu_key npm start` (no la subas al repositorio).
  - Variable opcional `GEMINI_MODEL` si más adelante quieres cambiar de modelo
    (por defecto usa `gemini-3.1-flash-lite`, GA y gratuito; evita `gemini-2.5-flash`,
    que desde el 9 de julio de 2026 devuelve error 404 en proyectos/keys nuevos aunque
    su retiro oficial es recién en octubre — bug reportado en el foro de Google).
- **Límite de uso**: el servidor limita a 8 preguntas por minuto por IP para no agotar la
  cuota gratuita compartida de Gemini.
- **Si se agota la cuota gratuita** (Gemini responde 429): la cuota es del proyecto/key, no
  por persona, así que se comparte entre todos los que usan la app. Cuando se agota, el chat
  muestra un aviso claro en español en vez del error técnico de Google, y sugiere reintentar
  más tarde (el límite diario resetea a medianoche hora de Los Ángeles). Si necesitas más
  cupo de forma permanente, en Google AI Studio puedes activar facturación (pago por uso,
  muy barato) sin cambiar nada del código.

## Foro de la comunidad

Nueva seccion `foro.html` con dos tableros: **Buenas practicas** y **Malas practicas**.

- Creador ONG y Voluntario pueden crear temas y responder.
- Administrador solo modera: fijar/desfijar, cerrar/reabrir y eliminar (soft-delete) temas y respuestas. No crea temas ni responde.
- Tablas: `forum_topics` y `forum_replies` (ver `database/schema.sql`, seccion "Iteracion 8 - Foro de la comunidad").
- Politicas para el modo demo (Publishable Key, sin login real) en `database/frontend_policies.sql`.
- Logica de UI y llamadas a Supabase en `public/js/forum.js`, ademas de las rutas `/api/forum/...` agregadas a la funcion `api()` de `public/js/app.js`.

## Credenciales demo

Las credenciales dependen de los usuarios insertados en `seed_final.sql`.

## Nota importante

El archivo `public/js/app.js` contiene una función interna llamada `api()` para reutilizar la lógica antigua del frontend, pero ya no hace llamadas al backend de Railway. Esa función consulta Supabase directamente desde el navegador mediante `supabase-js`.

## Actualización de taxonomía legal

La página `public/leyes.html` incluye un catálogo de 30 normas reales relacionadas con la creación y gestión de una ONG en Perú, búsqueda sin tildes, filtros combinados por categoría, rol y etiqueta, contador de resultados y categorías vacías ocultas.

Para actualizar una base de datos Supabase que ya fue creada con el seed anterior, ejecuta en el editor SQL:

```sql
-- contenido de database/migration_legal_taxonomy.sql
```

El archivo elimina únicamente los registros de la categoría `Leyes para ONG` y los reemplaza por el catálogo nuevo. No elimina documentos de las demás categorías.


## Descripciones legales
Las 30 fichas muestran en el campo de descripción un **artículo destacado (paráfrasis)** de la norma, con su número de artículo cuando corresponde. No se presenta como cita literal; debe contrastarse con la fuente oficial enlazada y con la versión vigente de la norma.
