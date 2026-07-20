// Burbuja global del asistente IA: disponible como icono flotante en cualquier pantalla del
// sistema (ya no depende de estar en la pestaña "Leyes"). Reemplaza al panel fijo anterior de
// leyes.html. Reglas de acceso sin cambios respecto al diseño original:
//   * Solo "creador_ong" y "voluntario" ven la burbuja.
//   * El administrador no la ve (mismo criterio que en el Foro: modera, no participa).
// Habla con el mismo endpoint del servidor (POST /api/ai/legal-chat -> Gemini), no toca
// Supabase directamente para leyes (usa window.ONG_LAWS, ya cargado por laws-data.js) y usa
// window.KMS.api(...) para conocimiento y foro, igual que el resto del proyecto.

(function () {
  'use strict';

  const ALLOWED_ROLES = ['creador_ong', 'voluntario'];
  const CONTEXT_TTL_MS = 5 * 60 * 1000;
  const state = { open: false, context: null, contextLoadedAt: 0, loading: false };

  function widgetUser() {
    return window.KMS && window.KMS.currentUser ? window.KMS.currentUser() : null;
  }

  function widgetAllowed(user = widgetUser()) {
    return !!user && ALLOWED_ROLES.includes(user.role);
  }

  function esc(value) {
    return window.KMS && window.KMS.escapeHtml ? window.KMS.escapeHtml(value) : String(value ?? '');
  }

  function buildWidgetMarkup() {
    return `
      <button type="button" class="ai-chat-bubble-button" id="aiChatBubbleButton" aria-label="Abrir asistente IA" aria-expanded="false" title="Asistente IA">
        <span class="ai-chat-bubble-icon" data-open-icon>▣</span>
        <span class="ai-chat-bubble-icon" data-close-icon hidden>✕</span>
      </button>
      <div class="ai-chat-bubble-panel" id="aiChatBubblePanel" hidden role="dialog" aria-label="Asistente IA">
        <header class="ai-chat-bubble-header">
          <div>
            <strong>Asistente IA</strong>
            <span class="muted">Leyes, conocimiento y foro de tu ONG</span>
          </div>
          <button type="button" class="ghost" id="aiChatBubbleClose" aria-label="Cerrar asistente">✕</button>
        </header>
        <div class="chat-messages" id="aiChatMessages"></div>
        <form id="aiChatForm" class="chat-form">
          <input id="aiChatInput" type="text" placeholder="Pregunta sobre leyes, conocimiento o el foro..." required maxlength="500" autocomplete="off">
          <button type="submit">Enviar</button>
        </form>
      </div>`;
  }

  function appendBubble(role, text) {
    const target = document.getElementById('aiChatMessages');
    if (!target) return null;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${role}`;
    bubble.textContent = text;
    target.appendChild(bubble);
    target.scrollTop = target.scrollHeight;
    return bubble;
  }

  function togglePanel(forceOpen) {
    const panel = document.getElementById('aiChatBubblePanel');
    const button = document.getElementById('aiChatBubbleButton');
    if (!panel || !button) return;
    state.open = typeof forceOpen === 'boolean' ? forceOpen : !state.open;
    panel.hidden = !state.open;
    button.classList.toggle('active', state.open);
    button.setAttribute('aria-expanded', String(state.open));
    const openIcon = button.querySelector('[data-open-icon]');
    const closeIcon = button.querySelector('[data-close-icon]');
    if (openIcon) openIcon.hidden = state.open;
    if (closeIcon) closeIcon.hidden = !state.open;
    if (state.open) {
      loadWidgetContext().catch(() => {});
      const input = document.getElementById('aiChatInput');
      if (input) input.focus();
    }
  }

  // Combina 3 fuentes locales sin importar en que pagina este la persona: leyes (ya cargadas en
  // memoria via window.ONG_LAWS), articulos publicados de conocimiento, y un vistazo breve a los
  // temas mas recientes del foro (para poder mencionar "casos similares"). Se cachea unos minutos
  // para no repetir consultas a Supabase cada vez que se abre la burbuja.
  async function loadWidgetContext(force = false) {
    if (state.loading) return state.context || [];
    if (!force && state.context && (Date.now() - state.contextLoadedAt) < CONTEXT_TTL_MS) return state.context;
    state.loading = true;
    try {
      const laws = (Array.isArray(window.ONG_LAWS) ? window.ONG_LAWS : []).slice(0, 6).map((item) => ({
        kind: 'ley', title: item.title, description: item.description, content: item.content, legal_reference: item.legal_reference, source_url: item.source_url
      }));

      let knowledge = [];
      try {
        const items = await window.KMS.api('/api/knowledge');
        knowledge = (items || []).filter((item) => item.status === 'publicado').slice(0, 4).map((item) => ({
          kind: 'conocimiento', title: item.title, description: item.description, content: item.content
        }));
      } catch { /* base de conocimiento no disponible en este momento, se ignora sin romper el chat */ }

      let forum = [];
      try {
        const topics = await window.KMS.api('/api/forum/topics');
        forum = (topics || []).filter((topic) => !topic.is_removed).slice(0, 4).map((topic) => ({
          kind: 'foro',
          title: topic.title,
          description: topic.board === 'malas_practicas' ? 'Malas practicas (foro)' : 'Buenas practicas (foro)',
          content: String(topic.content || '').slice(0, 300)
        }));
      } catch { /* foro no disponible en este momento, se ignora sin romper el chat */ }

      state.context = [...laws, ...knowledge, ...forum];
      state.contextLoadedAt = Date.now();
    } finally {
      state.loading = false;
    }
    return state.context || [];
  }

  async function sendMessage(event) {
    event.preventDefault();
    const input = document.getElementById('aiChatInput');
    if (!input) return;
    const message = input.value.trim();
    if (!message) return;
    appendBubble('user', message);
    input.value = '';
    input.disabled = true;
    const pending = appendBubble('assistant pending', 'Pensando...');
    try {
      const context = await loadWidgetContext();
      const response = await fetch('/api/ai/legal-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context })
      });
      const data = await response.json().catch(() => ({}));
      if (pending) pending.remove();
      if (!response.ok) throw new Error(data.error || 'No se pudo consultar al asistente.');
      appendBubble('assistant', data.reply || 'No pude generar una respuesta.');
    } catch (error) {
      if (pending) pending.remove();
      appendBubble('assistant error', error.message || 'No se pudo consultar al asistente.');
    } finally {
      input.disabled = false;
      input.focus();
    }
  }

  function init() {
    if (!document.querySelector('.app-shell')) return;
    if (!widgetAllowed()) return; // el administrador modera la plataforma, no usa el asistente
    if (document.getElementById('aiChatBubbleButton')) return;

    document.body.insertAdjacentHTML('beforeend', buildWidgetMarkup());
    document.getElementById('aiChatBubbleButton').addEventListener('click', () => togglePanel());
    document.getElementById('aiChatBubbleClose').addEventListener('click', () => togglePanel(false));
    document.getElementById('aiChatForm').addEventListener('submit', sendMessage);
    appendBubble('assistant', 'Hola, puedo ayudarte con leyes para ONG, articulos de la base de conocimiento o casos parecidos compartidos en el foro. ¿Que necesitas?');
  }

  // Permite abrir la burbuja desde cualquier enlace del menu ("Chat IA"), sin navegar a otra
  // pagina primero: el enlace llama a window.KMS.openAiChat() en vez de cambiar de href.
  function openFromAnywhere() {
    if (!document.getElementById('aiChatBubbleButton')) init();
    togglePanel(true);
  }

  document.addEventListener('DOMContentLoaded', init);
  window.KMS = window.KMS || {};
  window.KMS.openAiChat = openFromAnywhere;
  window.KMS.escapeHtmlForChat = esc;
}());
