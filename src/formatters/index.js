import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

export default function format(astTree, type) {
  if (!_.has(formatters, type)) {
    throw new Error('Unknown output format.');
  }
  return formatters[type](astTree);
}
