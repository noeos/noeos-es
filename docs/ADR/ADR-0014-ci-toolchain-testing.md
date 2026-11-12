# ADR-0014: Toolchain, CI y checks de GitHub

- **Estado:** Aceptado
- **Fecha:** 2026-11-12
- **Decisores:** Noeos
- **Depende de:** ADR-0004, ADR-0005, ADR-0007, ADR-0009 y ADR-0013

## Contexto

El proyecto necesita una forma reproducible de trabajar localmente y de comprobar cada cambio antes de integrarlo. Las reglas de formato, análisis estático, semántica de pruebas y revisión visual están en ADR-0009. Este ADR decide cómo fijar las herramientas, automatizar esos checks con GitHub Actions, proteger las ramas y ejecutar pruebas sin añadir infraestructura que el comportamiento actual todavía no necesita.

El checkout estaba en reconstrucción y no tenía código de aplicación, `package.json` ni workflows. Este ADR define la inicialización aplicada al toolchain y la configuración de CI para el repositorio de GitHub.

## Decisión

### Toolchain reproducible

- Se mantienen Astro, TypeScript estricto, Tailwind CSS y npm conforme a los ADR de arquitectura existentes, salvo que un ADR posterior cambie esa decisión.
- El toolchain inicial fija Node.js `24.22.3` en `.node-version` y npm `12.2.2` en `packageManager` y `engines`. `npm ci` aplica el lockfile y `.npmrc` rechaza versiones incompatibles.
- CI lee la misma versión fijada en `.node-version`, no una etiqueta móvil como `latest` o `lts/*`. La versión se revisará al adoptar una nueva LTS, ante avisos de fin de soporte o seguridad, y durante la actualización planificada del toolchain.
- `package-lock.json` se versionará y se actualizará junto con los cambios intencionales de dependencias. CI instalará con `npm ci` para reproducir ese lockfile; las instalaciones locales usarán comandos que respeten el lockfile.
- Las versiones de Astro, TypeScript, lint, formato y pruebas se declaran en los manifiestos y configuración del repositorio. Las actualizaciones se revisarán como cambios y se mantendrán compatibles entre sí.
- El workflow actual ejecuta formato, ESLint, `astro check`, build de producción y `npm audit --audit-level=high`. Las dependencias npm y las acciones se revisan semanalmente mediante Dependabot; esto abre propuestas de actualización, no las integra automáticamente. En el repositorio están activados secret scanning, push protection y las alertas de seguridad de Dependabot.
- Los scripts de `package.json` tienen nombres y propósito estables para ejecución local y CI. Como mínimo, el proyecto expone checks equivalentes a formato sin escritura, lint, diagnósticos/tipos Astro, build de producción y la suite de pruebas existente. Los comandos locales están documentados en README.

### Flujo de integración continua

- GitHub Actions es el proveedor CI inicial. Los workflows viven como código en `.github/workflows/`, son pequeños y tienen nombres estables para que GitHub pueda exigir sus checks.
- Los checks se ejecutan en `pull_request` hacia `main`, `push` a `main` y `merge_group`.
- Los checks requeridos no usarán filtros de rutas que puedan hacer que una pull request no informe el estado esperado. Se evitarán jobs condicionales que se omitan bajo cambios ordinarios; si un job es opcional, no será el único check que proteja la integración.
- El flujo instala la toolchain fijada, ejecuta `npm ci` y los checks definidos por ADR-0009 y la suite disponible. `format:check` no modifica archivos. El build se comprueba sobre el código que se propone integrar.
- El workflow `CI` usa un job estable llamado `quality`, un límite de 15 minutos y cancela ejecuciones obsoletas de la misma referencia. Los fallos se investigarán; no se normalizarán reintentos automáticos indefinidos ni se ocultarán checks fallidos.
- La caché es una optimización, nunca la fuente de verdad. Se invalidará por lockfile y versión de herramienta cuando corresponda, no incluirá secretos y se tratará como entrada no confiable. CI debe seguir siendo correcto con una caché vacía.
- Despliegue y publicación no se mezclarán con checks de pull request. Si más adelante se automatizan, se usarán entornos protegidos, aprobación cuando corresponda y secretos con privilegios mínimos; una pull request no podrá desplegar código no revisado.

### Seguridad de workflows

- Los workflows declararán permisos mínimos explícitos para `GITHUB_TOKEN`; los jobs de lectura no tendrán permisos de escritura.
- Las acciones externas se fijarán a SHA completo e inmutable, con comentario que identifique el tag o release de origen. Las actualizaciones de SHA se revisarán y probarán. Se preferirán acciones oficiales o de mantenedores confiables.
- Los workflows que ejecutan código de pull requests no usarán `pull_request_target` ni otros disparadores privilegiados para ejecutar ese código. No tendrán acceso a secretos de producción ni tokens con permisos de escritura.
- Se limitará la persistencia de credenciales de checkout cuando no se necesite escribir al repositorio. No se interpolarán valores controlables por quien abre una pull request directamente en comandos de shell; se pasarán como entradas y se validarán.
- Artefactos de informes, trazas y capturas se subirán solo cuando ayuden a diagnosticar un fallo, con retención limitada y sin datos personales, secretos o contenido sensible.
- Escaneo de dependencias, secretos y políticas de seguridad se alineará con ADR-0013. Los resultados requerirán triage; un scanner verde no se considerará prueba de seguridad completa.

### Checks de GitHub y protección de rama

- La rama principal se protegerá para recibir cambios mediante pull requests y requerir el check de CI de calidad antes de integrar. Los checks requeridos se seleccionarán por su nombre estable y, si es posible, por la GitHub App que los publica.
- No se permitirá que una condición omitida, workflow filtrado o nombre de job renombrado deje la rama bloqueada indefinidamente o permita integrar código sin validación. Los cambios al workflow de checks se revisarán como cambios de seguridad y disponibilidad del proceso.
- No se exigirán revisores ni aprobaciones humanas para integrar cambios. El proyecto lo mantiene una sola persona y la protección de la rama se basará en los checks automatizados requeridos. Esto no elimina la responsabilidad de quien mantiene el proyecto de decidir qué cambios integrar.
- Las reglas de rama, permisos de Actions y configuración de merge queue son ajustes alojados en GitHub. El estado deseado es exigir los checks automatizados de CI en `main`, mediante pull request y sin aprobaciones ni revisores. El check requerido tendrá el nombre estable `quality`; las aprobaciones requeridas serán cero.
- La regla de protección todavía no está activa: primero el workflow debe formar parte de `main` para que GitHub publique el check requerido. Tras integrar esta inicialización, se configurará la protección de rama y se comprobará que un PR solo pueda integrarse cuando `quality` pase. Los workflows por sí solos no activan esta protección.

### Estrategia de pruebas

- Las pruebas protegerán comportamiento observable, reglas de negocio, casos límite o contratos que podrían romperse. No se crearán pruebas vacías ni se perseguirá un porcentaje global de cobertura.
- La prueba unitaria se usará para lógica aislable no trivial, transformaciones, validación y estados límite. La integración se usará cuando importe la cooperación entre componentes o dependencias. Para páginas Astro se podrá renderizar y comprobar el HTML resultante cuando eso pruebe una regla útil.
- Las pruebas end-to-end se añadirán cuando existan flujos públicos importantes que deban protegerse, como navegación localizada, cambio de idioma, formulario o interacción central. Se usará Playwright como primera opción de navegador por su integración documentada con Astro y CI, salvo que una necesidad concreta justifique otra herramienta.
- La suite E2E empezará con los flujos críticos y un navegador en CI. Se ampliará a motores, viewports o dispositivos adicionales si los requisitos de compatibilidad y los defectos observados lo justifican. Emulación móvil no sustituye una inspección en un dispositivo real cuando esta sea necesaria.
- Las pruebas serán independientes, repetibles y evitarán depender de servicios externos inestables. Datos, reloj, red y entorno se controlarán cuando afecten al resultado.
- Los cambios visuales, de movimiento o accesibilidad seguirán requiriendo revisión manual en navegador a los tamaños, estados y preferencias relevantes según ADR-0009. Las capturas o pruebas automáticas son evidencia complementaria, no sustituto.
- En CI se conservarán, con retención acotada, los informes y trazas que faciliten diagnosticar una falla. Los snapshots visuales solo se adoptarán si existe un proceso claro para revisar sus cambios y evitar aceptar diferencias a ciegas.

### Revisión y mantenimiento del proceso

- Cada cambio que altere configuración, dependencias, workflows, comandos o pruebas comprobará que la ejecución local y CI siguen coherentes.
- En la revisión final se indicará qué checks se ejecutaron, cuáles no estaban disponibles o no aplicaban, y el resultado de cada uno. No se declarará una suite aprobada si no se ejecutó.
- Se revisarán periódicamente toolchain, Node LTS, dependencias, actions y avisos del proveedor. Las actualizaciones tendrán un cambio identificable, revisión del diff y validación de los checks afectados.

## Consecuencias

- El proyecto tendrá un camino reproducible desde una instalación limpia hasta checks locales y de CI.
- Los checks requeridos protegerán la rama principal solo después de configurar las reglas correspondientes en GitHub; la presencia de un workflow en el repositorio no activa por sí misma la protección.
- El coste de CI crecerá junto con comportamientos reales. No se instalarán frameworks de prueba o navegadores hasta que exista una necesidad que proteger.
- Los cambios en Node, Actions, GitHub y herramientas serán revisables, porque sus ciclos de soporte y políticas cambian con el tiempo.

## Referencias

- [Node.js release schedule](https://nodejs.org/en/about/previous-releases)
- [Astro: testing](https://docs.astro.build/en/guides/testing/)
- [Playwright: continuous integration](https://playwright.dev/docs/ci)
- [GitHub Actions: secure use reference](https://docs.github.com/en/actions/reference/security/secure-use)
- [GitHub Actions: dependency caching and security](https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching)
- [GitHub: required status checks](https://docs.github.com/en/pull-requests/reference/status-checks)
- [GitHub: protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub: troubleshooting required checks and merge queues](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks)
