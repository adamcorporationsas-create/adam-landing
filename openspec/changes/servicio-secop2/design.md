# Design: SECOP II — Analista Inteligente de Oportunidades Comerciales

## Technical Approach

Agregar SECOP II como cuarta línea de servicio replicando **exactamente el patrón del servicio citas** (`src/servicio-citas.html`), la línea base más reciente de convenciones del proyecto. Es contenido HTML estático compilado con Vite 8: no se introduce framework, dependencias, ni backend real (marketing estático). Todo el copy vive en el sistema i18n embebido (`src/js/i18n.js`, objeto `translations {es, en}` con runtime ES/EN). Se toca el home (card + subtítulo + dropdown), una página de detalle nueva, las claves i18n y el registro de Vite.

## Architecture Decisions

| Decisión | Alternativas | Decisión | Rationale |
|----------|--------------|----------|-----------|
| Replicar patrón de `servicio-citas.html` | Patrón asistentes/automatización | Replicar citas | Es la página más reciente y la base de convenciones actual (partials, `service-page.css`, JSON-LD, `hero-3d`). |
| Copy vía i18n en `i18n.js` | HTML hardcodeado | i18n | Consistente con el runtime ES/EN existente; garantiza switch bilingüe sin duplicar markup. |
| Icono SVG inline `currentColor` 48×48 | Assets binarios/imágenes | SVG inline | Coherente con las otras 3 cards; sin assets nuevos (out of scope); hereda color de la marca. |
| Página registrada en `rollupOptions.input` | Sin registro | Registrar `secop2` | Sin la entrada la página no se compila a `dist/`. Es dependencia dura. |
| No sincronizar raíz `index.html` | Sincronizarla | Fuera de alcance | La raíz está desacoplada y desactualizada (ni siquiera tiene citas); sincronizar crea fuente divergente. Se trata en cambio aparte. |

## Data Flow

    index.html ──card4──> servicio-secop2.html ──JSON-LD Service + partials──> dist/servicio-secop2.html
         │ navbar.ejs link                                    ▲
         └───── i18n.js (servicios.card4.* / nav.secop2 / secop2.*) ────────┘

## File Changes

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `src/servicio-secop2.html` | Crear | Página de detalle (patrón citas) |
| `src/js/i18n.js` | Modificar | Claves `nav.secop2`, `servicios.card4.*`, `secop2.*` + subtítulo |
| `src/index.html` | Modificar | 4.ª `.servicio-card` + subtítulo "Cuatro líneas" |
| `src/partials/navbar.ejs` | Modificar | Link SECOP II en dropdown |
| `vite.config.js` | Modificar | Entrada `secop2` en `rollupOptions.input` |

## Página nueva: `src/servicio-secop2.html`

Clona `servicio-citas.html` (head-meta con `extraCss: 'service-page.css'`, navbar/footer `basePath: 'index.html'`, scripts con `service-page.js` + `hero3D`, JSON-LD `Service` inline). Mapa de bloques:

| Bloque | Clase | Clave i18n |
|--------|-------|------------|
| Hero (back/tag/title/lead) | `.service-hero` | `service.hero.*` compartidas; `secop2.title`, `secop2.lead` |
| Resumen destacado | `.service-block--highlight` | `secop2.resumen` |
| 5 áreas (bloques) | `.service-block` + `.service-area`/`--full` | `secop2.area1..5.title` / `.desc` (mapean `feat1..5`) |
| Propuesta de valor | `.service-block` | `secop2.propuesta.*` |
| CTA final con WhatsApp | `.service-cta` | `secop2.cta.title`, `.text`; `service.cta.whatsapp` |

**JSON-LD `Service`** (adaptado de citas):
- `name`: `"SECOP II — Analista Inteligente de Oportunidades Comerciales"`
- `provider`: Organization ADAM (igual que citas, url `https://adamcoia.com`)
- `description`: propuesta de valor de SECOP II (monitoreo 24/7 de contratación pública colombiana)
- `url`: `https://adamcoia.com/servicio-secop2.html`
- `offers`: misma estructura `Offer/InStock`

## Claves i18n a agregar (`src/js/i18n.js`)

Insertar `nav.secop2` en el bloque `nav.*` (después de `nav.automatizacion`); `servicios.card4.*` después de `servicios.card3.*`/antes de `servicios.badge`; bloque `secop2.*` después del bloque `citas.*`. Valores:

- `nav.secop2`: ES `"SECOP II · Analista Inteligente"` · EN `"SECOP II · Intelligent Analyst"`
- `servicios.card4.title`: ES `"SECOP II · Analista Inteligente"` · EN `"SECOP II · Intelligent Analyst"`
- `servicios.card4.desc`: ES `"Monitoreamos la contratación pública colombiana 24/7: recibí alertas, expedientes completos y respuestas de IA en el momento exacto."` · EN `"We monitor Colombian public procurement 24/7: get alerts, full case files and AI answers at the exact right moment."`
- `servicios.card4.feat1..5` y `.cta`: copy curado ES/EN de la propuesta (feat1–5 + `cta` `"Descubrir SECOP II"` ES / `"Explore SECOP II"` EN). Reutiliza `servicios.badge` para el badge "Próximamente".
- `servicios.subtitle`: ES → `"Cuatro líneas de servicio diseñadas..."` · EN → `"Four service lines designed..."`
- `secop2.title/.lead/.resumen`, `secop2.area1..5.title/.desc`, `secop2.propuesta.title/.desc`, `secop2.cta.title/.text`: copy curado de la propuesta (hero, 5 áreas, CTA) en ES y EN.

## Cambio en `src/index.html`

1. **Subtítulo**: actualizar `servicios.subtitle` (ES "Tres"→"Cuatro", EN "Three"→"Four").
2. **4.ª `.servicio-card`** (después de la card de citas), patrón exacto:
   - `<a href="servicio-secop2.html" class="servicio-card" data-aos="slide-right" data-tilt data-aos-delay="400">`
   - `<span class="servicio-card__badge" data-i18n="servicios.badge">` (reutiliza "Próximamente", como citas).
   - `.servicio-card__icon` con SVG inline `width="48" height="48" viewBox="0 0 80 80"` `fill="currentColor"` + opacidades (mismo estilo que card 1–3).
   - `h3.servicio-card__title` `data-i18n="servicios.card4.title"`, `p.servicio-card__description`, `ul.servicio-card__features` con 5 `<li data-i18n="servicios.card4.featN">`, `span.servicio-card__cta`.

## Cambio en `src/partials/navbar.ejs`

En `<ul class="navbar__dropdown">`, agregar:
```html
<li><a href="servicio-secop2.html" class="navbar__dropdown-link" data-i18n="nav.secop2">SECOP II · Analista Inteligente</a></li>
```

## Cambio en `vite.config.js`

```js
secop2: path.resolve(__dirname, 'src/servicio-secop2.html'),
```

## Estrategia de icono (SVG inline, sin assets binarios)

Reutilizar el estilo de iconos existentes (SVG inline `fill="currentColor"`, `viewBox 0 0 80 80`, trazos + `opacity` para dar profundidad, 48×48). **Concepto recomendado para SECOP II: radar/objetivo de monitoreo** — círculos concéntricos (radar) con un punto/objetivo central iluminado, un sweep radial y pequeñas marcas satélite que sugieren contratos/procesos detectados. Coherente con la marca: geometría limpia, cyan/currentColor, mismo lenguaje visual que las cards 1–3 (icono de automatización ya usa círculos concéntricos, así que diferenciar por el sweep y el retículo tipo objetivo). El hero puede reforzar el mismo concepto con CSS/`hero-3d` sin generar imagen.

## Riesgos técnicos y mitigaciones

| Riesgo | Mitigación |
|--------|-----------|
| i18n ES/EN incompleto rompe switch | Checklist de claves en tasks (cada clave en ES y EN); validar switch en página y card |
| JSON-LD `Service` duplicado a mano | Copiar bloque de citas adaptando name/description/url; revisar en diff y validar con validador |
| Página no compilada por falta de registro en vite | `servicio-secop2.html` es dependencia de `vite.config.js`; verificar `dist/servicio-secop2.html` existe |
| Subtítulo en dos idiomas desincronizado | Actualizar ES y EN en el mismo cambio |
| Raíz `index.html` desacoplada | Fuera de alcance (decisión aparte documentada en proposal) |

## Verificación técnica (`strict_tdd: false`, validación manual)

1. `npx vite build` finaliza sin errores.
2. `dist/servicio-secop2.html` existe y carga (hero, 5 bloques, CTA, partials navbar/footer).
3. Card 4 visible en `#servicios` de `src/index.html`, subtítulo "Cuatro/Four".
4. Dropdown muestra link SECOP II → `servicio-secop2.html`.
5. Switch ES/EN en página y card: ninguna clave sin traducir.
6. JSON-LD `Service` válido (inspección en DevTools / validador).

## Threat Matrix

N/A — no hay routing, shell, subprocess, VCS/PR automation, executable-file classification ni process-integration boundary.

## Migration / Rollout

No migration required. Aditivo sobre HTML estático; rollback = revertir los 5 archivos (ver proposal).

## Open Questions

- Ninguna que bloquee el diseño.
