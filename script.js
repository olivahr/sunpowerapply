// ================= VARIABLES PRINCIPALES =================
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const progress = document.getElementById('progress');
let currentStep = 0;

// ================= INICIALIZACIÓN =================
function initSteps() {
  steps.forEach((step, index) => {
    if(index === 0){
      step.classList.add('active');
      step.style.display = 'flex';
    } else {
      step.classList.remove('active');
      step.style.display = 'none';
    }
  });
  updateProgress();
}
initSteps();

// ================= MOSTRAR STEP =================
function showStep(index){
  steps.forEach((step, i) => {
    if(i === index){
      step.style.display = 'flex';
      setTimeout(()=> step.classList.add('active'), 10);
    } else {
      step.classList.remove('active');
      step.style.display = 'none';
    }
  });
  updateProgress();
}

// ================= ACTUALIZAR PROGRESO Y SCORE =================
function updateProgress(){
  const percent = ((currentStep + 1)/steps.length)*100;
  if(progress) progress.style.width = percent + '%';

  steps.forEach((step, index) => {
    const scoreFill = step.querySelector('.score-fill');
    if(scoreFill){
      scoreFill.style.width = index <= currentStep ? '100%' : '0%';
    }
  });
}

// ================= VALIDACIÓN POR STEP =================
function validateStep(index){
  const step = steps[index];
  const inputs = step.querySelectorAll('input, select, textarea');
  for(let i=0; i<inputs.length; i++){
    if(!inputs[i].checkValidity()){
      inputs[i].reportValidity();
      return false;
    }
  }
  return true;
}

// ================= BOTONES SIGUIENTE =================
nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if(validateStep(currentStep)){
      currentStep++;
      if(currentStep >= steps.length) currentStep = steps.length - 1;
      showStep(currentStep);
    }
  });
});

// ================= BOTONES ANTERIOR =================
prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentStep--;
    if(currentStep < 0) currentStep = 0;
    showStep(currentStep);
  });
});

// ================= ENVÍO DEL FORMULARIO =================
const form = document.getElementById('app');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();

    const confettiMsg = document.getElementById('confettiMsg');
    if(confettiMsg){
      confettiMsg.style.display = 'block';
      setTimeout(()=> confettiMsg.style.display='none', 6000);
    }

    alert('✅ Solicitud enviada correctamente. Gracias por completar el formulario.');

    // Aquí tu lógica backend si aplica
  });
}

// ================= SCROLL SUAVE POR STEP =================
steps.forEach(step => {
  step.style.maxHeight = '80vh';
  step.style.overflowY = 'auto';
  step.style.webkitOverflowScrolling = 'touch'; // iOS
  step.style.overscrollBehavior = 'contain'; // evita rebotes
});
