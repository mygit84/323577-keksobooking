'use strict';

(function () {
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

  // Функция создания i-го элемента списка удобств
  var getElementFeature = function (newFeature, index) {
    var newElementFeature = document.createElement('li');

    newElementFeature.classList.add('popup__feature');
    newElementFeature.classList.add('popup__feature--' + newFeature.offer.features[index]);

    return newElementFeature;
  };

  // Функция создания i-го элемента списка фотографии
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

  // Функция создания фрагмента DOM-элементов <li> списка удобств, созданный на основе длинны
  // массива i-ых элементов значения features из ключа-объекта offer объекта ad
  var renderElementFeatures = function (newFeatures) {
    getСleanContainer(popupFeatures);

    var featuresFragment = document.createDocumentFragment();

    for (var i = 0; i < newFeatures.offer.features.length; i++) {
      featuresFragment.appendChild(getElementFeature(newFeatures, i));
    }
    return featuresFragment;
  };

  // Функция создания фрагмента DOM-элементов <img>, созданный на основе длинны
  // массива i-ых элементов значения photos из ключа-объекта offer объекта ad
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

  // Функция переименования типа жилья
  var getTypeHousing = function (type) {
    return TYPES[type];
  };

  // Функция создания DOM-элемента <article>, заполненного на основе данных из объекта ad
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


  // Функция закрытия попара с помощью Esc
  var onCardCloseEscPress = function (callback) {
    return function (evt, elem) {
      if (callback && typeof (elem) !== 'undefined' && elem !== null) {
        elem.remove();
      }
      document.removeEventListener('keydown', onCardCloseEscPress);
    };
  };

  // Функция закрытия карточки с помощью мышки
  var onPopupCloseClick = function (elem, elemClose) {
    elemClose.addEventListener('click', function () {
      elem.remove();
    });
  };

  // Функция закрытия карточки
  var onPopupClose = function () {
    var popup = document.querySelector('.popup');
    var popupClose = popup.querySelector('.popup__close');
    onPopupCloseClick(popup, popupClose);
  };

  var clearActiveCard = function () {
    var activeCard = document.querySelector('.map__card');

    if (activeCard) {
      activeCard.remove();
    }
  };

  window.card = {
    getMapCard: getMapCard,
    onCardCloseEscPress: onCardCloseEscPress,
    getPopupClose: onPopupClose,
    clearActiveCard: clearActiveCard
  };
})();
