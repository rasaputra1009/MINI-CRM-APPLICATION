/*
 *
 * TableContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCHING_TABLE_DATA,
  FETCHED_TABLE_DATA,
} from './constants';

const initialState = fromJS({
  loading: true,
  data: null,
});

function tableContainerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_TABLE_DATA:
      return state.set('loading', true);
    case FETCHED_TABLE_DATA:
      return state.set('loading', false)
        .set('data', fromJS(action.data));
    default:
      return state;
  }
}

export default tableContainerReducer;
