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
import { makeSelectPublishers } from './selectors';
import { loadPublishers, reducer } from './slice';
import saga from './saga';
import './style.scss';

const stateSelector = createStructuredSelector({
  publisherListing: makeSelectPublishers(),
});

function PublisherListing() {
  useInjectReducer({ key: 'publisherListing', reducer });
  useInjectSaga({ key: 'publisherListing', saga });

  /* eslint-disable no-unused-vars */
  const { publisherListing } = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */
  useEffect(() => {
    dispatch(loadPublishers());
  }, []);
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
          {publisherListing.map(item => (
            <tr>
              <Link
                to={{
                  pathname: `/crm/details/${item.name}`,
                  state: {
                    name: item.name,
                  },
                }}
              >
                <td>{item.name}</td>
              </Link>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.website}</td>
              <td>{item.assigned_to}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

PublisherListing.propTypes = {};

export default PublisherListing;
