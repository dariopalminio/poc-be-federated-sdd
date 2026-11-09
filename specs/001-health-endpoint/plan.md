# Plan de implementación: Health Endpoint

**Branch**: `001-health-endpoint` | **Date**: 2026-11-09 | **Spec**: [spec.md](spec.md)

**Input**: Especificación derivada de la iniciativa `001-health-status`.

## Summary

Implementar `GET /health` como una operación pública que responda HTTP 200 con el JSON exacto `{"status":"ok"}` cuando el servicio pueda responder. La propuesta técnica usa Node.js con TypeScript, Fastify y un contrato OpenAPI generado desde el esquema de respuesta de la ruta.

## Technical Context

**Language/Version**: Node.js 26 LTS y TypeScript; fijar versiones exactas en el manifiesto y lockfile al crear el proyecto.

**Primary Dependencies**: Fastify y `@fastify/swagger`; decisión propuesta para esta feature.

**Storage**: No aplica; no se persisten datos.

**Testing**: Runner integrado `node:test` y solicitudes de prueba con `fastify.inject()`.

**Target Platform**: Proceso de servicio HTTP sobre Node.js. El sistema operativo y el proveedor de despliegue quedan fuera del alcance de esta feature.

**Project Type**: Servicio web backend.

**Performance Goals**: Sin objetivo numérico especificado. El endpoint no consulta dependencias externas.

**Constraints**: Endpoint sin autenticación; respuesta exitosa exacta HTTP 200 y `{"status":"ok"}`. No comprobar salud de dependencias ni afirmar compatibilidad contractual antes de registrar una revisión compartida inmutable.

**Scale/Scope**: Una operación HTTP, sin persistencia ni llamadas a dependencias. No hay volumen de tráfico especificado.

## Constitution Check

*GATE: aprobado para el diseño y la contribución local; la adopción por consumidores depende de registrar el contrato en el Hub.*

- **Alcance federado**: Cumple. La fuente verificada es el commit `8601464b8be53de3ccc5fe848b12540f1c0b0159`; el manifiesto asigna `backend-health`, esta ruta local y `FR-001`, `FR-002`, `FR-003` y `FR-006`.
- **Trazabilidad**: Cumple. `origin.yaml` conserva la misma revisión completa y los mismos requisitos.
- **Propiedad del contrato**: Cumple localmente. El Backend define el contrato OpenAPI canónico.
- **Límite de alineación**: La revisión de origen declara `shared_contracts: []`. Este plan produce un artefacto candidato en el Backend; no afirma alineación con consumidores. Antes de adoptar el contrato en otros repositorios, el Hub debe publicar una nueva revisión inmutable que registre su ruta y commit.
- **Verificación**: Las pruebas y comandos de proyecto se proponen aquí para su incorporación al manifiesto futuro; no existen actualmente y no se reportan como ejecutados.

## Estructura del proyecto

### Documentación de esta feature

```text
specs/001-health-endpoint/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── openapi.json
└── tasks.md              # Se genera en la fase /speckit-tasks
```

### Código fuente (raíz del repositorio)

```text
src/
├── app.ts                # Crea Fastify y registra GET /health
└── server.ts             # Inicia el servidor HTTP

tests/
└── health.test.ts        # Pruebas de ruta y contrato

specs/001-health-endpoint/contracts/
└── openapi.json          # Artefacto OpenAPI generado y versionado
```

**Decisión de estructura**: Servicio backend único. Separar la creación de la app del arranque del servidor permite probar la ruta con `fastify.inject()` sin abrir un puerto. El contrato generado se mantiene como artefacto versionado para la coordinación federada.

## Registro de complejidad

No se introducen proyectos adicionales, persistencia, abstracciones de dominio ni controles de salud de dependencias.
