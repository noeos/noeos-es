# ADR-0011: Visibilidad en buscadores generativos (GEO)

- **Estado:** Aceptado
- **Fecha:** 2026-11-12
- **Decisores:** Noeos
- **Depende de:** ADR-0001, ADR-0002, ADR-0005, ADR-0006 y ADR-0010

## Contexto

GEO se usa para describir prácticas orientadas a que contenido pueda ser descubierto, recuperado, comprendido, citado o mencionado por experiencias de búsqueda generativa y asistentes. No existe un estándar universal de GEO ni un mecanismo que controle las respuestas de esos sistemas. Sus rastreadores, índices, fuentes, modelos, políticas y métricas son distintos y cambian con rapidez.

La orientación oficial de Google para sus funciones generativas mantiene como base las prácticas SEO, contenido útil y original, y requisitos normales de indexación. Google declara que no necesita `llms.txt`, marcado especial, fragmentación artificial ni lenguaje escrito para una IA. Investigación académica sobre GEO explora estrategias en condiciones experimentales; sus resultados no garantizan efectos transferibles o duraderos en plataformas reales.

## Decisión

### Principios

- La prioridad será publicar información original, exacta, útil y atribuible a conocimiento o experiencia real de Noeos. No se inventarán autoridad, citas, credenciales, clientes ni resultados.
- SEO técnico, accesibilidad, HTML semántico y contenido claro son la base compartida de GEO. GEO no justifica duplicar el contenido ni crear una capa técnica paralela sin una necesidad verificada.
- Las páginas importantes expondrán en HTML inicial información suficiente para identificar quién es Noeos, qué ofrece, para quién, con qué alcance y cómo contactar, en la medida en que esos datos estén confirmados.
- La identidad y los datos verificables del negocio se expresarán de forma coherente entre páginas, idiomas, metadatos, perfiles oficiales y datos estructurados. No se publicarán datos locales o de empresa que no estén confirmados.

### Redacción y estructura

- Cada página responderá con claridad a su propósito. Se usarán títulos, listas, tablas, definiciones y pasos cuando ayuden a entender información real, no para forzar una forma que supuestamente agrade a un modelo.
- Las afirmaciones importantes serán específicas, comprobables y acompañadas de contexto o fuentes cuando corresponda. Se distinguirán hechos, opinión, hipótesis y promesas comerciales.
- Se preferirá el vocabulario que usaría la audiencia y se explicarán los términos propios. No se repetirán consultas, entidades o frases clave de forma mecánica.
- No se impondrá una longitud ideal, estructura de preguntas y respuestas, número de citas ni frecuencia de actualización. La extensión dependerá de lo necesario para responder bien.
- El contenido traducido mantendrá significado y precisión en cada idioma; no se publicará texto parcialmente traducido que pueda confundirse con una versión completa.

### Técnicas descartadas sin evidencia específica

- No se añadirán `llms.txt`, archivos Markdown para bots, schema especial para GEO, “AI keywords”, contenido oculto, cloaking, páginas puerta ni bloques de texto escritos únicamente para ser extraídos por IA, salvo que un sistema concreto y una necesidad verificable justifiquen una decisión documentada.
- Los datos estructurados seguirán ADR-0010: deben describir contenido visible y verdadero. No se marcarán reseñas falsas ni afirmaciones no demostrables.
- No se comprarán menciones ni enlaces ni se generarán publicaciones masivas, comentarios o páginas mediante automatización para simular autoridad. La difusión externa debe ser legítima y aportar valor por sí misma.
- No se modificarán las respuestas servidas según user-agent para engañar a usuarios o crawlers.

### Revisión en cada cambio

En cada cambio, incluso si es pequeño, se evaluará si altera:

1. claridad, exactitud, originalidad, contexto o atribución del contenido;
2. contenido accesible en el HTML inicial, estructura semántica, navegación o datos de entidad;
3. equivalencia entre idiomas, metadatos o datos estructurados;
4. controles de rastreo o disponibilidad para buscadores y asistentes.

Cuando aplique, se comprobarán las afirmaciones y su correspondencia con el contenido visible. Si el cambio es solo técnico y no altera esos elementos, se anotará como no aplicable en la revisión final; no se añadirán mecanismos GEO artificiales.

### Medición

- Cuando exista acceso a Search Console, se revisarán los informes de búsqueda y, si está disponible para la propiedad, el informe de rendimiento de funciones generativas. Se podrá consultar Bing Webmaster Tools y su informe de rendimiento de IA si la función está disponible.
- Las mediciones externas de menciones o citas se tratarán como aproximaciones: consultas, ubicación, idioma, cuenta, momento y motor pueden cambiar la respuesta. Si se hace un seguimiento manual, se registrarán esas condiciones y se repetirán muestras antes de inferir tendencias.
- No se automatizarán scraping de resultados ni solicitudes que infrinjan las condiciones del servicio. No se considerará una mención aislada como prueba de visibilidad estable.
- Las herramientas de terceros no se tratarán como poseedoras de métricas internas de plataformas. Sus recomendaciones se contrastarán con fuentes oficiales y evidencia observable.

## Consecuencias

- GEO se abordará como una extensión de calidad, claridad y descubribilidad, no como una promesa de posicionamiento o citación.
- La orientación de cada plataforma puede divergir. Las prácticas generales se adoptan con cautela y las específicas requieren fuente, fecha y reevaluación periódica.

## Referencias

- [Google: Optimizing for generative AI features in Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: Search Essentials and spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google Search Console: performance reports](https://support.google.com/webmasters/answer/7576553)
- [Bing Webmaster Tools: AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
- [Aggarwal et al., GEO: Generative Engine Optimization, KDD 2024](https://arxiv.org/abs/2311.09735) — investigación experimental, no norma ni garantía de resultados.
