# iso-language-converter [![Build Status][travis-image]][travis-url]

Converter between different ISO 639 language tags.

The list of codes is taken by [Wikipedia](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes).

## Install

```sh
npm install --save iso-language-converter
```

## Usage

```js
var isoConv = require('iso-language-converter');

isoConv('ita'); // Italian
isoConv('it'); // Italian
isoConv('Italian'); // it

isoConv('it', {form: 1, to: 'label'}); // Italian
isoConv('ita', {form: 2, to: 1}); // it

isoConv('it', {to: 'label'}); // Italian
isoConv('ita', {to: 1}); // it
```

## API

### isoConv(input, [options])

#### input

Type: `string`

The code of the language in one of the ISO 639 form _-or-_ the English name for the language.

#### options

Type: `object`

Options for the converter:

```js
{
  // number of ISO 639 from 1 to 5, or 'label'
  // if not specified, guess on the input
  from: 1,
  
  // number of ISO 639 from 1 to 5, or 'label'
  // if not specified, guess on the input
  to: 'label'
}
```

## License

MIT

[travis-url]: https://travis-ci.org/pasqLisena/iso-language-converter
[travis-image]: https://travis-ci.org/pasqLisena/iso-language-converter.svg?branch=master
