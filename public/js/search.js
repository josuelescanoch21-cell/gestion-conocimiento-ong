function normalize(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function matchesPageScope(item, scope) {
  if (scope === 'knowledge') return item.category !== 'Leyes para ONG' && item.type !== 'ley' && item.document_type !== 'ley';
  if (scope === 'laws') return item.category === 'Leyes para ONG' || item.type === 'ley' || item.document_type === 'ley';
  return true;
}

function runLocalSearch(query, filters = {}, scope = '') {
  const needle = normalize(query);
  return window.KMS.demo.items.filter((item) => {
    const text = normalize([item.title, item.description, item.content, item.tags.join(' '), item.author].join(' '));
    const matchesText = !needle || text.includes(needle);
    const matchesCategory = !filters.category || item.category === filters.category;
    const matchesAuthor = !filters.author || normalize(item.author).includes(normalize(filters.author));
    const matchesType = !filters.type || item.type === filters.type;
    const matchesRole = !filters.role || item.roles.includes(filters.role);
    return matchesText && matchesCategory && matchesAuthor && matchesType && matchesRole && matchesPageScope(item, scope) && window.KMS.canRead(item);
  });
}

async function runRemoteSearch(query, filters = {}, scope = '') {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (filters.category) params.set('categoryName', filters.category);
  if (filters.author) params.set('author', filters.author);
  if (filters.type) params.set('type', filters.type);
  if (filters.role) params.set('role', filters.role);
  const results = await window.KMS.api(`/api/search?${params.toString()}`);
  return results.map((item) => ({
    ...item,
    category: item.categories?.name || item.category,
    subcategory: item.subcategories?.name || item.subcategory,
    author: item.author_name || item.users?.full_name || item.author,
    organization: item.organizations?.name || item.organization,
    type: item.document_type || item.type,
    roles: item.visible_to_roles || item.roles || []
  })).filter((item) => matchesPageScope(item, scope) && window.KMS.canRead(item));
}

function initSearch() {
  const input = document.querySelector('[data-search-input]');
  const suggestions = document.querySelector('[data-suggestions]');
  const results = document.querySelector('[data-search-results]');
  if (!input) return;
  let timer;
  const scope = document.body.dataset.searchScope || '';

  const execute = async () => {
    const filters = {
      category: document.querySelector('[data-filter-category]')?.value,
      author: document.querySelector('[data-filter-author]')?.value,
      type: document.querySelector('[data-filter-type]')?.value,
      role: document.querySelector('[data-filter-role]')?.value
    };
    let found;
    try { found = await runRemoteSearch(input.value, filters, scope); }
    catch { found = runLocalSearch(input.value, filters, scope); }
    if (results) window.KMS.renderCards(results.id, found);

    if (suggestions) {
      const terms = found.flatMap((item) => [item.title, item.author, ...(item.tags || [])]).filter(Boolean).slice(0, 8);
      suggestions.innerHTML = terms.map((term) => `<button type="button">${window.KMS.escapeHtml(term)}</button>`).join('');
      suggestions.style.display = input.value ? 'block' : 'none';
      suggestions.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => { input.value = button.textContent; suggestions.style.display = 'none'; execute(); });
      });
    }
  };

  input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(execute, 250); });
  document.querySelectorAll('[data-filter-category], [data-filter-author], [data-filter-type], [data-filter-role]').forEach((filter) => {
    filter.addEventListener('input', execute);
    filter.addEventListener('change', execute);
  });
  document.addEventListener('click', (event) => { if (suggestions && !event.target.closest('.search-box')) suggestions.style.display = 'none'; });
  execute();
}

document.addEventListener('DOMContentLoaded', initSearch);
