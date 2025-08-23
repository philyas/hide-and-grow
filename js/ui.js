(function() {
  const html = document.documentElement;

  // Smooth scroll (disabled for audience toggle buttons)
  document.querySelectorAll('[data-scroll], .top-nav a').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (a.hasAttribute('data-aud-toggle')) return;
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Reduced motion handling for hero video
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const heroVideo = document.getElementById('heroVideo');
  function handleMotionPref() {
    if (!heroVideo) return;
    if (reduce.matches) {
      heroVideo.pause();
      heroVideo.removeAttribute('autoplay');
      heroVideo.removeAttribute('loop');
    }
  }
  reduce.addEventListener('change', handleMotionPref);
  handleMotionPref();

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if (reduce.matches) {
    reveals.forEach(el => el.classList.add('in-view'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));
  }

  // Parallax effect for hero text (subtle)
  function onScrollParallax() {
    const hero = document.querySelector('.hero');
    const content = document.querySelector('.hero-content');
    const headerImg = document.querySelector('.card.parallax img');
    if (hero && content) {
      const rect = hero.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, -rect.top / rect.height));
      content.style.transform = `translateY(${ratio * 20}px)`;
    }
    if (headerImg) {
      const rect2 = headerImg.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const visible = Math.max(0, Math.min(rect2.bottom, viewport) - Math.max(rect2.top, 0));
      const vRatio = visible / Math.max(1, rect2.height);
      headerImg.style.transform = `scale(${1 + vRatio * 0.04}) translateY(${(1 - vRatio) * 10}px)`;
      headerImg.style.willChange = 'transform';
      headerImg.style.transition = 'transform 100ms linear';
    }
  }
  if (!reduce.matches) {
    window.addEventListener('scroll', onScrollParallax, { passive: true });
  }
})();


// Mobile/Tablet side navigation and section switching
(function() {
  const menuBtn = document.getElementById('menuToggle');
  const sideNav = document.getElementById('sideNav');
  const sideOverlay = document.getElementById('sideOverlay');
  const closeBtn = document.getElementById('closeSideNav');
  const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;

  if (!menuBtn || !sideNav) return;

  function openSide() {
    sideNav.classList.add('open');
    sideOverlay && (sideOverlay.hidden = false);
    document.body.style.overflow = 'hidden';
    menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeSide() {
    sideNav.classList.remove('open');
    sideOverlay && (sideOverlay.hidden = true);
    document.body.style.overflow = '';
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', openSide);
  closeBtn && closeBtn.addEventListener('click', closeSide);
  sideOverlay && sideOverlay.addEventListener('click', closeSide);

  const sectionIds = ['hero','products','viewer','irrigation-section','benefits','stories','references','contact'];
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function isMobile() {
    return window.matchMedia('(max-width: 979.98px)').matches;
  }

  function showOnlySection(id) {
    if (!isMobile()) return;
    document.body.classList.add('nav-mode');
    sections.forEach(sec => sec.classList.remove('active-section'));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active-section');
      // optional: scroll to top for focus context
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Default: when entering mobile, show hero only
  function ensureInitialMobileState() {
    if (isMobile()) {
      if (!sections.some(s => s.classList.contains('active-section'))) {
        showOnlySection('hero');
      } else {
        document.body.classList.add('nav-mode');
      }
    } else {
      // On desktop show all
      document.body.classList.remove('nav-mode');
      sections.forEach(sec => sec.classList.remove('active-section'));
    }
  }
  ensureInitialMobileState();
  window.addEventListener('resize', ensureInitialMobileState);

  // Wire side nav links
  sideNav.addEventListener('click', (e) => {
    const link = e.target.closest('a.side-link');
    if (!link) return;
    const targetId = link.getAttribute('data-section-target');
    if (targetId) {
      e.preventDefault();
      showOnlySection(targetId);
      closeSide();
    }
  });
})();

