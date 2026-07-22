// cambio para el foro (rediseno): Foro de la comunidad estilo "tablero de comunidad"
// (Buenas practicas / Malas practicas), con avatares, iconos, tiempo relativo, reacciones
// "Util"/"No util" (like/dislike), hilos de respuestas anidados (colapsados por defecto) y
// una insignia de verificado para Creador ONG. Sigue usando window.KMS.api(...) para hablar
// con Supabase, igual que el resto del proyecto.

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
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  verified: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12.5 10 16.5 18 7.5"/></svg>'
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

// cambio para el foro (check verificado): solo Creador ONG lleva insignia junto al nombre
// (circulo dorado con check, tipo Instagram/Twitter). Voluntario no lleva ninguna insignia.
function forumRoleBadge(roleName) {
  if (roleName !== 'creador_ong') return '';
  return `<span class="verified-badge" title="Cuenta de Creador ONG verificada">${FORUM_ICONS.verified}</span>`;
}

function forumAuthorRole(entity) {
  return entity.users?.roles?.name || null;
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

// cambio para el foro (dislike): la reaccion de un usuario ahora tiene tipo ('util' o
// 'no_util'). Estas funciones leen el arreglo forum_reactions embebido en el tema.
function forumUserReactionType(topic, user = forumUser()) {
  const found = (topic.forum_reactions || []).find((reaction) => reaction.user_id === user.id);
  return found ? found.reaction_type : null;
}
function forumReactionCount(topic, type) {
  return (topic.forum_reactions || []).filter((reaction) => reaction.reaction_type === type).length;
}

// cambio para el foro (dislike): botones "Util" / "No util" reutilizables en la tarjeta y en
// el detalle del tema. El de "No util" reusa el icono de "like" pero volteado con CSS
// (.forum-icon-flip) en vez de dibujar un SVG nuevo.
function forumReactionButtons(topic, user) {
  const canReact = forumCanPost(user);
  const myReaction = forumUserReactionType(topic, user);
  const utilCount = forumReactionCount(topic, 'util');
  const noUtilCount = forumReactionCount(topic, 'no_util');
  return `<button type="button" class="forum-reaction${myReaction === 'util' ? ' active' : ''}" ${canReact ? '' : 'disabled'}
      onclick="event.stopPropagation(); window.KMS.reactForumTopic('${topic.id}', 'util')" title="${canReact ? 'Marcar como util' : 'Solo Creador ONG y Voluntario pueden reaccionar'}">
      ${forumIcon('like')}<span>Util</span><b>${utilCount}</b>
    </button>
    <button type="button" class="forum-reaction forum-reaction-dislike${myReaction === 'no_util' ? ' active' : ''}" ${canReact ? '' : 'disabled'}
      onclick="event.stopPropagation(); window.KMS.reactForumTopic('${topic.id}', 'no_util')" title="${canReact ? 'Marcar como no util' : 'Solo Creador ONG y Voluntario pueden reaccionar'}">
      ${forumIcon('like', 'forum-icon-flip')}<span>No util</span><b>${noUtilCount}</b>
    </button>`;
}

function forumTopicCard(topic) {
  const user = forumUser();
  const author = topic.author_name || topic.users?.full_name || 'Miembro de la comunidad';
  const org = topic.organizations?.name || topic.organization || 'ONG';
  const replyCount = topic.forum_replies?.length ?? topic.reply_count ?? 0;
  const boardAccent = topic.board === 'malas_practicas' ? 'forum-post-bad' : 'forum-post-good';
  return `<article class="forum-post ${boardAccent}">
    <div class="forum-post-main" onclick="window.KMS.openForumTopic('${topic.id}')">
      <div class="forum-post-header">
        ${forumAvatar(author)}
        <div class="forum-post-meta">
          <span class="forum-name-line"><strong>${window.KMS.escapeHtml(author)}</strong>${forumRoleBadge(forumAuthorRole(topic))}</span>
          <span class="muted">${window.KMS.escapeHtml(org)} · ${forumRelativeTime(topic.created_at)}</span>
        </div>
        <div class="forum-post-badges">${forumBadges(topic)}</div>
      </div>
      <h3 class="forum-post-title">${window.KMS.escapeHtml(topic.title)}</h3>
      <p class="forum-post-excerpt">${window.KMS.escapeHtml((topic.content || '').slice(0, 180))}${(topic.content || '').length > 180 ? '…' : ''}</p>
    </div>
    <div class="forum-post-footer">
      ${forumReactionButtons(topic, user)}
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

// cambio para el foro (hilos anidados): fila visual de un comentario/respuesta suelto (sin
// sus hijos). ctx trae { topicId, isOpen } para decidir si se puede "Responder" a este nodo.
function forumReplyRow(reply, ctx) {
  const user = forumUser();
  const author = reply.author_name || reply.users?.full_name || 'Miembro de la comunidad';
  if (reply.is_removed && !forumIsAdmin(user)) return '';
  const canReplyHere = forumCanPost(user) && ctx.isOpen;
  return `
    <div class="forum-reply-header">
      ${forumAvatar(author)}
      <div class="forum-post-meta">
        <span class="forum-name-line"><strong>${window.KMS.escapeHtml(author)}</strong>${forumRoleBadge(forumAuthorRole(reply))}</span>
        <span class="muted">${forumRelativeTime(reply.created_at)}</span>
      </div>
      ${reply.is_removed ? '<span class="tag forum-badge-removed">Eliminado por moderacion</span>' : ''}
    </div>
    <p>${window.KMS.escapeHtml(reply.content)}</p>
    <div class="actions-row forum-reply-actions">
      ${canReplyHere ? `<button class="secondary tiny" type="button" onclick="window.KMS.toggleInlineReplyForm('${reply.id}')">${forumIcon('comment')}Responder</button>` : ''}
      ${forumIsAdmin(user) && !reply.is_removed ? `<button class="secondary tiny" type="button" onclick="window.KMS.removeForumReply('${ctx.topicId}','${reply.id}')">${forumIcon('trash')}Eliminar respuesta</button>` : ''}
    </div>
    ${canReplyHere ? `<form id="forumInlineReply-${reply.id}" class="stack-form forum-inline-reply" hidden onsubmit="event.preventDefault(); window.KMS.submitForumReply(event, '${ctx.topicId}', '${reply.id}')">
        <textarea name="content" required placeholder="Responder a ${window.KMS.escapeHtml(author)}"></textarea>
        <button type="submit">${forumIcon('send')}Enviar respuesta</button>
      </form>` : ''}`;
}

// cambio para el foro (hilos anidados): alterna mostrar/ocultar las respuestas de un hilo.
// Antes el boton "+N respuestas mas" se ocultaba a si mismo al primer clic y no habia forma
// de volver a colapsar las respuestas. Ahora el mismo boton cambia de estado: al abrir, se
// convierte en "(-) Ocultar respuestas"; al tocarlo de nuevo, vuelve a "+N respuestas mas".
function toggleForumReplies(button, count) {
  const children = button.nextElementSibling;
  const isCurrentlyHidden = children.hidden;
  children.hidden = !isCurrentlyHidden;
  button.innerHTML = isCurrentlyHidden
    ? `${forumIcon('comment')}(-) Ocultar respuesta${count === 1 ? '' : 's'}`
    : `${forumIcon('comment')}+ ${count} respuesta${count === 1 ? '' : 's'} mas`;
}

// cambio para el foro (hilos anidados): muestra/oculta el mini-formulario de "Responder" que
// cuelga debajo de un comentario especifico.
function toggleInlineReplyForm(replyId) {
  const form = document.getElementById(`forumInlineReply-${replyId}`);
  if (form) form.hidden = !form.hidden;
}

// cambio para el foro (hilos anidados): arma recursivamente el hilo de una respuesta y sus
// respuestas-a-la-respuesta. Estas ultimas quedan colapsadas por defecto detras de un boton
// "+N respuestas mas"; al hacer clic se muestran (estilo comentarios de Reddit), y el mismo
// boton permite volver a ocultarlas (ver toggleForumReplies).
function forumReplyThread(reply, groups, ctx) {
  const children = groups.get(reply.id) || [];
  const rowHtml = forumReplyRow(reply, ctx);
  const childRendered = children.map((child) => forumReplyThread(child, groups, ctx)).filter(Boolean).join('');
  if (!rowHtml && !childRendered) return '';
  const cardHtml = rowHtml
    ? `<article class="mini-card forum-reply">${rowHtml}</article>`
    : '<p class="muted forum-reply-placeholder">Comentario eliminado por moderacion.</p>';
  let childrenBlock = '';
  if (childRendered) {
    const count = children.length;
    childrenBlock = `<button type="button" class="forum-replies-toggle" onclick="window.KMS.toggleForumReplies(this, ${count})">
        ${forumIcon('comment')}+ ${count} respuesta${count === 1 ? '' : 's'} mas
      </button>
      <div class="forum-replies-children" hidden>${childRendered}</div>`;
  }
  return `<div class="forum-thread-node">${cardHtml}${childrenBlock}</div>`;
}

// cambio para el foro (hilos anidados): agrupa las respuestas planas que llegan de la API en
// un mapa parent_reply_id -> [hijos], para poder armar el arbol con forumReplyThread.
function forumGroupReplies(replies) {
  const groups = new Map();
  (replies || []).forEach((reply) => {
    const key = reply.parent_reply_id || null;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(reply);
  });
  return groups;
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

  // cambio para el foro (hilos anidados): solo se pintan los comentarios de primer nivel
  // (parent_reply_id null); cada uno arma su propio hilo de respuestas via forumReplyThread.
  const groups = forumGroupReplies(replies);
  const roots = groups.get(null) || [];
  const ctx = { topicId: topic.id, isOpen: !isClosed && !topic.is_removed };
  const totalVisible = (replies || []).filter((r) => !r.is_removed || isAdmin).length;

  window.KMS.openModal(`<div class="forum-detail-header">
      ${forumAvatar(author)}
      <div class="forum-post-meta">
        <span class="forum-name-line"><strong>${window.KMS.escapeHtml(author)}</strong>${forumRoleBadge(forumAuthorRole(topic))}</span>
        <span class="muted">${window.KMS.escapeHtml(org)} · ${forumRelativeTime(topic.created_at)}</span>
      </div>
      <div class="forum-post-badges">${forumBadges(topic)}</div>
    </div>
    <h2 class="forum-detail-title">${window.KMS.escapeHtml(topic.title)}</h2>
    <div class="article-content rich-lines">${window.KMS.escapeHtml(topic.content || '').replace(/\n/g, '<br>')}</div>
    <div class="forum-post-footer forum-detail-footer">${forumReactionButtons(topic, user)}</div>
    ${moderationButtons}
    <h3 class="forum-replies-title">${forumIcon('comment')}Respuestas (${totalVisible})</h3>
    <div class="mini-list" id="forumRepliesList">${roots.map((reply) => forumReplyThread(reply, groups, ctx)).join('') || '<p class="muted">Aun no hay respuestas.</p>'}</div>
    ${replyForm}
  `);
  const form = document.getElementById('forumReplyForm');
  if (form) form.onsubmit = (event) => submitForumReply(event, topic.id);
}

// cambio para el foro (hilos anidados): parentReplyId opcional -> si viene, la respuesta
// cuelga de otro comentario (hilo); si no, es un comentario nuevo de primer nivel.
async function submitForumReply(event, topicId, parentReplyId = '') {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  if (parentReplyId) data.parent_reply_id = parentReplyId;
  try {
    await window.KMS.api(`/api/forum/topics/${topicId}/replies`, { method: 'POST', body: JSON.stringify(data) });
    window.KMS.toast('Respuesta publicada.');
    openForumTopic(topicId);
    renderForum();
  } catch (error) { window.KMS.toast(error.message, 'error'); }
}

// cambio para el foro (dislike): reaccion "Util" o "No util". reopenDetail=true refresca
// el modal abierto ademas de la lista, para que el contador se actualice en ambos lugares.
async function reactForumTopic(id, type = 'util', reopenDetail = false) {
  const user = forumUser();
  if (!forumCanPost(user)) { window.KMS.toast('Solo Creador ONG y Voluntario pueden reaccionar.', 'error'); return; }
  try {
    await window.KMS.api(`/api/forum/topics/${id}/react`, { method: 'POST', body: JSON.stringify({ type }) });
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
  reactForumTopic, toggleForumReplies, toggleInlineReplyForm
});
