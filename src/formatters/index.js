import has from '../utils.js';
import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
};

export default function getFormatter(type) {
  if (!has(formatters, type)) {
    throw new Error('Unknown output format.');
  }
  return formatters[type];
}
