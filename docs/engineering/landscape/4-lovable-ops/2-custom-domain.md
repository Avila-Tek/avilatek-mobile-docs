---
title: Configurar el dominio
sidebar_position: 2
slug: /lovable-ops/custom-domain
---

Con los dos proyectos de Cloudflare Worker ya desplegando ([Deploy del frontend en Cloudflare](/docs/lovable-ops/cloudflare-deploy)), el último paso es asignarle una URL propia a cada uno.

> No existe un camino por CLI para este paso: la configuración de dominios en Workers se hace **únicamente desde el dashboard** (o vía API), Wrangler no lo soporta.

---

## Dominio vs. subdominio

Antes de configurar nada, es importante tener clara la diferencia:

- **Dominio (dominio nuevo/apex)**: una propiedad independiente (ej. `cliente.com`). Hay que **registrarlo/comprarlo** aparte, y tiene su **propia zona de DNS** que hay que gestionar (o mover a Cloudflare) por separado. Es trabajo administrativo adicional y depende de que el cliente sea dueño de ese dominio y nos dé acceso a él.
- **Subdominio**: un prefijo dentro de una zona de DNS que **ya existe** (ej. `cliente.avilatek.net` es un subdominio de `avilatek.net`). No hay que registrar nada nuevo ni pedir acceso a nadie — se crea directo dentro de una zona que ya administramos.

En la práctica, un subdominio es prácticamente gratis (en tiempo y en gestión) porque no depende de infraestructura de terceros, mientras que un dominio nuevo implica compra, transferencia de DNS y coordinación con el cliente.

---

## Regla del equipo: todo despliegue se entrega en un subdominio de `avilatek.net`

**A todos los clientes se les entrega el proyecto en un subdominio de `avilatek.net`** — no se registra un dominio nuevo por cliente. Esto aplica tanto a producción como a staging:

- **Producción**: `<cliente>.avilatek.net`
- **Staging**: `stg.<cliente>.avilatek.net`

`<cliente>` es un slug corto y consistente del nombre del proyecto/cliente (mismo criterio de naming que ya usas para los proyectos de Cloudflare, ver [Deploy del frontend en Cloudflare](/docs/lovable-ops/cloudflare-deploy)).

> Si en algún momento el cliente pide explícitamente usar su propio dominio (`cliente.com`) en vez de un subdominio de `avilatek.net`, es una excepción puntual — coordínalo con tu supervisor, ya que implica que el cliente nos dé acceso a su DNS o transfiera la zona a Cloudflare.

---

## 1) Subdominio de producción

1. **Workers & Pages** → selecciona el proyecto **`<proyecto>-prod`**.
2. Ve a **Settings → Domains & Routes**.
3. **Add → Custom Domain**.
4. Escribe `<cliente>.avilatek.net` → **Continue**.
5. Como `avilatek.net` ya es una zona de Cloudflare en nuestra cuenta, Cloudflare crea automáticamente el registro DNS necesario.

---

## 2) Subdominio de staging

1. **Workers & Pages** → selecciona el proyecto **`<proyecto>-stg`**.
2. Ve a **Settings → Domains & Routes**.
3. **Add → Custom Domain**.
4. Escribe `stg.<cliente>.avilatek.net` → **Continue**.
5. Cloudflare crea el registro DNS correspondiente automáticamente (mismo caso: zona en la misma cuenta).

---

## Orden importante (evitar el error 522)

Siempre agrega el subdominio **primero desde el proyecto de Worker** (pasos de arriba) y deja que Cloudflare cree el registro DNS por ti. Si creas manualmente el registro DNS (CNAME) antes de asociarlo al Worker desde esta pantalla, el dominio queda apuntando a nada y da error `522`.

---

## Excepción: el cliente insiste en su propio dominio

Si, como excepción coordinada con tu supervisor, el proyecto sí debe usar un dominio propio del cliente (no un subdominio de `avilatek.net`):

1. Igual empieza por **Add → Custom Domain** en el proyecto de Worker correspondiente, con el dominio del cliente.
2. Si el dominio del cliente ya es una zona de Cloudflare en nuestra cuenta, Cloudflare crea el registro automáticamente (igual que con `avilatek.net`).
3. Si el dominio vive en un DNS externo (el registrador o DNS del cliente), Cloudflare te va a dar un valor de **CNAME** para crear manualmente ahí. Espera la propagación y verifica que el dominio quede activo en **Domains & Routes**.

---

## Checklist final

- [ ] Subdominio de producción (`<cliente>.avilatek.net`) asignado a `<proyecto>-prod`
- [ ] Subdominio de staging (`stg.<cliente>.avilatek.net`) asignado a `<proyecto>-stg`
- [ ] Ambos subdominios cargan la app correctamente (sin error 522 ni certificado inválido)
- [ ] Si el proyecto usa excepcionalmente un dominio propio del cliente, quedó coordinado con el supervisor y documentado el motivo

---

## Referencias

- Cloudflare Workers — [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
