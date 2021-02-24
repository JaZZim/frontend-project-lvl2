import _ from 'lodash';

export default function generateAst(objBefore, objAfter) {
  const uniqueKeys = Object.keys({ ...objBefore, ...objAfter });
  const sortedKeys = _.sortBy(uniqueKeys);
  return sortedKeys.map((key) => {
    const valueBefore = objBefore[key];
    const valueAfter = objAfter[key];
    if (_.isPlainObject(valueBefore) && _.isPlainObject(valueAfter)) {
      return {
        key, type: 'nested', children: generateAst(valueBefore, valueAfter),
      };
    }
    if (!_.has(objBefore, key)) {
      return {
        key, type: 'added', value: valueAfter,
      };
    }
    if (!_.has(objAfter, key)) {
      return {
        key, type: 'removed', value: valueBefore,
      };
    }
    if (!_.isEqual(valueBefore, valueAfter)) {
      return {
        key, type: 'changed', value: { valueBefore, valueAfter },
      };
    }
    return {
      key, type: 'unchanged', value: valueBefore,
    };
  });
}
