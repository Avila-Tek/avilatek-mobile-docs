---
title: Deploy del frontend en Cloudflare
sidebar_position: 1
slug: /lovable-ops/cloudflare-deploy
---

> Documentación oficial de referencia: Cloudflare Workers — [Documentación oficial](https://developers.cloudflare.com/workers/).

El frontend se despliega en **Cloudflare Workers**, conectado directamente al repo de GitHub para que el deploy sea automático a través de Pull Requests — sin pasos manuales de "subir build".

Como `stg` y `main` necesitan cada uno su **propio dominio** (ver [Configurar el dominio](/docs/lovable-ops/custom-domain)), y un mismo Worker no puede tener un dominio propio por rama, creamos **dos proyectos de Worker separados sobre el mismo repo**: uno para `stg` y otro para `main`.

> **Importante:** el acceso a la cuenta de Cloudflare se gestiona a través de tu supervisor.

---

## Antes de empezar: ¿qué build genera tu proyecto?

Los proyectos de Lovable pueden generar dos tipos de build distintos para Cloudflare. Confirma cuál aplica antes de configurar el deploy:

- **SPA estática (Vite “normal”)**: el build genera solo archivos estáticos (HTML/JS/CSS) en una carpeta como `dist`. Se despliega como **Workers static assets**.
- **Build basado en Nitro** (preset `cloudflare-module`, zero-config): genera un Worker con capacidad de servidor, y el deploy se hace con `wrangler deploy` en vez de solo subir estáticos.

Los pasos de conectar el repo y configurar la rama son los mismos para ambos casos — solo cambia el **comando de build/deploy** en el paso 3.

---

## 1) Crear el Worker de staging (rama `stg`)

1. En el dashboard de Cloudflare, en el menú lateral: **Workers & Pages**.
2. **Create application** → en la pantalla que se abre, busca la opción **"Import a repository"** y haz clic en su botón **Get started**.
3. Elige tu cuenta de GitHub (autorízala si no lo habías hecho) y selecciona el repo del proyecto.
4. Nombra el proyecto, por ejemplo `<proyecto>-stg`.
5. En la sección de build, según el tipo de build del proyecto:
   - **SPA estática**: comando de build (`npm run build`) y directorio de salida (`dist`).
   - **Build con Nitro**: comando de build (ej. `npm run build` / `bun run build`) y comando de deploy `npx wrangler deploy`.
6. **Save and Deploy** (el primer deploy se dispara con la configuración por defecto — los siguientes 2 pasos se hacen **después**, ya con el proyecto creado).

Con el proyecto ya creado, entra a **Settings → Build** de `<proyecto>-stg` y ajusta:

7. **Branch control** → cambia la **production branch** a **`stg`** (por defecto Cloudflare deja la rama default del repo, normalmente `main` — hay que cambiarla explícitamente aquí).
8. En esa misma sección, **desmarca "Builds for non-production branches"**. Si queda marcada, un push a cualquier otra rama (incluida `main`) puede disparar un build de **este mismo proyecto** usando sus variables de `stg` — es una fuente real de despliegues cruzados entre ambientes.
9. En **"Build variables and secrets"** (misma pestaña **Settings → Build**, no en "Environment variables" — esa es para variables en tiempo de ejecución del Worker, y las `VITE_*` las necesita el build, no el runtime): agrega las variables `VITE_*` de este proyecto con las credenciales del branch `stg` de Supabase.

> **Si el build usa Nitro (`wrangler deploy`)**: agrega ahí mismo una variable de build para fijar explícitamente el **nombre del Worker** (por ejemplo `CF_WORKER_NAME=<proyecto>-stg`) y haz que la configuración del proyecto la use al armar `wrangler.toml`/config (el nombre del Worker no se autogenera de forma distinta por rama). Sin esto, los dos proyectos pueden terminar desplegando al **mismo Worker físico** — el último deploy gana y se pierde la separación entre `stg` y `main`.

10. Guarda y dispara un nuevo deploy para que tome la configuración (los cambios en Settings → Build no aplican retroactivos al deploy que ya corrió).

Con esto, cada push a `stg` (por ejemplo al mergear el PR `dev → stg`) dispara un deploy automático de este Worker.

---

## 2) Crear el Worker de producción (rama `main`)

Repite el mismo proceso (Workers & Pages → Create application → Import a repository → mismo repo), pero:

1. Nombra el proyecto, por ejemplo `<proyecto>-prod`.
2. Una vez creado, en **Settings → Build → Branch control**: production branch = `main`.
3. **Desmarca "Builds for non-production branches"** también aquí.
4. En **"Build variables and secrets"**: si aplica Nitro, fija el nombre del Worker (ej. `CF_WORKER_NAME=<proyecto>-prod`); y agrega las variables `VITE_*` con las credenciales del proyecto **raíz** de Supabase (producción).
5. Guarda y dispara un nuevo deploy.

Cada push a `main` (al mergear el PR `stg → main`) dispara el deploy automático de producción.

---

## 3) Qué pasa con las Pull Requests

Cada proyecto de Worker genera automáticamente una **preview URL** cuando hay una Pull Request abierta contra su production branch:

- El PR `dev → stg` genera preview en el proyecto `<proyecto>-stg`.
- El PR `stg → main` genera preview en el proyecto `<proyecto>-prod`.

Esa preview URL queda comentada en el propio PR de GitHub — es lo que revisas antes de mergear.

> Nota: si ambos proyectos de Worker están conectados al mismo repo, es posible que el comentario del PR en GitHub solo muestre el resultado de uno de los dos deploys (una limitación conocida de Cloudflare cuando dos Workers observan el mismo repo). Si no ves el comentario esperado, revisa directamente la pestaña **Deployments** de cada proyecto en el dashboard.

---

## Cosas a tener en cuenta

- **Las variables de entorno, secrets y bindings NO se comparten** entre `<proyecto>-stg` y `<proyecto>-prod` — son dos proyectos de Worker independientes. Cualquier variable nueva hay que agregarla en **ambos**, con el valor correcto para cada ambiente.
- **"Build variables and secrets" (Settings → Build) ≠ "Environment variables" (Settings → Environment variables)**: las `VITE_*` van en la primera (se usan al compilar), no en la segunda (esas son para el Worker en tiempo de ejecución). Si las pones en el lugar equivocado, el build no las va a ver.
- **"Builds for non-production branches" debe quedar desmarcado en ambos proyectos** — es la protección contra que un push a la rama equivocada dispare un build con las variables del otro ambiente.
- **Si el build es con Nitro/`wrangler deploy`, el nombre del Worker debe fijarse por variable de entorno** (ej. `CF_WORKER_NAME`) — de lo contrario ambos proyectos pueden colisionar en un solo Worker real.
- **Los minutos de build se comparten a nivel de cuenta** de Cloudflare (no son un pool aparte por proyecto), así que tener dos proyectos consume del mismo total mensual.
- Si cambias variables de entorno, el Worker necesita un **redeploy** para tomar el nuevo valor (no basta con guardarlas).

---

## Siguiente paso: dominio propio para cada proyecto

Con los dos Workers ya desplegando, todavía están sirviendo en sus URLs automáticas de `workers.dev` — falta asignarle su dominio real a cada uno:

- `<proyecto>-prod` → subdominio de producción bajo `avilatek.net` (ej. `cliente.avilatek.net`).
- `<proyecto>-stg` → subdominio de staging (ej. `stg.cliente.avilatek.net`).

Eso se hace por dashboard, en **Settings → Domains & Routes** de cada proyecto — el detalle completo (incluyendo el caso de DNS externo y el error 522 si el orden de los pasos se invierte) está en [Configurar el dominio](/docs/lovable-ops/custom-domain).

---

## Checklist final

- [ ] Proyecto `<proyecto>-stg` creado, production branch = `stg`, variables apuntando a Supabase `stg`
- [ ] Proyecto `<proyecto>-prod` creado, production branch = `main`, variables apuntando a Supabase `main`
- [ ] "Builds for non-production branches" desmarcado en **ambos** proyectos
- [ ] (Si aplica Nitro) nombre del Worker fijado por variable en **ambos** proyectos, y son distintos entre sí
- [ ] Ambos proyectos hicieron su primer deploy sin errores
- [ ] Se confirmó que un PR contra `stg` y contra `main` generan su preview correspondiente
- [ ] Dominio/subdominio propio configurado en ambos proyectos (ver [Configurar el dominio](/docs/lovable-ops/custom-domain))

---

> ¿Solo necesitas publicar un HTML suelto o un puñado de archivos estáticos, sin repo ni build? Ese es un flujo aparte, mucho más simple — ver [Deploy rápido de un HTML suelto](/docs/lovable-ops/quick-html-deploy).

## Referencias

- Cloudflare Workers — [Git integration (Workers Builds)](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/)
- Cloudflare Workers — [Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- Cloudflare Workers — [Single Page Application (SPA) routing](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/)
- Cloudflare Workers — [Wrangler commands (`wrangler deploy`)](https://developers.cloudflare.com/workers/wrangler/commands/)
