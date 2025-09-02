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

  // Info Modal Functionality
  const infoModal = document.getElementById('infoModal');
  const infoModalTitle = document.getElementById('infoModalTitle');
  const infoModalBody = document.getElementById('infoModalBody');
  const infoModalClose = document.getElementById('infoModalClose');

  // Info content for different zones and components
  const infoContent = {
    source: {
      title: 'Wasserquelle & Technik',
      content: `
        <h4>Wasserquelle</h4>
        <p>Das Herzstück Ihrer Bewässerungsanlage mit integrierter Technik für optimale Wasserversorgung.</p>
        
        <div class="tech-specs">
          <h5>Technische Komponenten:</h5>
          <p><strong>Ventil:</strong> Elektronisch gesteuertes Magnetventil für präzise Wassermengensteuerung</p>
          <p><strong>Pumpe:</strong> Hochleistungspumpe mit variabler Förderleistung (2-8 bar)</p>
          <p><strong>Durchflusssensor:</strong> Präzise Messung des Wasserverbrauchs für optimale Effizienz</p>
        </div>
        
        <h4>Vorteile</h4>
        <ul>
          <li>Energiesparende Pumpentechnologie</li>
          <li>Automatische Druckregelung</li>
          <li>Überwachung der Wasserqualität</li>
          <li>Wartungsfreundliche Konstruktion</li>
        </ul>
      `
    },
    main: {
      title: 'Hauptleitung',
      content: `
        <h4>Hauptleitungssystem</h4>
        <p>Das zentrale Verteilersystem transportiert das Wasser effizient zu allen Bewässerungszonen.</p>
        
        <div class="tech-specs">
          <h5>Technische Details:</h5>
          <p><strong>Material:</strong> PE-HD Rohre (Polyethylen hoher Dichte)</p>
          <p><strong>Durchmesser:</strong> 32mm für optimale Durchflussmenge</p>
          <p><strong>Druck:</strong> Betriebsdruck 2-6 bar</p>
          <p><strong>Isolierung:</strong> Frostschutz bis -20°C</p>
        </div>
        
        <h4>Funktionen</h4>
        <ul>
          <li>Gleichmäßige Druckverteilung</li>
          <li>Minimale Druckverluste</li>
          <li>Langlebige Konstruktion</li>
          <li>Einfache Wartung</li>
        </ul>
      `
    },
    zoneA: {
      title: 'Zone A - Beete',
      content: `
        <h4>Beet-Bewässerung Zone A</h4>
        <p>Spezialisierte Bewässerung für Blumen- und Gemüsebeete mit angepasster Technik.</p>
        
        <div class="tech-specs">
          <h5>Bewässerungstechnik:</h5>
          <p><strong>Sprinkler:</strong> 2x Viereckregner mit 90° Abdeckung</p>
          <p><strong>Reichweite:</strong> 3-6m je nach Druck</p>
          <p><strong>Wasserverbrauch:</strong> 2-4 L/min je Sprinkler</p>
          <p><strong>Beregnungsart:</strong> Tropfenfreie, sanfte Beregnung</p>
        </div>
        
        <h4>Besonderheiten für Beete</h4>
        <ul>
          <li>Angepasste Beregnungshöhe für empfindliche Pflanzen</li>
          <li>Regulierung der Tropfengröße</li>
          <li>Optimale Verteilung für dichte Bepflanzung</li>
          <li>Schutz vor Bodenerosion</li>
        </ul>
      `
    },
    zoneB: {
      title: 'Zone B - Rasen',
      content: `
        <h4>Rasen-Bewässerung Zone B</h4>
        <p>Professionelle Rasenbewässerung mit speziell entwickelten Sprinklern für optimales Graswachstum.</p>
        
        <div class="tech-specs">
          <h5>Bewässerungstechnik:</h5>
          <p><strong>Sprinkler:</strong> 2x Viereckregner mit 90° Abdeckung</p>
          <p><strong>Reichweite:</strong> 4-8m je nach Druck</p>
          <p><strong>Wasserverbrauch:</strong> 3-6 L/min je Sprinkler</p>
          <p><strong>Beregnungsart:</strong> Kraftvolle, gleichmäßige Beregnung</p>
        </div>
        
        <h4>Rasenoptimierung</h4>
        <ul>
          <li>Gleichmäßige Wasserverteilung für sattes Grün</li>
          <li>Angepasste Beregnungsstärke für Rasenflächen</li>
          <li>Minimierung von Trockenstellen</li>
          <li>Förderung der Wurzelbildung</li>
        </ul>
      `
    },
    zoneC: {
      title: 'Zone C - Kompakte Beete',
      content: `
        <h4>Kompakte Beet-Bewässerung Zone C</h4>
        <p>Spezialisierte Bewässerung für kleinere Beetflächen mit präziser Technik.</p>
        
        <div class="tech-specs">
          <h5>Bewässerungstechnik:</h5>
          <p><strong>Sprinkler:</strong> 2x Viereckregner mit 90° Abdeckung</p>
          <p><strong>Reichweite:</strong> 2-4m je nach Druck</p>
          <p><strong>Wasserverbrauch:</strong> 1.5-3 L/min je Sprinkler</p>
          <p><strong>Beregnungsart:</strong> Präzise, kontrollierte Beregnung</p>
        </div>
        
        <h4>Kompakte Lösung</h4>
        <ul>
          <li>Optimiert für kleine Gartenflächen</li>
          <li>Energiesparende Bewässerung</li>
          <li>Präzise Wasserverteilung</li>
          <li>Ideal für Balkon- und Terrassengärten</li>
        </ul>
      `
    },
    zoneD: {
      title: 'Zone D - Kompakter Rasen',
      content: `
        <h4>Kompakte Rasen-Bewässerung Zone D</h4>
        <p>Effiziente Rasenbewässerung für kleinere Grünflächen mit angepasster Technik.</p>
        
        <div class="tech-specs">
          <h5>Bewässerungstechnik:</h5>
          <p><strong>Sprinkler:</strong> 2x Viereckregner mit 90° Abdeckung</p>
          <p><strong>Reichweite:</strong> 2-4m je nach Druck</p>
          <p><strong>Wasserverbrauch:</strong> 2-4 L/min je Sprinkler</p>
          <p><strong>Beregnungsart:</strong> Sanfte, gleichmäßige Beregnung</p>
        </div>
        
        <h4>Kompakte Rasenlösung</h4>
        <ul>
          <li>Perfekt für kleine Rasenflächen</li>
          <li>Energieeffiziente Bewässerung</li>
          <li>Gleichmäßige Wasserverteilung</li>
          <li>Ideal für Stadtgärten</li>
        </ul>
      `
    }
  };

  // Function to show info modal
  function showInfoModal(infoType) {
    const content = infoContent[infoType];
    if (content) {
      infoModalTitle.textContent = content.title;
      infoModalBody.innerHTML = content.content;
      infoModal.style.display = 'flex';
      setTimeout(() => {
        infoModal.classList.add('show');
        // Focus the close button for accessibility
        if (infoModalClose) {
          infoModalClose.focus();
        }
      }, 10);
    }
  }

  // Function to hide info modal
  function hideInfoModal() {
    infoModal.classList.remove('show');
    setTimeout(() => {
      infoModal.style.display = 'none';
    }, 300);
  }

  // Add click event listeners to info buttons
  function setupInfoButtons() {
    document.querySelectorAll('.info-button').forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const infoType = button.getAttribute('data-info');
        showInfoModal(infoType);
      });
    });
  }

  // Close modal when clicking close button
  if (infoModalClose) {
    infoModalClose.addEventListener('click', hideInfoModal);
  }

  // Close modal when clicking outside
  if (infoModal) {
    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) {
        hideInfoModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && infoModal && infoModal.style.display === 'flex') {
      hideInfoModal();
    }
  });

  // Setup info buttons when DOM is ready
  function initializeInfoSystem() {
    // Wait a bit to ensure SVG is fully loaded
    setTimeout(() => {
      setupInfoButtons();
      console.log('Info system initialized, found buttons:', document.querySelectorAll('.info-button').length);
    }, 100);
  }

  // Try multiple initialization strategies
  function tryInitialize() {
    const buttons = document.querySelectorAll('.info-button');
    if (buttons.length > 0) {
      console.log('Found info buttons, initializing...');
      initializeInfoSystem();
      return true;
    }
    return false;
  }

  // Try immediately
  if (!tryInitialize()) {
    // Try on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
      if (!tryInitialize()) {
        // Try on load event
        window.addEventListener('load', () => {
          if (!tryInitialize()) {
            // Final attempt with longer delay
            setTimeout(tryInitialize, 500);
          }
        });
      }
    });
  }
})();


