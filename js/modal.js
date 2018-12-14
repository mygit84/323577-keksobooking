'use strict';

(function () {
  var showModalSuccess = function () {
    var similarModalSuccess = document.querySelector('#success').content.querySelector('.success');
    var modalSuccess = similarModalSuccess.cloneNode(true);

    document.addEventListener('keydown', getModalSuccessEscPress);
    document.addEventListener('click', getModalSuccessClick);
    document.querySelector('main').appendChild(modalSuccess);
  };

  var showModalError = function (message) {
    var similarModalError = document.querySelector('#error').content.querySelector('.error');
    var modalError = similarModalError.cloneNode(true);
    var errorBtn = modalError.querySelector('.error__button');

    modalError.querySelector('.error__message').textContent = message;

    document.addEventListener('keydown', getModalErrorEscPress);
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
          document.removeEventListener('keydown', getModalSuccessEscPress);
          document.removeEventListener('click', getModalSuccessClick);
          break;

        case 'error':
          document.removeEventListener('keydown', getModalErrorEscPress);
          document.removeEventListener('click', getModalErrorClick);
      }
    }
  };

  var getModalSuccessEscPress = function (evt) {
    if (window.card.isEscEvent(evt)) {
      closeModal('success');
    }
  };

  var getModalErrorEscPress = function (evt) {
    if (window.card.isEscEvent(evt)) {
      closeModal('error');
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
    successMessage: showModalSuccess,
    errorMessage: showModalError
  };
})();
