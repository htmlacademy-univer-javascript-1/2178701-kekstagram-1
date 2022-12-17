import { renderPhotos } from './render.js';
import {debounce} from './util.js';
import { getRandomElementsArray } from './util.js';

const RANDOM_PHOTOS_AMOUNT = 10;

const filterSection = document.querySelector('.img-filters');
const defaultfFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

const comparePhotosByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;
const getSortedPhotos = (photos) => photos.slice().sort(comparePhotosByComments);

const removePhotos = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((photo) => {
    photo.remove();
  });
};

const changePhotos = (array, button) => {
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
    changePhotos(photos, defaultfFilter);
  }));
  randomFilter.addEventListener('click', debounce(() => {
    changePhotos(getRandomElementsArray(photos, RANDOM_PHOTOS_AMOUNT), randomFilter);
  }));
  discussedFilter.addEventListener('click', debounce(() => {
    changePhotos(getSortedPhotos(photos), discussedFilter);
  }));
};

export {showFilteredPhotos};
