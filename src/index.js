import fs from 'fs';
import path from 'path';
import process from 'process';
import generateAst from './generateAst.js';
import getParser from './parsers.js';
import format from './formatters/index.js';

function parseFile(pathToFile) {
  const fileFormat = path.extname(pathToFile);
  const currentPath = process.cwd();
  const fullPathToFile = path.resolve(currentPath, pathToFile);
  const fileContent = fs.readFileSync(fullPathToFile, 'utf-8');
  const parse = getParser(fileFormat);
  return parse(fileContent);
}

export default function genDiff(pathFile1, pathFile2, outputFormat = 'stylish') {
  const obj1 = parseFile(pathFile1);
  const obj2 = parseFile(pathFile2);
  const astTree = generateAst(obj1, obj2);
  return format(astTree, outputFormat);
}
