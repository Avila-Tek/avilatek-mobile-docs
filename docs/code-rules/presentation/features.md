# Features

Este capítulo describe cómo crear, organizar, nombrar y desarrollar los diferentes elementos y clases que hacen vida dentro de un `Feature`.

## Creación

Para la creación de un `feature` se **debe** hacer uso de la plantilla de Mason llamada `feature_brick`, que permite la rápida creación de un `feature` con toda la estructura necesaria para cumplir con la Arquitectura Limpia. Sin embargo, ésta **debe** ser la disponible en el paquete de [Avila Tek Flutter Common Library (FCL)](https://github.com/Avila-Tek/flutter_common_lib/tree/master/bricks/feature_brick), y no la original de [BrickHub.dev](https://brickhub.dev/bricks/feature_brick/0.6.2), ya que la de Ávila contiene unas pequeñas adaptaciones que se ajustan a la estructura requerida y definida por el departamento de desarollo móvil.

### Comando a ejecutar

Para la creación de un `feature` con la plantilla `feature_brick` de Ávila, se **debe** ejecutar su respectivo comando en la terminal del proyecto, apuntando desde la dirección raíz del mismo, en cualquiera de sus siguientes versiones:

```sh
mason make feature_brick -o <Dirección-de-la-carpeta-de-presentación>

mason make feature_brick --feature_name <Nombre-del-feature> --state_management bloc --output-dir <Dirección-de-la-carpeta-de-presentación>
```

### Explicación del comando

El comando viene con varias opciones o variables que se **pueden** indicar directamente al escribir el comando inicial, o ir respondiendo uno a uno cuando la plantilla te pregunte. Estas opciones son:

#### A. `--output-dir` u `-o`

La ruta dentro del proyecto en donde se creará el `feature` **puede** ser indicada al ejecutar el comando, y en caso de no serlo, se **debe** ejecutar el comando en la terminal desde la dirección en donde se desea crear el `feature`, la cual **debe** ser dentro de la respectiva carpeta de presentación del proyecto.

#### B. `--feature_name`

Aquí se indicará el nombre que tendrá el `feature`, el cual **debe** cumplir con las reglas de nombrado que se explican en su respectiva sección a continuación. De no ser indicado, el mismo por defecto será `login`.

#### C. `--state_management`

El manejador de estados **debe** ser `bloc`. De no indicarse, será este mismo por defecto.

:::danger
No se permitará otro manejador de estados que no sea `bloc`, ya que es el definido por el departamento en su arquitectura.
:::

#### D. ¿Deseas usar equatable con tu bloc?

A diferencia de las opciones anteriores, ésta no tiene una variable que se pueda agregar en el comando, sino que se trata de una pregunta que te hace la plantilla al intentar crear el `feature`. Debido a que se está usando `bloc` como manejador de estado, se **debe** indicar que sí (`true`) se usará el paquete `equatable` para manejar la igualdad entre objetos de una forma sencilla.

#### E. ¿Te gustaría incluir tests en este feature?

Otra pregunta que no incluye una variable, y que en este caso, es totalmente opcional si se desea incluir o no los tests, según la naturaleza del `feature`.

## Nombrado

El nombre de un `feature` **debe** reflejar claramente la funcionalidad que gestionan, sin ningún sufijo o prefijo. Este **debe** ser escrito en singular, aunque **pueden** haber excepciones a esta regla, cuando la funcionalidad es explícitamente plural.

:::info
En caso de que el nombre sea compuesto por más de una palabra, éste **debe** escribirse en estilo **snake_case** al momento de ejecutar el `feature_brick`.
:::

```
presentation/
├─ login/
├─ profile/
├─ contract_detail/
├─ follow_requests/

```

## Estructura General

Todos los `features` **deben** cumplir con la siguiente estructura, que satisface la arquitectura limpia definida:

```
feature/
├─ bloc/
│  ├─ bloc.dart
│  ├─ feature_bloc.dart
│  ├─ feature_event.dart
│  ├─ feature_state.dart
├─ view/
│  ├─ feature_page.dart
├─ widgets/
│  ├─ feature_body.dart
│  ├─ widgets.dart
├─ feature.dart

```

:::info
Los nombres de la carpeta y de los archivos que contienen la palabra `feature`, **deben** ser sustituidos por el nombre del mismo, cumpliendo las reglas establecidas en la sección anterior.
:::

```
login/
├─ bloc/
│  ├─ bloc.dart
│  ├─ login_bloc.dart
│  ├─ login_event.dart
│  ├─ login_state.dart
├─ view/
│  ├─ login_page.dart
├─ widgets/
│  ├─ login_body.dart
│  ├─ widgets.dart
├─ login.dart

```

### Carpeta `bloc/`

Esta carpeta **debe** estar conformada por cuatro (4) archivos que son:

#### A. `feature_bloc.dart`

Es el archivo en donde se definirán los métodos y la lógica a ejecutar cuando un evento del `bloc` es llamado desde la vista.

#### B. `feature_event.dart`

Es el archivo en donde se definirán los eventos del `bloc` junto a sus parámetros, en caso de ser necesario.

#### C. `feature_state.dart`

Es el archivo en donde se definirán los atributos que el `bloc` manejará y compartirá con la vista.

#### D. `bloc.dart`

Es el archivo de barril que permitirá exportar todos los archivos de esta carpeta, al ser importados en otro módulo, mejorando la organización y limpieza del código.

:::info
Para mayor información y detalle sobre los `blocs`, referirse a su respectivo capítulo documentado.
:::

### Carpeta `view/`

Esta carpeta **debe** estar conformada por un único archivo, denominado `feature_page.dart`, en el cual se encuentran diferentes elementos como el `Page` y el `View`, que están documentados en la siguiente sección.

### Carpeta `widgets/`

Esta carpeta **debe** estar conformada por mínimo dos archivos, con posibilidad de agregar tantos como el `feature` lo requiera. Estos son:

#### A. `feature_body.dart`

Es el archivo en donde se desarrollan los `widgets` o elementos de la interfaz gráfica de la aplicación.

#### B. `widgets.dart`

Es el archivo de barril para todos los archivos que se crearán dentro de la carpeta `widgets/`, facilitando el orden y la limpieza del código.

#### C. Otros archivos

Según los requerimientos del `feature` **puede** existir la necesidad, en pro de mantener una estructura legible, mantenible y organizada, de separar los `widgets` o elementos de la interfaz gráfica, en archivos separados.

:::warning
Al momento de refactorizar componentes o elementos de la interfaz gráfica, es importante determinar si estos serán utilizados únicamente por este `widget`, o si **puede** ser reutilizado en diferentes partes de la aplicación. En el primer caso, el `widget` si **debe** ser creado dentro de esta carpeta, pero en caso contrario, este **debe** ser creado dentro la carpeta `shared/` de los recursos compartidos del proyecto.
:::

:::info
Para mayor información y detalle sobre los `widgets`, referirse a su respectivo capítulo documentado.
:::

## Page

Esta sección describe todo lo necesario para elaborar correctamente la clase `Page`, dentro del archivo `view/feature_page.dart`.

### Nombrado

El nombre de la clase `Page` de un `feature` **debe** estar compuesto por el nombre de éste último, seguido del sufijo `Page`, escrito con el estilo _PascalCase_.

```dart
/// Para el feature de iniciar sesión.
class LoginPage {}

/// Para el feature de un perfil.
class ProfilePage {}

/// Para el feature del detalle de un contrato.
class ContractDetailPage {}
```

:::info
El nombrado de ésta clase es generado automáticamente por el `feature_brick`.
:::

### Extensión

La clase `Page` **debe** extender de la clase abstracta `StatelesWidget`.

```dart
/// Para cualquier feature.
class FeatureNamePage extends StatelessWidget {}
```

### Constructor

El constructor de la clase `Page` **debe** ser constante.

```dart
class FeatureNamePage extends StatelessWidget {
    const FeatureNamePage();
}
```

### Parámetros del constructor

El constructor **puede** requerir, dependiendo del `feature`, de uno o varios parámetros. En caso de, se **debe** crear una clase dentro del mismo archivo cuyo nombre sea el mismo del `feature`, seguido del sufijo `Params`, que contendrá todos los atributos o parámetros necesarios.

```dart
class FeatureNameParams {

    /// Aquí se declaran todas los atributos que sean parámetros
    /// necesarios del Page.
    final String featureId;
    final bool isToday;
    final int? index;

    const FeatureNameParams({
        required this.featureId,
        this.isToday = false,
        this.index,
    });

}

class FeatureNamePage extends StatelessWidget {
    const FeatureNamePage({
        required this.params,
    });

    final FeatureNameParams params;
}
```

#### A. QueryParams

A su vez, adicional a los parámetros convencionales de la clase `Page`, también existen los denominados `QueryParams`, que son los parámetros que provienen del `uri.queryParameters` de la ruta, y cuyos valores necesitan ser mapeados a los atributos de la clase `Params`, con la ayuda de un método `factory` denominado `fromQueryParams`.

```dart
class FeatureNameParams {

    /// Aquí se declaran todas los atributos que sean parámetros
    /// necesarios del Page.
    final String featureId;
    final bool isToday;
    final int? index;

    const FeatureNameParams({
        required this.featureId,
        this.isToday = false,
        this.index,
    });

    /// Método para obtener los parámetros provenientes del query de la ruta.
    factory FeatureNameParams.fromQueryParams(
        Map<String, dynamic> queryParams,
    ){
        return FeatureNameParams(
            featureId: queryParams['id'] ?? '',
            isToday: queryParams['isToday'] ?? false,
        );
    }

}
```

:::info
Este método factory **debe** ser utilizado en el builder respectivo de la ruta, en caso de que los parámetros pueden ser enviados dentro del mismo query, como ocurre con los `deepLinks`.
:::

### Rutas

Todos los `Pages`, al ser lo primero que se ejecuta en el flujo del código de un `feature`, **deben** tener definido su ruta o dirección, con el fin de poder navegar hacia ellos.

:::warning
Existen dos excepciones a esta regla, como lo son los `Pages` que son un `Tab` dentro un `DefaultTabController`, y los `Step` dentro de un formulario multipágina. En ninguno de estos casos se le **debe** crear una ruta a la clase. Para más información, dirigirse a su respectiva sección documentada.
:::

#### A. Variable `routeName`

Para las rutas nombradas, se **debe** declarar una variable de tipo `String`, estática y constante denominada `routeName`, que contenga el nombre del `feature`. Ésta **debe** estar en minúsculas, y en caso de que el nombre esté conformado por múltiples palabras, se **debe** hacer uso del estilo _kebab_.

```dart
class FeatureNamePage extends StatelessWidget {
    const FeatureNamePage();

    static const routeName = 'feature-name';
}
```

En caso de que la ruta requiera de un identificador único, como en las vistas de detalles de elementos, el mismo se puede indicar luego de la ruta, seguido de una barra con dos puntos (`/:`) y el nombre del identificador.

```dart
class FeatureNamePage extends StatelessWidget {
    const FeatureNamePage();

    static const routeName = 'feature-name/:id';
}
```

#### B. Variable `path`

Para las rutas por path se **debe** declarar una variable de tipo `String`, estática y constante denominada `path`, que debe contener una barra (`/`) seguido del valor de la variable `routeName`.

```dart
class FeatureNamePage extends StatelessWidget {
    const FeatureNamePage();

    static const path = '/$routeName';
}
```

:::warning
Todas las clases `Page` con rutas **deben** obligatoriamente tener declaradas y definidas las variables `routeName` y `path`.
:::

#### C. Método `buildPath`

Cuando una ruta sin importar si es nombrada o por path, requiere de sustituir o agregar el valor de algún parámetro, se **debe** crear un método estático que devuelva el `String` de la ruta con los valores de las llaves. Éste método **puede** ser tan complejo y extenso como la ruta lo necesite.

```dart
class FeatureNamePage extends StatelessWidget {
    const FeatureNamePage();

    static const path = '/$routeName';
    static const routeName = 'feature-name/:id';

    /// Método para reemplazar el texto id por el valor de éste en la ruta.
    static String buildPath(String id) => '/$routeName'.replaceFirst(':id', id);
}


/// Para el feature del detalle de un contrato
class ContractDetailPage extends StatelessWidget {
    const ContractDetailPage();

    static const path = '/$routeName';
    static const routeName = 'contract/:id';

    /// Método para reemplazar los diferentes parámetros que puede o no tener la ruta.
    static String buildPath({
        required String id,
        ContractDetailsTab initialTab = ContractDetailsTab.contract,
        bool? isCommerceContract = false,
    }) {
        var customPath = '/$routeName'.replaceFirst(':id', id);
        if (initialTab.isChat) {
        customPath += '?chat=true';
        }
        if (isCommerceContract == true) {
        customPath += '?commerce=true';
        }

        customPath += '?initialTab=${initialTab.i}';

        /// Al final no necesariamente se sustituyen todos los parámetros, porque hay
        /// algunos obligatorios como el id y el initialTab, y otros que no lo son como
        /// el chat y commerce.
        return customPath;
    }
}
```

#### D. Widget `PopScope`

En caso de que se desee que un `Page` no **pueda** regresar a la vista anterior, se **debe** implementar el widget `PopScope`. Éste **debe** ser el widget de retorno del método `build` de la clase, y **debe** incluir el atributo `canPop` en `false`.

```dart
class FeatureNamePage extends StatelessWidget {
    const FeatureNamePage();

    @override
    Widget build(BuildContext context) {

        /// Implementación del build.
        return PopScope(
            /// Este atributo inhabilita la opción de regresar a una vista anterior.
            canPop: false,
            child: MultiBlocProvider();
        );
    }
}
```

### Declaración de `BlocProviders`

Al utilizar `Bloc` como manejador de estados, el método `build` de la clase `Page` siempre **debe** retornar un `BlocProvider`, con la finalidad de crear las instancias necesarias de los `blocs` implementados en el `feature`. La única excepción a la regla es el uso del widget `PopScope`, en caso de que se desee inhabilitar la navegación hacia atrás en la vista.

Adicionalmente el atributo `child` del `BlocProvider` siempre **debe** ser un `Scaffold`, sin excepciones.

:::danger
El método `build` de la clase `Page` no **debe** retornar ningún otro widget que no sean los inidicados.
:::

#### A. BlocProvider

Todos los `features` contienen su propio bloc, el cuál **debe** ser inyectado al árbol de `widgets` del `feature` a través de su declaración en el `BlocProvider`.

```dart
class FeatureNamePage extends StatelessWidget {
    const FeatureNamePage();

    @override
    Widget build(BuildContext context) {
        return  BlocProvider(
            create: (context) => FeatureNameBloc(
                // Aquí se inyectan las dependencias de los casos de uso y variables
                // requeridas por el Bloc.
            ),
             child: Scaffold(),
        );
    }
}
```

#### B. MultiBlocProvider

En el caso de que el `feature` requiera de más de un `bloc`, éstos **deben** ser declarados en un `MultiBlocProvider`, el cual tiene un atributo denominado `providers`, que recibe la lista de los `BlocProviders` necesarios.

```dart
class FeatureNamePage extends StatelessWidget {
    const FeatureNamePage();

    @override
    Widget build(BuildContext context) {
        return MultiBlocProvider(
            providers: [
                BlocProvider(
                    create: (context) => FeatureNameBloc(),
                ),
                 BlocProvider(
                    create: (context) => OtherFeatureNameBloc(),
                ),
                // Se pueden declarar N BlocProviders como sean necesarios.
            ],
            child: Scaffold(),
        );
    }
}
```

### Scaffolding

Como se menciona en el artículo anterior, `BlocProvider` siempre **deben** retornar un `Scaffold`. Éste a su vez siempre **debe** contener en atributo `body`, una clase denominada `View`, que se **debe** crear siguiendo los lineamientos de su respectiva sección.

Por último, el `Scaffold` tiene diferentes propiedades que **pueden** ser añadidas en este punto, como el `appBar` o los botones en la lista de widgets `persistentFooterButtons`.

```dart
class FeatureNamePage extends StatelessWidget {
    const FeatureNamePage();

    @override
    Widget build(BuildContext context) {
        return  BlocProvider(
            create: (context) => FeatureNameBloc(),
             child: Scaffold(
                /// El body siempre debe ser un widget View.
                body: FeatureNameView(),
             ),
        );
    }
}
```

## Step-or-TabPages

Existen `features` que contienen todos los elementos requeridos por éstos, como `Page`, `View`, `Body` y `Bloc`, pero que no poseen rutas declaradas, generando que no se **pueda** navegar hacia ellos, desde cualquier parte de la aplicación, ya que forman parte de un flujo muy específico, siendo solo una parte de ellos.

:::info
Estos `features` funcionan igual que los convencionales, aplicando todas sus reglas, pero con algunas pequeñas excepciones.
:::

### StepPage

Es un `feature` que representa un "paso" en un `feature` mayor. Son nombrados con el nombre de éste último, seguido del sufijo `StepPage`.

```dart
class FeatureNameStepPage extends StatelessWidget {
    const FeatureNameStepPage();
}
```

### TabPages

Es un `feature` que se encuentra dentro del `DefaultTabController` de otro `feature` mayor, como un `Tab` de éste. Son nombrados con el nombre del `feature`, seguido del sufijo `StepPage`.

```dart
class FeatureNameTabPage extends StatelessWidget {
    const FeatureNameTabPage();
}
```

### Extensión

Al igual que los `Pages` de los `features` convencionales, los `Step-or-TabPages` siempre **deben** extender de `StatelessWidget`. Sin embargo, para ellos existe una excepción a esta regla, que permite que extiendan de la clase abstracta `StatefulWidget`:

#### A. Al usar `Mixins`.

Los `mixins` permiten agregar nuevas funcionalidades específicas a una clase, y que suelen requerir la implementación de alguna variable o método definido por este, pero que solo **pueden** ser aplicados en clases que extiendan de `StatefulWidget`.

```dart
/// Feature del formulario de creación de una empresa.
class CreateBusinessFormPage extends StatefulWidget {

  const CreateBusinessFormPage({super.key});
  @override
  State<CreateBusinessFormPage> createState() => _CreateBusinessFormPageState();
}

/// En este caso se utiliza el mixin AutomaticKeepAliveClientMixin para
/// mantener la información del bloc y su estado al volver a ingresar a la
/// vista, por lo que el Page **debe** extender de StatefulWidget.
class _CreateBusinessFormPageState extends State<CreateBusinessFormPage>
    with AutomaticKeepAliveClientMixin {


    @override
    Widget build(BuildContext context) {

        /// Requerido por el mixin utilizado.
        super.build();

        /// Implementación del build.
        return BlocProvider();
    }

    /// Implementación requerida por mixin utilizado.
    @override
    bool get wantKeepAlive => true;
}
```

:::warning
Existen diferentes `mixins` que se **pueden** implementar en una clase. Sin embargo, es importante saber con exactitud la finalidad de su uso, para así determinar si éste debe ser aplicado en la clase `Page` o en el `Body`, según el impacto y las implementaciones que requiera.
:::

## View

Esta sección describe todo lo necesario para elaborar correctamente la clase `View`, dentro del archivo `view/feature_page.dart`.

### Nombrado

El nombre de la clase `View` de un `feature` **debe** estar compuesto por el nombre de éste último, seguido del sufijo `View`, escrito con el estilo _PascalCase_.

```dart
/// Para el feature de iniciar sesión.
class LoginView {}

/// Para el feature de un perfil.
class ProfileView {}

/// Para el feature del detalle de un contrato.
class ContractDetailView {}
```

:::info
El nombrado de ésta clase es generado automáticamente por el `feature_brick`.
:::

### Extensión

La clase `View` **debe** extender de la clase abstracta `StatelesWidget`.

```dart
/// Para cualquier feature.
class FeatureNameView extends StatelessWidget {}
```

### Constructor

El constructor de la clase `View` **debe** ser constante, y no **debe** recibir ningún parámetro, más allá del `key` requerido por al ser una clase pública.

```dart
class FeatureNameView extends StatelessWidget {
    const FeatureNameView({super.key});
}
```

### Declaración de `BlocListeners`

El método `build` de la clase `View` sólo **puede** retornar dos widgets: el `Body` del `feature` o un `BlocListener`. Éste último tiene la finalidad de servir como puente de comunicación entre diferentes `blocs`, de reaccionar a los cambios de estado del `feature` y de navegar hacia otras vistas.

:::warning
Todos los `BlocListeners` **deben** cumplir un principio de singularidad, en donde cada `Listener` está a la escucha de una única propiedad del `State` a la vez. Por ésta razón se **debe** implementar la propiedad `listenWhen`, verificando los cambios de la propiedad a escuchar. Ésto significa que si se quieren escuchar múltiples propiedades al mismo tiempo y en la cual cada una responde en su accionar de distanta forma, éstas deben estar en `BlocListeners` separados.
:::

#### A. BlocListener

Cuando se necesita únicamente un `Listener`, se **debe** declarar un `BlocListener`, con su `listenWhen` y las respectivas acciones a implementar en el `listener`.

```dart
/// Para el feature de Login.
class LoginView extends StatelessWidget {
    const LoginView({super.key});

    @override
    Widget build(BuildContext context) {
        /// Se retorna un BlocListener en métod build del View.
        return BlocListener<LoginBloc, LoginState>(
            /// Se declara un listenWhen que sólo responde ante los
            /// cambios del status del LoginState.
            listenWhen: (previous, current) => previous.status != current.status,
            /// En el listener se definen todas las acciones a realizar
            /// cada vez que el status sea modificado.
            listener: (context, state) {
                if (state.status.isLoading) {
                    /// Si el status es loading, entonces muestra un loader
                    LoadingDialog.show(context);
                }
                if (state.status.isFailure) {
                    /// Si ocurre un fallo, oculta el loader y muestra un
                    /// un dialog indicándole al usuario la falla ocurrida.
                    LoadingDialog.hide(context);

                    showDialog(
                        context: context,
                        builder: (context) => CustomDialog(
                        type: DialogType.warning,
                        title: Text(S.of(context).appName),
                        content: Text(state.errorMessage),
                        actions: [
                            DialogAction(
                            isPrimaryAction: true,
                            child: Text(S.of(context).acceptButton),
                            ),
                        ],
                        ),
                    );
                }
                if (state.status.isSuccess) {
                    /// Si el status es exitoso, oculta el loader y
                    /// navega hacia el home de la app.
                    LoadingDialog.hide(context);
                    context.goNamed(HomePage.routeName);
                }
            },
            /// El child siempre debe ser el Body del feature.
            child: const LoginBody(),
            );
    }
}
```

#### B. MultiBlocListener

Cuando se necesitan múltiples `Listener`, se **debe** hacer uso de un `MultiBlocListener`, cuya propiedad `listeners` contendrá la lista de los `BlocListeners` con sus respectivas implementaciones.

```dart
class LoginView extends StatelessWidget {
  const LoginView({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocListener(
      listeners: [
        BlocListener<LoginBloc, LoginState>(
          listenWhen: (previous, current) =>
              previous.submitStatus != current.submitStatus,
          listener: (context, state) {
            /// Acciones a implementar.
          },
        ),
        /// Un mismo Bloc puede tener múltiples BlocListener.
        BlocListener<LoginBloc, LoginState>(
          listenWhen: (previous, current) =>
              previous.requestStatus != current.requestStatus,
          listener: (context, state) {
          },
        ),
        /// Y pueden haber otros Blocs que no sean el mismo del feature.
        BlocListener<OtherBloc, OtherState>(
          listenWhen: (previous, current) =>
              previous.status != current.status,
          listener: (context, state) {
            /// Acciones a implementar.
          },
        ),
      ],
      child: const LoginBody(),
    );
  }
}
```

#### C. Body

La propidad `child` del `BlocListener` siempre **debe** retornar el `Body` del `feature`.

#### D. Comunicación entre `Blocs`

Existen casos en los que un evento de un `Bloc` es generado únicamente luego de que un envento de otro `Bloc` diferente se ejecuta retornando un valor en específico. En estos casos el puente de conexión entre éstos **debe** ser un `BlocListener`.

```dart
/// Para el feature de Login.
class LoginView extends StatelessWidget {
    const LoginView({super.key});

    @override
    Widget build(BuildContext context) {
        return BlocListener<LoginBloc, LoginState>(
            listenWhen: (previous, current) => previous.status != current.status,
            listener: (context, state) {

              if (state.status.isSuccess) {
                /// Solo en caso de que el status del LoginState sea
                /// exitoso, es cuando se llamará al evento del otro bloc.
                context.read<OtherBloc>().add(const OtherBlocEven());
              }
            },
            child: const LoginBody(),
            );
    }
}
```

### Layouts Responsivos

//TODO

## Body

Esta sección describe todo lo necesario para elaborar correctamente la clase `Body`, dentro del archivo `widgets/feature_body.dart`.

### Nombrado

El nombre de la clase `Body` de un `feature` **debe** estar compuesto por el nombre de éste último, seguido del sufijo `Body`, escrito con el estilo _PascalCase_.

```dart
/// Para el feature de iniciar sesión.
class LoginBody {}

/// Para el feature de un perfil.
class ProfileBody {}

/// Para el feature del detalle de un contrato.
class ContractDetailBody {}
```

:::info
El nombrado de ésta clase es generado automáticamente por el `feature_brick`.
:::

### Extensión

Los `Body` siempre que sea posible **deben** extender de la clase abstracta `StatelessWidget`. Sin embargo, es muy común que se requiera el uso de algún `mixin` como `AutomaticKeepAliveClientMixin`, `TickerProviderStateMixin`, entre otros, que requieren de que la clase extienda de `StatefulWidget`. Todo dependerá de lo que ésta clase necesite.

### Constructor

//TODO

### Definición de parámetros

//TODO
