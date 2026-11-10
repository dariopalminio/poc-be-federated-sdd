# Feature Specification: Health Endpoint

**Feature Branch**: `001-health-endpoint`

**Created**: 2026-11-09

**Status**: Draft

**Input**: Derivada de `specs/001-health-status/spec.md` en la revisión `b163606880e4b058d5c3ab7766878f378d928e9b`, para el rol `backend-health` y los requisitos asignados `FR-001`, `FR-002`, `FR-003` y `FR-006`.

## Clarifications

### Session 2026-11-09

- Q: ¿Debe poder consultarse `GET /health` sin autenticación? → A: Sí, sin autenticación.

## User Scenarios & Testing

### User Story 1 - Consultar la salud del servicio (Priority: P1)

Como consumidor del servicio, quiero consultar su estado de salud para saber si está disponible.

**Why this priority**: La consulta del estado es el comportamiento base del que depende su visualización en la página.

**Independent Test**: Consultar `GET /health` mientras el servicio está disponible y comprobar la respuesta HTTP y el cuerpo JSON.

**Acceptance Scenarios**:

1. **Given** que el servicio está disponible, **When** un consumidor consulta `GET /health` sin autenticación, **Then** recibe HTTP 200 y el cuerpo JSON `{"status":"ok"}`.
2. **Given** la operación de salud definida, **When** un consumidor revisa el contrato API, **Then** encuentra `GET /health`, su respuesta satisfactoria y el esquema de su cuerpo.

### Edge Cases

La especificación padre no define casos límite específicos para el Backend.

## Requirements

### Functional Requirements

- **FR-001**: El servicio MUST exponer `GET /health` sin requerir autenticación.
- **FR-002**: Cuando el servicio esté disponible, `GET /health` MUST responder con HTTP 200 y el cuerpo JSON `{"status":"ok"}`.
- **FR-003**: El contrato OpenAPI MUST describir la operación `GET /health`, la respuesta HTTP 200 y el esquema del cuerpo JSON, incluyendo el valor `status`.
- **FR-006**: El Backend MUST ser el propietario de la definición autoritativa del contrato OpenAPI; el Frontend MUST consumir el contrato acordado y no mantener una definición autoritativa independiente.

### Key Entities

- **Resultado de salud**: Estado comunicado por el servicio; para una respuesta satisfactoria de esta funcionalidad, su valor es `ok`.
- **Contrato de salud**: Definición compartida de la operación, su respuesta y el esquema del resultado, con el Backend como propietario.

## Success Criteria

### Measurable Outcomes

- **SC-001**: El 100% de las consultas satisfactorias de `GET /health` devuelve HTTP 200 y exactamente el cuerpo JSON `{"status":"ok"}`.
- **SC-004**: El contrato OpenAPI permite a un consumidor identificar la operación, la respuesta satisfactoria y el esquema del cuerpo sin depender de documentación externa.

## Assumptions

- El significado de `ok` se limita a que el servicio puede responder a la consulta; no garantiza la salud de dependencias externas ni constituye monitorización integral.
- El Backend es el propietario del contrato OpenAPI, conforme a la especificación principal.
- En la revisión de origen, el manifiesto registra `health-api` en `https://github.com/dariopalminio/poc-be-federated-sdd`, con ruta `specs/contracts/openapi.json` y revisión Backend `535a33201c0b937a41cc8dba5b40d639d448c5ed`. La adopción por el Frontend solo puede afirmarse cuando ese consumidor use la revisión declarada.
- El archivo YAML OpenAPI 3.0.3 en `specs/contracts/openapi/health-api.yaml` es un candidato local conforme a la política actual; no es el contrato compartido fijado por la revisión de origen hasta que el Hub actualice su ruta y SHA.