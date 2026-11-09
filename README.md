# poc-be-federated-sdd

Backend de la PoC federada, implementado con Node.js (>=26), TypeScript, Fastify y `@fastify/swagger`. Las pruebas usan el runner integrado `node:test`; el contrato OpenAPI se genera desde los esquemas de las rutas.

El endpoint disponible actualmente es `GET /health`, público y con respuesta `{"status":"ok"}`.

El stack y sus versiones declaradas están en [package.json](package.json); las versiones resueltas, en [package-lock.json](package-lock.json); y las opciones de compilación TypeScript, en [tsconfig.json](tsconfig.json).

Comandos principales:

- `npm run build`: compilar TypeScript.
- `npm test`: compilar y ejecutar las pruebas.
- `npm start`: iniciar el servidor en el puerto indicado por `PORT` o, por defecto, `3000`.
- `npm run contract:generate`: generar el contrato OpenAPI local.