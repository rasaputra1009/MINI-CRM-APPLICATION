/**
 *
 * App.js
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';

import Router from 'pages';
import './reset.scss';

function App({ match }) {
  return (
    <div>
      <Router match={match} />;
    </div>
  );
}

App.propTypes = {
  match: PropTypes.object.isRequired,
};

export default hot(App);
