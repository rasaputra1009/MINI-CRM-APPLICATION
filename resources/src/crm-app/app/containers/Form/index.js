import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams} from 'react-router';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import Axios from 'axios';

import {
  makeSelectForm,makeSelectName,makeSelectEmail,makeSelectPhone,makeSelectAssigned,
  makeSelectWebsite,makeSelectUsers,makeSelectLoading,makeSelectValidationErrors,
} from './selectors';

import {
  reducer,updateState,updateName,updateEmail,updatePhone,updateWebsite,updateAssignedTo,dataPost,
  getData,loadUsers,editData,getDataError, updateValidationErrors,
} from './slice';

const stateSelector = createStructuredSelector({
  form: makeSelectForm(),
  name: makeSelectName(),
  email: makeSelectEmail(),
  phone: makeSelectPhone(),
  website: makeSelectWebsite(),
  assigned_to: makeSelectAssigned(),
  users: makeSelectUsers(),
  errors: makeSelectValidationErrors(),
  loading: makeSelectLoading(),
});
import saga from './saga';
import './style.scss';

function Form() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { pathname } = window.location;
  const [edit, setEdit] = useState(false);

  useInjectReducer({ key: 'form', reducer });
  useInjectSaga({ key: 'formSaga', saga });


  const {form,name,email,phone,website,assigned_to,users,errors,loading,} = useSelector(stateSelector);

    useEffect(() => {
          dispatch(loadUsers());
          if (pathname.includes('edit')) {
            setEdit(true);
          }
          if(id) {
            dispatch(getData(id));
          } 
          else {
            dispatch(updateState({name: '',email: '',phone: '',website: '',assigned_to: '',}),);
            dispatch(updateValidationErrors({name: '',email: '',phone: '',website: '',assigned_to: ''}));
          }
    }, []);

  const updateEdit = () => {
    setEdit(true);
  };
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
      dispatch(editData(id));
    }
  };

  return (
    <div>
      
      <div className="detailsEdit">
        {id && <button onClick={updateEdit}>Edit</button>}
      </div>
      
      {loading ? (<span className="loading">Loading....</span>) : (

        <form className="publisherForm" onSubmit={formSubmit}>

          <label htmlFor="name">Name</label>
          {'name' in errors && errors.name !== '' ? (<span className="error">Please Enter Name</span>) : ('')} 
          <input type="text" placeholder="Enter name" value={name} onChange={changeName} disabled={id && !edit} required />
          
          <label htmlFor="email">Email</label>
          {'email' in errors && errors.email !== '' ? (<span className="error">Please Enter Email Correctly</span>) : ('')}
          <input type="text" value={email} placeholder="Enter Email Id" onChange={changeEmail} disabled={id && !edit} required />
          
          <label htmlFor="phone">Phone </label>
          {'phone' in errors && errors.phone !== '' ? (<span className="error">Please Enter Phone Number Correctly</span>) : ('')}
          <input type="text" value={phone} placeholder="Enter Phone Number" onChange={changePhone} disabled={id && !edit} required  />

          <label htmlFor="website">Website</label>
          {'website' in errors && errors.website !== '' ? (<span className="error">Please Enter Website Correctly</span>) : ('')}
          <input type="text" value={website}  placeholder="Enter Website Url" onChange={changeWebsite} disabled={id && !edit} required />
          
          <div className="dropdown">
              <label htmlFor="website">Assigned To:</label>
              {'assigned_to' in errors && errors.assigned_to !== '' ? (<span className="error">Please Select Assigned User</span>) : ('')}
            
              <select name="assigned_to" className="dropdown-select" onChange={changeAssignedTo} disabled={id && !edit}>
                <option>{assigned_to}</option>
                {users.map(user => ( <option value={user}>{user}</option> ))}
              </select>
          </div>
          <input type="submit" className="btn" disabled={id && !edit} />
        </form>
      )}
    </div>
  );
}
export default Form;
