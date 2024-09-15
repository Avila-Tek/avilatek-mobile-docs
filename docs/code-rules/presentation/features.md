# Features

Este capítulo describe cómo crear, organizar, nombrar y desarrollar los diferentes elementos y clases que hacen vida dentro de un `Feature`.

## Creación

Para la creación de un `Feature` se **puede** hacer uso de la plantilla de Mason llamada `feature_brick`, la cual contiene toda la estructura necesaria para cumplir con la Arquitectura Limpia, que se explicará más adelante.

:::info
Para mayor información sobre el uso y funcionamiento de las plantillas de Mason, referirse a su documentación oficial en https://docs.brickhub.dev/.
:::

### Ejemplo de creación con `feature_brick`

Para la creación de un `Feature` con la plantilla `feature_brick` de Mason, se **debe** ejecutar el siguiente comando en la terminal del proyecto, apuntando desde la dirección raíz del mismo:

```sh
mason make feature_brick --feature_name market_loan_requests_filtered --state_management bloc --output-dir ./lib/src/modules/loans/presentation
```
