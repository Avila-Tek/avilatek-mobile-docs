# Modelos

## Clases

### Nombrado de modelos

Los modelos **deben** incluir el sufijo `Model` en su nombre y **deben** utilizar el mismo nombre base de la entidad correspondiente.

```dart
class UserModel { }

class ProductModel { }
```

#### A. Contextualización de nombres de clases

Los modelos **pueden** incluir en su nombre el tipo de objeto que representan. Por ejemplo, `Dto` para objetos de transferencia de datos, `Response` para objetos de respuesta, `Request` para objetos de solicitud, etc; respetando la regla de [Nombrado de modelos](#nombrado-de-modelos). Se recomienda mantener un estándar en la contextualización del nombrado de modelos dentro del mismo proyecto o paquete.

```dart
class UserDtoModel extends User { }

class CreateUserRequestModel extends CreateUserRequest { }

class UpdateUserResponseModel { }
```

### Extensión de la clase de entidad

Las clases de modelos **deben** extender de la clase entidad correspondiente.

```dart
class UserModel extends User { }

class ProductModel extends Product { }
```

#### A. Excepción de extensión

Esta regla no aplica en caso de modelos que no tienen una entidad correspondiente. Por ejemplo, modelos de datos que no representan entidades o modelos de uso limitado a la capa de datos.


## Constructores

### Constructor `fromMap`

Los modelos que requieran ser serializados de un mapa **deben** tener un [constructor *factory*](https://dart.dev/language/constructors#factory-constructors) `fromMap`.

#### A. Argumento `data`

El método `fromMap` **debe** recibir un objeto de tipo `Map<E,S>` como argumento obligatorio llamado `data`. Generalmente `E` es de tipo `String` y `S` es de tipo `dynamic`, pero esto **puede** variar de un modelo a otro.

```dart
class UserModel extends User {
  factory UserModel.fromMap(Map<String, dynamic> data) { ... }
}
```

#### B. Argumentos extra

El método `fromMap` **puede** recibir argumentos adicionales a `data`. El parámetro `data` **debe** ser posicional y el resto de parámetros **deben** ser de tipo nombrado y **pueden** ser opcionales u obligatorios.

```dart
class UserModel extends User {
  factory UserModel.fromMap(Map<String, dynamic> data, {String? extra}) {
    ... 
  }
}
```

#### C. Variables intermedias en constructores `fromMap`

Los constructores `fromMap` **deben** utilizar variables intermedias para almacenar los valores de los parámetros del constructor. 

```dart
class UserModel extends User {
  
  factory UserModel.fromMap(Map<String, dynamic> data) {
    // 👇 Variables intermedias
    final id = data['id'];
    final name = data['name'];
    
    return UserModel(id: id, name: name);
  }
}
```

#### D. Manejo de valores nulos de parámetros en constructores `fromMap`

Todos los parámetros provenientes del argumento `data` **deben** evaluar y resolver posibles valores nulos, salvo aquellos valores anulables opcionales, o aquellos que requieran una manejo especial según la necesidad del proyecto.

```dart
class UserModel extends User {
  factory UserModel.fromMap(Map<String, dynamic> data) {
    final id = data['id'] ?? ''; // 👈 Manejo de valor nulo
    final name = data['name'] ?? '';
    
    return UserModel(id: id, name: name);
  }
}
```


## Atributos 

### Herencia de atributos de la entidad

Los modelos **deben** respetar los atributos heredados de la entidad correspondiente. **No se debe** definir atributos redundantes o repetidos con aquellos presentes en la entidad heredada.

#### A. Atributos adicionales no redundantes

Los modelos **pueden** definir atributos adicionales que no estén presentes en la entidad que no sean redundantes, entendiendose por redundantes aquellos atributos con un mismo significado que ya están presentes en la entidad.

```dart
class User {
  User(String id);

  final String id;
}

class UserModel extends User {
  UserModel({
    required super.id, 
    required String extra,
  });

  final String extra;
}
```

#### B. Atributos heredados de tipo de dato incompatible

Aquellos atributos del modelo cuyos tipos no coincidan con el tipo de dato de los atributos correspondientes en la entidad **deben** ser transformados en los constructores del modelo, incluyendo constructores factory.  

Por ejemplo:

```dart
class UserModel extends User {
  UserModel(int id) : super(id.toString());
}
```




## Enumeradores

Los parámetros de objetos con una cantidad finita de valores **deben** ser representados por enumeradores de Dart.

Los enumeradores que formen parte de la lógica de negocio de la aplicación **deben** ser declarados en la capa de dominio de la misma. Aquellos enumeradores de uso limitado a la capa de datos **deben** ser declarados en la capa de datos y **no pueden** ser utilizados en ninguna otra capa.

### Atributo `value` de enumeradores

Los modelos de enumeradores **deben** tener un atributo `value` de tipo `T` que **debe** ser igual al valor usado en el servicio externo. 

```dart
enum UserStatusModel {
  active('active'),
  inactive('inactive');

  const UserStatusModel(this.value);

  final String value;
}
```

### Método `fromValue` de enumeradores

Aquellos enumeradores cuyos valores provengan de la respuesta de un servicio externo **deben** tener un método `fromValue` que convierta un tipo de dato `T` al valor correspondiente del enumerador.

```dart
enum UserStatusModel {
  active('active'),
  inactive('inactive');

  const UserStatusModel(this.value);

  final String value;

  UserStatusModel fromValue(String value) {
    return UserStatusModel.values.firstWhere(
      (e) => e.value == value,
      orElse: () => UserStatusModel.active,
    );
  }
}
```

### Método `toValue` de enumeradores

Los enumeradores cuyos valores deban ser enviados al servicio externo **deben** tener un método `toValue` que convierta el valor del enumerador al valor correspondiente de tipo `T` aceptado por el API.

```dart
enum UserStatusModel {
  active('active'),
  inactive('inactive');

  const UserStatusModel(this.value);

  final String value;
    
  String toValue() => this.value;
}
```

:::note
Se recomienda usar interfaces para forzar la estructura de los enumeradores.
:::
