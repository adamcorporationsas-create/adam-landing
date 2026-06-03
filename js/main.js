/* ==========================================================================
   MAIN - Punto de entrada del sitio
   ==========================================================================
   Con type="module", el DOM ya está parseado cuando ejecuta.
   No necesita DOMContentLoaded. */


/* ==========================================================================
   FORMULARIO DE CONTACTO
   ==========================================================================
   Usa FormSubmit (<https://formsubmit.co>) para enviar los mensajes.
   ========================================================================== */

// ─── CONFIGURACIÓN FORMSUBMIT ────────────────────────────────────────
const CONTACT_EMAIL = 'adamcorporationsas@gmail.com';
// ─────────────────────────────────────────────────────────────────────

const contactForm = (() => {
  const form = document.getElementById('contactForm');

  const t = (key) => {
    if (typeof window.i18n !== 'undefined' && typeof window.i18n.t === 'function') {
      return window.i18n.t(key);
    }
    return '';
  };

  const showError = (input, message) => {
    input.classList.add('form__input--error');
    const errorEl = input.parentElement.querySelector('.form__error');
    if (errorEl && message) {
      errorEl.textContent = message;
    }
  };

  const clearError = (input) => {
    input.classList.remove('form__input--error');
  };

  const validateField = (input) => {
    if (!input.required) return true;

    if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(input.value.trim())) {
        showError(input, t('contacto.form.error-email'));
        return false;
      }
    } else if (input.value.trim() === '') {
      showError(input);
      return false;
    }

    clearError(input);
    return true;
  };

  const showSuccess = () => {
    form.style.display = 'none';
    const successEl = document.getElementById('formSuccess');
    if (successEl) successEl.hidden = false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.classList.add('btn--loading');
    submitBtn.disabled = true;

    try {
      const response = await fetch('https://formsubmit.co/ajax/' + CONTACT_EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _captcha: false,
          _template: 'table',
          name:     document.getElementById('nombre').value,
          email:    document.getElementById('email').value,
          phone:    document.getElementById('telefono').value,
          company:  document.getElementById('empresa').value,
          message:  document.getElementById('mensaje').value,
        }),
      });

      const result = await response.json();

      if (result.success) {
        showSuccess();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('FormSubmit error:', error);
      submitBtn.classList.remove('btn--loading');
      submitBtn.disabled = false;
      // Mostrar el error sin alert()
      const errorMsg = t('contacto.form.error-send') || 'Ocurrió un error al enviar el mensaje.';
      const existingToast = document.querySelector('.form-toast');
      if (existingToast) existingToast.remove();
      const toast = document.createElement('div');
      toast.className = 'form-toast';
      toast.textContent = errorMsg;
      toast.setAttribute('role', 'alert');
      form.prepend(toast);
      setTimeout(() => toast.remove(), 6000);
    }
  };

  const handleLanguageChange = () => {
    // i18n system updates data-i18n attributes automatically — no action needed
  };

  const init = () => {
    if (!form) return;

    form.addEventListener('submit', handleSubmit);
    document.addEventListener('languageChanged', handleLanguageChange);

    form.querySelectorAll('.form__input').forEach((input) => {
      input.addEventListener('input', () => clearError(input));
      input.addEventListener('blur', () => {
        if (input.required) validateField(input);
      });
    });

    const resetBtn = document.getElementById('formResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.style.display = '';
        const successEl = document.getElementById('formSuccess');
        if (successEl) successEl.hidden = true;
        form.reset();
        form.querySelectorAll('.form__input--error').forEach((el) => {
          el.classList.remove('form__input--error');
        });
      });
    }
  };

  return { init };
})();


/* ==========================================================================
   INICIALIZACIÓN
   ==========================================================================
   Las IIFE de navbar, animations, i18n ya corrieron en sus propios módulos.
   Aquí solo iniciamos lo que necesita arranque. */

window.navbar.init();
window.animations.init();
window.i18n.init();

// Language switcher
document.querySelectorAll('.lang-switcher__btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    window.i18n.setLanguage(btn.getAttribute('data-lang'));
  });
});

// Formulario
contactForm.init();

// Hero: navegación real con recarga de página
document.querySelectorAll('.hero__actions a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    const [path, hash] = href.split('#');
    location.replace(path + '?_=' + Date.now() + '#' + hash);
  });
});

// Scroll to Top: mostrar/ocultar flecha al scrollear
const scrollTop = document.getElementById('scrollTop');
if (scrollTop) {
  const toggleScrollTop = () => {
    scrollTop.classList.toggle('scroll-top--visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', toggleScrollTop, { passive: true });
  toggleScrollTop(); // estado inicial
}

// Timeline eliminado — solo se ven los pasos con sus dots

// Video Hero: reproductor con audio
const initHeroVideo = () => {
  const video = document.getElementById('heroVideo');
  const overlay = document.getElementById('heroVideoOverlay');
  const playBtn = document.getElementById('heroVideoPlayBtn');
  const controls = document.getElementById('heroVideoControls');
  const ctrlPlay = document.getElementById('heroVideoCtrlPlay');
  const ctrlMute = document.getElementById('heroVideoCtrlMute');
  const volumeSlider = document.getElementById('heroVideoVolume');
  if (!video) return;

  // Reproducir con audio (quitar muted)
  const playWithAudio = () => {
    video.muted = false;
    video.play().then(() => {
      overlay.classList.add('hero__video-overlay--hidden');
      controls.hidden = false;
      updatePlayIcon(false);
    }).catch(() => {
      // Si falla, seguir muteado
      video.muted = true;
      video.play();
    });
  };

  // Click en overlay → play con audio
  overlay.addEventListener('click', playWithAudio);
  playBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    playWithAudio();
  });

  // Play / Pause
  ctrlPlay.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      updatePlayIcon(false);
    } else {
      video.pause();
      updatePlayIcon(true);
    }
  });

  const updatePlayIcon = (paused) => {
    ctrlPlay.innerHTML = paused
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';
    ctrlPlay.setAttribute('aria-label', paused ? 'Reproducir' : 'Pausar');
  };

  // Volumen
  volumeSlider.addEventListener('input', () => {
    video.volume = parseFloat(volumeSlider.value);
    video.muted = false;
    updateMuteIcon(video.volume === 0);
  });

  // Mute toggle
  ctrlMute.addEventListener('click', () => {
    video.muted = !video.muted;
    updateMuteIcon(video.muted);
    if (!video.muted && video.volume === 0) {
      video.volume = 0.5;
      volumeSlider.value = '0.5';
    }
  });

  const updateMuteIcon = (muted) => {
    ctrlMute.innerHTML = muted
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.49 4.49 0 002.5-3.5z"/></svg>';
    ctrlMute.setAttribute('aria-label', muted ? 'Activar sonido' : 'Silenciar');
    volumeSlider.value = muted ? '0' : video.volume;
  };

  // Video termina → mostrar overlay de replay
  video.addEventListener('ended', () => {
    overlay.classList.remove('hero__video-overlay--hidden');
    controls.hidden = true;
    updatePlayIcon(true);
    video.muted = true; // preparado para próxima reproducción
  });

  // Ocultar controles cuando el mouse no se mueve
  let hideTimer;
  const showControls = () => {
    if (!video.paused) {
      controls.classList.remove('hero__video-controls--hidden');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        if (!video.paused) {
          controls.classList.add('hero__video-controls--hidden');
        }
      }, 3000);
    }
  };

  video.addEventListener('mousemove', showControls);
  video.addEventListener('mouseenter', showControls);
  controls.addEventListener('mouseenter', () => {
    clearTimeout(hideTimer);
    controls.classList.remove('hero__video-controls--hidden');
  });
  controls.addEventListener('mouseleave', showControls);
};

initHeroVideo();
