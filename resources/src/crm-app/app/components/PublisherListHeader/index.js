/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/**
 *
 * PublisherListHeader
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserRole } from 'containers/PublisherListing/selectors';
import './style.scss';

function PublisherListHeader() {
  const stateSelector = createStructuredSelector({
    userrole: makeSelectUserRole(),
  });
  const { userrole } = useSelector(stateSelector);
  return (
    <div className="publisherHeader">
      <h1 className="title">Accounts:{userrole}</h1>
      <div className="publisherHeaderRight">
        <Link to="/crm/create">
          <button className="createBtn" disabled={!(userrole === 'admin')}>
            create
          </button>
        </Link>
        <form method="post" action="/crm/logout">
          <button className="createBtn">Logout</button>
        </form>
      </div>
    </div>
  );
}

PublisherListHeader.propTypes = {};

export default PublisherListHeader;
