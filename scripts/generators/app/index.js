const path = require('path');
const inquirer = require('inquirer');
const rimraf = require('rimraf');
const fs = require('fs');

const createEslintConfig = require('./createEslintConfig');
const createAppJsFile = require('./createAppJsFile');
const questions = require('./questions');
const yarnInstall = require('../../utils/yarnInstall');
const build = require('../../utils/build');
const cp = require('../../utils/cp');
const { assets, publicPath, defaultBuildPath, phpModulesPath } = require('../../utils/paths');
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

function createPhpModule(name) {
  return spawn('php', ['artisan', 'module:make', name], { stdio: 'inherit' });
}

function addScriptTagInView(phpModuleName, appName) {
  const scriptTag = `<script src="{{normalize_chunks('/${path.relative(publicPath, defaultBuildPath)}/${appName}-app/main.js')}}"></script>`;
  const rootTag = '<div id=\'app\'></div>';
  const bladeFile = path.resolve(phpModulesPath, phpModuleName, 'Views/index.blade.php');

  fs.readFile(bladeFile, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const lines = data.toString().split('\n');
    const closingBodyTagIndex = lines.findIndex((line) => /<\/body>/.test(line));
    const linesWithScriptTag = [
      ...lines.slice(0, closingBodyTagIndex),
      rootTag,
      scriptTag,
      ...lines.slice(closingBodyTagIndex),
    ];

    fs.writeFile(bladeFile, linesWithScriptTag.join('\n'), (error) => error && console.error(error));
  });
}

function createApp({ appName, dest, wantPhpModule, phpModuleName }) {
  console.log(`Creating app ${appName} at ${dest}`);
  return gitClone(dest)
    .then(() => removeGitDirectory(dest))
    .then(() => createAppJsFile({ appName, dest }))
    .then(() => createWebpackConfig(dest))
    .then(() => createEslintConfig(dest))
    .then(() => yarnInstall(dest))
    .then(() => build(dest))
    .then(() => wantPhpModule && createPhpModule(phpModuleName))
    .then(() => wantPhpModule && addScriptTagInView(phpModuleName, appName))
    .then(() => console.log('All done!'));
}

inquirer.prompt(questions)
  .then(({ appName, ...rest }) => {
    const dest = path.resolve(assets, normalizeAppName(appName));
    return { appName, dest, ...rest };
  })
  .then(createApp)
  .catch(console.log);
