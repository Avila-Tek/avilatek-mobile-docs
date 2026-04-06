---
slug: /frontend/components/component-structure
title: Estructura de un componente
sidebar_position: 3
---

En esta sección se definen las convenciones para nombrar, crear y organizar internamente los componentes de React en nuestros proyectos.

## Nombrar componentes

✅ PascalCase

✅ Por intención: ProductFiltersPanel, CartSummaryBar

## Creación (reglas del archivo)

Los componentes deben ser React Functional Components y pueden crearse con los snippets `rfce` o `rfc`.

❌ No se permite el uso de React Arrow Function Components.

✅ Un solo componente por archivo (1 archivo = 1 componente exportado).

## Preferir componentes pequeños

✅ Si un componente supera ~150–200 líneas o mezcla 2 responsabilidades → split

✅ Si un return JSX parece “una página entera” → split en subcomponentes

## Estructura de un componente

### 1. Imports

Utiliza alias de ruta (`@/`) en lugar de rutas relativas largas para mantener los imports legibles y consistentes.

```ts
// ❌
import { Button } from '../../../components/ui/Button';

// ✅
import { Button } from '@/components/ui/Button';
```

### 2. Tipos e Interfaces (TypeScript)

Justo después de imports y antes del componente.

Si el componente recibe props, definir interface [ComponentName]Props.

```ts
interface WalletFormProps {
  formType: 'create' | 'update';
  data?: TWalletBankAccount;
  currencies: TCurrency[];
}
```

### 3. Hooks (incluye state, refs, hooks custom y effects)

Orden interno recomendado:

- State
- Refs
- Custom hooks
- Effects (React.useEffect)

```tsx
// State
const [user, setUser] = React.useState<string>('');

// Refs
const inputRef = React.useRef<HTMLInputElement>(null);

// Custom hooks
const { data } = useCustomHook();

// Effects
React.useEffect(() => {
  // side effects
}, []);
```

### 4. Derived values (valores derivados)

Variables calculadas desde props/estado, sin side effects.

```tsx
const isEditing = formType === 'update';
const userName = user?.name ?? '—';
```

### 5. Handlers (funciones / manejadores de eventos)

Antes del return.

Convención: handleX / onX.

```tsx
const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  // submit logic
};
```

### 6. JSX (return)

El return debe contener solo JSX (sin lógica compleja).

```tsx
return <form onSubmit={handleSubmit}>{/* UI */}</form>;
```

**Ejemplo**

```tsx
import React from 'react';

interface WalletFormProps {
  formType: 'create' | 'update';
  data?: TWalletBankAccount;
  currencies: TCurrency[];
}

export default function WalletForm({
  formType,
  data,
  currencies,
}: WalletFormProps) {
  // 1) Hooks — state
  const [user, setUser] = React.useState<string>('');

  // 1) Hooks — refs
  const inputRef = React.useRef<HTMLInputElement>(null);

  // 1) Hooks — custom hooks
  useCustomHook();

  // 1) Hooks — effects
  React.useEffect(() => {
    // side effects
  }, []);

  // 2) Derived values
  const isEditing = formType === 'update';

  // 3) Handlers
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // submit logic
  };

  // 4) JSX
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
    </form>
  );
}
```
