# Noeos — web corporativa

Sitio web corporativo de Noeos. Presenta la empresa, sus servicios de ingeniería de software, sus capacidades y las formas de contacto.

La web debe comunicar una oferta clara y enlazar información técnica verificable sobre los productos y proyectos de Noeos.

## Desarrollo

El sitio se construirá con Astro, TypeScript y Tailwind CSS. La experiencia podrá incluir animación e interactividad refinadas, manteniendo la generación estática y añadiendo JavaScript de forma selectiva.

La web estará inicialmente en español e inglés, sin CMS. Consulta [`docs/README.md`](./docs/README.md) y los ADR para conocer las decisiones de arquitectura, contenido e i18n.

SEO, GEO, rendimiento y seguridad se consideran desde cada cambio. Las pautas están en ADR-0010 a ADR-0013. Estas prácticas reducen riesgos y mejoran la calidad, pero no garantizan rankings, indexación, citas generativas, puntuaciones perfectas ni seguridad absoluta.

Google Analytics, Search Console y otras herramientas podrán incorporarse más adelante. Se revisarán sus permisos, configuración, privacidad, impacto en rendimiento y necesidades de consentimiento antes de integrarlas; no forman parte todavía de una instalación activa.

### Estado del entorno de desarrollo

El repositorio está en fase de reconstrucción y actualmente conserva la documentación, sin código de aplicación ni dependencias instaladas. La versión de Node.js, los comandos y las comprobaciones disponibles se fijarán al inicializar de nuevo el proyecto; hasta entonces no hay comandos de desarrollo ejecutables.

## Licencia

Apache License 2.0. Consulta [`LICENSE`](./LICENSE).
