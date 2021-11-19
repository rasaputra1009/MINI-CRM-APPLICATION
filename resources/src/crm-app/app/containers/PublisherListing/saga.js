/* eslint-disable no-unused-vars */
// import Axios from 'axios';
import request from 'utils/request';
import { call, all, put, takeLatest, select, } from 'redux-saga/effects';
import axios from 'axios';
import {
  searchPublishers,
  searchPublishersSuccess,
  searchPublishersError,
  deletePublisher,
  deletePublisherSuccess,
  deletePublisherError,
  loadUsers,
  loadUsersSuccess,
  loadUsersError,
} from './slice';
import {
  makeSelectId,
  makeSelectSearch,
  makeSelectFilter,
  makeSelectAssignedUser,
} from './selectors';

/***GET PUBLISHERS DATA BASED ON FILTER***/
export function* getSearchPublisherData() {
  const search = yield select(makeSelectSearch());
  const filter = yield select(makeSelectFilter());
  const assigned = yield select(makeSelectAssignedUser());
  const requestURL = `/api/crm/publishers?${filter}=${search}&assigned_to=${assigned}`;
  try {
    const publishers = yield call(request, requestURL);
    yield put(searchPublishersSuccess(publishers));
  } catch (err) {
    yield put(searchPublishersError(err));
  }
}
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

/***DELETE PUBLISHER***/
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
export function* getUsers() {
  yield takeLatest(loadUsers.type, getAllUsers);
}

export function* getSearchPublishersData() {
  yield takeLatest(searchPublishers.type, getSearchPublisherData);
}

export function* deletePublisherData() {
  yield takeLatest(deletePublisher.type, deletePublisherdataa);
}

/**************************/
export default function* publisherListingSaga() {
  yield all([
    getSearchPublishersData(),
    deletePublisherData(),
    getUsers(),
  ]);
}
