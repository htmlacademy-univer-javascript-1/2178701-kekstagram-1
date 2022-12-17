import './util.js';
/* eslint-disable no-unused-vars */
import { getData } from './api.js';
import { renderPhotos } from './render.js';
import './form.js';
import { initEffects } from './img-effects.js';
initEffects();

function showError(errorMessage) {
  const errorTemplate = document.querySelector('#error').content.querySelector('section');
  const error = errorTemplate.cloneNode(true);
  error.querySelector('h2').textContent = errorMessage;
  error.querySelector('button').remove();
  document.querySelector('body').append(error);
  setTimeout(() => {
    error.remove();
  }, 5000);
}

getData(renderPhotos, showError);

