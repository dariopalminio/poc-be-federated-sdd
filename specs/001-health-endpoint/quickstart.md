# Guía de validación: Health Endpoint

Esta guía describe la validación local del servicio y su contrato. El proyecto Node.js, el lockfile, los scripts npm y la suite de pruebas están configurados en el repositorio.

## Prerrequisitos

- Node.js 26 LTS y npm.
- Dependencias instaladas desde el lockfile que se incorporará con la implementación.

## Validación automatizada

Ejecuta estos scripts desde la raíz del repositorio:

```powershell
npm ci
npm run build
npm test
npm run contract:generate
```

`npm test` compila el proyecto y ejecuta la suite con `node:test`. Las pruebas verifican:

- `GET /health` funciona sin credenciales y responde HTTP 200.
- El `Content-Type` es JSON y el cuerpo es exactamente `{"status":"ok"}`.
- El OpenAPI generado declara `GET /health`, una respuesta 200 y `status` restringido al valor `ok`.
- El documento OpenAPI generado coincide con `contracts/openapi.json` versionado.

## Comprobación manual

Después de iniciar el servicio mediante el script `start` que se definirá en `package.json`, consultar `http://localhost:3000/health`:

```powershell
curl.exe --include http://localhost:3000/health
```

Resultado esperado: estado HTTP 200, tipo de contenido JSON y cuerpo `{"status":"ok"}`. El puerto `3000` es el valor de desarrollo propuesto; no establece una configuración de despliegue.

## Límite de integración

Este resultado valida el artefacto backend local. No demuestra alineación con el Frontend hasta que el Hub publique una revisión inmutable que registre la ruta y el commit del contrato compartido.