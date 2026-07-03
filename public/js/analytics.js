function renderBarChart(targetId, rows = []) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const max = Math.max(...rows.map((row) => Number(row.value || 0)), 1);
  target.innerHTML = rows.length ? rows.map((row) => `
    <div class="bar-row">
      <span>${window.KMS.escapeHtml(row.label)}</span>
      <div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${Math.max(4, (Number(row.value || 0) / max) * 100)}%"></div></div>
      <strong>${row.value}</strong>
    </div>
  `).join('') : '<p class="muted">Sin datos aun.</p>';
}

async function initAnalytics() {
  if (!document.body.dataset.analyticsPage) return;
  window.KMS.layoutInit('analytics');
  try {
    const data = await window.KMS.api('/api/analytics');
    renderBarChart('chartDocs', data.topDocuments);
    renderBarChart('chartCategories', data.topCategories);
    renderBarChart('chartNoResults', data.noResultSearches);
    renderBarChart('chartOpportunities', data.opportunities);
    renderBarChart('chartRoles', data.activityByRole);
    renderBarChart('chartLow', data.lowVisitedContent);
    renderBarChart('chartApplicationStatus', data.applicationsByStatus || []);
    renderBarChart('chartFavorites', data.favoritesByItem || []);
  } catch (error) {
    const items = window.KMS.demo.items;
    renderBarChart('chartDocs', items.map((item) => ({ label: item.title, value: item.views || 0 })).sort((a, b) => b.value - a.value));
    renderBarChart('chartCategories', Object.entries(items.reduce((acc, item) => { acc[item.category] = (acc[item.category] || 0) + (item.views || 0); return acc; }, {})).map(([label, value]) => ({ label, value })));
    renderBarChart('chartNoResults', []);
    renderBarChart('chartOpportunities', window.KMS.demo.opportunities.map((item) => ({ label: item.title, value: item.applicants || 0 })));
    renderBarChart('chartRoles', []);
    renderBarChart('chartLow', items.slice().sort((a, b) => (a.views || 0) - (b.views || 0)).map((item) => ({ label: item.title, value: item.views || 0 })));
  }
}

document.addEventListener('DOMContentLoaded', initAnalytics);
