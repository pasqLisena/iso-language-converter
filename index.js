import iso from './iso';

export default function isoLanguageConverter(input, options = {}) {
  if (!input || typeof input != 'string')
    throw new Error('isoConv requires a string as first argument');

  let isoFrom = options.from ||
    ((input.length == 2) ? 1 : (input.length == 3) ? 5 : 'label');

  if (isoFrom == 'script'){
    throw new Error('"script" is not a valid value for the "from" option');
  }

    let isoTo = options.to || (isoFrom == 'label' ? 1 : 'label');

  let field = code2field(isoTo);
  if (!field) throw new Error('"to" option invalid');

  let result = find(input, isoFrom);

  if (!result) return null;

  let str = result[field];

  if (!str && isoTo != 'label' && options.fallback) {
    // ISO 639-2/5 is the most complete: use that field for fallback
    str = result['ISO 639-2/5'];
  }

  if (!str || !str.includes('/')) return str;

  let parts = str.split('/');
  str = parts[0].includes('*') ? parts[1] : parts[0];

  return str.trim();
}

function find(input, isoV) {
  let field = code2field(isoV);
  // console.log(isoV + ' --> '+field);
  if (!field) throw new Error('"from" option invalid');

  return iso.find((item) => {
    if (!item[field].includes('/')) return item[field] == input;
    return item[field].includes(input);
  });
}

function code2field(isoV) {
  let field;
  switch (isoV) {
    case 5:
    case 4:
    case 2:
      field = 'ISO 639-2/5';
      break;
    case 3:
      field = 'ISO 639-3';
      break;
    case 1:
      field = 'ISO 639-1';
      break;
    case 'label':
      field = 'Language name';
      break;
    case 'script':
      field = 'Default script';
      break;
  }
  return field;
}
