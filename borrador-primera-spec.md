Para crear una spec hija derivada de una spec padre seguiría este flujo:

1. En este repositorio poc-be-federated-sdd, para esta nueva spec de épica, usa los valores del manifiesto: rol backend-health y spec local specs/001-health-endpoint/spec.md. El rol del manifiesto prevalece sobre el ejemplo genérico backend-producer de la plantilla.

2. Fija una revisión del Hub que contenga tanto la spec padre como su manifiesto. En el Hub, una vez que esos cambios estén en un commit, obtén su SHA completo con git rev-parse HEAD. No uses un SHA de cambios sin confirmar.

3. Crea specs/001-health-endpoint/origin.yaml con esos datos:

4. Crea specs/001-health-endpoint/spec.md derivándola de la spec padre. Incluye esos cuatro requisitos y sus criterios aplicables; no incorpores FR-004 ni FR-005, que pertenecen al Frontend. Conserva los IDs para permitir comprobar la trazabilidad.