import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const resultStylish = fs.readFileSync(getFilePath('result.stylish.txt'), 'utf-8');
const resultPlain = fs.readFileSync(getFilePath('result.plain.txt'), 'utf-8');

const expectedData = {
  stylish: resultStylish.trim(),
  plain: resultPlain.trim(),
};

test('Stylish formatter', () => {
  const path1 = getFilePath('case.before.json');
  const path2 = getFilePath('case.after.json');
  const expected = expectedData.stylish;
  expect(genDiff(path1, path2, 'stylish')).toBe(expected);
});
test('Plain formatter', () => {
  const path1 = getFilePath('case.before.yml');
  const path2 = getFilePath('case.after.yml');
  const expected = expectedData.plain;
  expect(genDiff(path1, path2, 'plain')).toBe(expected);
});
test('Json formatter', () => {
  const path1 = getFilePath('case.before.yml');
  const path2 = getFilePath('case.after.json');
  const outputData = genDiff(path1, path2, 'json');
  expect(() => JSON.parse(outputData)).not.toThrow();
});
