/* eslint-disable import/no-cycle */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-destructuring */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import PublisherListTable from 'components/PublisherListTable';
import {
  makeSelectSearchPublishers,
  makeSelectUserRole,
  makeSelectUser,
  makeSelectLoading,
} from './selectors';
import { deletePublisher, reducer, loadUsers } from './slice';

import saga from './saga';
import './style.scss';

const stateSelector = createStructuredSelector({
  searchPublishersList: makeSelectSearchPublishers(),
  userrole: makeSelectUserRole(),
  user: makeSelectUser(),
  loading: makeSelectLoading(),
});

function PublisherListing() {
  const dispatch = useDispatch();
  useInjectReducer({ key: 'publisherListing', reducer });
  useInjectSaga({ key: 'publisherListing', saga });

  const { searchPublishersList, loading, user, userrole } = useSelector(
    stateSelector,
  );
  useEffect(() => {
    dispatch(loadUsers());
    // dispatch(loadUserInfoSuccess(window.userInfo));
  }, []);

  const removePublisher = id => {
    dispatch(deletePublisher(id));
  };

  const props = {
    searchPublishersList,
    user,
    role: userrole,
  };
  return (
    <div className="publishersList">
      {loading ? (
        <span className="loading">Loading...</span>
      ) : searchPublishersList.length === 0 ? (
        <span className="loading">No Data Found</span>
      ) : (
        <PublisherListTable {...props} removePublisher={removePublisher} />
      )}
    </div>
  );
}
export default PublisherListing;
