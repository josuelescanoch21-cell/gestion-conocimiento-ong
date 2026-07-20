async function initAudit() {
  const target = document.getElementById('auditTable');
  if (!target) return;
  try {
    const logs = await window.KMS.api('/api/audit');
    target.innerHTML = logs.map((log) => `
      <tr><td>${window.KMS.escapeHtml((log.created_at || '').slice(0, 19).replace('T', ' '))}</td><td><strong>${window.KMS.escapeHtml(log.action)}</strong></td><td>${window.KMS.escapeHtml(log.users?.full_name || log.actor_id || 'Sistema')}</td><td>${window.KMS.escapeHtml(log.entity_type)}</td></tr>
    `).join('');
  } catch (error) {
    target.innerHTML = `<tr><td colspan="4">${window.KMS.escapeHtml(error.message)}</td></tr>`;
  }
}
document.addEventListener('DOMContentLoaded', initAudit);
