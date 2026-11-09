# Investigación de diseño: Health Endpoint

## Decisiones

### Framework HTTP: Fastify

- **Decisión**: Proponer Fastify con TypeScript para la única ruta `GET /health`.
- **Justificación**: Fastify permite probar rutas con `fastify.inject()` sin abrir un servidor y `@fastify/swagger` genera OpenAPI desde los esquemas de las rutas. Esto reduce duplicación entre la respuesta implementada y el contrato que consumen otros repositorios.
- **Alternativas consideradas**:
  - Express es viable, pero requiere una herramienta o mantenimiento manual adicional para mantener OpenAPI alineado con la ruta.
  - NestJS ofrece más estructura de la necesaria para una operación sin persistencia.
- **Estado**: Propuesta de planificación; no hay aplicación o dependencias existentes en el repositorio.

### Contrato OpenAPI

- **Decisión**: Mantener OpenAPI 3.1.0 en `specs/contracts/openapi.json`, generado desde el esquema de respuesta registrado en Fastify.
- **Justificación**: El esquema puede restringir `status` al valor constante `ok`; la versión elegida es compatible con la generación dinámica documentada por `@fastify/swagger`.
- **Alternativas consideradas**: Mantener un documento manual o elegir OpenAPI 3.0.3. El documento manual puede divergir del esquema de la ruta; la versión final debe coordinarse con el consumidor.
- **Límite federado**: La revisión Hub `b163606880e4b058d5c3ab7766878f378d928e9b` registra `health-api` en `specs/contracts/openapi.json`, fijado al commit Backend `535a33201c0b937a41cc8dba5b40d639d448c5ed`. La adopción efectiva por el Frontend depende de que consuma esa revisión.

### Pruebas

- **Decisión**: Usar `node:test` y `fastify.inject()` para verificar la ruta y el documento OpenAPI generado.
- **Justificación**: Ambos evitan instalar un runner HTTP separado; Node incluye `node:test` y Fastify proporciona la inyección de solicitudes.
- **Alternativas consideradas**: Supertest o una prueba con servidor y cliente HTTP real; añaden infraestructura que no aporta valor para esta ruta aislada.

### Límites de la feature

- No se añade persistencia ni se consultan dependencias externas.
- No se fijan metas numéricas de latencia, disponibilidad o carga porque la iniciativa no las define.
- El sistema operativo, proveedor de despliegue y volumen esperado quedan fuera de esta feature.

## Fuentes

- [Pruebas de Fastify](https://fastify.dev/docs/latest/Guides/Testing/): documenta `fastify.inject()` y su integración con `node:test`.
- [@fastify/swagger](https://github.com/fastify/fastify-swagger): documenta generación desde esquemas de ruta y soporte de OpenAPI 3.1.
- [Runner de pruebas de Node.js](https://nodejs.org/api/test.html): documenta el módulo integrado `node:test`.