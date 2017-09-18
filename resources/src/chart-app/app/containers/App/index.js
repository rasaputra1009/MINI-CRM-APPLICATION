/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

import { Switch, Route } from 'react-router-dom';
import TableContainer from 'containers/TableContainer/Loadable';
import About from 'containers/About/Loadable';
import NotFoundPage from 'containers/NotFoundPage';
import MenuContainer from 'commons/containers/MenuContainer';
import './style.scss';

export default function App() {
  return (
    <div>
      <MenuContainer />
      <div style={{ background: 'green' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      <Switch>
        <Route exact path="/chart" component={TableContainer} />
        <Route path="/chart/about" component={About} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
  );
}
