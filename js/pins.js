'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var AD_TITLE = 'заголовок объявления';
  var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var adsObjects = window.data.getObjectsAds();

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

    for (var i = 0; i < ads.length; i++) {
      pinsFragment.appendChild(getMapPin(ads[i]));
    }
    return pinsFragment;
  };

  var mapActivePins = renderMapPins(adsObjects);

  // Функция отрисовки фрагмента DOM-элементов 'Метка на карте' в родительском DOM-элементе .map__pins
  var drawMapPins = function (param, container) {
    return param ?
      container.appendChild(mapActivePins) : 0;
  };

  window.pins = {
    getMapPins: drawMapPins,
    getPinsArray: adsObjects
  };

})();
