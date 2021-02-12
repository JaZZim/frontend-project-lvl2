import _ from 'lodash';

const basicIndent = '  ';

function getPrefix(type) {
  switch (type) {
    case 'added':
      return '+';
    case 'removed':
      return '-';
    default:
      return ' ';
  }
}

const toString = (node, currentLevel) => {
  const iter = (currentNode, level, replacer) => {
    if (_.isPlainObject(currentNode)) {
      const currentIndent = replacer.repeat(level + 2);
      const bracketIndent = replacer.repeat(level);
      const result = Object.entries(currentNode).map(([key, value]) => (
        `${currentIndent}${key}: ${toString(value, level + 1)}`
      ));
      return ['{', ...result, `${bracketIndent}}`].join('\n');
    }
    if (Array.isArray(node)) {
      return `[${node.join(', ')}]`;
    }
    return node;
  };
  return iter(node, currentLevel + 1, basicIndent);
};

export default function stylish(astTree) {
  const iter = (node, level) => {
    const currentIndent = basicIndent.repeat(level);
    const bracketIndent = basicIndent.repeat(level - 1);
    const lines = node.flatMap((item) => {
      const { key, type } = item;
      switch (type) {
        case 'nested':
          return `${currentIndent}${getPrefix(type)} ${key}: ${iter(item.children, level + 2)}`;
        case 'changed':
          return [
            `${currentIndent}${getPrefix('removed')} ${key}: ${toString(item.value.valueBefore, level)}`,
            `${currentIndent}${getPrefix('added')} ${key}: ${toString(item.value.valueAfter, level)}`,
          ];
        default:
          return `${currentIndent}${getPrefix(type)} ${key}: ${toString(item.value, level)}`;
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
