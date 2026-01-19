// ===================== Manejo de Steps =====================
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const progress = document.getElementById('progress');
let currentStep = 0;

// ===================== Actualizar Barra de Progreso =====================
function updateProgress(){
  const percent = ((currentStep+1)/steps.length)*100;
  if(progress) progress.style.width = percent+'%';
  const scoreFill = document.getElementById('score'+(currentStep+1));
  if(scoreFill) scoreFill.style.width = '100%';
}

// ===================== Botones Next =====================
nextBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    if(validateStep(currentStep)){
      steps[currentStep].classList.remove('active');
      currentStep++;
      if(currentStep < steps.length){
        steps[currentStep].classList.add('active');
      }
      updateProgress();
    }
  });
});

// ===================== Botones Previous =====================
prevBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    steps[currentStep].classList.remove('active');
    currentStep--;
    if(currentStep >= 0){
      steps[currentStep].classList.add('active');
    }
    updateProgress();
  });
});

// ===================== Validación de Step =====================
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

// ===================== Cambio de idioma =====================
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

// ===================== Mensaje Final y Confeti =====================
const form = document.getElementById('app');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    // Mostrar confeti
    const confettiMsg = document.getElementById('confettiMsg');
    if(confettiMsg){
      confettiMsg.style.display = 'block';
    }
    // Auto ocultar después de 6 segundos
    setTimeout(()=>{
      if(confettiMsg){
        confettiMsg.style.display = 'none';
      }
    },6000);
    
    // Mensaje alerta
    alert('✅ Solicitud enviada correctamente. Gracias por completar el formulario.');
    
    // Aquí puedes poner lógica de envío real (fetch/axios) si quieres
  });
}

// ===================== Inicialización =====================
updateProgress();
