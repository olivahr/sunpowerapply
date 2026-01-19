function createConfetti() {
  const canvas = document.createElement('canvas');
  canvas.id = 'confettiCanvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];
  const colors = ['#1f8f4a', '#45c16c', '#FFD700', '#FFB347'];

  for (let i = 0; i < 200; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 100 + 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10,
      tiltAngleIncrement: Math.random() * 0.07 + 0.05,
      tiltAngle: 0
    });
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.lineWidth = c.r / 2;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r/4, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r/2);
      ctx.stroke();
    });
    update();
  }

  function update() {
    confetti.forEach(c => {
      c.tiltAngle += c.tiltAngleIncrement;
      c.y += (Math.cos(c.d) + 3 + c.r/2)/2;
      c.tilt = Math.sin(c.tiltAngle) * 15;

      if (c.y > canvas.height) {
        c.x = Math.random() * canvas.width;
        c.y = -20;
        c.tilt = Math.random() * 10 - 10;
      }
    });
  }

  let confettiInterval = setInterval(draw, 20);
  setTimeout(() => {
    clearInterval(confettiInterval);
    canvas.remove();
  }, 6000); // dura 6 segundos
}

// Activar confeti en formulario
document.getElementById('app').addEventListener('submit', function(e){
  e.preventDefault();
  createConfetti();
  alert('✅ Solicitud enviada correctamente. Espere los próximos pasos y confirmación del equipo corporativo.');
});