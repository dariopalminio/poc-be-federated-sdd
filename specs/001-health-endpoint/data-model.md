# Modelo de datos: Health Endpoint

## Resultado de salud

Representación de la respuesta exitosa de `GET /health`.

| Campo | Tipo | Restricciones |
|---|---|---|
| `status` | string | Obligatorio; valor constante `ok` |

- La respuesta no contiene campos adicionales.
- No se persiste ni se identifica una instancia de resultado; cada consulta produce la misma representación mientras el servicio pueda responder.
- El contrato HTTP canónico está definido en [specs/contracts/openapi.json](../contracts/openapi.json).

## Persistencia y relaciones

No hay almacenamiento, ciclo de vida persistente ni relaciones entre entidades para esta feature.