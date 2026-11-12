# poc-be-federated-sdd

Backend de la PoC federada, implementado con Node.js (>=26), TypeScript, Fastify y `@fastify/swagger`. Las pruebas usan el runner integrado `node:test`; el contrato OpenAPI se genera desde los esquemas de las rutas.

El endpoint disponible actualmente es `GET /health`, público y con respuesta `{"status":"ok"}`.

El stack y sus versiones declaradas están en [package.json](package.json); las versiones resueltas, en [package-lock.json](package-lock.json); y las opciones de compilación TypeScript, en [tsconfig.json](tsconfig.json).

Comandos principales:

- `npm run build`: compilar TypeScript.
- `npm test`: compilar y ejecutar todas las pruebas.
- `npm run test:api`: ejecutar las pruebas del endpoint y sus respuestas HTTP.
- `npm run test:con`: comprobar que el OpenAPI generado coincide con el contrato versionado.
- `npm run test:con:generativa`: ejecutar Schemathesis contra el OpenAPI versionado y la app local. Requiere `uv` (`uvx`); usa Schemathesis 4.33.4.
- `npm run test:con:gen`: alias compatible de `npm run test:con:generativa`.
- `npm start`: iniciar el servidor en el puerto indicado por `PORT` o, por defecto, `3000`.
- `npm run contract:generate`: generar el contrato OpenAPI local.