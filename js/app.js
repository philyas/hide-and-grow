(function() {
  const html = document.documentElement;
  const LS_KEY = 'hg_auth_token';

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Elements
  const loginView = document.getElementById('loginView');
  const appView = document.getElementById('appView');
  const loginForm = document.getElementById('loginForm');
  const loginStatus = document.getElementById('loginStatus');
  const userName = document.getElementById('userName');
  const logoutBtn = document.getElementById('logoutBtn');
  const routeContainer = document.getElementById('routeContainer');
  const nav = document.querySelector('.app-nav');

  function isAuthenticated() {
    return localStorage.getItem(LS_KEY) === 'admin';
  }

  function showLogin() {
    loginView.classList.remove('hidden');
    appView.classList.add('hidden');
  }

  function showApp() {
    loginView.classList.add('hidden');
    appView.classList.remove('hidden');
    routeTo('overview');
    routeContainer.focus();
  }

  function setAuth(user) {
    localStorage.setItem(LS_KEY, user);
  }

  function clearAuth() {
    localStorage.removeItem(LS_KEY);
  }

  // Dummy insights
  const insights = [
    { title: 'Wasserersparnis', value: '-32%', detail: 'vs. letzte Woche' },
    { title: 'Feuchte Ø', value: '48%', detail: 'Boden 0–20 cm' },
    { title: 'Temp Ø', value: '19.4°C', detail: 'Letzte 24h' },
    { title: 'Zyklen heute', value: '3', detail: 'A:2 · B:1' }
  ];

  function renderInsights() {
    const grid = document.getElementById('insightsGrid');
    if (!grid) return;
    grid.innerHTML = insights.map((it) => `
      <div class="insight-card">
        <div class="insight-title">${it.title}</div>
        <div class="insight-value">${it.value}</div>
        <div class="insight-detail">${it.detail}</div>
      </div>
    `).join('');
  }

  function routeTo(name) {
    // Nav active
    document.querySelectorAll('.app-nav-link').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.route === name);
    });
    // Views
    document.querySelectorAll('.route').forEach(view => {
      view.classList.toggle('hidden', view.getAttribute('data-route') !== name);
    });
    if (name === 'insights') renderInsights();
  }

  // Wire login
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      loginStatus.textContent = '';
      const username = (document.getElementById('username') || {}).value || '';
      const password = (document.getElementById('password') || {}).value || '';
      await new Promise(r => setTimeout(r, 350));
      if (username === 'admin' && password === 'admin') {
        setAuth('admin');
        if (userName) userName.textContent = 'admin';
        showApp();
      } else {
        loginStatus.style.color = '#b00020';
        loginStatus.textContent = html.lang === 'en' ? 'Invalid credentials.' : 'Ungültige Zugangsdaten.';
      }
    });
  }

  // Wire nav
  if (nav) {
    nav.addEventListener('click', (e) => {
      const btn = e.target.closest('.app-nav-link');
      if (!btn) return;
      routeTo(btn.dataset.route);
    });
  }

  // Actions (demo)
  const actionRun = document.getElementById('actionRun');
  const actionStop = document.getElementById('actionStop');
  function toast(msg, ok = true) {
    const el = document.createElement('div');
    el.className = `app-toast ${ok ? 'ok' : 'err'}`;
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => { el.classList.add('show'); }, 10);
    setTimeout(() => { el.classList.remove('show'); el.remove(); }, 2500);
  }
  actionRun && actionRun.addEventListener('click', () => toast('Bewässerung gestartet'));
  actionStop && actionStop.addEventListener('click', () => toast('Bewässerung gestoppt'));

  // Logout
  logoutBtn && logoutBtn.addEventListener('click', () => {
    clearAuth();
    showLogin();
  });

  // Init
  if (isAuthenticated()) showApp();
  else showLogin();
})();


