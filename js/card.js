'use strict';

(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var ESC_KEYCODE = 27;
  var similarMapCard = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = similarMapCard.cloneNode(true);

  // Функция создания i-го элемента списка удобств
  var getElementFeature = function (newFeature, index) {
    var newElementFeature = document.createElement('li');
    newElementFeature.classList.add('popup__feature');
    newElementFeature.classList.add('popup__feature--' + newFeature.offer.features[index]);

    return newElementFeature;
  };

  // Функция создания фрагмента DOM-элементов <li> списка удобств, созданный на основе длинны
  // массива i-ых элементов значения features из ключа-объекта offer объекта ad
  var renderElementFeatures = function (newFeatures) {
    cardElement.querySelector('.popup__features').innerHTML = '';
    var featuresFragment = document.createDocumentFragment();

    for (var i = 0; i < newFeatures.offer.features.length; i++) {
      featuresFragment.appendChild(getElementFeature(newFeatures, i));
    }
    return featuresFragment;
  };

  // Функция отрисовки фрагмента DOM-элементов <li> списка i-ых элементов массива значения features
  // из ключа-объекта offer объекта ad в родительском DOM-элементе .popup__features
  var drawElementFeatures = function (ad) {
    cardElement.querySelector('.popup__features').appendChild(renderElementFeatures(ad));
  };

  // Функция создания i-го элемента списка фотографии
  var getCardPhoto = function (newPhoto, index) {
    var newElementPhoto = document.createElement('img');
    newElementPhoto.src = newPhoto.offer.photos[index];
    newElementPhoto.classList.add('popup__photo');
    newElementPhoto.width = PHOTO_WIDTH;
    newElementPhoto.height = PHOTO_HEIGHT;
    newElementPhoto.alt = 'Фотография жилья';
    return newElementPhoto;
  };

  // Функция создания фрагмента DOM-элементов <img>, созданный на основе длинны
  // массива i-ых элементов значения photos из ключа-объекта offer объекта ad
  var renderCardPhotos = function (newPhotos) {
    cardElement.querySelector('.popup__photos').innerHTML = '';
    var photosFragment = document.createDocumentFragment();

    for (var i = 0; i < newPhotos.offer.photos.length; i++) {
      photosFragment.appendChild(getCardPhoto(newPhotos, i));
    }
    return photosFragment;
  };

  // Функция отрисовки фрагмента DOM-элементов <img> списка i-ых элементов массива значения photos
  // из ключа-объекта offer объекта ad в родительском DOM-элементе .popup__photos
  var drawCardPhotos = function (ad) {
    cardElement.querySelector('.popup__photos').appendChild(renderCardPhotos(ad));
  };

  // Функция переименования типа жилья
  var getCardType = function (cardType) {
    var mapCardType = cardElement.querySelector('.popup__type');

    switch (cardType.offer.type) {
      case 'flat': {
        mapCardType.textContent = 'Квартира';
        break;
      }
      case 'bungalo': {
        mapCardType.textContent = 'Бунгало';
        break;
      }
      case 'house': {
        mapCardType.textContent = 'Дом';
        break;
      }
      case 'palace': {
        mapCardType.textContent = 'Дворец';
        break;
      }
    }
  };

  // Функция создания DOM-элемента <article>, заполненного на основе данных из объекта ad
  var getMapCard = function (adObject) {

    getCardType(adObject);
    cardElement.querySelector('.popup__title').textContent = adObject.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = adObject.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = adObject.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__text--capacity').textContent = adObject.offer.rooms + ' комнаты для '
    + adObject.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adObject.offer.checkin
    + ', выезд до ' + adObject.offer.checkout;
    cardElement.querySelector('.popup__feature').classList = drawElementFeatures(adObject);
    cardElement.querySelector('.popup__description').textContent = adObject.offer.description;
    cardElement.querySelector('.popup__photos').src = drawCardPhotos(adObject);
    cardElement.querySelector('.popup__avatar').src = adObject.author.avatar;


    document.addEventListener('keydown', onCardCloseEscPress(cardElement));

    return cardElement;
  };

  // Функция закрытия попара с помощью Esc
  var onCardCloseEscPress = function (elem) {
    return function (evt) {
      if (evt.keyCode === ESC_KEYCODE && typeof (elem) !== 'undefined' && elem !== null) {
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

  window.card = {
    getMapCard: getMapCard,
    getPopupClose: onPopupClose
  };
})();
