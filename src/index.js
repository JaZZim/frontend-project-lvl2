import generateAst from './generateAst.js';
import parseFile from './parsers.js';
import formatter from './formatters/index.js';

export default function genDiff(pathFile1, pathFile2, outputFormat = 'stylish') {
  const obj1 = parseFile(pathFile1);
  const obj2 = parseFile(pathFile2);
  const astTree = generateAst(obj1, obj2);
  return formatter(outputFormat)(astTree);
}
