---
title: Enums
---

# Enums

## Clases

### Nombrado de clases

Los enums deben incluir el sufijo Enum en su nombre y su nombre debe coincidir en base a su entidad correspondiente.

```dart title="Regla de nombrado de clases"
    enum ItemCollectionEnum {}

    enum PrivacyTypeEnum {}

```

## Constructores

## Valores

### Nombrado de valores

Los parametros de los constructures en los Enums deben verse reflejados adentro de las llaves en las cuales se inicializa, la regla estima que primero debe colocar el nombre del parametro y entre parentesis y comillas simples (' ') debe colocarse el parametro correspondiente al valor que viene del backend.

```dart title="Nombrado de valores"
    enum ItemCollectionEnum {
    post('post'),
    book('book'),
    track('track'),
    album('album'),
    comment('comment'),
    }

```

#### A. Casos en los que el valor venga con un guión

En caso de que su valor esté representado con un guión en medio el nombrado del parametro que va por fuera de los parentesis será representado como camelCase.

```dart title="Valores con guión"
    enum PrivacyTypeEnum {
    public('public'),
    private('private'),
    followersConnections('followers-connections'), ///Aqui el ejemplo del camelCase
    connections('connections');
    }
```

### Valor nulo

Nuestros enums siempre deberan tener un valor por defecto o nulo para evitar cualquier error o incidencia. Ejemplo: unknown, empty, etc.

```dart title="Valor nulo"
    enum ItemCollectionEnum {
    post('post'),
    book('book'),
    track('track'),
    unknown('unknown');
    }
```

### Atributo value

Este atributo estará para recibir y/o enviar el valor que estemos manejando de nuestro enum.

```dart title="Valor nulo"
  final String value;
  const PrivacyTypeEnum(this.value);
```

### Método fromValue

Este método nos sirve para comparar lo que recibamos en nuestra variable value con los distinto tipos de valores que tenemos determinados en nuestro enum.

```dart title="fromValue"
  /// Get [ItemCollectionEnum] by [String] value
  static ItemCollectionEnum fromValue(String? value) { //Importante colocar el valor como nullable
    if (_byValue.isEmpty) {
      for (final status in ItemCollectionEnum.values) {
        _byValue[status.value] = status;
      }
    }

    return _byValue[value] ?? ItemCollectionEnum.none; //En caso de no venir utilizamos nuestro valor nulo
  }
```

### Método fromEntity

Estos metodos nos sirven para crear una instancia de una clase a partir de una de nuestras entidades, en este caso el enum que provenga de nuestra capa de dominio. La manera de representarlo es la siguiente.

```dart title="fromEntity"
  factory PrivacyTypeEnum.fromEntity(PrivacyType type) {
    if (type == PrivacyType.public) { // Comparamos la entidad (dominio)
      return PrivacyTypeEnum.public; //Y retornamos el valor acorde en nuestro enum de data
    }

    if (type == PrivacyType.private) {
      return PrivacyTypeEnum.private;
    }

    if (type == PrivacyType.followersConnections) {
      return PrivacyTypeEnum.followersConnections;
    }

    return PrivacyTypeEnum.connections; // Como caso de retorno particular colocamos el que nos queda
  }
```

#### A. Devolver excepciones

Si no queremos devolver un valor de manera predeterminada podemos manejar excepciones en nuestro enum.

```dart title="¿Cómo devolver excepciones?"
...
    if (type == ItemCollection.vacant) {
      return ItemCollectionEnum.vacant;
    }
    if (type == ItemCollection.none) {
      return ItemCollectionEnum.none;
    }

    throw Exception('Invalid ItemCollection'); //Podemos devolver una excepcion normal o una excepcion personalizada

```

### Método toEntity
El método toEntity nos permite convertir nuestro enum o modelo de data y llevarlo a la capa de dominio para su uso sencillo en la aplicación.

```dart title="toEntity"
  PrivacyType get toEntity {
    if (this == PrivacyTypeEnum.public) {
      return PrivacyType.public;
    }
    if (this == PrivacyTypeEnum.private) {
      return PrivacyType.private;
    }
    if (this == PrivacyTypeEnum.followersConnections) {
      return PrivacyType.followersConnections;
    }
    return PrivacyType.connections;
  }
```