/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import PublisherListingPage from 'pages/PublisherListingPage';
import EditPublisherPage from 'pages/EditPublisherPage';
import CreateCustomerPage from 'pages/CreateCustomerPage';
import LoginPage from 'pages/LoginPage';
import './style.scss';
import Form from 'containers/Form';
import NotFound from './NotFoundPage';

function Router({ match }) {
  return (
    <Switch>
      <Route path="/crm/home" component={PublisherListingPage} />
      <Route path="/crm/create" component={CreateCustomerPage} />
      <Route path="/crm/edit/:id" component={CreateCustomerPage} />
      <Route path="/crm/login" component={LoginPage} />
      <Route path="/crm/details/:id" component={Form} />
      <Route path="/crm/notfound" component={NotFound} />
    </Switch>
  );
}

Router.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Router;
