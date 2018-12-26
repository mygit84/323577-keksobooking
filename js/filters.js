'use strict';

(function () {
  var VALUE_ANY = 'any';
  var NUMBER_PINS = 5;

  var PriseValue = {
    LOW: 10000,
    HIGH: 50000

  };
  var containerFilters = document.querySelector('.map__filters');
  var type = containerFilters.querySelector('#housing-type');
  var price = containerFilters.querySelector('#housing-price');
  var rooms = containerFilters.querySelector('#housing-rooms');
  var guests = containerFilters.querySelector('#housing-guests');
  var featuresList = containerFilters.querySelector('.map__features');
  var features = featuresList.querySelectorAll('.map__checkbox');

  var checkHousingType = function (element) {
    return type.value === VALUE_ANY ? true : element.offer.type === type.value;
  };

  var checkHousingPrice = function (element) {
    var isPriceConforming;
    switch (price.value) {
      case VALUE_ANY:
        isPriceConforming = true;
        break;

      case 'low':
        isPriceConforming = element.offer.price < PriseValue.LOW;
        break;

      case 'middle':
        isPriceConforming = element.offer.price >= PriseValue.LOW && element.offer.price <= PriseValue.HIGH;
        break;

      case 'high':
        isPriceConforming = element.offer.price > PriseValue.HIGH;

        break;
    }
    return isPriceConforming;
  };

  var checkHousingRooms = function (element) {
    return rooms.value === VALUE_ANY ? true : parseInt(element.offer.rooms, 10) === parseInt(rooms.value, 10);
  };

  var checkHousingGuests = function (element) {
    return guests.value === VALUE_ANY ? true : parseInt(element.offer.guests, 10) === parseInt(guests.value, 10);
  };

  var getCheckedFeatures = function () {
    var selectedArr = [];

    Array.from(features).forEach(function (item) {
      if (item.checked) {
        selectedArr.push(item.value);
      }
    });
    return selectedArr;
  };

  var getNestedArray = function (selectedArr, objFeatures) {
    var selectedValues = selectedArr.filter(function (it) {
      return objFeatures.indexOf(it) !== -1;
    });
    return selectedValues.length === selectedArr.length;
  };

  var checkHousingFeatures = function (element) {
    return getCheckedFeatures().length === 0 ? true : getNestedArray(getCheckedFeatures(), element.offer.features);
  };

  var getStatusFilter = function (dataAll) {
    var dataFiltered = dataAll.filter(function (it) {
      return checkHousingType(it) && checkHousingPrice(it) && checkHousingRooms(it)
      && checkHousingGuests(it) && checkHousingFeatures(it);
    });
    return dataFiltered.length > NUMBER_PINS ? dataFiltered.slice(0, NUMBER_PINS) : dataFiltered;
  };

  var setFilters = function (data, callback) {
    containerFilters.addEventListener('change', function () {
      var filterData = getStatusFilter(data);
      callback(filterData);
    });
  };

  var getContainerFilters = function () {
    return containerFilters;
  };

  window.filters = {
    containerFilters: getContainerFilters,
    statusFilter: getStatusFilter,
    setFilters: setFilters
  };
})();
