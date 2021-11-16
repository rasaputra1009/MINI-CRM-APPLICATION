/* eslint-disable no-unused-vars */
// import Axios from 'axios';
import request from 'utils/request';
import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  searchPublishers,
  searchPublishersSuccess,
  searchPublishersError,
  deletePublisher,
  deletePublisherSuccess,
  deletePublisherError,
  loadUserInfo,
  loadUsersSuccess,
  loadUserInfoError,
  loadUserInfoSuccess,
} from './slice';
import { makeSelectSearch, makeSelectId, makeSelectFilter } from './selectors';

// Individual exports for testing
export function* getUserInfo() {
  const requestURL = `/url/user`;
  try {
    const [data] = yield call(request, requestURL);
    yield put(loadUserInfoSuccess(data));
  } catch (err) {
    yield put(loadUserInfoError(err));
  }
}
export function* getSearchPublisherData() {
  const search = yield select(makeSelectSearch());
  const filter = yield select(makeSelectFilter());
  const requestURL = `/api/crm/publishers?filter=${filter}&search=${search}`;
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

export function* getUsersData() {
  yield takeLatest(loadUserInfo.type, getUserInfo);
}
export function* getSearchPublishersData() {
  yield takeLatest(searchPublishers.type, getSearchPublisherData);
}
export function* deletePublisherData() {
  yield takeLatest(deletePublisher.type, deletePublisherdataa);
}
export default function* publisherListingSaga() {
  yield all([getSearchPublishersData(), getUsersData(), deletePublisherData()]);
}
