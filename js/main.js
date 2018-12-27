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
  var mainPin = window.map.getMainPin();
  var isPageActive;
  var startCoords = {
    x: 0,
    y: 0
  };

  var showMapPins = function (data) {
    window.pins.getPinsArray(data, setClearMap);
    window.pins.drawMapPins(isPageActive, window.map.getContainerPin());
    getClickOnPinMap(data);
  };

  var onSuccessLoad = function (data) {
    window.filters.setFilters(data, window.debounce(showMapPins));
    var newData = window.filters.statusFilter(data);
    showMapPins(newData);
    getLockFieldset(window.filters.containerFilters());
    document.removeEventListener('mouseup', onMainPinDefaultMouseUp);
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
    Array.from(container.children).forEach(function (element) {
      getDisabledElement(element);
    });
  };

  var getAddressPin = function () {
    return window.map.getCoordsMainPin(isPageActive, MainPinSize.HEIGHT);
  };

  var getPinClickHandler = function (element, index, arr) {
    element.addEventListener('click', function (evt) {
      window.map.getMap().insertBefore(window.card.getMapCard(arr[index]), mapFiltersContainer);
      window.card.closePopupClick();
      window.pins.getActiveClassPin(evt);
    });
  };

  var getActivePinsOnMap = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    return mapPins;
  };

  var getClickOnPinMap = function (arr) {
    var pinsList = getActivePinsOnMap();

    Array.from(pinsList).forEach(function (element, i) {
      getPinClickHandler(element, i, arr);
    });
  };

  var setFormValue = function () {
    window.form.getTypeHousingChange();
    window.form.getRoomNumberValue();
  };

  var setClearMap = function () {
    window.pins.clear();
    window.card.clearActiveCard();
  };

  var setClearPage = function () {
    setClearMap();
    window.preview.removePhoto();
    window.map.getDefaultMainPinCoords();
    setLockPage();
  };

  var getSuccessMessage = function () {
    var successMessage = 'Ваше объявление успешно размещено!';
    window.modal.getModalMessage('success', successMessage);
  };

  var getErrorMessage = function (message) {
    window.modal.getModalMessage('error', message);
  };

  var onSubmitFormData = function (evt) {
    window.backend.save(new FormData(window.form.getContainerForm()), function () {
      window.form.getContainerForm().reset();
      setClearPage();
      getAddressPin();
      setFormValue();
      getSuccessMessage();
    }, getErrorMessage);
    evt.preventDefault();
  };

  var getDisabledClass = function () {
    if (!isPageActive) {
      window.map.getMap().classList.add('map--faded');
      window.form.getContainerForm().classList.add('ad-form--disabled');
    }

    if (isPageActive) {
      window.map.getMap().classList.remove('map--faded');
      window.form.getContainerForm().classList.remove('ad-form--disabled');
    }
  };

  var setLockPage = function () {
    isPageActive = false;
    getDisabledClass();
    getLockFieldset(window.filters.containerFilters());
    getLockFieldset(window.form.getContainerForm());
    getAddressPin();
    setFormValue();
    document.removeEventListener('mouseup', onMainPinActiveMouseUp);
    document.activeElement.blur();
  };

  var setUnlockPage = function () {
    window.backend.load(onSuccessLoad, getErrorMessage);
    getDisabledClass();
    getLockFieldset(window.form.getContainerForm());
    getAddressPin();
    window.form.getCapacity().addEventListener('change', window.form.getRoomNumberValue);
    window.form.getRoomNumbers().addEventListener('change', window.form.getRoomNumberValue);
    window.form.getTypeElement().addEventListener('change', window.form.getTypeHousingChange);
    document.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinActiveMouseUp);
    window.form.getFormSubmitHandler(onSubmitFormData);
    window.form.getResetBtnHandler(setClearPage);
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

    var topCoords = mainPin.offsetTop - shift.y;
    var leftCoords = mainPin.offsetLeft - shift.x;

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

    mainPin.style.top = topCoords + 'px';
    mainPin.style.left = leftCoords + 'px';

    getAddressPin();
  };

  var onMainPinDefaultMouseUp = function (upEvt) {
    upEvt.preventDefault();
    isPageActive = true;
    setUnlockPage();
  };

  var onMainPinActiveMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinDefaultMouseUp);
  };

  window.map.getLockPage(setLockPage());
  window.map.getMainPin().addEventListener('mousedown', onMainPinMouseDown);
})();
