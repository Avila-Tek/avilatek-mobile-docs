# Casos de uso

## Clases

### Nombrado de la clase

El nombre de la clase de un caso de uso **debe** reflejar claramente la funcionalidad que gestiona, acompañado del sufijo `UseCase`. **Debe** estar en singular, y en caso de ser compuesto por más de una palabra, estar en _PascalCase_.

```dart
    /// Para un caso de uso que gestiona la autenticación
    class AuthUseCase { }

    /// Para un caso de uso que gestiona las notificaciones push de la aplicación
    class PushNotificationUseCase { }

    /// Para un caso de uso que gestiona la configuración remota de la aplicación
    class RemoteConfigUseCase { }
```
