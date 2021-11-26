/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import Input from '../../../../commons/app/components/Input';
import Button from '../../../../commons/app/components/Button';
import Select from '../../../../commons/app/components/Select';
import {
  makeSelectName,
  makeSelectEmail,
  makeSelectPhone,
  makeSelectAssigned,
  makeSelectWebsite,
  makeSelectLoading,
  makeSelectUsers,
  makeSelectValidationErrors,
} from './selectors';

import {
  reducer,
  updateState,
  dataPost,
  getData,
  editData,
  updateValidationErrors,
  loadUsers,
  updatePublisherDataInfo,
} from './slice';
import saga from './saga';
import './style.scss';

const stateSelector = createStructuredSelector({
  name: makeSelectName(),
  email: makeSelectEmail(),
  phone: makeSelectPhone(),
  website: makeSelectWebsite(),
  assignedTo: makeSelectAssigned(),
  users: makeSelectUsers(),
  errors: makeSelectValidationErrors(),
  loading: makeSelectLoading(),
});

function PublisherForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pathname } = window.location;
  const [edit, setEdit] = useState(false);

  useInjectReducer({ key: 'form', reducer });
  useInjectSaga({ key: 'formSaga', saga });

  const {
    name,
    email,
    phone,
    website,
    assignedTo,
    users,
    errors,
    loading,
  } = useSelector(stateSelector);

  const unfillPublishersData = {
    name: '',
    email: '',
    phone: '',
    website: '',
    assignedTo: '',
  };
  useEffect(() => {
    dispatch(loadUsers());
    if (id) {
      if (pathname.includes('edit')) {
        setEdit(true);
      }
      dispatch(getData(id));
    } else {
      dispatch(updateState(unfillPublishersData));
    }
    dispatch(updateValidationErrors(unfillPublishersData));
  }, []);

  const updateEdit = () => {
    setEdit(true);
  };
  const changeName = e => {
    dispatch(
      updatePublisherDataInfo({
        key: 'name',
        data: e.target.value,
      }),
    );
  };
  const changeEmail = e => {
    dispatch(
      updatePublisherDataInfo({
        key: 'email',
        data: e.target.value,
      }),
    );
  };
  const changePhone = e => {
    dispatch(
      updatePublisherDataInfo({
        key: 'phone',
        data: e.target.value,
      }),
    );
  };
  const changeWebsite = e => {
    dispatch(
      updatePublisherDataInfo({
        key: 'website',
        data: e.target.value,
      }),
    );
  };
  const changeAssignedTo = e => {
    dispatch(
      updatePublisherDataInfo({
        key: 'assignedTo',
        data: e.target.value,
      }),
    );
  };
  const checkDisable = id && !edit;

  const formSubmit = e => {
    e.preventDefault();
    if (!id) {
      dispatch(dataPost());
    } else {
      dispatch(editData(id));
    }
  };

  const elements = [
    {
      label: 'Name',
      type: 'text',
      disabled: checkDisable,
      placeholder: 'Enter name',
      value: name,
      change: changeName,
      error: errors.name,
    },
    {
      label: 'Email',
      type: 'text',
      disabled: checkDisable,
      placeholder: 'Enter email',
      value: email,
      change: changeEmail,
      error: errors.email,
    },
    {
      label: 'Phone',
      type: 'text',
      disabled: checkDisable,
      placeholder: 'Enter phone',
      value: phone,
      change: changePhone,
      error: errors.phone,
    },
    {
      label: 'Website',
      type: 'text',
      placeholder: 'Enter Website',
      disabled: checkDisable,
      value: website,
      change: changeWebsite,
      error: errors.website,
    },
  ];
  return (
    <div className="publisherForm">
      {checkDisable && (
        <Button value="Edit" onClick={updateEdit} className="btn" />
      )}
      {loading ? (
        <span className="loading">Loading....</span>
      ) : (
        <form onSubmit={formSubmit} className="publisherFormEdit">
          {elements.map(item => (
            <Input key={item.label} {...item} />
          ))}
          <Select
            label="Assigned To"
            list={users}
            filterBy={!assignedTo ? 'Select User' : assignedTo}
            error={errors.assignedTo}
            change={changeAssignedTo}
            disabled={checkDisable}
          />
          <Button value="Submit" disabled={checkDisable} className="btn" />
        </form>
      )}
    </div>
  );
}
export default PublisherForm;
