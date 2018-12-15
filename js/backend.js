'use strict';

(function () {
  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SAVE: 'https://js.dump.academy/keksobooking'
  };
  var TIMEOUT = 10000;
  var Status = {
    OK: 200,
    BAD: 400,
    NOT_AUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case Status.OK:
          onLoad(xhr.response);
          break;

        case Status.BAD:
          error = 'Неверный запрос';
          break;

        case Status.NOT_AUTHORIZED:
          error = 'Пользователь не авторизован';
          break;

        case Status.NOT_FOUND:
          error = 'Ничего не найдено';
          break;

        case Status.SERVER_ERROR:
          error = 'Ошибка сервера';
          break;

        default:
          error = 'Ошибка: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания ответа');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  var loadData = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  var saveData = function (data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('POST', Url.SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    save: saveData
  };
})();
