
import { take, call, put } from 'redux-saga/effects';
import { READ_MENU_STATE, TOGGLE_MENU_STATE, FETCH_USER_DATA } from './constants';
import { menuStateLoaded, fetchedUserData } from './actions';
import request from '../../utils/request';


export function* writeMenuStateSaga() {
  while (true) {
    yield take(TOGGLE_MENU_STATE);

    let menuState = 'false';
    try {
      // eslint-disable-next-line no-unused-vars
      const [k, value] = document.cookie.split(/\s*;\s*/).map((x) => x.split('=')).find(([key]) => key === 'menu_state');
      menuState = value;
    } catch (e) {
      console.log('error reading cookie'); // eslint-disable-line no-console
    }
    document.cookie = `menu_state=${!JSON.parse(menuState)}`;
  }
}

export function* readMenuStateSaga() {
  while (true) {
    yield take(READ_MENU_STATE);
    try {
      // eslint-disable-next-line no-unused-vars
      const [k, value] = document.cookie.split(/\s*;\s*/).map((x) => x.split('=')).find(([key]) => key === 'menu_state');
      yield put(menuStateLoaded(JSON.parse(value)));
    } catch (e) {
      console.log('error reading cookie'); // eslint-disable-line no-console
    }
  }
}

export function* fetchUserSaga() {
  while (true) {
    yield take(FETCH_USER_DATA);
    const { data } = yield call(request, 'http://www.mocky.io/v2/59b65b280f000045047123dd');
    yield put(fetchedUserData(data));
  }
}

export default [
  writeMenuStateSaga,
  readMenuStateSaga,
  fetchUserSaga,
];
