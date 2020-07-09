'use strict';
var PHOTOS_QUANTITY = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var NUMBER_AVATAR_MIN = 1;
var NUMBER_AVATAR_MAX = 6;
var MIN_HASHTAG_LENGTH = 2;
var MAX_HASHTAG_LENGTH = 20;
var PHOTO_OBJECT_FIELDS = {
  comments:
  [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ],
  names:
  [
    'Пётр',
    'Иван',
    'Евгений',
    'Дарья',
    'Виолетта',
    'Нина',
  ],
};
// Функция случайного числа
var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};
// Функция показа элемента
var showItem = function (item) {
  return item.classList.remove('hidden');
};
// Функция скрытия элемента
var hideItem = function (item) {
  return item.classList.add('visually-hidden');
};

// функция закрывания большого фото
var closeBigPhoto = function () {
  var bigPic = document.querySelector('.big-picture');
  onScroll();
  return bigPic.classList.add('hidden');
};
// Функция отключения скролла
var modalWindow = document.body;
var offScroll = function () {
  modalWindow.classList.add('modal-open');
};
// Функция включения скролла
var onScroll = function () {
  modalWindow.classList.remove('modal-open');
};

var createMockData = function () {
  var photos = [];
  for (var i = 1; i <= PHOTOS_QUANTITY; i++) {
    var comments = [];
    var objPhoto = {
      url: 'photos/' + i + '.jpg',
      description: 'Описание ' + i,
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: comments,
    };
    for (var j = 0; j < getRandomNumber(NUMBER_AVATAR_MIN, NUMBER_AVATAR_MAX); j++) {
      var commentObj = {
        avatar: 'img/avatar-' + getRandomNumber(NUMBER_AVATAR_MIN, NUMBER_AVATAR_MAX) + '.svg',
        message: PHOTO_OBJECT_FIELDS.comments[getRandomNumber(NUMBER_AVATAR_MIN, NUMBER_AVATAR_MAX) - 1],
        name: PHOTO_OBJECT_FIELDS.names[getRandomNumber(NUMBER_AVATAR_MIN, NUMBER_AVATAR_MAX) - 1],
      };
      comments.push(commentObj);
    }
    photos.push(objPhoto);
  }
  return photos;
};

var mockData = createMockData();

var similarPictureElement = document.querySelector('.pictures');
var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.addEventListener('click', function () {
    renderBigPicture(picture);
  });
  return pictureElement;
};

var fragment = document.createDocumentFragment();

mockData.forEach(function (picture) {
  fragment.appendChild(renderPicture(picture));
});

similarPictureElement.appendChild(fragment);

// Заполнение элемента данными
var renderBigPicture = function (picture) {
  var similarBigPictureElement = document.querySelector('.big-picture');
  var closeButton = document.querySelector('#picture-cancel');
  showItem(similarBigPictureElement);
  similarBigPictureElement.querySelector('.big-picture__img').src = picture.url;
  similarBigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  similarBigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  similarBigPictureElement.querySelector('.social__caption').textContent = picture.description;
  var comments = document.createDocumentFragment();
  picture.comments.forEach(function (comment) {
    comments.appendChild(createComment(comment));
  });
  var commentsList = similarBigPictureElement.querySelector('.social__comments');
  commentsList.appendChild(comments);
  offScroll();

  closeButton.addEventListener('click', closeBigPhoto);
};

// функция для создания элемента
var makeElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

// функция для создания комментария
var createComment = function (comment) {

  var listItem = makeElement('li', 'social__comment');

  var image = makeElement('img', 'social__picture');
  image.src = comment.avatar;
  image.alt = comment.name;
  listItem.appendChild(image);

  var text = makeElement('p', 'social__text', comment.message);
  listItem.appendChild(text);

  return listItem;
};
// отоброжает большое фото и заполняет его данными
// renderBigPicture(mockData[0]);

// прячет блок счётчика комментариев
var commentCounter = document.querySelector('.social__comment-count');
hideItem(commentCounter);

// прячет блок загрузки комментариев
var commentLoader = document.querySelector('.comments-loader');
hideItem(commentLoader);


// module4-task2
var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var showForm = document.querySelector('.img-upload__overlay');
var uploadPrevie = document.querySelector('.img-upload__preview');

// Создаёт функцию для сброса обработчика закрытия
var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

// открывает форму редактирования
var openPopup = function () {
  showItem(showForm);
  getOriginal();
  document.addEventListener('keydown', onPopupEscPress);
  // Отключение скролла на заднем фоне
  offScroll();

};

// закрывает форму редактирования
var closePopup = function () {
  hideItem(showForm);

  document.removeEventListener('keydown', onPopupEscPress);
  // включает скролл заднего фона
  onScroll();
};

uploadFile.onchange = function () {
  openPopup();
  // Закрывает форму клавишей ESCAPE
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  });
};

uploadCancel.addEventListener('click', function () {
  closePopup();
});

var effectLevelLine = document.querySelector('.effect-level__line');
// Находит эффекты
var chrome = document.querySelector('#effect-chrome');
var none = document.querySelector('#effect-none');
var sepia = document.querySelector('#effect-sepia');
var marvin = document.querySelector('#effect-marvin');
var phobos = document.querySelector('#effect-phobos');
var heat = document.querySelector('#effect-heat');
// находит ползунок
var effectLevelPin = document.querySelector('.effect-level__pin');
// находит значение ползунка
var range = document.querySelector('.effect-level__value');
//
var uploadEffectLevel = document.querySelector('.img-upload__effect-level');
// находит кнопки изменения размера
var size = document.querySelector('.scale__control--value');
var sizeMinus = document.querySelector('.scale__control--smaller');
var sizePlus = document.querySelector('.scale__control--bigger');


effectLevelPin.addEventListener('mouseup', function (evt) {
  var lineLength = effectLevelLine.clientWidth;
  var pinPosition = evt.target.offsetLeft / lineLength;
});

// Создаёт функцию увеличения картинки
var resizePlusHandler = function () {
  if (parseInt(size.value, 10) < 100) {
    size.value = parseInt(size.value, 10) + 25 + '%';
    if (parseInt(size.value, 10) === 100) {
      uploadPrevie.style.transform = 'none';
    } else {
      uploadPrevie.style.transform = 'scale(0.' + parseInt(size.value, 10) + ')';
    }
  }
};

// Создаёт функцию уменьшения картинки
var resizeMinusHandler = function () {
  if (parseInt(size.value, 10) > 25) {
    size.value = parseInt(size.value, 10) - 25 + '%';
    uploadPrevie.style.transform = 'scale(0.' + parseInt(size.value, 10) + ')';
  }
};

sizePlus.addEventListener('click', resizePlusHandler);
sizeMinus.addEventListener('click', resizeMinusHandler);

// Функция создания эффектов
var getEffects = function (x) {
  var positionX = parseInt(x, 10);
  range.value = positionX;
  var filtervalue;
  if (uploadPrevie.classList.contains('effects__preview--chrome')) {
    filtervalue = positionX / 100;
    uploadPrevie.style.webkitFilter = 'grayscale(' + filtervalue + ')';
  }
  if (uploadPrevie.classList.contains('effects__preview--sepia')) {
    filtervalue = positionX / 100;
    uploadPrevie.style.webkitFilter = 'sepia(' + filtervalue + ')';
  }
  if (uploadPrevie.classList.contains('effects__preview--marvin')) {
    filtervalue = positionX;
    uploadPrevie.style.webkitFilter = 'invert(' + filtervalue + '%' + ')';
  }
  if (uploadPrevie.classList.contains('effects__preview--phobos')) {
    filtervalue = positionX * 3 / 100;
    uploadPrevie.style.webkitFilter = 'blur(' + filtervalue + 'px' + ')';
  }
  if (uploadPrevie.classList.contains('effects__preview--heat')) {
    filtervalue = positionX * 3 / 100;
    uploadPrevie.style.webkitFilter = 'brightness(' + filtervalue + ')';
  }
};

// Функция показа оригинала
var getOriginal = function () {
  uploadPrevie.classList.remove('effects__preview--chrome');
  uploadPrevie.classList.remove('effects__preview--sepia');
  uploadPrevie.classList.remove('effects__preview--marvin');
  uploadPrevie.classList.remove('effects__preview--phobos');
  uploadPrevie.classList.remove('effects__preview--heat');
  hideItem(uploadEffectLevel);
  getEffects();
};
none.addEventListener('click', getOriginal);
none.addEventListener('click', getEffects);

// Функция создания эффекта Хром
var getChrom = function () {
  uploadPrevie.classList.remove('effects__preview--sepia');
  uploadPrevie.classList.remove('effects__preview--marvin');
  uploadPrevie.classList.remove('effects__preview--phobos');
  uploadPrevie.classList.remove('effects__preview--heat');
  uploadPrevie.classList.toggle('effects__preview--chrome');
  uploadEffectLevel.classList.remove('visually-hidden');
  getEffects();
};
chrome.addEventListener('click', getChrom);
chrome.addEventListener('click', getEffects);

// Функция создания эффекта Сепиа
var getSepia = function () {
  uploadPrevie.classList.remove('effects__preview--chrome');
  uploadPrevie.classList.remove('effects__preview--marvin');
  uploadPrevie.classList.remove('effects__preview--phobos');
  uploadPrevie.classList.remove('effects__preview--heat');
  uploadPrevie.classList.toggle('effects__preview--sepia');
  uploadEffectLevel.classList.remove('visually-hidden');
  getEffects();
};
sepia.addEventListener('click', getSepia);
sepia.addEventListener('click', getEffects);

// Функция создания эффекта Марвин
var getMarvin = function () {
  uploadPrevie.classList.remove('effects__preview--chrome');
  uploadPrevie.classList.remove('effects__preview--sepia');
  uploadPrevie.classList.remove('effects__preview--phobos');
  uploadPrevie.classList.remove('effects__preview--heat');
  uploadPrevie.classList.toggle('effects__preview--marvin');
  uploadEffectLevel.classList.remove('visually-hidden');
  getEffects();
};
marvin.addEventListener('click', getMarvin);
marvin.addEventListener('click', getEffects);

// Функция создания эффекта Фобос
var getPhobos = function () {
  uploadPrevie.classList.remove('effects__preview--chrome');
  uploadPrevie.classList.remove('effects__preview--sepia');
  uploadPrevie.classList.remove('effects__preview--marvin');
  uploadPrevie.classList.remove('effects__preview--heat');
  uploadPrevie.classList.toggle('effects__preview--phobos');
  uploadEffectLevel.classList.remove('visually-hidden');
  getEffects();
};
phobos.addEventListener('click', getPhobos);
phobos.addEventListener('click', getEffects);

// Функция создания эффекта зной
var getHeat = function () {
  uploadPrevie.classList.remove('effects__preview--chrome');
  uploadPrevie.classList.remove('effects__preview--sepia');
  uploadPrevie.classList.remove('effects__preview--marvin');
  uploadPrevie.classList.remove('effects__preview--phobos');
  uploadPrevie.classList.toggle('effects__preview--heat');
  uploadEffectLevel.classList.remove('visually-hidden');
  getEffects();
};
heat.addEventListener('click', getHeat);
heat.addEventListener('click', getEffects);

// // создаёт массив с хэштегами


// var userHashtags = [];
// userHashtags = userHashtagInput.split(' ', re);
// console.log(userHashtags);


// userHashtagInput.addEventListener('input', function () {
//   var valueLength = userHashtagInput.value.length;

//   if (valueLength < MIN_HASHTAG_LENGTH) {
//     userHashtagInput.setCustomValidity('Ещё ' + (MIN_HASHTAG_LENGTH - valueLength) + ' симв.');
//   } else if (valueLength > MAX_HASHTAG_LENGTH) {
//     userHashtagInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_HASHTAG_LENGTH) + ' симв.');
//   } else {
//     userHashtagInput.setCustomValidity('');
//   }
// });

var userHashtagInput = document.querySelector('.text__hashtags');
var formSubmit = function () {
  var userHashtags = userHashtagInput.value.split(' ');
  var duplicatesCounter = 0;
  userHashtagInput.setCustomValidity('');
  testInfo(userHashtagInput);
  for (var l = 0; l < userHashtags.length; l++) {
    // Если элементе массива '#' встречается больше 1 раза - выводим CustomValidity
    if (userHashtags[l].split('#').length - 1 > 1) {
      userHashtagInput.setCustomValidity('Хеш-теги записываются через пробел');
    }
    // Заканчивается на '#', точку или запятую ? - убрать
    while (userHashtags[l].slice(-1) === '#' || userHashtags[l].slice(-1) === ',' || userHashtags[l].slice(-1) === '.' || userHashtags[l].slice(-1) === '/') {
      userHashtags[l] = userHashtags[l].slice(0, -1);
    }
    // Проверка хэштега на наличие #
    if (userHashtags[l].slice(0, 1) !== '#') {
      userHashtagInput.setCustomValidity('Хеш-тег должен начинаться с символа #');
    }
    if (userHashtags[l].length > 20) {
      userHashtagInput.setCustomValidity('Максимальная длина хэштега 20 символов');
    }
    // перевод в верхний регистр, сравниваем хэштеги
    for (var m = 0; m < userHashtags.length; m++) {
      if (userHashtags[l].toUpperCase() === userHashtags[m].toUpperCase()) {
        duplicatesCounter++;
      }
      if (duplicatesCounter > userHashtags.length) {
        userHashtagInput.setCustomValidity('Присутствуют повторяющиеся хэштеги');
      }
    }
    // Выносим мусор и пустоты из массива
    while (userHashtags[l] === '' || userHashtags[l] === '#' || userHashtags[l] === ' ') {
      userHashtags.splice(l, 1);
    }
  }
  if (userHashtags.length > 5) {
    userHashtagInput.setCustomValidity('Максимальное количство хэштегов 5');
  }
  userHashtagInput.value = userHashtags.join(' ');
};

userHashtagInput.addEventListener('blur', formSubmit);

var re = /^#[a-zA-Zа-яА-Я0-9]*$/;
// создаёт функцию проверки хэштегов с помощью регулярного выражения
function testInfo() {
  var userHashtags = re.exec(userHashtagInput.value);
  if (!userHashtags) {
    userHashtagInput.setCustomValidity('Хеш-тег содержит недопустимые символы');
  } else {
    userHashtagInput.setCustomValidity('');
  }
}

