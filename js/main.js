'use strict';

(function () {
  var Coodinate = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 65
  };
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var isPageActive;
  var startCoords = {
    x: 0,
    y: 0
  };

  var showMapPins = function (data) {
    window.pins.getPinsArray(data, window.card.clearActiveCard);
    window.pins.drawMapPins(isPageActive, window.map.getContainerPin());
    onMapPinsClick(data);
  };

  var onSuccessLoad = function (data) {
    window.filters.setFilters(data, window.debounce(showMapPins));
    var newData = window.filters.statusFilter(data);
    showMapPins(newData);
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
    return window.map.getCoordsMainPin(isPageActive, MainPinSize.HEIGHT);
  };

  var getArrayMapPins = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    return mapPins;
  };

  var setCleanPage = function () {
    window.pins.clear(getArrayMapPins());
    window.card.clearActiveCard();
    window.map.getDefaultMainPinCoords();
    setLockPage();
  };

  var onPinClick = function (elem, index, arr) {
    elem.addEventListener('click', function () {
      window.map.getMap().insertBefore(window.card.getMapCard(arr[index]), mapFiltersContainer);
      window.card.closePopupClick();
    });
  };

  var onMapPinsClick = function (arr) {
    var activePins = getArrayMapPins();

    for (var i = 0; i < activePins.length; i++) {
      var activePin = document.querySelector('.map__pin');
      activePin = activePins[i];
      onPinClick(activePin, i, arr);
    }
  };

  var setFormValue = function () {
    window.form.getTypeHousingChange();
    window.form.getRoomNumberValue();
  };

  var getSuccessMessage = function () {
    var successMessage = 'Ваше объявление успешно размещено!';
    window.modal.getModalMessage('success', successMessage);
  };

  var getErrorMessage = function (message) {
    window.modal.getModalMessage('error', message);
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
    isPageActive = false;
    window.map.getMap().classList.add('map--faded');
    window.form.getContainerForm().classList.add('ad-form--disabled');
    getLockFieldset(window.filters.containerFilters());
    getLockFieldset(window.form.getContainerForm());
    getAddressPin();
    setFormValue();
    document.removeEventListener('mouseup', onMainPinActiveMouseUp);
    document.activeElement.blur();
  };

  var setUnlockPage = function () {
    window.backend.load(onSuccessLoad, getErrorMessage);
    window.map.getMap().classList.remove('map--faded');
    window.form.getContainerForm().classList.remove('ad-form--disabled');
    getLockFieldset(window.form.getContainerForm());
    getLockFieldset(window.filters.containerFilters());
    getAddressPin();
    window.form.getCapacity().addEventListener('change', window.form.getRoomNumberValue);
    window.form.getRoomNumbers().addEventListener('change', window.form.getRoomNumberValue);
    window.form.getTypeElement().addEventListener('change', window.form.getTypeHousingChange);
    setRemoveListener();
    document.removeEventListener('mouseup', onMainPinActiveMouseUp);
    window.form.getFormSubmitHandler(onSubmitFormData);
  };

  var setRemoveListener = function () {
    document.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinDefaultMouseUp);
  };

  var onMainPinMouseDown = function (downEvt) {
    downEvt.preventDefault();

    startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    if (isPageActive) {
      document.addEventListener('mouseup', onMainPinActiveMouseUp);
    }

    if (!isPageActive) {
      document.addEventListener('mouseup', onMainPinDefaultMouseUp);
    }

    document.addEventListener('mousemove', onMainPinMouseMove);
  };

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
      top: Coodinate.MIN_Y - MainPinSize.WIDTH,
      right: Coodinate.MAX_X - MainPinSize.HEIGHT / 2,
      bottom: Coodinate.MAX_Y - MainPinSize.HEIGHT,
      left: Coodinate.MIN_X - MainPinSize.WIDTH / 2
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

  var onMainPinDefaultMouseUp = function (upEvt) {
    upEvt.preventDefault();
    isPageActive = true;
    setUnlockPage();
  };

  var onMainPinActiveMouseUp = function (upEvt) {
    upEvt.preventDefault();
    setRemoveListener();
  };

  window.map.getLockPage(setLockPage());
  window.map.getMainPin().addEventListener('mousedown', onMainPinMouseDown);
})();
