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
    
    // Update progress indicator
    updateProgressIndicator(step);
    
    const labels = {
           de: ['Anfrage', 'Komponenten', 'Kontakt & Angebot'],
           en: ['Request', 'Components', 'Contact & Offer']
         };
    const langKey = (html.lang === 'en') ? 'en' : 'de';
    const stepLabelText = document.getElementById('stepLabelText');
    stepLabelText.textContent = labels[langKey][currentStep - 1];
  }

  function updateProgressIndicator(step) {
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressFill = document.getElementById('progressFill');
    
    // Update step classes
    progressSteps.forEach((stepEl, index) => {
      const stepNumber = index + 1;
      stepEl.classList.remove('active', 'completed');
      
      if (stepNumber === step) {
        stepEl.classList.add('active');
      } else if (stepNumber < step) {
        stepEl.classList.add('completed');
      }
    });
    
    // Update progress fill
    const progressPercentage = ((step - 1) / (progressSteps.length - 1)) * 100;
    progressFill.style.width = `${progressPercentage}%`;
  }

  function resetWizard() {
    form.reset();
    updateFormByType();
    setStep(1);
    updateProgressIndicator(1);
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

  // Add click functionality to progress steps
  document.querySelectorAll('.progress-step').forEach(stepEl => {
    stepEl.addEventListener('click', () => {
      const stepNumber = parseInt(stepEl.dataset.step);
      if (stepNumber && stepNumber !== currentStep) {
        // Only allow navigation to completed steps or next step
        if (stepNumber <= currentStep + 1) {
          setStep(stepNumber);
        }
      }
    });
  });

  const next1 = document.getElementById('nextStep1');
  const next2 = document.getElementById('nextStep2');
  const back2 = document.getElementById('backStep2');
  const back3 = document.getElementById('backStep3');

  next1.addEventListener('click', () => { setStep(2); });
  back2.addEventListener('click', () => { setStep(1); });
  next2.addEventListener('click', () => { computeOffer(); setStep(3); });
  back3.addEventListener('click', () => { setStep(2); });

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
  
  // Plus/Minus button functionality
  document.querySelectorAll('.number-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;
      
      const currentValue = parseInt(input.value) || 0;
      const min = parseInt(input.min) || 0;
      
      if (btn.classList.contains('plus')) {
        input.value = currentValue + 1;
      } else if (btn.classList.contains('minus')) {
        input.value = Math.max(min, currentValue - 1);
      }
      
      // Update button states
      updateButtonStates(targetId);
      
      // Trigger change event for form validation and offer calculation
      input.dispatchEvent(new Event('change'));
    });
  });
  
  function updateButtonStates(targetId) {
    const input = document.getElementById(targetId);
    if (!input) return;
    
    const value = parseInt(input.value) || 0;
    const min = parseInt(input.min) || 0;
    
    const minusBtn = document.querySelector(`[data-target="${targetId}"].minus`);
    const plusBtn = document.querySelector(`[data-target="${targetId}"].plus`);
    
    if (minusBtn) minusBtn.disabled = value <= min;
    if (plusBtn) plusBtn.disabled = value >= 99; // Max limit
  }
  
  // Initialize button states
  ['sensorsCount', 'zonesCount'].forEach(id => updateButtonStates(id));
  
  // Initialize progress indicator
  updateProgressIndicator(1);
})();


