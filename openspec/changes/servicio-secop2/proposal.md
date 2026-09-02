# Propuesta: SECOP II — Analista Inteligente de Oportunidades Comerciales

## Identidad del cambio

- **ID**: `servicio-secop2`
- **Título**: Agregar SECOP II como cuarta línea de servicio en la landing de ADAM
- **Tipo**: Nuevo contenido / feature de marketing (HTML estático)
- **Idioma del artefacto**: español neutral-profesional (coincide con la configuración del proyecto)

## Intent (Contexto / Problema)

ADAM amplía su portafolio de servicios orientados a IA y automatización. Actualmente la landing ofrece **3 líneas de servicio** (asistentes, automatización y citas), todas gestionadas como páginas HTML estáticas que se compilan con Vite 8.

El cliente solicita agregar una **cuarta línea: SECOP II — Analista Inteligente de Oportunidades Comerciales**, un servicio de monitoreo de contratación pública colombiana. Se trata de una landing de marketing **estática**: no se requiere el producto real, solo su presentación comercial integrada al sitio existente.

El estado actual del proyecto: fuente canónica en `src/`, compilada a `dist/` mediante `npx vite build` (sin framework de frontend, sin tests automatizados, sin linter). Validación manual en navegador.

## Scope

### In Scope

1. Crear `src/servicio-secop2.html` replicando el patrón de la página de detalle existente (`src/servicio-citas.html`): hero de servicio, `service-blocks`, CTA final, partials `navbar`/`footer`/`scripts`/`head-meta` (con `extraCss: service-page.css`) y bloque JSON-LD `Service`.
2. Agregar la 4.ª `.servicio-card` en la sección `#servicios` de `src/index.html` (icono SVG inline 48×48, 5 features, `data-i18n="servicios.card4.*"`, `data-aos`/`data-tilt` el 4.º con `data-aos-delay="400"`).
3. Actualizar el subtítulo `servicios.subtitle`: "Tres líneas" → "Cuatro líneas" (ES) y "Three" → "Four" (EN).
4. Agregar link `<a href="servicio-secop2.html">` al dropdown de Servicios del partial `src/partials/navbar.ejs`.
5. Registrar la entrada `secop2` en `rollupOptions.input` de `vite.config.js` (sin esto la página no se compila).
6. Agregar claves i18n ES y EN en `src/js/i18n.js`: `nav.secop2`, `servicios.card4.*` (title/desc/feat1-5/cta, reutilizando `servicios.badge`) y el bloque completo `secop2.*` para la página de detalle.

### Out of Scope

- **NO** implementar el backend real de SECOP II, integración funcional con la contratación pública colombiana, ni monitoreo real. La página es marketing estático.
- **NO** sync obligatoria de la `index.html` raíz desacoplada (tratada como decisión aparte — ver sección "Decisión sobre la raíz index.html").
- **NO** assets de imagen nuevos salvo el icono SVG inline de la card.
- **NO** cambiar las líneas de servicio existentes (asistentes, automatización, citas) más allá de lo necesario para el subtítulo.
- No refactorizar el sistema de i18n ni la arquitectura CSS.

## Capabilities

> Contrato entre las fases proposal y spec.

### New Capabilities

- `servicios`: la landing de servicios de ADAM (sección `#servicios` del home, dropdown nav y páginas de detalle por servicio). Este cambio agrega un cuarto servicio (`secop2`) dentro de esta capacidad. _(No existe aún `openspec/specs/servicios/spec.md`; se creará como spec completo en la fase spec.)_

### Modified Capabilities

- None (no hay specs previas que modificar).

## Approach (Diseño de la solución — alto nivel)

Replicar exactamente el patrón del servicio más reciente (citas), ya que representa la línea base más actual de convenciones del proyecto. Los cambios cubren el home (card + subtítulo + dropdown), una página de detalle nueva y las claves i18n. Arquitectura: HTML estático con partials EJS, CSS atómico por componentes existente, JS modular con i18n embebido.

Archivos afectados:

| Archivo | Acción |
|---------|--------|
| `vite.config.js` | Modificar — añadir `secop2` a `rollupOptions.input` |
| `src/index.html` | Modificar — 4.ª `.servicio-card` + subtítulo |
| `src/partials/navbar.ejs` | Modificar — link SECOP II en dropdown |
| `src/servicio-secop2.html` | Crear — página de detalle (patrón citas) |
| `src/js/i18n.js` | Modificar — claves ES/EN (`nav.secop2`, `servicios.card4.*`, `secop2.*`) |

## Contenido curado

### Card de servicios (sección `#servicios`)

**ES** — `servicios.card4`:

- `title`: "SECOP II · Analista Inteligente"
- `desc`: "Monitoreamos la contratación pública colombiana 24/7: recibí alertas, expedientes completos y respuestas de IA en el momento exacto."
- `feat1`: "Alertas a tu medida por entidad, departamento, modalidad, valor y palabras clave"
- `feat2`: "Expediente completo con OCR: estudios previos, pliegos y anexos"
- `feat3`: "Asistente IA con consultas en tiempo real, citas a documentos y voz de dictado"
- `feat4`: "Contratos electrónicos: ejecución financiera, adjudicaciones y proveedores"
- `feat5`: "Búsquedas y alertas personalizadas para cada integrante del equipo"
- `cta`: "Descubrir SECOP II"

**EN** — `servicios.card4`:

- `title`: "SECOP II · Intelligent Analyst"
- `desc`: "We monitor Colombian public procurement 24/7: get alerts, full case files and AI answers at the exact right moment."
- `feat1`: "Custom alerts by entity, department, modality, amount and keywords"
- `feat2`: "Full case file with OCR: prior studies, tender documents and annexes"
- `feat3`: "AI assistant with real-time queries, document citations and spoken answers"
- `feat4`: "Electronic contracts: financial execution, awards and suppliers"
- `feat5`: "Personalized searches and alerts for every team member"
- `cta`: "Explore SECOP II"

### Página de detalle `servicio-secop2.html` (bloques propuestos)

1. **Hero de servicio** — titular "SECOP II · Analista Inteligente de Oportunidades Comerciales" + subtítulo con la propuesta de valor (cientos de procesos diarios, revisarlos a mano es imposible, monitoreo 24/7).
2. **Cómo funciona / service-blocks** (5 bloques, mapeando los 5 features):
   - 🎯 **Alertas a tu medida** — filtros (entidad, departamento, modalidad, valor, palabras clave) + email inmediato.
   - 📄 **El expediente completo** — importar estudios previos, pliegos y anexos; extracción de texto con OCR hasta en PDFs escaneados; destaca objetivo, condiciones, requisitos, inhabilidades y presupuesto.
   - 🤖 **Asistente IA** — chat en datos reales, voz de dictado, citas a documentos y streaming.
   - 💰 **Contratos electrónicos al instante** — ejecución financiera, adjudicaciones y proveedores sin salir del dashboard.
   - 👥 **Para todo tu equipo** — búsquedas y alertas por integrante.
3. **CTA final** — replicando el patrón de citas (banda de conversión con llamada a la acción).
4. **Head/JSON-LD** — bloque `Service` con el nombre del servicio.

## Riesgos y mitigaciones

| Riesgo | Probabilidad | Mitigación |
|--------|--------------|------------|
| Raíz `index.html` desactualizada (ya sin servicio citas) puede generar código duplicado/divergente | Media | Alcance explícito: no sincronizarla en este cambio; se trata como decisión separada (ver sección siguiente) |
| Olvidar una clave i18n en ES o EN (`nav.secop2`, `card4.*`, `secop2.*`) rompe el switch de idioma | Media | Checklist de claves en la fase task/apply; validar manualmente el switch ES/EN en página y card |
| JSON-LD `Service` duplicado a mano (sin generador) | Baja | Copiar bloque del servicio citas adaptando `name`/`description`; revisar en el diff |
| Ausencia de tests automatizados: errores silenciosos no detectados por CI | Media | Puerta de validación manual: `npx vite build` sin errores + chequeo visual en `dist/` |
| No registrar la entrada en `vite.config.js` ⇒ la página no se compila | Media | `servicio-secop2.html` es dependencia de `vite.config.js`; validar que el archivo exista en `dist/` |

## Rollback Plan

El cambio es aditivo sobre contenido HTML estático. Para revertir: eliminar el archivo `src/servicio-secop2.html`, quitar la entrada `secop2` del `rollupOptions.input` de `vite.config.js`, borrar la 4.ª `.servicio-card` y el link del dropdown, restaurar el subtítulo a "Tres/Three" líneas y revertir las claves i18n añadidas. Como es contenido, no hay datos ni migración que conservar; `git revert` / descartar commit restaura el estado.

## Dependencies

- Ninguna externa. Vite 8 ya está configurado para `index.html`, `servicio-asistentes.html`, `servicio-automatizacion.html` y `servicio-citas.html`.

## Decisión sobre la raíz `index.html`

La `index.html` de la raíz es un **archivo HTML plano y desacoplado** del build: `vite.config.js` apunta sus entradas a `src/`, por lo que la raíz **no se compila ni se sirve desde el build** (no forma parte de `dist/`). Además ya está desactualizada: ni siquiera contiene el servicio de citas que sí está en `src/`. Mantenerla sincronizada manualmente duplicaría esfuerzo y crearía una fuente de verdad divergente del resto del sitio.

**Recomendación**: tratar la sincronización (o descarte/eliminación) de la raíz `index.html` como un **cambio aparte, fuera de alcance** de `servicio-secop2`. No bloquear este servicio por ella. En adelante, cualquier decisión sobre esa raíz (eliminarla, definirla como template obsoleto o sincronizarla) debe evaluarse en un cambio dedicado, documentado y con su propia propuesta.

## Success Criteria (criterios de éxito — sin tests automatizados)

- [ ] `npx vite build` finaliza **sin errores**.
- [ ] La 4.ª `.servicio-card` (SECOP II) aparece en `#servicios` de `src/index.html`, en posición correcta y siguiendo el patrón de `data-i18n` / `data-aos` / `data-tilt`.
- [ ] El subtítulo de la sección muestra "Cuatro líneas" (ES) y "Four" (EN).
- [ ] El dropdown de Servicios muestra el link SECOP II apuntando a `servicio-secop2.html`.
- [ ] `dist/servicio-secop2.html` existe tras el build y carga correctamente en el navegador (hero, bloques, CTA, partials navbar/footer).
- [ ] El switch ES/EN funciona en `servicio-secop2.html` y en la card del home (todas las claves traducidas, sin textos sin traducir).
- [ ] La página incluye el bloque JSON-LD `Service` válido.
