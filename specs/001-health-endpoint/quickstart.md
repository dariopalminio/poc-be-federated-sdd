# Guía de validación: Health Endpoint

## Estado

Esta guía describe la validación prevista después de que la implementación cree el manifiesto de dependencias, el lockfile y los scripts npm. Esos archivos aún no existen en el repositorio, por lo que los comandos siguientes son propuestas del plan y no se han ejecutado.

## Prerrequisitos

- Node.js 26 LTS y npm.
- Dependencias instaladas desde el lockfile que se incorporará con la implementación.

## Validación automatizada

La implementación deberá exponer estos scripts en `package.json`:

```powershell
npm ci
npm run build
npm test
npm run contract:generate
```

`npm test` ejecuta `node --test`. Actualmente no hay archivos de prueba, por lo que el runner termina con cero tests; ese resultado no constituye cobertura automatizada del comportamiento.

Cuando se añadan pruebas automatizadas, deberán verificar:

- `GET /health` funciona sin credenciales y responde HTTP 200.
- El `Content-Type` es JSON y el cuerpo es exactamente `{"status":"ok"}`.
- El OpenAPI generado declara `GET /health`, una respuesta 200 y el esquema exacto de `status`.
- El artefacto generado coincide con `contracts/openapi.json` versionado.

## Comprobación manual

Después de iniciar el servicio mediante el script `start` que se definirá en `package.json`, consultar `http://localhost:3000/health`:

```powershell
curl.exe --include http://localhost:3000/health
```

Resultado esperado: estado HTTP 200, tipo de contenido JSON y cuerpo `{"status":"ok"}`. El puerto `3000` es el valor de desarrollo propuesto; no establece una configuración de despliegue.

## Límite de integración

Este resultado valida el artefacto backend local. No demuestra alineación con el Frontend hasta que el Hub publique una revisión inmutable que registre la ruta y el commit del contrato compartido.