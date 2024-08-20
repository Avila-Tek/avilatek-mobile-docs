# Entidades

## Clases

### Nombrado de entidades

Las entidades **deben** tener nombres que representen de forma clara y directa la entidad del dominio que simbolizan. **No deben** incluir prefijos ni sufijos innecesarios como `Entity`, `Object` o similares.

Los nombres de las entidades **deben** estar en singular y en caso de ser compuestos, **deben** estar en _PascalCase_.

```dart
class User { }

class CivilStatus { }
```

**Ejemplos adicionales:**

- En el caso de representar un producto en un sistema de inventario, la entidad debería llamarse `Product`.
- Para representar una factura, la entidad debería llamarse `Invoice`.

### Extensión de la clase `Equatable`

#### A. Contexto del uso de `Equatable`

En Dart, las clases no comparan instancias basadas en sus atributos de manera predeterminada; en su lugar, se comparan utilizando la referencia en memoria. Esto quiere decir que dos instancias de una clase con los mismos valores de atributos serían consideradas diferentes si no se anulan los métodos `==` y `hashCode`. Es por ello que para asegurarse de poder comparar las entidades, se hará uso del paquete `Equatable`.

#### B. Implementación

Las entidades **deben** extender de la clase `Equatable` para facilitar la comparación de instancias, asegurando que las entidades se consideren iguales si tienen los mismos valores en sus atributos.

```dart
import 'package:equatable/equatable.dart';

class User extends Equatable {
  final String id;
  final String name;

  // Resto del código...

  @override
  List<Object?> get props => [id, name];
}
```

Para profundizar un poco más en el tema, se recomienda leer la documentación oficial de [Equatable](https://pub.dev/packages/equatable).

### Documentación de la entidad

Cada entidad **debe** estar acompañada de comentarios que describan su propósito, uso, y cualquier detalle relevante sobre su funcionamiento o estructura. Estos comentarios **deben** estar ubicados en la parte superior de la clase, justo antes de la declaración de la misma y **deben** ir en inglés.

```dart
/// [User] contains all basic information about any user inside
/// the application.
/// This includes their unique id, email and name.
class User extends Equatable {
  //...
}
```
