'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var AD_TITLE = 'заголовок объявления';
  var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');

  // Функция создания одного DOM-элемента 'Метка на карте', на основе данных из объекта ad
  var getMapPin = function (ad) {
    var pinElement = similarMapPin.cloneNode(true);
    var pinImage = pinElement.querySelector('img');

    pinElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
    pinImage.src = ad.author.avatar;
    pinImage.alt = AD_TITLE;

    return pinElement;
  };

  // Функция создания фрагмента DOM-элементов 'Метка на карте', на основе данных из глобальной переменной
  // ads (массива ассоциативных массивов, хранящих ключ: значение каждого i-го объекта ad)
  var renderMapPins = function (ads) {
    var pinsFragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      pinsFragment.appendChild(getMapPin(ads[i]));
    }
    return pinsFragment;
  };

  // Функция отрисовки фрагмента DOM-элементов 'Метка на карте' в родительском DOM-элементе .map__pins
  var drawMapPins = function (param, container, ads) {
    return param ?
      container.appendChild(renderMapPins(ads)) : 0;
  };

  // Функция обработки клика мышью по меткам
  var onMapPinsClick = function (ads, callback) {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < mapPins.length; i++) {
      var mapPin = document.querySelector('.map__pin');
      mapPin = mapPins[i];
      callback(mapPin, i, ads);
    }
  };

  var clearMapPins = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].remove();
    }
  };

  window.pins = {
    getMapPin: drawMapPins,
    onMapPinsClick: onMapPinsClick,
    clearMapPins: clearMapPins
  };

})();
