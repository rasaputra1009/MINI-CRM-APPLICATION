/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/**
 *
 * PublisherListHeader
 *
 */

import React from 'react';
import './style.scss';

function PublisherListHeader() {
  return (
    <div className="publisherHeader">
      <h1 className="title">Accounts</h1>
      <div className="publisherHeaderRight">
        <button className="createBtn">create</button>
        <button className="createBtn">Logout</button>
      </div>
    </div>
  );
}

PublisherListHeader.propTypes = {};

export default PublisherListHeader;
