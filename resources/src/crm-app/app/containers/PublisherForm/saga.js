/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'react-router-redux';
import api from 'utils/api';
import {
  makeSelectPublisherForm,
  makeSelectName,
  makeSelectId,
} from './selectors';
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
  updateValidationErrors,
  loadUsers,
  loadUsersSuccess,
  loadUsersError,
} from './slice';

/** GET ALL USERS */
export function* getAllUsers() {
  try {
    const { users } = yield call(request, api.readUsers);
    yield put(loadUsersSuccess(users));
  } catch (err) {
    yield put(loadUsersError(err));
  }
}

/** *CREATE A PUBLISHER ** */
export function* postData() {
  const form = yield select(makeSelectPublisherForm());
  try {
    yield call(request, api.createPublisher, form, 'post');
    // yield put(dataPosted({ post: true }));
    yield put(push('/crm/home'));
  } catch (error) {
    if (error.response.status === 403) {
      yield put(push('/crm/notfound'));
    } else {
      yield put(updateValidationErrors(error.response.data.errors));
    }
    yield put(dataPostError(error));
  }
}
/** *GET PUBLISHERS DATA TO EDIT OR TO DISPLAY ** */
export function* getPublisherData() {
  const id = yield select(makeSelectId());
  try {
    const { publishersData } = yield call(request, api.publisherInfo(id));
    yield put(updateState(publishersData));
    yield put(getDataSuccess());
  } catch (err) {
    yield put(push('/crm/notfound'));
    yield put(getDataError(err));
  }
}

/** * UPDATE PUBLISHER DATA ** */
export function* updateData() {
  const id = yield select(makeSelectId());
  const form = yield select(makeSelectPublisherForm());
  try {
    yield call(request, api.publisherInfo(id), form, 'put');
    yield put(editDataSuccess({ post: true }));
    yield put(push('/crm/home'));
  } catch (error) {
    if (error.response.status === 403) {
      yield put(push('/crm/notfound'));
    } else {
      yield put(updateValidationErrors(error.response.data.errors));
    }
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
