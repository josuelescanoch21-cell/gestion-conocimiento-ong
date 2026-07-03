const demoUsers = {
  'admin@ongkms.test': {
    name: 'Ana Administradora',
    email: 'admin@ongkms.test',
    role: 'administrador',
    organization: 'Manos Abiertas'
  },
  'creador@ongkms.test': {
    name: 'Carlos Creador ONG',
    email: 'creador@ongkms.test',
    role: 'creador_ong',
    organization: 'Manos Abiertas'
  },
  'voluntario@ongkms.test': {
    name: 'Valeria Voluntaria',
    email: 'voluntario@ongkms.test',
    role: 'voluntario',
    organization: 'Puentes de Impacto'
  }
};

function initLogin() {
  const form = document.querySelector('[data-login-form]');
  const quickButtons = document.querySelectorAll('[data-demo-login]');
  if (!form) return;

  quickButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const email = button.dataset.demoLogin;
      let user = demoUsers[email];
      try {
        if (window.supabase && window.KMS_SUPABASE_URL && window.KMS_SUPABASE_ANON_KEY && !window.KMS_SUPABASE_ANON_KEY.includes('PEGA_AQUI')) {
          const db = window.__kmsSupabase || (window.__kmsSupabase = window.supabase.createClient(window.KMS_SUPABASE_URL, window.KMS_SUPABASE_ANON_KEY));
          const { data } = await db.from('users').select('id, full_name, email, organization_id, roles(name), organizations(name)').eq('email', email).maybeSingle();
          if (data) user = { id: data.id, name: data.full_name, full_name: data.full_name, email: data.email, role: data.roles?.name || user.role, organization: data.organizations?.name || user.organization, organization_id: data.organization_id };
        }
      } catch { /* mantiene usuario demo local */ }
      localStorage.setItem('kms_user', JSON.stringify(user));
      window.location.href = 'dashboard.html';
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const email = String(formData.get('email')).trim();
    const password = String(formData.get('password')).trim();
    const message = document.querySelector('[data-login-message]');

    if (demoUsers[email] && password === 'demo123') {
      localStorage.setItem('kms_user', JSON.stringify(demoUsers[email]));
      window.location.href = 'dashboard.html';
      return;
    }

    try {
      if (password !== 'demo123') throw new Error('Clave demo incorrecta');
      if (!window.supabase || !window.KMS_SUPABASE_URL || !window.KMS_SUPABASE_ANON_KEY || window.KMS_SUPABASE_ANON_KEY.includes('PEGA_AQUI')) {
        throw new Error('Supabase frontend no configurado');
      }
      const db = window.__kmsSupabase || (window.__kmsSupabase = window.supabase.createClient(window.KMS_SUPABASE_URL, window.KMS_SUPABASE_ANON_KEY));
      const { data: appUser, error } = await db
        .from('users')
        .select('id, full_name, email, status, organization_id, roles(name), organizations(name)')
        .eq('email', email)
        .maybeSingle();
      if (error) throw error;
      if (!appUser) throw new Error('Usuario no encontrado');
      localStorage.setItem('kms_user', JSON.stringify({
        id: appUser.id,
        name: appUser.full_name || appUser.email,
        full_name: appUser.full_name,
        email: appUser.email,
        role: appUser.roles?.name || 'voluntario',
        organization: appUser.organizations?.name || 'ONG',
        organization_id: appUser.organization_id
      }));
      localStorage.removeItem('kms_session');
      window.location.href = 'dashboard.html';
    } catch (error) {
      message.textContent = 'No se pudo iniciar sesion. Usa demo123 y revisa que js/supabase-config.js tenga tu Publishable Key.';
    }
  });
}

function logout() {
  localStorage.removeItem('kms_session');
  localStorage.removeItem('kms_user');
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', initLogin);
window.logout = logout;
