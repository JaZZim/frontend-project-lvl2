import { sortBy, isPlainObject, isEqual } from 'lodash';
import has from './utils.js';

export default function generateAst(objBefore, objAfter) {
  const mergerObject = { ...objBefore, ...objAfter };
  const sortedAllKeys = sortBy(Object.keys(mergerObject));
  const result = sortedAllKeys.map((key) => {
    const valueBefore = objBefore[key];
    const valueAfter = objAfter[key];
    if (isPlainObject(valueBefore) && isPlainObject(valueAfter)) {
      return {
        key, type: 'nested', children: generateAst(valueBefore, valueAfter),
      };
    }
    if (!has(objBefore, key)) {
      return {
        key, type: 'added', value: valueAfter,
      };
    }
    if (!has(objAfter, key)) {
      return {
        key, type: 'removed', value: valueBefore,
      };
    }
    if (!isEqual(valueBefore, valueAfter)) {
      return {
        key, type: 'changed', value: { valueBefore, valueAfter },
      };
    }
    return {
      key, type: 'unchanged', value: valueBefore,
    };
  });
  return result;
}
