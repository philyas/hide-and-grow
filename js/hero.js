(function() {
  const html = document.documentElement;
  const AUD_KEY = 'audience'; // 'pro' or 'b2c'
  const heroPro = document.querySelector('[data-aud-toggle="pro"]');
  const heroB2c = document.querySelector('[data-aud-toggle="b2c"]');
  const audiencePanel = document.getElementById('audiencePanel');

  function setAudience(aud) {
    const next = (aud === 'pro' || aud === 'b2c') ? aud : 'b2c';
    document.body.classList.toggle('mode-pro', next === 'pro');
    document.body.classList.toggle('mode-b2c', next === 'b2c');
    if (heroPro && heroB2c) {
      heroPro.classList.toggle('active', next === 'pro');
      heroB2c.classList.toggle('active', next === 'b2c');
    }
    if (audiencePanel) {
      audiencePanel.querySelectorAll('[data-aud]').forEach(card => {
        card.classList.toggle('hidden', card.getAttribute('data-aud') !== next);
      });
    }
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
      productGrid.querySelectorAll('.card').forEach(card => {
        card.removeAttribute('data-aud-hidden');
      });
    }
    const productsTitle = document.getElementById('products-title');
    if (productsTitle) {
      productsTitle.textContent = (html.lang === 'en')
        ? (next === 'pro' ? 'Products • Professional' : 'Products • Home & Garden')
        : (next === 'pro' ? 'Produkte • Profi' : 'Produkte • Privat');
    }
    localStorage.setItem(AUD_KEY, next);
    const url = new URL(window.location);
    url.searchParams.set('aud', next);
    window.history.replaceState({}, '', url);
  }

  (function initAudience(){
    const params = new URLSearchParams(window.location.search);
    const urlAud = params.get('aud');
    const storedAud = localStorage.getItem(AUD_KEY);
    const initialAud = (urlAud === 'pro' || urlAud === 'b2c') ? urlAud : (storedAud || 'b2c');
    setAudience(initialAud);
  })();

  if (heroPro) heroPro.addEventListener('click', (e) => { e.preventDefault(); setAudience('pro'); });
  if (heroB2c) heroB2c.addEventListener('click', (e) => { e.preventDefault(); setAudience('b2c'); });
})();


