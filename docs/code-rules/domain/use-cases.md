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

## Constructor

### Inyección de dependencias

Los casos de uso **deben** recibir las dependencias necesarias a través de su constructor. Estos parámetros nombrados se declaran como `required` y **deben** ser interfaces, **no** implementaciones concretas. Esto permite garantizar que el caso de uso esté desacoplado de la lógica de otras capas ajenas al dominio, manteniendo así una arquitectura limpia y escalable.

```dart
    class AuthUseCase {
      const AuthUseCase({
        required IAuthRepository authRepository,
      });
    }
```

### Almacenamiento de dependencias

Las dependencias **deben** ser almacenadas en variables privadas de la clase, para que solo estén disponibles dentro del caso de uso. Estas se declaran como `final` para asegurar que no se puedan modificar una vez asignadas en el constructor.

La implementación completa del constructor con las dependencias de la clase se vería de la siguiente manera:

```dart
    class AuthUseCase {
      const AuthUseCase({
        required IAuthRepository authRepository,
      }) : _authRepository = authRepository;

      final IAuthRepository _authRepository;

    }
```
