import $ from 'jquery';
import Papa from 'papaparse';

import {
  getLetter,
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
  VENDOR,
  TYPE,
  PUBLISH,
  VAR_GRAMS,
  VAR_INV_TRACKER,
  VAR_INV_QTY,
  VAR_INV_PLCY,
  VAR_FULFILLMENT,
  VAR_REQUIRES,
  VAR_TAXABLE,
  VAR_UNIT,
  GIFT_CARD,
  IMG_ALT
} from './js/letter.js';
import HEADERS from './js/headers.js';
import parseValue from './js/parseValue.js';

let FINAL_DATA = [];

const $container = $('#container'),
      $input = $('input[name=file]'),
      $vendor = $('input[name=vendor]'),
      $type = $('input[name=type]'),
      $publish = $('select[name=publish]'),
      $sku = $('input[name=sku]'),
      $grams = $('input[name=grams]'),
      $tracker = $('input[name=tracker]'),
      $quantity = $('input[name=quantity]'),
      $policy = $('select[name=policy]'),
      $fulfillment = $('input[name=fulfillment]'),
      $requiresShipping = $('select[name=requires_shipping]'),
      $taxable = $('select[name=taxable]'),
      $unit = $('input[name=unit]'),
      $giftcard = $('select[name=giftcard]'),

      $left = $('.left'),
      $nav = $left.find('.nav'),

      $tableWrapper = $('#tableWrapper'),

      $fileUploadWrapper = $('li.file-upload-wrapper'),
      $linkUpload = $('a.upload'),
      $filename = $('a.filename'),
      $export = $('button[name=export]'),

      $table = $("#preview");

const $TR = $('<tr></tr>'),
      $TD = $('<td></td>'),
      $DIV = $('<div></div>');

/**
 * Returns the value of the data selected
 * @param  {object}
 * @param  {type}
 * @return {string}
 */
const getData = (data, type) => {
  return data[INDEX[type]] || "";
}

/**
 * Creates default entry of a product
 *
 * @param  {object}
 * @return {object}
 */
const createDefaultEntry = data => {
  return {
    [HANDLE]: parseValue(HANDLE, getData(data, TITLE)),
    [TITLE]: parseValue(TITLE, getData(data, TITLE)),
    [DESCRIPTION]: parseValue(DESCRIPTION, getData(data, DESCRIPTION)),
    [VENDOR]: $vendor.val(),
    [TYPE]: $type.val(),
    [TAGS]: parseValue(TAGS, getData(data, TAGS)),
    [PUBLISH]: $publish.val(),
    [VAR_NAME_1]: getData(data, VAR_NAME_1),
    [VAR_NAME_2]: getData(data, VAR_NAME_2),
    [PRICE]: getData(data, PRICE),
  }
}

/**
 * Creates an array of objects
 * @param  {[type]}
 * @return {array of objects}
 *
 *
 * [
 *  {
 *    value_1: value,
 *    value_2: value,
 *  }
 * ]
 */
const createVariantsEntries = data => {
  let arrayStorage = [];
  if (getData(data, VAR_TYPE_1)) {
    let val_1 = getData(data, VAR_VALUE_1).split(','),
        val_2 = getData(data, VAR_VALUE_2).split(',');

    val_1.forEach(value_1 => {
      if (val_2.length) {
        val_2.forEach(value_2 => {
          arrayStorage.push({
            value_1,
            value_2
          });
        });
        return;
      }

      arrayStorage.push({
        value_1,
      });
    })
  }

  return arrayStorage;
}

/**
 * Returns an array of images
 * @param  {obect}
 * @return {array}
 */
const consolidateImages = data => {
  return [
    getData(data, IMAGE_1),
    getData(data, IMAGE_2),
    getData(data, IMAGE_3),
    getData(data, IMAGE_4),
    getData(data, IMAGE_5),
    getData(data, IMAGE_6),
    getData(data, IMAGE_7),
    getData(data, IMAGE_8),
    getData(data, IMAGE_9),
    getData(data, IMAGE_10),
  ].filter(e => !!e);
}

const createEntries = (
    data,
    variants,
    image = "",
    index,
  ) => {
  if (!variants) {
     variants = { value_1: '', value_2: '' };
  }

  const { value_1, value_2 } = variants;

  if (index === 1) {
    return [
      data[HANDLE],
      data[TITLE],
      data[DESCRIPTION],
      data[VENDOR],
      data[TYPE],
      data[TAGS],
      data[PUBLISH],
      data[VAR_NAME_1],
      value_1,
      data[VAR_NAME_2],
      value_2,
      '', // OPTION NAME 3
      '', // OPTION VALUE 3
      parseValue('', $sku.val()),
      parseValue(PRICE, $grams.val()),
      parseValue('', $tracker.val()),
      parseValue(PRICE, $quantity.val()),
      parseValue('', $policy.val()),
      parseValue('', $fulfillment.val()),
      data[PRICE],
      '', // VARIANT COMPARE AT PRICE
      $requiresShipping.val(),
      $taxable.val(),
      '', // BAR CODE
      image, // IMAGE
      index, // IMAGE INDEX
      data[TITLE],
      $giftcard.val(),
      '', // SEO TITLE
      '', // SEO DESCRIPTION
      '', // Google Shopping / Google Product Category
      '', // Google Shopping / Gender
      '', // Google Shopping / Age Group
      '', // Google Shopping / MPN
      '', // Google Shopping / AdWords Grouping
      '', // Google Shopping / AdWords Labels
      '', // Google Shopping / Condition
      '', // Google Shopping / Custom Product
      '', // Google Shopping / Custom Label 0
      '', // Google Shopping / Custom Label 1
      '', // Google Shopping / Custom Label 2
      '', // Google Shopping / Custom Label 3
      '', // Google Shopping / Custom Label 4
      '', // Variant Image
      $unit.val(),
      '', // Variant Tax Code
    ];
  }

  return [
    data[HANDLE],
    '', // Title
    '', // Body (HTML)
    '', // Vendor
    '', // Type
    '', // Tags
    '', // Published
    '', // Option1 Name
    value_1,
    '', // Option2 Name
    value_2,
    '', // Option3 Name
    '', // Option3 Value
    value_1 ? parseValue('', $sku.val()) : '', // Variant SKU
    value_1 ? parseValue(PRICE, $grams.val()) : '', // Variant Grams
    value_1 ? parseValue('', $tracker.val()) : '', // Variant Inventory Tracker
    value_1 ? parseValue(PRICE, $quantity.val()) : '', // Variant Inventory Qty
    value_1 ? parseValue('', $policy.val()) : '', // Variant Inventory Policy
    value_1 ? parseValue('', $fulfillment.val()) : '', // Variant Fulfillment Service
    value_1 ? data[PRICE] : '', // Variant Price
    '', // Variant Compare At Price
    value_1 ? $requiresShipping.val() : '', // Variant Requires Shipping
    value_1 ? $taxable.val() : '', // Variant Taxable
    '', // Variant Barcode
    image, // Image Src
    image ? index : '', // Image Position
    image ? data[TITLE] : '', // Image Alt Text
    '', // Gift Card
    '', // SEO TITLE
    '', // SEO DESCRIPTION
    '', // Google Shopping / Google Product Category
    '', // Google Shopping / Gender
    '', // Google Shopping / Age Group
    '', // Google Shopping / MPN
    '', // Google Shopping / AdWords Grouping
    '', // Google Shopping / AdWords Labels
    '', // Google Shopping / Condition
    '', // Google Shopping / Custom Product
    '', // Google Shopping / Custom Label 0
    '', // Google Shopping / Custom Label 1
    '', // Google Shopping / Custom Label 2
    '', // Google Shopping / Custom Label 3
    '', // Google Shopping / Custom Label 4
    '', // Variant Image
    value_1 ? $unit.val() : '',
    '', // Variant Tax Code
  ]
}

const createColumn = ($tr, text) => {
  $tr.append(`<td><div>${text}</div></td>`);
}

const createRow = data => {

  data.forEach((row, index) => {
    let $tr = $TR.clone();

    $tr.attr('index', index);
    row.forEach(value => createColumn($tr, value));
    $table.append($tr);
  })
};

/**
 * Used to traverse the rows of CSV
 * @param  {array}
 * @return {void}
 */
const loopRow = row => {

  let data = row.slice(0);

  let newRow = createDefaultEntry(data);

  // traverse columns

  let variants = createVariantsEntries(data);

  if (variants.length === 0) {
    variants = [{ value_1: 'Default Title', value_2: '' }];
    newRow.VAR_NAME_1 = 'Title';
  }

  let images = consolidateImages(data);

  let loop = images.length > variants.length ? images.length : variants.length;

  for(let i = 1; i <= loop; i++) {
    FINAL_DATA.push(
      createEntries(
        newRow,
        variants.shift(),
        images.shift(),
        i,
      )
    );
  }
}

const createHeader = data => {
  let $tr = $TR.clone();

  $tr.addClass('headers');

  HEADERS.forEach(text => {
    $tr.append(`<th>${text}</th>`);
  })

  $table.append($tr);
}

const config = {
  delimiter: ',',
  escapeChar: '"',
  preview: 0,
  complete: function({ data }, file) {
    $table.empty();

    FINAL_DATA = [];

    createHeader(data[0]);

    data.slice(1).forEach(value => {
      if (value.length > 1) {
        loopRow(value)
        return;
      }
    })

    createRow(FINAL_DATA);
  },
}

window.FINAL_DATA = FINAL_DATA;

$input.on('change', function() {
  const file = $input.get(0).files[0];

  if (file) {
    $container.addClass('hasFile');
    Papa.parse(file, config);

    $export.removeAttr('disabled');

    $filename.text(file.name);
    return;
  }
});

$export.click(({ which }) => {
  if (!$input.get(0).files[0]) {
    return;
  }

  const csvString = Papa.unparse([HEADERS].concat(FINAL_DATA)),
        blob = new Blob([csvString]),
        a = document.createElement("a"),
        filename = $input.get(0).files[0].name.slice(0, -4) + '_' + (new Date()).getTime();


    a.href = window.URL.createObjectURL(blob, {type: "text/plain"});


    a.download = `shopifyCsvFormat_${filename}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

$nav.click(({ which }) => {
  if (which !== 1) {
    return;
  }

  $container.toggleClass('expanded');
});

$linkUpload.click(({ which }) => {
  if (which !== 1) {
    return;
  }

  $input.click();
});

$filename.click(({ which}) => {
  if (which !== 1) {
    return;
  }

  $input.val('').trigger('change');
  $table.empty();

  $container.removeClass('hasFile');
  $export.attr('disabled', 'disabled');
});

$(document).on('click', 'tr:not(.headers) td div', ({ target }) => {
  return;
  var selected = document.querySelector('table td.selected');

  if (selected) {
    selected.classList.remove('selected');
  }

  target.closest('td').classList.add('selected');
});

$(document).on('drag dragstart dragend dragover dragenter dragleave drop', event => {
  event.preventDefault();
});

$tableWrapper.on('drop', e => {
  e.preventDefault();

  $input.get(0).files = e.originalEvent.dataTransfer.files
});

document.oncontextmenu = () => false;

/*
 TODO:

  -- ADD EDITING OF COLUMNS

*/