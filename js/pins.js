'use strict';

(function () {
  var NUMBER_ADS = 5;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var AD_TITLE = 'заголовок объявления';
  var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');

  var getMapPin = function (ad) {
    var pinElement = similarMapPin.cloneNode(true);
    var pinImage = pinElement.querySelector('img');

    pinElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
    pinImage.src = ad.author.avatar;
    pinImage.alt = AD_TITLE;

    return pinElement;
  };

  var renderMapPins = function (ads) {
    var takeNumber = ads.length > NUMBER_ADS ? NUMBER_ADS : ads.length;
    var pinsFragment = document.createDocumentFragment();

    for (var i = 0; i < takeNumber; i++) {
      pinsFragment.appendChild(getMapPin(ads[i]));
    }
    return pinsFragment;
  };

  var drawMapPins = function (param, container, ads) {
    return param ?
      container.appendChild(renderMapPins(ads)) : 0;
  };

  var clearMapPins = function (pins) {
    pins.forEach(function (element) {
      element.remove();
    });
    pins = [];
  };

  window.pins = {
    render: renderMapPins,
    getMapPins: drawMapPins,
    clear: clearMapPins
  };
})();
