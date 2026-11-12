# ADR-0003: Interactividad y animación

- **Estado:** Aceptado
- **Fecha:** 2026-10-26
- **Decisores:** Noeos

## Contexto

La web será corporativa y tendrá pocas páginas, pero debe ofrecer una experiencia visual elaborada, interactiva y cuidada. La generación estática del contenido no debe limitar el diseño ni el movimiento de la experiencia.

## Decisión

- Astro generará las páginas y su HTML. Se utilizará TypeScript en modo estricto para la lógica del sitio y Tailwind CSS 4, integrado mediante el plugin de Vite, para construir la interfaz. Se añadirá CSS propio y SVG cuando permitan expresar mejor el diseño.
- La salida será estática mientras no exista una necesidad concreta de renderizado por petición o backend propio.
- Las interacciones pequeñas y las animaciones vivirán en componentes Astro con scripts de cliente en TypeScript.
- Se podrá incorporar GSAP y ScrollTrigger cuando una secuencia de animación o interacción ligada al scroll lo justifique; no serán dependencias iniciales por defecto.
- React podrá incorporarse en una isla concreta si aparece una interacción con estado y complejidad que justifique un framework de interfaz, o si se integra un componente externo complejo cuyo contrato dependa de React. No se usará React para estructurar contenido ni para animaciones sencillas que Astro y CSS resuelvan con claridad.
- El contenido principal será legible desde la primera carga. Las animaciones respetarán `prefers-reduced-motion`, el teclado y el desplazamiento natural.

## Consecuencias

- La web podrá tener movimiento y controles sofisticados sin convertir todas sus páginas en una aplicación cliente.
- Cada dependencia de cliente deberá responder a una necesidad identificable y mantenerse aislada en el componente que la requiera.
- Un efecto global basado en React se montará como una isla aislada; el documento, las rutas y el contenido seguirán generándose con Astro.
- Si se necesita contenido por usuario, datos en tiempo real o escritura en servidor, se revisará la decisión de salida estática mediante un ADR.
