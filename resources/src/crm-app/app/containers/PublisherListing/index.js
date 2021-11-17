/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/button-has-type */
/**
 *
 * PublisherListing
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Link } from 'react-router-dom';
// import { loadUsers } from 'containers/Form/slice';
import {
  makeSelectPublishers,
  makeSelectSearchPublishers,
  makeSelectUserRole,
  makeSelectUser,
} from './selectors';
import {
  reducer,
  searchPublishers,
  deletePublisher,
  loadUserInfoSuccess,
  loadUsers,
} from './slice';
import saga from './saga';
import './style.scss';

const stateSelector = createStructuredSelector({
  publisherListing: makeSelectPublishers(),
  searchpublisherslist: makeSelectSearchPublishers(),
  userrole: makeSelectUserRole(),
  user: makeSelectUser(),
});

function PublisherListing() {
  useInjectReducer({ key: 'publisherListing', reducer });
  useInjectSaga({ key: 'publisherListing', saga });

  /* eslint-disable no-unused-vars */
  const {
    publisherListing,
    searchpublisherslist,
    userrole,
    user,
  } = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */

  const getCookie = payload => {
    payload = payload.split('; ');
    const result = {};
    for (const i in payload) {
      const cur = payload[i].split('=');
      result[cur[0]] = cur[1];
    }
    return result;
  };

  useEffect(() => {
    const data = getCookie(document.cookie);
    dispatch(loadUsers());
    dispatch(loadUserInfoSuccess(data));
    dispatch(searchPublishers()); // load all publishers
  }, []);
  const removePublisher = id => {
    dispatch(deletePublisher(id));
    dispatch(searchPublishers());
  };
  return (
    <div className="section">
      <table>
        <thead className="thead">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Assigned_to</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {searchpublisherslist.map(item => (
            <tr>
              <Link
                to={{
                  pathname: `/crm/details/${item.id}`,
                }}
                className="name"
              >
                <td>{item.name}</td>
              </Link>
              <td className="email">{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.website}</td>
              <td>{item.assigned_to}</td>
              <Link
                to={{
                  pathname: `/crm/edit/${item.id}`,
                }}
              >
                <td>
                  {userrole === 'salesrep' ? (
                    <button
                      disabled={!(item.assigned_to === user)}
                      className="edit"
                    >
                      Edit
                    </button>
                  ) : (
                    <button className="edit">Edit</button>
                  )}
                </td>
              </Link>
              <td>
                <button
                  onClick={() => removePublisher(item.id)}
                  disabled={!(userrole === 'admin')}
                  className="delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

PublisherListing.propTypes = {};

export default PublisherListing;
