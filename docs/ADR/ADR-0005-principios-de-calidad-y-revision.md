# ADR-0005: Principios de calidad y revisión del código

- **Estado:** Aceptado
- **Fecha:** 2026-10-26
- **Decisores:** Noeos

## Contexto

El proyecto necesita criterios compartidos para que el código siga siendo correcto, claro, coherente y fácil de mantener a medida que crece. Sin principios explícitos, las decisiones de estilo y estructura pueden variar entre archivos y dificultar la revisión y evolución del sistema.

## Decisión

- La calidad se evaluará por la intención cumplida, el comportamiento correcto, la claridad y el efecto sobre la salud del código, no por quién lo escribió ni por el volumen producido.
- Se preferirá la solución más simple que cumpla los requisitos con claridad. No se añadirán abstracciones, dependencias, capas o capacidad futura sin una necesidad concreta.
- Cada cambio se limitará a una unidad coherente. Refactorizaciones amplias se separarán de los cambios funcionales para mantener el diff fácil de revisar.
- Los nombres comunicarán propósito. Las funciones y componentes tendrán responsabilidades entendibles y límites observables; no se impondrán límites arbitrarios de líneas si no mejoran la lectura.
- Los comentarios explicarán motivos, restricciones o decisiones que no se deduzcan del código. No repetirán línea por línea lo que ya expresa la implementación.
- Se revisarán todas las líneas nuevas y modificadas en contexto. La revisión debe comprobar intención, casos límite, simplicidad, convenciones del repo, documentación afectada y verificaciones ejecutadas.
- La responsabilidad sobre el cambio y su comportamiento permanece en quien lo mantiene. No se declarará correcta una implementación por el mero hecho de que compile.
- No se harán limpiezas o rediseños no solicitados dentro de un cambio funcional. Si aparece una mejora lateral, se propondrá por separado.

## Consecuencias

- El trabajo se dividirá en cambios pequeños que permitan inspeccionar y validar cada decisión.
- Los desacuerdos de estilo se resolverán mediante las convenciones automáticas y estos ADR, no mediante preferencias improvisadas en cada archivo.
- Estos principios cubren calidad del código, semántica, accesibilidad estructural, legibilidad y verificación.

## Referencias

- [Google Engineering Practices: estándar de revisión](https://google.github.io/eng-practices/review/reviewer/standard.html)
- [Google Engineering Practices: cambios pequeños](https://google.github.io/eng-practices/review/developer/small-cls.html)
