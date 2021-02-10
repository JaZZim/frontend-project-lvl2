import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

function getParser(format) {
  const map = {
    '.json': JSON.parse,
    '.yml': yaml.load,
  };
  if (!map[format]) {
    throw new Error('The file format is not supported.');
  }
  return map[format];
}

export default function parseFile(pathToFile) {
  const fileFormat = path.extname(pathToFile);
  const currentPath = process.cwd();
  const fullPathToFile = path.resolve(currentPath, pathToFile);
  const fileContent = fs.readFileSync(fullPathToFile, 'utf-8');
  const parse = getParser(fileFormat);
  const resultObject = parse(fileContent);
  return resultObject;
}
