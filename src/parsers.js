import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

function getParser(format) {
  switch (format) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.load;
    default:
      throw new Error('The file format is not supported.');
  }
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
