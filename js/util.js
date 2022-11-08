function calculateRandomNumber(min, max) {
  if (min < 0 || min >= max) {
    throw { name: 'Invalid arguments', message: 'Invalid arguments' };
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomArrayElements = (elements, countOfElements) => {
  if (countOfElements === 2) {
    const firstElement = elements[calculateRandomNumber(0, elements.length - 1)];
    let secondElement = elements[calculateRandomNumber(0, elements.length - 1)];
    while (firstElement === secondElement) {
      secondElement = elements[calculateRandomNumber(0, elements.length - 1)];
    }
    return `${firstElement} ${secondElement}`;
  }
  return elements[calculateRandomNumber(0, elements.length - 1)];
};

// eslint-disable-next-line no-unused-vars
const сhecksLengthOfString = (verifiableString, maxLenght) => verifiableString.length < maxLenght;

const getArrayObj  = (func) => Array.from({length: calculateRandomNumber(1, 6)}, func);

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomArrayElements, calculateRandomNumber, getArrayObj, isEscapeKey};
