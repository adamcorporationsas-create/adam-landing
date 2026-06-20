/* ==========================================================================
   TYPEWRITER — Animación de escritura en el Hero
   Cicla palabras clave con efecto de tipeo y cursor parpadeante.
   ========================================================================== */

const typewriter = (() => {
  const WORDS_ES = ['trabaja', 'atiende', 'vende', 'automatiza', 'crece'];
  const WORDS_EN = ['works',   'serves',  'sells', 'automates',  'grows'];

  const TYPE_SPEED = 75;
  const DELETE_SPEED = 40;
  const PAUSE_AFTER_TYPE = 2200;
  const PAUSE_AFTER_DELETE = 350;

  let el, cursorEl;
  let currentIndex = 0;
  let timeoutId = null;
  let destroyed = false;

  const getWords = () => {
    const lang = document.documentElement.lang || 'es';
    return lang === 'en' ? WORDS_EN : WORDS_ES;
  };

  const type = () => {
    if (destroyed) return;

    const words = getWords();
    const word = words[currentIndex];
    const text = el.getAttribute('data-full') || word;

    // Type one char at a time
    const currentLen = el.textContent.length;
    const isDeleting = el.classList.contains('typewriter--deleting');

    if (!isDeleting) {
      // Typing forward
      if (currentLen < text.length) {
        el.textContent = text.substring(0, currentLen + 1);
        timeoutId = setTimeout(type, TYPE_SPEED);
      } else {
        // Word complete — pause then delete
        cursorEl.style.opacity = '1';
        timeoutId = setTimeout(() => {
          el.classList.add('typewriter--deleting');
          timeoutId = setTimeout(type, DELETE_SPEED);
        }, PAUSE_AFTER_TYPE);
      }
    } else {
      // Deleting
      if (currentLen > 0) {
        el.textContent = text.substring(0, currentLen - 1);
        timeoutId = setTimeout(type, DELETE_SPEED);
      } else {
        // Fully deleted — next word
        el.classList.remove('typewriter--deleting');
        currentIndex = (currentIndex + 1) % words.length;
        const nextWord = words[currentIndex];
        el.setAttribute('data-full', nextWord);

        // Match highlight color
        el.style.color = '';

        timeoutId = setTimeout(type, PAUSE_AFTER_DELETE);
      }
    }
  };

  const restart = () => {
    if (timeoutId) clearTimeout(timeoutId);
    el.textContent = '';
    el.classList.remove('typewriter--deleting');
    currentIndex = 0;
    const words = getWords();
    el.setAttribute('data-full', words[0]);
    timeoutId = setTimeout(type, 500);
  };

  const init = () => {
    const highlight = document.querySelector('.hero__highlight');
    if (!highlight) return;

    el = highlight;
    el.classList.add('typewriter');

    // Create cursor element
    cursorEl = document.createElement('span');
    cursorEl.className = 'typewriter__cursor';
    cursorEl.setAttribute('aria-hidden', 'true');
    el.after(cursorEl);

    // Store the current word from i18n or HTML
    const words = getWords();
    el.setAttribute('data-full', words[0]);
    el.textContent = '';

    // Start after a brief delay
    timeoutId = setTimeout(type, 600);

    // Restart on language change
    document.addEventListener('languageChanged', () => {
      if (!destroyed) restart();
    });
  };

  const destroy = () => {
    destroyed = true;
    if (timeoutId) clearTimeout(timeoutId);
    if (cursorEl) cursorEl.remove();
  };

  return { init, destroy };
})();

export default typewriter;
