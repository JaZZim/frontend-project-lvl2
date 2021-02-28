import _ from 'lodash';

const singleIndent = 4;

function getIndent(depth, prefixSize) {
  const countSpace = depth * singleIndent - prefixSize;
  return ' '.repeat(countSpace);
}

const toString = (node, level) => {
  if (_.isPlainObject(node)) {
    const currentIndent = getIndent(level + 1, 0);
    const bracketIndent = getIndent(level, 0);
    const result = Object.entries(node).map(([key, value]) => (
      `${currentIndent}${key}: ${toString(value, level + 1)}`
    ));
    return ['{', ...result, `${bracketIndent}}`].join('\n');
  }
  if (Array.isArray(node)) {
    return `[${node.join(', ')}]`;
  }
  return node;
};

export default function formatToStylish(astTree) {
  const iter = (node, level) => {
    const bracketIndent = getIndent(level - 1, 0);
    const lines = node.flatMap((line) => {
      const { key, type, value } = line;
      switch (type) {
        case 'nested':
          return `${getIndent(level, 0)}${key}: ${iter(line.children, level + 1)}`;
        case 'changed':
          return [
            `${getIndent(level, 2)}- ${key}: ${toString(value.valueBefore, level)}`,
            `${getIndent(level, 2)}+ ${key}: ${toString(value.valueAfter, level)}`,
          ];
        case 'added':
          return `${getIndent(level, 2)}+ ${key}: ${toString(value, level)}`;
        case 'removed':
          return `${getIndent(level, 2)}- ${key}: ${toString(value, level)}`;
        case 'unchanged':
          return `${getIndent(level, 0)}${key}: ${toString(value, level)}`;
        default:
          throw new Error('In AST tree the type of change is incorrect');
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
