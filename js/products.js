(function() {
  const tabs = document.querySelectorAll('.tab');
  const tabList = document.querySelector('.tabs');
  const grid = document.getElementById('productGrid');
  if (!tabs.length || !tabList || !grid) return;

  const filterCards = (filter) => {
    grid.querySelectorAll('.card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  };

  function activateTab(tab) {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); t.setAttribute('tabindex', '-1'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    filterCards(tab.dataset.filter);
    tab.focus();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
  });
  tabList.addEventListener('keydown', (e) => {
    const current = document.activeElement;
    const idx = Array.from(tabs).indexOf(current);
    if (idx === -1) return;
    let nextIdx = idx;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = tabs.length - 1;
    else if (e.key === 'Enter' || e.key === ' ') { activateTab(current); e.preventDefault(); return; }
    if (nextIdx !== idx) { e.preventDefault(); activateTab(tabs[nextIdx]); }
  });
})();


