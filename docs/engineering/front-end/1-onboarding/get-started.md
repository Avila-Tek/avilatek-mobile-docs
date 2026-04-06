---
slug: /frontend/onboarding/get-started
title: Primeros pasos
sidebar_position: 2
---

# Primeros pasos

Guía práctica para configurar tu entorno y empezar a contribuir al proyecto.

## 1. Herramientas necesarias

Asegúrate de tener instalado:

- [ ] [Node.js](https://nodejs.org) (versión LTS)
- [ ] [Git](https://git-scm.com)
- [ ] Editor recomendado: [VS Code](https://code.visualstudio.com)

## 2. Configurar cuenta de GitHub

- [ ] Tener una cuenta de GitHub con acceso al repositorio de la organización
- [ ] Activar **autenticación de dos factores (2FA)** en tu cuenta
- [ ] Configurar una [clave SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) para clonar repositorios

## 3. Clonar y levantar el proyecto

```bash
git clone git@github.com:<organizacion>/<nombre-del-repo>.git
cd <nombre-del-repo>
npm install
npm run dev
```

## 4. Variables de entorno

Las variables de entorno se encuentran en **TekSecrets**. Si aún no tienes acceso, solicítalo a tu líder de equipo.

Una vez obtenidas, crea un archivo `.env.local` en la raíz del proyecto y copia las variables correspondientes.

## 5. Extensiones recomendadas para VS Code

- [ ] ESLint
- [ ] Prettier
- [ ] Tailwind CSS IntelliSense
- [ ] GitLens

## 6. Accesos y cuentas

- [ ] Acceso al repositorio en GitHub
- [ ] Acceso a TekSecrets (variables de entorno)
- [ ] Acceso a la organización de Sentry

## Siguiente paso

Con el entorno listo, empieza a leer la documentación en orden desde [Welcome aboard](/docs/frontend/onboarding).
