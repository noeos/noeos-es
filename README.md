# Noeos — web corporativa

Sitio web corporativo de Noeos. Presenta la empresa, sus servicios de ingeniería de software, sus capacidades y las formas de contacto.

La web debe comunicar una oferta clara y enlazar información técnica verificable sobre los productos y proyectos de Noeos.

## Desarrollo

El sitio se construirá con Astro, TypeScript y Tailwind CSS. La experiencia podrá incluir animación e interactividad refinadas, manteniendo la generación estática y añadiendo JavaScript de forma selectiva.

La web está inicialmente en español e inglés, sin CMS. Consulta [`docs/README.md`](./docs/README.md) y los ADR para conocer las decisiones de arquitectura, contenido e i18n.

SEO, GEO, rendimiento y seguridad se consideran desde cada cambio. Las pautas están en ADR-0010 a ADR-0013. Estas prácticas reducen riesgos y mejoran la calidad, pero no garantizan rankings, indexación, citas generativas, puntuaciones perfectas ni seguridad absoluta.

Google Analytics, Search Console y otras herramientas podrán incorporarse más adelante. Se revisarán sus permisos, configuración, privacidad, impacto en rendimiento y necesidades de consentimiento antes de integrarlas; no forman parte todavía de una instalación activa.

### Desarrollo local

Se requieren Node.js `24.22.3` y npm `12.2.2`, fijados en `.node-version` y `package.json`. Instala las dependencias con `npm ci` y ejecuta `npm run dev` para iniciar Astro.

Los checks locales y de CI son `npm run format:check`, `npm run lint`, `npm run check`, `npm run build` y `npm audit --audit-level=high`. El workflow de GitHub Actions está en `.github/workflows/ci.yml`; Dependabot revisa semanalmente las dependencias npm y las acciones. GitHub tiene activados el análisis y bloqueo de secretos al subir, y las alertas de seguridad de Dependabot. Actions solo permite acciones publicadas por GitHub y fijadas a SHA; `GITHUB_TOKEN` tiene permisos de solo lectura por defecto.

La rama `main` está protegida: cada cambio requiere un pull request y que pase el check `quality`. No se exigen aprobaciones ni revisores; los administradores también quedan sujetos a estas reglas.

La base i18n está activa: `/` sirve inglés y `/es/` español, con sus diccionarios tipados y un selector entre ambas versiones. Por ahora las dos páginas solo muestran “Coming soon”/“Próximamente”; no hay más funcionalidad que probar.

## Licencia

Apache License 2.0. Consulta [`LICENSE`](./LICENSE).
