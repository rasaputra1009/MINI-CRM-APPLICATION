/* eslint-disable no-unused-vars */
// import Axios from 'axios';
import request from 'utils/request';
import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import { pullAllBy } from 'lodash';
import {
  loadPublishers,
  loadPublishersSuccess,
  loadUsersSuccess,
  loadPublishersError,
  searchPublishers,
  searchPublishersSuccess,
  searchPublishersError,
} from './slice';
import { makeSelectSearch } from './selectors';

// Individual exports for testing
export function* getAllUsers() {
  const requestURL = `/api/crm/publishers`;
  try {
    const users = yield call(request, requestURL);
    yield put(loadUsersSuccess(users));
  } catch (err) {
    yield put(loadPublishersError(err));
  }
}
export function* getSearchPublisherData() {
  const search = yield select(makeSelectSearch());
  const requestURL = `/api/crm/publishers/${search}%`;
  try {
    const publishers = yield call(request, requestURL);
    yield put(searchPublishersSuccess(publishers));
  } catch (err) {
    yield put(searchPublishersError(err));
  }
}

export function* getPublishersData() {
  yield takeLatest(loadPublishers.type, getAllUsers);
}
export function* getSearchPublishersData() {
  yield takeLatest(searchPublishers.type, getSearchPublisherData);
}
export default function* publisherListingSaga() {
  yield all([getSearchPublishersData(), getPublishersData()]);
}
