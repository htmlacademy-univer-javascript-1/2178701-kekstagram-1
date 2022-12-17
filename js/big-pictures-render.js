import { isEscapeKey } from './util.js';
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const loaderCommentsButton = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
let commentsAmount = 0;
const MAX_SIZE_COMMENTS = 5;

const closeBigPhoto = function() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureClose.removeEventListener('click', closeBigPhoto);
  document.removeEventListener('keydown', onBigPhotoCloseEscapePress);
  commentsAmount = 0;
};

function onBigPhotoCloseEscapePress (evt){
  if (isEscapeKey(evt)){
    evt.preventDefault();
    closeBigPhoto();
  }
}

function createComment(comment) {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
}

const fillComments = function (comments) {
  comments.slice(commentsAmount, commentsAmount + MAX_SIZE_COMMENTS).forEach((comment) =>{
    const newComment = createComment(comment);
    commentsList.appendChild(newComment);
    commentsAmount++;
  });
  socialCommentCount.innerHTML = `${commentsAmount} из <span class="comments-count">${comments.length}</span> комментариев`;
  if (comments.length === commentsAmount){
    loaderCommentsButton.classList.add('hidden');
  } else{
    loaderCommentsButton.classList.remove('hidden');
  }
};

const showBigPicture = function (photo) {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  document.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPictureClose.addEventListener('click', closeBigPhoto);
  document.addEventListener('keydown', onBigPhotoCloseEscapePress);
  commentsList.innerHTML = '';
  fillComments(photo.comments);
  loaderCommentsButton.onclick = () => fillComments(photo.comments);
};


export {showBigPicture};
