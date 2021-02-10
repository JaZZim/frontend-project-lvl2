import fs from 'fs';
import path from 'path';
import process from 'process';
import sortBy from 'lodash/sortBy.js';

function parseFile(pathToFile) {
  const currentPath = process.cwd();
  const fullPathToFile = path.resolve(currentPath, pathToFile);
  const fileContent = fs.readFileSync(fullPathToFile, { encoding: 'utf-8' });
  const objectFromJson = JSON.parse(fileContent);
  return objectFromJson;
}

// function generateStringOfChange(key, value, level, change = 'unchanged') {
//   const prefix = {
//     add: '+ ',
//     remove: '- ',
//     unchanged: '  ',
//   };
//   return `${'  '.repeat(level)}${prefix[change]}${key}: ${value}`;
// }

export default function genDiff(pathFile1, pathFile2) {
  const obj1 = parseFile(pathFile1);
  const obj2 = parseFile(pathFile2);
  const sortedAllKeys = sortBy(Object.keys({ ...obj1, ...obj2 }));
  const result = sortedAllKeys.reduce((acc, key) => {
    if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
      return [...acc, `  + ${key}: ${obj2[key]}`];
    }
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      return [...acc, `  - ${key}: ${obj1[key]}`];
    }
    if (obj1[key] !== obj2[key]) {
      return [...acc, `  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`];
    }
    return [...acc, `    ${key}: ${obj1[key]}`];
  }, []);
  return ['{', ...result, '}'].join('\n');
}
