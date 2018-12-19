'use strict';

(function () {
  var getModalMessage = function (type, message) {
    var similarModalMessage = document.querySelector('#' + type).content.querySelector('.' + type);
    var modalMessage = similarModalMessage.cloneNode(true);

    modalMessage.querySelector('.' + type + '__message').textContent = message;

    document.addEventListener('click', onModalClick);
    document.querySelector('main').appendChild(modalMessage);
  };

  var closeModal = function () {
    var modalElement = document.querySelector('.success') || document.querySelector('.error');

    modalElement.remove();
    document.removeEventListener('click', onModalClick);
  };

  var onModalClick = function () {
    closeModal();
  };

  window.modal = {
    getModalMessage: getModalMessage,
    closeModal: closeModal
  };
})();
