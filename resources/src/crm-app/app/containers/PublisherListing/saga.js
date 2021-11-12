/* eslint-disable no-unused-vars */
// import Axios from 'axios';
import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loadPublishers,
  loadPublishersSuccess,
  loadUsersSuccess,
  loadPublishersError,
} from './slice';

// Individual exports for testing
export function* getPublishersData() {
  const requestURL = `/api/crm/publishers`;
  try {
    const [publishers, users] = yield call(request, requestURL);
    // const publishers = yield call(Axios.get, requestURL);
    yield put(loadPublishersSuccess(publishers));
    yield put(loadUsersSuccess(users));
  } catch (err) {
    yield put(loadPublishersError(err));
  }
}

export default function* publisherListingSaga() {
  yield takeLatest(loadPublishers.type, getPublishersData);
}

// try {
//   const publishers = yield call(request, requestURL);
//   // const publishers = yield call(Axios.get, requestURL);
//   yield put(loadPublishersSuccess(publishers));
// } catch (err) {
//   yield put(loadPublishersError(err));
// }
