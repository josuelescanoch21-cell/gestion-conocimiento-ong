import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = join(process.cwd(), 'public');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon'
};

function safePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const file = normalize(join(PUBLIC_DIR, clean));
  if (!file.startsWith(PUBLIC_DIR)) return join(PUBLIC_DIR, 'index.html');
  return file;
}

createServer(async (req, res) => {
  try {
    let file = safePath(req.url || '/');
    if (existsSync(file) && !extname(file)) file = join(file, 'index.html');
    if (!existsSync(file)) file = join(PUBLIC_DIR, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Error cargando el frontend');
  }
}).listen(PORT, () => console.log(`Frontend listo en puerto ${PORT}`));
