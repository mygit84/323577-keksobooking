'use strict';

(function () {
  var showModalMessage = function (type, message) {
    var similarModalMessage = document.querySelector('#' + 'type').content.querySelector('.' + 'type');
    var modalMessage = similarModalMessage.cloneNode(true);

    switch (type) {
      case 'success':
        message = 'Ваше объявление<br>успешно размещено!';
        modalMessage.querySelector('.error__message').textContent = message;
        break;

      case 'error':
        modalMessage.querySelector('.error__message').textContent = message;
        break;
    }
    document.querySelector('main').appendChild(modalMessage);
  };

  var closeModal = function (type) {
    var modalElement = document.querySelector('.' + type);

    if (modalElement) {
      modalElement.remove();
      switch (type) {
        case 'success':
          document.removeEventListener('keydown', getEscPressHandler);
          document.removeEventListener('click', getClickHandler);
          break;

        case 'error':
          document.removeEventListener('keydown', getEscPressHandler);
          document.removeEventListener('click', getClickHandler);
          break;
      }
    }
  };

  var getEscPressHandler = function (type, callback) {
    document.addEventListener('keydown', function () {
      if (callback) {
        closeModal('type');
      }
    });
  };

  var getClickHandler = function (type) {
    document.addEventListener('click', function () {
      closeModal('type');
    });
  };

  var getBtnErrorClick = function () {
    closeModal('error');
  };

  window.modal = {
    showModal: showModalMessage,
    modalEscPress: getEscPressHandler,
    modalClick: getClickHandler
  };
})();
