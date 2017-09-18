const git = require('nodegit');
const path = require('path');
const inquirer = require('inquirer');
const rimraf = require('rimraf');

const createEslintConfig = require('./createEslintConfig');
const yarnInstall = require('../../utils/yarnInstall');
const build = require('../../utils/build');
const { assets } = require('../../utils/paths');

const normalizeAppName = (name) => /-app$/.test(name) ? name : `${name}-app`;

const boilerplateUrl = 'https://github.com/rohan-ka/react-boilerplate.git';

function removeGitDirectory(dest) {
  return new Promise(((res) => {
    rimraf(path.join(dest, '.git'), res);
  }));
}

function createApp(appName, dest) {
  console.log(`Creating app ${appName} at ${dest}`); // eslint-disable-line no-console
  return git.Clone(boilerplateUrl, dest)
    .then(() => yarnInstall(dest))
    .then(() => removeGitDirectory(dest))
    .then(() => createEslintConfig(dest))
    .then(() => build(dest))
    .then(() => console.log('All done!')); // eslint-disable-line no-console
}


inquirer.prompt([{
  name: 'appName',
  message: 'What should the app be called?',
  validate(value) {
    return /\S/.test(value) || 'Invalid name';
  },
}])
  .then(({ appName }) => {
    const dest = path.resolve(assets, normalizeAppName(appName));
    return { appName, dest };
  })
  .then(({ appName, dest }) => createApp(appName, dest))
  .catch(console.log); // eslint-disable-line no-console
