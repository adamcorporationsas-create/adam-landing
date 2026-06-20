/* ==========================================================================
   HERO 3D — Partículas flotantes (Canvas 2D)
   Campo disperso de partículas que flotan suavemente por toda la pantalla.
   SIN three.js — canvas 2D nativo, ~99% más liviano.
   ========================================================================== */

const hero3D = (() => {
  // Reducir partículas en mobile
  const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
  const COUNT = isMobile ? 80 : 350;
  const SPREAD_X = 24;
  const SPREAD_Y = 14;

  let canvas, ctx;
  let particles = [];
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let animFrameId = null;
  let startTime = 0;
  let running = false;
  let heroObserver = null;

  const init = () => {
    canvas = document.createElement('canvas');
    canvas.id = 'hero-canvas-3d';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    document.body.prepend(canvas);

    ctx = canvas.getContext('2d');

    resize();
    buildParticles();
    startTime = performance.now();

    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove, { passive: true });

    // Pausar partículas cuando el hero no está visible
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startRunning();
          } else {
            stopRunning();
          }
        });
      }, { threshold: 0 });
      heroObserver.observe(heroSection);
    }

    startRunning();
  };

  const startRunning = () => {
    if (running) return;
    running = true;
    startTime = performance.now();
    animate();
    canvas.style.opacity = '1';
  };

  const stopRunning = () => {
    running = false;
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    // Fade out suave
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 0.4s ease';
  };

  const resize = () => {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    if (ctx) ctx.scale(dpr, dpr);
  };

  const buildParticles = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    particles = [];

    for (let i = 0; i < COUNT; i++) {
      const bright = 0.3 + Math.random() * 0.7;
      particles.push({
        x: (Math.random() - 0.5) * SPREAD_X,
        y: (Math.random() - 0.5) * SPREAD_Y,
        baseX: 0,
        baseY: 0,
        speed: 0.15 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.3,
        driftY: (Math.random() - 0.5) * 0.2,
        amplitude: 0.3 + Math.random() * 0.7,
        color: `rgba(${Math.round(20 * bright)}, ${Math.round(64 * bright)}, ${Math.round(140 * bright)}, ${(0.3 + Math.random() * 0.4).toFixed(2)})`,
        size: 0.5 + Math.random() * 1.2,
      });
    }
  };

  const onMouseMove = (e) => {
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  const onTouchMove = (e) => {
    if (e.touches.length > 0) {
      targetMouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
    }
  };

  const animate = () => {
    if (!running) return;
    animFrameId = requestAnimationFrame(animate);
    const w = window.innerWidth;
    const h = window.innerHeight;
    const t = (performance.now() - startTime) / 1000;

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    // Clear with trail effect
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < COUNT; i++) {
      const p = particles[i];

      // Gentle floating drift
      const drift = Math.sin(t * p.speed + p.phase) * p.amplitude * 0.15;
      const drift2 = Math.cos(t * p.speed * 0.7 + p.phase * 1.3) * p.amplitude * 0.1;

      // Mouse breeze
      const breezeX = mouseX * 0.15;
      const breezeY = mouseY * 0.1;

      // Smooth position update
      p.x = p.x * 0.99 + (p.x + p.driftX + drift + breezeX) * 0.01;
      p.y = p.y * 0.99 + (p.y + p.driftY + drift2 + breezeY) * 0.01;

      // Reset when too far
      if (Math.abs(p.x) > SPREAD_X * 0.6) {
        p.x = (Math.random() - 0.5) * SPREAD_X;
      }
      if (Math.abs(p.y) > SPREAD_Y * 0.6) {
        p.y = (Math.random() - 0.5) * SPREAD_Y;
      }

      // Map 3D-like space to screen
      // z affects size and opacity for depth effect
      const screenX = w / 2 + (p.x / SPREAD_X) * w * 0.8;
      const screenY = h / 2 + (p.y / SPREAD_Y) * h * 0.8;

      ctx.beginPath();
      ctx.arc(screenX, screenY, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  };

  const destroy = () => {
    running = false;
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (heroObserver) heroObserver.disconnect();
    window.removeEventListener('resize', resize);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('touchmove', onTouchMove);
    if (canvas) canvas.remove();
    particles = [];
    canvas = null;
    ctx = null;
  };

  return { init, destroy };
})();

export default hero3D;
