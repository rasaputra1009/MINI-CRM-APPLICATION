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
import { makeSelectLogin, makeSelectPost } from './selectors';
import { updateUserName, updatePassword, reducer, loggingIn } from './slice';
import Input from '../../../../commons/app/components/Input';
import Button from '../../../../commons/app/components/Button';
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

  const userLogin = e => {
    e.preventDefault();
    dispatch(loggingIn());
  };
  const userDetails = [
    {
      label: 'Username',
      type: 'text',
      placeholder: 'Enter UserName',
      disabled: false,
      value: null,
      change: changeUserName,
      error: '',
    },
    {
      label: 'Password',
      type: 'password',
      placeholder: 'Enter PassWord',
      disabled: false,
      value: null,
      change: changePassword,
      error: '',
    },
  ];
  return (
    <div className="login-form">
      <form className="form" onSubmit={userLogin}>
        <h1 className="head">Login Here</h1>
        {userDetails.map(item => (
          <Input key={item.label} {...item} className="input" />
        ))}
        <Button value="Submit" disabled={false} className="btn" />
      </form>
    </div>
  );
}

export default Login;
