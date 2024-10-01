# State 

El **estado** del Bloc es el encargado de reflejar la situación actual de la aplicación o funcionalidad en base a las interacciones del usuario o cambios en el sistema. Existen dos maneras de implementar el estado de un Bloc en los proyectos:


## Clase sellada y subclases
Esta implementación consiste en una clase sellada que contiene todas las propiedades compartidas y múltiples subclases para los estados separados.

### Clase

#### A. Estado base
La clase del estado base **debe** ser sellada (`sealed`) y nombrarse igual que la funcionalidad, seguido por el sufijo `State`.

```dart
sealed class UserState {
    ...
}
```

#### A. Estado derivado de la base
El estado que deriva de otro **debe** extenderse del estado base y **debe** nombrarse de acuerdo al estado que representa.

```dart
sealed class UserState {
    ... 
}

class Authenticated extends UserState {
    ...
}

class NotAuthenticated extends UserState {
    ...
}
```

### Constructor
Los constructores de los estados **deben** ser definidos siempre como constante.

```dart
sealed class UserState {
    const UserState();
}
```

### Parámetros
Los parametros **deben** ser definidos como parámetros nombrados en el constructor. Aquellos que sean compartidos entre estados se **deben** definir en el estado base.


## Clase única y enumerador de estado
Esta implementación consta de una clase única para manejar la información de todos los estados, representados por un enumerador.

### Enumerador de estado
Se **debe** definir un enumerador de estado relacionado al Bloc de la funcionalidad con cuatro valores: `initial`, `loading`, `success` y `failure`.

#### A. Nombrado
El enumerador debe nombrarse igual que la funcionalidad, seguido por el sufijo `Status`.

```dart
enum LoginStatus {
    ... /// 👈 Implementación del enum.
}
```

#### B. Valores
El enumerador **debe** tener tres valores: `loading`, `success` y `failure`. Se **puede** agregar un cuarto valor `initial` de ser necesario.

1. `initial`: hace referencia al estado inicial, previo a la carga/envio de información.
2. `loading`: hace referencia al estado de carga, mientras se espera la respuesta de la solicitud.
3. `success`: hace referencia al estado de éxito, cuando la solicitud genera una respuesta exitosa.
4. `failure`: hace referencia al estado de error, cuando la solicitud genera una excepción.

#### C. Getters
En el enumerador se **deben** definir getters de cada estado definido para facilitar su uso en los `BlocBuilders` y `BlocListeners`

```dart
enum LoginStatus {
    initial,
    loading,
    success,
    failure;
    
    bool get isInitial => this == LoginStatus.initial;
    bool get isLoading => this == LoginStatus.loading;
    bool get isSuccess => this == LoginStatus.success;
    bool get isFailure => this == LoginStatus.failure;
}
``` 

### Clase

#### A. Nombrado
La clase **debe** nombrarse igual que la funcionalidad, seguido por el sufijo `State` y debe extender de `Equatable`.

```dart
class LoginState extends Equatable {
    ... /// 👈 Implementación de la clase.
}
```

### Constructor
El constructor del estado **debe** ser definido siempre como constante.

#### A. Parámetros
Los parametros **deben** ser definidos como parámetros nombrados en el constructor. Estos **pueden** ser requeridos o no dependiendo si son esenciales para definir el estado particular y no pueden faltar al crear una instancia de dicho estado.

Si se definen parámetros de tipo objeto en el estado, de no ser parámetro requerido se **debe** asignar un valor predeterminado estandar `Object.empty`, definido como constante.

### Método props

Al extender de `Equatable` el estado, se **debe** definir el metodo `props` en la clase, y se incluyen los parámetros definidos sobre los cuales depende el cambio de estado del Bloc.

```dart
class LoginState extends Equatable {
    const LoginState({
        this.email = '';
    });

    final String email;

    ...

    @override
    List<Object> get props => [email];
}
```

### Método copyWith

Para modificar los parámetros del estado, se **debe** definir el método `copyWith`, que recibirá los mismos parámetros del estado actual y los asignará a una nueva instancia, sobrescribiendo los valores anteriores con los nuevos.

```dart
class LoginState extends Equatable {
    const LoginState({
        this.email = '';
    });

    final String email;

    ...

    LoginState copyWith({
        String? email,
    }) {
        return LoginState(
            email: email ?? this.email,
        );
    } 
}
```
