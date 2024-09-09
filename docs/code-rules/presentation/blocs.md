# Bloc

El **Componente de Lógica Empresarial (BLoC)** es uno de los varios manejadores de estados que tiene Flutter para separar la lógica de negocio de la interfaz de usuario. Su implementación permite desarrollar componentes reusables y aplicaciones escalables y testeables.

:::warning
En los proyectos **debes** usar Bloc como manejador de estados en la capa de presentación.
:::

:::info
Para mayor información sobre el uso y funcionamiento de los Blocs puedes leer la documentacion en https://bloclibrary.dev.
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
Los atributos requeridos por el Bloc se **deben** pasar como parámetros nombrados. Estos parámetros normalmente son entidades, variables o casos de usos.

#### 1. Asignación de parámetros a atributos privados
Los parámetros pueden ser guardados de dos maneras en el Bloc para su uso:

- **En el estado:** en este caso el parámetro recibido en el constructor se guarda directamente cuando se instancia el estado base del Bloc en el método `super()`.

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

Los Blocs solo pueden recibir casos de uso (definidos en la capa de dominio) para manejar la logica de negocio del feature, y **deben** ser asignados obligatoriamente a atributos privados dentro del Bloc.

:::danger
 **Está prohibida la interdependencia de Blocs** (paso de un Bloc a otro por parámetro). La comunicación entre Blocs debe hacerse por medio de `BlocListeners` o directamente accediendo a ellos por medio del contexto de la app (inyección de dependencias).
:::

### Registro de manejadores de eventos
El constructor de la clase registra varios manejadores de eventos utilizando el método `on<Event>(FutureOr<void> Function(E, Emitter<State>) handler, {Stream<E> Function(Stream<E>, Stream<E> Function(E))? transformer})`. Este método es el encargado de vincular un tipo de evento específico con su respectivo manejador.

- `Event` hace referencia al nombre del evento.
- `handler` hace referencia al manejador del evento. Siempre **debe** ser privado y solo se debe referenciar en el constructor. El cuerpo de la función **será** definido dentro de la clase, no del constructor.

#### Transformadores
Los transformadores son funciones opcionales que se puede aplicar para controlar cómo se gestionan las emisiones de eventos, antes de que lleguen al manejador del evento. Para esto puedes desarrollar transformadores o usar los proporcionados por el paquete `bloc_concurrency`.


### Registro de Stream Listeners
En caso de que sea necesario escuchar los eventos de un Stream dentro del Bloc, es recomendable definir esta lógica en el constructor. Para ello, es necesario almacenar la suscripción al Stream en una variable privada y, posteriormente, inicializar el listener del Bloc con la lógica correspondiente (por ejemplo, emitir un evento del Bloc cuando el Stream produzca una emisión).

```dart
class UserBloc extends Bloc<UserEvent, UserState> {
    UserBloc({
        required UserUseCase userUseCase,
    })  : _userUseCase = userUseCase,
            super(const UserState()) {
            on<UserChanged>(_onUserChanged);

            _streamSubscription = _userUseCase.user.listen((user) {
                add(UserChanged(user: user));
            });
        }

    StreamSubscription<User>? _streamSubscription;
}
```

:::warning
    Todo listener de un Stream debe cancelarse en el método `close()` de los Blocs para evitar fugas de memoria y problemas de rendimiento.
:::

## Manejadores de eventos
Los manejadores de eventos permiten realizar operaciones asíncronas o síncronas y emitir nuevos estados según sea necesario.

### Nombrado
Los manejadores de eventos **deben** nombrarse como el evento, agregando el prefijo on. Debe declararse de manera privada.

```dart
on<Event>(_onEvent);
```

### Implementación
La implementación de un manejador de evento, utilizando el patrón Bloc, debe seguir la siguiente estructura:

```dart
FutureOr<void> _onEvent(
    Event event,
    Emitter<State> emit,
) async {
    // Lógica a implementar
}
```
Donde:
1. FutureOr: Indica que la función puede retornar un `Future<void>` o simplemente `void`, dependiendo de si la lógica dentro de la función es asíncrona o síncrona. Esto permite flexibilidad en la implementación, ya que el Bloc puede manejar ambos tipos de operaciones.
2. Event: Representa el evento que desencadena este manejador. En la mayoría de los casos, es una clase de evento definida previamente, como parte de los eventos de Bloc.
3. Emitter: Es la función utilizada para emitir un nuevo estado. A través de emit, se notifica al Bloc el nuevo estado que debe adoptar en respuesta al evento recibido.

#### a. Manejo de errores


```dart
FutureOr<void> _onUserStarted(
    UserStarted event,
    Emitter<UserState> emit,
) async {
    try {
      emit(state.copyWith(status: UserStatus.loading));

      final currentUser = await _userUseCase.currentUser;

      emit(
        state.copyWith(
          user: currentUser,
          status: currentUser == User.empty
              ? UserStatus.unauthenticated
              : UserStatus.authenticated,
        ),
      );
    } catch (e) {
        emit(
            state.copyWith(
                errorMessage: e.message,
                status: UserStatus.failure,
            ),
        );
    }
  }
```