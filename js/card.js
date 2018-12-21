'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var PHOTO = {
    WIDTH: 45,
    HEIGHT: 40
  };
  var TYPES = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var similarMapCard = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = similarMapCard.cloneNode(true);
  var popupPhotos = cardElement.querySelector('.popup__photos');
  var popupFeatures = cardElement.querySelector('.popup__features');

  var getElementFeature = function (newFeature, index) {
    var newElementFeature = document.createElement('li');

    newElementFeature.classList.add('popup__feature');
    newElementFeature.classList.add('popup__feature--' + newFeature.offer.features[index]);

    return newElementFeature;
  };

  var getElementPhoto = function (newPhoto, index) {
    var newElementPhoto = document.createElement('img');

    newElementPhoto.src = newPhoto.offer.photos[index];
    newElementPhoto.classList.add('popup__photo');
    newElementPhoto.width = PHOTO.WIDTH;
    newElementPhoto.height = PHOTO.HEIGHT;
    newElementPhoto.alt = 'Фотография жилья';

    return newElementPhoto;
  };

  var getСleanContainer = function (container) {
    container.innerHTML = '';
  };

  var renderElementsFragment = function (newElements, container, objectsArr, callback) {
    getСleanContainer(container);
    var elementsFragment = document.createDocumentFragment();

    objectsArr.forEach(function (elem, i) {
      elementsFragment.appendChild(callback(newElements, i));
    });
    return elementsFragment;
  };

  var getFeaturesFragment = function (newFeatures) {
    return renderElementsFragment(newFeatures, popupFeatures, newFeatures.offer.features, getElementFeature);
  };

  var getPhotosFragment = function (newPhotos) {
    return renderElementsFragment(newPhotos, popupPhotos, newPhotos.offer.photos, getElementPhoto);
  };

  var drawCardFragment = function (param, container, callback, ad) {
    if (param) {
      container.appendChild(callback(ad));
    } else {
      container.remove();
    }
  };

  var getTypeHousing = function (type) {
    return TYPES[type];
  };

  var getMapCard = function (adObject) {

    if (!adObject.offer) {
      return false;
    }

    cardElement.querySelector('.popup__type').textContent = getTypeHousing(adObject.offer.type);
    cardElement.querySelector('.popup__title').textContent = adObject.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = adObject.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = adObject.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__description').textContent = adObject.offer.description;
    cardElement.querySelector('.popup__avatar').src = adObject.author.avatar;
    cardElement.querySelector('.popup__text--capacity').textContent = adObject.offer.rooms + ' комнаты для '
    + adObject.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adObject.offer.checkin
    + ', выезд до ' + adObject.offer.checkout;
    drawCardFragment(adObject.offer.features, popupFeatures, getFeaturesFragment, adObject);
    drawCardFragment(adObject.offer.photos, popupPhotos, getPhotosFragment, adObject);

    document.addEventListener('keydown', onCardCloseEscPress(cardElement));

    return cardElement;
  };

  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var onCardCloseEscPress = function (elem) {
    return function (evt) {
      if (isEscEvent(evt) && typeof (elem) !== 'undefined' && elem !== null) {
        elem.remove();
      }
      document.removeEventListener('keydown', onCardCloseEscPress);
    };
  };

  var getElementCloseClick = function (elem, elemClose) {
    elemClose.addEventListener('click', function () {
      elem.remove();
    });
  };

  var onPopupCloseClick = function () {
    var popup = document.querySelector('.popup');
    var popupClose = popup.querySelector('.popup__close');
    getElementCloseClick(popup, popupClose);
  };

  var clearActiveCard = function () {
    var activeCard = document.querySelector('.map__card');

    if (activeCard) {
      activeCard.remove();
    }
  };

  window.card = {
    getMapCard: getMapCard,
    closePopupClick: onPopupCloseClick,
    clearActiveCard: clearActiveCard,
    escEvent: isEscEvent
  };
})();
