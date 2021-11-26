/* eslint-disable import/named */
import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'react-router-redux';
import api from 'utils/api';
import { makeSelectLogin } from './selectors';
import { loggingIn, loginSuccess, loginFailed, loggingOut } from './slice';

export function* Login() {
  const loginCredentials = yield select(makeSelectLogin());
  try {
    yield call(request, api.signingIn, loginCredentials, 'post');
    yield put(loginSuccess(true));
    yield put(push('/crm/home'));
  } catch (error) {
    yield put(push('/crm/login'));
    yield put(loginFailed());
  }
}
export function* Logout() {
  try {
    yield call(request, api.signingOut, {}, 'post');
    yield put(push('/crm/login'));
  } catch (error) {
    yield put(loginFailed());
  }
}
export function* login() {
  yield takeLatest(loggingIn.type, Login);
}
export function* logout() {
  yield takeLatest(loggingOut.type, Logout);
}
export default function* loginSaga() {
  yield all([login(), logout()]);
}
