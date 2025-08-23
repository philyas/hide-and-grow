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


