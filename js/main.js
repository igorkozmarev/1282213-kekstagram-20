const PHOTOS_QUANTITY = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const NUMBER_AVATAR_MIN = 1;
const NUMBER_AVATAR_MAX = 6;
const PHOTO_OBJECT_FIELDS = {
  comments :
  [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ],
  names :
  [
    'Пётр',
    'Иван',
    'Евгений',
    'Дарья',
    'Виолетта',
    'Нина',
  ],
};

'use strict';

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var createMockData = function() {
  var arr = [];
  for (var i = 0; i < PHOTOS_QUANTITY; i++) {
    var comments=[];
    var obj = {
      url : `photos/${i+1}.jpg`,
      description: '',
      likes: getRandomNumber(LIKES_MIN,LIKES_MAX),
      comments: comments,
    };
    var commentObj = {
      avatar: `img/avatar-${getRandomNumber(NUMBER_AVATAR_MIN,NUMBER_AVATAR_MAX)}.svg`,
      message: PHOTO_OBJECT_FIELDS.comments[getRandomNumber(NUMBER_AVATAR_MIN,NUMBER_AVATAR_MAX)-1],
      name: PHOTO_OBJECT_FIELDS.names[getRandomNumber(NUMBER_AVATAR_MIN,NUMBER_AVATAR_MAX)-1],
    }
    arr.push(commentObj);
  }
  return arr;
}

var simularPictureElement = document.querySelector('.pictures');
var simularPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPicture = function(picture) {
  var pictureElement = simularPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = obj.url;
  pictureElement.querySelector('.picture__likes').textContent = obj.likes;
  pictureElement.querySelector('.picture__comments').textContent = obj.comments;

  return pictureElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < picture.length; i++) {
  fragment.appendChild(renderPicture(picture[i]));
}

console.log(createMockData());
