# ADR-0007: Calidad de componentes Astro y TypeScript

- **Estado:** Aceptado
- **Fecha:** 2026-10-26
- **Decisores:** Noeos
- **Depende de:** ADR-0003 y ADR-0004

## Contexto

Astro permite construir páginas y componentes HTML sin runtime de cliente por defecto, y añadir scripts de navegador o islas solo donde haya interactividad. TypeScript ayuda a definir contratos, pero pierde su valor si el código lo silencia continuamente con tipos permisivos o afirmaciones sin comprobar.

## Decisión

- Los componentes Astro nativos serán la forma predeterminada de construir páginas, layouts, secciones y controles. El código de renderizado no enviará JavaScript al cliente salvo que se añada un `<script>` o una isla explícita.
- Cada componente con props declarará un `Props` tipado con las propiedades que acepta. Los datos de traducción y variantes de interfaz usarán tipos compartidos para detectar desajustes entre idiomas.
- TypeScript se mantendrá en modo `strict`. Se evitará `any`; cuando un valor sea desconocido se usará `unknown` y se estrechará mediante comprobaciones antes de utilizarlo.
- Las aserciones `as`, el operador `!`, `@ts-ignore` y `@ts-nocheck` no serán atajos para silenciar errores. Si una limitación real de una biblioteca exige una excepción, será local y explicará por qué es segura y qué garantía la respalda.
- Se usarán `import type` para importar tipos y uniones discriminadas o comprobaciones exhaustivas cuando representen estados finitos.
- Los scripts de cliente permanecerán cerca del componente que gobierna el comportamiento. Se extraerán módulos compartidos solo cuando exista reutilización o una separación clara que mejore las pruebas y la lectura.
- Los componentes se extraerán por responsabilidad o reutilización real, no solo para dividir archivos largos. Las props describirán variantes explícitas y no se construirán nombres de clase o comportamientos ambiguos mediante cadenas arbitrarias.
- React solo se añadirá a una isla cuando una interacción con estado complejo justifique el framework; no se introducirá para estructurar contenido Astro ni para animaciones por sí solas.

## Consecuencias

- `astro check` formará parte de las comprobaciones del proyecto porque `astro build` transpila TypeScript, pero no realiza por sí solo toda la comprobación de tipos.
- Las excepciones de tipos requerirán una explicación revisable en lugar de quedar ocultas.
- El código de servidor/build y el código enviado al navegador tendrán límites claros dentro de cada componente.

## Referencias

- [Astro: componentes](https://docs.astro.build/en/basics/astro-components/)
- [Astro: TypeScript](https://docs.astro.build/en/guides/typescript/)
- [Astro: scripts de cliente](https://docs.astro.build/en/guides/client-side-scripts/)
- [TypeScript: Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
