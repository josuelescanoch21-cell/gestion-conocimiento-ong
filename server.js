import express from 'express';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { env } from './server/config/env.js';
import geminiRoutes from './server/routes/gemini.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, 'public');

const app = express();

// Railway (y cualquier proxy inverso) esta delante de la app; esto hace que req.ip refleje la
// IP real del cliente en vez de la del proxy, algo que necesita el rate limiter del chat.
app.set('trust proxy', 1);

app.use(express.json({ limit: '30kb' }));

// --- API ---
app.use('/api', geminiRoutes);

// --- Frontend estatico ---
app.use(express.static(PUBLIC_DIR));

// Cualquier otra ruta GET que no matcheo un archivo estatico ni una ruta de API cae aqui.
// Mantiene el comportamiento del servidor anterior: sirve index.html en vez de un 404 crudo.
app.get('*', (req, res) => {
  res.sendFile(join(PUBLIC_DIR, 'index.html'));
});

app.listen(env.PORT, () => {
  console.log(`Frontend listo en puerto ${env.PORT}`);
});
