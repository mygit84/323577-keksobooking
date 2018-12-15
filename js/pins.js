'use strict';

(function () {
  var NUMBER_ADS = 5;
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
    var takeNumber = ads.length > NUMBER_ADS ? NUMBER_ADS : ads.length;
    var pinsFragment = document.createDocumentFragment();

    for (var i = 0; i < takeNumber; i++) {
      pinsFragment.appendChild(getMapPin(ads[i]));
    }
    return pinsFragment;
  };

  // Функция отрисовки фрагмента DOM-элементов 'Метка на карте' в родительском DOM-элементе .map__pins
  var drawMapPins = function (param, container, callback) {
    return param ?
    container.appendChild(callback) : 0;
  };

/*  var getArrayPins = function () {
    var mapPins = document.querySelectorAll('map__pin:not(.map__pin--main)');
    var arrayMapPins = Array.prototype.slice.call(mapPins);
    console.log(arrayMapPins.length);
  };*/

  /*var onMapPinsClick = function (pins, arr, callback) {
    Array.from(pins).forEach(function (item) {
      callback(item, i, arr);
    }
  };

  var clearMapPins = function (pins) {
    Array.from(pins).forEach(function (item) {
      item.remove();
    }
  };

  var myFunc = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    onMapPinsClick(mapPins);
  };*/


  window.pins = {
    render: renderMapPins,
    getMapPins: drawMapPins
  };

})();
