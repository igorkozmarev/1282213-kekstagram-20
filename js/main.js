'use strict';
 var photosQuantity = 25;
 var likesMin = 15;
 var likesMax = 200;

 var photoObjectFields = {
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
var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};
var createMockData = function() {
  var arr = [];
  for (var i = 0; i < 25; i++) {
    var comments=[];
    var obj = {
      url : `photos/${i+1}.jpg`,
      description: '',
      likes: getRandomNumber(15,200),
      comments: comments,
    };
    var commentObj = {
      avatar: `img/avatar-${getRandomNumber(1,6)}.svg`,
      message: photoObjectFields.comments[getRandomNumber(0,5)],
      name: photoObjectFields.names[getRandomNumber(0,5)],
    }
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
simularPictureElement.appendChild(pictureElement);
