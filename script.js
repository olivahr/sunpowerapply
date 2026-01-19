// ================== VARIABLES ==================
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const progress = document.getElementById('progress');
let currentStep = 0;

// ================== FUNCIONES ==================
function updateProgress() {
  const percent = ((currentStep + 1) / steps.length) * 100;
  progress.style.width = percent + '%';
  const score = document.getElementById('score' + (currentStep + 1));
  if (score) score.style.width = '100%';
}

// ================== VALIDACIÓN ==================
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

// ================== NAVEGACIÓN BOTONES ==================
nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      // Si es index.html y estamos en el último paso (5)
      if (window.location.pathname.includes('index.html') && currentStep === steps.length - 1) {
        // Mostrar confeti y botón continuar
        const confettiMsg = document.getElementById('confettiMsg');
        confettiMsg.style.display = 'block';
        return;
      }

      steps[currentStep].classList.remove('active');
      currentStep++;
      steps[currentStep].classList.add('active');
      updateProgress();
    }
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    steps[currentStep].classList.remove('active');
    currentStep--;
    steps[currentStep].classList.add('active');
    updateProgress();
  });
});

// ================== CAMBIO DE IDIOMA ==================
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

// ================== ENVÍO DE FORMULARIO ==================
const form = document.getElementById('app');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Mostrar confeti solo al finalizar todo
    const confettiMsg = document.getElementById('confettiMsg');
    if (confettiMsg) {
      confettiMsg.style.display = 'block';
    }

    // Mensaje de alerta
    alert('✅ Solicitud enviada correctamente. Espere los próximos pasos por correo.');

    // Opcional: limpiar formulario si quieres
    // form.reset();
  });
}

// ================== INICIALIZAR ==================
if (steps.length > 0) {
  steps[0].classList.add('active');
  updateProgress();
}
