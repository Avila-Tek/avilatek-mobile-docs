# 1.2. Modelos

### 1.2.1. Clases

#### 1.2.1.1. Extensión de clases de entidades

Las clases de modelos **deben** extender de la clase entidad correspondiente, a menos que no exista una entidad que represente el modelo.

```dart
class ModelUser extends User { }
```

#### 1.2.1.2. Nombrado de clases

Las clases de modelos **deben** ser nombradas con el sufijo `Model` y **deben** utilizar el mismo nombre base de la entidad correspondiente.

```dart
class UserModel extends User { }

class ProductModel extends Product { }
```

#### 1.2.1.2.A. Inciso de nombres de clases

Los nombres de clases de modelos **pueden** incluir en su nombre el tipo de objeto que representan siguiendo la regla [1.2.1.2. sobre nombrado de clases](#1212-nombrado-de-clases). Por ejemplo, `Dto` para objetos de transferencia de datos, `Response` para objetos de respuesta, `Request` para objetos de solicitud, etc. Se recomienda mantener cohesivo el nombrado de clases de modelos dentro del mismo proyecto o paquete.

```dart
class UserDtoModel extends User { }

class CreateUserRequestModel extends CreateUserRequest { }

class UpdateUserResponseModel { }
```

### 1.2.2. Constructores

#### 1.2.2.1. Constructores de clases de entidades

Las clases de modelos **deben** tener constructores que permitan crear objetos de modelos a partir de objetos de entidad correspondientes.

### 1.2.3. Atributos 

#### 1.2.3.1. Herencia de atributos de la entidad

Los modelos **deben** respetar los atributos heredados de la entidad correspondiente. Es un error declarar atributos que sean redundantes con aquellos  presentes en la entidad. 

#### 1.2.3.2. Definición de atributos adicionales no redundantes

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

#### 1.2.3.2.A. Atributos heredados de tipo de dato incompatible

Aquellos atributos del modelo cuyos tipos no coincidan con el tipo de dato de los atributos correspondientes en la entidad **deben** ser transformados en los constructores o funciones fábrica (`factory`) del modelo. 

Por ejemplo:

```dart
class UserModel extends User {
  UserModel(int id) : super(id.toString());
}
```


### 1.2.4. Constructor `fromMap`

Los modelos que requieran ser serializados de un `Map` **deben** tener un [constructor factory](https://dart.dev/language/constructors#factory-constructors) `fromMap`.

#### 1.2.4.1. Argumento `data` del constructor `fromMap`

El método `fromMap` **debe** recibir un objeto de tipo `Map<E,S>` como argumento obligatorio llamado `data`. Generalmente `E` es de tipo `String` y `S` es de tipo `dynamic`, pero esto **puede** variar de un modelo a otro.

```dart
class UserModel extends User {
  factory UserModel.fromMap(Map<String, dynamic> data) { ... }
}
```

#### 1.2.4.1.A. Argumentos extra en constructores `fromMap`

El método `fromMap` **puede** recibir argumentos adicionales a `data`. El parámetro `data` debe ser posicional y el resto de parámetros deben ser de tipo nombrado que **pueden** ser opcionales u obligatorios.

```dart
class UserModel extends User {
  factory UserModel.fromMap(Map<String, dynamic> data, {String? extra}) {
    ... 
  }
}
```

#### 1.2.4.2. Variables intermedias en constructores `fromMap`

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

#### 1.2.4.3. Manejo de valores nulos de parámetros en constructores `fromMap`

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


### 1.2.5. Enumeradores

Los parámetros de objetos con una cantidad finita de valores **deben** ser representados por enumeradores de Dart.

Los enumeradores que formen parte de la lógica de negocio de la aplicación **deben** ser declarados en la capa de dominio de la misma. Aquellos enumeradores de uso limitado a la capa de datos **deben** ser declarados en la capa de datos y **no pueden** ser utilizados en ninguna otra capa.

#### 1.2.5.1. Atributo `value` de enumeradores

Los modelos de enumeradores **deben** tener un atributo `value` de tipo `T` que **debe** ser igual al valor usado en el servicio externo. 

```dart
enum UserStatusModel {
  active('active'),
  inactive('inactive');

  const UserStatusModel(this.value);

  final String value;
}
```

#### 1.2.5.2. Método `fromValue` de enumeradores

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

#### 1.2.5.3. Método `toValue` de enumeradores

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
