# ADR-0006: HTML semántico y accesibilidad estructural

- **Estado:** Aceptado
- **Fecha:** 2026-10-26
- **Decisores:** Noeos

## Contexto

Una interfaz puede parecer correcta visualmente y aun así tener una estructura difícil de comprender para personas, lectores de pantalla y herramientas de desarrollo. En HTML, cada elemento expresa un propósito; usar elementos semánticos con significado preciso mejora la navegación y evita que la estructura se convierta en una colección de contenedores opacos.

## Decisión

- Se elegirá primero el elemento HTML que describe el contenido o la acción: `main`, `header`, `footer`, `nav`, `article`, `section`, listas, enlaces, botones y controles de formulario.
- Habrá un único `main` por documento con el contenido principal.
- `article` se reservará para una composición que tenga sentido por sí sola. `section` representará un grupo temático y tendrá un encabezado identificable cuando corresponda.
- `div` se utilizará cuando solo haga falta un contenedor genérico de estilo, layout o agrupación y ningún elemento semántico describa mejor el contenido. No se usará `section` como reemplazo automático de `div`.
- Los enlaces navegarán; los botones ejecutarán acciones. No se crearán controles interactivos solo con `div` o `span`.
- Los encabezados describirán la jerarquía del contenido, no solo su tamaño visual. Las listas usarán `ul`/`ol` y `li` cuando representen una lista real.
- Las imágenes tendrán texto alternativo según su función: descripción concisa si aportan información y `alt=""` si son decorativas. Los controles tendrán nombres accesibles; las entradas de formulario tendrán etiquetas asociadas.
- Se priorizarán los elementos nativos del navegador. ARIA solo se añadirá cuando el HTML nativo no exprese ya el rol, nombre o estado requerido, y no se añadirán roles que contradigan el elemento.
- Todo control y flujo interactivo deberá conservar uso por teclado, foco perceptible y una alternativa comprensible cuando dependa de movimiento.

## Consecuencias

- La estructura y el estado del control deben poder entenderse sin depender de las clases CSS.
- En revisiones se corregirá tanto el uso incorrecto de un elemento como el uso de semántica innecesaria.
- El árbol de accesibilidad y el comportamiento de teclado se considerarán parte de la corrección funcional de la interfaz.

## Referencias

- [WHATWG HTML: secciones y uso de `section`/`div`](https://html.spec.whatwg.org/dev/sections.html)
- [MDN: estructurar documentos](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents)
- [MDN: elemento `section`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
