'use strict';

(function () {
  var containerMessage = document.querySelector('main');
  var modalElement;

  var getModalMessage = function (type, message) {
    var similarModalMessage = document.querySelector('#' + type).content.querySelector('.' + type);
    var modalMessage = similarModalMessage.cloneNode(true);

    modalMessage.querySelector('.' + type + '__message').textContent = message;

    document.addEventListener('keydown', onModalEscPress);
    document.addEventListener('click', onModalClick);
    containerMessage.appendChild(modalMessage);
  };

  var getDomElementMessage = function () {
    modalElement = document.querySelector('.success') || document.querySelector('.error');
    return modalElement;
  };

  var closeModal = function () {
    var element = getDomElementMessage();

    element.remove();
    document.removeEventListener('click', onModalClick);
    document.removeEventListener('keydown', onModalEscPress);
  };

  var onModalClick = function () {
    closeModal();
  };

  var onModalEscPress = function (evt) {
    if (window.card.escEvent(evt)) {
      closeModal();
    }
  };

  window.modal = {
    getModalMessage: getModalMessage
  };
})();
