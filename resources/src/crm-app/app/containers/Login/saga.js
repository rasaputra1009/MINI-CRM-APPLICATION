/* eslint-disable import/named */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { makeSelectLogin } from './selectors';
import { loggingIn, loginSuccess, loginFailed } from './slice';

export function* Login() {
  const login = yield select(makeSelectLogin());
  const requestURL = '/api/crm/login';
  try {
    yield call(axios.post, requestURL, login);
    yield put(loginSuccess(true));
  } catch (error) {
    yield put(loginFailed(true));
  }
}
export default function* loginSaga() {
  yield takeLatest(loggingIn.type, Login);
}
