'use strict';

(function () {
  var containerForm = document.querySelector('.ad-form');
  var typeElement = containerForm.querySelector('#type');
  var priceElement = containerForm.querySelector('#price');
  var roomNumbers = containerForm.querySelector('#room_number');
  var capacity = containerForm.querySelector('#capacity');
  var fieldsetTime = containerForm.querySelector('.ad-form__element--time');
  var timeSelects = ['timein', 'timeout'];
  var typeHousing = {
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

  // Функция синхронизации полей времени въезда и выезда
  fieldsetTime.addEventListener('change', function (evt) {
    var target = evt.target;
    var selects = fieldsetTime.querySelectorAll('select');

    Array.from(selects).forEach(function (elem, i) {
      if (timeSelects.indexOf(selects[i].id) !== -1) {
        selects[i].value = target.value;
      }
    });
  });

  // Функция валидации полей типа жилья и цены
  var onTypeHousingChange = function () {
    var type = typeElement.value;
    var minPrice = typeHousing[type].minPrice;

    priceElement.placeholder = minPrice;
    priceElement.min = minPrice;
  };

  // Функция валидации полей кол-ва комнат и гостей
  var onRoomNumberValue = function () {
    var roomNumbersValue = parseInt(roomNumbers.value, 10);
    var capacityValie = parseInt(capacity.value, 10);
    var noGuests = (capacityValie === 0);

    if (roomNumbersValue === 1 && roomNumbersValue < capacityValie || roomNumbersValue === 1 && noGuests) {
      capacity.setCustomValidity('Количество гостей не должно быть больше 1');
    } else if (roomNumbersValue === 2 && roomNumbersValue < capacityValie || roomNumbersValue === 2 && noGuests) {
      capacity.setCustomValidity('Количество гостей не должно быть больше 2');
    } else if (roomNumbersValue === 3 && noGuests) {
      capacity.setCustomValidity('Количество гостей не должно быть больше 3');
    } else if (roomNumbersValue === 100 && !noGuests) {
      capacity.setCustomValidity('Все комнаты не для гостей');
    } else {
      capacity.setCustomValidity('');
    }
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

  window.form = {
    getContainerForm: getContainerForm,
    getTypeElement: getTypeElement,
    getRoomNumbers: getRoomNumbers,
    getCapacity: getCapacity,
    getTypeHousingChange: onTypeHousingChange,
    getRoomNumberValue: onRoomNumberValue,
    getFormSubmitHandler: getFormSubmitHandler
  };
})();
