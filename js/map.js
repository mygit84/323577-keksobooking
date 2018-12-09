'use strict';

(function () {
  var MIN_COORDINATE_X = 0;
  var MAX_COORDINATE_X = 1200;
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var ESC_KEYCODE = 27;
  var showMap = document.querySelector('.map');
  var containerPin = showMap.querySelector('.map__pins');
  var mapFiltersContainer = showMap.querySelector('.map__filters-container');
  var mapPinMain = containerPin.querySelector('.map__pin--main');
  var containerFilters = showMap.querySelector('.map__filters');
  var inputAddress = document.querySelector('#address');
  var isPageActive = false;
  var startCoords = {
    x: 0,
    y: 0
  };


  // Функция блокировки полей фильтра
  var lockFilters = function () {
    for (var i = 0; i < containerFilters.children.length; i++) {
      var fieldsetElement = containerFilters.children[i];
      fieldsetElement.setAttribute('disabled', 'disabled');
    }
  };

  // Функция разблокировки полей фильтра
  var unlockFilters = function () {
    for (var i = 0; i < containerFilters.children.length; i++) {
      var fieldsetElement = containerFilters.children[i];
      fieldsetElement.removeAttribute('disabled', 'disabled');
    }
  };

  // Функция получения координаты Х главного пина
  var getCoordX = function () {
    var x = mapPinMain.getBoundingClientRect();
    return Math.round(((x.left + x.right) / 2) + pageXOffset);
  };

  // Функция получения координаты Y главного пина
  var getCoordY = function (param) {
    var y = mapPinMain.getBoundingClientRect();

    return param ?
      Math.round((((y.top + y.bottom) / 2) + MAIN_PIN_HEIGHT / 2) + pageYOffset) :
      Math.round(((y.top + y.bottom) / 2) + pageYOffset);
  };

  // Функция получения отступа левого края карты от края окна браузера
  var getCoordsMapX = function () {
    var max = showMap.getBoundingClientRect();
    return Math.round(max.left + pageXOffset);
  };

  // Функция получения адреса главного пина
  var getCoordsMainPin = function () {
    var pinAddress = getCoordX() - getCoordsMapX() + ', ' + getCoordY();
    inputAddress.value = pinAddress;
  };

  // Функция закрытия попара с помощью Esc
  var onCardCloseEscPress = function (elem) {
    return function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        if (typeof (elem) !== 'undefined' && elem !== null) {
          elem.remove();
        }
      }
      document.removeEventListener('keydown', onCardCloseEscPress);
    };
  };

  // Функция неактивного состояния страниц
  var setLockPage = function () {
    lockFilters();
    window.form.lockForm();
    getCoordsMainPin();
    window.form.onTypeHousingChange();
    window.form.onRoomNumberValue();
  };

  setLockPage();

  var setUnlockPage = function () {
    isPageActive = true;
    showMap.classList.remove('map--faded');
    window.form.containerForm.classList.remove('ad-form--disabled');
    unlockFilters();
    window.form.unlockForm();
    getCoordsMainPin();
    window.pins.drawMapPins(isPageActive);
    window.pins.onMapPinsClick();
    window.form.capacity.addEventListener('change', window.form.onRoomNumberValue);
    window.form.roomNumbers.addEventListener('change', window.form.onRoomNumberValue);
    window.form.typeElement.addEventListener('change', window.form.onTypeHousingChange);
    document.removeEventListener('mousemove', window.map.onMainPinMouseMove);
    document.removeEventListener('mouseup', window.map.onMainPinMouseUp);
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

    var topCoords = mapPinMain.offsetTop - shift.y;
    var leftCoords = mapPinMain.offsetLeft - shift.x;

    var limits = {
      top: MIN_COORDINATE_Y - MAIN_PIN_WIDTH / 2,
      right: MAX_COORDINATE_X - MAIN_PIN_HEIGHT / 2,
      bottom: MAX_COORDINATE_Y - MAIN_PIN_HEIGHT / 2,
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

    mapPinMain.style.top = topCoords + 'px';
    mapPinMain.style.left = leftCoords + 'px';

    getCoordsMainPin();
  };

  // Функция отжатия кнопки мыши на главном пине
  var onMainPinMouseUp = function (upEvt) {
    upEvt.preventDefault();

    setUnlockPage();
  };

  mapPinMain.addEventListener('mousedown', onMainPinMouseDown);

  window.map = {
    showMap: showMap,
    containerPin: containerPin,
    mapFiltersContainer: mapFiltersContainer,
    onCardCloseEscPress: onCardCloseEscPress,
    getCoordsMainPin: getCoordsMainPin,
    onMainPinMouseMove: onMainPinMouseMove,
    onMainPinMouseUp: onMainPinMouseUp
  };
})();
