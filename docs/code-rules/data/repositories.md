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

La clase repositorio de la capa de datos **debe** extender de la interfaz repositorio de la capa dominio.

```dart
class UserRepository extends IUserRepository {}

class ReportRepository IReportRepository {}

class PortfolioRepository IPortfolioRepository {}
```

## Constructores

### Inyección de dependencias (Data sources)

El repositorio **debe** recibir las variables y dependencias como parámetros delegados y asignarlos a los atributos privados respectivos de la clase en el constructor.

```dart
class UserRepository extends IUserRepository {
// Se pide por parametros y se instancia a la variable api en el archivo
  UserRepository(UserApi api) : _api = api;

  final UserApi _api;
}
```

## Atributos

### Declarar variables públicas y privadas

#### A. Atributos privados

Los atributos de uso interno de la clase, como dependencias y variables auxiliares, **deben** ser atributos privados.

#### B. Atributos públicos

Los atributos públicos que sean parte de la firma de la interfaz del repositorio **deben** declararse como getters de atributos privados.

```dart
abstract class IUserRepository {
   List<Country> countries;
}

class UserRepository extends IUserRepository {
  List<Country> _countries = <Country>[];
  @override
  List<Country> get countries => _countries;
}
```

## Streams

Los `Streams` **deben** declararse como getters del atributo stream de un `StreamController` que controle el flujo de información en el repositorio. La variable del `StreamController` **debe** ser privada.

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

## Logger

Las funciones en los repositorios **deben** tener un control de ejecución al momento de las llamadas mediante la función `log`

### Rastreo de llamadas

#### A. Inicio de la llamada, error y success

Al momento de iniciar una llamada debe registrarse los pasos de ejecución y **debe** incluir el uso de los siguientes emojis:

- 📡 Inicio de la llamada
- ✅ Llamada exitosa
- ❌ Error en la llamada

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

#### B. Variable `_source`

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
      );
      rethrow;
    }
  }
}
```

#### A. Pasar `error` y `stacktrace` en el log de catch

Al momento de realizar el try/catch de la petición se **puede** pasar el parametro `e` y el `s` en el log del catch

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
    /// Vamos a identificar si existe una excepcion personalizada en la cual
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
