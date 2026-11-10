# Instrucciones para agentes

## Estado del repositorio

- Este checkout contiene actualmente la estructura inicial de Spec Kit, no un backend implementado: no hay código fuente de la aplicación, manifiesto de dependencias, configuración de pruebas ni workflow de CI.
- La constitución de Spec Kit en `.specify/memory/constitution.md` sigue siendo una plantilla. No consideres sus principios de ejemplo ni sus opciones tecnológicas como políticas aprobadas del proyecto.
- La configuración inicializada de Spec Kit usa la integración de Copilot y scripts de PowerShell. Sigue las skills y el workflow disponibles en el repositorio; no des por sentada otra integración o shell.

## Propósito del proyecto

 Este repo es parte de una PoC para implementar la estrategia Initiative-First / Modelo Federado y Derivación Jerárquica de Especificaciones sobre un ecosistema polyrepo mediante GitHub Spec Kit, donde una Iniciativa Central (spec Épica de negocio transversal) vive en un Hub de Coordinación (poc-cross-hub-federated-sdd) y cada repositorio de código como este (poc-be-federated-sdd) deriva mecánicamente su propia especificación local (spec.md), y sus documentos derivados como su plan técnico (plan.md) y su desglose de ejecución (tasks.md), gobernados por contratos de datos inmutables con dueño explícito.

## La aplicación

La aplicación consta de un frontend en react y un backend (este repositorio) que se cordinan con un contrato OpenApi.

## Convenciones generales

Topología de Repositorios y Separación de Planos
Se desacopla formalmente el Plano de Coordinación Estratégico del Plano de Ejecución Técnico:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   HUB CENTRAL DE INICIATIVAS                           │
│   (poc-cross-hub-federated-sdd: specs transversales, contratos y orquestación)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Derivación Declarativa (Punteros)
          ┌─────────────────────────┴─────────────────────────┐
          ▼                                                   ▼
┌──────────────────────────────────┐        ┌──────────────────────────────────┐
│  REPO SATÉLITE 1 (Producer)      │        │  REPO SATÉLITE 2 (Consumer)      │
│  poc-be-federated-sdd (este repositorio)│◄───────┤  poc-fe-federated-sdd                │
│  - Dueño del contrato API        │  Open  │  - Consume contrato API          │
│  - Spec, Plan y Tasks locales    │  API   │  - Spec, Plan y Tasks locales    │
│  - Código fuente Backend         │        │  - Código fuente Frontend        │
└──────────────────────────────────┘        └──────────────────────────────────┘
```

### Repositorios

Backend (este repositorio proveedor): https://github.com/dariopalminio/poc-be-federated-sdd
Hub (repositorio transversal): https://github.com/dariopalminio/poc-cross-hub-federated-sdd
Frontend (repositorio frontend consumidor): https://github.com/dariopalminio/poc-fe-federated-sdd


## Reglas de federación

- Consulta [AGENTS.template.md](AGENTS.template.md) para conocer el contrato completo de federación, los roles de los repositorios y los requisitos de entrega.
- Antes de derivar o modificar una especificación local de una funcionalidad, localiza la especificación principal y `parent-spec-manifest.yaml` en el mismo commit inmutable del Hub. Usa esa entrada del manifiesto para verificar el rol de este repositorio, la ruta de la especificación local y el alcance de los requisitos.
- Mantén `spec-origin.yaml` junto a la especificación local y fija el SHA completo del commit de origen. Si no se pueden verificar la revisión principal, el alcance o el contrato compartido, detente e informa del bloqueo; no hagas suposiciones ni afirmes que existe alineación.
- Este repositorio es el propietario canónico del contrato OpenAPI del backend. Los consumidores deben usar la revisión inmutable exacta que declara el manifiesto principal; coordina con ellos cualquier cambio incompatible.

## Workflow de Spec Kit

- Comprueba primero la alineación con la federación. Después, usa las skills pertinentes de Spec Kit del repositorio para aclarar, planificar, generar tareas, implementar y analizar la contribución asignada.
- Consulta `.specify/templates/` para conocer la estructura esperada de los artefactos de funcionalidades y `.specify/workflows/speckit/workflow.yml` para el ciclo integrado con puntos de revisión.
- Cuando se añadan manifiestos de proyecto y configuración de CI, obtén de ellos los comandos de build, pruebas, lint y comprobación de tipos. Nunca inventes comandos ni informes como aprobadas las comprobaciones que no se hayan ejecutado.
- Limita el trabajo al alcance asignado a este repositorio. Propón primero en la especificación del Hub los cambios que afecten a varios repositorios.
- Escribe la documentación en español.