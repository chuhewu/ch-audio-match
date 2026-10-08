const canvas = document.querySelector('#spectrum');
const ctx = canvas.getContext('2d');
let phase = 0;

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawSpectrum() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);
  const points = [];
  for (let i = 0; i <= 150; i++) {
    const x = i / 150 * w;
    const p = i / 150;
    const body = Math.exp(-Math.pow((p - .48) * 2.7, 2));
    const ripple = Math.sin(i * .73 + phase) * 7 + Math.sin(i * .19 - phase * .4) * 5;
    const y = h * .88 - body * h * .48 - ripple * body;
    points.push([x, y]);
  }
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, 'rgba(105,216,205,.27)');
  gradient.addColorStop(1, 'rgba(105,216,205,.015)');
  ctx.beginPath();
  ctx.moveTo(0, h);
  points.forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.beginPath();
  points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.strokeStyle = 'rgba(105,216,205,.9)';
  ctx.lineWidth = 1.1;
  ctx.stroke();
  phase += .018;
  requestAnimationFrame(drawSpectrum);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawSpectrum();
