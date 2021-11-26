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
  makeSelectUserRole,
} from 'containers/PublisherListing/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../commons/app/components/Input';
import Select from '../../../../commons/app/components/Select';
const stateSelector = createStructuredSelector({
  search: makeSelectSearch(),
  users: makeSelectUsers(),
  role: makeSelectUserRole(),
});

function PublisherListSearch() {
  const ACCOUNTMANAGER = 'account';
  const OPTIONS = ['name', 'email', 'phone', 'website'];
  const dispatch = useDispatch();
  const { search, users, role } = useSelector(stateSelector);
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
  const applyFilter = {
    label: null,
    type: 'text',
    placeholder: 'Search Here',
    disabled: false,
    value: null,
    change: changeSearch,
    error: '',
  };

  return (
    <div className="publisherSearch">
      <Select
        label={null}
        list={OPTIONS}
        filterBy="Search By"
        error={null}
        change={selectAttribute}
        disabled={false}
        className="dropdownSelect"
      />
      <Input {...applyFilter} className="searchFilter" />
      <Select
        label={null}
        list={users}
        filterBy="Select User"
        error={null}
        change={selectUser}
        disabled={false}
        className="dropdownAssigned"
      />
    </div>
  );
}
export default PublisherListSearch;
