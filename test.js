import test from 'ava';
import isoConv from './index';

test('throw exception if no or invalid argument', t => {
  t.throws(() => isoConv(), 'isoConv requires a string as first argument');
  t.throws(() => isoConv(''), 'isoConv requires a string as first argument');
  t.throws(() => isoConv(23), 'isoConv requires a string as first argument');
  t.throws(() => isoConv([]), 'isoConv requires a string as first argument');
  t.throws(() => isoConv({}), 'isoConv requires a string as first argument');
});

test('Default: From iso guessed to label', t => {
  t.is(isoConv('ita'), 'Italian');
  t.is(isoConv('it'), 'Italian');
  t.is(isoConv('Italian'), 'it');
});

test('From a specified ISO to label', t => {
  t.is(isoConv('it', {from:1}), 'Italian');
  t.is(isoConv('ita', {from:2}), 'Italian');
  t.is(isoConv('ita', {from:3}), 'Italian');
  t.is(isoConv('ita', {from:4}), 'Italian');
  t.is(isoConv('ita', {from:5}), 'Italian');
  t.is(isoConv('Italian', {form: 'label'}), 'it');
});

test('From a bad specified ISO to label', t => {
  t.throws(() => isoConv('ita', {from: '23a'}), '"from" option invalid');
});

test('From iso guessed to a specified ISO', t => {
  t.is(isoConv('ita', {to: 1}), 'it');
  t.is(isoConv('ita', {to: 2}), 'ita');
  t.is(isoConv('ita', {to: 3}), 'ita');
  t.is(isoConv('Italian', {to: 1}), 'it');
  t.is(isoConv('Italian', {to: 2}), 'ita');
  t.is(isoConv('Italian', {to: 3}), 'ita');
  t.is(isoConv('it', {to: 1}), 'it');
  t.is(isoConv('it', {to: 2}), 'ita');
  t.is(isoConv('it', {to: 3}), 'ita');
});

test('From something to a bad specified ISO', t => {
  t.throws(() => isoConv('ita', {to: '23a'}), '"to" option invalid');
});

test('Incorent "from" respect to input', t => {
  t.falsy(isoConv('ita', {from:1}));
  t.falsy(isoConv('it', {from:2}));
  t.falsy(isoConv('it', {from:3}));
  t.falsy(isoConv('it', {from:4}));
  t.falsy(isoConv('Italian', {from:5}));
  t.falsy(isoConv('it', {from: 'label'}));
});

test('Unfound value', t => {
  t.falsy(isoConv('ib', {from:1}));
  t.falsy(isoConv('ibl', {from:2}));
  t.falsy(isoConv('ibl', {from:3}));
  t.falsy(isoConv('ibl', {from:4}));
  t.falsy(isoConv('ibl', {from:5}));
  t.falsy(isoConv('Italiano', {from: 'label'}));
});

test('2 codes for the same ISO', t=>{
  t.is(isoConv('fra'), isoConv('fre'));
  t.is(isoConv('fr', {to: 5}), 'fra');
  t.is(isoConv('fre', {to: 1}), 'fr');
});

test('fallback for newest codes', t=>{
  t.falsy(isoConv('Judeo-Persian', {to: 1}));
  t.truthy(isoConv('Judeo-Persian', {to: 1, fallback: true}));
});
