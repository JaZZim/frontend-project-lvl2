import _ from 'lodash';

const singleIndent = 4;
const prefixSize = 2;

function toString(node, level) {
  if (_.isPlainObject(node)) {
    const indentSize = singleIndent * level;
    const currentIndent = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - singleIndent);
    const result = Object.entries(node).map(([key, value]) => (
      `${currentIndent}${key}: ${toString(value, level + 1)}`
    ));
    return ['{', ...result, `${bracketIndent}}`].join('\n');
  }
  if (Array.isArray(node)) {
    return `[${node.join(', ')}]`;
  }
  return node;
}

function formatToStylish(astTree) {
  const iter = (node, level) => {
    const indentSize = singleIndent * level - prefixSize;
    const currentIndent = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - prefixSize);
    const nextLevel = level + 1;
    const lines = node.flatMap((line) => {
      const { key, type, value } = line;
      switch (type) {
        case 'nested':
          return `${currentIndent}  ${key}: ${iter(line.children, nextLevel)}`;
        case 'changed':
          return [
            `${currentIndent}- ${key}: ${toString(value.value1, nextLevel)}`,
            `${currentIndent}+ ${key}: ${toString(value.value2, nextLevel)}`,
          ];
        case 'added':
          return `${currentIndent}+ ${key}: ${toString(value, nextLevel)}`;
        case 'removed':
          return `${currentIndent}- ${key}: ${toString(value, nextLevel)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${toString(value, nextLevel)}`;
        default:
          throw new Error(`Stylish formatter: '${type}' - unknown format of changes`);
      }
    });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(astTree, 1);
}

export default formatToStylish;
