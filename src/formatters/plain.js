import _ from 'lodash';

function toString(data) {
  if (_.isPlainObject(data) || Array.isArray(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
}

export default function formatToPlain(astTree) {
  const iter = (node, path) => {
    const result = node.reduce((acc, item) => {
      const { key, type, value } = item;
      const newPath = [...path, key];
      const pathString = newPath.join('.');
      switch (type) {
        case 'added':
          return [...acc, `Property '${pathString}' was added with value: ${toString(value)}`];
        case 'removed':
          return [...acc, `Property '${pathString}' was removed`];
        case 'changed':
          return [...acc, `Property '${pathString}' was updated. From ${toString(value.valueBefore)} to ${toString(value.valueAfter)}`];
        case 'nested':
          return [...acc, iter(item.children, newPath)];
        default:
          return acc;
      }
    }, []);
    return result.join('\n');
  };
  return iter(astTree, []);
}
