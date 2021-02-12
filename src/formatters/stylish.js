import _ from 'lodash';

const singleIndent = 4;

function getIndent(depth, type = 'unchanged') {
  const countSpace = depth * singleIndent;
  const prefix = {
    added: '+ ',
    removed: '- ',
    unchanged: '',
  };
  return prefix[type].padStart(countSpace);
}

const toString = (node, level) => {
  if (_.isPlainObject(node)) {
    const currentIndent = getIndent(level + 1);
    const bracketIndent = getIndent(level);
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
    const bracketIndent = getIndent(level - 1);
    const lines = node.flatMap((item) => {
      const { key, type, value } = item;
      switch (type) {
        case 'nested':
          return `${getIndent(level)}${key}: ${iter(item.children, level + 1)}`;
        case 'changed':
          return [
            `${getIndent(level, 'removed')}${key}: ${toString(value.valueBefore, level)}`,
            `${getIndent(level, 'added')}${key}: ${toString(value.valueAfter, level)}`,
          ];
        default:
          return `${getIndent(level, type)}${key}: ${toString(value, level)}`;
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
