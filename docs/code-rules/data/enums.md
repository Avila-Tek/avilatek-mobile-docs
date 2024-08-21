---
title: Enums
---

# Enums

## Constructores

## Clases

### Implementación de la interfaz BaseEnum

Es fundamental que, al crear enumeradores, se implemente correctamente la interfaz `BaseEnum<E, T>`. Esta implementación permite estandarizar y sobrescribir los métodos `fromValue` y `toEntity`, asegurando una conversión consistente entre los valores del enumerador y sus entidades correspondientes. Además, la correcta implementación del atributo `value` es crucial, ya que define el tipo y valor que el enumerador manejará, facilitando la interacción con otras capas de la aplicación.

La interfaz `BaseEnum<E, T>` proporciona una estructura base que garantiza que cada enumerador tenga un método para convertir desde un valor (`fromValue`) y otro para convertir a la entidad correspondiente (`toEntity`). A continuación se muestra un ejemplo de cómo implementar esta interfaz en un enumerador específico:

### Nombrado de clases

Los nombres de los enumeradores **deben** tener el mismo nombre base de su entidad correspondiente y el sufijo `Enum`.

```dart title="Regla de nombrado de clases"
    enum ItemCollectionEnum implements BaseEnum<ItemCollection, String> {}

    enum PrivacyTypeEnum implements BaseEnum<PrivacyType, String> {}
```

## Valores

### Atributo value

Este atributo estará para recibir y/o enviar el valor que estemos manejando de nuestro enum.

```dart title="Atributo value"
  final String value;
  const PrivacyTypeEnum(this.value);
```

### Nombrado de valores

Los parámetros de los constructores en los enumeradores **deben** reflejarse dentro de las llaves de inicialización. Según la regla, primero se debe colocar el nombre del parámetro, seguido del valor correspondiente entre paréntesis y comillas simples (' '), el cual proviene del backend.

```dart title="Nombrado de valores"
    enum ItemCollectionEnum implements BaseEnum<ItemCollection, String> {
    post('post'),
    book('book'),
    track('track'),
    album('album'),
    comment('comment');

      final String value;
      const PrivacyTypeEnum(this.value);
    }

```

#### A. Casos en los que el valor venga con un guión

Cuando el valor incluye un guión, el nombre del parámetro que está fuera de los paréntesis debe representarse en formato camelCase.

```dart title="Valores con guión"
    enum PrivacyTypeEnum implements BaseEnum<PrivacyType, String> {
    public('public'),
    private('private'),
    followersConnections('followers-connections'), ///Aqui el ejemplo del camelCase
    connections('connections');
    }
```

### Valor nulo

Nuestros enums siempre deberan tener un valor por defecto o nulo para evitar cualquier error o incidencia. Ejemplo: unknown, empty, etc.

```dart title="Valor nulo"
    enum ItemCollectionEnum implements BaseEnum<ItemCollection, String> {
    post('post'),
    book('book'),
    track('track'),
    unknown('unknown');
    }
```

### Método fromValue

Este método nos sirve para comparar lo que recibamos en nuestra variable value con los distinto tipos de valores que tenemos determinados en nuestro enum.

### Método fromEntity

Estos metodos nos sirven para crear una instancia de una clase a partir de una de nuestras entidades, en este caso el enum que provenga de nuestra capa de dominio. La manera de representarlo es la siguiente.

````

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

````

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
