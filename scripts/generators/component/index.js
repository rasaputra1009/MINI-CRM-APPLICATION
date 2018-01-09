/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const mkdirp = require('mkdirp');
const componentExists = require('../utils/componentExists');
const apps = require('../../utils/listApps');
const { assets } = require('../../utils/paths');


module.exports = {
  description: 'Add an unconnected component',
  prompts: [{
    type: 'list',
    name: 'appName',
    message: 'Select the app for which you want to generate',
    default: 'commons',
    choices: () => apps,
  }, {
    type: 'list',
    name: 'type',
    message: 'Select the type of component',
    default: 'Stateless Function',
    choices: () => ['Stateless Function', 'React.PureComponent', 'React.Component'],
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Button',
    validate: (value, { appName }) => {
      if ((/.+/).test(value)) {
        return componentExists(appName, value) ? 'A component or container with this name already exists' : true;
      }

      return 'The name is required';
    },
  }, {
    type: 'confirm',
    name: 'wantLoadable',
    default: false,
    message: 'Do you want to load the component asynchronously?',
  }],
  actions: (data) => {
    // Generate index.js and index.test.js
    let componentTemplate;

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './component/stateless.js.hbs';
        break;
      }
      default: {
        componentTemplate = './component/class.js.hbs';
      }
    }

    const actions = [{
      type: 'add',
      path: `${assets}/${data.appName}/app/components/{{properCase name}}/index.js`,
      templateFile: componentTemplate,
      abortOnFail: true,
    }, {
      type: 'add',
      path: `${assets}/${data.appName}/app/components/{{properCase name}}/tests/index.test.js`,
      templateFile: './component/test.js.hbs',
      abortOnFail: true,
    }];

    mkdirp.sync(`${assets}/${data.appName}/app/components/`);
    // If want Loadable.js to load the component asynchronously
    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: `${assets}/${data.appName}/app/components/{{properCase name}}/Loadable.js`,
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
