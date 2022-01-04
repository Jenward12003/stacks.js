import { deepCopy } from '../src';

test('clones an array', () => {
  const empty: string[] = [];
  const cloned = deepCopy(empty);

  empty.push('original array');

  expect(empty.length).not.toEqual(cloned.length);
})

test('clones an Uint8Array', () => {
  const original = new Uint8Array([21, 31]);
  const cloned = deepCopy(original);

  cloned[0] = 50;

  expect(original).not.toEqual(cloned);
})

test('clones a nested array', () => {
  const original = [
    ['to be cloned']
  ];
  const cloned = deepCopy(original);

  original[0].push('original array');

  expect(original[0].length).not.toEqual(cloned[0].length);
})

test('clones an object', () => {
  const original: { name: string } = { name: 'original'};
  const cloned = deepCopy(original);

  cloned.name = 'clone';

  expect(original.name).not.toEqual(cloned.name);
})

test('clones a nested object', () => {
  const original: { nested: {
      name: 'original'
    } } = { nested: { name: 'original'} };
  const cloned = deepCopy(original);

  cloned.nested.name = 'clone';

  expect(original.nested.name).not.toEqual(cloned.nested.name);
})

test('clones a date object', () => {
  const original = new Date();
  const cloned = deepCopy(original);

  cloned.setFullYear(cloned.getFullYear() + 1);
  expect(original).not.toEqual(cloned);
})
