# Delta for Servicios

Cambio `servicio-secop2`: agrega SECOP II como cuarta línea de servicio en la capability `servicios`. Los requisitos que siguen se añaden al spec canónico de `servicios`.

## ADDED Requirements

### Requirement: Cuarta `.servicio-card` para SECOP II

La sección `#servicios` del home MUST mostrar una 4.ª `.servicio-card` para el servicio SECOP II usando las claves `servicios.card4.*`, con icono SVG inline 48x48, 5 features (`feat1`–`feat5`) y `data-aos-delay="400"`.

#### Scenario: Card SECOP II visible

- GIVEN el home en cualquier idioma
- WHEN la sección `#servicios` se renderiza
- THEN aparece la 4.ª card de SECOP II con 5 features, icono SVG 48x48 y delay de animación 400

### Requirement: Copy curado de la card 4

La card `servicios.card4.*` SHALL usar el copy curado: en ES `title` "SECOP II · Analista Inteligente", en EN "SECOP II · Intelligent Analyst", con `feat1`–`feat5` y `cta` definidos para cada idioma.

#### Scenario: Copy ES/EN de la card

- GIVEN la card 4 en ES
- THEN muestra los textos curados ES
- WHEN se cambia a EN
- THEN muestra los textos curados EN correspondientes

### Requirement: Link SECOP II en el dropdown

El dropdown del navbar MUST incluir un link SECOP II (`nav.secop2`) apuntando a `servicio-secop2.html`.

#### Scenario: Link del dropdown

- GIVEN el dropdown de Servicios
- WHEN se busca SECOP II
- THEN el link `nav.secop2` apunta a `servicio-secop2.html`

### Requirement: Página `servicio-secop2.html`

La página `src/servicio-secop2.html` MUST seguir el patrón service-page: hero de servicio, bloques de contenido (5 áreas: Alertas a tu medida, Expediente completo con OCR, Asistente IA, Contratos electrónicos, Para todo tu equipo), CTA final con WhatsApp, partials navbar/footer/scripts, `head-meta` con `extraCss: service-page.css` y bloque JSON-LD `Service` válido.

#### Scenario: Página completa

- GIVEN el build en `dist/`
- WHEN se abre `servicio-secop2.html`
- THEN muestra hero, 5 bloques, CTA final, partials navbar/footer y JSON-LD `Service` válido

#### Scenario: Bloques mapean features

- WHEN se inspeccionan los bloques de la página
- THEN cada una de las 5 áreas corresponde a un feature de la card

### Requirement: Registro en Vite

La página `servicio-secop2.html` SHALL registrarse en `rollupOptions.input` de `vite.config.js` para que se compile a `dist/`.

#### Scenario: Compilación garantizada

- GIVEN `rollupOptions.input` incluye `secop2`
- WHEN se ejecuta `npx vite build`
- THEN `dist/servicio-secop2.html` existe

### Requirement: Subtítulo "Cuatro líneas"

El subtítulo de la sección `#servicios` MUST mostrar "Cuatro líneas" (ES) y "Four" (EN), reemplazando la versión de tres líneas.

#### Scenario: Subtítulo actualizado

- GIVEN el home en ES
- THEN el subtítulo dice "Cuatro líneas"
- WHEN se cambia a EN
- THEN dice "Four"

### Requirement: Content de la página `secop2.*`

Las claves de página `secop2.*` (hero, bloques y CTA) SHALL estar traducidas al ES y EN usando el copy curado de la propuesta.

#### Scenario: Traducción completa de la página

- GIVEN la página de servicio en ES
- THEN muestra el copy de página curado ES
- WHEN se cambia a EN
- THEN muestra el copy EN, sin textos sin traducir
