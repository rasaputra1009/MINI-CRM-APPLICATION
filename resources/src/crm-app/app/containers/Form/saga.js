/* eslint-disable no-unused-vars */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import axios from 'axios';
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
  editDataError,
  updateState,
} from './slice';

export function* postData() {
  const form = yield select(makeSelectForm());
  try {
    yield call(axios.post, '/api/crm/publisher', form);
    yield put(dataPosted({ post: true }));
  } catch (error) {
    yield put(dataPostError(error));
  }
}
export function* getPublisherData() {
  const id = yield select(makeSelectId());
  const requestURL = `/api/crm/publisher/${id}`;
  try {
    const publisher = yield call(request, requestURL);
    yield put(updateState(publisher[0]));
  } catch (err) {
    yield put(getDataError(err));
  }
}
export function* updateData() {
  const id = yield select(makeSelectId());
  const form = yield select(makeSelectForm());
  try {
    yield call(axios.put, `/api/crm/publisher/${id}`, form);
    yield put(editDataSuccess({ post: true }));
  } catch (error) {
    yield put(editDataError(error));
  }
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
  yield all([postPublisher(), getPublisher(), editPublisher()]);
}
