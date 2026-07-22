import { Router } from 'express';
import { isGeminiConfigured } from '../config/env.js';
import { chatRateLimiter } from '../middleware/rateLimit.js';
import { askGemini, sanitizeMessage } from '../services/geminiService.js';

const router = Router();

// POST /api/chat -> asistente IA (Gemini). La key vive solo en el servidor
// (GEMINI_API_KEY), nunca se manda al navegador.
router.post('/chat', chatRateLimiter, async (req, res) => {
  if (!isGeminiConfigured()) {
    return res.status(500).json({
      error: 'El asistente IA no esta configurado. Falta la variable de entorno GEMINI_API_KEY en el servidor.'
    });
  }

  try {
    const message = sanitizeMessage(req.body?.message);
    if (!message) throw new Error('Escribe una pregunta antes de enviar.');

    const reply = await askGemini({ message, context: req.body?.context });
    res.json({ reply });
  } catch (error) {
    res.status(400).json({ error: error.message || 'No se pudo procesar la pregunta.' });
  }
});

export default router;
