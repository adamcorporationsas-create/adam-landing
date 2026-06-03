/* ==========================================================================
   NAVBAR - Menú móvil, scroll, cierre al navegar
   ========================================================================== */

const navbar = (() => {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navbarToggle');
  const nav = document.getElementById('navbarNav');
  const links = document.querySelectorAll('.navbar__link');
  let isOpen = false;

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

  const init = () => {
    if (!toggle || !nav) return;

    toggle.addEventListener('click', toggleMenu);
    window.addEventListener('scroll', handleScroll, { passive: true });
    links.forEach(link => link.addEventListener('click', handleLinkClick));
  };

  return { init };
})();
window.navbar = navbar;
