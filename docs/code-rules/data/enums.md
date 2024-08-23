---
title: Enums
---

# Enums

## Constructores

## Clases

### Implementación de la interfaz BaseEnum

Los enumeradores de la capa de datos **deben** implementar la interfaz `BaseEnum<E, T>`.

```dart title="Regla de nombrado de clases"
    enum ItemCollectionModel implements BaseEnum<ItemCollectionEnum, String> {} // Implementación de BaseEnum

    enum PrivacyTypeModel implements BaseEnum<PrivacyType, String> {}
```

### Nombrado de clases

Los nombres de los enumeradores **deben** tener el mismo nombre base de su entidad correspondiente y el sufijo `Model`, y su carpeta destino se encontrará adentro de la carpeta de `models` como una subcarpeta llamada `enums`.

```dart title="Regla de nombrado de clases"
    enum ItemCollectionModel implements BaseEnum<ItemCollectionEnum, String> {}

    enum PrivacyTypeModel implements BaseEnum<PrivacyType, String> {}
```

## Valores

### Atributo value

Este atributo estará para recibir y/o enviar el valor que estemos manejando de nuestro enum.

```dart title="Atributo value"
  final String value;
  const PrivacyTypeModel(this.value);
```

### Nombrado de valores

Los parámetros de los constructores en los enumeradores **deben** reflejarse dentro de las llaves de inicialización. Según la regla, primero se debe colocar el nombre del parámetro, seguido del valor correspondiente entre paréntesis y comillas simples (' '), el cual proviene del backend.

```dart title="Nombrado de valores"
    enum ItemCollectionModel implements BaseEnum<ItemCollectionEnum, String> {
      post('post'),
      book('book'),
      track('track'),
      album('album'),
      comment('comment');

      final String value;
      const PrivacyTypeModel(this.value);
      
      /// Resto del código...

    }

```

#### A. Casos en los que el valor venga con un guión

Cuando el valor incluye un guión, el nombre del parámetro que está fuera de los paréntesis debe representarse en formato camelCase.

```dart title="Valores con guión"
    enum PrivacyTypeModel implements BaseEnum<PrivacyTypeEnum, String> {
      public('public'),
      private('private'),
      followersConnections('followers-connections'), ///Aqui el ejemplo del camelCase
      connections('connections');

      /// Resto del código...
    }
```

### Valor nulo

Nuestros enums siempre deberan tener un valor por defecto o nulo para evitar cualquier error o incidencia. Ejemplo: unknown, empty, etc.

```dart title="Valor nulo"
    enum ItemCollectionModel implements BaseEnum<ItemCollectionEnum, String> {
      post('post'),
      book('book'),
      track('track'),
      unknown('unknown');

      /// Resto del código...
    }
```

### Método fromValue

"El método `fromValue` **debe** convertir un valor de tipo `T` al valor del modelo correspondiente comparandolo con el atributo `value` usando el método `firstWhere`.

````dart title="Método fromValue"
    enum UserStatusModel implements BaseEnum<UserStatus, String> {
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
````

#### A. Devolver un fallback con orElse

Se **debe** colocar en el orElse un valor predeterminado en caso de no lo consiga con nuestro método `firstWhere`.


### Método fromEntity

Estos metodos nos sirven para crear una instancia de una clase a partir de una de nuestras entidades, en este caso el enum que provenga de nuestra capa de dominio. La manera de representarlo es la siguiente.

#### A. Devolver excepciones

Si no queremos devolver un valor de manera predeterminada podemos manejar excepciones en nuestro enum.

````dart title="¿Cómo devolver excepciones?"
...
    if (type == ItemCollectionEnum.vacant) {
      return ItemCollectionModel.vacant;
    }
    if (type == ItemCollectionEnum.none) {
      return ItemCollectionModel.none;
    }

    throw Exception('Invalid ItemCollection'); //Podemos devolver una excepcion normal o una excepcion personalizada

````

### Método toEntity

El método `toEntity` **debe**  convertir el valor del enumerador modelo al valor equivalente del enumerador entidad con una expresión 
[`switch`](https://dart.dev/language/branches#switch-statements).

```dart title="toEntity"
  PrivacyTypeEnum get toEntity {
    if (this == PrivacyTypeModel.public) {
      return PrivacyTypeEnum.public;
    }
    if (this == PrivacyTypeModel.private) {
      return PrivacyTypeEnum.private;
    }
    if (this == PrivacyTypeModel.followersConnections) {
      return PrivacyTypeEnum.followersConnections;
    }
    return PrivacyTypeEnum.connections;
  }
```
