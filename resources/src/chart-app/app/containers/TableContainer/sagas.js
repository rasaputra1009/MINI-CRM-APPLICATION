import { take, call, put } from 'redux-saga/effects';
import request from 'commons/utils/request';
import { FETCH_TABLE_DATA } from './constants';
import { fetchingTableData, fetchedTableData } from './actions';

// Individual exports for testing
export function* fetchTableSagas() {
  while (true) {
    yield take(FETCH_TABLE_DATA);
    yield put(fetchingTableData());
    const { data } = yield call(request, 'http://www.mocky.io/v2/59b11da7260000cb04287e9f');
    yield put(fetchedTableData(data));
  }
}

// All sagas to be loaded
export default [
  fetchTableSagas,
];
