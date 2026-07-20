// cambio para el foro (rediseno): Foro de la comunidad estilo "tablero de comunidad"
// (Buenas practicas / Malas practicas), sin barra de busqueda, con avatares, iconos,
// tiempo relativo y una reaccion "Util" tipo like/upvote. Sigue usando window.KMS.api(...)
// para hablar con Supabase, igual que el resto del proyecto.

const FORUM_BOARDS = {
  buenas_practicas: { label: 'Buenas practicas', hint: 'Comparte lo que le funciono a tu ONG: procesos, plantillas, ideas que dieron resultado.', icon: 'bulb' },
  malas_practicas: { label: 'Malas practicas', hint: 'Comparte errores o tropiezos para que otras ONG no los repitan. Sin señalar personas, con foco en el aprendizaje.', icon: 'warning' }
};

// Paleta de avatares derivada del tema de la app (no colores al azar), para que
// cada persona tenga un color consistente sin salirse de la identidad visual.
const FORUM_AVATAR_PALETTE = ['#2f6f5e', '#244f45', '#c47b3a', '#356f9b', '#6a8f57', '#8a5a3b'];

const FORUM_ICONS = {
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M8 14a5 5 0 1 1 8 0c-.8.9-1.5 1.7-1.5 3h-5c0-1.3-.7-2.1-1.5-3Z"/><path d="M12 2v1.5M4 6l1 1M20 6l-1 1"/></svg>',
  warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4"/><circle cx="12" cy="17" r=".6" fill="currentColor" stroke="none"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2h6l-1 7 4 4v2H6v-2l4-4-1-7Z"/><path d="M12 15v7"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
  comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1.1-4.2A8 8 0 1 1 21 12Z"/></svg>',
  like: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 22V11m0 0 5-8 1.5 1L12 10h8a2 2 0 0 1 2 2.3l-1.4 7A2 2 0 0 1 18.6 21H7"/></svg>',
  reopen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v6h6"/><path d="M4.5 13a8 8 0 1 0 2-8.5L4 10"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7Z"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>'
};

function forumIcon(name, extraClass = '') {
  return `<span class="forum-icon ${extraClass}">${FORUM_ICONS[name] || ''}</span>`;
}

let forumState = { board: 'buenas_practicas', topics: [] };

function forumUser() { return window.KMS.currentUser(); }
function forumCanPost(user = forumUser()) { return ['creador_ong', 'voluntario'].includes(user.role); }
function forumIsAdmin(user = forumUser()) { return user.role === 'administrador'; }

function forumHash(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return hash;
}

function forumInitials(name) {
  const parts = String(name || '?').trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0] || '').join('').toUpperCase() || '?';
}

function forumAvatar(name) {
  const color = FORUM_AVATAR_PALETTE[forumHash(name || '?') % FORUM_AVATAR_PALETTE.length];
  return `<span class="forum-avatar" style="background:${color}">${window.KMS.escapeHtml(forumInitials(name))}</span>`;
}

function forumRelativeTime(dateStr) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '';
  const diffSeconds = Math.round((Date.now() - date.getTime()) / 1000);
  const steps = [
    [60, 'segundo'], [3600, 'minuto'], [86400, 'hora'], [2592000, 'dia'], [31536000, 'mes']
  ];
  if (diffSeconds < 45) return 'justo ahora';
  for (const [limit, unit] of steps) {
    if (diffSeconds < limit * (unit === 'segundo' ? 1 : 1)) {
      const divisor = unit === 'segundo' ? 1 : (unit === 'minuto' ? 60 : (unit === 'hora' ? 3600 : (unit === 'dia' ? 86400 : 2592000)));
      const value = Math.max(1, Math.round(diffSeconds / divisor));
      return `hace ${value} ${unit}${value === 1 ? '' : (unit === 'mes' ? 'es' : 's')}`;
    }
  }
  return date.toLocaleDateString('es-PE', { year: 'numeric', month: 'short', day: 'numeric' });
}

function forumBadges(topic) {
  const badges = [];
  if (topic.is_pinned) badges.push(`<span class="tag forum-badge-pinned">${forumIcon('pin')}Fijado</span>`);
  if (topic.status === 'cerrado') badges.push(`<span class="tag forum-badge-closed">${forumIcon('lock')}Cerrado</span>`);
  if (topic.is_removed) badges.push('<span class="tag forum-badge-removed">Eliminado</span>');
  return badges.join('');
}

function forumUserReacted(topic, user = forumUser()) {
  return (topic.forum_reactions || []).some((reaction) => reaction.user_id === user.id);
}

function forumTopicCard(topic) {
  const user = forumUser();
  const author = topic.author_name || topic.users?.full_name || 'Miembro de la comunidad';
  const org = topic.organizations?.name || topic.organization || 'ONG';
  const replyCount = topic.forum_replies?.length ?? topic.reply_count ?? 0;
  const reactionCount = topic.forum_reactions?.length ?? 0;
  const reacted = forumUserReacted(topic, user);
  const boardAccent = topic.board === 'malas_practicas' ? 'forum-post-bad' : 'forum-post-good';
  const canReact = forumCanPost(user);
  return `<article class="forum-post ${boardAccent}">
    <div class="forum-post-main" onclick="window.KMS.openForumTopic('${topic.id}')">
      <div class="forum-post-header">
        ${forumAvatar(author)}
        <div class="forum-post-meta">
          <strong>${window.KMS.escapeHtml(author)}</strong>
          <span class="muted">${window.KMS.escapeHtml(org)} · ${forumRelativeTime(topic.created_at)}</span>
        </div>
        <div class="forum-post-badges">${forumBadges(topic)}</div>
      </div>
      <h3 class="forum-post-title">${window.KMS.escapeHtml(topic.title)}</h3>
      <p class="forum-post-excerpt">${window.KMS.escapeHtml((topic.content || '').slice(0, 180))}${(topic.content || '').length > 180 ? '…' : ''}</p>
    </div>
    <div class="forum-post-footer">
      <button type="button" class="forum-reaction${reacted ? ' active' : ''}" ${canReact ? '' : 'disabled'}
        onclick="event.stopPropagation(); window.KMS.reactForumTopic('${topic.id}')" title="${canReact ? 'Marcar como util' : 'Solo Creador ONG y Voluntario pueden reaccionar'}">
        ${forumIcon('like')}<span>Util</span><b>${reactionCount}</b>
      </button>
      <span class="forum-stat">${forumIcon('comment')}${replyCount} respuesta${replyCount === 1 ? '' : 's'}</span>
      <button type="button" class="forum-open-link" onclick="event.stopPropagation(); window.KMS.openForumTopic('${topic.id}')">Ver tema →</button>
    </div>
  </article>`;
}

function forumUpdateBoardCounts() {
  ['buenas_practicas', 'malas_practicas'].forEach((board) => {
    const node = document.querySelector(`[data-forum-count="${board}"]`);
    if (node) node.textContent = forumState.topics.filter((topic) => topic.board === board && !topic.is_removed).length;
  });
}

function forumSetActiveBoard(board) {
  forumState.board = board;
  document.querySelectorAll('[data-forum-board-tab]').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.forumBoardTab === board);
  });
  renderForum();
}

async function loadForumTopics() {
  try {
    return await window.KMS.api('/api/forum/topics');
  } catch (error) {
    window.KMS.toast(error.message, 'error');
    return [];
  }
}

async function renderForum() {
  window.KMS.layoutInit('foro');
  const user = forumUser();
  const newTopicButton = document.querySelector('[data-forum-new-topic]');
  if (newTopicButton) newTopicButton.hidden = !forumCanPost(user);

  const topics = await loadForumTopics();
  forumState.topics = topics;
  forumUpdateBoardCounts();

  const visible = topics.filter((topic) => topic.board === forumState.board && (!topic.is_removed || forumIsAdmin(user)));
  const target = document.getElementById('forumTopics');
  if (target) {
    target.innerHTML = visible.length
      ? visible.map(forumTopicCard).join('')
      : `<div class="empty-state forum-empty">${forumIcon(FORUM_BOARDS[forumState.board].icon, 'forum-empty-icon')}<strong>Todavia no hay temas aqui.</strong><p>Se el primero en compartir una experiencia con la comunidad.</p></div>`;
  }
}

function openForumTopicForm() {
  const user = forumUser();
  if (!forumCanPost(user)) { window.KMS.toast('Solo Creador ONG y Voluntario pueden crear temas en el foro. El administrador solo modera.', 'error'); return; }
  const board = forumState.board;
  window.KMS.openModal(`<h2>${forumIcon(FORUM_BOARDS[board].icon)}Nuevo tema · ${FORUM_BOARDS[board].label}</h2>
    <form id="forumTopicForm" class="stack-form">
      <input type="hidden" name="board" value="${board}">
      <input name="title" required placeholder="Titulo del tema" maxlength="140">
      <textarea name="content" required placeholder="Cuenta la experiencia: contexto, que paso y que aprendieron"></textarea>
      <button type="submit">${forumIcon('send')}Publicar tema</button>
    </form>`);
  document.getElementById('forumTopicForm').onsubmit = saveForumTopic;
}

async function saveForumTopic(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  try {
    await window.KMS.api('/api/forum/topics', { method: 'POST', body: JSON.stringify(data) });
    window.KMS.toast('Tema publicado correctamente.');
    window.KMS.closeModal();
    renderForum();
  } catch (error) { window.KMS.toast(error.message, 'error'); }
}

function forumReplyRow(reply) {
  const user = forumUser();
  const author = reply.author_name || reply.users?.full_name || 'Miembro de la comunidad';
  if (reply.is_removed && !forumIsAdmin(user)) return '';
  return `<article class="mini-card forum-reply">
    <div class="forum-reply-header">
      ${forumAvatar(author)}
      <div class="forum-post-meta">
        <strong>${window.KMS.escapeHtml(author)}</strong>
        <span class="muted">${forumRelativeTime(reply.created_at)}</span>
      </div>
      ${reply.is_removed ? '<span class="tag forum-badge-removed">Eliminado por moderacion</span>' : ''}
    </div>
    <p>${window.KMS.escapeHtml(reply.content)}</p>
    ${forumIsAdmin(user) && !reply.is_removed ? `<div class="actions-row"><button class="secondary tiny" type="button" onclick="window.KMS.removeForumReply('${reply.topic_id || ''}','${reply.id}')">${forumIcon('trash')}Eliminar respuesta</button></div>` : ''}
  </article>`;
}

async function openForumTopic(id) {
  let payload;
  try {
    payload = await window.KMS.api(`/api/forum/topics/${id}`);
  } catch (error) { window.KMS.toast(error.message, 'error'); return; }
  const { topic, replies } = payload;
  const user = forumUser();
  const isAdmin = forumIsAdmin(user);
  const isClosed = topic.status === 'cerrado';
  const author = topic.author_name || topic.users?.full_name || 'Miembro de la comunidad';
  const org = topic.organizations?.name || 'ONG';
  const reacted = forumUserReacted(topic, user);
  const reactionCount = topic.forum_reactions?.length ?? 0;
  const canReact = forumCanPost(user);

  const moderationButtons = isAdmin ? `<div class="actions-row">
      <button class="secondary" type="button" onclick="window.KMS.pinForumTopic('${topic.id}', ${!topic.is_pinned})">${forumIcon('pin')}${topic.is_pinned ? 'Desfijar' : 'Fijar'}</button>
      <button class="secondary" type="button" onclick="window.KMS.setForumTopicStatus('${topic.id}', '${isClosed ? 'abierto' : 'cerrado'}')">${forumIcon(isClosed ? 'reopen' : 'lock')}${isClosed ? 'Reabrir tema' : 'Cerrar tema'}</button>
      ${!topic.is_removed ? `<button class="secondary" type="button" onclick="window.KMS.removeForumTopic('${topic.id}')">${forumIcon('trash')}Eliminar tema</button>` : ''}
    </div>` : '';

  const replyForm = (forumCanPost(user) && !isClosed && !topic.is_removed)
    ? `<form id="forumReplyForm" class="stack-form forum-reply-form"><textarea name="content" required placeholder="Escribe tu respuesta"></textarea><button type="submit">${forumIcon('send')}Responder</button></form>`
    : isClosed
      ? `<p class="muted forum-closed-note">${forumIcon('lock')}Este tema esta cerrado por un moderador y no admite nuevas respuestas.</p>`
      : (isAdmin ? '<p class="muted">El administrador solo modera el foro; no publica respuestas.</p>' : '');

  window.KMS.openModal(`<div class="forum-detail-header">
      ${forumAvatar(author)}
      <div class="forum-post-meta">
        <strong>${window.KMS.escapeHtml(author)}</strong>
        <span class="muted">${window.KMS.escapeHtml(org)} · ${forumRelativeTime(topic.created_at)}</span>
      </div>
      <div class="forum-post-badges">${forumBadges(topic)}</div>
    </div>
    <h2 class="forum-detail-title">${window.KMS.escapeHtml(topic.title)}</h2>
    <div class="article-content rich-lines">${window.KMS.escapeHtml(topic.content || '').replace(/\n/g, '<br>')}</div>
    <div class="forum-post-footer forum-detail-footer">
      <button type="button" class="forum-reaction${reacted ? ' active' : ''}" ${canReact ? '' : 'disabled'}
        onclick="window.KMS.reactForumTopic('${topic.id}', true)">${forumIcon('like')}<span>Util</span><b>${reactionCount}</b></button>
    </div>
    ${moderationButtons}
    <h3 class="forum-replies-title">${forumIcon('comment')}Respuestas (${(replies || []).filter((r) => !r.is_removed || isAdmin).length})</h3>
    <div class="mini-list" id="forumRepliesList">${(replies || []).map(forumReplyRow).join('') || '<p class="muted">Aun no hay respuestas.</p>'}</div>
    ${replyForm}
  `);
  const form = document.getElementById('forumReplyForm');
  if (form) form.onsubmit = (event) => submitForumReply(event, topic.id);
}

async function submitForumReply(event, topicId) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  try {
    await window.KMS.api(`/api/forum/topics/${topicId}/replies`, { method: 'POST', body: JSON.stringify(data) });
    window.KMS.toast('Respuesta publicada.');
    openForumTopic(topicId);
    renderForum();
  } catch (error) { window.KMS.toast(error.message, 'error'); }
}

// cambio para el foro (rediseno): reaccion "Util" (like/upvote). reopenDetail=true refresca
// el modal abierto ademas de la lista, para que el contador se actualice en ambos lugares.
async function reactForumTopic(id, reopenDetail = false) {
  const user = forumUser();
  if (!forumCanPost(user)) { window.KMS.toast('Solo Creador ONG y Voluntario pueden reaccionar.', 'error'); return; }
  try {
    await window.KMS.api(`/api/forum/topics/${id}/react`, { method: 'POST', body: JSON.stringify({}) });
    await renderForum();
    if (reopenDetail) openForumTopic(id);
  } catch (error) { window.KMS.toast(error.message, 'error'); }
}

async function pinForumTopic(id, pin) {
  try {
    await window.KMS.api(`/api/forum/topics/${id}`, { method: 'PATCH', body: JSON.stringify({ is_pinned: pin }) });
    window.KMS.toast(pin ? 'Tema fijado.' : 'Tema desfijado.');
    openForumTopic(id);
    renderForum();
  } catch (error) { window.KMS.toast(error.message, 'error'); }
}

async function setForumTopicStatus(id, status) {
  try {
    await window.KMS.api(`/api/forum/topics/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    window.KMS.toast(status === 'cerrado' ? 'Tema cerrado.' : 'Tema reabierto.');
    openForumTopic(id);
    renderForum();
  } catch (error) { window.KMS.toast(error.message, 'error'); }
}

async function removeForumTopic(id) {
  if (!confirm('¿Eliminar este tema del foro? Esta accion es de moderacion y quedara marcado como eliminado.')) return;
  try {
    await window.KMS.api(`/api/forum/topics/${id}`, { method: 'PATCH', body: JSON.stringify({ is_removed: true }) });
    window.KMS.toast('Tema eliminado.');
    window.KMS.closeModal();
    renderForum();
  } catch (error) { window.KMS.toast(error.message, 'error'); }
}

async function removeForumReply(topicId, replyId) {
  if (!confirm('¿Eliminar esta respuesta del foro?')) return;
  try {
    await window.KMS.api(`/api/forum/replies/${replyId}`, { method: 'PATCH', body: JSON.stringify({ is_removed: true }) });
    window.KMS.toast('Respuesta eliminada.');
    if (topicId) openForumTopic(topicId);
  } catch (error) { window.KMS.toast(error.message, 'error'); }
}

function initForumTabs() {
  document.querySelectorAll('[data-forum-board-tab]').forEach((tab) => {
    tab.addEventListener('click', () => forumSetActiveBoard(tab.dataset.forumBoardTab));
  });
  forumSetActiveBoard(forumState.board);
}

// Se agregan las funciones del foro al objeto global window.KMS ya creado en app.js,
// para poder llamarlas desde foro.html con la misma convencion que el resto del proyecto.
Object.assign(window.KMS, {
  renderForum, initForumTabs, openForumTopicForm, saveForumTopic, openForumTopic,
  submitForumReply, pinForumTopic, setForumTopicStatus, removeForumTopic, removeForumReply,
  reactForumTopic
});
