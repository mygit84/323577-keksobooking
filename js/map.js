'use strict';

(function () {
  var map = document.querySelector('.map');
  var containerPin = map.querySelector('.map__pins');
  var mapPinMain = containerPin.querySelector('.map__pin--main');

  var inputAddress = document.querySelector('#address');
  var mainPinDefaultCootds = {
    left: mapPinMain.style.left,
    top: mapPinMain.style.top
  };

  var getDefaultMainPinCoords = function () {
    mapPinMain.style.left = mainPinDefaultCootds.left;
    mapPinMain.style.top = mainPinDefaultCootds.top;
  };

  // Функция получения координаты Х главного пина
  var getCoordX = function () {
    var x = mapPinMain.getBoundingClientRect();
    return Math.round(((x.left + x.right) / 2) + pageXOffset);
  };

  // Функция получения координаты Y главного пина
  var getCoordY = function (param, pinHeight) {
    var y = mapPinMain.getBoundingClientRect();

    return param ?
      Math.round((((y.top + y.bottom) / 2) + pinHeight / 2) + pageYOffset) :
      Math.round(((y.top + y.bottom) / 2) + pageYOffset);
  };

  // Функция получения отступа левого края карты от края окна браузера
  var getCoordsMapX = function () {
    var mapX = map.getBoundingClientRect();
    return Math.round(mapX.left + pageXOffset);
  };

  // Функция получения адреса главного пина
  var getCoordsMainPin = function (param, pinHeight) {
    var pinAddress = getCoordX() - getCoordsMapX() + ', ' + getCoordY(param, pinHeight);
    inputAddress.value = pinAddress;
  };

  var getMap = function () {
    return map;
  };

  var getMainPin = function () {
    return mapPinMain;
  };

  var getContainerPin = function () {
    return containerPin;
  };

  // Функция неактивного состояния страниц
  var getLockPage = function (callback) {
    return function () {
      callback();
    };
  };

  window.map = {
    getMap: getMap,
    getMainPin: getMainPin,
    getContainerPin: getContainerPin,
    getDefaultMainPinCoords: getDefaultMainPinCoords,
    getCoordsMainPin: getCoordsMainPin,
    getLockPage: getLockPage
  };
})();
