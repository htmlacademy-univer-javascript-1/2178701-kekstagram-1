import { imgPreview } from './form.js';

const scaleValue = document.querySelector('.scale__control--value');
scaleValue.value = `${100}%`;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const STEP_SCALE_VALUE = 25;

function onScaleButtonClick (evt) {
  const scaleInput = Number.parseInt(scaleValue.value, 10);
  let scaleCount = MAX_SCALE_VALUE;
  const buttonScale = evt.target;
  if (buttonScale.tagName === 'BUTTON') {
    if (buttonScale.classList.contains('scale__control--bigger')) {
      scaleCount =  Math.min(scaleInput + STEP_SCALE_VALUE, MAX_SCALE_VALUE);
      scaleValue.value = `${scaleCount}%`;
    } else {
      scaleCount = Math.max(scaleInput - STEP_SCALE_VALUE, MIN_SCALE_VALUE);
      scaleValue.value = `${scaleCount}%`;
    }
    imgPreview.style.transform = `scale(${scaleCount / 100})`;
  }
}

export {onScaleButtonClick, scaleValue};
