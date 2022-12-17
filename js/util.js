function calculateRandomNumber(min, max) {
  if (min < 0 || min >= max) {
    throw { name: 'Invalid arguments', message: 'Invalid arguments' };
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const getRandomElementsArray = (arr, count) => {
  const copiedArray = arr.slice();
  const newArray = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = calculateRandomNumber(0, copiedArray.length - 1);
    newArray.push(copiedArray[randomIndex]);
    copiedArray.splice(randomIndex, 1);
  }
  return newArray;
};

// eslint-disable-next-line no-unused-vars
const сhecksLengthOfString = (verifiableString, maxLenght) => verifiableString.length < maxLenght;

const getArrayObj  = (func) => Array.from({length: calculateRandomNumber(1, 6)}, func);

const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export { calculateRandomNumber, getArrayObj, isEscapeKey, debounce, getRandomElementsArray};
