# Features

Este capítulo describe cómo crear, organizar, nombrar y desarrollar los diferentes elementos y clases que hacen vida dentro de un `Feature`.

## Creación

Para la creación de un `Feature` se **puede** hacer uso de la plantilla de Mason llamada `feature_brick`, la cual contiene toda la estructura necesaria para cumplir con la Arquitectura Limpia, que se explicará más adelante.

:::info
Para mayor información sobre el uso y funcionamiento de las plantillas de Mason, referirse a su documentación oficial en https://docs.brickhub.dev/.
:::

### Ejemplo de creación con `feature_brick`

#### A. Comando a ejecutar

Para la creación de un `Feature` con la plantilla `feature_brick` de Mason, se **debe** ejecutar el siguiente comando en la terminal del proyecto, apuntando desde la dirección raíz del mismo:

```sh
mason make feature_brick --feature_name market_loan_requests --state_management bloc --output-dir ./lib/src/modules/loans/presentation

mason make feature_brick --feature_name profile --state_management bloc --output-dir ./lib/src/modules/user/presentation
```

#### B. Explicación del comando

El comando viene con varias opciones o variable que se **pueden** indicar como lo son:

##### B.1. `--feature_name`

Aquí se indicará el nombre que tendrá el `feature`, el cual **debe** cumplir con las reglas de nombrado que se explican en su respectiva sección a continuación. De no ser indicado, el mismo por defecto será `login`.

##### B.2. `--state_management`

El manejador de estados **debe** ser `bloc`. De no indicarse, será este mismo por defecto.

##### B.3. `--output-dir`

La ruta dentro del proyecto en donde se creará el `feature` **debe** ser indicada, desde la raíz del mismo. La ruta final **debe** ser dentro de la carpeta de presentación.

:::info
Para mayor información sobre el uso y funcionamiento de la plantilla `feature_brick` de Mason, referirse a su documentación oficial en https://brickhub.dev/bricks/feature_brick/0.6.2.
:::
