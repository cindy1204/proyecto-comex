(() => {
  const apiUrl = 'http://localhost:3001';
  const tokenKey = 'colcomex-session-token';
  const accountForm = document.getElementById('accountForm');
  const accountNameField = document.getElementById('accountNameField');
  const accountName = document.getElementById('accountName');
  const accountEmail = document.getElementById('accountEmail');
  const accountPassword = document.getElementById('accountPassword');
  const accountCredentials = document.getElementById('accountCredentials');
  const accountSubmit = document.getElementById('accountSubmit');
  const switchAccountMode = document.getElementById('switchAccountMode');
  const logoutAccount = document.getElementById('logoutAccount');
  const accountStatus = document.getElementById('accountStatus');

  function getToken() {
    return sessionStorage.getItem(tokenKey);
  }

  function setAccountMode(mode) {
    accountForm.dataset.mode = mode;
    const registering = mode === 'register';
    accountNameField.hidden = !registering;
    accountName.required = registering;
    accountName.autocomplete = 'name';
    accountPassword.autocomplete = registering ? 'new-password' : 'current-password';
    accountSubmit.textContent = registering ? 'Crear cuenta' : 'Iniciar sesión';
    switchAccountMode.textContent = registering ? 'Ya tengo una cuenta' : 'Crear una cuenta';
  }

  function showSignedIn(user) {
    accountCredentials.hidden = true;
    logoutAccount.hidden = false;
    accountStatus.textContent = `Sesión iniciada como ${user.name} (${user.email}). Ya puedes guardar tu solicitud.`;
  }

  async function request(path, { method = 'GET', body, token } = {}) {
    const headers = { Accept: 'application/json' };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${apiUrl}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error?.message || `No se pudo completar la solicitud (${response.status}).`);
    }
    return result.data;
  }

  window.ColComexApi = Object.freeze({
    async enviarContacto(data) {
      return request('/api/contacto', { method: 'POST', body: data, token: getToken() });
    },
    tieneSesion() {
      return Boolean(getToken());
    },
    async guardarFormulario(type, data) {
      const token = getToken();
      if (!token) {
        accountStatus.textContent = 'Inicia sesión o crea una cuenta antes de guardar el formulario.';
        document.getElementById('accountPanel').scrollIntoView({ behavior: 'smooth', block: 'center' });
        throw new Error('Inicia sesión o crea una cuenta antes de guardar tu solicitud.');
      }
      await request('/api/interaccion', {
        method: 'POST',
        token,
        body: { type, data },
      });
    },
  });

  if (!accountForm) return;

  accountForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    accountStatus.textContent = '';
    accountSubmit.disabled = true;

    try {
      const registering = accountForm.dataset.mode === 'register';
      const result = await request(`/api/auth/${registering ? 'register' : 'login'}`, {
        method: 'POST',
        body: {
          ...(registering ? { name: accountName.value.trim() } : {}),
          email: accountEmail.value.trim(),
          password: accountPassword.value,
        },
      });

      let token = result.token;
      if (registering) {
        const login = await request('/api/auth/login', {
          method: 'POST',
          body: { email: accountEmail.value.trim(), password: accountPassword.value },
        });
        token = login.token;
      }

      if (typeof token !== 'string' || !token) {
        throw new Error('La API no devolvió una sesión válida. Inténtalo de nuevo.');
      }
      sessionStorage.setItem(tokenKey, token);
      showSignedIn(result.user ?? {
        name: accountName.value.trim(),
        email: accountEmail.value.trim(),
      });
      accountPassword.value = '';
    } catch (error) {
      accountStatus.textContent = error instanceof Error
        ? error.message
        : 'No fue posible iniciar sesión. Revisa tu conexión e inténtalo de nuevo.';
    } finally {
      accountSubmit.disabled = false;
    }
  });

  switchAccountMode.addEventListener('click', () => {
    setAccountMode(accountForm.dataset.mode === 'register' ? 'login' : 'register');
    accountStatus.textContent = '';
  });

  logoutAccount.addEventListener('click', () => {
    sessionStorage.removeItem(tokenKey);
    accountCredentials.hidden = false;
    logoutAccount.hidden = true;
    accountPassword.value = '';
    accountStatus.textContent = 'Se cerró la sesión en esta pestaña.';
  });

  setAccountMode('login');
  const savedToken = getToken();
  if (savedToken) {
    request('/api/auth/me', { token: savedToken })
      .then(showSignedIn)
      .catch((error) => {
        sessionStorage.removeItem(tokenKey);
        accountStatus.textContent = error instanceof Error
          ? 'Tu sesión ya no es válida. Inicia sesión de nuevo.'
          : 'No se pudo verificar la sesión. Inicia sesión de nuevo.';
      });
  }
})();
