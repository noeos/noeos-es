# ADR-0001: Internacionalización de la web

- **Estado:** Aceptado
- **Fecha:** 2026-10-26
- **Decisores:** Noeos

## Contexto

La web corporativa se publicará inicialmente en español y en inglés. Debe ser posible añadir otros idiomas si las necesidades de Noeos lo requieren.

## Decisión

- El inglés será el idioma principal de la web.
- El español estará disponible desde el lanzamiento inicial.
- Las rutas sin prefijo mostrarán contenido en inglés; las rutas españolas usarán el prefijo `/es/`.
- La estructura del proyecto permitirá incorporar idiomas adicionales sin rehacer la arquitectura de páginas.

## Consecuencias

- El contenido y la navegación deberán contemplar versiones en español e inglés.
- La configuración de Astro utilizará sus capacidades de internacionalización (i18n).
- Astro utilizará inglés como locale predeterminado y no añadirá prefijo a sus rutas.
- El español tendrá prefijo `/es/` y conservará sus slugs localizados, como `/es/servicios/` y `/es/contacto/`.
