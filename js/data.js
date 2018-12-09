'use strict';

(function () {
  var OBJECT_NUMBER = 8;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOM = 1;
  var MAX_ROOM = 5;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 10;
  var MIN_COORDINATE_X = 0;
  var MAX_COORDINATE_X = 1200;
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_TIME = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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
  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var ads = [];

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
     var ads = [];

    for (var i = 0; i < OBJECT_NUMBER; i++) {
      ads.push(getObjectAd(i));
    }

    return ads;
  };


  window.data = {
    minCoordX: MIN_COORDINATE_X,
    maxCoordX: MAX_COORDINATE_X,
    minCoordY: MIN_COORDINATE_Y,
    maxCoordY: MAX_COORDINATE_Y,
    adObject: getObjectAd,
    adsArray: getObjectsAds
  };
})();
