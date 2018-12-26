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

  var getCoordX = function () {
    var x = mapPinMain.getBoundingClientRect();
    return Math.round(((x.left + x.right) / 2) + pageXOffset);
  };

  var getCoordY = function (parametr, pinHeight) {
    var y = mapPinMain.getBoundingClientRect();

    return parametr ?
      Math.round((((y.top + y.bottom) / 2) + pinHeight / 2) + pageYOffset) :
      Math.round(((y.top + y.bottom) / 2) + pageYOffset);
  };

  var getCoordsMapX = function () {
    var mapX = map.getBoundingClientRect();
    return Math.round(mapX.left + pageXOffset);
  };

  var getCoordsMainPin = function (parametr, pinHeight) {
    var pinAddress = getCoordX() - getCoordsMapX() + ', ' + getCoordY(parametr, pinHeight);
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
