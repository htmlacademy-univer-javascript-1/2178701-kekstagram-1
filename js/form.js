import { isEscapeKey } from './util.js';
import { validateTheForm } from './validate-form.js';
import {onScaleButtonClick, scaleValue} from './img-scale-count.js';
import { onFilterButtonChange, sliderWrapper } from './img-effects.js';
const effectList = document.querySelector('.effects__list');
const scaleContainer = document.querySelector('.img-upload__scale');
const formUploadPicture = document.querySelector('#upload-select-image');
const inputPhotos = document.querySelector('#upload-file');
const initialValueInputUploadPicture = inputPhotos.getAttribute('value');
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__overlay');
const formCloseButton = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');


function removeEventListenerFromForm (){
  formCloseButton.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', onFormCloseEscapePress);
  formUploadPicture.removeEventListener('submit', validateTheForm);
  scaleContainer.removeEventListener('click', onScaleButtonClick);
  effectList.removeEventListener('change', onFilterButtonChange);
}

function resetFormInputValues(){
  inputPhotos.value = initialValueInputUploadPicture;
  textDescription.value = '';
  textHashtags.value = '';
  scaleValue.value = `${100}%`;
}

function closeForm() {
  form.classList.add('hidden');
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
  formUploadPicture.addEventListener('submit', validateTheForm);
  scaleContainer.addEventListener('click', onScaleButtonClick);
  effectList.addEventListener('change', onFilterButtonChange);
}

inputPhotos.addEventListener('change', function() {
  if( this.value ){
    body.classList.add('modal-open');
    form.classList.remove('hidden');
    sliderWrapper.classList.add('hidden');
    addEventListenerToForm();
  }
});

export {imgPreview};
