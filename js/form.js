import { isEscapeKey } from './util.js';
import { validateTheForm } from './validate-form.js';
import {onScaleButtonClick, scaleValue} from './img-scale-count.js';
import { onFilterButtonChange, sliderWrapper } from './img-effects.js';
const effectsList = document.querySelector('.effects__list');
const form = document.querySelector('.img-upload__form');
const scaleContainer = document.querySelector('.img-upload__scale');
const submitButton = document.querySelector('#upload-submit');
const inputPhotos = document.querySelector('#upload-file');
const initialValueInputUploadPicture = inputPhotos.getAttribute('value');
const body = document.querySelector('body');
const formOverlay = document.querySelector('.img-upload__overlay');
const formCloseButton = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

function removeEventListenerFromForm (){
  formCloseButton.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', onFormCloseEscapePress);
  form.removeEventListener('submit', validateTheForm);
  scaleContainer.removeEventListener('click', onScaleButtonClick);
  effectsList.removeEventListener('change', onFilterButtonChange);
}

function resetFormInputValues(){
  inputPhotos.value = initialValueInputUploadPicture;
  textDescription.value = '';
  textHashtags.value = '';
  scaleValue.value = `${100}%`;
}

function closeForm() {
  formOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgPreview.removeAttribute('class');
  imgPreview.removeAttribute('style');
  resetFormInputValues();
  removeEventListenerFromForm();
}

function onFormCloseEscapePress (evt){
  const activeElement = document.activeElement;
  if (isEscapeKey(evt) && activeElement !== textHashtags && activeElement !== textDescription){
    closeForm();
  }
}

function addEventListenerToForm (){
  formCloseButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', onFormCloseEscapePress);
  form.addEventListener('submit', validateTheForm);
  scaleContainer.addEventListener('click', onScaleButtonClick);
  effectsList.addEventListener('change', onFilterButtonChange);
}

inputPhotos.addEventListener('change', function() {
  if( this.value ){
    body.classList.add('modal-open');
    formOverlay.classList.remove('hidden');
    sliderWrapper.classList.add('hidden');
    addEventListenerToForm();
    const file = inputPhotos.files[0];
    imgPreview.src = URL.createObjectURL(file);
  }
});

function createPostMessage() {
  const messageTemplate = document.querySelector('#messages').content.querySelector('div');
  const message = messageTemplate.cloneNode(true);
  body.append(message);
  return message;
}

function removePostMessage(message) {
  body.removeChild(message);
}

function blockSubmitButton() {
  submitButton.disabled = true;
  // eslint-disable-next-line no-global-assign
  postMessage = createPostMessage();
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  removePostMessage(postMessage);
}

const onMessageClickOutside = (evt, messageBlock, isError, abortController) => {
  if (!evt.target.closest(`.${isError ? 'error' : 'success'}__inner`)) {
    removeMessageBlock(messageBlock, abortController);
  }
};

function removeMessageBlock(messageBlock, abortController) {
  abortController.abort();
  body.removeChild(messageBlock);
}

const onMessageEscKeydown = (evt, messageBlock, abortController) => {
  if (isEscapeKey(evt)) {
    removeMessageBlock(messageBlock, abortController);
  }
};

function createMessageBlock(isError) {
  closeForm();
  const messageTemplate = document.querySelector(`#${isError ? 'error' : 'success'}`).content.querySelector('section');
  const message = messageTemplate.cloneNode(true);
  const button = message.querySelector('button');
  body.append(message);
  const abortController = new AbortController();
  button.onclick = () => removeMessageBlock(message, abortController);
  message.onclick = (evt) => onMessageClickOutside(evt, message, isError, abortController);
  document.addEventListener('keydown', (evt) => onMessageEscKeydown(evt, message, abortController), { signal: abortController.signal });
}

function getSuccessPost() {
  createMessageBlock(false);
}
function getFailPost() {
  createMessageBlock(true);
}

export {imgPreview, blockSubmitButton, getSuccessPost, getFailPost, unblockSubmitButton};
