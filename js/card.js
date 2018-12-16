'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
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
    newElementPhoto.width = PHOTO_WIDTH;
    newElementPhoto.height = PHOTO_HEIGHT;
    newElementPhoto.alt = 'Фотография жилья';

    return newElementPhoto;
  };

  var getСleanContainer = function (container) {
    container.innerHTML = '';
  };

  var renderElementFeatures = function (newFeatures) {
    getСleanContainer(popupFeatures);

    var featuresFragment = document.createDocumentFragment();

    for (var i = 0; i < newFeatures.offer.features.length; i++) {
      featuresFragment.appendChild(getElementFeature(newFeatures, i));
    }
    return featuresFragment;
  };

  var renderElementPhotos = function (newPhotos) {
    getСleanContainer(popupPhotos);

    var photosFragment = document.createDocumentFragment();

    for (var i = 0; i < newPhotos.offer.photos.length; i++) {
      photosFragment.appendChild(getElementPhoto(newPhotos, i));
    }
    return photosFragment;
  };

  var drawElementCard = function (param, container, callback, ad) {
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
    drawElementCard(adObject.offer.features, popupFeatures, renderElementFeatures, adObject);
    drawElementCard(adObject.offer.photos, popupPhotos, renderElementPhotos, adObject);

    document.addEventListener('keydown', onCardCloseEscPress(cardElement));

    return cardElement;
  };

  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var onCardCloseEscPress = function (elem) {
    return function (evt) {
      if (isEscEvent(evt, elem) && typeof (elem) !== 'undefined' && elem !== null) {
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
