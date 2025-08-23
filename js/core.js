(function() {
  const html = document.documentElement;

  const translations = {
    de: {
      'event.title': 'Messe-Clip',
      'event.lead': 'Einblicke von der GPBW24 – kompakt und eindrucksvoll.',
      'brand.title': 'Unser Zeichen',
      'brand.lead': 'Innovation und Natur vereint – das Hide & Grow Logo.',
      'stories.title': 'Einblicke',
      'stories.lead': 'Bilder und kurze Geschichten – was uns antreibt.',
      'stories.s1.title': 'Marke & Mission',
      'stories.s1.copy': 'Unser Logo steht für smarte Bewässerung und grüne Zukunft.',
      'stories.s2.title': 'Kontakt auf Augenhöhe',
      'stories.s2.copy': 'Ob privat oder gewerblich – wir beraten transparent und lösungsorientiert.',
      'stories.cta.offer': 'Angebot anfordern',
      'a11y.skip': 'Zum Inhalt springen',
      'lang.de': 'Deutsch',
      'lang.en': 'English',

      'nav.audiences': 'Zielgruppen',
      'nav.products': 'Produkte',
      'nav.references': 'Referenzen',
      'nav.contact': 'Kontakt',

      'hero.eyebrow': 'Intelligente Gartenbewässerung',
      'hero.headline': 'Das intelligente Bewässerungssystem. Selbstversorgend. Sicher. Ganzjährig.',
      'hero.sub': 'In unserem 90-Sekunden-Clip zeigen wir, wie sich das System automatisch an die Bedürfnisse Ihrer Pflanzen anpasst – effizient und ressourcenschonend.',
      'hero.pro': 'Für Profis',
      'hero.enthusiasts': 'For Garden Enthusiasts',
      'hero.source': 'Source',
      'hero.cta.offer': 'Request Offer',
      'hero.cta.offer.text': 'Request Offer',

      'audiences.title': 'Für Profis und Gartenliebhaber',
      'audiences.lead': 'Zweigleisige Vorteile – maßgeschneiderte Lösungen für Landschaftsprofis und Privatgärten.',
      'audiences.b2b.badge': 'B2B • Profi-Landschaftsgärtner',
      'audiences.b2b.title': 'Automatisierte ganzjährige Bewässerung',
      'audiences.b2b.copy': 'Ressourcenschonend, werterhaltend und sicher. Sensor-Technologie (Bodenfeuchte & -temperatur via Bluetooth), Flow- & Entlüftungspakete, Access Point/Gateway.',
      'audiences.b2b.c1': 'Sensoren',
      'audiences.b2b.c2': 'Flow',
      'audiences.b2b.c3': 'Gateway',
      'audiences.cta.learn': 'Mehr erfahren',
      'audiences.cta.discover': 'Jetzt entdecken',
      'audiences.cta.offer': 'Angebot anfordern',

      'audiences.b2c.badge': 'B2C • Gartenfreund',
      'audiences.b2c.title': 'Einfach, nachhaltig, zeitsparend',
      'audiences.b2c.copy': 'Individuell pro Pflanze, effizient in Hitzeperioden und im Klimawandel. Installieren, verbinden, zurücklehnen.',
      'audiences.b2c.c1': 'Nachhaltig',
      'audiences.b2c.c2': 'Einfach',
      'audiences.b2c.c3': 'Zeit sparen',
      'audiences.cta.discover': 'Jetzt entdecken',

      'products.title': 'Produkte',
      'products.tabs.all': 'Alle',
      'products.tabs.sensors': 'Sensoren',
      'products.tabs.control': 'Steuerung & Zubehör',
      'products.tabs.security': 'Empfang & Sicherheit',
      'products.badge': 'Produkt',
      'products.details': 'Details',
      'products.cta.offer': 'Angebot',
      'products.control.title': 'Control Unit',
      'products.control.meta': 'Zentrale Steuerung – sicher, effizient, vernetzbar.',
      'products.sensor10.title': 'Bodensensor (0–10 cm)',
      'products.sensor10.meta': 'Präzise Messung nahe der Oberfläche, ideal für Rasen und Beete.',
      'products.sensor20.title': 'Bodensensor (0–20 cm)',
      'products.sensor20.meta': 'Erweiterter Messbereich, robust für vielfältige Anwendungen.',
      'products.sensor150.title': 'Bodensensor (verlängerbar bis 150 cm)',
      'products.sensor150.meta': 'Tiefenmessung für Bäume und Sträucher – individuell anpassbar.',
      'products.vent.title': 'Entlüftungspaket',
      'products.vent.meta': 'Zuverlässige Entlüftung für gleichmäßige Bewässerung.',
      'products.flow.title': 'Durchflusssensor',
      'products.flow.meta': 'Überwacht den Wasserfluss – effizient und sicher.',
      'products.ap.title': 'Access Point',
      'products.ap.meta': 'Sichere Verbindung für Sensoren und Steuerung.',
      'products.gateway.title': 'Gateway',
      'products.gateway.meta': 'Sichere Datenweitergabe – zuverlässig und skalierbar.',

      'refs.title': 'Referenzen & Vision',
      'refs.award.badge': 'Auszeichnung',
      'refs.award.title': '2. Platz Gründerpreis Bayern',
      'refs.award.copy': 'Ausgezeichnet für Innovation und Nachhaltigkeit – das Publikum überzeugt von unserer Vision einer grüneren Zukunft.',
      'refs.film.badge': 'Imagefilm',
      'refs.film.title': 'Einblicke in das System',
      'refs.film.copy': 'Im Imagefilm zeigen wir die leichte Installation und die präzise Steuerung unseres intelligenten Bewässerungssystems.',
      'refs.vision.badge': 'Vision',
      'refs.vision.title': 'Für eine grünere Zukunft',
      'refs.vision.copy': 'Klimawandel, zunehmende Hitze – wir pflanzen Bäume und bewässern intelligent für kommende Generationen.',
      'refs.galabau': 'Erfolgsmeldung GaLaBau 2024: Großes Interesse, Live-Demo am Stand.',
      'refs.partners.title': 'Our Partners',
      'refs.cta.offer': 'Request Offer',
      'refs.video.title': 'Unsere Vision im Video',
      'refs.video.copy': 'Sehen Sie, wie unser intelligentes Bewässerungssystem funktioniert und welche Vision wir für eine nachhaltige Zukunft haben.',

      'benefits.title': 'Vorteile der Gartenbewässerungsanlage',
      'benefits.lead': 'Entdecken Sie die Vorteile unseres intelligenten Systems.',
      'benefits.water.title': 'Wassersparen',
      'benefits.water.copy': 'Bis zu 70% weniger Wasserverbrauch durch präzise Bedarfsmessung.',
      'benefits.growth.title': 'Optimales Pflanzenwachstum',
      'benefits.growth.copy': 'Individuelle Bewässerung je nach Pflanzentyp und Bodenbeschaffenheit.',
      'benefits.time.title': 'Zeitersparnis',
      'benefits.time.copy': 'Vollautomatische Bewässerung rund um die Uhr, auch im Urlaub.',
      'benefits.eco.title': 'Umweltschutz',
      'benefits.eco.copy': 'Nachhaltige Ressourcennutzung für eine grünere Zukunft.',
      'benefits.cta.offer': 'Request Offer',

      'irrig.title': 'Interaktiver Bewässerungsplan',
      'irrig.lead': 'Live-Animation des Wasserflusses – steuerbare Zonen, Tempo und Blueprint-Overlay.',
      'irrig.pause': 'Pause',
      'irrig.play': 'Abspielen',
      'irrig.speed': 'Geschwindigkeit',
      'irrig.zoneA': 'Zone A (Beds)',
      'irrig.zoneB': 'Zone B (Lawn)',
      'irrig.zoneC': 'Zone C (Compact Beds)',
      'irrig.zoneD': 'Zone D (Compact Lawn)',
      'irrig.overlay': 'Blueprint overlay',

      'quote.text': 'Innovation und Natur vereint',
      'quote.author': '— Hide & Grow',

      'vision.title': 'Vision',
      'vision.lead': 'Unsere Vision – der Clip dazu.',

      'contact.title': 'Kontakt',
      'contact.lead': 'Schicke uns deine Anfrage. Wir melden uns schnellstmöglich zurück.',
      'contact.name': 'Name',
      'contact.namePlaceholder': 'Max Mustermann',
      'contact.email': 'E-Mail',
      'contact.emailPlaceholder': 'max@example.com',
      'contact.type': 'Anfrage-Typ',
      'contact.typePrivate': 'Privat',
      'contact.typeBusiness': 'Gewerblich',
      'contact.projectSize': 'Projektgröße',
      'contact.sizeSmall': 'Klein (bis 100 m²)',
      'contact.sizeMedium': 'Mittel (100–500 m²)',
      'contact.sizeLarge': 'Groß (500+ m²)',
      'contact.message': 'Nachricht',
      'contact.messagePlaceholder': 'Wie können wir helfen?',
      'contact.consent': 'Ich stimme der Datenschutzerklärung zu.',
      'contact.submit': 'Senden',
      'contact.next': 'Weiter',
      'contact.back': 'Zurück',
      'contact.q.sensors': 'Anzahl Sensoren',
      'contact.q.zones': 'Anzahl Zonen',
      'contact.q.components': 'Zusätzliche Komponenten',
      'contact.q.flow': 'Durchflusssensor',
      'contact.q.vent': 'Entlüftungspaket',
      'contact.q.gateway': 'Gateway',
      'contact.offer': 'Dein Angebot',
      'contact.offer.total': 'Geschätzter Gesamtpreis',
      'contact.offer.note': 'Unverbindliche Schätzung auf Basis deiner Angaben.',
      'contact.reset': 'Von vorne beginnen',
      'contact.aside.title': 'So erreichst du uns',
      'contact.aside.copy': 'Für Projektanfragen, Partnerschaften und Support – wir sind gerne für dich da.',
      'contact.aside.c1': 'DSGVO-konform',
      'contact.aside.c2': 'Antwort in 1–2 Werktagen',

      'footer.imprint': 'Impressum',
      'footer.privacy': 'Datenschutz',
      'footer.legal': 'Rechtliches'
    },
    en: {
      'event.title': 'Trade Fair Clip',
      'event.lead': 'Highlights from GPBW24 – short and impactful.',
      'brand.title': 'Our Mark',
      'brand.lead': 'Innovation meets nature – the Hide & Grow logo.',
      'stories.title': 'Insights',
      'stories.lead': 'Pictures and short stories – what drives us.',
      'stories.s1.title': 'Brand & Mission',
      'stories.s1.copy': 'Our logo stands for smart irrigation and a green future.',
      'stories.s2.title': 'Contact that listens',
      'stories.s2.copy': 'Private or business – we advise with clarity and solutions.',
      'stories.cta.offer': 'Angebot anfordern',
      'a11y.skip': 'Skip to content',
      'lang.de': 'Deutsch',
      'lang.en': 'English',

      'nav.audiences': 'Audiences',
      'nav.products': 'Products',
      'nav.references': 'References',
      'nav.contact': 'Contact',

      'hero.eyebrow': 'Intelligent Garden Irrigation',
      'hero.headline': 'The Intelligent Irrigation System. Self-sufficient. Secure. Year-round.',
      'hero.sub': 'In our 90-second clip we show how the system automatically adapts to changing plant needs – efficient and resource-saving.',
      'hero.pro': 'For Professionals',
      'hero.enthusiasts': 'For Garden Enthusiasts',
      'hero.source': 'Source',

      'audiences.title': 'For Professionals and Garden Enthusiasts',
      'audiences.lead': 'Two tracks – tailored solutions for landscaping pros and private gardens.',
      'audiences.b2b.badge': 'B2B • Landscaping Professionals',
      'audiences.b2b.title': 'Automated, year-round irrigation',
      'audiences.b2b.copy': 'Resource-saving, value-preserving and secure. Sensor tech (soil moisture & temperature via Bluetooth), flow and vent packages, access point/gateway.',
      'audiences.b2b.c1': 'Sensors',
      'audiences.b2b.c2': 'Flow',
      'audiences.b2b.c3': 'Gateway',
      'audiences.cta.learn': 'Learn More',
      'audiences.cta.discover': 'Discover Now',
      'audiences.cta.offer': 'Request Offer',

      'audiences.b2c.badge': 'B2C • Garden Lover',
      'audiences.b2c.title': 'Simple, sustainable, time-saving',
      'audiences.b2c.copy': 'Per-plant customization, efficient in heat waves and climate change. Install, connect, relax.',
      'audiences.b2c.c1': 'Sustainable',
      'audiences.b2c.c2': 'Simple',
      'audiences.b2c.c3': 'Save time',
      'audiences.cta.discover': 'Discover Now',

      'products.title': 'Products',
      'products.tabs.all': 'All',
      'products.tabs.sensors': 'Sensors',
      'products.tabs.control': 'Control & Accessories',
      'products.tabs.security': 'Reception & Security',
      'products.badge': 'Product',
      'products.details': 'Details',
      'products.cta.offer': 'Angebot',
      'products.control.title': 'Control Unit',
      'products.control.meta': 'Central controller – secure, efficient, connectable.',
      'products.sensor10.title': 'Soil Sensor (0–10 cm)',
      'products.sensor10.meta': 'Precise near-surface measurements – great for lawns and beds.',
      'products.sensor20.title': 'Soil Sensor (0–20 cm)',
      'products.sensor20.meta': 'Extended range, robust for various use cases.',
      'products.sensor150.title': 'Soil Sensor (extendable up to 150 cm)',
      'products.sensor150.meta': 'Deep measurements for trees and shrubs – individually adaptable.',
      'products.vent.title': 'Vent Package',
      'products.vent.meta': 'Reliable venting for consistent irrigation.',
      'products.flow.title': 'Flow Sensor',
      'products.flow.meta': 'Monitors water flow – efficient and safe.',
      'products.ap.title': 'Access Point',
      'products.ap.meta': 'Secure connectivity for sensors and control.',
      'products.gateway.title': 'Gateway',
      'products.gateway.meta': 'Secure data transfer – reliable and scalable.',

      'refs.title': 'References & Vision',
      'refs.award.badge': 'Award',
      'refs.award.title': '2nd Place Founder\'s Prize',
      'refs.award.copy': 'Awarded for innovation and sustainability – audience approved.',
      'refs.film.badge': 'Brand Film',
      'refs.film.title': 'System Insights',
      'refs.film.copy': 'Our film shows easy installation and precise control.',
      'refs.vision.badge': 'Vision',
      'refs.vision.title': 'For a Greener Future',
      'refs.vision.copy': 'Climate change, rising heat – we plant trees and irrigate intelligently.',
      'refs.galabau': 'GaLaBau 2024 highlight: strong interest, live demo at our booth.',
      'refs.partners.title': 'Our Partners',
      'refs.cta.offer': 'Angebot anfordern',
      'refs.video.title': 'Our Vision in Video',
      'refs.video.copy': 'See how our intelligent irrigation system works and what vision we have for a sustainable future.',

      'benefits.title': 'Benefits of the Garden Irrigation System',
      'benefits.lead': 'Discover the advantages of our intelligent system.',
      'benefits.water.title': 'Water Saving',
      'benefits.water.copy': 'Up to 70% less water consumption through precise demand measurement.',
      'benefits.growth.title': 'Optimal Plant Growth',
      'benefits.growth.copy': 'Individual irrigation according to plant type and soil conditions.',
      'benefits.time.title': 'Time Saving',
      'benefits.time.copy': 'Fully automatic irrigation around the clock, even on vacation.',
      'benefits.eco.title': 'Environmental Protection',
      'benefits.eco.copy': 'Sustainable resource use for a greener future.',

      'irrig.title': 'Interactive Irrigation Plan',
      'irrig.lead': 'Live water-flow animation – controllable zones, speed, theme, and overlay.',
      'irrig.pause': 'Pause',
      'irrig.play': 'Play',
      'irrig.speed': 'Speed',
      'irrig.zoneA': 'Zone A (Beds)',
      'irrig.zoneB': 'Zone B (Lawn)',
      'irrig.zoneC': 'Zone C (Compact Beds)',
      'irrig.zoneD': 'Zone D (Compact Lawn)',
      'irrig.overlay': 'Blueprint overlay',

      'quote.text': 'Innovation and Nature United',
      'quote.author': '— Hide & Grow',

      'vision.title': 'Vision',
      'vision.lead': 'Our vision – the clip.',

      'contact.title': 'Contact',
      'contact.lead': 'Send us your request. We\'ll get back to you as soon as possible.',
      'contact.name': 'Name',
      'contact.namePlaceholder': 'Jane Doe',
      'contact.email': 'Email',
      'contact.emailPlaceholder': 'jane@example.com',
      'contact.type': 'Inquiry Type',
      'contact.typePrivate': 'Private',
      'contact.typeBusiness': 'Business',
      'contact.projectSize': 'Project Size',
      'contact.sizeSmall': 'Small (up to 100 m²)',
      'contact.sizeMedium': 'Medium (100–500 m²)',
      'contact.sizeLarge': 'Large (500+ m²)',
      'contact.message': 'Message',
      'contact.messagePlaceholder': 'How can we help?',
      'contact.consent': 'I agree to the privacy policy.',
      'contact.submit': 'Send',
      'contact.next': 'Next',
      'contact.back': 'Back',
      'contact.q.sensors': 'Number of sensors',
      'contact.q.zones': 'Number of zones',
      'contact.q.components': 'Additional components',
      'contact.q.flow': 'Flow sensor',
      'contact.q.vent': 'Vent package',
      'contact.q.gateway': 'Gateway',
      'contact.offer': 'Your offer',
      'contact.offer.total': 'Estimated total',
      'contact.offer.note': 'Non-binding estimate based on your inputs.',
      'contact.reset': 'Start over',
      'contact.aside.title': 'How to reach us',
      'contact.aside.copy': 'For project inquiries, partnerships and support – we\'re here for you.',
      'contact.aside.c1': 'GDPR-compliant',
      'contact.aside.c2': 'Reply within 1–2 business days',

      'footer.imprint': 'Imprint',
      'footer.privacy': 'Privacy',
      'footer.legal': 'Legal'
    }
  };

  function applyTranslations(lang) {
    const dict = translations[lang] || translations.de;
    html.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });
    document.querySelectorAll('option[data-i18n]').forEach(opt => {
      const key = opt.getAttribute('data-i18n');
      if (dict[key]) opt.textContent = dict[key];
    });
  }

  function setActiveLangButton(lang) {
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const params = new URLSearchParams(window.location.search);
  const paramLang = params.get('lang');
  const initialLang = (paramLang === 'de' || paramLang === 'en') ? paramLang : (localStorage.getItem('lang') || 'de');
  applyTranslations(initialLang);
  setActiveLangButton(initialLang);
  if (paramLang === 'de' || paramLang === 'en') localStorage.setItem('lang', paramLang);

  const langSwitch = document.querySelector('.lang-switch');
  if (langSwitch) {
    langSwitch.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-lang]');
      if (!btn) return;
      const lang = btn.dataset.lang;
      localStorage.setItem('lang', lang);
      applyTranslations(lang);
      setActiveLangButton(lang);
      const url = new URL(window.location);
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url);
    });
  }

  window.App = {
    html,
    translations,
    applyTranslations,
    setActiveLangButton
  };
})();


