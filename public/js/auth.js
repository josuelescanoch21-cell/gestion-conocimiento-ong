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

function getSupabaseClient() {
  const configured = window.supabase
    && window.KMS_SUPABASE_URL
    && window.KMS_SUPABASE_ANON_KEY
    && !window.KMS_SUPABASE_ANON_KEY.includes('PEGA_AQUI');

  if (!configured) {
    throw new Error('Supabase no está configurado correctamente.');
  }

  return window.__kmsSupabase || (window.__kmsSupabase = window.supabase.createClient(
    window.KMS_SUPABASE_URL,
    window.KMS_SUPABASE_ANON_KEY
  ));
}

function setMessage(element, text, type = 'error') {
  if (!element) return;
  element.textContent = text;
  element.classList.toggle('success', type === 'success');
}

function setLoading(form, loading) {
  const button = form?.querySelector('button[type="submit"]');
  if (!button) return;
  if (!button.dataset.originalText) button.dataset.originalText = button.textContent;
  button.disabled = loading;
  button.textContent = loading ? 'Procesando...' : button.dataset.originalText;
}

function saveAppUser(user) {
  localStorage.setItem('kms_user', JSON.stringify(user));
}

// Guarda la sesión real de Supabase para que app.js pueda adjuntar el JWT
// en las consultas protegidas por RLS. Solo se almacenan los datos necesarios
// para restaurar la sesión y renovar el token.
function saveSupabaseSession(session) {
  if (!session?.access_token || !session?.refresh_token) {
    localStorage.removeItem('kms_session');
    return;
  }

  localStorage.setItem('kms_session', JSON.stringify({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_at: session.expires_at || null,
    expires_in: session.expires_in || null,
    token_type: session.token_type || 'bearer'
  }));
}

function passwordScore(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

function isStrongPassword(password) {
  return password.length >= 8
    && /[a-z]/.test(password)
    && /[A-Z]/.test(password)
    && /\d/.test(password)
    && /[^A-Za-z0-9]/.test(password);
}

function setupPasswordStrength(form) {
  const passwordInput = form?.elements?.password;
  const strengthBar = document.querySelector('[data-password-strength]');
  const strengthText = document.querySelector('[data-password-strength-text]');
  const strengthBox = strengthBar?.closest('.password-strength');
  if (!passwordInput || !strengthBar || !strengthText || !strengthBox) return;

  const labels = ['Muy débil', 'Débil', 'Aceptable', 'Buena', 'Fuerte'];
  passwordInput.addEventListener('input', () => {
    const score = passwordScore(passwordInput.value);
    strengthBar.style.width = `${score * 25}%`;
    strengthBox.dataset.level = String(score);
    strengthText.textContent = passwordInput.value
      ? `Seguridad: ${labels[score]}`
      : 'La contraseña debe ser fuerte.';
    passwordInput.setAttribute('aria-invalid', String(passwordInput.value.length > 0 && !isStrongPassword(passwordInput.value)));
  });
}

function setupPasswordToggles() {
  document.querySelectorAll('[data-toggle-password]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = button.closest('.auth-password-wrap')?.querySelector('input');
      if (!input) return;
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      button.textContent = show ? 'Ocultar' : 'Ver';
      button.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña');
    });
  });
}

function setupPanelSwitching() {
  const container = document.getElementById('authContainer');
  const showRegisterButtons = [
    document.getElementById('showRegister'),
    ...document.querySelectorAll('[data-show-register]')
  ].filter(Boolean);
  const showLoginButtons = [
    document.getElementById('showLogin'),
    ...document.querySelectorAll('[data-show-login]')
  ].filter(Boolean);

  showRegisterButtons.forEach((button) => button.addEventListener('click', () => {
    container?.classList.add('active');
    document.querySelector('[data-register-form] input')?.focus();
  }));

  showLoginButtons.forEach((button) => button.addEventListener('click', () => {
    container?.classList.remove('active');
    document.querySelector('[data-login-form] input')?.focus();
  }));
}

async function loadAppUserByAuthId(db, authUser) {
  const { data: appUser, error } = await db
    .from('users')
    .select('id, full_name, first_name, last_name, dni, birth_date, phone, email, status, organization_id, ong_affiliation, roles(name), organizations(name)')
    .eq('auth_user_id', authUser.id)
    .maybeSingle();

  if (error) throw error;
  if (!appUser) throw new Error('No se encontró el perfil de la cuenta. Ejecuta la migración SQL incluida.');

  return {
    id: appUser.id,
    auth_user_id: authUser.id,
    name: appUser.full_name || appUser.email,
    full_name: appUser.full_name,
    first_name: appUser.first_name,
    last_name: appUser.last_name,
    dni: appUser.dni,
    birth_date: appUser.birth_date,
    phone: appUser.phone,
    email: appUser.email,
    role: appUser.roles?.name || 'voluntario',
    organization: appUser.organizations?.name || appUser.ong_affiliation || 'Sin ONG indicada',
    organization_id: appUser.organization_id,
    status: appUser.status
  };
}

async function handleLogin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.querySelector('[data-login-message]');
  const formData = new FormData(form);
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');

  setMessage(message, '');
  if (!form.reportValidity()) return;
  setLoading(form, true);

  try {
    // Se conservan los accesos demo originales del proyecto.
    if (demoUsers[email] && password === 'demo123') {
      localStorage.removeItem('kms_session');
      saveAppUser(demoUsers[email]);
      window.location.href = 'dashboard.html';
      return;
    }

    const db = getSupabaseClient();
    const { data, error } = await db.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const appUser = await loadAppUserByAuthId(db, data.user);
    if (appUser.status === 'inactivo') throw new Error('Esta cuenta se encuentra inactiva.');

    await db.from('users').update({ last_login_at: new Date().toISOString() }).eq('id', appUser.id);
    saveAppUser(appUser);
    saveSupabaseSession(data.session);
    window.location.href = 'dashboard.html';
  } catch (error) {
    const commonMessages = {
      'Invalid login credentials': 'Correo o contraseña incorrectos.',
      'Email not confirmed': 'Debes confirmar tu correo antes de iniciar sesión.'
    };
    setMessage(message, commonMessages[error.message] || error.message || 'No se pudo iniciar sesión.');
  } finally {
    setLoading(form, false);
  }
}

async function handleRegister(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.querySelector('[data-register-message]');
  const data = new FormData(form);
  const firstName = String(data.get('first_name') || '').trim();
  const lastName = String(data.get('last_name') || '').trim();
  const dni = String(data.get('dni') || '').trim();
  const birthDate = String(data.get('birth_date') || '');
  const phone = String(data.get('phone') || '').trim();
  const ongAffiliation = String(data.get('ong_affiliation') || '').trim();
  const email = String(data.get('email') || '').trim().toLowerCase();
  const password = String(data.get('password') || '');
  const fullName = `${firstName} ${lastName}`.replace(/\s+/g, ' ').trim();

  setMessage(message, '');
  if (!form.reportValidity()) return;
  if (!/^\d{8}$/.test(dni)) {
    setMessage(message, 'El DNI debe contener exactamente 8 dígitos.');
    return;
  }
  if (!/^[0-9+()\s-]{7,20}$/.test(phone)) {
    setMessage(message, 'Ingresa un número de teléfono válido.');
    return;
  }
  if (!isStrongPassword(password)) {
    setMessage(message, 'La contraseña debe incluir mayúscula, minúscula, número y símbolo.');
    return;
  }

  const selectedDate = new Date(`${birthDate}T00:00:00`);
  if (Number.isNaN(selectedDate.getTime()) || selectedDate >= new Date()) {
    setMessage(message, 'Ingresa una fecha de nacimiento válida.');
    return;
  }

  setLoading(form, true);
  try {
    const db = getSupabaseClient();
    const { data: signUpData, error: signUpError } = await db.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: fullName,
          dni,
          birth_date: birthDate,
          phone,
          ong_affiliation: ongAffiliation || null
        }
      }
    });
    if (signUpError) throw signUpError;
    if (!signUpData.user) throw new Error('Supabase no devolvió el usuario registrado.');

    // La migración crea el perfil automáticamente mediante un trigger.
    // Esta consulta comprueba que el perfil ya exista y permite iniciar de inmediato
    // cuando la confirmación de correo está desactivada en Supabase.
    if (signUpData.session) {
      const appUser = await loadAppUserByAuthId(db, signUpData.user);
      saveAppUser(appUser);
      saveSupabaseSession(signUpData.session);
      setMessage(message, 'Cuenta creada correctamente. Redirigiendo...', 'success');
      window.setTimeout(() => { window.location.href = 'dashboard.html'; }, 500);
      return;
    }

    // Si no existe sesión, la confirmación de correo continúa activa en Supabase.
    // El proyecto está preparado para acceso inmediato: desactiva Confirm email
    // en Authentication > Providers > Email.
    setMessage(message, 'La cuenta fue creada, pero Supabase aún tiene activa la confirmación por correo. Desactiva Confirm email para permitir el acceso inmediato.');
  } catch (error) {
    const commonMessages = {
      'User already registered': 'Ya existe una cuenta registrada con ese correo.',
      'duplicate key value violates unique constraint "users_email_key"': 'Ya existe una cuenta con ese correo.',
      'duplicate key value violates unique constraint "users_dni_key"': 'El DNI ya se encuentra registrado.'
    };
    setMessage(message, commonMessages[error.message] || error.message || 'No se pudo crear la cuenta.');
  } finally {
    setLoading(form, false);
  }
}

async function handleDemoLogin(button) {
  const email = button.dataset.demoLogin;
  let user = demoUsers[email];
  try {
    const db = getSupabaseClient();
    const { data } = await db
      .from('users')
      .select('id, full_name, email, organization_id, roles(name), organizations(name)')
      .eq('email', email)
      .maybeSingle();
    if (data) {
      user = {
        id: data.id,
        name: data.full_name,
        full_name: data.full_name,
        email: data.email,
        role: data.roles?.name || user.role,
        organization: data.organizations?.name || user.organization,
        organization_id: data.organization_id
      };
    }
  } catch {
    // Si Supabase no responde, el acceso demo local continúa funcionando.
  }
  // Las cuentas demo no deben reutilizar el JWT de una sesión real anterior.
  localStorage.removeItem('kms_session');
  saveAppUser(user);
  window.location.href = 'dashboard.html';
}

function initLogin() {
  const loginForm = document.querySelector('[data-login-form]');
  const registerForm = document.querySelector('[data-register-form]');

  setupPanelSwitching();
  setupPasswordToggles();
  setupPasswordStrength(registerForm);

  loginForm?.addEventListener('submit', handleLogin);
  registerForm?.addEventListener('submit', handleRegister);
  document.querySelectorAll('[data-demo-login]').forEach((button) => {
    button.addEventListener('click', () => handleDemoLogin(button));
  });
}

async function logout() {
  try {
    const db = getSupabaseClient();
    await db.auth.signOut();
  } catch {
    // También permite cerrar las sesiones demo/locales.
  }
  localStorage.removeItem('kms_session');
  localStorage.removeItem('kms_user');
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', initLogin);
window.logout = logout;
