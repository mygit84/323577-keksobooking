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

//функция генерации числа из интервала чисел
var getIntervalNum = function (min, max) {
  var rand = Math.floor(Math.random() * (max - min)) + min;
  return rand;
};

//функция получения случайного элемента из массива
var getRandomValue = function (randomArr) {
  var rand = Math.floor(Math.random() * randomArr.length);
  return randomArr[rand];
};

//функция перемешивания элементов массива
var getRandomArr = function (arr) {
  var j, temp;
  for (var i = arr.length - 1; i > 0; i --) {
    j =  Math.floor(Math.random()*(i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

//функция создания одного объекта ad
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
      features: getRandomArr(OFFER_FEATURES).slice(1, getIntervalNum(OFFER_FEATURES.length, false)),
      description: ' ',
      photos: getRandomArr(OFFER_PHOTOS)
    },
    coordinate: {
      coordinateX: getIntervalNum(MIN_COORDINATE_X, MAX_COORDINATE_X),
      coordinateY: getIntervalNum(MIN_COORDINATE_Y, MAX_COORDINATE_Y)
    }
  }
  return ad;
};

//функция создания массива объектов ad
var getObjectsAds = function () {
  var ads = [];
  for (var i = 0; i < OBJECT_NUMBER; i++) {
    ads.push(getObjectAd(i));
  }
  return ads;
};

//функция создания метки на карте
var getMapPin = function (ad) {
  var pinElement = similarMapPin.cloneNode(true);

  pinElement.style.left = ad.coordinate.coordinateX - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = ad.coordinate.coordinateY - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = AD_TITLE;

  return pinElement;
};

//функция создания фрагмента меток на карте
var renderMapPins = function () {
  var pinsFragment = document.createDocumentFragment();
  ads = getObjectsAds();

  for(var i = 0; i < ads.length; i++) {
    pinsFragment.appendChild(getMapPin(ads[i]));
  }
  return pinsFragment;
};

//функция отрисовки меток
var drawMapPins = function () {
  containerPin.appendChild(renderMapPins());
  return drawMapPins;
};

//функция создания элемента удобств
var getElementFeature = function (index) {
  var newElementFeature = document.createElement('li');
  newElementFeature.classList.add('popup__feature');
  newElementFeature.classList.add('popup__feature--' + ad.offer.feature[index]);

  return newElementFeature;
}

//функция создания списка удобств
var renderElementFeatures = function (ad) {

  if (ad.offer.feature.length > 0) {
    similarMapCard.querySelector('.popup__features').innerHTML = '';
    var featuresFragment = document.createDocumentFragment();

    for (var i = 0; i < ad.offer.feature.length; i++) {
      featuresFragment.appendChild(getElementFeatures(i));
    }
  } else {
    similarMapCard.querySelector('.popup__features').remove();
  }
  return featuresFragment;
};

//функция отрисовки списка удобств
var drawElementFeatures = function () {
  similarMapCard.appendChild(renderElementFeatures());
  return drawElementFeatures;
}
debbuger;
//функция создания карточки на карте
var getMapCard = function (ads) {
  var cardElement = similarMapCard.cloneNode(true);
  var mapCardType = similarMapCard.querySelector('.popup__type');
  ads = getObjectsAds();

  similarMapCard.querySelector('.popup__title').textContent = ads.offer.title;
  similarMapCard.querySelector('.popup__text--address').textContent = ads.offer.address;
  similarMapCard.querySelector('.popup__text--price').textContent = ads.offer.price + '₽/ночь';
  switch (ads.offer.type) {
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
  };
  similarMapCard.querySelector('.popup__text--capacity').textContent = ads.offer.rooms + ' комнаты для '
  + ad.offer.guests + 'гостей';
  similarMapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads.offer.checkin
  + ', выезд до ' + ad.offer.checkout;
  similarMapCard.querySelector('.popup__features').textContent = drawElementFeatures();
  similarMapCard.querySelector('.popup__description').textContent = ads.offer.description;
  similarMapCard.querySelector('.popup__photos').textContent = ads.offer.photos;
  similarMapCard.querySelector('.popup__avatar').src = ads.author.avatar;

  return cardElement;
};


showMap.insertBefore(getMapCard(0), mapFiltersContainer);
drawMapPins();

showMap.classList.remove('map--faded');
