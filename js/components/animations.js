/* ==========================================================================
   ANIMATIONS - Scroll reveal con Intersection Observer
   ==========================================================================
   Busca elementos con [data-aos] y los anima al entrar al viewport.
   Soporta tipos: fade-up, fade-in, scale, slide-left, slide-right.
   Delays escalonados vía data-aos-delay (ej: data-aos-delay="200").
   ========================================================================== */

const animations = (() => {
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const initTilt = () => {
    if (prefersReducedMotion()) return;

    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  };

  const init = () => {
    // No animar si el usuario prefiere movimiento reducido
    if (prefersReducedMotion()) {
      document.querySelectorAll('[data-aos]').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    // Solo ejecutar si el navegador soporta IntersectionObserver
    if (!('IntersectionObserver' in window)) return;

    // Activar CSS de animación (el estado base es visible sin esta clase)
    document.documentElement.classList.add('aos-ready');

    const elements = document.querySelectorAll('[data-aos]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.getAttribute('data-aos-delay'), 10);
            // Si tiene delay explícito lo usa, sino 0 (sin cascada automática)
            const finalDelay = isNaN(delay) ? 0 : delay;

            setTimeout(() => {
              el.classList.add('aos-visible');
            }, finalDelay);

            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    elements.forEach((el) => {
      observer.observe(el);
    });

    initTilt();
  };

  return { init };
})();
window.animations = animations;
