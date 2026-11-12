# ADR-0009: Formato, análisis estático y pruebas

- **Estado:** Aceptado
- **Fecha:** 2026-10-26
- **Decisores:** Noeos
- **Depende de:** ADR-0005, ADR-0006, ADR-0007 y ADR-0008

## Contexto

La revisión manual es necesaria, pero no debería gastar atención en diferencias de formato ni en errores que un chequeo reproducible puede detectar. Tampoco todo contenido estático necesita una prueba artificial: las pruebas deben proteger comportamiento real.

## Decisión

- Se configurará Prettier para mantener formato uniforme y para procesar archivos Astro con `prettier-plugin-astro`; `prettier-plugin-tailwindcss` ordenará las utilidades y se colocará al final de la lista de plugins.
- ESLint comprobará problemas de lógica y convenciones estáticas en TypeScript y Astro. Se usará configuración flat y un conjunto recomendado de reglas, sin duplicar con ESLint las reglas de formato que controla Prettier.
- El análisis incluirá comprobación de tipos y diagnósticos Astro mediante `astro check`, además del build de producción.
- Cuando se incorpore comportamiento lógico no trivial, se probarán sus casos principales y límites con pruebas unitarias o de integración. Las pruebas end-to-end protegerán flujos visibles importantes, como la navegación localizada, controles interactivos y formularios cuando existan.
- Los cambios visuales o de movimiento requerirán una revisión en navegador en los tamaños y estados pertinentes, incluida la preferencia de movimiento reducido. Una captura automatizada no reemplazará la inspección de la interfaz.
- No se fijará un porcentaje global de cobertura. Una prueba debe comprobar un resultado útil para la persona usuaria o una regla de negocio, no solo ejecutar líneas ni congelar detalles internos de implementación.
- Una implementación no se considerará terminada hasta revisar el diff y ejecutar las comprobaciones pertinentes disponibles en el proyecto. El informe final distinguirá las comprobaciones ejecutadas de las que no se ejecutaron.

## Consecuencias

- Los scripts de formato, lint, tipado y build, y su ejecución en CI, se definen en ADR-0014. Las pruebas se incorporarán junto al comportamiento que deban proteger.
- La selección de la toolchain, el flujo de CI y los checks requeridos de GitHub se definen en ADR-0014.
- La suite crecerá junto a los comportamientos reales del sitio, sin añadir frameworks o pruebas vacías antes de tener código que proteger.
- Las reglas automáticas harán cumplir errores objetivos; el juicio humano seguirá evaluando la claridad, la semántica y la composición visual.

## Referencias

- [Astro: testing](https://docs.astro.build/en/guides/testing/)
- [Astro: editor y Prettier](https://docs.astro.build/en/editor-setup/)
- [Astro: TypeScript y `astro check`](https://docs.astro.build/en/guides/typescript/)
- [ESLint: archivos de configuración flat](https://eslint.org/docs/latest/use/configure/configuration-files)
- [Prettier: propósito y formato](https://prettier.io/docs/)
- [Google Engineering Practices: qué revisar](https://google.github.io/eng-practices/review/reviewer/looking-for.html)
