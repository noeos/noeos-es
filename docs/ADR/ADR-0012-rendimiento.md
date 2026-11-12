# ADR-0012: Rendimiento web

- **Estado:** Aceptado
- **Fecha:** 2026-11-12
- **Decisores:** Noeos
- **Depende de:** ADR-0003, ADR-0004, ADR-0005, ADR-0007, ADR-0008 y ADR-0009

## Contexto

El rendimiento influye en la experiencia, la accesibilidad en redes y dispositivos diversos y la capacidad de completar tareas. No hay una optimización única ni una puntuación de laboratorio que demuestre por sí sola la calidad real. Se necesita evaluar cada cambio desde el diseño y complementar mediciones de laboratorio con datos de campo una vez haya tráfico.

La web parte como sitio de contenido con Astro y generación estática. El HTML estático reduce trabajo de cliente, pero imágenes, fuentes, animaciones, scripts, integraciones y configuración del hosting todavía pueden producir cargas lentas, bloqueo, consumo de datos o inestabilidad.

## Decisión

### Objetivos y medición

- Se usarán Core Web Vitals vigentes como objetivos de experiencia, comprobados en el percentil 75 y segmentados por móvil y escritorio cuando los datos permitan hacerlo: LCP ≤ 2,5 s, INP ≤ 200 ms y CLS ≤ 0,1. Se revisará la documentación oficial por si cambia la métrica o sus umbrales.
- Antes de disponer de datos de campo, se usarán pruebas de laboratorio repetibles para detectar regresiones y se declararán sus condiciones (dispositivo, red, navegador, build y herramienta). Lighthouse es diagnóstico, no criterio aislado de aprobación.
- Se establecerá un presupuesto inicial de JavaScript, imágenes y fuentes al tener la primera versión funcional y una línea base. Hasta entonces, cada dependencia o asset nuevo requiere justificar su coste esperado; no se inventarán límites numéricos sin contexto.

### HTML, CSS y JavaScript

- El contenido y las acciones esenciales deben renderizarse y ser utilizables sin esperar a una hidratación global. JavaScript se añade de forma selectiva, con componentes Astro como opción normal.
- Cada dependencia cliente se justificará por una necesidad identificable. Se evitarán cargas duplicadas, bibliotecas pesadas para efectos sencillos, polyfills innecesarios y tareas largas en el hilo principal.
- Los scripts se limitarán a las rutas que los necesiten cuando sea viable. Las tareas costosas se medirán; se evitarán bucles de layout, lecturas/escrituras geométricas intercaladas y listeners u observadores sin limpieza.
- Las animaciones preferirán propiedades que no provoquen recálculo de layout cuando sea posible, evitarán trabajo continuo sin beneficio perceptible y respetarán `prefers-reduced-motion`.
- Se declararán dimensiones o relación de aspecto de medios para reservar espacio y evitar saltos. No se ocultará contenido principal tras efectos, cargadores o animaciones.

### Imágenes, fuentes y recursos

- Se elegirán dimensiones y formatos adecuados al uso. Las imágenes responsivas proporcionarán `srcset`/`sizes` cuando corresponda, se evitará descargar una imagen mucho mayor que su presentación y se usarán componentes/procesamiento de Astro si aportan optimización adecuada.
- Las imágenes fuera de la primera pantalla podrán cargarse de forma diferida. El recurso LCP se mantendrá descubrible en HTML y no se diferirá; `fetchpriority="high"` se reservará para el recurso LCP identificado, no se aplicará indiscriminadamente.
- Fuentes: se limitarán familias, variantes y subconjuntos; se preferirá servir recursos locales cuando sea razonable. `preload` se reservará para fuentes realmente críticas y se evitarán cambios de métricas que provoquen CLS.
- Se evitarán recursos externos innecesarios y se medirán sus dependencias de red, DNS, ejecución y disponibilidad antes de incorporarlos.

### Hosting y caché

- Al elegir alojamiento se comprobarán HTTPS, compresión, caché de HTML y recursos versionados, distribución geográfica y soporte de los headers requeridos. La política concreta se documentará junto a la plataforma de despliegue.
- Los assets con hash pueden tener caché larga e inmutable; el HTML y archivos de control (por ejemplo, sitemap o `robots.txt`) necesitan una estrategia que permita actualizarse. No se aplicará una cabecera sin entender su efecto de invalidación.
- Las optimizaciones específicas del hosting se verificarán en la respuesta desplegada, no solo en configuración local.

### Revisión en cada cambio

En cada cambio, incluso si es pequeño, se evaluará el impacto en:

1. peso y cantidad de recursos transferidos;
2. JavaScript enviado y ejecutado, trabajo del hilo principal e interacción;
3. LCP, estabilidad visual, carga de fuentes e imágenes;
4. animación, listeners, observadores y rendimiento en móvil;
5. caché, compresión y configuración de hosting cuando se modifique.

Los cambios con impacto medible en recursos, renderizado o interacción tendrán comparación antes/después en una condición de laboratorio equivalente. Cambios sin efecto de rendimiento material se marcarán como no aplicables en la revisión. Se evitará optimizar cifras a costa del propósito, calidad visual, accesibilidad o seguridad.

## Consecuencias

- El rendimiento se trata como requisito de diseño y mantenimiento continuo.
- Los objetivos de campo requieren volumen de tráfico y pueden tardar en reflejar cambios. Se documentarán límites de muestra y de herramienta.
- No se garantiza una puntuación perfecta ni se interpretará un score como un factor único de posicionamiento.

## Referencias

- [Web Vitals](https://web.dev/articles/vitals)
- [Definición de umbrales Core Web Vitals](https://web.dev/articles/defining-core-web-vitals-thresholds)
- [Mejoras eficaces para Core Web Vitals](https://web.dev/articles/top-cwv)
- [Experiencia de página en Google Search](https://developers.google.com/search/docs/appearance/page-experience)
- [Astro: imágenes](https://docs.astro.build/en/guides/images/)
- [Astro: fuentes](https://docs.astro.build/en/guides/fonts/)
- [Astro: scripts de cliente](https://docs.astro.build/en/guides/client-side-scripts/)
