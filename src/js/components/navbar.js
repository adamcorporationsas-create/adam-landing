/* ==========================================================================
   NAVBAR - Menú móvil, scroll, cierre al navegar, dropdown servicios
   ========================================================================== */

const navbar = (() => {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navbarToggle');
  const nav = document.getElementById('navbarNav');
  const links = document.querySelectorAll('.navbar__link');
  let isOpen = false;
  let currentDropdown = null;

  const open = () => {
    navbar.classList.add('navbar--open');
    toggle.setAttribute('aria-expanded', 'true');
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.dataset.scrollY = scrollY;
    isOpen = true;
  };

  const close = () => {
    navbar.classList.remove('navbar--open');
    toggle.setAttribute('aria-expanded', 'false');
    const scrollY = parseInt(document.body.dataset.scrollY || '0');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
    delete document.body.dataset.scrollY;
    window.scrollTo(0, scrollY);
    isOpen = false;
    closeAllDropdowns();
  };

  const toggleMenu = () => {
    isOpen ? close() : open();
  };

  // Navbar glass effect al scrollear
  const handleScroll = () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
  };

  // Cerrar menú al hacer clic en un link
  const handleLinkClick = () => {
    if (isOpen) close();
  };

  // === DROPDOWN SERVICIOS ===
  const closeAllDropdowns = () => {
    document.querySelectorAll('.navbar__item--dropdown.navbar__dropdown--open')
      .forEach(item => {
        item.classList.remove('navbar__dropdown--open');
        const btn = item.querySelector('.navbar__dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    currentDropdown = null;
  };

  const toggleDropdown = (e) => {
    const btn = e.currentTarget;
    const item = btn.closest('.navbar__item--dropdown');
    if (!item) return;

    const isOpen = item.classList.contains('navbar__dropdown--open');

    // Close any other open dropdown first
    closeAllDropdowns();

    if (!isOpen) {
      item.classList.add('navbar__dropdown--open');
      btn.setAttribute('aria-expanded', 'true');
      currentDropdown = item;
    }
    // Stop click from propagating to link
    e.preventDefault();
    e.stopPropagation();
  };

  // Cerrar dropdown al hacer clic fuera
  const handleOutsideClick = (e) => {
    if (!currentDropdown) return;
    if (!currentDropdown.contains(e.target)) {
      closeAllDropdowns();
    }
  };

  const init = () => {
    if (!toggle || !nav) return;

    toggle.addEventListener('click', toggleMenu);
    window.addEventListener('scroll', handleScroll, { passive: true });
    links.forEach(link => link.addEventListener('click', handleLinkClick));

    // Inicializar dropdowns
    const dropdownToggles = document.querySelectorAll('.navbar__dropdown-toggle');
    dropdownToggles.forEach(btn => {
      btn.addEventListener('click', toggleDropdown);
    });

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', handleOutsideClick);
  };

  return { init };
})();
window.navbar = navbar;
