'use strict';

(function () {
  var showModalSuccess = function () {
    var similarModalSuccess = document.querySelector('#success').content.querySelector('.success');
    var modalSuccess = similarModalSuccess.cloneNode(true);

    document.addEventListener('keydown', getModalEscPress);
    document.addEventListener('click', getModalSuccessClick);
    document.querySelector('main').appendChild(modalSuccess);
  };

  var showModalError = function (message) {
    var similarModalError = document.querySelector('#error').content.querySelector('.error');
    var modalError = similarModalError.cloneNode(true);
    var errorBtn = modalError.querySelector('.error__button');

    modalError.querySelector('.error__message').textContent = message;

    document.addEventListener('keydown', getModalEscPress);
    document.addEventListener('click', getModalErrorClick);
    errorBtn.addEventListener('click', getBtnErrorClick);
    document.querySelector('main').appendChild(modalError);
  };

  var closeModal = function (classModal) {
    var modalElement = document.querySelector('.' + classModal);

    if (modalElement) {
      modalElement.remove();
      switch (classModal) {
        case 'success':
          document.removeEventListener('keydown', getModalEscPress);
          document.removeEventListener('click', getModalSuccessClick);
          break;

        case 'error':
          document.removeEventListener('keydown', getModalEscPress);
          document.removeEventListener('click', getModalErrorClick);
      }
    }
  };

  var getModalEscPress = function (evt, callback, type) {
    if (callback(evt)) {
      closeModal('type');
    }
  };

  var getModalSuccessClick = function () {
    closeModal('success');
  };

  var getModalErrorClick = function () {
    closeModal('error');
  };

  var getBtnErrorClick = function () {
    closeModal('error');
  };

  window.modal = {
    getModalEscPress: getModalEscPress,
    successMessage: showModalSuccess,
    errorMessage: showModalError
  };
})();
