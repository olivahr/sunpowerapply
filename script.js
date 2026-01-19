<script>
// ======== Variables principales ========
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const progress = document.getElementById('progress');
let currentStep = 0;

// ======== Inicialización ========
// Solo mostrar el primer step
steps.forEach((step, index) => {
  if(index === 0){
    step.classList.add('active');
  } else {
    step.classList.remove('active');
  }
});
// Inicializar barra de progreso
updateProgress();

// ======== Función para actualizar barra de progreso ========
function updateProgress(){
  const percent = ((currentStep+1)/steps.length)*100;
  progress.style.width = percent+'%';
  
  // Score fill solo en el step actual
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
      // Evitar pasar del último step
      if(currentStep >= steps.length) currentStep = steps.length - 1;
      steps[currentStep].classList.add('active');
      updateProgress();
      
      // Si es el último step, no hacer nada más, confeti solo al submit
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

// ======== Mensaje final y confeti solo al enviar ========
document.getElementById('app').addEventListener('submit', function(e){
  e.preventDefault();
  
  // Mostrar confeti y mensaje
  const confettiMsg = document.getElementById('confettiMsg');
  if(confettiMsg){
    confettiMsg.style.display = 'block';
    // Ocultar mensaje después de 6s
    setTimeout(()=>{confettiMsg.style.display='none';},6000);
  }
  
  // Alert opcional
  alert('✅ Solicitud enviada correctamente. Gracias por completar el formulario.');
  
  // Aquí puedes agregar lógica para enviar datos a backend si aplica
});

// ======== Ajustes de scroll ========
// Cada step tiene scroll propio
steps.forEach(step => {
  step.style.maxHeight = '80vh';
  step.style.overflowY = 'auto';
});

// ======== ES/EN centrado ========
// Asegúrate que tu contenedor de idiomas tenga id="langContainer"
const langContainer = document.getElementById('langContainer');
if(langContainer){
  langContainer.style.display = 'flex';
  langContainer.style.justifyContent = 'center';
  langContainer.style.alignItems = 'center';
  langContainer.style.margin = '20px 0';
}
</script>
