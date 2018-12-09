'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var ESC_KEYCODE = 27;
  var isPageActive = false;

  var limits = {
    top: window.data.minCoordY - MAIN_PIN_WIDTH,
    right: window.data.maxCoordX - MAIN_PIN_HEIGHT / 2,
    bottom: window.data.maxCoordY - MAIN_PIN_HEIGHT,
    left: window.data.minCoordX - MAIN_PIN_WIDTH / 2
  };


  window.pins.drawMapPins(isPageActive);

  window.card.mapCard(window.data.adObject());

  var setCoordsY = function () {
    return window.map.coordsY(isPageActive, MAIN_PIN_WIDTH);
  };


  // Функция закрытия карточки
  var onPopupClose = function () {
    var popup = document.querySelector('.popup');
    var popupClose = popup.querySelector('.popup__close');

    onPopupCloseClick(popup, popupClose);
  };

  // Функция обработки события по клику мыши на метку
  var onPinClick = function (elem, index) {
    elem.addEventListener('click', function () {
      window.map.mapElement.insertBefore(getMapCard(window.data.adsArray[index]), window.map.mapFiltersContainer);
      onPopupClose();
    });
  };


  var setLockPage = function () {
    window.map.lockFilters();
    window.form.lockForm();
    window.form.coordsMainPin(setCoordsMainPin());
    window.form.housingChange();
    window.form.roomNumberValue();
  };

  var setMainPinMouseMove = function () {
    return window.map.mainPinMouseMove(moveEvt, limits, setCoordsMainPin());
  };

  var setUnlockPage = function () {
    isPageActive = true;
    window.map.mapElement.classList.remove('map--faded');
    window.form.formElement.classList.remove('ad-form--disabled');
    window.map.unlockFilters();
    window.form.unlockForm();
    window.form.coordsMainPin(setCoordsMainPin());
    window.pins.drawMapPins(isPageActive);
    onMapPinsClick();
    window.form.capacityElement.addEventListener('change', window.form.roomNumberValue);
    window.form.roomElement.addEventListener('change', window.form.roomNumberValue);
    window.form.typeElement.addEventListener('change', window.form.housingChange);
    document.removeEventListener('mousemove', setMainPinMouseMove);
    document.removeEventListener('mouseup', window.map.mainPinMouseUp);
  };

  window.map.lockPage(setLockPage());
  window.map.mainPinMouseUp(upEvt, setUnlockPage());
})();
