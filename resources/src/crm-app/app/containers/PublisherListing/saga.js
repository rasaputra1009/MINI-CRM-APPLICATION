// import Axios from 'axios';
import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loadPublishers,
  loadPublishersSuccess,
  loadPublishersError,
} from './slice';

// Individual exports for testing
export function* getPublishersData() {
  const requestURL = `/api/crm/publisher`;
  try {
    const publishers = yield call(request, requestURL);
    // const publishers = yield call(Axios.get, requestURL);
    yield put(loadPublishersSuccess(publishers));
  } catch (err) {
    yield put(loadPublishersError(err));
  }
}

export default function* publisherListingSaga() {
  yield takeLatest(loadPublishers.type, getPublishersData);
}
