/**
 *
 * PublisherListing
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectPublisherListing from './selectors';
import { reducer } from './slice';
import saga from './saga';

const stateSelector = createStructuredSelector({
  publisherListing: makeSelectPublisherListing(),
});

function PublisherListing() {
  useInjectReducer({ key: 'publisherListing', reducer });
  useInjectSaga({ key: 'publisherListing', saga });

  /* eslint-disable no-unused-vars */
  const { publisherListing } = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */

  return (
    <div>
      <Helmet>
        <title>PublisherListing</title>
        <meta name="description" content="Description of PublisherListing" />
      </Helmet>
    </div>
  );
}

PublisherListing.propTypes = {};

export default PublisherListing;
