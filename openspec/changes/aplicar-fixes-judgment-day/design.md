# Design: Aplicar Fixes de Judgment Day

## Resumen Ejecutivo

De los 17 items identificados, **13 ya están implementados** en el código actual (commit `8caa4aa` — refactor: eliminate tech debt). Los 4 restantes requieren cambios menores de CSS y JS. No hay cambios arquitectónicos, sólo parches localizados.

---

## Estado por Item

### Group A — Accesibilidad

| # | Item | Estado | Acción |
|---|------|--------|--------|
| 1 | `scroll-padding-top` | ✅ Ya en `reset.css` L15 | Ninguna |
| 2 | skip-to-content link | ✅ Ya en 3 HTMLs + CSS | Ninguna |
| 3 | Landmark `<main>` | ✅ Ya envuelve hero→contacto en 3 páginas | Ninguna |
| 4 | `:focus` contrast | ✅ `:focus-visible` + `.form__input:focus` con outline | Ninguna |
| 5 | `prefers-reduced-motion` CSS | ⚠️ JS check existe, falta `@media` block global | **Agregar** |
| 6 | SVG `aria-hidden` WhatsApp | ✅ Ya en index.html | Ninguna |
| 7 | iOS body scroll lock | ✅ Ya en navbar.js | Ninguna |

### Group B — Formulario

| # | Item | Estado | Acción |
|---|------|--------|--------|
| 8 | `action`/`method` fallback | ✅ Ya en form tag | Ninguna |
| 9 | Mensajes de error con clase | ⚠️ `showError()` usa textContent, CSS usa `+` selector | **Refinar CSS** |
| 10 | `autocomplete` attributes | ✅ Ya en 4 inputs | Ninguna |
| 11 | Form no destructivo | ⚠️ Usa `form.style.display`, no innerHTML | **Refinar** |

### Group C — Service Pages

| # | Item | Estado | Acción |
|---|------|--------|--------|
| 12 | Navbar toggle en service pages | ✅ `id="navbarToggle"` presente, JS lo vincula | Ninguna |
| 13 | Service benefits CSS grid | ⚠️ CSS existe, HTML no lo usa en automatización | **Verificar** |

### Group D — Cleanup

| # | Item | Estado | Acción |
|---|------|--------|--------|
| 14 | Logo href → `/` | ✅ Ya apunta a `index.html` | Ninguna |
| 15 | `transitionstart` listener | ✅ No existe código muerto | Ninguna |
| 16 | `.servicio-card` duplicado | ✅ Un solo bloque en components.css | Ninguna |
| 17 | Favicon | ✅ Ya en 3 HTMLs | Ninguna |

---

## Arquitectura de Cambios

Sólo 4 archivos modificados, 0 creados, 0 eliminados.

### Fix #5 — `prefers-reduced-motion` CSS block

**Archivo**: `css/animations.css`
**Approach**: Agregar `@media (prefers-reduced-motion: reduce)` al final que anule todas las transiciones/transformaciones de elementos animados.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  [data-aos] {
    opacity: 1 !important;
    transform: none !important;
  }
  .whatsapp-float {
    animation: none !important;
  }
}
```

**Riesgo**: Bajo. `!important` necesario para overridear `.aos-ready` y animaciones inline. No afecta layout.

### Fix #9 — Mensajes de error con clase `.show`

**Archivo**: `css/components.css`
**Approach**: Cambiar el selector `.form__input--error + .form__error` por una clase `.form__error--visible`. Mantener ambos como fallback.

```css
/* Reemplazar: */
.form__input--error + .form__error {
  display: block;
}

/* Por: */
.form__error--visible {
  display: block;
}
```

**Archivo**: `js/main.js` — `showError()`: agregar `errorEl.classList.add('form__error--visible')` después de setear textContent. `clearError()`: remover la clase.

**Riesgo**: Bajo. El selector de hermanos era frágil si el markup cambiaba. La clase es más robusta.

### Fix #11 — Form success con clase CSS

**Archivo**: `js/main.js`
**Approach**: Reemplazar `form.style.display = 'none'` por `form.classList.add('form--submitted')`. En `formResetBtn` handler: `form.classList.remove('form--submitted')`.

```css
/* components.css - agregar */
.form--submitted {
  display: none;
}
```

**Detalle**: `showSuccess()` ya no modifica `display` inline, usa clase. El reset button ya existe y funciona.

**Riesgo**: Bajo. Compatible con el reset button existente.

### Fix #13 — Service benefits en automatización

**Archivo**: `servicio-automatizacion.html`
**Approach**: La sección "Propuesta de Valor" ya usa `.service-propuesta` que tiene grid 3-columnas en desktop vía CSS. Está visualmente correcta. **No requiere cambios** — el CSS actual ya es responsive. Marcar como verificado.

---

## Verification

| Fix | Verificación |
|-----|-------------|
| #5 | `window.matchMedia('(prefers-reduced-motion: reduce)').matches → true` en DevTools. Verificar que animaciones se desactivan. |
| #9 | Submit form vacío → error span visible con clase. `aria-live="polite"` debe anunciar el texto. |
| #11 | Submit exitoso → form oculto, success visible. Reset → form visible, campos limpios. |
| #13 | `npx vite build` sin errores. Verificar servicio-automatizacion.html en browser. |

## Open Questions

Ninguna. Todos los cambios son directos y localizados.
