import {
  INDEX,
  LETTER,

  TITLE,
  DESCRIPTION,
  PRICE,
  CURRENCY,
  QUANTITY,
  TAGS,
  MATERIALS,
  IMAGE_1,
  IMAGE_2,
  IMAGE_3,
  IMAGE_4,
  IMAGE_5,
  IMAGE_6,
  IMAGE_7,
  IMAGE_8,
  IMAGE_9,
  IMAGE_10,
  VAR_TYPE_1,
  VAR_NAME_1,
  VAR_VALUE_1,
  VAR_TYPE_2,
  VAR_NAME_2,
  VAR_VALUE_2,

  HANDLE,
} from './letter.js';

function parseValue(type, valueRef) {
  let value = valueRef;
  switch(type) {
    case HANDLE:
      return parseHandle(value);
    case TITLE:
      return parseTitle(value);
    case DESCRIPTION:
      return parseDescription(value);
    case TAGS:
      return parseTags(value);
    case PRICE:
      return parsePrice(value);
  }

  return value;
}

const parseHandle = value => {

  return value
          .toLowerCase()
          .replace(/[^0-9a-z\-\s]/gi, '')  // allow only letter, numbers, space and dash
          .replace(/\s+/g, ' ') // replace multiple space with 1 space
          .replace(/\s/g, '-') 
}

const parseTitle = value => {
  return value.replace(/\s+/g, ' ') // replace multiple space with 1 space
}

const parseDescription = value => {
  return value
            .replace(/(?:\r\n|\r|\n)/g, '<br/>') // replace new line with <br>
            .replace(/\s+/g, ' ') // replace multiple space with 1 space
}

const parseTags = value => {
  return `"${value.split(',').map(val => val.trim()).join(', ')}"`;
}

const parsePrice = value => {
  return value.replace(/[^0-9\.]/gi, '');
}

export default parseValue;