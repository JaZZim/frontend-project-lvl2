import _ from 'lodash';

function toString(data) {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
}

export default function formatToPlain(astTree) {
  const iter = (node, path) => node.reduce((acc, item) => {
    const { key, type, value } = item;
    const newPath = [...path, key];
    const pathString = newPath.join('.');
    switch (type) {
      case 'added':
        return [...acc, `Property '${pathString}' was added with value: ${toString(value)}`];
      case 'removed':
        return [...acc, `Property '${pathString}' was removed`];
      case 'changed':
        return [
          ...acc,
          `Property '${pathString}' was updated. From ${toString(value.value1)} to ${toString(value.value2)}`,
        ];
      case 'nested':
        return [...acc, ...iter(item.children, newPath)];
      case 'unchanged':
        return acc;
      default:
        throw new Error(`Plain formatter: '${type}' - unknown format of changes`);
    }
  }, []);
  return iter(astTree, []).join('\n');
}
