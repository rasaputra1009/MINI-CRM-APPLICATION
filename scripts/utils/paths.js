const { resolve } = require('path');

const root = resolve(__dirname, '../..');

const assets = resolve(root, 'resources/src');

const publicPath = resolve(root, 'public');

const defaultBuildPath = resolve(publicPath, 'build');

const phpModulesPath = resolve(root, 'app/Modules');

module.exports = {
  root,
  assets,
  publicPath,
  phpModulesPath,
  defaultBuildPath,
};
