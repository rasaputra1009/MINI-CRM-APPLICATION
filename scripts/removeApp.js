const rimraf = require('rimraf');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const apps = require('./utils/listApps');
const camelCase = require('./utils/camelCase');
const { assets, phpModulesPath } = require('./utils/paths');

const phpModuleName = (jsAppName) => {
  const appName = jsAppName.replace(/-app$/, '');
  return camelCase(appName);
};

const phpPath = (jsAppName) => path.join(phpModulesPath, phpModuleName(jsAppName));

inquirer.prompt([
  {
    name: 'component',
    message: 'Select which app to remove',
    type: 'list',
    choices: apps.filter((app) => app !== 'common'),
  },
  {
    type: 'confirm',
    name: 'removePhp',
    message: ({ component }) => `Found a corresponding php app. Remove ${phpModuleName(component)} (${phpPath(component)})?`,
    default: true,
    when({ component }) {
      try {
        fs.accessSync(phpPath(component));
        return true;
      } catch (e) {
        // Do nothing
      }

      return false;
    },
  },
]).then(({ component, removePhp }) => {
  const appPath = path.join(assets, component);
  rimraf.sync(appPath);

  if (removePhp) {
    rimraf.sync(phpPath(component));
  }

  console.log(`${chalk.green('\u2714')} All done`);
});
