---
title: Deploy rápido de un HTML suelto
sidebar_position: 4
slug: /lovable-ops/quick-html-deploy
---

Todo lo documentado en [Deploy del frontend en Cloudflare](/docs/lovable-ops/cloudflare-deploy) es para el flujo normal de un proyecto (Lovable + repo + branches `dev`/`stg`/`main`). Pero si lo que necesitas es publicar rápido **un HTML suelto o un puñado de archivos estáticos** (sin build, sin GitHub, sin ambientes) — por ejemplo un one-pager o un prototipo — Cloudflare tiene un flujo aparte, mucho más simple: **Direct Upload**.

> **Importante:** el acceso a la cuenta de Cloudflare se gestiona a través de tu supervisor. Si no tienes acceso, solicítalo antes de empezar.

> Documentación oficial de referencia: Cloudflare Pages — [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

> Esto crea un tipo de proyecto distinto (un proyecto "Pages" servido en `<nombre>.pages.dev`), no un Worker conectado a Git como los del flujo normal. Si ese HTML suelto más adelante se convierte en un proyecto real con repo y ambientes, no se puede "convertir" — hay que crear un proyecto nuevo siguiendo la guía de [Deploy del frontend en Cloudflare](/docs/lovable-ops/cloudflare-deploy).

---

## Pasos (dashboard)

1. **Workers & Pages → Create application**.
2. Busca la opción de arrastrar archivos (**"Drag and drop your files"** / **Get started**, en la misma pantalla de creación — no hace falta entrar primero a ninguna pestaña de Git).
3. Ponle un nombre al proyecto.
4. Arrastra una **carpeta** (o un `.zip`) con tus archivos — no se puede soltar un único archivo `.html` suelto, tiene que venir dentro de una carpeta.
5. **Importante:** para que el sitio cargue al entrar al dominio (`/`), la carpeta debe tener un archivo `index.html` en la raíz. Si solo tienes `pagina.html`, renómbralo a `index.html` (o vas a tener que entrar con `/pagina.html` en la URL).
6. **Deploy site**.

---

## Actualizar el contenido después (ya hay una versión desplegada)

A diferencia de los proyectos conectados a Git, acá **no hay rebuild automático**: si ya desplegaste este HTML antes y ahora tienes una versión nueva, no crees un proyecto aparte — vuelve al **mismo proyecto** y sube la carpeta actualizada.

**Por dashboard:**

1. **Workers & Pages** → entra al proyecto que ya existe (no uses "Create application" de nuevo).
2. Ve a la pestaña **Deployments** → **Create deployment**.
3. Elige si la nueva versión va a **Production** o a un ambiente de **Preview**.
4. Arrastra de nuevo la carpeta completa (con los archivos actualizados) y confirma.

El dominio que ya tenías configurado (si aplica) no se toca — apunta automáticamente al último deployment de producción.

**Por CLI:** si vas a repetir esto seguido, es más rápido con Wrangler — ver [Alternativa por CLI](#alternativa-por-cli-para-quien-vaya-a-repetir-el-deploy-seguido) más abajo. El mismo comando (`npx wrangler pages deploy <carpeta> --project-name <nombre-del-proyecto>`) sirve tanto para el primer deploy como para las actualizaciones siguientes, siempre que uses el mismo nombre de proyecto.

---

## Dominio

Igual que los proyectos normales, el dominio se asigna por dashboard y sigue la misma convención del equipo: subdominio de `avilatek.net` (ver el detalle completo de la convención en [Configurar el dominio](/docs/lovable-ops/custom-domain)).

1. En el proyecto recién creado, ve a **Settings → Domains & Routes**.
2. **Add → Custom Domain**.
3. Escribe el subdominio que corresponda (ej. `<cliente>.avilatek.net`) → **Continue**.
4. Como `avilatek.net` ya es una zona de Cloudflare en nuestra cuenta, Cloudflare crea automáticamente el registro DNS necesario.

> Mismo orden importante que en el flujo normal: agrega el dominio **primero desde el proyecto** y deja que Cloudflare cree el registro DNS por ti. Si creas el registro DNS a mano antes de asociarlo aquí, el dominio queda apuntando a nada y da error `522`.

Si el HTML suelto es solo un prototipo interno o no se va a compartir con un cliente, también es válido dejarlo en su URL automática de `<nombre>.pages.dev` y no configurar dominio.

---

## Límites a tener en cuenta

- Máximo **25 MiB por archivo**.
- Máximo **1,000 archivos** por deploy arrastrando desde el dashboard (con Wrangler CLI el límite sube a 20,000 archivos — solo menciónalo si algún caso puntual lo necesita).

---

## Alternativa por CLI (para quien vaya a repetir el deploy seguido)

Si vas a estar actualizando este HTML seguido, repetir el drag-and-drop cada vez es tedioso. Wrangler tiene el mismo flujo sin dashboard:

```bash
npx wrangler pages deploy <carpeta-con-tus-archivos>
```

La primera vez te va a pedir nombre de proyecto — no necesita repo ni configuración adicional. Para actualizaciones siguientes, corre el mismo comando indicando el nombre del proyecto ya creado:

```bash
npx wrangler pages deploy <carpeta-con-tus-archivos> --project-name <nombre-del-proyecto>
```

Esto sube la carpeta como un nuevo deployment sobre el proyecto existente, sin crear uno nuevo.

---

## Referencias

- Cloudflare Pages — [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)
- Cloudflare Workers — [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
