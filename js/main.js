const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
const DECSRIPTIONS = [
  'это я',
  'это не я',
  'какая то цитата к фотографии',
  'фраза из песни',
  'смайлик',
  'очень длинный текст, который никто не прочитает',
  'набор символов',
  'текст с орфографическими ошибками',
  'текст на английском',
  'текст на испанском',
  'реклама',
  'я уже устал придумывать описания.....'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const DECSRIPTIONS_COUNT = 25;
const LIKES_AMOUNT = { min: 15, max: 200 };

function calculateRandomNumber(min, max) {
  if (min < 0 || min >= max) {
    throw { name: 'Invalid arguments', message: 'Invalid arguments' };
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

calculateRandomNumber(1, 10);

const сhecksLengthOfString = (verifiableString, maxLenght) => verifiableString.length < maxLenght;

сhecksLengthOfString('qwerty', 30);

const COUNT_COMMENTS = calculateRandomNumber(1, 10);

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

function createPhotoDescription(id) {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElements(DECSRIPTIONS, 1),
    likes: calculateRandomNumber(LIKES_AMOUNT.min, LIKES_AMOUNT.max),
    comments: Array.from({ length: COUNT_COMMENTS }, createCommentsToPhoto)
  };
}

function createCommentsToPhoto() {
  return {
    id: calculateRandomNumber(1, 1000),
    avatar: `img/avatar-${calculateRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElements(MESSAGES, calculateRandomNumber(1, 2)),
    name: getRandomArrayElements(NAMES, 1)
  };
}


const generateSimilarDescriptionsArray = (num) => { Array.from({ length: num }).map((index) => createPhotoDescription(index + 1)); };

// eslint-disable-next-line no-unused-vars
const data = generateSimilarDescriptionsArray(DECSRIPTIONS_COUNT);

