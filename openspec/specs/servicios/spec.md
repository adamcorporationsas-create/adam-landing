# Servicios Specification

## Purpose

La capability `servicios` cubre la landing de servicios de ADAM: la sección `#servicios` del home, el dropdown de navegación y las páginas de detalle por servicio. Compila HTML estático con Vite hacia `dist/`. Los servicios vigentes son cuatro: asistentes, automatización, citas y SECOP II (`secop2`).

## Requirements

### Requirement: Sección `#servicios` del home

La sección `#servicios` del home (`src/index.html`) MUST listar los 4 servicios —asistentes, automatización, citas y SECOP II— como `.servicio-card`, cada uno con un SCORE correspondiente.

#### Scenario: Lista completa de servicios

- GIVEN un usuario abre el home
- WHEN la sección `#servicios` se renderiza
- THEN aparecen exactamente 4 `.servicio-card` (asistentes, automatización, citas, secop2)

### Requirement: Dropdown de navegación

El dropdown de Servicios del partial `navbar.ejs` MUST enlazar los 4 servicios por su URL de detalle (`.html`).

#### Scenario: Links del dropdown

- GIVEN un usuario abre el dropdown de Servicios
- WHEN selecciona un servicio
- THEN el link apunta a la página de detalle correcta (ej. `servicio-secop2.html`)

### Requirement: Subtítulo de la sección

El subtítulo de la sección `#servicios` MUST decir "Cuatro líneas de servicio" (ES) y "Four service lines" (EN).

#### Scenario: Subtítulo por idioma

- GIVEN el home cargando en ES
- THEN el subtítulo muestra "Cuatro líneas de servicio"
- WHEN se cambia a EN
- THEN muestra "Four service lines"

### Requirement: Traducción ES/EN de servicios

Cada `.servicio-card` y cada página de servicio SHALL tener todas sus claves traducidas en ES y EN; ninguna clave puede quedar sin traducción.

#### Scenario: Switch de idioma

- GIVEN la card o página de un servicio
- WHEN el usuario alterna ES→EN (y viceversa)
- THEN todas las claves de texto se actualizan y ninguna queda sin traducir

### Requirement: Páginas de detalle de servicio

Cada página de detalle MUST existir en `dist/` tras el build y seguir el patrón service-page: hero, bloques, CTA final y partials navbar/footer.

#### Scenario: Compilación y patrón

- GIVEN `npx vite build` sin errores
- THEN `dist/` contiene cada página de servicio (hero, bloques, CTA, partials navbar/footer)

### Requirement: Claves i18n

El sistema i18n (`src/js/i18n.js`) DEBE incluir las claves `servicios.cardN.*` por servicio, `nav.*` para el navbar y un bloque de página por servicio, en ES y EN.

#### Scenario: Claves completas

- GIVEN las claves i18n de servicios
- WHEN se inspecciona el entorno ES y EN
- THEN existen `servicios.cardN.*`, `nav.*` y el bloque de página por servicio en ambos idiomas
