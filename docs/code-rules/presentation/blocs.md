# Bloc

El **Componente de Lógica Empresarial (BLoC)** es uno de los varios manejadores de estados que tiene Flutter para separar la lógica de negocio de la interfaz de usuario. Su implementación permite desarrollar componentes reusables y aplicaciones escalables y testeables.

:::warning
En los proyectos **debes** usar Bloc como manejador de estados en la capa de presentación.
:::

## Clases

### Nombrado de clases

Las clases **deben** nombrarse según la funcionalidad que se va a desarrollar o la acción específica que el Bloc se encargará de manejar y **deben** incluir el sufijo `Bloc`.

```dart
class LoginBloc extends ... {}

class SplashBloc extends ... {}
```

### Extensiones

#### 1. Bloc

Es la extensión Base de Bloc. En este caso la clase **debe** extender de la clase abstracta `Bloc` (proporcionado por el paquete de pub `flutter_bloc`), definiendo el evento y estado base.

```dart
class LoginBloc extends Bloc<LoginEvent, LoginState> {}

class SplashBloc extends Bloc<SplashEvent, SplashState> {}
```
#### 2. SendDataBloc
(Próximamente)
#### 3. RemoteDataFetchBloc
(Próximamente)
#### 4. PagedRemoteDataFetchBloc
(Próximamente)
#### 5. Excepciones
(Próximamente)

## Constructor

### Parámetros
Los atributos requeridos por el Bloc se **deben** pasar como parámetros de forma nombrada. Estos parámetros normalmente son entidades, variables o casos de usos.

#### 1. Asignación de parámetros a atributos privados
Los parámetros pueden ser guardados de dos maneras en el Bloc:

- **En el estado:** en este caso el parámetro recibido en el constructor se guarda directamente cuando se instancia por primera vez el estado base del bloc en el método `super()`.

```dart
class ProductDetaiBloc extends Bloc<ProductDetaiEvent, ProductDetaiState> {
    const ProductDetailBloc({
        required Product initialData;
    }) : super(
            ProductDetaiState(
                initialData: initialData,
            ),
        );
}
```

- **Como atributo privado:** en este caso el parámetro recibido en el constructor se guarda en un atributo `final` **privado** definido en el Bloc.

```dart
class ProductDetaiBloc extends Bloc<ProductDetaiEvent, ProductDetaiState> {
    const ProductDetailBloc({
        required String productId;
    }) : _productId = productId, super(ProductDetaiState());

    final String _productId;
}
```

### Principio de inversión de dependencias

Los Blocs solo pueden recibir casos de uso (definidos en la capa de dominio) para manejar la logica de negocio del feature, y **deben** ser asignados a atributos privados dentro del Bloc.

:::danger
 **Está prohibida la interdependencia de Blocs** (paso de un Bloc a otro por parámetro). La comunicación entre Blocs debe hacerse por medio de `BlocListeners` o directamente accediendo a ellos por medio del contexto de la app (inyección de dependencias).
:::

### Registro de Event Handlers

### Registro de Stream Listeners
