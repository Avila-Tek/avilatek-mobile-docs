# Casos de uso

## Clases

### Nombrado de la clase

El nombre de la clase de un caso de uso **debe** reflejar claramente la funcionalidad que gestiona, acompañado del sufijo `UseCase`. **Debe** estar en singular, y en caso de ser compuesto por más de una palabra, estar en _PascalCase_.

```dart
    class AuthUseCase { }

    class PushNotificationUseCase { }
```

**Ejemplos adicionales:**

- Para el caso de uso del perfil del usuario: `ProfileUseCase`.
- Para el caso de uso de configuración remota: `RemoteConfigUseCase`.
