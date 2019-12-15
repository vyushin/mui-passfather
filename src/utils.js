import { PACKAGE_NAME, HELP_INFO, LOG_MESSAGE } from './constants';

function log(message, level = 'warn', subst = [], showHelp = true) {
  console[level].apply(console, [`[${PACKAGE_NAME}]: ${message} ${showHelp ? `\n${HELP_INFO}` : ''}`].concat(subst));
}

function omit(obj = {}, properties = [], exception = (key, value) => {}) {
  const result = {};
  Object.keys(obj).forEach(key => !properties.includes(key) ? (result[key] = obj[key]) : exception(key, obj[key]));
  return result;
}

export {
  log,
  omit,
};
