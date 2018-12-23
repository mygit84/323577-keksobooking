'use strict';

(function () {
  var NUMBER_PINS = 5;
  var PRICE_VALUE = {
    low: 10000,
    high: 50000
  };
  var containerFilters = document.querySelector('.map__filters');
  var type = containerFilters.querySelector('#housing-type');
  var price = containerFilters.querySelector('#housing-price');
  var rooms = containerFilters.querySelector('#housing-rooms');
  var guests = containerFilters.querySelector('#housing-guests');
  var featuresList = containerFilters.querySelector('.map__features');
  var features = featuresList.querySelectorAll('.map__checkbox');

  var checkHousingType = function (elem) {
    return type.value === 'any' ? true : elem.offer.type === type.value;
  };

  var checkHousingPrice = function (elem) {
    var isPriceConforming;
    switch (price.value) {
      case 'any':
        isPriceConforming = true;
        break;

      case 'low':
        isPriceConforming = elem.offer.price < PRICE_VALUE.low;
        break;

      case 'middle':
        isPriceConforming = elem.offer.price >= PRICE_VALUE.low && elem.offer.price <= PRICE_VALUE.high;
        break;

      case 'high':
        isPriceConforming = elem.offer.price > PRICE_VALUE.high;
        break;
    }
    return isPriceConforming;
  };

  var checkHousingRooms = function (elem) {
    return rooms.value === 'any' ? true : parseInt(elem.offer.rooms, 10) === parseInt(rooms.value, 10);
  };

  var checkHousingGuests = function (elem) {
    return guests.value === 'any' ? true : parseInt(elem.offer.guests, 10) === parseInt(guests.value, 10);
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

  var checkHousingFeatures = function (elem) {
    return getCheckedFeatures().length === 0 ? true : getNestedArray(getCheckedFeatures(), elem.offer.features);
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
