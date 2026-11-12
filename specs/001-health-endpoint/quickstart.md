# Guía de validación: Health Endpoint

Esta guía describe la validación local del servicio y su contrato. El proyecto Node.js, el lockfile, los scripts npm y la suite de pruebas están configurados en el repositorio.

## Prerrequisitos

- Node.js 26 LTS y npm.
- `uv`, para ejecutar Schemathesis mediante `uvx`.
- Dependencias npm instaladas desde `package-lock.json` con `npm ci`.

## Validación automatizada

Ejecuta estos scripts desde la raíz del repositorio:

```powershell
npm ci
npm run build
npm test
npm run qa:contract
npm run contract:generate
```

`npm test` compila el proyecto y ejecuta la suite con `node:test`. Las pruebas verifican:

- `GET /health` funciona sin credenciales y responde HTTP 200.
- El `Content-Type` es JSON y el cuerpo es exactamente `{"status":"ok"}`.
- El documento OpenAPI YAML generado declara OpenAPI 3.0.3, `GET /health`, una respuesta 200 y `status` restringido al valor `ok`.
- `openapi` representa la versión del estándar y `info.version` la versión del contrato.
- El documento OpenAPI generado coincide con `specs/contracts/openapi/health-api.yaml` versionado.

`npm run qa:contract` compila el proyecto, inicia la app en un puerto efímero y ejecuta Schemathesis 4.33.4 contra `specs/contracts/openapi/health-api.yaml`. No requiere iniciar el servidor aparte.

## Comprobación manual

Después de iniciar el servicio mediante `npm start`, consultar `http://localhost:3000/health`:

```powershell
curl.exe --include http://localhost:3000/health
```

Resultado esperado: estado HTTP 200, tipo de contenido JSON y cuerpo `{"status":"ok"}`. El puerto `3000` es el valor de desarrollo propuesto; no establece una configuración de despliegue.

## Límite de integración

El manifiesto del Hub fijado en `spec-origin.yaml` registra `health-api` en `specs/contracts/openapi/health-api.yaml` y fija una revisión Backend inmutable. Schemathesis valida el contrato local; antes de declarar alineación con el Frontend, verifica que consuma esa misma revisión.