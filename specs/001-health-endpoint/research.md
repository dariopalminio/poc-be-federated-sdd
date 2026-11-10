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

- **Decisión**: Generar YAML OpenAPI 3.0.3 en `specs/contracts/openapi/health-api.yaml` desde el esquema de respuesta registrado en Fastify.
- **Justificación**: Cumple la política corporativa; `@fastify/swagger` serializa el documento a YAML y transforma la constante `status` en el `enum` equivalente admitido por OpenAPI 3.0.
- **Alternativas consideradas**: JSON y OpenAPI 3.1.x quedan descartados por la política del repositorio.
- **Límite federado**: El manifiesto actual del Hub todavía fija `specs/contracts/openapi.json` y OpenAPI 3.1.0 en el commit Backend `535a33201c0b937a41cc8dba5b40d639d448c5ed`. El YAML nuevo es un candidato local hasta actualizar ese manifiesto con su ruta y el SHA Backend que lo publique.

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
- [@fastify/swagger](https://github.com/fastify/fastify-swagger): documenta generación desde esquemas de ruta y salida YAML.
- [Runner de pruebas de Node.js](https://nodejs.org/api/test.html): documenta el módulo integrado `node:test`.