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
import Axios from 'axios';
import { makeSelectPublishers, makeSelectSearchPublishers } from './selectors';
import { loadPublishers, reducer, searchPublishers } from './slice';
import saga from './saga';
import './style.scss';

const stateSelector = createStructuredSelector({
  publisherListing: makeSelectPublishers(),
  searchpublisherslist: makeSelectSearchPublishers(),
});

function PublisherListing() {
  useInjectReducer({ key: 'publisherListing', reducer });
  useInjectSaga({ key: 'publisherListing', saga });

  /* eslint-disable no-unused-vars */
  const { publisherListing, searchpublisherslist } = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */
  useEffect(() => {
    dispatch(loadPublishers()); // load all users
    dispatch(searchPublishers()); // load all publishers
  }, []);

  function removePublisher(id) {
    Axios.delete(`/api/crm/publisher/${id}`);
    dispatch(loadPublishers());
  }
  return (
    <div className="section">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Assigned_to</th>
          </tr>
        </thead>
        <tbody>
          {searchpublisherslist.map(item => (
            <tr>
              <Link
                to={{
                  pathname: `/crm/details/${item.id}`,
                }}
              >
                <td>{item.name}</td>
              </Link>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.website}</td>
              <td>{item.assigned_to}</td>
              <Link
                to={{
                  pathname: `/crm/edit/${item.id}`,
                }}
              >
                <td>
                  <button>Edit</button>
                </td>
              </Link>
              <td>
                <button onClick={() => removePublisher(item.id)}>Delete</button>
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
