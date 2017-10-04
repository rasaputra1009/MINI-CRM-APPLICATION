const camelCase = require('../../utils/camelCase');

module.exports = [
  {
    name: 'appName',
    message: 'What should the app be called?',
    validate(value) {
      return /\S/.test(value) || 'Invalid name';
    },
  }, {
    name: 'wantPhpModule',
    type: 'confirm',
    message: 'Should php module be created?',
    default: true,
  }, {
    name: 'phpModuleName',
    message: 'What should it be named',
    when({ wantPhpModule }) {
      return wantPhpModule;
    },
    default({ appName }) {
      return camelCase(appName.replace(/-app$/, ''));
    },
  },
];
