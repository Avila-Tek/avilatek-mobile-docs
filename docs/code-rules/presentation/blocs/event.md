# Event

Los **eventos** del Bloc representan acciones o intenciones que desencadenan una actualización en el estado de la aplicación. Es la forma en que el sistema notifica al Bloc que algo ha sucedido y, en respuesta, este debe tomar medidas. El Bloc escucha los eventos que se envían desde la UI u otros componentes, y, en base a ellos, ejecuta la lógica de negocio para producir un nuevo estado.

## Clases

### Evento base
Los eventos bases cumplen con el nombrado anterior, 

### Nombrado de clases
Los nombres de los eventos que heredan del evento base **deben** incluir un verbo en pasado que describa la acción realizada. **Pueden** incorporar el nombre de la funcionalidad, a menos que esto genere un nombre excesivamente largo. En tal caso, el desarrollador **puede** ajustar el nombre, siempre y cuando mantenga coherencia con la funcionalidad.

```dart
class UserStarted extends UserEvent {}

class UserChanged extends UserEvent {}
```



<!-- Clases
1. Nombrado
2. Evento base
  1. Tipo de clase (sealed, definir)
  2. Herencia de otros eventos
3. Extensión Equatable -->