/* eslint-disable no-unused-vars */
/**
 *
 * Login
 *
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import Axios from 'axios';
import { Redirect } from 'react-router';
import { makeSelectLogin, makeSelectPost } from './selectors';
import { updateUserName, updatePassword, reducer, loggingIn } from './slice';
import saga from './saga';
import './style.scss';

const stateSelector = createStructuredSelector({
  login: makeSelectLogin(),
  post: makeSelectPost(),
});

function Login() {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  /* eslint-disable no-unused-vars */
  const { login, post } = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */

  const changeUserName = e => {
    dispatch(updateUserName(e.target.value));
  };
  const changePassword = e => {
    dispatch(updatePassword(e.target.value));
  };
  return (
    <div>
      <form className="form" method="post" action="/crm/login">
        <h1 className="head">Login Here</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          onChange={changeUserName}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter Password"
          onChange={changePassword}
          required
        />
        <input type="submit" className="btn" />
        {/* {post ? <Redirect to="/crm/home" /> : <Redirect to="/crm/login" />} */}
      </form>
    </div>
  );
}

export default Login;
