import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import PublisherListingPage from 'pages/PublisherListingPage';
import EditPublisherPage from 'pages/EditPublisherPage';
import './style.scss';

function Router({ match }) {
  return (
    <Switch>
      <Route path="/crm/home" component={PublisherListingPage} />
      <Route path="/crm/edit" component={EditPublisherPage} />
    </Switch>
  );
}

Router.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Router;
