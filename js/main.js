'use strict';
var PHOTOS_QUANTITY = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var NUMBER_AVATAR_MIN = 1;
var NUMBER_AVATAR_MAX = 6;
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

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
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
  similarBigPictureElement.classList.remove('hidden');
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

renderBigPicture(mockData[0]);

// прячет блок счётчика комментариев
var commentCounter = document.querySelector('.social__comment-count');
commentCounter.classList.add('hidden');

// прячет блок загрузки комментариев
var commentLoader = document.querySelector('.comments-loader');
commentLoader.classList.add('hidden');

// Отключает скролл заднего фона
var modalWindow = document.body;
modalWindow.classList.add('modal-open');
