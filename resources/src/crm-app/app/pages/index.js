/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from '../utils/api';

function Router({ match }) {
  return (
    <Switch>
      {routes.routes.map(route => (
        <Route key={route.url} path={route.url} component={route.component} />
      ))}
      <Redirect to="/crm/notfound" />
    </Switch>
  );
}

Router.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Router;
