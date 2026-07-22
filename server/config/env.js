// Config centralizada: todo lo que el servidor lee de variables de entorno pasa por aqui,
// para no tener `process.env.X` regado por las rutas/servicios.
//
// GEMINI_API_KEY nunca se manda al navegador: vive solo aqui, en el servidor (Railway o .env
// local). Se obtiene gratis en https://aistudio.google.com/apikey (sin tarjeta de credito).
//
// Nota: gemini-2.5-flash empezo a devolver 404 "no longer available" en keys/proyectos nuevos
// desde el 9 de julio de 2026 (bug reportado en el foro oficial de Google, aunque el retiro
// oficial recien es en octubre). Por eso el modelo por defecto es la version GA mas reciente.
// Si en el futuro este modelo tambien deja de estar disponible, cambia GEMINI_MODEL como
// variable de entorno sin tocar el codigo (por ejemplo a 'gemini-flash-latest').

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite',

  // Limite simple de peticiones por IP (en memoria) para que nadie agote la cuota gratuita
  // compartida de Gemini. No es infraestructura de produccion, alcanza para el proyecto.
  CHAT_RATE_LIMIT_WINDOW_MS: Number(process.env.CHAT_RATE_LIMIT_WINDOW_MS) || 60_000,
  CHAT_RATE_LIMIT_MAX_REQUESTS: Number(process.env.CHAT_RATE_LIMIT_MAX_REQUESTS) || 8
};

export function isGeminiConfigured() {
  return Boolean(env.GEMINI_API_KEY);
}
