---
title: Sentry
sidebar_position: 1
slug: /frontend/quality/error-handling/sentry
---

[Sentry](https://sentry.io) es una plataforma de monitoreo de errores en tiempo real que nos permite detectar, diagnosticar y resolver problemas en nuestras aplicaciones. Nos brinda visibilidad sobre excepciones, errores de red, problemas de rendimiento y más, directamente desde los entornos de producción.

### Beneficios

- Detección de errores en tiempo real antes de que el usuario los reporte
- Visibilidad sobre excepciones, errores de red y problemas de rendimiento
- Trazabilidad completa con stack traces, contexto del usuario y entorno
- Reducción del tiempo de diagnóstico y resolución de bugs

---

## 🎯 Objetivo

El objetivo inicial es ser **preventivos** con los errores y no **reactivos**.  
Esto significa detectar problemas antes de que impacten al usuario final, estableciendo una cultura de observabilidad continua en todos los entornos.

**Caso real:**  
Un cliente reportó un fallo a las 10 p.m.  
Al revisar en Sentry, se comprobó que no era un error de la plataforma, sino un **network error del usuario**. Gracias a esto, tuvimos visibilidad inmediata y evitamos una falsa alarma.

---

## 🧩 Roadmap

La incorporación de Sentry en la organización se hará de forma progresiva, siguiendo una serie de _milestones_ que nos guiarán paso a paso.

La idea no es solo instalar la herramienta, sino **refinar su funcionamiento dentro de cada proyecto**, ajustando configuraciones, métricas y alertas a medida que avanzamos.

De esta manera, aseguramos que Sentry evolucione junto a nuestros procesos y nos brinde la **máxima visibilidad y valor a largo plazo**.

---
