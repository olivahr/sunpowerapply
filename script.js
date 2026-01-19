// ======== Variables principales ========
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const progress = document.getElementById('progress');
let currentStep = 0;

// ======== Inicialización ========
steps.forEach((step, index) => {
  if(index === 0) step.classList.add('active');
  else step.classList.remove('active');
});
updateProgress();

// ======== Función para actualizar barra de progreso ========
function updateProgress(){
  const percent = ((currentStep+1)/steps.length)*100;
  progress.style.width = percent+'%';

  steps.forEach((step, index) => {
    const scoreFill = step.querySelector('.score-fill');
    if(scoreFill){
      scoreFill.style.width = (index <= currentStep ? '100%' : '0%');
    }
  });
}

// ======== Botones Siguiente ========
nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if(validateStep(currentStep)){
      steps[currentStep].classList.remove('active');
      currentStep++;
      if(currentStep >= steps.length) currentStep = steps.length - 1;
      steps[currentStep].classList.add('active');
      updateProgress();
    }
  });
});

// ======== Botones Anterior ========
prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    steps[currentStep].classList.remove('active');
    currentStep--;
    if(currentStep < 0) currentStep = 0;
    steps[currentStep].classList.add('active');
    updateProgress();
  });
});

// ======== Validación por Step ========
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

// ======== Cambio de idioma ========
const langSelect = document.getElementById('langSelect');
if(langSelect){
  langSelect.addEventListener('change', ()=>{
    const lang = langSelect.value;
    document.querySelectorAll('[data-es]').forEach(el=>{
      if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'){ 
        el.placeholder = el.getAttribute(`data-${lang}`);
      } else {
        el.textContent = el.getAttribute(`data-${lang}`);
      }
    });
  });
}

// ======== Mensaje final y confeti ========
document.getElementById('app').addEventListener('submit', function(e){
  e.preventDefault();
  const confettiMsg = document.getElementById('confettiMsg');
  if(confettiMsg){
    confettiMsg.style.display = 'block';
    setTimeout(()=>{confettiMsg.style.display='none';},6000);
  }
  alert('✅ Solicitud enviada correctamente. Gracias por completar el formulario.');
});

// ======== Ajustes de scroll ========
steps.forEach(step => {
  step.style.maxHeight = '80vh';
  step.style.overflowY = 'auto';
});

// ======== ES/EN centrado de lang ========
const langContainer = document.getElementById('langContainer');
if(langContainer){
  langContainer.style.display = 'flex';
  langContainer.style.justifyContent = 'center';
  langContainer.style.alignItems = 'center';
  langContainer.style.margin = '0 auto';
}
