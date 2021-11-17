import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'commons/utils/history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App'; // eslint-disable-line

import { HelmetProvider } from 'react-helmet-async';
import configureStore from './configureStore';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <HelmetProvider>
          <Route path="/crm" component={App} />
        </HelmetProvider>
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  );
};

render();
