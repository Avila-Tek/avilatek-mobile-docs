---
title: Estilos y Tailwind
sidebar_position: 1
slug: /frontend/components/tailwind
---

Es indispensable para una aplicación tener estilos estandarizados, puesto que afecta directamente la velocidad de desarrollo y la satisfacción del usuario, además, nos permite estar preparados para posibles cambios y asegura consistencia en los estilos.

## Configuración de colores
Se declaran los colores que serán implementados en nuestra configuración para el sistema.
```tsx
// 📁 /apps/clients/src/css/color-variables.css

@theme {
  /* Gray Dark Mode Alpha Colors */
  --color-gray-dark-alpha-950: #ffffff00;

  /* Gray Dark Mode Colors */
  --color-gray-dark-50: #fafafa;

  /* Gray Light Mode Colors */
  --color-gray-light-900: #fcfcfd;

  --color-gray-light-mode-900: var(--color-gray-light-900);

  --color-gray-dark-mode-50: var(--color-gray-dark-50);

  --color-gray-dark-alpha-mode-950: var(--color-gray-dark-alpha-950);
}
```

## Configuración light/dark mode

Estas son las clases que usaremos en nuestros componentes para manejar los estilos en light y dark mode.

### Texto
```tsx
// 📁 /apps/clients/src/css/text-variables.css

@utility txt-primary-900 {
  @apply text-gray-light-mode-900;
  @apply dark:text-gray-dark-mode-50;
}
```

### Bordes
```tsx
// 📁 /apps/clients/src/css/border-variables.css

@utility border-primary {
  @apply border-gray-light-mode-300;
  @apply dark:border-gray-dark-mode-700;
}
```

### Background
```tsx
// 📁 /apps/clients/src/css/bg-variables.css

@utility bg-surface {
  @apply bg-base-white;
  @apply dark:bg-gray-dark-mode-950;
}
```

### Foreground
```tsx
// 📁 /apps/clients/src/css/fg-variables.css

@utility fg-primary-900 {
  @apply border-gray-light-mode-900;
  @apply dark:border-base-white;
  @apply bg-gray-light-mode-900;
  @apply dark:bg-base-white;
}
```

## Configuraciones globales
Por último, creamos un archivo que contenga toda la configuración previamente establecida para nuestro proyecto. Este archivo debe ser importado en el layout de la aplicación, para así aplicar los estilos en todo el sistema.

```tsx
// 📁 /apps/clients/src/apps/globals.css

/* Tailwind v4 entrypoint (CSS-first) */
@import "tailwindcss";

/* Source paths for Tailwind v4 scanning (monorepo) */
@source "../../**/*.{ts,tsx}";
@source "../../../../packages/ui/src/**/*.{ts,tsx}";

/* UI package theme tokens and base styles (must be after @import tailwindcss) */
@import "@repo/ui/globals.css";

/* Design tokens (ajusta estas rutas si tu carpeta css está en otro lugar) */
@import "../css/color-variables.css";
@import "../css/bg-variables.css";
@import "../css/fg-variables.css";
@import "../css/border-variables.css";
@import "../css/text-variables.css";

@layer utilities {
  .scrollbar-color-gray::-webkit-scrollbar-thumb {
    background-color: gray;
  }
}
```