/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');
const apps = require('../../utils/listApps');
const { assets } = require('../../utils/paths');

module.exports = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'list',
      name: 'appName',
      message: 'Select the app for which you want to generate',
      default: 'commons',
      choices: () => apps,
    }, {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'memo',
      default: false,
      message: 'Do you want to wrap your component in React.memo?',
    },
    {
      type: 'confirm',
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?',
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message:
        'Do you want an actions/constants/selectors/reducer tuple for this container?',
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: 'Do you want to load resources asynchronously?',
    },
  ],
  actions: (data) => {
    const actions = [
      {
        type: 'add',
        path: `${assets}/${data.appName}/app/containers/{{properCase name}}/index.js`,
        templateFile: './container/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${assets}/${data.appName}/app/containers/{{properCase name}}/tests/index.test.js`,
        templateFile: './container/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If they want actions and a reducer, generate the slice,
    // the selectors and the corresponding tests
    if (data.wantActionsAndReducer) {
      // Selectors
      actions.push({
        type: 'add',
        path: `${assets}/${data.appName}/app/containers/{{properCase name}}/selectors.js`,
        templateFile: './container/selectors.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path:
          `${assets}/${data.appName}/app/containers/{{properCase name}}/tests/selectors.test.js`,
        templateFile: './container/selectors.test.js.hbs',
        abortOnFail: true,
      });

      // Slice
      actions.push({
        type: 'add',
        path: `${assets}/${data.appName}/app/containers/{{properCase name}}/slice.js`,
        templateFile: './container/slice.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: `${assets}/${data.appName}/app/containers/{{properCase name}}/tests/slice.test.js`,
        templateFile: './container/slice.test.js.hbs',
        abortOnFail: true,
      });
    }

    // Sagas
    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path: `${assets}/${data.appName}/app/containers/{{properCase name}}/saga.js`,
        templateFile: './container/saga.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: `${assets}/${data.appName}/app/containers/{{properCase name}}/tests/saga.test.js`,
        templateFile: './container/saga.test.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: `${assets}/${data.appName}/app/containers/{{properCase name}}/Loadable.js`,
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: `${assets}/${data.appName}/containers/`,
    });

    return actions;
  },
};
