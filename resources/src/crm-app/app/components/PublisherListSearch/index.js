/* eslint-disable no-unused-vars */
/**
 *
 * PublisherListSearch
 *
 */

import React from 'react';
import './style.scss';
import { createStructuredSelector } from 'reselect';
import {
  updateSearch,
  updateFilter,
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
  const selectAttribute = e => {
    dispatch(updateFilter(e.target.value));
  };
  return (
    <div className="publisherSearch">
      <label htmlFor="attribute" className="search">
        Search by:
      </label>
      <select
        name="attribute"
        id="attribute"
        onChange={selectAttribute}
        className="dropdown-select"
      >
        <option value="name">Name</option>
        <option value="email">Email Id</option>
        <option value="phone">Phone</option>
        <option value="website">Website</option>
        <option value="assigned_to">Assigned User</option>
      </select>
      <select
        name="attribute"
        id="attribute"
        onChange={selectAttribute}
        className="dropdown-assigned"
      >
        <option>Assigned_to</option>
        <option value="assigned_to">Usertwo</option>
        <option value="assigned_to">Userthree</option>
        <option value="assigned_to">Userfour</option>
        <option value="assigned_to">Userfive</option>
      </select>
      <input type="search" placeholder="Search Here" onChange={changeSearch} />
    </div>
  );
}
export default PublisherListSearch;

PublisherListSearch.propTypes = {};
