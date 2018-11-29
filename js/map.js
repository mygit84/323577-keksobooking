'use strict';

var OBJECT_NUMBER = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOM = 1;
var MAX_ROOM = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 62;
var MAIN_PIN_AFTER = 22;
var PHOTO_WIDTH = 45;
var PHOTO_HEIGHT = 40;
var MIN_COORDINATE_X = 0;
var MAX_COORDINATE_X = 1200;
var MIN_COORDINATE_Y = 130;
var MAX_COORDINATE_Y = 630;
var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIME = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var AD_TITLE = 'заголовок объявления';
var showMap = document.querySelector('.map');
var containerPin = showMap.querySelector('.map__pins');
var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var similarMapCard = document.querySelector('#card').content.querySelector('.map__card');
var mapFiltersContainer = showMap.querySelector('.map__filters-container');
var ads = [];
var cardElement = similarMapCard.cloneNode(true);
var mapPinMain = containerPin.querySelector('.map__pin--main');
var containerForm = document.querySelector('.ad-form');
var containerFilters = showMap.querySelector('.map__filters');
var inputAddress = containerForm.querySelector('#address');
var x = mapPinMain.style.left.slice(0, -2);
var y = mapPinMain.style.top.slice(0, -2);

// Функция генерации числа из интервала чисел от min, до max, не включая
// верхнюю границу
var getIntervalNum = function (min, max) {
  var rand = Math.floor(Math.random() * (max - min)) + min;
  return rand;
};

// Функция получения случайного элемента из массива, с помощью генерации случайного числа индекса
var getRandomValue = function (randomArr) {
  var rand = Math.floor(Math.random() * randomArr.length);
  return randomArr[rand];
};

// Функция перемешивания элементов массива на основе алгоритма Фишера-Йетса:
// последний элемент массива, меняем местами со случайно выбранным элементом массива (включая и его самого) и так по цепочке
var getRandomArr = function (arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

// Функция генерации массива случайной длинны из элементов массива OFFER_FEATURES в случайном порядке
var getNewArrayFeatures = function (arr) {

  var randomFeatures = getRandomArr(arr);
  var randomNum = getIntervalNum(1, arr.length + 1);

  return randomFeatures.slice(0, randomNum);
};

// Функция создания одного объекта (ассоциативного массива) ad, хранящего ключ: значение
var getObjectAd = function (index) {
  var ad = {
    author: {
      avatar: 'img/avatars/user' + '0' + (index + 1) + '.png'
    },
    offer: {
      title: OFFER_TITLES[index],
      address: getIntervalNum(MIN_COORDINATE_X, MAX_COORDINATE_X)
      + ', '
      + getIntervalNum(MIN_COORDINATE_Y, MAX_COORDINATE_Y),
      price: getIntervalNum(MIN_PRICE, MAX_PRICE),
      type: getRandomValue(OFFER_TYPE),
      rooms: getIntervalNum(MIN_ROOM, MAX_ROOM),
      guests: getIntervalNum(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomValue(OFFER_TIME),
      checkout: getRandomValue(OFFER_TIME),
      features: getNewArrayFeatures(OFFER_FEATURES),
      description: ' ',
      photos: getRandomArr(OFFER_PHOTOS)
    },
    coordinate: {
      coordinateX: getIntervalNum(MIN_COORDINATE_X, MAX_COORDINATE_X),
      coordinateY: getIntervalNum(MIN_COORDINATE_Y, MAX_COORDINATE_Y)
    }
  };
  return ad;
};

// Функция создания массива объектов ad (ассоциативных массивов, хранящих ключ: значение,
// каждого i-го объекта)
var getObjectsAds = function () {
  ads = [];

  for (var i = 0; i < OBJECT_NUMBER; i++) {
    ads.push(getObjectAd(i));
  }
  return ads;
};

// Функция создания одного DOM-элемента 'Метка на карте', на основе данных из объекта ad
var getMapPin = function (ad) {
  var pinElement = similarMapPin.cloneNode(true);

  pinElement.style.left = ad.coordinate.coordinateX - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = ad.coordinate.coordinateY - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = AD_TITLE;

  return pinElement;
};

// Функция создания фрагмента DOM-элементов 'Метка на карте', на основе данных из глобальной переменной
// ads (массива ассоциативных массивов, хранящих ключ: значение каждого i-го объекта ad)
var renderMapPins = function () {
  var pinsFragment = document.createDocumentFragment();
  ads = getObjectsAds();
  for (var i = 0; i < ads.length; i++) {
    pinsFragment.appendChild(getMapPin(ads[i]));
  }
  return pinsFragment;
};

// Функция отрисовки фрагмента DOM-элементов 'Метка на карте' в родительском DOM-элементе .map__pins
var drawMapPins = function () {
  containerPin.appendChild(renderMapPins());
};

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
var getMapCard = function (ad) {
  getCardType(ad);
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для '
  + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin
  + ', выезд до ' + ad.offer.checkout;
  cardElement.querySelector('.popup__feature').classList = drawElementFeatures(ad);
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__photos').src = drawCardPhotos(ad);
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  return cardElement;
};


// ***********************************MODULE4-TASK1**********************************//


// Функция блокировки полей фильтра
var lockFilters = function () {
  for (var i = 0; i < containerFilters.children.length; i++) {
    var fieldsetElement = containerFilters.children[i];
    fieldsetElement.setAttribute('disabled', 'disabled');
  }
};

// Функция блокировки полей формы
var lockForm = function () {
  for (var i = 0; i < containerForm.children.length; i++) {
    var fieldsetElement = containerForm.children[i];
    fieldsetElement.setAttribute('disabled', 'disabled');
  }
};

// Функция разблокировки полей фильтра
var unlockFilters = function () {
  for (var i = 0; i < containerFilters.children.length; i++) {
    var fieldsetElement = containerFilters.children[i];
    fieldsetElement.removeAttribute('disabled', 'disabled');
  }
};

// Функция разблокировки полей формы
var unlockForm = function () {
  for (var i = 0; i < containerForm.children.length; i++) {
    var formElement = containerForm.children[i];
    formElement.removeAttribute('disabled', 'disabled');
  }
};

// Функция получения координат метки на неактивной странице
var getCoordinateInactive = function () {
  var xCoordinate = x - MAIN_PIN_WIDTH / 2;
  var yCoordinate = y - MAIN_PIN_HEIGHT / 2;
  inputAddress.value = xCoordinate + ', ' + yCoordinate;
};

// Функция получения координат метки на активной странице
var getCoordinateActive = function () {
  var xCoordinate = x - MAIN_PIN_WIDTH / 2;
  var yCoordinate = + y + +(MAIN_PIN_HEIGHT + MAIN_PIN_AFTER);
  inputAddress.value = xCoordinate + ', ' + yCoordinate;
};

// Функция неактивного состояния страницы
var lockPage = function () {
  lockFilters();
  lockForm();
  getCoordinateInactive();
  getCoordinateInactive();
};

lockPage();

var checkPinClass = function (elem, ad) {
  if (elem.classList.contains('map__pin--main')) {
    return checkPinClass;
  } else {
    showMap.insertBefore(getMapCard(ad[0]), mapFiltersContainer);
  }
  return checkPinClass;
};

var onMapPinClick = function () {
  var mapPins = containerPin.querySelectorAll('.map__pin');

  for (var i = 0; i < mapPins.length; i++) {
    var mapPin = containerPin.querySelector('.map__pin');
    mapPin = mapPins[i];

    mapPin.addEventListener('click', function () {
      checkPinClass(mapPin, ads);
    });
  }
}

mapPinMain.addEventListener('click', function () {
  showMap.classList.remove('map--faded');
  containerForm.classList.remove('ad-form--disabled');
  unlockFilters();
  unlockForm();
  getCoordinateActive();
  drawMapPins();
  onMapPinClick();
});
