<!--
Sync Impact Report
- Version: plantilla sin versión -> 1.0.0 (constitución inicial)
- Principios definidos: I. Alcance federado; II. Trazabilidad inmutable; III. Propiedad del contrato API; IV. Responsabilidad local; V. Verificación basada en evidencia
- Secciones añadidas: Restricciones del proyecto; Flujo de desarrollo
- Secciones eliminadas: ninguna
- TODO: confirmar la fecha original de ratificación
Este informe temporal debe eliminarse antes de confirmar el cambio.
-->

# Constitución del Proyecto Backend Federado

## Principios Fundamentales

### I. Alcance federado y autoridad
La especificación principal del Hub y su `links-manifest.yaml`, en la misma revisión inmutable, son la fuente de verdad para el alcance transversal y la contribución asignada a este repositorio. El trabajo local MUST respetar ese alcance. Los cambios que afecten a varios repositorios MUST proponerse primero en la especificación del Hub.

### II. Trazabilidad inmutable
Cada especificación local MUST incluir un `origin.yaml` adyacente que identifique la iniciativa, el rol, los requisitos asignados y el SHA completo del commit del Hub que contiene tanto la especificación principal como el manifiesto. Antes de declarar alineación, MUST verificarse que esos datos coincidan con el manifiesto y que los contratos compartidos referenciados resuelvan a su propietario, ruta y revisión exactos. Si no puede verificarse algún dato, el trabajo dependiente queda bloqueado y la limitación MUST comunicarse; no se permite inferir ni sustituir revisiones.

### III. Propiedad del contrato API
Este repositorio es el propietario canónico del contrato OpenAPI del backend. Los repositorios consumidores MUST usar la revisión inmutable declarada por la iniciativa y no mantener una copia autoritativa independiente. Los cambios incompatibles MUST coordinarse con los consumidores y documentar una ruta de migración antes de adoptarse.

### IV. Responsabilidad local
Este repositorio mantiene su especificación, plan, tareas, implementación y verificación locales. No debe trasladar esos artefactos al Hub ni redefinir localmente requisitos transversales o contratos propiedad de otros repositorios. La implementación MUST limitarse a la contribución asignada en el manifiesto.

### V. Verificación basada en evidencia
Las afirmaciones de compatibilidad y calidad MUST respaldarse con verificaciones disponibles y resultados observados. Los comandos de build, pruebas, lint y tipos MUST obtenerse de manifiestos de proyecto o CI existentes; no se deben inventar. Todo control que no pueda ejecutarse MUST declararse como no verificado, nunca como aprobado.

## Restricciones del Proyecto

- La constitución, las especificaciones aprobadas y los manifiestos reales definen las decisiones del proyecto. Las plantillas de ejemplo no constituyen políticas ni decisiones tecnológicas aprobadas.
- Las herramientas, comandos y automatizaciones solo se consideran disponibles cuando están presentes en la configuración del repositorio. Las instrucciones de federación completas se mantienen en [AGENTS.template.md](../../AGENTS.template.md).
- La ausencia de una revisión verificable del Hub, de un alcance confirmado o de una revisión inmutable del contrato compartido impide afirmar alineación para el trabajo que dependa de esos datos.

## Flujo de Desarrollo

1. Antes de derivar o modificar una especificación local, verificar en una misma revisión inmutable del Hub la especificación principal, el `links-manifest.yaml`, el rol del repositorio, la ruta local y los requisitos asignados.
2. Confirmar que `origin.yaml` y las revisiones de contratos compartidos reflejen esa fuente. Resolver las ambigüedades locales con `/speckit-clarify`; elevar al Hub las ambigüedades que cambien el alcance transversal.
3. Planificar, desglosar tareas e implementar la contribución local mediante las skills disponibles de Spec Kit y las plantillas del repositorio. Revisar los artefactos en los puntos de control definidos por el workflow disponible.
4. Al informar la finalización, identificar el commit de implementación, la revisión de origen del Hub, las revisiones de contratos compartidos, los requisitos cubiertos, los controles ejecutados y sus resultados, y las limitaciones pendientes.

## Gobernanza

Esta constitución rige la ejecución técnica local. La especificación principal y el manifiesto del Hub gobiernan el alcance transversal y la coordinación entre repositorios; una decisión local no puede sustituirlos. Las enmiendas a esta constitución MUST incluir una justificación y una evaluación de impacto, y requieren revisión y aprobación antes de integrarse.

La versión sigue SemVer: MAJOR para eliminar o redefinir de forma incompatible principios o reglas; MINOR para añadir principios o ampliar materialmente las reglas; PATCH para aclaraciones y cambios editoriales sin efecto normativo. Las revisiones de cambios MUST comprobar el cumplimiento de los principios aplicables y distinguir la evidencia obtenida de los controles pendientes.

**Versión**: 1.0.0 | **Ratificada**: TODO(RATIFICATION_DATE): fecha original pendiente de confirmar | **Última enmienda**: 2026-11-09
