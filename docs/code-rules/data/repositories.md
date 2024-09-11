---
title: Repositorios
---

# Repositorios

## Clases

### Nombrado de repositorios

Los repositorios **deben** reflejar el módulo o el conjunto de datos que gestiona y terminar con el sufijo `Repository`.

```dart
class UserRepository

class ReportRepository

class PortfolioRepository
```

### Extensión de repositorio (capa de dominio)

El repositorio luego de su nombramiento **debe** incluir la extensión de su interfaz de la capa de dominio agregando `extends` despues de nombrarlo.

```dart
class UserRepository extends IUserRepository {}

class ReportRepository IReportRepository {}

class PortfolioRepository IPortfolioRepository {}
```

## Constructores

### Inyección de dependencias (Data sources)

El repositorio **debe** inicializar sus dependencias a través de una variable y luego instanciarse a través del constructor.

```dart
class UserRepository extends IUserRepository {
// Se pide por parametros y se instancia a la variable api en el archivo
  UserRepository(UserApi api) : _api = api;

  final UserApi _api;
}
```

## Atributos

### Declarar variables públicas y privadas

El repositorio **puede** declarar variables públicas para el uso global del proyecto y variables privadas para uso interno del archivo.

```dart
class UserRepository extends IUserRepository {
  UserRepository(UserApi api) : _api = api;

  final UserApi _api; ///Variable privada 🔒

  ///Variables públicas que podrán ser implementadas fuera del archivo
  @override
  List<Country> countries = <Country>[];

  @override
  List<LanguageTag> languages = <LanguageTag>[];
}
```

## Stream

Los repositorios **pueden** tener inicializaciones y ejecuciones de streams.

### Declaración

Los streams **deben** tener la siguiente estructura.

```dart
class UserRepository extends IUserRepository {
  UserRepository(UserApi api) : _api = api;

  final UserApi _api;

  /// Se crea el controlador privado y utilizando el tipo de dato a manejar se termina
  /// con broadcast para permitir múltiples suscriptores al stream
  final _currentUserController = StreamController<bool>.broadcast();

  /// Stream que emite el estado actual y
  /// los suscriptores pueden escuchar este stream para recibir actualizaciones.
  @override
  Stream<bool> get currentUserStream => _currentUserController.stream;

  /// Se crea un Sink para agregar nuevos valores al stream al momento de ejecutar una función
  void Function(bool) get _currentUserSink => _currentUserController.sink.add;
}
```

### Casos de uso

La función `Sink` del stream a utilizar **debe** implementarse luego de la llamada de la función para que el nuevo valor sea implementado al stream.

```dart
class UserRepository extends IUserRepository {
  UserRepository(UserApi api) : _api = api;

  final UserApi _api;

  //Block Stream
  final _blockController = StreamController<String>.broadcast();

  @override
  Stream<String> get blockStream => _blockController.stream;

  void Function(String) get _blockSink => _blockController.sink.add;

  @override
  Future<void> blockProfile(String profileId) async {
    try {
      log(
        '📡 Blocking profile',
        name: '$_source.blockProfile()',
      );

      await _api.blockProfile(currentUserId, profileId);

      log(
        '✅ Profile blocked',
        name: '$_source.blockProfile()',
      );
       /// Luego de la llamada se utiliza el sink para pasar el valor
       /// en este caso para saber el id del usuario que se está bloqueando
      _blockSink(profileId);

      return;
    } catch (e, s) {
      log(
        '❌ Error blocking profile',
        name: '$_source.blockProfile()',
        error: e,
      );
      rethrow;
    }
  }
}
```

## Logger

Las funciones en los repositorios **deben** tener un control de ejecución al momento de las llamadas mediante la función `log`

### Rastreo de llamadas

#### A. Inicio de la llamada, error y success

Al momento de iniciar una llamada debe registrarse los pasos de ejecución de la siguiente manera:

```dart
class PostRepository extends IPostRepository {
  PostRepository({required PostApi api}) : _api = api;

  final PostApi _api;

  @override
  Future<void> likeComment({
    required String commentId,
    required String userId,
  }) async {
    try {
      log('📡 Adding like comment to comment: $commentId'); // Inicio de la llamada

      await _api.addLikeComment(
        commentId: commentId,
        userId: userId,
      );

      log('✅ Success add like comment $commentId'); // LLamada exitosa
    } catch (e, s) {
      log('❌ Add like comment $commentId failure'); // Error en la llamada
      rethrow;
    }
  }
}
```

#### B. Variable \_source

Los repositorios **deben** dar a la creación de una variable privada llamada `_source` para que sea incluida en la ejecución y rastreo de la llamada de las funciones en el parametro `name` de la función `log`.

```dart
class PostRepository extends IPostRepository {
  PostRepository({required PostApi api}) : _api = api;

  final PostApi _api;

  static const String _source = 'PostRepository';

  @override
  Future<void> deleteComment({
    required String userId,
    required String commentId,
  }) async {
    try {
    // Uso de la variable source para localizar el repositorio + la función que se está usando
      log(
        'Delete comment $commentId',
        name: '$_source.deleteComment',
      );
      await _api.deleteCommentPost(
        itemId: commentId,
        ownerId: userId,
      );
      log(
        '✅ Success delete comment $commentId',
        name: '$_source.deleteComment',
      );
    } catch (e, s) {
      log(
        '❌ Delete comment $commentId',
        name: '$_source.deleteComment',
        error: e,
        stackTrace: s,
      );
      rethrow;
    }
  }
}
```

## Métodos

### Flujo de ejecución (try/catch, excepciones)

Las funciones de los repositorios **deben** incluir un control de flujo implementado bajo un `try/catch` y del retorno de excepciones segun sea el caso. Como el siguiente ejemplo:

```dart
class ReportsRepository extends IReportsRepository {
  ReportsRepository(ReportsApi api) : api = api;

  final _source = 'ReportsRepository';
  final ReportsApi api;

  @override
  Future<void> createReport({
    required Report report,
    required String locale,
  }) async {
    try {
    /// Inicialización del try/catch
      log(
        '📡 Creating report',
        name: '$_source.createReport',
      );

      await api.createReport(
        report: ReportModel.fromEntity(report),
        locale: locale,
      );

      log(
        '✅ Report created',
        name: '$_source.createReport',
      );
    /// Vamos a identificar si existe una excepcion personalisada en la cual
    /// recogeremos el mensaje de error que nos arroje el servidor y haremos un throw de dicha excepción
    /// que se manejará en la UI.
    } on ResponseException catch (e) {
      log(
        '❌ Error creating the report: ${e.message}',
        name: '$_source.followProfile()',
        error: e,
      );
      throw ReportProfileException(
        message: e.message,
      );
    /// De no tener la excepción finalizaremos el try/catch para hacer un rethrow
    /// y en las capas inferiores del proyecto se manejará esta excepción.
    } catch (e) {
      log(
        '❌ Error creating the report',
        name: '$_source.createReport',
        error: e,
      );
      rethrow;
    }
  }
}

```
