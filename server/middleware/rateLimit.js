import { env } from '../config/env.js';

// Rate limit simple en memoria, por IP. Pensado solo para no agotar la cuota gratuita
// compartida de Gemini entre todos los usuarios de la app; no es para trafico serio.
const hitsByIp = new Map();

export function chatRateLimiter(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress || 'desconocida';
  const now = Date.now();
  const hits = (hitsByIp.get(ip) || []).filter(
    (time) => now - time < env.CHAT_RATE_LIMIT_WINDOW_MS
  );
  hits.push(now);
  hitsByIp.set(ip, hits);

  if (hits.length > env.CHAT_RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({
      error: 'Demasiadas preguntas seguidas. Espera un minuto e intenta de nuevo.'
    });
  }
  next();
}
