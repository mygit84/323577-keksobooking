'use strict';

(function () {

  var MIN_COORDINATE_X = 0;
  var MAX_COORDINATE_X = 1200;
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var ESC_KEYCODE = 27;
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var containerFilters = mapFiltersContainer.querySelector('.map__filters');
  var isPageActive = false;
  var response = [];
  var startCoords = {
    x: 0,
    y: 0
  };

  var onLoad = function (ads) {
    response = ads;
    var pinRender = window.pins.render(response);
    return pinRender;
  };

  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var getCardCloseEscPress = function (evt) {
    return window.card.onCardCloseEscPress(isEscEvent(evt));
  };

  var getDisabledElement = function (element) {
    if (!isPageActive) {
      element.setAttribute('disabled', 'disabled');

    }
    if (isPageActive) {
      element.removeAttribute('disabled', 'disabled');
    }
  };

  var getLockFieldset = function (container) {

    for (var i = 0; i < container.children.length; i++) {
      var fieldsetElement = container.children[i];
      getDisabledElement(fieldsetElement);
    }
  };

  var getAddressPin = function () {
    return window.map.getCoordsMainPin(isPageActive, MAIN_PIN_HEIGHT);
  };

  var setCleanPage = function () {
    clearMapPins();
    window.card.clearActiveCard();
    window.map.getDefaultMainPinCoords();
    setLockPage();
  };

  // Функция обработки события по клику мыши на метку
  var onPinClick = function (elem, index, arr) {
    elem.addEventListener('click', function () {
      window.map.getMap().insertBefore(window.card.getMapCard(arr[index]), mapFiltersContainer);
      window.card.getPopupClose();
    });
  };

  var setFormValue = function () {
    window.form.getTypeHousingChange();
    window.form.getRoomNumberValue();
  };

  var getSuccessMessage = function () {
    return window.modal.successMessage();
  };

  var getErrorMessage = function (message) {
    return window.modal.errorMessage(message);
  };

  var onSubmitFormData = function (event) {
    window.backend.save(new FormData(window.form.getContainerForm()), function () {
      window.form.getContainerForm().reset();
      setCleanPage();
      getAddressPin();
      setFormValue();
      getSuccessMessage();
    }, getErrorMessage);
    event.preventDefault();
  };

  var setLockPage = function () {
    window.map.getMap().classList.add('map--faded');
    window.form.getContainerForm().classList.add('ad-form--disabled');
    getLockFieldset(containerFilters);
    getLockFieldset(window.form.getContainerForm());
    getAddressPin();
    setFormValue();
  };

  var setUnlockPage = function () {
    isPageActive = true;
    window.map.getMap().classList.remove('map--faded');
    window.form.getContainerForm().classList.remove('ad-form--disabled');
    window.pins.getMapPins(isPageActive, window.map.getContainerPin(), onLoad(response));
    getLockFieldset(containerFilters);
    getLockFieldset(window.form.getContainerForm());
    getAddressPin();
    window.form.getCapacity().addEventListener('change', window.form.getRoomNumberValue);
    window.form.getRoomNumbers().addEventListener('change', window.form.getRoomNumberValue);
    window.form.getTypeElement().addEventListener('change', window.form.getTypeHousingChange);
    document.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinMouseUp);
    window.form.getFormSubmitHandler(onSubmitFormData);
  };

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
  var onMainPinMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var topCoords = window.map.getMainPin().offsetTop - shift.y;
    var leftCoords = window.map.getMainPin().offsetLeft - shift.x;

    var limits = {
      top: MIN_COORDINATE_Y - MAIN_PIN_WIDTH,
      right: MAX_COORDINATE_X - MAIN_PIN_HEIGHT / 2,
      bottom: MAX_COORDINATE_Y - MAIN_PIN_HEIGHT,
      left: MIN_COORDINATE_X - MAIN_PIN_WIDTH / 2
    };

    if (topCoords < limits.top) {
      topCoords = limits.top;
    }

    if (topCoords > limits.bottom) {
      topCoords = limits.bottom;
    }

    if (leftCoords < limits.left) {
      leftCoords = limits.left;
    }

    if (leftCoords > limits.right) {
      leftCoords = limits.right;
    }

    window.map.getMainPin().style.top = topCoords + 'px';
    window.map.getMainPin().style.left = leftCoords + 'px';

    getAddressPin();
  };

  // Функция отжатия кнопки мыши на главном пине
  var onMainPinMouseUp = function (upEvt) {
    upEvt.preventDefault();

    !isPageActive ? setUnlockPage() : 0;
  };


  window.backend.load(onLoad, getErrorMessage);
  window.map.getLockPage(setLockPage());
  window.map.getMainPin().addEventListener('mousedown', onMainPinMouseDown);
})();
