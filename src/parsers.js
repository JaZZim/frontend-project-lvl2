import yaml from 'js-yaml';

function parse(format, data) {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error('The file format is not supported.');
  }
}

export default parse;
