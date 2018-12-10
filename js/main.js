'use strict';

(function () {

  var MIN_COORDINATE_X = 0;
  var MAX_COORDINATE_X = 1200;
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var containerFilters = window.map.getMap.querySelector('.map__filters');
  var mapFiltersContainer = window.map.getMap.querySelector('.map__filters-container');
  var isPageActive = false;
  var startCoords = {
    x: 0,
    y: 0
  };

  var getDisabledElement = function (element) {
    if (!isPageActive) {
      element.setAttribute('disabled', 'disabled');
    }
    if (isPageActive) {
      element.removeAttribute('disabled', 'disabled');
    }
  };

  var getLockFieldset = function (container) {

    for (var i = 0; i < container.children.length; i++) {
      var fieldsetElement = container.children[i];
      getDisabledElement(fieldsetElement);
    }
  };

  var getAddressPin = function () {
    return window.map.getCoordsMainPin(isPageActive, MAIN_PIN_HEIGHT);
  };

  // Функция обработки события по клику мыши на метку
  var onPinClick = function (elem, index, arr) {
    elem.addEventListener('click', function () {
      window.map.getMap.insertBefore(window.card.getMapCard(arr[index]), mapFiltersContainer);
      window.card.getPopupClose();
    });
  };

  // Функция обработки клика мышью по меткам
  var onMapPinsClick = function (arr) {
    var mapPins = document.querySelectorAll('button:not(.map__pin--main)');
    for (var i = 0; i < mapPins.length; i++) {

      var mapPin = document.querySelector('.map__pin');
      mapPin = mapPins[i];
      onPinClick(mapPin, i, arr);
    }
  };

  var setLockPage = function () {
    getLockFieldset(containerFilters);
    getLockFieldset(window.form.getContainerForm);
    getAddressPin();
    window.form.getTypeHousingChange();
    window.form.getRoomNumberValue();
  };

  var setUnlockPage = function () {
    isPageActive = true;
    window.map.getMap.classList.remove('map--faded');
    window.form.getContainerForm.classList.remove('ad-form--disabled');
    window.pins.getMapPins(isPageActive, window.map.getContainerPin);
    getLockFieldset(containerFilters);
    getLockFieldset(window.form.getContainerForm);
    getAddressPin();
    onMapPinsClick(window.pins.getPinsArray);
    window.form.getCapacity.addEventListener('change', window.form.getRoomNumberValue);
    window.form.getRoomNumbers.addEventListener('change', window.form.getRoomNumberValue);
    window.form.getTypeElement.addEventListener('change', window.form.getTypeHousingChange);
    document.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinMouseUp);
  };

  // Функция нажатия кнопки мыши по главному пину
  var onMainPinMouseDown = function (downEvt) {
    downEvt.preventDefault();

    startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    document.addEventListener('mousemove', onMainPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  };

  // Функция перетаскивания главного пина по карте
  var onMainPinMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var topCoords = window.map.getMainPin.offsetTop - shift.y;
    var leftCoords = window.map.getMainPin.offsetLeft - shift.x;

    var limits = {
      top: MIN_COORDINATE_Y - MAIN_PIN_WIDTH,
      right: MAX_COORDINATE_X - MAIN_PIN_HEIGHT / 2,
      bottom: MAX_COORDINATE_Y - MAIN_PIN_HEIGHT,
      left: MIN_COORDINATE_X - MAIN_PIN_WIDTH / 2
    };

    if (topCoords < limits.top) {
      topCoords = limits.top;
    }

    if (topCoords > limits.bottom) {
      topCoords = limits.bottom;
    }

    if (leftCoords < limits.left) {
      leftCoords = limits.left;
    }

    if (leftCoords > limits.right) {
      leftCoords = limits.right;
    }

    window.map.getMainPin.style.top = topCoords + 'px';
    window.map.getMainPin.style.left = leftCoords + 'px';

    getAddressPin();
  };

  // Функция отжатия кнопки мыши на главном пине
  var onMainPinMouseUp = function (upEvt) {
    upEvt.preventDefault();

    setUnlockPage();
  };

  window.map.getLockPage(setLockPage());
  window.map.getMainPin.addEventListener('mousedown', onMainPinMouseDown);
})();
