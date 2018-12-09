'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var AD_TITLE = 'заголовок объявления';
  var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var containerPin = document.querySelector('.map__pins');
  var adObject = window.data.adObject;

  // Функция создания одного DOM-элемента 'Метка на карте', на основе данных из объекта ad
  var getMapPin = function (adObject) {
    var pinElement = similarMapPin.cloneNode(true);

    pinElement.style.left = adObject.coordinate.coordinateX - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = adObject.coordinate.coordinateY - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = adObject.author.avatar;
    pinElement.querySelector('img').alt = AD_TITLE;

    return pinElement;
  };

  // Функция создания фрагмента DOM-элементов 'Метка на карте', на основе данных из глобальной переменной
  // ads (массива ассоциативных массивов, хранящих ключ: значение каждого i-го объекта ad)
  var renderMapPins = function () {
    var pinsFragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.adsArray.length; i++) {
      pinsFragment.appendChild(getMapPin(window.data.adsArray[i]));
    }
    return pinsFragment;
  };

  var mapActivePins = renderMapPins();

  // Функция отрисовки фрагмента DOM-элементов 'Метка на карте' в родительском DOM-элементе .map__pins
  var drawMapPins = function (param) {
    return param ?
      containerPin.appendChild(mapActivePins) : 0;
  };

  // Функция обработки клика мышью по меткам
  var onMapPinsClick = function () {
    var mapPins = containerPin.querySelectorAll('button:not(.map__pin--main)');

    for (var i = 0; i < mapPins.length; i++) {

      var mapPin = containerPin.querySelector('.map__pin');
      mapPin = mapPins[i];
      onPinClick(mapPin, i);
    }
  };

  window.pins = {
    pinElement: getMapPin,
    pinsClick: onMapPinsClick,
    drawMapPins: drawMapPins
  };
})();
