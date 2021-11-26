/* eslint-disable no-unused-vars */
// import Axios from 'axios';
import request from 'utils/request';
import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import api from 'utils/api';
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
  loadUserInfoSuccess,
} from './slice';
import {
  makeSelectId,
  makeSelectSearch,
  makeSelectFilter,
  makeSelectAssignedUser,
  makeSelectSearchPublishers,
} from './selectors';

/** *GET PUBLISHERS DATA BASED ON FILTER** */
export function* getSearchPublisherData() {
  const filter = yield select(makeSelectFilter());
  const search = yield select(makeSelectSearch());
  const assigned = yield select(makeSelectAssignedUser());
  try {
    const { searchPublishersData } = yield call(
      request,
      api.searchPublisher(filter, search, assigned),
    );
    yield put(searchPublishersSuccess(searchPublishersData));
  } catch (err) {
    yield put(searchPublishersError(err));
  }
}
/** *GET ALL USERS ** */
export function* getAllUsers() {
  try {
    const { role, username, users } = yield call(request, api.readUsers);
    yield put(loadUserInfoSuccess({ role, username }));
    yield put(loadUsersSuccess(users));
    yield put(searchPublishers());
  } catch (err) {
    yield put(loadUsersError(err));
  }
}

/** *DELETE PUBLISHER** */
export function* deletePublisherdataa() {
  const id = yield select(makeSelectId());
  try {
    yield call(request, api.publisherInfo(id), {}, 'delete');
    const publishers = yield select(makeSelectSearchPublishers());
    const updatedPublishers = publishers.filter(
      publisher => id !== publisher.id,
    );
    yield put(searchPublishersSuccess(updatedPublishers));
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

/** *********************** */
export default function* publisherListingSaga() {
  yield all([getSearchPublishersData(), deletePublisherData(), getUsers()]);
}
