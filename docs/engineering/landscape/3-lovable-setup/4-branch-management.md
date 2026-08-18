---
title: Manejo de ramas
sidebar_position: 4
slug: /lovable-setup/branch-management
---

Esta guía explica cómo vamos a trabajar con **tres ramas** para evitar confusiones y publicar con más control:

- **dev**: donde **se trabaja día a día** en Lovable.
- **stg**: staging. Tiene su propio ambiente completo (base de datos de Supabase y deploy de Cloudflare propios).
- **main**: producción.

> Regla simple del equipo: **siempre se codea en `dev`**. `stg` y `main` se actualizan solo cuando queremos desplegar.

`stg` y `main` son las ramas que además existen como **branches persistentes en Supabase** y como **proyectos de Cloudflare** propios (cada una con su propia base de datos y su propio deploy). `dev` **no tiene infraestructura propia**: mientras trabajas en Lovable sobre `dev`, la app apunta a la **base de datos de `stg`** (no existe una base de datos separada para `dev`). Cómo crear y configurar ese branching de Supabase se explica en [Setup de Supabase](/docs/lovable-setup/supabase-setup); el resto del despliegue (Cloudflare, dominio, release) está en [Despliegue y Operación](/docs/lovable-ops).

---

## ¿Por qué hacemos esto?

Porque Lovable puede trabajar con GitHub, y si no definimos una regla clara, es fácil que alguien termine haciendo cambios en la rama equivocada.

Además, Lovable por defecto **solo sincroniza la rama principal del repo (la default, normalmente `main`)**.
Para poder trabajar cómodos en `dev`, necesitamos activar el cambio de ramas dentro de Lovable.

---

## Paso a paso (setup)

### 1) Conectar el proyecto a GitHub

Conecta el proyecto a GitHub desde los settings de Lovable.

> Nota: si alguna vez “no ves cambios” en Lovable, normalmente es porque estabas mirando una rama distinta: por defecto Lovable solo sincroniza la rama principal.

---

### 2) Crear las ramas `dev` y `stg` en GitHub

En tu repo, crea:

- `stg`, basada en `main`.
- `dev`, basada en `stg`.

Resultado: `main` (producción) → `stg` (staging) → `dev` (trabajo diario).

---

### 3) Activar el feature para cambiar de rama en Lovable (Labs)

En Lovable, activa **GitHub branch switching** (está en Labs).

Una vez activo, podrás elegir qué rama está editando Lovable desde:
**Project Settings → GitHub → Branch selector**.

---

### 4) Cambiar Lovable a `dev`

En el selector de rama, selecciona **`dev`**.

✅ A partir de aquí, los cambios que hagas en Lovable se guardan en `dev`.

> Si después de esto Lovable sigue mostrando/guardando cambios en `main`, vuelve a **Project Settings → GitHub → Branch selector** y confirma que quedó en `dev` — por defecto Lovable arranca sincronizando solo la rama principal del repo, y ese selector es lo único que lo cambia.

---

### 5) Apuntar `dev` a la base de datos de `stg`

Configura las variables de entorno del proyecto (URL y publishable key de Supabase) en `dev` para que apunten al **branch `stg` de Supabase**, no a producción. Así, todo lo que pruebes mientras trabajas en Lovable ya está usando datos/esquema de staging. Ver [Variables de entorno](/docs/lovable-setup/environment-variables).

> `dev` nunca tiene su propia base de datos: comparte la de `stg` a propósito, para no tener que mantener un tercer ambiente de datos.

---

## Cómo trabajamos en el día a día

- Siempre trabajar en **`dev`**.
- Validar cambios y flujos normalmente contra la base de datos de `stg` (sin tocar `main`).
- Mantener `stg` y `main` “limpias” para que sea fácil desplegar cuando toque.

## Nota importante: el backend ya no vive en Lovable Cloud

A diferencia del setup anterior (donde el backend vivía en Lovable Cloud con un único ambiente "Test"), ahora el backend es un **proyecto de Supabase externo con branching real**: existe un branch de Supabase para `main` (producción) y otro para `stg` (staging), cada uno con su propia base de datos, Auth, Secrets e integraciones. `dev` no agrega un tercer branch de base de datos — usa el de `stg`.

Esto significa que los cambios de **base de datos** y **Edge Functions** que hagas mientras trabajas en `dev` ya se están probando directamente contra `stg`, y solo llegan a producción cuando se mergea y despliega ese cambio a `main` (ver [Despliegue y Operación](/docs/lovable-ops)). Ya no aplica el riesgo de "lo que cambié en Test contamina Live" que existía con Lovable Cloud.

Aun así, sigue siendo buena práctica:

- Implementar la funcionalidad **de principio a fin** (UI + backend + cambios de datos) en vez de alternar entre refactors grandes y bug fixing sin terminar ninguno.
- Preferir cambios **compatibles** (agregar en vez de romper) cuando sea posible, para que `stg` y `main` no se desincronicen demasiado entre releases.

---

## Cómo desplegamos cambios (release)

### 1) De `dev` a `stg` (desplegar a staging)

1) Abrir PR: **`dev → stg`** — antes de mergear, confirma que no quedó branding de Lovable en el diff (ver [Quitar el branding de Lovable](/docs/lovable-setup/remove-lovable-branding))
2) Revisar y mergear el PR
3) El merge a `stg` dispara automáticamente el despliegue de staging (Supabase branch `stg` + Cloudflare) — ver [Despliegue y Operación](/docs/lovable-ops)
4) Validar en el ambiente de `stg` (su propia URL/dominio)

### 2) De `stg` a `main` (desplegar a producción)

1) Cuando `stg` ya esté validado, abrir PR: **`stg → main`**
2) Revisar y mergear el PR
3) El merge a `main` dispara automáticamente el despliegue de producción
4) Verificar producción con el checklist del flujo de release

> Importante: en Lovable, sigue trabajando siempre desde `dev` — no necesitas cambiar de rama en Lovable para desplegar, el release lo disparan los PRs/merges hacia `stg` y `main`, no el botón Publish.

---

## Checklist rápido (para el equipo)

- [ ] ¿Estoy en `dev` antes de empezar a trabajar?
- [ ] ¿`dev` está apuntando a la base de datos de `stg` (no a `main`)?
- [ ] ¿Lo que voy a desplegar a staging ya está mergeado `dev → stg`?
- [ ] ¿`stg` ya fue validado antes de abrir el PR `stg → main`?

---

## Referencias

- Lovable — [Labs (GitHub branch switching)](https://docs.lovable.dev/features/labs)
- Supabase — [Branching](https://supabase.com/docs/guides/deployment/branching)
