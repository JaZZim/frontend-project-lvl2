import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFilePath = (filename) => path.join(__dirname, '../test_files', filename);

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('JSON. Primitive structure', () => {
  const path1 = getFilePath('plain1.json');
  const path2 = getFilePath('plain2.json');
  const wrongPath = getFilePath('wrong_path.json');
  expect(genDiff(path1, path2)).toBe(expected);
  expect(() => genDiff(path1, wrongPath)).toThrow();
});
