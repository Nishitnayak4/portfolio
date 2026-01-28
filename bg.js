const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Hand‑tuned organic particles (no perfect symmetry)
const dots = Array.from({ length: 80 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5,
  vx: (Math.random() - 0.5) * 0.3,
  vy: (Math.random() - 0.5) * 0.3,
  drift: Math.random() * Math.PI * 2
}));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // soft gradient background
  const grad = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    100,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width
  );
  grad.addColorStop(0, '#0a0a0a');
  grad.addColorStop(1, '#000');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  dots.forEach(d => {
    d.drift += 0.002;
    d.x += d.vx + Math.cos(d.drift) * 0.2;
    d.y += d.vy + Math.sin(d.drift) * 0.2;

    if (d.x < 0) d.x = canvas.width;
    if (d.x > canvas.width) d.x = 0;
    if (d.y < 0) d.y = canvas.height;
    if (d.y > canvas.height) d.y = 0;

    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fill();
  });

  // subtle hand‑drawn connections
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = `rgba(255,255,255,${0.08 - dist / 1500})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

let pulses = Array.from({ length: 3 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: 0,
  max: 180 + Math.random() * 120,
  speed: 0.6 + Math.random() * 0.4
}));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const grad = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    100,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width
  );
  grad.addColorStop(0, '#235a5d');
  grad.addColorStop(1, '#793737');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  dots.forEach(d => {
    d.drift += 0.002;
    d.x += d.vx + Math.cos(d.drift) * 0.2;
    d.y += d.vy + Math.sin(d.drift) * 0.2;

    if (d.x < 0) d.x = canvas.width;
    if (d.x > canvas.width) d.x = 0;
    if (d.y < 0) d.y = canvas.height;
    if (d.y > canvas.height) d.y = 0;

    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fill();
  });

  pulses.forEach(p => {
    p.r += p.speed;
    const alpha = 1 - p.r / p.max;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(120,180,255,${alpha * 0.25})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    if (p.r > p.max) {
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height;
      p.r = 0;
      p.max = 180 + Math.random() * 120;
    }
  });

  requestAnimationFrame(draw);
}

draw();