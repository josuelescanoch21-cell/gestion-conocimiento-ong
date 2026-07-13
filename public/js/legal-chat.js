// cambio para el chat IA: modulo dedicado al Asistente legal con IA en la pagina Leyes ONG.
// Sigue el mismo patron que public/js/forum.js: usa window.KMS.currentUser()/toast()/escapeHtml()
// y se registra al final con Object.assign(window.KMS, {...}). No usa window.KMS.api() porque
// este chat no habla con Supabase: llama a un endpoint propio del servidor (POST
// /api/ai/legal-chat en static-server.js), que a su vez llama a la API gratuita de Gemini sin
// exponer la key al navegador.
//
// Reglas de acceso (decididas junto con el usuario):
//   * Solo "creador_ong" y "voluntario" pueden usar el chat.
//   * El administrador NO lo ve (mismo criterio que en el Foro: modera, no participa).
//   * El chat responde solo con base en las leyes visibles/filtradas en la pagina (grounding),
//     no guarda historial en ningun lado, y no acepta instrucciones que intenten cambiar su rol.

function legalChatUser() { return window.KMS.currentUser(); }
function legalChatAllowed(user = legalChatUser()) { return ['creador_ong', 'voluntario'].includes(user.role); }

function appendLegalChatBubble(role, text) {
  const target = document.getElementById('aiChatMessages');
  if (!target) return null;
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${role}`;
  bubble.textContent = text;
  target.appendChild(bubble);
  target.scrollTop = target.scrollHeight;
  return bubble;
}

// cambio para el chat IA: si el rol no puede usar el chat, se reemplaza el panel por un aviso
// (en vez de ocultarlo con data-role-only, para explicar por que no esta disponible).
function initLegalChat() {
  const panel = document.getElementById('aiChatPanel');
  if (!panel) return;
  const user = legalChatUser();
  if (!legalChatAllowed(user)) {
    panel.innerHTML = '<h2>Asistente legal IA</h2><p class="muted">Este chat esta disponible para creador_ong y voluntario. El administrador modera el foro y la taxonomia legal, pero no participa aqui.</p>';
    return;
  }
  const form = document.getElementById('aiChatForm');
  if (!form || form.dataset.bound) return;
  form.dataset.bound = '1';
  form.addEventListener('submit', sendLegalChatMessage);
}

async function sendLegalChatMessage(event) {
  event.preventDefault();
  const input = document.getElementById('aiChatInput');
  if (!input) return;
  const message = input.value.trim();
  if (!message) return;
  appendLegalChatBubble('user', message);
  input.value = '';
  input.disabled = true;
  const pending = appendLegalChatBubble('assistant pending', 'Pensando...');
  try {
    const response = await fetch('/api/ai/legal-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context: window.KMS.getLawsChatContext() })
    });
    const data = await response.json().catch(() => ({}));
    if (pending) pending.remove();
    if (!response.ok) throw new Error(data.error || 'No se pudo consultar al asistente.');
    appendLegalChatBubble('assistant', data.reply || 'No pude generar una respuesta.');
  } catch (error) {
    if (pending) pending.remove();
    appendLegalChatBubble('assistant error', error.message || 'No se pudo consultar al asistente.');
  } finally {
    input.disabled = false;
    input.focus();
  }
}

// Se agregan las funciones del chat al objeto global window.KMS ya creado en app.js,
// para poder llamarlas desde leyes.html con la misma convencion que el resto del proyecto.
Object.assign(window.KMS, { initLegalChat, sendLegalChatMessage });
