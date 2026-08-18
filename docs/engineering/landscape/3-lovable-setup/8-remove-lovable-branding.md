---
title: Quitar el branding de Lovable antes de publicar
sidebar_position: 8
slug: /lovable-setup/remove-lovable-branding
---

Lovable inserta, por defecto, un par de cosas en el código del proyecto que identifican que fue construido ahí. En Landscapes eso no debe llegar a `stg` ni a `main`, porque son los ambientes que ve el cliente — el cliente no debería enterarse de qué herramienta usamos para construir su producto.

> Esta página documenta una práctica del equipo, no un flujo oficial de Lovable: Lovable no publica una guía para "quitar su branding al desplegar fuera de su propio hosting", porque su flujo por defecto asume que publicas con su botón Publish (algo que nosotros no hacemos — ver [Despliegue y Operación](/docs/lovable-ops)). Verifica siempre visualmente en `stg` después de aplicar esto.

---

## Qué deja Lovable en el código por defecto

1. **El badge "Edit with Lovable"**: un elemento visible en pantalla (normalmente con `id="lovable-badge"`) que enlaza de vuelta al proyecto en Lovable.
2. **Un script en `index.html`**: una línea como

   ```html
   <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
   ```

   acompañada de un comentario de Lovable pidiendo explícitamente no tocarla ("DO NOT REMOVE THIS SCRIPT TAG OR THIS VERY COMMENT!"). Este script es el que habilita la edición visual dentro del editor de Lovable (poder hacer clic en un elemento de la preview y que te lleve al código correspondiente) — no es necesario para que la app funcione de cara a un usuario final.

---

## Por qué no basta con el plan Pro de Lovable

Lovable ofrece ocultar el badge desde el workspace si el plan es Pro o superior. Esa opción resuelve el problema **cuando publicas con el botón Publish de Lovable** (dominios `*.lovable.app` o un dominio conectado directo en Lovable).

Nosotros no usamos ese botón: `stg` y `main` se despliegan por Cloudflare directo desde el repo de GitHub (ver [Deploy del frontend en Cloudflare](/docs/lovable-ops/cloudflare-deploy)). Lo que se despliega ahí es exactamente lo que esté commiteado en el repo — no hay ningún paso de Lovable en el medio que oculte el badge o el script por nosotros. Por eso, si estas dos cosas quedan en el código, van a aparecer en `stg` y `main` sin importar el plan del workspace.

---

## Qué hacemos: quitarlo antes de que llegue a `stg`

El script y el badge **sí pueden quedarse en `dev`**, porque ahí es donde se usa el editor visual de Lovable y son los que habilitan esa edición interactiva. El corte se hace al preparar el PR `dev → stg` (ver [Manejo de ramas](/docs/lovable-setup/branch-management)):

1. **Badge**: busca `lovable-badge` en el código (suele estar en el layout raíz o inyectado junto al script de abajo) y quítalo, o si prefieres no tocar el componente, ocúltalo por CSS:

   ```css
   #lovable-badge {
     display: none !important;
   }
   ```

2. **Script**: quita la línea `<script src="https://cdn.gpteng.co/gptengineer.js" ...></script>` (y el comentario que la acompaña) de `index.html`.

Incluye ese diff como parte del PR `dev → stg`, junto con el resto de los cambios de esa release.

> Lovable puede volver a insertar el script en futuros prompts dentro de `dev` (es parte de su scaffolding estándar) — trátalo como un chequeo que se repite en cada release hacia `stg`, no como algo que se resuelve una sola vez.

---

## Verificación

Después de cada deploy a `stg` o `main`:

- [ ] Abre el sitio y confirma que **no aparece** el badge "Edit with Lovable" en pantalla.
- [ ] Abre el código fuente de la página (view-source o el inspector del navegador) y confirma que **no hay** ninguna referencia a `gpteng.co` ni a `lovable` en el `<head>` o en los scripts cargados.

---

## Checklist final

- [ ] Badge `lovable-badge` removido u oculto antes del merge a `stg`
- [ ] Script `cdn.gpteng.co/gptengineer.js` removido de `index.html` antes del merge a `stg`
- [ ] Verificación visual hecha en `stg` (sin badge, sin script) antes de repetir el mismo chequeo al llegar a `main`
- [ ] El script y el badge siguen presentes en `dev` (no hace falta quitarlos ahí)
