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
  loadUserInfoError,
  loadUserInfoSuccess,
  loadUsers,
  loadUsersSuccess,
  loadUsersError,
} from './slice';
import {
  makeSelectSearch,
  makeSelectId,
  makeSelectFilter,
  makeSelectAssignedUser,
} from './selectors';

// Individual exports for testing
// export function* getUserInfo() {
//   const requestURL = `/url/user`;
//   try {
//     const [data] = yield call(request, requestURL);
//     yield put(loadUserInfoSuccess(data));
//   } catch (err) {
//     yield put(loadUserInfoError(err));
//   }
// }
export function* getAllUsers() {
  // console.log('API CALL');
  const requestURL = '/url/users';
  try {
    const [users] = yield call(request, requestURL);
    yield put(loadUsersSuccess(users.Users));
  } catch (err) {
    yield put(loadUsersError(err));
  }
}
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

// export function* getUsersData() {
//   yield takeLatest(loadUserInfo.type, getUserInfo);
// }
export function* getUsers() {
  yield takeLatest(loadUsers.type, getAllUsers);
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
    // getUsersData(),
    deletePublisherData(),
    getUsers(),
  ]);
}
