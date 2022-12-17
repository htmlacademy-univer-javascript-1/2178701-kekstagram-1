import { renderPhotos } from './render.js';
import {debounce} from './util.js';
import { getRandomElementsArray } from './util.js';

const RANDOM_PHOTOS_AMOUNT = 10;

const filterSection = document.querySelector('.img-filters');
const defaultfFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

const comparePhotosByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;
const getSortedPhoto = (photo) => photo.slice().sort(comparePhotosByComments);

const removePhotos = () => {
  const picture = document.querySelectorAll('.picture');
  picture.forEach((photo) => {
    photo.remove();
  });
};

const changePhoto = (array, button) => {
  removePhotos();
  const active = document.querySelector('.img-filters__button--active');
  active.classList.remove('img-filters__button--active');
  renderPhotos(array);
  button.classList.add('img-filters__button--active');
};

const showFilteredPhotos = (photos) => {
  renderPhotos(photos);
  filterSection.classList.remove('img-filters--inactive');
  defaultfFilter.addEventListener('click', debounce(() => {
    changePhoto(photos, defaultfFilter);
  }));
  randomFilter.addEventListener('click', debounce(() => {
    changePhoto(getRandomElementsArray(photos, RANDOM_PHOTOS_AMOUNT), randomFilter);
  }));
  discussedFilter.addEventListener('click', debounce(() => {
    changePhoto(getSortedPhoto(photos), discussedFilter);
  }));
};

export {showFilteredPhotos};
