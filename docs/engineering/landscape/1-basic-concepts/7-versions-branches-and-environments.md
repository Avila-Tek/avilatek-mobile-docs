---
title: Versiones, ramas y entornos
sidebar_position: 7
slug: /basic-concepts/versions-branches-and-environments
---

# Versiones, ramas y entornos

Esta guía explica qué significan las **versiones**, las **ramas** y los **entornos**, por qué importan y cómo se ven estos conceptos en proyectos de Landscapes.

La idea no es aprender Git en profundidad, sino entender cómo se organiza el trabajo para poder hacer cambios con más claridad, menos riesgo y mejor control.

## Qué es una versión

Una versión es simplemente un **estado del proyecto en un momento determinado**.

En pocas palabras, cada vez que el proyecto cambia, existe una nueva versión de cómo está construido en ese momento.

Por ejemplo:

- Una versión puede tener un formulario sin validaciones
- Otra versión puede agregar un nuevo campo
- Otra puede corregir un bug
- Otra puede incluir una refactorización más grande

Pensarlo como “versiones” ayuda a entender que un proyecto no es algo fijo: va evolucionando con cada cambio.

---

## Qué es una rama

Una rama es una forma de separar líneas de trabajo dentro de un mismo proyecto.

Permite trabajar cambios sin afectar inmediatamente la versión que se considera estable.

En desarrollo tradicional, esto suele estar muy asociado a Git. En Landscapes no hace falta entrar en ese nivel técnico, pero sí entender la idea general:

- Hay una versión más estable
- Puede haber una versión donde se están haciendo cambios
- Luego esos cambios se llevan a la versión estable cuando ya están listos

---

## Cómo pensar una rama de forma simple

Una forma fácil de verlo es esta:

- Existe una versión base del proyecto
- Alguien trabaja cambios nuevos aparte
- Prueba esos cambios
- Y finalmente decide cuándo pasarlos a la versión más estable

La idea principal es evitar que cualquier cambio en proceso afecte directamente lo que ya debería funcionar bien.

---

## Qué es un entorno

Un entorno es una **instancia separada del proyecto**.

En Landscapes trabajamos con tres ramas de Git — `dev`, `stg` y `main` — pero solo dos de ellas tienen un entorno propio de verdad (su propia base de datos y su propio despliegue):

- **`dev`**: donde se trabaja día a día en Lovable. No tiene infraestructura propia: mientras se construye ahí, la app usa la base de datos de `stg`.
- **`stg`** (staging): el entorno de prueba. Tiene su propia base de datos y su propio despliegue, separados de producción.
- **`main`** (producción): el entorno real donde interactúan los usuarios finales.

Más adelante se explica en detalle por qué `dev` no tiene su propia base de datos y comparte la de `stg` — por ahora alcanza con quedarse con la idea de que hay un lugar para construir, uno para probar con datos reales de staging, y uno para lo que ya está publicado.

---

### `dev` y `stg` (construir y probar)

Se trabaja en `dev` dentro de Lovable, pero como esa rama no tiene base de datos propia, todo lo que se prueba ahí ya corre contra el esquema y los datos de `stg`.

`stg` sirve para:

- Construir funcionalidades
- Validar flujos
- Revisar si algo funciona
- Detectar errores
- Probar cambios con más seguridad

Es el lugar para experimentar, validar y corregir antes de publicar.

---

### `main` (producción)

**`main`** es el entorno real donde interactúan los usuarios finales.

Es donde vive la versión que realmente se considera publicada o activa.

Los cambios que se hacen aquí tienen más impacto, porque pueden afectar directamente la operación real del proyecto.

`main` no es para probar ideas: es donde debería vivir lo que ya está listo para usarse.

---

## Diferencia entre ramas y entornos

Estos conceptos se relacionan, pero no son exactamente lo mismo.

### Ramas

Hablan más de cómo se organiza el trabajo y las versiones del código.

### Entornos

Hablan más de dónde está corriendo una versión del proyecto.

En pocas palabras:

- Una **rama** organiza el trabajo,
- Un **entorno** es el lugar donde ese trabajo existe o se prueba.

---

## Cómo se ve esto en Landscapes

En Landscapes, este tema es especialmente importante porque:

- Se trabaja con Lovable,
- Los cambios pueden tocar frontend, backend, base de datos y edge functions,
- Y un cambio aparentemente pequeño puede tener impacto real.

Por eso, la lógica general que buscamos seguir es:

- Trabajamos primero en **`dev`** (que ya prueba contra la base de datos de `stg`)
- Cuando el cambio está listo, se abre un PR **`dev → stg`** y se valida ahí, en el entorno de staging
- Recién cuando `stg` está validado, se abre un PR **`stg → main`** para llevarlo a producción

Esto ayuda a evitar que producción se convierta en el lugar donde se prueba por primera vez algo.

---

## Por qué no conviene trabajar directo en `main`

Trabajar directo en `main` aumenta mucho el riesgo de:

- Romper flujos reales
- Afectar usuarios o datos reales
- Mezclar cambios sin validar
- Hacer más difícil detectar de dónde vino un problema
- Publicar algo incompleto
- Ejecutar cambios sensibles sin suficiente control

En proyectos rápidos, esto puede pasar fácilmente si no existe una disciplina mínima de entornos.

Por eso, aunque operativamente exista mucha autonomía, igual conviene sostener la regla de que **`main` no debe ser el lugar principal de trabajo**: siempre programamos en `dev` y probamos en `stg` antes de llegar ahí.

---

## Ejemplo simple

Supongamos que queremos agregar un nuevo campo en un formulario y además guardarlo.

El flujo recomendado al trabajar una funcionalidad es el siguiente:

1. Hacer el cambio en **`dev`**,
2. Validar que el campo se vea bien,
3. Confirmar que guarda correctamente,
4. Revisar que no rompa otras partes del flujo,
5. Cuando comprobemos que todo funciona bien, mergear a **`stg`** y validar ahí,
6. Cuando `stg` esté validado, mergear a **`main`**.

---

## Confusiones comunes

### “Si funciona visualmente, ya se puede pasar a `main`”

No necesariamente.

También hace falta revisar:

- Si los datos se guardan correctamente
- Si no rompieron otros flujos relacionados con los cambios
- Si la lógica funciona

---

## Cómo pensar un cambio usando estos conceptos

Cuando vayas a hacer o revisar un cambio, ayuda hacerse estas preguntas:

- ¿Estoy trabajando sobre una versión de prueba o sobre la versión real?
- ¿Este cambio ya fue validado?
- ¿Qué pasa si esto rompe algo?
- ¿Este cambio toca algo sensible?
- ¿Estoy mezclando varias cosas al mismo tiempo?
- ¿Este cambio está listo para pasar a producción o todavía está en trabajo?

Estas preguntas ayudan a tomar decisiones con más criterio, incluso sin un contexto técnico profundo.

---

## Relación con cambios sensibles

Este tema se vuelve todavía más importante cuando el cambio es sensible o no reversible.

Por ejemplo:

- Eliminar columnas
- Cambiar estructura de base de datos
- Modificar lógica crítica
- Tocar integraciones importantes
- Ejecutar cambios que no tienen rollback simple

En esos casos, trabajar con cuidado entre `dev`/`stg` y `main` no es opcional: es una parte importante del control de riesgo.

---

## Ideas clave para recordar

- Una versión es un estado del proyecto en un momento dado.
- Una rama es una forma de separar trabajo en progreso de una versión más estable.
- Un entorno es una instancia separada del proyecto: en Landscapes son `stg` (staging) y `main` (producción).
- `dev` es donde se trabaja en Lovable, pero no tiene entorno propio: usa la base de datos de `stg`.
- `stg` se usa para probar y validar con datos reales de staging.
- `main` es el entorno real y requiere más cuidado.
- En Landscapes, el flujo es `dev → stg → main`: nunca se trabaja ni se prueba directo en `main`.
