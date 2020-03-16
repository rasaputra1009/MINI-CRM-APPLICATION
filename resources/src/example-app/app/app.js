import 'babel-polyfill'; // eslint-disable-line

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App'; // eslint-disable-line

// Load the favicon, the manifest.json file and the .htaccess file

import configureStore from './configureStore';

// Create redux store with history
const initialState = Immutable.Map();
const history = createBrowserHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
