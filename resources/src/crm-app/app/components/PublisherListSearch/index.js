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
  updateAssigned,
} from 'containers/PublisherListing/slice';
import {
  makeSelectSearch,
  makeSelectSearchPublishers,
  makeSelectUsers,
} from 'containers/PublisherListing/selectors';
import { useDispatch, useSelector } from 'react-redux';
const stateSelector = createStructuredSelector({
  search: makeSelectSearch(),
  users: makeSelectUsers(),
});

function PublisherListSearch() {
  const dispatch = useDispatch();
  const {search, users } = useSelector(stateSelector);
  const selectAttribute = e => {
    dispatch(updateFilter(e.target.value));
  };
  const changeSearch = e => {
    dispatch(updateSearch(e.target.value));
    dispatch(searchPublishers());
  };
  const selectUser = e => {
    dispatch(updateAssigned(e.target.value));
    dispatch(searchPublishers());
  };
  return (
    <div className="publisherSearch">
      <select
        name="attribute"
        id="attribute"
        onChange={selectAttribute}
        className="dropdown-select"
      >
        <option value="name">Search By</option>
        <option value="name">Name</option>
        <option value="email">Email Id</option>
        <option value="phone">Phone</option>
        <option value="website">Website</option>
        <option value="assigned_to">Assigned User</option>
      </select>
      <input type="search" placeholder="Search Here" onChange={changeSearch} />
      <select
        name="attribute"
        className="dropdown-assigned"
        onChange={selectUser}
      >
        <option>None</option>
        {users.map(user => (
          <option value={user}>{user}</option>
        ))}
      </select>
    </div>
  );
}
export default PublisherListSearch;
