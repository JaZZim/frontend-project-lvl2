import _ from 'lodash';

export default function generateAst(obj1, obj2) {
  const uniqueKeys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(uniqueKeys);
  return sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key, type: 'nested', children: generateAst(value1, value2),
      };
    }
    if (!_.has(obj1, key)) {
      return {
        key, type: 'added', value: value2,
      };
    }
    if (!_.has(obj2, key)) {
      return {
        key, type: 'removed', value: value1,
      };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        key, type: 'changed', value: { valueBefore: value1, valueAfter: value2 },
      };
    }
    return {
      key, type: 'unchanged', value: value1,
    };
  });
}
