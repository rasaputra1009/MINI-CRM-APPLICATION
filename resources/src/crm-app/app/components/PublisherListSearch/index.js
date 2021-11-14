/* eslint-disable no-unused-vars */
/**
 *
 * PublisherListSearch
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './style.scss';
import { createStructuredSelector } from 'reselect';
import {
  updateSearch,
  searchPublishers,
} from 'containers/PublisherListing/slice';
import {
  makeSelectPublishers,
  makeSelectSearch,
  makeSelectSearchPublishers,
} from 'containers/PublisherListing/selectors';
import { useDispatch, useSelector } from 'react-redux';
const stateSelector = createStructuredSelector({
  publisherListing: makeSelectPublishers(),
  search: makeSelectSearch(),
});

function PublisherListSearch() {
  const dispatch = useDispatch();
  const { publisherListing, search } = useSelector(stateSelector);
  const changeSearch = e => {
    dispatch(updateSearch(e.target.value));
    dispatch(searchPublishers());
  };
  return (
    <div className="publisherSearch">
      <input type="text" placeholder="Search by name" onChange={changeSearch} />
    </div>
  );
}
export default PublisherListSearch;

PublisherListSearch.propTypes = {};
