(function() {
  const html = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const irrig = document.getElementById('irrigation');
  if (!irrig) return;

  const playPauseBtn = document.getElementById('playPause');
  const speedInput = document.getElementById('speed');
  const zoneAInput = document.getElementById('zoneA');
  const zoneBInput = document.getElementById('zoneB');
  const overlayInput = document.getElementById('overlay');
  const svgHost = irrig.querySelector('.irrigation-svg');
  const zoneAGroup = irrig.querySelector('#zoneAGroup');
  const zoneBGroup = irrig.querySelector('#zoneBGroup');
  const zoneCInput = document.getElementById('zoneC');
  const zoneDInput = document.getElementById('zoneD');
  const zoneCGroup = irrig.querySelector('#zoneCGroup');
  const zoneDGroup = irrig.querySelector('#zoneDGroup');

  function setPaused(paused) {
    svgHost.classList.toggle('paused', paused);
    playPauseBtn.setAttribute('aria-pressed', paused ? 'false' : 'true');
    playPauseBtn.textContent = (html.lang === 'en') ? (paused ? 'Play' : 'Pause') : (paused ? 'Abspielen' : 'Pause');
    playPauseBtn.dataset.i18n = paused ? 'irrig.play' : 'irrig.pause';
  }
  let isPaused = false;
  setPaused(isPaused);
  playPauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    setPaused(isPaused);
  });

  function setSpeed(multiplier) {
    irrig.style.setProperty('--flow-speed', String(multiplier));
    irrig.querySelectorAll('animateMotion').forEach(node => {
      const base = 8;
      node.setAttribute('dur', `${base / multiplier}s`);
    });
  }
  setSpeed(parseFloat(speedInput.value || '1'));
  speedInput.addEventListener('input', () => {
    const val = Math.max(0.5, Math.min(3, parseFloat(speedInput.value || '1')));
    setSpeed(val);
  });

  function setZoneEnabled(group, enabled) {
    group.classList.toggle('zone-muted', !enabled);
    group.querySelectorAll('.flow, .spray, .droplet animateMotion').forEach(el => {
      if (el.tagName.toLowerCase() === 'animatemotion') {
        el.parentElement.style.display = enabled ? '' : 'none';
      } else {
        el.style.display = enabled ? '' : 'none';
      }
    });
  }
  setZoneEnabled(zoneAGroup, zoneAInput.checked);
  setZoneEnabled(zoneBGroup, zoneBInput.checked);
  if (zoneCGroup && zoneCInput) setZoneEnabled(zoneCGroup, zoneCInput.checked);
  if (zoneDGroup && zoneDInput) setZoneEnabled(zoneDGroup, zoneDInput.checked);
  zoneAInput.addEventListener('change', () => setZoneEnabled(zoneAGroup, zoneAInput.checked));
  zoneBInput.addEventListener('change', () => setZoneEnabled(zoneBGroup, zoneBInput.checked));
  zoneCInput && zoneCInput.addEventListener('change', () => setZoneEnabled(zoneCGroup, zoneCInput.checked));
  zoneDInput && zoneDInput.addEventListener('change', () => setZoneEnabled(zoneDGroup, zoneDInput.checked));

  function setOverlay(show) {
    svgHost.classList.toggle('show-overlay', show);
  }
  setOverlay(true);
  overlayInput.checked = true;
  overlayInput.addEventListener('change', () => setOverlay(overlayInput.checked));

  if (reduce.matches) setPaused(true);
  reduce.addEventListener('change', () => { if (reduce.matches) setPaused(true); });
})();


