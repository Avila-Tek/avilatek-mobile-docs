---
title: Variables de Entorno
sidebar_position: 3
slug: /lovable-setup/environment-variables
---

# Manejo de Variables de entorno en Lovable (Frontend + Edge Functions)

## Introducción: ¿qué es una variable de entorno?

Una **variable de entorno** (env) es un valor de configuración que tu app lee al ejecutarse o al compilarse, por ejemplo:

- URLs (API, Supabase, CDN)
- “Keys” públicas (publishable keys)
- flags de comportamiento (`VITE_FEATURE_X=true`)

La idea es **no hardcodear valores dentro del código** para poder cambiar la configuración según el entorno (desarrollo, qa, producción) sin tocar lógica.  

---

## La regla más importante: **público vs secreto**

En Lovable hay dos mundos:

1) **Frontend (Vite)** → variables **públicas**  
   - Se incluyen en el código que corre en el navegador.
   - Si alguien abre DevTools o inspecciona el bundle, puede verlas.
   - En Vite, solo se exponen al cliente las variables con prefijo **`VITE_`**.

2) **Backend / Edge Functions (Supabase)** → variables **secretas**  
   - Se guardan de forma cifrada/segura.
   - Se inyectan en el backend y **no** se exponen al navegador.
   - Como el backend vive en un **proyecto de Supabase externo** (no Lovable Cloud), los secretos se guardan en el **Secrets Manager de ese proyecto de Supabase**, y hay uno distinto por ambiente (`main`/`stg`).

> **Conclusión:** Si es un secreto (token privado, API key secreta, credenciales), **NO va en el frontend**.

---

## 1) Variables de entorno en el Frontend (Lovable + Vite)

Lovable usa Vite para el frontend. En Vite:

- Las variables se leen desde archivos `.env*` y se acceden en el código con **`import.meta.env`**.
- Se “reemplazan” de forma estática durante el build (build-time).
- Para que una variable esté disponible en el navegador debe empezar con **`VITE_`**.

### Dónde se ponen

En proyectos Lovable normalmente existe un **archivo `.env` en el repo**, porque el frontend necesita esos valores para compilar. Esto es especialmente común para valores “públicos” como configuración de Supabase.

> **Disclaimer (importante):** En la mayoría de proyectos, **guardar un `.env` en el repositorio es una mala práctica**, porque es fácil que alguien termine metiendo **secretos** (tokens, claves privadas) por accidente.

### ¿Por qué el `.env` del frontend puede quedar en el repo?

Lovable necesita tener acceso al archivo .env para poder compilar el frontend, por lo tanto, lo que va ahí **no debería ser secreto**. Al final, todo `VITE_*` termina en el bundle del navegador, así que guardarlo “en git” no cambia mucho el riesgo (ya es público). La seguridad real es: **no meter secretos** en `VITE_*`.

---

## 2) Variables de entorno en Edge Functions (backend)

Para secretos y configuración sensible, el proyecto de **Supabase** (el backend externo del proyecto) ofrece su propio **Secrets Manager**:

- Guardas valores sensibles (API keys, tokens, credenciales).
- Se almacenan de forma segura y se inyectan en las Edge Functions.
- Como el proyecto tiene branching `main`/`stg`, **cada ambiente tiene sus propios Secrets** (no se comparten ni se copian automáticamente entre `main` y `stg`).

### Cómo se usan dentro de una Edge Function

El patrón típico en Supabase Edge Functions (Deno) es leerlos desde el entorno dentro de la función (por ejemplo con `Deno.env.get(...)`).  
> El punto clave: **se leen en el backend**, no en el browser.

---

## Patrón recomendado en Lovable

### A) Frontend (público)

- Guardar en `.env` del repo **solo** variables `VITE_*` que no sean secretas.
- Ejemplos comunes:
  - URLs públicas
  - publishable keys
  - flags no sensibles

### B) Edge Functions (secreto)

- Guardar secretos en el **Secrets Manager de Supabase** (del ambiente correspondiente: `main` o `stg`).
- Ejemplos:
  - `STRIPE_SECRET_KEY`
  - `OPENAI_API_KEY`
  - tokens privados
  - service-role keys, credenciales, etc.

### C) “Necesito usar un secreto desde el frontend”

No lo expongas. En su lugar:

1. El frontend llama a una **Edge Function**
2. La Edge Function usa el secreto internamente
3. La Edge Function devuelve solo el resultado necesario

Esto mantiene el secreto fuera del navegador.

---

## Checklist de problemas comunes

- **Me sale `undefined` al intentar usar la variable en el frontend**
  - ¿La variable empieza con `VITE_`?
  - ¿La estás leyendo con `import.meta.env.VITE_...`?
  - ¿Reiniciaste el preview/dev server después de agregarla?

- **Estoy intentando meter un secreto en el frontend**
  - No lo hagas: pásalo a **Secrets** y úsalo en Edge Functions.

---

## Resumen

- **Frontend (Vite)**: `VITE_*` → público, vive en `.env`/`.env.local`, accesible por `import.meta.env`.
- **Edge Functions**: secretos en el Secrets Manager de Supabase (por ambiente) → privado, disponible solo en backend.

---

## Referencias

- Vite — [Env Variables and Modes](https://vite.dev/guide/env-and-mode)
- Supabase — [Environment Variables (Secrets) para Edge Functions](https://supabase.com/docs/guides/functions/secrets)
- Lovable — [Deploying and hosting outside Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting)
