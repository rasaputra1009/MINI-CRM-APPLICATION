/**
 *
 * App.js
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';

import Router from 'pages';

function App({ match }) {
  return (
    <Router match={match} />
  );
}

App.propTypes = {
  match: PropTypes.object.isRequired,
};

export default hot(App);
