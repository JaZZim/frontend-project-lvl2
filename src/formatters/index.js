import has from '../utils.js';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

export default function render(astTree, type) {
  if (!has(formatters, type)) {
    throw new Error('Unknown output format.');
  }
  return formatters[type](astTree);
}
