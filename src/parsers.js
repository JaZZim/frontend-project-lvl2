import yaml from 'js-yaml';

function getParser(format) {
  switch (format) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.load;
    default:
      throw new Error('The file format is not supported.');
  }
}

export default getParser;
