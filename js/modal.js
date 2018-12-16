'use strict';

(function () {
  var getModalMessage = function (type, message) {
    var similarModalMessage = document.querySelector('#' + type).content.querySelector('.' + type);
    var modalMessage = similarModalMessage.cloneNode(true);

    modalMessage.querySelector('.' + type + '__message').textContent = message;

    document.querySelector('main').appendChild(modalMessage);
  };

  var setModalMessage = function (type, message) {
    switch (type) {
      case 'success':
        message = 'Ваше объявление успешно размещено!';
        getModalMessage(type, message);
        break;

      case 'error':
        getModalMessage(type, message);
        break;
    }
  };

  window.modal = {
    modalMessage: setModalMessage
  };
})();
