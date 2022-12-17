import { sendData } from './api.js';
import { blockSubmitButton, successPost, failPost, unblockSubmitButton } from './form.js';
const formUploadPicture = document.querySelector('#upload-select-image');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const hashtagValidateRegEx = /^#[a-zа-яё0-9]{1,19}$/;

const pristine = new Pristine(formUploadPicture, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

function validateForm (value) {
  const hashtagsLowerCase = value.toLowerCase();
  const hashtags = hashtagsLowerCase.split(' ');
  const uniqeHashtags = [...new Set(hashtags)];
  if (value === ''){
    return true;
  }
  for (const hashtag of hashtags){
    if (!hashtagValidateRegEx.test(hashtag)){
      return false;
    }
  }
  return hashtags.length <= 5 && hashtags.length === uniqeHashtags.length;
}

pristine.addValidator(
  textHashtags,
  validateForm,
  'Максимум хэштегов: 5. Максимальная длина хэштега: 20 символов'
);
pristine.addValidator(
  textDescription,
  validateDescriptions,
  'Максимальная длина 140 символов'
);

function validateDescriptions(value){
  return value.length <= 140;
}

function validateTheForm(evt){
  evt.preventDefault();
  if (pristine.validate()){
    blockSubmitButton();
    sendData(successPost, failPost, new FormData(evt.target), unblockSubmitButton);
  }
}

export {validateTheForm};
