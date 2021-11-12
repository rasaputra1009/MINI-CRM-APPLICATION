/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/**
 *
 * PublisherListHeader
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function PublisherListHeader() {
  return (
    <div className="publisherHeader">
      <h1 className="title">Accounts</h1>
      <div className="publisherHeaderRight">
        <Link to="/crm/create">
          <button className="createBtn">create</button>
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
