# Instrucciones de desarrollo

Antes de modificar el proyecto:

1. Lee `README.md`, `docs/README.md`, la estructura acordada en ADR-0004, los ADR aplicables y los ADR-0010 a ADR-0014.
2. Determina el comportamiento esperado y el alcance del cambio. Si una decisión de producto o diseño no está definida, pregunta antes de inventar una solución que la condicione.
3. Sigue los patrones ya aceptados. Propón primero los cambios más pequeños que resuelvan el objetivo.

Al escribir o revisar código:

- Aplica los principios de calidad de ADR-0005 y la semántica de ADR-0006.
- Prefiere componentes Astro y TypeScript estricto. Evita `any`, supresiones de tipos y abstracciones especulativas según ADR-0007.
- Aplica los tokens y convenciones de Tailwind/CSS de ADR-0008.
- Mantén cada diff centrado en el objetivo; no incluyas refactorizaciones ajenas.
- Revisa el diff en contexto y comprueba que el cambio cumple su objetivo, mantiene la claridad y sigue las convenciones del proyecto.
- Ejecuta comprobaciones cuando el encargo o las instrucciones aplicables pidan validación y comunica con precisión cuáles se ejecutaron y sus resultados. No afirmes que algo se verificó si no se ejecutó.
- Si el cambio altera comportamiento, rutas, interacciones o estructura de accesibilidad, incluye la cobertura apropiada según ADR-0009 cuando el alcance de la tarea lo permita.
- En cada cambio, aunque sea de una sola línea, evalúa expresamente el impacto en SEO, GEO, rendimiento y seguridad según ADR-0010 a ADR-0013. Aplica los controles pertinentes, evita cambios artificiales cuando un área no resulte afectada y resume en la revisión final qué áreas aplicaron y qué comprobaciones se realizaron.

## Decisiones registradas

Consulta [`docs/README.md`](./docs/README.md) para el índice de ADRs. Si una tarea requiere cambiar una decisión aceptada, actualiza primero el ADR correspondiente y explica el motivo del cambio.
