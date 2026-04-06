---
title: Domain layer
sidebar_position: 1
slug: /frontend/quality/testing/testing-by-layer/domain-test
---

### 🧠 Domain Layer - Lógica de Negocio Pura

### Qué testear aquí
- Reglas de negocio (`canUserPost`, `validateEmail`)
- Transformaciones de datos
- Funciones puras (siempre mismo output para mismo input)

### Ejemplo
```typescript
// features/users/domain/__tests__/user.logic.test.ts
describe('User Validation', () => {
  test('corporate email is valid', () => {
    expect(isCorporateEmail('user@avilatek.com')).toBe(true);
  });
  
  test('calculates level correctly based on points', () => {
    const user = { points: 150 };
    expect(calculateUserLevel(user)).toBe(3);
  });
});
```

### Características
- ✅ Sin mocks
- ✅ Ejecución instantánea
- ✅ Determinísticos
