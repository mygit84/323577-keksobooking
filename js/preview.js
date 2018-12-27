'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var EventName = {
    DRAG: {
      ENTER: 'dragenter',
      OVER: 'dragover',
      LEAVE: 'dragleave'
    },
    DROP: {
      DROP: 'drop'
    },
    CHANGE: {
      CHANGE: 'change'
    }
  };
  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var dropZoneAvatar = document.querySelector('.ad-form-header__drop-zone');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var fileChooserPhoto = photoContainer.querySelector('.ad-form__input');
  var previewPhoto = photoContainer.querySelector('.ad-form__photo');
  var dropZonePhoto = photoContainer.querySelector('.ad-form__drop-zone');
  var defaultAvatar = previewAvatar.src;
  var photos = [];

  var previewFile = function (addedFile, callback) {
    var file = addedFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (element) {
      return fileName.endsWith(element);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        callback(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  var getNewPhotoImg = function (link) {
    var image = document.createElement('img');

    image.classList.add('ad-form__photo-img');
    image.src = link;
    image.width = 70;
    image.height = 70;
    image.alt = 'Фотография жилья';

    return image;
  };

  var getNewElementPhoto = function (link) {
    var photoWrapper = document.createElement('div');

    photoWrapper.classList.add('ad-form__photo');
    photoWrapper.appendChild(getNewPhotoImg(link));

    if (!previewPhoto) {
      previewPhoto = document.createElement('div');
      previewPhoto.classList.add('ad-form__photo');
      photoContainer.appendChild(previewPhoto);
    }

    photos.push(photoWrapper);
    photoContainer.insertBefore(photoWrapper, previewPhoto);
  };

  var getRemoveElementPhoto = function () {
    if (photos) {
      photos.forEach(function (element) {
        element.remove();
      });
    }
    photos = [];
    previewAvatar.src = defaultAvatar;
  };

  var setAvatarLink = function (link) {
    previewAvatar.src = link;
  };

  var preventDefaults = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };

  var getElementHighlight = function (element) {
    element.classList.add('highlight');
  };

  var getElementUnhighlight = function (element) {
    element.classList.remove('highlight');
  };

  var getDropZoneHandler = function (dropZone, eventName, callback) {
    dropZone.addEventListener(eventName, function () {
      callback(dropZone);
    });
  };

  var getDropHandler = function (dropZone, callback) {
    dropZone.addEventListener(EventName.DROP.DROP, function (evt) {
      previewFile(evt.dataTransfer, callback);
    });
  };

  var getChangeHandler = function (fileChooser, callback) {
    fileChooser.addEventListener(EventName.CHANGE.CHANGE, function () {
      previewFile(fileChooser, callback);
    });
  };

  var setDropHandlers = function () {
    getDropHandler(dropZoneAvatar, setAvatarLink);
    getDropHandler(dropZonePhoto, getNewElementPhoto);
  };

  var setChangeHandlers = function () {
    getChangeHandler(fileChooserAvatar, setAvatarLink);
    getChangeHandler(fileChooserPhoto, getNewElementPhoto);
  };

  [EventName.DRAG.ENTER, EventName.DRAG.OVER, EventName.DRAG.LEAVE, EventName.DROP.DROP].forEach(function (eventName) {
    dropZoneAvatar.addEventListener(eventName, preventDefaults, false);
    dropZonePhoto.addEventListener(eventName, preventDefaults, false);
  });

  [EventName.DRAG.ENTER, EventName.DRAG.OVER].forEach(function (eventName) {
    getDropZoneHandler(dropZoneAvatar, eventName, getElementHighlight);
    getDropZoneHandler(dropZonePhoto, eventName, getElementHighlight);
  });

  [EventName.DRAG.LEAVE, EventName.DROP.DROP].forEach(function (eventName) {
    getDropZoneHandler(dropZoneAvatar, eventName, getElementUnhighlight);
    getDropZoneHandler(dropZonePhoto, eventName, getElementUnhighlight);
  });

  setDropHandlers();
  setChangeHandlers();

  window.preview = {
    removePhoto: getRemoveElementPhoto
  };
})();
