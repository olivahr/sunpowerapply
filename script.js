// ================= SCRIPT.JS =================

const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const progress = document.getElementById('progress');
let currentStep = 0;

// Función para actualizar barra de progreso y score por step
function updateProgress(){
  const percent = ((currentStep+1)/steps.length)*100;
  progress.style.width = percent+'%';
  steps.forEach((step, index) => {
    const scoreBar = step.querySelector('.score-fill');
    if(scoreBar){
      scoreBar.style.width = (index <= currentStep ? '100%' : '0%');
    }
  });
}

// Avanzar al siguiente step
nextBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    if(validateStep(currentStep)){
      steps[currentStep].classList.remove('active');
      currentStep++;
      if(currentStep >= steps.length){
        currentStep = steps.length -1;
      }
      steps[currentStep].classList.add('active');
      updateProgress();
      scrollToStep();
    }
  });
});

// Retroceder al step anterior
prevBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    steps[currentStep].classList.remove('active');
    currentStep--;
    if(currentStep < 0) currentStep = 0;
    steps[currentStep].classList.add('active');
    updateProgress();
    scrollToStep();
  });
});

// Validar inputs del step actual
function validateStep(stepIndex){
  const step = steps[stepIndex];
  const inputs = step.querySelectorAll('input, select, textarea');
  for(let i=0;i<inputs.length;i++){
    if(!inputs[i].checkValidity()){
      inputs[i].reportValidity();
      return false;
    }
  }
  return true;
}

// Cambio de idioma ES/EN
const langSelect = document.getElementById('langSelect');
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

// Confeti y mensaje al enviar formulario (final de cada parte)
document.getElementById('app').addEventListener('submit', function(e){
  e.preventDefault();
  // Mostrar confeti y mensaje
  const confettiMsg = document.querySelector('.confetti-msg');
  if(confettiMsg){
    confettiMsg.style.display = 'block';
  }

  // Deshabilitar inputs y botones para evitar más cambios
  this.querySelectorAll('input, select, textarea, button').forEach(el=>{
    el.disabled = true;
  });

  // Opcional: auto-ocultar confeti después de unos segundos
  setTimeout(()=>{
    if(confettiMsg){
      confettiMsg.style.display = 'none';
    }
  }, 6000);

  alert('✅ ¡Solicitud enviada correctamente! Espere las instrucciones siguientes.');
});

// Función para scroll al contenedor activo (evita scroll infinito)
function scrollToStep(){
  const container = document.querySelector('.container');
  const step = steps[currentStep];
  if(container && step){
    const top = step.offsetTop - container.offsetTop;
    container.scrollTo({top: top, behavior: 'smooth'});
  }
}

// Inicialización
updateProgress();
scrollToStep();
