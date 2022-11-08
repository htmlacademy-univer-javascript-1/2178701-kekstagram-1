import { isEscapeKey } from './util.js';
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentList = document.querySelector('.social__comments');

const commentMessage = commentList.querySelector('.social__comment');

const closeBigPhoto = function() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const onBigPhotoCloseClick = function (){
  bigPictureClose.removeEventListener('click', onBigPhotoCloseClick);
  closeBigPhoto();
};

const onBigPhotoCloseEscapePress = function(evt){
  if (isEscapeKey(evt)){
    evt.preventDefault();
    closeBigPhoto();
    document.removeEventListener('keydown', onBigPhotoCloseEscapePress);
  }
};

const createComment = function (comment) {
  const commentElement = commentMessage.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const fillComments = function (comments) {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) =>{
    const newComment = createComment(comment);
    fragment.appendChild(newComment);
  });
  commentList.appendChild(fragment);
};

const showBigPicture = function (photo) {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  document.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  commentList.innerHTML = '';
  fillComments(photo.comments);
  bigPictureClose.addEventListener('click', onBigPhotoCloseClick);
  document.addEventListener('keydown', onBigPhotoCloseEscapePress);
};


export {showBigPicture};
