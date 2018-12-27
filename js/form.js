'use strict';

(function () {
  var TYPE_HOUSING = {
    bungalo: {
      minPrice: 0
    },
    flat: {
      minPrice: 1000
    },
    house: {
      minPrice: 5000
    },
    palace: {
      minPrice: 10000
    }
  };
  var containerForm = document.querySelector('.ad-form');
  var typeElement = containerForm.querySelector('#type');
  var priceElement = containerForm.querySelector('#price');
  var roomNumbers = containerForm.querySelector('#room_number');
  var capacity = containerForm.querySelector('#capacity');
  var fieldsetTime = containerForm.querySelector('.ad-form__element--time');
  var resetBtn = containerForm.querySelector('.ad-form__reset');
  var timeSelects = ['timein', 'timeout'];

  fieldsetTime.addEventListener('change', function (evt) {
    var target = evt.target;
    var selects = fieldsetTime.querySelectorAll('select');

    Array.from(selects).forEach(function (element, i) {
      if (timeSelects.indexOf(selects[i].id) !== -1) {
        selects[i].value = target.value;
      }
    });
  });

  var onTypeHousingChange = function () {
    var type = typeElement.value;
    var minPrice = TYPE_HOUSING[type].minPrice;

    priceElement.placeholder = minPrice;
    priceElement.min = minPrice;
  };

  var onRoomNumberValue = function () {
    var roomNumbersValue = parseInt(roomNumbers.value, 10);
    var capacityValie = parseInt(capacity.value, 10);
    var noGuests = (capacityValie === 0);
    capacity.setCustomValidity('');
    var message = '';

    switch (roomNumbersValue) {
      case 1:
        if (roomNumbersValue === 1 && roomNumbersValue < capacityValie || roomNumbersValue === 1 && noGuests) {
          message = 'Количество гостей не должно быть больше 1';
        }
        break;
      case 2:
        if (roomNumbersValue === 2 && roomNumbersValue < capacityValie || roomNumbersValue === 2 && noGuests) {
          message = 'Количество гостей не должно быть больше 2';
        }
        break;
      case 3:
        if (roomNumbersValue === 3 && noGuests) {
          message = 'Количество гостей не должно быть больше 3';
        }
        break;
      case 100:
        if (roomNumbersValue === 100 && !noGuests) {
          message = 'Все комнаты не для гостей';
        }
        break;
    }
    capacity.setCustomValidity(message);
  };

  var getContainerForm = function () {
    return containerForm;
  };

  var getTypeElement = function () {
    return typeElement;
  };

  var getRoomNumbers = function () {
    return roomNumbers;
  };

  var getCapacity = function () {
    return capacity;
  };

  var getFormSubmitHandler = function (callback) {
    containerForm.addEventListener('submit', callback);
  };

  var getResetBtnHandler = function (callback) {
    resetBtn.addEventListener('click', callback);
  };

  window.form = {
    getContainerForm: getContainerForm,
    getTypeElement: getTypeElement,
    getRoomNumbers: getRoomNumbers,
    getCapacity: getCapacity,
    getTypeHousingChange: onTypeHousingChange,
    getRoomNumberValue: onRoomNumberValue,
    getFormSubmitHandler: getFormSubmitHandler,
    getResetBtnHandler: getResetBtnHandler
  };
})();
