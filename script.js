// ===========================
// SCRIPT UNIFICADO FORMULARIOS
// ===========================

// Selección de elementos
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const progress = document.getElementById('progress');
let currentStep = 0;

// ===========================
// FUNCIONES
// ===========================

// Actualiza barra de progreso y score
function updateProgress(){
  const percent = ((currentStep+1)/steps.length)*100;
  progress.style.width = percent+'%';

  const score = document.getElementById('score'+(currentStep+1));
  if(score) score.style.width = '100%';
}

// Valida los campos de cada paso
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

// Muestra confeti y mensaje final de la sección
function showConfettiMessage(finalStep = false, continueUrl = ''){
  const msg = document.createElement('div');
  msg.classList.add('confetti-msg');
  msg.innerHTML = finalStep
    ? `<p>🎉 ¡Has completado todos los pasos de la aplicación! Espere instrucciones por correo electrónico.</p>`
    : `<p>✅ ¡Has completado la primera parte de tu solicitud!</p>
       <button id="continueBtn">Continuar</button>`;

  document.body.appendChild(msg);

  // Muestra el mensaje
  msg.style.display = 'flex';

  // Botón continuar si hay
  if(!finalStep && continueUrl){
    document.getElementById('continueBtn').addEventListener('click', ()=>{
      window.location.href = continueUrl;
    });
  }

  // Oculta mensaje automático
  setTimeout(()=>{ msg.style.display='none'; }, 6000);
}

// ===========================
// EVENTOS NEXT / PREV
// ===========================
nextBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    if(validateStep(currentStep)){
      steps[currentStep].classList.remove('active');
      currentStep++;

      // Si ya no hay más pasos, mostramos confeti final
      if(currentStep >= steps.length){
        const isIndex = document.querySelectorAll('.form-step').length <= 5; // index.html
        showConfettiMessage(!isIndex, 'continuar.html');
        return;
      }

      steps[currentStep].classList.add('active');
      updateProgress();
    }
  });
});

prevBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    if(currentStep>0){
      steps[currentStep].classList.remove('active');
      currentStep--;
      steps[currentStep].classList.add('active');
      updateProgress();
    }
  });
});

// ===========================
// CAMBIO DE IDIOMA ES/EN
// ===========================
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

// ===========================
// ENVÍO FORMULARIO
// ===========================
const form = document.querySelector('form');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const isIndex = document.querySelectorAll('.form-step').length <= 5;

    if(isIndex){
      // index.html: mensaje confeti parte 1
      showConfettiMessage(false, 'continuar.html');
    } else {
      // continuar.html: mensaje confeti final
      showConfettiMessage(true);
    }
  });
}

// ===========================
// INICIALIZACIÓN
// ===========================
if(steps.length>0){
  steps.forEach(step=>step.classList.remove('active'));
  steps[currentStep].classList.add('active');
  updateProgress();
}
