/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/**
 *
 * PublisherListHeader
 *
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { loggingOut, reducer } from 'containers/Login/slice';
import {
  makeSelectUserRole,
  makeSelectUser,
} from 'containers/PublisherListing/selectors';
import saga from 'containers/Login/saga';
import Button from '../../../../commons/app/components/Button';
import './style.scss';
function PublisherListHeader() {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  const dispatch = useDispatch();
  const stateSelector = createStructuredSelector({
    userrole: makeSelectUserRole(),
    username: makeSelectUser(),
  });
  const { userrole, username } = useSelector(stateSelector);
  const checkDisable = !(userrole === 'admin');
  const userLogout = () => {
    dispatch(loggingOut());
  };
  return (
    <div className="publisherHeader">
      <span className="title">Welcome {userrole}</span>
      <div className="publisherHeaderRight">
        <span className="loginUser">{username} </span>
        <Link to="/crm/create" className="create">
          <Button value="create" disabled={checkDisable} className="btn" />
        </Link>
        <Button value="Logout" onClick={userLogout} className="btn" />
      </div>
    </div>
  );
}

PublisherListHeader.propTypes = {};
export default PublisherListHeader;
