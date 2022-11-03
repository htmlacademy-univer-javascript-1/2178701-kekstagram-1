import { generateSimilarDescriptionsArray } from './data.js';

const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');
const photosContainer = document.querySelector('.pictures');

const getPhotoElement = function ({ url, likes, comments }) {
  const clonedPhoto = newPictureTemplate.cloneNode(true);
  clonedPhoto.querySelector('img').src = url;
  clonedPhoto.querySelector('pictures__likes').textContent = likes;
  clonedPhoto.querySelector('.picture__comments').textContent = comments.length;
  return clonedPhoto;
};

const renderPhotos = function (photos) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    fragment.appendChild(getPhotoElement(photos[i]));
  }
  photosContainer.appendChild(fragment);
};

renderPhotos(generateSimilarDescriptionsArray);
export { photosContainer };


