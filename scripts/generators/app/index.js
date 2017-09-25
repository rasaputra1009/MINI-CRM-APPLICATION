const path = require('path');
const inquirer = require('inquirer');
const rimraf = require('rimraf');

const createEslintConfig = require('./createEslintConfig');
const yarnInstall = require('../../utils/yarnInstall');
const build = require('../../utils/build');
const cp = require('../../utils/cp');
const { assets } = require('../../utils/paths');
const spawn = require('../../utils/spawnPromise');

const normalizeAppName = (name) => /-app$/.test(name) ? name : `${name}-app`;

const boilerplateUrl = 'https://github.com/rohan-ka/react-boilerplate.git';

function gitClone(dest) {
  return spawn('git', ['clone', '--depth=1', boilerplateUrl, dest]);
}

function removeGitDirectory(dest) {
  return new Promise(((res) => {
    rimraf(path.join(dest, '.git'), res);
  }));
}

function createWebpackConfig(dest) {
  return cp(path.resolve(__dirname, '../stubs/webpack_config.stub'), path.resolve(dest, 'webpack.config.js'));
}

function createApp(appName, dest) {
  console.log(`Creating app ${appName} at ${dest}`);
  return gitClone(dest)
    .then(() => yarnInstall(dest))
    .then(() => removeGitDirectory(dest))
    .then(() => createWebpackConfig(dest))
    .then(() => createEslintConfig(dest))
    .then(() => build(dest))
    .then(() => console.log('All done!'));
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
  .catch(console.log);
