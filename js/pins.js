'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var AD_TITLE = 'заголовок объявления';
  var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var adsObjects = [];

  // Функция создания одного DOM-элемента 'Метка на карте', на основе данных из объекта ad
  var getMapPin = function (ad) {
    var pinElement = similarMapPin.cloneNode(true);

    pinElement.style.left = ad.coordinate.coordinateX - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = ad.coordinate.coordinateY - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = AD_TITLE;

    return pinElement;
  };

  // Функция создания фрагмента DOM-элементов 'Метка на карте', на основе данных из глобальной переменной
  // ads (массива ассоциативных массивов, хранящих ключ: значение каждого i-го объекта ad)
  var renderMapPins = function (ads) {
    var pinsFragment = document.createDocumentFragment();
    var i = 0;

    while (i < ads.length) {
      pinsFragment.appendChild(getMapPin(ads[i]));
      i++;
    }
    return pinsFragment;
  };

  var mapActivePins = function (ads) {
    adsObjects = ads;
    return renderMapPins(adsObjects);
  };

  // Функция отрисовки фрагмента DOM-элементов 'Метка на карте' в родительском DOM-элементе .map__pins
  var drawMapPins = function (param, container, ads) {
    return param && adsObjects.length < ads.length ?
      container.appendChild(mapActivePins(ads)) : 0;
  };

  var getPinsArray = function () {
    return adsObjects;
  };

  window.pins = {
    getMapPins: drawMapPins,
    getPinsArray: getPinsArray
  };

})();
