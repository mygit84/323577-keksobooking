'use strict';

(function () {
  var PIN_ACTIVE_CLASS = 'map__pin--active';
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };
  var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var findings = [];
  var pinElements = null;
  var pinActive;

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

    ads.forEach(function (element) {
      findings.push(getMapPin(element));
    });
  };

  var renderMapPins = function (ads) {
    var pinsFragment = document.createDocumentFragment();

    ads.forEach(function (element) {
      pinsFragment.appendChild(element);
    });
    return pinsFragment;
  };

  var drawMapPins = function (parametr, container) {
    pinElements = renderMapPins(findings);
    return parametr ?
      container.appendChild(pinElements) : 0;
  };

  var clearMapPins = function () {
    findings.forEach(function (element) {
      element.remove();
    });
    findings = [];
  };

  var getActivePin = function () {
    pinActive = document.querySelector('.' + PIN_ACTIVE_CLASS);
    return pinActive;
  };

  var getRemoveActiveClass = function () {
    var activePin = getActivePin();

    if (activePin) {
      activePin.classList.remove(PIN_ACTIVE_CLASS);
    }
  };

  var getActiveClassPin = function (evt) {
    var target = evt.currentTarget;
    var currentActivePin = getActivePin();

    if (!target || currentActivePin) {
      getRemoveActiveClass();
      target.classList.add(PIN_ACTIVE_CLASS);
    }
    target.classList.add(PIN_ACTIVE_CLASS);
  };

  window.pins = {
    getPinsArray: getPinsArray,
    drawMapPins: drawMapPins,
    clear: clearMapPins,
    getActiveClassPin: getActiveClassPin,
    getRemoveActiveClass: getRemoveActiveClass
  };
})();
