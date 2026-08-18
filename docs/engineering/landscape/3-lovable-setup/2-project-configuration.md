---
title: Configuración Inicial
sidebar_position: 2
slug: /lovable-setup/project-configuration
---

# Configuración Inicial para trabajar con Lovable

Esta guía explica cómo configurar el **repositorio del proyecto** para que Lovable:

- Siga nuestros estándares sin depender del prompt
- Use *progressive disclosure* (lee solo lo necesario),
- Sea **eficiente en tokens**.

## 1) Copiar la carpeta `agent_docs/` desde `lovable-template-v2` al repo del proyecto

Nuestro estándar es arrancar cualquier proyecto con la carpeta `agent_docs/` (y archivos relacionados, incluyendo `AGENTS.md` en la raíz) desde el repositorio **lovable-template-v2**.

**Recomendación:** hacerlo directamente con GitHub (más rápido y con menos fricción).

Pasos:

1. Abre el repo **lovable-template-v2** en GitHub.
2. Copia la carpeta `agent_docs/` completa y el archivo `AGENTS.md` de la raíz.
3. Pégalos en el repo del proyecto (el repo que creó Lovable).
4. Haz commit y push a la rama principal (`main`).

> Link del repo: **(https://github.com/landscape-at/lovable-template-v2)**

Reglas:

- Copia la carpeta completa (no solo algunos docs).
- No renombres rutas internas sin actualizar referencias.
- Mantén `agent_docs/` como fuente de verdad de guías.

## 2) Copiar la carpeta `supabase/functions/` desde `lovable-template-v2` (incluye `_shared` y `_tests`)

Si el proyecto va a usar Supabase (Edge Functions), también debemos copiar la base de funciones del template para arrancar con:

- Estructura estándar de `supabase/functions/`
- Carpeta `supabase/functions/_shared/` (helpers reutilizables)
- Carpeta `supabase/functions/_tests/` (testing mínimo)

Pasos:

1. En el repo **lovable-template-v2**, copia la carpeta `supabase/functions/` completa.
2. Pégala en el repo del proyecto respetando la ruta: `supabase/functions/`.
3. Haz commit y push a la rama principal (`main`).

> Link del repo: **(https://github.com/landscape-at/lovable-template-v2)**

Reglas:

- Copia la carpeta completa (incluyendo `_shared/` y `_tests/`).
- No dupliques código entre funciones nuevas: todo lo común debe vivir en `_shared/`.

## 3) Copiar el setup del cliente de Supabase (`src/integrations/supabase/`)

Todos los proyectos deben inicializar el cliente de Supabase **de la misma forma**. Por eso, además de `agent_docs/` y `supabase/functions/`, copiamos también la carpeta que arma ese cliente en el template, en vez de dejar que cada proyecto la genere distinto.

Pasos:

1. En el repo **lovable-template-v2**, copia la carpeta `src/integrations/supabase/` completa (incluye `client.ts` y `types.ts`).
2. Pégala en el repo del proyecto respetando la ruta: `src/integrations/supabase/`.
3. Haz commit y push a la rama principal (`main`).

> Link del repo: **(https://github.com/landscape-at/lovable-template-v2)**

Qué hace `client.ts`:

- Inicializa un único cliente de Supabase para todo el frontend con `createClient<Database>(...)`.
- Lee la URL y la key **desde variables de entorno**: `import.meta.env.VITE_SUPABASE_URL` y `import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY` — nunca hardcodeadas (ver [Variables de entorno](/docs/lovable-setup/environment-variables)).
- Importa el tipo `Database` desde `./types` (el `types.ts` copiado trae un schema vacío de placeholder; se regenera solo, a medida que el proyecto define tablas reales — no lo edites a mano).

Reglas:

- No crees un cliente de Supabase distinto en otra ruta: `src/integrations/supabase/client.ts` es el único.
- Configura en el `.env` del proyecto las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` con las credenciales correspondientes al ambiente (`stg` mientras se trabaja en `dev` — ver [Manejo de ramas](/docs/lovable-setup/branch-management)).

## 4) Verificar que Lovable lea los Agent Docs desde el repo

Luego del push:

- Abre el proyecto en Lovable.
- Confirma que el sync con GitHub esté activo.
- Si vas a pedirle trabajo a Lovable de inmediato, en el prompt puedes referenciar que ya existen los docs (ej: “Lee agent_docs/…”), pero la idea es que el **Knowledge** lo guíe incluso sin mencionarlo.

## 5) Configurar Custom Knowledge en Lovable

El Knowledge debe ser **muy conciso** para no inflar tokens en cada prompt.

Pasos:

1. En el proyecto de Lovable, entra a **Project Settings → Custom Knowledge**.
2. Copia y pega el contenido de:
   - `AGENTS.md` (raíz del repo)
3. Guarda los cambios.

Reglas:

- En el Knowledge pega **solo** `AGENTS.md` (no pegues todos los docs de `agent_docs/`).
- Los demás documentos viven en el repo y se consultan por *progressive disclosure*.

## Checklist final

- [ ] `agent_docs/` y `AGENTS.md` copiados desde `lovable-template-v2` al repo del proyecto
- [ ] `supabase/functions/` copiado desde `lovable-template-v2`
- [ ] `src/integrations/supabase/` (cliente Supabase) copiado desde `lovable-template-v2`
- [ ] Commit + push a `main`
- [ ] `.env` con `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` configurado
- [ ] Contenido de `AGENTS.md` pegado en **Custom Knowledge**
- [ ] Lovable sincronizado y listo para seguir estándares sin prompts largos

---

## Referencias

- Lovable — [Define workspace and project knowledge](https://docs.lovable.dev/features/knowledge)
