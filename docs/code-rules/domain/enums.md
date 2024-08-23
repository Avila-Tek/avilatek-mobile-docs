---
title: Enums
---

# Enums

## Constructores

## Clases

### Nombrado de clases

Los nombres de los enumeradores **deben** tener el mismo nombre base relacionado a su entidad y correspondientes al uso que tendrá y deben terminar con el sufijo `Enum`.

## Valores

### Nombrado de valores

Los parámetros de los enumeradores **deben** ser iguales a los valores que vengan directamente del servidor. En caso de que dicho valor proveniente del servidor contenga un guión debe representarse en formato camelCase

```dart title="Nombrado de valores"
enum PrivacyTypeEnum {
    public,
    private,
    followersConnection, //Uso del camelCase
    connections;

    ///Resto del código...
}
```

### Valor nulo

Nuestros enums siempre deberan tener un valor por defecto o nulo para evitar cualquier error o incidencia. Ejemplo: unknown, empty, etc.

```dart title="Valor nulo"
    enum ItemCollectionEnum {
      post,
      book,
      track,
      unknown;

      /// Resto del código...
    }
```

## Métodos auxiliares

### Getters

Los enumeradores **pueden** tener `getters` los cuales nos permite establecer nuevas instancias de facil acceso al momento de querer usarlo en condicionales y poder lograr un menor ruido visual en el código.


```dart title="Getters"

enum ReportType {
  spam,
  inappropriate,
  other,
  none;

  bool get isSpam => this == ReportType.spam;
  bool get isInappropriate => this == ReportType.inappropriate;
  bool get isOther => this == ReportType.other;
  bool get isNone => this == ReportType.none;
  
  /// Resto del codigo

}


```
