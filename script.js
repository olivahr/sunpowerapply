// ====== Variables principales ======
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const progress = document.getElementById('progress');
let currentStep = 0;

// ====== Función para actualizar barra de progreso y scores ======
function updateProgress() {
  const percent = ((currentStep + 1) / steps.length) * 100;
  progress.style.width = percent + '%';

  // Resetear todos los scores antes
  for (let i = 0; i < steps.length; i++) {
    const scoreElem = document.getElementById('score' + (i + 1));
    if (scoreElem) scoreElem.style.width = '0%';
  }

  // Activar score del paso actual
  const currentScore = document.getElementById('score' + (currentStep + 1));
  if (currentScore) currentScore.style.width = '100%';
}

// ====== Función para validar los inputs de cada paso ======
function validateStep(stepIndex) {
  const step = steps[stepIndex];
  const inputs = step.querySelectorAll('input, select, textarea');
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].checkValidity()) {
      inputs[i].reportValidity();
      return false;
    }
  }
  return true;
}

// ====== Botones "Siguiente" ======
nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      steps[currentStep].classList.remove('active');
      currentStep++;

      // Si es el último paso, mostrar confeti
      if (currentStep >= steps.length) {
        showFinalMessage();
        return;
      }

      steps[currentStep].classList.add('active');
      updateProgress();

      // Scroll al inicio del formulario para cada paso
      steps[currentStep].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ====== Botones "Anterior" ======
prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentStep <= 0) return;
    steps[currentStep].classList.remove('active');
    currentStep--;
    steps[currentStep].classList.add('active');
    updateProgress();

    steps[currentStep].scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ====== Cambio de idioma ES/EN ======
const langSelect = document.getElementById('langSelect');
if (langSelect) {
  langSelect.addEventListener('change', () => {
    const lang = langSelect.value;
    document.querySelectorAll('[data-es]').forEach(el => {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = el.getAttribute(`data-${lang}`);
      } else {
        el.textContent = el.getAttribute(`data-${lang}`);
      }
    });
  });
}

// ====== Función para mostrar mensaje final con confeti ======
function showFinalMessage() {
  const confettiMsg = document.getElementById('confettiMsg');
  if (confettiMsg) {
    confettiMsg.style.display = 'block';
    confettiMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Ocultar después de unos segundos
    setTimeout(() => { confettiMsg.style.display = 'none'; }, 6000);
  }
}

// ====== Manejo del submit del formulario ======
const appForm = document.getElementById('app');
if (appForm) {
  appForm.addEventListener('submit', function (e) {
    e.preventDefault();
    showFinalMessage();
    alert('✅ Solicitud enviada correctamente. Gracias por completar el formulario.');
  });
}

// ====== Inicialización ======
updateProgress();
