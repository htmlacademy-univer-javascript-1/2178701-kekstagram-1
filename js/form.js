import { isEscapeKey } from './util.js';
import { validateTheForm } from './validate-form.js';
const formUploadPicture = document.querySelector('#upload-select-image');
const inputPhotos = document.querySelector('#upload-file');
const initialValueInputUploadPicture = inputPhotos.getAttribute('value');
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__overlay');
const formCloseButton = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

function removeEventListenerFromForm (){
  formCloseButton.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', onFormCloseEscapePress);
  formUploadPicture.removeEventListener('submit', validateTheForm);
}

function resetFormInputValues(){
  inputPhotos.value = initialValueInputUploadPicture;
  textDescription.value = '';
  textHashtags.value = '';
}

function closeForm() {
  form.classList.add('hidden');
  body.classList.remove('modal-open');
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
}

inputPhotos.addEventListener('change', function() {
  if( this.value ){
    body.classList.add('modal-open');
    form.classList.remove('hidden');
    addEventListenerToForm();
  }
});
