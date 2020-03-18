/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'commons/utils/history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

import { HelmetProvider } from 'react-helmet-async';
import configureStore from './configureStore';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const ConnectedApp = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <HelmetProvider>
        <Route path="/" component={App} />
      </HelmetProvider>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<ConnectedApp />, MOUNT_NODE);
