# Tasks: Aplicar Fixes de Judgment Day

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~15 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | PR | Notes |
|------|------|----|-------|
| 1 | prefers-reduced-motion CSS + opcional form fallback | PR 1 | scope mínimo, < 50 lines |

## Phase 1: CSS Accessibility — prefers-reduced-motion

- [ ] 1.1 Agregar bloque `@media (prefers-reduced-motion: reduce)` en `css/animations.css` para anular globalmente animaciones, transiciones y transformaciones cuando el usuario prefiere movimiento reducido. Cubrir `*`, `*::before`, `*::after`, `[data-aos]`, `.whatsapp-float`.
  - Verificación: DevTools → Rendering → `prefers-reduced-motion: reduce` → confirmar que ninguna animación se ejecuta

## Phase 2: Form Fallback (Opcional — Discutir con usuario)

- [ ] 2.1 Evaluar si el endpoint `/ajax/` de FormSubmit en `index.html` debe cambiarse al endpoint estándar (`/` en vez de `/ajax/`). Actualmente si JS falla, el usuario ve JSON crudo en vez de un redirect. Decidir si se justifica el cambio.
  - Nota: No implementar sin aprobación del usuario
