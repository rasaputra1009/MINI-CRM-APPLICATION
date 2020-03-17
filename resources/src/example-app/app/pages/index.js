import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'pages/HomePage/Loadable';
import NotFoundPage from 'pages/NotFoundPage/Loadable';

function Router({ match }) {
  return (
    <Switch>
      <Route exact path={match.url} component={HomePage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

Router.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Router;
