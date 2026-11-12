# Noeos — web corporativa

Sitio web corporativo de Noeos. Presenta la empresa, sus servicios de ingeniería de software, sus capacidades y las formas de contacto.

La web debe comunicar una oferta clara y enlazar información técnica verificable sobre los productos y proyectos de Noeos.

## Desarrollo

El sitio se construirá con Astro, TypeScript y Tailwind CSS. La experiencia podrá incluir animación e interactividad refinadas, manteniendo la generación estática y añadiendo JavaScript de forma selectiva.

La web estará inicialmente en español e inglés, sin CMS. Consulta [`docs/README.md`](./docs/README.md) y los ADR para conocer las decisiones de arquitectura, contenido e i18n.

SEO, GEO, rendimiento y seguridad se consideran desde cada cambio. Las pautas están en ADR-0010 a ADR-0013. Estas prácticas reducen riesgos y mejoran la calidad, pero no garantizan rankings, indexación, citas generativas, puntuaciones perfectas ni seguridad absoluta.

Google Analytics, Search Console y otras herramientas podrán incorporarse más adelante. Se revisarán sus permisos, configuración, privacidad, impacto en rendimiento y necesidades de consentimiento antes de integrarlas; no forman parte todavía de una instalación activa.

### Desarrollo local

Se requieren Node.js `24.22.3` y npm `12.2.2`, fijados en `.node-version` y `package.json`. Instala las dependencias con `npm ci` y ejecuta `npm run dev` para iniciar Astro.

Los checks locales y de CI son `npm run format:check`, `npm run lint`, `npm run check`, `npm run build` y `npm audit --audit-level=high`. El workflow de GitHub Actions está en `.github/workflows/ci.yml`; Dependabot revisa semanalmente las dependencias npm y las acciones. GitHub tiene activados el análisis de secretos, su bloqueo al subir y las alertas de seguridad de Dependabot.

La protección de `main` con el check requerido `quality` todavía debe activarse cuando este workflow llegue a la rama remota; no se exigirán aprobaciones ni revisores.

El proyecto tiene ahora el toolchain y la estructura inicial, pero todavía no contiene páginas ni comportamiento de la web. Por eso aún no hay pruebas unitarias o end-to-end; se añadirán junto al comportamiento que deban proteger.

## Licencia

Apache License 2.0. Consulta [`LICENSE`](./LICENSE).
