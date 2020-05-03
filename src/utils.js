import { PACKAGE_NAME, HELP_INFO, LOG_MESSAGE } from './constants';

const log = (message, level = 'warn', subst = [], showHelp = true) => {
  console[level].apply(console, [`[${PACKAGE_NAME}]: ${message} ${showHelp ? `\n${HELP_INFO}` : ''}`].concat(subst));
}

const omit = (obj = {}, properties = [], exception = (key, value) => {}) => {
  const result = {};
  Object.keys(obj).forEach(key => !properties.includes(key) ? (result[key] = obj[key]) : exception(key, obj[key]));
  return result;
}

const execCopyCommand = (input, onSuccess, onFailure) => {
  if (!document.queryCommandSupported('copy')) {
    onFailure();
    return;
  }
  try {
    const container = document.querySelector('body') || document.querySelector(':first-child');
    const shadowInput = document.createElement('input');
    shadowInput.type = 'text';
    shadowInput.value = input.value;
    container.appendChild(shadowInput);
    shadowInput.select();
    document.execCommand('copy');
    container.removeChild(shadowInput);
    onSuccess();
  } catch(e) {
    onFailure();
  }
}

const clipboardWrite = (input) => {
  return new Promise((resolve, reject) => {
    navigator.permissions && navigator.permissions.query({ name: 'clipboard-write' })
      .then(
        (result) => {
          if (result.state === 'granted' || result.state === 'prompt') {
            navigator.clipboard.writeText(input.value || '').then(() => resolve()).catch(e => reject());
          } else {
            execCopyCommand(input, resolve, reject);
          }
        },
        () => execCopyCommand(input, resolve, reject),
      );
    !navigator.permissions && execCopyCommand(input, resolve, reject);
  });
}

export {
  log,
  omit,
  clipboardWrite,
};
