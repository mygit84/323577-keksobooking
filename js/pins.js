'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var AD_TITLE = 'заголовок объявления';
  var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var adsArray = window.data.getObjectsAds();


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
    ads = window.data.getObjectsAds();

    for (var i = 0; i < adsArray.length; i++) {
      pinsFragment.appendChild(getMapPin(ads[i]));
    }
    return pinsFragment;
  };

  var mapActivePins = renderMapPins();

  // Функция отрисовки фрагмента DOM-элементов 'Метка на карте' в родительском DOM-элементе .map__pins
  var drawMapPins = function (param) {
    return param ?
      window.map.containerPin.appendChild(mapActivePins) : 0;
  };

  // Функция обработки события по клику мыши на метку
  var onPinClick = function (elem, index) {
    elem.addEventListener('click', function () {
      window.map.showMap.insertBefore(window.card.getMapCard(adsArray[index]), window.map.mapFiltersContainer);
      window.card.onPopupClose();
    });
  };

  // Функция обработки клика мышью по меткам
  var onMapPinsClick = function () {
    var mapPins = document.querySelectorAll('button:not(.map__pin--main)');

    for (var i = 0; i < mapPins.length; i++) {

      var mapPin = document.querySelector('.map__pin');
      mapPin = mapPins[i];
      onPinClick(mapPin, i);
    }
  };

  window.pins = {
    getMapPin: getMapPin,
    renderMapPins: renderMapPins,
    drawMapPins: drawMapPins,
    onMapPinsClick: onMapPinsClick
  };

})();
