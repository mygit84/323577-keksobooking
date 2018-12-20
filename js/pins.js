'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var response = [];
  var pinElements = null;

  var getMapPin = function (ad) {
    var pinElement = similarMapPin.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    var coordX = ad.location.x - PIN_WIDTH / 2;
    var coordY = ad.location.y - PIN_HEIGHT;

    pinElement.style = 'left: ' + coordX + 'px; top: ' + coordY + 'px';
    pinImage.src = ad.author.avatar;
    pinImage.alt = ad.offer.title;

    return pinElement;
  };

  var getPinsArray = function (ads, callback) {
    callback();
    clearMapPins();

    for (var i = 0; i < ads.length; i++) {
      response.push(getMapPin(ads[i]));
    }
  };

  var renderMapPins = function (ads) {
    var pinsFragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      pinsFragment.appendChild(ads[i]);
    }
    return pinsFragment;
  };

  var drawMapPins = function (param, container) {
    pinElements = renderMapPins(response);
    return param ?
      container.appendChild(pinElements) : 0;
  };

  var clearMapPins = function () {
    response.forEach(function (element) {
      element.remove();
    });
    response = [];
  };

  window.pins = {
    getPinsArray: getPinsArray,
    drawMapPins: drawMapPins,
    clear: clearMapPins
  };
})();
