const path = require('path');
const appExists = require('./appExists');
const normalizeAppName = require('./normalizeAppName');
const camelCase = require('../../utils/camelCase');
const { assets } = require('../../utils/paths');

module.exports = [
  {
    name: 'appName',
    message: 'What should the app be called?',
    validate(value) {
      const app = path.resolve(assets, normalizeAppName(value));
      if (appExists(app)) {
        return `${value} already exists`;
      }
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
