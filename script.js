// ================= Variables Globales =================
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const progress = document.getElementById('progress');
let currentStep = 0;

// ================= Función para actualizar barra de progreso y score =================
function updateProgress() {
  const percent = ((currentStep + 1) / steps.length) * 100;
  progress.style.width = percent + '%';
  
  const scoreBar = document.getElementById('score' + (currentStep + 1));
  if(scoreBar){
    scoreBar.style.width = '100%';
  }
}

// ================= Validar cada paso =================
function validateStep(stepIndex){
  const step = steps[stepIndex];
  const inputs = step.querySelectorAll('input, select, textarea');
  
  for(let i = 0; i < inputs.length; i++){
    if(!inputs[i].checkValidity()){
      inputs[i].reportValidity();
      return false;
    }
  }
  return true;
}

// ================= Botón "Siguiente" =================
nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if(!validateStep(currentStep)) return;

    steps[currentStep].classList.remove('active');
    currentStep++;

    if(currentStep >= steps.length) {
      currentStep = steps.length - 1;
    }

    steps[currentStep].classList.add('active');
    updateProgress();

    // Si es el último paso del index.html (solo del paso 5)
    if(window.location.pathname.includes('index.html') && currentStep === steps.length - 1){
      showFinalMessageIndex();
    }
  });
});

// ================= Botón "Anterior" =================
prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    steps[currentStep].classList.remove('active');
    currentStep--;
    if(currentStep < 0) currentStep = 0;
    steps[currentStep].classList.add('active');
    updateProgress();
  });
});

// ================= Mensaje Final y Confeti del index.html =================
function showFinalMessageIndex(){
  const confettiMsg = document.getElementById('confettiMsg');
  if(confettiMsg){
    confettiMsg.textContent = "✅ ¡Completaste la primera parte de tu solicitud! Pulsa continuar para la siguiente sección 🎉";
    confettiMsg.style.display = 'block';
  }
}

// ================= Cambio de idioma =================
const langSelect = document.getElementById('langSelect');
if(langSelect){
  langSelect.addEventListener('change', ()=>{
    const lang = langSelect.value;
    document.querySelectorAll('[data-es]').forEach(el=>{
      if(el.tagName==='INPUT' || el.tagName==='TEXTAREA'){ 
        el.placeholder = el.getAttribute(`data-${lang}`);
      } else {
        el.textContent = el.getAttribute(`data-${lang}`);
      }
    });
  });
}

// ================= Submit final del continuar.html =================
const form = document.getElementById('app');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();

    // Solo al final de todo (continuar.html, paso 10)
    const confettiMsg = document.getElementById('confettiMsg');
    if(confettiMsg){
      confettiMsg.textContent = "✅ ¡Solicitud completa enviada! Espere los próximos pasos y confirmación por correo electrónico 🎉";
      confettiMsg.style.display = 'block';
    }

    // Mostrar alert final opcional
    alert('✅ Solicitud enviada correctamente. Gracias por completar todo el formulario.');

    // Aquí se podría enviar por AJAX o API si se quiere
  });
}

// ================= Inicialización =================
updateProgress();
steps.forEach((s,i)=>{
  if(i !== currentStep) s.classList.remove('active');
  else s.classList.add('active');
});
