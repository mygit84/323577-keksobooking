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

// Функция генерации числа из интервала чисел от min, до max, не включая
// верхнюю границу
// Входной параметр: min (нижняя граница), max (верхняя граница)
// Выходной параметр: rand (случайное число из диапазона)
var getIntervalNum = function (min, max) {
  var rand = Math.floor(Math.random() * (max - min)) + min;
  return rand;
};

// Функция получения случайного элемента из массива, с помощью генерации случайного числа индекса
// Входной параметр: randomArr (массив)
// Выходной параметр: randomArr[rand] (случайно выбранный элемент массива того же массива)
var getRandomValue = function (randomArr) {
  var rand = Math.floor(Math.random() * randomArr.length);
  return randomArr[rand];
};

// Функция перемешивания элементов массива на основе алгоритма Фишера-Йетса:
// последний элемент массива, меняем местами со случайно выбранным элементом массива (включая и его самого) и так по цепочке
// Входной параметр: arr (массив)
// Выходной параметр: arr (тот же массив, но с элементами в другом порядке)
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
// Входной параметр: нет (данные берутся из глобальной константы OFFER_FEATURES)
// Выходные данные: newArrFeatures (массив случайной длинны из элементов массива OFFER_FEATURES в случайном порядке)
var getNewArrayFeatures = function (arr) {

  var randomFeatures = getRandomArr(arr);
  var randomNum = getIntervalNum(1, arr.length + 1);

  return randomFeatures.slice(0, randomNum);
};

// Функция создания одного объекта (ассоциативного массива) ad, хранящего ключ: значение
// Входящий параметр: index (переменная для дальнейшей записи в нее индекса элемента в массиве)
// Выходной параметр: ad (ассоциативный массив, хранящий ключ: значение)
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
// Входной параметр: нет
// Выходной параметр: глобальная перменная ads (массив ассоциативных массивов, хранящих
// ключ: занчение каждого i-го объекта)
var getObjectsAds = function () {
  ads = [];

  for (var i = 0; i < OBJECT_NUMBER; i++) {
    ads.push(getObjectAd(i));
  }
  return ads;
};

// Функция создания одного DOM-элемента 'Метка на карте', на основе данных из объекта ad
// Входной параметр: ad (ассоциативный массив, хранящий ключ: значение)
// Выходной параметр: pinElement (DOM-элемент 'Метка на карте', с данными из объекта ad)
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
// Входной параметр: нет (данные берутся из глобальной переменной ads массива ассоциативных массивов,
// хранящих ключ: значение каждого i-го объекта ad)
// Выходной параметр: pinsFragment (фрагмент DOM-элементов 'Метка на карте', каждый i-ый DOM-элемент заполнен на
// основе данных из i-го объкта ad массива ads)
var renderMapPins = function () {
  var pinsFragment = document.createDocumentFragment();
  ads = getObjectsAds();

  for (var i = 0; i < ads.length; i++) {
    pinsFragment.appendChild(getMapPin(ads[i]));
  }
  return pinsFragment;
};

// Функция отрисовки фрагмента DOM-элементов 'Метка на карте' в родительском DOM-элементе .map__pins
// Входной параметр: нет
// Выходной параметр: нет
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
// Входной параметр: newFeature (какой-то гипотетический объект хранящий ключ: значение offer: feature)
// Выходной параметр: featuresFragment (фрагмент DOM-элементов <li>)
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
// Входной параметр: newFeature (какой-то гипотетический объект хранящий ключ: значение offer: feature)
// Выходной параметр: нет
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
// Входной параметр: newPhotos (какой-то гипотетический объект хранящий ключ: значение offer: photos)
// Выходные параметр: photosFragment (фрагмент DOM-элементов <img>)
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
// Выходные параметр: нет
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
// Входной параметр: ad (объект, ассоциативный массив хранящий ключ:значение)
// Выходной параметр: cardElement (DOM-элемент, заполненный на основе данных из объекта ad)
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

drawMapPins();
getRandomArr(ads);
showMap.insertBefore(getMapCard(ads[0]), mapFiltersContainer);
showMap.classList.remove('map--faded');
