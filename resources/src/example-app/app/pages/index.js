import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import PublisherListingPage from 'pages/PublisherListingPage';
import EditPublisherPage from 'pages/EditPublisherPage';
import './styles.scss';

function Router({ match }) {
  return (
    <Switch>
      <Route path="/" component={PublisherListingPage} />
      <Route path="/edit" component={EditPublisherPage} />
    </Switch>
  );
}

Router.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Router;
