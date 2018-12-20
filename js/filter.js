'use strict';

(function () {
  var containerFilters = document.querySelector('.map__filters');

  var getContainerFilters = function () {
    return containerFilters;
  };

  window.filter = {
    getContainerFilters: getContainerFilters
  };
});
