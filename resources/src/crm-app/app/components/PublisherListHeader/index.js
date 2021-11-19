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
import { makeSelectUserRole ,makeSelectUser} from 'containers/PublisherListing/selectors';
import './style.scss';
function PublisherListHeader() {
  const stateSelector = createStructuredSelector({
    userrole: makeSelectUserRole(),
    username:makeSelectUser(),
  });
  const { userrole ,username} = useSelector(stateSelector);
  return (
    <div className="publisherHeader">
      <h1 className="title">Welcome {userrole}</h1>
      <div className="publisherHeaderRight">
        <h1 className="loginUser">{username}</h1>
        <Link to="/crm/create">
          <button className="createBtn" disabled={!(userrole === 'admin')}>
            create
          </button>
        </Link>
        <form method="post" action="/crm/logout">
          <button className="createBtn" className="logout">Logout</button>
        </form>
      </div>
    </div>
  );
}

PublisherListHeader.propTypes = {};

export default PublisherListHeader;
