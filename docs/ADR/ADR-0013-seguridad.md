# ADR-0013: Seguridad y gestión de riesgos

- **Estado:** Aceptado
- **Fecha:** 2026-11-12
- **Decisores:** Noeos
- **Depende de:** ADR-0003, ADR-0004, ADR-0005 y ADR-0007

## Contexto

La meta es reducir de forma continua la probabilidad y el impacto de vulnerabilidades. Ninguna pauta, escáner, CSP o auditoría puede garantizar que una web esté “blindada”. La seguridad depende también del dominio, DNS, CI, dependencias, proveedor de hosting, cuentas de administración y procedimientos operativos.

La primera versión es una web pública estática, sin autenticación, base de datos ni escritura de datos en servidor. El modelo de riesgo debe actualizarse si se incorporan formularios, funciones serverless, cuentas, APIs, contenido de usuarios, analítica o servicios externos.

## Decisión

### Modelo de amenazas y diseño

- En cada cambio se identificarán datos controlados por usuarios o servicios, límites de confianza, recursos cargados, permisos y nuevos flujos de datos. Si el cambio altera el modelo (por ejemplo, formulario o backend), se documentarán amenazas y mitigaciones antes de implementar.
- Se mantendrá la arquitectura más pequeña que cumpla el objetivo. No se añadirán endpoints, secretos, almacenamiento de datos o dependencias cliente sin una necesidad concreta.
- No se pondrán secretos, tokens de despliegue, credenciales, claves privadas ni datos personales en código, variables `PUBLIC_*`, HTML, repositorio o bundles. Los secretos irán en el gestor de secretos de CI/hosting con privilegios mínimos y rotación cuando haya exposición.
- La generación estática no elimina riesgos de cadena de suministro, XSS, configuración del host, scripts de terceros, exposición accidental de archivos ni compromiso de cuentas.

### Entradas, renderizado y navegador

- Se conservará el escape contextual del framework. No se usará `set:html`, `innerHTML`, `dangerouslySetInnerHTML`, `eval` ni APIs equivalentes con datos no confiables. Si es imprescindible renderizar HTML externo, se definirá sanitización con biblioteca mantenida, allowlist y pruebas específicas.
- Los valores que formen URLs, destinos de redirección, atributos o selectores se validarán según su contexto y protocolo permitido. Se rechazarán protocolos ejecutables como `javascript:` en enlaces proporcionados externamente.
- Cualquier entrada futura (formularios, query params, datos de API) se validará en el servidor con esquema y límites de tamaño/formato; la validación del cliente solo mejora UX y no constituye control de seguridad.
- No se usarán `target="_blank"` sin protección adecuada de `window.opener`; se preferirá comportamiento nativo moderno o `rel="noopener noreferrer"` según el caso.
- SVG y otros formatos activos recibidos de fuentes externas se tratarán como contenido no confiable. No se incorporarán scripts, atributos de evento o referencias inesperadas en SVG inline.
- Los formularios o escrituras en servidor requerirán, según el flujo, protección CSRF, autorización en servidor, límites de tasa, manejo seguro de errores y registro sin datos sensibles. No se confiará en Astro como control suficiente sin verificar el adaptador y el despliegue elegido.

### Dependencias y cadena de suministro

- Toda dependencia nueva tendrá una justificación funcional, revisión de mantenimiento, licencia, superficie de permisos, historial de seguridad, tamaño y alternativas. Se preferirá una dependencia menos si una solución nativa clara es suficiente.
- Se conservará el lockfile y se usarán instalaciones reproducibles en CI (`npm ci` si npm es el gestor elegido). Las actualizaciones se revisarán y probarán como cambios, no se aceptarán a ciegas.
- Se habilitarán comprobaciones periódicas de vulnerabilidades de dependencias y avisos del proveedor. `npm audit` u otra herramienta es una señal, no prueba de ausencia de vulnerabilidades; se evaluará contexto, severidad, exposición y solución.
- No se instalarán paquetes desde fuentes o nombres no verificados ni se elevarán privilegios de scripts de instalación sin entenderlos. Se considerará el riesgo de dependencias transitivas y acciones de CI de terceros.
- CI tendrá permisos mínimos, secretos protegidos por entorno y acciones fijadas a versiones o commits revisados cuando sea viable. Los artefactos públicos no incluirán mapas de fuentes o archivos de configuración sensibles salvo decisión explícita.

### Transporte, headers y CSP

- Producción se servirá exclusivamente mediante HTTPS. HSTS se activará solo cuando dominio, HTTPS, subdominios y estrategia de rollback estén confirmados.
- En el hosting se definirán y comprobarán headers apropiados para la arquitectura: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, una `Referrer-Policy` restrictiva y `frame-ancestors` para impedir framing salvo necesidad aprobada. `Permissions-Policy` se limitará a funciones realmente no usadas y se probará para no romper integraciones.
- CSP se construirá desde los recursos reales de cada página, empezando en modo report-only cuando haga falta descubrir incompatibilidades y pasando a enforcement tras revisar los informes. Se evitarán `unsafe-eval` y `unsafe-inline` salvo excepción documentada, mínima y revisada. CSP es defensa en profundidad, no reemplaza el escape ni la validación.
- El soporte de CSP y headers depende del proveedor. Las pruebas se realizarán en el build de producción y en el entorno desplegado. No se copiará una política genérica ni se declarará protegida una web porque exista una etiqueta meta.
- No se enviarán cabeceras obsoletas como `X-XSS-Protection` como sustituto de CSP.

### Privacidad, analítica e integraciones futuras

- Cada integración de terceros deberá declarar finalidad, datos enviados, cookies/almacenamiento, dominios contactados, impacto en CSP, dependencia de rendimiento y mecanismo de desactivación.
- Google Analytics u otra medición no se incorporará hasta acordar propósito, eventos, retención, acceso, consentimiento aplicable y configuración de privacidad. No se enviarán direcciones de correo, nombres, texto de formularios, parámetros con datos personales u otra información que identifique personas a Analytics.
- Google Search Console es una herramienta de administración con información sensible de búsqueda: las cuentas y verificaciones se gestionarán con roles mínimos. Los tokens de verificación se tratarán como configuración pública solo cuando su método así lo requiera; las credenciales de cuenta no se almacenarán en el sitio.
- La implementación de consentimiento, cookies o tratamiento de datos deberá revisarse frente a requisitos legales aplicables y la configuración real de los proveedores antes de publicar. Este ADR técnico no sustituye asesoramiento jurídico.

### Revisión y respuesta

En cada cambio, incluso si es pequeño, se evaluará:

1. entradas, salidas, escape, URLs y superficies de inyección;
2. dependencias, scripts de terceros, permisos, secretos y datos expuestos;
3. headers, CSP, configuración de hosting y límites de confianza;
4. nuevos datos, formularios, llamadas de red o tratamiento de usuarios.

El cambio incluirá pruebas de seguridad proporcionales a su riesgo: casos de entrada inválida, autorización, navegación o política de cabeceras, cuando apliquen. Antes de cerrar una vulnerabilidad se comprobará el comportamiento corregido y que no se introdujo otra ruta equivalente. Los hallazgos de scanners se triagearán; no se ignorarán ni se aceptarán solo por tener una herramienta verde.

Se mantendrá un canal y una persona responsable para recibir reportes de vulnerabilidades cuando el sitio sea público. Una exposición de secreto o vulnerabilidad explotable activará contención, rotación o mitigación prioritaria y revisión de causa raíz.

## Consecuencias

- La seguridad se considera en todo cambio, con profundidad proporcional a la superficie y el riesgo introducidos.
- La base estática reduce ciertos riesgos de servidor, pero hosting, build, DNS, CI, paquetes y terceros quedan dentro del modelo.
- Se usará OWASP ASVS 5.0.0 como catálogo de referencia y verificación para requisitos aplicables; no se afirmará cumplimiento o certificación sin una evaluación formal del alcance.
- CSP, cabeceras, privacidad y gestión de secretos se completarán con la plataforma de alojamiento y las integraciones que se elijan.

## Referencias

- [OWASP Application Security Verification Standard (ASVS)](https://asvs.owasp.org/) — fijar versión al citar requisitos; versión estable consultada: 5.0.0.
- [OWASP Cross-Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [OWASP HTTP Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
- [Node.js Security Best Practices](https://nodejs.org/en/learn/getting-started/security-best-practices)
- [Astro security configuration](https://docs.astro.build/en/reference/configuration-reference/#security)
- [Google Analytics: evitar enviar PII](https://support.google.com/analytics/answer/6366371)
- [Google Analytics: gestión del consentimiento](https://support.google.com/analytics/answer/12329599)
- [Search Console: verificar propiedad](https://support.google.com/webmasters/answer/9008080)
