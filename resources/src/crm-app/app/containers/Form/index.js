/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/**
 *
 * Form
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeSelectUsers } from 'containers/PublisherListing/selectors';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import Axios from 'axios';
import makeSelectForm, {
  makeSelectName,
  makeSelectEmail,
  makeSelectPhone,
  makeSelectAssigned,
  makeSelectWebsite,
} from './selectors';
import './style.scss';
import {
  reducer,
  updateState,
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
  name: makeSelectName(),
  email: makeSelectEmail(),
  phone: makeSelectPhone(),
  website: makeSelectWebsite(),
  assigned_to: makeSelectAssigned(),
  users: makeSelectUsers(),
});

function Form() {
  const { id } = useParams();
  const { pathname } = window.location;
  let edit = false;
  if (pathname.includes('edit')) {
    edit = true;
  }

  useInjectReducer({ key: 'form', reducer });
  useInjectSaga({ key: 'formSaga', saga });
  /* eslint-disable no-unused-vars */
  const { form, name, email, phone, website, assigned_to, users } = useSelector(
    stateSelector,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      Axios.get(`/api/crm/publisher/${id}`).then(response =>
        dispatch(updateState(response.data[0])),
      );
    } else {
      dispatch(
        updateState({
          name: '',
          email: '',
          phone: '',
          website: '',
          assigned_to: '',
        }),
      );
    }
  }, []);
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
    if (!id) {
      dispatch(dataPost());
    } else {
      Axios.put(`/api/crm/publisher/${id}`, form);
    }
  };
  return (
    <div>
      <form className="form" onSubmit={formSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={changeName}
          disabled={id && !edit}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter Email Id"
          onChange={changeEmail}
          disabled={id && !edit}
          required
        />
        <label htmlFor="phone">Phone </label>
        <input
          type="tel"
          value={phone}
          placeholder="Enter Phone Number"
          onChange={changePhone}
          disabled={id && !edit}
          required
        />
        <label htmlFor="website">Website</label>
        <input
          type="text"
          value={website}
          placeholder="Enter Website Url"
          onChange={changeWebsite}
          disabled={id && !edit}
          required
        />
        <label htmlFor="website">Assigned To</label>
        <select
          name="assigned_to"
          onChange={changeAssignedTo}
          disabled={id && !edit}
        >
          <option>{assigned_to}</option>
          {users.map(user => (
            <option value={user}>{user}</option>
          ))}
        </select>
        <input type="submit" className="btn" disabled={id && !edit} />
      </form>
    </div>
  );
}
Form.defaultProps = {
  id: ' ',
};
export default Form;
