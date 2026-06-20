/* ==========================================================================
   HERO - GSAP Animation Test
   Timeline de entrada profesional con GSAP
   ========================================================================== */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const heroGSAP = (() => {
  const init = () => {
    const mm = gsap.matchMedia();

    // ── Animación completa solo si no hay preferencia de movimiento reducido ──
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Estado inicial: todo corrido (opacity nativo, no forzamos 0)
      gsap.set('.hero__tag, .hero__title, .hero__description, .hero__actions, .hero__visual', {
        opacity: 0,
        y: 20,
      });

      // 1. Tag + título casi juntos
      tl.to('.hero__tag', { opacity: 1, y: 0, duration: 0.25 });
      tl.to('.hero__title', { opacity: 1, y: 0, duration: 0.3 }, '-=0.05');

      // 2. Descripción
      tl.to('.hero__description', { opacity: 1, y: 0, duration: 0.25 }, '-=0.15');

      // 3. CTAs
      tl.to('.hero__actions', { opacity: 1, y: 0, duration: 0.25 }, '-=0.15');

      // 4. Video/visual
      tl.to('.hero__visual', { opacity: 1, y: 0, duration: 0.3 }, '-=0.15');

      // ── Parallax sutil en scroll ──
      gsap.to('.hero', {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Fade out sutil del contenido al scrollear
      gsap.to('.hero__content', {
        opacity: 0.2,
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    });

    // ── Reduced motion: todo visible sin animación ──
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.hero__tag, .hero__title, .hero__highlight, .hero__description, .hero__actions, .hero__visual', {
        opacity: 1,
        y: 0,
      });
    });
  };

  return { init };
})();

export default heroGSAP;
