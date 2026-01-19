// ================= VARIABLES PRINCIPALES =================
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const progressBar = document.getElementById('progress');
let currentStep = 0;

// ================= FUNCION ACTUALIZAR PROGRESO =================
function updateProgress(){
  const percent = ((currentStep + 1) / steps.length) * 100;
  if(progressBar){
    progressBar.style.width = percent + '%';
  }
  steps.forEach((step, index) => {
    const scoreFill = step.querySelector('.score-fill');
    if(scoreFill){
      scoreFill.style.width = index <= currentStep ? '100%' : '0%';
    }
  });
}

// ================= FUNCION VALIDACION =================
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

// ================= BOTONES SIGUIENTE =================
nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if(validateStep(currentStep)){
      steps[currentStep].classList.remove('active');
      currentStep++;
      if(currentStep < steps.length){
        steps[currentStep].classList.add('active');
        updateProgress();
      }
    }
  });
});

// ================= BOTONES ANTERIOR =================
prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    steps[currentStep].classList.remove('active');
    currentStep--;
    if(currentStep >= 0){
      steps[currentStep].classList.add('active');
      updateProgress();
    }
  });
});

// ================= CAMBIO DE IDIOMA =================
const langSelect = document.getElementById('langSelect');
if(langSelect){
  langSelect.addEventListener('change', ()=>{
    const lang = langSelect.value;
    document.querySelectorAll('[data-es]').forEach(el=>{
      if(el.tagName==='INPUT' || el.tagName==='TEXTAREA'){ 
        el.placeholder = el.getAttribute(`data-${lang}`) || '';
      } else {
        el.textContent = el.getAttribute(`data-${lang}`) || '';
      }
    });
  });
}

// ================= MENSAJE FINAL Y CONFETI =================
const appForm = document.querySelector('form');
if(appForm){
  appForm.addEventListener('submit', function(e){
    e.preventDefault();

    // Mostrar confeti y mensaje
    const confettiMsg = document.getElementById('confettiMsg');
    if(confettiMsg){
      confettiMsg.style.display = 'block';
    }

    // Animación confeti simple con setTimeout (puedes integrar librerías)
    setTimeout(()=>{
      if(confettiMsg){
        confettiMsg.style.display = 'none';
      }
    }, 6000);

    // Mensaje alert opcional
    alert('✅ ¡Solicitud enviada correctamente! Espere instrucciones por correo.');
    
    // Redirigir si es index.html a continuar.html
    if(window.location.pathname.includes('index.html')){
      window.location.href = 'continuar.html';
    }
  });
}

// ================= INICIALIZAR =================
window.addEventListener('DOMContentLoaded', ()=>{
  if(steps.length) steps[0].classList.add('active');
  updateProgress();
});
