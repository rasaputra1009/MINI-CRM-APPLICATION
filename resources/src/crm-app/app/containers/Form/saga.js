/* eslint-disable no-unused-vars */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import axios from 'axios';
import { makeSelectForm, makeSelectName } from './selectors';
import { dataPost, dataPosted, dataPostError } from './slice';

export function* postData() {
  const form = yield select(makeSelectForm());
  try {
    yield call(axios.post, '/api/crm/publisher', form);
    // axios.post('/api/crm/publisher', form).then(response => response.data);
    yield put(dataPosted({ post: true }));
  } catch (error) {
    yield put(dataPostError(error));
  }
}

export default function* formSaga() {
  yield takeLatest(dataPost.type, postData);
}

// export function* postData() {
//   const form = yield select(makeSelectForm());
//   const requestURL = `/api/crm/publisher`;
//   try {
//     yield call(axios.post, requestURL, form);
//     yield put(dataPosted({ post: true }));
//   } catch (error) {
//     console.log(error);
//   }
// }

// export default function* formSaga() {
//   // See example in containers/ReposManager/saga.js in the react-boilerplate sample app
//   yield takeLatest(dataPost.type, postData);
// }
