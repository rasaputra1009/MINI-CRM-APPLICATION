const path = require('path');
const ls = require('./ls');
const { assets } = require('./paths.js');
const buildModule = require('./build.js');

function filterApps(files) {
  return files.filter((file) => /-app$/.test(file));
}

function toAbsolutePath(files) {
  return files.map((file) => path.resolve(assets, file));
}

function build(files) {
  return Promise.all(files.map((file) => buildModule(file)));
}

module.exports = function buildAll() {
  return ls(assets)
    .then(filterApps)
    .then(toAbsolutePath)
    .then(build);
};
