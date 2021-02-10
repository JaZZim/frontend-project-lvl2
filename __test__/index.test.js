import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFilePath = (filename) => path.join(__dirname, '../__fixtures__', filename);

const expectedData = { plain: [] };

beforeAll(() => {
  const plainResult = fs.readFileSync(getFilePath('plain.result.txt'), 'utf-8');
  expectedData.plain = plainResult.trim().split('\n\n\n');
});

describe.each([0, 1])('Primitive structure. Case - %#', (index) => {
  test('JSON format', () => {
    const path1 = getFilePath(`plain/case${index}.before.json`);
    const path2 = getFilePath(`plain/case${index}.after.json`);
    const expected = expectedData.plain[index];
    expect(genDiff(path1, path2)).toBe(expected);
  });
});
