function calculateRandomNumber(min, max) {
  if (min < 0 || min >= max) {
    throw { name: 'Invalid arguments', message: 'Invalid arguments' };
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

calculateRandomNumber(1, 10);

const сhecksLengthOfString = (verifiableString, maxLenght) => verifiableString.length < maxLenght;

сhecksLengthOfString('qwerty', 30);
