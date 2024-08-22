# Validadores

## Clases

### Superclase FormField

Esta superclase contiene todas las reglas necesarias para manejar los posibles estados de validación
de un campo. Esta clase necesita 2 tipos genéricos `T` y `E`.

```dart
abstract class FormField<T, E extends FieldValidationFailure>
```

#### A. Tipo genérico `T`

Representa el tipo de valor a validar.

#### B. Tipo genérico `E`

Representa el tipo de los posibles errores de validación a manejar.

#### C. Clase `FieldValidationFailure`

Clase genérica para englobar todos los errores de validación.

### Nombrado de validadores y errores de validación

Los validadores **deben** iniciar con el nombre del campo a validar seguido de sufijo `Field`.

```dart
class EmailField {} //Nombrado para validación de campo Email

class PasswordField {} //Nombrado para validación de campo Password
```

Las clases utilizadas para representar los errores de validación **deben** iniciar con el nombre del
campo a validar seguido de sufijo `ValidationFailure`.

```dart
class EmailValidationFailure{} //Nombrado para el error de validación de el campo Email

class PasswordValidationFailure{} //Nombrado para el error de validación de el campo Password
```

### Extensión de `FormField`

Los validadores **deben** extender de la
superclase `FormField<T, E extends FieldValidationFailure>`.

```dart
class EmailField extends FormField<String, EmailValidationFailure>

class PasswordField extends FormField<String, PasswordValidationFailure>

class PriceField extends FormField<double, PriceValidationFailure>

```

### Extensión de `FieldValidationFailure`

Los errores de validación **deben** extender de la clase `FieldValidationFailure`. Se **debe** establecer una jerarquía de clases donde se declare una `sealed class` para englobar
todos los errores a manejar del campo.

```dart
//Sealed class que engloba todos los errores de validación para el campo Password
sealed class PasswordValidationFailure extends FieldValidationFailure {} 

//Enum class que representa los posibles errores "generales" del campo Password
enum BasicPasswordValidationFailure implements PasswordValidationFailure {
  empty,
  format,
  containsUppercase
}

//Clase que representa un error específico
class MinLengthPasswordValidationFailure extends PasswordValidationFailure {
  final int minLength;

  MinLengthPasswordError({required this.minLength});
}
```

