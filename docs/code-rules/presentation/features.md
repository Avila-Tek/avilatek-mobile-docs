# Features

Este capítulo describe cómo crear, organizar, nombrar y desarrollar los diferentes elementos y clases que hacen vida dentro de un `Feature`.

## Creación

Para la creación de un `feature` se **puede** hacer uso de la plantilla de Mason llamada `feature_brick`, que permite la rápida creación de un `feature` con toda la estructura necesaria para cumplir con la Arquitectura Limpia, que se explicará más adelante. Sin embargo, en caso de que se desee usar, ésta **debe** ser la disponible en el paquete de [Avila Tek Flutter Common Library (FCL)](https://github.com/Avila-Tek/flutter_common_lib/tree/master/bricks/feature_brick), y no la original de [BrickHub.dev](https://brickhub.dev/bricks/feature_brick/0.6.2), ya que la de Ávila contiene unas pequeñas adaptaciones que se ajustan a la estructura requerida y definida por el departamento de desarollo móvil.

### Sin `feature_brick`

Si no se desea usar la plantilla de Ávila `feature_brick`, la estructura del `feature` **puede** ser creada manualmente, siempre y cuando cumpla con todo lo requerido en el presente capítulo.

:::warning
Si bien es cierto que se **puede** crear un `feature` de forma manual, el tiempo invertido y la dificultad es mucho mayor, que apoyándose de la plantilla creada para tal fin. Por lo cual al conocer bien la estructura y organización de un `feature`, se recomienda hacer uso de la plantilla.
:::

### Con `feature_brick`

### Comando a ejecutar

Para la creación de un `feature` con la plantilla `feature_brick` de Ávila, se **debe** ejecutar su respectivo comando en la terminal del proyecto, apuntando desde la dirección raíz del mismo, en cualquiera de sus siguientes versiones:

```sh
mason make feature_brick -o ./lib/src/modules/exchange/presentation

mason make feature_brick --feature_name market_loan_requests --state_management bloc --output-dir ./lib/src/modules/loans/presentation
```

### Explicación del comando

El comando viene con varias opciones o variables que se **pueden** indicar directamente al escribir el comando inicial, o ir respondiendo uno a uno cuando la plantilla te pregunte. Estas opciones son:

#### A. `--output-dir` u `-o`

La ruta dentro del proyecto en donde se creará el `feature` **debe** ser indicada al ejecutar el comando, desde la raíz del mismo. La ruta final en donde se creará el `feature` **debe** ser dentro de la respectiva carpeta de presentación del proyecto.

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
