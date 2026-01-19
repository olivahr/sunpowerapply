// =======================
// Variables globales
// =======================
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const progress = document.getElementById('progress');
let currentStep = 0;

// =======================
// Inicialización
// =======================
function initForm() {
  // Solo mostrar el primer paso
  steps.forEach((step, index) => {
    if(index === 0){
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });

  // Ocultar confeti al inicio
  const confetti = document.getElementById('confettiMsg');
  if(confetti) confetti.style.display = 'none';

  updateProgress();
}
initForm();

// =======================
// Función actualizar barra de progreso
// =======================
function updateProgress(){
  const percent = ((currentStep+1)/steps.length)*100;
  progress.style.width = percent+'%';
  
  // Llenar el score del paso actual
  const scoreFill = document.getElementById('score'+(currentStep+1));
  if(scoreFill) scoreFill.style.width='100%';
}

// =======================
// Función validar inputs del paso
// =======================
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

// =======================
// Botones "Siguiente"
// =======================
nextBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    if(validateStep(currentStep)){
      steps[currentStep].classList.remove('active');
      currentStep++;
      if(currentStep >= steps.length) currentStep = steps.length-1;
      steps[currentStep].classList.add('active');
      updateProgress();
      scrollToStep(currentStep);
    }
  });
});

// =======================
// Botones "Anterior"
// =======================
prevBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    steps[currentStep].classList.remove('active');
    currentStep--;
    if(currentStep < 0) currentStep = 0;
    steps[currentStep].classList.add('active');
    updateProgress();
    scrollToStep(currentStep);
  });
});

// =======================
// Desplazar suavemente al paso actual
// =======================
function scrollToStep(stepIndex){
  steps[stepIndex].scrollIntoView({behavior:'smooth', block:'start'});
}

// =======================
// Cambio de idioma
// =======================
const langSelect = document.getElementById('langSelect');
if(langSelect){
  langSelect.addEventListener('change', ()=>{
    const lang = langSelect.value;
    document.querySelectorAll('[data-es]').forEach(el=>{
      if(el.tagName==='INPUT'||el.tagName==='TEXTAREA'){ 
        el.placeholder = el.getAttribute(`data-${lang}`);
      } else {
        el.textContent = el.getAttribute(`data-${lang}`);
      }
    });
  });
}

// =======================
// Evento final al enviar formulario
// =======================
const form = document.getElementById('app');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault(); // evitar reload

    // Mostrar mensaje final y confeti
    const confetti = document.getElementById('confettiMsg');
    if(confetti) confetti.style.display = 'block';

    // Alerta opcional
    alert('✅ Solicitud enviada correctamente. Gracias por completar el formulario.');

    // Mantener confeti visible por 6 segundos
    setTimeout(()=>{
      if(confetti) confetti.style.display='none';
    },6000);

    // Aquí puedes agregar redirección a otra página si quieres
    // window.location.href = "continuar.html";
  });
}
