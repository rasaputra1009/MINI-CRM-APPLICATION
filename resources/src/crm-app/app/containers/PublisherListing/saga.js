/* eslint-disable no-unused-vars */
// import Axios from 'axios';
import request from 'utils/request';
import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  loadPublishers,
  loadPublishersSuccess,
  loadUsersSuccess,
  loadPublishersError,
  searchPublishers,
  searchPublishersSuccess,
  searchPublishersError,
  deletePublisher,
  deletePublisherSuccess,
  deletePublisherError,
} from './slice';
import { makeSelectSearch, makeSelectId } from './selectors';

// Individual exports for testing
export function* getAllUsers() {
  const requestURL = `/api/crm/publisher`;
  try {
    const [users = yield call(request, requestURL);
    yield put(loadUsersSuccess(users));
  } catch (err) {
    yield put(loadPublishersError(err));
  }
}
export function* getSearchPublisherData() {
  const search = yield select(makeSelectSearch());
  const requestURL = `/api/crm/publishers?search=${search}`;
  try {
    const publishers = yield call(request, requestURL);
    yield put(searchPublishersSuccess(publishers));
  } catch (err) {
    yield put(searchPublishersError(err));
  }
}
export function* deletePublisherdataa() {
  const id = yield select(makeSelectId());
  const requestURL = `/api/crm/publisher/${id}`;
  try {
    yield call(axios.delete, requestURL);
    yield put(deletePublisherSuccess({ delete: true }));
  } catch (error) {
    yield put(deletePublisherError(error));
  }
}

export function* getPublishersData() {
  yield takeLatest(loadPublishers.type, getAllUsers);
}
export function* getSearchPublishersData() {
  yield takeLatest(searchPublishers.type, getSearchPublisherData);
}
export function* deletePublisherData() {
  yield takeLatest(deletePublisher.type, deletePublisherdataa);
}
export default function* publisherListingSaga() {
  yield all([
    getSearchPublishersData(),
    getPublishersData(),
    deletePublisherData(),
  ]);
}
