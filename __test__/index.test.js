import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFilePath = (filename) => path.join(__dirname, '../__fixtures__', filename);

const expectedData = [];

beforeAll(() => {
  const result = fs.readFileSync(getFilePath('result.txt'), 'utf-8');
  expectedData.push(...result.trim().split('\n\n\n'));
});

describe.each([
  [0, 'stylish'],
  [1, 'plain'],
  [2, 'json'],
])('Case - %i, %s formatter', (index, format) => {
  test('JSON format', () => {
    const path1 = getFilePath('case.before.json');
    const path2 = getFilePath('case.after.json');
    const expected = expectedData[index];
    expect(genDiff(path1, path2, format)).toBe(expected);
  });
  test('YAML format', () => {
    const path1 = getFilePath('case.before.yml');
    const path2 = getFilePath('case.after.yml');
    const expected = expectedData[index];
    expect(genDiff(path1, path2, format)).toBe(expected);
  });
});
