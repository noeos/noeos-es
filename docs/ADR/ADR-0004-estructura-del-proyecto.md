# ADR-0004: Estructura del proyecto

- **Estado:** Aceptado
- **Fecha:** 2026-10-26
- **Decisores:** Noeos
- **Depende de:** ADR-0001, ADR-0002 y ADR-0003

## Contexto

El sitio tendrá pocas páginas, estará disponible inicialmente en español e inglés y se implementará con Astro. La estructura debe mantener claras las rutas, las traducciones, los elementos compartidos y las piezas visuales propias de cada página, sin crear capas o directorios que todavía no tengan una función.

## Decisión

La estructura inicial será:

```text
.
├── docs/
│   ├── README.md
│   └── ADR/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── sections/
│   │   └── ui/
│   ├── i18n/
│   │   ├── es.ts
│   │   ├── en.ts
│   │   ├── index.ts
│   │   └── routes.ts
│   ├── layouts/
│   │   └── SiteLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── services/index.astro
│   │   ├── contact/index.astro
│   │   ├── es/index.astro
│   │   ├── es/servicios/index.astro
│   │   └── es/contacto/index.astro
│   └── styles/
│       └── global.css
├── .node-version
├── astro.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

### Reglas de organización

- `src/pages/` contiene solo las rutas públicas de Astro. Las rutas inglesas serán las rutas por defecto (`/`, `/services/`, `/contact/`); las españolas usarán el prefijo `/es/` (`/es/`, `/es/servicios/`, `/es/contacto/`).
- La composición de páginas que se comparte entre idiomas vivirá en `src/components/pages/`. Los archivos de `src/pages/` serán entradas de ruta que seleccionan idioma y vista.
- `src/i18n/` contendrá los diccionarios tipados y el mapa de rutas equivalentes entre idiomas. El idioma predeterminado será `en`; `es` tendrá prefijo de URL. Se usará el enrutamiento i18n integrado de Astro y se podrá añadir un directorio y diccionario al sumar un idioma.
- `src/components/layout/` contendrá cabecera, pie, navegación y otros elementos globales. `src/components/ui/` contendrá controles visuales reutilizables. `src/components/sections/` contendrá secciones compartidas entre vistas. Cada componente tendrá una única ubicación según su responsabilidad.
- Los elementos exclusivos de una sola página pueden colocarse junto a la página en un directorio con prefijo `_` para que Astro no los convierta en rutas. Se preferirá esta opción si mejora la proximidad sin duplicar vistas localizadas.
- `src/layouts/` contendrá las estructuras de documento compartidas, como el layout principal y la gestión común de metadatos.
- `src/styles/global.css` contendrá Tailwind y estilos realmente globales y tokens de diseño. Los estilos específicos irán en el componente Astro correspondiente o en módulos de estilo de alcance limitado; se evitará concentrar todos los estilos de página en un único archivo global.
- `src/assets/` será para imágenes e iconos importados y procesados durante el build. `public/` será solo para archivos que deban servirse sin procesamiento, como favicon, `robots.txt` y manifiesto.
- Los scripts de navegador se mantendrán dentro del componente que los utiliza. La lógica compartida se extraerá a un módulo cuando haya más de un consumidor.
- No se crearán `src/content/`, infraestructura de CMS, carpetas de pruebas ni capas de datos vacías hasta que una necesidad definida las justifique. Si se incorpora contenido repetido, se añadirá una Content Collection con esquema tipado.
- Las dependencias se gestionarán con npm y se versionará `package-lock.json`. `.node-version` fijará la versión LTS de Node elegida al inicializar el proyecto.
- El árbol representa la organización objetivo, no una obligación de crear directorios vacíos: cada subdirectorio se añadirá junto con su primer archivo real.

## Consecuencias

- Cada archivo de ruta corresponde a una URL; las vistas, traducciones y elementos compartidos permanecen separados de esas rutas.
- Los dos idiomas usan las mismas vistas y estructura visual, con textos y slugs localizados.
- Los assets pasan por el build cuando interesa su procesamiento; los archivos públicos se copian sin modificación.
- El árbol describe la estructura objetivo. Los directorios opcionales se crearán cuando el primer componente real los necesite, en vez de añadir archivos vacíos.

## Referencias

- [Estructura de proyecto de Astro](https://docs.astro.build/en/basics/project-structure/)
- [Enrutamiento i18n de Astro](https://docs.astro.build/en/guides/internationalization/)
- [Instalación de Tailwind CSS con Astro](https://tailwindcss.com/docs/installation/framework-guides/astro)
