function calculateRandomNumber(min, max) {
  if (min < 0 || min >= max) {
    return 'Invalid arguments';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
calculateRandomNumber(1, 10);

function сhecksLengthOfString(verifiableString, maxLenght) {
  verifiableString = String(verifiableString);
  if (verifiableString.length < maxLenght) {
    return true;
  }
  return false;
}
сhecksLengthOfString('qwerty', 30);

