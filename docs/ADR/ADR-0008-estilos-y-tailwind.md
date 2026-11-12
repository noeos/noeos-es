# ADR-0008: Estilos y uso de Tailwind CSS

- **Estado:** Aceptado
- **Fecha:** 2026-10-26
- **Decisores:** Noeos
- **Depende de:** ADR-0004

## Contexto

La web necesita composición visual personalizada y puede tener animaciones complejas. Tailwind aporta utilidades y tokens, mientras que CSS sigue siendo necesario para recursos gráficos, movimiento y reglas que no se expresan con claridad como utilidades.

## Decisión

- Tailwind CSS será el mecanismo principal para layout, espaciado, tipografía y estados de componentes.
- Los valores compartidos de diseño se definirán como tokens en el tema CSS de Tailwind.
- Los nombres de clase Tailwind aparecerán completos en el código fuente. Las variantes condicionales usarán mapas de valores completos o las directivas de clase de Astro; no se concatenarán fragmentos de nombres que Tailwind no pueda detectar.
- Prettier ordenará automáticamente las clases Tailwind con el plugin oficial de Tailwind, colocado después del plugin Astro en su configuración.
- CSS propio se utilizará para estilos globales, composiciones gráficas, selectores complejos y animaciones donde produzca una solución más clara. Las reglas globales no se convertirán en un segundo framework de componentes.
- No se usará `@apply` solo para ocultar listas de utilidades o abreviar markup. Si un patrón visual se repite y tiene comportamiento o semántica propia, se extraerá un componente Astro; `@apply` quedará reservado para una regla breve que realmente se reutilice.
- Se evitarán valores arbitrarios duplicados cuando deban ser tokens o cuando ya exista una utilidad equivalente. Los valores únicos necesarios para una composición editorial podrán expresarse localmente.
- Se evitará CSS global que dependa de la estructura accidental de páginas ajenas. Cada regla tendrá un alcance y propósito reconocibles.

## Consecuencias

- Los valores de diseño se ajustarán desde tokens, sin búsquedas y reemplazos de valores dispersos.
- La composición puede seguir usando CSS propio sin apartarse de la consistencia de Tailwind.
- El orden de clases y la detección estática reducirán variaciones de estilo y errores de compilación.

## Referencias

- [Tailwind CSS: variables del tema](https://tailwindcss.com/docs/theme)
- [Tailwind CSS: detección de clases](https://tailwindcss.com/docs/detecting-classes-in-source-files)
- [Tailwind CSS: uso de clases de utilidad](https://tailwindcss.com/docs/styling-with-utility-classes)
- [Tailwind CSS: orden automático de clases con Prettier](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)
- [Tailwind CSS: compatibilidad con Astro y estilos de componente](https://tailwindcss.com/docs/compatibility)
