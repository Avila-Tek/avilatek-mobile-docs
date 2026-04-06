---
title: Infrastructure layer
sidebar_position: 2
slug: /frontend/quality/testing/testing-by-layer/infrastructure-test
---

### 🔌 Infrastructure Layer - Servicios y APIs

### Qué testear aquí
- Transformaciones DTO ↔ Domain
- Llamadas a APIs (mockeadas)
- Manejo de errores

### Ejemplo

```typescript
// features/users/infrastructure/__tests__/user.service.test.ts
describe('UserService', () => {
  let mockHttp: jest.Mocked<HttpClient>;
  let service: UserService;
  
  beforeEach(() => {
    mockHttp = { get: jest.fn(), post: jest.fn() };
    service = new UserService(mockHttp); // aplicando DI
  });
  
  test('correctly transforms API response', async () => {
    // Arrange
    mockHttp.get.mockResolvedValue({
      data: {
        id: '123',
        full_name: 'Ana García',
        is_active: true
      }
    });
    
    // Act
    const result = await service.getUser('123');
    
    // Assert
    expect(result.name).toBe('Ana García');
    expect(result.status).toBe('ACTIVE');
  });
});
```

### Tipos de tests
- Transformación de datos
- Comportamiento con errores
- Múltiples llamadas coordinadas
