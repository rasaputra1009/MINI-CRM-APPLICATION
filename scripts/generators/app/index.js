const path = require('path');
const inquirer = require('inquirer');
const rimraf = require('rimraf');
const chalk = require('chalk');
const { build, load } = require('hb-setup');
const { promisify } = require('util');

const createAppJsFile = require('./createAppJsFile');
const questions = require('./questions');
const normalizeAppName = require('./normalizeAppName');
const copyStub = require('./copyStub');
const addScriptTagInBlade = require('./addScriptTagInBlade');

const { assets } = require('../../utils/paths');
const spawn = require('../../utils/spawnPromise');

const boilerplateUrl = 'https://github.com/vinitkadam/react-boilerplate';

const gitClone = dest =>
  spawn('git', ['clone', '--depth=1', boilerplateUrl, dest]);
const removeGitDirectory = dest => promisify(rimraf)(path.join(dest, '.git'));
const createPhpModule = name =>
  spawn('php', ['artisan', 'module:make', name], { stdio: 'inherit' });

function createApp({ appName, dest, wantPhpModule, phpModuleName }) {
  console.log(
    chalk.cyan(`Creating app ${chalk.green(appName)} at ${chalk.green(dest)}`),
  );

  return gitClone(dest)
    .then(() => removeGitDirectory(dest))
    .then(() => createAppJsFile({ appName, dest }))
    .then(() =>
      copyStub({
        stub: 'webpack_config.stub',
        path: dest,
        name: 'webpack.config.js',
      }),
    )
    .then(() =>
      copyStub({ stub: 'eslint.stub', path: dest, name: '.eslintrc.js' }),
    )
    .then(() => load({ path: dest }))
    .then(() => build({ command: 'yarn dev', path: dest }))
    .then(() => wantPhpModule && createPhpModule(phpModuleName))
    .then(() => wantPhpModule && addScriptTagInBlade(phpModuleName, appName))
    .then(() => console.log('All done!'))
    .catch(
      error => console.log(error) || console.error(chalk.red(error.message)),
    );
}

inquirer
  .prompt(questions)
  .then(({ appName, ...rest }) => {
    const dest = path.resolve(assets, normalizeAppName(appName));
    return { appName, dest, ...rest };
  })
  .then(createApp);
