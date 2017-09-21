const path = require('path');
const ls = require('./ls');
const chalk = require('chalk');
const { assets } = require('./paths');
const build = require('./build');

const isProduction = process.argv.includes('--production');

function filterApps(files) {
  return files.filter((file) => /-app$/.test(file) || file === 'common');
}

function toAbsolutePath(files) {
  return files.map((file) => ({ name: file, path: path.resolve(assets, file) }));
}

function reportStatus(results) {
  results.forEach(({ name, status }) => {
    if (status === 0) {
      console.log(`${chalk.green('\u2714')}   ${name} was successfully built`);
    } else {
      console.log(`${chalk.red('\u2717')} Error building ${name}`);
    }
  });
}

function buildModules(files) {
  return Promise.all(files.map(({ name, path: dest }) => new Promise((res) => {
    build(dest, isProduction ? 'prod' : 'dev').then((status) => res({ status, name, path: dest }));
  })));
}

module.exports = function buildAll() {
  return ls(assets)
    .then(filterApps)
    .then(toAbsolutePath)
    .then(buildModules)
    .then(reportStatus);
};
