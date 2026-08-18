---
title: Crear un proyecto
sidebar_position: 1
slug: /lovable-setup/create-project
---

# Crear un proyecto en Lovable

Esta guía cubre el **setup mínimo** para crear un proyecto en Lovable enfocado en nuestra prioridad #1: **velocidad** (sin sacrificar calidad).

## 1) Crear un proyecto vacío en Lovable

1. Abre Lovable y usa el prompt:
   - **"Crea un nuevo proyecto vacío"**
2. Luego renombralo y ponle un nombre claro y consistente.
3. (Opcional) Agrega una descripción corta: objetivo + stack.

> En este punto el proyecto existe solo en Lovable (aún no hay repo).

## 2) Conectar el proyecto a GitHub (Lovable crea el repo)

> **Importante:** lovable no permite conectar un proyecto con un repo preexistente, **NO creamos el repo antes**.  
> Al conectar GitHub, **Lovable crea un repositorio nuevo** para ese proyecto y empieza el sync.

1. Ve a **Settings → Connectors → GitHub**.
2. **Connect GitHub** (OAuth): autoriza tu cuenta.
3. Dentro del proyecto, conecta GitHub:
   - Usa el ícono de GitHub (arriba a la derecha) o **Settings → Connectors → GitHub → Connect project**.
   - Selecciona la organización/cuenta destino.

Resultado:

- Se crea un repo nuevo en GitHub.
- Inicia el **two-way sync** automáticamente (Lovable ↔ GitHub).
- Al momento de crear el repo, la rama por defecto (`main`) es la única que existe, así que es la que Lovable sincroniza inicialmente.

> **Importante:** `main` es solo el punto de partida. Antes de empezar a trabajar hay que crear la rama `dev` y cambiar Lovable para que sincronice ahí (nunca se trabaja directo sobre `main`) — ver [Manejo de ramas](/docs/lovable-setup/branch-management).

Consideraciones:

- Luego de crear el repo podemos renombrarlo (esta acción no rompe el sync).

## 3) Backend: no usamos Lovable Cloud

> **Importante:** en Landscapes **no usamos Lovable Cloud** como backend, y **no se usa el botón Publish de Lovable para desplegar nada** (ni frontend ni backend).
>
> El backend real vive en un **proyecto de Supabase externo** (con branching `main`/`stg`), y el frontend se despliega en **Cloudflare**. Ese setup se documenta por separado: el backend en [Setup de Supabase](/docs/lovable-setup/supabase-setup) y el frontend en [Despliegue y Operación](/docs/lovable-ops).

## 4) Checklist final

- [ ] Proyecto creado en Lovable (vacío)
- [ ] GitHub conectado (OAuth + App instalada)
- [ ] Repo creado por Lovable y sync activo
- [ ] Lovable cambiado de `main` a `dev` (ver [Manejo de ramas](/docs/lovable-setup/branch-management)) — no se trabaja sobre `main`
- [ ] **No** se activó Lovable Cloud (el backend se configura aparte, en Supabase externo)

---

## Referencias

- Lovable — [Sync your Lovable project with GitHub](https://docs.lovable.dev/integrations/git-integration)
