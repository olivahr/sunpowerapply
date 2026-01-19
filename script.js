// ======== Variables principales ========
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const progress = document.getElementById('progress');
const wrapper = document.querySelector('.form-wrapper');
let currentStep = 0;

// ======== Inicialización ========
function initSteps(){
  steps.forEach((step, index)=>{
    if(index === 0) step.classList.add('active');
    else step.classList.remove('active');
    step.scrollTop = 0; // reinicia scroll de cada step
  });
  updateProgress();
}
initSteps();

// ======== Función para actualizar barra de progreso ========
function updateProgress(){
  const percent = ((currentStep+1)/steps.length)*100;
  progress.style.width = percent+'%';

  steps.forEach((step,index)=>{
    const scoreFill = step.querySelector('.score-fill');
    if(scoreFill){
      scoreFill.style.width = (index <= currentStep ? '100%' : '0%');
    }
  });
}

// ======== Función para mostrar un step ========
function showStep(stepIndex){
  steps.forEach((step, index)=>{
    if(index === stepIndex){
      step.classList.add('active');
      step.scrollTop = 0; // reset scroll
    } else {
      step.classList.remove('active');
    }
  });
  currentStep = stepIndex;
  updateProgress();
  wrapper.scrollTop = 0; // bloquea que el scroll general baje
}

// ======== Botones Siguiente ========
nextBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    if(validateStep(currentStep)){
      let nextStep = currentStep + 1;
      if(nextStep >= steps.length) nextStep = steps.length -1;
      showStep(nextStep);
    }
  });
});

// ======== Botones Anterior ========
prevBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    let prevStep = currentStep -1;
    if(prevStep < 0) prevStep =0;
    showStep(prevStep);
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
langSelect.addEventListener('change', ()=>{
  const lang = langSelect.value;
  document.querySelectorAll('[data-es]').forEach(el=>{
    if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'){ 
      el.placeholder = el.getAttribute(`data-${lang}`);
    } else {
      el.textContent = el.getAttribute(`data-${lang}`);
    }
  });

  document.querySelectorAll('.instructions [data-es]').forEach(ins=>{
    if(ins.tagName==='P'||ins.tagName==='LI'||ins.tagName==='H2'){
      ins.textContent = ins.getAttribute(`data-${lang}`);
    }
  });
});

// ======== Submit final ========
document.getElementById('app').addEventListener('submit', function(e){
  e.preventDefault();
  const confettiMsg = document.getElementById('confettiMsg');
  if(confettiMsg){
    confettiMsg.style.display='block';
    setTimeout(()=>{ confettiMsg.style.display='none';},6000);
  }
  alert('✅ Solicitud enviada correctamente. Gracias por completar el formulario.');
});

// ======== Ajustes de scroll para evitar rebotes ========
steps.forEach(step=>{
  step.style.maxHeight='80vh';
  step.style.overflowY='auto';
});
wrapper.style.overflowY='hidden'; // bloquea scroll general
