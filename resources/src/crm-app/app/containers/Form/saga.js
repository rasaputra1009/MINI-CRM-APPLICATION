/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import axios from 'axios';
import { push } from 'react-router-redux';
import { makeSelectForm, makeSelectName, makeSelectId } from './selectors';
import {
  dataPost,
  dataPosted,
  dataPostError,
  getData,
  getDataSuccess,
  getDataError,
  editData,
  editDataSuccess,
  updateState,
  loadUsers,
  loadUsersSuccess,
  loadUsersError,
  updateValidationErrors,
} from './slice';
/***GET ALL USERS ***/
export function* getAllUsers() {
  const requestURL = '/url/users';
  try {
    const [users] = yield call(request, requestURL);
    yield put(loadUsersSuccess(users.Users));
  } catch (err) {
    yield put(loadUsersError(err));
  }
}

/***CREATE A PUBLISHER ***/
export function* postData() {
  const form = yield select(makeSelectForm());
  try {
    yield call(axios.post, '/api/crm/publisher', form);
    yield put(dataPosted({ post: true }));
    yield put(push('/crm/home'));
  } catch (error) {
    yield put(updateValidationErrors(error.response.data.errors));
    yield put(dataPostError(error));
  }
}
/***GET PUBLISHERS DATA TO EDIT OR TO DISPLAY ***/
export function* getPublisherData() {
  const id = yield select(makeSelectId());
  const requestURL = `/api/crm/publisher/${id}`;
  try {
    const publisher = yield call(request, requestURL);
    yield put(updateState(publisher[0]));
    yield put(getDataSuccess());
  } catch (err) {
    yield put(getDataError(err));
  }
}

/*** UPDATE PUBLISHER DATA ***/
export function* updateData() {
  const id = yield select(makeSelectId());
  const form = yield select(makeSelectForm());
  try {
    yield call(axios.put, `/api/crm/publisher/${id}`, form);
    yield put(editDataSuccess({ post: true }));
    yield put(push('/crm/home'));
  } catch (error) {
    yield put(updateValidationErrors(error.response.data.errors));
  }
}

export function* getUsers() {
  yield takeLatest(loadUsers.type, getAllUsers);
}
export function* postPublisher() {
  yield takeLatest(dataPost.type, postData);
}
export function* getPublisher() {
  yield takeLatest(getData.type, getPublisherData);
}
export function* editPublisher() {
  yield takeLatest(editData.type, updateData);
}


export default function* formSaga() {
  yield all([getUsers(), postPublisher(), getPublisher(), editPublisher()]);
}
