export const TITLE = 'TITLE';
export const DESCRIPTION = 'DESCRIPTION';
export const PRICE = 'PRICE';
export const CURRENCY = 'CURRENCY';
export const QUANTITY = 'QUANTITY';
export const TAGS = 'TAGS';
export const MATERIALS = 'MATERIALS';
export const IMAGE_1 = 'IMAGE_1';
export const IMAGE_2 = 'IMAGE_2';
export const IMAGE_3 = 'IMAGE_3';
export const IMAGE_4 = 'IMAGE_4';
export const IMAGE_5 = 'IMAGE_5';
export const IMAGE_6 = 'IMAGE_6';
export const IMAGE_7 = 'IMAGE_7';
export const IMAGE_8 = 'IMAGE_8';
export const IMAGE_9 = 'IMAGE_9';
export const IMAGE_10 = 'IMAGE_10';
export const VAR_TYPE_1 = 'VAR_TYPE_1';
export const VAR_NAME_1 = 'VAR_NAME_1';
export const VAR_VALUE_1 = 'VAR_VALUE_1';
export const VAR_TYPE_2 = 'VAR_TYPE_2';
export const VAR_NAME_2 = 'VAR_NAME_2';
export const VAR_VALUE_2 = 'VAR_VALUE_2';

// SHOPIFY VARIABLES
export const HANDLE = 'HANDLE';
export const VENDOR = 'VENDOR'; //string 
export const TYPE = 'TYPE'; // string
export const PUBLISH = 'PUBLISH'; // bool (FALSE)
export const VAR_GRAMS = 'VAR_GRAMS'; // string (0)
export const VAR_INV_TRACKER = 'VAR_INV_TRACKER'; // string (shopify)
export const VAR_INV_QTY = 'VAR_INV_QTY'; // string (1)
export const VAR_INV_PLCY = 'VAR_INV_PLCY'; // string (deny)
export const VAR_FULFILLMENT = 'VAR_FULFILLMENT'; // string (manual)
export const VAR_REQUIRES = 'VAR_REQUIRES'; // bool (FALSE)
export const VAR_TAXABLE = 'VAR_TAXABLE'; // bool (FALSE)
export const VAR_UNIT = 'VAR_UNIT'; // string (kg)
export const GIFT_CARD = 'GIFT_CARD'; // boold (FALSE)

export const IMG_ALT = 'IMG_ALT';


export const LETTER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const getLetter = letter => {
  return LETTER.indexOf(letter.toUpperCase().trim());
}

export const INDEX = {
  [TITLE]: getLetter('A'),
  [DESCRIPTION]: getLetter('B'),
  [PRICE]: getLetter('C'),
  [CURRENCY]: getLetter('D'),
  [QUANTITY]: getLetter('E'),
  [TAGS]: getLetter('F'),
  [MATERIALS]: getLetter('G'),
  [IMAGE_1]: getLetter('H'),
  [IMAGE_2]: getLetter('I'),
  [IMAGE_3]: getLetter('J'),
  [IMAGE_4]: getLetter('K'),
  [IMAGE_5]: getLetter('L'),
  [IMAGE_6]: getLetter('M'),
  [IMAGE_7]: getLetter('N'),
  [IMAGE_8]: getLetter('O'),
  [IMAGE_9]: getLetter('P'),
  [IMAGE_10]: getLetter('Q'),
  [VAR_TYPE_1]: getLetter('R'),
  [VAR_NAME_1]: getLetter('S'),
  [VAR_VALUE_1]: getLetter('T'),
  [VAR_TYPE_2]: getLetter('U'),
  [VAR_NAME_2]: getLetter('V'),
  [VAR_VALUE_2]: getLetter('W'),
}

export default { getLetter, INDEX, LETTER };