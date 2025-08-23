(function() {
  const html = document.documentElement;
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');
  const stepEls = Array.from(form.querySelectorAll('.step'));
  const wizardStepLabel = document.getElementById('wizardStepLabel');
  const typeSel = document.getElementById('type');
  const sizeField = document.getElementById('projectSizeField');
  const sensorsInput = document.getElementById('sensorsCount');
  const zonesInput = document.getElementById('zonesCount');
  const flowInput = document.getElementById('flow');
  const ventInput = document.getElementById('vent');
  const gatewayInput = document.getElementById('gateway');
  const offerTotalEl = document.getElementById('offerTotal');
  const offerBreakdownEl = document.getElementById('offerBreakdown');

  function updateFormByType() {
    const isBusiness = typeSel.value === 'business';
    sizeField.classList.toggle('hidden', !isBusiness);
  }
  typeSel.addEventListener('change', updateFormByType);
  updateFormByType();

  let currentStep = 1;
  function setStep(step) {
    currentStep = step;
    stepEls.forEach(el => el.classList.toggle('hidden', Number(el.dataset.step) !== currentStep));
    const totalSteps = stepEls.length;
                         const labels = {
           de: ['Anfrage', 'Komponenten', 'Kontakt & Angebot'],
           en: ['Request', 'Components', 'Contact & Offer']
         };
    const langKey = (html.lang === 'en') ? 'en' : 'de';
    const stepLabelText = document.getElementById('stepLabelText');
    stepLabelText.textContent = `${labels[langKey][currentStep - 1]} (${currentStep}/${totalSteps})`;
  }

  function resetWizard() {
    form.reset();
    updateFormByType();
    setStep(1);
    offerTotalEl.textContent = '–';
    offerBreakdownEl.textContent = '';
    status.textContent = '';
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat(html.lang === 'en' ? 'en-US' : 'de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
  }

  function computeOffer() {
    const isBusiness = typeSel.value === 'business';
    const sensors = Math.max(0, parseInt(sensorsInput.value || '0', 10));
    const zones = Math.max(1, parseInt(zonesInput.value || '1', 10));
    const hasFlow = !!flowInput.checked;
    const hasVent = !!ventInput.checked;
    const hasGateway = !!gatewayInput.checked;

    const base = isBusiness ? 290 : 190;
    const perSensor = isBusiness ? 120 : 99;
    const perZone = 80;
    const flow = hasFlow ? 149 : 0;
    const vent = hasVent ? 99 : 0;
    const gateway = hasGateway ? 199 : 0;

    const subtotal = base + sensors * perSensor + zones * perZone + flow + vent + gateway;
    const discount = (isBusiness && sensors >= 10) ? subtotal * 0.08 : 0;
    const total = Math.max(0, Math.round((subtotal - discount) * 100) / 100);

    const breakdownLines = [
      `${html.lang === 'en' ? 'Base setup' : 'Basis-Setup'}: ${formatCurrency(base)}`,
      `${html.lang === 'en' ? 'Sensors' : 'Sensoren'} (${sensors} × ${formatCurrency(perSensor)}): ${formatCurrency(sensors * perSensor)}`,
      `${html.lang === 'en' ? 'Zones' : 'Zonen'} (${zones} × ${formatCurrency(perZone)}): ${formatCurrency(zones * perZone)}`,
      hasFlow ? `${html.lang === 'en' ? 'Flow sensor' : 'Durchflusssensor'}: ${formatCurrency(flow)}` : '',
      hasVent ? `${html.lang === 'en' ? 'Vent package' : 'Entlüftungspaket'}: ${formatCurrency(vent)}` : '',
      hasGateway ? `${html.lang === 'en' ? 'Gateway' : 'Gateway'}: ${formatCurrency(gateway)}` : '',
      discount ? `${html.lang === 'en' ? 'Business discount' : 'Gewerbe-Rabatt'}: -${formatCurrency(discount)}` : ''
    ].filter(Boolean).join('\n');

    offerTotalEl.textContent = formatCurrency(total);
    offerBreakdownEl.textContent = breakdownLines;
    return { total, breakdownLines };
  }

  function attachRecalc() {
    [typeSel, sensorsInput, zonesInput, flowInput, ventInput, gatewayInput].forEach(el => {
      el && el.addEventListener('input', () => {
        updateFormByType();
        computeOffer();
      });
      el && el.addEventListener('change', () => {
        updateFormByType();
        computeOffer();
      });
    });
  }
  attachRecalc();

  const next1 = document.getElementById('nextStep1');
  const next2 = document.getElementById('nextStep2');
  const back2 = document.getElementById('backStep2');
  const back3 = document.getElementById('backStep3');
  const resetBtn = document.getElementById('resetWizard');

  next1.addEventListener('click', () => { setStep(2); });
  back2.addEventListener('click', () => { setStep(1); });
  next2.addEventListener('click', () => { computeOffer(); setStep(3); });
  back3.addEventListener('click', () => { setStep(2); });
  resetBtn.addEventListener('click', resetWizard);

  setStep(1);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    const honey = (document.getElementById('website') || {}).value || '';
    if (honey.trim() !== '') return;

    const visibleRequired = Array.from(form.querySelectorAll('[required]')).filter(el => el.closest('.step')?.classList.contains('hidden') === false || !el.closest('.step'));
    const allValid = visibleRequired.every(el => el.checkValidity());
    if (!allValid) {
      status.style.color = '#b00020';
      status.textContent = html.lang === 'en' ? 'Please complete all required fields and consent.' : 'Bitte fülle alle Pflichtfelder aus und stimme zu.';
      form.reportValidity();
      return;
    }

    const offer = computeOffer();
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.offerTotal = offer.total;
    payload.offerBreakdown = offer.breakdownLines;
    payload.lang = html.lang;

    try {
      await new Promise(r => setTimeout(r, 600));
      console.log('Contact payload (dummy send):', payload);
      status.style.color = 'var(--brand-green-600)';
      status.textContent = html.lang === 'en' ? 'Thank you! Your request and offer were sent.' : 'Danke! Deine Anfrage inkl. Angebot wurde gesendet.';
      resetWizard();
    } catch (err) {
      status.style.color = '#b00020';
      status.textContent = html.lang === 'en' ? 'Something went wrong. Please try again.' : 'Etwas ist schiefgelaufen. Bitte versuche es erneut.';
    }
  });
})();


