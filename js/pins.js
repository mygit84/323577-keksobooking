'use strict';

(function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };
  var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var response = [];
  var pinElements = null;

  var getMapPin = function (ad) {
    var pinElement = similarMapPin.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    var coordX = ad.location.x - Pin.WIDTH / 2;
    var coordY = ad.location.y - Pin.HEIGHT;

    pinElement.style = 'left: ' + coordX + 'px; top: ' + coordY + 'px';
    pinImage.src = ad.author.avatar;
    pinImage.alt = ad.offer.title;

    return pinElement;
  };

  var getPinsArray = function (ads, callback) {
    callback();

    ads.forEach(function (elem) {
      response.push(getMapPin(elem));
    });
  };

  var renderMapPins = function (ads) {
    var pinsFragment = document.createDocumentFragment();

    ads.forEach(function (elem) {
      pinsFragment.appendChild(elem);
    });
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

  var getActiveClassPin = function (evt) {
    var target = evt.currentTarget;
    var pinActive = document.querySelector('.map__pin--active');

    if (!target || pinActive) {
      pinActive.classList.remove('map__pin--active');
      target.classList.add('map__pin--active');
    }
    target.classList.add('map__pin--active');
  };

  window.pins = {
    getPinsArray: getPinsArray,
    drawMapPins: drawMapPins,
    clear: clearMapPins,
    getActiveClassPin: getActiveClassPin
  };
})();
