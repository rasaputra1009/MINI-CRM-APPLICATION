/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/**
 *
 * Form
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import makeSelectForm, { makeSelectname } from './selectors';
import './style.scss';
import {
  reducer,
  updateName,
  updateEmail,
  updatePhone,
  updateWebsite,
  updateAssignedTo,
  dataPost,
} from './slice';
import saga from './saga';
const stateSelector = createStructuredSelector({
  form: makeSelectForm(),
  name: makeSelectname(),
});

function Form() {
  const { username } = useParams();
  console.log(username);
  useInjectReducer({ key: 'form', reducer });
  useInjectSaga({ key: 'formSaga', saga });

  /* eslint-disable no-unused-vars */
  const { form, name } = useSelector(stateSelector);
  const dispatch = useDispatch();
  /* eslint-enable no-unused-vars */
  const changeName = e => {
    dispatch(updateName(e.target.value));
  };
  const changeEmail = e => {
    dispatch(updateEmail(e.target.value));
  };
  const changePhone = e => {
    dispatch(updatePhone(e.target.value));
  };
  const changeWebsite = e => {
    dispatch(updateWebsite(e.target.value));
  };
  const changeAssignedTo = e => {
    dispatch(updateAssignedTo(e.target.value));
  };
  const formSubmit = e => {
    e.preventDefault();
    // axios.post('/api/crm/publisher', form).then(response => response.data);
    // dispatch(form({ name: '', email: '', phone: '', website: '' }));
    dispatch(dataPost());
  };
  return (
    <div>
      <form method="post" className="form" onSubmit={formSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          onChange={changeName}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter Email Id"
          onChange={changeEmail}
          required
        />
        <label htmlFor="phone">Phone </label>
        <input
          type="tel"
          placeholder="Enter Phone Number"
          onChange={changePhone}
          required
        />
        <label htmlFor="website">Website</label>
        <input
          type="text"
          placeholder="Enter Website Url"
          onChange={changeWebsite}
          required
        />
        <label htmlFor="website">Assigned To</label>
        <input
          type="text"
          placeholder="Assigned to"
          onChange={changeAssignedTo}
          required
        />
        <input type="submit" className="btn" />
      </form>
    </div>
  );
}

Form.defaultProps = {
  username: ' ',
};

export default Form;
