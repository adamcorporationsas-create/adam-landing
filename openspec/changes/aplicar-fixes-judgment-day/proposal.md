# Proposal: Aplicar Fixes de Judgment Day

## Intent

Consolidar y aplicar los 10 bugs críticos + 10 warnings de accesibilidad/calidad identificados por la revisión dual adversarial (Judgment Day). Sin estos fixes, el sitio tiene navegación rota en service pages, formulario sin feedback visual, beneficios sin estilos, y breachas de accesibilidad WCAG.

## Scope

### In Scope (17 items)
- Anchor links ocultos tras navbar fixed
- Form action/method faltante
- Mensajes de error en validación del form
- Service benefits sin CSS en automatización
- Navbar toggle muerto en service pages
- Form success destructivo (innerHTML)
- Logo link `href="#"` en index
- Landmark `<main>` ausente en todas las páginas
- Skip-to-content link ausente
- SVG WhatsApp sin `aria-hidden`
- iOS body scroll lock al abrir menú
- `:focus` outline de bajo contraste
- `.servicio-card` duplicado en components.css
- Listener `transitionstart` vacío en animations.js
- `prefers-reduced-motion` sin cobertura CSS
- `autocomplete` faltante en inputs
- Favicon check

### Out of Scope
- Refactor arquitectónico, test runner, framework, cambios de contenido/i18n, rediseño de componentes

## Capabilities

No existen specs en `openspec/specs/`. Todos los cambios son bug fixes + accesibilidad — sin cambios a nivel de comportamiento especificable.

### New Capabilities
None

### Modified Capabilities
None

## Approach

4 grupos por concern, ejecutados en orden:

1. **Accesibilidad** (landmark `<main>`, skip-link, focus contrast, SVG aria-hidden, iOS scroll lock, prefers-reduced-motion, autocomplete)
2. **Formulario** (action/method, mensajes error, success no destructivo)
3. **Service Pages** (navbar toggle ID, service benefits CSS)
4. **CSS Cleanup** (`.servicio-card` duplicado, listener muerto, logo link, favicon)

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `index.html` | Modified | `<main>`, skip-link, form, logo, autocomplete |
| `servicio-asistentes.html` | Modified | `<main>`, skip-link, navbar ID |
| `servicio-automatizacion.html` | Modified | `<main>`, skip-link, navbar ID |
| `css/reset.css` | Modified | scroll-padding-top, prefers-reduced-motion |
| `css/components.css` | Modified | `.servicio-card` duplicado, focus contrast |
| `css/service-page.css` | Modified | service-benefits si faltan |
| `js/components/navbar.js` | Modified | iOS scroll lock fix |
| `js/components/animations.js` | Modified | Remove dead transitionstart listener |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Romper navbar toggle en service pages | Low | Verificar IDs, probar en desktop y mobile |
| Form success regression | Low | Mantener showSuccess() separado |

## Rollback Plan

Cada fix es atómico en un commit. Rollback vía `git revert <commit>`.

## Dependencies

None.

## Success Criteria

- [ ] Anchor links muestran contenido completo sin ocultarse tras navbar
- [ ] Formulario envía con action/method correctos; errores visibles con texto
- [ ] Service benefits se renderizan con estilos visuales
- [ ] Navbar toggle abre/cierra menú en service pages
- [ ] Form success no destruye el form, permite re-envío
- [ ] Skip-link visible al focus con teclado
- [ ] Lighthouse Accessibility score ≥ 90
- [ ] W3C validation sin errores de landmarks
