function normalize(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function matchesPageScope(item, scope) {
  const category = normalize(item.category);
  const type = normalize(item.document_type || item.type);
  if (scope === 'knowledge') return category !== normalize('Leyes para ONG') && type !== 'ley';
  if (scope === 'laws') return category === normalize('Leyes para ONG') || type === 'ley';
  return true;
}

function matchesFilters(item, query, filters = {}, scope = '') {
  const needle = normalize(query);
  const tags = Array.isArray(item.tags) ? item.tags : [];
  const roles = Array.isArray(item.roles) ? item.roles : (Array.isArray(item.visible_to_roles) ? item.visible_to_roles : []);
  const text = normalize([item.title, item.description, item.content, tags.join(' '), item.author].join(' '));

  const matchesText = !needle || text.includes(needle);
  const matchesCategory = !filters.category || normalize(item.category) === normalize(filters.category);
  const matchesSubcategory = !filters.subcategory || normalize(item.subcategory) === normalize(filters.subcategory);
  const matchesAuthor = !filters.author || normalize(item.author).includes(normalize(filters.author));
  const matchesType = !filters.type || normalize(item.document_type || item.type) === normalize(filters.type);
  const matchesRole = !filters.role || roles.some((role) => normalize(role) === normalize(filters.role));

  return matchesText && matchesCategory && matchesSubcategory && matchesAuthor && matchesType && matchesRole && matchesPageScope(item, scope) && window.KMS.canRead(item);
}

function runLocalSearch(query, filters = {}, scope = '') {
  return window.KMS.demo.items.filter((item) => matchesFilters(item, query, filters, scope));
}

async function runRemoteSearch(query, filters = {}, scope = '') {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (filters.category) params.set('categoryName', filters.category);
  if (filters.subcategory) params.set('subcategoryName', filters.subcategory);
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
  })).filter((item) => matchesFilters(item, query, filters, scope));
}

function initSearch() {
  const input = document.querySelector('[data-search-input]');
  const suggestions = document.querySelector('[data-suggestions]');
  const results = document.querySelector('[data-search-results]');
  if (!input) return;

  let timer;
  const scope = document.body.dataset.searchScope || '';
  const urlParams = new URLSearchParams(location.search);
  const categoryFilter = document.querySelector('[data-filter-category]');
  const subcategoryFilter = document.querySelector('[data-filter-subcategory]');

  if (categoryFilter && urlParams.get('categoria')) categoryFilter.value = urlParams.get('categoria');
  if (subcategoryFilter && urlParams.get('subcategoria')) subcategoryFilter.value = urlParams.get('subcategoria');

  const execute = async () => {
    const filters = {
      category: categoryFilter?.value || '',
      subcategory: subcategoryFilter?.value || '',
      author: document.querySelector('[data-filter-author]')?.value || '',
      type: document.querySelector('[data-filter-type]')?.value || '',
      role: document.querySelector('[data-filter-role]')?.value || ''
    };

    let found;
    try { found = await runRemoteSearch(input.value, filters, scope); }
    catch { found = runLocalSearch(input.value, filters, scope); }

    if (results) window.KMS.renderCards(results.id, found);
    const counter = document.querySelector('[data-results-count]');
    if (counter) counter.textContent = `${found.length} resultado${found.length === 1 ? '' : 's'}`;

    if (suggestions) {
      const terms = [...new Set(found.flatMap((item) => [item.title, item.author, ...(item.tags || [])]).filter(Boolean))].slice(0, 8);
      suggestions.innerHTML = terms.map((term) => `<button type="button">${window.KMS.escapeHtml(term)}</button>`).join('');
      suggestions.style.display = input.value && terms.length ? 'block' : 'none';
      suggestions.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => { input.value = button.textContent; suggestions.style.display = 'none'; execute(); });
      });
    }
  };

  input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(execute, 250); });
  document.querySelectorAll('[data-filter-category], [data-filter-subcategory], [data-filter-author], [data-filter-type], [data-filter-role]').forEach((filter) => {
    filter.addEventListener('input', execute);
    filter.addEventListener('change', execute);
  });
  document.addEventListener('click', (event) => { if (suggestions && !event.target.closest('.search-box')) suggestions.style.display = 'none'; });
  document.addEventListener('kms:filters-ready', execute);
  execute();
}

document.addEventListener('DOMContentLoaded', initSearch);
