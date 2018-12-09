'use strict';

(function () {

var map = document.querySelector('.map');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var mapPinMain = document.querySelector('.map__pin--main');
var containerFilters = map.querySelector('.map__filters');
var inputAddress = document.querySelector('#address');
var startCoords = {
  x: 0,
  y: 0
};

// Функция блокировки полей фильтра
var getLockFilters = function () {
  for (var i = 0; i < containerFilters.children.length; i++) {
    var fieldsetElement = containerFilters.children[i];
    fieldsetElement.setAttribute('disabled', 'disabled');
  }
};

// Функция разблокировки полей фильтра
var getUnlockFilters = function () {
  for (var i = 0; i < containerFilters.children.length; i++) {
    var fieldsetElement = containerFilters.children[i];
    fieldsetElement.removeAttribute('disabled', 'disabled');
  }
};

// Функция получения координаты Х главного пина
var getCoordsX = function () {
  var x = mapPinMain.getBoundingClientRect();
  return Math.round(((x.left + x.right) / 2) + pageXOffset);
};

// Функция получения координаты Y главного пина
var getCoordsY = function (param, pinWidth) {
  var y = mapPinMain.getBoundingClientRect();

  return param ?
    Math.round((((y.top + y.bottom) / 2) + pinWidth / 2) + pageYOffset) :
    Math.round(((y.top + y.bottom) / 2) + pageYOffset);
};

// Функция получения отступа левого края карты от края окна браузера
var getCoordsMapX = function () {
  var map = map.getBoundingClientRect();
  return Math.round(map.left + pageXOffset);
};

// Функция получения адреса главного пина
var getCoordsMainPin = function () {
  var pinAddress = xCoords() - xMapCoords() + ', ' + yCoords();
  inputAddress.value = pinAddress;
};

var getLockPage = function (callback) {
  return callback;
};

getLockPage();

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
var onMainPinMouseMove = function (moveEvt, param, callback) {
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

  if (topCoords < param.top) {
    topCoords = param.top;
  }

  if (topCoords > param.bottom) {
    topCoords = param.bottom;
  }

  if (leftCoords < param.left) {
    leftCoords = param.left;
  }

  if (leftCoords > param.right) {
    leftCoords = param.right;
  }

  mapPinMain.style.top = topCoords + 'px';
  mapPinMain.style.left = leftCoords + 'px';

  callback();
};

// Функция отжатия кнопки мыши на главном пине
var onMainPinMouseUp = function (upEvt, callback) {
  upEvt.preventDefault();

  callback();
};

mapPinMain.addEventListener('mousedown', onMainPinMouseDown);

window.map = {
  mapElement: map,
  mapFiltersContainer: mapFiltersContainer,
  coordsX: getCoordsX,
  coordsY: getCoordsY,
  coordsMapX: getCoordsMapX,
  lockFilters: getLockFilters,
  unlockFilters: getUnlockFilters,
  lockPage: getLockPage,
  mainPinMouseUp: onMainPinMouseUp,
  mainPinMouseMove: onMainPinMouseMove
};
})();
