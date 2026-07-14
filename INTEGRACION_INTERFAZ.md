# Integración de interfaz tipo dashboard

## 1. Análisis de la referencia

La interfaz utiliza un **layout administrativo de dos zonas**:

- Sidebar fijo y vertical de aproximadamente 250 px.
- Área de trabajo flexible con barra superior, encabezado y paneles.
- Fondo gris muy claro para separar visualmente las tarjetas blancas.
- Cuadrícula de cuatro indicadores en escritorio.
- Paneles analíticos en dos columnas.
- Tarjetas con bordes redondeados, borde tenue y sombra suave.
- Jerarquía tipográfica compacta: títulos oscuros, textos secundarios grises y acentos verdes/azules.

## 2. Adaptación realizada

La temática comercial de la imagen no fue copiada. La estructura se adaptó al sistema de Gestión del Conocimiento para ONG:

- Indicadores de documentos, categorías, búsquedas y voluntariados.
- Panel de distribución del conocimiento.
- Actividad de la plataforma.
- Evolución de publicaciones y consultas.
- Resumen operativo obtenido por la lógica existente.
- Actualizaciones recientes cargadas por las funciones actuales.

## 3. Compatibilidad conservada

Se conservaron:

- IDs consumidos por JavaScript: `statDocs`, `statCategories`, `statSearches`, `statOpportunities`, `dashboardAnalytics` y `recentItems`.
- Funciones de `app.js`.
- Consultas al backend y Supabase.
- Control de roles mediante `data-role-only` y `data-page`.
- Autenticación y cierre de sesión.
- Formularios, modales, eventos y búsquedas existentes.

## 4. Archivos nuevos

### `public/css/dashboard-theme.css`
Capa visual modular aplicada después de `styles.css`. Contiene:

- Nuevo sidebar.
- Dashboard responsive.
- Tarjetas de indicadores.
- Gráficos visuales en SVG/CSS.
- Adaptación de tarjetas, paneles y módulos existentes.
- Menú móvil y puntos de quiebre.

### `public/js/ui-shell.js`
Añade únicamente comportamiento de interfaz:

- Apertura y cierre del menú móvil.
- Cierre del menú al navegar.
- Inicial del usuario en el avatar.
- Apertura del formulario de voluntariado cuando se usa `?crear=1`.

No modifica Supabase ni la lógica de negocio.

## 5. Archivos HTML modificados

Se actualizó el sidebar y se enlazaron los dos módulos nuevos en:

- `public/dashboard.html`
- `public/conocimiento.html`
- `public/leyes.html`
- `public/documentos.html`
- `public/oportunidades.html`
- `public/foro.html`
- `public/analytics.html`
- `public/admin.html`

Además, `dashboard.html` recibió la nueva composición visual completa manteniendo sus IDs funcionales.

## 6. Navegación adaptada

- Inicio → `dashboard.html`
- Voluntariados → `oportunidades.html`
- Publicar voluntariado → `oportunidades.html?crear=1`
- Conocimiento → `conocimiento.html`
- Leyes → `leyes.html`
- Reviews → `analytics.html`
- Mis documentos → `documentos.html`
- Usuarios → `admin.html`
- Permisos → `admin.html#permisos`
- Foro → `foro.html`
- Chat IA → `conocimiento.html#chat-conocimiento`

Los elementos administrativos continúan limitados por rol.

## 7. Responsive

- Más de 1150 px: cuatro indicadores y paneles en dos columnas.
- Entre 820 px y 1150 px: indicadores en dos columnas y paneles apilados.
- Menos de 820 px: sidebar deslizable con botón móvil.
- Menos de 600 px: tarjetas e indicadores en una sola columna.

## 8. Verificación realizada

- Validación sintáctica de `ui-shell.js` con Node.
- Lectura de los 10 archivos HTML mediante parser.
- Conservación de rutas, scripts e IDs principales.
