import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFilePath = (filename) => path.join(__dirname, '../__fixtures__', filename);

let expectedData = [];

beforeAll(() => {
  const result = fs.readFileSync(getFilePath('result.txt'), 'utf-8');
  expectedData = result.trim().split('\n\n\n');
});

describe.each([
  [0, 'Primitive'],
  [1, 'Nested'],
])('Case - %i, %s structure', (index) => {
  test('JSON format', () => {
    const path1 = getFilePath(`case${index}.before.json`);
    const path2 = getFilePath(`case${index}.after.json`);
    const expected = expectedData[index];
    expect(genDiff(path1, path2)).toBe(expected);
  });
  test('YAML format', () => {
    const path1 = getFilePath(`case${index}.before.yml`);
    const path2 = getFilePath(`case${index}.after.yml`);
    const expected = expectedData[index];
    expect(genDiff(path1, path2)).toBe(expected);
  });
});
