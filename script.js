const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const progress = document.getElementById('progress');
let currentStep = 0;

// Inicializar steps
steps.forEach((step, index)=>{
  if(index===0) step.classList.add('active');
  else step.classList.remove('active');
});
updateProgress();

// ======== Funciones ========
function updateProgress(){
  const percent = ((currentStep+1)/steps.length)*100;
  progress.style.width = percent+'%';
  
  steps.forEach((step, index)=>{
    const scoreFill = step.querySelector('.score-fill');
    if(scoreFill){
      const stepPercent = index === currentStep ? 100 : (index < currentStep ? 100 : 0);
      scoreFill.style.width = stepPercent+'%';
    }
  });
}

// Siguiente
nextBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    if(validateStep(currentStep)){
      steps[currentStep].classList.remove('active');
      currentStep++;
      if(currentStep >= steps.length){
        currentStep = steps.length - 1;
        // Mostrar confeti cuando llegas al último step
        const confettiMsg = document.getElementById('confettiMsg');
        if(confettiMsg) confettiMsg.style.display = 'block';
      }
      steps[currentStep].classList.add('active');
      updateProgress();
    }
  });
});

// Anterior
prevBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    steps[currentStep].classList.remove('active');
    currentStep--;
    if(currentStep < 0) currentStep = 0;
    steps[currentStep].classList.add('active');
    updateProgress();
  });
});

// Validación
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

// Cambio de idioma
const langSelect = document.getElementById('langSelect');
if(langSelect){
  langSelect.addEventListener('change', ()=>{
    const lang = langSelect.value;
    document.querySelectorAll('[data-es]').forEach(el=>{
      if(el.tagName==='INPUT' || el.tagName==='TEXTAREA') el.placeholder = el.getAttribute(`data-${lang}`);
      else el.textContent = el.getAttribute(`data-${lang}`);
    });
  });
}

// Ajustes de scroll
steps.forEach(step=>{
  step.style.overflowY = 'auto';
  step.style.maxHeight = '80vh';
});

// ES/EN centrado
const langContainer = document.querySelector('.lang-container');
if(langContainer){
  langContainer.style.display = 'flex';
  langContainer.style.justifyContent = 'center';
  langContainer.style.alignItems = 'center';
  langContainer.style.margin = '20px 0';
}
