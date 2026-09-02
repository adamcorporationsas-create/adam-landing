# Tasks: SECOP II — Analista Inteligente de Oportunidades Comerciales

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~350 (rango 330–370) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | auto-forecast |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Registrar `secop2` en Vite + crear página de detalle | PR única | `npx vite build` (sin errores; `dist/servicio-secop2.html` existe) | Abrir `dist/servicio-secop2.html` en navegador | Revertir `vite.config.js` + borrar `src/servicio-secop2.html` |
| 2 | i18n (nav, card4, secop2, subtitle) | PR única | Chequeo visual de switch ES/EN en página y card | `npx vite dev` + navegador | Revertir claves en `i18n.js` |
| 3 | Card home + subtítulo HTML + dropdown | PR única | `npx vite build` + inspección visual de `#servicios` y navbar | `npx vite dev` + navegador | Revertir `src/index.html` y `navbar.ejs` |

## Fase 1 — Registro en build

- [x] 1.1 En `vite.config.js`, agregar `secop2: path.resolve(__dirname, 'src/servicio-secop2.html')` dentro de `rollupOptions.input` (junto a `citas`/`automatizacion`). AC manual: `npx vite build` compila `dist/servicio-secop2.html`.

## Fase 2 — i18n (`src/js/i18n.js`)

- [x] 2.1 Agregar en ES y EN `nav.secop2` (ES `"SECOP II · Analista Inteligente"` / EN `"SECOP II · Intelligent Analyst"`) en el bloque `nav.*`, tras `nav.automatizacion`.
- [x] 2.2 Agregar en ES y EN `servicios.card4.*` (title/desc/feat1..5/cta) tras `servicios.card3.*` y antes de `servicios.badge`. Valores del copy curado de la propuesta (`cta` ES `"Descubrir SECOP II"` / EN `"Explore SECOP II"`).
- [x] 2.3 Actualizar `servicios.subtitle` ES (`"Tres"` → `"Cuatro"`) y EN (`"Three service lines"` → `"Four service lines"`), sin alterar el resto del copy.
- [x] 2.4 Agregar en ES y EN el bloque completo `secop2.*` tras el bloque `citas.*`: `title`, `lead`, `resumen`, `area1..5.title`/`.desc` (Alertas a tu medida, Expediente completo con OCR, Asistente IA, Contratos electrónicos, Para todo tu equipo), `propuesta.title`/`.desc` y `cta.title`/`.text`, con el copy curado ES/EN.
- [x] 2.5 Checklist: verificar que TODAS las claves nuevas existan en ES **y** EN (`nav.secop2`, `card4.*` ×8, `secop2.*` ×19, `subtitle`). AC manual: ninguna clave sin traducción al alternar ES→EN en página y card.

## Fase 3 — Card en home (`src/index.html`)

- [x] 3.1 Actualizar el párrafo `servicios.subtitle` en `src/index.html` para reflejar "Cuatro líneas" (ES) / "Four" (EN) (reemplazo limpio, resto del copy intacto).
- [x] 3.2 Agregar la 4.ª `.servicio-card` (SECOP II) tras la card de citas en `#servicios`: `<a href="servicio-secop2.html" class="servicio-card" data-aos="slide-right" data-tilt data-aos-delay="400">` con `data-i18n="servicios.card4.*"`.
- [x] 3.3 Añadir `.servicio-card__badge` reutilizando `data-i18n="servicios.badge"` (como la card de citas).
- [x] 3.4 Añadir `.servicio-card__icon` con SVG inline radar/objetivo: `width="48" height="48" viewBox="0 0 80 80"` `fill="currentColor"` con opacidades (estilo de las cards 1–3, diferenciado por sweep y retículo de objetivo).
- [x] 3.5 Añadir `h3.servicio-card__title`, `p.servicio-card__description`, `ul.servicio-card__features` (5 `<li data-i18n="servicios.card4.featN">`) y `span.servicio-card__cta`. AC manual: card 4 visible en home con 5 features e icono.

## Fase 4 — Dropdown nav (`src/partials/navbar.ejs`)

- [x] 4.1 En `<ul class="navbar__dropdown">`, agregar `<li><a href="servicio-secop2.html" class="navbar__dropdown-link" data-i18n="nav.secop2">SECOP II · Analista Inteligente</a></li>`. AC manual: dropdown lista SECOP II enlazando a `servicio-secop2.html`.

## Fase 5 — Página de detalle (`src/servicio-secop2.html`)

- [x] 5.1 Crear `src/servicio-secop2.html` clonando el patrón de `servicio-citas.html`: `head-meta` con `extraCss: 'service-page.css'`, navbar/footer con `basePath: 'index.html'`, scripts con `service-page.js` + `hero-3d` init.
- [x] 5.2 Incluir bloque JSON-LD `Service` (adaptado de citas): `name` `"SECOP II — Analista Inteligente de Oportunidades Comerciales"`, `description` (monitoreo 24/7 de contratación pública), `url` `https://adamcoia.com/servicio-secop2.html`, provider Organization ADAM y `offers` `InStock`.
- [x] 5.3 Agregar `service-hero` (back/tag/title `secop2.title`/lead `secop2.lead`).
- [x] 5.4 Agregar bloque resumen destacado `.service-block--highlight` con `secop2.resumen`.
- [x] 5.5 Agregar 5 bloques `.service-block`/`.service-area` (y `--full` donde aplique) mapeando `secop2.area1..5.*` sobre `feat1..5`, y bloque propuesta con `secop2.propuesta.*`.
- [x] 5.6 Agregar CTA final `.service-cta` con `secop2.cta.*` + botón WhatsApp `service.cta.whatsapp`. AC manual: `dist/servicio-secop2.html` carga con hero, 5 bloques, CTA y partials.

## Fase 6 — Verificación

- [x] 6.1 Ejecutar `npx vite build` sin errores.
- [x] 6.2 Verificar que `dist/servicio-secop2.html` existe y carga (hero, 5 bloques, CTA, navbar/footer).
- [ ] 6.3 Verificar card 4 visible en `#servicios` (subtitle "Cuatro/Four") y dropdown con link SECOP II.
- [ ] 6.4 Validar switch ES/EN en página y card: ninguna clave sin traducir.
- [ ] 6.5 Validar JSON-LD `Service` (inspección DevTools / validador).
