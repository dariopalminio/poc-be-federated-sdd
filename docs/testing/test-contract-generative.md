# Prueba de Contrato Generativa con Schemathesis 

Para Pruebas de conformidad de API autogeneradas basadas en contrato o Prueba de Contrato Generativa usamos Schemathesis.
El comando `npm run test:con:gen` compila la aplicación y después ejecuta Schemathesis contra una instancia local temporal de la API. Schemathesis usa el contrato OpenAPI versionado en `specs/contracts/openapi/health-api.yaml` para generar solicitudes y validar las respuestas. `npm run test:con:gen` se conserva como alias compatible.

```mermaid
sequenceDiagram
    actor Dev as Desarrollador
    participant NPM as npm
    participant TSC as TypeScript (tsc)
    participant Runner as run-schemathesis.js
    participant API as Fastify (app local)
    participant UVX as uvx
    participant ST as Schemathesis 4.33.4

    Dev->>NPM: npm run test:con:generativa
    NPM->>TSC: npm run build
    TSC->>TSC: tsc -p tsconfig.json
    alt La compilación falla
        TSC-->>NPM: Código de salida distinto de cero
        NPM-->>Dev: El comando termina no ejecuta el runner
    else La compilación termina correctamente
        TSC-->>NPM: Código de salida 0
        NPM->>Runner: node scripts/run-schemathesis.js
        Runner->>Runner: Importa buildApp desde dist/app.js
        Runner->>API: buildApp()
        API-->>Runner: Aplicación configurada
        Runner->>API: listen(host: 127.0.0.1, port: 0)
        API-->>Runner: URL local con puerto asignado
        Runner->>UVX: Ejecuta Schemathesis con el contrato y la URL
        UVX->>ST: Resuelve y ejecuta schemathesis==4.33.4
        ST->>ST: Lee specs/contracts/openapi/health-api.yaml
        loop Casos generados a partir del contrato
            ST->>API: Solicitud HTTP (por ejemplo, GET /health)
            API-->>ST: Estado HTTP, cabeceras y cuerpo
            ST->>ST: Valida la respuesta contra OpenAPI
        end
        ST-->>UVX: Resultado y código de salida
        UVX-->>Runner: Código de salida
        Runner->>API: close() en el bloque finally
        Runner-->>NPM: Propaga el código de Schemathesis
        NPM-->>Dev: Resultado final del comando
    end

    opt uvx no se puede iniciar
        UVX--xRunner: Error al crear el proceso
        Runner->>Runner: Informa el error y usa código de salida 1
        Runner->>API: close() en el bloque finally
    end
```

El comando `uvx` debe estar disponible en el entorno. El runner reserva el puerto con valor `0`, por lo que el sistema operativo asigna uno libre; la instancia se enlaza únicamente a `127.0.0.1` y se cierra al terminar la ejecución.