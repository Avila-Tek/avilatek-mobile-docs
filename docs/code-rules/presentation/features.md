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

Todos los `Pages`, al ser lo primero que se ejecuta en el flujo del código de un `feature`, **deben** tener definido su ruta o dirección, con el fin de poder navegar hacia ellos. Por esta razón necesitan de:

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

:::warning
Existen dos excepciones a esta regla, como lo son los `Pages` que son un `Tab` dentro un `DefaultTabController`, y los `Step` dentro de un formulario multipágina. En ninguno de estos casos se le **debe** crear una ruta a la clase. Para más información, dirigirse a su respectiva sección documentada.
:::

#### D. Widget `PopScope`

//TODO

### Declaración de `BlocProviders`

//TODO

Al utilizar `Bloc` como manejador de estados, el método `build` de la clase `Page` siempre **debe** retornar un `BlocProvider`.
// danger no widgets.

#### A. BlocProvider

//TODO

#### B. MultiBlocProvider

//TODO

#### C. Child

//TODO

### Scaffolding

//TODO

#### A. AppBar

//TODO

#### B. Body

el view
//TODO

## StepTabPages

//TODO
//TODO

Sin embargo, existe una excepción a esta regla, que permite que se extienda de la clase abstracta `StatefulWidget`:

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
Existen diferentes `mixins` que se **pueden** implementar en una clase. Sin embargo, es importante saber con exactitud la finalidad de su uso, para así determinar si éste debe ser aplicado en la clase `Page` o en otra clase como el `Body`, según el impacto y las implementaciones que requiera.
:::

## View

//TODO

### Nombrado

//TODO

### Extensión

//TODO

### Constructor

//TODO

### Declaración de `BlocListeners`

//no widgets
//TODO

#### A. BlocListener

//TODO

#### B. MultiBlocListener

//TODO

#### C. Body

//TODO

### Layouts Responsivos

//TODO

## Body

//TODO

### Nombrado

//TODO

### Extension

//TODO

### Constructor

//TODO

### Definición de parámetros

//TODO
