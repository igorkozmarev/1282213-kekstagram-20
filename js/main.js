'use strict';
var photoObjectFields = {
  photosQuantity: 25,
  likesMin: 15,
  likesMax: 200,
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
var creationArray = function() {
  var arr = [];
  for (var i = 0; i < 25; i++) {
    var comments=[];
    var obj = {
      url : `photos/${i+1}.jpg`,
      discriptions: ``,
      likes: getRandomNumber(15,200),
      comments: comments,
    };
    var commentObj = {
      avatar: `img/avatar-${getRandomNumber(1,6)}.svg`,
      message: photoObjectFields.comments[getRandomNumber(1,6)-1],
      name: photoObjectFields.names[getRandomNumber(1,6)-1],
    }
    comments.push(commentObj);
    arr.push(obj);
  }
  return arr;
}
var addPhotoToTemplate = function(photo) {
  var template = document.querySelector('#picture');
  var picture = template.content.querySelector('.picture');
  var clone = picture.cloneNode(true);
  clone.querySelector('.picture__img').src = photo.url;
  clone.querySelector('.picture__likes').textContent = photo.likes;
  clone.querySelector('.picture__comments').textContent = photo.comments[0].message;
  template.content.appendChild(clone);
}
var photoes = creationArray();
for (var i = 0; i<photoes.length; i++)
{
  addPhotoToTemplate(photoes[i]);
}
console.log(creationArray());
