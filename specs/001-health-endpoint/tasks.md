---
description: "Tareas para implementar el endpoint de salud"
---

# Tareas: Health Endpoint

**Input**: Documentos de diseño en `/specs/001-health-endpoint/`

**Prerrequisitos**: `plan.md`, `spec.md`, `research.md`, `data-model.md` y `specs/contracts/openapi.json`

**Pruebas**: Suite unitaria con `node:test` en `tests/health.test.js`; `npm test` compila y ejecuta la suite.

**Organización**: Las tareas de implementación pertenecen a la historia de usuario P1 para mantener la trazabilidad.

## Formato

- `[P]` identifica tareas paralelizables en archivos distintos y sin dependencias pendientes.
- `[US1]` corresponde a «Consultar la salud del servicio» en `spec.md`.
- Cada tarea incluye su ruta de archivo.

## Fase 1: Setup

**Propósito**: Inicializar el proyecto Node.js con TypeScript.

- [X] T001 [P] Crear `package.json` con Node.js 26, TypeScript, Fastify, `@fastify/swagger` y scripts `build`, `start`, `test` y `contract:generate`.
- [X] T002 [P] Crear `tsconfig.json` con modo estricto, salida compilada en `dist/` y configuración compatible con Node.js.
- [X] T003 Generar `package-lock.json` instalando las dependencias declaradas en `package.json`.

## Fase 2: Fundamentos

**Propósito**: Preparar la aplicación HTTP y el generador del contrato antes de completar la historia.

- [X] T004 Crear la fábrica de aplicación `src/app.ts`, inicializar Fastify, registrar `@fastify/swagger` antes de las rutas y exportar la aplicación para su reutilización.

**Checkpoint**: El proyecto compila y la fábrica Fastify puede inicializarse sin abrir un puerto.

## Fase 3: User Story 1 - Consultar la salud del servicio (P1) - MVP

**Meta**: Exponer una operación pública y entregar el contrato OpenAPI generado desde su esquema.

**Criterios de prueba independiente**: Sin credenciales, `GET /health` devuelve HTTP 200 y exactamente `{"status":"ok"}`. El contrato OpenAPI declara la operación, la respuesta 200 y el esquema requerido de `status`.

- [X] T005 [US1] Registrar `GET /health` en `src/app.ts` sin autenticación y con respuesta JSON cuyo esquema requiere `status` constante `ok` y rechaza propiedades adicionales.
- [X] T006 [P] [US1] Crear `src/server.ts` para iniciar la aplicación exportada por `src/app.ts` en el puerto de `PORT`, usando `3000` como valor local predeterminado.
- [X] T007 [US1] Crear `src/generate-openapi.ts` para generar OpenAPI desde el esquema de Fastify y escribir `specs/contracts/openapi.json` con `GET /health` y seguridad vacía.
- [X] T008 [US1] Crear `tests/health.test.js` con pruebas unitarias del endpoint público y de la paridad entre el OpenAPI generado y el contrato versionado.

**Checkpoint**: La historia es demostrable de manera independiente mediante la respuesta HTTP y el contrato generado.

## Fase 4: Pulido y validación

**Propósito**: Confirmar que la guía de validación coincide con los scripts y artefactos implementados.

- [X] T009 Revisar y ejecutar `specs/001-health-endpoint/quickstart.md` con los scripts de `package.json`; documentar cualquier comando que no pueda ejecutarse por falta de configuración del proyecto.

## Dependencias y orden de ejecución

### Dependencias de fases

- **Setup (Fase 1)**: T001 y T002 pueden ejecutarse en paralelo; T003 depende de T001.
- **Fundamentos (Fase 2)**: T004 depende de T001, T002 y T003; bloquea la historia.
- **User Story 1 (Fase 3)**: depende de T004. T005 y T006 pueden ejecutarse en paralelo; T007 depende de T005.
- **Pulido (Fase 4)**: T009 depende de T005-T008.

### Orden de la historia

- **User Story 1 (P1)**: puede completarse de forma independiente después de la Fase 2; no depende de otras historias.

### Oportunidades de paralelismo

- **Setup**: T001 (`package.json`) y T002 (`tsconfig.json`) son archivos distintos y no dependen entre sí.
- **User Story 1**: después de T004, T005 modifica `src/app.ts` mientras T006 crea `src/server.ts`; son tareas paralelizables. T007 espera a que T005 defina la ruta.

## Ejemplo de ejecución paralela: User Story 1

Después de completar T004:

```text
T005: Registrar GET /health y su esquema en src/app.ts
T006: Crear el punto de entrada HTTP en src/server.ts
```

Después de T005, ejecutar T007 para generar el contrato OpenAPI.

## Estrategia de implementación

1. Completar setup y fundamentos.
2. Implementar la historia P1 y generar el contrato local.
3. Validar la respuesta y el contrato usando la guía de quickstart.
4. El Hub ya registra `specs/contracts/openapi.json` y su revisión Backend inmutable. La adopción efectiva por el Frontend depende de que ese repositorio consuma la revisión declarada.

## Resumen

- **Total**: 9 tareas.
- **User Story 1**: 4 tareas (T005-T008).
- **MVP sugerido**: completar T001-T008; T009 cierra la validación de la entrega.
- **Pruebas automatizadas**: T009 cubre la respuesta HTTP sin autenticación y la correspondencia del OpenAPI versionado.