import iso from './iso';

export default function isoLanguageConverter(input, options = {}) {
  if (!input || typeof input != 'string')
    throw new Error('isoConv requires a string as first argument');

  let isoFrom = options.from ||
    ((input.length == 2) ? 1 : (input.length == 3) ? 5 : 'label');

  let isoTo = options.to || (isoFrom == 'label' ? 1 : 'label');

  let field = code2field(isoTo);
  if (!field) throw new Error('"to" option invalid');

  let result = find(input, isoFrom);

  if (!result) return null;

  return result[field];
}

function find(input, isoV) {
  let field = code2field(isoV);
  // console.log(isoV + ' --> '+field);
  if (!field) throw new Error('"from" option invalid');

  return iso.find((item) => (item[field] == input));
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
    default:
  }
  return field;
}
