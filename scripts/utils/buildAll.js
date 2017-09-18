const path = require('path');
const ls = require('./ls');
const { assets } = require('./paths');
const build = require('./build');
const isProduction = process.argv.includes('--production');

function filterApps(files) {
  return files.filter((file) => /-app$/.test(file) || file === 'common');
}

function toAbsolutePath(files) {
  return files.map((file) => path.resolve(assets, file));
}

function buildModule(files) {
  return Promise.all(files.map((file) => build(file, isProduction ? 'prod' : 'dev')));
}

module.exports = function buildAll() {
  return ls(assets)
    .then(filterApps)
    .then(toAbsolutePath)
    .then(buildModule);
};
