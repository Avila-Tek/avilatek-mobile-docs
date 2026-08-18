---
title: Transferencia de Contenido
sidebar_position: 3
slug: /strapi/content-transfer
---

# Transferencia de Contenido

## Objetivo

Esta guía explica cómo mover contenido entre distintos ambientes de Strapi.

La idea clave es simple: **los ambientes de Strapi no comparten contenido entre sí automáticamente**.

---

## Qué se guarda en el repo y qué no

En el repositorio normalmente queda versionado:

- El schema de datos
- Los content types
- Los componentes
- Las relaciones y el modelado general

Pero **el contenido cargado dentro de Strapi no se guarda en el repo**.

Eso significa que textos, imágenes, registros y entradas creadas desde el panel viven dentro de cada ambiente por separado.

---

## Qué significa esto en la práctica

Si tienes dos ambientes de Strapi (por ejemplo, uno de prueba y uno de producción):

- Ambos pueden tener el mismo modelado.
- Pero **no tendrán automáticamente la misma data**.

Aunque el código y el schema estén alineados, el contenido sigue siendo independiente en cada ambiente.

---

## Cómo mover contenido entre ambientes

Cuando necesites llevar contenido de un ambiente a otro, debes hacerlo de forma explícita:

1. **Exportar** la data desde el ambiente origen.
2. **Importar** esa data en el ambiente destino.

No es una sincronización automática ni algo que ocurra por hacer deploy del repo.

---

## Cuándo usar este flujo

Este proceso aplica cuando, por ejemplo:

- Cargaste contenido en un ambiente de prueba y quieres pasarlo a producción.
- Necesitas poblar un ambiente nuevo con contenido existente.
- Quieres replicar contenido entre dos instancias de Strapi.

## Alcance del export (importante)

Cuando hacemos un export de Strapi, hay que asumir que el export es **total** por defecto.

Es decir, no se exporta “solo una página” o “solo un bloque” automáticamente, sino **todo el contenido del ambiente**, junto con sus relaciones, archivos y parte de la configuración asociada.

Por eso, antes de exportar e importar entre ambientes, hay que revisar bien qué información existe en el ambiente origen y entender que el proceso mueve la información completa de esa instancia, no un cambio puntual.

---

## Importante

Antes de importar contenido, ambos ambientes deben tener un **modelado compatible**.

Si el schema no coincide, la importación puede fallar o generar inconsistencias.

> Regla práctica: el repo mueve la estructura; el export/import mueve el contenido.

---

## Como exportar e importar contenido

### 1) Exportar desde el ambiente origen

Desde el proyecto conectado al ambiente origen, ejecutar:

```bash
npm run strapi export -- --file mi-export
```

Esto genera un archivo de export con el contenido del ambiente.
Por defecto, Strapi exporta el contenido, sus relaciones, los archivos, la configuración del proyecto y los schemas.

### 2) Importar en el ambiente destino

En el proyecto conectado al ambiente destino, ejecutar:

```bash
npm run strapi import -- -f /ruta/al/archivo/export.tar.gz.enc
```

Si el archivo fue exportado con llave de encriptación, también puedes pasarla por comando:

```bash
npm run strapi import -- -f /ruta/al/archivo/export.tar.gz.enc --key mi-encryption-key
```

---

## Transferir contenido a Strapi Cloud

Además del flujo de export/import por archivo, Strapi también permite transferir contenido directamente entre instancias usando `strapi transfer`.

Esto sirve, por ejemplo, para enviar contenido desde un ambiente local o desde otra instancia de Strapi hacia un proyecto en Strapi Cloud, sin generar primero un archivo manual de export.

> Importante: la URL de destino debe ser la URL completa del panel de administración, incluyendo `/admin`.

### Requisitos

Antes de ejecutar la transferencia:

- El ambiente destino debe estar corriendo.
- Debes crear un **Transfer Token** en la instancia destino.
- Si el destino es Strapi Cloud, puedes tomar la URL del proyecto y agregar `/admin`.

> Recomendación: para este caso, el token del destino debería crearse con permisos acordes al flujo de transferencia. Si el movimiento es desde local hacia Cloud, normalmente el token se genera en el ambiente de destino para autorizar el push.

### Ejemplo hacia Strapi Cloud

```bash
npm run strapi transfer -- --to https://example.strapiapp.com/admin --to-token my-transfer-token
```

### Advertencia importante

La transferencia reemplaza el contenido existente del ambiente destino, incluyendo base de datos y assets remotos.
