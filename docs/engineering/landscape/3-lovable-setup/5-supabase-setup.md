---
title: Setup de Supabase
sidebar_position: 5
slug: /lovable-setup/supabase-setup
---

Esta guía cubre cómo dejar el backend listo: un **proyecto de Supabase externo** (no Lovable Cloud) con **branching** de `main` (producción) y `stg` (staging).

> Documentación oficial de referencia: Supabase — [Branching](https://supabase.com/docs/guides/deployment/branching).

Este setup se hace **una sola vez por proyecto**, normalmente después de definir el manejo de ramas (ver [Manejo de ramas](/docs/lovable-setup/branch-management)).

> **Importante:** el acceso a la organización de Supabase se gestiona a través de tu supervisor.

---

## 1) Crear el proyecto de Supabase

1. Entra a [supabase.com](https://supabase.com) con tu cuenta (dentro de la organización de Landscapes).
2. **New Project** → elige la organización, nombre del proyecto y región.
3. Espera a que termine de aprovisionarse.

Este proyecto **es producción** — corresponde a la rama `main` del repo. No hace falta crear un branch aparte para `main`.

---

## 2) Conectar el proyecto a GitHub

1. Dentro del proyecto de Supabase, en el menú lateral izquierdo: **Project Settings** (el ícono de engranaje, abajo del todo) → pestaña **Integrations**.
2. Busca la tarjeta **"GitHub Integration"** → botón **Authorize GitHub** → autoriza en la pantalla de GitHub que se abre.
3. De vuelta en Supabase, en esa misma tarjeta: selecciona el **repo** del proyecto (el mismo que creó Lovable) y define el **directorio de trabajo** (`.` si la carpeta `supabase/` está en la raíz del repo — nuestro caso estándar).
4. **Enable integration**.

Con esto, Supabase queda enterado de las migraciones (`supabase/migrations`) que vivan en el repo.

> En esa misma tarjeta de configuración vas a ver dos toggles: **"Automatic branching"** (déjalo **desactivado** — esa opción crea un branch efímero de Supabase por cada rama/PR nueva en GitHub, y en Landscapes solo usamos dos branches persistentes: `main` y `stg`, sin ambientes por PR) y **"Deploy to production"** (déjalo **activado** — es lo que hace que un merge a `main` aplique la migración a producción automáticamente).

---

## 3) Crear el branch persistente `stg`

1. En la barra superior del dashboard de Supabase (donde dice `Organización / Proyecto / Rama`), haz clic en el nombre de la rama actual para abrir el selector de branches.
2. **Create branch** → nombre: `stg`.
3. Márcalo como **persistente** (no efímero) — así no se borra solo ni se pausa por inactividad.
4. Confirma la creación. Supabase aprovisiona una base de datos independiente para `stg` (copia el schema y los datos actuales una sola vez, al crearlo; después `stg` y `main` viven separados).

> Si no ves la opción de crear branches: la primera vez que se crea un branch en un proyecto hace falta rol **Owner/Administrator** (una sola vez; después alcanza con rol Developer). Si aun así no aparece, revisa el ícono de tu usuario (arriba a la derecha) → puede que haga falta habilitar el feature de branching por dashboard primero.

Este branch de Supabase queda vinculado por nombre al branch `stg` de GitHub — es la contraparte de infraestructura de esa rama (ver [Manejo de ramas](/docs/lovable-setup/branch-management)).

> Nota: la rama `dev` de GitHub (donde trabaja Lovable día a día) **no tiene su propio branch de Supabase**. Apunta directo a la base de datos de `stg` — ver el siguiente paso.

### Si el mapeo queda invertido (producción ligada al branch de git equivocado)

A veces, al activar la integración, el branch que Supabase marca como producción termina ligado al branch de git equivocado (por ejemplo, a `stg` en vez de `main`), o el branch persistente que creaste queda con otro nombre/mapeo por defecto. El dashboard no tiene un botón para corregir esto — es la **única excepción a "solo dashboard"** de esta guía: se corrige con el **Supabase CLI**.

```bash
# Confirmar que el branch de producción quede ligado al branch de git "main"
supabase branches update main --project-ref <project-ref> --git-branch main

# Marcar el branch de trabajo como persistente y ligarlo al branch de git "stg"
supabase branches update <nombre-actual-del-branch> --project-ref <project-ref> --persistent --name stg --git-branch stg
```

Verifica el resultado en el dashboard (**Branches**): `main` debe quedar ligado al branch de git `main`, y el branch persistente `stg` debe quedar ligado al branch de git `stg`.

---

## 4) Configurar credenciales por ambiente

Cada branch de Supabase (`main` y `stg`) tiene su propia URL, `publishable key` y **Secrets** — no se comparten entre sí.

- **`main`**: usa las credenciales del proyecto raíz de Supabase (**Project Settings → API Keys**, con la rama `main` seleccionada en la barra superior).
- **`stg`**: primero cambia de rama en la barra superior (selector `Organización / Proyecto / Rama`) para pararte en `stg`, y luego entra a **Project Settings → API Keys** — vas a ver la URL y `publishable key` propias de ese branch (son distintas a las de `main`).

Estas credenciales son las que luego se configuran como variables de entorno en Lovable/Cloudflare (ver [Variables de entorno](/docs/lovable-setup/environment-variables)):

- `dev` → apunta a las credenciales de **`stg`**.
- El deploy de staging (Cloudflare) → apunta a las credenciales de **`stg`**.
- El deploy de producción (Cloudflare) → apunta a las credenciales de **`main`**.

---

## 5) Conectar el conector nativo de Lovable ↔ Supabase

Además de las variables de entorno, Lovable tiene su propio conector nativo a Supabase (le da a la IA accesos directos: SQL editor, gestión de usuarios, secrets, y la capacidad de escribir/proponer migraciones y Edge Functions desde el chat).

Dónde está: dentro del proyecto en Lovable, botón **More** (arriba) → pestaña **Cloud** → bajar hasta la tarjeta **"Supabase"** → **Connect** → autorizar y elegir el proyecto.

> **Regla no negociable: este conector se conecta ÚNICAMENTE al branch `stg`. Lovable nunca debe tener acceso a `main`/producción.** Al elegir el proyecto en el flujo de "Connect", asegúrate de seleccionar las credenciales/branch de **`stg`** — no el proyecto raíz.

Este conector es aparte de las variables de entorno del paso anterior, y trae dos riesgos reales que hay que vigilar:

1. **Puede resetear el `.env`**: si Lovable detecta este conector activo, puede sobreescribir `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` de vuelta a los valores del proyecto que tiene conectado. Después de conectar el conector (o después de cualquier acción de Lovable sobre Supabase), **verifica el `.env`** y confirma que sigue apuntando a `stg`.
2. **La IA puede sugerir/escribir `.from()` o `.rpc()` directo** ahora que "ve" la base de datos — esto está prohibido (ver regla en [React Standards](/docs/code-standards/react)). Si Lovable propone codigo así, recházalo y pide que la lectura/escritura pase por una Edge Function.

Verificación obligatoria después de conectar (o de cualquier cambio que haga Lovable sobre Supabase):

- [ ] `src/integrations/supabase/client.ts` (copiado desde `lovable-template-v2`, ver [Configuración inicial](/docs/lovable-setup/project-configuration)) inicializa el cliente leyendo `import.meta.env.VITE_SUPABASE_URL` / `import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY` — **nunca** un valor hardcodeado que Lovable haya podido insertar directo en el código.
- [ ] El `.env` sigue apuntando a las credenciales de `stg` (no se reseteó a otro proyecto).
- [ ] El proyecto conectado en el conector es `stg`, no el proyecto raíz/`main`.

---

## Cómo se aplican las migraciones

Cuando hay una migración nueva en `supabase/migrations` dentro de una Pull Request:

- Apenas abres o actualizas el PR (antes de mergear), Supabase corre esa migración contra el branch de destino y **comenta el resultado directo en el PR**: éxito, o el error SQL exacto si falla.
- Si el PR apunta a `stg`, esa corrida es contra el branch `stg`. Si el PR apunta a `main`, es contra producción.
- Al mergear, como dejamos **"Deploy to production" activado** (ver paso 2 de arriba), la migración queda aplicada de verdad en el branch de destino.

> Regla práctica: si el comentario de Supabase en el PR muestra que la migración falló, **no mergees** ese PR hasta resolverlo.

Esa regla depende de que alguien lea el comentario a tiempo — no bloquea el merge por sí sola. Para que GitHub impida físicamente mergear un PR con una migración rota, activa el check de Supabase como **required check** en la configuración de branch protection del repo (**Settings → Branches → Branch protection rules**, sobre `stg` y `main` → marca el check de Supabase como obligatorio). Con esto, el botón de merge queda bloqueado hasta que la migración pase, en vez de confiar en que alguien lo note.

---

## Cómo se despliegan las Edge Functions

A diferencia de las migraciones de base de datos, **las Edge Functions no se despliegan solas** con la integración de GitHub — no existe un botón en el dashboard para "subir" el código de una función. El despliegue se hace con el **Supabase CLI** (otra excepción puntual a "solo dashboard", igual que la corrección de branches):

```bash
supabase functions deploy <nombre-de-la-function> --project-ref <project-ref>
```

Usa el `project-ref` del ambiente que corresponda:

- `project-ref` del branch `stg` → despliega a staging.
- `project-ref` del proyecto raíz (`main`) → despliega a producción.

> Como este paso no es automático, es responsabilidad de quien libera el cambio ejecutarlo como parte del release (ver [Flujo de release día a día](/docs/lovable-ops/release-flow)) — un PR mergeado con cambios en `supabase/functions/` **no implica** que la function ya esté desplegada.

---

## Checklist final

- [ ] Proyecto de Supabase creado (representa `main`/producción)
- [ ] GitHub Integration conectada, directorio de trabajo correcto
- [ ] "Automatic branching" **desactivado**
- [ ] Branch persistente `stg` creado
- [ ] Mapeo verificado: `main` ligado a git `main`, `stg` (persistente) ligado a git `stg`
- [ ] Credenciales de `main` y `stg` identificadas (URL + publishable key + Secrets, una por ambiente)
- [ ] `dev` configurado para usar las credenciales de `stg`
- [ ] Conector nativo de Lovable (More → Cloud → Supabase) conectado **solo** a `stg`, nunca a `main`
- [ ] `src/integrations/supabase/client.ts` usa `import.meta.env.VITE_SUPABASE_*` (sin valores hardcodeados)
- [ ] Check de Supabase configurado como **required check** en branch protection de `stg` y `main` (bloquea el merge si una migración falla)

---

## Referencias

- Supabase — [Branching](https://supabase.com/docs/guides/deployment/branching)
- Supabase — [Branching via the dashboard](https://supabase.com/docs/guides/deployment/branching/dashboard)
- Supabase — [GitHub Integration](https://supabase.com/docs/guides/deployment/branching/github-integration)
- Supabase — [Deploy Edge Functions](https://supabase.com/docs/guides/functions/deploy)
- Supabase — [CLI Reference](https://supabase.com/docs/reference/cli/introduction)
- Lovable — [Connect to Supabase](https://docs.lovable.dev/integrations/supabase)
