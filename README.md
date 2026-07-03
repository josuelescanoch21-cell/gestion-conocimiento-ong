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
│   │   └── search.js
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── admin.html
│   ├── documentos.html
│   ├── oportunidades.html
│   ├── conocimiento.html
│   ├── analytics.html
│   └── leyes.html
├── database/
│   ├── schema.sql
│   ├── seed_final.sql
│   └── frontend_policies.sql
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

Railway solo servirá archivos estáticos. No se usa backend Express ni rutas reales `/api`.

Comando de inicio:

```txt
npm start
```

El archivo que levanta el sitio es:

```txt
static-server.js
```

## Credenciales demo

Las credenciales dependen de los usuarios insertados en `seed_final.sql`.

## Nota importante

El archivo `public/js/app.js` contiene una función interna llamada `api()` para reutilizar la lógica antigua del frontend, pero ya no hace llamadas al backend de Railway. Esa función consulta Supabase directamente desde el navegador mediante `supabase-js`.
