import generateAst from './generateAst.js';
import parseFile from './parsers.js';
import stylish from './formatters/stylish.js';

export default function genDiff(pathFile1, pathFile2, typeFormatter = 'stylish') {
  const choiceFormatter = {
    stylish,
  };
  const obj1 = parseFile(pathFile1);
  const obj2 = parseFile(pathFile2);
  const astTree = generateAst(obj1, obj2);
  try {
    return choiceFormatter[typeFormatter](astTree);
  } catch (error) {
    throw new Error('Unknown output format.');
  }
}
