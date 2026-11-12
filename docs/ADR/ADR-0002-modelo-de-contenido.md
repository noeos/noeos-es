# ADR-0002: Modelo de contenido

- **Estado:** Aceptado
- **Fecha:** 2026-10-26
- **Decisores:** Noeos

## Contexto

La web corporativa tendrá pocas páginas, principalmente Inicio, Servicios y Contacto, además de las páginas que se decidan más adelante. El contenido lo mantendrá un desarrollador que puede editar el código del sitio.

## Decisión

- No se incorporará un CMS.
- Las páginas corporativas se compondrán como páginas y componentes Astro, manteniendo libertad de diseño y contenido.
- El texto de interfaz y las traducciones se organizarán por idioma en el código del proyecto.
- Se añadirán Content Collections de Astro solo si aparecen grupos de contenido repetido con una estructura común, como casos de trabajo o artículos.

## Consecuencias

- Los cambios de contenido se revisarán y publicarán mediante el flujo normal de cambios del repositorio.
- No se añade ahora infraestructura editorial, base de datos ni dependencia de un proveedor CMS.
- Si más adelante se crea contenido repetible, se definirá su esquema y validación en una colección en ese momento.
