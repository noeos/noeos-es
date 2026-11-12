# ADR-0010: SEO técnico y editorial

- **Estado:** Aceptado
- **Fecha:** 2026-11-12
- **Decisores:** Noeos
- **Depende de:** ADR-0001, ADR-0002, ADR-0004, ADR-0005 y ADR-0006

## Contexto

La web debe facilitar que los buscadores descubran, rastreen, interpreten e indexen sus páginas, y que las personas entiendan el resultado antes de visitarlo. SEO no es una garantía de posicionamiento: los buscadores controlan el rastreo, la indexación, las señales y la presentación de resultados.

La arquitectura prevista usa Astro y generación estática. Esto permite entregar HTML inicial completo, pero cada ruta, idioma, enlace, recurso y regla de publicación sigue necesitando revisión.

## Decisión

### Contenido y propósito

- Cada página pública tendrá un propósito reconocible, responderá a una necesidad real de su audiencia y aportará información veraz y útil. Se redactará primero para las personas.
- No se crearán páginas, traducciones, variaciones de palabras clave ni datos estructurados cuyo único propósito sea manipular rankings. No se inventarán clientes, resultados, certificaciones, reseñas, ubicaciones, cifras ni experiencia.
- Los términos relevantes se incluirán de forma natural en el título, encabezado principal, texto y enlaces cuando describan de verdad la página. Se evitarán repetición artificial, páginas puerta y contenido duplicado o casi duplicado.
- Cada página tendrá un `h1` descriptivo y una jerarquía de encabezados coherente con el contenido, no con el tamaño visual.

### Rutas, rastreo e indexación

- Las páginas públicas importantes tendrán una URL estable, legible, enlazada desde otras páginas pertinentes y servida con el estado HTTP correcto. Los enlaces internos de navegación serán enlaces HTML con `href` a destinos reales.
- Las rutas canónicas, redirecciones y convención de barra final se definirán de forma coherente al fijar el dominio y la arquitectura. No se publicarán variantes duplicadas accesibles sin una razón documentada.
- El HTML inicial incluirá el contenido principal y los metadatos. JavaScript podrá mejorar la experiencia, pero no será requisito para descubrir el contenido o los enlaces principales.
- `robots.txt` se utilizará para controlar rastreo, no como mecanismo de desindexación. La exclusión de resultados se expresará con `noindex` cuando corresponda y se comprobará que el rastreador pueda acceder a esa directiva. Producción, preview y entornos privados tendrán controles diferenciados para evitar publicar bloqueos o indexar entornos de prueba.
- El sitemap incluirá solo URLs canónicas, públicas, respondidas correctamente e indexables. Se mantendrá consistente con las páginas reales y se actualizará cuando cambien las rutas.
- Los errores 404 tendrán respuesta y contenido de error reales; no se disfrazarán páginas inexistentes como páginas correctas.

### Metadatos y presentación

- Cada ruta e idioma tendrá `<title>` único, conciso y fiel a su contenido, una descripción propia cuando ayude a resumir la página y el atributo `lang` correcto en el documento.
- Canonical, Open Graph y otros metadatos se generarán a partir de una fuente de URL canónica y de datos de página, evitando divergencias entre etiquetas.
- Las etiquetas `hreflang` solo se emitirán para traducciones equivalentes que existan y estén publicadas. El conjunto será recíproco, incluirá la propia versión cuando corresponda y usará códigos válidos de idioma/región. No se enlazará una traducción inexistente ni se usará la detección automática del navegador para ocultar variantes.
- Los cambios de título visibles y metadatos se mantendrán alineados. Se recordará que el buscador puede reescribir títulos y fragmentos.

### Imágenes y datos estructurados

- Las imágenes informativas tendrán texto alternativo breve que describa su función o contenido; las decorativas usarán `alt=""`. Los nombres de archivo serán descriptivos cuando resulte razonable. El texto alternativo no será un campo para acumular palabras clave.
- Se añadirá JSON-LD únicamente cuando exista un tipo compatible y adecuado al contenido visible. Los datos estructurados deben ser correctos, actuales, comprobables y coincidir con lo que ve la persona; no se añadirán propiedades inventadas para obtener resultados enriquecidos.
- Se validará el marcado con herramientas oficiales pertinentes. La validez solo indica elegibilidad técnica: no garantiza que se muestre un resultado enriquecido.

### Revisión en cada cambio

En cada cambio, incluso si es pequeño, quien lo realiza debe evaluar si afecta a:

1. contenido, títulos, encabezados, enlaces, imágenes o metadatos;
2. rutas, estados HTTP, canonicals, `hreflang`, sitemap, `robots.txt` o `noindex`;
3. HTML renderizado, accesibilidad del contenido o capacidad de rastreo;
4. datos estructurados o representación de la organización.

Si el cambio no afecta a SEO, no se añadirán etiquetas o texto artificiales para aparentar una mejora. Si afecta, se comprobará el HTML generado y el destino real; según el alcance, también los enlaces, rutas, sitemap, metadatos o datos estructurados. La revisión final indicará los controles realizados y cualquier punto no aplicable.

### Seguimiento

- Tras disponer del dominio de producción, se verificará la propiedad en Google Search Console y Bing Webmaster Tools con accesos mínimos y tokens tratados como configuración, nunca como secretos incrustados en código público.
- Se enviará y supervisará el sitemap cuando esté disponible. Se revisarán cobertura/indexación, errores de rastreo, consultas, páginas, países y cambios de rendimiento de búsqueda con una cadencia acordada.
- Las herramientas informan sobre observaciones; no sustituyen la revisión de páginas ni garantizan tráfico o posiciones.

## Consecuencias

- La revisión SEO es parte del alcance de cada cambio y no se pospone íntegramente a una auditoría final.
- Las decisiones que dependen de dominio, alojamiento, contenido real o Search Console se completarán cuando esos elementos existan.
- No se promete posición, indexación, resultado enriquecido ni volumen de tráfico. Se promete aplicar y comprobar las prácticas bajo control del proyecto.
- Toda migración de rutas o dominio requerirá un plan explícito de redirecciones, canonicals, sitemap y comprobación posterior.

## Referencias

- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Title links](https://developers.google.com/search/docs/appearance/title-link)
- [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Multilingual and multi-regional sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
- [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Image SEO](https://developers.google.com/search/docs/appearance/google-images)
- [Structured data general guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Search Console getting started](https://support.google.com/webmasters/answer/10267942)
